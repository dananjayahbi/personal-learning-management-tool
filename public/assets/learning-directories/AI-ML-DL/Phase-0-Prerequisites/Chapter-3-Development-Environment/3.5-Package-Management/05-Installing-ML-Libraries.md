# 🤖 Installing Machine Learning Libraries

## Overview

Master the installation of essential machine learning and deep learning frameworks including TensorFlow, PyTorch, scikit-learn, and the complete ML ecosystem. Learn platform-specific considerations, GPU setup, and troubleshooting common issues.

---

## 📚 Table of Contents

1. [TensorFlow Installation](#tensorflow-installation)
2. [PyTorch Installation](#pytorch-installation)
3. [Scikit-learn and SciPy Stack](#scikit-learn-and-scipy-stack)
4. [Jupyter Ecosystem](#jupyter-ecosystem)
5. [Computer Vision Libraries](#computer-vision-libraries)
6. [NLP Libraries](#nlp-libraries)
7. [GPU Verification](#gpu-verification)
8. [Platform-Specific Considerations](#platform-specific-considerations)
9. [Common Installation Issues](#common-installation-issues)
10. [Exercises](#exercises)

---

## 🧠 TensorFlow Installation

### CPU-Only Installation

```bash
# Using pip (simplest)
pip install tensorflow

# Using conda
conda install -c conda-forge tensorflow

# Verify installation
python -c "import tensorflow as tf; print(tf.__version__)"
python -c "import tensorflow as tf; print('GPUs:', tf.config.list_physical_devices('GPU'))"
```

### GPU Installation (CUDA)

```bash
# Prerequisites:
# - NVIDIA GPU with CUDA Compute Capability 3.5 or higher
# - NVIDIA driver installed

# Check CUDA version
nvidia-smi
# +-----------------------------------------------------------------------------+
# | NVIDIA-SMI 525.60.11    Driver Version: 525.60.11    CUDA Version: 12.0   |

# TensorFlow 2.15+ (CUDA 11.8)
pip install tensorflow[and-cuda]
# Includes: tensorrt, cuda-nvrtc, cudnn

# TensorFlow 2.10-2.14 (CUDA 11.2)
# Install CUDA toolkit first, then:
pip install tensorflow-gpu

# Using conda (recommended for GPU)
conda create -n tf_gpu python=3.10
conda activate tf_gpu
conda install -c conda-forge cudatoolkit=11.8 cudnn=8.6
pip install tensorflow==2.15.0
```

### TensorFlow with Specific CUDA Version

```bash
# TensorFlow 2.15 (CUDA 11.8, cuDNN 8.6)
pip install tensorflow==2.15.0

# TensorFlow 2.13 (CUDA 11.8, cuDNN 8.6)
pip install tensorflow==2.13.0

# TensorFlow 2.10 (CUDA 11.2, cuDNN 8.1)
pip install tensorflow==2.10.0

# Legacy TensorFlow 1.15 (CUDA 10.0)
pip install tensorflow-gpu==1.15.0
```

### TensorFlow Verification

```python
# verify_tensorflow.py
import tensorflow as tf

print(f"TensorFlow version: {tf.__version__}")
print(f"Built with CUDA: {tf.test.is_built_with_cuda()}")
print(f"GPU available: {tf.test.is_gpu_available()}")
print(f"GPU devices: {tf.config.list_physical_devices('GPU')}")

# Test GPU computation
if tf.config.list_physical_devices('GPU'):
    with tf.device('/GPU:0'):
        a = tf.constant([[1.0, 2.0], [3.0, 4.0]])
        b = tf.constant([[1.0, 2.0], [3.0, 4.0]])
        c = tf.matmul(a, b)
    print(f"GPU computation result:\n{c}")
```

### TensorFlow Addons and Extensions

```bash
# TensorFlow Addons
pip install tensorflow-addons

# TensorFlow Datasets
pip install tensorflow-datasets

# TensorFlow Hub
pip install tensorflow-hub

# TensorFlow Model Optimization
pip install tensorflow-model-optimization

# TensorFlow Probability
pip install tensorflow-probability

# TensorFlow Text
pip install tensorflow-text

# TensorFlow IO
pip install tensorflow-io

# TensorBoard
pip install tensorboard
```

---

## 🔥 PyTorch Installation

### CPU-Only Installation

```bash
# Using pip
pip install torch torchvision torchaudio

# Using conda
conda install pytorch torchvision torchaudio cpuonly -c pytorch

# Verify installation
python -c "import torch; print(torch.__version__)"
python -c "import torch; print('CUDA available:', torch.cuda.is_available())"
```

### GPU Installation (CUDA)

```bash
# CUDA 11.8
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# CUDA 12.1
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# Using conda (CUDA 11.8)
conda install pytorch torchvision torchaudio pytorch-cuda=11.8 -c pytorch -c nvidia

# Using conda (CUDA 12.1)
conda install pytorch torchvision torchaudio pytorch-cuda=12.1 -c pytorch -c nvidia
```

### PyTorch for ROCm (AMD GPUs)

```bash
# ROCm 5.7
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm5.7

# Using conda
conda install pytorch torchvision torchaudio -c pytorch -c conda-forge
```

### PyTorch Nightly Builds

```bash
# Latest development version
pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu118
```

### PyTorch Verification

```python
# verify_pytorch.py
import torch

print(f"PyTorch version: {torch.__version__}")
print(f"CUDA available: {torch.cuda.is_available()}")
print(f"CUDA version: {torch.version.cuda}")
print(f"cuDNN version: {torch.backends.cudnn.version()}")
print(f"Number of GPUs: {torch.cuda.device_count()}")

if torch.cuda.is_available():
    print(f"GPU name: {torch.cuda.get_device_name(0)}")
    print(f"GPU memory: {torch.cuda.get_device_properties(0).total_memory / 1e9:.2f} GB")
    
    # Test GPU computation
    x = torch.rand(5, 3).cuda()
    y = torch.rand(5, 3).cuda()
    z = x + y
    print(f"GPU computation successful: {z.is_cuda}")
```

### PyTorch Ecosystem

```bash
# PyTorch Lightning (high-level framework)
pip install pytorch-lightning

# Torchmetrics (ML metrics)
pip install torchmetrics

# TorchText (NLP utilities)
pip install torchtext

# TorchAudio (audio processing)
pip install torchaudio

# TorchServe (model serving)
pip install torchserve torch-model-archiver

# Timm (image models)
pip install timm

# Hugging Face Transformers (NLP models)
pip install transformers
```

---

## 📊 Scikit-learn and SciPy Stack

### Complete SciPy Stack

```bash
# Using pip
pip install numpy scipy pandas matplotlib scikit-learn

# Using conda (recommended)
conda install numpy scipy pandas matplotlib scikit-learn

# Verify installation
python -c "import numpy; print(f'NumPy {numpy.__version__}')"
python -c "import scipy; print(f'SciPy {scipy.__version__}')"
python -c "import pandas; print(f'Pandas {pandas.__version__}')"
python -c "import sklearn; print(f'Scikit-learn {sklearn.__version__}')"
```

### Data Science Stack

```bash
# Complete data science environment
conda create -n data_science python=3.10
conda activate data_science

# Core libraries
conda install numpy pandas matplotlib seaborn scikit-learn scipy

# Jupyter ecosystem
conda install jupyter jupyterlab ipython

# Additional visualization
conda install plotly bokeh altair

# Statistical analysis
conda install statsmodels

# Additional tools
conda install scikit-image networkx sympy
```

### Scikit-learn Extensions

```bash
# Imbalanced-learn (handling imbalanced datasets)
pip install imbalanced-learn

# Scikit-optimize (hyperparameter optimization)
pip install scikit-optimize

# Category Encoders
pip install category-encoders

# XGBoost
pip install xgboost

# LightGBM
pip install lightgbm

# CatBoost
pip install catboost
```

### NumPy with MKL (Intel Math Kernel Library)

```bash
# Using conda (includes MKL by default)
conda install numpy

# Verify MKL
python -c "import numpy; numpy.show_config()"
# Should show mkl_info

# Or explicitly install with MKL
conda install "numpy[mkl]"
```

---

## 📓 Jupyter Ecosystem

### JupyterLab Installation

```bash
# Using pip
pip install jupyterlab

# Using conda
conda install -c conda-forge jupyterlab

# Launch JupyterLab
jupyter lab

# Install on specific port
jupyter lab --port 8889
```

### Jupyter Extensions

```bash
# Variable Inspector
pip install lckr-jupyterlab-variableinspector

# Code Formatter (Black)
pip install jupyterlab-code-formatter black isort
jupyter server extension enable --py jupyterlab_code_formatter

# Git extension
pip install jupyterlab-git

# TOC (Table of Contents)
pip install jupyterlab-toc

# System Monitor
pip install jupyterlab-system-monitor

# Spellchecker
pip install jupyterlab-spellchecker

# LaTeX
pip install jupyterlab-latex

# Plotly extension
jupyter labextension install jupyterlab-plotly
```

### Jupyter Widgets (ipywidgets)

```bash
# Install ipywidgets
pip install ipywidgets

# Enable widgets extension
jupyter nbextension enable --py widgetsnbextension

# For JupyterLab
jupyter labextension install @jupyter-widgets/jupyterlab-manager

# Additional widget libraries
pip install bqplot  # 2D plotting
pip install ipyleaflet  # Interactive maps
pip install ipyvolume  # 3D visualization
```

### JupyterHub (Multi-user Jupyter)

```bash
# Install JupyterHub
pip install jupyterhub

# Install notebook server
pip install notebook

# Create config
jupyterhub --generate-config

# Start JupyterHub
jupyterhub
```

### Jupyter Kernels

```bash
# List installed kernels
jupyter kernelspec list

# Install Python kernel
python -m ipykernel install --user --name myenv --display-name "Python (myenv)"

# Remove kernel
jupyter kernelspec uninstall myenv

# Install R kernel
# In R console:
# install.packages('IRkernel')
# IRkernel::installspec()

# Install Julia kernel
# In Julia REPL:
# using Pkg
# Pkg.add("IJulia")
```

---

## 📷 Computer Vision Libraries

### OpenCV

```bash
# OpenCV (Python bindings)
pip install opencv-python

# OpenCV with contrib modules (extra features)
pip install opencv-contrib-python

# Headless (no GUI dependencies)
pip install opencv-python-headless

# Using conda
conda install -c conda-forge opencv

# Verify
python -c "import cv2; print(cv2.__version__)"
```

### Pillow (PIL)

```bash
# Install Pillow
pip install Pillow

# Using conda
conda install pillow

# Verify
python -c "from PIL import Image; print(Image.__version__)"
```

### Albumentations (Data Augmentation)

```bash
# Install albumentations
pip install albumentations

# With additional dependencies
pip install -U albumentations[imgaug]

# Verify
python -c "import albumentations; print(albumentations.__version__)"
```

### Other CV Libraries

```bash
# Scikit-image
pip install scikit-image

# ImageIO (reading/writing images)
pip install imageio

# Kornia (differentiable CV)
pip install kornia

# MMDetection (object detection)
pip install mmdet

# Detectron2 (Facebook's detection framework)
python -m pip install 'git+https://github.com/facebookresearch/detectron2.git'

# YOLO
pip install ultralytics  # YOLOv8
```

---

## 📝 NLP Libraries

### Hugging Face Ecosystem

```bash
# Transformers (pre-trained models)
pip install transformers

# Datasets (NLP datasets)
pip install datasets

# Tokenizers (fast tokenization)
pip install tokenizers

# Accelerate (distributed training)
pip install accelerate

# Evaluate (evaluation metrics)
pip install evaluate

# Verify
python -c "import transformers; print(transformers.__version__)"
```

### spaCy

```bash
# Install spaCy
pip install spacy

# Download language model
python -m spacy download en_core_web_sm  # English (small)
python -m spacy download en_core_web_lg  # English (large)

# Verify
python -c "import spacy; nlp = spacy.load('en_core_web_sm'); print('spaCy loaded')"
```

### NLTK

```bash
# Install NLTK
pip install nltk

# Download NLTK data
python -m nltk.downloader all  # All data
python -m nltk.downloader popular  # Popular packages

# Verify
python -c "import nltk; print(nltk.__version__)"
```

### Other NLP Libraries

```bash
# Gensim (topic modeling)
pip install gensim

# TextBlob (simple NLP)
pip install textblob

# Flair (NLP framework)
pip install flair

# AllenNLP
pip install allennlp

# Stanford CoreNLP (requires Java)
pip install stanfordcorenlp
```

---

## 🎮 GPU Verification

### Check NVIDIA GPU

```bash
# Check GPU availability
nvidia-smi

# Detailed GPU info
nvidia-smi -L

# Monitor GPU usage
nvidia-smi -l 1  # Update every 1 second

# Query specific info
nvidia-smi --query-gpu=name,driver_version,memory.total,memory.free --format=csv
```

### CUDA Verification

```bash
# Check CUDA version
nvcc --version

# Check CUDA installation
cat /usr/local/cuda/version.txt  # Linux
# or
ls /usr/local/ | grep cuda

# Test CUDA
nvidia-smi
# Look for "CUDA Version: X.X"
```

### Python GPU Check Script

```python
# gpu_check.py - Comprehensive GPU verification
import sys

def check_tensorflow():
    try:
        import tensorflow as tf
        print(f"✅ TensorFlow {tf.__version__}")
        gpus = tf.config.list_physical_devices('GPU')
        print(f"   GPUs: {len(gpus)}")
        for gpu in gpus:
            print(f"   - {gpu.name}")
    except ImportError:
        print("❌ TensorFlow not installed")
    except Exception as e:
        print(f"⚠️  TensorFlow error: {e}")

def check_pytorch():
    try:
        import torch
        print(f"✅ PyTorch {torch.__version__}")
        print(f"   CUDA available: {torch.cuda.is_available()}")
        if torch.cuda.is_available():
            print(f"   CUDA version: {torch.version.cuda}")
            print(f"   GPUs: {torch.cuda.device_count()}")
            for i in range(torch.cuda.device_count()):
                print(f"   - {torch.cuda.get_device_name(i)}")
    except ImportError:
        print("❌ PyTorch not installed")
    except Exception as e:
        print(f"⚠️  PyTorch error: {e}")

def check_nvidia():
    import subprocess
    try:
        result = subprocess.run(['nvidia-smi'], capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ NVIDIA driver installed")
            # Parse GPU info from nvidia-smi
            for line in result.stdout.split('\n'):
                if 'NVIDIA' in line or 'CUDA Version' in line:
                    print(f"   {line.strip()}")
        else:
            print("❌ NVIDIA driver not found")
    except FileNotFoundError:
        print("❌ nvidia-smi not found")

if __name__ == "__main__":
    print("🔍 GPU Configuration Check\n")
    check_nvidia()
    print()
    check_tensorflow()
    print()
    check_pytorch()
```

### Run GPU Benchmark

```python
# gpu_benchmark.py
import time
import numpy as np

def benchmark_tensorflow():
    import tensorflow as tf
    
    if not tf.config.list_physical_devices('GPU'):
        print("No GPU found for TensorFlow")
        return
    
    with tf.device('/GPU:0'):
        # Matrix multiplication
        a = tf.random.normal([5000, 5000])
        b = tf.random.normal([5000, 5000])
        
        start = time.time()
        c = tf.matmul(a, b)
        c.numpy()  # Force execution
        elapsed = time.time() - start
        
        print(f"TensorFlow GPU: {elapsed:.3f}s for 5000x5000 matmul")

def benchmark_pytorch():
    import torch
    
    if not torch.cuda.is_available():
        print("No GPU found for PyTorch")
        return
    
    # Matrix multiplication
    a = torch.randn(5000, 5000).cuda()
    b = torch.randn(5000, 5000).cuda()
    
    torch.cuda.synchronize()
    start = time.time()
    c = torch.mm(a, b)
    torch.cuda.synchronize()
    elapsed = time.time() - start
    
    print(f"PyTorch GPU: {elapsed:.3f}s for 5000x5000 matmul")

if __name__ == "__main__":
    benchmark_tensorflow()
    benchmark_pytorch()
```

---

## 💻 Platform-Specific Considerations

### Windows

```bash
# Install Visual C++ Build Tools (for compilation)
# Download from: https://visualstudio.microsoft.com/visual-cpp-build-tools/

# Install CUDA Toolkit
# Download from: https://developer.nvidia.com/cuda-downloads

# Install cuDNN
# Download from: https://developer.nvidia.com/cudnn
# Extract and copy files to CUDA directory

# Set environment variables
setx CUDA_PATH "C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.8"
setx PATH "%PATH%;C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.8\bin"

# Install TensorFlow with GPU
pip install tensorflow[and-cuda]

# Install PyTorch with CUDA
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

### macOS (Apple Silicon)

```bash
# TensorFlow for Apple Silicon
conda create -n tf_mac python=3.10
conda activate tf_mac
conda install -c apple tensorflow-deps
pip install tensorflow-macos
pip install tensorflow-metal  # GPU acceleration

# PyTorch for Apple Silicon
pip install torch torchvision torchaudio

# Verify Metal (GPU) support
python -c "import tensorflow as tf; print(tf.config.list_physical_devices())"

# scikit-learn optimized for Apple Silicon
conda install -c conda-forge scikit-learn
```

### Linux (Ubuntu/Debian)

```bash
# Install NVIDIA drivers
sudo apt update
sudo apt install nvidia-driver-525  # Or latest version

# Install CUDA Toolkit
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-ubuntu2204.pin
sudo mv cuda-ubuntu2204.pin /etc/apt/preferences.d/cuda-repository-pin-600
wget https://developer.download.nvidia.com/compute/cuda/12.0.0/local_installers/cuda-repo-ubuntu2204-12-0-local_12.0.0-525.60.13-1_amd64.deb
sudo dpkg -i cuda-repo-ubuntu2204-12-0-local_12.0.0-525.60.13-1_amd64.deb
sudo cp /var/cuda-repo-ubuntu2204-12-0-local/cuda-*-keyring.gpg /usr/share/keyrings/
sudo apt update
sudo apt install cuda

# Install cuDNN
# Download .deb file from NVIDIA
sudo dpkg -i cudnn-local-repo-ubuntu2204-8.9.0.131_1.0-1_amd64.deb
sudo apt update
sudo apt install libcudnn8 libcudnn8-dev

# Set environment variables in ~/.bashrc
export PATH=/usr/local/cuda/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH

# Verify installation
nvidia-smi
nvcc --version
```

---

## 🔧 Common Installation Issues

### Issue 1: CUDA Version Mismatch

```bash
# Problem: TensorFlow/PyTorch CUDA version doesn't match installed CUDA

# Check installed CUDA
nvidia-smi  # Look at CUDA Version

# Solution 1: Install matching framework version
# For CUDA 11.8:
pip install tensorflow==2.15.0
pip install torch --index-url https://download.pytorch.org/whl/cu118

# Solution 2: Use conda (manages CUDA automatically)
conda install -c conda-forge cudatoolkit=11.8
conda install -c conda-forge tensorflow-gpu
```

### Issue 2: DLL Load Failed (Windows)

```bash
# Problem: ImportError: DLL load failed while importing _pywrap_tensorflow

# Solution 1: Install Visual C++ Redistributable
# Download and install:
# https://aka.ms/vs/17/release/vc_redist.x64.exe

# Solution 2: Install TensorFlow with CUDA bundled
pip install tensorflow[and-cuda]

# Solution 3: Add CUDA to PATH
setx PATH "%PATH%;C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.8\bin"
```

### Issue 3: Import Errors

```bash
# Problem: ModuleNotFoundError: No module named 'tensorflow'/'torch'

# Solution 1: Verify environment
which python  # Make sure it's in the right environment
pip list | grep tensorflow

# Solution 2: Reinstall in correct environment
conda activate myenv
pip install tensorflow

# Solution 3: Check Python version compatibility
python --version  # TensorFlow 2.15 requires Python 3.9-3.11
```

### Issue 4: GPU Not Detected

```bash
# Problem: tf.config.list_physical_devices('GPU') returns []

# Solution 1: Verify NVIDIA driver
nvidia-smi

# Solution 2: Check CUDA installation
nvcc --version

# Solution 3: Reinstall GPU version
pip uninstall tensorflow
pip install tensorflow[and-cuda]

# Solution 4: Set CUDA paths (Linux)
export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH
```

### Issue 5: Out of Memory (OOM)

```python
# Problem: ResourceExhaustedError: OOM when allocating tensor

# Solution 1: Limit GPU memory growth (TensorFlow)
import tensorflow as tf
gpus = tf.config.list_physical_devices('GPU')
for gpu in gpus:
    tf.config.experimental.set_memory_growth(gpu, True)

# Solution 2: Set memory limit (TensorFlow)
tf.config.set_logical_device_configuration(
    gpus[0],
    [tf.config.LogicalDeviceConfiguration(memory_limit=4096)]  # 4GB
)

# Solution 3: Reduce batch size
batch_size = 16  # Instead of 64

# Solution 4: Use mixed precision (PyTorch)
import torch
torch.set_float32_matmul_precision('medium')
```

---

## 💪 Exercises

### Exercise 1: Complete ML Environment

Create a complete ML environment with all major frameworks.

**Solution:**

```bash
# Create environment
conda create -n ml_complete python=3.10
conda activate ml_complete

# Install core scientific stack
conda install numpy scipy pandas matplotlib seaborn scikit-learn

# Install deep learning frameworks
conda install -c conda-forge cudatoolkit=11.8 cudnn=8.6
pip install tensorflow==2.15.0
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# Install Jupyter
conda install jupyterlab ipython

# Install additional libraries
pip install transformers datasets
pip install opencv-python albumentations
pip install xgboost lightgbm catboost

# Verify installation
python gpu_check.py
```

### Exercise 2: GPU Benchmark

Test GPU performance across frameworks.

**Solution:**

```python
# benchmark_all.py
import time
import numpy as np

def benchmark_numpy():
    a = np.random.randn(5000, 5000)
    b = np.random.randn(5000, 5000)
    
    start = time.time()
    c = np.dot(a, b)
    elapsed = time.time() - start
    print(f"NumPy CPU: {elapsed:.3f}s")

def benchmark_tensorflow_cpu():
    import tensorflow as tf
    with tf.device('/CPU:0'):
        a = tf.random.normal([5000, 5000])
        b = tf.random.normal([5000, 5000])
        
        start = time.time()
        c = tf.matmul(a, b)
        c.numpy()
        elapsed = time.time() - start
        print(f"TensorFlow CPU: {elapsed:.3f}s")

def benchmark_tensorflow_gpu():
    import tensorflow as tf
    if tf.config.list_physical_devices('GPU'):
        with tf.device('/GPU:0'):
            a = tf.random.normal([5000, 5000])
            b = tf.random.normal([5000, 5000])
            
            start = time.time()
            c = tf.matmul(a, b)
            c.numpy()
            elapsed = time.time() - start
            print(f"TensorFlow GPU: {elapsed:.3f}s")

def benchmark_pytorch_cpu():
    import torch
    a = torch.randn(5000, 5000)
    b = torch.randn(5000, 5000)
    
    start = time.time()
    c = torch.mm(a, b)
    elapsed = time.time() - start
    print(f"PyTorch CPU: {elapsed:.3f}s")

def benchmark_pytorch_gpu():
    import torch
    if torch.cuda.is_available():
        a = torch.randn(5000, 5000).cuda()
        b = torch.randn(5000, 5000).cuda()
        
        torch.cuda.synchronize()
        start = time.time()
        c = torch.mm(a, b)
        torch.cuda.synchronize()
        elapsed = time.time() - start
        print(f"PyTorch GPU: {elapsed:.3f}s")

if __name__ == "__main__":
    print("🏃 Running benchmarks...\n")
    benchmark_numpy()
    benchmark_tensorflow_cpu()
    benchmark_tensorflow_gpu()
    benchmark_pytorch_cpu()
    benchmark_pytorch_gpu()
```

### Exercise 3: Environment Export

Export environment for reproducibility.

**Solution:**

```bash
# Export conda environment
conda env export --from-history > environment.yml

# Export pip requirements
pip list --format=freeze > requirements.txt

# Export with exact versions
conda env export > environment-locked.yml
pip freeze > requirements-locked.txt

# Create portable environment (cross-platform)
conda env export --no-builds | grep -v "^prefix: " > environment-portable.yml
```

---

## 🎯 Key Takeaways

✅ **TensorFlow**: Use `tensorflow[and-cuda]` for automatic GPU setup  
✅ **PyTorch**: Specify CUDA version in install URL  
✅ **Conda**: Best for managing CUDA/cuDNN dependencies  
✅ **GPU Verification**: Always verify GPU detection after installation  
✅ **Platform-Specific**: macOS Apple Silicon needs special builds  
✅ **Version Matching**: Match framework CUDA version with installed CUDA  
✅ **Virtual Environments**: Use separate environments for different projects  
✅ **Troubleshooting**: Check drivers, CUDA version, and environment paths

---

## 🔗 Navigation

- **Previous**: [04-Poetry.md](./04-Poetry.md)
- **Up**: [README.md](./README.md)
- **Chapter Home**: [Chapter 3 - Development Environment](../README.md)

---

**Happy ML Library Installation! 🤖🚀**
