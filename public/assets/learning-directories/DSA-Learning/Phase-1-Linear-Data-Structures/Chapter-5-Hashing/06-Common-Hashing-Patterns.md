# Common Hashing Patterns

## 🎯 Learning Objectives

By the end of this lesson, you will:
- Master the Two Sum pattern and its variations
- Use hash maps for frequency counting
- Solve subarray sum problems efficiently
- Find duplicates using hashing
- Group elements by properties (e.g., anagrams)
- Recognize hashing patterns in new problems

---

## 🔥 Pattern 1: Two Sum

### Problem
Given an array of integers, find two numbers that add up to a target.

### Brute Force (O(n²))
```python
def two_sum_brute(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []
```

### Hash Map Optimization (O(n))
```python
def two_sum(nums, target):
    """
    Find indices of two numbers that sum to target.
    
    Time: O(n)
    Space: O(n)
    
    Pattern: Store complement in hash map
    """
    seen = {}  # value → index
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    
    return []

# Example
nums = [2, 7, 11, 15]
target = 9
print(two_sum(nums, target))  # [0, 1] (2 + 7 = 9)
```

### Key Insight
- **Instead of searching for complement in O(n), store in hash map for O(1) lookup**
- Pattern: `complement = target - current_element`

### Variations

**1. Return values instead of indices:**
```python
def two_sum_values(nums, target):
    seen = set()
    for num in nums:
        if target - num in seen:
            return [target - num, num]
        seen.add(num)
    return []
```

**2. Count pairs:**
```python
def count_pairs(nums, target):
    seen = {}
    count = 0
    for num in nums:
        if target - num in seen:
            count += seen[target - num]
        seen[num] = seen.get(num, 0) + 1
    return count
```

**3. Two Sum with sorted array (Two Pointers):**
```python
def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return []
```

---

## 📊 Pattern 2: Frequency Counting

### Problem
Count occurrences of each element.

### Implementation
```python
def frequency_count(arr):
    """
    Count frequency of each element.
    
    Time: O(n)
    Space: O(k) where k = unique elements
    """
    freq = {}
    for item in arr:
        freq[item] = freq.get(item, 0) + 1
    return freq

# Example
arr = [1, 2, 2, 3, 3, 3, 4]
print(frequency_count(arr))  # {1: 1, 2: 2, 3: 3, 4: 1}
```

### Applications

**1. Find most frequent element:**
```python
def most_frequent(arr):
    """
    Find element with highest frequency.
    
    Time: O(n)
    Space: O(k)
    """
    freq = {}
    max_count = 0
    result = None
    
    for num in arr:
        freq[num] = freq.get(num, 0) + 1
        if freq[num] > max_count:
            max_count = freq[num]
            result = num
    
    return result

# Example
arr = [1, 3, 2, 3, 4, 3, 5]
print(most_frequent(arr))  # 3 (appears 3 times)
```

**2. First unique character:**
```python
def first_unique_char(s):
    """
    Find first non-repeating character in string.
    
    Time: O(n)
    Space: O(1) (at most 26 letters)
    
    LeetCode 387
    """
    freq = {}
    
    # Count frequencies
    for char in s:
        freq[char] = freq.get(char, 0) + 1
    
    # Find first with count 1
    for i, char in enumerate(s):
        if freq[char] == 1:
            return i
    
    return -1

# Example
print(first_unique_char("leetcode"))  # 0 ('l')
print(first_unique_char("loveleetcode"))  # 2 ('v')
```

**3. Find elements with frequency k:**
```python
def elements_with_frequency_k(arr, k):
    """Find all elements that appear exactly k times."""
    freq = {}
    for num in arr:
        freq[num] = freq.get(num, 0) + 1
    
    return [num for num, count in freq.items() if count == k]

# Example
arr = [1, 2, 2, 3, 3, 3, 4]
print(elements_with_frequency_k(arr, 2))  # [2]
print(elements_with_frequency_k(arr, 3))  # [3]
```

---

## 🎯 Pattern 3: Finding Duplicates

### Contains Duplicate (LeetCode 217)
```python
def contains_duplicate(nums):
    """
    Check if array contains any duplicates.
    
    Time: O(n)
    Space: O(n)
    """
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False

# Example
print(contains_duplicate([1, 2, 3, 1]))  # True
print(contains_duplicate([1, 2, 3, 4]))  # False
```

### Find All Duplicates (LeetCode 442)
```python
def find_duplicates(nums):
    """
    Find all elements that appear twice.
    
    Time: O(n)
    Space: O(n)
    """
    freq = {}
    result = []
    
    for num in nums:
        freq[num] = freq.get(num, 0) + 1
        if freq[num] == 2:
            result.append(num)
    
    return result

# Example
print(find_duplicates([4,3,2,7,8,2,3,1]))  # [2, 3]
```

### Remove Duplicates
```python
def remove_duplicates(arr):
    """
    Remove duplicates while preserving order.
    
    Time: O(n)
    Space: O(n)
    """
    seen = set()
    result = []
    
    for num in arr:
        if num not in seen:
            seen.add(num)
            result.append(num)
    
    return result

# Example
arr = [1, 2, 2, 3, 4, 3, 5]
print(remove_duplicates(arr))  # [1, 2, 3, 4, 5]
```

---

## 📦 Pattern 4: Subarray Sum Problems

### Subarray Sum Equals K (LeetCode 560)
```python
def subarray_sum_k(nums, k):
    """
    Count subarrays with sum equal to k.
    
    Time: O(n)
    Space: O(n)
    
    Pattern: Prefix sum + hash map
    Key insight: If prefix_sum[j] - prefix_sum[i] = k,
                 then subarray [i+1...j] has sum k
    """
    count = 0
    prefix_sum = 0
    prefix_map = {0: 1}  # prefix_sum → count
    
    for num in nums:
        prefix_sum += num
        
        # Check if (prefix_sum - k) exists
        if prefix_sum - k in prefix_map:
            count += prefix_map[prefix_sum - k]
        
        # Store current prefix sum
        prefix_map[prefix_sum] = prefix_map.get(prefix_sum, 0) + 1
    
    return count

# Example
nums = [1, 1, 1]
k = 2
print(subarray_sum_k(nums, k))  # 2 ([1,1], [1,1])

nums = [1, 2, 3]
k = 3
print(subarray_sum_k(nums, k))  # 2 ([1,2], [3])
```

### Maximum Subarray with Sum K
```python
def max_subarray_length_sum_k(nums, k):
    """
    Find length of longest subarray with sum k.
    
    Time: O(n)
    Space: O(n)
    """
    max_length = 0
    prefix_sum = 0
    prefix_map = {0: -1}  # prefix_sum → earliest index
    
    for i, num in enumerate(nums):
        prefix_sum += num
        
        if prefix_sum - k in prefix_map:
            length = i - prefix_map[prefix_sum - k]
            max_length = max(max_length, length)
        
        # Store only first occurrence
        if prefix_sum not in prefix_map:
            prefix_map[prefix_sum] = i
    
    return max_length

# Example
nums = [1, -1, 5, -2, 3]
k = 3
print(max_subarray_length_sum_k(nums, k))  # 4 ([1, -1, 5, -2])
```

---

## 🎨 Pattern 5: Grouping / Categorization

### Group Anagrams (LeetCode 49)
```python
def group_anagrams(strs):
    """
    Group strings that are anagrams.
    
    Time: O(n * k log k) where k = avg string length
    Space: O(n * k)
    
    Pattern: Use sorted string as key
    """
    groups = {}
    
    for s in strs:
        # Sort string to get canonical form
        key = ''.join(sorted(s))
        
        if key not in groups:
            groups[key] = []
        groups[key].append(s)
    
    return list(groups.values())

# Example
strs = ["eat","tea","tan","ate","nat","bat"]
print(group_anagrams(strs))
# [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]
```

### Alternative with Character Count
```python
def group_anagrams_optimized(strs):
    """
    Group anagrams using character count as key.
    
    Time: O(n * k) where k = avg string length
    Space: O(n * k)
    """
    groups = {}
    
    for s in strs:
        # Count characters
        count = [0] * 26
        for char in s:
            count[ord(char) - ord('a')] += 1
        
        # Use tuple as key (lists aren't hashable)
        key = tuple(count)
        
        if key not in groups:
            groups[key] = []
        groups[key].append(s)
    
    return list(groups.values())
```

### Isomorphic Strings (LeetCode 205)
```python
def is_isomorphic(s, t):
    """
    Check if two strings are isomorphic.
    
    Time: O(n)
    Space: O(1) (at most 256 characters)
    
    Example: "egg" and "add" are isomorphic
             e→a, g→d, g→d
    """
    if len(s) != len(t):
        return False
    
    map_s_to_t = {}
    map_t_to_s = {}
    
    for char_s, char_t in zip(s, t):
        if char_s in map_s_to_t:
            if map_s_to_t[char_s] != char_t:
                return False
        else:
            map_s_to_t[char_s] = char_t
        
        if char_t in map_t_to_s:
            if map_t_to_s[char_t] != char_s:
                return False
        else:
            map_t_to_s[char_t] = char_s
    
    return True

# Example
print(is_isomorphic("egg", "add"))  # True
print(is_isomorphic("foo", "bar"))  # False
```

---

## 🔗 Pattern 6: Longest Consecutive Sequence

### Problem (LeetCode 128)
```python
def longest_consecutive(nums):
    """
    Find length of longest consecutive sequence.
    
    Time: O(n)
    Space: O(n)
    
    Example: [100, 4, 200, 1, 3, 2] → 4 (1,2,3,4)
    
    Pattern: Use hash set for O(1) lookups
    Key insight: Only start counting from sequence start
    """
    if not nums:
        return 0
    
    num_set = set(nums)
    max_length = 0
    
    for num in num_set:
        # Only start if this is the beginning of a sequence
        if num - 1 not in num_set:
            current_num = num
            current_length = 1
            
            # Count consecutive numbers
            while current_num + 1 in num_set:
                current_num += 1
                current_length += 1
            
            max_length = max(max_length, current_length)
    
    return max_length

# Example
nums = [100, 4, 200, 1, 3, 2]
print(longest_consecutive(nums))  # 4 (1,2,3,4)
```

---

## 🎓 Pattern Recognition Guide

| Problem Type | Pattern | Data Structure | Time |
|--------------|---------|----------------|------|
| Find pair with sum | Two Sum | Hash Map | O(n) |
| Count occurrences | Frequency Count | Hash Map | O(n) |
| Find duplicates | Set lookup | Hash Set | O(n) |
| Subarray sum = k | Prefix Sum + Map | Hash Map | O(n) |
| Group by property | Categorization | Hash Map | O(n) |
| Consecutive sequence | Set membership | Hash Set | O(n) |
| First unique element | Frequency + Scan | Hash Map | O(n) |

---

## 💡 Key Insights

1. **Two Sum pattern:** Store complement for O(1) lookup
2. **Frequency counting:** Use hash map to count in one pass
3. **Deduplication:** Use hash set to track seen elements
4. **Subarray sum:** Use prefix sum + hash map
5. **Grouping:** Use computed key (sorted, count, etc.)
6. **Consecutive sequence:** Use set to check neighbors

---

## 🚀 Practice Problems

### Easy:
1. Contains Duplicate (LeetCode 217)
2. Two Sum (LeetCode 1)
3. Valid Anagram (LeetCode 242)
4. Intersection of Two Arrays (LeetCode 349)
5. Happy Number (LeetCode 202)

### Medium:
6. Group Anagrams (LeetCode 49)
7. Subarray Sum Equals K (LeetCode 560)
8. Longest Consecutive Sequence (LeetCode 128)
9. Isomorphic Strings (LeetCode 205)
10. First Unique Character (LeetCode 387)

---

## 🎯 Next Steps

- **[07. Advanced Hashing Problems](./07-Advanced-Hashing-Problems.md)** - Three Sum, Four Sum, and more

---

[← Previous: Hash Set Implementation](./05-Hash-Set-Implementation.md) | [Back to Chapter 5](./README.md) | [Next: Advanced Hashing Problems →](./07-Advanced-Hashing-Problems.md)
