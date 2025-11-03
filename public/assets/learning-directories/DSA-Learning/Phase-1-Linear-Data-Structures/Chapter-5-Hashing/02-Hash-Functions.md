# Hash Functions

## 🎯 Learning Objectives

By the end of this lesson, you will:
- Understand properties of good hash functions
- Learn common hash function techniques
- Implement hash functions in different languages
- Avoid common pitfalls in hash function design
- Choose appropriate hash functions for different scenarios

---

## 📖 What is a Hash Function?

A **hash function** is a mathematical function that converts a key (of arbitrary size) into an integer (hash code) within a fixed range.

```
h: Key → Integer

Example:
h("apple") = 3
h("banana") = 7
h("cherry") = 11
```

### The Formula

```
index = hash(key) % table_size
```

Where:
- `hash(key)` produces a large integer
- `% table_size` maps it to valid array index [0, table_size-1]

---

## 🎯 Properties of Good Hash Functions

### 1. **Deterministic**
Same key must always produce same hash value.

```python
# Good ✅
hash("apple") == hash("apple")  # Always true

# Bad ❌
hash("apple") = random_value()  # Different each time
```

### 2. **Uniform Distribution**
Keys should be distributed evenly across buckets.

```
Good Distribution:         Bad Distribution:
Index  Count              Index  Count
0      12                 0      1
1      15                 1      2
2      11                 2      98  ← Most keys here!
3      14                 3      0
4      13                 4      1
```

### 3. **Efficient to Compute**
Hash function should be fast - O(1) or O(k) where k is key size.

```python
# Good ✅ - O(1)
def hash_int(key):
    return key

# Bad ❌ - O(n²)
def hash_slow(key):
    result = 0
    for i in range(len(key)):
        for j in range(len(key)):
            result += ord(key[i]) * ord(key[j])
    return result
```

### 4. **Minimize Collisions**
Different keys should produce different hash values (as much as possible).

```python
# Good ✅
hash("apple") = 12345
hash("banana") = 67890

# Bad ❌
hash("apple") = 1
hash("banana") = 1  # Collision!
```

### 5. **Avalanche Effect** (for cryptographic hashing)
Small change in key should drastically change hash.

```
hash("apple")  = 12345678
hash("appl")   = 98765432  ← Very different
```

---

## 🔧 Common Hash Function Techniques

### 1. Division Method

**Formula:** `h(key) = key % m`

**Best for:**
- Integer keys
- Simple, fast computation

**Table size (m) should be:**
- Prime number (reduces collisions)
- Not power of 2 (causes patterns)

```python
def hash_division(key, table_size):
    return key % table_size

# Example:
hash_division(123, 10)  # → 3
hash_division(456, 10)  # → 6
```

**Pros:**
- ✅ Extremely fast
- ✅ Simple to implement

**Cons:**
- ❌ Poor distribution if table_size not prime
- ❌ Patterns in keys cause patterns in hashes

---

### 2. Multiplication Method

**Formula:** `h(key) = floor(m * (key * A mod 1))`

Where:
- `A` is a constant (0 < A < 1)
- Good choice: `A = (√5 - 1) / 2 ≈ 0.6180339887` (golden ratio)
- `m` is table size (can be power of 2)

```python
def hash_multiplication(key, table_size):
    A = 0.6180339887  # Golden ratio
    fractional_part = (key * A) % 1
    return int(table_size * fractional_part)

# Example:
hash_multiplication(123, 10)  # → 9
hash_multiplication(456, 10)  # → 7
```

**Pros:**
- ✅ Table size can be any value (not just prime)
- ✅ Good distribution

**Cons:**
- ❌ Slightly slower than division
- ❌ More complex to understand

---

### 3. String Hashing (Polynomial Rolling Hash)

**Formula:** `h(s) = (s[0] * p^(n-1) + s[1] * p^(n-2) + ... + s[n-1]) % m`

Where:
- `s[i]` is the ASCII/Unicode value of character i
- `p` is a prime number (typically 31 or 53)
- `m` is a large prime (e.g., 10^9 + 9)

```python
def hash_string(s, table_size):
    p = 31  # Prime multiplier
    m = 10**9 + 9  # Large prime modulo
    hash_value = 0
    p_pow = 1
    
    for char in s:
        hash_value = (hash_value + ord(char) * p_pow) % m
        p_pow = (p_pow * p) % m
    
    return hash_value % table_size

# Example:
hash_string("apple", 10)   # → 3
hash_string("banana", 10)  # → 7
```

**Pros:**
- ✅ Good distribution for strings
- ✅ Widely used in practice

**Cons:**
- ❌ O(n) time where n = string length
- ❌ Can overflow if not careful

---

### 4. Folding Method

Split key into parts, add them together.

```python
def hash_folding(key, table_size):
    # Example: key = 123456789
    # Split: 123, 456, 789
    # Sum: 123 + 456 + 789 = 1368
    str_key = str(key)
    chunk_size = 3
    total = 0
    
    for i in range(0, len(str_key), chunk_size):
        chunk = str_key[i:i+chunk_size]
        total += int(chunk)
    
    return total % table_size
```

---

### 5. Mid-Square Method

Square the key, take middle digits.

```python
def hash_mid_square(key, table_size):
    squared = key * key
    str_squared = str(squared)
    mid = len(str_squared) // 2
    # Take 2 middle digits
    middle_digits = int(str_squared[mid-1:mid+1])
    return middle_digits % table_size

# Example:
# key = 123
# squared = 15129
# middle = "51"
# hash = 51 % table_size
```

---

## 💻 Language-Specific Implementations

### Python

```python
# Built-in hash function
hash("apple")  # → Some integer (varies by run in Python 3.3+)

# Custom hash for integers
def hash_int(key, table_size):
    return key % table_size

# Custom hash for strings
def hash_string(s, table_size):
    hash_val = 0
    for i, char in enumerate(s):
        hash_val = (hash_val * 31 + ord(char)) % (10**9 + 9)
    return hash_val % table_size

# Using built-in hash with modulo
def my_hash(key, table_size):
    return hash(key) % table_size
```

### C++

```cpp
#include <string>
#include <functional>

// Built-in hash
std::hash<std::string> hash_fn;
size_t hash_val = hash_fn("apple");

// Custom hash for integers
int hash_int(int key, int table_size) {
    return key % table_size;
}

// Custom hash for strings
int hash_string(const std::string& s, int table_size) {
    long long hash_val = 0;
    long long p = 31;
    long long m = 1e9 + 9;
    long long p_pow = 1;
    
    for (char c : s) {
        hash_val = (hash_val + c * p_pow) % m;
        p_pow = (p_pow * p) % m;
    }
    
    return hash_val % table_size;
}

// Using STL hash
template<typename T>
int my_hash(const T& key, int table_size) {
    return std::hash<T>{}(key) % table_size;
}
```

### Java

```java
// Built-in hash
String s = "apple";
int hash = s.hashCode();

// Custom hash for integers
public int hashInt(int key, int tableSize) {
    return key % tableSize;
}

// Custom hash for strings
public int hashString(String s, int tableSize) {
    long hashVal = 0;
    long p = 31;
    long m = 1000000009;
    long pPow = 1;
    
    for (char c : s.toCharArray()) {
        hashVal = (hashVal + c * pPow) % m;
        pPow = (pPow * p) % m;
    }
    
    return (int)(hashVal % tableSize);
}

// Using built-in hashCode
public int myHash(Object key, int tableSize) {
    return Math.abs(key.hashCode()) % tableSize;
}
```

---

## ⚠️ Common Pitfalls

### 1. **Using Power of 2 as Table Size with Division Method**

```python
# Bad ❌
table_size = 16  # Power of 2
hash(key) % 16   # Only uses last 4 bits of hash

# Good ✅
table_size = 17  # Prime number
hash(key) % 17   # Better distribution
```

### 2. **Not Handling Negative Hash Values**

```python
# Bad ❌
hash_val = some_hash_function(key)  # Could be negative
index = hash_val % table_size       # Negative index!

# Good ✅
hash_val = some_hash_function(key)
index = abs(hash_val) % table_size  # Always positive
```

### 3. **Overflow in Hash Computation**

```python
# Bad ❌
hash_val = ord(s[0]) * 31**100  # Overflow!

# Good ✅
hash_val = 0
for char in s:
    hash_val = (hash_val * 31 + ord(char)) % MOD
```

### 4. **Using Non-Deterministic Functions**

```python
# Bad ❌
import random
def bad_hash(key):
    return random.randint(0, 100)  # Different every time!

# Good ✅
def good_hash(key):
    return key % 100  # Always same for same key
```

---

## 🎯 Choosing the Right Hash Function

| Key Type | Recommended Method | Example |
|----------|-------------------|---------|
| Small integers | Division (prime modulo) | `key % 101` |
| Large integers | Multiplication or Division | `floor(m * (key * A % 1))` |
| Strings | Polynomial rolling hash | `Σ(s[i] * p^i) % m` |
| Mixed types | Built-in language hash | `hash(key)` or `hashCode()` |
| Custom objects | Combine field hashes | `hash(f1) ^ hash(f2) ^ hash(f3)` |

---

## 🧪 Testing Hash Functions

### Metrics to Evaluate:

1. **Collision Rate:**
   ```python
   collisions = 0
   seen = set()
   for key in keys:
       h = hash_function(key)
       if h in seen:
           collisions += 1
       seen.add(h)
   collision_rate = collisions / len(keys)
   ```

2. **Distribution Uniformity:**
   ```python
   buckets = [0] * table_size
   for key in keys:
       index = hash_function(key) % table_size
       buckets[index] += 1
   
   # Check if buckets have similar counts
   avg = len(keys) / table_size
   variance = sum((count - avg)**2 for count in buckets) / table_size
   ```

3. **Speed:**
   ```python
   import time
   start = time.time()
   for key in keys:
       hash_function(key)
   elapsed = time.time() - start
   ```

---

## 💡 Advanced: Universal Hashing

**Idea:** Randomly select hash function from a family of functions.

```python
import random

class UniversalHash:
    def __init__(self, table_size):
        self.m = table_size
        self.p = 10**9 + 7  # Large prime > max key
        self.a = random.randint(1, self.p - 1)
        self.b = random.randint(0, self.p - 1)
    
    def hash(self, key):
        return ((self.a * key + self.b) % self.p) % self.m
```

**Guarantee:** Expected collisions are minimized regardless of input.

---

## 📝 Practice Exercises

### Exercise 1: Implement Division Hash
Implement a hash function using division method with prime table size.

### Exercise 2: String Hash with Different Bases
Compare polynomial rolling hash with p=31 vs p=53. Which distributes better?

### Exercise 3: Hash Custom Object
Design a hash function for a `Person` object with `name`, `age`, `id`.

```python
class Person:
    def __init__(self, name, age, id):
        self.name = name
        self.age = age
        self.id = id
    
    def __hash__(self):
        # Your implementation here
        pass
```

---

## 🎓 Key Takeaways

1. **Hash functions map keys to indices** - deterministically and efficiently
2. **Good hash functions distribute uniformly** - minimizing collisions
3. **Division method is simple** - but table size should be prime
4. **Multiplication method is flexible** - table size can be any value
5. **String hashing uses polynomial rolling** - with prime base
6. **Avoid common pitfalls** - negative values, overflow, non-determinism
7. **Test your hash functions** - measure collisions and distribution

---

## 🚀 Next Steps

Now that you understand hash functions, learn how to handle collisions:
- **[03. Collision Resolution](./03-Collision-Resolution.md)** - Master chaining and open addressing

---

[← Previous: Hash Table Fundamentals](./01-Hash-Table-Fundamentals.md) | [Back to Chapter 5](./README.md) | [Next: Collision Resolution →](./03-Collision-Resolution.md)
