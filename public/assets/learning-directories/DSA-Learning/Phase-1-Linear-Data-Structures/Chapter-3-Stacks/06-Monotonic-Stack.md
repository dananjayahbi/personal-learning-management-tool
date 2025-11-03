# Monotonic Stack 📈

## Overview

A **Monotonic Stack** is a stack that maintains elements in monotonic order (either increasing or decreasing). This powerful technique efficiently solves problems involving "next greater/smaller element" patterns.

---

## What is a Monotonic Stack?

### Types

1. **Monotonic Increasing Stack**
   - Elements from bottom to top are in increasing order
   - Used to find **next smaller** or **previous smaller** elements

2. **Monotonic Decreasing Stack**
   - Elements from bottom to top are in decreasing order
   - Used to find **next greater** or **previous greater** elements

### Visual Representation

```
Monotonic Increasing Stack:
Bottom → [1, 3, 5, 7] ← Top
         ↑  ↑  ↑  ↑
         Increasing order

Monotonic Decreasing Stack:
Bottom → [9, 6, 4, 2] ← Top
         ↓  ↓  ↓  ↓
         Decreasing order
```

---

## 1. Next Greater Element

### Problem (LeetCode #496)
For each element in array, find the next greater element to its right.

### Solution: Monotonic Decreasing Stack

```python
def next_greater_element(nums):
    """
    Find next greater element for each element
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    
    Example:
    Input:  [4, 5, 2, 10, 8]
    Output: [5, 10, 10, -1, -1]
    """
    n = len(nums)
    result = [-1] * n
    stack = []  # Store indices
    
    for i in range(n):
        # While current element is greater than stack top
        while stack and nums[i] > nums[stack[-1]]:
            idx = stack.pop()
            result[idx] = nums[i]
        
        stack.append(i)
    
    return result


# Test cases
print(next_greater_element([4, 5, 2, 10, 8]))   # [5, 10, 10, -1, -1]
print(next_greater_element([1, 2, 3, 4, 5]))    # [2, 3, 4, 5, -1]
print(next_greater_element([5, 4, 3, 2, 1]))    # [-1, -1, -1, -1, -1]
```

### Step-by-Step Visualization: `[4, 5, 2, 10, 8]`

```
i=0, num=4:
  Stack: [0]
  Result: [-1, -1, -1, -1, -1]

i=1, num=5:
  5 > 4 → Pop 0, result[0] = 5
  Stack: [1]
  Result: [5, -1, -1, -1, -1]

i=2, num=2:
  Stack: [1, 2]
  Result: [5, -1, -1, -1, -1]

i=3, num=10:
  10 > 2 → Pop 2, result[2] = 10
  10 > 5 → Pop 1, result[1] = 10
  Stack: [3]
  Result: [5, 10, 10, -1, -1]

i=4, num=8:
  Stack: [3, 4]
  Result: [5, 10, 10, -1, -1]
```

### Next Greater Element II (Circular Array)

```python
def next_greater_elements_circular(nums):
    """
    LeetCode #503: Next Greater Element II (Circular)
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    
    Example:
    Input:  [1, 2, 1]
    Output: [2, -1, 2]  (circular: 1 -> 2, 2 -> 1 -> 2, 1 -> 2)
    """
    n = len(nums)
    result = [-1] * n
    stack = []
    
    # Traverse twice to handle circular nature
    for i in range(2 * n):
        idx = i % n
        
        while stack and nums[idx] > nums[stack[-1]]:
            result[stack.pop()] = nums[idx]
        
        # Only push indices in first pass
        if i < n:
            stack.append(idx)
    
    return result


# Test cases
print(next_greater_elements_circular([1, 2, 1]))     # [2, -1, 2]
print(next_greater_elements_circular([1, 2, 3, 4]))  # [2, 3, 4, -1]
```

---

## 2. Daily Temperatures

### Problem (LeetCode #739)
Given daily temperatures, return array where each element is the number of days until a warmer temperature.

### Solution

```python
def daily_temperatures(temperatures):
    """
    LeetCode #739: Daily Temperatures
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    
    Example:
    Input:  [73, 74, 75, 71, 69, 72, 76, 73]
    Output: [1, 1, 4, 2, 1, 1, 0, 0]
    """
    n = len(temperatures)
    result = [0] * n
    stack = []  # Store indices
    
    for i in range(n):
        # While current temp is warmer than stack top
        while stack and temperatures[i] > temperatures[stack[-1]]:
            idx = stack.pop()
            result[idx] = i - idx  # Days difference
        
        stack.append(i)
    
    return result


# Test cases
print(daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73]))
# Output: [1, 1, 4, 2, 1, 1, 0, 0]

print(daily_temperatures([30, 40, 50, 60]))
# Output: [1, 1, 1, 0]

print(daily_temperatures([30, 60, 90]))
# Output: [1, 1, 0]
```

---

## 3. Largest Rectangle in Histogram

### Problem (LeetCode #84)
Find the largest rectangle area in a histogram.

### Solution: Monotonic Increasing Stack

```python
def largest_rectangle_area(heights):
    """
    LeetCode #84: Largest Rectangle in Histogram
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    
    Example:
    Input:  [2, 1, 5, 6, 2, 3]
    Output: 10 (heights [5,6] with width 2)
    """
    stack = []  # Store indices
    max_area = 0
    heights.append(0)  # Sentinel to empty stack at end
    
    for i in range(len(heights)):
        # Maintain increasing stack
        while stack and heights[i] < heights[stack[-1]]:
            h_idx = stack.pop()
            height = heights[h_idx]
            
            # Calculate width
            if stack:
                width = i - stack[-1] - 1
            else:
                width = i
            
            area = height * width
            max_area = max(max_area, area)
        
        stack.append(i)
    
    heights.pop()  # Remove sentinel
    return max_area


# Test cases
print(largest_rectangle_area([2, 1, 5, 6, 2, 3]))  # 10
print(largest_rectangle_area([2, 4]))              # 4
print(largest_rectangle_area([1, 2, 3, 4, 5]))     # 9
```

### Visualization: `[2, 1, 5, 6, 2, 3]`

```
Heights:  [2, 1, 5, 6, 2, 3]
          
      6 ┌─┐
      5 │ │┌─┐
      4 │ ││ │
      3 │ ││ │  ┌─┐
      2 ┌─┐│ │┌─┤ │
      1 │ ││ ││ │ │
        └─┴┴─┴┴─┴─┘
         0 1 2 3 4 5

Largest rectangle: heights[2:4] = [5, 6]
Area = min(5, 6) × 2 = 10
```

---

## 4. Trapping Rain Water

### Problem (LeetCode #42)
Calculate how much water can be trapped after raining.

### Solution: Monotonic Decreasing Stack

```python
def trap(height):
    """
    LeetCode #42: Trapping Rain Water
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    
    Example:
    Input:  [0,1,0,2,1,0,1,3,2,1,2,1]
    Output: 6
    """
    if not height:
        return 0
    
    stack = []
    water = 0
    
    for i in range(len(height)):
        # While current height is greater than stack top
        while stack and height[i] > height[stack[-1]]:
            top = stack.pop()
            
            if not stack:
                break
            
            # Calculate water trapped
            distance = i - stack[-1] - 1
            bounded_height = min(height[i], height[stack[-1]]) - height[top]
            water += distance * bounded_height
        
        stack.append(i)
    
    return water


# Test cases
print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))  # 6
print(trap([4,2,0,3,2,5]))              # 9
```

### Alternative: Two Pointers (Optimal)

```python
def trap_two_pointers(height):
    """
    More space-efficient: Two pointers approach
    
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    if not height:
        return 0
    
    left, right = 0, len(height) - 1
    left_max, right_max = 0, 0
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


# Test cases
print(trap_two_pointers([0,1,0,2,1,0,1,3,2,1,2,1]))  # 6
```

---

## 5. Remove K Digits

### Problem (LeetCode #402)
Remove k digits to make the smallest possible number.

### Solution: Monotonic Increasing Stack

```python
def remove_k_digits(num, k):
    """
    LeetCode #402: Remove K Digits
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    
    Example:
    Input:  num = "1432219", k = 3
    Output: "1219"
    """
    stack = []
    
    for digit in num:
        # Remove larger digits from stack
        while k > 0 and stack and stack[-1] > digit:
            stack.pop()
            k -= 1
        
        stack.append(digit)
    
    # Remove remaining k digits from end
    if k > 0:
        stack = stack[:-k]
    
    # Convert to string and remove leading zeros
    result = ''.join(stack).lstrip('0')
    
    return result if result else '0'


# Test cases
print(remove_k_digits("1432219", 3))    # "1219"
print(remove_k_digits("10200", 1))      # "200"
print(remove_k_digits("10", 2))         # "0"
print(remove_k_digits("9", 1))          # "0"
```

---

## 6. Stock Span Problem

### Problem
Calculate the span of stock's price for all days. Span = number of consecutive days before current day with price ≤ current price.

### Solution

```python
class StockSpanner:
    """
    LeetCode #901: Online Stock Span
    
    Example:
    Input:  [100, 80, 60, 70, 60, 75, 85]
    Output: [1, 1, 1, 2, 1, 4, 6]
    """
    
    def __init__(self):
        self.stack = []  # Store (price, span) pairs
    
    def next(self, price):
        """
        Time Complexity: O(1) amortized
        Space Complexity: O(n)
        """
        span = 1
        
        # Pop all prices less than or equal to current
        while self.stack and self.stack[-1][0] <= price:
            span += self.stack.pop()[1]
        
        self.stack.append((price, span))
        return span


# Usage
spanner = StockSpanner()
print(spanner.next(100))  # 1
print(spanner.next(80))   # 1
print(spanner.next(60))   # 1
print(spanner.next(70))   # 2
print(spanner.next(60))   # 1
print(spanner.next(75))   # 4
print(spanner.next(85))   # 6
```

---

## 7. Car Fleet

### Problem (LeetCode #853)
Calculate number of car fleets arriving at destination.

### Solution

```python
def car_fleet(target, position, speed):
    """
    LeetCode #853: Car Fleet
    
    Time Complexity: O(n log n)
    Space Complexity: O(n)
    
    Example:
    target = 12
    position = [10, 8, 0, 5, 3]
    speed = [2, 4, 1, 1, 3]
    Output: 3
    """
    cars = sorted(zip(position, speed), reverse=True)
    stack = []
    
    for pos, spd in cars:
        time = (target - pos) / spd
        
        # If this car arrives later, it forms new fleet
        if not stack or time > stack[-1]:
            stack.append(time)
    
    return len(stack)


# Test cases
print(car_fleet(12, [10,8,0,5,3], [2,4,1,1,3]))  # 3
print(car_fleet(10, [3], [3]))                   # 1
print(car_fleet(100, [0,2,4], [4,2,1]))          # 1
```

---

## 8. Sum of Subarray Minimums

### Problem (LeetCode #907)
Find sum of minimum values in all subarrays.

### Solution: Monotonic Stack

```python
def sum_subarray_mins(arr):
    """
    LeetCode #907: Sum of Subarray Minimums
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    
    Example:
    Input:  [3, 1, 2, 4]
    Output: 17
    """
    MOD = 10**9 + 7
    n = len(arr)
    
    # Find previous less element indices
    left = [-1] * n
    stack = []
    for i in range(n):
        while stack and arr[stack[-1]] > arr[i]:
            stack.pop()
        if stack:
            left[i] = stack[-1]
        stack.append(i)
    
    # Find next less element indices
    right = [n] * n
    stack = []
    for i in range(n-1, -1, -1):
        while stack and arr[stack[-1]] >= arr[i]:
            stack.pop()
        if stack:
            right[i] = stack[-1]
        stack.append(i)
    
    # Calculate sum
    result = 0
    for i in range(n):
        count = (i - left[i]) * (right[i] - i)
        result = (result + arr[i] * count) % MOD
    
    return result


# Test cases
print(sum_subarray_mins([3,1,2,4]))     # 17
print(sum_subarray_mins([11,81,94,43,3]))  # 444
```

---

## Monotonic Stack Pattern Summary

| Problem | Stack Type | Key Idea |
|---------|------------|----------|
| Next Greater Element | Decreasing | Pop smaller, find greater |
| Next Smaller Element | Increasing | Pop larger, find smaller |
| Largest Rectangle | Increasing | Pop larger, calculate area |
| Trapping Water | Decreasing | Pop smaller, trap water |
| Remove K Digits | Increasing | Pop larger, keep smaller |
| Stock Span | Decreasing | Accumulate spans |

### General Template

```python
def monotonic_stack_template(arr):
    """
    General monotonic stack template
    """
    stack = []
    result = []
    
    for i in range(len(arr)):
        # Maintain monotonic property
        while stack and condition(arr[stack[-1]], arr[i]):
            # Process popped element
            idx = stack.pop()
            # Do something with arr[idx]
        
        # Process current element
        # result[i] = ...
        
        stack.append(i)
    
    return result
```

---

## Practice Problems

1. **LeetCode #496** - Next Greater Element I ⭐
2. **LeetCode #503** - Next Greater Element II ⭐⭐
3. **LeetCode #739** - Daily Temperatures ⭐⭐
4. **LeetCode #84** - Largest Rectangle in Histogram ⭐⭐⭐
5. **LeetCode #42** - Trapping Rain Water ⭐⭐⭐
6. **LeetCode #402** - Remove K Digits ⭐⭐
7. **LeetCode #853** - Car Fleet ⭐⭐
8. **LeetCode #901** - Online Stock Span ⭐⭐
9. **LeetCode #907** - Sum of Subarray Minimums ⭐⭐

---

**Next:** Continue to [07-Stack-Problems.md](07-Stack-Problems.md) for more practice problems!
