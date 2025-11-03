# Circular Queue

## 🎯 Learning Objectives

By the end of this section, you will:
- Understand circular queue concept and advantages
- Implement circular queues efficiently
- Handle full and empty conditions correctly
- Use modulo arithmetic for circular indexing
- Solve the false overflow problem

---

## 📖 What is a Circular Queue?

A **circular queue** is a linear data structure that connects the end of the queue back to the beginning, forming a circle. This allows efficient space utilization by reusing freed positions.

### The Problem with Simple Queues:

```
Simple Queue After Operations:
[_, _, _, 40, 50]  front=3, rear=4

Cannot add more elements even though positions 0-2 are free!
This is called "false overflow" or "wasted space problem"
```

### Circular Queue Solution:

```
Circular Queue Concept:
      0   1   2   3   4
    [_, _, _, 40, 50]  front=3, rear=4

After Enqueue(60):
      0   1   2   3   4
    [60, _, _, 40, 50]  front=3, rear=0 (wrapped around!)

The rear "wraps around" to index 0!
```

---

## 🔄 Circular Queue Visualization

### Visual Representation:

```
Circular Array (Conceptual):
        [0]
    [4]     [1]
    [3]     [2]

After operations: front=2, rear=4
        [_]
    [50]    [_]
    [40]    [30]
         ↑front
```

### How It Works:

```
Circular indexing using modulo:
next_position = (current_position + 1) % capacity

Example with capacity = 5:
Position 0: (0 + 1) % 5 = 1
Position 1: (1 + 1) % 5 = 2
Position 4: (4 + 1) % 5 = 0 (wraps to beginning!)
```

---

## 🧮 Key Formulas

### Circular Increment:
```
rear = (rear + 1) % capacity
front = (front + 1) % capacity
```

### Check Full Condition:
```
Method 1: Waste one slot
isFull = (rear + 1) % capacity == front

Method 2: Use count variable
isFull = count == capacity
```

### Check Empty Condition:
```
Method 1: Compare pointers
isEmpty = front == rear (when initially -1 or 0)

Method 2: Use count variable
isEmpty = count == 0
```

### Calculate Size:
```
Method 1: Without count variable
if rear >= front:
    size = rear - front + 1
else:
    size = capacity - front + rear + 1

Method 2: With count variable
size = count (maintained separately)
```

---

## 💻 Implementation in Python

```python
class CircularQueue:
    """Circular Queue using array with count variable"""
    
    def __init__(self, capacity):
        """Initialize circular queue with given capacity"""
        self.capacity = capacity
        self.queue = [None] * capacity
        self.front = 0
        self.rear = -1
        self.count = 0
    
    def is_empty(self):
        """Check if queue is empty"""
        return self.count == 0
    
    def is_full(self):
        """Check if queue is full"""
        return self.count == self.capacity
    
    def enqueue(self, data):
        """Add element to rear of circular queue"""
        if self.is_full():
            print("Queue Overflow! Cannot enqueue.")
            return False
        
        # Circular increment of rear
        self.rear = (self.rear + 1) % self.capacity
        self.queue[self.rear] = data
        self.count += 1
        
        print(f"Enqueued: {data} at index {self.rear}")
        return True
    
    def dequeue(self):
        """Remove and return element from front"""
        if self.is_empty():
            print("Queue Underflow! Cannot dequeue.")
            return None
        
        # Get front element
        data = self.queue[self.front]
        self.queue[self.front] = None  # Optional: clear position
        
        # Circular increment of front
        self.front = (self.front + 1) % self.capacity
        self.count -= 1
        
        print(f"Dequeued: {data}")
        return data
    
    def get_front(self):
        """Return front element without removing"""
        if self.is_empty():
            print("Queue is empty!")
            return None
        return self.queue[self.front]
    
    def get_rear(self):
        """Return rear element without removing"""
        if self.is_empty():
            print("Queue is empty!")
            return None
        return self.queue[self.rear]
    
    def size(self):
        """Return number of elements"""
        return self.count
    
    def display(self):
        """Display queue elements in order"""
        if self.is_empty():
            print("Queue is empty!")
            return
        
        print("Queue elements: ", end="")
        i = self.front
        for _ in range(self.count):
            print(self.queue[i], end=" ")
            i = (i + 1) % self.capacity
        print()
    
    def display_array(self):
        """Display actual array with indices"""
        print("Array representation:")
        print("Indices:", end=" ")
        for i in range(self.capacity):
            print(f"{i:3}", end=" ")
        print()
        print("Values: ", end=" ")
        for i in range(self.capacity):
            val = self.queue[i] if self.queue[i] is not None else "_"
            print(f"{val:3}", end=" ")
        print()
        print(f"Front: {self.front}, Rear: {self.rear}, Count: {self.count}")


# Example Usage
if __name__ == "__main__":
    print("=== Circular Queue Demo ===\n")
    
    cq = CircularQueue(5)
    
    # Enqueue operations
    print("--- Enqueue Operations ---")
    cq.enqueue(10)
    cq.enqueue(20)
    cq.enqueue(30)
    cq.enqueue(40)
    cq.display()
    cq.display_array()
    
    # Dequeue some elements
    print("\n--- Dequeue Operations ---")
    cq.dequeue()
    cq.dequeue()
    cq.display()
    cq.display_array()
    
    # Enqueue more (showing circular nature)
    print("\n--- Circular Enqueue ---")
    cq.enqueue(50)
    cq.enqueue(60)
    cq.enqueue(70)  # This wraps around!
    cq.display()
    cq.display_array()
    
    # Try to enqueue when full
    print("\n--- Try Overflow ---")
    cq.enqueue(80)  # Should fail
    
    # Front and rear
    print(f"\nFront element: {cq.get_front()}")
    print(f"Rear element: {cq.get_rear()}")
    print(f"Size: {cq.size()}")
```

### Output:
```
=== Circular Queue Demo ===

--- Enqueue Operations ---
Enqueued: 10 at index 0
Enqueued: 20 at index 1
Enqueued: 30 at index 2
Enqueued: 40 at index 3
Queue elements: 10 20 30 40 
Array representation:
Indices:   0   1   2   3   4 
Values:   10  20  30  40   _ 
Front: 0, Rear: 3, Count: 4

--- Dequeue Operations ---
Dequeued: 10
Dequeued: 20
Queue elements: 30 40 
Array representation:
Indices:   0   1   2   3   4 
Values:    _   _  30  40   _ 
Front: 2, Rear: 3, Count: 2

--- Circular Enqueue ---
Enqueued: 50 at index 4
Enqueued: 60 at index 0
Enqueued: 70 at index 1
Queue elements: 30 40 50 60 70 
Array representation:
Indices:   0   1   2   3   4 
Values:   60  70  30  40  50 
Front: 2, Rear: 1, Count: 5

--- Try Overflow ---
Queue Overflow! Cannot enqueue.

Front element: 30
Rear element: 70
Size: 5
```

---

## 💻 Implementation in C++

```cpp
#include <iostream>
using namespace std;

class CircularQueue {
private:
    int* arr;
    int capacity;
    int front;
    int rear;
    int count;

public:
    CircularQueue(int size) {
        capacity = size;
        arr = new int[capacity];
        front = 0;
        rear = -1;
        count = 0;
    }
    
    ~CircularQueue() {
        delete[] arr;
    }
    
    bool isEmpty() {
        return count == 0;
    }
    
    bool isFull() {
        return count == capacity;
    }
    
    void enqueue(int data) {
        if (isFull()) {
            cout << "Queue Overflow! Cannot enqueue " << data << endl;
            return;
        }
        
        rear = (rear + 1) % capacity;
        arr[rear] = data;
        count++;
        cout << "Enqueued: " << data << " at index " << rear << endl;
    }
    
    int dequeue() {
        if (isEmpty()) {
            cout << "Queue Underflow! Cannot dequeue." << endl;
            return -1;
        }
        
        int data = arr[front];
        front = (front + 1) % capacity;
        count--;
        cout << "Dequeued: " << data << endl;
        return data;
    }
    
    int getFront() {
        if (isEmpty()) {
            cout << "Queue is empty!" << endl;
            return -1;
        }
        return arr[front];
    }
    
    int getRear() {
        if (isEmpty()) {
            cout << "Queue is empty!" << endl;
            return -1;
        }
        return arr[rear];
    }
    
    int size() {
        return count;
    }
    
    void display() {
        if (isEmpty()) {
            cout << "Queue is empty!" << endl;
            return;
        }
        
        cout << "Queue elements: ";
        int i = front;
        for (int j = 0; j < count; j++) {
            cout << arr[i] << " ";
            i = (i + 1) % capacity;
        }
        cout << endl;
    }
};

int main() {
    CircularQueue cq(5);
    
    cq.enqueue(10);
    cq.enqueue(20);
    cq.enqueue(30);
    cq.display();
    
    cq.dequeue();
    cq.dequeue();
    
    cq.enqueue(40);
    cq.enqueue(50);
    cq.enqueue(60);
    cq.enqueue(70);  // Wraps around
    cq.display();
    
    return 0;
}
```

---

## 📊 Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Enqueue | O(1) | O(1) |
| Dequeue | O(1) | O(1) |
| Front | O(1) | O(1) |
| Rear | O(1) | O(1) |
| isEmpty | O(1) | O(1) |
| isFull | O(1) | O(1) |
| size | O(1) | O(1) |

**Overall Space:** O(n) where n is capacity

---

## 🔑 Key Advantages

### 1. **No False Overflow**
```
Simple Queue: [_, _, _, X, X]  ← Cannot add more
Circular Queue: [Y, Y, _, X, X]  ← Can reuse space!
```

### 2. **Efficient Space Utilization**
- All array positions can be used
- No wasted space at the beginning

### 3. **Constant Time Operations**
- All operations remain O(1)
- No shifting of elements needed

### 4. **Fixed Memory**
- Predictable memory usage
- Good for embedded systems

---

## ⚠️ Important Considerations

### Full vs Empty Condition:

**Problem:** How to distinguish between full and empty?

```
Scenario 1: Empty Queue
front = 0, rear = -1

Scenario 2: Full Queue (after operations)
front = 0, rear = capacity - 1

But after circular operations:
front = 1, rear = 0 (could mean full OR empty!)
```

### Solutions:

**Solution 1: Use Count Variable** (Recommended)
```python
isEmpty: count == 0
isFull: count == capacity
```

**Solution 2: Waste One Slot**
```python
isEmpty: front == rear
isFull: (rear + 1) % capacity == front
# One slot always remains empty
```

**Solution 3: Use Flag**
```python
isEmpty: flag == EMPTY
isFull: flag == FULL
```

---

## 🎯 Common Patterns

### Pattern 1: Circular Buffer
```
Used in:
- Audio/video streaming
- Producer-consumer problems
- Network packet buffers
```

### Pattern 2: Round-Robin Scheduling
```
Used in:
- CPU scheduling
- Resource allocation
- Task distribution
```

### Pattern 3: Sliding Window
```
Used in:
- Moving average calculation
- Data stream processing
- Real-time analytics
```

---

## 🧪 Edge Cases to Test

```python
def test_circular_queue():
    cq = CircularQueue(3)
    
    # Test 1: Empty queue operations
    assert cq.is_empty() == True
    assert cq.dequeue() == None
    
    # Test 2: Fill completely
    cq.enqueue(1)
    cq.enqueue(2)
    cq.enqueue(3)
    assert cq.is_full() == True
    
    # Test 3: Overflow
    assert cq.enqueue(4) == False
    
    # Test 4: Circular behavior
    cq.dequeue()  # Remove 1
    cq.enqueue(4)  # Add at beginning
    assert cq.get_front() == 2
    
    # Test 5: Complete empty
    cq.dequeue()
    cq.dequeue()
    cq.dequeue()
    assert cq.is_empty() == True

test_circular_queue()
```

---

## 💡 Pro Tips

### Tip 1: Always Use Modulo for Circular Indexing
```python
# ✅ Correct
rear = (rear + 1) % capacity

# ❌ Wrong
rear = rear + 1
if rear >= capacity:
    rear = 0
```

### Tip 2: Initialize rear = -1 for Cleaner Logic
```python
# With rear = -1 initially
rear = (rear + 1) % capacity  # First element goes to index 0
```

### Tip 3: Use Count Variable for Simplicity
```python
# Simplifies full/empty checks
# No ambiguity between states
```

### Tip 4: Display Array State for Debugging
```python
# Helps visualize circular wrapping
print(f"Array: {queue}")
print(f"Front: {front}, Rear: {rear}")
```

---

## 🎓 Practice Problems

1. **Implement circular queue** without count variable (using one-slot-wasted method)
2. **Circular queue with resize** - double capacity when full
3. **Find maximum in sliding window** using circular queue
4. **Implement circular buffer** for streaming data
5. **Multi-level circular queue** for priority scheduling

---

## 🚀 Real-World Applications

### 1. **Operating Systems**
- CPU scheduling (Round Robin)
- Memory buffer management
- Printer queue

### 2. **Networking**
- Packet buffering
- Data transmission
- Router queues

### 3. **Multimedia**
- Audio/video playback buffers
- Streaming services
- Real-time processing

### 4. **Gaming**
- Event queues
- Command buffers
- Turn-based systems

---

## 🔗 Next Steps

Now that you understand circular queues:

1. **[Learn about Deques →](./05-Deque.md)**
2. **Implement sliding window problems**
3. **Practice circular queue variations**
4. **Compare with simple and linked list queues**

---

**Key Takeaway:** Circular queues solve the false overflow problem and maximize space utilization - essential for fixed-size buffers! 🔄

[← Back: Linked List Implementation](./03-Linked-List-Implementation.md) | [Back to Chapter Overview](./README.md) | [Next: Deque →](./05-Deque.md)
