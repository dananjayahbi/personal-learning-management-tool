# 02 - PyCharm for ML Development

## 📋 Introduction

PyCharm is a powerful, feature-rich IDE specifically designed for Python development by JetBrains. The Professional edition includes advanced tools for data science, databases, web frameworks, and remote development, making it an excellent choice for serious ML practitioners.

**Why PyCharm for ML?**
- ✅ **Intelligent code assistance** - Best-in-class autocomplete
- ✅ **Scientific Mode** - Interactive computing and visualization
- ✅ **Advanced debugging** - Powerful debugging tools
- ✅ **Database tools** - Query and manage databases
- ✅ **Remote development** - Seamless remote execution
- ✅ **Integrated testing** - pytest, unittest support
- ✅ **Profiling tools** - Performance analysis
- ✅ **Refactoring** - Safe code restructuring

---

## 📦 Installation

### PyCharm Editions

**Community Edition (Free):**
- Core Python development
- Basic debugging
- Git integration
- Limited features

**Professional Edition (Paid):**
- Everything in Community
- **Scientific tools** (essential for ML)
- Database tools
- Remote interpreters
- Web frameworks (Django, Flask)
- Jupyter notebook support
- Profiler

**Get Free Professional License:**
- **Students**: Free with valid .edu email
- **Open Source**: Free for open source maintainers
- **Teachers**: Free for educators
- Apply at: https://www.jetbrains.com/community/education/

### Windows Installation

```bash
# Method 1: Download installer
# Visit: https://www.jetbrains.com/pycharm/download/
# Download Community or Professional
# Run .exe installer

# Method 2: Via winget
winget install JetBrains.PyCharm.Community
# or
winget install JetBrains.PyCharm.Professional

# Method 3: Via Chocolatey
choco install pycharm-community
# or
choco install pycharm
```

### macOS Installation

```bash
# Method 1: Download .dmg
# Visit: https://www.jetbrains.com/pycharm/download/

# Method 2: Via Homebrew
brew install --cask pycharm-ce
# or
brew install --cask pycharm

# Method 3: Via JetBrains Toolbox
brew install --cask jetbrains-toolbox
# Then install PyCharm from Toolbox
```

### Linux Installation

```bash
# Method 1: Snap
sudo snap install pycharm-community --classic
# or
sudo snap install pycharm-professional --classic

# Method 2: Download tar.gz
wget https://download.jetbrains.com/python/pycharm-community-2024.1.tar.gz
tar -xzf pycharm-community-2024.1.tar.gz
cd pycharm-community-2024.1/bin
./pycharm.sh

# Method 3: JetBrains Toolbox
# Download from: https://www.jetbrains.com/toolbox-app/
```

### JetBrains Toolbox (Recommended)

**Benefits:**
- Manage all JetBrains IDEs
- Easy updates
- Multiple versions
- Project organization

---

## 🎯 First Launch Setup

### Initial Configuration

**1. Import Settings (if upgrading)**
- Import from previous PyCharm version
- Or start fresh

**2. UI Theme**
- Darcula (Dark)
- Light
- High Contrast

**3. Keymap**
- Default
- Visual Studio
- Emacs
- Vim
- Sublime Text

**4. Plugins**
- Markdown support
- .gitignore support
- Docker
- CSV Plugin

### Create First Project

```
File → New Project

Project Settings:
├── Location: /path/to/project
├── Interpreter: 
│   ├── New virtual environment
│   ├── Existing conda environment
│   └── System interpreter
└── Create main.py: ✓
```

---

## 🐍 Python Interpreter Configuration

### Virtual Environment (venv)

**Create new venv:**
```
File → Settings → Project → Python Interpreter
Click gear icon → Add
Select "Virtual Environment"
├── New environment
│   ├── Location: project_dir/venv
│   ├── Base interpreter: Python 3.11
│   └── Inherit global packages: ☐
└── OK
```

**Use existing venv:**
```
Add → Existing environment
Select: /path/to/venv/bin/python
```

### Conda Environment

**Create conda environment:**
```
Add → Conda Environment
├── New environment
│   ├── Name: ml-project
│   ├── Python version: 3.11
│   └── Conda executable: /path/to/conda
└── OK
```

**Use existing conda:**
```
Add → Conda Environment → Existing
Select conda environment from list
```

### Remote Interpreter

**SSH Interpreter:**
```
Add → SSH Interpreter
├── New server configuration
│   ├── Host: 192.168.1.100
│   ├── Port: 22
│   ├── Username: user
│   └── Authentication: Password/Key
├── Next
├── Interpreter: /usr/bin/python3
└── Sync folders
    ├── Local: /local/project
    └── Remote: /home/user/project
```

**Benefits:**
- Code locally, execute remotely
- Use remote GPUs
- Automatic file sync
- Remote debugging

### Docker Interpreter

```
Add → Docker
├── Docker server: Docker for Windows/Mac
├── Image name: python:3.11
└── Python interpreter path: python
```

Or use docker-compose:
```
Add → Docker Compose
├── Configuration file: docker-compose.yml
├── Service: app
└── Python interpreter: python
```

---

## 🔬 Scientific Mode (Professional Only)

### Enabling Scientific Mode

```
View → Scientific Mode
```

**Interface changes:**
```
┌─────────────────────────────────────────────────┐
│  Editor                     │ Variables         │
│                             ├───────────────────┤
│  import pandas as pd        │ Name │ Type │Val │
│  import numpy as np         ├──────┼──────┼────┤
│                             │ df   │ DF   │100 │
│  df = pd.read_csv('...')    │ x    │ arr  │[..]│
│  x = np.array([1,2,3])      └───────────────────┘
│                             ┌───────────────────┐
│                             │ Plots             │
│                             │                   │
│                             │   📊 Plot 1       │
│                             │   📊 Plot 2       │
│                             └───────────────────┘
├─────────────────────────────────────────────────┤
│  Python Console                                 │
│  >>> import pandas as pd                        │
│  >>> df.head()                                  │
└─────────────────────────────────────────────────┘
```

### Interactive Console

**Run code in console:**
```python
# In editor, select code and press Alt+Shift+E
# Or right-click → Execute Selection in Console

import pandas as pd
df = pd.read_csv('data.csv')
df.head()  # Results appear in console
```

**Features:**
- IPython integration
- Tab completion
- Magic commands
- Command history

### Variable Viewer

**View variables:**
- Automatic population
- Click to inspect
- DataFrames open in table viewer
- Arrays show shape and values

**DataFrame Viewer:**
```python
df = pd.read_csv('large_data.csv')
# Click 'df' in Variables panel
# Opens spreadsheet-like viewer:
# - Sort columns
# - Filter rows
# - Search
# - Export
```

### Plots Viewer

**Matplotlib integration:**
```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
plt.plot(x, np.sin(x))
plt.title('Sine Wave')
plt.show()

# Plot appears in Plots panel
# Navigate between multiple plots
# Save, zoom, pan
```

---

## 🐛 Advanced Debugging

### Breakpoints

**Set breakpoint:**
- Click left gutter (line numbers)
- Or Ctrl+F8

**Conditional breakpoint:**
- Right-click breakpoint → More (Ctrl+Shift+F8)
- Add condition: `epoch > 50`
- Add log message: `"Epoch {epoch}, Loss: {loss}"`

**Exception breakpoints:**
```
Run → View Breakpoints (Ctrl+Shift+F8)
Click "+" → Python Exception Breakpoints
Select exception type (e.g., ValueError)
Now breaks on any ValueError
```

### Debug Configuration

**Create run configuration:**
```
Run → Edit Configurations
Click "+" → Python

Configuration:
├── Name: Train Model
├── Script path: train.py
├── Parameters: --epochs 100 --lr 0.001
├── Environment variables: CUDA_VISIBLE_DEVICES=0
├── Working directory: /project/root
└── Python interpreter: Project venv
```

### Debug Features

**Step through code:**
```
F8        Step Over
F7        Step Into
Shift+F7  Smart Step Into (choose which call)
Shift+F8  Step Out
F9        Resume Program
Alt+F9    Run to Cursor
```

**Evaluate expressions:**
```
During debugging:
Alt+F8: Evaluate Expression

# In dialog:
>>> model.parameters()
>>> [p.shape for p in model.parameters()]
>>> loss.item()
```

**Set value:**
```
Variables panel → Right-click variable → Set Value
Modify variable during debugging!
```

**Watches:**
```
Debugger → Watches
Add expression to watch across breakpoints
Example: loss.item(), model.training, epoch
```

**Frames:**
```
Navigate call stack
Click frame to see local variables at that level
```

### Debugging Notebooks

**Professional Edition:**
```python
# In Jupyter notebook cell
def train_model(data):
    # Set breakpoint here
    model = create_model()
    model.fit(data)
    return model

# Click Debug Cell (bug icon)
# Steps through with full debugger
```

---

## 🗄️ Database Tools (Professional Only)

### Connect to Database

```
View → Tool Windows → Database
Click "+" → Data Source → PostgreSQL/MySQL/SQLite

Connection:
├── Host: localhost
├── Port: 5432
├── Database: ml_project
├── User: postgres
├── Password: ****
└── Test Connection
```

### Query Console

```sql
-- Write and execute queries
SELECT * FROM experiments 
WHERE accuracy > 0.9 
ORDER BY created_at DESC;

-- Features:
-- - SQL autocomplete
-- - Result viewer (table/text)
-- - Export results
-- - Query history
```

### Visual Tools

```
Database panel:
├── Browse tables
├── View schemas
├── Edit data directly
├── Generate SQL
└── ER diagrams
```

---

## 🧪 Testing

### Configure pytest

```
File → Settings → Tools → Python Integrated Tools
Default test runner: pytest
```

**Create test:**
```python
# tests/test_model.py
import pytest
from src.model import train_model

def test_model_training():
    """Test model trains successfully"""
    data = load_test_data()
    model = train_model(data, epochs=1)
    assert model is not None
    assert hasattr(model, 'predict')

def test_model_accuracy():
    """Test model achieves minimum accuracy"""
    model = train_model(test_data, epochs=10)
    accuracy = evaluate(model, test_data)
    assert accuracy > 0.7
```

**Run tests:**
```
Right-click test file → Run 'pytest in test_model'
Or: Ctrl+Shift+F10
```

**Test runner UI:**
```
┌─────────────────────────────────┐
│ Test Results                    │
├─────────────────────────────────┤
│ ✓ test_model_training (0.5s)    │
│ ✓ test_model_accuracy (2.1s)    │
│                                 │
│ 2 passed, 0 failed              │
└─────────────────────────────────┘
```

### Coverage

```
Run → Run with Coverage
View coverage highlights in editor
Generate HTML report
```

---

## 📊 Profiling

### Profile Script

```
Run → Profile 'script.py'
```

**Profiler output:**
```
┌──────────────────────────────────────────────┐
│ Function              │ Calls │ Time    │ %  │
├──────────────────────────────────────────────┤
│ train_model           │ 1     │ 45.2s   │ 67%│
│ ├─ forward           │ 1000  │ 30.1s   │ 45%│
│ ├─ backward          │ 1000  │ 12.3s   │ 18%│
│ └─ optimize          │ 1000  │ 2.8s    │ 4% │
│ preprocess_data       │ 1     │ 15.3s   │ 23%│
│ evaluate_model        │ 1     │ 6.8s    │ 10%│
└──────────────────────────────────────────────┘
```

**Features:**
- Call tree view
- Flame graph
- Sort by time/calls
- Export results

### Memory Profiler

```
Run → Profile 'script.py' with Memory Profiler
```

Shows memory usage over time and by function.

---

## 🔧 Code Quality Tools

### Inspections

**Real-time code analysis:**
```python
# PyCharm highlights issues:
def calculate_mean(data):
    sum = 0  # Warning: shadows built-in 'sum'
    for x in data:
        sum += x
    return sum / len(data)  # Warning: potential ZeroDivisionError
```

**Inspection settings:**
```
File → Settings → Editor → Inspections
Python:
├─ ✓ PEP 8 coding style violation
├─ ✓ Type checker
├─ ✓ Unreachable code
├─ ✓ Unresolved references
└─ ✓ Shadowing built-ins
```

### Code Style

```
File → Settings → Editor → Code Style → Python
├── Tabs and Indents
│   ├── Tab size: 4
│   └── Indent: 4
├── Spaces
│   ├── Before parentheses: ☐
│   └── Around operators: ✓
├── Blank Lines
│   ├── Around class: 2
│   └── Around method: 1
└── Imports
    ├── Sort imports
    └── Remove unused imports
```

**Auto-format:**
```
Ctrl+Alt+L: Reformat code
Ctrl+Alt+O: Optimize imports
```

### External Tools Integration

**Black formatter:**
```
File → Settings → Tools → External Tools
Click "+"
Name: Black
Program: black
Arguments: $FilePath$
Working directory: $ProjectFileDir$

# Use: Right-click file → External Tools → Black
```

**Flake8:**
```
Similar setup with:
Program: flake8
Arguments: $FilePath$
```

---

## 🔄 Refactoring

### Rename (Shift+F6)

```python
# Rename variable/function/class
old_name = 10  # Place cursor here, press Shift+F6
# Renames everywhere safely
```

### Extract Method (Ctrl+Alt+M)

```python
# Select code block
result = []
for i in range(100):
    result.append(i * 2)

# Ctrl+Alt+M → Extract Method
def calculate_doubles(n):
    result = []
    for i in range(n):
        result.append(i * 2)
    return result

result = calculate_doubles(100)
```

### Extract Variable (Ctrl+Alt+V)

```python
# Select expression
model.fit(X_train, y_train)  # Select X_train, y_train

# Ctrl+Alt+V
training_data = (X_train, y_train)
model.fit(*training_data)
```

### Change Signature (Ctrl+F6)

```python
def train_model(data, epochs):
    pass

# Ctrl+F6 on function name
# Add/remove/reorder parameters
# Updates all call sites
```

---

## 🌐 Remote Development

### Remote Interpreter Setup

```
1. File → Settings → Project → Python Interpreter
2. Click gear → Add → SSH Interpreter
3. New server configuration:
   ├── Host: ml-server.example.com
   ├── Port: 22
   ├── Username: mluser
   └── Authentication: Key-based
4. Next → Select Python: /home/mluser/venv/bin/python
5. Configure path mappings:
   ├── Local: C:\Users\Me\Projects\ml-project
   └── Remote: /home/mluser/ml-project
6. Finish
```

### Deployment Configuration

```
Tools → Deployment → Configuration
Click "+" → SFTP

Connection:
├── Type: SFTP
├── Host: ml-server.example.com
├── Port: 22
├── Root path: /home/mluser/ml-project
└── Mappings:
    ├── Local: C:\Users\Me\Projects\ml-project
    └── Remote: /home/mluser/ml-project
```

**Auto-upload:**
```
Tools → Deployment → Automatic Upload: Always
```

### Remote Terminal

```
Tools → Start SSH Session
Select configured server
Opens terminal on remote machine
```

### Benefits

```python
# Write code locally in PyCharm
# Code automatically synced to remote server
# Execution happens on remote GPU
# Debugging works seamlessly

import torch
print(torch.cuda.is_available())  # Runs on remote GPU
# Output: True (even though local machine has no GPU)
```

---

## ⌨️ Keyboard Shortcuts

### Essential Shortcuts

**General:**
```
Double Shift      Search Everywhere
Ctrl+Shift+A      Find Action
Alt+1             Project tool window
Alt+7             Structure
Shift+F10         Run
Shift+F9          Debug
Ctrl+F8           Toggle breakpoint
```

**Navigation:**
```
Ctrl+N            Go to class
Ctrl+Shift+N      Go to file
Ctrl+E            Recent files
Ctrl+B            Go to declaration
Ctrl+Alt+B        Go to implementation
Ctrl+Shift+B      Go to type declaration
Alt+F7            Find usages
Ctrl+F12          File structure
```

**Editing:**
```
Ctrl+Space        Code completion
Ctrl+Shift+Space  Smart type completion
Ctrl+Q            Quick documentation
Ctrl+P            Parameter info
Alt+Insert        Generate code
Ctrl+O            Override methods
Ctrl+I            Implement methods
Ctrl+Alt+L        Reformat code
Ctrl+Alt+O        Optimize imports
Ctrl+/            Comment/uncomment line
Ctrl+Shift+/      Block comment
```

**Refactoring:**
```
Shift+F6          Rename
Ctrl+Alt+M        Extract method
Ctrl+Alt+V        Extract variable
Ctrl+Alt+C        Extract constant
Ctrl+Alt+P        Extract parameter
Ctrl+F6           Change signature
```

**Debugging:**
```
F8                Step over
F7                Step into
Shift+F7          Smart step into
Shift+F8          Step out
Alt+F9            Run to cursor
Alt+F8            Evaluate expression
F9                Resume program
Ctrl+F8           Toggle breakpoint
Ctrl+Shift+F8     View breakpoints
```

---

## 🎨 Customization

### Plugins

**Essential plugins:**
```
File → Settings → Plugins

Marketplace:
├── Markdown
├── .ignore
├── CSV Plugin
├── Rainbow Brackets
├── Key Promoter X (learn shortcuts)
├── CodeGlance (minimap)
├── Material Theme UI
└── String Manipulation
```

### Themes

```
File → Settings → Appearance & Behavior → Appearance
Theme: Darcula / Light / High Contrast

Or install theme plugin:
Material Theme UI
Dracula Theme
One Dark Theme
```

### Fonts

```
File → Settings → Editor → Font
Font: JetBrains Mono / Fira Code
Size: 14
Line spacing: 1.2
Enable ligatures: ✓
```

---

## 🎓 Exercises

### Exercise 1: Setup Complete Environment
1. Install PyCharm Professional (student license)
2. Create new project with conda environment
3. Enable Scientific Mode
4. Install ML libraries (pandas, sklearn, tensorflow)
5. Test in Python Console

### Exercise 2: Advanced Debugging
1. Create ML training script
2. Set conditional breakpoint in training loop
3. Add watches for loss and accuracy
4. Use evaluate expression to inspect model
5. Profile the script

### Exercise 3: Remote Development
1. Configure SSH interpreter to remote server
2. Set up automatic deployment
3. Run script on remote GPU
4. Debug remotely

---

## 🎯 Key Takeaways

1. ✅ **PyCharm Professional** - Worth it for ML work
2. ✅ **Scientific Mode** - Interactive development
3. ✅ **Advanced debugging** - Best-in-class tools
4. ✅ **Remote development** - Seamless remote execution
5. ✅ **Database tools** - Query and manage data
6. ✅ **Refactoring** - Safe code transformation
7. ✅ **Code quality** - Real-time inspections

---

## 🔗 Navigation

- **Up**: [3.4 IDEs for ML Overview](./README.md)
- **Previous**: [01 - VS Code Setup](./01-VS-Code-Setup.md)
- **Next**: [03 - Spyder IDE](./03-Spyder-IDE.md)

---

**Remember:** PyCharm Professional is a powerhouse for ML development. The learning curve is worth it for serious projects requiring advanced debugging, remote development, and database integration!
