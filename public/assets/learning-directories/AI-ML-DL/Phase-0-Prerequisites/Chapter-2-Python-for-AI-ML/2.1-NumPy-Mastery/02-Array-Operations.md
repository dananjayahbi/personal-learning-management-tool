# Array Operations

## 📋 Overview

NumPy's power lies in its ability to perform operations on entire arrays efficiently without explicit loops. This chapter covers element-wise operations, broadcasting, universal functions (ufuncs), and aggregation functions.

---

## 1. Element-wise Operations

### 1.1 Arithmetic Operations

```python
import numpy as np

a = np.array([1, 2, 3, 4, 5])
b = np.array([10, 20, 30, 40, 50])

# Addition
print(a + b)  # [11 22 33 44 55]

# Subtraction
print(b - a)  # [ 9 18 27 36 45]

# Multiplication
print(a * b)  # [ 10  40  90 160 250]

# Division
print(b / a)  # [10. 10. 10. 10. 10.]

# Floor division
print(b // a)  # [10 10 10 10 10]

# Modulo
print(b % a)  # [0 0 0 0 0]

# Exponentiation
print(a ** 2)  # [ 1  4  9 16 25]

# Scalar operations
print(a + 10)   # [11 12 13 14 15]
print(a * 3)    # [ 3  6  9 12 15]
print(2 ** a)   # [ 2  4  8 16 32]
```

### 1.2 Comparison Operations

```python
a = np.array([1, 2, 3, 4, 5])
b = np.array([5, 4, 3, 2, 1])

# Equal to
print(a == b)  # [False False  True False False]

# Not equal to
print(a != b)  # [ True  True False  True  True]

# Greater than
print(a > b)   # [False False False  True  True]

# Greater than or equal to
print(a >= 3)  # [False False  True  True  True]

# Less than
print(a < b)   # [ True  True False False False]

# Less than or equal to
print(a <= 3)  # [ True  True  True False False]

# Find where condition is True
print(np.where(a > 3))  # (array([3, 4]),)
```

### 1.3 Logical Operations

```python
a = np.array([True, True, False, False])
b = np.array([True, False, True, False])

# Logical AND
print(np.logical_and(a, b))  # [ True False False False]
print(a & b)  # Same as above

# Logical OR
print(np.logical_or(a, b))   # [ True  True  True False]
print(a | b)  # Same as above

# Logical NOT
print(np.logical_not(a))     # [False False  True  True]
print(~a)  # Same as above

# Logical XOR
print(np.logical_xor(a, b))  # [False  True  True False]

# Any and All
arr = np.array([0, 1, 2, 0, 3])
print(np.any(arr))  # True (at least one non-zero)
print(np.all(arr))  # False (not all non-zero)

arr2 = np.array([1, 2, 3, 4])
print(np.all(arr2 > 0))  # True
```

---

## 2. Broadcasting

Broadcasting allows NumPy to perform operations on arrays of different shapes efficiently.

### 2.1 Broadcasting Rules

**Arrays are compatible when:**
1. They have the same shape, OR
2. One of the dimensions is 1, OR
3. One array has fewer dimensions (prepend with size 1)

```python
# Rule 1: Same shape
a = np.array([[1, 2, 3], [4, 5, 6]])  # (2, 3)
b = np.array([[10, 20, 30], [40, 50, 60]])  # (2, 3)
print(a + b)
# Output:
# [[11 22 33]
#  [44 55 66]]

# Rule 2: One dimension is 1
a = np.array([[1, 2, 3], [4, 5, 6]])  # (2, 3)
b = np.array([[10], [20]])  # (2, 1)
print(a + b)
# Output:
# [[11 12 13]
#  [24 25 26]]

# Rule 3: Fewer dimensions
a = np.array([[1, 2, 3], [4, 5, 6]])  # (2, 3)
b = np.array([10, 20, 30])  # (3,)
print(a + b)
# Output:
# [[11 22 33]
#  [14 25 36]]
```

### 2.2 Broadcasting Examples

```python
# Example 1: Add row vector to each row
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])
row = np.array([10, 20, 30])
result = matrix + row
print(result)
# Output:
# [[11 22 33]
#  [14 25 36]
#  [17 28 39]]

# Example 2: Add column vector to each column
col = np.array([[100], [200], [300]])
result = matrix + col
print(result)
# Output:
# [[101 102 103]
#  [204 205 206]
#  [307 308 309]]

# Example 3: 3D broadcasting
a = np.ones((3, 1, 5))
b = np.ones((1, 4, 5))
result = a + b  # Shape: (3, 4, 5)
print(result.shape)

# Example 4: Normalize each row
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]], dtype=float)
row_means = matrix.mean(axis=1, keepdims=True)
normalized = matrix - row_means
print(normalized)
# Output:
# [[-1.  0.  1.]
#  [-1.  0.  1.]
#  [-1.  0.  1.]]
```

### 2.3 Broadcasting Visualization

```python
# Create meshgrid using broadcasting
x = np.arange(0, 5)
y = np.arange(0, 3)
X = x[np.newaxis, :]  # Shape: (1, 5)
Y = y[:, np.newaxis]  # Shape: (3, 1)
Z = X + Y  # Broadcasting to (3, 5)
print(Z)
# Output:
# [[0 1 2 3 4]
#  [1 2 3 4 5]
#  [2 3 4 5 6]]

# Distance from center
x = np.linspace(-5, 5, 11)
y = np.linspace(-5, 5, 11)
X, Y = np.meshgrid(x, y)
R = np.sqrt(X**2 + Y**2)
print(R.shape)  # (11, 11)
```

---

## 3. Universal Functions (ufuncs)

Universal functions operate element-wise on arrays and are highly optimized.

### 3.1 Mathematical Functions

```python
arr = np.array([1, 4, 9, 16, 25])

# Square root
print(np.sqrt(arr))  # [1. 2. 3. 4. 5.]

# Exponential
print(np.exp(arr))  # [2.71828183e+00 5.45981500e+01 8.10308393e+03 ...]

# Logarithms
print(np.log(arr))    # Natural log
print(np.log10(arr))  # Base 10
print(np.log2(arr))   # Base 2

# Power
print(np.power(arr, 2))  # [ 1 16 81 256 625]

# Absolute value
arr_neg = np.array([-1, -2, 3, -4])
print(np.abs(arr_neg))  # [1 2 3 4]

# Sign
print(np.sign(arr_neg))  # [-1 -1  1 -1]
```

### 3.2 Trigonometric Functions

```python
angles = np.array([0, np.pi/6, np.pi/4, np.pi/3, np.pi/2])

# Sine
print(np.sin(angles))
# [0.         0.5        0.70710678 0.8660254  1.        ]

# Cosine
print(np.cos(angles))
# [ 1.          0.8660254   0.70710678  0.5         0.        ]

# Tangent
print(np.tan(angles))

# Inverse functions
print(np.arcsin([0, 0.5, 1]))  # Returns angles in radians
print(np.arccos([1, 0.5, 0]))
print(np.arctan([0, 1, np.inf]))

# Degrees and radians conversion
print(np.degrees(np.pi))  # 180.0
print(np.radians(180))    # 3.141592653589793

# Hyperbolic functions
print(np.sinh(1))
print(np.cosh(1))
print(np.tanh(1))
```

### 3.3 Rounding Functions

```python
arr = np.array([1.23, 2.67, 3.49, -1.23, -2.67])

# Round to nearest integer
print(np.round(arr))  # [ 1.  3.  3. -1. -3.]

# Round to 1 decimal place
print(np.round(arr, 1))  # [ 1.2  2.7  3.5 -1.2 -2.7]

# Floor (round down)
print(np.floor(arr))  # [ 1.  2.  3. -2. -3.]

# Ceiling (round up)
print(np.ceil(arr))  # [ 2.  3.  4. -1. -2.]

# Truncate (remove decimal)
print(np.trunc(arr))  # [ 1.  2.  3. -1. -2.]

# Round to nearest even (banker's rounding)
print(np.rint(arr))  # [ 1.  3.  3. -1. -3.]
```

### 3.4 Statistical ufuncs

```python
arr = np.array([[1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]])

# Minimum and Maximum
print(np.min(arr))        # 1
print(np.max(arr))        # 9
print(np.min(arr, axis=0))  # [1 2 3] (column-wise)
print(np.max(arr, axis=1))  # [3 6 9] (row-wise)

# Argmin and Argmax (indices)
print(np.argmin(arr))        # 0 (flattened index)
print(np.argmax(arr))        # 8 (flattened index)
print(np.argmin(arr, axis=0))  # [0 0 0]
print(np.argmax(arr, axis=1))  # [2 2 2]

# Clip (limit values)
print(np.clip(arr, 3, 7))
# Output:
# [[3 3 3]
#  [4 5 6]
#  [7 7 7]]
```

---

## 4. Aggregation Functions

### 4.1 Basic Aggregations

```python
arr = np.array([[1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]])

# Sum
print(np.sum(arr))          # 45 (all elements)
print(np.sum(arr, axis=0))  # [12 15 18] (sum of each column)
print(np.sum(arr, axis=1))  # [ 6 15 24] (sum of each row)

# Product
print(np.prod(arr))          # 362880 (all elements)
print(np.prod(arr, axis=0))  # [28 80 162] (product of each column)

# Mean
print(np.mean(arr))          # 5.0
print(np.mean(arr, axis=0))  # [4. 5. 6.]
print(np.mean(arr, axis=1))  # [2. 5. 8.]

# Median
print(np.median(arr))          # 5.0
print(np.median(arr, axis=0))  # [4. 5. 6.]

# Standard deviation
print(np.std(arr))          # 2.5819888974716112
print(np.std(arr, axis=0))  # [2.44948975 2.44948975 2.44948975]

# Variance
print(np.var(arr))          # 6.666666666666667
print(np.var(arr, axis=1))  # [0.66666667 0.66666667 0.66666667]
```

### 4.2 Cumulative Functions

```python
arr = np.array([1, 2, 3, 4, 5])

# Cumulative sum
print(np.cumsum(arr))  # [ 1  3  6 10 15]

# Cumulative product
print(np.cumprod(arr))  # [  1   2   6  24 120]

# For 2D arrays
arr_2d = np.array([[1, 2, 3],
                   [4, 5, 6]])

print(np.cumsum(arr_2d, axis=0))
# Output:
# [[1 2 3]
#  [5 7 9]]

print(np.cumsum(arr_2d, axis=1))
# Output:
# [[ 1  3  6]
#  [ 4  9 15]]
```

### 4.3 Percentiles and Quantiles

```python
data = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

# Percentiles
print(np.percentile(data, 25))   # 3.25 (25th percentile)
print(np.percentile(data, 50))   # 5.5 (median)
print(np.percentile(data, 75))   # 7.75 (75th percentile)

# Multiple percentiles at once
print(np.percentile(data, [25, 50, 75]))  # [3.25 5.5  7.75]

# Quantiles (0 to 1 instead of 0 to 100)
print(np.quantile(data, 0.25))  # 3.25
print(np.quantile(data, [0.25, 0.5, 0.75]))  # [3.25 5.5  7.75]
```

### 4.4 Other Useful Aggregations

```python
arr = np.array([1, 2, 3, 4, 5, 2, 3, 4])

# Unique values
print(np.unique(arr))  # [1 2 3 4 5]

# Unique with counts
unique, counts = np.unique(arr, return_counts=True)
print(unique)  # [1 2 3 4 5]
print(counts)  # [1 2 2 2 1]

# Count non-zero elements
print(np.count_nonzero(arr))  # 8

arr_with_zeros = np.array([0, 1, 0, 2, 0, 3])
print(np.count_nonzero(arr_with_zeros))  # 3

# Any and All
print(np.any(arr > 4))  # True
print(np.all(arr > 0))  # True
print(np.all(arr > 1))  # False
```

---

## 5. Advanced Operations

### 5.1 Outer Product

```python
a = np.array([1, 2, 3])
b = np.array([10, 20])

# Outer product
outer = np.outer(a, b)
print(outer)
# Output:
# [[10 20]
#  [20 40]
#  [30 60]]
```

### 5.2 Dot Product

```python
# 1D arrays (scalar product)
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(np.dot(a, b))  # 32 (1*4 + 2*5 + 3*6)

# 2D arrays (matrix multiplication)
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
print(np.dot(A, B))
# Output:
# [[19 22]
#  [43 50]]

# Using @ operator (Python 3.5+)
print(A @ B)
# Same as np.dot(A, B)
```

### 5.3 Cross Product

```python
# 3D vectors only
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
cross = np.cross(a, b)
print(cross)  # [-3  6 -3]

# Verify orthogonality
print(np.dot(cross, a))  # 0 (or very close to 0)
print(np.dot(cross, b))  # 0
```

### 5.4 Element-wise Maximum/Minimum

```python
a = np.array([1, 5, 3, 7, 2])
b = np.array([4, 2, 6, 1, 8])

# Element-wise maximum
print(np.maximum(a, b))  # [4 5 6 7 8]

# Element-wise minimum
print(np.minimum(a, b))  # [1 2 3 1 2]

# Can be used with scalar
print(np.maximum(a, 4))  # [4 5 4 7 4]
```

---

## 6. Performance Tips

### 6.1 Vectorization vs Loops

```python
import time

# Bad: Using loops
def sum_with_loop(arr):
    total = 0
    for i in range(len(arr)):
        total += arr[i]
    return total

# Good: Vectorized
def sum_vectorized(arr):
    return np.sum(arr)

# Benchmark
arr = np.random.rand(1000000)

start = time.time()
result1 = sum_with_loop(arr)
time_loop = time.time() - start

start = time.time()
result2 = sum_vectorized(arr)
time_vec = time.time() - start

print(f"Loop time: {time_loop:.6f}s")
print(f"Vectorized time: {time_vec:.6f}s")
print(f"Speedup: {time_loop/time_vec:.2f}x")
# Typical output: Speedup: 50-100x
```

### 6.2 In-place Operations

```python
arr = np.arange(1000000)

# Not in-place (creates new array)
arr = arr + 1

# In-place (modifies existing array)
arr += 1  # Faster and more memory efficient

# For functions
arr = np.sqrt(arr)  # Creates new array
np.sqrt(arr, out=arr)  # In-place, saves memory
```

### 6.3 Memory Layout

```python
# Row-major (C-style) vs Column-major (Fortran-style)
arr_c = np.array([[1, 2, 3], [4, 5, 6]], order='C')
arr_f = np.array([[1, 2, 3], [4, 5, 6]], order='F')

print(arr_c.flags)
print(arr_f.flags)

# For better performance, access arrays in their natural order
# Row-major: iterate rows first
# Column-major: iterate columns first
```

---

## 7. Practical Examples

### Example 1: Normalizing Features

```python
# Feature matrix (samples x features)
X = np.random.randn(100, 5)

# Min-Max normalization
X_normalized = (X - X.min(axis=0)) / (X.max(axis=0) - X.min(axis=0))

# Z-score standardization
X_standardized = (X - X.mean(axis=0)) / X.std(axis=0)
```

### Example 2: Euclidean Distance Matrix

```python
# Points in 2D space
points = np.random.rand(5, 2)

# Broadcasting to compute all pairwise distances
diff = points[:, np.newaxis, :] - points[np.newaxis, :, :]
distances = np.sqrt(np.sum(diff**2, axis=2))
print(distances.shape)  # (5, 5)
```

### Example 3: Moving Average

```python
data = np.random.randn(100)
window_size = 5

# Simple moving average using convolution
weights = np.ones(window_size) / window_size
moving_avg = np.convolve(data, weights, mode='valid')
```

---

## 🎯 Key Takeaways

1. **Element-wise operations** work on corresponding elements without loops
2. **Broadcasting** enables operations on arrays of different shapes
3. **Universal functions (ufuncs)** are optimized and work element-wise
4. **Aggregation functions** reduce arrays along specified axes
5. **Vectorization** is dramatically faster than Python loops
6. Use **in-place operations** (`+=`, `-=`, etc.) for memory efficiency
7. Understand **axis parameter**: `axis=0` for columns, `axis=1` for rows

---

## 📝 Practice Exercises

1. Compute element-wise operations on two 2D arrays
2. Use broadcasting to add a row vector to each row of a matrix
3. Normalize a dataset using z-score standardization
4. Compute correlation matrix between features
5. Implement softmax function using NumPy operations
6. Create a function to compute pairwise distances efficiently

---

## 🔗 Navigation

- **Previous**: [01 - Array Fundamentals](./01-Array-Fundamentals.md)
- **Next**: [03 - Advanced NumPy](./03-Advanced-NumPy.md)
- **Up**: [2.1 NumPy Mastery](./README.md)
