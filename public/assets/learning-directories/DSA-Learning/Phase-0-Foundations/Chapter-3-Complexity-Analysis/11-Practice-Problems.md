# 11. Practice Problems

## 🎯 Instructions

This section contains **50+ problems** organized by difficulty. Work through them systematically to master complexity analysis.

**How to Practice:**
1. Try to solve without looking at the answer
2. Write down your analysis step-by-step
3. Check your answer
4. If wrong, understand why
5. Redo the problem later

---

## 🟢 Beginner Level (1-20)

### Problem 1: Simple Function
```python
def function1(n):
    result = 0
    for i in range(n):
        result += i
    return result
```
**What is the time complexity?**

<details>
<summary>Answer</summary>

**Analysis:**
- Single loop: n iterations
- Constant work per iteration

**Time:** O(n)  
**Space:** O(1)
</details>

---

### Problem 2: Two Loops
```python
def function2(n):
    for i in range(n):
        print(i)
    for j in range(n):
        print(j)
```
**What is the time complexity?**

<details>
<summary>Answer</summary>

**Analysis:**
- First loop: O(n)
- Second loop: O(n)
- Sequential: O(n) + O(n) = O(2n) = O(n)

**Time:** O(n)  
**Space:** O(1)
</details>

---

### Problem 3: Nested Loops
```python
def function3(n):
    for i in range(n):
        for j in range(n):
            print(i, j)
```
**What is the time complexity?**

<details>
<summary>Answer</summary>

**Analysis:**
- Outer loop: n iterations
- Inner loop: n iterations (for each outer)
- Total: n × n = n²

**Time:** O(n²)  
**Space:** O(1)
</details>

---

### Problem 4: Dependent Loop
```python
def function4(n):
    for i in range(n):
        for j in range(i):
            print(i, j)
```
**What is the time complexity?**

<details>
<summary>Answer</summary>

**Analysis:**
- Inner loop runs: 0 + 1 + 2 + ... + (n-1)
- Sum = n(n-1)/2 = (n² - n)/2
- Drop constants and lower terms

**Time:** O(n²)  
**Space:** O(1)
</details>

---

### Problem 5: Logarithmic
```python
def function5(n):
    i = 1
    while i < n:
        print(i)
        i = i * 2
```
**What is the time complexity?**

<details>
<summary>Answer</summary>

**Analysis:**
- i doubles each iteration: 1, 2, 4, 8, ...
- After k iterations: i = 2^k
- Stops when 2^k ≥ n
- Therefore: k = log₂(n)

**Time:** O(log n)  
**Space:** O(1)
</details>

---

### Problem 6: Array Creation
```python
def function6(n):
    arr = []
    for i in range(n):
        arr.append(i * i)
    return arr
```
**What are the time and space complexities?**

<details>
<summary>Answer</summary>

**Analysis:**
- Loop runs n times
- Append is O(1) amortized
- Creates array of size n

**Time:** O(n)  
**Space:** O(n)
</details>

---

### Problem 7: String Concatenation
```python
def function7(n):
    result = ""
    for i in range(n):
        result += "a"
    return result
```
**What is the time complexity?**

<details>
<summary>Answer</summary>

**Analysis:**
- In Python, strings are immutable
- Each += creates new string and copies
- Iteration 1: copy 1 char
- Iteration 2: copy 2 chars
- ...
- Total: 1 + 2 + 3 + ... + n = n(n+1)/2

**Time:** O(n²)  
**Space:** O(n)
</details>

---

### Problem 8: Factorial
```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
```
**What are the time and space complexities?**

<details>
<summary>Answer</summary>

**Analysis:**
- n recursive calls
- Each call: O(1) work
- Stack depth: n

**Time:** O(n)  
**Space:** O(n) - recursion stack
</details>

---

### Problem 9: Binary Search
```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```
**What is the time complexity?**

<details>
<summary>Answer</summary>

**Analysis:**
- Each iteration halves search space
- n → n/2 → n/4 → ... → 1
- log₂(n) iterations

**Time:** O(log n)  
**Space:** O(1)
</details>

---

### Problem 10: Matrix Access
```python
def function10(matrix):
    return matrix[0][0]
```
**What is the time complexity?**

<details>
<summary>Answer</summary>

**Analysis:**
- Direct array access
- Constant time operation

**Time:** O(1)  
**Space:** O(1)
</details>

---

### Problem 11-20: Quick Fire Round

**Problem 11:**
```python
for i in range(100):
    print(i)
```
<details><summary>Answer</summary>O(1) - constant iterations</details>

**Problem 12:**
```python
for i in range(n, 0, -1):
    print(i)
```
<details><summary>Answer</summary>O(n) - n iterations backward</details>

**Problem 13:**
```python
for i in range(0, n, 2):
    print(i)
```
<details><summary>Answer</summary>O(n) - n/2 iterations = O(n)</details>

**Problem 14:**
```python
for i in range(n):
    for j in range(n):
        for k in range(n):
            print(i, j, k)
```
<details><summary>Answer</summary>O(n³) - three nested loops</details>

**Problem 15:**
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```
<details><summary>Answer</summary>O(2^n) - exponential</details>

**Problem 16:**
```python
i = n
while i > 0:
    print(i)
    i = i // 2
```
<details><summary>Answer</summary>O(log n) - halving</details>

**Problem 17:**
```python
for i in range(n):
    j = 1
    while j < n:
        print(j)
        j *= 2
```
<details><summary>Answer</summary>O(n log n) - n × log n</details>

**Problem 18:**
```python
def sum_iterative(arr):
    total = 0
    for num in arr:
        total += num
    return total
```
<details><summary>Answer</summary>Time: O(n), Space: O(1)</details>

**Problem 19:**
```python
def sum_recursive(arr, index=0):
    if index >= len(arr):
        return 0
    return arr[index] + sum_recursive(arr, index+1)
```
<details><summary>Answer</summary>Time: O(n), Space: O(n)</details>

**Problem 20:**
```python
def mystery(n):
    i = 1
    while i < n:
        i = i + i
    return i
```
<details><summary>Answer</summary>O(log n) - i doubles (same as i *= 2)</details>

---

## 🟡 Intermediate Level (21-40)

### Problem 21: Tricky Recursion
```python
def mystery21(n):
    if n <= 1:
        return 1
    return mystery21(n-1) + mystery21(n-1)
```

<details>
<summary>Answer</summary>

**Analysis:**
- Two recursive calls each time
- Each decrements by 1
- Tree height: n
- Similar to Fibonacci pattern

**Answer:** O(2^n)
</details>

---

### Problem 22: Subset Generation
```python
def subsets(arr):
    if not arr:
        return [[]]
    first = arr[0]
    rest_subsets = subsets(arr[1:])
    new_subsets = []
    for subset in rest_subsets:
        new_subsets.append([first] + subset)
    return rest_subsets + new_subsets
```

<details>
<summary>Answer</summary>

**Analysis:**
- Generates all 2^n subsets
- Each subset processing: O(n) copying

**Time:** O(n × 2^n)  
**Space:** O(n × 2^n) - storing all subsets
</details>

---

### Problem 23: Two Arrays
```python
def function23(arr1, arr2):
    for a in arr1:
        for b in arr2:
            print(a, b)
```

<details>
<summary>Answer</summary>

Let m = len(arr1), n = len(arr2)

**Analysis:**
- Outer: m iterations
- Inner: n iterations

**Time:** O(m × n)  
**Space:** O(1)
</details>

---

### Problem 24: Merge Sort
```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)
```

<details>
<summary>Answer</summary>

**Recurrence:** T(n) = 2T(n/2) + O(n)

**By Master Theorem:**
- a=2, b=2, f(n)=O(n)
- log₂(2) = 1, matches f(n)

**Time:** O(n log n)  
**Space:** O(n) - temporary arrays
</details>

---

### Problem 25: Prime Check
```python
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True
```

<details>
<summary>Answer</summary>

**Analysis:**
- Loop from 2 to √n
- √n iterations

**Time:** O(√n)  
**Space:** O(1)
</details>

---

### Problem 26: Palindrome Check
```python
def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True
```

<details>
<summary>Answer</summary>

**Analysis:**
- Two pointers move toward center
- n/2 comparisons

**Time:** O(n)  
**Space:** O(1)
</details>

---

### Problem 27: Matrix Multiplication
```python
def matrix_multiply(A, B):
    n = len(A)
    C = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            for k in range(n):
                C[i][j] += A[i][k] * B[k][j]
    return C
```

<details>
<summary>Answer</summary>

**Analysis:**
- Three nested loops, each n iterations

**Time:** O(n³)  
**Space:** O(n²) - result matrix
</details>

---

### Problem 28: Bubble Sort
```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
```

<details>
<summary>Answer</summary>

**Best case:** O(n) - with early exit optimization
**Average case:** O(n²)
**Worst case:** O(n²)

**Space:** O(1) - in-place
</details>

---

### Problems 29-40: More Intermediate

I'll provide these in condensed format:

**Problem 29:** Quick Sort Average Case  
<details><summary>Answer</summary>O(n log n)</details>

**Problem 30:** Quick Sort Worst Case  
<details><summary>Answer</summary>O(n²) - unbalanced partitions</details>

**Problem 31:** Heap operations (insert, delete)  
<details><summary>Answer</summary>O(log n)</details>

**Problem 32:** Building a heap from array  
<details><summary>Answer</summary>O(n) - not O(n log n)!</details>

**Problem 33:** DFS on graph with V vertices, E edges  
<details><summary>Answer</summary>O(V + E)</details>

**Problem 34:** BFS on graph  
<details><summary>Answer</summary>O(V + E)</details>

**Problem 35:** Floyd-Warshall (all pairs shortest path)  
<details><summary>Answer</summary>O(V³)</details>

**Problem 36:** Dijkstra with binary heap  
<details><summary>Answer</summary>O((V + E) log V)</details>

**Problem 37:** Counting sort (when k = range of values)  
<details><summary>Answer</summary>O(n + k)</details>

**Problem 38:** Radix sort (d digits)  
<details><summary>Answer</summary>O(d(n + k))</details>

**Problem 39:** Dynamic array amortized append  
<details><summary>Answer</summary>O(1) amortized</details>

**Problem 40:** Hash table operations (average)  
<details><summary>Answer</summary>O(1) average, O(n) worst</details>

---

## 🔴 Advanced Level (41-50)

### Problem 41: Traveling Salesman (Brute Force)
```python
from itertools import permutations

def tsp_brute_force(cities):
    min_dist = float('inf')
    for perm in permutations(cities):
        dist = calculate_tour_distance(perm)
        min_dist = min(min_dist, dist)
    return min_dist
```

<details>
<summary>Answer</summary>

**Analysis:**
- n! permutations
- Each takes O(n) to calculate distance

**Time:** O(n! × n) = O(n!)  
**Space:** O(n)
</details>

---

### Problem 42: Edit Distance (DP)
```python
def edit_distance(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(m + 1):
        for j in range(n + 1):
            if i == 0:
                dp[i][j] = j
            elif j == 0:
                dp[i][j] = i
            elif s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    
    return dp[m][n]
```

<details>
<summary>Answer</summary>

**Time:** O(m × n)  
**Space:** O(m × n) - can be optimized to O(min(m, n))
</details>

---

### Problem 43-50: Expert Level

**Problem 43:** Suffix array construction (naive)  
<details><summary>Answer</summary>O(n² log n)</details>

**Problem 44:** Suffix array construction (optimal)  
<details><summary>Answer</summary>O(n log n)</details>

**Problem 45:** KMP string matching  
<details><summary>Answer</summary>O(n + m) where n=text, m=pattern</details>

**Problem 46:** Rabin-Karp string matching  
<details><summary>Answer</summary>O(n + m) average, O(nm) worst</details>

**Problem 47:** Convex Hull (Graham scan)  
<details><summary>Answer</summary>O(n log n)</details>

**Problem 48:** Segment Tree query and update  
<details><summary>Answer</summary>O(log n) each</details>

**Problem 49:** Fenwick Tree (Binary Indexed Tree) operations  
<details><summary>Answer</summary>O(log n)</details>

**Problem 50:** Aho-Corasick (multiple pattern matching)  
<details><summary>Answer</summary>O(n + m + z) where z=matches</details>

---

## 🎯 Challenge Problems

### Analyze Complex Code

```python
def mystery_challenge(n):
    for i in range(n):
        j = i
        while j > 0:
            k = 1
            while k < n:
                print(i, j, k)
                k *= 2
            j //= 2
```

<details>
<summary>Solution</summary>

**Analysis:**
- Outer loop: n iterations
- Middle while: log(i) iterations (j halves)
- Inner while: log(n) iterations (k doubles)
- Total: ∑(i=1 to n) log(i) × log(n)
- = log(n) × ∑log(i) = log(n) × log(n!)
- ≈ log(n) × n log(n) = n log²(n)

**Answer:** O(n log² n)
</details>

---

## 📊 Summary Table

| Difficulty | Problems | Focus |
|------------|----------|-------|
| Beginner | 1-20 | Basic loops, simple recursion |
| Intermediate | 21-40 | Nested loops, standard algorithms |
| Advanced | 41-50 | Complex algorithms, DP, graphs |

---

## 🎯 Next Steps

After completing these:
1. Review incorrect answers
2. Try implementing the algorithms
3. Time them with actual data
4. Move to the Summary & Cheatsheet

---

[← Previous: Amortized Analysis](./10-Amortized-Analysis.md) | [Back to README](./README.md) | [Next: Summary & Cheatsheet →](./12-Summary-and-Cheatsheet.md)
