# 07. Practice Problems & Solutions

## 📋 Overview

This document contains **60+ practice problems** covering all mathematics topics in Chapter 2. Problems are organized by topic and difficulty level.

**Difficulty Levels:**
- 🟢 **Easy:** Basic application of concepts
- 🟡 **Medium:** Requires problem-solving and multiple concepts
- 🔴 **Hard:** Advanced problems, competitive programming level

---

## 📚 Table of Contents

1. [Discrete Mathematics Problems](#1-discrete-mathematics-problems)
2. [Combinatorics Problems](#2-combinatorics-problems)
3. [Number Theory Problems](#3-number-theory-problems)
4. [Logarithms & Exponents Problems](#4-logarithms--exponents-problems)
5. [Modular Arithmetic Problems](#5-modular-arithmetic-problems)
6. [Probability Problems](#6-probability-problems)
7. [Mixed Problems](#7-mixed-problems)

---

## 1. Discrete Mathematics Problems

### 🟢 Easy Problems

**Problem 1.1: Set Operations**
```
Given: A = {1, 2, 3, 4, 5}, B = {4, 5, 6, 7, 8}
Find:
a) A ∪ B
b) A ∩ B
c) A - B
d) B - A
e) A ⊕ B (symmetric difference)
```

<details>
<summary>Solution</summary>

```
a) A ∪ B = {1, 2, 3, 4, 5, 6, 7, 8}
b) A ∩ B = {4, 5}
c) A - B = {1, 2, 3}
d) B - A = {6, 7, 8}
e) A ⊕ B = {1, 2, 3, 6, 7, 8}
```

```python
A = {1, 2, 3, 4, 5}
B = {4, 5, 6, 7, 8}

print(f"A ∪ B = {A | B}")
print(f"A ∩ B = {A & B}")
print(f"A - B = {A - B}")
print(f"B - A = {B - A}")
print(f"A ⊕ B = {A ^ B}")
```
</details>

**Problem 1.2: Boolean Algebra**
```
Simplify: (A ∧ B) ∨ (A ∧ ¬B)
```

<details>
<summary>Solution</summary>

```
(A ∧ B) ∨ (A ∧ ¬B)
= A ∧ (B ∨ ¬B)         [Distributive law]
= A ∧ T                [Complement law: B ∨ ¬B = T]
= A                    [Identity law: A ∧ T = A]
```

**Truth table verification:**
| A | B | A∧B | ¬B | A∧¬B | (A∧B)∨(A∧¬B) | A |
|---|---|-----|----|----- |---------------|---|
| T | T | T   | F  | F    | T             | T |
| T | F | F   | T  | T    | T             | T |
| F | T | F   | F  | F    | F             | F |
| F | F | F   | T  | F    | F             | F |

Result equals A column ✓
```
</details>

---

### 🟡 Medium Problems

**Problem 1.3: Mathematical Induction**
```
Prove by induction: 1 + 3 + 5 + ... + (2n-1) = n²
```

<details>
<summary>Solution</summary>

**Proof by Mathematical Induction:**

**Base Case (n = 1):**
```
LHS = 1
RHS = 1² = 1
LHS = RHS ✓
```

**Inductive Hypothesis:**
Assume true for n = k:
```
1 + 3 + 5 + ... + (2k-1) = k²
```

**Inductive Step (prove for n = k+1):**
```
LHS = 1 + 3 + 5 + ... + (2k-1) + (2(k+1)-1)
    = k² + (2k+1)                    [by hypothesis]
    = k² + 2k + 1
    = (k+1)²
    = RHS ✓
```

**Conclusion:**
By mathematical induction, the formula holds for all n ≥ 1. ∎
</details>

**Problem 1.4: De Morgan's Laws**
```
Apply De Morgan's laws to simplify:
¬((x > 5) ∧ (y < 10) ∧ (z == 0))
```

<details>
<summary>Solution</summary>

```
¬((x > 5) ∧ (y < 10) ∧ (z == 0))
= ¬(x > 5) ∨ ¬(y < 10) ∨ ¬(z == 0)     [De Morgan's]
= (x ≤ 5) ∨ (y ≥ 10) ∨ (z ≠ 0)

In code:
x <= 5 or y >= 10 or z != 0
```
</details>

---

### 🔴 Hard Problems

**Problem 1.5: Power Set Proof**
```
Prove by induction: If |A| = n, then |P(A)| = 2^n
where P(A) is the power set of A.
```

<details>
<summary>Solution</summary>

**Proof:**

**Base Case (n = 0):**
```
A = ∅
P(A) = {∅}
|P(A)| = 1 = 2^0 ✓
```

**Inductive Hypothesis:**
Assume for set with k elements: |P(A)| = 2^k

**Inductive Step:**
Consider set B with k+1 elements. B = A ∪ {x} where |A| = k.

Every subset of B either:
1. Contains x: Form by adding x to any subset of A → 2^k subsets
2. Doesn't contain x: Just subsets of A → 2^k subsets

Total subsets = 2^k + 2^k = 2·2^k = 2^(k+1) ✓

**Conclusion:**
By induction, |P(A)| = 2^n for all n ≥ 0. ∎
</details>

---

## 2. Combinatorics Problems

### 🟢 Easy Problems

**Problem 2.1: Permutations**
```
How many ways can you arrange 5 books on a shelf?
```

<details>
<summary>Solution</summary>

```
n = 5 objects to arrange
P(5, 5) = 5! = 5 × 4 × 3 × 2 × 1 = 120 ways
```

```python
import math
print(math.factorial(5))  # 120
```
</details>

**Problem 2.2: Combinations**
```
Choose 3 students from a class of 20 for a committee.
How many ways?
```

<details>
<summary>Solution</summary>

```
Order doesn't matter → Combination
C(20, 3) = 20! / (3! × 17!)
         = (20 × 19 × 18) / (3 × 2 × 1)
         = 6840 / 6
         = 1140 ways
```

```python
from math import comb
print(comb(20, 3))  # 1140
```
</details>

---

### 🟡 Medium Problems

**Problem 2.3: MISSISSIPPI**
```
How many distinct arrangements of the letters in "MISSISSIPPI"?
```

<details>
<summary>Solution</summary>

```
Total letters: 11
M: 1
I: 4
S: 4
P: 2

Formula: n! / (n₁! × n₂! × ... × nₖ!)

Answer = 11! / (1! × 4! × 4! × 2!)
       = 39,916,800 / (1 × 24 × 24 × 2)
       = 39,916,800 / 1,152
       = 34,650 arrangements
```

```python
import math

def permutation_with_repetition(total, *counts):
    numerator = math.factorial(total)
    denominator = 1
    for count in counts:
        denominator *= math.factorial(count)
    return numerator // denominator

print(permutation_with_repetition(11, 1, 4, 4, 2))  # 34650
```
</details>

**Problem 2.4: Committee with Constraints**
```
From 10 people (6 men, 4 women), form a 5-person committee
with at least 2 women. How many ways?
```

<details>
<summary>Solution</summary>

**Method 1: Case Analysis**
```
Case 1: 2 women, 3 men
C(4,2) × C(6,3) = 6 × 20 = 120

Case 2: 3 women, 2 men
C(4,3) × C(6,2) = 4 × 15 = 60

Case 3: 4 women, 1 man
C(4,4) × C(6,1) = 1 × 6 = 6

Total = 120 + 60 + 6 = 186 ways
```

**Method 2: Complement**
```
Total ways to form committee = C(10, 5) = 252

Ways with 0 women = C(4,0) × C(6,5) = 1 × 6 = 6
Ways with 1 woman = C(4,1) × C(6,4) = 4 × 15 = 60

Ways with at least 2 women = 252 - 6 - 60 = 186 ways
```

```python
from math import comb

# Method 1
way1 = comb(4,2)*comb(6,3) + comb(4,3)*comb(6,2) + comb(4,4)*comb(6,1)
print(f"Method 1: {way1}")  # 186

# Method 2
total = comb(10, 5)
excluded = comb(4,0)*comb(6,5) + comb(4,1)*comb(6,4)
way2 = total - excluded
print(f"Method 2: {way2}")  # 186
```
</details>

---

### 🔴 Hard Problems

**Problem 2.5: Derangements**
```
4 people check their coats. How many ways can the coats
be returned so that nobody gets their own coat?
```

<details>
<summary>Solution</summary>

**Formula for Derangements:**
```
D(n) = n! × Σ((-1)^k / k!) for k=0 to n

D(4) = 4! × (1 - 1/1! + 1/2! - 1/3! + 1/4!)
     = 24 × (1 - 1 + 0.5 - 0.1667 + 0.0417)
     = 24 × 0.375
     = 9
```

**Alternative: Recursive Formula**
```
D(n) = (n-1) × [D(n-1) + D(n-2)]

D(0) = 1
D(1) = 0
D(2) = 1
D(3) = 2
D(4) = 3 × (2 + 1) = 9
```

```python
def derangements(n):
    if n == 0: return 1
    if n == 1: return 0
    
    dp = [0] * (n + 1)
    dp[0], dp[1] = 1, 0
    
    for i in range(2, n + 1):
        dp[i] = (i - 1) * (dp[i-1] + dp[i-2])
    
    return dp[n]

print(derangements(4))  # 9
```
</details>

---

## 3. Number Theory Problems

### 🟢 Easy Problems

**Problem 3.1: Prime Check**
```
Is 97 prime?
```

<details>
<summary>Solution</summary>

```
Check divisors from 2 to √97 ≈ 9.85

97 ÷ 2 = 48.5 ✗
97 ÷ 3 = 32.33... ✗
97 ÷ 5 = 19.4 ✗
97 ÷ 7 = 13.86... ✗

No divisors found → 97 is prime ✓
```

```python
import math

def is_prime(n):
    if n < 2: return False
    if n == 2: return True
    if n % 2 == 0: return False
    
    for i in range(3, int(math.sqrt(n)) + 1, 2):
        if n % i == 0:
            return False
    return True

print(is_prime(97))  # True
```
</details>

**Problem 3.2: GCD**
```
Calculate gcd(48, 60) using Euclidean algorithm.
```

<details>
<summary>Solution</summary>

```
gcd(48, 60)
= gcd(60, 48)
= gcd(48, 60 % 48)
= gcd(48, 12)
= gcd(12, 48 % 12)
= gcd(12, 0)
= 12

Answer: gcd(48, 60) = 12
```

```python
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

print(gcd(48, 60))  # 12
```
</details>

---

### 🟡 Medium Problems

**Problem 3.3: Sieve of Eratosthenes**
```
Find all prime numbers up to 50.
```

<details>
<summary>Solution</summary>

```python
def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n + 1, i):
                is_prime[j] = False
    
    return [i for i in range(n + 1) if is_prime[i]]

primes = sieve(50)
print(primes)
# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
```
</details>

**Problem 3.4: Prime Factorization**
```
Find the prime factorization of 360.
```

<details>
<summary>Solution</summary>

```
360 = 2 × 180
    = 2 × 2 × 90
    = 2 × 2 × 2 × 45
    = 2 × 2 × 2 × 3 × 15
    = 2 × 2 × 2 × 3 × 3 × 5
    = 2³ × 3² × 5

Answer: 360 = 2³ × 3² × 5
```

```python
def prime_factorization(n):
    factors = []
    
    # Factor out 2s
    while n % 2 == 0:
        factors.append(2)
        n //= 2
    
    # Factor out odd numbers
    i = 3
    while i * i <= n:
        while n % i == 0:
            factors.append(i)
            n //= i
        i += 2
    
    if n > 1:
        factors.append(n)
    
    return factors

print(prime_factorization(360))  # [2, 2, 2, 3, 3, 5]
```
</details>

---

### 🔴 Hard Problems

**Problem 3.5: Count Divisors**
```
How many divisors does 1000 have?
```

<details>
<summary>Solution</summary>

```
Prime factorization: 1000 = 2³ × 5³

For a number n = p₁^a₁ × p₂^a₂ × ... × pₖ^aₖ
Number of divisors = (a₁+1) × (a₂+1) × ... × (aₖ+1)

For 1000 = 2³ × 5³:
Number of divisors = (3+1) × (3+1) = 4 × 4 = 16

The divisors are:
1, 2, 4, 5, 8, 10, 20, 25, 40, 50, 100, 125, 200, 250, 500, 1000
```

```python
def count_divisors(n):
    """Using prime factorization"""
    count = 1
    
    # Count powers of 2
    power = 0
    while n % 2 == 0:
        power += 1
        n //= 2
    count *= (power + 1)
    
    # Count powers of odd primes
    i = 3
    while i * i <= n:
        power = 0
        while n % i == 0:
            power += 1
            n //= i
        count *= (power + 1)
        i += 2
    
    if n > 1:
        count *= 2
    
    return count

print(count_divisors(1000))  # 16
```
</details>

---

## 4. Logarithms & Exponents Problems

### 🟢 Easy Problems

**Problem 4.1: Basic Calculations**
```
Calculate:
a) 2^10
b) log₂(64)
c) log₁₀(1000)
```

<details>
<summary>Solution</summary>

```
a) 2^10 = 1024
b) log₂(64) = log₂(2^6) = 6
c) log₁₀(1000) = log₁₀(10^3) = 3
```

```python
import math

print(f"2^10 = {2**10}")  # 1024
print(f"log₂(64) = {math.log2(64)}")  # 6.0
print(f"log₁₀(1000) = {math.log10(1000)}")  # 3.0
```
</details>

**Problem 4.2: Logarithm Properties**
```
Simplify: log₂(16) + log₂(4)
```

<details>
<summary>Solution</summary>

```
Method 1: Calculate individually
log₂(16) + log₂(4) = 4 + 2 = 6

Method 2: Product rule
log₂(16) + log₂(4) = log₂(16 × 4) = log₂(64) = 6
```
</details>

---

### 🟡 Medium Problems

**Problem 4.3: Binary Exponentiation**
```
Calculate 3^100 mod (10^9 + 7) efficiently.
```

<details>
<summary>Solution</summary>

```python
def power_mod(base, exp, mod):
    result = 1
    base = base % mod
    
    while exp > 0:
        if exp % 2 == 1:
            result = (result * base) % mod
        exp = exp >> 1
        base = (base * base) % mod
    
    return result

MOD = 10**9 + 7
answer = power_mod(3, 100, MOD)
print(f"3^100 mod {MOD} = {answer}")  # 515377520
```

Time Complexity: O(log n) - only ~7 multiplications!
</details>

---

### 🔴 Hard Problems

**Problem 4.4: Master Theorem**
```
Solve the recurrence: T(n) = 4T(n/2) + O(n)
```

<details>
<summary>Solution</summary>

**Master Theorem:** T(n) = aT(n/b) + f(n)
```
a = 4 (subproblems)
b = 2 (division factor)
f(n) = n

log_b(a) = log₂(4) = 2

Compare f(n) = n with n^(log_b(a)) = n²:
f(n) = O(n) = O(n^(2-ε)) where ε = 1

Case 1 applies: f(n) is polynomially smaller than n^(log_b(a))

Therefore: T(n) = Θ(n^(log_b(a))) = Θ(n²)
```

**Verification by Recursion Tree:**
```
Level 0: n                  (1 node)
Level 1: n/2 + n/2 + n/2 + n/2 = 2n    (4 nodes)
Level 2: 4n                 (16 nodes)
...
Level k: 2^k × n            (4^k nodes)

Last level when n/2^k = 1: k = log₂(n)
Work at last level: 4^(log₂(n)) = n²

Total: O(n²)
```
</details>

---

## 5. Modular Arithmetic Problems

### 🟢 Easy Problems

**Problem 5.1: Basic Modulo**
```
Calculate: (23 + 17) mod 5
```

<details>
<summary>Solution</summary>

```
Method 1: Direct
(23 + 17) mod 5 = 40 mod 5 = 0

Method 2: Use properties
(23 + 17) mod 5 = ((23 mod 5) + (17 mod 5)) mod 5
                = (3 + 2) mod 5
                = 5 mod 5
                = 0
```
</details>

**Problem 5.2: Modular Inverse**
```
Find 7^(-1) mod 11 (inverse of 7 modulo 11).
```

<details>
<summary>Solution</summary>

```
Need to find x such that 7x ≡ 1 (mod 11)

Try x = 1, 2, 3, ..., 10:
7 × 1 = 7 ≡ 7 (mod 11)
7 × 2 = 14 ≡ 3 (mod 11)
7 × 3 = 21 ≡ 10 (mod 11)
7 × 4 = 28 ≡ 6 (mod 11)
7 × 5 = 35 ≡ 2 (mod 11)
7 × 6 = 42 ≡ 9 (mod 11)
7 × 7 = 49 ≡ 5 (mod 11)
7 × 8 = 56 ≡ 1 (mod 11) ✓

Answer: 7^(-1) ≡ 8 (mod 11)
```

```python
# Using Fermat's Little Theorem (11 is prime)
def mod_inverse(a, p):
    return pow(a, p-2, p)

print(mod_inverse(7, 11))  # 8
```
</details>

---

### 🟡 Medium Problems

**Problem 5.3: Large Factorial Modulo**
```
Calculate 100! mod (10^9 + 7)
```

<details>
<summary>Solution</summary>

```python
def factorial_mod(n, mod):
    result = 1
    for i in range(1, n + 1):
        result = (result * i) % mod
    return result

MOD = 10**9 + 7
answer = factorial_mod(100, MOD)
print(f"100! mod {MOD} = {answer}")  # 437918130
```
</details>

**Problem 5.4: Euler's Totient**
```
Calculate φ(100)
```

<details>
<summary>Solution</summary>

```
100 = 2² × 5²

φ(100) = 100 × (1 - 1/2) × (1 - 1/5)
       = 100 × 1/2 × 4/5
       = 100 × 4/10
       = 40

Or using formula for prime powers:
φ(2²) × φ(5²) = 2^1(2-1) × 5^1(5-1) = 2 × 20 = 40
```

```python
def euler_totient(n):
    result = n
    p = 2
    while p * p <= n:
        if n % p == 0:
            while n % p == 0:
                n //= p
            result -= result // p
        p += 1
    if n > 1:
        result -= result // n
    return result

print(euler_totient(100))  # 40
```
</details>

---

### 🔴 Hard Problems

**Problem 5.5: Chinese Remainder Theorem**
```
Solve:
x ≡ 2 (mod 3)
x ≡ 3 (mod 5)
x ≡ 2 (mod 7)
```

<details>
<summary>Solution</summary>

**Chinese Remainder Theorem:**

```
M = 3 × 5 × 7 = 105
M₁ = 105/3 = 35
M₂ = 105/5 = 21
M₃ = 105/7 = 15

Find inverses:
y₁: 35y₁ ≡ 1 (mod 3) → y₁ = 2
y₂: 21y₂ ≡ 1 (mod 5) → y₂ = 1
y₃: 15y₃ ≡ 1 (mod 7) → y₃ = 1

x = (2×35×2 + 3×21×1 + 2×15×1) mod 105
  = (140 + 63 + 30) mod 105
  = 233 mod 105
  = 23

Answer: x = 23 (and x = 23 + 105k for any integer k)

Verification:
23 mod 3 = 2 ✓
23 mod 5 = 3 ✓
23 mod 7 = 2 ✓
```
</details>

---

## 6. Probability Problems

### 🟢 Easy Problems

**Problem 6.1: Dice Probability**
```
What is P(sum = 7) when rolling two fair dice?
```

<details>
<summary>Solution</summary>

```
Total outcomes: 6 × 6 = 36

Ways to get sum of 7:
(1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 ways

P(sum = 7) = 6/36 = 1/6 ≈ 0.1667 or 16.67%
```
</details>

**Problem 6.2: Complement**
```
P(at least one head in 3 coin flips)?
```

<details>
<summary>Solution</summary>

```
Method 1: Complement
P(at least one head) = 1 - P(all tails)
                     = 1 - (1/2)³
                     = 1 - 1/8
                     = 7/8

Method 2: Count
Total outcomes: 2³ = 8
Favorable: {HHH, HHT, HTH, HTT, THH, THT, TTH} = 7
P = 7/8
```
</details>

---

### 🟡 Medium Problems

**Problem 6.3: Conditional Probability**
```
Bag has 3 red and 2 blue balls. Draw 2 without replacement.
P(2nd red | 1st red)?
```

<details>
<summary>Solution</summary>

```
After drawing 1 red ball:
- Remaining balls: 4
- Remaining red: 2

P(2nd red | 1st red) = 2/4 = 1/2
```
</details>

**Problem 6.4: Expected Value**
```
Roll a fair die. What is E[value shown]?
```

<details>
<summary>Solution</summary>

```
E[X] = 1×(1/6) + 2×(1/6) + 3×(1/6) + 4×(1/6) + 5×(1/6) + 6×(1/6)
     = (1+2+3+4+5+6)/6
     = 21/6
     = 3.5
```
</details>

---

### 🔴 Hard Problems

**Problem 6.5: Birthday Paradox**
```
How many people needed for >50% probability of shared birthday?
```

<details>
<summary>Solution</summary>

**Calculate P(no shared birthdays):**
```
P(all different) = 365/365 × 364/365 × 363/365 × ...

For n people:
P(all different) = 365! / ((365-n)! × 365^n)

P(at least one shared) = 1 - P(all different)
```

```python
def birthday_probability(n):
    prob_all_different = 1.0
    for i in range(n):
        prob_all_different *= (365 - i) / 365
    return 1 - prob_all_different

# Find minimum n for >50%
for n in range(1, 100):
    prob = birthday_probability(n)
    if prob > 0.5:
        print(f"Need {n} people for {prob:.4f} probability")
        break

# Output: Need 23 people for 0.5073 probability
```

**Answer: 23 people**

Surprising! With just 23 people, there's >50% chance of a shared birthday.
</details>

---

## 7. Mixed Problems

### Challenge Problems

**Problem 7.1: Catalan Numbers** 🔴
```
Prove that the number of ways to parenthesize n+1 factors
is given by the n-th Catalan number: C_n = C(2n,n)/(n+1)
```

**Problem 7.2: Stars and Bars** 🟡
```
How many ways to distribute 10 identical candies to 4 children?
```

**Problem 7.3: Inclusion-Exclusion** 🟡
```
How many integers from 1-1000 are divisible by 2, 3, or 5?
```

**Problem 7.4: Recursive Sequences** 🔴
```
Solve: F(n) = F(n-1) + F(n-2) with F(0)=0, F(1)=1 (Fibonacci)
Find closed form using generating functions.
```

**Problem 7.5: Matrix Exponentiation** 🔴
```
Use matrix exponentiation to compute Fibonacci(10^9) mod (10^9+7).
```

---

## 🎯 Practice Tips

1. **Start with Easy:** Build confidence with basic problems
2. **Time Yourself:** Simulate interview/contest conditions
3. **Solve Without Code First:** Work out math by hand
4. **Multiple Methods:** Find different ways to solve each problem
5. **Review Solutions:** Even if you solved it, check alternative approaches
6. **Pattern Recognition:** Notice recurring problem types

---

## 📚 Additional Practice

**Online Judges:**
- LeetCode: Math tag
- Codeforces: Div 3/4 problems
- HackerRank: Mathematics domain
- Project Euler: Pure math problems
- CSES Problem Set: Mathematics section

---

*[← Previous: Probability](./06-Probability-Basics.md) | [Back to Chapter 2](./README.md) | [Next: Code Examples →](./08-Code-Examples.md)*
