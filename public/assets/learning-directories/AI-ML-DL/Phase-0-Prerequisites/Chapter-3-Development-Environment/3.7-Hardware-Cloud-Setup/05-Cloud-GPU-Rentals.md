# 💰 Cloud GPU Rentals

## Overview

Learn about affordable cloud GPU rental services including Lambda Labs, Vast.ai, Paperspace, and RunPod. Compare pricing, understand spot instances, and optimize costs.

---

## 📚 Table of Contents

1. [Introduction](#introduction)
2. [Lambda Labs](#lambda-labs)
3. [Vast.ai](#vastai)
4. [Paperspace](#paperspace)
5. [RunPod](#runpod)
6. [Spot Instances](#spot-instances)
7. [Pricing Comparison](#pricing-comparison)
8. [Setup and Usage](#setup-and-usage)
9. [Data Transfer Strategies](#data-transfer-strategies)
10. [Exercises](#exercises)

---

## 🎯 Introduction

### Why GPU Rentals?

```python
gpu_rentals_vs_ownership = {
    "Ownership (RTX 4090)": {
        "upfront_cost": "$1,600",
        "power": "$30/month",
        "breakeven": "~60 hours of cloud usage",
        "pros": ["Always available", "No hourly cost", "Privacy"],
        "cons": ["High upfront", "One GPU", "Maintenance"]
    },
    
    "Rental (Cloud GPU)": {
        "upfront_cost": "$0",
        "hourly_cost": "$0.50-$2/hour",
        "pros": ["No upfront cost", "Many GPU options", "Scalable"],
        "cons": ["Ongoing cost", "Need internet", "Data transfer"]
    }
}

# When to rent:
# ✅ Occasional training (< 50 hours/month)
# ✅ Experimenting with different GPUs
# ✅ Burst workloads
# ✅ Testing before buying

# When to buy:
# ✅ Heavy daily use (> 100 hours/month)
# ✅ Privacy-sensitive work
# ✅ Offline work needed
```

---

## 🚀 Lambda Labs

### Overview

```python
lambda_labs = {
    "focus": "GPU cloud for ML/AI",
    "target": "Researchers, ML engineers",
    "regions": "USA, Europe",
    "strengths": [
        "Simple pricing",
        "Pre-configured for ML",
        "Good documentation",
        "Fast GPUs (A100, H100)"
    ],
    "website": "https://lambdalabs.com/service/gpu-cloud"
}
```

### Pricing

```python
lambda_pricing = {
    # Entry Level
    "1x RTX 6000 Ada (48GB)": {
        "price": "$0.80/hour",
        "vcpu": 30,
        "ram": "200 GB",
        "storage": "1.4 TB SSD",
        "good_for": "Development, medium models"
    },
    
    # High Performance
    "1x A100 (40GB)": {
        "price": "$1.10/hour",
        "vcpu": 30,
        "ram": "200 GB",
        "storage": "1.4 TB SSD",
        "good_for": "Large models, training"
    },
    
    "1x A100 (80GB)": {
        "price": "$1.29/hour",
        "vcpu": 30,
        "ram": "200 GB",
        "storage": "1.4 TB SSD",
        "good_for": "Very large models, LLMs"
    },
    
    # Multi-GPU
    "8x A100 (40GB)": {
        "price": "$8.80/hour",
        "vcpu": 240,
        "ram": "1.8 TB",
        "storage": "11 TB SSD",
        "good_for": "Distributed training, large-scale"
    },
    
    # Latest Generation
    "1x H100 (80GB)": {
        "price": "$2.49/hour",
        "vcpu": 26,
        "ram": "200 GB",
        "storage": "2 TB SSD",
        "good_for": "Cutting-edge research, LLMs"
    }
}
```

### Getting Started

```bash
# 1. Create account
# Visit: https://cloud.lambdalabs.com/sign-up

# 2. Add SSH key
# Profile > SSH Keys > Add SSH Key

# 3. Launch instance
# Cloud > Instances > Launch Instance
# Select: GPU type, Region, SSH key

# 4. Connect
ssh ubuntu@<instance-ip>

# 5. Verify GPU
nvidia-smi

# 6. Setup environment
# PyTorch pre-installed:
conda activate pytorch

# Or create new environment:
conda create -n myenv python=3.10
conda activate myenv
pip install torch torchvision
```

### Best Practices

```python
# 1. Use Lambda's persistent storage
# /home/ubuntu/ - Persistent (keeps data)
# Good for: Datasets, code, models

# 2. Terminate when not using
# Lambda charges 24/7 unless terminated
# Always terminate after training!

# 3. Monitor costs
# Dashboard shows running costs

# 4. Use regions wisely
# Choose closest region for best performance

# 5. Backup important data
# Use S3 or external storage for critical files
```

---

## 🌐 Vast.ai

### Overview

```python
vastai = {
    "focus": "P2P GPU marketplace",
    "model": "Individuals rent out GPUs",
    "pricing": "Auction-based (very cheap)",
    "strengths": [
        "Extremely low cost",
        "Many GPU options",
        "Flexible"
    ],
    "weaknesses": [
        "Variable reliability",
        "No SLA",
        "Complex setup",
        "Inconsistent availability"
    ],
    "website": "https://vast.ai/"
}
```

### Pricing

```python
vastai_pricing = {
    # Entry Level
    "RTX 3060 (12GB)": {
        "price": "$0.10-0.15/hour",
        "availability": "High",
        "good_for": "Learning, small models"
    },
    
    # Mid Range
    "RTX 3090 (24GB)": {
        "price": "$0.20-0.35/hour",
        "availability": "High",
        "good_for": "Most training tasks"
    },
    
    "RTX 4090 (24GB)": {
        "price": "$0.30-0.50/hour",
        "availability": "Medium",
        "good_for": "Fast training"
    },
    
    # High End
    "A100 (40GB)": {
        "price": "$0.80-1.50/hour",
        "availability": "Low",
        "good_for": "Large models"
    },
    
    # Note: Prices vary by host
    # Lower reliability hosts = lower price
}
```

### Getting Started

```bash
# 1. Install Vast CLI
pip install vastai

# 2. Login
vastai set api-key <YOUR_API_KEY>

# 3. Search for instances
vastai search offers 'cuda_vers>=12.0 gpu_ram>=12 reliability>0.95'

# Example output:
# ID    GPU           RAM  Price/hr  Reliability
# 1234  RTX 3090 24GB 32   $0.25     0.98
# 5678  RTX 4090 24GB 64   $0.40     0.96

# 4. Rent instance
vastai create instance <ID> --image pytorch/pytorch:latest --disk 50

# 5. Connect
vastai ssh-url <INSTANCE_ID>
ssh -p <PORT> root@<IP>

# 6. Stop instance when done
vastai destroy instance <INSTANCE_ID>
```

### Docker Setup

```bash
# Vast.ai uses Docker

# 1. Use pre-built image
# Popular options:
# - pytorch/pytorch:latest
# - tensorflow/tensorflow:latest-gpu
# - nvidia/cuda:12.1.0-cudnn8-runtime-ubuntu22.04

# 2. Or create custom image
# Create Dockerfile
FROM pytorch/pytorch:2.0.0-cuda11.7-cudnn8-runtime

RUN pip install transformers datasets accelerate

# Build and push to Docker Hub
docker build -t username/ml-image:latest .
docker push username/ml-image:latest

# Use on Vast.ai
vastai create instance <ID> --image username/ml-image:latest
```

### Best Practices

```python
tips = [
    "Filter by reliability score (>0.95 recommended)",
    "Check 'Verified' hosts for better reliability",
    "Start with 'On-demand' pricing before bidding",
    "Always set max price to avoid surprises",
    "Monitor instance regularly (can be interrupted)",
    "Backup work frequently to external storage",
    "Use persistent storage option (+$0.10/TB/month)",
    "Test connection before uploading large datasets"
]
```

---

## 🎨 Paperspace

### Gradient (Managed Platform)

```python
paperspace_gradient = {
    "free_tier": {
        "gpu": "M4000 (8GB)",
        "price": "$0/hour",
        "session": "6 hours"
    },
    
    "paid_tiers": {
        "RTX 4000 (8GB)": "$0.51/hour",
        "RTX 5000 (16GB)": "$0.78/hour",
        "A4000 (16GB)": "$0.76/hour",
        "A5000 (24GB)": "$1.38/hour",
        "A6000 (48GB)": "$1.89/hour",
        "A100 (80GB)": "$3.09/hour"
    },
    
    "features": [
        "Managed Jupyter notebooks",
        "Version control built-in",
        "Easy deployment",
        "Good UI"
    ]
}
```

### Core (VMs)

```python
paperspace_core = {
    "model": "Traditional VMs (like EC2)",
    "pricing": "Hourly or monthly",
    "flexibility": "More control than Gradient",
    "use_case": "Production workloads",
    
    "examples": {
        "P4000 (8GB)": "$0.51/hour or $19/month",
        "P5000 (16GB)": "$0.78/hour or $29/month",
        "P6000 (24GB)": "$1.10/hour or $39/month"
    }
}
```

### Setup

```bash
# 1. Gradient Notebooks (easiest)
# Visit: https://console.paperspace.com/
# Notebooks > Create
# Select GPU, Container (PyTorch/TensorFlow)
# Opens Jupyter Lab in browser

# 2. Gradient CLI
pip install gradient

# Login
gradient apiKey <YOUR_API_KEY>

# Create notebook
gradient notebooks create \
  --machineType A4000 \
  --container paperspace/pytorch:2.0.0

# 3. Core VMs (more control)
# Visit: https://console.paperspace.com/
# Core > Machines > Create
# Select GPU, OS, Storage
# Connect via SSH or RDP
```

---

## 🎮 RunPod

### Overview

```python
runpod = {
    "focus": "Affordable GPU cloud",
    "model": "Serverless + Pods",
    "pricing": "Pay-per-second",
    "strengths": [
        "Very competitive pricing",
        "Serverless options",
        "Good for inference",
        "Docker-native"
    ],
    "website": "https://www.runpod.io/"
}
```

### Pricing

```python
runpod_pricing = {
    # Secure Cloud (RunPod managed)
    "secure_cloud": {
        "RTX 3090 (24GB)": "$0.44/hour",
        "RTX 4090 (24GB)": "$0.69/hour",
        "A40 (48GB)": "$0.79/hour",
        "A100 SXM (80GB)": "$2.89/hour"
    },
    
    # Community Cloud (cheaper, less reliable)
    "community_cloud": {
        "RTX 3090 (24GB)": "$0.25-0.35/hour",
        "RTX 4090 (24GB)": "$0.40-0.55/hour",
        "A100 (80GB)": "$1.20-1.80/hour"
    },
    
    # Serverless (pay per compute)
    "serverless": {
        "model": "Pay per second of compute",
        "pricing": "$0.00015/second (A40)",
        "good_for": "Inference, APIs, batch jobs"
    }
}
```

### Getting Started

```bash
# 1. Create account
# Visit: https://www.runpod.io/

# 2. Add funds
# Billing > Add Funds
# Minimum: $10

# 3. Deploy Pod
# Pods > Deploy
# Select: GPU, Template (PyTorch/TensorFlow/Custom)

# 4. Connect via Jupyter or SSH
# Opens in browser or SSH via provided URL

# 5. Or use RunPod CLI
pip install runpod

# 6. Create pod via CLI
import runpod

runpod.api_key = "YOUR_API_KEY"

pod = runpod.create_pod(
    name="ml-training",
    image_name="runpod/pytorch:2.0.0",
    gpu_type_id="NVIDIA RTX 3090",
    cloud_type="SECURE"
)
```

### Serverless Example

```python
# RunPod Serverless (inference)

# 1. Create handler
# handler.py
import runpod

def handler(event):
    """Process inference request."""
    input_data = event['input']
    
    # Run model inference
    output = model.predict(input_data)
    
    return {"output": output}

runpod.serverless.start({"handler": handler})

# 2. Deploy
# RunPod Console > Serverless > Deploy
# Upload handler.py, specify Docker image

# 3. Call endpoint
import requests

response = requests.post(
    "https://api.runpod.ai/v2/YOUR_ENDPOINT_ID/run",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={"input": {"data": [1, 2, 3]}}
)

print(response.json())
```

---

## ⚡ Spot Instances

### What are Spot Instances?

```python
spot_vs_ondemand = {
    "On-Demand": {
        "price": "$3.06/hour (V100)",
        "availability": "Guaranteed",
        "interruption": "None",
        "use_case": "Production, critical workloads"
    },
    
    "Spot": {
        "price": "$0.92/hour (70% discount!)",
        "availability": "When available",
        "interruption": "Can be interrupted anytime",
        "warning": "2-minute warning before termination",
        "use_case": "Training, batch jobs, experiments"
    }
}
```

### Using Spot Instances

```python
# AWS Spot Instances
import boto3

ec2 = boto3.client('ec2')

# Request spot instance
response = ec2.request_spot_instances(
    SpotPrice='0.10',  # Max price
    InstanceCount=1,
    Type='one-time',
    LaunchSpecification={
        'ImageId': 'ami-xxxxx',  # Deep Learning AMI
        'InstanceType': 'g4dn.xlarge',
        'KeyName': 'your-key'
    }
)

# Handle interruption
# Run this script on instance:
# #!/bin/bash
# while true; do
#   if curl -s http://169.254.169.254/latest/meta-data/spot/instance-action | grep -q action; then
#     echo "Spot instance terminating soon!"
#     # Save checkpoint
#     python save_checkpoint.py
#     break
#   fi
#   sleep 5
# done
```

### Spot Best Practices

```python
spot_strategies = {
    "1. Save checkpoints frequently": {
        "code": """
        # Every N minutes
        if time.time() - last_save > 600:  # 10 minutes
            save_checkpoint()
            last_save = time.time()
        """
    },
    
    "2. Use spot interruption handler": {
        "code": """
        import signal
        
        def handle_interruption(signum, frame):
            print("Saving checkpoint before interruption...")
            save_checkpoint()
            exit(0)
        
        signal.signal(signal.SIGTERM, handle_interruption)
        """
    },
    
    "3. Diversify across regions/zones": {
        "strategy": "Request spots in multiple zones for higher availability"
    },
    
    "4. Set appropriate max price": {
        "tip": "Set to on-demand price to maximize availability"
    },
    
    "5. Use spot fleet": {
        "benefit": "Automatically maintains target capacity"
    }
}
```

---

## 💵 Pricing Comparison

### GPU Rental Comparison (per hour)

| GPU | AWS | GCP | Lambda | Vast.ai | Paperspace | RunPod |
|-----|-----|-----|--------|---------|------------|--------|
| **RTX 3090** | N/A | N/A | N/A | $0.25 | N/A | $0.44 |
| **RTX 4090** | N/A | N/A | N/A | $0.40 | N/A | $0.69 |
| **T4** | $0.526 | $0.35 | N/A | $0.12 | N/A | N/A |
| **V100** | $3.06 | $2.48 | N/A | $0.35 | N/A | N/A |
| **A100 40GB** | $4.10 | $3.67 | $1.10 | $0.90 | $3.09 | $2.89 |
| **A100 80GB** | N/A | N/A | $1.29 | $1.30 | $3.09 | $2.89 |

### Cost for 100 Hours Training

| Provider | GPU | Cost (100h) | Savings vs AWS |
|----------|-----|-------------|----------------|
| **AWS** | V100 | $306 | - |
| **GCP** | V100 | $248 | 19% |
| **Lambda** | A100 40GB | $110 | 64% |
| **Vast.ai** | RTX 3090 | $25 | 92% |
| **Paperspace** | A5000 | $138 | 55% |
| **RunPod** | A100 80GB | $289 | 6% |

---

## 🔧 Setup and Usage

### Universal Workflow

```bash
# 1. Create account on platform
# 2. Add SSH key
# 3. Launch instance with desired GPU
# 4. Connect via SSH

# 5. Setup environment
conda create -n ml python=3.10
conda activate ml
pip install torch torchvision transformers

# 6. Transfer data (see next section)

# 7. Run training
python train.py

# 8. Download results
scp -r user@instance:/path/to/results ./

# 9. Terminate instance (IMPORTANT!)
# Don't forget or you'll keep paying!
```

---

## 📁 Data Transfer Strategies

### Small Datasets (< 1GB)

```bash
# Method 1: SCP (SSH)
scp -r ./data user@instance:/home/user/data

# Method 2: Git LFS
git lfs clone https://github.com/user/data-repo

# Method 3: wget/curl
wget https://example.com/dataset.zip
unzip dataset.zip
```

### Large Datasets (> 1GB)

```bash
# Method 1: Cloud storage (S3/GCS)
# Upload to S3 once
aws s3 cp ./data s3://mybucket/data --recursive

# Download on each instance (fast!)
aws s3 sync s3://mybucket/data ./data

# Method 2: Torrent (for public datasets)
apt-get install transmission-cli
transmission-cli dataset.torrent

# Method 3: Rsync (incremental)
rsync -avz --progress ./data user@instance:/data
```

### Minimize Transfer Costs

```python
strategies = {
    "1. Compress before transfer": {
        "command": "tar -czf data.tar.gz data/",
        "benefit": "Reduce size by 50-90%"
    },
    
    "2. Use same region as storage": {
        "tip": "Instance in us-east-1 + S3 in us-east-1 = free transfer"
    },
    
    "3. Cache processed data": {
        "approach": "Preprocess once, save to S3, reuse"
    },
    
    "4. Use persistent storage": {
        "platforms": "Lambda, Paperspace, RunPod offer persistent volumes"
    },
    
    "5. Download only what you need": {
        "example": "Download train.csv, not entire 100GB archive"
    }
}
```

---

## 💪 Exercises

### Exercise 1: Cost Comparison

Calculate cost for your specific workload across platforms.

**Solution:**

```python
# Your workload
workload = {
    "gpu": "A100 40GB",
    "training_time": 50,  # hours
    "experiments": 10,
    "total_hours": 50 * 10  # 500 hours
}

# Costs
costs = {
    "AWS": 500 * 4.10,
    "GCP": 500 * 3.67,
    "Lambda": 500 * 1.10,
    "Vast.ai": 500 * 0.90,
}

for platform, cost in costs.items():
    print(f"{platform}: ${cost:.2f}")
    
# AWS: $2,050.00
# GCP: $1,835.00
# Lambda: $550.00
# Vast.ai: $450.00

# Savings using Lambda vs AWS: $1,500
```

---

## 🎯 Key Takeaways

✅ **Lambda Labs**: Simple, reliable, good pricing for A100/H100  
✅ **Vast.ai**: Cheapest option, less reliable, P2P marketplace  
✅ **Paperspace**: Good UI, managed notebooks, mid-range pricing  
✅ **RunPod**: Competitive pricing, serverless options, Docker-native  
✅ **Spot Instances**: 60-90% discount but can be interrupted  
✅ **Data Transfer**: Use cloud storage, compress data, same region  
✅ **Cost Optimization**: Terminate when done, use spot, choose right GPU  

---

## 🔗 Navigation

- **Previous**: [04-Free-Cloud-Resources.md](./04-Free-Cloud-Resources.md)
- **Up**: [README.md](./README.md)
- **Chapter Home**: [Chapter 3 - Development Environment](../README.md)

---

**Happy Cloud Training! 💰🚀**
