# 04. Logarithms & Exponents

## 🎯 Learning Objectives

By the end of this module, you will:
- Understand logarithms and their properties
- Apply logarithms in algorithm analysis
- Perform binary exponentiation efficiently
- Compare growth rates of functions
- Recognize logarithmic patterns in algorithms

**Duration:** 1 day (3-4 hours)  
**Difficulty:** Beginner to Intermediate

---

## 📚 Table of Contents

1. [Exponents Basics](#1-exponents-basics)
2. [Logarithms Fundamentals](#2-logarithms-fundamentals)
3. [Logarithm Properties](#3-logarithm-properties)
4. [Binary Exponentiation](#4-binary-exponentiation)
5. [Applications in DSA](#5-applications-in-dsa)
6. [Growth Rate Comparison](#6-growth-rate-comparison)
7. [Practice Problems](#7-practice-problems)

---

## 1. Exponents Basics

### What are Exponents?

**Definition:** `a^n` means multiplying `a` by itself `n` times.

```
2^5 = 2 × 2 × 2 × 2 × 2 = 32
```

### Laws of Exponents

1. **Product Rule:**
   ```
   a^m × a^n = a^(m+n)
   Example: 2^3 × 2^4 = 2^7 = 128
   ```

2. **Quotient Rule:**
   ```
   a^m / a^n = a^(m-n)
   Example: 2^5 / 2^2 = 2^3 = 8
   ```

3. **Power Rule:**
   ```
   (a^m)^n = a^(m×n)
   Example: (2^3)^2 = 2^6 = 64
   ```

4. **Product to Power:**
   ```
   (ab)^n = a^n × b^n
   Example: (2×3)^3 = 2^3 × 3^3 = 8 × 27 = 216
   ```

5. **Zero Exponent:**
   ```
   a^0 = 1  (for a ≠ 0)
   ```

6. **Negative Exponent:**
   ```
   a^(-n) = 1 / a^n
   Example: 2^(-3) = 1/8
   ```

7. **Fractional Exponent:**
   ```
   a^(1/n) = nth root of a
   a^(m/n) = (nth root of a)^m
   Example: 8^(1/3) = ∛8 = 2
   ```

### Common Powers to Memorize

```
Powers of 2:
2^0 = 1
2^1 = 2
2^2 = 4
2^3 = 8
2^4 = 16
2^5 = 32
2^6 = 64
2^7 = 128
2^8 = 256
2^9 = 512
2^10 = 1,024 ≈ 10^3
2^16 = 65,536
2^20 ≈ 10^6 (million)
2^30 ≈ 10^9 (billion)
```

---

## 2. Logarithms Fundamentals

### What is a Logarithm?

**Definition:** If `a^x = y`, then `log_a(y) = x`

The logarithm is the **inverse** of exponentiation.

**Example:**
```
2^3 = 8   →   log₂(8) = 3
10^2 = 100 →   log₁₀(100) = 2
```

### Common Logarithms in CS

1. **Binary Logarithm (log₂):**
   - Base 2
   - Most common in computer science
   - Often written as just "log" in CS context

2. **Common Logarithm (log₁₀):**
   - Base 10
   - Used in scientific notation

3. **Natural Logarithm (ln):**
   - Base e (≈ 2.718)
   - Used in calculus and continuous growth

**Notation:**
```
log₂(x)  - Binary logarithm (base 2)
log₁₀(x) - Common logarithm (base 10)
ln(x)    - Natural logarithm (base e)
lg(x)    - Sometimes used for log₂(x)
```

### Intuitive Understanding

**Question:** log₂(n) = ?

**Answer:** "How many times do I divide n by 2 until I reach 1?"

**Examples:**
```
log₂(8) = 3    (8 → 4 → 2 → 1: 3 divisions)
log₂(16) = 4   (16 → 8 → 4 → 2 → 1: 4 divisions)
log₂(1024) = 10
```

**Visual:**
```
n = 32
32 / 2 = 16  (step 1)
16 / 2 = 8   (step 2)
8 / 2 = 4    (step 3)
4 / 2 = 2    (step 4)
2 / 2 = 1    (step 5)

Therefore, log₂(32) = 5
```

---

## 3. Logarithm Properties

### Essential Properties

1. **Product Rule:**
   ```
   log_a(xy) = log_a(x) + log_a(y)
   
   Example:
   log₂(8 × 4) = log₂(8) + log₂(4)
               = 3 + 2 = 5
   Verify: 8 × 4 = 32, log₂(32) = 5 ✓
   ```

2. **Quotient Rule:**
   ```
   log_a(x/y) = log_a(x) - log_a(y)
   
   Example:
   log₂(16/4) = log₂(16) - log₂(4)
              = 4 - 2 = 2
   Verify: 16/4 = 4, log₂(4) = 2 ✓
   ```

3. **Power Rule:**
   ```
   log_a(x^n) = n × log_a(x)
   
   Example:
   log₂(8^2) = 2 × log₂(8) = 2 × 3 = 6
   Verify: 8^2 = 64, log₂(64) = 6 ✓
   ```

4. **Change of Base:**
   ```
   log_a(x) = log_b(x) / log_b(a)
   
   Example:
   log₂(8) = log₁₀(8) / log₁₀(2)
           = 0.903 / 0.301 ≈ 3
   ```

5. **Special Values:**
   ```
   log_a(1) = 0    (because a^0 = 1)
   log_a(a) = 1    (because a^1 = a)
   log_a(a^n) = n
   ```

### Important Identities

```
a^(log_a(x)) = x
log_a(a^x) = x
log_a(1/x) = -log_a(x)
log_a(√x) = (1/2) × log_a(x)
```

### Code Implementation

**Python:**
```python
import math

def log2(x):
    """Binary logarithm (base 2)"""
    return math.log2(x)

def log10(x):
    """Common logarithm (base 10)"""
    return math.log10(x)

def ln(x):
    """Natural logarithm (base e)"""
    return math.log(x)

def log_base(x, base):
    """Logarithm with any base"""
    return math.log(x) / math.log(base)

def inverse_log(result, base):
    """Find x where log_base(x) = result"""
    return base ** result

# Examples
print(f"log₂(8) = {log2(8)}")           # 3.0
print(f"log₁₀(100) = {log10(100)}")     # 2.0
print(f"ln(e) = {ln(math.e)}")          # 1.0
print(f"log₅(125) = {log_base(125, 5)}")# 3.0
print(f"2^10 = {inverse_log(10, 2)}")   # 1024.0

# Verify properties
x, y = 8, 4
print(f"\nProduct rule: log₂({x}×{y}) = log₂({x}) + log₂({y})")
print(f"{log2(x*y)} = {log2(x) + log2(y)}")

print(f"\nPower rule: log₂({x}²) = 2 × log₂({x})")
print(f"{log2(x**2)} = {2 * log2(x)}")
```

---

## 4. Binary Exponentiation

### Naive Exponentiation

**Problem:** Calculate `a^n`

**Naive Approach:**
```python
def power_naive(a, n):
    result = 1
    for i in range(n):
        result *= a
    return result
```

**Time Complexity:** O(n)  
**Problem:** Very slow for large n (e.g., 2^1000)

### Binary Exponentiation (Fast Power)

**Key Idea:** Use the property `a^n = (a^(n/2))^2`

**Algorithm:**
```
power(a, n):
    if n == 0:
        return 1
    if n is even:
        half = power(a, n/2)
        return half × half
    else:
        return a × power(a, n-1)
```

**Time Complexity:** O(log n)

**Example: Calculate 2^10**
```
2^10 = (2^5)^2
2^5 = 2 × (2^4)
2^4 = (2^2)^2  
2^2 = (2^1)^2
2^1 = 2 × 2^0 = 2

Working backwards:
2^1 = 2
2^2 = 4
2^4 = 16
2^5 = 2 × 16 = 32
2^10 = 32 × 32 = 1024
```

**Iterative Implementation:**
```python
def power(a, n):
    """Binary exponentiation - iterative"""
    result = 1
    base = a
    
    while n > 0:
        # If n is odd, multiply result by current base
        if n % 2 == 1:
            result *= base
        
        # Square the base and halve n
        base *= base
        n //= 2
    
    return result

# Examples
print(power(2, 10))   # 1024
print(power(3, 5))    # 243
print(power(2, 100))  # Very large number
```

**Recursive Implementation:**
```python
def power_recursive(a, n):
    """Binary exponentiation - recursive"""
    if n == 0:
        return 1
    if n == 1:
        return a
    
    half = power_recursive(a, n // 2)
    result = half * half
    
    if n % 2 == 1:
        result *= a
    
    return result
```

**With Modulo (prevent overflow):**
```python
def power_mod(a, n, mod):
    """Binary exponentiation with modulo"""
    result = 1
    base = a % mod
    
    while n > 0:
        if n % 2 == 1:
            result = (result * base) % mod
        base = (base * base) % mod
        n //= 2
    
    return result

# Example: Calculate 2^1000 mod (10^9 + 7)
MOD = 10**9 + 7
print(power_mod(2, 1000, MOD))  # 140625001
```

**C++ Implementation:**
```cpp
long long power(long long a, long long n) {
    long long result = 1;
    long long base = a;
    
    while (n > 0) {
        if (n % 2 == 1) {
            result *= base;
        }
        base *= base;
        n /= 2;
    }
    return result;
}

// With modulo
long long powerMod(long long a, long long n, long long mod) {
    long long result = 1;
    long long base = a % mod;
    
    while (n > 0) {
        if (n % 2 == 1) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        n /= 2;
    }
    return result;
}
```

---

## 5. Applications in DSA

### Binary Search Complexity

**Analysis:** Why is binary search O(log n)?

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

**Explanation:**
- Each iteration cuts the search space in half
- If n = 1024, iterations needed:
  - 1024 → 512 → 256 → 128 → 64 → 32 → 16 → 8 → 4 → 2 → 1
  - That's 10 steps = log₂(1024)

### Tree Heights

**Complete Binary Tree:**
- n nodes → height = log₂(n)
- Height h → at most 2^h - 1 nodes

**Example:**
```
Height 0:     (1)          1 node
Height 1:    /   \         3 nodes total
           (2)   (3)
Height 2:  / \ / \         7 nodes total
          4  5 6  7

Height = 2, Nodes = 7 = 2^3 - 1
For n = 7, height = log₂(7) ≈ 2.8 → ⌊2.8⌋ = 2
```

### Divide and Conquer

**Merge Sort Complexity:**
```
T(n) = 2T(n/2) + O(n)

Solving:
Level 0: n               (1 problem of size n)
Level 1: n/2 + n/2       (2 problems of size n/2)
Level 2: n/4+n/4+n/4+n/4 (4 problems of size n/4)
...
Level k: 2^k problems of size n/2^k

Last level when n/2^k = 1:
2^k = n
k = log₂(n)

Total work per level = n
Total levels = log₂(n)
Therefore, T(n) = O(n log n)
```

### Bit Operations

**Number of Bits in n:**
```python
def count_bits(n):
    """Number of bits needed to represent n"""
    if n == 0:
        return 1
    return math.floor(math.log2(n)) + 1

# Examples
print(count_bits(7))    # 3  (111 in binary)
print(count_bits(8))    # 4  (1000 in binary)
print(count_bits(255))  # 8  (11111111 in binary)
```

---

## 6. Growth Rate Comparison

### Common Complexity Classes (Fastest to Slowest)

```
O(1)          < O(log log n) < O(log n)     < O(√n)      
< O(n)        < O(n log n)   < O(n²)        < O(n³)      
< O(2^n)      < O(n!)        < O(n^n)
```

### Concrete Examples (n = 1,000,000)

| Complexity | Operations | Time (1 GHz CPU) |
|------------|-----------|------------------|
| O(1) | 1 | 0.000001 ms |
| O(log n) | 20 | 0.00002 ms |
| O(√n) | 1,000 | 0.001 ms |
| O(n) | 1,000,000 | 1 ms |
| O(n log n) | 20,000,000 | 20 ms |
| O(n²) | 10¹² | 11.5 days |
| O(2^n) | (can't compute) | (universe lifetime) |

### Visual Comparison

**Growth Rates Graph:**
```
n     log₂(n)  n    n log₂(n)   n²        2^n
1     0        1    0           1         2
2     1        2    2           4         4
4     2        4    8           16        16
8     3        8    24          64        256
16    4        16   64          256       65,536
32    5        32   160         1,024     4,294,967,296
```

**Key Insights:**
- Logarithmic growth is VERY slow
- Exponential growth is VERY fast
- log n ≈ constant for practical n
- 2^n becomes impossible quickly

### When to Use What?

```
O(log n):     Binary search, balanced trees
O(n):         Linear scan, counting
O(n log n):   Efficient sorting (merge, heap, quick)
O(n²):        Nested loops, bubble sort
O(2^n):       Brute force subsets, backtracking
```

### Code to Compare Growth

**Python:**
```python
import math

def compare_growth(n):
    """Compare different growth rates"""
    results = {
        "O(1)": 1,
        "O(log n)": math.log2(n),
        "O(√n)": math.sqrt(n),
        "O(n)": n,
        "O(n log n)": n * math.log2(n),
        "O(n²)": n ** 2,
        "O(n³)": n ** 3,
        "O(2^n)": 2 ** min(n, 30),  # Limit to prevent overflow
    }
    
    print(f"Growth comparison for n = {n:,}:\n")
    for complexity, ops in results.items():
        if ops < 1000:
            print(f"{complexity:12} = {ops:,.2f}")
        elif ops < 1_000_000:
            print(f"{complexity:12} = {ops:,.0f}")
        elif ops < 1_000_000_000:
            print(f"{complexity:12} = {ops/1_000_000:,.2f} million")
        else:
            print(f"{complexity:12} = {ops/1_000_000_000:,.2f} billion")

# Compare for different n
compare_growth(10)
print("\n" + "="*50 + "\n")
compare_growth(1000)
print("\n" + "="*50 + "\n")
compare_growth(1_000_000)
```

---

## 7. Practice Problems

### Easy Problems

1. **Calculate:** 
   - a) 2^10
   - b) log₂(64)
   - c) log₁₀(1000)

2. **Simplify:** log₂(16) + log₂(4)

3. **Tree Height:** A complete binary tree has 127 nodes. What's its height?

4. **Binary Search:** How many iterations for binary search in array of size 1024?

5. **Powers of 2:** What's the largest power of 2 ≤ 1000?

### Medium Problems

6. **Implement:** Binary exponentiation for a^n

7. **Complexity Analysis:** What's the time complexity of this code?
   ```python
   for i in range(1, n, i*2):  # i: 1, 2, 4, 8, ...
       print(i)
   ```

8. **Logarithm Property:** Prove log_a(x^n) = n × log_a(x)

9. **Change of Base:** Convert log₂(100) to base 10

10. **Modular Exponentiation:** Calculate 3^100 mod 1000000007

### Hard Problems

11. **Master Theorem:** Solve T(n) = 4T(n/2) + O(n)

12. **Bit Count:** How many bits needed to represent numbers from 1 to 10^9?

13. **Fast Fibonacci:** Use matrix exponentiation to find Fibonacci(1000) mod 10^9+7

14. **Log Inequalities:** Prove that for all n ≥ 2: log(n!) < n log(n)

15. **Complexity Proof:** Prove that log(n!) = Θ(n log n) using Stirling's approximation

---

## 🎯 Key Takeaways

1. **Logarithms** are the inverse of exponentiation
2. **log₂(n)** represents "how many times to divide n by 2"
3. **Binary exponentiation** reduces O(n) to O(log n)
4. **Logarithmic complexity** is nearly as good as constant time
5. **n log n** is the best comparison-based sorting can achieve
6. **Growth rates** differ dramatically for large n

---

## 📚 Quick Reference

```python
# Logarithm Properties
log(xy) = log(x) + log(y)
log(x/y) = log(x) - log(y)
log(x^n) = n × log(x)
log_a(x) = log_b(x) / log_b(a)

# Common Values
log₂(1) = 0
log₂(2) = 1
log₂(1024) = 10
log₂(1,000,000) ≈ 20

# Binary Exponentiation
Time: O(log n)
Space: O(1) iterative, O(log n) recursive

# Complexity Comparison
log n << n << n log n << n² << 2^n << n!
```

---

*[← Previous: Number Theory](./03-Number-Theory.md) | [Back to Chapter 2](./README.md) | [Next: Modular Arithmetic →](./05-Modular-Arithmetic.md)*
