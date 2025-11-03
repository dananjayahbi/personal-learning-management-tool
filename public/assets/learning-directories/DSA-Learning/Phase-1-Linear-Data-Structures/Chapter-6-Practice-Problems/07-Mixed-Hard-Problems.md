# Mixed Hard Problems

## 🎯 Problem Set Overview

**10 hard problems** that combine multiple data structures and advanced techniques. These problems test your ability to integrate everything learned in Phase 1.

**Time to Complete:** 5-7 days  
**Approach:** Break down into subproblems, combine multiple techniques

---

## Problem 1: Trapping Rain Water

**Link:** [LeetCode 42](https://leetcode.com/problems/trapping-rain-water/)  
**Difficulty:** Hard  
**Patterns:** Two Pointers / Stack / DP

### Problem Statement
Calculate total water trapped after raining given elevation map.

### Solution 1: Two Pointers (Optimal)
```python
def trap(height):
    """
    Two pointers tracking max heights.
    Time: O(n), Space: O(1)
    """
    if not height:
        return 0
    
    left, right = 0, len(height) - 1
    left_max = right_max = 0
    water = 0
    
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1
    
    return water
```

### Key Insight
Water trapped at position = min(max_left, max_right) - height[i]

---

## Problem 2: Median of Two Sorted Arrays

**Link:** [LeetCode 4](https://leetcode.com/problems/median-of-two-sorted-arrays/)  
**Difficulty:** Hard  
**Pattern:** Binary Search

### Solution
```python
def find_median_sorted_arrays(nums1, nums2):
    """
    Binary search on smaller array.
    Time: O(log(min(m, n))), Space: O(1)
    """
    # Ensure nums1 is smaller
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    
    m, n = len(nums1), len(nums2)
    left, right = 0, m
    
    while left <= right:
        partition1 = (left + right) // 2
        partition2 = (m + n + 1) // 2 - partition1
        
        max_left1 = float('-inf') if partition1 == 0 else nums1[partition1 - 1]
        min_right1 = float('inf') if partition1 == m else nums1[partition1]
        
        max_left2 = float('-inf') if partition2 == 0 else nums2[partition2 - 1]
        min_right2 = float('inf') if partition2 == n else nums2[partition2]
        
        if max_left1 <= min_right2 and max_left2 <= min_right1:
            # Found correct partition
            if (m + n) % 2 == 0:
                return (max(max_left1, max_left2) + min(min_right1, min_right2)) / 2
            else:
                return max(max_left1, max_left2)
        elif max_left1 > min_right2:
            right = partition1 - 1
        else:
            left = partition1 + 1
```

---

## Problem 3: Regular Expression Matching

**Link:** [LeetCode 10](https://leetcode.com/problems/regular-expression-matching/)  
**Difficulty:** Hard  
**Pattern:** Dynamic Programming

### Solution
```python
def is_match(s, p):
    """
    DP: dp[i][j] = match s[:i] with p[:j]
    Time: O(m * n), Space: O(m * n)
    """
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    
    dp[0][0] = True
    
    # Handle patterns like a*, a*b*, a*b*c*
    for j in range(2, n + 1):
        if p[j - 1] == '*':
            dp[0][j] = dp[0][j - 2]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j - 1] == '*':
                # Match zero or more of preceding element
                dp[i][j] = dp[i][j - 2]  # Zero occurrences
                
                if p[j - 2] == s[i - 1] or p[j - 2] == '.':
                    dp[i][j] = dp[i][j] or dp[i - 1][j]  # One or more
            elif p[j - 1] == '.' or p[j - 1] == s[i - 1]:
                dp[i][j] = dp[i - 1][j - 1]
    
    return dp[m][n]
```

---

## Problem 4: Longest Valid Parentheses

**Link:** [LeetCode 32](https://leetcode.com/problems/longest-valid-parentheses/)  
**Difficulty:** Hard  
**Pattern:** Stack / DP

### Solution 1: Stack
```python
def longest_valid_parentheses(s):
    """
    Stack stores indices.
    Time: O(n), Space: O(n)
    """
    stack = [-1]
    max_length = 0
    
    for i, char in enumerate(s):
        if char == '(':
            stack.append(i)
        else:
            stack.pop()
            if not stack:
                stack.append(i)
            else:
                max_length = max(max_length, i - stack[-1])
    
    return max_length
```

### Solution 2: Two Pass
```python
def longest_valid_parentheses_two_pass(s):
    """
    Two passes: left-to-right and right-to-left.
    Time: O(n), Space: O(1)
    """
    def scan(s):
        left = right = max_length = 0
        for char in s:
            if char == '(':
                left += 1
            else:
                right += 1
            
            if left == right:
                max_length = max(max_length, 2 * right)
            elif right > left:
                left = right = 0
        
        return max_length
    
    return max(scan(s), scan(s[::-1]))
```

---

## Problem 5: Word Ladder

**Link:** [LeetCode 127](https://leetcode.com/problems/word-ladder/)  
**Difficulty:** Hard  
**Pattern:** BFS + Hash Set

### Solution
```python
from collections import deque

def ladder_length(begin_word, end_word, word_list):
    """
    BFS for shortest transformation.
    Time: O(M² * N), Space: O(M * N)
    M = word length, N = word count
    """
    word_set = set(word_list)
    if end_word not in word_set:
        return 0
    
    queue = deque([(begin_word, 1)])
    visited = {begin_word}
    
    while queue:
        word, length = queue.popleft()
        
        if word == end_word:
            return length
        
        # Try all possible one-letter changes
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                next_word = word[:i] + c + word[i + 1:]
                
                if next_word in word_set and next_word not in visited:
                    visited.add(next_word)
                    queue.append((next_word, length + 1))
    
    return 0
```

---

## Problem 6: Minimum Window Substring (Covered in Hashing)

**Link:** [LeetCode 76]  
**Pattern:** Sliding Window + Hash Map  
Time: O(m + n), Space: O(m + n)

---

## Problem 7: First Missing Positive

**Link:** [LeetCode 41](https://leetcode.com/problems/first-missing-positive/)  
**Difficulty:** Hard  
**Pattern:** Index as Hash Key

### Solution
```python
def first_missing_positive(nums):
    """
    Place each number at its correct index.
    Time: O(n), Space: O(1)
    """
    n = len(nums)
    
    # Place numbers in correct positions
    for i in range(n):
        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
            # Swap nums[i] to its correct position
            correct_pos = nums[i] - 1
            nums[i], nums[correct_pos] = nums[correct_pos], nums[i]
    
    # Find first position where number is incorrect
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1
    
    return n + 1
```

---

## Problem 8: Maximal Rectangle

**Link:** [LeetCode 85](https://leetcode.com/problems/maximal-rectangle/)  
**Difficulty:** Hard  
**Pattern:** Monotonic Stack + DP

### Solution
```python
def maximal_rectangle(matrix):
    """
    Convert to histogram problem for each row.
    Time: O(m * n), Space: O(n)
    """
    if not matrix or not matrix[0]:
        return 0
    
    n = len(matrix[0])
    heights = [0] * n
    max_area = 0
    
    for row in matrix:
        # Update heights
        for i in range(n):
            if row[i] == '1':
                heights[i] += 1
            else:
                heights[i] = 0
        
        # Calculate max rectangle in histogram
        max_area = max(max_area, largest_rectangle_area(heights))
    
    return max_area

def largest_rectangle_area(heights):
    """Helper: Largest rectangle in histogram."""
    stack = []
    max_area = 0
    heights.append(0)
    
    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height_index = stack.pop()
            height = heights[height_index]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    
    heights.pop()
    return max_area
```

---

## Problem 9: Merge K Sorted Lists

**Link:** [LeetCode 23](https://leetcode.com/problems/merge-k-sorted-lists/)  
**Difficulty:** Hard  
**Pattern:** Heap / Divide & Conquer

### Solution 1: Min Heap
```python
import heapq

def merge_k_lists(lists):
    """
    Use min heap for efficient merging.
    Time: O(N log k), Space: O(k)
    N = total nodes, k = number of lists
    """
    heap = []
    
    # Initialize heap with first node of each list
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))
    
    dummy = ListNode(0)
    current = dummy
    
    while heap:
        val, i, node = heapq.heappop(heap)
        current.next = node
        current = current.next
        
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    
    return dummy.next
```

### Solution 2: Divide & Conquer
```python
def merge_k_lists_dc(lists):
    """
    Divide and conquer approach.
    Time: O(N log k), Space: O(log k)
    """
    if not lists:
        return None
    
    def merge_two(l1, l2):
        dummy = ListNode(0)
        current = dummy
        
        while l1 and l2:
            if l1.val <= l2.val:
                current.next = l1
                l1 = l1.next
            else:
                current.next = l2
                l2 = l2.next
            current = current.next
        
        current.next = l1 if l1 else l2
        return dummy.next
    
    def merge_lists(lists, start, end):
        if start == end:
            return lists[start]
        
        mid = (start + end) // 2
        left = merge_lists(lists, start, mid)
        right = merge_lists(lists, mid + 1, end)
        
        return merge_two(left, right)
    
    return merge_lists(lists, 0, len(lists) - 1)
```

---

## Problem 10: Longest Substring with At Most K Distinct Characters

**Link:** [LeetCode 340](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/) (Premium)  
**Difficulty:** Medium/Hard  
**Pattern:** Sliding Window + Hash Map

### Solution
```python
def length_of_longest_substring_k_distinct(s, k):
    """
    Sliding window with hash map.
    Time: O(n), Space: O(k)
    """
    from collections import defaultdict
    
    char_count = defaultdict(int)
    left = 0
    max_length = 0
    
    for right, char in enumerate(s):
        char_count[char] += 1
        
        # Shrink window if too many distinct chars
        while len(char_count) > k:
            left_char = s[left]
            char_count[left_char] -= 1
            if char_count[left_char] == 0:
                del char_count[left_char]
            left += 1
        
        max_length = max(max_length, right - left + 1)
    
    return max_length
```

---

## 📊 Problem Summary

| # | Problem | Key Techniques | Time | Space |
|---|---------|----------------|------|-------|
| 1 | Trapping Rain Water | Two Pointers | O(n) | O(1) |
| 2 | Median of Arrays | Binary Search | O(log(min(m,n))) | O(1) |
| 3 | Regex Matching | DP | O(m*n) | O(m*n) |
| 4 | Valid Parentheses | Stack/Two Pass | O(n) | O(n)/O(1) |
| 5 | Word Ladder | BFS + Hash Set | O(M²*N) | O(M*N) |
| 6 | Min Window | Sliding Window | O(m+n) | O(m+n) |
| 7 | First Missing + | Index Hash | O(n) | O(1) |
| 8 | Maximal Rectangle | Stack + DP | O(m*n) | O(n) |
| 9 | Merge K Lists | Heap/Divide&Conquer | O(N log k) | O(k) |
| 10 | K Distinct Chars | Sliding Window | O(n) | O(k) |

---

## 🎯 Key Insights

### When to Use What:
1. **Two Pointers** - When you need O(1) space and can process from both ends
2. **Stack** - For matching, nesting, monotonic sequences
3. **Heap** - For K-way merging, top-K problems
4. **Binary Search** - On sorted data, even when not obvious
5. **DP** - When problem has optimal substructure
6. **Hash Map** - For frequency counting, grouping, caching
7. **Sliding Window** - For subarray/substring problems
8. **BFS** - For shortest path in unweighted graphs
9. **Index as Hash** - When values are in range [1, n]

### Problem-Solving Framework:
1. **Understand** - Read carefully, clarify constraints
2. **Examples** - Work through examples manually
3. **Brute Force** - Find naive solution first
4. **Optimize** - Identify bottlenecks, use appropriate data structures
5. **Code** - Write clean, modular code
6. **Test** - Edge cases, large inputs, empty inputs

---

## 📈 Progress Tracker

| # | Problem | Status | Attempts | Time Taken | Notes |
|---|---------|--------|----------|------------|-------|
| 1 | Trapping Rain Water | ⬜ | | | |
| 2 | Median of Two Arrays | ⬜ | | | |
| 3 | Regex Matching | ⬜ | | | |
| 4 | Longest Valid Parens | ⬜ | | | |
| 5 | Word Ladder | ⬜ | | | |
| 6 | Min Window Substring | ⬜ | | | |
| 7 | First Missing Positive | ⬜ | | | |
| 8 | Maximal Rectangle | ⬜ | | | |
| 9 | Merge K Sorted Lists | ⬜ | | | |
| 10 | K Distinct Chars | ⬜ | | | |

---

## 💡 Tips for Hard Problems

1. **Don't panic** - Break down into smaller parts
2. **Draw it out** - Visualize with examples
3. **Start simple** - Brute force first
4. **Pattern recognition** - What have you seen before?
5. **Time management** - 40-50 minutes max per problem
6. **Learn from solutions** - Understand why they work
7. **Redo later** - Spaced repetition helps
8. **Combine techniques** - Hard problems often need multiple approaches

---

[← Previous: Hashing Problems](./06-Hashing-Problems.md) | [Next: Problem-Solving Guide →](./08-Problem-Solving-Guide.md)
