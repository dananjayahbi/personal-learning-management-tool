# 05 - Environment Best Practices

## 📋 Introduction

Following best practices for virtual environment management ensures reproducible, maintainable, and professional ML projects. This guide covers strategies for organizing, managing, and optimizing environments across venv, conda, Poetry, and Docker.

---

## 🎯 General Best Practices

### 1. One Environment Per Project

```bash
# ❌ Bad - Sharing environment across projects
project-a/
project-b/  # Both use ~/envs/shared-env
project-c/

# ✅ Good - Isolated environments
project-a/
├── venv/
project-b/
├── venv/
project-c/
├── venv/
```

**Why?**
- Prevents dependency conflicts
- Easier debugging
- Independent version management
- Cleaner uninstallation

### 2. Never Commit Environments

```gitignore
# Always in .gitignore
venv/
env/
ENV/
.venv/
.conda/
.poetry/
```

**Reasons:**
- Large file sizes (hundreds of MBs)
- Platform-specific binaries
- Redundant with requirements files
- Slows down git operations

### 3. Document Dependencies

```bash
# venv
pip freeze > requirements.txt

# conda
conda env export > environment.yml
conda env export --from-history > environment.yml  # Cleaner

# Poetry
# Automatically maintained in pyproject.toml and poetry.lock
```

### 4. Use Version Control for Configuration

```
✅ Commit:
- requirements.txt
- environment.yml
- pyproject.toml
- poetry.lock
- Dockerfile
- docker-compose.yml
- .python-version

❌ Don't commit:
- venv/
- .conda/
- __pycache__/
- *.pyc
```

### 5. Pin Critical Dependencies

```txt
# requirements.txt

# ❌ Unpinned - Can break
tensorflow
numpy
pandas

# ⚠️ Loose - Better but can still break
tensorflow>=2.0
numpy~=1.24
pandas>=2.0,<3.0

# ✅ Pinned - Reproducible
tensorflow==2.13.0
numpy==1.24.3
pandas==2.0.3
```

---

## 🏗️ Project Structure

### Recommended Directory Layout

```
ml-project/
├── .git/                    # Git repository
├── .gitignore              # Ignore venv, data, etc.
├── venv/                   # Virtual environment (not committed)
│   └── ...
├── data/                   # Data files
│   ├── raw/
│   ├── processed/
│   └── .gitkeep           # Track empty dirs
├── notebooks/              # Jupyter notebooks
│   ├── 01-exploration.ipynb
│   └── 02-modeling.ipynb
├── src/                    # Source code
│   ├── __init__.py
│   ├── data/
│   │   └── preprocessing.py
│   ├── models/
│   │   ├── train.py
│   │   └── evaluate.py
│   └── utils/
│       └── helpers.py
├── tests/                  # Unit tests
│   ├── __init__.py
│   └── test_preprocessing.py
├── models/                 # Saved models
│   └── best_model.pkl
├── results/                # Outputs
│   ├── figures/
│   └── reports/
├── requirements.txt        # Dependencies
├── setup.py               # Package setup (optional)
├── README.md              # Documentation
└── .env                   # Environment variables (not committed)
```

### Comprehensive .gitignore

```gitignore
# Virtual Environments
venv/
env/
ENV/
.venv/
.conda/
.poetry/

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Jupyter
.ipynb_checkpoints/
*.ipynb

# IDEs
.vscode/
.idea/
*.swp
*.swo
*~

# Data
data/raw/*
data/processed/*
!data/.gitkeep
*.csv
*.h5
*.hdf5
*.pkl
*.pickle

# Models
models/*.pth
models/*.h5
models/*.pkl
!models/.gitkeep

# Logs
logs/
*.log

# Environment
.env
.env.local

# OS
.DS_Store
Thumbs.db
```

---

## 📦 Choosing the Right Tool

### Decision Tree

```
Start
│
├─ Simple Python project? → venv
│
├─ Need specific Python version? → conda or pyenv + venv
│
├─ Data science with C/C++ deps? → conda
│
├─ Need GPU libraries (CUDA)? → conda or Docker
│
├─ Modern project management? → Poetry
│
├─ Deployment to production? → Docker
│
└─ Team collaboration with lock files? → Poetry or conda + lock
```

### Use Cases

**venv:**
- ✅ Web applications (Flask, Django)
- ✅ Simple scripts
- ✅ Learning Python
- ✅ Lightweight CLI tools

**conda:**
- ✅ Data science projects
- ✅ Scientific computing
- ✅ Projects needing non-Python libraries
- ✅ GPU development (CUDA)
- ✅ Multiple Python versions

**Poetry:**
- ✅ Modern Python applications
- ✅ Package development
- ✅ Projects with complex dependencies
- ✅ Need for lock files
- ✅ Team projects

**Docker:**
- ✅ Production deployment
- ✅ Microservices
- ✅ Complex system dependencies
- ✅ Sharing complete environments
- ✅ CI/CD pipelines

---

## 🔄 Workflow Patterns

### Pattern 1: venv + pip

```bash
# Setup
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Development
pip install new-package
pip freeze > requirements.txt

# Share
git add requirements.txt
git commit -m "Add new-package"

# Reproduce
git clone repo
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Pattern 2: conda

```bash
# Setup
conda create -n project python=3.10
conda activate project
conda install --file requirements.txt

# Development
conda install new-package
conda env export --from-history > environment.yml

# Share
git add environment.yml
git commit -m "Add new-package"

# Reproduce
git clone repo
conda env create -f environment.yml
conda activate project
```

### Pattern 3: Poetry

```bash
# Setup
poetry new project
cd project
poetry install

# Development
poetry add new-package
# pyproject.toml and poetry.lock auto-updated

# Share
git add pyproject.toml poetry.lock
git commit -m "Add new-package"

# Reproduce
git clone repo
cd repo
poetry install  # Uses poetry.lock
```

### Pattern 4: Docker

```bash
# Setup
# Create Dockerfile
docker build -t project:latest .

# Development
# Edit Dockerfile
docker build -t project:latest .

# Share
git add Dockerfile
git commit -m "Update dependencies"

# Reproduce
git clone repo
docker build -t project:latest .
docker run project:latest
```

---

## 🧪 Testing Environments

### Environment Verification Script

```python
# verify_env.py
import sys
import subprocess
from pathlib import Path

def verify_environment():
    """Verify virtual environment setup"""
    
    print("=" * 60)
    print("ENVIRONMENT VERIFICATION")
    print("=" * 60)
    
    # Check Python version
    print(f"\n✓ Python: {sys.version}")
    required_version = (3, 10)
    if sys.version_info >= required_version:
        print(f"  ✅ Version OK (>= {required_version[0]}.{required_version[1]})")
    else:
        print(f"  ❌ Version too old (need >= {required_version[0]}.{required_version[1]})")
        return False
    
    # Check virtual environment
    in_venv = (
        hasattr(sys, 'real_prefix') or 
        (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix)
    )
    print(f"\n✓ Virtual Environment: {'Yes' if in_venv else 'No'}")
    if not in_venv:
        print("  ⚠️  Not in a virtual environment")
    
    # Check required packages
    required_packages = [
        'numpy',
        'pandas',
        'scikit-learn',
        'matplotlib',
    ]
    
    print(f"\n✓ Required Packages:")
    all_installed = True
    for package in required_packages:
        try:
            __import__(package)
            version = __import__(package).__version__
            print(f"  ✅ {package}: {version}")
        except ImportError:
            print(f"  ❌ {package}: NOT INSTALLED")
            all_installed = False
    
    # Check optional packages
    optional_packages = ['torch', 'tensorflow']
    print(f"\n✓ Optional Packages:")
    for package in optional_packages:
        try:
            __import__(package)
            version = __import__(package).__version__
            print(f"  ✅ {package}: {version}")
        except ImportError:
            print(f"  ⚠️  {package}: not installed")
    
    # Check GPU availability
    print(f"\n✓ GPU Support:")
    try:
        import torch
        cuda_available = torch.cuda.is_available()
        if cuda_available:
            print(f"  ✅ PyTorch CUDA: {torch.version.cuda}")
            print(f"     Devices: {torch.cuda.device_count()}")
        else:
            print(f"  ⚠️  PyTorch CUDA: not available")
    except ImportError:
        print(f"  ⚠️  PyTorch: not installed")
    
    try:
        import tensorflow as tf
        gpus = tf.config.list_physical_devices('GPU')
        if gpus:
            print(f"  ✅ TensorFlow GPU: {len(gpus)} device(s)")
        else:
            print(f"  ⚠️  TensorFlow GPU: not available")
    except ImportError:
        print(f"  ⚠️  TensorFlow: not installed")
    
    print("\n" + "=" * 60)
    return all_installed

if __name__ == "__main__":
    success = verify_environment()
    sys.exit(0 if success else 1)
```

**Usage:**
```bash
python verify_env.py
```

---

## 🚀 Performance Optimization

### 1. Use Fast Package Installers

```bash
# Use pip with binary wheels
pip install --only-binary :all: numpy

# Use mamba instead of conda
conda install mamba -c conda-forge
mamba install numpy pandas

# Use pip compile for faster resolution
pip install pip-tools
pip-compile requirements.in
pip-sync requirements.txt
```

### 2. Cache Dependencies

```bash
# pip cache
pip install --cache-dir ~/.pip_cache numpy

# conda cache
conda clean --all  # Clean occasionally
conda config --set always_yes yes  # Skip confirmations

# Poetry cache
poetry config cache-dir ~/.poetry_cache
```

### 3. Use Constraints Files

```txt
# constraints.txt
numpy<2.0
tensorflow>=2.0,<3.0

# Install with constraints
pip install -c constraints.txt -r requirements.txt
```

---

## 🔐 Security Best Practices

### 1. Pin Package Versions

```txt
# requirements.txt
numpy==1.24.3  # Specific version
tensorflow==2.13.0
scikit-learn==1.3.0
```

### 2. Use Hash Checking

```bash
# Generate hashes
pip freeze > requirements.txt
pip hash numpy==1.24.3 >> requirements.txt

# Install with hash verification
pip install --require-hashes -r requirements.txt
```

### 3. Scan for Vulnerabilities

```bash
# Using Safety
pip install safety
safety check

# Using pip-audit
pip install pip-audit
pip-audit

# Docker image scanning
docker scan ml-project:latest
```

### 4. Don't Store Secrets in Code

```python
# ❌ Bad - Hardcoded secrets
API_KEY = "sk-abc123..."

# ✅ Good - Environment variables
import os
API_KEY = os.getenv("API_KEY")

# ✅ Better - .env file (not committed)
from dotenv import load_dotenv
load_dotenv()
API_KEY = os.getenv("API_KEY")
```

---

## 📝 Documentation

### README.md Template

```markdown
# Project Name

## Overview
Brief description of the project.

## Setup

### Prerequisites
- Python 3.10+
- (Optional) CUDA 11.8+ for GPU support

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/username/project.git
cd project
\`\`\`

2. Create virtual environment:
\`\`\`bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate  # Windows
\`\`\`

3. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

## Usage

### Training
\`\`\`bash
python src/train.py --config configs/default.yaml
\`\`\`

### Evaluation
\`\`\`bash
python src/evaluate.py --model models/best_model.pkl
\`\`\`

## Project Structure
\`\`\`
project/
├── data/
├── src/
├── models/
└── requirements.txt
\`\`\`

## License
MIT
```

---

## 🎓 Checklist

### Development Environment Setup

- [ ] Virtual environment created
- [ ] Dependencies installed
- [ ] requirements.txt/environment.yml created
- [ ] .gitignore configured
- [ ] IDE configured
- [ ] Git initialized
- [ ] README.md created
- [ ] verify_env.py passes

### Before Committing

- [ ] Code formatted (black, isort)
- [ ] Tests passing
- [ ] No sensitive data in code
- [ ] Dependencies documented
- [ ] .gitignore updated

### Before Sharing/Deploying

- [ ] Dependencies pinned
- [ ] Documentation complete
- [ ] Tests comprehensive
- [ ] Security audit passed
- [ ] Environment reproducible

---

## 🎯 Key Takeaways

1. ✅ **One environment per project** - Isolation is key
2. ✅ **Never commit environments** - Use configuration files
3. ✅ **Document dependencies** - requirements.txt, environment.yml, etc.
4. ✅ **Pin versions** - Reproducibility and security
5. ✅ **Choose right tool** - venv, conda, Poetry, or Docker
6. ✅ **Test environment** - Verification scripts
7. ✅ **Optimize performance** - Fast installers, caching
8. ✅ **Security first** - Scan, hash-check, no secrets

---

## 🔗 Navigation

- **Up**: [3.2 Virtual Environments Overview](./README.md)
- **Previous**: [04 - Docker Containers](./04-Docker-Containers.md)
- **Next**: [06 - Sharing Environments](./06-Sharing-Environments.md)

---

**Remember:** Good environment management practices lead to reproducible, maintainable, and professional ML projects!
