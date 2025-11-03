# 02 - Linear Algebra Extensions with SciPy

## 📋 Table of Contents
- [Introduction](#introduction)
- [Sparse Matrices](#sparse-matrices)
- [Sparse Matrix Operations](#sparse-matrix-operations)
- [Sparse Linear Systems](#sparse-linear-systems)
- [Advanced Decompositions](#advanced-decompositions)
- [Matrix Functions](#matrix-functions)
- [Special Matrices](#special-matrices)
- [Applications in ML](#applications-in-ml)
- [Practice Exercises](#practice-exercises)

---

## Introduction

SciPy extends NumPy's linear algebra capabilities with sparse matrices, advanced decompositions, and specialized algorithms crucial for large-scale ML.

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import linalg, sparse
from scipy.sparse import linalg as sparse_linalg
import pandas as pd

# Check version
import scipy
print(scipy.__version__)
```

---

## Sparse Matrices

### Why Sparse Matrices?

```python
# Dense matrix (wasteful for mostly zeros)
dense = np.zeros((1000, 1000))
dense[0, 0] = 1
dense[500, 500] = 2
print(f"Dense memory: {dense.nbytes / 1024:.2f} KB")

# Sparse matrix (efficient)
sparse_csr = sparse.csr_matrix(dense)
print(f"Sparse memory: {(sparse_csr.data.nbytes + sparse_csr.indices.nbytes + sparse_csr.indptr.nbytes) / 1024:.2f} KB")
print(f"Sparsity: {100 * (1 - sparse_csr.nnz / (1000*1000)):.2f}%")
```

### CSR Format (Compressed Sparse Row)

```python
# Create sparse matrix - CSR format
# Best for: row slicing, matrix-vector products

# Method 1: From dense
dense = np.array([[1, 0, 0, 2],
                  [0, 0, 3, 0],
                  [4, 0, 0, 5]])
sparse_csr = sparse.csr_matrix(dense)

print("CSR representation:")
print(f"Data: {sparse_csr.data}")        # Non-zero values
print(f"Indices: {sparse_csr.indices}")  # Column indices
print(f"Indptr: {sparse_csr.indptr}")   # Row pointers
print(f"\nDense:\n{sparse_csr.toarray()}")

# Method 2: Direct construction
row = np.array([0, 0, 1, 2, 2])
col = np.array([0, 3, 2, 0, 3])
data = np.array([1, 2, 3, 4, 5])
sparse_csr = sparse.csr_matrix((data, (row, col)), shape=(3, 4))
print(f"\nConstructed CSR:\n{sparse_csr.toarray()}")
```

### CSC Format (Compressed Sparse Column)

```python
# CSC format - best for column slicing
sparse_csc = sparse.csc_matrix(dense)

print("CSC representation:")
print(f"Data: {sparse_csc.data}")
print(f"Indices: {sparse_csc.indices}")  # Row indices
print(f"Indptr: {sparse_csc.indptr}")   # Column pointers
```

### COO Format (Coordinate)

```python
# COO format - best for construction
row = np.array([0, 0, 1, 2, 2])
col = np.array([0, 3, 2, 0, 3])
data = np.array([1, 2, 3, 4, 5])
sparse_coo = sparse.coo_matrix((data, (row, col)), shape=(3, 4))

print("COO representation:")
print(f"Row: {sparse_coo.row}")
print(f"Col: {sparse_coo.col}")
print(f"Data: {sparse_coo.data}")
print(f"\nDense:\n{sparse_coo.toarray()}")

# Convert between formats
sparse_csr = sparse_coo.tocsr()
sparse_csc = sparse_coo.tocsc()
```

### LIL Format (List of Lists)

```python
# LIL format - best for incremental construction
sparse_lil = sparse.lil_matrix((5, 5))
sparse_lil[0, 0] = 1
sparse_lil[1, 2] = 2
sparse_lil[3, 4] = 3

print(f"LIL matrix:\n{sparse_lil.toarray()}")

# Convert to efficient format for operations
sparse_csr = sparse_lil.tocsr()
```

### DOK Format (Dictionary of Keys)

```python
# DOK format - also good for construction
sparse_dok = sparse.dok_matrix((5, 5))
sparse_dok[0, 0] = 1
sparse_dok[2, 3] = 2
sparse_dok[4, 1] = 3

print(f"DOK matrix:\n{sparse_dok.toarray()}")

# Access elements
print(f"Element (2,3): {sparse_dok[2, 3]}")
```

### Creating Sparse Matrices

```python
# Identity
I = sparse.eye(5)
print(f"Sparse identity:\n{I.toarray()}")

# Diagonal
diag = sparse.diags([1, 2, 3, 4, 5])
print(f"\nSparse diagonal:\n{diag.toarray()}")

# Multiple diagonals
diagonals = [[1, 1, 1, 1], [2, 2, 2], [3, 3, 3]]
offsets = [0, 1, -1]  # Main, upper, lower
sparse_mat = sparse.diags(diagonals, offsets, shape=(4, 4))
print(f"\nMultiple diagonals:\n{sparse_mat.toarray()}")

# Random sparse
sparse_rand = sparse.random(10, 10, density=0.1, format='csr')
print(f"\nRandom sparse (10% non-zero):\n{sparse_rand.toarray()}")
```

---

## Sparse Matrix Operations

### Basic Operations

```python
# Create test matrices
A = sparse.csr_matrix([[1, 0, 2],
                       [0, 3, 0],
                       [4, 0, 5]])
B = sparse.csr_matrix([[2, 0, 0],
                       [0, 1, 0],
                       [0, 0, 3]])

# Addition
C = A + B
print(f"A + B:\n{C.toarray()}")

# Multiplication (element-wise)
D = A.multiply(B)
print(f"\nA * B (element-wise):\n{D.toarray()}")

# Matrix multiplication
E = A.dot(B)
print(f"\nA @ B:\n{E.toarray()}")

# Scalar operations
F = 2 * A
print(f"\n2 * A:\n{F.toarray()}")

# Transpose
G = A.T
print(f"\nA transpose:\n{G.toarray()}")
```

### Matrix-Vector Products

```python
# Efficient matrix-vector multiplication
A = sparse.random(1000, 1000, density=0.01, format='csr')
x = np.random.randn(1000)

# Sparse @ vector (very fast)
import time
start = time.time()
y_sparse = A.dot(x)
time_sparse = time.time() - start

# Dense @ vector (slow)
A_dense = A.toarray()
start = time.time()
y_dense = A_dense.dot(x)
time_dense = time.time() - start

print(f"Sparse time: {time_sparse*1000:.2f} ms")
print(f"Dense time: {time_dense*1000:.2f} ms")
print(f"Speedup: {time_dense/time_sparse:.1f}x")
print(f"Results match: {np.allclose(y_sparse, y_dense)}")
```

### Slicing and Indexing

```python
A = sparse.csr_matrix([[1, 0, 2, 0],
                       [0, 3, 0, 4],
                       [5, 0, 6, 0],
                       [0, 7, 0, 8]])

# Row slicing (efficient for CSR)
row = A[1, :]
print(f"Row 1: {row.toarray()}")

# Column slicing (efficient for CSC)
A_csc = A.tocsc()
col = A_csc[:, 2]
print(f"Column 2: {col.toarray()}")

# Sub-matrix
sub = A[1:3, 1:3]
print(f"Sub-matrix:\n{sub.toarray()}")
```

---

## Sparse Linear Systems

### Solving Sparse Systems

```python
# Solve Ax = b for sparse A
n = 100
A = sparse.diags([2, -1, -1], [0, -1, 1], shape=(n, n), format='csr')
b = np.random.randn(n)

# Direct solver
x = sparse_linalg.spsolve(A, b)
print(f"Solution norm: {np.linalg.norm(x):.6f}")
print(f"Residual: {np.linalg.norm(A.dot(x) - b):.10f}")

# Verify
print(f"Ax ≈ b: {np.allclose(A.dot(x), b)}")
```

### Iterative Solvers

```python
# For very large systems
n = 1000
A = sparse.random(n, n, density=0.01, format='csr')
A = A + A.T  # Make symmetric positive definite
A = A + n * sparse.eye(n)
b = np.random.randn(n)

# Conjugate Gradient (for symmetric positive definite)
x_cg, info = sparse_linalg.cg(A, b, atol=1e-10)
print(f"CG converged: {info == 0}")
print(f"CG residual: {np.linalg.norm(A.dot(x_cg) - b):.10f}")

# GMRES (for general systems)
x_gmres, info = sparse_linalg.gmres(A, b, atol=1e-10)
print(f"GMRES converged: {info == 0}")
print(f"GMRES residual: {np.linalg.norm(A.dot(x_gmres) - b):.10f}")

# BiCGSTAB (often faster than GMRES)
x_bicg, info = sparse_linalg.bicgstab(A, b, atol=1e-10)
print(f"BiCGSTAB converged: {info == 0}")
print(f"BiCGSTAB residual: {np.linalg.norm(A.dot(x_bicg) - b):.10f}")
```

### Sparse Eigenvalue Problems

```python
# Find eigenvalues of sparse matrix
n = 100
A = sparse.diags([2, -1, -1], [0, -1, 1], shape=(n, n), format='csr')
A = A + A.T  # Symmetric

# Find k largest eigenvalues
k = 5
eigenvalues, eigenvectors = sparse_linalg.eigsh(A, k=k, which='LA')

print(f"Largest {k} eigenvalues:")
print(eigenvalues)

# Verify
for i in range(k):
    v = eigenvectors[:, i]
    lambda_i = eigenvalues[i]
    residual = np.linalg.norm(A.dot(v) - lambda_i * v)
    print(f"Eigenvalue {i+1} residual: {residual:.10f}")
```

### Sparse SVD

```python
# Singular Value Decomposition
m, n = 100, 80
A = sparse.random(m, n, density=0.1, format='csr')

# Compute top k singular values
k = 5
u, s, vt = sparse_linalg.svds(A, k=k)

print(f"Top {k} singular values:")
print(s[::-1])  # svds returns in ascending order

# Reconstruct approximation
A_approx = u @ np.diag(s) @ vt
A_dense = A.toarray()
A_approx_full = np.zeros_like(A_dense)
A_approx_full[:, :k] = A_approx[:, :k]

error = np.linalg.norm(A_dense - u @ np.diag(s) @ vt) / np.linalg.norm(A_dense)
print(f"Relative reconstruction error: {error:.6f}")
```

---

## Advanced Decompositions

### LU Decomposition

```python
# LU factorization: A = PLU
A = np.array([[2, 1, 1],
              [4, -6, 0],
              [-2, 7, 2]], dtype=float)

# Standard LU
P, L, U = linalg.lu(A)
print("L (lower):")
print(L)
print("\nU (upper):")
print(U)
print("\nP (permutation):")
print(P)
print(f"\nReconstruction error: {np.linalg.norm(P @ L @ U - A):.10f}")

# Use for solving
b = np.array([1, 2, 3])
lu, piv = linalg.lu_factor(A)
x = linalg.lu_solve((lu, piv), b)
print(f"\nSolution: {x}")
print(f"Verification: {np.allclose(A @ x, b)}")
```

### Cholesky Decomposition

```python
# For symmetric positive definite: A = LL^T
A = np.array([[4, 2, 2],
              [2, 5, 1],
              [2, 1, 6]], dtype=float)

# Cholesky
L = linalg.cholesky(A, lower=True)
print("Cholesky L:")
print(L)
print(f"\nReconstruction: LL^T =\n{L @ L.T}")
print(f"Error: {np.linalg.norm(L @ L.T - A):.10f}")

# Use for solving (faster than LU for SPD matrices)
b = np.array([1, 2, 3])
c = linalg.cho_factor(A)
x = linalg.cho_solve(c, b)
print(f"\nSolution: {x}")
```

### QR Decomposition

```python
# QR: A = QR, Q orthogonal, R upper triangular
A = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
              [10, 11, 12]], dtype=float)

# Full QR
Q, R = linalg.qr(A, mode='full')
print(f"Q shape: {Q.shape}")
print(f"R shape: {R.shape}")
print(f"\nQ orthogonal: {np.allclose(Q.T @ Q, np.eye(Q.shape[1]))}")
print(f"Reconstruction: {np.allclose(Q @ R, A)}")

# Economic QR (more efficient)
Q, R = linalg.qr(A, mode='economic')
print(f"\nEconomic Q shape: {Q.shape}")
print(f"Economic R shape: {R.shape}")
```

### Schur Decomposition

```python
# Schur: A = QTQ^H, T quasi-upper triangular
A = np.random.randn(5, 5)

T, Q = linalg.schur(A)
print("Schur T (quasi-upper triangular):")
print(T)
print(f"\nQ orthogonal: {np.allclose(Q.T @ Q, np.eye(5))}")
print(f"Reconstruction: {np.allclose(Q @ T @ Q.T, A)}")

# Eigenvalues on diagonal of T
eigenvalues = np.diag(T)
print(f"\nEigenvalues from Schur: {eigenvalues}")
print(f"Direct eigenvalues: {np.linalg.eigvals(A)}")
```

### Hessenberg Form

```python
# Reduce to upper Hessenberg form (pre-step for eigenvalues)
A = np.random.randn(5, 5)

H, Q = linalg.hessenberg(A, calc_q=True)
print("Hessenberg H:")
print(H)
print(f"\nReconst: {np.allclose(Q @ H @ Q.T, A)}")
```

---

## Matrix Functions

### Matrix Exponential

```python
# exp(A) - important for differential equations
A = np.array([[0, 1],
              [-1, 0]])  # Rotation matrix generator

exp_A = linalg.expm(A)
print("exp(A):")
print(exp_A)

# Should be rotation matrix
theta = 1
expected = np.array([[np.cos(theta), np.sin(theta)],
                     [-np.sin(theta), np.cos(theta)]])
print(f"\nExpected rotation by 1 radian:")
print(expected)
print(f"Match: {np.allclose(exp_A, expected)}")
```

### Matrix Logarithm

```python
# log(A) - inverse of exp
A = np.array([[2, 1],
              [0, 2]])

log_A = linalg.logm(A)
print("log(A):")
print(log_A)

# Verify: exp(log(A)) = A
print(f"\nexp(log(A)):")
print(linalg.expm(log_A))
print(f"Reconstruction: {np.allclose(linalg.expm(log_A), A)}")
```

### Matrix Square Root

```python
# sqrt(A) such that sqrt(A) @ sqrt(A) = A
A = np.array([[4, 2],
              [2, 3]])

sqrt_A = linalg.sqrtm(A)
print("sqrt(A):")
print(sqrt_A)
print(f"\nsqrt(A) @ sqrt(A):")
print(sqrt_A @ sqrt_A)
print(f"Reconstruction: {np.allclose(sqrt_A @ sqrt_A, A)}")
```

### Matrix Power

```python
# A^n for any n (including fractional)
A = np.array([[1, 2],
              [0, 1]])

# Integer power
A_cubed = np.linalg.matrix_power(A, 3)
print("A^3:")
print(A_cubed)

# Fractional power (requires scipy)
A_half = linalg.fractional_matrix_power(A, 0.5)
print("\nA^0.5:")
print(A_half)
print(f"\n(A^0.5)^2:")
print(A_half @ A_half)
```

---

## Special Matrices

### Block Diagonal

```python
# Create block diagonal matrix
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
C = np.array([[9]])

block_diag = linalg.block_diag(A, B, C)
print("Block diagonal:")
print(block_diag)
```

### Circulant Matrices

```python
# First row determines entire matrix
from scipy.linalg import circulant

c = [1, 2, 3, 4]
circ = circulant(c)
print("Circulant matrix:")
print(circ)
```

### Toeplitz Matrices

```python
# Constant diagonals
from scipy.linalg import toeplitz

c = [1, 2, 3, 4]  # First column
r = [1, 5, 6, 7]  # First row
toep = toeplitz(c, r)
print("Toeplitz matrix:")
print(toep)
```

### Hankel Matrices

```python
# Anti-diagonal symmetry
from scipy.linalg import hankel

c = [1, 2, 3, 4]
r = [4, 7, 7, 8]
hank = hankel(c, r)
print("Hankel matrix:")
print(hank)
```

---

## Applications in ML

### PCA with Sparse Data

```python
from sklearn.decomposition import TruncatedSVD

# Sparse high-dimensional data (e.g., text features)
n_samples, n_features = 1000, 10000
X_sparse = sparse.random(n_samples, n_features, density=0.01, format='csr')

# PCA via truncated SVD
n_components = 50
svd = TruncatedSVD(n_components=n_components)
X_reduced = svd.fit_transform(X_sparse)

print(f"Original shape: {X_sparse.shape}")
print(f"Reduced shape: {X_reduced.shape}")
print(f"Explained variance ratio: {svd.explained_variance_ratio_[:5]}")
```

### Graph Laplacian

```python
# For graph-based ML (spectral clustering)
# Adjacency matrix (sparse graph)
adj = sparse.csr_matrix([[0, 1, 1, 0],
                         [1, 0, 1, 1],
                         [1, 1, 0, 1],
                         [0, 1, 1, 0]])

# Degree matrix
degrees = np.array(adj.sum(axis=1)).flatten()
D = sparse.diags(degrees)

# Laplacian: L = D - A
L = D - adj
print("Graph Laplacian:")
print(L.toarray())

# Normalized Laplacian
D_inv_sqrt = sparse.diags(1.0 / np.sqrt(degrees))
L_norm = sparse.eye(4) - D_inv_sqrt @ adj @ D_inv_sqrt
print("\nNormalized Laplacian:")
print(L_norm.toarray())

# Eigenvalues for spectral clustering
eigenvalues, eigenvectors = sparse_linalg.eigsh(L_norm, k=3, which='SM')
print(f"\nSmallest eigenvalues: {eigenvalues}")
```

### Solving Ridge Regression

```python
# Ridge: (X^T X + λI)w = X^T y
# Using Cholesky for efficiency

n_samples, n_features = 1000, 100
X = np.random.randn(n_samples, n_features)
y = np.random.randn(n_samples)
lambda_reg = 0.1

# Normal equations with regularization
XtX = X.T @ X
Xty = X.T @ y
A = XtX + lambda_reg * np.eye(n_features)

# Cholesky solve
cho_factor = linalg.cho_factor(A)
w = linalg.cho_solve(cho_factor, Xty)

print(f"Weights shape: {w.shape}")
print(f"Training MSE: {np.mean((X @ w - y)**2):.6f}")
```

---

## Practice Exercises

### Exercise 1: Sparse Matrix Comparison
```python
# Compare memory and speed of different sparse formats
# for specific operations
```

### Exercise 2: Iterative Solver Comparison
```python
# Compare convergence of CG, GMRES, BiCGSTAB
# on different matrix types
```

### Exercise 3: Image Compression with SVD
```python
# Load image, apply sparse SVD
# Compare compression ratios and quality
```

---

## Key Takeaways

1. **Sparse formats**: CSR (row ops), CSC (column ops), COO (construction)
2. **Sparse solvers**: `spsolve` (direct), `cg`/`gmres` (iterative)
3. **Decompositions**: LU, Cholesky, QR, Schur, SVD
4. **Matrix functions**: `expm`, `logm`, `sqrtm`
5. **Special matrices**: Block diagonal, circulant, Toeplitz
6. **ML applications**: PCA, spectral clustering, ridge regression
7. **Performance**: Sparse matrices save memory and computation
8. **Choose wisely**: Right format and algorithm for your problem

---

## 🔗 Navigation

- **Previous**: [01 - Optimization](./01-Optimization.md)
- **Next**: [03 - Statistical Functions](./03-Statistical-Functions.md)
- **Up**: [2.4 SciPy](./README.md)
