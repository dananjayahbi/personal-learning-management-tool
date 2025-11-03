# 🎮 GPU Setup and Configuration

## Overview

Learn how to select the right GPU, install CUDA and cuDNN, configure TensorFlow and PyTorch for GPU acceleration, and troubleshoot common issues.

---

## 📚 Table of Contents

1. [NVIDIA GPU Selection](#nvidia-gpu-selection)
2. [CUDA Installation](#cuda-installation)
3. [cuDNN Setup](#cudnn-setup)
4. [Verifying GPU in Python](#verifying-gpu-in-python)
5. [TensorFlow GPU Setup](#tensorflow-gpu-setup)
6. [PyTorch GPU Setup](#pytorch-gpu-setup)
7. [Troubleshooting](#troubleshooting)
8. [Multi-GPU Setup](#multi-gpu-setup)
9. [Performance Optimization](#performance-optimization)
10. [Exercises](#exercises)

---

## 🎯 NVIDIA GPU Selection

### Why NVIDIA?

```bash
✅ CUDA ecosystem (industry standard)
✅ cuDNN acceleration
✅ Tensor Cores (RTX series)
✅ Best ML framework support
✅ Mature drivers and tools

AMD GPUs:
❌ Limited ML framework support
❌ ROCm not as mature as CUDA
⚠️ Use only if necessary
```

### GPU Recommendations by Use Case

```python
# Learning & Experimentation
recommended_gpus = {
    "GTX 1660 Ti": {
        "vram": "6GB",
        "price": "$250",
        "good_for": "Small models, learning"
    },
    "RTX 3060": {
        "vram": "12GB",
        "price": "$350-400",
        "good_for": "Most projects, best budget option"
    }
}

# Professional Development
professional_gpus = {
    "RTX 4070": {
        "vram": "12GB",
        "price": "$600",
        "good_for": "Medium models, fast training"
    },
    "RTX 4090": {
        "vram": "24GB",
        "price": "$1,600",
        "good_for": "Large models, research"
    }
}

# Data Center / Production
datacenter_gpus = {
    "A100": {
        "vram": "40GB/80GB",
        "price": "$10,000-15,000",
        "good_for": "Production, very large models"
    },
    "H100": {
        "vram": "80GB",
        "price": "$30,000+",
        "good_for": "Cutting-edge research, LLMs"
    }
}
```

---

## 💿 CUDA Installation

### Check GPU Compatibility

```bash
# Check GPU
lspci | grep -i nvidia
# 01:00.0 VGA compatible controller: NVIDIA Corporation TU117 [GeForce GTX 1650]

# Check compute capability
nvidia-smi --query-gpu=compute_cap --format=csv
# compute_cap
# 7.5

# CUDA requires compute capability >= 3.5
# Recommended >= 6.1
```

### Windows Installation

```powershell
# Method 1: Download installer
# Visit: https://developer.nvidia.com/cuda-downloads
# Select: Windows > x86_64 > 11 > exe (local)
# Download CUDA Toolkit 12.x

# Run installer
# cuda_12.x.x_xxx.xx_windows.exe
# Select all components:
# - CUDA Toolkit
# - Visual Studio Integration
# - NSight
# - Documentation

# Verify installation
nvcc --version
# Cuda compilation tools, release 12.1, V12.1.105

# Check environment variables
echo %CUDA_PATH%
# C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.1

# Method 2: Chocolatey
choco install cuda

# Method 3: Winget
winget install NVIDIA.CUDA
```

### Linux Installation (Ubuntu 22.04)

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install kernel headers
sudo apt install linux-headers-$(uname -r)

# 3. Remove old NVIDIA drivers (if any)
sudo apt-get remove --purge nvidia-*
sudo apt autoremove

# 4. Add NVIDIA repository
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt-get update

# 5. Install CUDA Toolkit
sudo apt-get install cuda-toolkit-12-1

# 6. Install NVIDIA drivers
sudo apt-get install nvidia-driver-535

# 7. Add to PATH (add to ~/.bashrc)
echo 'export PATH=/usr/local/cuda-12.1/bin:$PATH' >> ~/.bashrc
echo 'export LD_LIBRARY_PATH=/usr/local/cuda-12.1/lib64:$LD_LIBRARY_PATH' >> ~/.bashrc
source ~/.bashrc

# 8. Reboot
sudo reboot

# 9. Verify
nvidia-smi
nvcc --version
```

### macOS (M1/M2 Macs)

```bash
# Note: Apple Silicon Macs don't use CUDA
# Use Metal Performance Shaders (MPS) instead

# TensorFlow
pip install tensorflow-macos
pip install tensorflow-metal

# PyTorch
pip install torch torchvision torchaudio

# Verify MPS
python3 -c "import torch; print(torch.backends.mps.is_available())"
# True
```

---

## 🧩 cuDNN Setup

### Why cuDNN?

```bash
cuDNN (CUDA Deep Neural Network library)
- Highly optimized primitives
- Convolutions, pooling, normalization
- RNN operations
- 2-4x faster training than without cuDNN
```

### Download cuDNN

```bash
# 1. Create NVIDIA Developer account
# Visit: https://developer.nvidia.com/cudnn

# 2. Download cuDNN for your CUDA version
# Example: cuDNN 8.9.x for CUDA 12.x
# File: cudnn-linux-x86_64-8.9.x.x_cuda12-archive.tar.xz

# Check CUDA version first
nvcc --version | grep release
# release 12.1
```

### Install cuDNN (Linux)

```bash
# 1. Extract archive
tar -xvf cudnn-linux-x86_64-8.9.7.29_cuda12-archive.tar.xz

# 2. Copy files to CUDA directory
sudo cp cudnn-*-archive/include/cudnn*.h /usr/local/cuda/include 
sudo cp -P cudnn-*-archive/lib/libcudnn* /usr/local/cuda/lib64 
sudo chmod a+r /usr/local/cuda/include/cudnn*.h /usr/local/cuda/lib64/libcudnn*

# 3. Verify
ldconfig -p | grep cudnn
# libcudnn.so.8 -> /usr/local/cuda/lib64/libcudnn.so.8
```

### Install cuDNN (Windows)

```powershell
# 1. Extract cudnn-windows-x86_64-8.9.x.x_cuda12-archive.zip

# 2. Copy files to CUDA directory
# cudnn\bin\*.dll -> C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.1\bin
# cudnn\include\*.h -> C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.1\include
# cudnn\lib\x64\*.lib -> C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.1\lib\x64

# 3. Verify
# Open Python and try importing TensorFlow/PyTorch (tested in next section)
```

---

## ✅ Verifying GPU in Python

### System-Level Verification

```python
# Check nvidia-smi
import subprocess
try:
    result = subprocess.run(['nvidia-smi'], capture_output=True, text=True)
    print(result.stdout)
except FileNotFoundError:
    print("nvidia-smi not found. Check NVIDIA driver installation.")

# Output should show:
# +-----------------------------------------------------------------------------+
# | NVIDIA-SMI 535.xx.xx    Driver Version: 535.xx.xx    CUDA Version: 12.1   |
# |-------------------------------+----------------------+----------------------+
# | GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
# | Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
# |===============================+======================+======================|
# |   0  NVIDIA GeForce ...  Off  | 00000000:01:00.0  On |                  N/A |
# |  0%   45C    P8    10W / 250W |    500MiB / 12288MiB |      0%      Default |
# +-------------------------------+----------------------+----------------------+
```

### TensorFlow GPU Check

```python
import tensorflow as tf

# List physical devices
print("TensorFlow version:", tf.__version__)
print("Num GPUs Available:", len(tf.config.list_physical_devices('GPU')))

# Detailed GPU info
gpus = tf.config.list_physical_devices('GPU')
if gpus:
    for gpu in gpus:
        print(f"GPU: {gpu}")
        details = tf.config.experimental.get_device_details(gpu)
        print(f"  Device details: {details}")
    
    # Test computation
    with tf.device('/GPU:0'):
        a = tf.constant([[1.0, 2.0], [3.0, 4.0]])
        b = tf.constant([[5.0, 6.0], [7.0, 8.0]])
        c = tf.matmul(a, b)
        print(f"Matrix multiplication result:\n{c.numpy()}")
else:
    print("No GPU detected. Check installation.")
```

### PyTorch GPU Check

```python
import torch

# Check CUDA availability
print("PyTorch version:", torch.__version__)
print("CUDA available:", torch.cuda.is_available())

if torch.cuda.is_available():
    print("CUDA version:", torch.version.cuda)
    print("cuDNN version:", torch.backends.cudnn.version())
    print("Number of GPUs:", torch.cuda.device_count())
    
    # GPU details
    for i in range(torch.cuda.device_count()):
        print(f"\nGPU {i}: {torch.cuda.get_device_name(i)}")
        print(f"  Memory: {torch.cuda.get_device_properties(i).total_memory / 1e9:.2f} GB")
        print(f"  Compute Capability: {torch.cuda.get_device_capability(i)}")
    
    # Test computation
    device = torch.device('cuda')
    x = torch.rand(5, 5).to(device)
    y = torch.rand(5, 5).to(device)
    z = torch.mm(x, y)
    print(f"\nMatrix multiplication result:\n{z}")
    print(f"Result device: {z.device}")
else:
    print("CUDA not available. Check installation.")
```

---

## 🔥 TensorFlow GPU Setup

### Installation

```bash
# Install TensorFlow with GPU support
pip install tensorflow[and-cuda]

# Or separate packages
pip install tensorflow
pip install tensorflow-io-gfile-system

# Verify
python -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"
```

### Configuration

```python
import tensorflow as tf

# 1. Memory growth (prevent TF from allocating all GPU memory)
gpus = tf.config.list_physical_devices('GPU')
if gpus:
    try:
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
        print(f"{len(gpus)} GPU(s) configured with memory growth")
    except RuntimeError as e:
        print(e)

# 2. Set memory limit
if gpus:
    tf.config.set_logical_device_configuration(
        gpus[0],
        [tf.config.LogicalDeviceConfiguration(memory_limit=8192)]  # 8GB
    )

# 3. Mixed precision (faster training)
from tensorflow.keras import mixed_precision
policy = mixed_precision.Policy('mixed_float16')
mixed_precision.set_global_policy(policy)

# 4. Training example
model = tf.keras.Sequential([
    tf.keras.layers.Dense(512, activation='relu', input_shape=(784,)),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Load MNIST
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
x_train = x_train.reshape(-1, 784).astype('float32') / 255
x_test = x_test.reshape(-1, 784).astype('float32') / 255

# Train on GPU (automatic)
history = model.fit(
    x_train, y_train,
    batch_size=256,
    epochs=5,
    validation_data=(x_test, y_test)
)
```

---

## 🔦 PyTorch GPU Setup

### Installation

```bash
# Visit: https://pytorch.org/get-started/locally/
# Select: Stable, Linux/Windows/Mac, Pip/Conda, CUDA version

# CUDA 12.1
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# CUDA 11.8
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# CPU only (testing)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# Verify
python -c "import torch; print(torch.cuda.is_available())"
```

### Configuration

```python
import torch
import torch.nn as nn

# 1. Set device
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Using device: {device}")

# 2. Move model to GPU
model = nn.Sequential(
    nn.Linear(784, 512),
    nn.ReLU(),
    nn.Dropout(0.2),
    nn.Linear(512, 10)
).to(device)

# 3. Mixed precision training
from torch.cuda.amp import autocast, GradScaler

scaler = GradScaler()

# 4. Training loop
optimizer = torch.optim.Adam(model.parameters())
criterion = nn.CrossEntropyLoss()

for epoch in range(5):
    for batch_idx, (data, target) in enumerate(train_loader):
        # Move data to GPU
        data, target = data.to(device), target.to(device)
        
        optimizer.zero_grad()
        
        # Mixed precision forward pass
        with autocast():
            output = model(data)
            loss = criterion(output, target)
        
        # Mixed precision backward pass
        scaler.scale(loss).backward()
        scaler.step(optimizer)
        scaler.update()

# 5. Check GPU memory usage
print(f"Allocated: {torch.cuda.memory_allocated() / 1e9:.2f} GB")
print(f"Cached: {torch.cuda.memory_reserved() / 1e9:.2f} GB")

# 6. Clear GPU memory
torch.cuda.empty_cache()
```

---

## 🔧 Troubleshooting

### Problem: GPU Not Detected

```bash
# Check NVIDIA driver
nvidia-smi
# If error: Install/reinstall NVIDIA driver

# Check CUDA
nvcc --version
# If not found: Add to PATH or reinstall CUDA

# Check Python environment
python -c "import torch; print(torch.cuda.is_available())"
# False: Check PyTorch installation

# Reinstall PyTorch with correct CUDA version
pip uninstall torch torchvision torchaudio
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
```

### Problem: CUDA Out of Memory

```python
# Solution 1: Reduce batch size
batch_size = 32  # Try 16, 8, 4...

# Solution 2: Clear cache
import torch
torch.cuda.empty_cache()

# Solution 3: Monitor memory
print(f"Allocated: {torch.cuda.memory_allocated()/1e9:.2f} GB")
print(f"Max allocated: {torch.cuda.max_memory_allocated()/1e9:.2f} GB")

# Solution 4: Use gradient accumulation
accumulation_steps = 4
for i, (data, target) in enumerate(dataloader):
    output = model(data)
    loss = criterion(output, target)
    loss = loss / accumulation_steps
    loss.backward()
    
    if (i + 1) % accumulation_steps == 0:
        optimizer.step()
        optimizer.zero_grad()

# Solution 5: Mixed precision
from torch.cuda.amp import autocast, GradScaler
scaler = GradScaler()
with autocast():
    output = model(data)
    loss = criterion(output, target)
scaler.scale(loss).backward()
```

### Problem: Slow Training

```python
# Check GPU utilization
# Run: nvidia-smi -l 1
# GPU-Util should be 80-100%

# If low utilization:

# 1. Increase batch size
batch_size = 256  # Larger batches = better GPU utilization

# 2. Use more workers for data loading
train_loader = DataLoader(dataset, batch_size=128, num_workers=8)

# 3. Pin memory
train_loader = DataLoader(dataset, batch_size=128, pin_memory=True)

# 4. Prefetch to GPU
import torch
from torch.utils.data import DataLoader

class GpuPrefetcher:
    def __init__(self, loader):
        self.loader = loader
        self.device = torch.device('cuda')
        self.stream = torch.cuda.Stream()
        
    def __iter__(self):
        first = True
        for next_data, next_target in self.loader:
            with torch.cuda.stream(self.stream):
                next_data = next_data.cuda(non_blocking=True)
                next_target = next_target.cuda(non_blocking=True)
            
            if not first:
                yield data, target
            else:
                first = False
                
            torch.cuda.current_stream().wait_stream(self.stream)
            data = next_data
            target = next_target
            
        yield data, target

prefetcher = GpuPrefetcher(train_loader)
for data, target in prefetcher:
    # Training...
    pass
```

---

## 🖥️ Multi-GPU Setup

### Data Parallel (Single Machine)

```python
import torch
import torch.nn as nn

# Create model
model = MyModel()

# Wrap with DataParallel
if torch.cuda.device_count() > 1:
    print(f"Using {torch.cuda.device_count()} GPUs")
    model = nn.DataParallel(model)

model = model.cuda()

# Training (same as single GPU)
for data, target in train_loader:
    data, target = data.cuda(), target.cuda()
    output = model(data)
    loss = criterion(output, target)
    loss.backward()
    optimizer.step()
```

### Distributed Data Parallel (Best Performance)

```python
import torch
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP

# Initialize process group
dist.init_process_group(backend='nccl')

# Set device
local_rank = int(os.environ['LOCAL_RANK'])
torch.cuda.set_device(local_rank)

# Create model
model = MyModel().cuda(local_rank)
model = DDP(model, device_ids=[local_rank])

# Training
for data, target in train_loader:
    data, target = data.cuda(local_rank), target.cuda(local_rank)
    output = model(data)
    loss = criterion(output, target)
    loss.backward()
    optimizer.step()

# Run with:
# torchrun --nproc_per_node=4 train.py
```

---

## ⚡ Performance Optimization

### Optimization Checklist

```python
# ✅ 1. Use mixed precision
from torch.cuda.amp import autocast, GradScaler
scaler = GradScaler()

# ✅ 2. Enable cuDNN autotuner
torch.backends.cudnn.benchmark = True

# ✅ 3. Use larger batch sizes
batch_size = 256  # As large as GPU memory allows

# ✅ 4. Pin memory
train_loader = DataLoader(..., pin_memory=True)

# ✅ 5. Use multiple workers
train_loader = DataLoader(..., num_workers=8)

# ✅ 6. Disable gradient computation for inference
with torch.no_grad():
    output = model(data)

# ✅ 7. Use gradient checkpointing (if OOM)
model.gradient_checkpointing_enable()

# ✅ 8. Compile model (PyTorch 2.0+)
model = torch.compile(model)
```

---

## 💪 Exercises

### Exercise 1: GPU Setup Verification

Verify GPU setup completely.

**Solution:**

```python
import torch
import tensorflow as tf

def verify_gpu_setup():
    print("=== GPU Verification ===\n")
    
    # PyTorch
    print("PyTorch:")
    print(f"  Version: {torch.__version__}")
    print(f"  CUDA Available: {torch.cuda.is_available()}")
    if torch.cuda.is_available():
        print(f"  CUDA Version: {torch.version.cuda}")
        print(f"  cuDNN Version: {torch.backends.cudnn.version()}")
        print(f"  GPU Count: {torch.cuda.device_count()}")
        print(f"  GPU Name: {torch.cuda.get_device_name(0)}")
        print(f"  GPU Memory: {torch.cuda.get_device_properties(0).total_memory / 1e9:.2f} GB")
    
    print("\nTensorFlow:")
    print(f"  Version: {tf.__version__}")
    gpus = tf.config.list_physical_devices('GPU')
    print(f"  GPU Count: {len(gpus)}")
    if gpus:
        for i, gpu in enumerate(gpus):
            print(f"  GPU {i}: {gpu}")
    
    # Test computation
    if torch.cuda.is_available():
        print("\n=== PyTorch GPU Test ===")
        x = torch.rand(1000, 1000).cuda()
        y = torch.rand(1000, 1000).cuda()
        z = torch.mm(x, y)
        print(f"✅ Matrix multiplication successful on {z.device}")
    
    if gpus:
        print("\n=== TensorFlow GPU Test ===")
        with tf.device('/GPU:0'):
            x = tf.random.normal([1000, 1000])
            y = tf.random.normal([1000, 1000])
            z = tf.matmul(x, y)
        print(f"✅ Matrix multiplication successful on GPU")

verify_gpu_setup()
```

---

## 🎯 Key Takeaways

✅ **NVIDIA**: Only option for ML (CUDA ecosystem)  
✅ **CUDA**: Install matching version for your GPU  
✅ **cuDNN**: Essential for fast deep learning  
✅ **Verification**: Test both TensorFlow and PyTorch  
✅ **Memory**: Enable memory growth, use mixed precision  
✅ **Multi-GPU**: Use DistributedDataParallel for best performance  
✅ **Optimization**: Batch size, workers, pin memory, cuDNN benchmark  

---

## 🔗 Navigation

- **Previous**: [01-CPU-vs-GPU.md](./01-CPU-vs-GPU.md)
- **Next**: [03-Cloud-Platforms.md](./03-Cloud-Platforms.md)
- **Up**: [README.md](./README.md)

---

**Happy GPU Computing! 🎮🚀**
