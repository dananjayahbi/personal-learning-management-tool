# 05 - Two-Pointer Technique

## 🎯 Overview

The **Two-Pointer Technique** is a powerful algorithmic pattern used to solve array and string problems efficiently. It uses two pointers (indices) that traverse the data structure, often reducing time complexity from O(n²) to O(n).

**Key Idea:** Instead of nested loops, use two pointers moving through the array based on certain conditions.

---

## 📖 What is Two-Pointer Technique?

Two pointers are typically used in two ways:

1. **Opposite Direction:** One pointer at start, one at end, moving toward each other
2. **Same Direction:** Both pointers move in the same direction at different speeds

---

## 🎯 Pattern 1: Opposite Direction Pointers

### When to Use:
- Searching for pairs that satisfy a condition
- Reversing or rearranging elements
- Palindrome checking
- Container with water type problems

### Template:

```python
def opposite_pointers(arr):
    left = 0
    right = len(arr) - 1
    
    while left < right:
        # Process arr[left] and arr[right]
        
        if condition_met:
            # Do something
            left += 1
            right -= 1
        elif need_to_increase:
            left += 1
        else:
            right -= 1
    
    return result
```

---

### Problem 1: Two Sum (Sorted Array)

**Problem:** Find two numbers that add up to target in a sorted array.

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

```python
# Python
def two_sum(arr, target):
    """
    Find indices of two numbers that add up to target
    Array is sorted in ascending order
    """
    left = 0
    right = len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum
    
    return []  # No solution found

# Example
arr = [2, 7, 11, 15]
target = 9
print(two_sum(arr, target))  # [0, 1] → 2 + 7 = 9
```

```cpp
// C++
vector<int> twoSum(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left < right) {
        int sum = arr[left] + arr[right];
        
        if (sum == target) {
            return {left, right};
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return {};
}
```

**Visual:**
```
arr = [2, 7, 11, 15], target = 9

left=0, right=3: 2+15=17 > 9, move right left
left=0, right=2: 2+11=13 > 9, move right left
left=0, right=1: 2+7=9 ✓ Found!
```

---

### Problem 2: Reverse Array

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

```python
# Python
def reverse_array(arr):
    """Reverse array in-place"""
    left = 0
    right = len(arr) - 1
    
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    
    return arr

# Example
arr = [1, 2, 3, 4, 5]
reverse_array(arr)
print(arr)  # [5, 4, 3, 2, 1]
```

---

### Problem 3: Valid Palindrome

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

```python
# Python
def is_palindrome(s):
    """
    Check if string is palindrome (ignoring non-alphanumeric)
    """
    left = 0
    right = len(s) - 1
    
    while left < right:
        # Skip non-alphanumeric characters
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        
        # Compare characters (case-insensitive)
        if s[left].lower() != s[right].lower():
            return False
        
        left += 1
        right -= 1
    
    return True

# Example
print(is_palindrome("A man, a plan, a canal: Panama"))  # True
print(is_palindrome("race a car"))  # False
```

---

### Problem 4: Container With Most Water

**LeetCode #11**

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

```python
# Python
def max_area(height):
    """
    Find two lines that form container with maximum water
    """
    max_water = 0
    left = 0
    right = len(height) - 1
    
    while left < right:
        # Calculate area
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

# Example
height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
print(max_area(height))  # 49
```

**Why this works:** Moving the pointer with smaller height gives us a chance to find a taller line, potentially increasing area.

---

### Problem 5: Three Sum

**LeetCode #15**

**Time Complexity:** O(n²)  
**Space Complexity:** O(1) not counting output

```python
# Python
def three_sum(nums):
    """
    Find all triplets that sum to zero
    """
    nums.sort()  # Sort first
    result = []
    n = len(nums)
    
    for i in range(n - 2):
        # Skip duplicates for first number
        if i > 0 and nums[i] == nums[i-1]:
            continue
        
        # Two pointers for remaining two numbers
        left = i + 1
        right = n - 1
        target = -nums[i]
        
        while left < right:
            current_sum = nums[left] + nums[right]
            
            if current_sum == target:
                result.append([nums[i], nums[left], nums[right]])
                
                # Skip duplicates
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                
                left += 1
                right -= 1
            elif current_sum < target:
                left += 1
            else:
                right -= 1
    
    return result

# Example
nums = [-1, 0, 1, 2, -1, -4]
print(three_sum(nums))  # [[-1, -1, 2], [-1, 0, 1]]
```

---

## 🎯 Pattern 2: Same Direction Pointers

### When to Use:
- Remove duplicates
- Partition arrays
- Fast & slow pointer (cycle detection)
- Sliding window variations

### Template:

```python
def same_direction_pointers(arr):
    slow = 0
    
    for fast in range(len(arr)):
        if condition:
            # Process and move slow
            arr[slow] = arr[fast]
            slow += 1
    
    return slow  # or arr[:slow]
```

---

### Problem 6: Remove Duplicates from Sorted Array

**LeetCode #26**

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

```python
# Python
def remove_duplicates(nums):
    """
    Remove duplicates in-place, return new length
    """
    if not nums:
        return 0
    
    slow = 0  # Position for unique elements
    
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    
    return slow + 1

# Example
nums = [1, 1, 2, 2, 2, 3, 3, 4]
k = remove_duplicates(nums)
print(nums[:k])  # [1, 2, 3, 4]
```

**Visual:**
```
Initial: [1, 1, 2, 2, 2, 3, 3, 4]
         slow=0, fast=1

After processing:
[1, 2, 3, 4, _, _, _, _]
            slow=3
```

---

### Problem 7: Move Zeros

**LeetCode #283**

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

```python
# Python
def move_zeroes(nums):
    """
    Move all zeros to end, maintain relative order
    """
    slow = 0  # Position for non-zero elements
    
    for fast in range(len(nums)):
        if nums[fast] != 0:
            nums[slow], nums[fast] = nums[fast], nums[slow]
            slow += 1
    
    return nums

# Example
nums = [0, 1, 0, 3, 12]
move_zeroes(nums)
print(nums)  # [1, 3, 12, 0, 0]
```

---

### Problem 8: Remove Element

**LeetCode #27**

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

```python
# Python
def remove_element(nums, val):
    """
    Remove all instances of val in-place
    """
    slow = 0
    
    for fast in range(len(nums)):
        if nums[fast] != val:
            nums[slow] = nums[fast]
            slow += 1
    
    return slow

# Example
nums = [3, 2, 2, 3]
k = remove_element(nums, 3)
print(nums[:k])  # [2, 2]
```

---

### Problem 9: Sort Colors (Dutch National Flag)

**LeetCode #75**

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

```python
# Python
def sort_colors(nums):
    """
    Sort array of 0s, 1s, and 2s in-place
    """
    low = 0      # Boundary for 0s
    mid = 0      # Current element
    high = len(nums) - 1  # Boundary for 2s
    
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:  # nums[mid] == 2
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
    
    return nums

# Example
nums = [2, 0, 2, 1, 1, 0]
sort_colors(nums)
print(nums)  # [0, 0, 1, 1, 2, 2]
```

**Visual:**
```
Partitions: [0s | 1s | unknown | 2s]
           low   mid          high

Goal: Move all 0s to left, 2s to right
```

---

## 🎯 Pattern 3: Fast & Slow Pointers

### When to Use:
- Finding middle of linked list
- Cycle detection
- Finding duplicate number

### Problem 10: Find Duplicate Number

**LeetCode #287**

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

```python
# Python - Floyd's Cycle Detection
def find_duplicate(nums):
    """
    Find duplicate in array where nums[i] in [1, n]
    Like cycle detection in linked list
    """
    # Phase 1: Find intersection point
    slow = nums[0]
    fast = nums[0]
    
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break
    
    # Phase 2: Find entrance to cycle
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    
    return slow

# Example
nums = [1, 3, 4, 2, 2]
print(find_duplicate(nums))  # 2
```

---

## 📊 Complexity Comparison

| Problem | Brute Force | Two Pointer | Space |
|---------|-------------|-------------|-------|
| Two Sum (sorted) | O(n²) | O(n) | O(1) |
| Reverse Array | O(n) extra space | O(n) | O(1) |
| Palindrome | O(n) extra space | O(n) | O(1) |
| Three Sum | O(n³) | O(n²) | O(1) |
| Remove Duplicates | O(n) extra space | O(n) | O(1) |
| Move Zeros | O(n) extra space | O(n) | O(1) |

---

## 🧪 Practice Problems

### Easy:
1. Two Sum II (sorted array)
2. Reverse String
3. Valid Palindrome
4. Remove Duplicates from Sorted Array
5. Move Zeros
6. Squares of Sorted Array

### Medium:
7. Three Sum
8. Container With Most Water
9. Sort Colors
10. 3Sum Closest
11. Four Sum
12. Trapping Rain Water

### Hard:
13. Minimum Window Substring (uses two pointers)
14. Longest Substring with At Most K Distinct Characters

---

## 💡 Key Takeaways

1. ✅ Two pointers reduce time complexity from **O(n²) to O(n)**
2. ✅ **Opposite direction:** Start from both ends, move toward center
3. ✅ **Same direction:** Slow pointer for result, fast for exploration
4. ✅ Works best with **sorted arrays** or when order matters
5. ✅ Often used with **sliding window** technique
6. ✅ **In-place modifications** save space
7. ✅ Common in **array partitioning** problems
8. ✅ Key patterns: pair sum, partition, cycle detection

---

## 🎯 When to Use Two Pointers

**Use when you see:**
- ✅ Sorted array problems
- ✅ Finding pairs or triplets
- ✅ Reversing or partitioning
- ✅ In-place array modifications
- ✅ "Remove duplicates/element" type problems
- ✅ Palindrome checking

**Don't use when:**
- ❌ Completely unsorted data without pattern
- ❌ Need to track many elements simultaneously
- ❌ Hash map would be simpler

---

[← Back to Dynamic Arrays](./04-Dynamic-Arrays.md) | [Back to Chapter](./README.md) | [Next: Sliding Window →](./06-Sliding-Window-Technique.md)
