# 01 - Optimization with SciPy

## 📋 Table of Contents
- [Introduction](#introduction)
- [Function Minimization](#function-minimization)
- [Constrained Optimization](#constrained-optimization)
- [Curve Fitting](#curve-fitting)
- [Least Squares](#least-squares)
- [Root Finding](#root-finding)
- [Global Optimization](#global-optimization)
- [Optimization in Machine Learning](#optimization-in-machine-learning)
- [Practice Exercises](#practice-exercises)

---

## Introduction

SciPy's `optimize` module provides powerful algorithms for finding minima/maxima of functions, fitting curves, and solving equations - fundamental for machine learning.

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import optimize
import pandas as pd

# Check version
import scipy
print(scipy.__version__)
```

---

## Function Minimization

### Unconstrained Minimization - minimize()

```python
# Define a simple function: f(x) = x^2 + 5*sin(x)
def objective(x):
    return x**2 + 5*np.sin(x)

# Visualize
x = np.linspace(-10, 10, 1000)
y = objective(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y, 'b-', linewidth=2)
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Objective Function: $f(x) = x^2 + 5\sin(x)$')
plt.grid(True)
plt.show()

# Minimize
result = optimize.minimize(objective, x0=0)
print("Optimization Result:")
print(f"Minimum at x = {result.x[0]:.6f}")
print(f"Minimum value = {result.fun:.6f}")
print(f"Success: {result.success}")
print(f"Message: {result.message}")
```

### Different Methods

```python
# Nelder-Mead (default, no derivatives)
result_nm = optimize.minimize(objective, x0=5, method='Nelder-Mead')

# BFGS (quasi-Newton, uses gradient)
result_bfgs = optimize.minimize(objective, x0=5, method='BFGS')

# Powell (conjugate direction)
result_powell = optimize.minimize(objective, x0=5, method='Powell')

# Compare
print("Method Comparison:")
print(f"Nelder-Mead: x={result_nm.x[0]:.4f}, f={result_nm.fun:.4f}, nfev={result_nm.nfev}")
print(f"BFGS: x={result_bfgs.x[0]:.4f}, f={result_bfgs.fun:.4f}, nfev={result_bfgs.nfev}")
print(f"Powell: x={result_powell.x[0]:.4f}, f={result_powell.fun:.4f}, nfev={result_powell.nfev}")
```

### Multi-dimensional Minimization

```python
# Rosenbrock function (famous test function)
def rosenbrock(x):
    """f(x,y) = (a-x)^2 + b(y-x^2)^2"""
    a, b = 1, 100
    return (a - x[0])**2 + b*(x[1] - x[0]**2)**2

# Minimize
x0 = np.array([0, 0])  # Starting point
result = optimize.minimize(rosenbrock, x0, method='BFGS')

print(f"Minimum at: ({result.x[0]:.6f}, {result.x[1]:.6f})")
print(f"Minimum value: {result.fun:.10f}")
print(f"Number of iterations: {result.nit}")

# Visualize optimization path
from scipy.optimize import rosen

x_opt = result.x
x = np.linspace(-2, 2, 100)
y = np.linspace(-1, 3, 100)
X, Y = np.meshgrid(x, y)
Z = np.array([[rosenbrock([x, y]) for x, y in zip(x_row, y_row)] 
              for x_row, y_row in zip(X, Y)])

plt.figure(figsize=(10, 8))
plt.contour(X, Y, Z, levels=np.logspace(-1, 3, 20), cmap='viridis')
plt.plot(x_opt[0], x_opt[1], 'r*', markersize=20, label='Minimum')
plt.plot(x0[0], x0[1], 'go', markersize=10, label='Start')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Rosenbrock Function Optimization')
plt.colorbar(label='f(x,y)')
plt.legend()
plt.show()
```

### With Gradient

```python
# Providing analytical gradient improves convergence
def objective_grad(x):
    """Gradient of x^2 + 5*sin(x)"""
    return 2*x + 5*np.cos(x)

# Minimize with gradient
result = optimize.minimize(objective, x0=5, jac=objective_grad, method='BFGS')
print(f"With gradient - nfev: {result.nfev}, njev: {result.njev}")

# Compare with numerical gradient
result_no_grad = optimize.minimize(objective, x0=5, method='BFGS')
print(f"Without gradient - nfev: {result_no_grad.nfev}")
```

---

## Constrained Optimization

### Bounds

```python
# Minimize with bounds: 0 <= x <= 10
result = optimize.minimize(objective, x0=5, bounds=[(0, 10)])
print(f"Bounded minimum at x = {result.x[0]:.6f}")

# Multiple dimensions with bounds
def sphere(x):
    return np.sum(x**2)

bounds = [(-5, 5), (-5, 5), (-5, 5)]  # Bounds for 3D
result = optimize.minimize(sphere, x0=[1, 1, 1], bounds=bounds)
print(f"3D bounded minimum: {result.x}")
```

### Linear Constraints

```python
from scipy.optimize import LinearConstraint

# Minimize: f(x,y) = x^2 + y^2
# Subject to: x + y >= 1
def objective_2d(x):
    return x[0]**2 + x[1]**2

# Create constraint: x + y >= 1  =>  [1, 1] @ [x, y] >= 1
linear_constraint = LinearConstraint([[1, 1]], [1], [np.inf])

result = optimize.minimize(objective_2d, x0=[0, 0], 
                          constraints=linear_constraint)
print(f"Constrained minimum: ({result.x[0]:.4f}, {result.x[1]:.4f})")
print(f"x + y = {result.x[0] + result.x[1]:.4f} (should be ≥ 1)")
```

### Nonlinear Constraints

```python
from scipy.optimize import NonlinearConstraint

# Minimize: f(x,y) = (x-1)^2 + (y-2)^2
# Subject to: x^2 + y^2 <= 1 (inside unit circle)
def objective_circle(x):
    return (x[0]-1)**2 + (x[1]-2)**2

def constraint_circle(x):
    return x[0]**2 + x[1]**2

nonlinear_constraint = NonlinearConstraint(constraint_circle, -np.inf, 1)

result = optimize.minimize(objective_circle, x0=[0, 0],
                          constraints=nonlinear_constraint,
                          method='SLSQP')
print(f"Constrained minimum: ({result.x[0]:.4f}, {result.x[1]:.4f})")
print(f"Distance from origin: {np.sqrt(result.x[0]**2 + result.x[1]**2):.4f}")
```

---

## Curve Fitting

### curve_fit()

```python
# Generate noisy data
def func(x, a, b, c):
    """Model: y = a*exp(-b*x) + c"""
    return a * np.exp(-b * x) + c

# True parameters
a_true, b_true, c_true = 2.5, 1.3, 0.5

x_data = np.linspace(0, 4, 50)
y_true = func(x_data, a_true, b_true, c_true)
noise = 0.2 * np.random.randn(len(x_data))
y_data = y_true + noise

# Fit curve
popt, pcov = optimize.curve_fit(func, x_data, y_data)
a_fit, b_fit, c_fit = popt

print(f"True parameters: a={a_true}, b={b_true}, c={c_true}")
print(f"Fitted parameters: a={a_fit:.4f}, b={b_fit:.4f}, c={c_fit:.4f}")

# Plot
plt.figure(figsize=(10, 6))
plt.scatter(x_data, y_data, label='Noisy data', alpha=0.6)
plt.plot(x_data, y_true, 'g--', label='True function', linewidth=2)
plt.plot(x_data, func(x_data, *popt), 'r-', label='Fitted function', linewidth=2)
plt.xlabel('x')
plt.ylabel('y')
plt.title('Curve Fitting with curve_fit')
plt.legend()
plt.grid(True)
plt.show()

# Parameter uncertainties (standard deviation)
perr = np.sqrt(np.diag(pcov))
print(f"\nParameter uncertainties:")
print(f"a: {a_fit:.4f} ± {perr[0]:.4f}")
print(f"b: {b_fit:.4f} ± {perr[1]:.4f}")
print(f"c: {c_fit:.4f} ± {perr[2]:.4f}")
```

### Polynomial Fitting

```python
# Generate polynomial data
x_data = np.linspace(-5, 5, 100)
y_true = 2*x_data**3 - 3*x_data**2 + 5*x_data - 1
y_data = y_true + 10*np.random.randn(len(x_data))

# Fit polynomial
degree = 3
coeffs = np.polyfit(x_data, y_data, degree)
print(f"Fitted coefficients: {coeffs}")

# Create polynomial function
poly = np.poly1d(coeffs)
y_fit = poly(x_data)

# Plot
plt.figure(figsize=(10, 6))
plt.scatter(x_data, y_data, alpha=0.5, label='Data')
plt.plot(x_data, y_fit, 'r-', linewidth=2, label=f'Degree {degree} fit')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Polynomial Curve Fitting')
plt.legend()
plt.grid(True)
plt.show()
```

---

## Least Squares

### Linear Least Squares

```python
# Solve: Ax = b in least squares sense
# Example: Fit line y = mx + c

x_data = np.array([1, 2, 3, 4, 5])
y_data = np.array([2.1, 3.9, 6.2, 7.8, 10.1])

# Create design matrix: [x, 1]
A = np.vstack([x_data, np.ones(len(x_data))]).T

# Solve
m, c = np.linalg.lstsq(A, y_data, rcond=None)[0]
print(f"Fitted line: y = {m:.4f}x + {c:.4f}")

# Plot
plt.figure(figsize=(10, 6))
plt.scatter(x_data, y_data, label='Data')
plt.plot(x_data, m*x_data + c, 'r-', label='Least squares fit')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Linear Least Squares')
plt.legend()
plt.grid(True)
plt.show()
```

### Nonlinear Least Squares

```python
from scipy.optimize import least_squares

# Model with multiple parameters
def model(params, x):
    a, b, c = params
    return a * np.exp(-b * x) + c

def residuals(params, x, y):
    return model(params, x) - y

# Generate data
x_data = np.linspace(0, 4, 50)
y_data = model([2.5, 1.3, 0.5], x_data) + 0.2*np.random.randn(len(x_data))

# Initial guess
p0 = [1, 1, 0]

# Solve
result = least_squares(residuals, p0, args=(x_data, y_data))
print(f"Fitted parameters: {result.x}")
print(f"Cost: {result.cost:.6f}")
print(f"Optimality: {result.optimality:.10f}")

# Plot
plt.figure(figsize=(10, 6))
plt.scatter(x_data, y_data, label='Data', alpha=0.6)
plt.plot(x_data, model(result.x, x_data), 'r-', label='Fitted', linewidth=2)
plt.xlabel('x')
plt.ylabel('y')
plt.title('Nonlinear Least Squares')
plt.legend()
plt.grid(True)
plt.show()
```

---

## Root Finding

### Scalar Root Finding

```python
# Find x where f(x) = 0
def func(x):
    return x**3 - 2*x - 5

# Bisection method
root = optimize.bisect(func, 2, 3)
print(f"Root (bisect): {root:.10f}")

# Brent's method (faster)
root = optimize.brentq(func, 2, 3)
print(f"Root (brentq): {root:.10f}")

# Newton's method (needs derivative)
def fprime(x):
    return 3*x**2 - 2

root = optimize.newton(func, x0=2, fprime=fprime)
print(f"Root (Newton): {root:.10f}")

# Visualize
x = np.linspace(1, 3, 1000)
y = func(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y, 'b-', linewidth=2, label='f(x)')
plt.axhline(0, color='k', linestyle='--', alpha=0.3)
plt.plot(root, 0, 'ro', markersize=10, label='Root')
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Root Finding')
plt.legend()
plt.grid(True)
plt.show()
```

### Multi-dimensional Root Finding

```python
# System of equations
def equations(vars):
    x, y = vars
    eq1 = x**2 + y**2 - 1  # x^2 + y^2 = 1
    eq2 = x - y**2         # x = y^2
    return [eq1, eq2]

# Solve
solution = optimize.fsolve(equations, [1, 1])
print(f"Solution: x={solution[0]:.6f}, y={solution[1]:.6f}")

# Verify
print(f"Verification: {equations(solution)}")
```

---

## Global Optimization

### Basin Hopping

```python
# Find global minimum (avoids local minima)
def func(x):
    """Function with multiple local minima"""
    return np.sin(x[0]) + np.cos(x[1]) + 0.1*x[0]**2 + 0.1*x[1]**2

# Basin hopping
minimizer_kwargs = {"method": "BFGS"}
result = optimize.basinhopping(func, [0, 0], minimizer_kwargs=minimizer_kwargs,
                               niter=100)
print(f"Global minimum at: {result.x}")
print(f"Global minimum value: {result.fun:.6f}")

# Visualize
x = np.linspace(-10, 10, 100)
y = np.linspace(-10, 10, 100)
X, Y = np.meshgrid(x, y)
Z = np.array([[func([x, y]) for x, y in zip(x_row, y_row)] 
              for x_row, y_row in zip(X, Y)])

plt.figure(figsize=(10, 8))
plt.contour(X, Y, Z, levels=30, cmap='viridis')
plt.plot(result.x[0], result.x[1], 'r*', markersize=20, label='Global minimum')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Basin Hopping Global Optimization')
plt.colorbar(label='f(x,y)')
plt.legend()
plt.show()
```

### Differential Evolution

```python
# Global optimization using genetic algorithm
def ackley(x):
    """Ackley function - many local minima"""
    a, b, c = 20, 0.2, 2*np.pi
    d = len(x)
    sum1 = np.sum(x**2)
    sum2 = np.sum(np.cos(c*x))
    return -a * np.exp(-b*np.sqrt(sum1/d)) - np.exp(sum2/d) + a + np.e

# Bounds for 2D
bounds = [(-5, 5), (-5, 5)]

# Differential evolution
result = optimize.differential_evolution(ackley, bounds)
print(f"Global minimum at: {result.x}")
print(f"Global minimum value: {result.fun:.10f}")

# Visualize
x = np.linspace(-5, 5, 200)
y = np.linspace(-5, 5, 200)
X, Y = np.meshgrid(x, y)
Z = np.array([[ackley([x, y]) for x, y in zip(x_row, y_row)] 
              for x_row, y_row in zip(X, Y)])

plt.figure(figsize=(10, 8))
plt.contour(X, Y, Z, levels=30, cmap='viridis')
plt.plot(result.x[0], result.x[1], 'r*', markersize=20, label='Global minimum')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Differential Evolution on Ackley Function')
plt.colorbar(label='f(x,y)')
plt.legend()
plt.show()
```

---

## Optimization in Machine Learning

### Linear Regression via Optimization

```python
# Generate data
np.random.seed(42)
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1)

# Add bias term
X_b = np.c_[np.ones((100, 1)), X]

# Loss function (MSE)
def mse_loss(theta, X, y):
    m = len(y)
    predictions = X.dot(theta)
    return (1/(2*m)) * np.sum((predictions - y)**2)

# Gradient
def mse_gradient(theta, X, y):
    m = len(y)
    predictions = X.dot(theta)
    return (1/m) * X.T.dot(predictions - y)

# Optimize
theta_init = np.random.randn(2, 1)
result = optimize.minimize(mse_loss, theta_init, args=(X_b, y),
                          jac=mse_gradient, method='BFGS')
theta_opt = result.x

print(f"Optimized parameters: {theta_opt}")
print(f"MSE: {result.fun:.6f}")

# Compare with normal equation
theta_normal = np.linalg.inv(X_b.T.dot(X_b)).dot(X_b.T).dot(y)
print(f"Normal equation: {theta_normal.flatten()}")

# Plot
plt.figure(figsize=(10, 6))
plt.scatter(X, y, alpha=0.5)
plt.plot(X, X_b.dot(theta_opt), 'r-', linewidth=2, label='Optimized')
plt.xlabel('X')
plt.ylabel('y')
plt.title('Linear Regression via Optimization')
plt.legend()
plt.grid(True)
plt.show()
```

### Logistic Regression

```python
from sklearn.datasets import make_classification

# Generate binary classification data
X, y = make_classification(n_samples=100, n_features=2, n_redundant=0,
                          n_informative=2, random_state=42, n_clusters_per_class=1)

# Add bias
X_b = np.c_[np.ones(X.shape[0]), X]

# Sigmoid function
def sigmoid(z):
    return 1 / (1 + np.exp(-z))

# Log loss
def log_loss(theta, X, y):
    m = len(y)
    h = sigmoid(X.dot(theta))
    epsilon = 1e-10  # For numerical stability
    return (-1/m) * np.sum(y*np.log(h+epsilon) + (1-y)*np.log(1-h+epsilon))

# Gradient
def log_loss_gradient(theta, X, y):
    m = len(y)
    h = sigmoid(X.dot(theta))
    return (1/m) * X.T.dot(h - y)

# Optimize
theta_init = np.zeros(X_b.shape[1])
result = optimize.minimize(log_loss, theta_init, args=(X_b, y),
                          jac=log_loss_gradient, method='BFGS')
theta_opt = result.x

print(f"Optimized parameters: {theta_opt}")
print(f"Log loss: {result.fun:.6f}")

# Decision boundary
plt.figure(figsize=(10, 6))
plt.scatter(X[y==0, 0], X[y==0, 1], label='Class 0', alpha=0.7)
plt.scatter(X[y==1, 0], X[y==1, 1], label='Class 1', alpha=0.7)

# Plot decision boundary
x_min, x_max = X[:, 0].min() - 0.5, X[:, 0].max() + 0.5
x_boundary = np.linspace(x_min, x_max, 100)
y_boundary = -(theta_opt[0] + theta_opt[1]*x_boundary) / theta_opt[2]
plt.plot(x_boundary, y_boundary, 'r-', linewidth=2, label='Decision boundary')

plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.title('Logistic Regression via Optimization')
plt.legend()
plt.grid(True)
plt.show()
```

### Neural Network Weight Optimization

```python
# Simple 1-layer neural network
def neural_network(params, X):
    """Forward pass"""
    W = params[:X.shape[1]*2].reshape(X.shape[1], 2)
    b = params[X.shape[1]*2:X.shape[1]*2+2]
    W2 = params[X.shape[1]*2+2:X.shape[1]*2+4]
    b2 = params[-1]
    
    # Hidden layer
    z1 = X.dot(W) + b
    a1 = np.tanh(z1)
    
    # Output layer
    z2 = a1.dot(W2) + b2
    a2 = sigmoid(z2)
    
    return a2

def nn_loss(params, X, y):
    """Binary cross-entropy loss"""
    predictions = neural_network(params, X)
    epsilon = 1e-10
    return -np.mean(y*np.log(predictions+epsilon) + 
                    (1-y)*np.log(1-predictions+epsilon))

# Initialize parameters
n_features = X.shape[1]
n_hidden = 2
n_params = n_features*n_hidden + n_hidden + n_hidden + 1
params_init = np.random.randn(n_params) * 0.1

# Optimize
result = optimize.minimize(nn_loss, params_init, args=(X, y),
                          method='L-BFGS-B', options={'maxiter': 1000})

print(f"Final loss: {result.fun:.6f}")
print(f"Optimization successful: {result.success}")

# Predictions
predictions = neural_network(result.x, X)
accuracy = np.mean((predictions > 0.5) == y)
print(f"Accuracy: {accuracy:.4f}")
```

---

## Practice Exercises

### Exercise 1: Parameter Estimation
```python
# Fit a custom model to data
# Model: y = a*sin(b*x + c) + d
# Generate noisy data and recover parameters
```

### Exercise 2: Constrained Portfolio Optimization
```python
# Minimize portfolio risk subject to:
# - Sum of weights = 1
# - All weights >= 0
# - Expected return >= target
```

### Exercise 3: Hyperparameter Tuning
```python
# Use optimization to find best hyperparameters
# for a machine learning model
```

---

## Key Takeaways

1. **minimize()**: General-purpose minimization
2. **curve_fit()**: Fit custom functions to data
3. **least_squares()**: Solve nonlinear least squares
4. **Methods**: Choose based on problem (BFGS, L-BFGS-B, SLSQP)
5. **Global optimization**: Use for multi-modal functions
6. **ML applications**: Loss minimization, parameter estimation
7. **Constraints**: Bounds, linear, nonlinear
8. **Gradient**: Provide analytical gradient when possible

---

## 🔗 Navigation

- **Previous**: [2.3 Visualization](../../2.3-Matplotlib-Seaborn-Visualization/README.md)
- **Next**: [02 - Linear Algebra Extensions](./02-Linear-Algebra-Extensions.md)
- **Up**: [2.4 SciPy](./README.md)
