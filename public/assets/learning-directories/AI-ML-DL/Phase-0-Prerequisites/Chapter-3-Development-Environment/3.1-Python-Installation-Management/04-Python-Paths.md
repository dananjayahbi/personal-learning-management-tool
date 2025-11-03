# Understanding Python Paths

## 📋 Table of Contents
- [Introduction](#introduction)
- [sys.path](#syspath)
- [Module Discovery](#module-discovery)
- [site-packages Directory](#site-packages-directory)
- [PYTHONPATH Environment Variable](#pythonpath-environment-variable)
- [Customizing Module Locations](#customizing-module-locations)
- [Common Path Issues](#common-path-issues)
- [Practice Exercises](#practice-exercises)

---

## Introduction

Understanding how Python finds and imports modules is crucial for troubleshooting import errors and organizing your code effectively.

### The Import Process

```python
import numpy  # How does Python find numpy?

# Python searches through sys.path in order:
# 1. Current directory
# 2. PYTHONPATH directories
# 3. Standard library
# 4. site-packages (third-party packages)
```

---

## sys.path

### What is sys.path?

`sys.path` is a list of directories where Python looks for modules.

```python
import sys

print("Python searches for modules in these directories:")
for i, path in enumerate(sys.path, 1):
    print(f"{i}. {path}")

# Example output:
# 1. /Users/user/my_project          # Current directory
# 2. /Users/user/.pyenv/versions/3.11.2/lib/python3.11
# 3. /Users/user/.pyenv/versions/3.11.2/lib/python3.11/lib-dynload
# 4. /Users/user/.pyenv/versions/3.11.2/lib/python3.11/site-packages
```

### Modifying sys.path

```python
import sys

# Add directory temporarily (for current session)
sys.path.append('/path/to/my/modules')

# Add at the beginning (higher priority)
sys.path.insert(0, '/path/to/my/modules')

# Now you can import from that directory
import my_module
```

### Permanent Path Modification

Create a `.pth` file in site-packages:

```bash
# Find site-packages location
python -m site

# Create .pth file
echo "/path/to/my/modules" > $(python -m site --user-site)/mymodules.pth
```

---

## Module Discovery

### Import Search Order

```python
# When you run: import mymodule

# Python searches in this order:
# 1. Built-in modules (sys, os, etc.)
# 2. Current directory
# 3. Directories in PYTHONPATH
# 4. Installation-dependent defaults (site-packages)
```

### Finding Module Location

```python
import numpy
import sys
import os

# Method 1: __file__ attribute
print(f"NumPy location: {numpy.__file__}")
# Output: /usr/local/lib/python3.11/site-packages/numpy/__init__.py

# Method 2: Using inspect
import inspect
print(f"NumPy file: {inspect.getfile(numpy)}")

# Method 3: Show module's directory
print(f"NumPy directory: {os.path.dirname(numpy.__file__)}")
```

---

## site-packages Directory

### What is site-packages?

`site-packages` is where pip installs third-party packages.

```python
import site

# Show site-packages locations
print("site-packages directories:")
for path in site.getsitepackages():
    print(f"  - {path}")

# User site-packages (for --user installs)
print(f"\nUser site-packages: {site.getusersitepackages()}")
```

### Multiple site-packages

```bash
# Global site-packages
/usr/local/lib/python3.11/site-packages

# User site-packages (--user installs)
~/.local/lib/python3.11/site-packages

# Virtual environment site-packages
~/myenv/lib/python3.11/site-packages
```

---

## PYTHONPATH Environment Variable

### What is PYTHONPATH?

`PYTHONPATH` is an environment variable that adds directories to `sys.path`.

### Setting PYTHONPATH

**Linux/macOS (bash/zsh):**
```bash
# Temporary (current session)
export PYTHONPATH="/path/to/modules:$PYTHONPATH"

# Permanent (add to ~/.bashrc or ~/.zshrc)
echo 'export PYTHONPATH="/path/to/modules:$PYTHONPATH"' >> ~/.bashrc
source ~/.bashrc
```

**Windows (CMD):**
```cmd
# Temporary
set PYTHONPATH=C:\path\to\modules;%PYTHONPATH%

# Permanent (System Properties > Environment Variables)
setx PYTHONPATH "C:\path\to\modules;%PYTHONPATH%"
```

**Windows (PowerShell):**
```powershell
# Temporary
$env:PYTHONPATH = "C:\path\to\modules;$env:PYTHONPATH"

# Permanent
[Environment]::SetEnvironmentVariable("PYTHONPATH", "C:\path\to\modules", "User")
```

### Checking PYTHONPATH

```python
import os
import sys

pythonpath = os.environ.get('PYTHONPATH', 'Not set')
print(f"PYTHONPATH: {pythonpath}")

print("\nDirectories in sys.path from PYTHONPATH:")
for path in sys.path:
    if pythonpath != 'Not set' and path in pythonpath:
        print(f"  - {path}")
```

---

## Customizing Module Locations

### Method 1: Project Structure

```
my_project/
├── src/
│   ├── __init__.py
│   ├── module1.py
│   └── module2.py
├── tests/
│   ├── test_module1.py
│   └── test_module2.py
└── main.py

# In main.py
import sys
sys.path.insert(0, 'src')
from module1 import function1
```

### Method 2: Editable Install

```bash
# Make your package importable everywhere
pip install -e .

# Requires setup.py:
# from setuptools import setup, find_packages
# setup(name='mypackage', packages=find_packages())
```

### Method 3: Using \_\_init\_\_.py

```python
# project/__init__.py
import sys
from pathlib import Path

# Add parent directory to path
parent_dir = Path(__file__).parent.parent
sys.path.insert(0, str(parent_dir))
```

---

## Common Path Issues

### Issue 1: ModuleNotFoundError

```python
# Error: ModuleNotFoundError: No module named 'mymodule'

# Solution 1: Check sys.path
import sys
print(sys.path)
# Is the module's directory in sys.path?

# Solution 2: Add to sys.path
sys.path.append('/path/to/mymodule')

# Solution 3: Set PYTHONPATH
# export PYTHONPATH=/path/to/mymodule:$PYTHONPATH
```

### Issue 2: Wrong Module Imported

```python
# You have multiple modules with same name

import mymodule
print(mymodule.__file__)
# Shows which one is actually imported

# Solution: Check sys.path order
# First match wins!
```

### Issue 3: Relative vs Absolute Imports

```python
# Relative import (within package)
from . import sibling_module
from .. import parent_module

# Absolute import (from sys.path)
from package.module import function

# Use absolute imports for clarity!
```

---

## Practice Exercises

### Exercise 1: Path Investigation

```python
# Create a script to investigate Python paths

import sys
import os
import site

def investigate_python_paths():
    """Display comprehensive path information"""
    
    print("=" * 60)
    print("PYTHON PATH INVESTIGATION")
    print("=" * 60)
    
    # 1. sys.path
    print("\n1. sys.path directories:")
    for i, path in enumerate(sys.path, 1):
        exists = "✓" if os.path.exists(path) else "✗"
        print(f"   {i}. {exists} {path}")
    
    # 2. PYTHONPATH
    pythonpath = os.environ.get('PYTHONPATH', 'Not set')
    print(f"\n2. PYTHONPATH: {pythonpath}")
    
    # 3. site-packages
    print("\n3. site-packages:")
    for path in site.getsitepackages():
        print(f"   - {path}")
    print(f"   User: {site.getusersitepackages()}")
    
    # 4. Python executable
    print(f"\n4. Python executable: {sys.executable}")
    print(f"   Prefix: {sys.prefix}")
    print(f"   Base prefix: {sys.base_prefix}")

investigate_python_paths()
```

### Exercise 2: Module Locator

```python
# Create a tool to find where a module is installed

def locate_module(module_name):
    """Find the location of an installed module"""
    try:
        module = __import__(module_name)
        if hasattr(module, '__file__'):
            print(f"✓ {module_name} found at: {module.__file__}")
        else:
            print(f"✓ {module_name} is a built-in module")
    except ImportError:
        print(f"✗ {module_name} is not installed")

# Test
modules = ['numpy', 'pandas', 'sys', 'os', 'tensorflow']
for mod in modules:
    locate_module(mod)
```

### Exercise 3: Path Manipulation

```python
# Experiment with path manipulation

import sys
original_path = sys.path.copy()

print("Original sys.path length:", len(sys.path))

# Add custom directory
sys.path.append('/custom/path')
print("After append:", len(sys.path))

# Insert at beginning
sys.path.insert(0, '/high/priority/path')
print("After insert:", len(sys.path))

# Remove custom paths
sys.path = original_path
print("After restore:", len(sys.path))
```

---

## Summary

### Key Concepts

1. **sys.path**: List of directories Python searches for modules
2. **site-packages**: Where third-party packages are installed
3. **PYTHONPATH**: Environment variable to add custom directories
4. **Import Order**: Built-ins → Current directory → PYTHONPATH → site-packages

### Quick Reference

```python
import sys
import site
import os

# View search path
sys.path

# Add to path temporarily
sys.path.append('/path')

# Find module location
import numpy
numpy.__file__

# View site-packages
site.getsitepackages()

# Check PYTHONPATH
os.environ.get('PYTHONPATH')
```

---

**Next:** [05-Package-Managers.md](./05-Package-Managers.md) - Understanding pip and conda!
