# Queue Practice Problems

## 🎯 Problem Collection

This section contains **15 curated queue problems** ranging from easy to hard, with solutions and explanations.

---

## 📊 Problem Difficulty Distribution

- **Easy:** 5 problems (Build foundation)
- **Medium:** 7 problems (Challenge yourself)
- **Hard:** 3 problems (Master level)

---

## 🟢 Easy Problems

### Problem 1: Implement Queue Using Arrays

**Description:** Implement a queue using a fixed-size array with enqueue, dequeue, front, and isEmpty operations.

**Solution:** [See 02-Array-Based-Implementation.md](./02-Array-Based-Implementation.md)

**Time Complexity:** O(1) for all operations  
**Space Complexity:** O(n)

---

### Problem 2: Implement Queue Using Stacks (LeetCode 232)

**Description:** Implement a queue using two stacks.

```python
class QueueUsingStacks:
    def __init__(self):
        self.stack1 = []  # For enqueue
        self.stack2 = []  # For dequeue
    
    def enqueue(self, x):
        """O(1)"""
        self.stack1.append(x)
    
    def dequeue(self):
        """Amortized O(1)"""
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())
        
        if not self.stack2:
            return None
        return self.stack2.pop()
    
    def front(self):
        """O(1)"""
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())
        
        return self.stack2[-1] if self.stack2 else None
    
    def is_empty(self):
        return not self.stack1 and not self.stack2

# Test
q = QueueUsingStacks()
q.enqueue(1)
q.enqueue(2)
print(q.front())    # 1
print(q.dequeue())  # 1
print(q.is_empty()) # False
```

**Key Idea:** Use stack1 for push, stack2 for pop. Transfer elements when needed.

---

### Problem 3: First Non-Repeating Character in Stream

**Description:** Find the first non-repeating character in a stream of characters.

```python
from collections import deque, Counter

class FirstUnique:
    def __init__(self):
        self.queue = deque()
        self.count = Counter()
    
    def add(self, char):
        """Add character to stream"""
        self.count[char] += 1
        self.queue.append(char)
    
    def get_first_unique(self):
        """Get first non-repeating character"""
        while self.queue:
            char = self.queue[0]
            if self.count[char] == 1:
                return char
            self.queue.popleft()
        return None

# Test
stream = FirstUnique()
chars = "aabccbd"
for char in chars:
    stream.add(char)
    print(f"After '{char}': {stream.get_first_unique()}")

# Output:
# After 'a': a
# After 'a': None
# After 'b': b
# After 'c': b
# After 'c': b
# After 'b': None
# After 'd': d
```

**Time:** O(n) | **Space:** O(k) where k is unique characters

---

### Problem 4: Reverse First K Elements of Queue

**Description:** Reverse the first K elements of a queue.

```python
from collections import deque

def reverse_first_k(queue, k):
    """Reverse first k elements of queue"""
    if not queue or k <= 0 or k > len(queue):
        return queue
    
    # Step 1: Dequeue first k elements to stack
    stack = []
    for _ in range(k):
        stack.append(queue.popleft())
    
    # Step 2: Enqueue from stack (reversed)
    while stack:
        queue.append(stack.pop())
    
    # Step 3: Move remaining (n-k) elements to back
    for _ in range(len(queue) - k):
        queue.append(queue.popleft())
    
    return queue

# Test
q = deque([1, 2, 3, 4, 5, 6, 7, 8])
print(reverse_first_k(q, 4))
# Output: deque([4, 3, 2, 1, 5, 6, 7, 8])
```

**Time:** O(n) | **Space:** O(k)

---

### Problem 5: Generate Binary Numbers from 1 to N

**Description:** Generate binary numbers from 1 to n using a queue.

```python
from collections import deque

def generate_binary_numbers(n):
    """Generate binary numbers from 1 to n"""
    result = []
    queue = deque(["1"])
    
    for _ in range(n):
        # Remove front and add to result
        front = queue.popleft()
        result.append(front)
        
        # Generate next numbers
        queue.append(front + "0")
        queue.append(front + "1")
    
    return result

# Test
print(generate_binary_numbers(10))
# Output: ['1', '10', '11', '100', '101', '110', '111', '1000', '1001', '1010']
```

**Time:** O(n) | **Space:** O(n)

---

## 🟡 Medium Problems

### Problem 6: Sliding Window Maximum (LeetCode 239)

**Description:** Find maximum in each sliding window of size k.

```python
from collections import deque

def max_sliding_window(nums, k):
    """Find max in each sliding window"""
    if not nums or k == 0:
        return []
    
    dq = deque()  # Store indices
    result = []
    
    for i in range(len(nums)):
        # Remove indices outside window
        while dq and dq[0] <= i - k:
            dq.popleft()
        
        # Remove smaller elements (not useful)
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()
        
        dq.append(i)
        
        # Add to result when window complete
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result

# Test
nums = [1, 3, -1, -3, 5, 3, 6, 7]
k = 3
print(max_sliding_window(nums, k))
# Output: [3, 3, 5, 5, 6, 7]
```

**Time:** O(n) | **Space:** O(k)

---

### Problem 7: Implement Circular Queue (LeetCode 622)

**Description:** Design a circular queue.

**Solution:** [See 04-Circular-Queue.md](./04-Circular-Queue.md)

---

### Problem 8: Number of Recent Calls (LeetCode 933)

**Description:** Count requests in the last 3000 milliseconds.

```python
from collections import deque

class RecentCounter:
    def __init__(self):
        self.queue = deque()
    
    def ping(self, t):
        """Add request at time t, return count in [t-3000, t]"""
        self.queue.append(t)
        
        # Remove requests older than t - 3000
        while self.queue and self.queue[0] < t - 3000:
            self.queue.popleft()
        
        return len(self.queue)

# Test
counter = RecentCounter()
print(counter.ping(1))     # 1
print(counter.ping(100))   # 2
print(counter.ping(3001))  # 3
print(counter.ping(3002))  # 3
```

**Time:** O(1) amortized | **Space:** O(W) where W = 3000

---

### Problem 9: Time Needed to Buy Tickets (LeetCode 2073)

**Description:** Calculate time for person at position k to buy tickets.

```python
from collections import deque

def time_to_buy_tickets(tickets, k):
    """Time for person at k to finish buying"""
    queue = deque([(tickets[i], i) for i in range(len(tickets))])
    time = 0
    
    while queue:
        count, idx = queue.popleft()
        time += 1
        count -= 1
        
        if idx == k and count == 0:
            return time
        
        if count > 0:
            queue.append((count, idx))
    
    return time

# Test
tickets = [2, 3, 2]
k = 2
print(time_to_buy_tickets(tickets, k))  # 6
```

**Time:** O(sum of tickets) | **Space:** O(n)

---

### Problem 10: Dota2 Senate (LeetCode 649)

**Description:** Simulate voting process.

```python
from collections import deque

def predict_party_victory(senate):
    """Predict winning party"""
    radiant = deque()
    dire = deque()
    n = len(senate)
    
    # Store indices
    for i, party in enumerate(senate):
        if party == 'R':
            radiant.append(i)
        else:
            dire.append(i)
    
    # Simulate rounds
    while radiant and dire:
        r = radiant.popleft()
        d = dire.popleft()
        
        # Earlier senator bans later one
        if r < d:
            radiant.append(r + n)
        else:
            dire.append(d + n)
    
    return "Radiant" if radiant else "Dire"

# Test
print(predict_party_victory("RD"))     # Radiant
print(predict_party_victory("RDD"))    # Dire
```

**Time:** O(n) | **Space:** O(n)

---

### Problem 11: First Negative in Every Window

**Description:** Find first negative number in every window of size k.

```python
from collections import deque

def first_negative_in_window(arr, k):
    """Find first negative in each window"""
    dq = deque()
    result = []
    
    # Process first window
    for i in range(k):
        if arr[i] < 0:
            dq.append(i)
    
    # First window result
    result.append(arr[dq[0]] if dq else 0)
    
    # Process remaining windows
    for i in range(k, len(arr)):
        # Remove indices outside window
        while dq and dq[0] <= i - k:
            dq.popleft()
        
        # Add new element if negative
        if arr[i] < 0:
            dq.append(i)
        
        # Add result
        result.append(arr[dq[0]] if dq else 0)
    
    return result

# Test
arr = [12, -1, -7, 8, -15, 30, 16, 28]
k = 3
print(first_negative_in_window(arr, k))
# Output: [-1, -1, -7, -15, -15, 0]
```

**Time:** O(n) | **Space:** O(k)

---

### Problem 12: Reveal Cards in Increasing Order (LeetCode 950)

**Description:** Simulate card reveal process.

```python
from collections import deque

def deck_revealed_increasing(deck):
    """Simulate card revealing"""
    deck.sort()
    n = len(deck)
    queue = deque(range(n))
    result = [0] * n
    
    for card in deck:
        idx = queue.popleft()
        result[idx] = card
        
        if queue:
            queue.append(queue.popleft())
    
    return result

# Test
deck = [17, 13, 11, 2, 3, 5, 7]
print(deck_revealed_increasing(deck))
# Output: [2, 13, 3, 11, 5, 17, 7]
```

**Time:** O(n log n) | **Space:** O(n)

---

## 🔴 Hard Problems

### Problem 13: Shortest Subarray with Sum at Least K (LeetCode 862)

**Description:** Find shortest subarray with sum ≥ k.

```python
from collections import deque

def shortest_subarray(nums, k):
    """Find shortest subarray with sum >= k"""
    n = len(nums)
    prefix = [0] * (n + 1)
    
    # Build prefix sum
    for i in range(n):
        prefix[i + 1] = prefix[i] + nums[i]
    
    dq = deque()
    result = float('inf')
    
    for i in range(n + 1):
        # Check if we can form valid subarray
        while dq and prefix[i] - prefix[dq[0]] >= k:
            result = min(result, i - dq.popleft())
        
        # Maintain increasing order
        while dq and prefix[i] <= prefix[dq[-1]]:
            dq.pop()
        
        dq.append(i)
    
    return result if result != float('inf') else -1

# Test
nums = [2, -1, 2]
k = 3
print(shortest_subarray(nums, k))  # 3
```

**Time:** O(n) | **Space:** O(n)

---

### Problem 14: Jump Game VI (LeetCode 1696)

**Description:** Maximum score to reach last index with jumps ≤ k.

```python
from collections import deque

def max_result(nums, k):
    """Max score with jumps <= k"""
    n = len(nums)
    dp = [0] * n
    dp[0] = nums[0]
    dq = deque([0])
    
    for i in range(1, n):
        # Remove indices out of range
        while dq and dq[0] < i - k:
            dq.popleft()
        
        # Calculate max score
        dp[i] = nums[i] + dp[dq[0]]
        
        # Maintain decreasing order
        while dq and dp[dq[-1]] <= dp[i]:
            dq.pop()
        
        dq.append(i)
    
    return dp[n - 1]

# Test
nums = [1, -1, -2, 4, -7, 3]
k = 2
print(max_result(nums, k))  # 7
```

**Time:** O(n) | **Space:** O(n)

---

### Problem 15: Design Front Middle Back Queue (LeetCode 1670)

**Description:** Queue with push/pop at front, middle, and back.

```python
from collections import deque

class FrontMiddleBackQueue:
    def __init__(self):
        self.left = deque()
        self.right = deque()
    
    def _balance(self):
        """Balance two deques"""
        if len(self.left) > len(self.right) + 1:
            self.right.appendleft(self.left.pop())
        elif len(self.right) > len(self.left):
            self.left.append(self.right.popleft())
    
    def pushFront(self, val):
        self.left.appendleft(val)
        self._balance()
    
    def pushMiddle(self, val):
        if len(self.left) > len(self.right):
            self.right.appendleft(self.left.pop())
        self.left.append(val)
    
    def pushBack(self, val):
        self.right.append(val)
        self._balance()
    
    def popFront(self):
        if not self.left and not self.right:
            return -1
        val = self.left.popleft() if self.left else self.right.popleft()
        self._balance()
        return val
    
    def popMiddle(self):
        if not self.left and not self.right:
            return -1
        val = self.left.pop()
        self._balance()
        return val
    
    def popBack(self):
        if not self.left and not self.right:
            return -1
        val = self.right.pop() if self.right else self.left.pop()
        self._balance()
        return val
```

**Time:** O(1) for all operations | **Space:** O(n)

---

## ✅ Problem-Solving Checklist

- [ ] Solved all 5 easy problems
- [ ] Solved at least 5 medium problems
- [ ] Attempted at least 1 hard problem
- [ ] Can explain solutions clearly
- [ ] Understood time/space complexity
- [ ] Practiced without looking at solutions

---

## 🚀 Next Steps

1. **[Interview Questions →](./09-Interview-Questions.md)**
2. **Solve similar problems on LeetCode**
3. **Time yourself solving problems**
4. **Explain solutions to others**

---

**Key Takeaway:** Practice is key! Solve problems regularly to master queue patterns. 🎯

[← Back: Applications](./07-Queue-Applications.md) | [Back to Chapter](./README.md) | [Next: Interview Questions →](./09-Interview-Questions.md)
