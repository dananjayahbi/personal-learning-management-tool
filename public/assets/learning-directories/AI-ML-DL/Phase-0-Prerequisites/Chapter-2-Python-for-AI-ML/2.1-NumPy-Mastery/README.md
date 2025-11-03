# 2.1 NumPy Mastery

## 📋 Overview

NumPy (Numerical Python) is the cornerstone of scientific computing in Python. It provides efficient array operations, mathematical functions, and linear algebra capabilities that are essential for machine learning and data science.

**Why NumPy is Critical for AI/ML:**
- 🚀 **Performance**: 10-100x faster than pure Python
- 🧮 **Foundation**: Base for pandas, scikit-learn, TensorFlow, PyTorch
- 💾 **Memory Efficient**: Compact data storage
- 🔬 **Scientific**: Extensive mathematical function library
- 🌐 **Universal**: Industry standard for numerical computing

---

## 🎯 Learning Objectives

By the end of this section, you will:
- ✅ Master array creation and manipulation
- ✅ Perform vectorized operations efficiently
- ✅ Apply broadcasting for elegant solutions
- ✅ Use advanced indexing techniques
- ✅ Implement linear algebra operations
- ✅ Optimize code for performance

---

## 📚 Topics Covered

### [01 - Array Fundamentals](./01-Array-Fundamentals.md)
- Installing and importing NumPy
- Creating arrays (zeros, ones, arange, linspace)
- Array attributes (shape, dtype, size, ndim)
- Indexing and slicing (1D, 2D, multi-dimensional)
- Reshaping and flattening
- Data types and type conversion
- Views vs copies
- **Practice**: 8 exercises with solutions

**Key Functions**: `np.array()`, `np.zeros()`, `np.ones()`, `np.arange()`, `np.linspace()`, `reshape()`, `flatten()`, `ravel()`

---

### [02 - Array Operations](./02-Array-Operations.md)
- Element-wise arithmetic operations
- Comparison and logical operations
- Broadcasting rules and patterns
- Universal functions (ufuncs)
- Trigonometric and mathematical functions
- Aggregation functions (sum, mean, std)
- Cumulative functions
- Performance optimization tips
- **Practice**: 6 exercises with solutions

**Key Functions**: `np.sum()`, `np.mean()`, `np.std()`, `np.min()`, `np.max()`, `np.dot()`, `np.outer()`, `np.cross()`

---

### [03 - Advanced NumPy](./03-Advanced-NumPy.md)
- Boolean indexing and masking
- Fancy indexing with integer arrays
- `np.where()` and `np.select()`
- Vectorization techniques
- Memory layout (C-order vs F-order)
- Views vs copies (deep dive)
- Random number generation
- `einsum` for complex operations
- Structured arrays
- Memory-mapped arrays
- **Practice**: 6 exercises with solutions

**Key Functions**: `np.where()`, `np.select()`, `np.vectorize()`, `np.einsum()`, `np.random.seed()`, `np.memmap()`

---

### [04 - Linear Algebra with NumPy](./04-Linear-Algebra-with-NumPy.md)
- Matrix operations (multiplication, transpose)
- `np.linalg` module overview
- Solving linear systems (`solve()`, `lstsq()`)
- Eigenvalues and eigenvectors
- Matrix decompositions:
  - Singular Value Decomposition (SVD)
  - QR decomposition
  - Cholesky decomposition
  - LU decomposition
- Applications in ML:
  - Principal Component Analysis (PCA)
  - Linear regression
  - Ridge regression
  - Matrix conditioning
- **Practice**: 7 exercises with solutions

**Key Functions**: `np.linalg.solve()`, `np.linalg.eig()`, `np.linalg.svd()`, `np.linalg.qr()`, `np.linalg.inv()`, `np.linalg.det()`, `np.linalg.norm()`

---

## 🏆 Real-world Applications

### 1. **Image Processing**
```python
# Load and manipulate images
import numpy as np
img = np.random.rand(512, 512, 3)  # RGB image
gray = img.mean(axis=2)  # Convert to grayscale
```

### 2. **Data Preprocessing**
```python
# Normalize features
X = (X - X.mean(axis=0)) / X.std(axis=0)

# One-hot encoding
labels = np.array([0, 1, 2, 1, 0])
one_hot = np.eye(3)[labels]
```

### 3. **Neural Network Operations**
```python
# Forward pass
Z = X @ W + b
A = 1 / (1 + np.exp(-Z))  # Sigmoid activation
```

### 4. **Distance Computations**
```python
# Pairwise distances (efficient)
diff = X[:, np.newaxis, :] - X[np.newaxis, :, :]
distances = np.sqrt(np.sum(diff**2, axis=2))
```

---

## 📊 Performance Comparison

| Operation | Pure Python | NumPy | Speedup |
|-----------|-------------|-------|---------|
| Sum 1M numbers | 150 ms | 1.5 ms | **100x** |
| Matrix mult (1000x1000) | 45 s | 0.05 s | **900x** |
| Element-wise operations | 200 ms | 2 ms | **100x** |
| Boolean filtering | 100 ms | 1 ms | **100x** |

**Key Insight**: Always use NumPy vectorized operations instead of Python loops!

---

## 🔧 Essential NumPy Patterns

### Pattern 1: Vectorization
```python
# Bad: Loop
total = 0
for x in arr:
    total += x ** 2

# Good: Vectorized
total = np.sum(arr ** 2)
```

### Pattern 2: Broadcasting
```python
# Normalize each row
matrix = np.random.rand(100, 10)
row_means = matrix.mean(axis=1, keepdims=True)
normalized = matrix - row_means
```

### Pattern 3: Boolean Indexing
```python
# Filter outliers
data = np.random.randn(1000)
filtered = data[np.abs(data) < 3]  # Keep within 3 std
```

### Pattern 4: Axis Operations
```python
# Operate along specific dimension
X = np.random.rand(100, 10)
col_sums = X.sum(axis=0)    # Sum each column
row_means = X.mean(axis=1)  # Mean of each row
```

---

## 🎓 Learning Path

### Beginner (Week 1)
- [ ] Complete 01-Array-Fundamentals
- [ ] Practice array creation and indexing
- [ ] Understand shapes and dimensions
- [ ] Exercise: Create checkerboard pattern

### Intermediate (Week 2)
- [ ] Complete 02-Array-Operations
- [ ] Master broadcasting
- [ ] Learn aggregation functions
- [ ] Exercise: Implement moving average

### Advanced (Week 3)
- [ ] Complete 03-Advanced-NumPy
- [ ] Vectorize custom functions
- [ ] Optimize for performance
- [ ] Exercise: Implement k-NN algorithm

### Expert (Week 4)
- [ ] Complete 04-Linear-Algebra
- [ ] Implement PCA from scratch
- [ ] Solve regression problems
- [ ] Exercise: Image compression with SVD

---

## 📝 Comprehensive Exercises

### Exercise Set 1: Fundamentals
1. Create a 3D array of shape (3, 4, 5) filled with sequential numbers
2. Extract all elements greater than the mean
3. Reshape to (5, 12) and then to (60,)

### Exercise Set 2: Operations
4. Implement min-max normalization
5. Compute pairwise Euclidean distances
6. Create correlation matrix

### Exercise Set 3: Advanced
7. Implement custom ReLU activation with vectorization
8. Use fancy indexing to shuffle data
9. Optimize matrix multiplication timing

### Exercise Set 4: Linear Algebra
10. Implement PCA for dimensionality reduction
11. Solve overdetermined system with least squares
12. Compress image using SVD

---

## 🧪 Mini-Project: Data Analysis Pipeline

**Goal**: Build complete data preprocessing pipeline

```python
import numpy as np

# 1. Generate synthetic dataset
X = np.random.randn(1000, 20)
y = (X @ np.random.randn(20) + np.random.randn(1000)) > 0

# 2. Handle missing values (simulate with NaN)
X[np.random.rand(*X.shape) < 0.1] = np.nan
X = np.nan_to_num(X, nan=np.nanmean(X, axis=0))

# 3. Normalize features
X = (X - X.mean(axis=0)) / X.std(axis=0)

# 4. Remove correlated features
corr_matrix = np.corrcoef(X, rowvar=False)
high_corr = np.abs(corr_matrix) > 0.9
np.fill_diagonal(high_corr, False)
to_remove = np.any(high_corr, axis=0)
X_reduced = X[:, ~to_remove]

# 5. Apply PCA
U, s, Vt = np.linalg.svd(X_reduced, full_matrices=False)
X_pca = X_reduced @ Vt[:10].T

print(f"Original shape: {X.shape}")
print(f"Reduced shape: {X_reduced.shape}")
print(f"PCA shape: {X_pca.shape}")
```

---

## 🔗 Additional Resources

### Documentation
- [NumPy Official Documentation](https://numpy.org/doc/stable/)
- [NumPy User Guide](https://numpy.org/doc/stable/user/index.html)
- [NumPy Reference](https://numpy.org/doc/stable/reference/)

### Tutorials
- [NumPy Quickstart Tutorial](https://numpy.org/doc/stable/user/quickstart.html)
- [NumPy for MATLAB Users](https://numpy.org/doc/stable/user/numpy-for-matlab-users.html)
- [100 NumPy Exercises](https://github.com/rougier/numpy-100)

### Books
- "Guide to NumPy" by Travis Oliphant
- "Python Data Science Handbook" by Jake VanderPlas
- "Elegant SciPy" by Juan Nunez-Iglesias et al.

### Videos
- 3Blue1Brown: Essence of Linear Algebra
- Khan Academy: Linear Algebra Course
- NumPy tutorials on YouTube

---

## ✅ Section Completion Checklist

- [ ] Read all 4 topic files
- [ ] Complete all code examples
- [ ] Solve all practice exercises (27 total)
- [ ] Complete mini-project
- [ ] Benchmark vectorized vs loop operations
- [ ] Implement at least one ML algorithm with NumPy
- [ ] Review and understand all key functions

**Time Estimate**: 15-20 hours

---

## 🚀 Next Steps

Once you've mastered NumPy:
1. Move to **[2.2 Pandas for Data Manipulation](../2.2-Pandas-Data-Manipulation/README.md)**
2. Review **[Chapter 1: Mathematics](../../Chapter-1-Mathematics-for-AI-ML/README.md)** with NumPy implementations
3. Start implementing ML algorithms from scratch

---

## 💡 Pro Tips

1. **Always vectorize**: If you're writing a loop, there's probably a NumPy way
2. **Profile first**: Use `%timeit` in Jupyter to find bottlenecks
3. **Broadcast intelligently**: Understanding broadcasting unlocks elegant solutions
4. **Check memory**: Use `.nbytes` to monitor memory usage
5. **Copy when needed**: Use `.copy()` to avoid unexpected behavior
6. **Use axis parameter**: Master this for powerful array operations
7. **Read error messages**: NumPy error messages are usually helpful

---

## 🎯 Quick Reference Card

```python
# Creation
np.zeros((3,4))           # Zero array
np.ones((2,3))            # Ones array
np.arange(0, 10, 2)       # Range [0,2,4,6,8]
np.linspace(0, 1, 5)      # 5 values from 0 to 1
np.eye(3)                 # Identity matrix

# Indexing
arr[2:5]                  # Slice
arr[[0,2,4]]              # Fancy indexing
arr[arr > 0]              # Boolean indexing
arr[2, 3]                 # 2D indexing

# Operations
arr.sum()                 # Sum all
arr.mean(axis=0)          # Mean of columns
arr.std(axis=1)           # Std of rows
arr.max()                 # Maximum value
arr.argmax()              # Index of maximum

# Linear Algebra
A @ B                     # Matrix multiplication
np.linalg.inv(A)          # Inverse
np.linalg.det(A)          # Determinant
np.linalg.eig(A)          # Eigenvalues
np.linalg.svd(A)          # SVD
np.linalg.solve(A, b)     # Solve Ax = b

# Broadcasting
arr + 5                   # Add scalar
arr * np.array([1,2,3])   # Broadcast
```

---

**Remember**: NumPy is the foundation. Master it well, and everything else becomes easier!

## 🔗 Navigation

- **Previous**: [Chapter 2 Overview](../README.md)
- **Next**: [2.2 Pandas Data Manipulation](../2.2-Pandas-Data-Manipulation/README.md)
- **Up**: [Chapter 2: Python for AI/ML](../README.md)
