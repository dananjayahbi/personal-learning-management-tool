# 10. Amortized Analysis

## 🎯 What is Amortized Analysis?

**Amortized Analysis** averages the time taken by a sequence of operations, even when individual operations may be expensive.

**Key Idea:** Some operations are expensive, but they happen rarely. When averaged over many operations, the cost per operation is low.

---

## 🤔 Why Amortized Analysis?

Sometimes worst-case analysis is too pessimistic. Consider:

```python
operations = []
for i in range(1000):
    operations.append(i)  # Usually fast, occasionally slow
```

- **Most** appends are O(1)
- **Occasionally** need to resize (expensive)
- **Amortized:** O(1) per operation

---

## 📊 Classic Example: Dynamic Array

### How Dynamic Arrays Work

```python
class DynamicArray:
    def __init__(self):
        self.capacity = 1
        self.size = 0
        self.array = [None] * self.capacity
    
    def append(self, item):
        if self.size == self.capacity:
            # EXPENSIVE: Resize and copy
            self._resize()
        
        self.array[self.size] = item
        self.size += 1
    
    def _resize(self):
        # Double the capacity
        self.capacity *= 2
        new_array = [None] * self.capacity
        
        # Copy all elements (expensive!)
        for i in range(self.size):
            new_array[i] = self.array[i]
        
        self.array = new_array
```

### Individual Operation Analysis

**Normal append:** O(1)
- Just add to end

**Resize append:** O(n)
- Copy all n elements to new array
- Happens when size = capacity

### Sequence of Appends

Let's append n elements:

```
n=1:  [_] → append 1 → [1] (no resize)
n=2:  [1,_] → append 2 → [1,2] (no resize)
n=3:  RESIZE to 4 → [1,2,_,_] → [1,2,3,_]
n=4:  [1,2,3,_] → [1,2,3,4] (no resize)
n=5:  RESIZE to 8 → [1,2,3,4,_,_,_,_] → [1,2,3,4,5,_,_,_]
...
```

**Resizes happen at:** n = 2, 4, 8, 16, 32, ...

**Cost analysis for n appends:**
- Most appends: 1 operation
- Resize at 2: copy 1 element
- Resize at 4: copy 2 elements
- Resize at 8: copy 4 elements
- Resize at 16: copy 8 elements
- ...

**Total cost:** n + (1 + 2 + 4 + 8 + ... + n/2)
= n + (n - 1)
= 2n - 1

**Amortized cost per operation:** (2n - 1) / n ≈ 2 = **O(1)**

---

## 🎨 Three Methods of Amortized Analysis

### 1. Aggregate Method

**Count total cost of n operations, divide by n.**

**Example: Dynamic Array**

```
n appends total cost = 2n - 1
Amortized cost per append = (2n - 1) / n = O(1)
```

**Example: Stack with Multi-Pop**

```python
class Stack:
    def push(self, item):
        # O(1)
        pass
    
    def pop(self):
        # O(1)
        pass
    
    def multipop(self, k):
        # Pop k elements or until empty
        for _ in range(min(k, len(stack))):
            self.pop()
        # Worst case: O(n)
```

**Analysis:**
- n pushes: cost n
- m multipops: can't pop more than what was pushed
- Total: at most 2n (n pushes + n pops)
- Amortized: O(1) per operation

---

### 2. Accounting Method

**Assign different "charges" to operations to pay for expensive ones later.**

**Think of it like a bank account:**
- Cheap operations pay extra (save credits)
- Expensive operations use saved credits

**Example: Dynamic Array**

Charge each append: **3 credits**

```
Normal append (cost 1):
- Use 1 credit for insertion
- Save 2 credits for future resize

When resize happens (cost n):
- Use saved 2n credits (from previous n appends)
- Perfectly pays for copying n elements!
```

**Proof:**
- Each append charged: 3
- n appends: 3n total charges
- Actual work: n normal appends + n copies = 2n
- 3n ≥ 2n ✓

**Amortized cost:** 3 = **O(1)**

---

### 3. Potential Method

**Use a "potential function" to measure stored energy in the data structure.**

**Φ(D)** = potential of data structure D

**Amortized cost** = actual cost + Δpotential

**Example: Dynamic Array**

Define potential:
```
Φ = 2 × size - capacity
```

**Analysis:**

Normal append (no resize):
```
Before: size = s, capacity = c
After: size = s+1, capacity = c

Actual cost: 1
ΔΦ = [2(s+1) - c] - [2s - c] = 2

Amortized cost = 1 + 2 = 3 = O(1)
```

Resize append:
```
Before: size = s, capacity = s (full)
After: size = s+1, capacity = 2s

Actual cost: s + 1 (copy s + insert 1)
ΔΦ = [2(s+1) - 2s] - [2s - s] 
   = [2s + 2 - 2s] - [s]
   = 2 - s

Amortized cost = (s+1) + (2-s) = 3 = O(1)
```

---

## 💡 More Examples

### Example 1: Binary Counter

```python
def increment_binary(counter):
    i = 0
    while i < len(counter) and counter[i] == 1:
        counter[i] = 0  # Flip 1 to 0
        i += 1
    
    if i < len(counter):
        counter[i] = 1  # Flip 0 to 1
```

**Worst case for single increment:** O(k) where k = number of bits
- Flipping 01111...1 to 10000...0 flips k bits

**Amortized analysis (aggregate):**
- n increments on k-bit counter
- Bit 0 flips n times
- Bit 1 flips n/2 times
- Bit 2 flips n/4 times
- ...
- Total flips: n(1 + 1/2 + 1/4 + ...) < 2n

**Amortized cost:** 2n / n = **O(1)** per increment

---

### Example 2: Disjoint Set Union (Union-Find)

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x):
        # Path compression
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        # Union by rank
        px, py = self.find(x), self.find(y)
        if px == py:
            return
        
        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1
```

**Single operation worst case:** O(log n)

**Amortized with path compression:** O(α(n))
- α(n) = inverse Ackermann function
- Grows **incredibly slowly**
- Practically constant: α(n) ≤ 4 for all reasonable n

---

### Example 3: Splay Tree

**Splay trees** move accessed elements to root.

**Single operation:** O(n) worst case
- Long chain of nodes

**Amortized:** O(log n)
- Expensive operations restructure tree
- Future operations become cheaper
- Averaged over sequence: O(log n)

---

## 📊 When to Use Amortized Analysis

✅ **Use when:**
- Expensive operations are rare
- Expensive operations make future operations cheaper
- Analyzing sequences of operations
- Data structures with occasional resizing/restructuring

❌ **Don't use when:**
- Need guaranteed per-operation bound
- Real-time systems (can't tolerate occasional spikes)
- Security-critical (timing attacks)

---

## 🧮 Practice Problems

### Problem 1: Stack with Clear

```python
class Stack:
    def push(self, item):     # O(1)
        pass
    
    def pop(self):            # O(1)
        pass
    
    def clear(self):          # O(n)
        # Remove all elements
        pass
```

What's the amortized cost if we do n pushes and 1 clear?

<details>
<summary>Solution</summary>

**Aggregate method:**
- n pushes: cost n
- 1 clear: cost n
- Total: 2n for (n+1) operations
- Amortized: 2n / (n+1) ≈ 2 = **O(1)**

**Note:** Each element pushed must eventually be cleared.
</details>

### Problem 2: Growing Array with Triple

Array triples in size instead of doubling. What's the amortized cost?

<details>
<summary>Solution</summary>

**Resizes at:** 3, 9, 27, 81, ... (powers of 3)

**Total cost for n appends:**
- n normal appends
- Copies: 1 + 3 + 9 + 27 + ... ≈ (3^k - 1) / 2
  where 3^k ≈ n
- Geometric series: ≈ (n - 1) / 2 = O(n)

**Total:** n + n/2 = 1.5n

**Amortized:** **O(1)**

**Observation:** Doubling, tripling, or any constant multiplier gives O(1) amortized!
</details>

---

## 🎯 Key Takeaways

1. ✅ **Amortized analysis** averages over sequence of operations
2. ✅ **O(1) amortized ≠ O(1) worst case** for single operation
3. ✅ **Three methods:**
   - Aggregate (total / n)
   - Accounting (credit system)
   - Potential (energy function)
4. ✅ **Use for:** Dynamic arrays, certain data structures
5. ✅ **Don't use for:** Real-time systems, guaranteed bounds
6. ✅ **Dynamic array append:** O(1) amortized despite O(n) resizes

### Comparison

| Analysis | Guarantees | Use Case |
|----------|------------|----------|
| Worst Case | Per-operation guarantee | Real-time, critical systems |
| Amortized | Average over sequence | General-purpose, typical use |
| Average Case | Expected on random input | Probabilistic scenarios |

---

## 💡 Real-World Applications

**Dynamic Arrays:** Python lists, Java ArrayList, C++ vector
**Hash Tables:** With resizing
**Union-Find:** With path compression
**Splay Trees:** Self-adjusting BST
**Fibonacci Heap:** Decrease-key operation

---

[← Previous: Best/Average/Worst Case](./09-Best-Average-Worst-Case.md) | [Back to README](./README.md) | [Next: Practice Problems →](./11-Practice-Problems.md)
