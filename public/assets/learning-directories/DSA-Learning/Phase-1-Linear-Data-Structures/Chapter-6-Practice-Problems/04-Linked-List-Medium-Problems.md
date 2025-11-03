# Linked List - Medium Problems

## 🎯 Problem Set Overview

**10 medium linked list problems** that test advanced pointer manipulation and problem-solving skills.

**Time to Complete:** 3-4 days  
**Key Skills:** Advanced reversals, multi-pointer techniques, list manipulation

---

## Problem 1: Add Two Numbers

**Link:** [LeetCode 2](https://leetcode.com/problems/add-two-numbers/)  
**Difficulty:** Medium  
**Pattern:** Simulation + Carry

### Problem Statement
Add two numbers represented as linked lists (digits in reverse order).

### Examples
```
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807

Input: l1 = [9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,1]
```

### Solution
```python
def add_two_numbers(l1, l2):
    """
    Simulate addition with carry.
    
    Time: O(max(n, m))
    Space: O(max(n, m))
    """
    dummy = ListNode(0)
    current = dummy
    carry = 0
    
    while l1 or l2 or carry:
        # Get values (0 if node is None)
        val1 = l1.val if l1 else 0
        val2 = l2.val if l2 else 0
        
        # Calculate sum and carry
        total = val1 + val2 + carry
        carry = total // 10
        digit = total % 10
        
        # Create new node
        current.next = ListNode(digit)
        current = current.next
        
        # Move to next nodes
        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None
    
    return dummy.next
```

### Key Insights
- Handle different lengths gracefully
- Don't forget final carry
- Dummy node simplifies logic

**Complexity:**
- Time: O(max(n, m))
- Space: O(max(n, m))

---

## Problem 2: Remove Nth Node From End

**Link:** [LeetCode 19](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)  
**Difficulty:** Medium  
**Pattern:** Two Pointers (Gap)

### Problem Statement
Remove nth node from end of list in one pass.

### Examples
```
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]

Input: head = [1], n = 1
Output: []
```

### Solution
```python
def remove_nth_from_end(head, n):
    """
    Two pointers with gap of n.
    
    Time: O(L) where L is length
    Space: O(1)
    """
    dummy = ListNode(0)
    dummy.next = head
    
    # Create gap of n between fast and slow
    fast = slow = dummy
    for _ in range(n + 1):
        fast = fast.next
    
    # Move both until fast reaches end
    while fast:
        fast = fast.next
        slow = slow.next
    
    # Remove node
    slow.next = slow.next.next
    
    return dummy.next
```

### Key Insights
- Gap of n means when fast reaches end, slow is at target's previous
- Dummy node handles removing head
- Single pass solution

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 3: Reverse Linked List II

**Link:** [LeetCode 92](https://leetcode.com/problems/reverse-linked-list-ii/)  
**Difficulty:** Medium  
**Pattern:** Partial Reversal

### Problem Statement
Reverse nodes from position left to right.

### Examples
```
Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]

Input: head = [5], left = 1, right = 1
Output: [5]
```

### Solution
```python
def reverse_between(head, left, right):
    """
    Reverse sublist in-place.
    
    Time: O(n)
    Space: O(1)
    """
    if not head or left == right:
        return head
    
    dummy = ListNode(0)
    dummy.next = head
    
    # Move to node before reversal start
    prev = dummy
    for _ in range(left - 1):
        prev = prev.next
    
    # Reverse the sublist
    current = prev.next
    next_node = current.next
    
    for _ in range(right - left):
        # Move next_node to front of reversed section
        current.next = next_node.next
        next_node.next = prev.next
        prev.next = next_node
        next_node = current.next
    
    return dummy.next
```

### Key Insights
- Find node before reversal section
- Reverse by moving nodes to front one by one
- Maintain connections to unchanged parts

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 4: Reorder List

**Link:** [LeetCode 143](https://leetcode.com/problems/reorder-list/)  
**Difficulty:** Medium  
**Pattern:** Find Middle + Reverse + Merge

### Problem Statement
Reorder list: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...

### Examples
```
Input: head = [1,2,3,4]
Output: [1,4,2,3]

Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]
```

### Solution
```python
def reorder_list(head):
    """
    1. Find middle
    2. Reverse second half
    3. Merge two halves
    
    Time: O(n)
    Space: O(1)
    """
    if not head or not head.next:
        return
    
    # Step 1: Find middle
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    # Step 2: Reverse second half
    prev = None
    current = slow
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    
    # Step 3: Merge two halves
    first, second = head, prev
    while second.next:
        # Save next pointers
        tmp1, tmp2 = first.next, second.next
        
        # Interleave
        first.next = second
        second.next = tmp1
        
        # Move pointers
        first, second = tmp1, tmp2
```

### Key Insights
- Combine multiple techniques
- Find middle, reverse, merge
- Modify in-place

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 5: Copy List with Random Pointer

**Link:** [LeetCode 138](https://leetcode.com/problems/copy-list-with-random-pointer/)  
**Difficulty:** Medium  
**Pattern:** Hash Map or Interweaving

### Problem Statement
Deep copy linked list with random pointers.

### Examples
```
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
```

### Solution 1: Hash Map
```python
def copy_random_list(head):
    """
    Use hash map: old_node → new_node
    
    Time: O(n)
    Space: O(n)
    """
    if not head:
        return None
    
    # Pass 1: Create all nodes
    old_to_new = {}
    current = head
    while current:
        old_to_new[current] = Node(current.val)
        current = current.next
    
    # Pass 2: Set next and random pointers
    current = head
    while current:
        new_node = old_to_new[current]
        new_node.next = old_to_new.get(current.next)
        new_node.random = old_to_new.get(current.random)
        current = current.next
    
    return old_to_new[head]
```

### Solution 2: Interweaving (O(1) space)
```python
def copy_random_list_interweave(head):
    """
    Interweave old and new nodes.
    
    Time: O(n)
    Space: O(1)
    """
    if not head:
        return None
    
    # Step 1: Create new nodes and interweave
    current = head
    while current:
        new_node = Node(current.val)
        new_node.next = current.next
        current.next = new_node
        current = new_node.next
    
    # Step 2: Set random pointers
    current = head
    while current:
        if current.random:
            current.next.random = current.random.next
        current = current.next.next
    
    # Step 3: Separate lists
    current = head
    new_head = head.next
    while current:
        new_node = current.next
        current.next = new_node.next
        if new_node.next:
            new_node.next = new_node.next.next
        current = current.next
    
    return new_head
```

### Key Insights
- Hash map approach is straightforward
- Interweaving achieves O(1) space
- Handle random pointers carefully

**Complexity:**
- Time: O(n)
- Space: O(n) or O(1)

---

## Problem 6: Linked List Cycle II

**Link:** [LeetCode 142](https://leetcode.com/problems/linked-list-cycle-ii/)  
**Difficulty:** Medium  
**Pattern:** Floyd's Cycle Detection + Math

### Problem Statement
Return node where cycle begins, or null if no cycle.

### Examples
```
Input: head = [3,2,0,-4], pos = 1
Output: node at index 1

Input: head = [1], pos = -1
Output: null
```

### Solution
```python
def detect_cycle(head):
    """
    Floyd's algorithm + mathematical insight.
    
    Time: O(n)
    Space: O(1)
    """
    if not head or not head.next:
        return None
    
    # Phase 1: Detect cycle
    slow = fast = head
    has_cycle = False
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        if slow == fast:
            has_cycle = True
            break
    
    if not has_cycle:
        return None
    
    # Phase 2: Find cycle start
    # Move one pointer to head, both move at same speed
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next
    
    return slow
```

### Mathematical Proof
```
Let:
- L = distance from head to cycle start
- C = cycle length
- k = distance from cycle start to meeting point

When they meet:
- Slow traveled: L + k
- Fast traveled: L + k + nC (n complete cycles)
- Fast traveled twice: 2(L + k) = L + k + nC
- Simplify: L + k = nC
- Therefore: L = nC - k

This means: distance from head to cycle start = 
            distance from meeting point to cycle start
```

### Key Insights
- First phase: detect cycle
- Second phase: find cycle start
- Mathematical relationship enables solution
- Both pointers meet at cycle start

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 7: Sort List

**Link:** [LeetCode 148](https://leetcode.com/problems/sort-list/)  
**Difficulty:** Medium  
**Pattern:** Merge Sort

### Problem Statement
Sort linked list in O(n log n) time and O(1) space.

### Examples
```
Input: head = [4,2,1,3]
Output: [1,2,3,4]

Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]
```

### Solution
```python
def sort_list(head):
    """
    Merge sort for linked list.
    
    Time: O(n log n)
    Space: O(log n) - recursion stack
    """
    if not head or not head.next:
        return head
    
    # Find middle
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    # Split into two halves
    mid = slow.next
    slow.next = None
    
    # Recursively sort both halves
    left = sort_list(head)
    right = sort_list(mid)
    
    # Merge sorted halves
    return merge(left, right)

def merge(l1, l2):
    """Merge two sorted lists."""
    dummy = ListNode(0)
    current = dummy
    
    while l1 and l2:
        if l1.val <= l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    
    current.next = l1 if l1 else l2
    return dummy.next
```

### Key Insights
- Merge sort is ideal for linked lists
- Find middle using slow/fast pointers
- Split, sort recursively, merge
- O(log n) space due to recursion

**Complexity:**
- Time: O(n log n)
- Space: O(log n)

---

## Problem 8: Rotate List

**Link:** [LeetCode 61](https://leetcode.com/problems/rotate-list/)  
**Difficulty:** Medium  
**Pattern:** Find Length + Reconnect

### Problem Statement
Rotate list to the right by k places.

### Examples
```
Input: head = [1,2,3,4,5], k = 2
Output: [4,5,1,2,3]

Input: head = [0,1,2], k = 4
Output: [2,0,1]
```

### Solution
```python
def rotate_right(head, k):
    """
    1. Find length and connect tail to head
    2. Find new tail (length - k - 1 from start)
    3. Break at new tail
    
    Time: O(n)
    Space: O(1)
    """
    if not head or not head.next or k == 0:
        return head
    
    # Find length and last node
    length = 1
    tail = head
    while tail.next:
        tail = tail.next
        length += 1
    
    # Optimize k
    k = k % length
    if k == 0:
        return head
    
    # Find new tail (at position length - k - 1)
    new_tail = head
    for _ in range(length - k - 1):
        new_tail = new_tail.next
    
    # Rotate
    new_head = new_tail.next
    new_tail.next = None
    tail.next = head
    
    return new_head
```

### Key Insights
- Use k % length to handle large k
- Connect tail to head temporarily
- Find new tail, break connection
- Single pass after length calculation

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 9: Partition List

**Link:** [LeetCode 86](https://leetcode.com/problems/partition-list/)  
**Difficulty:** Medium  
**Pattern:** Two Lists

### Problem Statement
Partition list around value x: smaller nodes before, larger after.

### Examples
```
Input: head = [1,4,3,2,5,2], x = 3
Output: [1,2,2,4,3,5]
```

### Solution
```python
def partition(head, x):
    """
    Create two lists: smaller and larger.
    Then connect them.
    
    Time: O(n)
    Space: O(1)
    """
    # Two dummy nodes for two lists
    before_head = ListNode(0)
    after_head = ListNode(0)
    
    before = before_head
    after = after_head
    
    # Partition nodes
    current = head
    while current:
        if current.val < x:
            before.next = current
            before = before.next
        else:
            after.next = current
            after = after.next
        current = current.next
    
    # Connect two lists
    after.next = None  # Important: prevent cycle
    before.next = after_head.next
    
    return before_head.next
```

### Key Insights
- Two separate lists for smaller and larger
- Maintain relative order within each list
- Connect at the end
- Don't forget to terminate after list

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 10: Flatten a Multilevel Doubly Linked List

**Link:** [LeetCode 430](https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/)  
**Difficulty:** Medium  
**Pattern:** DFS/Stack

### Problem Statement
Flatten multilevel doubly linked list with child pointers.

### Solution
```python
def flatten(head):
    """
    DFS approach using stack.
    
    Time: O(n)
    Space: O(n)
    """
    if not head:
        return head
    
    dummy = Node(0)
    dummy.next = head
    
    stack = [head]
    prev = dummy
    
    while stack:
        current = stack.pop()
        
        # Connect prev to current
        prev.next = current
        current.prev = prev
        
        # Add next to stack (process child first)
        if current.next:
            stack.append(current.next)
        
        # Add child to stack
        if current.child:
            stack.append(current.child)
            current.child = None  # Remove child pointer
        
        prev = current
    
    # Detach dummy
    head.prev = None
    return head
```

### Recursive Solution
```python
def flatten_recursive(head):
    """Recursive DFS."""
    if not head:
        return head
    
    def flatten_dfs(node):
        """Returns tail of flattened list."""
        if not node:
            return None
        
        # No child or next
        if not node.child and not node.next:
            return node
        
        # Has child
        if node.child:
            next_node = node.next
            child_tail = flatten_dfs(node.child)
            
            # Connect current to child
            node.next = node.child
            node.child.prev = node
            node.child = None
            
            # Connect child tail to next
            if next_node:
                child_tail.next = next_node
                next_node.prev = child_tail
                return flatten_dfs(next_node)
            return child_tail
        
        # No child, has next
        return flatten_dfs(node.next)
    
    flatten_dfs(head)
    return head
```

### Key Insights
- Use stack for iterative DFS
- Process child before next
- Update both next and prev pointers
- Remove child pointers after flattening

**Complexity:**
- Time: O(n)
- Space: O(n)

---

## 📊 Progress Tracker

| # | Problem | Pattern | Status | Notes |
|---|---------|---------|--------|-------|
| 1 | Add Two Numbers | Simulation | ⬜ | |
| 2 | Remove Nth From End | Two Pointers | ⬜ | |
| 3 | Reverse Between | Partial Reversal | ⬜ | |
| 4 | Reorder List | Multi-step | ⬜ | |
| 5 | Copy Random List | Hash Map | ⬜ | |
| 6 | Cycle II | Floyd's + Math | ⬜ | |
| 7 | Sort List | Merge Sort | ⬜ | |
| 8 | Rotate List | Circular | ⬜ | |
| 9 | Partition List | Two Lists | ⬜ | |
| 10 | Flatten Multilevel | DFS | ⬜ | |

---

[← Previous: Linked List Easy](./03-Linked-List-Easy-Problems.md) | [Next: Stack & Queue →](./05-Stack-Queue-Problems.md)
