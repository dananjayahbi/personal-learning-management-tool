# 🐍 Conda Package Management

## Overview

Learn comprehensive conda package management for data science and machine learning projects. Understand conda vs pip, manage channels, create reproducible environments, and handle complex scientific computing dependencies.

---

## 📚 Table of Contents

1. [Conda vs pip](#conda-vs-pip)
2. [Understanding Channels](#understanding-channels)
3. [Installing Packages](#installing-packages)
4. [Creating Conda Packages](#creating-conda-packages)
5. [Environment Files](#environment-files)
6. [Mixing Conda and pip](#mixing-conda-and-pip)
7. [Solving Environment Issues](#solving-environment-issues)
8. [Conda Performance](#conda-performance)
9. [Platform-Specific Considerations](#platform-specific-considerations)
10. [Exercises](#exercises)

---

## ⚖️ Conda vs pip

### Key Differences

| Feature | conda | pip |
|---------|-------|-----|
| **Package Types** | Any language (Python, R, C/C++, etc.) | Python only |
| **Dependencies** | Full system (libraries, compilers) | Python packages only |
| **Environment Management** | Built-in | Requires venv/virtualenv |
| **Binary Packages** | Always pre-compiled | Source or wheels |
| **Solver** | Advanced dependency solver | Basic resolver |
| **Speed** | Slower (thorough solving) | Faster (simpler logic) |
| **Package Source** | Anaconda channels | PyPI |

### When to Use Each

```bash
# Use conda for:
# - Scientific computing packages (NumPy, SciPy, Pandas)
# - Packages with C/C++ dependencies (TensorFlow, PyTorch)
# - Non-Python dependencies (CUDA, MKL, compilers)
# - Cross-language projects
conda install numpy scipy matplotlib

# Use pip for:
# - Pure Python packages
# - Packages not available on conda
# - Latest package versions
# - Development packages
pip install black flake8 pytest
```

### Package Availability

```bash
# Check if package is available in conda
conda search package-name

# Check on Anaconda.org
# Visit: https://anaconda.org/search?q=package-name

# If not in conda, use pip
conda search tensorflow-addons  # Not found
pip install tensorflow-addons   # Available
```

### Performance Comparison

```python
# Installation speed test
import time

# conda (thorough but slower)
# Resolves complete environment
# Ensures no conflicts
# Pre-built binaries

# pip (fast but simpler)
# Installs requested package
# Checks immediate dependencies
# May need compilation
```

---

## 📺 Understanding Channels

### What are Channels?

Channels are repositories of conda packages. Think of them as different "stores" for packages.

```bash
# Default channels (Anaconda repository)
defaults

# Popular community channels
conda-forge      # Largest community channel
bioconda         # Bioinformatics packages
pytorch          # PyTorch and related packages
nvidia           # NVIDIA CUDA packages
```

### Channel Priority

```bash
# View channel configuration
conda config --show channels

# Add channel with highest priority
conda config --add channels conda-forge

# Add channel with lowest priority
conda config --append channels conda-forge

# Remove channel
conda config --remove channels conda-forge

# Set strict channel priority
conda config --set channel_priority strict
```

### Channel Priority Modes

```bash
# Strict (default) - prefer packages from higher-priority channels
conda config --set channel_priority strict
# Fastest installation, most consistent environment

# Flexible - prefer latest version regardless of channel
conda config --set channel_priority flexible
# May cause conflicts, use with caution

# Disabled - no priority, use latest
conda config --set channel_priority disabled
# Not recommended
```

### Using Channels

```bash
# Install from specific channel
conda install -c conda-forge package-name

# Install from multiple channels
conda install -c conda-forge -c pytorch package1 package2

# Search in specific channel
conda search -c conda-forge package-name

# List packages from channel
conda search -c conda-forge --override-channels "*"
```

### Recommended Channel Setup

```bash
# Optimal setup for data science/ML
conda config --add channels conda-forge
conda config --add channels defaults
conda config --set channel_priority strict

# Verify configuration
conda config --show channels
# channels:
#   - conda-forge
#   - defaults

# For PyTorch projects
conda config --add channels pytorch
conda config --add channels nvidia
```

### conda-forge

```bash
# Why conda-forge?
# - Community-driven
# - Latest package versions
# - More packages than defaults
# - Free and open-source
# - Frequent updates

# Install conda-forge packages
conda install -c conda-forge numpy pandas scikit-learn

# Make conda-forge default
conda config --add channels conda-forge
conda config --set channel_priority strict

# Now conda install uses conda-forge first
conda install matplotlib  # From conda-forge
```

---

## 📦 Installing Packages

### Basic Installation

```bash
# Install single package
conda install numpy

# Install specific version
conda install numpy=1.21.0

# Install with version constraint
conda install "numpy>=1.20,<1.22"

# Install multiple packages
conda install numpy pandas matplotlib

# Install from channel
conda install -c conda-forge scikit-learn

# Install in specific environment
conda install -n myenv numpy
```

### Advanced Installation

```bash
# Install without dependencies
conda install --no-deps package-name

# Dry run (see what would be installed)
conda install --dry-run numpy

# Install with specific build
conda search numpy  # See available builds
conda install numpy=1.21.0=py39h6ced74f_0

# Update package
conda update numpy

# Update all packages
conda update --all

# Downgrade package
conda install numpy=1.19.0
```

### Batch Installation

```bash
# Install from environment file
conda env create -f environment.yml

# Install packages listed in file
conda install --file requirements.txt

# Example requirements.txt
# numpy=1.21.0
# pandas=1.3.0
# matplotlib=3.4.0
```

### Package Information

```bash
# Search for package
conda search numpy

# Search with wildcards
conda search "numpy*"

# Show package details
conda info numpy

# List installed packages
conda list

# List packages matching pattern
conda list "numpy*"

# List packages from specific channel
conda list -c conda-forge

# Export installed packages
conda list --export > package-list.txt
```

---

## 🏗️ Creating Conda Packages

### Why Create Conda Packages?

- Share internal tools
- Ensure reproducibility
- Distribute compiled code
- Manage complex dependencies

### conda-build Installation

```bash
# Install conda-build
conda install conda-build

# Verify installation
conda build --version
```

### Basic Package Structure

```bash
my_package/
├── meta.yaml           # Package metadata
├── build.sh            # Linux/macOS build script
├── bld.bat             # Windows build script
└── recipe/
    └── conda_build_config.yaml  # Build configuration
```

### meta.yaml Example

```yaml
# meta.yaml
package:
  name: my_package
  version: "1.0.0"

source:
  path: ..  # Or git_url, url for remote sources

build:
  number: 0
  script: python -m pip install --no-deps --ignore-installed .

requirements:
  host:
    - python
    - pip
  run:
    - python
    - numpy >=1.20.0
    - pandas >=1.3.0

test:
  imports:
    - my_package
  commands:
    - pytest

about:
  home: https://github.com/user/my_package
  license: MIT
  summary: "A sample conda package"
  description: |
    Longer description of the package.
    Can span multiple lines.
```

### Building the Package

```bash
# Build package
conda build my_package/

# Build for specific Python version
conda build --python 3.9 my_package/

# Build for multiple Python versions
conda build --python 3.8 --python 3.9 --python 3.10 my_package/

# Skip tests
conda build --no-test my_package/

# Output location
# Linux/macOS: ~/miniconda3/conda-bld/linux-64/my_package-1.0.0-py39_0.tar.bz2
# Windows: C:\Users\User\Miniconda3\conda-bld\win-64\my_package-1.0.0-py39_0.tar.bz2
```

### Installing Local Package

```bash
# Install from local build
conda install --use-local my_package

# Install specific build
conda install /path/to/my_package-1.0.0-py39_0.tar.bz2
```

### Publishing to Anaconda.org

```bash
# Install anaconda-client
conda install anaconda-client

# Login
anaconda login

# Upload package
anaconda upload ~/miniconda3/conda-bld/linux-64/my_package-1.0.0-py39_0.tar.bz2

# Others can now install
conda install -c your-username my_package
```

### Advanced meta.yaml

```yaml
# Complex package with multiple dependencies
package:
  name: ml_toolkit
  version: "2.0.0"

source:
  git_url: https://github.com/user/ml_toolkit.git
  git_tag: v2.0.0

build:
  number: 0
  skip: True  # [py<38]
  script: {{ PYTHON }} -m pip install . -vv

requirements:
  build:
    - {{ compiler('c') }}
    - {{ compiler('cxx') }}
  host:
    - python
    - pip
    - numpy
    - cython
  run:
    - python
    - {{ pin_compatible('numpy') }}
    - scipy >=1.7.0
    - pandas >=1.3.0
    - scikit-learn >=0.24.0

test:
  imports:
    - ml_toolkit
    - ml_toolkit.models
  commands:
    - pytest tests/
  requires:
    - pytest
    - pytest-cov

about:
  home: https://ml-toolkit.readthedocs.io
  license: Apache-2.0
  license_file: LICENSE
  summary: "Machine Learning Toolkit"
  description: |
    Comprehensive ML toolkit with:
    - Data preprocessing
    - Model selection
    - Hyperparameter tuning
  dev_url: https://github.com/user/ml_toolkit
  doc_url: https://ml-toolkit.readthedocs.io

extra:
  recipe-maintainers:
    - user1
    - user2
```

---

## 📄 Environment Files

### environment.yml Structure

```yaml
# environment.yml
name: ml_project
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.9
  - numpy=1.21.0
  - pandas=1.3.0
  - scikit-learn=0.24.2
  - matplotlib=3.4.2
  - jupyter
  - pip
  - pip:
    - tensorflow==2.12.0  # pip-only package
    - transformers==4.20.0
```

### Creating Environment from File

```bash
# Create environment
conda env create -f environment.yml

# Update existing environment
conda env update -f environment.yml

# Update and prune (remove packages not in file)
conda env update -f environment.yml --prune
```

### Exporting Environments

```bash
# Export complete environment (including build strings)
conda env export > environment.yml

# Export without builds (more portable)
conda env export --no-builds > environment.yml

# Export only explicitly installed packages
conda env export --from-history > environment.yml

# Export cross-platform (exclude OS-specific packages)
conda env export --no-builds | grep -v "prefix:" > environment.yml
```

### Platform-Specific Environments

```yaml
# environment.yml with platform selectors
name: ml_project
channels:
  - conda-forge
dependencies:
  - python=3.9
  - numpy
  - pandas
  - pytorch-cpu  # [not win]
  - pytorch  # [win]
  - cudatoolkit=11.8  # [linux]
```

### Multiple Environment Files

```bash
# Base environment
# environment.yml
name: base_ml
channels:
  - conda-forge
dependencies:
  - python=3.9
  - numpy
  - pandas

# Development environment
# environment-dev.yml
name: base_ml
channels:
  - conda-forge
dependencies:
  - python=3.9
  - numpy
  - pandas
  - pytest
  - black
  - flake8

# Create dev environment
conda env create -f environment-dev.yml
```

---

## 🔄 Mixing Conda and pip

### Best Practices

```bash
# ✅ CORRECT ORDER:
# 1. Install conda packages first
conda create -n myenv python=3.9
conda activate myenv
conda install numpy pandas scikit-learn

# 2. Then install pip packages
pip install tensorflow transformers

# ❌ WRONG ORDER:
# Installing conda packages after pip can break dependencies
```

### Why Order Matters

```bash
# conda doesn't know about pip-installed packages
# Installing conda packages after pip may:
# - Overwrite pip packages
# - Break dependencies
# - Create conflicts

# Example problem:
pip install tensorflow  # Installs numpy as dependency
conda install pandas    # May install different numpy version
# Result: TensorFlow may break
```

### Safe Mixing Strategy

```yaml
# environment.yml
name: mixed_env
channels:
  - conda-forge
dependencies:
  # Install ALL conda packages first
  - python=3.9
  - numpy=1.21.0
  - pandas=1.3.0
  - scikit-learn=0.24.0
  - jupyter
  - matplotlib
  - scipy
  
  # Then pip packages (via conda's pip)
  - pip
  - pip:
    - tensorflow==2.12.0
    - transformers==4.20.0
    - wandb==0.12.0
```

### Checking for Conflicts

```bash
# After mixing conda and pip
conda list  # Shows both conda and pip packages

# Check for issues
pip check  # Verifies pip dependencies

# If conflicts arise, recreate environment:
conda env export > backup.yml
conda deactivate
conda env remove -n myenv
conda env create -f backup.yml
```

### pip in Conda Environment

```bash
# Ensure conda's pip (not system pip)
which pip  # Should be in conda env path

# Install with conda's pip
python -m pip install package-name

# Avoid system pip
/usr/bin/pip install package-name  # ❌ Don't do this
```

---

## 🔧 Solving Environment Issues

### Common Issues

#### Slow Solving

```bash
# Problem: Conda takes forever to solve environment
Solving environment: failed with initial frozen solve. Retrying with flexible solve.

# Solution 1: Use mamba (faster solver)
conda install -c conda-forge mamba
mamba install numpy pandas scikit-learn  # Much faster!

# Solution 2: Use strict channel priority
conda config --set channel_priority strict

# Solution 3: Install fewer packages at once
conda install numpy pandas  # Instead of 20 packages
```

#### Conflicting Dependencies

```bash
# Problem: Found conflicts! Looking for incompatible packages.

# Solution 1: Check dependency tree
conda search package-name --info

# Solution 2: Relax version constraints
# Instead of numpy=1.21.0
# Use numpy>=1.20,<1.22

# Solution 3: Create fresh environment
conda create -n fresh_env python=3.9
conda activate fresh_env
conda install package-name
```

#### PackagesNotFoundError

```bash
# Problem: PackagesNotFoundError: The following packages are not available

# Solution 1: Search for correct name
conda search package*

# Solution 2: Try conda-forge
conda install -c conda-forge package-name

# Solution 3: Use pip
pip install package-name

# Solution 4: Check platform availability
conda search --platform linux-64 package-name
```

### Mamba - Faster Conda

```bash
# Install mamba
conda install -c conda-forge mamba

# Use mamba instead of conda (same syntax)
mamba create -n myenv python=3.9
mamba install numpy pandas scikit-learn
mamba update --all

# 10-100x faster than conda!
# Uses libsolv instead of Python-based solver
```

### Debugging Solver Issues

```bash
# Enable verbose output
conda install -v numpy

# Show solver output
conda create -n debug_env --debug python=3.9 numpy

# Check for incompatibilities
conda install --dry-run numpy pandas scipy scikit-learn

# Export solver log
conda install numpy 2>&1 | tee solver.log
```

---

## 🚀 Conda Performance

### Speeding Up Conda

```bash
# Use mamba
conda install -c conda-forge mamba

# Strict channel priority
conda config --set channel_priority strict

# Limit channels
conda config --set channels conda-forge defaults

# Clean cache regularly
conda clean --all

# Use environment files (pre-solved)
conda env create -f environment.yml
```

### Conda Clean

```bash
# Remove unused packages
conda clean --packages

# Remove tarballs
conda clean --tarballs

# Remove index cache
conda clean --index-cache

# Clean everything
conda clean --all

# Dry run to see what would be removed
conda clean --all --dry-run

# Force clean (no confirmation)
conda clean --all -y
```

### Cache Management

```bash
# Check cache location
conda info

# Move cache to faster drive
conda config --add pkgs_dirs /fast_drive/conda_pkgs

# Disable cache (not recommended)
conda install --no-cache numpy
```

---

## 💻 Platform-Specific Considerations

### Windows

```bash
# Activate with cmd.exe (not PowerShell by default)
conda activate myenv

# Configure PowerShell (if needed)
conda init powershell

# Install Windows-specific packages
conda install -c conda-forge m2w64-gcc

# Visual C++ packages
conda install -c conda-forge vs2019_win-64
```

### macOS (Apple Silicon)

```bash
# Check architecture
python -c "import platform; print(platform.machine())"
# arm64 (Apple Silicon) or x86_64 (Intel)

# Use osx-arm64 packages
conda config --env --set subdir osx-arm64

# For Intel packages on Apple Silicon (Rosetta 2)
conda config --env --set subdir osx-64

# Install native packages
conda install -c conda-forge numpy  # ARM-native

# TensorFlow on Apple Silicon
conda install -c apple tensorflow-deps
pip install tensorflow-macos
pip install tensorflow-metal  # GPU acceleration
```

### Linux

```bash
# Check GLIBC version
ldd --version

# Install with specific CUDA version
conda install pytorch torchvision torchaudio pytorch-cuda=11.8 -c pytorch -c nvidia

# MKL optimization
conda install -c conda-forge numpy "blas=*=mkl"

# OpenBLAS alternative
conda install -c conda-forge numpy "blas=*=openblas"
```

### Cross-Platform Environments

```yaml
# environment.yml for all platforms
name: cross_platform
channels:
  - conda-forge
dependencies:
  - python=3.9
  - numpy
  - pandas
  # Platform selectors
  - pytorch-cpu  # [not win]
  - pytorch  # [win]
  - cudatoolkit=11.8  # [linux]
```

---

## 💪 Exercises

### Exercise 1: Channel Management

Set up optimal channel configuration for a data science project.

**Solution:**

```bash
# Reset channels
conda config --remove-key channels

# Add channels in order (highest priority first)
conda config --add channels conda-forge
conda config --add channels defaults

# Set strict priority
conda config --set channel_priority strict

# Verify
conda config --show channels
# channels:
#   - conda-forge
#   - defaults

# Test installation
mamba install numpy pandas scikit-learn matplotlib
# Should install from conda-forge
```

### Exercise 2: Create Reproducible Environment

Create a fully reproducible environment with locked versions.

**Solution:**

```bash
# Create environment with specific versions
conda create -n reproducible python=3.9.7
conda activate reproducible

# Install packages with exact versions
conda install \
  numpy=1.21.0 \
  pandas=1.3.2 \
  scikit-learn=0.24.2 \
  matplotlib=3.4.3 \
  jupyter=1.0.0

# Export with builds (most specific)
conda env export > environment-locked.yml

# Test reproducibility
conda deactivate
conda env remove -n reproducible
conda env create -f environment-locked.yml
# Should create identical environment
```

### Exercise 3: Build Custom Package

Create and install a custom conda package.

**Solution:**

```bash
# Create package structure
mkdir my_ml_utils && cd my_ml_utils

# Create meta.yaml
cat > meta.yaml << 'EOF'
package:
  name: my_ml_utils
  version: "1.0.0"

source:
  path: ..

build:
  number: 0
  script: python -m pip install --no-deps --ignore-installed .

requirements:
  host:
    - python
    - pip
  run:
    - python
    - numpy >=1.20.0
    - pandas >=1.3.0

test:
  imports:
    - my_ml_utils

about:
  home: https://github.com/user/my_ml_utils
  license: MIT
  summary: "ML utility functions"
EOF

# Build package
conda build .

# Install locally
conda install --use-local my_ml_utils

# Verify
python -c "import my_ml_utils; print('Success!')"
```

---

## 🎯 Key Takeaways

✅ **Conda vs pip**: Use conda for scientific packages, pip for pure Python packages  
✅ **Channels**: Add conda-forge for latest packages, use strict priority  
✅ **Mixing**: Install conda packages first, then pip packages  
✅ **Performance**: Use mamba for faster solving, clean cache regularly  
✅ **Reproducibility**: Export environments with `--from-history` or locked versions  
✅ **Solving**: Use mamba, strict priority, and install fewer packages at once  
✅ **Platform**: Consider OS-specific builds, especially on Apple Silicon  
✅ **Environment Files**: Use YAML format, include channels and exact versions

---

## 🔗 Navigation

- **Previous**: [02-pip-Advanced.md](./02-pip-Advanced.md)
- **Next**: [04-Poetry.md](./04-Poetry.md)
- **Up**: [README.md](./README.md)
- **Chapter Home**: [Chapter 3 - Development Environment](../README.md)

---

**Happy Conda Package Management! 🐍📦**
