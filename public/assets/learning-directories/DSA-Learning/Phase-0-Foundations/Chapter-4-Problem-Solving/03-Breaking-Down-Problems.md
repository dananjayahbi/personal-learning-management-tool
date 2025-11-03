# Module 3: Breaking Down Problems

## 🎯 Module Overview

**The Art of Simplification:** Complex problems become manageable when broken into smaller pieces.

This module teaches you how to decompose large, intimidating problems into simple, solvable subproblems.

**Time Required:** 30-60 minutes  
**Practice Problems:** 8

---

## 🧩 Why Problem Decomposition Matters

### The Complexity Trap:

```
😰 Big Complex Problem → Overwhelmed → Give Up

vs.

😊 Big Problem → Break Down → Small Problems → Solve Each → Success!
```

**Example:**
```
❌ "Build a social media platform"  [Too overwhelming]

✅ Break it down:
   1. User authentication
   2. Post creation
   3. Post display
   4. Like/comment system
   5. Friend connections
   ... (and so on)
```

Each piece is manageable!

---

## 📋 The Decomposition Process

### Step 1: Identify the Main Goal

**Ask yourself:** "What is the ultimate output I need?"

**Example Problem:** *Find the longest palindromic substring*

```
Main Goal: Return the longest palindrome substring from input string
```

### Step 2: List Required Operations

**Ask yourself:** "What operations are needed to achieve the goal?"

**Example:**
```
1. Need to check if a substring is palindrome
2. Need to explore all possible substrings
3. Need to track the longest one found
4. Need to return the longest
```

### Step 3: Break Into Subproblems

**Ask yourself:** "What are the independent pieces?"

**Example:**
```
Subproblem A: Check if string is palindrome
Subproblem B: Generate/explore all substrings
Subproblem C: Track and compare lengths
```

### Step 4: Solve Each Subproblem

Tackle each piece independently:

```python
# Subproblem A: Check palindrome
def is_palindrome(s):
    return s == s[::-1]

# Subproblem B: Explore substrings (with Subproblem C)
def longest_palindrome(s):
    longest = ""
    
    for i in range(len(s)):
        for j in range(i, len(s)):
            substring = s[i:j+1]
            
            if is_palindrome(substring) and len(substring) > len(longest):
                longest = substring
    
    return longest
```

### Step 5: Combine Solutions

Put subproblems together to solve the main problem.

---

## 🎯 Decomposition Strategies

### Strategy 1: Input-Process-Output

Break every problem into three phases:

```
┌─────────────────────────────────────────┐
│  INPUT                                  │
│  ↓                                      │
│  What data do I have?                   │
│  What format is it in?                  │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  PROCESS                                │
│  ↓                                      │
│  What transformations are needed?       │
│  What calculations?                     │
│  What data structures?                  │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  OUTPUT                                 │
│  ↓                                      │
│  What's the final result?               │
│  What format should it be in?           │
└─────────────────────────────────────────┘
```

**Example: Two Sum Problem**

```
INPUT:
- Array of integers: [2, 7, 11, 15]
- Target sum: 9

PROCESS:
- Need to find two numbers
- That add up to target
- Return their indices

OUTPUT:
- Array of two indices: [0, 1]
```

---

### Strategy 2: Step-by-Step Walkthrough

**Manually solve a small example and document each step:**

**Example Problem:** *Reverse words in a string*

```
Input: "hello world"
Goal: "world hello"

Manual Steps:
1. Split string by spaces → ["hello", "world"]
2. Reverse the array → ["world", "hello"]
3. Join with spaces → "world hello"

Each step = a subproblem!
```

**Code:**
```python
def reverse_words(s):
    # Subproblem 1: Split
    words = s.split(' ')
    
    # Subproblem 2: Reverse
    words.reverse()
    
    # Subproblem 3: Join
    return ' '.join(words)
```

---

### Strategy 3: Divide and Conquer

**Break problem into similar smaller problems:**

**Example: Merge Sort**

```
Problem: Sort array [38, 27, 43, 3, 9, 82, 10]

Divide:
[38, 27, 43, 3] | [9, 82, 10]

Further divide:
[38, 27] | [43, 3] | [9, 82] | [10]

[38] | [27] | [43] | [3] | [9] | [82] | [10]

Conquer (merge back):
[27, 38] | [3, 43] | [9, 82] | [10]

[3, 27, 38, 43] | [9, 10, 82]

[3, 9, 10, 27, 38, 43, 82]
```

**Pattern:**
1. Divide until trivial (base case)
2. Solve small problems
3. Combine solutions

---

### Strategy 4: State Machine Approach

**For sequential problems, think in states:**

**Example Problem:** *Valid Number Validator*

```
States needed:
- Start
- Seen integer part
- Seen decimal point
- Seen decimal part
- Seen exponent 'e'
- Seen exponent number
- End

Transitions:
digit → move to next state
'.' → move to decimal state
'e' → move to exponent state
invalid char → reject
```

---

## 🔍 Practical Examples

### Example 1: Valid Anagram

**Problem:** Check if two strings are anagrams

**❌ Monolithic Thinking:**
```python
def is_anagram(s, t):
    # Try to solve everything at once
    # ... complex logic ...
```

**✅ Decomposed Thinking:**

```
Main Problem: Are strings anagrams?

Break down:
1. Anagrams have same character frequencies
2. Need to count characters in each string
3. Need to compare the counts

Subproblems:
A. Count character frequency in string
B. Compare two frequency maps
```

**Solution:**
```python
def is_anagram(s, t):
    # Subproblem A: Count frequencies
    def count_chars(string):
        freq = {}
        for char in string:
            freq[char] = freq.get(char, 0) + 1
        return freq
    
    # Subproblem B: Compare
    return count_chars(s) == count_chars(t)
```

**Even simpler with built-ins:**
```python
from collections import Counter

def is_anagram(s, t):
    return Counter(s) == Counter(t)
```

---

### Example 2: Climbing Stairs

**Problem:** Count ways to climb n stairs (1 or 2 steps at time)

**Break Down:**

```
Main Goal: Count ways to reach step n

Think recursively:
- To reach step n, I must come from step n-1 OR step n-2
- Ways to reach n = Ways to reach (n-1) + Ways to reach (n-2)

Subproblems:
1. Base cases: n=1 → 1 way, n=2 → 2 ways
2. Recursive case: f(n) = f(n-1) + f(n-2)
3. Implement solution (iterative DP for efficiency)
```

**Solution:**
```python
def climb_stairs(n):
    # Subproblem 1: Base cases
    if n <= 2:
        return n
    
    # Subproblem 2: Build up solution
    prev2, prev1 = 1, 2
    
    for i in range(3, n + 1):
        current = prev1 + prev2
        prev2, prev1 = prev1, current
    
    return prev1
```

---

### Example 3: Merge Intervals

**Problem:** Merge overlapping intervals

**Input:** `[[1,3], [2,6], [8,10], [15,18]]`  
**Output:** `[[1,6], [8,10], [15,18]]`

**Break Down:**

```
Main Goal: Merge overlapping intervals

Observations:
- [1,3] and [2,6] overlap → merge to [1,6]
- Overlapping means: start of one <= end of other

Subproblems:
1. Sort intervals by start time (makes it easier)
2. Compare consecutive intervals
3. Merge if they overlap
4. Add to result if they don't

Steps:
A. Sort intervals
B. Initialize result with first interval
C. For each interval:
   - If overlaps with last in result: merge
   - Else: add as new interval
```

**Solution:**
```python
def merge_intervals(intervals):
    # Subproblem A: Sort
    intervals.sort(key=lambda x: x[0])
    
    # Subproblem B: Initialize
    merged = [intervals[0]]
    
    # Subproblem C: Iterate and merge
    for current in intervals[1:]:
        last = merged[-1]
        
        # Check overlap
        if current[0] <= last[1]:
            # Merge
            last[1] = max(last[1], current[1])
        else:
            # Add new interval
            merged.append(current)
    
    return merged
```

---

## 🎯 Decomposition Practice

### Practice Problem 1: Product of Array Except Self

**Problem:**
```
Given array nums, return array where output[i] equals the product of 
all elements except nums[i].

Example:
Input: [1,2,3,4]
Output: [24,12,8,6]

Constraint: Don't use division, O(n) time
```

**Your Turn:** Break this down into subproblems.

<details>
<summary>Click to see decomposition</summary>

**Breaking Down:**

```
Main Goal: For each position, product of all others

Observation:
- output[i] = (product of all left) * (product of all right)

Subproblems:
1. Calculate left products (product of all elements to the left)
2. Calculate right products (product of all elements to the right)
3. Multiply left[i] * right[i] for each position

Steps:
A. Create left array: left[i] = product of nums[0...i-1]
B. Create right array: right[i] = product of nums[i+1...n-1]
C. Multiply: result[i] = left[i] * right[i]
```

**Solution:**
```python
def product_except_self(nums):
    n = len(nums)
    result = [1] * n
    
    # Subproblem A: Left products
    left_product = 1
    for i in range(n):
        result[i] = left_product
        left_product *= nums[i]
    
    # Subproblem B & C: Right products and multiply
    right_product = 1
    for i in range(n - 1, -1, -1):
        result[i] *= right_product
        right_product *= nums[i]
    
    return result
```

</details>

---

### Practice Problem 2: Rotate Image

**Problem:**
```
Rotate n×n matrix 90 degrees clockwise in-place.

Example:
Input:
[1, 2, 3]
[4, 5, 6]
[7, 8, 9]

Output:
[7, 4, 1]
[8, 5, 2]
[9, 6, 3]
```

**Your Turn:** Break this down.

<details>
<summary>Click to see decomposition</summary>

**Breaking Down:**

```
Main Goal: Rotate 90° clockwise in-place

Observation:
- Position (i,j) moves to (j, n-1-i)
- But in-place is tricky...

Alternative approach (easier to decompose):
- Rotate 90° = Transpose + Reverse each row

Subproblems:
1. Transpose matrix (swap [i][j] with [j][i])
2. Reverse each row

Why this works:
[1, 2, 3]     Transpose     [1, 4, 7]     Reverse rows     [7, 4, 1]
[4, 5, 6]  ────────────>  [2, 5, 8]  ───────────────>  [8, 5, 2]
[7, 8, 9]                  [3, 6, 9]                     [9, 6, 3]
```

**Solution:**
```python
def rotate(matrix):
    n = len(matrix)
    
    # Subproblem 1: Transpose
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    
    # Subproblem 2: Reverse each row
    for i in range(n):
        matrix[i].reverse()
```

</details>

---

## 📊 Decomposition Checklist

When breaking down a problem, verify:

- [ ] Each subproblem is simpler than the original
- [ ] Each subproblem can be solved independently
- [ ] Subproblems together solve the main problem
- [ ] No missing pieces in the decomposition
- [ ] No redundant/overlapping subproblems (unless using DP)

---

## 💡 Pro Tips

### 1. Start with Examples
- Work through a small example manually
- Document each step you take
- Each step = potential subproblem

### 2. Look for Repetition
- Do you repeat the same operation?
- Can it be extracted as a helper function?

### 3. Think Top-Down
```
Start: What's the final result?
↓
What do I need to get that?
↓
What do I need to get those?
↓
... continue until trivial
```

### 4. Think Bottom-Up
```
Start: What's the simplest case?
↓
How do I build to the next case?
↓
How do I build to the next case?
↓
... continue until full problem
```

### 5. Draw It Out
- Visualize the problem
- Draw state transitions
- Sketch data flow

### 6. Use Helper Functions
- Extract reusable logic
- Makes code cleaner
- Easier to test

---

## 🎓 Common Decomposition Patterns

### Pattern 1: Nested Problems
```
Main Problem
├── Subproblem A
│   ├── Sub-subproblem A1
│   └── Sub-subproblem A2
└── Subproblem B
```

### Pattern 2: Sequential Steps
```
Input → Step 1 → Step 2 → Step 3 → Output
```

### Pattern 3: Parallel Subproblems
```
        ┌── Subproblem A ──┐
Input ──┼── Subproblem B ──┼── Combine → Output
        └── Subproblem C ──┘
```

### Pattern 4: Recursive Decomposition
```
Problem(n)
├── Problem(n-1)
│   └── Problem(n-2)
│       └── ...
└── Combine results
```

---

## ✅ Key Takeaways

1. **Break complex into simple** - Always decompose first
2. **Solve independently** - Each subproblem should stand alone
3. **Work through examples** - Manual solving reveals subproblems
4. **Use helper functions** - Extract reusable logic
5. **Think incrementally** - Build up or break down systematically

---

**Remember:** No problem is too complex when broken into the right pieces! 🧩

---

[← Previous: Pattern Recognition](./02-Pattern-Recognition.md) | [Next: Pseudocode and Planning →](./04-Pseudocode-and-Planning.md)
