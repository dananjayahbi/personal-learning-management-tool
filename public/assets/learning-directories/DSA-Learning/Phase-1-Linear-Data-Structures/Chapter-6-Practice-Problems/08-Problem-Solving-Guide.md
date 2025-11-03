# Problem-Solving Guide

## 🎯 Complete Problem-Solving Framework

This guide provides a systematic approach to solving coding problems, pattern recognition, interview strategies, and common pitfalls to avoid.

---

## 📋 Table of Contents

1. [The 7-Step Problem-Solving Framework](#framework)
2. [Pattern Recognition Guide](#patterns)
3. [Time and Space Complexity Analysis](#complexity)
4. [Interview Communication Strategy](#interview)
5. [Common Mistakes to Avoid](#mistakes)
6. [Optimization Techniques](#optimization)
7. [Language-Specific Tips](#language-tips)

---

## <a name="framework"></a>1. The 7-Step Problem-Solving Framework

### Step 1: Understand the Problem (5-10 minutes)

**Actions:**
- Read problem statement 2-3 times carefully
- Identify inputs, outputs, and constraints
- Ask clarifying questions (in interviews)
- Restate problem in your own words

**Key Questions to Ask:**
```
- What are the input types and ranges?
- What should I return?
- Can inputs be empty/null?
- Are there duplicates?
- Is data sorted?
- What are the constraints (time/space)?
- What are edge cases?
```

**Example:**
```
Problem: "Find two numbers that add up to target"

Questions to Ask:
✓ Can I use the same element twice? NO
✓ Is array sorted? NO
✓ Are there duplicates? YES
✓ Can there be negative numbers? YES
✓ Is there always a solution? YES
✓ Can I modify the array? YES
✓ Time/space constraints? O(n) time preferred
```

---

### Step 2: Work Through Examples (5 minutes)

**Create 4 types of examples:**

1. **Simple case** - Small, straightforward
2. **Edge case** - Empty, single element, boundaries
3. **Complex case** - Multiple elements, duplicates
4. **Invalid case** - Null inputs, out of range

**Example for Two Sum:**
```
Simple:    [2, 7, 11, 15], target = 9 → [0, 1]
Edge:      [1], target = 2 → None
Edge:      [1, 1], target = 2 → [0, 1]
Complex:   [3, 3, 3], target = 6 → [0, 1]
Invalid:   [], target = 9 → None
```

**Trace through manually:**
- Walk through your example step-by-step
- This helps identify the pattern
- Often reveals the solution approach

---

### Step 3: Think About Approaches (5-10 minutes)

**Mental Checklist:**

```
□ Can I use brute force? What's the complexity?
□ Can I sort the data? Would that help?
□ Can I use extra space (hash map, set)?
□ Is there a two-pointer approach?
□ Can I use binary search?
□ Is there a sliding window pattern?
□ Do I need a stack or queue?
□ Is this a graph/tree problem in disguise?
□ Can I use prefix sums?
□ Is there a greedy approach?
□ Do I need dynamic programming?
```

**Pattern Matching:**
- Sorted array → Binary search, two pointers
- Subarray/substring → Sliding window, prefix sum
- Unique elements → Hash set
- Pair sum → Hash map
- Parentheses → Stack
- Level order → Queue/BFS
- In-order traversal → Stack/DFS
- K-way merge → Heap

---

### Step 4: Choose Best Approach (2 minutes)

**Evaluation Criteria:**

| Factor | Consideration |
|--------|--------------|
| Correctness | Does it handle all cases? |
| Time Complexity | Good enough for constraints? |
| Space Complexity | Can we do better? |
| Code Clarity | Easy to implement? |
| Edge Cases | How many special cases? |

**Decision Tree:**
```
Can I solve in O(n) time?
├─ YES → Use hash map, sliding window, or prefix sum
└─ NO  → Is O(n log n) acceptable?
    ├─ YES → Use sorting or heap
    └─ NO  → Need DP or advanced technique
```

---

### Step 5: Write Code (10-15 minutes)

**Best Practices:**

```python
# 1. Write helper functions for readability
def is_valid(char):
    return char.isalnum()

# 2. Use descriptive variable names
left_pointer, right_pointer = 0, len(array) - 1  # Good
l, r = 0, len(a) - 1  # Bad

# 3. Handle edge cases first
if not array:
    return []

# 4. Use meaningful comments for complex logic
# Binary search: maintain invariant that target is in [left, right]

# 5. Modularize complex operations
def reverse_sublist(head, left, right):
    # Implementation
    pass
```

**Coding Structure:**
```python
def solution(input_data):
    # 1. Edge case handling
    if not input_data:
        return default_value
    
    # 2. Initialize variables
    result = []
    helper_structure = {}
    
    # 3. Main logic
    for item in input_data:
        # Process item
        pass
    
    # 4. Return result
    return result
```

---

### Step 6: Test Your Code (5-10 minutes)

**Testing Strategy:**

**1. Trace Through Your Example**
```python
Input: [2, 7, 11, 15], target = 9

i=0, num=2:
  complement = 9 - 2 = 7
  7 not in seen → seen = {2: 0}

i=1, num=7:
  complement = 9 - 7 = 2
  2 in seen! → return [0, 1] ✓
```

**2. Test Edge Cases**
```python
# Empty input
test_case = ([], 9)
expected = []

# Single element
test_case = ([5], 10)
expected = []

# Two elements (solution)
test_case = ([5, 5], 10)
expected = [0, 1]
```

**3. Common Test Cases**
```
□ Empty/null input
□ Single element
□ Two elements
□ All same elements
□ Sorted vs unsorted
□ Positive/negative/zero
□ Duplicates
□ Large input (constraints)
```

---

### Step 7: Optimize (5 minutes)

**Optimization Checklist:**

**Time Optimization:**
```
□ Can I avoid nested loops?
□ Can I use hash map instead of linear search?
□ Can I break early?
□ Can I cache results?
□ Can I use binary search?
```

**Space Optimization:**
```
□ Can I reuse input space?
□ Can I use two variables instead of array?
□ Can I process in-place?
□ Can I use bit manipulation?
```

**Example Optimization:**
```python
# Brute Force: O(n²) time, O(1) space
def two_sum_brute(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]

# Optimized: O(n) time, O(n) space
def two_sum_optimized(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        if target - num in seen:
            return [seen[target - num], i]
        seen[num] = i
```

---

## <a name="patterns"></a>2. Pattern Recognition Guide

### Pattern 1: Two Pointers

**When to Use:**
- Sorted array problems
- Palindrome checking
- Merging arrays
- Removing duplicates

**Template:**
```python
def two_pointers(arr):
    left, right = 0, len(arr) - 1
    
    while left < right:
        # Process current pair
        if condition:
            # Found solution
            return result
        elif some_check:
            left += 1
        else:
            right -= 1
    
    return default
```

**Examples:** Two Sum II, 3Sum, Container With Most Water

---

### Pattern 2: Sliding Window

**When to Use:**
- Subarray/substring problems
- Fixed or variable window size
- Finding min/max in subarrays

**Template:**
```python
def sliding_window(arr):
    left = 0
    result = 0
    window_state = {}  # or other data structure
    
    for right in range(len(arr)):
        # Expand window: add arr[right]
        window_state[arr[right]] = ...
        
        # Shrink window if needed
        while not valid(window_state):
            # Remove arr[left]
            left += 1
        
        # Update result
        result = max(result, right - left + 1)
    
    return result
```

**Examples:** Longest Substring Without Repeating Characters, Min Window Substring

---

### Pattern 3: Fast & Slow Pointers

**When to Use:**
- Cycle detection
- Finding middle element
- Palindrome linked list

**Template:**
```python
def fast_slow(head):
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        if slow == fast:
            # Cycle detected
            return True
    
    return False
```

**Examples:** Linked List Cycle, Find Middle, Palindrome List

---

### Pattern 4: Merge Intervals

**When to Use:**
- Overlapping intervals
- Scheduling problems
- Range problems

**Template:**
```python
def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    
    for current in intervals[1:]:
        last = merged[-1]
        
        if current[0] <= last[1]:
            # Overlapping
            last[1] = max(last[1], current[1])
        else:
            merged.append(current)
    
    return merged
```

**Examples:** Merge Intervals, Insert Interval, Meeting Rooms

---

### Pattern 5: Monotonic Stack

**When to Use:**
- Next greater/smaller element
- Histogram problems
- Temperature problems

**Template:**
```python
def monotonic_stack(arr):
    stack = []  # Stores indices
    result = [-1] * len(arr)
    
    for i, num in enumerate(arr):
        while stack and arr[stack[-1]] < num:
            result[stack.pop()] = num
        
        stack.append(i)
    
    return result
```

**Examples:** Daily Temperatures, Next Greater Element, Largest Rectangle

---

### Pattern 6: Prefix Sum

**When to Use:**
- Subarray sum problems
- Range queries
- Multiple queries on same array

**Template:**
```python
def prefix_sum(arr):
    prefix = [0] * (len(arr) + 1)
    
    for i in range(len(arr)):
        prefix[i + 1] = prefix[i] + arr[i]
    
    # Range sum [i, j]
    range_sum = prefix[j + 1] - prefix[i]
    
    return result
```

**Examples:** Subarray Sum Equals K, Range Sum Query

---

### Pattern 7: Binary Search

**When to Use:**
- Sorted arrays
- Finding boundaries
- Optimization problems (find min/max satisfying condition)

**Template:**
```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # or left for insert position
```

**Examples:** Search in Rotated Array, Find Peak Element

---

## <a name="complexity"></a>3. Time and Space Complexity Analysis

### Big O Notation Hierarchy
```
O(1) < O(log n) < O(√n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!)
```

### Quick Reference

| Complexity | Name | Example |
|------------|------|---------|
| O(1) | Constant | Hash table lookup, array access |
| O(log n) | Logarithmic | Binary search, balanced tree ops |
| O(n) | Linear | Array traversal, linear search |
| O(n log n) | Linearithmic | Merge sort, heap sort |
| O(n²) | Quadratic | Nested loops, bubble sort |
| O(2ⁿ) | Exponential | Recursive fibonacci, subsets |

### How to Calculate

**Rules:**
1. **Drop constants:** O(2n) → O(n)
2. **Drop non-dominant terms:** O(n² + n) → O(n²)
3. **Different inputs:** O(a + b) or O(a * b)
4. **Amortized analysis:** Consider average over many operations

**Examples:**
```python
# O(n) - single loop
for i in range(n):
    print(i)

# O(n²) - nested loops
for i in range(n):
    for j in range(n):
        print(i, j)

# O(n) - two separate loops
for i in range(n):
    print(i)
for j in range(n):
    print(j)

# O(log n) - divide by 2 each iteration
while n > 0:
    n = n // 2

# O(n log n) - common in sorting
def merge_sort(arr):  # O(n log n)
    # Dividing: O(log n)
    # Merging: O(n)
    pass
```

---

## <a name="interview"></a>4. Interview Communication Strategy

### The Perfect Interview Flow

**1. Listen Carefully (2 min)**
```
✓ Let interviewer finish explaining
✓ Take notes of key points
✓ Don't interrupt
```

**2. Ask Clarifying Questions (3 min)**
```
"Can the input be empty?"
"Are there any constraints on time/space?"
"Should I handle edge case X?"
"Can I assume the input is valid?"
```

**3. Explain Your Approach (5 min)**
```
"I'm thinking of using a hash map because..."
"The brute force would be O(n²), but we can optimize to O(n) by..."
"Here's my strategy: First, ... Then, ..."
```

**4. Discuss Trade-offs (2 min)**
```
"We could use O(n) extra space for O(n) time..."
"Or we could sort first for O(n log n) time but O(1) space..."
"I'll go with the first approach because..."
```

**5. Write Code (15 min)**
```
- Talk while coding
- Explain complex parts
- Use meaningful names
```

**6. Test Your Code (5 min)**
```
"Let me trace through with an example..."
"Edge cases I should check: ..."
"Looks good!"
```

**7. Optimize (5 min)**
```
"Can we do better? Let me think..."
"I could use X technique to improve Y..."
```

### Communication Tips

**DO:**
✅ Think out loud
✅ Explain your reasoning
✅ Admit when stuck and ask for hints
✅ Consider multiple approaches
✅ Test thoroughly
✅ Be open to feedback

**DON'T:**
❌ Jump into coding immediately
❌ Stay silent for long periods
❌ Ignore interviewer hints
❌ Give up easily
❌ Skip testing
❌ Be defensive about mistakes

---

## <a name="mistakes"></a>5. Common Mistakes to Avoid

### Mistake 1: Not Understanding the Problem
**Problem:** Starting to code without fully understanding
**Solution:** Ask questions, work through examples first

### Mistake 2: Ignoring Edge Cases
**Common Edge Cases:**
```python
- Empty input: []
- Single element: [1]
- All same: [5, 5, 5]
- Negative numbers: [-1, -5, 3]
- Zero: [0, 1, 2]
- Duplicates: [1, 2, 2, 3]
- Max/min values: [INT_MAX, INT_MIN]
```

### Mistake 3: Off-by-One Errors
```python
# Common mistakes:
for i in range(n):      # 0 to n-1 ✓
for i in range(n + 1):  # 0 to n (often wrong)
for i in range(1, n):   # 1 to n-1 (check if correct)

# Array slicing:
arr[0:n]   # First n elements ✓
arr[0:n+1] # Usually wrong
```

### Mistake 4: Not Considering Null/None
```python
# Always check:
if not head:
    return None

if not arr:
    return []
```

### Mistake 5: Modifying While Iterating
```python
# Wrong:
for item in list:
    if condition:
        list.remove(item)  # Causes skips!

# Correct:
list = [item for item in list if not condition]
```

---

## <a name="optimization"></a>6. Optimization Techniques

### 1. Hash Map for O(1) Lookup
**Before:** O(n) linear search
**After:** O(1) hash lookup
```python
# O(n²)
for i in range(n):
    for j in range(i+1, n):
        if nums[i] + nums[j] == target:
            return [i, j]

# O(n)
seen = {}
for i, num in enumerate(nums):
    if target - num in seen:
        return [seen[target-num], i]
    seen[num] = i
```

### 2. Two Pointers for Sorted Data
**Benefit:** O(1) space instead of O(n)

### 3. Prefix Sum for Range Queries
**Benefit:** O(1) query after O(n) preprocessing

### 4. Binary Search for Sorted Data
**Benefit:** O(log n) instead of O(n)

### 5. Sliding Window for Subarrays
**Benefit:** O(n) instead of O(n²)

### 6. In-Place Modification
**Benefit:** O(1) space instead of O(n)

### 7. Early Termination
```python
# Add break/continue/return when possible
for i in range(n):
    if found:
        return result  # Early exit
```

---

## <a name="language-tips"></a>7. Language-Specific Tips (Python)

### Python Collections

```python
# List - ordered, mutable
list = [1, 2, 3]

# Tuple - ordered, immutable
tuple = (1, 2, 3)

# Set - unordered, unique
set = {1, 2, 3}

# Dict - key-value pairs
dict = {'a': 1, 'b': 2}

# defaultdict - auto-initialize
from collections import defaultdict
d = defaultdict(int)  # default 0
d = defaultdict(list)  # default []

# Counter - frequency counting
from collections import Counter
c = Counter([1, 2, 2, 3])  # {1:1, 2:2, 3:1}

# deque - double-ended queue
from collections import deque
q = deque([1, 2, 3])
q.appendleft(0)  # O(1)
q.popleft()      # O(1)
```

### Python Tricks

```python
# Swap
a, b = b, a

# Multiple assignment
left, right = 0, len(arr) - 1

# List comprehension
squares = [x**2 for x in range(10)]

# Filter
evens = [x for x in range(10) if x % 2 == 0]

# Sorting
arr.sort()  # in-place
sorted_arr = sorted(arr)  # new list
arr.sort(key=lambda x: x[1])  # custom key

# Min/Max with key
max(arr, key=lambda x: x.value)

# All/Any
all([True, True, False])  # False
any([True, True, False])  # True

# Enumerate
for i, val in enumerate(arr):
    print(i, val)

# Zip
for a, b in zip(list1, list2):
    print(a, b)

# Reverse
arr[::-1]  # reversed copy
arr.reverse()  # in-place
```

---

## 🎯 Final Checklist

Before submitting/saying "done":

- [ ] Does it handle empty input?
- [ ] Does it handle single element?
- [ ] Does it handle duplicates?
- [ ] Does it handle negative numbers?
- [ ] Does it handle edge values (min/max)?
- [ ] Is the time complexity optimal?
- [ ] Is the space complexity reasonable?
- [ ] Are variable names clear?
- [ ] Did I test with examples?
- [ ] Can I explain my solution clearly?

---

## 📚 Additional Resources

**Practice Platforms:**
- LeetCode - Interview focus
- HackerRank - Broader problems
- CodeSignal - Interview prep
- Pramp - Mock interviews

**Visualization:**
- visualgo.net - Algorithm visualization
- pythontutor.com - Code visualization

**Cheat Sheets:**
- Big O Cheat Sheet - bigocheatsheet.com
- Python CheatSheet - gto76.github.io/python-cheatsheet

---

[← Previous: Mixed Hard Problems](./07-Mixed-Hard-Problems.md) | [Back to Chapter 6](./README.md)
