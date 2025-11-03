# 📦 Advanced pip Techniques

## Overview

This guide covers advanced pip features and workflows for professional Python development. Learn to manage complex dependencies, create reproducible environments, and implement best practices for package management at scale.

---

## 📚 Table of Contents

1. [Advanced Requirements Files](#advanced-requirements-files)
2. [Constraints Files](#constraints-files)
3. [pip-tools](#pip-tools)
4. [Editable Installs](#editable-installs)
5. [Installing from Various Sources](#installing-from-various-sources)
6. [Wheels vs Source Distributions](#wheels-vs-source-distributions)
7. [Custom Package Indexes](#custom-package-indexes)
8. [Security Best Practices](#security-best-practices)
9. [Troubleshooting Advanced Issues](#troubleshooting-advanced-issues)
10. [Exercises](#exercises)

---

## 🎯 Advanced Requirements Files

### Requirements File Structure

```txt
# requirements.in - High-level dependencies
# ==========================================

# Basic dependencies with comments
numpy>=1.20.0        # Scientific computing
pandas>=1.3.0        # Data manipulation
matplotlib>=3.4.0    # Visualization

# Conditional dependencies
pywin32>=300; sys_platform == 'win32'  # Windows-only
pyobjc>=8.0; sys_platform == 'darwin'  # macOS-only

# Git dependencies
git+https://github.com/tensorflow/tensorflow.git@v2.12.0#egg=tensorflow

# Editable local packages
-e ./my_local_package
-e git+https://github.com/user/repo.git@branch#egg=package

# Include other requirements files
-r requirements-dev.txt
-r requirements-test.txt
```

### Environment Markers

```txt
# Platform-specific packages
colorama>=0.4.4; sys_platform == 'win32'
readline>=6.2.0; sys_platform != 'win32'

# Python version specific
typing>=3.7.4; python_version < '3.5'
dataclasses>=0.6; python_version < '3.7'

# Operating system specific
psutil>=5.8.0; os_name == 'posix'
pywin32>=300; os_name == 'nt'

# Combined conditions
scipy>=1.7.0; python_version >= '3.7' and platform_machine != 'aarch64'
```

### Multiple Requirements Files

```bash
# Production dependencies
# requirements.txt
numpy>=1.20.0
pandas>=1.3.0
scikit-learn>=0.24.0

# Development dependencies
# requirements-dev.txt
-r requirements.txt  # Include production dependencies
pytest>=6.2.0
black>=21.0
flake8>=3.9.0
mypy>=0.900

# Testing dependencies
# requirements-test.txt
-r requirements.txt
pytest>=6.2.0
pytest-cov>=2.12.0
pytest-mock>=3.6.0
hypothesis>=6.14.0

# Documentation dependencies
# requirements-docs.txt
-r requirements.txt
sphinx>=4.0.0
sphinx-rtd-theme>=0.5.0
myst-parser>=0.15.0
```

### Installing Multiple Requirements Files

```bash
# Install production + development dependencies
pip install -r requirements-dev.txt

# Install all requirements files
pip install -r requirements.txt -r requirements-test.txt

# Generate combined requirements
cat requirements*.txt > requirements-all.txt
pip install -r requirements-all.txt
```

---

## 🔒 Constraints Files

### What are Constraints Files?

Constraints files specify version limits **without** installing packages. They ensure consistent versions across different requirements files.

```txt
# constraints.txt
# ================
# Lock versions for consistency across all installations

numpy==1.21.0
pandas==1.3.2
scikit-learn==0.24.2
matplotlib==3.4.3
scipy==1.7.1
```

### Using Constraints Files

```bash
# Install with constraints
pip install -c constraints.txt package-name

# Use with requirements files
pip install -r requirements.txt -c constraints.txt

# Generate constraints from current environment
pip freeze > constraints.txt
```

### Constraints vs Requirements

```bash
# requirements.txt - INSTALLS these packages
numpy>=1.20.0
pandas>=1.3.0

# constraints.txt - LIMITS versions but doesn't install
numpy==1.21.0
pandas==1.3.2

# Installation
pip install -r requirements.txt -c constraints.txt
# Result: Installs numpy 1.21.0 and pandas 1.3.2 (constrained versions)
```

### Practical Use Case

```bash
# Project structure
project/
├── requirements.txt          # High-level dependencies
├── constraints.txt           # Locked versions
├── requirements-dev.txt      # Development tools
└── requirements-test.txt     # Testing tools

# Install production with locked versions
pip install -r requirements.txt -c constraints.txt

# Install development with same constraints
pip install -r requirements-dev.txt -c constraints.txt

# Install testing with same constraints
pip install -r requirements-test.txt -c constraints.txt
```

---

## 🛠️ pip-tools

### Installation

```bash
pip install pip-tools
```

### pip-compile

Convert high-level requirements to pinned versions:

```bash
# Create requirements.in
echo "numpy
pandas
scikit-learn" > requirements.in

# Compile to requirements.txt with pinned versions
pip-compile requirements.in

# Result: requirements.txt
# numpy==1.21.0
# pandas==1.3.2
#   pytz==2021.1
#   python-dateutil==2.8.2
#     six==1.16.0
# scikit-learn==0.24.2
#   joblib==1.0.1
#   scipy==1.7.1
#   threadpoolctl==2.2.0
```

### Advanced pip-compile Options

```bash
# Compile with Python version
pip-compile --python-version 3.9 requirements.in

# Upgrade all packages
pip-compile --upgrade requirements.in

# Upgrade specific package
pip-compile --upgrade-package pandas requirements.in

# Generate hashes for security
pip-compile --generate-hashes requirements.in

# Output to different file
pip-compile requirements.in -o constraints.txt

# Annotate with source comments
pip-compile --annotate requirements.in

# Use specific index URL
pip-compile --index-url https://test.pypi.org/simple/ requirements.in
```

### pip-sync

Synchronize environment to match requirements exactly:

```bash
# Sync to requirements.txt (removes unlisted packages)
pip-sync requirements.txt

# Sync multiple files
pip-sync requirements.txt requirements-dev.txt

# Dry run to see what would change
pip-sync --dry-run requirements.txt
```

### Complete pip-tools Workflow

```bash
# 1. Create high-level requirements
cat > requirements.in << EOF
numpy>=1.20.0
pandas>=1.3.0
scikit-learn>=0.24.0
EOF

# 2. Compile to pinned versions
pip-compile requirements.in

# 3. Install exact versions
pip-sync requirements.txt

# 4. Add a new package
echo "matplotlib>=3.4.0" >> requirements.in
pip-compile requirements.in

# 5. Sync environment
pip-sync requirements.txt

# 6. Upgrade all packages
pip-compile --upgrade requirements.in
pip-sync requirements.txt

# 7. Upgrade specific package
pip-compile --upgrade-package pandas requirements.in
pip-sync requirements.txt
```

### Managing Multiple Environments

```bash
# Development setup
requirements-dev.in:
-c requirements.txt  # Use constraints from production
pytest>=6.2.0
black>=21.0
mypy>=0.900

# Compile development requirements
pip-compile requirements-dev.in

# Install both production and development
pip-sync requirements.txt requirements-dev.txt
```

---

## 🔧 Editable Installs

### What are Editable Installs?

Editable installs (`-e` flag) link a package to its source directory. Changes to source code are immediately reflected without reinstallation.

### Basic Editable Install

```bash
# Install local package in editable mode
pip install -e /path/to/package

# Current directory
pip install -e .

# With extras
pip install -e ".[dev,test]"
```

### Use Cases

```bash
# Developing a package
my_package/
├── setup.py
├── my_package/
│   ├── __init__.py
│   └── module.py
└── tests/

# Install in editable mode
cd my_package
pip install -e .

# Now changes to module.py are immediately available
# No need to reinstall after each change
```

### Editable Install from Git

```bash
# Install from Git repository in editable mode
pip install -e git+https://github.com/user/repo.git@branch#egg=package

# Clone to specific directory
pip install -e git+https://github.com/user/repo.git@branch#egg=package --src=/path/to/src
```

### Requirements File with Editable Installs

```txt
# requirements-dev.txt
# ====================

# Production dependencies
-r requirements.txt

# Editable local packages
-e ./libs/core
-e ./libs/utils

# Editable git packages
-e git+https://github.com/myorg/internal-lib.git@develop#egg=internal-lib

# Regular packages
pytest>=6.2.0
black>=21.0
```

### setup.py for Editable Installs

```python
# setup.py
from setuptools import setup, find_packages

setup(
    name="my_package",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "numpy>=1.20.0",
        "pandas>=1.3.0",
    ],
    extras_require={
        "dev": [
            "pytest>=6.2.0",
            "black>=21.0",
            "flake8>=3.9.0",
        ],
        "test": [
            "pytest>=6.2.0",
            "pytest-cov>=2.12.0",
        ],
    },
)
```

### Uninstalling Editable Packages

```bash
# List editable packages
pip list -e

# Uninstall editable package
pip uninstall my_package

# Note: Source directory remains unchanged
```

---

## 📥 Installing from Various Sources

### From Git Repositories

```bash
# Latest from default branch
pip install git+https://github.com/user/repo.git

# Specific branch
pip install git+https://github.com/user/repo.git@branch-name

# Specific tag
pip install git+https://github.com/user/repo.git@v1.2.3

# Specific commit
pip install git+https://github.com/user/repo.git@abc123def456

# With extras
pip install git+https://github.com/user/repo.git@main#egg=package[extras]

# Subdirectory
pip install git+https://github.com/user/repo.git@main#subdirectory=packages/mylib

# SSH URL (requires SSH keys)
pip install git+ssh://git@github.com/user/repo.git
```

### From Local Paths

```bash
# Install from local directory
pip install /path/to/package

# Install from local wheel
pip install /path/to/package-1.0.0-py3-none-any.whl

# Install from local tarball
pip install /path/to/package-1.0.0.tar.gz

# Editable install from local path
pip install -e /path/to/package
```

### From URLs

```bash
# Install wheel from URL
pip install https://example.com/packages/package-1.0.0-py3-none-any.whl

# Install tarball from URL
pip install https://example.com/packages/package-1.0.0.tar.gz

# Install from GitHub release
pip install https://github.com/user/repo/archive/v1.0.0.tar.gz
```

### From PyPI Alternatives

```bash
# Install from Test PyPI
pip install --index-url https://test.pypi.org/simple/ package-name

# Install from private PyPI
pip install --index-url https://pypi.mycompany.com/simple/ package-name

# Use multiple indexes
pip install --index-url https://pypi.org/simple/ \
            --extra-index-url https://test.pypi.org/simple/ \
            package-name
```

### Combined Installation

```txt
# requirements.txt with mixed sources
# ====================================

# Regular PyPI packages
numpy>=1.20.0
pandas>=1.3.0

# From Git (specific commit)
git+https://github.com/tensorflow/tensorflow.git@v2.12.0#egg=tensorflow

# Local editable package
-e ./libs/core

# From URL
https://github.com/scikit-learn/scikit-learn/archive/1.0.2.tar.gz

# From private PyPI (in pip.conf)
internal-package>=2.0.0
```

---

## 🎡 Wheels vs Source Distributions

### Understanding Package Types

```bash
# Wheel (.whl) - Pre-built binary package
package-1.0.0-py3-none-any.whl
#        |     |   |    |
#        |     |   |    +-- Platform (any, win_amd64, manylinux, etc.)
#        |     |   +------- ABI (none, cp39, etc.)
#        |     +----------- Python version (py3, cp39, etc.)
#        +----------------- Version

# Source Distribution (.tar.gz or .zip) - Source code package
package-1.0.0.tar.gz
```

### When pip Uses Each Type

```bash
# pip prefers wheels (faster installation)
pip install numpy
# Downloading numpy-1.21.0-cp39-cp39-win_amd64.whl

# Falls back to source if no wheel available
pip install some-package
# Downloading some-package-1.0.0.tar.gz
# Building wheel for some-package ...

# Force source installation
pip install --no-binary numpy numpy
```

### Wheel Benefits

- **Faster installation** - No compilation needed
- **No build dependencies** - Don't need compilers
- **Consistent** - Same binaries across installations
- **Smaller size** - Compressed efficiently

### Source Distribution Benefits

- **Universal compatibility** - Works on any platform
- **Customizable** - Can modify build process
- **Latest code** - Access to unreleased features

### Managing Wheels

```bash
# Download wheel without installing
pip download --only-binary :all: numpy

# Build wheel from source
pip wheel --no-binary :all: numpy

# Install from local wheel directory
pip install --find-links /path/to/wheels numpy

# Create wheel from your package
pip wheel .

# Create wheel with setup.py
python setup.py bdist_wheel
```

### Platform-Specific Wheels

```bash
# Linux wheels (manylinux)
numpy-1.21.0-cp39-cp39-manylinux_2_17_x86_64.whl

# Windows wheels
numpy-1.21.0-cp39-cp39-win_amd64.whl

# macOS wheels (universal2 for Apple Silicon)
numpy-1.21.0-cp39-cp39-macosx_11_0_arm64.whl

# Pure Python wheel (works everywhere)
requests-2.26.0-py2.py3-none-any.whl
```

---

## 🏢 Custom Package Indexes

### Setting Up pip.conf

```ini
# ~/.pip/pip.conf (Linux/macOS)
# C:\Users\YourName\pip\pip.ini (Windows)
# ==========================================

[global]
index-url = https://pypi.org/simple/
extra-index-url = https://test.pypi.org/simple/
                  https://pypi.mycompany.com/simple/
trusted-host = pypi.mycompany.com

[install]
# Always use these settings for install
find-links = /path/to/local/wheels
no-cache-dir = false
```

### Using Multiple Indexes

```bash
# Primary index (first match wins)
pip install --index-url https://pypi.mycompany.com/simple/ package

# Multiple indexes
pip install --index-url https://pypi.org/simple/ \
            --extra-index-url https://pypi.mycompany.com/simple/ \
            package

# Find links (local or remote directories)
pip install --find-links /path/to/wheels \
            --find-links https://example.com/wheels/ \
            package
```

### Private PyPI Server

```bash
# Install devpi (private PyPI server)
pip install devpi-server devpi-client

# Initialize and start server
devpi-init
devpi-server --start

# Create user and index
devpi use http://localhost:3141
devpi user -c myuser password=mypassword
devpi login myuser --password=mypassword
devpi index -c myindex bases=root/pypi

# Upload package
devpi use myuser/myindex
devpi upload
```

### Authentication

```bash
# Method 1: URL with credentials (not recommended)
pip install --index-url https://user:password@pypi.mycompany.com/simple/ package

# Method 2: .netrc file (recommended)
# ~/.netrc
machine pypi.mycompany.com
login myuser
password mypassword

# Method 3: Environment variables
export PIP_INDEX_URL=https://pypi.mycompany.com/simple/
export PIP_EXTRA_INDEX_URL=https://test.pypi.org/simple/
pip install package

# Method 4: keyring (most secure)
pip install keyring
keyring set pypi.mycompany.com myuser
# Enter password when prompted
```

---

## 🔐 Security Best Practices

### Using Package Hashes

```bash
# Generate requirements with hashes
pip freeze --all > requirements.txt
pip-compile --generate-hashes requirements.in

# Install with hash verification
pip install --require-hashes -r requirements.txt
```

### Requirements with Hashes

```txt
# requirements.txt
certifi==2021.5.30 \
    --hash=sha256:2bbf76fd432960138b3ef6dda3dde0544f27cbf8546c458e60baf371917ba9ee \
    --hash=sha256:50b1e4f8446b06f41be7dd6338db18e0990601dce795c2b1686458aa7e8fa7d8
charset-normalizer==2.0.4 \
    --hash=sha256:0c8911edd2d7b9b4d7e7d7f9df5e3d9d7c1e5b7b7d0f7b8d0e0f8d4e4f8d4e4 \
    --hash=sha256:f7b5f8f8e9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9
```

### Verify Package Integrity

```bash
# Check for security vulnerabilities
pip install safety
safety check

# Scan requirements file
safety check -r requirements.txt

# Check installed packages
safety check --json
```

### Trusted Hosts

```bash
# Add trusted host (skip SSL verification - use cautiously)
pip install --trusted-host pypi.mycompany.com package

# Multiple trusted hosts
pip install --trusted-host pypi.org \
            --trusted-host files.pythonhosted.org \
            package

# Add to pip.conf
[global]
trusted-host = pypi.mycompany.com
               pypi.org
               files.pythonhosted.org
```

### Audit Dependencies

```bash
# Install pip-audit
pip install pip-audit

# Audit installed packages
pip-audit

# Audit requirements file
pip-audit -r requirements.txt

# Fix vulnerabilities
pip-audit --fix

# Output report
pip-audit -f json -o audit-report.json
```

---

## 🔧 Troubleshooting Advanced Issues

### Dependency Conflicts

```bash
# Problem: Conflicting versions
ERROR: Cannot install package-a and package-b because these package versions have conflicting dependencies.

# Solution 1: Use pip-tools to resolve
pip-compile --resolver=backtracking requirements.in

# Solution 2: Check dependency tree
pip install pipdeptree
pipdeptree -p package-name

# Solution 3: Use constraints file
pip install -c constraints.txt -r requirements.txt
```

### Build Failures

```bash
# Problem: Missing compiler or build tools
error: Microsoft Visual C++ 14.0 is required

# Solution: Install build dependencies
# Windows: Install Visual Studio Build Tools
# Linux: sudo apt install build-essential python3-dev
# macOS: xcode-select --install

# Alternative: Use pre-built wheels
pip install --only-binary :all: package-name
```

### SSL Certificate Issues

```bash
# Problem: SSL certificate verification failed
SSL: CERTIFICATE_VERIFY_FAILED

# Solution 1: Update certifi
pip install --upgrade certifi

# Solution 2: Use trusted host (temporary)
pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org package

# Solution 3: Set certificate path
export SSL_CERT_FILE=/path/to/cacert.pem
pip install package
```

### Locked Dependencies

```bash
# Problem: Cannot upgrade due to locks
ERROR: Cannot uninstall 'package'. It is a distutils installed project.

# Solution 1: Force reinstall
pip install --ignore-installed --force-reinstall package

# Solution 2: Use virtual environment
python -m venv clean_env
source clean_env/bin/activate
pip install package

# Solution 3: Remove manually then reinstall
pip uninstall -y package
pip install package
```

### Slow Downloads

```bash
# Problem: Slow PyPI downloads

# Solution 1: Use mirror
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple package

# Solution 2: Download locally then install
pip download -d ./wheels package
pip install --no-index --find-links ./wheels package

# Solution 3: Use cache
export PIP_CACHE_DIR=/path/to/cache
pip install package
```

---

## 💪 Exercises

### Exercise 1: Complex Requirements Setup

Create a multi-file requirements structure for a machine learning project with production, development, and testing dependencies.

**Solution:**

```bash
# Create project structure
mkdir ml_project && cd ml_project

# requirements.in (production)
cat > requirements.in << 'EOF'
numpy>=1.20.0
pandas>=1.3.0
scikit-learn>=0.24.0
matplotlib>=3.4.0
EOF

# requirements-dev.in (development)
cat > requirements-dev.in << 'EOF'
-c requirements.txt
pytest>=6.2.0
black>=21.0
flake8>=3.9.0
mypy>=0.900
jupyter>=1.0.0
EOF

# requirements-test.in (testing)
cat > requirements-test.in << 'EOF'
-c requirements.txt
pytest>=6.2.0
pytest-cov>=2.12.0
pytest-mock>=3.6.0
hypothesis>=6.14.0
EOF

# Compile all requirements
pip-compile requirements.in
pip-compile requirements-dev.in
pip-compile requirements-test.in

# Install production
pip-sync requirements.txt

# Install development (includes production via constraints)
pip-sync requirements.txt requirements-dev.txt
```

### Exercise 2: Editable Package Development

Set up an editable package with dependencies and test it.

**Solution:**

```bash
# Create package structure
mkdir my_ml_lib && cd my_ml_lib
mkdir my_ml_lib tests

# setup.py
cat > setup.py << 'EOF'
from setuptools import setup, find_packages

setup(
    name="my_ml_lib",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "numpy>=1.20.0",
        "pandas>=1.3.0",
    ],
    extras_require={
        "dev": [
            "pytest>=6.2.0",
            "black>=21.0",
        ],
    },
)
EOF

# my_ml_lib/__init__.py
cat > my_ml_lib/__init__.py << 'EOF'
import numpy as np
import pandas as pd

def process_data(data):
    """Process input data."""
    return pd.DataFrame(np.array(data))
EOF

# Install in editable mode
pip install -e ".[dev]"

# Test import
python -c "from my_ml_lib import process_data; print(process_data([[1,2],[3,4]]))"

# Make changes and test immediately (no reinstall needed)
```

### Exercise 3: Private Package Index

Set up a local package index and install from it.

**Solution:**

```bash
# Create local index directory
mkdir -p ~/local_pypi/simple

# Build your package wheel
cd ~/my_package
python setup.py bdist_wheel
cp dist/*.whl ~/local_pypi/simple/

# Create index HTML (simple directory index)
cd ~/local_pypi/simple
python -m http.server 8000

# In another terminal, install from local index
pip install --index-url http://localhost:8000/simple my_package

# Or add to pip.conf
cat >> ~/.pip/pip.conf << 'EOF'
[global]
extra-index-url = http://localhost:8000/simple
EOF

pip install my_package
```

---

## 🎯 Key Takeaways

✅ **Requirements Files**: Use `.in` files for high-level deps, compile to `.txt` with pinned versions  
✅ **Constraints Files**: Lock versions without installing, use across multiple requirements files  
✅ **pip-tools**: Use `pip-compile` for reproducibility, `pip-sync` for exact environments  
✅ **Editable Installs**: Use `-e` for packages under development, changes reflected immediately  
✅ **Multiple Sources**: Install from Git, local paths, URLs, private indexes  
✅ **Wheels**: Prefer wheels for speed, build from source when needed  
✅ **Security**: Use hashes, audit dependencies, verify integrity  
✅ **Troubleshooting**: Use `pipdeptree`, constraints files, and fresh virtual environments

---

## 🔗 Navigation

- **Previous**: [01-pip-Fundamentals.md](./01-pip-Fundamentals.md)
- **Next**: [03-Conda-Packages.md](./03-Conda-Packages.md)
- **Up**: [README.md](./README.md)
- **Chapter Home**: [Chapter 3 - Development Environment](../README.md)

---

**Happy Package Management! 🚀📦**
