# 04. Time Complexity Analysis

## 🎯 What is Time Complexity?

**Time Complexity** measures how the **runtime** of an algorithm grows with the input size. It's not about measuring actual seconds—it's about counting **fundamental operations**.

### What We Count

✅ **Count these operations:**
- Arithmetic operations (+, -, *, /, %)
- Comparisons (<, >, ==, !=, <=, >=)
- Assignments (=)
- Array/object access (arr[i], obj.property)
- Function calls

❌ **Don't count these:**
- Comments
- Variable declarations (without assignment)
- Return statements (unless they have operations)

---

## 🔢 Counting Operations: Step-by-Step

### Example 1: Simple Sequential Operations

```python
def sum_and_product(a, b):
    sum_val = a + b        # 1 addition + 1 assignment = 2
    product = a * b        # 1 multiplication + 1 assignment = 2
    return sum_val + product  # 1 addition = 1

# Total: 2 + 2 + 1 = 5 operations
# This is constant → O(1)
```

### Example 2: Single Loop

```python
def sum_array(arr):
    total = 0              # 1 assignment
    for num in arr:        # n iterations
        total += num       # 1 addition + 1 assignment = 2 per iteration
    return total           # 0 operations (just return)

# Total: 1 + n*(2) = 1 + 2n
# Drop constants → O(n)
```

### Example 3: Nested Loops

```python
def print_pairs(arr):
    n = len(arr)           # 1 operation
    for i in range(n):     # n iterations
        for j in range(n): # n iterations (for each i)
            print(arr[i], arr[j])  # 2 accesses + 1 print = 3 operations
    
# Total: 1 + n * n * 3 = 1 + 3n²
# Drop constants → O(n²)
```

---

## 📊 Sequential vs Nested Operations

### Rule: Sequential = Add, Nested = Multiply

**Sequential Operations (Add):**
```python
def sequential(arr):
    # First operation
    for i in arr:        # O(n)
        print(i)
    
    # Second operation
    for i in arr:        # O(n)
        print(i * 2)
    
    # Total: O(n) + O(n) = O(2n) = O(n)
```

**Nested Operations (Multiply):**
```python
def nested(arr):
    for i in arr:        # O(n)
        for j in arr:    # O(n) for each i
            print(i, j)
    
    # Total: O(n) × O(n) = O(n²)
```

---

## 🎨 Common Time Complexity Patterns

### Pattern 1: O(1) - Constant Time

**Operations that don't depend on input size.**

```python
# Array access
def get_first(arr):
    return arr[0]  # O(1)

# Dictionary lookup
def get_value(dict, key):
    return dict[key]  # Average: O(1)

# Math operations
def calculate(a, b, c):
    return (a + b) * c / 2  # O(1)

# Multiple constant operations
def multiple_constants(arr):
    first = arr[0]      # O(1)
    last = arr[-1]      # O(1)
    return first + last # O(1)
    # Total: O(1) + O(1) + O(1) = O(1)
```

### Pattern 2: O(log n) - Logarithmic Time

**Repeatedly dividing the problem in half.**

```python
# Binary search
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Each iteration halves the search space
# n → n/2 → n/4 → n/8 → ... → 1
# Number of iterations: log₂(n)
# Time Complexity: O(log n)
```

**Powers of 2:**
```python
def count_powers(n):
    count = 0
    i = 1
    while i < n:
        count += 1
        i *= 2  # i = 1, 2, 4, 8, 16, ...
    return count

# i reaches n after log₂(n) iterations
# Time Complexity: O(log n)
```

### Pattern 3: O(n) - Linear Time

**One pass through the data.**

```python
# Simple iteration
def find_max(arr):
    max_val = arr[0]
    for num in arr:
        if num > max_val:
            max_val = num
    return max_val
# O(n)

# Two sequential loops
def two_passes(arr):
    # First pass
    total = sum(arr)     # O(n)
    
    # Second pass
    for num in arr:      # O(n)
        print(num / total)
    
    # Total: O(n) + O(n) = O(2n) = O(n)
```

### Pattern 4: O(n log n) - Linearithmic Time

**Efficient divide-and-conquer algorithms.**

```python
# Merge sort
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])    # T(n/2)
    right = merge_sort(arr[mid:])   # T(n/2)
    
    return merge(left, right)       # O(n)

# Recurrence: T(n) = 2T(n/2) + O(n)
# Solution: T(n) = O(n log n)
```

**Why n log n?**
- **log n** levels in recursion tree (dividing by 2)
- **n** work at each level (merging)
- Total: n × log n = **O(n log n)**

### Pattern 5: O(n²) - Quadratic Time

**Nested loops over same data.**

```python
# Two nested loops
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):           # O(n)
        for j in range(n - i - 1): # O(n) average
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr
# O(n²)

# All pairs
def find_all_pairs(arr):
    pairs = []
    for i in range(len(arr)):      # O(n)
        for j in range(len(arr)):  # O(n)
            pairs.append((arr[i], arr[j]))
    return pairs
# O(n²)
```

### Pattern 6: O(n³) - Cubic Time

**Three nested loops.**

```python
# Triple nested loops
def three_sum_brute_force(arr, target):
    n = len(arr)
    result = []
    
    for i in range(n):           # O(n)
        for j in range(i+1, n):  # O(n)
            for k in range(j+1, n):  # O(n)
                if arr[i] + arr[j] + arr[k] == target:
                    result.append([arr[i], arr[j], arr[k]])
    
    return result
# O(n³)
```

### Pattern 7: O(2ⁿ) - Exponential Time

**Recursive algorithms with branching factor of 2.**

```python
# Fibonacci (naive)
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Tree structure:
#            fib(5)
#          /        \
#      fib(4)      fib(3)
#      /    \      /    \
#   fib(3) fib(2) fib(2) fib(1)
#   ...

# Each node makes 2 calls
# Tree height: n
# Total nodes: 2⁰ + 2¹ + 2² + ... + 2ⁿ ≈ 2ⁿ⁺¹
# Time Complexity: O(2ⁿ)
```

### Pattern 8: O(n!) - Factorial Time

**Generating all permutations.**

```python
def permutations(arr):
    if len(arr) <= 1:
        return [arr]
    
    result = []
    for i in range(len(arr)):
        rest = arr[:i] + arr[i+1:]
        for perm in permutations(rest):
            result.append([arr[i]] + perm)
    
    return result

# n choices for first element
# n-1 choices for second
# ...
# 1 choice for last
# Total: n! permutations
# Time Complexity: O(n!)
```

---

## 🧮 Analyzing Complex Code

### Example 1: Multiple Loops

```python
def complex_function(arr):
    n = len(arr)
    
    # Part 1: O(n)
    for i in range(n):
        print(arr[i])
    
    # Part 2: O(n²)
    for i in range(n):
        for j in range(n):
            print(arr[i] + arr[j])
    
    # Part 3: O(n)
    for i in range(n):
        print(arr[i] * 2)
    
    # Total: O(n) + O(n²) + O(n) = O(n²)
    # The n² term dominates
```

### Example 2: Dependent Loops

```python
def dependent_loops(arr):
    n = len(arr)
    
    for i in range(n):      # Outer: n iterations
        for j in range(i):  # Inner: 0, 1, 2, ..., n-1
            print(i, j)
    
    # Total iterations: 0 + 1 + 2 + ... + (n-1)
    # Sum = n(n-1)/2 = (n² - n)/2
    # Drop constants and lower terms → O(n²)
```

### Example 3: Loop with Break

```python
def early_exit(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Early exit
    return -1

# Best case: O(1) - found at index 0
# Worst case: O(n) - found at end or not found
# We report: O(n) - worst case
```

### Example 4: Binary Search + Linear Operation

```python
def search_and_process(arr, target):
    # Binary search: O(log n)
    index = binary_search(arr, target)
    
    if index != -1:
        # Linear operation: O(n)
        process_array(arr)
    
    # Total: O(log n) + O(n) = O(n)
    # Linear term dominates
```

---

## 📈 Time Complexity Comparison

### For n = 1,000,000

| Complexity | Operations | Time (approx) |
|------------|------------|---------------|
| O(1) | 1 | 1 nanosecond |
| O(log n) | 20 | 20 nanoseconds |
| O(n) | 1,000,000 | 1 millisecond |
| O(n log n) | 20,000,000 | 20 milliseconds |
| O(n²) | 1,000,000,000,000 | 11.5 days |
| O(2ⁿ) | 2^1000000 | Heat death of universe |
| O(n!) | 1000000! | ∞ |

### Growth Rate Comparison

```
n = 10:
O(log n) = 3
O(n) = 10
O(n log n) = 30
O(n²) = 100
O(2ⁿ) = 1,024
O(n!) = 3,628,800

n = 100:
O(log n) = 7
O(n) = 100
O(n log n) = 700
O(n²) = 10,000
O(2ⁿ) = 1.27 × 10³⁰
O(n!) = 9.33 × 10¹⁵⁷
```

---

## 🏋️ Practice Problems

### Problem 1: What's the Time Complexity?

```python
def mystery1(arr):
    result = 0
    for i in range(len(arr)):
        result += arr[i]
    
    for i in range(len(arr)):
        for j in range(len(arr)):
            result += arr[i] * arr[j]
    
    return result
```

<details>
<summary>Solution</summary>

**Analysis:**
- First loop: O(n)
- Nested loops: O(n²)
- Total: O(n) + O(n²) = O(n²)

**Answer: O(n²)**
</details>

### Problem 2: Analyze This

```python
def mystery2(n):
    i = 1
    while i < n:
        print(i)
        i *= 3
```

<details>
<summary>Solution</summary>

**Analysis:**
- i = 1, 3, 9, 27, 81, ...
- i = 3^k after k iterations
- Loop stops when 3^k ≥ n
- k = log₃(n)

**Answer: O(log n)**
</details>

### Problem 3: Two Arrays

```python
def mystery3(arr1, arr2):
    for item1 in arr1:
        for item2 in arr2:
            if item1 == item2:
                print(item1)
```

<details>
<summary>Solution</summary>

Let m = len(arr1), n = len(arr2)

**Analysis:**
- Outer loop: m iterations
- Inner loop: n iterations per outer iteration
- Total: m × n

**Answer: O(m × n)**
</details>

### Problem 4: Early Exit

```python
def mystery4(arr):
    for i in range(len(arr)):
        if arr[i] == 0:
            break
        print(arr[i])
```

<details>
<summary>Solution</summary>

**Analysis:**
- Best case: O(1) - first element is 0
- Worst case: O(n) - no zeros, or zero at end
- We report worst case

**Answer: O(n)**
</details>

---

## 🎯 Key Takeaways

1. ✅ Count **fundamental operations**, not lines of code
2. ✅ **Sequential** operations → Add complexities
3. ✅ **Nested** operations → Multiply complexities
4. ✅ Focus on **dominant term** (highest power)
5. ✅ **Drop constants** and lower-order terms
6. ✅ Always analyze **worst case** unless specified

### Quick Reference

| Pattern | Complexity | Example |
|---------|------------|---------|
| Constant operations | O(1) | Array access, math |
| Halving each iteration | O(log n) | Binary search |
| One loop | O(n) | Linear search |
| Divide & conquer | O(n log n) | Merge sort |
| Two nested loops | O(n²) | Bubble sort |
| Three nested loops | O(n³) | 3-sum brute force |
| 2 recursive calls | O(2ⁿ) | Fibonacci |
| All permutations | O(n!) | Permutations |

---

## 🚀 What's Next?

Time complexity is just one dimension. Next, we'll explore **Space Complexity Analysis** to understand memory usage!

---

[← Previous: Other Notations](./03-Other-Notations.md) | [Back to README](./README.md) | [Next: Space Complexity Analysis →](./05-Space-Complexity-Analysis.md)
