# 🌐 Remote Repositories & Collaboration

## Overview

Master working with remote repositories, collaborating via GitHub/GitLab, managing pull requests, and implementing effective code review processes for machine learning teams.

---

## 📚 Table of Contents

1. [Remote Repository Basics](#remote-repository-basics)
2. [GitHub and GitLab](#github-and-gitlab)
3. [Remote Operations](#remote-operations)
4. [Pull Requests](#pull-requests)
5. [Code Review Process](#code-review-process)
6. [Forking Workflow](#forking-workflow)
7. [Collaboration Best Practices](#collaboration-best-practices)
8. [GitHub Actions for ML](#github-actions-for-ml)
9. [Troubleshooting](#troubleshooting)
10. [Exercises](#exercises)

---

## 🔗 Remote Repository Basics

### What are Remotes?

Remotes are versions of your repository hosted on the internet or network.

```bash
# View configured remotes
git remote -v
# origin  https://github.com/user/repo.git (fetch)
# origin  https://github.com/user/repo.git (push)

# Add remote
git remote add origin https://github.com/user/repo.git

# Add additional remote
git remote add upstream https://github.com/original/repo.git

# Remove remote
git remote remove origin

# Rename remote
git remote rename origin github

# Change remote URL
git remote set-url origin https://github.com/user/new-repo.git

# Show remote details
git remote show origin
```

### HTTPS vs SSH

```bash
# HTTPS (username/password or token)
git clone https://github.com/user/repo.git

# SSH (requires SSH key setup)
git clone git@github.com:user/repo.git

# Advantages of SSH:
# - No password prompts
# - More secure
# - Faster for frequent operations
```

### Setting Up SSH Keys

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"
# Press Enter to accept default location (~/.ssh/id_ed25519)
# Enter passphrase (optional but recommended)

# Start SSH agent
eval "$(ssh-agent -s)"

# Add key to agent
ssh-add ~/.ssh/id_ed25519

# Copy public key to clipboard
# macOS:
pbcopy < ~/.ssh/id_ed25519.pub
# Linux:
xclip -selection clipboard < ~/.ssh/id_ed25519.pub
# Windows:
clip < ~/.ssh/id_ed25519.pub

# Add key to GitHub:
# 1. Go to GitHub Settings > SSH and GPG keys
# 2. Click "New SSH key"
# 3. Paste your public key
# 4. Test connection:
ssh -T git@github.com
# Hi username! You've successfully authenticated...
```

---

## 🐙 GitHub and GitLab

### Creating Remote Repository

**GitHub**:
1. Visit https://github.com/new
2. Enter repository name
3. Choose public or private
4. Don't initialize with README (if you have local repo)
5. Click "Create repository"

**GitLab**:
1. Visit https://gitlab.com/projects/new
2. Enter project name
3. Choose visibility level
4. Create project

### Connecting Local to Remote

```bash
# Create local repository
mkdir ml-project
cd ml-project
git init
echo "# ML Project" > README.md
git add README.md
git commit -m "Initial commit"

# Add remote
git remote add origin git@github.com:username/ml-project.git

# Push to remote
git push -u origin main
# -u sets upstream tracking
```

### Repository Settings

**Important Settings**:
- **Branch Protection**: Require reviews, status checks
- **Collaborators**: Add team members
- **Webhooks**: Integrate with CI/CD
- **Actions**: Enable GitHub Actions for automation
- **Security**: Enable vulnerability alerts

---

## 📡 Remote Operations

### Cloning

```bash
# Clone repository
git clone https://github.com/user/repo.git

# Clone into specific directory
git clone https://github.com/user/repo.git my-folder

# Clone specific branch
git clone -b develop https://github.com/user/repo.git

# Shallow clone (faster, less history)
git clone --depth 1 https://github.com/user/repo.git

# Clone with submodules
git clone --recursive https://github.com/user/repo.git
```

### Fetching

```bash
# Fetch all remotes
git fetch --all

# Fetch specific remote
git fetch origin

# Fetch specific branch
git fetch origin main

# Fetch and prune deleted branches
git fetch --prune

# View fetched changes
git log origin/main
git diff main origin/main
```

### Pulling

```bash
# Pull and merge
git pull origin main

# Pull and rebase
git pull --rebase origin main

# Pull all tracking branches
git pull --all

# Pull with automatic stash/unstash
git pull --autostash

# Set default pull behavior
git config pull.rebase false  # merge (default)
git config pull.rebase true   # rebase
git config pull.ff only       # fast-forward only
```

### Pushing

```bash
# Push to remote
git push origin main

# Push and set upstream
git push -u origin feature-branch

# Push all branches
git push --all origin

# Push tags
git push --tags

# Force push (DANGEROUS!)
git push --force origin main

# Safer force push
git push --force-with-lease origin main
# Fails if remote has changes you don't have

# Delete remote branch
git push origin --delete feature-branch
```

### Tracking Branches

```bash
# Create local branch tracking remote
git checkout -b local-branch origin/remote-branch

# Set upstream for existing branch
git branch --set-upstream-to=origin/main main
# or shorter:
git branch -u origin/main main

# View tracking branches
git branch -vv
# * main     abc123d [origin/main] Latest commit
#   feature  def456e [origin/feature: ahead 2] Work

# Push and set upstream automatically
git push -u origin feature-branch
```

---

## 🔃 Pull Requests

### Creating Pull Request (GitHub)

```bash
# 1. Create feature branch
git checkout -b feature/add-model

# 2. Make changes and commit
git add model.py
git commit -m "Add LSTM model"

# 3. Push to remote
git push -u origin feature/add-model

# 4. Create PR on GitHub
# Via web interface:
# - Click "Compare & pull request"
# - Fill in title and description
# - Assign reviewers
# - Add labels
# - Click "Create pull request"
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Implemented LSTM model
- Added unit tests
- Updated documentation

## Testing
- [ ] All tests pass
- [ ] Added new tests
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added to complex code
- [ ] Documentation updated
- [ ] No new warnings
```

### PR Best Practices

```bash
# Keep PRs small and focused
# ❌ Bad: 50 files changed, multiple features
# ✅ Good: 5-10 files, single feature

# Write descriptive title
# ❌ Bad: "Update model"
# ✅ Good: "Add LSTM model with attention mechanism"

# Provide context in description
# - What changed
# - Why it changed
# - How to test
# - Related issues

# Request specific reviewers
# Choose team members familiar with the code

# Respond to comments
# - Address all feedback
# - Mark resolved conversations
# - Explain decisions
```

### Reviewing Pull Requests

```bash
# 1. Checkout PR locally
git fetch origin pull/123/head:pr-123
git checkout pr-123

# 2. Test changes
python -m pytest
python train.py

# 3. Review code
# - Check logic
# - Verify tests
# - Ensure style compliance
# - Look for edge cases

# 4. Leave comments on GitHub
# - Approve, Request changes, or Comment
# - Be specific and constructive
# - Suggest improvements

# 5. Merge PR
# Options:
# - Merge commit (preserves history)
# - Squash and merge (clean history)
# - Rebase and merge (linear history)
```

---

## 🍴 Forking Workflow

### Fork-Based Contribution

```bash
# 1. Fork repository on GitHub
# Click "Fork" button on repository page

# 2. Clone your fork
git clone https://github.com/your-username/repo.git
cd repo

# 3. Add upstream remote
git remote add upstream https://github.com/original-owner/repo.git

# 4. Create feature branch
git checkout -b feature/improvement

# 5. Make changes and commit
git add .
git commit -m "Improve performance"

# 6. Push to your fork
git push origin feature/improvement

# 7. Create pull request
# On GitHub, create PR from your fork to original repo

# 8. Keep fork updated
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### Syncing Fork

```bash
# Method 1: Fetch and merge
git fetch upstream
git checkout main
git merge upstream/main
git push origin main

# Method 2: Pull with rebase
git checkout main
git pull --rebase upstream main
git push origin main

# Method 3: GitHub UI
# Click "Sync fork" button on GitHub

# Sync all branches
for branch in $(git branch -r | grep upstream | sed 's/upstream\///'); do
  git checkout $branch
  git merge upstream/$branch
  git push origin $branch
done
```

---

## 🤝 Code Review Process

### Reviewer Guidelines

```bash
# What to check:
# ✅ Correctness
# ✅ Test coverage
# ✅ Code quality
# ✅ Performance
# ✅ Security
# ✅ Documentation
# ✅ Style compliance

# Review checklist:
# - Does code solve the problem?
# - Are there edge cases?
# - Is code readable?
# - Are tests comprehensive?
# - Is documentation updated?
# - Any performance concerns?
# - Security vulnerabilities?
```

### Constructive Feedback

```bash
# ❌ Bad comments:
# "This is wrong"
# "Doesn't work"
# "Bad code"

# ✅ Good comments:
# "Consider using list comprehension here for better readability:
#  result = [x**2 for x in numbers]"
# 
# "This function might raise KeyError. Consider:
#  value = data.get('key', default_value)"
#
# "Great use of caching here! One suggestion:
#  Could we parametrize the cache size?"
```

### Responding to Reviews

```bash
# Acknowledge feedback
"Good catch! I'll fix that."
"Thanks for the suggestion. Updated in commit abc123d"

# Explain decisions
"I chose approach X because Y. Open to alternatives."

# Ask questions
"Could you clarify what you mean by Z?"

# Update code
git add updated_file.py
git commit -m "Address review feedback: improve error handling"
git push origin feature-branch
# PR automatically updates
```

---

## 👥 Collaboration Best Practices

### Branch Strategy for Teams

```bash
# Protected main branch
# - Require PR reviews
# - Require status checks
# - No direct pushes

# Feature branches
# - One feature per branch
# - Descriptive names
# - Delete after merge

# Example workflow:
git checkout main
git pull origin main
git checkout -b feature/user-auth
# ... work ...
git push -u origin feature/user-auth
# Create PR, get reviews, merge
git checkout main
git pull origin main
git branch -d feature/user-auth
```

### Commit Messages for Teams

```bash
# Format:
<type>(<scope>): <subject>

<body>

<footer>

# Types:
# feat: New feature
# fix: Bug fix
# docs: Documentation
# style: Formatting
# refactor: Code restructuring
# test: Adding tests
# chore: Maintenance

# Examples:
feat(model): add LSTM with attention

Implement bidirectional LSTM model with attention mechanism.
Performance improvement of 15% on validation set.

Closes #123

fix(data): handle missing values in preprocessing

Previously crashed on null values. Now fills with mean.

Fixes #456
```

### Managing Conflicts in Team

```bash
# Update frequently
git pull --rebase origin main

# Communicate
# "I'm working on auth module this week"

# Small, frequent PRs
# Easier to review and merge

# Resolve conflicts promptly
# Don't let branches diverge too much

# Use branch protection
# Prevent force push to main
# Require reviews
# Require CI passing
```

---

## 🔧 GitHub Actions for ML

### Basic CI Workflow

```yaml
# .github/workflows/test.yml
name: Test ML Pipeline

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'
    
    - name: Install dependencies
      run: |
        pip install -r requirements.txt
        pip install pytest pytest-cov
    
    - name: Run tests
      run: pytest --cov=src tests/
    
    - name: Lint code
      run: |
        pip install black flake8
        black --check .
        flake8 .
```

### Model Training Workflow

```yaml
# .github/workflows/train.yml
name: Train Model

on:
  workflow_dispatch:  # Manual trigger
  schedule:
    - cron: '0 0 * * 0'  # Weekly

jobs:
  train:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'
    
    - name: Install dependencies
      run: pip install -r requirements.txt
    
    - name: Download data
      run: python scripts/download_data.py
    
    - name: Train model
      run: python train.py
    
    - name: Upload model
      uses: actions/upload-artifact@v3
      with:
        name: trained-model
        path: models/model.pkl
```

---

## 🔧 Troubleshooting

### Common Issues

```bash
# Issue 1: Push rejected (non-fast-forward)
# ! [rejected]        main -> main (non-fast-forward)

# Solution: Pull and merge/rebase first
git pull --rebase origin main
git push origin main

# Issue 2: Authentication failed
# Solution 1: Use SSH instead of HTTPS
git remote set-url origin git@github.com:user/repo.git

# Solution 2: Use personal access token
# Generate token on GitHub Settings > Developer settings
# Use token as password

# Issue 3: Large file rejected
# Solution: Use Git LFS
git lfs install
git lfs track "*.h5"
git add .gitattributes
git add large_model.h5
git commit -m "Add model with LFS"
git push origin main

# Issue 4: Merge conflict in binary file
# Solution: Choose one version
git checkout --ours model.pkl   # Keep yours
git checkout --theirs model.pkl # Use theirs
git add model.pkl
git commit -m "Resolve conflict"
```

### Reset Remote Branch

```bash
# DANGER: Rewrite remote history
# Only if you're sure and communicate with team

# Reset local to specific commit
git reset --hard abc123d

# Force push
git push --force origin main

# Safer: force-with-lease
git push --force-with-lease origin main
```

---

## 💪 Exercises

### Exercise 1: Complete PR Workflow

Practice creating and merging a pull request.

**Solution:**

```bash
# 1. Create repository on GitHub
# Visit github.com/new, create "ml-collab-practice"

# 2. Clone locally
git clone https://github.com/your-username/ml-collab-practice.git
cd ml-collab-practice

# 3. Create feature branch
git checkout -b feature/add-preprocessing

# 4. Add code
cat > preprocess.py << 'EOF'
def clean_data(data):
    """Remove null values and outliers."""
    data = data.dropna()
    return data
EOF

# 5. Commit
git add preprocess.py
git commit -m "feat: add data preprocessing function"

# 6. Push
git push -u origin feature/add-preprocessing

# 7. Create PR on GitHub
# 8. Review and merge
# 9. Delete branch
git checkout main
git pull origin main
git branch -d feature/add-preprocessing
```

### Exercise 2: Fork Contribution

Practice contributing to an open source project.

**Solution:**

```bash
# 1. Fork a repository on GitHub (e.g., scikit-learn/scikit-learn)

# 2. Clone your fork
git clone https://github.com/your-username/scikit-learn.git
cd scikit-learn

# 3. Add upstream
git remote add upstream https://github.com/scikit-learn/scikit-learn.git

# 4. Create branch
git checkout -b fix/typo-in-docs

# 5. Make changes
# Fix typo in docs...

# 6. Commit
git add docs/tutorial.rst
git commit -m "docs: fix typo in linear regression tutorial"

# 7. Push to your fork
git push origin fix/typo-in-docs

# 8. Create PR from your fork to upstream

# 9. Keep fork updated
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### Exercise 3: Resolve PR Conflict

Practice resolving conflicts during PR review.

**Solution:**

```bash
# Setup: Create two conflicting branches

# Main branch
echo "version = 1.0.0" > config.py
git add config.py
git commit -m "Initial config"
git push origin main

# Feature A
git checkout -b feature/update-version-a
echo "version = 1.1.0" > config.py
git add config.py
git commit -m "Update to 1.1.0"
git push origin feature/update-version-a

# Feature B (conflict)
git checkout main
git checkout -b feature/update-version-b
echo "version = 1.2.0" > config.py
git add config.py
git commit -m "Update to 1.2.0"
git push origin feature/update-version-b

# Merge Feature A (succeeds)
git checkout main
git merge feature/update-version-a
git push origin main

# Try to merge Feature B (conflicts)
git checkout feature/update-version-b
git rebase main
# CONFLICT!

# Resolve
echo "version = 1.2.0" > config.py  # Keep Feature B version
git add config.py
git rebase --continue
git push --force-with-lease origin feature/update-version-b

# Now PR can be merged cleanly
```

---

## 🎯 Key Takeaways

✅ **Remotes**: Versions of repository on server (origin, upstream)  
✅ **Operations**: clone, fetch, pull, push for syncing  
✅ **Pull Requests**: Formal way to propose changes, get reviews  
✅ **Forking**: Contribution model for open source  
✅ **Code Review**: Essential for quality and knowledge sharing  
✅ **Collaboration**: Branch protection, clear workflow, communication  
✅ **CI/CD**: Automate testing and deployment with GitHub Actions  
✅ **Best Practices**: Small PRs, descriptive commits, frequent syncing

---

## 🔗 Navigation

- **Previous**: [02-Branching-Merging.md](./02-Branching-Merging.md)
- **Next**: [04-Git-for-ML.md](./04-Git-for-ML.md)
- **Up**: [README.md](./README.md)
- **Chapter Home**: [Chapter 3 - Development Environment](../README.md)

---

**Happy Collaborating! 🌐🤝**
