# 04 - Dynamic Arrays

## 🎯 Overview

**Dynamic Arrays** (also called **resizable arrays**) are arrays that can grow or shrink in size automatically. Unlike static arrays with fixed size, dynamic arrays handle resizing internally, providing flexibility while maintaining O(1) access time.

**Common Implementations:**
- Python: `list`
- C++: `vector`
- Java: `ArrayList`
- JavaScript: `Array`

---

## 📖 Static vs Dynamic Arrays

| Feature | Static Array | Dynamic Array |
|---------|-------------|---------------|
| **Size** | Fixed at creation | Can grow/shrink |
| **Memory Allocation** | At compile time | At runtime |
| **Resizing** | Not possible | Automatic |
| **Access Time** | O(1) | O(1) |
| **Append** | Not possible when full | O(1) amortized |
| **Memory Usage** | Exact | Extra capacity buffer |

---

## 🧠 How Dynamic Arrays Work

### Internal Mechanism:

1. **Initial Capacity:** Start with some capacity (e.g., 10 elements)
2. **Usage:** Track number of elements actually stored
3. **When Full:** 
   - Allocate new array with **double capacity** (2x growth)
   - Copy all elements to new array
   - Delete old array
4. **When Empty:** Optionally shrink to save memory

### Visual Representation:

```
Initial state (capacity=4, size=0):
[_, _, _, _]

After adding 4 elements (capacity=4, size=4):
[1, 2, 3, 4]

Adding 5th element triggers resize:
Old: [1, 2, 3, 4] → capacity=4, size=4 (FULL!)
New: [1, 2, 3, 4, 5, _, _, _] → capacity=8, size=5
     ↑Copy all↑  ↑New element
```

---

## ⏱️ Amortized Analysis

### Why is append O(1) amortized?

Even though resizing is O(n), it happens so rarely that average cost per insertion is O(1).

**Example:** Insert n elements into dynamic array (starting capacity = 1)

```
Insertions and costs:
Insert 1: resize(1), copy 0, cost = 1
Insert 2: resize(2), copy 1, cost = 2
Insert 3: resize(4), copy 2, cost = 3
Insert 4: no resize, cost = 1
Insert 5: resize(8), copy 4, cost = 5
Insert 6,7,8: no resize, cost = 1 each
...
```

**Total cost for n insertions:**
- Resize costs: 1 + 2 + 4 + 8 + ... + n = 2n - 1
- Normal insertions: n
- **Total:** 3n - 1 = O(n)
- **Average per operation:** O(n) / n = **O(1)** ✓

---

## 📝 Implementation

### Python (lists are dynamic arrays):

```python
# Python list is a dynamic array
arr = []  # Empty, capacity starts small
print(arr.__sizeof__())  # Check memory size

# Adding elements
arr.append(1)  # O(1) amortized
arr.append(2)
arr.append(3)

# Access
print(arr[0])  # O(1)

# Remove from end
arr.pop()  # O(1)

# Insert/remove from middle
arr.insert(1, 10)  # O(n)
arr.pop(1)  # O(n)

# Check capacity (not directly available in Python)
# But you can see memory growth
import sys
print(sys.getsizeof(arr))
```

### C++ (vector):

```cpp
#include <vector>
#include <iostream>
using namespace std;

int main() {
    vector<int> vec;  // Empty
    
    cout << "Initial capacity: " << vec.capacity() << endl;  // 0
    cout << "Size: " << vec.size() << endl;  // 0
    
    // Add elements
    for (int i = 0; i < 10; i++) {
        vec.push_back(i);  // O(1) amortized
        cout << "Size: " << vec.size() 
             << ", Capacity: " << vec.capacity() << endl;
    }
    
    // Output shows capacity doubling:
    // Size: 1, Capacity: 1
    // Size: 2, Capacity: 2
    // Size: 3, Capacity: 4
    // Size: 4, Capacity: 4
    // Size: 5, Capacity: 8
    // ...
    
    // Access
    cout << vec[0] << endl;  // O(1)
    
    // Remove from end
    vec.pop_back();  // O(1)
    
    // Reserve capacity
    vec.reserve(100);  // Pre-allocate space
    
    // Shrink to fit
    vec.shrink_to_fit();  // Reduce capacity to size
    
    return 0;
}
```

### Java (ArrayList):

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();  // Default capacity: 10
        
        // Add elements
        list.add(1);  // O(1) amortized
        list.add(2);
        list.add(3);
        
        System.out.println("Size: " + list.size());  // 3
        
        // Access
        System.out.println(list.get(0));  // O(1)
        
        // Remove from end
        list.remove(list.size() - 1);  // O(1)
        
        // Insert/remove from middle
        list.add(1, 10);  // O(n)
        list.remove(1);  // O(n)
        
        // Trim capacity
        list.trimToSize();
    }
}
```

---

## 🔧 Common Operations

| Operation | Time Complexity | Explanation |
|-----------|----------------|-------------|
| **append/push_back** | O(1) amortized | Add to end, resize if needed |
| **pop from end** | O(1) | Remove last element |
| **access by index** | O(1) | Direct memory access |
| **insert at position i** | O(n) | Shift elements |
| **remove at position i** | O(n) | Shift elements |
| **search** | O(n) | Linear scan |
| **resize (internal)** | O(n) | Copy all elements |

---

## 💡 Growth Strategies

### 1. Doubling (Most Common)

```
Capacities: 1 → 2 → 4 → 8 → 16 → 32 → ...
Growth factor: 2.0
```

**Pros:** Simple, good amortized performance  
**Cons:** Can waste up to 50% memory

### 2. Golden Ratio (1.5x)

```python
# Python uses ~1.125x growth
# C++ sometimes uses 1.5x
new_capacity = old_capacity + old_capacity // 2
```

**Pros:** Less memory waste  
**Cons:** More frequent resizing

### 3. Fixed Increment

```
Capacities: 10 → 20 → 30 → 40 → ...
```

**Pros:** Predictable memory  
**Cons:** Poor amortized performance (O(n²) for n inserts)

---

## 📊 Space Complexity

### Overhead:

```python
# Python list
empty_list = []
# Size: ~56-64 bytes (object overhead)

# After adding elements:
# Memory = overhead + (capacity × element_size)

# Utilization = size / capacity
# Can be as low as 50% after resize
```

### Trade-offs:

- **More aggressive growth (2x):** Faster but more wasted space
- **Conservative growth (1.5x):** Less waste but more resizing

---

## 🧪 Practice Problems

1. Implement a dynamic array from scratch
2. Calculate amortized cost of n insertions
3. Design a data structure that supports O(1) random access and O(1) amortized insert/delete at end
4. Implement a circular buffer using dynamic array
5. Create a dynamic array with O(1) worst-case append (hint: use multiple arrays)

---

## 💡 Key Takeaways

1. ✅ Dynamic arrays provide **flexible size** with **O(1) access**
2. ✅ Append is **O(1) amortized**, not worst-case
3. ✅ **Doubling strategy** gives good amortized performance
4. ✅ Trade-off between **speed** (growth factor) and **memory**
5. ✅ Used in **99% of cases** instead of static arrays
6. ✅ Understanding **amortized analysis** is crucial
7. ✅ Most languages provide optimized implementations

---

[← Back to Multi-Dimensional Arrays](./03-Multi-Dimensional-Arrays.md) | [Back to Chapter](./README.md) | [Next: Two-Pointer Technique →](./05-Two-Pointer-Technique.md)
