'use client';

import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from 'lucide-react';
import { useState } from 'react';

export interface TreeNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: TreeNode[];
}

interface FileTreeProps {
  nodes: TreeNode[];
  onFileSelect: (path: string, name: string) => void;
  selectedPath?: string;
}

interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  onFileSelect: (path: string, name: string) => void;
  selectedPath?: string;
}

function TreeNodeItem({ node, level, onFileSelect, selectedPath }: TreeNodeItemProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2); // Auto-expand first 2 levels

  const isSelected = selectedPath === node.path;
  const isFolder = node.type === 'folder';

  const handleClick = () => {
    if (isFolder) {
      setIsExpanded(!isExpanded);
    } else {
      onFileSelect(node.path, node.name);
    }
  };

  const Icon = isFolder ? (isExpanded ? FolderOpen : Folder) : File;
  const ChevronIcon = isExpanded ? ChevronDown : ChevronRight;

  return (
    <div>
      <button
        onClick={handleClick}
        className={`
          flex items-center w-full px-2 py-1.5 rounded-md text-sm
          transition-colors duration-150
          hover:bg-zinc-100 dark:hover:bg-zinc-800
          ${isSelected ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-zinc-700 dark:text-zinc-300'}
        `}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        {isFolder && (
          <ChevronIcon className="w-4 h-4 mr-1 shrink-0" />
        )}
        {!isFolder && <div className="w-5 mr-1" />}
        <Icon className="w-4 h-4 mr-2 shrink-0" />
        <span className="truncate flex-1 text-left">{node.name}</span>
      </button>
      
      {isFolder && isExpanded && node.children && node.children.length > 0 && (
        <div>
          {node.children.map((child, index) => (
            <TreeNodeItem
              key={`${child.path}-${index}`}
              node={child}
              level={level + 1}
              onFileSelect={onFileSelect}
              selectedPath={selectedPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileTree({ nodes, onFileSelect, selectedPath }: FileTreeProps) {
  if (!nodes || nodes.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
        No files found
      </div>
    );
  }

  return (
    <div className="py-2">
      {nodes.map((node, index) => (
        <TreeNodeItem
          key={`${node.path}-${index}`}
          node={node}
          level={0}
          onFileSelect={onFileSelect}
          selectedPath={selectedPath}
        />
      ))}
    </div>
  );
}
