# 02. Operators and Expressions

## 🎯 Learning Objectives

By the end of this lesson, you will be able to:
- Use arithmetic operators for mathematical operations
- Apply comparison operators to compare values
- Combine conditions with logical operators
- Understand operator precedence and associativity
- Use bitwise operators for low-level operations
- Work with assignment and compound operators

**Duration:** 3-4 hours  
**Difficulty:** ⭐ Easy

---

## 📚 Table of Contents

1. [What are Operators?](#what-are-operators)
2. [Arithmetic Operators](#arithmetic-operators)
3. [Comparison Operators](#comparison-operators)
4. [Logical Operators](#logical-operators)
5. [Assignment Operators](#assignment-operators)
6. [Bitwise Operators](#bitwise-operators)
7. [Operator Precedence](#operator-precedence)
8. [Practice Examples](#practice-examples)

---

## What are Operators?

**Operators** are special symbols that perform operations on operands (values or variables).

```
Expression = Operand + Operator + Operand
Example:    5 + 3
            ↑   ↑   ↑
         Left Op  Right
         Operand  Operand
```

### Types of Operators by Number of Operands

- **Unary:** One operand (`-x`, `!flag`)
- **Binary:** Two operands (`a + b`, `x > y`)
- **Ternary:** Three operands (`condition ? true_val : false_val`)

---

## Arithmetic Operators

Perform mathematical calculations.

### Basic Arithmetic

| Operator | Name | Example | Python | C++ | Java |
|----------|------|---------|--------|-----|------|
| `+` | Addition | `5 + 3` | `8` | `8` | `8` |
| `-` | Subtraction | `5 - 3` | `2` | `2` | `2` |
| `*` | Multiplication | `5 * 3` | `15` | `15` | `15` |
| `/` | Division | `5 / 2` | `2.5` | `2` | `2` |
| `%` | Modulo | `5 % 2` | `1` | `1` | `1` |
| `**` | Exponentiation | `2 ** 3` | `8` | N/A | N/A |
| `//` | Floor Division | `5 // 2` | `2` | N/A | N/A |

### Python Examples

```python
# Basic arithmetic
a = 10
b = 3

print(a + b)   # 13 - Addition
print(a - b)   # 7  - Subtraction
print(a * b)   # 30 - Multiplication
print(a / b)   # 3.333... - True division
print(a // b)  # 3  - Floor division
print(a % b)   # 1  - Modulo (remainder)
print(a ** b)  # 1000 - Exponentiation

# Negative numbers
print(-a)      # -10 - Unary minus

# Precedence
result = 5 + 3 * 2
print(result)  # 11 (not 16, because * before +)
```

### C++ Examples

```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int a = 10;
    int b = 3;
    
    cout << a + b << endl;   // 13
    cout << a - b << endl;   // 7
    cout << a * b << endl;   // 30
    cout << a / b << endl;   // 3 (integer division!)
    cout << a % b << endl;   // 1
    
    // For true division, use double
    double x = 10.0;
    double y = 3.0;
    cout << x / y << endl;   // 3.33333
    
    // Exponentiation (requires cmath)
    cout << pow(2, 3) << endl;  // 8
    
    // Unary operators
    cout << -a << endl;      // -10
    
    return 0;
}
```

### Java Examples

```java
public class Operators {
    public static void main(String[] args) {
        int a = 10;
        int b = 3;
        
        System.out.println(a + b);   // 13
        System.out.println(a - b);   // 7
        System.out.println(a * b);   // 30
        System.out.println(a / b);   // 3 (integer division)
        System.out.println(a % b);   // 1
        
        // For true division
        double x = 10.0;
        double y = 3.0;
        System.out.println(x / y);   // 3.3333...
        
        // Exponentiation
        System.out.println(Math.pow(2, 3));  // 8.0
        
        // Unary minus
        System.out.println(-a);      // -10
    }
}
```

### Integer Division Pitfall

```python
# Python 3
print(5 / 2)   # 2.5 (true division)
print(5 // 2)  # 2 (floor division)
```

```cpp
// C++
int result1 = 5 / 2;        // 2 (integer division)
double result2 = 5.0 / 2;   // 2.5 (floating-point division)
double result3 = 5 / 2.0;   // 2.5
double result4 = (double)5 / 2;  // 2.5 (cast to double)
```

```java
// Java
int result1 = 5 / 2;           // 2 (integer division)
double result2 = 5.0 / 2;      // 2.5
double result3 = (double)5 / 2; // 2.5
```

### Increment and Decrement

| Operator | Name | Description |
|----------|------|-------------|
| `++x` | Pre-increment | Increment first, then use value |
| `x++` | Post-increment | Use value first, then increment |
| `--x` | Pre-decrement | Decrement first, then use value |
| `x--` | Post-decrement | Use value first, then decrement |

**C++ Example:**
```cpp
int x = 5;
int y = ++x;  // x becomes 6, y = 6
cout << x << " " << y << endl;  // 6 6

int a = 5;
int b = a++;  // b = 5, then a becomes 6
cout << a << " " << b << endl;  // 6 5
```

**Java Example:**
```java
int x = 5;
int y = ++x;  // x becomes 6, y = 6
System.out.println(x + " " + y);  // 6 6

int a = 5;
int b = a++;  // b = 5, then a becomes 6
System.out.println(a + " " + b);  // 6 5
```

**Python Note:** Python doesn't have `++` and `--` operators. Use `x += 1` instead.

---

## Comparison Operators

Compare two values and return boolean result.

### Comparison Table

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `==` | Equal to | `5 == 5` | `True` |
| `!=` | Not equal | `5 != 3` | `True` |
| `>` | Greater than | `5 > 3` | `True` |
| `<` | Less than | `5 < 3` | `False` |
| `>=` | Greater or equal | `5 >= 5` | `True` |
| `<=` | Less or equal | `5 <= 3` | `False` |

### Python Examples

```python
a = 10
b = 5

print(a == b)  # False
print(a != b)  # True
print(a > b)   # True
print(a < b)   # False
print(a >= b)  # True
print(a <= b)  # False

# String comparison (lexicographical)
print("apple" < "banana")  # True
print("abc" == "abc")      # True

# Chaining comparisons (Python only)
x = 5
print(1 < x < 10)  # True (equivalent to 1 < x and x < 10)
```

### C++ Examples

```cpp
int a = 10;
int b = 5;

cout << (a == b) << endl;  // 0 (false)
cout << (a != b) << endl;  // 1 (true)
cout << (a > b) << endl;   // 1 (true)
cout << (a < b) << endl;   // 0 (false)
cout << (a >= b) << endl;  // 1 (true)
cout << (a <= b) << endl;  // 0 (false)

// For boolean output
cout << boolalpha;
cout << (a > b) << endl;   // true
```

### Java Examples

```java
int a = 10;
int b = 5;

System.out.println(a == b);  // false
System.out.println(a != b);  // true
System.out.println(a > b);   // true
System.out.println(a < b);   // false
System.out.println(a >= b);  // true
System.out.println(a <= b);  // false

// String comparison (use .equals() method)
String s1 = "hello";
String s2 = "hello";
System.out.println(s1.equals(s2));  // true
System.out.println(s1 == s2);       // May be false (compares references)
```

---

## Logical Operators

Combine boolean expressions.

### Logical Operators Table

| Operator | Name | Description | Example |
|----------|------|-------------|---------|
| `&&` / `and` | AND | True if both are true | `true && true` → `true` |
| `\|\|` / `or` | OR | True if at least one is true | `true \|\| false` → `true` |
| `!` / `not` | NOT | Inverts boolean value | `!true` → `false` |

### Truth Tables

**AND (`&&` / `and`):**
| A | B | A AND B |
|---|---|---------|
| T | T | **T** |
| T | F | F |
| F | T | F |
| F | F | F |

**OR (`||` / `or`):**
| A | B | A OR B |
|---|---|--------|
| T | T | **T** |
| T | F | **T** |
| F | T | **T** |
| F | F | F |

**NOT (`!` / `not`):**
| A | NOT A |
|---|-------|
| T | F |
| F | T |

### Python Examples

```python
a = True
b = False

# AND
print(a and b)       # False
print(True and True) # True

# OR
print(a or b)        # True
print(False or False) # False

# NOT
print(not a)         # False
print(not b)         # True

# Combining operators
x = 5
result = (x > 0) and (x < 10)
print(result)        # True

# Short-circuit evaluation
# If first condition is False in AND, second is not evaluated
def check():
    print("Checking...")
    return True

result = False and check()  # "Checking..." is NOT printed
print(result)  # False
```

### C++ Examples

```cpp
bool a = true;
bool b = false;

// AND
cout << (a && b) << endl;        // 0 (false)
cout << (true && true) << endl;  // 1 (true)

// OR
cout << (a || b) << endl;        // 1 (true)
cout << (false || false) << endl; // 0 (false)

// NOT
cout << !a << endl;              // 0 (false)
cout << !b << endl;              // 1 (true)

// Combining
int x = 5;
bool result = (x > 0) && (x < 10);
cout << boolalpha << result << endl;  // true
```

### Java Examples

```java
boolean a = true;
boolean b = false;

// AND
System.out.println(a && b);        // false
System.out.println(true && true);  // true

// OR
System.out.println(a || b);        // true
System.out.println(false || false); // false

// NOT
System.out.println(!a);            // false
System.out.println(!b);            // true

// Combining
int x = 5;
boolean result = (x > 0) && (x < 10);
System.out.println(result);        // true
```

### Short-Circuit Evaluation

```python
# Python
def expensive_check():
    print("Expensive operation executed")
    return True

# AND: If first is False, second is not evaluated
result = False and expensive_check()  # Doesn't print
print(result)  # False

# OR: If first is True, second is not evaluated
result = True or expensive_check()  # Doesn't print
print(result)  # True
```

---

## Assignment Operators

Assign values to variables.

### Assignment Operators Table

| Operator | Example | Equivalent | Description |
|----------|---------|------------|-------------|
| `=` | `x = 5` | - | Simple assignment |
| `+=` | `x += 3` | `x = x + 3` | Add and assign |
| `-=` | `x -= 3` | `x = x - 3` | Subtract and assign |
| `*=` | `x *= 3` | `x = x * 3` | Multiply and assign |
| `/=` | `x /= 3` | `x = x / 3` | Divide and assign |
| `%=` | `x %= 3` | `x = x % 3` | Modulo and assign |
| `**=` | `x **= 3` | `x = x ** 3` | Power and assign (Python) |
| `//=` | `x //= 3` | `x = x // 3` | Floor divide and assign (Python) |

### Examples

**Python:**
```python
x = 10
print(x)  # 10

x += 5    # x = x + 5
print(x)  # 15

x -= 3    # x = x - 3
print(x)  # 12

x *= 2    # x = x * 2
print(x)  # 24

x /= 4    # x = x / 4
print(x)  # 6.0

x %= 4    # x = x % 4
print(x)  # 2.0

x **= 3   # x = x ** 3
print(x)  # 8.0
```

**C++:**
```cpp
int x = 10;
cout << x << endl;  // 10

x += 5;  // x = x + 5
cout << x << endl;  // 15

x -= 3;  // x = x - 3
cout << x << endl;  // 12

x *= 2;  // x = x * 2
cout << x << endl;  // 24

x /= 4;  // x = x / 4
cout << x << endl;  // 6

x %= 4;  // x = x % 4
cout << x << endl;  // 2
```

**Java:**
```java
int x = 10;
System.out.println(x);  // 10

x += 5;  // x = x + 5
System.out.println(x);  // 15

x -= 3;  // x = x - 3
System.out.println(x);  // 12

x *= 2;  // x = x * 2
System.out.println(x);  // 24

x /= 4;  // x = x / 4
System.out.println(x);  // 6

x %= 4;  // x = x % 4
System.out.println(x);  // 2
```

---

## Bitwise Operators

Operate on individual bits of integers.

### Bitwise Operators Table

| Operator | Name | Example | Description |
|----------|------|---------|-------------|
| `&` | AND | `5 & 3` | Bitwise AND |
| `\|` | OR | `5 \| 3` | Bitwise OR |
| `^` | XOR | `5 ^ 3` | Bitwise XOR |
| `~` | NOT | `~5` | Bitwise NOT (complement) |
| `<<` | Left Shift | `5 << 1` | Shift bits left |
| `>>` | Right Shift | `5 >> 1` | Shift bits right |

### How Bitwise Works

```
5 in binary:  0101
3 in binary:  0011

AND (&):      0101 & 0011 = 0001 = 1
OR (|):       0101 | 0011 = 0111 = 7
XOR (^):      0101 ^ 0011 = 0110 = 6
NOT (~):      ~0101 = 1010 (in 4-bit representation)

Left Shift:   0101 << 1 = 1010 = 10 (multiply by 2)
Right Shift:  0101 >> 1 = 0010 = 2 (divide by 2)
```

### Examples

**Python:**
```python
a = 5   # 0101
b = 3   # 0011

print(a & b)   # 1  (0001)
print(a | b)   # 7  (0111)
print(a ^ b)   # 6  (0110)
print(~a)      # -6 (two's complement)
print(a << 1)  # 10 (1010) - multiply by 2
print(a >> 1)  # 2  (0010) - divide by 2

# Practical use: multiply/divide by powers of 2
print(5 << 2)  # 20 (5 * 4)
print(20 >> 2) # 5  (20 / 4)
```

**C++:**
```cpp
int a = 5;  // 0101
int b = 3;  // 0011

cout << (a & b) << endl;   // 1
cout << (a | b) << endl;   // 7
cout << (a ^ b) << endl;   // 6
cout << (~a) << endl;      // -6
cout << (a << 1) << endl;  // 10
cout << (a >> 1) << endl;  // 2
```

**Java:**
```java
int a = 5;  // 0101
int b = 3;  // 0011

System.out.println(a & b);   // 1
System.out.println(a | b);   // 7
System.out.println(a ^ b);   // 6
System.out.println(~a);      // -6
System.out.println(a << 1);  // 10
System.out.println(a >> 1);  // 2
```

### Common Bitwise Tricks

```python
# Check if number is even
def is_even(n):
    return (n & 1) == 0

# Check if number is odd
def is_odd(n):
    return (n & 1) == 1

# Multiply by 2^n
def multiply_by_power_of_2(x, n):
    return x << n

# Divide by 2^n
def divide_by_power_of_2(x, n):
    return x >> n

# Swap two numbers without temp variable
a, b = 5, 10
a = a ^ b
b = a ^ b
a = a ^ b
print(a, b)  # 10, 5
```

---

## Operator Precedence

### Precedence Table (Highest to Lowest)

| Level | Operators | Description |
|-------|-----------|-------------|
| 1 | `()` | Parentheses |
| 2 | `**` | Exponentiation (Python) |
| 3 | `~`, `!`, `-`, `+` | Unary operators |
| 4 | `*`, `/`, `%`, `//` | Multiplication, Division |
| 5 | `+`, `-` | Addition, Subtraction |
| 6 | `<<`, `>>` | Bitwise shift |
| 7 | `&` | Bitwise AND |
| 8 | `^` | Bitwise XOR |
| 9 | `\|` | Bitwise OR |
| 10 | `<`, `<=`, `>`, `>=` | Comparison |
| 11 | `==`, `!=` | Equality |
| 12 | `&&`, `and` | Logical AND |
| 13 | `\|\|`, `or` | Logical OR |
| 14 | `=`, `+=`, `-=`, etc. | Assignment |

### Examples

```python
# Example 1: Arithmetic precedence
result = 5 + 3 * 2
print(result)  # 11 (not 16, because * before +)

# With parentheses
result = (5 + 3) * 2
print(result)  # 16

# Example 2: Comparison and logical
x = 5
result = x > 3 and x < 10
print(result)  # True

# Example 3: Multiple operators
result = 2 + 3 * 4 ** 2
print(result)  # 50 (** first, then *, then +)

# Step by step:
# 4 ** 2 = 16
# 3 * 16 = 48
# 2 + 48 = 50
```

---

## Practice Examples

### Example 1: Even or Odd

**Python:**
```python
num = int(input("Enter a number: "))
if num % 2 == 0:
    print(f"{num} is even")
else:
    print(f"{num} is odd")
```

**C++:**
```cpp
int num;
cout << "Enter a number: ";
cin >> num;
if (num % 2 == 0) {
    cout << num << " is even" << endl;
} else {
    cout << num << " is odd" << endl;
}
```

### Example 2: Leap Year Check

```python
year = int(input("Enter a year: "))
is_leap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)
print(f"{year} is {'a leap year' if is_leap else 'not a leap year'}")
```

### Example 3: Power of Two Check

```python
def is_power_of_two(n):
    # A power of 2 has only one bit set
    # e.g., 8 = 1000, 8-1 = 0111, 1000 & 0111 = 0
    return n > 0 and (n & (n - 1)) == 0

print(is_power_of_two(8))   # True
print(is_power_of_two(10))  # False
```

---

## ✅ Checklist

Before moving on, ensure you can:

- [ ] Perform arithmetic operations in all three languages
- [ ] Use comparison operators correctly
- [ ] Combine conditions with logical operators
- [ ] Apply compound assignment operators
- [ ] Understand basic bitwise operations
- [ ] Use parentheses to control precedence
- [ ] Explain the difference between `==` and `=`

---

## 🚀 Next Steps

Ready for control flow? Continue to [03-Control-Flow.md](./03-Control-Flow.md)

---

[← Back: Variables](./01-Variables-and-Data-Types.md) | [Next: Control Flow →](./03-Control-Flow.md)
