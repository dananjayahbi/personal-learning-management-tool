# Multivariable Calculus

## 📋 Overview

Most machine learning problems involve functions of many variables. Understanding multivariable calculus is essential for neural networks, where we optimize functions with millions of parameters.

---

## 🎯 Functions of Multiple Variables

A function $f: \mathbb{R}^n \rightarrow \mathbb{R}$ takes multiple inputs and returns one output:

$$z = f(x, y) = x^2 + y^2$$

**Examples in ML:**
- Loss function: $L(\mathbf{w}, \mathbf{b})$ depends on all weights and biases
- Neural network output: $y = f(x_1, x_2, ..., x_n)$

### Python Visualization

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Function: f(x,y) = x² + y²
def f(x, y):
    return x**2 + y**2

# Create grid
x = np.linspace(-3, 3, 100)
y = np.linspace(-3, 3, 100)
X, Y = np.meshgrid(x, y)
Z = f(X, Y)

# 3D surface plot
fig = plt.figure(figsize=(14, 6))

ax1 = fig.add_subplot(121, projection='3d')
surf = ax1.plot_surface(X, Y, Z, cmap='viridis', alpha=0.8)
ax1.set_xlabel('X')
ax1.set_ylabel('Y')
ax1.set_zlabel('Z')
ax1.set_title('3D Surface: f(x,y) = x² + y²')
fig.colorbar(surf, ax=ax1, shrink=0.5)

# Contour plot
ax2 = fig.add_subplot(122)
contour = ax2.contour(X, Y, Z, levels=15)
ax2.clabel(contour, inline=True, fontsize=8)
ax2.set_xlabel('X')
ax2.set_ylabel('Y')
ax2.set_title('Contour Plot')
ax2.set_aspect('equal')

plt.tight_layout()
plt.show()
```

---

## 📉 Partial Derivatives

The **partial derivative** measures how a function changes with respect to ONE variable, holding others constant.

### Notation

$$\frac{\partial f}{\partial x}, \quad f_x, \quad \partial_x f$$

### Definition

$$\frac{\partial f}{\partial x} = \lim_{h \to 0} \frac{f(x+h, y) - f(x, y)}{h}$$

### Example

For $f(x, y) = x^2 + xy + y^2$:

$$\frac{\partial f}{\partial x} = 2x + y$$
$$\frac{\partial f}{\partial y} = x + 2y$$

**Interpretation:** 
- $\frac{\partial f}{\partial x}$: slope in x-direction
- $\frac{\partial f}{\partial y}$: slope in y-direction

### Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt

def f(x, y):
    """f(x,y) = x² + xy + y²"""
    return x**2 + x*y + y**2

def partial_x(x, y):
    """∂f/∂x = 2x + y"""
    return 2*x + y

def partial_y(x, y):
    """∂f/∂y = x + 2y"""
    return x + 2*y

def numerical_partial_x(x, y, h=1e-5):
    """Numerical partial derivative w.r.t. x"""
    return (f(x+h, y) - f(x, y)) / h

def numerical_partial_y(x, y, h=1e-5):
    """Numerical partial derivative w.r.t. y"""
    return (f(x, y+h) - f(x, y)) / h

# Test point
x0, y0 = 1.0, 2.0

print(f"At point ({x0}, {y0}):")
print(f"∂f/∂x (analytical): {partial_x(x0, y0)}")
print(f"∂f/∂x (numerical):  {numerical_partial_x(x0, y0)}")
print(f"∂f/∂y (analytical): {partial_y(x0, y0)}")
print(f"∂f/∂y (numerical):  {numerical_partial_y(x0, y0)}")

# Visualize partial derivatives
x = np.linspace(-3, 3, 20)
y = np.linspace(-3, 3, 20)
X, Y = np.meshgrid(x, y)
Z = f(X, Y)
U = partial_x(X, Y)  # Partial derivative in x
V = partial_y(X, Y)  # Partial derivative in y

plt.figure(figsize=(14, 6))

# Quiver plot showing gradient direction
plt.subplot(1, 2, 1)
plt.contourf(X, Y, Z, levels=20, cmap='viridis', alpha=0.6)
plt.quiver(X, Y, U, V, color='red', alpha=0.7)
plt.colorbar(label='f(x,y)')
plt.title('Partial Derivatives as Vector Field')
plt.xlabel('x')
plt.ylabel('y')

# Magnitude of gradient
plt.subplot(1, 2, 2)
grad_magnitude = np.sqrt(U**2 + V**2)
plt.contourf(X, Y, grad_magnitude, levels=20, cmap='plasma')
plt.colorbar(label='||∇f||')
plt.title('Gradient Magnitude')
plt.xlabel('x')
plt.ylabel('y')

plt.tight_layout()
plt.show()
```

---

## 📐 Gradient Vector

The **gradient** is a vector of all partial derivatives:

$$\nabla f = \begin{bmatrix} \frac{\partial f}{\partial x_1} \\ \frac{\partial f}{\partial x_2} \\ \vdots \\ \frac{\partial f}{\partial x_n} \end{bmatrix}$$

**Properties:**
- Points in direction of **steepest ascent**
- Perpendicular to level curves/surfaces
- Magnitude = rate of steepest increase

**Example:**
```
f(x, y) = x² + y²

∇f = [2x, 2y]

At (1, 2): ∇f = [2, 4]
```

### Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt

def f(x, y):
    return x**2 + y**2

def gradient(x, y):
    """Gradient of f"""
    return np.array([2*x, 2*y])

# Create grid
x = np.linspace(-3, 3, 15)
y = np.linspace(-3, 3, 15)
X, Y = np.meshgrid(x, y)
Z = f(X, Y)

# Compute gradient at each point
U = 2*X  # ∂f/∂x
V = 2*Y  # ∂f/∂y

# Visualize
plt.figure(figsize=(10, 8))

# Contour plot with gradient vectors
contour = plt.contour(X, Y, Z, levels=10, colors='gray', alpha=0.5)
plt.clabel(contour, inline=True, fontsize=8)
plt.quiver(X, Y, U, V, color='red', alpha=0.7)
plt.title('Gradient Vectors Point Away from Origin')
plt.xlabel('x')
plt.ylabel('y')
plt.axis('equal')
plt.grid(True)

# Mark origin
plt.plot(0, 0, 'go', markersize=10, label='Minimum at (0,0)')
plt.legend()

plt.show()

# Gradient at specific point
point = np.array([1.5, 2.0])
grad = gradient(point[0], point[1])
print(f"Gradient at {point}: {grad}")
print(f"Magnitude: {np.linalg.norm(grad):.4f}")
```

---

## 🎯 Directional Derivatives

The **directional derivative** measures rate of change in ANY direction (not just x or y):

$$D_{\mathbf{u}}f = \nabla f \cdot \mathbf{u}$$

where $\mathbf{u}$ is a **unit vector** in the direction of interest.

**Maximum Rate:** In the direction of $\nabla f$
**Minimum Rate:** In the direction of $-\nabla f$
**Zero Rate:** Perpendicular to $\nabla f$

### Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt

def f(x, y):
    return x**2 + y**2

def gradient(x, y):
    return np.array([2*x, 2*y])

# Point of interest
point = np.array([1.0, 1.0])
grad = gradient(point[0], point[1])

# Different directions (unit vectors)
angles = np.linspace(0, 2*np.pi, 36)
directions = np.array([[np.cos(a), np.sin(a)] for a in angles])

# Compute directional derivatives
dir_derivs = [np.dot(grad, d) for d in directions]

# Visualize
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))

# Polar plot of directional derivatives
ax1 = plt.subplot(121, projection='polar')
ax1.plot(angles, dir_derivs, 'b-', linewidth=2)
ax1.fill(angles, dir_derivs, alpha=0.3)
ax1.set_title('Directional Derivative in All Directions')
ax1.grid(True)

# 2D visualization
ax2 = plt.subplot(122)
x = np.linspace(-0.5, 2.5, 50)
y = np.linspace(-0.5, 2.5, 50)
X, Y = np.meshgrid(x, y)
Z = f(X, Y)

ax2.contour(X, Y, Z, levels=10, alpha=0.5)
ax2.plot(*point, 'ro', markersize=10, label=f'Point {point}')

# Show gradient direction (max increase)
ax2.arrow(point[0], point[1], grad[0]*0.3, grad[1]*0.3, 
          head_width=0.1, head_length=0.1, fc='red', ec='red', 
          label='Gradient (max increase)')

# Show opposite direction (max decrease)
ax2.arrow(point[0], point[1], -grad[0]*0.3, -grad[1]*0.3, 
          head_width=0.1, head_length=0.1, fc='blue', ec='blue',
          label='Negative gradient (max decrease)')

ax2.set_xlabel('x')
ax2.set_ylabel('y')
ax2.set_title('Gradient at Point')
ax2.legend()
ax2.axis('equal')
ax2.grid(True)

plt.tight_layout()
plt.show()

print(f"Gradient at {point}: {grad}")
print(f"Max directional derivative: {np.linalg.norm(grad):.4f}")
print(f"Min directional derivative: {-np.linalg.norm(grad):.4f}")
```

---

## 🔗 Chain Rule in Multiple Dimensions

For composed functions $f(g(x, y), h(x, y))$:

$$\frac{\partial f}{\partial x} = \frac{\partial f}{\partial g}\frac{\partial g}{\partial x} + \frac{\partial f}{\partial h}\frac{\partial h}{\partial x}$$

**This is the foundation of backpropagation!**

### Example: Neural Network

```python
import numpy as np
import matplotlib.pyplot as plt

# Simple neural network: y = σ(wx + b)
def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def forward_pass(x, w, b):
    """Forward pass"""
    z = w * x + b  # Linear combination
    y = sigmoid(z)  # Activation
    return z, y

def backward_pass(x, w, b, y_true, y_pred):
    """Backward pass using chain rule"""
    # Loss: L = (y_pred - y_true)²
    # dL/dy_pred
    dL_dy = 2 * (y_pred - y_true)
    
    # dy/dz (sigmoid derivative)
    z = w * x + b
    dy_dz = y_pred * (1 - y_pred)
    
    # dz/dw and dz/db
    dz_dw = x
    dz_db = 1
    
    # Chain rule: dL/dw = dL/dy * dy/dz * dz/dw
    dL_dw = dL_dy * dy_dz * dz_dw
    dL_db = dL_dy * dy_dz * dz_db
    
    return dL_dw, dL_db

# Training example
x = 2.0
y_true = 0.8
w = 0.5
b = 0.1
learning_rate = 0.1

history_w = [w]
history_b = [b]
history_loss = []

# Train for 100 steps
for epoch in range(100):
    # Forward
    z, y_pred = forward_pass(x, w, b)
    loss = (y_pred - y_true)**2
    history_loss.append(loss)
    
    # Backward (chain rule!)
    dL_dw, dL_db = backward_pass(x, w, b, y_true, y_pred)
    
    # Update
    w = w - learning_rate * dL_dw
    b = b - learning_rate * dL_db
    
    history_w.append(w)
    history_b.append(b)

# Visualize
fig, axes = plt.subplots(1, 3, figsize=(15, 4))

axes[0].plot(history_loss)
axes[0].set_title('Loss Over Time')
axes[0].set_xlabel('Epoch')
axes[0].set_ylabel('Loss')
axes[0].grid(True)

axes[1].plot(history_w)
axes[1].set_title('Weight Evolution')
axes[1].set_xlabel('Epoch')
axes[1].set_ylabel('w')
axes[1].grid(True)

axes[2].plot(history_b)
axes[2].set_title('Bias Evolution')
axes[2].set_xlabel('Epoch')
axes[2].set_ylabel('b')
axes[2].grid(True)

plt.tight_layout()
plt.show()

print(f"Final w: {w:.4f}, Final b: {b:.4f}")
print(f"Final prediction: {forward_pass(x, w, b)[1]:.4f}")
print(f"Target: {y_true}")
```

---

## 🎓 Key Takeaways

1. **Partial derivatives** measure change in one variable
2. **Gradient** points in direction of steepest increase
3. **Directional derivatives** measure change in any direction
4. **Chain rule** enables backpropagation in neural networks
5. **Multivariable calculus** is essential for optimizing ML models

---

## 🔗 Next Steps

- **Next Topic**: [Optimization Fundamentals](./03-Optimization-Fundamentals.md)
- **Practice**: Implement gradient descent for multivariable functions
- **Application**: Train a simple neural network using gradients

---

## 📚 Additional Resources

- [Khan Academy: Multivariable Calculus](https://www.khanacademy.org/math/multivariable-calculus)
- [3Blue1Brown: Gradient and Divergence](https://www.youtube.com/watch?v=TrcCbdWwCBc)
- [MIT OCW: Multivariable Calculus](https://ocw.mit.edu/courses/mathematics/18-02sc-multivariable-calculus-fall-2010/)

---

**Remember:** Neural networks are just multivariable functions, and training them is multivariable optimization!
