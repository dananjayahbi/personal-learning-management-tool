# Stack Applications 🚀

## Overview

Stacks are fundamental data structures with numerous real-world applications in computer science, software engineering, and everyday computing. Understanding these applications helps recognize when to use stacks in problem-solving.

---

## 1. Function Call Stack (System Stack)

### How It Works

When a function is called, the system:
1. **Pushes** function's activation record onto call stack
2. Stores: return address, parameters, local variables
3. **Pops** when function returns

### Example: Recursive Factorial

```python
def factorial(n):
    """
    Call stack visualization for factorial(3)
    """
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Call: factorial(3)
```

**Call Stack Visualization**:
```
Step 1: factorial(3) called
Stack: [factorial(3)]

Step 2: factorial(2) called from factorial(3)
Stack: [factorial(3), factorial(2)]

Step 3: factorial(1) called from factorial(2)
Stack: [factorial(3), factorial(2), factorial(1)]

Step 4: factorial(1) returns 1
Stack: [factorial(3), factorial(2)]  # Returns 1

Step 5: factorial(2) returns 2 * 1 = 2
Stack: [factorial(3)]  # Returns 2

Step 6: factorial(3) returns 3 * 2 = 6
Stack: []  # Returns 6
```

### Stack Overflow Example

```python
def infinite_recursion():
    """This causes stack overflow"""
    return infinite_recursion()

# infinite_recursion()  # RecursionError: maximum recursion depth exceeded
```

---

## 2. Expression Evaluation

### Calculator Implementation

```python
class Calculator:
    """
    Stack-based calculator for arithmetic expressions
    """
    def __init__(self):
        self.operand_stack = []
        self.operator_stack = []
    
    def precedence(self, op):
        """Return operator precedence"""
        if op in ['+', '-']:
            return 1
        if op in ['*', '/']:
            return 2
        if op == '^':
            return 3
        return 0
    
    def apply_operator(self, op, b, a):
        """Apply operator to two operands"""
        if op == '+': return a + b
        if op == '-': return a - b
        if op == '*': return a * b
        if op == '/': return a / b
        if op == '^': return a ** b
    
    def evaluate(self, expression):
        """
        Evaluate infix expression using two stacks
        Example: "3 + 5 * 2" → 13
        """
        i = 0
        while i < len(expression):
            if expression[i].isspace():
                i += 1
                continue
            
            # If digit, push to operand stack
            if expression[i].isdigit():
                num = 0
                while i < len(expression) and expression[i].isdigit():
                    num = num * 10 + int(expression[i])
                    i += 1
                self.operand_stack.append(num)
                continue
            
            # If opening bracket, push to operator stack
            if expression[i] == '(':
                self.operator_stack.append(expression[i])
            
            # If closing bracket, solve until opening bracket
            elif expression[i] == ')':
                while self.operator_stack[-1] != '(':
                    op = self.operator_stack.pop()
                    b = self.operand_stack.pop()
                    a = self.operand_stack.pop()
                    self.operand_stack.append(self.apply_operator(op, b, a))
                self.operator_stack.pop()  # Remove '('
            
            # If operator
            else:
                while (self.operator_stack and 
                       self.precedence(self.operator_stack[-1]) >= 
                       self.precedence(expression[i])):
                    op = self.operator_stack.pop()
                    b = self.operand_stack.pop()
                    a = self.operand_stack.pop()
                    self.operand_stack.append(self.apply_operator(op, b, a))
                self.operator_stack.append(expression[i])
            
            i += 1
        
        # Apply remaining operators
        while self.operator_stack:
            op = self.operator_stack.pop()
            b = self.operand_stack.pop()
            a = self.operand_stack.pop()
            self.operand_stack.append(self.apply_operator(op, b, a))
        
        return self.operand_stack[-1]


# Usage
calc = Calculator()
print(calc.evaluate("3 + 5 * 2"))      # 13
print(calc.evaluate("(3 + 5) * 2"))    # 16
print(calc.evaluate("10 + 2 * 6"))     # 22
```

---

## 3. Undo/Redo Functionality

### Text Editor with Undo/Redo

```python
class TextEditor:
    """
    Text editor with undo/redo using two stacks
    """
    def __init__(self):
        self.text = ""
        self.undo_stack = []  # Store previous states
        self.redo_stack = []  # Store undone states
    
    def write(self, text):
        """Add text"""
        self.undo_stack.append(self.text)
        self.text += text
        self.redo_stack.clear()  # Clear redo history
        print(f"Text: '{self.text}'")
    
    def delete(self, count):
        """Delete characters"""
        self.undo_stack.append(self.text)
        self.text = self.text[:-count]
        self.redo_stack.clear()
        print(f"Text: '{self.text}'")
    
    def undo(self):
        """Undo last action"""
        if not self.undo_stack:
            print("Nothing to undo")
            return
        
        self.redo_stack.append(self.text)
        self.text = self.undo_stack.pop()
        print(f"Undo → Text: '{self.text}'")
    
    def redo(self):
        """Redo last undone action"""
        if not self.redo_stack:
            print("Nothing to redo")
            return
        
        self.undo_stack.append(self.text)
        self.text = self.redo_stack.pop()
        print(f"Redo → Text: '{self.text}'")


# Usage Example
editor = TextEditor()
editor.write("Hello")       # Text: 'Hello'
editor.write(" World")      # Text: 'Hello World'
editor.delete(6)            # Text: 'Hello'
editor.undo()               # Undo → Text: 'Hello World'
editor.undo()               # Undo → Text: 'Hello'
editor.redo()               # Redo → Text: 'Hello World'
```

**Visualization**:
```
Initial State:
text: ""
undo_stack: []
redo_stack: []

After write("Hello"):
text: "Hello"
undo_stack: [""]
redo_stack: []

After write(" World"):
text: "Hello World"
undo_stack: ["", "Hello"]
redo_stack: []

After undo():
text: "Hello"
undo_stack: [""]
redo_stack: ["Hello World"]

After redo():
text: "Hello World"
undo_stack: ["", "Hello"]
redo_stack: []
```

---

## 4. Browser History Navigation

### Browser Back/Forward Implementation

```python
class Browser:
    """
    Browser with back/forward navigation
    """
    def __init__(self, homepage):
        self.current = homepage
        self.back_stack = []
        self.forward_stack = []
    
    def visit(self, url):
        """Visit new URL"""
        self.back_stack.append(self.current)
        self.current = url
        self.forward_stack.clear()  # Clear forward history
        print(f"Visited: {url}")
    
    def back(self):
        """Go back to previous page"""
        if not self.back_stack:
            print("No previous page")
            return self.current
        
        self.forward_stack.append(self.current)
        self.current = self.back_stack.pop()
        print(f"Back to: {self.current}")
        return self.current
    
    def forward(self):
        """Go forward to next page"""
        if not self.forward_stack:
            print("No next page")
            return self.current
        
        self.back_stack.append(self.current)
        self.current = self.forward_stack.pop()
        print(f"Forward to: {self.current}")
        return self.current


# Usage Example
browser = Browser("google.com")
browser.visit("youtube.com")    # Visited: youtube.com
browser.visit("github.com")     # Visited: github.com
browser.back()                  # Back to: youtube.com
browser.back()                  # Back to: google.com
browser.forward()               # Forward to: youtube.com
```

---

## 5. Backtracking Algorithms

### Maze Solver Using Stack

```python
def solve_maze(maze, start, end):
    """
    Solve maze using stack-based DFS
    
    maze: 2D grid (0 = path, 1 = wall)
    start: (row, col) starting position
    end: (row, col) ending position
    """
    rows, cols = len(maze), len(maze[0])
    stack = [start]
    visited = set([start])
    parent = {start: None}
    
    # Directions: up, right, down, left
    directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]
    
    while stack:
        current = stack.pop()
        
        # Found the exit
        if current == end:
            path = []
            while current:
                path.append(current)
                current = parent[current]
            return path[::-1]
        
        row, col = current
        
        # Explore neighbors
        for dr, dc in directions:
            new_row, new_col = row + dr, col + dc
            
            # Check bounds and validity
            if (0 <= new_row < rows and 
                0 <= new_col < cols and 
                maze[new_row][new_col] == 0 and 
                (new_row, new_col) not in visited):
                
                neighbor = (new_row, new_col)
                stack.append(neighbor)
                visited.add(neighbor)
                parent[neighbor] = current
    
    return None  # No path found


# Example Usage
maze = [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0]
]

start = (0, 0)
end = (4, 4)
path = solve_maze(maze, start, end)
print(f"Path found: {path}")
# Output: [(0, 0), (1, 0), (2, 0), (2, 1), (2, 2), (3, 2), (3, 3), (4, 3), (4, 4)]
```

---

## 6. Syntax Parsing (Compilers)

### Balanced Parentheses Checker

```python
def is_balanced(expression):
    """
    Check if brackets are balanced
    Examples: (), {}, [], ([{}])
    """
    stack = []
    opening = {'(', '{', '['}
    closing = {')', '}', ']'}
    pairs = {'(': ')', '{': '}', '[': ']'}
    
    for char in expression:
        if char in opening:
            stack.append(char)
        elif char in closing:
            if not stack:
                return False
            if pairs[stack[-1]] != char:
                return False
            stack.pop()
    
    return len(stack) == 0


# Test cases
print(is_balanced("()"))           # True
print(is_balanced("()[]{}"))       # True
print(is_balanced("([{}])"))       # True
print(is_balanced("(]"))           # False
print(is_balanced("([)]"))         # False
print(is_balanced("{[]}"))         # True
```

### HTML Tag Validator

```python
def validate_html(html):
    """
    Validate HTML tags are properly nested
    """
    stack = []
    i = 0
    
    while i < len(html):
        if html[i] == '<':
            j = i + 1
            while j < len(html) and html[j] != '>':
                j += 1
            
            tag = html[i+1:j]
            
            # Closing tag
            if tag.startswith('/'):
                if not stack or stack[-1] != tag[1:]:
                    return False
                stack.pop()
            # Self-closing or opening tag
            elif not tag.endswith('/'):
                stack.append(tag)
            
            i = j + 1
        else:
            i += 1
    
    return len(stack) == 0


# Test cases
print(validate_html("<div><p>Hello</p></div>"))      # True
print(validate_html("<div><p>Hello</div></p>"))      # False
print(validate_html("<br/>"))                         # True
```

---

## 7. Memory Management

### Stack-based Memory Allocation

```python
class MemoryStack:
    """
    Simulates stack frame allocation
    """
    def __init__(self, size=1024):
        self.memory = [None] * size
        self.stack_pointer = 0
    
    def allocate(self, size, name):
        """Allocate memory on stack"""
        if self.stack_pointer + size > len(self.memory):
            raise MemoryError("Stack Overflow")
        
        start = self.stack_pointer
        self.stack_pointer += size
        print(f"Allocated {size} bytes for '{name}' at {start}")
        return start
    
    def deallocate(self, size, name):
        """Deallocate memory from stack"""
        self.stack_pointer -= size
        print(f"Deallocated {size} bytes for '{name}'")
    
    def show_usage(self):
        """Show current memory usage"""
        print(f"Memory used: {self.stack_pointer}/{len(self.memory)} bytes")


# Example: Function calls
memory = MemoryStack(size=1024)

# main() function
main_vars = memory.allocate(16, "main variables")

# foo() function called
foo_vars = memory.allocate(32, "foo variables")
foo_return = memory.allocate(8, "foo return address")

# bar() function called from foo()
bar_vars = memory.allocate(24, "bar variables")
memory.show_usage()  # 80/1024 bytes

# bar() returns
memory.deallocate(24, "bar variables")

# foo() returns
memory.deallocate(8, "foo return address")
memory.deallocate(32, "foo variables")

memory.show_usage()  # 16/1024 bytes
```

---

## 8. Depth-First Search (DFS)

### Graph Traversal Using Stack

```python
def dfs_iterative(graph, start):
    """
    DFS traversal using explicit stack (iterative)
    
    graph: adjacency list representation
    """
    visited = set()
    stack = [start]
    result = []
    
    while stack:
        node = stack.pop()
        
        if node not in visited:
            visited.add(node)
            result.append(node)
            
            # Add neighbors in reverse order for correct traversal
            for neighbor in reversed(graph[node]):
                if neighbor not in visited:
                    stack.append(neighbor)
    
    return result


# Example Graph
graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
}

print(dfs_iterative(graph, 'A'))
# Output: ['A', 'B', 'D', 'E', 'F', 'C']
```

---

## 9. String Reversal

```python
def reverse_string(s):
    """Reverse string using stack - O(n)"""
    stack = []
    
    # Push all characters
    for char in s:
        stack.append(char)
    
    # Pop all characters
    reversed_str = ""
    while stack:
        reversed_str += stack.pop()
    
    return reversed_str


print(reverse_string("Hello"))  # "olleH"
```

---

## 10. Tower of Hanoi

```python
def tower_of_hanoi(n, source, auxiliary, destination):
    """
    Solve Tower of Hanoi using recursion (stack-based)
    
    n: number of disks
    """
    if n == 1:
        print(f"Move disk 1 from {source} to {destination}")
        return
    
    # Move n-1 disks from source to auxiliary
    tower_of_hanoi(n-1, source, destination, auxiliary)
    
    # Move nth disk from source to destination
    print(f"Move disk {n} from {source} to {destination}")
    
    # Move n-1 disks from auxiliary to destination
    tower_of_hanoi(n-1, auxiliary, source, destination)


# Example: 3 disks
tower_of_hanoi(3, 'A', 'B', 'C')
```

**Output**:
```
Move disk 1 from A to C
Move disk 2 from A to B
Move disk 1 from C to B
Move disk 3 from A to C
Move disk 1 from B to A
Move disk 2 from B to C
Move disk 1 from A to C
```

---

## Summary: When to Use Stacks

| Application | Stack Usage | Why Stack? |
|-------------|-------------|------------|
| Function Calls | Store return addresses | LIFO matches call/return |
| Expression Eval | Store operators/operands | Precedence handling |
| Undo/Redo | Store states | Reverse chronological order |
| Backtracking | Store choices | Explore paths, backtrack |
| Parsing | Match brackets | Nested structure |
| DFS | Store nodes | Depth exploration |

---

**Next:** Continue to [04-Expression-Evaluation.md](04-Expression-Evaluation.md) for detailed expression conversion techniques!
