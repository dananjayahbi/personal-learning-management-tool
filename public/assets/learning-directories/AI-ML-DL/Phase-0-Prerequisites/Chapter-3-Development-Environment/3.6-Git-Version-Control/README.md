# 3.6 Git & Version Control

## 📋 Overview

Version control is essential for tracking changes, collaborating with others, and maintaining project history. Git is the industry standard, and this section covers Git specifically for ML/data science projects.

**Duration:** 4-5 days

---

## 📚 Topics

1. [Git Basics](./01-Git-Basics.md)
   - What is version control?
   - Installing Git
   - Configuration (user, email, editor)
   - Repository initialization
   - add, commit, status, log
   - .gitignore fundamentals

2. [Branching & Merging](./02-Branching-Merging.md)
   - Understanding branches
   - Creating and switching branches
   - Merging strategies
   - Resolving conflicts
   - Branch naming conventions
   - Gitflow workflow
   - Feature branch workflow

3. [Remote Repositories](./03-Remote-Repositories.md)
   - GitHub, GitLab, Bitbucket
   - Remote operations (push, pull, fetch)
   - Forking and cloning
   - Pull requests/Merge requests
   - Code review process
   - Collaborating with teams

4. [Git for ML Projects](./04-Git-for-ML.md)
   - What to version control
   - What NOT to commit
   - .gitignore for ML projects
   - Handling large files
   - Data versioning strategies
   - Model versioning
   - Experiment tracking

5. [Git LFS (Large File Storage)](./05-Git-LFS.md)
   - Why Git LFS?
   - Installation and setup
   - Tracking large files
   - Working with LFS files
   - Storage limits and costs
   - Alternatives to LFS

6. [DVC (Data Version Control)](./06-DVC.md)
   - Introduction to DVC
   - Installation and setup
   - Tracking datasets
   - Pipeline versioning
   - Remote storage configuration
   - DVC vs Git LFS
   - Complete ML pipeline with DVC

---

## 🎯 Learning Objectives

After completing this section, you will be able to:
- Use Git for everyday development
- Create effective branching strategies
- Collaborate via GitHub/GitLab
- Handle large files in ML projects
- Version control data with DVC
- Resolve merge conflicts
- Maintain clean project history
- Implement proper .gitignore for ML

---

## 🔑 Key Concepts

### Repository
A project tracked by Git, containing all files and their history.

### Commit
A snapshot of your project at a specific point in time.

### Branch
An independent line of development.

### Remote
A version of your repository hosted on a server (GitHub, GitLab).

### Merge
Combining changes from different branches.

---

## ⏱️ Time Allocation

| Topic | Estimated Time |
|-------|----------------|
| Git Basics | 6-8 hours |
| Branching & Merging | 6-8 hours |
| Remote Repositories | 4-6 hours |
| Git for ML Projects | 4-6 hours |
| Git LFS | 4-6 hours |
| DVC | 6-8 hours |
| **Total** | **4-5 days** |

---

## 📝 Exercises

Each topic file contains hands-on exercises. Total exercises: **22+**

**Key Projects:**
- Initialize ML project with Git
- Collaborate on GitHub with pull requests
- Version control dataset with DVC
- Build complete ML pipeline with version control

---

## 💡 Quick Start

### Install Git

```bash
# Linux
sudo apt-get install git  # Ubuntu/Debian
sudo yum install git       # CentOS/Fedora

# macOS
brew install git

# Windows
# Download from: https://git-scm.com/download/win

# Verify installation
git --version
```

### Initial Configuration

```bash
# Set your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default editor
git config --global core.editor "code --wait"  # VS Code
git config --global core.editor "vim"          # Vim

# Set default branch name
git config --global init.defaultBranch main

# View all configuration
git config --list

# View specific config
git config user.name
```

### Basic Git Workflow

```bash
# Initialize repository
git init

# Check status
git status

# Stage files
git add file.py
git add .                  # Add all files

# Commit changes
git commit -m "Add feature X"

# View history
git log
git log --oneline
git log --graph --all

# See changes
git diff
git diff --staged
```

---

## 🌿 Branching Strategy

### Create and Switch Branches

```bash
# Create branch
git branch feature-new-model

# Switch to branch
git checkout feature-new-model

# Create and switch (shortcut)
git checkout -b feature-new-model

# Modern way (Git 2.23+)
git switch feature-new-model
git switch -c feature-new-model  # Create and switch

# List branches
git branch
git branch -a  # Include remote branches

# Delete branch
git branch -d feature-new-model
git branch -D feature-new-model  # Force delete
```

### Merging

```bash
# Switch to main
git checkout main

# Merge feature branch
git merge feature-new-model

# Merge with no-fast-forward (preserves branch history)
git merge --no-ff feature-new-model

# Abort merge if conflicts
git merge --abort
```

### Gitflow Workflow

```
main          ─────●─────●─────●────────●─────
               ↗        ↗             ↗
develop    ──●─────●────●─────●───●──●────────
              ↘   ↗      ↘   ↗   ↗
feature      ──●●──      ──●●──  /
                              ──●
```

Branches:
- **main**: Production-ready code
- **develop**: Integration branch
- **feature/***: New features
- **hotfix/***: Emergency fixes
- **release/***: Release preparation

---

## 🌐 Working with Remotes

### GitHub/GitLab Setup

```bash
# Clone repository
git clone https://github.com/username/repo.git

# View remotes
git remote -v

# Add remote
git remote add origin https://github.com/username/repo.git

# Remove remote
git remote remove origin

# Rename remote
git remote rename origin upstream
```

### Push and Pull

```bash
# Push to remote
git push origin main

# Push new branch
git push -u origin feature-branch

# Pull changes
git pull origin main

# Fetch without merging
git fetch origin

# Pull with rebase
git pull --rebase origin main
```

### Pull Requests

```bash
# Workflow for contributing
1. Fork repository (on GitHub)
2. Clone your fork
   git clone https://github.com/your-username/repo.git

3. Create feature branch
   git checkout -b feature-new

4. Make changes and commit
   git add .
   git commit -m "Add new feature"

5. Push to your fork
   git push origin feature-new

6. Create pull request on GitHub
7. Address review comments
8. Merge when approved
```

---

## 🤖 .gitignore for ML Projects

### Comprehensive .gitignore

```.gitignore
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual Environments
venv/
ENV/
env/
.venv

# Jupyter Notebook
.ipynb_checkpoints/
*.ipynb_checkpoints

# Data files
data/
*.csv
*.tsv
*.dat
*.json
*.xml
*.sql
*.db
*.sqlite

# Model files
models/
*.h5
*.hdf5
*.pkl
*.pickle
*.pt
*.pth
*.onnx
*.pb

# Logs and outputs
logs/
*.log
outputs/
runs/
wandb/
mlruns/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Secrets
.env
*.key
*.pem
config/secrets.yaml

# Large files (use Git LFS instead)
*.zip
*.tar.gz
*.rar

# OS
Thumbs.db
.DS_Store

# Experiment tracking
.neptune/
```

---

## 📦 Git LFS (Large File Storage)

### Setup

```bash
# Install Git LFS
# Windows: Included with Git for Windows
# macOS: brew install git-lfs
# Linux: sudo apt-get install git-lfs

# Initialize in repository
git lfs install

# Track file types
git lfs track "*.psd"
git lfs track "*.zip"
git lfs track "*.h5"
git lfs track "*.pkl"

# This creates .gitattributes
cat .gitattributes
# Output:
# *.psd filter=lfs diff=lfs merge=lfs -text
# *.zip filter=lfs diff=lfs merge=lfs -text

# Commit .gitattributes
git add .gitattributes
git commit -m "Configure Git LFS"

# Add large file
git add large_model.h5
git commit -m "Add trained model"
git push origin main
```

### Working with LFS

```bash
# See LFS files
git lfs ls-files

# Pull LFS files
git lfs pull

# Fetch LFS files
git lfs fetch

# Prune old LFS files
git lfs prune

# Migrate existing files to LFS
git lfs migrate import --include="*.h5"
```

---

## 📊 DVC (Data Version Control)

### What is DVC?

DVC is Git for data and models. It versions large files and ML pipelines while keeping them out of Git.

### Installation and Setup

```bash
# Install DVC
pip install dvc

# Initialize in git repository
git init
dvc init

# This creates .dvc/ directory
git add .dvc .dvcignore
git commit -m "Initialize DVC"
```

### Track Data

```bash
# Track dataset
dvc add data/train.csv

# This creates data/train.csv.dvc
# data/train.csv is added to .gitignore

# Commit .dvc file
git add data/train.csv.dvc data/.gitignore
git commit -m "Add training data"

# Add remote storage (S3, Google Drive, etc.)
dvc remote add -d myremote s3://mybucket/dvcstore

# Push data to remote
dvc push

# Pull data from remote
dvc pull
```

### DVC Pipeline

```bash
# Define pipeline stage
dvc run -n preprocess \
  -d data/raw.csv \
  -o data/processed.csv \
  python preprocess.py

dvc run -n train \
  -d data/processed.csv \
  -d src/train.py \
  -o models/model.pkl \
  python src/train.py

# This creates dvc.yaml
# Run pipeline
dvc repro

# Visualize pipeline
dvc dag
```

### DVC Workflow

```bash
# 1. Track data
dvc add data/train.csv
git add data/train.csv.dvc
git commit -m "Add data"

# 2. Create pipeline
dvc run -n train -d data/train.csv -o model.pkl python train.py
git add dvc.yaml dvc.lock
git commit -m "Add training pipeline"

# 3. Modify and re-run
# Edit train.py
dvc repro
git add dvc.lock model.pkl.dvc
git commit -m "Update model"

# 4. Share with team
dvc push
git push
```

---

## 🔧 Common Git Operations

### Undo Changes

```bash
# Discard changes in working directory
git restore file.py
git checkout -- file.py  # Old way

# Unstage file
git restore --staged file.py
git reset HEAD file.py  # Old way

# Amend last commit
git commit --amend -m "New message"

# Reset to previous commit (DANGEROUS!)
git reset --hard HEAD~1  # Lose all changes
git reset --soft HEAD~1  # Keep changes staged
git reset HEAD~1         # Keep changes unstaged
```

### View History

```bash
# View commits
git log
git log --oneline
git log --graph --all --decorate

# View changes in commit
git show commit-hash

# Search commits
git log --grep="bug fix"
git log --author="John"

# View file history
git log --follow file.py

# Who changed what
git blame file.py
```

### Stashing

```bash
# Save work temporarily
git stash

# List stashes
git stash list

# Apply stash
git stash apply
git stash pop  # Apply and remove

# Stash with message
git stash save "WIP: feature X"

# Drop stash
git stash drop stash@{0}

# Clear all stashes
git stash clear
```

---

## 🎯 Best Practices

### 1. Commit Messages

```bash
# ❌ Bad
git commit -m "fix"
git commit -m "update"

# ✅ Good
git commit -m "Fix memory leak in data loader"
git commit -m "Add LSTM model implementation"

# ✅ Better (with body)
git commit -m "Add dropout to prevent overfitting

- Add dropout layer after each dense layer
- Set dropout rate to 0.5
- Improves validation accuracy by 2%"
```

### 2. Branch Naming

```bash
# Feature branches
feature/add-lstm-model
feature/improve-accuracy

# Bug fixes
fix/memory-leak
bugfix/data-loading-error

# Experiments
exp/try-transformer
experiment/different-optimizer
```

### 3. Commit Frequency

```bash
# Commit logical units
git add model.py
git commit -m "Implement LSTM model"

git add train.py
git commit -m "Add training script"

# Don't commit work-in-progress to main
# Use feature branches
```

### 4. What to Version Control

**✅ Version control these:**
- Source code (.py, .ipynb)
- Configuration files
- Requirements files
- Documentation
- Small reference datasets (<10MB)
- Model architectures (code)
- .gitignore, .gitattributes
- README files

**❌ Don't version control these:**
- Large datasets (use DVC or Git LFS)
- Trained model weights (use DVC)
- Virtual environments (venv/, env/)
- Compiled files (\_\_pycache\_\_/)
- Logs and temporary files
- API keys and secrets
- IDE-specific files

---

## 🔗 Navigation

- **Up**: [Chapter 3 Overview](../README.md)
- **Previous**: [3.5 Package Management](../3.5-Package-Management/README.md)
- **Next**: [3.7 Hardware & Cloud Setup](../3.7-Hardware-Cloud-Setup/README.md)

---

## 📚 Additional Resources

### Documentation
- [Git Official Documentation](https://git-scm.com/doc)
- [Pro Git Book](https://git-scm.com/book/en/v2) (Free online)
- [GitHub Docs](https://docs.github.com/)
- [GitLab Docs](https://docs.gitlab.com/)
- [Git LFS](https://git-lfs.github.com/)
- [DVC Documentation](https://dvc.org/doc)

### Interactive Learning
- [Learn Git Branching](https://learngitbranching.js.org/)
- [Git Immersion](https://gitimmersion.com/)
- [Oh My Git!](https://ohmygit.org/) (Game)

### Cheat Sheets
- [GitHub Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Atlassian Git Cheat Sheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)

### Videos
- [Git and GitHub for Beginners - Crash Course](https://www.youtube.com/watch?v=RGOj5yH7evk)
- [Git Tutorial for Beginners: Learn Git in 1 Hour](https://www.youtube.com/watch?v=8JJ101D3knE)
