# 04 - Data Transformation and Aggregation

## 📋 Table of Contents
- [Introduction](#introduction)
- [GroupBy Operations](#groupby-operations)
- [Pivot Tables](#pivot-tables)
- [Merge and Join](#merge-and-join)
- [Concatenation](#concatenation)
- [Apply and Map Functions](#apply-and-map-functions)
- [Reshaping Data](#reshaping-data)
- [Window Functions](#window-functions)
- [Practice Exercises](#practice-exercises)

---

## Introduction

Data transformation is about reshaping, aggregating, and combining datasets to extract insights. Key operations include:

- **GroupBy**: Split-apply-combine pattern
- **Pivot**: Reshape data for analysis
- **Merge/Join**: Combine multiple datasets
- **Apply/Map**: Custom transformations
- **Reshape**: Melt and pivot operations

**Goal**: Transform data into formats that reveal patterns and enable analysis.

---

## GroupBy Operations

### Basic GroupBy

```python
import pandas as pd
import numpy as np

# Sample data
df = pd.DataFrame({
    'category': ['A', 'B', 'A', 'B', 'A', 'B'],
    'region': ['East', 'East', 'West', 'West', 'East', 'West'],
    'sales': [100, 150, 200, 250, 300, 350],
    'units': [10, 15, 20, 25, 30, 35]
})

# Group by single column
grouped = df.groupby('category')
print(grouped.sum())

# Group by multiple columns
grouped = df.groupby(['category', 'region'])
print(grouped.mean())

# Iterate through groups
for name, group in df.groupby('category'):
    print(f"\nCategory: {name}")
    print(group)

# Get specific group
group_a = df.groupby('category').get_group('A')
print(group_a)
```

### Aggregation Functions

```python
# Single aggregation
print(df.groupby('category')['sales'].sum())
print(df.groupby('category')['sales'].mean())
print(df.groupby('category')['sales'].count())

# Multiple aggregations
print(df.groupby('category').agg({
    'sales': 'sum',
    'units': 'mean'
}))

# Multiple functions on same column
print(df.groupby('category')['sales'].agg(['sum', 'mean', 'min', 'max', 'std']))

# Custom names for aggregations
print(df.groupby('category')['sales'].agg([
    ('total', 'sum'),
    ('average', 'mean'),
    ('count', 'count')
]))

# Different aggregations for different columns
print(df.groupby('category').agg({
    'sales': ['sum', 'mean'],
    'units': ['min', 'max']
}))
```

### Advanced GroupBy

```python
# Custom aggregation function
def range_func(x):
    return x.max() - x.min()

print(df.groupby('category')['sales'].agg(range_func))

# Multiple custom functions
print(df.groupby('category')['sales'].agg([
    ('total', 'sum'),
    ('range', range_func),
    ('cv', lambda x: x.std() / x.mean())  # Coefficient of variation
]))

# Transform (keep same shape)
df['sales_normalized'] = df.groupby('category')['sales'].transform(
    lambda x: (x - x.mean()) / x.std()
)

# Filter groups
# Keep only groups where sales sum > 500
filtered = df.groupby('category').filter(lambda x: x['sales'].sum() > 500)

# Apply custom function to groups
def custom_analysis(group):
    result = pd.Series({
        'total_sales': group['sales'].sum(),
        'avg_units': group['units'].mean(),
        'sales_per_unit': group['sales'].sum() / group['units'].sum()
    })
    return result

result = df.groupby('category').apply(custom_analysis)
print(result)
```

### GroupBy with Time Series

```python
# Sample time series data
dates = pd.date_range('2023-01-01', periods=100, freq='D')
df_time = pd.DataFrame({
    'date': dates,
    'sales': np.random.randint(100, 1000, 100),
    'category': np.random.choice(['A', 'B', 'C'], 100)
})

# Group by date components
df_time['month'] = df_time['date'].dt.month
monthly_sales = df_time.groupby('month')['sales'].sum()

# Resample (group by time periods)
df_time.set_index('date', inplace=True)
weekly_sales = df_time.resample('W')['sales'].sum()
monthly_avg = df_time.resample('M')['sales'].mean()

# Group by multiple time components
df_time.reset_index(inplace=True)
df_time['year'] = df_time['date'].dt.year
df_time['month'] = df_time['date'].dt.month
monthly_by_cat = df_time.groupby(['year', 'month', 'category'])['sales'].sum()
```

---

## Pivot Tables

### Basic Pivot

```python
# Sample data
df = pd.DataFrame({
    'date': pd.date_range('2023-01-01', periods=12, freq='M'),
    'category': ['A', 'B', 'A', 'B'] * 3,
    'region': ['East', 'East', 'West', 'West'] * 3,
    'sales': np.random.randint(100, 500, 12)
})

# Simple pivot
pivot = pd.pivot_table(
    df,
    values='sales',
    index='category',
    columns='region',
    aggfunc='sum'
)
print(pivot)

# Multiple indices
pivot = pd.pivot_table(
    df,
    values='sales',
    index=['category', df['date'].dt.month],
    columns='region',
    aggfunc='sum'
)
print(pivot)

# Multiple value columns
pivot = pd.pivot_table(
    df,
    values=['sales', 'units'],
    index='category',
    columns='region',
    aggfunc='sum'
)

# Multiple aggregation functions
pivot = pd.pivot_table(
    df,
    values='sales',
    index='category',
    columns='region',
    aggfunc=['sum', 'mean', 'count']
)

# Add margins (totals)
pivot = pd.pivot_table(
    df,
    values='sales',
    index='category',
    columns='region',
    aggfunc='sum',
    margins=True,
    margins_name='Total'
)
```

### Cross-tabulation

```python
# Frequency table
ct = pd.crosstab(df['category'], df['region'])
print(ct)

# With values
ct = pd.crosstab(
    df['category'],
    df['region'],
    values=df['sales'],
    aggfunc='sum'
)

# Normalize (percentages)
ct_pct = pd.crosstab(
    df['category'],
    df['region'],
    normalize='all'  # or 'index', 'columns'
)

# Multiple indices
ct = pd.crosstab(
    [df['category'], df['date'].dt.quarter],
    df['region']
)
```

---

## Merge and Join

### Basic Merge

```python
# Sample dataframes
df1 = pd.DataFrame({
    'user_id': [1, 2, 3, 4],
    'name': ['Alice', 'Bob', 'Charlie', 'David']
})

df2 = pd.DataFrame({
    'user_id': [1, 2, 3, 5],
    'age': [25, 30, 35, 40]
})

# Inner join (default)
merged = pd.merge(df1, df2, on='user_id')
print(merged)

# Left join
merged = pd.merge(df1, df2, on='user_id', how='left')

# Right join
merged = pd.merge(df1, df2, on='user_id', how='right')

# Outer join
merged = pd.merge(df1, df2, on='user_id', how='outer')

# Merge on multiple columns
merged = pd.merge(df1, df2, on=['user_id', 'region'])

# Merge with different column names
df1 = pd.DataFrame({'id': [1, 2, 3], 'name': ['A', 'B', 'C']})
df2 = pd.DataFrame({'user_id': [1, 2, 4], 'age': [25, 30, 35]})
merged = pd.merge(df1, df2, left_on='id', right_on='user_id')

# Merge with suffixes
merged = pd.merge(
    df1, df2,
    on='user_id',
    suffixes=('_left', '_right')
)

# Indicator column (shows merge type)
merged = pd.merge(
    df1, df2,
    on='user_id',
    how='outer',
    indicator=True
)
```

### Index-based Joins

```python
# Join on index
df1 = pd.DataFrame({'A': [1, 2, 3]}, index=['a', 'b', 'c'])
df2 = pd.DataFrame({'B': [4, 5, 6]}, index=['a', 'b', 'd'])

# Using join
joined = df1.join(df2, how='inner')

# Merge on index
merged = pd.merge(
    df1, df2,
    left_index=True,
    right_index=True,
    how='outer'
)
```

### Complex Merges

```python
# Multiple dataframes
df1 = pd.DataFrame({'id': [1, 2, 3], 'a': ['x', 'y', 'z']})
df2 = pd.DataFrame({'id': [1, 2, 3], 'b': ['p', 'q', 'r']})
df3 = pd.DataFrame({'id': [1, 2, 3], 'c': ['m', 'n', 'o']})

# Chain merges
result = df1.merge(df2, on='id').merge(df3, on='id')

# Using reduce (functional approach)
from functools import reduce
dfs = [df1, df2, df3]
result = reduce(lambda left, right: pd.merge(left, right, on='id'), dfs)

# Merge with validation
merged = pd.merge(
    df1, df2,
    on='id',
    validate='one_to_one'  # or 'one_to_many', 'many_to_one', 'many_to_many'
)
```

---

## Concatenation

### Basic Concatenation

```python
# Vertical concatenation (stack rows)
df1 = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})
df2 = pd.DataFrame({'A': [5, 6], 'B': [7, 8]})
result = pd.concat([df1, df2], ignore_index=True)

# Horizontal concatenation (add columns)
df1 = pd.DataFrame({'A': [1, 2, 3]})
df2 = pd.DataFrame({'B': [4, 5, 6]})
result = pd.concat([df1, df2], axis=1)

# With keys (create multi-index)
result = pd.concat([df1, df2], keys=['first', 'second'])

# Handle mismatched columns
df1 = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})
df2 = pd.DataFrame({'B': [5, 6], 'C': [7, 8]})
result = pd.concat([df1, df2])  # NaN for missing

# Inner join (only common columns)
result = pd.concat([df1, df2], join='inner')
```

### Append (deprecated, use concat)

```python
# Old way (deprecated)
# df = df.append(new_row, ignore_index=True)

# New way
new_row = pd.DataFrame({'A': [9], 'B': [10]})
df = pd.concat([df, new_row], ignore_index=True)
```

---

## Apply and Map Functions

### Apply Function

```python
# Apply to Series
df = pd.DataFrame({'A': [1, 2, 3, 4], 'B': [5, 6, 7, 8]})

# Apply lambda
df['A_squared'] = df['A'].apply(lambda x: x ** 2)

# Apply custom function
def categorize(value):
    if value < 3:
        return 'Low'
    elif value < 6:
        return 'Medium'
    else:
        return 'High'

df['category'] = df['B'].apply(categorize)

# Apply to DataFrame (axis=0 for columns, axis=1 for rows)
df['sum'] = df.apply(lambda row: row['A'] + row['B'], axis=1)

# Apply function returning Series
def stats(row):
    return pd.Series({
        'sum': row['A'] + row['B'],
        'product': row['A'] * row['B']
    })

result = df.apply(stats, axis=1)

# Apply to specific columns
df[['A', 'B']] = df[['A', 'B']].apply(lambda x: x * 2)
```

### Map Function

```python
# Map dictionary
mapping = {1: 'one', 2: 'two', 3: 'three', 4: 'four'}
df['A_text'] = df['A'].map(mapping)

# Map function
df['A_doubled'] = df['A'].map(lambda x: x * 2)

# Map with Series
mapping_series = pd.Series({1: 'a', 2: 'b', 3: 'c', 4: 'd'})
df['mapped'] = df['A'].map(mapping_series)

# Replace (similar to map but handles unmapped values)
df['A_replaced'] = df['A'].replace({1: 10, 2: 20, 3: 30})
```

### applymap (element-wise)

```python
# Apply function to every element
df_numeric = df[['A', 'B']]
df_formatted = df_numeric.applymap(lambda x: f"${x:.2f}")

# Modern alternative (map for DataFrame)
df_formatted = df_numeric.map(lambda x: f"${x:.2f}")
```

### Transform

```python
# Transform (must return same shape)
df['A_normalized'] = df.groupby('category')['A'].transform(
    lambda x: (x - x.mean()) / x.std()
)

# Rank within groups
df['rank'] = df.groupby('category')['B'].transform('rank')
```

---

## Reshaping Data

### Melt (Wide to Long)

```python
# Wide format
df_wide = pd.DataFrame({
    'id': [1, 2, 3],
    '2020': [100, 150, 200],
    '2021': [110, 160, 210],
    '2022': [120, 170, 220]
})

# Convert to long format
df_long = pd.melt(
    df_wide,
    id_vars=['id'],
    value_vars=['2020', '2021', '2022'],
    var_name='year',
    value_name='value'
)
print(df_long)
```

### Pivot (Long to Wide)

```python
# Long format
df_long = pd.DataFrame({
    'id': [1, 1, 1, 2, 2, 2],
    'year': ['2020', '2021', '2022', '2020', '2021', '2022'],
    'value': [100, 110, 120, 150, 160, 170]
})

# Convert to wide format
df_wide = df_long.pivot(
    index='id',
    columns='year',
    values='value'
)
print(df_wide)
```

### Stack and Unstack

```python
# Stack (wide to long)
df = pd.DataFrame({
    'A': [1, 2, 3],
    'B': [4, 5, 6]
}, index=['a', 'b', 'c'])

stacked = df.stack()  # Series with MultiIndex

# Unstack (long to wide)
unstacked = stacked.unstack()  # Back to DataFrame

# Unstack specific level (for MultiIndex)
df_multi = df.set_index([df.index, 'category'])
unstacked = df_multi.unstack(level='category')
```

---

## Window Functions

### Rolling Windows

```python
# Sample time series
dates = pd.date_range('2023-01-01', periods=100, freq='D')
df = pd.DataFrame({
    'date': dates,
    'value': np.random.randn(100).cumsum()
})
df.set_index('date', inplace=True)

# Rolling mean
df['rolling_mean'] = df['value'].rolling(window=7).mean()

# Rolling with different functions
df['rolling_std'] = df['value'].rolling(window=7).std()
df['rolling_min'] = df['value'].rolling(window=7).min()
df['rolling_max'] = df['value'].rolling(window=7).max()

# Custom rolling function
df['rolling_range'] = df['value'].rolling(window=7).apply(
    lambda x: x.max() - x.min()
)

# Center the window
df['rolling_centered'] = df['value'].rolling(window=7, center=True).mean()
```

### Expanding Windows

```python
# Expanding mean (cumulative average)
df['expanding_mean'] = df['value'].expanding().mean()

# Expanding sum (cumulative sum)
df['cumsum'] = df['value'].cumsum()

# Expanding with min_periods
df['expanding_std'] = df['value'].expanding(min_periods=10).std()
```

### Exponential Weighted Functions

```python
# Exponential moving average
df['ewm'] = df['value'].ewm(span=10).mean()

# Exponential weighted std
df['ewm_std'] = df['value'].ewm(span=10).std()

# With adjust parameter
df['ewm_adjusted'] = df['value'].ewm(span=10, adjust=False).mean()
```

---

## Practice Exercises

### Exercise 1: Sales Analysis

```python
# Sample sales data
sales = pd.DataFrame({
    'date': pd.date_range('2023-01-01', periods=365, freq='D'),
    'product': np.random.choice(['A', 'B', 'C', 'D'], 365),
    'region': np.random.choice(['North', 'South', 'East', 'West'], 365),
    'sales': np.random.randint(100, 1000, 365),
    'units': np.random.randint(1, 50, 365)
})

# Tasks:
# 1. Calculate monthly sales by product
monthly_product = sales.groupby([sales['date'].dt.to_period('M'), 'product'])['sales'].sum()

# 2. Create pivot table: products vs regions
pivot = pd.pivot_table(
    sales,
    values='sales',
    index='product',
    columns='region',
    aggfunc='sum'
)

# 3. Calculate rolling 7-day average
sales_sorted = sales.sort_values('date')
sales_sorted['rolling_avg'] = sales_sorted.groupby('product')['sales'].rolling(7).mean().reset_index(drop=True)

# 4. Find top product by region
top_by_region = sales.groupby(['region', 'product'])['sales'].sum().groupby('region').idxmax()
```

### Exercise 2: Customer Analysis

```python
# Sample customer and orders data
customers = pd.DataFrame({
    'customer_id': [1, 2, 3, 4, 5],
    'name': ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
    'segment': ['Premium', 'Regular', 'Premium', 'Regular', 'Premium']
})

orders = pd.DataFrame({
    'order_id': range(1, 21),
    'customer_id': np.random.choice([1, 2, 3, 4, 5], 20),
    'date': pd.date_range('2023-01-01', periods=20, freq='W'),
    'amount': np.random.randint(50, 500, 20)
})

# Tasks:
# 1. Merge customers and orders
customer_orders = pd.merge(orders, customers, on='customer_id')

# 2. Calculate total spending per customer
total_spending = customer_orders.groupby('name')['amount'].sum()

# 3. Calculate average order value by segment
avg_by_segment = customer_orders.groupby('segment')['amount'].mean()

# 4. Find customers with >3 orders
frequent_customers = customer_orders.groupby('customer_id').filter(
    lambda x: len(x) > 3
)['name'].unique()
```

### Exercise 3: Time Series Transformation

```python
# Generate time series data
dates = pd.date_range('2023-01-01', periods=365, freq='D')
ts_data = pd.DataFrame({
    'date': dates,
    'value': np.random.randn(365).cumsum() + 100
})
ts_data.set_index('date', inplace=True)

# Tasks:
# 1. Calculate 30-day moving average
ts_data['ma_30'] = ts_data['value'].rolling(30).mean()

# 2. Calculate month-over-month change
ts_data['monthly'] = ts_data['value'].resample('M').mean()
ts_data['mom_change'] = ts_data['monthly'].pct_change()

# 3. Detect outliers (>2 std from rolling mean)
rolling_mean = ts_data['value'].rolling(30).mean()
rolling_std = ts_data['value'].rolling(30).std()
ts_data['is_outlier'] = np.abs(ts_data['value'] - rolling_mean) > 2 * rolling_std

# 4. Calculate cumulative sum
ts_data['cumsum'] = ts_data['value'].cumsum()
```

---

## Key Takeaways

1. **GroupBy**: Split-apply-combine for aggregation
2. **Pivot**: Reshape data for cross-tabular analysis
3. **Merge**: Combine datasets like SQL joins
4. **Concat**: Stack dataframes vertically or horizontally
5. **Apply/Map**: Custom transformations
6. **Reshape**: Convert between wide and long formats
7. **Window Functions**: Time series analysis

---

## 🔗 Navigation

- **Previous**: [03 - Data Cleaning](./03-Data-Cleaning.md)
- **Next**: [05 - Time Series](./05-Time-Series.md)
- **Up**: [Section 2.2 Pandas](./README.md)
