# Hash Map Implementation

## 🎯 Learning Objectives

By the end of this lesson, you will:
- Implement a complete hash map from scratch
- Understand resize and rehashing mechanisms
- Handle edge cases and optimize performance
- Compare your implementation with built-in hash maps
- Write production-quality hash map code

---

## 📖 What is a Hash Map?

A **hash map** (also called hash table, dictionary, or associative array) stores **key-value pairs** with O(1) average-case lookup.

```python
# Python dict is a hash map
ages = {"Alice": 25, "Bob": 30, "Charlie": 35}
print(ages["Alice"])  # O(1) lookup
```

---

## 🏗️ Complete Hash Map Implementation

### Design Decisions

1. **Collision Resolution:** Chaining (linked lists)
2. **Initial Capacity:** 16
3. **Load Factor Threshold:** 0.75
4. **Resize Strategy:** Double the size
5. **Hash Function:** Built-in `hash()` with modulo

---

### Python Implementation

```python
class HashMap:
    """
    A hash map implementation using chaining for collision resolution.
    Supports insert, search, delete with O(1) average time.
    """
    
    class _Node:
        """Internal node class for chaining."""
        def __init__(self, key, value):
            self.key = key
            self.value = value
            self.next = None
    
    def __init__(self, initial_capacity=16, load_factor=0.75):
        """
        Initialize hash map.
        
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
        """
        Double the capacity and rehash all elements.
        Time: O(n) but amortized O(1) per insert.
        """
        old_buckets = self.buckets
        self.capacity *= 2
        self.buckets = [None] * self.capacity
        self.size = 0
        
        # Reinsert all elements
        for bucket in old_buckets:
            current = bucket
            while current:
                self.put(current.key, current.value)
                current = current.next
    
    def put(self, key, value):
        """
        Insert or update key-value pair.
        
        Time: O(1) average
        Space: O(1)
        
        Args:
            key: Key to insert
            value: Value associated with key
        """
        if self._needs_resize():
            self._resize()
        
        index = self._hash(key)
        
        # Check if key exists
        current = self.buckets[index]
        while current:
            if current.key == key:
                current.value = value  # Update existing
                return
            current = current.next
        
        # Key doesn't exist, insert at head
        new_node = self._Node(key, value)
        new_node.next = self.buckets[index]
        self.buckets[index] = new_node
        self.size += 1
    
    def get(self, key):
        """
        Retrieve value for key.
        
        Time: O(1) average
        Space: O(1)
        
        Args:
            key: Key to search for
        
        Returns:
            Value if key exists, None otherwise
        """
        index = self._hash(key)
        current = self.buckets[index]
        
        while current:
            if current.key == key:
                return current.value
            current = current.next
        
        return None
    
    def remove(self, key):
        """
        Delete key-value pair.
        
        Time: O(1) average
        Space: O(1)
        
        Args:
            key: Key to delete
        
        Returns:
            True if deleted, False if key not found
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
    
    def contains_key(self, key):
        """Check if key exists."""
        return self.get(key) is not None
    
    def keys(self):
        """Return list of all keys."""
        result = []
        for bucket in self.buckets:
            current = bucket
            while current:
                result.append(current.key)
                current = current.next
        return result
    
    def values(self):
        """Return list of all values."""
        result = []
        for bucket in self.buckets:
            current = bucket
            while current:
                result.append(current.value)
                current = current.next
        return result
    
    def items(self):
        """Return list of (key, value) tuples."""
        result = []
        for bucket in self.buckets:
            current = bucket
            while current:
                result.append((current.key, current.value))
                current = current.next
        return result
    
    def clear(self):
        """Remove all elements."""
        self.buckets = [None] * self.capacity
        self.size = 0
    
    def __len__(self):
        """Return number of elements."""
        return self.size
    
    def __contains__(self, key):
        """Support 'in' operator."""
        return self.contains_key(key)
    
    def __getitem__(self, key):
        """Support dict[key] syntax."""
        value = self.get(key)
        if value is None:
            raise KeyError(key)
        return value
    
    def __setitem__(self, key, value):
        """Support dict[key] = value syntax."""
        self.put(key, value)
    
    def __delitem__(self, key):
        """Support del dict[key] syntax."""
        if not self.remove(key):
            raise KeyError(key)
    
    def __str__(self):
        """String representation."""
        items = [f"'{k}': {v}" for k, v in self.items()]
        return "{" + ", ".join(items) + "}"
    
    def __repr__(self):
        return f"HashMap(size={self.size}, capacity={self.capacity})"


# Usage Examples
if __name__ == "__main__":
    # Create hash map
    hm = HashMap()
    
    # Insert elements
    hm.put("apple", 5)
    hm.put("banana", 10)
    hm.put("cherry", 15)
    
    # Use dict-like syntax
    hm["date"] = 20
    hm["elderberry"] = 25
    
    # Search
    print(hm.get("apple"))  # 5
    print(hm["banana"])     # 10
    
    # Check existence
    print("cherry" in hm)   # True
    print("grape" in hm)    # False
    
    # Update
    hm["apple"] = 100
    print(hm["apple"])      # 100
    
    # Delete
    hm.remove("banana")
    del hm["cherry"]
    
    # Iterate
    print("Keys:", hm.keys())
    print("Values:", hm.values())
    print("Items:", hm.items())
    
    # Size
    print("Size:", len(hm))
    
    # String representation
    print(hm)
    print(repr(hm))
    
    # Clear
    hm.clear()
    print("After clear:", len(hm))
```

---

## 🎨 C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <functional>
#include <stdexcept>

template<typename K, typename V>
class HashMap {
private:
    struct Node {
        K key;
        V value;
        Node* next;
        
        Node(const K& k, const V& v) : key(k), value(v), next(nullptr) {}
    };
    
    std::vector<Node*> buckets;
    int capacity;
    int size;
    float loadFactor;
    
    int hash(const K& key) const {
        return std::hash<K>{}(key) % capacity;
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
                put(current->key, current->value);
                Node* temp = current;
                current = current->next;
                delete temp;
            }
        }
    }

public:
    HashMap(int initialCapacity = 16, float lf = 0.75f) 
        : capacity(initialCapacity), size(0), loadFactor(lf) {
        buckets.resize(capacity, nullptr);
    }
    
    ~HashMap() {
        clear();
    }
    
    void put(const K& key, const V& value) {
        if (needsResize()) {
            resize();
        }
        
        int index = hash(key);
        Node* current = buckets[index];
        
        // Update if key exists
        while (current) {
            if (current->key == key) {
                current->value = value;
                return;
            }
            current = current->next;
        }
        
        // Insert new node at head
        Node* newNode = new Node(key, value);
        newNode->next = buckets[index];
        buckets[index] = newNode;
        size++;
    }
    
    V get(const K& key) const {
        int index = hash(key);
        Node* current = buckets[index];
        
        while (current) {
            if (current->key == key) {
                return current->value;
            }
            current = current->next;
        }
        
        throw std::runtime_error("Key not found");
    }
    
    bool containsKey(const K& key) const {
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
    
    bool remove(const K& key) {
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
                std::cout << current->key << ": " << current->value;
                first = false;
                current = current->next;
            }
        }
        std::cout << "}" << std::endl;
    }
};

// Usage
int main() {
    HashMap<std::string, int> hm;
    
    hm.put("apple", 5);
    hm.put("banana", 10);
    hm.put("cherry", 15);
    
    std::cout << hm.get("apple") << std::endl;  // 5
    std::cout << hm.containsKey("banana") << std::endl;  // 1 (true)
    
    hm.remove("banana");
    std::cout << hm.getSize() << std::endl;  // 2
    
    hm.print();  // {apple: 5, cherry: 15}
    
    return 0;
}
```

---

## ☕ Java Implementation

```java
public class HashMap<K, V> {
    private class Node {
        K key;
        V value;
        Node next;
        
        Node(K key, V value) {
            this.key = key;
            this.value = value;
            this.next = null;
        }
    }
    
    private Node[] buckets;
    private int capacity;
    private int size;
    private float loadFactor;
    
    @SuppressWarnings("unchecked")
    public HashMap(int initialCapacity, float loadFactor) {
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0;
        this.buckets = (Node[]) new HashMap.Node[capacity];
    }
    
    public HashMap() {
        this(16, 0.75f);
    }
    
    private int hash(K key) {
        return Math.abs(key.hashCode()) % capacity;
    }
    
    private boolean needsResize() {
        return (float) size / capacity >= loadFactor;
    }
    
    @SuppressWarnings("unchecked")
    private void resize() {
        Node[] oldBuckets = buckets;
        capacity *= 2;
        buckets = (Node[]) new HashMap.Node[capacity];
        size = 0;
        
        for (Node bucket : oldBuckets) {
            Node current = bucket;
            while (current != null) {
                put(current.key, current.value);
                current = current.next;
            }
        }
    }
    
    public void put(K key, V value) {
        if (needsResize()) {
            resize();
        }
        
        int index = hash(key);
        Node current = buckets[index];
        
        // Update if exists
        while (current != null) {
            if (current.key.equals(key)) {
                current.value = value;
                return;
            }
            current = current.next;
        }
        
        // Insert at head
        Node newNode = new Node(key, value);
        newNode.next = buckets[index];
        buckets[index] = newNode;
        size++;
    }
    
    public V get(K key) {
        int index = hash(key);
        Node current = buckets[index];
        
        while (current != null) {
            if (current.key.equals(key)) {
                return current.value;
            }
            current = current.next;
        }
        
        return null;
    }
    
    public boolean containsKey(K key) {
        return get(key) != null;
    }
    
    public boolean remove(K key) {
        int index = hash(key);
        Node current = buckets[index];
        Node prev = null;
        
        while (current != null) {
            if (current.key.equals(key)) {
                if (prev != null) {
                    prev.next = current.next;
                } else {
                    buckets[index] = current.next;
                }
                size--;
                return true;
            }
            prev = current;
            current = current.next;
        }
        
        return false;
    }
    
    public int size() {
        return size;
    }
    
    public void clear() {
        buckets = (Node[]) new HashMap.Node[capacity];
        size = 0;
    }
    
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("{");
        boolean first = true;
        
        for (Node bucket : buckets) {
            Node current = bucket;
            while (current != null) {
                if (!first) sb.append(", ");
                sb.append(current.key).append(": ").append(current.value);
                first = false;
                current = current.next;
            }
        }
        
        sb.append("}");
        return sb.toString();
    }
}
```

---

## ⚡ Performance Analysis

### Time Complexity

| Operation | Average | Worst | Amortized |
|-----------|---------|-------|-----------|
| put       | O(1)    | O(n)  | O(1)      |
| get       | O(1)    | O(n)  | O(1)      |
| remove    | O(1)    | O(n)  | O(1)      |
| resize    | O(n)    | O(n)  | O(1)*     |

*Amortized because infrequent

### Space Complexity

- **O(n)** for n elements
- **Extra:** O(m) for m buckets (typically m ≈ n/0.75)

---

## 🎓 Key Takeaways

1. **Hash map provides O(1) average operations** - insert, search, delete
2. **Rehashing maintains performance** - keep load factor < 0.75
3. **Chaining handles collisions** - simple and effective
4. **Generic implementation is reusable** - works for any key-value types
5. **Built-in hash maps use similar techniques** - but more optimized

---

## 🚀 Next Steps

- **[05. Hash Set Implementation](./05-Hash-Set-Implementation.md)** - Build hash set from scratch
- **[06. Common Hashing Patterns](./06-Common-Hashing-Patterns.md)** - Apply hash maps to problems

---

[← Previous: Collision Resolution](./03-Collision-Resolution.md) | [Back to Chapter 5](./README.md) | [Next: Hash Set Implementation →](./05-Hash-Set-Implementation.md)
