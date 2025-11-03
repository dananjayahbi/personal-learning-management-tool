# 3.4 IDEs for ML Development

## 📋 Overview

While Jupyter notebooks are excellent for exploration, Integrated Development Environments (IDEs) are essential for building production-ready code, debugging complex issues, and managing larger projects. This section covers the most powerful IDEs for ML development.

**Duration:** 4-5 days

---

## 📚 Topics

1. [VS Code for ML](./01-VS-Code-Setup.md)
   - Installation and configuration
   - Essential extensions for ML/DS
   - Python configuration
   - Integrated notebooks
   - Debugging Python code
   - Git integration
   - Remote development
   - AI-powered coding (Copilot)

2. [PyCharm Professional](./02-PyCharm-Setup.md)
   - Installation (Community vs Professional)
   - Scientific mode
   - Debugging features
   - Database tools
   - Remote interpreters
   - Docker integration
   - Profiling tools
   - Code quality tools

3. [Spyder IDE](./03-Spyder-IDE.md)
   - MATLAB-like interface
   - Variable explorer
   - Integrated IPython console
   - Debugging features
   - Best for scientific computing
   - Integration with Anaconda

4. [Remote Development](./04-Remote-Development.md)
   - SSH remote development
   - VS Code Remote
   - PyCharm remote interpreters
   - WSL (Windows Subsystem for Linux)
   - Container development
   - Cloud IDEs (GitHub Codespaces, Gitpod)

5. [Code Completion & AI Tools](./05-AI-Code-Tools.md)
   - GitHub Copilot
   - TabNine
   - Kite
   - IntelliCode
   - Configuring AI assistants
   - Best practices

---

## 🎯 Learning Objectives

After completing this section, you will be able to:
- Set up VS Code optimized for ML development
- Configure PyCharm for data science workflows
- Use advanced debugging features
- Develop remotely on powerful machines
- Leverage AI-powered code completion
- Choose the right IDE for each task
- Integrate version control in your IDE

---

## 🔑 Key Concepts

### IDE vs Text Editor
- **Text Editor**: Lightweight, fast (Sublime, Atom)
- **IDE**: Full-featured development environment (VS Code, PyCharm)

### Debugging
Setting breakpoints, inspecting variables, stepping through code.

### Integrated Tools
Terminal, version control, database browser, profiler—all in one interface.

### Remote Development
Write code locally, execute on powerful remote machines.

---

## ⏱️ Time Allocation

| Topic | Estimated Time |
|-------|----------------|
| VS Code Setup | 8-10 hours |
| PyCharm Setup | 6-8 hours |
| Spyder IDE | 3-4 hours |
| Remote Development | 6-8 hours |
| AI Code Tools | 4-6 hours |
| **Total** | **4-5 days** |

---

## 📝 Exercises

Each topic file contains hands-on exercises. Total exercises: **18+**

**Key Projects:**
- Configure complete ML development environment
- Set up remote development workflow
- Build and debug complex ML pipeline
- Compare IDEs for specific tasks

---

## 💡 Quick Start

### VS Code Setup

```bash
# Install VS Code
# Download from: https://code.visualstudio.com/

# Essential extensions
code --install-extension ms-python.python
code --install-extension ms-toolsai.jupyter
code --install-extension github.copilot
code --install-extension ms-vscode-remote.remote-ssh
code --install-extension ms-azuretools.vscode-docker
code --install-extension eamodio.gitlens
```

**VS Code settings.json:**
```json
{
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": true,
    "python.formatting.provider": "black",
    "editor.formatOnSave": true,
    "python.testing.pytestEnabled": true,
    "jupyter.askForKernelRestart": false,
    "git.autofetch": true
}
```

### PyCharm Setup

```bash
# Download PyCharm Professional
# https://www.jetbrains.com/pycharm/download/

# Free for students/educators
# Professional features:
# - Scientific tools
# - Database support
# - Remote development
# - Web frameworks
```

**PyCharm Configuration:**
- Settings > Project > Python Interpreter > Add > Virtual Environment
- Settings > Tools > Python Scientific > Enable
- Settings > Editor > Code Style > Python > PEP 8

### Spyder Setup

```bash
# Install via Anaconda (included)
# or install separately
conda install spyder

# or
pip install spyder

# Launch
spyder
```

---

## 🚀 VS Code for ML - Quick Setup

### Python Extension Configuration

```json
{
    // Python
    "python.defaultInterpreterPath": "/path/to/python",
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": true,
    "python.formatting.provider": "black",
    "python.formatting.blackArgs": ["--line-length", "100"],
    
    // Jupyter
    "jupyter.askForKernelRestart": false,
    "jupyter.interactiveWindowMode": "perFile",
    
    // Editor
    "editor.rulers": [80, 100],
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.organizeImports": true
    },
    
    // Terminal
    "terminal.integrated.fontSize": 14,
    
    // Git
    "git.autofetch": true,
    "git.confirmSync": false
}
```

### Essential VS Code Extensions for ML

**Must-Have:**
1. **Python** (ms-python.python) - Core Python support
2. **Jupyter** (ms-toolsai.jupyter) - Notebook integration
3. **Pylance** (ms-python.vscode-pylance) - Fast language server
4. **GitLens** (eamodio.gitlens) - Enhanced Git integration
5. **Docker** (ms-azuretools.vscode-docker) - Container support

**Highly Recommended:**
6. **GitHub Copilot** - AI pair programmer
7. **Remote-SSH** - Remote development
8. **Python Docstring Generator** - Auto-generate docstrings
9. **autoDocstring** - Docstring templates
10. **Better Comments** - Highlight different comment types

**Data Science Specific:**
11. **Rainbow CSV** - CSV visualization
12. **Edit CSV** - CSV editor
13. **vscode-pdf** - View PDFs
14. **Markdown All in One** - Enhanced markdown

### Keyboard Shortcuts (VS Code)

**Essential:**
- `Ctrl+Shift+P`: Command palette
- `Ctrl+P`: Quick file open
- `Ctrl+``: Toggle terminal
- `F5`: Start debugging
- `F9`: Toggle breakpoint
- `F10`: Step over
- `F11`: Step into
- `Shift+F11`: Step out

**Code Navigation:**
- `F12`: Go to definition
- `Alt+F12`: Peek definition
- `Shift+F12`: Find references
- `Ctrl+Shift+O`: Go to symbol
- `Ctrl+T`: Go to symbol in workspace

**Editing:**
- `Ctrl+D`: Select next occurrence
- `Ctrl+Shift+L`: Select all occurrences
- `Alt+Up/Down`: Move line
- `Ctrl+/`: Toggle comment
- `Shift+Alt+F`: Format document

---

## 🐍 PyCharm for ML

### Scientific Mode

PyCharm Professional includes Scientific Mode for data analysis:

```python
# Enable Scientific Mode
# View > Scientific Mode

# Features:
# - Interactive console
# - Variable viewer
# - Plot viewer
# - DataFrame viewer
# - Arrays viewer
```

### Debugging Features

```python
# Advanced debugging in PyCharm

def train_model(data, params):
    # Set breakpoint here (click left gutter)
    model = create_model(params)
    
    # Conditional breakpoint (right-click breakpoint)
    # Condition: epoch > 10
    for epoch in range(params['epochs']):
        loss = model.train_step(data)
        
    return model

# Debug features:
# - Evaluate expression
# - Modify variables on the fly
# - Smart step into
# - Drop frame
# - Watches
```

### PyCharm Keyboard Shortcuts

**Essential:**
- `Shift+Shift`: Search everywhere
- `Ctrl+Shift+A`: Find action
- `Alt+1`: Project tool window
- `Shift+F10`: Run
- `Shift+F9`: Debug
- `Ctrl+F8`: Toggle breakpoint

**Code:**
- `Ctrl+Space`: Code completion
- `Ctrl+Shift+Space`: Smart completion
- `Ctrl+Q`: Quick documentation
- `Ctrl+P`: Parameter info
- `Alt+Enter`: Show intention actions

---

## 🔬 Spyder IDE

### When to Use Spyder

**Best for:**
- MATLAB users transitioning to Python
- Interactive data exploration
- Quick prototyping
- Scientific computing

**Interface:**
- Editor (left)
- IPython console (bottom right)
- Variable explorer (top right)
- Plots viewer
- Help pane

### Spyder Features

```python
# Variable Explorer
# - View all variables
# - Inspect DataFrames visually
# - Edit values directly

# IPython Console
# - Run code interactively
# - Test functions quickly

# Plots Pane
# - All plots appear here
# - Navigate between plots
# - Save, zoom, pan
```

---

## 🌐 Remote Development

### VS Code Remote-SSH

```bash
# Install extension
code --install-extension ms-vscode-remote.remote-ssh

# SSH config (~/.ssh/config)
Host ml-server
    HostName 192.168.1.100
    User username
    IdentityFile ~/.ssh/id_rsa

# Connect: Ctrl+Shift+P > "Remote-SSH: Connect to Host"
# Select ml-server

# Now you're developing on remote machine!
```

### PyCharm Remote Interpreter

```
1. Settings > Project > Python Interpreter
2. Click gear icon > Add
3. Select "SSH Interpreter"
4. Enter SSH credentials
5. Select Python interpreter on remote machine
6. PyCharm syncs files automatically
```

### Benefits of Remote Development

- **Powerful Hardware**: Use remote GPUs
- **Large Datasets**: Data stays on server
- **Consistent Environment**: Same setup everywhere
- **Cost Effective**: Share expensive hardware

---

## 🤖 AI-Powered Code Completion

### GitHub Copilot

```python
# Copilot suggests entire functions!

# Type comment:
# Function to train a neural network

# Copilot suggests:
def train_neural_network(model, train_data, val_data, epochs=10):
    """
    Train a neural network model.
    
    Args:
        model: The neural network model
        train_data: Training dataset
        val_data: Validation dataset
        epochs: Number of training epochs
    """
    optimizer = torch.optim.Adam(model.parameters())
    criterion = nn.CrossEntropyLoss()
    
    for epoch in range(epochs):
        model.train()
        for batch in train_data:
            optimizer.zero_grad()
            outputs = model(batch['input'])
            loss = criterion(outputs, batch['labels'])
            loss.backward()
            optimizer.step()
    
    return model
```

**Copilot Tips:**
- Write clear comments describing what you want
- Accept suggestions with `Tab`
- See alternatives with `Alt+]`
- Reject with `Esc`

---

## 📊 IDE Comparison

| Feature | VS Code | PyCharm Pro | Spyder |
|---------|---------|-------------|--------|
| **Cost** | Free | Paid/Free for students | Free |
| **Learning Curve** | Low | Medium | Low |
| **Python Support** | Excellent | Excellent | Excellent |
| **Jupyter Integration** | Excellent | Good | Limited |
| **Debugging** | Excellent | Excellent | Good |
| **Remote Development** | Excellent | Excellent | Limited |
| **Database Tools** | Extensions | Built-in | No |
| **Scientific Mode** | Via notebooks | Built-in | Built-in |
| **Performance** | Fast | Slower | Medium |
| **Extensibility** | Excellent | Good | Limited |
| **Best For** | General | Professional | Scientific |

---

## 🎯 Which IDE Should You Choose?

### Choose VS Code If:
- You want lightweight and fast
- You work with multiple languages
- You need remote development
- You want extensive extensions
- You're a beginner

### Choose PyCharm If:
- You're a professional developer
- You need advanced debugging
- You work with databases
- You want all-in-one solution
- You can afford/get student license

### Choose Spyder If:
- You're coming from MATLAB
- You do scientific computing
- You want immediate variable inspection
- You prefer simple interface
- You use Anaconda

### Use Multiple!
Many developers use:
- **Jupyter**: Exploration and analysis
- **VS Code**: General development and scripts
- **PyCharm**: Large projects and debugging

---

## 🔗 Navigation

- **Up**: [Chapter 3 Overview](../README.md)
- **Previous**: [3.3 Jupyter & JupyterLab](../3.3-Jupyter-JupyterLab/README.md)
- **Next**: [3.5 Package Management](../3.5-Package-Management/README.md)

---

## 📚 Additional Resources

### Documentation
- [VS Code Python Tutorial](https://code.visualstudio.com/docs/python/python-tutorial)
- [PyCharm Documentation](https://www.jetbrains.com/pycharm/learn/)
- [Spyder Documentation](https://docs.spyder-ide.org/)

### Tutorials
- [Real Python: VS Code for Python](https://realpython.com/python-development-visual-studio-code/)
- [PyCharm for Data Scientists](https://www.jetbrains.com/help/pycharm/data-science.html)
- [Corey Schafer: VS Code Setup](https://www.youtube.com/watch?v=06I63_p-2A4)

### Communities
- [VS Code Python Discord](https://discord.gg/microsoft-python)
- [PyCharm Community](https://www.jetbrains.com/pycharm/community/)
- [r/vscode](https://www.reddit.com/r/vscode/)
