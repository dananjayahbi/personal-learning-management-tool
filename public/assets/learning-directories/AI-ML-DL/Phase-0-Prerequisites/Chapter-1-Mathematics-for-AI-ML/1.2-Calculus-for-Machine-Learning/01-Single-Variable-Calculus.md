# Single Variable Calculus

## 📋 Overview

Single variable calculus is the foundation for understanding optimization in machine learning. Derivatives tell us how functions change, which is crucial for gradient descent and training neural networks.

---

## 🎯 Limits and Continuity

### What is a Limit?

The limit describes the value a function approaches as the input approaches some value:

$$\lim_{x \to a} f(x) = L$$

**Example:**
```
f(x) = x²
lim(x→2) x² = 4
```

### Continuity

A function is **continuous** at $x = a$ if:
1. $f(a)$ exists
2. $\lim_{x \to a} f(x)$ exists
3. $\lim_{x \to a} f(x) = f(a)$

**ML Relevance:** Continuous functions are easier to optimize. Most loss functions are continuous.

### Python Visualization

```python
import numpy as np
import matplotlib.pyplot as plt

# Continuous function
x = np.linspace(-2, 2, 100)
y = x**2

plt.figure(figsize=(10, 4))

plt.subplot(1, 2, 1)
plt.plot(x, y)
plt.title('Continuous: f(x) = x²')
plt.grid(True)
plt.axhline(y=0, color='k', linewidth=0.5)
plt.axvline(x=0, color='k', linewidth=0.5)

# Discontinuous function (step function)
x_disc = np.linspace(-2, 2, 100)
y_disc = np.where(x_disc < 0, -1, 1)

plt.subplot(1, 2, 2)
plt.plot(x_disc, y_disc)
plt.title('Discontinuous: Sign function')
plt.grid(True)
plt.axhline(y=0, color='k', linewidth=0.5)
plt.axvline(x=0, color='k', linewidth=0.5)

plt.tight_layout()
plt.show()
```

---

## 📉 Derivatives

### Definition

The derivative measures the **rate of change**:

$$f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}$$

**Geometric Interpretation:** Slope of the tangent line at point $x$.

**Notation:**
- $f'(x)$
- $\frac{df}{dx}$
- $\frac{d}{dx}f(x)$

### Basic Derivative Rules

| Function | Derivative | Name |
|----------|-----------|------|
| $f(x) = c$ | $f'(x) = 0$ | Constant |
| $f(x) = x$ | $f'(x) = 1$ | Identity |
| $f(x) = x^n$ | $f'(x) = nx^{n-1}$ | Power Rule |
| $f(x) = e^x$ | $f'(x) = e^x$ | Exponential |
| $f(x) = \ln(x)$ | $f'(x) = \frac{1}{x}$ | Natural Log |
| $f(x) = \sin(x)$ | $f'(x) = \cos(x)$ | Sine |
| $f(x) = \cos(x)$ | $f'(x) = -\sin(x)$ | Cosine |

### Examples

```
f(x) = x² → f'(x) = 2x
f(x) = x³ → f'(x) = 3x²
f(x) = 5x⁴ → f'(x) = 20x³
```

### Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt

def f(x):
    """Function: f(x) = x²"""
    return x**2

def f_prime(x):
    """Derivative: f'(x) = 2x"""
    return 2*x

def numerical_derivative(f, x, h=1e-5):
    """Approximate derivative using finite differences"""
    return (f(x + h) - f(x)) / h

# Test point
x_point = 2.0
analytical = f_prime(x_point)
numerical = numerical_derivative(f, x_point)

print(f"Analytical derivative at x={x_point}: {analytical}")
print(f"Numerical derivative at x={x_point}: {numerical}")
print(f"Difference: {abs(analytical - numerical)}")

# Visualize function and derivative
x = np.linspace(-3, 3, 100)
y = f(x)
y_prime = f_prime(x)

plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(x, y, label='f(x) = x²')
plt.title('Function')
plt.grid(True)
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(x, y_prime, label="f'(x) = 2x", color='red')
plt.title('Derivative')
plt.grid(True)
plt.legend()

plt.tight_layout()
plt.show()
```

---

## 🔧 Differentiation Rules

### Sum/Difference Rule

$$(f \pm g)' = f' \pm g'$$

**Example:**
```
f(x) = x² + 3x
f'(x) = 2x + 3
```

### Product Rule

$$(fg)' = f'g + fg'$$

**Example:**
```
f(x) = x² · sin(x)
f'(x) = 2x·sin(x) + x²·cos(x)
```

### Quotient Rule

$$\left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2}$$

**Example:**
```
f(x) = x²/x = x
f'(x) = (2x·x - x²·1)/x² = 1
```

### Chain Rule (Most Important for ML!)

$$(f \circ g)' = f'(g(x)) \cdot g'(x)$$

Or: $\frac{df}{dx} = \frac{df}{dg} \cdot \frac{dg}{dx}$

**Example:**
```
f(x) = sin(x²)
Let g(x) = x², then f(g) = sin(g)

f'(x) = cos(x²) · 2x
```

**ML Application:** Chain rule is the foundation of **backpropagation**!

### Python Implementation of Chain Rule

```python
import numpy as np
import matplotlib.pyplot as plt

def composite_function(x):
    """f(x) = sin(x²)"""
    return np.sin(x**2)

def derivative_composite(x):
    """f'(x) = cos(x²) · 2x using chain rule"""
    return np.cos(x**2) * 2*x

# Visualize
x = np.linspace(-2, 2, 200)
y = composite_function(x)
y_prime = derivative_composite(x)

plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(x, y)
plt.title('f(x) = sin(x²)')
plt.grid(True)

plt.subplot(1, 2, 2)
plt.plot(x, y_prime, color='red')
plt.title("f'(x) = cos(x²)·2x")
plt.grid(True)

plt.tight_layout()
plt.show()
```

---

## 📊 Critical Points and Optimization

### Critical Points

Points where $f'(x) = 0$ or $f'(x)$ doesn't exist.

**Finding Critical Points:**
1. Compute $f'(x)$
2. Solve $f'(x) = 0$
3. Check where $f'(x)$ is undefined

### Local Maxima and Minima

**First Derivative Test:**
- If $f'(x)$ changes from **positive to negative** at $x = c$: **local maximum**
- If $f'(x)$ changes from **negative to positive** at $x = c$: **local minimum**

**Second Derivative Test:**
- If $f'(c) = 0$ and $f''(c) > 0$: **local minimum**
- If $f'(c) = 0$ and $f''(c) < 0$: **local maximum**
- If $f'(c) = 0$ and $f''(c) = 0$: **test is inconclusive**

**Example:**
```
f(x) = x² - 4x + 5

f'(x) = 2x - 4 = 0
x = 2 (critical point)

f''(x) = 2 > 0
→ Local minimum at x = 2
```

### Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import minimize_scalar

def f(x):
    """Function: f(x) = x² - 4x + 5"""
    return x**2 - 4*x + 5

def f_prime(x):
    """First derivative"""
    return 2*x - 4

def f_double_prime(x):
    """Second derivative"""
    return 2

# Find critical point analytically
critical_x = 2.0  # Solving f'(x) = 0
critical_y = f(critical_x)

print(f"Critical point: x = {critical_x}, f(x) = {critical_y}")
print(f"Second derivative: {f_double_prime(critical_x)}")
print("→ Local minimum" if f_double_prime(critical_x) > 0 else "→ Local maximum")

# Verify with numerical optimization
result = minimize_scalar(f)
print(f"\nNumerical optimization: x = {result.x:.4f}, f(x) = {result.fun:.4f}")

# Visualize
x = np.linspace(-1, 5, 100)
y = f(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y, label='f(x) = x² - 4x + 5')
plt.plot(critical_x, critical_y, 'ro', markersize=10, label=f'Minimum at x={critical_x}')
plt.axhline(y=0, color='k', linewidth=0.5)
plt.axvline(x=0, color='k', linewidth=0.5)
plt.grid(True)
plt.legend()
plt.title('Finding Minimum Using Derivatives')
plt.xlabel('x')
plt.ylabel('f(x)')
plt.show()
```

---

## 📈 Integration Basics

### Definite Integral

Area under the curve from $a$ to $b$:

$$\int_a^b f(x) \, dx$$

**Fundamental Theorem of Calculus:**

$$\int_a^b f(x) \, dx = F(b) - F(a)$$

where $F'(x) = f(x)$ (antiderivative).

### Common Integrals

| Function | Integral |
|----------|----------|
| $\int x^n \, dx$ | $\frac{x^{n+1}}{n+1} + C$ (n ≠ -1) |
| $\int e^x \, dx$ | $e^x + C$ |
| $\int \frac{1}{x} \, dx$ | $\ln\|x\| + C$ |
| $\int \sin(x) \, dx$ | $-\cos(x) + C$ |
| $\int \cos(x) \, dx$ | $\sin(x) + C$ |

### Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import integrate

def f(x):
    """Function to integrate"""
    return x**2

# Analytical integration of x² from 0 to 2
# ∫x² dx = x³/3
# From 0 to 2: 8/3 - 0 = 2.667
analytical = (2**3)/3
print(f"Analytical integral: {analytical:.4f}")

# Numerical integration
numerical, error = integrate.quad(f, 0, 2)
print(f"Numerical integral: {numerical:.4f}")
print(f"Error estimate: {error:.2e}")

# Visualize
x = np.linspace(0, 2, 100)
y = f(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y, 'b-', linewidth=2, label='f(x) = x²')
plt.fill_between(x, 0, y, alpha=0.3, label='Area = 2.667')
plt.grid(True)
plt.legend()
plt.title('Definite Integral: Area Under Curve')
plt.xlabel('x')
plt.ylabel('f(x)')
plt.show()
```

### ML Applications of Integration

1. **Probability Distributions**: PDF integrates to 1
2. **Expected Values**: $E[X] = \int x \cdot p(x) \, dx$
3. **Continuous Loss Functions**: Total error over continuous domain

---

## 🎯 ML Applications

### 1. Gradient Descent

Finding minimum of loss function:

$$\theta_{new} = \theta_{old} - \alpha \frac{dL}{d\theta}$$

```python
import numpy as np
import matplotlib.pyplot as plt

def loss(theta):
    """Simple loss function: L = (theta - 3)²"""
    return (theta - 3)**2

def gradient(theta):
    """Gradient: dL/dtheta = 2(theta - 3)"""
    return 2 * (theta - 3)

# Gradient descent
theta = 0.0  # Initial guess
learning_rate = 0.1
history = [theta]

for _ in range(20):
    grad = gradient(theta)
    theta = theta - learning_rate * grad
    history.append(theta)

print(f"Final theta: {theta:.4f}")
print(f"True minimum: 3.0")

# Visualize
theta_range = np.linspace(-1, 6, 100)
loss_values = loss(theta_range)

plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(theta_range, loss_values, label='Loss function')
plt.plot(history, [loss(t) for t in history], 'ro-', markersize=5, label='Gradient descent path')
plt.xlabel('θ')
plt.ylabel('Loss')
plt.legend()
plt.grid(True)
plt.title('Gradient Descent Visualization')

plt.subplot(1, 2, 2)
plt.plot(history, marker='o')
plt.xlabel('Iteration')
plt.ylabel('θ')
plt.grid(True)
plt.title('Parameter Evolution')

plt.tight_layout()
plt.show()
```

### 2. Backpropagation (Chain Rule)

Neural network training uses chain rule extensively:

$$\frac{\partial L}{\partial w_1} = \frac{\partial L}{\partial y} \cdot \frac{\partial y}{\partial z} \cdot \frac{\partial z}{\partial w_1}$$

### 3. Activation Functions and Their Derivatives

```python
import numpy as np
import matplotlib.pyplot as plt

def sigmoid(x):
    """Sigmoid: σ(x) = 1/(1+e^(-x))"""
    return 1 / (1 + np.exp(-x))

def sigmoid_derivative(x):
    """σ'(x) = σ(x)(1 - σ(x))"""
    s = sigmoid(x)
    return s * (1 - s)

def relu(x):
    """ReLU: max(0, x)"""
    return np.maximum(0, x)

def relu_derivative(x):
    """ReLU': 1 if x > 0, else 0"""
    return (x > 0).astype(float)

# Visualize
x = np.linspace(-5, 5, 200)

fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# Sigmoid
axes[0, 0].plot(x, sigmoid(x))
axes[0, 0].set_title('Sigmoid')
axes[0, 0].grid(True)

axes[0, 1].plot(x, sigmoid_derivative(x), color='red')
axes[0, 1].set_title('Sigmoid Derivative')
axes[0, 1].grid(True)

# ReLU
axes[1, 0].plot(x, relu(x))
axes[1, 0].set_title('ReLU')
axes[1, 0].grid(True)

axes[1, 1].plot(x, relu_derivative(x), color='red')
axes[1, 1].set_title('ReLU Derivative')
axes[1, 1].grid(True)

plt.tight_layout()
plt.show()
```

---

## 🎓 Key Takeaways

1. **Derivatives measure rate of change** - crucial for optimization
2. **Chain rule enables backpropagation** - foundation of deep learning
3. **Critical points** are where gradients vanish
4. **Second derivatives** tell us about curvature
5. **Integration** computes cumulative effects

---

## 🔗 Next Steps

- **Next Topic**: [Multivariable Calculus](./02-Multivariable-Calculus.md)
- **Practice**: Implement gradient descent for various functions
- **Application**: Train a simple linear model using gradient descent

---

## 📚 Additional Resources

- [3Blue1Brown: Essence of Calculus](https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr)
- [Khan Academy: Calculus](https://www.khanacademy.org/math/calculus-1)
- [Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcI/CalcI.aspx)

---

**Remember:** Calculus is the language of change. In ML, we're always optimizing (changing) parameters to minimize loss!
