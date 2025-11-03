# Chapter 3: Development Environment Setup

## 📋 Overview

A well-configured development environment is the foundation of productive AI/ML work. This chapter will guide you through setting up a professional, efficient, and reproducible development environment that will serve you throughout your ML journey and beyond.

**Duration:** 2-3 weeks

**Prerequisites:** 
- Basic command-line knowledge
- Python fundamentals
- Completed Chapter 2 (Python for AI/ML)

---

## 🎯 Learning Objectives

By the end of this chapter, you will:
- ✅ Install and manage multiple Python versions professionally
- ✅ Create isolated virtual environments for every project
- ✅ Master Jupyter notebooks and JupyterLab for interactive development
- ✅ Configure powerful IDEs optimized for ML workflows
- ✅ Manage dependencies with pip, conda, and Poetry
- ✅ Use Git for version control and collaboration
- ✅ Optimize hardware setup (CPU/GPU) and leverage cloud computing
- ✅ Build reproducible development workflows

---

## 📚 Sections

### Section 3.1: [Python Installation & Management](./3.1-Python-Installation-Management/README.md)

**Managing Python Like a Pro**

Learn how to install, manage, and switch between multiple Python versions seamlessly. Understand the differences between standard Python, Anaconda, and Miniconda.

**Topics:**
- **Python Distribution Options**: CPython, Anaconda, Miniconda, PyPy
- **Installation Methods**: Official installer, package managers, from source
- **Version Management**: pyenv, conda, Windows Python launcher
- **Python Paths**: Understanding sys.path, site-packages, PYTHONPATH
- **Package Managers**: pip vs conda ecosystem

**Key Skills:**
- Install Python on Windows, Mac, and Linux
- Manage multiple Python versions simultaneously
- Understand when to use Anaconda vs standard Python
- Configure Python paths correctly
- Choose the right package manager for your needs

**Time**: 3-4 days | **Files**: 5 + README | **Exercises**: 15+

[📖 Start Python Installation →](./3.1-Python-Installation-Management/README.md)

---

### Section 3.2: [Virtual Environments](./3.2-Virtual-Environments/README.md)

**Isolation is Key**

Virtual environments are essential for reproducible ML projects. Learn to create, manage, and share isolated Python environments.

**Topics:**
- **Why Virtual Environments**: Dependency conflicts, reproducibility, project isolation
- **venv Module**: Built-in virtual environment creation
- **Conda Environments**: Powerful environment management with conda
- **virtualenv & virtualenvwrapper**: Legacy tools
- **Poetry**: Modern dependency management
- **Docker**: Containerization for complete isolation
- **Requirements Management**: requirements.txt, environment.yml, pyproject.toml

**Key Skills:**
- Create and activate virtual environments
- Manage project dependencies effectively
- Share environment specifications
- Troubleshoot common environment issues
- Choose the right tool for each scenario
- Automate environment setup

**Time**: 4-5 days | **Files**: 6 + README | **Exercises**: 20+

[📖 Start Virtual Environments →](./3.2-Virtual-Environments/README.md)

---

### Section 3.3: [Jupyter Notebooks & JupyterLab](./3.3-Jupyter-JupyterLab/README.md)

**Interactive Development Environment**

Jupyter notebooks are the de facto standard for ML experimentation and data analysis. Master both Jupyter notebooks and the more powerful JupyterLab.

**Topics:**
- **Jupyter Notebook Basics**: Installation, interface, cells, kernels
- **JupyterLab**: Modern interface, extensions, file browser
- **Magic Commands**: %timeit, %prun, %debug, %%writefile, and more
- **Interactive Widgets**: ipywidgets for interactive visualizations
- **Notebook Extensions**: Useful extensions and customizations
- **Best Practices**: When to use notebooks, limitations, converting to scripts
- **Google Colab**: Free GPU access in the cloud
- **Jupyter Book**: Creating technical documentation

**Key Skills:**
- Set up and configure Jupyter environments
- Use magic commands for profiling and debugging
- Create interactive visualizations
- Organize notebooks effectively
- Convert notebooks to scripts and presentations
- Use Google Colab for heavy computations
- Share reproducible notebooks

**Time**: 4-5 days | **Files**: 6 + README | **Exercises**: 25+

[📖 Start Jupyter →](./3.3-Jupyter-JupyterLab/README.md)

---

### Section 3.4: [IDEs for ML Development](./3.4-IDEs-for-ML/README.md)

**Professional Development Tools**

While notebooks are great for exploration, IDEs are essential for building production-ready code. Learn to configure powerful IDEs optimized for ML workflows.

**Topics:**
- **VS Code for ML**: Setup, extensions, debugger, integrated notebooks
- **PyCharm Professional**: Scientific mode, remote development, database tools
- **Spyder**: MATLAB-like IDE for scientific computing
- **Remote Development**: SSH, WSL, containers, cloud IDEs
- **Code Completion**: Copilot, Tabnine, Kite
- **Integrated Tools**: Terminal, debugger, profiler, Git integration
- **Comparison**: When to use each IDE

**Key Skills:**
- Install and configure VS Code for ML
- Set up PyCharm with ML plugins
- Use remote development effectively
- Debug Python code in IDEs
- Integrate Git workflows
- Use AI-powered code completion
- Choose the right IDE for your workflow

**Time**: 4-5 days | **Files**: 5 + README | **Exercises**: 18+

[📖 Start IDE Setup →](./3.4-IDEs-for-ML/README.md)

---

### Section 3.5: [Package Management](./3.5-Package-Management/README.md)

**Dependency Heaven (Not Hell)**

Master the art of package management to avoid dependency hell and ensure reproducible environments across different machines.

**Topics:**
- **pip Fundamentals**: Installation, upgrade, uninstall, freeze
- **pip Advanced**: Requirements files, constraints, pip-tools, editable installs
- **Conda Package Manager**: Installing packages, channels, priorities
- **Poetry**: Modern Python packaging and dependency management
- **pipenv**: Pipfile vs requirements.txt
- **Essential ML Libraries**: Installing TensorFlow, PyTorch, scikit-learn
- **Troubleshooting**: Resolving conflicts, version pinning, wheels vs source

**Key Skills:**
- Install packages with pip and conda
- Create detailed requirements files
- Resolve dependency conflicts
- Use Poetry for modern projects
- Install ML frameworks correctly
- Manage package versions
- Optimize installation speed

**Time**: 3-4 days | **Files**: 5 + README | **Exercises**: 15+

[📖 Start Package Management →](./3.5-Package-Management/README.md)

---

### Section 3.6: [Git & Version Control](./3.6-Git-Version-Control/README.md)

**Track Everything**

Git is essential for tracking code changes, collaborating with others, and maintaining project history. Learn Git specifically for ML projects.

**Topics:**
- **Git Basics**: init, clone, add, commit, push, pull
- **Branching Strategy**: Feature branches, gitflow, trunk-based development
- **ML-Specific Workflows**: Handling large files, data versioning, model versioning
- **Git LFS**: Large File Storage for datasets and models
- **DVC**: Data Version Control for ML pipelines
- **.gitignore for ML**: What to track and what not to
- **GitHub/GitLab**: Remote repositories, pull requests, issues
- **Collaboration**: Code review, merge conflicts, best practices

**Key Skills:**
- Use Git for everyday development
- Create effective commit messages
- Manage branches effectively
- Handle large files with Git LFS
- Use DVC for data versioning
- Collaborate via GitHub/GitLab
- Resolve merge conflicts
- Maintain clean project history

**Time**: 4-5 days | **Files**: 6 + README | **Exercises**: 22+

[📖 Start Git →](./3.6-Git-Version-Control/README.md)

---

### Section 3.7: [Hardware & Cloud Setup](./3.7-Hardware-Cloud-Setup/README.md)

**Compute Resources for ML**

Understanding hardware requirements and cloud computing options is crucial for training large models efficiently and cost-effectively.

**Topics:**
- **CPU vs GPU**: When each matters, specifications to look for
- **GPU Setup**: CUDA, cuDNN, checking GPU availability
- **Memory Requirements**: RAM, VRAM, swap space
- **Storage Solutions**: SSD vs HDD, NVMe, external storage
- **Cloud Platforms**: AWS, GCP, Azure, their ML services
- **Kaggle Notebooks**: Free GPU/TPU access
- **Google Colab**: Free tier, Pro, Pro+
- **Cloud GPU Rentals**: Lambda Labs, Vast.ai, Paperspace
- **Cost Optimization**: Spot instances, auto-shutdown, monitoring

**Key Skills:**
- Check GPU availability in Python
- Install CUDA and cuDNN
- Choose appropriate hardware for ML tasks
- Set up cloud computing accounts
- Use Kaggle/Colab effectively
- Estimate cloud computing costs
- Optimize cloud spending
- Transfer data to/from cloud

**Time**: 3-4 days | **Files**: 5 + README | **Exercises**: 12+

[📖 Start Hardware Setup →](./3.7-Hardware-Cloud-Setup/README.md)

---

## 🗺️ Learning Roadmap

```
Week 1: Python & Environments Foundation
├── Days 1-2: Python Installation & Management
│   ├── Install Python/Anaconda
│   ├── Understand Python paths
│   └── Practice version switching
├── Days 3-5: Virtual Environments
│   ├── Create venv environments
│   ├── Master conda environments
│   ├── Learn Poetry basics
│   └── Practice requirements management
└── Days 6-7: Practice & Integration
    └── Build multi-environment project

Week 2: Interactive & Professional Tools
├── Days 1-3: Jupyter Mastery
│   ├── Set up JupyterLab
│   ├── Master magic commands
│   ├── Create interactive widgets
│   └── Use Google Colab
├── Days 4-7: IDE Configuration
│   ├── Set up VS Code
│   ├── Configure PyCharm
│   ├── Master debugging
│   └── Remote development
└── Practice: Complete ML notebook + script

Week 3: Version Control & Infrastructure
├── Days 1-3: Git Mastery
│   ├── Basic Git operations
│   ├── Branching strategies
│   ├── Git LFS and DVC
│   └── GitHub collaboration
├── Days 4-5: Package Management Deep Dive
│   ├── Advanced pip usage
│   ├── Conda channels
│   └── Poetry projects
├── Days 6-7: Hardware & Cloud
│   ├── GPU setup/checking
│   ├── Cloud accounts
│   ├── Kaggle/Colab usage
│   └── Cost optimization
└── Final: Complete development environment
```

---

## 🎓 Hands-on Projects

### Project 1: Environment Setup Automation (Week 1)
**Goal**: Create automated setup scripts
- Write bash/Python script to set up complete environment
- Include Python installation check
- Create virtual environment
- Install all required packages
- Configure Git
- Generate project structure
- Document every step

**Deliverables:**
- `setup.sh` or `setup.py`
- `requirements.txt`
- `environment.yml`
- `README.md` with instructions

---

### Project 2: Jupyter Notebook Gallery (Week 2)
**Goal**: Create comprehensive notebook showcasing skills
- Data loading and exploration
- Interactive visualizations with ipywidgets
- Performance profiling with magic commands
- Inline documentation and markdown
- Export to HTML/PDF
- Share on GitHub with Colab link

**Deliverables:**
- Well-documented notebook
- HTML export
- GitHub repository
- Colab-ready version

---

### Project 3: Professional ML Project Structure (Week 2)
**Goal**: Build production-ready project template
- Complete directory structure
- Modular code in `src/`
- Configuration files
- Unit tests
- Documentation
- CI/CD ready
- Docker containerization (bonus)

**Deliverables:**
- Complete project template
- Documentation
- Example usage
- Shareable on GitHub

---

### Project 4: Cloud ML Pipeline (Week 3)
**Goal**: Run complete ML pipeline in cloud
- Set up cloud account (AWS/GCP/Colab)
- Upload data to cloud storage
- Train model on cloud GPU
- Track experiments
- Download results
- Document costs

**Deliverables:**
- Cloud setup documentation
- Training scripts
- Cost analysis
- Results report

---

### Project 5: Git-Based ML Collaboration (Week 3)
**Goal**: Collaborative ML project with version control
- Initialize Git repository
- Create multiple branches
- Version data with DVC/Git LFS
- Submit pull requests
- Review code
- Merge branches
- Tag releases

**Deliverables:**
- Git repository with history
- DVC tracked data
- Pull request examples
- Collaboration documentation

---

## 📊 Tools Comparison Matrix

### Python Distribution

| Distribution | Size | Package Manager | Use Case | Best For |
|-------------|------|-----------------|----------|----------|
| Standard Python | ~30MB | pip | General Python dev | Learning, web dev |
| Miniconda | ~50MB | conda | Minimal ML setup | Experienced users |
| Anaconda | ~3GB | conda | Full data science | Beginners, all-in-one |
| PyPy | ~50MB | pip | Performance | Specific performance needs |

### Virtual Environment Tools

| Tool | Install Method | Config File | Best For | Learning Curve |
|------|---------------|-------------|----------|----------------|
| venv | Built-in | requirements.txt | Simple projects | Easy |
| conda | Anaconda/Miniconda | environment.yml | Data science | Medium |
| Poetry | pip | pyproject.toml | Modern projects | Medium |
| Docker | Docker install | Dockerfile | Complete isolation | Hard |

### IDE Comparison

| IDE | Cost | Language Support | ML Features | Best For |
|-----|------|-----------------|-------------|----------|
| VS Code | Free | Excellent | Good with extensions | General purpose |
| PyCharm Pro | Paid | Python focus | Excellent | Python specialists |
| PyCharm CE | Free | Python focus | Good | Python projects |
| Spyder | Free | Python/scientific | Good | MATLAB users |
| Jupyter | Free | Notebooks | Excellent | Exploration |

### Cloud Platform Comparison

| Platform | Free Tier | GPU Options | ML Services | Complexity | Cost |
|----------|-----------|-------------|-------------|------------|------|
| Google Colab | Yes (12h sessions) | T4, A100, TPU | Basic | Easy | $ |
| Kaggle | Yes (30h/week) | P100, T4 | Good | Easy | Free |
| AWS | Limited | Many options | Comprehensive | Hard | $$$ |
| GCP | $300 credit | Many options | Excellent | Hard | $$$ |
| Azure | $200 credit | Many options | Excellent | Hard | $$$ |
| Paperspace | Limited | Various | Good | Medium | $$ |

---

## 💡 Pro Tips for This Chapter

### 1. **Start with Anaconda for Learning**
If you're new, Anaconda provides everything you need. Switch to Miniconda when comfortable.

### 2. **One Environment Per Project**
Never install packages globally. Always use virtual environments.

### 3. **Master Jupyter First, Then IDEs**
Notebooks are great for learning. IDEs are essential for production code.

### 4. **Version Everything**
Code, data, models, configurations—track all changes with Git/DVC.

### 5. **Start with Free Cloud Options**
Use Colab and Kaggle before paying for cloud resources.

### 6. **Automate Environment Setup**
Create scripts to reproduce your environment on any machine.

### 7. **Document Hardware Requirements**
Note CPU/GPU/RAM requirements for your projects.

### 8. **Use .gitignore Properly**
Never commit data, models, or environment folders to Git.

### 9. **Learn Git Early**
Don't wait. Start using Git from your first project.

### 10. **Keep Environments Minimal**
Only install what you need. Smaller environments are faster and more reliable.

---

## 🛠️ Quick Start Checklist

### Essential Setup (Do This First!)

```bash
# 1. Install Python/Anaconda
# Download from python.org or anaconda.com

# 2. Verify installation
python --version
# or
conda --version

# 3. Create your first environment
conda create -n ml-env python=3.10
conda activate ml-env

# 4. Install essential packages
conda install numpy pandas matplotlib scikit-learn jupyter

# 5. Install deep learning framework (choose one)
pip install tensorflow  # or
pip install torch torchvision  # or both!

# 6. Verify GPU (if available)
python -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"
# or
python -c "import torch; print(torch.cuda.is_available())"

# 7. Launch Jupyter
jupyter lab

# 8. Initialize Git (in your project directory)
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 9. Create .gitignore
cat > .gitignore << EOF
data/
models/
*.pyc
__pycache__/
.ipynb_checkpoints/
.venv/
EOF

# 10. First commit
git add .
git commit -m "Initial commit"
```

---

## 📈 Progress Tracking

### Section Completion Checklist

- [ ] **3.1 Python Installation & Management**
  - [ ] Python Distribution Options
  - [ ] Installation on Your OS
  - [ ] Version Management Tools
  - [ ] Understanding Python Paths
  - [ ] Package Manager Basics
  - [ ] All exercises completed

- [ ] **3.2 Virtual Environments**
  - [ ] Why Virtual Environments
  - [ ] venv Module
  - [ ] Conda Environments
  - [ ] Poetry Management
  - [ ] Docker Basics
  - [ ] Requirements Management
  - [ ] All exercises completed

- [ ] **3.3 Jupyter & JupyterLab**
  - [ ] Jupyter Installation
  - [ ] JupyterLab Features
  - [ ] Magic Commands
  - [ ] Interactive Widgets
  - [ ] Extensions
  - [ ] Google Colab
  - [ ] All exercises completed

- [ ] **3.4 IDEs for ML**
  - [ ] VS Code Setup
  - [ ] PyCharm Configuration
  - [ ] Spyder Basics
  - [ ] Remote Development
  - [ ] Debugging Tools
  - [ ] All exercises completed

- [ ] **3.5 Package Management**
  - [ ] pip Fundamentals
  - [ ] pip Advanced
  - [ ] Conda Packages
  - [ ] Poetry Usage
  - [ ] ML Libraries Installation
  - [ ] All exercises completed

- [ ] **3.6 Git & Version Control**
  - [ ] Git Basics
  - [ ] Branching Strategies
  - [ ] Git LFS
  - [ ] DVC for ML
  - [ ] GitHub/GitLab
  - [ ] Collaboration
  - [ ] All exercises completed

- [ ] **3.7 Hardware & Cloud**
  - [ ] GPU Setup
  - [ ] Cloud Platforms
  - [ ] Kaggle/Colab
  - [ ] Cost Optimization
  - [ ] All exercises completed

### Project Completion

- [ ] Project 1: Environment Setup Automation
- [ ] Project 2: Jupyter Notebook Gallery
- [ ] Project 3: Professional ML Project Structure
- [ ] Project 4: Cloud ML Pipeline
- [ ] Project 5: Git-Based ML Collaboration

---

## 🎯 Chapter Assessment

### Self-Assessment Questions

1. Can you create and activate a virtual environment?
2. Can you install packages without breaking dependencies?
3. Do you know when to use notebooks vs scripts?
4. Can you use Git to track your project changes?
5. Can you debug Python code in an IDE?
6. Do you understand the difference between pip and conda?
7. Can you set up a cloud GPU instance?
8. Can you reproduce your environment on another machine?
9. Do you know how to use Git LFS for large files?
10. Can you estimate cloud computing costs?

### Practical Assessment

**Build Your Complete Development Environment:**

1. **Install Tools**
   - Install Python or Anaconda
   - Install Git
   - Install an IDE (VS Code or PyCharm)

2. **Create Project**
   - Create virtual environment
   - Install ML packages
   - Set up project structure

3. **Version Control**
   - Initialize Git repository
   - Create .gitignore
   - Make meaningful commits

4. **Interactive Development**
   - Create Jupyter notebook
   - Use magic commands
   - Create visualization

5. **Professional Code**
   - Write modular Python script
   - Add documentation
   - Create unit tests

6. **Cloud Integration**
   - Set up Colab notebook
   - Run on cloud GPU
   - Download results

7. **Documentation**
   - Write comprehensive README
   - Document environment setup
   - Include usage examples

**Success Criteria:**
- Environment is reproducible
- Code is well-organized
- Git history is clean
- Documentation is clear
- Can run on local and cloud
- Follows best practices

---

## 📚 Additional Resources

### Official Documentation
- [Python Documentation](https://docs.python.org/3/)
- [Anaconda Documentation](https://docs.anaconda.com/)
- [Jupyter Documentation](https://jupyter.org/documentation)
- [Git Documentation](https://git-scm.com/doc)
- [VS Code Python](https://code.visualstudio.com/docs/python/python-tutorial)

### Books
- **"Python for DevOps"** by Kennedy Behrman et al.
- **"Python Tricks"** by Dan Bader
- **"Pro Git"** by Scott Chacon (free online)

### Video Courses
- [Corey Schafer - Python Tutorials](https://www.youtube.com/user/schafer5)
- [Tech With Tim - Python](https://www.youtube.com/c/TechWithTim)
- [Git & GitHub Crash Course](https://www.youtube.com/watch?v=RGOj5yH7evk)

### Interactive Tutorials
- [Learn Git Branching](https://learngitbranching.js.org/)
- [Git Immersion](http://gitimmersion.com/)
- [Jupyter Tutorial](https://jupyter.org/try)

### Tools & Utilities
- [Oh My Zsh](https://ohmyz.sh/) - Better terminal
- [pyenv](https://github.com/pyenv/pyenv) - Python version management
- [pre-commit](https://pre-commit.com/) - Git hooks
- [Black](https://black.readthedocs.io/) - Code formatter
- [isort](https://pycqa.github.io/isort/) - Import sorting

### Community
- [r/Python](https://www.reddit.com/r/Python/)
- [r/learnpython](https://www.reddit.com/r/learnpython/)
- [Stack Overflow - Python](https://stackoverflow.com/questions/tagged/python)
- [Python Discord](https://discord.gg/python)

---

## 🚀 Next Steps

After completing this chapter:

1. **Verify Setup**: Ensure all tools are working
2. **Practice Daily**: Use these tools in every project
3. **Automate**: Create setup scripts
4. **Integrate**: Use with Chapter 1 & 2 knowledge
5. **Build**: Complete all 5 projects
6. **Move On**: Proceed to **[Phase 1: Machine Learning](../../Phase-1-Machine-Learning/README.md)**

---

## 🎓 Certification

Upon completion:
- [ ] Completed all 7 sections
- [ ] Solved 90%+ of exercises (100+ total)
- [ ] Completed all 5 projects
- [ ] Passed self-assessment
- [ ] Built reproducible environment
- [ ] Can troubleshoot common issues

**You now have a professional ML development environment!**

---

## 🔗 Navigation

- **Previous**: [Chapter 2 - Python for AI/ML](../Chapter-2-Python-for-AI-ML/README.md)
- **Next**: [Phase 1 - Machine Learning Foundations](../../Phase-1-Machine-Learning/README.md)
- **Up**: [Phase 0 Overview](../README.md)

---

## 📝 Final Notes

**Remember:**
- A good environment setup saves hundreds of hours later
- Automate everything you can
- Document your setup process
- Keep environments minimal and clean
- Version control is not optional
- Cloud resources can get expensive—monitor costs
- When in doubt, use virtual environments
- The best tools are the ones you'll actually use

**The goal:** Create a development environment so smooth that you can focus entirely on learning and building ML models, not fighting with installation issues.

**You're now ready to build amazing ML projects!** 🚀
