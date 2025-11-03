# 03 - Doubly Linked List

## 🎯 Overview

A **Doubly Linked List** is a linked list where each node contains:
1. **Data** - The actual value
2. **Next pointer** - Reference to the next node
3. **Previous pointer** - Reference to the previous node

This allows **bidirectional traversal** - you can move forward and backward through the list.

**Structure:** `null ← [Prev|Data|Next] ↔ [Prev|Data|Next] ↔ [Prev|Data|Next] → null`

---

## 📖 Node Structure

### Implementation:

```python
# Python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None  # Previous pointer

# Visual:
#     ┌──────┬──────┬──────┐
#     │ Prev │ Data │ Next │
#     └──────┴──────┴──────┘
```

```cpp
// C++
struct Node {
    int data;
    Node* next;
    Node* prev;  // Previous pointer
    
    Node(int val) : data(val), next(nullptr), prev(nullptr) {}
};
```

```java
// Java
class Node {
    int data;
    Node next;
    Node prev;  // Previous pointer
    
    Node(int data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}
```

---

## 🔄 Complete Implementation

```python
class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None  # Track tail for O(1) append
        self.size = 0
    
    def is_empty(self):
        return self.head is None
    
    def __len__(self):
        return self.size
    
    def __str__(self):
        if self.is_empty():
            return "[]"
        
        result = []
        current = self.head
        while current:
            result.append(str(current.data))
            current = current.next
        return " ↔ ".join(result)
    
    def display_reverse(self):
        """Display list from tail to head"""
        if self.is_empty():
            return "[]"
        
        result = []
        current = self.tail
        while current:
            result.append(str(current.data))
            current = current.prev
        return " ↔ ".join(result)
```

---

## 📥 Insertion Operations

### 1. Insert at Beginning

**Time:** O(1) | **Space:** O(1)

```python
def insert_at_beginning(self, data):
    """Insert node at the beginning"""
    new_node = Node(data)
    
    if self.is_empty():
        self.head = self.tail = new_node
    else:
        new_node.next = self.head
        self.head.prev = new_node
        self.head = new_node
    
    self.size += 1

# Visual:
# Before: Head → [null|2|●] ↔ [●|3|null] ← Tail
# 
# Insert 1:
# After:  Head → [null|1|●] ↔ [●|2|●] ↔ [●|3|null] ← Tail
```

---

### 2. Insert at End

**Time:** O(1) with tail pointer | **Space:** O(1)

```python
def insert_at_end(self, data):
    """Insert node at the end"""
    new_node = Node(data)
    
    if self.is_empty():
        self.head = self.tail = new_node
    else:
        new_node.prev = self.tail
        self.tail.next = new_node
        self.tail = new_node
    
    self.size += 1

# Visual:
# Before: Head → [null|1|●] ↔ [●|2|null] ← Tail
# 
# Insert 3:
# After:  Head → [null|1|●] ↔ [●|2|●] ↔ [●|3|null] ← Tail
```

---

### 3. Insert at Position

**Time:** O(n) | **Space:** O(1)

```python
def insert_at_position(self, data, position):
    """Insert node at specific position"""
    if position < 0 or position > self.size:
        raise IndexError("Invalid position")
    
    if position == 0:
        self.insert_at_beginning(data)
        return
    
    if position == self.size:
        self.insert_at_end(data)
        return
    
    new_node = Node(data)
    current = self.head
    
    # Traverse to position
    for _ in range(position):
        current = current.next
    
    # Insert before current
    new_node.next = current
    new_node.prev = current.prev
    current.prev.next = new_node
    current.prev = new_node
    
    self.size += 1

# Visual:
# Insert X at position 2:
# Before: [●|1|●] ↔ [●|2|●] ↔ [●|3|●]
#                      ↑
#                   position
# 
# After:  [●|1|●] ↔ [●|X|●] ↔ [●|2|●] ↔ [●|3|●]
```

---

## 🗑️ Deletion Operations

### 1. Delete from Beginning

**Time:** O(1) | **Space:** O(1)

```python
def delete_from_beginning(self):
    """Delete first node"""
    if self.is_empty():
        raise Exception("List is empty")
    
    deleted_data = self.head.data
    
    if self.head == self.tail:
        # Only one node
        self.head = self.tail = None
    else:
        self.head = self.head.next
        self.head.prev = None
    
    self.size -= 1
    return deleted_data
```

---

### 2. Delete from End

**Time:** O(1) with tail pointer | **Space:** O(1)

```python
def delete_from_end(self):
    """Delete last node"""
    if self.is_empty():
        raise Exception("List is empty")
    
    deleted_data = self.tail.data
    
    if self.head == self.tail:
        # Only one node
        self.head = self.tail = None
    else:
        self.tail = self.tail.prev
        self.tail.next = None
    
    self.size -= 1
    return deleted_data
```

---

### 3. Delete at Position

**Time:** O(n) | **Space:** O(1)

```python
def delete_at_position(self, position):
    """Delete node at specific position"""
    if position < 0 or position >= self.size:
        raise IndexError("Invalid position")
    
    if position == 0:
        return self.delete_from_beginning()
    
    if position == self.size - 1:
        return self.delete_from_end()
    
    current = self.head
    for _ in range(position):
        current = current.next
    
    # Remove current node
    current.prev.next = current.next
    current.next.prev = current.prev
    
    self.size -= 1
    return current.data
```

---

### 4. Delete by Value

**Time:** O(n) | **Space:** O(1)

```python
def delete_by_value(self, target):
    """Delete first occurrence of target value"""
    if self.is_empty():
        return False
    
    current = self.head
    
    while current:
        if current.data == target:
            # Found the node
            if current == self.head:
                self.delete_from_beginning()
            elif current == self.tail:
                self.delete_from_end()
            else:
                current.prev.next = current.next
                current.next.prev = current.prev
                self.size -= 1
            return True
        current = current.next
    
    return False  # Not found
```

---

## 🔄 Utility Operations

### 1. Reverse

**Time:** O(n) | **Space:** O(1)

```python
def reverse(self):
    """Reverse the doubly linked list"""
    if self.is_empty() or self.size == 1:
        return
    
    current = self.head
    
    while current:
        # Swap next and prev pointers
        current.prev, current.next = current.next, current.prev
        current = current.prev  # Move to next (which is now prev)
    
    # Swap head and tail
    self.head, self.tail = self.tail, self.head

# Example:
# Before: 1 ↔ 2 ↔ 3 ↔ 4
# After:  4 ↔ 3 ↔ 2 ↔ 1
```

---

### 2. Forward Traversal

```python
def traverse_forward(self):
    """Traverse from head to tail"""
    result = []
    current = self.head
    
    while current:
        result.append(current.data)
        current = current.next
    
    return result
```

---

### 3. Backward Traversal

```python
def traverse_backward(self):
    """Traverse from tail to head"""
    result = []
    current = self.tail
    
    while current:
        result.append(current.data)
        current = current.prev
    
    return result
```

---

### 4. Find Node

```python
def find(self, target):
    """Find node with target value"""
    current = self.head
    position = 0
    
    while current:
        if current.data == target:
            return position, current
        current = current.next
        position += 1
    
    return -1, None
```

---

## ⚖️ Doubly vs Singly Linked List

| Feature | Singly | Doubly |
|---------|--------|--------|
| **Pointers per node** | 1 (next) | 2 (next, prev) |
| **Memory overhead** | Lower | Higher |
| **Forward traversal** | O(n) | O(n) |
| **Backward traversal** | Not possible | O(n) |
| **Insert at end (with tail)** | O(1) | O(1) |
| **Delete at end (with tail)** | O(n) | O(1) ✓ |
| **Delete node (with reference)** | O(n) | O(1) ✓ |
| **Reverse operation** | O(n), O(1) space | O(n), O(1) space |
| **Use cases** | Simple lists | Undo/redo, browser history |

---

## ✅ Advantages

1. ✅ **Bidirectional traversal** - Move forward and backward
2. ✅ **O(1) deletion** at end with tail pointer
3. ✅ **O(1) deletion** of node when you have reference to it
4. ✅ **Easier implementation** of some algorithms (e.g., reverse)
5. ✅ **Better for operations** that require going backward

---

## ❌ Disadvantages

1. ❌ **Extra memory** for prev pointer
2. ❌ **More complex** pointer manipulation
3. ❌ **Slower** due to extra pointer updates
4. ❌ **Cache performance** slightly worse than singly

---

## 🎯 When to Use Doubly Linked List

**Use when:**
- ✅ Need backward traversal
- ✅ Implementing undo/redo functionality
- ✅ Browser history (forward/back buttons)
- ✅ LRU Cache implementation
- ✅ Frequently delete from end
- ✅ Need O(1) deletion with node reference

**Don't use when:**
- ❌ Memory is critical concern
- ❌ Only need forward traversal
- ❌ Simple list operations sufficient

---

## 🧪 Practice Problems

1. Implement doubly linked list from scratch
2. Reverse doubly linked list
3. Find pairs with given sum in sorted DLL
4. Remove duplicates from sorted DLL
5. Delete node at given position
6. Rotate DLL by N nodes
7. Convert binary tree to DLL
8. Clone a linked list with random pointers
9. Implement LRU Cache using DLL
10. Find triplet with given sum in DLL

---

## 💡 Key Takeaways

1. ✅ **Two pointers** per node: next and prev
2. ✅ **O(1) deletion** at both ends with head & tail
3. ✅ **Bidirectional** traversal capability
4. ✅ More **memory overhead** but more flexibility
5. ✅ **Easier deletion** when you have node reference
6. ✅ Perfect for **undo/redo** and **cache** implementations
7. ✅ Always update **both pointers** when modifying
8. ✅ Check for **null** on both prev and next

---

[← Back to Singly Linked List](./02-Singly-Linked-List.md) | [Back to Chapter](./README.md) | [Next: Circular Linked List →](./04-Circular-Linked-List.md)
