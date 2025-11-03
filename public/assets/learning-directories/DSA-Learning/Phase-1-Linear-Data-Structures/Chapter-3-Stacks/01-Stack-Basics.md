# Stack Basics 📚

## What is a Stack?

A **Stack** is a linear data structure that follows the **Last In, First Out (LIFO)** principle. This means the last element added to the stack will be the first one to be removed.

### Real-World Analogies

1. **Stack of Plates** 🍽️
   - You add plates on top
   - You remove plates from the top
   - You cannot remove the bottom plate without removing all plates above it

2. **Browser History** 🌐
   - Each page visit is pushed onto the stack
   - Clicking "Back" pops the most recent page

3. **Undo Feature** ↩️
   - Each action is pushed onto the stack
   - "Undo" pops the last action

4. **Function Calls** 📞
   - When a function is called, it's pushed onto the call stack
   - When it returns, it's popped from the stack

---

## Stack Terminology

### Core Operations

| Operation | Description | Analogy |
|-----------|-------------|---------|
| **Push** | Add element to top of stack | Place plate on top |
| **Pop** | Remove element from top of stack | Remove top plate |
| **Peek/Top** | View top element without removing | Look at top plate |
| **isEmpty** | Check if stack is empty | Check if no plates |
| **Size** | Get number of elements | Count plates |

### Stack States

```
Empty Stack:        Push(10):          Push(20):          Push(30):
   |_|                 |_|                |_|                |_|
                       |10|               |20|               |30|
                       |__|               |10|               |20|
                                         |__|               |10|
                                                           |__|

Pop():              Pop():             Pop():
   |_|                |_|                |_|
   |20|               |10|
   |10|               |__|
   |__|
```

---

## LIFO Principle in Detail

### Stack Behavior

```
Operation Sequence:
Push(1) → Push(2) → Push(3) → Pop() → Push(4) → Pop() → Pop()

Step-by-step visualization:

Initial:  []
Push(1):  [1]
Push(2):  [1, 2]
Push(3):  [1, 2, 3]
Pop():    [1, 2]        (removed 3)
Push(4):  [1, 2, 4]
Pop():    [1, 2]        (removed 4)
Pop():    [1]           (removed 2)
```

### Key Characteristics

✅ **Access**: Only top element is accessible  
✅ **Insertion**: Always at the top (O(1))  
✅ **Deletion**: Always from the top (O(1))  
✅ **Search**: Requires popping elements (O(n))  

---

## Stack Abstract Data Type (ADT)

### Interface Definition

```python
class StackADT:
    """
    Abstract Stack Interface
    """
    def push(self, item):
        """Add item to top of stack"""
        pass
    
    def pop(self):
        """Remove and return top item"""
        pass
    
    def peek(self):
        """Return top item without removing"""
        pass
    
    def is_empty(self):
        """Check if stack is empty"""
        pass
    
    def size(self):
        """Return number of items"""
        pass
```

```cpp
// C++ Stack ADT
template <typename T>
class Stack {
public:
    virtual void push(T item) = 0;
    virtual T pop() = 0;
    virtual T peek() = 0;
    virtual bool isEmpty() = 0;
    virtual int size() = 0;
};
```

```java
// Java Stack ADT
public interface Stack<T> {
    void push(T item);
    T pop();
    T peek();
    boolean isEmpty();
    int size();
}
```

---

## Basic Stack Operations Explained

### 1. Push Operation

**Purpose**: Add element to the top of the stack

```python
def push(self, item):
    """
    Time Complexity: O(1)
    Space Complexity: O(1)
    """
    self.items.append(item)
    print(f"Pushed {item} onto stack")
```

**Visualization**:
```
Before Push(50):    After Push(50):
    |_|                |_|
    |30|               |50|  ← New top
    |20|               |30|
    |10|               |20|
    |__|               |10|
                       |__|
```

### 2. Pop Operation

**Purpose**: Remove and return the top element

```python
def pop(self):
    """
    Time Complexity: O(1)
    Space Complexity: O(1)
    Raises: Exception if stack is empty
    """
    if self.is_empty():
        raise Exception("Stack is empty - cannot pop")
    
    item = self.items.pop()
    print(f"Popped {item} from stack")
    return item
```

**Visualization**:
```
Before Pop():       After Pop():
    |_|                |_|
    |50|  ← Remove     |30|  ← New top
    |30|               |20|
    |20|               |10|
    |10|               |__|
    |__|
```

### 3. Peek/Top Operation

**Purpose**: View the top element without removing it

```python
def peek(self):
    """
    Time Complexity: O(1)
    Space Complexity: O(1)
    Raises: Exception if stack is empty
    """
    if self.is_empty():
        raise Exception("Stack is empty - cannot peek")
    
    return self.items[-1]
```

### 4. isEmpty Operation

**Purpose**: Check if stack has no elements

```python
def is_empty(self):
    """
    Time Complexity: O(1)
    Space Complexity: O(1)
    """
    return len(self.items) == 0
```

### 5. Size Operation

**Purpose**: Get the count of elements

```python
def size(self):
    """
    Time Complexity: O(1)
    Space Complexity: O(1)
    """
    return len(self.items)
```

---

## Complete Basic Stack Example

```python
class SimpleStack:
    """
    Basic Stack Implementation using Python List
    """
    def __init__(self):
        self.items = []
    
    def push(self, item):
        """Add item to top"""
        self.items.append(item)
    
    def pop(self):
        """Remove and return top item"""
        if self.is_empty():
            raise Exception("Stack Underflow")
        return self.items.pop()
    
    def peek(self):
        """Return top item without removing"""
        if self.is_empty():
            raise Exception("Stack is empty")
        return self.items[-1]
    
    def is_empty(self):
        """Check if stack is empty"""
        return len(self.items) == 0
    
    def size(self):
        """Return number of items"""
        return len(self.items)
    
    def display(self):
        """Display stack contents"""
        if self.is_empty():
            print("Stack is empty")
        else:
            print("Stack (top to bottom):", self.items[::-1])


# Usage Example
if __name__ == "__main__":
    stack = SimpleStack()
    
    # Push elements
    stack.push(10)
    stack.push(20)
    stack.push(30)
    stack.display()  # [30, 20, 10]
    
    # Peek
    print(f"Top element: {stack.peek()}")  # 30
    
    # Pop
    print(f"Popped: {stack.pop()}")  # 30
    stack.display()  # [20, 10]
    
    # Check size
    print(f"Stack size: {stack.size()}")  # 2
    
    # Check empty
    print(f"Is empty: {stack.is_empty()}")  # False
```

**Output**:
```
Stack (top to bottom): [30, 20, 10]
Top element: 30
Popped: 30
Stack (top to bottom): [20, 10]
Stack size: 2
Is empty: False
```

---

## Stack vs Other Data Structures

| Feature | Stack | Queue | Array | Linked List |
|---------|-------|-------|-------|-------------|
| Access Pattern | LIFO | FIFO | Random Access | Sequential |
| Insert Position | Top only | Rear only | Any index | Any position |
| Delete Position | Top only | Front only | Any index | Any position |
| Primary Use | Recursion, Undo | Scheduling | Storage | Dynamic data |

---

## When to Use Stacks

✅ **Use Stack When:**
- You need LIFO behavior
- Implementing recursion (call stack)
- Expression evaluation (calculators)
- Syntax parsing (compilers)
- Backtracking algorithms
- Undo/Redo functionality
- Browser history management

❌ **Don't Use Stack When:**
- You need FIFO behavior (use Queue)
- You need random access (use Array)
- You need to search frequently
- You need to access middle elements

---

## Common Stack Errors

### 1. Stack Underflow
```python
# ERROR: Popping from empty stack
stack = SimpleStack()
stack.pop()  # Exception: Stack Underflow
```

### 2. Stack Overflow
```python
# ERROR: Pushing beyond capacity (fixed-size stack)
stack = FixedStack(capacity=3)
stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)  # Exception: Stack Overflow
```

### 3. Accessing Empty Stack
```python
# ERROR: Peeking at empty stack
stack = SimpleStack()
top = stack.peek()  # Exception: Stack is empty
```

---

## Time Complexity Summary

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Push      | O(1)           | O(1)             |
| Pop       | O(1)           | O(1)             |
| Peek      | O(1)           | O(1)             |
| isEmpty   | O(1)           | O(1)             |
| Size      | O(1)           | O(1)             |
| Search    | O(n)           | O(1)             |

---

## Practice Problems

### Beginner Level
1. Implement a stack using an array
2. Check if a stack is empty
3. Reverse a string using stack
4. Implement two stacks in a single array

### Intermediate Level
5. Valid Parentheses (LeetCode #20)
6. Min Stack (LeetCode #155)
7. Implement Stack using Queues (LeetCode #225)
8. Baseball Game (LeetCode #682)

---

## Key Takeaways

🎯 **Remember:**
- Stack follows **LIFO** principle
- Only **top element** is accessible
- All operations are **O(1)** time complexity
- Always check for **empty stack** before pop/peek
- Stacks are fundamental for **recursion** and **backtracking**

---

**Next:** Continue to [02-Stack-Implementation.md](02-Stack-Implementation.md) to learn about different implementation approaches!
