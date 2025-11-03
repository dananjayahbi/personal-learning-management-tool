# Linked List - Easy Problems

## 🎯 Problem Set Overview

This section contains **10 easy linked list problems** to master pointer manipulation and recursive thinking.

**Time to Complete:** 2-3 days  
**Key Skills:** Pointer manipulation, recursion, dummy nodes

---

## Problem 1: Reverse Linked List

**Link:** [LeetCode 206](https://leetcode.com/problems/reverse-linked-list/)  
**Difficulty:** Easy  
**Pattern:** Iterative/Recursive Pointer Manipulation

### Problem Statement
Reverse a singly linked list.

### Examples
```
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Input: head = [1,2]
Output: [2,1]

Input: head = []
Output: []
```

### Solution 1: Iterative
```python
def reverse_list(head):
    """
    Iterative three-pointer approach.
    
    Time: O(n)
    Space: O(1)
    """
    prev = None
    current = head
    
    while current:
        # Save next node
        next_node = current.next
        
        # Reverse link
        current.next = prev
        
        # Move pointers
        prev = current
        current = next_node
    
    return prev
```

### Solution 2: Recursive
```python
def reverse_list_recursive(head):
    """
    Recursive approach.
    
    Time: O(n)
    Space: O(n) - recursion stack
    """
    # Base case
    if not head or not head.next:
        return head
    
    # Recursive case
    new_head = reverse_list_recursive(head.next)
    
    # Reverse the link
    head.next.next = head
    head.next = None
    
    return new_head
```

### Key Insights
- Iterative: Track prev, current, next
- Recursive: Reverse link after recursive call
- Dummy node not needed here

**Complexity:**
- Time: O(n)
- Space: O(1) iterative, O(n) recursive

---

## Problem 2: Merge Two Sorted Lists

**Link:** [LeetCode 21](https://leetcode.com/problems/merge-two-sorted-lists/)  
**Difficulty:** Easy  
**Pattern:** Two Pointers + Dummy Node

### Problem Statement
Merge two sorted linked lists into one sorted list.

### Examples
```
Input: l1 = [1,2,4], l2 = [1,3,4]
Output: [1,1,2,3,4,4]

Input: l1 = [], l2 = []
Output: []
```

### Solution
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_two_lists(l1, l2):
    """
    Use dummy node to simplify edge cases.
    
    Time: O(n + m)
    Space: O(1)
    """
    # Dummy node to simplify logic
    dummy = ListNode(0)
    current = dummy
    
    # Merge while both lists have nodes
    while l1 and l2:
        if l1.val <= l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    
    # Attach remaining nodes
    current.next = l1 if l1 else l2
    
    return dummy.next
```

### Recursive Solution
```python
def merge_two_lists_recursive(l1, l2):
    """Elegant recursive solution."""
    if not l1:
        return l2
    if not l2:
        return l1
    
    if l1.val <= l2.val:
        l1.next = merge_two_lists_recursive(l1.next, l2)
        return l1
    else:
        l2.next = merge_two_lists_recursive(l1, l2.next)
        return l2
```

### Key Insights
- Dummy node simplifies edge cases
- Two pointers to track both lists
- Recursive solution is elegant

**Complexity:**
- Time: O(n + m)
- Space: O(1) iterative, O(n + m) recursive

---

## Problem 3: Remove Duplicates from Sorted List

**Link:** [LeetCode 83](https://leetcode.com/problems/remove-duplicates-from-sorted-list/)  
**Difficulty:** Easy  
**Pattern:** Single Pointer

### Problem Statement
Remove duplicates from sorted linked list.

### Examples
```
Input: head = [1,1,2]
Output: [1,2]

Input: head = [1,1,2,3,3]
Output: [1,2,3]
```

### Solution
```python
def delete_duplicates(head):
    """
    Skip nodes with same value as current.
    
    Time: O(n)
    Space: O(1)
    """
    if not head:
        return head
    
    current = head
    
    while current and current.next:
        if current.val == current.next.val:
            # Skip duplicate
            current.next = current.next.next
        else:
            # Move to next unique value
            current = current.next
    
    return head
```

### Key Insights
- No dummy node needed (head never removed)
- Skip duplicate nodes by adjusting pointers
- Don't move current when skipping duplicates

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 4: Linked List Cycle

**Link:** [LeetCode 141](https://leetcode.com/problems/linked-list-cycle/)  
**Difficulty:** Easy  
**Pattern:** Floyd's Cycle Detection (Slow/Fast Pointers)

### Problem Statement
Determine if linked list has a cycle.

### Examples
```
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: Cycle connects tail to node index 1

Input: head = [1,2], pos = -1
Output: false
```

### Solution
```python
def has_cycle(head):
    """
    Floyd's Tortoise and Hare algorithm.
    
    Time: O(n)
    Space: O(1)
    """
    if not head or not head.next:
        return False
    
    slow = head
    fast = head.next
    
    while slow != fast:
        # If fast reaches end, no cycle
        if not fast or not fast.next:
            return False
        
        slow = slow.next
        fast = fast.next.next
    
    return True
```

### Alternative (Same Start)
```python
def has_cycle_alt(head):
    """Start both pointers at head."""
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        if slow == fast:
            return True
    
    return False
```

### Key Insights
- Fast pointer moves twice as fast
- If cycle exists, they will meet
- If no cycle, fast reaches end
- Mathematical proof: gap closes by 1 each iteration

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 5: Remove Linked List Elements

**Link:** [LeetCode 203](https://leetcode.com/problems/remove-linked-list-elements/)  
**Difficulty:** Easy  
**Pattern:** Dummy Node

### Problem Statement
Remove all nodes with specific value.

### Examples
```
Input: head = [1,2,6,3,4,5,6], val = 6
Output: [1,2,3,4,5]

Input: head = [], val = 1
Output: []
```

### Solution
```python
def remove_elements(head, val):
    """
    Use dummy node to handle head removal.
    
    Time: O(n)
    Space: O(1)
    """
    dummy = ListNode(0)
    dummy.next = head
    
    current = dummy
    
    while current.next:
        if current.next.val == val:
            # Remove node
            current.next = current.next.next
        else:
            # Move to next
            current = current.next
    
    return dummy.next
```

### Recursive Solution
```python
def remove_elements_recursive(head, val):
    """Clean recursive solution."""
    if not head:
        return None
    
    head.next = remove_elements_recursive(head.next, val)
    
    return head.next if head.val == val else head
```

### Key Insights
- Dummy node handles head removal
- Check current.next, not current
- Recursive solution is elegant

**Complexity:**
- Time: O(n)
- Space: O(1) iterative, O(n) recursive

---

## Problem 6: Middle of Linked List

**Link:** [LeetCode 876](https://leetcode.com/problems/middle-of-the-linked-list/)  
**Difficulty:** Easy  
**Pattern:** Slow/Fast Pointers

### Problem Statement
Find middle node of linked list.

### Examples
```
Input: head = [1,2,3,4,5]
Output: [3,4,5]
Explanation: Middle node is 3

Input: head = [1,2,3,4,5,6]
Output: [4,5,6]
Explanation: Two middle nodes, return second
```

### Solution
```python
def middle_node(head):
    """
    Slow moves 1 step, fast moves 2 steps.
    
    Time: O(n)
    Space: O(1)
    """
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    return slow
```

### Key Insights
- When fast reaches end, slow is at middle
- For even length, returns second middle
- To return first middle for even length, use `fast.next.next`

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 7: Palindrome Linked List

**Link:** [LeetCode 234](https://leetcode.com/problems/palindrome-linked-list/)  
**Difficulty:** Easy  
**Pattern:** Slow/Fast + Reverse

### Problem Statement
Check if linked list is palindrome.

### Examples
```
Input: head = [1,2,2,1]
Output: true

Input: head = [1,2]
Output: false
```

### Solution
```python
def is_palindrome(head):
    """
    1. Find middle
    2. Reverse second half
    3. Compare both halves
    
    Time: O(n)
    Space: O(1)
    """
    if not head or not head.next:
        return True
    
    # Find middle
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    # Reverse second half
    prev = None
    while slow:
        next_node = slow.next
        slow.next = prev
        prev = slow
        slow = next_node
    
    # Compare halves
    left, right = head, prev
    while right:  # right half is shorter or equal
        if left.val != right.val:
            return False
        left = left.next
        right = right.next
    
    return True
```

### Key Insights
- Find middle using slow/fast
- Reverse second half in-place
- Compare first and reversed second half
- O(1) space solution

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## Problem 8: Intersection of Two Linked Lists

**Link:** [LeetCode 160](https://leetcode.com/problems/intersection-of-two-linked-lists/)  
**Difficulty:** Easy  
**Pattern:** Two Pointers

### Problem Statement
Find node where two lists intersect.

### Examples
```
Input: listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]
Output: 8
Explanation: Intersect at node with value 8
```

### Solution
```python
def get_intersection_node(headA, headB):
    """
    Two pointers switch lists when reaching end.
    
    Time: O(n + m)
    Space: O(1)
    """
    if not headA or not headB:
        return None
    
    pA, pB = headA, headB
    
    while pA != pB:
        # Move to next or switch lists
        pA = pA.next if pA else headB
        pB = pB.next if pB else headA
    
    return pA  # Could be None if no intersection
```

### Key Insights
- Length difference eliminated by switching
- Both pointers travel same distance
- Meet at intersection or None
- Elegant mathematical solution

**Complexity:**
- Time: O(n + m)
- Space: O(1)

---

## Problem 9: Delete Node in Linked List

**Link:** [LeetCode 237](https://leetcode.com/problems/delete-node-in-a-linked-list/)  
**Difficulty:** Easy  
**Pattern:** Value Copying

### Problem Statement
Delete a node (not tail) given only access to that node.

### Examples
```
Input: head = [4,5,1,9], node = 5
Output: [4,1,9]
Explanation: Given access to node 5, delete it
```

### Solution
```python
def delete_node(node):
    """
    Copy next node's value and skip next node.
    
    Time: O(1)
    Space: O(1)
    """
    # Copy next node's value
    node.val = node.next.val
    
    # Skip next node
    node.next = node.next.next
```

### Key Insights
- Can't access previous node
- Copy next node's data to current
- Delete next node instead
- Clever trick but not typical

**Complexity:**
- Time: O(1)
- Space: O(1)

---

## Problem 10: Convert Binary to Integer

**Link:** [LeetCode 1290](https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/)  
**Difficulty:** Easy  
**Pattern:** Binary Conversion

### Problem Statement
Convert binary number in linked list to integer.

### Examples
```
Input: head = [1,0,1]
Output: 5
Explanation: 101 in binary = 5

Input: head = [0]
Output: 0
```

### Solution
```python
def get_decimal_value(head):
    """
    Build number by left shifting and adding.
    
    Time: O(n)
    Space: O(1)
    """
    num = 0
    
    while head:
        num = (num << 1) | head.val
        head = head.next
    
    return num
```

### Alternative
```python
def get_decimal_value_multiply(head):
    """Using multiplication."""
    num = 0
    
    while head:
        num = num * 2 + head.val
        head = head.next
    
    return num
```

### Key Insights
- Left shift (<<) equivalent to multiply by 2
- OR (|) adds current bit
- Simple traversal with accumulation

**Complexity:**
- Time: O(n)
- Space: O(1)

---

## 📊 Progress Tracker

| # | Problem | Pattern | Status | Notes |
|---|---------|---------|--------|-------|
| 1 | Reverse Linked List | Pointers/Recursion | ⬜ | |
| 2 | Merge Two Sorted Lists | Dummy Node | ⬜ | |
| 3 | Remove Duplicates | Single Pointer | ⬜ | |
| 4 | Linked List Cycle | Floyd's Algorithm | ⬜ | |
| 5 | Remove Elements | Dummy Node | ⬜ | |
| 6 | Middle of List | Slow/Fast | ⬜ | |
| 7 | Palindrome List | Slow/Fast + Reverse | ⬜ | |
| 8 | Intersection | Two Pointers | ⬜ | |
| 9 | Delete Node | Value Copying | ⬜ | |
| 10 | Binary to Integer | Bit Manipulation | ⬜ | |

---

## 🎯 Key Patterns Summary

1. **Dummy Node** - Simplifies head removal
2. **Slow/Fast Pointers** - Finding middle, cycle detection
3. **Pointer Manipulation** - Reversing, merging
4. **Recursion** - Elegant but uses stack space

---

[← Previous: Array Medium](./02-Array-Medium-Problems.md) | [Next: Linked List Medium →](./04-Linked-List-Medium-Problems.md)
