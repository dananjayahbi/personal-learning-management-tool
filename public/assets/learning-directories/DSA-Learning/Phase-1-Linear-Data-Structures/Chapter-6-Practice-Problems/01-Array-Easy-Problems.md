# Array - Easy Problems

## 🎯 Problem Set Overview

This section contains **15 easy array problems** that will help you master fundamental array techniques. Focus on understanding patterns rather than memorizing solutions.

**Time to Complete:** 2-3 days  
**Recommended Approach:** Solve in order, understand each solution thoroughly

---

## Problem 1: Two Sum

**Link:** [LeetCode 1](https://leetcode.com/problems/two-sum/)  
**Difficulty:** Easy  
**Pattern:** Hash Map

### Problem Statement
Given an array of integers `nums` and an integer `target`, return indices of two numbers that add up to `target`.

### Examples
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9

Input: nums = [3,2,4], target = 6
Output: [1,2]
```

### Solution Approach

**Brute Force (O(n²)):**
```python
def two_sum_brute(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []
```

**Optimized (O(n)) - Hash Map:**
```python
def two_sum(nums, target):
    """
    Use hash map to store complement.
    
    Time: O(n)
    Space: O(n)
    """
    seen = {}  # value → index
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    
    return []
```

### Key Insights
- Hash map provides O(1) lookup
- Store complement as you iterate
- Single pass solution

**Complexity:**
- Time: O(n)
- Space: O(n)

---

## Problem 2: Remove Duplicates from Sorted Array

**Link:** [LeetCode 26](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)  
**Difficulty:** Easy  
**Pattern:** Two Pointers

### Problem Statement
Remove duplicates from sorted array in-place. Return the new length.

### Examples
```
Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]

Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
```

### Solution
```python
def remove_duplicates(nums):
    """
    Two pointers: slow for unique position, fast for scanning.
    
    Time: O(n)
    Space: O(1)
    """
    if not nums:
        return 0
    
    slow = 0  # Position for next unique element
    
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    
    return slow + 1
```

### Key Insights
- Slow pointer tracks unique position
- Fast pointer scans array
- Only move slow when finding new unique element

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 3: Best Time to Buy and Sell Stock

**Link:** [LeetCode 121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)  
**Difficulty:** Easy  
**Pattern:** One Pass

### Problem Statement
Find maximum profit from buying and selling stock once.

### Examples
```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price=1), sell on day 5 (price=6), profit = 6-1 = 5

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: No profit possible (prices always decrease)
```

### Solution
```python
def max_profit(prices):
    """
    Track minimum price and maximum profit.
    
    Time: O(n)
    Space: O(1)
    """
    if not prices:
        return 0
    
    min_price = float('inf')
    max_profit = 0
    
    for price in prices:
        # Update minimum price
        min_price = min(min_price, price)
        
        # Update maximum profit if selling today
        profit = price - min_price
        max_profit = max(max_profit, profit)
    
    return max_profit
```

### Key Insights
- Track minimum price seen so far
- Calculate profit at each day
- Keep track of maximum profit

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 4: Contains Duplicate

**Link:** [LeetCode 217](https://leetcode.com/problems/contains-duplicate/)  
**Difficulty:** Easy  
**Pattern:** Hash Set

### Problem Statement
Check if array contains any duplicates.

### Examples
```
Input: nums = [1,2,3,1]
Output: true

Input: nums = [1,2,3,4]
Output: false
```

### Solution
```python
def contains_duplicate(nums):
    """
    Use hash set to track seen elements.
    
    Time: O(n)
    Space: O(n)
    """
    seen = set()
    
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    
    return False

# Alternative one-liner
def contains_duplicate_short(nums):
    return len(nums) != len(set(nums))
```

### Key Insights
- Hash set provides O(1) membership test
- Return immediately when duplicate found
- Can also compare lengths

**Complexity:**
- Time: O(n)
- Space: O(n)

---

## Problem 5: Maximum Subarray (Kadane's Algorithm)

**Link:** [LeetCode 53](https://leetcode.com/problems/maximum-subarray/)  
**Difficulty:** Easy  
**Pattern:** Kadane's Algorithm

### Problem Statement
Find contiguous subarray with largest sum.

### Examples
```
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has sum = 6

Input: nums = [1]
Output: 1
```

### Solution
```python
def max_subarray(nums):
    """
    Kadane's algorithm: track current and global max.
    
    Time: O(n)
    Space: O(1)
    """
    if not nums:
        return 0
    
    current_sum = nums[0]
    max_sum = nums[0]
    
    for i in range(1, len(nums)):
        # Either extend current subarray or start new one
        current_sum = max(nums[i], current_sum + nums[i])
        
        # Update global maximum
        max_sum = max(max_sum, current_sum)
    
    return max_sum
```

### Key Insights
- At each position, decide: extend or start new
- Track current subarray sum and global maximum
- This is the famous Kadane's Algorithm

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 6: Move Zeroes

**Link:** [LeetCode 283](https://leetcode.com/problems/move-zeroes/)  
**Difficulty:** Easy  
**Pattern:** Two Pointers

### Problem Statement
Move all zeros to end while maintaining relative order of non-zeros.

### Examples
```
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]

Input: nums = [0]
Output: [0]
```

### Solution
```python
def move_zeroes(nums):
    """
    Two pointers: place non-zeros at front, fill rest with zeros.
    
    Time: O(n)
    Space: O(1)
    """
    # Place non-zeros at front
    pos = 0
    for i in range(len(nums)):
        if nums[i] != 0:
            nums[pos] = nums[i]
            pos += 1
    
    # Fill remaining with zeros
    for i in range(pos, len(nums)):
        nums[i] = 0
```

**Alternative (Swap approach):**
```python
def move_zeroes_swap(nums):
    """Swap non-zeros with first zero position."""
    zero_pos = 0
    
    for i in range(len(nums)):
        if nums[i] != 0:
            nums[zero_pos], nums[i] = nums[i], nums[zero_pos]
            zero_pos += 1
```

### Key Insights
- Two pointers maintain partition
- Or use swap approach for elegance

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 7: Plus One

**Link:** [LeetCode 66](https://leetcode.com/problems/plus-one/)  
**Difficulty:** Easy  
**Pattern:** Array Manipulation

### Problem Statement
Given array representing a number, add one to it.

### Examples
```
Input: digits = [1,2,3]
Output: [1,2,4]

Input: digits = [9,9,9]
Output: [1,0,0,0]
```

### Solution
```python
def plus_one(digits):
    """
    Start from end, handle carry.
    
    Time: O(n)
    Space: O(1) or O(n) if new array needed
    """
    n = len(digits)
    
    # Start from rightmost digit
    for i in range(n - 1, -1, -1):
        # If digit < 9, just add 1 and return
        if digits[i] < 9:
            digits[i] += 1
            return digits
        
        # Digit is 9, set to 0 and continue (carry)
        digits[i] = 0
    
    # All digits were 9, need extra digit
    return [1] + digits
```

### Key Insights
- Handle carry from right to left
- Early return when no more carry
- Special case: all 9s

**Complexity:**
- Time: O(n)
- Space: O(1) or O(n) for new array

---

## Problem 8: Merge Sorted Array

**Link:** [LeetCode 88](https://leetcode.com/problems/merge-sorted-array/)  
**Difficulty:** Easy  
**Pattern:** Two Pointers

### Problem Statement
Merge two sorted arrays into first array (which has enough space).

### Examples
```
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
```

### Solution
```python
def merge(nums1, m, nums2, n):
    """
    Merge from back to avoid overwrites.
    
    Time: O(m + n)
    Space: O(1)
    """
    # Pointers
    p1 = m - 1  # Last element in nums1
    p2 = n - 1  # Last element in nums2
    p = m + n - 1  # Last position in merged array
    
    # Merge from back
    while p2 >= 0:
        if p1 >= 0 and nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]
            p1 -= 1
        else:
            nums1[p] = nums2[p2]
            p2 -= 1
        p -= 1
```

### Key Insights
- Merge from back to avoid overwrites
- No extra space needed
- Handle remaining elements

**Complexity:**
- Time: O(m + n)
- Space: O(1)

---

## Problem 9: Find Pivot Index

**Link:** [LeetCode 724](https://leetcode.com/problems/find-pivot-index/)  
**Difficulty:** Easy  
**Pattern:** Prefix Sum

### Problem Statement
Find index where left sum equals right sum.

### Examples
```
Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation: Left sum = 1+7+3 = 11, Right sum = 5+6 = 11

Input: nums = [1,2,3]
Output: -1
```

### Solution
```python
def pivot_index(nums):
    """
    Use total sum and left sum.
    
    Time: O(n)
    Space: O(1)
    """
    total_sum = sum(nums)
    left_sum = 0
    
    for i, num in enumerate(nums):
        # Right sum = total - left - current
        right_sum = total_sum - left_sum - num
        
        if left_sum == right_sum:
            return i
        
        left_sum += num
    
    return -1
```

### Key Insights
- Use total sum to calculate right sum
- Track left sum as you iterate
- Check balance at each position

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 10: Intersection of Two Arrays

**Link:** [LeetCode 349](https://leetcode.com/problems/intersection-of-two-arrays/)  
**Difficulty:** Easy  
**Pattern:** Hash Set

### Problem Statement
Find intersection of two arrays (unique elements).

### Examples
```
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4] or [4,9]
```

### Solution
```python
def intersection(nums1, nums2):
    """
    Use sets for O(1) lookup.
    
    Time: O(m + n)
    Space: O(min(m, n))
    """
    set1 = set(nums1)
    result = set()
    
    for num in nums2:
        if num in set1:
            result.add(num)
    
    return list(result)

# One-liner
def intersection_short(nums1, nums2):
    return list(set(nums1) & set(nums2))
```

### Key Insights
- Convert to sets for fast lookup
- Use set intersection operation
- Result contains unique elements

**Complexity:**
- Time: O(m + n)
- Space: O(min(m, n))

---

## Problem 11: Single Number

**Link:** [LeetCode 136](https://leetcode.com/problems/single-number/)  
**Difficulty:** Easy  
**Pattern:** XOR Bit Manipulation

### Problem Statement
Given a non-empty array where every element appears twice except one, find that single element.

### Examples
```
Input: nums = [2,2,1]
Output: 1

Input: nums = [4,1,2,1,2]
Output: 4

Input: nums = [1]
Output: 1
```

### Solution
```python
def single_number(nums):
    """
    Use XOR properties:
    - a ^ a = 0
    - a ^ 0 = a
    - XOR is commutative and associative
    
    Time: O(n)
    Space: O(1)
    """
    result = 0
    for num in nums:
        result ^= num
    return result

# One-liner using reduce
from functools import reduce
def single_number_reduce(nums):
    return reduce(lambda x, y: x ^ y, nums)
```

### Key Insights
- XOR of two same numbers is 0
- XOR is commutative: a ^ b ^ a = b
- All pairs cancel out, leaving single number
- No extra space needed

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 12: Valid Anagram

**Link:** [LeetCode 242](https://leetcode.com/problems/valid-anagram/)  
**Difficulty:** Easy  
**Pattern:** Frequency Counting

### Problem Statement
Check if two strings are anagrams (contain same characters with same frequencies).

### Examples
```
Input: s = "anagram", t = "nagaram"
Output: true

Input: s = "rat", t = "car"
Output: false
```

### Solution
```python
def is_anagram(s, t):
    """
    Compare character frequencies.
    
    Time: O(n)
    Space: O(1) - max 26 characters
    """
    if len(s) != len(t):
        return False
    
    # Method 1: Using Counter
    from collections import Counter
    return Counter(s) == Counter(t)

def is_anagram_array(s, t):
    """Using fixed-size array for lowercase letters."""
    if len(s) != len(t):
        return False
    
    count = [0] * 26
    
    for i in range(len(s)):
        count[ord(s[i]) - ord('a')] += 1
        count[ord(t[i]) - ord('a')] -= 1
    
    return all(c == 0 for c in count)

def is_anagram_sort(s, t):
    """Sorting approach - less efficient."""
    return sorted(s) == sorted(t)
```

### Key Insights
- Early return if lengths differ
- Counter is Pythonic and clean
- Array method is more efficient
- Sorting works but O(n log n)

**Complexity:**
- Time: O(n)
- Space: O(1) for English letters, O(n) for Counter

---

## Problem 13: Missing Number

**Link:** [LeetCode 268](https://leetcode.com/problems/missing-number/)  
**Difficulty:** Easy  
**Pattern:** Math/XOR

### Problem Statement
Given array containing n distinct numbers in range [0, n], find the missing number.

### Examples
```
Input: nums = [3,0,1]
Output: 2
Explanation: n = 3, range is [0,3], missing is 2

Input: nums = [0,1]
Output: 2

Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
```

### Solution
```python
def missing_number_math(nums):
    """
    Use sum formula: sum(0 to n) = n * (n + 1) / 2
    
    Time: O(n)
    Space: O(1)
    """
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum

def missing_number_xor(nums):
    """
    Use XOR: a ^ a = 0, so XOR all indices and values.
    
    Time: O(n)
    Space: O(1)
    """
    result = len(nums)  # Start with n
    
    for i, num in enumerate(nums):
        result ^= i ^ num
    
    return result

def missing_number_set(nums):
    """Using set - less efficient but intuitive."""
    n = len(nums)
    full_set = set(range(n + 1))
    return full_set.difference(nums).pop()
```

### Key Insights
- Math approach: subtract actual from expected
- XOR approach: elegant bit manipulation
- Set approach: intuitive but uses O(n) space

**Complexity:**
- Time: O(n)
- Space: O(1) for math/XOR, O(n) for set

---

## Problem 14: Search Insert Position

**Link:** [LeetCode 35](https://leetcode.com/problems/search-insert-position/)  
**Difficulty:** Easy  
**Pattern:** Binary Search

### Problem Statement
Given sorted array and target, return index if found, else return index where it would be inserted.

### Examples
```
Input: nums = [1,3,5,6], target = 5
Output: 2

Input: nums = [1,3,5,6], target = 2
Output: 1

Input: nums = [1,3,5,6], target = 7
Output: 4
```

### Solution
```python
def search_insert(nums, target):
    """
    Standard binary search with modification.
    
    Time: O(log n)
    Space: O(1)
    """
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    # When loop ends, left is the insert position
    return left
```

### Detailed Walkthrough
```python
def search_insert_verbose(nums, target):
    """
    With detailed comments and edge cases.
    """
    # Edge cases
    if not nums:
        return 0
    if target < nums[0]:
        return 0
    if target > nums[-1]:
        return len(nums)
    
    left, right = 0, len(nums) - 1
    
    while left <= right:
        # Avoid overflow in other languages
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            return mid  # Found target
        elif nums[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half
    
    # Key insight: when left > right, left is insert position
    return left
```

### Key Insights
- When target not found, `left` points to insert position
- This happens because left becomes > right by 1
- Handle edge cases explicitly for clarity

**Complexity:**
- Time: O(log n)
- Space: O(1)

---

## Problem 15: Pascal's Triangle

**Link:** [LeetCode 118](https://leetcode.com/problems/pascals-triangle/)  
**Difficulty:** Easy  
**Pattern:** Dynamic Programming / Array Building

### Problem Statement
Generate first numRows of Pascal's triangle.

### Examples
```
Input: numRows = 5
Output: [
         [1],
        [1,1],
       [1,2,1],
      [1,3,3,1],
     [1,4,6,4,1]
]

Input: numRows = 1
Output: [[1]]
```

### Solution
```python
def generate_pascal(numRows):
    """
    Build triangle row by row.
    Each element = sum of two elements above it.
    
    Time: O(numRows²)
    Space: O(numRows²) - for output
    """
    if numRows == 0:
        return []
    
    triangle = [[1]]  # First row
    
    for i in range(1, numRows):
        # Start new row with 1
        row = [1]
        
        # Middle elements: sum of two above
        prev_row = triangle[i - 1]
        for j in range(1, i):
            row.append(prev_row[j - 1] + prev_row[j])
        
        # End row with 1
        row.append(1)
        
        triangle.append(row)
    
    return triangle
```

### Alternative Approach
```python
def generate_pascal_compact(numRows):
    """More compact version."""
    triangle = []
    
    for i in range(numRows):
        # Create row with all 1s
        row = [1] * (i + 1)
        
        # Fill middle elements
        for j in range(1, i):
            row[j] = triangle[i-1][j-1] + triangle[i-1][j]
        
        triangle.append(row)
    
    return triangle
```

### Key Insights
- Each row starts and ends with 1
- Middle elements: sum of two numbers above
- Build row by row using previous row
- Pattern recognition: DP problem

**Complexity:**
- Time: O(numRows²) - total elements in triangle
- Space: O(numRows²) - output space

---

## Bonus Problem: Pascal's Triangle II

**Link:** [LeetCode 119](https://leetcode.com/problems/pascals-triangle-ii/)  
**Difficulty:** Easy  
**Pattern:** Space Optimization

### Problem Statement
Return the kth row of Pascal's triangle (0-indexed).

### Solution
```python
def get_row(rowIndex):
    """
    Generate only the requested row using O(k) space.
    
    Time: O(k²)
    Space: O(k)
    """
    row = [1]
    
    for i in range(rowIndex):
        # Build from right to left to avoid overwriting
        for j in range(len(row) - 1, 0, -1):
            row[j] += row[j - 1]
        row.append(1)
    
    return row
```

### Key Insight
- Update in-place from right to left
- Avoids needing previous row stored
- Space-optimized solution

---

## 📊 Progress Tracker

| # | Problem | Status | Time Taken | Attempts | Notes |
|---|---------|--------|------------|----------|-------|
| 1 | Two Sum | ⬜ | | | |
| 2 | Remove Duplicates | ⬜ | | | |
| 3 | Best Time to Buy Stock | ⬜ | | | |
| 4 | Contains Duplicate | ⬜ | | | |
| 5 | Maximum Subarray | ⬜ | | | |
| 6 | Move Zeroes | ⬜ | | | |
| 7 | Plus One | ⬜ | | | |
| 8 | Merge Sorted Array | ⬜ | | | |
| 9 | Find Pivot Index | ⬜ | | | |
| 10 | Intersection of Two Arrays | ⬜ | | | |
| 11 | Single Number | ⬜ | | | |
| 12 | Valid Anagram | ⬜ | | | |
| 13 | Missing Number | ⬜ | | | |
| 14 | Search Insert Position | ⬜ | | | |
| 15 | Pascal's Triangle | ⬜ | | | |

---

## 🎯 Key Takeaways

1. **Two Pointers** - Powerful for in-place operations
2. **Hash Set/Map** - O(1) lookup for duplicates and pairs
3. **Kadane's Algorithm** - Maximum subarray pattern
4. **Prefix Sum** - Useful for subarray problems
5. **XOR** - Elegant solution for finding unique elements

---

[← Back to Chapter 6](./README.md) | [Next: Array Medium Problems →](./02-Array-Medium-Problems.md)
