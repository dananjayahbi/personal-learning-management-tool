# Hashing Problems

## 🎯 Problem Set Overview

**20 hashing problems** covering hash maps, hash sets, frequency counting, and advanced hashing techniques.

**Time to Complete:** 3-4 days  
**Key Skills:** Hash map optimization, frequency analysis, subarray problems

---

## Easy Problems (1-7)

## Problem 1: Contains Duplicate (already covered)

**Link:** [LeetCode 217]  
**Pattern:** Hash Set  
**Time:** O(n), **Space:** O(n)

```python
def contains_duplicate(nums):
    return len(nums) != len(set(nums))
```

---

## Problem 2: Intersection of Two Arrays (already covered)

**Link:** [LeetCode 349]  
**Pattern:** Hash Set  

```python
def intersection(nums1, nums2):
    return list(set(nums1) & set(nums2))
```

---

## Problem 3: Happy Number

**Link:** [LeetCode 202](https://leetcode.com/problems/happy-number/)  
**Difficulty:** Easy  
**Pattern:** Cycle Detection with Hash Set

### Solution
```python
def is_happy(n):
    """
    Detect cycle using hash set.
    Time: O(log n), Space: O(log n)
    """
    seen = set()
    
    while n != 1 and n not in seen:
        seen.add(n)
        n = sum(int(digit) ** 2 for digit in str(n))
    
    return n == 1
```

---

## Problem 4: Isomorphic Strings

**Link:** [LeetCode 205](https://leetcode.com/problems/isomorphic-strings/)  
**Difficulty:** Easy  
**Pattern:** Two Hash Maps

### Solution
```python
def is_isomorphic(s, t):
    """
    Map characters both ways.
    Time: O(n), Space: O(1) - max 256 chars
    """
    if len(s) != len(t):
        return False
    
    s_to_t = {}
    t_to_s = {}
    
    for char_s, char_t in zip(s, t):
        if char_s in s_to_t and s_to_t[char_s] != char_t:
            return False
        if char_t in t_to_s and t_to_s[char_t] != char_s:
            return False
        
        s_to_t[char_s] = char_t
        t_to_s[char_t] = char_s
    
    return True
```

---

## Problem 5: Word Pattern

**Link:** [LeetCode 290](https://leetcode.com/problems/word-pattern/)  
**Difficulty:** Easy  
**Pattern:** Bijection with Hash Maps

### Solution
```python
def word_pattern(pattern, s):
    """
    Bijection between pattern and words.
    Time: O(n), Space: O(n)
    """
    words = s.split()
    if len(pattern) != len(words):
        return False
    
    char_to_word = {}
    word_to_char = {}
    
    for char, word in zip(pattern, words):
        if char in char_to_word and char_to_word[char] != word:
            return False
        if word in word_to_char and word_to_char[word] != char:
            return False
        
        char_to_word[char] = word
        word_to_char[word] = char
    
    return True
```

---

## Problem 6: Ransom Note

**Link:** [LeetCode 383](https://leetcode.com/problems/ransom-note/)  
**Difficulty:** Easy  
**Pattern:** Frequency Count

### Solution
```python
def can_construct(ransom_note, magazine):
    """
    Check if magazine has enough characters.
    Time: O(m + n), Space: O(1)
    """
    from collections import Counter
    counter = Counter(magazine)
    
    for char in ransom_note:
        if counter[char] == 0:
            return False
        counter[char] -= 1
    
    return True
```

---

## Problem 7: First Unique Character

**Link:** [LeetCode 387](https://leetcode.com/problems/first-unique-character-in-a-string/)  
**Difficulty:** Easy  
**Pattern:** Frequency Count

### Solution
```python
def first_uniq_char(s):
    """
    Count frequencies, find first with count 1.
    Time: O(n), Space: O(1)
    """
    from collections import Counter
    count = Counter(s)
    
    for i, char in enumerate(s):
        if count[char] == 1:
            return i
    
    return -1
```

---

## Medium Problems (8-17)

## Problem 8: Group Anagrams

**Link:** [LeetCode 49](https://leetcode.com/problems/group-anagrams/)  
**Difficulty:** Medium  
**Pattern:** Hash Map with Sorted Key

### Solution
```python
def group_anagrams(strs):
    """
    Use sorted string as hash key.
    Time: O(n * k log k), Space: O(n * k)
    """
    from collections import defaultdict
    anagrams = defaultdict(list)
    
    for s in strs:
        key = ''.join(sorted(s))
        anagrams[key].append(s)
    
    return list(anagrams.values())
```

---

## Problem 9: Top K Frequent Elements

**Link:** [LeetCode 347](https://leetcode.com/problems/top-k-frequent-elements/)  
**Difficulty:** Medium  
**Pattern:** Frequency Count + Bucket Sort

### Solution
```python
def top_k_frequent(nums, k):
    """
    Bucket sort by frequency.
    Time: O(n), Space: O(n)
    """
    from collections import Counter
    count = Counter(nums)
    
    # Bucket sort
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, freq in count.items():
        buckets[freq].append(num)
    
    # Collect top k
    result = []
    for i in range(len(buckets) - 1, 0, -1):
        result.extend(buckets[i])
        if len(result) >= k:
            return result[:k]
    
    return result
```

---

## Problem 10: Longest Substring Without Repeating Characters

**Link:** [LeetCode 3](https://leetcode.com/problems/longest-substring-without-repeating-characters/)  
**Difficulty:** Medium  
**Pattern:** Sliding Window + Hash Map

### Solution
```python
def length_of_longest_substring(s):
    """
    Sliding window with hash map.
    Time: O(n), Space: O(min(n, m)) where m is charset
    """
    char_index = {}
    left = 0
    max_length = 0
    
    for right, char in enumerate(s):
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1
        
        char_index[char] = right
        max_length = max(max_length, right - left + 1)
    
    return max_length
```

---

## Problem 11: 4Sum II

**Link:** [LeetCode 454](https://leetcode.com/problems/4sum-ii/)  
**Difficulty:** Medium  
**Pattern:** Hash Map for Pair Sums

### Solution
```python
def four_sum_count(nums1, nums2, nums3, nums4):
    """
    Store sums of first two arrays, search in last two.
    Time: O(n²), Space: O(n²)
    """
    from collections import defaultdict
    sum_count = defaultdict(int)
    
    # Count sums from nums1 and nums2
    for a in nums1:
        for b in nums2:
            sum_count[a + b] += 1
    
    # Find complementary sums in nums3 and nums4
    count = 0
    for c in nums3:
        for d in nums4:
            count += sum_count[-(c + d)]
    
    return count
```

---

## Problem 12: Longest Consecutive Sequence (covered in arrays)

**Link:** [LeetCode 128]  
**Pattern:** Hash Set  

```python
def longest_consecutive(nums):
    num_set = set(nums)
    max_length = 0
    
    for num in num_set:
        if num - 1 not in num_set:
            current = num
            length = 1
            
            while current + 1 in num_set:
                current += 1
                length += 1
            
            max_length = max(max_length, length)
    
    return max_length
```

---

## Problem 13: Find Duplicate Subtrees

**Link:** [LeetCode 652](https://leetcode.com/problems/find-duplicate-subtrees/)  
**Difficulty:** Medium  
**Pattern:** Hash Map with Serialization

### Solution
```python
def find_duplicate_subtrees(root):
    """
    Serialize subtrees and use hash map.
    Time: O(n²), Space: O(n²)
    """
    from collections import defaultdict
    subtrees = defaultdict(int)
    result = []
    
    def serialize(node):
        if not node:
            return '#'
        
        serial = f"{node.val},{serialize(node.left)},{serialize(node.right)}"
        subtrees[serial] += 1
        
        if subtrees[serial] == 2:
            result.append(node)
        
        return serial
    
    serialize(root)
    return result
```

---

## Problem 14: Subarray Sum Equals K (covered in arrays)

**Link:** [LeetCode 560]  
**Pattern:** Prefix Sum + Hash Map  

---

## Problem 15: Continuous Subarray Sum

**Link:** [LeetCode 523](https://leetcode.com/problems/continuous-subarray-sum/)  
**Difficulty:** Medium  
**Pattern:** Prefix Sum Modulo + Hash Map

### Solution
```python
def check_subarray_sum(nums, k):
    """
    If two prefix sums have same remainder, subarray between them is divisible by k.
    Time: O(n), Space: O(min(n, k))
    """
    prefix_mod = {0: -1}  # remainder → index
    prefix_sum = 0
    
    for i, num in enumerate(nums):
        prefix_sum += num
        remainder = prefix_sum % k
        
        if remainder in prefix_mod:
            if i - prefix_mod[remainder] >= 2:
                return True
        else:
            prefix_mod[remainder] = i
    
    return False
```

---

## Problem 16: Find All Anagrams in String

**Link:** [LeetCode 438](https://leetcode.com/problems/find-all-anagrams-in-a-string/)  
**Difficulty:** Medium  
**Pattern:** Sliding Window + Frequency Map

### Solution
```python
def find_anagrams(s, p):
    """
    Sliding window with character counts.
    Time: O(n), Space: O(1)
    """
    from collections import Counter
    result = []
    p_count = Counter(p)
    window_count = Counter()
    
    for i, char in enumerate(s):
        window_count[char] += 1
        
        # Remove leftmost char if window too large
        if i >= len(p):
            left_char = s[i - len(p)]
            if window_count[left_char] == 1:
                del window_count[left_char]
            else:
                window_count[left_char] -= 1
        
        # Check if anagram
        if window_count == p_count:
            result.append(i - len(p) + 1)
    
    return result
```

---

## Problem 17: Minimum Window Substring

**Link:** [LeetCode 76](https://leetcode.com/problems/minimum-window-substring/)  
**Difficulty:** Hard  
**Pattern:** Sliding Window + Hash Map

### Solution
```python
def min_window(s, t):
    """
    Sliding window with two hash maps.
    Time: O(m + n), Space: O(m + n)
    """
    from collections import Counter
    if not s or not t:
        return ""
    
    t_count = Counter(t)
    required = len(t_count)
    
    left = 0
    formed = 0
    window_counts = {}
    
    ans = float('inf'), None, None
    
    for right, char in enumerate(s):
        window_counts[char] = window_counts.get(char, 0) + 1
        
        if char in t_count and window_counts[char] == t_count[char]:
            formed += 1
        
        # Try to shrink window
        while left <= right and formed == required:
            # Update result
            if right - left + 1 < ans[0]:
                ans = (right - left + 1, left, right)
            
            # Remove leftmost
            char = s[left]
            window_counts[char] -= 1
            if char in t_count and window_counts[char] < t_count[char]:
                formed -= 1
            
            left += 1
    
    return "" if ans[0] == float('inf') else s[ans[1]:ans[2] + 1]
```

---

## Hard Problems (18-20)

## Problem 18: LRU Cache

**Link:** [LeetCode 146](https://leetcode.com/problems/lru-cache/)  
**Difficulty:** Medium  
**Pattern:** Hash Map + Doubly Linked List

### Solution
```python
class Node:
    def __init__(self, key=0, value=0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    """
    Hash map + doubly linked list.
    All operations O(1)
    """
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}  # key → node
        
        # Dummy head and tail
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def _remove(self, node):
        """Remove node from list."""
        node.prev.next = node.next
        node.next.prev = node.prev
    
    def _add_to_front(self, node):
        """Add node to front (after head)."""
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node
    
    def get(self, key):
        if key not in self.cache:
            return -1
        
        node = self.cache[key]
        self._remove(node)
        self._add_to_front(node)
        return node.value
    
    def put(self, key, value):
        if key in self.cache:
            self._remove(self.cache[key])
        
        node = Node(key, value)
        self._add_to_front(node)
        self.cache[key] = node
        
        if len(self.cache) > self.capacity:
            # Remove LRU (before tail)
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]
```

---

## Problem 19: LFU Cache

**Link:** [LeetCode 460](https://leetcode.com/problems/lfu-cache/)  
**Difficulty:** Hard  
**Pattern:** Multiple Hash Maps + Doubly Linked Lists

### Solution Overview
```python
class LFUCache:
    """
    Three hash maps:
    1. key → value
    2. key → frequency
    3. frequency → doubly linked list of keys
    
    All operations O(1)
    """
    def __init__(self, capacity):
        self.capacity = capacity
        self.min_freq = 0
        self.key_to_val = {}
        self.key_to_freq = {}
        self.freq_to_keys = defaultdict(OrderedDict)
    
    def get(self, key):
        if key not in self.key_to_val:
            return -1
        
        # Update frequency
        self._update_freq(key)
        return self.key_to_val[key]
    
    def put(self, key, value):
        if self.capacity == 0:
            return
        
        if key in self.key_to_val:
            self.key_to_val[key] = value
            self._update_freq(key)
            return
        
        if len(self.key_to_val) >= self.capacity:
            # Evict LFU, break ties with LRU
            evict_key, _ = self.freq_to_keys[self.min_freq].popitem(last=False)
            del self.key_to_val[evict_key]
            del self.key_to_freq[evict_key]
        
        # Add new key
        self.key_to_val[key] = value
        self.key_to_freq[key] = 1
        self.freq_to_keys[1][key] = None
        self.min_freq = 1
    
    def _update_freq(self, key):
        freq = self.key_to_freq[key]
        del self.freq_to_keys[freq][key]
        
        if not self.freq_to_keys[freq] and freq == self.min_freq:
            self.min_freq += 1
        
        self.key_to_freq[key] = freq + 1
        self.freq_to_keys[freq + 1][key] = None
```

---

## Problem 20: All O(1) Data Structure

**Link:** [LeetCode 432](https://leetcode.com/problems/all-oone-data-structure/)  
**Difficulty:** Hard  
**Pattern:** Hash Map + Doubly Linked List

### Solution Overview
```python
class AllOne:
    """
    Hash map + doubly linked list of buckets.
    Each bucket stores keys with same count.
    All operations O(1)
    """
    def __init__(self):
        self.key_to_count = {}
        self.count_to_keys = defaultdict(set)
        self.counts = []  # Sorted list of counts
    
    def inc(self, key):
        count = self.key_to_count.get(key, 0)
        self.key_to_count[key] = count + 1
        
        if count > 0:
            self.count_to_keys[count].remove(key)
            if not self.count_to_keys[count]:
                del self.count_to_keys[count]
        
        self.count_to_keys[count + 1].add(key)
    
    def dec(self, key):
        count = self.key_to_count[key]
        
        if count == 1:
            del self.key_to_count[key]
        else:
            self.key_to_count[key] = count - 1
            self.count_to_keys[count - 1].add(key)
        
        self.count_to_keys[count].remove(key)
        if not self.count_to_keys[count]:
            del self.count_to_keys[count]
    
    def getMaxKey(self):
        return next(iter(self.count_to_keys[max(self.count_to_keys)])) if self.count_to_keys else ""
    
    def getMinKey(self):
        return next(iter(self.count_to_keys[min(self.count_to_keys)])) if self.count_to_keys else ""
```

---

## 📊 Progress Tracker

| # | Problem | Pattern | Difficulty | Status |
|---|---------|---------|------------|--------|
| 1-7 | Basic Hashing | Hash Set/Map | Easy | ⬜ |
| 8 | Group Anagrams | Hash Map | Medium | ⬜ |
| 9 | Top K Frequent | Bucket Sort | Medium | ⬜ |
| 10 | Longest Substring | Sliding Window | Medium | ⬜ |
| 11 | 4Sum II | Hash Map | Medium | ⬜ |
| 12-16 | Subarray/String | Prefix Sum/Window | Medium | ⬜ |
| 17 | Min Window | Sliding Window | Hard | ⬜ |
| 18 | LRU Cache | Design | Medium | ⬜ |
| 19 | LFU Cache | Design | Hard | ⬜ |
| 20 | All O(1) | Design | Hard | ⬜ |

---

## 🎯 Key Hashing Patterns

1. **Frequency Counting** - Counter, defaultdict
2. **Bijection** - Two hash maps
3. **Sliding Window** - Hash map for window state
4. **Prefix Sum** - Hash map for (sum → index)
5. **Cache Design** - Hash map + linked list

---

[← Previous: Stack & Queue](./05-Stack-Queue-Problems.md) | [Next: Mixed Hard Problems →](./07-Mixed-Hard-Problems.md)
