# 3.7 Hardware & Cloud Setup

## 📋 Overview

Understanding hardware requirements and cloud computing options is crucial for training ML models efficiently and cost-effectively. This section covers local GPU setup, cloud platforms, and strategies for optimizing compute resources.

**Duration:** 3-4 days

---

## 📚 Topics

1. [CPU vs GPU for ML](./01-CPU-vs-GPU.md)
   - When CPU is sufficient
   - When GPU is necessary
   - CPU specifications for ML
   - GPU specifications explained
   - Memory (RAM vs VRAM)
   - Storage considerations
   - Workstation build recommendations

2. [GPU Setup and Configuration](./02-GPU-Setup.md)
   - NVIDIA GPU selection
   - CUDA installation
   - cuDNN setup
   - Verifying GPU availability in Python
   - TensorFlow GPU setup
   - PyTorch GPU setup
   - Troubleshooting GPU issues
   - Multi-GPU setup

3. [Cloud Platforms Overview](./03-Cloud-Platforms.md)
   - AWS (Amazon Web Services)
   - GCP (Google Cloud Platform)
   - Azure (Microsoft Azure)
   - Specialized ML platforms
   - Comparison matrix
   - Choosing the right platform

4. [Free Cloud Resources](./04-Free-Cloud-Resources.md)
   - Google Colab (Free, Pro, Pro+)
   - Kaggle Notebooks
   - Paperspace Gradient Free Tier
   - GitHub Codespaces
   - University/Research grants
   - Best practices for free tiers

5. [Cloud GPU Rentals](./05-Cloud-GPU-Rentals.md)
   - Lambda Labs
   - Vast.ai
   - Paperspace
   - RunPod
   - Comparison and pricing
   - Spot instances
   - Setup and usage
   - Data transfer strategies

---

## 🎯 Learning Objectives

After completing this section, you will be able to:
- Determine appropriate hardware for ML tasks
- Set up CUDA and cuDNN for GPU computing
- Use free cloud resources (Colab, Kaggle)
- Choose appropriate cloud platform
- Estimate and optimize cloud costs
- Transfer data efficiently to/from cloud
- Leverage spot instances for cost savings
- Monitor and manage cloud resources

---

## 🔑 Key Concepts

### CUDA
NVIDIA's parallel computing platform for GPU programming.

### cuDNN
NVIDIA's deep learning GPU-accelerated library.

### GPU VRAM
Video memory on GPU, crucial for batch size and model size.

### Spot Instances
Unused cloud capacity at reduced prices (can be interrupted).

### TPU (Tensor Processing Unit)
Google's custom AI accelerator chips.

---

## ⏱️ Time Allocation

| Topic | Estimated Time |
|-------|----------------|
| CPU vs GPU | 3-4 hours |
| GPU Setup | 6-8 hours |
| Cloud Platforms | 4-6 hours |
| Free Cloud Resources | 4-6 hours |
| Cloud GPU Rentals | 4-6 hours |
| **Total** | **3-4 days** |

---

## 📝 Exercises

Each topic file contains hands-on exercises. Total exercises: **12+**

**Key Projects:**
- Set up local GPU environment
- Run training on Google Colab
- Compare cloud platforms
- Calculate cloud costs for project
- Optimize cloud spending

---

## 💡 Hardware Quick Reference

### CPU Requirements for ML

**Minimum (Learning):**
- 4 cores
- 8GB RAM
- 256GB SSD

**Recommended (Development):**
- 8+ cores (Intel i7/Ryzen 7)
- 32GB RAM
- 512GB NVMe SSD

**Professional (Production):**
- 16+ cores (AMD Threadripper/Intel i9)
- 64GB+ RAM
- 1TB+ NVMe SSD

### GPU Requirements for ML

**Entry Level:**
- NVIDIA GTX 1660 Ti (6GB VRAM)
- Good for: Learning, small models

**Mid Range:**
- NVIDIA RTX 3060 (12GB VRAM)
- NVIDIA RTX 3070 (8GB VRAM)
- Good for: Medium models, fine-tuning

**Professional:**
- NVIDIA RTX 4090 (24GB VRAM)
- NVIDIA RTX A6000 (48GB VRAM)
- Good for: Large models, training from scratch

**Data Center:**
- NVIDIA A100 (40GB/80GB VRAM)
- NVIDIA H100 (80GB VRAM)
- Good for: Production, very large models

---

## 🔧 GPU Setup

### Check GPU Availability

```python
# TensorFlow
import tensorflow as tf
print("Num GPUs Available: ", len(tf.config.list_physical_devices('GPU')))
print(tf.config.list_physical_devices('GPU'))

# PyTorch
import torch
print(f"GPU Available: {torch.cuda.is_available()}")
print(f"GPU Name: {torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'None'}")
print(f"GPU Count: {torch.cuda.device_count()}")

# System info
import subprocess
try:
    result = subprocess.run(['nvidia-smi'], capture_output=True, text=True)
    print(result.stdout)
except:
    print("nvidia-smi not available")
```

### CUDA Installation (Windows)

```bash
# 1. Download CUDA Toolkit
# Visit: https://developer.nvidia.com/cuda-downloads
# Choose: Windows > x86_64 > version > exe (local)

# 2. Install CUDA (includes cuDNN option)
# Run the installer, select all components

# 3. Verify installation
nvcc --version

# 4. Add to PATH (if not automatic)
# System Properties > Environment Variables
# Add: C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.1\bin
```

### CUDA Installation (Linux)

```bash
# Ubuntu 22.04 example with CUDA 12.1

# 1. Remove old NVIDIA drivers (if any)
sudo apt-get remove --purge nvidia-*
sudo apt autoremove

# 2. Install NVIDIA drivers
sudo ubuntu-drivers devices
sudo ubuntu-drivers autoinstall
# or manually: sudo apt install nvidia-driver-535

# 3. Reboot
sudo reboot

# 4. Add CUDA repository
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt-get update

# 5. Install CUDA
sudo apt-get install cuda-toolkit-12-1

# 6. Add to PATH (add to ~/.bashrc)
echo 'export PATH=/usr/local/cuda-12.1/bin:$PATH' >> ~/.bashrc
echo 'export LD_LIBRARY_PATH=/usr/local/cuda-12.1/lib64:$LD_LIBRARY_PATH' >> ~/.bashrc
source ~/.bashrc

# 7. Verify
nvcc --version
nvidia-smi
```

### Install cuDNN

```bash
# 1. Download from NVIDIA (requires account)
# https://developer.nvidia.com/cudnn

# 2. Extract and copy files
# Linux:
tar -xzvf cudnn-linux-x86_64-8.x.x.x_cudaX.Y-archive.tar.xz
sudo cp cudnn-*-archive/include/cudnn*.h /usr/local/cuda/include 
sudo cp -P cudnn-*-archive/lib/libcudnn* /usr/local/cuda/lib64 
sudo chmod a+r /usr/local/cuda/include/cudnn*.h /usr/local/cuda/lib64/libcudnn*

# Windows:
# Copy files to CUDA installation directory:
# cudnn\bin\* -> C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.1\bin
# cudnn\include\* -> C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.1\include
# cudnn\lib\* -> C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.1\lib
```

---

## ☁️ Cloud Platforms

### Google Colab

**Free Tier:**
- T4 GPU (16GB VRAM)
- 12-hour sessions
- Good for: Learning, prototyping

```python
# Check Colab environment
try:
    import google.colab
    print("Running in Google Colab")
    
    # Mount Google Drive
    from google.colab import drive
    drive.mount('/content/drive')
    
    # Check GPU
    !nvidia-smi
    
except:
    print("Not in Colab")
```

**Colab Pro ($9.99/month):**
- Priority access to GPUs/TPUs
- Longer runtimes (24 hours)
- More RAM
- Background execution

**Colab Pro+ ($49.99/month):**
- Even longer runtimes
- More powerful GPUs (A100 available)
- Priority support

### Kaggle Notebooks

**Free Tier:**
- P100 GPU (16GB VRAM) or T4 GPU (16GB VRAM)
- 30 hours/week GPU quota
- 20GB RAM
- 16GB disk space

```python
# Kaggle notebook example
import kagglehub
import pandas as pd

# Load dataset
df = pd.read_csv('/kaggle/input/dataset/data.csv')

# Check GPU
import torch
print(f"GPU: {torch.cuda.get_device_name(0)}")
```

### AWS (Amazon Web Services)

**Popular Instances:**
- `g4dn.xlarge`: 1x T4 GPU, $0.526/hour
- `g5.xlarge`: 1x A10G GPU, $1.006/hour
- `p3.2xlarge`: 1x V100 GPU, $3.06/hour
- `p4d.24xlarge`: 8x A100 GPUs, $32.77/hour

**Free Tier:**
- 750 hours t2.micro (CPU only)
- First 12 months

### GCP (Google Cloud Platform)

**Popular Instances:**
- `n1-standard-4 + T4`: $0.35/hour + $0.35/hour
- `n1-standard-4 + V100`: $0.35/hour + $2.48/hour
- `a2-highgpu-1g`: 1x A100, ~$3/hour

**Free Tier:**
- $300 credit for 90 days
- Always free tier (e2-micro)

### Azure

**Popular Instances:**
- `NC6`: 1x K80 GPU, $0.90/hour
- `NC6s_v3`: 1x V100 GPU, $3.06/hour
- `ND96asr_v4`: 8x A100 GPUs, $27.20/hour

---

## 💰 Cost Optimization

### Best Practices

1. **Use Free Tiers First**
   ```
   Colab/Kaggle -> Cloud Free Tier -> Paid Cloud
   ```

2. **Spot Instances**
   ```bash
   # Can save 60-90% on costs
   # May be interrupted
   # Good for: Training, batch processing
   # Bad for: Serving, real-time
   ```

3. **Auto-Shutdown**
   ```python
   # Set up auto-shutdown script
   import os
   import time
   
   def auto_shutdown(idle_time_minutes=30):
       """Shutdown instance if idle"""
       # Check GPU utilization
       # Shutdown if low for specified time
       pass
   ```

4. **Data Transfer Optimization**
   ```bash
   # Minimize data transfer
   # Use cloud storage in same region
   # Compress data before transfer
   # Use rsync for incremental transfers
   ```

5. **Right-Size Instances**
   ```
   Development: Small instance (T4)
   Training: Large instance (A100)
   Inference: Optimized instance (T4 for small models)
   ```

### Cost Estimation Example

**Training a Model:**
```
Model: BERT-base fine-tuning
Dataset: 100k samples
Hardware: 1x V100 GPU
Time: 8 hours
Cost: 8 hours × $2.48/hour = $19.84

Alternative with T4:
Time: 16 hours
Cost: 16 hours × $0.35/hour = $5.60
Savings: $14.24 (71%)
```

---

## 🚀 Cloud Setup Example

### AWS EC2 GPU Instance

```bash
# 1. Launch instance
# AWS Console > EC2 > Launch Instance
# Select Deep Learning AMI
# Choose g4dn.xlarge

# 2. Connect via SSH
ssh -i "key.pem" ubuntu@ec2-xx-xxx-xxx-xxx.compute-1.amazonaws.com

# 3. Activate conda environment
conda activate pytorch

# 4. Verify GPU
nvidia-smi

# 5. Run training
python train.py

# 6. Transfer results
scp -i "key.pem" results.tar.gz local-machine:~/
```

### Google Colab Workflow

```python
# 1. Mount Google Drive
from google.colab import drive
drive.mount('/content/drive')

# 2. Install requirements
!pip install -q transformers datasets

# 3. Load data from Drive
import pandas as pd
df = pd.read_csv('/content/drive/MyDrive/data/train.csv')

# 4. Train model
model.fit(train_data, epochs=10)

# 5. Save to Drive
model.save('/content/drive/MyDrive/models/model.h5')

# 6. Download to local (optional)
from google.colab import files
files.download('/content/drive/MyDrive/models/model.h5')
```

---

## 📊 Hardware Comparison

### Training Time Comparison (BERT-base)

| Hardware | Time | Cost |
|----------|------|------|
| CPU (i7-9700K) | 48 hours | $0 (local) |
| GTX 1660 Ti (6GB) | 16 hours | $0 (local) |
| RTX 3090 (24GB) | 4 hours | $0 (local) |
| Colab Free (T4) | 8 hours | $0 (free tier) |
| AWS g4dn (T4) | 8 hours | $4.21 |
| AWS p3 (V100) | 3 hours | $9.18 |
| AWS p4d (A100) | 1.5 hours | $49.16 |

---

## 🔗 Navigation

- **Up**: [Chapter 3 Overview](../README.md)
- **Previous**: [3.6 Git & Version Control](../3.6-Git-Version-Control/README.md)
- **Next**: [Phase 1 - Machine Learning Foundations](../../Phase-1-Machine-Learning/README.md)

---

## 📚 Additional Resources

### Documentation
- [NVIDIA CUDA Documentation](https://docs.nvidia.com/cuda/)
- [cuDNN Documentation](https://docs.nvidia.com/deeplearning/cudnn/)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [GCP Documentation](https://cloud.google.com/docs)
- [Azure Documentation](https://docs.microsoft.com/azure/)

### Tools
- [nvidia-smi](https://developer.nvidia.com/nvidia-system-management-interface) - GPU monitoring
- [gpustat](https://github.com/wookayin/gpustat) - Better GPU monitoring
- [nvtop](https://github.com/Syllo/nvtop) - Interactive GPU monitoring

### Comparisons
- [AWS vs GCP vs Azure Comparison](https://cloud.google.com/docs/compare/aws)
- [GPU Benchmarks for ML](https://lambdalabs.com/gpu-benchmarks)
- [Cloud GPU Pricing Comparison](https://cloud-gpus.com/)

### Communities
- [r/MachineLearning](https://www.reddit.com/r/MachineLearning/)
- [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/) (for local GPU setups)
- [r/CloudComputing](https://www.reddit.com/r/CloudComputing/)
