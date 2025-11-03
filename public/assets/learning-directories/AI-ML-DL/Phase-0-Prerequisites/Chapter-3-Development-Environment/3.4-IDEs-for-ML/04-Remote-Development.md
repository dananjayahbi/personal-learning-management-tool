# 04 - Remote Development

## 📋 Introduction

Remote development allows you to write code locally while executing it on powerful remote machines with GPUs, more RAM, or access to large datasets. This is essential for ML development where training models locally may be impractical or impossible.

**Why Remote Development?**
- ✅ **Access powerful hardware** - Remote GPUs/TPUs
- ✅ **Large datasets** - Keep data on server
- ✅ **Consistent environment** - Same setup everywhere
- ✅ **Cost effective** - Share expensive resources
- ✅ **Work from anywhere** - Local machine independence
- ✅ **Team collaboration** - Shared development servers

---

## 🎯 Remote Development Options

### Comparison Matrix

| Method | Complexity | Cost | GPU Access | Best For |
|--------|-----------|------|------------|----------|
| **SSH + VS Code** | Low | Free | ✓ | Most users |
| **PyCharm Remote** | Medium | Paid | ✓ | Professional |
| **Jupyter Remote** | Low | Free | ✓ | Interactive |
| **Docker Remote** | Medium | Free | ✓ | Reproducibility |
| **Cloud IDEs** | Low | Paid | ✓ | Quick start |
| **WSL 2** | Low | Free | Limited | Windows users |

---

## 🔐 SSH Setup

### Generate SSH Keys

**On local machine:**

```bash
# Generate SSH key pair
ssh-keygen -t ed25519 -C "your_email@example.com"

# Save to default location: ~/.ssh/id_ed25519
# Set passphrase (recommended)

# Start SSH agent
eval "$(ssh-agent -s)"

# Add key to agent
ssh-add ~/.ssh/id_ed25519

# Copy public key
# Windows (PowerShell)
type ~/.ssh/id_ed25519.pub | clip

# macOS
pbcopy < ~/.ssh/id_ed25519.pub

# Linux
cat ~/.ssh/id_ed25519.pub
# Manually copy output
```

### Configure Remote Server

**On remote server:**

```bash
# Create .ssh directory
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Add your public key
echo "your-public-key-here" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Ensure SSH server is running
sudo systemctl status sshd
# If not running:
sudo systemctl start sshd
sudo systemctl enable sshd
```

### SSH Config File

**On local machine (~/.ssh/config):**

```bash
# ML Development Server
Host ml-server
    HostName 192.168.1.100
    User mluser
    Port 22
    IdentityFile ~/.ssh/id_ed25519
    ServerAliveInterval 60
    ServerAliveCountMax 3

# AWS EC2 Instance
Host aws-ml
    HostName ec2-xx-xx-xx-xx.compute-1.amazonaws.com
    User ubuntu
    IdentityFile ~/.ssh/aws-key.pem
    Port 22

# Google Cloud
Host gcp-ml
    HostName xx.xx.xx.xx
    User your-username
    IdentityFile ~/.ssh/gcp-key
    Port 22

# University Cluster
Host uni-cluster
    HostName cluster.university.edu
    User student123
    ProxyJump gateway.university.edu
    IdentityFile ~/.ssh/uni-key
```

**Test connection:**
```bash
# Test SSH connection
ssh ml-server

# Should connect without password
# Exit with: exit or Ctrl+D
```

---

## 💻 VS Code Remote Development

### Install Remote Extensions

```bash
# Remote - SSH
code --install-extension ms-vscode-remote.remote-ssh

# Remote - SSH: Editing Configuration Files
code --install-extension ms-vscode-remote.remote-ssh-edit

# Remote - Containers (for Docker)
code --install-extension ms-vscode-remote.remote-containers

# Remote - WSL
code --install-extension ms-vscode-remote.remote-wsl
```

### Connect via SSH

**Method 1: Command Palette**
```
1. Ctrl+Shift+P
2. Type: "Remote-SSH: Connect to Host"
3. Select or enter host (ml-server from config)
4. VS Code opens new window
5. Opens remote directory
```

**Method 2: Command Line**
```bash
code --remote ssh-remote+ml-server /path/to/project
```

**Method 3: Status Bar**
```
Click green >< icon in bottom-left corner
Select "Connect to Host"
Choose ml-server
```

### Remote Development Workflow

```
┌─────────────────────────────────────────┐
│  Local Machine (Windows/Mac/Linux)      │
│  ┌───────────────────────────────────┐  │
│  │  VS Code UI                       │  │
│  │  - Editor                         │  │
│  │  - File browser                   │  │
│  │  - Terminal                       │  │
│  │  - Debugger                       │  │
│  └───────────────────────────────────┘  │
│              │                           │
│              │ SSH Connection            │
│              ▼                           │
└─────────────────────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│  Remote Server (Linux with GPU)         │
│  ┌───────────────────────────────────┐  │
│  │  VS Code Server                   │  │
│  │  - File system                    │  │
│  │  - Python interpreter             │  │
│  │  - Terminal                       │  │
│  │  - Processes                      │  │
│  └───────────────────────────────────┘  │
│                                          │
│  /home/user/ml-project/                 │
│  ├── data/                               │
│  ├── models/                             │
│  ├── src/                                │
│  └── train.py                            │
└──────────────────────────────────────────┘
```

### Remote Features

**File editing:**
- Edit files directly on remote server
- Automatic sync
- Fast responsiveness

**Terminal:**
```bash
# Terminal runs on remote server
$ nvidia-smi  # Check remote GPU
$ htop        # View remote processes
$ python train.py  # Execute remotely
```

**Debugging:**
```python
# Set breakpoints in VS Code
# Debugging happens on remote machine
# Full debugger features available

import torch
device = torch.device('cuda')  # Uses remote GPU
model = Model().to(device)
# Set breakpoint here
model.train()
```

**Extensions:**
- Install extensions on remote
- Some extensions run locally (UI)
- Some run remotely (language servers)

### Port Forwarding

**Access remote services locally:**

```
# Remote server runs Jupyter on port 8888
# Forward to local port 8888

Terminal → Ports → Forward Port
Enter: 8888

# Now access: http://localhost:8888
# Connects to remote Jupyter server
```

**Command line:**
```bash
ssh -L 8888:localhost:8888 ml-server

# Or in VS Code integrated terminal:
# Automatic port forwarding detection!
```

**Use cases:**
- Jupyter notebooks
- TensorBoard
- Web APIs
- Database connections

---

## 🐍 PyCharm Remote Development

### Setup Remote Interpreter

**Step 1: Configure SSH**
```
File → Settings → Tools → SSH Configurations
Click "+"
├── Host: ml-server.example.com
├── Port: 22
├── Username: mluser
├── Authentication: Key pair
├── Private key: ~/.ssh/id_ed25519
└── Test Connection
```

**Step 2: Add Remote Interpreter**
```
File → Settings → Project → Python Interpreter
Click gear → Add → SSH Interpreter

├── Existing server configuration: ml-server
├── Next
├── Interpreter: /home/mluser/venv/bin/python
└── Sync folders:
    ├── Local: C:\Projects\ml-project
    └── Remote: /home/mluser/ml-project
```

**Step 3: Configure Deployment**
```
Tools → Deployment → Configuration
├── Connection:
│   ├── Type: SFTP
│   ├── SSH configuration: ml-server
│   └── Root path: /home/mluser
└── Mappings:
    ├── Local path: C:\Projects\ml-project
    └── Deployment path: /ml-project
```

### Automatic Upload

```
Tools → Deployment → Automatic Upload
Options:
├── Always (upload on every save)
├── On explicit save (Ctrl+S)
└── Never (manual sync)
```

**Manual sync:**
```
Right-click file/folder → Deployment
├── Upload to ml-server
├── Download from ml-server
├── Compare with Deployed Version
└── Sync with Deployed
```

### Remote Debugging

```python
# train.py on remote server
import torch

def train_model(data, epochs):
    model = create_model()
    # Set breakpoint (click gutter in PyCharm)
    
    for epoch in range(epochs):
        # Debugger pauses here on remote machine
        loss = model.train_step(data)
        print(f"Epoch {epoch}: {loss}")
    
    return model

# Run → Debug 'train'
# Execution happens on remote server
# Debugging interface in PyCharm
# Inspect remote variables
```

### Remote Terminal

```
Tools → Start SSH Session
Select: ml-server

# Terminal opens connected to remote server
$ pwd
/home/mluser/ml-project

$ nvidia-smi
$ python --version
$ conda env list
```

---

## 📓 Remote Jupyter

### SSH Tunneling

**On remote server:**
```bash
# Start Jupyter without browser
jupyter notebook --no-browser --port=8888

# Note the token from output:
# http://localhost:8888/?token=abc123...
```

**On local machine:**
```bash
# Create SSH tunnel
ssh -L 8888:localhost:8888 ml-server

# Keep this terminal open
# Open browser: http://localhost:8888
# Enter token
```

**Persistent tunnel with screen:**
```bash
# On remote server
screen -S jupyter
jupyter notebook --no-browser --port=8888
# Ctrl+A, D to detach

# Reconnect later:
screen -r jupyter
```

### JupyterLab Remote

```bash
# On remote server
jupyter lab --no-browser --port=8888

# On local machine
ssh -L 8888:localhost:8888 ml-server

# Browser: http://localhost:8888
```

### Jupyter Configuration

**Create config:**
```bash
# On remote server
jupyter notebook --generate-config

# Edit ~/.jupyter/jupyter_notebook_config.py
```

**Security settings:**
```python
# ~/.jupyter/jupyter_notebook_config.py

c.NotebookApp.ip = '0.0.0.0'  # Listen on all interfaces
c.NotebookApp.port = 8888
c.NotebookApp.open_browser = False

# Set password (more secure than token)
from notebook.auth import passwd
c.NotebookApp.password = passwd('your-password')
# Enter password when prompted

# SSL (optional but recommended)
c.NotebookApp.certfile = '/path/to/cert.pem'
c.NotebookApp.keyfile = '/path/to/key.pem'
```

**Generate SSL certificate:**
```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout mykey.key -out mycert.pem

# Use in config:
c.NotebookApp.certfile = '/path/to/mycert.pem'
c.NotebookApp.keyfile = '/path/to/mykey.key'
```

---

## 🐳 Docker Remote Development

### VS Code with Docker

**Devcontainer configuration:**

```json
// .devcontainer/devcontainer.json
{
    "name": "ML Development",
    "image": "tensorflow/tensorflow:latest-gpu-jupyter",
    
    "customizations": {
        "vscode": {
            "extensions": [
                "ms-python.python",
                "ms-toolsai.jupyter"
            ],
            "settings": {
                "python.defaultInterpreterPath": "/usr/bin/python3"
            }
        }
    },
    
    "runArgs": ["--gpus", "all"],
    
    "postCreateCommand": "pip install -r requirements.txt",
    
    "remoteUser": "root",
    
    "mounts": [
        "source=${localWorkspaceFolder}/data,target=/workspace/data,type=bind"
    ]
}
```

**Open in container:**
```
1. Ctrl+Shift+P
2. "Remote-Containers: Open Folder in Container"
3. Select project folder
4. VS Code rebuilds container and connects
```

### Docker Compose Development

```yaml
# docker-compose.yml
version: '3.8'

services:
  ml-dev:
    image: tensorflow/tensorflow:latest-gpu-jupyter
    volumes:
      - .:/workspace
      - ./data:/data
    ports:
      - "8888:8888"
      - "6006:6006"  # TensorBoard
    environment:
      - NVIDIA_VISIBLE_DEVICES=all
    command: bash -c "pip install -r requirements.txt && jupyter lab --ip=0.0.0.0 --allow-root --no-browser"
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
```

**Start development environment:**
```bash
docker-compose up -d
docker-compose logs -f

# Access Jupyter: http://localhost:8888
# Access TensorBoard: http://localhost:6006
```

---

## 🌐 Cloud IDEs

### GitHub Codespaces

**Create Codespace:**
```
1. Go to GitHub repository
2. Click "Code" → "Codespaces"
3. Click "Create codespace on main"
4. VS Code opens in browser or desktop
```

**Configuration:**
```json
// .devcontainer/devcontainer.json
{
    "name": "ML Project",
    "image": "mcr.microsoft.com/vscode/devcontainers/python:3.11",
    "features": {
        "ghcr.io/devcontainers/features/python:1": {
            "version": "3.11"
        },
        "ghcr.io/devcontainers/features/nvidia-cuda:1": {}
    },
    "postCreateCommand": "pip install -r requirements.txt",
    "customizations": {
        "vscode": {
            "extensions": [
                "ms-python.python",
                "ms-toolsai.jupyter"
            ]
        }
    }
}
```

**Pricing:**
- Free tier: 60 hours/month (2-core)
- Pro: $0.18/hour (2-core)
- GPU: Additional cost

### Google Colab

**Advantages:**
- Free GPU/TPU
- No setup required
- Easy sharing

**Limitations:**
- 12-hour session limit
- Limited disk space
- Not a full IDE

**Connect to Colab from local:**
```python
# In Colab notebook
from google.colab import drive
drive.mount('/content/drive')

# Access Google Drive files
!ls /content/drive/MyDrive/ml-project
```

### Kaggle Kernels

**Features:**
- Free GPU (30 hours/week)
- Integrated datasets
- Competition submissions

**Limitations:**
- 9-hour session limit
- Internet disabled (for competitions)

---

## 🪟 WSL 2 (Windows Subsystem for Linux)

### Setup WSL 2

```powershell
# PowerShell (Administrator)

# Enable WSL
wsl --install

# Install Ubuntu
wsl --install -d Ubuntu-22.04

# Set WSL 2 as default
wsl --set-default-version 2

# Check version
wsl --list --verbose
```

### VS Code with WSL

```bash
# Install Remote-WSL extension
code --install-extension ms-vscode-remote.remote-wsl

# Open folder in WSL
code --remote wsl+Ubuntu-22.04 /home/user/project

# Or from WSL terminal:
cd /home/user/project
code .
```

### GPU in WSL 2

**Requirements:**
- Windows 11 or Windows 10 (Build 21H2+)
- NVIDIA GPU
- Latest Windows drivers

**Install CUDA in WSL:**
```bash
# In WSL terminal
wget https://developer.download.nvidia.com/compute/cuda/repos/wsl-ubuntu/x86_64/cuda-keyring_1.0-1_all.deb
sudo dpkg -i cuda-keyring_1.0-1_all.deb
sudo apt-get update
sudo apt-get install -y cuda

# Verify
nvidia-smi
```

**Test GPU:**
```python
import torch
print(torch.cuda.is_available())  # Should be True
print(torch.cuda.device_count())
print(torch.cuda.get_device_name(0))
```

---

## 🎓 Best Practices

### 1. Use SSH Config

```bash
# ~/.ssh/config
Host ml-*
    ServerAliveInterval 60
    ServerAliveCountMax 3
    Compression yes
    
Host aws-*
    IdentitiesOnly yes
    AddKeysToAgent yes
```

### 2. Version Control

```bash
# On remote server
cd ~/project
git pull origin main

# Make changes locally (VS Code/PyCharm)
# Commit and push
git add .
git commit -m "Update model architecture"
git push origin main

# Pull on remote if needed
ssh ml-server 'cd ~/project && git pull'
```

### 3. Environment Management

```bash
# Remote server
conda create -n ml-project python=3.11
conda activate ml-project
pip install -r requirements.txt

# In VS Code/PyCharm
# Select remote interpreter: ml-project
```

### 4. Data Management

```bash
# Keep large data on server
# Don't sync to local machine

# .gitignore
data/
*.h5
*.pkl
models/

# Use symbolic links for data
ln -s /mnt/data/datasets ~/project/data
```

### 5. Monitoring

```bash
# Monitor GPU usage
watch -n 1 nvidia-smi

# Monitor processes
htop

# Monitor disk space
df -h

# Monitor logs
tail -f training.log
```

---

## 🎓 Exercises

### Exercise 1: SSH Setup
1. Generate SSH keys
2. Configure SSH config file
3. Connect to remote server
4. Run Python script remotely

### Exercise 2: VS Code Remote
1. Install Remote-SSH extension
2. Connect to remote server
3. Open project folder
4. Edit and run Python script
5. Use integrated terminal

### Exercise 3: Remote Jupyter
1. Start Jupyter on remote server
2. Create SSH tunnel
3. Connect from local browser
4. Run notebook with remote GPU

---

## 🎯 Key Takeaways

1. ✅ **SSH is fundamental** - Learn SSH config
2. ✅ **VS Code Remote-SSH** - Best for most users
3. ✅ **PyCharm Remote** - Professional features
4. ✅ **Port forwarding** - Access remote services
5. ✅ **Docker** - Reproducible environments
6. ✅ **Cloud IDEs** - Quick start, pay for convenience
7. ✅ **WSL 2** - Linux on Windows with GPU

---

## 🔗 Navigation

- **Up**: [3.4 IDEs for ML Overview](./README.md)
- **Previous**: [03 - Spyder IDE](./03-Spyder-IDE.md)
- **Next**: [05 - AI Code Tools](./05-AI-Code-Tools.md)

---

**Remember:** Remote development is essential for ML. Start with VS Code Remote-SSH for the best balance of features and ease of use. Master SSH configuration and port forwarding—they're invaluable skills!
