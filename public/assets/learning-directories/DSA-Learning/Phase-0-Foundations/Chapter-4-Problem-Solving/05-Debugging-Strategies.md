# Module 5: Debugging Strategies

## 🎯 Module Overview

**Everyone writes bugs. Great programmers fix them quickly.**

This module teaches you systematic debugging techniques to find and fix errors efficiently.

**Time Required:** 30-60 minutes  
**Practice Problems:** 10 buggy code samples

---

## 🐛 Why Debugging Matters

### The Reality:

```
Programming Time Breakdown:
├─ 20% Writing new code
├─ 30% Reading/understanding code
└─ 50% Debugging and fixing issues  ← You'll spend MOST time here!
```

**Without systematic debugging:**
- 😫 Random changes hoping something works
- 🔄 Same bug appears repeatedly
- ⏰ Hours wasted on simple issues
- 🤯 Frustration and burnout

**With systematic debugging:**
- 🎯 Targeted investigation
- ⚡ Quick issue resolution
- 🧠 Learn from every bug
- 😊 Less stress, more progress

---

## 🔍 The Debugging Mindset

### Core Principles:

1. **Stay Calm** - Panic leads to random changes
2. **Be Systematic** - Follow a process
3. **Understand, Don't Guess** - Know WHY it works
4. **Document** - Keep track of what you try
5. **Learn** - Every bug teaches something

### The Debugging Process:

```
┌────────────────────────────────────────┐
│ 1. REPRODUCE                           │
│    Can you make it happen consistently?│
├────────────────────────────────────────┤
│ 2. ISOLATE                             │
│    Where exactly is the problem?       │
├────────────────────────────────────────┤
│ 3. UNDERSTAND                          │
│    Why is this happening?              │
├────────────────────────────────────────┤
│ 4. FIX                                 │
│    Make the targeted change            │
├────────────────────────────────────────┤
│ 5. VERIFY                              │
│    Test thoroughly                     │
├────────────────────────────────────────┤
│ 6. PREVENT                             │
│    How to avoid this in future?        │
└────────────────────────────────────────┘
```

---

## 🎯 Step 1: Reproduce the Bug

### Why It Matters:
If you can't reproduce it reliably, you can't verify the fix.

### How to Reproduce:

**Document everything:**
```
Bug Report Template:
- What were you trying to do?
- What did you expect to happen?
- What actually happened?
- What input caused it?
- What's the exact error message?
- Does it happen every time?
```

**Example:**
```
✅ Good Bug Report:
- Function: find_max([])
- Expected: Return None
- Actual: IndexError: list index out of range
- Input: Empty array []
- Happens: Every time with empty array

❌ Bad Bug Report:
- It doesn't work sometimes
- The function breaks
- I get an error
```

### Create Minimal Test Case:

```python
# ❌ Too complex
def test_broken():
    data = load_from_database()
    processed = complex_pipeline(data)
    result = my_function(processed)
    assert result == expected

# ✅ Minimal
def test_broken():
    result = my_function([])  # Fails on empty array
    assert result == None
```

---

## 🔬 Step 2: Isolate the Problem

### Binary Search Debugging:

**Divide and conquer approach:**

```
Program flow: A → B → C → D → E → Bug appears

Test at C:
├─ Bug present at C? → Problem in A, B, or C
└─ Bug NOT at C? → Problem in D or E

Continue narrowing down...
```

**Example:**
```python
def process_data(data):
    cleaned = clean_data(data)
    print(f"After clean: {cleaned}")  # ← Checkpoint
    
    filtered = filter_data(cleaned)
    print(f"After filter: {filtered}")  # ← Checkpoint
    
    transformed = transform_data(filtered)
    print(f"After transform: {transformed}")  # ← Checkpoint
    
    return aggregate_data(transformed)
```

### Comment Out Sections:

```python
def buggy_function(arr):
    result = []
    
    # Step 1: Works fine
    for item in arr:
        result.append(item * 2)
    
    # Step 2: Causing issues?
    # result = [x for x in result if x > 10]
    
    # Step 3: Also fine
    return sorted(result)
```

Comment out sections until bug disappears → you found the culprit!

---

## 🔎 Step 3: Understand the Bug

### Use Print Statements (Simple but Effective):

```python
def two_sum(nums, target):
    seen = {}
    print(f"Input: nums={nums}, target={target}")  # ← Debug
    
    for i, num in enumerate(nums):
        complement = target - num
        print(f"i={i}, num={num}, complement={complement}, seen={seen}")  # ← Debug
        
        if complement in seen:
            print(f"Found! Returning [{seen[complement]}, {i}]")  # ← Debug
            return [seen[complement], i]
        
        seen[num] = i
    
    print("Not found, returning None")  # ← Debug
    return None
```

### Use Debugger (More Powerful):

**Debugger Features:**
- Set breakpoints
- Step through code line by line
- Inspect variable values
- Watch expressions
- Call stack navigation

**VSCode Debugger Tips:**
```python
# Set breakpoint by clicking left of line number

def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2  # ← Breakpoint here
        
        # In debugger:
        # - Check left, right, mid values
        # - Watch arr[mid]
        # - Verify logic
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
```

### Rubber Duck Debugging:

**Explain your code to a rubber duck (or friend):**

```
"So here, I'm iterating through the array...
 Wait, I'm using 'i' as both index and value!
 That's the bug!"
```

Often, explaining reveals the issue.

---

## 🛠️ Common Bug Types & How to Fix

### Bug Type 1: Off-By-One Errors

**Symptoms:** Array index errors, infinite loops, missing last element

```python
# ❌ Bug: Misses last element
for i in range(len(arr) - 1):  # Should be len(arr)
    print(arr[i])

# ✅ Fix
for i in range(len(arr)):
    print(arr[i])

# ❌ Bug: Index out of range
while left < right:  # Should be <=
    mid = (left + right) // 2
    ...

# ✅ Fix
while left <= right:
    mid = (left + right) // 2
    ...
```

**How to Debug:**
- Print loop variables
- Check boundary conditions
- Test with small inputs

---

### Bug Type 2: Null/None Reference

**Symptoms:** NoneType has no attribute, null pointer

```python
# ❌ Bug: Doesn't handle None
def get_length(node):
    return node.length  # Crashes if node is None

# ✅ Fix: Check for None
def get_length(node):
    if node is None:
        return 0
    return node.length

# ❌ Bug: Forgets to check
result = find_item(array, target)
print(result.value)  # Crashes if not found

# ✅ Fix: Always check
result = find_item(array, target)
if result:
    print(result.value)
else:
    print("Not found")
```

**How to Debug:**
- Check for None before using
- Add assertions
- Use type hints

---

### Bug Type 3: Logic Errors

**Symptoms:** Wrong output, fails test cases

```python
# ❌ Bug: Wrong logic
def is_even(n):
    return n % 2 == 1  # Should be == 0

# ✅ Fix
def is_even(n):
    return n % 2 == 0

# ❌ Bug: Wrong operator
if score > 90 and score < 100:  # Fails for 90
    grade = 'A'

# ✅ Fix
if score >= 90 and score <= 100:  # Or: 90 <= score <= 100
    grade = 'A'
```

**How to Debug:**
- Test edge cases
- Work through manually
- Check operators carefully

---

### Bug Type 4: Infinite Loops

**Symptoms:** Program hangs, never finishes

```python
# ❌ Bug: Infinite loop
i = 0
while i < 10:
    print(i)
    # Forgot to increment i!

# ✅ Fix
i = 0
while i < 10:
    print(i)
    i += 1  # Don't forget!

# ❌ Bug: Condition never false
while left < right:
    # Neither left nor right changes
    if arr[left] == target:
        return left

# ✅ Fix: Ensure progress
while left < right:
    if arr[left] == target:
        return left
    left += 1  # Make progress
```

**How to Debug:**
- Add print inside loop
- Check loop variables
- Set iteration limit while debugging

---

### Bug Type 5: Mutable Default Arguments

**Symptoms:** Unexpected behavior with default parameters

```python
# ❌ Bug: Mutable default
def add_item(item, list=[]):  # BAD!
    list.append(item)
    return list

print(add_item(1))  # [1]
print(add_item(2))  # [1, 2] ← Unexpected!

# ✅ Fix: Use None
def add_item(item, list=None):
    if list is None:
        list = []
    list.append(item)
    return list

print(add_item(1))  # [1]
print(add_item(2))  # [2] ← Correct!
```

**How to Debug:**
- Avoid mutable defaults
- Use None and create inside
- Understand Python's default behavior

---

### Bug Type 6: Variable Shadowing

**Symptoms:** Variables have unexpected values

```python
# ❌ Bug: Shadowing
def process(data):
    result = []
    
    for item in data:
        result = item * 2  # Overwrites array!
        result.append(result)  # Error!

# ✅ Fix: Different names
def process(data):
    result = []
    
    for item in data:
        doubled = item * 2
        result.append(doubled)
```

**How to Debug:**
- Use descriptive names
- Check variable assignments
- Use linter warnings

---

## 🎯 Debugging Techniques

### Technique 1: Print Debugging

```python
def debug_example(arr, target):
    print(f"=== START: arr={arr}, target={target} ===")
    
    for i, num in enumerate(arr):
        print(f"  Step {i}: num={num}")
        
        if num == target:
            print(f"  ✓ Found at index {i}")
            return i
    
    print("  ✗ Not found")
    return -1
```

**Tips:**
- Use descriptive messages
- Include variable values
- Mark entry/exit points
- Remove after debugging

---

### Technique 2: Assert Statements

```python
def binary_search(arr, target):
    # Preconditions
    assert len(arr) > 0, "Array must not be empty"
    assert arr == sorted(arr), "Array must be sorted"
    
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        # Invariants
        assert 0 <= mid < len(arr), f"Invalid mid: {mid}"
        assert left <= mid <= right, "Pointers out of order"
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
```

**Benefits:**
- Catches assumptions
- Documents expectations
- Fails fast on violation

---

### Technique 3: Logging

```python
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def process_data(data):
    logger.debug(f"Processing {len(data)} items")
    
    result = []
    for i, item in enumerate(data):
        logger.debug(f"Processing item {i}: {item}")
        
        if item < 0:
            logger.warning(f"Negative value at {i}: {item}")
        
        result.append(item * 2)
    
    logger.info(f"Processed {len(result)} items")
    return result
```

**Advantages over print:**
- Levels (DEBUG, INFO, WARNING, ERROR)
- Can disable/enable easily
- Logs to file
- Production-ready

---

### Technique 4: Unit Tests

```python
import unittest

class TestMyFunction(unittest.TestCase):
    def test_empty_array(self):
        result = my_function([])
        self.assertEqual(result, None)
    
    def test_single_element(self):
        result = my_function([5])
        self.assertEqual(result, 5)
    
    def test_multiple_elements(self):
        result = my_function([1, 2, 3])
        self.assertEqual(result, 6)
    
    def test_negative_numbers(self):
        result = my_function([-1, -2, -3])
        self.assertEqual(result, -6)
```

**Benefits:**
- Automated testing
- Regression prevention
- Documents expected behavior
- Quick verification

---

## 🚨 Debugging Antipatterns

### ❌ Antipattern 1: Random Changes

```
"Let me try changing this... nope.
 Let me try changing that... nope.
 Let me try... wait, what did I change?"
```

**✅ Instead:** Understand the issue, make targeted changes

---

### ❌ Antipattern 2: Commenting Out Blindly

```python
# result = process_data(data)
# result = transform_data(data)
result = None  # Just return None for now?
```

**✅ Instead:** Isolate systematically, understand each piece

---

### ❌ Antipattern 3: Ignoring Warnings

```
"It's just a warning, I'll ignore it."
[Later: Mysterious bug appears]
```

**✅ Instead:** Fix warnings immediately, they often reveal issues

---

## 💡 Debugging Checklist

When stuck on a bug:

- [ ] Can I reproduce it consistently?
- [ ] What's the exact error message?
- [ ] What's the minimal input that causes it?
- [ ] Where exactly does it fail? (Use print/debugger)
- [ ] What are the variable values at failure point?
- [ ] What did I expect vs. what actually happened?
- [ ] Have I checked for common bug types?
- [ ] Have I tested edge cases?
- [ ] Did I read the error message carefully?
- [ ] Have I taken a break? (Fresh eyes help!)

---

## 🎓 Practice: Debug These Functions

### Exercise 1:

```python
def find_max(arr):
    max_val = arr[0]
    for i in range(len(arr)):
        if arr[i] > max_val:
            max_val = arr[i]
    return max_val

# Test: find_max([]) → Should return None but crashes
```

<details>
<summary>Bug & Fix</summary>

**Bug:** Doesn't handle empty array

**Fix:**
```python
def find_max(arr):
    if not arr:  # Check for empty
        return None
    
    max_val = arr[0]
    for i in range(1, len(arr)):  # Start from 1
        if arr[i] > max_val:
            max_val = arr[i]
    return max_val
```

</details>

---

### Exercise 2:

```python
def remove_duplicates(arr):
    unique = []
    for item in arr:
        if item not in unique:
            unique.append(item)
    return unique

# Test: Works but very slow for large arrays
```

<details>
<summary>Bug & Fix</summary>

**Bug:** O(n²) due to `item not in unique` being O(n)

**Fix:**
```python
def remove_duplicates(arr):
    seen = set()
    unique = []
    for item in arr:
        if item not in seen:  # O(1) with set
            seen.add(item)
            unique.append(item)
    return unique
```

</details>

---

## 🎯 Key Takeaways

1. **Be Systematic** - Follow the debugging process
2. **Reproduce First** - Can't fix what you can't reproduce
3. **Isolate the Problem** - Narrow down the location
4. **Understand, Don't Guess** - Know why it's broken
5. **Use Tools** - Debugger, prints, assertions
6. **Test Thoroughly** - Verify the fix works
7. **Learn from Bugs** - Each bug teaches something

---

**Remember:** Debugging is a skill. The more you practice, the better you get! 🐛➡️✅

---

[← Previous: Pseudocode and Planning](./04-Pseudocode-and-Planning.md) | [Next: Testing and Verification →](./06-Testing-and-Verification.md)
