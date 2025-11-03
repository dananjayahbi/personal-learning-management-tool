# 04 - Debugging Techniques for Python and ML

## 📋 Table of Contents
- [Introduction](#introduction)
- [Print Debugging](#print-debugging)
- [Python Debugger (pdb)](#python-debugger-pdb)
- [IDE Debugging](#ide-debugging)
- [Logging](#logging)
- [Debugging ML Models](#debugging-ml-models)
- [Common Issues](#common-issues)
- [Practice Exercises](#practice-exercises)

---

## Introduction

Effective debugging is crucial for finding and fixing errors in code and models.

---

## Print Debugging

### Basic Printing

```python
def calculate_metrics(y_true, y_pred):
    print("=== Debug Info ===")
    print(f"y_true type: {type(y_true)}")
    print(f"y_true shape: {y_true.shape}")
    print(f"y_pred type: {type(y_pred)}")
    print(f"y_pred shape: {y_pred.shape}")
    print(f"First 5 true: {y_true[:5]}")
    print(f"First 5 pred: {y_pred[:5]}")
    print("==================")
    
    accuracy = (y_true == y_pred).mean()
    return accuracy
```

### Pretty Printing

```python
import pprint

# Complex data structures
data = {
    'model': 'RandomForest',
    'params': {'n_estimators': 100, 'max_depth': 10},
    'metrics': {'accuracy': 0.95, 'f1': 0.93}
}

# Regular print
print(data)

# Pretty print
pprint.pprint(data, indent=2)
```

### Debugging with f-strings

```python
# Useful f-string debugging (Python 3.8+)
x = 10
y = 20
result = x + y

# Show variable name and value
print(f"{x=}, {y=}, {result=}")
# Output: x=10, y=20, result=30

# With expressions
print(f"{len(my_list)=}")
print(f"{max(values)=}")
```

---

## Python Debugger (pdb)

### Basic Usage

```python
import pdb

def buggy_function(data):
    processed = []
    for item in data:
        # Set breakpoint
        pdb.set_trace()  # Execution pauses here
        
        result = item * 2
        processed.append(result)
    return processed

# Run code - will pause at breakpoint
# data = [1, 2, 3]
# buggy_function(data)
```

### pdb Commands

```python
# Common pdb commands:

# Navigation
# n (next)      - Execute next line
# s (step)      - Step into function
# c (continue)  - Continue execution
# r (return)    - Continue until return
# q (quit)      - Quit debugger

# Inspection
# l (list)      - Show current location
# ll (longlist) - Show current function
# w (where)     - Show stack trace
# p expr        - Print expression
# pp expr       - Pretty-print expression

# Variables
# a (args)      - Print function arguments
# whatis expr   - Print type of expression

# Breakpoints
# b line_no     - Set breakpoint at line
# b func        - Set breakpoint at function
# cl (clear)    - Clear breakpoints
# disable       - Disable breakpoint
# enable        - Enable breakpoint

# Example debugging session:
"""
> /path/to/file.py(10)buggy_function()
-> result = item * 2
(Pdb) p item
1
(Pdb) p result
*** NameError: name 'result' is not defined
(Pdb) n
> /path/to/file.py(11)buggy_function()
-> processed.append(result)
(Pdb) p result
2
(Pdb) c
"""
```

### Post-Mortem Debugging

```python
import pdb

def divide(a, b):
    return a / b

try:
    result = divide(10, 0)
except Exception:
    # Start debugger at exception
    pdb.post_mortem()
    
# Or automatic post-mortem:
import sys
sys.excepthook = lambda *args: pdb.post_mortem(args[2])
```

### Conditional Breakpoints

```python
import pdb

for i in range(100):
    if i == 50:  # Only break at specific condition
        pdb.set_trace()
    
    result = process(i)
```

### breakpoint() (Python 3.7+)

```python
# Modern way - cleaner
def function():
    x = 10
    y = 20
    breakpoint()  # Instead of pdb.set_trace()
    return x + y

# Can be disabled via environment variable
# PYTHONBREAKPOINT=0 python script.py
```

---

## IDE Debugging

### VS Code Debugging

```json
// .vscode/launch.json
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
            "name": "Python: Debug Tests",
            "type": "python",
            "request": "launch",
            "module": "pytest",
            "args": ["-v"],
            "console": "integratedTerminal"
        }
    ]
}
```

### PyCharm Debugging

- Click left gutter to set breakpoints
- Right-click breakpoint for conditions
- Debug button or Shift+F9
- Step Over (F8), Step Into (F7), Step Out (Shift+F8)
- Evaluate Expression (Alt+F8)

---

## Logging

### Basic Logging

```python
import logging

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

def train_model(X, y):
    logger.debug(f"Training with X shape: {X.shape}")
    logger.info("Starting model training...")
    
    # Training code
    model = fit(X, y)
    
    logger.info("Training completed")
    logger.debug(f"Model parameters: {model.get_params()}")
    
    return model
```

### Logging Levels

```python
import logging

logger = logging.getLogger(__name__)

# Severity levels (increasing)
logger.debug("Detailed debug information")        # DEBUG
logger.info("General information")                 # INFO
logger.warning("Warning message")                  # WARNING
logger.error("Error occurred")                     # ERROR
logger.critical("Critical error!")                 # CRITICAL

# Set level
logger.setLevel(logging.INFO)  # Only INFO and above
```

### File Logging

```python
import logging

# Log to file
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('training.log'),
        logging.StreamHandler()  # Also print to console
    ]
)

logger = logging.getLogger(__name__)

logger.info("Training started")
# ... training code ...
logger.info("Training completed")
```

### Structured Logging

```python
import logging
import json

class JSONFormatter(logging.Formatter):
    def format(self, record):
        log_data = {
            'timestamp': self.formatTime(record),
            'level': record.levelname,
            'message': record.getMessage(),
            'module': record.module,
            'function': record.funcName
        }
        return json.dumps(log_data)

logger = logging.getLogger(__name__)
handler = logging.StreamHandler()
handler.setFormatter(JSONFormatter())
logger.addHandler(handler)

logger.info("Structured log message")
```

---

## Debugging ML Models

### Check Data

```python
import pandas as pd
import numpy as np

def debug_data(df):
    """Comprehensive data debugging"""
    print("=== DATA DEBUG INFO ===")
    
    # Shape
    print(f"Shape: {df.shape}")
    
    # Types
    print("\nData types:")
    print(df.dtypes)
    
    # Missing values
    print("\nMissing values:")
    print(df.isnull().sum())
    
    # Statistics
    print("\nStatistics:")
    print(df.describe())
    
    # Memory usage
    print("\nMemory usage:")
    print(df.memory_usage(deep=True))
    
    # Duplicates
    print(f"\nDuplicates: {df.duplicated().sum()}")
    
    # Class balance (if target exists)
    if 'target' in df.columns:
        print("\nTarget distribution:")
        print(df['target'].value_counts())
    
    return df

# Usage
df = pd.read_csv('data.csv')
df = debug_data(df)
```

### Check Model

```python
from sklearn.ensemble import RandomForestClassifier
import numpy as np

def debug_model(model, X, y):
    """Debug ML model"""
    print("=== MODEL DEBUG INFO ===")
    
    # Model type
    print(f"Model: {type(model).__name__}")
    
    # Parameters
    print("\nParameters:")
    for param, value in model.get_params().items():
        print(f"  {param}: {value}")
    
    # Input shapes
    print(f"\nX shape: {X.shape}")
    print(f"y shape: {y.shape}")
    
    # Feature importance (if available)
    if hasattr(model, 'feature_importances_'):
        print("\nTop 5 features:")
        importances = model.feature_importances_
        indices = np.argsort(importances)[::-1][:5]
        for i, idx in enumerate(indices):
            print(f"  {i+1}. Feature {idx}: {importances[idx]:.4f}")
    
    # Predictions sample
    if hasattr(model, 'predict'):
        sample_pred = model.predict(X[:5])
        print(f"\nSample predictions: {sample_pred}")
        print(f"Sample truth: {y[:5]}")
    
    return model

# Usage
model = RandomForestClassifier()
model.fit(X_train, y_train)
debug_model(model, X_train, y_train)
```

### Debug Training

```python
from sklearn.model_selection import learning_curve
import matplotlib.pyplot as plt

def plot_learning_curve(model, X, y):
    """Visualize learning curve for debugging"""
    train_sizes, train_scores, val_scores = learning_curve(
        model, X, y, cv=5, n_jobs=-1,
        train_sizes=np.linspace(0.1, 1.0, 10),
        scoring='accuracy'
    )
    
    train_mean = train_scores.mean(axis=1)
    train_std = train_scores.std(axis=1)
    val_mean = val_scores.mean(axis=1)
    val_std = val_scores.std(axis=1)
    
    plt.figure(figsize=(10, 6))
    plt.plot(train_sizes, train_mean, label='Training score')
    plt.fill_between(train_sizes, train_mean - train_std,
                     train_mean + train_std, alpha=0.1)
    plt.plot(train_sizes, val_mean, label='Validation score')
    plt.fill_between(train_sizes, val_mean - val_std,
                     val_mean + val_std, alpha=0.1)
    plt.xlabel('Training Size')
    plt.ylabel('Score')
    plt.title('Learning Curve')
    plt.legend()
    plt.grid(True)
    
    # Diagnose
    if train_mean[-1] > val_mean[-1] + 0.1:
        print("WARNING: Possible overfitting")
    if train_mean[-1] < 0.7:
        print("WARNING: Possible underfitting")
    
    plt.show()
```

---

## Common Issues

### NaN/Inf Values

```python
import numpy as np

def check_nan_inf(data, name="data"):
    """Check for NaN and Inf values"""
    if isinstance(data, np.ndarray):
        nan_count = np.isnan(data).sum()
        inf_count = np.isinf(data).sum()
    else:  # pandas
        nan_count = data.isnull().sum().sum()
        inf_count = np.isinf(data.select_dtypes(include=[np.number])).sum().sum()
    
    if nan_count > 0:
        print(f"WARNING: {nan_count} NaN values in {name}")
    if inf_count > 0:
        print(f"WARNING: {inf_count} Inf values in {name}")
    
    return nan_count == 0 and inf_count == 0

# Usage
X_train = ...
if not check_nan_inf(X_train, "X_train"):
    # Handle NaN/Inf
    X_train = np.nan_to_num(X_train)
```

### Shape Mismatches

```python
def check_shapes(X, y, X_test=None):
    """Verify data shapes"""
    print(f"X_train shape: {X.shape}")
    print(f"y_train shape: {y.shape}")
    
    if X.shape[0] != y.shape[0]:
        raise ValueError(f"Shape mismatch: X has {X.shape[0]} samples, y has {y.shape[0]}")
    
    if X_test is not None:
        print(f"X_test shape: {X_test.shape}")
        if X.shape[1] != X_test.shape[1]:
            raise ValueError(f"Feature mismatch: X_train has {X.shape[1]} features, X_test has {X_test.shape[1]}")
    
    print("✓ Shapes OK")
```

### Memory Issues

```python
import sys

def check_memory(obj, name="object"):
    """Check object memory usage"""
    size = sys.getsizeof(obj)
    
    if size > 1e9:  # > 1GB
        print(f"WARNING: {name} uses {size/1e9:.2f} GB")
    else:
        print(f"{name} uses {size/1e6:.2f} MB")
    
    return size

# Usage
import numpy as np
X = np.random.rand(10000, 1000)
check_memory(X, "X_train")
```

---

## Practice Exercises

### Exercise 1: Debug Failing Model
```python
# Given a model that performs poorly:
# 1. Check data quality
# 2. Verify preprocessing
# 3. Inspect features
# 4. Check for data leakage
# 5. Plot learning curves
```

### Exercise 2: Find Bug with pdb
```python
# Use pdb to find bug in:
def preprocess(data):
    # Some complex preprocessing
    # with a subtle bug
    pass
```

### Exercise 3: Add Logging
```python
# Add comprehensive logging to:
# - Data loading
# - Preprocessing
# - Training
# - Evaluation
```

---

## Key Takeaways

1. **Print debugging**: Quick for simple issues
2. **pdb**: Powerful for complex bugs
3. **IDE debuggers**: Best user experience
4. **Logging**: Essential for production
5. **Check data**: Most ML bugs are data issues
6. **Visualize**: Learning curves, distributions
7. **Assertions**: Verify assumptions
8. **Document**: Known issues and fixes

---

## 🔗 Navigation

- **Previous**: [03 - Jupyter Notebooks](./03-Jupyter-Notebooks.md)
- **Next**: [05 - Performance Optimization](./05-Performance-Optimization.md)
- **Up**: [2.5 Best Practices](./README.md)
