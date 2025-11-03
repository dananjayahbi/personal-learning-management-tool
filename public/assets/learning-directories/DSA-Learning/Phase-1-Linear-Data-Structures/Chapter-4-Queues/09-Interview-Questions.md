# Queue Interview Questions

## 🎯 Interview Preparation Guide

This section covers common queue interview questions, patterns, and strategies to ace your technical interviews.

---

## 📋 Top Interview Questions

### 1. Implement Queue Using Arrays or Linked Lists

**Frequency:** ⭐⭐⭐⭐⭐ (Very High)

**Question:** "Implement a queue from scratch with enqueue, dequeue, front, and size operations."

**Key Points:**
- Discuss trade-offs between array and linked list
- Mention circular queue for array implementation
- Time complexity: O(1) for all operations

**Follow-up:**
- How would you handle overflow in array-based queue?
- What if we need thread-safe operations?

**Solution:** See [02-Array-Based-Implementation.md](./02-Array-Based-Implementation.md)

---

### 2. Implement Queue Using Stacks (LeetCode 232)

**Frequency:** ⭐⭐⭐⭐⭐

**Question:** "Implement a queue using only stack operations."

**Strategy:**
```
Two Stack Approach:
- stack1: For enqueue operations
- stack2: For dequeue operations

Enqueue: O(1) - Push to stack1
Dequeue: Amortized O(1) - Transfer from stack1 to stack2 when needed
```

**Interview Tips:**
- Explain amortized analysis
- Discuss when to transfer elements
- Mention lazy transfer optimization

---

### 3. Implement Stack Using Queues (LeetCode 225)

**Frequency:** ⭐⭐⭐⭐

**Question:** "Implement a stack using only queue operations."

**Two Approaches:**

**Approach 1: Push O(n), Pop O(1)**
```python
from collections import deque

class StackUsingQueue:
    def __init__(self):
        self.queue = deque()
    
    def push(self, x):
        """O(n) - Make new element front"""
        self.queue.append(x)
        for _ in range(len(self.queue) - 1):
            self.queue.append(self.queue.popleft())
    
    def pop(self):
        """O(1)"""
        return self.queue.popleft()
    
    def top(self):
        """O(1)"""
        return self.queue[0]
```

**Approach 2: Push O(1), Pop O(n)** - Use two queues

---

### 4. Design Circular Queue (LeetCode 622)

**Frequency:** ⭐⭐⭐⭐

**Key Challenges:**
- Distinguishing between full and empty states
- Circular indexing using modulo
- Handling edge cases

**Interview Discussion Points:**
- Why circular queue is better than simple queue
- How to handle wraparound
- Space efficiency considerations

**Solution:** See [04-Circular-Queue.md](./04-Circular-Queue.md)

---

### 5. Sliding Window Maximum (LeetCode 239)

**Frequency:** ⭐⭐⭐⭐⭐

**Question:** "Find the maximum value in each sliding window of size k."

**Pattern:** Monotonic Deque

**Key Insight:**
- Use deque to store indices
- Maintain decreasing order of values
- Remove indices outside window

**Time:** O(n) | **Space:** O(k)

**Common Mistakes:**
- Not removing elements outside window
- Not maintaining monotonic property
- Using nested loops (O(n×k) is too slow!)

**Solution:** See [08-Practice-Problems.md](./08-Practice-Problems.md#problem-6)

---

### 6. First Non-Repeating Character in Stream

**Frequency:** ⭐⭐⭐⭐

**Question:** "Find the first non-repeating character in a stream of characters."

**Pattern:** Queue + Hash Map

**Approach:**
```python
from collections import deque, Counter

class FirstUnique:
    def __init__(self):
        self.queue = deque()
        self.count = Counter()
    
    def add(self, char):
        self.count[char] += 1
        self.queue.append(char)
    
    def getFirstUnique(self):
        while self.queue and self.count[self.queue[0]] > 1:
            self.queue.popleft()
        return self.queue[0] if self.queue else None
```

**Interview Tips:**
- Explain why we need both queue and hash map
- Discuss time complexity: O(n) amortized
- Handle edge cases (empty stream, all repeating)

---

### 7. Generate Binary Numbers (GeeksforGeeks)

**Frequency:** ⭐⭐⭐

**Question:** "Generate binary numbers from 1 to n using a queue."

**Pattern:** BFS-style generation

**Key Insight:**
```
Start with "1"
For each number:
  - Append "0" to get next number
  - Append "1" to get another number
```

**Time:** O(n) | **Space:** O(n)

---

### 8. Rotten Oranges (LeetCode 994)

**Frequency:** ⭐⭐⭐⭐

**Question:** "In a grid, rotting oranges spread to adjacent fresh oranges. Find minimum time for all to rot."

**Pattern:** Multi-source BFS

```python
from collections import deque

def orangesRotting(grid):
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh = 0
    
    # Add all rotten oranges to queue
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c, 0))
            elif grid[r][c] == 1:
                fresh += 1
    
    time = 0
    directions = [(0,1), (1,0), (0,-1), (-1,0)]
    
    while queue:
        r, c, t = queue.popleft()
        time = max(time, t)
        
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                grid[nr][nc] = 2
                fresh -= 1
                queue.append((nr, nc, t + 1))
    
    return time if fresh == 0 else -1
```

**Time:** O(rows × cols) | **Space:** O(rows × cols)

---

### 9. Level Order Traversal (LeetCode 102)

**Frequency:** ⭐⭐⭐⭐⭐

**Question:** "Print binary tree level by level."

**Pattern:** BFS with level tracking

```python
from collections import deque

def levelOrder(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        current_level = []
        
        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(current_level)
    
    return result
```

**Variations:**
- Zigzag level order (LeetCode 103)
- Right side view (LeetCode 199)
- Bottom-up level order (LeetCode 107)

---

### 10. Moving Average from Data Stream (LeetCode 346)

**Frequency:** ⭐⭐⭐

**Question:** "Calculate moving average of last n values."

```python
from collections import deque

class MovingAverage:
    def __init__(self, size):
        self.queue = deque()
        self.size = size
        self.sum = 0
    
    def next(self, val):
        self.queue.append(val)
        self.sum += val
        
        if len(self.queue) > self.size:
            self.sum -= self.queue.popleft()
        
        return self.sum / len(self.queue)
```

**Time:** O(1) | **Space:** O(n)

---

## 🎯 Common Queue Patterns

### Pattern 1: Queue Using Stacks
**When to use:** Implementation questions, understanding data structures

**Problems:**
- Queue using stacks
- Stack using queues

---

### Pattern 2: Monotonic Queue/Deque
**When to use:** Sliding window with min/max queries

**Problems:**
- Sliding window maximum
- Shortest subarray with sum ≥ k
- Jump game VI

**Template:**
```python
from collections import deque

def sliding_window_pattern(arr, k):
    dq = deque()
    result = []
    
    for i in range(len(arr)):
        # Remove elements outside window
        while dq and dq[0] <= i - k:
            dq.popleft()
        
        # Maintain monotonic property
        while dq and arr[dq[-1]] < arr[i]:  # or > for min
            dq.pop()
        
        dq.append(i)
        
        if i >= k - 1:
            result.append(arr[dq[0]])
    
    return result
```

---

### Pattern 3: BFS/Level Order
**When to use:** Tree/graph traversal, shortest path

**Problems:**
- Level order traversal
- Binary tree zigzag
- Rotten oranges
- Word ladder

---

### Pattern 4: Stream Processing
**When to use:** First unique, moving average

**Problems:**
- First non-repeating character
- Moving average
- Recent calls counter

---

## 💡 Interview Tips & Strategies

### Tip 1: Clarify Requirements
```
Before coding, ask:
- What should happen on overflow/underflow?
- Are there size constraints?
- Thread safety needed?
- Can we use built-in libraries?
```

### Tip 2: Start with Brute Force
```
1. Explain O(n²) or O(nk) solution first
2. Identify bottlenecks
3. Optimize using queue/deque
4. Explain why it's better
```

### Tip 3: Draw Diagrams
```
Visualize:
- Queue state before/after operations
- Sliding window movement
- BFS level-by-level progression
```

### Tip 4: Handle Edge Cases
```
Always test:
- Empty queue
- Single element
- Full queue (if fixed size)
- All elements same value
```

### Tip 5: Explain Complexity
```
Discuss:
- Time complexity of each operation
- Amortized vs worst-case
- Space complexity
- Trade-offs made
```

---

## 🎓 Mock Interview Questions

### Question 1: System Design
"Design a message queue system like RabbitMQ or Kafka. What data structures would you use?"

**Key Points:**
- Distributed queue architecture
- Producer-consumer model
- Persistence and reliability
- Scalability considerations

---

### Question 2: Optimization
"Given a queue implementation with O(1) operations, how would you add a getMax() operation that's also O(1)?"

**Answer:** Use auxiliary deque to track maximums (monotonic deque pattern)

---

### Question 3: Trade-offs
"When would you choose array-based queue vs linked list queue?"

**Discuss:**
- Memory layout and cache
- Dynamic vs fixed size
- Insertion/deletion patterns
- Real-world use cases

---

## ✅ Interview Readiness Checklist

### Fundamentals:
- [ ] Explain FIFO principle clearly
- [ ] Implement queue from scratch
- [ ] Know time/space complexity
- [ ] Understand circular queue

### Patterns:
- [ ] Master monotonic deque
- [ ] Solve 5+ BFS problems
- [ ] Practice queue using stacks
- [ ] Understand stream processing

### Communication:
- [ ] Draw diagrams while explaining
- [ ] Discuss trade-offs
- [ ] Handle interviewer hints
- [ ] Think aloud

### Problem Solving:
- [ ] Solved 10+ queue problems
- [ ] Can solve medium problems in 20-30 min
- [ ] Identify patterns quickly
- [ ] Optimize brute force solutions

---

## 🚀 Final Tips for Interviews

### Do's:
✅ Ask clarifying questions  
✅ Start with simple solution  
✅ Explain your thought process  
✅ Test with examples  
✅ Discuss complexity  
✅ Mention edge cases  

### Don'ts:
❌ Jump to coding immediately  
❌ Assume requirements  
❌ Ignore edge cases  
❌ Stay silent while thinking  
❌ Give up too quickly  
❌ Forget to test solution  

---

## 📚 Recommended Problem Sets

### LeetCode Queue Tag:
- Easy: 232, 225, 933, 346
- Medium: 622, 239, 102, 994, 950
- Hard: 862, 1696, 1670

### Company-Specific:
- **Amazon:** Rotten oranges, Level order traversal
- **Google:** Sliding window maximum, Shortest subarray
- **Microsoft:** Implement queue/stack, BFS problems
- **Facebook:** First unique character, Message queue design

---

## 🎯 Practice Schedule

### Week 1: Foundations
- Day 1-2: Implement queues (array, linked list, circular)
- Day 3-4: Queue using stacks pattern (5 problems)
- Day 5-7: BFS problems (level order, etc.)

### Week 2: Advanced
- Day 1-3: Monotonic deque (sliding window problems)
- Day 4-5: Stream processing problems
- Day 6-7: Mixed medium/hard problems

### Week 3: Mock Interviews
- Day 1-7: Daily timed problem solving (30-45 min each)

---

## 🏆 Success Metrics

You're interview-ready when you can:

✅ Implement any queue variation in 10 minutes  
✅ Recognize queue patterns instantly  
✅ Solve medium problems in 25-30 minutes  
✅ Explain complexity without hesitation  
✅ Handle follow-up questions confidently  

---

**Final Note:** Practice consistently, review mistakes, and stay confident. You've got this! 🚀

[← Back: Practice Problems](./08-Practice-Problems.md) | [Back to Chapter Overview](./README.md) | [Next: Chapter 5 - Hashing →](../Chapter-5-Hashing/README.md)
