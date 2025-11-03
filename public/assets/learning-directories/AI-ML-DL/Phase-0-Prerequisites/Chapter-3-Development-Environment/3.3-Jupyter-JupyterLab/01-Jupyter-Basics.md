# 01 - Jupyter Notebook Basics

## 📋 Introduction

Jupyter Notebook is an open-source web application that allows you to create and share documents containing live code, equations, visualizations, and narrative text. It has become the standard tool for data exploration and machine learning experiments.

**Why Jupyter?**
- ✅ Interactive code execution
- ✅ Mix code, text, and visualizations
- ✅ Easy sharing and collaboration
- ✅ Support for 40+ programming languages
- ✅ Rich output (plots, tables, videos)
- ✅ Reproducible research
- ✅ Industry standard for ML/Data Science

---

## 📦 Installation

### Using pip

```bash
# Install Jupyter Notebook
pip install jupyter

# Install with additional packages
pip install jupyter numpy pandas matplotlib

# Verify installation
jupyter --version
```

### Using conda

```bash
# Install Jupyter Notebook
conda install jupyter

# Or create new environment with Jupyter
conda create -n jupyter-env python=3.10 jupyter
conda activate jupyter-env
```

### Installing Kernels

```bash
# Install IPython kernel (usually included)
pip install ipykernel

# Add current environment as kernel
python -m ipykernel install --user --name myenv --display-name "Python (myenv)"

# List installed kernels
jupyter kernelspec list

# Remove a kernel
jupyter kernelspec uninstall kernel_name
```

---

## 🚀 Starting Jupyter

### Basic Commands

```bash
# Start Jupyter Notebook (opens in browser)
jupyter notebook

# Start in specific directory
jupyter notebook /path/to/directory

# Start on specific port
jupyter notebook --port=8889

# Start without opening browser
jupyter notebook --no-browser

# Show help
jupyter notebook --help
```

### Configuration

```bash
# Generate config file
jupyter notebook --generate-config

# Config file location: ~/.jupyter/jupyter_notebook_config.py

# Edit config
nano ~/.jupyter/jupyter_notebook_config.py
```

**Common configurations:**
```python
# jupyter_notebook_config.py

# Change default port
c.NotebookApp.port = 8889

# Set default directory
c.NotebookApp.notebook_dir = '/path/to/notebooks'

# Disable token authentication (not recommended for public networks)
c.NotebookApp.token = ''

# Enable password protection
c.NotebookApp.password = 'hashed_password'
```

### Setting Password

```bash
# Set password
jupyter notebook password

# Enter and verify password
# Password hash stored in jupyter_notebook_config.json
```

---

## 🖥️ Interface Overview

### Home Page (Dashboard)

When you start Jupyter, you see the dashboard with three tabs:

1. **Files**: Browse and manage notebooks
2. **Running**: View active notebooks and terminals
3. **Clusters**: For IPython parallel computing (advanced)

### Notebook Interface

```
┌─────────────────────────────────────────────┐
│ File Edit View Insert Cell Kernel Help     │ ← Menu Bar
├─────────────────────────────────────────────┤
│ + ▶ ■ ↻ ⬆ ⬇ ✂ 📋 📄 Code ▼ 💾            │ ← Toolbar
├─────────────────────────────────────────────┤
│                                             │
│  [ ] # Cell 1 (Code)                       │
│      import numpy as np                     │
│      print("Hello")                         │
│                                             │
│  Out[1]: Hello                             │
├─────────────────────────────────────────────┤
│  [ ] # Cell 2 (Markdown)                   │
│      ## This is a heading                   │
│      This is **bold** text                  │
└─────────────────────────────────────────────┘
```

---

## 📝 Cell Types

### 1. Code Cells

Execute Python (or other language) code.

```python
# Code cell example
import numpy as np
import matplotlib.pyplot as plt

# Generate data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Plot
plt.plot(x, y)
plt.title("Sine Wave")
plt.xlabel("x")
plt.ylabel("sin(x)")
plt.show()
```

**Output:** Graph displays below the cell

### 2. Markdown Cells

Format text using Markdown syntax.

````markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
~~Strikethrough~~

- Bullet point
1. Numbered list
2. Another item

[Link](https://example.com)

`inline code`

```python
# Code block
print("Hello")
```

> Blockquote

| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |

Math: $E = mc^2$

Display math:
$$
\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

Images:
![Alt text](image.png)
````

### 3. Raw Cells

Unformatted text, not executed or rendered. Useful for:
- LaTeX source
- Configuration files
- Documentation

---

## ▶️ Executing Cells

### Methods to Run

1. **Shift + Enter**: Run cell, move to next
2. **Ctrl + Enter**: Run cell, stay in place
3. **Alt + Enter**: Run cell, insert new cell below
4. **Menu**: Cell > Run Cells
5. **Toolbar**: ▶️ Run button

### Execution Order

```python
# Cell 1 - Run first
x = 10

# Cell 2 - Run second
y = x + 5
print(y)  # Output: 15

# Cell 3 - Run third
z = y * 2
print(z)  # Output: 30
```

**Important:** Cells can be run in any order, but variables persist in kernel memory.

### Execution Counter

```python
In [1]: x = 10  # First execution
In [2]: y = 20  # Second execution
In [3]: z = 30  # Third execution
```

The number in brackets shows execution order.

---

## 🧠 Understanding Kernels

### What is a Kernel?

A kernel is the computational engine that executes code. Each notebook connects to one kernel.

### Kernel Operations

```bash
# From Menu Bar:
Kernel > Interrupt        # Stop execution (Ctrl+C equivalent)
Kernel > Restart          # Restart kernel (clears variables)
Kernel > Restart & Clear Output  # Restart + clear all output
Kernel > Restart & Run All       # Restart + run all cells
Kernel > Reconnect        # Reconnect to kernel
Kernel > Shutdown         # Stop kernel
Kernel > Change kernel    # Switch to different kernel
```

### Kernel State

```python
# Cell 1
x = 10

# Cell 2
print(x)  # Output: 10

# After Kernel > Restart

# Cell 2 (run again)
print(x)  # NameError: name 'x' is not defined
```

**Best Practice:** Use "Restart & Run All" before sharing notebooks to ensure clean execution order.

---

## ⌨️ Keyboard Shortcuts

### Command Mode (Blue border, press Esc)

**Navigation:**
- `↑/↓`: Move up/down
- `K/J`: Move up/down (Vim-style)

**Cell Operations:**
- `A`: Insert cell above
- `B`: Insert cell below
- `D, D`: Delete cell (press D twice)
- `Z`: Undo cell deletion
- `X`: Cut cell
- `C`: Copy cell
- `V`: Paste cell below
- `Shift + V`: Paste cell above
- `Shift + M`: Merge selected cells

**Cell Type:**
- `M`: Change to Markdown
- `Y`: Change to Code
- `R`: Change to Raw

**Running:**
- `Shift + Enter`: Run cell, select below
- `Ctrl + Enter`: Run cell
- `Alt + Enter`: Run cell, insert below

**Other:**
- `S` or `Ctrl + S`: Save notebook
- `L`: Toggle line numbers
- `Shift + L`: Toggle line numbers (all cells)
- `O`: Toggle output
- `Shift + O`: Toggle output scrolling

### Edit Mode (Green border, press Enter)

**Editing:**
- `Tab`: Code completion
- `Shift + Tab`: Tooltip/documentation
- `Ctrl + ]`: Indent
- `Ctrl + [`: Dedent
- `Ctrl + A`: Select all
- `Ctrl + Z`: Undo
- `Ctrl + Shift + Z`: Redo

**Code Navigation:**
- `Ctrl + ←/→`: Move by word
- `Ctrl + Home/End`: Move to start/end
- `Ctrl + /`: Toggle comment

**Cell Operations:**
- `Ctrl + Shift + -`: Split cell at cursor
- `Esc`: Enter command mode

### Universal Shortcuts

- `Shift + Enter`: Run cell, select below
- `Ctrl + Enter`: Run cell
- `Alt + Enter`: Run cell, insert below
- `Ctrl + S`: Save

**View all shortcuts:** `H` (in command mode) or Help > Keyboard Shortcuts

---

## 💾 Saving and Checkpoints

### Manual Save

```bash
# Keyboard shortcut
Ctrl + S  # or Cmd + S on Mac

# Menu
File > Save and Checkpoint

# Toolbar
💾 Save icon
```

### Auto-Save

Jupyter automatically saves every 2 minutes (configurable).

### Checkpoints

Jupyter creates checkpoints for recovery:

```bash
# Create checkpoint
File > Save and Checkpoint

# Revert to checkpoint
File > Revert to Checkpoint

# View checkpoint time
File menu shows last checkpoint time
```

**Checkpoint location:** `.ipynb_checkpoints/` directory

---

## 📤 Exporting Notebooks

### From Menu

```bash
File > Download as >
├── Notebook (.ipynb)
├── Python (.py)
├── HTML (.html)
├── Markdown (.md)
├── reST (.rst)
├── LaTeX (.tex)
└── PDF via LaTeX (.pdf)
```

### Using nbconvert

```bash
# Convert to Python script
jupyter nbconvert --to script notebook.ipynb

# Convert to HTML
jupyter nbconvert --to html notebook.ipynb

# Convert to PDF (requires LaTeX)
jupyter nbconvert --to pdf notebook.ipynb

# Execute notebook and convert
jupyter nbconvert --to html --execute notebook.ipynb

# Convert all notebooks in directory
jupyter nbconvert --to python *.ipynb
```

### Python Script Output

```python
# Input notebook:
# Cell 1: import numpy as np
# Cell 2: x = np.array([1, 2, 3])

# Output .py file:
#!/usr/bin/env python
# coding: utf-8

# In[1]:
import numpy as np

# In[2]:
x = np.array([1, 2, 3])
```

---

## 🎨 Rich Output

### Displaying Images

```python
from IPython.display import Image, display

# From file
display(Image('image.png'))

# From URL
display(Image(url='https://example.com/image.png'))

# With size control
display(Image('image.png', width=400))
```

### Displaying HTML

```python
from IPython.display import HTML

html_code = """
<div style="background-color: lightblue; padding: 10px;">
    <h2>Custom HTML</h2>
    <p>This is rendered HTML in the notebook</p>
</div>
"""

display(HTML(html_code))
```

### Displaying Videos

```python
from IPython.display import Video

# From file
Video('video.mp4')

# From YouTube
from IPython.display import YouTubeVideo
YouTubeVideo('dQw4w9WgXcQ')
```

### Displaying DataFrames

```python
import pandas as pd

df = pd.DataFrame({
    'A': [1, 2, 3],
    'B': [4, 5, 6],
    'C': [7, 8, 9]
})

# Default display
display(df)

# Styled display
df.style.background_gradient(cmap='viridis')
```

### Progress Bars

```python
from tqdm.notebook import tqdm
import time

for i in tqdm(range(100)):
    time.sleep(0.01)
```

---

## 🐛 Basic Debugging

### Print Debugging

```python
def calculate(x, y):
    print(f"Debug: x={x}, y={y}")
    result = x + y
    print(f"Debug: result={result}")
    return result

calculate(5, 3)
```

### Using `%debug` Magic

```python
def buggy_function():
    x = 10
    y = 0
    result = x / y  # Division by zero
    return result

# Run the function (will raise error)
buggy_function()

# After error, run:
%debug

# Interactive debugger opens:
# ipdb> p x  # Print x
# ipdb> p y  # Print y
# ipdb> quit  # Exit debugger
```

### Assertions

```python
def validate_input(x):
    assert x > 0, "x must be positive"
    assert isinstance(x, (int, float)), "x must be numeric"
    return x * 2

validate_input(-5)  # AssertionError: x must be positive
```

---

## 🎯 Best Practices

### 1. One Concept Per Cell

```python
# ❌ Bad - Multiple unrelated operations
import numpy as np
data = np.random.randn(100)
mean = data.mean()
import pandas as pd
df = pd.read_csv('file.csv')

# ✅ Good - Separate logical operations
# Cell 1: Imports
import numpy as np
import pandas as pd

# Cell 2: Generate data
data = np.random.randn(100)
mean = data.mean()

# Cell 3: Load data
df = pd.read_csv('file.csv')
```

### 2. Clear Cell Output Before Sharing

```bash
# From menu
Cell > All Output > Clear

# Or use nbconvert
jupyter nbconvert --clear-output --inplace notebook.ipynb
```

### 3. Test with Clean Kernel

```bash
# Before sharing
Kernel > Restart & Run All

# Verify no errors
# Check execution order is sequential
```

### 4. Use Markdown for Documentation

```markdown
# Data Analysis

## Loading Data
The following cell loads the dataset from CSV.

## Data Cleaning
We remove missing values and outliers.

## Analysis
Statistical summary and visualizations.
```

### 5. Name Notebooks Descriptively

```bash
# ❌ Bad
notebook1.ipynb
Untitled.ipynb
test.ipynb

# ✅ Good
01_data_exploration.ipynb
02_feature_engineering.ipynb
03_model_training.ipynb
```

---

## 🎓 Exercises

### Exercise 1: Basic Navigation
Create a notebook with 5 cells using only keyboard shortcuts.

**Solution:**
```
Esc (command mode)
B B B B (create 4 more cells)
Enter (edit first cell)
Type code
Shift+Enter (run and move down)
```

### Exercise 2: Markdown Practice
Create a cell with heading, list, code block, and equation.

**Solution:**
````markdown
# Data Analysis

## Steps:
1. Load data
2. Clean data
3. Analyze

```python
import pandas as pd
```

Formula: $\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$
````

### Exercise 3: Rich Output
Display an image, HTML, and styled DataFrame.

**Solution:**
```python
from IPython.display import Image, HTML, display
import pandas as pd

# Image
display(Image(url='https://via.placeholder.com/150'))

# HTML
display(HTML('<h3>Custom HTML</h3>'))

# DataFrame
df = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})
display(df.style.highlight_max(axis=0))
```

---

## 🐛 Troubleshooting

### Issue 1: Kernel Dies

**Solution:**
```bash
# Check memory usage
import sys
sys.getsizeof(large_variable)

# Clear large variables
del large_variable

# Restart kernel
Kernel > Restart
```

### Issue 2: Can't Connect to Kernel

**Solution:**
```bash
# Kill zombie kernels
jupyter notebook list  # Show running servers
jupyter notebook stop 8888  # Stop server on port 8888

# Or restart Jupyter completely
```

### Issue 3: Port Already in Use

**Solution:**
```bash
# Use different port
jupyter notebook --port=8889

# Or kill process on port
# Linux/Mac:
lsof -ti:8888 | xargs kill -9

# Windows:
netstat -ano | findstr :8888
taskkill /PID <PID> /F
```

---

## 📚 Additional Resources

### Official Documentation
- [Jupyter Documentation](https://jupyter.org/documentation)
- [IPython Documentation](https://ipython.readthedocs.io/)

### Tutorials
- [Jupyter Notebook Tutorial](https://www.dataquest.io/blog/jupyter-notebook-tutorial/)
- [Real Python Jupyter Guide](https://realpython.com/jupyter-notebook-introduction/)

---

## 🎯 Key Takeaways

1. ✅ **Interactive execution** - Run code cells individually
2. ✅ **Three cell types** - Code, Markdown, Raw
3. ✅ **Keyboard shortcuts** - Command mode vs Edit mode
4. ✅ **Kernel management** - Restart for clean state
5. ✅ **Rich output** - Images, HTML, videos, DataFrames
6. ✅ **Best practices** - One concept per cell, test with clean kernel
7. ✅ **Export options** - Python, HTML, PDF, Markdown

---

## 🔗 Navigation

- **Up**: [3.3 Jupyter & JupyterLab Overview](./README.md)
- **Next**: [02 - JupyterLab Modern Interface](./02-JupyterLab.md)

---

**Remember:** Jupyter notebooks are for exploration and communication. For production code, convert to Python scripts!
