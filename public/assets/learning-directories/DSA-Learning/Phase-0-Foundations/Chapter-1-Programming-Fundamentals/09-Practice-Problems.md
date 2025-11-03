# 09. Practice Problems

## 🎯 Overview

This file contains **30+ practice problems** to reinforce programming fundamentals. Problems are organized by difficulty and topic.

**How to Use:**
1. Try solving each problem yourself first
2. Implement in at least one language (Python, C++, or Java)
3. Test with the provided examples
4. Check solutions only after attempting
5. Try to optimize your solution

---

## 📚 Table of Contents

1. [Variables and Operators (5 problems)](#variables-and-operators)
2. [Control Flow (10 problems)](#control-flow)
3. [Functions (8 problems)](#functions)
4. [Recursion (7 problems)](#recursion)
5. [Arrays and Strings (10 problems)](#arrays-and-strings)

---

## Variables and Operators

### Problem 1: Temperature Converter ⭐
**Difficulty:** Easy

Write a program that converts Celsius to Fahrenheit and vice versa.

**Input:**
- Temperature value and unit ('C' or 'F')

**Output:**
- Converted temperature with unit

**Example:**
```
Input: 25 C
Output: 77.0 F

Input: 77 F
Output: 25.0 C
```

**Hint:** F = (C × 9/5) + 32

---

### Problem 2: Simple Calculator ⭐
**Difficulty:** Easy

Create a calculator that performs basic operations: +, -, *, /, %

**Input:**
- Two numbers and an operator

**Output:**
- Result of operation

**Example:**
```
Input: 10 + 5
Output: 15

Input: 20 / 4
Output: 5
```

---

### Problem 3: Swap Without Temp Variable ⭐
**Difficulty:** Easy

Swap two numbers without using a temporary variable.

**Requirements:**
- Use arithmetic or bitwise operators
- Don't use any extra variables

**Example:**
```
Input: a = 5, b = 10
Output: a = 10, b = 5
```

---

### Problem 4: Check Leap Year ⭐
**Difficulty:** Easy

Determine if a given year is a leap year.

**Rules:**
- Divisible by 4 AND (not divisible by 100 OR divisible by 400)

**Example:**
```
Input: 2024
Output: Leap year

Input: 2023
Output: Not a leap year

Input: 2000
Output: Leap year

Input: 1900
Output: Not a leap year
```

---

### Problem 5: BMI Calculator ⭐
**Difficulty:** Easy

Calculate Body Mass Index and classify the result.

**Formula:** BMI = weight(kg) / height(m)²

**Classification:**
- Underweight: BMI < 18.5
- Normal: 18.5 ≤ BMI < 25
- Overweight: 25 ≤ BMI < 30
- Obese: BMI ≥ 30

**Example:**
```
Input: weight=70, height=1.75
Output: BMI: 22.86, Classification: Normal
```

---

## Control Flow

### Problem 6: FizzBuzz ⭐
**Difficulty:** Easy

Print numbers from 1 to n with the following rules:
- Print "Fizz" if divisible by 3
- Print "Buzz" if divisible by 5
- Print "FizzBuzz" if divisible by both
- Otherwise, print the number

**Example:**
```
Input: n = 15
Output: 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz
```

---

### Problem 7: Prime Number Check ⭐⭐
**Difficulty:** Medium

Determine if a number is prime.

**Definition:** A prime number is divisible only by 1 and itself.

**Example:**
```
Input: 17
Output: Prime

Input: 20
Output: Not prime

Input: 2
Output: Prime
```

**Optimization:** Only check divisors up to √n

---

### Problem 8: Print Patterns ⭐
**Difficulty:** Easy

Print the following patterns:

**Pattern 1 - Right Triangle:**
```
*
**
***
****
*****
```

**Pattern 2 - Pyramid:**
```
    *
   ***
  *****
 *******
*********
```

**Pattern 3 - Diamond:**
```
    *
   ***
  *****
 *******
  *****
   ***
    *
```

---

### Problem 9: Fibonacci Sequence ⭐
**Difficulty:** Easy

Generate the first n Fibonacci numbers.

**Sequence:** 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

**Example:**
```
Input: n = 10
Output: 0 1 1 2 3 5 8 13 21 34
```

---

### Problem 10: Perfect Number ⭐⭐
**Difficulty:** Medium

Check if a number is a perfect number.

**Definition:** A perfect number equals the sum of its proper divisors (excluding itself).

**Example:**
```
Input: 6
Output: Perfect (1 + 2 + 3 = 6)

Input: 28
Output: Perfect (1 + 2 + 4 + 7 + 14 = 28)

Input: 12
Output: Not perfect
```

---

### Problem 11: Armstrong Number ⭐⭐
**Difficulty:** Medium

Check if a number is an Armstrong number (narcissistic number).

**Definition:** A number equals the sum of its digits raised to the power of the number of digits.

**Example:**
```
Input: 153
Output: Armstrong (1³ + 5³ + 3³ = 1 + 125 + 27 = 153)

Input: 9474
Output: Armstrong (9⁴ + 4⁴ + 7⁴ + 4⁴ = 9474)

Input: 123
Output: Not Armstrong
```

---

### Problem 12: Number Guessing Game ⭐
**Difficulty:** Easy

Implement a number guessing game where:
- Computer picks a random number (1-100)
- User has 7 attempts to guess
- Provide "too high" or "too low" hints

**Example:**
```
Computer picks: 42
Guess 1: 50 → Too high
Guess 2: 25 → Too low
Guess 3: 40 → Too low
Guess 4: 45 → Too high
Guess 5: 42 → Correct! You win!
```

---

### Problem 13: Multiplication Table ⭐
**Difficulty:** Easy

Print a multiplication table of size n×n.

**Example:**
```
Input: n = 5
Output:
  1   2   3   4   5
  2   4   6   8  10
  3   6   9  12  15
  4   8  12  16  20
  5  10  15  20  25
```

---

### Problem 14: Prime Numbers in Range ⭐⭐
**Difficulty:** Medium

Find all prime numbers between a and b.

**Example:**
```
Input: a = 10, b = 30
Output: 11 13 17 19 23 29
```

**Bonus:** Implement using Sieve of Eratosthenes for efficiency

---

### Problem 15: Digital Root ⭐⭐
**Difficulty:** Medium

Calculate the digital root of a number (sum digits repeatedly until single digit).

**Example:**
```
Input: 38
Process: 3 + 8 = 11 → 1 + 1 = 2
Output: 2

Input: 9875
Process: 9+8+7+5 = 29 → 2+9 = 11 → 1+1 = 2
Output: 2
```

---

## Functions

### Problem 16: Palindrome Checker ⭐
**Difficulty:** Easy

Write a function to check if a string is a palindrome.

**Example:**
```
Input: "racecar"
Output: True

Input: "hello"
Output: False

Input: "A man a plan a canal Panama" (ignore spaces/case)
Output: True
```

---

### Problem 17: GCD and LCM ⭐⭐
**Difficulty:** Medium

Write functions to calculate:
- GCD (Greatest Common Divisor) using Euclidean algorithm
- LCM (Least Common Multiple)

**Formula:** LCM(a, b) = (a × b) / GCD(a, b)

**Example:**
```
Input: a = 12, b = 18
Output: GCD = 6, LCM = 36

Input: a = 7, b = 13
Output: GCD = 1, LCM = 91
```

---

### Problem 18: Number to Words ⭐⭐⭐
**Difficulty:** Hard

Convert a number (0-999) to words.

**Example:**
```
Input: 0
Output: Zero

Input: 42
Output: Forty Two

Input: 123
Output: One Hundred Twenty Three

Input: 500
Output: Five Hundred
```

---

### Problem 19: Count Digits ⭐
**Difficulty:** Easy

Write functions to:
- Count total digits in a number
- Count specific digit occurrences
- Sum all digits

**Example:**
```
Input: 12345
Total digits: 5
Count of 3: 1
Sum of digits: 15
```

---

### Problem 20: Factorial with Overflow Check ⭐⭐
**Difficulty:** Medium

Calculate factorial with overflow detection.

**Example:**
```
Input: 5
Output: 120

Input: 20
Output: 2432902008176640000

Input: 100
Output: Error: Overflow (in languages with fixed integer size)
```

---

### Problem 21: Power Function ⭐⭐
**Difficulty:** Medium

Implement efficient power function: base^exponent

**Requirements:**
- Handle negative exponents
- Optimize using divide and conquer

**Example:**
```
Input: base=2, exp=10
Output: 1024

Input: base=5, exp=0
Output: 1

Input: base=2, exp=-3
Output: 0.125
```

---

### Problem 22: Anagram Checker ⭐⭐
**Difficulty:** Medium

Check if two strings are anagrams.

**Definition:** Anagrams have the same letters in different order.

**Example:**
```
Input: "listen", "silent"
Output: True

Input: "hello", "world"
Output: False
```

---

### Problem 23: Prime Factorization ⭐⭐⭐
**Difficulty:** Hard

Find all prime factors of a number.

**Example:**
```
Input: 60
Output: 2 × 2 × 3 × 5

Input: 100
Output: 2 × 2 × 5 × 5

Input: 17
Output: 17 (prime)
```

---

## Recursion

### Problem 24: Sum of Digits (Recursive) ⭐
**Difficulty:** Easy

Calculate sum of digits recursively.

**Example:**
```
Input: 12345
Output: 15 (1+2+3+4+5)
```

---

### Problem 25: Reverse String (Recursive) ⭐
**Difficulty:** Easy

Reverse a string using recursion.

**Example:**
```
Input: "hello"
Output: "olleh"
```

---

### Problem 26: Tower of Hanoi ⭐⭐⭐
**Difficulty:** Hard

Solve the Tower of Hanoi puzzle.

**Rules:**
- Move n disks from source to destination using auxiliary peg
- Only one disk can be moved at a time
- Larger disk cannot be on smaller disk

**Example:**
```
Input: n = 3
Output:
Move disk 1 from A to C
Move disk 2 from A to B
Move disk 1 from C to B
Move disk 3 from A to C
Move disk 1 from B to A
Move disk 2 from B to C
Move disk 1 from A to C
```

---

### Problem 27: Binary Search (Recursive) ⭐⭐
**Difficulty:** Medium

Implement binary search recursively.

**Example:**
```
Input: arr = [1, 3, 5, 7, 9, 11], target = 7
Output: Index 3

Input: arr = [1, 3, 5, 7, 9, 11], target = 4
Output: Not found
```

---

### Problem 28: Generate Permutations ⭐⭐⭐
**Difficulty:** Hard

Generate all permutations of a string.

**Example:**
```
Input: "ABC"
Output: ABC, ACB, BAC, BCA, CAB, CBA
```

---

### Problem 29: Count Paths in Grid ⭐⭐⭐
**Difficulty:** Hard

Count paths from top-left to bottom-right in an n×m grid (moving only right or down).

**Example:**
```
Input: 3×3 grid
Output: 6 paths

Input: 2×2 grid
Output: 2 paths
```

---

### Problem 30: Decimal to Binary (Recursive) ⭐⭐
**Difficulty:** Medium

Convert decimal to binary using recursion.

**Example:**
```
Input: 10
Output: 1010

Input: 25
Output: 11001
```

---

## Arrays and Strings

### Problem 31: Find Maximum and Minimum ⭐
**Difficulty:** Easy

Find the maximum and minimum elements in an array.

**Example:**
```
Input: [3, 1, 4, 1, 5, 9, 2, 6]
Output: Max = 9, Min = 1
```

---

### Problem 32: Reverse an Array ⭐
**Difficulty:** Easy

Reverse an array in-place.

**Example:**
```
Input: [1, 2, 3, 4, 5]
Output: [5, 4, 3, 2, 1]
```

---

### Problem 33: Remove Duplicates ⭐⭐
**Difficulty:** Medium

Remove duplicates from a sorted array.

**Example:**
```
Input: [1, 1, 2, 2, 3, 4, 4, 5]
Output: [1, 2, 3, 4, 5]
```

---

### Problem 34: Second Largest Element ⭐⭐
**Difficulty:** Medium

Find the second largest element without sorting.

**Example:**
```
Input: [5, 2, 8, 1, 9, 3]
Output: 8
```

---

### Problem 35: Rotate Array ⭐⭐
**Difficulty:** Medium

Rotate array by k positions to the right.

**Example:**
```
Input: arr = [1, 2, 3, 4, 5], k = 2
Output: [4, 5, 1, 2, 3]
```

---

### Problem 36: Check if Sorted ⭐
**Difficulty:** Easy

Check if array is sorted in ascending order.

**Example:**
```
Input: [1, 2, 3, 4, 5]
Output: True

Input: [1, 3, 2, 4, 5]
Output: False
```

---

### Problem 37: Merge Two Sorted Arrays ⭐⭐
**Difficulty:** Medium

Merge two sorted arrays into one sorted array.

**Example:**
```
Input: arr1 = [1, 3, 5], arr2 = [2, 4, 6]
Output: [1, 2, 3, 4, 5, 6]
```

---

### Problem 38: Count Vowels and Consonants ⭐
**Difficulty:** Easy

Count vowels and consonants in a string.

**Example:**
```
Input: "Hello World"
Output: Vowels: 3, Consonants: 7
```

---

### Problem 39: Remove Spaces from String ⭐
**Difficulty:** Easy

Remove all spaces from a string.

**Example:**
```
Input: "Hello World From Python"
Output: "HelloWorldFromPython"
```

---

### Problem 40: Check Substring ⭐
**Difficulty:** Easy

Check if one string is a substring of another (without using built-in functions).

**Example:**
```
Input: str = "hello world", substr = "world"
Output: True

Input: str = "hello world", substr = "planet"
Output: False
```

---

## 🎯 Bonus Challenges

### Problem 41: Caesar Cipher ⭐⭐
Implement Caesar cipher encryption and decryption.

### Problem 42: Run Length Encoding ⭐⭐
Compress a string using run-length encoding.
Example: "aaabbbcc" → "a3b3c2"

### Problem 43: Valid Parentheses ⭐⭐
Check if parentheses in a string are balanced.
Example: "{[()]}" → Valid, "{[(])}" → Invalid

### Problem 44: Longest Common Prefix ⭐⭐
Find longest common prefix among array of strings.

### Problem 45: Dutch National Flag ⭐⭐⭐
Sort array of 0s, 1s, and 2s in single pass.

---

## 📝 Solutions Template

**Python:**
```python
def solution(input_data):
    # Your implementation here
    pass

# Test cases
print(solution(test_input))
```

**C++:**
```cpp
#include <iostream>
using namespace std;

// Your function implementation

int main() {
    // Test cases
    return 0;
}
```

**Java:**
```java
public class Solution {
    public static void solve() {
        // Your implementation
    }
    
    public static void main(String[] args) {
        // Test cases
    }
}
```

---

## ✅ Progress Tracker

Track your progress:
- [ ] Completed 0-10 problems (Beginner)
- [ ] Completed 11-20 problems (Intermediate)
- [ ] Completed 21-30 problems (Advanced)
- [ ] Completed all 45 problems (Master!)

---

## 🚀 Next Steps

After completing these problems, you're ready for Phase 1: Linear Data Structures!

---

[← Back to Chapter 1](./README.md)
