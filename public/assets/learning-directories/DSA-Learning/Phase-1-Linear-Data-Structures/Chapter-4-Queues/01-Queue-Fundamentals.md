# Queue Fundamentals

## 🎯 Learning Objectives

By the end of this section, you will:
- Understand the FIFO (First In, First Out) principle
- Know all basic queue operations
- Analyze time and space complexity
- Differentiate between queues and stacks
- Identify when to use queues in real-world scenarios

---

## 📖 What is a Queue?

A **Queue** is a linear data structure that follows the **FIFO (First In, First Out)** principle. This means that the first element added to the queue will be the first one to be removed.

### Real-World Analogies:

1. **People waiting in line at a ticket counter**
   - First person to arrive is served first
   - New people join at the end of the line

2. **Print queue in a computer**
   - Documents are printed in the order they're sent
   - First print job submitted is printed first

3. **Call center queue**
   - Customers are served in the order they called
   - No cutting in line!

4. **Traffic at a toll booth**
   - Cars are processed in arrival order
   - First car to arrive passes through first

---

## 🔄 FIFO Principle Explained

**FIFO = First In, First Out**

```
Visualization:

FRONT ← [10] ← [20] ← [30] ← [40] ← REAR

Operations:
1. Enqueue(50): Add 50 at REAR
   FRONT ← [10] ← [20] ← [30] ← [40] ← [50] ← REAR

2. Dequeue(): Remove from FRONT (returns 10)
   FRONT ← [20] ← [30] ← [40] ← [50] ← REAR

3. Enqueue(60): Add 60 at REAR
   FRONT ← [20] ← [30] ← [40] ← [50] ← [60] ← REAR
```

### Key Insight:
- Elements are **added at the REAR** (back of the queue)
- Elements are **removed from the FRONT** (front of the queue)
- Order is preserved: oldest elements leave first

---

## 🛠️ Queue Operations

### Core Operations:

#### 1. **Enqueue (Insert/Push)**
- **Operation:** Add an element to the rear of the queue
- **Time Complexity:** O(1)
- **Analogy:** Person joins the end of a line

```
Before: FRONT ← [10, 20, 30] ← REAR
Enqueue(40)
After:  FRONT ← [10, 20, 30, 40] ← REAR
```

#### 2. **Dequeue (Remove/Pop)**
- **Operation:** Remove and return the element at the front
- **Time Complexity:** O(1)
- **Analogy:** First person in line gets served and leaves

```
Before: FRONT ← [10, 20, 30] ← REAR
Dequeue() → returns 10
After:  FRONT ← [20, 30] ← REAR
```

#### 3. **Front (Peek/First)**
- **Operation:** View the front element without removing it
- **Time Complexity:** O(1)
- **Analogy:** See who's first in line without serving them

```
Queue: FRONT ← [10, 20, 30] ← REAR
Front() → returns 10
Queue: FRONT ← [10, 20, 30] ← REAR (unchanged)
```

#### 4. **Rear (Last)**
- **Operation:** View the rear element without removing it
- **Time Complexity:** O(1)
- **Analogy:** See who's last in line

```
Queue: FRONT ← [10, 20, 30] ← REAR
Rear() → returns 30
Queue: FRONT ← [10, 20, 30] ← REAR (unchanged)
```

### Auxiliary Operations:

#### 5. **isEmpty()**
- **Operation:** Check if queue has no elements
- **Time Complexity:** O(1)
- **Returns:** `true` if empty, `false` otherwise

#### 6. **isFull()**
- **Operation:** Check if queue is at capacity (for fixed-size queues)
- **Time Complexity:** O(1)
- **Returns:** `true` if full, `false` otherwise
- **Note:** Only applicable to array-based queues with fixed size

#### 7. **size()**
- **Operation:** Return the number of elements in the queue
- **Time Complexity:** O(1)
- **Returns:** Integer count of elements

---

## 📊 Time Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Enqueue | O(1) | O(1) |
| Dequeue | O(1) | O(1) |
| Front | O(1) | O(1) |
| Rear | O(1) | O(1) |
| isEmpty | O(1) | O(1) |
| isFull | O(1) | O(1) |
| size | O(1) | O(1) |

**Overall Space Complexity:** O(n), where n is the number of elements

---

## 🆚 Queue vs Stack

Understanding the difference between queues and stacks is crucial:

| Feature | Queue | Stack |
|---------|-------|-------|
| **Principle** | FIFO (First In, First Out) | LIFO (Last In, First Out) |
| **Insertion** | Rear (Enqueue) | Top (Push) |
| **Deletion** | Front (Dequeue) | Top (Pop) |
| **Access** | Front and Rear | Only Top |
| **Analogy** | People in a line | Stack of plates |
| **Applications** | BFS, Scheduling, Buffering | DFS, Recursion, Undo/Redo |

### Visual Comparison:

```
QUEUE (FIFO):
Remove ← [1, 2, 3, 4, 5] ← Add
First element added (1) is first removed

STACK (LIFO):
         [5]
         [4]
         [3]
         [2]
    Add→ [1] ← Remove
Last element added (5) is first removed
```

---

## 🎯 When to Use Queues

### Use Cases for Queues:

1. **Order Matters (FIFO needed)**
   - Processing tasks in arrival order
   - Serving customers fairly
   - Handling requests sequentially

2. **Breadth-First Search (BFS)**
   - Level-order traversal of trees
   - Shortest path in unweighted graphs
   - Web crawlers

3. **Buffering**
   - Data stream processing
   - Keyboard buffer
   - Printer spooling

4. **Scheduling**
   - CPU task scheduling
   - Disk scheduling
   - Process management in OS

5. **Real-Time Systems**
   - Event handling
   - Message queues
   - Asynchronous processing

### When NOT to Use Queues:

1. **Need LIFO behavior** → Use Stack instead
2. **Need random access** → Use Array/List
3. **Need priority-based access** → Use Priority Queue/Heap
4. **Need frequent middle insertions** → Use Linked List/Deque

---

## 🧠 Queue Variations

### 1. Simple Queue (Linear Queue)
- Basic FIFO queue
- Can suffer from false overflow in array implementation

### 2. Circular Queue
- Rear connects back to front
- Efficient space utilization
- Avoids false overflow

### 3. Double-Ended Queue (Deque)
- Insertion and deletion at both ends
- More flexible than simple queue

### 4. Priority Queue
- Elements have priorities
- Highest priority element dequeued first
- Implemented using heaps

### 5. Input-Restricted Deque
- Insertion only at rear
- Deletion from both ends

### 6. Output-Restricted Deque
- Insertion at both ends
- Deletion only from front

---

## 💡 Key Properties of Queues

### Property 1: Order Preservation
```
Enqueue sequence: A, B, C, D
Dequeue sequence: A, B, C, D (same order)
```

### Property 2: Limited Access
- Can only access front and rear elements
- Cannot access middle elements directly
- Must dequeue elements to reach inner elements

### Property 3: Dynamic Size (Linked List Implementation)
- Can grow as needed
- No fixed capacity limit
- Memory allocated as required

### Property 4: Fixed Size (Array Implementation)
- Predetermined capacity
- Can lead to overflow
- Memory allocated upfront

---

## 📝 Queue State Conditions

### Empty Queue:
```
Condition: front == rear (in many implementations)
OR: size == 0
OR: front == -1 (in some implementations)

Visualization:
FRONT (empty) REAR
```

### Full Queue (Array-based):
```
Condition: rear == MAX_SIZE - 1 (simple queue)
OR: (rear + 1) % MAX_SIZE == front (circular queue)

Visualization:
FRONT ← [full] ← REAR
```

### Single Element:
```
Condition: front == rear (pointing to same element)
OR: size == 1

Visualization:
FRONT ← [X] ← REAR (both point to same element)
```

---

## 🎓 Common Mistakes to Avoid

### Mistake 1: Confusing FIFO with LIFO
❌ Wrong: Thinking queue is LIFO  
✅ Correct: Queue is FIFO (Stack is LIFO)

### Mistake 2: Accessing Middle Elements
❌ Wrong: Trying to access queue[i] directly  
✅ Correct: Only access front and rear, dequeue to reach elements

### Mistake 3: Not Checking Empty Before Dequeue
❌ Wrong: Dequeue without checking isEmpty()  
✅ Correct: Always check isEmpty() before dequeue

### Mistake 4: Not Handling Overflow
❌ Wrong: Keep enqueuing without checking isFull()  
✅ Correct: Check isFull() in fixed-size queues

### Mistake 5: Forgetting to Update Pointers
❌ Wrong: Only changing data, not front/rear pointers  
✅ Correct: Always update both data and pointers

---

## 🧪 Practice Examples

### Example 1: Basic Operations
```
Initial: Queue is empty

Enqueue(10) → Queue: [10]
Enqueue(20) → Queue: [10, 20]
Enqueue(30) → Queue: [10, 20, 30]
Front() → 10 (peek, doesn't remove)
Dequeue() → 10 (removed)
Queue: [20, 30]
Rear() → 30
Enqueue(40) → Queue: [20, 30, 40]
Dequeue() → 20
Queue: [30, 40]
```

### Example 2: Queue Size Tracking
```
Initial: size = 0, isEmpty = true

Enqueue(5) → size = 1, isEmpty = false
Enqueue(10) → size = 2
Enqueue(15) → size = 3
Dequeue() → size = 2
Dequeue() → size = 1
Dequeue() → size = 0, isEmpty = true
```

---

## 📚 Terminology Quick Reference

| Term | Definition |
|------|------------|
| **Enqueue** | Add element to rear of queue |
| **Dequeue** | Remove element from front of queue |
| **Front** | Pointer to the first element |
| **Rear** | Pointer to the last element |
| **FIFO** | First In, First Out principle |
| **Overflow** | Condition when queue is full |
| **Underflow** | Condition when queue is empty |
| **Circular** | Queue where rear wraps to front |

---

## 🎯 Quick Quiz

Test your understanding:

1. **Q:** What is the time complexity of enqueue operation?  
   **A:** O(1)

2. **Q:** In what order are elements removed from a queue?  
   **A:** In the same order they were inserted (FIFO)

3. **Q:** Can you access the middle element of a queue directly?  
   **A:** No, you must dequeue elements from front to reach it

4. **Q:** What happens if you dequeue from an empty queue?  
   **A:** Underflow error (should check isEmpty() first)

5. **Q:** Which end do we insert elements in a queue?  
   **A:** Rear (back) end

---

## 🚀 Next Steps

Now that you understand queue fundamentals, you're ready to:

1. **[Learn Array-Based Implementation →](./02-Array-Based-Implementation.md)**
2. **Implement queues in your preferred language**
3. **Solve basic queue problems**
4. **Explore different queue variations**

---

## 🔗 Related Topics

- [Stack Fundamentals](../../Chapter-3-Stacks/01-Stack-Fundamentals.md)
- [Linked List Basics](../../Chapter-2-Linked-Lists/README.md)
- [Arrays and Strings](../../Chapter-1-Arrays-and-Strings/README.md)

---

**Pro Tip:** Visualize queue operations with diagrams. Draw the queue before and after each operation to build intuition! 🎨

[← Back to Chapter Overview](./README.md) | [Next: Array-Based Implementation →](./02-Array-Based-Implementation.md)
