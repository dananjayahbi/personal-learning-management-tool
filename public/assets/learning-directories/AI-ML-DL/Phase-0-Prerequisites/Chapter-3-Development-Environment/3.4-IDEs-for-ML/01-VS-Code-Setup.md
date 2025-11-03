# 01 - VS Code for ML Development

## 📋 Introduction

Visual Studio Code (VS Code) is a free, open-source, lightweight yet powerful code editor from Microsoft. It has become the most popular IDE for Python and ML development due to its extensive extension ecosystem, excellent Python support, integrated Jupyter notebooks, and powerful debugging capabilities.

**Why VS Code for ML?**
- ✅ **Free and open-source**
- ✅ **Lightweight but powerful**
- ✅ **Excellent Python support**
- ✅ **Native Jupyter notebook support**
- ✅ **Remote development** (SSH, containers, WSL)
- ✅ **GitHub Copilot integration**
- ✅ **Massive extension marketplace**
- ✅ **Cross-platform** (Windows, macOS, Linux)
- ✅ **Active development and community**

---

## 📦 Installation

### Windows

```bash
# Option 1: Download installer
# Visit: https://code.visualstudio.com/
# Download and run .exe installer

# Option 2: Via winget
winget install Microsoft.VisualStudioCode

# Option 3: Via Chocolatey
choco install vscode

# Add to PATH (installer usually does this)
# Verify installation
code --version
```

### macOS

```bash
# Option 1: Download .dmg
# Visit: https://code.visualstudio.com/

# Option 2: Via Homebrew
brew install --cask visual-studio-code

# Verify
code --version
```

### Linux (Ubuntu/Debian)

```bash
# Method 1: Official repository
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
rm -f packages.microsoft.gpg

sudo apt update
sudo apt install code

# Method 2: Snap
sudo snap install --classic code

# Verify
code --version
```

### First Launch

```bash
# Launch VS Code
code

# Or open specific directory
code /path/to/project

# Or open file
code script.py
```

---

## 🔌 Essential Extensions for ML

### Installing Extensions

**Via GUI:**
1. Click Extensions icon in sidebar (Ctrl+Shift+X)
2. Search for extension
3. Click Install

**Via Command Line:**
```bash
code --install-extension extension-id
```

### Must-Have Extensions

#### 1. Python (ms-python.python)

```bash
code --install-extension ms-python.python
```

**Features:**
- IntelliSense (autocomplete)
- Linting (error checking)
- Debugging
- Code formatting
- Refactoring
- Testing support
- Environment management

#### 2. Pylance (ms-python.vscode-pylance)

```bash
code --install-extension ms-python.vscode-pylance
```

**Features:**
- Fast language server
- Type checking
- Auto-imports
- Semantic highlighting
- Better IntelliSense

#### 3. Jupyter (ms-toolsai.jupyter)

```bash
code --install-extension ms-toolsai.jupyter
```

**Features:**
- Open/edit .ipynb files natively
- Run cells individually
- Interactive Python window
- Variable explorer
- Plot viewer
- Export to Python/HTML/PDF

#### 4. GitLens (eamodio.gitlens)

```bash
code --install-extension eamodio.gitlens
```

**Features:**
- Git blame annotations
- Repository/file history
- Branch comparison
- Commit search
- Visual timeline

#### 5. GitHub Copilot (github.copilot)

```bash
code --install-extension github.copilot
```

**Features:**
- AI-powered code completion
- Whole function suggestions
- Comment-to-code
- Alternative suggestions

**Requires GitHub Copilot subscription** (free for students/open source)

#### 6. Remote - SSH (ms-vscode-remote.remote-ssh)

```bash
code --install-extension ms-vscode-remote.remote-ssh
```

**Features:**
- Develop on remote machines
- Full VS Code experience over SSH
- Remote terminal
- Remote port forwarding

### Highly Recommended Extensions

#### 7. Python Docstring Generator (njpwerner.autodocstring)

```bash
code --install-extension njpwerner.autodocstring
```

**Usage:**
```python
def train_model(data, epochs):
    """_summary_  # Type """ and press Enter
    
    # Generates:
    """_summary_
    
    Args:
        data (_type_): _description_
        epochs (_type_): _description_
    """
    pass
```

#### 8. Better Comments (aaron-bond.better-comments)

```bash
code --install-extension aaron-bond.better-comments
```

**Usage:**
```python
# ! Important warning
# ? Question or uncertainty
# TODO: Task to complete
# * Highlighted info
# Regular comment
```

#### 9. Rainbow CSV (mechatroner.rainbow-csv)

```bash
code --install-extension mechatroner.rainbow-csv
```

Features: Colorize CSV columns, SQL-like queries

#### 10. Docker (ms-azuretools.vscode-docker)

```bash
code --install-extension ms-azuretools.vscode-docker
```

Features: Build, run, debug containers

#### 11. YAML (redhat.vscode-yaml)

```bash
code --install-extension redhat.vscode-yaml
```

For configuration files, Kubernetes, Docker Compose

#### 12. Markdown All in One (yzhang.markdown-all-in-one)

```bash
code --install-extension yzhang.markdown-all-in-one
```

Enhanced markdown editing, preview, TOC generation

### Install All at Once

```bash
# Complete ML setup
code --install-extension ms-python.python
code --install-extension ms-python.vscode-pylance
code --install-extension ms-toolsai.jupyter
code --install-extension eamodio.gitlens
code --install-extension github.copilot
code --install-extension ms-vscode-remote.remote-ssh
code --install-extension njpwerner.autodocstring
code --install-extension aaron-bond.better-comments
code --install-extension mechatroner.rainbow-csv
code --install-extension ms-azuretools.vscode-docker
code --install-extension redhat.vscode-yaml
code --install-extension yzhang.markdown-all-in-one
```

---

## ⚙️ Configuration

### Settings Location

**Three levels:**
1. **User Settings**: Apply to all projects
2. **Workspace Settings**: Apply to current workspace
3. **Folder Settings**: Apply to specific folder

**Access Settings:**
- File → Preferences → Settings (Ctrl+,)
- Or edit JSON directly: Ctrl+Shift+P → "Preferences: Open Settings (JSON)"

### User Settings (settings.json)

```json
{
    // ========== Python ==========
    "python.defaultInterpreterPath": "C:/Users/YourName/anaconda3/python.exe",
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": true,
    "python.linting.flake8Enabled": false,
    "python.linting.pylintArgs": [
        "--disable=C0111"  // Disable missing docstring warning
    ],
    "python.formatting.provider": "black",
    "python.formatting.blackArgs": [
        "--line-length=100"
    ],
    "python.testing.pytestEnabled": true,
    "python.testing.unittestEnabled": false,
    "python.analysis.typeCheckingMode": "basic",
    "python.analysis.autoImportCompletions": true,
    
    // ========== Jupyter ==========
    "jupyter.askForKernelRestart": false,
    "jupyter.interactiveWindowMode": "perFile",
    "jupyter.widgetScriptSources": ["jsdelivr.com", "unpkg.com"],
    
    // ========== Editor ==========
    "editor.fontSize": 14,
    "editor.fontFamily": "'Fira Code', 'Cascadia Code', 'Courier New', monospace",
    "editor.fontLigatures": true,
    "editor.rulers": [80, 100, 120],
    "editor.formatOnSave": true,
    "editor.formatOnPaste": false,
    "editor.minimap.enabled": true,
    "editor.suggestSelection": "first",
    "editor.tabSize": 4,
    "editor.insertSpaces": true,
    "editor.renderWhitespace": "selection",
    "editor.cursorBlinking": "smooth",
    "editor.cursorSmoothCaretAnimation": "on",
    "editor.bracketPairColorization.enabled": true,
    "editor.guides.bracketPairs": true,
    "editor.codeActionsOnSave": {
        "source.organizeImports": true
    },
    
    // ========== Files ==========
    "files.autoSave": "afterDelay",
    "files.autoSaveDelay": 1000,
    "files.trimTrailingWhitespace": true,
    "files.insertFinalNewline": true,
    "files.exclude": {
        "**/.git": true,
        "**/.DS_Store": true,
        "**/__pycache__": true,
        "**/*.pyc": true,
        "**/.ipynb_checkpoints": true,
        "**/node_modules": true
    },
    
    // ========== Terminal ==========
    "terminal.integrated.fontSize": 13,
    "terminal.integrated.fontFamily": "'Cascadia Code', 'Courier New', monospace",
    "terminal.integrated.cursorBlinking": true,
    "terminal.integrated.defaultProfile.windows": "Git Bash",
    
    // ========== Git ==========
    "git.autofetch": true,
    "git.confirmSync": false,
    "git.enableSmartCommit": true,
    "gitlens.codeLens.enabled": false,
    
    // ========== Workbench ==========
    "workbench.colorTheme": "Default Dark+",
    "workbench.iconTheme": "vs-seti",
    "workbench.startupEditor": "welcomePage",
    "workbench.editor.enablePreview": false,
    
    // ========== Security ==========
    "security.workspace.trust.untrustedFiles": "open",
    
    // ========== Extensions ==========
    "extensions.ignoreRecommendations": false,
    
    // ========== IntelliSense ==========
    "python.analysis.completeFunctionParens": true,
    "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue"
}
```

### Workspace Settings

Create `.vscode/settings.json` in project root:

```json
{
    "python.defaultInterpreterPath": "${workspaceFolder}/venv/bin/python",
    "python.linting.pylintArgs": [
        "--disable=C0111,C0103"
    ],
    "editor.rulers": [100],
    "files.exclude": {
        "**/.git": true,
        "**/__pycache__": true,
        "**/data/": true  // Hide large data folder
    }
}
```

---

## 🐍 Python Configuration

### Select Python Interpreter

**Method 1: Status Bar**
- Click Python version in bottom-left status bar
- Select interpreter from list

**Method 2: Command Palette**
- Ctrl+Shift+P
- Type: "Python: Select Interpreter"
- Choose interpreter

**Method 3: Settings**
```json
{
    "python.defaultInterpreterPath": "/path/to/python"
}
```

### Create Virtual Environment

**In VS Code terminal:**
```bash
# Create venv
python -m venv venv

# Activate
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# VS Code should auto-detect and offer to select it
```

### Conda Environment

```bash
# Create conda env
conda create -n ml-project python=3.11
conda activate ml-project

# Select in VS Code
# Ctrl+Shift+P → "Python: Select Interpreter" → conda:ml-project
```

---

## 📓 Jupyter Notebooks in VS Code

### Opening Notebooks

**Method 1:**
- File → Open
- Select .ipynb file

**Method 2:**
- Drag and drop .ipynb into VS Code

**Method 3:**
```bash
code notebook.ipynb
```

### Notebook Interface

```
┌─────────────────────────────────────────────────┐
│  notebook.ipynb                                 │
├─────────────────────────────────────────────────┤
│  [Kernel: Python 3.11] [Trusted] [Clear All]   │
├─────────────────────────────────────────────────┤
│  + Code  + Markdown                             │
├─────────────────────────────────────────────────┤
│  [1] import pandas as pd                        │
│      df = pd.read_csv('data.csv')               │
│      df.head()                                   │
│                                                  │
│      ▶ [Run] [Debug]                            │
│                                                  │
│  Output:                                         │
│  ┌────────────────────────────┐                │
│  │   name    age    city      │                │
│  │ 0 Alice   25     NYC       │                │
│  │ 1 Bob     30     SF        │                │
│  └────────────────────────────┘                │
├─────────────────────────────────────────────────┤
│  [2] # Add new cell                             │
│      ...                                         │
└─────────────────────────────────────────────────┘
```

### Notebook Features

**Run Cells:**
- Shift+Enter: Run and move to next
- Ctrl+Enter: Run current cell
- Alt+Enter: Run and insert below

**Edit Cells:**
- Double-click to edit
- Esc to exit edit mode
- M: Convert to Markdown
- Y: Convert to Code

**Cell Operations:**
- A: Insert above
- B: Insert below
- DD: Delete cell
- Z: Undo cell delete
- Ctrl+/ Comment/uncomment

**Notebook Commands:**
- Run All
- Run All Above
- Run All Below
- Clear Outputs
- Restart Kernel
- Export to Python/HTML/PDF

### Variable Explorer

**Access:**
- Click "Variables" button at top of notebook
- Or command palette: "Jupyter: Focus on Variables View"

**Features:**
- View all variables
- See types and values
- Filter variables
- View DataFrames in grid

### Interactive Python

**Interactive Window:**
```python
# In .py file, select code and press Shift+Enter
# Opens interactive window with IPython

import numpy as np
x = np.array([1, 2, 3])  # Shift+Enter runs this

# Result appears in interactive window
# Variables persist between runs
```

### Debugging Notebooks

**Set breakpoints:**
- Click left margin in cell
- Red dot appears

**Debug cell:**
- Click "Debug Cell" button
- Or press Ctrl+Shift+Alt+Enter

**Debug controls:**
- Continue (F5)
- Step Over (F10)
- Step Into (F11)
- Step Out (Shift+F11)

---

## 🐛 Debugging Python Code

### Basic Debugging

**Set breakpoint:**
- Click left margin (line numbers)
- Or press F9

**Start debugging:**
- Press F5
- Select "Python File"

**Debug controls:**
- F5: Continue
- F10: Step Over
- F11: Step Into
- Shift+F11: Step Out
- Ctrl+Shift+F5: Restart
- Shift+F5: Stop

### Launch Configuration

Create `.vscode/launch.json`:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python: Current File",
            "type": "python",
            "request": "launch",
            "program": "${file}",
            "console": "integratedTerminal",
            "justMyCode": true
        },
        {
            "name": "Python: Train Model",
            "type": "python",
            "request": "launch",
            "program": "${workspaceFolder}/train.py",
            "console": "integratedTerminal",
            "args": [
                "--epochs", "100",
                "--batch-size", "32"
            ],
            "env": {
                "CUDA_VISIBLE_DEVICES": "0"
            }
        },
        {
            "name": "Python: Module",
            "type": "python",
            "request": "launch",
            "module": "my_package.main",
            "console": "integratedTerminal"
        },
        {
            "name": "Python: Remote Attach",
            "type": "python",
            "request": "attach",
            "connect": {
                "host": "localhost",
                "port": 5678
            },
            "pathMappings": [
                {
                    "localRoot": "${workspaceFolder}",
                    "remoteRoot": "/app"
                }
            ]
        }
    ]
}
```

### Debug Features

**Watch Variables:**
- Debug sidebar → Watch
- Add expression to watch

**Call Stack:**
- View function call hierarchy
- Click to jump to function

**Variables Panel:**
- Inspect all local variables
- Expand objects/arrays
- Modify values during debug

**Debug Console:**
- Evaluate expressions
- Call functions
- Modify variables

```python
# In debug console during pause
>>> x
array([1, 2, 3])
>>> x.shape
(3,)
>>> x = x * 2  # Modify variable
>>> model.parameters()  # Call methods
```

### Conditional Breakpoints

**Set condition:**
- Right-click breakpoint
- "Edit Breakpoint..."
- Add condition

```python
for epoch in range(100):
    loss = train_step(epoch)
    # Breakpoint condition: epoch > 50
    print(f"Epoch {epoch}: Loss = {loss}")
```

### Logpoints

**Add logpoint:**
- Right-click line number
- "Add Logpoint..."
- Enter message

```python
# Logpoint: "Epoch {epoch}, Loss: {loss}"
for epoch in range(100):
    loss = train_step(epoch)  # Logpoint here
```

Output appears in Debug Console without stopping execution.

---

## 📂 Project Structure in VS Code

### Typical ML Project

```
ml-project/
├── .vscode/
│   ├── settings.json
│   ├── launch.json
│   └── tasks.json
├── data/
│   ├── raw/
│   ├── processed/
│   └── .gitkeep
├── models/
│   └── .gitkeep
├── notebooks/
│   ├── 01-exploration.ipynb
│   ├── 02-preprocessing.ipynb
│   └── 03-modeling.ipynb
├── src/
│   ├── __init__.py
│   ├── data.py
│   ├── features.py
│   ├── model.py
│   └── train.py
├── tests/
│   ├── test_data.py
│   └── test_model.py
├── .gitignore
├── requirements.txt
├── setup.py
└── README.md
```

### Workspace Settings

**Open workspace:**
- File → Open Folder
- Select project root

**Save workspace:**
- File → Save Workspace As...
- Creates .code-workspace file

**Multi-root workspace:**
```json
{
    "folders": [
        {"path": "project1"},
        {"path": "project2"}
    ],
    "settings": {
        "python.defaultInterpreterPath": "python"
    }
}
```

---

## ⌨️ Keyboard Shortcuts

### Essential Shortcuts

**General:**
```
Ctrl+Shift+P      Command Palette
Ctrl+P            Quick Open (files)
Ctrl+`            Toggle Terminal
Ctrl+B            Toggle Sidebar
Ctrl+Shift+E      Explorer
Ctrl+Shift+F      Search
Ctrl+Shift+G      Source Control
Ctrl+Shift+D      Debug
Ctrl+Shift+X      Extensions
```

**Editing:**
```
Ctrl+D            Select next occurrence
Ctrl+Shift+L      Select all occurrences
Alt+Up/Down       Move line up/down
Shift+Alt+Up/Down Copy line up/down
Ctrl+/            Toggle comment
Ctrl+Shift+K      Delete line
Ctrl+Enter        Insert line below
Ctrl+Shift+Enter  Insert line above
Ctrl+]            Indent
Ctrl+[            Outdent
Ctrl+Shift+\      Go to matching bracket
```

**Navigation:**
```
F12               Go to Definition
Alt+F12           Peek Definition
Shift+F12         Find All References
Ctrl+T            Go to Symbol in Workspace
Ctrl+Shift+O      Go to Symbol in File
Ctrl+G            Go to Line
Alt+Left/Right    Navigate back/forward
```

**Search:**
```
Ctrl+F            Find
Ctrl+H            Replace
Ctrl+Shift+F      Find in Files
Ctrl+Shift+H      Replace in Files
```

**Multi-cursor:**
```
Alt+Click         Add cursor
Ctrl+Alt+Up/Down  Add cursor above/below
Ctrl+D            Select next match
Ctrl+U            Undo last cursor operation
```

### Customize Shortcuts

File → Preferences → Keyboard Shortcuts (Ctrl+K Ctrl+S)

**Example custom keybindings.json:**
```json
[
    {
        "key": "ctrl+shift+r",
        "command": "python.execInTerminal"
    },
    {
        "key": "ctrl+shift+t",
        "command": "python.execSelectionInTerminal"
    }
]
```

---

## 🎨 Themes and Appearance

### Install Themes

**Popular themes:**
```bash
# Dark themes
code --install-extension zhuangtongfa.material-theme
code --install-extension dracula-theme.theme-dracula
code --install-extension github.github-vscode-theme

# Light themes
code --install-extension akamud.vscode-theme-onedark
code --install-extension pkief.material-icon-theme
```

### Apply Theme

- Ctrl+K Ctrl+T
- Select theme

### Font Ligatures

```json
{
    "editor.fontFamily": "'Fira Code', 'Cascadia Code', Consolas, 'Courier New', monospace",
    "editor.fontLigatures": true,
    "editor.fontSize": 14
}
```

**Install Fira Code:**
- Download from: https://github.com/tonsky/FiraCode
- Install font
- Restart VS Code

---

## 🎓 Exercises

### Exercise 1: Complete Setup
1. Install VS Code
2. Install all essential extensions
3. Configure settings.json
4. Create test Python file
5. Set up debugging

### Exercise 2: Notebook Workflow
1. Create new notebook
2. Load CSV data
3. Use variable explorer
4. Debug a cell
5. Export to Python

### Exercise 3: Custom Configuration
1. Create workspace settings
2. Set up launch.json for your project
3. Configure linting rules
4. Set up formatOnSave with Black

---

## 🎯 Key Takeaways

1. ✅ **VS Code is powerful** - Free, extensible, fast
2. ✅ **Python extension** - Essential for ML development
3. ✅ **Jupyter integration** - Native notebook support
4. ✅ **Debugging** - Breakpoints, watches, call stack
5. ✅ **Remote development** - Code on powerful machines
6. ✅ **Customization** - Settings, themes, keybindings
7. ✅ **Git integration** - Built-in version control

---

## 🔗 Navigation

- **Up**: [3.4 IDEs for ML Overview](./README.md)
- **Next**: [02 - PyCharm Setup](./02-PyCharm-Setup.md)

---

**Remember:** VS Code's power lies in its extensibility. Install extensions as needed, customize your workflow, and you'll have a world-class ML development environment!
