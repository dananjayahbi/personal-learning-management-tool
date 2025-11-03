# 04. Functions and Scope

## 🎯 Learning Objectives

By the end of this lesson, you will:
- Define and call functions in Python, C++, and Java
- Understand parameters and return values
- Master variable scope (local vs global)
- Use default parameters and variable arguments
- Apply best practices for function design

**Duration:** 5-6 hours  
**Difficulty:** ⭐⭐ Medium

---

## 📚 Table of Contents

1. [What are Functions?](#what-are-functions)
2. [Function Syntax](#function-syntax)
3. [Parameters and Arguments](#parameters-and-arguments)
4. [Return Values](#return-values)
5. [Variable Scope](#variable-scope)
6. [Default and Optional Parameters](#default-and-optional-parameters)
7. [Lambda Functions](#lambda-functions)
8. [Best Practices](#best-practices)

---

## What are Functions?

A **function** is a reusable block of code that performs a specific task.

### Benefits:
- **Code Reuse**: Write once, use many times
- **Modularity**: Break complex problems into smaller parts
- **Maintainability**: Easier to fix and update
- **Testing**: Test individual components
- **Readability**: Self-documenting code

```
Function = Name + Parameters + Body + Return Value
```

---

## Function Syntax

### Python

```python
# Basic function
def greet():
    print("Hello, World!")

# Call the function
greet()  # Output: Hello, World!

# Function with parameters
def greet_user(name):
    print(f"Hello, {name}!")

greet_user("Alice")  # Output: Hello, Alice!

# Function with return value
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # Output: 8

# Multiple return values
def get_min_max(numbers):
    return min(numbers), max(numbers)

minimum, maximum = get_min_max([1, 5, 3, 9, 2])
print(f"Min: {minimum}, Max: {maximum}")  # Min: 1, Max: 9
```

### C++

```cpp
#include <iostream>
using namespace std;

// Function declaration (prototype)
void greet();
void greetUser(string name);
int add(int a, int b);

// Function definitions
void greet() {
    cout << "Hello, World!" << endl;
}

void greetUser(string name) {
    cout << "Hello, " << name << "!" << endl;
}

int add(int a, int b) {
    return a + b;
}

int main() {
    greet();  // Output: Hello, World!
    greetUser("Alice");  // Output: Hello, Alice!
    
    int result = add(5, 3);
    cout << result << endl;  // Output: 8
    
    return 0;
}

// Multiple return values (using pair or struct)
#include <utility>
pair<int, int> getMinMax(int arr[], int size) {
    int minVal = arr[0], maxVal = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] < minVal) minVal = arr[i];
        if (arr[i] > maxVal) maxVal = arr[i];
    }
    return make_pair(minVal, maxVal);
}
```

### Java

```java
public class Functions {
    // Method definition
    public static void greet() {
        System.out.println("Hello, World!");
    }
    
    public static void greetUser(String name) {
        System.out.println("Hello, " + name + "!");
    }
    
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static void main(String[] args) {
        greet();  // Output: Hello, World!
        greetUser("Alice");  // Output: Hello, Alice!
        
        int result = add(5, 3);
        System.out.println(result);  // Output: 8
    }
}

// Multiple return values (using array or custom class)
public static int[] getMinMax(int[] numbers) {
    int min = numbers[0], max = numbers[0];
    for (int num : numbers) {
        if (num < min) min = num;
        if (num > max) max = num;
    }
    return new int[]{min, max};
}
```

---

## Parameters and Arguments

### Positional Parameters

**Python:**
```python
def introduce(name, age, city):
    print(f"{name} is {age} years old and lives in {city}")

introduce("Alice", 25, "New York")
# Output: Alice is 25 years old and lives in New York
```

**C++:**
```cpp
void introduce(string name, int age, string city) {
    cout << name << " is " << age << " years old and lives in " 
         << city << endl;
}

introduce("Alice", 25, "New York");
```

**Java:**
```java
public static void introduce(String name, int age, String city) {
    System.out.println(name + " is " + age + " years old and lives in " + city);
}

introduce("Alice", 25, "New York");
```

### Pass by Value vs Pass by Reference

**Python:**
```python
# Immutable types (int, str, tuple) - pass by value
def modify_number(x):
    x = x + 10
    print(f"Inside function: {x}")

num = 5
modify_number(num)  # Inside function: 15
print(f"Outside function: {num}")  # Outside function: 5

# Mutable types (list, dict) - pass by reference
def modify_list(lst):
    lst.append(4)
    print(f"Inside function: {lst}")

my_list = [1, 2, 3]
modify_list(my_list)  # Inside function: [1, 2, 3, 4]
print(f"Outside function: {my_list}")  # Outside function: [1, 2, 3, 4]
```

**C++:**
```cpp
// Pass by value
void modifyValue(int x) {
    x = x + 10;
    cout << "Inside function: " << x << endl;
}

int num = 5;
modifyValue(num);  // Inside function: 15
cout << "Outside function: " << num << endl;  // Outside function: 5

// Pass by reference
void modifyReference(int& x) {
    x = x + 10;
    cout << "Inside function: " << x << endl;
}

int num2 = 5;
modifyReference(num2);  // Inside function: 15
cout << "Outside function: " << num2 << endl;  // Outside function: 15

// Pass by pointer
void modifyPointer(int* x) {
    *x = *x + 10;
    cout << "Inside function: " << *x << endl;
}

int num3 = 5;
modifyPointer(&num3);  // Inside function: 15
cout << "Outside function: " << num3 << endl;  // Outside function: 15
```

**Java:**
```java
// Primitives: pass by value
public static void modifyValue(int x) {
    x = x + 10;
    System.out.println("Inside method: " + x);
}

int num = 5;
modifyValue(num);  // Inside method: 15
System.out.println("Outside method: " + num);  // Outside method: 5

// Objects: pass by reference value
public static void modifyArray(int[] arr) {
    arr[0] = 100;
    System.out.println("Inside method: " + arr[0]);
}

int[] myArray = {1, 2, 3};
modifyArray(myArray);  // Inside method: 100
System.out.println("Outside method: " + myArray[0]);  // Outside method: 100
```

---

## Return Values

### Single Return Value

**Python:**
```python
def square(x):
    return x * x

result = square(5)
print(result)  # 25

# Early return
def is_even(n):
    if n % 2 == 0:
        return True
    return False

# Simplified
def is_even_v2(n):
    return n % 2 == 0
```

**C++:**
```cpp
int square(int x) {
    return x * x;
}

int result = square(5);
cout << result << endl;  // 25

bool isEven(int n) {
    return n % 2 == 0;
}
```

**Java:**
```java
public static int square(int x) {
    return x * x;
}

int result = square(5);
System.out.println(result);  // 25

public static boolean isEven(int n) {
    return n % 2 == 0;
}
```

### Multiple Return Values

**Python:**
```python
def divide(a, b):
    quotient = a // b
    remainder = a % b
    return quotient, remainder

q, r = divide(17, 5)
print(f"Quotient: {q}, Remainder: {r}")  # Quotient: 3, Remainder: 2

# Return as tuple
result = divide(17, 5)
print(result)  # (3, 2)
```

**C++:**
```cpp
#include <tuple>

tuple<int, int> divide(int a, int b) {
    return make_tuple(a / b, a % b);
}

auto [q, r] = divide(17, 5);  // C++17 structured bindings
cout << "Quotient: " << q << ", Remainder: " << r << endl;

// Or using pair
pair<int, int> divide_v2(int a, int b) {
    return {a / b, a % b};
}
```

**Java:**
```java
public static int[] divide(int a, int b) {
    return new int[]{a / b, a % b};
}

int[] result = divide(17, 5);
System.out.println("Quotient: " + result[0] + ", Remainder: " + result[1]);

// Or create a custom class
class DivisionResult {
    int quotient;
    int remainder;
    DivisionResult(int q, int r) {
        this.quotient = q;
        this.remainder = r;
    }
}
```

### Void Functions (No Return)

**Python:**
```python
def print_greeting(name):
    print(f"Hello, {name}!")
    # No return statement (implicitly returns None)

result = print_greeting("Alice")
print(result)  # None
```

**C++:**
```cpp
void printGreeting(string name) {
    cout << "Hello, " << name << "!" << endl;
    // No return statement
}

printGreeting("Alice");
```

**Java:**
```java
public static void printGreeting(String name) {
    System.out.println("Hello, " + name + "!");
    // No return statement
}

printGreeting("Alice");
```

---

## Variable Scope

### Local vs Global Scope

**Python:**
```python
# Global variable
global_var = 100

def my_function():
    # Local variable
    local_var = 50
    print(f"Local: {local_var}")
    print(f"Global: {global_var}")

my_function()
# print(local_var)  # Error: local_var not defined

# Modifying global variable
count = 0

def increment():
    global count  # Must declare as global to modify
    count += 1

increment()
print(count)  # 1
```

**C++:**
```cpp
// Global variable
int globalVar = 100;

void myFunction() {
    // Local variable
    int localVar = 50;
    cout << "Local: " << localVar << endl;
    cout << "Global: " << globalVar << endl;
}

// Modifying global variable
int count = 0;

void increment() {
    count++;  // Can modify global directly
}

int main() {
    myFunction();
    increment();
    cout << count << endl;  // 1
    return 0;
}
```

**Java:**
```java
public class Scope {
    // Class-level variable (similar to global)
    static int globalVar = 100;
    
    public static void myMethod() {
        // Local variable
        int localVar = 50;
        System.out.println("Local: " + localVar);
        System.out.println("Global: " + globalVar);
    }
    
    static int count = 0;
    
    public static void increment() {
        count++;  // Can modify class variable directly
    }
    
    public static void main(String[] args) {
        myMethod();
        increment();
        System.out.println(count);  // 1
    }
}
```

### Shadowing

**Python:**
```python
x = 10  # Global

def func():
    x = 20  # Local, shadows global
    print(f"Inside function: {x}")  # 20

func()
print(f"Outside function: {x}")  # 10
```

**C++:**
```cpp
int x = 10;  // Global

void func() {
    int x = 20;  // Local, shadows global
    cout << "Inside function: " << x << endl;  // 20
    
    // Access global using ::
    cout << "Global x: " << ::x << endl;  // 10
}

func();
cout << "Outside function: " << x << endl;  // 10
```

---

## Default and Optional Parameters

### Default Parameters

**Python:**
```python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")  # Hello, Alice!
greet("Bob", "Hi")  # Hi, Bob!

# Multiple default parameters
def create_user(name, age=18, country="USA"):
    print(f"{name}, {age}, {country}")

create_user("Alice")  # Alice, 18, USA
create_user("Bob", 25)  # Bob, 25, USA
create_user("Charlie", 30, "UK")  # Charlie, 30, UK

# Named arguments
create_user("David", country="Canada")  # David, 18, Canada
```

**C++:**
```cpp
void greet(string name, string greeting = "Hello") {
    cout << greeting << ", " << name << "!" << endl;
}

greet("Alice");  // Hello, Alice!
greet("Bob", "Hi");  // Hi, Bob!

// Default parameters must be at the end
void createUser(string name, int age = 18, string country = "USA") {
    cout << name << ", " << age << ", " << country << endl;
}

createUser("Alice");  // Alice, 18, USA
createUser("Bob", 25);  // Bob, 25, USA
createUser("Charlie", 30, "UK");  // Charlie, 30, UK
```

**Java:**
```java
// Java doesn't support default parameters directly
// Use method overloading instead

public static void greet(String name) {
    greet(name, "Hello");
}

public static void greet(String name, String greeting) {
    System.out.println(greeting + ", " + name + "!");
}

greet("Alice");  // Hello, Alice!
greet("Bob", "Hi");  // Hi, Bob!
```

### Variable Arguments

**Python:**
```python
# *args for variable positional arguments
def sum_all(*numbers):
    total = 0
    for num in numbers:
        total += num
    return total

print(sum_all(1, 2, 3))  # 6
print(sum_all(1, 2, 3, 4, 5))  # 15

# **kwargs for variable keyword arguments
def print_info(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="NYC")
# name: Alice
# age: 25
# city: NYC
```

**C++:**
```cpp
// C++ uses templates or initializer_list for variable arguments
#include <initializer_list>

int sumAll(initializer_list<int> numbers) {
    int total = 0;
    for (int num : numbers) {
        total += num;
    }
    return total;
}

cout << sumAll({1, 2, 3}) << endl;  // 6
cout << sumAll({1, 2, 3, 4, 5}) << endl;  // 15
```

**Java:**
```java
// Varargs (variable arguments)
public static int sumAll(int... numbers) {
    int total = 0;
    for (int num : numbers) {
        total += num;
    }
    return total;
}

System.out.println(sumAll(1, 2, 3));  // 6
System.out.println(sumAll(1, 2, 3, 4, 5));  // 15
```

---

## Lambda Functions

### Python Lambda

```python
# Regular function
def square(x):
    return x * x

# Lambda (anonymous function)
square_lambda = lambda x: x * x

print(square(5))  # 25
print(square_lambda(5))  # 25

# Common use: with map, filter, sorted
numbers = [1, 2, 3, 4, 5]

# Map
squared = list(map(lambda x: x * x, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# Filter
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4]

# Sorted
students = [("Alice", 85), ("Bob", 75), ("Charlie", 90)]
sorted_students = sorted(students, key=lambda x: x[1])
print(sorted_students)  # [('Bob', 75), ('Alice', 85), ('Charlie', 90)]
```

### C++ Lambda (C++11+)

```cpp
// Lambda syntax: [capture](parameters) -> return_type { body }
auto square = [](int x) { return x * x; };
cout << square(5) << endl;  // 25

// With capture
int factor = 10;
auto multiply = [factor](int x) { return x * factor; };
cout << multiply(5) << endl;  // 50

// Used with algorithms
vector<int> numbers = {1, 2, 3, 4, 5};

// Transform (map)
vector<int> squared(numbers.size());
transform(numbers.begin(), numbers.end(), squared.begin(),
          [](int x) { return x * x; });

// Filter (copy_if)
vector<int> evens;
copy_if(numbers.begin(), numbers.end(), back_inserter(evens),
        [](int x) { return x % 2 == 0; });
```

### Java Lambda (Java 8+)

```java
// Functional interface required
Function<Integer, Integer> square = x -> x * x;
System.out.println(square.apply(5));  // 25

// With streams
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

// Map
List<Integer> squared = numbers.stream()
    .map(x -> x * x)
    .collect(Collectors.toList());
System.out.println(squared);  // [1, 4, 9, 16, 25]

// Filter
List<Integer> evens = numbers.stream()
    .filter(x -> x % 2 == 0)
    .collect(Collectors.toList());
System.out.println(evens);  // [2, 4]
```

---

## Best Practices

### 1. Function Naming

```python
# Good names (verb + noun)
def calculate_total(prices):
    return sum(prices)

def is_valid_email(email):
    return '@' in email

def get_user_name(user_id):
    # ...
    pass

# Bad names
def func1(x):  # Too vague
    return sum(x)

def data(e):  # Unclear
    return '@' in e
```

### 2. Single Responsibility

```python
# Good: Each function does one thing
def read_file(filename):
    with open(filename) as f:
        return f.read()

def parse_data(content):
    return content.split('\n')

def process_lines(lines):
    return [line.strip() for line in lines]

# Bad: Function doing too much
def do_everything(filename):
    with open(filename) as f:
        content = f.read()
    lines = content.split('\n')
    return [line.strip() for line in lines]
```

### 3. Function Size

```python
# Keep functions small (< 20-30 lines ideally)
# If longer, consider breaking into smaller functions

# Good
def validate_and_save_user(user_data):
    if not validate_user(user_data):
        return False
    return save_to_database(user_data)

def validate_user(user_data):
    # Validation logic
    pass

def save_to_database(user_data):
    # Database logic
    pass
```

### 4. Documentation

```python
def calculate_distance(x1, y1, x2, y2):
    """
    Calculate Euclidean distance between two points.
    
    Args:
        x1, y1: Coordinates of first point
        x2, y2: Coordinates of second point
    
    Returns:
        float: Distance between the points
    
    Example:
        >>> calculate_distance(0, 0, 3, 4)
        5.0
    """
    return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5
```

---

## ✅ Checklist

- [ ] Define and call functions in all three languages
- [ ] Use parameters and return values correctly
- [ ] Understand local vs global scope
- [ ] Apply default parameters appropriately
- [ ] Use lambda functions when suitable
- [ ] Follow function naming conventions
- [ ] Keep functions focused and small

---

## 🚀 Next Steps

Continue to [05-Recursion-Basics.md](./05-Recursion-Basics.md)

---

[← Back: Control Flow](./03-Control-Flow.md) | [Next: Recursion →](./05-Recursion-Basics.md)
