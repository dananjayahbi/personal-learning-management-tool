# 02. Big-O Notation

## 🎯 What is Big-O Notation?

**Big-O Notation** is a mathematical way to describe how an algorithm's performance scales with input size. It gives us the **upper bound** (worst case) of an algorithm's growth rate.

Think of Big-O as answering: **"In the worst case, how does this algorithm scale?"**

### The "O" Symbol

The **O** stands for "**Order of**" (as in "order of magnitude").

When we write **O(n)**, we say:
- "**Big-O of n**" or
- "**Order n**" or
- "**Linear complexity**"

---

## 🧮 Formal Definition

**Mathematical Definition:**

An algorithm is **O(g(n))** if there exist positive constants **c** and **n₀** such that:

$$
f(n) \leq c \cdot g(n) \text{ for all } n \geq n_0
$$

**In Plain English:**

After some point (n₀), the function f(n) (actual operations) is always less than or equal to some constant times g(n) (our Big-O function).

### Visual Example

```
Operations
    |
    |           f(n) = 3n + 5
    |          /
    |         /
    |        / c·g(n) = 4n
    |       /  
    |______/_____________ Input Size (n)
           n₀
```

After n₀, f(n) stays below c·g(n), so f(n) is O(n).

---

## 🔍 How to Calculate Big-O

### Step-by-Step Method

**Step 1:** Count all operations as a function of n  
**Step 2:** Keep only the **highest order term**  
**Step 3:** Drop the **constant coefficient**  
**Step 4:** Express as O(...)

### Example 1: Simple Function

```python
def example1(arr):
    n = len(arr)           # 1 operation
    total = 0              # 1 operation
    
    for i in range(n):     # n iterations
        total += arr[i]    # 1 operation per iteration
    
    return total           # 1 operation

# Total: 1 + 1 + n + 1 = n + 3
```

**Calculation:**
- Total operations: f(n) = n + 3
- Highest order term: n
- Drop constant: n
- **Big-O: O(n)**

### Example 2: Nested Loops

```python
def example2(arr):
    n = len(arr)
    for i in range(n):           # n iterations
        for j in range(n):       # n iterations for each i
            print(arr[i], arr[j]) # 1 operation
    
# Total: n × n × 1 = n²
```

**Calculation:**
- Total operations: f(n) = n²
- Highest order term: n²
- **Big-O: O(n²)**

### Example 3: Multiple Terms

```python
def example3(arr):
    n = len(arr)
    
    # First loop
    for i in range(n):      # n iterations
        print(arr[i])
    
    # Second loop
    for i in range(n):      # n iterations
        for j in range(n):  # n iterations
            print(i, j)
    
    # Third loop
    for i in range(100):    # 100 iterations
        print(i)

# Total: n + n² + 100
```

**Calculation:**
- Total operations: f(n) = n² + n + 100
- Highest order term: n²
- Drop constants and lower terms: n²
- **Big-O: O(n²)**

---

## 📏 Big-O Rules and Properties

### Rule 1: Drop Constants

**Constants don't matter in Big-O.**

```python
# O(2n) = O(n)
def double_loop(arr):
    for i in arr:
        print(i)
    for i in arr:
        print(i)
# O(n) + O(n) = O(2n) = O(n)

# O(n/2) = O(n)
def half_loop(arr):
    for i in range(len(arr) // 2):
        print(arr[i])
# O(n)
```

**Why?** For large n, 2n and n grow at the same rate.

### Rule 2: Drop Lower Order Terms

**Only keep the dominant (fastest-growing) term.**

| Expression | Simplified |
|------------|------------|
| O(n² + n) | O(n²) |
| O(n³ + n² + n) | O(n³) |
| O(n + log n) | O(n) |
| O(n log n + n) | O(n log n) |
| O(2ⁿ + n²) | O(2ⁿ) |

**Why?** For large n, n² dominates n. Example:
- n = 1000: n² = 1,000,000 vs n = 1,000
- n² is 1000× larger!

### Rule 3: Different Inputs = Different Variables

**Use different variables for different inputs.**

```python
# WRONG: O(n)
def process_two_arrays(arr1, arr2):
    for item in arr1:
        print(item)
    for item in arr2:
        print(item)

# CORRECT: O(a + b)
# where a = len(arr1), b = len(arr2)
```

### Rule 4: Arithmetic Series

```python
# Sum: 1 + 2 + 3 + ... + n = n(n+1)/2
for i in range(n):
    for j in range(i):
        print(i, j)

# Total operations: 1 + 2 + 3 + ... + n = n²/2
# Big-O: O(n²)
```

### Rule 5: Logarithms

**Whenever you divide n repeatedly, think O(log n).**

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

# Each iteration cuts search space in half
# n → n/2 → n/4 → n/8 → ... → 1
# Number of iterations: log₂(n)
# Big-O: O(log n)
```

---

## 🎨 Common Big-O Examples

### O(1) - Constant Time

**Operations that don't depend on input size.**

```python
def get_first(arr):
    return arr[0]  # Always 1 operation

def add_numbers(a, b):
    return a + b   # Always 1 operation

def hash_lookup(dictionary, key):
    return dictionary[key]  # Average: O(1)
```

### O(log n) - Logarithmic Time

**Dividing the problem in half repeatedly.**

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
```

### O(n) - Linear Time

**One pass through the data.**

```python
def find_max(arr):
    max_val = arr[0]
    for num in arr:
        if num > max_val:
            max_val = num
    return max_val

def count_occurrences(arr, target):
    count = 0
    for num in arr:
        if num == target:
            count += 1
    return count
```

### O(n log n) - Linearithmic Time

**Efficient sorting algorithms.**

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])      # T(n/2)
    right = merge_sort(arr[mid:])     # T(n/2)
    
    return merge(left, right)         # O(n)

# Recurrence: T(n) = 2T(n/2) + O(n)
# Solution: O(n log n)
```

### O(n²) - Quadratic Time

**Nested loops over the data.**

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):           # n times
        for j in range(n-i-1):   # n times (average)
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

def find_pairs(arr):
    pairs = []
    for i in range(len(arr)):
        for j in range(len(arr)):
            pairs.append((arr[i], arr[j]))
    return pairs
```

### O(2ⁿ) - Exponential Time

**Recursive algorithms with two recursive calls.**

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Each call makes 2 more calls
# Tree depth: n
# Total calls: 2⁰ + 2¹ + 2² + ... + 2ⁿ ≈ 2ⁿ
```

### O(n!) - Factorial Time

**Generating all permutations.**

```python
def generate_permutations(arr):
    if len(arr) <= 1:
        return [arr]
    
    perms = []
    for i in range(len(arr)):
        rest = arr[:i] + arr[i+1:]
        for perm in generate_permutations(rest):
            perms.append([arr[i]] + perm)
    return perms

# n choices × (n-1) choices × ... × 1 choice = n!
```

---

## 📊 Complexity Comparison

### Growth Rates Table

For n = 1,000,000:

| Complexity | Operations | Practical? |
|------------|------------|------------|
| O(1) | 1 | ✅ Instant |
| O(log n) | ~20 | ✅ Instant |
| O(n) | 1,000,000 | ✅ Fast |
| O(n log n) | ~20,000,000 | ✅ Fast |
| O(n²) | 1,000,000,000,000 | ❌ Slow |
| O(2ⁿ) | 2^1000000 | ❌ Impossible |
| O(n!) | 1000000! | ❌ Impossible |

### Visual Comparison

```
Operations
    |                                          O(n!)
    |                                     O(2ⁿ)
    |                                O(n²)
    |                           O(n log n)
    |                      O(n)
    |              O(log n)
    |________O(1)_________________________ Input Size (n)
```

---

## 🏋️ Practice Problems

### Problem 1: Analyze This Code

```python
def mystery1(n):
    result = 0
    for i in range(n):
        result += i
    for i in range(n):
        for j in range(n):
            result += i * j
    return result
```

<details>
<summary>Solution</summary>

**Analysis:**
- First loop: O(n)
- Second loop: O(n²)
- Total: O(n) + O(n²) = O(n²)

**Answer: O(n²)**
</details>

### Problem 2: What's the Complexity?

```python
def mystery2(n):
    i = 1
    while i < n:
        print(i)
        i *= 2
```

<details>
<summary>Solution</summary>

**Analysis:**
- i doubles each iteration: 1, 2, 4, 8, 16, ...
- After k iterations: i = 2^k
- Loop stops when 2^k ≥ n
- So k = log₂(n)

**Answer: O(log n)**
</details>

### Problem 3: Multiple Inputs

```python
def mystery3(arr1, arr2):
    for item in arr1:
        print(item)
    
    for item1 in arr1:
        for item2 in arr2:
            print(item1, item2)
```

<details>
<summary>Solution</summary>

Let a = len(arr1), b = len(arr2)

**Analysis:**
- First loop: O(a)
- Second loop: O(a × b)
- Total: O(a + a×b) = O(a×b) [dominant term]

**Answer: O(a × b)**
</details>

### Problem 4: Recursive Function

```python
def mystery4(n):
    if n <= 1:
        return 1
    return mystery4(n-1) + mystery4(n-1)
```

<details>
<summary>Solution</summary>

**Analysis:**
- Each call makes 2 recursive calls
- Tree depth: n
- Total calls: 2ⁿ

**Answer: O(2ⁿ)**

*Note: This is similar to Fibonacci but even less efficient!*
</details>

---

## ✍️ Exercises

### Exercise 1: Simplify These

Simplify to proper Big-O notation:

1. O(5n + 100)
2. O(n² + 2n + 1)
3. O(3n³ + 2n² + n)
4. O(log n + n)
5. O(2ⁿ + n³)

<details>
<summary>Answers</summary>

1. O(n)
2. O(n²)
3. O(n³)
4. O(n)
5. O(2ⁿ)
</details>

### Exercise 2: Rank by Speed

Rank these from fastest to slowest:

- O(n!)
- O(1)
- O(n²)
- O(n log n)
- O(2ⁿ)
- O(log n)
- O(n)

<details>
<summary>Answer (Fastest to Slowest)</summary>

1. O(1)
2. O(log n)
3. O(n)
4. O(n log n)
5. O(n²)
6. O(2ⁿ)
7. O(n!)
</details>

### Exercise 3: True or False?

1. O(2n) = O(n) ✓ or ✗
2. O(n + log n) = O(n) ✓ or ✗
3. O(n²) is faster than O(n log n) ✓ or ✗
4. O(n) + O(n²) = O(n² + n) ✓ or ✗
5. Constants matter in Big-O ✓ or ✗

<details>
<summary>Answers</summary>

1. ✓ (Drop constants)
2. ✓ (Drop lower order terms)
3. ✗ (O(n log n) is faster)
4. ✓ (But simplifies to O(n²))
5. ✗ (Constants are dropped)
</details>

---

## 🎯 Key Takeaways

1. ✅ Big-O describes the **upper bound** of growth rate
2. ✅ Drop **constants** and **lower order terms**
3. ✅ Use **different variables** for different inputs
4. ✅ Common complexities: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ), O(n!)
5. ✅ Focus on **worst-case** behavior
6. ✅ Big-O is about **scalability**, not exact time

### Quick Reference Card

```
O(1)       < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)
Constant     Logarithmic  Linear  Linearithmic  Quadratic  Exponential  Factorial
```

---

## 🚀 What's Next?

Now you understand Big-O! Next, we'll explore other asymptotic notations:
- **Big-Omega (Ω)** - Lower bound
- **Big-Theta (Θ)** - Tight bound
- When to use each

---

[← Previous: Introduction](./01-Introduction-to-Complexity.md) | [Back to README](./README.md) | [Next: Other Notations →](./03-Other-Notations.md)
