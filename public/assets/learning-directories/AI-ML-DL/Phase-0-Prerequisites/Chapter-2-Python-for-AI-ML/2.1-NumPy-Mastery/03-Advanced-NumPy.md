# Advanced NumPy

## 📋 Overview

This chapter covers advanced NumPy techniques including boolean indexing, fancy indexing, vectorization, memory optimization, and random number generation—essential skills for efficient data manipulation in machine learning.

---

## 1. Boolean Indexing and Masking

### 1.1 Creating Boolean Masks

```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

# Create boolean mask
mask = arr > 5
print(mask)
# Output: [False False False False False  True  True  True  True  True]

# Apply mask
result = arr[mask]
print(result)  # [ 6  7  8  9 10]

# Direct filtering (combines above two steps)
result = arr[arr > 5]
print(result)  # [ 6  7  8  9 10]
```

### 1.2 Complex Boolean Conditions

```python
arr = np.arange(1, 11)

# Multiple conditions with AND (&)
result = arr[(arr > 3) & (arr < 8)]
print(result)  # [4 5 6 7]

# Multiple conditions with OR (|)
result = arr[(arr < 3) | (arr > 8)]
print(result)  # [ 1  2  9 10]

# NOT (~)
result = arr[~(arr > 5)]  # Elements NOT greater than 5
print(result)  # [1 2 3 4 5]

# Combining multiple conditions
result = arr[((arr % 2 == 0) & (arr > 5)) | (arr == 1)]
print(result)  # [ 1  6  8 10]
```

### 1.3 Boolean Indexing with 2D Arrays

```python
matrix = np.array([[1, 2, 3, 4],
                   [5, 6, 7, 8],
                   [9, 10, 11, 12]])

# Filter entire array
result = matrix[matrix > 6]
print(result)  # [ 7  8  9 10 11 12]

# Filter rows based on condition
row_sums = matrix.sum(axis=1)
filtered_rows = matrix[row_sums > 20]
print(filtered_rows)
# Output:
# [[ 5  6  7  8]
#  [ 9 10 11 12]]

# Filter columns
col_means = matrix.mean(axis=0)
filtered_cols = matrix[:, col_means > 6]
print(filtered_cols)
# Output:
# [[ 3  4]
#  [ 7  8]
#  [11 12]]
```

### 1.4 np.where() - Conditional Selection

```python
arr = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

# Get indices where condition is True
indices = np.where(arr > 5)
print(indices)  # (array([5, 6, 7, 8, 9]),)
print(arr[indices])  # [ 6  7  8  9 10]

# Replace values conditionally
result = np.where(arr > 5, arr, 0)
print(result)  # [ 0  0  0  0  0  6  7  8  9 10]

# Multiple conditions
result = np.where(arr > 5, 'high', 'low')
print(result)
# ['low' 'low' 'low' 'low' 'low' 'high' 'high' 'high' 'high' 'high']

# Nested where
result = np.where(arr < 4, 'low', 
                  np.where(arr < 8, 'medium', 'high'))
print(result)
# ['low' 'low' 'low' 'medium' 'medium' 'medium' 'medium' 'high' 'high' 'high']
```

### 1.5 np.select() - Multiple Conditions

```python
arr = np.arange(1, 11)

# Define conditions and choices
conditions = [
    arr < 4,
    (arr >= 4) & (arr < 8),
    arr >= 8
]

choices = ['low', 'medium', 'high']

result = np.select(conditions, choices, default='unknown')
print(result)
# ['low' 'low' 'low' 'medium' 'medium' 'medium' 'medium' 'high' 'high' 'high']
```

---

## 2. Fancy Indexing

### 2.1 Integer Array Indexing

```python
arr = np.array([10, 20, 30, 40, 50, 60, 70, 80])

# Select specific indices
indices = np.array([0, 2, 5, 7])
result = arr[indices]
print(result)  # [10 30 60 80]

# Repeat indices
indices = np.array([0, 0, 1, 1, 2, 2])
result = arr[indices]
print(result)  # [10 10 20 20 30 30]

# Negative indices
indices = np.array([-1, -2, -3])
result = arr[indices]
print(result)  # [80 70 60]
```

### 2.2 2D Fancy Indexing

```python
matrix = np.array([[1, 2, 3, 4],
                   [5, 6, 7, 8],
                   [9, 10, 11, 12],
                   [13, 14, 15, 16]])

# Select specific rows
row_indices = np.array([0, 2, 3])
result = matrix[row_indices]
print(result)
# Output:
# [[ 1  2  3  4]
#  [ 9 10 11 12]
#  [13 14 15 16]]

# Select specific elements
rows = np.array([0, 1, 2, 3])
cols = np.array([0, 1, 2, 3])
result = matrix[rows, cols]  # Diagonal elements
print(result)  # [ 1  6 11 16]

# Select 2x2 submatrix
rows = np.array([0, 1])[:, np.newaxis]
cols = np.array([2, 3])
result = matrix[rows, cols]
print(result)
# Output:
# [[3 4]
#  [7 8]]
```

### 2.3 Fancy Indexing for Assignment

```python
arr = np.zeros(10)

# Assign to specific indices
indices = np.array([1, 3, 5, 7])
arr[indices] = 99
print(arr)  # [ 0. 99.  0. 99.  0. 99.  0. 99.  0.  0.]

# Assign different values
arr = np.zeros(10)
arr[indices] = np.array([10, 20, 30, 40])
print(arr)  # [ 0. 10.  0. 20.  0. 30.  0. 40.  0.  0.]

# Increment specific indices
arr = np.arange(10)
indices = np.array([0, 2, 4, 6])
arr[indices] += 100
print(arr)  # [100   1 102   3 104   5 106   7   8   9]
```

### 2.4 Combining Boolean and Fancy Indexing

```python
arr = np.array([10, 25, 30, 45, 50, 65, 70, 85])

# Get indices where condition is True
indices = np.where(arr > 40)[0]
print(indices)  # [3 4 5 6 7]

# Use those indices
result = arr[indices]
print(result)  # [45 50 65 70 85]

# Modify those elements
arr[indices] = 0
print(arr)  # [10 25 30  0  0  0  0  0]
```

---

## 3. Vectorization Techniques

### 3.1 Why Vectorization?

```python
import time

# Bad: Using loops
def compute_distances_loop(points):
    n = len(points)
    distances = np.zeros((n, n))
    for i in range(n):
        for j in range(n):
            distances[i, j] = np.sqrt(np.sum((points[i] - points[j])**2))
    return distances

# Good: Vectorized
def compute_distances_vectorized(points):
    diff = points[:, np.newaxis, :] - points[np.newaxis, :, :]
    return np.sqrt(np.sum(diff**2, axis=2))

# Benchmark
points = np.random.rand(100, 3)

start = time.time()
d1 = compute_distances_loop(points)
time_loop = time.time() - start

start = time.time()
d2 = compute_distances_vectorized(points)
time_vec = time.time() - start

print(f"Loop: {time_loop:.4f}s")
print(f"Vectorized: {time_vec:.4f}s")
print(f"Speedup: {time_loop/time_vec:.1f}x")
# Typical: 100-500x speedup!
```

### 3.2 Vectorizing Custom Functions

```python
# Define scalar function
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

# Already works with arrays!
x = np.linspace(-10, 10, 100)
y = sigmoid(x)  # Vectorized automatically

# For more complex functions, use np.vectorize
def custom_function(x, y):
    if x > y:
        return x + y
    else:
        return x - y

vectorized_func = np.vectorize(custom_function)
x = np.array([1, 2, 3, 4])
y = np.array([2, 1, 4, 3])
result = vectorized_func(x, y)
print(result)  # [-1  3 -1  7]

# Note: np.vectorize is convenient but not always faster
# Better: rewrite logic to use array operations
def custom_function_vectorized(x, y):
    return np.where(x > y, x + y, x - y)

result = custom_function_vectorized(x, y)
print(result)  # [-1  3 -1  7]
```

### 3.3 Broadcasting Patterns

```python
# Pattern 1: Centering data (subtract mean)
data = np.random.randn(100, 5)
centered = data - data.mean(axis=0)

# Pattern 2: Normalizing (divide by std)
normalized = centered / centered.std(axis=0)

# Pattern 3: Distance from point
points = np.random.rand(1000, 2)
center = np.array([0.5, 0.5])
distances = np.sqrt(np.sum((points - center)**2, axis=1))

# Pattern 4: Pairwise operations
a = np.array([1, 2, 3])
b = np.array([10, 20, 30])
pairwise_sums = a[:, np.newaxis] + b[np.newaxis, :]
print(pairwise_sums)
# Output:
# [[11 21 31]
#  [12 22 32]
#  [13 23 33]]
```

---

## 4. Memory Layout and Performance

### 4.1 Understanding Memory Order

```python
# C-order (row-major): default in NumPy
arr_c = np.array([[1, 2, 3], [4, 5, 6]], order='C')
print(arr_c.flags)
# Memory: [1, 2, 3, 4, 5, 6]

# F-order (column-major): used in Fortran, MATLAB
arr_f = np.array([[1, 2, 3], [4, 5, 6]], order='F')
print(arr_f.flags)
# Memory: [1, 4, 2, 5, 3, 6]

# Check if arrays are contiguous
print(f"C-contiguous: {arr_c.flags['C_CONTIGUOUS']}")
print(f"F-contiguous: {arr_f.flags['F_CONTIGUOUS']}")
```

### 4.2 Impact on Performance

```python
import time

# Create large array
arr_c = np.random.rand(10000, 10000)
arr_f = np.asfortranarray(arr_c)

# Row-wise sum (better for C-order)
start = time.time()
result = arr_c.sum(axis=1)
time_c = time.time() - start

start = time.time()
result = arr_f.sum(axis=1)
time_f = time.time() - start

print(f"C-order: {time_c:.4f}s")
print(f"F-order: {time_f:.4f}s")

# Column-wise sum (better for F-order)
start = time.time()
result = arr_c.sum(axis=0)
time_c = time.time() - start

start = time.time()
result = arr_f.sum(axis=0)
time_f = time.time() - start

print(f"C-order: {time_c:.4f}s")
print(f"F-order: {time_f:.4f}s")
```

### 4.3 Views vs Copies

```python
arr = np.arange(10)

# Slicing creates a view
view = arr[2:8]
view[0] = 999
print(arr)  # [ 0  1 999  3  4  5  6  7  8  9] - original changed!

# Check if it's a view
print(view.base is arr)  # True

# Fancy indexing creates a copy
arr = np.arange(10)
copy = arr[[2, 3, 4, 5, 6, 7]]
copy[0] = 999
print(arr)  # [0 1 2 3 4 5 6 7 8 9] - original unchanged

print(copy.base is None)  # True (it's a copy)

# Force a copy
arr = np.arange(10)
forced_copy = arr[2:8].copy()
forced_copy[0] = 999
print(arr)  # [0 1 2 3 4 5 6 7 8 9] - unchanged
```

### 4.4 Memory-efficient Operations

```python
# Bad: Creates intermediate arrays
arr = np.random.rand(10000000)
result = (arr * 2 + 5) / 3  # Creates 3 temporary arrays

# Better: Use in-place operations
arr = np.random.rand(10000000)
arr *= 2
arr += 5
arr /= 3

# Best: Use out parameter
arr = np.random.rand(10000000)
temp = np.empty_like(arr)
np.multiply(arr, 2, out=temp)
np.add(temp, 5, out=temp)
np.divide(temp, 3, out=arr)
```

---

## 5. Random Number Generation

### 5.1 Basic Random Generation

```python
# Set seed for reproducibility
np.random.seed(42)

# Random floats [0, 1)
print(np.random.random(5))
# [0.37454012 0.95071431 0.73199394 0.59865848 0.15601864]

# Random integers
print(np.random.randint(0, 10, size=5))
# [6 3 7 4 6]

# Random choice from array
colors = np.array(['red', 'green', 'blue', 'yellow'])
print(np.random.choice(colors, size=10))
# Random selection with repetition

# Without replacement
print(np.random.choice(colors, size=3, replace=False))
# ['blue' 'red' 'yellow']

# With probabilities
probs = np.array([0.5, 0.3, 0.15, 0.05])
print(np.random.choice(colors, size=100, p=probs))
```

### 5.2 Statistical Distributions

```python
# Uniform distribution
uniform = np.random.uniform(low=0, high=10, size=1000)

# Normal (Gaussian) distribution
normal = np.random.normal(loc=0, scale=1, size=1000)
# Or: np.random.randn(1000)

# Binomial distribution
binomial = np.random.binomial(n=10, p=0.5, size=1000)

# Poisson distribution
poisson = np.random.poisson(lam=5, size=1000)

# Exponential distribution
exponential = np.random.exponential(scale=1.0, size=1000)

# Beta distribution
beta = np.random.beta(a=2, b=5, size=1000)

# Gamma distribution
gamma = np.random.gamma(shape=2, scale=2, size=1000)
```

### 5.3 Modern Random Generation (NumPy 1.17+)

```python
# New Generator API
from numpy.random import default_rng

rng = default_rng(seed=42)

# Same operations with better statistical properties
random_nums = rng.random(5)
random_ints = rng.integers(0, 10, size=5)
random_normal = rng.normal(loc=0, scale=1, size=1000)

# Multiple independent streams
rng1 = default_rng(42)
rng2 = default_rng(43)
# Different sequences even with close seeds
```

### 5.4 Sampling and Shuffling

```python
# Shuffle array in-place
arr = np.arange(10)
np.random.shuffle(arr)
print(arr)  # [2 8 4 9 1 6 7 3 0 5]

# Permutation (returns shuffled copy)
arr = np.arange(10)
permuted = np.random.permutation(arr)
print(arr)      # [0 1 2 3 4 5 6 7 8 9] - unchanged
print(permuted)  # [3 1 5 0 8 9 2 7 6 4]

# Random sample from 2D array
data = np.arange(100).reshape(10, 10)
sample_indices = np.random.choice(10, size=5, replace=False)
sample = data[sample_indices]
print(sample.shape)  # (5, 10)
```

---

## 6. Advanced Techniques

### 6.1 einsum - Einstein Summation

```python
# Matrix multiplication
A = np.random.rand(3, 4)
B = np.random.rand(4, 5)

# Traditional way
C1 = np.dot(A, B)

# Using einsum
C2 = np.einsum('ij,jk->ik', A, B)
print(np.allclose(C1, C2))  # True

# Trace (sum of diagonal)
M = np.random.rand(5, 5)
trace = np.einsum('ii->', M)
print(trace == np.trace(M))  # True

# Batch matrix multiplication
batch = np.random.rand(10, 3, 4)
weights = np.random.rand(4, 5)
result = np.einsum('bij,jk->bik', batch, weights)
print(result.shape)  # (10, 3, 5)

# Element-wise product and sum
a = np.random.rand(100)
b = np.random.rand(100)
result = np.einsum('i,i->', a, b)  # Same as np.dot(a, b)
```

### 6.2 Structured Arrays

```python
# Define structured dtype
dt = np.dtype([('name', 'U10'), ('age', 'i4'), ('salary', 'f8')])

# Create structured array
data = np.array([
    ('Alice', 25, 50000.0),
    ('Bob', 30, 60000.0),
    ('Charlie', 35, 75000.0)
], dtype=dt)

print(data['name'])    # ['Alice' 'Bob' 'Charlie']
print(data['age'])     # [25 30 35]
print(data['salary'])  # [50000. 60000. 75000.]

# Filter by field
high_earners = data[data['salary'] > 55000]
print(high_earners)
```

### 6.3 Memory-mapped Arrays

```python
# Create memory-mapped array (useful for huge datasets)
filename = 'large_array.dat'
shape = (10000, 10000)

# Create
mmap = np.memmap(filename, dtype='float32', mode='w+', shape=shape)
mmap[:] = np.random.rand(*shape)
mmap.flush()

# Load (doesn't load entire array into RAM)
mmap = np.memmap(filename, dtype='float32', mode='r', shape=shape)

# Access like normal array
chunk = mmap[1000:2000, 1000:2000]  # Only loads this chunk
```

---

## 7. Practical Examples

### Example 1: k-Nearest Neighbors Distance Computation

```python
def knn_distances(X_train, X_test, k=5):
    """Compute k-nearest neighbor distances efficiently"""
    # Compute pairwise distances using broadcasting
    diff = X_test[:, np.newaxis, :] - X_train[np.newaxis, :, :]
    distances = np.sqrt(np.sum(diff**2, axis=2))
    
    # Get k nearest distances and indices
    k_nearest_indices = np.argsort(distances, axis=1)[:, :k]
    k_nearest_distances = np.take_along_axis(distances, k_nearest_indices, axis=1)
    
    return k_nearest_distances, k_nearest_indices

# Example usage
X_train = np.random.rand(1000, 10)
X_test = np.random.rand(100, 10)
distances, indices = knn_distances(X_train, X_test, k=5)
print(f"Shape of distances: {distances.shape}")  # (100, 5)
```

### Example 2: Batch Processing with Boolean Masks

```python
# Image processing: threshold and invert
def process_images_batch(images, threshold=0.5):
    """Process batch of images efficiently"""
    # Threshold
    binary = images > threshold
    
    # Invert where needed
    inverted = np.where(binary, 1 - images, images)
    
    # Normalize
    normalized = (inverted - inverted.min()) / (inverted.max() - inverted.min())
    
    return normalized

# Example
images = np.random.rand(100, 28, 28)  # 100 images of 28x28
processed = process_images_batch(images)
```

### Example 3: Efficient Feature Engineering

```python
def create_polynomial_features(X, degree=2):
    """Create polynomial features efficiently"""
    n_samples, n_features = X.shape
    
    # Store all features
    features = [np.ones((n_samples, 1))]  # Intercept
    features.append(X)  # Original features
    
    # Generate polynomial features
    for d in range(2, degree + 1):
        for i in range(n_features):
            features.append((X[:, i] ** d).reshape(-1, 1))
    
    return np.hstack(features)

# Example
X = np.random.rand(100, 3)
X_poly = create_polynomial_features(X, degree=3)
print(f"Original shape: {X.shape}")
print(f"Polynomial shape: {X_poly.shape}")
```

---

## 🎯 Key Takeaways

1. **Boolean indexing** enables powerful filtering and selection
2. **Fancy indexing** provides flexible array element selection
3. **Vectorization** offers 10-1000x speedup over loops
4. **Memory layout** (C vs F order) affects performance
5. **Views vs copies** - understand to avoid unexpected behavior
6. **Modern random** API (Generator) provides better statistical properties
7. **einsum** enables complex tensor operations efficiently
8. Always **profile before optimizing** - don't guess bottlenecks

---

## 📝 Practice Exercises

1. Implement k-means clustering using only NumPy
2. Create confusion matrix using boolean indexing
3. Vectorize a custom distance metric
4. Optimize a slow function using profiling
5. Implement efficient batch normalization
6. Create synthetic dataset with specific statistical properties

---

## 🔗 Navigation

- **Previous**: [02 - Array Operations](./02-Array-Operations.md)
- **Next**: [04 - Linear Algebra with NumPy](./04-Linear-Algebra-with-NumPy.md)
- **Up**: [2.1 NumPy Mastery](./README.md)
