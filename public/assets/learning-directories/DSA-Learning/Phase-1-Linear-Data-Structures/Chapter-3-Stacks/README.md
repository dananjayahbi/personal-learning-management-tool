# Chapter 3: Stacks 📚

## Overview

A **Stack** is a linear data structure that follows the **Last In, First Out (LIFO)** principle. Think of it like a stack of plates - you can only add or remove plates from the top. Stacks are fundamental in computer science and have numerous applications in algorithms, memory management, and system design.

---

## 📖 Learning Path

### 1. Fundamentals
- [01 - Stack Basics](01-Stack-Basics.md)
  - LIFO principle
  - Stack operations (Push, Pop, Peek)
  - Stack terminology
  - Real-world analogies

### 2. Implementation
- [02 - Stack Implementation](02-Stack-Implementation.md)
  - Array-based implementation
  - Linked list-based implementation
  - Dynamic resizing
  - Time and space complexity analysis

### 3. Core Applications
- [03 - Stack Applications](03-Stack-Applications.md)
  - Function call stack
  - Undo/Redo functionality
  - Browser history
  - Backtracking algorithms

### 4. Expression Processing
- [04 - Expression Evaluation](04-Expression-Evaluation.md)
  - Infix to Postfix conversion
  - Infix to Prefix conversion
  - Postfix evaluation
  - Prefix evaluation
  - Operator precedence and associativity

### 5. Bracket Problems
- [05 - Parentheses Matching](05-Parentheses-Matching.md)
  - Balanced parentheses
  - Valid brackets
  - Minimum additions to balance
  - Score of parentheses

### 6. Advanced Patterns
- [06 - Monotonic Stack](06-Monotonic-Stack.md)
  - Monotonic increasing stack
  - Monotonic decreasing stack
  - Next Greater Element (NGE)
  - Next Smaller Element (NSE)
  - Previous Greater/Smaller
  - Trapping rain water
  - Largest rectangle in histogram

### 7. Practice Problems
- [07 - Stack Problems](07-Stack-Problems.md)
  - Easy level problems
  - Medium level problems
  - Hard level problems
  - LeetCode references

### 8. Solutions Guide
- [08 - Solutions Guide](08-Solutions-Guide.md)
  - Detailed solutions with explanations
  - Multiple approaches
  - Optimization techniques
  - Common pitfalls

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

✅ Understand the LIFO principle and stack operations  
✅ Implement stack using arrays and linked lists  
✅ Convert between infix, postfix, and prefix expressions  
✅ Solve bracket matching and validation problems  
✅ Apply monotonic stack pattern to optimization problems  
✅ Recognize when to use stacks in problem-solving  
✅ Analyze time and space complexity of stack operations  

---

## ⏱️ Time Complexity Quick Reference

| Operation | Array-Based | Linked List-Based |
|-----------|-------------|-------------------|
| Push      | O(1)*       | O(1)              |
| Pop       | O(1)        | O(1)              |
| Peek/Top  | O(1)        | O(1)              |
| isEmpty   | O(1)        | O(1)              |
| Size      | O(1)        | O(1)              |

*Amortized O(1) for dynamic arrays with resizing

---

## 🔑 Key Patterns to Master

1. **Basic Stack Operations** - Push, Pop, Peek
2. **Expression Conversion** - Infix ↔ Postfix ↔ Prefix
3. **Bracket Matching** - Balanced parentheses validation
4. **Monotonic Stack** - Next/Previous Greater/Smaller element
5. **Stack with Min/Max** - Constant time min/max retrieval
6. **Multi-Stack** - Implementing multiple stacks in single array

---

## 📚 Common Interview Problems

### Easy
- Valid Parentheses
- Min Stack
- Baseball Game
- Next Greater Element I

### Medium
- Daily Temperatures
- Decode String
- Remove K Digits
- Asteroid Collision
- Car Fleet

### Hard
- Largest Rectangle in Histogram
- Maximal Rectangle
- Trapping Rain Water
- Basic Calculator
- Maximum Frequency Stack

---

## 🛠️ Prerequisites

Before starting this chapter, ensure you're familiar with:
- Arrays and basic operations
- Linked Lists
- Time and space complexity analysis
- Basic recursion concepts

---

## 📈 Progress Tracker

Track your progress through this chapter:

- [ ] Complete 01-Stack-Basics
- [ ] Complete 02-Stack-Implementation
- [ ] Complete 03-Stack-Applications
- [ ] Complete 04-Expression-Evaluation
- [ ] Complete 05-Parentheses-Matching
- [ ] Complete 06-Monotonic-Stack
- [ ] Solve 10+ Easy problems
- [ ] Solve 10+ Medium problems
- [ ] Solve 5+ Hard problems

---

## 💡 Pro Tips

1. **Always check for empty stack** before Pop/Peek operations
2. **Visualize the stack** as you trace through algorithms
3. **Practice converting expressions** by hand before coding
4. **Master monotonic stack** - it's powerful for optimization
5. **Think recursively** - stack naturally handles recursion
6. **Consider edge cases** - empty stack, single element, overflow

---

## 🔗 Related Topics

- **Queues** - FIFO counterpart to stacks
- **Recursion** - Uses call stack internally
- **Trees** - DFS traversal uses stack
- **Backtracking** - Stack-based state management

---

## 📖 Additional Resources

- [Visualgo - Stack Visualization](https://visualgo.net/en/list)
- [LeetCode Stack Problems](https://leetcode.com/tag/stack/)
- [GeeksforGeeks Stack Tutorial](https://www.geeksforgeeks.org/stack-data-structure/)

---

**Next:** Start with [01-Stack-Basics.md](01-Stack-Basics.md) to understand the fundamentals!
