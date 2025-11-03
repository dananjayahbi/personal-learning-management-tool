# 03 - Multi-Dimensional Arrays

## 🎯 Overview

Multi-dimensional arrays are arrays of arrays. The most common is the 2D array (matrix), but arrays can have any number of dimensions. They're essential for representing grids, tables, matrices, and multi-dimensional data.

---

## 📖 2D Arrays (Matrices)

### What is a 2D Array?

A **2D array** or **matrix** is an array where each element is itself an array. Think of it as a table with rows and columns.

```
Matrix (3x4):
┌────┬────┬────┬────┐
│ 1  │ 2  │ 3  │ 4  │  ← Row 0
├────┼────┼────┼────┤
│ 5  │ 6  │ 7  │ 8  │  ← Row 1
├────┼────┼────┼────┤
│ 9  │ 10 │ 11 │ 12 │  ← Row 2
└────┴────┴────┴────┘
  ↑    ↑    ↑    ↑
Col 0 Col 1 Col 2 Col 3
```

**Accessing elements:** `matrix[row][col]`  
- `matrix[0][0]` = 1
- `matrix[1][2]` = 7
- `matrix[2][3]` = 12

---

## 🧠 Memory Layout

### Row-Major Order (C++, Java, Python)

Elements are stored row by row in memory:

```
Matrix:
[1, 2, 3]
[4, 5, 6]
[7, 8, 9]

Memory Layout (Row-Major):
[1, 2, 3, 4, 5, 6, 7, 8, 9]
 ↑  Row 0  ↑  Row 1  ↑  Row 2
```

**Address Calculation:**
```
Address of matrix[i][j] = Base_Address + ((i × num_cols + j) × element_size)
```

### Column-Major Order (Fortran, MATLAB)

Elements are stored column by column:

```
Matrix:
[1, 2, 3]
[4, 5, 6]
[7, 8, 9]

Memory Layout (Column-Major):
[1, 4, 7, 2, 5, 8, 3, 6, 9]
 ↑ Col 0 ↑ Col 1 ↑ Col 2
```

---

## 📝 Declaration and Initialization

### Python:

```python
# Method 1: List of lists
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Method 2: Using list comprehension
rows, cols = 3, 4
matrix = [[0 for _ in range(cols)] for _ in range(rows)]

# ❌ WRONG - Creates references to same list
# matrix = [[0] * cols] * rows  # Don't do this!

# Method 3: Using numpy (for numerical computing)
import numpy as np
matrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
matrix = np.zeros((3, 4))  # 3x4 matrix of zeros
matrix = np.ones((3, 4))   # 3x4 matrix of ones

# Access
print(matrix[0][1])  # Row 0, Col 1 = 2
print(len(matrix))      # Number of rows
print(len(matrix[0]))   # Number of columns
```

### C++:

```cpp
// Method 1: Static 2D array
int matrix[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

// Method 2: Vector of vectors (recommended)
#include <vector>
vector<vector<int>> matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Initialize with zeros
int rows = 3, cols = 4;
vector<vector<int>> matrix(rows, vector<int>(cols, 0));

// Access
cout << matrix[0][1];  // Row 0, Col 1
int numRows = matrix.size();
int numCols = matrix[0].size();
```

### Java:

```java
// Method 1: Static array
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Method 2: Dynamic allocation
int rows = 3, cols = 4;
int[][] matrix = new int[rows][cols];

// ArrayList of ArrayLists
ArrayList<ArrayList<Integer>> matrix = new ArrayList<>();
for (int i = 0; i < rows; i++) {
    ArrayList<Integer> row = new ArrayList<>();
    matrix.add(row);
}

// Access
System.out.println(matrix[0][1]);
int numRows = matrix.length;
int numCols = matrix[0].length;
```

---

## 🔄 Common Traversal Patterns

### 1. Row-wise Traversal

```python
# Python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Method 1: Using indices
for i in range(len(matrix)):
    for j in range(len(matrix[0])):
        print(matrix[i][j], end=" ")
    print()

# Method 2: Direct iteration
for row in matrix:
    for element in row:
        print(element, end=" ")
    print()

# Output:
# 1 2 3
# 4 5 6
# 7 8 9
```

```cpp
// C++
vector<vector<int>> matrix = {{1,2,3}, {4,5,6}, {7,8,9}};

for (int i = 0; i < matrix.size(); i++) {
    for (int j = 0; j < matrix[0].size(); j++) {
        cout << matrix[i][j] << " ";
    }
    cout << endl;
}

// Or using range-based for
for (auto& row : matrix) {
    for (int element : row) {
        cout << element << " ";
    }
    cout << endl;
}
```

---

### 2. Column-wise Traversal

```python
# Python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

rows = len(matrix)
cols = len(matrix[0])

for j in range(cols):
    for i in range(rows):
        print(matrix[i][j], end=" ")
    print()

# Output:
# 1 4 7
# 2 5 8
# 3 6 9
```

---

### 3. Diagonal Traversal

```python
# Python
# Main diagonal (top-left to bottom-right)
def print_main_diagonal(matrix):
    n = len(matrix)
    for i in range(n):
        print(matrix[i][i], end=" ")
    print()

# Anti-diagonal (top-right to bottom-left)
def print_anti_diagonal(matrix):
    n = len(matrix)
    for i in range(n):
        print(matrix[i][n-1-i], end=" ")
    print()

matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print_main_diagonal(matrix)  # 1 5 9
print_anti_diagonal(matrix)  # 3 5 7
```

---

### 4. Spiral Traversal

**Time Complexity:** O(m × n)

```python
# Python
def spiral_order(matrix):
    """
    Traverse matrix in spiral order: right → down → left → up
    """
    if not matrix:
        return []
    
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    
    while top <= bottom and left <= right:
        # Move right
        for col in range(left, right + 1):
            result.append(matrix[top][col])
        top += 1
        
        # Move down
        for row in range(top, bottom + 1):
            result.append(matrix[row][right])
        right -= 1
        
        # Move left (if still have rows)
        if top <= bottom:
            for col in range(right, left - 1, -1):
                result.append(matrix[bottom][col])
            bottom -= 1
        
        # Move up (if still have columns)
        if left <= right:
            for row in range(bottom, top - 1, -1):
                result.append(matrix[row][left])
            left += 1
    
    return result

# Example
matrix = [
    [1,  2,  3,  4],
    [5,  6,  7,  8],
    [9, 10, 11, 12]
]
print(spiral_order(matrix))
# [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
```

**Visual:**
```
Start:
1 → 2 → 3 → 4
            ↓
5   6   7   8
↑           ↓
9 ← 10← 11← 12

Result: [1,2,3,4,8,12,11,10,9,5,6,7]
```

---

### 5. Wave Traversal

```python
# Python
def wave_traversal(matrix):
    """
    Traverse in wave pattern (column by column, alternating direction)
    """
    result = []
    rows = len(matrix)
    cols = len(matrix[0])
    
    for col in range(cols):
        if col % 2 == 0:
            # Go down
            for row in range(rows):
                result.append(matrix[row][col])
        else:
            # Go up
            for row in range(rows - 1, -1, -1):
                result.append(matrix[row][col])
    
    return result

# Example
matrix = [
    [1,  2,  3,  4],
    [5,  6,  7,  8],
    [9, 10, 11, 12]
]
print(wave_traversal(matrix))
# [1, 5, 9, 10, 6, 2, 3, 7, 11, 12, 8, 4]
```

**Visual:**
```
1   2   3   4
↓   ↑   ↓   ↑
5   6   7   8
↓   ↑   ↓   ↑
9  10  11  12

Result: [1,5,9,10,6,2,3,7,11,12,8,4]
```

---

## 🔧 Common Matrix Operations

### 1. Matrix Transpose

**Time Complexity:** O(m × n)  
**Space Complexity:** O(m × n) for new matrix, O(1) for square matrix in-place

```python
# Python - Create new matrix
def transpose(matrix):
    rows = len(matrix)
    cols = len(matrix[0])
    result = [[0] * rows for _ in range(cols)]
    
    for i in range(rows):
        for j in range(cols):
            result[j][i] = matrix[i][j]
    
    return result

# In-place for square matrix
def transpose_square(matrix):
    n = len(matrix)
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    return matrix

# Example
matrix = [
    [1, 2, 3],
    [4, 5, 6]
]
transposed = transpose(matrix)
print(transposed)
# [[1, 4],
#  [2, 5],
#  [3, 6]]
```

---

### 2. Rotate Matrix 90° Clockwise

**Time Complexity:** O(n²)  
**Space Complexity:** O(1) in-place

```python
# Python
def rotate_90_clockwise(matrix):
    """
    Rotate square matrix 90° clockwise in-place
    Step 1: Transpose
    Step 2: Reverse each row
    """
    n = len(matrix)
    
    # Transpose
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    
    # Reverse each row
    for i in range(n):
        matrix[i].reverse()
    
    return matrix

# Example
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
rotate_90_clockwise(matrix)
print(matrix)
# [[7, 4, 1],
#  [8, 5, 2],
#  [9, 6, 3]]
```

**Visual:**
```
Original:        After Transpose:   After Row Reverse:
1 2 3            1 4 7              7 4 1
4 5 6     →      2 5 8       →      8 5 2
7 8 9            3 6 9              9 6 3
```

---

### 3. Search in Sorted Matrix

**Time Complexity:** O(m + n)  
**Space Complexity:** O(1)

```python
# Python
def search_sorted_matrix(matrix, target):
    """
    Search in matrix where:
    - Each row is sorted left to right
    - Each column is sorted top to bottom
    Start from top-right corner
    """
    if not matrix or not matrix[0]:
        return False
    
    rows = len(matrix)
    cols = len(matrix[0])
    row, col = 0, cols - 1  # Start top-right
    
    while row < rows and col >= 0:
        if matrix[row][col] == target:
            return True
        elif matrix[row][col] > target:
            col -= 1  # Move left
        else:
            row += 1  # Move down
    
    return False

# Example
matrix = [
    [1,  4,  7, 11],
    [2,  5,  8, 12],
    [3,  6,  9, 16],
    [10, 13, 14, 17]
]
print(search_sorted_matrix(matrix, 5))   # True
print(search_sorted_matrix(matrix, 20))  # False
```

---

### 4. Set Matrix Zeros

**Time Complexity:** O(m × n)  
**Space Complexity:** O(1)

```python
# Python
def set_zeroes(matrix):
    """
    If element is 0, set entire row and column to 0
    In-place with O(1) extra space
    """
    rows = len(matrix)
    cols = len(matrix[0])
    first_row_zero = any(matrix[0][j] == 0 for j in range(cols))
    first_col_zero = any(matrix[i][0] == 0 for i in range(rows))
    
    # Use first row and column as markers
    for i in range(1, rows):
        for j in range(1, cols):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0
    
    # Set zeros based on markers
    for i in range(1, rows):
        for j in range(1, cols):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0
    
    # Handle first row and column
    if first_row_zero:
        for j in range(cols):
            matrix[0][j] = 0
    if first_col_zero:
        for i in range(rows):
            matrix[i][0] = 0
    
    return matrix

# Example
matrix = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
]
set_zeroes(matrix)
print(matrix)
# [[1, 0, 1],
#  [0, 0, 0],
#  [1, 0, 1]]
```

---

## 🧮 Matrix Arithmetic

### Matrix Addition

```python
# Python
def matrix_add(A, B):
    rows = len(A)
    cols = len(A[0])
    result = [[0] * cols for _ in range(rows)]
    
    for i in range(rows):
        for j in range(cols):
            result[i][j] = A[i][j] + B[i][j]
    
    return result

# Using numpy
import numpy as np
A = np.array([[1,2], [3,4]])
B = np.array([[5,6], [7,8]])
C = A + B
```

---

### Matrix Multiplication

**Time Complexity:** O(n³)

```python
# Python
def matrix_multiply(A, B):
    """
    Multiply matrices A (m×n) and B (n×p) → Result (m×p)
    """
    m, n = len(A), len(A[0])
    p = len(B[0])
    result = [[0] * p for _ in range(m)]
    
    for i in range(m):
        for j in range(p):
            for k in range(n):
                result[i][j] += A[i][k] * B[k][j]
    
    return result

# Example
A = [[1, 2], [3, 4]]
B = [[5, 6], [7, 8]]
C = matrix_multiply(A, B)
# [[19, 22],
#  [43, 50]]
```

---

## 📊 Time Complexity Summary

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Access element | O(1) | O(1) |
| Row-wise traversal | O(m × n) | O(1) |
| Column-wise traversal | O(m × n) | O(1) |
| Spiral traversal | O(m × n) | O(1) |
| Transpose | O(m × n) | O(m × n) or O(1) |
| Rotate 90° | O(n²) | O(1) |
| Search (sorted) | O(m + n) | O(1) |
| Matrix addition | O(m × n) | O(m × n) |
| Matrix multiplication | O(m × n × p) | O(m × p) |

---

## 🧪 Practice Problems

1. Print matrix in spiral order
2. Rotate matrix 90° clockwise
3. Search in row-wise and column-wise sorted matrix
4. Set matrix zeros
5. Diagonal traverse
6. Find peak element in 2D array
7. Count islands in binary matrix
8. Print matrix in wave form
9. Transpose of matrix
10. Multiply two matrices

---

## 💡 Key Takeaways

1. ✅ 2D arrays are **arrays of arrays**
2. ✅ Access is **O(1)** using `matrix[row][col]`
3. ✅ Most operations are **O(m × n)** where m = rows, n = cols
4. ✅ Memory is **row-major** in most languages
5. ✅ Use **numpy** for numerical operations in Python
6. ✅ Be careful with **initialization** - avoid reference copying
7. ✅ **Spiral** and **diagonal** traversals are common interview questions
8. ✅ **In-place** algorithms save space

---

[← Back to Array Operations](./02-Array-Operations.md) | [Back to Chapter](./README.md) | [Next: Dynamic Arrays →](./04-Dynamic-Arrays.md)
