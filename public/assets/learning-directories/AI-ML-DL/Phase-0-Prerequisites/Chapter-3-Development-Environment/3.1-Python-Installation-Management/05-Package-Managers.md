# Package Managers Overview

## 📋 Table of Contents
- [Introduction](#introduction)
- [pip - Python Package Installer](#pip---python-package-installer)
- [conda - Cross-Platform Package Manager](#conda---cross-platform-package-manager)
- [pip vs conda](#pip-vs-conda)
- [When to Use Each](#when-to-use-each)
- [Mixing pip and conda](#mixing-pip-and-conda)
- [Practice Exercises](#practice-exercises)

---

## Introduction

Package managers automate the process of installing, upgrading, and removing software packages. Python has two main package managers: **pip** and **conda**.

---

## pip - Python Package Installer

### What is pip?

**pip** is Python's default package installer. It installs packages from the Python Package Index ([PyPI.org](https://pypi.org/)).

### Basic pip Commands

```bash
# Install a package
pip install numpy

# Install specific version
pip install numpy==1.24.0

# Install minimum version
pip install "numpy>=1.24.0"

# Install from requirements.txt
pip install -r requirements.txt

# Upgrade a package
pip install --upgrade numpy

# Uninstall a package
pip uninstall numpy

# List installed packages
pip list

# Show package information
pip show numpy

# Search for packages (deprecated, use PyPI website)
# pip search numpy

# Freeze dependencies
pip freeze > requirements.txt
```

### Advanced pip Usage

```bash
# Install in user directory (no admin required)
pip install --user numpy

# Install editable package (development mode)
pip install -e .

# Install from git repository
pip install git+https://github.com/user/repo.git

# Install from local directory
pip install /path/to/package

# Install with extra dependencies
pip install "package[extra]"
pip install "tensorflow[gpu]"

# Check for outdated packages
pip list --outdated

# Install multiple packages
pip install numpy pandas matplotlib
```

### pip Configuration

Create `~/.pip/pip.conf` (Linux/macOS) or `%APPDATA%\pip\pip.ini` (Windows):

```ini
[global]
timeout = 60
index-url = https://pypi.org/simple

[install]
no-cache-dir = false
```

---

## conda - Cross-Platform Package Manager

### What is conda?

**conda** is a package and environment manager that can install any software, not just Python packages.

### Basic conda Commands

```bash
# Install a package
conda install numpy

# Install specific version
conda install numpy=1.24.0

# Install from specific channel
conda install -c conda-forge package_name

# Update a package
conda update numpy

# Remove a package
conda remove numpy

# List installed packages
conda list

# Search for packages
conda search numpy

# Install from environment.yml
conda env create -f environment.yml

# Export environment
conda env export > environment.yml
```

### conda Channels

```bash
# Default channels (Anaconda)
conda install numpy

# conda-forge (community channel, more packages)
conda install -c conda-forge numpy

# Add channel permanently
conda config --add channels conda-forge
conda config --set channel_priority strict

# View configured channels
conda config --show channels

# Popular channels
# - defaults (Anaconda)
# - conda-forge
# - pytorch
# - nvidia
```

---

## pip vs conda

### Comparison Table

| Feature | pip | conda |
|---------|-----|-------|
| **Package Source** | PyPI | Anaconda repos |
| **Package Types** | Python only | Any software |
| **Binary Packages** | Wheels | Conda packages |
| **Environment Management** | No (use venv) | Yes (built-in) |
| **Dependency Resolution** | Basic | Advanced |
| **C Library Dependencies** | Manual | Automatic |
| **Speed** | Faster | Slower |
| **Package Count** | 400,000+ | 20,000+ |
| **Best For** | Pure Python | Data science |

### Detailed Comparison

#### Package Installation

**pip:**
```bash
# pip installs from PyPI
pip install tensorflow

# May need C compiler for some packages
# Binary wheels when available
```

**conda:**
```bash
# conda installs pre-compiled binaries
conda install tensorflow

# Includes C libraries (CUDA, cuDNN, etc.)
# No compiler needed
```

#### Dependency Management

**pip:**
```bash
# Basic dependency resolution
# Can sometimes install incompatible versions
pip install package_a package_b

# Check with:
pip check
```

**conda:**
```bash
# Advanced solver (SAT solver)
# Ensures compatibility
conda install package_a package_b

# Automatic conflict resolution
```

#### Environment Management

**pip:**
```bash
# Requires separate tool (venv, virtualenv)
python -m venv myenv
source myenv/bin/activate  # Linux/macOS
myenv\Scripts\activate     # Windows

pip install -r requirements.txt
```

**conda:**
```bash
# Built-in environment management
conda create -n myenv python=3.11
conda activate myenv

conda install numpy pandas
```

---

## When to Use Each

### Use pip When:

1. **Pure Python Packages**
   ```bash
   pip install flask django requests
   ```

2. **Latest Packages**
   - PyPI has more packages
   - More up-to-date

3. **Lightweight Projects**
   - Faster installation
   - Smaller footprint

4. **Production Deployment**
   - Docker containers
   - Simpler requirements

5. **Package Not in conda**
   ```bash
   # Many packages only on PyPI
   pip install some-niche-package
   ```

### Use conda When:

1. **Data Science / ML**
   ```bash
   conda install numpy pandas scikit-learn
   ```

2. **C/C++ Dependencies**
   ```bash
   conda install tensorflow  # Includes CUDA
   ```

3. **Environment Management**
   ```bash
   conda create -n ds python=3.11
   conda install numpy scipy matplotlib
   ```

4. **Cross-Platform Consistency**
   - Same environment on Windows, Mac, Linux

5. **Non-Python Packages**
   ```bash
   conda install nodejs r-base julia
   ```

---

## Mixing pip and conda

### Best Practices

#### Rule of Thumb

```bash
# ✅ SAFE: Install conda packages first, then pip
conda install numpy pandas
pip install some-pip-only-package

# ❌ RISKY: Installing conda after pip can break environment
pip install numpy pandas
conda install scikit-learn  # May break numpy/pandas!
```

#### Recommended Workflow

```bash
# 1. Create conda environment
conda create -n myproject python=3.11

# 2. Activate environment
conda activate myproject

# 3. Install from conda first
conda install numpy pandas matplotlib scikit-learn

# 4. Install remaining packages with pip
pip install -r requirements-pip.txt

# 5. Never mix conda and pip for the same package!
# ❌ conda install numpy && pip install numpy  # DON'T DO THIS
```

#### Separate Requirements Files

```bash
# environment.yml (conda packages)
name: myproject
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.11
  - numpy
  - pandas
  - matplotlib
  - scikit-learn

# requirements-pip.txt (pip-only packages)
flask==2.3.0
requests==2.28.0
some-pip-only-package==1.0.0
```

Install both:
```bash
conda env create -f environment.yml
conda activate myproject
pip install -r requirements-pip.txt
```

### Avoiding Conflicts

```bash
# Check current package manager for installed package
conda list | grep numpy  # conda-installed
pip list | grep numpy    # pip-installed

# If package is from both, remove one
conda remove numpy  # if you want pip version
# or
pip uninstall numpy  # if you want conda version
```

---

## Practice Exercises

### Exercise 1: Package Manager Comparison

```bash
# Install same package with both

# Test 1: pip
python -m venv test-pip
source test-pip/bin/activate
time pip install numpy
pip show numpy
deactivate

# Test 2: conda
conda create -n test-conda python=3.11
conda activate test-conda
time conda install numpy
conda list numpy
conda deactivate

# Compare installation times and sizes
```

### Exercise 2: Dependency Investigation

```python
# Create script to check package dependencies

def check_dependencies(package_name):
    """Check what other packages depend on this package"""
    
    import subprocess
    import json
    
    try:
        # Using pip
        result = subprocess.run(
            ['pip', 'show', package_name],
            capture_output=True,
            text=True
        )
        print(f"=== {package_name} (pip) ===")
        print(result.stdout)
        
        # Check what requires it
        result = subprocess.run(
            ['pip', 'list', '--format=json'],
            capture_output=True,
            text=True
        )
        
    except Exception as e:
        print(f"Error: {e}")

check_dependencies('numpy')
```

### Exercise 3: Build Environment Files

```bash
# Create comprehensive environment specifications

# For pip
pip freeze > requirements-full.txt

# For conda
conda env export > environment-full.yml

# Clean versions (manual)
# requirements.txt
numpy==1.24.0
pandas==1.5.3
matplotlib==3.7.0

# environment.yml
name: myproject
channels:
  - conda-forge
dependencies:
  - python=3.11
  - numpy=1.24
  - pandas=1.5
  - matplotlib=3.7
```

### Exercise 4: Package Source Detection

```python
# Detect if package is installed via pip or conda

import subprocess
import sys

def detect_package_source(package_name):
    """Determine if package was installed via pip or conda"""
    
    # Check conda
    try:
        result = subprocess.run(
            ['conda', 'list', package_name],
            capture_output=True,
            text=True
        )
        if package_name in result.stdout:
            print(f"{package_name}: Installed via conda")
            return 'conda'
    except:
        pass
    
    # Check pip
    try:
        result = subprocess.run(
            [sys.executable, '-m', 'pip', 'show', package_name],
            capture_output=True,
            text=True
        )
        if result.returncode == 0:
            print(f"{package_name}: Installed via pip")
            return 'pip'
    except:
        pass
    
    print(f"{package_name}: Not found")
    return None

# Test
packages = ['numpy', 'pandas', 'requests', 'flask']
for pkg in packages:
    detect_package_source(pkg)
```

---

## Summary

### Quick Decision Guide

```
Need to install a package?
│
├─ Is it a pure Python package?
│  └─ Use pip ✓
│
├─ Does it have C/C++ dependencies?
│  ├─ Available in conda? → Use conda ✓
│  └─ Not in conda? → Use pip, may need compiler
│
├─ Are you doing data science/ML?
│  └─ Use conda for main packages, pip for extras ✓
│
└─ General Python development?
   └─ Use pip ✓
```

### Command Quick Reference

```bash
# pip
pip install package
pip list
pip freeze > requirements.txt
pip install -r requirements.txt

# conda
conda install package
conda list
conda env export > environment.yml
conda env create -f environment.yml
```

### Best Practices Summary

1. **Choose one as primary** (usually conda for data science, pip for general)
2. **If mixing, install conda packages first**
3. **Never install same package with both**
4. **Use environment files** (requirements.txt / environment.yml)
5. **Keep environments isolated**

---

## Additional Resources

- [pip Documentation](https://pip.pypa.io/)
- [conda Documentation](https://docs.conda.io/)
- [PyPI - Python Package Index](https://pypi.org/)
- [Conda-forge](https://conda-forge.org/)

---

**Congratulations!** You've completed Section 3.1: Python Installation & Management!

**Next Section:** [3.2 Virtual Environments](../3.2-Virtual-Environments/README.md)
