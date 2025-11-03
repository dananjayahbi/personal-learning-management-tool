# 2.5 Python Best Practices for ML

## 📋 Overview

Writing clean, efficient, and maintainable code is crucial for professional ML projects. This section covers best practices, tools, and techniques used by experienced ML engineers to build production-ready systems.

**Why Best Practices Matter:**
- 🐛 **Fewer Bugs**: Catch errors early
- 🚀 **Better Performance**: Optimize bottlenecks
- 👥 **Team Collaboration**: Readable, maintainable code
- 🔄 **Reproducibility**: Others can replicate your results
- 📈 **Scalability**: Code that grows with your project

---

## 🎯 Learning Objectives

- Structure ML projects professionally
- Manage dependencies and environments
- Use Jupyter notebooks effectively
- Debug complex issues efficiently
- Profile and optimize performance
- Write clean, documented code
- Follow Python conventions (PEP 8)

---

## 📚 Topics

### [01 - Code Organization](./01-Code-Organization.md)
**Professional Project Structure**

**Topics**:
- ML project folder structure
- Modules and packages
- Separating code, data, and notebooks
- Configuration management
- Naming conventions
- Import best practices

**Example Structure**:
```
ml-project/
├── data/
│   ├── raw/
│   ├── processed/
│   └── external/
├── notebooks/
│   ├── 01-exploration.ipynb
│   └── 02-modeling.ipynb
├── src/
│   ├── __init__.py
│   ├── data/
│   │   ├── __init__.py
│   │   └── preprocessing.py
│   ├── features/
│   │   ├── __init__.py
│   │   └── engineering.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── train.py
│   └── visualization/
│       ├── __init__.py
│       └── plots.py
├── tests/
├── requirements.txt
├── setup.py
└── README.md
```

**Time**: 0.5 days | **Exercises**: 3

---

### [02 - Virtual Environments](./02-Virtual-Environments.md)
**Dependency Management**

**Topics**:
- Why virtual environments?
- Creating environments (venv, conda)
- Managing dependencies (requirements.txt, environment.yml)
- pip vs conda
- Best practices for reproducibility

**Commands**:
```bash
# venv
python -m venv ml-env
source ml-env/bin/activate  # Linux/Mac
ml-env\Scripts\activate     # Windows

# conda
conda create -n ml-env python=3.10
conda activate ml-env
conda install numpy pandas scikit-learn

# Freeze dependencies
pip freeze > requirements.txt
conda env export > environment.yml
```

**Time**: 0.5 days | **Exercises**: 2

---

### [03 - Jupyter Notebooks](./03-Jupyter-Notebooks.md)
**Effective Interactive Development**

**Topics**:
- When to use notebooks vs scripts
- Organizing notebook structure
- Magic commands (`%timeit`, `%prun`, `%debug`)
- Best practices and pitfalls
- Converting notebooks to scripts
- Notebook extensions
- JupyterLab features

**Best Practices**:
- One analysis question per notebook
- Clear markdown explanations
- Restart and run all before sharing
- Don't use notebooks for production code
- Version control notebooks (nbdime)

**Time**: 0.5 days | **Exercises**: 2

---

### [04 - Debugging Techniques](./04-Debugging-Techniques.md)
**Finding and Fixing Bugs**

**Topics**:
- Print debugging (when it's okay)
- Python debugger (pdb)
- IDE debugging (VS Code, PyCharm)
- Logging best practices
- Common error patterns
- Stack trace interpretation
- Debugging NumPy/Pandas issues

**Debugging Tools**:
```python
# pdb
import pdb; pdb.set_trace()

# IPython debugger
from IPython import embed; embed()

# Logging
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.info("Processing data...")

# Post-mortem debugging
import sys
import pdb
import traceback

try:
    # code
except:
    type, value, tb = sys.exc_info()
    traceback.print_exc()
    pdb.post_mortem(tb)
```

**Time**: 1 day | **Exercises**: 3

---

### [05 - Performance Optimization](./05-Performance-Optimization.md)
**Making Code Faster**

**Topics**:
- Profiling with timeit and cProfile
- Identifying bottlenecks
- Vectorization strategies
- Memory profiling
- Numba JIT compilation
- Parallel processing (multiprocessing, joblib)
- Dask for large datasets
- When to optimize (premature optimization)

**Profiling Example**:
```python
# Simple timing
%timeit function_call()

# Detailed profiling
%prun -s cumulative function_call()

# Line profiler
%load_ext line_profiler
%lprun -f function_name function_call()

# Memory profiler
%load_ext memory_profiler
%memit function_call()
```

**Time**: 1 day | **Exercises**: 4

---

### [06 - Memory Management](./06-Memory-Management.md)
**Efficient Memory Usage**

**Topics**:
- Understanding Python memory model
- Monitoring memory usage
- Memory leaks and how to find them
- Efficient data types
- Generator expressions
- Chunking large datasets
- Memory-mapped files
- Garbage collection

**Memory Optimization**:
```python
# Check memory usage
import sys
sys.getsizeof(object)

# Use generators
data = (x**2 for x in range(1000000))  # Generator
# vs
data = [x**2 for x in range(1000000)]  # List

# Process in chunks
for chunk in pd.read_csv('large.csv', chunksize=10000):
    process(chunk)

# Use appropriate dtypes
df['int_col'] = df['int_col'].astype('int32')  # vs int64
df['cat_col'] = df['cat_col'].astype('category')
```

**Time**: 0.5 days | **Exercises**: 3

---

## 🏆 Professional Coding Standards

### PEP 8 Style Guide Highlights

```python
# Good variable names
user_count = 10
MAX_ITERATIONS = 1000
learning_rate = 0.01

# Good function names
def calculate_accuracy(predictions, labels):
    pass

def preprocess_text(text):
    pass

# Good class names
class NeuralNetwork:
    pass

class DataLoader:
    pass

# Bad names
x = 10  # What is x?
func1()  # What does this do?
a, b, c = load_data()  # Unclear

# Good docstrings
def train_model(X, y, epochs=100):
    """
    Train a machine learning model.
    
    Parameters
    ----------
    X : numpy.ndarray, shape (n_samples, n_features)
        Training data
    y : numpy.ndarray, shape (n_samples,)
        Target values
    epochs : int, default=100
        Number of training epochs
        
    Returns
    -------
    model : object
        Trained model
    history : dict
        Training history with losses and metrics
    """
    pass
```

### Type Hints (Python 3.5+)

```python
from typing import List, Tuple, Dict, Optional
import numpy as np

def process_data(
    data: np.ndarray, 
    labels: List[int], 
    batch_size: int = 32
) -> Tuple[np.ndarray, np.ndarray]:
    """Process data with type hints."""
    pass

def load_config(path: str) -> Dict[str, any]:
    """Load configuration file."""
    pass

def find_user(user_id: int) -> Optional[dict]:
    """Find user by ID, return None if not found."""
    pass
```

---

## 🔧 Essential Tools

### 1. **Code Formatting**
```bash
# Black - uncompromising formatter
pip install black
black script.py

# autopep8 - PEP 8 compliant
pip install autopep8
autopep8 --in-place script.py
```

### 2. **Linting**
```bash
# pylint - comprehensive linter
pip install pylint
pylint script.py

# flake8 - fast and simple
pip install flake8
flake8 script.py
```

### 3. **Type Checking**
```bash
# mypy - static type checker
pip install mypy
mypy script.py
```

### 4. **Testing**
```bash
# pytest - testing framework
pip install pytest
pytest tests/
```

---

## 📝 Complete Example: ML Project

```python
# src/models/train.py
"""Model training module."""

import logging
from typing import Tuple, Dict
import numpy as np
from sklearn.model_selection import train_test_split

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class ModelTrainer:
    """Train and evaluate machine learning models."""
    
    def __init__(self, model, config: Dict):
        """
        Initialize trainer.
        
        Parameters
        ----------
        model : object
            Model with fit/predict methods
        config : dict
            Training configuration
        """
        self.model = model
        self.config = config
        self.history = []
        logger.info(f"Initialized {self.__class__.__name__}")
    
    def train(
        self, 
        X: np.ndarray, 
        y: np.ndarray, 
        validation_split: float = 0.2
    ) -> Tuple[object, Dict]:
        """
        Train model with validation.
        
        Parameters
        ----------
        X : np.ndarray
            Training features
        y : np.ndarray
            Training labels
        validation_split : float, default=0.2
            Fraction of data for validation
            
        Returns
        -------
        model : object
            Trained model
        history : dict
            Training history
        """
        logger.info(f"Training on {len(X)} samples")
        
        # Split data
        X_train, X_val, y_train, y_val = train_test_split(
            X, y, test_size=validation_split, random_state=42
        )
        
        # Train model
        self.model.fit(X_train, y_train)
        
        # Evaluate
        train_score = self.model.score(X_train, y_train)
        val_score = self.model.score(X_val, y_val)
        
        history = {
            'train_score': train_score,
            'val_score': val_score
        }
        self.history.append(history)
        
        logger.info(f"Train score: {train_score:.4f}")
        logger.info(f"Val score: {val_score:.4f}")
        
        return self.model, history
    
    def save_model(self, path: str) -> None:
        """Save trained model to disk."""
        import joblib
        joblib.dump(self.model, path)
        logger.info(f"Model saved to {path}")


# Example usage
if __name__ == "__main__":
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.datasets import make_classification
    
    # Generate data
    X, y = make_classification(n_samples=1000, n_features=20, random_state=42)
    
    # Create trainer
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    config = {'learning_rate': 0.01, 'epochs': 100}
    trainer = ModelTrainer(model, config)
    
    # Train
    trained_model, history = trainer.train(X, y)
    
    # Save
    trainer.save_model('model.pkl')
```

---

## 🎓 Learning Path

### Day 1: Organization & Environments
- [ ] Learn project structure
- [ ] Set up virtual environment
- [ ] Create requirements.txt
- [ ] Exercise: Structure existing project

### Day 2: Jupyter & Debugging
- [ ] Master Jupyter magic commands
- [ ] Learn pdb debugger
- [ ] Set up logging
- [ ] Exercise: Debug provided code

### Day 3: Performance
- [ ] Profile code with timeit
- [ ] Identify bottlenecks
- [ ] Optimize with vectorization
- [ ] Exercise: Speed up slow code

---

## 📝 Exercises

### Code Organization (3)
1. Structure ML project from scratch
2. Refactor messy codebase
3. Create reusable package

### Virtual Environments (2)
4. Set up conda environment
5. Create reproducible requirements

### Jupyter Notebooks (2)
6. Use magic commands effectively
7. Convert notebook to script

### Debugging (3)
8. Debug with pdb
9. Set up logging system
10. Fix provided buggy code

### Performance (4)
11. Profile and optimize function
12. Vectorize loops
13. Use Numba for speedup
14. Parallelize computation

### Memory (3)
15. Find memory leak
16. Optimize memory usage
17. Process large file in chunks

---

## ✅ Completion Checklist

- [ ] Structure professional ML project
- [ ] Use virtual environments
- [ ] Master Jupyter notebooks
- [ ] Debug code efficiently
- [ ] Profile and optimize code
- [ ] Manage memory effectively
- [ ] Follow PEP 8 guidelines
- [ ] Write clean documentation
- [ ] Complete 17 exercises

**Time Estimate**: 12-15 hours

---

## 🔗 Resources

### Documentation
- [PEP 8 Style Guide](https://pep8.org/)
- [Python Logging](https://docs.python.org/3/library/logging.html)
- [pdb Debugger](https://docs.python.org/3/library/pdb.html)

### Books
- "Clean Code" by Robert C. Martin
- "Effective Python" by Brett Slatkin
- "Python Best Practices" by Various

### Tools
- Black, autopep8, flake8, pylint
- pytest, coverage
- Jupyter, JupyterLab

---

## 🚀 Next Steps

- Complete **Phase 0: Prerequisites**
- Move to **Phase 1: Machine Learning**
- Build portfolio projects

---

## 🎯 Quick Reference

```python
# Virtual environment
python -m venv env
source env/bin/activate

# Dependencies
pip freeze > requirements.txt
pip install -r requirements.txt

# Debugging
import pdb; pdb.set_trace()

# Logging
import logging
logger = logging.getLogger(__name__)

# Profiling
%timeit function()
%prun -s cumulative function()

# Memory
import sys
sys.getsizeof(obj)
```

---

**Remember**: Good code is read more than it's written. Invest in quality!

## 🔗 Navigation

- **Previous**: [2.4 SciPy](../2.4-SciPy-Scientific-Computing/README.md)
- **Next**: [Chapter 3: Development Environment](../../Chapter-3-Development-Environment/README.md)
- **Up**: [Chapter 2: Python for AI/ML](../README.md)
