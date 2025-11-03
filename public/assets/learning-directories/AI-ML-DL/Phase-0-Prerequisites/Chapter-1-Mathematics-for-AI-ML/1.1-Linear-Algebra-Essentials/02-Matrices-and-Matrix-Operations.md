# Matrices and Matrix Operations

## 📋 Overview

Matrices are 2D arrays of numbers that are fundamental to machine learning. Neural network weights, image data, transformation operations, and datasets themselves are all represented as matrices. Understanding matrix operations is essential for implementing and understanding ML algorithms.

---

## 🎯 What is a Matrix?

A **matrix** is a rectangular array of numbers arranged in rows and columns.

### Mathematical Notation

An $m \times n$ matrix **A** has $m$ rows and $n$ columns:

$$\mathbf{A} = \begin{bmatrix} 
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}$$

**Example:**
```
A 3×2 matrix:
A = [[1, 2],
     [3, 4],
     [5, 6]]
```

### Matrix Dimensions

- **Shape**: $(m, n)$ where $m$ = rows, $n$ = columns
- **Square Matrix**: $m = n$
- **Row Vector**: $1 \times n$ matrix
- **Column Vector**: $m \times 1$ matrix

### Python Implementation

```python
import numpy as np

# Creating matrices
A = np.array([[1, 2, 3],
              [4, 5, 6]])

print("Shape:", A.shape)  # (2, 3)
print("Number of dimensions:", A.ndim)  # 2
print("Total elements:", A.size)  # 6
print("Data type:", A.dtype)  # int64 or int32

# Creating special matrices
zeros = np.zeros((3, 2))      # All zeros
ones = np.ones((2, 4))         # All ones
identity = np.eye(3)           # Identity matrix
random = np.random.rand(2, 3)  # Random values [0, 1)
```

---

## ➕ Matrix Addition and Subtraction

Matrices of the **same dimensions** can be added or subtracted element-wise:

$$\mathbf{A} + \mathbf{B} = \begin{bmatrix} a_{11}+b_{11} & a_{12}+b_{12} \\ a_{21}+b_{21} & a_{22}+b_{22} \end{bmatrix}$$

**Properties:**
- Commutative: $\mathbf{A} + \mathbf{B} = \mathbf{B} + \mathbf{A}$
- Associative: $(\mathbf{A} + \mathbf{B}) + \mathbf{C} = \mathbf{A} + (\mathbf{B} + \mathbf{C})$
- Identity: $\mathbf{A} + \mathbf{0} = \mathbf{A}$

**Example:**
```
A = [[1, 2],     B = [[5, 6],
     [3, 4]]          [7, 8]]

A + B = [[6, 8],
         [10, 12]]
```

### Python Implementation

```python
import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Addition
C = A + B
print("A + B =\n", C)

# Subtraction
D = A - B
print("A - B =\n", D)
```

---

## ✖️ Scalar Multiplication

Multiply every element by a scalar:

$$c \cdot \mathbf{A} = \begin{bmatrix} c \cdot a_{11} & c \cdot a_{12} \\ c \cdot a_{21} & c \cdot a_{22} \end{bmatrix}$$

**Properties:**
- Distributive: $c(\mathbf{A} + \mathbf{B}) = c\mathbf{A} + c\mathbf{B}$
- Associative: $(cd)\mathbf{A} = c(d\mathbf{A})$

**Example:**
```
A = [[1, 2],     3·A = [[3, 6],
     [3, 4]]            [9, 12]]
```

### Python Implementation

```python
import numpy as np

A = np.array([[1, 2], [3, 4]])
scalar = 3

result = scalar * A
print("3 * A =\n", result)
```

---

## 🔢 Matrix Multiplication

The most important operation! Multiply an $m \times n$ matrix by an $n \times p$ matrix to get an $m \times p$ matrix.

**Rule:** Number of columns in first matrix = number of rows in second matrix.

$$(\mathbf{AB})_{ij} = \sum_{k=1}^{n} a_{ik} \cdot b_{kj}$$

**Example:**
```
A (2×3) × B (3×2) = C (2×2)

A = [[1, 2, 3],    B = [[7, 8],
     [4, 5, 6]]         [9, 10],
                        [11, 12]]

C = [[58, 64],
     [139, 154]]

Calculation for C[0,0]:
1×7 + 2×9 + 3×11 = 7 + 18 + 33 = 58
```

**Properties:**
- **NOT commutative**: $\mathbf{AB} \neq \mathbf{BA}$ (in general)
- Associative: $(\mathbf{AB})\mathbf{C} = \mathbf{A}(\mathbf{BC})$
- Distributive: $\mathbf{A}(\mathbf{B} + \mathbf{C}) = \mathbf{AB} + \mathbf{AC}$
- Identity: $\mathbf{AI} = \mathbf{IA} = \mathbf{A}$

### Python Implementation

```python
import numpy as np

A = np.array([[1, 2, 3],
              [4, 5, 6]])

B = np.array([[7, 8],
              [9, 10],
              [11, 12]])

# Method 1: np.matmul
C1 = np.matmul(A, B)

# Method 2: @ operator (recommended)
C2 = A @ B

# Method 3: np.dot (also works)
C3 = np.dot(A, B)

print("A @ B =\n", C2)

# Note: Element-wise multiplication (different!)
A_elem = np.array([[1, 2], [3, 4]])
B_elem = np.array([[5, 6], [7, 8]])
element_wise = A_elem * B_elem  # [[5, 12], [21, 32]]
```

### ML Applications of Matrix Multiplication

1. **Neural Networks**: Computing layer outputs: $\mathbf{y} = \mathbf{Wx} + \mathbf{b}$
2. **Data Transformation**: Applying transformations to datasets
3. **Dimensionality Reduction**: PCA projection matrices
4. **Convolutional Layers**: Can be expressed as matrix operations

---

## 🔄 Matrix Transpose

Flip rows and columns:

$$\mathbf{A}^T_{ij} = \mathbf{A}_{ji}$$

**Properties:**
- $(\mathbf{A}^T)^T = \mathbf{A}$
- $(\mathbf{A} + \mathbf{B})^T = \mathbf{A}^T + \mathbf{B}^T$
- $(\mathbf{AB})^T = \mathbf{B}^T\mathbf{A}^T$ (order reverses!)
- $(c\mathbf{A})^T = c\mathbf{A}^T$

**Example:**
```
A = [[1, 2, 3],      A^T = [[1, 4],
     [4, 5, 6]]            [2, 5],
                           [3, 6]]
```

### Python Implementation

```python
import numpy as np

A = np.array([[1, 2, 3],
              [4, 5, 6]])

# Method 1: .T attribute
A_T1 = A.T

# Method 2: transpose function
A_T2 = np.transpose(A)

print("Original shape:", A.shape)    # (2, 3)
print("Transposed shape:", A_T1.shape)  # (3, 2)
print("A^T =\n", A_T1)
```

### ML Applications of Transpose

1. **Gradient Computation**: Computing gradients in backpropagation
2. **Gram Matrix**: $\mathbf{A}^T\mathbf{A}$ for feature correlations
3. **Linear Regression**: Normal equations: $\mathbf{w} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$

---

## 🔁 Matrix Inverse

For a square matrix $\mathbf{A}$, the inverse $\mathbf{A}^{-1}$ satisfies:

$$\mathbf{AA}^{-1} = \mathbf{A}^{-1}\mathbf{A} = \mathbf{I}$$

**Not all matrices have inverses!** A matrix is **invertible** (or non-singular) if its determinant ≠ 0.

**Properties:**
- $(\mathbf{A}^{-1})^{-1} = \mathbf{A}$
- $(\mathbf{AB})^{-1} = \mathbf{B}^{-1}\mathbf{A}^{-1}$ (order reverses!)
- $(\mathbf{A}^T)^{-1} = (\mathbf{A}^{-1})^T$

**Example (2×2 matrix):**

For $\mathbf{A} = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$:

$$\mathbf{A}^{-1} = \frac{1}{ad-bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$$

### Python Implementation

```python
import numpy as np

A = np.array([[4, 7],
              [2, 6]])

# Compute inverse
A_inv = np.linalg.inv(A)
print("A^(-1) =\n", A_inv)

# Verify: A @ A^(-1) = I
I = A @ A_inv
print("A @ A^(-1) =\n", I)  # Close to identity matrix
print("Rounded:\n", np.round(I))

# Check if invertible (determinant ≠ 0)
det = np.linalg.det(A)
print("Determinant:", det)  # Should be non-zero
```

### ML Applications of Matrix Inverse

1. **Linear Regression**: Solving normal equations analytically
2. **Kalman Filters**: State estimation
3. **Covariance Matrix**: Computing precision matrices
4. **Numerical Caution**: Inverses are computationally expensive and numerically unstable

⚠️ **Warning:** In practice, we rarely compute inverses directly. Instead, we solve linear systems using more stable methods like LU decomposition or QR decomposition.

---

## 🎲 Matrix Determinant

The determinant is a scalar value computed from a square matrix.

**For 2×2 matrix:**

$$\det(\mathbf{A}) = \begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc$$

**Properties:**
- $\det(\mathbf{AB}) = \det(\mathbf{A}) \cdot \det(\mathbf{B})$
- $\det(\mathbf{A}^T) = \det(\mathbf{A})$
- $\det(\mathbf{A}^{-1}) = \frac{1}{\det(\mathbf{A})}$
- $\det(c\mathbf{A}) = c^n \det(\mathbf{A})$ for $n \times n$ matrix

**Interpretation:**
- $|\det(\mathbf{A})|$ = scaling factor for area/volume transformations
- $\det(\mathbf{A}) = 0$ ⟹ matrix is singular (not invertible)
- $\det(\mathbf{A}) \neq 0$ ⟹ matrix is invertible

### Python Implementation

```python
import numpy as np

# 2×2 matrix
A = np.array([[3, 8],
              [4, 6]])

det_A = np.linalg.det(A)
print("Determinant:", det_A)  # -14

# 3×3 matrix
B = np.array([[6, 1, 1],
              [4, -2, 5],
              [2, 8, 7]])

det_B = np.linalg.det(B)
print("Determinant of B:", det_B)  # -306

# Check if singular
if np.abs(det_A) < 1e-10:
    print("Matrix is singular")
else:
    print("Matrix is invertible")
```

---

## 🆔 Identity Matrix

A square matrix with 1s on the diagonal and 0s elsewhere:

$$\mathbf{I}_n = \begin{bmatrix} 
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}$$

**Properties:**
- $\mathbf{AI} = \mathbf{IA} = \mathbf{A}$
- $\mathbf{I}^{-1} = \mathbf{I}$
- $\det(\mathbf{I}) = 1$

### Python Implementation

```python
import numpy as np

# Create identity matrix
I3 = np.eye(3)
I5 = np.identity(5)

print("3×3 Identity:\n", I3)

# Verify property
A = np.array([[1, 2], [3, 4]])
I2 = np.eye(2)

print("A @ I =\n", A @ I2)  # Same as A
print("I @ A =\n", I2 @ A)  # Same as A
```

---

## 📐 Diagonal Matrix

A matrix with non-zero elements only on the diagonal:

$$\mathbf{D} = \begin{bmatrix} 
d_1 & 0 & 0 \\
0 & d_2 & 0 \\
0 & 0 & d_3
\end{bmatrix}$$

**Properties:**
- Easy to compute inverse: $\mathbf{D}^{-1}_{ii} = \frac{1}{d_i}$ (if $d_i \neq 0$)
- Easy to compute powers: $\mathbf{D}^k_{ii} = d_i^k$
- $\det(\mathbf{D}) = \prod d_i$

### Python Implementation

```python
import numpy as np

# Create diagonal matrix from vector
d = np.array([2, 3, 4])
D = np.diag(d)
print("Diagonal matrix:\n", D)

# Extract diagonal from matrix
A = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])
diag_elements = np.diag(A)
print("Diagonal elements:", diag_elements)  # [1, 5, 9]

# Diagonal matrix multiplication is fast!
x = np.array([1, 2, 3])
result = D @ x  # Element-wise: [2*1, 3*2, 4*3] = [2, 6, 12]
print("D @ x =", result)
```

---

## 🕸️ Sparse Matrices

Matrices with mostly zero elements.

**Why Care?**
- **Memory efficiency**: Store only non-zero elements
- **Computational efficiency**: Skip operations with zeros
- **Common in ML**: Text data (TF-IDF), graph data, large neural networks

### Python Implementation

```python
import numpy as np
from scipy import sparse

# Dense matrix (wasteful for sparse data)
dense = np.array([[1, 0, 0, 0],
                  [0, 0, 2, 0],
                  [0, 3, 0, 0],
                  [0, 0, 0, 4]])

# Convert to sparse format (CSR - Compressed Sparse Row)
sparse_csr = sparse.csr_matrix(dense)
print("Sparse representation:\n", sparse_csr)
print("Non-zero elements:", sparse_csr.nnz)

# Memory comparison
print("Dense size:", dense.nbytes, "bytes")
print("Sparse size:", sparse_csr.data.nbytes + sparse_csr.indices.nbytes + sparse_csr.indptr.nbytes, "bytes")

# Operations on sparse matrices
sparse_coo = sparse.coo_matrix(dense)  # COO format
sparse_csc = sparse.csc_matrix(dense)  # CSC format

# Convert back to dense
dense_again = sparse_csr.toarray()
```

### Sparse Matrix Formats

1. **COO (Coordinate)**: Good for construction
2. **CSR (Compressed Sparse Row)**: Good for row slicing and matrix-vector products
3. **CSC (Compressed Sparse Column)**: Good for column slicing
4. **LIL (List of Lists)**: Good for incremental construction

---

## 🔧 Practical Exercises

### Exercise 1: Matrix Operations
```python
import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

print("A + B =\n", A + B)
print("A @ B =\n", A @ B)
print("A^T =\n", A.T)
print("det(A) =", np.linalg.det(A))
print("A^(-1) =\n", np.linalg.inv(A))
```

### Exercise 2: Solve Linear System
Solve $\mathbf{Ax} = \mathbf{b}$:

```python
import numpy as np

A = np.array([[3, 1],
              [1, 2]])
b = np.array([9, 8])

# Method 1: Using inverse (not recommended)
x1 = np.linalg.inv(A) @ b

# Method 2: Using solve (recommended)
x2 = np.linalg.solve(A, b)

print("Solution x =", x2)
print("Verification A@x =", A @ x2)  # Should equal b
```

### Exercise 3: Batch Processing with Matrices
```python
import numpy as np

# Batch of 5 data points, each with 3 features
X = np.random.randn(5, 3)

# Weight matrix (3 input features → 2 output features)
W = np.random.randn(3, 2)
b = np.random.randn(2)

# Compute outputs for all data points at once
Y = X @ W + b  # Broadcasting adds b to each row

print("Input shape:", X.shape)   # (5, 3)
print("Output shape:", Y.shape)  # (5, 2)
print("Outputs:\n", Y)
```

---

## 🎓 Key Takeaways

1. **Matrix multiplication is NOT commutative**: $\mathbf{AB} \neq \mathbf{BA}$
2. **Shape compatibility matters**: $(m \times n)$ × $(n \times p)$ = $(m \times p)$
3. **Transpose order reverses**: $(\mathbf{AB})^T = \mathbf{B}^T\mathbf{A}^T$
4. **Avoid computing inverses**: Use `np.linalg.solve` instead
5. **Sparse matrices save memory**: Use scipy.sparse for large sparse data

---

## 🔗 Next Steps

- **Next Topic**: [Special Matrix Types](./03-Special-Matrix-Types.md)
- **Practice**: Implement matrix operations from scratch
- **Application**: Build a simple linear regression using matrix operations

---

## 📚 Additional Resources

- [3Blue1Brown: Matrix Multiplication](https://www.youtube.com/watch?v=XkY2DOUCWMU)
- [Khan Academy: Matrices](https://www.khanacademy.org/math/linear-algebra/matrix-transformations)
- [NumPy Linear Algebra](https://numpy.org/doc/stable/reference/routines.linalg.html)
- [SciPy Sparse Matrices](https://docs.scipy.org/doc/scipy/reference/sparse.html)

---

**Remember:** Matrices are the backbone of neural networks. Every layer operation is matrix multiplication!
