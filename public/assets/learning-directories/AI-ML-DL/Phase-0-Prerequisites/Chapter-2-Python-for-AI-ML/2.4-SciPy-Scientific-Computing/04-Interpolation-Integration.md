# 04 - Interpolation and Integration in SciPy

## 📋 Table of Contents
- [Introduction](#introduction)
- [1D Interpolation](#1d-interpolation)
- [2D and Higher-Dimensional Interpolation](#2d-and-higher-dimensional-interpolation)
- [Spline Interpolation](#spline-interpolation)
- [Numerical Integration](#numerical-integration)
- [Ordinary Differential Equations](#ordinary-differential-equations)
- [Applications in ML](#applications-in-ml)
- [Practice Exercises](#practice-exercises)

---

## Introduction

Interpolation fills gaps between data points, while integration computes areas and solves differential equations - both essential for scientific computing and ML.

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import interpolate, integrate
from scipy.integrate import odeint, solve_ivp
import pandas as pd

# Check version
import scipy
print(scipy.__version__)
```

---

## 1D Interpolation

### Linear Interpolation

```python
# Original data points
x = np.array([0, 1, 2, 3, 4, 5])
y = np.array([0, 1, 4, 2, 3, 5])

# Create interpolation function
f_linear = interpolate.interp1d(x, y, kind='linear')

# Interpolate at new points
x_new = np.linspace(0, 5, 100)
y_new = f_linear(x_new)

# Plot
plt.figure(figsize=(10, 6))
plt.plot(x, y, 'o', label='Data points', markersize=10)
plt.plot(x_new, y_new, '-', label='Linear interpolation')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Linear Interpolation')
plt.legend()
plt.grid(True)
plt.show()

# Interpolate at specific point
print(f"Value at x=2.5: {f_linear(2.5):.4f}")
```

### Higher-Order Interpolation

```python
# Compare different interpolation methods
methods = ['linear', 'nearest', 'zero', 'quadratic', 'cubic']

fig, axes = plt.subplots(2, 3, figsize=(15, 10))
axes = axes.flatten()

x = np.array([0, 1, 2, 3, 4, 5])
y = np.array([0, 1, 4, 2, 3, 5])
x_new = np.linspace(0, 5, 100)

for ax, method in zip(axes, methods):
    f = interpolate.interp1d(x, y, kind=method)
    y_new = f(x_new)
    
    ax.plot(x, y, 'o', label='Data', markersize=8)
    ax.plot(x_new, y_new, '-', label=method)
    ax.set_title(f'{method.capitalize()} Interpolation')
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.legend()
    ax.grid(True)

axes[-1].axis('off')  # Hide last subplot
plt.tight_layout()
plt.show()
```

### Extrapolation

```python
# By default, interp1d doesn't extrapolate
x = np.array([1, 2, 3, 4, 5])
y = np.array([2, 4, 6, 8, 10])

# Without extrapolation (will raise error outside range)
f_no_extrap = interpolate.interp1d(x, y, kind='linear')

# With extrapolation
f_extrap = interpolate.interp1d(x, y, kind='linear', fill_value='extrapolate')

# Test
x_test = np.linspace(0, 6, 100)
y_extrap = f_extrap(x_test)

plt.figure(figsize=(10, 6))
plt.plot(x, y, 'o', label='Data', markersize=10)
plt.plot(x_test, y_extrap, '-', label='With extrapolation')
plt.axvline(x[0], color='r', linestyle='--', alpha=0.5, label='Data range')
plt.axvline(x[-1], color='r', linestyle='--', alpha=0.5)
plt.xlabel('x')
plt.ylabel('y')
plt.title('Interpolation with Extrapolation')
plt.legend()
plt.grid(True)
plt.show()
```

---

## 2D and Higher-Dimensional Interpolation

### 2D Interpolation - Regular Grid

```python
# Create 2D data on regular grid
x = np.linspace(0, 4, 5)
y = np.linspace(0, 4, 5)
X, Y = np.meshgrid(x, y)
Z = np.sin(X) * np.cos(Y)

# Interpolation function
f = interpolate.interp2d(x, y, Z, kind='cubic')

# Interpolate on finer grid
x_new = np.linspace(0, 4, 50)
y_new = np.linspace(0, 4, 50)
Z_new = f(x_new, y_new)

# Plot
fig = plt.figure(figsize=(14, 6))

# Original data
ax1 = fig.add_subplot(121, projection='3d')
ax1.scatter(X, Y, Z, c='r', marker='o', s=100)
ax1.set_title('Original Data Points')
ax1.set_xlabel('X')
ax1.set_ylabel('Y')
ax1.set_zlabel('Z')

# Interpolated surface
ax2 = fig.add_subplot(122, projection='3d')
X_new, Y_new = np.meshgrid(x_new, y_new)
ax2.plot_surface(X_new, Y_new, Z_new, cmap='viridis', alpha=0.8)
ax2.scatter(X, Y, Z, c='r', marker='o', s=50)
ax2.set_title('Cubic Interpolation')
ax2.set_xlabel('X')
ax2.set_ylabel('Y')
ax2.set_zlabel('Z')

plt.tight_layout()
plt.show()
```

### 2D Interpolation - Irregular Grid

```python
# Random scattered points
np.random.seed(42)
n_points = 100
x = np.random.rand(n_points) * 4
y = np.random.rand(n_points) * 4
z = np.sin(x) * np.cos(y)

# Interpolate using griddata
x_grid = np.linspace(0, 4, 50)
y_grid = np.linspace(0, 4, 50)
X_grid, Y_grid = np.meshgrid(x_grid, y_grid)

# Different methods
methods = ['nearest', 'linear', 'cubic']
fig, axes = plt.subplots(1, 3, figsize=(18, 5))

for ax, method in zip(axes, methods):
    Z_grid = interpolate.griddata((x, y), z, (X_grid, Y_grid), method=method)
    
    im = ax.contourf(X_grid, Y_grid, Z_grid, levels=20, cmap='viridis')
    ax.scatter(x, y, c='red', s=10, alpha=0.5, label='Data points')
    ax.set_title(f'{method.capitalize()} Interpolation')
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    plt.colorbar(im, ax=ax)

plt.tight_layout()
plt.show()
```

### Radial Basis Function (RBF) Interpolation

```python
# RBF interpolation for scattered data
x = np.random.rand(50) * 4
y = np.random.rand(50) * 4
z = np.sin(x) * np.cos(y) + 0.1*np.random.randn(50)

# Create RBF interpolator
rbf = interpolate.Rbf(x, y, z, function='multiquadric', smooth=0.1)

# Interpolate on grid
x_grid = np.linspace(0, 4, 100)
y_grid = np.linspace(0, 4, 100)
X_grid, Y_grid = np.meshgrid(x_grid, y_grid)
Z_grid = rbf(X_grid, Y_grid)

# Plot
fig = plt.figure(figsize=(12, 10))

# 3D surface
ax1 = fig.add_subplot(211, projection='3d')
ax1.plot_surface(X_grid, Y_grid, Z_grid, cmap='viridis', alpha=0.8)
ax1.scatter(x, y, z, c='red', marker='o', s=50)
ax1.set_title('RBF Interpolation (3D)')
ax1.set_xlabel('X')
ax1.set_ylabel('Y')
ax1.set_zlabel('Z')

# Contour plot
ax2 = fig.add_subplot(212)
contour = ax2.contourf(X_grid, Y_grid, Z_grid, levels=20, cmap='viridis')
ax2.scatter(x, y, c='red', s=30, alpha=0.7, label='Data points')
ax2.set_title('RBF Interpolation (Contour)')
ax2.set_xlabel('x')
ax2.set_ylabel('y')
plt.colorbar(contour, ax=ax2)
ax2.legend()

plt.tight_layout()
plt.show()
```

---

## Spline Interpolation

### Cubic Splines

```python
# Data
x = np.array([0, 1, 2, 3, 4, 5])
y = np.array([0, 2, 1, 3, 2, 4])

# Cubic spline
cs = interpolate.CubicSpline(x, y)

# Interpolate
x_new = np.linspace(0, 5, 100)
y_new = cs(x_new)

# Also get derivatives
dy = cs(x_new, 1)   # First derivative
ddy = cs(x_new, 2)  # Second derivative

# Plot
fig, axes = plt.subplots(3, 1, figsize=(10, 12))

# Function
axes[0].plot(x, y, 'o', label='Data', markersize=10)
axes[0].plot(x_new, y_new, '-', label='Cubic spline')
axes[0].set_ylabel('y')
axes[0].set_title('Cubic Spline Interpolation')
axes[0].legend()
axes[0].grid(True)

# First derivative
axes[1].plot(x_new, dy, 'g-')
axes[1].set_ylabel("y'")
axes[1].set_title('First Derivative')
axes[1].grid(True)

# Second derivative
axes[2].plot(x_new, ddy, 'r-')
axes[2].set_xlabel('x')
axes[2].set_ylabel("y''")
axes[2].set_title('Second Derivative')
axes[2].grid(True)

plt.tight_layout()
plt.show()
```

### B-Splines

```python
# B-spline representation
x = np.linspace(0, 10, 10)
y = np.sin(x)

# Fit B-spline
tck = interpolate.splrep(x, y, s=0)  # s=0 means interpolation

# Evaluate
x_new = np.linspace(0, 10, 100)
y_new = interpolate.splev(x_new, tck)

# Derivatives
dy = interpolate.splev(x_new, tck, der=1)
ddy = interpolate.splev(x_new, tck, der=2)

# Plot
fig, axes = plt.subplots(3, 1, figsize=(10, 12))

axes[0].plot(x, y, 'o', label='Data', markersize=8)
axes[0].plot(x_new, y_new, '-', label='B-spline')
axes[0].plot(x_new, np.sin(x_new), '--', label='True function', alpha=0.5)
axes[0].set_ylabel('y')
axes[0].set_title('B-Spline Interpolation')
axes[0].legend()
axes[0].grid(True)

axes[1].plot(x_new, dy, 'g-', label="y'")
axes[1].plot(x_new, np.cos(x_new), 'g--', label="True y'", alpha=0.5)
axes[1].set_ylabel("y'")
axes[1].set_title('First Derivative')
axes[1].legend()
axes[1].grid(True)

axes[2].plot(x_new, ddy, 'r-', label="y''")
axes[2].plot(x_new, -np.sin(x_new), 'r--', label="True y''", alpha=0.5)
axes[2].set_xlabel('x')
axes[2].set_ylabel("y''")
axes[2].set_title('Second Derivative')
axes[2].legend()
axes[2].grid(True)

plt.tight_layout()
plt.show()
```

### Parametric Splines

```python
# Parametric curve (e.g., spiral)
theta = np.linspace(0, 4*np.pi, 20)
x = theta * np.cos(theta)
y = theta * np.sin(theta)

# Fit parametric B-spline
tck, u = interpolate.splprep([x, y], s=0)

# Evaluate on fine parameter grid
u_new = np.linspace(0, 1, 200)
x_new, y_new = interpolate.splev(u_new, tck)

# Plot
plt.figure(figsize=(10, 10))
plt.plot(x, y, 'ro', label='Data points', markersize=8)
plt.plot(x_new, y_new, 'b-', label='Parametric B-spline', linewidth=2)
plt.xlabel('x')
plt.ylabel('y')
plt.title('Parametric Spline (Spiral)')
plt.legend()
plt.grid(True)
plt.axis('equal')
plt.show()
```

---

## Numerical Integration

### Definite Integrals - quad()

```python
# Integrate a function
def integrand(x):
    return np.exp(-x**2)

# Integral from 0 to infinity
result, error = integrate.quad(integrand, 0, np.inf)
print(f"∫₀^∞ e^(-x²) dx = {result:.10f} ± {error:.2e}")
print(f"True value (√π/2): {np.sqrt(np.pi)/2:.10f}")

# Visualize
x = np.linspace(0, 3, 1000)
y = integrand(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y, 'b-', linewidth=2)
plt.fill_between(x, y, alpha=0.3)
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title(f'∫₀^∞ e^(-x²) dx = {result:.4f}')
plt.grid(True)
plt.show()
```

### Multiple Integration

```python
# Double integral: ∫∫ x*y dx dy
def integrand_2d(y, x):
    return x * y

# Limits: 0 ≤ x ≤ 2, 0 ≤ y ≤ 1
result, error = integrate.dblquad(integrand_2d, 0, 2, 0, 1)
print(f"∫₀² ∫₀¹ xy dy dx = {result:.6f} ± {error:.2e}")
print(f"Analytical: {(2**2 / 2) * (1**2 / 2):.6f}")

# Triple integral
def integrand_3d(z, y, x):
    return x * y * z

result, error = integrate.tplquad(integrand_3d, 0, 1, 0, 1, 0, 1)
print(f"\n∫∫∫ xyz dz dy dx = {result:.6f} ± {error:.2e}")
```

### Numerical Integration of Data

```python
# Integrate sampled data (no analytical function)
x = np.linspace(0, 2*np.pi, 100)
y = np.sin(x)

# Trapezoidal rule
result_trapz = integrate.trapezoid(y, x)
print(f"Trapezoidal: {result_trapz:.6f}")

# Simpson's rule
result_simps = integrate.simpson(y, x)
print(f"Simpson's: {result_simps:.6f}")

# Analytical
print(f"Analytical: {-np.cos(2*np.pi) + np.cos(0):.6f}")

# Cumulative integration
cumulative = integrate.cumulative_trapezoid(y, x, initial=0)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Original function
axes[0].plot(x, y, 'b-', linewidth=2)
axes[0].fill_between(x, y, alpha=0.3)
axes[0].set_xlabel('x')
axes[0].set_ylabel('sin(x)')
axes[0].set_title(f'Function (Integral = {result_simps:.4f})')
axes[0].grid(True)

# Cumulative integral
axes[1].plot(x, cumulative, 'r-', linewidth=2)
axes[1].set_xlabel('x')
axes[1].set_ylabel('∫₀ˣ sin(t) dt')
axes[1].set_title('Cumulative Integral')
axes[1].grid(True)

plt.tight_layout()
plt.show()
```

### Improper Integrals

```python
# Infinite limits
def f1(x):
    return 1 / (1 + x**2)

result, error = integrate.quad(f1, -np.inf, np.inf)
print(f"∫₋∞^∞ 1/(1+x²) dx = {result:.6f} (True: π = {np.pi:.6f})")

# Singularity
def f2(x):
    return 1 / np.sqrt(x)

result, error = integrate.quad(f2, 0, 1)
print(f"∫₀¹ 1/√x dx = {result:.6f} (True: 2 = 2.000000)")
```

---

## Ordinary Differential Equations

### First-Order ODE

```python
# dy/dt = -2y, y(0) = 1
# Analytical solution: y(t) = e^(-2t)

def model(y, t):
    return -2 * y

y0 = 1
t = np.linspace(0, 2, 100)

# Solve ODE
y = odeint(model, y0, t)

# Plot
plt.figure(figsize=(10, 6))
plt.plot(t, y, 'b-', linewidth=2, label='Numerical solution')
plt.plot(t, np.exp(-2*t), 'r--', linewidth=2, label='Analytical solution')
plt.xlabel('t')
plt.ylabel('y')
plt.title('First-Order ODE: dy/dt = -2y')
plt.legend()
plt.grid(True)
plt.show()

# Error
error = np.abs(y.flatten() - np.exp(-2*t))
print(f"Max error: {np.max(error):.2e}")
```

### System of ODEs

```python
# Lotka-Volterra (predator-prey)
# dx/dt = αx - βxy
# dy/dt = δxy - γy

def lotka_volterra(state, t, alpha, beta, gamma, delta):
    x, y = state
    dxdt = alpha*x - beta*x*y
    dydt = delta*x*y - gamma*y
    return [dxdt, dydt]

# Parameters
alpha, beta, gamma, delta = 1.0, 0.1, 1.5, 0.075

# Initial conditions
state0 = [10, 5]  # Initial prey, predator populations

# Time
t = np.linspace(0, 15, 1000)

# Solve
solution = odeint(lotka_volterra, state0, t, args=(alpha, beta, gamma, delta))
prey = solution[:, 0]
predator = solution[:, 1]

# Plot
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Time series
axes[0].plot(t, prey, 'b-', label='Prey', linewidth=2)
axes[0].plot(t, predator, 'r-', label='Predator', linewidth=2)
axes[0].set_xlabel('Time')
axes[0].set_ylabel('Population')
axes[0].set_title('Lotka-Volterra: Population vs Time')
axes[0].legend()
axes[0].grid(True)

# Phase space
axes[1].plot(prey, predator, 'g-', linewidth=2)
axes[1].plot(prey[0], predator[0], 'go', markersize=10, label='Start')
axes[1].set_xlabel('Prey Population')
axes[1].set_ylabel('Predator Population')
axes[1].set_title('Phase Space')
axes[1].legend()
axes[1].grid(True)

plt.tight_layout()
plt.show()
```

### Higher-Order ODE

```python
# Second-order ODE: y'' + 2y' + 2y = 0
# Convert to system: y₁ = y, y₂ = y'
# y₁' = y₂
# y₂' = -2y₂ - 2y₁

def second_order(state, t):
    y1, y2 = state
    dy1dt = y2
    dy2dt = -2*y2 - 2*y1
    return [dy1dt, dy2dt]

# Initial conditions: y(0) = 1, y'(0) = 0
state0 = [1, 0]
t = np.linspace(0, 10, 1000)

# Solve
solution = odeint(second_order, state0, t)
y = solution[:, 0]
dy = solution[:, 1]

# Plot
fig, axes = plt.subplots(2, 1, figsize=(10, 10))

axes[0].plot(t, y, 'b-', linewidth=2)
axes[0].set_ylabel('y')
axes[0].set_title("Second-Order ODE: y'' + 2y' + 2y = 0")
axes[0].grid(True)

axes[1].plot(t, dy, 'r-', linewidth=2)
axes[1].set_xlabel('t')
axes[1].set_ylabel("y'")
axes[1].grid(True)

plt.tight_layout()
plt.show()
```

### Modern ODE Solver (solve_ivp)

```python
# Same problem with solve_ivp (more modern interface)
def model(t, y):
    return -2 * y

t_span = [0, 2]
t_eval = np.linspace(0, 2, 100)
y0 = [1]

# Different methods
methods = ['RK45', 'RK23', 'DOP853', 'Radau', 'BDF']

plt.figure(figsize=(10, 6))
for method in methods:
    sol = solve_ivp(model, t_span, y0, method=method, t_eval=t_eval)
    plt.plot(sol.t, sol.y[0], label=method, linewidth=2)

plt.plot(t_eval, np.exp(-2*t_eval), 'k--', label='Analytical', linewidth=2)
plt.xlabel('t')
plt.ylabel('y')
plt.title('ODE Solvers Comparison')
plt.legend()
plt.grid(True)
plt.show()
```

---

## Applications in ML

### Gaussian Process with Interpolation

```python
# Simulate GP using interpolation
x_train = np.array([0, 1, 2, 3, 4])
y_train = np.array([0, 0.8, 0.9, 0.1, -0.8])

# Mean function (cubic spline)
mean_func = interpolate.CubicSpline(x_train, y_train)

# Prediction
x_test = np.linspace(-0.5, 4.5, 200)
y_pred = mean_func(x_test)

# Plot with uncertainty
plt.figure(figsize=(10, 6))
plt.plot(x_train, y_train, 'ro', markersize=10, label='Training data')
plt.plot(x_test, y_pred, 'b-', linewidth=2, label='Interpolation')
plt.fill_between(x_test, y_pred-0.3, y_pred+0.3, alpha=0.3, label='Uncertainty')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Interpolation with Uncertainty')
plt.legend()
plt.grid(True)
plt.show()
```

### Feature Engineering with Splines

```python
# Create spline features for regression
from sklearn.linear_model import LinearRegression

# Generate nonlinear data
x = np.linspace(0, 10, 100)
y = np.sin(x) + 0.1*np.random.randn(100)

# Create spline basis
n_knots = 10
knots = np.linspace(0, 10, n_knots)

# B-spline basis functions
from scipy.interpolate import BSpline

degree = 3
# Create B-spline basis
t = np.concatenate([[0]*degree, knots, [10]*degree])  # Knot vector

# Design matrix
X_spline = np.zeros((len(x), len(t)-degree-1))
for i in range(X_spline.shape[1]):
    basis = BSpline.basis_element(t[i:i+degree+2], extrapolate=False)
    X_spline[:, i] = [basis(xi) if basis(xi) is not np.nan else 0 for xi in x]

# Fit linear model with spline features
model = LinearRegression()
model.fit(X_spline, y)
y_pred = model.predict(X_spline)

# Plot
plt.figure(figsize=(10, 6))
plt.scatter(x, y, alpha=0.5, label='Data')
plt.plot(x, y_pred, 'r-', linewidth=2, label='Spline regression')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Regression with B-Spline Features')
plt.legend()
plt.grid(True)
plt.show()

print(f"R² score: {model.score(X_spline, y):.4f}")
```

---

## Practice Exercises

### Exercise 1: Image Resizing
```python
# Load an image
# Use 2D interpolation to resize
# Compare different methods
```

### Exercise 2: Numerical Integration Challenge
```python
# Integrate challenging functions
# Compare quad, trapezoid, Simpson
# Analyze errors
```

### Exercise 3: ODE Application
```python
# Model SIR epidemic
# Solve system of ODEs
# Visualize disease spread
```

---

## Key Takeaways

1. **1D interpolation**: `interp1d` for simple cases
2. **2D interpolation**: `griddata` for irregular, `interp2d` for regular
3. **Splines**: `CubicSpline`, B-splines for smooth curves
4. **Integration**: `quad` for functions, `trapezoid`/`simpson` for data
5. **ODEs**: `odeint` (legacy), `solve_ivp` (modern)
6. **Choose method**: Balance accuracy vs computational cost
7. **ML applications**: Feature engineering, GP, dynamics
8. **Always validate**: Compare with analytical solutions when possible

---

## 🔗 Navigation

- **Previous**: [03 - Statistical Functions](./03-Statistical-Functions.md)
- **Next**: [05 - Signal Processing](./05-Signal-Processing.md)
- **Up**: [2.4 SciPy](./README.md)
