# 02 - Virtual Environments and Dependency Management

## 📋 Table of Contents
- [Introduction](#introduction)
- [Why Virtual Environments](#why-virtual-environments)
- [venv (Built-in)](#venv-built-in)
- [Conda Environments](#conda-environments)
- [Dependency Management](#dependency-management)
- [Best Practices](#best-practices)
- [Practice Exercises](#practice-exercises)

---

## Introduction

Virtual environments isolate project dependencies, preventing conflicts and ensuring reproducibility.

```bash
# Check Python version
python --version

# Check pip
pip --version
```

---

## Why Virtual Environments

### Problems Without Virtual Environments

```bash
# Global installation issues:
# 1. Project A needs scikit-learn 0.24
# 2. Project B needs scikit-learn 1.0
# 3. Cannot have both versions globally!

# Conflicts:
pip install scikit-learn==0.24  # For Project A
pip install scikit-learn==1.0   # Breaks Project A!
```

### Benefits

1. **Isolation**: Each project has its own dependencies
2. **Reproducibility**: Exact versions specified
3. **Cleanliness**: No global pollution
4. **Flexibility**: Test different versions easily
5. **Collaboration**: Share exact environment

---

## venv (Built-in)

### Creating Environment

```bash
# Create virtual environment
python -m venv myenv

# Or with specific name
python -m venv ml_project_env

# Directory structure created:
# myenv/
# ├── Include/
# ├── Lib/
# ├── Scripts/  (Windows) or bin/ (Linux/Mac)
# └── pyvenv.cfg
```

### Activating Environment

```bash
# Windows
myenv\Scripts\activate

# Linux/Mac
source myenv/bin/activate

# Your prompt changes:
# (myenv) C:\Users\You\project>
```

### Using Environment

```bash
# After activation, pip installs to virtual env
(myenv) pip install numpy pandas scikit-learn

# Check installed packages
(myenv) pip list

# Run Python
(myenv) python script.py
```

### Deactivating

```bash
# Return to global environment
(myenv) deactivate

# Prompt returns to normal
# C:\Users\You\project>
```

### Complete Workflow

```bash
# 1. Create project
mkdir my_ml_project
cd my_ml_project

# 2. Create virtual environment
python -m venv venv

# 3. Activate
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# 4. Install dependencies
pip install numpy pandas matplotlib scikit-learn

# 5. Save dependencies
pip freeze > requirements.txt

# 6. Work on project
python train_model.py

# 7. Deactivate when done
deactivate
```

---

## Conda Environments

### Installing Conda

```bash
# Download Miniconda or Anaconda
# https://docs.conda.io/en/latest/miniconda.html

# Verify installation
conda --version
```

### Creating Conda Environment

```bash
# Create environment with specific Python version
conda create --name ml_env python=3.9

# Create with packages
conda create --name ml_env python=3.9 numpy pandas scikit-learn

# Create from file
conda env create -f environment.yml
```

### Activating Conda Environment

```bash
# Activate
conda activate ml_env

# Verify
which python  # Linux/Mac
where python  # Windows
```

### Managing Packages

```bash
# Install package
conda install numpy

# Install from conda-forge
conda install -c conda-forge xgboost

# Install with pip (in conda env)
pip install package-name

# Update package
conda update numpy

# Remove package
conda remove numpy

# List packages
conda list
```

### Environment Management

```bash
# List all environments
conda env list

# Clone environment
conda create --name ml_env_copy --clone ml_env

# Remove environment
conda env remove --name ml_env

# Export environment
conda env export > environment.yml

# Update environment
conda env update --file environment.yml --prune
```

### Conda vs venv

| Feature | venv | Conda |
|---------|------|-------|
| Built-in | ✅ Yes | ❌ No |
| Python versions | Current only | Any version |
| Package manager | pip only | conda + pip |
| Non-Python packages | ❌ No | ✅ Yes (C libraries) |
| Cross-platform | ✅ Yes | ✅ Yes |
| Data science focus | ❌ No | ✅ Yes |

---

## Dependency Management

### requirements.txt

```bash
# Create requirements.txt
pip freeze > requirements.txt

# Contents example:
"""
numpy==1.21.0
pandas==1.3.0
scikit-learn==0.24.2
matplotlib==3.4.2
"""

# Install from requirements.txt
pip install -r requirements.txt

# Install with specific versions
pip install "numpy>=1.20,<1.22"
```

### Advanced requirements.txt

```txt
# requirements.txt with comments

# Core dependencies
numpy==1.21.0
pandas==1.3.0

# Machine learning
scikit-learn==0.24.2
xgboost==1.4.2

# Visualization
matplotlib==3.4.2
seaborn==0.11.1

# Development dependencies
pytest==6.2.4
black==21.6b0

# Optional dependencies
# tensorflow==2.5.0  # Uncomment for deep learning
```

### Multiple Requirements Files

```bash
# requirements/
# ├── base.txt          # Core dependencies
# ├── dev.txt           # Development tools
# └── prod.txt          # Production only

# requirements/base.txt
"""
numpy==1.21.0
pandas==1.3.0
"""

# requirements/dev.txt
"""
-r base.txt  # Include base requirements
pytest==6.2.4
black==21.6b0
jupyter==1.0.0
"""

# requirements/prod.txt
"""
-r base.txt
gunicorn==20.1.0
"""

# Install
pip install -r requirements/dev.txt
```

### environment.yml (Conda)

```yaml
# environment.yml
name: ml_project
channels:
  - defaults
  - conda-forge
dependencies:
  - python=3.9
  - numpy=1.21
  - pandas=1.3
  - scikit-learn=0.24
  - matplotlib=3.4
  - pip
  - pip:
    - xgboost==1.4.2
    - lightgbm==3.2.1
```

### setup.py for Packages

```python
# setup.py
from setuptools import setup, find_packages

setup(
    name="my_ml_project",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "numpy>=1.20",
        "pandas>=1.3",
        "scikit-learn>=0.24",
    ],
    extras_require={
        "dev": [
            "pytest>=6.2",
            "black>=21.6",
        ],
        "viz": [
            "matplotlib>=3.4",
            "seaborn>=0.11",
        ],
    },
)

# Install package in development mode
# pip install -e .

# Install with extras
# pip install -e ".[dev,viz]"
```

### pyproject.toml (Modern)

```toml
# pyproject.toml
[build-system]
requires = ["setuptools>=45", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "my_ml_project"
version = "0.1.0"
dependencies = [
    "numpy>=1.20",
    "pandas>=1.3",
    "scikit-learn>=0.24",
]

[project.optional-dependencies]
dev = [
    "pytest>=6.2",
    "black>=21.6",
]
viz = [
    "matplotlib>=3.4",
    "seaborn>=0.11",
]
```

---

## Best Practices

### 1. One Environment Per Project

```bash
# ✅ Good: Separate environments
project_a/
├── venv_a/
└── ...

project_b/
├── venv_b/
└── ...

# ❌ Bad: Shared environment
shared_env/
project_a/
project_b/
```

### 2. Version Control

```bash
# .gitignore
venv/
*.pyc
__pycache__/
.env

# ✅ Commit: requirements.txt
# ❌ Don't commit: venv/ directory
```

### 3. Pin Versions

```txt
# ✅ Good: Exact versions
numpy==1.21.0
pandas==1.3.0

# ⚠️ Acceptable: Compatible versions
numpy>=1.20,<1.22
pandas~=1.3.0  # 1.3.x only

# ❌ Bad: No versions
numpy
pandas
```

### 4. Document Installation

```markdown
# README.md

## Setup

1. Create virtual environment:
   ```bash
   python -m venv venv
   ```

2. Activate:
   ```bash
   venv\Scripts\activate  # Windows
   source venv/bin/activate  # Linux/Mac
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run:
   ```bash
   python main.py
   ```
```

### 5. Automated Setup Script

```bash
# setup.sh (Linux/Mac)
#!/bin/bash

echo "Setting up ML project environment..."

# Create virtual environment
python -m venv venv

# Activate
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt

# Install project in development mode
pip install -e .

echo "Setup complete! Activate with: source venv/bin/activate"
```

```bash
# setup.bat (Windows)
@echo off
echo Setting up ML project environment...

rem Create virtual environment
python -m venv venv

rem Activate
call venv\Scripts\activate

rem Upgrade pip
pip install --upgrade pip

rem Install dependencies
pip install -r requirements.txt

rem Install project in development mode
pip install -e .

echo Setup complete! Activate with: venv\Scripts\activate
```

### 6. Environment Variables

```bash
# .env file
DATABASE_URL=postgresql://localhost/mydb
API_KEY=your_secret_key
MODEL_PATH=models/best_model.pkl

# Load in Python
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv('API_KEY')
```

### 7. Docker Alternative

```dockerfile
# Dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "main.py"]
```

---

## Practice Exercises

### Exercise 1: Create Project Environment
```bash
# 1. Create new project
# 2. Set up virtual environment
# 3. Install packages
# 4. Create requirements.txt
# 5. Document setup in README
```

### Exercise 2: Manage Multiple Environments
```bash
# Create environments for:
# - Data preprocessing (pandas, numpy)
# - Model training (scikit-learn, xgboost)
# - Deep learning (tensorflow, keras)
```

### Exercise 3: Reproduce Environment
```bash
# Given requirements.txt:
# 1. Create new environment
# 2. Install exact dependencies
# 3. Verify versions match
# 4. Run test script
```

---

## Key Takeaways

1. **Always use virtual environments**
2. **venv**: Built-in, simple
3. **Conda**: Better for data science
4. **requirements.txt**: Pin versions
5. **Document setup**: Clear instructions
6. **Don't commit**: Virtual env directories
7. **Test reproduction**: Fresh environment
8. **Automate**: Setup scripts

---

## 🔗 Navigation

- **Previous**: [01 - Code Organization](./01-Code-Organization.md)
- **Next**: [03 - Jupyter Notebooks](./03-Jupyter-Notebooks.md)
- **Up**: [2.5 Best Practices](./README.md)
