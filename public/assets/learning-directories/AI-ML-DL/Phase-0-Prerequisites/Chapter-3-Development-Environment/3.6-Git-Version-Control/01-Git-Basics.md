# 📚 Git Basics

## Overview

Master the fundamentals of Git version control. Learn installation, configuration, and essential commands for tracking changes, managing commits, and maintaining project history.

---

## 📚 Table of Contents

1. [What is Version Control?](#what-is-version-control)
2. [Installing Git](#installing-git)
3. [Initial Configuration](#initial-configuration)
4. [Creating Repositories](#creating-repositories)
5. [Basic Git Workflow](#basic-git-workflow)
6. [Understanding .gitignore](#understanding-gitignore)
7. [Viewing History](#viewing-history)
8. [Undoing Changes](#undoing-changes)
9. [Common Patterns](#common-patterns)
10. [Exercises](#exercises)

---

## 🤔 What is Version Control?

### Why Version Control?

Version control systems (VCS) track changes to files over time, allowing you to:

- **Track History**: See who changed what, when, and why
- **Collaboration**: Multiple people work on same project
- **Experimentation**: Try new features without breaking working code
- **Recovery**: Roll back to previous versions
- **Branching**: Develop features in isolation

### Centralized vs Distributed VCS

```
Centralized (SVN):          Distributed (Git):
                            
     Server                    Server (GitHub)
       |                      /    |    \
   /   |   \            Remote  Remote  Remote
 Dev1 Dev2 Dev3         /        |        \
                      Dev1      Dev2      Dev3
                     (Full)    (Full)    (Full)
                     (Repo)    (Repo)    (Repo)
```

**Git Benefits**:
- Work offline
- Fast operations (local)
- Every clone is a full backup
- Powerful branching
- Industry standard

---

## 📥 Installing Git

### Windows

```bash
# Method 1: Git for Windows (recommended)
# Download from: https://git-scm.com/download/win
# Includes Git Bash, Git GUI, and Shell Integration

# Method 2: Winget
winget install --id Git.Git -e --source winget

# Method 3: Chocolatey
choco install git

# Verify installation
git --version
# Output: git version 2.43.0.windows.1

# Configure line endings (important for Windows)
git config --global core.autocrlf true
```

### macOS

```bash
# Method 1: Homebrew (recommended)
brew install git

# Method 2: Xcode Command Line Tools
xcode-select --install

# Method 3: Download from git-scm.com
# Visit: https://git-scm.com/download/mac

# Verify installation
git --version
# Output: git version 2.43.0
```

### Linux

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install git

# Fedora/CentOS/RHEL
sudo yum install git  # Or dnf install git

# Arch Linux
sudo pacman -S git

# From source (latest version)
# Install dependencies first
sudo apt install dh-autoreconf libcurl4-gnutls-dev libexpat1-dev \
  gettext libz-dev libssl-dev

# Download and compile
wget https://github.com/git/git/archive/v2.43.0.tar.gz
tar -zxf v2.43.0.tar.gz
cd git-2.43.0
make configure
./configure --prefix=/usr
make all
sudo make install

# Verify installation
git --version
```

---

## ⚙️ Initial Configuration

### User Identity

```bash
# Set your name (required)
git config --global user.name "Your Name"

# Set your email (required)
git config --global user.email "your.email@example.com"

# Verify settings
git config user.name
git config user.email

# View all configuration
git config --list
```

### Configuration Levels

```bash
# System-wide (all users)
git config --system setting value

# User-level (your account)
git config --global setting value

# Repository-level (current repo only)
git config --local setting value

# Show where config is from
git config --list --show-origin
```

### Essential Configuration

```bash
# Default branch name
git config --global init.defaultBranch main

# Default editor
git config --global core.editor "code --wait"  # VS Code
git config --global core.editor "vim"          # Vim
git config --global core.editor "nano"         # Nano
git config --global core.editor "notepad"      # Notepad (Windows)

# Enable colors
git config --global color.ui auto

# Set default merge strategy
git config --global pull.rebase false  # Merge (default)
# Or: git config --global pull.rebase true  # Rebase

# Configure line endings
# Windows:
git config --global core.autocrlf true
# macOS/Linux:
git config --global core.autocrlf input

# Set default push behavior
git config --global push.default simple
```

### Aliases (Shortcuts)

```bash
# Create shortcuts for common commands
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --oneline --graph --all'

# Use aliases
git st              # Same as git status
git co main         # Same as git checkout main
git visual          # Pretty log view
```

### Configuration File

```ini
# ~/.gitconfig (user-level)
[user]
    name = Your Name
    email = your.email@example.com

[core]
    editor = code --wait
    autocrlf = input

[init]
    defaultBranch = main

[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = log --oneline --graph --all

[color]
    ui = auto

[pull]
    rebase = false

[push]
    default = simple
```

---

## 🆕 Creating Repositories

### Initialize New Repository

```bash
# Create project directory
mkdir my-ml-project
cd my-ml-project

# Initialize Git repository
git init
# Output: Initialized empty Git repository in /path/to/my-ml-project/.git/

# This creates .git/ directory (hidden)
ls -la
# .git/  # Git repository data

# Check status
git status
# On branch main
# No commits yet
```

### Clone Existing Repository

```bash
# Clone from URL
git clone https://github.com/username/repo.git

# Clone into specific directory
git clone https://github.com/username/repo.git my-folder

# Clone specific branch
git clone -b develop https://github.com/username/repo.git

# Shallow clone (faster, less history)
git clone --depth 1 https://github.com/username/repo.git

# Clone with submodules
git clone --recursive https://github.com/username/repo.git
```

---

## 🔄 Basic Git Workflow

### The Three States

```
Working Directory  →  Staging Area  →  Repository
  (Modified)          (Staged)         (Committed)
       |                  |                 |
    [edit]            [git add]         [git commit]
       |                  |                 |
    file.py  ────────→  file.py  ────────→ file.py
  (changes)           (snapshot)         (history)
```

### Checking Status

```bash
# Check repository status
git status

# Example output:
# On branch main
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git restore <file>..." to discard changes in working directory)
#         modified:   model.py
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#         train.py

# Short status
git status -s
# M model.py    # Modified
# ?? train.py   # Untracked
# A utils.py    # Added (staged)
# D old.py      # Deleted
```

### Adding Files (Staging)

```bash
# Add specific file
git add file.py

# Add multiple files
git add file1.py file2.py file3.py

# Add all files in directory
git add .

# Add all Python files
git add *.py

# Add all files (including deletions)
git add -A
# or
git add --all

# Add only tracked files (ignore new files)
git add -u
# or
git add --update

# Interactive staging
git add -i
# or
git add --interactive

# Add parts of file (patch mode)
git add -p file.py
```

### Committing Changes

```bash
# Commit staged changes
git commit -m "Add feature X"

# Commit with detailed message
git commit -m "Add LSTM model implementation

- Implement bidirectional LSTM
- Add dropout for regularization
- Integrate with existing pipeline"

# Commit all tracked changes (skip staging)
git commit -am "Quick fix"

# Open editor for commit message
git commit

# Amend last commit
git commit --amend -m "New message"

# Commit with specific author
git commit --author="John Doe <john@example.com>" -m "Fix bug"
```

### Viewing Differences

```bash
# Show unstaged changes
git diff

# Show staged changes
git diff --staged
# or
git diff --cached

# Compare with specific commit
git diff HEAD~1

# Compare two commits
git diff abc123 def456

# Show changes in specific file
git diff file.py

# Word-level diff
git diff --word-diff

# Summary of changes
git diff --stat
```

---

## 🚫 Understanding .gitignore

### What is .gitignore?

Files specified in `.gitignore` are not tracked by Git.

### Creating .gitignore

```bash
# Create .gitignore file
touch .gitignore

# Edit with your editor
code .gitignore
```

### Common Patterns

```.gitignore
# Comments start with #

# Exact filename
secret.txt

# File extension
*.log
*.tmp

# Directory
logs/
temp/

# All files in directory but not subdirectories
/logs/*

# Specific path
src/config/local.py

# Wildcard
**/temp

# Negate (DO track this file)
!important.log

# Track directory but ignore contents
data/
!data/.gitkeep
```

### ML Project .gitignore

```.gitignore
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
*.egg-info/
dist/
build/

# Virtual environments
venv/
env/
ENV/
.venv

# Jupyter
.ipynb_checkpoints/
*.ipynb_checkpoints

# Data files
data/
*.csv
*.tsv
*.json
*.xml

# Model files
models/
*.h5
*.hdf5
*.pkl
*.pickle
*.pt
*.pth

# Logs
logs/
*.log
wandb/
mlruns/

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Environment variables
.env

# Ignore all .txt except README
*.txt
!README.txt
```

### Applying .gitignore

```bash
# Create .gitignore
echo "*.log" > .gitignore
echo "venv/" >> .gitignore

# Add and commit
git add .gitignore
git commit -m "Add .gitignore"

# Remove already-tracked file
git rm --cached file.log
git commit -m "Remove log file from tracking"

# Remove directory from tracking
git rm -r --cached logs/
git commit -m "Stop tracking logs directory"
```

### Global .gitignore

```bash
# Create global ignore file
touch ~/.gitignore_global

# Add patterns
echo ".DS_Store" >> ~/.gitignore_global
echo "Thumbs.db" >> ~/.gitignore_global
echo "*.swp" >> ~/.gitignore_global

# Configure Git to use it
git config --global core.excludesfile ~/.gitignore_global
```

---

## 📜 Viewing History

### Git Log

```bash
# View commit history
git log

# Example output:
# commit abc123def456 (HEAD -> main)
# Author: Your Name <your.email@example.com>
# Date:   Mon Jan 15 10:30:00 2024 -0500
#
#     Add feature X

# One-line format
git log --oneline
# abc123d Add feature X
# def456e Fix bug Y

# Last N commits
git log -3  # Last 3 commits

# With statistics
git log --stat

# With full diff
git log -p

# Graph view
git log --graph --oneline --all

# Decorated graph
git log --graph --oneline --all --decorate
```

### Searching History

```bash
# Search by message
git log --grep="bug fix"

# Search by author
git log --author="John"

# Search by date
git log --since="2 weeks ago"
git log --after="2024-01-01"
git log --before="2024-01-31"

# Search by file
git log -- file.py

# Follow file renames
git log --follow file.py

# Search by content
git log -S "function_name"  # Pickaxe
git log -G "regex_pattern"
```

### Viewing Commits

```bash
# Show commit details
git show abc123d

# Show specific file in commit
git show abc123d:file.py

# Show files changed in commit
git show --name-only abc123d

# Show commit statistics
git show --stat abc123d
```

### Git Blame

```bash
# Show who changed each line
git blame file.py

# Blame with line numbers
git blame -L 10,20 file.py  # Lines 10-20

# Ignore whitespace changes
git blame -w file.py

# Show email addresses
git blame -e file.py
```

---

## ↩️ Undoing Changes

### Discard Working Directory Changes

```bash
# Discard changes in file
git restore file.py

# Old way (still works)
git checkout -- file.py

# Discard all changes
git restore .

# Restore from specific commit
git restore --source=abc123d file.py
```

### Unstage Files

```bash
# Unstage file
git restore --staged file.py

# Old way
git reset HEAD file.py

# Unstage all files
git restore --staged .
```

### Amending Commits

```bash
# Change last commit message
git commit --amend -m "New message"

# Add forgotten file to last commit
git add forgotten.py
git commit --amend --no-edit

# Edit last commit interactively
git commit --amend
# Opens editor to modify message
```

### Reset Commits

```bash
# Reset to previous commit (keep changes)
git reset HEAD~1

# Reset and discard all changes (DANGEROUS!)
git reset --hard HEAD~1

# Reset to specific commit
git reset --hard abc123d

# Undo reset (if you haven't garbage collected)
git reflog
git reset --hard HEAD@{1}
```

### Reverting Commits

```bash
# Create new commit that undoes changes
git revert abc123d

# Revert without committing
git revert --no-commit abc123d

# Revert range of commits
git revert abc123d..def456e
```

---

## 🎯 Common Patterns

### Daily Workflow

```bash
# 1. Start work
git status                    # Check current state
git pull origin main          # Get latest changes

# 2. Make changes
# Edit files...

# 3. Review changes
git status                    # See what changed
git diff                      # Review changes

# 4. Stage and commit
git add .
git commit -m "Descriptive message"

# 5. Push to remote
git push origin main
```

### Feature Development

```bash
# 1. Create feature branch
git checkout -b feature/new-model

# 2. Work on feature
# Edit files...
git add .
git commit -m "Implement model architecture"

# More commits...
git commit -m "Add training loop"
git commit -m "Add evaluation metrics"

# 3. Merge to main
git checkout main
git merge feature/new-model

# 4. Delete feature branch
git branch -d feature/new-model
```

### Checking Out Previous Versions

```bash
# View list of commits
git log --oneline

# Checkout specific commit (detached HEAD)
git checkout abc123d

# Look around, test, etc.
# To return to latest:
git checkout main

# Create branch from old commit
git checkout -b fix-from-old abc123d
```

---

## 💪 Exercises

### Exercise 1: First Repository

Create your first Git repository and make commits.

**Solution:**

```bash
# Create project
mkdir git-practice
cd git-practice

# Initialize Git
git init

# Create files
echo "# My Project" > README.md
echo "print('Hello, Git!')" > hello.py

# Check status
git status

# Stage files
git add README.md hello.py

# Commit
git commit -m "Initial commit with README and hello script"

# Make a change
echo "This is a Git practice project" >> README.md

# View diff
git diff

# Commit change
git add README.md
git commit -m "Add project description"

# View history
git log --oneline
```

### Exercise 2: .gitignore Practice

Create a proper `.gitignore` for an ML project.

**Solution:**

```bash
# Create ML project structure
mkdir ml-project
cd ml-project
git init

# Create various files
mkdir data models logs
touch train.py test.py
touch data/train.csv models/model.h5 logs/training.log
touch .env

# Create .gitignore
cat > .gitignore << 'EOF'
# Data
data/
*.csv

# Models
models/
*.h5
*.pkl

# Logs
logs/
*.log

# Environment
.env
venv/

# Python
__pycache__/
*.pyc

# IDE
.vscode/
.idea/
EOF

# Check what will be tracked
git status
# Should only show train.py, test.py, .gitignore

# Commit
git add .
git commit -m "Initial commit with .gitignore"
```

### Exercise 3: Undo Changes

Practice undoing different types of changes.

**Solution:**

```bash
# Setup
mkdir undo-practice
cd undo-practice
git init

# Create and commit file
echo "Original content" > file.txt
git add file.txt
git commit -m "Add file"

# Scenario 1: Undo working directory changes
echo "Unwanted changes" >> file.txt
git status  # Shows modified
git restore file.txt  # Undo changes
cat file.txt  # Back to "Original content"

# Scenario 2: Unstage file
echo "New content" >> file.txt
git add file.txt
git status  # Shows staged
git restore --staged file.txt  # Unstage
git status  # Shows modified (not staged)

# Scenario 3: Amend commit
echo "Line 2" >> file.txt
git add file.txt
git commit -m "Add line 2"
echo "Line 3" >> file.txt  # Forgot to add this!
git add file.txt
git commit --amend -m "Add lines 2 and 3"  # Fix!

# Scenario 4: Undo last commit (keep changes)
git reset HEAD~1
git status  # Changes are unstaged

# Scenario 5: Undo last commit (discard changes)
git add file.txt
git commit -m "Test commit"
git reset --hard HEAD~1  # GONE!
```

---

## 🎯 Key Takeaways

✅ **Git**: Distributed version control system for tracking changes  
✅ **Repository**: Project tracked by Git with full history  
✅ **Three States**: Working directory → Staging area → Repository  
✅ **Commands**: `add`, `commit`, `status`, `log`, `diff`  
✅ **.gitignore**: Specify files to exclude from tracking  
✅ **History**: Use `log`, `show`, `blame` to explore  
✅ **Undo**: `restore` for working/staging, `reset`/`revert` for commits  
✅ **Configuration**: Set name, email, editor, aliases  

---

## 🔗 Navigation

- **Next**: [02-Branching-Merging.md](./02-Branching-Merging.md)
- **Up**: [README.md](./README.md)
- **Chapter Home**: [Chapter 3 - Development Environment](../README.md)

---

**Happy Version Control! 🎉📝**
