# 02. Combinatorics & Counting Principles

## 🎯 Learning Objectives

By the end of this module, you will:
- Master fundamental counting principles
- Calculate permutations and combinations
- Apply the Pigeonhole Principle
- Use the Inclusion-Exclusion Principle
- Understand binomial coefficients and Pascal's triangle
- Solve complex counting problems in algorithms

**Duration:** 1 day (4-6 hours)  
**Difficulty:** Beginner to Intermediate

---

## 📚 Table of Contents

1. [Fundamental Counting Principles](#1-fundamental-counting-principles)
2. [Permutations](#2-permutations)
3. [Combinations](#3-combinations)
4. [Binomial Coefficients & Pascal's Triangle](#4-binomial-coefficients--pascals-triangle)
5. [Pigeonhole Principle](#5-pigeonhole-principle)
6. [Inclusion-Exclusion Principle](#6-inclusion-exclusion-principle)
7. [Practice Problems](#7-practice-problems)

---

## 1. Fundamental Counting Principles

### The Rule of Sum (Addition Principle)

**Principle:** If there are `m` ways to do task A and `n` ways to do task B, and **tasks cannot be done simultaneously**, then there are `m + n` ways to do either task.

**Example 1:**
```
Problem: You can travel from City X to City Y by:
- 3 different trains, OR
- 2 different buses

Total ways = 3 + 2 = 5 ways
```

**Example 2:**
```
Problem: How many ways to choose one vowel from the alphabet?
Vowels: {a, e, i, o, u}
Answer: 5 ways
```

### The Rule of Product (Multiplication Principle)

**Principle:** If there are `m` ways to do task A and `n` ways to do task B, and **both tasks must be done**, then there are `m × n` ways to do both tasks.

**Example 1:**
```
Problem: You need to travel from City X to City Y to City Z
- X to Y: 3 routes
- Y to Z: 4 routes

Total ways = 3 × 4 = 12 ways
```

**Example 2:**
```
Problem: How many 3-digit numbers can be formed using digits {1,2,3,4,5}?
(with repetition allowed)

Position 1: 5 choices
Position 2: 5 choices
Position 3: 5 choices

Answer: 5 × 5 × 5 = 125
```

### Code Implementation

**Python:**
```python
def count_passwords(char_types, length):
    """
    Count passwords of given length
    char_types: list of number of choices for each position
    """
    from functools import reduce
    import operator
    
    # Product rule
    total = reduce(operator.mul, char_types, 1)
    return total ** length if len(char_types) == 1 else total

# Example: 8-char password with 26 lowercase + 26 uppercase + 10 digits
choices = 26 + 26 + 10  # 62
length = 8
print(f"Total passwords: {choices ** length}")  # 218,340,105,584,896
```

---

## 2. Permutations

### What are Permutations?

**Permutation:** An arrangement of objects where **order matters**.

### Formula: P(n, r) or nPr

**Number of ways to arrange r objects from n objects:**
```
P(n, r) = n! / (n - r)!

where n! = n × (n-1) × (n-2) × ... × 2 × 1
```

**Special Case:** P(n, n) = n!

### Examples

**Example 1: Arranging Books**
```
Problem: How many ways can you arrange 3 books from 5 books on a shelf?

Solution:
n = 5, r = 3
P(5, 3) = 5! / (5-3)! = 5! / 2! = (5 × 4 × 3 × 2 × 1) / (2 × 1) = 60
```

**Example 2: Race Positions**
```
Problem: In a race with 10 runners, how many ways can gold, silver, 
         and bronze be awarded?

Solution:
n = 10, r = 3
P(10, 3) = 10! / 7! = 10 × 9 × 8 = 720
```

### Permutations with Repetition

**Formula:** If there are n objects with `n₁` of type 1, `n₂` of type 2, ..., `nₖ` of type k:
```
P = n! / (n₁! × n₂! × ... × nₖ!)
```

**Example: MISSISSIPPI**
```
Problem: How many distinct arrangements of "MISSISSIPPI"?

Solution:
Total letters: 11
M: 1, I: 4, S: 4, P: 2

P = 11! / (1! × 4! × 4! × 2!)
  = 39,916,800 / (1 × 24 × 24 × 2)
  = 34,650
```

### Circular Permutations

**Formula:** Arrangements in a circle = (n - 1)!

**Example: Round Table**
```
Problem: How many ways can 6 people sit around a circular table?

Solution:
(6 - 1)! = 5! = 120
```

**Note:** If clockwise and counterclockwise are the same, divide by 2: (n-1)!/2

### Code Implementation

**Python:**
```python
import math

def permutation(n, r):
    """Calculate P(n, r) = n! / (n-r)!"""
    return math.factorial(n) // math.factorial(n - r)

def permutation_with_repetition(total, *repetitions):
    """
    Calculate permutations with repeated elements
    total: total number of objects
    repetitions: counts of each repeated element
    """
    numerator = math.factorial(total)
    denominator = 1
    for count in repetitions:
        denominator *= math.factorial(count)
    return numerator // denominator

def circular_permutation(n):
    """Arrangements in a circle"""
    return math.factorial(n - 1)

# Examples
print(f"P(5, 3) = {permutation(5, 3)}")  # 60
print(f"MISSISSIPPI arrangements: {permutation_with_repetition(11, 1, 4, 4, 2)}")  # 34,650
print(f"6 people around table: {circular_permutation(6)}")  # 120
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

int main() {
    cout << "P(5, 3) = " << permutation(5, 3) << endl;  // 60
    return 0;
}
```

---

## 3. Combinations

### What are Combinations?

**Combination:** A selection of objects where **order does NOT matter**.

### Formula: C(n, r) or nCr or "n choose r"

**Number of ways to choose r objects from n objects:**
```
C(n, r) = n! / (r! × (n - r)!)
       = P(n, r) / r!
```

**Properties:**
```
C(n, 0) = 1
C(n, 1) = n
C(n, n) = 1
C(n, r) = C(n, n-r)
```

### Examples

**Example 1: Choosing Committee**
```
Problem: Choose 3 people from 10 for a committee

Solution:
n = 10, r = 3
C(10, 3) = 10! / (3! × 7!)
         = (10 × 9 × 8) / (3 × 2 × 1)
         = 720 / 6
         = 120
```

**Example 2: Pizza Toppings**
```
Problem: Choose 4 toppings from 12 available toppings

Solution:
C(12, 4) = 12! / (4! × 8!)
         = (12 × 11 × 10 × 9) / (4 × 3 × 2 × 1)
         = 11,880 / 24
         = 495
```

### Permutations vs Combinations

| Problem | Type | Formula | Answer |
|---------|------|---------|--------|
| Choose 3 books from 5 to arrange on shelf | Permutation | P(5,3) | 60 |
| Choose 3 books from 5 to read (any order) | Combination | C(5,3) | 10 |
| Pick top 3 winners from 10 contestants | Permutation | P(10,3) | 720 |
| Pick any 3 contestants from 10 for team | Combination | C(10,3) | 120 |

**Key Difference:**
```
Permutation: ABC, ACB, BAC, BCA, CAB, CBA are all different
Combination: ABC = ACB = BAC = BCA = CAB = CBA (all same)
```

### Combinations with Repetition

**Formula:** Choose r objects from n types with repetition allowed:
```
C_rep(n, r) = C(n + r - 1, r) = (n + r - 1)! / (r! × (n - 1)!)
```

**Example: Ice Cream Scoops**
```
Problem: Choose 3 scoops from 5 flavors (repetition allowed)

Solution:
C_rep(5, 3) = C(5 + 3 - 1, 3) = C(7, 3) = 35
```

### Code Implementation

**Python:**
```python
import math

def combination(n, r):
    """Calculate C(n, r) = n! / (r! × (n-r)!)"""
    return math.factorial(n) // (math.factorial(r) * math.factorial(n - r))

def combination_efficient(n, r):
    """More efficient calculation avoiding large factorials"""
    if r > n - r:  # Take advantage of C(n, r) = C(n, n-r)
        r = n - r
    
    result = 1
    for i in range(r):
        result *= (n - i)
        result //= (i + 1)
    return result

def combination_with_repetition(n, r):
    """Choose r from n types with repetition"""
    return combination(n + r - 1, r)

# Examples
print(f"C(10, 3) = {combination(10, 3)}")  # 120
print(f"C(52, 5) = {combination_efficient(52, 5)}")  # 2,598,960 (poker hands)
print(f"C_rep(5, 3) = {combination_with_repetition(5, 3)}")  # 35

# Using Python's built-in
from math import comb
print(f"Using built-in: C(10, 3) = {comb(10, 3)}")  # 120
```

**Java:**
```java
public class Combinatorics {
    public static long factorial(int n) {
        long result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
    
    public static long combination(int n, int r) {
        return factorial(n) / (factorial(r) * factorial(n - r));
    }
    
    public static long combinationEfficient(int n, int r) {
        if (r > n - r) {
            r = n - r;
        }
        
        long result = 1;
        for (int i = 0; i < r; i++) {
            result *= (n - i);
            result /= (i + 1);
        }
        return result;
    }
    
    public static void main(String[] args) {
        System.out.println("C(10, 3) = " + combination(10, 3));  // 120
    }
}
```

---

## 4. Binomial Coefficients & Pascal's Triangle

### Binomial Coefficients

The binomial coefficient C(n, r) appears in the binomial theorem:

```
(x + y)ⁿ = Σ C(n, k) × x^(n-k) × y^k  (for k = 0 to n)
```

**Example:**
```
(x + y)³ = C(3,0)x³ + C(3,1)x²y + C(3,2)xy² + C(3,3)y³
         = 1x³ + 3x²y + 3xy² + 1y³
```

### Pascal's Triangle

```
                1
              1   1
            1   2   1
          1   3   3   1
        1   4   6   4   1
      1   5  10  10   5   1
    1   6  15  20  15   6   1
```

**Property:** Each number is the sum of the two numbers above it.
```
C(n, r) = C(n-1, r-1) + C(n-1, r)
```

**Applications:**
- Fast computation of binomial coefficients
- Dynamic programming foundation
- Combinatorial identities

### Code Implementation

**Python:**
```python
def generate_pascals_triangle(n):
    """Generate first n rows of Pascal's triangle"""
    triangle = [[1]]
    
    for i in range(1, n):
        row = [1]
        for j in range(1, i):
            row.append(triangle[i-1][j-1] + triangle[i-1][j])
        row.append(1)
        triangle.append(row)
    
    return triangle

def print_pascals_triangle(n):
    """Pretty print Pascal's triangle"""
    triangle = generate_pascals_triangle(n)
    
    # Calculate max width for formatting
    max_val = max(triangle[-1])
    width = len(str(max_val))
    
    for i, row in enumerate(triangle):
        # Center the row
        spaces = ' ' * (width * (n - i - 1))
        print(spaces + ' '.join(f'{num:{width}}' for num in row))

# Generate and print
print_pascals_triangle(7)

# Get specific coefficient using Pascal's triangle
def binomial_coefficient_dp(n, r):
    """Calculate C(n, r) using dynamic programming"""
    if r > n:
        return 0
    if r == 0 or r == n:
        return 1
    
    # Build Pascal's triangle up to row n
    dp = [[0] * (r + 1) for _ in range(n + 1)]
    
    for i in range(n + 1):
        dp[i][0] = 1
        for j in range(1, min(i, r) + 1):
            dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
    
    return dp[n][r]

print(f"C(10, 3) = {binomial_coefficient_dp(10, 3)}")  # 120
```

---

## 5. Pigeonhole Principle

### Basic Principle

**Statement:** If n items are placed into m containers with n > m, then at least one container must contain more than one item.

**Mathematical Form:**
```
If n objects are distributed into m boxes and n > m,
then at least one box contains ⌈n/m⌉ objects
```

### Examples

**Example 1: Birthday Principle**
```
Problem: In a group of 13 people, prove that at least 2 people 
         share the same birth month.

Solution:
Pigeons: 13 people
Holes: 12 months
13 > 12, so at least 2 people must share a month. ✓
```

**Example 2: Socks in a Drawer**
```
Problem: You have 10 red socks and 10 blue socks in a dark drawer.
         How many socks must you pull to guarantee a matching pair?

Solution:
Holes: 2 colors (red, blue)
Pull 3 socks (pigeons)
By pigeonhole principle, at least 2 must be the same color. ✓
Answer: 3 socks
```

**Example 3: Handshakes**
```
Problem: In a party of 50 people, prove that at least 2 people
         shook hands with the same number of people.

Solution:
Each person can shake hands with 0 to 49 people (50 possibilities)
But if someone shook 49 hands (everyone), no one shook 0 hands
So possible values: either 0-48 or 1-49 (49 possibilities)
With 50 people and 49 possibilities, at least 2 people must
have shaken the same number of hands. ✓
```

### Generalized Pigeonhole Principle

If n objects are distributed into m boxes, then:
- At least one box contains **at least** ⌈n/m⌉ objects, OR
- At least one box contains **at most** ⌊n/m⌋ objects

**Example:**
```
Problem: Distribute 100 students into 30 classrooms.

Solution:
⌈100/30⌉ = ⌈3.33⌉ = 4
At least one classroom has ≥ 4 students.
```

### Applications in CS

**Hash Collisions:**
```python
def pigeonhole_hash_collision(num_keys, table_size):
    """
    Prove that with enough keys, hash collisions are inevitable
    """
    if num_keys > table_size:
        min_collision_bucket = (num_keys + table_size - 1) // table_size
        return f"At least one bucket has {min_collision_bucket} keys"
    return "No collision guaranteed"

print(pigeonhole_hash_collision(100, 30))  # At least one bucket has 4 keys
```

---

## 6. Inclusion-Exclusion Principle

### Basic Principle

**For Two Sets:**
```
|A ∪ B| = |A| + |B| - |A ∩ B|
```

**For Three Sets:**
```
|A ∪ B ∪ C| = |A| + |B| + |C|
             - |A ∩ B| - |A ∩ C| - |B ∩ C|
             + |A ∩ B ∩ C|
```

**General Form (n sets):**
```
|A₁ ∪ A₂ ∪ ... ∪ Aₙ| = Σ|Aᵢ| - Σ|Aᵢ ∩ Aⱼ| + Σ|Aᵢ ∩ Aⱼ ∩ Aₖ| - ... + (-1)^(n+1)|A₁ ∩ A₂ ∩ ... ∩ Aₙ|
```

### Examples

**Example 1: Course Enrollment**
```
Problem: 
- 50 students taking Math
- 40 students taking Physics  
- 20 students taking both
How many students taking at least one course?

Solution:
|M ∪ P| = |M| + |P| - |M ∩ P|
        = 50 + 40 - 20
        = 70 students
```

**Example 2: Programming Languages**
```
Problem:
- 100 developers surveyed
- 60 know Python
- 50 know JavaScript
- 40 know Java
- 30 know both Python and JavaScript
- 20 know both Python and Java
- 15 know both JavaScript and Java
- 10 know all three
How many know at least one language?

Solution:
|P ∪ J ∪ JV| = 60 + 50 + 40 - 30 - 20 - 15 + 10 = 95 developers
```

### Derangements

**Problem:** How many permutations of n objects where no object is in its original position?

**Formula:**
```
D(n) = n! × Σ((-1)^k / k!)  for k = 0 to n
     ≈ n! / e  (for large n)

D(0) = 1
D(1) = 0
D(2) = 1
D(3) = 2
D(4) = 9
```

**Example: Secret Santa**
```
Problem: 5 people exchange gifts. No one can get their own name.
         How many ways?

Solution:
D(5) = 5! × (1 - 1/1! + 1/2! - 1/3! + 1/4! - 1/5!)
     = 120 × (1 - 1 + 0.5 - 0.1667 + 0.0417 - 0.0083)
     = 120 × 0.3667
     = 44
```

### Code Implementation

**Python:**
```python
def inclusion_exclusion_two_sets(a, b, both):
    """Calculate |A ∪ B|"""
    return a + b - both

def inclusion_exclusion_three_sets(a, b, c, ab, ac, bc, abc):
    """Calculate |A ∪ B ∪ C|"""
    return a + b + c - ab - ac - bc + abc

def derangements(n):
    """Calculate number of derangements of n objects"""
    if n == 0:
        return 1
    if n == 1:
        return 0
    
    # D(n) = (n-1) × [D(n-1) + D(n-2)]
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 0
    
    for i in range(2, n + 1):
        dp[i] = (i - 1) * (dp[i - 1] + dp[i - 2])
    
    return dp[n]

def derangements_formula(n):
    """Calculate using formula with factorials"""
    import math
    result = 0
    fact_n = math.factorial(n)
    
    for k in range(n + 1):
        result += fact_n * ((-1) ** k) // math.factorial(k)
    
    return result

# Examples
print(f"Students in Math or Physics: {inclusion_exclusion_two_sets(50, 40, 20)}")  # 70
print(f"Developers knowing languages: {inclusion_exclusion_three_sets(60, 50, 40, 30, 20, 15, 10)}")  # 95
print(f"Secret Santa (5 people): {derangements(5)}")  # 44
print(f"Derangements of 10: {derangements_formula(10)}")  # 1,334,961
```

---

## 7. Practice Problems

### Easy Problems

1. **Sum Rule:** You can choose a dessert OR a drink. 8 desserts, 5 drinks. How many choices?

2. **Product Rule:** Password has 3 letters (A-Z) then 2 digits (0-9). How many passwords?

3. **Permutations:** How many ways to arrange the word "CAT"?

4. **Combinations:** Choose 2 friends from 6 to invite. How many ways?

5. **Pigeonhole:** 7 socks (4 black, 3 white) in dark. How many to guarantee matching pair?

### Medium Problems

6. **Committee:** From 10 people (6 men, 4 women), form 5-person committee with at least 2 women.

7. **Permutations with Repetition:** Arrangements of "BOOKKEEPER"?

8. **Inclusion-Exclusion:** 100 students: 45 play soccer, 40 play basketball, 30 play tennis, 15 play soccer and basketball, 12 play soccer and tennis, 10 play basketball and tennis, 5 play all three. How many play at least one sport?

9. **Pascal's Triangle:** Find C(8, 3) using Pascal's triangle method.

10. **Derangements:** 4 letters mailed to 4 people. How many ways all get wrong letter?

### Hard Problems

11. **Poker Hands:** Calculate number of possible:
    - a) Straight flush
    - b) Four of a kind
    - c) Full house

12. **Graph Coloring:** Prove using pigeonhole: In any group of 6 people, either 3 are mutual friends or 3 are mutual strangers.

13. **Advanced Counting:** How many 10-digit binary strings with exactly 4 ones?

14. **Complex Inclusion-Exclusion:** Find integers from 1-1000 not divisible by 2, 3, or 5.

15. **Catalan Numbers:** Prove that the number of ways to parenthesize n+1 factors is the n-th Catalan number: C_n = C(2n, n)/(n+1)

---

## 🎯 Key Takeaways

1. **Counting principles** (sum and product) are fundamental building blocks
2. **Permutations** count arrangements (order matters): P(n,r) = n!/(n-r)!
3. **Combinations** count selections (order doesn't matter): C(n,r) = n!/(r!(n-r)!)
4. **Pascal's triangle** provides efficient way to compute binomial coefficients
5. **Pigeonhole principle** guarantees distribution properties
6. **Inclusion-exclusion** handles overlapping sets correctly

---

## 📚 Quick Reference

```
Permutation:     P(n, r) = n! / (n-r)!
Combination:     C(n, r) = n! / (r! × (n-r)!)
Relation:        P(n, r) = r! × C(n, r)

Pascal's:        C(n, r) = C(n-1, r-1) + C(n-1, r)
Properties:      C(n, r) = C(n, n-r)
                 C(n, 0) = C(n, n) = 1

Derangements:    D(n) = (n-1) × [D(n-1) + D(n-2)]
```

---

*[← Previous: Discrete Math](./01-Discrete-Mathematics.md) | [Back to Chapter 2](./README.md) | [Next: Number Theory →](./03-Number-Theory.md)*
