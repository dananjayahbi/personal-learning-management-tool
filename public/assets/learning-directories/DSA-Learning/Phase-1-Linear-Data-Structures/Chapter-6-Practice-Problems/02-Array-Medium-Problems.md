# Array - Medium Problems

## 🎯 Problem Set Overview

This section contains **15 medium array problems** that challenge you with more complex patterns and optimizations. These problems are commonly asked in technical interviews.

**Time to Complete:** 3-5 days  
**Recommended Approach:** Solve brute force first, then optimize

---

## Problem 1: 3Sum

**Link:** [LeetCode 15](https://leetcode.com/problems/3sum/)  
**Difficulty:** Medium  
**Pattern:** Two Pointers + Sorting

### Problem Statement
Find all unique triplets in array that sum to zero.

### Examples
```
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]

Input: nums = [0,1,1]
Output: []

Input: nums = [0,0,0]
Output: [[0,0,0]]
```

### Solution
```python
def three_sum(nums):
    """
    Sort + Two Pointers approach.
    
    Time: O(n²)
    Space: O(1) not counting output
    """
    nums.sort()
    result = []
    n = len(nums)
    
    for i in range(n - 2):
        # Skip duplicates for first number
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        
        # Two pointers for remaining two numbers
        left, right = i + 1, n - 1
        target = -nums[i]
        
        while left < right:
            current_sum = nums[left] + nums[right]
            
            if current_sum == target:
                result.append([nums[i], nums[left], nums[right]])
                
                # Skip duplicates for second number
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                # Skip duplicates for third number
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                
                left += 1
                right -= 1
            elif current_sum < target:
                left += 1
            else:
                right -= 1
    
    return result
```

### Key Insights
- Sort first to enable two pointers
- Skip duplicates at all three positions
- Fix one element, find pair for remaining two
- O(n²) is optimal for this problem

**Complexity:**
- Time: O(n²) - O(n log n) sort + O(n²) for loops
- Space: O(1) excluding output

---

## Problem 2: Container With Most Water

**Link:** [LeetCode 11](https://leetcode.com/problems/container-with-most-water/)  
**Difficulty:** Medium  
**Pattern:** Two Pointers

### Problem Statement
Find two lines that form container with maximum water.

### Examples
```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: Max area between index 1 (height 8) and 8 (height 7)

Input: height = [1,1]
Output: 1
```

### Solution
```python
def max_area(height):
    """
    Two pointers from both ends.
    Move pointer with smaller height.
    
    Time: O(n)
    Space: O(1)
    """
    left, right = 0, len(height) - 1
    max_water = 0
    
    while left < right:
        # Calculate current area
        width = right - left
        current_height = min(height[left], height[right])
        current_area = width * current_height
        
        max_water = max(max_water, current_area)
        
        # Move pointer with smaller height
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_water
```

### Key Insights
- Area = width × min(left_height, right_height)
- Start with maximum width
- Move pointer with smaller height (can't improve with that height)
- Greedy approach works

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 3: Product of Array Except Self

**Link:** [LeetCode 238](https://leetcode.com/problems/product-of-array-except-self/)  
**Difficulty:** Medium  
**Pattern:** Prefix/Suffix Product

### Problem Statement
Return array where `answer[i]` equals product of all elements except `nums[i]`. No division allowed.

### Examples
```
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
Explanation: [2*3*4, 1*3*4, 1*2*4, 1*2*3]

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
```

### Solution
```python
def product_except_self(nums):
    """
    Two passes: prefix products then suffix products.
    
    Time: O(n)
    Space: O(1) not counting output
    """
    n = len(nums)
    result = [1] * n
    
    # Pass 1: Calculate prefix products
    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix *= nums[i]
    
    # Pass 2: Multiply by suffix products
    suffix = 1
    for i in range(n - 1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]
    
    return result
```

### Detailed Example
```
nums = [1, 2, 3, 4]

After prefix pass:
result = [1, 1, 2, 6]
         (1, 1, 1*2, 1*2*3)

After suffix pass:
result = [24, 12, 8, 6]
         (1*24, 1*12, 2*4, 6*1)
```

### Key Insights
- Product except self = prefix product × suffix product
- Use output array to store prefix products
- Multiply by suffix products in second pass
- No division, O(1) extra space

**Complexity:**
- Time: O(n)
- Space: O(1) excluding output array

---

## Problem 4: Subarray Sum Equals K

**Link:** [LeetCode 560](https://leetcode.com/problems/subarray-sum-equals-k/)  
**Difficulty:** Medium  
**Pattern:** Prefix Sum + Hash Map

### Problem Statement
Find total number of continuous subarrays whose sum equals k.

### Examples
```
Input: nums = [1,1,1], k = 2
Output: 2
Explanation: [1,1] and [1,1]

Input: nums = [1,2,3], k = 3
Output: 2
Explanation: [1,2] and [3]
```

### Solution
```python
def subarray_sum(nums, k):
    """
    Use prefix sum with hash map.
    
    Key insight: If prefix_sum[j] - prefix_sum[i] = k,
    then subarray from i+1 to j has sum k.
    
    Time: O(n)
    Space: O(n)
    """
    count = 0
    prefix_sum = 0
    # Map: prefix_sum → frequency
    sum_freq = {0: 1}  # Base case: empty prefix
    
    for num in nums:
        prefix_sum += num
        
        # Check if (prefix_sum - k) exists
        # This means we found a subarray with sum k
        if prefix_sum - k in sum_freq:
            count += sum_freq[prefix_sum - k]
        
        # Add current prefix_sum to map
        sum_freq[prefix_sum] = sum_freq.get(prefix_sum, 0) + 1
    
    return count
```

### Detailed Walkthrough
```
nums = [1, 2, 3], k = 3

i=0, num=1:
  prefix_sum = 1
  Check: 1 - 3 = -2 (not in map)
  sum_freq = {0: 1, 1: 1}

i=1, num=2:
  prefix_sum = 3
  Check: 3 - 3 = 0 (in map! count += 1)
  sum_freq = {0: 1, 1: 1, 3: 1}

i=2, num=3:
  prefix_sum = 6
  Check: 6 - 3 = 3 (in map! count += 1)
  sum_freq = {0: 1, 1: 1, 3: 1, 6: 1}

Result: count = 2
```

### Key Insights
- Prefix sum pattern: subarray sum = prefix[j] - prefix[i]
- Look for (current_sum - k) in hash map
- Store frequency, not just existence (handles duplicates)
- Initialize with {0: 1} for subarrays starting at index 0

**Complexity:**
- Time: O(n)
- Space: O(n)

---

## Problem 5: Rotate Array

**Link:** [LeetCode 189](https://leetcode.com/problems/rotate-array/)  
**Difficulty:** Medium  
**Pattern:** Array Manipulation

### Problem Statement
Rotate array to right by k steps.

### Examples
```
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]

Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
```

### Solution
```python
def rotate(nums, k):
    """
    Reverse approach (most elegant).
    
    Time: O(n)
    Space: O(1)
    """
    n = len(nums)
    k = k % n  # Handle k > n
    
    # Helper function to reverse subarray
    def reverse(start, end):
        while start < end:
            nums[start], nums[end] = nums[end], nums[start]
            start += 1
            end -= 1
    
    # Step 1: Reverse entire array
    reverse(0, n - 1)
    
    # Step 2: Reverse first k elements
    reverse(0, k - 1)
    
    # Step 3: Reverse remaining elements
    reverse(k, n - 1)

# Alternative: Using extra space
def rotate_extra_space(nums, k):
    """Simple but uses O(n) space."""
    n = len(nums)
    k = k % n
    
    rotated = nums[-k:] + nums[:-k]
    nums[:] = rotated
```

### Detailed Example
```
Original: [1,2,3,4,5,6,7], k=3

Step 1 - Reverse all:
[7,6,5,4,3,2,1]

Step 2 - Reverse first k (3):
[5,6,7,4,3,2,1]

Step 3 - Reverse remaining:
[5,6,7,1,2,3,4] ✓
```

### Key Insights
- Three reverses trick is elegant
- Handle k > n with modulo
- In-place with O(1) space
- Can also use cyclic replacements

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 6: Find All Duplicates in Array

**Link:** [LeetCode 442](https://leetcode.com/problems/find-all-duplicates-in-an-array/)  
**Difficulty:** Medium  
**Pattern:** Index as Hash Key

### Problem Statement
Given array where elements are in range [1, n], find all elements that appear twice.

### Examples
```
Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]

Input: nums = [1,1,2]
Output: [1]
```

### Solution
```python
def find_duplicates(nums):
    """
    Use index as hash key by marking visited indices as negative.
    
    Time: O(n)
    Space: O(1) excluding output
    """
    result = []
    
    for num in nums:
        # Get absolute value (may have been negated)
        index = abs(num) - 1
        
        # If already negative, this is a duplicate
        if nums[index] < 0:
            result.append(abs(num))
        else:
            # Mark as visited by negating
            nums[index] = -nums[index]
    
    # Optional: Restore original array
    for i in range(len(nums)):
        nums[i] = abs(nums[i])
    
    return result
```

### Detailed Example
```
nums = [4,3,2,7,8,2,3,1]

Process 4: nums[3] → -7  →  [4,3,2,-7,8,2,3,1]
Process 3: nums[2] → -2  →  [4,3,-2,-7,8,2,3,1]
Process 2: nums[1] → -3  →  [4,-3,-2,-7,8,2,3,1]
Process 7: nums[6] → -3  →  [4,-3,-2,-7,8,2,-3,1]
Process 8: nums[7] → -1  →  [4,-3,-2,-7,8,2,-3,-1]
Process 2: nums[1] already negative! Add 2 to result
Process 3: nums[2] already negative! Add 3 to result
Process 1: nums[0] → -4  →  [-4,-3,-2,-7,8,2,-3,-1]

Result: [2, 3]
```

### Key Insights
- Use array indices as hash keys
- Negate values to mark as visited
- Seeing negative means duplicate
- Works because values are in range [1, n]

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 7: Longest Consecutive Sequence

**Link:** [LeetCode 128](https://leetcode.com/problems/longest-consecutive-sequence/)  
**Difficulty:** Medium  
**Pattern:** Hash Set

### Problem Statement
Find length of longest consecutive elements sequence in O(n) time.

### Examples
```
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: [1,2,3,4]

Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
```

### Solution
```python
def longest_consecutive(nums):
    """
    Use set for O(1) lookup.
    Only start counting from sequence beginnings.
    
    Time: O(n)
    Space: O(n)
    """
    if not nums:
        return 0
    
    num_set = set(nums)
    max_length = 0
    
    for num in num_set:
        # Only start counting if this is sequence start
        if num - 1 not in num_set:
            current = num
            length = 1
            
            # Count consecutive numbers
            while current + 1 in num_set:
                current += 1
                length += 1
            
            max_length = max(max_length, length)
    
    return max_length
```

### Key Insights
- Convert to set for O(1) lookup
- Only count from sequence start (num-1 not in set)
- This ensures each number visited once
- Each element checked at most twice

**Complexity:**
- Time: O(n) - each element visited at most twice
- Space: O(n)

---

## Problem 8: Spiral Matrix

**Link:** [LeetCode 54](https://leetcode.com/problems/spiral-matrix/)  
**Difficulty:** Medium  
**Pattern:** Matrix Traversal

### Problem Statement
Return all elements of matrix in spiral order.

### Examples
```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]

Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
```

### Solution
```python
def spiral_order(matrix):
    """
    Use four boundaries and traverse layer by layer.
    
    Time: O(m × n)
    Space: O(1) excluding output
    """
    if not matrix:
        return []
    
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    
    while top <= bottom and left <= right:
        # Traverse right along top row
        for col in range(left, right + 1):
            result.append(matrix[top][col])
        top += 1
        
        # Traverse down along right column
        for row in range(top, bottom + 1):
            result.append(matrix[row][right])
        right -= 1
        
        # Traverse left along bottom row (if still valid)
        if top <= bottom:
            for col in range(right, left - 1, -1):
                result.append(matrix[bottom][col])
            bottom -= 1
        
        # Traverse up along left column (if still valid)
        if left <= right:
            for row in range(bottom, top - 1, -1):
                result.append(matrix[row][left])
            left += 1
    
    return result
```

### Key Insights
- Use four boundaries: top, bottom, left, right
- Traverse layer by layer: right → down → left → up
- Shrink boundaries after each direction
- Check boundaries before left and up traversals

**Complexity:**
- Time: O(m × n)
- Space: O(1) excluding output

---

## Problem 9: Set Matrix Zeroes

**Link:** [LeetCode 73](https://leetcode.com/problems/set-matrix-zeroes/)  
**Difficulty:** Medium  
**Pattern:** Matrix In-place Marking

### Problem Statement
If element is 0, set its entire row and column to 0. Do it in-place.

### Examples
```
Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]

Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
```

### Solution
```python
def set_zeroes(matrix):
    """
    Use first row and column as markers.
    
    Time: O(m × n)
    Space: O(1)
    """
    m, n = len(matrix), len(matrix[0])
    first_row_zero = False
    first_col_zero = False
    
    # Check if first row has zero
    for j in range(n):
        if matrix[0][j] == 0:
            first_row_zero = True
            break
    
    # Check if first column has zero
    for i in range(m):
        if matrix[i][0] == 0:
            first_col_zero = True
            break
    
    # Use first row/col as markers for other rows/cols
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0
    
    # Set zeroes based on markers
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0
    
    # Handle first row
    if first_row_zero:
        for j in range(n):
            matrix[0][j] = 0
    
    # Handle first column
    if first_col_zero:
        for i in range(m):
            matrix[i][0] = 0
```

### Key Insights
- Use first row/column as marker space
- Need flags for first row/column itself
- Process in specific order to avoid conflicts
- Achieves O(1) space complexity

**Complexity:**
- Time: O(m × n)
- Space: O(1)

---

## Problem 10: Jump Game

**Link:** [LeetCode 55](https://leetcode.com/problems/jump-game/)  
**Difficulty:** Medium  
**Pattern:** Greedy

### Problem Statement
Determine if you can reach the last index starting from first index.

### Examples
```
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from 0 to 1, then 3 steps to last

Input: nums = [3,2,1,0,4]
Output: false
Explanation: Always reach index 3, then can't move
```

### Solution
```python
def can_jump(nums):
    """
    Track maximum reachable position.
    
    Time: O(n)
    Space: O(1)
    """
    max_reach = 0
    
    for i in range(len(nums)):
        # If current position unreachable, return False
        if i > max_reach:
            return False
        
        # Update maximum reachable position
        max_reach = max(max_reach, i + nums[i])
        
        # Early return if can reach end
        if max_reach >= len(nums) - 1:
            return True
    
    return True
```

### Alternative (Backwards)
```python
def can_jump_backwards(nums):
    """Work backwards from end."""
    goal = len(nums) - 1
    
    for i in range(len(nums) - 2, -1, -1):
        if i + nums[i] >= goal:
            goal = i
    
    return goal == 0
```

### Key Insights
- Greedy: track farthest reachable position
- If current index > max_reach, stuck
- Backwards approach: track last good position

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 11: Merge Intervals

**Link:** [LeetCode 56](https://leetcode.com/problems/merge-intervals/)  
**Difficulty:** Medium  
**Pattern:** Sorting + Merging

### Problem Statement
Merge all overlapping intervals.

### Examples
```
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
```

### Solution
```python
def merge(intervals):
    """
    Sort by start time, then merge overlapping intervals.
    
    Time: O(n log n)
    Space: O(n) for output
    """
    if not intervals:
        return []
    
    # Sort by start time
    intervals.sort(key=lambda x: x[0])
    
    merged = [intervals[0]]
    
    for i in range(1, len(intervals)):
        current = intervals[i]
        last_merged = merged[-1]
        
        # Check if overlapping
        if current[0] <= last_merged[1]:
            # Merge: extend end time
            last_merged[1] = max(last_merged[1], current[1])
        else:
            # No overlap: add new interval
            merged.append(current)
    
    return merged
```

### Key Insights
- Sort first by start time
- Compare current with last merged interval
- Overlapping if current_start ≤ last_end
- Extend end time when merging

**Complexity:**
- Time: O(n log n)
- Space: O(n)

---

## Problem 12: Sort Colors (Dutch National Flag)

**Link:** [LeetCode 75](https://leetcode.com/problems/sort-colors/)  
**Difficulty:** Medium  
**Pattern:** Three Pointers

### Problem Statement
Sort array with only 0s, 1s, and 2s in-place.

### Examples
```
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]

Input: nums = [2,0,1]
Output: [0,1,2]
```

### Solution
```python
def sort_colors(nums):
    """
    Dutch National Flag algorithm.
    Three pointers: low (0s), mid (1s), high (2s).
    
    Time: O(n)
    Space: O(1)
    """
    low, mid, high = 0, 0, len(nums) - 1
    
    while mid <= high:
        if nums[mid] == 0:
            # Swap with low pointer
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            # Already in correct place
            mid += 1
        else:  # nums[mid] == 2
            # Swap with high pointer
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
            # Don't increment mid (need to check swapped element)
```

### Key Insights
- Three pointers partition array into regions
- [0, low): all 0s
- [low, mid): all 1s
- (high, n): all 2s
- Mid explores unknown region

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 13: Find Peak Element

**Link:** [LeetCode 162](https://leetcode.com/problems/find-peak-element/)  
**Difficulty:** Medium  
**Pattern:** Binary Search

### Problem Statement
Find peak element (greater than neighbors) in O(log n).

### Examples
```
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak

Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Both 2 and 6 are peaks, either is valid
```

### Solution
```python
def find_peak_element(nums):
    """
    Binary search. Peak exists in direction of slope.
    
    Time: O(log n)
    Space: O(1)
    """
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = left + (right - left) // 2
        
        if nums[mid] < nums[mid + 1]:
            # Slope going up, peak on right
            left = mid + 1
        else:
            # Slope going down, peak on left (or mid is peak)
            right = mid
    
    return left
```

### Key Insights
- Peak guaranteed to exist
- If slope going up, peak must be on right
- If slope going down, peak on left or at mid
- Binary search works even though not sorted

**Complexity:**
- Time: O(log n)
- Space: O(1)

---

## Problem 14: Next Permutation

**Link:** [LeetCode 31](https://leetcode.com/problems/next-permutation/)  
**Difficulty:** Medium  
**Pattern:** Array Manipulation

### Problem Statement
Rearrange numbers to next lexicographically greater permutation. If not possible, return lowest permutation.

### Examples
```
Input: nums = [1,2,3]
Output: [1,3,2]

Input: nums = [3,2,1]
Output: [1,2,3]

Input: nums = [1,1,5]
Output: [1,5,1]
```

### Solution
```python
def next_permutation(nums):
    """
    1. Find rightmost ascending pair
    2. Swap with next larger element
    3. Reverse suffix
    
    Time: O(n)
    Space: O(1)
    """
    n = len(nums)
    
    # Step 1: Find first decreasing element from right
    i = n - 2
    while i >= 0 and nums[i] >= nums[i + 1]:
        i -= 1
    
    if i >= 0:  # Not the last permutation
        # Step 2: Find element just larger than nums[i]
        j = n - 1
        while nums[j] <= nums[i]:
            j -= 1
        
        # Step 3: Swap
        nums[i], nums[j] = nums[j], nums[i]
    
    # Step 4: Reverse suffix (everything after i)
    left, right = i + 1, n - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1
```

### Key Insights
- Find rightmost ascending pair (pivot)
- Swap pivot with next larger element
- Reverse suffix to get smallest arrangement
- Handles wraparound (last → first permutation)

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 15: Maximum Product Subarray

**Link:** [LeetCode 152](https://leetcode.com/problems/maximum-product-subarray/)  
**Difficulty:** Medium  
**Pattern:** Dynamic Programming

### Problem Statement
Find contiguous subarray with largest product.

### Examples
```
Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3]

Input: nums = [-2,0,-1]
Output: 0
```

### Solution
```python
def max_product(nums):
    """
    Track both max and min (for handling negatives).
    
    Time: O(n)
    Space: O(1)
    """
    if not nums:
        return 0
    
    result = nums[0]
    current_max = nums[0]
    current_min = nums[0]
    
    for i in range(1, len(nums)):
        num = nums[i]
        
        # Compute candidates
        temp_max = max(num, current_max * num, current_min * num)
        current_min = min(num, current_max * num, current_min * num)
        current_max = temp_max
        
        result = max(result, current_max)
    
    return result
```

### Key Insights
- Need to track both max and min
- Negative number can turn min into max
- Three choices at each position: start new, extend max, extend min
- Similar to Kadane's but handle negatives

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## 📊 Progress Tracker

| # | Problem | Pattern | Status | Notes |
|---|---------|---------|--------|-------|
| 1 | 3Sum | Two Pointers | ⬜ | |
| 2 | Container With Most Water | Two Pointers | ⬜ | |
| 3 | Product Except Self | Prefix/Suffix | ⬜ | |
| 4 | Subarray Sum Equals K | Prefix Sum + HashMap | ⬜ | |
| 5 | Rotate Array | Reversal | ⬜ | |
| 6 | Find Duplicates | Index as Hash | ⬜ | |
| 7 | Longest Consecutive | Hash Set | ⬜ | |
| 8 | Spiral Matrix | Matrix Traversal | ⬜ | |
| 9 | Set Matrix Zeroes | In-place Marking | ⬜ | |
| 10 | Jump Game | Greedy | ⬜ | |
| 11 | Merge Intervals | Sorting + Merge | ⬜ | |
| 12 | Sort Colors | Three Pointers | ⬜ | |
| 13 | Find Peak Element | Binary Search | ⬜ | |
| 14 | Next Permutation | Array Logic | ⬜ | |
| 15 | Maximum Product Subarray | DP | ⬜ | |

---

## 🎯 Key Patterns Summary

1. **Two Pointers** - 3Sum, Container
2. **Prefix/Suffix** - Product Except Self, Subarray Sum
3. **Hash Map/Set** - Subarray Sum, Longest Consecutive
4. **Index as Hash** - Find Duplicates
5. **Matrix Traversal** - Spiral, Set Zeroes
6. **Greedy** - Jump Game
7. **Sorting** - Merge Intervals, 3Sum
8. **Binary Search** - Find Peak

---

[← Previous: Array Easy Problems](./01-Array-Easy-Problems.md) | [Next: Linked List Easy Problems →](./03-Linked-List-Easy-Problems.md)
