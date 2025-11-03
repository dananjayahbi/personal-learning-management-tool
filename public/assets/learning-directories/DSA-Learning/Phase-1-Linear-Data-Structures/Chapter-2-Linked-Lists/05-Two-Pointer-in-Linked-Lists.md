# 05 - Two-Pointer Technique in Linked Lists

## 🎯 Overview

The **Two-Pointer Technique** is extremely powerful for linked list problems. Unlike arrays where we can use indices, in linked lists we use two node references that move at different speeds or start from different positions.

**Common Patterns:**
1. **Fast & Slow Pointer** - Different speeds (Floyd's algorithm)
2. **Leading & Trailing** - Fixed distance apart
3. **Start & End** - From different positions

---

## 🐢🐰 Pattern 1: Fast & Slow Pointer (Floyd's)

### Concept:
- **Slow pointer:** Moves 1 step at a time
- **Fast pointer:** Moves 2 steps at a time

**Key Insight:** When fast reaches end, slow is at middle!

---

### Problem 1: Find Middle of Linked List

**LeetCode #876**

**Time:** O(n) | **Space:** O(1)

```python
def find_middle(head):
    """
    Find middle node of linked list
    If even number of nodes, return second middle
    """
    if not head:
        return None
    
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    return slow

# Example:
# List: 1 → 2 → 3 → 4 → 5 → null
# Result: Node(3)
```

**Visual:**
```
Initial: slow=1, fast=1
Step 1:  slow=2, fast=3
Step 2:  slow=3, fast=5
Step 3:  fast=null, STOP
Result:  slow=3 (middle)
```

**For First Middle (Even Length):**
```python
def find_first_middle(head):
    if not head or not head.next:
        return head
    
    slow = fast = head
    
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next
    
    return slow
```

---

### Problem 2: Detect Cycle

**LeetCode #141**

**Time:** O(n) | **Space:** O(1)

```python
def has_cycle(head):
    """
    Detect if linked list has a cycle
    Floyd's Cycle Detection Algorithm
    """
    if not head or not head.next:
        return False
    
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        if slow == fast:
            return True  # Cycle detected!
    
    return False

# Example:
# List: 1 → 2 → 3 → 4
#           ↑       ↓
#           ←───────┘
# Result: True
```

**Why It Works:**
- If there's a cycle, fast will eventually catch up to slow
- Think of it as two runners on a circular track
- Fast runner will lap slow runner

---

### Problem 3: Find Cycle Start Node

**LeetCode #142**

**Time:** O(n) | **Space:** O(1)

```python
def detect_cycle(head):
    """
    Find the node where cycle begins
    """
    if not head or not head.next:
        return None
    
    # Phase 1: Detect if cycle exists
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
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next
    
    return slow  # Cycle starts here

# Mathematical proof:
# Distance from head to cycle start = L
# Distance from cycle start to meeting point = C
# When they meet: 
#   Slow traveled: L + C
#   Fast traveled: L + C + nK (n cycles)
# Since fast is 2x speed: 2(L + C) = L + C + nK
# Therefore: L = nK - C
```

---

## 🎯 Pattern 2: Leading & Trailing Pointers

### Problem 4: Remove Nth Node from End

**LeetCode #19**

**Time:** O(n) | **Space:** O(1)

```python
def remove_nth_from_end(head, n):
    """
    Remove nth node from end of list
    """
    dummy = Node(0)
    dummy.next = head
    
    # Move fast pointer n steps ahead
    fast = slow = dummy
    for _ in range(n + 1):
        if not fast:
            return head  # n is too large
        fast = fast.next
    
    # Move both pointers until fast reaches end
    while fast:
        slow = slow.next
        fast = fast.next
    
    # Remove the node
    slow.next = slow.next.next
    
    return dummy.next

# Example:
# List: 1 → 2 → 3 → 4 → 5, n=2
# Remove 4 (2nd from end)
# Result: 1 → 2 → 3 → 5
```

**Visual:**
```
Initial: dummy → 1 → 2 → 3 → 4 → 5 → null
                 ↑           ↑
               slow         fast (n+1 steps ahead)

Move both:
                      ↑           ↑
                    slow         fast

Delete: slow.next = slow.next.next
Result: 1 → 2 → 3 → 5
```

---

### Problem 5: Reorder List

**LeetCode #143**

**Time:** O(n) | **Space:** O(1)

```python
def reorder_list(head):
    """
    Reorder list: L0 → L1 → ... → Ln-1 → Ln
    To: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...
    """
    if not head or not head.next:
        return
    
    # Step 1: Find middle
    slow = fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next
    
    # Step 2: Reverse second half
    second = slow.next
    slow.next = None  # Split list
    second = reverse_list(second)
    
    # Step 3: Merge two halves
    first = head
    while second:
        temp1, temp2 = first.next, second.next
        first.next = second
        second.next = temp1
        first, second = temp1, temp2

def reverse_list(head):
    prev = None
    current = head
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    return prev

# Example:
# Input:  1 → 2 → 3 → 4 → 5
# Output: 1 → 5 → 2 → 4 → 3
```

---

### Problem 6: Palindrome Linked List

**LeetCode #234**

**Time:** O(n) | **Space:** O(1)

```python
def is_palindrome(head):
    """
    Check if linked list is palindrome
    """
    if not head or not head.next:
        return True
    
    # Find middle
    slow = fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next
    
    # Reverse second half
    second = reverse_list(slow.next)
    
    # Compare two halves
    first = head
    while second:
        if first.data != second.data:
            return False
        first = first.next
        second = second.next
    
    return True

# Example:
# 1 → 2 → 3 → 2 → 1 → True
# 1 → 2 → 3 → 4 → 5 → False
```

---

## 🎯 Pattern 3: Intersection & Distance

### Problem 7: Intersection of Two Lists

**LeetCode #160**

**Time:** O(m + n) | **Space:** O(1)

```python
def get_intersection_node(headA, headB):
    """
    Find intersection node of two linked lists
    """
    if not headA or not headB:
        return None
    
    # Two pointers
    pA, pB = headA, headB
    
    # Traverse both lists
    # When one reaches end, switch to other list's head
    while pA != pB:
        pA = pA.next if pA else headB
        pB = pB.next if pB else headA
    
    return pA  # Intersection or None

# Why it works:
# Length of A: a + c (c = common part)
# Length of B: b + c
# After switch: both travel a + b + c distance
# They meet at intersection or null
```

**Visual:**
```
List A: 1 → 2 → 3 ↘
                   8 → 9 → 10
List B: 4 → 5 ↗

pA travels: 1→2→3→8→9→10→4→5→8
pB travels: 4→5→8→9→10→1→2→3→8
They meet at 8!
```

---

### Problem 8: Linked List Cycle Length

**Time:** O(n) | **Space:** O(1)

```python
def cycle_length(head):
    """
    Find length of cycle if it exists
    """
    if not head or not head.next:
        return 0
    
    # Detect cycle
    slow = fast = head
    has_cycle = False
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            has_cycle = True
            break
    
    if not has_cycle:
        return 0
    
    # Count cycle length
    count = 1
    slow = slow.next
    while slow != fast:
        count += 1
        slow = slow.next
    
    return count
```

---

## 📊 Problem Pattern Summary

| Pattern | Use Case | Example |
|---------|----------|---------|
| **Fast & Slow** | Find middle, detect cycle | Middle node, cycle detection |
| **Fixed Distance** | Nth from end | Remove nth node |
| **Two Lists** | Compare or merge | Intersection, merge |
| **Three Pointers** | Reversal | Reverse list |

---

## 🧪 Practice Problems

### Easy:
1. Find middle of linked list
2. Detect cycle
3. Remove duplicates

### Medium:
4. Remove nth node from end
5. Find cycle start
6. Reorder list
7. Palindrome linked list
8. Intersection of two lists
9. Add two numbers
10. Rotate list

### Hard:
11. Merge k sorted lists
12. Reverse nodes in k-group
13. Copy list with random pointer

---

## 💡 Key Takeaways

1. ✅ **Fast & Slow:** Different speeds for cycle/middle problems
2. ✅ **Fixed Distance:** Keep pointers n nodes apart
3. ✅ **Dummy Node:** Simplifies edge cases
4. ✅ **Three Pointers:** For reversal operations
5. ✅ **Draw It Out:** Visualize pointer movements
6. ✅ Always check for **null** pointers
7. ✅ **O(1) space** using pointers vs O(n) using extra storage

---

[← Back to Circular Linked List](./04-Circular-Linked-List.md) | [Back to Chapter](./README.md) | [Next: Reversal Techniques →](./06-Reversal-Techniques.md)
