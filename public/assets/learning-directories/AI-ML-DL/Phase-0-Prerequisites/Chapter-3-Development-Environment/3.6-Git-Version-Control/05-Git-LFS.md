# 📦 Git Large File Storage (LFS)

## Overview

Learn how to use Git LFS to track large files in your repository without slowing down Git operations. Perfect for model weights, datasets, and media files.

---

## 📚 Table of Contents

1. [Introduction to Git LFS](#introduction-to-git-lfs)
2. [Installation](#installation)
3. [Setup and Configuration](#setup-and-configuration)
4. [Working with LFS Files](#working-with-lfs-files)
5. [.gitattributes Examples](#gitattributes-examples)
6. [Migrating to LFS](#migrating-to-lfs)
7. [Storage and Bandwidth](#storage-and-bandwidth)
8. [LFS vs DVC](#lfs-vs-dvc)
9. [Troubleshooting](#troubleshooting)
10. [Exercises](#exercises)

---

## 🎯 Introduction to Git LFS

### The Problem

```bash
# Without LFS
git add large_model.h5  # 500MB
# ❌ Entire file in Git history
# ❌ Slow cloning
# ❌ Large repository size
# ❌ Even if deleted, still in history!

# Git repository grows:
Initial clone: 100MB
After 10 model versions: 5GB
After 50 versions: 25GB
```

### The Solution: Git LFS

```bash
# With LFS
git lfs track "*.h5"
git add large_model.h5  # 500MB
# ✅ Git stores pointer (~100 bytes)
# ✅ Fast cloning
# ✅ Small repository size
# ✅ Files stored separately

# Git repository stays small:
Initial clone: 100MB
After 10 model versions: 100MB + pointers
After 50 versions: 100MB + pointers
```

### How Git LFS Works

```bash
# Regular file in Git
┌─────────────────┐
│  Git Repository │
│                 │
│  large_model.h5 │ (500MB in history)
└─────────────────┘

# File with Git LFS
┌─────────────────┐      ┌──────────────┐
│  Git Repository │      │  LFS Storage │
│                 │      │              │
│  pointer file   │─────▶│ actual file  │
│  (~100 bytes)   │      │  (500MB)     │
└─────────────────┘      └──────────────┘

# Pointer file contents
version https://git-lfs.github.com/spec/v1
oid sha256:4d7a214614ab2935c943f9e0ff69d22eadbb8f32b1258daaa5e2ca24d17e2393
size 524288000
```

### When to Use Git LFS

✅ **Use Git LFS for:**
- Model weights (100MB - 2GB)
- Preprocessed datasets (up to few GB)
- Binary files that change occasionally
- Media files (images, videos, audio)
- Compiled libraries

❌ **Don't use Git LFS for:**
- Very large datasets (>5GB) - use DVC instead
- Files that change frequently
- Files that don't need versioning
- When you need data pipelines - use DVC

---

## 📥 Installation

### Windows

```bash
# Method 1: Installer
# Download from: https://git-lfs.github.com/
# Run Git-LFS-windows-v3.x.x.exe

# Method 2: Chocolatey
choco install git-lfs

# Method 3: Scoop
scoop install git-lfs

# Verify installation
git lfs version
# git-lfs/3.4.0 (GitHub; windows amd64; go 1.20.1)
```

### macOS

```bash
# Method 1: Homebrew
brew install git-lfs

# Method 2: MacPorts
port install git-lfs

# Verify
git lfs version
```

### Linux

```bash
# Ubuntu/Debian
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt-get install git-lfs

# Fedora
sudo dnf install git-lfs

# Arch Linux
sudo pacman -S git-lfs

# Verify
git lfs version
```

### Initialize Git LFS

```bash
# Must run once per user account
git lfs install
# Git LFS initialized.

# This updates ~/.gitconfig:
# [filter "lfs"]
#     clean = git-lfs clean -- %f
#     smudge = git-lfs smudge -- %f
#     process = git-lfs filter-process
#     required = true
```

---

## ⚙️ Setup and Configuration

### Track File Patterns

```bash
# Track specific file types
git lfs track "*.h5"
git lfs track "*.pkl"
git lfs track "*.pth"

# Track specific files
git lfs track "data/large_dataset.csv"

# Track directory
git lfs track "models/**"

# View tracked patterns
git lfs track
# Listing tracked patterns
#     *.h5 (.gitattributes)
#     *.pkl (.gitattributes)
#     *.pth (.gitattributes)
```

### .gitattributes

```bash
# git lfs track creates/updates .gitattributes
cat .gitattributes
# *.h5 filter=lfs diff=lfs merge=lfs -text
# *.pkl filter=lfs diff=lfs merge=lfs -text
# *.pth filter=lfs diff=lfs merge=lfs -text

# Commit .gitattributes
git add .gitattributes
git commit -m "Track model files with LFS"
```

### Track by Size

```bash
# Track all files > 100MB (using pre-commit hook)
# Create .git/hooks/pre-commit
#!/bin/bash
# Find files > 100MB not in LFS
find . -type f -size +100M | while read file; do
  if ! git check-attr filter "$file" | grep -q "lfs"; then
    echo "ERROR: $file is >100MB but not tracked by LFS"
    exit 1
  fi
done
```

---

## 🔄 Working with LFS Files

### Adding Files

```bash
# Track pattern first
git lfs track "*.h5"
git add .gitattributes

# Add large file
cp large_model.h5 models/
git add models/large_model.h5

# Git LFS automatically handles it
git commit -m "Add model weights"

# Push (includes LFS files)
git push origin main
```

### Cloning Repositories

```bash
# Standard clone (downloads LFS files)
git clone https://github.com/user/repo.git

# Clone without LFS files (faster)
GIT_LFS_SKIP_SMUDGE=1 git clone https://github.com/user/repo.git

# Later, download specific LFS files
cd repo
git lfs pull --include="models/model_v1.h5"
```

### Fetching LFS Files

```bash
# Fetch all LFS files
git lfs fetch

# Fetch for specific remote
git lfs fetch origin

# Fetch specific files
git lfs fetch --include="*.h5"

# Fetch and checkout
git lfs pull
```

### Checking LFS Status

```bash
# List LFS files
git lfs ls-files
# 4d7a214614 * models/model_v1.h5
# 8e9b315721 * models/model_v2.h5

# Show LFS file info
git lfs ls-files -l
# 4d7a214614 - models/model_v1.h5 (524 MB)
# 8e9b315721 - models/model_v2.h5 (612 MB)

# Check if file is in LFS
git check-attr filter models/model_v1.h5
# models/model_v1.h5: filter: lfs
```

---

## 📝 .gitattributes Examples

### ML Project

```gitattributes
# Model files
*.h5 filter=lfs diff=lfs merge=lfs -text
*.hdf5 filter=lfs diff=lfs merge=lfs -text
*.pkl filter=lfs diff=lfs merge=lfs -text
*.pickle filter=lfs diff=lfs merge=lfs -text
*.pt filter=lfs diff=lfs merge=lfs -text
*.pth filter=lfs diff=lfs merge=lfs -text
*.onnx filter=lfs diff=lfs merge=lfs -text
*.pb filter=lfs diff=lfs merge=lfs -text
*.joblib filter=lfs diff=lfs merge=lfs -text

# Data files
*.csv filter=lfs diff=lfs merge=lfs -text
*.parquet filter=lfs diff=lfs merge=lfs -text
*.arrow filter=lfs diff=lfs merge=lfs -text
*.feather filter=lfs diff=lfs merge=lfs -text

# Compressed files
*.zip filter=lfs diff=lfs merge=lfs -text
*.tar.gz filter=lfs diff=lfs merge=lfs -text
*.7z filter=lfs diff=lfs merge=lfs -text

# Media files
*.jpg filter=lfs diff=lfs merge=lfs -text
*.png filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text
*.wav filter=lfs diff=lfs merge=lfs -text
```

### Computer Vision Project

```gitattributes
# Images
*.jpg filter=lfs diff=lfs merge=lfs -text
*.jpeg filter=lfs diff=lfs merge=lfs -text
*.png filter=lfs diff=lfs merge=lfs -text
*.tif filter=lfs diff=lfs merge=lfs -text
*.tiff filter=lfs diff=lfs merge=lfs -text
*.bmp filter=lfs diff=lfs merge=lfs -text
*.gif filter=lfs diff=lfs merge=lfs -text

# Videos
*.mp4 filter=lfs diff=lfs merge=lfs -text
*.avi filter=lfs diff=lfs merge=lfs -text
*.mov filter=lfs diff=lfs merge=lfs -text
*.mkv filter=lfs diff=lfs merge=lfs -text

# Models
*.h5 filter=lfs diff=lfs merge=lfs -text
*.pth filter=lfs diff=lfs merge=lfs -text

# Datasets
data/raw/*.zip filter=lfs diff=lfs merge=lfs -text
data/processed/*.npz filter=lfs diff=lfs merge=lfs -text
```

### NLP Project

```gitattributes
# Embeddings and models
*.bin filter=lfs diff=lfs merge=lfs -text
*.vec filter=lfs diff=lfs merge=lfs -text
*.h5 filter=lfs diff=lfs merge=lfs -text
*.pt filter=lfs diff=lfs merge=lfs -text

# Datasets
*.txt filter=lfs diff=lfs merge=lfs -text
*.csv filter=lfs diff=lfs merge=lfs -text
*.jsonl filter=lfs diff=lfs merge=lfs -text

# Compressed datasets
*.tar.gz filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text
```

---

## 🔄 Migrating to LFS

### Migrate Existing Files

```bash
# WARNING: Rewrites history!
# Make backup first: git clone --mirror repo.git backup.git

# Install git-lfs if needed
git lfs install

# Migrate specific file types
git lfs migrate import --include="*.h5,*.pkl,*.pth"

# This:
# 1. Finds all matching files in history
# 2. Converts them to LFS
# 3. Rewrites Git history
# 4. Updates .gitattributes

# Check migration
git lfs ls-files

# Force push (required due to rewritten history)
git push --force --all
```

### Migrate Specific Files

```bash
# Migrate only specific files
git lfs migrate import --include="models/model_v1.h5"

# Migrate from specific commit
git lfs migrate import --include="*.h5" --everything
```

### Migrate Without Rewriting History

```bash
# For files not yet committed
# 1. Remove file from staging
git rm --cached large_file.h5

# 2. Track with LFS
git lfs track "*.h5"
git add .gitattributes

# 3. Re-add file (now with LFS)
git add large_file.h5
git commit -m "Convert to LFS"
```

---

## 💰 Storage and Bandwidth

### GitHub LFS Limits

```bash
# Free accounts
Storage: 1 GB
Bandwidth: 1 GB/month

# Pro accounts ($4/month)
Storage: 2 GB  
Bandwidth: 2 GB/month

# Additional data packs
$5/month per 50GB storage + 50GB bandwidth

# Check usage
git lfs ls-files -s
# 524288000 models/model_v1.h5
# 641728512 models/model_v2.h5
# Total: ~1.1 GB
```

### GitLab LFS

```bash
# Free tier
Storage: 10 GB (repository + LFS)
Bandwidth: Unlimited

# Premium/Ultimate
Storage: 10 GB (repository + LFS)
Additional: Purchase as needed
```

### Cost Optimization

```bash
# 1. Track only necessary files
# Don't track:
# - Temporary files
# - Files that can be regenerated
# - Very large files (use DVC instead)

# 2. Prune old versions
git lfs prune

# 3. Use shallow clones
git clone --depth 1 https://github.com/user/repo.git

# 4. Clone without LFS initially
GIT_LFS_SKIP_SMUDGE=1 git clone https://github.com/user/repo.git
# Download only needed files
git lfs pull --include="models/latest.h5"
```

---

## ⚖️ LFS vs DVC

### Comparison

| Feature | Git LFS | DVC |
|---------|---------|-----|
| **Storage** | GitHub/GitLab LFS | S3, GCS, Azure, SSH |
| **Cost** | $5/50GB/month (GitHub) | Cloud storage costs |
| **Max File Size** | 2GB recommended | No limit |
| **Pipeline Support** | No | Yes |
| **Versioning** | Via Git | Via DVC |
| **Collaboration** | Git-native | Requires DVC |
| **Setup** | Simple | More complex |
| **Best For** | Models, small data | Large data, pipelines |

### When to Use Git LFS

```bash
✅ Model weights (< 2GB)
✅ Preprocessed datasets (< 1GB)
✅ Binary assets
✅ Simple workflow
✅ Git-centric team
✅ GitHub/GitLab hosting
```

### When to Use DVC

```bash
✅ Large datasets (> 5GB)
✅ Data pipelines
✅ Experiment tracking
✅ Multiple data versions
✅ Custom storage (S3, etc.)
✅ Advanced workflows
```

### Using Both

```bash
# Git LFS for models
git lfs track "*.h5"

# DVC for data
dvc add data/large_dataset.csv

# .gitattributes
*.h5 filter=lfs diff=lfs merge=lfs -text

# .gitignore (from DVC)
/data/large_dataset.csv

# Track DVC file with Git
git add data/large_dataset.csv.dvc
```

---

## 🔧 Troubleshooting

### Problem: LFS Files Not Downloaded

```bash
# Symptom
cat models/model.h5
# version https://git-lfs.github.com/spec/v1
# oid sha256:...

# Solution
git lfs pull

# Or re-initialize
git lfs install --force
git lfs pull
```

### Problem: Running Out of Bandwidth

```bash
# Solution 1: Clone without LFS
GIT_LFS_SKIP_SMUDGE=1 git clone https://github.com/user/repo.git

# Solution 2: Download specific files only
git lfs pull --include="models/model_latest.h5"

# Solution 3: Use shallow clone
git clone --depth 1 https://github.com/user/repo.git
```

### Problem: LFS File Too Large

```bash
# GitHub limit: 2GB per file
# Error: this exceeds GitHub's file size limit of 2.00 GB

# Solution 1: Use DVC instead
dvc add large_file.bin

# Solution 2: Split file
split -b 1G large_file.bin large_file_part_
git lfs track "large_file_part_*"

# Solution 3: External storage
# Store on S3, track metadata in Git
```

### Problem: Accidentally Committed Large File

```bash
# Remove from Git, add to LFS
# 1. Remove from history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/large_file" \
  --prune-empty --tag-name-filter cat -- --all

# 2. Track with LFS
git lfs track "large_file"

# 3. Re-add
git add large_file .gitattributes
git commit -m "Convert to LFS"

# 4. Force push
git push --force --all
```

---

## 💪 Exercises

### Exercise 1: Basic LFS Setup

Setup Git LFS for an ML project.

**Solution:**

```bash
# Install and initialize
git lfs install

# Create repository
mkdir ml-project && cd ml-project
git init

# Track model files
git lfs track "*.h5"
git lfs track "*.pkl"

# Commit .gitattributes
git add .gitattributes
git commit -m "Setup Git LFS"

# Add model
echo "fake model data" > model.h5
git add model.h5
git commit -m "Add model"

# Verify
git lfs ls-files
```

### Exercise 2: Clone and Pull LFS

Clone repository and manage LFS files.

**Solution:**

```bash
# Clone without LFS files
GIT_LFS_SKIP_SMUDGE=1 git clone https://github.com/user/ml-repo.git
cd ml-repo

# List LFS files (pointers)
git lfs ls-files

# Pull specific file
git lfs pull --include="models/model_v1.h5"

# Pull all LFS files
git lfs pull
```

### Exercise 3: Migrate to LFS

Migrate existing large files to LFS.

**Solution:**

```bash
# Check file sizes
find . -type f -size +50M -exec ls -lh {} \;

# Install LFS
git lfs install

# Migrate (rewrites history!)
git lfs migrate import --include="*.h5,*.pkl" --everything

# Verify migration
git lfs ls-files

# Force push
git push --force --all

# Push LFS files
git lfs push --all origin
```

---

## 🎯 Key Takeaways

✅ **Git LFS**: Stores large files separately from Git history  
✅ **Installation**: `git lfs install` (once per user)  
✅ **Tracking**: `git lfs track "*.h5"` creates .gitattributes  
✅ **Best For**: Model weights, small datasets (< 2GB)  
✅ **Limits**: GitHub: 1GB free, GitLab: 10GB  
✅ **Commands**: `git lfs ls-files`, `git lfs pull`, `git lfs fetch`  
✅ **Migration**: `git lfs migrate import` (rewrites history!)  
✅ **Alternative**: Use DVC for large datasets and pipelines  

---

## 🔗 Navigation

- **Previous**: [04-Git-for-ML.md](./04-Git-for-ML.md)
- **Next**: [06-DVC.md](./06-DVC.md)
- **Up**: [README.md](./README.md)
- **Chapter Home**: [Chapter 3 - Development Environment](../README.md)

---

**Happy LFS Tracking! 📦🚀**
