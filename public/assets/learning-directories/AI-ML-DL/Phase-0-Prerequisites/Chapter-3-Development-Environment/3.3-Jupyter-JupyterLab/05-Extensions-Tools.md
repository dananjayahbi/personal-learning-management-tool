# 05 - Extensions and Tools

## 📋 Introduction

Jupyter extensions enhance functionality with features like code formatting, variable inspection, table of contents, Git integration, and more. This guide covers essential extensions for ML/data science workflows.

**Extension Types:**
- ✅ **JupyterLab Extensions** - Modern, plugin-based (JupyterLab 3+)
- ✅ **Notebook Extensions (nbextensions)** - Classic notebook (legacy)
- ✅ **Server Extensions** - Backend functionality
- ✅ **Kernel Extensions** - Kernel-level features

---

## 🔧 JupyterLab Extensions (Modern)

### Installation Methods

**JupyterLab 3+ (Recommended):**
```bash
# Extensions are now pip/conda packages
pip install extension-name

# No build step required!
# Restart JupyterLab to see changes
```

**JupyterLab 2 (Legacy):**
```bash
jupyter labextension install @extension-name
jupyter lab build
```

### Managing Extensions

```bash
# List installed extensions
jupyter labextension list

# Disable extension
jupyter labextension disable extension-name

# Enable extension
jupyter labextension enable extension-name

# Uninstall
pip uninstall extension-name
# or
jupyter labextension uninstall extension-name
```

---

## 🌟 Essential Extensions

### 1. jupyterlab-git

**Git integration in JupyterLab**

```bash
pip install jupyterlab-git
```

**Features:**
- Git tab in sidebar
- Visual diff viewer
- Commit interface
- Push/pull operations
- Branch management
- Merge conflict resolver

**Usage:**
1. Open Git tab in left sidebar (🔱 icon)
2. Stage files by clicking "+"
3. Enter commit message
4. Click "Commit"
5. Push/pull using buttons

**Screenshot Description:**
```
┌─────────────────┐
│  Git Tab        │
├─────────────────┤
│ Current Branch  │
│ [main] ▼        │
├─────────────────┤
│ Changed Files   │
│ ✓ notebook.ipynb│
│ + new_file.py   │
│ - deleted.txt   │
├─────────────────┤
│ Commit Message  │
│ [____________]  │
│ [Commit Button] │
│ [Push] [Pull]   │
└─────────────────┘
```

### 2. jupyterlab-lsp

**Language Server Protocol support**

```bash
pip install jupyterlab-lsp
pip install python-lsp-server
```

**Features:**
- Autocompletion (enhanced)
- Hover tooltips
- Go to definition
- Find references
- Rename symbol
- Signature help

**Usage:**
```python
# Hover over function for documentation
import numpy as np
np.array  # Hover shows docstring

# Ctrl+Click to go to definition
def my_function():
    pass

my_function()  # Ctrl+Click jumps to definition
```

**Configuration:**
```json
// Settings → Advanced Settings Editor → Language Servers

{
    "language_servers": {
        "pylsp": {
            "serverSettings": {
                "pylsp.plugins.pycodestyle.enabled": false,
                "pylsp.plugins.flake8.enabled": true,
                "pylsp.plugins.black.enabled": true
            }
        }
    }
}
```

### 3. jupyterlab-code-formatter

**Code formatting (Black, autopep8, isort)**

```bash
pip install jupyterlab-code-formatter
pip install black isort
```

**Features:**
- Format code cells
- Format entire notebook
- Auto-format on save
- Multiple formatters

**Usage:**
```python
# Before formatting
def messy_function(x,y,z):
    return x+y+z

# Right-click cell → Format Cell
# or Keyboard shortcut: Ctrl+Shift+F

# After formatting
def messy_function(x, y, z):
    return x + y + z
```

**Configuration:**
```json
// Settings → Code Formatter

{
    "formatOnSave": true,
    "preferences": {
        "default_formatter": {
            "python": "black"
        }
    },
    "black": {
        "line_length": 88
    }
}
```

### 4. jupyterlab-execute-time

**Show cell execution time**

```bash
pip install jupyterlab-execute-time
```

**Features:**
- Execution time display
- Timestamp display
- Configurable format

**Display:**
```
[1]: import time
     time.sleep(2)
     
Last executed: 2024-01-15 10:30:45
Execution time: 2.01s
```

### 5. jupyterlab-spreadsheet

**Excel file viewer**

```bash
pip install jupyterlab-spreadsheet-editor
```

**Features:**
- View Excel files (.xlsx, .xls)
- Edit cells
- Sort/filter data
- Export to CSV

**Usage:**
- Double-click .xlsx file in file browser
- Opens in spreadsheet viewer

### 6. jupyterlab-toc

**Table of Contents (Built-in JupyterLab 3+)**

**Features:**
- Auto-generate TOC from headings
- Jump to sections
- Collapsible structure
- Markdown and code notebook support

**Usage:**
1. Click TOC icon in left sidebar
2. Navigates to headings in notebook
3. Click heading to jump to section

**Example TOC:**
```
📄 My Notebook
├─ 1. Introduction
├─ 2. Data Loading
│  ├─ 2.1 Import Libraries
│  └─ 2.2 Load Dataset
├─ 3. Preprocessing
└─ 4. Model Training
```

### 7. Variable Inspector (lckr-jupyterlab-variableinspector)

**Variable explorer window**

```bash
pip install lckr-jupyterlab-variableinspector
```

**Features:**
- List all variables
- Show types and values
- Update in real-time
- Delete variables

**Display:**
```
┌────────────────────────────────┐
│ Variable Inspector             │
├──────────┬──────┬──────────────┤
│ Name     │ Type │ Value        │
├──────────┼──────┼──────────────┤
│ x        │ int  │ 10           │
│ y        │ str  │ 'hello'      │
│ df       │ DF   │ (100, 5)     │
│ model    │ RF   │ <object>     │
└──────────┴──────┴──────────────┘
```

### 8. jupyterlab-drawio

**Diagram editor**

```bash
pip install jupyterlab-drawio
```

**Features:**
- Create flowcharts
- Architecture diagrams
- UML diagrams
- Embed in notebooks

**Usage:**
- File → New → Diagram
- Draw architecture diagrams
- Save as .dio file
- Export to PNG/SVG

### 9. jupyterlab-system-monitor

**System resource monitoring**

```bash
pip install jupyterlab-system-monitor
```

**Features:**
- CPU usage
- Memory usage
- Network activity
- Display in status bar

**Display:**
```
Status Bar: CPU: 45% | RAM: 8.2/16 GB | ↓ 1.2 MB/s
```

### 10. jupyterlab-github

**GitHub integration**

```bash
pip install jupyterlab-github
```

**Features:**
- Browse GitHub repos
- Open notebooks from GitHub
- View files without cloning

**Usage:**
```
File → Open from GitHub
Enter: username/repo-name
Browse and open files
```

---

## 📦 Classic Notebook Extensions (nbextensions)

### Installation

```bash
# Install nbextensions
pip install jupyter_contrib_nbextensions
jupyter contrib nbextension install --user

# Enable configurator
pip install jupyter_nbextensions_configurator
jupyter nbextensions_configurator enable --user
```

### Access Configurator

```
1. Start Jupyter Notebook (not Lab)
2. Navigate to: http://localhost:8888/nbextensions
3. Enable/disable extensions with checkboxes
```

### Popular nbextensions

#### 1. ExecuteTime
Shows execution time for each cell

#### 2. Collapsible Headings
Collapse sections under headings

#### 3. Code Folding
Fold code blocks

#### 4. Autopep8
Format code with autopep8

#### 5. Variable Inspector
Floating variable inspector window

#### 6. Snippets
Insert code snippets

#### 7. Hinterland
Autocompletion without Tab

#### 8. Codefolding in Editor
Fold functions/classes

#### 9. Toggle all line numbers
Show/hide line numbers

#### 10. Scratchpad
Temporary code execution area

---

## 🎯 ML-Specific Extensions

### 1. tensorboard-extension

**TensorBoard integration**

```bash
pip install jupyter-tensorboard
```

**Usage:**
```python
%load_ext tensorboard
%tensorboard --logdir ./logs
```

### 2. ipywidgets

**Interactive widgets (covered in previous section)**

```bash
pip install ipywidgets
```

### 3. jupyterlab-nvidia

**NVIDIA GPU monitoring**

```bash
pip install jupyterlab_nvidia_nvdashboard
```

**Features:**
- GPU utilization
- Memory usage
- Temperature
- Real-time graphs

### 4. jupyter-matplotlib

**Interactive matplotlib**

```bash
pip install ipympl
```

**Usage:**
```python
%matplotlib widget
import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [1, 4, 9])
plt.show()

# Interactive: zoom, pan, save
```

### 5. jupyterlab-jupytext

**Notebooks as Python scripts**

```bash
pip install jupyterlab-jupytext
```

**Features:**
- Save notebooks as .py files
- Version control friendly
- Sync between .ipynb and .py

**Usage:**
```
Right-click notebook → Jupytext → Pair Notebook with Python file
Creates notebook.py alongside notebook.ipynb
Both stay in sync
```

---

## 🛠️ Development Tools

### 1. jupyterlab-debugger

**Visual debugger (built-in JupyterLab 3+)**

**Features:**
- Breakpoints
- Step through code
- Inspect variables
- Call stack

**Usage:**
```python
# Click left margin to set breakpoint
def my_function(x):
    y = x * 2  # ← Breakpoint here
    return y + 1

my_function(5)
```

### 2. jupyterlab-vim

**Vim keybindings**

```bash
pip install jupyterlab-vim
```

**Features:**
- Vi/Vim keybindings
- Normal/Insert modes
- Vim commands

### 3. jupyterlab-intellicode

**AI-assisted code completion**

```bash
pip install jupyterlab-intellicode
```

**Features:**
- AI suggestions
- Context-aware completion
- Pattern learning

### 4. jupyterlab-sql

**SQL cell magic**

```bash
pip install jupyterlab-sql
```

**Usage:**
```python
%load_ext sql
%sql SELECT * FROM table LIMIT 10
```

---

## 📊 Visualization Extensions

### 1. plotly-extension

**Interactive Plotly charts**

```bash
pip install jupyterlab-plotly
```

### 2. ipyleaflet

**Interactive maps**

```bash
pip install ipyleaflet
```

**Usage:**
```python
from ipyleaflet import Map, Marker

m = Map(center=(51.505, -0.09), zoom=13)
marker = Marker(location=(51.5, -0.09))
m.add_layer(marker)
m
```

### 3. ipyvolume

**3D visualization**

```bash
pip install ipyvolume
```

**Usage:**
```python
import ipyvolume as ipv
import numpy as np

x, y, z = np.random.random((3, 1000))
ipv.quickscatter(x, y, z, size=1, marker='sphere')
ipv.show()
```

### 4. bqplot

**Grammar of graphics**

```bash
pip install bqplot
```

**Usage:**
```python
import bqplot.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(title='Sine Wave')
plt.plot(x, y)
plt.show()
```

---

## ⚙️ Configuration and Customization

### JupyterLab Settings

```bash
# Settings directory
~/.jupyter/lab/user-settings/

# Settings files (JSON)
@jupyterlab/notebook-extension/tracker.jupyterlab-settings
@jupyterlab/shortcuts-extension/shortcuts.jupyterlab-settings
@jupyterlab/codemirror-extension/commands.jupyterlab-settings
```

### Example: Auto-save Configuration

```json
// @jupyterlab/docmanager-extension/plugin.jupyterlab-settings

{
    "autosave": true,
    "autosaveInterval": 120  // seconds
}
```

### Example: Theme Configuration

```json
// @jupyterlab/apputils-extension/themes.jupyterlab-settings

{
    "theme": "JupyterLab Dark",
    "theme-scrollbars": true
}
```

### Example: Code Cell Configuration

```json
// @jupyterlab/notebook-extension/tracker.jupyterlab-settings

{
    "codeCellConfig": {
        "lineNumbers": true,
        "lineWrap": "on",
        "fontSize": 14,
        "fontFamily": "Fira Code, monospace",
        "rulers": [80, 120]
    }
}
```

---

## 🎓 Creating Custom Extensions

### Simple Extension Example

```bash
# Create extension from template
pip install cookiecutter
cookiecutter https://github.com/jupyterlab/extension-cookiecutter-ts

# Develop extension
cd my-extension
pip install -e .
jupyter labextension develop . --overwrite

# Build
jlpm run build

# Watch mode (auto-rebuild)
jlpm run watch
```

### Extension Structure

```
my-extension/
├── src/
│   └── index.ts          # Main extension code
├── style/
│   └── index.css         # Styles
├── package.json          # Package metadata
├── tsconfig.json         # TypeScript config
└── README.md
```

### Simple Extension Code

```typescript
// src/index.ts

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

const extension: JupyterFrontEndPlugin<void> = {
  id: 'my-extension',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('My extension activated!');
    
    // Add command
    app.commands.addCommand('my-extension:hello', {
      label: 'Say Hello',
      execute: () => {
        console.log('Hello from my extension!');
      }
    });
  }
};

export default extension;
```

---

## 🎯 Extension Recommendations by Use Case

### For Data Science
```bash
pip install jupyterlab-git
pip install jupyterlab-lsp python-lsp-server
pip install lckr-jupyterlab-variableinspector
pip install jupyterlab-execute-time
pip install ipywidgets
```

### For Machine Learning
```bash
pip install jupyterlab-git
pip install jupyterlab-code-formatter black
pip install jupyter-tensorboard
pip install jupyterlab_nvidia_nvdashboard  # For GPU
pip install jupyterlab-execute-time
```

### For Development
```bash
pip install jupyterlab-git
pip install jupyterlab-lsp python-lsp-server
pip install jupyterlab-code-formatter black isort
pip install jupyterlab-vim  # If you prefer Vim
```

### For Teaching/Presentations
```bash
pip install RISE  # Slideshow extension
pip install jupyterlab-drawio
pip install ipywidgets
```

---

## 🔧 Troubleshooting

### Extension Not Loading

```bash
# Rebuild JupyterLab
jupyter lab build --dev-build=False --minimize=False

# Clear cache
jupyter lab clean
jupyter lab build

# Check for errors
jupyter labextension list
```

### Compatibility Issues

```bash
# Check JupyterLab version
jupyter lab --version

# Check extension compatibility
pip show extension-name

# Downgrade/upgrade if needed
pip install jupyterlab==3.6.0
```

### Performance Issues

```bash
# Disable unused extensions
jupyter labextension disable extension-name

# Check resource usage
# Look for extensions in browser DevTools → Performance
```

---

## 📈 Performance Optimization

### 1. Disable Unused Extensions

```bash
jupyter labextension disable @extension-name
```

### 2. Use Production Build

```bash
jupyter lab build --dev-build=False --minimize=True
```

### 3. Clear Old Builds

```bash
jupyter lab clean
jupyter lab build
```

### 4. Limit Extension Count

Only install extensions you actively use.

---

## 🎓 Exercises

### Exercise 1: Install Essential Extensions
Install Git, LSP, and Code Formatter extensions.

**Solution:**
```bash
pip install jupyterlab-git
pip install jupyterlab-lsp python-lsp-server
pip install jupyterlab-code-formatter black
```

### Exercise 2: Configure Auto-formatting
Set up auto-format on save with Black.

**Solution:**
```
Settings → Code Formatter → Enable "formatOnSave"
Set default formatter to "black"
```

### Exercise 3: Create Simple Extension
Create extension that adds a custom command.

---

## 🎯 Key Takeaways

1. ✅ **JupyterLab 3+** - Extensions are pip packages
2. ✅ **Essential extensions** - Git, LSP, Code Formatter
3. ✅ **ML extensions** - TensorBoard, GPU monitor, widgets
4. ✅ **Variable Inspector** - Track variables in real-time
5. ✅ **Code formatting** - Black, autopep8, isort
6. ✅ **Extension Manager** - Enable/disable via settings
7. ✅ **Custom extensions** - TypeScript-based development

---

## 🔗 Navigation

- **Up**: [3.3 Jupyter & JupyterLab Overview](./README.md)
- **Previous**: [04 - Interactive Widgets](./04-Interactive-Widgets.md)
- **Next**: [06 - Best Practices](./06-Best-Practices.md)

---

**Remember:** Extensions enhance productivity, but don't overload! Install only what you need and keep them updated.
