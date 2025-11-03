# 04 - Docker Containers for ML

## 📋 Introduction

Docker containers provide the ultimate isolation for ML projects by packaging everything - OS, Python, libraries, and code - into a portable container. This ensures identical environments across development, testing, and production.

**Why Docker for ML?**
- ✅ Complete environment isolation (OS-level)
- ✅ Reproducible across any machine
- ✅ Easy deployment to cloud
- ✅ Version control for entire environment
- ✅ Lightweight compared to VMs
- ✅ Share complex setups easily
- ✅ GPU support built-in

---

## 🎯 Docker vs Virtual Environments

| Feature | venv | conda | Docker |
|---------|------|-------|--------|
| **Isolation Level** | Python packages | Python + packages | Full OS |
| **Reproducibility** | ⚠️ Python version dependent | ✅ Good | ✅ Perfect |
| **Portability** | ⚠️ Platform-specific | ⚠️ Platform-specific | ✅ Any platform |
| **System Dependencies** | ❌ No | ⚠️ Limited | ✅ Complete |
| **Overhead** | 💾 10-20 MB | 💾 500 MB-5 GB | 💾 100 MB-10 GB |
| **Startup Time** | ⚡ Instant | ⚡ ~5 sec | 🐢 ~10-30 sec |
| **GPU Support** | ✅ Native | ✅ Native | ✅ Requires setup |
| **Best for** | Development | Data science | Deployment, complex setups |

---

## 📦 Installing Docker

### Linux (Ubuntu)

```bash
# Update packages
sudo apt-get update

# Install dependencies
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Add user to docker group (no sudo needed)
sudo usermod -aG docker $USER

# Log out and log back in, then verify
docker run hello-world
```

### macOS

```bash
# Download Docker Desktop from https://www.docker.com/products/docker-desktop

# Or using Homebrew
brew install --cask docker

# Start Docker Desktop application

# Verify
docker run hello-world
```

### Windows

```bash
# Install WSL 2 first
wsl --install

# Download and install Docker Desktop
# https://www.docker.com/products/docker-desktop

# Start Docker Desktop

# Verify in PowerShell or WSL
docker run hello-world
```

---

## 🐋 Docker Basics

### Key Concepts

**Image**: Blueprint for containers (like a class)
**Container**: Running instance of an image (like an object)
**Dockerfile**: Instructions to build an image
**Registry**: Repository for images (Docker Hub, etc.)

### Essential Commands

```bash
# Pull image from Docker Hub
docker pull python:3.10

# List images
docker images

# Run container
docker run python:3.10

# Run container interactively
docker run -it python:3.10 /bin/bash

# List running containers
docker ps

# List all containers
docker ps -a

# Stop container
docker stop container_id

# Remove container
docker rm container_id

# Remove image
docker rmi image_id

# Build image from Dockerfile
docker build -t my-image .

# Run container from custom image
docker run my-image
```

---

## 📄 Dockerfile for ML

### Basic ML Dockerfile

```dockerfile
# Use official Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Command to run
CMD ["python", "train.py"]
```

### Advanced ML Dockerfile

```dockerfile
# Multi-stage build for smaller images
FROM python:3.10-slim as builder

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install Python packages
RUN pip install --no-cache-dir --user -r requirements.txt

# Final stage
FROM python:3.10-slim

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copy installed packages from builder
COPY --from=builder /root/.local /root/.local

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Make sure scripts in .local are usable
ENV PATH=/root/.local/bin:$PATH

# Expose port (if needed for APIs)
EXPOSE 8000

# Default command
CMD ["python", "train.py"]
```

### GPU-Enabled Dockerfile

```dockerfile
# Use NVIDIA CUDA base image
FROM nvidia/cuda:11.8.0-cudnn8-runtime-ubuntu22.04

# Install Python
RUN apt-get update && apt-get install -y \
    python3.10 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Set Python 3.10 as default
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.10 1

WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install PyTorch with CUDA support
RUN pip install --no-cache-dir torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# Install other requirements
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Command
CMD ["python", "train.py"]
```

---

## 🏗️ Building Images

### Build Basic Image

```bash
# Build image (. = current directory for Dockerfile)
docker build -t ml-project:latest .

# Build with specific Dockerfile
docker build -f Dockerfile.gpu -t ml-project:gpu .

# Build with build arguments
docker build --build-arg PYTHON_VERSION=3.10 -t ml-project .

# Build without cache
docker build --no-cache -t ml-project .
```

### Dockerfile with Build Arguments

```dockerfile
ARG PYTHON_VERSION=3.10
FROM python:${PYTHON_VERSION}-slim

ARG APP_ENV=production
ENV APP_ENV=${APP_ENV}

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "train.py"]
```

**Usage:**
```bash
docker build --build-arg PYTHON_VERSION=3.11 --build-arg APP_ENV=development -t ml-project .
```

---

## 🚀 Running Containers

### Basic Run

```bash
# Run container
docker run ml-project

# Run with custom command
docker run ml-project python evaluate.py

# Run interactively
docker run -it ml-project /bin/bash

# Run in background (detached)
docker run -d ml-project

# Run with name
docker run --name my-container ml-project
```

### Advanced Run Options

```bash
# Mount local directory (data sharing)
docker run -v $(pwd)/data:/app/data ml-project

# Mount multiple directories
docker run \
    -v $(pwd)/data:/app/data \
    -v $(pwd)/models:/app/models \
    ml-project

# Environment variables
docker run -e CUDA_VISIBLE_DEVICES=0 ml-project

# Multiple environment variables
docker run \
    -e CUDA_VISIBLE_DEVICES=0 \
    -e BATCH_SIZE=32 \
    ml-project

# Port mapping (for APIs)
docker run -p 8000:8000 ml-project

# GPU support (requires nvidia-docker)
docker run --gpus all ml-project

# Specific GPUs
docker run --gpus '"device=0,1"' ml-project

# Memory limits
docker run --memory="4g" --memory-swap="4g" ml-project

# CPU limits
docker run --cpus="2.0" ml-project
```

---

## 🎯 Real-World Examples

### Example 1: Simple ML Project

**Project Structure:**
```
ml-project/
├── data/
│   └── dataset.csv
├── models/
│   └── model.pkl
├── src/
│   ├── train.py
│   └── evaluate.py
├── Dockerfile
└── requirements.txt
```

**requirements.txt:**
```txt
numpy==1.24.3
pandas==2.0.3
scikit-learn==1.3.0
matplotlib==3.7.2
```

**Dockerfile:**
```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ ./src/

CMD ["python", "src/train.py"]
```

**Commands:**
```bash
# Build
docker build -t ml-simple .

# Run training
docker run -v $(pwd)/data:/app/data -v $(pwd)/models:/app/models ml-simple

# Run evaluation
docker run -v $(pwd)/models:/app/models ml-simple python src/evaluate.py
```

### Example 2: Deep Learning with GPU

**Dockerfile:**
```dockerfile
FROM nvidia/cuda:11.8.0-cudnn8-devel-ubuntu22.04

# Install Python
RUN apt-get update && apt-get install -y \
    python3.10 \
    python3-pip \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install PyTorch
RUN pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# Install other requirements
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python3", "train.py"]
```

**Run with GPU:**
```bash
# Build
docker build -t dl-gpu -f Dockerfile.gpu .

# Run with all GPUs
docker run --gpus all -v $(pwd)/data:/app/data -v $(pwd)/checkpoints:/app/checkpoints dl-gpu

# Run with specific GPU
docker run --gpus '"device=0"' dl-gpu
```

### Example 3: Jupyter Notebook in Docker

**Dockerfile:**
```dockerfile
FROM python:3.10-slim

WORKDIR /app

# Install Jupyter and ML libraries
RUN pip install --no-cache-dir \
    jupyter \
    numpy \
    pandas \
    matplotlib \
    seaborn \
    scikit-learn

# Expose Jupyter port
EXPOSE 8888

# Start Jupyter without token
CMD ["jupyter", "notebook", "--ip=0.0.0.0", "--port=8888", "--no-browser", "--allow-root", "--NotebookApp.token=''"]
```

**Run:**
```bash
docker build -t jupyter-ml .
docker run -p 8888:8888 -v $(pwd):/app jupyter-ml

# Access at http://localhost:8888
```

---

## 🐳 Docker Compose

For multi-container applications (e.g., ML service + database).

### docker-compose.yml

```yaml
version: '3.8'

services:
  ml-service:
    build: .
    volumes:
      - ./data:/app/data
      - ./models:/app/models
    environment:
      - CUDA_VISIBLE_DEVICES=0
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    ports:
      - "8000:8000"
  
  jupyter:
    image: jupyter/datascience-notebook
    ports:
      - "8888:8888"
    volumes:
      - ./notebooks:/home/jovyan/work
    environment:
      - JUPYTER_ENABLE_LAB=yes
```

**Usage:**
```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and start
docker-compose up --build
```

---

## 🔧 Best Practices

### 1. Use Multi-Stage Builds

```dockerfile
# Builder stage
FROM python:3.10 as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Final stage
FROM python:3.10-slim
COPY --from=builder /root/.local /root/.local
WORKDIR /app
COPY . .
ENV PATH=/root/.local/bin:$PATH
CMD ["python", "train.py"]
```

### 2. Optimize Layer Caching

```dockerfile
# ❌ Bad - Changes to code rebuild everything
FROM python:3.10-slim
COPY . .  # This changes frequently
RUN pip install -r requirements.txt

# ✅ Good - Cache dependencies separately
FROM python:3.10-slim
COPY requirements.txt .
RUN pip install -r requirements.txt  # Cached unless requirements change
COPY . .
```

### 3. Use .dockerignore

```.dockerignore
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
.env
.venv
venv/
.git
.gitignore
.pytest_cache/
.ipynb_checkpoints/
data/raw/*
*.csv
*.h5
*.pkl
models/*.pth
checkpoints/
logs/
```

### 4. Minimize Image Size

```dockerfile
# Use slim base images
FROM python:3.10-slim  # ~120 MB vs python:3.10 ~900 MB

# Clean up after apt-get
RUN apt-get update && apt-get install -y \
    package-name \
    && rm -rf /var/lib/apt/lists/*

# Use --no-cache-dir with pip
RUN pip install --no-cache-dir -r requirements.txt

# Combine RUN commands
RUN apt-get update && apt-get install -y package1 package2 && rm -rf /var/lib/apt/lists/*
```

### 5. Security Best Practices

```dockerfile
# Don't run as root
RUN useradd -m -u 1000 appuser
USER appuser

# Copy only necessary files
COPY --chown=appuser:appuser src/ ./src/

# Use specific versions
FROM python:3.10.12-slim

# Scan images for vulnerabilities
# docker scan ml-project
```

---

## 🐛 Troubleshooting

### Issue 1: Permission Denied

**Solution:**
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Log out and log back in

# Or run with sudo
sudo docker run ml-project
```

### Issue 2: Cannot Connect to Docker Daemon

**Solution:**
```bash
# Start Docker service
sudo systemctl start docker

# Enable Docker to start on boot
sudo systemctl enable docker

# Check status
sudo systemctl status docker
```

### Issue 3: GPU Not Available in Container

**Solution:**
```bash
# Install nvidia-docker2
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
sudo apt-get update && sudo apt-get install -y nvidia-docker2
sudo systemctl restart docker

# Test GPU
docker run --rm --gpus all nvidia/cuda:11.0-base nvidia-smi
```

### Issue 4: Container Runs Out of Memory

**Solution:**
```bash
# Increase memory limit
docker run --memory="8g" ml-project

# Or in docker-compose.yml
services:
  ml-service:
    deploy:
      resources:
        limits:
          memory: 8G
```

---

## 🎓 Exercises

### Exercise 1: Basic ML Container
Create a Dockerfile for a simple ML project.

**Solution:**
```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "train.py"]
```

```bash
docker build -t ml-exercise .
docker run -v $(pwd)/data:/app/data ml-exercise
```

### Exercise 2: Multi-Stage Build
Optimize a Dockerfile using multi-stage builds.

**Solution:**
```dockerfile
FROM python:3.10 as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

FROM python:3.10-slim
COPY --from=builder /root/.local /root/.local
WORKDIR /app
COPY . .
ENV PATH=/root/.local/bin:$PATH
CMD ["python", "train.py"]
```

### Exercise 3: Docker Compose Setup
Create a docker-compose.yml with Jupyter and a training service.

**Solution:**
```yaml
version: '3.8'
services:
  jupyter:
    image: jupyter/scipy-notebook
    ports:
      - "8888:8888"
    volumes:
      - ./notebooks:/home/jovyan/work
  
  training:
    build: .
    volumes:
      - ./data:/app/data
    depends_on:
      - jupyter
```

---

## 📚 Additional Resources

### Official Documentation
- [Docker Documentation](https://docs.docker.com/)
- [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)
- [Docker Compose](https://docs.docker.com/compose/)
- [NVIDIA Docker](https://github.com/NVIDIA/nvidia-docker)

### Tutorials
- [Docker for Data Science](https://www.datacamp.com/tutorial/docker-for-data-science)
- [ML with Docker](https://towardsdatascience.com/docker-for-machine-learning-f4b5e5e8e8f1)

---

## 🎯 Key Takeaways

1. ✅ **Full isolation** - OS-level environment encapsulation
2. ✅ **Perfect reproducibility** - Works everywhere
3. ✅ **Easy deployment** - Ship container to production
4. ✅ **GPU support** - Full CUDA capabilities
5. ✅ **Multi-stage builds** - Smaller image sizes
6. ✅ **Docker Compose** - Multi-container orchestration

---

## 🔗 Navigation

- **Up**: [3.2 Virtual Environments Overview](./README.md)
- **Previous**: [03 - Poetry Dependency Management](./03-Poetry.md)
- **Next**: [05 - Environment Best Practices](./05-Best-Practices.md)

---

**Remember:** Docker is essential for deployment and ensuring reproducibility. It's heavier than venv/conda but provides complete environment isolation!
