# 2.4 SciPy Scientific Computing

## 📋 Overview

SciPy builds on NumPy by adding a collection of algorithms and high-level commands for scientific computing. It's essential for optimization, signal processing, statistical analysis, and implementing custom ML algorithms.

**SciPy Advantages:**
- 🎯 **Optimization**: Minimize/maximize objective functions (loss functions)
- 📊 **Statistics**: Comprehensive statistical tests and distributions
- 🔬 **Scientific**: Integration, interpolation, signal processing
- ⚡ **Performance**: Optimized implementations of complex algorithms
- 🔗 **Integration**: Works seamlessly with NumPy and Pandas

---

## 🎯 Learning Objectives

- Optimize objective functions for ML
- Work with statistical distributions and tests
- Perform interpolation and integration
- Apply signal processing techniques
- Use sparse matrices efficiently
- Understand linear algebra extensions

---

## 📚 Topics

### [01 - Optimization](./01-Optimization.md)
**Minimizing and Maximizing Functions**

**Topics**:
- Function minimization (`minimize()`)
- Constraint optimization
- Root finding
- Curve fitting (`curve_fit()`)
- Least squares optimization
- Gradient-free optimizers
- Application to ML loss functions

**Key Functions**: `minimize()`, `minimize_scalar()`, `curve_fit()`, `least_squares()`, `root()`

**Use Cases**: Training custom models, hyperparameter tuning, curve fitting

**Time**: 1 day | **Exercises**: 5

---

### [02 - Linear Algebra Extensions](./02-Linear-Algebra-Extensions.md)
**Beyond NumPy's linalg**

**Topics**:
- Sparse matrices (CSR, CSC, COO formats)
- Sparse linear algebra
- Advanced decompositions
- Matrix functions (exponential, logarithm)
- Efficient large-scale operations

**Key Functions**: `sparse.csr_matrix()`, `linalg.expm()`, `sparse.linalg.spsolve()`

**Use Cases**: Large-scale ML, graph algorithms, NLP

**Time**: 0.5 days | **Exercises**: 3

---

### [03 - Statistical Functions](./03-Statistical-Functions.md)
**Probability and Statistics**

**Topics**:
- Probability distributions (normal, binomial, poisson, etc.)
- Statistical tests (t-test, chi-square, ANOVA)
- Descriptive statistics
- Probability density/mass functions
- Random sampling from distributions
- Hypothesis testing

**Key Functions**: `stats.norm()`, `stats.ttest_ind()`, `stats.chi2_contingency()`, `stats.kstest()`

**Use Cases**: A/B testing, feature selection, model evaluation

**Time**: 1 day | **Exercises**: 4

---

### [04 - Interpolation & Integration](./04-Interpolation-Integration.md)
**Continuous Functions from Discrete Data**

**Topics**:
- 1D interpolation (linear, cubic, spline)
- 2D interpolation
- Integration (numerical quadrature)
- Differential equation solving
- Interpolating missing values

**Key Functions**: `interp1d()`, `griddata()`, `quad()`, `odeint()`

**Use Cases**: Data smoothing, gap filling, physics simulations

**Time**: 0.5 days | **Exercises**: 3

---

### [05 - Signal Processing](./05-Signal-Processing.md)
**Filtering and Frequency Analysis**

**Topics**:
- Filtering (lowpass, highpass, bandpass)
- Fourier transforms (FFT)
- Spectral analysis
- Convolution and correlation
- Window functions
- Savitzky-Golay filter

**Key Functions**: `butter()`, `filtfilt()`, `fft()`, `spectrogram()`, `correlate()`

**Use Cases**: Time series preprocessing, audio processing, feature extraction

**Time**: 1 day | **Exercises**: 5

---

## 🔧 Common SciPy Patterns

### Pattern 1: Optimize Custom Loss Function
```python
from scipy.optimize import minimize
import numpy as np

# Define loss function (e.g., for linear regression)
def loss_function(params, X, y):
    predictions = X @ params
    mse = np.mean((y - predictions) ** 2)
    return mse

# Optimize
X = np.random.randn(100, 5)
y = X @ np.array([1, 2, 3, 4, 5]) + np.random.randn(100)
initial_params = np.zeros(5)
result = minimize(loss_function, initial_params, args=(X, y))
optimal_params = result.x
print(f"Optimal parameters: {optimal_params}")
```

### Pattern 2: Statistical Testing
```python
from scipy import stats

# T-test comparing two groups
group_a = np.random.normal(100, 15, 100)
group_b = np.random.normal(105, 15, 100)
t_stat, p_value = stats.ttest_ind(group_a, group_b)

if p_value < 0.05:
    print("Significant difference detected!")
else:
    print("No significant difference")
```

### Pattern 3: Curve Fitting
```python
from scipy.optimize import curve_fit

# Define model
def exponential_model(x, a, b, c):
    return a * np.exp(-b * x) + c

# Generate noisy data
x_data = np.linspace(0, 4, 50)
y_data = exponential_model(x_data, 2.5, 1.3, 0.5) + np.random.normal(0, 0.2, 50)

# Fit curve
params, covariance = curve_fit(exponential_model, x_data, y_data)
print(f"Fitted parameters: {params}")
```

### Pattern 4: Work with Sparse Matrices
```python
from scipy.sparse import csr_matrix, linalg as sparse_linalg

# Create sparse matrix (e.g., for large datasets)
data = [1, 2, 3, 4, 5, 6]
row_ind = [0, 0, 1, 2, 2, 2]
col_ind = [0, 2, 2, 0, 1, 2]
sparse_matrix = csr_matrix((data, (row_ind, col_ind)), shape=(3, 3))

# Efficient operations
result = sparse_matrix @ np.array([1, 2, 3])
print(result)
```

---

## 🏆 Real-World Applications

### 1. **Custom Model Training**
```python
from scipy.optimize import minimize

def logistic_loss(params, X, y):
    """Logistic regression loss"""
    z = X @ params
    predictions = 1 / (1 + np.exp(-z))
    loss = -np.mean(y * np.log(predictions) + (1 - y) * np.log(1 - predictions))
    return loss

# Train model
result = minimize(logistic_loss, initial_params, args=(X_train, y_train))
optimal_weights = result.x
```

### 2. **A/B Test Analysis**
```python
from scipy import stats

# Compare conversion rates
conversions_a = [1, 0, 1, 1, 0, 1, 0, 0, 1, 1]  # Control
conversions_b = [1, 1, 1, 1, 0, 1, 1, 1, 1, 1]  # Treatment

chi2, p_value = stats.chi2_contingency([[sum(conversions_a), len(conversions_a) - sum(conversions_a)],
                                         [sum(conversions_b), len(conversions_b) - sum(conversions_b)]])[:2]

print(f"P-value: {p_value}")
```

### 3. **Time Series Smoothing**
```python
from scipy.signal import savgol_filter

# Smooth noisy time series
smoothed = savgol_filter(noisy_signal, window_length=51, polyorder=3)
```

### 4. **Feature Importance (Statistical)**
```python
from scipy.stats import chi2_contingency

# Chi-square test for categorical feature importance
for feature in categorical_features:
    contingency_table = pd.crosstab(df[feature], df['target'])
    chi2, p_value, _, _ = chi2_contingency(contingency_table)
    print(f"{feature}: p-value = {p_value}")
```

---

## 📊 SciPy vs Other Libraries

| Task | SciPy | NumPy | Scikit-learn |
|------|-------|-------|--------------|
| Optimization | ⚡⚡⚡ | ⚡ | ⚡⚡ |
| Statistics | ⚡⚡⚡ | ⚡ | ⚡⚡ |
| Linear algebra | ⚡⚡⚡ | ⚡⚡⚡ | - |
| Signal processing | ⚡⚡⚡ | ⚡ | - |
| ML algorithms | - | - | ⚡⚡⚡ |
| Integration | ⚡⚡⚡ | - | - |

---

## 🎓 Learning Path

### Day 1: Optimization
- [ ] Learn `minimize()` function
- [ ] Optimize custom loss functions
- [ ] Apply curve fitting
- [ ] Exercise: Train custom linear regression

### Day 2: Statistics
- [ ] Work with distributions
- [ ] Perform statistical tests
- [ ] Conduct hypothesis testing
- [ ] Exercise: A/B test analysis

### Day 3: Signal & Integration
- [ ] Apply filters to signals
- [ ] Perform FFT analysis
- [ ] Use interpolation
- [ ] Exercise: Smooth time series data

---

## 📝 Exercises

### Optimization (5 exercises)
1. Minimize quadratic function
2. Find optimal parameters for exponential curve
3. Implement gradient descent using SciPy
4. Solve constrained optimization problem
5. Train logistic regression from scratch

### Statistics (4 exercises)
6. Generate samples from various distributions
7. Perform t-test and interpret results
8. Conduct chi-square test for independence
9. Calculate confidence intervals

### Signal Processing (5 exercises)
10. Apply lowpass filter to noisy signal
11. Compute FFT and plot frequency spectrum
12. Detect peaks in signal
13. Cross-correlate two signals
14. Design and apply custom filter

### Integration & Interpolation (3 exercises)
15. Interpolate missing data points
16. Integrate function numerically
17. Create smooth curve through data points

---

## 🧪 Mini-Project: Custom ML Algorithm

**Goal**: Implement ML algorithm using SciPy optimization

```python
import numpy as np
from scipy.optimize import minimize
from scipy import stats
import matplotlib.pyplot as plt

class CustomLogisticRegression:
    def __init__(self, penalty='l2', C=1.0):
        self.penalty = penalty
        self.C = C
        self.weights = None
    
    def _loss(self, weights, X, y):
        """Compute regularized logistic loss"""
        z = X @ weights
        predictions = 1 / (1 + np.exp(-np.clip(z, -500, 500)))
        
        # Cross-entropy loss
        epsilon = 1e-15
        predictions = np.clip(predictions, epsilon, 1 - epsilon)
        loss = -np.mean(y * np.log(predictions) + (1 - y) * np.log(1 - predictions))
        
        # Add regularization
        if self.penalty == 'l2':
            loss += (1 / (2 * self.C)) * np.sum(weights[1:] ** 2)
        elif self.penalty == 'l1':
            loss += (1 / self.C) * np.sum(np.abs(weights[1:]))
        
        return loss
    
    def fit(self, X, y):
        """Train model using scipy.optimize"""
        # Add intercept
        X_with_intercept = np.c_[np.ones(X.shape[0]), X]
        
        # Initialize weights
        initial_weights = np.zeros(X_with_intercept.shape[1])
        
        # Optimize
        result = minimize(
            self._loss,
            initial_weights,
            args=(X_with_intercept, y),
            method='L-BFGS-B'
        )
        
        self.weights = result.x
        return self
    
    def predict_proba(self, X):
        """Predict probabilities"""
        X_with_intercept = np.c_[np.ones(X.shape[0]), X]
        z = X_with_intercept @ self.weights
        return 1 / (1 + np.exp(-np.clip(z, -500, 500)))
    
    def predict(self, X, threshold=0.5):
        """Predict classes"""
        return (self.predict_proba(X) >= threshold).astype(int)

# Test the model
np.random.seed(42)
X = np.random.randn(1000, 5)
y = (X @ np.array([1, -1, 0.5, -0.5, 1]) + np.random.randn(1000) > 0).astype(int)

# Split data
split = int(0.8 * len(X))
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

# Train and evaluate
model = CustomLogisticRegression(penalty='l2', C=1.0)
model.fit(X_train, y_train)

train_acc = np.mean(model.predict(X_train) == y_train)
test_acc = np.mean(model.predict(X_test) == y_test)

print(f"Train accuracy: {train_acc:.3f}")
print(f"Test accuracy: {test_acc:.3f}")
print(f"Weights: {model.weights}")
```

---

## 🔗 Resources

### Documentation
- [SciPy Official Documentation](https://docs.scipy.org/doc/scipy/)
- [SciPy Tutorial](https://docs.scipy.org/doc/scipy/tutorial/)
- [SciPy Cookbook](https://scipy-cookbook.readthedocs.io/)

### Books
- "Elegant SciPy" by Juan Nunez-Iglesias et al.
- "Scientific Computing with Python" by Hemant Kumar Mehta

---

## ✅ Completion Checklist

- [ ] Master optimization techniques
- [ ] Conduct statistical tests
- [ ] Work with sparse matrices
- [ ] Apply signal processing
- [ ] Perform interpolation
- [ ] Complete 20 exercises
- [ ] Build custom ML algorithm

**Time Estimate**: 12-15 hours

---

## 🚀 Next Steps

- Move to **[2.5 Python Best Practices](../2.5-Python-Best-Practices/README.md)**
- Apply SciPy to ML projects
- Implement custom algorithms

---

## 🎯 Quick Reference

```python
# Optimization
from scipy.optimize import minimize
result = minimize(func, x0, args=(), method='BFGS')

# Statistics
from scipy import stats
stats.ttest_ind(a, b)
stats.norm.pdf(x, loc=0, scale=1)

# Sparse matrices
from scipy.sparse import csr_matrix
sparse = csr_matrix((data, (row, col)))

# Signal processing
from scipy.signal import butter, filtfilt
b, a = butter(N=3, Wn=0.1, btype='low')
filtered = filtfilt(b, a, signal)

# Interpolation
from scipy.interpolate import interp1d
f = interp1d(x, y, kind='cubic')
y_new = f(x_new)
```

---

**Remember**: SciPy bridges the gap between NumPy and specialized ML libraries!

## 🔗 Navigation

- **Previous**: [2.3 Visualization](../2.3-Matplotlib-Seaborn-Visualization/README.md)
- **Next**: [2.5 Best Practices](../2.5-Python-Best-Practices/README.md)
- **Up**: [Chapter 2: Python for AI/ML](../README.md)
