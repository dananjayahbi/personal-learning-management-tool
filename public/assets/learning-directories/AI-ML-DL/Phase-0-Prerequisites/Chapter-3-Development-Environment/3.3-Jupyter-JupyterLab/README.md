# 3.3 Jupyter Notebooks & JupyterLab

## 📋 Overview

Jupyter notebooks are interactive computing environments that combine code execution, rich text, mathematics, plots, and media. They are the standard tool for data exploration, analysis, and sharing research in the ML community.

**Duration:** 4-5 days

---

## 📚 Topics

1. [Jupyter Notebook Basics](./01-Jupyter-Basics.md)
   - Installation and setup
   - Interface overview
   - Cells (code, markdown, raw)
   - Kernels and execution
   - Keyboard shortcuts
   - Saving and checkpoints

2. [JupyterLab - Modern Interface](./02-JupyterLab.md)
   - Installation and configuration
   - Multi-document interface
   - File browser
   - Terminal integration
   - Extensions and customization
   - Themes and layouts

3. [Magic Commands](./03-Magic-Commands.md)
   - Line magics (%)
   - Cell magics (%%)
   - Timing and profiling (%timeit, %prun)
   - Debugging (%debug, %pdb)
   - System commands (!ls, !pip)
   - Custom magics
   - Essential magics for ML

4. [Interactive Widgets](./04-Interactive-Widgets.md)
   - ipywidgets library
   - Creating interactive visualizations
   - Controls (sliders, dropdowns, buttons)
   - Layout and styling
   - Widget events
   - ML model interaction

5. [Notebook Extensions & Tools](./05-Extensions-Tools.md)
   - Popular extensions
   - Table of contents
   - Variable inspector
   - Code folding
   - Execution time
   - nbextensions
   - JupyterLab extensions

6. [Best Practices & Limitations](./06-Best-Practices.md)
   - When to use notebooks vs scripts
   - Organizing notebooks
   - Version control with notebooks
   - Converting notebooks (nbconvert)
   - Sharing notebooks
   - Testing notebook code
   - Notebook pitfalls to avoid

---

## 🎯 Learning Objectives

After completing this section, you will be able to:
- Set up and navigate Jupyter notebooks and JupyterLab
- Use magic commands for profiling and debugging
- Create interactive visualizations with widgets
- Apply best practices for notebook organization
- Convert notebooks to various formats
- Use Google Colab for cloud computing
- Share reproducible notebooks

---

## 🔑 Key Concepts

### Cells
- **Code cells**: Execute Python code
- **Markdown cells**: Formatted text, equations, images
- **Raw cells**: Unmodified text

### Kernels
The computational engine that executes code. Each notebook connects to a kernel (Python, R, Julia, etc.).

### Magic Commands
Special commands that enhance notebook functionality (profiling, debugging, system commands).

### Interactive Widgets
UI elements that let users interact with code and visualizations dynamically.

---

## ⏱️ Time Allocation

| Topic | Estimated Time |
|-------|----------------|
| Jupyter Basics | 6-8 hours |
| JupyterLab | 4-6 hours |
| Magic Commands | 6-8 hours |
| Interactive Widgets | 6-8 hours |
| Extensions & Tools | 4-6 hours |
| Best Practices | 4-6 hours |
| **Total** | **4-5 days** |

---

## 📝 Exercises

Each topic file contains hands-on exercises. Total exercises: **25+**

**Key Projects:**
- Create comprehensive data analysis notebook
- Build interactive ML model demo
- Develop tutorial notebook with widgets
- Set up professional JupyterLab environment

---

## 💡 Quick Start

### Installation

```bash
# Using pip
pip install jupyter jupyterlab

# Using conda
conda install jupyter jupyterlab

# Install ipywidgets
pip install ipywidgets
jupyter nbextension enable --py widgetsnbextension
```

### Launch

```bash
# Start Jupyter Notebook
jupyter notebook

# Start JupyterLab (recommended)
jupyter lab

# Start on specific port
jupyter lab --port=8889

# Start without opening browser
jupyter lab --no-browser
```

### Basic Usage

```python
# Code cell - Execute with Shift+Enter
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

data = np.random.randn(1000)
plt.hist(data, bins=30)
plt.show()
```

```markdown
# Markdown cell - Render with Shift+Enter
# This is a heading

- Bullet point
- **Bold text**
- *Italic text*

```python
# Code block in markdown
print("Hello")
```

Math: $E = mc^2$

## Essential Magic Commands

```python
# Timing
%timeit sum(range(1000))
%%timeit
x = 0
for i in range(1000):
    x += i

# Profiling
%prun expensive_function()

# Load external file
%load script.py

# Run external script
%run script.py

# Debug
%debug  # After an exception

# System commands
!pip install numpy
!ls -la
!pwd

# Display environment variables
%env

# Display matplotlib plots inline
%matplotlib inline
```

---

## 🚀 Essential Keyboard Shortcuts

### Command Mode (Press Esc)
- `A`: Insert cell above
- `B`: Insert cell below
- `D, D`: Delete cell
- `M`: Change to Markdown
- `Y`: Change to Code
- `Z`: Undo cell deletion
- `Shift+M`: Merge cells
- `Shift+Up/Down`: Select multiple cells

### Edit Mode (Press Enter)
- `Ctrl+Shift+-`: Split cell
- `Tab`: Code completion
- `Shift+Tab`: Tooltip/documentation
- `Ctrl+]`: Indent
- `Ctrl+[`: Dedent

### Both Modes
- `Shift+Enter`: Run cell, select below
- `Ctrl+Enter`: Run cell
- `Alt+Enter`: Run cell, insert below
- `Ctrl+S`: Save notebook

---

## 📊 Google Colab Integration

### What is Google Colab?

Free Jupyter notebook environment that runs in the cloud with free GPU/TPU access.

### Quick Start with Colab

```python
# Check if running in Colab
try:
    import google.colab
    IN_COLAB = True
except:
    IN_COLAB = False

# Mount Google Drive
if IN_COLAB:
    from google.colab import drive
    drive.mount('/content/drive')

# Check GPU availability
import torch
print(f"GPU Available: {torch.cuda.is_available()}")

# Install packages (in Colab)
!pip install package_name
```

### Colab Features

- **Free GPU**: NVIDIA T4 (12-hour sessions)
- **Free TPU**: For TensorFlow
- **Google Drive Integration**: Save/load files
- **GitHub Integration**: Open notebooks from repos
- **Sharing**: Easy collaboration

---

## 🎨 JupyterLab Extensions

```bash
# Install extension manager
pip install jupyterlab

# Popular extensions
pip install jupyterlab-git  # Git integration
pip install jupyterlab-code-formatter  # Code formatting
pip install jupyterlab-lsp  # Language server (autocomplete)

# Install from JupyterLab UI
# Settings > Extension Manager > Search and Install
```

**Must-Have Extensions:**
1. **jupyterlab-git**: Git integration
2. **jupyterlab-toc**: Table of contents
3. **jupyterlab-code-formatter**: Auto-format code
4. **jupyterlab-execute-time**: Show execution time
5. **jupyterlab-system-monitor**: CPU/Memory monitoring

---

## 📈 Notebook to Production

### Converting Notebooks

```bash
# Convert to Python script
jupyter nbconvert --to script notebook.ipynb

# Convert to HTML
jupyter nbconvert --to html notebook.ipynb

# Convert to PDF (requires LaTeX)
jupyter nbconvert --to pdf notebook.ipynb

# Convert to Markdown
jupyter nbconvert --to markdown notebook.ipynb

# Execute and convert
jupyter nbconvert --to html --execute notebook.ipynb
```

### Papermill - Parameterized Notebooks

```bash
# Install papermill
pip install papermill

# Run notebook with parameters
papermill input.ipynb output.ipynb -p param1 value1 -p param2 value2
```

```python
# In notebook, tag cell with "parameters"
# This cell will be replaced by papermill
alpha = 0.5
beta = 1.0
```

---

## 🔗 Navigation

- **Up**: [Chapter 3 Overview](../README.md)
- **Previous**: [3.2 Virtual Environments](../3.2-Virtual-Environments/README.md)
- **Next**: [3.4 IDEs for ML Development](../3.4-IDEs-for-ML/README.md)

---

## 📚 Additional Resources

- [Jupyter Documentation](https://jupyter.org/documentation)
- [JupyterLab Documentation](https://jupyterlab.readthedocs.io/)
- [Google Colab](https://colab.research.google.com/)
- [Jupyter Notebook Tutorial](https://www.dataquest.io/blog/jupyter-notebook-tutorial/)
- [IPython Documentation](https://ipython.readthedocs.io/)
- [nbviewer](https://nbviewer.org/) - Share notebooks
- [Binder](https://mybinder.org/) - Create executable environments

---

## 💡 Pro Tips

1. **Use markdown liberally** - Document your thought process
2. **Restart kernel regularly** - Ensure clean execution order
3. **Keep cells small** - One concept per cell
4. **Use meaningful names** - Name notebooks descriptively
5. **Version control** - Use jupytext for better git diffs
6. **Test in clean kernel** - "Restart & Run All" before sharing
7. **Export early, export often** - Convert to scripts for production
8. **Use keyboard shortcuts** - 10x productivity boost
