# 📊 Data Version Control (DVC)

## Overview

Learn how to use DVC (Data Version Control) for versioning large datasets, creating reproducible ML pipelines, and tracking experiments. DVC is Git for data and models.

---

## 📚 Table of Contents

1. [Introduction to DVC](#introduction-to-dvc)
2. [Installation](#installation)
3. [Tracking Data](#tracking-data)
4. [DVC Pipelines](#dvc-pipelines)
5. [Remote Storage](#remote-storage)
6. [DVC Workflow](#dvc-workflow)
7. [Experiments](#experiments)
8. [DVC vs Git LFS](#dvc-vs-git-lfs)
9. [Advanced Features](#advanced-features)
10. [Troubleshooting](#troubleshooting)
11. [Exercises](#exercises)

---

## 🎯 Introduction to DVC

### What is DVC?

```bash
# DVC = Git for data and models
# - Version datasets
# - Track ML pipelines
# - Reproduce experiments
# - Share data efficiently
```

### Why Use DVC?

```bash
✅ Version large files (GB, TB)
✅ Store data in cloud (S3, GCS, Azure)
✅ Reproducible pipelines
✅ Experiment tracking
✅ Team collaboration
✅ Git-like workflow
✅ Language/framework agnostic
✅ Free and open-source
```

### DVC vs Git

```bash
# Git tracks code
src/
├── train.py         ✅ Git
├── model.py         ✅ Git
└── config.yaml      ✅ Git

# DVC tracks data and models
data/
├── train.csv        ✅ DVC (5GB)
└── test.csv         ✅ DVC (1GB)

models/
└── model.pkl        ✅ DVC (500MB)

# Git tracks DVC metadata
data/train.csv.dvc   ✅ Git (tiny)
models/model.pkl.dvc ✅ Git (tiny)
```

### How DVC Works

```bash
# 1. Track file with DVC
dvc add data/train.csv

# 2. DVC creates:
# - data/train.csv.dvc (metadata, tracked by Git)
# - data/.gitignore (ignores actual file)
# - .dvc/cache/ (local cache of file)

# 3. Commit DVC file
git add data/train.csv.dvc data/.gitignore
git commit -m "Track training data v1"

# 4. Push data to remote storage
dvc push  # Upload to S3/GCS/etc

# 5. Others can pull
git pull
dvc pull  # Download from S3/GCS/etc
```

---

## 📥 Installation

### Install DVC

```bash
# Method 1: pip
pip install dvc

# Method 2: conda
conda install -c conda-forge dvc

# Method 3: brew (macOS)
brew install dvc

# Verify
dvc version
# 3.37.0
```

### Install Remote Storage Support

```bash
# Amazon S3
pip install 'dvc[s3]'

# Google Cloud Storage
pip install 'dvc[gs]'

# Azure Blob Storage
pip install 'dvc[azure]'

# SSH/SFTP
pip install 'dvc[ssh]'

# All remotes
pip install 'dvc[all]'
```

### Initialize DVC

```bash
# Initialize Git first
git init

# Initialize DVC
dvc init

# This creates:
# .dvc/
# ├── config          # DVC configuration
# ├── .gitignore      # Ignore DVC cache
# └── cache/          # Local cache

# Commit DVC setup
git add .dvc .dvcignore
git commit -m "Initialize DVC"
```

---

## 📁 Tracking Data

### Track Single File

```bash
# Track file
dvc add data/train.csv

# DVC creates:
# 1. data/train.csv.dvc (metadata)
# 2. Adds data/train.csv to data/.gitignore
# 3. Copies file to .dvc/cache/

# .dvc file contents
cat data/train.csv.dvc
# outs:
# - md5: a304afb96060aad90176268345e10355
#   size: 5242880000
#   path: train.csv

# Commit .dvc file
git add data/train.csv.dvc data/.gitignore
git commit -m "Track training data v1"
```

### Track Directory

```bash
# Track entire directory
dvc add data/raw/

# Creates data/raw.dvc
cat data/raw.dvc
# outs:
# - md5: raw.dir
#   size: 10485760000
#   nfiles: 1000
#   path: raw

# Commit
git add data/raw.dvc data/.gitignore
git commit -m "Track raw data directory"
```

### Update Tracked File

```bash
# Modify data
python scripts/preprocess.py  # Updates data/train.csv

# Update DVC tracking
dvc add data/train.csv

# Commit new version
git add data/train.csv.dvc
git commit -m "Update training data v2"

# Push new version
dvc push
```

### View File Status

```bash
# Check DVC status
dvc status
# data/train.csv.dvc:
#     changed outs:
#         modified: data/train.csv

# Check data integrity
dvc checkout
# Restores files to match .dvc files
```

---

## 🔄 DVC Pipelines

### Why Pipelines?

```bash
# Problem: Manual workflow
python download.py       # Creates data/raw/
python preprocess.py     # Creates data/processed/
python train.py          # Creates models/model.pkl
python evaluate.py       # Creates metrics.json

# ❌ Not reproducible
# ❌ Hard to track dependencies
# ❌ Manual execution

# Solution: DVC Pipeline
dvc repro                # Runs entire pipeline
# ✅ Reproducible
# ✅ Tracks dependencies
# ✅ Caches results
# ✅ Skips unchanged stages
```

### Define Pipeline

```yaml
# dvc.yaml
stages:
  download:
    cmd: python src/download.py
    deps:
      - src/download.py
    outs:
      - data/raw

  preprocess:
    cmd: python src/preprocess.py
    deps:
      - src/preprocess.py
      - data/raw
    params:
      - preprocess.test_size
    outs:
      - data/processed

  train:
    cmd: python src/train.py
    deps:
      - src/train.py
      - data/processed
    params:
      - train.learning_rate
      - train.epochs
    outs:
      - models/model.pkl
    metrics:
      - metrics.json:
          cache: false

  evaluate:
    cmd: python src/evaluate.py
    deps:
      - src/evaluate.py
      - models/model.pkl
      - data/processed
    metrics:
      - evaluation.json:
          cache: false
```

### Parameters File

```yaml
# params.yaml
preprocess:
  test_size: 0.2
  random_state: 42

train:
  learning_rate: 0.001
  epochs: 100
  batch_size: 32
```

### Run Pipeline

```bash
# Run entire pipeline
dvc repro

# DVC:
# 1. Checks dependencies
# 2. Skips unchanged stages
# 3. Runs modified stages
# 4. Caches outputs

# Example output:
# 'data/raw.dvc' didn't change, skipping
# Running stage 'preprocess':
# > python src/preprocess.py
# Running stage 'train':
# > python src/train.py
# Running stage 'evaluate':
# > python src/evaluate.py
```

### Visualize Pipeline

```bash
# Show pipeline DAG
dvc dag

# download
#     *
#     **
#     ***
# preprocess
#     *
#     **
#     ***
#   train
#     *
#     **
#     ***
# evaluate

# ASCII art representation
dvc dag --ascii
```

---

## ☁️ Remote Storage

### Configure Remote

```bash
# Amazon S3
dvc remote add -d myremote s3://mybucket/dvcstore

# Google Cloud Storage
dvc remote add -d myremote gs://mybucket/dvcstore

# Azure Blob Storage
dvc remote add -d myremote azure://mycontainer/path

# SSH/SFTP
dvc remote add -d myremote ssh://user@example.com/path

# Local directory (testing)
dvc remote add -d myremote /tmp/dvcstore

# Commit remote config
git add .dvc/config
git commit -m "Configure DVC remote"
```

### Advanced Remote Config

```bash
# AWS with profile
dvc remote modify myremote profile myprofile

# AWS with credentials
dvc remote modify myremote access_key_id AKIA...
dvc remote modify myremote secret_access_key SECRET...

# GCS with service account
dvc remote modify myremote credentialpath /path/to/credentials.json

# Password for SSH
dvc remote modify myremote password mypassword

# Or use SSH key
dvc remote modify myremote keyfile ~/.ssh/id_rsa
```

### Push and Pull

```bash
# Push data to remote
dvc push
# 1 file pushed

# Push specific file
dvc push data/train.csv.dvc

# Pull data from remote
dvc pull
# 1 file fetched

# Pull specific file
dvc pull data/train.csv.dvc

# Check remote status
dvc status --remote
```

---

## 🔄 DVC Workflow

### Complete Workflow

```bash
# 1. Setup
git init
dvc init
git add .dvc .dvcignore
git commit -m "Initialize DVC"

# 2. Configure remote
dvc remote add -d storage s3://mybucket/dvcstore
git add .dvc/config
git commit -m "Configure remote"

# 3. Track data
dvc add data/train.csv
git add data/train.csv.dvc data/.gitignore
git commit -m "Track training data v1"

# 4. Push data
dvc push

# 5. Push code
git push origin main
```

### Team Collaboration

```bash
# Team member clones repository
git clone https://github.com/user/ml-project.git
cd ml-project

# Install dependencies
pip install -r requirements.txt

# Pull data
dvc pull
# Downloads data/train.csv from S3

# Make changes
python scripts/improve_model.py

# Track changes
dvc add models/model.pkl
git add models/model.pkl.dvc
git commit -m "Improve model accuracy"

# Push
dvc push
git push origin main
```

### Switching Versions

```bash
# View data versions
git log data/train.csv.dvc

# Checkout old version
git checkout HEAD~1 data/train.csv.dvc

# Update data to match
dvc checkout

# Train with old data
python src/train.py

# Return to latest
git checkout main data/train.csv.dvc
dvc checkout
```

---

## 🧪 Experiments

### Track Experiments

```bash
# Run experiment
dvc exp run

# Run with different parameters
dvc exp run --set-param train.learning_rate=0.01

# Run multiple experiments
dvc exp run --set-param train.learning_rate=0.001 --name exp1
dvc exp run --set-param train.learning_rate=0.01 --name exp2
dvc exp run --set-param train.learning_rate=0.1 --name exp3
```

### View Experiments

```bash
# Show experiments table
dvc exp show

# ┏━━━━━━━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━━┓
# ┃ Experiment    ┃ lr      ┃ accuracy  ┃ loss     ┃
# ┡━━━━━━━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━━━╇━━━━━━━━━━┩
# │ workspace     │ 0.001   │ 0.85      │ 0.32     │
# │ exp1          │ 0.001   │ 0.85      │ 0.32     │
# │ exp2          │ 0.01    │ 0.87      │ 0.28     │
# │ exp3          │ 0.1     │ 0.82      │ 0.41     │
# └───────────────┴─────────┴───────────┴──────────┘

# Compare experiments
dvc exp diff exp2 exp3
```

### Apply Experiment

```bash
# Apply best experiment
dvc exp apply exp2

# Commit experiment
git add dvc.lock params.yaml
git commit -m "Apply exp2 (lr=0.01, acc=0.87)"

# Push data
dvc push
```

### Experiments with Queue

```bash
# Queue experiments
dvc exp run --queue --set-param train.lr=0.001
dvc exp run --queue --set-param train.lr=0.01
dvc exp run --queue --set-param train.lr=0.1

# Run all queued experiments
dvc exp run --run-all

# Run in parallel
dvc exp run --run-all --jobs 4
```

---

## ⚖️ DVC vs Git LFS

### Comparison Table

| Feature | DVC | Git LFS |
|---------|-----|---------|
| **Storage** | S3, GCS, Azure, SSH, local | GitHub/GitLab LFS |
| **File Size** | Unlimited | 2GB recommended |
| **Cost** | Cloud storage prices | $5/50GB/month (GitHub) |
| **Pipelines** | ✅ Yes | ❌ No |
| **Experiments** | ✅ Yes | ❌ No |
| **Metrics** | ✅ Yes | ❌ No |
| **Versioning** | Via .dvc files | Via Git |
| **Setup** | More complex | Simple |
| **Integration** | CLI, Python API | Git-native |
| **Best For** | Large data, pipelines | Models, small data |

### When to Use DVC

```bash
✅ Large datasets (> 5GB)
✅ Data pipelines
✅ Experiment tracking
✅ Multiple data versions
✅ Cloud storage (S3, GCS)
✅ Reproducible workflows
✅ Metric comparison
```

### When to Use Git LFS

```bash
✅ Model weights (< 2GB)
✅ Small datasets (< 1GB)
✅ Simple workflow
✅ Git-centric team
✅ GitHub/GitLab hosting
✅ No pipeline needed
```

---

## 🚀 Advanced Features

### DVC Plots

```bash
# Track metrics over time
# metrics.json
{
  "accuracy": 0.85,
  "loss": 0.32
}

# Plot metrics
dvc plots show metrics.json

# Compare experiments
dvc plots diff exp1 exp2
```

### DVC Metrics

```bash
# Define metrics in dvc.yaml
metrics:
  - metrics.json:
      cache: false

# Show metrics
dvc metrics show
# Path          accuracy    loss
# metrics.json  0.85        0.32

# Compare metrics
dvc metrics diff HEAD~1 HEAD
```

### DVC Import

```bash
# Import data from another DVC project
dvc import https://github.com/user/data-repo data/dataset.csv

# Import URL
dvc import-url https://example.com/data.csv data/data.csv
```

### DVC Live

```python
# Track metrics during training
from dvclive import Live

live = Live()

for epoch in range(100):
    # Training...
    live.log("loss", loss)
    live.log("accuracy", acc)
    live.next_step()

live.end()
```

---

## 🔧 Troubleshooting

### Problem: dvc pull fails

```bash
# Error: Failed to pull data

# Solution 1: Check remote config
dvc remote list
dvc remote modify myremote url s3://correct-bucket/path

# Solution 2: Check credentials
dvc remote modify myremote access_key_id YOUR_KEY
dvc remote modify myremote secret_access_key YOUR_SECRET

# Solution 3: Test connection
dvc doctor
```

### Problem: Large cache

```bash
# Cache grows too large
du -sh .dvc/cache
# 50GB

# Remove unused cache
dvc gc --workspace

# More aggressive (keeps only current workspace)
dvc gc --cloud --workspace

# Remove all cache (re-download with dvc pull)
rm -rf .dvc/cache
```

### Problem: Conflicts

```bash
# Both users modified same data

# Solution 1: Accept theirs
git checkout --theirs data/train.csv.dvc
dvc checkout

# Solution 2: Accept ours
git checkout --ours data/train.csv.dvc
dvc checkout

# Solution 3: Manual resolution
# Edit .dvc file, choose correct MD5
vim data/train.csv.dvc
dvc checkout
```

---

## 💪 Exercises

### Exercise 1: Basic DVC Setup

Setup DVC for data versioning.

**Solution:**

```bash
# Initialize
git init
dvc init
git add .dvc .dvcignore
git commit -m "Initialize DVC"

# Configure remote (local for testing)
dvc remote add -d storage /tmp/dvcstore
git add .dvc/config
git commit -m "Configure remote"

# Track data
echo "sample data" > data/train.csv
dvc add data/train.csv
git add data/train.csv.dvc data/.gitignore
git commit -m "Track training data"

# Push
dvc push
```

### Exercise 2: Create Pipeline

Create DVC pipeline.

**Solution:**

```yaml
# dvc.yaml
stages:
  prepare:
    cmd: python src/prepare.py
    deps:
      - src/prepare.py
    outs:
      - data/processed

  train:
    cmd: python src/train.py
    deps:
      - src/train.py
      - data/processed
    params:
      - train.epochs
    outs:
      - models/model.pkl
    metrics:
      - metrics.json:
          cache: false
```

```yaml
# params.yaml
train:
  epochs: 10
```

```python
# src/prepare.py
import os
os.makedirs('data/processed', exist_ok=True)
with open('data/processed/data.txt', 'w') as f:
    f.write('processed data')

# src/train.py
import yaml
import json

with open('params.yaml') as f:
    params = yaml.safe_load(f)

metrics = {'accuracy': 0.85}
with open('metrics.json', 'w') as f:
    json.dump(metrics, f)

with open('models/model.pkl', 'w') as f:
    f.write('model')
```

```bash
# Run pipeline
dvc repro

# Commit
git add dvc.yaml dvc.lock params.yaml
git commit -m "Add pipeline"
```

### Exercise 3: Track Experiments

Run and compare experiments.

**Solution:**

```bash
# Run baseline
dvc exp run

# Run experiments with different params
dvc exp run --set-param train.epochs=5 --name exp1
dvc exp run --set-param train.epochs=10 --name exp2
dvc exp run --set-param train.epochs=20 --name exp3

# View results
dvc exp show

# Apply best
dvc exp apply exp2
git add dvc.lock params.yaml
git commit -m "Best experiment: epochs=10"
```

---

## 🎯 Key Takeaways

✅ **DVC**: Git for data and models  
✅ **Installation**: `pip install 'dvc[s3]'`  
✅ **Tracking**: `dvc add data.csv` creates .dvc metadata file  
✅ **Remote**: Configure S3/GCS/Azure for team sharing  
✅ **Pipelines**: Define reproducible workflows in dvc.yaml  
✅ **Experiments**: Track and compare with `dvc exp`  
✅ **Best For**: Large datasets, pipelines, experiments  
✅ **Commands**: `dvc add`, `dvc push/pull`, `dvc repro`, `dvc exp`  

---

## 🔗 Navigation

- **Previous**: [05-Git-LFS.md](./05-Git-LFS.md)
- **Up**: [README.md](./README.md)
- **Chapter Home**: [Chapter 3 - Development Environment](../README.md)

---

## 📚 Additional Resources

- [DVC Documentation](https://dvc.org/doc)
- [DVC Examples](https://github.com/iterative/example-get-started)
- [DVC Tutorial](https://dvc.org/doc/start)
- [DVC Use Cases](https://dvc.org/doc/use-cases)

---

**Happy Data Versioning! 📊🚀**
