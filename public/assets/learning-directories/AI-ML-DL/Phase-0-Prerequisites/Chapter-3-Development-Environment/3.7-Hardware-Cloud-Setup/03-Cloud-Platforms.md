# ☁️ Cloud Platforms Overview

## Overview

Comprehensive comparison of major cloud platforms (AWS, GCP, Azure) and specialized ML platforms for deep learning workloads.

---

## 📚 Table of Contents

1. [Introduction](#introduction)
2. [AWS (Amazon Web Services)](#aws-amazon-web-services)
3. [GCP (Google Cloud Platform)](#gcp-google-cloud-platform)
4. [Azure (Microsoft Azure)](#azure-microsoft-azure)
5. [Specialized ML Platforms](#specialized-ml-platforms)
6. [Comparison Matrix](#comparison-matrix)
7. [Choosing the Right Platform](#choosing-the-right-platform)
8. [Exercises](#exercises)

---

## 🎯 Introduction

### Why Cloud for ML?

```bash
✅ No upfront hardware cost
✅ Scale up/down as needed
✅ Access to powerful GPUs (A100, H100)
✅ Pay only for what you use
✅ Global availability
✅ Managed services (databases, storage)
✅ Experiment with different hardware
```

### Cloud vs Local

| Aspect | Local GPU | Cloud GPU |
|--------|-----------|-----------|
| **Cost** | High upfront ($2K-10K) | Pay-per-use ($0.50-$32/hour) |
| **Flexibility** | Fixed hardware | Change GPUs anytime |
| **Scalability** | Limited (1-4 GPUs) | Unlimited |
| **Maintenance** | You manage | Provider manages |
| **Availability** | Always available | Need internet |
| **Power** | Your electricity bill | Included in pricing |
| **Best For** | Regular use, privacy | Experiments, bursts |

---

## 📦 AWS (Amazon Web Services)

### Overview

```bash
Market Leader (32% market share)
- Most mature cloud platform
- Largest selection of services
- Global infrastructure (30+ regions)
- Best for: Enterprise, production workloads
```

### GPU Instances

```python
# P-series (older, cost-effective)
p_series = {
    "p2.xlarge": {
        "gpu": "1x K80 (12GB)",
        "vcpu": 4,
        "ram": "61 GB",
        "price": "$0.90/hour",
        "good_for": "Learning, old projects"
    },
    "p3.2xlarge": {
        "gpu": "1x V100 (16GB)",
        "vcpu": 8,
        "ram": "61 GB",
        "price": "$3.06/hour",
        "good_for": "Training medium models"
    },
    "p3.8xlarge": {
        "gpu": "4x V100 (16GB)",
        "vcpu": 32,
        "ram": "244 GB",
        "price": "$12.24/hour",
        "good_for": "Large models, multi-GPU"
    }
}

# G-series (newer, general purpose)
g_series = {
    "g4dn.xlarge": {
        "gpu": "1x T4 (16GB)",
        "vcpu": 4,
        "ram": "16 GB",
        "storage": "125 GB NVMe",
        "price": "$0.526/hour",
        "good_for": "Most ML workloads, best value"
    },
    "g4dn.12xlarge": {
        "gpu": "4x T4 (16GB each)",
        "vcpu": 48,
        "ram": "192 GB",
        "storage": "900 GB NVMe",
        "price": "$3.912/hour",
        "good_for": "Multi-GPU training"
    },
    "g5.xlarge": {
        "gpu": "1x A10G (24GB)",
        "vcpu": 4,
        "ram": "16 GB",
        "storage": "250 GB NVMe",
        "price": "$1.006/hour",
        "good_for": "Latest generation, better performance"
    }
}

# P4/P5 (latest, most powerful)
p4_p5_series = {
    "p4d.24xlarge": {
        "gpu": "8x A100 (40GB)",
        "vcpu": 96,
        "ram": "1,152 GB",
        "price": "$32.77/hour",
        "good_for": "Large-scale training, LLMs"
    },
    "p5.48xlarge": {
        "gpu": "8x H100 (80GB)",
        "vcpu": 192,
        "ram": "2,048 GB",
        "price": "$98.32/hour",
        "good_for": "Cutting-edge research, very large models"
    }
}
```

### AWS Services for ML

```bash
# Compute
EC2: Virtual machines with GPUs
ECS/EKS: Container orchestration
Lambda: Serverless functions (no GPU)

# Storage
S3: Object storage (datasets, models)
EBS: Block storage (instance volumes)
EFS: Elastic file system

# Managed ML
SageMaker: End-to-end ML platform
- Notebooks
- Training jobs
- Model deployment
- Hyperparameter tuning
- Model registry

# Other
CloudWatch: Monitoring
IAM: Access control
VPC: Networking
```

### Getting Started with AWS

```bash
# 1. Create AWS account
# Visit: https://aws.amazon.com/free/

# 2. Install AWS CLI
pip install awscli
aws configure
# Enter: Access Key ID, Secret Access Key, Region, Output format

# 3. Launch EC2 instance
# AWS Console > EC2 > Launch Instance
# Select: Deep Learning AMI (Ubuntu 20.04)
# Instance type: g4dn.xlarge
# Storage: 100 GB
# Security group: SSH (port 22), Jupyter (port 8888)

# 4. Connect
ssh -i "keypair.pem" ubuntu@ec2-xx-xxx-xxx-xxx.compute-1.amazonaws.com

# 5. Activate environment
source activate pytorch

# 6. Start Jupyter
jupyter notebook --ip=0.0.0.0 --port=8888 --no-browser

# 7. Access
# http://ec2-xx-xxx-xxx-xxx.compute-1.amazonaws.com:8888
```

---

## 🔵 GCP (Google Cloud Platform)

### Overview

```bash
AI/ML Leader (10% market share)
- Created TensorFlow
- Free TPU access
- Best for: Research, TensorFlow users
```

### GPU Instances

```python
# N1 + GPUs (attach GPUs to general instances)
n1_instances = {
    "n1-standard-4 + T4": {
        "gpu": "1x T4 (16GB)",
        "vcpu": 4,
        "ram": "15 GB",
        "price": "$0.35/hour + $0.35/hour (GPU)",
        "total": "$0.70/hour",
        "good_for": "Budget-friendly ML"
    },
    "n1-standard-8 + V100": {
        "gpu": "1x V100 (16GB)",
        "vcpu": 8,
        "ram": "30 GB",
        "price": "$0.70/hour + $2.48/hour (GPU)",
        "total": "$3.18/hour",
        "good_for": "Training large models"
    }
}

# A2 (A100 instances)
a2_instances = {
    "a2-highgpu-1g": {
        "gpu": "1x A100 (40GB)",
        "vcpu": 12,
        "ram": "85 GB",
        "price": "$3.67/hour",
        "good_for": "Latest generation"
    },
    "a2-highgpu-8g": {
        "gpu": "8x A100 (40GB)",
        "vcpu": 96,
        "ram": "680 GB",
        "price": "$29.39/hour",
        "good_for": "Large-scale training"
    }
}
```

### TPUs (Tensor Processing Units)

```python
# Google's custom AI accelerators
tpu_instances = {
    "v2-8": {
        "tpu_cores": 8,
        "memory": "64 GB HBM",
        "price": "$4.50/hour",
        "performance": "180 TFLOPS",
        "good_for": "TensorFlow models"
    },
    "v3-8": {
        "tpu_cores": 8,
        "memory": "128 GB HBM",
        "price": "$8.00/hour",
        "performance": "420 TFLOPS",
        "good_for": "Large TensorFlow models"
    },
    "v4-8": {
        "tpu_cores": 8,
        "memory": "144 GB HBM2e",
        "price": "$4.20/hour",
        "performance": "275 TFLOPS",
        "good_for": "Latest generation, best value"
    }
}

# Free TPU access via:
# - Google Colab Pro+
# - TensorFlow Research Cloud (TFRC)
```

### GCP Services for ML

```bash
# Compute
Compute Engine: VMs with GPUs/TPUs
GKE: Kubernetes Engine
Cloud Functions: Serverless

# Storage
Cloud Storage: Object storage
Persistent Disk: Block storage
Filestore: Managed file storage

# Managed ML
Vertex AI: Unified ML platform
- Training
- Prediction
- Pipelines
- Feature Store
- Model Registry

# Other
Cloud Monitoring: Monitoring
IAM: Access control
VPC: Networking
```

### Getting Started with GCP

```bash
# 1. Create GCP account
# Visit: https://cloud.google.com/free
# Get $300 credit for 90 days

# 2. Install gcloud CLI
# Visit: https://cloud.google.com/sdk/docs/install

# 3. Initialize
gcloud init
gcloud auth login

# 4. Create instance with GPU
gcloud compute instances create ml-instance \
    --zone=us-central1-a \
    --machine-type=n1-standard-4 \
    --accelerator=type=nvidia-tesla-t4,count=1 \
    --image-family=pytorch-latest-gpu \
    --image-project=deeplearning-platform-release \
    --boot-disk-size=100GB \
    --maintenance-policy=TERMINATE \
    --metadata="install-nvidia-driver=True"

# 5. SSH into instance
gcloud compute ssh ml-instance --zone=us-central1-a

# 6. Verify GPU
nvidia-smi
```

---

## 🔷 Azure (Microsoft Azure)

### Overview

```bash
Enterprise Focused (20% market share)
- Strong Windows integration
- Office 365 integration
- Best for: Enterprise, .NET developers
```

### GPU Instances

```python
# NC-series (older)
nc_series = {
    "NC6": {
        "gpu": "1x K80 (12GB)",
        "vcpu": 6,
        "ram": "56 GB",
        "price": "$0.90/hour",
        "good_for": "Legacy workloads"
    },
    "NC6s_v3": {
        "gpu": "1x V100 (16GB)",
        "vcpu": 6,
        "ram": "112 GB",
        "price": "$3.06/hour",
        "good_for": "Training, HPC"
    }
}

# NCv3-series (newer)
ncv3_series = {
    "NC12s_v3": {
        "gpu": "2x V100 (16GB)",
        "vcpu": 12,
        "ram": "224 GB",
        "price": "$6.12/hour",
        "good_for": "Multi-GPU training"
    }
}

# ND A100 v4-series (latest)
nd_series = {
    "ND96asr_v4": {
        "gpu": "8x A100 (40GB)",
        "vcpu": 96,
        "ram": "900 GB",
        "price": "$27.20/hour",
        "good_for": "Large-scale AI/ML"
    }
}
```

### Azure Services for ML

```bash
# Compute
Virtual Machines: VMs with GPUs
AKS: Azure Kubernetes Service
Functions: Serverless

# Storage
Blob Storage: Object storage
Managed Disks: Block storage
Files: File storage

# Managed ML
Azure Machine Learning: End-to-end ML
- Designer (no-code)
- Notebooks
- AutoML
- MLOps

# Other
Monitor: Monitoring
Active Directory: Access control
Virtual Network: Networking
```

---

## 🎓 Specialized ML Platforms

### Lambda Labs

```python
platform = {
    "focus": "GPU cloud for ML",
    "instances": {
        "1x A100 (40GB)": "$1.10/hour",
        "1x A6000 (48GB)": "$0.80/hour",
        "1x H100 (80GB)": "$2.49/hour"
    },
    "pros": [
        "Cheaper than major clouds",
        "ML-focused",
        "Pre-configured environments",
        "Simple pricing"
    ],
    "cons": [
        "Limited regions",
        "Smaller ecosystem",
        "Fewer services"
    ],
    "best_for": "ML training, research"
}
```

### Paperspace

```python
platform = {
    "focus": "GPU cloud + managed notebooks",
    "gradient": {
        "free_tier": "M4000 GPU (8GB), 8 vCPU, 30 GB RAM",
        "paid": "From $0.51/hour (RTX 4000)"
    },
    "pros": [
        "Free GPU tier",
        "Managed Jupyter notebooks",
        "Easy to use",
        "Good documentation"
    ],
    "best_for": "Learning, prototyping"
}
```

### Vast.ai

```python
platform = {
    "focus": "P2P GPU marketplace",
    "pricing": {
        "RTX 3090": "$0.15-0.30/hour",
        "A100": "$0.80-1.50/hour"
    },
    "pros": [
        "Very cheap",
        "Many GPU options",
        "Flexible"
    ],
    "cons": [
        "Inconsistent availability",
        "Variable reliability",
        "No SLA"
    ],
    "best_for": "Budget training, experiments"
}
```

---

## 📊 Comparison Matrix

### Pricing (per hour)

| GPU | AWS | GCP | Azure | Lambda | Vast.ai |
|-----|-----|-----|-------|--------|---------|
| **T4 (16GB)** | $0.526 | $0.35 | N/A | $0.50 | $0.10-0.20 |
| **V100 (16GB)** | $3.06 | $2.48 | $3.06 | N/A | $0.30-0.50 |
| **A10G (24GB)** | $1.01 | N/A | N/A | N/A | $0.20-0.40 |
| **A100 (40GB)** | $4.10 | $3.67 | $3.40 | $1.10 | $0.80-1.50 |
| **H100 (80GB)** | $12.29 | N/A | N/A | $2.49 | N/A |

### Feature Comparison

| Feature | AWS | GCP | Azure | Lambda | Paperspace |
|---------|-----|-----|-------|--------|------------|
| **Free Tier** | ❌ | $300 credit | $200 credit | ❌ | ✅ M4000 |
| **Spot Instances** | ✅ 70% off | ✅ Preemptible | ✅ Spot | ❌ | ✅ |
| **TPUs** | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Managed Notebooks** | SageMaker | Vertex AI | Azure ML | ❌ | Gradient |
| **Container Support** | ECS/EKS | GKE | AKS | ❌ | ✅ |
| **Data Transfer Out** | $0.09/GB | $0.12/GB | $0.087/GB | $0.10/GB | Included |
| **Storage (per GB/month)** | $0.023 | $0.020 | $0.018 | $0.05 | $0.10 |

---

## 🎯 Choosing the Right Platform

### Decision Tree

```bash
START
├─ Free tier needed?
│  ├─ Yes → GCP ($300) or Paperspace (Free GPU)
│  └─ No → Continue
│
├─ Budget constraint?
│  ├─ Very tight → Vast.ai (peer-to-peer)
│  ├─ Moderate → Lambda Labs
│  └─ Flexible → Continue
│
├─ Primary framework?
│  ├─ TensorFlow → GCP (TPU access, Vertex AI)
│  ├─ PyTorch → AWS or Lambda
│  └─ Framework-agnostic → Continue
│
├─ Company ecosystem?
│  ├─ AWS users → AWS (EC2, SageMaker)
│  ├─ Google workspace → GCP
│  ├─ Microsoft/Office 365 → Azure
│  └─ None → Continue
│
├─ Workload type?
│  ├─ Quick experiments → Paperspace Gradient
│  ├─ Production → AWS (most mature)
│  ├─ Research → GCP (TPUs) or Lambda
│  └─ Learning → Colab/Kaggle (free)
│
└─ Recommended: AWS g4dn.xlarge (best balance)
```

### Recommendations by Use Case

```python
recommendations = {
    "Learning / Tutorials": {
        "primary": "Google Colab (Free)",
        "alternative": "Kaggle Notebooks",
        "why": "Free GPU, no setup needed"
    },
    
    "Prototyping / Experiments": {
        "primary": "Paperspace Gradient",
        "alternative": "GCP (with free credits)",
        "why": "Easy to use, managed notebooks"
    },
    
    "Budget Training": {
        "primary": "Vast.ai",
        "alternative": "Lambda Labs",
        "why": "Lowest cost per GPU hour"
    },
    
    "Professional Development": {
        "primary": "AWS g4dn instances",
        "alternative": "GCP n1 + T4",
        "why": "Good balance of performance and cost"
    },
    
    "Large-Scale Training": {
        "primary": "AWS p4d (8x A100)",
        "alternative": "GCP a2-highgpu",
        "why": "Most powerful instances"
    },
    
    "Production Deployment": {
        "primary": "AWS SageMaker",
        "alternative": "GCP Vertex AI",
        "why": "Mature MLOps, auto-scaling"
    },
    
    "TensorFlow + TPU": {
        "primary": "GCP (only provider with TPUs)",
        "alternative": "N/A",
        "why": "TPUs designed for TensorFlow"
    }
}
```

---

## 💪 Exercises

### Exercise 1: Cost Calculation

Calculate training cost on different platforms.

**Solution:**

```python
# Scenario: Train ResNet-50 on ImageNet
# Estimated time: 10 hours on single GPU

costs = {
    "AWS_g4dn_xlarge": {
        "gpu": "T4",
        "price_per_hour": 0.526,
        "hours": 10,
        "total": 0.526 * 10
    },
    "GCP_n1_t4": {
        "gpu": "T4",
        "price_per_hour": 0.70,
        "hours": 10,
        "total": 0.70 * 10
    },
    "Lambda_A100": {
        "gpu": "A100",
        "price_per_hour": 1.10,
        "hours": 5,  # Faster GPU = less time
        "total": 1.10 * 5
    },
    "Vast_ai_RTX3090": {
        "gpu": "RTX 3090",
        "price_per_hour": 0.25,
        "hours": 6,
        "total": 0.25 * 6
    }
}

for platform, details in costs.items():
    print(f"{platform}:")
    print(f"  GPU: {details['gpu']}")
    print(f"  Time: {details['hours']} hours")
    print(f"  Cost: ${details['total']:.2f}")
    print()

# Output:
# AWS_g4dn_xlarge: $5.26
# GCP_n1_t4: $7.00
# Lambda_A100: $5.50
# Vast_ai_RTX3090: $1.50
```

---

## 🎯 Key Takeaways

✅ **AWS**: Most mature, best for production  
✅ **GCP**: Best for TensorFlow, TPUs, research  
✅ **Azure**: Best for enterprise, Microsoft ecosystem  
✅ **Lambda**: Budget-friendly, ML-focused  
✅ **Paperspace**: Free tier, managed notebooks  
✅ **Vast.ai**: Cheapest, peer-to-peer marketplace  
✅ **Free Tiers**: Start with Colab/Kaggle before paying  

---

## 🔗 Navigation

- **Previous**: [02-GPU-Setup.md](./02-GPU-Setup.md)
- **Next**: [04-Free-Cloud-Resources.md](./04-Free-Cloud-Resources.md)
- **Up**: [README.md](./README.md)

---

**Happy Cloud Computing! ☁️🚀**
