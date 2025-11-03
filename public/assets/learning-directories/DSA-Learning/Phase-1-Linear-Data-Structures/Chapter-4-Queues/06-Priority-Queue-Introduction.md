# Priority Queue Introduction

## 🎯 Learning Objectives

- Understand priority queue concept
- Learn about min-heap and max-heap
- Use library implementations efficiently
- Recognize priority queue problems
- Apply to real-world scenarios

---

## 📖 What is a Priority Queue?

A **Priority Queue** is an abstract data type where each element has a **priority**. Elements with higher priority are dequeued before elements with lower priority, regardless of insertion order.

### Regular Queue vs Priority Queue:

```
Regular Queue (FIFO):
Enqueue: A(5), B(3), C(8), D(1)
Dequeue: A, B, C, D (in insertion order)

Priority Queue (by priority):
Enqueue: A(5), B(3), C(8), D(1)
Dequeue: C(8), A(5), B(3), D(1) (highest priority first)
```

---

## 🔑 Key Concepts

### Priority Types:

**1. Max-Priority Queue (Max-Heap)**
- Highest priority = Largest value
- Used when maximum matters

**2. Min-Priority Queue (Min-Heap)**
- Highest priority = Smallest value
- Used when minimum matters

---

## ⚙️ Operations

| Operation | Description | Time (Heap) |
|-----------|-------------|-------------|
| `insert(x)` | Add element with priority | O(log n) |
| `extractMax/Min()` | Remove highest priority | O(log n) |
| `peek()` | View highest priority | O(1) |
| `delete(x)` | Remove specific element | O(log n) |
| `changePriority()` | Update priority | O(log n) |

---

## 💻 Using Built-in Priority Queues

### Python `heapq` (Min-Heap by default)

```python
import heapq

# Min-Heap Example
pq = []

# Insert elements
heapq.heappush(pq, 5)
heapq.heappush(pq, 2)
heapq.heappush(pq, 8)
heapq.heappush(pq, 1)

print(pq)  # [1, 2, 8, 5] (heap order, not sorted)

# Extract minimum
print(heapq.heappop(pq))  # 1
print(heapq.heappop(pq))  # 2

# Peek minimum
print(pq[0])  # 5 (don't use pq[0] for extracting!)

# Create heap from list
arr = [5, 2, 8, 1, 9]
heapq.heapify(arr)  # O(n)
print(arr)  # [1, 2, 8, 5, 9]


# Max-Heap (negate values)
max_pq = []
heapq.heappush(max_pq, -5)
heapq.heappush(max_pq, -2)
heapq.heappush(max_pq, -8)

print(-heapq.heappop(max_pq))  # 8 (maximum)
print(-heapq.heappop(max_pq))  # 5


# Priority Queue with tuples (priority, data)
pq_tasks = []
heapq.heappush(pq_tasks, (3, "Task A"))
heapq.heappush(pq_tasks, (1, "Task B"))
heapq.heappush(pq_tasks, (2, "Task C"))

while pq_tasks:
    priority, task = heapq.heappop(pq_tasks)
    print(f"{task} (Priority: {priority})")
# Output:
# Task B (Priority: 1)
# Task C (Priority: 2)
# Task A (Priority: 3)
```

### C++ `priority_queue`

```cpp
#include <iostream>
#include <queue>
using namespace std;

int main() {
    // Max-Heap (default)
    priority_queue<int> max_pq;
    
    max_pq.push(5);
    max_pq.push(2);
    max_pq.push(8);
    max_pq.push(1);
    
    cout << max_pq.top() << endl;  // 8
    max_pq.pop();
    cout << max_pq.top() << endl;  // 5
    
    
    // Min-Heap
    priority_queue<int, vector<int>, greater<int>> min_pq;
    
    min_pq.push(5);
    min_pq.push(2);
    min_pq.push(8);
    
    cout << min_pq.top() << endl;  // 2
    
    
    // Custom comparator
    auto cmp = [](pair<int, string> a, pair<int, string> b) {
        return a.first > b.first;  // Min-heap by priority
    };
    
    priority_queue<pair<int, string>, 
                   vector<pair<int, string>>, 
                   decltype(cmp)> pq_custom(cmp);
    
    pq_custom.push({3, "Task A"});
    pq_custom.push({1, "Task B"});
    pq_custom.push({2, "Task C"});
    
    while (!pq_custom.empty()) {
        auto [priority, task] = pq_custom.top();
        pq_custom.pop();
        cout << task << " (Priority: " << priority << ")" << endl;
    }
    
    return 0;
}
```

### Java `PriorityQueue`

```java
import java.util.*;

public class PriorityQueueExample {
    public static void main(String[] args) {
        // Min-Heap (default)
        PriorityQueue<Integer> minPQ = new PriorityQueue<>();
        
        minPQ.add(5);
        minPQ.add(2);
        minPQ.add(8);
        minPQ.add(1);
        
        System.out.println(minPQ.peek());  // 1
        System.out.println(minPQ.poll());  // 1
        System.out.println(minPQ.poll());  // 2
        
        
        // Max-Heap
        PriorityQueue<Integer> maxPQ = new PriorityQueue<>(Collections.reverseOrder());
        
        maxPQ.add(5);
        maxPQ.add(2);
        maxPQ.add(8);
        
        System.out.println(maxPQ.poll());  // 8
        
        
        // Custom comparator
        PriorityQueue<Task> pq = new PriorityQueue<>(
            (a, b) -> Integer.compare(a.priority, b.priority)
        );
        
        pq.add(new Task("Task A", 3));
        pq.add(new Task("Task B", 1));
        pq.add(new Task("Task C", 2));
        
        while (!pq.isEmpty()) {
            Task t = pq.poll();
            System.out.println(t.name + " (Priority: " + t.priority + ")");
        }
    }
}

class Task {
    String name;
    int priority;
    
    Task(String name, int priority) {
        this.name = name;
        this.priority = priority;
    }
}
```

---

## 🚀 Common Applications

### 1. **Dijkstra's Algorithm (Shortest Path)**

```python
import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]  # (distance, node)
    
    while pq:
        current_dist, current_node = heapq.heappop(pq)
        
        if current_dist > distances[current_node]:
            continue
        
        for neighbor, weight in graph[current_node]:
            distance = current_dist + weight
            
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return distances
```

### 2. **Task Scheduling**

```python
import heapq

def schedule_tasks(tasks):
    """Schedule tasks by priority"""
    pq = []
    for priority, task_name in tasks:
        heapq.heappush(pq, (priority, task_name))
    
    execution_order = []
    while pq:
        priority, task = heapq.heappop(pq)
        execution_order.append(task)
    
    return execution_order

tasks = [(3, "Email"), (1, "Bug Fix"), (2, "Meeting")]
print(schedule_tasks(tasks))
# Output: ['Bug Fix', 'Meeting', 'Email']
```

### 3. **Merge K Sorted Arrays**

```python
import heapq

def merge_k_sorted(arrays):
    """Merge k sorted arrays using min-heap"""
    pq = []
    result = []
    
    # Add first element from each array
    for i, arr in enumerate(arrays):
        if arr:
            heapq.heappush(pq, (arr[0], i, 0))
    
    while pq:
        val, array_idx, element_idx = heapq.heappop(pq)
        result.append(val)
        
        # Add next element from same array
        if element_idx + 1 < len(arrays[array_idx]):
            next_val = arrays[array_idx][element_idx + 1]
            heapq.heappush(pq, (next_val, array_idx, element_idx + 1))
    
    return result

arrays = [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
print(merge_k_sorted(arrays))
# Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 4. **Top K Elements**

```python
import heapq

def top_k_frequent(nums, k):
    """Find k most frequent elements"""
    from collections import Counter
    count = Counter(nums)
    
    # Use max-heap (negate frequencies)
    return heapq.nlargest(k, count.keys(), key=count.get)

nums = [1, 1, 1, 2, 2, 3]
k = 2
print(top_k_frequent(nums, k))  # [1, 2]
```

---

## 🎯 Common Problem Patterns

### Pattern 1: Top K Elements
- Kth largest/smallest element
- Top K frequent elements
- K closest points

### Pattern 2: Merge K Sorted
- Merge K sorted lists
- Smallest range in K lists

### Pattern 3: Median Maintenance
- Find median in data stream
- Sliding window median

### Pattern 4: Scheduling
- Meeting rooms
- Task scheduling
- CPU scheduling

---

## 📊 Implementation Comparison

| Method | Insert | Extract | Peek | Space |
|--------|--------|---------|------|-------|
| Unsorted Array | O(1) | O(n) | O(n) | O(n) |
| Sorted Array | O(n) | O(1) | O(1) | O(n) |
| Linked List | O(1) | O(n) | O(n) | O(n) |
| **Binary Heap** | **O(log n)** | **O(log n)** | **O(1)** | **O(n)** |

**Winner:** Binary Heap (balanced performance)

---

## 💡 Pro Tips

### Tip 1: Use Tuples for Complex Priorities
```python
# (priority, timestamp, data) for tie-breaking
heapq.heappush(pq, (priority, timestamp, data))
```

### Tip 2: Negate for Max-Heap in Python
```python
heapq.heappush(max_heap, -value)
result = -heapq.heappop(max_heap)
```

### Tip 3: heapify() is O(n), not O(n log n)
```python
arr = [5, 2, 8, 1]
heapq.heapify(arr)  # O(n) - faster than n pushes
```

### Tip 4: Don't Modify Heap Directly
```python
# ❌ Wrong
pq[0] = new_value

# ✅ Correct
heapq.heapreplace(pq, new_value)
```

---

## 🎓 Practice Problems

1. **Kth Largest Element** (LeetCode 215)
2. **Top K Frequent Elements** (LeetCode 347)
3. **Merge K Sorted Lists** (LeetCode 23)
4. **Find Median from Data Stream** (LeetCode 295)
5. **K Closest Points to Origin** (LeetCode 973)
6. **Task Scheduler** (LeetCode 621)

---

## 🚀 Next Steps

1. **[Learn Queue Applications →](./07-Queue-Applications.md)**
2. **Implement heap from scratch** (Phase 4)
3. **Solve priority queue problems**
4. **Master heap-based algorithms**

---

**Key Takeaway:** Priority queues with heaps provide O(log n) operations for priority-based problems - essential for many algorithms! ⚡

[← Back: Deque](./05-Deque.md) | [Back to Chapter](./README.md) | [Next: Applications →](./07-Queue-Applications.md)
