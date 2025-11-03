# 03. Number Theory Basics

## 🎯 Learning Objectives

By the end of this module, you will:
- Understand prime numbers and efficient primality testing
- Implement the Sieve of Eratosthenes
- Calculate GCD and LCM using Euclidean algorithm
- Apply modular arithmetic in problem-solving
- Perform prime factorization
- Solve problems involving divisibility

**Duration:** 1 day (4-6 hours)  
**Difficulty:** Beginner to Intermediate

---

## 📚 Table of Contents

1. [Divisibility and Division Algorithm](#1-divisibility-and-division-algorithm)
2. [Prime Numbers](#2-prime-numbers)
3. [GCD and LCM](#3-gcd-and-lcm)
4. [Prime Factorization](#4-prime-factorization)
5. [Modular Arithmetic Basics](#5-modular-arithmetic-basics)
6. [Practice Problems](#6-practice-problems)

---

## 1. Divisibility and Division Algorithm

### Divisibility

**Definition:** Integer `a` divides integer `b` (written `a | b`) if there exists an integer `k` such that `b = ka`.

**Examples:**
```
3 | 12  because 12 = 3 × 4  ✓
5 | 20  because 20 = 5 × 4  ✓
7 | 15  false (15/7 is not an integer)  ✗
```

### Properties of Divisibility

1. **Reflexive:** `a | a` for any integer a
2. **Transitive:** If `a | b` and `b | c`, then `a | c`
3. **Linear Combination:** If `a | b` and `a | c`, then `a | (bx + cy)` for any integers x, y

**Examples:**
```
If 3 | 12 and 3 | 18
Then 3 | (12×2 + 18×3) = 3 | 78  ✓
```

### Division Algorithm

**Theorem:** For any integers `a` and `b` (b > 0), there exist unique integers `q` (quotient) and `r` (remainder) such that:
```
a = bq + r,  where 0 ≤ r < b
```

**Examples:**
```
17 = 5 × 3 + 2    (q=3, r=2)
-17 = 5 × (-4) + 3  (q=-4, r=3)
```

### Code Implementation

**Python:**
```python
def divides(a, b):
    """Check if a divides b"""
    return b % a == 0

def division_algorithm(a, b):
    """
    Find quotient and remainder
    Returns (q, r) where a = bq + r and 0 <= r < b
    """
    q = a // b  # Floor division
    r = a % b   # Modulo operation
    return (q, r)

# Examples
print(divides(3, 12))  # True
print(divides(7, 15))  # False
print(division_algorithm(17, 5))  # (3, 2)
print(division_algorithm(-17, 5))  # (-4, 3)
```

---

## 2. Prime Numbers

### What are Prime Numbers?

**Definition:** A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.

**First 20 Primes:**
```
2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71
```

**Note:** 2 is the only even prime number!

### Checking if a Number is Prime

#### Method 1: Trial Division (Naive)

**Algorithm:** Check divisibility from 2 to n-1
- Time Complexity: O(n)

```python
def is_prime_naive(n):
    """Naive primality test"""
    if n < 2:
        return False
    for i in range(2, n):
        if n % i == 0:
            return False
    return True
```

#### Method 2: Optimized Trial Division

**Insight:** If n has a divisor > √n, it must also have a divisor < √n.

**Algorithm:** Check divisibility from 2 to √n
- Time Complexity: O(√n)

```python
import math

def is_prime(n):
    """Optimized primality test"""
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    
    # Check odd divisors up to √n
    for i in range(3, int(math.sqrt(n)) + 1, 2):
        if n % i == 0:
            return False
    return True

# Examples
print(is_prime(17))   # True
print(is_prime(100))  # False
print(is_prime(97))   # True
```

**C++ Implementation:**
```cpp
#include <cmath>

bool isPrime(int n) {
    if (n < 2) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    
    for (int i = 3; i <= sqrt(n); i += 2) {
        if (n % i == 0) return false;
    }
    return true;
}
```

### Sieve of Eratosthenes

**Problem:** Find all prime numbers up to n efficiently.

**Algorithm:**
1. Create a boolean array `is_prime[0..n]` and initialize all as true
2. Mark `is_prime[0]` and `is_prime[1]` as false
3. For i = 2 to √n:
   - If `is_prime[i]` is true:
     - Mark all multiples of i (i², i²+i, i²+2i, ...) as false
4. Collect all indices that remain true

**Time Complexity:** O(n log log n)  
**Space Complexity:** O(n)

**Why it's efficient:** We only mark multiples starting from i², because smaller multiples have already been marked.

**Python Implementation:**
```python
def sieve_of_eratosthenes(n):
    """Find all primes up to n"""
    if n < 2:
        return []
    
    # Initialize all as prime
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    
    # Sieve
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            # Mark multiples of i as non-prime
            for j in range(i * i, n + 1, i):
                is_prime[j] = False
    
    # Collect primes
    primes = [i for i in range(n + 1) if is_prime[i]]
    return primes

# Example
primes_100 = sieve_of_eratosthenes(100)
print(f"Primes up to 100: {primes_100}")
print(f"Count: {len(primes_100)}")  # 25 primes
```

**C++ Implementation:**
```cpp
#include <vector>
#include <cmath>
using namespace std;

vector<int> sieveOfEratosthenes(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    
    for (int i = 2; i <= sqrt(n); i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    
    vector<int> primes;
    for (int i = 2; i <= n; i++) {
        if (isPrime[i]) {
            primes.push_back(i);
        }
    }
    return primes;
}
```

### Segmented Sieve (for very large ranges)

**Use Case:** Find primes in range [L, R] where R can be very large (up to 10¹²).

**Idea:** Use sieve on small primes up to √R, then use them to sieve [L, R].

```python
def segmented_sieve(L, R):
    """Find primes in range [L, R]"""
    limit = int(R**0.5) + 1
    small_primes = sieve_of_eratosthenes(limit)
    
    # Create array for [L, R]
    size = R - L + 1
    is_prime = [True] * size
    
    # Mark multiples of small primes
    for prime in small_primes:
        # Find first multiple >= L
        start = max(prime * prime, ((L + prime - 1) // prime) * prime)
        
        for j in range(start, R + 1, prime):
            is_prime[j - L] = False
    
    # Special case: if 1 is in range
    if L == 1:
        is_prime[0] = False
    
    primes = [i + L for i in range(size) if is_prime[i]]
    return primes
```

---

## 3. GCD and LCM

### Greatest Common Divisor (GCD)

**Definition:** GCD of two integers a and b is the largest integer that divides both a and b.

**Notation:** `gcd(a, b)` or `(a, b)`

**Examples:**
```
gcd(12, 18) = 6
gcd(17, 19) = 1  (coprime/relatively prime)
gcd(100, 50) = 50
```

### Euclidean Algorithm

**Most efficient method to calculate GCD.**

**Principle:** `gcd(a, b) = gcd(b, a mod b)`

**Algorithm:**
```
gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)
```

**Example: gcd(48, 18)**
```
gcd(48, 18)
= gcd(18, 48 % 18)
= gcd(18, 12)
= gcd(12, 18 % 12)
= gcd(12, 6)
= gcd(6, 12 % 6)
= gcd(6, 0)
= 6
```

**Time Complexity:** O(log min(a, b))

**Python Implementation:**
```python
def gcd(a, b):
    """Calculate GCD using Euclidean algorithm"""
    while b:
        a, b = b, a % b
    return a

# Recursive version
def gcd_recursive(a, b):
    """Recursive GCD"""
    if b == 0:
        return a
    return gcd_recursive(b, a % b)

# Using Python's built-in
import math
print(math.gcd(48, 18))  # 6

# GCD of multiple numbers
from functools import reduce
def gcd_multiple(*numbers):
    """GCD of multiple numbers"""
    return reduce(gcd, numbers)

print(gcd_multiple(12, 18, 24, 30))  # 6
```

**C++ Implementation:**
```cpp
#include <algorithm>

int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Using C++17 built-in
#include <numeric>
int result = std::gcd(48, 18);
```

### Extended Euclidean Algorithm

**Finds:** Integers x and y such that `ax + by = gcd(a, b)`

**Bézout's Identity:** For any integers a and b, there exist integers x and y such that `ax + by = gcd(a, b)`.

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

# Example
gcd, x, y = extended_gcd(48, 18)
print(f"gcd = {gcd}, x = {x}, y = {y}")  # gcd = 6, x = -1, y = 3
print(f"Verification: 48×{x} + 18×{y} = {48*x + 18*y}")  # = 6
```

### Least Common Multiple (LCM)

**Definition:** LCM of two integers a and b is the smallest positive integer divisible by both a and b.

**Formula:**
```
lcm(a, b) = (a × b) / gcd(a, b)
```

**Example:**
```
lcm(12, 18) = (12 × 18) / gcd(12, 18)
            = 216 / 6
            = 36
```

**Python Implementation:**
```python
def lcm(a, b):
    """Calculate LCM using GCD"""
    return abs(a * b) // gcd(a, b)

# Using Python's built-in (Python 3.9+)
import math
print(math.lcm(12, 18))  # 36

# LCM of multiple numbers
from functools import reduce
def lcm_multiple(*numbers):
    """LCM of multiple numbers"""
    return reduce(lcm, numbers)

print(lcm_multiple(12, 18, 24))  # 72
```

---

## 4. Prime Factorization

### What is Prime Factorization?

**Definition:** Express a number as a product of prime numbers.

**Examples:**
```
12 = 2² × 3
60 = 2² × 3 × 5
100 = 2² × 5²
```

### Algorithm: Trial Division

**Method:** Divide by primes starting from 2.

**Time Complexity:** O(√n)

**Python Implementation:**
```python
def prime_factorization(n):
    """Return prime factorization as list of (prime, power)"""
    factors = []
    
    # Check for 2
    power = 0
    while n % 2 == 0:
        power += 1
        n //= 2
    if power > 0:
        factors.append((2, power))
    
    # Check odd numbers from 3 to √n
    i = 3
    while i * i <= n:
        power = 0
        while n % i == 0:
            power += 1
            n //= i
        if power > 0:
            factors.append((i, power))
        i += 2
    
    # If n > 1, then it's a prime factor
    if n > 1:
        factors.append((n, 1))
    
    return factors

def prime_factorization_list(n):
    """Return prime factorization as list of primes"""
    factors = []
    
    # Check for 2
    while n % 2 == 0:
        factors.append(2)
        n //= 2
    
    # Check odd numbers
    i = 3
    while i * i <= n:
        while n % i == 0:
            factors.append(i)
            n //= i
        i += 2
    
    if n > 1:
        factors.append(n)
    
    return factors

# Examples
print(prime_factorization(60))   # [(2, 2), (3, 1), (5, 1)]
print(prime_factorization_list(60))  # [2, 2, 3, 5]
print(prime_factorization(1024))     # [(2, 10)]
```

### Using Prime Factorization

**Count Divisors:**
```python
def count_divisors(n):
    """Count number of divisors using prime factorization"""
    factors = prime_factorization(n)
    count = 1
    for prime, power in factors:
        count *= (power + 1)
    return count

# Example: 60 = 2² × 3 × 5
# Divisors: (2+1) × (1+1) × (1+1) = 12
print(count_divisors(60))  # 12
```

**Sum of Divisors:**
```python
def sum_of_divisors(n):
    """Calculate sum of all divisors"""
    factors = prime_factorization(n)
    result = 1
    for prime, power in factors:
        # Sum of geometric series: (p^(k+1) - 1) / (p - 1)
        result *= (prime**(power + 1) - 1) // (prime - 1)
    return result

# Example: divisors of 12 are 1,2,3,4,6,12
print(sum_of_divisors(12))  # 28
```

---

## 5. Modular Arithmetic Basics

### Modulo Operation

**Definition:** `a mod m` is the remainder when a is divided by m.

**Notation:** `a ≡ b (mod m)` means a and b have the same remainder when divided by m.

**Examples:**
```
17 mod 5 = 2
-3 mod 5 = 2  (in most programming languages)
23 ≡ 8 (mod 5)  because both give remainder 3
```

### Properties of Modular Arithmetic

1. **Addition:**
   ```
   (a + b) mod m = ((a mod m) + (b mod m)) mod m
   ```

2. **Subtraction:**
   ```
   (a - b) mod m = ((a mod m) - (b mod m) + m) mod m
   ```

3. **Multiplication:**
   ```
   (a × b) mod m = ((a mod m) × (b mod m)) mod m
   ```

4. **Exponentiation:**
   ```
   (a^b) mod m = ((a mod m)^b) mod m
   ```

### Applications

**Prevent Integer Overflow:**
```python
def large_factorial_mod(n, mod):
    """Calculate n! mod m without overflow"""
    result = 1
    for i in range(1, n + 1):
        result = (result * i) % mod
    return result

print(large_factorial_mod(100, 10**9 + 7))  # Large factorial modulo prime
```

**Check Divisibility:**
```python
def divisible_by_3(n):
    """A number is divisible by 3 if sum of digits is divisible by 3"""
    digit_sum = sum(int(d) for d in str(n))
    return digit_sum % 3 == 0

print(divisible_by_3(12345))  # True (1+2+3+4+5=15, 15%3=0)
```

**Modular Exponentiation:**
```python
def power_mod(base, exp, mod):
    """Calculate (base^exp) mod mod efficiently"""
    result = 1
    base = base % mod
    
    while exp > 0:
        if exp % 2 == 1:  # If exp is odd
            result = (result * base) % mod
        exp = exp >> 1  # exp = exp // 2
        base = (base * base) % mod
    
    return result

# Example: Calculate 2^100 mod 1000000007
print(power_mod(2, 100, 10**9 + 7))  # 976371285
```

---

## 6. Practice Problems

### Easy Problems

1. **Divisibility:** Check if 123456 is divisible by 8.

2. **Prime Check:** Is 97 prime? Verify by hand.

3. **GCD:** Calculate gcd(48, 60) by hand using Euclidean algorithm.

4. **LCM:** Find lcm(12, 18).

5. **Prime Factorization:** Find prime factors of 84.

### Medium Problems

6. **Sieve:** Implement Sieve of Eratosthenes to find all primes up to 1000.

7. **Coprime Pairs:** Count pairs (i, j) where 1 ≤ i < j ≤ 100 and gcd(i, j) = 1.

8. **Divisor Count:** How many divisors does 1000 have?

9. **Modular Arithmetic:** Calculate (123456789 × 987654321) mod 10000007.

10. **Extended GCD:** Find x and y such that 35x + 15y = gcd(35, 15).

### Hard Problems

11. **Large Prime:** Check if 10^9 + 7 is prime (hint: use Miller-Rabin test).

12. **Prime Gaps:** Find the largest gap between consecutive primes below 1000.

13. **Perfect Numbers:** A perfect number equals the sum of its proper divisors. Find all perfect numbers less than 10000.

14. **Goldbach's Conjecture:** Verify that every even number from 4 to 100 can be expressed as sum of two primes.

15. **Chinese Remainder Theorem:** Solve the system:
    ```
    x ≡ 2 (mod 3)
    x ≡ 3 (mod 5)
    x ≡ 2 (mod 7)
    ```

---

## 🎯 Key Takeaways

1. **Primes** are fundamental building blocks of integers
2. **Sieve of Eratosthenes** finds all primes up to n in O(n log log n)
3. **Euclidean algorithm** computes GCD in O(log n) time
4. **LCM** can be calculated using: lcm(a,b) = (a×b)/gcd(a,b)
5. **Prime factorization** enables counting/summing divisors efficiently
6. **Modular arithmetic** prevents overflow in computations

---

## 📚 Quick Reference

```python
# GCD
gcd(a, b) = gcd(b, a % b)  # Recursive
Time: O(log min(a, b))

# LCM
lcm(a, b) = (a × b) / gcd(a, b)

# Prime Check
Check divisors from 2 to √n
Time: O(√n)

# Sieve of Eratosthenes
Mark multiples of each prime
Time: O(n log log n)

# Modular Exponentiation
(a^b) mod m using binary exponentiation
Time: O(log b)
```

---

*[← Previous: Combinatorics](./02-Combinatorics.md) | [Back to Chapter 2](./README.md) | [Next: Logarithms & Exponents →](./04-Logarithms-Exponents.md)*
