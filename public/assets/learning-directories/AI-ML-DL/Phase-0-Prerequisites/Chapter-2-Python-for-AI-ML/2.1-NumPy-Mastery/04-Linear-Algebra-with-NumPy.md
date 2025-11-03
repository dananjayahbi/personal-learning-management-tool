# Linear Algebra with NumPy

## 📋 Overview

NumPy's `linalg` module provides comprehensive linear algebra operations essential for machine learning algorithms. This chapter covers matrix operations, solving linear systems, eigenvalues, decompositions, and their applications in ML.

---

## 1. Matrix Operations Review

### 1.1 Basic Matrix Operations

```python
import numpy as np

# Create matrices
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Matrix addition
C = A + B
print(C)
# Output:
# [[ 6  8]
#  [10 12]]

# Matrix subtraction
D = A - B
print(D)
# Output:
# [[-4 -4]
#  [-4 -4]]

# Element-wise multiplication
E = A * B
print(E)
# Output:
# [[ 5 12]
#  [21 32]]

# Matrix multiplication
F = A @ B  # or np.dot(A, B)
print(F)
# Output:
# [[19 22]
#  [43 50]]
```

### 1.2 Transpose

```python
A = np.array([[1, 2, 3],
              [4, 5, 6]])

print(A.T)
# Output:
# [[1 4]
#  [2 5]
#  [3 6]]

# For complex matrices, use conjugate transpose
C = np.array([[1+2j, 3+4j],
              [5+6j, 7+8j]])
print(C.T)          # Transpose
print(np.conj(C.T)) # Conjugate transpose (Hermitian)
```

---

## 2. The np.linalg Module

### 2.1 Matrix Rank

```python
# Full rank matrix
A = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 10]])
print(np.linalg.matrix_rank(A))  # 3

# Rank deficient matrix
B = np.array([[1, 2, 3],
              [2, 4, 6],
              [3, 6, 9]])
print(np.linalg.matrix_rank(B))  # 1 (all rows are linearly dependent)
```

### 2.2 Determinant

```python
A = np.array([[1, 2], [3, 4]])
det_A = np.linalg.det(A)
print(f"Determinant: {det_A}")  # -2.0

# For singular matrix
B = np.array([[1, 2], [2, 4]])
det_B = np.linalg.det(B)
print(f"Determinant: {det_B}")  # ~0.0 (singular matrix)

# Properties:
# det(AB) = det(A) * det(B)
# det(A^T) = det(A)
# det(A^{-1}) = 1/det(A)
```

### 2.3 Matrix Inverse

```python
# Invertible matrix
A = np.array([[1, 2], [3, 4]])
A_inv = np.linalg.inv(A)
print(A_inv)
# Output:
# [[-2.   1. ]
#  [ 1.5 -0.5]]

# Verify: A @ A_inv = I
I = A @ A_inv
print(np.round(I, decimals=10))  # Identity matrix
# Output:
# [[1. 0.]
#  [0. 1.]]

# For singular matrices (determinant = 0), inverse doesn't exist
try:
    B = np.array([[1, 2], [2, 4]])
    B_inv = np.linalg.inv(B)
except np.linalg.LinAlgError as e:
    print(f"Error: {e}")  # Singular matrix
```

### 2.4 Trace

```python
A = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])

trace_A = np.trace(A)
print(f"Trace: {trace_A}")  # 15 (1+5+9)

# Trace is sum of eigenvalues
eigenvalues = np.linalg.eigvals(A)
print(f"Sum of eigenvalues: {np.sum(eigenvalues)}")  # ~15
```

### 2.5 Matrix Norms

```python
A = np.array([[1, 2], [3, 4]])

# Frobenius norm (default)
frobenius = np.linalg.norm(A)
print(f"Frobenius norm: {frobenius}")  # ~5.477

# L1 norm (max absolute column sum)
l1_norm = np.linalg.norm(A, ord=1)
print(f"L1 norm: {l1_norm}")  # 6.0

# L2 norm (spectral norm)
l2_norm = np.linalg.norm(A, ord=2)
print(f"L2 norm: {l2_norm}")  # ~5.465

# Infinity norm (max absolute row sum)
inf_norm = np.linalg.norm(A, ord=np.inf)
print(f"Infinity norm: {inf_norm}")  # 7.0

# Nuclear norm (sum of singular values)
nuclear = np.linalg.norm(A, ord='nuc')
print(f"Nuclear norm: {nuclear}")
```

---

## 3. Solving Linear Systems

### 3.1 solve() - Solve Ax = b

```python
# System: 2x + 3y = 8
#         3x + 4y = 11

A = np.array([[2, 3], [3, 4]])
b = np.array([8, 11])

x = np.linalg.solve(A, b)
print(x)  # [1. 2.]

# Verify solution
print(np.allclose(A @ x, b))  # True

# Multiple right-hand sides
b_multi = np.array([[8, 10], [11, 13]])
x_multi = np.linalg.solve(A, b_multi)
print(x_multi)
# Output:
# [[1. 1.]
#  [2. 3.]]
```

### 3.2 Least Squares Solution

```python
# Overdetermined system (more equations than unknowns)
A = np.array([[1, 1],
              [1, 2],
              [1, 3]])
b = np.array([2, 3, 5])

# Exact solution may not exist, find best fit
x, residuals, rank, s = np.linalg.lstsq(A, b, rcond=None)
print(f"Solution: {x}")
print(f"Residuals: {residuals}")
print(f"Rank: {rank}")

# This finds x that minimizes ||Ax - b||^2
```

### 3.3 Matrix Division

```python
# A @ X = B, solve for X
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Method 1: Using inverse (less efficient)
X1 = np.linalg.inv(A) @ B

# Method 2: Using solve (more efficient)
X2 = np.linalg.solve(A, B)

print(np.allclose(X1, X2))  # True
```

---

## 4. Eigenvalues and Eigenvectors

### 4.1 Computing Eigenvalues and Eigenvectors

```python
A = np.array([[4, 2],
              [1, 3]])

# Compute eigenvalues and eigenvectors
eigenvalues, eigenvectors = np.linalg.eig(A)

print("Eigenvalues:")
print(eigenvalues)  # [5. 2.]

print("\nEigenvectors:")
print(eigenvectors)
# Output:
# [[0.89442719 -0.70710678]
#  [0.4472136   0.70710678]]

# Verify: A @ v = λ @ v
v1 = eigenvectors[:, 0]
lambda1 = eigenvalues[0]
print(np.allclose(A @ v1, lambda1 * v1))  # True

# For real symmetric matrices, use eigh (faster)
S = np.array([[1, 2, 3],
              [2, 4, 5],
              [3, 5, 6]])
eigenvalues_sym, eigenvectors_sym = np.linalg.eigh(S)
```

### 4.2 Power Iteration Method

```python
def power_iteration(A, num_iterations=1000):
    """Find dominant eigenvalue and eigenvector"""
    n = A.shape[0]
    v = np.random.rand(n)
    
    for _ in range(num_iterations):
        # Multiply A and v
        v_new = A @ v
        # Normalize
        v_new = v_new / np.linalg.norm(v_new)
        v = v_new
    
    # Rayleigh quotient for eigenvalue
    eigenvalue = (v @ A @ v) / (v @ v)
    
    return eigenvalue, v

A = np.array([[4, 2], [1, 3]])
eigenvalue, eigenvector = power_iteration(A)
print(f"Dominant eigenvalue: {eigenvalue}")
print(f"Dominant eigenvector: {eigenvector}")
```

### 4.3 Properties of Eigenvalues

```python
A = np.array([[1, 2, 3],
              [0, 4, 5],
              [0, 0, 6]])

eigenvalues = np.linalg.eigvals(A)

# Trace = sum of eigenvalues
print(f"Trace: {np.trace(A)}")
print(f"Sum of eigenvalues: {np.sum(eigenvalues)}")

# Determinant = product of eigenvalues
print(f"Determinant: {np.linalg.det(A)}")
print(f"Product of eigenvalues: {np.prod(eigenvalues)}")
```

---

## 5. Matrix Decompositions

### 5.1 Singular Value Decomposition (SVD)

```python
A = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
              [10, 11, 12]])

# Decompose: A = U @ S @ V^T
U, s, Vt = np.linalg.svd(A, full_matrices=False)

print(f"U shape: {U.shape}")    # (4, 3)
print(f"s shape: {s.shape}")    # (3,)
print(f"Vt shape: {Vt.shape}")  # (3, 3)

# Reconstruct A
S = np.diag(s)
A_reconstructed = U @ S @ Vt
print(np.allclose(A, A_reconstructed))  # True

# Singular values (sorted descending)
print(f"Singular values: {s}")
```

### 5.2 SVD Applications

```python
# Low-rank approximation
def low_rank_approximation(A, k):
    """Approximate A with rank-k matrix"""
    U, s, Vt = np.linalg.svd(A, full_matrices=False)
    
    # Keep only top k singular values
    s_k = np.zeros_like(s)
    s_k[:k] = s[:k]
    
    S_k = np.diag(s_k)
    A_k = U @ S_k @ Vt
    
    return A_k

# Image compression example
img = np.random.rand(100, 100)  # Grayscale image
compressed = low_rank_approximation(img, k=10)

# Compute compression ratio
original_error = 0
compression_error = np.linalg.norm(img - compressed, 'fro')
print(f"Compression error: {compression_error}")
```

### 5.3 QR Decomposition

```python
A = np.array([[12, -51, 4],
              [6, 167, -68],
              [-4, 24, -41]], dtype=float)

# Decompose: A = Q @ R
Q, R = np.linalg.qr(A)

print("Q (orthogonal matrix):")
print(Q)

print("\nR (upper triangular):")
print(R)

# Verify: A = Q @ R
A_reconstructed = Q @ R
print(np.allclose(A, A_reconstructed))  # True

# Q is orthogonal: Q^T @ Q = I
print(np.allclose(Q.T @ Q, np.eye(3)))  # True
```

### 5.4 Cholesky Decomposition

```python
# For positive definite symmetric matrices only
# A = L @ L^T

A = np.array([[4, 12, -16],
              [12, 37, -43],
              [-16, -43, 98]], dtype=float)

# Check if positive definite
eigenvalues = np.linalg.eigvals(A)
is_pos_def = np.all(eigenvalues > 0)
print(f"Positive definite: {is_pos_def}")

if is_pos_def:
    L = np.linalg.cholesky(A)
    print("L (lower triangular):")
    print(L)
    
    # Verify: A = L @ L^T
    A_reconstructed = L @ L.T
    print(np.allclose(A, A_reconstructed))  # True
```

### 5.5 LU Decomposition

```python
from scipy import linalg  # NumPy doesn't have LU

A = np.array([[2, 5, 8, 7],
              [5, 2, 2, 8],
              [7, 5, 6, 6],
              [5, 4, 4, 8]], dtype=float)

# Decompose: PA = LU
P, L, U = linalg.lu(A)

print("P (permutation matrix):")
print(P)

print("\nL (lower triangular):")
print(L)

print("\nU (upper triangular):")
print(U)

# Verify: PA = LU
print(np.allclose(P @ A, L @ U))  # True
```

---

## 6. Applications in Machine Learning

### 6.1 Principal Component Analysis (PCA)

```python
def pca(X, n_components):
    """
    Perform PCA using SVD
    
    Parameters:
    X: data matrix (n_samples, n_features)
    n_components: number of principal components
    
    Returns:
    X_transformed: transformed data
    components: principal components
    explained_variance: variance explained by each component
    """
    # Center the data
    X_centered = X - X.mean(axis=0)
    
    # Compute SVD
    U, s, Vt = np.linalg.svd(X_centered, full_matrices=False)
    
    # Principal components
    components = Vt[:n_components]
    
    # Transform data
    X_transformed = X_centered @ components.T
    
    # Explained variance
    explained_variance = (s ** 2) / (X.shape[0] - 1)
    explained_variance = explained_variance[:n_components]
    
    return X_transformed, components, explained_variance

# Example
X = np.random.randn(100, 10)  # 100 samples, 10 features
X_pca, components, var = pca(X, n_components=3)

print(f"Original shape: {X.shape}")
print(f"Transformed shape: {X_pca.shape}")
print(f"Explained variance: {var}")
```

### 6.2 Linear Regression (Closed Form)

```python
def linear_regression(X, y):
    """
    Solve linear regression using normal equation
    θ = (X^T X)^{-1} X^T y
    """
    # Add intercept term
    X_b = np.c_[np.ones((X.shape[0], 1)), X]
    
    # Normal equation
    theta = np.linalg.inv(X_b.T @ X_b) @ X_b.T @ y
    
    return theta

# Example
np.random.seed(42)
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1)

theta = linear_regression(X, y.ravel())
print(f"Intercept: {theta[0]:.2f}")
print(f"Slope: {theta[1]:.2f}")
```

### 6.3 Ridge Regression (L2 Regularization)

```python
def ridge_regression(X, y, alpha=1.0):
    """
    Ridge regression with L2 regularization
    θ = (X^T X + α I)^{-1} X^T y
    """
    X_b = np.c_[np.ones((X.shape[0], 1)), X]
    n_features = X_b.shape[1]
    
    # Ridge normal equation
    identity = np.eye(n_features)
    identity[0, 0] = 0  # Don't regularize intercept
    
    theta = np.linalg.inv(X_b.T @ X_b + alpha * identity) @ X_b.T @ y
    
    return theta

# Example
X = np.random.randn(100, 5)
y = X @ np.array([1, 2, 3, 4, 5]) + np.random.randn(100) * 0.1

theta = ridge_regression(X, y, alpha=0.1)
print(f"Coefficients: {theta[1:]}")  # Exclude intercept
```

### 6.4 Moore-Penrose Pseudoinverse

```python
# For non-square or singular matrices
A = np.array([[1, 2],
              [3, 4],
              [5, 6]])

# Compute pseudoinverse
A_pinv = np.linalg.pinv(A)

print(f"A shape: {A.shape}")        # (3, 2)
print(f"A_pinv shape: {A_pinv.shape}")  # (2, 3)

# Properties:
# A @ A_pinv @ A = A
print(np.allclose(A @ A_pinv @ A, A))  # True

# A_pinv @ A @ A_pinv = A_pinv
print(np.allclose(A_pinv @ A @ A_pinv, A_pinv))  # True

# Use in least squares
b = np.array([1, 2, 3])
x = A_pinv @ b  # Least squares solution
```

### 6.5 Matrix Condition Number

```python
# Condition number indicates sensitivity to errors
A = np.array([[1, 2], [3, 4]])
cond = np.linalg.cond(A)
print(f"Condition number: {cond}")

# Ill-conditioned matrix (high condition number)
B = np.array([[1, 1], [1, 1.0001]])
cond_B = np.linalg.cond(B)
print(f"Condition number (ill-conditioned): {cond_B}")

# Well-conditioned: cond ≈ 1
# Ill-conditioned: cond >> 1
# Rule of thumb: if cond > 10^k, lose about k digits of precision
```

---

## 7. Practical Examples

### Example 1: Image Compression with SVD

```python
def compress_image(img, k):
    """
    Compress grayscale image using SVD
    
    Parameters:
    img: 2D array (grayscale image)
    k: number of singular values to keep
    
    Returns:
    compressed_img: compressed image
    compression_ratio: compression ratio
    """
    # SVD
    U, s, Vt = np.linalg.svd(img, full_matrices=False)
    
    # Reconstruct with k singular values
    compressed_img = U[:, :k] @ np.diag(s[:k]) @ Vt[:k, :]
    
    # Compression ratio
    original_size = img.shape[0] * img.shape[1]
    compressed_size = k * (img.shape[0] + img.shape[1] + 1)
    compression_ratio = original_size / compressed_size
    
    return compressed_img, compression_ratio

# Example (would work with actual image)
img = np.random.rand(512, 512)
compressed, ratio = compress_image(img, k=50)
print(f"Compression ratio: {ratio:.2f}x")
```

### Example 2: Covariance Matrix and Correlation

```python
# Sample data
X = np.random.randn(100, 5)

# Covariance matrix
cov_matrix = np.cov(X, rowvar=False)
print("Covariance matrix:")
print(cov_matrix)

# Correlation matrix
corr_matrix = np.corrcoef(X, rowvar=False)
print("\nCorrelation matrix:")
print(corr_matrix)

# Eigendecomposition of covariance (for PCA)
eigenvalues, eigenvectors = np.linalg.eigh(cov_matrix)

# Sort by eigenvalues (descending)
idx = eigenvalues.argsort()[::-1]
eigenvalues = eigenvalues[idx]
eigenvectors = eigenvectors[:, idx]

print("\nEigenvalues (variance explained):")
print(eigenvalues)
```

### Example 3: Whitening Transformation

```python
def whiten(X):
    """
    Whiten data (zero mean, unit variance, decorrelated)
    """
    # Center data
    X_centered = X - X.mean(axis=0)
    
    # Covariance matrix
    cov = np.cov(X_centered, rowvar=False)
    
    # Eigendecomposition
    eigenvalues, eigenvectors = np.linalg.eigh(cov)
    
    # Whitening matrix
    W = eigenvectors @ np.diag(1.0 / np.sqrt(eigenvalues + 1e-5)) @ eigenvectors.T
    
    # Whiten data
    X_whitened = X_centered @ W
    
    return X_whitened

# Example
X = np.random.randn(100, 5) @ np.random.randn(5, 5)  # Correlated data
X_white = whiten(X)

# Verify: covariance should be identity
cov_white = np.cov(X_white, rowvar=False)
print("Whitened covariance matrix:")
print(np.round(cov_white, 2))
```

---

## 🎯 Key Takeaways

1. **Matrix multiplication**: Use `@` operator or `np.dot()`
2. **Solving systems**: Use `solve()` for exact, `lstsq()` for overdetermined
3. **Eigenvalues**: Essential for understanding matrix properties and PCA
4. **SVD**: Most versatile decomposition, use for dimensionality reduction
5. **QR**: Use for numerical stability in solving systems
6. **Cholesky**: Fastest for positive definite matrices
7. **Condition number**: Check before solving systems
8. **Pseudoinverse**: Use when matrix is singular or non-square

---

## 📝 Practice Exercises

1. Implement PCA from scratch using eigendecomposition
2. Solve multivariate linear regression using normal equation
3. Perform image compression with different rank approximations
4. Implement Gram-Schmidt orthogonalization
5. Compute matrix exponential using eigendecomposition
6. Implement power iteration method for finding dominant eigenvalue
7. Create function to check if matrix is positive definite

---

## 🔗 Navigation

- **Previous**: [03 - Advanced NumPy](./03-Advanced-NumPy.md)
- **Next**: [2.2 Pandas Data Manipulation](../2.2-Pandas-Data-Manipulation/README.md)
- **Up**: [2.1 NumPy Mastery](./README.md)
