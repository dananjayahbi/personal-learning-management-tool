# Collision Resolution

## 🎯 Learning Objectives

By the end of this lesson, you will:
- Understand what collisions are and why they occur
- Master chaining (separate chaining) technique
- Master open addressing techniques (linear, quadratic, double hashing)
- Compare collision resolution methods
- Implement collision handling in code
- Understand load factor and rehashing

---

## 📖 What are Collisions?

A **collision** occurs when two different keys hash to the same index.

```
h("apple") = 3
h("orange") = 3  ← Collision!
```

### Why Collisions are Inevitable

**Pigeonhole Principle:**
- If you have more keys than buckets, at least one bucket must have multiple keys
- Even with fewer keys, collisions are likely (Birthday Paradox)

**Birthday Paradox:**
- With just 23 people, there's a 50% chance two share a birthday
- With 100 buckets, collisions are very likely after ~10 insertions

### Collision Rate

```
Keys: 10,000
Buckets: 1,000
Average keys per bucket: 10,000 / 1,000 = 10 ← Many collisions!

Keys: 100
Buckets: 1,000
Average keys per bucket: 100 / 1,000 = 0.1 ← Few collisions
```

---

## 🔗 Method 1: Chaining (Separate Chaining)

### Concept

Each bucket stores a **linked list** of all keys that hash to it.

```
Hash Table (size = 7)

Index  |  Linked List
-------|--------------------
  0    |  [5] → [12] → [19]
  1    |  [8]
  2    |  [2] → [9]
  3    |  [10]
  4    |  empty
  5    |  [26] → [33]
  6    |  [6] → [13] → [20]
```

### How It Works

**Insert:**
1. Compute `index = hash(key) % m`
2. Append to linked list at `table[index]`

**Search:**
1. Compute `index = hash(key) % m`
2. Traverse linked list at `table[index]`
3. Return value if key found

**Delete:**
1. Compute `index = hash(key) % m`
2. Traverse and remove from linked list

### Python Implementation

```python
class HashTableChaining:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]  # List of lists
    
    def _hash(self, key):
        return hash(key) % self.size
    
    def insert(self, key, value):
        index = self._hash(key)
        # Check if key exists, update it
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                self.table[index][i] = (key, value)
                return
        # Key doesn't exist, append
        self.table[index].append((key, value))
    
    def search(self, key):
        index = self._hash(key)
        for k, v in self.table[index]:
            if k == key:
                return v
        return None
    
    def delete(self, key):
        index = self._hash(key)
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                del self.table[index][i]
                return True
        return False
    
    def display(self):
        for i, bucket in enumerate(self.table):
            print(f"{i}: {bucket}")

# Usage
ht = HashTableChaining(7)
ht.insert("apple", 5)
ht.insert("banana", 8)
ht.insert("orange", 12)  # May collide with "apple"
print(ht.search("apple"))  # Output: 5
ht.display()
```

### Time Complexity

| Operation | Average Case | Worst Case | Notes |
|-----------|--------------|------------|-------|
| Insert    | O(1)         | O(n)       | Worst: all keys in one bucket |
| Search    | O(1 + α)     | O(n)       | α = load factor |
| Delete    | O(1 + α)     | O(n)       | Must search first |

**Load Factor:** α = n/m (elements/buckets)

### Pros & Cons

**Pros:**
- ✅ Simple to implement
- ✅ Never "fills up" (can always add more)
- ✅ Good for unknown number of elements
- ✅ Deletion is straightforward

**Cons:**
- ❌ Extra memory for pointers
- ❌ Cache-unfriendly (pointer chasing)
- ❌ Poor performance if many collisions

---

## 📦 Method 2: Open Addressing

### Concept

All keys stored **directly in the array**. If collision occurs, probe for next available slot.

```
No linked lists - everything in the array!
```

### Types of Probing

1. **Linear Probing** - Check next slot sequentially
2. **Quadratic Probing** - Check slots at quadratic intervals
3. **Double Hashing** - Use second hash function for probe sequence

---

### 2.1 Linear Probing

**Formula:** `h(key, i) = (hash(key) + i) % m`

Where `i = 0, 1, 2, 3, ...` (probe sequence)

**Process:**
1. Compute `index = hash(key) % m`
2. If `table[index]` is empty, insert there
3. If occupied, try `(index + 1) % m`
4. Keep trying `(index + 2) % m`, `(index + 3) % m`, ...
5. Until empty slot found

**Example:**

```
Insert: 23, 43, 13, 27 into table of size 10

hash(23) = 3 → table[3] = 23
hash(43) = 3 → collision! Try 4 → table[4] = 43
hash(13) = 3 → collision! Try 4 (occupied), 5 → table[5] = 13
hash(27) = 7 → table[7] = 27

Table:
[_, _, _, 23, 43, 13, _, 27, _, _]
 0  1  2  3   4   5   6  7   8  9
```

**Python Implementation:**

```python
class HashTableLinearProbing:
    def __init__(self, size=10):
        self.size = size
        self.keys = [None] * size
        self.values = [None] * size
    
    def _hash(self, key):
        return hash(key) % self.size
    
    def insert(self, key, value):
        index = self._hash(key)
        
        # Linear probing
        while self.keys[index] is not None:
            if self.keys[index] == key:
                # Update existing key
                self.values[index] = value
                return
            index = (index + 1) % self.size
            
            # Table full (in practice, rehash before this)
            if index == self._hash(key):
                raise Exception("Hash table is full")
        
        self.keys[index] = key
        self.values[index] = value
    
    def search(self, key):
        index = self._hash(key)
        start_index = index
        
        while self.keys[index] is not None:
            if self.keys[index] == key:
                return self.values[index]
            index = (index + 1) % self.size
            
            # Wrapped around, key not found
            if index == start_index:
                break
        
        return None
    
    def delete(self, key):
        index = self._hash(key)
        start_index = index
        
        while self.keys[index] is not None:
            if self.keys[index] == key:
                # Mark as deleted (use sentinel)
                self.keys[index] = "DELETED"
                self.values[index] = None
                return True
            index = (index + 1) % self.size
            
            if index == start_index:
                break
        
        return False

# Usage
ht = HashTableLinearProbing(10)
ht.insert("apple", 5)
ht.insert("banana", 8)
ht.insert("orange", 12)
print(ht.search("banana"))  # Output: 8
```

**Primary Clustering:**
- Keys cluster together in consecutive slots
- Increases search time as clusters grow

```
Clustering Example:
[_, _, 23, 43, 13, 27, 33, _, _, _]
      ↑  ↑   ↑   ↑   ↑  ← Cluster!
```

**Pros:**
- ✅ Cache-friendly (sequential access)
- ✅ No extra memory for pointers

**Cons:**
- ❌ Primary clustering
- ❌ Table can fill up
- ❌ Deletion is tricky (need sentinel values)

---

### 2.2 Quadratic Probing

**Formula:** `h(key, i) = (hash(key) + c₁*i + c₂*i²) % m`

Common: `c₁ = 0, c₂ = 1` → `h(key, i) = (hash(key) + i²) % m`

**Process:**
- Probe sequence: `index, index+1², index+2², index+3², ...`

**Example:**

```
Insert 23, 43, 13 into table of size 10

hash(23) = 3 → table[3] = 23
hash(43) = 3 → Try 3+1² = 4 → table[4] = 43
hash(13) = 3 → Try 3+1² = 4 (occupied), 3+2² = 7 → table[7] = 13

Table:
[_, _, _, 23, 43, _, _, 13, _, _]
 0  1  2  3   4   5  6  7   8  9
```

**Python Implementation:**

```python
class HashTableQuadraticProbing:
    def __init__(self, size=10):
        self.size = size
        self.keys = [None] * size
        self.values = [None] * size
    
    def _hash(self, key):
        return hash(key) % self.size
    
    def insert(self, key, value):
        index = self._hash(key)
        i = 0
        
        while self.keys[index] is not None:
            if self.keys[index] == key:
                self.values[index] = value
                return
            
            i += 1
            index = (self._hash(key) + i*i) % self.size
            
            if i >= self.size:
                raise Exception("Hash table is full")
        
        self.keys[index] = key
        self.values[index] = value
    
    def search(self, key):
        index = self._hash(key)
        i = 0
        
        while self.keys[index] is not None and i < self.size:
            if self.keys[index] == key:
                return self.values[index]
            i += 1
            index = (self._hash(key) + i*i) % self.size
        
        return None
```

**Secondary Clustering:**
- Keys with same initial hash follow same probe sequence
- Better than primary clustering, but still exists

**Pros:**
- ✅ Reduces primary clustering
- ✅ Better distribution than linear probing

**Cons:**
- ❌ Secondary clustering
- ❌ May not probe all slots (depending on table size)
- ❌ Table size should be prime for best results

---

### 2.3 Double Hashing

**Formula:** `h(key, i) = (h₁(key) + i * h₂(key)) % m`

Where:
- `h₁(key)` = primary hash function
- `h₂(key)` = secondary hash function
- `h₂(key)` must never be 0 (common: `h₂(key) = 1 + (key % (m-1))`)

**Example:**

```
h₁(key) = key % 10
h₂(key) = 1 + (key % 9)

Insert 19:
h₁(19) = 9
h₂(19) = 1 + (19 % 9) = 1 + 1 = 2

If collision at 9:
Try 9, (9+2)%10=11%10=1, (9+4)%10=13%10=3, ...
```

**Python Implementation:**

```python
class HashTableDoubleHashing:
    def __init__(self, size=10):
        self.size = size
        self.keys = [None] * size
        self.values = [None] * size
    
    def _hash1(self, key):
        return hash(key) % self.size
    
    def _hash2(self, key):
        # Ensure non-zero
        return 1 + (hash(key) % (self.size - 1))
    
    def insert(self, key, value):
        index = self._hash1(key)
        step = self._hash2(key)
        i = 0
        
        while self.keys[index] is not None:
            if self.keys[index] == key:
                self.values[index] = value
                return
            
            i += 1
            index = (self._hash1(key) + i * step) % self.size
            
            if i >= self.size:
                raise Exception("Hash table is full")
        
        self.keys[index] = key
        self.values[index] = value
    
    def search(self, key):
        index = self._hash1(key)
        step = self._hash2(key)
        i = 0
        
        while self.keys[index] is not None and i < self.size:
            if self.keys[index] == key:
                return self.values[index]
            i += 1
            index = (self._hash1(key) + i * step) % self.size
        
        return None
```

**Pros:**
- ✅ Minimal clustering
- ✅ Best open addressing method
- ✅ Uniform probe sequences

**Cons:**
- ❌ More complex to implement
- ❌ Requires two hash functions

---

## 📊 Comparison of Methods

| Method | Clustering | Cache Performance | Memory | Complexity |
|--------|------------|-------------------|--------|------------|
| Chaining | None | Poor | High (pointers) | Low |
| Linear Probing | Primary | Excellent | Low | Low |
| Quadratic Probing | Secondary | Good | Low | Medium |
| Double Hashing | Minimal | Good | Low | High |

---

## 🔄 Load Factor and Rehashing

### Load Factor (α)

```
α = n / m

where:
n = number of elements
m = table size
```

**Impact:**

| α | Chaining Avg Search | Linear Probing Avg Search |
|---|---------------------|---------------------------|
| 0.25 | 1.125 | 1.17 |
| 0.50 | 1.25 | 1.50 |
| 0.75 | 1.375 | 2.50 |
| 0.90 | 1.45 | 5.50 |

**Optimal:** Keep α < 0.7 for good performance

### Rehashing

When α exceeds threshold (e.g., 0.75):
1. Create new table with ~2x size
2. Reinsert all elements using new hash function
3. Replace old table

**Python Example:**

```python
def rehash(self):
    old_keys = self.keys
    old_values = self.values
    
    # Double the size
    self.size = self.size * 2
    self.keys = [None] * self.size
    self.values = [None] * self.size
    
    # Reinsert all elements
    for i in range(len(old_keys)):
        if old_keys[i] is not None:
            self.insert(old_keys[i], old_values[i])
```

**Cost:** O(n) but amortized O(1) per insert

---

## 🎓 Key Takeaways

1. **Collisions are inevitable** - use pigeonhole principle
2. **Chaining uses linked lists** - simple but uses extra memory
3. **Open addressing stores in array** - cache-friendly but can fill up
4. **Linear probing causes primary clustering** - fast but clusters
5. **Quadratic probing reduces clustering** - better distribution
6. **Double hashing minimizes clustering** - best open addressing
7. **Load factor impacts performance** - rehash when α > 0.7
8. **Choose method based on use case** - chaining for flexibility, open addressing for speed

---

## 🚀 Next Steps

Now that you understand collision resolution:
- **[04. Hash Map Implementation](./04-Hash-Map-Implementation.md)** - Build hash map from scratch
- **[05. Hash Set Implementation](./05-Hash-Set-Implementation.md)** - Build hash set from scratch

---

[← Previous: Hash Functions](./02-Hash-Functions.md) | [Back to Chapter 5](./README.md) | [Next: Hash Map Implementation →](./04-Hash-Map-Implementation.md)
