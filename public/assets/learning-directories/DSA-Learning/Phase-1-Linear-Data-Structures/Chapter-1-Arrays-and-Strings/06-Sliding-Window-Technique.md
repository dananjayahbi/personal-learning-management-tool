# 06 - Sliding Window Technique

## 🎯 Overview

The **Sliding Window** technique is used to perform operations on a specific window size of an array or string. Instead of recalculating from scratch for each window, we "slide" the window by adding new elements and removing old ones.

**Key Idea:** Maintain a window [left, right] and adjust it based on conditions, tracking the result.

**Time Complexity:** Typically O(n) instead of O(n×k) or O(n²)

---

## 📖 Types of Sliding Window

### 1. Fixed-Size Window
- Window size is constant (k elements)
- Slide by adding next element and removing leftmost

### 2. Variable-Size Window
- Window grows and shrinks based on conditions
- More complex but very powerful

---

## 🎯 Pattern 1: Fixed-Size Window

### Template:

```python
def fixed_window(arr, k):
    n = len(arr)
    if n < k:
        return None
    
    # Calculate first window
    window_sum = sum(arr[:k])
    result = window_sum
    
    # Slide window
    for i in range(k, n):
        # Add new element, remove old element
        window_sum += arr[i] - arr[i - k]
        result = max(result, window_sum)  # or other operation
    
    return result
```

---

### Problem 1: Maximum Sum Subarray of Size K

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

```python
# Python
def max_sum_subarray(arr, k):
    """
    Find maximum sum of any subarray of size k
    """
    n = len(arr)
    if n < k:
        return None
    
    # Sum of first window
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    # Slide window
    for i in range(k, n):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    
    return max_sum

# Example
arr = [2, 1, 5, 1, 3, 2]
k = 3
print(max_sum_subarray(arr, k))  # 9 (5+1+3)
```

**Visual:**
```
arr = [2, 1, 5, 1, 3, 2], k=3

Window 1: [2, 1, 5] → sum = 8
Window 2:    [1, 5, 1] → sum = 7
Window 3:       [5, 1, 3] → sum = 9 ✓ max
Window 4:          [1, 3, 2] → sum = 6
```

**Brute Force O(n×k):**
```python
# Calculate sum for each window from scratch
max_sum = 0
for i in range(n - k + 1):
    current_sum = sum(arr[i:i+k])  # O(k)
    max_sum = max(max_sum, current_sum)
```

---

### Problem 2: First Negative Integer in Every Window of Size K

**Time Complexity:** O(n)  
**Space Complexity:** O(k)

```python
# Python
from collections import deque

def first_negative_in_window(arr, k):
    """
    Find first negative number in each window of size k
    """
    result = []
    negatives = deque()  # Store indices of negative numbers
    
    # Process first window
    for i in range(k):
        if arr[i] < 0:
            negatives.append(i)
    
    # First window result
    result.append(arr[negatives[0]] if negatives else 0)
    
    # Slide window
    for i in range(k, len(arr)):
        # Remove elements outside window
        if negatives and negatives[0] <= i - k:
            negatives.popleft()
        
        # Add new element if negative
        if arr[i] < 0:
            negatives.append(i)
        
        # Append result for current window
        result.append(arr[negatives[0]] if negatives else 0)
    
    return result

# Example
arr = [12, -1, -7, 8, -15, 30, 16, 28]
k = 3
print(first_negative_in_window(arr, k))
# [-1, -1, -7, -15, -15, 0]
```

---

## 🎯 Pattern 2: Variable-Size Window

### Template:

```python
def variable_window(arr):
    left = 0
    result = 0
    
    for right in range(len(arr)):
        # Add arr[right] to window
        
        # Shrink window if condition violated
        while condition_violated:
            # Remove arr[left] from window
            left += 1
        
        # Update result
        result = max(result, right - left + 1)
    
    return result
```

---

### Problem 3: Longest Substring Without Repeating Characters

**LeetCode #3**

**Time Complexity:** O(n)  
**Space Complexity:** O(min(n, m)) where m is charset size

```python
# Python
def length_of_longest_substring(s):
    """
    Find length of longest substring without repeating characters
    """
    char_set = set()
    left = 0
    max_length = 0
    
    for right in range(len(s)):
        # Shrink window if duplicate found
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        
        # Add current character
        char_set.add(s[right])
        
        # Update max length
        max_length = max(max_length, right - left + 1)
    
    return max_length

# Example
s = "abcabcbb"
print(length_of_longest_substring(s))  # 3 ("abc")
```

**Visual:**
```
s = "abcabcbb"

left=0, right=0: "a" → length=1
left=0, right=1: "ab" → length=2
left=0, right=2: "abc" → length=3 ✓
left=0, right=3: "abca" → duplicate 'a', shrink
left=1, right=3: "bca" → length=3
...
```

---

### Problem 4: Minimum Window Substring

**LeetCode #76**

**Time Complexity:** O(n)  
**Space Complexity:** O(m) where m is charset size

```python
# Python
from collections import Counter

def min_window(s, t):
    """
    Find minimum window in s that contains all characters of t
    """
    if not s or not t:
        return ""
    
    # Count characters in t
    required = Counter(t)
    formed = 0  # Characters matched
    window_counts = {}
    
    left = 0
    min_len = float('inf')
    min_left = 0
    
    for right in range(len(s)):
        char = s[right]
        window_counts[char] = window_counts.get(char, 0) + 1
        
        # Check if current character helps
        if char in required and window_counts[char] == required[char]:
            formed += 1
        
        # Try to shrink window
        while formed == len(required) and left <= right:
            # Update result
            if right - left + 1 < min_len:
                min_len = right - left + 1
                min_left = left
            
            # Remove leftmost character
            char = s[left]
            window_counts[char] -= 1
            if char in required and window_counts[char] < required[char]:
                formed -= 1
            left += 1
    
    return s[min_left:min_left + min_len] if min_len != float('inf') else ""

# Example
s = "ADOBECODEBANC"
t = "ABC"
print(min_window(s, t))  # "BANC"
```

---

### Problem 5: Longest Subarray with Sum ≤ K

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

```python
# Python
def longest_subarray_with_sum_k(arr, k):
    """
    Find length of longest subarray with sum ≤ k
    """
    left = 0
    current_sum = 0
    max_length = 0
    
    for right in range(len(arr)):
        current_sum += arr[right]
        
        # Shrink window if sum exceeds k
        while current_sum > k and left <= right:
            current_sum -= arr[left]
            left += 1
        
        # Update max length
        max_length = max(max_length, right - left + 1)
    
    return max_length

# Example
arr = [1, 2, 3, 4, 5]
k = 11
print(longest_subarray_with_sum_k(arr, k))  # 4 ([2,3,4,2] or [1,2,3,4])
```

---

### Problem 6: Fruits into Baskets

**LeetCode #904 - At Most Two Types**

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

```python
# Python
def total_fruit(fruits):
    """
    Maximum fruits you can collect with at most 2 types
    """
    fruit_count = {}
    left = 0
    max_fruits = 0
    
    for right in range(len(fruits)):
        fruit = fruits[right]
        fruit_count[fruit] = fruit_count.get(fruit, 0) + 1
        
        # Shrink if more than 2 types
        while len(fruit_count) > 2:
            left_fruit = fruits[left]
            fruit_count[left_fruit] -= 1
            if fruit_count[left_fruit] == 0:
                del fruit_count[left_fruit]
            left += 1
        
        max_fruits = max(max_fruits, right - left + 1)
    
    return max_fruits

# Example
fruits = [1, 2, 1, 2, 3, 2, 2]
print(total_fruit(fruits))  # 5 ([2,1,2,2,2] or similar)
```

---

## 📊 Complexity Comparison

| Problem | Brute Force | Sliding Window |
|---------|-------------|----------------|
| Max sum of size k | O(n×k) | O(n) |
| Longest substring | O(n²) or O(n³) | O(n) |
| Min window | O(n²) or worse | O(n) |
| Subarray sum | O(n²) | O(n) |

---

## 🧪 Practice Problems

### Easy:
1. Maximum sum subarray of size k
2. Count occurrences of anagrams
3. First negative in every window

### Medium:
4. Longest substring without repeating characters
5. Longest substring with at most K distinct characters
6. Longest repeating character replacement
7. Fruits into baskets
8. Max consecutive ones III

### Hard:
9. Minimum window substring
10. Substring with concatenation of all words
11. Sliding window maximum (with deque)

---

## 💡 Key Takeaways

1. ✅ **Fixed window:** Add new, remove old, maintain size
2. ✅ **Variable window:** Grow with right, shrink with left
3. ✅ Reduces **O(n²) to O(n)** in many cases
4. ✅ Use **hash map** to track window state
5. ✅ **Two pointers:** left and right form the window
6. ✅ Common pattern: **expand-contract** loop
7. ✅ Watch for **edge cases:** empty array, k > n

---

## 🎯 When to Use Sliding Window

**Use when you see:**
- ✅ Subarray/substring problems
- ✅ "Maximum/minimum of size k"
- ✅ "Longest/shortest with condition"
- ✅ Contiguous sequence requirements

**Template recognition:**
- Fixed size → Calculate first, then slide
- Variable size → Expand right, shrink left

---

[← Back to Two-Pointer](./05-Two-Pointer-Technique.md) | [Back to Chapter](./README.md) | [Next: Kadane's Algorithm →](./07-Kadanes-Algorithm.md)
