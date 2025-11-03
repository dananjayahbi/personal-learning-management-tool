# Special Matrix Types

## 📋 Overview

Certain types of matrices have special properties that make them particularly useful in machine learning. Understanding these matrix types helps in optimization, dimensionality reduction, and understanding algorithm behavior.

---

## 🔄 Symmetric Matrices

A matrix equal to its transpose:

$$\mathbf{A} = \mathbf{A}^T$$

This means: $a_{ij} = a_{ji}$ for all $i, j$

**Example:**
```
A = [[1, 2, 3],
     [2, 5, 4],
     [3, 4, 6]]
```

**Properties:**
- Eigenvalues are always **real numbers**
- Eigenvectors are **orthogonal**
- Can be diagonalized by orthogonal matrices
- Symmetric matrix has $n$ independent eigenvectors

### Python Implementation

```python
import numpy as np

# Create symmetric matrix
A = np.array([[1, 2, 3],
              [2, 5, 4],
              [3, 4, 6]])

# Check if symmetric
is_symmetric = np.allclose(A, A.T)
print("Is symmetric:", is_symmetric)

# Create symmetric matrix from any matrix
B = np.random.randn(3, 3)
B_sym = (B + B.T) / 2  # Force symmetry
print("Symmetric B:\n", B_sym)
print("Check:", np.allclose(B_sym, B_sym.T))
```

### ML Applications

1. **Covariance Matrices**: Always symmetric
   ```python
   X = np.random.randn(100, 5)  # 100 samples, 5 features
   cov_matrix = np.cov(X.T)  # Symmetric!
   print("Covariance shape:", cov_matrix.shape)  # (5, 5)
   ```

2. **Kernel Matrices**: In SVM and kernel methods
3. **Hessian Matrices**: Second derivatives in optimization
4. **Adjacency Matrices**: In graph neural networks (for undirected graphs)

---

## 📐 Orthogonal Matrices

A square matrix whose columns and rows are orthonormal vectors:

$$\mathbf{Q}^T\mathbf{Q} = \mathbf{Q}\mathbf{Q}^T = \mathbf{I}$$

This means: $\mathbf{Q}^{-1} = \mathbf{Q}^T$

**Properties:**
- Preserves vector lengths: $||\mathbf{Qx}|| = ||\mathbf{x}||$
- Preserves angles and dot products
- Determinant is ±1: $\det(\mathbf{Q}) = \pm 1$
- Very numerically stable

**Example (Rotation Matrix):**
```
Q = [[cos(θ), -sin(θ)],
     [sin(θ),  cos(θ)]]
```

### Python Implementation

```python
import numpy as np

# Create orthogonal matrix (rotation by 45°)
theta = np.pi / 4
Q = np.array([[np.cos(theta), -np.sin(theta)],
              [np.sin(theta),  np.cos(theta)]])

print("Q =\n", Q)

# Verify orthogonality
I = Q.T @ Q
print("Q^T @ Q =\n", I)
print("Is orthogonal:", np.allclose(I, np.eye(2)))

# Verify inverse property
Q_inv = np.linalg.inv(Q)
print("Q^(-1) ≈ Q^T:", np.allclose(Q_inv, Q.T))

# Verify length preservation
v = np.array([3, 4])
v_rotated = Q @ v
print("Original length:", np.linalg.norm(v))
print("Rotated length:", np.linalg.norm(v_rotated))
```

### Creating Orthogonal Matrices with QR Decomposition

```python
import numpy as np

# Any matrix can be decomposed into Q (orthogonal) and R (upper triangular)
A = np.random.randn(4, 4)
Q, R = np.linalg.qr(A)

print("Q is orthogonal:", np.allclose(Q.T @ Q, np.eye(4)))
print("Q =\n", Q)
```

### ML Applications

1. **PCA (Principal Component Analysis)**: Principal components form orthogonal basis
2. **QR Decomposition**: Used in solving least squares problems
3. **Initialization**: Orthogonal weight initialization in neural networks
4. **Data Whitening**: Decorrelating features

---

## ✅ Positive Definite Matrices

A symmetric matrix $\mathbf{A}$ is **positive definite** if:

$$\mathbf{x}^T\mathbf{A}\mathbf{x} > 0 \quad \text{for all non-zero vectors } \mathbf{x}$$

**Equivalent Conditions:**
1. All eigenvalues are positive: $\lambda_i > 0$
2. All leading principal minors are positive
3. Can be written as $\mathbf{A} = \mathbf{B}^T\mathbf{B}$ for some invertible $\mathbf{B}$

**Example:**
```
A = [[2, -1,  0],
     [-1, 2, -1],
     [0, -1,  2]]

This is positive definite (eigenvalues: ~0.59, 2, ~3.41)
```

### Positive Semi-Definite

If $\mathbf{x}^T\mathbf{A}\mathbf{x} \geq 0$ (allowing zero), the matrix is **positive semi-definite**.

- Eigenvalues: $\lambda_i \geq 0$
- Example: Covariance matrices are always PSD

### Python Implementation

```python
import numpy as np

def is_positive_definite(A):
    """Check if matrix is positive definite"""
    if not np.allclose(A, A.T):
        return False  # Must be symmetric
    
    try:
        # Try Cholesky decomposition
        # Only works for positive definite matrices
        np.linalg.cholesky(A)
        return True
    except np.linalg.LinAlgError:
        return False

def check_eigenvalues(A):
    """Check using eigenvalues"""
    eigenvalues = np.linalg.eigvalsh(A)  # For symmetric matrices
    print("Eigenvalues:", eigenvalues)
    
    if np.all(eigenvalues > 0):
        return "Positive Definite"
    elif np.all(eigenvalues >= 0):
        return "Positive Semi-Definite"
    else:
        return "Not Positive (Semi-)Definite"

# Example 1: Positive Definite
A = np.array([[2, -1, 0],
              [-1, 2, -1],
              [0, -1, 2]])

print("Matrix A:")
print("Is PD:", is_positive_definite(A))
print("Classification:", check_eigenvalues(A))

# Example 2: Creating PD matrix
B = np.random.randn(4, 4)
PD_matrix = B.T @ B  # Always PD if B is full rank
print("\nB^T @ B is PD:", is_positive_definite(PD_matrix))

# Example 3: Covariance matrix (PSD)
X = np.random.randn(50, 3)
cov = np.cov(X.T)
print("\nCovariance matrix classification:", check_eigenvalues(cov))
```

### ML Applications

1. **Optimization**: Loss functions with PD Hessian have unique minimum
2. **Covariance Matrices**: Always positive semi-definite
3. **Kernel Methods**: Kernel matrices must be PSD
4. **Gaussian Processes**: Covariance functions must produce PD matrices
5. **Numerical Stability**: PD matrices are well-conditioned

---

## 🔺 Upper and Lower Triangular Matrices

**Upper Triangular**: All elements below diagonal are zero
```
U = [[1, 2, 3],
     [0, 4, 5],
     [0, 0, 6]]
```

**Lower Triangular**: All elements above diagonal are zero
```
L = [[1, 0, 0],
     [2, 3, 0],
     [4, 5, 6]]
```

**Properties:**
- Determinant = product of diagonal elements
- Easy to invert
- Efficient for solving linear systems (back/forward substitution)

### Python Implementation

```python
import numpy as np

A = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])

# Extract upper triangular
U = np.triu(A)  # triu = triangle upper
print("Upper triangular:\n", U)

# Extract lower triangular
L = np.tril(A)  # tril = triangle lower
print("Lower triangular:\n", L)

# Create with offset
U_offset = np.triu(A, k=1)  # k=1: above diagonal
print("Strictly upper:\n", U_offset)

# Determinant of triangular matrix
T = np.array([[2, 0, 0],
              [1, 3, 0],
              [4, 5, 6]])
det_T = np.prod(np.diag(T))  # Product of diagonal
det_T_numpy = np.linalg.det(T)
print("Determinant:", det_T, det_T_numpy)
```

### ML Applications

1. **LU Decomposition**: $\mathbf{A} = \mathbf{LU}$ for solving linear systems
2. **Cholesky Decomposition**: $\mathbf{A} = \mathbf{LL}^T$ for PD matrices
3. **QR Algorithm**: For computing eigenvalues
4. **Backpropagation**: Efficient gradient computation

---

## 🎭 Idempotent Matrices

A matrix that equals its own square:

$$\mathbf{A}^2 = \mathbf{A}$$

**Example (Projection Matrix):**
```
P = [[1, 0],
     [0, 0]]

P^2 = P (projects onto x-axis)
```

**Properties:**
- Eigenvalues are 0 or 1
- Represent projection operations
- $\mathbf{A}^k = \mathbf{A}$ for all $k \geq 1$

### Python Implementation

```python
import numpy as np

# Projection matrix onto x-axis
P = np.array([[1, 0],
              [0, 0]])

P2 = P @ P
print("P =\n", P)
print("P^2 =\n", P2)
print("Is idempotent:", np.allclose(P, P2))

# General projection matrix formula: P = A(A^T A)^(-1) A^T
A = np.array([[1, 0],
              [1, 1],
              [1, 2]])  # 3D points to be projected

P_general = A @ np.linalg.inv(A.T @ A) @ A.T
print("\nGeneral projection is idempotent:", 
      np.allclose(P_general @ P_general, P_general))
```

### ML Applications

1. **Linear Regression**: Hat matrix $\mathbf{H} = \mathbf{X}(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T$
2. **PCA**: Projection onto principal components
3. **Orthogonal Projections**: In optimization

---

## 🔄 Involutory Matrices

A matrix that is its own inverse:

$$\mathbf{A}^2 = \mathbf{I}$$

This means: $\mathbf{A}^{-1} = \mathbf{A}$

**Example:**
```
A = [[0, 1],
     [1, 0]]  (swap matrix)

A^2 = I
```

### Python Implementation

```python
import numpy as np

# Swap matrix
A = np.array([[0, 1],
              [1, 0]])

A2 = A @ A
print("A^2 =\n", A2)
print("Is involutory:", np.allclose(A2, np.eye(2)))

# Reflection matrix (reflect across a line)
# Reflect across y = x
R = np.array([[0, 1],
              [1, 0]])

print("\nReflection twice gives identity:", 
      np.allclose(R @ R, np.eye(2)))
```

---

## 🔧 Practical Exercise: Working with Special Matrices

```python
import numpy as np
import matplotlib.pyplot as plt

# 1. Create a symmetric positive definite matrix
def create_spd_matrix(n):
    """Create symmetric positive definite matrix"""
    A = np.random.randn(n, n)
    return A.T @ A + n * np.eye(n)  # Adding diagonal ensures PD

spd = create_spd_matrix(4)
print("SPD Matrix:\n", spd)
print("Eigenvalues:", np.linalg.eigvalsh(spd))

# 2. Visualize covariance as ellipse
mean = [0, 0]
cov = [[1, 0.8], 
       [0.8, 1]]  # Symmetric PSD

# Generate data
data = np.random.multivariate_normal(mean, cov, 1000)

# Plot
plt.figure(figsize=(8, 6))
plt.scatter(data[:, 0], data[:, 1], alpha=0.5)
plt.axis('equal')
plt.title('Data from Symmetric Covariance Matrix')
plt.xlabel('X')
plt.ylabel('Y')
plt.grid(True)
plt.show()

# 3. Orthogonal transformation (rotation + reflection)
theta = np.pi / 6
Q = np.array([[np.cos(theta), -np.sin(theta)],
              [np.sin(theta),  np.cos(theta)]])

# Apply to data
data_rotated = (Q @ data.T).T

plt.figure(figsize=(8, 6))
plt.scatter(data_rotated[:, 0], data_rotated[:, 1], alpha=0.5)
plt.axis('equal')
plt.title('Data after Orthogonal Transformation')
plt.xlabel('X')
plt.ylabel('Y')
plt.grid(True)
plt.show()

print("Covariance preserved:", 
      np.allclose(np.cov(data.T), np.cov(data_rotated.T)))
```

---

## 🎓 Key Takeaways

1. **Symmetric matrices** have real eigenvalues and orthogonal eigenvectors
2. **Orthogonal matrices** preserve distances and angles
3. **Positive definite matrices** ensure unique minima in optimization
4. **Triangular matrices** enable efficient computation
5. **Special properties** lead to computational advantages

---

## 🔗 Next Steps

- **Next Topic**: [Matrix Decompositions](./04-Matrix-Decompositions.md)
- **Practice**: Identify special matrix types in ML algorithms
- **Explore**: How PCA uses symmetric matrices

---

## 📚 Additional Resources

- [Matrix Cookbook](https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf)
- [Positive Definite Matrices](http://www.math.harvard.edu/archive/21b_fall_04/exhibits/2dmatrices/index.html)
- [Gilbert Strang's Linear Algebra](https://ocw.mit.edu/courses/mathematics/18-06-linear-algebra-spring-2010/)

---

**Remember:** Recognizing special matrix types helps you choose the right algorithms and understand why they work!
