# Stack Implementation 🛠️

## Implementation Approaches

Stacks can be implemented in two primary ways:
1. **Array-based** (Static or Dynamic)
2. **Linked List-based**

Each approach has its own advantages and trade-offs.

---

## 1. Array-Based Stack Implementation

### Static Array Implementation (Fixed Size)

```python
class ArrayStack:
    """
    Fixed-size stack using array
    """
    def __init__(self, capacity=10):
        self.capacity = capacity
        self.stack = [None] * capacity
        self.top = -1  # Index of top element
    
    def is_empty(self):
        """Check if stack is empty - O(1)"""
        return self.top == -1
    
    def is_full(self):
        """Check if stack is full - O(1)"""
        return self.top == self.capacity - 1
    
    def push(self, item):
        """Push item to stack - O(1)"""
        if self.is_full():
            raise Exception("Stack Overflow - Cannot push")
        
        self.top += 1
        self.stack[self.top] = item
        print(f"Pushed {item}")
    
    def pop(self):
        """Pop item from stack - O(1)"""
        if self.is_empty():
            raise Exception("Stack Underflow - Cannot pop")
        
        item = self.stack[self.top]
        self.stack[self.top] = None  # Optional: clear reference
        self.top -= 1
        return item
    
    def peek(self):
        """Get top item without removing - O(1)"""
        if self.is_empty():
            raise Exception("Stack is empty")
        return self.stack[self.top]
    
    def size(self):
        """Get number of elements - O(1)"""
        return self.top + 1
    
    def display(self):
        """Display stack contents"""
        if self.is_empty():
            print("Stack is empty")
        else:
            print("Stack (bottom to top):", end=" ")
            for i in range(self.top + 1):
                print(self.stack[i], end=" ")
            print()


# Usage Example
stack = ArrayStack(capacity=5)
stack.push(10)
stack.push(20)
stack.push(30)
print(f"Top: {stack.peek()}")  # 30
print(f"Size: {stack.size()}")  # 3
stack.display()  # 10 20 30
```

### Dynamic Array Implementation (Resizable)

```python
class DynamicArrayStack:
    """
    Dynamic stack that resizes automatically
    """
    def __init__(self, initial_capacity=4):
        self.capacity = initial_capacity
        self.stack = [None] * self.capacity
        self.top = -1
    
    def _resize(self, new_capacity):
        """Resize internal array - O(n)"""
        new_stack = [None] * new_capacity
        for i in range(self.top + 1):
            new_stack[i] = self.stack[i]
        self.stack = new_stack
        self.capacity = new_capacity
        print(f"Resized to capacity {new_capacity}")
    
    def push(self, item):
        """Push with auto-resize - Amortized O(1)"""
        # Double capacity if full
        if self.top == self.capacity - 1:
            self._resize(self.capacity * 2)
        
        self.top += 1
        self.stack[self.top] = item
    
    def pop(self):
        """Pop with auto-shrink - Amortized O(1)"""
        if self.top == -1:
            raise Exception("Stack Underflow")
        
        item = self.stack[self.top]
        self.stack[self.top] = None
        self.top -= 1
        
        # Shrink if less than 1/4 full
        if self.top > 0 and self.top < self.capacity // 4:
            self._resize(self.capacity // 2)
        
        return item
    
    def peek(self):
        """Get top element - O(1)"""
        if self.top == -1:
            raise Exception("Stack is empty")
        return self.stack[self.top]
    
    def is_empty(self):
        """Check if empty - O(1)"""
        return self.top == -1
    
    def size(self):
        """Get size - O(1)"""
        return self.top + 1
```

---

## 2. Linked List-Based Stack Implementation

### Node Class

```python
class Node:
    """Node for linked list-based stack"""
    def __init__(self, data):
        self.data = data
        self.next = None
```

### Linked Stack Implementation

```python
class LinkedStack:
    """
    Stack implementation using singly linked list
    - No size limit (only limited by memory)
    - No resizing overhead
    """
    def __init__(self):
        self.top = None  # Reference to top node
        self._size = 0
    
    def is_empty(self):
        """Check if stack is empty - O(1)"""
        return self.top is None
    
    def push(self, item):
        """Push item to stack - O(1)"""
        new_node = Node(item)
        new_node.next = self.top
        self.top = new_node
        self._size += 1
        print(f"Pushed {item}")
    
    def pop(self):
        """Pop item from stack - O(1)"""
        if self.is_empty():
            raise Exception("Stack Underflow")
        
        item = self.top.data
        self.top = self.top.next
        self._size -= 1
        return item
    
    def peek(self):
        """Get top item - O(1)"""
        if self.is_empty():
            raise Exception("Stack is empty")
        return self.top.data
    
    def size(self):
        """Get number of elements - O(1)"""
        return self._size
    
    def display(self):
        """Display stack contents - O(n)"""
        if self.is_empty():
            print("Stack is empty")
            return
        
        print("Stack (top to bottom):", end=" ")
        current = self.top
        while current:
            print(current.data, end=" → " if current.next else "\n")
            current = current.next


# Usage Example
stack = LinkedStack()
stack.push(10)
stack.push(20)
stack.push(30)
print(f"Top: {stack.peek()}")  # 30
print(f"Popped: {stack.pop()}")  # 30
stack.display()  # 20 → 10
```

**Visualization**:
```
Initial:  top → None

After push(10):
top → [10|●] → None

After push(20):
top → [20|●] → [10|●] → None

After push(30):
top → [30|●] → [20|●] → [10|●] → None

After pop():
top → [20|●] → [10|●] → None
```

---

## Complete Implementation (All Languages)

### Python Implementation

```python
class Stack:
    """Complete Python Stack Implementation"""
    def __init__(self):
        self.items = []
    
    def push(self, item):
        """O(1)"""
        self.items.append(item)
    
    def pop(self):
        """O(1)"""
        if not self.items:
            raise IndexError("pop from empty stack")
        return self.items.pop()
    
    def peek(self):
        """O(1)"""
        if not self.items:
            raise IndexError("peek from empty stack")
        return self.items[-1]
    
    def is_empty(self):
        """O(1)"""
        return len(self.items) == 0
    
    def size(self):
        """O(1)"""
        return len(self.items)
    
    def __str__(self):
        """String representation"""
        return f"Stack({self.items})"
```

### C++ Implementation

```cpp
#include <iostream>
#include <stdexcept>
using namespace std;

template <typename T>
class Stack {
private:
    struct Node {
        T data;
        Node* next;
        Node(T val) : data(val), next(nullptr) {}
    };
    
    Node* topNode;
    int count;

public:
    Stack() : topNode(nullptr), count(0) {}
    
    ~Stack() {
        while (!isEmpty()) {
            pop();
        }
    }
    
    // Push element - O(1)
    void push(T item) {
        Node* newNode = new Node(item);
        newNode->next = topNode;
        topNode = newNode;
        count++;
    }
    
    // Pop element - O(1)
    T pop() {
        if (isEmpty()) {
            throw runtime_error("Stack Underflow");
        }
        Node* temp = topNode;
        T item = temp->data;
        topNode = topNode->next;
        delete temp;
        count--;
        return item;
    }
    
    // Peek top element - O(1)
    T peek() const {
        if (isEmpty()) {
            throw runtime_error("Stack is empty");
        }
        return topNode->data;
    }
    
    // Check if empty - O(1)
    bool isEmpty() const {
        return topNode == nullptr;
    }
    
    // Get size - O(1)
    int size() const {
        return count;
    }
    
    // Display stack
    void display() const {
        if (isEmpty()) {
            cout << "Stack is empty" << endl;
            return;
        }
        cout << "Stack (top to bottom): ";
        Node* current = topNode;
        while (current != nullptr) {
            cout << current->data;
            if (current->next != nullptr) cout << " -> ";
            current = current->next;
        }
        cout << endl;
    }
};

// Usage Example
int main() {
    Stack<int> stack;
    
    stack.push(10);
    stack.push(20);
    stack.push(30);
    
    stack.display();  // 30 -> 20 -> 10
    
    cout << "Top: " << stack.peek() << endl;  // 30
    cout << "Popped: " << stack.pop() << endl;  // 30
    cout << "Size: " << stack.size() << endl;  // 2
    
    return 0;
}
```

### Java Implementation

```java
import java.util.EmptyStackException;

public class Stack<T> {
    private class Node {
        T data;
        Node next;
        
        Node(T data) {
            this.data = data;
            this.next = null;
        }
    }
    
    private Node top;
    private int size;
    
    public Stack() {
        this.top = null;
        this.size = 0;
    }
    
    // Push element - O(1)
    public void push(T item) {
        Node newNode = new Node(item);
        newNode.next = top;
        top = newNode;
        size++;
    }
    
    // Pop element - O(1)
    public T pop() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        T item = top.data;
        top = top.next;
        size--;
        return item;
    }
    
    // Peek top element - O(1)
    public T peek() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return top.data;
    }
    
    // Check if empty - O(1)
    public boolean isEmpty() {
        return top == null;
    }
    
    // Get size - O(1)
    public int size() {
        return size;
    }
    
    // Display stack
    public void display() {
        if (isEmpty()) {
            System.out.println("Stack is empty");
            return;
        }
        System.out.print("Stack (top to bottom): ");
        Node current = top;
        while (current != null) {
            System.out.print(current.data);
            if (current.next != null) System.out.print(" -> ");
            current = current.next;
        }
        System.out.println();
    }
    
    // Usage Example
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        
        stack.push(10);
        stack.push(20);
        stack.push(30);
        
        stack.display();  // 30 -> 20 -> 10
        
        System.out.println("Top: " + stack.peek());  // 30
        System.out.println("Popped: " + stack.pop());  // 30
        System.out.println("Size: " + stack.size());  // 2
    }
}
```

---

## Comparison: Array vs Linked List

| Feature | Array-Based | Linked List-Based |
|---------|-------------|-------------------|
| **Memory** | Contiguous block | Scattered nodes |
| **Cache Performance** | Better (locality) | Worse (scattered) |
| **Size Limit** | Fixed (static) or needs resize | No limit (dynamic) |
| **Memory Overhead** | Low | Higher (extra pointers) |
| **Resizing** | Expensive O(n) | Not needed |
| **Push/Pop** | O(1) (amortized for dynamic) | O(1) always |
| **Memory Usage** | May waste space | Uses exact space needed |
| **Implementation** | Simpler | Slightly more complex |

### When to Use Each

**Use Array-Based When:**
✅ Maximum size is known  
✅ Cache performance is critical  
✅ Memory overhead must be minimal  
✅ Simple implementation preferred  

**Use Linked List-Based When:**
✅ Size is unpredictable  
✅ Frequent push/pop operations  
✅ No resizing overhead acceptable  
✅ Memory fragmentation is okay  

---

## Time and Space Complexity Analysis

### Array-Based Stack

| Operation | Best Case | Average Case | Worst Case | Space |
|-----------|-----------|--------------|------------|-------|
| Push      | O(1)      | O(1)*        | O(n)       | O(1)  |
| Pop       | O(1)      | O(1)         | O(1)       | O(1)  |
| Peek      | O(1)      | O(1)         | O(1)       | O(1)  |
| Search    | O(1)      | O(n)         | O(n)       | O(1)  |

*Amortized O(1) for dynamic array (occasional O(n) resize)

### Linked List-Based Stack

| Operation | Best Case | Average Case | Worst Case | Space |
|-----------|-----------|--------------|------------|-------|
| Push      | O(1)      | O(1)         | O(1)       | O(1)  |
| Pop       | O(1)      | O(1)         | O(1)       | O(1)  |
| Peek      | O(1)      | O(1)         | O(1)       | O(1)  |
| Search    | O(1)      | O(n)         | O(n)       | O(1)  |

---

## Advanced: Amortized Analysis for Dynamic Array

### Push Operation Cost

```
Sequence of n pushes:
- Most pushes: O(1)
- Resize happens at powers of 2: 1, 2, 4, 8, 16, ..., n

Total cost = n + (1 + 2 + 4 + 8 + ... + n)
           = n + (2n - 1)
           = 3n - 1
           = O(n)

Amortized cost per push = O(n) / n = O(1)
```

### Example Trace

```
Capacity: 1  → Push(1)         Cost: 1
Capacity: 2  → Push(2), Resize Cost: 2 + 1 = 3
Capacity: 4  → Push(3), Resize Cost: 4 + 2 = 6
Capacity: 8  → Push(4), Resize Cost: 8 + 4 = 12

Total cost for 8 pushes ≈ 15
Average cost per push = 15/8 ≈ 1.875 ≈ O(1)
```

---

## Memory Layout Visualization

### Array-Based Stack
```
Memory Address:  1000    1004    1008    1012    1016
                 [10]    [20]    [30]    [NULL]  [NULL]
                  ↑                ↑
                base              top
```

### Linked List-Based Stack
```
Stack Object:    top → [30|addr1]
                         ↓
                      [20|addr2]
                         ↓
                      [10|NULL]

Memory addresses are not contiguous
```

---

## Practice Problems

1. **Implement stack with getMin() in O(1)**
2. **Implement two stacks in one array**
3. **Implement stack using queues**
4. **Sort a stack using recursion**
5. **Reverse a stack without extra space**

---

**Next:** Continue to [03-Stack-Applications.md](03-Stack-Applications.md) to see real-world uses of stacks!
