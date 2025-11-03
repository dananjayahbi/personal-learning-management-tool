# 09. Best, Average, and Worst Case Analysis

## 🎯 Understanding Different Cases

The same algorithm can have different complexities depending on the input. Understanding these cases helps you:
- Set realistic expectations
- Choose the right algorithm for your data
- Optimize for common scenarios

---

## 📊 The Three Cases

### Best Case - Ω(g(n))
**The minimum time/operations the algorithm requires.**
- Most favorable input
- Lower bound on performance
- Uses Big-Omega (Ω) notation

### Average Case - Θ(g(n))
**The expected time/operations for typical input.**
- Assuming random or typical data
- Most practical measure
- Uses Big-Theta (Θ) notation

### Worst Case - O(g(n))
**The maximum time/operations the algorithm requires.**
- Most unfavorable input
- Upper bound on performance
- Uses Big-O (O) notation
- **Most commonly reported**

---

## 1️⃣ Linear Search

### Algorithm
```python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1
```

### Analysis by Case

**Best Case: Ω(1)**
- **Scenario:** Target is the first element
- **Example:** `arr = [5, 2, 8, 1]`, `target = 5`
- **Operations:** 1 comparison
- **Complexity:** Ω(1)

**Average Case: Θ(n)**
- **Scenario:** Target somewhere in middle (or not present)
- **Probability:** If target at position k, we check k elements
- **Expected:** (1 + 2 + 3 + ... + n) / n = (n+1)/2 ≈ n/2
- **Complexity:** Θ(n)

**Worst Case: O(n)**
- **Scenario:** Target is last element or not in array
- **Example:** `arr = [5, 2, 8, 1]`, `target = 1` or `target = 99`
- **Operations:** n comparisons
- **Complexity:** O(n)

### Summary
```
Best:    Ω(1)    ────●
Average: Θ(n)    ─────────────●
Worst:   O(n)    ──────────────────────●
                 Fast            Slow
```

---

## 2️⃣ Binary Search

### Algorithm
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

### Analysis by Case

**Best Case: Ω(1)**
- **Scenario:** Target is the middle element
- **Example:** `arr = [1, 2, 3, 4, 5]`, `target = 3`
- **Operations:** 1 comparison
- **Complexity:** Ω(1)

**Average Case: Θ(log n)**
- **Scenario:** Target somewhere in array
- **Expected depth:** log₂(n)
- **Complexity:** Θ(log n)

**Worst Case: O(log n)**
- **Scenario:** Target at leaf level or not present
- **Maximum depth:** log₂(n)
- **Complexity:** O(log n)

### Summary
```
Best:    Ω(1)      ●
Average: Θ(log n)  ───●
Worst:   O(log n)  ───●
```

**Note:** Average and worst are the same! Binary search is **consistently fast**.

---

## 3️⃣ Insertion Sort

### Algorithm
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

### Analysis by Case

**Best Case: Ω(n)**
- **Scenario:** Array is already sorted
- **Example:** `arr = [1, 2, 3, 4, 5]`
- **Inner loop:** Never executes (arr[j] ≤ key always)
- **Operations:** Just n passes, no swaps
- **Complexity:** Ω(n)

**Average Case: Θ(n²)**
- **Scenario:** Random order
- **Expected:** Each element moves halfway back on average
- **Operations:** (n²)/4 comparisons on average
- **Complexity:** Θ(n²)

**Worst Case: O(n²)**
- **Scenario:** Array is reverse sorted
- **Example:** `arr = [5, 4, 3, 2, 1]`
- **Inner loop:** Each element moves to beginning
- **Operations:** 1 + 2 + 3 + ... + (n-1) = n(n-1)/2
- **Complexity:** O(n²)

### Summary
```
Best:    Ω(n)   ──────●
Average: Θ(n²)  ──────────────────●
Worst:   O(n²)  ──────────────────────────●
```

**Use case:** Great for **nearly sorted** data!

---

## 4️⃣ Quick Sort

### Algorithm
```python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quicksort(left) + middle + quicksort(right)
```

### Analysis by Case

**Best Case: Ω(n log n)**
- **Scenario:** Pivot always splits array evenly
- **Example:** Pivot is always median
- **Tree depth:** log n
- **Work per level:** n
- **Complexity:** Ω(n log n)

**Average Case: Θ(n log n)**
- **Scenario:** Random pivot selection
- **Expected depth:** log n (on average)
- **Complexity:** Θ(n log n)

**Worst Case: O(n²)**
- **Scenario:** Pivot is always smallest or largest
- **Example:** Already sorted array with first/last as pivot
- **Tree depth:** n (completely unbalanced)
- **Operations:** n + (n-1) + (n-2) + ... + 1 = n²/2
- **Complexity:** O(n²)

### Summary
```
Best:    Ω(n log n)  ─────────●
Average: Θ(n log n)  ─────────●
Worst:   O(n²)       ───────────────────────●
```

**Optimization:** Use **randomized pivot** to avoid worst case!

---

## 5️⃣ Merge Sort

### Algorithm
```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)
```

### Analysis by Case

**Best Case: Ω(n log n)**
- **Scenario:** Any input (always divides evenly)
- **Tree depth:** log n
- **Work per level:** n
- **Complexity:** Ω(n log n)

**Average Case: Θ(n log n)**
- **Same as best/worst**
- **Complexity:** Θ(n log n)

**Worst Case: O(n log n)**
- **Scenario:** Any input
- **Always same complexity**
- **Complexity:** O(n log n)

### Summary
```
Best:    Ω(n log n)  ●
Average: Θ(n log n)  ●
Worst:   O(n log n)  ●
```

**All cases identical!** Merge sort is **predictably fast**.

---

## 6️⃣ Hash Table Operations

### Insert/Search/Delete

**Best Case: Ω(1)**
- **Scenario:** No collisions
- **Good hash function distributes keys evenly**
- **Complexity:** Ω(1)

**Average Case: Θ(1)**
- **Scenario:** Few collisions, good load factor
- **With chaining: O(1 + α) where α = load factor**
- **Typically α < 1**
- **Complexity:** Θ(1)

**Worst Case: O(n)**
- **Scenario:** All keys hash to same bucket
- **Terrible hash function or adversarial input**
- **Degrades to linked list**
- **Complexity:** O(n)

---

## 📊 Comparison Table

| Algorithm | Best | Average | Worst | Notes |
|-----------|------|---------|-------|-------|
| **Searching** |
| Linear Search | Ω(1) | Θ(n) | O(n) | Best if found first |
| Binary Search | Ω(1) | Θ(log n) | O(log n) | Needs sorted array |
| **Sorting** |
| Bubble Sort | Ω(n) | Θ(n²) | O(n²) | Optimized with flag |
| Insertion Sort | Ω(n) | Θ(n²) | O(n²) | Great for nearly sorted |
| Selection Sort | Ω(n²) | Θ(n²) | O(n²) | Always same |
| Merge Sort | Ω(n log n) | Θ(n log n) | O(n log n) | Consistent |
| Quick Sort | Ω(n log n) | Θ(n log n) | O(n²) | Randomize to avoid worst |
| Heap Sort | Ω(n log n) | Θ(n log n) | O(n log n) | Consistent |
| **Data Structures** |
| Hash Table | Ω(1) | Θ(1) | O(n) | Depends on collisions |
| BST Search | Ω(log n) | Θ(log n) | O(n) | Worst if unbalanced |
| AVL Tree | Ω(log n) | Θ(log n) | O(log n) | Always balanced |

---

## 🎯 When Each Case Matters

### When to Consider Best Case

❌ **Rarely useful alone**
- Can be misleading (best ≠ typical)
- Don't make decisions based on best case

✅ **Useful when:**
- Algorithm has early exit conditions
- Checking if data is already optimized
- Explaining why "sometimes it's fast"

### When to Consider Average Case

✅ **Most practical**
- Represents typical performance
- Good for real-world predictions

✅ **Use when:**
- Input is random or unknown
- Making performance predictions
- Comparing algorithms for typical use

### When to Consider Worst Case

✅ **Most commonly reported**
- Guarantees algorithm won't be slower
- Safe for critical systems

✅ **Use when:**
- Need reliability guarantees
- Real-time systems
- Safety-critical applications
- **Interview contexts** (default assumption)

---

## 🧮 Practice Problems

### Problem 1: Find Max

```python
def find_max(arr):
    max_val = arr[0]
    for num in arr:
        if num > max_val:
            max_val = num
    return max_val
```

<details>
<summary>Analyze All Cases</summary>

**Best Case:** Ω(n)
- Even if max is first, must check all elements
- No early exit possible

**Average Case:** Θ(n)
- Always checks all n elements

**Worst Case:** O(n)
- Always checks all n elements

**All cases are the same: Θ(n)**
</details>

### Problem 2: Optimized Bubble Sort

```python
def bubble_sort_optimized(arr):
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

<details>
<summary>Analyze All Cases</summary>

**Best Case:** Ω(n)
- Array already sorted
- One pass, no swaps, breaks immediately

**Average Case:** Θ(n²)
- Random order requires multiple passes

**Worst Case:** O(n²)
- Reverse sorted, maximum swaps
</details>

---

## 🎯 Key Takeaways

1. ✅ **Best case** uses Ω, **average** uses Θ, **worst** uses O
2. ✅ **Worst case** most commonly reported and useful
3. ✅ Some algorithms (merge sort) have **same complexity all cases**
4. ✅ Others vary greatly (quick sort, insertion sort)
5. ✅ **Average case** most practical for typical use
6. ✅ **Choose algorithm based on expected input characteristics**

### Decision Guide

```
Is input random/unknown?
├─ YES → Focus on average case
└─ NO
   ├─ Nearly sorted? → Insertion sort (O(n) best case)
   ├─ Need guarantee? → Merge sort (O(n log n) always)
   └─ Want fastest average? → Quick sort (but O(n²) worst)
```

---

[← Previous: Recursion Complexity](./08-Recursion-Complexity.md) | [Back to README](./README.md) | [Next: Amortized Analysis →](./10-Amortized-Analysis.md)
