# 05. Modular Arithmetic

## 🎯 Learning Objectives

By the end of this module, you will:
- Master modular arithmetic operations
- Calculate modular inverse efficiently
- Apply Fermat's Little Theorem and Euler's Theorem
- Use modular arithmetic to prevent integer overflow
- Solve congruence equations
- Apply modular arithmetic in cryptography and hashing

**Duration:** 1 day (4-5 hours)  
**Difficulty:** Intermediate

---

## 📚 Table of Contents

1. [Modulo Operation Fundamentals](#1-modulo-operation-fundamentals)
2. [Modular Arithmetic Properties](#2-modular-arithmetic-properties)
3. [Modular Inverse](#3-modular-inverse)
4. [Fermat's Little Theorem](#4-fermats-little-theorem)
5. [Euler's Theorem](#5-eulers-theorem)
6. [Applications in Programming](#6-applications-in-programming)
7. [Practice Problems](#7-practice-problems)

---

## 1. Modulo Operation Fundamentals

### Definition

**Modulo Operation:** `a mod m` gives the remainder when `a` is divided by `m`.

```
17 mod 5 = 2    (because 17 = 5×3 + 2)
20 mod 7 = 6    (because 20 = 7×2 + 6)
```

### Congruence Notation

**Notation:** `a ≡ b (mod m)`

**Meaning:** `a` and `b` have the same remainder when divided by `m`.

**Examples:**
```
17 ≡ 2 (mod 5)    (both give remainder 2)
23 ≡ 8 (mod 5)    (both give remainder 3)
100 ≡ 0 (mod 10)  (both give remainder 0)
```

### Modulo with Negative Numbers

**Different implementations:**
```python
# Python uses floored division
print(-7 % 3)    # Output: 2 (not -1)
# -7 = 3×(-3) + 2

# C/C++/Java use truncated division
# -7 % 3 = -1
# -7 = 3×(-2) + (-1)
```

**To get positive remainder always:**
```python
def mod_positive(a, m):
    """Always return positive remainder"""
    return ((a % m) + m) % m

print(mod_positive(-7, 3))  # 2
print(mod_positive(7, 3))   # 1
```

### Equivalence Classes

**Modulo m partitions integers into m equivalence classes:**

**Example: mod 3**
```
Class 0: ..., -6, -3, 0, 3, 6, 9, ...    (divisible by 3)
Class 1: ..., -5, -2, 1, 4, 7, 10, ...   (remainder 1)
Class 2: ..., -4, -1, 2, 5, 8, 11, ...   (remainder 2)
```

---

## 2. Modular Arithmetic Properties

### Basic Properties

1. **Addition:**
   ```
   (a + b) mod m = ((a mod m) + (b mod m)) mod m
   
   Example:
   (23 + 17) mod 5 = ((23 mod 5) + (17 mod 5)) mod 5
                    = (3 + 2) mod 5
                    = 5 mod 5 = 0
   Verify: 40 mod 5 = 0 ✓
   ```

2. **Subtraction:**
   ```
   (a - b) mod m = ((a mod m) - (b mod m) + m) mod m
   
   Note the "+ m" to handle negative results!
   
   Example:
   (7 - 10) mod 5 = ((7 mod 5) - (10 mod 5) + 5) mod 5
                   = (2 - 0 + 5) mod 5
                   = 7 mod 5 = 2
   Verify: -3 mod 5 = 2 ✓
   ```

3. **Multiplication:**
   ```
   (a × b) mod m = ((a mod m) × (b mod m)) mod m
   
   Example:
   (23 × 17) mod 5 = ((23 mod 5) × (17 mod 5)) mod 5
                    = (3 × 2) mod 5
                    = 6 mod 5 = 1
   Verify: 391 mod 5 = 1 ✓
   ```

4. **Exponentiation:**
   ```
   (a^b) mod m = ((a mod m)^b) mod m
   
   Use modular exponentiation for large b!
   ```

### Why These Properties Matter

**Problem:** Calculate (123456789 × 987654321) mod 1000000007

**Wrong (overflow):**
```python
result = (123456789 * 987654321) % 1000000007
# 123456789 * 987654321 = 121,932,631,112,635,269 (overflow!)
```

**Correct:**
```python
MOD = 1000000007
a = 123456789 % MOD
b = 987654321 % MOD
result = (a * b) % MOD
print(result)  # 932473528
```

### Distributive Property

```
(a + b) mod m = ((a mod m) + (b mod m)) mod m
(a × b) mod m = ((a mod m) × (b mod m)) mod m
```

**But DIVISION is different!**
```
(a / b) mod m ≠ ((a mod m) / (b mod m)) mod m

Instead, use modular inverse:
(a / b) mod m = (a × b^(-1)) mod m
```

### Code Implementation

**Python:**
```python
def mod_add(a, b, m):
    """Modular addition"""
    return ((a % m) + (b % m)) % m

def mod_sub(a, b, m):
    """Modular subtraction"""
    return ((a % m) - (b % m) + m) % m

def mod_mul(a, b, m):
    """Modular multiplication"""
    return ((a % m) * (b % m)) % m

def mod_pow(base, exp, m):
    """Modular exponentiation (binary exponentiation)"""
    result = 1
    base = base % m
    
    while exp > 0:
        if exp % 2 == 1:
            result = (result * base) % m
        exp = exp >> 1
        base = (base * base) % m
    
    return result

# Examples
MOD = 10**9 + 7

print(f"(10^9 + 10^8) mod {MOD} = {mod_add(10**9, 10**8, MOD)}")
print(f"(10^9 × 10^8) mod {MOD} = {mod_mul(10**9, 10**8, MOD)}")
print(f"2^1000 mod {MOD} = {mod_pow(2, 1000, MOD)}")
```

---

## 3. Modular Inverse

### What is Modular Inverse?

**Definition:** The modular inverse of `a` modulo `m` is a number `x` such that:
```
(a × x) ≡ 1 (mod m)
```

**Notation:** `a^(-1) mod m` or `inv(a, m)`

**Example:**
```
Find inverse of 3 mod 11

Try x = 1, 2, 3, ..., 10:
3 × 4 = 12 ≡ 1 (mod 11) ✓

Therefore: 3^(-1) ≡ 4 (mod 11)
```

### When Does Inverse Exist?

**Theorem:** `a^(-1) mod m` exists **if and only if** `gcd(a, m) = 1` (a and m are coprime).

**Examples:**
```
6^(-1) mod 10:  Does NOT exist (gcd(6, 10) = 2)
3^(-1) mod 7:   Exists (gcd(3, 7) = 1)
2^(-1) mod 5:   Exists (gcd(2, 5) = 1)
```

### Method 1: Extended Euclidean Algorithm

**Most general method** - works for any coprime a and m.

```python
def extended_gcd(a, b):
    """
    Returns (gcd, x, y) such that ax + by = gcd(a, b)
    """
    if b == 0:
        return (a, 1, 0)
    
    gcd, x1, y1 = extended_gcd(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    
    return (gcd, x, y)

def mod_inverse(a, m):
    """
    Calculate modular inverse of a mod m
    Returns None if inverse doesn't exist
    """
    gcd, x, y = extended_gcd(a, m)
    
    if gcd != 1:
        return None  # Inverse doesn't exist
    
    # Make sure result is positive
    return (x % m + m) % m

# Examples
print(f"3^(-1) mod 11 = {mod_inverse(3, 11)}")  # 4
print(f"2^(-1) mod 7 = {mod_inverse(2, 7)}")    # 4
print(f"6^(-1) mod 10 = {mod_inverse(6, 10)}")  # None
```

### Method 2: Fermat's Little Theorem (Prime Modulus)

**When m is prime:**
```
a^(-1) ≡ a^(m-2) (mod m)
```

**Proof:** By Fermat's Little Theorem, `a^(m-1) ≡ 1 (mod m)`, so `a × a^(m-2) ≡ 1 (mod m)`.

```python
def mod_inverse_fermat(a, m):
    """
    Calculate modular inverse using Fermat's Little Theorem
    Only works when m is prime!
    """
    # a^(-1) = a^(m-2) mod m
    return pow(a, m - 2, m)

# Example with prime modulus
MOD = 10**9 + 7  # Prime number
print(f"3^(-1) mod {MOD} = {mod_inverse_fermat(3, MOD)}")  # 333333336
```

**Verification:**
```python
MOD = 10**9 + 7
inv = mod_inverse_fermat(3, MOD)
print(f"3 × {inv} mod {MOD} = {(3 * inv) % MOD}")  # 1 ✓
```

### Modular Division

**Problem:** Calculate `(a / b) mod m`

**Solution:**
```
(a / b) mod m = (a × b^(-1)) mod m
```

**Code:**
```python
def mod_div(a, b, m):
    """
    Calculate (a / b) mod m
    Requires gcd(b, m) = 1
    """
    inv_b = mod_inverse(b, m)
    if inv_b is None:
        return None  # Division not possible
    return (a * inv_b) % m

# Example: (10 / 2) mod 7
print(mod_div(10, 2, 7))  # 5

# Example: (15 / 3) mod 11
print(mod_div(15, 3, 11))  # 5

# Verify: (15 / 3) = 5, 5 mod 11 = 5 ✓
```

---

## 4. Fermat's Little Theorem

### Theorem Statement

**If p is prime and gcd(a, p) = 1, then:**
```
a^(p-1) ≡ 1 (mod p)
```

**Corollary:**
```
a^p ≡ a (mod p)  for all integers a
```

### Examples

```
Example 1: 2^6 mod 7
p = 7 (prime), a = 2
2^(7-1) = 2^6 ≡ 1 (mod 7)
Verify: 2^6 = 64, 64 mod 7 = 1 ✓

Example 2: 3^10 mod 11
p = 11 (prime), a = 3
3^(11-1) = 3^10 ≡ 1 (mod 11)
Verify: 3^10 = 59,049, 59049 mod 11 = 1 ✓
```

### Applications

#### 1. Fast Modular Inverse
```python
def mod_inverse_prime(a, p):
    """Inverse of a mod p (p must be prime)"""
    return pow(a, p - 2, p)
```

#### 2. Reduce Large Exponents
```python
def reduce_exponent(base, exp, p):
    """
    Calculate base^exp mod p efficiently
    Uses: a^exp ≡ a^(exp mod (p-1)) (mod p)
    """
    if base % p == 0:
        return 0
    exp = exp % (p - 1)
    return pow(base, exp, p)

# Example: 2^1000000 mod 7
# Instead of 2^1000000, compute 2^(1000000 mod 6) mod 7
p = 7
exp = 1000000 % (p - 1)  # 1000000 % 6 = 4
result = pow(2, exp, p)
print(result)  # 2^4 mod 7 = 16 mod 7 = 2
```

#### 3. Primality Testing (Probabilistic)
```python
import random

def fermat_test(n, k=5):
    """
    Fermat primality test (probabilistic)
    k: number of trials
    """
    if n < 2:
        return False
    if n == 2 or n == 3:
        return True
    if n % 2 == 0:
        return False
    
    for _ in range(k):
        a = random.randint(2, n - 1)
        if pow(a, n - 1, n) != 1:
            return False  # Definitely composite
    
    return True  # Probably prime

# Test some numbers
for num in [17, 19, 21, 97, 100]:
    print(f"{num} is {'probably prime' if fermat_test(num) else 'composite'}")
```

---

## 5. Euler's Theorem

### Euler's Totient Function φ(n)

**Definition:** φ(n) = count of integers in [1, n] that are coprime with n.

**Examples:**
```
φ(1) = 1    {1}
φ(5) = 4    {1, 2, 3, 4}        (5 is prime)
φ(6) = 2    {1, 5}              (gcd with 2,3,4,6 > 1)
φ(9) = 6    {1, 2, 4, 5, 7, 8}
φ(10) = 4   {1, 3, 7, 9}
```

### Calculating φ(n)

#### For Prime p:
```
φ(p) = p - 1
```

#### For Prime Power p^k:
```
φ(p^k) = p^k - p^(k-1) = p^(k-1) × (p - 1)

Example: φ(9) = φ(3^2) = 3^2 - 3^1 = 6
```

#### For Product of Coprimes:
```
If gcd(m, n) = 1, then φ(m×n) = φ(m) × φ(n)

Example: φ(6) = φ(2×3) = φ(2) × φ(3) = 1 × 2 = 2
```

#### General Formula (Prime Factorization):
```
If n = p1^k1 × p2^k2 × ... × pm^km, then:
φ(n) = n × (1 - 1/p1) × (1 - 1/p2) × ... × (1 - 1/pm)

Example: φ(12) = φ(2^2 × 3)
       = 12 × (1 - 1/2) × (1 - 1/3)
       = 12 × 1/2 × 2/3
       = 4
```

### Code Implementation

```python
def euler_totient(n):
    """Calculate φ(n) using prime factorization"""
    result = n
    p = 2
    
    while p * p <= n:
        if n % p == 0:
            # Remove all factors of p
            while n % p == 0:
                n //= p
            # Multiply result by (1 - 1/p)
            result -= result // p
        p += 1
    
    # If n > 1, then it's a prime factor
    if n > 1:
        result -= result // n
    
    return result

# Examples
for n in [1, 5, 6, 9, 10, 12, 100]:
    print(f"φ({n}) = {euler_totient(n)}")
```

### Euler's Theorem

**If gcd(a, n) = 1, then:**
```
a^φ(n) ≡ 1 (mod n)
```

**Note:** Fermat's Little Theorem is a special case when n = p (prime):
```
φ(p) = p - 1, so a^(p-1) ≡ 1 (mod p)
```

**Examples:**
```
Example 1: 2^φ(9) mod 9
φ(9) = 6
2^6 = 64 ≡ 1 (mod 9)  ✓

Example 2: 3^φ(10) mod 10
φ(10) = 4
3^4 = 81 ≡ 1 (mod 10)  ✓
```

### Applications

#### Reduce Exponents (General Modulus)
```python
def reduce_exp_general(base, exp, mod):
    """
    Calculate base^exp mod mod
    Uses Euler's theorem to reduce exponent
    """
    if base % mod == 0:
        return 0
    
    phi = euler_totient(mod)
    exp = exp % phi
    return pow(base, exp, mod)

# Example: 3^1000000 mod 10
# φ(10) = 4
# 3^1000000 ≡ 3^(1000000 mod 4) ≡ 3^0 ≡ 1 (mod 10)
print(reduce_exp_general(3, 1000000, 10))  # 1
```

---

## 6. Applications in Programming

### 1. Preventing Integer Overflow

```python
def factorial_mod(n, mod):
    """Calculate n! mod mod without overflow"""
    result = 1
    for i in range(1, n + 1):
        result = (result * i) % mod
    return result

# Example
MOD = 10**9 + 7
print(f"100! mod {MOD} = {factorial_mod(100, MOD)}")
```

### 2. Computing Binomial Coefficients

```python
def binomial_mod(n, r, mod):
    """
    Calculate C(n, r) mod mod
    Uses: C(n,r) = n! / (r! × (n-r)!)
    """
    if r > n or r < 0:
        return 0
    if r == 0 or r == n:
        return 1
    
    # Calculate factorials
    num = 1
    for i in range(n, n - r, -1):
        num = (num * i) % mod
    
    den = 1
    for i in range(1, r + 1):
        den = (den * i) % mod
    
    # num / den = num × den^(-1)
    return (num * pow(den, mod - 2, mod)) % mod

# Example: C(10, 3) mod (10^9 + 7)
MOD = 10**9 + 7
print(binomial_mod(10, 3, MOD))  # 120
```

### 3. Hashing with Modulo

```python
def polynomial_hash(s, base=31, mod=10**9 + 9):
    """
    Polynomial rolling hash
    hash(s) = s[0]×base^(n-1) + s[1]×base^(n-2) + ... + s[n-1]×base^0
    """
    hash_value = 0
    for char in s:
        hash_value = (hash_value * base + ord(char)) % mod
    return hash_value

# Example
print(polynomial_hash("hello"))  # Hash value
print(polynomial_hash("world"))  # Different hash
```

### 4. Checking Divisibility Rules

```python
def divisible_by_3(n):
    """Check if n is divisible by 3 using digit sum"""
    digit_sum = sum(int(d) for d in str(n))
    return digit_sum % 3 == 0

def divisible_by_11(n):
    """Check if n is divisible by 11 using alternating sum"""
    alt_sum = 0
    for i, d in enumerate(str(n)[::-1]):
        alt_sum += int(d) * ((-1) ** i)
    return alt_sum % 11 == 0

# Examples
print(divisible_by_3(12345))  # True (1+2+3+4+5=15, 15%3=0)
print(divisible_by_11(1331))  # True (1-3+3-1=0, 0%11=0)
```

### 5. Cyclic Rotations

```python
def rotate_array(arr, k):
    """Rotate array k positions to the right"""
    n = len(arr)
    k = k % n  # Handle k > n
    return arr[-k:] + arr[:-k]

# Example
arr = [1, 2, 3, 4, 5]
print(rotate_array(arr, 2))   # [4, 5, 1, 2, 3]
print(rotate_array(arr, 7))   # [4, 5, 1, 2, 3] (same as k=2)
```

---

## 7. Practice Problems

### Easy Problems

1. **Calculate:** (23 + 17) mod 5

2. **Modular Multiplication:** (123 × 456) mod 1000

3. **Modular Inverse:** Find 7^(-1) mod 11

4. **Divisibility:** Is 123456 divisible by 9? (Use digit sum)

5. **Totient:** Calculate φ(20)

### Medium Problems

6. **Fast Exponentiation:** Calculate 2^100 mod (10^9 + 7)

7. **Modular Division:** Compute (100 / 25) mod 13

8. **Fermat Test:** Verify Fermat's Little Theorem for a=5, p=11

9. **Large Factorial:** Find 50! mod 1000000007

10. **Binomial Mod:** Calculate C(1000, 500) mod 1000000007

### Hard Problems

11. **Chinese Remainder Theorem:** Solve:
    ```
    x ≡ 2 (mod 3)
    x ≡ 3 (mod 5)
    x ≡ 2 (mod 7)
    ```

12. **Discrete Logarithm:** Find x where 2^x ≡ 5 (mod 11)

13. **RSA Encryption:** Implement basic RSA encryption/decryption

14. **Wilson's Theorem:** Prove (p-1)! ≡ -1 (mod p) for prime p

15. **Quadratic Residue:** Determine if 5 is a quadratic residue modulo 11

---

## 🎯 Key Takeaways

1. **Modular arithmetic** prevents integer overflow in calculations
2. **Modular inverse** exists only when gcd(a, m) = 1
3. **Fermat's Little Theorem** provides fast inverse for prime modulus
4. **Euler's theorem** generalizes Fermat for composite modulus
5. **Modular division** requires modular inverse: (a/b) mod m = (a × b^(-1)) mod m
6. Common MOD value: **10^9 + 7** (large prime)

---

## 📚 Quick Reference

```python
# Modular Operations
(a + b) % m = ((a % m) + (b % m)) % m
(a × b) % m = ((a % m) × (b % m)) % m
(a / b) % m = (a × modinv(b, m)) % m

# Modular Inverse
# Method 1: Extended GCD (general)
# Method 2: a^(-1) = a^(p-2) mod p (prime p)

# Fermat's Little Theorem
a^(p-1) ≡ 1 (mod p)  if p is prime

# Euler's Theorem
a^φ(n) ≡ 1 (mod n)  if gcd(a,n) = 1

# Totient Function
φ(p) = p - 1            (prime)
φ(p^k) = p^(k-1)(p-1)   (prime power)
φ(mn) = φ(m)φ(n)        (coprime m,n)
```

---

*[← Previous: Logarithms](./04-Logarithms-Exponents.md) | [Back to Chapter 2](./README.md) | [Next: Probability →](./06-Probability-Basics.md)*
