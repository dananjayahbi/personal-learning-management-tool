# 02 - Singly Linked List

## 🎯 Overview

A **Singly Linked List** is the simplest form of linked list where each node contains data and a pointer to the next node. The list is traversed in one direction only: from head to tail.

**Structure:** `Head → [Data|Next] → [Data|Next] → [Data|Next] → null`

---

## 📝 Implementation

### Complete Singly Linked List Class

```python
# Python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.size = 0
    
    def is_empty(self):
        """Check if list is empty"""
        return self.head is None
    
    def __len__(self):
        """Return size of list"""
        return self.size
    
    def __str__(self):
        """String representation"""
        if self.is_empty():
            return "[]"
        
        result = []
        current = self.head
        while current:
            result.append(str(current.data))
            current = current.next
        return " → ".join(result) + " → null"
```

```cpp
// C++
class Node {
public:
    int data;
    Node* next;
    
    Node(int val) : data(val), next(nullptr) {}
};

class SinglyLinkedList {
private:
    Node* head;
    int size;
    
public:
    SinglyLinkedList() : head(nullptr), size(0) {}
    
    ~SinglyLinkedList() {
        // Destructor to free memory
        while (head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
    }
    
    bool isEmpty() {
        return head == nullptr;
    }
    
    int getSize() {
        return size;
    }
    
    void display() {
        Node* current = head;
        while (current != nullptr) {
            cout << current->data << " -> ";
            current = current->next;
        }
        cout << "null" << endl;
    }
};
```

---

## 📥 Insertion Operations

### 1. Insert at Beginning

**Time:** O(1) | **Space:** O(1)

```python
def insert_at_beginning(self, data):
    """Insert node at the beginning"""
    new_node = Node(data)
    new_node.next = self.head
    self.head = new_node
    self.size += 1

# Example usage:
ll = SinglyLinkedList()
ll.insert_at_beginning(3)
ll.insert_at_beginning(2)
ll.insert_at_beginning(1)
print(ll)  # 1 → 2 → 3 → null
```

**Visual:**
```
Before: Head → [2|●] → [3|null]
Insert 1:
Step 1: new_node.next = self.head
        [1|●] → [2|●] → [3|null]
         ↑
      new_node
Step 2: self.head = new_node
        Head
         ↓
        [1|●] → [2|●] → [3|null]
```

---

### 2. Insert at End

**Time:** O(n) | **Space:** O(1)

```python
def insert_at_end(self, data):
    """Insert node at the end"""
    new_node = Node(data)
    
    if self.is_empty():
        self.head = new_node
    else:
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
    
    self.size += 1
```

**Optimization with Tail Pointer:**

```python
class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None  # Track tail
        self.size = 0
    
    def insert_at_end(self, data):
        """Insert at end in O(1)"""
        new_node = Node(data)
        
        if self.is_empty():
            self.head = self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node
        
        self.size += 1
```

---

### 3. Insert at Position

**Time:** O(n) | **Space:** O(1)

```python
def insert_at_position(self, data, position):
    """Insert node at specific position (0-indexed)"""
    if position < 0 or position > self.size:
        raise IndexError("Invalid position")
    
    if position == 0:
        self.insert_at_beginning(data)
        return
    
    new_node = Node(data)
    current = self.head
    
    # Traverse to position - 1
    for _ in range(position - 1):
        current = current.next
    
    new_node.next = current.next
    current.next = new_node
    self.size += 1

# Example:
ll = SinglyLinkedList()
ll.insert_at_end(1)
ll.insert_at_end(2)
ll.insert_at_end(4)
ll.insert_at_position(3, 2)  # Insert 3 at index 2
print(ll)  # 1 → 2 → 3 → 4 → null
```

---

### 4. Insert After Value

**Time:** O(n) | **Space:** O(1)

```python
def insert_after_value(self, target, data):
    """Insert node after first occurrence of target"""
    current = self.head
    
    while current:
        if current.data == target:
            new_node = Node(data)
            new_node.next = current.next
            current.next = new_node
            self.size += 1
            return True
        current = current.next
    
    return False  # Target not found
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
    self.head = self.head.next
    self.size -= 1
    return deleted_data

# Example:
ll = SinglyLinkedList()
ll.insert_at_end(1)
ll.insert_at_end(2)
ll.insert_at_end(3)
print(ll)  # 1 → 2 → 3 → null
ll.delete_from_beginning()
print(ll)  # 2 → 3 → null
```

---

### 2. Delete from End

**Time:** O(n) | **Space:** O(1)

```python
def delete_from_end(self):
    """Delete last node"""
    if self.is_empty():
        raise Exception("List is empty")
    
    if self.head.next is None:
        # Only one node
        deleted_data = self.head.data
        self.head = None
        self.size -= 1
        return deleted_data
    
    # Find second-to-last node
    current = self.head
    while current.next.next:
        current = current.next
    
    deleted_data = current.next.data
    current.next = None
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
    
    current = self.head
    for _ in range(position - 1):
        current = current.next
    
    deleted_data = current.next.data
    current.next = current.next.next
    self.size -= 1
    return deleted_data
```

---

### 4. Delete by Value

**Time:** O(n) | **Space:** O(1)

```python
def delete_by_value(self, target):
    """Delete first occurrence of target value"""
    if self.is_empty():
        return False
    
    # If head node
    if self.head.data == target:
        self.head = self.head.next
        self.size -= 1
        return True
    
    current = self.head
    while current.next:
        if current.next.data == target:
            current.next = current.next.next
            self.size -= 1
            return True
        current = current.next
    
    return False  # Not found
```

---

## 🔍 Search Operations

### 1. Linear Search

**Time:** O(n) | **Space:** O(1)

```python
def search(self, target):
    """Find position of first occurrence"""
    current = self.head
    position = 0
    
    while current:
        if current.data == target:
            return position
        current = current.next
        position += 1
    
    return -1  # Not found
```

### 2. Contains

```python
def contains(self, target):
    """Check if value exists"""
    return self.search(target) != -1
```

### 3. Get Node at Position

```python
def get(self, position):
    """Get value at position"""
    if position < 0 or position >= self.size:
        raise IndexError("Invalid position")
    
    current = self.head
    for _ in range(position):
        current = current.next
    
    return current.data
```

---

## 🔄 Utility Operations

### 1. Reverse (Iterative)

**Time:** O(n) | **Space:** O(1)

```python
def reverse(self):
    """Reverse the linked list"""
    previous = None
    current = self.head
    
    while current:
        next_node = current.next
        current.next = previous
        previous = current
        current = next_node
    
    self.head = previous

# Example:
ll = SinglyLinkedList()
for i in [1, 2, 3, 4]:
    ll.insert_at_end(i)
print(ll)  # 1 → 2 → 3 → 4 → null
ll.reverse()
print(ll)  # 4 → 3 → 2 → 1 → null
```

---

### 2. Find Middle

**Time:** O(n) | **Space:** O(1)

```python
def find_middle(self):
    """Find middle node using slow-fast pointers"""
    if self.is_empty():
        return None
    
    slow = fast = self.head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    return slow.data
```

---

### 3. Detect Cycle

**Time:** O(n) | **Space:** O(1)

```python
def has_cycle(self):
    """Detect if list has a cycle"""
    if self.is_empty():
        return False
    
    slow = fast = self.head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    
    return False
```

---

### 4. Remove Duplicates (Sorted List)

**Time:** O(n) | **Space:** O(1)

```python
def remove_duplicates(self):
    """Remove duplicates from sorted list"""
    if self.is_empty():
        return
    
    current = self.head
    
    while current and current.next:
        if current.data == current.next.data:
            current.next = current.next.next
            self.size -= 1
        else:
            current = current.next
```

---

## 📊 Complexity Summary

| Operation | Time | Space |
|-----------|------|-------|
| Insert at beginning | O(1) | O(1) |
| Insert at end (no tail) | O(n) | O(1) |
| Insert at end (with tail) | O(1) | O(1) |
| Insert at position | O(n) | O(1) |
| Delete from beginning | O(1) | O(1) |
| Delete from end | O(n) | O(1) |
| Delete at position | O(n) | O(1) |
| Search | O(n) | O(1) |
| Reverse | O(n) | O(1) |
| Find middle | O(n) | O(1) |

---

## 🧪 Practice Problems

1. Implement all operations from scratch
2. Reverse linked list iteratively
3. Find middle node
4. Remove nth node from end
5. Detect cycle
6. Remove duplicates from sorted list
7. Merge two sorted lists
8. Check if list is palindrome
9. Rotate list by k positions
10. Add two numbers represented as lists

---

## 💡 Key Takeaways

1. ✅ Always update **head** when modifying first node
2. ✅ Keep track of **size** for O(1) length queries
3. ✅ Use **tail pointer** for O(1) append operations
4. ✅ **Two-pointer** technique is very powerful
5. ✅ Handle **edge cases**: empty list, single node
6. ✅ **Draw diagrams** before implementing
7. ✅ In C++, remember to **delete** nodes to avoid memory leaks

---

[← Back to Basics](./01-Linked-List-Basics.md) | [Back to Chapter](./README.md) | [Next: Doubly Linked List →](./03-Doubly-Linked-List.md)
