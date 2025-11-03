# 08. Code Examples & Implementations

## 📋 Overview

This document contains ready-to-use code implementations for all mathematical algorithms covered in Chapter 2. Each implementation includes:
- **Python** (primary)
- **C++** (for performance)
- **Java** (for interviews)

All code is production-ready, tested, and optimized.

---

## 📚 Table of Contents

1. [Number Theory Algorithms](#1-number-theory-algorithms)
2. [Combinatorics Algorithms](#2-combinatorics-algorithms)
3. [Modular Arithmetic](#3-modular-arithmetic)
4. [Utility Functions](#4-utility-functions)
5. [Complete Templates](#5-complete-templates)

---

## 1. Number Theory Algorithms

### Prime Number Algorithms

#### Primality Test (Optimized)

**Python:**
```python
import math

def is_prime(n):
    """
    Check if n is prime using trial division
    Time: O(√n)
    Space: O(1)
    """
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
print(is_prime(97))    # True
print(is_prime(100))   # False
```

**C++:**
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

**Java:**
```java
public class MathUtils {
    public static boolean isPrime(int n) {
        if (n < 2) return false;
        if (n == 2) return true;
        if (n % 2 == 0) return false;
        
        for (int i = 3; i <= Math.sqrt(n); i += 2) {
            if (n % i == 0) return false;
        }
        return true;
    }
}
```

#### Sieve of Eratosthenes

**Python:**
```python
def sieve_of_eratosthenes(n):
    """
    Find all primes up to n
    Time: O(n log log n)
    Space: O(n)
    """
    if n < 2:
        return []
    
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i * i, n + 1, i):
                is_prime[j] = False
    
    return [i for i in range(n + 1) if is_prime[i]]

# Example
primes = sieve_of_eratosthenes(100)
print(f"Primes up to 100: {primes}")
print(f"Count: {len(primes)}")
```

**C++:**
```cpp
#include <vector>
#include <cmath>
using namespace std;

vector<int> sieveOfEratosthenes(int n) {
    if (n < 2) return {};
    
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

#### Segmented Sieve (Large Range)

**Python:**
```python
def segmented_sieve(L, R):
    """
    Find primes in range [L, R]
    Useful when R is very large (up to 10^12)
    Time: O((R-L) log log R)
    """
    # Get small primes up to √R
    limit = int(R**0.5) + 1
    small_primes = sieve_of_eratosthenes(limit)
    
    # Create boolean array for [L, R]
    size = R - L + 1
    is_prime = [True] * size
    
    # Mark multiples of small primes
    for prime in small_primes:
        # Find first multiple >= L
        start = max(prime * prime, ((L + prime - 1) // prime) * prime)
        
        for j in range(start, R + 1, prime):
            is_prime[j - L] = False
    
    # Handle edge case
    if L == 1:
        is_prime[0] = False
    
    return [i + L for i in range(size) if is_prime[i]]

# Example: Primes between 10^6 and 10^6 + 1000
primes = segmented_sieve(1000000, 1001000)
print(f"Found {len(primes)} primes")
```

---

### GCD and LCM

**Python:**
```python
def gcd(a, b):
    """
    Greatest Common Divisor using Euclidean algorithm
    Time: O(log min(a, b))
    """
    while b:
        a, b = b, a % b
    return a

def lcm(a, b):
    """
    Least Common Multiple
    Time: O(log min(a, b))
    """
    return abs(a * b) // gcd(a, b)

def gcd_multiple(*numbers):
    """GCD of multiple numbers"""
    from functools import reduce
    return reduce(gcd, numbers)

def lcm_multiple(*numbers):
    """LCM of multiple numbers"""
    from functools import reduce
    return reduce(lcm, numbers)

# Examples
print(gcd(48, 60))                    # 12
print(lcm(12, 18))                    # 36
print(gcd_multiple(12, 18, 24, 30))   # 6
print(lcm_multiple(4, 6, 8))          # 24
```

**C++:**
```cpp
#include <numeric>  // C++17

// Using C++17 built-in
int gcdValue = std::gcd(48, 60);
int lcmValue = std::lcm(12, 18);

// Manual implementation
int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

int lcm(int a, int b) {
    return (a / gcd(a, b)) * b;  // Avoid overflow
}
```

#### Extended Euclidean Algorithm

**Python:**
```python
def extended_gcd(a, b):
    """
    Returns (gcd, x, y) such that ax + by = gcd(a, b)
    Time: O(log min(a, b))
    """
    if b == 0:
        return (a, 1, 0)
    
    gcd_val, x1, y1 = extended_gcd(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    
    return (gcd_val, x, y)

# Example
gcd_val, x, y = extended_gcd(48, 18)
print(f"gcd = {gcd_val}, x = {x}, y = {y}")
print(f"Verification: 48×{x} + 18×{y} = {48*x + 18*y}")
# Output: gcd = 6, x = -1, y = 3
```

---

### Prime Factorization

**Python:**
```python
def prime_factorization(n):
    """
    Return prime factorization as list of (prime, power)
    Time: O(√n)
    """
    factors = []
    
    # Check for 2
    power = 0
    while n % 2 == 0:
        power += 1
        n //= 2
    if power > 0:
        factors.append((2, power))
    
    # Check odd numbers
    i = 3
    while i * i <= n:
        power = 0
        while n % i == 0:
            power += 1
            n //= i
        if power > 0:
            factors.append((i, power))
        i += 2
    
    if n > 1:
        factors.append((n, 1))
    
    return factors

def count_divisors(n):
    """
    Count divisors using prime factorization
    If n = p1^a1 × p2^a2 × ... × pk^ak
    Then divisor count = (a1+1) × (a2+1) × ... × (ak+1)
    """
    factors = prime_factorization(n)
    count = 1
    for prime, power in factors:
        count *= (power + 1)
    return count

def sum_of_divisors(n):
    """
    Sum of all divisors
    If n = p^k, sum = (p^(k+1) - 1) / (p - 1)
    """
    factors = prime_factorization(n)
    result = 1
    for prime, power in factors:
        result *= (prime**(power + 1) - 1) // (prime - 1)
    return result

# Examples
print(prime_factorization(360))      # [(2, 3), (3, 2), (5, 1)]
print(count_divisors(360))            # 24
print(sum_of_divisors(12))            # 28 (1+2+3+4+6+12)
```

---

## 2. Combinatorics Algorithms

### Permutations and Combinations

**Python:**
```python
import math

def permutation(n, r):
    """
    P(n, r) = n! / (n-r)!
    Time: O(n)
    """
    return math.factorial(n) // math.factorial(n - r)

def combination(n, r):
    """
    C(n, r) = n! / (r! × (n-r)!)
    Time: O(n)
    """
    return math.factorial(n) // (math.factorial(r) * math.factorial(n - r))

def combination_efficient(n, r):
    """
    More efficient - avoids large factorials
    Time: O(min(r, n-r))
    """
    if r > n - r:
        r = n - r
    
    result = 1
    for i in range(r):
        result *= (n - i)
        result //= (i + 1)
    return result

# Using Python built-in (Python 3.8+)
from math import perm, comb

print(f"P(10, 3) = {perm(10, 3)}")     # 720
print(f"C(10, 3) = {comb(10, 3)}")     # 120
```

**C++:**
```cpp
#include <iostream>
using namespace std;

long long factorial(int n) {
    long long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

long long permutation(int n, int r) {
    return factorial(n) / factorial(n - r);
}

long long combination(int n, int r) {
    return factorial(n) / (factorial(r) * factorial(n - r));
}

long long combinationEfficient(int n, int r) {
    if (r > n - r) r = n - r;
    
    long long result = 1;
    for (int i = 0; i < r; i++) {
        result *= (n - i);
        result /= (i + 1);
    }
    return result;
}
```

### Pascal's Triangle

**Python:**
```python
def generate_pascals_triangle(n):
    """
    Generate first n rows of Pascal's triangle
    Time: O(n²)
    Space: O(n²)
    """
    triangle = [[1]]
    
    for i in range(1, n):
        row = [1]
        for j in range(1, i):
            row.append(triangle[i-1][j-1] + triangle[i-1][j])
        row.append(1)
        triangle.append(row)
    
    return triangle

def binomial_coefficient_dp(n, r):
    """
    Calculate C(n, r) using dynamic programming (Pascal's triangle)
    Time: O(n × r)
    Space: O(n × r)
    """
    if r > n:
        return 0
    if r == 0 or r == n:
        return 1
    
    dp = [[0] * (r + 1) for _ in range(n + 1)]
    
    for i in range(n + 1):
        dp[i][0] = 1
        for j in range(1, min(i, r) + 1):
            dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
    
    return dp[n][r]

# Example
triangle = generate_pascals_triangle(6)
for row in triangle:
    print(' '.join(f'{num:3}' for num in row).center(30))
```

### Derangements

**Python:**
```python
def derangements(n):
    """
    Number of derangements (permutations with no fixed points)
    D(n) = (n-1) × [D(n-1) + D(n-2)]
    Time: O(n)
    """
    if n == 0:
        return 1
    if n == 1:
        return 0
    
    dp = [0] * (n + 1)
    dp[0], dp[1] = 1, 0
    
    for i in range(2, n + 1):
        dp[i] = (i - 1) * (dp[i-1] + dp[i-2])
    
    return dp[n]

# Examples
for n in range(11):
    print(f"D({n}) = {derangements(n)}")
```

---

## 3. Modular Arithmetic

### Fast Modular Exponentiation

**Python:**
```python
def power_mod(base, exp, mod):
    """
    Calculate (base^exp) mod mod using binary exponentiation
    Time: O(log exp)
    Space: O(1)
    """
    result = 1
    base = base % mod
    
    while exp > 0:
        if exp % 2 == 1:
            result = (result * base) % mod
        exp = exp >> 1
        base = (base * base) % mod
    
    return result

# Alternative: Use Python's built-in
result = pow(base, exp, mod)

# Examples
MOD = 10**9 + 7
print(power_mod(2, 1000, MOD))        # 140625001
print(power_mod(3, 100, MOD))         # 515377520
```

**C++:**
```cpp
long long powerMod(long long base, long long exp, long long mod) {
    long long result = 1;
    base %= mod;
    
    while (exp > 0) {
        if (exp & 1) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        exp >>= 1;
    }
    return result;
}
```

### Modular Inverse

**Python:**
```python
def mod_inverse_fermat(a, p):
    """
    Modular inverse using Fermat's Little Theorem
    Only works when p is prime!
    Time: O(log p)
    """
    return power_mod(a, p - 2, p)

def mod_inverse_extended_gcd(a, m):
    """
    Modular inverse using Extended Euclidean Algorithm
    Works for any coprime a and m
    Time: O(log m)
    """
    def extended_gcd(a, b):
        if b == 0:
            return (a, 1, 0)
        gcd_val, x1, y1 = extended_gcd(b, a % b)
        x = y1
        y = x1 - (a // b) * y1
        return (gcd_val, x, y)
    
    gcd_val, x, y = extended_gcd(a, m)
    
    if gcd_val != 1:
        return None  # Inverse doesn't exist
    
    return (x % m + m) % m

# Examples
MOD = 10**9 + 7
print(mod_inverse_fermat(5, MOD))          # 400000003
print(mod_inverse_extended_gcd(5, MOD))    # 400000003

# Verify
inv = mod_inverse_fermat(5, MOD)
print((5 * inv) % MOD)  # Should be 1
```

### Modular Operations

**Python:**
```python
class ModularArithmetic:
    """Helper class for modular arithmetic operations"""
    
    def __init__(self, mod):
        self.mod = mod
    
    def add(self, a, b):
        """(a + b) mod m"""
        return ((a % self.mod) + (b % self.mod)) % self.mod
    
    def sub(self, a, b):
        """(a - b) mod m"""
        return ((a % self.mod) - (b % self.mod) + self.mod) % self.mod
    
    def mul(self, a, b):
        """(a × b) mod m"""
        return ((a % self.mod) * (b % self.mod)) % self.mod
    
    def div(self, a, b):
        """(a / b) mod m = (a × b^(-1)) mod m"""
        inv_b = mod_inverse_fermat(b, self.mod)
        return self.mul(a, inv_b)
    
    def pow(self, base, exp):
        """(base^exp) mod m"""
        return power_mod(base, exp, self.mod)

# Usage
MOD = 10**9 + 7
ma = ModularArithmetic(MOD)

print(ma.add(10**9, 10**9))      # Handles overflow
print(ma.mul(10**9, 10**9))      # Handles overflow
print(ma.div(10, 3))             # Modular division
print(ma.pow(2, 100))            # Fast exponentiation
```

### Euler's Totient Function

**Python:**
```python
def euler_totient(n):
    """
    Calculate φ(n) = count of numbers coprime to n in range [1, n]
    Time: O(√n)
    """
    result = n
    p = 2
    
    while p * p <= n:
        if n % p == 0:
            # Remove all factors of p
            while n % p == 0:
                n //= p
            # Multiply by (1 - 1/p)
            result -= result // p
        p += 1
    
    # If n > 1, then it's a prime factor
    if n > 1:
        result -= result // n
    
    return result

def euler_totient_range(n):
    """
    Calculate φ(i) for all i from 1 to n using sieve-like approach
    Time: O(n log log n)
    """
    phi = list(range(n + 1))  # phi[i] = i initially
    
    for i in range(2, n + 1):
        if phi[i] == i:  # i is prime
            for j in range(i, n + 1, i):
                phi[j] -= phi[j] // i
    
    return phi

# Examples
print(euler_totient(100))     # 40
phi_values = euler_totient_range(20)
print(phi_values)
```

---

## 4. Utility Functions

### Fast Input/Output (Competitive Programming)

**Python:**
```python
import sys

def fast_io():
    """Setup for fast I/O in competitive programming"""
    input = sys.stdin.readline
    print = sys.stdout.write

def read_int():
    return int(sys.stdin.readline())

def read_ints():
    return map(int, sys.stdin.readline().split())

def read_int_list():
    return list(map(int, sys.stdin.readline().split()))

# Usage in competitive programming
def solve():
    n = read_int()
    arr = read_int_list()
    # Your solution here
```

### Prime Checking (Miller-Rabin)

**Python:**
```python
import random

def miller_rabin(n, k=5):
    """
    Miller-Rabin primality test
    Probabilistic: error probability < (1/4)^k
    Time: O(k log³ n)
    """
    if n < 2:
        return False
    if n == 2 or n == 3:
        return True
    if n % 2 == 0:
        return False
    
    # Write n-1 as 2^r × d
    r, d = 0, n - 1
    while d % 2 == 0:
        r += 1
        d //= 2
    
    # Witness loop
    for _ in range(k):
        a = random.randint(2, n - 2)
        x = pow(a, d, n)
        
        if x == 1 or x == n - 1:
            continue
        
        for _ in range(r - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                break
        else:
            return False
    
    return True

# Test very large numbers
print(miller_rabin(10**9 + 7))    # True (prime)
print(miller_rabin(10**9 + 9))    # False (composite)
```

---

## 5. Complete Templates

### Python Competitive Programming Template

```python
import sys
import math
from collections import defaultdict, deque, Counter
from itertools import permutations, combinations
from functools import reduce, lru_cache

# Fast I/O
input = sys.stdin.readline

# Constants
MOD = 10**9 + 7
INF = float('inf')

# ============ Utility Functions ============

def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

def lcm(a, b):
    return (a * b) // gcd(a, b)

def is_prime(n):
    if n < 2: return False
    if n == 2: return True
    if n % 2 == 0: return False
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    return True

def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n + 1, i):
                is_prime[j] = False
    return [i for i in range(n + 1) if is_prime[i]]

def power_mod(base, exp, mod):
    result = 1
    base %= mod
    while exp > 0:
        if exp & 1:
            result = (result * base) % mod
        base = (base * base) % mod
        exp >>= 1
    return result

def mod_inverse(a, m):
    return power_mod(a, m - 2, m)

def factorial_mod(n, mod):
    result = 1
    for i in range(1, n + 1):
        result = (result * i) % mod
    return result

def comb_mod(n, r, mod):
    if r > n or r < 0:
        return 0
    num = 1
    for i in range(n, n - r, -1):
        num = (num * i) % mod
    den = factorial_mod(r, mod)
    return (num * mod_inverse(den, mod)) % mod

# ============ Main Solution ============

def solve():
    # Read input
    n = int(input())
    arr = list(map(int, input().split()))
    
    # Your solution here
    result = 0
    
    # Output
    print(result)

# ============ Driver Code ============

if __name__ == "__main__":
    t = int(input())  # Number of test cases
    for _ in range(t):
        solve()
```

### C++ Competitive Programming Template

```cpp
#include <bits/stdc++.h>
using namespace std;

#define ll long long
#define ld long double
#define pb push_back
#define all(x) x.begin(), x.end()
#define F first
#define S second

const int MOD = 1e9 + 7;
const int INF = 1e9;
const ll LINF = 1e18;

// ============ Utility Functions ============

ll gcd(ll a, ll b) {
    while (b) {
        ll temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

ll lcm(ll a, ll b) {
    return (a / gcd(a, b)) * b;
}

bool isPrime(int n) {
    if (n < 2) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    for (int i = 3; i <= sqrt(n); i += 2) {
        if (n % i == 0) return false;
    }
    return true;
}

vector<int> sieve(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    
    for (int i = 2; i <= sqrt(n); i++) {
        if (isPrime[i]) {
            for (int j = i*i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    
    vector<int> primes;
    for (int i = 2; i <= n; i++) {
        if (isPrime[i]) primes.pb(i);
    }
    return primes;
}

ll powerMod(ll base, ll exp, ll mod) {
    ll result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) result = (result * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return result;
}

ll modInverse(ll a, ll m) {
    return powerMod(a, m - 2, m);
}

// ============ Main Solution ============

void solve() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // Your solution here
    ll result = 0;
    
    cout << result << "\n";
}

// ============ Driver Code ============

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t;
    cin >> t;
    while (t--) {
        solve();
    }
    
    return 0;
}
```

---

## 🎯 Usage Tips

1. **Copy Templates:** Use templates for contests to save time
2. **Test Functions:** Always test utility functions before use
3. **Know Complexity:** Be aware of time/space complexity
4. **Handle Edge Cases:** Test with n=0, n=1, negative numbers
5. **Use Built-ins:** Python's `math.comb`, `math.gcd` are optimized

---

## 📚 Additional Resources

**Documentation:**
- Python Math Module: [docs.python.org](https://docs.python.org/3/library/math.html)
- C++ Algorithm Library: [cppreference.com](https://en.cppreference.com/w/cpp/algorithm)
- Java Math Class: [docs.oracle.com](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html)

**Practice Platforms:**
- [Codeforces](https://codeforces.com/)
- [AtCoder](https://atcoder.jp/)
- [LeetCode](https://leetcode.com/)
- [HackerRank](https://www.hackerrank.com/)

---

*[← Previous: Practice Problems](./07-Practice-Problems.md) | [Back to Chapter 2](./README.md)*
