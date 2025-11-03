# 🤖 Git for Machine Learning Projects

## Overview

Learn specialized Git practices for machine learning projects, including what to version control, handling large files, data versioning strategies, model management, and experiment tracking.

---

## 📚 Table of Contents

1. [What to Version Control](#what-to-version-control)
2. [Comprehensive .gitignore for ML](#comprehensive-gitignore-for-ml)
3. [Handling Large Files](#handling-large-files)
4. [Data Versioning Strategies](#data-versioning-strategies)
5. [Model Versioning](#model-versioning)
6. [Experiment Tracking](#experiment-tracking)
7. [Reproducibility](#reproducibility)
8. [ML Project Structure](#ml-project-structure)
9. [CI/CD for ML](#cicd-for-ml)
10. [Exercises](#exercises)

---

## ✅ What to Version Control

### **DO** Version Control These

```bash
# ✅ Source code
src/
├── __init__.py
├── model.py
├── train.py
├── evaluate.py
└── utils.py

# ✅ Configuration files
config/
├── config.yaml
├── hyperparameters.json
└── data_config.py

# ✅ Environment specifications
requirements.txt
environment.yml
Dockerfile

# ✅ Small reference datasets (<10MB)
data/
├── sample.csv          # ✅ Small sample
└── data_description.txt

# ✅ Model architecture code (not weights!)
models/
└── architecture.py     # ✅ Code
    # model.h5         # ❌ Weights

# ✅ Scripts and notebooks
scripts/
├── download_data.py
├── preprocess.py
└── visualize.py

notebooks/
└── exploration.ipynb   # ✅ Cleared output

# ✅ Documentation
README.md
CONTRIBUTING.md
docs/
└── api_reference.md

# ✅ Tests
tests/
├── test_model.py
├── test_preprocessing.py
└── test_utils.py

# ✅ CI/CD configuration
.github/
└── workflows/
    └── test.yml
```

### **DON'T** Version Control These

```bash
# ❌ Large datasets
data/
├── train.csv          # 5GB
├── test.csv           # 2GB
└── images/            # 50GB
    # Use DVC or Git LFS instead!

# ❌ Trained model weights
models/
├── model_v1.h5        # 500MB
├── model_v2.pkl       # 200MB
└── checkpoint.pth     # 1GB
    # Use DVC, MLflow, or cloud storage!

# ❌ Experiment outputs
runs/
└── experiment_001/
    ├── logs/
    ├── checkpoints/
    └── outputs/

# ❌ Virtual environments
venv/
env/
.venv/
ENV/

# ❌ Compiled files
__pycache__/
*.pyc
*.pyo
*.so
*.dll

# ❌ IDE files
.vscode/
.idea/
*.swp
.DS_Store

# ❌ Secrets and credentials
.env
credentials.json
*.key
*.pem
config/secrets.yaml

# ❌ Logs
logs/
*.log
tensorboard/
wandb/

# ❌ Temporary files
*.tmp
*.temp
.cache/
```

---

## 🚫 Comprehensive .gitignore for ML

### Complete ML .gitignore

```.gitignore
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
share/python-wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# Virtual Environments
venv/
ENV/
env/
.venv
env.bak/
venv.bak/

# Jupyter Notebook
.ipynb_checkpoints
*/.ipynb_checkpoints/*
*.ipynb_checkpoints/

# IPython
profile_default/
ipython_config.py

# PyCharm
.idea/
*.iml
*.iws

# VS Code
.vscode/
*.code-workspace

# Sublime Text
*.sublime-project
*.sublime-workspace

# Vim
*.swp
*.swo
*~

# macOS
.DS_Store
.AppleDouble
.LSOverride

# Windows
Thumbs.db
Thumbs.db:encryptable
ehthumbs.db
ehthumbs_vista.db
*.stackdump
[Dd]esktop.ini

# Data files
data/
*.csv
*.tsv
*.dat
*.json
*.jsonl
*.xml
*.sql
*.db
*.sqlite
*.sqlite3
*.h5
*.hdf5
*.parquet

# Keep sample data
!data/sample/
!data/sample/*.csv

# Model files
models/
*.h5
*.hdf5
*.pkl
*.pickle
*.pt
*.pth
*.onnx
*.pb
*.tflite
*.joblib
checkpoint*
*.ckpt

# Keep model architecture code
!models/*.py

# Logs and outputs
logs/
*.log
runs/
outputs/
results/
experiments/

# Experiment tracking
wandb/
mlruns/
.neptune/
.clearml/
aim/

# TensorBoard
events.out.tfevents.*
tensorboard/

# PyTorch
*.pt
*.pth
lightning_logs/

# TensorFlow
*.pb
*.meta
*.index
*.data-*
saved_model/

# Environment variables
.env
.env.local
.env.*.local

# Secrets
*.key
*.pem
*_credentials.json
secrets/
config/secrets.*

# Large files (use Git LFS or DVC)
*.zip
*.tar.gz
*.rar
*.7z
*.bin

# Cache
.cache/
*.cache
.pytest_cache/
.mypy_cache/
.ruff_cache/

# Coverage reports
htmlcov/
.coverage
.coverage.*
coverage.xml
*.cover

# Profiling
*.prof
*.lprof

# Documentation builds
docs/_build/
docs/_static/
docs/_templates/
site/

# Compiled extensions
*.pyd

# Distribution
*.whl
```

---

## 📦 Handling Large Files

### Problem with Large Files

```bash
# Git stores entire history
# Large files slow down:
# - Cloning
# - Fetching
# - Pushing
# - Local operations

# Example:
git add large_model.h5  # 500MB
git commit -m "Add model"
# Now everyone who clones gets 500MB
# Even if file is later removed!
```

### Solutions

**1. Don't commit large files**
```bash
# Add to .gitignore
echo "*.h5" >> .gitignore
echo "models/" >> .gitignore
git add .gitignore
git commit -m "Ignore large model files"
```

**2. Use Git LFS**
```bash
git lfs install
git lfs track "*.h5"
git add .gitattributes
git add large_model.h5
git commit -m "Add model with LFS"
```

**3. Use DVC**
```bash
dvc add data/train.csv
git add data/train.csv.dvc data/.gitignore
git commit -m "Track data with DVC"
```

**4. Cloud Storage**
```bash
# Store on S3, GCS, Azure Blob Storage
# Track metadata in Git
{
  "model": "model_v1",
  "location": "s3://bucket/models/model_v1.h5",
  "metrics": {"accuracy": 0.95}
}
```

### Removing Large Files from History

```bash
# Use BFG Repo-Cleaner (faster than git filter-branch)
# Download from: https://rtyley.github.io/bfg-repo-cleaner/

# Clone repository (mirror)
git clone --mirror https://github.com/user/repo.git

# Remove large files
java -jar bfg.jar --strip-blobs-bigger-than 100M repo.git

# Clean up
cd repo.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Push cleaned history (FORCE PUSH!)
git push --force
```

---

## 💾 Data Versioning Strategies

### Strategy 1: Data Snapshots with DVC

```bash
# Install DVC
pip install dvc

# Initialize
dvc init

# Track dataset
dvc add data/train.csv
# Creates data/train.csv.dvc
# Adds data/train.csv to .gitignore

# Commit DVC file
git add data/train.csv.dvc data/.gitignore
git commit -m "Track training data (v1)"

# Configure remote storage
dvc remote add -d myremote s3://mybucket/dvcstore

# Push data
dvc push

# Others can pull
git clone https://github.com/user/repo.git
dvc pull
```

### Strategy 2: Data Registries

```bash
# Separate data repository
data-registry/
├── raw/
│   └── dataset_v1.csv.dvc
├── processed/
│   └── dataset_v1_processed.csv.dvc
└── README.md

# Main project references data registry
git submodule add https://github.com/user/data-registry.git data
```

### Strategy 3: Data Manifests

```yaml
# data_manifest.yaml
datasets:
  training:
    version: "v1.0"
    location: "s3://bucket/data/train_v1.csv"
    hash: "md5:abc123..."
    size: "5GB"
    samples: 1000000
    
  validation:
    version: "v1.0"
    location: "s3://bucket/data/val_v1.csv"
    hash: "md5:def456..."
    size: "1GB"
    samples: 200000
```

### Strategy 4: DVC Pipelines

```yaml
# dvc.yaml
stages:
  download:
    cmd: python src/download.py
    deps:
      - src/download.py
    outs:
      - data/raw/

  preprocess:
    cmd: python src/preprocess.py
    deps:
      - src/preprocess.py
      - data/raw/
    outs:
      - data/processed/

  train:
    cmd: python src/train.py
    deps:
      - src/train.py
      - data/processed/
    outs:
      - models/model.pkl
    metrics:
      - metrics.json:
          cache: false
```

---

## 🎯 Model Versioning

### Versioning Model Architecture

```python
# models/model_v1.py - Version control this!
class ModelV1:
    """Linear model baseline."""
    def __init__(self, input_dim):
        self.model = Sequential([
            Dense(64, activation='relu', input_dim=input_dim),
            Dense(1, activation='sigmoid')
        ])

# models/model_v2.py
class ModelV2:
    """Added dropout for regularization."""
    def __init__(self, input_dim):
        self.model = Sequential([
            Dense(64, activation='relu', input_dim=input_dim),
            Dropout(0.5),
            Dense(1, activation='sigmoid')
        ])
```

### Versioning Model Weights

```bash
# Method 1: DVC
dvc add models/model_v1.h5
git add models/model_v1.h5.dvc
git commit -m "Model v1: baseline (accuracy: 0.85)"
git tag -a model-v1 -m "Baseline model"

# Method 2: MLflow
import mlflow

with mlflow.start_run():
    mlflow.log_param("model_type", "RandomForest")
    mlflow.log_metric("accuracy", 0.85)
    mlflow.sklearn.log_model(model, "model")

# Method 3: Model registry
{
  "model_id": "model_v1",
  "version": "1.0.0",
  "created": "2024-01-15",
  "location": "s3://bucket/models/model_v1.h5",
  "metrics": {
    "accuracy": 0.85,
    "f1_score": 0.82
  },
  "hyperparameters": {
    "learning_rate": 0.001,
    "epochs": 100
  }
}
```

### Tagging Model Versions

```bash
# Tag significant model versions
git tag -a model-v1.0 -m "Baseline model: accuracy 0.85"
git tag -a model-v1.1 -m "Added regularization: accuracy 0.87"
git tag -a model-v2.0 -m "New architecture: accuracy 0.92"

# Push tags
git push --tags

# Checkout specific model version
git checkout model-v1.0
```

---

## 🧪 Experiment Tracking

### Organizing Experiments

```bash
project/
├── experiments/
│   ├── exp_001_baseline/
│   │   ├── config.yaml
│   │   ├── train.py
│   │   └── results.json
│   ├── exp_002_dropout/
│   │   ├── config.yaml
│   │   ├── train.py
│   │   └── results.json
│   └── README.md  # Experiment log
```

### Experiment Log

```markdown
# Experiment Log

## Experiment 001: Baseline
- **Date**: 2024-01-15
- **Goal**: Establish baseline performance
- **Model**: Linear regression
- **Results**: MSE=0.25, R²=0.75
- **Commit**: abc123d

## Experiment 002: Ridge Regression
- **Date**: 2024-01-16
- **Goal**: Reduce overfitting
- **Model**: Ridge (alpha=1.0)
- **Results**: MSE=0.22, R²=0.78
- **Improvement**: +4% R²
- **Commit**: def456e
```

### Experiment Tracking Tools

```python
# Weights & Biases (wandb)
import wandb

wandb.init(project="ml-project", name="exp_001")
wandb.config.update({"learning_rate": 0.001, "epochs": 100})

for epoch in range(100):
    # Training...
    wandb.log({"loss": loss, "accuracy": acc})

# MLflow
import mlflow

mlflow.set_experiment("ml-project")
with mlflow.start_run(run_name="exp_001"):
    mlflow.log_params({"lr": 0.001, "epochs": 100})
    # Training...
    mlflow.log_metrics({"loss": loss, "accuracy": acc})

# TensorBoard
from torch.utils.tensorboard import SummaryWriter

writer = SummaryWriter('runs/exp_001')
writer.add_scalar('Loss/train', loss, epoch)
writer.add_scalar('Accuracy/train', acc, epoch)
writer.close()
```

---

## 🔬 Reproducibility

### Requirements Files

```bash
# Exact versions
numpy==1.21.0
pandas==1.3.2
scikit-learn==0.24.2

# Or use poetry/conda for lock files
poetry.lock
conda-lock.yml
```

### Random Seeds

```python
# seed_config.py
import random
import numpy as np
import torch

def set_seed(seed=42):
    """Set random seeds for reproducibility."""
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False
```

### Configuration Management

```yaml
# config.yaml
data:
  train_path: data/train.csv
  val_path: data/val.csv
  test_path: data/test.csv
  
model:
  architecture: resnet50
  pretrained: true
  num_classes: 10

training:
  batch_size: 32
  learning_rate: 0.001
  epochs: 100
  optimizer: adam
  
reproducibility:
  seed: 42
  deterministic: true
```

### Dockerfiles

```dockerfile
# Dockerfile
FROM python:3.10-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy code
COPY src/ ./src/
COPY models/ ./models/
COPY config/ ./config/

# Set environment
ENV PYTHONPATH=/app

# Run
CMD ["python", "src/train.py"]
```

---

## 📁 ML Project Structure

### Recommended Structure

```bash
ml-project/
├── .git/
├── .gitignore
├── .dvcignore
├── README.md
├── requirements.txt
├── setup.py
├── Dockerfile
│
├── data/                    # Data (ignored by Git, tracked by DVC)
│   ├── raw/
│   ├── processed/
│   └── .gitkeep            # Track empty directory
│
├── models/                  # Model weights (ignored)
│   ├── architecture.py      # ✅ Version controlled
│   └── model_v1.h5          # ❌ Use DVC
│
├── notebooks/               # Experiments
│   ├── 01_exploration.ipynb
│   ├── 02_baseline.ipynb
│   └── 03_improvements.ipynb
│
├── src/                     # Source code
│   ├── __init__.py
│   ├── data/
│   │   ├── __init__.py
│   │   ├── load.py
│   │   └── preprocess.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── model.py
│   │   └── train.py
│   ├── evaluation/
│   │   ├── __init__.py
│   │   └── metrics.py
│   └── utils/
│       ├── __init__.py
│       └── helpers.py
│
├── tests/                   # Unit tests
│   ├── test_data.py
│   ├── test_model.py
│   └── test_utils.py
│
├── config/                  # Configuration files
│   ├── config.yaml
│   └── hyperparameters.json
│
├── scripts/                 # Utility scripts
│   ├── download_data.sh
│   ├── train.py
│   └── evaluate.py
│
├── docs/                    # Documentation
│   ├── API.md
│   └── TRAINING.md
│
└── .github/                 # CI/CD
    └── workflows/
        └── test.yml
```

---

## 🚀 CI/CD for ML

### GitHub Actions for ML

```yaml
# .github/workflows/ml-pipeline.yml
name: ML Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install pytest pytest-cov
      
      - name: Run tests
        run: pytest --cov=src tests/
      
      - name: Lint
        run: |
          pip install black flake8
          black --check src/
          flake8 src/
  
  train:
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      
      - name: Setup DVC
        uses: iterative/setup-dvc@v1
      
      - name: Pull data
        run: dvc pull
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      
      - name: Train model
        run: python scripts/train.py
      
      - name: Upload model
        uses: actions/upload-artifact@v3
        with:
          name: trained-model
          path: models/model.pkl
```

---

## 💪 Exercises

### Exercise 1: Setup ML Project

Create properly structured ML project with Git.

**Solution:**

```bash
# Create structure
mkdir ml-project && cd ml-project
git init

# Create .gitignore
curl -o .gitignore https://raw.githubusercontent.com/github/gitignore/main/Python.gitignore

# Add ML-specific ignores
cat >> .gitignore << 'EOF'
data/
models/*.h5
models/*.pkl
logs/
wandb/
EOF

# Create structure
mkdir -p {src,tests,config,notebooks,scripts}
mkdir -p src/{data,models,evaluation}

# Create placeholder files
touch src/__init__.py
touch src/data/__init__.py
touch src/models/__init__.py

# Initial commit
git add .
git commit -m "Initial project structure"
```

### Exercise 2: DVC Setup

Setup DVC for data versioning.

**Solution:**

```bash
# Install DVC
pip install dvc

# Initialize
git init
dvc init
git add .dvc .dvcignore
git commit -m "Initialize DVC"

# Track data
dvc add data/train.csv

# Commit DVC file
git add data/train.csv.dvc data/.gitignore
git commit -m "Track training data v1"

# Setup remote (S3 example)
dvc remote add -d myremote s3://mybucket/dvcstore
git add .dvc/config
git commit -m "Configure DVC remote"

# Push data
dvc push
```

### Exercise 3: Model Versioning

Implement complete model versioning workflow.

**Solution:**

```bash
# Train and save model
python train.py  # Saves models/model_v1.h5

# Track with DVC
dvc add models/model_v1.h5
git add models/model_v1.h5.dvc models/.gitignore

# Create metadata
cat > models/model_v1.json << 'EOF'
{
  "version": "1.0",
  "accuracy": 0.85,
  "created": "2024-01-15",
  "hyperparameters": {
    "learning_rate": 0.001,
    "epochs": 100
  }
}
EOF

# Commit
git add models/model_v1.json
git commit -m "Model v1.0: baseline (accuracy: 0.85)"

# Tag
git tag -a model-v1.0 -m "Baseline model"

# Push
git push --tags
dvc push
```

---

## 🎯 Key Takeaways

✅ **Version Control**: Code, configs, small data - NOT large files or secrets  
✅ **.gitignore**: Comprehensive ML-specific ignore rules  
✅ **Large Files**: Use Git LFS or DVC, not plain Git  
✅ **Data Versioning**: DVC, data registries, or manifests  
✅ **Model Versioning**: Separate architecture (code) from weights (DVC)  
✅ **Experiments**: Track with MLflow, Wandb, or experiment logs  
✅ **Reproducibility**: Pin dependencies, set seeds, use configs  
✅ **Structure**: Organized project layout for collaboration  
✅ **CI/CD**: Automate testing and training pipelines

---

## 🔗 Navigation

- **Previous**: [03-Remote-Repositories.md](./03-Remote-Repositories.md)
- **Next**: [05-Git-LFS.md](./05-Git-LFS.md)
- **Up**: [README.md](./README.md)
- **Chapter Home**: [Chapter 3 - Development Environment](../README.md)

---

**Happy ML Version Control! 🤖🚀**
