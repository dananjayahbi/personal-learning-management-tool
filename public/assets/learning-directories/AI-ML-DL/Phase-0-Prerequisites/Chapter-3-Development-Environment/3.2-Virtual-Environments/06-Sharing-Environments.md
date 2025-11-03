# 06 - Sharing Environments

## 📋 Introduction

Sharing virtual environments ensures that team members, collaborators, and deployment systems can reproduce your exact setup. This guide covers methods for exporting, sharing, and recreating environments across all major tools.

---

## 🎯 Why Share Environments?

### Benefits

- ✅ **Reproducibility** - Same code + same environment = same results
- ✅ **Team Collaboration** - Everyone works with identical dependencies
- ✅ **Debugging** - Isolate environment-specific issues
- ✅ **Deployment** - Consistent production environment
- ✅ **Documentation** - Clear project requirements

### What to Share

```
✅ Configuration Files:
- requirements.txt (pip)
- environment.yml (conda)
- pyproject.toml + poetry.lock (Poetry)
- Dockerfile + docker-compose.yml (Docker)

❌ Don't Share:
- venv/ directory
- .conda/ directory
- __pycache__/
- Binary files
```

---

## 📝 venv + pip

### Exporting Environment

```bash
# Activate environment
source venv/bin/activate

# Export all packages
pip freeze > requirements.txt

# Export with pip-tools (cleaner)
pip install pip-tools
pip-compile requirements.in --output-file requirements.txt
```

### requirements.txt Examples

#### Basic requirements.txt

```txt
numpy==1.24.3
pandas==2.0.3
matplotlib==3.7.2
scikit-learn==1.3.0
jupyter==1.0.0
```

#### requirements.txt with Comments

```txt
# Core data science
numpy==1.24.3
pandas==2.0.3

# Machine learning
scikit-learn==1.3.0
xgboost==1.7.6

# Visualization
matplotlib==3.7.2
seaborn==0.12.2

# Notebooks
jupyter==1.0.0
ipykernel==6.25.0

# Development
pytest==7.4.0
black==23.7.0
```

#### requirements.txt with Version Ranges

```txt
# Allow minor updates
numpy>=1.24,<2.0
pandas>=2.0,<3.0
scikit-learn~=1.3.0  # Compatible version (~= same as >=1.3.0, <1.4.0)
```

### Recreating Environment

```bash
# Clone repository
git clone https://github.com/username/project.git
cd project

# Create virtual environment
python -m venv venv

# Activate
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Verify
pip list
python verify_env.py
```

### pip-tools Workflow

Better dependency management:

```bash
# Install pip-tools
pip install pip-tools

# Create requirements.in (high-level deps)
# requirements.in
cat > requirements.in << EOF
numpy
pandas
scikit-learn
matplotlib
EOF

# Compile to requirements.txt (with all transitive deps)
pip-compile requirements.in

# Install
pip-sync requirements.txt

# Update dependencies
pip-compile --upgrade requirements.in
```

---

## 🐍 Conda

### Exporting Environment

```bash
# Activate environment
conda activate myenv

# Export full environment
conda env export > environment.yml

# Export without builds (more portable)
conda env export --no-builds > environment.yml

# Export only explicitly installed (cleanest)
conda env export --from-history > environment.yml
```

### environment.yml Examples

#### Full Export

```yaml
name: ml-project
channels:
  - defaults
dependencies:
  - _libgcc_mutex=0.1=main
  - _openmp_mutex=5.1=1_gnu
  - blas=1.0=mkl
  - numpy=1.24.3=py310h055cbcc_0
  - numpy-base=1.24.3=py310h65a83cf_0
  - pandas=2.0.3=py310h1128e8f_0
  # ... 100+ more lines
```

#### From History (Recommended)

```yaml
name: ml-project
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.10
  - numpy
  - pandas
  - scikit-learn
  - matplotlib
  - jupyter
```

#### Advanced environment.yml

```yaml
name: deep-learning
channels:
  - conda-forge
  - pytorch
  - defaults
dependencies:
  # Python
  - python=3.10
  
  # Core ML
  - numpy=1.24
  - pandas>=2.0
  - scikit-learn
  
  # Deep Learning
  - pytorch::pytorch=2.0
  - pytorch::torchvision
  - pytorch::torchaudio
  
  # Visualization
  - matplotlib
  - seaborn
  - tensorboard
  
  # Development
  - jupyter
  - pytest
  
  # pip-only packages
  - pip
  - pip:
    - transformers==4.30.0
    - datasets==2.14.0
    - wandb
```

### Recreating Conda Environment

```bash
# Clone repository
git clone https://github.com/username/project.git
cd project

# Create environment from file
conda env create -f environment.yml

# Activate
conda activate ml-project

# Verify
conda list
python -c "import numpy; print(numpy.__version__)"
```

### Updating Environment

```bash
# Update existing environment from file
conda env update -f environment.yml --prune

# The --prune flag removes packages not in file
```

---

## 📦 Poetry

### Sharing with Poetry

Poetry automatically manages sharing through `pyproject.toml` and `poetry.lock`.

#### pyproject.toml

```toml
[tool.poetry]
name = "ml-project"
version = "0.1.0"
description = "Machine Learning Project"
authors = ["Your Name <you@example.com>"]

[tool.poetry.dependencies]
python = "^3.10"
numpy = "^1.24.0"
pandas = "^2.0.0"
scikit-learn = "^1.3.0"
matplotlib = "^3.7.0"

[tool.poetry.group.dev.dependencies]
pytest = "^7.4.0"
black = "^23.7.0"
jupyter = "^1.0.0"
```

#### poetry.lock

Auto-generated with exact versions:
```
# This file is automatically @generated by Poetry 1.6.0
# Do not manually edit this file.

[[package]]
name = "numpy"
version = "1.24.3"
description = "Fundamental package for array computing in Python"
category = "main"
optional = false
python-versions = ">=3.8"
# ... more details
```

### Recreating Poetry Environment

```bash
# Clone repository
git clone https://github.com/username/project.git
cd project

# Install from lock file (exact versions)
poetry install

# Activate shell
poetry shell

# Or run commands
poetry run python script.py
```

### Exporting from Poetry

```bash
# Export to requirements.txt
poetry export -f requirements.txt --output requirements.txt

# Without hashes
poetry export -f requirements.txt --output requirements.txt --without-hashes

# Only dev dependencies
poetry export --group dev -f requirements.txt --output requirements-dev.txt
```

---

## 🐳 Docker

### Sharing Docker Images

#### Method 1: Dockerfile (Recommended)

Share the Dockerfile, not the image:

```dockerfile
FROM python:3.10-slim

WORKDIR /app

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy code
COPY . .

CMD ["python", "train.py"]
```

**Share:**
```bash
git add Dockerfile requirements.txt
git commit -m "Add Docker setup"
git push
```

**Recreate:**
```bash
git clone repo
docker build -t ml-project .
docker run ml-project
```

#### Method 2: Docker Registry

```bash
# Tag image
docker tag ml-project:latest username/ml-project:latest

# Push to Docker Hub
docker login
docker push username/ml-project:latest

# Pull on another machine
docker pull username/ml-project:latest
docker run username/ml-project:latest
```

#### Method 3: Save/Load Image

```bash
# Save image to file
docker save ml-project:latest > ml-project.tar
# Or compressed
docker save ml-project:latest | gzip > ml-project.tar.gz

# Transfer file (USB, network, etc.)

# Load on another machine
docker load < ml-project.tar
# Or compressed
docker load < ml-project.tar.gz

# Run
docker run ml-project:latest
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  ml-service:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - ./data:/app/data
      - ./models:/app/models
    environment:
      - CUDA_VISIBLE_DEVICES=0
    ports:
      - "8000:8000"
    
  jupyter:
    image: jupyter/datascience-notebook
    ports:
      - "8888:8888"
    volumes:
      - ./notebooks:/home/jovyan/work
```

**Share:**
```bash
git add docker-compose.yml
git commit -m "Add compose configuration"
```

**Recreate:**
```bash
docker-compose up --build
```

---

## 🌐 Cross-Platform Considerations

### Platform-Specific Dependencies

Some packages have platform-specific versions:

```txt
# Linux-specific
torch @ https://download.pytorch.org/whl/cu118/torch-2.0.0%2Bcu118-cp310-cp310-linux_x86_64.whl

# Windows-specific
pywin32==306

# macOS-specific
pyobjc==9.2
```

### Solution 1: Multiple Requirements Files

```bash
# Base requirements
requirements.txt
# Common packages

# Platform-specific
requirements-linux.txt
requirements-mac.txt
requirements-windows.txt

# Install
pip install -r requirements.txt
pip install -r requirements-linux.txt  # On Linux
```

### Solution 2: Conditional Installation

```python
# setup.py
import sys

install_requires = [
    'numpy>=1.24',
    'pandas>=2.0',
]

if sys.platform == 'win32':
    install_requires.append('pywin32>=306')
elif sys.platform == 'darwin':
    install_requires.append('pyobjc>=9.0')
```

### Solution 3: Use Conda (Best for Cross-Platform)

```yaml
# environment.yml - Works on all platforms
name: ml-project
channels:
  - conda-forge
dependencies:
  - python=3.10
  - numpy
  - pandas
  - scikit-learn
```

---

## 📊 Comparison of Methods

| Method | Portability | Precision | Size | Speed | Complexity |
|--------|------------|-----------|------|-------|------------|
| **requirements.txt** | ⚠️ Medium | ⚠️ Medium | 💾 Small | ⚡ Fast | 📈 Easy |
| **requirements.txt + hashes** | ⚠️ Medium | ✅ High | 💾 Small | ⚡ Fast | 📊 Medium |
| **environment.yml** | ✅ High | ✅ High | 💾 Medium | 📊 Medium | 📊 Medium |
| **poetry.lock** | ✅ High | ✅ Very High | 💾 Medium | 📊 Medium | 📊 Medium |
| **Dockerfile** | ✅ Very High | ✅ Perfect | 💾 Large | 🐢 Slow | 📉 Hard |

---

## 🎯 Real-World Examples

### Example 1: Simple Sharing (venv)

```bash
# Developer A
python -m venv venv
source venv/bin/activate
pip install numpy pandas scikit-learn
pip freeze > requirements.txt
git add requirements.txt
git commit -m "Add dependencies"
git push

# Developer B
git pull
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Example 2: Data Science Team (conda)

```bash
# Lead Scientist
conda create -n project python=3.10
conda activate project
conda install numpy pandas scikit-learn matplotlib jupyter
conda env export --from-history > environment.yml
git add environment.yml
git push

# Team Members
git clone repo
conda env create -f environment.yml
conda activate project
jupyter notebook
```

### Example 3: Production Deployment (Docker)

```bash
# Development
# Create Dockerfile
docker build -t ml-api:v1.0 .
docker tag ml-api:v1.0 company/ml-api:v1.0
docker push company/ml-api:v1.0

# Production Server
docker pull company/ml-api:v1.0
docker run -d -p 8000:8000 company/ml-api:v1.0
```

---

## 🔄 Workflow Templates

### GitHub Repository Template

```
project/
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
├── tests/
├── .gitignore
├── README.md
├── requirements.txt        # For venv users
├── environment.yml         # For conda users
├── pyproject.toml         # For Poetry users
├── Dockerfile             # For Docker users
└── docker-compose.yml     # For Docker Compose
```

### README.md Setup Section

```markdown
## Setup

Choose your preferred method:

### Method 1: venv + pip

\`\`\`bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
\`\`\`

### Method 2: Conda

\`\`\`bash
conda env create -f environment.yml
conda activate project-name
\`\`\`

### Method 3: Poetry

\`\`\`bash
poetry install
poetry shell
\`\`\`

### Method 4: Docker

\`\`\`bash
docker-compose up --build
\`\`\`
```

---

## 🐛 Troubleshooting

### Issue 1: Package Conflict

```bash
# Clear cache and reinstall
pip cache purge
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Issue 2: Platform-Specific Package

```bash
# Check package availability
pip search package_name

# Use platform markers
# requirements.txt
pywin32==306; sys_platform == 'win32'
pyobjc==9.2; sys_platform == 'darwin'
```

### Issue 3: Different Python Version

```bash
# Specify Python version
python3.10 -m venv venv

# Or with conda
conda create -n myenv python=3.10

# Or with Poetry
poetry env use python3.10
```

### Issue 4: Large requirements.txt

```bash
# Use constraints file
pip install --constraint constraints.txt -r requirements.txt

# Or use pip-tools
pip-compile requirements.in
pip-sync requirements.txt
```

---

## ✅ Best Practices Checklist

### Before Sharing

- [ ] Environment tested and working
- [ ] Dependencies documented
- [ ] No sensitive data in files
- [ ] .gitignore configured
- [ ] README.md includes setup instructions
- [ ] Version pinned appropriately
- [ ] Cross-platform tested (if applicable)

### For Team Projects

- [ ] Choose one primary method (venv/conda/Poetry)
- [ ] Document setup process
- [ ] Include verification script
- [ ] Use CI/CD to test environment
- [ ] Keep dependencies up-to-date
- [ ] Regular security audits

### For Production

- [ ] Use Docker for consistency
- [ ] Pin all versions
- [ ] Include health checks
- [ ] Document deployment process
- [ ] Have rollback plan
- [ ] Monitor for security issues

---

## 🎓 Exercises

### Exercise 1: Share venv Environment
Create and share a venv environment.

**Solution:**
```bash
python -m venv venv
source venv/bin/activate
pip install numpy pandas matplotlib
pip freeze > requirements.txt
git add requirements.txt .gitignore
git commit -m "Add environment"
```

### Exercise 2: Conda Cross-Platform
Create a conda environment that works on all platforms.

**Solution:**
```yaml
# environment.yml
name: cross-platform
channels:
  - conda-forge
dependencies:
  - python=3.10
  - numpy
  - pandas
  - matplotlib
```

```bash
conda env create -f environment.yml
```

### Exercise 3: Docker Sharing
Create and share a Docker image.

**Solution:**
```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "main.py"]
```

```bash
docker build -t project:v1 .
docker tag project:v1 username/project:v1
docker push username/project:v1
```

---

## 📚 Additional Resources

### Tools
- [pip-tools](https://github.com/jazzband/pip-tools) - Better pip workflows
- [conda-lock](https://github.com/conda/conda-lock) - Conda lock files
- [pipenv](https://pipenv.pypa.io/) - Alternative to Poetry

### Documentation
- [Python Packaging Guide](https://packaging.python.org/)
- [Conda Documentation](https://docs.conda.io/)
- [Docker Documentation](https://docs.docker.com/)

---

## 🎯 Key Takeaways

1. ✅ **Share configuration, not environments** - Files, not directories
2. ✅ **Document setup process** - Clear README instructions
3. ✅ **Pin versions for reproducibility** - Exact versions in production
4. ✅ **Choose right method** - venv, conda, Poetry, or Docker
5. ✅ **Test on fresh setup** - Verify instructions work
6. ✅ **Keep dependencies updated** - Security and bug fixes
7. ✅ **Use version control** - Track environment changes

---

## 🔗 Navigation

- **Up**: [3.2 Virtual Environments Overview](./README.md)
- **Previous**: [05 - Environment Best Practices](./05-Best-Practices.md)
- **Next**: [3.3 Jupyter & JupyterLab](../3.3-Jupyter-JupyterLab/README.md)

---

**Remember:** Proper environment sharing is crucial for reproducibility and collaboration. Choose the method that best fits your project's needs!
