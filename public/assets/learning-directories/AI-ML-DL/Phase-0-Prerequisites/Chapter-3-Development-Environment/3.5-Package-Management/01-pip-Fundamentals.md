# 01 - pip Fundamentals

## 📋 Introduction

pip (Pip Installs Packages) is the standard package manager for Python. It downloads packages from the Python Package Index (PyPI) and manages their installation, upgrade, and removal.

**Why pip?**
- ✅ **Standard tool** - Included with Python 3.4+
- ✅ **Huge ecosystem** - 400,000+ packages on PyPI
- ✅ **Simple syntax** - Easy to learn
- ✅ **Dependency management** - Handles requirements automatically
- ✅ **Version control** - Install specific versions

---

## 📦 Installing pip

### Check if pip is Installed

```bash
# Check pip version
pip --version
# or
pip3 --version

# Output: pip 23.2.1 from /path/to/pip (python 3.11)
```

### Install pip (if missing)

**Python 3.4+ already includes pip**, but if it's missing:

```bash
# Download get-pip.py
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py

# Install
python get-pip.py

# Or on Linux/macOS
python3 get-pip.py
```

### Upgrade pip

```bash
# Upgrade to latest version
pip install --upgrade pip

# Windows may require:
python -m pip install --upgrade pip
```

---

## 🔧 Basic pip Commands

### Installing Packages

```bash
# Install latest version
pip install numpy

# Install specific version
pip install numpy==1.24.3

# Install minimum version
pip install "numpy>=1.24"

# Install version range
pip install "numpy>=1.24,<2.0"

# Install multiple packages
pip install numpy pandas matplotlib

# Install from requirements file
pip install -r requirements.txt
```

**Example output:**
```
Collecting numpy
  Downloading numpy-1.24.3-cp311-cp311-win_amd64.whl (14.8 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 14.8/14.8 MB 5.2 MB/s eta 0:00:00
Installing collected packages: numpy
Successfully installed numpy-1.24.3
```

### Uninstalling Packages

```bash
# Uninstall package
pip uninstall numpy

# Uninstall without confirmation
pip uninstall -y numpy

# Uninstall multiple packages
pip uninstall numpy pandas matplotlib

# Uninstall from requirements file
pip uninstall -r requirements.txt -y
```

### Upgrading Packages

```bash
# Upgrade single package
pip install --upgrade numpy

# Upgrade all packages (not recommended, can break things)
pip list --outdated --format=freeze | grep -v '^\-e' | cut -d = -f 1 | xargs -n1 pip install -U

# Better: upgrade selectively
pip list --outdated
pip install --upgrade package1 package2
```

---

## 📊 Listing and Searching

### List Installed Packages

```bash
# List all installed packages
pip list

# Output:
# Package       Version
# ------------- -------
# numpy         1.24.3
# pandas        1.5.3
# pip           23.2.1

# List with details
pip list --verbose

# List outdated packages
pip list --outdated

# Output:
# Package  Version  Latest   Type
# -------- -------- -------- -----
# numpy    1.24.0   1.24.3   wheel
# pandas   1.5.0    1.5.3    wheel
```

### Show Package Details

```bash
# Show package information
pip show numpy

# Output:
# Name: numpy
# Version: 1.24.3
# Summary: Fundamental package for array computing
# Home-page: https://numpy.org
# Author: NumPy Developers
# License: BSD-3-Clause
# Location: /path/to/site-packages
# Requires: 
# Required-by: pandas, scipy, matplotlib

# Show multiple packages
pip show numpy pandas

# Show package files
pip show --files numpy
```

### Search Packages (Deprecated)

```bash
# Note: pip search is disabled due to PyPI limitations
# Use alternative methods:

# 1. Search on PyPI website
# Visit: https://pypi.org/search/?q=machine+learning

# 2. Use pip_search package
pip install pip_search
pip_search machine learning

# 3. Use Google
# "python package for machine learning"
```

---

## 📝 Requirements Files

### Creating requirements.txt

```bash
# Export all installed packages
pip freeze > requirements.txt

# Output (requirements.txt):
numpy==1.24.3
pandas==1.5.3
matplotlib==3.7.1
scikit-learn==1.2.2
```

### Installing from requirements.txt

```bash
# Install all packages
pip install -r requirements.txt

# Example requirements.txt:
numpy==1.24.3
pandas>=1.5,<2.0
matplotlib
scikit-learn==1.2.*
```

### Generating requirements.txt

**Method 1: pip freeze (includes everything)**
```bash
pip freeze > requirements.txt
```

**Method 2: pipreqs (only imports actually used)**
```bash
# Install pipreqs
pip install pipreqs

# Generate requirements
pipreqs /path/to/project

# This scans Python files for imports and creates requirements.txt
```

**Method 3: Manual (recommended)**
```txt
# requirements.txt
# Core dependencies
numpy==1.24.3
pandas==1.5.3
scikit-learn==1.2.2

# Visualization
matplotlib==3.7.1
seaborn==0.12.2

# Development
pytest==7.3.1
black==23.3.0
```

---

## 🔍 pip Check

### Verify Dependencies

```bash
# Check for broken dependencies
pip check

# Example output (no issues):
# No broken requirements found.

# Example output (with issues):
# package-a 1.0 has requirement package-b>=2.0, but you have package-b 1.5
```

**Common issues pip check finds:**
- Missing dependencies
- Version conflicts
- Incompatible versions

---

## 📍 Installation Locations

### Where are Packages Installed?

```bash
# Show pip configuration
pip config list

# Find site-packages directory
python -c "import site; print(site.getsitepackages())"

# Output: ['/usr/local/lib/python3.11/site-packages']
```

### User vs System Install

```bash
# System-wide install (requires admin/sudo)
pip install numpy
# Location: /usr/local/lib/python3.11/site-packages

# User install (no admin needed)
pip install --user numpy
# Location: ~/.local/lib/python3.11/site-packages

# Current directory install (development)
pip install -e .
# Editable install in current directory
```

---

## 🎯 Version Specifiers

### Exact Version

```bash
# Install exact version
pip install numpy==1.24.3
```

### Minimum Version

```bash
# Install at least version 1.24
pip install "numpy>=1.24"

# Equivalent formats:
pip install 'numpy>=1.24'
pip install numpy\>=1.24  # Escape on Linux/Mac
```

### Maximum Version

```bash
# Install below version 2.0
pip install "numpy<2.0"
```

### Version Range

```bash
# Install between versions
pip install "numpy>=1.24,<2.0"

# Complex range
pip install "numpy>=1.24.0,<=1.24.3"
```

### Compatible Release

```bash
# Install compatible versions (patch updates only)
pip install "numpy~=1.24.0"

# Equivalent to: numpy>=1.24.0,<1.25.0
# Allows: 1.24.1, 1.24.2, 1.24.3
# Blocks: 1.25.0, 2.0.0
```

### Wildcard

```bash
# Install any 1.24.x version
pip install "numpy==1.24.*"
```

---

## 💾 pip Cache

### Cache Management

```bash
# Show cache directory
pip cache dir

# Show cache info
pip cache info

# List cached packages
pip cache list

# Remove specific package from cache
pip cache remove numpy

# Clear entire cache
pip cache purge
```

**When to clear cache:**
- Disk space issues
- Corrupted downloads
- Testing installations

---

## 🌐 Alternative Package Indexes

### Using Different Indexes

```bash
# Install from custom index
pip install --index-url https://custom.pypi.org/simple/ package

# Use additional index
pip install --extra-index-url https://custom.pypi.org/simple/ package

# Trust host (for http indexes)
pip install --trusted-host custom.pypi.org package
```

### Common Alternative Indexes

```bash
# Test PyPI (for testing packages)
pip install --index-url https://test.pypi.org/simple/ package

# Azure DevOps
pip install --index-url https://pkgs.dev.azure.com/org/_packaging/feed/pypi/simple/ package

# Anaconda PyPI mirror (faster for some regions)
pip install --index-url https://pypi.anaconda.org/simple/ package
```

---

## 🔧 Configuration

### pip Configuration File

**Locations (in order of priority):**
1. `./pip.conf` (per-project)
2. `~/.config/pip/pip.conf` (user)
3. `/etc/pip.conf` (system)

**Example pip.conf:**
```ini
[global]
timeout = 60
index-url = https://pypi.org/simple
trusted-host = pypi.org
               files.pythonhosted.org

[install]
user = false
ignore-installed = false
no-dependencies = false
```

### View Configuration

```bash
# List all configuration
pip config list

# Show specific config
pip config get global.index-url

# Set configuration
pip config set global.timeout 60
```

---

## 🐛 Common Issues and Solutions

### Issue 1: Permission Denied

```bash
# ❌ Problem
pip install numpy
# ERROR: Could not install packages due to an OSError: [Errno 13] Permission denied

# ✅ Solution 1: User install
pip install --user numpy

# ✅ Solution 2: Virtual environment (recommended)
python -m venv venv
source venv/bin/activate
pip install numpy
```

### Issue 2: SSL Certificate Error

```bash
# ❌ Problem
pip install numpy
# WARNING: Retrying (Retry(total=4, connect=None, read=None, redirect=None, status=None)) 
# after connection broken by 'SSLError'

# ✅ Solution 1: Upgrade certifi
pip install --upgrade certifi

# ✅ Solution 2: Temporary workaround
pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org numpy

# ✅ Solution 3: Use system certificates
pip install --cert /etc/ssl/certs/ca-certificates.crt numpy
```

### Issue 3: Package Not Found

```bash
# ❌ Problem
pip install scikit_learn
# ERROR: Could not find a version that satisfies the requirement scikit_learn

# ✅ Solution: Check correct package name
pip install scikit-learn  # Note: hyphen, not underscore

# Tip: Search on https://pypi.org for exact package name
```

### Issue 4: Conflicting Dependencies

```bash
# ❌ Problem
ERROR: package-a 2.0.0 has requirement package-b>=3.0, but you'll have package-b 2.5

# ✅ Solution 1: Check conflicts
pip check

# ✅ Solution 2: Upgrade conflicting package
pip install --upgrade package-b

# ✅ Solution 3: Use constraints
pip install package-a -c constraints.txt
```

### Issue 5: Broken Installation

```bash
# ❌ Problem
ImportError: No module named 'numpy'
# But pip list shows numpy installed

# ✅ Solution 1: Reinstall
pip uninstall numpy
pip install numpy

# ✅ Solution 2: Force reinstall
pip install --force-reinstall numpy

# ✅ Solution 3: Check Python environment
which python  # Verify correct Python
pip --version  # Verify pip matches Python
```

---

## 🎓 Exercises

### Exercise 1: Basic Installation
```bash
# 1. Install pandas
pip install pandas

# 2. Check version
pip show pandas

# 3. List all packages
pip list

# 4. Uninstall pandas
pip uninstall pandas
```

### Exercise 2: Version Management
```bash
# 1. Install specific numpy version
pip install numpy==1.24.0

# 2. Check if outdated
pip list --outdated

# 3. Upgrade to latest
pip install --upgrade numpy

# 4. Install version range
pip install "numpy>=1.24,<2.0"
```

### Exercise 3: Requirements File
```bash
# 1. Create requirements.txt
pip freeze > requirements.txt

# 2. Create new virtual environment
python -m venv test-env
source test-env/bin/activate

# 3. Install from requirements
pip install -r requirements.txt

# 4. Verify installation
pip list
```

---

## 🎯 Key Takeaways

1. ✅ **pip is essential** - Master basic commands
2. ✅ **Use virtual environments** - Never install globally
3. ✅ **Pin versions** - Use exact versions in requirements.txt
4. ✅ **pip check** - Verify dependencies regularly
5. ✅ **pip freeze** - Export installed packages
6. ✅ **--user flag** - Alternative to sudo/admin
7. ✅ **Read error messages** - They usually tell you what's wrong

---

## 🔗 Navigation

- **Up**: [3.5 Package Management Overview](./README.md)
- **Next**: [02 - pip Advanced](./02-pip-Advanced.md)

---

**Remember:** pip is your primary tool for Python package management. Master the basics before moving to advanced features. Always use virtual environments to avoid conflicts!
