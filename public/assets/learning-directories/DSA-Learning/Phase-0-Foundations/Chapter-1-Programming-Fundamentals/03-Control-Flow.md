# 03. Control Flow Statements

## 🎯 Learning Objectives

By the end of this lesson, you will be able to:
- Use if/else statements for decision making
- Implement different types of loops (for, while)
- Apply break and continue statements
- Work with nested control structures
- Choose the right control structure for different scenarios

**Duration:** 5-7 hours  
**Difficulty:** ⭐⭐ Medium

---

## 📚 Table of Contents

1. [What is Control Flow?](#what-is-control-flow)
2. [Conditional Statements (if/else)](#conditional-statements)
3. [Switch/Match Statements](#switch-statements)
4. [For Loops](#for-loops)
5. [While Loops](#while-loops)
6. [Break and Continue](#break-and-continue)
7. [Nested Control Structures](#nested-control-structures)
8. [Practice Examples](#practice-examples)

---

## What is Control Flow?

**Control flow** determines the order in which statements are executed in a program.

```
Sequential Flow:
Statement 1
    ↓
Statement 2
    ↓
Statement 3

Conditional Flow:
Condition?
  ↙    ↘
True  False
  ↓      ↓
Action A Action B

Loop Flow:
Start → Condition? → True → Body → (repeat)
            ↓
          False
            ↓
           End
```

---

## Conditional Statements

### if Statement

**Python:**
```python
age = 18

if age >= 18:
    print("You are an adult")
    print("You can vote")

# Output: You are an adult
#         You can vote
```

**C++:**
```cpp
int age = 18;

if (age >= 18) {
    cout << "You are an adult" << endl;
    cout << "You can vote" << endl;
}
```

**Java:**
```java
int age = 18;

if (age >= 18) {
    System.out.println("You are an adult");
    System.out.println("You can vote");
}
```

### if-else Statement

**Python:**
```python
age = 15

if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")
    
# Output: You are a minor
```

**C++:**
```cpp
int age = 15;

if (age >= 18) {
    cout << "You are an adult" << endl;
} else {
    cout << "You are a minor" << endl;
}
```

**Java:**
```java
int age = 15;

if (age >= 18) {
    System.out.println("You are an adult");
} else {
    System.out.println("You are a minor");
}
```

### if-elif-else Statement (Multiple Conditions)

**Python:**
```python
score = 85

if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
elif score >= 60:
    grade = 'D'
else:
    grade = 'F'

print(f"Your grade is: {grade}")
# Output: Your grade is: B
```

**C++:**
```cpp
int score = 85;
char grade;

if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else if (score >= 70) {
    grade = 'C';
} else if (score >= 60) {
    grade = 'D';
} else {
    grade = 'F';
}

cout << "Your grade is: " << grade << endl;
```

**Java:**
```java
int score = 85;
char grade;

if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else if (score >= 70) {
    grade = 'C';
} else if (score >= 60) {
    grade = 'D';
} else {
    grade = 'F';
}

System.out.println("Your grade is: " + grade);
```

### Ternary Operator (Conditional Expression)

**Python:**
```python
age = 20
status = "adult" if age >= 18 else "minor"
print(status)  # Output: adult

# Can be nested (but avoid for readability)
score = 85
grade = 'A' if score >= 90 else 'B' if score >= 80 else 'C'
print(grade)  # Output: B
```

**C++:**
```cpp
int age = 20;
string status = (age >= 18) ? "adult" : "minor";
cout << status << endl;  // Output: adult

// Nested ternary
int score = 85;
char grade = (score >= 90) ? 'A' : (score >= 80) ? 'B' : 'C';
cout << grade << endl;  // Output: B
```

**Java:**
```java
int age = 20;
String status = (age >= 18) ? "adult" : "minor";
System.out.println(status);  // Output: adult

// Nested ternary
int score = 85;
char grade = (score >= 90) ? 'A' : (score >= 80) ? 'B' : 'C';
System.out.println(grade);  // Output: B
```

---

## Switch Statements

Alternative to multiple if-elif statements for comparing a single variable against multiple values.

### C++ Switch

```cpp
int day = 3;

switch (day) {
    case 1:
        cout << "Monday" << endl;
        break;
    case 2:
        cout << "Tuesday" << endl;
        break;
    case 3:
        cout << "Wednesday" << endl;
        break;
    case 4:
        cout << "Thursday" << endl;
        break;
    case 5:
        cout << "Friday" << endl;
        break;
    case 6:
    case 7:
        cout << "Weekend" << endl;
        break;
    default:
        cout << "Invalid day" << endl;
}
// Output: Wednesday
```

### Java Switch

```java
int day = 3;

switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday");
        break;
    case 4:
        System.out.println("Thursday");
        break;
    case 5:
        System.out.println("Friday");
        break;
    case 6:
    case 7:
        System.out.println("Weekend");
        break;
    default:
        System.out.println("Invalid day");
}

// Java 14+ enhanced switch
String dayName = switch (day) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3 -> "Wednesday";
    case 4 -> "Thursday";
    case 5 -> "Friday";
    case 6, 7 -> "Weekend";
    default -> "Invalid";
};
System.out.println(dayName);
```

### Python Match (3.10+)

```python
day = 3

match day:
    case 1:
        print("Monday")
    case 2:
        print("Tuesday")
    case 3:
        print("Wednesday")
    case 4:
        print("Thursday")
    case 5:
        print("Friday")
    case 6 | 7:
        print("Weekend")
    case _:
        print("Invalid day")
# Output: Wednesday

# Python before 3.10: use dictionary
day_names = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Weekend",
    7: "Weekend"
}
print(day_names.get(day, "Invalid day"))
```

---

## For Loops

Iterate over a sequence or repeat a fixed number of times.

### Python For Loop

```python
# Iterate over range
for i in range(5):
    print(i, end=" ")
# Output: 0 1 2 3 4

print()

# Iterate over range with start and end
for i in range(2, 7):
    print(i, end=" ")
# Output: 2 3 4 5 6

print()

# Iterate with step
for i in range(0, 10, 2):
    print(i, end=" ")
# Output: 0 2 4 6 8

print()

# Iterate over list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Enumerate for index and value
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
# Output: 0: apple
#         1: banana
#         2: cherry
```

### C++ For Loop

```cpp
// Traditional for loop
for (int i = 0; i < 5; i++) {
    cout << i << " ";
}
cout << endl;
// Output: 0 1 2 3 4

// Range-based for loop (C++11)
vector<string> fruits = {"apple", "banana", "cherry"};
for (const string& fruit : fruits) {
    cout << fruit << endl;
}

// Array iteration
int arr[] = {1, 2, 3, 4, 5};
for (int num : arr) {
    cout << num << " ";
}
cout << endl;
// Output: 1 2 3 4 5

// Multiple variables
for (int i = 0, j = 10; i < 5; i++, j--) {
    cout << i << " " << j << endl;
}
```

### Java For Loop

```java
// Traditional for loop
for (int i = 0; i < 5; i++) {
    System.out.print(i + " ");
}
System.out.println();
// Output: 0 1 2 3 4

// Enhanced for loop
String[] fruits = {"apple", "banana", "cherry"};
for (String fruit : fruits) {
    System.out.println(fruit);
}

// Array iteration
int[] arr = {1, 2, 3, 4, 5};
for (int num : arr) {
    System.out.print(num + " ");
}
System.out.println();
// Output: 1 2 3 4 5
```

---

## While Loops

Execute code while a condition is true.

### While Loop

**Python:**
```python
count = 0
while count < 5:
    print(count, end=" ")
    count += 1
# Output: 0 1 2 3 4

# Infinite loop (careful!)
# while True:
#     print("Infinite loop")
#     break  # Use break to exit

# User input example
password = ""
while password != "secret":
    password = input("Enter password: ")
print("Access granted!")
```

**C++:**
```cpp
int count = 0;
while (count < 5) {
    cout << count << " ";
    count++;
}
cout << endl;
// Output: 0 1 2 3 4

// User input example
string password;
while (password != "secret") {
    cout << "Enter password: ";
    cin >> password;
}
cout << "Access granted!" << endl;
```

**Java:**
```java
int count = 0;
while (count < 5) {
    System.out.print(count + " ");
    count++;
}
System.out.println();
// Output: 0 1 2 3 4
```

### Do-While Loop

Executes at least once, then checks condition.

**C++:**
```cpp
int count = 0;
do {
    cout << count << " ";
    count++;
} while (count < 5);
cout << endl;
// Output: 0 1 2 3 4

// Useful for menu systems
int choice;
do {
    cout << "Menu:" << endl;
    cout << "1. Option 1" << endl;
    cout << "2. Option 2" << endl;
    cout << "0. Exit" << endl;
    cout << "Enter choice: ";
    cin >> choice;
} while (choice != 0);
```

**Java:**
```java
int count = 0;
do {
    System.out.print(count + " ");
    count++;
} while (count < 5);
System.out.println();
// Output: 0 1 2 3 4
```

**Python:**
```python
# Python doesn't have do-while, but you can simulate it
count = 0
while True:
    print(count, end=" ")
    count += 1
    if count >= 5:
        break
# Output: 0 1 2 3 4
```

---

## Break and Continue

### Break Statement
Exits the loop immediately.

**Python:**
```python
for i in range(10):
    if i == 5:
        break
    print(i, end=" ")
# Output: 0 1 2 3 4

# Finding first element
numbers = [1, 3, 5, 7, 9, 8, 6]
for num in numbers:
    if num % 2 == 0:
        print(f"First even number: {num}")
        break
# Output: First even number: 8
```

**C++:**
```cpp
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break;
    }
    cout << i << " ";
}
cout << endl;
// Output: 0 1 2 3 4
```

### Continue Statement
Skips the rest of the current iteration.

**Python:**
```python
for i in range(10):
    if i % 2 == 0:
        continue  # Skip even numbers
    print(i, end=" ")
# Output: 1 3 5 7 9

# Skip specific values
for i in range(1, 11):
    if i == 5:
        continue
    print(i, end=" ")
# Output: 1 2 3 4 6 7 8 9 10
```

**C++:**
```cpp
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        continue;  // Skip even numbers
    }
    cout << i << " ";
}
cout << endl;
// Output: 1 3 5 7 9
```

**Java:**
```java
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        continue;  // Skip even numbers
    }
    System.out.print(i + " ");
}
System.out.println();
// Output: 1 3 5 7 9
```

---

## Nested Control Structures

### Nested Loops

**Python:**
```python
# Multiplication table
for i in range(1, 6):
    for j in range(1, 6):
        print(f"{i * j:3}", end=" ")
    print()

# Output:
#   1   2   3   4   5
#   2   4   6   8  10
#   3   6   9  12  15
#   4   8  12  16  20
#   5  10  15  20  25

# Pattern printing
for i in range(1, 6):
    for j in range(i):
        print("*", end="")
    print()

# Output:
# *
# **
# ***
# ****
# *****
```

**C++:**
```cpp
// Multiplication table
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= 5; j++) {
        cout << setw(3) << i * j << " ";
    }
    cout << endl;
}

// Pattern printing
for (int i = 1; i <= 5; i++) {
    for (int j = 0; j < i; j++) {
        cout << "*";
    }
    cout << endl;
}
```

### Nested Conditionals

**Python:**
```python
age = 25
has_license = True

if age >= 18:
    if has_license:
        print("You can drive")
    else:
        print("You need a license")
else:
    print("You are too young to drive")

# Better: combine conditions
if age >= 18 and has_license:
    print("You can drive")
elif age >= 18:
    print("You need a license")
else:
    print("You are too young to drive")
```

### Breaking Out of Nested Loops

**Python:**
```python
# Using flag variable
found = False
for i in range(5):
    for j in range(5):
        if i * j == 6:
            print(f"Found: {i} * {j} = 6")
            found = True
            break
    if found:
        break

# Using function and return
def find_product():
    for i in range(5):
        for j in range(5):
            if i * j == 6:
                print(f"Found: {i} * {j} = 6")
                return
find_product()
```

**C++:**
```cpp
// Using goto (rarely recommended)
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (i * j == 6) {
            cout << "Found: " << i << " * " << j << " = 6" << endl;
            goto exit_loops;
        }
    }
}
exit_loops:

// Using flag
bool found = false;
for (int i = 0; i < 5 && !found; i++) {
    for (int j = 0; j < 5; j++) {
        if (i * j == 6) {
            cout << "Found: " << i << " * " << j << " = 6" << endl;
            found = true;
            break;
        }
    }
}
```

---

## Practice Examples

### Example 1: Prime Number Check

**Python:**
```python
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

num = int(input("Enter a number: "))
if is_prime(num):
    print(f"{num} is prime")
else:
    print(f"{num} is not prime")
```

**C++:**
```cpp
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    int num;
    cout << "Enter a number: ";
    cin >> num;
    if (isPrime(num)) {
        cout << num << " is prime" << endl;
    } else {
        cout << num << " is not prime" << endl;
    }
    return 0;
}
```

### Example 2: Fibonacci Sequence

**Python:**
```python
n = int(input("How many Fibonacci numbers? "))
a, b = 0, 1
for i in range(n):
    print(a, end=" ")
    a, b = b, a + b
# Input: 10
# Output: 0 1 1 2 3 5 8 13 21 34
```

**C++:**
```cpp
int n;
cout << "How many Fibonacci numbers? ";
cin >> n;
long long a = 0, b = 1;
for (int i = 0; i < n; i++) {
    cout << a << " ";
    long long temp = a;
    a = b;
    b = temp + b;
}
cout << endl;
```

### Example 3: Pattern Printing

**Python:**
```python
# Right triangle
n = 5
for i in range(1, n + 1):
    for j in range(i):
        print("*", end="")
    print()

# Pyramid
n = 5
for i in range(1, n + 1):
    # Print spaces
    for j in range(n - i):
        print(" ", end="")
    # Print stars
    for j in range(2 * i - 1):
        print("*", end="")
    print()

# Output:
#     *
#    ***
#   *****
#  *******
# *********
```

### Example 4: Guess the Number Game

**Python:**
```python
import random

target = random.randint(1, 100)
attempts = 0
max_attempts = 7

print("Guess the number between 1 and 100!")

while attempts < max_attempts:
    guess = int(input(f"Attempt {attempts + 1}/{max_attempts}: "))
    attempts += 1
    
    if guess == target:
        print(f"Congratulations! You won in {attempts} attempts!")
        break
    elif guess < target:
        print("Too low!")
    else:
        print("Too high!")
else:
    print(f"Game over! The number was {target}")
```

---

## Common Patterns

### Sum of Numbers

```python
total = 0
for i in range(1, 101):
    total += i
print(total)  # 5050

# Formula: n * (n + 1) / 2
n = 100
total = n * (n + 1) // 2
print(total)  # 5050
```

### Factorial

```python
def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

print(factorial(5))  # 120
```

### Reverse a Number

```python
num = 12345
reversed_num = 0
while num > 0:
    digit = num % 10
    reversed_num = reversed_num * 10 + digit
    num //= 10
print(reversed_num)  # 54321
```

---

## ✅ Checklist

Before moving on, ensure you can:

- [ ] Use if/else statements for decision making
- [ ] Apply elif/else if for multiple conditions
- [ ] Implement for loops to iterate over ranges and collections
- [ ] Use while loops for condition-based repetition
- [ ] Apply break and continue appropriately
- [ ] Work with nested loops and conditionals
- [ ] Choose the right control structure for a problem

---

## 🚀 Next Steps

Continue to [04-Functions-and-Scope.md](./04-Functions-and-Scope.md)

---

[← Back: Operators](./02-Operators-and-Expressions.md) | [Next: Functions →](./04-Functions-and-Scope.md)
