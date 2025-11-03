# 05 - Performance Optimization for Python and ML

## 📋 Table of Contents
- [Introduction](#introduction)
- [Profiling](#profiling)
- [Vectorization](#vectorization)
- [Numba JIT Compilation](#numba-jit-compilation)
- [Parallel Processing](#parallel-processing)
- [Memory Optimization](#memory-optimization)
- [Algorithm Optimization](#algorithm-optimization)
- [Practice Exercises](#practice-exercises)

---

## Introduction

Performance optimization is crucial for handling large datasets and complex models efficiently.

---

## Profiling

### timeit Module

```python
import timeit

# Time single execution
def slow_function():
    return sum(range(1000000))

time_taken = timeit.timeit(slow_function, number=100)
print(f"Average time: {time_taken/100:.6f} seconds")

# Compare approaches
setup = "import numpy as np; data = list(range(1000))"

python_loop = "sum([x**2 for x in data])"
numpy_op = "np.array(data)**2).sum()"

print(f"Python loop: {timeit.timeit(python_loop, setup=setup, number=1000):.4f}s")
print(f"NumPy: {timeit.timeit(numpy_op, setup=setup, number=1000):.4f}s")
```

### cProfile

```python
import cProfile
import pstats
from pstats import SortKey

def expensive_function():
    result = []
    for i in range(10000):
        result.append(i ** 2)
    return result

# Profile code
profiler = cProfile.Profile()
profiler.enable()

expensive_function()

profiler.disable()

# Print stats
stats = pstats.Stats(profiler)
stats.sort_stats(SortKey.TIME)
stats.print_stats(10)  # Top 10 functions

# Save to file
# stats.dump_stats('profile.prof')
```

### line_profiler

```python
# Install: pip install line_profiler

# Use as decorator
from line_profiler import LineProfiler

def process_data(data):
    result = []
    for item in data:
        processed = item * 2
        result.append(processed)
    return result

# Profile
lp = LineProfiler()
lp.add_function(process_data)
lp_wrapper = lp(process_data)

data = list(range(10000))
lp_wrapper(data)

lp.print_stats()

# Or via command line:
# kernprof -l -v script.py
```

### memory_profiler

```python
# Install: pip install memory_profiler

from memory_profiler import profile

@profile
def memory_intensive():
    a = [i for i in range(1000000)]
    b = [i**2 for i in range(1000000)]
    c = [a[i] + b[i] for i in range(1000000)]
    return c

# Run: python -m memory_profiler script.py
```

---

## Vectorization

### Avoid Loops

```python
import numpy as np
import time

# ❌ Slow: Python loop
def python_loop(n):
    result = []
    for i in range(n):
        result.append(i ** 2)
    return result

# ✅ Fast: NumPy vectorization
def numpy_vectorized(n):
    return np.arange(n) ** 2

n = 1000000

# Benchmark
start = time.time()
python_result = python_loop(n)
python_time = time.time() - start

start = time.time()
numpy_result = numpy_vectorized(n)
numpy_time = time.time() - start

print(f"Python loop: {python_time:.4f}s")
print(f"NumPy: {numpy_time:.4f}s")
print(f"Speedup: {python_time/numpy_time:.1f}x")
```

### Broadcasting

```python
import numpy as np

# Normalize each column
data = np.random.rand(1000, 100)

# ❌ Slow: Loop over columns
normalized = np.zeros_like(data)
for i in range(data.shape[1]):
    normalized[:, i] = (data[:, i] - data[:, i].mean()) / data[:, i].std()

# ✅ Fast: Broadcasting
mean = data.mean(axis=0)
std = data.std(axis=0)
normalized = (data - mean) / std
```

### Vectorized Functions

```python
import numpy as np

# Custom function
def custom_func(x):
    if x < 0:
        return x ** 2
    else:
        return np.sqrt(x)

# ❌ Slow: Apply to each element
data = np.random.randn(10000)
result = [custom_func(x) for x in data]

# ✅ Fast: Vectorize function
vectorized_func = np.vectorize(custom_func)
result = vectorized_func(data)

# ✅ Faster: Use NumPy operations
result = np.where(data < 0, data ** 2, np.sqrt(np.abs(data)))
```

---

## Numba JIT Compilation

### Basic JIT

```python
# Install: pip install numba
from numba import jit
import numpy as np
import time

# Regular Python function
def python_func(n):
    result = 0
    for i in range(n):
        result += i ** 2
    return result

# JIT-compiled function
@jit
def numba_func(n):
    result = 0
    for i in range(n):
        result += i ** 2
    return result

n = 10000000

# Benchmark
start = time.time()
py_result = python_func(n)
py_time = time.time() - start

start = time.time()
nb_result = numba_func(n)
nb_time = time.time() - start

# Second call (warm)
start = time.time()
nb_result = numba_func(n)
nb_time_warm = time.time() - start

print(f"Python: {py_time:.4f}s")
print(f"Numba (first): {nb_time:.4f}s")
print(f"Numba (warm): {nb_time_warm:.4f}s")
print(f"Speedup: {py_time/nb_time_warm:.1f}x")
```

### nopython Mode

```python
from numba import njit  # Same as @jit(nopython=True)

@njit
def fast_function(x):
    # Pure Python subset - no Python objects
    total = 0
    for i in range(len(x)):
        total += x[i] ** 2
    return total

data = np.random.rand(1000000)
result = fast_function(data)
```

### Parallel Execution

```python
from numba import njit, prange

@njit(parallel=True)
def parallel_sum(arr):
    total = 0
    for i in prange(len(arr)):  # Parallel loop
        total += arr[i] ** 2
    return total

data = np.random.rand(10000000)
result = parallel_sum(data)
```

### Matrix Operations

```python
from numba import njit
import numpy as np

@njit
def matrix_multiply(A, B):
    m, n = A.shape
    n, p = B.shape
    C = np.zeros((m, p))
    
    for i in range(m):
        for j in range(p):
            for k in range(n):
                C[i, j] += A[i, k] * B[k, j]
    
    return C

A = np.random.rand(500, 500)
B = np.random.rand(500, 500)

# Still slower than numpy.dot for this size
# But useful for custom operations
```

---

## Parallel Processing

### multiprocessing

```python
from multiprocessing import Pool
import time

def expensive_function(x):
    time.sleep(0.1)
    return x ** 2

# Serial
start = time.time()
results = [expensive_function(i) for i in range(10)]
serial_time = time.time() - start

# Parallel
start = time.time()
with Pool(processes=4) as pool:
    results = pool.map(expensive_function, range(10))
parallel_time = time.time() - start

print(f"Serial: {serial_time:.2f}s")
print(f"Parallel: {parallel_time:.2f}s")
print(f"Speedup: {serial_time/parallel_time:.1f}x")
```

### joblib

```python
from joblib import Parallel, delayed
import time

def process_item(x):
    time.sleep(0.1)
    return x ** 2

# Serial
results = [process_item(i) for i in range(10)]

# Parallel
results = Parallel(n_jobs=4)(
    delayed(process_item)(i) for i in range(10)
)

# With progress bar
from joblib import Parallel, delayed
from tqdm import tqdm

results = Parallel(n_jobs=4)(
    delayed(process_item)(i) for i in tqdm(range(100))
)
```

### concurrent.futures

```python
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor
import time

def cpu_bound(x):
    return sum(i**2 for i in range(x))

def io_bound(x):
    time.sleep(0.1)
    return x

# CPU-bound: Use ProcessPoolExecutor
with ProcessPoolExecutor(max_workers=4) as executor:
    results = list(executor.map(cpu_bound, [1000000] * 8))

# I/O-bound: Use ThreadPoolExecutor
with ThreadPoolExecutor(max_workers=10) as executor:
    results = list(executor.map(io_bound, range(10)))
```

---

## Memory Optimization

### Data Types

```python
import numpy as np

# Default: int64, float64
data_64 = np.random.rand(1000, 1000)
print(f"float64: {data_64.nbytes / 1e6:.2f} MB")

# Reduce precision
data_32 = data_64.astype(np.float32)
print(f"float32: {data_32.nbytes / 1e6:.2f} MB")
print(f"Memory saved: {(1 - data_32.nbytes/data_64.nbytes)*100:.1f}%")

# Integer types
int_data = np.arange(1000000)
print(f"int64: {int_data.nbytes / 1e6:.2f} MB")

int_data_8 = int_data.astype(np.int8)  # -128 to 127
print(f"int8: {int_data_8.nbytes / 1e6:.2f} MB")
```

### Pandas Optimization

```python
import pandas as pd
import numpy as np

# Create sample data
df = pd.DataFrame({
    'id': np.arange(1000000),
    'category': np.random.choice(['A', 'B', 'C'], 1000000),
    'value': np.random.rand(1000000)
})

print("Before optimization:")
print(df.memory_usage(deep=True))

# Optimize dtypes
df['id'] = df['id'].astype('int32')
df['category'] = df['category'].astype('category')
df['value'] = df['value'].astype('float32')

print("\nAfter optimization:")
print(df.memory_usage(deep=True))
```

### Sparse Data

```python
from scipy.sparse import csr_matrix
import numpy as np

# Dense matrix (mostly zeros)
dense = np.zeros((10000, 10000))
dense[::100, ::100] = 1

print(f"Dense: {dense.nbytes / 1e6:.2f} MB")

# Sparse matrix
sparse = csr_matrix(dense)
print(f"Sparse: {sparse.data.nbytes / 1e6:.2f} MB")
```

### Generators vs Lists

```python
import sys

# List (all in memory)
list_data = [i**2 for i in range(1000000)]
print(f"List: {sys.getsizeof(list_data) / 1e6:.2f} MB")

# Generator (one at a time)
gen_data = (i**2 for i in range(1000000))
print(f"Generator: {sys.getsizeof(gen_data) / 1e6:.6f} MB")

# Use generator for iteration
total = sum(i**2 for i in range(1000000))
```

---

## Algorithm Optimization

### Choose Right Algorithm

```python
import numpy as np
import time

# Problem: Find unique elements

# ❌ Slow: O(n²)
def unique_slow(data):
    result = []
    for item in data:
        if item not in result:
            result.append(item)
    return result

# ✅ Fast: O(n)
def unique_fast(data):
    return list(set(data))

# ✅ NumPy: Optimized
def unique_numpy(data):
    return np.unique(data)

data = np.random.randint(0, 1000, 10000).tolist()

# Benchmark
start = time.time()
unique_slow(data)
slow_time = time.time() - start

start = time.time()
unique_fast(data)
fast_time = time.time() - start

print(f"Slow: {slow_time:.4f}s")
print(f"Fast: {fast_time:.4f}s")
print(f"Speedup: {slow_time/fast_time:.1f}x")
```

### Use Built-in Functions

```python
import numpy as np

data = np.random.rand(1000000)

# ❌ Slow
total = sum([x for x in data])

# ✅ Fast
total = np.sum(data)

# ✅ Fastest
total = data.sum()
```

### Caching

```python
from functools import lru_cache

# Without caching
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# With caching
@lru_cache(maxsize=None)
def fibonacci_cached(n):
    if n < 2:
        return n
    return fibonacci_cached(n-1) + fibonacci_cached(n-2)

# fibonacci(35) is slow
# fibonacci_cached(35) is instant
```

---

## Practice Exercises

### Exercise 1: Profile and Optimize
```python
# Profile this code and optimize it:
def slow_process(data):
    result = []
    for i in range(len(data)):
        temp = []
        for j in range(len(data)):
            temp.append(data[i] * data[j])
        result.append(sum(temp))
    return result
```

### Exercise 2: Vectorize
```python
# Convert to vectorized NumPy:
def process_rows(matrix):
    result = []
    for row in matrix:
        result.append(sum(row) / len(row))
    return result
```

### Exercise 3: Parallelize
```python
# Parallelize this:
def train_models(data_list):
    models = []
    for data in data_list:
        model = train_model(data)
        models.append(model)
    return models
```

---

## Key Takeaways

1. **Profile first**: Measure before optimizing
2. **Vectorize**: Use NumPy instead of loops
3. **Numba**: JIT compile for speed
4. **Parallel**: Use multiple cores
5. **Memory**: Choose appropriate data types
6. **Algorithm**: Choose efficient algorithms
7. **Cache**: Reuse expensive computations
8. **Built-ins**: Use optimized library functions

---

## 🔗 Navigation

- **Previous**: [04 - Debugging Techniques](./04-Debugging-Techniques.md)
- **Next**: [06 - Memory Management](./06-Memory-Management.md)
- **Up**: [2.5 Best Practices](./README.md)
