# 01. Introduction to Complexity Analysis

## 🎯 What is Algorithm Complexity?

**Algorithm Complexity** is a way to measure how efficiently an algorithm performs as the size of the input increases. It helps us answer critical questions like:

- How fast will my code run with 1 million inputs?
- How much memory will my program need?
- Which of these two solutions is better?
- Will this algorithm work in a real-world scenario?

---

## 🤔 Why Do We Need Complexity Analysis?

### Real-World Example

Imagine you're building a social media app. You have two ways to search for a user:

**Algorithm A: Linear Search**
```python
def find_user_linear(users, target_id):
    for user in users:
        if user.id == target_id:
            return user
    return None
```

**Algorithm B: Binary Search (on sorted data)**
```python
def find_user_binary(users, target_id):
    left, right = 0, len(users) - 1
    while left <= right:
        mid = (left + right) // 2
        if users[mid].id == target_id:
            return users[mid]
        elif users[mid].id < target_id:
            left = mid + 1
        else:
            right = mid - 1
    return None
```

### Performance Comparison

| Users | Algorithm A (Linear) | Algorithm B (Binary) |
|-------|---------------------|---------------------|
| 100 | 50 checks (avg) | 7 checks (max) |
| 1,000 | 500 checks (avg) | 10 checks (max) |
| 1,000,000 | 500,000 checks (avg) | 20 checks (max) |
| 1,000,000,000 | 500,000,000 checks (avg) | 30 checks (max) |

**Without complexity analysis**, you might think both solutions are "fine" for 100 users. But as your app grows, Algorithm A becomes unusable!

---

## 📊 Types of Complexity

### 1. Time Complexity

**Time Complexity** measures how the number of operations grows as input size increases.

**Key Points:**
- We count **fundamental operations** (comparisons, arithmetic, assignments)
- We focus on **growth rate**, not exact time
- We care about **large inputs** (asymptotic behavior)

**Example:**
```python
# O(n) - Linear time
def sum_array(arr):
    total = 0           # 1 operation
    for num in arr:     # n iterations
        total += num    # 1 operation per iteration
    return total        # 1 operation
# Total: 1 + n + 1 = n + 2 operations
# We say this is O(n) - grows linearly with n
```

### 2. Space Complexity

**Space Complexity** measures how much memory an algorithm uses as input size increases.

**Key Points:**
- Includes both **auxiliary space** (extra memory) and **input space**
- Usually we analyze **auxiliary space** only
- Counts variables, arrays, stack space (recursion)

**Example:**
```python
# O(n) - Linear space
def create_squares(n):
    result = []           # Empty list
    for i in range(n):
        result.append(i*i)  # Add n elements
    return result
# Space used: n elements in result array → O(n)

# O(1) - Constant space
def sum_of_squares(n):
    total = 0             # One variable
    for i in range(n):
        total += i*i      # No extra space
    return total
# Space used: 1 variable (total) → O(1)
```

---

## ⏱️ Time Complexity vs Space Complexity

### Time-Space Tradeoff

Often, you can make an algorithm faster by using more memory, or use less memory by doing more computation.

**Example: Fibonacci Sequence**

**Approach 1: Recursive (Simple but slow)**
```python
def fib_recursive(n):
    if n <= 1:
        return n
    return fib_recursive(n-1) + fib_recursive(n-2)

# Time: O(2^n) - Exponential (VERY SLOW!)
# Space: O(n) - Recursion stack depth
```

**Approach 2: Iterative (Balanced)**
```python
def fib_iterative(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n+1):
        a, b = b, a + b
    return b

# Time: O(n) - Linear
# Space: O(1) - Only 2 variables
```

**Approach 3: Memoization (Fast but uses memory)**
```python
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]

# Time: O(n) - Each number calculated once
# Space: O(n) - Store all results
```

### When to Choose What?

| Scenario | Prioritize | Example |
|----------|-----------|---------|
| Limited RAM | Space | Embedded systems |
| Need speed | Time | Real-time systems |
| Balanced | Both | Most applications |

---

## 🎓 Key Concepts to Understand

### 1. Input Size (n)

The variable **n** represents the size of the input:
- For arrays: `n = length of array`
- For strings: `n = length of string`
- For numbers: `n = the number itself`
- For matrices: `n = rows × columns` (or sometimes separate m, n)

### 2. Asymptotic Analysis

We focus on behavior as **n → ∞** (n approaches infinity).

Why? Because:
- Small inputs run fast anyway
- Large inputs show true performance differences
- Real-world problems often have large inputs

**Example:**
```
Algorithm A: 5n + 100
Algorithm B: n² + 1

For n = 10:
A = 5(10) + 100 = 150
B = 10² + 1 = 101
(B is faster)

For n = 1000:
A = 5(1000) + 100 = 5,100
B = 1000² + 1 = 1,000,001
(A is MUCH faster)
```

### 3. Worst-Case Analysis (Most Common)

Unless stated otherwise, we usually analyze **worst-case** complexity:
- Gives an **upper bound** on performance
- **Guarantees** algorithm won't be slower
- More useful than average-case in practice

---

## 🧮 Simple Example Walkthrough

Let's analyze this function step by step:

```python
def find_max(arr):
    if len(arr) == 0:          # Line 1
        return None            # Line 2
    
    max_val = arr[0]           # Line 3
    
    for i in range(1, len(arr)):  # Line 4
        if arr[i] > max_val:      # Line 5
            max_val = arr[i]      # Line 6
    
    return max_val             # Line 7
```

**Step-by-Step Analysis:**

1. **Line 1**: Check length → 1 operation
2. **Line 2**: Might return → 1 operation (but only if empty)
3. **Line 3**: Assignment → 1 operation
4. **Line 4-6**: Loop runs (n-1) times:
   - Comparison: 1 operation per iteration
   - Possible assignment: 1 operation (sometimes)
5. **Line 7**: Return → 1 operation

**Total Operations:**
- Best case: 1 (empty array)
- Worst case: 1 + 1 + (n-1) + 1 = n + 2

**Complexity:** O(n) - Linear time

---

## 📝 Quick Self-Check Questions

Before moving on, answer these:

1. **What is the difference between time and space complexity?**
   <details>
   <summary>Answer</summary>
   Time complexity measures how long an algorithm takes to run (number of operations). Space complexity measures how much memory it uses.
   </details>

2. **Why do we focus on large inputs?**
   <details>
   <summary>Answer</summary>
   Small inputs run fast anyway. Large inputs reveal the true scaling behavior and performance differences between algorithms.
   </details>

3. **What does "asymptotic" mean?**
   <details>
   <summary>Answer</summary>
   It means we're interested in the behavior as input size approaches infinity (n → ∞).
   </details>

4. **Which is faster for large n: 100n or n²?**
   <details>
   <summary>Answer</summary>
   100n is faster. For n=1000: 100n = 100,000 but n² = 1,000,000
   </details>

---

## 🏋️ Practice Exercises

### Exercise 1: Identify What We're Counting

For each function, identify what 'n' represents:

```python
# A
def print_array(arr):
    for item in arr:
        print(item)

# B
def print_number(num):
    for i in range(num):
        print(i)

# C
def print_matrix(matrix):
    for row in matrix:
        for item in row:
            print(item)
```

<details>
<summary>Solutions</summary>

- **A**: n = length of arr
- **B**: n = the number itself (num)
- **C**: n could be total elements, or we might use m×n for rows×columns
</details>

### Exercise 2: Count Operations

Count the exact number of operations for n=5:

```python
def mystery(n):
    count = 0
    for i in range(n):
        count += 1
    return count
```

<details>
<summary>Solution</summary>

- Initialize count: 1 operation
- Loop runs 5 times:
  - Increment count: 1 operation × 5 = 5 operations
- Return: 1 operation
- **Total: 7 operations**
</details>

### Exercise 3: Time vs Space

For this code, does it use more **time** or **space** as n grows?

```python
def generate_squares(n):
    result = []
    for i in range(n):
        result.append(i * i)
    return result
```

<details>
<summary>Solution</summary>

Both! 
- **Time**: O(n) - loop runs n times
- **Space**: O(n) - array stores n elements
</details>

---

## 🎯 Key Takeaways

1. ✅ **Complexity analysis** helps us predict algorithm performance
2. ✅ **Time complexity** = how long it takes
3. ✅ **Space complexity** = how much memory it uses
4. ✅ We focus on **large inputs** (asymptotic behavior)
5. ✅ **Worst-case** analysis is most common
6. ✅ There's often a **tradeoff** between time and space

---

## 🚀 What's Next?

Now that you understand **what** complexity is and **why** it matters, we'll learn **how** to express it formally using **Big-O Notation**.

---

[← Back to README](./README.md) | [Next: Big-O Notation →](./02-Big-O-Notation.md)
