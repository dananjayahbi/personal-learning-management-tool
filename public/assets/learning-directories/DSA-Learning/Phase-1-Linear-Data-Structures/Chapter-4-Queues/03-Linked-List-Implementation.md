# Linked List-Based Queue Implementation

## 🎯 Learning Objectives

By the end of this section, you will:
- Implement a queue using linked lists
- Understand dynamic memory allocation for queues
- Compare linked list vs array implementations
- Handle pointer manipulation efficiently
- Manage memory in different programming languages

---

## 📖 Overview

A **linked list-based queue** uses nodes connected by pointers. Unlike array-based queues, linked list queues grow dynamically and don't suffer from overflow (except when system memory is exhausted).

### Advantages:
✅ Dynamic size (no fixed capacity)  
✅ No false overflow problem  
✅ Efficient memory usage (allocate as needed)  
✅ Easy to implement  
✅ No need for resizing

### Disadvantages:
❌ Extra memory for pointers  
❌ No cache locality (non-contiguous memory)  
❌ Slightly slower due to pointer dereferencing  
❌ More complex memory management

---

## 🧱 Node Structure

Each node contains:
1. **Data:** The value stored
2. **Next:** Pointer to the next node

```
Node Structure:
┌─────────┬──────────┐
│  Data   │   Next   │
└─────────┴──────────┘
```

### Visual Representation:
```
Queue: front → [10] → [20] → [30] → None ← rear
               ↑                      ↑
             front                  rear
```

---

## 💻 Implementation in Python

```python
class Node:
    """Node class for linked list"""
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedListQueue:
    """Queue implementation using linked list"""
    
    def __init__(self):
        """Initialize empty queue"""
        self.front = None
        self.rear = None
        self.size = 0
    
    def is_empty(self):
        """Check if queue is empty"""
        return self.front is None
    
    def enqueue(self, data):
        """Add element to rear of queue"""
        # Create new node
        new_node = Node(data)
        
        # If queue is empty, both front and rear point to new node
        if self.rear is None:
            self.front = self.rear = new_node
            self.size = 1
            print(f"Enqueued: {data}")
            return
        
        # Add new node at the rear
        self.rear.next = new_node
        self.rear = new_node
        self.size += 1
        print(f"Enqueued: {data}")
    
    def dequeue(self):
        """Remove and return element from front"""
        if self.is_empty():
            print("Queue Underflow! Cannot dequeue.")
            return None
        
        # Store front data
        data = self.front.data
        
        # Move front to next node
        self.front = self.front.next
        
        # If front becomes None, set rear to None too
        if self.front is None:
            self.rear = None
        
        self.size -= 1
        print(f"Dequeued: {data}")
        return data
    
    def get_front(self):
        """Return front element without removing it"""
        if self.is_empty():
            print("Queue is empty!")
            return None
        return self.front.data
    
    def get_rear(self):
        """Return rear element without removing it"""
        if self.is_empty():
            print("Queue is empty!")
            return None
        return self.rear.data
    
    def get_size(self):
        """Return the number of elements in queue"""
        return self.size
    
    def display(self):
        """Display all elements in queue"""
        if self.is_empty():
            print("Queue is empty!")
            return
        
        print("Queue elements: ", end="")
        current = self.front
        while current:
            print(current.data, end=" → " if current.next else "")
            current = current.next
        print()
    
    def clear(self):
        """Remove all elements from queue"""
        self.front = None
        self.rear = None
        self.size = 0
        print("Queue cleared!")


# Example Usage
if __name__ == "__main__":
    q = LinkedListQueue()
    
    # Check empty queue
    print(f"Is empty: {q.is_empty()}")  # True
    
    # Enqueue operations
    q.enqueue(10)
    q.enqueue(20)
    q.enqueue(30)
    q.enqueue(40)
    q.display()  # 10 → 20 → 30 → 40
    
    # Check front and rear
    print(f"Front: {q.get_front()}")  # 10
    print(f"Rear: {q.get_rear()}")    # 40
    print(f"Size: {q.get_size()}")    # 4
    
    # Dequeue operations
    q.dequeue()  # Remove 10
    q.dequeue()  # Remove 20
    q.display()  # 30 → 40
    
    # More operations
    q.enqueue(50)
    q.enqueue(60)
    q.display()  # 30 → 40 → 50 → 60
    
    print(f"Is empty: {q.is_empty()}")  # False
```

### Output:
```
Is empty: True
Enqueued: 10
Enqueued: 20
Enqueued: 30
Enqueued: 40
Queue elements: 10 → 20 → 30 → 40
Front: 10
Rear: 40
Size: 4
Dequeued: 10
Dequeued: 20
Queue elements: 30 → 40
Enqueued: 50
Enqueued: 60
Queue elements: 30 → 40 → 50 → 60
Is empty: False
```

---

## 💻 Implementation in C++

```cpp
#include <iostream>
using namespace std;

// Node class
class Node {
public:
    int data;
    Node* next;
    
    Node(int value) {
        data = value;
        next = nullptr;
    }
};

// Queue class
class Queue {
private:
    Node* front;
    Node* rear;
    int count;

public:
    // Constructor
    Queue() {
        front = nullptr;
        rear = nullptr;
        count = 0;
    }
    
    // Destructor
    ~Queue() {
        while (!isEmpty()) {
            dequeue();
        }
    }
    
    // Check if queue is empty
    bool isEmpty() {
        return front == nullptr;
    }
    
    // Add element to queue
    void enqueue(int data) {
        Node* newNode = new Node(data);
        
        // If queue is empty
        if (rear == nullptr) {
            front = rear = newNode;
            count = 1;
            cout << "Enqueued: " << data << endl;
            return;
        }
        
        // Add new node at rear
        rear->next = newNode;
        rear = newNode;
        count++;
        cout << "Enqueued: " << data << endl;
    }
    
    // Remove element from queue
    int dequeue() {
        if (isEmpty()) {
            cout << "Queue Underflow! Cannot dequeue." << endl;
            return -1;
        }
        
        // Store front node and data
        Node* temp = front;
        int data = temp->data;
        
        // Move front to next node
        front = front->next;
        
        // If queue becomes empty, set rear to null
        if (front == nullptr) {
            rear = nullptr;
        }
        
        delete temp;
        count--;
        cout << "Dequeued: " << data << endl;
        return data;
    }
    
    // Get front element
    int getFront() {
        if (isEmpty()) {
            cout << "Queue is empty!" << endl;
            return -1;
        }
        return front->data;
    }
    
    // Get rear element
    int getRear() {
        if (isEmpty()) {
            cout << "Queue is empty!" << endl;
            return -1;
        }
        return rear->data;
    }
    
    // Get size
    int size() {
        return count;
    }
    
    // Display queue
    void display() {
        if (isEmpty()) {
            cout << "Queue is empty!" << endl;
            return;
        }
        
        cout << "Queue elements: ";
        Node* current = front;
        while (current != nullptr) {
            cout << current->data;
            if (current->next != nullptr) {
                cout << " → ";
            }
            current = current->next;
        }
        cout << endl;
    }
};

// Example Usage
int main() {
    Queue q;
    
    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    q.display();
    
    cout << "Front: " << q.getFront() << endl;
    cout << "Rear: " << q.getRear() << endl;
    cout << "Size: " << q.size() << endl;
    
    q.dequeue();
    q.dequeue();
    q.display();
    
    q.enqueue(40);
    q.enqueue(50);
    q.display();
    
    return 0;
}
```

---

## 💻 Implementation in Java

```java
// Node class
class Node {
    int data;
    Node next;
    
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

// Queue class
public class LinkedListQueue {
    private Node front;
    private Node rear;
    private int count;
    
    // Constructor
    public LinkedListQueue() {
        front = null;
        rear = null;
        count = 0;
    }
    
    // Check if queue is empty
    public boolean isEmpty() {
        return front == null;
    }
    
    // Add element to queue
    public void enqueue(int data) {
        Node newNode = new Node(data);
        
        // If queue is empty
        if (rear == null) {
            front = rear = newNode;
            count = 1;
            System.out.println("Enqueued: " + data);
            return;
        }
        
        // Add new node at rear
        rear.next = newNode;
        rear = newNode;
        count++;
        System.out.println("Enqueued: " + data);
    }
    
    // Remove element from queue
    public int dequeue() {
        if (isEmpty()) {
            System.out.println("Queue Underflow! Cannot dequeue.");
            return -1;
        }
        
        // Store front data
        int data = front.data;
        
        // Move front to next node
        front = front.next;
        
        // If queue becomes empty, set rear to null
        if (front == null) {
            rear = null;
        }
        
        count--;
        System.out.println("Dequeued: " + data);
        return data;
    }
    
    // Get front element
    public int getFront() {
        if (isEmpty()) {
            System.out.println("Queue is empty!");
            return -1;
        }
        return front.data;
    }
    
    // Get rear element
    public int getRear() {
        if (isEmpty()) {
            System.out.println("Queue is empty!");
            return -1;
        }
        return rear.data;
    }
    
    // Get size
    public int size() {
        return count;
    }
    
    // Display queue
    public void display() {
        if (isEmpty()) {
            System.out.println("Queue is empty!");
            return;
        }
        
        System.out.print("Queue elements: ");
        Node current = front;
        while (current != null) {
            System.out.print(current.data);
            if (current.next != null) {
                System.out.print(" → ");
            }
            current = current.next;
        }
        System.out.println();
    }
    
    // Example Usage
    public static void main(String[] args) {
        LinkedListQueue q = new LinkedListQueue();
        
        q.enqueue(10);
        q.enqueue(20);
        q.enqueue(30);
        q.display();
        
        System.out.println("Front: " + q.getFront());
        System.out.println("Rear: " + q.getRear());
        System.out.println("Size: " + q.size());
        
        q.dequeue();
        q.dequeue();
        q.display();
        
        q.enqueue(40);
        q.enqueue(50);
        q.display();
    }
}
```

---

## 📊 Complexity Analysis

### Time Complexity:

| Operation | Best Case | Average Case | Worst Case |
|-----------|-----------|--------------|------------|
| Enqueue | O(1) | O(1) | O(1) |
| Dequeue | O(1) | O(1) | O(1) |
| Front | O(1) | O(1) | O(1) |
| Rear | O(1) | O(1) | O(1) |
| isEmpty | O(1) | O(1) | O(1) |
| size | O(1) | O(1) | O(1) |
| Display | O(n) | O(n) | O(n) |

### Space Complexity:
- **Per element:** O(1) + pointer overhead
- **Total for n elements:** O(n)
- **Auxiliary space per operation:** O(1)

---

## 🔍 Operation Breakdown

### Enqueue Operation:

**Case 1: Empty Queue**
```
Initial: front = None, rear = None

Enqueue(10):
Step 1: Create node with data 10
Step 2: Set front = rear = new_node
Step 3: new_node.next = None

Result: front → [10] ← rear
```

**Case 2: Non-Empty Queue**
```
Initial: front → [10] → [20] ← rear

Enqueue(30):
Step 1: Create node with data 30
Step 2: rear.next = new_node
Step 3: rear = new_node

Result: front → [10] → [20] → [30] ← rear
```

### Dequeue Operation:

**Case 1: Single Element**
```
Initial: front → [10] ← rear

Dequeue():
Step 1: Store data = 10
Step 2: front = front.next (None)
Step 3: rear = None (since front is None)

Result: front = None, rear = None (empty queue)
```

**Case 2: Multiple Elements**
```
Initial: front → [10] → [20] → [30] ← rear

Dequeue():
Step 1: Store data = 10
Step 2: temp = front
Step 3: front = front.next
Step 4: Delete temp

Result: front → [20] → [30] ← rear
```

---

## 🆚 Array vs Linked List Implementation

| Feature | Array-Based | Linked List-Based |
|---------|-------------|-------------------|
| **Size** | Fixed (or needs resizing) | Dynamic |
| **Memory** | Contiguous | Non-contiguous |
| **Overflow** | Possible (false overflow) | Only when system memory full |
| **Memory per element** | Just data | Data + pointer |
| **Cache locality** | Better | Worse |
| **Implementation** | Simpler | Slightly complex |
| **Random access** | Not needed for queue | Not needed for queue |
| **Best for** | Known size, performance | Unknown size, flexibility |

### When to Use Each:

**Use Array-Based Queue:**
- ✅ Size is known in advance
- ✅ Performance is critical
- ✅ Cache locality matters
- ✅ Memory overhead should be minimal

**Use Linked List Queue:**
- ✅ Size is unknown or variable
- ✅ No fixed capacity limit needed
- ✅ Frequent enqueue/dequeue operations
- ✅ Flexibility is priority

---

## ⚠️ Common Pitfalls

### Pitfall 1: Not Updating Rear When Queue Becomes Empty
```cpp
// ❌ WRONG
int dequeue() {
    front = front->next;
    // Forgot to set rear = nullptr when front becomes null
    return data;
}

// ✅ CORRECT
int dequeue() {
    front = front->next;
    if (front == nullptr) {
        rear = nullptr;  // Important!
    }
    return data;
}
```

### Pitfall 2: Memory Leak in C++
```cpp
// ❌ WRONG
int dequeue() {
    int data = front->data;
    front = front->next;  // Lost reference to old front!
    return data;
}

// ✅ CORRECT
int dequeue() {
    Node* temp = front;
    int data = temp->data;
    front = front->next;
    delete temp;  // Free memory
    return data;
}
```

### Pitfall 3: Not Handling Empty Queue in Enqueue
```python
# ❌ WRONG
def enqueue(self, data):
    new_node = Node(data)
    self.rear.next = new_node  # Crashes if queue is empty!
    self.rear = new_node

# ✅ CORRECT
def enqueue(self, data):
    new_node = Node(data)
    if self.rear is None:
        self.front = self.rear = new_node
        return
    self.rear.next = new_node
    self.rear = new_node
```

---

## 💡 Optimization Tips

### Tip 1: Track Size for O(1) Access
```python
# Keep a count variable instead of traversing to count
self.size = 0  # Update on enqueue/dequeue
```

### Tip 2: Use Sentinel Node (Advanced)
```python
# Dummy head node simplifies edge cases
self.sentinel = Node(0)
self.front = self.sentinel
```

### Tip 3: Implement Clear Method Efficiently
```python
# In Python, just reset pointers (GC handles memory)
def clear(self):
    self.front = self.rear = None
    self.size = 0
```

### Tip 4: Add Iterator Support
```python
def __iter__(self):
    current = self.front
    while current:
        yield current.data
        current = current.next
```

---

## 🧪 Testing Your Implementation

```python
def test_queue():
    q = LinkedListQueue()
    
    # Test 1: Empty queue
    assert q.is_empty() == True
    assert q.get_size() == 0
    
    # Test 2: Single element
    q.enqueue(10)
    assert q.get_front() == 10
    assert q.get_rear() == 10
    assert q.get_size() == 1
    
    # Test 3: Multiple elements
    q.enqueue(20)
    q.enqueue(30)
    assert q.get_front() == 10
    assert q.get_rear() == 30
    assert q.get_size() == 3
    
    # Test 4: Dequeue operations
    assert q.dequeue() == 10
    assert q.get_front() == 20
    assert q.get_size() == 2
    
    # Test 5: Empty after dequeuing all
    q.dequeue()
    q.dequeue()
    assert q.is_empty() == True
    
    print("All tests passed!")

test_queue()
```

---

## 🎓 Practice Exercises

1. **Reverse the queue** using only queue operations
2. **Implement `contains()`** method to search for an element
3. **Create `toList()`** method to convert queue to list
4. **Add `peek_nth()`** to get nth element from front
5. **Implement queue** using two singly linked lists

---

## 🚀 Next Steps

Now that you understand linked list-based queues:

1. **[Learn Circular Queues →](./04-Circular-Queue.md)**
2. **Compare all implementations you've learned**
3. **Solve linked list queue problems**
4. **Explore advanced queue variations**

---

**Key Takeaway:** Linked list queues offer dynamic sizing and no false overflow, making them ideal when queue size is unpredictable! 🎯

[← Back: Array-Based Implementation](./02-Array-Based-Implementation.md) | [Back to Chapter Overview](./README.md) | [Next: Circular Queue →](./04-Circular-Queue.md)
