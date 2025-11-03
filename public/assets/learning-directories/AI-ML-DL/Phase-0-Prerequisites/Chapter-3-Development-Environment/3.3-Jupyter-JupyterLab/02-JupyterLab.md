# 02 - JupyterLab: Modern Interface

## 📋 Introduction

JupyterLab is the next-generation web-based interface for Project Jupyter. It offers a flexible, powerful, and extensible environment for interactive computing, combining notebooks, code files, terminals, and more in a single interface.

**Why JupyterLab?**
- ✅ Multi-document interface (MDI)
- ✅ Integrated file browser
- ✅ Built-in terminal
- ✅ Rich extension ecosystem
- ✅ Drag-and-drop layout
- ✅ Real-time collaboration (with extensions)
- ✅ Better performance

**JupyterLab vs Classic Notebook:**
- JupyterLab = Full IDE-like experience
- Classic Notebook = Single notebook focus
- Both use same `.ipynb` format
- Both can coexist on same system

---

## 📦 Installation

### Using pip

```bash
# Install JupyterLab
pip install jupyterlab

# Install specific version
pip install jupyterlab==4.0.0

# Upgrade
pip install --upgrade jupyterlab
```

### Using conda

```bash
# Install JupyterLab
conda install -c conda-forge jupyterlab

# Create environment with JupyterLab
conda create -n ml-env python=3.11 jupyterlab numpy pandas
conda activate ml-env
```

### Check Installation

```bash
jupyter lab --version
# Output: 4.0.0
```

---

## 🚀 Starting JupyterLab

### Basic Start

```bash
# Start in current directory
jupyter lab

# Start in specific directory
jupyter lab /path/to/notebooks

# Specify port
jupyter lab --port=8889

# Open specific file
jupyter lab notebook.ipynb
```

### Advanced Options

```bash
# No browser (for remote servers)
jupyter lab --no-browser

# Specific IP address
jupyter lab --ip=0.0.0.0

# With password
jupyter lab --NotebookApp.token='mypassword'

# Without token (not recommended)
jupyter lab --NotebookApp.token='' --NotebookApp.password=''

# Specific config file
jupyter lab --config=/path/to/jupyter_config.py
```

### Configuration

```bash
# Generate config file
jupyter lab --generate-config

# Config file location: ~/.jupyter/jupyter_lab_config.py
```

**Common Configuration:**

```python
# ~/.jupyter/jupyter_lab_config.py

# Default directory
c.ServerApp.root_dir = '/path/to/notebooks'

# Default browser
c.ServerApp.browser = 'chrome'

# Port
c.ServerApp.port = 8888

# Auto-open browser
c.ServerApp.open_browser = True

# Token for security
c.ServerApp.token = 'your_secure_token'

# Password (hashed)
c.ServerApp.password = 'sha1:...'

# Allow remote access
c.ServerApp.allow_remote_access = True
c.ServerApp.ip = '0.0.0.0'
```

---

## 🖥️ Interface Overview

### Main Areas

```
┌─────────────────────────────────────────────────┐
│  Menu Bar                                        │
├──────────┬──────────────────────────────────────┤
│          │  Main Work Area                       │
│   File   │  ┌────────────┬────────────┐         │
│  Browser │  │ Notebook   │ Console    │         │
│          │  │            │            │         │
│          │  ├────────────┴────────────┤         │
│          │  │ Terminal               │         │
│  Running │  │                         │         │
│  Kernels │  └─────────────────────────┘         │
│          │                                      │
│   Tabs   │  Status Bar                          │
└──────────┴──────────────────────────────────────┘
```

### 1. Menu Bar
- File, Edit, View, Run, Kernel, Tabs, Settings, Help
- Context-aware (changes based on active document)

### 2. Left Sidebar
- File Browser
- Running Terminals and Kernels
- Git (with extension)
- Table of Contents
- Extension Manager
- Tab Manager

### 3. Main Work Area
- Multi-document interface
- Drag-and-drop panels
- Split horizontal/vertical
- Multiple notebooks simultaneously
- Code editors, terminals, consoles

### 4. Status Bar (Bottom)
- Kernel status
- Line/column number
- File path

---

## 📁 File Browser

### Navigation

```
Left Sidebar → File Browser Icon (📁)

Features:
- Browse directories
- Create files/folders
- Rename/delete files
- Upload files
- Download files
- Copy/paste files
```

### File Operations

**Create Files:**
```
Right-click in File Browser → New →
- Notebook
- Console
- Text File
- Markdown File
- Python File
- Folder
```

**Context Menu:**
- Open
- Rename
- Delete
- Duplicate
- Cut/Copy/Paste
- Download
- Open in New Browser Tab

### File Browser Shortcuts

```python
# Keyboard shortcuts in File Browser
Ctrl + Click  # Select multiple files
Shift + Click # Select range
Enter         # Open file
Delete        # Delete file
F2            # Rename file
Ctrl + C/V    # Copy/paste
```

---

## 🎨 Multi-Document Interface (MDI)

### Layouts

**Single View:**
```
One document fills the work area
```

**Horizontal Split:**
```
┌──────────────────┐
│   Notebook 1     │
├──────────────────┤
│   Notebook 2     │
└──────────────────┘
```

**Vertical Split:**
```
┌─────────┬─────────┐
│Notebook │Terminal │
│         │         │
└─────────┴─────────┘
```

**Complex Layout:**
```
┌──────────┬─────────┬──────┐
│          │ Console │      │
│ Notebook ├─────────┤ Text │
│          │Terminal │      │
└──────────┴─────────┴──────┘
```

### Creating Layouts

**Method 1: Drag and Drop**
1. Drag tab from tab bar
2. Hover over work area
3. Blue drop zones appear
4. Drop in desired position

**Method 2: Right-Click**
```
Right-click tab → New View for Notebook
Creates a synchronized view
```

**Method 3: Menu**
```
View → New View for Notebook
```

### Layout Management

```python
# Save layout
# File → Save Workspace

# Restore layout
# File → Restore Workspace

# Reset layout
# View → Single-Document Mode
```

---

## 💻 Terminals

### Opening Terminal

**Method 1:**
```
File → New → Terminal
```

**Method 2:**
```
Launcher → Terminal
```

**Method 3:**
```
Left Sidebar → File Browser → + → Terminal
```

### Terminal Features

```bash
# Full bash/zsh terminal
ls -la
cd projects
python script.py

# Git operations
git status
git add .
git commit -m "Update"

# Package installation
pip install package-name
conda install package-name

# Environment management
conda activate ml-env
source venv/bin/activate

# Run scripts
python train.py --epochs 10
```

### Multiple Terminals

```
Open multiple terminals simultaneously
Switch between terminals using tabs
Different environments in different terminals
```

### Terminal Shortcuts

```
Ctrl + C      # Interrupt
Ctrl + D      # Exit
Ctrl + L      # Clear
Ctrl + R      # Search history
Tab           # Autocomplete
```

---

## 🎮 Console

### What is Console?

Interactive Python REPL attached to a notebook kernel.

**Use Cases:**
- Test code snippets
- Debug notebook code
- Inspect variables
- Run experiments without modifying notebook

### Creating Console

**Method 1: New Console**
```
File → New → Console
Select kernel
```

**Method 2: From Notebook**
```
Right-click notebook tab → New Console for Notebook
Creates console sharing notebook's kernel
```

### Console Benefits

```python
# In notebook
x = 10
y = 20

# In console (same kernel)
print(x + y)  # 30
# Variables are shared!
```

**Workflow:**
1. Write code in notebook
2. Test variations in console
3. Debug interactively
4. Copy working code back to notebook

---

## 🔌 Extension System

### Extension Manager

```
Left Sidebar → Extension Manager (🧩)
```

**Warning:** As of JupyterLab 3.0+, extensions are now plugins installed via pip/conda, not the old extension manager.

### Installing Extensions

**Modern Method (JupyterLab 3+):**

```bash
# Install extension
pip install jupyterlab-git

# Build not required (auto-built)
```

**Legacy Method (JupyterLab 2):**

```bash
jupyter labextension install @extension-name
jupyter lab build
```

### Popular Extensions

#### 1. jupyterlab-git

Git integration:

```bash
pip install jupyterlab-git
```

Features:
- Git tab in sidebar
- Commit/push/pull UI
- Diff viewer
- Merge conflict resolver

#### 2. jupyterlab-lsp

Language Server Protocol:

```bash
pip install jupyterlab-lsp
pip install python-lsp-server
```

Features:
- Code completion
- Hover documentation
- Go to definition
- Find references
- Rename symbol

#### 3. jupyterlab-execute-time

Show cell execution time:

```bash
pip install jupyterlab-execute-time
```

#### 4. jupyterlab-code-formatter

Code formatting (black, autopep8):

```bash
pip install jupyterlab-code-formatter
pip install black isort
```

#### 5. jupyterlab-variableinspector

Variable explorer:

```bash
pip install lckr-jupyterlab-variableinspector
```

#### 6. jupyterlab-toc

Table of contents:

```bash
pip install jupyterlab-toc
```

(Built-in in JupyterLab 3+)

### Extension Configuration

```bash
# List installed extensions
jupyter labextension list

# Disable extension
jupyter labextension disable extension-name

# Enable extension
jupyter labextension enable extension-name

# Uninstall extension
pip uninstall extension-name
```

---

## 🎨 Themes and Customization

### Built-in Themes

```
Settings → Theme →
- JupyterLab Light
- JupyterLab Dark
```

### Custom Themes

Install theme extensions:

```bash
# Dark theme
pip install jupyterlab-night

# Material theme
pip install jupyterlab-theme-material-darker

# Dracula theme
pip install jupyterlab-theme-dracula
```

### Font and Editor Settings

```
Settings → Settings Editor → Text Editor

Options:
- Font Size
- Font Family
- Tab Size
- Line Numbers
- Matching Brackets
- Auto-Closing Brackets
- Rulers
```

### Keyboard Shortcuts

```
Settings → Keyboard Shortcuts

Customize shortcuts for:
- Run cell
- Insert cell
- Delete cell
- Move cell up/down
- Change cell type
```

---

## ⌨️ Keyboard Shortcuts

### Application Level

```python
Ctrl + B         # Toggle left sidebar
Ctrl + Shift + C # Open command palette
Ctrl + Shift + D # Toggle single-document mode
Ctrl + Shift + L # Toggle line numbers
```

### Notebook Shortcuts

```python
# Command Mode (blue)
A                # Insert cell above
B                # Insert cell below
D, D             # Delete cell
M                # To Markdown
Y                # To Code
Shift + M        # Merge selected cells

# Edit Mode (green)
Ctrl + ]         # Indent
Ctrl + [         # Dedent
Ctrl + /         # Comment/uncomment
Ctrl + Shift + - # Split cell at cursor
```

### Tab Management

```python
Ctrl + Shift + [  # Previous tab
Ctrl + Shift + ]  # Next tab
Ctrl + W          # Close tab
Ctrl + Shift + W  # Close all tabs
```

---

## 🧪 Advanced Features

### 1. Synchronized Views

```python
# Create synchronized view of notebook
Right-click notebook tab → New View for Notebook

# Use case:
# - View 1: Top of notebook (imports, setup)
# - View 2: Bottom of notebook (experiments)
# Both views share same kernel, edits sync
```

### 2. Cell Output Dragging

```python
# Drag cell output to new view
# Click and drag output area
# Creates independent output viewer
```

### 3. Code Console Attached to Notebook

```python
# Right-click notebook → New Console for Notebook
# Execute code in console with access to notebook variables
```

### 4. CSV/JSON Viewer

```python
# Double-click CSV file → Data grid viewer
# Features:
# - Search
# - Sort columns
# - Filter
# - Export
```

### 5. Real-time Collaboration (with extensions)

```bash
pip install jupyter-collaboration

# Multiple users can edit same notebook
# See cursors and selections of others
# Requires JupyterHub or similar setup
```

---

## 🚀 Productivity Tips

### 1. Command Palette

```
Ctrl + Shift + C (or Cmd + Shift + C on Mac)

Search for commands:
- "Run All"
- "Clear Outputs"
- "Restart Kernel"
- "Export Notebook"
```

### 2. Drag and Drop

```
- Drag files from desktop into file browser (upload)
- Drag tabs to rearrange
- Drag outputs to create viewers
- Drag cells between notebooks
```

### 3. Context Menus

```
Right-click:
- Notebook tabs (new view, new console)
- Cells (copy, paste, split)
- Sidebar items (actions)
```

### 4. Quick File Navigation

```
Ctrl + P (Cmd + P on Mac)
Quick file opener
Type filename to jump to file
```

### 5. Launcher

```
Ctrl + Shift + L (open launcher in new tab)

Quick access to:
- New notebook
- New console
- New terminal
- New text file
```

---

## 🔧 Configuration Examples

### Custom JupyterLab Settings

```json
// ~/.jupyter/lab/user-settings/@jupyterlab/notebook-extension/tracker.jupyterlab-settings

{
    "codeCellConfig": {
        "lineNumbers": true,
        "lineWrap": "on",
        "fontSize": 14,
        "fontFamily": "Monaco, monospace"
    },
    "defaultCell": "code",
    "kernelShutdown": false,
    "recordTiming": true
}
```

### Keyboard Shortcut Customization

```json
// ~/.jupyter/lab/user-settings/@jupyterlab/shortcuts-extension/shortcuts.jupyterlab-settings

{
    "shortcuts": [
        {
            "command": "notebook:run-cell-and-select-next",
            "keys": ["Ctrl Shift Enter"],
            "selector": ".jp-Notebook:focus"
        }
    ]
}
```

---

## 🎯 ML Workflow Example

### Typical Layout

```
┌──────────────────┬───────────────┬─────────────┐
│                  │               │             │
│   Main Notebook  │  Console      │ Terminal    │
│   (experiments)  │  (testing)    │ (training)  │
│                  │               │             │
├──────────────────┴───────────────┤             │
│   Data Viewer                    │             │
│   (CSV/DataFrame)                │             │
└──────────────────────────────────┴─────────────┘
```

### Workflow Steps

1. **File Browser**: Load data files
2. **Notebook**: Exploratory data analysis
3. **Console**: Test code snippets
4. **Terminal**: Run training scripts
5. **Data Viewer**: Inspect CSV results
6. **Git Extension**: Version control

### Example Session

```python
# Terminal
$ python train.py --config config.yaml

# Notebook
import pandas as pd
results = pd.read_csv('results/metrics.csv')

# Console (attached to notebook)
results.describe()
results.plot()

# Git Extension
# Commit: "Add training results"
```

---

## 📊 Comparison: Classic Notebook vs JupyterLab

| Feature                    | Classic Notebook | JupyterLab          |
| -------------------------- | ---------------- | ------------------- |
| Interface                  | Single notebook  | Multi-document IDE  |
| File browser               | Basic list       | Full tree browser   |
| Terminal                   | Separate         | Integrated          |
| Extensions                 | Limited          | Rich ecosystem      |
| Layout customization       | No               | Yes (drag & drop)   |
| Multiple notebooks         | Multiple tabs    | Split views         |
| Console                    | No               | Yes (per notebook)  |
| Git integration            | No               | Yes (with extension)|
| CSV viewer                 | Basic            | Advanced data grid  |
| Performance                | Good             | Better              |
| Learning curve             | Easy             | Moderate            |

**When to use Classic:**
- Simple, single-notebook work
- Teaching beginners
- Minimal setup needed

**When to use JupyterLab:**
- Complex projects
- Multiple files
- Advanced workflows
- IDE-like experience

---

## 🔄 Migrating from Classic Notebook

### 1. Install JupyterLab

```bash
pip install jupyterlab
```

### 2. Open Existing Notebooks

```bash
jupyter lab
# Navigate to .ipynb files
# Double-click to open
```

### 3. Keyboard Shortcuts

Most shortcuts are the same:
- `Shift + Enter`: Run cell
- `A/B`: Insert cell
- `M/Y`: Change cell type
- `D, D`: Delete cell

### 4. Extensions

Install JupyterLab equivalents:
```bash
# Classic: jupyter nbextension
# Lab: pip install jupyterlab-extension
```

### 5. Both Can Coexist

```bash
# Run both
jupyter notebook  # Classic on port 8888
jupyter lab       # Lab on port 8889
```

---

## 🎓 Exercises

### Exercise 1: Create Multi-Panel Layout
1. Open JupyterLab
2. Create new notebook
3. Create terminal (drag to right)
4. Create console for notebook (drag to bottom)
5. Open file browser on left

### Exercise 2: Install Git Extension
```bash
pip install jupyterlab-git
# Restart JupyterLab
# Use Git tab to manage repository
```

### Exercise 3: Custom Theme
```bash
pip install jupyterlab-theme-dracula
# Settings → Theme → Dracula
```

### Exercise 4: Keyboard Shortcut
1. Open Settings → Keyboard Shortcuts
2. Find "Run All Cells"
3. Add custom shortcut: `Ctrl + Shift + R`

---

## 🎯 Key Takeaways

1. ✅ **JupyterLab = Modern IDE** - Multi-document interface
2. ✅ **Flexible layouts** - Drag and drop panels
3. ✅ **Integrated terminal** - No need to switch windows
4. ✅ **Rich extensions** - Git, LSP, formatters
5. ✅ **Console + Notebook** - Test code without editing notebook
6. ✅ **Better file management** - Full browser with upload/download
7. ✅ **Backward compatible** - Works with all `.ipynb` files

---

## 🔗 Navigation

- **Up**: [3.3 Jupyter & JupyterLab Overview](./README.md)
- **Previous**: [01 - Jupyter Basics](./01-Jupyter-Basics.md)
- **Next**: [03 - Magic Commands](./03-Magic-Commands.md)

---

**Remember:** JupyterLab is your complete development environment. Master the multi-document interface, extensions, and layouts for maximum productivity!
