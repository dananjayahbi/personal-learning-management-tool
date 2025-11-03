# Array-Based Queue Implementation

## 🎯 Learning Objectives

By the end of this section, you will:
- Implement a queue using arrays
- Understand the limitations of simple array-based queues
- Handle overflow and underflow conditions
- Code queue operations in Python, C++, and Java
- Analyze space complexity and efficiency

---

## 📖 Overview

An **array-based queue** uses a static or dynamic array to store elements. Two pointers (or indices) track the **front** and **rear** of the queue.

### Advantages:
✅ Simple to implement  
✅ Fast access with indices  
✅ Cache-friendly (contiguous memory)  
✅ Predictable memory usage

### Disadvantages:
❌ Fixed size (for static arrays)  
❌ Can waste space (false overflow in simple implementation)  
❌ Resizing overhead (for dynamic arrays)  
❌ Not efficient for frequent resizing

---

## 🛠️ Implementation Approach

### Simple Queue Using Array

In a simple array-based queue:
- **front**: Index of the first element
- **rear**: Index of the last element
- Elements are added at `rear` and removed from `front`

### Initial State:
```
Array: [_, _, _, _, _]  (size = 5)
front = -1
rear = -1
```

### After Enqueue Operations:
```
Enqueue(10): [10, _, _, _, _]  front=0, rear=0
Enqueue(20): [10, 20, _, _, _]  front=0, rear=1
Enqueue(30): [10, 20, 30, _, _]  front=0, rear=2
```

### After Dequeue Operations:
```
Dequeue(): [_, 20, 30, _, _]  front=1, rear=2 (10 removed)
Dequeue(): [_, _, 30, _, _]  front=2, rear=2 (20 removed)
```

### Problem: False Overflow
```
After more operations:
[_, _, _, 40, 50]  front=3, rear=4

Try Enqueue(60): rear=4 is at end, but positions 0-2 are empty!
This is called "false overflow" - queue appears full but has space.
```

**Solution:** Use a **Circular Queue** (covered in next section)

---

## 💻 Implementation in Python

### Simple Array-Based Queue

```python
class Queue:
    def __init__(self, capacity):
        """Initialize queue with given capacity"""
        self.capacity = capacity
        self.queue = [None] * capacity
        self.front = -1
        self.rear = -1
        self.size = 0
    
    def is_empty(self):
        """Check if queue is empty"""
        return self.size == 0
    
    def is_full(self):
        """Check if queue is full"""
        return self.size == self.capacity
    
    def enqueue(self, data):
        """Add element to rear of queue"""
        if self.is_full():
            print("Queue Overflow! Cannot enqueue.")
            return False
        
        # If queue is empty, set front to 0
        if self.front == -1:
            self.front = 0
        
        # Move rear forward and add element
        self.rear += 1
        self.queue[self.rear] = data
        self.size += 1
        print(f"Enqueued: {data}")
        return True
    
    def dequeue(self):
        """Remove and return element from front"""
        if self.is_empty():
            print("Queue Underflow! Cannot dequeue.")
            return None
        
        # Get front element
        data = self.queue[self.front]
        self.queue[self.front] = None  # Optional: clear the position
        
        # Move front forward
        self.front += 1
        self.size -= 1
        
        # Reset queue if it becomes empty
        if self.is_empty():
            self.front = -1
            self.rear = -1
        
        print(f"Dequeued: {data}")
        return data
    
    def get_front(self):
        """Return front element without removing it"""
        if self.is_empty():
            print("Queue is empty!")
            return None
        return self.queue[self.front]
    
    def get_rear(self):
        """Return rear element without removing it"""
        if self.is_empty():
            print("Queue is empty!")
            return None
        return self.queue[self.rear]
    
    def get_size(self):
        """Return the number of elements in queue"""
        return self.size
    
    def display(self):
        """Display all elements in queue"""
        if self.is_empty():
            print("Queue is empty!")
            return
        
        print("Queue elements:", end=" ")
        for i in range(self.front, self.rear + 1):
            print(self.queue[i], end=" ")
        print()


# Example Usage
if __name__ == "__main__":
    q = Queue(5)
    
    # Enqueue operations
    q.enqueue(10)
    q.enqueue(20)
    q.enqueue(30)
    q.display()  # Output: 10 20 30
    
    # Check front and rear
    print(f"Front: {q.get_front()}")  # Output: 10
    print(f"Rear: {q.get_rear()}")    # Output: 30
    
    # Dequeue operations
    q.dequeue()  # Removes 10
    q.dequeue()  # Removes 20
    q.display()  # Output: 30
    
    # More operations
    q.enqueue(40)
    q.enqueue(50)
    q.display()  # Output: 30 40 50
```

### Output:
```
Enqueued: 10
Enqueued: 20
Enqueued: 30
Queue elements: 10 20 30 
Front: 10
Rear: 30
Dequeued: 10
Dequeued: 20
Queue elements: 30 
Enqueued: 40
Enqueued: 50
Queue elements: 30 40 50 
```

---

## 💻 Implementation in C++

```cpp
#include <iostream>
using namespace std;

class Queue {
private:
    int* arr;
    int capacity;
    int front;
    int rear;
    int count;

public:
    // Constructor
    Queue(int size) {
        arr = new int[size];
        capacity = size;
        front = 0;
        rear = -1;
        count = 0;
    }
    
    // Destructor
    ~Queue() {
        delete[] arr;
    }
    
    // Check if queue is empty
    bool isEmpty() {
        return count == 0;
    }
    
    // Check if queue is full
    bool isFull() {
        return count == capacity;
    }
    
    // Add element to queue
    void enqueue(int data) {
        if (isFull()) {
            cout << "Queue Overflow! Cannot enqueue " << data << endl;
            return;
        }
        
        rear = (rear + 1) % capacity;  // Circular increment
        arr[rear] = data;
        count++;
        cout << "Enqueued: " << data << endl;
    }
    
    // Remove element from queue
    int dequeue() {
        if (isEmpty()) {
            cout << "Queue Underflow! Cannot dequeue." << endl;
            return -1;
        }
        
        int data = arr[front];
        front = (front + 1) % capacity;  // Circular increment
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
        return arr[front];
    }
    
    // Get rear element
    int getRear() {
        if (isEmpty()) {
            cout << "Queue is empty!" << endl;
            return -1;
        }
        return arr[rear];
    }
    
    // Get size of queue
    int size() {
        return count;
    }
    
    // Display queue elements
    void display() {
        if (isEmpty()) {
            cout << "Queue is empty!" << endl;
            return;
        }
        
        cout << "Queue elements: ";
        for (int i = 0; i < count; i++) {
            int index = (front + i) % capacity;
            cout << arr[index] << " ";
        }
        cout << endl;
    }
};

// Example Usage
int main() {
    Queue q(5);
    
    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    q.display();
    
    cout << "Front: " << q.getFront() << endl;
    cout << "Rear: " << q.getRear() << endl;
    
    q.dequeue();
    q.dequeue();
    q.display();
    
    q.enqueue(40);
    q.enqueue(50);
    q.enqueue(60);
    q.display();
    
    return 0;
}
```

---

## 💻 Implementation in Java

```java
public class Queue {
    private int[] arr;
    private int capacity;
    private int front;
    private int rear;
    private int count;
    
    // Constructor
    public Queue(int size) {
        arr = new int[size];
        capacity = size;
        front = 0;
        rear = -1;
        count = 0;
    }
    
    // Check if queue is empty
    public boolean isEmpty() {
        return count == 0;
    }
    
    // Check if queue is full
    public boolean isFull() {
        return count == capacity;
    }
    
    // Add element to queue
    public void enqueue(int data) {
        if (isFull()) {
            System.out.println("Queue Overflow! Cannot enqueue " + data);
            return;
        }
        
        rear = (rear + 1) % capacity;  // Circular increment
        arr[rear] = data;
        count++;
        System.out.println("Enqueued: " + data);
    }
    
    // Remove element from queue
    public int dequeue() {
        if (isEmpty()) {
            System.out.println("Queue Underflow! Cannot dequeue.");
            return -1;
        }
        
        int data = arr[front];
        front = (front + 1) % capacity;  // Circular increment
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
        return arr[front];
    }
    
    // Get rear element
    public int getRear() {
        if (isEmpty()) {
            System.out.println("Queue is empty!");
            return -1;
        }
        return arr[rear];
    }
    
    // Get size of queue
    public int size() {
        return count;
    }
    
    // Display queue elements
    public void display() {
        if (isEmpty()) {
            System.out.println("Queue is empty!");
            return;
        }
        
        System.out.print("Queue elements: ");
        for (int i = 0; i < count; i++) {
            int index = (front + i) % capacity;
            System.out.print(arr[index] + " ");
        }
        System.out.println();
    }
    
    // Example Usage
    public static void main(String[] args) {
        Queue q = new Queue(5);
        
        q.enqueue(10);
        q.enqueue(20);
        q.enqueue(30);
        q.display();
        
        System.out.println("Front: " + q.getFront());
        System.out.println("Rear: " + q.getRear());
        
        q.dequeue();
        q.dequeue();
        q.display();
        
        q.enqueue(40);
        q.enqueue(50);
        q.enqueue(60);
        q.display();
    }
}
```

---

## 📊 Complexity Analysis

### Time Complexity:

| Operation | Best Case | Average Case | Worst Case |
|-----------|-----------|--------------|------------|
| Enqueue | O(1) | O(1) | O(1)* |
| Dequeue | O(1) | O(1) | O(1) |
| Front | O(1) | O(1) | O(1) |
| Rear | O(1) | O(1) | O(1) |
| isEmpty | O(1) | O(1) | O(1) |
| isFull | O(1) | O(1) | O(1) |

*O(n) if dynamic resizing is needed

### Space Complexity:
- **Fixed-size array:** O(n) where n is capacity
- **Dynamic array:** O(n) where n is current capacity
- **Auxiliary space per operation:** O(1)

---

## 🔍 Common Operations Step-by-Step

### Enqueue Operation:
```
Step 1: Check if queue is full
   if (rear == capacity - 1) → Overflow
   
Step 2: If queue is empty, set front = 0

Step 3: Increment rear
   rear = rear + 1

Step 4: Insert element
   arr[rear] = data

Step 5: Increment size
   size = size + 1
```

### Dequeue Operation:
```
Step 1: Check if queue is empty
   if (front == -1 or size == 0) → Underflow
   
Step 2: Store front element
   data = arr[front]

Step 3: Increment front
   front = front + 1

Step 4: Decrement size
   size = size - 1

Step 5: If queue becomes empty, reset
   if (size == 0) → front = -1, rear = -1

Step 6: Return data
```

---

## ⚠️ Edge Cases to Handle

### 1. Empty Queue Operations
```python
# Attempting to dequeue from empty queue
q = Queue(5)
q.dequeue()  # Should print: "Queue Underflow!"
```

### 2. Full Queue Operations
```python
# Attempting to enqueue into full queue
q = Queue(3)
q.enqueue(10)
q.enqueue(20)
q.enqueue(30)
q.enqueue(40)  # Should print: "Queue Overflow!"
```

### 3. Single Element
```python
q = Queue(5)
q.enqueue(10)
q.dequeue()  # Should properly reset front and rear
```

### 4. Alternating Operations
```python
q = Queue(5)
q.enqueue(10)
q.dequeue()
q.enqueue(20)
q.dequeue()  # Should handle correctly
```

---

## 🎯 Limitations of Simple Array Queue

### Problem 1: Wasted Space
```
After several enqueue/dequeue operations:
[_, _, _, 40, 50]  front=3, rear=4

Positions 0-2 are wasted, but we can't use them!
```

### Problem 2: False Overflow
```
Queue appears full when rear reaches end,
even if there's space at the beginning.
```

### Problem 3: Linear Growth Only
```
Can't reuse freed space at the beginning
without shifting all elements (expensive!).
```

### Solution: Circular Queue
The circular queue solves these problems by treating the array as circular. We'll cover this in the next section!

---

## 💡 Optimization Tips

### Tip 1: Use Circular Increment
```python
rear = (rear + 1) % capacity  # Wraps around to 0
```

### Tip 2: Track Count Separately
```python
# Instead of calculating size from front and rear
# Keep a separate count variable for O(1) size()
```

### Tip 3: Clear Dequeued Positions (Optional)
```python
# Helps with debugging and memory management
arr[front] = None  # Python
arr[front] = 0;    // C++/Java
```

### Tip 4: Dynamic Resizing (Advanced)
```python
# Double capacity when full
if self.is_full():
    self.resize(2 * self.capacity)
```

---

## 🧪 Testing Your Implementation

### Test Case 1: Basic Operations
```python
q = Queue(5)
assert q.is_empty() == True
q.enqueue(10)
assert q.get_front() == 10
assert q.is_empty() == False
```

### Test Case 2: Overflow/Underflow
```python
q = Queue(2)
q.enqueue(1)
q.enqueue(2)
assert q.is_full() == True
q.enqueue(3)  # Should fail
q.dequeue()
q.dequeue()
assert q.is_empty() == True
q.dequeue()  # Should fail
```

### Test Case 3: Sequential Operations
```python
q = Queue(3)
q.enqueue(1)
q.enqueue(2)
assert q.dequeue() == 1
q.enqueue(3)
assert q.dequeue() == 2
assert q.dequeue() == 3
```

---

## 🎓 Practice Exercises

1. **Implement `resize()` method** to double queue capacity when full
2. **Add `clear()` method** to remove all elements
3. **Implement `toList()` method** to return queue elements as a list
4. **Create `reverse()` method** to reverse the queue
5. **Add `contains()` method** to check if element exists

---

## 🚀 Next Steps

Now that you understand array-based queues, you're ready to:

1. **[Learn Linked List Implementation →](./03-Linked-List-Implementation.md)**
2. **[Explore Circular Queues →](./04-Circular-Queue.md)**
3. **Compare different implementations**
4. **Solve practice problems**

---

**Key Takeaway:** Array-based queues are simple and efficient but suffer from false overflow. Circular queues solve this problem! 🎯

[← Back: Queue Fundamentals](./01-Queue-Fundamentals.md) | [Back to Chapter Overview](./README.md) | [Next: Linked List Implementation →](./03-Linked-List-Implementation.md)
