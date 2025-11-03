# Stack & Queue Problems

## 🎯 Problem Set Overview

**20 stack and queue problems** covering monotonic stacks, expression evaluation, design problems, and queue simulations.

**Time to Complete:** 3-4 days  
**Key Patterns:** Monotonic stack, stack for parsing, queue simulations, design problems

---

## Stack Problems (1-12)

## Problem 1: Valid Parentheses

**Link:** [LeetCode 20](https://leetcode.com/problems/valid-parentheses/)  
**Difficulty:** Easy  
**Pattern:** Stack for Matching

### Solution
```python
def is_valid(s):
    """
    Use stack to match brackets.
    Time: O(n), Space: O(n)
    """
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    
    return not stack
```

---

## Problem 2: Min Stack

**Link:** [LeetCode 155](https://leetcode.com/problems/min-stack/)  
**Difficulty:** Medium  
**Pattern:** Stack Design

### Solution
```python
class MinStack:
    """
    Track minimum using parallel stack.
    All operations O(1)
    """
    def __init__(self):
        self.stack = []
        self.min_stack = []
    
    def push(self, val):
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
    
    def pop(self):
        if self.stack.pop() == self.min_stack[-1]:
            self.min_stack.pop()
    
    def top(self):
        return self.stack[-1]
    
    def getMin(self):
        return self.min_stack[-1]
```

---

## Problem 3: Evaluate Reverse Polish Notation

**Link:** [LeetCode 150](https://leetcode.com/problems/evaluate-reverse-polish-notation/)  
**Difficulty:** Medium  
**Pattern:** Stack for Evaluation

### Solution
```python
def eval_rpn(tokens):
    """
    Use stack for operands.
    Time: O(n), Space: O(n)
    """
    stack = []
    operators = {'+', '-', '*', '/'}
    
    for token in tokens:
        if token in operators:
            b = stack.pop()
            a = stack.pop()
            if token == '+':
                result = a + b
            elif token == '-':
                result = a - b
            elif token == '*':
                result = a * b
            else:
                result = int(a / b)  # Truncate toward zero
            stack.append(result)
        else:
            stack.append(int(token))
    
    return stack[0]
```

---

## Problem 4: Daily Temperatures

**Link:** [LeetCode 739](https://leetcode.com/problems/daily-temperatures/)  
**Difficulty:** Medium  
**Pattern:** Monotonic Stack

### Solution
```python
def daily_temperatures(temperatures):
    """
    Monotonic decreasing stack stores indices.
    Time: O(n), Space: O(n)
    """
    n = len(temperatures)
    result = [0] * n
    stack = []  # Store indices
    
    for i, temp in enumerate(temperatures):
        # Pop all smaller temperatures
        while stack and temperatures[stack[-1]] < temp:
            prev_index = stack.pop()
            result[prev_index] = i - prev_index
        stack.append(i)
    
    return result
```

---

## Problem 5: Next Greater Element I

**Link:** [LeetCode 496](https://leetcode.com/problems/next-greater-element-i/)  
**Difficulty:** Easy  
**Pattern:** Monotonic Stack + Hash Map

### Solution
```python
def next_greater_element(nums1, nums2):
    """
    Precompute next greater for nums2.
    Time: O(n + m), Space: O(n)
    """
    next_greater = {}
    stack = []
    
    for num in nums2:
        while stack and stack[-1] < num:
            next_greater[stack.pop()] = num
        stack.append(num)
    
    return [next_greater.get(num, -1) for num in nums1]
```

---

## Problem 6: Next Greater Element II

**Link:** [LeetCode 503](https://leetcode.com/problems/next-greater-element-ii/)  
**Difficulty:** Medium  
**Pattern:** Monotonic Stack + Circular Array

### Solution
```python
def next_greater_elements(nums):
    """
    Process array twice for circular.
    Time: O(n), Space: O(n)
    """
    n = len(nums)
    result = [-1] * n
    stack = []
    
    # Process twice (circular)
    for i in range(2 * n):
        num = nums[i % n]
        while stack and nums[stack[-1]] < num:
            result[stack.pop()] = num
        if i < n:
            stack.append(i)
    
    return result
```

---

## Problem 7: Largest Rectangle in Histogram

**Link:** [LeetCode 84](https://leetcode.com/problems/largest-rectangle-in-histogram/)  
**Difficulty:** Hard  
**Pattern:** Monotonic Increasing Stack

### Solution
```python
def largest_rectangle_area(heights):
    """
    Monotonic increasing stack.
    Time: O(n), Space: O(n)
    """
    stack = []
    max_area = 0
    heights.append(0)  # Sentinel to flush stack
    
    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height_index = stack.pop()
            height = heights[height_index]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    
    heights.pop()  # Remove sentinel
    return max_area
```

---

## Problem 8: Simplify Path

**Link:** [LeetCode 71](https://leetcode.com/problems/simplify-path/)  
**Difficulty:** Medium  
**Pattern:** Stack for Path Processing

### Solution
```python
def simplify_path(path):
    """
    Use stack for directory levels.
    Time: O(n), Space: O(n)
    """
    stack = []
    parts = path.split('/')
    
    for part in parts:
        if part == '..' and stack:
            stack.pop()
        elif part and part != '.' and part != '..':
            stack.append(part)
    
    return '/' + '/'.join(stack)
```

---

## Problem 9: Decode String

**Link:** [LeetCode 394](https://leetcode.com/problems/decode-string/)  
**Difficulty:** Medium  
**Pattern:** Stack for Nested Encoding

### Solution
```python
def decode_string(s):
    """
    Use stack for nested brackets.
    Time: O(maxK * n), Space: O(n)
    """
    stack = []
    current_num = 0
    current_str = ''
    
    for char in s:
        if char.isdigit():
            current_num = current_num * 10 + int(char)
        elif char == '[':
            stack.append((current_str, current_num))
            current_str = ''
            current_num = 0
        elif char == ']':
            prev_str, num = stack.pop()
            current_str = prev_str + current_str * num
        else:
            current_str += char
    
    return current_str
```

---

## Problem 10: Remove K Digits

**Link:** [LeetCode 402](https://leetcode.com/problems/remove-k-digits/)  
**Difficulty:** Medium  
**Pattern:** Monotonic Increasing Stack

### Solution
```python
def remove_k_digits(num, k):
    """
    Build smallest number using monotonic stack.
    Time: O(n), Space: O(n)
    """
    stack = []
    
    for digit in num:
        while k > 0 and stack and stack[-1] > digit:
            stack.pop()
            k -= 1
        stack.append(digit)
    
    # Remove remaining k digits from end
    stack = stack[:len(stack) - k] if k > 0 else stack
    
    # Remove leading zeros
    result = ''.join(stack).lstrip('0')
    return result if result else '0'
```

---

## Problem 11: Basic Calculator

**Link:** [LeetCode 224](https://leetcode.com/problems/basic-calculator/)  
**Difficulty:** Hard  
**Pattern:** Stack for Parentheses

### Solution
```python
def calculate(s):
    """
    Use stack for parentheses nesting.
    Time: O(n), Space: O(n)
    """
    stack = []
    result = 0
    sign = 1
    num = 0
    
    for char in s:
        if char.isdigit():
            num = num * 10 + int(char)
        elif char == '+':
            result += sign * num
            sign = 1
            num = 0
        elif char == '-':
            result += sign * num
            sign = -1
            num = 0
        elif char == '(':
            stack.append(result)
            stack.append(sign)
            result = 0
            sign = 1
        elif char == ')':
            result += sign * num
            result *= stack.pop()  # Sign before parenthesis
            result += stack.pop()  # Result before parenthesis
            num = 0
    
    return result + sign * num
```

---

## Problem 12: Asteroid Collision

**Link:** [LeetCode 735](https://leetcode.com/problems/asteroid-collision/)  
**Difficulty:** Medium  
**Pattern:** Stack Simulation

### Solution
```python
def asteroid_collision(asteroids):
    """
    Simulate collisions using stack.
    Time: O(n), Space: O(n)
    """
    stack = []
    
    for asteroid in asteroids:
        alive = True
        
        while alive and asteroid < 0 and stack and stack[-1] > 0:
            # Collision
            if stack[-1] < -asteroid:
                stack.pop()
                continue
            elif stack[-1] == -asteroid:
                stack.pop()
            alive = False
        
        if alive:
            stack.append(asteroid)
    
    return stack
```

---

## Queue Problems (13-20)

## Problem 13: Implement Queue Using Stacks

**Link:** [LeetCode 232](https://leetcode.com/problems/implement-queue-using-stacks/)  
**Difficulty:** Easy  
**Pattern:** Two Stacks

### Solution
```python
class MyQueue:
    """
    Two stacks: input and output.
    Amortized O(1) for all operations.
    """
    def __init__(self):
        self.input_stack = []
        self.output_stack = []
    
    def push(self, x):
        self.input_stack.append(x)
    
    def pop(self):
        self._transfer()
        return self.output_stack.pop()
    
    def peek(self):
        self._transfer()
        return self.output_stack[-1]
    
    def empty(self):
        return not self.input_stack and not self.output_stack
    
    def _transfer(self):
        if not self.output_stack:
            while self.input_stack:
                self.output_stack.append(self.input_stack.pop())
```

---

## Problem 14: Implement Stack Using Queues

**Link:** [LeetCode 225](https://leetcode.com/problems/implement-stack-using-queues/)  
**Difficulty:** Easy  
**Pattern:** One or Two Queues

### Solution
```python
from collections import deque

class MyStack:
    """
    Single queue: rotate on push.
    Push: O(n), Others: O(1)
    """
    def __init__(self):
        self.queue = deque()
    
    def push(self, x):
        self.queue.append(x)
        # Rotate all previous elements
        for _ in range(len(self.queue) - 1):
            self.queue.append(self.queue.popleft())
    
    def pop(self):
        return self.queue.popleft()
    
    def top(self):
        return self.queue[0]
    
    def empty(self):
        return not self.queue
```

---

## Problem 15: Moving Average from Data Stream

**Link:** [LeetCode 346](https://leetcode.com/problems/moving-average-from-data-stream/)  
**Difficulty:** Easy  
**Pattern:** Queue/Circular Buffer

### Solution
```python
from collections import deque

class MovingAverage:
    """
    Use deque for sliding window.
    Time: O(1), Space: O(size)
    """
    def __init__(self, size):
        self.size = size
        self.queue = deque()
        self.window_sum = 0
    
    def next(self, val):
        self.queue.append(val)
        self.window_sum += val
        
        if len(self.queue) > self.size:
            self.window_sum -= self.queue.popleft()
        
        return self.window_sum / len(self.queue)
```

---

## Problem 16: Design Circular Queue

**Link:** [LeetCode 622](https://leetcode.com/problems/design-circular-queue/)  
**Difficulty:** Medium  
**Pattern:** Array-based Circular Buffer

### Solution
```python
class MyCircularQueue:
    """
    Array-based circular queue.
    All operations O(1)
    """
    def __init__(self, k):
        self.data = [0] * k
        self.head = 0
        self.tail = 0
        self.size = 0
        self.capacity = k
    
    def enQueue(self, value):
        if self.isFull():
            return False
        self.data[self.tail] = value
        self.tail = (self.tail + 1) % self.capacity
        self.size += 1
        return True
    
    def deQueue(self):
        if self.isEmpty():
            return False
        self.head = (self.head + 1) % self.capacity
        self.size -= 1
        return True
    
    def Front(self):
        return -1 if self.isEmpty() else self.data[self.head]
    
    def Rear(self):
        return -1 if self.isEmpty() else self.data[(self.tail - 1) % self.capacity]
    
    def isEmpty(self):
        return self.size == 0
    
    def isFull(self):
        return self.size == self.capacity
```

---

## Problem 17: Number of Recent Calls

**Link:** [LeetCode 933](https://leetcode.com/problems/number-of-recent-calls/)  
**Difficulty:** Easy  
**Pattern:** Queue with Time Window

### Solution
```python
from collections import deque

class RecentCounter:
    """
    Maintain requests in last 3000ms.
    Time: O(1) amortized, Space: O(W) where W is window size
    """
    def __init__(self):
        self.requests = deque()
    
    def ping(self, t):
        self.requests.append(t)
        
        # Remove requests older than 3000ms
        while self.requests[0] < t - 3000:
            self.requests.popleft()
        
        return len(self.requests)
```

---

## Problem 18: Design Hit Counter

**Link:** [LeetCode 362](https://leetcode.com/problems/design-hit-counter/) (Premium)  
**Difficulty:** Medium  
**Pattern:** Queue with Time Window

### Solution
```python
from collections import deque

class HitCounter:
    """
    Record hits in last 300 seconds.
    Time: O(1) amortized, Space: O(W)
    """
    def __init__(self):
        self.hits = deque()
    
    def hit(self, timestamp):
        self.hits.append(timestamp)
    
    def getHits(self, timestamp):
        # Remove hits older than 300 seconds
        while self.hits and self.hits[0] <= timestamp - 300:
            self.hits.popleft()
        return len(self.hits)
```

---

## Problem 19: Sliding Window Maximum

**Link:** [LeetCode 239](https://leetcode.com/problems/sliding-window-maximum/)  
**Difficulty:** Hard  
**Pattern:** Monotonic Deque

### Solution
```python
from collections import deque

def max_sliding_window(nums, k):
    """
    Monotonic decreasing deque stores indices.
    Time: O(n), Space: O(k)
    """
    result = []
    dq = deque()  # Store indices
    
    for i, num in enumerate(nums):
        # Remove elements outside window
        if dq and dq[0] < i - k + 1:
            dq.popleft()
        
        # Maintain decreasing order
        while dq and nums[dq[-1]] < num:
            dq.pop()
        
        dq.append(i)
        
        # Add to result if window complete
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result
```

---

## Problem 20: Design Snake Game

**Link:** [LeetCode 353](https://leetcode.com/problems/design-snake-game/) (Premium)  
**Difficulty:** Medium  
**Pattern:** Queue + Set

### Solution
```python
from collections import deque

class SnakeGame:
    """
    Snake game using deque for body and set for fast lookup.
    """
    def __init__(self, width, height, food):
        self.width = width
        self.height = height
        self.food = deque(food)
        self.snake = deque([(0, 0)])
        self.snake_set = {(0, 0)}
        self.directions = {'U': (-1, 0), 'D': (1, 0), 'L': (0, -1), 'R': (0, 1)}
    
    def move(self, direction):
        # Calculate new head position
        head = self.snake[0]
        dr, dc = self.directions[direction]
        new_head = (head[0] + dr, head[1] + dc)
        
        # Check boundaries
        if not (0 <= new_head[0] < self.height and 0 <= new_head[1] < self.width):
            return -1
        
        # Check if eating food
        if self.food and list(new_head) == self.food[0]:
            self.food.popleft()
        else:
            # Remove tail
            tail = self.snake.pop()
            self.snake_set.remove(tail)
        
        # Check self-collision (after removing tail)
        if new_head in self.snake_set:
            return -1
        
        # Add new head
        self.snake.appendleft(new_head)
        self.snake_set.add(new_head)
        
        return len(self.snake) - 1
```

---

## 📊 Progress Tracker

| # | Problem | Pattern | Difficulty | Status |
|---|---------|---------|------------|--------|
| 1 | Valid Parentheses | Stack Matching | Easy | ⬜ |
| 2 | Min Stack | Design | Medium | ⬜ |
| 3 | Eval RPN | Stack Eval | Medium | ⬜ |
| 4 | Daily Temperatures | Monotonic Stack | Medium | ⬜ |
| 5 | Next Greater I | Monotonic Stack | Easy | ⬜ |
| 6 | Next Greater II | Monotonic Stack | Medium | ⬜ |
| 7 | Largest Rectangle | Monotonic Stack | Hard | ⬜ |
| 8 | Simplify Path | Stack Processing | Medium | ⬜ |
| 9 | Decode String | Stack Nesting | Medium | ⬜ |
| 10 | Remove K Digits | Monotonic Stack | Medium | ⬜ |
| 11 | Basic Calculator | Stack + Parsing | Hard | ⬜ |
| 12 | Asteroid Collision | Stack Simulation | Medium | ⬜ |
| 13 | Queue Using Stacks | Design | Easy | ⬜ |
| 14 | Stack Using Queues | Design | Easy | ⬜ |
| 15 | Moving Average | Sliding Window | Easy | ⬜ |
| 16 | Circular Queue | Design | Medium | ⬜ |
| 17 | Recent Calls | Time Window | Easy | ⬜ |
| 18 | Hit Counter | Time Window | Medium | ⬜ |
| 19 | Sliding Window Max | Monotonic Deque | Hard | ⬜ |
| 20 | Snake Game | Queue + Set | Medium | ⬜ |

---

## 🎯 Key Pattern Summary

**Stack Patterns:**
1. **Matching/Balancing** - Parentheses, brackets
2. **Monotonic Stack** - Next greater/smaller, histogram
3. **Parsing/Evaluation** - Calculators, RPN
4. **Design** - Min stack, max stack

**Queue Patterns:**
1. **FIFO Simulation** - Process order
2. **Sliding Window** - Time-based, size-based
3. **Monotonic Deque** - Window maximum/minimum
4. **Design** - Circular queue, queue with stacks

---

[← Previous: Linked List Medium](./04-Linked-List-Medium-Problems.md) | [Next: Hashing Problems →](./06-Hashing-Problems.md)
