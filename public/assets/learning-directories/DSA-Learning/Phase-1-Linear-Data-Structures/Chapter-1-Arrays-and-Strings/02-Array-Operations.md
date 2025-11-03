# 02 - Array Operations

## 🎯 Overview

This section covers the fundamental operations you can perform on arrays: insertion, deletion, searching, and sorting. Understanding these operations and their complexities is crucial for problem-solving.

---

## 📝 Table of Contents

1. [Insertion](#insertion)
2. [Deletion](#deletion)
3. [Searching](#searching)
4. [Sorting Basics](#sorting-basics)
5. [Array Reversal](#array-reversal)
6. [Common Utility Operations](#common-utility-operations)

---

## 1. Insertion

### 1.1 Insert at End

**Time Complexity:** O(1) if space available, O(n) if resizing needed

```python
# Python
def insert_at_end(arr, element):
    arr.append(element)  # O(1) amortized
    return arr

# Example
arr = [10, 20, 30]
insert_at_end(arr, 40)
print(arr)  # [10, 20, 30, 40]
```

```cpp
// C++
void insertAtEnd(vector<int>& arr, int element) {
    arr.push_back(element);  // O(1) amortized
}

// Example
vector<int> arr = {10, 20, 30};
insertAtEnd(arr, 40);
// arr = {10, 20, 30, 40}
```

```java
// Java
public static void insertAtEnd(ArrayList<Integer> arr, int element) {
    arr.add(element);  // O(1) amortized
}

// Example
ArrayList<Integer> arr = new ArrayList<>(Arrays.asList(10, 20, 30));
insertAtEnd(arr, 40);
// arr = [10, 20, 30, 40]
```

---

### 1.2 Insert at Beginning

**Time Complexity:** O(n) - Must shift all elements

```python
# Python
def insert_at_beginning(arr, element):
    arr.insert(0, element)  # O(n)
    return arr

# Manual implementation
def insert_at_beginning_manual(arr, element):
    arr.append(None)  # Make space
    for i in range(len(arr)-1, 0, -1):
        arr[i] = arr[i-1]
    arr[0] = element
    return arr

# Example
arr = [10, 20, 30]
insert_at_beginning(arr, 5)
print(arr)  # [5, 10, 20, 30]
```

```cpp
// C++
void insertAtBeginning(vector<int>& arr, int element) {
    arr.insert(arr.begin(), element);  // O(n)
}

// Manual implementation
void insertAtBeginningManual(vector<int>& arr, int element) {
    arr.push_back(0);  // Add space
    for (int i = arr.size()-1; i > 0; i--) {
        arr[i] = arr[i-1];
    }
    arr[0] = element;
}
```

**Visual Representation:**
```
Before: [10, 20, 30, _, _]
Insert 5 at beginning:

Step 1: Shift elements right
[10, 20, 30, 30, _]
[10, 20, 20, 30, _]
[10, 10, 20, 30, _]

Step 2: Insert element
[5, 10, 20, 30, _]
```

---

### 1.3 Insert at Specific Position

**Time Complexity:** O(n) - Must shift elements from position i

```python
# Python
def insert_at_position(arr, index, element):
    if index < 0 or index > len(arr):
        return "Invalid index"
    arr.insert(index, element)  # O(n)
    return arr

# Manual implementation
def insert_at_position_manual(arr, index, element):
    if index < 0 or index > len(arr):
        return "Invalid index"
    
    arr.append(None)  # Make space
    # Shift elements from index to end
    for i in range(len(arr)-1, index, -1):
        arr[i] = arr[i-1]
    arr[index] = element
    return arr

# Example
arr = [10, 20, 30, 40]
insert_at_position(arr, 2, 25)
print(arr)  # [10, 20, 25, 30, 40]
```

```cpp
// C++
void insertAtPosition(vector<int>& arr, int index, int element) {
    if (index < 0 || index > arr.size()) {
        cout << "Invalid index" << endl;
        return;
    }
    arr.insert(arr.begin() + index, element);  // O(n)
}
```

---

## 2. Deletion

### 2.1 Delete from End

**Time Complexity:** O(1)

```python
# Python
def delete_from_end(arr):
    if len(arr) == 0:
        return "Array is empty"
    arr.pop()  # O(1)
    return arr

# Example
arr = [10, 20, 30, 40]
delete_from_end(arr)
print(arr)  # [10, 20, 30]
```

```cpp
// C++
void deleteFromEnd(vector<int>& arr) {
    if (arr.empty()) {
        cout << "Array is empty" << endl;
        return;
    }
    arr.pop_back();  // O(1)
}
```

---

### 2.2 Delete from Beginning

**Time Complexity:** O(n) - Must shift all elements

```python
# Python
def delete_from_beginning(arr):
    if len(arr) == 0:
        return "Array is empty"
    arr.pop(0)  # O(n)
    return arr

# Manual implementation
def delete_from_beginning_manual(arr):
    if len(arr) == 0:
        return "Array is empty"
    
    # Shift all elements left
    for i in range(len(arr)-1):
        arr[i] = arr[i+1]
    arr.pop()  # Remove last element
    return arr

# Example
arr = [10, 20, 30, 40]
delete_from_beginning(arr)
print(arr)  # [20, 30, 40]
```

```cpp
// C++
void deleteFromBeginning(vector<int>& arr) {
    if (arr.empty()) {
        cout << "Array is empty" << endl;
        return;
    }
    arr.erase(arr.begin());  // O(n)
}
```

---

### 2.3 Delete from Specific Position

**Time Complexity:** O(n)

```python
# Python
def delete_at_position(arr, index):
    if index < 0 or index >= len(arr):
        return "Invalid index"
    arr.pop(index)  # O(n)
    return arr

# Manual implementation
def delete_at_position_manual(arr, index):
    if index < 0 or index >= len(arr):
        return "Invalid index"
    
    # Shift elements from index+1 to end
    for i in range(index, len(arr)-1):
        arr[i] = arr[i+1]
    arr.pop()  # Remove last element
    return arr

# Example
arr = [10, 20, 30, 40, 50]
delete_at_position(arr, 2)
print(arr)  # [10, 20, 40, 50]
```

---

### 2.4 Delete by Value

**Time Complexity:** O(n) - Search + Delete

```python
# Python
def delete_by_value(arr, value):
    if value in arr:
        arr.remove(value)  # O(n) - finds first occurrence
        return arr
    return "Value not found"

# Delete all occurrences
def delete_all_occurrences(arr, value):
    arr[:] = [x for x in arr if x != value]  # O(n)
    return arr

# Example
arr = [10, 20, 30, 20, 40]
delete_by_value(arr, 20)
print(arr)  # [10, 30, 20, 40] - only first occurrence

arr = [10, 20, 30, 20, 40]
delete_all_occurrences(arr, 20)
print(arr)  # [10, 30, 40] - all occurrences
```

```cpp
// C++
void deleteByValue(vector<int>& arr, int value) {
    auto it = find(arr.begin(), arr.end(), value);
    if (it != arr.end()) {
        arr.erase(it);  // O(n)
    }
}

// Delete all occurrences
void deleteAllOccurrences(vector<int>& arr, int value) {
    arr.erase(remove(arr.begin(), arr.end(), value), arr.end());
}
```

---

## 3. Searching

### 3.1 Linear Search

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

```python
# Python
def linear_search(arr, target):
    """
    Search for target in array
    Returns: index if found, -1 otherwise
    """
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Example
arr = [10, 20, 30, 40, 50]
index = linear_search(arr, 30)
print(f"Found at index: {index}")  # Found at index: 2
```

```cpp
// C++
int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}
```

**When to Use:**
- ✅ Small arrays
- ✅ Unsorted arrays
- ✅ Single search operation

---

### 3.2 Binary Search

**Time Complexity:** O(log n)  
**Space Complexity:** O(1) iterative, O(log n) recursive  
**Prerequisite:** Array must be **sorted**

```python
# Python - Iterative
def binary_search(arr, target):
    """
    Binary search in sorted array
    Returns: index if found, -1 otherwise
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2  # Avoid overflow
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half
    
    return -1

# Example
arr = [10, 20, 30, 40, 50, 60, 70, 80]
index = binary_search(arr, 50)
print(f"Found at index: {index}")  # Found at index: 4
```

```python
# Python - Recursive
def binary_search_recursive(arr, target, left, right):
    if left > right:
        return -1
    
    mid = left + (right - left) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

# Example
arr = [10, 20, 30, 40, 50, 60, 70, 80]
index = binary_search_recursive(arr, 50, 0, len(arr)-1)
print(f"Found at index: {index}")
```

```cpp
// C++ - Iterative
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}
```

**Visual Representation:**
```
Array: [10, 20, 30, 40, 50, 60, 70, 80]
Target: 50

Iteration 1:
left=0, right=7, mid=3
arr[3]=40 < 50, search right half

Iteration 2:
left=4, right=7, mid=5
arr[5]=60 > 50, search left half

Iteration 3:
left=4, right=4, mid=4
arr[4]=50 == 50, found! ✓
```

**When to Use:**
- ✅ Large sorted arrays
- ✅ Multiple search operations
- ✅ Need fast lookups

---

## 4. Sorting Basics

### 4.1 Bubble Sort

**Time Complexity:** O(n²)  
**Space Complexity:** O(1)

```python
# Python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        # Flag to optimize
        swapped = False
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped:
            break  # Array is sorted
    return arr

# Example
arr = [64, 34, 25, 12, 22, 11, 90]
bubble_sort(arr)
print(arr)  # [11, 12, 22, 25, 34, 64, 90]
```

---

### 4.2 Selection Sort

**Time Complexity:** O(n²)  
**Space Complexity:** O(1)

```python
# Python
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# Example
arr = [64, 25, 12, 22, 11]
selection_sort(arr)
print(arr)  # [11, 12, 22, 25, 64]
```

---

### 4.3 Insertion Sort

**Time Complexity:** O(n²) worst, O(n) best  
**Space Complexity:** O(1)

```python
# Python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = key
    return arr

# Example
arr = [12, 11, 13, 5, 6]
insertion_sort(arr)
print(arr)  # [5, 6, 11, 12, 13]
```

---

### 4.4 Using Built-in Sort

```python
# Python
arr = [64, 34, 25, 12, 22]
arr.sort()  # In-place, O(n log n)
# or
sorted_arr = sorted(arr)  # Returns new array

# Custom sorting
arr.sort(reverse=True)  # Descending
arr.sort(key=lambda x: abs(x))  # Custom key
```

```cpp
// C++
#include <algorithm>
vector<int> arr = {64, 34, 25, 12, 22};
sort(arr.begin(), arr.end());  // O(n log n)

// Descending
sort(arr.begin(), arr.end(), greater<int>());

// Custom comparator
sort(arr.begin(), arr.end(), [](int a, int b) {
    return abs(a) < abs(b);
});
```

```java
// Java
Integer[] arr = {64, 34, 25, 12, 22};
Arrays.sort(arr);  // O(n log n)

// ArrayList
ArrayList<Integer> list = new ArrayList<>();
Collections.sort(list);
```

---

## 5. Array Reversal

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

```python
# Python - Method 1: Using slicing
arr = [1, 2, 3, 4, 5]
reversed_arr = arr[::-1]

# Method 2: In-place using two pointers
def reverse_array(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr

# Method 3: Using built-in
arr.reverse()  # In-place

# Example
arr = [1, 2, 3, 4, 5]
reverse_array(arr)
print(arr)  # [5, 4, 3, 2, 1]
```

```cpp
// C++
vector<int> arr = {1, 2, 3, 4, 5};

// Method 1: STL reverse
reverse(arr.begin(), arr.end());

// Method 2: Manual
void reverseArray(vector<int>& arr) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        swap(arr[left], arr[right]);
        left++;
        right--;
    }
}
```

---

## 6. Common Utility Operations

### 6.1 Find Maximum and Minimum

```python
# Python
def find_max_min(arr):
    if len(arr) == 0:
        return None, None
    
    max_val = min_val = arr[0]
    for num in arr:
        if num > max_val:
            max_val = num
        if num < min_val:
            min_val = num
    
    return max_val, min_val

# Using built-in
max_val = max(arr)
min_val = min(arr)

# Example
arr = [3, 7, 1, 9, 2, 5]
max_val, min_val = find_max_min(arr)
print(f"Max: {max_val}, Min: {min_val}")  # Max: 9, Min: 1
```

---

### 6.2 Sum and Average

```python
# Python
def sum_and_average(arr):
    if len(arr) == 0:
        return 0, 0
    
    total = sum(arr)
    avg = total / len(arr)
    return total, avg

# Example
arr = [10, 20, 30, 40, 50]
total, avg = sum_and_average(arr)
print(f"Sum: {total}, Average: {avg}")  # Sum: 150, Average: 30.0
```

---

### 6.3 Count Occurrences

```python
# Python
def count_occurrences(arr, value):
    return arr.count(value)  # O(n)

# Using dictionary for all elements
def frequency_count(arr):
    freq = {}
    for num in arr:
        freq[num] = freq.get(num, 0) + 1
    return freq

# Example
arr = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
print(count_occurrences(arr, 3))  # 3
print(frequency_count(arr))  # {1: 1, 2: 2, 3: 3, 4: 4}
```

---

## 📊 Complexity Summary

| Operation | Average | Worst | Space |
|-----------|---------|-------|-------|
| Insert at end | O(1) | O(n) | O(1) |
| Insert at beginning | O(n) | O(n) | O(1) |
| Insert at position | O(n) | O(n) | O(1) |
| Delete from end | O(1) | O(1) | O(1) |
| Delete from beginning | O(n) | O(n) | O(1) |
| Delete from position | O(n) | O(n) | O(1) |
| Linear Search | O(n) | O(n) | O(1) |
| Binary Search | O(log n) | O(log n) | O(1) |
| Bubble Sort | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n²) | O(n²) | O(1) |
| Built-in Sort | O(n log n) | O(n log n) | O(log n) |

---

## 🧪 Practice Problems

1. Implement insert operation for static array
2. Remove duplicates from sorted array
3. Find second largest element
4. Check if array is sorted
5. Merge two sorted arrays
6. Find first and last occurrence of element
7. Count inversions in array
8. Rearrange positive and negative numbers
9. Move all zeros to end
10. Find equilibrium index

---

## 💡 Key Takeaways

1. ✅ Insertion/deletion at end is **O(1)**, at beginning/middle is **O(n)**
2. ✅ Linear search is **O(n)**, binary search is **O(log n)** but requires sorted array
3. ✅ Built-in sorting is usually **O(n log n)** and optimized
4. ✅ Always consider **in-place** operations to save space
5. ✅ Check **edge cases**: empty array, single element, duplicates

---

[← Back to Array Basics](./01-Array-Basics.md) | [Back to Chapter](./README.md) | [Next: Multi-Dimensional Arrays →](./03-Multi-Dimensional-Arrays.md)
