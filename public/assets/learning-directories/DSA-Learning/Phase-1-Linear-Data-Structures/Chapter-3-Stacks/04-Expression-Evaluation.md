# Expression Evaluation 🧮

## Overview

Expression evaluation is a fundamental application of stacks in compilers and calculators. This chapter covers conversion between different expression notations and their evaluation.

---

## Expression Notations

### 1. Infix Notation
- **Format**: Operator between operands
- **Example**: `A + B`, `(A + B) * C`
- **Usage**: Human-readable, standard mathematical notation
- **Problem**: Requires precedence rules and parentheses

### 2. Prefix Notation (Polish Notation)
- **Format**: Operator before operands
- **Example**: `+ A B`, `* + A B C`
- **Usage**: Compilers, Lisp programming
- **Advantage**: No parentheses needed, unambiguous

### 3. Postfix Notation (Reverse Polish Notation - RPN)
- **Format**: Operator after operands
- **Example**: `A B +`, `A B + C *`
- **Usage**: Calculators (HP), stack machines
- **Advantage**: Easy to evaluate, no precedence rules

### Comparison Table

| Expression | Infix | Prefix | Postfix |
|------------|-------|--------|---------|
| A + B | A + B | + A B | A B + |
| (A + B) * C | (A + B) * C | * + A B C | A B + C * |
| A + B * C | A + B * C | + A * B C | A B C * + |
| (A + B) / (C - D) | (A + B) / (C - D) | / + A B - C D | A B + C D - / |

---

## Operator Precedence and Associativity

### Precedence Table

| Operator | Precedence | Associativity |
|----------|------------|---------------|
| ^ (Power) | 3 (Highest) | Right to Left |
| *, /, % | 2 | Left to Right |
| +, - | 1 (Lowest) | Left to Right |
| ( ) | Highest (grouping) | N/A |

### Example: `3 + 5 * 2 ^ 2`

```
Step-by-step evaluation:
1. 2 ^ 2 = 4      (highest precedence)
2. 5 * 4 = 20     (next precedence)
3. 3 + 20 = 23    (lowest precedence)

Result: 23
```

---

## 1. Infix to Postfix Conversion

### Algorithm Steps

1. Create empty stack for operators
2. Scan infix expression from left to right
3. For each symbol:
   - **Operand**: Add to output
   - **Left Parenthesis '('**: Push to stack
   - **Right Parenthesis ')'**: Pop until '('
   - **Operator**: Pop higher/equal precedence operators, then push current operator
4. Pop remaining operators from stack

### Implementation

```python
class InfixToPostfix:
    """Convert infix expression to postfix"""
    
    def __init__(self):
        self.precedence = {'+': 1, '-': 1, '*': 2, '/': 2, '^': 3}
        self.right_associative = {'^'}
    
    def is_operand(self, char):
        """Check if character is operand"""
        return char.isalnum()
    
    def is_operator(self, char):
        """Check if character is operator"""
        return char in self.precedence
    
    def has_higher_precedence(self, op1, op2):
        """Check if op1 has higher precedence than op2"""
        if op2 in self.right_associative:
            return self.precedence[op1] > self.precedence[op2]
        return self.precedence[op1] >= self.precedence[op2]
    
    def convert(self, infix):
        """
        Convert infix to postfix
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        stack = []
        postfix = []
        
        for char in infix:
            # Skip whitespace
            if char.isspace():
                continue
            
            # If operand, add to output
            if self.is_operand(char):
                postfix.append(char)
            
            # If '(', push to stack
            elif char == '(':
                stack.append(char)
            
            # If ')', pop until '('
            elif char == ')':
                while stack and stack[-1] != '(':
                    postfix.append(stack.pop())
                stack.pop()  # Remove '('
            
            # If operator
            elif self.is_operator(char):
                while (stack and stack[-1] != '(' and 
                       self.has_higher_precedence(stack[-1], char)):
                    postfix.append(stack.pop())
                stack.append(char)
        
        # Pop remaining operators
        while stack:
            postfix.append(stack.pop())
        
        return ''.join(postfix)


# Test cases
converter = InfixToPostfix()

print(converter.convert("A+B"))              # AB+
print(converter.convert("A+B*C"))            # ABC*+
print(converter.convert("(A+B)*C"))          # AB+C*
print(converter.convert("A+B*C-D"))          # ABC*+D-
print(converter.convert("(A+B)*(C-D)"))      # AB+CD-*
print(converter.convert("A^B^C"))            # ABC^^
print(converter.convert("A+B*C^D"))          # ABCD^*+
```

### Step-by-Step Example: `A + B * C`

```
Infix: A + B * C

Step | Symbol | Stack | Postfix
-----|--------|-------|--------
 1   |   A    |   []  |   A
 2   |   +    |   [+] |   A
 3   |   B    |   [+] |   AB
 4   |   *    |  [+*] |   AB
 5   |   C    |  [+*] |   ABC
End  |   -    |   []  |   ABC*+

Result: ABC*+
```

### Another Example: `(A + B) * (C - D)`

```
Infix: (A + B) * (C - D)

Step | Symbol | Stack   | Postfix
-----|--------|---------|--------
 1   |   (    |   [(]   |
 2   |   A    |   [(]   |   A
 3   |   +    |  [(+]   |   A
 4   |   B    |  [(+]   |   AB
 5   |   )    |   []    |   AB+
 6   |   *    |   [*]   |   AB+
 7   |   (    |  [*(]   |   AB+
 8   |   C    |  [*(]   |   AB+C
 9   |   -    | [*(-]   |   AB+C
10   |   D    | [*(-]   |   AB+CD
11   |   )    |   [*]   |   AB+CD-
End  |   -    |   []    |   AB+CD-*

Result: AB+CD-*
```

---

## 2. Postfix Evaluation

### Algorithm Steps

1. Create empty stack
2. Scan postfix expression from left to right
3. For each symbol:
   - **Operand**: Push to stack
   - **Operator**: Pop two operands, apply operator, push result
4. Final result is on top of stack

### Implementation

```python
class PostfixEvaluator:
    """Evaluate postfix expression"""
    
    def is_operator(self, char):
        """Check if character is operator"""
        return char in {'+', '-', '*', '/', '^', '%'}
    
    def apply_operator(self, op, operand2, operand1):
        """Apply operator to operands"""
        if op == '+': return operand1 + operand2
        if op == '-': return operand1 - operand2
        if op == '*': return operand1 * operand2
        if op == '/': return operand1 / operand2
        if op == '^': return operand1 ** operand2
        if op == '%': return operand1 % operand2
    
    def evaluate(self, postfix):
        """
        Evaluate postfix expression
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        stack = []
        
        for char in postfix:
            # Skip whitespace
            if char.isspace():
                continue
            
            # If operand (digit), push to stack
            if char.isdigit():
                stack.append(int(char))
            
            # If operator, pop two operands and apply
            elif self.is_operator(char):
                if len(stack) < 2:
                    raise ValueError("Invalid postfix expression")
                
                operand2 = stack.pop()
                operand1 = stack.pop()
                result = self.apply_operator(char, operand2, operand1)
                stack.append(result)
        
        if len(stack) != 1:
            raise ValueError("Invalid postfix expression")
        
        return stack[0]


# Test cases
evaluator = PostfixEvaluator()

print(evaluator.evaluate("23+"))           # 5
print(evaluator.evaluate("23*5+"))         # 11
print(evaluator.evaluate("53+82-*"))       # 48
print(evaluator.evaluate("92-3+"))         # 10
print(evaluator.evaluate("123*+5-"))       # 2
```

### Step-by-Step Example: `5 3 + 8 2 - *`

```
Postfix: 5 3 + 8 2 - *

Step | Symbol | Stack        | Operation
-----|--------|--------------|----------
 1   |   5    |   [5]        | Push 5
 2   |   3    |   [5, 3]     | Push 3
 3   |   +    |   [8]        | Pop 3,5 → 5+3=8, Push 8
 4   |   8    |   [8, 8]     | Push 8
 5   |   2    |   [8, 8, 2]  | Push 2
 6   |   -    |   [8, 6]     | Pop 2,8 → 8-2=6, Push 6
 7   |   *    |   [48]       | Pop 6,8 → 8*6=48, Push 48

Result: 48
```

---

## 3. Infix to Prefix Conversion

### Method 1: Reverse and Modify

1. Reverse the infix expression
2. Replace '(' with ')' and vice versa
3. Convert to postfix
4. Reverse the result

### Implementation

```python
class InfixToPrefix:
    """Convert infix to prefix"""
    
    def __init__(self):
        self.infix_to_postfix = InfixToPostfix()
    
    def convert(self, infix):
        """
        Convert infix to prefix
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Step 1: Reverse the infix expression
        reversed_infix = infix[::-1]
        
        # Step 2: Swap parentheses
        swapped = ""
        for char in reversed_infix:
            if char == '(':
                swapped += ')'
            elif char == ')':
                swapped += '('
            else:
                swapped += char
        
        # Step 3: Get postfix of modified expression
        postfix = self.infix_to_postfix.convert(swapped)
        
        # Step 4: Reverse the postfix
        prefix = postfix[::-1]
        
        return prefix


# Test cases
converter = InfixToPrefix()

print(converter.convert("A+B"))              # +AB
print(converter.convert("A+B*C"))            # +A*BC
print(converter.convert("(A+B)*C"))          # *+ABC
print(converter.convert("(A+B)*(C-D)"))      # *+AB-CD
```

### Step-by-Step Example: `(A + B) * C`

```
Original Infix: (A + B) * C

Step 1 - Reverse: C * (B + A)
Step 2 - Swap (): C * (B + A) → C * ) B + A (
Step 3 - Postfix: CBA+*
Step 4 - Reverse: *+ABC

Result: *+ABC
```

---

## 4. Prefix Evaluation

### Algorithm Steps

1. Create empty stack
2. Scan prefix expression from **right to left**
3. For each symbol:
   - **Operand**: Push to stack
   - **Operator**: Pop two operands, apply operator, push result
4. Final result is on top of stack

### Implementation

```python
class PrefixEvaluator:
    """Evaluate prefix expression"""
    
    def is_operator(self, char):
        """Check if character is operator"""
        return char in {'+', '-', '*', '/', '^'}
    
    def apply_operator(self, op, operand1, operand2):
        """Apply operator to operands"""
        if op == '+': return operand1 + operand2
        if op == '-': return operand1 - operand2
        if op == '*': return operand1 * operand2
        if op == '/': return operand1 / operand2
        if op == '^': return operand1 ** operand2
    
    def evaluate(self, prefix):
        """
        Evaluate prefix expression (scan right to left)
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        stack = []
        
        # Scan from right to left
        for char in reversed(prefix):
            # Skip whitespace
            if char.isspace():
                continue
            
            # If operand, push to stack
            if char.isdigit():
                stack.append(int(char))
            
            # If operator, pop two operands and apply
            elif self.is_operator(char):
                if len(stack) < 2:
                    raise ValueError("Invalid prefix expression")
                
                operand1 = stack.pop()
                operand2 = stack.pop()
                result = self.apply_operator(char, operand1, operand2)
                stack.append(result)
        
        if len(stack) != 1:
            raise ValueError("Invalid prefix expression")
        
        return stack[0]


# Test cases
evaluator = PrefixEvaluator()

print(evaluator.evaluate("+23"))            # 5
print(evaluator.evaluate("*+235"))          # 25
print(evaluator.evaluate("*+53-82"))        # 48
print(evaluator.evaluate("+9-23"))          # 10
```

### Step-by-Step Example: `* + 5 3 - 8 2`

```
Prefix: * + 5 3 - 8 2
Scan RIGHT to LEFT

Step | Symbol | Stack        | Operation
-----|--------|--------------|----------
 1   |   2    |   [2]        | Push 2
 2   |   8    |   [2, 8]     | Push 8
 3   |   -    |   [6]        | Pop 8,2 → 8-2=6, Push 6
 4   |   3    |   [6, 3]     | Push 3
 5   |   5    |   [6, 3, 5]  | Push 5
 6   |   +    |   [6, 8]     | Pop 5,3 → 5+3=8, Push 8
 7   |   *    |   [48]       | Pop 8,6 → 8*6=48, Push 48

Result: 48
```

---

## Complete Expression Converter

```python
class ExpressionConverter:
    """Complete expression converter and evaluator"""
    
    def __init__(self):
        self.infix_to_postfix_converter = InfixToPostfix()
        self.infix_to_prefix_converter = InfixToPrefix()
        self.postfix_evaluator = PostfixEvaluator()
        self.prefix_evaluator = PrefixEvaluator()
    
    def convert_and_evaluate(self, infix):
        """Convert infix to all forms and evaluate"""
        print(f"Original Infix: {infix}")
        
        # Convert to postfix
        postfix = self.infix_to_postfix_converter.convert(infix)
        print(f"Postfix: {postfix}")
        
        # Convert to prefix
        prefix = self.infix_to_prefix_converter.convert(infix)
        print(f"Prefix: {prefix}")
        
        # Evaluate postfix
        try:
            result = self.postfix_evaluator.evaluate(postfix)
            print(f"Result: {result}")
        except:
            print("Result: Cannot evaluate (contains variables)")


# Usage Example
converter = ExpressionConverter()
converter.convert_and_evaluate("(A+B)*(C-D)")
```

**Output**:
```
Original Infix: (A+B)*(C-D)
Postfix: AB+CD-*
Prefix: *+AB-CD
Result: Cannot evaluate (contains variables)
```

---

## Practice Problems

1. **Convert `A * B + C / D` to postfix and prefix**
2. **Evaluate `23*54*+9-`**
3. **Implement infix evaluation without conversion**
4. **Handle multi-digit numbers in expressions**
5. **Add support for unary operators**

---

**Next:** Continue to [05-Parentheses-Matching.md](05-Parentheses-Matching.md) for bracket matching problems!
