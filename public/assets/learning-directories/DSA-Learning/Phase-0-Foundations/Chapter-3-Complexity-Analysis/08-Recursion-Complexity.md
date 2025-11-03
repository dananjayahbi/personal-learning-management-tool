# 08. Recursion Complexity

## 🎯 Understanding Recursive Complexity

Analyzing recursion is different from loops. We need to:
1. Count the number of recursive calls
2. Determine work done per call
3. Analyze the recursion tree depth (for space)

---

## 📊 Recursion Analysis Methods

### Method 1: Recursion Tree
### Method 2: Recurrence Relations
### Method 3: Master Theorem (for divide-and-conquer)

---

## 1️⃣ Linear Recursion

### Single Recursive Call

**Factorial:**
```python
def factorial(n):
    if n <= 1:                # Base case
        return 1
    return n * factorial(n-1) # One recursive call

# Recursion tree:
# factorial(5)
#     ↓
# factorial(4)
#     ↓
# factorial(3)
#     ↓
# factorial(2)
#     ↓
# factorial(1) → returns

# Number of calls: n
# Work per call: O(1)
# Time: O(n)
# Space: O(n) - call stack depth
```

**Sum of Array:**
```python
def sum_array(arr, index=0):
    if index >= len(arr):
        return 0
    return arr[index] + sum_array(arr, index+1)

# n recursive calls
# O(1) work per call
# Time: O(n)
# Space: O(n)
```

---

## 2️⃣ Binary Recursion

### Two Recursive Calls

**Fibonacci (Naive):**
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Recursion tree for fib(5):
#                    fib(5)
#                 /          \
#            fib(4)          fib(3)
#           /      \         /     \
#      fib(3)    fib(2)  fib(2)  fib(1)
#      /   \     /   \   /   \
#   fib(2) fib(1) ...  ...   ...
#   /   \
# fib(1) fib(0)

# Each node makes 2 calls
# Tree height: n
# Total nodes: 2^0 + 2^1 + 2^2 + ... + 2^n ≈ 2^(n+1) - 1
# Time: O(2^n)
# Space: O(n) - max depth of recursion stack
```

**Why O(2^n)?**
- Each call makes 2 recursive calls
- Full binary tree of height n
- Nodes in tree ≈ 2^(n+1)

---

## 3️⃣ Divide and Conquer Recursion

### Binary Search

```python
def binary_search(arr, target, left, right):
    if left > right:
        return -1
    
    mid = (left + right) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search(arr, target, mid+1, right)
    else:
        return binary_search(arr, target, left, mid-1)

# Recurrence: T(n) = T(n/2) + O(1)
# Each call:
#   - Makes 1 recursive call on half the data
#   - Does O(1) work
# 
# Tree depth: log n (halving each time)
# Work per level: O(1)
# Time: O(log n)
# Space: O(log n) - call stack
```

### Merge Sort

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])    # T(n/2)
    right = merge_sort(arr[mid:])   # T(n/2)
    
    return merge(left, right)       # O(n)

# Recurrence: T(n) = 2T(n/2) + O(n)
# Each call:
#   - Makes 2 recursive calls on half the data
#   - Does O(n) work to merge
#
# Tree depth: log n
# Work per level: n (combining all merges at each level)
# Time: O(n log n)
# Space: O(n) - temporary arrays + O(log n) stack
```

**Merge Sort Tree:**
```
                [8 elements]              ← n work
               /            \
         [4 elem]          [4 elem]       ← n work
        /       \         /       \
    [2,2]     [2,2]   [2,2]     [2,2]     ← n work
    / \       / \     / \       / \
   [1][1]  [1][1] [1][1]  [1][1]          ← n work

   log n levels × n work/level = O(n log n)
```

---

## 4️⃣ Recurrence Relations

### What are Recurrence Relations?

A recurrence relation expresses T(n) in terms of T(smaller values).

**General Form:**
```
T(n) = a × T(n/b) + f(n)

Where:
- a = number of recursive calls
- n/b = size of each subproblem
- f(n) = work done outside recursion
```

### Common Recurrences

| Recurrence | Complexity | Example |
|------------|------------|---------|
| T(n) = T(n-1) + O(1) | O(n) | Factorial, linear search |
| T(n) = T(n-1) + O(n) | O(n²) | Selection sort |
| T(n) = 2T(n-1) + O(1) | O(2^n) | Fibonacci |
| T(n) = T(n/2) + O(1) | O(log n) | Binary search |
| T(n) = T(n/2) + O(n) | O(n) | Find median |
| T(n) = 2T(n/2) + O(n) | O(n log n) | Merge sort |
| T(n) = 2T(n/2) + O(1) | O(n) | Binary tree traversal |

---

## 5️⃣ The Master Theorem

### For Divide-and-Conquer Algorithms

**The Master Theorem** provides a formula for solving recurrences of the form:

$$
T(n) = aT(n/b) + f(n)
$$

Where:
- a ≥ 1 (number of subproblems)
- b > 1 (factor by which subproblem size is reduced)
- f(n) is asymptotically positive

### Three Cases

**Case 1:** If f(n) = O(n^c) where c < log_b(a)
- T(n) = Θ(n^(log_b(a)))

**Case 2:** If f(n) = Θ(n^c × log^k(n)) where c = log_b(a)
- T(n) = Θ(n^c × log^(k+1)(n))

**Case 3:** If f(n) = Ω(n^c) where c > log_b(a)
- T(n) = Θ(f(n))

### Master Theorem Examples

**Example 1: Binary Search**
```
T(n) = T(n/2) + O(1)

a = 1, b = 2, f(n) = O(1) = O(n^0)
log_b(a) = log_2(1) = 0

c = 0 = log_b(a) → Case 2
T(n) = Θ(n^0 × log n) = Θ(log n)
```

**Example 2: Merge Sort**
```
T(n) = 2T(n/2) + O(n)

a = 2, b = 2, f(n) = O(n) = O(n^1)
log_b(a) = log_2(2) = 1

c = 1 = log_b(a) → Case 2
T(n) = Θ(n^1 × log n) = Θ(n log n)
```

**Example 3: Binary Tree Traversal**
```
T(n) = 2T(n/2) + O(1)

a = 2, b = 2, f(n) = O(1) = O(n^0)
log_b(a) = log_2(2) = 1

c = 0 < 1 → Case 1
T(n) = Θ(n^1) = Θ(n)
```

**Example 4: Strassen's Matrix Multiplication**
```
T(n) = 7T(n/2) + O(n^2)

a = 7, b = 2, f(n) = O(n^2)
log_b(a) = log_2(7) ≈ 2.807

c = 2 < 2.807 → Case 1
T(n) = Θ(n^2.807) ≈ Θ(n^2.81)
```

---

## 6️⃣ Analyzing Complex Recursions

### Multiple Branches

**Ternary Recursion:**
```python
def ternary_search(arr, target, left, right):
    if left > right:
        return -1
    
    mid1 = left + (right - left) // 3
    mid2 = right - (right - left) // 3
    
    if arr[mid1] == target:
        return mid1
    if arr[mid2] == target:
        return mid2
    
    if target < arr[mid1]:
        return ternary_search(arr, target, left, mid1-1)
    elif target > arr[mid2]:
        return ternary_search(arr, target, mid2+1, right)
    else:
        return ternary_search(arr, target, mid1+1, mid2-1)

# T(n) = T(n/3) + O(1)
# By Master Theorem (a=1, b=3):
# Time: O(log n)
```

### Tree Recursion with Different Sizes

**Quicksort:**
```python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quicksort(left) + middle + quicksort(right)

# Best/Average case: T(n) = 2T(n/2) + O(n)
#   → O(n log n)
# Worst case (always unbalanced): T(n) = T(n-1) + O(n)
#   → O(n²)
```

---

## 7️⃣ Memoization and Dynamic Programming

### Optimizing Recursive Solutions

**Fibonacci with Memoization:**
```python
def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    
    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]

# Without memo: O(2^n)
# With memo: Each number calculated once
# Time: O(n) - n unique subproblems
# Space: O(n) - memo + O(n) stack = O(n)
```

**Why Faster?**
```
Without memo:
fib(5) calls fib(4) and fib(3)
fib(4) calls fib(3) and fib(2)
fib(3) is calculated TWICE (and many more times in larger calls)

With memo:
fib(5) calls fib(4) and fib(3)
fib(4) calls fib(3) (already in memo, returns immediately)
Each fib(k) calculated exactly once
```

---

## 🧮 Practice Problems

### Problem 1: Analyze This

```python
def mystery(n):
    if n <= 1:
        return 1
    return mystery(n-1) + mystery(n-1)
```

<details>
<summary>Solution</summary>

**Analysis:**
- Two recursive calls per call
- Each decrements n by 1
- Tree height: n
- Similar to fibonacci but with n-1 twice

**Recurrence:** T(n) = 2T(n-1) + O(1)

**Solution:**
- Each level has 2^k nodes
- Total: 2^0 + 2^1 + ... + 2^n = 2^(n+1) - 1

**Answer: O(2^n)**
</details>

### Problem 2: Find Complexity

```python
def mystery2(n):
    if n <= 1:
        return n
    return mystery2(n//2) + mystery2(n//2)
```

<details>
<summary>Solution</summary>

**Recurrence:** T(n) = 2T(n/2) + O(1)

**Master Theorem:**
- a = 2, b = 2, f(n) = O(1) = O(n^0)
- log_b(a) = log_2(2) = 1
- c = 0 < 1 → Case 1

**Answer: O(n)**
</details>

### Problem 3: With Extra Work

```python
def mystery3(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = mystery3(arr[:mid])
    right = mystery3(arr[mid:])
    
    # Process all elements
    for i in range(len(arr)):
        process(arr[i])
    
    return left + right
```

<details>
<summary>Solution</summary>

**Recurrence:** T(n) = 2T(n/2) + O(n)

**Master Theorem:**
- a = 2, b = 2, f(n) = O(n)
- log_b(a) = 1
- c = 1 = log_b(a) → Case 2

**Answer: O(n log n)**
</details>

---

## 🎯 Key Takeaways

1. ✅ **Linear recursion:** Usually O(n)
2. ✅ **Binary recursion:** Often O(2^n) unless optimized
3. ✅ **Divide and conquer:** Often O(n log n) or O(log n)
4. ✅ **Use recurrence relations** to formalize the problem
5. ✅ **Master Theorem** for divide-and-conquer
6. ✅ **Memoization** can reduce exponential to linear
7. ✅ **Space = max recursion depth** (usually)

### Quick Reference

| Pattern | Example | Time | Space |
|---------|---------|------|-------|
| T(n) = T(n-1) + O(1) | Factorial | O(n) | O(n) |
| T(n) = 2T(n-1) + O(1) | Fibonacci | O(2^n) | O(n) |
| T(n) = T(n/2) + O(1) | Binary Search | O(log n) | O(log n) |
| T(n) = 2T(n/2) + O(n) | Merge Sort | O(n log n) | O(n) |
| T(n) = 2T(n/2) + O(1) | Tree Traversal | O(n) | O(log n) |

---

[← Previous: Analyzing Loops](./07-Analyzing-Loops.md) | [Back to README](./README.md) | [Next: Best/Average/Worst Case →](./09-Best-Average-Worst-Case.md)
