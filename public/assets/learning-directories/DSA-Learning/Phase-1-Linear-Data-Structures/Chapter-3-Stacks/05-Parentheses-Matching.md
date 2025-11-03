# Parentheses Matching 🔍

## Overview

Parentheses matching is a classic stack application used in compilers, text editors, and code validators. This chapter covers various bracket-related problems and their solutions.

---

## 1. Valid Parentheses (Basic)

### Problem
Check if a string containing only `()`, `{}`, `[]` is valid. Valid means:
- Every opening bracket has a corresponding closing bracket
- Brackets are closed in the correct order

### Solution

```python
def is_valid_parentheses(s):
    """
    LeetCode #20: Valid Parentheses
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    stack = []
    pairs = {'(': ')', '{': '}', '[': ']'}
    
    for char in s:
        # If opening bracket, push to stack
        if char in pairs:
            stack.append(char)
        # If closing bracket
        else:
            # Check if stack is empty or mismatch
            if not stack or pairs[stack[-1]] != char:
                return False
            stack.pop()
    
    # Valid if stack is empty
    return len(stack) == 0


# Test cases
print(is_valid_parentheses("()"))          # True
print(is_valid_parentheses("()[]{}"))      # True
print(is_valid_parentheses("(]"))          # False
print(is_valid_parentheses("([)]"))        # False
print(is_valid_parentheses("{[]}"))        # True
print(is_valid_parentheses(""))            # True
```

### Visualization: `{[()]}`

```
Input: {[()]}

Step | Char | Stack         | Action
-----|------|---------------|--------
 1   |  {   | ['{']         | Push
 2   |  [   | ['{', '[']    | Push
 3   |  (   | ['{','[','('] | Push
 4   |  )   | ['{', '[']    | Match ( → Pop
 5   |  ]   | ['{']         | Match [ → Pop
 6   |  }   | []            | Match { → Pop

Result: Stack empty → Valid ✓
```

### Edge Cases

```python
# Empty string
assert is_valid_parentheses("") == True

# Single opening
assert is_valid_parentheses("(") == False

# Single closing
assert is_valid_parentheses(")") == False

# Wrong order
assert is_valid_parentheses("([)]") == False

# Extra opening
assert is_valid_parentheses("((())") == False

# Extra closing
assert is_valid_parentheses("(()))") == False
```

---

## 2. Minimum Add to Make Parentheses Valid

### Problem
Given a string of `(` and `)`, return minimum insertions needed to make it valid.

### Solution

```python
def min_add_to_make_valid(s):
    """
    LeetCode #921: Minimum Add to Make Parentheses Valid
    
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    open_needed = 0   # Track unmatched ')'
    close_needed = 0  # Track unmatched '('
    
    for char in s:
        if char == '(':
            close_needed += 1
        elif char == ')':
            if close_needed > 0:
                close_needed -= 1  # Match with previous '('
            else:
                open_needed += 1   # Need to add '('
    
    return open_needed + close_needed


# Test cases
print(min_add_to_make_valid("())"))        # 1 (add '(' at start)
print(min_add_to_make_valid("((("))        # 3 (add ')))')
print(min_add_to_make_valid("()"))         # 0
print(min_add_to_make_valid("()))(("))     # 4
```

### Visualization: `())`

```
Input: ())

Step | Char | close_needed | open_needed | Note
-----|------|--------------|-------------|-----
 1   |  (   |      1       |      0      | Need closing
 2   |  )   |      0       |      0      | Matched
 3   |  )   |      0       |      1      | Extra ), need (

Result: open_needed + close_needed = 0 + 1 = 1
```

---

## 3. Valid Parenthesis String

### Problem
Given a string with `(`, `)`, and `*` (can be `(`, `)`, or empty), check if valid.

### Solution 1: Greedy Approach

```python
def check_valid_string(s):
    """
    LeetCode #678: Valid Parenthesis String
    
    Time Complexity: O(n)
    Space Complexity: O(1)
    
    Strategy: Track min and max possible open brackets
    """
    min_open = 0  # Minimum open brackets
    max_open = 0  # Maximum open brackets
    
    for char in s:
        if char == '(':
            min_open += 1
            max_open += 1
        elif char == ')':
            min_open -= 1
            max_open -= 1
        else:  # char == '*'
            min_open -= 1  # Treat as ')'
            max_open += 1  # Treat as '('
        
        # Too many closing brackets
        if max_open < 0:
            return False
        
        # Keep min_open non-negative
        min_open = max(min_open, 0)
    
    return min_open == 0


# Test cases
print(check_valid_string("()"))            # True
print(check_valid_string("(*)"))           # True
print(check_valid_string("(*))"))          # True
print(check_valid_string("(()"))           # False
print(check_valid_string("((*)"))          # True
```

### Solution 2: Two-Pass Greedy

```python
def check_valid_string_v2(s):
    """
    Alternative: Two-pass greedy
    
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    # First pass: left to right (check closing brackets)
    balance = 0
    for char in s:
        if char == '(' or char == '*':
            balance += 1
        else:
            balance -= 1
        
        if balance < 0:
            return False
    
    # Second pass: right to left (check opening brackets)
    balance = 0
    for char in reversed(s):
        if char == ')' or char == '*':
            balance += 1
        else:
            balance -= 1
        
        if balance < 0:
            return False
    
    return True


# Test cases
print(check_valid_string_v2("(*)"))        # True
print(check_valid_string_v2("(*))"))       # True
```

---

## 4. Score of Parentheses

### Problem
Given a balanced parentheses string, calculate score:
- `()` has score 1
- `AB` has score `A + B`
- `(A)` has score `2 * A`

### Solution

```python
def score_of_parentheses(s):
    """
    LeetCode #856: Score of Parentheses
    
    Examples:
    - "()" = 1
    - "(())" = 2
    - "()()" = 2
    - "(()(()))" = 6
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    stack = [0]  # Start with 0 on stack
    
    for char in s:
        if char == '(':
            stack.append(0)
        else:  # char == ')'
            top = stack.pop()
            # If top is 0, it's "()" → score 1
            # Otherwise, it's "(A)" → score 2 * A
            score = 1 if top == 0 else 2 * top
            stack[-1] += score
    
    return stack[0]


# Test cases
print(score_of_parentheses("()"))          # 1
print(score_of_parentheses("(())"))        # 2
print(score_of_parentheses("()()"))        # 2
print(score_of_parentheses("(()(()))"))    # 6
```

### Visualization: `(()(()))`

```
Input: (()(()))

Step | Char | Stack         | Action
-----|------|---------------|------------------
 1   |  (   | [0, 0]        | Push 0
 2   |  (   | [0, 0, 0]     | Push 0
 3   |  )   | [0, 1]        | Pop 0 → () = 1
 4   |  (   | [0, 1, 0]     | Push 0
 5   |  (   | [0, 1, 0, 0]  | Push 0
 6   |  )   | [0, 1, 1]     | Pop 0 → () = 1
 7   |  )   | [0, 3]        | Pop 1 → (A) = 2*1 = 2, add to previous 1 = 3
 8   |  )   | [6]           | Pop 3 → (A) = 2*3 = 6

Result: 6
```

---

## 5. Longest Valid Parentheses

### Problem
Find length of longest valid (well-formed) parentheses substring.

### Solution 1: Stack-based

```python
def longest_valid_parentheses(s):
    """
    LeetCode #32: Longest Valid Parentheses
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    stack = [-1]  # Initialize with -1 as base
    max_length = 0
    
    for i, char in enumerate(s):
        if char == '(':
            stack.append(i)
        else:  # char == ')'
            stack.pop()
            
            if not stack:
                # No matching '(', use as new base
                stack.append(i)
            else:
                # Calculate length from current base
                max_length = max(max_length, i - stack[-1])
    
    return max_length


# Test cases
print(longest_valid_parentheses("(()"))         # 2
print(longest_valid_parentheses(")()())"))      # 4
print(longest_valid_parentheses(""))            # 0
print(longest_valid_parentheses("()(()"))       # 2
```

### Solution 2: Dynamic Programming

```python
def longest_valid_parentheses_dp(s):
    """
    DP approach
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    if not s:
        return 0
    
    n = len(s)
    dp = [0] * n  # dp[i] = length of longest valid ending at i
    max_length = 0
    
    for i in range(1, n):
        if s[i] == ')':
            if s[i-1] == '(':
                # Case: ...()
                dp[i] = (dp[i-2] if i >= 2 else 0) + 2
            
            elif i - dp[i-1] > 0 and s[i - dp[i-1] - 1] == '(':
                # Case: ...))
                dp[i] = dp[i-1] + 2 + (dp[i - dp[i-1] - 2] if i - dp[i-1] >= 2 else 0)
            
            max_length = max(max_length, dp[i])
    
    return max_length


# Test cases
print(longest_valid_parentheses_dp("(()"))      # 2
print(longest_valid_parentheses_dp(")()())"))   # 4
```

---

## 6. Remove Invalid Parentheses

### Problem
Remove minimum number of invalid parentheses to make string valid. Return all possible results.

### Solution: BFS

```python
def remove_invalid_parentheses(s):
    """
    LeetCode #301: Remove Invalid Parentheses
    
    Time Complexity: O(2^n)
    Space Complexity: O(n)
    """
    def is_valid(s):
        """Check if string has valid parentheses"""
        count = 0
        for char in s:
            if char == '(':
                count += 1
            elif char == ')':
                count -= 1
                if count < 0:
                    return False
        return count == 0
    
    if not s:
        return [""]
    
    # BFS to find all valid strings with minimum removals
    visited = {s}
    queue = [s]
    result = []
    found = False
    
    while queue and not found:
        current = queue.pop(0)
        
        if is_valid(current):
            result.append(current)
            found = True
        
        if found:
            continue
        
        # Try removing each character
        for i in range(len(current)):
            if current[i] not in '()':
                continue
            
            next_str = current[:i] + current[i+1:]
            
            if next_str not in visited:
                visited.add(next_str)
                queue.append(next_str)
    
    return result if result else [""]


# Test cases
print(remove_invalid_parentheses("()())()"))    # ["(())()", "()()()"]
print(remove_invalid_parentheses("(a)())()"))   # ["(a())()", "(a)()()"]
print(remove_invalid_parentheses(")("))         # [""]
```

---

## 7. Generate Parentheses

### Problem
Generate all combinations of well-formed parentheses given `n` pairs.

### Solution: Backtracking

```python
def generate_parentheses(n):
    """
    LeetCode #22: Generate Parentheses
    
    Time Complexity: O(4^n / sqrt(n)) - Catalan number
    Space Complexity: O(n)
    """
    result = []
    
    def backtrack(current, open_count, close_count):
        """
        current: current string being built
        open_count: number of '(' used
        close_count: number of ')' used
        """
        # Base case: used all parentheses
        if len(current) == 2 * n:
            result.append(current)
            return
        
        # Add '(' if we can
        if open_count < n:
            backtrack(current + '(', open_count + 1, close_count)
        
        # Add ')' if valid
        if close_count < open_count:
            backtrack(current + ')', open_count, close_count + 1)
    
    backtrack("", 0, 0)
    return result


# Test cases
print(generate_parentheses(1))  # ["()"]
print(generate_parentheses(2))  # ["(())", "()()"]
print(generate_parentheses(3))  # ["((()))", "(()())", "(())()", "()(())", "()()()"]
```

### Visualization for n=3:

```
                    ""
                   /
                  (
                /   \
              ((     ()
             /  \    / \
           (((  (() ()(  (()
           |    |    |    |
         ((()) (()) ()() (())
          |    |    |    |
        ((()))((()))()()((()))
                   
Result: ["((()))", "(()())", "(())()", "()(())", "()()()"]
```

---

## 8. Minimum Remove to Make Valid Parentheses

### Problem
Remove minimum number of parentheses to make string valid. Return any valid string.

### Solution

```python
def min_remove_to_make_valid(s):
    """
    LeetCode #1249: Minimum Remove to Make Valid Parentheses
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    # First pass: mark invalid ')'
    stack = []
    to_remove = set()
    
    for i, char in enumerate(s):
        if char == '(':
            stack.append(i)
        elif char == ')':
            if stack:
                stack.pop()
            else:
                to_remove.add(i)  # Invalid ')'
    
    # Second: mark unmatched '('
    to_remove = to_remove.union(set(stack))
    
    # Build result
    result = []
    for i, char in enumerate(s):
        if i not in to_remove:
            result.append(char)
    
    return ''.join(result)


# Test cases
print(min_remove_to_make_valid("lee(t(c)o)de)"))   # "lee(t(c)o)de"
print(min_remove_to_make_valid("a)b(c)d"))         # "ab(c)d"
print(min_remove_to_make_valid("))(("))            # ""
print(min_remove_to_make_valid("(a(b(c)d)"))       # "a(b(c)d)"
```

---

## Summary: Key Patterns

| Problem Type | Approach | Complexity |
|-------------|----------|------------|
| Valid check | Stack matching | O(n) time, O(n) space |
| Min additions | Two counters | O(n) time, O(1) space |
| With wildcards | Range tracking | O(n) time, O(1) space |
| Score calculation | Stack with values | O(n) time, O(n) space |
| Longest valid | Stack/DP | O(n) time, O(n) space |
| Remove invalid | BFS | O(2^n) time |
| Generate all | Backtracking | O(4^n/√n) time |

---

## Practice Problems

1. **LeetCode #20** - Valid Parentheses ⭐
2. **LeetCode #22** - Generate Parentheses ⭐⭐
3. **LeetCode #32** - Longest Valid Parentheses ⭐⭐⭐
4. **LeetCode #301** - Remove Invalid Parentheses ⭐⭐⭐
5. **LeetCode #678** - Valid Parenthesis String ⭐⭐
6. **LeetCode #856** - Score of Parentheses ⭐⭐
7. **LeetCode #921** - Minimum Add to Make Valid ⭐⭐
8. **LeetCode #1249** - Minimum Remove to Make Valid ⭐⭐

---

**Next:** Continue to [06-Monotonic-Stack.md](06-Monotonic-Stack.md) for advanced stack patterns!
