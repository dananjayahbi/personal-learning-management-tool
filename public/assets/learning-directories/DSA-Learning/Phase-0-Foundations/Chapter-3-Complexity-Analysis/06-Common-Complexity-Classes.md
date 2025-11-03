# 06. Common Complexity Classes

## 🎯 Overview of Complexity Classes

Understanding common complexity classes helps you quickly recognize algorithm efficiency. Let's explore each class in detail with real examples.

---

## 📊 Complexity Hierarchy

From fastest to slowest:

```
O(1) < O(log log n) < O(log n) < O(√n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!) < O(nⁿ)
```

---

## 1️⃣ O(1) - Constant Time

### Characteristics
- **Fixed number of operations**
- **Independent of input size**
- **Most efficient possible**

### Examples

**Array Access:**
```python
def get_element(arr, index):
    return arr[index]  # O(1)
```

**Hash Table Lookup:**
```python
def lookup(dictionary, key):
    return dictionary[key]  # O(1) average
```

**Mathematical Operations:**
```python
def calculate(a, b, c):
    return (a + b) * c / 2  # O(1)
```

**Stack/Queue Operations:**
```python
stack.push(item)    # O(1)
stack.pop()         # O(1)
queue.enqueue(item) # O(1)
queue.dequeue()     # O(1)
```

### Growth Table

| n | Operations |
|---|------------|
| 10 | 1 |
| 100 | 1 |
| 1,000,000 | 1 |

### Real-World Use Cases
- Accessing array element by index
- Inserting at head of linked list
- Checking if number is even/odd
- Returning first/last element

---

## 2️⃣ O(log n) - Logarithmic Time

### Characteristics
- **Divides problem in half each step**
- **Very efficient for large inputs**
- **Base of log doesn't matter** (log₂ n = log₁₀ n in Big-O)

### Examples

**Binary Search:**
```python
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
# n → n/2 → n/4 → n/8 → ... → 1
# Steps: log₂(n)
```

**Finding Power:**
```python
def power(base, exp):
    if exp == 0:
        return 1
    half = power(base, exp // 2)
    if exp % 2 == 0:
        return half * half
    else:
        return base * half * half
# O(log exp)
```

**Binary Tree Height:**
```python
# Balanced binary tree operations
# Height = log₂(n) where n is number of nodes
```

### Growth Table

| n | log₂(n) |
|---|---------|
| 10 | 3 |
| 100 | 7 |
| 1,000 | 10 |
| 1,000,000 | 20 |
| 1,000,000,000 | 30 |

### Why So Fast?

For n = 1,000,000:
- Linear: 1,000,000 operations
- Logarithmic: 20 operations
- **50,000× faster!**

### Real-World Use Cases
- Searching sorted data
- Balanced tree operations (BST, AVL, Red-Black)
- Finding number of digits
- Dividing problems recursively

---

## 3️⃣ O(√n) - Square Root Time

### Characteristics
- **Between logarithmic and linear**
- **Less common but useful**
- **Often in number theory**

### Examples

**Prime Check (Optimized):**
```python
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True
# Only check up to √n
```

**Finding Divisors:**
```python
def find_divisors(n):
    divisors = []
    for i in range(1, int(n ** 0.5) + 1):
        if n % i == 0:
            divisors.append(i)
            if i != n // i:
                divisors.append(n // i)
    return divisors
# O(√n)
```

### Growth Table

| n | √n |
|---|-----|
| 100 | 10 |
| 10,000 | 100 |
| 1,000,000 | 1,000 |

### Real-World Use Cases
- Prime checking
- Finding divisors
- Some number theory algorithms

---

## 4️⃣ O(n) - Linear Time

### Characteristics
- **Single pass through data**
- **Proportional to input size**
- **Very common and practical**

### Examples

**Find Maximum:**
```python
def find_max(arr):
    max_val = arr[0]
    for num in arr:
        if num > max_val:
            max_val = num
    return max_val
# Must check every element: O(n)
```

**Count Occurrences:**
```python
def count_occurrences(arr, target):
    count = 0
    for num in arr:
        if num == target:
            count += 1
    return count
# O(n)
```

**Array Sum:**
```python
def array_sum(arr):
    total = 0
    for num in arr:
        total += num
    return total
# O(n)
```

### Growth Table

| n | Operations |
|---|------------|
| 10 | 10 |
| 100 | 100 |
| 1,000 | 1,000 |
| 1,000,000 | 1,000,000 |

### Real-World Use Cases
- Iterating through list/array
- Linear search
- Finding min/max
- Calculating sum/average
- String traversal

---

## 5️⃣ O(n log n) - Linearithmic Time

### Characteristics
- **Efficient sorting complexity**
- **Optimal for comparison-based sorting**
- **Divide-and-conquer algorithms**

### Examples

**Merge Sort:**
```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])    # T(n/2)
    right = merge_sort(arr[mid:])   # T(n/2)
    
    return merge(left, right)       # O(n)

# Recurrence: T(n) = 2T(n/2) + O(n)
# Solution: O(n log n)
```

**Quick Sort (Average Case):**
```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)
# Average: O(n log n)
```

**Heap Sort:**
```python
def heap_sort(arr):
    # Build max heap: O(n)
    build_max_heap(arr)
    
    # Extract max n times: O(n log n)
    for i in range(len(arr) - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, 0, i)
    
    return arr
# O(n log n)
```

### Growth Table

| n | n log₂(n) |
|---|-----------|
| 10 | 33 |
| 100 | 664 |
| 1,000 | 9,966 |
| 1,000,000 | 19,931,569 |

### Why n log n?

**Merge Sort Breakdown:**
- **Levels:** log n (halving each time)
- **Work per level:** n (merging)
- **Total:** n × log n

```
           [8 elements]           ← n work
          /            \
    [4 elements]  [4 elements]    ← n work
      /     \       /     \
   [2,2]   [2,2] [2,2]  [2,2]     ← n work
   /  \    /  \  /  \   /  \
  [1] [1] [1] [1] ...             ← n work

  log n levels × n work = O(n log n)
```

### Real-World Use Cases
- Efficient sorting (merge sort, heap sort, quick sort)
- Sorting-based algorithms
- Computational geometry

---

## 6️⃣ O(n²) - Quadratic Time

### Characteristics
- **Nested loops over same data**
- **Gets slow quickly**
- **Acceptable for small inputs only**

### Examples

**Bubble Sort:**
```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr
# O(n²)
```

**Selection Sort:**
```python
def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
# O(n²)
```

**All Pairs:**
```python
def print_all_pairs(arr):
    for i in range(len(arr)):
        for j in range(len(arr)):
            print(arr[i], arr[j])
# O(n²)
```

### Growth Table

| n | n² | Time (at 1ns/op) |
|---|----|----|
| 10 | 100 | 100 ns |
| 100 | 10,000 | 10 μs |
| 1,000 | 1,000,000 | 1 ms |
| 10,000 | 100,000,000 | 100 ms |
| 100,000 | 10,000,000,000 | 10 sec |

### Real-World Use Cases
- Simple sorting (bubble, selection, insertion)
- Comparing all pairs
- Naive string matching
- Small datasets where simplicity matters

---

## 7️⃣ O(n³) - Cubic Time

### Characteristics
- **Three nested loops**
- **Very slow for large inputs**
- **Rarely acceptable**

### Example

**Matrix Multiplication (Naive):**
```python
def matrix_multiply(A, B):
    n = len(A)
    C = [[0] * n for _ in range(n)]
    
    for i in range(n):
        for j in range(n):
            for k in range(n):
                C[i][j] += A[i][k] * B[k][j]
    
    return C
# O(n³)
```

**Three Sum (Brute Force):**
```python
def three_sum(arr, target):
    result = []
    n = len(arr)
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                if arr[i] + arr[j] + arr[k] == target:
                    result.append([arr[i], arr[j], arr[k]])
    return result
# O(n³)
```

### Growth Table

| n | n³ |
|---|-----|
| 10 | 1,000 |
| 100 | 1,000,000 |
| 1,000 | 1,000,000,000 |

---

## 8️⃣ O(2ⁿ) - Exponential Time

### Characteristics
- **Doubles with each increase in n**
- **Quickly becomes impossible**
- **Avoid if possible**

### Examples

**Fibonacci (Naive):**
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
# O(2ⁿ)
```

**Subset Generation:**
```python
def generate_subsets(arr):
    if not arr:
        return [[]]
    
    first = arr[0]
    rest_subsets = generate_subsets(arr[1:])
    
    new_subsets = []
    for subset in rest_subsets:
        new_subsets.append([first] + subset)
    
    return rest_subsets + new_subsets
# O(2ⁿ) - 2ⁿ subsets
```

### Growth Table

| n | 2ⁿ |
|---|-----|
| 10 | 1,024 |
| 20 | 1,048,576 |
| 30 | 1,073,741,824 |
| 40 | 1,099,511,627,776 |

### Real-World Reality

For n = 50:
- Operations: 2⁵⁰ = 1,125,899,906,842,624
- At 1 billion ops/sec: **13 days**
- For n = 100: **Longer than age of universe**

### Real-World Use Cases
- Trying all combinations (when unavoidable)
- Brute force solutions
- Dynamic programming before optimization

---

## 9️⃣ O(n!) - Factorial Time

### Characteristics
- **Worst common complexity**
- **Only works for tiny inputs**
- **Grows faster than exponential**

### Example

**Traveling Salesman (Brute Force):**
```python
def tsp_brute_force(cities):
    from itertools import permutations
    
    min_distance = float('inf')
    best_path = None
    
    for path in permutations(cities):
        distance = calculate_distance(path)
        if distance < min_distance:
            min_distance = distance
            best_path = path
    
    return best_path
# O(n!)
```

**All Permutations:**
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
# O(n!)
```

### Growth Table

| n | n! |
|---|-----|
| 5 | 120 |
| 10 | 3,628,800 |
| 15 | 1,307,674,368,000 |
| 20 | 2.4 × 10¹⁸ |

### Maximum Practical n

At 1 billion operations/second:
- n = 13: ~6 seconds
- n = 14: ~86 seconds
- n = 15: ~22 minutes
- n = 20: **77,000 years**

---

## 📊 Complexity Comparison Visualization

### For n = 1,000,000

| Class | Operations | Feasible? |
|-------|------------|-----------|
| O(1) | 1 | ✅ Instant |
| O(log n) | 20 | ✅ Instant |
| O(n) | 1,000,000 | ✅ < 1ms |
| O(n log n) | 20,000,000 | ✅ ~20ms |
| O(n²) | 1,000,000,000,000 | ❌ 11.5 days |
| O(2ⁿ) | 2^1000000 | ❌ Never |
| O(n!) | 1000000! | ❌ Never |

---

## 🎯 Key Takeaways

1. ✅ **O(1), O(log n), O(n), O(n log n)** - Practical for large inputs
2. ✅ **O(n²)** - OK for small inputs (<1000)
3. ⚠️ **O(n³)** - Only very small inputs
4. ❌ **O(2ⁿ), O(n!)** - Avoid if possible, only tiny inputs

### Decision Guide

```
n < 10: Any complexity works
n < 100: Avoid O(n³) and worse
n < 1000: Avoid O(n²) and worse
n < 10000: Need O(n log n) or better
n < 1000000: Need O(n) or O(n log n)
n > 1000000: Need O(log n) or O(1)
```

---

[← Previous: Space Complexity](./05-Space-Complexity-Analysis.md) | [Back to README](./README.md) | [Next: Analyzing Loops →](./07-Analyzing-Loops.md)
