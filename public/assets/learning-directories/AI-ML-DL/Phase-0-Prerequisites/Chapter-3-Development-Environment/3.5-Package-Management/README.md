# 3.5 Package Management

## 📋 Overview

Mastering package management is crucial for maintaining clean, reproducible Python environments. This section dives deep into pip, conda, and modern tools like Poetry, covering advanced techniques for dependency management.

**Duration:** 3-4 days

---

## 📚 Topics

1. [pip Fundamentals](./01-pip-Fundamentals.md)
   - Basic installation and uninstallation
   - Searching and listing packages
   - pip list and pip show
   - Understanding pip freeze
   - pip check for conflicts

2. [pip Advanced](./02-pip-Advanced.md)
   - Requirements files advanced features
   - Constraints files
   - pip-tools (pip-compile, pip-sync)
   - Editable installs (-e)
   - Installing from git/URLs
   - Wheels vs source distributions
   - Custom package indexes

3. [conda Package Manager](./03-Conda-Packages.md)
   - Conda install vs pip install
   - Channels and priorities
   - Creating conda packages
   - conda-build
   - Mixing conda and pip safely
   - Conda environments

4. [Poetry - Modern Dependency Management](./04-Poetry.md)
   - Installation and setup
   - pyproject.toml specification
   - Dependency groups
   - Lock files
   - Publishing packages
   - Virtual environment management
   - Poetry vs pip vs conda

5. [Installing ML Libraries](./05-Installing-ML-Libraries.md)
   - TensorFlow installation (CPU/GPU)
   - PyTorch installation (CPU/GPU/CUDA versions)
   - scikit-learn and scipy stack
   - Jupyter and related tools
   - Common installation issues
   - Platform-specific considerations

---

## 🎯 Learning Objectives

After completing this section, you will be able to:
- Master pip for package management
- Use advanced pip features (pip-tools, constraints)
- Understand conda package management
- Use Poetry for modern projects
- Install complex ML libraries correctly
- Troubleshoot dependency conflicts
- Create reproducible environments

---

## 🔑 Key Concepts

### Package vs Module
- **Module**: A single Python file
- **Package**: A directory with modules and `__init__.py`

### Distribution
The packaged version of software ready for installation (wheel, source distribution).

### Dependency Resolution
Finding compatible versions of all required packages.

### Lock Files
Exact versions of all dependencies for reproducibility.

---

## ⏱️ Time Allocation

| Topic | Estimated Time |
|-------|----------------|
| pip Fundamentals | 4-6 hours |
| pip Advanced | 6-8 hours |
| conda Packages | 4-6 hours |
| Poetry | 6-8 hours |
| Installing ML Libraries | 4-6 hours |
| **Total** | **3-4 days** |

---

## 📝 Exercises

Each topic file contains hands-on exercises. Total exercises: **15+**

**Key Projects:**
- Create complex dependency tree
- Build custom package
- Set up reproducible ML environment
- Troubleshoot dependency conflicts

---

## 💡 Quick Reference

### pip Commands

```bash
# Basic operations
pip install package_name              # Install
pip install package_name==1.2.3       # Specific version
pip install "package_name>=1.2,<2.0"  # Version range
pip uninstall package_name            # Uninstall
pip install --upgrade package_name    # Upgrade

# Information
pip list                              # List installed
pip list --outdated                   # Show outdated
pip show package_name                 # Show details
pip check                             # Check for conflicts

# Requirements
pip freeze > requirements.txt         # Export
pip install -r requirements.txt       # Install from file

# Advanced
pip install --user package_name       # User install
pip install -e .                      # Editable install
pip download package_name             # Download only
pip install --no-deps package_name    # Skip dependencies
```

### conda Commands

```bash
# Basic operations
conda install package_name            # Install
conda install package_name=1.2.3      # Specific version
conda remove package_name             # Uninstall
conda update package_name             # Update
conda update --all                    # Update all

# Channels
conda install -c conda-forge package  # From channel
conda config --add channels conda-forge  # Add channel
conda config --show channels          # Show channels

# Information
conda list                            # List installed
conda search package_name             # Search
conda info package_name               # Show info

# Environment export
conda env export > environment.yml    # Export
conda env create -f environment.yml   # Import
```

### Poetry Commands

```bash
# Project management
poetry init                           # Initialize project
poetry new project_name               # Create new project

# Dependencies
poetry add package_name               # Add dependency
poetry add --dev package_name         # Add dev dependency
poetry remove package_name            # Remove dependency
poetry update                         # Update dependencies

# Environment
poetry install                        # Install dependencies
poetry shell                          # Activate virtual env
poetry run python script.py           # Run in poetry env

# Publishing
poetry build                          # Build package
poetry publish                        # Publish to PyPI
```

---

## 🚀 Advanced pip Techniques

### pip-tools for Better Dependency Management

```bash
# Install pip-tools
pip install pip-tools

# Create requirements.in (high-level dependencies)
echo "flask\npandas\nscikit-learn" > requirements.in

# Compile to requirements.txt (with all sub-dependencies)
pip-compile requirements.txt

# Install exactly what's in requirements.txt
pip-sync requirements.txt

# Update dependencies
pip-compile --upgrade requirements.in
```

### Multiple Requirements Files

```
requirements/
├── base.txt              # Core dependencies
├── development.txt       # Dev tools (testing, linting)
├── production.txt        # Production extras
└── ci.txt                # CI/CD specific

# base.txt
numpy==1.24.0
pandas==1.5.3

# development.txt
-r base.txt              # Include base
pytest==7.2.0
black==23.1.0
flake8==6.0.0

# Install development dependencies
pip install -r requirements/development.txt
```

### Constraints Files

```bash
# constraints.txt - restrict versions without installing
numpy<2.0
pandas>=1.4,<2.0

# Use constraints
pip install package_name -c constraints.txt
```

---

## 🐍 Installing ML Frameworks

### TensorFlow

```bash
# CPU version
pip install tensorflow

# GPU version (CUDA required)
pip install tensorflow[and-cuda]  # TensorFlow 2.14+
# or older method:
pip install tensorflow-gpu

# Verify installation
python -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"

# Specific version
pip install tensorflow==2.12.0
```

### PyTorch

```bash
# CPU version
pip install torch torchvision torchaudio

# GPU version (check pytorch.org for your CUDA version)
# CUDA 11.8
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# CUDA 12.1
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# Verify
python -c "import torch; print(torch.cuda.is_available())"
```

### Complete ML Stack

```bash
# Data science stack
pip install numpy pandas matplotlib seaborn scipy

# Machine learning
pip install scikit-learn xgboost lightgbm

# Deep learning
pip install tensorflow torch torchvision

# Jupyter
pip install jupyterlab ipywidgets

# Utilities
pip install tqdm pillow requests
```

---

## 📦 Poetry for Modern Projects

### Initialize New Project

```bash
# Create new project
poetry new my-ml-project

# Project structure
my-ml-project/
├── pyproject.toml
├── README.md
├── my_ml_project/
│   └── __init__.py
└── tests/
    └── __init__.py
```

### pyproject.toml

```toml
[tool.poetry]
name = "my-ml-project"
version = "0.1.0"
description = "ML project with Poetry"
authors = ["Your Name <you@example.com>"]

[tool.poetry.dependencies]
python = "^3.11"
numpy = "^1.24.0"
pandas = "^1.5.0"
scikit-learn = "^1.2.0"

[tool.poetry.group.dev.dependencies]
pytest = "^7.2.0"
black = "^23.1.0"
flake8 = "^6.0.0"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

### Poetry Workflow

```bash
# Install all dependencies
poetry install

# Add new dependency
poetry add requests

# Add dev dependency
poetry add --group dev pytest

# Update dependencies
poetry update

# Show dependency tree
poetry show --tree

# Run command in poetry environment
poetry run python train.py

# Activate virtual environment
poetry shell
```

---

## 🔧 Troubleshooting

### Common Issues

#### Issue 1: Dependency Conflict

```bash
# Problem: Package A needs package C v1.0, Package B needs C v2.0

# Solution 1: Use pip check to identify
pip check

# Solution 2: Create separate environments
python -m venv env-a
python -m venv env-b

# Solution 3: Use dependency constraints
pip install package_a -c constraints.txt
```

#### Issue 2: SSL Certificate Error

```bash
# Temporary workaround
pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org package

# Permanent fix: Update certificates
pip install --upgrade certifi
```

#### Issue 3: Permission Denied

```bash
# Don't use sudo pip!
# Use --user flag
pip install --user package

# Or use virtual environment
python -m venv venv
source venv/bin/activate
pip install package
```

#### Issue 4: Package Not Found

```bash
# Update pip
pip install --upgrade pip

# Clear cache
pip cache purge

# Use different index
pip install --index-url https://pypi.org/simple package
```

---

## 🎯 Best Practices

### 1. Always Use Virtual Environments

```bash
# Never install packages globally!
# Always create environment first
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Pin Dependencies

```txt
# ❌ Bad - will break in future
flask
numpy

# ✅ Good - reproducible
flask==2.3.0
numpy==1.24.2

# ✅ Also good - safe range
flask>=2.3,<3.0
numpy>=1.24,<2.0
```

### 3. Separate Development Dependencies

```txt
# requirements.txt
flask==2.3.0
numpy==1.24.2

# requirements-dev.txt
-r requirements.txt
pytest==7.2.0
black==23.1.0
```

### 4. Document Installation

```markdown
# README.md

## Installation

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Install in development mode
pip install -e .
```
```

### 5. Use Lock Files

```bash
# pip-tools
pip-compile requirements.in

# Poetry
poetry lock

# Commit lock files to version control!
```

---

## 🔗 Navigation

- **Up**: [Chapter 3 Overview](../README.md)
- **Previous**: [3.4 IDEs for ML](../3.4-IDEs-for-ML/README.md)
- **Next**: [3.6 Git & Version Control](../3.6-Git-Version-Control/README.md)

---

## 📚 Additional Resources

- [pip Documentation](https://pip.pypa.io/en/stable/)
- [conda Documentation](https://docs.conda.io/)
- [Poetry Documentation](https://python-poetry.org/docs/)
- [Python Packaging Guide](https://packaging.python.org/)
- [pip-tools](https://github.com/jazzband/pip-tools)
- [PyPI](https://pypi.org/) - Python Package Index
