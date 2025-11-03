# Hash Set Implementation

## 🎯 Learning Objectives

By the end of this lesson, you will:
- Understand the difference between hash map and hash set
- Implement a complete hash set from scratch
- Perform set operations: union, intersection, difference
- Recognize when to use hash set vs hash map
- Write efficient deduplication code

---

## 📖 What is a Hash Set?

A **hash set** stores **unique elements** without associated values. It's essentially a hash map that only stores keys.

```python
# Python set is a hash set
fruits = {"apple", "banana", "cherry"}
print("apple" in fruits)  # O(1) lookup
```

**Hash Map vs Hash Set:**

| Feature | Hash Map | Hash Set |
|---------|----------|----------|
| Stores | Key-value pairs | Keys only |
| Lookup | `map.get(key) → value` | `set.contains(key) → bool` |
| Primary Use | Mapping relationships | Uniqueness, membership |
| Example | `{"apple": 5, "banana": 10}` | `{"apple", "banana"}` |

---

## 🏗️ Complete Hash Set Implementation

### Python Implementation

```python
class HashSet:
    """
    A hash set implementation using chaining for collision resolution.
    Stores unique elements with O(1) average-case operations.
    """
    
    class _Node:
        """Internal node class for chaining."""
        def __init__(self, key):
            self.key = key
            self.next = None
    
    def __init__(self, initial_capacity=16, load_factor=0.75):
        """
        Initialize hash set.
        
        Args:
            initial_capacity: Initial number of buckets
            load_factor: Threshold for rehashing (0-1)
        """
        self.capacity = initial_capacity
        self.load_factor = load_factor
        self.size = 0
        self.buckets = [None] * self.capacity
    
    def _hash(self, key):
        """Compute bucket index for key."""
        return hash(key) % self.capacity
    
    def _needs_resize(self):
        """Check if rehashing is needed."""
        return self.size / self.capacity >= self.load_factor
    
    def _resize(self):
        """Double the capacity and rehash all elements."""
        old_buckets = self.buckets
        self.capacity *= 2
        self.buckets = [None] * self.capacity
        self.size = 0
        
        # Reinsert all elements
        for bucket in old_buckets:
            current = bucket
            while current:
                self.add(current.key)
                current = current.next
    
    def add(self, key):
        """
        Add element to set.
        
        Time: O(1) average
        Space: O(1)
        
        Args:
            key: Element to add
        
        Returns:
            True if added, False if already exists
        """
        if self._needs_resize():
            self._resize()
        
        index = self._hash(key)
        
        # Check if key exists
        current = self.buckets[index]
        while current:
            if current.key == key:
                return False  # Already exists
            current = current.next
        
        # Key doesn't exist, insert at head
        new_node = self._Node(key)
        new_node.next = self.buckets[index]
        self.buckets[index] = new_node
        self.size += 1
        return True
    
    def contains(self, key):
        """
        Check if element exists.
        
        Time: O(1) average
        Space: O(1)
        
        Args:
            key: Element to check
        
        Returns:
            True if exists, False otherwise
        """
        index = self._hash(key)
        current = self.buckets[index]
        
        while current:
            if current.key == key:
                return True
            current = current.next
        
        return False
    
    def remove(self, key):
        """
        Remove element from set.
        
        Time: O(1) average
        Space: O(1)
        
        Args:
            key: Element to remove
        
        Returns:
            True if removed, False if not found
        """
        index = self._hash(key)
        current = self.buckets[index]
        prev = None
        
        while current:
            if current.key == key:
                if prev:
                    prev.next = current.next
                else:
                    self.buckets[index] = current.next
                self.size -= 1
                return True
            prev = current
            current = current.next
        
        return False
    
    def to_list(self):
        """Return list of all elements."""
        result = []
        for bucket in self.buckets:
            current = bucket
            while current:
                result.append(current.key)
                current = current.next
        return result
    
    def clear(self):
        """Remove all elements."""
        self.buckets = [None] * self.capacity
        self.size = 0
    
    def union(self, other):
        """
        Return union of this set and other set.
        
        Time: O(n + m)
        Space: O(n + m)
        """
        result = HashSet()
        for key in self.to_list():
            result.add(key)
        for key in other.to_list():
            result.add(key)
        return result
    
    def intersection(self, other):
        """
        Return intersection of this set and other set.
        
        Time: O(min(n, m))
        Space: O(min(n, m))
        """
        result = HashSet()
        # Iterate over smaller set
        if self.size <= other.size:
            for key in self.to_list():
                if other.contains(key):
                    result.add(key)
        else:
            for key in other.to_list():
                if self.contains(key):
                    result.add(key)
        return result
    
    def difference(self, other):
        """
        Return elements in this set but not in other set.
        
        Time: O(n)
        Space: O(n)
        """
        result = HashSet()
        for key in self.to_list():
            if not other.contains(key):
                result.add(key)
        return result
    
    def is_subset(self, other):
        """Check if this set is subset of other set."""
        if self.size > other.size:
            return False
        for key in self.to_list():
            if not other.contains(key):
                return False
        return True
    
    def __len__(self):
        """Return number of elements."""
        return self.size
    
    def __contains__(self, key):
        """Support 'in' operator."""
        return self.contains(key)
    
    def __iter__(self):
        """Make set iterable."""
        for bucket in self.buckets:
            current = bucket
            while current:
                yield current.key
                current = current.next
    
    def __str__(self):
        """String representation."""
        return "{" + ", ".join(str(k) for k in self) + "}"
    
    def __repr__(self):
        return f"HashSet(size={self.size}, capacity={self.capacity})"


# Usage Examples
if __name__ == "__main__":
    # Create hash set
    hs = HashSet()
    
    # Add elements
    hs.add("apple")
    hs.add("banana")
    hs.add("cherry")
    hs.add("apple")  # Duplicate, ignored
    
    # Check existence
    print("apple" in hs)  # True
    print("grape" in hs)  # False
    
    # Remove
    hs.remove("banana")
    
    # Size
    print("Size:", len(hs))  # 2
    
    # Iterate
    for item in hs:
        print(item)
    
    # Set operations
    set1 = HashSet()
    set1.add(1)
    set1.add(2)
    set1.add(3)
    
    set2 = HashSet()
    set2.add(2)
    set2.add(3)
    set2.add(4)
    
    # Union: {1, 2, 3, 4}
    union_set = set1.union(set2)
    print("Union:", union_set)
    
    # Intersection: {2, 3}
    inter_set = set1.intersection(set2)
    print("Intersection:", inter_set)
    
    # Difference: {1}
    diff_set = set1.difference(set2)
    print("Difference:", diff_set)
    
    # Subset
    subset = HashSet()
    subset.add(2)
    subset.add(3)
    print("Is subset:", subset.is_subset(set1))  # True
    
    # String representation
    print(hs)
    print(repr(hs))
```

---

## 🎨 C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <functional>

template<typename T>
class HashSet {
private:
    struct Node {
        T key;
        Node* next;
        
        Node(const T& k) : key(k), next(nullptr) {}
    };
    
    std::vector<Node*> buckets;
    int capacity;
    int size;
    float loadFactor;
    
    int hash(const T& key) const {
        return std::hash<T>{}(key) % capacity;
    }
    
    bool needsResize() const {
        return static_cast<float>(size) / capacity >= loadFactor;
    }
    
    void resize() {
        std::vector<Node*> oldBuckets = buckets;
        capacity *= 2;
        buckets = std::vector<Node*>(capacity, nullptr);
        size = 0;
        
        for (Node* bucket : oldBuckets) {
            Node* current = bucket;
            while (current) {
                add(current->key);
                Node* temp = current;
                current = current->next;
                delete temp;
            }
        }
    }

public:
    HashSet(int initialCapacity = 16, float lf = 0.75f)
        : capacity(initialCapacity), size(0), loadFactor(lf) {
        buckets.resize(capacity, nullptr);
    }
    
    ~HashSet() {
        clear();
    }
    
    bool add(const T& key) {
        if (needsResize()) {
            resize();
        }
        
        int index = hash(key);
        Node* current = buckets[index];
        
        // Check if exists
        while (current) {
            if (current->key == key) {
                return false;
            }
            current = current->next;
        }
        
        // Insert new
        Node* newNode = new Node(key);
        newNode->next = buckets[index];
        buckets[index] = newNode;
        size++;
        return true;
    }
    
    bool contains(const T& key) const {
        int index = hash(key);
        Node* current = buckets[index];
        
        while (current) {
            if (current->key == key) {
                return true;
            }
            current = current->next;
        }
        
        return false;
    }
    
    bool remove(const T& key) {
        int index = hash(key);
        Node* current = buckets[index];
        Node* prev = nullptr;
        
        while (current) {
            if (current->key == key) {
                if (prev) {
                    prev->next = current->next;
                } else {
                    buckets[index] = current->next;
                }
                delete current;
                size--;
                return true;
            }
            prev = current;
            current = current->next;
        }
        
        return false;
    }
    
    int getSize() const {
        return size;
    }
    
    void clear() {
        for (Node* bucket : buckets) {
            Node* current = bucket;
            while (current) {
                Node* temp = current;
                current = current->next;
                delete temp;
            }
        }
        buckets = std::vector<Node*>(capacity, nullptr);
        size = 0;
    }
    
    void print() const {
        std::cout << "{";
        bool first = true;
        for (const Node* bucket : buckets) {
            const Node* current = bucket;
            while (current) {
                if (!first) std::cout << ", ";
                std::cout << current->key;
                first = false;
                current = current->next;
            }
        }
        std::cout << "}" << std::endl;
    }
};

// Usage
int main() {
    HashSet<int> hs;
    
    hs.add(1);
    hs.add(2);
    hs.add(3);
    hs.add(2);  // Duplicate
    
    std::cout << hs.contains(2) << std::endl;  // 1 (true)
    std::cout << hs.contains(5) << std::endl;  // 0 (false)
    
    hs.remove(2);
    std::cout << hs.getSize() << std::endl;  // 2
    
    hs.print();  // {1, 3}
    
    return 0;
}
```

---

## 🎯 Use Cases for Hash Set

### 1. **Deduplication**

```python
def remove_duplicates(arr):
    """Remove duplicates from array."""
    seen = HashSet()
    result = []
    for num in arr:
        if not seen.contains(num):
            seen.add(num)
            result.append(num)
    return result

# O(n) time, O(n) space
```

### 2. **Membership Testing**

```python
def has_common_element(list1, list2):
    """Check if two lists have common element."""
    set1 = HashSet()
    for item in list1:
        set1.add(item)
    
    for item in list2:
        if set1.contains(item):
            return True
    return False

# O(n + m) time
```

### 3. **Finding Unique Elements**

```python
def count_unique(arr):
    """Count unique elements."""
    unique_set = HashSet()
    for num in arr:
        unique_set.add(num)
    return len(unique_set)

# O(n) time, O(n) space
```

### 4. **Checking Subsets**

```python
def is_subset(arr1, arr2):
    """Check if arr1 is subset of arr2."""
    set2 = HashSet()
    for item in arr2:
        set2.add(item)
    
    for item in arr1:
        if not set2.contains(item):
            return False
    return True

# O(n + m) time
```

---

## 📊 Performance Comparison

### Hash Set vs Array

| Operation | Array | Hash Set |
|-----------|-------|----------|
| Insert | O(1) | O(1) |
| Search | O(n) | **O(1)** |
| Delete | O(n) | **O(1)** |
| Duplicates | Allowed | **Not allowed** |
| Memory | O(n) | O(n) + overhead |

### Hash Set vs Hash Map

| Feature | Hash Set | Hash Map |
|---------|----------|----------|
| Storage | Keys only | Key-value pairs |
| Space | Less | More |
| Use case | Uniqueness | Mapping |
| Example | `{1, 2, 3}` | `{1: "a", 2: "b"}` |

---

## 🎓 Key Takeaways

1. **Hash set stores unique elements** - no duplicates
2. **O(1) average-case operations** - add, contains, remove
3. **Internally similar to hash map** - but simpler (no values)
4. **Perfect for deduplication** - remove duplicates in O(n)
5. **Set operations are efficient** - union, intersection, difference
6. **Use when you need uniqueness** - not when you need mapping

---

## 🚀 Next Steps

- **[06. Common Hashing Patterns](./06-Common-Hashing-Patterns.md)** - Apply hash maps and sets to problems

---

[← Previous: Hash Map Implementation](./04-Hash-Map-Implementation.md) | [Back to Chapter 5](./README.md) | [Next: Common Hashing Patterns →](./06-Common-Hashing-Patterns.md)
