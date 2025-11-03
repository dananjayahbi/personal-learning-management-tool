# Stack Problems 📝

## Overview

This chapter contains curated stack problems organized by difficulty level. Each problem includes problem description, constraints, and hints.

---

## Easy Problems ⭐

### 1. Valid Parentheses
**LeetCode #20**

**Problem**: Given a string containing just `()`, `{}`, `[]`, determine if the input string is valid.

**Constraints**:
- `1 <= s.length <= 10^4`
- `s` consists of parentheses only

**Example**:
```
Input: s = "()"
Output: true

Input: s = "()[]{}"
Output: true

Input: s = "(]"
Output: false
```

**Hints**:
- Use stack to track opening brackets
- Pop and match when closing bracket appears
- Stack should be empty at the end

---

### 2. Min Stack
**LeetCode #155**

**Problem**: Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

**Operations**:
- `push(val)` - Push element val onto stack
- `pop()` - Remove element on top
- `top()` - Get top element
- `getMin()` - Retrieve minimum element

**Example**:
```
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // -3
minStack.pop();
minStack.top();    // 0
minStack.getMin(); // -2
```

**Hints**:
- Maintain auxiliary stack for minimums
- Or store (value, current_min) pairs

---

### 3. Baseball Game
**LeetCode #682**

**Problem**: Calculate score based on operations array.
- Integer x: Add x points
- "+": Add sum of previous two scores
- "D": Double previous score
- "C": Remove previous score

**Example**:
```
Input: ops = ["5","2","C","D","+"]
Output: 30
Explanation:
"5" - [5]       sum=5
"2" - [5,2]     sum=7
"C" - [5]       sum=5
"D" - [5,10]    sum=15
"+" - [5,10,15] sum=30
```

**Hints**:
- Use stack to track valid scores
- Process operations one by one

---

### 4. Remove All Adjacent Duplicates
**LeetCode #1047**

**Problem**: Remove all adjacent duplicates in string.

**Example**:
```
Input: s = "abbaca"
Output: "ca"
Explanation:
"abbaca" → "aaca" → "ca"
```

**Hints**:
- Use stack to track characters
- Pop if top equals current character

---

### 5. Implement Queue using Stacks
**LeetCode #232**

**Problem**: Implement FIFO queue using only two stacks.

**Operations**:
- `push(x)` - Push element x to back
- `pop()` - Remove front element
- `peek()` - Get front element
- `empty()` - Check if empty

**Hints**:
- Use two stacks: input and output
- Transfer elements when needed

---

### 6. Implement Stack using Queues
**LeetCode #225**

**Problem**: Implement LIFO stack using only queues.

**Hints**:
- Use one or two queues
- Rotate elements to simulate LIFO

---

### 7. Backspace String Compare
**LeetCode #844**

**Problem**: Compare two strings with backspace characters (#).

**Example**:
```
Input: s = "ab#c", t = "ad#c"
Output: true
Explanation: Both become "ac"
```

**Hints**:
- Use stack to process backspaces
- Or use two pointers from end

---

### 8. Remove Outermost Parentheses
**LeetCode #1021**

**Problem**: Remove outermost parentheses of every primitive string in decomposition.

**Example**:
```
Input: s = "(()())(())"
Output: "()()()"
```

**Hints**:
- Track depth/level of parentheses
- Skip when depth is 0 or becomes 0

---

## Medium Problems ⭐⭐

### 9. Daily Temperatures
**LeetCode #739**

**Problem**: Given daily temperatures array, return array where each element is number of days until warmer temperature.

**Example**:
```
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
```

**Hints**:
- Use monotonic decreasing stack
- Store indices, not values

---

### 10. Decode String
**LeetCode #394**

**Problem**: Decode encoded string with pattern `k[encoded_string]`.

**Example**:
```
Input: s = "3[a]2[bc]"
Output: "aaabcbc"

Input: s = "3[a2[c]]"
Output: "accaccacc"
```

**Hints**:
- Use stack to track numbers and strings
- Process when ']' encountered

---

### 11. Asteroid Collision
**LeetCode #735**

**Problem**: Asteroids moving in a line. Positive = right, negative = left. Return state after collisions.

**Example**:
```
Input: asteroids = [5,10,-5]
Output: [5,10]

Input: asteroids = [8,-8]
Output: []

Input: asteroids = [10,2,-5]
Output: [10]
```

**Hints**:
- Use stack for asteroids moving right
- Process collisions when left-moving asteroid appears

---

### 12. Evaluate Reverse Polish Notation
**LeetCode #150**

**Problem**: Evaluate arithmetic expression in Reverse Polish Notation.

**Example**:
```
Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
```

**Hints**:
- Use stack for operands
- Pop two operands when operator appears

---

### 13. Simplify Path
**LeetCode #71**

**Problem**: Simplify Unix-style absolute path.

**Example**:
```
Input: path = "/home//foo/"
Output: "/home/foo"

Input: path = "/../"
Output: "/"

Input: path = "/home/./foo/../bar"
Output: "/home/bar"
```

**Hints**:
- Split by '/'
- Use stack, skip '.', pop for '..'

---

### 14. Remove K Digits
**LeetCode #402**

**Problem**: Remove k digits to make smallest possible number.

**Example**:
```
Input: num = "1432219", k = 3
Output: "1219"
```

**Hints**:
- Use monotonic increasing stack
- Remove larger digits greedily

---

### 15. Next Greater Element II
**LeetCode #503**

**Problem**: Find next greater element in circular array.

**Example**:
```
Input: nums = [1,2,1]
Output: [2,-1,2]
```

**Hints**:
- Traverse array twice
- Use monotonic stack

---

### 16. Score of Parentheses
**LeetCode #856**

**Problem**: Calculate score based on rules:
- "()" = 1
- "AB" = A + B
- "(A)" = 2 * A

**Example**:
```
Input: s = "(())"
Output: 2

Input: s = "()()"
Output: 2

Input: s = "(()(()))"
Output: 6
```

**Hints**:
- Use stack to track scores
- Double when ')' closes '('

---

### 17. Car Fleet
**LeetCode #853**

**Problem**: Cars driving to target. Slower car forms fleet. Count fleets.

**Example**:
```
Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
Output: 3
```

**Hints**:
- Sort by position
- Calculate time to reach target
- Use monotonic stack

---

### 18. Minimum Add to Make Parentheses Valid
**LeetCode #921**

**Problem**: Return minimum insertions to make parentheses valid.

**Example**:
```
Input: s = "())"
Output: 1

Input: s = "((("
Output: 3
```

**Hints**:
- Track unmatched '(' and ')'
- Count both types needed

---

### 19. Online Stock Span
**LeetCode #901**

**Problem**: Design algorithm to calculate stock span.

**Example**:
```
Input: [100,80,60,70,60,75,85]
Output: [1,1,1,2,1,4,6]
```

**Hints**:
- Use monotonic stack
- Store (price, span) pairs

---

### 20. Validate Stack Sequences
**LeetCode #946**

**Problem**: Check if popped sequence is valid for given pushed sequence.

**Example**:
```
Input: pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
Output: true
```

**Hints**:
- Simulate push/pop operations
- Use actual stack

---

## Hard Problems ⭐⭐⭐

### 21. Largest Rectangle in Histogram
**LeetCode #84**

**Problem**: Find area of largest rectangle in histogram.

**Example**:
```
Input: heights = [2,1,5,6,2,3]
Output: 10
```

**Hints**:
- Use monotonic increasing stack
- Calculate area when popping

---

### 22. Maximal Rectangle
**LeetCode #85**

**Problem**: Find largest rectangle containing only 1's in 2D matrix.

**Example**:
```
Input: matrix = [
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
Output: 6
```

**Hints**:
- Convert to histogram problem
- Apply largest rectangle for each row

---

### 23. Trapping Rain Water
**LeetCode #42**

**Problem**: Calculate trapped rainwater.

**Example**:
```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
```

**Hints**:
- Use monotonic stack
- Or two pointers approach

---

### 24. Basic Calculator
**LeetCode #224**

**Problem**: Implement basic calculator to evaluate simple expression string.

**Example**:
```
Input: s = "(1+(4+5+2)-3)+(6+8)"
Output: 23
```

**Hints**:
- Use stack for parentheses
- Track sign and running sum

---

### 25. Basic Calculator II
**LeetCode #227**

**Problem**: Calculator with +, -, *, / operators.

**Example**:
```
Input: s = "3+2*2"
Output: 7

Input: s = " 3/2 "
Output: 1
```

**Hints**:
- Use stack for operands
- Handle multiplication/division immediately

---

### 26. Remove Invalid Parentheses
**LeetCode #301**

**Problem**: Remove minimum invalid parentheses to make valid. Return all solutions.

**Example**:
```
Input: s = "()())()"
Output: ["(())()","()()()"]
```

**Hints**:
- Use BFS for level-order exploration
- Check validity at each level

---

### 27. Longest Valid Parentheses
**LeetCode #32**

**Problem**: Find length of longest valid parentheses substring.

**Example**:
```
Input: s = "(()"
Output: 2

Input: s = ")()())"
Output: 4
```

**Hints**:
- Use stack with indices
- Or dynamic programming

---

### 28. Maximum Frequency Stack
**LeetCode #895**

**Problem**: Design stack that pops most frequent element.

**Operations**:
- `push(val)` - Push val
- `pop()` - Remove and return most frequent

**Hints**:
- Track frequency
- Use map of stacks

---

### 29. Sum of Subarray Minimums
**LeetCode #907**

**Problem**: Sum of minimum values in all subarrays.

**Example**:
```
Input: arr = [3,1,2,4]
Output: 17
```

**Hints**:
- Find previous/next smaller elements
- Use monotonic stack

---

### 30. Number of Valid Subarrays
**LeetCode #1063**

**Problem**: Count subarrays where leftmost element is not smaller than others.

**Hints**:
- Use monotonic increasing stack
- Count valid subarrays for each element

---

## Problem-Solving Checklist

Before solving:
- [ ] Identify if stack is needed
- [ ] Determine stack type (regular/monotonic)
- [ ] Consider edge cases (empty, single element)
- [ ] Think about time/space complexity
- [ ] Check if two-pass or auxiliary structure needed

---

## Pattern Recognition

| Pattern | Problems |
|---------|----------|
| **Matching/Validation** | #20, #921, #1249 |
| **Next Greater/Smaller** | #496, #503, #739, #901 |
| **Area/Height** | #84, #85, #42 |
| **Expression Eval** | #150, #224, #227, #394 |
| **String Manipulation** | #402, #1047, #71 |
| **Design** | #155, #232, #225, #895 |

---

## Complexity Summary

| Category | Time | Space |
|----------|------|-------|
| **Easy** | O(n) | O(n) |
| **Medium** | O(n) - O(n log n) | O(n) |
| **Hard** | O(n) - O(n²) | O(n) |

---

**Next:** Continue to [08-Solutions-Guide.md](08-Solutions-Guide.md) for detailed solutions!
