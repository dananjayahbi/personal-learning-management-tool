# 06 - Best Practices for Jupyter Notebooks

## 📋 Introduction

While Jupyter notebooks are powerful for data exploration and ML experimentation, following best practices ensures your work is reproducible, maintainable, and shareable. This guide covers essential practices for professional notebook development.

**Why Best Practices Matter:**
- ✅ Reproducibility
- ✅ Collaboration
- ✅ Version control
- ✅ Code quality
- ✅ Performance
- ✅ Professionalism

---

## 📐 Notebook Structure

### Recommended Organization

```python
# 1. TITLE AND DESCRIPTION
"""
Notebook: Customer Churn Prediction
Author: Your Name
Date: 2024-01-15
Description: Predict customer churn using Random Forest
"""

# 2. IMPORTS
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# 3. CONFIGURATION
RANDOM_STATE = 42
TEST_SIZE = 0.2
DATA_PATH = 'data/customers.csv'

# 4. HELPER FUNCTIONS
def load_and_preprocess(path):
    """Load and preprocess data"""
    df = pd.read_csv(path)
    # preprocessing steps
    return df

# 5. MAIN WORKFLOW
# Load data
# EDA
# Feature engineering
# Model training
# Evaluation
# Results

# 6. CONCLUSIONS
# Summary of findings
# Next steps
```

### Section Organization

Use Markdown headers to structure:

```markdown
# 1. Introduction

Brief overview of the problem and goals.

# 2. Setup

Import libraries and configure settings.

# 3. Data Loading

Load and inspect initial data.

# 4. Exploratory Data Analysis

Visualizations and statistics.

# 5. Data Preprocessing

Cleaning and feature engineering.

# 6. Model Training

Train and tune models.

# 7. Evaluation

Metrics and analysis.

# 8. Conclusions

Summary and next steps.
```

---

## 📝 Cell Organization

### One Concept Per Cell

**❌ Bad:**
```python
# Too much in one cell
df = pd.read_csv('data.csv')
df = df.dropna()
df['new_feature'] = df['a'] + df['b']
X_train, X_test, y_train, y_test = train_test_split(X, y)
model = RandomForestClassifier()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, predictions)}")
```

**✅ Good:**
```python
# Cell 1: Load data
df = pd.read_csv('data.csv')
print(f"Loaded {len(df)} rows")
```

```python
# Cell 2: Clean data
df_clean = df.dropna()
print(f"After cleaning: {len(df_clean)} rows")
```

```python
# Cell 3: Feature engineering
df_clean['new_feature'] = df_clean['a'] + df_clean['b']
df_clean.head()
```

### Cell Output Guidelines

**Keep outputs clean:**

```python
# ✅ Clear, informative output
print(f"Training samples: {len(X_train)}")
print(f"Test samples: {len(X_test)}")
print(f"Features: {X_train.shape[1]}")
```

```python
# ❌ Overwhelming output
print(X_train)  # Don't print entire array
```

```python
# ✅ Better: Show summary
print(f"X_train shape: {X_train.shape}")
print(f"X_train sample:\n{X_train[:5]}")
```

---

## 🎯 Code Quality

### Follow PEP 8

```python
# ✅ Good: Clear naming, proper spacing
def calculate_metrics(y_true, y_pred):
    """Calculate classification metrics"""
    accuracy = accuracy_score(y_true, y_pred)
    precision = precision_score(y_true, y_pred)
    recall = recall_score(y_true, y_pred)
    return accuracy, precision, recall
```

```python
# ❌ Bad: Poor naming, no spacing
def calc(y,p):
    a=accuracy_score(y,p)
    b=precision_score(y,p)
    c=recall_score(y,p)
    return a,b,c
```

### Use Meaningful Names

```python
# ❌ Bad
df1 = pd.read_csv('file1.csv')
df2 = df1[df1['a'] > 10]
```

```python
# ✅ Good
customers = pd.read_csv('customers.csv')
high_value_customers = customers[customers['total_spend'] > 1000]
```

### Add Docstrings

```python
def train_model(X, y, params=None):
    """
    Train Random Forest classifier.
    
    Args:
        X: Features array/DataFrame
        y: Target array/Series
        params: Dict of hyperparameters (optional)
        
    Returns:
        Trained model object
        
    Example:
        >>> model = train_model(X_train, y_train, {'n_estimators': 100})
    """
    if params is None:
        params = {'n_estimators': 100, 'random_state': 42}
    
    model = RandomForestClassifier(**params)
    model.fit(X, y)
    return model
```

### Type Hints

```python
from typing import Tuple, Dict, Any
import pandas as pd
import numpy as np

def split_data(
    df: pd.DataFrame, 
    target_col: str, 
    test_size: float = 0.2
) -> Tuple[pd.DataFrame, pd.DataFrame, pd.Series, pd.Series]:
    """Split data into train and test sets."""
    X = df.drop(columns=[target_col])
    y = df[target_col]
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=42
    )
    
    return X_train, X_test, y_train, y_test
```

---

## 🔁 Reproducibility

### Set Random Seeds

```python
# At the top of notebook
import random
import numpy as np

RANDOM_STATE = 42

random.seed(RANDOM_STATE)
np.random.seed(RANDOM_STATE)

# For ML libraries
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, random_state=RANDOM_STATE
)
```

### Document Dependencies

```python
# First cell: Version info
import sys
import pandas as pd
import numpy as np
import sklearn

print(f"Python: {sys.version}")
print(f"pandas: {pd.__version__}")
print(f"numpy: {np.__version__}")
print(f"scikit-learn: {sklearn.__version__}")
```

### Use Configuration Cell

```python
# Configuration cell at top
CONFIG = {
    'data_path': 'data/dataset.csv',
    'model_path': 'models/best_model.pkl',
    'random_state': 42,
    'test_size': 0.2,
    'n_estimators': 100,
    'max_depth': 10,
    'batch_size': 32,
    'epochs': 50,
    'learning_rate': 0.001
}

# Use throughout notebook
data = pd.read_csv(CONFIG['data_path'])
model = RandomForestClassifier(
    n_estimators=CONFIG['n_estimators'],
    max_depth=CONFIG['max_depth'],
    random_state=CONFIG['random_state']
)
```

---

## 🧪 Testing in Notebooks

### Add Assertions

```python
# Load data
df = pd.read_csv('data.csv')

# Verify data
assert len(df) > 0, "DataFrame is empty"
assert 'target' in df.columns, "Target column missing"
assert df['target'].isnull().sum() == 0, "Target has null values"

print("✓ Data validation passed")
```

### Test Shapes

```python
# After train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

assert X_train.shape[0] == y_train.shape[0], "Training samples mismatch"
assert X_test.shape[0] == y_test.shape[0], "Test samples mismatch"
assert X_train.shape[1] == X_test.shape[1], "Feature count mismatch"

print(f"✓ Shapes valid: train={X_train.shape}, test={X_test.shape}")
```

### Sanity Checks

```python
# Check predictions
predictions = model.predict(X_test)

assert len(predictions) == len(X_test), "Prediction count mismatch"
assert set(predictions).issubset(set([0, 1])), "Invalid prediction values"

print("✓ Predictions valid")
```

---

## 💾 Saving and Loading

### Save Models

```python
import joblib
from pathlib import Path

# Create models directory
models_dir = Path('models')
models_dir.mkdir(exist_ok=True)

# Save model
model_path = models_dir / 'random_forest_model.pkl'
joblib.dump(model, model_path)
print(f"Model saved to {model_path}")

# Load model
loaded_model = joblib.load(model_path)
```

### Save Intermediate Results

```python
# Save preprocessed data
processed_data_path = 'data/processed/train_data.csv'
df_processed.to_csv(processed_data_path, index=False)
print(f"Processed data saved to {processed_data_path}")

# Save results
results = {
    'accuracy': accuracy,
    'precision': precision,
    'recall': recall,
    'f1': f1_score
}

import json
with open('results/metrics.json', 'w') as f:
    json.dump(results, f, indent=2)
```

---

## 🔄 Version Control

### Git Best Practices

**Use .gitignore:**

```bash
# .gitignore for notebooks

# Jupyter checkpoints
.ipynb_checkpoints/
*/.ipynb_checkpoints/*

# Large data files
*.csv
*.h5
*.pkl
data/

# Model files
models/
*.pt
*.pth
*.onnx

# Output files
results/
outputs/
logs/

# Environment
.env
venv/
env/
```

### Clear Outputs Before Committing

```bash
# Install nbstripout
pip install nbstripout

# Setup for repository
nbstripout --install

# Now outputs are automatically cleared on commit
```

### Use Jupytext

```bash
# Install jupytext
pip install jupytext

# Pair notebook with .py file
jupytext --set-formats ipynb,py:percent notebook.ipynb

# Now you have:
# notebook.ipynb  (for running)
# notebook.py     (for version control)
```

**notebook.py format:**
```python
# %% [markdown]
# # Introduction
# This is a markdown cell

# %% 
# This is a code cell
import pandas as pd
df = pd.read_csv('data.csv')

# %%
# Another code cell
print(len(df))
```

---

## 📊 Visualization Best Practices

### Set Matplotlib Defaults

```python
import matplotlib.pyplot as plt

# Set style
plt.style.use('seaborn-v0_8-darkgrid')

# Set default figure size
plt.rcParams['figure.figsize'] = (12, 6)
plt.rcParams['font.size'] = 12
plt.rcParams['axes.labelsize'] = 14
plt.rcParams['axes.titlesize'] = 16
plt.rcParams['xtick.labelsize'] = 12
plt.rcParams['ytick.labelsize'] = 12
```

### Create Clear Plots

```python
# ✅ Good plot
fig, ax = plt.subplots(figsize=(10, 6))
ax.plot(epochs, train_loss, label='Training Loss', linewidth=2)
ax.plot(epochs, val_loss, label='Validation Loss', linewidth=2)
ax.set_xlabel('Epoch', fontsize=14)
ax.set_ylabel('Loss', fontsize=14)
ax.set_title('Training vs Validation Loss', fontsize=16)
ax.legend(fontsize=12)
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

### Save Figures

```python
from pathlib import Path

# Create figures directory
figures_dir = Path('figures')
figures_dir.mkdir(exist_ok=True)

# Save figure
fig.savefig(
    figures_dir / 'training_loss.png',
    dpi=300,
    bbox_inches='tight',
    facecolor='white'
)
```

---

## ⚡ Performance Best Practices

### Use %%time for Cell Timing

```python
%%time
# Time this cell
large_computation = expensive_function()
```

### Profile Performance

```python
%load_ext line_profiler

def slow_function():
    result = []
    for i in range(10000):
        result.append(i ** 2)
    return result

%lprun -f slow_function slow_function()
```

### Optimize Memory

```python
# Check memory usage
import sys

print(f"DataFrame memory: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")

# Optimize dtypes
df['category_col'] = df['category_col'].astype('category')
df['int_col'] = pd.to_numeric(df['int_col'], downcast='integer')

print(f"After optimization: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
```

### Use Generators

```python
# ❌ Memory intensive
data = [process(x) for x in large_dataset]

# ✅ Memory efficient
data = (process(x) for x in large_dataset)
```

---

## 🚨 Common Pitfalls to Avoid

### 1. Running Cells Out of Order

**Problem:** Cells executed in wrong order produce different results.

**Solution:**
- Run "Restart & Run All" before sharing
- Keep notebooks linear
- Avoid backward dependencies

### 2. Hidden State

**Problem:** Variables from deleted cells still in memory.

```python
# Cell 1 (later deleted)
x = 10

# Cell 2
print(x)  # Still works! But shouldn't
```

**Solution:** Restart kernel regularly

### 3. Large Outputs

**Problem:** Massive outputs slow down notebook.

```python
# ❌ Bad
print(df)  # 1 million rows printed
```

```python
# ✅ Good
print(df.head())
print(f"Total rows: {len(df)}")
```

### 4. No Error Handling

```python
# ❌ Bad
df = pd.read_csv('file.csv')
```

```python
# ✅ Good
try:
    df = pd.read_csv('file.csv')
except FileNotFoundError:
    print("Error: file.csv not found")
    print("Please check the path and try again")
    raise
```

### 5. Hardcoded Paths

```python
# ❌ Bad
df = pd.read_csv('C:/Users/John/Desktop/data.csv')
```

```python
# ✅ Good
from pathlib import Path

data_dir = Path('data')
df = pd.read_csv(data_dir / 'data.csv')
```

---

## 📚 Documentation

### Add Markdown Explanations

```markdown
## Data Preprocessing

We perform the following preprocessing steps:

1. **Remove missing values**: Drop rows with NaN in target variable
2. **Encode categoricals**: One-hot encode categorical features
3. **Scale features**: Standardize numerical features using StandardScaler

This preprocessing is essential for the Random Forest model to perform optimally.
```

### Explain Results

```python
# After model evaluation
accuracy = 0.87

print(f"Model Accuracy: {accuracy:.2%}")
print()
print("Interpretation:")
print("- The model correctly predicts 87% of cases")
print("- This is above the baseline of 60%")
print("- Performance is acceptable for production use")
```

### Add TODOs

```python
# TODO: Try XGBoost as alternative model
# TODO: Perform feature selection to reduce dimensionality
# TODO: Add cross-validation
# FIXME: Handle class imbalance
```

---

## 🎯 Notebook vs Script Decision

### Use Notebooks For:
- Exploratory Data Analysis
- Prototyping
- Visualizations
- Teaching/Presentations
- Interactive experiments
- Quick analysis

### Use Scripts For:
- Production pipelines
- Scheduled jobs
- APIs
- Command-line tools
- Automated testing
- Large-scale processing

### Hybrid Approach

```python
# notebook.ipynb - Exploration
import analysis_lib

data = analysis_lib.load_data('data.csv')
results = analysis_lib.run_analysis(data)
analysis_lib.plot_results(results)
```

```python
# analysis_lib.py - Reusable code
def load_data(path):
    """Load and preprocess data"""
    import pandas as pd
    df = pd.read_csv(path)
    df = df.dropna()
    return df

def run_analysis(data):
    """Run statistical analysis"""
    # Analysis code
    return results

def plot_results(results):
    """Visualize results"""
    # Plotting code
```

---

## 🎓 Checklist Before Sharing

- [ ] Restart kernel and run all cells
- [ ] All cells execute without errors
- [ ] Clear unnecessary outputs
- [ ] Add descriptive markdown cells
- [ ] Include requirements/environment
- [ ] Document non-obvious decisions
- [ ] Remove sensitive information
- [ ] Check file paths are relative
- [ ] Test on fresh environment
- [ ] Add README if needed

---

## 🎓 Exercises

### Exercise 1: Refactor Messy Notebook
Take a poorly organized notebook and restructure it following best practices.

### Exercise 2: Add Version Control
Setup jupytext and nbstripout for a notebook project.

### Exercise 3: Create Reusable Library
Extract common functions from notebook into a Python module.

---

## 🎯 Key Takeaways

1. ✅ **Structure notebooks** - Clear sections, one concept per cell
2. ✅ **Reproducibility** - Set seeds, document dependencies
3. ✅ **Version control** - Use .gitignore, clear outputs, try jupytext
4. ✅ **Code quality** - Follow PEP 8, add docstrings
5. ✅ **Test regularly** - Add assertions, sanity checks
6. ✅ **Document well** - Markdown explanations, comments
7. ✅ **Know when to use scripts** - Notebooks for exploration, scripts for production

---

## 🔗 Navigation

- **Up**: [3.3 Jupyter & JupyterLab Overview](./README.md)
- **Previous**: [05 - Extensions and Tools](./05-Extensions-Tools.md)
- **Next**: [3.4 IDEs for ML](../3.4-IDEs-for-ML/README.md)

---

**Remember:** Good notebooks are reproducible, well-documented, and maintainable. Invest time in structure and quality—your future self will thank you!
