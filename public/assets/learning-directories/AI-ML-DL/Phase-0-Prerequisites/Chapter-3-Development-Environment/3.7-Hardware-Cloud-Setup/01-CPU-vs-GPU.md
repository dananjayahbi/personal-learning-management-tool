# 💻 CPU vs GPU for Machine Learning

## Overview

Understand when to use CPU vs GPU for ML tasks, hardware specifications, performance differences, and recommendations for building ML workstations.

---

## 📚 Table of Contents

1. [Introduction](#introduction)
2. [When CPU is Sufficient](#when-cpu-is-sufficient)
3. [When GPU is Necessary](#when-gpu-is-necessary)
4. [CPU Specifications for ML](#cpu-specifications-for-ml)
5. [GPU Specifications Explained](#gpu-specifications-explained)
6. [Memory (RAM vs VRAM)](#memory-ram-vs-vram)
7. [Storage Considerations](#storage-considerations)
8. [Workstation Build Recommendations](#workstation-build-recommendations)
9. [Performance Comparisons](#performance-comparisons)
10. [Exercises](#exercises)

---

## 🎯 Introduction

### CPU vs GPU Architecture

```
CPU (Central Processing Unit)
- Few cores (4-64)
- High clock speed
- Complex instructions
- Sequential processing
- Good for: General computing

GPU (Graphics Processing Unit)
- Thousands of cores
- Lower clock speed
- Simple instructions
- Parallel processing
- Good for: Matrix operations
```

### Why GPU for ML?

```python
# Matrix multiplication (core of deep learning)
# CPU: Sequential
for i in range(n):
    for j in range(m):
        for k in range(p):
            C[i][j] += A[i][k] * B[k][j]
# Time: O(n*m*p)

# GPU: Parallel
# All C[i][j] computed simultaneously
# Time: Much faster!

# Example speedup
import time
import numpy as np

# CPU (NumPy on CPU)
a = np.random.rand(5000, 5000)
b = np.random.rand(5000, 5000)

start = time.time()
c = np.dot(a, b)
cpu_time = time.time() - start
print(f"CPU Time: {cpu_time:.2f}s")
# CPU Time: 2.45s

# GPU (CuPy/PyTorch on GPU)
import torch
a_gpu = torch.rand(5000, 5000).cuda()
b_gpu = torch.rand(5000, 5000).cuda()

start = time.time()
c_gpu = torch.mm(a_gpu, b_gpu)
torch.cuda.synchronize()
gpu_time = time.time() - start
print(f"GPU Time: {gpu_time:.2f}s")
# GPU Time: 0.05s

print(f"Speedup: {cpu_time/gpu_time:.1f}x")
# Speedup: 49.0x
```

---

## 💻 When CPU is Sufficient

### Suitable Tasks

```bash
✅ Data preprocessing
✅ Feature engineering
✅ Traditional ML (sklearn):
   - Linear/Logistic Regression
   - Decision Trees
   - Random Forests
   - k-NN
   - SVM (small datasets)
✅ Small datasets (< 10,000 samples)
✅ Simple neural networks (< 1M parameters)
✅ Inference on small models
✅ Data exploration and visualization
✅ Testing and debugging code
```

### Example: Traditional ML

```python
# Random Forest on CPU (scikit-learn)
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
import time

# Load data
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y)

# Train on CPU
start = time.time()
rf = RandomForestClassifier(n_estimators=100, n_jobs=-1)
rf.fit(X_train, y_train)
cpu_time = time.time() - start

score = rf.score(X_test, y_test)
print(f"CPU Time: {cpu_time:.3f}s, Accuracy: {score:.3f}")
# CPU Time: 0.125s, Accuracy: 0.974
# ✅ Fast enough on CPU!
```

### When CPU is Better

```bash
1. Development/Debugging
   - Fast iteration
   - No GPU setup needed
   - Works everywhere

2. Small Models
   - Overhead of GPU transfer > computation time
   - Example: Linear regression

3. Non-Parallelizable Tasks
   - Sequential operations
   - Control flow heavy code

4. Cost Considerations
   - CPU instances cheaper
   - Free tier availability

5. Inference at Scale
   - CPU clusters can be cost-effective
   - Lower latency for small batches
```

---

## 🚀 When GPU is Necessary

### Necessary Tasks

```bash
✅ Deep learning training:
   - Convolutional Neural Networks (CNNs)
   - Recurrent Neural Networks (RNNs)
   - Transformers
   - GANs
✅ Large datasets (> 100,000 samples)
✅ Large models (> 10M parameters)
✅ Computer vision (images, videos)
✅ Natural Language Processing (NLP)
✅ Training from scratch
✅ Hyperparameter tuning (many experiments)
✅ Real-time inference (high throughput)
```

### Example: Deep Learning

```python
# CNN Training (PyTorch)
import torch
import torch.nn as nn
import torchvision
from torch.utils.data import DataLoader
import time

# Model
model = torchvision.models.resnet50(pretrained=False, num_classes=10)

# Data
train_data = torchvision.datasets.CIFAR10(
    root='./data', train=True, download=True,
    transform=torchvision.transforms.ToTensor()
)
train_loader = DataLoader(train_data, batch_size=128, shuffle=True)

# CPU Training
device = 'cpu'
model_cpu = model.to(device)
optimizer = torch.optim.Adam(model_cpu.parameters())
criterion = nn.CrossEntropyLoss()

start = time.time()
for batch_idx, (data, target) in enumerate(train_loader):
    if batch_idx == 10: break  # Only 10 batches for demo
    data, target = data.to(device), target.to(device)
    optimizer.zero_grad()
    output = model_cpu(data)
    loss = criterion(output, target)
    loss.backward()
    optimizer.step()
cpu_time = time.time() - start
print(f"CPU Time (10 batches): {cpu_time:.2f}s")
# CPU Time: 180.45s

# GPU Training
device = 'cuda'
model_gpu = model.to(device)
optimizer = torch.optim.Adam(model_gpu.parameters())

start = time.time()
for batch_idx, (data, target) in enumerate(train_loader):
    if batch_idx == 10: break
    data, target = data.to(device), target.to(device)
    optimizer.zero_grad()
    output = model_gpu(data)
    loss = criterion(output, target)
    loss.backward()
    optimizer.step()
gpu_time = time.time() - start
print(f"GPU Time (10 batches): {gpu_time:.2f}s")
# GPU Time: 3.21s

print(f"Speedup: {cpu_time/gpu_time:.1f}x")
# Speedup: 56.2x

# Extrapolate to full epoch
full_batches = len(train_loader)
print(f"\nEstimated full epoch time:")
print(f"CPU: {(cpu_time/10)*full_batches/60:.1f} minutes")
print(f"GPU: {(gpu_time/10)*full_batches/60:.1f} minutes")
# CPU: 58.3 minutes
# GPU: 1.0 minutes
```

### Speed Comparison

| Task | CPU Time | GPU Time | Speedup |
|------|----------|----------|---------|
| ResNet-50 (1 epoch CIFAR10) | 60 min | 1 min | 60x |
| BERT training (1 epoch) | 24 hours | 2 hours | 12x |
| GPT-2 training (1 epoch) | 7 days | 8 hours | 21x |
| Image segmentation inference | 5 sec/image | 0.05 sec/image | 100x |
| Object detection (YOLOv5) | 2 sec/image | 0.02 sec/image | 100x |

---

## 🔧 CPU Specifications for ML

### Core Count

```bash
# More cores = better for ML

Minimum (Learning):
- 4 cores
- Example: Intel i5-10400, AMD Ryzen 5 3600

Recommended (Development):
- 8-16 cores
- Example: Intel i7-12700K, AMD Ryzen 7 5800X

Professional (Production):
- 16-32 cores
- Example: AMD Threadripper 3960X, Intel i9-12900K

Server (Large-scale):
- 32+ cores
- Example: AMD EPYC 7742, Intel Xeon Platinum 8380
```

### Clock Speed

```bash
Base Clock: 3.0+ GHz recommended
Boost Clock: 4.5+ GHz ideal

Higher clock speed = faster single-threaded operations
Important for: Data loading, preprocessing
```

### CPU Recommendations

```python
# Budget (< $200)
"AMD Ryzen 5 5600X"
- 6 cores, 12 threads
- 3.7 GHz base, 4.6 GHz boost
- Good for: Learning, small projects

# Mid-range ($300-500)
"AMD Ryzen 7 5800X"
- 8 cores, 16 threads
- 3.8 GHz base, 4.7 GHz boost
- Good for: Development, medium projects

# High-end ($500-1000)
"AMD Ryzen 9 5950X"
- 16 cores, 32 threads
- 3.4 GHz base, 4.9 GHz boost
- Good for: Professional, large projects

# Workstation ($1000+)
"AMD Threadripper 3970X"
- 32 cores, 64 threads
- 3.7 GHz base, 4.5 GHz boost
- Good for: Data centers, massive parallel processing
```

---

## 🎮 GPU Specifications Explained

### VRAM (Video RAM)

```bash
# Most important GPU spec for ML!

Entry Level (6-8GB):
- Small models, fine-tuning
- Batch size: 8-32
- Example: GTX 1660 Ti, RTX 3050

Mid Range (10-12GB):
- Medium models, most tasks
- Batch size: 32-64
- Example: RTX 3060 (12GB), RTX 2060 Super

High End (16-24GB):
- Large models, training from scratch
- Batch size: 64-128
- Example: RTX 3090 (24GB), RTX 4090 (24GB)

Professional (40-80GB):
- Very large models (GPT, BERT-large)
- Batch size: 128+
- Example: A100 (40/80GB), H100 (80GB)
```

### CUDA Cores

```bash
# More CUDA cores = more parallel processing

Entry: 1,000-2,000 cores
Mid: 3,000-5,000 cores
High: 8,000-10,000 cores
Professional: 10,000-16,000 cores

Note: Not directly comparable across GPU generations!
```

### Tensor Cores

```bash
# Specialized cores for ML operations
# Accelerate mixed-precision training

RTX 20/30/40 series: Have Tensor Cores
GTX series: No Tensor Cores

Speedup with Tensor Cores: 2-4x for mixed precision
```

### Memory Bandwidth

```bash
# Speed of data transfer to/from VRAM

Entry: 200-300 GB/s
Mid: 350-500 GB/s
High: 600-900 GB/s
Professional: 1,500-2,000 GB/s

Higher = better for large batch processing
```

### GPU Recommendations

```python
# Budget (< $400)
"NVIDIA RTX 3060 (12GB)"
- 12GB VRAM
- 3,584 CUDA cores
- Tensor Cores: Gen 3
- Good for: Learning, fine-tuning, most projects

# Mid-range ($500-800)
"NVIDIA RTX 3070 Ti (8GB)" or "RTX 4060 Ti (16GB)"
- 8-16GB VRAM
- 6,144-8,960 CUDA cores
- Tensor Cores: Gen 3/4
- Good for: Development, training medium models

# High-end ($1,000-1,600)
"NVIDIA RTX 4090 (24GB)"
- 24GB VRAM
- 16,384 CUDA cores
- Tensor Cores: Gen 4
- Good for: Professional, large models, research

# Professional ($5,000-10,000)
"NVIDIA RTX A6000 (48GB)" or "A100 (40/80GB)"
- 40-80GB VRAM
- 10,752 CUDA cores (A100)
- Tensor Cores: Gen 3
- Good for: Production, very large models, data centers
```

---

## 💾 Memory (RAM vs VRAM)

### RAM (System Memory)

```bash
# Used for:
- Data loading
- Preprocessing
- CPU operations
- Operating system

Minimum: 16GB
Recommended: 32GB
Professional: 64GB+
Server: 128GB+

Rule of thumb:
RAM >= 2x largest dataset size in memory
```

### VRAM (GPU Memory)

```bash
# Used for:
- Model parameters
- Activations during forward pass
- Gradients during backward pass
- Batch data

Minimum: 6GB (small models)
Recommended: 12GB (most models)
Professional: 24GB+ (large models)

VRAM Requirements:
Model size + Batch size × (activations + gradients)

Example:
ResNet-50: ~100MB model
Batch size 32: ~2GB activations + 2GB gradients
Total: ~4.1GB VRAM needed
```

### RAM vs VRAM

```python
# RAM (System Memory)
import numpy as np
large_array = np.random.rand(10000, 10000)  # ~762MB RAM
# Stored in system RAM

# VRAM (GPU Memory)
import torch
large_tensor = torch.rand(10000, 10000).cuda()  # ~762MB VRAM
# Stored in GPU VRAM

# Transfer between RAM and VRAM
cpu_tensor = torch.rand(1000, 1000)  # RAM
gpu_tensor = cpu_tensor.cuda()       # Copy to VRAM
back_to_cpu = gpu_tensor.cpu()       # Copy back to RAM

# Note: Transfers are slow!
# Minimize data transfer between CPU and GPU
```

### Out of Memory (OOM) Issues

```python
# Problem: Model too large for VRAM
try:
    model = LargeModel().cuda()
    # RuntimeError: CUDA out of memory
except RuntimeError as e:
    print(f"OOM Error: {e}")

# Solutions:

# 1. Reduce batch size
batch_size = 32  # Instead of 64

# 2. Use gradient accumulation
accumulation_steps = 4
for i, batch in enumerate(dataloader):
    loss = model(batch)
    loss = loss / accumulation_steps
    loss.backward()
    
    if (i + 1) % accumulation_steps == 0:
        optimizer.step()
        optimizer.zero_grad()

# 3. Use mixed precision
from torch.cuda.amp import autocast, GradScaler

scaler = GradScaler()
with autocast():
    loss = model(batch)
scaler.scale(loss).backward()
scaler.step(optimizer)
scaler.update()

# 4. Use gradient checkpointing
model.gradient_checkpointing_enable()

# 5. Use smaller model
model = SmallModel().cuda()
```

---

## 💿 Storage Considerations

### Storage Types

```bash
# HDD (Hard Disk Drive)
Speed: 100-200 MB/s
Cost: $0.02/GB
Use: Archives, cold storage
❌ Too slow for ML

# SATA SSD
Speed: 500-600 MB/s
Cost: $0.10/GB
Use: Secondary storage, datasets
✅ Adequate for most ML tasks

# NVMe SSD
Speed: 3,000-7,000 MB/s
Cost: $0.15/GB
Use: Primary storage, OS, working datasets
✅ Recommended for ML

# NVMe Gen4 SSD
Speed: 5,000-7,500 MB/s
Cost: $0.20/GB
Use: High-performance workloads
✅ Best for ML (if budget allows)
```

### Storage Requirements

```bash
Minimum:
- 256GB NVMe SSD (OS + tools)
- 1TB SATA SSD (datasets)

Recommended:
- 512GB NVMe SSD (OS + tools + working datasets)
- 2TB SATA SSD (dataset storage)

Professional:
- 1TB NVMe SSD (OS + tools + working datasets)
- 4TB+ SSD/HDD (dataset archives)
```

### I/O Bottlenecks

```python
# Slow data loading can bottleneck GPU

# Problem: HDD data loading
import time
from torch.utils.data import DataLoader
from torchvision.datasets import ImageFolder

# Data on HDD
dataset = ImageFolder('/mnt/hdd/imagenet')
dataloader = DataLoader(dataset, batch_size=64, num_workers=4)

start = time.time()
for i, (images, labels) in enumerate(dataloader):
    if i == 100: break
    images = images.cuda()  # GPU idle while waiting for data!
    # ... training ...
print(f"Time: {time.time() - start:.2f}s")
# Time: 45.2s (GPU utilization: 40%)

# Solution: Move data to SSD
# $ rsync -av /mnt/hdd/imagenet /mnt/nvme/
dataset = ImageFolder('/mnt/nvme/imagenet')
dataloader = DataLoader(dataset, batch_size=64, num_workers=4)

start = time.time()
for i, (images, labels) in enumerate(dataloader):
    if i == 100: break
    images = images.cuda()
    # ... training ...
print(f"Time: {time.time() - start:.2f}s")
# Time: 12.3s (GPU utilization: 95%)
```

---

## 🛠️ Workstation Build Recommendations

### Budget Build ($1,000-1,500)

```
CPU: AMD Ryzen 5 5600X ($200)
GPU: NVIDIA RTX 3060 12GB ($400)
RAM: 32GB DDR4-3200 ($100)
Motherboard: B550 ($150)
Storage: 512GB NVMe + 2TB SSD ($150)
PSU: 650W 80+ Gold ($100)
Case: Mid-tower ($80)
Cooling: Tower cooler ($50)

Total: ~$1,230

Good for:
- Learning ML/DL
- Fine-tuning models
- Small to medium projects
- Most Kaggle competitions
```

### Mid-Range Build ($2,500-3,500)

```
CPU: AMD Ryzen 9 5900X ($400)
GPU: NVIDIA RTX 4070 Ti 12GB ($800)
RAM: 64GB DDR4-3600 ($200)
Motherboard: X570 ($250)
Storage: 1TB NVMe + 4TB SSD ($300)
PSU: 850W 80+ Gold ($150)
Case: Full-tower ($120)
Cooling: AIO liquid cooler ($150)

Total: ~$2,370

Good for:
- Professional ML work
- Training models from scratch
- Computer vision projects
- NLP projects
```

### High-End Build ($5,000-7,000)

```
CPU: AMD Ryzen 9 5950X ($700)
GPU: NVIDIA RTX 4090 24GB ($1,600)
RAM: 128GB DDR4-3600 ($400)
Motherboard: X570 Creator ($400)
Storage: 2TB NVMe + 8TB SSD ($600)
PSU: 1000W 80+ Platinum ($200)
Case: Full-tower ($150)
Cooling: Custom water cooling ($400)

Total: ~$4,450

Good for:
- Research
- Large model training
- Production workloads
- Multi-GPU capable (future expansion)
```

### Multi-GPU Build ($10,000+)

```
CPU: AMD Threadripper 3970X ($2,000)
GPUs: 2x NVIDIA RTX 4090 24GB ($3,200)
RAM: 256GB DDR4-3200 ($800)
Motherboard: TRX40 ($700)
Storage: 2TB NVMe + 16TB SSD ($1,200)
PSU: 1600W 80+ Titanium ($500)
Case: Server chassis ($300)
Cooling: Custom water cooling ($800)

Total: ~$9,500

Good for:
- Large-scale research
- Production ML pipelines
- Very large model training
- Distributed training experiments
```

---

## 📊 Performance Comparisons

### Training Speed (ResNet-50, ImageNet)

| Hardware | Time per Epoch | Cost |
|----------|----------------|------|
| CPU (i9-12900K) | ~48 hours | $0 |
| GTX 1660 Ti 6GB | ~6 hours | $0 |
| RTX 3060 12GB | ~3 hours | $0 |
| RTX 3090 24GB | ~1.5 hours | $0 |
| RTX 4090 24GB | ~1 hour | $0 |
| A100 40GB | ~45 minutes | $0 |
| 4x A100 80GB | ~12 minutes | $0 |

### VRAM Usage (Common Models)

| Model | Parameters | VRAM (Inference) | VRAM (Training BS=32) |
|-------|------------|------------------|----------------------|
| ResNet-50 | 25M | ~0.5GB | ~4GB |
| BERT-base | 110M | ~1.5GB | ~8GB |
| BERT-large | 340M | ~4GB | ~16GB |
| GPT-2 | 1.5B | ~6GB | Out of memory (24GB) |
| ViT-L/16 | 307M | ~3GB | ~12GB |
| DALL-E | 12B | ~48GB | Not possible (consumer GPU) |

---

## 💪 Exercises

### Exercise 1: Benchmark CPU vs GPU

Compare training time on CPU vs GPU.

**Solution:**

```python
import torch
import torch.nn as nn
import time

# Simple model
model = nn.Sequential(
    nn.Linear(1000, 512),
    nn.ReLU(),
    nn.Linear(512, 256),
    nn.ReLU(),
    nn.Linear(256, 10)
)

# Dummy data
X = torch.randn(10000, 1000)
y = torch.randint(0, 10, (10000,))

# CPU training
model_cpu = model.to('cpu')
X_cpu, y_cpu = X.to('cpu'), y.to('cpu')
optimizer = torch.optim.Adam(model_cpu.parameters())
criterion = nn.CrossEntropyLoss()

start = time.time()
for epoch in range(10):
    optimizer.zero_grad()
    outputs = model_cpu(X_cpu)
    loss = criterion(outputs, y_cpu)
    loss.backward()
    optimizer.step()
cpu_time = time.time() - start
print(f"CPU Time: {cpu_time:.2f}s")

# GPU training
if torch.cuda.is_available():
    model_gpu = model.to('cuda')
    X_gpu, y_gpu = X.to('cuda'), y.to('cuda')
    optimizer = torch.optim.Adam(model_gpu.parameters())
    
    torch.cuda.synchronize()
    start = time.time()
    for epoch in range(10):
        optimizer.zero_grad()
        outputs = model_gpu(X_gpu)
        loss = criterion(outputs, y_gpu)
        loss.backward()
        optimizer.step()
    torch.cuda.synchronize()
    gpu_time = time.time() - start
    print(f"GPU Time: {gpu_time:.2f}s")
    print(f"Speedup: {cpu_time/gpu_time:.1f}x")
```

### Exercise 2: Memory Usage Analysis

Analyze VRAM usage for different models.

**Solution:**

```python
import torch
import torchvision.models as models

def check_vram_usage(model_name):
    """Check VRAM usage for model."""
    if not torch.cuda.is_available():
        return "No GPU available"
    
    # Reset GPU memory
    torch.cuda.empty_cache()
    torch.cuda.reset_peak_memory_stats()
    
    # Load model
    model = getattr(models, model_name)(pretrained=False).cuda()
    model.eval()
    
    # Forward pass
    x = torch.randn(1, 3, 224, 224).cuda()
    with torch.no_grad():
        _ = model(x)
    
    # Get memory usage
    allocated = torch.cuda.memory_allocated() / 1024**2
    reserved = torch.cuda.memory_reserved() / 1024**2
    max_allocated = torch.cuda.max_memory_allocated() / 1024**2
    
    print(f"{model_name}:")
    print(f"  Allocated: {allocated:.1f} MB")
    print(f"  Reserved: {reserved:.1f} MB")
    print(f"  Max Allocated: {max_allocated:.1f} MB")
    print()

# Test models
models_to_test = ['resnet18', 'resnet50', 'resnet152', 'vgg16', 'densenet121']
for model_name in models_to_test:
    check_vram_usage(model_name)
```

---

## 🎯 Key Takeaways

✅ **CPU**: Good for traditional ML, preprocessing, small models  
✅ **GPU**: Necessary for deep learning, large models, training  
✅ **VRAM**: Most important GPU spec (12GB+ recommended)  
✅ **RAM**: 32GB+ recommended for ML workloads  
✅ **Storage**: NVMe SSD for performance  
✅ **CPU Cores**: More cores = better parallel processing  
✅ **Tensor Cores**: Accelerate mixed-precision training  
✅ **Budget**: RTX 3060 12GB excellent entry point  

---

## 🔗 Navigation

- **Next**: [02-GPU-Setup.md](./02-GPU-Setup.md)
- **Up**: [README.md](./README.md)
- **Chapter Home**: [Chapter 3 - Development Environment](../README.md)

---

**Happy Hardware Selection! 💻🚀**
