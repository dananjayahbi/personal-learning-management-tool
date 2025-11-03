# 2.2 Pandas for Data Manipulation

## 📋 Overview

Pandas is the most popular library for data manipulation and analysis in Python. Built on top of NumPy, it provides high-level data structures and functions designed to make working with structured data fast, easy, and expressive.

**Why Pandas is Essential:**
- 📊 **Industry Standard**: Used in 90%+ of data science projects
- 🔧 **Versatile**: Handle any tabular data format
- ⚡ **Efficient**: Optimized for performance
- 🎯 **Intuitive**: SQL-like and spreadsheet-like operations
- 🌐 **Integrated**: Works seamlessly with NumPy, Matplotlib, scikit-learn

---

## 🎯 Learning Objectives

- Master Series and DataFrame data structures
- Load data from multiple sources (CSV, Excel, SQL, APIs)
- Clean messy real-world datasets
- Transform data for analysis and modeling
- Work with time series data effectively
- Apply split-apply-combine patterns
- Optimize Pandas operations for performance

---

## 📚 Topics

### [01 - Series and DataFrames](./01-Series-and-DataFrames.md) ✅
**Core Data Structures**

- Creating Series and DataFrames from various sources
- Understanding indexes and labels
- Selecting, filtering, and modifying data
- `.loc[]` vs `.iloc[]` indexing
- Adding and deleting columns/rows
- Sorting and ranking
- **Practice**: 7 exercises

**Time**: 1 day | **Completed** ✅

---

### [02 - Data Loading](./02-Data-Loading.md)
**Getting Data Into Pandas**

- Reading CSV files (`read_csv()`)
- Reading Excel files (`read_excel()`)
- Reading from SQL databases
- Reading JSON and XML
- Reading from web APIs
- Reading from clipboard and URLs
- Handling different encodings and delimiters
- **Practice**: 6 exercises

**Key Functions**: `read_csv()`, `read_excel()`, `read_sql()`, `read_json()`, `read_html()`

**Time**: 1 day

---

### [03 - Data Cleaning](./03-Data-Cleaning.md)
**Handling Messy Data**

- Identifying and handling missing values (NaN, None, NULL)
- Removing and filling missing data
- Detecting and removing duplicates
- Data type conversion and validation
- Handling outliers
- String cleaning and manipulation
- Renaming columns and indexes
- **Practice**: 8 exercises

**Key Functions**: `isna()`, `dropna()`, `fillna()`, `drop_duplicates()`, `astype()`, `replace()`

**Time**: 1 day

---

### [04 - Data Transformation](./04-Data-Transformation.md)
**Reshaping and Combining Data**

- Filtering with boolean indexing
- Applying functions (`.apply()`, `.map()`, `.applymap()`)
- GroupBy operations (split-apply-combine)
- Aggregation functions
- Merging and joining DataFrames
- Concatenating DataFrames
- Pivot tables and reshaping
- Melting and stacking
- **Practice**: 10 exercises

**Key Functions**: `groupby()`, `merge()`, `join()`, `concat()`, `pivot_table()`, `melt()`

**Time**: 2 days

---

### [05 - Time Series](./05-Time-Series.md)
**Working with Temporal Data**

- Creating datetime objects
- Parsing dates from strings
- DatetimeIndex and PeriodIndex
- Resampling and frequency conversion
- Rolling windows and expanding windows
- Time zone handling
- Lag and lead operations
- Date range generation
- **Practice**: 6 exercises

**Key Functions**: `to_datetime()`, `resample()`, `rolling()`, `shift()`, `date_range()`

**Time**: 1 day

---

## 🏆 Real-World Applications

### 1. **Data Cleaning Pipeline**
```python
# Load, clean, and prepare data
df = pd.read_csv('messy_data.csv')
df = df.drop_duplicates()
df = df.dropna(subset=['important_column'])
df['date'] = pd.to_datetime(df['date'])
df = df.sort_values('date')
```

### 2. **Exploratory Data Analysis**
```python
# Quick statistics and insights
print(df.describe())
print(df['category'].value_counts())
print(df.groupby('category')['value'].agg(['mean', 'std', 'count']))
```

### 3. **Feature Engineering**
```python
# Create new features
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day_of_week'] = df['date'].dt.dayofweek
df['price_per_unit'] = df['total_price'] / df['quantity']
```

### 4. **Data Aggregation**
```python
# Group and aggregate
summary = df.groupby(['category', 'region']).agg({
    'sales': ['sum', 'mean'],
    'quantity': 'sum',
    'customer_id': 'nunique'
}).reset_index()
```

---

## 🔧 Essential Pandas Patterns

### Pattern 1: Method Chaining
```python
# Clean and transform in one pipeline
result = (df
    .query('age > 18')
    .drop_duplicates()
    .assign(age_group=lambda x: pd.cut(x['age'], bins=[18, 30, 50, 100]))
    .groupby('age_group')['income']
    .mean()
)
```

### Pattern 2: Boolean Indexing
```python
# Complex filtering
mask = (df['age'] > 25) & (df['income'] > 50000) & (df['city'].isin(['NYC', 'LA']))
filtered = df[mask]
```

### Pattern 3: GroupBy-Apply
```python
# Custom aggregations
def custom_stats(group):
    return pd.Series({
        'mean': group.mean(),
        'std': group.std(),
        'range': group.max() - group.min()
    })

result = df.groupby('category')['value'].apply(custom_stats)
```

### Pattern 4: Pivot and Melt
```python
# Wide to long
df_long = df.melt(id_vars=['id', 'date'], 
                   value_vars=['metric1', 'metric2', 'metric3'],
                   var_name='metric', value_name='value')

# Long to wide
df_wide = df_long.pivot(index='date', columns='metric', values='value')
```

---

## 📊 Pandas vs Other Tools

| Task | Pandas | SQL | Excel | R |
|------|--------|-----|-------|---|
| Load CSV | ⚡⚡⚡ | ⚡⚡ | ⚡⚡ | ⚡⚡⚡ |
| Clean data | ⚡⚡⚡ | ⚡⚡ | ⚡ | ⚡⚡⚡ |
| GroupBy | ⚡⚡⚡ | ⚡⚡⚡ | ⚡⚡ | ⚡⚡⚡ |
| Time series | ⚡⚡⚡ | ⚡⚡ | ⚡⚡ | ⚡⚡⚡ |
| Visualization | ⚡⚡ | ⚡ | ⚡⚡⚡ | ⚡⚡⚡ |
| Large data | ⚡⚡ | ⚡⚡⚡ | ⚡ | ⚡⚡ |

---

## 🎓 Learning Path

### Day 1: Fundamentals
- [ ] Complete 01-Series-and-DataFrames
- [ ] Practice creating DataFrames from various sources
- [ ] Master `.loc[]` and `.iloc[]`
- [ ] Exercise: Build employee database

### Day 2: Data Loading
- [ ] Complete 02-Data-Loading
- [ ] Load data from CSV, Excel, JSON
- [ ] Handle different encodings
- [ ] Exercise: Load and combine multiple files

### Day 3: Data Cleaning
- [ ] Complete 03-Data-Cleaning
- [ ] Handle missing values
- [ ] Remove duplicates and outliers
- [ ] Exercise: Clean real messy dataset

### Days 4-5: Transformation
- [ ] Complete 04-Data-Transformation
- [ ] Master GroupBy operations
- [ ] Learn merge and join
- [ ] Exercise: Create pivot tables

### Day 6: Time Series
- [ ] Complete 05-Time-Series
- [ ] Work with datetime data
- [ ] Apply resampling
- [ ] Exercise: Analyze time series data

---

## 📝 Comprehensive Exercises

### Beginner Level
1. Create DataFrame from dict and list
2. Select rows and columns using different methods
3. Add and delete columns
4. Sort by multiple columns
5. Filter data with boolean conditions

### Intermediate Level
6. Load CSV with specific columns and dtypes
7. Handle missing values with different strategies
8. Group data and compute multiple aggregations
9. Merge two DataFrames on common key
10. Create pivot table from transaction data

### Advanced Level
11. Parse messy dates from multiple formats
12. Implement custom aggregation function
13. Create rolling statistics for time series
14. Optimize slow Pandas operations
15. Build complete ETL pipeline

---

## 🧪 Mini-Project: Sales Data Analysis

**Goal**: Complete analysis of sales dataset

```python
import pandas as pd
import numpy as np

# 1. Load data
sales = pd.read_csv('sales_data.csv', parse_dates=['Date'])

# 2. Clean data
sales = sales.drop_duplicates()
sales = sales.dropna(subset=['Revenue'])
sales['Date'] = pd.to_datetime(sales['Date'], errors='coerce')
sales = sales[sales['Revenue'] > 0]

# 3. Feature engineering
sales['Year'] = sales['Date'].dt.year
sales['Month'] = sales['Date'].dt.month
sales['Quarter'] = sales['Date'].dt.quarter
sales['DayOfWeek'] = sales['Date'].dt.day_name()

# 4. Analysis
# Monthly revenue trend
monthly = sales.groupby([sales['Date'].dt.to_period('M')])['Revenue'].sum()

# Best products
top_products = sales.groupby('Product')['Revenue'].sum().nlargest(10)

# Customer analysis
customer_stats = sales.groupby('Customer').agg({
    'Revenue': ['sum', 'mean', 'count'],
    'Product': 'nunique'
}).round(2)

# Time series analysis
daily_revenue = sales.groupby('Date')['Revenue'].sum()
rolling_avg = daily_revenue.rolling(window=7).mean()

# 5. Export results
monthly.to_csv('monthly_revenue.csv')
top_products.to_csv('top_products.csv')
customer_stats.to_csv('customer_analysis.csv')

print("Analysis complete!")
```

---

## 🔗 Additional Resources

### Documentation
- [Pandas Official Documentation](https://pandas.pydata.org/docs/)
- [Pandas User Guide](https://pandas.pydata.org/docs/user_guide/index.html)
- [Pandas API Reference](https://pandas.pydata.org/docs/reference/index.html)

### Tutorials
- [10 Minutes to Pandas](https://pandas.pydata.org/docs/user_guide/10min.html)
- [Pandas Cookbook](https://pandas.pydata.org/docs/user_guide/cookbook.html)
- [Kaggle Pandas Course](https://www.kaggle.com/learn/pandas)

### Books
- "Python for Data Analysis" by Wes McKinney (Pandas creator)
- "Pandas 1.x Cookbook" by Matt Harrison
- "Effective Pandas" by Matt Harrison

### Practice
- [100 Pandas Puzzles](https://github.com/ajcr/100-pandas-puzzles)
- [Pandas Exercises](https://github.com/guipsamora/pandas_exercises)
- [Real Python Pandas Tutorials](https://realpython.com/learning-paths/pandas-data-science/)

---

## ⚡ Performance Tips

### 1. **Vectorization Over Loops**
```python
# Bad: Loop
for i in range(len(df)):
    df.loc[i, 'new_col'] = df.loc[i, 'old_col'] * 2

# Good: Vectorized
df['new_col'] = df['old_col'] * 2
```

### 2. **Use Categorical Data**
```python
# For columns with few unique values
df['category'] = df['category'].astype('category')
# Saves memory and speeds up operations
```

### 3. **Read Only Needed Columns**
```python
# Instead of reading all columns
df = pd.read_csv('large_file.csv', usecols=['col1', 'col2', 'col3'])
```

### 4. **Use Appropriate dtypes**
```python
# Specify dtypes during loading
dtypes = {'col1': 'int32', 'col2': 'float32', 'col3': 'category'}
df = pd.read_csv('data.csv', dtype=dtypes)
```

### 5. **Avoid Chained Assignment**
```python
# Bad: Chained (may not work)
df[df['A'] > 5]['B'] = 10

# Good: Single assignment
df.loc[df['A'] > 5, 'B'] = 10
```

---

## ✅ Section Completion Checklist

- [ ] Read all 5 topic files
- [ ] Complete all code examples
- [ ] Solve 37 practice exercises
- [ ] Complete mini-project
- [ ] Load and clean a real dataset
- [ ] Perform groupby aggregations
- [ ] Work with time series data
- [ ] Optimize at least one slow operation

**Time Estimate**: 25-30 hours

---

## 🚀 Next Steps

Once you've mastered Pandas:
1. Move to **[2.3 Matplotlib & Seaborn Visualization](../2.3-Matplotlib-Seaborn-Visualization/README.md)**
2. Practice with real datasets from Kaggle
3. Build complete data analysis projects

---

## 💡 Pro Tips

1. **Use `.copy()`**: Avoid SettingWithCopyWarning
2. **Leverage `.query()`**: More readable filtering
3. **Master `.groupby()`**: Most powerful operation
4. **Use `.pipe()`**: Chain custom functions
5. **Understand views vs copies**: Critical for performance
6. **Use `.isin()`**: Efficient membership testing
7. **Learn regex**: Powerful for string operations
8. **Profile with `%%timeit`**: Optimize bottlenecks

---

## 🎯 Quick Reference

```python
# Creation
pd.DataFrame(data)
pd.Series(data)

# Loading
pd.read_csv('file.csv')
pd.read_excel('file.xlsx')
pd.read_sql(query, conn)

# Selection
df['col']
df[['col1', 'col2']]
df.loc[row, col]
df.iloc[row, col]

# Filtering
df[df['col'] > 5]
df.query('col > 5')

# Cleaning
df.dropna()
df.fillna(value)
df.drop_duplicates()

# Transformation
df.groupby('col').agg('mean')
df.merge(df2, on='key')
df.pivot_table(values, index, columns)

# Time Series
pd.to_datetime(df['date'])
df.resample('M').sum()
df.rolling(window=7).mean()
```

---

**Remember**: Pandas is your primary tool for data wrangling. Master it well!

## 🔗 Navigation

- **Previous**: [2.1 NumPy Mastery](../2.1-NumPy-Mastery/README.md)
- **Next**: [2.3 Visualization](../2.3-Matplotlib-Seaborn-Visualization/README.md)
- **Up**: [Chapter 2: Python for AI/ML](../README.md)
