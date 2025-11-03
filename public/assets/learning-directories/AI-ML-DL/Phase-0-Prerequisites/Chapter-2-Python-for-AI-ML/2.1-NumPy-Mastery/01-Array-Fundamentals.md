# Array Fundamentals

## 📋 Overview

NumPy (Numerical Python) is the foundational library for numerical computing in Python. It provides support for large, multi-dimensional arrays and matrices, along with a collection of mathematical functions to operate on these arrays efficiently.

**Why NumPy?**
- 🚀 **Performance**: NumPy operations are implemented in C, making them 10-100x faster than pure Python
- 💾 **Memory Efficiency**: NumPy arrays use less memory than Python lists
- 🔧 **Functionality**: Rich collection of mathematical functions
- 🌐 **Foundation**: Base for pandas, scikit-learn, TensorFlow, and PyTorch

---

## 1. Installing and Importing NumPy

### Installation

```bash
# Using pip
pip install numpy

# Using conda
conda install numpy

# Verify installation
python -c "import numpy; print(numpy.__version__)"
```

### Importing NumPy

```python
import numpy as np  # Standard convention

# Check version
print(np.__version__)  # e.g., 1.24.3
```

---

## 2. Creating NumPy Arrays

### 2.1 From Python Lists

```python
# 1D array
arr_1d = np.array([1, 2, 3, 4, 5])
print(arr_1d)
# Output: [1 2 3 4 5]

# 2D array (matrix)
arr_2d = np.array([[1, 2, 3], [4, 5, 6]])
print(arr_2d)
# Output:
# [[1 2 3]
#  [4 5 6]]

# 3D array
arr_3d = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
print(arr_3d.shape)  # (2, 2, 2)
```

### 2.2 Using Built-in Functions

#### `np.zeros()` - Array of Zeros

```python
# 1D array of zeros
zeros_1d = np.zeros(5)
print(zeros_1d)
# Output: [0. 0. 0. 0. 0.]

# 2D array of zeros
zeros_2d = np.zeros((3, 4))
print(zeros_2d)
# Output:
# [[0. 0. 0. 0.]
#  [0. 0. 0. 0.]
#  [0. 0. 0. 0.]]

# Specify data type
zeros_int = np.zeros(5, dtype=int)
print(zeros_int)
# Output: [0 0 0 0 0]
```

#### `np.ones()` - Array of Ones

```python
# 1D array of ones
ones_1d = np.ones(4)
print(ones_1d)
# Output: [1. 1. 1. 1.]

# 2D array of ones
ones_2d = np.ones((2, 3))
print(ones_2d)
# Output:
# [[1. 1. 1.]
#  [1. 1. 1.]]

# Create array of specific value
fives = np.ones((3, 3)) * 5
print(fives)
# Output:
# [[5. 5. 5.]
#  [5. 5. 5.]
#  [5. 5. 5.]]
```

#### `np.full()` - Array with Specific Value

```python
# Create array filled with 7
full_arr = np.full((2, 4), 7)
print(full_arr)
# Output:
# [[7 7 7 7]
#  [7 7 7 7]]

# Create array filled with π
pi_arr = np.full((3, 3), np.pi)
print(pi_arr)
# Output:
# [[3.14159265 3.14159265 3.14159265]
#  [3.14159265 3.14159265 3.14159265]
#  [3.14159265 3.14159265 3.14159265]]
```

#### `np.eye()` and `np.identity()` - Identity Matrix

```python
# Identity matrix (3x3)
identity = np.eye(3)
print(identity)
# Output:
# [[1. 0. 0.]
#  [0. 1. 0.]
#  [0. 0. 1.]]

# Non-square identity-like matrix
eye_rect = np.eye(3, 5)
print(eye_rect)
# Output:
# [[1. 0. 0. 0. 0.]
#  [0. 1. 0. 0. 0.]
#  [0. 0. 1. 0. 0.]]

# Diagonal offset
eye_offset = np.eye(4, k=1)  # Diagonal shifted up by 1
print(eye_offset)
# Output:
# [[0. 1. 0. 0.]
#  [0. 0. 1. 0.]
#  [0. 0. 0. 1.]
#  [0. 0. 0. 0.]]
```

#### `np.arange()` - Range of Values

```python
# Similar to Python's range()
arr_range = np.arange(10)
print(arr_range)
# Output: [0 1 2 3 4 5 6 7 8 9]

# With start and stop
arr_range2 = np.arange(5, 15)
print(arr_range2)
# Output: [5 6 7 8 9 10 11 12 13 14]

# With step
arr_range3 = np.arange(0, 20, 2)
print(arr_range3)
# Output: [ 0  2  4  6  8 10 12 14 16 18]

# Float step
arr_float = np.arange(0, 1, 0.1)
print(arr_float)
# Output: [0.  0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9]

# Descending
arr_desc = np.arange(10, 0, -1)
print(arr_desc)
# Output: [10  9  8  7  6  5  4  3  2  1]
```

#### `np.linspace()` - Linearly Spaced Values

```python
# 10 values between 0 and 1
lin = np.linspace(0, 1, 10)
print(lin)
# Output: [0.         0.11111111 0.22222222 0.33333333 0.44444444
#          0.55555556 0.66666667 0.77777778 0.88888889 1.        ]

# Include endpoint or not
lin_no_end = np.linspace(0, 1, 10, endpoint=False)
print(lin_no_end)
# Output: [0.  0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9]

# Common use: create x-axis for plotting
x = np.linspace(-5, 5, 100)
y = x**2
# Now you can plot y vs x
```

#### `np.logspace()` - Logarithmically Spaced Values

```python
# 5 values from 10^0 to 10^3
log_arr = np.logspace(0, 3, 5)
print(log_arr)
# Output: [   1.           10.          100.         1000.        10000.       ]

# Base 2 logarithmic spacing
log_base2 = np.logspace(0, 5, 6, base=2)
print(log_base2)
# Output: [ 1.  2.  4.  8. 16. 32.]
```

#### `np.random` - Random Arrays

```python
# Set seed for reproducibility
np.random.seed(42)

# Random values between 0 and 1
rand_arr = np.random.random((3, 3))
print(rand_arr)

# Random integers
rand_int = np.random.randint(0, 10, size=(2, 5))
print(rand_int)

# Random from normal distribution
rand_normal = np.random.randn(3, 3)  # Mean=0, Std=1
print(rand_normal)

# Random from specific normal distribution
rand_custom = np.random.normal(loc=100, scale=15, size=(3, 3))  # Mean=100, Std=15
print(rand_custom)

# Random choice from array
colors = np.array(['red', 'blue', 'green', 'yellow'])
rand_choice = np.random.choice(colors, size=10)
print(rand_choice)
```

---

## 3. Array Attributes

Every NumPy array has important attributes that describe its structure:

```python
# Create sample array
arr = np.array([[1, 2, 3, 4], 
                [5, 6, 7, 8], 
                [9, 10, 11, 12]])

# Shape: dimensions of the array
print(f"Shape: {arr.shape}")  # (3, 4) - 3 rows, 4 columns

# Size: total number of elements
print(f"Size: {arr.size}")  # 12

# Number of dimensions
print(f"Dimensions: {arr.ndim}")  # 2

# Data type of elements
print(f"Data type: {arr.dtype}")  # int32 or int64

# Size of each element in bytes
print(f"Item size: {arr.itemsize} bytes")  # 4 or 8

# Total memory consumed
print(f"Total bytes: {arr.nbytes} bytes")  # 48 or 96
```

### Understanding `shape`

```python
# 1D array
arr_1d = np.array([1, 2, 3, 4])
print(f"1D shape: {arr_1d.shape}")  # (4,)

# 2D array
arr_2d = np.array([[1, 2], [3, 4], [5, 6]])
print(f"2D shape: {arr_2d.shape}")  # (3, 2)

# 3D array
arr_3d = np.zeros((2, 3, 4))
print(f"3D shape: {arr_3d.shape}")  # (2, 3, 4)
# Interpretation: 2 matrices of 3 rows and 4 columns each
```

---

## 4. Data Types in NumPy

NumPy supports many data types for efficient storage and computation:

### Common Data Types

```python
# Integer types
int8 = np.array([1, 2, 3], dtype=np.int8)      # -128 to 127
int16 = np.array([1, 2, 3], dtype=np.int16)    # -32,768 to 32,767
int32 = np.array([1, 2, 3], dtype=np.int32)    # -2^31 to 2^31-1
int64 = np.array([1, 2, 3], dtype=np.int64)    # -2^63 to 2^63-1

# Unsigned integers
uint8 = np.array([1, 2, 3], dtype=np.uint8)    # 0 to 255
uint16 = np.array([1, 2, 3], dtype=np.uint16)  # 0 to 65,535

# Float types
float16 = np.array([1.0, 2.0], dtype=np.float16)  # Half precision
float32 = np.array([1.0, 2.0], dtype=np.float32)  # Single precision
float64 = np.array([1.0, 2.0], dtype=np.float64)  # Double precision (default)

# Boolean
bool_arr = np.array([True, False, True], dtype=np.bool_)

# Complex numbers
complex_arr = np.array([1+2j, 3+4j], dtype=np.complex128)

# String (fixed length)
str_arr = np.array(['apple', 'banana'], dtype='U10')  # Unicode, max 10 chars
```

### Type Conversion

```python
# Create float array
float_arr = np.array([1.1, 2.9, 3.5, 4.7])
print(float_arr.dtype)  # float64

# Convert to integer (truncates decimal)
int_arr = float_arr.astype(np.int32)
print(int_arr)  # [1 2 3 4]

# Convert to string
str_arr = int_arr.astype(str)
print(str_arr)  # ['1' '2' '3' '4']

# Boolean conversion
bool_arr = np.array([0, 1, 2, 0, 3]).astype(bool)
print(bool_arr)  # [False  True  True False  True]
```

---

## 5. Indexing and Slicing

### 5.1 Basic Indexing (1D Arrays)

```python
arr = np.array([10, 20, 30, 40, 50, 60, 70, 80, 90])

# Access single element
print(arr[0])   # 10 (first element)
print(arr[4])   # 50 (fifth element)
print(arr[-1])  # 90 (last element)
print(arr[-2])  # 80 (second to last)

# Slicing: arr[start:stop:step]
print(arr[2:5])      # [30 40 50]
print(arr[:4])       # [10 20 30 40] (from beginning)
print(arr[5:])       # [60 70 80 90] (to end)
print(arr[::2])      # [10 30 50 70 90] (every other element)
print(arr[1::3])     # [20 50 80] (start at 1, every 3rd)
print(arr[::-1])     # [90 80 70 60 50 40 30 20 10] (reverse)

# Negative indices in slicing
print(arr[-5:-2])    # [50 60 70]
```

### 5.2 Multi-dimensional Indexing

```python
# 2D array
arr_2d = np.array([[1, 2, 3, 4],
                   [5, 6, 7, 8],
                   [9, 10, 11, 12]])

# Access single element: arr[row, column]
print(arr_2d[0, 0])   # 1
print(arr_2d[1, 2])   # 7
print(arr_2d[2, 3])   # 12
print(arr_2d[-1, -1]) # 12

# Access entire row
print(arr_2d[1])      # [5 6 7 8]
print(arr_2d[1, :])   # [5 6 7 8] (explicit)

# Access entire column
print(arr_2d[:, 2])   # [ 3  7 11]

# Slicing rows and columns
print(arr_2d[0:2, 1:3])
# Output:
# [[2 3]
#  [6 7]]

# Every other row, all columns
print(arr_2d[::2, :])
# Output:
# [[ 1  2  3  4]
#  [ 9 10 11 12]]

# All rows, every other column
print(arr_2d[:, ::2])
# Output:
# [[ 1  3]
#  [ 5  7]
#  [ 9 11]]
```

### 5.3 Boolean Indexing

```python
arr = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

# Create boolean mask
mask = arr > 5
print(mask)
# Output: [False False False False False  True  True  True  True  True]

# Use mask to filter
filtered = arr[mask]
print(filtered)  # [ 6  7  8  9 10]

# Directly in one line
result = arr[arr > 5]
print(result)  # [ 6  7  8  9 10]

# Multiple conditions (use & for AND, | for OR)
result = arr[(arr > 3) & (arr < 8)]
print(result)  # [4 5 6 7]

result = arr[(arr < 3) | (arr > 8)]
print(result)  # [ 1  2  9 10]

# Negation
result = arr[~(arr > 5)]  # Elements NOT greater than 5
print(result)  # [1 2 3 4 5]
```

### 5.4 Fancy Indexing

```python
arr = np.array([10, 20, 30, 40, 50, 60])

# Index with array of indices
indices = np.array([0, 2, 4])
result = arr[indices]
print(result)  # [10 30 50]

# For 2D arrays
arr_2d = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

# Select specific rows
rows = np.array([0, 2])
result = arr_2d[rows]
print(result)
# Output:
# [[1 2 3]
#  [7 8 9]]

# Select specific elements
rows = np.array([0, 1, 2])
cols = np.array([0, 1, 2])
result = arr_2d[rows, cols]  # Elements at (0,0), (1,1), (2,2)
print(result)  # [1 5 9] (diagonal)
```

---

## 6. Reshaping and Flattening

### 6.1 Reshaping Arrays

```python
# Create 1D array
arr = np.arange(12)
print(arr)  # [ 0  1  2  3  4  5  6  7  8  9 10 11]

# Reshape to 2D
arr_2d = arr.reshape(3, 4)
print(arr_2d)
# Output:
# [[ 0  1  2  3]
#  [ 4  5  6  7]
#  [ 8  9 10 11]]

# Reshape to 3D
arr_3d = arr.reshape(2, 2, 3)
print(arr_3d)
# Output:
# [[[ 0  1  2]
#   [ 3  4  5]]
#
#  [[ 6  7  8]
#   [ 9 10 11]]]

# Use -1 to automatically calculate dimension
arr_auto = arr.reshape(3, -1)  # 3 rows, auto-calculate columns
print(arr_auto.shape)  # (3, 4)

arr_auto2 = arr.reshape(-1, 6)  # auto-calculate rows, 6 columns
print(arr_auto2.shape)  # (2, 6)

# Reshape doesn't change the original array
print(arr.shape)  # (12,)

# To change original, use resize()
arr.resize(3, 4)
print(arr.shape)  # (3, 4)
```

### 6.2 Flattening Arrays

```python
arr_2d = np.array([[1, 2, 3],
                   [4, 5, 6]])

# flatten() - returns a copy
flat1 = arr_2d.flatten()
print(flat1)  # [1 2 3 4 5 6]

# ravel() - returns a view (faster, shares memory)
flat2 = arr_2d.ravel()
print(flat2)  # [1 2 3 4 5 6]

# Difference: modifying ravel affects original
flat2[0] = 999
print(arr_2d)
# Output:
# [[999   2   3]
#  [  4   5   6]]

# flatten() doesn't affect original
arr_2d = np.array([[1, 2, 3], [4, 5, 6]])
flat3 = arr_2d.flatten()
flat3[0] = 999
print(arr_2d)
# Output:
# [[1 2 3]
#  [4 5 6]]  (unchanged)
```

### 6.3 Transposing

```python
arr = np.array([[1, 2, 3],
                [4, 5, 6]])
print(f"Original shape: {arr.shape}")  # (2, 3)

# Transpose
arr_T = arr.T
print(arr_T)
# Output:
# [[1 4]
#  [2 5]
#  [3 6]]
print(f"Transposed shape: {arr_T.shape}")  # (3, 2)

# Alternative: transpose() method
arr_T2 = arr.transpose()
print(np.array_equal(arr_T, arr_T2))  # True

# For higher dimensions, specify axes
arr_3d = np.zeros((2, 3, 4))
arr_3d_T = arr_3d.transpose(2, 0, 1)  # Swap axes
print(f"3D original: {arr_3d.shape}")     # (2, 3, 4)
print(f"3D transposed: {arr_3d_T.shape}") # (4, 2, 3)
```

### 6.4 Adding/Removing Dimensions

```python
# Add new axis
arr = np.array([1, 2, 3, 4])
print(f"Original shape: {arr.shape}")  # (4,)

# Add axis at beginning
arr_2d = arr[np.newaxis, :]
print(f"New shape: {arr_2d.shape}")  # (1, 4)

# Add axis at end
arr_2d = arr[:, np.newaxis]
print(f"New shape: {arr_2d.shape}")  # (4, 1)

# Using expand_dims
arr_expanded = np.expand_dims(arr, axis=0)
print(arr_expanded.shape)  # (1, 4)

# Remove single-dimensional entries
arr_squeezed = np.squeeze(arr_2d)
print(arr_squeezed.shape)  # (4,)
```

---

## 7. Copying Arrays

### View vs Copy

```python
# Original array
arr = np.array([1, 2, 3, 4, 5])

# Simple assignment - creates a view (reference)
arr_view = arr
arr_view[0] = 999
print(arr)  # [999   2   3   4   5] - original changed!

# Slicing creates a view
arr = np.array([1, 2, 3, 4, 5])
arr_slice = arr[1:4]
arr_slice[0] = 888
print(arr)  # [  1 888   3   4   5] - original changed!

# copy() creates an independent copy
arr = np.array([1, 2, 3, 4, 5])
arr_copy = arr.copy()
arr_copy[0] = 777
print(arr)       # [1 2 3 4 5] - original unchanged
print(arr_copy)  # [777   2   3   4   5]

# Check if arrays share memory
print(np.shares_memory(arr, arr_view))   # True
print(np.shares_memory(arr, arr_copy))   # False
```

---

## 8. Practical Examples

### Example 1: Creating a Checkerboard Pattern

```python
checkerboard = np.zeros((8, 8), dtype=int)
checkerboard[1::2, ::2] = 1   # Odd rows, even columns
checkerboard[::2, 1::2] = 1   # Even rows, odd columns
print(checkerboard)
```

### Example 2: Generating a Grid of Coordinates

```python
x = np.linspace(0, 10, 5)
y = np.linspace(0, 10, 5)
X, Y = np.meshgrid(x, y)
print("X coordinates:\n", X)
print("Y coordinates:\n", Y)

# Calculate distance from origin
distances = np.sqrt(X**2 + Y**2)
print("Distances:\n", distances)
```

### Example 3: Data Normalization

```python
# Sample data
data = np.array([10, 20, 30, 40, 50])

# Min-Max normalization to [0, 1]
normalized = (data - data.min()) / (data.max() - data.min())
print(normalized)  # [0.   0.25 0.5  0.75 1.  ]

# Z-score standardization (mean=0, std=1)
standardized = (data - data.mean()) / data.std()
print(standardized)  # [-1.41 -0.71  0.    0.71  1.41]
```

---

## 🎯 Key Takeaways

1. **NumPy arrays** are faster and more memory-efficient than Python lists
2. Use **creation functions** (`zeros`, `ones`, `arange`, `linspace`) for efficient array initialization
3. **Array attributes** (`shape`, `dtype`, `size`, `ndim`) provide crucial information
4. **Indexing and slicing** allow flexible data access and manipulation
5. **Reshaping** enables transformation between different array dimensions
6. **Views vs Copies** - be aware of memory sharing to avoid unexpected behavior
7. Always use **vectorized operations** instead of loops for better performance

---

## 📝 Practice Exercises

1. Create a 5x5 array with values ranging from 0 to 24
2. Extract all odd numbers from an array using boolean indexing
3. Create a 10x10 multiplication table using broadcasting
4. Normalize a random array to have mean=0 and std=1
5. Create a 3D array and extract its middle slice along each dimension
6. Implement a function to create a diagonal matrix from a 1D array

---

## 🔗 Navigation

- **Previous**: [Chapter 2 Overview](../README.md)
- **Next**: [02 - Array Operations](./02-Array-Operations.md)
- **Up**: [2.1 NumPy Mastery](./README.md)

---

**Practice makes perfect! Work through the exercises and experiment with variations.**
