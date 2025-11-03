'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Settings as SettingsIcon,
  FolderOpen,
  Trash2,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Bookmark,
  Loader2,
} from 'lucide-react';

interface Directory {
  id: number;
  name: string;
  path: string;
  isActive: boolean;
  createdAt: string;
  _count: {
    readStatuses: number;
    bookmarks: number;
  };
}

export default function SettingsPage() {
  const router = useRouter();
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPath, setNewPath] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadDirectories();
  }, []);

  const loadDirectories = async () => {
    try {
      const response = await fetch('/api/directories');
      if (response.ok) {
        const data = await response.json();
        setDirectories(data.directories);
      }
    } catch (err) {
      console.error('Error loading directories:', err);
      setError('Failed to load directories');
    } finally {
      setLoading(false);
    }
  };

  const handleAddDirectory = async () => {
    if (!newName.trim() || !newPath.trim()) {
      setError('Name and path are required');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const response = await fetch('/api/directories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, path: newPath }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add directory');
      }

      setNewName('');
      setNewPath('');
      setShowAddForm(false);
      await loadDirectories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add directory');
    } finally {
      setProcessing(false);
    }
  };

  const handleSetActive = async (id: number) => {
    setProcessing(true);
    try {
      const response = await fetch(`/api/directories/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: true }),
      });

      if (response.ok) {
        await loadDirectories();
      }
    } catch (err) {
      console.error('Error setting active directory:', err);
      setError('Failed to set active directory');
    } finally {
      setProcessing(false);
    }
  };

  const handleDeleteDirectory = async (id: number) => {
    if (!confirm('Are you sure you want to delete this directory? All associated data will be lost.')) {
      return;
    }

    setProcessing(true);
    try {
      const response = await fetch(`/api/directories/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadDirectories();
      }
    } catch (err) {
      console.error('Error deleting directory:', err);
      setError('Failed to delete directory');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <SettingsIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Add Directory Section */}
        <div className="mb-8">
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              disabled={processing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg 
                hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Plus className="w-5 h-5" />
              Add Learning Directory
            </button>
          ) : (
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold">Add New Directory</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2">Directory Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g., Web Development Course"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 
                    bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Directory Path</label>
                <input
                  type="text"
                  value={newPath}
                  onChange={(e) => setNewPath(e.target.value)}
                  placeholder="E:\learning\web-dev"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 
                    bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleAddDirectory}
                  disabled={processing}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                    transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Add Directory
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setError('');
                    setNewName('');
                    setNewPath('');
                  }}
                  disabled={processing}
                  className="px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg 
                    hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Directories List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Learning Directories</h2>
          
          {directories.length === 0 ? (
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-8 text-center">
              <FolderOpen className="w-12 h-12 mx-auto text-zinc-400 mb-4" />
              <p className="text-zinc-500 dark:text-zinc-400">
                No directories added yet. Add your first learning directory to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {directories.map((dir) => (
                <div
                  key={dir.id}
                  className={`
                    border rounded-xl p-4 transition-all
                    ${dir.isActive 
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{dir.name}</h3>
                        {dir.isActive && (
                          <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 font-mono">
                        {dir.path}
                      </p>
                      <div className="flex gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{dir._count.readStatuses} completed</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bookmark className="w-4 h-4" />
                          <span>{dir._count.bookmarks} bookmarked</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      {!dir.isActive && (
                        <button
                          onClick={() => handleSetActive(dir.id)}
                          disabled={processing}
                          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg 
                            transition-colors disabled:opacity-50"
                          title="Set as active"
                        >
                          <FolderOpen className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteDirectory(dir.id)}
                        disabled={processing}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 
                          rounded-lg transition-colors disabled:opacity-50"
                        title="Delete directory"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
