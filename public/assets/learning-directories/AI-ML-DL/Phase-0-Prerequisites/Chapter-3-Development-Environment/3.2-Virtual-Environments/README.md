# 3.2 Virtual Environments

## 📋 Overview

Virtual environments are isolated Python environments that allow you to install packages for specific projects without affecting the global Python installation. This is essential for managing dependencies and ensuring reproducibility.

**Duration:** 4-5 days

---

## 📚 Topics

1. [Why Virtual Environments](./01-Why-Virtual-Environments.md)
   - The dependency hell problem
   - Project isolation
   - Reproducibility benefits
   - Team collaboration

2. [venv Module](./02-venv-Module.md)
   - Built-in virtual environment tool
   - Creating and activating environments
   - Managing dependencies
   - Best practices

3. [Conda Environments](./03-Conda-Environments.md)
   - Creating conda environments
   - Environment specifications
   - Sharing environments
   - Advanced features

4. [virtualenv & virtualenvwrapper](./04-virtualenv-virtualenvwrapper.md)
   - Legacy tools (still useful)
   - Advanced features
   - Workflow automation
   - Tips and tricks

5. [Poetry](./05-Poetry.md)
   - Modern dependency management
   - pyproject.toml
   - Dependency resolution
   - Publishing packages

6. [Docker for Complete Isolation](./06-Docker-Containers.md)
   - Containerization basics
   - Dockerfile for Python
   - Docker Compose
   - ML workflows with Docker

---

## 🎯 Learning Objectives

After completing this section, you will be able to:
- Understand why virtual environments are crucial
- Create and manage venv environments
- Use conda for data science projects
- Implement Poetry for modern projects
- Containerize Python applications with Docker
- Share reproducible environments with teammates

---

## 🔑 Key Concepts

### Environment Isolation
Each project gets its own Python interpreter and packages, preventing conflicts.

### Dependency Management
Track exact versions of packages required for your project to work.

### Reproducibility
Anyone can recreate your exact environment using your specifications.

---

## ⏱️ Time Allocation

| Topic | Estimated Time |
|-------|----------------|
| Why Virtual Environments | 3-4 hours |
| venv Module | 6-8 hours |
| Conda Environments | 6-8 hours |
| virtualenv & virtualenvwrapper | 4-6 hours |
| Poetry | 6-8 hours |
| Docker Containers | 8-10 hours |
| **Total** | **4-5 days** |

---

## 📝 Exercises

Each topic file contains hands-on exercises. Total exercises: **20+**

**Key Projects:**
- Create multi-project setup with different Python versions
- Build shareable environment for team collaboration
- Dockerize a complete ML application

---

## 💡 Quick Start Examples

### venv (Built-in)
```bash
# Create environment
python -m venv myenv

# Activate
source myenv/bin/activate  # Linux/macOS
myenv\Scripts\activate     # Windows

# Install packages
pip install numpy pandas

# Deactivate
deactivate
```

### conda (Anaconda/Miniconda)
```bash
# Create environment with specific Python version
conda create -n myenv python=3.11

# Activate
conda activate myenv

# Install packages
conda install numpy pandas matplotlib

# Deactivate
conda deactivate
```

### Poetry (Modern)
```bash
# Initialize project
poetry init

# Add dependencies
poetry add numpy pandas

# Install all dependencies
poetry install

# Run in poetry environment
poetry run python script.py
```

---

## 🚀 Best Practices Summary

1. **One environment per project** - Never share environments
2. **Use requirements files** - Document dependencies
3. **Pin versions** - Ensure reproducibility
4. **Don't commit environments** - Add to .gitignore
5. **Use .python-version** - Specify Python version
6. **Activate before work** - Always work in environment
7. **Keep environments minimal** - Only install needed packages
8. **Document setup** - README with environment instructions

---

## 🔗 Navigation

- **Up**: [Chapter 3 Overview](../README.md)
- **Previous**: [3.1 Python Installation & Management](../3.1-Python-Installation-Management/README.md)
- **Next**: [3.3 Jupyter & JupyterLab](../3.3-Jupyter-JupyterLab/README.md)

---

## 📚 Additional Resources

- [Python venv Documentation](https://docs.python.org/3/library/venv.html)
- [Conda User Guide](https://docs.conda.io/projects/conda/en/latest/user-guide/)
- [Poetry Documentation](https://python-poetry.org/docs/)
- [Real Python: Virtual Environments](https://realpython.com/python-virtual-environments-a-primer/)
