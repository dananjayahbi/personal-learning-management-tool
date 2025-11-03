# Module 1: Understanding Problems

## 🎯 Module Overview

**The #1 mistake beginners make:** Starting to code before fully understanding the problem.

This module teaches you how to read, analyze, and fully comprehend problem statements before writing a single line of code.

**Time Required:** 30-60 minutes  
**Practice Problems:** 10

---

## 📖 Why Problem Understanding Matters

### The Cost of Misunderstanding:

```
❌ Poor Understanding → ❌ Wrong Solution → ❌ Hours Wasted Debugging
✅ Good Understanding → ✅ Right Approach → ✅ Clean Solution
```

**Real Example:**
```
Problem: "Find the sum of all even numbers in an array"

Misunderstanding #1: Including 0 (is 0 even?)
Misunderstanding #2: Handling negative numbers
Misunderstanding #3: What if array is empty?
```

Without understanding these details, your solution might fail edge cases.

---

## 🔍 The 5-Step Understanding Process

### Step 1: Read the Problem (Multiple Times)

**First Read:** Get the general idea  
**Second Read:** Focus on details  
**Third Read:** Identify constraints and edge cases

**Practice:**
```
Problem: "Given an array of integers, return indices of the two numbers 
that add up to a specific target."

First Read: "Need to find two numbers that sum to target"
Second Read: "Must return INDICES, not values"
Third Read: "Is there always a solution? Can I use same element twice?"
```

### Step 2: Identify Key Components

For EVERY problem, extract:

#### 📥 Input:
- What data are you given?
- What format is it in?
- What are the constraints? (size, range, type)

#### 📤 Output:
- What should you return?
- What format should it be in?
- Are there multiple valid outputs?

#### ⚠️ Constraints:
- Array size limits
- Number ranges
- Time/space requirements
- Special conditions

#### 🎯 Examples:
- Understand the given examples
- Create your own examples
- Think of edge cases

---

## 📝 The Problem Analysis Template

Use this template for EVERY problem:

```markdown
## Problem: [Problem Name]

### Understanding:
- **What am I asked to do?** [In your own words]
- **What's the core challenge?** [The main difficulty]

### Input:
- **Type:** [Array, string, number, etc.]
- **Size:** [Min/max size]
- **Range:** [Value ranges]
- **Format:** [How is it provided?]

### Output:
- **Type:** [What to return]
- **Format:** [How to format it]
- **Multiple solutions?** [Yes/No]

### Constraints:
- **Time limit:** [If given]
- **Space limit:** [If given]
- **Special conditions:** [Any special rules]

### Edge Cases:
- Empty input?
- Single element?
- All same elements?
- Negative numbers?
- Very large numbers?
- Duplicates?

### Examples:
- **Example 1:** [Work through it]
- **Example 2:** [Work through it]
- **My Example:** [Create your own]
```

---

## 🎓 Practical Example: Two Sum Problem

Let's apply the template to a real problem:

### Problem Statement:
```
Given an array of integers nums and an integer target, return indices of 
the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you 
may not use the same element twice.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Constraints:
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.
```

### Completed Analysis:

```markdown
## Problem: Two Sum

### Understanding:
- **What am I asked to do?** Find two numbers in array that sum to target, 
  return their indices (positions)
- **What's the core challenge?** Need to find a pair efficiently, can't use 
  same element twice

### Input:
- **Type:** Array of integers + single target integer
- **Size:** Minimum 2 elements, maximum 10,000 elements
- **Range:** Values from -1 billion to +1 billion
- **Format:** Standard array and integer

### Output:
- **Type:** Array of two integers (indices)
- **Format:** [index1, index2]
- **Multiple solutions?** No, exactly one solution guaranteed

### Constraints:
- **Time limit:** Not specified, but O(n²) might be too slow for n=10,000
- **Space limit:** Not specified
- **Special conditions:** 
  - Can't use same element twice (indices must be different)
  - Exactly one solution exists (no need to handle "no solution" case)

### Edge Cases:
- Minimum size (2 elements)? ✓ Covered by constraints
- Negative numbers? ✓ Yes, possible
- Zero in array? ✓ Possible
- Target is negative? ✓ Possible
- Duplicates in array? ✓ Not mentioned, assume possible

### Examples:
- **Example 1:** [2,7,11,15], target=9 → [0,1]
  - Check: 2+7=9 ✓
- **Example 2:** [3,2,4], target=6 → [1,2]
  - Check: 2+4=6 ✓
- **My Example:** [5,5], target=10 → [0,1]
  - Two same values, different indices
```

---

## 🚨 Common Misunderstanding Traps

### Trap #1: Assuming Sorted Input
```
❌ "The array is sorted, so I can use binary search"
✅ Read carefully - is it explicitly stated?
```

### Trap #2: Ignoring Edge Cases
```
❌ "I'll handle normal cases first, edge cases later"
✅ Consider edge cases during understanding phase
```

### Trap #3: Missing Return Type
```
❌ "Return the numbers that sum to target"
✅ "Return the INDICES of the numbers"
```

### Trap #4: Assuming Unique Solution
```
❌ "There's only one solution"
✅ Check: does problem guarantee uniqueness?
```

### Trap #5: Overlooking Constraints
```
❌ "Array size doesn't matter"
✅ n=10^4 means O(n²) might be too slow!
```

---

## 🎯 Practice: Analyze These Problems

For each problem below, fill out the Problem Analysis Template:

### Problem 1: Reverse a String
```
Write a function that reverses a string. The input string is given as an 
array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.

Example:
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
```

<details>
<summary>Click to see analysis</summary>

**Understanding:**
- What: Reverse character array in-place
- Challenge: In-place (O(1) space), can't create new array

**Input:**
- Type: Array of characters
- Size: Not specified
- Format: Array like ["h","e","l","l","o"]

**Output:**
- Type: Modified input array (in-place)
- Format: Same array, reversed

**Constraints:**
- Must be in-place
- O(1) extra space (can only use constant variables)

**Edge Cases:**
- Empty array []
- Single character ["a"]
- Even vs odd length

</details>

---

### Problem 2: Valid Palindrome
```
A phrase is a palindrome if, after converting all uppercase letters into 
lowercase letters and removing all non-alphanumeric characters, it reads 
the same forward and backward.

Given a string s, return true if it is a palindrome, or false otherwise.

Example 1:
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.

Example 2:
Input: s = "race a car"
Output: false
```

<details>
<summary>Click to see analysis</summary>

**Understanding:**
- What: Check if string is palindrome after cleaning
- Challenge: Need to ignore case and non-alphanumeric chars

**Input:**
- Type: String
- Size: Not specified
- Format: May contain spaces, punctuation, mixed case

**Output:**
- Type: Boolean (true/false)
- Format: Single boolean value

**Constraints:**
- Must handle uppercase → lowercase conversion
- Must ignore non-alphanumeric characters

**Edge Cases:**
- Empty string ""
- Only spaces "   "
- Only non-alphanumeric ".,!?"
- Single character "a"

</details>

---

### Problem 3: Maximum Subarray
```
Given an integer array nums, find the subarray with the largest sum, 
and return its sum.

Example:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.

Constraints:
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4
```

<details>
<summary>Click to see analysis</summary>

**Understanding:**
- What: Find contiguous subarray with maximum sum
- Challenge: Elements can be negative, need to handle negative sums

**Input:**
- Type: Array of integers
- Size: 1 to 100,000 elements
- Range: -10,000 to 10,000

**Output:**
- Type: Single integer (the maximum sum)
- Format: Just the number

**Constraints:**
- Time: O(n²) might timeout for n=100,000
- Must be contiguous subarray

**Edge Cases:**
- All negative numbers: return least negative
- Single element
- All positive: sum entire array
- Mix of positive and negative

</details>

---

## 🔄 Interactive Exercise

### Exercise: Clarifying Questions

For this problem, what questions would you ask?

```
Problem: "Given an array of numbers, find the duplicate."
```

<details>
<summary>Important questions to ask:</summary>

1. **How many duplicates?**
   - Exactly one duplicate?
   - Multiple duplicates possible?
   - Which duplicate to return if multiple?

2. **What's the array range?**
   - Are numbers 1 to n?
   - Can they be negative?
   - Any bounds?

3. **What if no duplicate?**
   - Is it guaranteed to have a duplicate?
   - What to return if none?

4. **Input size?**
   - How large can the array be?
   - Affects algorithm choice

5. **Can I modify input?**
   - Sorting allowed?
   - In-place modification ok?

6. **Space constraints?**
   - Can I use extra space?
   - How much?

</details>

---

## ✅ Checklist: Good Problem Understanding

Before proceeding to solution design, verify:

- [ ] I can explain the problem in my own words
- [ ] I know exactly what input I'll receive
- [ ] I know exactly what output is expected
- [ ] I've identified all constraints
- [ ] I've thought of at least 3 edge cases
- [ ] I've worked through the examples manually
- [ ] I've created my own example
- [ ] I know what questions to ask if anything is unclear

---

## 💡 Pro Tips

1. **Read 3 Times:** First for gist, second for details, third for edge cases

2. **Rewrite in Your Words:** If you can explain it simply, you understand it

3. **Draw It Out:** Visualize the problem with diagrams

4. **Work Examples Manually:** Trace through examples by hand

5. **Question Everything:** If anything is ambiguous, ask!

6. **Keep Notes:** Write down your understanding - it helps in interviews

---

## 📚 Additional Practice Problems

Analyze these problems (don't solve yet, just understand):

1. **Merge Sorted Arrays** (LeetCode #88)
2. **Remove Duplicates from Sorted Array** (LeetCode #26)
3. **Best Time to Buy and Sell Stock** (LeetCode #121)
4. **Rotate Array** (LeetCode #189)
5. **Contains Duplicate** (LeetCode #217)

For each:
- Fill out the Problem Analysis Template
- Identify edge cases
- Work through examples manually

---

## 🎓 Key Takeaways

1. **Never start coding immediately** - understand first!
2. **Read the problem at least twice** - details matter
3. **Identify input, output, and constraints explicitly**
4. **Think of edge cases early** - they often break solutions
5. **Work through examples manually** - builds intuition
6. **Ask clarifying questions** - especially in interviews

---

**Remember:** 5 minutes understanding the problem saves 50 minutes debugging! 🎯

---

[← Back to Chapter 4](./README.md) | [Next: Pattern Recognition →](./02-Pattern-Recognition.md)
