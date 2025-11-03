# Module 6: Testing and Verification

## 🎯 Module Overview

**Testing isn't just finding bugs—it's building confidence in your solution.**

This module teaches you how to design comprehensive test cases that verify your solution works correctly.

**Time Required:** 30-60 minutes  
**Practice Problems:** 10

---

## 📖 Why Testing Matters

### The Testing Reality:

```
Untested Code:
Write solution → Submit → Failed 5/100 test cases → Debug → Repeat
    ↓             ↓           ↓                        ↓        ↓
  15min         1min       "Partial credit"         30min   Frustration

Tested Code:
Write solution → Test thoroughly → Submit → All test cases pass!
    ↓               ↓                ↓            ↓
  15min          10min            1min        Success!
```

**Benefits:**
- ✅ Catch bugs before submission
- ✅ Build confidence in solution
- ✅ Understand edge cases better
- ✅ Better interview performance
- ✅ Professional development practice

---

## 🎯 Types of Test Cases

### 1. Normal Cases (Happy Path)

**What:** Expected, typical inputs

**Example Problem:** Find sum of array
```python
def sum_array(arr):
    return sum(arr)

# Normal test cases
test([1, 2, 3])        # Expected: 6
test([10, 20, 30])     # Expected: 60
test([5, 5, 5, 5])     # Expected: 20
```

---

### 2. Edge Cases

**What:** Boundary conditions, extreme values

**Categories:**

#### a) Empty Input
```python
test([])               # Expected: 0
test("")               # Expected: 0 or error
test(None)             # Expected: None or error
```

#### b) Single Element
```python
test([5])              # Expected: 5
test("a")              # Expected: depends on problem
```

#### c) Minimum/Maximum Values
```python
test([0])              # Minimum positive
test([-1])             # Negative
test([float('inf')])   # Maximum
test([10**9])          # Large value
```

#### d) All Same Elements
```python
test([5, 5, 5, 5])     # All identical
test("aaaa")           # All same chars
```

#### e) Duplicates
```python
test([1, 2, 2, 3])     # Has duplicates
test([1, 1, 1])        # All duplicates
```

---

### 3. Corner Cases

**What:** Unusual combinations of conditions

**Examples:**

#### Problem: Two Sum
```python
# Corner cases:
test([0, 0], target=0)      # Two zeros
test([-1, -1], target=-2)   # Negative numbers
test([3, 3], target=6)      # Same value used twice
test([1, 2], target=5)      # No solution (if allowed)
```

#### Problem: Valid Palindrome
```python
# Corner cases:
test("")                    # Empty string
test(" ")                   # Only spaces
test(".,!?")                # Only punctuation
test("A")                   # Single character
test("Aa")                  # Mixed case
test("A man a plan")        # Multiple words
```

---

### 4. Stress Tests

**What:** Large inputs to test performance

```python
# Stress test cases
test([i for i in range(10**5)])        # Large array
test("a" * 10**6)                       # Long string
test([[1] * 1000 for _ in range(1000)]) # Large 2D array
```

---

### 5. Negative Tests

**What:** Invalid inputs (if applicable)

```python
# Negative tests
test(None)              # None input
test([])                # Empty when not allowed
test([-5])              # Negative when not allowed
test("invalid")         # Wrong type
```

---

## 🧪 Test Case Design Process

### Step 1: Analyze Requirements

**Example Problem:** Binary Search

```
Requirements:
- Input: Sorted array + target value
- Output: Index of target, or -1 if not found
- Constraints: Array is sorted
```

### Step 2: Identify Test Categories

```
Normal Cases:
✓ Target in middle
✓ Target at start
✓ Target at end

Edge Cases:
✓ Empty array
✓ Single element (found)
✓ Single element (not found)
✓ Two elements
✓ Target not in array

Corner Cases:
✓ Duplicates in array
✓ All same values
✓ Target smaller than all
✓ Target larger than all
```

### Step 3: Write Test Cases

```python
def test_binary_search():
    # Normal cases
    assert binary_search([1,2,3,4,5], 3) == 2
    assert binary_search([1,2,3,4,5], 1) == 0
    assert binary_search([1,2,3,4,5], 5) == 4
    
    # Edge cases
    assert binary_search([], 1) == -1
    assert binary_search([1], 1) == 0
    assert binary_search([1], 2) == -1
    assert binary_search([1,2], 2) == 1
    
    # Corner cases
    assert binary_search([1,2,2,2,3], 2) == 2  # or any valid index
    assert binary_search([5,5,5,5], 5) == 2    # middle
    assert binary_search([1,2,3], 0) == -1     # smaller
    assert binary_search([1,2,3], 10) == -1    # larger
    
    print("All tests passed!")
```

---

## 📋 Test Case Templates by Problem Type

### Template 1: Array Problems

```python
def test_array_function(func):
    # Empty
    test(func([]))
    
    # Single element
    test(func([1]))
    
    # Two elements
    test(func([1, 2]))
    
    # All same
    test(func([5, 5, 5]))
    
    # All different
    test(func([1, 2, 3, 4]))
    
    # With duplicates
    test(func([1, 2, 2, 3]))
    
    # Negative numbers
    test(func([-3, -1, -2]))
    
    # Mixed positive/negative
    test(func([-1, 0, 1]))
    
    # Large values
    test(func([10**9, 10**9 + 1]))
    
    # Large array
    test(func(list(range(10**5))))
```

---

### Template 2: String Problems

```python
def test_string_function(func):
    # Empty
    test(func(""))
    
    # Single char
    test(func("a"))
    
    # Two chars (same)
    test(func("aa"))
    
    # Two chars (different)
    test(func("ab"))
    
    # All same
    test(func("aaaa"))
    
    # Palindrome
    test(func("racecar"))
    
    # Mixed case
    test(func("AaBbCc"))
    
    # With spaces
    test(func("hello world"))
    
    # With punctuation
    test(func("Hello, World!"))
    
    # Long string
    test(func("a" * 10**6))
```

---

### Template 3: Tree Problems

```python
def test_tree_function(func):
    # Empty tree
    test(func(None))
    
    # Single node
    test(func(TreeNode(1)))
    
    # Two nodes (left child)
    root = TreeNode(1, TreeNode(2), None)
    test(func(root))
    
    # Two nodes (right child)
    root = TreeNode(1, None, TreeNode(2))
    test(func(root))
    
    # Balanced tree
    #       1
    #      / \
    #     2   3
    root = TreeNode(1, TreeNode(2), TreeNode(3))
    test(func(root))
    
    # Left-skewed
    #   1
    #  /
    # 2
    # /
    #3
    root = TreeNode(1, TreeNode(2, TreeNode(3)))
    test(func(root))
    
    # Right-skewed
    # 1
    #  \
    #   2
    #    \
    #     3
    root = TreeNode(1, None, TreeNode(2, None, TreeNode(3)))
    test(func(root))
```

---

### Template 4: Linked List Problems

```python
def test_linkedlist_function(func):
    # Empty list
    test(func(None))
    
    # Single node
    test(func(ListNode(1)))
    
    # Two nodes
    test(func(ListNode(1, ListNode(2))))
    
    # Odd length
    test(func(ListNode(1, ListNode(2, ListNode(3)))))
    
    # Even length
    test(func(ListNode(1, ListNode(2, ListNode(3, ListNode(4))))))
    
    # With duplicates
    test(func(ListNode(1, ListNode(1, ListNode(2)))))
    
    # All same values
    test(func(ListNode(5, ListNode(5, ListNode(5)))))
    
    # Large list
    head = ListNode(0)
    current = head
    for i in range(1, 10**4):
        current.next = ListNode(i)
        current = current.next
    test(func(head))
```

---

## 🎯 Testing Strategies

### Strategy 1: Test-Driven Development (TDD)

**Process:**
1. Write tests first
2. Run tests (they fail)
3. Write minimal code to pass
4. Refactor
5. Repeat

**Example:**
```python
# Step 1: Write test first
def test_is_palindrome():
    assert is_palindrome("racecar") == True
    assert is_palindrome("hello") == False
    assert is_palindrome("") == True

# Step 2: Run test (fails - function doesn't exist)

# Step 3: Write function
def is_palindrome(s):
    return s == s[::-1]

# Step 4: Run test (passes!)
```

---

### Strategy 2: Boundary Value Analysis

**Test at boundaries:**

```python
# Problem: Check if age is valid (0-120)

# Boundary tests:
test(-1)   # Just below minimum (invalid)
test(0)    # Minimum (valid)
test(1)    # Just above minimum (valid)
test(119)  # Just below maximum (valid)
test(120)  # Maximum (valid)
test(121)  # Just above maximum (invalid)
```

---

### Strategy 3: Equivalence Partitioning

**Divide inputs into groups that should behave similarly:**

```python
# Problem: Grade calculator
# A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: 0-59

# Pick one from each partition:
test(95)   # A range
test(85)   # B range
test(75)   # C range
test(65)   # D range
test(55)   # F range

# Plus boundaries:
test(90)   # A boundary
test(89)   # B boundary
test(80)   # B boundary
```

---

### Strategy 4: State-Based Testing

**For stateful problems:**

```python
# Problem: Stack implementation

def test_stack():
    stack = Stack()
    
    # State 1: Empty
    assert stack.is_empty() == True
    assert stack.size() == 0
    
    # State 2: One element
    stack.push(1)
    assert stack.is_empty() == False
    assert stack.size() == 1
    assert stack.peek() == 1
    
    # State 3: Multiple elements
    stack.push(2)
    stack.push(3)
    assert stack.size() == 3
    assert stack.peek() == 3
    
    # State 4: After pop
    assert stack.pop() == 3
    assert stack.size() == 2
    assert stack.peek() == 2
    
    # State 5: Back to empty
    stack.pop()
    stack.pop()
    assert stack.is_empty() == True
```

---

## 🔍 Verification Techniques

### Technique 1: Manual Verification

**Work through example by hand:**

```
Problem: Reverse array [1,2,3,4,5]

Step-by-step:
Initial:  [1,2,3,4,5]
Swap 0,4: [5,2,3,4,1]
Swap 1,3: [5,4,3,2,1]
Done!

Expected: [5,4,3,2,1]
```

---

### Technique 2: Automated Testing

```python
import unittest

class TestSolution(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()
    
    def test_normal_case(self):
        result = self.solution.func([1,2,3])
        self.assertEqual(result, 6)
    
    def test_empty(self):
        result = self.solution.func([])
        self.assertIsNone(result)
    
    def test_negative(self):
        result = self.solution.func([-1,-2,-3])
        self.assertEqual(result, -6)

if __name__ == '__main__':
    unittest.main()
```

---

### Technique 3: Property-Based Testing

**Test properties that should always hold:**

```python
# Property: Reversing twice gives original
def test_reverse_property():
    arr = [1,2,3,4,5]
    assert reverse(reverse(arr)) == arr

# Property: Sum doesn't change after sorting
def test_sort_property():
    arr = [5,2,8,1,9]
    original_sum = sum(arr)
    sorted_arr = my_sort(arr)
    assert sum(sorted_arr) == original_sum

# Property: Length preserved
def test_length_property():
    arr = [1,2,3,4,5]
    result = process(arr)
    assert len(result) == len(arr)
```

---

## ✅ Testing Checklist

Before submitting, verify:

### Coverage:
- [ ] Normal cases tested
- [ ] Edge cases tested
- [ ] Corner cases considered
- [ ] Stress tests (if performance matters)

### Edge Cases:
- [ ] Empty input
- [ ] Single element
- [ ] Two elements
- [ ] All same elements
- [ ] Duplicates
- [ ] Negative values
- [ ] Zero
- [ ] Very large values

### Correctness:
- [ ] Output format correct
- [ ] Return type correct
- [ ] Edge cases return expected values
- [ ] No crashes or errors

### Performance:
- [ ] Passes with maximum input size
- [ ] Doesn't timeout
- [ ] Memory usage acceptable

---

## 🎯 Practice: Design Test Cases

### Exercise: Valid Parentheses

**Problem:** Check if string has valid parentheses pairing.

**Your turn:** List 10+ test cases.

<details>
<summary>Sample Test Cases</summary>

```python
# Normal cases
test("()")         # Simple pair → True
test("()[]{}")     # Multiple types → True
test("([])")       # Nested → True
test("({[]})")     # Complex nested → True

# Edge cases
test("")           # Empty → True
test("(")          # Single opening → False
test(")")          # Single closing → False

# Corner cases
test("((")         # Only openings → False
test("))")         # Only closings → False
test("([)]")       # Interleaved → False
test("(((((")      # Many openings → False
test(")))))")      # Many closings → False

# Stress test
test("(" * 10000 + ")" * 10000)  # Large input → True
```

</details>

---

## 💡 Testing Pro Tips

### 1. Test Early and Often
Don't wait until the end—test as you build

### 2. Start Simple
Test basic cases first, then add complexity

### 3. Test One Thing at a Time
Isolate what you're testing

### 4. Use Descriptive Names
```python
# ❌ Bad
def test1():
    ...

# ✅ Good
def test_empty_array_returns_none():
    ...
```

### 5. Document Expected Behavior
```python
# Should return None for empty array
assert func([]) == None
```

### 6. Keep Tests Fast
Slow tests discourage frequent testing

### 7. Make Tests Independent
Tests shouldn't depend on each other's state

---

## 🎓 Key Takeaways

1. **Test Thoroughly** - Don't just test happy path
2. **Think Edge Cases** - They catch most bugs
3. **Test Before Submitting** - Saves time and frustration
4. **Automate When Possible** - Rerun tests easily
5. **Learn from Failures** - Failed tests reveal understanding gaps
6. **Build Test Habits** - Make testing automatic

---

**Remember:** Good tests are as valuable as good code! 🧪✅

---

[← Previous: Debugging Strategies](./05-Debugging-Strategies.md) | [Next: Practice Problems →](./07-Practice-Problems.md)
