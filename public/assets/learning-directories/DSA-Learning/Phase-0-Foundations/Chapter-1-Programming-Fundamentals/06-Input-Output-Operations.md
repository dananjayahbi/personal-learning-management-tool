# 06. Input/Output Operations

## 🎯 Learning Objectives

- Read input from console (stdin)
- Write output to console (stdout)
- Format output for better readability
- Handle file input/output
- Work with command-line arguments

**Duration:** 3-4 hours  
**Difficulty:** ⭐ Easy

---

## 📚 Table of Contents

1. [Console Input](#console-input)
2. [Console Output](#console-output)
3. [Formatted Output](#formatted-output)
4. [File I/O](#file-io)
5. [Command-Line Arguments](#command-line-arguments)
6. [Competitive Programming I/O](#competitive-programming-io)

---

## Console Input

### Python

```python
# Single input
name = input("Enter your name: ")
print(f"Hello, {name}!")

# Reading integer
age = int(input("Enter your age: "))
print(f"You are {age} years old")

# Reading float
price = float(input("Enter price: "))
print(f"Price: ${price:.2f}")

# Multiple inputs (space-separated)
a, b = input("Enter two numbers: ").split()
a, b = int(a), int(b)
print(f"Sum: {a + b}")

# Multiple inputs (same line, different types)
name, age = input("Enter name and age: ").split()
age = int(age)

# List of integers
numbers = list(map(int, input("Enter numbers: ").split()))
print(f"Numbers: {numbers}")

# Read multiple lines
lines = []
n = int(input("How many lines? "))
for i in range(n):
    lines.append(input())
```

### C++

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Single input
    string name;
    cout << "Enter your name: ";
    cin >> name;  // Reads until whitespace
    cout << "Hello, " << name << "!" << endl;
    
    // Reading integer
    int age;
    cout << "Enter your age: ";
    cin >> age;
    cout << "You are " << age << " years old" << endl;
    
    // Reading float
    double price;
    cout << "Enter price: ";
    cin >> price;
    cout << "Price: $" << price << endl;
    
    // Multiple inputs
    int a, b;
    cout << "Enter two numbers: ";
    cin >> a >> b;
    cout << "Sum: " << (a + b) << endl;
    
    // Read entire line (including spaces)
    cin.ignore();  // Clear newline from buffer
    string full_name;
    cout << "Enter full name: ";
    getline(cin, full_name);
    cout << "Full name: " << full_name << endl;
    
    return 0;
}
```

### Java

```java
import java.util.Scanner;

public class InputOutput {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Single input
        System.out.print("Enter your name: ");
        String name = scanner.next();
        System.out.println("Hello, " + name + "!");
        
        // Reading integer
        System.out.print("Enter your age: ");
        int age = scanner.nextInt();
        System.out.println("You are " + age + " years old");
        
        // Reading double
        System.out.print("Enter price: ");
        double price = scanner.nextDouble();
        System.out.println("Price: $" + price);
        
        // Multiple inputs
        System.out.print("Enter two numbers: ");
        int a = scanner.nextInt();
        int b = scanner.nextInt();
        System.out.println("Sum: " + (a + b));
        
        // Read entire line
        scanner.nextLine();  // Clear newline
        System.out.print("Enter full name: ");
        String fullName = scanner.nextLine();
        System.out.println("Full name: " + fullName);
        
        scanner.close();
    }
}
```

---

## Console Output

### Python

```python
# Basic print
print("Hello, World!")

# Multiple values
print("Name:", "Alice", "Age:", 25)

# Without newline (same line)
print("Loading", end="...")
print("Done!")  # Output: Loading...Done!

# Custom separator
print(1, 2, 3, 4, 5, sep=", ")  # Output: 1, 2, 3, 4, 5

# F-strings (Python 3.6+)
name = "Alice"
age = 25
print(f"{name} is {age} years old")

# Format method
print("{} is {} years old".format(name, age))

# Old-style formatting
print("%s is %d years old" % (name, age))
```

### C++

```cpp
#include <iostream>
using namespace std;

int main() {
    // Basic output
    cout << "Hello, World!" << endl;
    
    // Multiple values
    cout << "Name: " << "Alice" << " Age: " << 25 << endl;
    
    // Without newline
    cout << "Loading...";
    cout << "Done!" << endl;
    
    // Variables
    string name = "Alice";
    int age = 25;
    cout << name << " is " << age << " years old" << endl;
    
    // Formatted output
    #include <iomanip>
    double pi = 3.14159265359;
    cout << fixed << setprecision(2);
    cout << "Pi: " << pi << endl;  // Pi: 3.14
    
    return 0;
}
```

### Java

```java
public class Output {
    public static void main(String[] args) {
        // Basic output
        System.out.println("Hello, World!");
        
        // Multiple values
        System.out.println("Name: Alice Age: 25");
        
        // Without newline
        System.out.print("Loading...");
        System.out.println("Done!");  // Output: Loading...Done!
        
        // Variables
        String name = "Alice";
        int age = 25;
        System.out.println(name + " is " + age + " years old");
        
        // Formatted output
        System.out.printf("%s is %d years old%n", name, age);
        
        double pi = 3.14159265359;
        System.out.printf("Pi: %.2f%n", pi);  // Pi: 3.14
    }
}
```

---

## Formatted Output

### Python String Formatting

```python
name = "Alice"
age = 25
score = 95.5

# F-strings (recommended)
print(f"Name: {name}, Age: {age}, Score: {score:.2f}")

# Right align in 10 spaces
print(f"Name: {name:>10}")

# Left align in 10 spaces
print(f"Name: {name:<10}")

# Center align
print(f"Name: {name:^10}")

# Number formatting
number = 1234567
print(f"Number: {number:,}")  # 1,234,567
print(f"Hex: {number:x}")     # 12d687
print(f"Binary: {number:b}")  # 100101101011010000111

# Percentage
percentage = 0.856
print(f"Score: {percentage:.1%}")  # Score: 85.6%
```

### C++ Formatting

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    string name = "Alice";
    int age = 25;
    double score = 95.567;
    
    // Set precision
    cout << fixed << setprecision(2);
    cout << "Score: " << score << endl;  // Score: 95.57
    
    // Width and fill
    cout << setw(10) << setfill('*') << name << endl;
    // Output: *****Alice
    
    // Left/right alignment
    cout << left << setw(10) << name << endl;   // Alice     
    cout << right << setw(10) << age << endl;   //        25
    
    // Number formatting
    int number = 1234567;
    cout << hex << number << endl;  // 12d687 (hexadecimal)
    cout << oct << number << endl;  // 4553207 (octal)
    cout << dec << number << endl;  // 1234567 (back to decimal)
    
    return 0;
}
```

### Java Formatting

```java
String name = "Alice";
int age = 25;
double score = 95.567;

// printf style
System.out.printf("Name: %s, Age: %d, Score: %.2f%n", name, age, score);
// Output: Name: Alice, Age: 25, Score: 95.57

// Width and alignment
System.out.printf("Name: %10s%n", name);      // Right aligned
System.out.printf("Name: %-10s%n", name);     // Left aligned

// Number formatting
int number = 1234567;
System.out.printf("Number: %,d%n", number);    // 1,234,567
System.out.printf("Hex: %x%n", number);        // 12d687
```

---

## File I/O

### Python File Operations

```python
# Writing to file
with open("output.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("This is line 2\n")

# Reading from file
with open("output.txt", "r") as file:
    content = file.read()
    print(content)

# Reading line by line
with open("output.txt", "r") as file:
    for line in file:
        print(line.strip())

# Reading all lines into list
with open("output.txt", "r") as file:
    lines = file.readlines()
    print(lines)

# Appending to file
with open("output.txt", "a") as file:
    file.write("Appended line\n")

# Reading and processing
with open("numbers.txt", "r") as file:
    numbers = [int(line.strip()) for line in file]
    print(f"Sum: {sum(numbers)}")
```

### C++ File Operations

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // Writing to file
    ofstream outfile("output.txt");
    outfile << "Hello, World!" << endl;
    outfile << "This is line 2" << endl;
    outfile.close();
    
    // Reading from file
    ifstream infile("output.txt");
    string line;
    while (getline(infile, line)) {
        cout << line << endl;
    }
    infile.close();
    
    // Reading numbers
    ifstream numfile("numbers.txt");
    int number;
    int sum = 0;
    while (numfile >> number) {
        sum += number;
    }
    cout << "Sum: " << sum << endl;
    numfile.close();
    
    return 0;
}
```

### Java File Operations

```java
import java.io.*;
import java.util.Scanner;

public class FileIO {
    public static void main(String[] args) throws IOException {
        // Writing to file
        FileWriter writer = new FileWriter("output.txt");
        writer.write("Hello, World!\n");
        writer.write("This is line 2\n");
        writer.close();
        
        // Reading from file
        File file = new File("output.txt");
        Scanner scanner = new Scanner(file);
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            System.out.println(line);
        }
        scanner.close();
        
        // Reading numbers
        Scanner numScanner = new Scanner(new File("numbers.txt"));
        int sum = 0;
        while (numScanner.hasNextInt()) {
            sum += numScanner.nextInt();
        }
        System.out.println("Sum: " + sum);
        numScanner.close();
    }
}
```

---

## Command-Line Arguments

### Python

```python
import sys

# Access arguments
print("Script name:", sys.argv[0])
print("Arguments:", sys.argv[1:])

# Example: python script.py arg1 arg2 arg3
# Output:
# Script name: script.py
# Arguments: ['arg1', 'arg2', 'arg3']

# Using argparse for better handling
import argparse

parser = argparse.ArgumentParser(description="Process some integers.")
parser.add_argument("integers", metavar="N", type=int, nargs="+",
                    help="an integer for the accumulator")
parser.add_argument("--sum", dest="accumulate", action="store_const",
                    const=sum, default=max,
                    help="sum the integers (default: find the max)")

args = parser.parse_args()
print(args.accumulate(args.integers))
```

### C++

```cpp
#include <iostream>
using namespace std;

int main(int argc, char* argv[]) {
    cout << "Number of arguments: " << argc << endl;
    
    for (int i = 0; i < argc; i++) {
        cout << "Argument " << i << ": " << argv[i] << endl;
    }
    
    // Example: ./program arg1 arg2
    // Output:
    // Number of arguments: 3
    // Argument 0: ./program
    // Argument 1: arg1
    // Argument 2: arg2
    
    return 0;
}
```

### Java

```java
public class CommandLineArgs {
    public static void main(String[] args) {
        System.out.println("Number of arguments: " + args.length);
        
        for (int i = 0; i < args.length; i++) {
            System.out.println("Argument " + i + ": " + args[i]);
        }
        
        // Example: java CommandLineArgs arg1 arg2
        // Output:
        // Number of arguments: 2
        // Argument 0: arg1
        // Argument 1: arg2
    }
}
```

---

## Competitive Programming I/O

### Fast I/O Templates

**Python (for Competitive Programming):**
```python
import sys
input = sys.stdin.readline

# Fast reading
t = int(input())
for _ in range(t):
    n = int(input())
    arr = list(map(int, input().split()))
    # Process...
    
# Fast output
print(*result)  # Print list elements space-separated
```

**C++ (Fast I/O):**
```cpp
#include <iostream>
using namespace std;

int main() {
    // Speed up I/O
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> arr(n);
        for (int i = 0; i < n; i++) {
            cin >> arr[i];
        }
        // Process...
    }
    
    return 0;
}
```

**Java (Fast I/O):**
```java
import java.io.*;
import java.util.*;

public class FastIO {
    static class FastReader {
        BufferedReader br;
        StringTokenizer st;
        
        public FastReader() {
            br = new BufferedReader(new InputStreamReader(System.in));
        }
        
        String next() {
            while (st == null || !st.hasMoreElements()) {
                try {
                    st = new StringTokenizer(br.readLine());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return st.nextToken();
        }
        
        int nextInt() {
            return Integer.parseInt(next());
        }
    }
    
    public static void main(String[] args) {
        FastReader fr = new FastReader();
        int t = fr.nextInt();
        while (t-- > 0) {
            int n = fr.nextInt();
            int[] arr = new int[n];
            for (int i = 0; i < n; i++) {
                arr[i] = fr.nextInt();
            }
            // Process...
        }
    }
}
```

---

## ✅ Checklist

- [ ] Read input from console
- [ ] Write formatted output
- [ ] Handle multiple inputs
- [ ] Read/write files
- [ ] Use command-line arguments
- [ ] Apply fast I/O for competitive programming

---

## 🚀 Next Steps

Continue to [07-Arrays-and-Strings-Intro.md](./07-Arrays-and-Strings-Intro.md)

---

[← Back: Recursion](./05-Recursion-Basics.md) | [Next: Arrays & Strings →](./07-Arrays-and-Strings-Intro.md)
