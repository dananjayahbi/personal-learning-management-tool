# Advanced Hashing Problems

## 🎯 Learning Objectives

By the end of this lesson, you will:
- Solve Three Sum and Four Sum problems
- Master substring problems with hashing
- Implement LRU Cache using hash map + linked list
- Handle complex hashing scenarios
- Recognize advanced patterns

---

## 🔥 Three Sum (LeetCode 15)

### Problem
Find all unique triplets that sum to zero.

### Solution Strategy
Combine sorting + two pointers + hash set for deduplication.

```python
def three_sum(nums):
    """
    Find all unique triplets [a, b, c] where a + b + c = 0.
    
    Time: O(n²)
    Space: O(n) for result
    
    Pattern: Fix one element, use Two Sum on rest
    """
    nums.sort()  # Sort for two-pointer technique
    result = []
    
    for i in range(len(nums) - 2):
        # Skip duplicates for first element
        if i > 0 and nums[i] == nums[i-1]:
            continue
        
        # Two Sum on remaining elements
        target = -nums[i]
        left, right = i + 1, len(nums) - 1
        
        while left < right:
            current_sum = nums[left] + nums[right]
            
            if current_sum == target:
                result.append([nums[i], nums[left], nums[right]])
                
                # Skip duplicates for second element
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                # Skip duplicates for third element
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

### Hash Set Alternative (Less Efficient)
```python
def three_sum_hash(nums):
    """
    Three Sum using hash set.
    
    Time: O(n²)
    Space: O(n)
    """
    result = set()
    
    for i in range(len(nums)):
        seen = set()
        for j in range(i + 1, len(nums)):
            complement = -(nums[i] + nums[j])
            if complement in seen:
                triplet = tuple(sorted([nums[i], nums[j], complement]))
                result.add(triplet)
            seen.add(nums[j])
    
    return [list(t) for t in result]
```

---

## 🎯 Four Sum (LeetCode 18)

### Problem
Find all unique quadruplets that sum to target.

```python
def four_sum(nums, target):
    """
    Find all unique quadruplets [a, b, c, d] where a+b+c+d = target.
    
    Time: O(n³)
    Space: O(n)
    
    Pattern: Fix two elements, use Two Sum on rest
    """
    nums.sort()
    result = []
    n = len(nums)
    
    for i in range(n - 3):
        # Skip duplicates for first element
        if i > 0 and nums[i] == nums[i-1]:
            continue
        
        for j in range(i + 1, n - 2):
            # Skip duplicates for second element
            if j > i + 1 and nums[j] == nums[j-1]:
                continue
            
            # Two Sum on remaining elements
            left, right = j + 1, n - 1
            
            while left < right:
                current_sum = nums[i] + nums[j] + nums[left] + nums[right]
                
                if current_sum == target:
                    result.append([nums[i], nums[j], nums[left], nums[right]])
                    
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
nums = [1, 0, -1, 0, -2, 2]
target = 0
print(four_sum(nums, target))
# [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
```

---

## 📝 Longest Substring Without Repeating Characters (LeetCode 3)

### Problem
Find length of longest substring without repeating characters.

```python
def length_of_longest_substring(s):
    """
    Find length of longest substring without repeating chars.
    
    Time: O(n)
    Space: O(min(n, m)) where m = charset size
    
    Pattern: Sliding window + hash set
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
        max_length = max(max_length, right - left + 1)
    
    return max_length

# Example
print(length_of_longest_substring("abcabcbb"))  # 3 ("abc")
print(length_of_longest_substring("bbbbb"))     # 1 ("b")
print(length_of_longest_substring("pwwkew"))    # 3 ("wke")
```

### Optimized with Index Tracking
```python
def length_of_longest_substring_optimized(s):
    """
    Optimized with hash map storing indices.
    
    Time: O(n)
    Space: O(min(n, m))
    """
    char_index = {}  # char → last index
    left = 0
    max_length = 0
    
    for right, char in enumerate(s):
        # If char seen and in current window, move left
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1
        
        char_index[char] = right
        max_length = max(max_length, right - left + 1)
    
    return max_length
```

---

## 🪟 Minimum Window Substring (LeetCode 76)

### Problem
Find minimum window in `s` that contains all characters of `t`.

```python
def min_window(s, t):
    """
    Find minimum window substring containing all chars of t.
    
    Time: O(m + n) where m = len(s), n = len(t)
    Space: O(m + n)
    
    Pattern: Sliding window + frequency map
    """
    if not s or not t:
        return ""
    
    # Count characters in t
    t_count = {}
    for char in t:
        t_count[char] = t_count.get(char, 0) + 1
    
    required = len(t_count)  # Unique chars needed
    formed = 0  # Unique chars matched
    
    window_count = {}
    left = 0
    min_length = float('inf')
    min_left = 0
    
    for right, char in enumerate(s):
        # Add char to window
        window_count[char] = window_count.get(char, 0) + 1
        
        # Check if this char frequency matches requirement
        if char in t_count and window_count[char] == t_count[char]:
            formed += 1
        
        # Try to shrink window
        while formed == required:
            # Update result
            if right - left + 1 < min_length:
                min_length = right - left + 1
                min_left = left
            
            # Remove left char
            left_char = s[left]
            window_count[left_char] -= 1
            if left_char in t_count and window_count[left_char] < t_count[left_char]:
                formed -= 1
            
            left += 1
    
    return "" if min_length == float('inf') else s[min_left:min_left + min_length]

# Example
print(min_window("ADOBECODEBANC", "ABC"))  # "BANC"
print(min_window("a", "a"))                # "a"
print(min_window("a", "aa"))               # ""
```

---

## 🔄 LRU Cache (LeetCode 146)

### Problem
Implement Least Recently Used (LRU) cache with O(1) operations.

### Data Structures Needed
- **Hash Map:** key → node (for O(1) lookup)
- **Doubly Linked List:** maintain access order (for O(1) add/remove)

```python
class Node:
    """Doubly linked list node."""
    def __init__(self, key=0, value=0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    """
    LRU Cache with O(1) get and put operations.
    
    Data structures:
    - Hash map: key → node
    - Doubly linked list: maintain LRU order
    
    Most recent: head.next
    Least recent: tail.prev
    """
    
    def __init__(self, capacity):
        """
        Initialize with capacity.
        
        Args:
            capacity: Maximum number of items
        """
        self.capacity = capacity
        self.cache = {}  # key → node
        
        # Dummy head and tail
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def _add_to_head(self, node):
        """Add node right after head (most recent)."""
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node
    
    def _remove_node(self, node):
        """Remove node from list."""
        node.prev.next = node.next
        node.next.prev = node.prev
    
    def _move_to_head(self, node):
        """Move existing node to head (mark as recently used)."""
        self._remove_node(node)
        self._add_to_head(node)
    
    def _remove_tail(self):
        """Remove least recently used node."""
        lru_node = self.tail.prev
        self._remove_node(lru_node)
        return lru_node
    
    def get(self, key):
        """
        Get value for key.
        
        Time: O(1)
        
        Args:
            key: Key to lookup
        
        Returns:
            Value if exists, -1 otherwise
        """
        if key not in self.cache:
            return -1
        
        node = self.cache[key]
        self._move_to_head(node)  # Mark as recently used
        return node.value
    
    def put(self, key, value):
        """
        Put key-value pair.
        
        Time: O(1)
        
        Args:
            key: Key to insert/update
            value: Value to store
        """
        if key in self.cache:
            # Update existing
            node = self.cache[key]
            node.value = value
            self._move_to_head(node)
        else:
            # Insert new
            new_node = Node(key, value)
            self.cache[key] = new_node
            self._add_to_head(new_node)
            
            # Check capacity
            if len(self.cache) > self.capacity:
                # Remove LRU
                lru_node = self._remove_tail()
                del self.cache[lru_node.key]

# Usage
lru = LRUCache(2)
lru.put(1, 1)
lru.put(2, 2)
print(lru.get(1))    # 1
lru.put(3, 3)        # Evicts key 2
print(lru.get(2))    # -1 (not found)
lru.put(4, 4)        # Evicts key 1
print(lru.get(1))    # -1 (not found)
print(lru.get(3))    # 3
print(lru.get(4))    # 4
```

---

## 🎨 Count Distinct Elements in Window (Sliding Window)

### Problem
Count distinct elements in every window of size k.

```python
def count_distinct_in_windows(arr, k):
    """
    Count distinct elements in every window of size k.
    
    Time: O(n)
    Space: O(k)
    
    Pattern: Sliding window + frequency map
    """
    if k > len(arr):
        return []
    
    freq = {}
    result = []
    
    # First window
    for i in range(k):
        freq[arr[i]] = freq.get(arr[i], 0) + 1
    result.append(len(freq))
    
    # Slide window
    for i in range(k, len(arr)):
        # Remove leftmost element
        left = arr[i - k]
        freq[left] -= 1
        if freq[left] == 0:
            del freq[left]
        
        # Add new element
        freq[arr[i]] = freq.get(arr[i], 0) + 1
        
        result.append(len(freq))
    
    return result

# Example
arr = [1, 2, 1, 3, 4, 2, 3]
k = 4
print(count_distinct_in_windows(arr, k))  # [3, 4, 4, 3]
```

---

## 🔢 Top K Frequent Elements (LeetCode 347)

### Problem
Find k most frequent elements.

```python
from collections import Counter
import heapq

def top_k_frequent(nums, k):
    """
    Find k most frequent elements.
    
    Time: O(n log k) using heap
    Space: O(n)
    
    Pattern: Frequency count + heap
    """
    # Count frequencies
    count = Counter(nums)
    
    # Use heap to find top k
    return heapq.nlargest(k, count.keys(), key=count.get)

# Alternative: Bucket sort (O(n))
def top_k_frequent_bucket(nums, k):
    """
    Find k most frequent using bucket sort.
    
    Time: O(n)
    Space: O(n)
    """
    count = {}
    for num in nums:
        count[num] = count.get(num, 0) + 1
    
    # Bucket: index = frequency, value = list of numbers
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, freq in count.items():
        buckets[freq].append(num)
    
    # Collect top k
    result = []
    for i in range(len(buckets) - 1, -1, -1):
        result.extend(buckets[i])
        if len(result) >= k:
            return result[:k]
    
    return result

# Example
nums = [1,1,1,2,2,3]
k = 2
print(top_k_frequent(nums, k))  # [1, 2]
```

---

## 🎓 Key Takeaways

1. **Three/Four Sum:** Fix elements, use Two Sum on rest
2. **Substring problems:** Sliding window + hash map/set
3. **LRU Cache:** Hash map + doubly linked list
4. **Window problems:** Frequency map + sliding technique
5. **Top K:** Frequency count + heap/bucket sort

---

## 🚀 Practice Problems

### Hard:
1. LRU Cache (LeetCode 146)
2. Minimum Window Substring (LeetCode 76)
3. Longest Substring with At Most K Distinct (LeetCode 340)
4. Substring with Concatenation of All Words (LeetCode 30)
5. Count of Range Sum (LeetCode 327)

---

## 🎯 Next Steps

- **[08. Practice Problems](./08-Practice-Problems.md)** - Comprehensive problem list
- **[09. Hashing Cheatsheet](./09-Hashing-Cheatsheet.md)** - Quick reference

---

[← Previous: Common Hashing Patterns](./06-Common-Hashing-Patterns.md) | [Back to Chapter 5](./README.md) | [Next: Practice Problems →](./08-Practice-Problems.md)
