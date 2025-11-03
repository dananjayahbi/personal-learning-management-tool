# Solutions Guide 💡

## Overview

This chapter provides detailed solutions for selected stack problems with multiple approaches, optimizations, and common pitfalls.

---

## Easy Level Solutions

### 1. Min Stack - Multiple Approaches

#### Approach 1: Two Stacks

```python
class MinStack:
    """
    Using two stacks: one for values, one for minimums
    
    Time: O(1) for all operations
    Space: O(n)
    """
    def __init__(self):
        self.stack = []
        self.min_stack = []
    
    def push(self, val):
        self.stack.append(val)
        # Push to min_stack if empty or val is smaller
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
    
    def pop(self):
        val = self.stack.pop()
        # Pop from min_stack if it's the minimum
        if val == self.min_stack[-1]:
            self.min_stack.pop()
    
    def top(self):
        return self.stack[-1]
    
    def getMin(self):
        return self.min_stack[-1]
```

#### Approach 2: Single Stack with Tuples

```python
class MinStack:
    """
    Store (value, current_min) pairs
    
    Time: O(1) for all operations
    Space: O(n) but uses more memory
    """
    def __init__(self):
        self.stack = []
    
    def push(self, val):
        if not self.stack:
            self.stack.append((val, val))
        else:
            current_min = min(val, self.stack[-1][1])
            self.stack.append((val, current_min))
    
    def pop(self):
        self.stack.pop()
    
    def top(self):
        return self.stack[-1][0]
    
    def getMin(self):
        return self.stack[-1][1]
```

#### Approach 3: Difference Storage (Space Optimized)

```python
class MinStack:
    """
    Store difference from minimum
    
    Time: O(1) for all operations
    Space: O(1) auxiliary space
    """
    def __init__(self):
        self.stack = []
        self.min_val = None
    
    def push(self, val):
        if not self.stack:
            self.stack.append(0)
            self.min_val = val
        else:
            diff = val - self.min_val
            self.stack.append(diff)
            if val < self.min_val:
                self.min_val = val
    
    def pop(self):
        diff = self.stack.pop()
        if diff < 0:
            # Restore previous minimum
            self.min_val = self.min_val - diff
    
    def top(self):
        diff = self.stack[-1]
        if diff < 0:
            return self.min_val
        return self.min_val + diff
    
    def getMin(self):
        return self.min_val
```

**Comparison**:
| Approach | Space | Simplicity | Best For |
|----------|-------|------------|----------|
| Two Stacks | O(n) | ⭐⭐⭐ | Interviews |
| Tuple Stack | O(2n) | ⭐⭐ | Readability |
| Difference | O(n) | ⭐ | Space optimization |

---

### 2. Implement Queue using Stacks

#### Approach 1: Amortized O(1) (Optimal)

```python
class MyQueue:
    """
    Use two stacks with lazy transfer
    
    Push: O(1)
    Pop: O(1) amortized
    Peek: O(1) amortized
    """
    def __init__(self):
        self.input_stack = []
        self.output_stack = []
    
    def push(self, x):
        """Always push to input stack - O(1)"""
        self.input_stack.append(x)
    
    def pop(self):
        """O(1) amortized"""
        self._transfer_if_needed()
        return self.output_stack.pop()
    
    def peek(self):
        """O(1) amortized"""
        self._transfer_if_needed()
        return self.output_stack[-1]
    
    def empty(self):
        """O(1)"""
        return not self.input_stack and not self.output_stack
    
    def _transfer_if_needed(self):
        """Transfer elements when output_stack is empty"""
        if not self.output_stack:
            while self.input_stack:
                self.output_stack.append(self.input_stack.pop())
```

#### Approach 2: Always Maintain Order (Slower)

```python
class MyQueue:
    """
    Maintain queue order in main stack
    
    Push: O(n)
    Pop: O(1)
    """
    def __init__(self):
        self.main_stack = []
        self.temp_stack = []
    
    def push(self, x):
        """O(n) - transfer to temp, push, transfer back"""
        while self.main_stack:
            self.temp_stack.append(self.main_stack.pop())
        
        self.main_stack.append(x)
        
        while self.temp_stack:
            self.main_stack.append(self.temp_stack.pop())
    
    def pop(self):
        return self.main_stack.pop()
    
    def peek(self):
        return self.main_stack[-1]
    
    def empty(self):
        return not self.main_stack
```

**Recommendation**: Use Approach 1 (Amortized O(1)) for better performance.

---

## Medium Level Solutions

### 3. Decode String - Detailed Solution

```python
def decode_string(s):
    """
    LeetCode #394: Decode String
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    
    Strategy:
    - Use stack to track (count, prev_string) pairs
    - Build current string
    - When ']' found, pop and repeat
    """
    stack = []
    current_string = ""
    current_num = 0
    
    for char in s:
        if char.isdigit():
            # Build multi-digit number
            current_num = current_num * 10 + int(char)
        
        elif char == '[':
            # Push current state and reset
            stack.append((current_string, current_num))
            current_string = ""
            current_num = 0
        
        elif char == ']':
            # Pop and decode
            prev_string, num = stack.pop()
            current_string = prev_string + current_string * num
        
        else:
            # Regular character
            current_string += char
    
    return current_string


# Test cases with explanation
print(decode_string("3[a]2[bc]"))
# Stack: [] → [("", 3)] → [] → [("aaa", 2)] → []
# Result: "aaabcbc"

print(decode_string("3[a2[c]]"))
# Stack: [] → [("", 3)] → [("a", 2)] → [("a", 2)] → [("", 3)] → []
# Result: "accaccacc"

print(decode_string("2[abc]3[cd]ef"))
# Result: "abcabccdcdcdef"
```

**Common Mistakes**:
❌ Not handling multi-digit numbers  
❌ Not properly tracking previous strings  
❌ Forgetting to append remaining characters  

---

### 4. Asteroid Collision - Complete Solution

```python
def asteroid_collision(asteroids):
    """
    LeetCode #735: Asteroid Collision
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    
    Rules:
    - Positive = moving right
    - Negative = moving left
    - Collision only when right-moving meets left-moving
    - Larger survives, equal both destroyed
    """
    stack = []
    
    for asteroid in asteroids:
        # Process current asteroid
        while True:
            # No collision if:
            # 1. Stack empty
            # 2. Top moving left (negative)
            # 3. Current moving right (positive)
            if not stack or stack[-1] < 0 or asteroid > 0:
                stack.append(asteroid)
                break
            
            # Collision occurs
            # stack[-1] > 0 and asteroid < 0
            
            if abs(stack[-1]) < abs(asteroid):
                # Right asteroid destroyed, continue with left
                stack.pop()
                continue
            elif abs(stack[-1]) == abs(asteroid):
                # Both destroyed
                stack.pop()
                break
            else:
                # Left asteroid destroyed
                break
    
    return stack


# Test cases with visualization
print(asteroid_collision([5, 10, -5]))
# Stack: [5] → [5, 10] → [5, 10] (10 > 5, left destroyed)
# Result: [5, 10]

print(asteroid_collision([8, -8]))
# Stack: [8] → [] (equal, both destroyed)
# Result: []

print(asteroid_collision([10, 2, -5]))
# Stack: [10] → [10, 2] → [10] (5 > 2, but 10 > 5)
# Result: [10]

print(asteroid_collision([-2, -1, 1, 2]))
# Stack: [-2] → [-2, -1] → [-2, -1, 1] → [-2, -1, 1, 2]
# Result: [-2, -1, 1, 2] (no collisions)
```

**Key Insights**:
- Stack stores survivors moving right or all left-movers
- Continue loop while collisions possible
- Three cases: left wins, right wins, both destroyed

---

### 5. Remove K Digits - Optimized Solution

```python
def remove_k_digits(num, k):
    """
    LeetCode #402: Remove K Digits
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    
    Strategy:
    - Monotonic increasing stack
    - Remove larger digits greedily
    - Handle remaining k at end
    """
    if k >= len(num):
        return "0"
    
    stack = []
    
    for digit in num:
        # Remove larger digits while possible
        while k > 0 and stack and stack[-1] > digit:
            stack.pop()
            k -= 1
        
        stack.append(digit)
    
    # Remove remaining k digits from end
    if k > 0:
        stack = stack[:-k]
    
    # Convert to string and handle leading zeros
    result = ''.join(stack).lstrip('0')
    
    return result if result else '0'


# Test cases with step-by-step
print(remove_k_digits("1432219", 3))
# Step 1: k=3, stack=[]
# '1': stack=[1]
# '4': stack=[1,4]
# '3': 4>3, pop, k=2, stack=[1,3]
# '2': 3>2, pop, k=1, stack=[1,2]
# '2': stack=[1,2,2]
# '1': 2>1, pop, k=0, stack=[1,2,1]
# '9': stack=[1,2,1,9]
# Result: "1219"

print(remove_k_digits("10200", 1))
# Remove '1': "0200" → "200"
# Result: "200"

print(remove_k_digits("10", 2))
# Remove all: ""
# Result: "0"
```

**Edge Cases**:
- All same digits: `"1111", k=2` → `"11"`
- Increasing sequence: `"123456", k=3` → `"123"` (remove from end)
- Decreasing sequence: `"654321", k=3` → `"321"` (remove from start)
- Leading zeros: `"10200", k=1` → `"200"` not `"0200"`

---

## Hard Level Solutions

### 6. Largest Rectangle in Histogram - Multiple Approaches

#### Approach 1: Monotonic Stack (Optimal)

```python
def largest_rectangle_area(heights):
    """
    Time: O(n)
    Space: O(n)
    
    Key Idea:
    - Maintain increasing stack of indices
    - When smaller height found, calculate areas
    """
    stack = []
    max_area = 0
    heights.append(0)  # Sentinel to empty stack
    
    for i in range(len(heights)):
        # Maintain increasing order
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


# Detailed walkthrough for [2, 1, 5, 6, 2, 3]
"""
i=0, h=2: stack=[0]
i=1, h=1: 1<2, pop 0
          height=2, width=1, area=2
          stack=[1], max_area=2
i=2, h=5: stack=[1,2]
i=3, h=6: stack=[1,2,3]
i=4, h=2: 2<6, pop 3
          height=6, width=1, area=6, max_area=6
          2<5, pop 2
          height=5, width=2, area=10, max_area=10
          stack=[1,4]
i=5, h=3: stack=[1,4,5]
i=6, h=0: Pop all and calculate
Result: 10
"""
```

#### Approach 2: Previous/Next Smaller Elements

```python
def largest_rectangle_area_v2(heights):
    """
    Time: O(n)
    Space: O(n)
    
    Pre-compute previous and next smaller elements
    """
    n = len(heights)
    
    # Find previous smaller element indices
    prev_smaller = [-1] * n
    stack = []
    for i in range(n):
        while stack and heights[stack[-1]] >= heights[i]:
            stack.pop()
        if stack:
            prev_smaller[i] = stack[-1]
        stack.append(i)
    
    # Find next smaller element indices
    next_smaller = [n] * n
    stack = []
    for i in range(n-1, -1, -1):
        while stack and heights[stack[-1]] >= heights[i]:
            stack.pop()
        if stack:
            next_smaller[i] = stack[-1]
        stack.append(i)
    
    # Calculate max area
    max_area = 0
    for i in range(n):
        width = next_smaller[i] - prev_smaller[i] - 1
        area = heights[i] * width
        max_area = max(max_area, area)
    
    return max_area
```

**Comparison**:
| Approach | Passes | Simplicity | Interview |
|----------|--------|------------|-----------|
| Monotonic Stack | 1 | ⭐⭐ | ✅ Recommended |
| Prev/Next Smaller | 2 | ⭐ | Good alternative |

---

### 7. Trapping Rain Water - Three Approaches

#### Approach 1: Stack (Most Intuitive)

```python
def trap_stack(height):
    """
    Time: O(n)
    Space: O(n)
    """
    if not height:
        return 0
    
    stack = []
    water = 0
    
    for i in range(len(height)):
        # Calculate water while higher bar found
        while stack and height[i] > height[stack[-1]]:
            top = stack.pop()
            
            if not stack:
                break
            
            # Calculate trapped water
            distance = i - stack[-1] - 1
            bounded_height = min(height[i], height[stack[-1]]) - height[top]
            water += distance * bounded_height
        
        stack.append(i)
    
    return water
```

#### Approach 2: Two Pointers (Optimal)

```python
def trap_two_pointers(height):
    """
    Time: O(n)
    Space: O(1) ✅ Best space complexity
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
```

#### Approach 3: Pre-compute Left/Right Max

```python
def trap_precompute(height):
    """
    Time: O(n)
    Space: O(n)
    Easiest to understand
    """
    if not height:
        return 0
    
    n = len(height)
    
    # Pre-compute left max for each position
    left_max = [0] * n
    left_max[0] = height[0]
    for i in range(1, n):
        left_max[i] = max(left_max[i-1], height[i])
    
    # Pre-compute right max for each position
    right_max = [0] * n
    right_max[n-1] = height[n-1]
    for i in range(n-2, -1, -1):
        right_max[i] = max(right_max[i+1], height[i])
    
    # Calculate water
    water = 0
    for i in range(n):
        water += min(left_max[i], right_max[i]) - height[i]
    
    return water
```

**Recommendation**: Use Two Pointers for interviews (O(1) space, elegant).

---

## Common Patterns Summary

### 1. When to Use Stack

✅ **Use Stack For**:
- Matching/validation (parentheses, tags)
- Next/previous greater/smaller element
- Expression evaluation
- Backtracking simulation
- Monotonic sequences

❌ **Don't Use Stack For**:
- Random access needed
- FIFO behavior (use queue)
- Frequency counting (use hash map)

### 2. Monotonic Stack Decision Tree

```
Need next/previous element?
├─ Yes → Use monotonic stack
│  ├─ Next/Previous GREATER → Decreasing stack
│  └─ Next/Previous SMALLER → Increasing stack
└─ No → Regular stack or other approach
```

### 3. Common Pitfalls

1. **Off-by-one errors** in width calculations
2. **Not handling edge cases** (empty, single element)
3. **Wrong monotonic direction**
4. **Forgetting to pop remaining elements**
5. **Not using sentinel values** when appropriate

---

## Optimization Techniques

### 1. Space Optimization
- Use indices instead of values when possible
- Single stack vs. multiple stacks trade-off
- In-place modifications when allowed

### 2. Time Optimization
- Pre-compute when multiple queries
- Use monotonic stack for O(n) vs. O(n²)
- Avoid unnecessary operations

---

**Chapter Complete!** 🎉 Master these patterns for strong stack fundamentals.
