# Module 2: Pattern Recognition

## 🎯 Module Overview

**The Secret to Solving Problems Faster:** Recognizing patterns you've seen before.

Most coding problems aren't completely unique—they follow patterns. This module teaches you to identify these patterns and apply proven solution templates.

**Time Required:** 1-2 hours  
**Practice Problems:** 15

---

## 🧩 Why Pattern Recognition Matters

### The Power of Patterns:

```
New Problem → Recognize Pattern → Apply Template → Solve Quickly
     ↓              ↓                    ↓              ↓
  5 min         1 min               15 min         Success!

vs.

New Problem → No Pattern → Trial & Error → Maybe Solve
     ↓              ↓            ↓              ↓
  5 min         0 min         2 hours      Frustration
```

**Example:**
- Problem: "Find pair that sums to target" → **Pattern: Two Pointer**
- Problem: "Find shortest path in grid" → **Pattern: BFS**
- Problem: "Count ways to climb stairs" → **Pattern: Dynamic Programming**

---

## 📋 Common Problem Patterns

### 1️⃣ Two Pointers / Sliding Window

**When to Use:**
- Array or string problems
- Need to find pairs, triplets, or subarrays
- Input is sorted or can be sorted
- Need to optimize space complexity

**Keywords to Watch For:**
- "pair that sums to..."
- "subarray with given sum"
- "longest substring without..."
- "remove duplicates"
- "sorted array"

**Example Problems:**
```
✓ Two Sum (with sorted array)
✓ Container With Most Water
✓ Longest Substring Without Repeating Characters
✓ Minimum Window Substring
```

**Template:**
```python
# Two Pointers (opposite ends)
def two_pointer_opposite(arr, target):
    left, right = 0, len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    
    return None

# Sliding Window (same direction)
def sliding_window(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i - k] + arr[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum
```

---

### 2️⃣ Fast & Slow Pointers (Floyd's Algorithm)

**When to Use:**
- Linked list problems
- Cycle detection
- Finding middle element
- Detecting patterns in sequences

**Keywords to Watch For:**
- "linked list"
- "cycle detection"
- "find middle"
- "detect loop"

**Example Problems:**
```
✓ Linked List Cycle Detection
✓ Find Middle of Linked List
✓ Happy Number
✓ Find Duplicate Number
```

**Template:**
```python
def has_cycle(head):
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        if slow == fast:
            return True
    
    return False

def find_middle(head):
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    return slow  # slow is at middle
```

---

### 3️⃣ Hash Map / Hash Set

**When to Use:**
- Need O(1) lookup
- Finding pairs, complements
- Counting frequencies
- Tracking seen elements

**Keywords to Watch For:**
- "find pair"
- "count occurrences"
- "first unique"
- "duplicate"
- "anagram"

**Example Problems:**
```
✓ Two Sum (unsorted)
✓ First Unique Character
✓ Group Anagrams
✓ Contains Duplicate
```

**Template:**
```python
# Finding complement
def two_sum(nums, target):
    seen = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    
    return None

# Counting frequency
def count_frequency(arr):
    freq = {}
    
    for item in arr:
        freq[item] = freq.get(item, 0) + 1
    
    return freq
```

---

### 4️⃣ Binary Search

**When to Use:**
- Sorted array/list
- Find target or position
- Search in rotated array
- Find min/max in sorted structure

**Keywords to Watch For:**
- "sorted"
- "find target"
- "search in O(log n)"
- "rotated array"

**Example Problems:**
```
✓ Binary Search
✓ Find First and Last Position
✓ Search in Rotated Sorted Array
✓ Find Peak Element
```

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
    
    return -1
```

---

### 5️⃣ Stack

**When to Use:**
- Matching pairs (parentheses)
- Next/previous greater element
- Expression evaluation
- Undo operations

**Keywords to Watch For:**
- "valid parentheses"
- "next greater"
- "evaluate expression"
- "matching pairs"

**Example Problems:**
```
✓ Valid Parentheses
✓ Daily Temperatures
✓ Next Greater Element
✓ Min Stack
```

**Template:**
```python
# Matching parentheses
def is_valid(s):
    stack = []
    pairs = {'(': ')', '{': '}', '[': ']'}
    
    for char in s:
        if char in pairs:
            stack.append(char)
        elif not stack or pairs[stack.pop()] != char:
            return False
    
    return len(stack) == 0

# Next greater element
def next_greater(arr):
    stack = []
    result = [-1] * len(arr)
    
    for i in range(len(arr) - 1, -1, -1):
        while stack and stack[-1] <= arr[i]:
            stack.pop()
        
        if stack:
            result[i] = stack[-1]
        
        stack.append(arr[i])
    
    return result
```

---

### 6️⃣ Breadth-First Search (BFS)

**When to Use:**
- Tree/graph traversal (level-order)
- Shortest path (unweighted)
- Level-by-level processing
- Finding minimum steps

**Keywords to Watch For:**
- "level order"
- "shortest path"
- "minimum steps"
- "breadth-first"

**Example Problems:**
```
✓ Binary Tree Level Order Traversal
✓ Shortest Path in Grid
✓ Word Ladder
✓ Minimum Steps to Reach Target
```

**Template:**
```python
from collections import deque

def bfs(root):
    if not root:
        return []
    
    queue = deque([root])
    result = []
    
    while queue:
        level_size = len(queue)
        level = []
        
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(level)
    
    return result
```

---

### 7️⃣ Depth-First Search (DFS)

**When to Use:**
- Tree/graph traversal
- Path finding (all paths)
- Backtracking problems
- Recursive exploration

**Keywords to Watch For:**
- "all paths"
- "explore all possibilities"
- "backtrack"
- "depth-first"

**Example Problems:**
```
✓ Binary Tree Paths
✓ Number of Islands
✓ Permutations
✓ Subsets
```

**Template:**
```python
# Recursive DFS
def dfs_recursive(node, visited):
    if not node or node in visited:
        return
    
    visited.add(node)
    # Process node
    
    for neighbor in node.neighbors:
        dfs_recursive(neighbor, visited)

# Iterative DFS
def dfs_iterative(root):
    if not root:
        return []
    
    stack = [root]
    result = []
    
    while stack:
        node = stack.pop()
        result.append(node.val)
        
        # Add children to stack
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
    
    return result
```

---

### 8️⃣ Dynamic Programming (DP)

**When to Use:**
- Optimization problems (min/max)
- Counting problems (ways to...)
- Overlapping subproblems
- Optimal substructure

**Keywords to Watch For:**
- "maximum/minimum"
- "count ways to..."
- "longest/shortest"
- "optimal"

**Example Problems:**
```
✓ Climbing Stairs
✓ House Robber
✓ Longest Increasing Subsequence
✓ Coin Change
```

**Template:**
```python
# 1D DP
def climb_stairs(n):
    if n <= 2:
        return n
    
    dp = [0] * (n + 1)
    dp[1], dp[2] = 1, 2
    
    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]

# 2D DP
def unique_paths(m, n):
    dp = [[0] * n for _ in range(m)]
    
    # Base cases
    for i in range(m):
        dp[i][0] = 1
    for j in range(n):
        dp[0][j] = 1
    
    # Fill table
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    
    return dp[m-1][n-1]
```

---

### 9️⃣ Greedy Algorithm

**When to Use:**
- Local optimal leads to global optimal
- Cannot go back on decisions
- Optimization with constraints

**Keywords to Watch For:**
- "maximum/minimum with constraint"
- "interval scheduling"
- "activity selection"

**Example Problems:**
```
✓ Jump Game
✓ Gas Station
✓ Meeting Rooms
✓ Minimum Coins
```

**Template:**
```python
def jump_game(nums):
    max_reach = 0
    
    for i in range(len(nums)):
        if i > max_reach:
            return False
        
        max_reach = max(max_reach, i + nums[i])
        
        if max_reach >= len(nums) - 1:
            return True
    
    return True
```

---

### 🔟 Backtracking

**When to Use:**
- Generate all combinations/permutations
- Constraint satisfaction
- Puzzle solving

**Keywords to Watch For:**
- "all possible"
- "generate all"
- "find all solutions"

**Example Problems:**
```
✓ Permutations
✓ Subsets
✓ N-Queens
✓ Sudoku Solver
```

**Template:**
```python
def backtrack(result, path, choices):
    # Base case: found a valid solution
    if is_valid_solution(path):
        result.append(path[:])  # Make a copy
        return
    
    # Try each choice
    for choice in choices:
        # Make choice
        path.append(choice)
        
        # Recurse
        backtrack(result, path, get_new_choices())
        
        # Undo choice (backtrack)
        path.pop()
```

---

## 🎯 Pattern Recognition Practice

### Exercise 1: Identify the Pattern

For each problem, identify which pattern(s) apply:

#### Problem A:
```
Given a sorted array, find if there exist two numbers that sum to target.
```
<details>
<summary>Answer</summary>

**Pattern:** Two Pointers (opposite ends)  
**Why:** Sorted array + finding pair + sum condition = classic two pointer
</details>

---

#### Problem B:
```
Check if a linked list has a cycle.
```
<details>
<summary>Answer</summary>

**Pattern:** Fast & Slow Pointers  
**Why:** Linked list + cycle detection = Floyd's algorithm
</details>

---

#### Problem C:
```
Find the level order traversal of a binary tree.
```
<details>
<summary>Answer</summary>

**Pattern:** BFS  
**Why:** Level-by-level traversal = breadth-first search
</details>

---

#### Problem D:
```
Find the longest substring without repeating characters.
```
<details>
<summary>Answer</summary>

**Pattern:** Sliding Window + Hash Set  
**Why:** Substring = window, no repeating = track seen characters
</details>

---

#### Problem E:
```
Generate all subsets of a set.
```
<details>
<summary>Answer</summary>

**Pattern:** Backtracking  
**Why:** "All" + combinations = backtracking
</details>

---

#### Problem F:
```
Count the number of ways to climb n stairs (1 or 2 steps at a time).
```
<details>
<summary>Answer</summary>

**Pattern:** Dynamic Programming  
**Why:** "Count ways" + optimal substructure = DP
</details>

---

## 🔍 Pattern Decision Tree

Use this flowchart to identify patterns:

```
START: Read Problem
    ↓
Is it about PAIRS or SUBARRAYS?
    ├─ YES, and SORTED → Two Pointers
    └─ YES, but UNSORTED → Hash Map
    ↓
Is it about LINKED LISTS?
    ├─ Cycle/Middle → Fast & Slow Pointers
    └─ General traversal → DFS/Recursion
    ↓
Is it about MATCHING/PAIRS (parentheses)?
    └─ YES → Stack
    ↓
Is it about SHORTEST PATH or LEVELS?
    └─ YES → BFS
    ↓
Is it about ALL PATHS or EXPLORATION?
    └─ YES → DFS
    ↓
Is it asking for ALL COMBINATIONS?
    └─ YES → Backtracking
    ↓
Is it asking to OPTIMIZE (min/max)?
    ├─ With overlapping subproblems → DP
    └─ Greedy choice works → Greedy
    ↓
Is it a SEARCH problem?
    ├─ Sorted input → Binary Search
    └─ Unsorted → Linear/Hash Map
```

---

## 📊 Pattern Comparison Table

| Pattern | Time | Space | Best For | Avoid For |
|---------|------|-------|----------|-----------|
| Two Pointers | O(n) | O(1) | Sorted arrays, pairs | Unsorted, complex conditions |
| Sliding Window | O(n) | O(k) | Subarrays, substrings | Non-contiguous elements |
| Hash Map | O(n) | O(n) | Fast lookup, counting | Space-constrained |
| Binary Search | O(log n) | O(1) | Sorted arrays | Unsorted arrays |
| BFS | O(V+E) | O(V) | Shortest path, levels | Deep trees, memory limit |
| DFS | O(V+E) | O(h) | All paths, backtracking | Shortest path |
| DP | O(n²) typical | O(n) typical | Optimization, counting | No optimal substructure |
| Greedy | O(n log n) | O(1) | Quick approximations | Need exact optimal |

---

## 💡 Pro Tips for Pattern Recognition

### 1. Build Your Pattern Library
Keep a notebook with:
- Pattern name
- When to use it
- Code template
- 3-5 example problems

### 2. Practice with Intent
When solving problems:
- Identify the pattern BEFORE coding
- Note similar problems
- Build connections

### 3. Use Elimination
Can't find pattern? Eliminate:
- Not sorted → No binary search
- No pairs → No two pointers
- Not optimization → No DP

### 4. Look for Keywords
Train yourself to spot:
- "All possibilities" → Backtracking
- "Shortest" → BFS
- "Count ways" → DP
- "Sorted" → Binary Search / Two Pointers

### 5. Start Simple
- Easy problem patterns are more obvious
- Master basic patterns before advanced

---

## ✅ Pattern Recognition Checklist

Before solving, ask yourself:

- [ ] What type of input? (Array, tree, graph, string)
- [ ] Is it sorted?
- [ ] Am I looking for pairs/triplets?
- [ ] Do I need shortest or all paths?
- [ ] Is it an optimization problem?
- [ ] Are there overlapping subproblems?
- [ ] Do I need to generate all possibilities?
- [ ] What's the most efficient approach?

---

## 📚 Practice Problems by Pattern

### Two Pointers: (5 problems)
1. Two Sum II (Sorted Array) - LeetCode #167
2. 3Sum - LeetCode #15
3. Container With Most Water - LeetCode #11
4. Remove Duplicates - LeetCode #26
5. Valid Palindrome - LeetCode #125

### Hash Map: (5 problems)
6. Two Sum - LeetCode #1
7. Group Anagrams - LeetCode #49
8. Contains Duplicate - LeetCode #217
9. First Unique Character - LeetCode #387
10. Intersection of Two Arrays - LeetCode #349

### Sliding Window: (3 problems)
11. Maximum Sum Subarray of Size K
12. Longest Substring Without Repeating - LeetCode #3
13. Minimum Window Substring - LeetCode #76

### Stack: (2 problems)
14. Valid Parentheses - LeetCode #20
15. Daily Temperatures - LeetCode #739

---

## 🎓 Key Takeaways

1. **Most problems follow known patterns** - Learn to recognize them
2. **Keywords hint at patterns** - Train your pattern radar
3. **Build a mental library** - Study 3-5 problems per pattern
4. **Don't force patterns** - Some problems need creative solutions
5. **Practice pattern identification** - It gets faster with experience

---

**Remember:** Pattern recognition is a skill that improves with practice. The more problems you solve, the faster you'll spot patterns! 🧩

---

[← Previous: Understanding Problems](./01-Understanding-Problems.md) | [Next: Breaking Down Problems →](./03-Breaking-Down-Problems.md)
