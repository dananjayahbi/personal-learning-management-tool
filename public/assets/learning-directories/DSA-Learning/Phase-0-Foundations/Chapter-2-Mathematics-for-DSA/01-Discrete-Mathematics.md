# 01. Discrete Mathematics Essentials

## 🎯 Learning Objectives

By the end of this module, you will:
- Understand fundamental set theory and operations
- Apply Boolean algebra and logical operators
- Write mathematical proofs using various techniques
- Work with relations and functions
- Recognize and analyze sequences and series

**Duration:** 1 day (4-6 hours)  
**Difficulty:** Beginner to Intermediate

---

## 📚 Table of Contents

1. [Sets and Set Operations](#1-sets-and-set-operations)
2. [Logic and Boolean Algebra](#2-logic-and-boolean-algebra)
3. [Mathematical Proofs](#3-mathematical-proofs)
4. [Relations and Functions](#4-relations-and-functions)
5. [Sequences and Series](#5-sequences-and-series)
6. [Practice Problems](#6-practice-problems)

---

## 1. Sets and Set Operations

### What is a Set?

A **set** is a collection of distinct objects, considered as an object in its own right. Sets are fundamental to mathematics and computer science.

**Notation:**
- Set: `A = {1, 2, 3, 4, 5}`
- Element of: `3 ∈ A` (3 is in set A)
- Not element of: `6 ∉ A` (6 is not in set A)
- Empty set: `∅` or `{}`
- Universal set: `U` (all possible elements)

### Types of Sets

1. **Finite Set:** Has a countable number of elements
   - `A = {1, 2, 3}` (3 elements)

2. **Infinite Set:** Has uncountably many elements
   - `N = {1, 2, 3, 4, ...}` (natural numbers)

3. **Subset:** All elements of A are in B
   - `A ⊆ B` means A is a subset of B
   - Example: `{1, 2} ⊆ {1, 2, 3, 4}`

4. **Power Set:** Set of all subsets
   - If `A = {1, 2}`, then `P(A) = {∅, {1}, {2}, {1, 2}}`
   - Size: `|P(A)| = 2^|A|`

### Set Operations

#### 1. Union (∪)
Combines all elements from both sets (no duplicates).

```
A = {1, 2, 3}
B = {3, 4, 5}
A ∪ B = {1, 2, 3, 4, 5}
```

**Properties:**
- Commutative: `A ∪ B = B ∪ A`
- Associative: `(A ∪ B) ∪ C = A ∪ (B ∪ C)`
- Identity: `A ∪ ∅ = A`

#### 2. Intersection (∩)
Elements common to both sets.

```
A = {1, 2, 3}
B = {2, 3, 4}
A ∩ B = {2, 3}
```

**Properties:**
- Commutative: `A ∩ B = B ∩ A`
- Associative: `(A ∩ B) ∩ C = A ∩ (B ∩ C)`
- Identity: `A ∩ U = A`

#### 3. Difference (-)
Elements in A but not in B.

```
A = {1, 2, 3, 4}
B = {3, 4, 5}
A - B = {1, 2}
```

**Note:** `A - B ≠ B - A` (not commutative)

#### 4. Complement (A' or Ā)
All elements in the universal set U but not in A.

```
U = {1, 2, 3, 4, 5}
A = {1, 2, 3}
A' = {4, 5}
```

#### 5. Symmetric Difference (⊕)
Elements in either A or B but not in both.

```
A = {1, 2, 3}
B = {2, 3, 4}
A ⊕ B = {1, 4}
```

**Formula:** `A ⊕ B = (A - B) ∪ (B - A)`

### Cardinality and Venn Diagrams

**Cardinality:** The number of elements in a set, denoted `|A|`.

**Venn Diagram Formulas:**
```
|A ∪ B| = |A| + |B| - |A ∩ B|

|A ∪ B ∪ C| = |A| + |B| + |C| 
              - |A ∩ B| - |A ∩ C| - |B ∩ C| 
              + |A ∩ B ∩ C|
```

### Code Implementation

**Python:**
```python
# Set operations in Python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# Union
print(A | B)  # {1, 2, 3, 4, 5, 6}
print(A.union(B))

# Intersection
print(A & B)  # {3, 4}
print(A.intersection(B))

# Difference
print(A - B)  # {1, 2}
print(A.difference(B))

# Symmetric Difference
print(A ^ B)  # {1, 2, 5, 6}
print(A.symmetric_difference(B))

# Subset check
print({1, 2}.issubset(A))  # True

# Superset check
print(A.issuperset({1, 2}))  # True
```

**C++:**
```cpp
#include <set>
#include <algorithm>
#include <iostream>
using namespace std;

int main() {
    set<int> A = {1, 2, 3, 4};
    set<int> B = {3, 4, 5, 6};
    set<int> result;
    
    // Union
    set_union(A.begin(), A.end(), B.begin(), B.end(),
              inserter(result, result.begin()));
    
    // Intersection
    result.clear();
    set_intersection(A.begin(), A.end(), B.begin(), B.end(),
                     inserter(result, result.begin()));
    
    // Difference
    result.clear();
    set_difference(A.begin(), A.end(), B.begin(), B.end(),
                   inserter(result, result.begin()));
    
    return 0;
}
```

---

## 2. Logic and Boolean Algebra

### Logical Operators

#### Basic Operators

1. **AND (∧)** - Conjunction
   ```
   T ∧ T = T
   T ∧ F = F
   F ∧ T = F
   F ∧ F = F
   ```

2. **OR (∨)** - Disjunction
   ```
   T ∨ T = T
   T ∨ F = T
   F ∨ T = T
   F ∨ F = F
   ```

3. **NOT (¬)** - Negation
   ```
   ¬T = F
   ¬F = T
   ```

4. **XOR (⊕)** - Exclusive OR
   ```
   T ⊕ T = F
   T ⊕ F = T
   F ⊕ T = T
   F ⊕ F = F
   ```

5. **IMPLIES (→)** - Implication
   ```
   T → T = T
   T → F = F
   F → T = T
   F → F = T
   ```

6. **IFF (↔)** - If and only if (Biconditional)
   ```
   T ↔ T = T
   T ↔ F = F
   F ↔ T = F
   F ↔ F = T
   ```

### Truth Tables

A truth table lists all possible combinations of inputs and their corresponding outputs.

**Example: (A ∧ B) ∨ (¬A)**

| A | B | A ∧ B | ¬A | (A ∧ B) ∨ (¬A) |
|---|---|-------|----|--------------:|
| T | T | T     | F  | T             |
| T | F | F     | F  | F             |
| F | T | F     | T  | T             |
| F | F | F     | T  | T             |

### De Morgan's Laws

Two fundamental laws for simplifying logical expressions:

1. **¬(A ∧ B) = ¬A ∨ ¬B**
   - NOT (A AND B) = (NOT A) OR (NOT B)

2. **¬(A ∨ B) = ¬A ∧ ¬B**
   - NOT (A OR B) = (NOT A) AND (NOT B)

**Applications in Programming:**
```python
# Instead of: not (x > 5 and y < 10)
# Use: x <= 5 or y >= 10

# Instead of: not (x == 0 or y == 0)
# Use: x != 0 and y != 0
```

### Boolean Algebra Laws

1. **Identity Laws:**
   - `A ∧ T = A`
   - `A ∨ F = A`

2. **Domination Laws:**
   - `A ∧ F = F`
   - `A ∨ T = T`

3. **Idempotent Laws:**
   - `A ∧ A = A`
   - `A ∨ A = A`

4. **Complement Laws:**
   - `A ∧ ¬A = F`
   - `A ∨ ¬A = T`

5. **Distributive Laws:**
   - `A ∧ (B ∨ C) = (A ∧ B) ∨ (A ∧ C)`
   - `A ∨ (B ∧ C) = (A ∨ B) ∧ (A ∨ C)`

### Applications in DSA

**Example 1: Checking Conditions**
```python
# Check if a number is in range [a, b]
def in_range(x, a, b):
    return x >= a and x <= b

# Check if at least one condition is true
def valid_input(x, y):
    return x > 0 or y > 0
```

**Example 2: Bit Manipulation**
```python
# XOR properties
# a ^ a = 0
# a ^ 0 = a
# a ^ b ^ a = b

def find_single_number(nums):
    """Find the number that appears once (others appear twice)"""
    result = 0
    for num in nums:
        result ^= num
    return result
```

---

## 3. Mathematical Proofs

### Why Learn Proofs?

Mathematical proofs help you:
- Verify correctness of algorithms
- Understand why algorithms work
- Develop rigorous thinking
- Communicate ideas precisely

### Types of Proofs

#### 1. Direct Proof

**Structure:**
1. Assume the hypothesis is true
2. Use logical steps and known facts
3. Arrive at the conclusion

**Example:** Prove that if n is even, then n² is even.

**Proof:**
```
Given: n is even
To prove: n² is even

Step 1: If n is even, then n = 2k for some integer k
Step 2: n² = (2k)² = 4k² = 2(2k²)
Step 3: Since 2k² is an integer, n² = 2m where m = 2k²
Step 4: Therefore, n² is even. ∎
```

#### 2. Proof by Contradiction

**Structure:**
1. Assume the conclusion is FALSE
2. Show this leads to a contradiction
3. Therefore, the conclusion must be TRUE

**Example:** Prove that √2 is irrational.

**Proof:**
```
Assume √2 is rational (contradiction assumption)

Step 1: If √2 is rational, then √2 = p/q where p, q are integers
        with no common factors (reduced form)
Step 2: Squaring both sides: 2 = p²/q²
Step 3: Therefore: p² = 2q²
Step 4: This means p² is even, so p must be even
Step 5: Let p = 2k, then (2k)² = 2q²
Step 6: 4k² = 2q², so q² = 2k²
Step 7: This means q² is even, so q must be even
Step 8: But if both p and q are even, they have a common factor of 2
Step 9: This contradicts our assumption that p/q is in reduced form
Step 10: Therefore, √2 is irrational. ∎
```

#### 3. Proof by Mathematical Induction

**Structure:**
1. **Base Case:** Prove the statement for n = 1 (or smallest n)
2. **Inductive Hypothesis:** Assume true for n = k
3. **Inductive Step:** Prove true for n = k+1
4. **Conclusion:** By induction, true for all n ≥ 1

**Example:** Prove that 1 + 2 + 3 + ... + n = n(n+1)/2

**Proof:**
```
Base Case (n = 1):
  LHS = 1
  RHS = 1(1+1)/2 = 1
  LHS = RHS ✓

Inductive Hypothesis:
  Assume true for n = k: 1 + 2 + ... + k = k(k+1)/2

Inductive Step (prove for n = k+1):
  LHS = 1 + 2 + ... + k + (k+1)
      = k(k+1)/2 + (k+1)           [by hypothesis]
      = k(k+1)/2 + 2(k+1)/2
      = (k(k+1) + 2(k+1))/2
      = (k+1)(k+2)/2
      = (k+1)((k+1)+1)/2
  
  This matches the formula for n = k+1 ✓

Conclusion:
  By mathematical induction, the formula holds for all n ≥ 1. ∎
```

### Induction in Algorithms

**Example: Prove correctness of array sum algorithm**

```python
def array_sum(arr, n):
    """Sum of first n elements"""
    if n == 0:
        return 0
    return arr[n-1] + array_sum(arr, n-1)
```

**Proof of Correctness:**
```
Claim: array_sum correctly computes sum of first n elements

Base Case (n = 0):
  Returns 0, which is correct (empty sum) ✓

Inductive Hypothesis:
  Assume array_sum(arr, k) correctly computes sum of first k elements

Inductive Step (n = k+1):
  array_sum(arr, k+1) = arr[k] + array_sum(arr, k)
                      = arr[k] + (sum of first k elements)  [by hypothesis]
                      = sum of first k+1 elements ✓

Therefore, algorithm is correct for all n ≥ 0. ∎
```

---

## 4. Relations and Functions

### Relations

A **relation** R from set A to set B is a subset of A × B (Cartesian product).

**Example:**
```
A = {1, 2, 3}
B = {a, b}
A × B = {(1,a), (1,b), (2,a), (2,b), (3,a), (3,b)}

R = {(1,a), (2,b), (3,a)} is a relation from A to B
```

### Types of Relations

1. **Reflexive:** Every element relates to itself
   - `(a, a) ∈ R` for all `a ∈ A`
   - Example: "equals" (=)

2. **Symmetric:** If a relates to b, then b relates to a
   - If `(a, b) ∈ R`, then `(b, a) ∈ R`
   - Example: "is sibling of"

3. **Transitive:** If a relates to b and b relates to c, then a relates to c
   - If `(a, b) ∈ R` and `(b, c) ∈ R`, then `(a, c) ∈ R`
   - Example: "is ancestor of"

4. **Equivalence Relation:** Reflexive + Symmetric + Transitive
   - Example: "has same remainder when divided by 5"

### Functions

A **function** f: A → B is a relation where each element in A maps to exactly one element in B.

**Notation:**
- `f(x) = y` means f maps x to y
- Domain: Set A (all possible inputs)
- Codomain: Set B (all possible outputs)
- Range: Actual outputs (subset of codomain)

### Types of Functions

1. **Injective (One-to-One):**
   - Different inputs → different outputs
   - If `f(a) = f(b)`, then `a = b`
   - Example: `f(x) = 2x`

2. **Surjective (Onto):**
   - Every element in codomain is mapped to
   - Range = Codomain
   - Example: `f: ℝ → ℝ`, `f(x) = x³`

3. **Bijective (One-to-One and Onto):**
   - Both injective and surjective
   - Has an inverse function
   - Example: `f(x) = 2x + 1`

### Applications in CS

**Hash Functions:** (Not necessarily injective)
```python
def hash_function(key, size):
    return key % size
```

**Bijective Functions in Encryption:**
```python
def caesar_cipher(text, shift):
    """Bijective: can be reversed"""
    result = ""
    for char in text:
        result += chr((ord(char) - ord('a') + shift) % 26 + ord('a'))
    return result
```

---

## 5. Sequences and Series

### Arithmetic Sequences

**Definition:** Sequence where difference between consecutive terms is constant.

**Formula:**
```
aₙ = a₁ + (n-1)d

where:
  aₙ = nth term
  a₁ = first term
  d = common difference
```

**Sum of First n Terms:**
```
Sₙ = n/2 * (a₁ + aₙ)
   = n/2 * (2a₁ + (n-1)d)
```

**Example:**
```
Sequence: 2, 5, 8, 11, 14, ...
a₁ = 2, d = 3

a₁₀ = 2 + (10-1)(3) = 2 + 27 = 29
S₁₀ = 10/2 * (2 + 29) = 5 * 31 = 155
```

### Geometric Sequences

**Definition:** Sequence where ratio between consecutive terms is constant.

**Formula:**
```
aₙ = a₁ * r^(n-1)

where:
  r = common ratio
```

**Sum of First n Terms:**
```
Sₙ = a₁ * (1 - r^n) / (1 - r)    [if r ≠ 1]
   = n * a₁                       [if r = 1]
```

**Infinite Geometric Series:**
```
S∞ = a₁ / (1 - r)    [if |r| < 1]
```

**Example:**
```
Sequence: 2, 6, 18, 54, ...
a₁ = 2, r = 3

a₅ = 2 * 3^4 = 2 * 81 = 162
S₅ = 2 * (1 - 3^5) / (1 - 3) = 2 * (-242) / (-2) = 242
```

### Special Sequences

#### 1. Sum of First n Natural Numbers
```
1 + 2 + 3 + ... + n = n(n+1)/2
```

#### 2. Sum of First n Squares
```
1² + 2² + 3² + ... + n² = n(n+1)(2n+1)/6
```

#### 3. Sum of First n Cubes
```
1³ + 2³ + 3³ + ... + n³ = [n(n+1)/2]²
```

#### 4. Powers of 2
```
2⁰ + 2¹ + 2² + ... + 2^(n-1) = 2^n - 1
```

### Code Implementations

**Python:**
```python
def arithmetic_nth_term(a1, d, n):
    """nth term of arithmetic sequence"""
    return a1 + (n - 1) * d

def arithmetic_sum(a1, d, n):
    """Sum of first n terms"""
    return n * (2 * a1 + (n - 1) * d) / 2

def geometric_nth_term(a1, r, n):
    """nth term of geometric sequence"""
    return a1 * (r ** (n - 1))

def geometric_sum(a1, r, n):
    """Sum of first n terms"""
    if r == 1:
        return n * a1
    return a1 * (1 - r**n) / (1 - r)

def sum_of_n(n):
    """Sum of first n natural numbers"""
    return n * (n + 1) // 2

def sum_of_squares(n):
    """Sum of first n squares"""
    return n * (n + 1) * (2 * n + 1) // 6

def sum_of_cubes(n):
    """Sum of first n cubes"""
    return (n * (n + 1) // 2) ** 2

# Examples
print(arithmetic_nth_term(2, 3, 10))  # 29
print(geometric_nth_term(2, 3, 5))    # 162
print(sum_of_n(100))                  # 5050
print(sum_of_squares(5))              # 55
print(sum_of_cubes(5))                # 225
```

---

## 6. Practice Problems

### Easy Problems

1. **Set Operations**
   - Given `A = {1, 2, 3, 4, 5}` and `B = {4, 5, 6, 7}`, find:
     - a) A ∪ B
     - b) A ∩ B
     - c) A - B
     - d) A ⊕ B

2. **Boolean Logic**
   - Simplify: `(A ∧ B) ∨ (A ∧ ¬B)`
   - Create truth table for: `(A ∨ B) ∧ ¬C`

3. **Sequences**
   - Find the 50th term of: 3, 7, 11, 15, ...
   - Find the sum of first 20 terms of: 2, 6, 18, 54, ...

### Medium Problems

4. **Prove by Induction**
   - Prove: 2⁰ + 2¹ + 2² + ... + 2^(n-1) = 2^n - 1

5. **Relations**
   - Determine if the relation "divides" (a|b) on integers is:
     - Reflexive?
     - Symmetric?
     - Transitive?

6. **De Morgan's Laws**
   - Apply De Morgan's laws to simplify: `¬((x > 5) ∧ (y < 10))`

### Hard Problems

7. **Power Set Size**
   - Prove that if |A| = n, then |P(A)| = 2^n using induction

8. **Function Composition**
   - If f(x) = 2x + 1 and g(x) = x², find (f ∘ g)(x) and (g ∘ f)(x)

9. **Complex Proof**
   - Prove: For all n ≥ 1, n³ - n is divisible by 6

10. **Series Sum**
    - Find a closed form for: 1/(1×2) + 1/(2×3) + 1/(3×4) + ... + 1/(n(n+1))

---

## 🎯 Key Takeaways

1. **Sets** are fundamental building blocks in mathematics and CS
2. **Boolean algebra** is essential for logical reasoning and bit manipulation
3. **Mathematical induction** is the primary tool for proving algorithm correctness
4. **Relations and functions** model mappings between data structures
5. **Sequences** help analyze iterative algorithms and loop complexity

---

## 📚 Next Steps

Now that you understand discrete mathematics fundamentals, move on to:
- [02. Combinatorics & Counting Principles](./02-Combinatorics.md)

---

## 🔗 Additional Resources

- **Interactive Tools:**
  - Set Calculator: [Symbolab Sets](https://www.symbolab.com/solver/sets-calculator)
  - Logic Calculator: [Stanford Logic](https://web.stanford.edu/class/cs103/tools/truth-table-tool/)
  
- **Videos:**
  - MIT OCW: Mathematics for Computer Science (Lecture 1-4)
  - TrevTutor: Discrete Math Series on YouTube

---

*[← Back to Chapter 2 Home](./README.md) | [Next: Combinatorics →](./02-Combinatorics.md)*
