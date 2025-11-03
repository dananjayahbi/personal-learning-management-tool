# 04 - Circular Linked List

## 🎯 Overview

A **Circular Linked List** is a variation where the last node points back to the first node instead of pointing to null, forming a **circle**. There are two types:
1. **Singly Circular Linked List**
2. **Doubly Circular Linked List**

**Key Feature:** No null pointers - traversal can continue indefinitely!

---

## 📖 Types of Circular Linked Lists

### 1. Singly Circular Linked List

```
        ┌─────────────────────────┐
        │                         │
        ↓                         │
    ┌───┬───┐   ┌───┬───┐   ┌───┬───┐
    │ 1 │ ●─┼──→│ 2 │ ●─┼──→│ 3 │ ●─┼─┘
    └───┴───┘   └───┴───┘   └───┴───┘
        ↑
       Head
```

**Last node's next** points to **head**.

---

### 2. Doubly Circular Linked List

```
    ┌────────────────────────────┐
    │   ┌────────────────────┐   │
    │   │   ┌────────────┐   │   │
    │   │   │            │   │   │
    ↓   ↓   ↓            │   │   │
┌───┬───┬───┐       ┌───┬───┬───┐
│ ● │ 1 │ ●─┼──────→│ ● │ 3 │ ●─┼─┐
└───┴───┴───┘       └───┴───┴───┘ │
    ↑   ↑   ↑            ↑   ↑    │
    │   │   │            │   │    │
    │   │   └────────────┘   │    │
    │   └──────────────────────┘  │
    └────────────────────────────┘
        Head
```

**Last node's next** → **head**  
**Head's prev** → **last node**

---

## 📝 Singly Circular Linked List Implementation

### Node Structure:

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class CircularLinkedList:
    def __init__(self):
        self.head = None
        self.size = 0
    
    def is_empty(self):
        return self.head is None
    
    def __len__(self):
        return self.size
```

---

## 📥 Insertion Operations

### 1. Insert at Beginning

**Time:** O(1) with tail pointer, O(n) without

```python
def insert_at_beginning(self, data):
    """Insert node at beginning"""
    new_node = Node(data)
    
    if self.is_empty():
        self.head = new_node
        new_node.next = new_node  # Points to itself
    else:
        # Find last node
        current = self.head
        while current.next != self.head:
            current = current.next
        
        new_node.next = self.head
        current.next = new_node
        self.head = new_node
    
    self.size += 1

# Optimized with tail pointer:
class CircularLinkedListOptimized:
    def __init__(self):
        self.head = None
        self.tail = None  # Track tail for O(1) operations
        self.size = 0
    
    def insert_at_beginning(self, data):
        new_node = Node(data)
        
        if self.is_empty():
            self.head = self.tail = new_node
            new_node.next = new_node
        else:
            new_node.next = self.head
            self.tail.next = new_node
            self.head = new_node
        
        self.size += 1
```

---

### 2. Insert at End

**Time:** O(1) with tail pointer

```python
def insert_at_end(self, data):
    """Insert node at end"""
    new_node = Node(data)
    
    if self.is_empty():
        self.head = self.tail = new_node
        new_node.next = new_node
    else:
        new_node.next = self.head
        self.tail.next = new_node
        self.tail = new_node
    
    self.size += 1

# Visual:
# Before: 1 → 2 → 3 ──┐
#         ↑           │
#         └───────────┘
# 
# Insert 4:
# After:  1 → 2 → 3 → 4 ─┐
#         ↑              │
#         └──────────────┘
```

---

### 3. Insert at Position

**Time:** O(n)

```python
def insert_at_position(self, data, position):
    """Insert at specific position"""
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
    
    for _ in range(position - 1):
        current = current.next
    
    new_node.next = current.next
    current.next = new_node
    self.size += 1
```

---

## 🗑️ Deletion Operations

### 1. Delete from Beginning

**Time:** O(1) with tail pointer

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
        self.tail.next = self.head.next
        self.head = self.head.next
    
    self.size -= 1
    return deleted_data
```

---

### 2. Delete from End

**Time:** O(n) - Must find second-to-last node

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
        # Find second-to-last node
        current = self.head
        while current.next != self.tail:
            current = current.next
        
        current.next = self.head
        self.tail = current
    
    self.size -= 1
    return deleted_data
```

---

### 3. Delete by Value

**Time:** O(n)

```python
def delete_by_value(self, target):
    """Delete first occurrence of target"""
    if self.is_empty():
        return False
    
    # If head node
    if self.head.data == target:
        self.delete_from_beginning()
        return True
    
    current = self.head
    while current.next != self.head:
        if current.next.data == target:
            if current.next == self.tail:
                self.tail = current
            current.next = current.next.next
            self.size -= 1
            return True
        current = current.next
    
    return False
```

---

## 🔄 Traversal

### Print All Elements:

```python
def traverse(self):
    """Print all elements"""
    if self.is_empty():
        print("[]")
        return
    
    result = []
    current = self.head
    
    # Must use do-while pattern
    while True:
        result.append(str(current.data))
        current = current.next
        if current == self.head:
            break
    
    print(" → ".join(result) + " → (back to head)")

# Alternative: Count-based
def traverse_count(self):
    if self.is_empty():
        return
    
    current = self.head
    count = 0
    
    while count < self.size:
        print(current.data, end=" → ")
        current = current.next
        count += 1
    print("(circular)")
```

---

## 🎯 Applications

### 1. Round-Robin Scheduling

```python
def round_robin(self, time_quantum):
    """
    Simulate round-robin CPU scheduling
    Each process gets time_quantum
    """
    if self.is_empty():
        return
    
    current = self.head
    
    while self.size > 0:
        print(f"Process {current.data} executing...")
        
        # Simulate execution
        if process_completed(current.data):
            # Remove completed process
            if current == self.head:
                self.delete_from_beginning()
                current = self.head
            else:
                # Find previous node
                prev = self.head
                while prev.next != current:
                    prev = prev.next
                prev.next = current.next
                if current == self.tail:
                    self.tail = prev
                current = current.next
                self.size -= 1
        else:
            # Move to next process
            current = current.next
```

---

### 2. Circular Buffer

```python
class CircularBuffer:
    """Fixed-size buffer with circular linked list"""
    
    def __init__(self, capacity):
        self.capacity = capacity
        self.list = CircularLinkedList()
        self.current = None
    
    def write(self, data):
        """Add data, overwrite if full"""
        if len(self.list) < self.capacity:
            self.list.insert_at_end(data)
        else:
            # Overwrite oldest data
            if self.current is None:
                self.current = self.list.head
            self.current.data = data
            self.current = self.current.next
    
    def read(self):
        """Read all data in order"""
        return self.list.traverse()
```

---

### 3. Josephus Problem

```python
def josephus(n, k):
    """
    n people in circle, eliminate every kth person
    Return survivor
    """
    # Create circular list 1 to n
    cll = CircularLinkedList()
    for i in range(1, n + 1):
        cll.insert_at_end(i)
    
    current = cll.head
    
    while len(cll) > 1:
        # Move k-1 steps
        for _ in range(k - 1):
            current = current.next
        
        # Eliminate next person
        print(f"Eliminated: {current.next.data}")
        next_node = current.next.next
        current.next = next_node
        cll.size -= 1
        
        if current.next == cll.head:
            cll.head = next_node
        
        current = next_node
    
    return cll.head.data

# Example: n=7, k=3
# People: 1,2,3,4,5,6,7
# Eliminate: 3,6,2,7,5,1
# Survivor: 4
```

---

## 📊 Complexity Summary

| Operation | Time (with tail) | Time (without tail) |
|-----------|-----------------|---------------------|
| Insert at beginning | O(1) | O(n) |
| Insert at end | O(1) | O(n) |
| Insert at position | O(n) | O(n) |
| Delete from beginning | O(1) | O(n) |
| Delete from end | O(n) | O(n) |
| Delete at position | O(n) | O(n) |
| Search | O(n) | O(n) |
| Traverse | O(n) | O(n) |

---

## ✅ Advantages

1. ✅ **No null pointers** - Simplifies some operations
2. ✅ **Continuous traversal** - Can loop indefinitely
3. ✅ **Efficient for cyclic operations** - Round-robin, buffers
4. ✅ **O(1) access** from any node to beginning (just follow next)

---

## ❌ Disadvantages

1. ❌ **Complex implementation** - Must handle circular nature
2. ❌ **Infinite loop risk** - Easy to create bugs
3. ❌ **Harder to detect end** - Need special condition or counter
4. ❌ **Traversal complexity** - Must track when to stop

---

## 🐛 Common Pitfalls

### 1. Infinite Loop in Traversal

```python
# ❌ WRONG - Infinite loop
def wrong_traverse(self):
    current = self.head
    while current:  # Never becomes None!
        print(current.data)
        current = current.next

# ✅ CORRECT
def correct_traverse(self):
    if not self.head:
        return
    current = self.head
    while True:
        print(current.data)
        current = current.next
        if current == self.head:
            break
```

---

### 2. Forgetting to Update Tail

```python
# ❌ WRONG - Tail not updated
def wrong_insert_at_end(self, data):
    new_node = Node(data)
    self.tail.next = new_node
    new_node.next = self.head
    # Forgot: self.tail = new_node

# ✅ CORRECT
def correct_insert_at_end(self, data):
    new_node = Node(data)
    self.tail.next = new_node
    new_node.next = self.head
    self.tail = new_node  # Update tail!
```

---

## 🧪 Practice Problems

1. Implement circular linked list with all operations
2. Check if a linked list is circular
3. Split circular list into two halves
4. Josephus problem
5. Convert singly linked list to circular
6. Detect and remove loop (convert circular to singly)
7. Sorted insert in circular list
8. Count nodes in circular list
9. Delete alternate nodes in circular list
10. Clone circular linked list

---

## 💡 Key Takeaways

1. ✅ **Last node** points back to **head** (no null)
2. ✅ Use **tail pointer** for O(1) operations
3. ✅ **Traversal** requires special stop condition
4. ✅ Perfect for **round-robin** and **circular buffers**
5. ✅ Watch out for **infinite loops**
6. ✅ Use **do-while** pattern for traversal
7. ✅ Always check if **only one node** exists
8. ✅ Update **both head and tail** when needed

---

[← Back to Doubly Linked List](./03-Doubly-Linked-List.md) | [Back to Chapter](./README.md) | [Next: Two-Pointer Technique →](./05-Two-Pointer-in-Linked-Lists.md)
