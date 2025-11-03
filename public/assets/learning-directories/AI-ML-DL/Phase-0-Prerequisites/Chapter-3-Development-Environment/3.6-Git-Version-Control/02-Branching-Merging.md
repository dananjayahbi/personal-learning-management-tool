# 🌿 Branching and Merging

## Overview

Master Git branching and merging for parallel development. Learn branching strategies, merge techniques, conflict resolution, and collaborative workflows for machine learning projects.

---

## 📚 Table of Contents

1. [Understanding Branches](#understanding-branches)
2. [Creating and Switching Branches](#creating-and-switching-branches)
3. [Merging Strategies](#merging-strategies)
4. [Resolving Conflicts](#resolving-conflicts)
5. [Branch Management](#branch-management)
6. [Gitflow Workflow](#gitflow-workflow)
7. [GitHub Flow](#github-flow)
8. [Rebasing](#rebasing)
9. [Cherry-Picking](#cherry-picking)
10. [Exercises](#exercises)

---

## 🌳 Understanding Branches

### What are Branches?

Branches allow you to diverge from the main line of development and continue to work without affecting that main line.

```
main      A---B---C---D---E---F
               \       /
feature         G---H-I
```

**Use Cases**:
- Develop new features
- Fix bugs
- Experiment safely
- Isolate work
- Collaborate effectively

### Viewing Branches

```bash
# List local branches
git branch
# * main
#   feature-A
#   bugfix-B

# List all branches (including remote)
git branch -a
# * main
#   feature-A
#   remotes/origin/main
#   remotes/origin/develop

# List remote branches only
git branch -r

# Show last commit on each branch
git branch -v
# * main     abc123d Last commit message
#   feature  def456e Feature commit

# Show merged branches
git branch --merged

# Show unmerged branches
git branch --no-merged
```

---

## 🔀 Creating and Switching Branches

### Create Branch

```bash
# Create new branch
git branch feature-new-model

# Create branch from specific commit
git branch feature-fix abc123d

# Create branch from tag
git branch hotfix-1.0 v1.0.0
```

### Switch Branch

```bash
# Switch to branch (old way)
git checkout feature-new-model

# Switch to branch (modern way, Git 2.23+)
git switch feature-new-model

# Create and switch in one command
git checkout -b feature-new-model
# or
git switch -c feature-new-model

# Switch to previous branch
git switch -

# Switch and track remote branch
git switch -c local-feature origin/remote-feature
```

### Branch Naming Conventions

```bash
# Feature branches
feature/add-lstm-model
feature/improve-data-preprocessing
feat/user-authentication

# Bug fixes
fix/memory-leak
bugfix/data-loading-error
hotfix/critical-security-issue

# Experiments
exp/try-transformer
experiment/different-optimizer
experiment/ablation-study

# Release branches
release/v1.0.0
release/2024-01-sprint

# Documentation
docs/api-reference
docs/update-readme
```

---

## 🔄 Merging Strategies

### Fast-Forward Merge

```bash
# Situation: feature branch ahead of main, no new commits on main
main      A---B
               \
feature         C---D

# Merge
git checkout main
git merge feature

# Result: main pointer moves forward
main      A---B---C---D
               \
feature         C---D
```

```bash
# Perform fast-forward merge
git checkout main
git merge feature-branch
# Updating abc123d..def456e
# Fast-forward
#  file1.py | 10 ++++++++
#  1 file changed, 10 insertions(+)
```

### No-Fast-Forward Merge

```bash
# Preserve branch history
main      A---B-------E
               \     /
feature         C---D

# Command
git checkout main
git merge --no-ff feature-branch -m "Merge feature X"

# Creates merge commit E even if fast-forward is possible
```

### Three-Way Merge

```bash
# Situation: both branches have new commits
main      A---B---C
               \
feature         D---E

# Merge
git checkout main
git merge feature

# Result: creates merge commit
main      A---B---C---F
               \     /
feature         D---E
```

### Merge Options

```bash
# Default merge (fast-forward if possible)
git merge feature-branch

# Always create merge commit
git merge --no-ff feature-branch

# Abort merge
git merge --abort

# Continue after resolving conflicts
git merge --continue

# Merge without commit (review first)
git merge --no-commit feature-branch

# Squash all commits into one
git merge --squash feature-branch
git commit -m "Merge feature: all changes in one commit"
```

---

## ⚔️ Resolving Conflicts

### When Conflicts Occur

Conflicts happen when the same lines are changed in both branches.

```bash
# Attempt merge
git merge feature-branch
# Auto-merging model.py
# CONFLICT (content): Merge conflict in model.py
# Automatic merge failed; fix conflicts and then commit the result.
```

### Conflict Markers

```python
# model.py with conflicts
def train_model(data):
<<<<<<< HEAD
    # Current branch (main)
    model = LinearModel()
    epochs = 100
=======
    # Incoming branch (feature)
    model = NeuralNetwork()
    epochs = 50
>>>>>>> feature-branch
    model.fit(data, epochs=epochs)
    return model
```

### Resolving Conflicts Manually

```bash
# 1. Check which files have conflicts
git status
# Unmerged paths:
#   both modified:   model.py

# 2. Open file and resolve conflicts
code model.py

# 3. Choose resolution:
# Option A: Keep current (HEAD)
def train_model(data):
    model = LinearModel()
    epochs = 100
    model.fit(data, epochs=epochs)
    return model

# Option B: Keep incoming (feature-branch)
def train_model(data):
    model = NeuralNetwork()
    epochs = 50
    model.fit(data, epochs=epochs)
    return model

# Option C: Combine both
def train_model(data):
    model = NeuralNetwork()  # From feature
    epochs = 100             # From main
    model.fit(data, epochs=epochs)
    return model

# 4. Stage resolved file
git add model.py

# 5. Complete merge
git commit -m "Merge feature-branch: resolve model conflicts"
```

### Using Merge Tools

```bash
# Configure merge tool
git config --global merge.tool vimdiff
# Or: meld, kdiff3, p4merge, beyond compare

# Launch merge tool
git mergetool

# Available tools:
# - vimdiff (terminal)
# - meld (GUI)
# - kdiff3 (GUI)
# - VS Code (GUI)
#   git config --global merge.tool vscode
#   git config --global mergetool.vscode.cmd 'code --wait $MERGED'
```

### Viewing Conflicts

```bash
# Show conflicts
git diff

# Show conflicts from both sides
git diff --ours      # Current branch
git diff --theirs    # Incoming branch

# Show base version
git show :1:file.py  # Common ancestor
git show :2:file.py  # Current branch (ours)
git show :3:file.py  # Incoming branch (theirs)

# Accept one version entirely
git checkout --ours file.py    # Keep current
git checkout --theirs file.py  # Accept incoming
git add file.py
```

### Aborting Merge

```bash
# Abort merge and return to pre-merge state
git merge --abort

# Or if you started but want to go back
git reset --hard HEAD
```

---

## 🗂️ Branch Management

### Deleting Branches

```bash
# Delete local branch (safe - won't delete if unmerged)
git branch -d feature-branch

# Force delete (even if unmerged)
git branch -D feature-branch

# Delete remote branch
git push origin --delete feature-branch
# or
git push origin :feature-branch
```

### Renaming Branches

```bash
# Rename current branch
git branch -m new-branch-name

# Rename any branch
git branch -m old-name new-name

# Rename and push to remote
git branch -m old-name new-name
git push origin :old-name           # Delete old remote
git push -u origin new-name         # Push new name
```

### Tracking Branches

```bash
# Create branch tracking remote
git checkout -b local-branch origin/remote-branch

# Set upstream for existing branch
git branch --set-upstream-to=origin/main main

# or shorter:
git branch -u origin/main main

# Show tracking information
git branch -vv
# * main   abc123d [origin/main] Latest commit
#   feature def456e [origin/feature: ahead 2] Feature work
```

---

## 🌊 Gitflow Workflow

### Gitflow Branch Structure

```
main          ─────●─────●─────●─────────●─────
                    |     ↗           ↗
develop      ──●────●─────●──────●────●──────●───
                 ↘    ↗     ↘  ↗    ↗
feature/A        ●──●         /    /
feature/B                  ●──●   /
hotfix/1.0                      ●
```

**Branch Types**:
- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/***: New features
- **release/***: Release preparation
- **hotfix/***: Emergency production fixes

### Gitflow Commands

```bash
# Install git-flow extension (optional)
# macOS: brew install git-flow
# Windows: Included in Git for Windows
# Linux: apt-get install git-flow

# Initialize gitflow
git flow init
# Uses default branch names:
# - main (production)
# - develop (development)

# Start feature
git flow feature start new-model
# Creates feature/new-model from develop

# Finish feature
git flow feature finish new-model
# Merges into develop, deletes feature branch

# Start release
git flow release start 1.0.0
# Creates release/1.0.0 from develop

# Finish release
git flow release finish 1.0.0
# Merges into main and develop, creates tag

# Start hotfix
git flow hotfix start critical-fix
# Creates hotfix/critical-fix from main

# Finish hotfix
git flow hotfix finish critical-fix
# Merges into main and develop
```

### Manual Gitflow

```bash
# Feature development
git checkout develop
git checkout -b feature/new-model
# ... work on feature ...
git checkout develop
git merge --no-ff feature/new-model
git branch -d feature/new-model

# Release preparation
git checkout develop
git checkout -b release/1.0.0
# ... prepare release (version bumps, docs) ...
git checkout main
git merge --no-ff release/1.0.0
git tag -a v1.0.0 -m "Release 1.0.0"
git checkout develop
git merge --no-ff release/1.0.0
git branch -d release/1.0.0

# Hotfix
git checkout main
git checkout -b hotfix/security-fix
# ... fix the issue ...
git checkout main
git merge --no-ff hotfix/security-fix
git tag -a v1.0.1 -m "Hotfix 1.0.1"
git checkout develop
git merge --no-ff hotfix/security-fix
git branch -d hotfix/security-fix
```

---

## 🚀 GitHub Flow

### Simpler Alternative to Gitflow

```
main     ─────●─────────●──────────●─────
              |        ↗          ↗
feature/A     ●───●───●
feature/B              ●──────●──●
```

**Rules**:
1. `main` branch is always deployable
2. Create descriptive branches for features/fixes
3. Open pull request early
4. Merge after review and CI pass
5. Deploy immediately after merge

### GitHub Flow Workflow

```bash
# 1. Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/add-api

# 2. Work on feature (commit often)
git add .
git commit -m "Add API endpoint"
git push -u origin feature/add-api

# 3. Open pull request on GitHub
# (Done via GitHub web interface)

# 4. Review, discuss, add more commits
git add .
git commit -m "Address review comments"
git push origin feature/add-api

# 5. Merge to main (via GitHub)
# - Squash and merge (cleaner history)
# - Merge commit (preserves history)
# - Rebase and merge (linear history)

# 6. Delete branch
git checkout main
git pull origin main
git branch -d feature/add-api
git push origin --delete feature/add-api

# 7. Deploy from main
# (Automated via CI/CD)
```

---

## 🔨 Rebasing

### What is Rebase?

Rebase re-applies commits on top of another branch, creating a linear history.

```bash
# Before rebase
main      A---B---C
               \
feature         D---E

# After rebase
main      A---B---C
                   \
feature             D'---E'
```

### Basic Rebase

```bash
# Rebase feature onto main
git checkout feature-branch
git rebase main

# Result: feature commits replayed on top of main

# Or in one command
git rebase main feature-branch
```

### Interactive Rebase

```bash
# Rebase last 3 commits
git rebase -i HEAD~3

# Opens editor:
# pick abc123d Commit 1
# pick def456e Commit 2
# pick ghi789f Commit 3

# Commands:
# pick (p) = keep commit
# reword (r) = keep commit, edit message
# edit (e) = keep commit, stop to amend
# squash (s) = merge into previous commit
# fixup (f) = like squash, discard message
# drop (d) = remove commit

# Example: squash last 2 commits
pick abc123d Commit 1
squash def456e Commit 2
squash ghi789f Commit 3
```

### Rebase vs Merge

```bash
# Merge (preserves history, creates merge commits)
main      A---B---C-------F
               \         /
feature         D---E---

# Rebase (linear history, no merge commits)
main      A---B---C
                   \
feature             D---E
```

**When to Use Each**:

| Use Merge | Use Rebase |
|-----------|------------|
| Public branches | Local branches |
| Preserve history | Clean history |
| Feature integration | Update feature branch |
| Multiple collaborators | Solo development |

### Handling Rebase Conflicts

```bash
# Start rebase
git rebase main

# Conflict occurs
# CONFLICT (content): Merge conflict in file.py
# Resolve conflict

# 1. Edit file to resolve
code file.py

# 2. Stage resolved file
git add file.py

# 3. Continue rebase
git rebase --continue

# Or skip commit
git rebase --skip

# Or abort rebase
git rebase --abort
```

---

## 🍒 Cherry-Picking

### What is Cherry-Pick?

Apply specific commits from one branch to another.

```bash
# Pick commit from feature to main
main      A---B---C---D'
               \
feature         D---E---F

# Command
git checkout main
git cherry-pick def456e  # Pick commit E

# Result
main      A---B---C---E'
```

### Cherry-Pick Commands

```bash
# Pick single commit
git cherry-pick abc123d

# Pick multiple commits
git cherry-pick abc123d def456e ghi789f

# Pick range of commits
git cherry-pick abc123d..ghi789f

# Cherry-pick without committing (review first)
git cherry-pick --no-commit abc123d

# Continue after conflict
git cherry-pick --continue

# Abort cherry-pick
git cherry-pick --abort
```

---

## 💪 Exercises

### Exercise 1: Feature Branch Workflow

Create a feature branch, make changes, and merge.

**Solution:**

```bash
# Create repository
mkdir branch-practice && cd branch-practice
git init

# Create initial commit on main
echo "# ML Project" > README.md
git add README.md
git commit -m "Initial commit"

# Create feature branch
git checkout -b feature/add-model

# Work on feature
echo "class MLModel:" > model.py
git add model.py
git commit -m "Add model class"

echo "    def train(self):" >> model.py
git add model.py
git commit -m "Add train method"

# Switch to main
git checkout main

# Merge feature
git merge --no-ff feature/add-model -m "Merge: Add ML model"

# Clean up
git branch -d feature/add-model

# View history
git log --graph --oneline --all
```

### Exercise 2: Conflict Resolution

Practice resolving merge conflicts.

**Solution:**

```bash
# Setup
git init conflict-practice
cd conflict-practice

# Create initial file
echo "Line 1" > file.txt
git add file.txt
git commit -m "Initial commit"

# Create feature branch and modify
git checkout -b feature
echo "Line 2 from feature" >> file.txt
git add file.txt
git commit -m "Add line 2 in feature"

# Switch to main and modify same file
git checkout main
echo "Line 2 from main" >> file.txt
git add file.txt
git commit -m "Add line 2 in main"

# Attempt merge (will conflict)
git merge feature
# CONFLICT!

# Resolve conflict
cat file.txt
# <<<<<<< HEAD
# Line 2 from main
# =======
# Line 2 from feature
# >>>>>>> feature

# Edit file to resolve
echo "Line 1" > file.txt
echo "Line 2 (combined)" >> file.txt

# Complete merge
git add file.txt
git commit -m "Resolve conflict: combine changes"

# View history
git log --graph --oneline --all
```

### Exercise 3: Interactive Rebase

Practice cleaning up commit history.

**Solution:**

```bash
# Setup
mkdir rebase-practice && cd rebase-practice
git init

# Create initial commit
echo "# Project" > README.md
git add README.md
git commit -m "Initial commit"

# Make several commits
echo "Feature 1" >> file.txt
git add file.txt
git commit -m "Add feature 1"

echo "Feature 2" >> file.txt
git add file.txt
git commit -m "Add feature 2"

echo "Fix typo" >> file.txt
git add file.txt
git commit -m "Fix typo in feature 2"

echo "More feature 2" >> file.txt
git add file.txt
git commit -m "Continue feature 2"

# Interactive rebase to clean up
git rebase -i HEAD~4

# In editor, squash related commits:
# pick abc123d Add feature 1
# pick def456e Add feature 2
# squash ghi789f Fix typo in feature 2
# squash jkl012m Continue feature 2

# View clean history
git log --oneline
```

---

## 🎯 Key Takeaways

✅ **Branches**: Parallel development without affecting main code  
✅ **Merge**: Combine branches (fast-forward, no-ff, three-way)  
✅ **Conflicts**: Resolve when same lines modified in both branches  
✅ **Gitflow**: Structured workflow with main, develop, feature, release, hotfix  
✅ **GitHub Flow**: Simpler workflow with main and feature branches  
✅ **Rebase**: Create linear history, clean up commits  
✅ **Cherry-pick**: Apply specific commits from one branch to another  
✅ **Best Practices**: Descriptive names, commit often, merge carefully

---

## 🔗 Navigation

- **Previous**: [01-Git-Basics.md](./01-Git-Basics.md)
- **Next**: [03-Remote-Repositories.md](./03-Remote-Repositories.md)
- **Up**: [README.md](./README.md)
- **Chapter Home**: [Chapter 3 - Development Environment](../README.md)

---

**Happy Branching! 🌿🚀**
