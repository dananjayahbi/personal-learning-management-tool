# 📜 Modern Python Packaging with Poetry

## Overview

Master Poetry, the modern Python dependency management and packaging tool. Learn to manage dependencies declaratively, handle virtual environments automatically, and publish packages professionally using pyproject.toml.

---

## 📚 Table of Contents

1. [Introduction to Poetry](#introduction-to-poetry)
2. [Installation and Setup](#installation-and-setup)
3. [pyproject.toml Deep Dive](#pyprojecttoml-deep-dive)
4. [Dependency Management](#dependency-management)
5. [Virtual Environment Management](#virtual-environment-management)
6. [Building and Publishing](#building-and-publishing)
7. [Working with Workspaces](#working-with-workspaces)
8. [Migration Strategies](#migration-strategies)
9. [CI/CD Integration](#cicd-integration)
10. [Exercises](#exercises)

---

## 🎯 Introduction to Poetry

### What is Poetry?

Poetry is a modern Python packaging and dependency management tool that uses `pyproject.toml` (PEP 518/621) for configuration.

### Poetry vs Traditional Tools

| Feature | Poetry | pip + setuptools |
|---------|--------|------------------|
| **Configuration** | pyproject.toml | setup.py, requirements.txt |
| **Dependency Resolution** | Advanced resolver | Basic |
| **Lock File** | poetry.lock | requirements.txt (manual) |
| **Virtual Envs** | Automatic | Manual (venv) |
| **Building** | Built-in | setup.py + twine |
| **Publishing** | Built-in | twine |
| **Dependency Groups** | Native support | Multiple requirements files |

### Why Use Poetry?

```python
# ✅ Poetry Benefits:
# - Deterministic builds (poetry.lock)
# - Simplified dependency management
# - Automatic virtual environment handling
# - Single configuration file (pyproject.toml)
# - Modern PEP 517/518/621 compliant
# - Built-in publishing workflow
# - Dependency groups (dev, test, docs)
# - Better error messages
```

---

## 🔧 Installation and Setup

### Installing Poetry

```bash
# Method 1: Official installer (recommended)
curl -sSL https://install.python-poetry.org | python3 -

# Windows (PowerShell)
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -

# Method 2: pipx (isolated)
pipx install poetry

# Method 3: pip (not recommended)
pip install poetry
```

### Verify Installation

```bash
# Check version
poetry --version
# Poetry (version 1.7.0)

# Check installation location
which poetry  # Linux/macOS
where poetry  # Windows
```

### Initial Configuration

```bash
# Configure Poetry
poetry config --list  # Show all settings

# Set virtualenvs in project directory
poetry config virtualenvs.in-project true

# Disable virtualenv creation (use system Python)
poetry config virtualenvs.create false

# Configure PyPI credentials
poetry config pypi-token.pypi <your-token>

# Show configuration location
poetry config --list --local
```

### Shell Completion

```bash
# Bash
poetry completions bash >> ~/.bash_completion

# Zsh
poetry completions zsh > ~/.zfunc/_poetry

# Fish
poetry completions fish > ~/.config/fish/completions/poetry.fish

# PowerShell
poetry completions powershell | Out-String | Invoke-Expression
```

---

## 📄 pyproject.toml Deep Dive

### Basic Structure

```toml
# pyproject.toml
[tool.poetry]
name = "my-ml-project"
version = "0.1.0"
description = "A machine learning project"
authors = ["Your Name <you@example.com>"]
readme = "README.md"
license = "MIT"
homepage = "https://github.com/user/my-ml-project"
repository = "https://github.com/user/my-ml-project"
documentation = "https://my-ml-project.readthedocs.io"
keywords = ["machine-learning", "data-science"]
classifiers = [
    "Development Status :: 3 - Alpha",
    "Intended Audience :: Developers",
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3.9",
]

[tool.poetry.dependencies]
python = "^3.9"
numpy = "^1.21.0"
pandas = "^1.3.0"

[tool.poetry.group.dev.dependencies]
pytest = "^7.0.0"
black = "^23.0.0"
mypy = "^1.0.0"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

### Dependency Specification

```toml
[tool.poetry.dependencies]
# Caret requirements (^)
# ^1.2.3 means >=1.2.3 <2.0.0
numpy = "^1.21.0"

# Tilde requirements (~)
# ~1.2.3 means >=1.2.3 <1.3.0
pandas = "~1.3.0"

# Wildcard requirements (*)
# 1.* means >=1.0.0 <2.0.0
scikit-learn = "1.*"

# Exact version
matplotlib = "3.4.2"

# Version ranges
scipy = ">=1.7.0,<1.10.0"

# Multiple constraints
torch = [
    {version = "^2.0.0", markers = "sys_platform != 'darwin'"},
    {version = "^2.0.0", platform = "darwin", source = "pytorch"}
]

# Git dependencies
tensorflow-addons = {git = "https://github.com/tensorflow/addons.git", branch = "main"}

# Local dependencies
my-lib = {path = "../my-lib", develop = true}

# URL dependencies
package = {url = "https://example.com/package-1.0.0.tar.gz"}

# Optional dependencies
opencv-python = {version = "^4.5.0", optional = true}

# Extras
requests = {version = "^2.28.0", extras = ["security"]}
```

### Dependency Groups

```toml
# Main dependencies (production)
[tool.poetry.dependencies]
python = "^3.9"
numpy = "^1.21.0"
pandas = "^1.3.0"
scikit-learn = "^1.0.0"

# Development dependencies
[tool.poetry.group.dev.dependencies]
pytest = "^7.0.0"
pytest-cov = "^4.0.0"
black = "^23.0.0"
isort = "^5.11.0"
mypy = "^1.0.0"
flake8 = "^6.0.0"

# Testing dependencies
[tool.poetry.group.test.dependencies]
pytest = "^7.0.0"
pytest-mock = "^3.10.0"
hypothesis = "^6.68.0"
faker = "^18.0.0"

# Documentation dependencies
[tool.poetry.group.docs.dependencies]
sphinx = "^6.0.0"
sphinx-rtd-theme = "^1.2.0"
myst-parser = "^1.0.0"

# Optional groups (not installed by default)
[tool.poetry.group.extras]
optional = true

[tool.poetry.group.extras.dependencies]
jupyter = "^1.0.0"
ipython = "^8.0.0"
```

### Extras (Optional Features)

```toml
[tool.poetry.dependencies]
# Core dependencies
numpy = "^1.21.0"
pandas = "^1.3.0"

# Optional dependencies
matplotlib = {version = "^3.4.0", optional = true}
seaborn = {version = "^0.11.0", optional = true}
plotly = {version = "^5.0.0", optional = true}

# Define extras
[tool.poetry.extras]
visualization = ["matplotlib", "seaborn"]
interactive = ["plotly", "jupyter"]
all = ["matplotlib", "seaborn", "plotly", "jupyter"]
```

### Scripts and Entry Points

```toml
[tool.poetry.scripts]
# Command-line scripts
my-cli = "my_package.cli:main"
train = "my_package.train:run"
evaluate = "my_package.evaluate:run"

# GUI applications
[tool.poetry.plugins."gui_scripts"]
my-gui = "my_package.gui:main"
```

---

## 📦 Dependency Management

### Creating a New Project

```bash
# Create new project
poetry new my-ml-project
# my-ml-project/
# ├── my_ml_project/
# │   └── __init__.py
# ├── tests/
# │   └── __init__.py
# ├── pyproject.toml
# └── README.md

# Create with src layout
poetry new --src my-ml-project
# my-ml-project/
# ├── src/
# │   └── my_ml_project/
# │       └── __init__.py
# ├── tests/
# ├── pyproject.toml
# └── README.md

# Initialize in existing directory
cd existing-project
poetry init
# Interactive setup wizard
```

### Adding Dependencies

```bash
# Add dependency (latest version)
poetry add numpy

# Add with version constraint
poetry add "numpy^1.21.0"

# Add to development group
poetry add --group dev pytest black mypy

# Add to specific group
poetry add --group test pytest-cov hypothesis

# Add optional dependency
poetry add --optional matplotlib

# Add with extras
poetry add "requests[security]"

# Add from Git
poetry add git+https://github.com/tensorflow/tensorflow.git

# Add from Git with branch/tag
poetry add git+https://github.com/user/repo.git#main
poetry add git+https://github.com/user/repo.git#v1.0.0

# Add local package (editable)
poetry add ../my-lib --editable
```

### Removing Dependencies

```bash
# Remove dependency
poetry remove numpy

# Remove from group
poetry remove --group dev pytest

# Remove multiple
poetry remove pandas matplotlib scipy
```

### Updating Dependencies

```bash
# Update all dependencies
poetry update

# Update specific package
poetry update numpy

# Update to latest within constraints
poetry update pandas --dry-run

# Update group
poetry update --group dev

# Update without updating locked versions
poetry install --sync
```

### Showing Dependencies

```bash
# Show dependency tree
poetry show --tree

# Show specific package
poetry show numpy

# Show outdated packages
poetry show --outdated

# Show latest versions
poetry show --latest

# Export requirements
poetry export -f requirements.txt --output requirements.txt

# Export with dev dependencies
poetry export -f requirements.txt --output requirements.txt --with dev

# Export without hashes
poetry export -f requirements.txt --output requirements.txt --without-hashes
```

---

## 🌐 Virtual Environment Management

### Automatic Virtual Environments

```bash
# Poetry creates virtualenv automatically on first install
poetry install

# Show virtualenv info
poetry env info

# Show virtualenv path
poetry env info --path
# /home/user/.cache/pypoetry/virtualenvs/my-project-py3.9

# List all virtualenvs for this project
poetry env list
```

### Managing Virtual Environments

```bash
# Use specific Python version
poetry env use python3.9
poetry env use python3.10
poetry env use /usr/bin/python3.11

# Remove virtualenv
poetry env remove python3.9

# Remove all virtualenvs
poetry env remove --all

# Create virtualenv in project directory
poetry config virtualenvs.in-project true
poetry install
# Creates .venv/ in project root
```

### Running Commands in Virtual Environment

```bash
# Run command in virtualenv
poetry run python script.py
poetry run pytest
poetry run black .

# Activate virtualenv (spawns new shell)
poetry shell

# Exit virtualenv
exit  # or Ctrl+D

# Run script defined in pyproject.toml
poetry run my-cli --help
```

### Installing from poetry.lock

```bash
# Install exact versions from poetry.lock
poetry install

# Install without dev dependencies
poetry install --without dev

# Install only specific groups
poetry install --only test

# Install with extras
poetry install --extras "visualization interactive"

# Sync environment (remove unlisted packages)
poetry install --sync

# Install without current project
poetry install --no-root
```

---

## 🚀 Building and Publishing

### Building Packages

```bash
# Build package (wheel and sdist)
poetry build
# Building my-ml-project (0.1.0)
#   - Building sdist
#   - Built my_ml_project-0.1.0.tar.gz
#   - Building wheel
#   - Built my_ml_project-0.1.0-py3-none-any.whl

# Build only wheel
poetry build -f wheel

# Build only sdist
poetry build -f sdist
```

### Publishing to PyPI

```bash
# Configure PyPI token (one-time setup)
poetry config pypi-token.pypi <your-token>

# Publish to PyPI
poetry publish

# Build and publish
poetry publish --build

# Publish to Test PyPI
poetry config repositories.testpypi https://test.pypi.org/legacy/
poetry config pypi-token.testpypi <test-token>
poetry publish -r testpypi
```

### Version Management

```bash
# Bump version
poetry version patch  # 0.1.0 -> 0.1.1
poetry version minor  # 0.1.1 -> 0.2.0
poetry version major  # 0.2.0 -> 1.0.0

# Pre-release versions
poetry version prepatch    # 0.1.0 -> 0.1.1a0
poetry version preminor    # 0.1.0 -> 0.2.0a0
poetry version premajor    # 0.1.0 -> 1.0.0a0

# Set specific version
poetry version 2.0.0

# Show current version
poetry version
```

### Complete Release Workflow

```bash
# 1. Update version
poetry version patch

# 2. Update changelog
vim CHANGELOG.md

# 3. Commit changes
git add pyproject.toml CHANGELOG.md
git commit -m "Release v0.1.1"

# 4. Create tag
git tag v0.1.1

# 5. Push to repository
git push origin main --tags

# 6. Build and publish
poetry publish --build

# 7. GitHub release (optional)
gh release create v0.1.1 --generate-notes
```

---

## 🏢 Working with Workspaces

### Monorepo Structure

```bash
workspace/
├── pyproject.toml           # Workspace config
├── packages/
│   ├── core/
│   │   ├── pyproject.toml
│   │   └── core/
│   ├── models/
│   │   ├── pyproject.toml
│   │   └── models/
│   └── utils/
│       ├── pyproject.toml
│       └── utils/
└── apps/
    └── ml-api/
        ├── pyproject.toml
        └── ml_api/
```

### Root pyproject.toml

```toml
# workspace/pyproject.toml
[tool.poetry]
name = "ml-workspace"
version = "1.0.0"
description = "ML project workspace"
authors = ["Your Name <you@example.com>"]

# No dependencies in root (handled by sub-packages)
[tool.poetry.dependencies]
python = "^3.9"
```

### Package with Local Dependencies

```toml
# packages/models/pyproject.toml
[tool.poetry]
name = "ml-models"
version = "0.1.0"

[tool.poetry.dependencies]
python = "^3.9"
numpy = "^1.21.0"
# Local dependency
ml-core = {path = "../core", develop = true}

[tool.poetry.group.dev.dependencies]
pytest = "^7.0.0"
```

### Installing Workspace

```bash
# Install from root (installs all packages)
cd workspace
poetry install

# Install specific package
cd packages/models
poetry install

# Update local dependencies
poetry update ml-core
```

---

## 🔄 Migration Strategies

### From requirements.txt

```bash
# Create new pyproject.toml
poetry init

# Add dependencies from requirements.txt
cat requirements.txt | grep -v "^#" | xargs -n 1 poetry add

# Or manually import
poetry add $(cat requirements.txt)
```

### From setup.py

```bash
# Migrate automatically
poetry init

# Edit pyproject.toml based on setup.py
# Copy dependencies from install_requires
# Copy dev dependencies from extras_require
# Copy metadata (author, description, etc.)
```

### Example Migration

```python
# Old setup.py
from setuptools import setup, find_packages

setup(
    name="my_package",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "numpy>=1.21.0",
        "pandas>=1.3.0",
    ],
    extras_require={
        "dev": [
            "pytest>=7.0.0",
            "black>=23.0.0",
        ],
    },
)
```

```toml
# New pyproject.toml
[tool.poetry]
name = "my-package"
version = "0.1.0"

[tool.poetry.dependencies]
python = "^3.9"
numpy = "^1.21.0"
pandas = "^1.3.0"

[tool.poetry.group.dev.dependencies]
pytest = "^7.0.0"
black = "^23.0.0"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

### From Pipenv

```bash
# Export Pipfile.lock
pipenv lock -r > requirements.txt

# Create Poetry project
poetry init
cat requirements.txt | xargs -n 1 poetry add
```

---

## 🔁 CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.9", "3.10", "3.11"]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: ${{ matrix.python-version }}
    
    - name: Install Poetry
      uses: snok/install-poetry@v1
      with:
        version: 1.7.0
        virtualenvs-create: true
        virtualenvs-in-project: true
    
    - name: Load cached venv
      uses: actions/cache@v3
      with:
        path: .venv
        key: venv-${{ runner.os }}-${{ steps.setup-python.outputs.python-version }}-${{ hashFiles('**/poetry.lock') }}
    
    - name: Install dependencies
      run: poetry install --no-interaction
    
    - name: Run tests
      run: poetry run pytest
    
    - name: Run linting
      run: |
        poetry run black --check .
        poetry run mypy .
```

### Publishing on Release

```yaml
# .github/workflows/publish.yml
name: Publish to PyPI

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: "3.11"
    
    - name: Install Poetry
      uses: snok/install-poetry@v1
    
    - name: Build and publish
      env:
        POETRY_PYPI_TOKEN_PYPI: ${{ secrets.PYPI_TOKEN }}
      run: |
        poetry build
        poetry publish
```

### GitLab CI

```yaml
# .gitlab-ci.yml
image: python:3.11

stages:
  - test
  - publish

before_script:
  - curl -sSL https://install.python-poetry.org | python3 -
  - export PATH="$HOME/.local/bin:$PATH"
  - poetry install

test:
  stage: test
  script:
    - poetry run pytest
    - poetry run black --check .
    - poetry run mypy .

publish:
  stage: publish
  only:
    - tags
  script:
    - poetry config pypi-token.pypi $PYPI_TOKEN
    - poetry publish --build
```

---

## 💪 Exercises

### Exercise 1: Create Poetry Project

Create a complete ML project with Poetry.

**Solution:**

```bash
# Create project
poetry new ml-classifier --src

cd ml-classifier

# Add dependencies
poetry add numpy pandas scikit-learn matplotlib

# Add dev dependencies
poetry add --group dev pytest black mypy flake8 ipython

# Add optional dependencies
poetry add --optional jupyter notebook

# Update pyproject.toml
cat >> pyproject.toml << 'EOF'

[tool.poetry.extras]
notebooks = ["jupyter", "notebook"]

[tool.poetry.scripts]
train = "ml_classifier.train:main"
evaluate = "ml_classifier.evaluate:main"
EOF

# Install with extras
poetry install --extras notebooks

# Verify
poetry show --tree
```

### Exercise 2: Migrate from requirements.txt

Migrate existing project to Poetry.

**Solution:**

```bash
# Existing requirements.txt
# numpy==1.21.0
# pandas==1.3.2
# scikit-learn==0.24.2
# pytest==7.0.0

# Initialize Poetry
poetry init --no-interaction

# Add production dependencies
poetry add numpy pandas scikit-learn

# Add dev dependencies
poetry add --group dev pytest

# Generate lock file
poetry lock

# Install
poetry install

# Export to verify
poetry export -f requirements.txt --output requirements-poetry.txt

# Compare
diff requirements.txt requirements-poetry.txt
```

### Exercise 3: Workspace Setup

Create a multi-package workspace.

**Solution:**

```bash
# Create structure
mkdir ml-workspace && cd ml-workspace
poetry init --no-interaction

# Create core package
mkdir -p packages/core
cd packages/core
poetry new ml-core .

# Add dependencies
poetry add numpy pandas

cd ../..

# Create models package
mkdir -p packages/models
cd packages/models
poetry new ml-models .

# Add core as dependency
poetry add ../../packages/core --editable

cd ../..

# Install workspace
poetry install
```

---

## 🎯 Key Takeaways

✅ **Poetry**: Modern, all-in-one dependency and packaging tool  
✅ **pyproject.toml**: Single configuration file (PEP 518/621 compliant)  
✅ **poetry.lock**: Deterministic builds with locked dependencies  
✅ **Groups**: Organize dependencies (dev, test, docs)  
✅ **Virtual Envs**: Automatic creation and management  
✅ **Building**: Simple `poetry build` for wheels and sdist  
✅ **Publishing**: Built-in `poetry publish` with token management  
✅ **Workspaces**: Support for monorepos with local dependencies  
✅ **CI/CD**: Easy integration with GitHub Actions, GitLab CI

---

## 🔗 Navigation

- **Previous**: [03-Conda-Packages.md](./03-Conda-Packages.md)
- **Next**: [05-Installing-ML-Libraries.md](./05-Installing-ML-Libraries.md)
- **Up**: [README.md](./README.md)
- **Chapter Home**: [Chapter 3 - Development Environment](../README.md)

---

**Happy Poetry! 📜✨**
