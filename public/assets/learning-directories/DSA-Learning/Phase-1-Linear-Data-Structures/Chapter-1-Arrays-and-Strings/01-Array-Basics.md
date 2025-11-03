# 01 - Array Basics

## 🎯 Overview

Arrays are the most fundamental data structure in computer science. They store elements in **contiguous memory locations**, allowing constant-time access to any element using an index.

---

## 📖 What is an Array?

An **array** is a collection of elements:
- Stored in **contiguous memory locations**
- Elements are of the **same data type**
- Accessed using an **index** (position)
- Fixed size (in static arrays)

### Visual Representation:

```
Array: [10, 20, 30, 40, 50]
Index:   0   1   2   3   4

Memory Layout:
┌────┬────┬────┬────┬────┐
│ 10 │ 20 │ 30 │ 40 │ 50 │
└────┴────┴────┴────┴────┘
 1000 1004 1008 1012 1016  ← Memory Addresses (assuming 4 bytes per int)
```

---

## 🧠 Memory Layout

### How Arrays are Stored:

When you declare an array:
```c
int arr[5] = {10, 20, 30, 40, 50};
```

The computer:
1. Allocates a **contiguous block of memory**
2. Size = `number_of_elements × size_of_each_element`
3. Stores the **base address** (address of first element)

### Address Calculation:

```
Address of arr[i] = Base_Address + (i × Size_of_Element)

Example:
- Base address = 1000
- Element size = 4 bytes (for int)
- arr[3] = 1000 + (3 × 4) = 1012
```

### Why This Matters:
- ✅ **O(1) access time** - Direct calculation, no traversal needed
- ✅ **Cache-friendly** - Contiguous memory improves CPU cache performance
- ❌ **Fixed size** - Cannot easily grow or shrink
- ❌ **Expensive insertion/deletion** - May need to shift elements

---

## 🔢 Indexing

### Zero-Based Indexing:

Most programming languages use **zero-based indexing**:
```
Array: [10, 20, 30, 40, 50]
Index:  0   1   2   3   4
```

- **First element:** `arr[0]`
- **Last element:** `arr[n-1]` where `n` is the length
- **Invalid access:** `arr[n]` or `arr[-1]` (in most languages) causes error

### Why Zero-Based?

```
Address of arr[i] = Base_Address + (i × Size_of_Element)

With zero-based indexing:
- arr[0] = Base_Address + (0 × Size) = Base_Address ✅ Simple!

With one-based indexing:
- arr[1] = Base_Address + ((1-1) × Size) = Base_Address
- Need extra subtraction in every access ❌
```

---

## 📝 Declaration and Initialization

### Python:
```python
# List (dynamic array)
arr = [1, 2, 3, 4, 5]
arr = []  # Empty list
arr = [0] * 10  # Array of 10 zeros

# Access
print(arr[0])  # First element
print(arr[-1])  # Last element (Pythonic way)

# Length
length = len(arr)
```

### C++:
```cpp
// Static array
int arr[5] = {1, 2, 3, 4, 5};
int arr[10];  // Uninitialized array
int arr[10] = {0};  // All elements initialized to 0

// Access
cout << arr[0];  // First element

// Length
int length = sizeof(arr) / sizeof(arr[0]);

// Vector (dynamic array) - Recommended
#include <vector>
vector<int> vec = {1, 2, 3, 4, 5};
vector<int> vec(10, 0);  // 10 elements, all zeros
cout << vec.size();  // Length
```

### Java:
```java
// Static array
int[] arr = {1, 2, 3, 4, 5};
int[] arr = new int[10];  // All elements initialized to 0

// Access
System.out.println(arr[0]);

// Length
int length = arr.length;

// ArrayList (dynamic array) - Recommended
import java.util.ArrayList;
ArrayList<Integer> list = new ArrayList<>();
list.add(10);
list.add(20);
System.out.println(list.size());
```

### JavaScript:
```javascript
// Array (dynamic by default)
let arr = [1, 2, 3, 4, 5];
let arr = new Array(10).fill(0);  // Array of 10 zeros

// Access
console.log(arr[0]);

// Length
let length = arr.length;
```

---

## 🔄 Basic Traversal Patterns

### 1. Forward Traversal:
```python
# Python
arr = [10, 20, 30, 40, 50]

# Using index
for i in range(len(arr)):
    print(arr[i])

# Direct iteration (Pythonic)
for element in arr:
    print(element)

# With enumerate (index + element)
for i, element in enumerate(arr):
    print(f"arr[{i}] = {element}")
```

```cpp
// C++
vector<int> arr = {10, 20, 30, 40, 50};

// Classic loop
for (int i = 0; i < arr.size(); i++) {
    cout << arr[i] << " ";
}

// Range-based for loop (C++11)
for (int element : arr) {
    cout << element << " ";
}

// Iterator
for (auto it = arr.begin(); it != arr.end(); ++it) {
    cout << *it << " ";
}
```

### 2. Backward Traversal:
```python
# Python
arr = [10, 20, 30, 40, 50]

# Using negative indices
for i in range(len(arr)-1, -1, -1):
    print(arr[i])

# Using reversed()
for element in reversed(arr):
    print(element)
```

```cpp
// C++
vector<int> arr = {10, 20, 30, 40, 50};

for (int i = arr.size() - 1; i >= 0; i--) {
    cout << arr[i] << " ";
}

// Reverse iterator
for (auto it = arr.rbegin(); it != arr.rend(); ++it) {
    cout << *it << " ";
}
```

### 3. Traversing with Two Pointers:
```python
# Python - From both ends
arr = [10, 20, 30, 40, 50]
left = 0
right = len(arr) - 1

while left < right:
    print(f"arr[{left}] = {arr[left]}, arr[{right}] = {arr[right]}")
    left += 1
    right -= 1
```

---

## ⏱️ Time Complexity

| Operation | Time Complexity | Explanation |
|-----------|----------------|-------------|
| **Access** | O(1) | Direct address calculation |
| **Search (Unsorted)** | O(n) | Must check each element |
| **Search (Sorted)** | O(log n) | Binary search possible |
| **Insert at end** | O(1) | If space available |
| **Insert at beginning** | O(n) | Must shift all elements |
| **Insert at position i** | O(n) | Must shift elements from i |
| **Delete at end** | O(1) | Just reduce size |
| **Delete at beginning** | O(n) | Must shift all elements |
| **Delete at position i** | O(n) | Must shift elements after i |

---

## 💾 Space Complexity

- **Static Array:** O(n) where n is the size
- **No extra space needed** for most operations
- **In-place algorithms:** Modify array without extra space (O(1) extra)

---

## 🎨 Common Patterns

### 1. Initialize Array:
```python
# Python
zeros = [0] * 10
ones = [1] * 5
range_arr = list(range(1, 11))  # [1, 2, 3, ..., 10]
```

### 2. Copy Array:
```python
# Python - Shallow copy
arr = [1, 2, 3, 4, 5]
copy1 = arr[:]
copy2 = arr.copy()
copy3 = list(arr)

# Deep copy (for nested arrays)
import copy
deep_copy = copy.deepcopy(arr)
```

```cpp
// C++
vector<int> arr = {1, 2, 3, 4, 5};
vector<int> copy1 = arr;  // Copy constructor
vector<int> copy2(arr.begin(), arr.end());
```

### 3. Fill Array with Value:
```python
# Python
arr = [0] * 10  # [0, 0, 0, ..., 0]
```

```cpp
// C++
vector<int> arr(10, 0);  // 10 elements, all zeros
fill(arr.begin(), arr.end(), 5);  // Fill with 5
```

### 4. Resize Array (Dynamic Arrays):
```python
# Python - Lists automatically resize
arr = []
arr.append(10)  # O(1) amortized
```

```cpp
// C++
vector<int> arr;
arr.push_back(10);  // O(1) amortized
arr.resize(20);  // Resize to 20 elements
```

---

## 🐛 Common Pitfalls

### 1. Off-by-One Errors:
```python
arr = [1, 2, 3, 4, 5]
# ❌ WRONG
for i in range(len(arr)):
    print(arr[i+1])  # IndexError when i = 4

# ✅ CORRECT
for i in range(len(arr)-1):
    print(arr[i+1])
```

### 2. Index Out of Bounds:
```python
arr = [1, 2, 3]
# ❌ WRONG
print(arr[3])  # IndexError

# ✅ CORRECT
if len(arr) > 3:
    print(arr[3])
```

### 3. Modifying Array While Iterating:
```python
arr = [1, 2, 3, 4, 5]
# ❌ WRONG - Don't modify during iteration
for i in range(len(arr)):
    arr.append(i)  # Infinite loop risk

# ✅ CORRECT - Iterate over copy
for element in arr[:]:
    if element % 2 == 0:
        arr.remove(element)
```

### 4. Shallow vs Deep Copy:
```python
# ❌ WRONG - Reference, not copy
arr1 = [1, 2, 3]
arr2 = arr1
arr2[0] = 10
print(arr1)  # [10, 2, 3] - arr1 changed too!

# ✅ CORRECT - Make a copy
arr1 = [1, 2, 3]
arr2 = arr1[:]
arr2[0] = 10
print(arr1)  # [1, 2, 3] - arr1 unchanged
```

---

## 🧪 Practice Problems

### Beginner:
1. Traverse an array and print all elements
2. Find the sum of all elements in an array
3. Find the maximum and minimum elements
4. Count occurrences of a specific element
5. Reverse an array in-place

### Intermediate:
6. Check if an array is sorted
7. Remove duplicates from a sorted array
8. Find the second largest element
9. Rotate array by k positions
10. Find the missing number in an array of 1 to n

---

## 💡 Key Takeaways

1. ✅ Arrays provide **O(1) access** using indices
2. ✅ Elements are stored in **contiguous memory**
3. ✅ Zero-based indexing is standard in most languages
4. ✅ Fixed size in static arrays, dynamic in lists/vectors
5. ✅ Insertion/deletion can be **O(n)** due to shifting
6. ✅ Always check **array bounds** to avoid errors
7. ✅ Use appropriate data structure (static vs dynamic)
8. ✅ Understand memory layout for optimization

---

## 📚 Next Steps

Now that you understand array basics, move on to:
- **[02-Array-Operations.md](./02-Array-Operations.md)** - Learn insertion, deletion, searching, and sorting
- Practice the basic problems listed above
- Understand how to analyze time and space complexity

---

[← Back to Chapter](./README.md) | [Next: Array Operations →](./02-Array-Operations.md)
