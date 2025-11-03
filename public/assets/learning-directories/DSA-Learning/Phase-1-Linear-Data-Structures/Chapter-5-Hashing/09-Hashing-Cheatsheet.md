# Hashing Cheatsheet

## 🎯 Quick Reference Guide

This cheatsheet provides instant access to hashing concepts, patterns, and templates for interviews and problem-solving.

---

## 📊 Time Complexity Table

| Operation | Hash Map | Hash Set | Array | Notes |
|-----------|----------|----------|-------|-------|
| **Insert** | O(1) avg | O(1) avg | O(1)* | *at end |
| **Search** | O(1) avg | O(1) avg | O(n) | Hash wins! |
| **Delete** | O(1) avg | O(1) avg | O(n) | Hash wins! |
| **Min/Max** | O(n) | O(n) | O(n) | Use heap instead |
| **Ordered traversal** | O(n log n) | O(n log n) | O(1) | Use TreeMap |
| **Space** | O(n) | O(n) | O(n) | Hash has overhead |

**Worst case:** O(n) when all keys collide (rare with good hash function)

---

## 🔑 Hash Function Formulas

### Division Method
```
h(key) = key % m
```
- Use prime number for `m`
- Fastest method

### Multiplication Method
```
h(key) = floor(m * (key * A mod 1))
A ≈ 0.618 (golden ratio)
```
- `m` can be power of 2

### String Hashing (Polynomial)
```
h(s) = (s[0]*p^0 + s[1]*p^1 + ... + s[n-1]*p^(n-1)) % m
p = 31 or 53 (prime)
m = 10^9 + 9 (large prime)
```

---

## 🎨 Built-in Hash Structures

### Python
```python
# Hash Map
my_dict = {}
my_dict = dict()
from collections import defaultdict, Counter

# Hash Set
my_set = set()
my_set = {1, 2, 3}

# Operations
my_dict[key] = value      # Insert/Update: O(1)
value = my_dict[key]      # Access: O(1)
del my_dict[key]          # Delete: O(1)
if key in my_dict:        # Check: O(1)
```

### C++
```cpp
#include <unordered_map>
#include <unordered_set>

// Hash Map
unordered_map<int, int> map;
map[key] = value;         // Insert/Update: O(1)
int val = map[key];       // Access: O(1)
map.erase(key);           // Delete: O(1)
if (map.count(key))       // Check: O(1)

// Hash Set
unordered_set<int> set;
set.insert(value);        // Insert: O(1)
set.erase(value);         // Delete: O(1)
if (set.count(value))     // Check: O(1)
```

### Java
```java
import java.util.HashMap;
import java.util.HashSet;

// Hash Map
HashMap<Integer, Integer> map = new HashMap<>();
map.put(key, value);      // Insert/Update: O(1)
int val = map.get(key);   // Access: O(1)
map.remove(key);          // Delete: O(1)
if (map.containsKey(key)) // Check: O(1)

// Hash Set
HashSet<Integer> set = new HashSet<>();
set.add(value);           // Insert: O(1)
set.remove(value);        // Delete: O(1)
if (set.contains(value))  // Check: O(1)
```

---

## 🔥 Common Patterns & Templates

### Pattern 1: Two Sum
```python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
```

**Use when:** Finding pairs with given sum  
**Time:** O(n) | **Space:** O(n)

---

### Pattern 2: Frequency Counting
```python
def frequency_count(arr):
    freq = {}
    for item in arr:
        freq[item] = freq.get(item, 0) + 1
    return freq

# Or use Counter
from collections import Counter
freq = Counter(arr)
```

**Use when:** Counting occurrences  
**Time:** O(n) | **Space:** O(k) where k = unique elements

---

### Pattern 3: Finding Duplicates
```python
def has_duplicates(arr):
    seen = set()
    for num in arr:
        if num in seen:
            return True
        seen.add(num)
    return False
```

**Use when:** Detecting duplicates  
**Time:** O(n) | **Space:** O(n)

---

### Pattern 4: Subarray Sum Equals K
```python
def subarray_sum_k(nums, k):
    count = 0
    prefix_sum = 0
    prefix_map = {0: 1}
    
    for num in nums:
        prefix_sum += num
        if prefix_sum - k in prefix_map:
            count += prefix_map[prefix_sum - k]
        prefix_map[prefix_sum] = prefix_map.get(prefix_sum, 0) + 1
    
    return count
```

**Use when:** Subarray sum problems  
**Time:** O(n) | **Space:** O(n)

---

### Pattern 5: Grouping/Categorization
```python
def group_anagrams(strs):
    groups = {}
    for s in strs:
        key = ''.join(sorted(s))  # Or use char count
        if key not in groups:
            groups[key] = []
        groups[key].append(s)
    return list(groups.values())
```

**Use when:** Grouping by property  
**Time:** O(n * k log k) | **Space:** O(n * k)

---

### Pattern 6: Sliding Window with Hash Map
```python
def longest_substring_k_distinct(s, k):
    char_count = {}
    left = 0
    max_length = 0
    
    for right, char in enumerate(s):
        char_count[char] = char_count.get(char, 0) + 1
        
        while len(char_count) > k:
            char_count[s[left]] -= 1
            if char_count[s[left]] == 0:
                del char_count[s[left]]
            left += 1
        
        max_length = max(max_length, right - left + 1)
    
    return max_length
```

**Use when:** Window with constraints  
**Time:** O(n) | **Space:** O(k)

---

### Pattern 7: LRU Cache Template
```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cache = OrderedDict()
        self.capacity = capacity
    
    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]
    
    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)
```

**Use when:** Cache with eviction policy  
**Time:** O(1) per operation | **Space:** O(capacity)

---

## 🎯 Pattern Recognition Guide

| Problem Description | Pattern | Data Structure |
|---------------------|---------|----------------|
| "Find pair with sum X" | Two Sum | Hash Map |
| "Count occurrences" | Frequency | Hash Map |
| "Find duplicates" | Membership | Hash Set |
| "Subarray sum = K" | Prefix Sum | Hash Map |
| "Group by property" | Categorization | Hash Map |
| "Longest substring..." | Sliding Window | Hash Map/Set |
| "Check anagrams" | Frequency | Hash Map |
| "First unique..." | Frequency + Scan | Hash Map |
| "LRU/LFU Cache" | Cache | Map + List |
| "Consecutive sequence" | Membership | Hash Set |

---

## ⚡ Optimization Tricks

### 1. Use Default Values
```python
# Instead of:
if key in dict:
    dict[key] += 1
else:
    dict[key] = 1

# Use:
dict[key] = dict.get(key, 0) + 1

# Or:
from collections import defaultdict
dict = defaultdict(int)
dict[key] += 1
```

### 2. Counter for Frequency
```python
from collections import Counter
freq = Counter(arr)
most_common = freq.most_common(k)
```

### 3. Set Operations
```python
set1 = {1, 2, 3}
set2 = {2, 3, 4}

union = set1 | set2         # {1, 2, 3, 4}
intersection = set1 & set2  # {2, 3}
difference = set1 - set2    # {1}
symmetric_diff = set1 ^ set2 # {1, 4}
```

### 4. Avoid Collision
```python
# Use tuple for composite keys
map[(x, y)] = value

# Or string concatenation
map[f"{x},{y}"] = value
```

---

## 🚫 Common Mistakes to Avoid

### 1. Modifying While Iterating
```python
# ❌ Wrong
for key in dict:
    if condition:
        del dict[key]  # Error!

# ✅ Correct
keys_to_delete = [k for k, v in dict.items() if condition]
for key in keys_to_delete:
    del dict[key]
```

### 2. Using Mutable Objects as Keys
```python
# ❌ Wrong
dict[list] = value  # Lists are not hashable

# ✅ Correct
dict[tuple(list)] = value  # Tuples are hashable
```

### 3. Forgetting None Check
```python
# ❌ Wrong
value = dict[key]  # KeyError if key doesn't exist

# ✅ Correct
value = dict.get(key, default_value)
# Or
if key in dict:
    value = dict[key]
```

### 4. Not Handling Collisions
```python
# In custom implementation, always handle collisions:
# - Use chaining (linked lists)
# - Or open addressing (probing)
```

---

## 📝 Interview Checklist

Before interviews, make sure you can:

- [ ] Implement hash map from scratch with chaining
- [ ] Explain how hash functions work
- [ ] Describe collision resolution methods
- [ ] Solve Two Sum in O(n)
- [ ] Use frequency maps for counting
- [ ] Apply sliding window with hash maps
- [ ] Implement LRU Cache
- [ ] Recognize when to use hash vs other structures
- [ ] Analyze time/space complexity
- [ ] Handle edge cases (empty, duplicates, etc.)

---

## 🎓 Key Points to Remember

1. **Hash map provides O(1) average operations** - search, insert, delete
2. **Use hash map when you need fast lookups** - not for ordered data
3. **Two Sum is the fundamental pattern** - store complement
4. **Frequency counting is common** - use Counter or hash map
5. **Subarray problems use prefix sum + hash map** - powerful technique
6. **Sliding window + hash map for substring problems** - efficient solution
7. **Load factor affects performance** - keep < 0.75
8. **Collision handling is important** - chaining or probing
9. **Choose right data structure** - hash map vs hash set vs tree map
10. **Test edge cases** - empty, single element, all duplicates

---

## 🚀 Further Learning

### Books:
- "Cracking the Coding Interview" - Chapter 1
- "Introduction to Algorithms" (CLRS) - Chapter 11
- "Algorithm Design Manual" - Hashing section

### Online:
- [Visualgo - Hash Table](https://visualgo.net/en/hashtable)
- [LeetCode Hash Table Explore](https://leetcode.com/explore/learn/card/hash-table/)
- [NeetCode Hash Map Playlist](https://www.youtube.com/c/NeetCode)

### Practice:
- Complete all 35+ problems in Practice Problems section
- LeetCode Hash Table tag (200+ problems)
- Daily LeetCode problem with hashing tag

---

## 🎯 Quick Interview Templates

### Template 1: Basic Hash Map Problem
```python
def solve(arr):
    # 1. Create hash map
    hashmap = {}
    
    # 2. Populate/Process
    for item in arr:
        # Store or count
        hashmap[key] = value
    
    # 3. Extract result
    result = process(hashmap)
    return result
```

### Template 2: Sliding Window + Hash Map
```python
def sliding_window(s, constraint):
    left = 0
    hashmap = {}
    result = initialize()
    
    for right in range(len(s)):
        # Expand window
        update_hashmap(hashmap, s[right])
        
        # Shrink window if invalid
        while invalid(hashmap):
            remove_from_hashmap(hashmap, s[left])
            left += 1
        
        # Update result
        result = update_result(result, right - left + 1)
    
    return result
```

---

[← Previous: Practice Problems](./08-Practice-Problems.md) | [Back to Chapter 5](./README.md) | [Phase 1 Overview →](../README.md)

---

**🎉 Congratulations on completing Chapter 5: Hashing!**

You now have a solid understanding of hash tables, hash maps, hash sets, and common hashing patterns. Keep practicing and applying these concepts to become a hashing master! 🚀
