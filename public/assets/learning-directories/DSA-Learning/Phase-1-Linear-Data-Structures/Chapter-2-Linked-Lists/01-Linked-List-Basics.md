# 01 - Linked List Basics

## 🎯 Overview

A **Linked List** is a linear data structure where elements are stored in **nodes**. Each node contains:
1. **Data** - The actual value
2. **Pointer(s)** - Reference(s) to the next (and possibly previous) node

Unlike arrays, linked lists don't require contiguous memory allocation, making them more flexible for dynamic operations.

---

## 📖 What is a Linked List?

### Structure:

```
Node Structure:
┌──────┬──────┐
│ Data │ Next │
└──────┴──────┘

Linked List:
Head
 ↓
┌───┬───┐   ┌───┬───┐   ┌───┬───┐   ┌───┬────┐
│ 1 │ ●─┼──→│ 2 │ ●─┼──→│ 3 │ ●─┼──→│ 4 │null│
└───┴───┘   └───┴───┘   └───┴───┘   └───┴────┘
```

---

## 🧠 Memory Representation

### Arrays vs Linked Lists:

**Array:**
```
Memory: Contiguous blocks
┌───┬───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │ 5 │
└───┴───┴───┴───┴───┘
1000 1004 1008 1012 1016  ← Addresses
```

**Linked List:**
```
Memory: Scattered locations
Node 1 @ 1000: [1 | 2500] ──┐
Node 2 @ 2500: [2 | 3200] ←─┘─┐
Node 3 @ 3200: [3 | 1800] ←───┘─┐
Node 4 @ 1800: [4 | null] ←─────┘
```

**Key Difference:** Linked lists don't need consecutive memory!

---

## 🔄 Types of Linked Lists

### 1. Singly Linked List
Each node has one pointer to the next node.

```
Head → [1|●]→[2|●]→[3|●]→[4|null]
```

### 2. Doubly Linked List
Each node has pointers to both next and previous nodes.

```
null←[●|1|●]↔[●|2|●]↔[●|3|●]↔[●|4|null]
     Head
```

### 3. Circular Linked List
Last node points back to the first node.

```
   ┌─────────────────────┐
   │                     │
   ↓                     │
Head [1|●]→[2|●]→[3|●]→[4|●]
```

---

## 📝 Node Implementation

### Python:

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# Creating nodes
node1 = Node(1)
node2 = Node(2)
node3 = Node(3)

# Linking nodes
node1.next = node2
node2.next = node3

# Traversing
current = node1
while current:
    print(current.data, end=" → ")
    current = current.next
print("null")
# Output: 1 → 2 → 3 → null
```

### C++:

```cpp
struct Node {
    int data;
    Node* next;
    
    // Constructor
    Node(int val) : data(val), next(nullptr) {}
};

// Creating and linking nodes
Node* head = new Node(1);
head->next = new Node(2);
head->next->next = new Node(3);

// Traversing
Node* current = head;
while (current != nullptr) {
    cout << current->data << " -> ";
    current = current->next;
}
cout << "null" << endl;
```

### Java:

```java
class Node {
    int data;
    Node next;
    
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

// Creating and linking nodes
Node head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);

// Traversing
Node current = head;
while (current != null) {
    System.out.print(current.data + " -> ");
    current = current.next;
}
System.out.println("null");
```

---

## ⚖️ Linked Lists vs Arrays

| Feature | Array | Linked List |
|---------|-------|-------------|
| **Memory Allocation** | Contiguous | Non-contiguous |
| **Size** | Fixed (static) or resizable | Dynamic |
| **Access Time** | O(1) - Direct indexing | O(n) - Must traverse |
| **Insert at Beginning** | O(n) - Shift elements | O(1) - Update pointers |
| **Insert at End** | O(1) - If space available | O(n) - Without tail pointer |
| **Insert at Middle** | O(n) - Shift elements | O(1) - At known position |
| **Delete at Beginning** | O(n) - Shift elements | O(1) - Update head |
| **Delete at End** | O(1) | O(n) - Find previous node |
| **Delete at Middle** | O(n) - Shift elements | O(1) - At known position |
| **Memory Overhead** | None | Extra for pointers |
| **Cache Locality** | Excellent | Poor |
| **Random Access** | Yes - O(1) | No - O(n) |

---

## ✅ Advantages of Linked Lists

1. **Dynamic Size:** Grow or shrink as needed
2. **Efficient Insertion/Deletion:** O(1) at known positions
3. **No Wasted Space:** No need to pre-allocate
4. **No Shift Operations:** Unlike arrays
5. **Flexible Memory:** Use any available memory location

---

## ❌ Disadvantages of Linked Lists

1. **No Random Access:** Can't jump to index i in O(1)
2. **Extra Memory:** Each node needs space for pointer(s)
3. **Poor Cache Performance:** Nodes scattered in memory
4. **Traversal Overhead:** Must follow pointers
5. **More Complex:** Pointer manipulation can be tricky

---

## 🔧 Basic Operations

### 1. Traversal

**Time Complexity:** O(n)

```python
def traverse(head):
    current = head
    while current:
        print(current.data, end=" → ")
        current = current.next
    print("null")
```

### 2. Length Calculation

**Time Complexity:** O(n)

```python
def length(head):
    count = 0
    current = head
    while current:
        count += 1
        current = current.next
    return count
```

### 3. Search

**Time Complexity:** O(n)

```python
def search(head, key):
    current = head
    position = 0
    while current:
        if current.data == key:
            return position
        current = current.next
        position += 1
    return -1  # Not found
```

---

## 🎨 Common Patterns

### Pattern 1: Dummy Node

A **dummy node** (or sentinel) simplifies edge cases:

```python
# Without dummy node - Complex
def insert_at_beginning(head, data):
    new_node = Node(data)
    if head is None:  # Special case
        head = new_node
    else:
        new_node.next = head
        head = new_node
    return head

# With dummy node - Simpler
def insert_at_beginning_with_dummy(dummy, data):
    new_node = Node(data)
    new_node.next = dummy.next
    dummy.next = new_node
    # No special cases!
```

### Pattern 2: Two Pointers

```python
# Find middle of linked list
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow  # slow is at middle
```

### Pattern 3: Recursive Operations

```python
# Print list recursively
def print_recursive(node):
    if node is None:
        print("null")
        return
    print(node.data, end=" → ")
    print_recursive(node.next)
```

---

## ⏱️ Time Complexity Summary

| Operation | Time Complexity |
|-----------|----------------|
| Access by index | O(n) |
| Search | O(n) |
| Insert at beginning | O(1) |
| Insert at end (no tail) | O(n) |
| Insert at end (with tail) | O(1) |
| Insert at position | O(n) |
| Delete at beginning | O(1) |
| Delete at end | O(n) |
| Delete at position | O(n) |
| Reverse | O(n) |
| Find middle | O(n) |

---

## 💾 Space Complexity

**Per Node:**
```
Python:
- Object overhead: ~40-48 bytes
- Data: ~8 bytes (for integer)
- Next pointer: ~8 bytes
- Total: ~56-64 bytes per node

C++:
- Data: 4 bytes (int)
- Next pointer: 8 bytes (64-bit system)
- Total: 12 bytes per node

Java:
- Object header: 12 bytes
- Data: 4 bytes (int)
- Next reference: 4-8 bytes
- Alignment: 4 bytes
- Total: ~24-28 bytes per node
```

---

## 🐛 Common Mistakes

### 1. Losing Head Reference

```python
# ❌ WRONG - Lost original head
def wrong_insert(head, data):
    head = Node(data)
    head.next = head  # Lost original list!

# ✅ CORRECT
def correct_insert(head, data):
    new_node = Node(data)
    new_node.next = head
    return new_node  # Return new head
```

### 2. Not Handling Null

```python
# ❌ WRONG - Null pointer error
def wrong_delete(head):
    head = head.next  # What if head is None?

# ✅ CORRECT
def correct_delete(head):
    if head is None:
        return None
    return head.next
```

### 3. Forgetting to Update Pointers

```python
# ❌ WRONG - Memory leak / lost nodes
def wrong_reverse(head):
    current = head
    while current:
        current.next = previous  # What's previous?
        current = current.next  # Lost reference!

# ✅ CORRECT (covered in reversal section)
```

---

## 🧪 Practice Problems - Basics

1. Implement a singly linked list with basic operations
2. Find the length of a linked list
3. Search for an element in linked list
4. Get the nth node from the beginning
5. Print linked list in reverse (without modifying)
6. Count occurrences of a value
7. Find max and min values
8. Check if list is sorted
9. Remove duplicates from sorted list
10. Clone a linked list

---

## 💡 Key Takeaways

1. ✅ Linked lists use **nodes with pointers** instead of contiguous memory
2. ✅ **O(1) insertion/deletion** at known positions vs O(n) for arrays
3. ✅ **O(n) access** time vs O(1) for arrays
4. ✅ **Dynamic size** - no need to pre-allocate
5. ✅ **Extra memory** for pointers (trade-off)
6. ✅ Three main types: **singly, doubly, circular**
7. ✅ **Dummy nodes** simplify edge cases
8. ✅ **Two-pointer** technique is very common
9. ✅ Always check for **null/None** before dereferencing
10. ✅ Draw diagrams to visualize pointer changes

---

## 📚 Next Steps

Now that you understand the basics, let's dive deeper:
- **[02-Singly-Linked-List.md](./02-Singly-Linked-List.md)** - Complete implementation with all operations
- Practice creating and traversing linked lists
- Get comfortable with pointer manipulation

---

[← Back to Chapter](./README.md) | [Next: Singly Linked List →](./02-Singly-Linked-List.md)
