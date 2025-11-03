# Deque (Double-Ended Queue)

## 🎯 Learning Objectives

- Understand deque (double-ended queue) concept
- Implement insertion and deletion at both ends
- Learn input-restricted and output-restricted deques
- Apply deques to sliding window problems
- Master deque operations in O(1) time

---

## 📖 What is a Deque?

A **Deque** (pronounced "deck") is a double-ended queue that allows insertion and deletion at **both front and rear** ends.

### Deque vs Regular Queue:

```
Regular Queue:
Insert at REAR only → [10, 20, 30, 40] → Delete from FRONT only

Deque:
Insert/Delete ↔ [10, 20, 30, 40] ↔ Insert/Delete
   (FRONT)                            (REAR)
```

---

## 🔄 Deque Operations

### Core Operations:

| Operation | Description | Time |
|-----------|-------------|------|
| `insertFront(x)` | Add element at front | O(1) |
| `insertRear(x)` | Add element at rear | O(1) |
| `deleteFront()` | Remove from front | O(1) |
| `deleteRear()` | Remove from rear | O(1) |
| `getFront()` | Get front element | O(1) |
| `getRear()` | Get rear element | O(1) |
| `isEmpty()` | Check if empty | O(1) |
| `size()` | Get element count | O(1) |

---

## 💻 Implementation Using Array

```python
class Deque:
    """Deque implementation using circular array"""
    
    def __init__(self, capacity):
        self.capacity = capacity
        self.arr = [None] * capacity
        self.front = -1
        self.rear = 0
        self.size = 0
    
    def is_empty(self):
        return self.size == 0
    
    def is_full(self):
        return self.size == self.capacity
    
    def insert_front(self, data):
        """Insert element at front"""
        if self.is_full():
            print("Deque is full!")
            return False
        
        # If deque is empty
        if self.front == -1:
            self.front = 0
            self.rear = 0
        else:
            # Circular decrement
            self.front = (self.front - 1 + self.capacity) % self.capacity
        
        self.arr[self.front] = data
        self.size += 1
        print(f"Inserted {data} at front (index {self.front})")
        return True
    
    def insert_rear(self, data):
        """Insert element at rear"""
        if self.is_full():
            print("Deque is full!")
            return False
        
        # If deque is empty
        if self.front == -1:
            self.front = 0
            self.rear = 0
        else:
            # Circular increment
            self.rear = (self.rear + 1) % self.capacity
        
        self.arr[self.rear] = data
        self.size += 1
        print(f"Inserted {data} at rear (index {self.rear})")
        return True
    
    def delete_front(self):
        """Delete element from front"""
        if self.is_empty():
            print("Deque is empty!")
            return None
        
        data = self.arr[self.front]
        
        # Single element case
        if self.front == self.rear:
            self.front = -1
            self.rear = -1
        else:
            self.front = (self.front + 1) % self.capacity
        
        self.size -= 1
        print(f"Deleted {data} from front")
        return data
    
    def delete_rear(self):
        """Delete element from rear"""
        if self.is_empty():
            print("Deque is empty!")
            return None
        
        data = self.arr[self.rear]
        
        # Single element case
        if self.front == self.rear:
            self.front = -1
            self.rear = -1
        else:
            self.rear = (self.rear - 1 + self.capacity) % self.capacity
        
        self.size -= 1
        print(f"Deleted {data} from rear")
        return data
    
    def get_front(self):
        if self.is_empty():
            return None
        return self.arr[self.front]
    
    def get_rear(self):
        if self.is_empty():
            return None
        return self.arr[self.rear]
    
    def display(self):
        if self.is_empty():
            print("Deque is empty!")
            return
        
        print("Deque: ", end="")
        i = self.front
        for _ in range(self.size):
            print(self.arr[i], end=" ")
            i = (i + 1) % self.capacity
        print()


# Example Usage
if __name__ == "__main__":
    dq = Deque(5)
    
    # Insert at both ends
    dq.insert_rear(10)
    dq.insert_rear(20)
    dq.insert_front(5)
    dq.display()  # 5 10 20
    
    # Delete from both ends
    dq.delete_front()  # Remove 5
    dq.delete_rear()   # Remove 20
    dq.display()       # 10
    
    # More operations
    dq.insert_front(1)
    dq.insert_rear(30)
    dq.insert_rear(40)
    dq.display()  # 1 10 30 40
```

---

## 💻 Implementation Using Doubly Linked List

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None


class DequeLinkedList:
    """Deque using doubly linked list"""
    
    def __init__(self):
        self.front = None
        self.rear = None
        self.size = 0
    
    def is_empty(self):
        return self.front is None
    
    def insert_front(self, data):
        new_node = Node(data)
        
        if self.is_empty():
            self.front = self.rear = new_node
        else:
            new_node.next = self.front
            self.front.prev = new_node
            self.front = new_node
        
        self.size += 1
    
    def insert_rear(self, data):
        new_node = Node(data)
        
        if self.is_empty():
            self.front = self.rear = new_node
        else:
            new_node.prev = self.rear
            self.rear.next = new_node
            self.rear = new_node
        
        self.size += 1
    
    def delete_front(self):
        if self.is_empty():
            return None
        
        data = self.front.data
        
        if self.front == self.rear:
            self.front = self.rear = None
        else:
            self.front = self.front.next
            self.front.prev = None
        
        self.size -= 1
        return data
    
    def delete_rear(self):
        if self.is_empty():
            return None
        
        data = self.rear.data
        
        if self.front == self.rear:
            self.front = self.rear = None
        else:
            self.rear = self.rear.prev
            self.rear.next = None
        
        self.size -= 1
        return data
```

---

## 🎯 Types of Deques

### 1. **Input-Restricted Deque**
- Insertion: Only at one end (usually rear)
- Deletion: Both ends

```
Insert at REAR → [10, 20, 30] ← Delete from FRONT or REAR
```

### 2. **Output-Restricted Deque**
- Insertion: Both ends
- Deletion: Only at one end (usually front)

```
Insert at FRONT or REAR → [10, 20, 30] → Delete from FRONT
```

---

## 🚀 Applications of Deque

### 1. **Sliding Window Maximum/Minimum**

```python
from collections import deque

def sliding_window_maximum(arr, k):
    """Find maximum in each sliding window of size k"""
    dq = deque()  # Store indices
    result = []
    
    for i in range(len(arr)):
        # Remove indices outside window
        while dq and dq[0] <= i - k:
            dq.popleft()
        
        # Remove smaller elements (not useful)
        while dq and arr[dq[-1]] < arr[i]:
            dq.pop()
        
        dq.append(i)
        
        # Add to result when window is complete
        if i >= k - 1:
            result.append(arr[dq[0]])
    
    return result

# Example
arr = [1, 3, -1, -3, 5, 3, 6, 7]
k = 3
print(sliding_window_maximum(arr, k))
# Output: [3, 3, 5, 5, 6, 7]
```

### 2. **Palindrome Checker**

```python
from collections import deque

def is_palindrome(s):
    dq = deque(s.lower())
    
    while len(dq) > 1:
        if dq.popleft() != dq.pop():
            return False
    return True

print(is_palindrome("racecar"))  # True
print(is_palindrome("hello"))    # False
```

### 3. **Browser History (Back/Forward)**

```python
class BrowserHistory:
    def __init__(self):
        self.back_stack = []
        self.forward_deque = deque()
        self.current = None
    
    def visit(self, url):
        if self.current:
            self.back_stack.append(self.current)
        self.current = url
        self.forward_deque.clear()
    
    def back(self):
        if self.back_stack:
            self.forward_deque.appendleft(self.current)
            self.current = self.back_stack.pop()
        return self.current
    
    def forward(self):
        if self.forward_deque:
            self.back_stack.append(self.current)
            self.current = self.forward_deque.popleft()
        return self.current
```

---

## 📚 Using Built-in Deque

### Python `collections.deque`

```python
from collections import deque

# Create deque
dq = deque([1, 2, 3])

# Operations
dq.append(4)        # Add to right: [1, 2, 3, 4]
dq.appendleft(0)    # Add to left: [0, 1, 2, 3, 4]
dq.pop()            # Remove from right: 4
dq.popleft()        # Remove from left: 0
dq.extend([5, 6])   # Extend right
dq.extendleft([-1, -2])  # Extend left

# Access
print(dq[0])        # First element
print(dq[-1])       # Last element

# Rotation
dq.rotate(1)        # Rotate right
dq.rotate(-1)       # Rotate left
```

### C++ `std::deque`

```cpp
#include <deque>
#include <iostream>
using namespace std;

int main() {
    deque<int> dq;
    
    // Insert
    dq.push_back(10);     // Add to back
    dq.push_front(5);     // Add to front
    
    // Access
    cout << dq.front();   // First element
    cout << dq.back();    // Last element
    
    // Delete
    dq.pop_back();        // Remove from back
    dq.pop_front();       // Remove from front
    
    // Size
    cout << dq.size();
    
    return 0;
}
```

### Java `ArrayDeque`

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class DequeExample {
    public static void main(String[] args) {
        Deque<Integer> dq = new ArrayDeque<>();
        
        // Insert
        dq.addFirst(5);
        dq.addLast(10);
        dq.offerFirst(1);
        dq.offerLast(20);
        
        // Access
        System.out.println(dq.getFirst());
        System.out.println(dq.getLast());
        
        // Delete
        dq.removeFirst();
        dq.removeLast();
    }
}
```

---

## 🎓 Practice Problems

1. **Sliding Window Maximum** (LeetCode 239)
2. **Maximum of all subarrays of size k**
3. **Implement Stack using Deque**
4. **Implement Queue using Deque**
5. **First negative in every window**
6. **Palindrome check using deque**
7. **Minimum in sliding window**

---

## 💡 Key Advantages

✅ Flexible operations at both ends  
✅ All operations in O(1)  
✅ Perfect for sliding window problems  
✅ Can implement both stack and queue  
✅ Efficient for undo/redo functionality

---

## 🚀 Next Steps

1. **[Learn Priority Queues →](./06-Priority-Queue-Introduction.md)**
2. **Solve sliding window problems**
3. **Practice deque implementations**
4. **Explore real-world applications**

---

**Key Takeaway:** Deques provide flexibility with O(1) operations at both ends - perfect for sliding window and advanced queue problems! 🎯

[← Back: Circular Queue](./04-Circular-Queue.md) | [Back to Chapter](./README.md) | [Next: Priority Queue →](./06-Priority-Queue-Introduction.md)
