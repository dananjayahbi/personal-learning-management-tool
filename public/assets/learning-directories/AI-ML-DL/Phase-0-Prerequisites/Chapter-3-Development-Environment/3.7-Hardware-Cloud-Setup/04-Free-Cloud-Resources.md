# 🆓 Free Cloud Resources for Machine Learning

## Overview

Learn how to leverage free cloud GPU resources from Google Colab, Kaggle Notebooks, Paperspace, GitHub Codespaces, and academic grants to train ML models without spending money.

---

## 📚 Table of Contents

1. [Introduction](#introduction)
2. [Google Colab](#google-colab)
3. [Kaggle Notebooks](#kaggle-notebooks)
4. [Paperspace Gradient](#paperspace-gradient)
5. [GitHub Codespaces](#github-codespaces)
6. [University & Research Grants](#university--research-grants)
7. [Best Practices](#best-practices)
8. [Comparison](#comparison)
9. [Exercises](#exercises)

---

## 🎯 Introduction

### Free GPU Resources

```python
free_options = {
    "Google Colab": {
        "gpu": "T4 (16GB)",
        "session": "12 hours",
        "storage": "Google Drive",
        "cost": "$0 (Free) or $9.99/month (Pro)"
    },
    "Kaggle": {
        "gpu": "P100 or T4 (16GB)",
        "weekly_quota": "30 hours GPU",
        "storage": "20GB",
        "cost": "$0"
    },
    "Paperspace": {
        "gpu": "M4000 (8GB)",
        "session": "6 hours",
        "storage": "5GB",
        "cost": "$0 (Free tier)"
    },
    "GitHub Codespaces": {
        "gpu": "None (CPU only)",
        "monthly_quota": "60 hours",
        "cost": "$0 (Free tier)"
    }
}

# Combined strategy:
# Colab (daily experimentation)
# + Kaggle (competitions, datasets)
# + Paperspace (longer sessions)
# = Zero cost ML development!
```

---

## 🔬 Google Colab

### Free Tier

```python
colab_free = {
    "gpu": "T4 (16GB VRAM)",
    "cpu": "2-core Xeon",
    "ram": "12-13 GB",
    "disk": "100+ GB (temporary)",
    "session": "Up to 12 hours",
    "cost": "Free",
    "limitations": [
        "Session disconnects after 90 min idle",
        "May not always get GPU (high demand)",
        "Files deleted after session ends"
    ]
}
```

### Colab Pro ($9.99/month)

```python
colab_pro = {
    "gpu": "T4, sometimes P100 or V100",
    "ram": "Up to 25 GB",
    "session": "Up to 24 hours",
    "priority": "Better GPU availability",
    "background": "Run in background",
    "cost": "$9.99/month"
}
```

### Colab Pro+ ($49.99/month)

```python
colab_pro_plus = {
    "gpu": "A100 (40GB) sometimes available",
    "ram": "Up to 52 GB",
    "session": "Extended runtime",
    "compute_units": "500 units/month",
    "cost": "$49.99/month"
}
```

### Getting Started

```python
# 1. Check GPU availability
import tensorflow as tf
import torch

# TensorFlow
print("TensorFlow GPU:", tf.config.list_physical_devices('GPU'))

# PyTorch
print("PyTorch CUDA:", torch.cuda.is_available())
print("PyTorch GPU:", torch.cuda.get_device_name(0) if torch.cuda.is_available() else "None")

# System info
!nvidia-smi
```

### Mount Google Drive

```python
from google.colab import drive

# Mount Drive
drive.mount('/content/drive')

# Access files
import os
os.listdir('/content/drive/MyDrive')

# Save model to Drive
model.save('/content/drive/MyDrive/models/my_model.h5')

# Load data from Drive
import pandas as pd
df = pd.read_csv('/content/drive/MyDrive/data/train.csv')
```

### Install Packages

```python
# Install packages
!pip install transformers datasets

# Install specific versions
!pip install torch==2.0.0 torchvision==0.15.0

# Install from requirements.txt (upload to Drive first)
!pip install -r /content/drive/MyDrive/requirements.txt

# Verify
import transformers
print(transformers.__version__)
```

### Download Files

```python
# Download from URL
!wget https://example.com/dataset.zip
!unzip dataset.zip

# Download from Kaggle (need API key)
!pip install -q kaggle
!mkdir -p ~/.kaggle
!cp /content/drive/MyDrive/kaggle.json ~/.kaggle/
!chmod 600 ~/.kaggle/kaggle.json
!kaggle datasets download -d username/dataset-name

# Download model weights
from transformers import AutoModel
model = AutoModel.from_pretrained('bert-base-uncased')
# Downloads to ~/.cache/huggingface/
```

### Best Practices

```python
# 1. Save checkpoints frequently
import torch

for epoch in range(100):
    # Training...
    
    if epoch % 10 == 0:
        torch.save({
            'epoch': epoch,
            'model_state_dict': model.state_dict(),
            'optimizer_state_dict': optimizer.state_dict(),
        }, f'/content/drive/MyDrive/checkpoints/checkpoint_epoch_{epoch}.pth')

# 2. Use smaller batch sizes (limited RAM)
batch_size = 16  # Instead of 64

# 3. Clear memory
import gc
import torch

torch.cuda.empty_cache()
gc.collect()

# 4. Monitor RAM usage
!free -h

# 5. Keep session active (run periodically)
import time
while True:
    print("Session active")
    time.sleep(300)  # Every 5 minutes
```

---

## 📊 Kaggle Notebooks

### Features

```python
kaggle_specs = {
    "gpu": "P100 (16GB) or T4 (16GB)",
    "cpu": "4-core",
    "ram": "20 GB (GPU), 16 GB (CPU)",
    "disk": "~17 GB working, input data separate",
    "weekly_quota": "30 hours GPU + 20 hours TPU",
    "session": "9 hours max (then auto-save & restart)",
    "cost": "Free",
    "advantages": [
        "Access to Kaggle datasets (no download needed)",
        "Version control built-in",
        "Public notebooks for learning",
        "Competition submissions"
    ]
}
```

### Getting Started

```python
# Kaggle notebook environment

# 1. Check GPU
import torch
print(f"GPU: {torch.cuda.get_device_name(0)}")
# GPU: Tesla P100-PCIE-16GB

# 2. Access Kaggle datasets
# Add dataset to notebook (UI)
# Available at: /kaggle/input/dataset-name/

import pandas as pd
df = pd.read_csv('/kaggle/input/titanic/train.csv')

# 3. Output directory (persists after session)
# Save to: /kaggle/working/

model.save('/kaggle/working/model.h5')

# 4. Install packages
!pip install transformers

# 5. Internet access
# Settings > Internet: On
!wget https://example.com/file.zip
```

### Competition Workflow

```python
# 1. Load competition data
import pandas as pd

train = pd.read_csv('/kaggle/input/competition-name/train.csv')
test = pd.read_csv('/kaggle/input/competition-name/test.csv')

# 2. Train model
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier()
model.fit(train.drop('target', axis=1), train['target'])

# 3. Make predictions
predictions = model.predict(test)

# 4. Create submission
submission = pd.DataFrame({
    'id': test['id'],
    'target': predictions
})
submission.to_csv('/kaggle/working/submission.csv', index=False)

# 5. Submit (Kaggle UI or API)
# Notebook Output > Submit to Competition
```

### Best Practices

```python
# 1. Use dataset versions
# Pin dataset version to ensure reproducibility

# 2. Enable GPU in settings
# Settings > Accelerator > GPU T4 x2

# 3. Save intermediate results
import pickle

# Save preprocessed data
with open('/kaggle/working/processed_data.pkl', 'wb') as f:
    pickle.dump(data, f)

# 4. Use Kaggle Datasets API
!pip install -q kaggle
from kaggle.api.kaggle_api_extended import KaggleApi

api = KaggleApi()
api.authenticate()

# Download dataset
api.dataset_download_files('username/dataset', path='/kaggle/working', unzip=True)

# 5. Commit and version notebook
# Version control automatic on each save
```

---

## 🎨 Paperspace Gradient

### Free Tier

```python
paperspace_free = {
    "gpu": "M4000 (8GB)",
    "cpu": "8 vCPU",
    "ram": "30 GB",
    "storage": "5 GB persistent",
    "session": "6 hours",
    "cost": "Free",
    "limitations": [
        "Lower-end GPU",
        "Limited storage",
        "Shorter sessions"
    ]
}
```

### Paid Tiers

```python
paperspace_paid = {
    "RTX 4000": "$0.51/hour",
    "RTX 5000": "$0.78/hour",
    "A4000": "$0.76/hour",
    "A5000": "$1.38/hour",
    "A6000": "$1.89/hour",
    "A100": "$3.09/hour"
}
```

### Getting Started

```bash
# 1. Create account
# Visit: https://www.paperspace.com/gradient

# 2. Create notebook
# Gradient > Notebooks > Create
# Runtime: Free-GPU (M4000)
# Container: PyTorch, TensorFlow, or Custom

# 3. Access Jupyter Lab
# Opens in browser

# 4. Persistent storage
# /storage/ - Persists across sessions (5GB free)
# /notebooks/ - Deleted after session

# 5. Install packages
!pip install transformers datasets
```

### Gradient CLI

```bash
# Install Gradient CLI
pip install gradient

# Login
gradient apiKey <YOUR_API_KEY>

# Create notebook from CLI
gradient notebooks create \
  --container paperspace/fastai:1.0-CUDA9.2-base-3.0-v1.0.6 \
  --machineType Free-GPU \
  --command "jupyter lab --allow-root --ip=0.0.0.0 --no-browser"

# List notebooks
gradient notebooks list

# Stop notebook
gradient notebooks stop --id <NOTEBOOK_ID>
```

---

## 💻 GitHub Codespaces

### Features

```python
codespaces_free = {
    "cpu": "2-core or 4-core",
    "ram": "4 GB or 8 GB",
    "storage": "15 GB or 32 GB",
    "monthly_quota": "120 core-hours (60 hours 2-core)",
    "cost": "Free",
    "gpu": "None",
    "best_for": "Development, CPU-only tasks, code editing"
}

# Note: No GPU in free tier!
# Good for:
# - Code development
# - Data preprocessing
# - Testing scripts
# - Light ML tasks (sklearn)
```

### Usage

```bash
# 1. Open repository in Codespaces
# GitHub repo > Code button > Codespaces > Create

# 2. Runs VS Code in browser
# Full development environment

# 3. Install packages
pip install pandas numpy scikit-learn

# 4. Good for:
# - Exploratory data analysis
# - Feature engineering
# - Traditional ML (Random Forest, XGBoost)
# - Testing code before running on GPU
```

---

## 🎓 University & Research Grants

### Academic Programs

```python
academic_programs = {
    "Google Cloud Education": {
        "credits": "$50-300",
        "requirements": "University email",
        "includes": "GCP services, TPUs",
        "apply": "https://edu.google.com/programs/credits/"
    },
    
    "AWS Educate": {
        "credits": "$30-100",
        "requirements": "Student/educator",
        "includes": "EC2, S3, SageMaker",
        "apply": "https://aws.amazon.com/education/awseducate/"
    },
    
    "Azure for Students": {
        "credits": "$100",
        "requirements": "University email",
        "includes": "Azure services",
        "apply": "https://azure.microsoft.com/en-us/free/students/"
    },
    
    "NVIDIA Academic Program": {
        "benefits": "Discounted GPUs, DGX access",
        "requirements": "Researcher/faculty",
        "apply": "https://www.nvidia.com/en-us/research/"
    }
}
```

### Research Grants

```python
research_grants = {
    "TensorFlow Research Cloud": {
        "provides": "Free TPU access",
        "requirements": "Research proposal",
        "duration": "30 days (renewable)",
        "apply": "https://www.tensorflow.org/tfrc"
    },
    
    "OpenAI Researcher Access": {
        "provides": "API credits, compute",
        "requirements": "Research institution",
        "apply": "https://openai.com/form/researcher-access-program"
    },
    
    "Lambda GPU Cloud Credits": {
        "provides": "$1,000+ credits",
        "requirements": "Research proposal",
        "apply": "Contact Lambda Labs"
    }
}
```

---

## 💡 Best Practices

### Maximize Free Resources

```python
# Strategy 1: Use multiple platforms
workflow = {
    "Morning": "Kaggle (train model, 30h/week)",
    "Afternoon": "Colab (experiments, 12h sessions)",
    "Evening": "Paperspace (long training, 6h sessions)",
}

# Strategy 2: Optimize usage
tips = [
    "Save checkpoints frequently",
    "Use smaller batch sizes",
    "Experiment on CPU first, train on GPU",
    "Use pretrained models when possible",
    "Compress datasets",
    "Use mixed precision training"
]

# Strategy 3: Session management
def maximize_free_tier():
    """Best practices for free GPU usage."""
    
    # 1. Test on small subset locally/Colab
    test_on_subset(data[:1000])
    
    # 2. Once working, full training on Kaggle
    full_train_on_kaggle(data)
    
    # 3. For very long training, use Paperspace
    if training_time > 9:
        use_paperspace_for_overnight()
    
    # 4. Save everything to cloud storage
    save_to_google_drive()
    save_to_kaggle_datasets()
```

### Avoid Session Timeouts

```python
# Colab: Click "Runtime > Change runtime type" periodically

# Kaggle: Enable "Save Version" to checkpoint

# Paperspace: Save to /storage/ directory

# JavaScript snippet (Colab) - keeps session active
from IPython.display import display, Javascript

js = '''
function keepAlive() {
    console.log('Keeping session alive');
}
setInterval(keepAlive, 60000);  // Every minute
'''

display(Javascript(js))
```

---

## 📊 Comparison

### Feature Comparison

| Feature | Colab Free | Colab Pro | Kaggle | Paperspace Free |
|---------|------------|-----------|--------|-----------------|
| **GPU** | T4 (16GB) | T4/P100/V100 | P100/T4 (16GB) | M4000 (8GB) |
| **RAM** | 12 GB | 25 GB | 20 GB | 30 GB |
| **Session** | 12 hours | 24 hours | 9 hours | 6 hours |
| **Idle Timeout** | 90 min | Extended | None | 1 hour |
| **Weekly Quota** | Unlimited | Unlimited | 30h GPU | Unlimited |
| **Storage** | Drive | Drive | 20 GB | 5 GB |
| **Cost** | Free | $10/month | Free | Free |
| **Best For** | Experiments | Development | Competitions | Long training |

### Recommendations

```python
use_cases = {
    "Learning ML": {
        "primary": "Google Colab Free",
        "reason": "Easy to use, no setup"
    },
    
    "Kaggle Competitions": {
        "primary": "Kaggle Notebooks",
        "reason": "Direct data access, easy submission"
    },
    
    "Research": {
        "primary": "Colab Pro + Academic credits",
        "reason": "Better GPUs, more flexibility"
    },
    
    "Production Prototyping": {
        "primary": "Free credits → Paid cloud",
        "reason": "Test on free tier, scale on paid"
    },
    
    "Cost-Conscious Training": {
        "primary": "Rotate: Colab → Kaggle → Paperspace",
        "reason": "Maximize free resources"
    }
}
```

---

## 💪 Exercises

### Exercise 1: Setup All Free Platforms

Create accounts and test GPU access on all platforms.

**Solution:**

```python
# Colab
# 1. Visit: https://colab.research.google.com/
# 2. Runtime > Change runtime type > GPU
# 3. Run:
import torch
print(f"Colab GPU: {torch.cuda.get_device_name(0)}")

# Kaggle
# 1. Visit: https://www.kaggle.com/code
# 2. New Notebook > Settings > GPU T4 x2
# 3. Run:
import torch
print(f"Kaggle GPU: {torch.cuda.get_device_name(0)}")

# Paperspace
# 1. Visit: https://www.paperspace.com/gradient
# 2. Create Notebook > Free-GPU
# 3. Run:
import torch
print(f"Paperspace GPU: {torch.cuda.get_device_name(0)}")
```

### Exercise 2: Train Model Using Free Resources

Train a model rotating between platforms.

**Solution:**

```python
# Day 1: Prototype on Colab (2 hours)
# - Load small dataset
# - Test different models
# - Find best hyperparameters

# Day 2-3: Full training on Kaggle (20 hours)
# - Load full dataset
# - Train best model
# - Save checkpoints

# Day 4: Fine-tuning on Paperspace (6 hours)
# - Load best checkpoint
# - Fine-tune on validation set
# - Export final model

# Total cost: $0
# Total GPU time: 28 hours
```

---

## 🎯 Key Takeaways

✅ **Colab**: Best for experimentation, easy to use  
✅ **Kaggle**: Best for competitions, 30h GPU/week  
✅ **Paperspace**: Best for longer sessions (6h)  
✅ **Academic Credits**: Free $50-300 for students  
✅ **Strategy**: Rotate platforms to maximize free usage  
✅ **Checkpoints**: Save frequently to avoid losing work  
✅ **Optimization**: Small batches, mixed precision, pretrained models  

---

## 🔗 Navigation

- **Previous**: [03-Cloud-Platforms.md](./03-Cloud-Platforms.md)
- **Next**: [05-Cloud-GPU-Rentals.md](./05-Cloud-GPU-Rentals.md)
- **Up**: [README.md](./README.md)

---

**Happy Free GPU Computing! 🆓🚀**
