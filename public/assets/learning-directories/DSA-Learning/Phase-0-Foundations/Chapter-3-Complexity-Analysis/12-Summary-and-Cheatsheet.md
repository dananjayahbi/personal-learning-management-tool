# 12. Summary & Cheatsheet

## 🎯 Quick Reference Guide

This is your **go-to reference** for complexity analysis. Bookmark this page!

---

## 📊 Big-O Complexity Chart

### Growth Rates (Fastest to Slowest)

```
O(1) < O(log log n) < O(log n) < O(√n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!) < O(nⁿ)
```

### Practical Limits (at 1 billion ops/sec)

| Complexity | n=10 | n=100 | n=1000 | n=10⁶ | Max n (1 sec) |
|------------|------|-------|--------|-------|---------------|
| O(1) | ✅ | ✅ | ✅ | ✅ | ∞ |
| O(log n) | ✅ | ✅ | ✅ | ✅ | Very large |
| O(n) | ✅ | ✅ | ✅ | ✅ | 10⁹ |
| O(n log n) | ✅ | ✅ | ✅ | ✅ | 10⁸ |
| O(n²) | ✅ | ✅ | ❌ | ❌ | 10⁴ |
| O(n³) | ✅ | ❌ | ❌ | ❌ | 10³ |
| O(2ⁿ) | ✅ | ❌ | ❌ | ❌ | 30 |
| O(n!) | ❌ | ❌ | ❌ | ❌ | 12 |

---

## 🔍 Notation Summary

| Notation | Name | Meaning | Use |
|----------|------|---------|-----|
| O(g(n)) | Big-O | Upper bound | Worst case |
| Ω(g(n)) | Big-Omega | Lower bound | Best case |
| Θ(g(n)) | Big-Theta | Tight bound | Exact growth |
| o(g(n)) | Little-o | Strict upper | Strictly less than |
| ω(g(n)) | Little-omega | Strict lower | Strictly more than |

---

## 🎨 Common Patterns Quick Reference

### Loop Patterns

| Code Pattern | Complexity |
|--------------|------------|
| `for i in range(n)` | O(n) |
| `for i in range(n): for j in range(n)` | O(n²) |
| `for i in range(n): for j in range(i)` | O(n²) |
| `while i < n: i *= 2` | O(log n) |
| `while i < n: i += 1` | O(n) |
| `for i in range(n): while j<n: j*=2` | O(n log n) |
| `while i*i < n: i += 1` | O(√n) |
| `for i in range(n): for j in range(n): for k in range(n)` | O(n³) |

### Recursion Patterns

| Recurrence | Complexity | Example |
|------------|------------|---------|
| T(n) = T(n-1) + O(1) | O(n) | Factorial |
| T(n) = T(n-1) + O(n) | O(n²) | Selection Sort |
| T(n) = 2T(n-1) + O(1) | O(2ⁿ) | Fibonacci (naive) |
| T(n) = T(n/2) + O(1) | O(log n) | Binary Search |
| T(n) = 2T(n/2) + O(n) | O(n log n) | Merge Sort |
| T(n) = 2T(n/2) + O(1) | O(n) | Tree Traversal |

---

## 🧮 Master Theorem Cheat Sheet

**For:** T(n) = aT(n/b) + f(n)

Calculate: **c = log_b(a)**

### Case 1: f(n) = O(n^d) where d < c
**Result:** T(n) = Θ(n^c)

### Case 2: f(n) = Θ(n^c × log^k(n))
**Result:** T(n) = Θ(n^c × log^(k+1)(n))

### Case 3: f(n) = Ω(n^d) where d > c
**Result:** T(n) = Θ(f(n))

### Quick Examples

| Recurrence | a | b | log_b(a) | f(n) | Case | Result |
|------------|---|---|----------|------|------|--------|
| T(n) = T(n/2) + O(1) | 1 | 2 | 0 | n⁰ | 2 | O(log n) |
| T(n) = 2T(n/2) + O(n) | 2 | 2 | 1 | n¹ | 2 | O(n log n) |
| T(n) = 4T(n/2) + O(n) | 4 | 2 | 2 | n¹ | 1 | O(n²) |
| T(n) = 2T(n/2) + O(n²) | 2 | 2 | 1 | n² | 3 | O(n²) |

---

## 📚 Data Structure Operations

| Data Structure | Access | Search | Insert | Delete | Space |
|----------------|--------|--------|--------|--------|-------|
| **Array** | O(1) | O(n) | O(n) | O(n) | O(n) |
| **Dynamic Array** | O(1) | O(n) | O(1)* | O(n) | O(n) |
| **Linked List** | O(n) | O(n) | O(1) | O(1) | O(n) |
| **Stack** | - | - | O(1) | O(1) | O(n) |
| **Queue** | - | - | O(1) | O(1) | O(n) |
| **Hash Table** | - | O(1)* | O(1)* | O(1)* | O(n) |
| **Binary Search Tree** | O(log n)* | O(log n)* | O(log n)* | O(log n)* | O(n) |
| **AVL Tree** | O(log n) | O(log n) | O(log n) | O(log n) | O(n) |
| **Heap** | - | O(n) | O(log n) | O(log n) | O(n) |

*\*amortized or average case*

---

## 🎯 Sorting Algorithms

| Algorithm | Best | Average | Worst | Space | Stable? |
|-----------|------|---------|-------|-------|---------|
| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) | Yes |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) | Yes |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(1) | No |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| **Counting Sort** | O(n+k) | O(n+k) | O(n+k) | O(k) | Yes |
| **Radix Sort** | O(d(n+k)) | O(d(n+k)) | O(d(n+k)) | O(n+k) | Yes |

*k = range of values, d = number of digits*

---

## 🔎 Searching Algorithms

| Algorithm | Data | Best | Average | Worst | Space |
|-----------|------|------|---------|-------|-------|
| **Linear Search** | Unsorted | O(1) | O(n) | O(n) | O(1) |
| **Binary Search** | Sorted | O(1) | O(log n) | O(log n) | O(1) |
| **DFS** | Graph | - | O(V+E) | O(V+E) | O(V) |
| **BFS** | Graph | - | O(V+E) | O(V+E) | O(V) |

---

## 🧮 Mathematical Formulas

### Sum Formulas

| Formula | Result | Complexity |
|---------|--------|------------|
| 1 + 2 + 3 + ... + n | n(n+1)/2 | O(n²) |
| 1 + 2 + 4 + 8 + ... + 2^k | 2^(k+1) - 1 | O(2^k) |
| 1 + c + c² + ... + c^k | (c^(k+1) - 1)/(c - 1) | O(c^k) |
| 1 + 1/2 + 1/3 + ... + 1/n | H(n) ≈ ln(n) | O(log n) |

### Log Rules

```
log(ab) = log(a) + log(b)
log(a/b) = log(a) - log(b)
log(a^b) = b × log(a)
log_a(b) = log_c(b) / log_c(a)
```

---

## 💡 Analysis Rules

### Big-O Rules

1. **Drop constants:** O(2n) = O(n)
2. **Drop lower terms:** O(n² + n) = O(n²)
3. **Different inputs, different variables:** O(a + b) not O(n)
4. **Multiplication for nested:** O(n) × O(m) = O(n×m)
5. **Addition for sequential:** O(n) + O(m) = O(n+m)

### Space Complexity

**Count:**
- Variables
- Arrays/Lists
- Recursion stack depth
- Hash tables/Sets

**Don't count (usually):**
- Input data (unless modified in-place)
- Code itself

---

## 🎓 Common Mistakes

### ❌ Mistake #1: Confusing O(2n) with O(n²)
```python
# This is O(n), not O(n²)
for i in range(n):
    print(i)
for j in range(n):
    print(j)
```

### ❌ Mistake #2: Forgetting recursion stack space
```python
# Space is O(n), not O(1)!
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n-1)
```

### ❌ Mistake #3: String concatenation in loop
```python
# This is O(n²), not O(n)!
result = ""
for i in range(n):
    result += str(i)  # Creates new string each time
```

### ❌ Mistake #4: Thinking Big-O is exact time
```python
# Both are O(n), but second is 10x slower
for i in range(n):
    process(i)  # 1 ms per call

for i in range(n):
    expensive_process(i)  # 10 ms per call
```

---

## 🔥 Interview Quick Tips

### When Asked "What's the complexity?"

1. **Clarify:** "Time or space?" (usually time)
2. **State assumptions:** "Assuming hash table is O(1)..."
3. **Explain reasoning:** Don't just say "O(n)"
4. **Consider all cases:** Best/average/worst if relevant

### How to Analyze Unknown Code

1. **Identify loops:** Each loop is at least O(n)
2. **Check nesting:** Multiply complexities
3. **Look for halving/doubling:** Usually O(log n)
4. **Count recursion:** Draw recursion tree
5. **Don't forget space:** Stack + data structures

### Red Flags

- **Nested loops with same variable:** Usually O(n²) or worse
- **Recursive with multiple calls:** Might be exponential
- **String/array concatenation in loop:** Hidden O(n)
- **Sorting in a loop:** Might be O(n² log n)

---

## 📝 Practice Strategy

### Study Plan

**Week 1: Foundations**
- Big-O notation
- Common complexity classes
- Simple loop analysis

**Week 2: Advanced**
- Recursion analysis
- Master Theorem
- Best/Average/Worst case

**Week 3: Practice**
- 50+ practice problems
- Real algorithm analysis
- Code review for complexity

### Daily Practice

1. **Morning:** Read one concept
2. **Afternoon:** Solve 5-10 problems
3. **Evening:** Review mistakes
4. **Weekly:** Mock interview

---

## 🎯 Final Checklist

Before moving to Phase 1, you should be able to:

- [ ] Explain Big-O to a non-programmer
- [ ] Analyze any simple loop instantly
- [ ] Determine complexity of nested loops
- [ ] Analyze simple recursive functions
- [ ] Use Master Theorem for divide-and-conquer
- [ ] Calculate space complexity including recursion
- [ ] Know common complexity classes by heart
- [ ] Solve 80% of practice problems correctly
- [ ] Identify O(1), O(n), O(n²), O(log n) code by sight

---

## 🚀 Resources

### Books
- "Introduction to Algorithms" (CLRS) - Chapter 3
- "Algorithm Design Manual" - Chapter 2
- "Grokking Algorithms" - Visual explanations

### Online
- [Big-O Cheat Sheet](https://www.bigocheatsheet.com/)
- [VisuAlgo](https://visualgo.net/)
- MIT OCW 6.006 - Introduction to Algorithms

### Practice
- LeetCode - Time Complexity tag
- HackerRank - Algorithm Analysis
- Project Euler - Mathematical approach

---

## 💪 You've Got This!

**Congratulations on completing Chapter 3!**

Complexity analysis is one of the hardest but most important skills in computer science. With this knowledge, you're ready to:

- Analyze any algorithm
- Compare solutions objectively
- Make informed optimization decisions
- Ace technical interviews

**Remember:** 
- Practice makes perfect
- Don't memorize, understand
- Draw diagrams when stuck
- Teach others to solidify learning

---

[← Previous: Practice Problems](./11-Practice-Problems.md) | [Back to README](./README.md) | [Next: Phase 1 →](../../Phase-1-Linear-Data-Structures/README.md)

---

**Keep this cheatsheet handy - you'll reference it throughout your entire DSA journey!** 🎉
