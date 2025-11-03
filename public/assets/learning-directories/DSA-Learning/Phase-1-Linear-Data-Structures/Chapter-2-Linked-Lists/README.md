# Chapter 2: Linked Lists

## 🎯 Chapter Overview

Welcome to Chapter 2! Linked lists are dynamic data structures that store elements in **nodes** connected by **pointers**. Unlike arrays with contiguous memory, linked lists use scattered memory locations, making insertions and deletions much more efficient.

**Duration:** 6-8 days  
**Problem Count:** 80+ problems (30 Easy, 40 Medium, 10 Hard)  
**Difficulty:** Beginner to Intermediate

---

## 📚 What You'll Learn

This chapter covers everything about linked lists:

- **List Types:** Singly, doubly, and circular linked lists
- **Core Operations:** Insertion, deletion, traversal
- **Advanced Techniques:** Two-pointer, reversal, cycle detection
- **Problem-Solving Patterns:** Merge, partition, intersection
- **Pointer Manipulation:** Master the art of working with pointers

---

## 📖 Chapter Structure

This chapter is modularized into focused sections:

### 📘 Fundamentals

1. **[01-Linked-List-Basics.md](./01-Linked-List-Basics.md)**
   - What are linked lists?
   - Nodes and pointers
   - Linked list vs arrays
   - Memory representation
   - Advantages and disadvantages

2. **[02-Singly-Linked-List.md](./02-Singly-Linked-List.md)**
   - Structure and implementation
   - Insertion operations (beginning, end, position)
   - Deletion operations
   - Traversal and searching
   - Common operations and utilities

3. **[03-Doubly-Linked-List.md](./03-Doubly-Linked-List.md)**
   - Bidirectional navigation
   - Structure and implementation
   - Advantages over singly linked lists
   - Operations (insertion, deletion, reversal)
   - When to use doubly linked lists

4. **[04-Circular-Linked-List.md](./04-Circular-Linked-List.md)**
   - Circular structure concepts
   - Singly circular lists
   - Doubly circular lists
   - Applications (round-robin scheduling, buffers)
   - Implementation and operations

### 🎯 Techniques & Algorithms

5. **[05-Two-Pointer-in-Linked-Lists.md](./05-Two-Pointer-in-Linked-Lists.md)**
   - Fast and slow pointer technique
   - Finding middle of linked list
   - Detecting cycles (Floyd's algorithm)
   - Nth node from end
   - Intersection of two lists

6. **[06-Reversal-Techniques.md](./06-Reversal-Techniques.md)**
   - Iterative reversal
   - Recursive reversal
   - Reverse in groups
   - Reverse between positions
   - Common reversal patterns

7. **[07-Cycle-Detection.md](./07-Cycle-Detection.md)**
   - Floyd's Tortoise and Hare
   - Detecting cycle existence
   - Finding cycle start node
   - Removing cycles
   - Related problems

8. **[08-Merge-and-Sort.md](./08-Merge-and-Sort.md)**
   - Merge two sorted lists
   - Merge K sorted lists
   - Sort linked list (merge sort)
   - Partition list
   - Split list operations

### 💪 Practice & Solutions

9. **[09-Practice-Problems.md](./09-Practice-Problems.md)**
   - 80+ problems categorized by difficulty
   - Easy: Building confidence (30 problems)
   - Medium: Interview level (40 problems)
   - Hard: Advanced challenges (10 problems)

10. **[10-Solutions-Guide.md](./10-Solutions-Guide.md)**
    - Detailed solutions for all problems
    - Multiple approaches
    - Time and space complexity analysis
    - Tips and edge cases

---

## 🗓️ Suggested Learning Schedule

### Day 1: Linked List Basics
- Read 01-Linked-List-Basics.md
- Read 02-Singly-Linked-List.md
- Implement singly linked list from scratch
- Solve 5-6 easy problems

### Day 2: More List Types
- Read 03-Doubly-Linked-List.md
- Read 04-Circular-Linked-List.md
- Implement doubly linked list
- Solve 4-5 problems

### Day 3: Two-Pointer Technique
- Read 05-Two-Pointer-in-Linked-Lists.md
- Practice fast-slow pointer problems
- Find middle, nth from end
- Solve 6-8 problems

### Day 4: Reversal Techniques
- Read 06-Reversal-Techniques.md
- Master iterative and recursive reversal
- Reverse in groups
- Solve 6-8 reversal problems

### Day 5: Cycle Detection
- Read 07-Cycle-Detection.md
- Implement Floyd's algorithm
- Detect and remove cycles
- Solve 5-6 cycle problems

### Day 6: Merge and Sort
- Read 08-Merge-and-Sort.md
- Merge sorted lists
- Sort linked list
- Solve 6-8 merge/sort problems

### Day 7-8: Intensive Practice
- Complete remaining practice problems
- Review difficult problems
- Timed problem-solving
- Mock interview practice

---

## 🎯 Learning Objectives

By the end of this chapter, you should be able to:

### Fundamentals:
- ✅ Explain how linked lists work in memory
- ✅ Implement singly, doubly, and circular linked lists
- ✅ Perform insertion and deletion in O(1) at known position
- ✅ Traverse and search linked lists
- ✅ Choose between array and linked list

### Techniques:
- ✅ Apply two-pointer (fast-slow) technique
- ✅ Reverse linked lists iteratively and recursively
- ✅ Detect and remove cycles using Floyd's algorithm
- ✅ Find middle node in one pass
- ✅ Merge sorted linked lists efficiently

### Problem-Solving:
- ✅ Recognize linked list patterns
- ✅ Handle edge cases (empty list, single node, cycles)
- ✅ Avoid common pointer errors
- ✅ Optimize space complexity
- ✅ Write clean, bug-free code

---

## 📊 Progress Tracker

| Topic | File | Status | Problems Solved |
|-------|------|--------|----------------|
| Basics | 01-Linked-List-Basics.md | ⬜ | - |
| Singly Linked List | 02-Singly-Linked-List.md | ⬜ | __/10 |
| Doubly Linked List | 03-Doubly-Linked-List.md | ⬜ | __/8 |
| Circular Linked List | 04-Circular-Linked-List.md | ⬜ | __/5 |
| Two-Pointer | 05-Two-Pointer-in-Linked-Lists.md | ⬜ | __/12 |
| Reversal | 06-Reversal-Techniques.md | ⬜ | __/10 |
| Cycle Detection | 07-Cycle-Detection.md | ⬜ | __/8 |
| Merge & Sort | 08-Merge-and-Sort.md | ⬜ | __/10 |
| Practice Easy | 09-Practice-Problems.md | ⬜ | __/30 |
| Practice Medium | 09-Practice-Problems.md | ⬜ | __/40 |
| Practice Hard | 09-Practice-Problems.md | ⬜ | __/10 |

**Total Progress:** __/143 problems completed

---

## 🔑 Key Concepts Summary

### Time Complexities:
- **Access:** O(n) - Must traverse from head
- **Search:** O(n) - Linear traversal
- **Insert at head:** O(1) - Just update pointers
- **Insert at tail:** O(n) without tail pointer, O(1) with tail
- **Insert at position:** O(n) - Traverse to position
- **Delete at head:** O(1) - Update head pointer
- **Delete at tail:** O(n) - Must traverse to second-last
- **Delete at position:** O(n) - Traverse to position

### Space Complexity:
- **List storage:** O(n) for n nodes
- **Extra pointers per node:** O(1) per node
- **Reversal (iterative):** O(1) extra space
- **Reversal (recursive):** O(n) due to recursion stack

### Common Patterns:
- **Two-Pointer:** Fast-slow, finding middle, cycle detection
- **Dummy Node:** Simplify edge cases
- **Reversal:** Iterative with 3 pointers
- **Merge:** Two pointers on two lists
- **Runner Technique:** Advance one pointer faster

---

## 💡 Common Pitfalls & Tips

### Pitfalls to Avoid:
- ⚠️ **Losing head reference** - Always keep track of head
- ⚠️ **Not handling null** - Check for null/None before dereferencing
- ⚠️ **Memory leaks** - In languages like C++, delete nodes properly
- ⚠️ **Off-by-one errors** - Especially in position-based operations
- ⚠️ **Infinite loops** - In circular lists, have proper termination

### Pro Tips:
1. **Draw it out:** Visualize pointers on paper before coding
2. **Use dummy node:** Simplifies insertion/deletion at head
3. **Check edge cases:** Empty list, single node, two nodes
4. **Recursive base case:** Always define what happens at null
5. **Save next:** When modifying pointers, save next node first
6. **Test in mind:** Walk through with small examples (1, 2, 3 nodes)

---

## 📚 Linked Lists vs Arrays

| Feature | Array | Linked List |
|---------|-------|-------------|
| **Memory** | Contiguous | Scattered |
| **Access** | O(1) by index | O(n) traversal |
| **Insert/Delete (beginning)** | O(n) - shifting | O(1) - pointer update |
| **Insert/Delete (end)** | O(1) if space | O(n) without tail pointer |
| **Insert/Delete (middle)** | O(n) - shifting | O(1) at known position |
| **Size** | Fixed (static) or dynamic | Dynamic |
| **Memory overhead** | None or minimal | Extra for pointers |
| **Cache performance** | Excellent | Poor |
| **Use case** | Fast access, fixed size | Dynamic size, frequent insert/delete |

---

## ✅ Chapter Completion Checklist

Before moving to Chapter 3, ensure you can:

### Implementation:
- [ ] Implement singly linked list with all operations
- [ ] Implement doubly linked list
- [ ] Implement circular linked list
- [ ] Write reversal (iterative and recursive)
- [ ] Implement Floyd's cycle detection

### Problem-Solving:
- [ ] Find middle of linked list in one pass
- [ ] Reverse linked list confidently
- [ ] Detect and remove cycle
- [ ] Merge two sorted lists
- [ ] Find intersection of two lists
- [ ] Remove nth node from end
- [ ] Check if list is palindrome

### General:
- [ ] Solved 60+ problems from this chapter (75% of total)
- [ ] Can explain pointer manipulation
- [ ] Handle edge cases correctly
- [ ] No off-by-one errors
- [ ] Understand time/space complexity of solutions

---

## 🚀 What's Next?

After mastering linked lists, you'll move to **[Chapter 3: Stacks](../Chapter-3-Stacks/README.md)**, where you'll learn:
- LIFO (Last In, First Out) principle
- Stack implementations using arrays and linked lists
- Expression evaluation
- Monotonic stack problems

**Tip:** Linked lists are fundamental to understanding trees, graphs, and many advanced data structures. Invest time in mastering pointer manipulation! 🔗

---

[← Back to Arrays & Strings](../Chapter-1-Arrays-and-Strings/README.md) | [Back to Phase 1](../README.md) | [Next: Linked List Basics →](./01-Linked-List-Basics.md)
