# 03 - Jupyter Notebooks Best Practices

## 📋 Table of Contents
- [Introduction](#introduction)
- [When to Use Notebooks](#when-to-use-notebooks)
- [Notebook Structure](#notebook-structure)
- [Magic Commands](#magic-commands)
- [Best Practices](#best-practices)
- [From Notebook to Production](#from-notebook-to-production)
- [Practice Exercises](#practice-exercises)

---

## Introduction

Jupyter Notebooks are interactive environments ideal for data exploration and experimentation.

---

## When to Use Notebooks

### ✅ Good Use Cases
- **Exploratory Data Analysis (EDA)**
- **Data visualization**
- **Prototyping algorithms**
- **Teaching and presentations**
- **Sharing analysis results**
- **Interactive debugging**

### ❌ When to Use Scripts Instead
- **Production code**
- **Large-scale processing**
- **Automated pipelines**
- **Unit testing**
- **Version control heavy workflows**
- **Performance-critical code**

---

## Notebook Structure

### Recommended Organization

```markdown
# Project Title

**Author**: Your Name  
**Date**: 2024-01-15  
**Description**: Brief overview of analysis

## Table of Contents
1. Setup and Imports
2. Load Data
3. Exploratory Data Analysis
4. Data Preprocessing
5. Model Training
6. Evaluation
7. Conclusions
```

### Cell Structure

```python
# CELL 1: Setup
%load_ext autoreload
%autoreload 2
%matplotlib inline

import warnings
warnings.filterwarnings('ignore')

# CELL 2: Imports (group logically)
# Standard library
import os
from pathlib import Path

# Data manipulation
import numpy as np
import pandas as pd

# Visualization
import matplotlib.pyplot as plt
import seaborn as sns

# Machine learning
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# CELL 3: Configuration
RANDOM_STATE = 42
DATA_PATH = Path("data/raw")
FIGURE_SIZE = (10, 6)

np.random.seed(RANDOM_STATE)
sns.set_style('whitegrid')
```

---

## Magic Commands

### Line Magics (%)

```python
# Timing execution
%time sum(range(1000000))

# Multiple runs (average)
%timeit sum(range(1000000))

# Run external Python file
%run script.py

# Execute shell command
%ls
%pwd

# Show variable info
x = [1, 2, 3]
%whos

# Load file contents into cell
%load script.py

# Save cell to file
%%writefile output.py
def hello():
    print("Hello, World!")
```

### Cell Magics (%%)

```python
# Time entire cell
%%time
result = 0
for i in range(1000000):
    result += i
print(result)

# Capture cell output
%%capture output
print("This won't display")
result = 42

# Use captured output
print(output.stdout)

# Run cell as script
%%script python
print("Running as script")

# HTML rendering
%%html
<h1>Hello HTML</h1>

# LaTeX
%%latex
$$ E = mc^2 $$

# JavaScript
%%javascript
console.log("Hello from JS")
```

### Useful Magic Commands

```python
# List all magics
%lsmagic

# Get help
%quickref
%magic

# Environment variables
%env

# Change directory
%cd /path/to/dir

# Bookmark directory
%bookmark project_dir

# History
%history

# Paste code
%paste  # From clipboard
%cpaste  # Enter code manually

# Debug
%debug  # After error
%pdb    # Automatic debugger

# Profiling
%prun expensive_function()

# Memory profiling (requires memory_profiler)
%load_ext memory_profiler
%memit np.random.rand(1000, 1000)

# Line profiler (requires line_profiler)
%load_ext line_profiler
%lprun -f function_name function_name(args)
```

---

## Best Practices

### 1. Clear Cell Outputs Before Committing

```bash
# Install nbstripout
pip install nbstripout

# Setup for git repo
nbstripout --install

# Now notebooks are auto-stripped on commit
```

### 2. Keep Cells Small and Focused

```python
# ✅ Good: One logical operation per cell
# CELL 1: Load data
df = pd.read_csv('data.csv')

# CELL 2: Check shape
print(f"Shape: {df.shape}")

# CELL 3: Show head
df.head()

# ❌ Bad: Everything in one cell
df = pd.read_csv('data.csv')
print(f"Shape: {df.shape}")
df.head()
df.describe()
# ... 100 more lines
```

### 3. Use Markdown for Documentation

```markdown
# Analysis Section

## Data Loading

We load the dataset using pandas. Expected format:
- CSV with header
- Columns: id, feature1, feature2, target
- No missing values in target

The data comes from [source](link).
```

### 4. Restart and Run All

```python
# Before sharing, always:
# 1. Kernel > Restart & Clear Output
# 2. Cell > Run All
# 3. Check for errors
```

### 5. Avoid Hidden State

```python
# ❌ Bad: Cells depend on execution order
# Cell 1:
x = 10

# Cell 2 (run first accidentally):
y = x + 5  # NameError if Cell 1 not run!

# ✅ Good: Each cell is self-contained or explicit
# Cell 1: Constants
X_INITIAL = 10

# Cell 2: Computation
y = X_INITIAL + 5
```

### 6. Extract Reusable Code

```python
# ❌ Bad: Copy-paste in notebooks
# Notebook 1:
def preprocess(df):
    # 50 lines of preprocessing
    pass

# Notebook 2:
def preprocess(df):
    # Same 50 lines copied!
    pass

# ✅ Good: Create module
# src/preprocessing.py
def preprocess(df):
    # 50 lines of preprocessing
    pass

# Notebooks:
from src.preprocessing import preprocess
df_clean = preprocess(df_raw)
```

### 7. Version Control

```python
# Good .gitignore for notebooks
.ipynb_checkpoints/
*/.ipynb_checkpoints/*
*.ipynb_checkpoints

# Better: Use nbdime for notebook diffs
pip install nbdime
nbdime config-git --enable --global

# Or Jupytext for text-based notebooks
pip install jupytext
jupytext --set-formats ipynb,py notebook.ipynb
```

### 8. Clear Output for Large Datasets

```python
# Limit output
pd.set_option('display.max_rows', 100)
pd.set_option('display.max_columns', 20)

# For plots
plt.close('all')  # Close figures after display

# Clear output programmatically
from IPython.display import clear_output
clear_output(wait=True)
```

---

## From Notebook to Production

### Convert Notebook to Script

```bash
# Convert to Python script
jupyter nbconvert --to script notebook.ipynb

# Convert to HTML
jupyter nbconvert --to html notebook.ipynb

# Convert to PDF
jupyter nbconvert --to pdf notebook.ipynb
```

### Extract Functions

```python
# In notebook:
def preprocess_data(df):
    """Preprocess dataframe"""
    df = df.copy()
    df = df.dropna()
    df['feature'] = df['feature'].apply(transform)
    return df

def train_model(X, y):
    """Train and return model"""
    model = RandomForestClassifier()
    model.fit(X, y)
    return model

# Save to module:
# src/pipeline.py
"""Machine learning pipeline"""

def preprocess_data(df):
    """Preprocess dataframe"""
    df = df.copy()
    df = df.dropna()
    df['feature'] = df['feature'].apply(transform)
    return df

def train_model(X, y):
    """Train and return model"""
    from sklearn.ensemble import RandomForestClassifier
    model = RandomForestClassifier()
    model.fit(X, y)
    return model

# In new notebook:
from src.pipeline import preprocess_data, train_model
df_clean = preprocess_data(df_raw)
model = train_model(X, y)
```

### Papermill for Parameterized Notebooks

```python
# Install
pip install papermill

# Create parameterized notebook
# notebook.ipynb - Cell tagged as "parameters":
# Parameters
data_path = "data/default.csv"
model_type = "random_forest"
n_estimators = 100

# Execute with different parameters
import papermill as pm
pm.execute_notebook(
    'notebook.ipynb',
    'output.ipynb',
    parameters=dict(
        data_path='data/experiment1.csv',
        model_type='gradient_boosting',
        n_estimators=200
    )
)
```

---

## Practice Exercises

### Exercise 1: Clean Notebook
```python
# Take a messy notebook and:
# 1. Add markdown documentation
# 2. Organize cells logically
# 3. Extract reusable functions
# 4. Add table of contents
# 5. Restart and Run All
```

### Exercise 2: Notebook to Module
```python
# Convert exploration notebook to:
# 1. Python module (functions)
# 2. Unit tests
# 3. Command-line script
```

### Exercise 3: Automated Reports
```python
# Use papermill to:
# 1. Parameterize notebook
# 2. Run with multiple parameters
# 3. Generate HTML reports
```

---

## Key Takeaways

1. **Notebooks**: Great for exploration
2. **Scripts**: Better for production
3. **Small cells**: One task each
4. **Document**: Use markdown
5. **Restart & Run All**: Test execution
6. **Extract code**: Reusable modules
7. **Version control**: Strip outputs
8. **Magic commands**: Productivity boost

---

## 🔗 Navigation

- **Previous**: [02 - Virtual Environments](./02-Virtual-Environments.md)
- **Next**: [04 - Debugging Techniques](./04-Debugging-Techniques.md)
- **Up**: [2.5 Best Practices](./README.md)
