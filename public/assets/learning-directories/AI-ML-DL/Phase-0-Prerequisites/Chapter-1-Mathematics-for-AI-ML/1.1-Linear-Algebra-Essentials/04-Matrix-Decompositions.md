# Matrix Decompositions

## 📋 Overview

Matrix decompositions (or factorizations) break down matrices into simpler components. These are fundamental to many ML algorithms including PCA, SVD-based recommender systems, and efficient computation of matrix operations.

---

## 🔍 Eigenvalues and Eigenvectors

### Definition

For a square matrix $\mathbf{A}$, a vector $\mathbf{v}$ is an **eigenvector** if:

$$\mathbf{Av} = \lambda \mathbf{v}$$

where $\lambda$ is the corresponding **eigenvalue**.

**Interpretation:** Applying $\mathbf{A}$ to $\mathbf{v}$ only scales it (doesn't change direction).

### Finding Eigenvalues

Solve the characteristic equation:

$$\det(\mathbf{A} - \lambda \mathbf{I}) = 0$$

### Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt

# Example matrix
A = np.array([[4, 2],
              [1, 3]])

# Compute eigenvalues and eigenvectors
eigenvalues, eigenvectors = np.linalg.eig(A)

print("Matrix A:")
print(A)
print(f"\nEigenvalues: {eigenvalues}")
print(f"\nEigenvectors:\n{eigenvectors}")

# Verify: Av = λv
for i in range(len(eigenvalues)):
    v = eigenvectors[:, i]
    λ = eigenvalues[i]
    Av = A @ v
    λv = λ * v
    print(f"\nEigenvector {i+1}:")
    print(f"Av = {Av}")
    print(f"λv = {λv}")
    print(f"Equal: {np.allclose(Av, λv)}")

# Visualize eigenvectors
plt.figure(figsize=(10, 8))

# Create grid of vectors
x = np.linspace(-3, 3, 10)
y = np.linspace(-3, 3, 10)
X, Y = np.meshgrid(x, y)

# Apply transformation
UV = np.array([[A @ np.array([x, y]) for x, y in zip(x_row, y_row)] 
               for x_row, y_row in zip(X, Y)])
U = UV[:, :, 0]
V = UV[:, :, 1]

# Plot original grid
plt.subplot(1, 2, 1)
plt.quiver(X, Y, X, Y, alpha=0.5, color='blue', label='Original vectors')
plt.quiver([0, 0], [0, 0], 
           eigenvectors[0, :], eigenvectors[1, :],
           angles='xy', scale_units='xy', scale=1, color=['red', 'green'], width=0.01,
           label='Eigenvectors')
plt.xlim([-5, 5])
plt.ylim([-5, 5])
plt.grid(True)
plt.axis('equal')
plt.legend()
plt.title('Original Space with Eigenvectors')

# Plot transformed grid
plt.subplot(1, 2, 2)
plt.quiver(X, Y, U, V, alpha=0.5, color='blue', label='Transformed vectors')
plt.quiver([0, 0], [0, 0],
           eigenvalues[0]*eigenvectors[0, 0], eigenvalues[0]*eigenvectors[1, 0],
           angles='xy', scale_units='xy', scale=1, color='red', width=0.01)
plt.quiver([0, 0], [0, 0],
           eigenvalues[1]*eigenvectors[0, 1], eigenvalues[1]*eigenvectors[1, 1],
           angles='xy', scale_units='xy', scale=1, color='green', width=0.01)
plt.xlim([-5, 5])
plt.ylim([-5, 5])
plt.grid(True)
plt.axis('equal')
plt.title('Transformed Space (Eigenvectors scaled)')

plt.tight_layout()
plt.show()
```

### ML Applications
- **PCA**: Principal components are eigenvectors
- **PageRank**: Based on eigenvector of web link matrix
- **Spectral Clustering**: Uses eigenvectors of similarity matrix

---

## 📐 Singular Value Decomposition (SVD)

### Definition

Any $m \times n$ matrix $\mathbf{A}$ can be factored as:

$$\mathbf{A} = \mathbf{U\Sigma V}^T$$

Where:
- $\mathbf{U}$: $m \times m$ orthogonal matrix (left singular vectors)
- $\mathbf{\Sigma}$: $m \times n$ diagonal matrix (singular values)
- $\mathbf{V}$: $n \times n$ orthogonal matrix (right singular vectors)

### Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt

# Example matrix
A = np.array([[3, 1, 1],
              [-1, 3, 1]])

# Compute SVD
U, s, VT = np.linalg.svd(A, full_matrices=True)

# Reconstruct Sigma matrix
Sigma = np.zeros_like(A, dtype=float)
Sigma[:len(s), :len(s)] = np.diag(s)

print("Original matrix A:")
print(A)
print(f"\nU (left singular vectors):\n{U}")
print(f"\nSingular values: {s}")
print(f"\nΣ (diagonal matrix):\n{Sigma}")
print(f"\nVᵀ (right singular vectors transposed):\n{VT}")

# Verify reconstruction
A_reconstructed = U @ Sigma @ VT
print(f"\nReconstructed A:")
print(A_reconstructed)
print(f"Reconstruction error: {np.linalg.norm(A - A_reconstructed)}")

# Low-rank approximation
def reconstruct_with_k_components(U, s, VT, k):
    """Reconstruct matrix using only k singular values"""
    Sigma_k = np.zeros((U.shape[0], VT.shape[0]))
    Sigma_k[:k, :k] = np.diag(s[:k])
    return U @ Sigma_k @ VT

# Visualize different ranks
fig, axes = plt.subplots(1, 4, figsize=(16, 4))

for idx, k in enumerate([0, 1, 2, 2]):  # Original is rank 2
    if idx == 0:
        axes[idx].imshow(A, cmap='viridis', aspect='auto')
        axes[idx].set_title('Original Matrix')
    else:
        A_k = reconstruct_with_k_components(U, s, VT, idx)
        axes[idx].imshow(A_k, cmap='viridis', aspect='auto')
        axes[idx].set_title(f'Rank-{idx} Approximation')
    axes[idx].set_xlabel('Columns')
    axes[idx].set_ylabel('Rows')

plt.tight_layout()
plt.show()

# Image compression example
from matplotlib import image
import urllib.request

# Load an image (or create synthetic data)
img = np.random.rand(100, 100)  # Replace with actual image

U, s, VT = np.linalg.svd(img, full_matrices=False)

fig, axes = plt.subplots(2, 4, figsize=(16, 8))
k_values = [5, 10, 20, 50]

for idx, k in enumerate(k_values):
    # Reconstruct with k components
    img_k = U[:, :k] @ np.diag(s[:k]) @ VT[:k, :]
    compression_ratio = (k * (img.shape[0] + img.shape[1]) + k) / (img.shape[0] * img.shape[1]) * 100
    
    axes[0, idx].imshow(img_k, cmap='gray')
    axes[0, idx].set_title(f'k={k} ({compression_ratio:.1f}%)')
    axes[0, idx].axis('off')
    
    # Show singular values
    axes[1, idx].plot(s[:k], 'bo-')
    axes[1, idx].set_title(f'First {k} Singular Values')
    axes[1, idx].set_xlabel('Index')
    axes[1, idx].set_ylabel('Value')
    axes[1, idx].grid(True)

plt.tight_layout()
plt.show()
```

### ML Applications
- **Dimensionality Reduction**: Similar to PCA
- **Recommender Systems**: Matrix factorization (Netflix Prize)
- **Image Compression**: Low-rank approximation
- **Data Denoising**: Keep only large singular values

---

## 🔺 QR Decomposition

### Definition

$$\mathbf{A} = \mathbf{QR}$$

Where:
- $\mathbf{Q}$: Orthogonal matrix ($\mathbf{Q}^T\mathbf{Q} = \mathbf{I}$)
- $\mathbf{R}$: Upper triangular matrix

### Python Implementation

```python
import numpy as np

# Example matrix
A = np.array([[12, -51, 4],
              [6, 167, -68],
              [-4, 24, -41]], dtype=float)

# Compute QR decomposition
Q, R = np.linalg.qr(A)

print("Original matrix A:")
print(A)
print(f"\nQ (orthogonal matrix):\n{Q}")
print(f"\nR (upper triangular):\n{R}")

# Verify QR = A
A_reconstructed = Q @ R
print(f"\nReconstructed A:")
print(A_reconstructed)
print(f"\nReconstruction error: {np.linalg.norm(A - A_reconstructed)}")

# Verify Q is orthogonal
QTQ = Q.T @ Q
print(f"\nQᵀQ (should be identity):\n{QTQ}")
print(f"Is orthogonal: {np.allclose(QTQ, np.eye(len(Q)))}")

# Application: Solve least squares
b = np.array([1, 2, 3])
# Solve Ax = b using QR
# A = QR, so Ax = QRx = b
# Rx = Qᵀb (since Q is orthogonal)
x = np.linalg.solve(R, Q.T @ b)
print(f"\nSolution to Ax=b: {x}")
print(f"Verification Ax: {A @ x}")
print(f"Target b: {b}")
```

### ML Applications
- **Least Squares**: More stable than normal equations
- **Gram-Schmidt Orthogonalization**: Generating orthogonal bases
- **Eigenvalue Algorithms**: QR algorithm for finding eigenvalues

---

## ✅ Cholesky Decomposition

### Definition

For symmetric positive definite matrix $\mathbf{A}$:

$$\mathbf{A} = \mathbf{LL}^T$$

Where $\mathbf{L}$ is lower triangular with positive diagonal.

### Python Implementation

```python
import numpy as np

# Create symmetric positive definite matrix
A = np.array([[4, 12, -16],
              [12, 37, -43],
              [-16, -43, 98]], dtype=float)

# Verify positive definite
eigenvalues = np.linalg.eigvalsh(A)
print(f"Eigenvalues: {eigenvalues}")
print(f"All positive: {np.all(eigenvalues > 0)}")

# Cholesky decomposition
L = np.linalg.cholesky(A)

print(f"\nCholesky factor L:\n{L}")
print(f"\nLLᵀ:\n{L @ L.T}")
print(f"\nOriginal A:\n{A}")
print(f"\nReconstruction error: {np.linalg.norm(A - L @ L.T)}")

# Solving linear systems efficiently
b = np.array([1, 2, 3])

# Solve Ax = b using Cholesky
# A = LLᵀ, so LLᵀx = b
# First solve Ly = b
y = np.linalg.solve(L, b)
# Then solve Lᵀx = y
x = np.linalg.solve(L.T, y)

print(f"\nSolution x: {x}")
print(f"Verification Ax: {A @ x}")
print(f"Target b: {b}")
```

### ML Applications
- **Gaussian Processes**: Covariance matrix inversion
- **Optimization**: Computing Newton's method steps
- **Simulation**: Generating correlated random variables

---

## 🎓 Key Takeaways

1. **Eigendecomposition**: For square matrices, reveals intrinsic directions
2. **SVD**: Works for any matrix, most versatile decomposition
3. **QR**: Stable for least squares problems
4. **Cholesky**: Fast for positive definite matrices
5. Each decomposition has specific ML applications

---

## 🔗 Next Steps

- **Next Topic**: [Applications in Machine Learning](./05-Applications-in-ML.md)
- **Practice**: Implement PCA using eigendecomposition
- **Application**: Build image compression with SVD

---

## 📚 Additional Resources

- [3Blue1Brown: Eigenvectors and Eigenvalues](https://www.youtube.com/watch?v=PFDu9oVAE-g)
- [MIT OCW: Matrix Decompositions](https://ocw.mit.edu/courses/mathematics/18-06-linear-algebra-spring-2010/)
- [NumPy Linear Algebra](https://numpy.org/doc/stable/reference/routines.linalg.html)

---

**Remember:** Matrix decompositions make complex operations efficient and reveal hidden structure in data!
