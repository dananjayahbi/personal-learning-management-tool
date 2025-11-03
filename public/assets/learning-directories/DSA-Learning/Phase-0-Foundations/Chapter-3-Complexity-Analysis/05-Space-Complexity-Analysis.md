# 05. Space Complexity Analysis

## 🎯 What is Space Complexity?

**Space Complexity** measures how much **memory** an algorithm uses as the input size grows. It includes:

1. **Fixed Part:** Space for code, constants, variables
2. **Variable Part:** Space that depends on input size

We focus on the **variable part** - how memory grows with n.

---

## 📊 Types of Space

### 1. Auxiliary Space

**Auxiliary Space** = Extra space used by the algorithm (excluding input)

```python
def sum_array(arr):
    total = 0           # One integer variable
    for num in arr:
        total += num
    return total

# Input: arr (n elements) - doesn't count
# Auxiliary: total (1 variable) - O(1)
# Space Complexity: O(1)
```

### 2. Total Space

**Total Space** = Input space + Auxiliary space

```python
def create_copy(arr):
    copy = []
    for num in arr:
        copy.append(num)
    return copy

# Input: arr (n elements)
# Auxiliary: copy (n elements)
# Total Space: O(n) + O(n) = O(2n) = O(n)
```

**Important:** When we say "space complexity," we usually mean **auxiliary space** unless stated otherwise.

---

## 🔍 Analyzing Space Complexity

### What Counts Toward Space?

✅ **Count these:**
- Variables (integers, floats, booleans)
- Arrays, lists, dictionaries, sets
- Strings (immutable in Python, mutable in C++)
- Object instances
- Recursion stack space

❌ **Don't count (usually):**
- Input data (unless we modify it in-place)
- Code itself
- Constants

---

## 🎨 Common Space Complexity Patterns

### Pattern 1: O(1) - Constant Space

**Uses fixed amount of extra memory.**

```python
# Example 1: Variables only
def find_max(arr):
    max_val = arr[0]     # 1 variable
    for num in arr:
        if num > max_val:
            max_val = num
    return max_val
# Space: O(1) - just one variable

# Example 2: Fixed size array
def swap_first_last(arr):
    temp = arr[0]        # 1 variable
    arr[0] = arr[-1]
    arr[-1] = temp
    return arr
# Space: O(1) - constant variables

# Example 3: Multiple variables
def calculate(a, b, c):
    sum_val = a + b      # 1 variable
    product = a * b      # 1 variable
    result = sum_val * c # 1 variable
    return result
# Space: O(1) - constant number of variables
```

### Pattern 2: O(log n) - Logarithmic Space

**Recursion depth is logarithmic.**

```python
# Binary search (recursive)
def binary_search(arr, target, left, right):
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search(arr, target, mid + 1, right)
    else:
        return binary_search(arr, target, left, mid - 1)

# Recursion depth: log n (halving each time)
# Each call uses O(1) space
# Total: O(log n) stack space
```

**Why log n?**
- Each recursive call is stored on the stack
- We halve the problem each time
- Maximum stack depth = log₂(n)

### Pattern 3: O(n) - Linear Space

**Using array/list of size n.**

```python
# Example 1: Creating new array
def squares_array(n):
    result = []           # Start with empty list
    for i in range(n):
        result.append(i * i)  # Add n elements
    return result
# Space: O(n) - array of n elements

# Example 2: Memoization
def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]
# Space: O(n) - memo dictionary stores n values

# Example 3: String building
def repeat_string(s, n):
    result = ""
    for i in range(n):
        result += s
    return result
# Space: O(n × len(s)) - growing string
```

### Pattern 4: O(n²) - Quadratic Space

**2D arrays or nested structures.**

```python
# Example 1: 2D matrix
def create_matrix(n):
    matrix = []
    for i in range(n):
        row = []
        for j in range(n):
            row.append(i * j)
        matrix.append(row)
    return matrix
# Space: O(n²) - n×n matrix

# Example 2: All pairs
def all_pairs(arr):
    pairs = []
    for i in range(len(arr)):
        for j in range(len(arr)):
            pairs.append((arr[i], arr[j]))
    return pairs
# Space: O(n²) - n² pairs stored

# Example 3: Adjacency matrix
def create_adj_matrix(n):
    return [[0] * n for _ in range(n)]
# Space: O(n²) - n×n matrix
```

---

## 🔄 Recursion and Stack Space

### Understanding the Call Stack

Every recursive call adds a frame to the call stack:

```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Calling factorial(5):
# Stack: [factorial(5)]
# Stack: [factorial(5), factorial(4)]
# Stack: [factorial(5), factorial(4), factorial(3)]
# Stack: [factorial(5), factorial(4), factorial(3), factorial(2)]
# Stack: [factorial(5), factorial(4), factorial(3), factorial(2), factorial(1)]
# Maximum stack depth: n
# Space: O(n)
```

### Linear Recursion = O(n) Space

```python
def sum_recursive(arr, index=0):
    if index >= len(arr):
        return 0
    return arr[index] + sum_recursive(arr, index + 1)

# Stack depth: n (one call per element)
# Space: O(n)
```

### Tree Recursion = O(height) Space

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Although this makes 2^n calls total,
# maximum stack depth at any time is n
# (the longest path from root to leaf)
# Space: O(n)
```

### Binary Tree Recursion

```python
def tree_height(root):
    if not root:
        return 0
    left_height = tree_height(root.left)
    right_height = tree_height(root.right)
    return 1 + max(left_height, right_height)

# Maximum stack depth: height of tree
# Balanced tree: O(log n)
# Skewed tree: O(n)
```

---

## ⚖️ Time vs Space Tradeoffs

### Example 1: Fibonacci

**Approach 1: Recursive (Simple)**
```python
def fib_recursive(n):
    if n <= 1:
        return n
    return fib_recursive(n-1) + fib_recursive(n-2)

# Time: O(2^n) - VERY SLOW
# Space: O(n) - recursion depth
```

**Approach 2: Memoization (Trade space for time)**
```python
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]

# Time: O(n) - each number calculated once
# Space: O(n) - memo + recursion stack
```

**Approach 3: Iterative (Optimal)**
```python
def fib_iterative(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

# Time: O(n) - one loop
# Space: O(1) - only 2 variables
```

### Example 2: Two Sum

**Approach 1: Brute Force**
```python
def two_sum_brute(arr, target):
    for i in range(len(arr)):
        for j in range(i+1, len(arr)):
            if arr[i] + arr[j] == target:
                return [i, j]
    return None

# Time: O(n²) - nested loops
# Space: O(1) - no extra space
```

**Approach 2: Hash Map (Trade space for time)**
```python
def two_sum_hash(arr, target):
    seen = {}
    for i, num in enumerate(arr):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return None

# Time: O(n) - one pass
# Space: O(n) - hash map
```

---

## 📈 Analyzing Complex Space Usage

### Example 1: Merge Sort

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])     # Creates new array
    right = merge_sort(arr[mid:])    # Creates new array
    
    return merge(left, right)        # Creates merged array

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Analysis:
# - Recursion depth: log n
# - At each level, we create O(n) space for arrays
# - Total: O(n) auxiliary space
```

### Example 2: Quick Sort (In-Place)

```python
def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Analysis:
# - No new arrays created (in-place)
# - Recursion depth:
#   * Best/Average: O(log n)
#   * Worst: O(n)
# Space: O(log n) average, O(n) worst
```

---

## 🧮 Practice Problems

### Problem 1: Analyze Space

```python
def mystery1(n):
    arr = []
    for i in range(n):
        arr.append(i * i)
    
    total = 0
    for num in arr:
        total += num
    
    return total
```

<details>
<summary>Solution</summary>

**Analysis:**
- `arr` stores n elements
- `total` is one variable
- No recursion

**Answer: O(n)** - array of size n
</details>

### Problem 2: Recursive Space

```python
def mystery2(n):
    if n <= 0:
        return 0
    return n + mystery2(n - 1)
```

<details>
<summary>Solution</summary>

**Analysis:**
- Each call adds to stack
- Maximum depth: n
- Each call uses O(1) space

**Answer: O(n)** - recursion stack
</details>

### Problem 3: Matrix Creation

```python
def mystery3(m, n):
    matrix = []
    for i in range(m):
        row = []
        for j in range(n):
            row.append(i + j)
        matrix.append(row)
    return matrix
```

<details>
<summary>Solution</summary>

**Analysis:**
- Creates m×n matrix
- m rows, each with n elements

**Answer: O(m × n)** - size of matrix
</details>

### Problem 4: In-Place vs Copy

```python
# Version A
def reverse_a(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr

# Version B
def reverse_b(arr):
    return arr[::-1]
```

<details>
<summary>Solution</summary>

**Version A:**
- Modifies in-place
- Only uses 2 variables
- Space: O(1)

**Version B:**
- Creates new array
- Space: O(n)

**Answer: A is O(1), B is O(n)**
</details>

---

## 🎯 Key Takeaways

1. ✅ **Space complexity** = memory usage as function of n
2. ✅ **Auxiliary space** = extra space (excluding input)
3. ✅ Count: variables, arrays, dictionaries, **recursion stack**
4. ✅ **In-place algorithms** use O(1) extra space
5. ✅ **Recursion depth** contributes to space
6. ✅ **Tradeoffs**: Can often trade time for space or vice versa

### Quick Reference

| Algorithm | Time | Space | Notes |
|-----------|------|-------|-------|
| Linear search | O(n) | O(1) | Iterative |
| Binary search | O(log n) | O(1) | Iterative |
| Binary search (recursive) | O(log n) | O(log n) | Stack space |
| Merge sort | O(n log n) | O(n) | Extra arrays |
| Quick sort (in-place) | O(n log n) | O(log n) | Stack only |
| Bubble sort | O(n²) | O(1) | In-place |
| Fibonacci (recursive) | O(2^n) | O(n) | Stack depth |
| Fibonacci (memo) | O(n) | O(n) | Cache results |
| Fibonacci (iterative) | O(n) | O(1) | Optimal |

### In-Place vs Not In-Place

**In-Place (O(1) space):**
- Modifies input directly
- Uses only constant extra space
- Examples: Bubble sort, insertion sort

**Not In-Place (O(n) space):**
- Creates new data structures
- Preserves original input
- Examples: Merge sort, string concatenation

---

## 🚀 What's Next?

Now that you understand time and space complexity individually, let's explore the **Common Complexity Classes** in detail!

---

[← Previous: Time Complexity Analysis](./04-Time-Complexity-Analysis.md) | [Back to README](./README.md) | [Next: Common Complexity Classes →](./06-Common-Complexity-Classes.md)
