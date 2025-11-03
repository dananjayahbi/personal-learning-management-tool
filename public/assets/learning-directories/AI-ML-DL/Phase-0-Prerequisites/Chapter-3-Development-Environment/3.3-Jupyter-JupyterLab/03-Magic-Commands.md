# 03 - Magic Commands

## 📋 Introduction

Magic commands are special commands in Jupyter that provide enhanced functionality beyond standard Python. They start with `%` (line magics) or `%%` (cell magics) and are essential for efficient notebook workflows, especially in ML/data science.

**Why Magic Commands?**
- ✅ Timing and profiling code
- ✅ Debugging capabilities  
- ✅ System command integration
- ✅ Environment management
- ✅ Matplotlib configuration
- ✅ Loading external code
- ✅ ML workflow optimization

---

## 🎯 Types of Magic Commands

### Line Magics (%)

Apply to a single line:
```python
%timeit sum(range(1000))
```

### Cell Magics (%%)

Apply to entire cell:
```python
%%timeit
x = 0
for i in range(1000):
    x += i
```

### List All Magics

```python
%lsmagic

# Output shows:
# Available line magics:
# %alias, %cd, %debug, %env, %load, %run, %time, %timeit...
#
# Available cell magics:
# %%bash, %%html, %%python, %%time, %%timeit...
```

### Get Help

```python
# Help on specific magic
%timeit?

# Detailed help
%magic
```

---

## ⏱️ Timing and Profiling

### %time - Single Execution Time

```python
# Time single execution
%time sum(range(1000000))

# Output:
# CPU times: user 25.3 ms, sys: 1.2 ms, total: 26.5 ms
# Wall time: 26.8 ms
```

```python
# Cell magic version
%%time
result = 0
for i in range(1000000):
    result += i
print(result)
```

**When to use:** Quick timing of single operations

### %timeit - Multiple Executions (Statistical)

```python
# Automatically runs multiple times for accurate timing
%timeit sum(range(1000))

# Output: 8.21 µs ± 45.3 ns per loop (mean ± std. dev. of 7 runs, 100,000 loops each)
```

```python
# Cell magic - times entire cell
%%timeit
total = 0
for i in range(1000):
    total += i
```

**Options:**
```python
# Specify number of runs and loops
%timeit -n 1000 -r 7 sum(range(1000))
# -n 1000: 1000 loops per run
# -r 7: 7 runs

# Quiet mode (return value only)
%timeit -q sum(range(1000))

# Store result in variable
time_result = %timeit -o sum(range(1000))
print(f"Best time: {time_result.best}")
```

**ML Example:**
```python
import numpy as np

# Compare list vs numpy
%timeit sum([i**2 for i in range(1000)])
# 267 µs ± 3.12 µs

%timeit np.sum(np.arange(1000)**2)
# 7.65 µs ± 89.7 ns
```

### %prun - Profiler

Profile function calls:

```python
def calculate_statistics(data):
    mean = sum(data) / len(data)
    variance = sum((x - mean) ** 2 for x in data) / len(data)
    return mean, variance

data = list(range(10000))
%prun calculate_statistics(data)
```

**Output:**
```
4 function calls in 0.003 seconds

Ordered by: internal time

ncalls  tottime  percall  cumtime  percall filename:lineno(function)
1    0.002    0.002    0.003    0.003 <ipython>:1(calculate_statistics)
1    0.001    0.001    0.001    0.001 {built-in method builtins.sum}
1    0.000    0.000    0.003    0.003 {built-in method builtins.exec}
1    0.000    0.000    0.000    0.000 {built-in method builtins.len}
```

**ML Example:**
```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=1000, n_features=20)
model = RandomForestClassifier()

%prun model.fit(X, y)
# Shows which functions take most time during training
```

### %%prun - Profile Cell

```python
%%prun
import numpy as np
data = np.random.randn(10000)
mean = data.mean()
std = data.std()
normalized = (data - mean) / std
```

### %lprun - Line Profiler (Requires installation)

```bash
pip install line_profiler
```

```python
%load_ext line_profiler

def train_model(X, y):
    model = RandomForestClassifier()
    model.fit(X, y)
    predictions = model.predict(X)
    return predictions

%lprun -f train_model train_model(X, y)
```

**Output shows time per line:**
```
Line #      Hits         Time  Per Hit   % Time  Line Contents
==============================================================
     1                                           def train_model(X, y):
     2         1     150000.0 150000.0     45.0      model = RandomForestClassifier()
     3         1     180000.0 180000.0     54.0      model.fit(X, y)
     4         1       3000.0   3000.0      1.0      predictions = model.predict(X)
     5         1          0.0      0.0      0.0      return predictions
```

---

## 🐛 Debugging

### %debug - Post-Mortem Debugging

```python
def divide(x, y):
    return x / y

result = divide(10, 0)  # Raises ZeroDivisionError

# After error, run:
%debug

# Interactive debugger opens:
# ipdb> p x          # Print x: 10
# ipdb> p y          # Print y: 0
# ipdb> up           # Move up call stack
# ipdb> down         # Move down call stack
# ipdb> list         # Show source code
# ipdb> quit         # Exit debugger
```

### %pdb - Automatic Debugger

```python
# Enable automatic debugging
%pdb on

# Now any exception automatically enters debugger
def buggy_function():
    x = [1, 2, 3]
    return x[10]  # IndexError - automatically enters debugger

buggy_function()

# Disable
%pdb off
```

### Debugger Commands

```python
# Common ipdb commands:
# n (next): Execute next line
# s (step): Step into function
# c (continue): Continue execution
# p variable: Print variable
# pp variable: Pretty print variable
# l (list): Show code context
# w (where): Show stack trace
# u (up): Move up stack
# d (down): Move down stack
# q (quit): Exit debugger
# h (help): Show help
```

---

## 📂 Loading and Running Code

### %load - Load External File

```python
# Load Python file into cell
%load script.py

# After running, cell contents become:
# # %load script.py
# <contents of script.py>
```

### %run - Execute External Script

```python
# Run Python script
%run script.py

# With arguments
%run script.py --arg1 value1 --arg2 value2

# With profiling
%run -p script.py

# With debugger
%run -d script.py

# Time execution
%run -t script.py
```

**ML Example:**
```python
# train.py contains training code
%run train.py --epochs 10 --lr 0.001

# Variables from script.py are now available
print(model)  # If defined in script
```

### %pycat - Display File Contents

```python
# Show file with syntax highlighting
%pycat script.py

# No execution, just display
```

---

## 💻 System Commands

### ! - Run Shell Commands

```python
# List files
!ls -la

# Windows
!dir

# Check Python version
!python --version

# Install package
!pip install pandas

# Git commands
!git status
!git add .
!git commit -m "Update notebook"

# Check GPU
!nvidia-smi

# Disk usage
!df -h

# Memory usage
!free -m
```

### !! - Capture Output

```python
# Capture command output
files = !ls *.ipynb
print(files)
# ['notebook1.ipynb', 'notebook2.ipynb']

# Use in Python
for file in files:
    print(f"Processing {file}")
```

### %system or %sx

```python
# Alternative to !
files = %system ls *.py
# or
files = %sx ls *.py
```

---

## 🌐 Environment Management

### %env - Environment Variables

```python
# List all environment variables
%env

# Get specific variable
%env PATH

# Set variable
%env MY_VAR=value

# Use in Python
import os
print(os.environ['MY_VAR'])
```

**ML Example:**
```python
# Set CUDA device
%env CUDA_VISIBLE_DEVICES=0

# Set TensorFlow logging
%env TF_CPP_MIN_LOG_LEVEL=2

# API keys (not recommended for security)
%env API_KEY=your_key_here
```

### %pwd - Print Working Directory

```python
%pwd
# Output: '/home/user/notebooks'
```

### %cd - Change Directory

```python
# Change directory
%cd /path/to/directory

# Go back
%cd ..

# Go home
%cd ~

# Store current directory
%cd -
```

### %bookmark - Directory Bookmarks

```python
# Create bookmark
%bookmark data /path/to/data/directory

# Use bookmark
%cd data

# List bookmarks
%bookmark -l

# Delete bookmark
%bookmark -d data
```

---

## 📊 matplotlib Integration

### %matplotlib - Configure Backend

```python
# Inline plots (most common)
%matplotlib inline

# Interactive plots
%matplotlib notebook

# For JupyterLab
%matplotlib widget

# High-resolution plots
%config InlineBackend.figure_format = 'retina'
```

**Example:**
```python
%matplotlib inline
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
plt.plot(x, np.sin(x))
plt.title("Sine Wave")
plt.show()
```

### Plot Configuration

```python
# Set default figure size
%config InlineBackend.figure_format = 'svg'
%config InlineBackend.rc = {'figure.figsize': (10, 6)}

# High DPI for retina displays
%config InlineBackend.figure_format = 'retina'
```

---

## 🎨 Cell Magic for Other Languages

### %%html - Render HTML

```python
%%html
<div style="background-color: lightblue; padding: 20px;">
    <h2>Custom HTML</h2>
    <p>This is rendered HTML</p>
</div>
```

### %%javascript - Run JavaScript

```python
%%javascript
alert('Hello from JavaScript!');
console.log('Logging to browser console');
```

### %%bash - Run Bash Script

```python
%%bash
echo "Running bash script"
for i in {1..5}; do
    echo "Count: $i"
done
```

### %%python - Run Python (Different Version)

```python
%%python3
print("Running with Python 3")
```

### %%writefile - Write to File

```python
%%writefile config.py
# Configuration file
API_URL = "https://api.example.com"
API_KEY = "your_key_here"
BATCH_SIZE = 32
LEARNING_RATE = 0.001
```

### %%capture - Suppress Output

```python
%%capture output
# This cell's output is captured, not displayed
import warnings
warnings.warn("This warning is captured")
print("This is also captured")

# Access captured output
output.stdout  # Captured stdout
output.stderr  # Captured stderr
output.show()  # Display captured output
```

---

## 🔧 Advanced Magic Commands

### %who - List Variables

```python
x = 10
y = 20
name = "test"

%who
# Output: name    x    y

%who int
# Output: x    y

%who str
# Output: name
```

### %whos - Detailed Variable Info

```python
%whos

# Output:
# Variable   Type     Data/Info
# -------------------------------
# name       str      test
# x          int      10
# y          int      20
```

### %reset - Clear Variables

```python
%reset
# Confirm: y/n

%reset -f  # Force, no confirmation

%reset_selective x  # Remove only 'x'
```

### %history - View Command History

```python
# Show last 10 commands
%history -n 1-10

# Show all history
%history

# Search history
%history -g "import"

# Save history to file
%history -f history.py
```

### %edit - Open Editor

```python
# Edit in external editor
%edit script.py

# Edit previous cell
%edit -p

# Edit specific input
%edit In[5]
```

---

## 🎯 ML-Specific Examples

### Example 1: Timing Model Training

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=1000, n_features=20)

# Compare different models
%timeit RandomForestClassifier(n_estimators=10).fit(X, y)
%timeit RandomForestClassifier(n_estimators=100).fit(X, y)
```

### Example 2: Profiling Data Processing

```python
%%time
import pandas as pd
import numpy as np

# Load data
df = pd.read_csv('large_dataset.csv')

# Process
df['normalized'] = (df['value'] - df['value'].mean()) / df['value'].std()
df['log_value'] = np.log(df['value'] + 1)
```

### Example 3: Debugging Training Loop

```python
%pdb on

def train_epoch(model, data_loader):
    for batch in data_loader:
        loss = model.train_step(batch)
        # If error occurs, debugger opens automatically
    return loss

train_epoch(model, loader)
```

### Example 4: GPU Monitoring

```python
# Check GPU before training
!nvidia-smi

# Train model
model.fit(X_train, y_train)

# Check GPU after training
!nvidia-smi
```

### Example 5: Environment Setup for TensorFlow

```python
# Set GPU device
%env CUDA_VISIBLE_DEVICES=0

# Set memory growth
%env TF_FORCE_GPU_ALLOW_GROWTH=true

# Verify
import tensorflow as tf
print(tf.config.list_physical_devices('GPU'))
```

---

## 📝 Custom Magics

### Creating Custom Line Magic

```python
from IPython.core.magic import register_line_magic

@register_line_magic
def hello(line):
    return f"Hello {line}!"

%hello World
# Output: 'Hello World!'
```

### Creating Custom Cell Magic

```python
from IPython.core.magic import register_cell_magic

@register_cell_magic
def reverse(line, cell):
    return cell[::-1]

%%reverse
Hello World
This is a test
```

### ML Custom Magic Example

```python
from IPython.core.magic import register_line_magic
import time

@register_line_magic
def gpu_time(line):
    """Time execution on GPU"""
    import torch
    start = torch.cuda.Event(enable_timing=True)
    end = torch.cuda.Event(enable_timing=True)
    
    start.record()
    exec(line)
    end.record()
    
    torch.cuda.synchronize()
    return f"GPU time: {start.elapsed_time(end):.2f} ms"

%gpu_time model.forward(input_tensor)
```

---

## ✅ Magic Commands Cheat Sheet

### Essential for ML/Data Science

```python
# TIMING
%time expression              # Time single execution
%timeit expression            # Time multiple executions
%%time                        # Time entire cell
%%timeit                      # Time entire cell (multiple runs)

# PROFILING
%prun function()              # Profile function calls
%%prun                        # Profile cell
%lprun -f func func()         # Line-by-line profiling

# DEBUGGING
%debug                        # Post-mortem debugging
%pdb on/off                   # Auto-debugging

# FILE OPERATIONS
%load file.py                 # Load file into cell
%run file.py                  # Execute file
%%writefile file.py           # Write cell to file
%pycat file.py                # Display file with highlighting

# SYSTEM
!command                      # Run shell command
!!command                     # Capture command output
%env VAR=value                # Set environment variable

# MATPLOTLIB
%matplotlib inline            # Inline plots
%matplotlib notebook          # Interactive plots

# VARIABLES
%who                          # List variables
%whos                         # Detailed variable info
%reset                        # Clear variables

# DIRECTORY
%pwd                          # Print working directory
%cd path                      # Change directory
%bookmark name path           # Bookmark directory

# CELL MAGIC
%%html                        # Render HTML
%%bash                        # Run bash script
%%capture                     # Suppress output
%%javascript                  # Run JavaScript
```

---

## 🎓 Exercises

### Exercise 1: Timing Comparison
Compare the speed of list comprehension vs numpy operations.

**Solution:**
```python
import numpy as np

%timeit [i**2 for i in range(1000)]
%timeit np.arange(1000)**2
```

### Exercise 2: Profiling
Profile a data processing function and identify bottlenecks.

**Solution:**
```python
def process_data(data):
    squared = [x**2 for x in data]
    cubed = [x**3 for x in data]
    return squared, cubed

%prun process_data(range(10000))
```

### Exercise 3: Debugging
Use %debug to fix a broken function.

**Solution:**
```python
def buggy_function(x, y):
    z = x / y
    return z * 2

buggy_function(10, 0)  # Error
%debug
# ipdb> p x, y
# ipdb> quit
```

---

## 🎯 Key Takeaways

1. ✅ **%timeit for performance** - Compare implementations
2. ✅ **%prun for profiling** - Find bottlenecks
3. ✅ **%debug for debugging** - Interactive error inspection
4. ✅ **! for system commands** - Shell integration
5. ✅ **%matplotlib inline** - Display plots
6. ✅ **%load and %run** - Code reuse
7. ✅ **Custom magics** - Extend functionality

---

## 🔗 Navigation

- **Up**: [3.3 Jupyter & JupyterLab Overview](./README.md)
- **Previous**: [01 - Jupyter Basics](./01-Jupyter-Basics.md)
- **Next**: [04 - Interactive Widgets](./04-Interactive-Widgets.md)

---

**Remember:** Magic commands are your superpowers in Jupyter. Master timing, profiling, and debugging magics for efficient ML workflows!
