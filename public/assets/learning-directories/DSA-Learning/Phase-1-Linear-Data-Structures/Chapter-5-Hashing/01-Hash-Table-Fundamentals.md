# Hash Table Fundamentals

## 🎯 Learning Objectives

By the end of this lesson, you will:
- Understand what hashing is and why it's powerful
- Learn the structure and components of hash tables
- Master basic operations: Insert, Search, Delete
- Analyze time and space complexity
- Recognize when to use hash tables

---

## 📖 What is Hashing?

**Hashing** is a technique that transforms a key into an index (hash code) to store or retrieve data in constant time.

### The Problem Hashing Solves

Without hashing:
- **Linear Search**: O(n) time to find an element in an array
- **Binary Search**: O(log n) time, but requires sorted data

With hashing:
- **Hash Table Search**: O(1) average time! 🚀

### Real-World Analogy

Think of a library:
- **Without hashing**: Search through every book (linear search)
- **With hashing**: Books organized by call numbers—go directly to the shelf (hash table)

---

## 🏗️ Hash Table Structure

A hash table consists of:

1. **Array (Buckets)**: Fixed-size array to store elements
2. **Hash Function**: Maps keys to array indices
3. **Collision Handling**: Mechanism to handle multiple keys mapping to same index

```
Key → Hash Function → Index → Value

Example:
"apple" → hash("apple") → 3 → 100
"banana" → hash("banana") → 7 → 200
"orange" → hash("orange") → 3 → 150  // Collision!
```

### Visual Representation

```
Hash Table (size = 10)

Index  |  Key-Value Pairs
-------|------------------
  0    |  empty
  1    |  empty
  2    |  "cat" → 5
  3    |  "apple" → 100 → "orange" → 150  (collision, chained)
  4    |  empty
  5    |  "dog" → 8
  6    |  empty
  7    |  "banana" → 200
  8    |  "grape" → 75
  9    |  empty
```

---

## 🔑 Key Components

### 1. Keys
- Unique identifiers for data
- Can be: integers, strings, objects (with proper hashing)
- Must be **immutable** (in most languages)

### 2. Values
- Data associated with keys
- Can be any type: int, string, object, list, etc.

### 3. Hash Function
- Converts key → integer index
- Must be **deterministic**: same key always produces same hash
- Should distribute keys **uniformly** across array

### 4. Buckets/Slots
- Array positions where key-value pairs are stored
- Size determines capacity of hash table

---

## ⚙️ Basic Operations

### 1. Insert (Put)

**Process:**
1. Compute hash: `index = hash(key) % table_size`
2. Go to `table[index]`
3. Insert key-value pair
4. Handle collision if slot is occupied

**Time Complexity:** O(1) average

```python
def insert(hash_table, key, value):
    index = hash(key) % len(hash_table)
    hash_table[index] = (key, value)
```

### 2. Search (Get)

**Process:**
1. Compute hash: `index = hash(key) % table_size`
2. Go to `table[index]`
3. Return value if key matches
4. Handle collision if multiple keys at same index

**Time Complexity:** O(1) average

```python
def search(hash_table, key):
    index = hash(key) % len(hash_table)
    if hash_table[index] and hash_table[index][0] == key:
        return hash_table[index][1]
    return None
```

### 3. Delete (Remove)

**Process:**
1. Compute hash: `index = hash(key) % table_size`
2. Go to `table[index]`
3. Remove key-value pair
4. Handle collision chain if needed

**Time Complexity:** O(1) average

```python
def delete(hash_table, key):
    index = hash(key) % len(hash_table)
    if hash_table[index] and hash_table[index][0] == key:
        hash_table[index] = None
```

---

## 📊 Time & Space Complexity

### Time Complexity

| Operation | Average Case | Worst Case | Notes |
|-----------|--------------|------------|-------|
| Insert    | **O(1)**     | O(n)       | Worst case: all keys collide |
| Search    | **O(1)**     | O(n)       | Worst case: linear search in chain |
| Delete    | **O(1)**     | O(n)       | Worst case: linear search in chain |

**Why O(1) average?**
- Good hash function distributes keys uniformly
- Low load factor keeps collision rate low
- Each bucket has few or no collisions

**Why O(n) worst case?**
- All keys hash to same index (poor hash function)
- Degenerates to linked list search

### Space Complexity

**O(n)** where n = number of elements

- **Extra space for collision handling:**
  - Chaining: O(n) for linked list nodes
  - Open addressing: Already allocated in array

- **Load Factor (α):**
  ```
  α = n / m
  where n = number of elements
        m = table size
  ```
  - Keep α < 0.7 for good performance
  - Rehash when α exceeds threshold

---

## 🧠 How Hashing Achieves O(1)

### Direct Access

Hash tables use **direct addressing**:
```
array[index] → O(1) access
```

### The Magic Formula

```
index = hash(key) % table_size
```

**Steps:**
1. Compute hash in O(1)
2. Modulo operation in O(1)
3. Array access in O(1)
4. **Total:** O(1) + O(1) + O(1) = **O(1)** ✨

### Assumptions for O(1)

1. **Good hash function**: uniform distribution
2. **Low load factor**: α < 0.7 typically
3. **Efficient collision handling**
4. **Amortized analysis**: rehashing spreads cost

---

## 🎯 When to Use Hash Tables

### ✅ Use Hash Tables When:

1. **Fast lookups needed** - O(1) search
   - Example: Finding if element exists

2. **Counting frequencies** - O(1) increment
   - Example: Count word occurrences

3. **Detecting duplicates** - O(1) check
   - Example: Find duplicate in array

4. **Caching/Memoization** - O(1) store & retrieve
   - Example: Dynamic programming

5. **Mapping relationships** - O(1) key-value access
   - Example: User ID → User object

6. **Grouping data** - O(1) group by key
   - Example: Group anagrams

### ❌ Don't Use Hash Tables When:

1. **Need sorted data** - Hash tables don't maintain order
   - Use: Tree-based structures (BST, TreeMap)

2. **Need range queries** - Can't efficiently find all keys in range
   - Use: Trees or sorted arrays

3. **Memory constrained** - Hash tables use extra space
   - Use: Arrays or compact structures

4. **Need min/max operations** - O(n) to find min/max
   - Use: Heap or balanced BST

5. **Small dataset** - Overhead not worth it for < 10 elements
   - Use: Simple array or list

---

## 💡 Hash Table vs Other Data Structures

| Operation | Array | Linked List | Hash Table | BST |
|-----------|-------|-------------|------------|-----|
| Search    | O(n)  | O(n)        | **O(1)**   | O(log n) |
| Insert    | O(1)* | O(1)**      | **O(1)**   | O(log n) |
| Delete    | O(n)  | O(n)        | **O(1)**   | O(log n) |
| Min/Max   | O(n)  | O(n)        | O(n)       | **O(log n)** |
| Sorted?   | No    | No          | No         | **Yes** |
| Range Query | No  | No          | No         | **Yes** |

*Insert at end  
**Insert at head

**Takeaway:** Hash tables dominate for search, insert, delete. Trees win for ordered operations.

---

## 🔍 Common Interview Questions

### Question 1: Why is hash table search O(1)?

**Answer:**
Hash tables use direct array indexing. Given a key:
1. Hash function computes index in O(1)
2. Array access at index is O(1)
3. With good hashing and low load factor, collisions are rare
4. Result: O(1) average-case lookup

### Question 2: Can hash table guarantee O(1) worst case?

**Answer:**
No. Worst case is O(n) when:
- All keys collide (poor hash function)
- Very high load factor
- Degenerates to linear search

However, O(1) average case is what matters in practice with good design.

### Question 3: What is load factor and why does it matter?

**Answer:**
Load factor α = n/m (elements/buckets)
- **Low α (<0.5)**: Fast, wastes space
- **Moderate α (0.5-0.7)**: Balanced performance
- **High α (>0.75)**: Slow, more collisions
- **Solution**: Rehash when α exceeds threshold

### Question 4: Hash table vs Hash set?

**Answer:**
- **Hash Table/Map**: Stores key-value pairs
- **Hash Set**: Stores only keys (values are implicitly present/absent)
- Both use same underlying structure
- Set is simplified version of map

---

## 📝 Practice Problems

### Easy:
1. **Contains Duplicate** (LeetCode 217)
   - Use hash set to detect duplicates in O(n)

2. **Two Sum** (LeetCode 1)
   - Use hash map to find pair summing to target

3. **Valid Anagram** (LeetCode 242)
   - Use hash map to count character frequencies

### Medium:
4. **Group Anagrams** (LeetCode 49)
   - Use hash map with sorted string as key

5. **First Unique Character** (LeetCode 387)
   - Use hash map to count frequencies, find first with count 1

---

## 🎓 Key Takeaways

1. **Hashing provides O(1) average-case operations** - fastest for lookup, insert, delete
2. **Hash function maps keys to indices** - must be deterministic and uniform
3. **Collisions are inevitable** - need resolution strategy
4. **Load factor impacts performance** - rehash when too high
5. **Space-time tradeoff** - O(n) space for O(1) time
6. **Not suitable for ordered operations** - use trees instead

---

## 🚀 Next Steps

Now that you understand hash table fundamentals, move on to:
- **[02. Hash Functions](./02-Hash-Functions.md)** - Learn to design good hash functions
- **[03. Collision Resolution](./03-Collision-Resolution.md)** - Master collision handling techniques

---

## 📚 Additional Resources

- [Visualgo - Hash Table](https://visualgo.net/en/hashtable) - Interactive visualization
- [MIT OCW - Hashing](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/lecture-videos/lecture-8-hashing-with-chaining/)
- [CLRS Chapter 11](https://mitpress.mit.edu/books/introduction-algorithms-third-edition) - Authoritative reference

---

[← Back to Chapter 5](./README.md) | [Next: Hash Functions →](./02-Hash-Functions.md)
