# Applications in Machine Learning (Linear Algebra)

## 📋 Overview

This section demonstrates how linear algebra concepts are applied in real machine learning algorithms. We'll implement PCA, linear regression, and understand neural network operations through the lens of linear algebra.

---

## 🎯 Principal Component Analysis (PCA)

PCA uses eigendecomposition to find the directions of maximum variance in data.

### Theory

Given data matrix $\mathbf{X}$ (centered):
1. Compute covariance matrix: $\mathbf{C} = \frac{1}{n}\mathbf{X}^T\mathbf{X}$
2. Find eigenvectors and eigenvalues of $\mathbf{C}$
3. Principal components = eigenvectors with largest eigenvalues

### Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs

# Generate 2D data
np.random.seed(42)
X, _ = make_blobs(n_samples=300, n_features=2, centers=1, cluster_std=2.0)

# Apply rotation to make it more interesting
theta = np.pi / 4
rotation = np.array([[np.cos(theta), -np.sin(theta)],
                      [np.sin(theta), np.cos(theta)]])
X = X @ rotation.T

# Step 1: Center the data
X_mean = np.mean(X, axis=0)
X_centered = X - X_mean

# Step 2: Compute covariance matrix
cov_matrix = (X_centered.T @ X_centered) / (len(X) - 1)
print("Covariance Matrix:")
print(cov_matrix)

# Step 3: Eigendecomposition
eigenvalues, eigenvectors = np.linalg.eig(cov_matrix)

# Sort by eigenvalue (descending)
idx = eigenvalues.argsort()[::-1]
eigenvalues = eigenvalues[idx]
eigenvectors = eigenvectors[:, idx]

print(f"\nEigenvalues: {eigenvalues}")
print(f"\nVariance explained: {eigenvalues / eigenvalues.sum() * 100}%")
print(f"\nEigenvectors (Principal Components):\n{eigenvectors}")

# Step 4: Project onto principal components
X_pca = X_centered @ eigenvectors

# Visualize
fig, axes = plt.subplots(1, 3, figsize=(16, 5))

# Original data with principal components
axes[0].scatter(X_centered[:, 0], X_centered[:, 1], alpha=0.5)
axes[0].arrow(0, 0, eigenvectors[0, 0]*np.sqrt(eigenvalues[0])*3, 
              eigenvectors[1, 0]*np.sqrt(eigenvalues[0])*3,
              head_width=0.3, head_length=0.5, fc='red', ec='red', linewidth=2,
              label=f'PC1 (λ={eigenvalues[0]:.2f})')
axes[0].arrow(0, 0, eigenvectors[0, 1]*np.sqrt(eigenvalues[1])*3, 
              eigenvectors[1, 1]*np.sqrt(eigenvalues[1])*3,
              head_width=0.3, head_length=0.5, fc='blue', ec='blue', linewidth=2,
              label=f'PC2 (λ={eigenvalues[1]:.2f})')
axes[0].set_xlabel('Feature 1')
axes[0].set_ylabel('Feature 2')
axes[0].set_title('Original Data with Principal Components')
axes[0].legend()
axes[0].axis('equal')
axes[0].grid(True)

# Projected data (2D)
axes[1].scatter(X_pca[:, 0], X_pca[:, 1], alpha=0.5)
axes[1].set_xlabel('PC1')
axes[1].set_ylabel('PC2')
axes[1].set_title('Data in PC Space')
axes[1].axis('equal')
axes[1].grid(True)

# 1D projection (dimensionality reduction)
axes[2].scatter(X_pca[:, 0], np.zeros_like(X_pca[:, 0]), alpha=0.5)
axes[2].set_xlabel('PC1')
axes[2].set_title('1D Projection (Dimensionality Reduction)')
axes[2].set_ylim([-1, 1])
axes[2].grid(True)

plt.tight_layout()
plt.show()

# Reconstruction from PC1 only
X_reconstructed = (X_pca[:, 0:1] @ eigenvectors[:, 0:1].T) + X_mean
reconstruction_error = np.mean((X - X_reconstructed)**2)
print(f"\nReconstruction error (using PC1 only): {reconstruction_error:.4f}")
```

---

## 📈 Linear Regression with Matrices

Linear regression: $\mathbf{y} = \mathbf{Xw} + \epsilon$

Solution: $\mathbf{w} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$

### Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt

# Generate synthetic data
np.random.seed(42)
n_samples = 100
X = np.random.rand(n_samples, 1) * 10
y = 2.5 * X.squeeze() + 5 + np.random.randn(n_samples) * 2

# Add bias term (intercept)
X_with_bias = np.c_[np.ones(n_samples), X]

print(f"X shape with bias: {X_with_bias.shape}")
print(f"y shape: {y.shape}")

# Normal equation solution
w = np.linalg.inv(X_with_bias.T @ X_with_bias) @ X_with_bias.T @ y
print(f"\nWeights (normal equation): {w}")
print(f"Intercept: {w[0]:.4f}, Slope: {w[1]:.4f}")

# Alternative: using np.linalg.solve (more stable)
w_stable = np.linalg.solve(X_with_bias.T @ X_with_bias, X_with_bias.T @ y)
print(f"\nWeights (stable solver): {w_stable}")

# Predictions
y_pred = X_with_bias @ w

# Calculate R²
ss_total = np.sum((y - np.mean(y))**2)
ss_residual = np.sum((y - y_pred)**2)
r2 = 1 - (ss_residual / ss_total)
print(f"\nR² score: {r2:.4f}")

# Visualize
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.scatter(X, y, alpha=0.5, label='Data')
plt.plot(X, y_pred, 'r-', linewidth=2, label=f'Fit: y = {w[1]:.2f}x + {w[0]:.2f}')
plt.xlabel('X')
plt.ylabel('y')
plt.title(f'Linear Regression (R² = {r2:.4f})')
plt.legend()
plt.grid(True)

# Residuals
residuals = y - y_pred
plt.subplot(1, 2, 2)
plt.scatter(y_pred, residuals, alpha=0.5)
plt.axhline(y=0, color='r', linestyle='--')
plt.xlabel('Predicted Values')
plt.ylabel('Residuals')
plt.title('Residual Plot')
plt.grid(True)

plt.tight_layout()
plt.show()
```

---

## 🧠 Neural Network Layer as Matrix Multiplication

A neural network layer: $\mathbf{y} = \sigma(\mathbf{Wx} + \mathbf{b})$

### Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt

def sigmoid(z):
    return 1 / (1 + np.exp(-np.clip(z, -500, 500)))

# Simple neural network with matrix operations
class SimpleNeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size):
        # Initialize weights (using He initialization)
        self.W1 = np.random.randn(input_size, hidden_size) * np.sqrt(2/input_size)
        self.b1 = np.zeros((1, hidden_size))
        self.W2 = np.random.randn(hidden_size, output_size) * np.sqrt(2/hidden_size)
        self.b2 = np.zeros((1, output_size))
    
    def forward(self, X):
        """Forward pass using matrix operations"""
        # Hidden layer: z1 = XW1 + b1, a1 = sigmoid(z1)
        self.z1 = X @ self.W1 + self.b1
        self.a1 = sigmoid(self.z1)
        
        # Output layer: z2 = a1W2 + b2, a2 = sigmoid(z2)
        self.z2 = self.a1 @ self.W2 + self.b2
        self.a2 = sigmoid(self.z2)
        
        return self.a2
    
    def backward(self, X, y, learning_rate=0.1):
        """Backpropagation using matrix operations"""
        m = X.shape[0]
        
        # Output layer gradients
        dz2 = self.a2 - y
        dW2 = (self.a1.T @ dz2) / m
        db2 = np.sum(dz2, axis=0, keepdims=True) / m
        
        # Hidden layer gradients
        da1 = dz2 @ self.W2.T
        dz1 = da1 * self.a1 * (1 - self.a1)
        dW1 = (X.T @ dz1) / m
        db1 = np.sum(dz1, axis=0, keepdims=True) / m
        
        # Update weights
        self.W1 -= learning_rate * dW1
        self.b1 -= learning_rate * db1
        self.W2 -= learning_rate * dW2
        self.b2 -= learning_rate * db2
    
    def train(self, X, y, epochs=1000):
        """Train the network"""
        losses = []
        for epoch in range(epochs):
            # Forward pass
            predictions = self.forward(X)
            
            # Compute loss (MSE)
            loss = np.mean((predictions - y)**2)
            losses.append(loss)
            
            # Backward pass
            self.backward(X, y)
            
            if (epoch + 1) % 100 == 0:
                print(f"Epoch {epoch+1}/{epochs}, Loss: {loss:.6f}")
        
        return losses

# Generate XOR problem (non-linearly separable)
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([[0], [1], [1], [0]])

print("Training Neural Network for XOR Problem")
print("Input X:")
print(X)
print("\nTarget y:")
print(y)

# Create and train network
nn = SimpleNeuralNetwork(input_size=2, hidden_size=4, output_size=1)
losses = nn.train(X, y, epochs=5000)

# Test predictions
predictions = nn.forward(X)
print("\nFinal Predictions:")
for i in range(len(X)):
    print(f"Input: {X[i]}, Target: {y[i][0]}, Prediction: {predictions[i][0]:.4f}")

# Visualize
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Loss curve
axes[0].plot(losses)
axes[0].set_xlabel('Epoch')
axes[0].set_ylabel('Loss')
axes[0].set_title('Training Loss')
axes[0].grid(True)

# Decision boundary
h = 0.01
x_min, x_max = -0.5, 1.5
y_min, y_max = -0.5, 1.5
xx, yy = np.meshgrid(np.arange(x_min, x_max, h), np.arange(y_min, y_max, h))
Z = nn.forward(np.c_[xx.ravel(), yy.ravel()])
Z = Z.reshape(xx.shape)

axes[1].contourf(xx, yy, Z, levels=20, cmap='RdYlBu', alpha=0.8)
axes[1].scatter(X[y.flatten()==0, 0], X[y.flatten()==0, 1], 
                c='blue', s=100, edgecolors='k', label='Class 0')
axes[1].scatter(X[y.flatten()==1, 0], X[y.flatten()==1, 1], 
                c='red', s=100, edgecolors='k', label='Class 1')
axes[1].set_xlabel('Feature 1')
axes[1].set_ylabel('Feature 2')
axes[1].set_title('Decision Boundary')
axes[1].legend()
axes[1].grid(True)

plt.tight_layout()
plt.show()
```

---

## 🎓 Key Takeaways

1. **PCA**: Dimensionality reduction via eigendecomposition
2. **Linear Regression**: Closed-form solution using matrix operations
3. **Neural Networks**: Efficient computation via matrix multiplication
4. Linear algebra enables vectorized, fast computations
5. Understanding the math helps debug and improve models

---

## 📚 Additional Resources

- [PCA Tutorial](https://www.youtube.com/watch?v=FgakZw6K1QQ)
- [Matrix Calculus for Deep Learning](http://explained.ai/matrix-calculus/)
- [CS231n: Linear Classifiers](http://cs231n.github.io/linear-classify/)

---

**Remember:** Linear algebra is not just theory—it's the language in which ML algorithms are written!
