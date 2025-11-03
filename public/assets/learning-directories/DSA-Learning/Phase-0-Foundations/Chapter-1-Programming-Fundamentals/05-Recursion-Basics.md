# 05. Recursion Basics

## 🎯 Learning Objectives

- Understand what recursion is and how it works
- Identify base cases and recursive cases
- Write simple recursive functions
- Trace recursive execution with call stacks
- Recognize when to use recursion vs iteration
- Avoid common recursion pitfalls

**Duration:** 4-5 hours  
**Difficulty:** ⭐⭐⭐ Hard

---

## 📚 Table of Contents

1. [What is Recursion?](#what-is-recursion)
2. [How Recursion Works](#how-recursion-works)
3. [Base Case and Recursive Case](#base-case-and-recursive-case)
4. [Classic Recursion Examples](#classic-recursion-examples)
5. [Call Stack Visualization](#call-stack-visualization)
6. [Recursion vs Iteration](#recursion-vs-iteration)
7. [Common Pitfalls](#common-pitfalls)

---

## What is Recursion?

**Recursion** is when a function calls itself to solve a smaller version of the same problem.

```
Recursion = Function calling itself + Base case to stop
```

### Real-World Analogy

**Russian Nesting Dolls (Matryoshka):**
```
Open doll:
  If doll is smallest:
    Done!
  Else:
    Open the doll inside
```

**Mirrors Facing Each Other:**
- Each reflection shows another reflection
- Creates infinite loop (without a "base case")

---

## How Recursion Works

### Simple Example: Countdown

**Python:**
```python
def countdown(n):
    # Base case: stop when n reaches 0
    if n == 0:
        print("Done!")
        return
    
    # Recursive case
    print(n)
    countdown(n - 1)  # Call itself with smaller value

countdown(5)
# Output:
# 5
# 4
# 3
# 2
# 1
# Done!
```

**C++:**
```cpp
void countdown(int n) {
    // Base case
    if (n == 0) {
        cout << "Done!" << endl;
        return;
    }
    
    // Recursive case
    cout << n << endl;
    countdown(n - 1);
}

countdown(5);
```

**Java:**
```java
public static void countdown(int n) {
    // Base case
    if (n == 0) {
        System.out.println("Done!");
        return;
    }
    
    // Recursive case
    System.out.println(n);
    countdown(n - 1);
}

countdown(5);
```

---

## Base Case and Recursive Case

Every recursive function needs:

### 1. Base Case
- **Stopping condition**
- Prevents infinite recursion
- Returns a direct answer

### 2. Recursive Case
- **Function calls itself**
- With a **smaller** or **simpler** problem
- Eventually reaches base case

```python
def factorial(n):
    # Base case: factorial of 0 or 1 is 1
    if n <= 1:
        return 1
    
    # Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1)

print(factorial(5))  # 120
```

**Execution Flow:**
```
factorial(5)
= 5 * factorial(4)
= 5 * (4 * factorial(3))
= 5 * (4 * (3 * factorial(2)))
= 5 * (4 * (3 * (2 * factorial(1))))
= 5 * (4 * (3 * (2 * 1)))
= 5 * (4 * (3 * 2))
= 5 * (4 * 6)
= 5 * 24
= 120
```

---

## Classic Recursion Examples

### Example 1: Factorial

**Python:**
```python
def factorial(n):
    # Base case
    if n <= 1:
        return 1
    # Recursive case
    return n * factorial(n - 1)

print(factorial(5))   # 120
print(factorial(0))   # 1
print(factorial(10))  # 3628800
```

**C++:**
```cpp
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

cout << factorial(5) << endl;   // 120
cout << factorial(10) << endl;  // 3628800
```

**Java:**
```java
public static int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

System.out.println(factorial(5));   // 120
System.out.println(factorial(10));  // 3628800
```

### Example 2: Fibonacci Sequence

**Python:**
```python
def fibonacci(n):
    # Base cases
    if n == 0:
        return 0
    if n == 1:
        return 1
    # Recursive case
    return fibonacci(n - 1) + fibonacci(n - 2)

# Generate first 10 Fibonacci numbers
for i in range(10):
    print(fibonacci(i), end=" ")
# Output: 0 1 1 2 3 5 8 13 21 34
```

**Call tree for fibonacci(5):**
```
                    fib(5)
                   /      \
              fib(4)        fib(3)
             /     \        /     \
        fib(3)   fib(2) fib(2)  fib(1)
        /   \     /  \    /  \
    fib(2) fib(1) f(1) f(0) f(1) f(0)
    /   \
  f(1) f(0)
```

**C++:**
```cpp
int fibonacci(int n) {
    if (n == 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

for (int i = 0; i < 10; i++) {
    cout << fibonacci(i) << " ";
}
cout << endl;
```

**Java:**
```java
public static int fibonacci(int n) {
    if (n == 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

for (int i = 0; i < 10; i++) {
    System.out.print(fibonacci(i) + " ");
}
System.out.println();
```

### Example 3: Sum of Array Elements

**Python:**
```python
def sum_array(arr, index=0):
    # Base case: reached end of array
    if index == len(arr):
        return 0
    # Recursive case: current element + sum of rest
    return arr[index] + sum_array(arr, index + 1)

numbers = [1, 2, 3, 4, 5]
print(sum_array(numbers))  # 15

# Alternative: using slicing
def sum_array_v2(arr):
    if len(arr) == 0:
        return 0
    return arr[0] + sum_array_v2(arr[1:])

print(sum_array_v2(numbers))  # 15
```

**C++:**
```cpp
int sumArray(int arr[], int size) {
    // Base case
    if (size == 0) return 0;
    // Recursive case
    return arr[size - 1] + sumArray(arr, size - 1);
}

int numbers[] = {1, 2, 3, 4, 5};
cout << sumArray(numbers, 5) << endl;  // 15
```

**Java:**
```java
public static int sumArray(int[] arr, int index) {
    if (index == arr.length) return 0;
    return arr[index] + sumArray(arr, index + 1);
}

int[] numbers = {1, 2, 3, 4, 5};
System.out.println(sumArray(numbers, 0));  // 15
```

### Example 4: Power Function

**Python:**
```python
def power(base, exponent):
    # Base case
    if exponent == 0:
        return 1
    # Recursive case
    return base * power(base, exponent - 1)

print(power(2, 5))   # 32
print(power(3, 4))   # 81
print(power(5, 0))   # 1

# Optimized version (divide and conquer)
def power_optimized(base, exponent):
    if exponent == 0:
        return 1
    if exponent % 2 == 0:
        half = power_optimized(base, exponent // 2)
        return half * half
    else:
        return base * power_optimized(base, exponent - 1)

print(power_optimized(2, 10))  # 1024
```

### Example 5: Reverse a String

**Python:**
```python
def reverse_string(s):
    # Base case
    if len(s) <= 1:
        return s
    # Recursive case: last char + reverse of rest
    return s[-1] + reverse_string(s[:-1])

print(reverse_string("hello"))  # olleh
print(reverse_string("python"))  # nohtyp
```

**C++:**
```cpp
string reverseString(string s) {
    if (s.length() <= 1) return s;
    return s[s.length() - 1] + reverseString(s.substr(0, s.length() - 1));
}

cout << reverseString("hello") << endl;  // olleh
```

**Java:**
```java
public static String reverseString(String s) {
    if (s.length() <= 1) return s;
    return s.charAt(s.length() - 1) + reverseString(s.substring(0, s.length() - 1));
}

System.out.println(reverseString("hello"));  // olleh
```

### Example 6: Check if String is Palindrome

**Python:**
```python
def is_palindrome(s):
    # Base case: empty or single character
    if len(s) <= 1:
        return True
    # Check first and last match, recurse on middle
    if s[0] != s[-1]:
        return False
    return is_palindrome(s[1:-1])

print(is_palindrome("racecar"))  # True
print(is_palindrome("hello"))    # False
print(is_palindrome("madam"))    # True
```

---

## Call Stack Visualization

### Understanding the Call Stack

When a function calls itself, each call is added to the **call stack**.

**Example: factorial(3)**

```
Step 1: Call factorial(3)
Stack: [factorial(3)]

Step 2: factorial(3) calls factorial(2)
Stack: [factorial(3), factorial(2)]

Step 3: factorial(2) calls factorial(1)
Stack: [factorial(3), factorial(2), factorial(1)]

Step 4: factorial(1) returns 1 (base case)
Stack: [factorial(3), factorial(2)]
Result so far: 1

Step 5: factorial(2) returns 2 * 1 = 2
Stack: [factorial(3)]
Result so far: 2

Step 6: factorial(3) returns 3 * 2 = 6
Stack: []
Final result: 6
```

### Stack Trace Example

**Python:**
```python
def func_a():
    print("Entering func_a")
    func_b()
    print("Exiting func_a")

def func_b():
    print("Entering func_b")
    func_c()
    print("Exiting func_b")

def func_c():
    print("Entering func_c")
    print("Base case reached!")
    print("Exiting func_c")

func_a()

# Output:
# Entering func_a
# Entering func_b
# Entering func_c
# Base case reached!
# Exiting func_c
# Exiting func_b
# Exiting func_a
```

---

## Recursion vs Iteration

### Same Problem, Different Approaches

**Factorial - Iterative:**
```python
def factorial_iterative(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

print(factorial_iterative(5))  # 120
```

**Factorial - Recursive:**
```python
def factorial_recursive(n):
    if n <= 1:
        return 1
    return n * factorial_recursive(n - 1)

print(factorial_recursive(5))  # 120
```

### When to Use Recursion

✅ **Use Recursion When:**
- Problem naturally divides into smaller subproblems
- Tree or graph traversal
- Divide and conquer algorithms
- Code is more readable and elegant

❌ **Avoid Recursion When:**
- Simple iteration is clearer
- Performance is critical (recursion has overhead)
- Deep recursion might cause stack overflow
- Excessive repeated calculations (like naive Fibonacci)

### Comparison Table

| Aspect | Recursion | Iteration |
|--------|-----------|-----------|
| **Readability** | Often cleaner for complex problems | Better for simple loops |
| **Memory** | Uses call stack (can overflow) | Uses loop variables (minimal) |
| **Performance** | Slower (function call overhead) | Faster |
| **Debugging** | Can be harder to trace | Easier to debug |
| **Use Cases** | Tree/graph traversal, divide & conquer | Simple counting, iteration |

---

## Common Pitfalls

### 1. Missing Base Case

```python
# WRONG: Infinite recursion!
def bad_countdown(n):
    print(n)
    bad_countdown(n - 1)  # Never stops!

# bad_countdown(5)  # Don't run this!
```

### 2. Base Case Never Reached

```python
# WRONG: Base case at 0, but decrementing by 2
def bad_function(n):
    if n == 0:
        return
    print(n)
    bad_function(n - 2)  # If n is odd, never reaches 0!

# bad_function(5)  # Causes stack overflow
```

### 3. Not Returning Values

```python
# WRONG: Missing return statements
def bad_factorial(n):
    if n <= 1:
        1  # Should be: return 1
    n * bad_factorial(n - 1)  # Should be: return n * ...

print(bad_factorial(5))  # None
```

### 4. Excessive Recursion (Fibonacci)

```python
# INEFFICIENT: Recalculates many values
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

# fib(40) takes forever!

# BETTER: Use memoization
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

print(fib_memo(40))  # Fast!
```

### 5. Stack Overflow

```python
# Default recursion limit in Python: ~1000
import sys
print(sys.getrecursionlimit())  # 1000

# This will cause RecursionError:
# factorial(2000)

# Can increase limit (use cautiously):
sys.setrecursionlimit(3000)

# Better: Use iteration for deep recursion
def factorial_iterative(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

print(factorial_iterative(2000))  # Works fine
```

---

## Practice Problems

### Easy
1. Write a recursive function to count down from n to 1
2. Calculate sum of numbers from 1 to n
3. Find the length of a string recursively
4. Count occurrences of a character in a string

### Medium
5. Reverse a list/array recursively
6. Check if a number is prime (recursive helper)
7. Find GCD (Greatest Common Divisor) using Euclidean algorithm
8. Binary search (recursive)

### Hard
9. Generate all permutations of a string
10. Solve Tower of Hanoi puzzle
11. Traverse a binary tree (covered in tree chapter)
12. Find all subsets of a set

---

## ✅ Checklist

- [ ] Understand what recursion is
- [ ] Identify base case and recursive case
- [ ] Write simple recursive functions
- [ ] Trace recursive execution manually
- [ ] Know when to use recursion vs iteration
- [ ] Avoid common recursion pitfalls

---

## 🚀 Next Steps

Continue to [06-Input-Output-Operations.md](./06-Input-Output-Operations.md)

---

[← Back: Functions](./04-Functions-and-Scope.md) | [Next: I/O Operations →](./06-Input-Output-Operations.md)
