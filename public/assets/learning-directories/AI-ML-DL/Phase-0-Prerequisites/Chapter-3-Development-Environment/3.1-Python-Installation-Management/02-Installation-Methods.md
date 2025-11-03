# Installation Methods

## 📋 Table of Contents
- [Introduction](#introduction)
- [Windows Installation](#windows-installation)
- [macOS Installation](#macos-installation)
- [Linux Installation](#linux-installation)
- [Verification and Testing](#verification-and-testing)
- [Post-Installation Setup](#post-installation-setup)
- [Troubleshooting](#troubleshooting)
- [Practice Exercises](#practice-exercises)

---

## Introduction

Installing Python correctly is crucial for a smooth development experience. This guide covers installation methods for all major operating systems.

---

## Windows Installation

### Method 1: Official Python Installer (Recommended for General Use)

#### Step-by-Step Installation

1. **Download the Installer**
   - Visit [python.org/downloads](https://www.python.org/downloads/)
   - Click "Download Python 3.11.x"
   - Choose Windows installer (64-bit recommended)

2. **Run the Installer**
   ```
   ⚠️ IMPORTANT: Check "Add Python to PATH"!
   ```

3. **Installation Options**
   - **Install Now** (Recommended)
     - Installs to: `C:\Users\<username>\AppData\Local\Programs\Python\Python311`
     - Includes pip, IDLE, documentation
   
   - **Customize Installation** (Advanced)
     - Choose install location
     - Select optional features
     - Install for all users

4. **Click "Disable path length limit"** (if prompted)

#### Verification

```cmd
# Open Command Prompt (cmd) or PowerShell

# Check Python version
python --version
# Output: Python 3.11.2

# Check pip version
pip --version
# Output: pip 23.0.1 from C:\Users\...\site-packages\pip (python 3.11)

# Test Python interactive shell
python
>>> print("Hello, Python!")
Hello, Python!
>>> exit()
```

#### Installation Locations

```
Default Install Location:
C:\Users\<username>\AppData\Local\Programs\Python\Python311\
├── python.exe          # Python interpreter
├── pip.exe             # Package installer
├── Lib\                # Standard library
├── Scripts\            # Executable scripts
└── DLLs\               # Dynamic link libraries

All Users Install:
C:\Program Files\Python311\
```

### Method 2: Anaconda on Windows

#### Step-by-Step Installation

1. **Download Anaconda**
   - Visit [anaconda.com/products/distribution](https://www.anaconda.com/products/distribution)
   - Download Windows installer (500MB-3GB)

2. **Run the Installer**
   - Choose "Just Me" (recommended) or "All Users"
   - Select installation location (needs 5GB space)
   - ⚠️ **Uncheck "Add Anaconda to PATH"** (use Anaconda Prompt instead)
   - Check "Register Anaconda as system Python" (optional)

3. **Complete Installation**
   - Installation takes 10-20 minutes
   - Creates Start Menu shortcuts

#### Verification

```cmd
# Open "Anaconda Prompt" from Start Menu

# Check conda version
conda --version
# Output: conda 23.1.0

# Check Python version
python --version
# Output: Python 3.11.0

# List pre-installed packages
conda list
# Output: ~250 packages including numpy, pandas, matplotlib
```

### Method 3: Miniconda on Windows

#### Installation

1. **Download Miniconda**
   - Visit [docs.conda.io/en/latest/miniconda.html](https://docs.conda.io/en/latest/miniconda.html)
   - Download Windows installer (50MB)

2. **Install** (similar to Anaconda)
   - Choose "Just Me"
   - Select location
   - Complete installation

3. **Use Anaconda Prompt** for conda commands

### Method 4: Windows Store (Simple but Limited)

```
1. Open Microsoft Store
2. Search "Python 3.11"
3. Click "Get"
4. Automatically added to PATH
5. Access via 'python3' command
```

**Limitations:**
- Limited access to some directories
- May have permission issues
- Not recommended for serious development

### Method 5: Chocolatey (Package Manager)

```powershell
# First, install Chocolatey (run PowerShell as Administrator)
# See: https://chocolatey.org/install

# Install Python
choco install python

# Install Anaconda
choco install anaconda3

# Verify
python --version
```

### PATH Configuration on Windows

#### Viewing PATH

```cmd
# CMD
echo %PATH%

# PowerShell
$env:Path -split ';'
```

#### Adding Python to PATH Manually

1. **System Properties**
   - Right-click "This PC" → Properties
   - Advanced System Settings
   - Environment Variables

2. **Edit PATH**
   - System Variables → Path → Edit
   - Add: `C:\Users\<username>\AppData\Local\Programs\Python\Python311`
   - Add: `C:\Users\<username>\AppData\Local\Programs\Python\Python311\Scripts`

3. **Verify**
   - Open new Command Prompt
   - Run `python --version`

#### PowerShell Script to Add to PATH

```powershell
# Add Python to User PATH (run in PowerShell)
$pythonPath = "C:\Users\$env:USERNAME\AppData\Local\Programs\Python\Python311"
$scriptsPath = "$pythonPath\Scripts"

$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
$newPath = "$currentPath;$pythonPath;$scriptsPath"

[Environment]::SetEnvironmentVariable("Path", $newPath, "User")

Write-Host "Python added to PATH. Restart PowerShell to apply changes."
```

---

## macOS Installation

### Method 1: Official Python Installer (Recommended)

#### Step-by-Step Installation

1. **Download the Installer**
   - Visit [python.org/downloads/mac-osx](https://www.python.org/downloads/mac-osx/)
   - Download macOS installer (64-bit universal2)

2. **Run the Installer**
   - Open .pkg file
   - Follow installation wizard
   - Installs to: `/Library/Frameworks/Python.framework/Versions/3.11`
   - Creates symlinks in `/usr/local/bin`

3. **Verify Installation**

```bash
# Check version (note: python3, not python)
python3 --version
# Output: Python 3.11.2

# Check pip
pip3 --version
# Output: pip 23.0.1

# Test Python
python3
>>> print("Hello, Python!")
Hello, Python!
>>> exit()
```

#### Important Notes for macOS

⚠️ **macOS comes with Python 2.7 pre-installed (system Python)**
- Located at: `/usr/bin/python`
- **DO NOT modify or remove!**
- Use `python3` for your installed version

### Method 2: Homebrew (Popular Among Developers)

[Homebrew](https://brew.sh/) is a package manager for macOS.

#### Installation

```bash
# 1. Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install Python
brew install python@3.11

# 3. Verify
python3 --version
pip3 --version

# 4. Create alias (optional, add to ~/.zshrc or ~/.bash_profile)
echo 'alias python=python3' >> ~/.zshrc
echo 'alias pip=pip3' >> ~/.zshrc
source ~/.zshrc
```

#### Homebrew Python Location

```
/opt/homebrew/bin/python3           # Apple Silicon (M1/M2)
/usr/local/bin/python3              # Intel Mac
```

### Method 3: Anaconda on macOS

#### Installation

```bash
# 1. Download from anaconda.com
# Choose: Anaconda3-<version>-MacOSX-x86_64.sh (Intel)
#     or: Anaconda3-<version>-MacOSX-arm64.sh (Apple Silicon)

# 2. Install via terminal
bash Anaconda3-<version>-MacOSX-*.sh

# 3. Follow prompts
# - Accept license
# - Confirm location (default: ~/anaconda3)
# - Initialize Anaconda (yes)

# 4. Restart terminal

# 5. Verify
conda --version
python --version
```

### Method 4: Miniconda on macOS

```bash
# 1. Download Miniconda installer
curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh

# 2. Install
bash Miniconda3-latest-MacOSX-*.sh

# 3. Verify
conda --version
```

### Method 5: pyenv (Version Management)

`pyenv` allows multiple Python versions on macOS.

```bash
# 1. Install pyenv
brew install pyenv

# 2. Add to shell configuration (~/.zshrc or ~/.bash_profile)
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc

# 3. Restart terminal

# 4. Install Python versions
pyenv install 3.11.2
pyenv install 3.10.9

# 5. Set global version
pyenv global 3.11.2

# 6. Verify
python --version
# Output: Python 3.11.2
```

### macOS: Which Python Am I Using?

```bash
# Check which Python executable
which python3
# Output: /usr/local/bin/python3 (Homebrew)
#     or: /Library/Frameworks/Python.framework/... (Official installer)
#     or: /Users/<user>/anaconda3/bin/python (Anaconda)

# Check all Python installations
ls -la /usr/bin/python*              # System Python
ls -la /usr/local/bin/python*        # Homebrew/Official
ls -la ~/anaconda3/bin/python*       # Anaconda
ls -la ~/.pyenv/versions/            # pyenv versions
```

---

## Linux Installation

### Method 1: System Package Manager (Easiest)

#### Ubuntu/Debian

```bash
# Update package list
sudo apt update

# Install Python 3.11
sudo apt install python3.11

# Install pip
sudo apt install python3-pip

# Install venv module
sudo apt install python3.11-venv

# Verify
python3.11 --version
pip3 --version
```

#### Fedora/RHEL/CentOS

```bash
# Install Python 3.11
sudo dnf install python3.11

# Install pip
sudo dnf install python3-pip

# Verify
python3.11 --version
```

#### Arch Linux

```bash
# Install Python
sudo pacman -S python

# Verify
python --version
```

### Method 2: deadsnakes PPA (Ubuntu - Latest Python)

Ubuntu's default repositories may not have the latest Python version.

```bash
# Add deadsnakes PPA
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update

# Install specific Python version
sudo apt install python3.11
sudo apt install python3.11-venv
sudo apt install python3.11-dev

# Verify
python3.11 --version
```

### Method 3: Compiling from Source (Advanced)

For the latest version or custom build.

```bash
# 1. Install dependencies
sudo apt-get install build-essential checkinstall
sudo apt-get install libreadline-dev libncursesw5-dev libssl-dev \
    libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev libffi-dev zlib1g-dev

# 2. Download source
cd /opt
sudo wget https://www.python.org/ftp/python/3.11.2/Python-3.11.2.tgz

# 3. Extract
sudo tar xzf Python-3.11.2.tgz
cd Python-3.11.2

# 4. Configure
sudo ./configure --enable-optimizations

# 5. Build (uses all CPU cores)
sudo make -j $(nproc)

# 6. Install
sudo make altinstall  # altinstall prevents replacing system python3

# 7. Verify
python3.11 --version
```

### Method 4: Anaconda on Linux

```bash
# 1. Download installer
wget https://repo.anaconda.com/archive/Anaconda3-<version>-Linux-x86_64.sh

# 2. Make executable
chmod +x Anaconda3-*-Linux-x86_64.sh

# 3. Run installer
./Anaconda3-*-Linux-x86_64.sh

# 4. Follow prompts
# - Accept license
# - Confirm location (default: ~/anaconda3)
# - Initialize conda (yes)

# 5. Restart terminal

# 6. Verify
conda --version
python --version
```

### Method 5: pyenv on Linux

```bash
# 1. Install dependencies
sudo apt-get update
sudo apt-get install make build-essential libssl-dev zlib1g-dev \
libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm \
libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev

# 2. Install pyenv
curl https://pyenv.run | bash

# 3. Add to ~/.bashrc
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc

# 4. Restart shell
exec $SHELL

# 5. Install Python versions
pyenv install 3.11.2

# 6. Set global version
pyenv global 3.11.2

# 7. Verify
python --version
```

### Managing Multiple Python Versions on Linux

```bash
# List installed Python versions
ls /usr/bin/python*

# Output might show:
# /usr/bin/python3.9
# /usr/bin/python3.10
# /usr/bin/python3.11

# Use update-alternatives to manage default
sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.11 1
sudo update-alternatives --config python3

# Select your preferred version
```

---

## Verification and Testing

### Complete Verification Script

Save as `verify_python.py`:

```python
#!/usr/bin/env python3
"""
Comprehensive Python installation verification script
"""

import sys
import platform
import subprocess
from pathlib import Path

def print_section(title):
    print("\n" + "=" * 60)
    print(f"  {title}")
    print("=" * 60)

def check_python_version():
    print_section("PYTHON VERSION")
    print(f"Version: {sys.version}")
    print(f"Version Info: {sys.version_info}")
    print(f"Implementation: {sys.implementation.name}")
    print(f"Compiler: {platform.python_compiler()}")

def check_executable():
    print_section("PYTHON EXECUTABLE")
    print(f"Executable: {sys.executable}")
    print(f"Prefix: {sys.prefix}")
    print(f"Base Prefix: {sys.base_prefix}")
    
    executable_path = Path(sys.executable)
    print(f"Exists: {executable_path.exists()}")
    print(f"Size: {executable_path.stat().st_size / 1024 / 1024:.2f} MB")

def check_pip():
    print_section("PIP INSTALLATION")
    try:
        result = subprocess.run(
            [sys.executable, "-m", "pip", "--version"],
            capture_output=True,
            text=True,
            timeout=5
        )
        print(f"pip: {result.stdout.strip()}")
    except Exception as e:
        print(f"pip: NOT INSTALLED or ERROR - {e}")

def check_standard_library():
    print_section("STANDARD LIBRARY MODULES")
    modules = [
        'os', 'sys', 'math', 'random', 'datetime',
        'json', 'sqlite3', 'urllib', 'pathlib'
    ]
    
    for module in modules:
        try:
            __import__(module)
            print(f"✓ {module}")
        except ImportError:
            print(f"✗ {module} - MISSING!")

def check_paths():
    print_section("PYTHON PATH")
    for i, path in enumerate(sys.path, 1):
        print(f"{i}. {path}")

def check_environment():
    print_section("ENVIRONMENT")
    import os
    
    env_vars = [
        'PYTHONPATH', 'PYTHONHOME', 'VIRTUAL_ENV',
        'CONDA_DEFAULT_ENV', 'CONDA_PREFIX'
    ]
    
    for var in env_vars:
        value = os.environ.get(var, 'Not set')
        print(f"{var}: {value}")

def check_platform():
    print_section("PLATFORM INFORMATION")
    print(f"System: {platform.system()}")
    print(f"Release: {platform.release()}")
    print(f"Version: {platform.version()}")
    print(f"Machine: {platform.machine()}")
    print(f"Processor: {platform.processor()}")

def run_simple_tests():
    print_section("BASIC FUNCTIONALITY TESTS")
    
    # Test 1: Basic arithmetic
    try:
        result = 2 + 2
        print(f"✓ Arithmetic: 2 + 2 = {result}")
    except:
        print("✗ Arithmetic: FAILED")
    
    # Test 2: List comprehension
    try:
        squares = [x**2 for x in range(5)]
        print(f"✓ List comprehension: {squares}")
    except:
        print("✗ List comprehension: FAILED")
    
    # Test 3: File I/O
    try:
        test_file = Path("test_temp.txt")
        test_file.write_text("Hello, Python!")
        content = test_file.read_text()
        test_file.unlink()
        print(f"✓ File I/O: {content}")
    except Exception as e:
        print(f"✗ File I/O: FAILED - {e}")

def main():
    print("\n" + "╔" + "═" * 58 + "╗")
    print("║" + " " * 10 + "PYTHON INSTALLATION VERIFICATION" + " " * 15 + "║")
    print("╚" + "═" * 58 + "╝")
    
    check_python_version()
    check_executable()
    check_pip()
    check_standard_library()
    check_paths()
    check_environment()
    check_platform()
    run_simple_tests()
    
    print("\n" + "=" * 60)
    print("  VERIFICATION COMPLETE")
    print("=" * 60 + "\n")

if __name__ == "__main__":
    main()
```

Run it:

```bash
python verify_python.py
# or
python3 verify_python.py
```

---

## Post-Installation Setup

### Update pip

```bash
# Python
python -m pip install --upgrade pip

# Python3 (Linux/macOS)
python3 -m pip install --upgrade pip

# Verify
pip --version
```

### Install Essential Tools

```bash
# Upgrade pip
pip install --upgrade pip

# Install setuptools and wheel
pip install --upgrade setuptools wheel

# Install virtualenv
pip install virtualenv

# For data science
pip install numpy pandas matplotlib scipy scikit-learn jupyter
```

### Configure pip (Optional)

Create `~/.pip/pip.conf` (Linux/macOS) or `%APPDATA%\pip\pip.ini` (Windows):

```ini
[global]
timeout = 60
index-url = https://pypi.org/simple

[install]
trusted-host = pypi.org
               files.pythonhosted.org
```

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: "Python is not recognized" (Windows)

**Solution:**
```cmd
# Python not in PATH
# Add Python to PATH manually (see PATH Configuration section)
# Or reinstall and check "Add Python to PATH"
```

#### Issue 2: Permission Denied (Linux/macOS)

**Solution:**
```bash
# Don't use sudo with pip (creates ownership issues)
# Use virtual environments instead

# If you must install globally:
pip install --user package_name
```

#### Issue 3: SSL Certificate Error

**Solution:**
```bash
# Temporary workaround (not recommended for production)
pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org package_name

# Proper solution: Fix system certificates
# macOS: Install Certificates.command in Python folder
# Windows: Update certifi package
pip install --upgrade certifi
```

#### Issue 4: Multiple Python Versions Conflict

**Solution:**
```bash
# Use full path to specific Python
/usr/bin/python3.11 --version

# Or use python3.X explicitly
python3.11 --version

# Or use pyenv to manage versions
pyenv global 3.11.2
```

#### Issue 5: pip Not Found

**Solution:**
```bash
# Install pip
python -m ensurepip --upgrade

# Or download get-pip.py
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py
```

---

## Practice Exercises

### Exercise 1: Fresh Installation

1. Uninstall Python (if installed)
2. Download your chosen distribution
3. Install following the guide
4. Verify using the verification script
5. Document each step

### Exercise 2: Multiple Versions

1. Install Python 3.10
2. Install Python 3.11
3. Verify both are installed
4. Switch between them
5. Create script to use each

### Exercise 3: PATH Investigation

```python
# Create a script that:
# 1. Shows all Python installations
# 2. Displays current PATH
# 3. Identifies which Python is active
# 4. Tests pip availability

import sys
import os
import subprocess
from pathlib import Path

def find_python_installations():
    """
    Find all Python installations on the system
    """
    # TODO: Implement for your OS
    pass

def check_path():
    """
    Display PATH and identify Python locations
    """
    # TODO: Implement
    pass

def test_pip():
    """
    Test pip installation and version
    """
    # TODO: Implement
    pass
```

### Exercise 4: Reinstallation Practice

1. Take snapshot of your system (VM recommended)
2. Uninstall Python completely
3. Reinstall using different method
4. Compare experience
5. Restore snapshot or keep new installation

### Exercise 5: Cross-Platform Comparison

If you have access to multiple OSes:
1. Install Python on Windows, macOS, and Linux
2. Document differences
3. Create comparison table
4. Note platform-specific issues

---

## Summary

### Installation Method Quick Reference

| OS | Recommended Method | Alternative |
|----|-------------------|-------------|
| Windows | python.org installer | Anaconda, Chocolatey |
| macOS | Homebrew | python.org, Anaconda, pyenv |
| Linux | System package manager | pyenv, Anaconda, from source |

### Verification Checklist

- [ ] Python version correct
- [ ] pip installed and working
- [ ] Python in PATH
- [ ] Standard library accessible
- [ ] Can create and run scripts
- [ ] Virtual environments work
- [ ] No SSL errors
- [ ] Documentation accessible

---

**Next:** [03-Version-Management.md](./03-Version-Management.md) - Learn to manage multiple Python versions!
