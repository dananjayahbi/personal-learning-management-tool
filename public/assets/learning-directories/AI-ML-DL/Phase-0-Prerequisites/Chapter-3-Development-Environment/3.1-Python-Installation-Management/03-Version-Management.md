# Version Management

## 📋 Table of Contents
- [Introduction](#introduction)
- [Why Multiple Python Versions?](#why-multiple-python-versions)
- [pyenv (Unix Systems)](#pyenv-unix-systems)
- [Python Launcher (Windows)](#python-launcher-windows)
- [conda Version Management](#conda-version-management)
- [Best Practices](#best-practices)
- [Practice Exercises](#practice-exercises)

---

## Introduction

Managing multiple Python versions is essential for modern development. Different projects may require different Python versions, and you need a reliable way to switch between them.

---

## Why Multiple Python Versions?

### Common Scenarios

1. **Legacy Projects**: Some projects require older Python versions
2. **Testing Compatibility**: Test code across multiple Python versions
3. **Latest Features**: Experiment with newest Python while maintaining stable version
4. **Framework Requirements**: Some ML frameworks require specific Python versions
5. **Security Updates**: Keep older versions for legacy while using secure newer versions

### Example Scenarios

```bash
# Project A: Legacy Django app
Python 3.8 required

# Project B: New FastAPI service  
Python 3.11 required

# Project C: TensorFlow development
Python 3.10 (best compatibility)

# Personal Learning
Python 3.12 (latest features)
```

---

## pyenv (Unix Systems)

### What is pyenv?

pyenv is a simple, powerful, and popular Python version management tool for macOS and Linux.

### Installation

#### macOS (via Homebrew)

```bash
# Install pyenv
brew install pyenv

# Add to shell configuration
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc

# Restart shell
exec "$SHELL"

# Verify
pyenv --version
```

#### Linux (via pyenv-installer)

```bash
# Install dependencies (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install make build-essential libssl-dev zlib1g-dev \
libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm \
libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev \
libffi-dev liblzma-dev

# Install pyenv
curl https://pyenv.run | bash

# Add to ~/.bashrc or ~/.zshrc
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bashrc

# Restart shell
exec "$SHELL"
```

### Basic pyenv Commands

```bash
# List available Python versions
pyenv install --list

# Install specific version
pyenv install 3.11.2
pyenv install 3.10.9
pyenv install 3.9.16

# List installed versions
pyenv versions
# Output:
#   system
# * 3.11.2 (set by /Users/username/.pyenv/version)
#   3.10.9
#   3.9.16

# Set global Python version
pyenv global 3.11.2

# Set local version (for current directory)
pyenv local 3.10.9

# Set shell version (for current session)
pyenv shell 3.9.16

# Unset shell version
pyenv shell --unset

# Uninstall a version
pyenv uninstall 3.9.16
```

### Understanding pyenv Version Priority

```bash
# pyenv chooses Python version in this order:

# 1. PYENV_VERSION environment variable
export PYENV_VERSION=3.10.9
python --version  # Uses 3.10.9

# 2. .python-version file (local)
echo "3.11.2" > .python-version
python --version  # Uses 3.11.2

# 3. pyenv global version
pyenv global 3.11.2
python --version  # Uses 3.11.2

# 4. System Python
# If none of the above, falls back to system Python
```

### Project-Specific Versions

```bash
# Navigate to project directory
cd ~/projects/my-project

# Set Python version for this project
pyenv local 3.11.2

# This creates .python-version file
cat .python-version
# Output: 3.11.2

# Now Python will always use 3.11.2 in this directory
python --version
# Output: Python 3.11.2

# Commit .python-version to git for team consistency
git add .python-version
git commit -m "Set Python version to 3.11.2"
```

### Advanced pyenv Usage

```bash
# Install multiple versions at once
pyenv install 3.11.2 3.10.9 3.9.16

# Rehash (refresh shims after installing packages with binaries)
pyenv rehash

# Show which executable is being used
pyenv which python
# Output: /Users/username/.pyenv/versions/3.11.2/bin/python

# Show current Python version and why
pyenv version
# Output: 3.11.2 (set by /Users/username/projects/my-project/.python-version)

# Update pyenv itself
brew upgrade pyenv  # macOS
# or
cd ~/.pyenv && git pull  # Linux
```

---

## Python Launcher (Windows)

### What is the Python Launcher?

The **Python Launcher for Windows** (`py.exe`) is automatically installed with Python 3.3+ on Windows. It allows easy switching between Python versions.

### Basic Usage

```cmd
# List installed Python versions
py --list
# Output:
#  -V:3.11 *        Python 3.11 (64-bit)
#  -V:3.10          Python 3.10 (64-bit)
#  -V:3.9           Python 3.9 (64-bit)

# Run default Python
py
# Enters Python 3.11 (marked with *)

# Run specific version
py -3.11
py -3.10
py -3.9

# Run latest Python 3.x
py -3

# Run specific version for a script
py -3.11 my_script.py
py -3.10 my_script.py
```

### Shebang Support

```python
#!/usr/bin/env python3.11
# This script requires Python 3.11

print("Running with Python 3.11")

# Run on Windows
py my_script.py  # Automatically uses 3.11
```

### Per-Project Python Version

Create `py.ini` in project directory:

```ini
# py.ini
[defaults]
python=3.11
```

Then:
```cmd
py my_script.py  # Uses Python 3.11
```

### Environment Variable

```cmd
# Set preferred Python version
set PY_PYTHON=3.11

# Now 'py' defaults to Python 3.11
py --version
# Output: Python 3.11.2
```

### Advanced Launcher Usage

```cmd
# Run with pip
py -3.11 -m pip install numpy

# Create virtual environment with specific version
py -3.11 -m venv myenv

# Check launcher version
py --list-paths
# Shows paths to all Python installations
```

---

## conda Version Management

### Managing Python Versions with conda

```bash
# List available Python versions
conda search python

# Create environment with specific Python version
conda create -n py311 python=3.11
conda create -n py310 python=3.10
conda create -n py39 python=3.9

# Activate environment (and its Python version)
conda activate py311
python --version  # Python 3.11.x

# Switch to different Python version
conda activate py310
python --version  # Python 3.10.x

# Deactivate
conda deactivate

# List all environments
conda env list
# Output:
#   base                  *  /Users/username/anaconda3
#   py311                    /Users/username/anaconda3/envs/py311
#   py310                    /Users/username/anaconda3/envs/py310

# Remove environment
conda env remove -n py39
```

### Upgrade Python in Existing Environment

```bash
# Activate environment
conda activate myenv

# Update to latest patch version (3.11.x -> 3.11.y)
conda update python

# Upgrade to new minor version (3.11 -> 3.12) - NOT recommended
# Better to create new environment
conda create -n myenv-py312 python=3.12
```

---

## Best Practices

### 1. Never Modify System Python

```bash
# ❌ DON'T DO THIS (macOS/Linux)
sudo pip install package  # Modifies system Python!

# ✅ DO THIS INSTEAD
# Use pyenv, virtual environments, or user installs
pip install --user package
```

### 2. Use .python-version Files

```bash
# In each project
echo "3.11.2" > .python-version

# Commit to version control
git add .python-version
```

### 3. Document Python Requirements

```markdown
# README.md
## Requirements

- Python 3.11.2 or higher
- See `.python-version` for exact version

## Setup

```bash
pyenv install  # Installs version from .python-version
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
```

### 4. Test Across Multiple Versions

```bash
# Use tox for automated testing across versions
# tox.ini
[tox]
envlist = py39,py310,py311

[testenv]
deps = pytest
commands = pytest
```

### 5. Keep Track of Installed Versions

```python
# version_check.py
import sys

print(f"Python Version: {sys.version}")
print(f"Executable: {sys.executable}")

# Run with different versions
# py -3.11 version_check.py
# py -3.10 version_check.py
```

---

## Practice Exercises

### Exercise 1: Install Multiple Versions

**Using pyenv (macOS/Linux):**
```bash
# Install three different Python versions
pyenv install 3.11.2
pyenv install 3.10.9
pyenv install 3.9.16

# Verify installations
pyenv versions
```

**Using Python Launcher (Windows):**
```cmd
# Download and install:
# - Python 3.11.2
# - Python 3.10.9
# - Python 3.9.16

# Verify
py --list
```

### Exercise 2: Switch Between Versions

```bash
# pyenv (macOS/Linux)
pyenv global 3.11.2
python --version

pyenv shell 3.10.9  
python --version

pyenv shell --unset
```

```cmd
# Python Launcher (Windows)
py -3.11 --version
py -3.10 --version
py -3.9 --version
```

### Exercise 3: Project-Specific Version

```bash
# Create two projects with different Python versions

# Project A
mkdir project-a
cd project-a
pyenv local 3.11.2
python --version  # Should show 3.11.2

# Project B
cd ..
mkdir project-b
cd project-b
pyenv local 3.10.9
python --version  # Should show 3.10.9

# Test switching
cd ../project-a
python --version  # Automatically switches to 3.11.2

cd ../project-b
python --version  # Automatically switches to 3.10.9
```

### Exercise 4: Version Detection Script

```python
#!/usr/bin/env python3
# save as: detect_version.py

import sys
import platform

def detect_python_version():
    """Detect and display Python version information"""
    
    print("=" * 60)
    print("PYTHON VERSION DETECTION")
    print("=" * 60)
    
    print(f"\n1. Python Version: {sys.version}")
    print(f"2. Version Info: {sys.version_info}")
    print(f"3. Executable: {sys.executable}")
    print(f"4. Platform: {platform.platform()}")
    print(f"5. Implementation: {platform.python_implementation()}")
    
    # Check if in virtual environment
    in_venv = hasattr(sys, 'real_prefix') or \
              (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix)
    print(f"6. In Virtual Environment: {in_venv}")
    
    if in_venv:
        print(f"7. Virtual Env Path: {sys.prefix}")

if __name__ == "__main__":
    detect_python_version()

# Test with different versions:
# pyenv shell 3.11.2 && python detect_version.py
# pyenv shell 3.10.9 && python detect_version.py
```

### Exercise 5: Automation Script

```bash
#!/bin/bash
# save as: test_all_versions.sh

# Test script across all installed Python versions

echo "Testing across all Python versions..."

for version in 3.9.16 3.10.9 3.11.2; do
    echo ""
    echo "Testing with Python $version"
    echo "----------------------------"
    
    pyenv shell $version
    python --version
    python my_script.py
done

pyenv shell --unset
echo "Testing complete!"
```

---

## Summary

### Quick Reference

**pyenv (macOS/Linux):**
```bash
pyenv install 3.11.2          # Install version
pyenv versions                # List installed
pyenv global 3.11.2           # Set global
pyenv local 3.11.2            # Set for directory
pyenv shell 3.11.2            # Set for session
```

**Python Launcher (Windows):**
```cmd
py --list                     # List versions
py -3.11                      # Use Python 3.11
py -3.11 script.py            # Run script with 3.11
py -3.11 -m pip install pkg   # Install package
```

**conda:**
```bash
conda create -n env python=3.11  # Create with version
conda activate env                # Activate
conda list                        # List packages
```

### Comparison

| Feature | pyenv | Python Launcher | conda |
|---------|-------|-----------------|-------|
| OS | macOS, Linux | Windows | All |
| Ease of Use | Medium | Easy | Easy |
| Version Switching | Excellent | Good | Via environments |
| Global Default | Yes | Yes | Via environments |
| Per-Directory | Yes | Via py.ini | No |
| Integration | Seamless | Good | Separate |

---

**Next:** [04-Python-Paths.md](./04-Python-Paths.md) - Understanding how Python finds modules!
