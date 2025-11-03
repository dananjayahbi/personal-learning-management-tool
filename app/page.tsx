'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FileTree, { TreeNode } from '@/components/FileTree';
import MarkdownViewer from '@/components/MarkdownViewer';
import { 
  Menu, X, Settings, BookOpen, Search, Bookmark, 
  Moon, Sun, FolderOpen, CheckCircle2 
} from 'lucide-react';

interface Directory {
  id: number;
  name: string;
  path: string;
  isActive: boolean;
}

export default function Home() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [basePath, setBasePath] = useState('');
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [fileContent, setFileContent] = useState<string>('');
  const [frontmatter, setFrontmatter] = useState<Record<string, any>>({});
  const [fileName, setFileName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [completedFiles, setCompletedFiles] = useState<Set<string>>(new Set());
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [activeDirectory, setActiveDirectory] = useState<Directory | null>(null);

  // Load active directory and its data
  useEffect(() => {
    loadActiveDirectory();
    
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Load read status when active directory changes
  useEffect(() => {
    if (activeDirectory) {
      loadReadStatus(activeDirectory.id);
      scanDirectory(activeDirectory.path);
    }
  }, [activeDirectory]);

  const loadActiveDirectory = async () => {
    try {
      const response = await fetch('/api/directories');
      if (response.ok) {
        const data = await response.json();
        if (data.activeDirectory) {
          setActiveDirectory(data.activeDirectory);
        }
      }
    } catch (err) {
      console.error('Error loading active directory:', err);
    }
  };

  const loadReadStatus = async (directoryId: number) => {
    try {
      const response = await fetch(`/api/read-status?directoryId=${directoryId}`);
      if (response.ok) {
        const data = await response.json();
        const completed = new Set<string>(
          data.readStatuses.filter((rs: any) => rs.isCompleted).map((rs: any) => rs.filePath)
        );
        const bookmarked = new Set<string>(data.bookmarks.map((b: any) => b.filePath));
        setCompletedFiles(completed);
        setBookmarks(bookmarked);
      }
    } catch (err) {
      console.error('Error loading read status:', err);
    }
  };

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

  const toggleCompleted = async () => {
    if (!selectedFile || !activeDirectory) return;
    
    const newCompleted = new Set(completedFiles);
    const isCompleted = !newCompleted.has(selectedFile);
    
    if (isCompleted) {
      newCompleted.add(selectedFile);
    } else {
      newCompleted.delete(selectedFile);
    }
    setCompletedFiles(newCompleted);

    // Update database
    try {
      await fetch('/api/read-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          directoryId: activeDirectory.id,
          filePath: selectedFile,
          isCompleted,
        }),
      });
    } catch (err) {
      console.error('Error updating read status:', err);
    }
  };

  const toggleBookmark = async () => {
    if (!selectedFile || !activeDirectory) return;
    
    const newBookmarks = new Set(bookmarks);
    const isBookmarked = !newBookmarks.has(selectedFile);
    
    if (isBookmarked) {
      newBookmarks.add(selectedFile);
    } else {
      newBookmarks.delete(selectedFile);
    }
    setBookmarks(newBookmarks);

    // Update database
    try {
      await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          directoryId: activeDirectory.id,
          filePath: selectedFile,
          isBookmarked,
        }),
      });
    } catch (err) {
      console.error('Error updating bookmark:', err);
    }
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
            <FileTree 
              nodes={tree} 
              onFileSelect={loadFile} 
              selectedPath={selectedFile}
              completedFiles={completedFiles}
            />
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
            {activeDirectory && (
              <div className="text-sm">
                <span className="text-zinc-500">Current: </span>
                <span className="font-medium">{activeDirectory.name}</span>
              </div>
            )}
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
              onClick={() => router.push('/settings')}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              title="Settings"
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
              <p className="text-zinc-500 dark:text-zinc-400 max-w-md mb-4">
                {activeDirectory 
                  ? 'Select a file from the sidebar to start learning.'
                  : 'No active learning directory found. Go to settings to add one.'
                }
              </p>
              {!activeDirectory && (
                <button
                  onClick={() => router.push('/settings')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                    transition-colors flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Go to Settings
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
