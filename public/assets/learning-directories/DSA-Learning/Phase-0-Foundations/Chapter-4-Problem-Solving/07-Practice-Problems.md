# Module 7: Practice Problems

## 🎯 Module Overview

**Practice is where theory meets reality.**

This module contains 30+ carefully selected problems to apply all the techniques you've learned in this chapter.

**Time Required:** Ongoing practice  
**Problems:** 30+ with solutions and explanations

---

## 📚 How to Use This Module

### The Right Way to Practice:

```
1. READ problem carefully (3 times)
2. FILL OUT problem analysis template
3. IDENTIFY the pattern
4. WRITE pseudocode
5. CODE the solution
6. TEST thoroughly
7. DEBUG if needed
8. REVIEW solution approach
```

### ❌ Don't:
- Jump straight to coding
- Look at solution immediately
- Give up after 5 minutes
- Skip testing

### ✅ Do:
- Spend 5-10 minutes understanding
- Try multiple approaches
- Test edge cases
- Learn from solutions even when correct

---

## 🎓 Problem Categories

### Category 1: Problem Understanding (5 problems)
Focus: Reading comprehension, identifying requirements

### Category 2: Pattern Recognition (10 problems)
Focus: Identifying problem patterns

### Category 3: Problem Decomposition (5 problems)
Focus: Breaking problems into subproblems

### Category 4: Implementation (10 problems)
Focus: Coding, testing, debugging

---

## 📝 Category 1: Problem Understanding

### Problem 1.1: Contains Duplicate

**Problem:**
```
Given an integer array nums, return true if any value appears at least 
twice in the array, and return false if every element is distinct.

Example 1:
Input: nums = [1,2,3,1]
Output: true

Example 2:
Input: nums = [1,2,3,4]
Output: false

Example 3:
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true

Constraints:
- 1 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9
```

**Your Task:** Fill out the problem analysis template before looking at the solution.

<details>
<summary>Analysis</summary>

```markdown
### Understanding:
- **What:** Check if array has any duplicate values
- **Core challenge:** Efficiently track seen values

### Input:
- **Type:** Array of integers
- **Size:** 1 to 100,000 elements
- **Range:** -1 billion to +1 billion

### Output:
- **Type:** Boolean (true/false)
- **Format:** Single boolean value

### Constraints:
- **Time:** O(n²) might be too slow
- **Space:** Can use extra space

### Edge Cases:
- Single element → false (can't have duplicate)
- All same → true
- All different → false
- Two elements same → true

### Pattern:
- Hash Set for O(1) lookup
```

</details>

<details>
<summary>Solution</summary>

```python
def contains_duplicate(nums):
    """
    Approach: Use set to track seen numbers
    Time: O(n), Space: O(n)
    """
    seen = set()
    
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    
    return False

# Alternative (more concise)
def contains_duplicate_v2(nums):
    return len(nums) != len(set(nums))

# Test cases
assert contains_duplicate([1,2,3,1]) == True
assert contains_duplicate([1,2,3,4]) == False
assert contains_duplicate([1,1,1,3,3,4,3,2,4,2]) == True
```

</details>

---

### Problem 1.2: Valid Anagram

**Problem:**
```
Given two strings s and t, return true if t is an anagram of s, and 
false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a 
different word or phrase, typically using all the original letters 
exactly once.

Example 1:
Input: s = "anagram", t = "nagaram"
Output: true

Example 2:
Input: s = "rat", t = "car"
Output: false

Constraints:
- 1 <= s.length, t.length <= 5 * 10^4
- s and t consist of lowercase English letters.
```

**Your Task:** Analyze and solve.

<details>
<summary>Solution</summary>

```python
def is_anagram(s, t):
    """
    Approach 1: Sort both strings
    Time: O(n log n), Space: O(1)
    """
    return sorted(s) == sorted(t)

def is_anagram_v2(s, t):
    """
    Approach 2: Count character frequencies
    Time: O(n), Space: O(1) - limited to 26 letters
    """
    if len(s) != len(t):
        return False
    
    from collections import Counter
    return Counter(s) == Counter(t)

def is_anagram_v3(s, t):
    """
    Approach 3: Manual counting
    Time: O(n), Space: O(1)
    """
    if len(s) != len(t):
        return False
    
    count = {}
    
    for char in s:
        count[char] = count.get(char, 0) + 1
    
    for char in t:
        if char not in count:
            return False
        count[char] -= 1
        if count[char] < 0:
            return False
    
    return True

# Test cases
assert is_anagram("anagram", "nagaram") == True
assert is_anagram("rat", "car") == False
assert is_anagram("", "") == True
assert is_anagram("a", "a") == True
```

</details>

---

### Problem 1.3: Two Sum

**Problem:**
```
Given an array of integers nums and an integer target, return indices 
of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and 
you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]
```

<details>
<summary>Solution with Multiple Approaches</summary>

```python
def two_sum_brute(nums, target):
    """
    Approach 1: Brute force - try all pairs
    Time: O(n²), Space: O(1)
    """
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return None

def two_sum_hash(nums, target):
    """
    Approach 2: Hash map for O(1) lookup
    Time: O(n), Space: O(n)
    """
    seen = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    
    return None

# Test cases
assert two_sum_hash([2,7,11,15], 9) == [0,1]
assert two_sum_hash([3,2,4], 6) == [1,2]
assert two_sum_hash([3,3], 6) == [0,1]
```

**Pattern:** Hash Map for finding complements

</details>

---

## 🎯 Category 2: Pattern Recognition

### Problem 2.1: Best Time to Buy and Sell Stock

**Problem:**
```
You are given an array prices where prices[i] is the price of a given 
stock on the ith day.

You want to maximize your profit by choosing a single day to buy one 
stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If 
you cannot achieve any profit, return 0.

Example 1:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), 
profit = 6-1 = 5.

Example 2:
Input: prices = [7,6,4,3,1]
Output: 0
```

**Hint:** What pattern helps track minimum and maximum?

<details>
<summary>Solution</summary>

```python
def max_profit(prices):
    """
    Pattern: Sliding window / Single pass
    Keep track of minimum price seen and maximum profit
    
    Time: O(n), Space: O(1)
    """
    if not prices:
        return 0
    
    min_price = float('inf')
    max_profit = 0
    
    for price in prices:
        # Update minimum price if current is lower
        min_price = min(min_price, price)
        
        # Calculate profit if we sell at current price
        profit = price - min_price
        
        # Update maximum profit
        max_profit = max(max_profit, profit)
    
    return max_profit

# Test cases
assert max_profit([7,1,5,3,6,4]) == 5
assert max_profit([7,6,4,3,1]) == 0
assert max_profit([]) == 0
assert max_profit([1]) == 0
assert max_profit([1,2]) == 1
```

**Key Insight:** Only need to track min price and max profit so far

</details>

---

### Problem 2.2: Valid Palindrome

**Problem:**
```
A phrase is a palindrome if, after converting all uppercase letters 
into lowercase letters and removing all non-alphanumeric characters, 
it reads the same forward and backward.

Given a string s, return true if it is a palindrome, or false otherwise.

Example 1:
Input: s = "A man, a plan, a canal: Panama"
Output: true

Example 2:
Input: s = "race a car"
Output: false
```

**Hint:** What pattern works well for checking both ends?

<details>
<summary>Solution</summary>

```python
def is_palindrome(s):
    """
    Pattern: Two Pointers (opposite ends)
    
    Time: O(n), Space: O(1)
    """
    left, right = 0, len(s) - 1
    
    while left < right:
        # Skip non-alphanumeric from left
        while left < right and not s[left].isalnum():
            left += 1
        
        # Skip non-alphanumeric from right
        while left < right and not s[right].isalnum():
            right -= 1
        
        # Compare characters (case-insensitive)
        if s[left].lower() != s[right].lower():
            return False
        
        left += 1
        right -= 1
    
    return True

# Alternative: Clean first, then check
def is_palindrome_v2(s):
    """
    Time: O(n), Space: O(n)
    """
    # Remove non-alphanumeric and convert to lowercase
    cleaned = ''.join(c.lower() for c in s if c.isalnum())
    
    # Check if cleaned string is same as reversed
    return cleaned == cleaned[::-1]

# Test cases
assert is_palindrome("A man, a plan, a canal: Panama") == True
assert is_palindrome("race a car") == False
assert is_palindrome("") == True
assert is_palindrome(" ") == True
assert is_palindrome("a") == True
```

</details>

---

### Problem 2.3: Linked List Cycle

**Problem:**
```
Given head, the head of a linked list, determine if the linked list 
has a cycle in it.

There is a cycle in a linked list if there is some node in the list 
that can be reached again by continuously following the next pointer.

Return true if there is a cycle in the linked list. Otherwise, 
return false.
```

**Hint:** What pattern is perfect for cycle detection?

<details>
<summary>Solution</summary>

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def has_cycle(head):
    """
    Pattern: Fast & Slow Pointers (Floyd's Cycle Detection)
    
    If there's a cycle, fast will eventually meet slow
    
    Time: O(n), Space: O(1)
    """
    if not head or not head.next:
        return False
    
    slow = head
    fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        if slow == fast:
            return True
    
    return False

# Alternative: Hash set
def has_cycle_v2(head):
    """
    Time: O(n), Space: O(n)
    """
    seen = set()
    current = head
    
    while current:
        if current in seen:
            return True
        seen.add(current)
        current = current.next
    
    return False

# Test (manually create cycle)
node1 = ListNode(1)
node2 = ListNode(2)
node3 = ListNode(3)
node1.next = node2
node2.next = node3
node3.next = node2  # Creates cycle

assert has_cycle(node1) == True
```

**Pattern:** Fast & Slow Pointers

</details>

---

## 🧩 Category 3: Problem Decomposition

### Problem 3.1: Merge Two Sorted Lists

**Problem:**
```
You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by 
splicing together the nodes of the first two lists.

Return the head of the merged linked list.

Example:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```

**Task:** Break this into subproblems first!

<details>
<summary>Decomposition</summary>

```
Main Problem: Merge two sorted lists

Subproblems:
1. Compare heads of both lists
2. Choose smaller one
3. Advance pointer of chosen list
4. Repeat until one list is empty
5. Append remaining list

Edge Cases:
- One or both lists empty
- Lists of different lengths
```

</details>

<details>
<summary>Solution</summary>

```python
def merge_two_lists(l1, l2):
    """
    Approach: Iterative with dummy node
    
    Time: O(n + m), Space: O(1)
    """
    # Create dummy node to simplify logic
    dummy = ListNode(0)
    current = dummy
    
    # Compare and merge
    while l1 and l2:
        if l1.val <= l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    
    # Append remaining nodes
    current.next = l1 if l1 else l2
    
    return dummy.next

# Recursive approach
def merge_two_lists_recursive(l1, l2):
    """
    Time: O(n + m), Space: O(n + m) for recursion stack
    """
    # Base cases
    if not l1:
        return l2
    if not l2:
        return l1
    
    # Recursive case
    if l1.val <= l2.val:
        l1.next = merge_two_lists_recursive(l1.next, l2)
        return l1
    else:
        l2.next = merge_two_lists_recursive(l1, l2.next)
        return l2
```

</details>

---

### Problem 3.2: Reverse Linked List

**Problem:**
```
Given the head of a singly linked list, reverse the list, and return 
the reversed list.

Example:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
```

**Task:** Identify the subproblems!

<details>
<summary>Solution with Multiple Approaches</summary>

```python
def reverse_list_iterative(head):
    """
    Approach: Iterative with three pointers
    
    Subproblems:
    1. Track previous node (starts as None)
    2. For each node:
       a. Save next node
       b. Reverse current's pointer
       c. Move prev and current forward
    
    Time: O(n), Space: O(1)
    """
    prev = None
    current = head
    
    while current:
        # Save next node
        next_node = current.next
        
        # Reverse pointer
        current.next = prev
        
        # Move forward
        prev = current
        current = next_node
    
    return prev

def reverse_list_recursive(head):
    """
    Approach: Recursive
    
    Base case: Empty or single node
    Recursive: Reverse rest, then attach current to end
    
    Time: O(n), Space: O(n) for recursion
    """
    # Base case
    if not head or not head.next:
        return head
    
    # Recursive case
    new_head = reverse_list_recursive(head.next)
    
    # Reverse the link
    head.next.next = head
    head.next = None
    
    return new_head
```

</details>

---

## 💻 Category 4: Full Implementation

### Problem 4.1: Maximum Subarray (Kadane's Algorithm)

**Problem:**
```
Given an integer array nums, find the subarray with the largest sum, 
and return its sum.

Example:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
```

<details>
<summary>Complete Solution</summary>

```python
def max_subarray(nums):
    """
    Kadane's Algorithm
    
    Idea: At each position, decide whether to:
    - Extend current subarray, or
    - Start new subarray
    
    Time: O(n), Space: O(1)
    """
    if not nums:
        return 0
    
    max_sum = nums[0]
    current_sum = nums[0]
    
    for num in nums[1:]:
        # Either extend current or start new
        current_sum = max(num, current_sum + num)
        
        # Update maximum
        max_sum = max(max_sum, current_sum)
    
    return max_sum

# Test cases
assert max_subarray([-2,1,-3,4,-1,2,1,-5,4]) == 6
assert max_subarray([1]) == 1
assert max_subarray([5,4,-1,7,8]) == 23
assert max_subarray([-1]) == -1
assert max_subarray([-2,-1]) == -1

print("All tests passed!")
```

**Key Insight:** Only need to track current sum and maximum sum

</details>

---

### Problem 4.2: Binary Search

**Problem:**
```
Given an array of integers nums which is sorted in ascending order, 
and an integer target, write a function to search target in nums. If 
target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.
```

<details>
<summary>Complete Solution with Testing</summary>

```python
def binary_search(nums, target):
    """
    Classic binary search
    
    Time: O(log n), Space: O(1)
    """
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2  # Avoid overflow
        
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Comprehensive test suite
def test_binary_search():
    # Normal cases
    assert binary_search([1,2,3,4,5], 3) == 2
    assert binary_search([1,2,3,4,5], 1) == 0
    assert binary_search([1,2,3,4,5], 5) == 4
    
    # Not found
    assert binary_search([1,2,3,4,5], 6) == -1
    assert binary_search([1,2,3,4,5], 0) == -1
    
    # Edge cases
    assert binary_search([], 1) == -1
    assert binary_search([1], 1) == 0
    assert binary_search([1], 2) == -1
    assert binary_search([1,2], 1) == 0
    assert binary_search([1,2], 2) == 1
    
    # Duplicates
    assert binary_search([1,2,2,2,3], 2) in [1,2,3]
    
    # Large array
    large = list(range(10**6))
    assert binary_search(large, 999999) == 999999
    
    print("All tests passed!")

test_binary_search()
```

</details>

---

## 🎯 Challenge Problems

### Challenge 1: Product of Array Except Self

**Problem:**
```
Given an integer array nums, return an array answer such that answer[i] 
is equal to the product of all the elements of nums except nums[i].

You must write an algorithm that runs in O(n) time and without using 
the division operation.

Example:
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
```

<details>
<summary>Hint</summary>

Think about left products and right products separately.

For index i:
- answer[i] = (product of all left) × (product of all right)

</details>

<details>
<summary>Solution</summary>

```python
def product_except_self(nums):
    """
    Two-pass approach: left products, then right products
    
    Time: O(n), Space: O(1) not counting output array
    """
    n = len(nums)
    answer = [1] * n
    
    # First pass: left products
    left_product = 1
    for i in range(n):
        answer[i] = left_product
        left_product *= nums[i]
    
    # Second pass: right products
    right_product = 1
    for i in range(n - 1, -1, -1):
        answer[i] *= right_product
        right_product *= nums[i]
    
    return answer

# Test
assert product_except_self([1,2,3,4]) == [24,12,8,6]
assert product_except_self([-1,1,0,-3,3]) == [0,0,9,0,0]
```

</details>

---

## ✅ Practice Schedule

### Week 1: Foundation (Problems 1.1 - 2.3)
- Day 1: Problems 1.1 - 1.3
- Day 2: Problems 2.1 - 2.3
- Day 3: Review and retry difficult ones

### Week 2: Intermediate (Problems 3.1 - 4.2)
- Day 1: Problems 3.1 - 3.2
- Day 2: Problems 4.1 - 4.2
- Day 3: Challenge problems

### Week 3: Advanced
- Practice additional problems from LeetCode Easy
- Focus on weak areas
- Time yourself

---

## 💡 Practice Tips

1. **Time Yourself:** Start with 30 minutes per problem
2. **Don't Peek:** Resist looking at solution immediately
3. **Multiple Attempts:** If stuck, take a break and return
4. **Learn from Solutions:** Study alternative approaches
5. **Redo Problems:** Come back after a week and retry
6. **Track Progress:** Note which patterns you struggle with

---

## 📚 Additional Resources

### More Practice:
- LeetCode: Problems tagged "Easy"
- HackerRank: Problem Solving (Basic)
- CodeSignal: Interview Practice
- Exercism: Practice tracks

### Study Groups:
- Join Discord study servers
- Form local study groups
- Pair program with peers

---

**Remember:** Consistent practice beats occasional marathons. 30 minutes daily > 5 hours once a week! 🎯

---

[← Previous: Testing and Verification](./06-Testing-and-Verification.md) | [Back to Chapter 4](./README.md) | [Next: Phase 1 →](../../Phase-1-Linear-Data-Structures/README.md)
