# 03. Other Asymptotic Notations

## 🎯 Beyond Big-O

While **Big-O** is the most commonly used notation, there are other asymptotic notations that provide different perspectives on algorithm complexity:

- **Big-O (O)** - Upper bound (worst case)
- **Big-Omega (Ω)** - Lower bound (best case)
- **Big-Theta (Θ)** - Tight bound (both upper and lower)
- **Little-o (o)** - Strict upper bound
- **Little-omega (ω)** - Strict lower bound

---

## 📈 Big-Omega (Ω) - Lower Bound

### Definition

**Big-Omega** describes the **best-case** or **minimum growth rate** of an algorithm.

**Formal Definition:**

An algorithm is **Ω(g(n))** if there exist positive constants **c** and **n₀** such that:

$$
f(n) \geq c \cdot g(n) \text{ for all } n \geq n_0
$$

**In Plain English:**

The algorithm will take **at least** this much time, no matter how lucky we get.

### Example: Linear Search

```python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1
```

**Analysis:**
- **Best case:** Target is at index 0 → 1 comparison → **Ω(1)**
- **Worst case:** Target is at the end or not present → n comparisons → **O(n)**

**Omega Notation:** Ω(1)  
**Big-O Notation:** O(n)

### When to Use Omega

- Describing **best-case** performance
- Proving a problem requires **at least** certain time
- Lower bounds on algorithms (e.g., "Sorting requires Ω(n log n) comparisons")

---

## 🎯 Big-Theta (Θ) - Tight Bound

### Definition

**Big-Theta** describes when **both the upper and lower bounds are the same**. It's the most precise notation.

**Formal Definition:**

An algorithm is **Θ(g(n))** if it is both **O(g(n))** and **Ω(g(n))**.

$$
c_1 \cdot g(n) \leq f(n) \leq c_2 \cdot g(n) \text{ for all } n \geq n_0
$$

**In Plain English:**

The algorithm's performance is **exactly** this growth rate, regardless of input.

### Example: Finding Maximum

```python
def find_max(arr):
    max_val = arr[0]
    for i in range(1, len(arr)):
        if arr[i] > max_val:
            max_val = arr[i]
    return max_val
```

**Analysis:**
- **Best case:** Maximum at index 0 → Still checks all n elements → Ω(n)
- **Worst case:** Maximum at the end → Checks all n elements → O(n)
- **Every case:** Always checks all n elements

**Theta Notation:** Θ(n)

This is the **most accurate** description because the algorithm **always** takes linear time.

### When to Use Theta

- When best and worst cases have the **same complexity**
- Describing the **exact** growth rate
- Most academic papers use Theta for precision

---

## 🔍 Comparing the Three Main Notations

### Visual Representation

```
Operations
    |
    |     O(n)     ← Upper bound (Big-O)
    |    ----
    |   /    \
    |  |  Θ(n)  |  ← Tight bound (Big-Theta)
    |   \    /
    |    ----
    |     Ω(n)     ← Lower bound (Big-Omega)
    |_________________ Input Size (n)
```

### Real-World Example: Bubble Sort

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr
```

**Analysis:**

| Case | Scenario | Complexity | Notation |
|------|----------|------------|----------|
| Best | Already sorted | n passes, no swaps | Ω(n) |
| Worst | Reverse sorted | n² comparisons | O(n²) |
| Average | Random order | ~n²/2 comparisons | Θ(n²) |

**Summary:**
- **Big-O:** O(n²) - worst case
- **Big-Omega:** Ω(n) - best case
- **Big-Theta:** Θ(n²) - average/typical case

---

## 🔬 Little-o (o) - Strict Upper Bound

### Definition

**Little-o** is like Big-O, but **strictly less than**.

**Formal Definition:**

f(n) is **o(g(n))** if:

$$
\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0
$$

**In Plain English:**

f(n) grows **strictly slower** than g(n).

### Examples

✅ **n is o(n²)**
```
lim (n/n²) = lim (1/n) = 0
n→∞         n→∞
```

✅ **n log n is o(n²)**
```
lim (n log n / n²) = lim (log n / n) = 0
n→∞                  n→∞
```

❌ **n is NOT o(n)**
```
lim (n/n) = 1 (not 0)
n→∞
```

❌ **n² is NOT o(n²)**
```
lim (n²/n²) = 1 (not 0)
n→∞
```

### When to Use Little-o

- Rarely used in practice
- Academic papers for strict comparisons
- Proving one algorithm is **strictly better** than another

---

## 🔬 Little-omega (ω) - Strict Lower Bound

### Definition

**Little-omega** is like Big-Omega, but **strictly greater than**.

**Formal Definition:**

f(n) is **ω(g(n))** if:

$$
\lim_{n \to \infty} \frac{f(n)}{g(n)} = \infty
$$

**In Plain English:**

f(n) grows **strictly faster** than g(n).

### Examples

✅ **n² is ω(n)**
```
lim (n²/n) = lim (n) = ∞
n→∞         n→∞
```

✅ **n² is ω(n log n)**

❌ **n is NOT ω(n)**

### When to Use Little-omega

- Even rarer than little-o
- Theoretical computer science
- Proving lower bounds strictly

---

## 📊 Notation Comparison Table

| Notation | Name | Meaning | Math Analogy | Common Use |
|----------|------|---------|--------------|------------|
| O(g(n)) | Big-O | Upper bound | ≤ | Worst case |
| Ω(g(n)) | Big-Omega | Lower bound | ≥ | Best case |
| Θ(g(n)) | Big-Theta | Tight bound | = | Exact growth |
| o(g(n)) | Little-o | Strict upper | < | Rare |
| ω(g(n)) | Little-omega | Strict lower | > | Very rare |

---

## 🎨 Practical Examples

### Example 1: Merge Sort

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)
```

**Analysis:**
- **Best case:** Ω(n log n) - Still divides and merges
- **Worst case:** O(n log n) - Always divides and merges
- **Tight bound:** Θ(n log n) - Always same complexity

**Best Description:** Θ(n log n)

### Example 2: Quick Sort

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)
```

**Analysis:**
- **Best case:** Ω(n log n) - Perfect pivot selection
- **Worst case:** O(n²) - Pivot is always min/max
- **Average case:** Θ(n log n) - Random pivots

**Descriptions:**
- O(n²) for worst case
- Ω(n log n) for best case
- Θ(n log n) for average case (with random pivots)

### Example 3: Binary Search

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

**Analysis:**
- **Best case:** Ω(1) - Target at middle
- **Worst case:** O(log n) - Target at leaf or not present
- **Average case:** Θ(log n)

**Most Common Description:** O(log n)

---

## 🧠 Which Notation Should You Use?

### In Practice (Industry)

**Use Big-O (O)** 95% of the time:
- Interviews ask "What's the Big-O?"
- Documentation uses Big-O
- Most useful for comparing algorithms

### In Academia

**Use Big-Theta (Θ)** when possible:
- More precise
- Shows exact growth rate
- Standard in research papers

### General Guidelines

| Situation | Use |
|-----------|-----|
| Describing worst-case | Big-O |
| Describing best-case | Big-Omega |
| Describing exact complexity | Big-Theta |
| Comparing algorithms | Big-O (usually) |
| Theoretical bounds | All notations |

---

## 🏋️ Practice Problems

### Problem 1: Identify the Notation

For this algorithm, determine O, Ω, and Θ:

```python
def count_elements(arr):
    count = 0
    for item in arr:
        count += 1
    return count
```

<details>
<summary>Solution</summary>

**Analysis:**
- Always loops n times
- Best case: n operations
- Worst case: n operations

**Answer:**
- O(n) - Upper bound
- Ω(n) - Lower bound
- Θ(n) - Tight bound (best description)
</details>

### Problem 2: Best vs Worst

For insertion sort, determine Big-O and Big-Omega:

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
```

<details>
<summary>Solution</summary>

**Best case (sorted array):**
- Inner while never runs
- Just n passes
- Ω(n)

**Worst case (reverse sorted):**
- Inner while runs i times for each i
- Total: 1 + 2 + 3 + ... + n = n²/2
- O(n²)

**Answer:**
- O(n²) - Worst case
- Ω(n) - Best case
- No Theta (best ≠ worst)
</details>

### Problem 3: True or False?

1. If f(n) = Θ(n²), then f(n) = O(n²) ✓ or ✗
2. If f(n) = O(n²), then f(n) = Θ(n²) ✓ or ✗
3. If f(n) = O(n) and f(n) = Ω(n), then f(n) = Θ(n) ✓ or ✗
4. O(n) and Ω(n²) is possible ✓ or ✗
5. Θ(n) means exactly n operations ✓ or ✗

<details>
<summary>Answers</summary>

1. ✓ (Theta implies Big-O)
2. ✗ (O is upper bound only, might be less)
3. ✓ (Definition of Theta)
4. ✗ (Contradictory: lower bound > upper bound)
5. ✗ (Means linear growth, could be 3n or 100n)
</details>

---

## 🎯 Key Takeaways

1. ✅ **Big-O (O)** - Upper bound, worst case, most commonly used
2. ✅ **Big-Omega (Ω)** - Lower bound, best case
3. ✅ **Big-Theta (Θ)** - Tight bound, exact growth rate
4. ✅ **Little-o, Little-omega** - Strict bounds, rarely used
5. ✅ In practice, use **Big-O**; in academia, prefer **Theta**

### Quick Decision Tree

```
Is best case = worst case?
├─ YES → Use Θ(n) (most precise)
└─ NO
   ├─ Describing worst case? → Use O(n)
   └─ Describing best case? → Use Ω(n)
```

---

## 🚀 What's Next?

Now that you understand all asymptotic notations, let's dive deep into **Time Complexity Analysis** with practical techniques for analyzing real code!

---

[← Previous: Big-O Notation](./02-Big-O-Notation.md) | [Back to README](./README.md) | [Next: Time Complexity Analysis →](./04-Time-Complexity-Analysis.md)
