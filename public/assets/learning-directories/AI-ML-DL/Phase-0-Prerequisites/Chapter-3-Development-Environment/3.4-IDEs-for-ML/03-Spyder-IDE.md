# 03 - Spyder IDE

## 📋 Introduction

Spyder (Scientific Python Development Environment) is an open-source IDE designed specifically for scientific computing and data analysis. With its MATLAB-like interface, variable explorer, and integrated IPython console, Spyder is ideal for interactive data exploration and quick prototyping.

**Why Spyder for ML?**
- ✅ **MATLAB-like interface** - Familiar to MATLAB users
- ✅ **Variable Explorer** - Visual variable inspection
- ✅ **IPython console** - Interactive development
- ✅ **Plots pane** - Dedicated plot viewer
- ✅ **Included with Anaconda** - No separate install
- ✅ **Free and open-source**
- ✅ **Lightweight** - Fast startup
- ✅ **Perfect for beginners**

---

## 📦 Installation

### Via Anaconda (Recommended)

```bash
# Spyder comes pre-installed with Anaconda
# Just launch it:
spyder

# Or from Anaconda Navigator:
# Open Anaconda Navigator → Launch Spyder
```

### Standalone Installation

```bash
# Create dedicated environment (recommended)
conda create -n spyder-env spyder=5
conda activate spyder-env
spyder

# Or install in existing environment
conda install spyder

# Or via pip (not recommended, use conda)
pip install spyder

# Launch
spyder
```

### Platform-Specific

**Windows:**
```bash
# Via Anaconda (recommended)
# Or download standalone installer from:
# https://www.spyder-ide.org/

# Launch from Start Menu or:
spyder
```

**macOS:**
```bash
# Via Anaconda or:
brew install --cask anaconda
# Then launch Spyder from Applications

# Or standalone:
conda create -n spyder-env spyder
conda activate spyder-env
spyder
```

**Linux:**
```bash
# Via Anaconda package manager
conda install spyder

# Or system package manager (Ubuntu/Debian)
sudo apt install spyder3

# Launch
spyder
# or
spyder3
```

---

## 🎨 Interface Overview

### Main Components

```
┌────────────────────────────────────────────────────────────┐
│  File  Edit  Search  Source  Run  Debug  Tools  View  Help │
├────────────────────────────────────────────────────────────┤
│  📁 📄 💾 ▶️ 🐛 ⏹️                                         │ Toolbar
├───────────────────────┬────────────────────────────────────┤
│                       │                                    │
│  1  import pandas     │  Variable Explorer                 │
│  2  import numpy      │  ┌──────────────────────────────┐ │
│  3                    │  │Name │Type│Size │Value        │ │
│  4  df = pd.read_csv  │  ├─────┼────┼─────┼────────────┤ │
│  5  x = np.array      │  │df   │DF  │100x5│<DataFrame> │ │
│  6                    │  │x    │arr │(10,)│[1 2 3 ...] │ │
│                       │  │y    │int │     │42          │ │
│  Editor               │  └──────────────────────────────┘ │
│                       │                                    │
│                       │  Plots                             │
│                       │  ┌──────────────────────────────┐ │
│                       │  │                              │ │
│                       │  │     📊 [Plot Display]        │ │
│                       │  │                              │ │
│                       │  └──────────────────────────────┘ │
├───────────────────────┴────────────────────────────────────┤
│  IPython Console                                           │
│  In [1]: import pandas as pd                               │
│  In [2]: df.head()                                         │
│  Out[2]:                                                   │
│     name  age  city                                        │
│  0  Alice  25   NYC                                        │
│  1  Bob    30   SF                                         │
└────────────────────────────────────────────────────────────┘
```

### Panes

**1. Editor (Left)**
- Write and edit Python scripts
- Syntax highlighting
- Code completion
- Line numbers
- Code folding

**2. Variable Explorer (Top Right)**
- Lists all variables in namespace
- Shows type, size, value
- Double-click to view details
- Edit values directly
- View DataFrames as spreadsheets

**3. Plots (Middle Right)**
- Displays matplotlib plots
- Navigate between plots
- Zoom, pan, save
- Plot history

**4. Help/Files (Bottom Right)**
- Context-sensitive help
- File explorer
- Documentation browser

**5. IPython Console (Bottom)**
- Interactive Python shell
- Run code interactively
- Test functions quickly
- Access to all editor variables

---

## ⚙️ Configuration

### Preferences

**Access:**
```
Tools → Preferences (Ctrl+Alt+Shift+P on Windows/Linux)
```

### General Settings

```
Preferences → General → Appearance
├── Interface theme: Dark/Light
├── Syntax highlighting theme: Spyder/Monokai/Zenburn
├── Icon theme: Material Design
└── Font: JetBrains Mono, Size: 10
```

### Editor Settings

```
Preferences → Editor
├── Display
│   ├── Show line numbers: ✓
│   ├── Show blank spaces: ☐
│   ├── Show indent guides: ✓
│   └── Wrap lines: ☐
├── Code completion
│   ├── Automatic: ✓
│   ├── Automatic completion after: 2 characters
│   └── Show hints: ✓
└── Advanced
    ├── Automatic insertion of parentheses: ✓
    └── Automatic insertion of quotes: ✓
```

### IPython Console

```
Preferences → IPython console
├── Graphics
│   ├── Backend: Inline (for plots in console)
│   ├── Inline backend: Automatic
│   └── Resolution: 72 dpi
├── Startup
│   ├── Run file at startup: (optional)
│   └── Lines: import numpy as np
│           import pandas as pd
│           import matplotlib.pyplot as plt
└── Advanced
    ├── Greedy completer: ✓
    └── Autocall: Smart
```

---

## 🎯 Key Features

### Variable Explorer

**View Variables:**
```python
# Run in editor or console
import numpy as np
import pandas as pd

# Variables automatically appear in explorer
x = 10
y = [1, 2, 3, 4, 5]
arr = np.array([[1, 2], [3, 4]])
df = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})

# Variable Explorer shows:
# Name │ Type      │ Size  │ Value
# ─────┼───────────┼───────┼────────────
# x    │ int       │       │ 10
# y    │ list      │ 5     │ [1, 2, ...]
# arr  │ ndarray   │ 2x2   │ [[1 2]...]
# df   │ DataFrame │ 3x2   │ <DataFrame>
```

**DataFrame Viewer:**
```python
# Double-click 'df' in Variable Explorer
# Opens spreadsheet viewer:
# - Sort by column (click header)
# - Filter rows
# - View statistics
# - Export to CSV
# - Copy data

# Or programmatically:
df = pd.read_csv('large_dataset.csv')
# Double-click in Variable Explorer for visual inspection
```

**Array Viewer:**
```python
# Large numpy arrays
image = np.random.rand(1000, 1000, 3)

# Double-click in Variable Explorer
# Shows:
# - Array shape
# - Data type
# - Min/max values
# - Visual representation for 2D arrays
```

**Edit Variables:**
```python
# Right-click variable → Edit
# Modify value in place
# Useful for quick experiments

# Example: Change x from 10 to 20 interactively
```

### IPython Console

**Interactive Execution:**
```python
# Test functions immediately
In [1]: import pandas as pd

In [2]: df = pd.read_csv('data.csv')

In [3]: df.head()
Out[3]:
   col1  col2
0     1     4
1     2     5
2     3     6

In [4]: df.describe()
Out[4]:
            col1      col2
count   3.000000  3.000000
mean    2.000000  5.000000
...

# Variables from editor are accessible
In [5]: x  # Variable defined in editor script
Out[5]: 10
```

**Magic Commands:**
```python
# Timing
In [1]: %timeit sum(range(1000))
Out[1]: 24.3 µs ± 892 ns per loop

# Run external script
In [2]: %run script.py

# Load file into cell
In [3]: %load data_loader.py

# System commands
In [4]: !ls -la

# Change directory
In [5]: %cd /path/to/directory

# Environment variables
In [6]: %env CUDA_VISIBLE_DEVICES=0
```

**Console History:**
```python
# Navigate history: Up/Down arrows
# Search history: Ctrl+R
# Clear console: Ctrl+L

# Multi-line input
In [1]: for i in range(3):
   ...:     print(i)
   ...:
0
1
2
```

### Plots Pane

**Display Plots:**
```python
import matplotlib.pyplot as plt
import numpy as np

# Create plot
x = np.linspace(0, 10, 100)
plt.figure()
plt.plot(x, np.sin(x), label='sin(x)')
plt.plot(x, np.cos(x), label='cos(x)')
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.title('Trigonometric Functions')
plt.grid(True)
plt.show()

# Plot appears in Plots pane
```

**Plot Navigation:**
```
├── Previous/Next buttons: Navigate plot history
├── Zoom: Magnifying glass tool
├── Pan: Hand tool
├── Save: Export to PNG, PDF, SVG
└── Configure: Adjust subplot parameters
```

**Multiple Plots:**
```python
# Each plt.figure() creates new plot
plt.figure(1)
plt.plot(data1)

plt.figure(2)
plt.plot(data2)

# Navigate between plots using arrows in Plots pane
```

### Code Analysis

**Real-time Analysis:**
```python
# Warnings and errors appear as you type
def calculate_mean(data)  # Missing colon - red underline
    sum = 0  # Warning: shadows built-in
    for x in data:
        sum += x
    return sum / len(data)  # Warning: potential division by zero
```

**Analysis Options:**
```
Source → Run static code analysis (F8)

Checks:
├── PEP 8 style violations
├── Undefined names
├── Unused variables
├── Syntax errors
└── Complexity warnings
```

### Code Completion

```python
# Automatic completion as you type
import pandas as pd

df = pd.read_csv('data.csv')
df.  # Dropdown shows all DataFrame methods
# - head()
# - tail()
# - describe()
# - groupby()
# ...

# Function signatures
df.groupby(  # Shows: (by, axis=0, level=None, ...)
```

---

## 🐛 Debugging

### Set Breakpoints

```python
# Click left margin to set breakpoint
import pandas as pd

df = pd.read_csv('data.csv')
# ← Click here to set breakpoint (red dot appears)
df = df.dropna()
result = df.mean()
print(result)
```

### Debug Controls

```
Debug → Debug (F5)
├── Continue (F5)
├── Step (F6)
├── Step Into (F7)
├── Step Return (Shift+F7)
├── Stop (Ctrl+Shift+F5)
└── Debug Console
```

**Debug Panel:**
```
When paused at breakpoint:
├── Variables: Inspect current state
├── Stack: Call stack navigation
├── Breakpoints: Manage breakpoints
└── Console: Evaluate expressions
```

**Example Debug Session:**
```python
def train_model(data, epochs):
    # Set breakpoint here
    model = create_model()
    
    for epoch in range(epochs):
        # Set breakpoint here to inspect each iteration
        loss = model.train_step(data)
        print(f"Epoch {epoch}: {loss}")
    
    return model

# Run → Debug (F5)
# When paused:
# - Inspect 'model', 'epoch', 'loss' in Variables panel
# - Step through with F6
# - Evaluate expressions in Debug Console
```

---

## 📝 Working with Scripts

### Create New File

```
File → New File (Ctrl+N)
or
Click 📄 icon in toolbar
```

### Run Script

**Method 1: Run entire file**
```
Run → Run (F5)
or
Click ▶️ icon
```

**Method 2: Run selection**
```
Select code → Run → Run selection (F9)
or
Select code → Press F9

# Runs in IPython console
# Variables persist
```

**Method 3: Run cell**
```python
# Define cells with #%% or # %%
#%% Cell 1: Import libraries
import pandas as pd
import numpy as np

#%% Cell 2: Load data
df = pd.read_csv('data.csv')
print(df.shape)

#%% Cell 3: Analyze
print(df.describe())

# Run current cell: Ctrl+Enter
# Run cell and advance: Shift+Enter
```

### Run Configuration

```
Run → Configuration per file

Options:
├── Execute in current console
├── Execute in dedicated console
├── Execute in external system terminal
├── Command line arguments: --input data.csv
└── Working directory: /path/to/project
```

---

## 🔍 Projects and Files

### Project Explorer

```
Projects → New Project
├── Project name: ML-Analysis
├── Location: /path/to/project
└── Project type: Empty/Existing

Project structure:
my_project/
├── .spyproject/
│   └── config/
├── data/
├── notebooks/
├── src/
└── tests/
```

### File Explorer

```
View → Panes → File explorer

Features:
├── Browse directories
├── Open files
├── Create files/folders
├── Delete/rename
└── Search files
```

---

## ⌨️ Keyboard Shortcuts

### Essential Shortcuts

**File Operations:**
```
Ctrl+N              New file
Ctrl+O              Open file
Ctrl+S              Save
Ctrl+Shift+S        Save as
Ctrl+W              Close file
```

**Editing:**
```
Ctrl+X/C/V          Cut/Copy/Paste
Ctrl+Z/Y            Undo/Redo
Ctrl+A              Select all
Ctrl+F              Find
Ctrl+H              Replace
Ctrl+G              Go to line
Ctrl+/              Comment/uncomment
Tab/Shift+Tab       Indent/unindent
```

**Running:**
```
F5                  Run file
F9                  Run selection
Ctrl+Enter          Run cell
Shift+Enter         Run cell and advance
F10                 Run until first breakpoint
Ctrl+F5             Run in debugger
```

**Navigation:**
```
Ctrl+Tab            Switch files
Ctrl+P              File switcher
Ctrl+Shift+F        Find in files
Alt+Up/Down         Go to previous/next warning
```

**Console:**
```
Ctrl+Shift+C        Open console
Ctrl+Shift+I        Inspect current object
Ctrl+L              Clear console
Up/Down             History navigation
Tab                 Code completion
```

---

## 🎯 Use Cases

### 1. Interactive Data Exploration

```python
# Perfect workflow for EDA
import pandas as pd
import matplotlib.pyplot as plt

# Load data
df = pd.read_csv('customers.csv')

# Quick inspection in Variable Explorer
# Double-click 'df' to see full table

# Run interactively line by line (F9)
print(df.shape)  # F9
print(df.dtypes)  # F9
print(df.isnull().sum())  # F9

# Plots appear immediately
df['age'].hist()
plt.show()

df.boxplot(column='income', by='category')
plt.show()

# All variables accessible in console
In [1]: df.describe()
In [2]: df['age'].mean()
```

### 2. Quick Prototyping

```python
# Test ideas quickly
#%% Experiment 1: Linear Regression
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X, y)
score = model.score(X, y)
print(f"Score: {score}")  # Ctrl+Enter

#%% Experiment 2: Random Forest
from sklearn.ensemble import RandomForestRegressor
model = RandomForestRegressor()
model.fit(X, y)
score = model.score(X, y)
print(f"Score: {score}")  # Ctrl+Enter

# Compare scores easily
```

### 3. Teaching/Learning

```python
# Great for learning Python/ML
# Step through code line by line
# Inspect variables at each step
# See immediate results
# Experiment in console

# Example: Understanding list comprehension
numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]
# Inspect 'squared' in Variable Explorer: [1, 4, 9, 16, 25]

# Try variations in console:
In [1]: cubed = [x**3 for x in numbers]
In [2]: cubed
Out[2]: [1, 8, 27, 64, 125]
```

---

## 🆚 Spyder vs Other IDEs

### Spyder vs Jupyter

**Spyder:**
- Script-based development
- Persistent variable explorer
- Better for longer scripts
- All plots in one pane

**Jupyter:**
- Cell-based notebooks
- Inline outputs
- Better for sharing
- Mixed code and markdown

**When to use Spyder:**
- Developing reusable scripts
- Need persistent variable view
- MATLAB-like workflow
- Quick prototyping

### Spyder vs VS Code

**Spyder:**
- Scientific focus
- Built-in variable explorer
- Simpler interface
- MATLAB-like

**VS Code:**
- General purpose
- More extensions
- Better Git integration
- More customizable

### Spyder vs PyCharm

**Spyder:**
- Lighter weight
- Free
- Scientific focus
- Simpler

**PyCharm:**
- Professional features
- Advanced debugging
- Database tools
- Remote development

---

## 🎓 Exercises

### Exercise 1: Data Exploration
1. Open Spyder
2. Load iris dataset
3. Use Variable Explorer to inspect
4. Create plots in Plots pane
5. Calculate statistics in console

### Exercise 2: Interactive Development
1. Create script with cells (#%%)
2. Run cells individually
3. Modify variables in Variable Explorer
4. Re-run cells with new values
5. Export plots

### Exercise 3: Debugging
1. Create function with bug
2. Set breakpoints
3. Run in debugger
4. Inspect variables
5. Fix bug

---

## 🎯 Key Takeaways

1. ✅ **Perfect for beginners** - Simple, intuitive interface
2. ✅ **Variable Explorer** - Visual variable inspection
3. ✅ **IPython console** - Interactive development
4. ✅ **MATLAB-like** - Familiar to MATLAB users
5. ✅ **Included with Anaconda** - No extra installation
6. ✅ **Great for EDA** - Quick data exploration
7. ✅ **Cell-based execution** - Like notebooks in scripts

---

## 🔗 Navigation

- **Up**: [3.4 IDEs for ML Overview](./README.md)
- **Previous**: [02 - PyCharm Setup](./02-PyCharm-Setup.md)
- **Next**: [04 - Remote Development](./04-Remote-Development.md)

---

**Remember:** Spyder excels at interactive data exploration and quick prototyping. Its MATLAB-like interface makes it perfect for scientists transitioning to Python or anyone who wants immediate visual feedback while coding!
