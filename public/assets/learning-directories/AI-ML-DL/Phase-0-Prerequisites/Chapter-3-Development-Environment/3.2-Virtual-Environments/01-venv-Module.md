# 01 - The venv Module

## 📋 Introduction

The `venv` module is Python's built-in tool for creating isolated virtual environments. It comes standard with Python 3.3+ and provides a lightweight way to manage project dependencies without requiring external tools.

**Why venv?**
- ✅ Built into Python (no installation needed)
- ✅ Lightweight and fast
- ✅ Official Python standard
- ✅ Cross-platform compatible
- ✅ Simple and straightforward

---

## 🎯 What is a Virtual Environment?

A virtual environment is an isolated Python installation that:
- Has its own Python interpreter
- Has its own site-packages directory
- Doesn't affect the system Python
- Allows project-specific dependencies
- Prevents version conflicts

### The Problem Without Virtual Environments

```
System Python 3.10
├── numpy 1.24.0 (Project A needs this)
├── pandas 2.0.0 (Project B needs this)
├── scikit-learn 1.3.0 (Project A needs 1.3.0)
└── scikit-learn 1.2.0 (Project B needs 1.2.0) ❌ CONFLICT!
```

### The Solution With Virtual Environments

```
System Python 3.10
│
├── project-a-env/
│   ├── numpy 1.24.0 ✅
│   └── scikit-learn 1.3.0 ✅
│
└── project-b-env/
    ├── pandas 2.0.0 ✅
    └── scikit-learn 1.2.0 ✅
```

---

## 📦 Creating Virtual Environments

### Basic Creation

```bash
# Create a virtual environment named 'venv'
python -m venv venv

# Create with a custom name
python -m venv myenv

# Create in a specific directory
python -m venv /path/to/myenv

# Use specific Python version (if multiple installed)
python3.10 -m venv venv310
python3.11 -m venv venv311
```

### What Gets Created?

```
venv/
├── bin/           # Unix/Linux/Mac - executables
│   ├── python     # Python interpreter symlink
│   ├── pip        # pip executable
│   └── activate   # Activation script
├── Scripts/       # Windows - executables
│   ├── python.exe
│   ├── pip.exe
│   └── activate.bat
├── lib/           # Python libraries
│   └── pythonX.Y/
│       └── site-packages/  # Where packages are installed
├── include/       # C headers for compiling packages
└── pyvenv.cfg     # Configuration file
```

### Directory Structure Explained

```python
# pyvenv.cfg contents
home = /usr/bin
include-system-site-packages = false
version = 3.10.12
```

---

## 🚀 Activating Virtual Environments

### Windows

```bash
# Using cmd
venv\Scripts\activate.bat

# Using PowerShell
venv\Scripts\Activate.ps1

# Using Git Bash
source venv/Scripts/activate
```

#### PowerShell Execution Policy Issue

```powershell
# If you get an error about execution policy
# Check current policy
Get-ExecutionPolicy

# Set policy for current user (recommended)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then activate
venv\Scripts\Activate.ps1
```

### Linux/Mac

```bash
# Using bash/zsh
source venv/bin/activate

# Alternative notation
. venv/bin/activate
```

### Verification

```bash
# After activation, your prompt changes
(venv) user@machine:~/project$

# Check which Python
which python       # Unix/Mac
where python       # Windows

# Check Python path
python -c "import sys; print(sys.prefix)"

# Should show your venv directory
```

---

## 📥 Installing Packages

### Basic Installation

```bash
# Activate environment first
source venv/bin/activate  # Unix/Mac
venv\Scripts\activate     # Windows

# Install packages
pip install numpy
pip install pandas scikit-learn matplotlib

# Install specific version
pip install numpy==1.24.0

# Install minimum version
pip install "numpy>=1.20"

# Install multiple packages
pip install numpy pandas matplotlib seaborn
```

### Requirements File

```bash
# Create requirements.txt
pip freeze > requirements.txt

# Install from requirements.txt
pip install -r requirements.txt
```

#### Sample requirements.txt

```text
numpy==1.24.3
pandas==2.0.3
matplotlib==3.7.2
seaborn==0.12.2
scikit-learn==1.3.0
jupyter==1.0.0
ipykernel==6.25.0
```

### Upgrading Packages

```bash
# Upgrade a specific package
pip install --upgrade numpy

# Upgrade pip itself
python -m pip install --upgrade pip

# Upgrade all packages (careful!)
pip list --outdated
pip install --upgrade package_name
```

---

## 🗑️ Deactivating Virtual Environments

```bash
# Deactivate current environment
deactivate

# Your prompt returns to normal
user@machine:~/project$
```

---

## 🛠️ Advanced venv Options

### Creation Options

```bash
# Create without pip (manual pip installation later)
python -m venv venv --without-pip

# Don't upgrade pip/setuptools
python -m venv venv --without-pip

# Use system site-packages (not recommended)
python -m venv venv --system-site-packages

# Clear existing environment and recreate
python -m venv venv --clear

# Create with upgraded pip
python -m venv venv --upgrade-deps
```

### Copying vs Symlinking

```bash
# Copy Python binary instead of symlinking (safer for moving env)
python -m venv venv --copies
```

**When to use `--copies`:**
- Moving environment to different machine
- System Python might be upgraded
- Sharing environment via version control (not recommended generally)

---

## 📂 Project Structure Best Practices

### Recommended Project Layout

```
my-ml-project/
├── venv/                   # Virtual environment (don't commit!)
├── data/                   # Data files
│   ├── raw/
│   └── processed/
├── notebooks/              # Jupyter notebooks
├── src/                    # Source code
│   ├── __init__.py
│   ├── data_processing.py
│   ├── models.py
│   └── utils.py
├── tests/                  # Unit tests
├── .gitignore             # Ignore venv, data, etc.
├── requirements.txt       # Dependencies
├── README.md              # Project documentation
└── setup.py               # Package configuration (optional)
```

### .gitignore for venv

```gitignore
# Virtual Environment
venv/
env/
ENV/
venv.bak/

# If you use different names
myenv/
project-env/

# Python
__pycache__/
*.py[cod]
*$py.class
*.so

# Jupyter
.ipynb_checkpoints/

# IDEs
.vscode/
.idea/
*.swp

# Data (if large)
data/raw/
data/processed/
*.csv
*.h5
*.pkl
```

---

## 🔄 Multiple Python Versions

### Using Different Python Versions

```bash
# Check available Python versions
python --version
python3 --version
python3.10 --version
python3.11 --version

# Create environments with specific versions
python3.10 -m venv venv310
python3.11 -m venv venv311

# Activate specific version environment
source venv310/bin/activate  # Python 3.10
deactivate
source venv311/bin/activate  # Python 3.11
```

### Windows Python Launcher

```bash
# List installed Python versions
py --list

# Create with specific version
py -3.10 -m venv venv310
py -3.11 -m venv venv311

# Run script with specific version
py -3.10 script.py
```

---

## 🧪 Testing Your Environment

### Environment Test Script

```python
# test_env.py
import sys
import os

def test_environment():
    """Test virtual environment setup"""
    
    print("=" * 50)
    print("VIRTUAL ENVIRONMENT TEST")
    print("=" * 50)
    
    # Python version
    print(f"\n📍 Python Version: {sys.version}")
    print(f"   Python Executable: {sys.executable}")
    
    # Virtual environment check
    in_venv = hasattr(sys, 'real_prefix') or (
        hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix
    )
    print(f"\n🌐 In Virtual Environment: {in_venv}")
    print(f"   sys.prefix: {sys.prefix}")
    
    if in_venv:
        print(f"   Base prefix: {sys.base_prefix}")
    
    # Site packages
    import site
    print(f"\n📦 Site Packages:")
    for path in site.getsitepackages():
        print(f"   - {path}")
    
    # Installed packages
    import pkg_resources
    installed = [pkg.key for pkg in pkg_resources.working_set]
    print(f"\n📚 Installed Packages ({len(installed)}):")
    for pkg in sorted(installed)[:10]:  # Show first 10
        print(f"   - {pkg}")
    if len(installed) > 10:
        print(f"   ... and {len(installed) - 10} more")
    
    # Environment variables
    print(f"\n🔧 VIRTUAL_ENV: {os.environ.get('VIRTUAL_ENV', 'Not set')}")
    print(f"   PATH (first entry): {os.environ['PATH'].split(os.pathsep)[0]}")
    
    print("\n" + "=" * 50)

if __name__ == "__main__":
    test_environment()
```

**Usage:**
```bash
# Activate environment
source venv/bin/activate

# Run test
python test_env.py
```

---

## 🐛 Troubleshooting

### Issue 1: "python: command not found"

**Solution:**
```bash
# Use python3 instead
python3 -m venv venv

# Or add Python to PATH
# Windows: Add Python installation directory to PATH
# Linux/Mac: Usually already in PATH
```

### Issue 2: pip not available

**Solution:**
```bash
# Ensure pip is installed
python -m ensurepip

# Upgrade pip
python -m pip install --upgrade pip

# Manual pip installation
wget https://bootstrap.pypa.io/get-pip.py
python get-pip.py
```

### Issue 3: Activation script not found

**Solution:**
```bash
# Recreate the environment
rm -rf venv  # Unix/Mac
rmdir /s venv  # Windows

python -m venv venv

# Check the Scripts/bin directory exists
ls venv/bin/  # Unix/Mac
dir venv\Scripts\  # Windows
```

### Issue 4: Import error after activation

**Solution:**
```bash
# Make sure you're using the venv Python
which python  # Unix/Mac
where python  # Windows

# Reinstall the package
pip install --force-reinstall package_name

# Check installation location
pip show package_name
```

### Issue 5: Environment activation doesn't change prompt

**Solution:**
```bash
# Check if activation worked
python -c "import sys; print(sys.prefix)"

# Should show venv directory

# Manually set prompt (optional)
export PS1="(venv) $PS1"  # Unix/Mac
```

---

## 🎯 Real-World Examples

### Example 1: Machine Learning Project

```bash
# Create project directory
mkdir ml-classification
cd ml-classification

# Create virtual environment
python -m venv venv

# Activate
source venv/bin/activate  # Unix/Mac
venv\Scripts\activate     # Windows

# Install ML packages
pip install numpy pandas scikit-learn matplotlib seaborn jupyter

# Save requirements
pip freeze > requirements.txt

# Start Jupyter
jupyter notebook
```

### Example 2: Deep Learning Project

```bash
mkdir deep-learning-project
cd deep-learning-project

python -m venv venv
source venv/bin/activate

# Install TensorFlow
pip install tensorflow numpy pandas matplotlib

# Verify installation
python -c "import tensorflow as tf; print(tf.__version__)"

pip freeze > requirements.txt
```

### Example 3: Multiple Projects

```bash
# Project A - Data Analysis
mkdir project-a
cd project-a
python -m venv venv-a
source venv-a/bin/activate
pip install pandas numpy matplotlib jupyter
deactivate

# Project B - Web Scraping
cd ..
mkdir project-b
cd project-b
python -m venv venv-b
source venv-b/bin/activate
pip install requests beautifulsoup4 selenium
deactivate
```

---

## 🔄 Migrating Environments

### Exporting Environment

```bash
# Activate source environment
source venv/bin/activate

# Export requirements
pip freeze > requirements.txt

# For reproducibility, include Python version
echo "# Python $(python --version)" > requirements.txt
pip freeze >> requirements.txt
```

### Recreating Environment

```bash
# On new machine or for new project
python -m venv new-venv
source new-venv/bin/activate

# Install from requirements
pip install -r requirements.txt

# Verify
pip list
```

---

## 🧹 Cleaning Up

### Removing Virtual Environment

```bash
# Deactivate first
deactivate

# Remove directory
rm -rf venv  # Unix/Mac
rmdir /s /q venv  # Windows

# Or use Python
python -c "import shutil; shutil.rmtree('venv')"
```

### Finding Old Environments

```bash
# Find all venv directories
find ~ -type d -name "venv" 2>/dev/null  # Unix/Mac

# List with sizes
find ~ -type d -name "venv" -exec du -sh {} \; 2>/dev/null
```

---

## 📊 Comparison: venv vs Others

| Feature | venv | virtualenv | conda |
|---------|------|------------|-------|
| Built-in | ✅ Yes (Python 3.3+) | ❌ Separate install | ❌ Separate install |
| Speed | ⚡ Fast | ⚡ Fast | 🐢 Slower |
| Python versions | ⚠️ Uses system Python | ✅ Can install Python | ✅ Can install Python |
| Non-Python deps | ❌ No | ❌ No | ✅ Yes |
| Disk space | 💾 Minimal (~10-20 MB) | 💾 Minimal | 💾 Large (~1-5 GB) |
| Learning curve | 📈 Easy | 📈 Easy | 📊 Moderate |
| Best for | Simple Python projects | Legacy Python 2 | Data science, complex deps |

---

## ✅ Best Practices

### 1. Always Use Virtual Environments

```bash
# ❌ Bad - Installing globally
pip install numpy

# ✅ Good - Installing in venv
python -m venv venv
source venv/bin/activate
pip install numpy
```

### 2. One Environment Per Project

```bash
project-a/
├── venv/  # Project A dependencies
└── ...

project-b/
├── venv/  # Project B dependencies
└── ...
```

### 3. Never Commit venv to Git

```gitignore
# Always in .gitignore
venv/
*.pyc
__pycache__/
```

### 4. Document Dependencies

```bash
# Update requirements.txt when adding packages
pip install new-package
pip freeze > requirements.txt
```

### 5. Use Descriptive Names (Optional)

```bash
# Default
python -m venv venv

# Descriptive (if managing multiple)
python -m venv venv-django
python -m venv venv-flask
python -m venv venv-ml
```

### 6. Regularly Update Packages

```bash
# Check outdated packages
pip list --outdated

# Update specific package
pip install --upgrade package_name

# Update requirements.txt
pip freeze > requirements.txt
```

---

## 🎓 Exercises

### Exercise 1: Basic Setup
Create a virtual environment, install pandas and numpy, and create a requirements file.

**Solution:**
```bash
python -m venv exercise1-env
source exercise1-env/bin/activate
pip install pandas numpy
pip freeze > requirements.txt
cat requirements.txt
deactivate
```

### Exercise 2: Multiple Environments
Create two separate environments with different package versions.

**Solution:**
```bash
# Environment 1 - Old version
python -m venv env1
source env1/bin/activate
pip install numpy==1.20.0
python -c "import numpy; print(numpy.__version__)"
deactivate

# Environment 2 - New version
python -m venv env2
source env2/bin/activate
pip install numpy==1.24.0
python -c "import numpy; print(numpy.__version__)"
deactivate
```

### Exercise 3: Environment Migration
Export environment from one directory and recreate in another.

**Solution:**
```bash
# Source environment
cd source_project
source venv/bin/activate
pip freeze > requirements.txt
deactivate

# New environment
cd ../target_project
python -m venv venv
source venv/bin/activate
pip install -r ../source_project/requirements.txt
pip list
```

### Exercise 4: Debugging
Practice troubleshooting a broken environment.

**Solution:**
```bash
# Create environment
python -m venv test-env
source test-env/bin/activate

# Verify it's active
which python
python -c "import sys; print(sys.prefix)"

# If issues, recreate
deactivate
rm -rf test-env
python -m venv test-env
source test-env/bin/activate
```

---

## 📚 Additional Resources

### Official Documentation
- [Python venv documentation](https://docs.python.org/3/library/venv.html)
- [pip User Guide](https://pip.pypa.io/en/stable/user_guide/)

### Tutorials
- [Real Python - Virtual Environments Primer](https://realpython.com/python-virtual-environments-a-primer/)
- [Python Virtual Environments: A Complete Guide](https://www.datacamp.com/tutorial/python-virtual-environments)

### Tools
- [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/) - Enhanced venv management
- [direnv](https://direnv.net/) - Automatic environment activation

---

## 🎯 Key Takeaways

1. ✅ **venv is built-in** - No installation needed for Python 3.3+
2. ✅ **One per project** - Isolate dependencies
3. ✅ **Don't commit** - Add to .gitignore
4. ✅ **requirements.txt** - Document dependencies
5. ✅ **Activate before use** - Always activate before installing/running
6. ✅ **Simple and sufficient** - Perfect for most Python projects

---

## 🔗 Navigation

- **Up**: [3.2 Virtual Environments Overview](./README.md)
- **Next**: [02 - Conda Environments](./02-Conda-Environments.md)

---

**Remember:** Virtual environments are essential for Python development. They prevent conflicts, ensure reproducibility, and make project management much easier!
