# 06 - Memory Management for Python and ML

## 📋 Table of Contents
- [Introduction](#introduction)
- [Memory Monitoring](#memory-monitoring)
- [Efficient Data Types](#efficient-data-types)
- [Generators and Iterators](#generators-and-iterators)
- [Chunking Large Data](#chunking-large-data)
- [Garbage Collection](#garbage-collection)
- [Best Practices](#best-practices)
- [Practice Exercises](#practice-exercises)

---

## Introduction

Efficient memory management is essential when working with large datasets and models.

---

## Memory Monitoring

### sys.getsizeof()

```python
import sys
import numpy as np

# Basic types
x = 42
print(f"int: {sys.getsizeof(x)} bytes")

# Collections
list_data = list(range(1000))
print(f"list: {sys.getsizeof(list_data)} bytes")

# NumPy array
array_data = np.arange(1000)
print(f"numpy array: {array_data.nbytes} bytes")

# Deep size (including contents)
def get_deep_size(obj, seen=None):
    """Calculate deep size of object"""
    size = sys.getsizeof(obj)
    if seen is None:
        seen = set()
    
    obj_id = id(obj)
    if obj_id in seen:
        return 0
    
    seen.add(obj_id)
    
    if isinstance(obj, dict):
        size += sum(get_deep_size(v, seen) for v in obj.values())
        size += sum(get_deep_size(k, seen) for k in obj.keys())
    elif hasattr(obj, '__dict__'):
        size += get_deep_size(obj.__dict__, seen)
    elif hasattr(obj, '__iter__') and not isinstance(obj, (str, bytes, bytearray)):
        size += sum(get_deep_size(i, seen) for i in obj)
    
    return size

nested_data = {'a': [1, 2, 3], 'b': {'c': [4, 5, 6]}}
print(f"Deep size: {get_deep_size(nested_data)} bytes")
```

### memory_profiler

```python
# Install: pip install memory_profiler

from memory_profiler import profile

@profile
def memory_intensive_function():
    # Large list
    a = [i for i in range(1000000)]
    
    # Another large list
    b = [i**2 for i in range(1000000)]
    
    # Combine
    c = [a[i] + b[i] for i in range(1000000)]
    
    return c

# Run: python -m memory_profiler script.py
# Output shows line-by-line memory usage
```

### tracemalloc

```python
import tracemalloc
import numpy as np

# Start tracing
tracemalloc.start()

# Your code
data = []
for i in range(1000):
    data.append(np.random.rand(1000, 1000))

# Get memory usage
current, peak = tracemalloc.get_traced_memory()
print(f"Current: {current / 1e6:.2f} MB")
print(f"Peak: {peak / 1e6:.2f} MB")

# Stop tracing
tracemalloc.stop()

# Get top memory consumers
tracemalloc.start()

# ... your code ...

snapshot = tracemalloc.take_snapshot()
top_stats = snapshot.statistics('lineno')

print("Top 3 memory consumers:")
for stat in top_stats[:3]:
    print(stat)

tracemalloc.stop()
```

---

## Efficient Data Types

### NumPy Data Types

```python
import numpy as np

# Float types
float64 = np.random.rand(1000, 1000)  # 8 bytes per element
float32 = np.random.rand(1000, 1000).astype(np.float32)  # 4 bytes
float16 = np.random.rand(1000, 1000).astype(np.float16)  # 2 bytes

print(f"float64: {float64.nbytes / 1e6:.2f} MB")
print(f"float32: {float32.nbytes / 1e6:.2f} MB")
print(f"float16: {float16.nbytes / 1e6:.2f} MB")

# Integer types
int64 = np.arange(1000000)  # 8 bytes per element
int32 = np.arange(1000000).astype(np.int32)  # 4 bytes
int16 = np.arange(1000).astype(np.int16)  # 2 bytes
int8 = np.arange(100).astype(np.int8)  # 1 byte (-128 to 127)
uint8 = np.arange(256).astype(np.uint8)  # 1 byte (0 to 255)

print(f"int64: {int64.nbytes / 1e6:.2f} MB")
print(f"int32: {int32.nbytes / 1e6:.2f} MB")
```

### Pandas Data Types

```python
import pandas as pd
import numpy as np

# Create sample dataframe
df = pd.DataFrame({
    'id': range(1000000),
    'category': np.random.choice(['A', 'B', 'C', 'D'], 1000000),
    'value': np.random.rand(1000000),
    'flag': np.random.choice([True, False], 1000000)
})

print("Original memory usage:")
print(df.memory_usage(deep=True))
print(f"Total: {df.memory_usage(deep=True).sum() / 1e6:.2f} MB\n")

# Optimize data types
def optimize_dtypes(df):
    """Optimize DataFrame data types"""
    df_opt = df.copy()
    
    # Integers
    for col in df_opt.select_dtypes(include=['int']).columns:
        col_min = df_opt[col].min()
        col_max = df_opt[col].max()
        
        if col_min >= 0:
            if col_max < 255:
                df_opt[col] = df_opt[col].astype(np.uint8)
            elif col_max < 65535:
                df_opt[col] = df_opt[col].astype(np.uint16)
            elif col_max < 4294967295:
                df_opt[col] = df_opt[col].astype(np.uint32)
        else:
            if col_min > np.iinfo(np.int8).min and col_max < np.iinfo(np.int8).max:
                df_opt[col] = df_opt[col].astype(np.int8)
            elif col_min > np.iinfo(np.int16).min and col_max < np.iinfo(np.int16).max:
                df_opt[col] = df_opt[col].astype(np.int16)
            elif col_min > np.iinfo(np.int32).min and col_max < np.iinfo(np.int32).max:
                df_opt[col] = df_opt[col].astype(np.int32)
    
    # Floats
    for col in df_opt.select_dtypes(include=['float']).columns:
        df_opt[col] = df_opt[col].astype(np.float32)
    
    # Objects (strings)
    for col in df_opt.select_dtypes(include=['object']).columns:
        num_unique = df_opt[col].nunique()
        num_total = len(df_opt[col])
        if num_unique / num_total < 0.5:  # Less than 50% unique
            df_opt[col] = df_opt[col].astype('category')
    
    return df_opt

df_optimized = optimize_dtypes(df)

print("Optimized memory usage:")
print(df_optimized.memory_usage(deep=True))
print(f"Total: {df_optimized.memory_usage(deep=True).sum() / 1e6:.2f} MB")

reduction = (1 - df_optimized.memory_usage(deep=True).sum() / df.memory_usage(deep=True).sum()) * 100
print(f"\nMemory reduced by: {reduction:.1f}%")
```

### Sparse Data

```python
import pandas as pd
import numpy as np
from scipy.sparse import csr_matrix

# Dense data (mostly zeros)
dense = np.zeros((10000, 10000))
dense[::100, ::100] = 1

print(f"Dense matrix: {dense.nbytes / 1e6:.2f} MB")

# Sparse matrix
sparse = csr_matrix(dense)
print(f"Sparse matrix: {(sparse.data.nbytes + sparse.indices.nbytes + sparse.indptr.nbytes) / 1e6:.2f} MB")

# Pandas sparse
df_dense = pd.DataFrame(np.zeros((10000, 100)))
df_dense.iloc[::100, ::10] = 1

print(f"\nDense DataFrame: {df_dense.memory_usage(deep=True).sum() / 1e6:.2f} MB")

df_sparse = df_dense.astype(pd.SparseDtype(float, fill_value=0))
print(f"Sparse DataFrame: {df_sparse.memory_usage(deep=True).sum() / 1e6:.2f} MB")
```

---

## Generators and Iterators

### Basic Generators

```python
import sys

# List comprehension (all in memory)
list_squares = [x**2 for x in range(1000000)]
print(f"List: {sys.getsizeof(list_squares) / 1e6:.2f} MB")

# Generator (one at a time)
gen_squares = (x**2 for x in range(1000000))
print(f"Generator: {sys.getsizeof(gen_squares) / 1e6:.6f} MB")

# Using generator
total = sum(x**2 for x in range(1000000))
```

### Generator Functions

```python
def data_generator(filename, chunk_size=1000):
    """Generate data in chunks"""
    with open(filename, 'r') as f:
        chunk = []
        for line in f:
            chunk.append(line.strip())
            if len(chunk) == chunk_size:
                yield chunk
                chunk = []
        if chunk:
            yield chunk

# Use generator
# for chunk in data_generator('large_file.txt'):
#     process(chunk)
```

### Iterator Protocol

```python
class DataIterator:
    """Custom iterator for large datasets"""
    
    def __init__(self, data, batch_size=32):
        self.data = data
        self.batch_size = batch_size
        self.index = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.index >= len(self.data):
            raise StopIteration
        
        batch = self.data[self.index:self.index + self.batch_size]
        self.index += self.batch_size
        return batch

# Usage
data = list(range(1000))
iterator = DataIterator(data, batch_size=100)

for batch in iterator:
    process(batch)
```

---

## Chunking Large Data

### Pandas Chunking

```python
import pandas as pd

# Read large CSV in chunks
chunk_size = 10000
chunks = []

for chunk in pd.read_csv('large_file.csv', chunksize=chunk_size):
    # Process chunk
    processed = chunk[chunk['value'] > 0]
    chunks.append(processed)

# Combine if needed
result = pd.concat(chunks, ignore_index=True)

# Or process without storing
total = 0
for chunk in pd.read_csv('large_file.csv', chunksize=chunk_size):
    total += chunk['value'].sum()

print(f"Total: {total}")
```

### Dask for Large Data

```python
# Install: pip install dask
import dask.dataframe as dd

# Read large CSV with Dask
df = dd.read_csv('large_file.csv')

# Operations are lazy (not executed yet)
result = df[df['value'] > 0].groupby('category')['value'].mean()

# Compute result
result_computed = result.compute()

# Dask uses chunks automatically
print(f"Number of partitions: {df.npartitions}")
```

### Memory-Mapped Files

```python
import numpy as np

# Create large array on disk
data = np.memmap('large_array.dat', dtype='float32', mode='w+', shape=(10000, 10000))

# Fill with data (written to disk)
data[:] = np.random.rand(10000, 10000)
data.flush()

# Later, read without loading all into memory
data = np.memmap('large_array.dat', dtype='float32', mode='r', shape=(10000, 10000))

# Access parts as needed
chunk = data[0:1000, 0:1000]
```

---

## Garbage Collection

### Manual Garbage Collection

```python
import gc

# Disable automatic GC
gc.disable()

# Your memory-intensive code
data = []
for i in range(1000):
    data.append(np.random.rand(1000, 1000))

# Manually trigger GC
gc.collect()

# Re-enable automatic GC
gc.enable()
```

### Reference Counting

```python
import sys

# Check reference count
x = [1, 2, 3]
print(f"References: {sys.getrefcount(x)}")  # Includes function call

# Create another reference
y = x
print(f"References: {sys.getrefcount(x)}")

# Delete reference
del y
print(f"References: {sys.getrefcount(x)}")
```

### Breaking Circular References

```python
import gc

class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

# Create circular reference
node1 = Node(1)
node2 = Node(2)
node1.next = node2
node2.next = node1  # Circular!

# Delete nodes
del node1
del node2

# Force garbage collection
gc.collect()

# Better: Use weak references
import weakref

class Node:
    def __init__(self, value):
        self.value = value
        self._next = None
    
    @property
    def next(self):
        return self._next() if self._next else None
    
    @next.setter
    def next(self, node):
        self._next = weakref.ref(node) if node else None
```

---

## Best Practices

### Delete Unused Objects

```python
import numpy as np

# Create large object
large_data = np.random.rand(10000, 10000)

# Use it
result = process(large_data)

# Delete when done
del large_data

# More explicit
import gc
gc.collect()
```

### Use Context Managers

```python
import numpy as np

class TempArray:
    """Context manager for temporary arrays"""
    
    def __init__(self, shape):
        self.shape = shape
        self.array = None
    
    def __enter__(self):
        self.array = np.zeros(self.shape)
        return self.array
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        del self.array
        import gc
        gc.collect()

# Usage
with TempArray((10000, 10000)) as temp:
    result = process(temp)
# temp is automatically deleted
```

### Profile Memory Usage

```python
import tracemalloc
import numpy as np

def memory_hungry_function():
    tracemalloc.start()
    
    # Start snapshot
    snapshot1 = tracemalloc.take_snapshot()
    
    # Allocate memory
    data = []
    for i in range(100):
        data.append(np.random.rand(1000, 1000))
    
    # End snapshot
    snapshot2 = tracemalloc.take_snapshot()
    
    # Compare
    top_stats = snapshot2.compare_to(snapshot1, 'lineno')
    
    print("Top memory allocations:")
    for stat in top_stats[:5]:
        print(stat)
    
    tracemalloc.stop()

memory_hungry_function()
```

---

## Practice Exercises

### Exercise 1: Optimize DataFrame
```python
# Optimize memory usage of this DataFrame:
df = pd.DataFrame({
    'id': range(1000000),
    'category': np.random.choice(['A', 'B', 'C'], 1000000),
    'subcategory': np.random.choice(['X', 'Y'], 1000000),
    'value': np.random.rand(1000000),
    'count': np.random.randint(0, 100, 1000000)
})

# Goal: Reduce memory by >50%
```

### Exercise 2: Process Large File
```python
# Process a 10GB CSV file without loading all into memory
# Calculate mean of 'value' column

def process_large_csv(filename):
    # Your code here
    pass
```

### Exercise 3: Memory-Efficient Training
```python
# Implement generator for batch training
def data_generator(X, y, batch_size=32):
    # Your code here
    pass

# Train model with generator
# for batch_X, batch_y in data_generator(X, y):
#     model.train_on_batch(batch_X, batch_y)
```

---

## Key Takeaways

1. **Monitor**: Use profiling tools
2. **Data types**: Choose appropriate sizes
3. **Generators**: Use for large sequences
4. **Chunking**: Process data in pieces
5. **Sparse**: For mostly-zero data
6. **Delete**: Remove unused objects
7. **GC**: Understand garbage collection
8. **Profile**: Find memory bottlenecks

---

## 🔗 Navigation

- **Previous**: [05 - Performance Optimization](./05-Performance-Optimization.md)
- **Next**: [Chapter 3 - Coming Soon](../../Phase-1-Machine-Learning/README.md)
- **Up**: [2.5 Best Practices](./README.md)

---

## ✅ Chapter 2 Complete!

Congratulations! You've completed **Chapter 2: Python for AI/ML**. You've learned:

- **NumPy**: Array operations and linear algebra
- **Pandas**: Data manipulation and analysis
- **Visualization**: Matplotlib and Seaborn
- **SciPy**: Scientific computing
- **Best Practices**: Code organization, debugging, optimization, and memory management

**Next**: Move on to Phase 1 - Machine Learning fundamentals!
