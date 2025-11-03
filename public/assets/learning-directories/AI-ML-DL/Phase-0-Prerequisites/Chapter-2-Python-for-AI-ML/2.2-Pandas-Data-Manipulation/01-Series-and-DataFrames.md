# Series and DataFrames

## 📋 Overview

Pandas introduces two fundamental data structures: **Series** (1-dimensional) and **DataFrame** (2-dimensional). These structures are built on top of NumPy but provide much richer functionality for working with labeled, heterogeneous data.

---

## 1. Introduction to Pandas

### 1.1 Installation and Import

```python
# Install pandas
pip install pandas

# Import convention
import pandas as pd
import numpy as np

# Check version
print(pd.__version__)  # e.g., 2.0.0
```

### 1.2 Why Pandas?

**Advantages over NumPy:**
- ✅ Labels and indexes (row/column names)
- ✅ Handle missing data elegantly
- ✅ Mixed data types in columns
- ✅ SQL-like operations (join, merge, group by)
- ✅ Time series functionality
- ✅ Easy I/O with various formats

---

## 2. Pandas Series

### 2.1 Creating a Series

```python
# From list
s = pd.Series([10, 20, 30, 40, 50])
print(s)
# Output:
# 0    10
# 1    20
# 2    30
# 3    40
# 4    50
# dtype: int64

# With custom index
s = pd.Series([10, 20, 30, 40, 50], 
              index=['a', 'b', 'c', 'd', 'e'])
print(s)
# Output:
# a    10
# b    20
# c    30
# d    40
# e    50
# dtype: int64

# From dictionary
data = {'A': 10, 'B': 20, 'C': 30}
s = pd.Series(data)
print(s)
# Output:
# A    10
# B    20
# C    30
# dtype: int64

# From scalar value
s = pd.Series(5, index=['a', 'b', 'c'])
print(s)
# Output:
# a    5
# b    5
# c    5
# dtype: int64

# From NumPy array
arr = np.array([1, 2, 3, 4, 5])
s = pd.Series(arr, index=['v', 'w', 'x', 'y', 'z'])
```

### 2.2 Series Attributes

```python
s = pd.Series([10, 20, 30, 40, 50], 
              index=['a', 'b', 'c', 'd', 'e'],
              name='MySeries')

print(f"Values: {s.values}")      # NumPy array
print(f"Index: {s.index}")        # Index object
print(f"Name: {s.name}")          # 'MySeries'
print(f"Shape: {s.shape}")        # (5,)
print(f"Size: {s.size}")          # 5
print(f"Data type: {s.dtype}")    # dtype('int64')
```

### 2.3 Accessing Elements

```python
s = pd.Series([10, 20, 30, 40, 50], 
              index=['a', 'b', 'c', 'd', 'e'])

# By label
print(s['a'])       # 10
print(s['c'])       # 30

# By position
print(s[0])         # 10
print(s[2])         # 30

# Using .loc[] (label-based)
print(s.loc['b'])   # 20
print(s.loc['b':'d'])  # Range by label (inclusive!)
# Output:
# b    20
# c    30
# d    40

# Using .iloc[] (position-based)
print(s.iloc[1])    # 20
print(s.iloc[1:4])  # Range by position (exclusive!)
# Output:
# b    20
# c    30
# d    40

# Multiple labels
print(s[['a', 'c', 'e']])
# Output:
# a    10
# c    30
# e    50
```

### 2.4 Series Operations

```python
s = pd.Series([1, 2, 3, 4, 5], index=['a', 'b', 'c', 'd', 'e'])

# Arithmetic operations
print(s + 10)     # Add 10 to each
print(s * 2)      # Multiply by 2
print(s ** 2)     # Square each value

# Boolean indexing
print(s[s > 2])
# Output:
# c    3
# d    4
# e    5

# Statistical methods
print(s.mean())   # 3.0
print(s.std())    # 1.58...
print(s.sum())    # 15
print(s.min())    # 1
print(s.max())    # 5

# Aggregations
print(s.describe())
# Output:
# count    5.0
# mean     3.0
# std      1.58...
# min      1.0
# 25%      2.0
# 50%      3.0
# 75%      4.0
# max      5.0
```

### 2.5 Series Alignment

```python
# Automatic alignment by index
s1 = pd.Series([1, 2, 3], index=['a', 'b', 'c'])
s2 = pd.Series([4, 5, 6], index=['b', 'c', 'd'])

print(s1 + s2)
# Output:
# a    NaN
# b    6.0
# c    8.0
# d    NaN
# dtype: float64

# Fill missing values during operations
print(s1.add(s2, fill_value=0))
# Output:
# a    1.0
# b    6.0
# c    8.0
# d    6.0
```

---

## 3. Pandas DataFrame

### 3.1 Creating DataFrames

```python
# From dictionary of lists
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'David'],
    'Age': [25, 30, 35, 28],
    'City': ['NYC', 'LA', 'Chicago', 'Boston'],
    'Salary': [70000, 80000, 75000, 90000]
}
df = pd.DataFrame(data)
print(df)
# Output:
#       Name  Age     City  Salary
# 0    Alice   25      NYC   70000
# 1      Bob   30       LA   80000
# 2  Charlie   35  Chicago   75000
# 3    David   28   Boston   90000

# With custom index
df = pd.DataFrame(data, index=['emp1', 'emp2', 'emp3', 'emp4'])
print(df)

# From list of dictionaries
data = [
    {'Name': 'Alice', 'Age': 25, 'City': 'NYC'},
    {'Name': 'Bob', 'Age': 30, 'City': 'LA'},
    {'Name': 'Charlie', 'Age': 35, 'City': 'Chicago'}
]
df = pd.DataFrame(data)

# From NumPy array
arr = np.random.rand(4, 3)
df = pd.DataFrame(arr, 
                  columns=['A', 'B', 'C'],
                  index=['Row1', 'Row2', 'Row3', 'Row4'])

# From Series
s1 = pd.Series([1, 2, 3], name='Col1')
s2 = pd.Series([4, 5, 6], name='Col2')
df = pd.concat([s1, s2], axis=1)
print(df)
# Output:
#    Col1  Col2
# 0     1     4
# 1     2     5
# 2     3     6
```

### 3.2 DataFrame Attributes

```python
df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'Salary': [70000, 80000, 75000]
})

print(f"Shape: {df.shape}")           # (3, 3) - rows, columns
print(f"Size: {df.size}")             # 9 - total elements
print(f"Columns: {df.columns}")       # Index(['Name', 'Age', 'Salary'])
print(f"Index: {df.index}")           # RangeIndex(0, 3)
print(f"Data types:\n{df.dtypes}")    # Column types
print(f"Values:\n{df.values}")        # NumPy array
print(f"Number of dimensions: {df.ndim}")  # 2
```

### 3.3 Viewing Data

```python
df = pd.DataFrame({
    'A': range(1, 101),
    'B': range(101, 201),
    'C': range(201, 301)
})

# First/last rows
print(df.head())      # First 5 rows (default)
print(df.head(10))    # First 10 rows
print(df.tail())      # Last 5 rows
print(df.tail(3))     # Last 3 rows

# Sample random rows
print(df.sample(5))   # 5 random rows
print(df.sample(frac=0.1))  # 10% of rows

# Info about DataFrame
print(df.info())
# Output:
# <class 'pandas.core.frame.DataFrame'>
# RangeIndex: 100 entries, 0 to 99
# Data columns (total 3 columns):
#  #   Column  Non-Null Count  Dtype
# ---  ------  --------------  -----
#  0   A       100 non-null    int64
#  1   B       100 non-null    int64
#  2   C       100 non-null    int64

# Statistical summary
print(df.describe())
# Output:
#                A           B           C
# count  100.00000  100.000000  100.000000
# mean    50.50000  150.500000  250.500000
# std     29.01149   29.011491   29.011491
# min      1.00000  101.000000  201.000000
# 25%     25.75000  125.750000  225.750000
# 50%     50.50000  150.500000  250.500000
# 75%     75.25000  175.250000  275.250000
# max    100.00000  200.000000  300.000000
```

### 3.4 Selecting Columns

```python
df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie', 'David'],
    'Age': [25, 30, 35, 28],
    'City': ['NYC', 'LA', 'Chicago', 'Boston'],
    'Salary': [70000, 80000, 75000, 90000]
})

# Single column (returns Series)
print(df['Name'])
# Or
print(df.Name)  # Only works if column name is valid Python identifier

# Multiple columns (returns DataFrame)
print(df[['Name', 'Age']])
# Output:
#       Name  Age
# 0    Alice   25
# 1      Bob   30
# 2  Charlie   35
# 3    David   28

# Select by condition on column names
print(df[df.columns[df.columns.str.contains('a', case=False)]])
# Selects: Name, Salary (contain 'a')
```

### 3.5 Selecting Rows

```python
# By index position
print(df.iloc[0])         # First row as Series
print(df.iloc[1:3])       # Rows 1-2 as DataFrame

# By index label
df_indexed = df.set_index('Name')
print(df_indexed.loc['Alice'])    # Row with label 'Alice'
print(df_indexed.loc['Bob':'Charlie'])  # Range (inclusive)

# Boolean indexing
print(df[df['Age'] > 28])
# Output:
#       Name  Age     City  Salary
# 1      Bob   30       LA   80000
# 2  Charlie   35  Chicago   75000

# Multiple conditions
print(df[(df['Age'] > 25) & (df['Salary'] > 75000)])
# Output:
#    Name  Age     City  Salary
# 1   Bob   30       LA   80000
# 3 David   28   Boston   90000

# Query method (alternative)
print(df.query('Age > 25 and Salary > 75000'))
```

### 3.6 Selecting Rows and Columns

```python
# .loc[row_indexer, column_indexer]
print(df.loc[0, 'Name'])           # Single cell: 'Alice'
print(df.loc[0:2, 'Name':'Age'])   # Range of rows and columns
print(df.loc[df['Age'] > 28, ['Name', 'City']])  # Boolean + columns

# .iloc[row_position, column_position]
print(df.iloc[0, 0])               # First row, first column
print(df.iloc[0:2, 0:2])           # First 2 rows, first 2 columns
print(df.iloc[:, 1])               # All rows, second column

# .at[] and .iat[] - fast scalar access
print(df.at[0, 'Name'])            # Label-based
print(df.iat[0, 0])                # Position-based
```

### 3.7 Adding Columns

```python
df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'Salary': [70000, 80000, 75000]
})

# Add new column with scalar
df['Country'] = 'USA'

# Add from list
df['Bonus'] = [5000, 6000, 5500]

# Add from calculation
df['Total_Comp'] = df['Salary'] + df['Bonus']

# Add from function
df['Tax'] = df['Salary'] * 0.25

# Add from existing columns
df['Age_Group'] = df['Age'].apply(
    lambda x: 'Young' if x < 30 else 'Senior'
)

print(df)
# Output:
#       Name  Age  Salary Country  Bonus  Total_Comp      Tax Age_Group
# 0    Alice   25   70000     USA   5000       75000  17500.0     Young
# 1      Bob   30   80000     USA   6000       86000  20000.0    Senior
# 2  Charlie   35   75000     USA   5500       80500  18750.0    Senior
```

### 3.8 Deleting Columns and Rows

```python
# Delete column
df_new = df.drop('Bonus', axis=1)  # axis=1 for columns
# Or
df_new = df.drop(columns=['Bonus'])

# Delete multiple columns
df_new = df.drop(['Bonus', 'Tax'], axis=1)

# In-place deletion
df.drop('Bonus', axis=1, inplace=True)

# Delete row
df_new = df.drop(0)  # Delete row with index 0
df_new = df.drop([0, 2])  # Delete multiple rows

# Delete by condition
df_new = df[df['Age'] > 25]  # Keep only rows where Age > 25
```

### 3.9 Modifying Values

```python
# Modify single cell
df.at[0, 'Salary'] = 75000
# Or
df.loc[0, 'Salary'] = 75000

# Modify column
df['Salary'] = df['Salary'] * 1.1  # 10% raise

# Modify multiple cells
df.loc[df['Age'] < 30, 'Salary'] = 60000

# Modify with function
df['Name'] = df['Name'].str.upper()

# Replace values
df['City'] = df['City'].replace('NYC', 'New York')
df['Age'] = df['Age'].replace({25: 26, 30: 31})
```

---

## 4. Index Operations

### 4.1 Setting and Resetting Index

```python
df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['NYC', 'LA', 'Chicago']
})

# Set column as index
df_indexed = df.set_index('Name')
print(df_indexed)
# Output:
#          Age     City
# Name                 
# Alice     25      NYC
# Bob       30       LA
# Charlie   35  Chicago

# Reset index (move index to column)
df_reset = df_indexed.reset_index()
print(df_reset)
# Output:
#       Name  Age     City
# 0    Alice   25      NYC
# 1      Bob   30       LA
# 2  Charlie   35  Chicago

# Set index without dropping column
df_indexed2 = df.set_index('Name', drop=False)

# Multi-level index
df_multi = df.set_index(['City', 'Name'])
```

### 4.2 Sorting

```python
df = pd.DataFrame({
    'Name': ['Charlie', 'Alice', 'Bob'],
    'Age': [35, 25, 30],
    'Salary': [75000, 70000, 80000]
})

# Sort by index
df_sorted = df.sort_index()

# Sort by column
df_sorted = df.sort_values('Age')
print(df_sorted)
# Output:
#       Name  Age  Salary
# 1    Alice   25   70000
# 2      Bob   30   80000
# 0  Charlie   35   75000

# Sort by multiple columns
df_sorted = df.sort_values(['Age', 'Salary'], ascending=[True, False])

# Sort descending
df_sorted = df.sort_values('Age', ascending=False)

# In-place sorting
df.sort_values('Age', inplace=True)
```

---

## 5. Practical Examples

### Example 1: Employee Database

```python
# Create employee database
employees = pd.DataFrame({
    'EmployeeID': [101, 102, 103, 104, 105],
    'Name': ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
    'Department': ['IT', 'HR', 'IT', 'Finance', 'HR'],
    'Age': [25, 30, 35, 28, 32],
    'Salary': [70000, 60000, 85000, 75000, 65000],
    'YearsOfService': [2, 5, 8, 3, 6]
})

# Analysis
print("Average salary by department:")
print(employees.groupby('Department')['Salary'].mean())

print("\nEmployees earning above average:")
avg_salary = employees['Salary'].mean()
high_earners = employees[employees['Salary'] > avg_salary]
print(high_earners[['Name', 'Salary']])

print("\nSalary per year of service:")
employees['SalaryPerYear'] = employees['Salary'] / employees['YearsOfService']
print(employees[['Name', 'SalaryPerYear']].sort_values('SalaryPerYear', ascending=False))
```

### Example 2: Sales Data

```python
# Sales data
sales = pd.DataFrame({
    'Date': pd.date_range('2024-01-01', periods=10, freq='D'),
    'Product': ['A', 'B', 'A', 'C', 'B', 'A', 'C', 'B', 'A', 'C'],
    'Quantity': [10, 15, 12, 8, 20, 15, 10, 18, 11, 9],
    'Price': [100, 150, 100, 200, 150, 100, 200, 150, 100, 200]
})

sales['Revenue'] = sales['Quantity'] * sales['Price']

print("Total revenue by product:")
print(sales.groupby('Product')['Revenue'].sum().sort_values(ascending=False))

print("\nBest selling day:")
daily_revenue = sales.groupby('Date')['Revenue'].sum()
best_day = daily_revenue.idxmax()
print(f"{best_day}: ${daily_revenue[best_day]}")
```

---

## 🎯 Key Takeaways

1. **Series**: 1D labeled array, like a column in a spreadsheet
2. **DataFrame**: 2D labeled data structure, like a table
3. **loc[]**: Label-based indexing (inclusive ranges)
4. **iloc[]**: Position-based indexing (exclusive ranges)
5. **Automatic alignment** by index in operations
6. **Flexible creation** from various data sources
7. **Rich indexing** options for data selection

---

## 📝 Practice Exercises

1. Create a DataFrame from a dictionary with 5 employees and 4 attributes
2. Select all employees older than 30 with salary > 60000
3. Add a calculated column for age in months
4. Sort DataFrame by multiple columns
5. Create a multi-level index from two columns
6. Extract rows 2-5 and columns 'Name' and 'Salary'
7. Replace all occurrences of a specific value

---

## 🔗 Navigation

- **Previous**: [2.1 NumPy Mastery](../2.1-NumPy-Mastery/README.md)
- **Next**: [02 - Data Loading](./02-Data-Loading.md)
- **Up**: [2.2 Pandas Data Manipulation](./README.md)
