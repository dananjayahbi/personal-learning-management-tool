# 06. Probability Basics

## 🎯 Learning Objectives

By the end of this module, you will:
- Understand fundamental probability concepts
- Calculate probabilities of events
- Apply conditional probability and Bayes' theorem
- Compute expected values
- Analyze randomized algorithms
- Use probability in algorithm analysis

**Duration:** 1 day (3-4 hours)  
**Difficulty:** Beginner to Intermediate

---

## 📚 Table of Contents

1. [Probability Fundamentals](#1-probability-fundamentals)
2. [Conditional Probability](#2-conditional-probability)
3. [Expected Value and Variance](#3-expected-value-and-variance)
4. [Applications in Algorithms](#4-applications-in-algorithms)
5. [Randomized Algorithms](#5-randomized-algorithms)
6. [Practice Problems](#6-practice-problems)

---

## 1. Probability Fundamentals

### Basic Concepts

**Experiment:** An action with uncertain outcome  
**Sample Space (S):** Set of all possible outcomes  
**Event (E):** Subset of sample space  
**Probability:** P(E) = (favorable outcomes) / (total outcomes)

### Classic Probability Formula

```
P(E) = |E| / |S|

where:
  |E| = number of outcomes in event E
  |S| = total number of outcomes
  0 ≤ P(E) ≤ 1
```

### Examples

**Example 1: Rolling a Die**
```
Sample Space: S = {1, 2, 3, 4, 5, 6}
Event E: Rolling an even number = {2, 4, 6}

P(E) = |E| / |S| = 3 / 6 = 1/2
```

**Example 2: Drawing a Card**
```
Sample Space: 52 cards
Event E: Drawing an Ace

P(E) = 4 / 52 = 1/13
```

**Example 3: Binary String**
```
Problem: Random 3-bit binary string. P(at least one 1)?

Sample Space: {000, 001, 010, 011, 100, 101, 110, 111}
|S| = 8

Event E: At least one 1 = {001, 010, 011, 100, 101, 110, 111}
|E| = 7

P(E) = 7/8

Alternative: P(at least one 1) = 1 - P(all zeros) = 1 - 1/8 = 7/8
```

### Probability Rules

1. **Complement Rule:**
   ```
   P(not E) = 1 - P(E)
   P(E) + P(not E) = 1
   ```

2. **Addition Rule (Mutually Exclusive):**
   ```
   If E₁ and E₂ cannot occur simultaneously:
   P(E₁ or E₂) = P(E₁) + P(E₂)
   
   Example: P(rolling 2 or 3) = P(2) + P(3) = 1/6 + 1/6 = 1/3
   ```

3. **General Addition Rule:**
   ```
   P(E₁ or E₂) = P(E₁) + P(E₂) - P(E₁ and E₂)
   
   Example: P(King or Heart) = P(King) + P(Heart) - P(King of Hearts)
                              = 4/52 + 13/52 - 1/52 = 16/52
   ```

4. **Multiplication Rule (Independent Events):**
   ```
   If E₁ and E₂ are independent:
   P(E₁ and E₂) = P(E₁) × P(E₂)
   
   Example: P(heads twice) = P(heads) × P(heads) = 1/2 × 1/2 = 1/4
   ```

### Code Implementation

**Python:**
```python
from fractions import Fraction

def probability(favorable, total):
    """Calculate probability as fraction"""
    return Fraction(favorable, total)

def complement(p):
    """P(not E) = 1 - P(E)"""
    return 1 - p

def prob_or_exclusive(p1, p2):
    """P(E1 or E2) for mutually exclusive events"""
    return p1 + p2

def prob_or_general(p1, p2, p_both):
    """P(E1 or E2) general case"""
    return p1 + p2 - p_both

def prob_and_independent(p1, p2):
    """P(E1 and E2) for independent events"""
    return p1 * p2

# Examples
print(f"P(even die roll) = {probability(3, 6)}")  # 1/2
print(f"P(not even) = {complement(Fraction(1, 2))}")  # 1/2
print(f"P(2 or 3) = {prob_or_exclusive(Fraction(1,6), Fraction(1,6))}")  # 1/3
print(f"P(2 heads) = {prob_and_independent(0.5, 0.5)}")  # 0.25
```

---

## 2. Conditional Probability

### Definition

**Conditional Probability:** P(A|B) = probability of A given that B has occurred.

```
P(A|B) = P(A and B) / P(B)

where P(B) > 0
```

### Examples

**Example 1: Card Drawing**
```
Deck of 52 cards. Draw 2 cards without replacement.
P(2nd card is Ace | 1st card is Ace)?

After drawing one Ace:
- Remaining cards: 51
- Remaining Aces: 3

P(2nd Ace | 1st Ace) = 3/51 = 1/17
```

**Example 2: Disease Testing**
```
Disease prevalence: 1% (P(D) = 0.01)
Test accuracy: 99% (P(positive | disease) = 0.99)
False positive: 5% (P(positive | no disease) = 0.05)

P(disease | positive test) = ?

Use Bayes' Theorem (see next section)
```

### Independent Events

**Definition:** Events A and B are independent if:
```
P(A|B) = P(A)
or equivalently:
P(A and B) = P(A) × P(B)
```

**Examples of Independent Events:**
- Rolling die twice: outcome of first doesn't affect second
- Flipping coins: each flip independent

**Examples of Dependent Events:**
- Drawing cards without replacement
- Balls from urn without replacement

### Bayes' Theorem

**Formula:**
```
P(A|B) = P(B|A) × P(A) / P(B)

Expanded form:
P(A|B) = P(B|A) × P(A) / [P(B|A)×P(A) + P(B|not A)×P(not A)]
```

**Disease Testing Example (solved):**
```
Given:
P(D) = 0.01
P(+|D) = 0.99
P(+|not D) = 0.05

Find: P(D|+)

P(D|+) = P(+|D) × P(D) / [P(+|D)×P(D) + P(+|not D)×P(not D)]
       = 0.99 × 0.01 / [0.99×0.01 + 0.05×0.99]
       = 0.0099 / [0.0099 + 0.0495]
       = 0.0099 / 0.0594
       ≈ 0.167 or 16.7%

Only 16.7% chance of actually having disease despite positive test!
```

### Code Implementation

```python
def conditional_probability(p_a_and_b, p_b):
    """P(A|B) = P(A and B) / P(B)"""
    if p_b == 0:
        return None
    return p_a_and_b / p_b

def bayes_theorem(p_b_given_a, p_a, p_b):
    """P(A|B) = P(B|A) × P(A) / P(B)"""
    return (p_b_given_a * p_a) / p_b

def bayes_expanded(p_b_given_a, p_a, p_b_given_not_a):
    """Full Bayes' theorem"""
    p_not_a = 1 - p_a
    numerator = p_b_given_a * p_a
    denominator = p_b_given_a * p_a + p_b_given_not_a * p_not_a
    return numerator / denominator

# Disease example
p_disease = 0.01
p_pos_given_disease = 0.99
p_pos_given_no_disease = 0.05

result = bayes_expanded(p_pos_given_disease, p_disease, p_pos_given_no_disease)
print(f"P(disease | positive) = {result:.4f} or {result*100:.2f}%")
```

---

## 3. Expected Value and Variance

### Expected Value (Mean)

**Definition:** The average outcome if experiment repeated many times.

```
E[X] = Σ (x × P(x))  for all possible values x

or for continuous:
E[X] = ∫ x × f(x) dx
```

**Examples:**

**Example 1: Rolling a Die**
```
E[X] = 1×(1/6) + 2×(1/6) + 3×(1/6) + 4×(1/6) + 5×(1/6) + 6×(1/6)
     = (1+2+3+4+5+6)/6
     = 21/6
     = 3.5
```

**Example 2: Lottery Game**
```
Cost: $1
Prizes:
  $100 with probability 0.001
  $10 with probability 0.01
  $0 otherwise

E[gain] = -1 + 100×0.001 + 10×0.01 + 0×0.989
        = -1 + 0.1 + 0.1
        = -0.8

Expected loss: $0.80 per game
```

**Example 3: Geometric Distribution (Coin Flips)**
```
E[flips until heads] = ?

P(1 flip) = 1/2          → 1 × 1/2 = 0.5
P(2 flips) = 1/4         → 2 × 1/4 = 0.5
P(3 flips) = 1/8         → 3 × 1/8 = 0.375
...

E[X] = Σ k × (1/2)^k = 2  (using geometric series)
```

### Variance and Standard Deviation

**Variance:** Measure of spread around the mean.

```
Var(X) = E[(X - E[X])²]
       = E[X²] - (E[X])²

Standard Deviation:
σ = √Var(X)
```

**Example: Die Roll**
```
E[X] = 3.5 (from above)
E[X²] = 1²×(1/6) + 2²×(1/6) + 3²×(1/6) + 4²×(1/6) + 5²×(1/6) + 6²×(1/6)
      = (1+4+9+16+25+36)/6
      = 91/6

Var(X) = E[X²] - (E[X])²
       = 91/6 - (3.5)²
       = 15.167 - 12.25
       = 2.917

σ = √2.917 ≈ 1.71
```

### Properties of Expected Value

```
1. E[aX + b] = aE[X] + b
2. E[X + Y] = E[X] + E[Y]  (always true!)
3. E[XY] = E[X] × E[Y]     (only if independent)
```

### Code Implementation

```python
def expected_value(values, probabilities):
    """Calculate E[X]"""
    return sum(v * p for v, p in zip(values, probabilities))

def variance(values, probabilities):
    """Calculate Var(X)"""
    exp_x = expected_value(values, probabilities)
    exp_x2 = expected_value([v**2 for v in values], probabilities)
    return exp_x2 - exp_x**2

def std_deviation(values, probabilities):
    """Calculate standard deviation"""
    return variance(values, probabilities) ** 0.5

# Die roll example
values = [1, 2, 3, 4, 5, 6]
probs = [1/6] * 6

print(f"E[die] = {expected_value(values, probs)}")  # 3.5
print(f"Var(die) = {variance(values, probs):.3f}")  # 2.917
print(f"σ(die) = {std_deviation(values, probs):.3f}")  # 1.708

# Lottery example
lottery_gains = [-1, 99, 9]  # Net gain after $1 cost
lottery_probs = [0.989, 0.001, 0.01]
print(f"E[lottery] = ${expected_value(lottery_gains, lottery_probs):.2f}")  # -$0.80
```

---

## 4. Applications in Algorithms

### Average-Case Analysis

**Linear Search:**
```python
def linear_search(arr, target):
    """Returns index or -1"""
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

# Analysis:
# Best case: O(1) - target at first position
# Worst case: O(n) - target at last or not present
# Average case: ?

# If target equally likely at any position:
# E[comparisons] = (1 + 2 + 3 + ... + n) / n
#                = n(n+1)/(2n)
#                = (n+1)/2
#                ≈ n/2
# Still O(n) but half the comparisons on average
```

### Quicksort Average Case

```python
# Quicksort:
# Best case: O(n log n) - pivot always median
# Worst case: O(n²) - pivot always min/max
# Average case: O(n log n) - random pivots

# With random pivot selection:
# E[comparisons] = 1.39 n log n  (proven)
```

### Hash Table Collisions

```python
import random

def hash_collision_probability(n_keys, table_size):
    """
    Expected collisions when inserting n_keys into hash table
    Birthday paradox problem
    """
    if n_keys == 0:
        return 0
    
    # Approximate formula
    expected = n_keys - table_size * (1 - (1 - 1/table_size) ** n_keys)
    return expected

# Examples
print(f"100 keys, 1000 buckets: {hash_collision_probability(100, 1000):.2f} collisions")
print(f"100 keys, 100 buckets: {hash_collision_probability(100, 100):.2f} collisions")
```

### Coupon Collector Problem

**Problem:** n different coupons. How many coupons to collect to get all n?

**Answer:**
```
E[coupons] = n × (1/n + 1/(n-1) + ... + 1/2 + 1/1)
           = n × H_n
           ≈ n × ln(n)

where H_n is the n-th harmonic number
```

**Example:**
```python
def harmonic_number(n):
    """Calculate H_n = 1 + 1/2 + 1/3 + ... + 1/n"""
    return sum(1/i for i in range(1, n+1))

def expected_coupons(n):
    """Expected coupons to collect all n types"""
    return n * harmonic_number(n)

# Examples
for n in [10, 50, 100]:
    exp = expected_coupons(n)
    print(f"{n} coupon types: E[collection] = {exp:.1f} ≈ {n*math.log(n):.1f}")

# Output:
# 10 coupon types: E[collection] = 29.3 ≈ 23.0
# 50 coupon types: E[collection] = 224.5 ≈ 195.6
# 100 coupon types: E[collection] = 518.7 ≈ 460.5
```

---

## 5. Randomized Algorithms

### Las Vegas vs Monte Carlo

**Las Vegas Algorithms:**
- Always correct
- Random running time
- Example: Randomized QuickSort

**Monte Carlo Algorithms:**
- May be incorrect
- Fixed running time
- Example: Primality testing

### Randomized QuickSelect

**Problem:** Find k-th smallest element

```python
import random

def randomized_quickselect(arr, k):
    """
    Find k-th smallest element (0-indexed)
    Expected O(n) time
    """
    if len(arr) == 1:
        return arr[0]
    
    # Random pivot
    pivot = random.choice(arr)
    
    # Partition
    left = [x for x in arr if x < pivot]
    mid = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    if k < len(left):
        return randomized_quickselect(left, k)
    elif k < len(left) + len(mid):
        return mid[0]
    else:
        return randomized_quickselect(right, k - len(left) - len(mid))

# Example
arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
print(f"3rd smallest: {randomized_quickselect(arr, 2)}")  # 2
print(f"Median: {randomized_quickselect(arr, len(arr)//2)}")  # 4
```

**Analysis:**
```
Best case: O(n) - lucky pivots
Worst case: O(n²) - unlucky pivots
Expected: O(n) - random pivots
```

### Monte Carlo Primality Test

```python
import random

def miller_rabin(n, k=5):
    """
    Miller-Rabin primality test
    k trials → probability of error < (1/4)^k
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

# Test
print(miller_rabin(97, 5))   # True (probably prime)
print(miller_rabin(100, 5))  # False (composite)

# Error probability: < (1/4)^5 = 1/1024 ≈ 0.1%
```

### Randomized Binary Search (Skip List)

```python
import random

class SkipListNode:
    def __init__(self, value, level):
        self.value = value
        self.forward = [None] * (level + 1)

class SkipList:
    def __init__(self, max_level=16):
        self.max_level = max_level
        self.header = SkipListNode(float('-inf'), max_level)
        self.level = 0
    
    def random_level(self):
        """Random level for new node (geometric distribution)"""
        level = 0
        while random.random() < 0.5 and level < self.max_level:
            level += 1
        return level
    
    # Search, insert, delete methods...
    # Expected O(log n) for all operations
```

---

## 6. Practice Problems

### Easy Problems

1. **Dice:** P(sum = 7) when rolling two dice?

2. **Cards:** P(drawing 2 aces from deck without replacement)?

3. **Coins:** P(at least 1 head in 3 flips)?

4. **Expected Value:** E[X] for X = sum of 2 dice?

5. **Complement:** If P(rain) = 0.3, P(no rain)?

### Medium Problems

6. **Conditional:** Bag has 3 red, 2 blue balls. Draw 2 without replacement. P(2nd red | 1st red)?

7. **Bayes:** Test 95% accurate, disease prevalence 0.1%. P(disease | positive)?

8. **Birthday Paradox:** How many people needed for >50% chance of shared birthday?

9. **Geometric:** E[coin flips until first head]?

10. **Coupon Collector:** Expected number to collect all 10 coupons?

### Hard Problems

11. **Monty Hall:** Analyze the Monty Hall problem using probability.

12. **Random Walk:** Expected steps for drunk walk to reach position +n from 0?

13. **Hashing:** Expected max chain length in hash table with n items and n buckets?

14. **Secretary Problem:** Optimal stopping strategy for hiring best candidate?

15. **Expected Runtime:** Analyze expected runtime of randomized QuickSort.

---

## 🎯 Key Takeaways

1. **Probability** measures likelihood: P(E) = favorable/total
2. **Conditional probability** updates based on new information
3. **Expected value** is the average outcome over many trials
4. **Independence** simplifies calculations: P(A and B) = P(A)×P(B)
5. **Randomized algorithms** often simpler and faster on average
6. **Monte Carlo** methods trade accuracy for speed

---

## 📚 Quick Reference

```python
# Basic Probability
P(E) = |E| / |S|
P(not E) = 1 - P(E)
P(A or B) = P(A) + P(B) - P(A and B)
P(A and B) = P(A) × P(B)  # if independent

# Conditional Probability
P(A|B) = P(A and B) / P(B)
P(A and B) = P(A|B) × P(B)

# Bayes' Theorem
P(A|B) = P(B|A) × P(A) / P(B)

# Expected Value
E[X] = Σ x × P(x)
E[aX + b] = aE[X] + b
Var(X) = E[X²] - (E[X])²
```

---

*[← Previous: Modular Arithmetic](./05-Modular-Arithmetic.md) | [Back to Chapter 2](./README.md) | [Next: Practice Problems →](./07-Practice-Problems.md)*
