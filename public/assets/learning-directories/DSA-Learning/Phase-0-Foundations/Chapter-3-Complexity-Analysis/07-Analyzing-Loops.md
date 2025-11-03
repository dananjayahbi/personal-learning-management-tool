# 07. Analyzing Loops

## 🎯 Why Loop Analysis Matters

Loops are the **most common** source of time complexity. Mastering loop analysis is essential for understanding algorithm efficiency.

---

## 1️⃣ Single Loops

### Pattern: O(n)

**Simple Iteration:**
```python
# O(n)
for i in range(n):
    print(i)
```

**Counting Operations:**
```python
def count_operations(n):
    count = 0
    for i in range(n):    # n iterations
        count += 1        # 1 operation per iteration
    return count
# Total: n operations → O(n)
```

### Variations

**Loop with Step:**
```python
# O(n/2) = O(n)
for i in range(0, n, 2):  # 0, 2, 4, 6, ..., n-2
    print(i)
# n/2 iterations → O(n)
```

**Backward Loop:**
```python
# O(n)
for i in range(n, 0, -1):  # n, n-1, ..., 2, 1
    print(i)
# n iterations → O(n)
```

**Two Sequential Loops:**
```python
# O(n) + O(n) = O(2n) = O(n)
for i in range(n):
    print(i)

for j in range(n):
    print(j)
# Total: n + n = 2n → O(n)
```

---

## 2️⃣ Nested Loops - Same Size

### Pattern: O(n²)

**Two Nested Loops:**
```python
# O(n²)
for i in range(n):        # n iterations
    for j in range(n):    # n iterations for each i
        print(i, j)
# Total: n × n = n² → O(n²)
```

**Example: All Pairs:**
```python
def print_all_pairs(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n):
            print(arr[i], arr[j])
# O(n²)
```

### Pattern: O(n³)

**Three Nested Loops:**
```python
# O(n³)
for i in range(n):
    for j in range(n):
        for k in range(n):
            print(i, j, k)
# Total: n × n × n = n³ → O(n³)
```

---

## 3️⃣ Dependent Nested Loops

### Pattern: O(n²) - Triangle

**Second Loop Depends on First:**
```python
# O(n²)
for i in range(n):          # n iterations
    for j in range(i):      # 0, 1, 2, ..., n-1 iterations
        print(i, j)

# Iterations:
# i=0: 0 times
# i=1: 1 time
# i=2: 2 times
# ...
# i=n-1: n-1 times
# Total: 0 + 1 + 2 + ... + (n-1) = n(n-1)/2 = (n²-n)/2
# Drop constants and lower terms → O(n²)
```

**Visual Representation:**
```
i=0: (nothing)
i=1: j=0
i=2: j=0,1
i=3: j=0,1,2
i=4: j=0,1,2,3
...

Total operations form a triangle:
    *
   **
  ***
 ****
*****

Area of triangle ≈ n²/2 → O(n²)
```

**Starting from i+1:**
```python
# O(n²)
for i in range(n):
    for j in range(i+1, n):    # i+1, i+2, ..., n-1
        print(i, j)

# Iterations:
# i=0: n-1 times
# i=1: n-2 times
# i=2: n-3 times
# ...
# i=n-1: 0 times
# Total: (n-1) + (n-2) + ... + 1 + 0 = n(n-1)/2 → O(n²)
```

---

## 4️⃣ Loops with Logarithmic Behavior

### Pattern: O(log n)

**Dividing by Constant:**
```python
# O(log n)
i = n
while i > 1:
    print(i)
    i = i // 2    # Divide by 2

# Sequence: n, n/2, n/4, n/8, ..., 1
# After k iterations: i = n / 2^k
# Stops when n / 2^k = 1
# Therefore: k = log₂(n)
# Complexity: O(log n)
```

**Multiplying by Constant:**
```python
# O(log n)
i = 1
while i < n:
    print(i)
    i = i * 2     # Multiply by 2

# Sequence: 1, 2, 4, 8, 16, ..., n
# After k iterations: i = 2^k
# Stops when 2^k >= n
# Therefore: k = log₂(n)
# Complexity: O(log n)
```

**Dividing by 3:**
```python
# O(log₃ n) = O(log n)
i = n
while i > 1:
    print(i)
    i = i // 3

# Note: Base doesn't matter in Big-O
# log₃(n) = log₂(n) / log₂(3) = constant × log₂(n)
# Complexity: O(log n)
```

---

## 5️⃣ Nested Loops - Mixed Sizes

### Pattern: O(n log n)

**Outer Linear, Inner Logarithmic:**
```python
# O(n log n)
for i in range(n):      # O(n)
    j = 1
    while j < n:        # O(log n)
        print(i, j)
        j = j * 2

# Outer: n iterations
# Inner: log n iterations
# Total: n × log n → O(n log n)
```

**Example: Merge Sort Structure:**
```python
def merge_sort_structure(arr):
    n = len(arr)
    for i in range(n):           # O(n)
        # Binary search or divide
        j = 1
        while j < n:             # O(log n)
            process(i, j)
            j *= 2
# O(n log n)
```

### Pattern: O(m × n)

**Different Variables:**
```python
def process_two_arrays(arr1, arr2):
    m = len(arr1)
    n = len(arr2)
    
    for i in range(m):      # m iterations
        for j in range(n):  # n iterations
            print(arr1[i], arr2[j])
# O(m × n)
```

---

## 6️⃣ Variable Increment Loops

### Arithmetic Progression

**i += i:**
```python
# O(log n)
i = 1
while i < n:
    print(i)
    i = i + i  # i += i means i = 2i (doubling)
# Same as i *= 2
# O(log n)
```

**i += k (constant):**
```python
# O(n/k) = O(n)
i = 0
while i < n:
    print(i)
    i = i + 5
# n/5 iterations → O(n)
```

### Geometric Progression

**i *= i:**
```python
# O(log log n)
i = 2
while i < n:
    print(i)
    i = i * i   # 2, 4, 16, 256, ...

# After k iterations: i = 2^(2^k)
# Stops when 2^(2^k) >= n
# Taking log twice: 2^k >= log(n)
# Therefore: k >= log(log(n))
# Complexity: O(log log n) - VERY FAST!
```

---

## 7️⃣ Complex Loop Patterns

### Square Root Loop

**Loop to √n:**
```python
# O(√n)
i = 1
while i * i < n:
    print(i)
    i += 1

# Stops when i² >= n
# Therefore: i = √n
# Complexity: O(√n)
```

**Example: Prime Check:**
```python
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):  # O(√n)
        if n % i == 0:
            return False
    return True
```

### Harmonic Series

**1 + 1/2 + 1/3 + ... + 1/n:**
```python
# O(log n) - Harmonic series sum ≈ log n
for i in range(1, n+1):
    for j in range(1, n+1, i):  # Step by i
        print(i, j)

# i=1: n iterations
# i=2: n/2 iterations
# i=3: n/3 iterations
# ...
# Total: n(1 + 1/2 + 1/3 + ... + 1/n) = n × H(n)
# H(n) = harmonic series ≈ log n
# Complexity: O(n log n)
```

---

## 8️⃣ Loops with Breaks

### Early Exit

**Best vs Worst Case:**
```python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Early exit
    return -1

# Best case: O(1) - found at index 0
# Worst case: O(n) - found at end or not found
# We typically report: O(n)
```

**All Elements Checked:**
```python
def find_max_with_break(arr):
    max_val = arr[0]
    for num in arr:
        if num > max_val:
            max_val = num
        # No break, must check all
    return max_val
# O(n) - always checks all elements
```

---

## 🧮 Practice Problems

### Problem 1: Analyze This Loop

```python
for i in range(n):
    j = i
    while j < n:
        print(i, j)
        j = j * 2
```

<details>
<summary>Solution</summary>

**Analysis:**
- Outer loop: n iterations
- Inner loop: For each i, j goes from i to n by doubling
  - When i is small: log n iterations
  - When i is close to n: 1-2 iterations
  - Average: O(log n)
- Total: O(n log n)

**Answer: O(n log n)**
</details>

### Problem 2: What's the Complexity?

```python
i = 1
while i < n:
    for j in range(i):
        print(i, j)
    i = i * 2
```

<details>
<summary>Solution</summary>

**Analysis:**
- Outer while: O(log n) iterations (i doubles)
- Inner for: runs i times
- Iterations: 1 + 2 + 4 + 8 + ... + n/2 + n
- This is geometric series: 2ⁿ - 1 ≈ n
- Total: O(n)

**Answer: O(n)**
</details>

### Problem 3: Nested Dependent Loops

```python
for i in range(n):
    j = i
    while j > 0:
        print(i, j)
        j = j // 2
```

<details>
<summary>Solution</summary>

**Analysis:**
- Outer loop: n iterations
- Inner while: For each i, j halves from i to 0
  - Iterations: log₂(i)
- Total: log(1) + log(2) + ... + log(n) = log(n!)
- By Stirling: log(n!) ≈ n log n - n ≈ n log n

**Answer: O(n log n)**
</details>

### Problem 4: Tricky Loop

```python
for i in range(n):
    for j in range(i, n):
        for k in range(j, n):
            print(i, j, k)
```

<details>
<summary>Solution</summary>

**Analysis:**
This is counting triplets where i ≤ j ≤ k < n

- Number of such triplets = C(n+2, 3) = (n+2)(n+1)n / 6
- This is O(n³)

**Answer: O(n³)**
</details>

---

## 🎯 Quick Reference: Loop Patterns

| Loop Pattern | Complexity | Example |
|--------------|------------|---------|
| `for i in range(n)` | O(n) | Linear iteration |
| `for i: for j` (independent) | O(n²) | All pairs |
| `for i: for j in range(i)` | O(n²) | Triangle pattern |
| `while i < n: i *= 2` | O(log n) | Binary search pattern |
| `while i < n: i += 1` | O(n) | Linear |
| `for i: while j < n: j *= 2` | O(n log n) | Merge sort pattern |
| `while i*i < n: i += 1` | O(√n) | Square root |
| `while i < n: i *= i` | O(log log n) | Super fast |

---

## 🎯 Key Takeaways

1. ✅ **Single loop:** Usually O(n)
2. ✅ **Nested independent loops:** Multiply complexities
3. ✅ **Dependent loops:** Analyze the sum/pattern
4. ✅ **Halving/doubling:** Usually O(log n)
5. ✅ **Early exit:** Report worst case
6. ✅ **Count total iterations:** Use arithmetic/geometric series

---

[← Previous: Common Complexity Classes](./06-Common-Complexity-Classes.md) | [Back to README](./README.md) | [Next: Recursion Complexity →](./08-Recursion-Complexity.md)
