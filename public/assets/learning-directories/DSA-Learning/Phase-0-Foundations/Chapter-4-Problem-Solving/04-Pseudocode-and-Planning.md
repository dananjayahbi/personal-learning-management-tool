# Module 4: Pseudocode and Planning

## 🎯 Module Overview

**Plan Before You Code:** Writing pseudocode prevents hours of debugging and refactoring.

This module teaches you how to plan your solutions using pseudocode—a bridge between human thinking and executable code.

**Time Required:** 1-2 hours  
**Practice Problems:** 10

---

## 📖 What is Pseudocode?

**Pseudocode** is a plain-language description of code logic without syntax constraints.

### Why Pseudocode Matters:

```
Without Pseudocode:                With Pseudocode:
Think → Code → Debug → Refactor    Think → Plan → Code → Done
  ↓       ↓       ↓       ↓            ↓       ↓       ↓      ↓
5min    30min   60min   30min       5min    10min   15min  0min
Total: 2+ hours                     Total: 30 minutes
```

**Benefits:**
- ✅ Clarifies logic before coding
- ✅ Easier to spot errors early
- ✅ Better communication in interviews
- ✅ Language-agnostic planning
- ✅ Reduces debugging time

---

## 📋 Pseudocode vs. Code

### Example Problem: Find maximum in array

**❌ Bad: Jump straight to code**
```python
def find_max(arr):
    max = arr[0]  # Wait, what if array is empty?
    for i in arr:  # Should I start from 0 or 1?
        if i > max:  # Am I tracking index or value?
            max = i
    return max
```

**✅ Good: Write pseudocode first**
```
PSEUDOCODE:
1. Handle edge case: if array is empty, return None
2. Initialize max to first element
3. For each element in array (starting from second):
   - If element > max:
     - Update max
4. Return max
```

**Then implement:**
```python
def find_max(arr):
    # Step 1: Edge case
    if not arr:
        return None
    
    # Step 2: Initialize
    max_val = arr[0]
    
    # Step 3: Iterate
    for num in arr[1:]:
        if num > max_val:
            max_val = num
    
    # Step 4: Return
    return max_val
```

---

## 🎨 Pseudocode Conventions

### Basic Keywords:

| Operation | Pseudocode |
|-----------|-----------|
| **Variables** | `SET variable TO value` |
| **Input** | `GET input FROM user` |
| **Output** | `PRINT result` or `RETURN value` |
| **If** | `IF condition THEN ... END IF` |
| **If-Else** | `IF condition THEN ... ELSE ... END IF` |
| **Loop (for)** | `FOR each item IN collection ... END FOR` |
| **Loop (while)** | `WHILE condition DO ... END WHILE` |
| **Function** | `FUNCTION name(parameters) ... END FUNCTION` |

### Example:

```
FUNCTION find_pair_sum(array, target)
    SET seen TO empty hash map
    
    FOR each number IN array
        SET complement TO target - number
        
        IF complement IN seen THEN
            RETURN [seen[complement], current_index]
        END IF
        
        SET seen[number] TO current_index
    END FOR
    
    RETURN null
END FUNCTION
```

---

## ✍️ How to Write Effective Pseudocode

### Rule 1: Be Clear, Not Formal

**❌ Too vague:**
```
Do something with array
Return answer
```

**❌ Too formal (just code):**
```python
for i in range(len(arr)):
    if arr[i] == target:
        return i
```

**✅ Just right:**
```
FOR each index from 0 to length of array:
    IF array[index] equals target:
        RETURN index
RETURN -1 (not found)
```

---

### Rule 2: Focus on Logic, Not Syntax

**❌ Syntax-heavy:**
```
int left = 0;
int right = arr.length - 1;
while(left <= right) {
    ...
}
```

**✅ Logic-focused:**
```
SET left pointer to start
SET right pointer to end

WHILE left <= right:
    Calculate middle
    IF middle element is target:
        RETURN middle index
    ELSE IF middle element < target:
        MOVE left pointer to middle + 1
    ELSE:
        MOVE right pointer to middle - 1

RETURN -1 (not found)
```

---

### Rule 3: Include Important Details

**Details to include:**
- Edge cases
- Important variable names
- Key conditions
- Return values

**Details to skip:**
- Exact syntax
- Import statements
- Type declarations
- Minor optimizations

---

### Rule 4: Use Indentation

Good indentation shows structure:

```
FUNCTION merge_sort(array)
    IF array length <= 1:
        RETURN array
    
    SET mid TO length / 2
    SET left TO merge_sort(array[0:mid])
    SET right TO merge_sort(array[mid:end])
    
    RETURN merge(left, right)
END FUNCTION

FUNCTION merge(left, right)
    SET result TO empty array
    SET i, j TO 0
    
    WHILE i < left length AND j < right length:
        IF left[i] <= right[j]:
            APPEND left[i] to result
            INCREMENT i
        ELSE:
            APPEND right[j] to result
            INCREMENT j
    
    APPEND remaining elements from left
    APPEND remaining elements from right
    
    RETURN result
END FUNCTION
```

---

## 🎯 Pseudocode Templates by Pattern

### Template 1: Two Pointers

```
FUNCTION two_pointers(array, target)
    SET left TO 0
    SET right TO array length - 1
    
    WHILE left < right:
        SET sum TO array[left] + array[right]
        
        IF sum equals target:
            RETURN [left, right]
        ELSE IF sum < target:
            INCREMENT left
        ELSE:
            DECREMENT right
    
    RETURN not found
END FUNCTION
```

---

### Template 2: Binary Search

```
FUNCTION binary_search(sorted_array, target)
    SET left TO 0
    SET right TO array length - 1
    
    WHILE left <= right:
        SET mid TO (left + right) / 2
        
        IF array[mid] equals target:
            RETURN mid
        ELSE IF array[mid] < target:
            SET left TO mid + 1
        ELSE:
            SET right TO mid - 1
    
    RETURN -1
END FUNCTION
```

---

### Template 3: Sliding Window

```
FUNCTION sliding_window(array, k)
    SET window_sum TO sum of first k elements
    SET max_sum TO window_sum
    
    FOR i FROM k TO array length:
        UPDATE window_sum:
            SUBTRACT array[i - k]
            ADD array[i]
        
        UPDATE max_sum IF window_sum is greater
    
    RETURN max_sum
END FUNCTION
```

---

### Template 4: BFS

```
FUNCTION bfs(root)
    IF root is null:
        RETURN empty
    
    CREATE queue
    ADD root to queue
    CREATE result list
    
    WHILE queue is not empty:
        SET level_size TO queue size
        CREATE level list
        
        FOR count FROM 1 TO level_size:
            REMOVE node from queue
            ADD node value to level
            
            IF node has left child:
                ADD left to queue
            IF node has right child:
                ADD right to queue
        
        ADD level to result
    
    RETURN result
END FUNCTION
```

---

### Template 5: DFS (Recursive)

```
FUNCTION dfs(node, visited)
    IF node is null OR node in visited:
        RETURN
    
    ADD node to visited
    PROCESS node
    
    FOR each neighbor of node:
        CALL dfs(neighbor, visited)
END FUNCTION
```

---

### Template 6: Dynamic Programming

```
FUNCTION dp_solution(n)
    CREATE dp array of size n+1
    
    SET base cases (dp[0], dp[1], etc.)
    
    FOR i FROM 2 TO n:
        COMPUTE dp[i] from previous values
        (e.g., dp[i] = dp[i-1] + dp[i-2])
    
    RETURN dp[n]
END FUNCTION
```

---

## 🎓 Complete Example: Longest Palindromic Substring

### Problem:
Find the longest palindromic substring in a given string.

### Step 1: Understand
```
Input: string s
Output: longest palindrome substring
Example: "babad" → "bab" or "aba"
```

### Step 2: Plan Approach
```
Approach: Expand around center
- Every palindrome has a center
- Center can be a character (odd length) or between characters (even)
- For each possible center, expand while characters match
```

### Step 3: Write Pseudocode

```
FUNCTION longest_palindrome(s)
    IF s is empty:
        RETURN empty string
    
    SET start TO 0
    SET end TO 0
    
    FOR i FROM 0 TO length of s:
        // Check odd-length palindromes (center is single char)
        SET len1 TO expand_around_center(s, i, i)
        
        // Check even-length palindromes (center is between chars)
        SET len2 TO expand_around_center(s, i, i+1)
        
        SET max_len TO maximum of len1 and len2
        
        IF max_len > (end - start):
            SET start TO i - (max_len - 1) / 2
            SET end TO i + max_len / 2
    
    RETURN substring from start to end
END FUNCTION

FUNCTION expand_around_center(s, left, right)
    WHILE left >= 0 AND right < length AND s[left] == s[right]:
        DECREMENT left
        INCREMENT right
    
    RETURN right - left - 1
END FUNCTION
```

### Step 4: Implement (Python)

```python
def longest_palindrome(s):
    if not s:
        return ""
    
    start = end = 0
    
    for i in range(len(s)):
        # Odd length
        len1 = expand_around_center(s, i, i)
        # Even length
        len2 = expand_around_center(s, i, i + 1)
        
        max_len = max(len1, len2)
        
        if max_len > end - start:
            start = i - (max_len - 1) // 2
            end = i + max_len // 2
    
    return s[start:end + 1]

def expand_around_center(s, left, right):
    while left >= 0 and right < len(s) and s[left] == s[right]:
        left -= 1
        right += 1
    
    return right - left - 1
```

---

## 🎯 Pseudocode Practice

### Exercise 1: Group Anagrams

**Problem:** Group strings that are anagrams of each other.

**Input:** `["eat", "tea", "tan", "ate", "nat", "bat"]`  
**Output:** `[["eat","tea","ate"], ["tan","nat"], ["bat"]]`

**Write pseudocode before looking at the solution!**

<details>
<summary>Sample Pseudocode</summary>

```
FUNCTION group_anagrams(strings)
    CREATE hash map for grouping
    
    FOR each string IN strings:
        SORT characters in string (key)
        
        IF key not in hash map:
            CREATE empty list for key
        
        ADD string to hash map[key]
    
    RETURN all values from hash map
END FUNCTION
```

**Implementation:**
```python
def group_anagrams(strs):
    anagram_map = {}
    
    for s in strs:
        key = ''.join(sorted(s))
        
        if key not in anagram_map:
            anagram_map[key] = []
        
        anagram_map[key].append(s)
    
    return list(anagram_map.values())
```

</details>

---

### Exercise 2: Valid Sudoku

**Problem:** Validate a 9x9 Sudoku board.

**Rules:**
- Each row must contain digits 1-9 without repetition
- Each column must contain digits 1-9 without repetition
- Each 3×3 sub-box must contain digits 1-9 without repetition

**Write pseudocode!**

<details>
<summary>Sample Pseudocode</summary>

```
FUNCTION is_valid_sudoku(board)
    CREATE sets for rows (9 sets)
    CREATE sets for columns (9 sets)
    CREATE sets for boxes (9 sets)
    
    FOR i FROM 0 TO 8:
        FOR j FROM 0 TO 8:
            SET cell TO board[i][j]
            
            IF cell is '.':
                CONTINUE to next cell
            
            SET box_index TO (i / 3) * 3 + (j / 3)
            
            IF cell IN rows[i] OR 
               cell IN cols[j] OR 
               cell IN boxes[box_index]:
                RETURN False
            
            ADD cell TO rows[i]
            ADD cell TO cols[j]
            ADD cell TO boxes[box_index]
    
    RETURN True
END FUNCTION
```

</details>

---

## 💡 Pro Tips for Pseudocode

### 1. Start High-Level, Then Detail
```
Level 1: Sort array, then find pairs
Level 2: 
    - Sort array using quicksort
    - Use two pointers to find pairs
Level 3:
    - Sort: [detailed sorting steps]
    - Two pointers: [detailed pointer logic]
```

### 2. Use Comments for Clarification
```
SET left TO 0  // Start of array
SET right TO length - 1  // End of array

WHILE left < right:  // Haven't crossed
    ...
```

### 3. Name Variables Meaningfully
```
❌ SET x TO 0
✅ SET left_pointer TO 0

❌ SET arr TO []
✅ SET result_array TO []
```

### 4. Pseudocode in Interviews
- Write pseudocode on whiteboard first
- Explain your logic
- Get feedback before coding
- Easier to modify than code

### 5. Keep It Simple
- Don't worry about perfect syntax
- Focus on logic flow
- Make it readable

---

## ✅ Pseudocode Checklist

Before converting to code, verify your pseudocode:

- [ ] Covers all edge cases
- [ ] Has clear variable names
- [ ] Shows logical flow with indentation
- [ ] Includes all major steps
- [ ] Easy to understand by others
- [ ] Maps clearly to actual code
- [ ] Handles error cases

---

## 🎓 Key Takeaways

1. **Plan before coding** - Pseudocode saves time
2. **Focus on logic** - Not syntax
3. **Be clear** - Anyone should understand it
4. **Use indentation** - Shows structure
5. **Include edge cases** - Think of all scenarios
6. **Practice regularly** - Make it a habit

---

**Remember:** 10 minutes of pseudocode saves hours of debugging! 📝

---

[← Previous: Breaking Down Problems](./03-Breaking-Down-Problems.md) | [Next: Debugging Strategies →](./05-Debugging-Strategies.md)
