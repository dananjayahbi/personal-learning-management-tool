# 03 - Poetry for Modern Dependency Management

## 📋 Introduction

Poetry is a modern Python dependency management tool that provides a unified interface for project setup, dependency management, packaging, and publishing. It's designed to simplify and modernize Python project workflows.

**Why Poetry?**
- ✅ Modern dependency resolution with lock files
- ✅ Single `pyproject.toml` configuration file
- ✅ Automatic virtual environment management
- ✅ Built-in project scaffolding
- ✅ Package building and publishing
- ✅ Deterministic builds
- ✅ Better dependency conflict resolution

---

## 🎯 Poetry vs Other Tools

| Feature | Poetry | pip + venv | conda |
|---------|--------|------------|-------|
| **Dependency Resolution** | ✅ Advanced SAT solver | ⚠️ Basic | ✅ SAT solver |
| **Lock Files** | ✅ poetry.lock | ❌ Manual pins | ⚠️ environment.yml |
| **Virtual Env Management** | ✅ Automatic | ⚠️ Manual | ✅ Automatic |
| **Project Scaffolding** | ✅ Built-in | ❌ Manual | ❌ Manual |
| **Package Publishing** | ✅ Built-in | ⚠️ Separate tools | ❌ conda-build |
| **Configuration** | ✅ pyproject.toml | ⚠️ setup.py + requirements.txt | ⚠️ environment.yml |
| **Non-Python deps** | ❌ No | ❌ No | ✅ Yes |
| **Learning Curve** | 📊 Moderate | 📈 Easy | 📊 Moderate |
| **Best for** | Modern Python projects | Simple projects | Data science |

---

## 📦 Installing Poetry

### Recommended Installation (Official)

```bash
# Linux, macOS, Windows (WSL)
curl -sSL https://install.python-poetry.org | python3 -

# Or using pip (not recommended for isolation)
pip install --user poetry

# Verify installation
poetry --version
```

### Add Poetry to PATH

```bash
# Linux/Mac (add to ~/.bashrc or ~/.zshrc)
export PATH="$HOME/.local/bin:$PATH"

# Windows PowerShell (add to profile)
$env:PATH += ";$HOME\AppData\Roaming\Python\Scripts"

# Verify
poetry --version
```

### Update Poetry

```bash
# Update to latest version
poetry self update

# Update to specific version
poetry self update 1.6.0

# Show current version
poetry --version
```

---

## 🚀 Creating New Projects

### Create New Project

```bash
# Create new project
poetry new my-project

# Creates:
my-project/
├── my_project/
│   └── __init__.py
├── tests/
│   └── __init__.py
├── pyproject.toml
└── README.md
```

### Project Structure Created

```
my-project/
├── my_project/          # Source code
│   └── __init__.py
├── tests/               # Test files
│   └── __init__.py
├── pyproject.toml       # Project configuration
└── README.md            # Documentation
```

### Initialize Existing Project

```bash
# Initialize Poetry in existing directory
cd existing-project
poetry init

# Interactive prompts:
# - Package name
# - Version
# - Description
# - Author
# - License
# - Dependencies

# Creates pyproject.toml
```

---

## 📄 pyproject.toml

This is Poetry's configuration file (PEP 518 standard).

### Basic pyproject.toml

```toml
[tool.poetry]
name = "my-ml-project"
version = "0.1.0"
description = "Machine Learning project"
authors = ["Your Name <you@example.com>"]
readme = "README.md"
license = "MIT"
python = "^3.10"

[tool.poetry.dependencies]
python = "^3.10"
numpy = "^1.24.0"
pandas = "^2.0.0"
scikit-learn = "^1.3.0"
matplotlib = "^3.7.0"

[tool.poetry.group.dev.dependencies]
pytest = "^7.4.0"
black = "^23.7.0"
flake8 = "^6.0.0"
mypy = "^1.4.0"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

### Advanced pyproject.toml (ML Project)

```toml
[tool.poetry]
name = "ml-project"
version = "0.1.0"
description = "Deep Learning Classification"
authors = ["Your Name <you@example.com>"]
readme = "README.md"
license = "MIT"
homepage = "https://github.com/username/ml-project"
repository = "https://github.com/username/ml-project"
keywords = ["machine-learning", "deep-learning", "ai"]
classifiers = [
    "Development Status :: 3 - Alpha",
    "Intended Audience :: Science/Research",
    "Topic :: Scientific/Engineering :: Artificial Intelligence"
]

[tool.poetry.dependencies]
python = "^3.10"
# Core ML libraries
numpy = "^1.24.0"
pandas = "^2.0.0"
scikit-learn = "^1.3.0"
# Deep Learning
torch = "^2.0.0"
torchvision = "^0.15.0"
# Visualization
matplotlib = "^3.7.0"
seaborn = "^0.12.0"
# Utilities
tqdm = "^4.65.0"
pyyaml = "^6.0"

[tool.poetry.group.dev.dependencies]
# Testing
pytest = "^7.4.0"
pytest-cov = "^4.1.0"
# Code quality
black = "^23.7.0"
flake8 = "^6.0.0"
mypy = "^1.4.0"
isort = "^5.12.0"
# Notebooks
jupyter = "^1.0.0"
ipykernel = "^6.25.0"

[tool.poetry.group.gpu]
optional = true

[tool.poetry.group.gpu.dependencies]
torch = {version = "^2.0.0", source = "pytorch-gpu"}
torchvision = {version = "^0.15.0", source = "pytorch-gpu"}

[[tool.poetry.source]]
name = "pytorch-gpu"
url = "https://download.pytorch.org/whl/cu118"
priority = "supplemental"

[tool.poetry.scripts]
train = "ml_project.train:main"
evaluate = "ml_project.evaluate:main"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"

[tool.black]
line-length = 100
target-version = ['py310']

[tool.isort]
profile = "black"
line_length = 100

[tool.mypy]
python_version = "3.10"
warn_return_any = true
warn_unused_configs = true

[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = "test_*.py"
python_functions = "test_*"
```

---

## 📥 Managing Dependencies

### Adding Dependencies

```bash
# Add package
poetry add numpy

# Add with version constraint
poetry add "numpy>=1.24,<2.0"
poetry add numpy@^1.24.0

# Add latest version
poetry add numpy@latest

# Add from git repository
poetry add git+https://github.com/user/repo.git

# Add from specific branch
poetry add git+https://github.com/user/repo.git#branch-name
```

### Development Dependencies

```bash
# Add dev dependency
poetry add --group dev pytest

# Add multiple dev dependencies
poetry add --group dev pytest black flake8 mypy

# Alternative syntax (older Poetry versions)
poetry add --dev pytest
```

### Dependency Groups

```bash
# Create custom groups
poetry add --group test pytest pytest-cov
poetry add --group docs sphinx sphinx-rtd-theme
poetry add --group lint black flake8 mypy

# Install specific group
poetry install --with test
poetry install --with test,docs

# Install without dev dependencies
poetry install --without dev

# Install only specific group
poetry install --only test
```

### Removing Dependencies

```bash
# Remove package
poetry remove numpy

# Remove dev dependency
poetry remove --group dev pytest
```

### Updating Dependencies

```bash
# Update all dependencies
poetry update

# Update specific package
poetry update numpy

# Update to latest compatible version
poetry add numpy@latest

# Show outdated packages
poetry show --outdated
```

---

## 🌐 Virtual Environments

Poetry automatically manages virtual environments.

### Environment Location

```bash
# Show environment info
poetry env info

# Output:
# Virtualenv
# Python:         3.10.12
# Implementation: CPython
# Path:           /home/user/.cache/pypoetry/virtualenvs/my-project-abc123-py3.10
# Executable:     /home/user/.cache/pypoetry/virtualenvs/my-project-abc123-py3.10/bin/python
```

### Managing Environments

```bash
# List environments
poetry env list

# Use specific Python version
poetry env use python3.10
poetry env use python3.11
poetry env use /usr/bin/python3.10

# Show environment path
poetry env info --path

# Remove environment
poetry env remove python3.10
poetry env remove /full/path/to/python

# Create environment in project directory
poetry config virtualenvs.in-project true
```

### Using the Environment

```bash
# Run command in environment
poetry run python script.py
poetry run pytest
poetry run jupyter notebook

# Activate shell (spawns new shell)
poetry shell

# Exit shell
exit

# Run Python REPL
poetry run python
```

---

## 🔒 Lock Files

### poetry.lock

Poetry creates `poetry.lock` to ensure deterministic installs.

**Purpose:**
- ✅ Exact versions of all dependencies
- ✅ Transitive dependencies locked
- ✅ Reproducible installs
- ✅ Team consistency

```bash
# Install from lock file
poetry install

# Update lock file (without installing)
poetry lock

# Update lock file and install
poetry update

# Install without updating lock
poetry install --no-update
```

### Lock File Workflow

```bash
# 1. Add dependency
poetry add pandas

# 2. Lock file is automatically updated
# poetry.lock now contains pandas and all its dependencies

# 3. Commit both files
git add pyproject.toml poetry.lock
git commit -m "Add pandas dependency"

# 4. Team members install exact versions
poetry install
```

---

## 📦 Installing Dependencies

### Basic Installation

```bash
# Install all dependencies from pyproject.toml and poetry.lock
poetry install

# Install without dev dependencies
poetry install --without dev

# Install only main dependencies
poetry install --only main

# Install with specific groups
poetry install --with test,docs

# Sync (remove extra packages)
poetry install --sync
```

### Fresh Installation

```bash
# Remove existing environment and reinstall
poetry env remove python
poetry install

# Or manually
rm -rf .venv
poetry install
```

---

## 🏗️ Building and Publishing

### Building Package

```bash
# Build distribution packages
poetry build

# Creates:
# dist/
# ├── my_project-0.1.0-py3-none-any.whl
# └── my_project-0.1.0.tar.gz
```

### Publishing to PyPI

```bash
# Configure PyPI credentials
poetry config pypi-token.pypi your-token

# Publish to PyPI
poetry publish

# Build and publish in one step
poetry publish --build

# Publish to test PyPI
poetry config repositories.testpypi https://test.pypi.org/legacy/
poetry publish -r testpypi
```

---

## 🎯 Real-World Examples

### Example 1: Simple ML Project

```bash
# Create project
poetry new ml-classification
cd ml-classification

# Add dependencies
poetry add numpy pandas scikit-learn matplotlib jupyter

# Add dev dependencies
poetry add --group dev pytest black flake8

# Install everything
poetry install

# Run Jupyter
poetry run jupyter notebook

# Run script
poetry run python train.py
```

### Example 2: Deep Learning Project

```bash
poetry new deep-learning-project
cd deep-learning-project

# Core dependencies
poetry add numpy pandas matplotlib seaborn tqdm

# PyTorch
poetry add torch torchvision torchaudio

# Dev dependencies
poetry add --group dev pytest pytest-cov black mypy jupyter

# Install
poetry install

# Activate shell
poetry shell

# Now work normally
python train.py
jupyter notebook
```

### Example 3: Project with Multiple Environments

```bash
# Create project
poetry new multi-env-project
cd multi-env-project

# Create Python 3.10 environment
poetry env use python3.10
poetry install

# Create Python 3.11 environment
poetry env use python3.11
poetry install

# List environments
poetry env list

# Switch between them
poetry env use 3.10
poetry run python --version

poetry env use 3.11
poetry run python --version
```

---

## 🛠️ Advanced Features

### Scripts

Define custom commands in `pyproject.toml`:

```toml
[tool.poetry.scripts]
train = "ml_project.train:main"
evaluate = "ml_project.evaluate:main"
preprocess = "ml_project.data:preprocess"
```

**Usage:**
```bash
poetry run train
poetry run evaluate --model best_model.pkl
poetry run preprocess --input data.csv
```

### Plugins

```bash
# Install Poetry plugins
poetry self add poetry-plugin-export

# Export requirements.txt
poetry export -f requirements.txt --output requirements.txt

# Export without hashes
poetry export -f requirements.txt --output requirements.txt --without-hashes

# Export only dev dependencies
poetry export --group dev -f requirements.txt --output requirements-dev.txt
```

### Source Repositories

```toml
[[tool.poetry.source]]
name = "private-repo"
url = "https://pypi.mycompany.com/simple/"
priority = "supplemental"

[[tool.poetry.source]]
name = "pytorch"
url = "https://download.pytorch.org/whl/cu118"
priority = "supplemental"
```

---

## 🐛 Troubleshooting

### Issue 1: Dependency Resolution Fails

**Solution:**
```bash
# Clear cache
poetry cache clear pypi --all

# Try with verbose output
poetry add numpy -vvv

# Update Poetry
poetry self update

# Manually edit pyproject.toml and run
poetry lock
poetry install
```

### Issue 2: Environment Not Found

**Solution:**
```bash
# List environments
poetry env list

# Remove all environments
poetry env list | xargs -I {} poetry env remove {}

# Recreate
poetry install
```

### Issue 3: Lock File Out of Sync

**Solution:**
```bash
# Update lock file
poetry lock --no-update

# Or force update
poetry lock

# Reinstall
poetry install
```

### Issue 4: Command Not Found

**Solution:**
```bash
# Use poetry run
poetry run python script.py

# Or activate shell
poetry shell

# Or add .venv/bin to PATH
export PATH="$(poetry env info --path)/bin:$PATH"
```

---

## 🎓 Exercises

### Exercise 1: Create Poetry Project
Create a new Poetry project with ML dependencies.

**Solution:**
```bash
poetry new ml-exercise
cd ml-exercise
poetry add numpy pandas scikit-learn matplotlib
poetry add --group dev pytest
poetry install
poetry run python -c "import sklearn; print(sklearn.__version__)"
```

### Exercise 2: Manage Multiple Environments
Create environments with different Python versions.

**Solution:**
```bash
poetry env use python3.9
poetry install
poetry run python --version

poetry env use python3.10
poetry install
poetry run python --version

poetry env list
```

### Exercise 3: Export Requirements
Export Poetry dependencies to requirements.txt.

**Solution:**
```bash
poetry self add poetry-plugin-export
poetry export -f requirements.txt --output requirements.txt --without-hashes
cat requirements.txt
```

---

## 🆚 When to Use Poetry

### Use Poetry When:
- ✅ Starting new Python project
- ✅ Need deterministic builds
- ✅ Want modern dependency management
- ✅ Building distributable packages
- ✅ Working in a team (reproducibility)
- ✅ Need better conflict resolution

### Use Other Tools When:
- ⚠️ Need non-Python dependencies → Use conda
- ⚠️ Legacy project with setup.py → Stay with pip
- ⚠️ Simple script → Use venv
- ⚠️ Heavy scientific computing → Use conda

---

## 📚 Additional Resources

### Official Documentation
- [Poetry Documentation](https://python-poetry.org/docs/)
- [Poetry GitHub](https://github.com/python-poetry/poetry)
- [pyproject.toml Specification](https://peps.python.org/pep-0518/)

### Tutorials
- [Real Python - Poetry Guide](https://realpython.com/dependency-management-python-poetry/)
- [Poetry Best Practices](https://python-poetry.org/docs/basic-usage/)

---

## 🎯 Key Takeaways

1. ✅ **Modern dependency management** - Better than pip + requirements.txt
2. ✅ **Lock files** - Deterministic installs with poetry.lock
3. ✅ **Automatic virtual environments** - No manual venv creation
4. ✅ **Single configuration** - pyproject.toml for everything
5. ✅ **Better conflict resolution** - Advanced SAT solver
6. ✅ **Built-in publishing** - Easy package distribution

---

## 🔗 Navigation

- **Up**: [3.2 Virtual Environments Overview](./README.md)
- **Previous**: [02 - Conda Environments](./02-Conda-Environments.md)
- **Next**: [04 - Docker Containers](./04-Docker-Containers.md)

---

**Remember:** Poetry modernizes Python project management. It's especially valuable for teams and projects that need reproducible builds!
