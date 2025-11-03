# 01. Variables and Data Types

## 🎯 Learning Objectives

By the end of this lesson, you will be able to:
- Understand what variables are and why they're important
- Declare and initialize variables in Python, C++, and Java
- Identify and use different data types
- Convert between data types (type casting)
- Understand variable naming conventions
- Recognize the scope and lifetime of variables

**Duration:** 4-6 hours  
**Difficulty:** ⭐ Easy

---

## 📚 Table of Contents

1. [What are Variables?](#what-are-variables)
2. [Primitive Data Types](#primitive-data-types)
3. [Variable Declaration and Initialization](#variable-declaration-and-initialization)
4. [Type Casting and Conversion](#type-casting-and-conversion)
5. [Naming Conventions](#naming-conventions)
6. [Constants](#constants)
7. [Memory and Variables](#memory-and-variables)
8. [Practice Examples](#practice-examples)

---

## What are Variables?

### Concept
A **variable** is a named storage location in memory that holds a value. Think of it as a labeled box where you can store data that you want to use and modify in your program.

```
Variable = Name + Data Type + Value + Memory Address

Example:
Name: age
Data Type: integer
Value: 25
Memory Address: 0x7ffe5367e044
```

### Why Variables Matter in DSA
- **Data Storage:** Hold input values, intermediate results, and output
- **Algorithm Implementation:** Track state, counters, pointers
- **Memory Management:** Understanding how data is stored
- **Performance:** Different types have different memory requirements

---

## Primitive Data Types

### Overview Table

| Type | Python | C++ | Java | Size | Range/Precision |
|------|--------|-----|------|------|-----------------|
| **Integer** | `int` | `int` | `int` | 4 bytes | -2³¹ to 2³¹-1 |
| **Long Integer** | `int` | `long long` | `long` | 8 bytes | -2⁶³ to 2⁶³-1 |
| **Float** | `float` | `float` | `float` | 4 bytes | ~7 decimal digits |
| **Double** | `float` | `double` | `double` | 8 bytes | ~15 decimal digits |
| **Character** | `str` | `char` | `char` | 1 byte | Single character |
| **Boolean** | `bool` | `bool` | `boolean` | 1 byte | True/False |
| **String** | `str` | `string` | `String` | Variable | Sequence of chars |

---

## Variable Declaration and Initialization

### Python

Python is **dynamically typed** - you don't need to specify the data type explicitly.

```python
# Integer
age = 25
count = 0

# Float
price = 19.99
pi = 3.14159

# String
name = "Alice"
message = 'Hello, World!'

# Boolean
is_student = True
is_valid = False

# Multiple assignment
x, y, z = 10, 20, 30

# Same value to multiple variables
a = b = c = 100

# Type checking
print(type(age))        # <class 'int'>
print(type(price))      # <class 'float'>
print(type(name))       # <class 'str'>
print(type(is_student)) # <class 'bool'>
```

### C++

C++ is **statically typed** - you must specify the data type.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Integer
    int age = 25;
    int count = 0;
    
    // Long integer for larger values
    long long big_number = 1000000000000LL;
    
    // Float and Double
    float price = 19.99f;
    double pi = 3.14159265359;
    
    // Character
    char grade = 'A';
    char initial = 'J';
    
    // Boolean
    bool is_student = true;
    bool is_valid = false;
    
    // String (requires #include <string>)
    string name = "Alice";
    string message = "Hello, World!";
    
    // Declaration without initialization
    int value;        // Contains garbage value
    value = 42;       // Now initialized
    
    // Constant
    const int MAX_SIZE = 100;
    
    cout << "Age: " << age << endl;
    cout << "Name: " << name << endl;
    
    return 0;
}
```

### Java

Java is also **statically typed**.

```java
public class Variables {
    public static void main(String[] args) {
        // Integer
        int age = 25;
        int count = 0;
        
        // Long integer
        long bigNumber = 1000000000000L;
        
        // Float and Double
        float price = 19.99f;
        double pi = 3.14159265359;
        
        // Character
        char grade = 'A';
        char initial = 'J';
        
        // Boolean
        boolean isStudent = true;
        boolean isValid = false;
        
        // String (class, not primitive)
        String name = "Alice";
        String message = "Hello, World!";
        
        // Declaration without initialization
        int value;
        value = 42;
        
        // Constant (final keyword)
        final int MAX_SIZE = 100;
        
        System.out.println("Age: " + age);
        System.out.println("Name: " + name);
    }
}
```

---

## Type Casting and Conversion

### Implicit Casting (Automatic)
Happens when there's no data loss (widening conversion).

**Python:**
```python
# Python handles this automatically
x = 10          # int
y = 3.14        # float
z = x + y       # Automatically converts to float
print(z)        # 13.14
print(type(z))  # <class 'float'>
```

**C++:**
```cpp
int x = 10;
float y = 3.14f;
float z = x + y;  // x is implicitly cast to float
cout << z << endl;  // 13.14
```

**Java:**
```java
int x = 10;
float y = 3.14f;
float z = x + y;  // x is implicitly cast to float
System.out.println(z);  // 13.14
```

### Explicit Casting (Manual)
Required when there's potential data loss (narrowing conversion).

**Python:**
```python
# Float to int (truncates decimal part)
pi = 3.14159
x = int(pi)
print(x)  # 3

# String to int
age_str = "25"
age = int(age_str)
print(age)  # 25

# Int to string
num = 100
text = str(num)
print(text)  # "100"

# String to float
price_str = "19.99"
price = float(price_str)
print(price)  # 19.99
```

**C++:**
```cpp
// Float to int
double pi = 3.14159;
int x = (int)pi;  // Old C-style cast
// or
int y = static_cast<int>(pi);  // Modern C++ cast
cout << x << endl;  // 3

// String to int (requires conversion)
#include <string>
string age_str = "25";
int age = stoi(age_str);  // String to integer
cout << age << endl;  // 25

// Int to string
int num = 100;
string text = to_string(num);
cout << text << endl;  // "100"
```

**Java:**
```java
// Float to int
double pi = 3.14159;
int x = (int)pi;
System.out.println(x);  // 3

// String to int
String ageStr = "25";
int age = Integer.parseInt(ageStr);
System.out.println(age);  // 25

// Int to string
int num = 100;
String text = String.valueOf(num);
// or
String text2 = Integer.toString(num);
System.out.println(text);  // "100"
```

### Type Casting Hierarchy

```
byte → short → int → long → float → double
  ↑                                     ↑
  └──────── Can cast left ←────────────┘
           (may lose precision)
```

**Important Notes:**
- **Widening:** `int` to `double` is safe (no data loss)
- **Narrowing:** `double` to `int` loses decimal part (requires explicit cast)
- **Overflow:** Casting a large value to a smaller type can cause overflow

---

## Naming Conventions

### Rules (All Languages)
1. Must start with a letter or underscore (`_`)
2. Can contain letters, digits, and underscores
3. Cannot use reserved keywords
4. Case-sensitive (`age` ≠ `Age` ≠ `AGE`)

### Python Conventions (PEP 8)
```python
# Variables and functions: snake_case
user_name = "Alice"
total_count = 100
def calculate_sum():
    pass

# Constants: UPPER_SNAKE_CASE
MAX_SIZE = 1000
PI_VALUE = 3.14159

# Classes: PascalCase (not relevant here)
class StudentRecord:
    pass
```

### C++ Conventions
```cpp
// Variables: camelCase or snake_case
int userName;  // camelCase
int user_name; // snake_case (Google Style)

// Constants: UPPER_SNAKE_CASE or kConstant
const int MAX_SIZE = 1000;
const int kMaxSize = 1000;  // Google Style

// Functions: camelCase or PascalCase
void calculateSum();
void CalculateSum();
```

### Java Conventions
```java
// Variables: camelCase
int userName;
int totalCount;

// Constants: UPPER_SNAKE_CASE
final int MAX_SIZE = 1000;
final double PI_VALUE = 3.14159;

// Classes: PascalCase
class StudentRecord { }

// Methods: camelCase
public void calculateSum() { }
```

### Best Practices
✅ **Good Names:**
- `age`, `count`, `total_score`
- `is_valid`, `has_permission`
- `max_value`, `min_value`
- `user_name`, `first_name`

❌ **Bad Names:**
- `a`, `b`, `x`, `temp` (too generic)
- `userNameForTheCurrentlyLoggedInUser` (too long)
- `usr_nm` (unclear abbreviation)
- `data`, `value`, `result` (too vague)

---

## Constants

### Why Use Constants?
- **Readability:** `MAX_ATTEMPTS` is clearer than `5`
- **Maintainability:** Change value in one place
- **Safety:** Prevents accidental modification
- **Performance:** Compiler can optimize

### Python
```python
# Convention: use UPPER_SNAKE_CASE
# Note: Python doesn't have true constants, just convention
MAX_SIZE = 100
PI = 3.14159
MAX_ATTEMPTS = 3

# Usage
if attempts >= MAX_ATTEMPTS:
    print("Too many attempts")
```

### C++
```cpp
// Use const keyword
const int MAX_SIZE = 100;
const double PI = 3.14159;
const char NEWLINE = '\n';

// Or #define (not recommended in modern C++)
#define MAX_SIZE 100

// constexpr (compile-time constant, C++11+)
constexpr int MAX_ATTEMPTS = 3;
```

### Java
```java
// Use final keyword
final int MAX_SIZE = 100;
final double PI = 3.14159;
final char NEWLINE = '\n';

// Class-level constant
public class Config {
    public static final int MAX_ATTEMPTS = 3;
    public static final String APP_NAME = "MyApp";
}
```

---

## Memory and Variables

### Stack vs Heap

**Stack Memory:**
- Fast access
- Limited size
- Automatic cleanup
- Stores: primitive types, local variables, function calls

**Heap Memory:**
- Slower access
- Large size
- Manual management (or garbage collection)
- Stores: dynamic objects, arrays (in some cases)

### Memory Layout Example (C++)

```cpp
int main() {
    int x = 10;           // Stack: 4 bytes
    double y = 3.14;      // Stack: 8 bytes
    char c = 'A';         // Stack: 1 byte
    
    int* ptr = new int;   // ptr on stack, allocated int on heap
    *ptr = 20;
    
    delete ptr;           // Free heap memory
    return 0;
}
```

### Size of Data Types

**Python:**
```python
import sys

x = 10
y = 10.5
s = "Hello"

print(sys.getsizeof(x))   # 28 bytes (includes overhead)
print(sys.getsizeof(y))   # 24 bytes
print(sys.getsizeof(s))   # 54 bytes
```

**C++:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "int: " << sizeof(int) << " bytes" << endl;        // 4
    cout << "long long: " << sizeof(long long) << " bytes" << endl; // 8
    cout << "float: " << sizeof(float) << " bytes" << endl;    // 4
    cout << "double: " << sizeof(double) << " bytes" << endl;  // 8
    cout << "char: " << sizeof(char) << " bytes" << endl;      // 1
    cout << "bool: " << sizeof(bool) << " bytes" << endl;      // 1
    return 0;
}
```

**Java:**
```java
// Java sizes are fixed across platforms
// int:     4 bytes
// long:    8 bytes
// float:   4 bytes
// double:  8 bytes
// char:    2 bytes (Unicode)
// boolean: 1 byte
```

---

## Practice Examples

### Example 1: Variable Swap

**Python:**
```python
# Method 1: Using temporary variable
a = 5
b = 10
temp = a
a = b
b = temp
print(f"a = {a}, b = {b}")  # a = 10, b = 5

# Method 2: Pythonic way
a, b = 5, 10
a, b = b, a
print(f"a = {a}, b = {b}")  # a = 10, b = 5
```

**C++:**
```cpp
// Using temporary variable
int a = 5, b = 10;
int temp = a;
a = b;
b = temp;
cout << "a = " << a << ", b = " << b << endl;  // a = 10, b = 5

// Using arithmetic (can overflow)
a = 5, b = 10;
a = a + b;  // a = 15
b = a - b;  // b = 5
a = a - b;  // a = 10

// Using XOR (works for integers)
a = 5, b = 10;
a = a ^ b;
b = a ^ b;
a = a ^ b;
```

**Java:**
```java
// Using temporary variable
int a = 5, b = 10;
int temp = a;
a = b;
b = temp;
System.out.println("a = " + a + ", b = " + b);  // a = 10, b = 5
```

### Example 2: Temperature Converter

**Python:**
```python
def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    return (fahrenheit - 32) * 5/9

# Usage
temp_c = 25.0
temp_f = celsius_to_fahrenheit(temp_c)
print(f"{temp_c}°C = {temp_f}°F")
```

**C++:**
```cpp
double celsiusToFahrenheit(double celsius) {
    return (celsius * 9.0/5.0) + 32.0;
}

double fahrenheitToCelsius(double fahrenheit) {
    return (fahrenheit - 32.0) * 5.0/9.0;
}

int main() {
    double tempC = 25.0;
    double tempF = celsiusToFahrenheit(tempC);
    cout << tempC << "°C = " << tempF << "°F" << endl;
    return 0;
}
```

**Java:**
```java
public static double celsiusToFahrenheit(double celsius) {
    return (celsius * 9.0/5.0) + 32.0;
}

public static double fahrenheitToCelsius(double fahrenheit) {
    return (fahrenheit - 32.0) * 5.0/9.0;
}

public static void main(String[] args) {
    double tempC = 25.0;
    double tempF = celsiusToFahrenheit(tempC);
    System.out.println(tempC + "°C = " + tempF + "°F");
}
```

### Example 3: Data Type Limits

**Python:**
```python
import sys

# Python integers have unlimited precision
big_num = 10 ** 100
print(big_num)

# Float limits
print(f"Max float: {sys.float_info.max}")
print(f"Min float: {sys.float_info.min}")
```

**C++:**
```cpp
#include <limits>
#include <iostream>
using namespace std;

int main() {
    cout << "int max: " << numeric_limits<int>::max() << endl;
    cout << "int min: " << numeric_limits<int>::min() << endl;
    cout << "long long max: " << numeric_limits<long long>::max() << endl;
    cout << "double max: " << numeric_limits<double>::max() << endl;
    return 0;
}
```

**Java:**
```java
public static void main(String[] args) {
    System.out.println("int max: " + Integer.MAX_VALUE);
    System.out.println("int min: " + Integer.MIN_VALUE);
    System.out.println("long max: " + Long.MAX_VALUE);
    System.out.println("double max: " + Double.MAX_VALUE);
}
```

---

## 🎯 Quick Quiz

Test your understanding:

1. What's the difference between `int` and `float`?
2. Why does `10 / 3` give `3` in C++ but `3.333...` in Python 3?
3. What happens when you cast `3.99` to `int`?
4. Can you name a variable `class` in Java? Why or why not?
5. What's the advantage of using constants?

<details>
<summary>Click for answers</summary>

1. `int` stores whole numbers, `float` stores decimal numbers
2. In C++, integer division truncates; Python 3 uses true division by default
3. It becomes `3` (truncates, doesn't round)
4. No, `class` is a reserved keyword in Java
5. Readability, maintainability, safety, compiler optimization
</details>

---

## ✅ Checklist

Before moving on, ensure you can:

- [ ] Declare variables in Python, C++, and Java
- [ ] Choose appropriate data types for different values
- [ ] Perform type casting when needed
- [ ] Follow naming conventions
- [ ] Understand the difference between variables and constants
- [ ] Explain what happens in memory when you declare a variable

---

## 🚀 Next Steps

Ready for operators? Continue to [02-Operators-and-Expressions.md](./02-Operators-and-Expressions.md)

---

[← Back to Chapter 1](./README.md) | [Next: Operators →](./02-Operators-and-Expressions.md)
