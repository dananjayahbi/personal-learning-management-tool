'use client';

import { useState, useEffect } from 'react';
import FileTree, { TreeNode } from '@/components/FileTree';
import MarkdownViewer from '@/components/MarkdownViewer';
import { 
  Menu, X, Settings, BookOpen, Search, Bookmark, 
  Moon, Sun, Home as HomeIcon, FolderOpen, CheckCircle2 
} from 'lucide-react';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [basePath, setBasePath] = useState('');
  const [tempPath, setTempPath] = useState('');
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [fileContent, setFileContent] = useState<string>('');
  const [frontmatter, setFrontmatter] = useState<Record<string, any>>({});
  const [fileName, setFileName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [completedFiles, setCompletedFiles] = useState<Set<string>>(new Set());
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  // Load saved data from localStorage
  useEffect(() => {
    const savedPath = localStorage.getItem('learningPath');
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedCompleted = JSON.parse(localStorage.getItem('completedFiles') || '[]');
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    if (savedPath) {
      setBasePath(savedPath);
      setTempPath(savedPath);
      scanDirectory(savedPath);
    } else {
      setShowSettings(true);
    }
    
    setDarkMode(savedDarkMode);
    setCompletedFiles(new Set(savedCompleted));
    setBookmarks(new Set(savedBookmarks));
    
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Save completed files and bookmarks
  useEffect(() => {
    localStorage.setItem('completedFiles', JSON.stringify([...completedFiles]));
  }, [completedFiles]);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify([...bookmarks]));
  }, [bookmarks]);

  const scanDirectory = async (path: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to scan directory');
      }

      const data = await response.json();
      setTree(data.tree);
      setBasePath(data.basePath);
      localStorage.setItem('learningPath', data.basePath);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scan directory');
    } finally {
      setLoading(false);
    }
  };

  const loadFile = async (filePath: string, name: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ basePath, filePath }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to load file');
      }

      const data = await response.json();
      setFileContent(data.content);
      setFrontmatter(data.frontmatter);
      setFileName(data.fileName);
      setSelectedFile(filePath);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load file');
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleCompleted = () => {
    if (!selectedFile) return;
    const newCompleted = new Set(completedFiles);
    if (newCompleted.has(selectedFile)) {
      newCompleted.delete(selectedFile);
    } else {
      newCompleted.add(selectedFile);
    }
    setCompletedFiles(newCompleted);
  };

  const toggleBookmark = () => {
    if (!selectedFile) return;
    const newBookmarks = new Set(bookmarks);
    if (newBookmarks.has(selectedFile)) {
      newBookmarks.delete(selectedFile);
    } else {
      newBookmarks.add(selectedFile);
    }
    setBookmarks(newBookmarks);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      {/* Sidebar */}
      <aside
        className={`
          ${sidebarOpen ? 'w-80' : 'w-0'} 
          transition-all duration-300 overflow-hidden
          border-r border-zinc-200 dark:border-zinc-800
          flex flex-col
        `}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="font-semibold">Learning Materials</h2>
          </div>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 
                bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* File Tree */}
        <div className="flex-1 overflow-y-auto px-2">
          {loading && tree.length === 0 ? (
            <div className="p-4 text-center text-sm text-zinc-500">Loading...</div>
          ) : error && tree.length === 0 ? (
            <div className="p-4 text-center text-sm text-red-500">{error}</div>
          ) : (
            <FileTree nodes={tree} onFileSelect={loadFile} selectedPath={selectedFile} />
          )}
        </div>

        {/* Stats */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 space-y-1">
          <div>📚 Completed: {completedFiles.size}</div>
          <div>🔖 Bookmarked: {bookmarks.size}</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <HomeIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {selectedFile && (
              <>
                <button
                  onClick={toggleCompleted}
                  className={`p-2 rounded-lg transition-colors ${
                    completedFiles.has(selectedFile)
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                  title="Mark as completed"
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
                <button
                  onClick={toggleBookmark}
                  className={`p-2 rounded-lg transition-colors ${
                    bookmarks.has(selectedFile)
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                      : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </>
            )}
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {loading && fileContent ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-zinc-500">Loading...</div>
            </div>
          ) : error && !fileContent ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-red-500">{error}</div>
            </div>
          ) : fileContent ? (
            <MarkdownViewer content={fileContent} frontmatter={frontmatter} fileName={fileName} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <BookOpen className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Welcome to Your Learning Hub</h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-md">
                Select a file from the sidebar to start learning, or configure your learning materials path in settings.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Settings</h3>
              </div>
              {basePath && (
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Learning Materials Path
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempPath}
                    onChange={(e) => setTempPath(e.target.value)}
                    placeholder="e.g., E:\temp\personal-learning-management-tool"
                    className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 
                      bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => scanDirectory(tempPath)}
                    disabled={!tempPath || loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                      disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <FolderOpen className="w-4 h-4" />
                    Load
                  </button>
                </div>
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                {basePath && (
                  <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                    ✓ Current path: {basePath}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  This app scans your local directory for markdown files and presents them in an easy-to-navigate interface.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
