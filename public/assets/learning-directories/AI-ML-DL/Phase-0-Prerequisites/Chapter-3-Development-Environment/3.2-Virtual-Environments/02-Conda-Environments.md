# 02 - Conda Environments

## 📋 Introduction

Conda is a powerful, open-source package and environment management system that runs on Windows, macOS, and Linux. Unlike venv, conda can manage packages from any language, not just Python, and can handle complex dependencies including non-Python libraries.

**Why Conda?**
- ✅ Manages Python AND non-Python dependencies (C, C++, R, etc.)
- ✅ Can install multiple Python versions in different environments
- ✅ Better handling of scientific computing libraries (NumPy, SciPy, etc.)
- ✅ Optimized binary packages for faster performance
- ✅ Extensive pre-built package ecosystem
- ✅ Industry standard for data science

---

## 🎯 Conda vs venv

| Feature | venv | conda |
|---------|------|-------|
| **Built-in** | ✅ Python 3.3+ | ❌ Requires installation |
| **Python version management** | ❌ Uses system Python | ✅ Can install any Python version |
| **Non-Python packages** | ❌ pip only | ✅ Full support (CUDA, MKL, etc.) |
| **Binary optimization** | ⚠️ Limited | ✅ Optimized scientific packages |
| **Package conflicts** | ⚠️ Manual resolution | ✅ Automatic SAT solver |
| **Speed (creation)** | ⚡ Fast (~5 sec) | 🐢 Slower (~30-60 sec) |
| **Disk space** | 💾 ~10-20 MB | 💾 ~500 MB - 5 GB |
| **Best for** | Simple Python projects | Data science, ML, complex dependencies |

---

## 📦 Installing Conda

### Option 1: Anaconda (Full Distribution)

**Size:** ~3-5 GB
**Includes:** 250+ pre-installed packages, GUI (Anaconda Navigator)

```bash
# Download from https://www.anaconda.com/download

# Linux/Mac installation
bash Anaconda3-2023.09-Linux-x86_64.sh

# Follow prompts
# Choose installation location
# Initialize conda in shell: yes

# Verify installation
conda --version
conda list
```

### Option 2: Miniconda (Minimal Distribution)

**Size:** ~400 MB
**Includes:** conda, Python, minimal packages

```bash
# Download from https://docs.conda.io/en/latest/miniconda.html

# Linux
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh

# macOS
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh
bash Miniconda3-latest-MacOSX-x86_64.sh

# Windows
# Download and run .exe installer from website

# Verify
conda --version
python --version
```

**Recommendation:** Use Miniconda for ML work - install only what you need.

### Post-Installation Setup

```bash
# Initialize conda for your shell
conda init bash     # For bash
conda init zsh      # For zsh
conda init fish     # For fish
conda init powershell  # For PowerShell

# Restart shell or
source ~/.bashrc    # Linux/Mac
```

---

## 🚀 Creating Conda Environments

### Basic Creation

```bash
# Create environment with default Python version
conda create --name myenv

# Create with specific Python version
conda create --name py310 python=3.10
conda create --name py311 python=3.11
conda create --name py39 python=3.9

# Create with packages
conda create --name ml-env python=3.10 numpy pandas matplotlib

# Create with specific versions
conda create --name myenv python=3.10 numpy=1.24 pandas=2.0

# Create from environment.yml
conda env create -f environment.yml
```

### Specifying Location

```bash
# Create in specific directory
conda create --prefix ./envs/myenv python=3.10

# Create in custom location
conda create --prefix /path/to/envs/myenv python=3.10
```

### Cloning Environments

```bash
# Clone existing environment
conda create --name newenv --clone existingenv

# Clone base environment
conda create --name myenv --clone base
```

---

## 📥 Activating & Deactivating

### Activation

```bash
# Activate environment
conda activate myenv

# Your prompt changes
(myenv) user@machine:~$

# Activate specific Python version environment
conda activate py310
(py310) user@machine:~$
```

### Deactivation

```bash
# Deactivate current environment
conda deactivate

# Return to base environment
user@machine:~$
```

### Automatic Activation (Optional)

```bash
# Don't auto-activate base on shell start (recommended)
conda config --set auto_activate_base false

# Re-enable auto-activation
conda config --set auto_activate_base true
```

---

## 📦 Installing Packages

### Basic Installation

```bash
# Activate environment first
conda activate myenv

# Install single package
conda install numpy

# Install multiple packages
conda install numpy pandas matplotlib scikit-learn

# Install specific version
conda install numpy=1.24.0

# Install from specific channel
conda install -c conda-forge package_name

# Install with pip (when conda package unavailable)
pip install package_name
```

### Conda Channels

Channels are repositories hosting conda packages:

```bash
# Default channels
# - defaults (Anaconda main channel)
# - conda-forge (community channel)

# Install from conda-forge
conda install -c conda-forge xgboost

# Add conda-forge to default channels
conda config --add channels conda-forge

# Set channel priority
conda config --set channel_priority strict

# View channels
conda config --show channels
```

### Channel Priority

```bash
# View current configuration
conda config --show channel_priority

# Strict priority (recommended)
# Uses packages from highest-priority channel
conda config --set channel_priority strict

# Flexible priority
# Can mix packages from different channels
conda config --set channel_priority flexible
```

---

## 📋 Managing Packages

### Listing Packages

```bash
# List all packages in current environment
conda list

# List packages matching pattern
conda list numpy

# List packages in specific environment
conda list -n myenv

# Export package list
conda list --export > package-list.txt
```

### Updating Packages

```bash
# Update specific package
conda update numpy

# Update all packages
conda update --all

# Update conda itself
conda update conda

# Update Anaconda distribution
conda update anaconda
```

### Removing Packages

```bash
# Remove package
conda remove numpy

# Remove multiple packages
conda remove numpy pandas

# Remove from specific environment
conda remove -n myenv numpy
```

### Package Information

```bash
# Show package details
conda search numpy

# Show installed package info
conda list numpy

# Search available versions
conda search "numpy[version='>=1.20']"
```

---

## 🗂️ Environment Management

### Listing Environments

```bash
# List all environments
conda env list
conda info --envs

# Output:
# # conda environments:
# #
# base                  *  /home/user/miniconda3
# myenv                    /home/user/miniconda3/envs/myenv
# py310                    /home/user/miniconda3/envs/py310
```

### Environment Information

```bash
# Show environment details
conda info

# Show specific environment info
conda info --envs

# Show current environment
echo $CONDA_DEFAULT_ENV  # Unix/Mac
echo %CONDA_DEFAULT_ENV%  # Windows
```

### Removing Environments

```bash
# Remove environment by name
conda env remove --name myenv

# Remove environment by path
conda env remove --prefix ./envs/myenv

# Alternative
conda remove --name myenv --all
```

---

## 📄 Environment Files

### environment.yml

This is conda's equivalent of requirements.txt, but more powerful.

#### Basic environment.yml

```yaml
name: ml-project
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.10
  - numpy=1.24
  - pandas=2.0
  - matplotlib=3.7
  - scikit-learn=1.3
  - jupyter=1.0
```

#### Advanced environment.yml

```yaml
name: deep-learning
channels:
  - conda-forge
  - pytorch
  - defaults
dependencies:
  - python=3.10
  - numpy=1.24
  - pandas>=2.0
  - matplotlib
  - seaborn
  # PyTorch from pytorch channel
  - pytorch::pytorch=2.0
  - pytorch::torchvision
  - pytorch::torchaudio
  # conda-forge packages
  - conda-forge::scikit-learn=1.3
  # pip dependencies
  - pip
  - pip:
    - transformers==4.30.0
    - datasets==2.14.0
    - tensorboard
```

### Creating Environment from File

```bash
# Create from environment.yml
conda env create -f environment.yml

# Create with different name
conda env create -f environment.yml -n custom-name

# Update existing environment from file
conda env update -f environment.yml --prune
```

### Exporting Environments

```bash
# Export to environment.yml
conda env export > environment.yml

# Export without builds (more portable)
conda env export --no-builds > environment.yml

# Export from specific environment
conda env export -n myenv > environment.yml

# Export only explicitly installed packages
conda env export --from-history > environment.yml
```

#### Export Comparison

**Full export:**
```yaml
name: myenv
channels:
  - defaults
dependencies:
  - blas=1.0=mkl
  - ca-certificates=2023.08.22=haa95532_0
  - numpy=1.24.3=py310h055cbcc_0
  - numpy-base=1.24.3=py310h65a83cf_0
  # ... 100+ lines with exact builds
```

**From history (recommended for sharing):**
```yaml
name: myenv
channels:
  - defaults
dependencies:
  - python=3.10
  - numpy
  - pandas
  - matplotlib
```

---

## 🔄 Conda + Pip Best Practices

### Installation Order

```bash
# 1. Create environment with conda
conda create -n myenv python=3.10

# 2. Activate
conda activate myenv

# 3. Install as much as possible with conda
conda install numpy pandas matplotlib scikit-learn

# 4. Install remaining with pip
pip install some-package-not-in-conda

# 5. Export both
conda env export > environment.yml
pip freeze > requirements.txt
```

### Why This Order?

1. **Conda first** - Better dependency resolution
2. **Pip second** - For packages not in conda
3. **Never mix in same command** - Can cause conflicts

### Mixed Environment File

```yaml
name: mixed-env
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.10
  - numpy
  - pandas
  - pip
  - pip:
    - package-only-on-pypi
    - another-pip-package
```

---

## 🎯 Real-World Examples

### Example 1: Machine Learning Environment

```bash
# Create ML environment
conda create -n ml-env python=3.10

# Activate
conda activate ml-env

# Install packages
conda install numpy pandas scikit-learn matplotlib seaborn jupyter

# Install additional tools
conda install -c conda-forge imbalanced-learn optuna

# Verify
python -c "import sklearn; print(sklearn.__version__)"

# Export
conda env export --from-history > environment.yml
```

### Example 2: Deep Learning (TensorFlow)

```bash
# Create TensorFlow environment
conda create -n tf-env python=3.10

conda activate tf-env

# Install TensorFlow and dependencies
conda install -c conda-forge tensorflow-gpu cudatoolkit=11.8 cudnn

# Or CPU version
# conda install tensorflow

# Install additional packages
conda install numpy pandas matplotlib jupyter

# Verify GPU
python -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"

# Export
conda env export > tensorflow-env.yml
```

### Example 3: Deep Learning (PyTorch)

```bash
# Create PyTorch environment
conda create -n pytorch-env python=3.10

conda activate pytorch-env

# Install PyTorch (check pytorch.org for your system)
# For CUDA 11.8
conda install pytorch torchvision torchaudio pytorch-cuda=11.8 -c pytorch -c nvidia

# For CPU only
# conda install pytorch torchvision torchaudio cpuonly -c pytorch

# Install additional packages
conda install numpy pandas matplotlib jupyter

# Verify GPU
python -c "import torch; print(torch.cuda.is_available())"

# Export
conda env export > pytorch-env.yml
```

### Example 4: Data Science Environment

```bash
conda create -n datasci python=3.10

conda activate datasci

# Core data science stack
conda install numpy pandas scipy scikit-learn statsmodels

# Visualization
conda install matplotlib seaborn plotly

# Jupyter
conda install jupyter jupyterlab ipykernel

# Database connections
conda install sqlalchemy psycopg2 pymongo

# Excel support
conda install openpyxl xlrd

# Export
conda env export --from-history > datasci-env.yml
```

---

## 🛠️ Advanced Conda Features

### Environment Variables

```bash
# Set environment variables for conda env
conda env config vars set MY_VAR=value

# Set multiple
conda env config vars set VAR1=value1 VAR2=value2

# List environment variables
conda env config vars list

# Remove environment variable
conda env config vars unset MY_VAR

# Variables are activated with environment
conda activate myenv
echo $MY_VAR
```

### Activation Scripts

Create scripts that run when environment is activated/deactivated:

```bash
# Location: $CONDA_PREFIX/etc/conda/activate.d/

# Create activation script
mkdir -p $CONDA_PREFIX/etc/conda/activate.d
echo 'export MY_VAR="Hello"' > $CONDA_PREFIX/etc/conda/activate.d/env_vars.sh

# Create deactivation script
mkdir -p $CONDA_PREFIX/etc/conda/deactivate.d
echo 'unset MY_VAR' > $CONDA_PREFIX/etc/conda/deactivate.d/env_vars.sh

# Test
conda deactivate && conda activate myenv
echo $MY_VAR  # Should print "Hello"
```

### Conda Build

Create your own conda packages:

```bash
# Install conda-build
conda install conda-build

# Create recipe
mkdir my-package
cd my-package

# Create meta.yaml
cat > meta.yaml << EOF
package:
  name: my-package
  version: "1.0.0"

requirements:
  build:
    - python
  run:
    - python
    - numpy

test:
  imports:
    - my_package
EOF

# Build
conda build .

# Install locally
conda install --use-local my-package
```

---

## 🐛 Troubleshooting

### Issue 1: Conda command not found

**Solution:**
```bash
# Reinitialize conda
~/miniconda3/bin/conda init

# Or add to PATH manually
export PATH="$HOME/miniconda3/bin:$PATH"  # Unix/Mac

# Windows
set PATH=%USERPROFILE%\miniconda3\Scripts;%PATH%

# Restart shell
```

### Issue 2: Slow package installation

**Solution:**
```bash
# Use mamba (faster conda)
conda install mamba -c conda-forge

# Use mamba instead of conda
mamba install numpy pandas

# Or use libmamba solver
conda install -n base conda-libmamba-solver
conda config --set solver libmamba
```

### Issue 3: Environment conflicts

**Solution:**
```bash
# Remove problematic environment
conda env remove -n myenv

# Recreate fresh
conda create -n myenv python=3.10

# Install packages one by one to identify conflict
conda install numpy
conda install pandas
# etc.
```

### Issue 4: Package not found

**Solution:**
```bash
# Try different channel
conda install -c conda-forge package_name

# Search for package
conda search package_name

# Check if available on PyPI
pip search package_name  # or google it

# Install with pip
pip install package_name
```

### Issue 5: Wrong Python version

**Solution:**
```bash
# Check Python version
python --version

# If wrong, ensure environment is activated
conda activate myenv

# If still wrong, recreate environment
conda env remove -n myenv
conda create -n myenv python=3.10
```

---

## 🧹 Cleaning Up

### Remove Unused Packages

```bash
# Remove unused packages and cache
conda clean --all

# Remove package cache
conda clean --packages

# Remove index cache
conda clean --index-cache

# Remove tarballs
conda clean --tarballs

# Dry run (see what would be removed)
conda clean --all --dry-run
```

### Check Disk Usage

```bash
# Show disk usage
du -sh ~/miniconda3
du -sh ~/miniconda3/envs/*
du -sh ~/miniconda3/pkgs

# Remove old environment
conda env remove -n old-env
```

---

## 📊 Conda Configuration

### View Configuration

```bash
# Show all configuration
conda config --show

# Show specific setting
conda config --show channels

# Show configuration sources
conda config --show-sources
```

### Common Configuration

```bash
# Add channel
conda config --add channels conda-forge

# Remove channel
conda config --remove channels conda-forge

# Set channel priority
conda config --set channel_priority strict

# Disable auto-activation of base
conda config --set auto_activate_base false

# Always show channel URLs
conda config --set show_channel_urls true

# Use strict channel priority
conda config --set channel_priority strict
```

### .condarc File

Configuration is stored in `~/.condarc`:

```yaml
channels:
  - conda-forge
  - defaults

channel_priority: strict

auto_activate_base: false

show_channel_urls: true

create_default_packages:
  - pip
  - ipykernel
```

---

## 🎓 Exercises

### Exercise 1: Create Data Science Environment
Create a conda environment with Python 3.10 and essential data science packages.

**Solution:**
```bash
conda create -n datasci python=3.10 numpy pandas matplotlib seaborn jupyter
conda activate datasci
python -c "import pandas; print(pandas.__version__)"
conda env export --from-history > datasci-env.yml
```

### Exercise 2: Clone and Modify
Clone an environment and add new packages.

**Solution:**
```bash
conda create -n myenv-clone --clone myenv
conda activate myenv-clone
conda install scipy
conda list | grep scipy
```

### Exercise 3: Multiple Python Versions
Create environments with different Python versions.

**Solution:**
```bash
conda create -n py39 python=3.9
conda create -n py310 python=3.10
conda create -n py311 python=3.11

conda activate py39 && python --version && conda deactivate
conda activate py310 && python --version && conda deactivate
conda activate py311 && python --version && conda deactivate
```

### Exercise 4: Mixed Conda/Pip Installation
Create environment with both conda and pip packages.

**Solution:**
```bash
conda create -n mixed python=3.10
conda activate mixed
conda install numpy pandas scikit-learn
pip install transformers datasets
pip list | grep transformers
conda list | grep numpy
```

---

## 🆚 When to Use Conda vs venv

### Use Conda When:
- ✅ Working with scientific computing (NumPy, SciPy, Pandas)
- ✅ Need GPU libraries (CUDA, cuDNN)
- ✅ Need different Python versions
- ✅ Working with complex dependencies
- ✅ Need non-Python dependencies (R, C++, system libraries)
- ✅ Data science/ML projects

### Use venv When:
- ✅ Simple Python web applications
- ✅ Minimal dependencies
- ✅ Need lightweight solution
- ✅ All packages available on PyPI
- ✅ Fast environment creation needed
- ✅ Deploying to production (smaller footprint)

---

## 📚 Additional Resources

### Official Documentation
- [Conda Documentation](https://docs.conda.io/)
- [Conda Cheat Sheet](https://docs.conda.io/projects/conda/en/latest/user-guide/cheatsheet.html)
- [Managing Environments](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html)

### Tools
- [Mamba](https://mamba.readthedocs.io/) - Faster conda
- [Conda-forge](https://conda-forge.org/) - Community packages

### Comparisons
- [Conda vs Pip vs Virtualenv](https://stackoverflow.com/questions/20994716/what-is-the-difference-between-pip-and-conda)

---

## 🎯 Key Takeaways

1. ✅ **Conda = Environment + Package Manager** - Handles Python versions and packages
2. ✅ **Conda handles non-Python dependencies** - CUDA, MKL, system libraries
3. ✅ **Use Miniconda** - Start minimal, install what you need
4. ✅ **environment.yml for reproducibility** - Document your environment
5. ✅ **conda-forge for latest packages** - Community channel
6. ✅ **Install conda first, pip second** - Better dependency resolution

---

## 🔗 Navigation

- **Up**: [3.2 Virtual Environments Overview](./README.md)
- **Previous**: [01 - venv Module](./01-venv-Module.md)
- **Next**: [03 - Poetry Dependency Management](./03-Poetry.md)

---

**Remember:** Conda is the standard for data science and ML environments. It simplifies complex dependency management and provides optimized packages for scientific computing!
