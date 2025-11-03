# 02 - Data Loading and Input/Output

## 📋 Table of Contents
- [Introduction](#introduction)
- [Reading CSV Files](#reading-csv-files)
- [Reading Excel Files](#reading-excel-files)
- [Reading JSON Files](#reading-json-files)
- [Reading from Databases](#reading-from-databases)
- [Reading from APIs](#reading-from-apis)
- [Writing Data](#writing-data)
- [Handling Different Encodings](#handling-different-encodings)
- [Performance Optimization](#performance-optimization)
- [Practice Exercises](#practice-exercises)

---

## Introduction

Loading data into Pandas is typically the first step in any data analysis workflow. Pandas provides versatile functions to read data from various sources including:

- **Flat files**: CSV, TSV, text files
- **Spreadsheets**: Excel, Google Sheets
- **Structured formats**: JSON, XML, HTML
- **Databases**: SQL, NoSQL
- **APIs**: REST endpoints, web scraping
- **Binary formats**: Parquet, HDF5, Feather

**Key Principles:**
- 🚀 **Efficiency**: Load only what you need
- 🛡️ **Robustness**: Handle errors gracefully
- 🔄 **Flexibility**: Support various formats and sources
- 📊 **Validation**: Check data after loading

---

## Reading CSV Files

### Basic CSV Reading

```python
import pandas as pd

# Simple read
df = pd.read_csv('data.csv')
print(df.head())

# Specify delimiter
df = pd.read_csv('data.tsv', sep='\t')  # Tab-separated
df = pd.read_csv('data.txt', sep='|')   # Pipe-separated

# Read from URL
url = 'https://example.com/data.csv'
df = pd.read_csv(url)
```

### Advanced CSV Options

```python
# Skip rows
df = pd.read_csv('data.csv', skiprows=5)  # Skip first 5 rows
df = pd.read_csv('data.csv', skiprows=[0, 2, 3])  # Skip specific rows
df = pd.read_csv('data.csv', skipfooter=3, engine='python')  # Skip last 3 rows

# Specify column names
df = pd.read_csv('data.csv', names=['col1', 'col2', 'col3'], header=None)

# Select specific columns
df = pd.read_csv('data.csv', usecols=['name', 'age', 'city'])
df = pd.read_csv('data.csv', usecols=[0, 2, 4])  # By index

# Data type specification
dtype_dict = {
    'user_id': int,
    'age': 'int32',
    'price': float,
    'category': 'category'
}
df = pd.read_csv('data.csv', dtype=dtype_dict)

# Handle missing values
df = pd.read_csv('data.csv', na_values=['NA', 'missing', '?'])
df = pd.read_csv('data.csv', keep_default_na=False)  # Don't treat empty as NaN

# Parse dates
df = pd.read_csv('data.csv', parse_dates=['date_column'])
df = pd.read_csv('data.csv', parse_dates=['year', 'month', 'day'])  # Combine columns

# Custom date parser
from datetime import datetime
date_parser = lambda x: datetime.strptime(x, '%Y-%m-%d %H:%M:%S')
df = pd.read_csv('data.csv', parse_dates=['timestamp'], date_parser=date_parser)

# Compression
df = pd.read_csv('data.csv.gz', compression='gzip')
df = pd.read_csv('data.csv.zip', compression='zip')
df = pd.read_csv('data.csv', compression='infer')  # Auto-detect

# Handle large files
chunks = pd.read_csv('large_file.csv', chunksize=10000)
for chunk in chunks:
    process(chunk)  # Process chunk by chunk

# Read with index
df = pd.read_csv('data.csv', index_col='id')
df = pd.read_csv('data.csv', index_col=[0, 1])  # MultiIndex
```

### CSV Reading Best Practices

```python
# Example: Production-ready CSV reading
def load_csv_robust(filepath, **kwargs):
    """
    Robustly load CSV with error handling.
    
    Parameters
    ----------
    filepath : str
        Path to CSV file
    **kwargs : dict
        Additional arguments for pd.read_csv
        
    Returns
    -------
    pd.DataFrame or None
    """
    try:
        # First, peek at the file
        with open(filepath, 'r', encoding='utf-8') as f:
            first_line = f.readline()
            print(f"First line: {first_line[:100]}")
        
        # Read with sensible defaults
        df = pd.read_csv(
            filepath,
            encoding='utf-8',
            low_memory=False,  # Prevent mixed type inference issues
            na_values=['NA', 'N/A', 'null', '', 'missing'],
            **kwargs
        )
        
        # Validation
        print(f"Loaded {len(df)} rows, {len(df.columns)} columns")
        print(f"Memory usage: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
        print(f"Missing values:\n{df.isnull().sum()}")
        
        return df
    
    except FileNotFoundError:
        print(f"Error: File {filepath} not found")
        return None
    except pd.errors.ParserError as e:
        print(f"Error parsing file: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None

# Usage
df = load_csv_robust('sales_data.csv', parse_dates=['date'])
```

---

## Reading Excel Files

### Basic Excel Reading

```python
# Read Excel file
df = pd.read_excel('data.xlsx')

# Specify sheet
df = pd.read_excel('data.xlsx', sheet_name='Sheet1')
df = pd.read_excel('data.xlsx', sheet_name=0)  # First sheet

# Read multiple sheets
sheets_dict = pd.read_excel('data.xlsx', sheet_name=None)  # All sheets
for sheet_name, df in sheets_dict.items():
    print(f"Sheet: {sheet_name}, Rows: {len(df)}")

# Read specific sheets
sheets = pd.read_excel('data.xlsx', sheet_name=['Sheet1', 'Sheet2'])
df1 = sheets['Sheet1']
df2 = sheets['Sheet2']
```

### Advanced Excel Options

```python
# Specify range
df = pd.read_excel('data.xlsx', usecols='A:D')  # Columns A to D
df = pd.read_excel('data.xlsx', usecols=[0, 2, 4])  # Column indices

# Skip rows
df = pd.read_excel('data.xlsx', skiprows=2)
df = pd.read_excel('data.xlsx', skiprows=[0, 1, 3])

# Header and names
df = pd.read_excel('data.xlsx', header=None)
df = pd.read_excel('data.xlsx', header=1)  # Second row as header
df = pd.read_excel('data.xlsx', names=['col1', 'col2'])

# Data types
df = pd.read_excel('data.xlsx', dtype={'age': int, 'price': float})

# Handle dates
df = pd.read_excel('data.xlsx', parse_dates=['date_column'])

# Read from specific engine
df = pd.read_excel('data.xlsx', engine='openpyxl')  # .xlsx
df = pd.read_excel('data.xls', engine='xlrd')       # .xls
```

### Example: Read Complex Excel

```python
import pandas as pd

def read_financial_report(filepath):
    """Read financial report Excel with multiple sheets."""
    
    # Read summary
    summary = pd.read_excel(
        filepath,
        sheet_name='Summary',
        skiprows=3,  # Skip title rows
        usecols='B:F',  # Only relevant columns
        nrows=10  # Only first 10 data rows
    )
    
    # Read monthly data
    monthly = pd.read_excel(
        filepath,
        sheet_name='Monthly',
        header=1,  # Second row is header
        parse_dates=['Date'],
        index_col='Date'
    )
    
    # Read categories
    categories = pd.read_excel(
        filepath,
        sheet_name='Categories',
        usecols=['Category', 'Budget', 'Actual']
    )
    
    return {
        'summary': summary,
        'monthly': monthly,
        'categories': categories
    }

# Usage
data = read_financial_report('financial_report.xlsx')
print(data['summary'].head())
```

---

## Reading JSON Files

### Basic JSON Reading

```python
# Read JSON file
df = pd.read_json('data.json')

# Read JSON string
json_string = '{"name": ["Alice", "Bob"], "age": [25, 30]}'
df = pd.read_json(json_string)

# Read from URL
url = 'https://api.example.com/data.json'
df = pd.read_json(url)
```

### JSON Formats

```python
# Orient options
# 'split' : dict like {index -> [index], columns -> [columns], data -> [values]}
df = pd.read_json('data.json', orient='split')

# 'records' : list like [{column -> value}, ... , {column -> value}]
df = pd.read_json('data.json', orient='records')

# 'index' : dict like {index -> {column -> value}}
df = pd.read_json('data.json', orient='index')

# 'columns' : dict like {column -> {index -> value}}
df = pd.read_json('data.json', orient='columns')

# 'values' : just the values array
df = pd.read_json('data.json', orient='values')
```

### Nested JSON

```python
import json

# Read nested JSON
with open('nested.json', 'r') as f:
    data = json.load(f)

# Method 1: json_normalize
from pandas import json_normalize
df = json_normalize(data)

# Method 2: json_normalize with nested data
df = json_normalize(
    data,
    record_path=['items'],  # Path to list of records
    meta=['id', 'name'],    # Metadata from parent
    meta_prefix='parent_'
)

# Example: Complex nested JSON
json_data = {
    'users': [
        {
            'id': 1,
            'name': 'Alice',
            'address': {'city': 'NYC', 'zip': '10001'},
            'orders': [
                {'order_id': 101, 'amount': 100},
                {'order_id': 102, 'amount': 200}
            ]
        },
        {
            'id': 2,
            'name': 'Bob',
            'address': {'city': 'LA', 'zip': '90001'},
            'orders': [
                {'order_id': 103, 'amount': 150}
            ]
        }
    ]
}

# Flatten orders
df_orders = json_normalize(
    json_data['users'],
    record_path='orders',
    meta=['id', 'name', ['address', 'city'], ['address', 'zip']],
    meta_prefix='user_',
    record_prefix='order_'
)
print(df_orders)
#    order_order_id  order_amount  user_id user_name user_address.city user_address.zip
# 0             101           100        1     Alice               NYC            10001
# 1             102           200        1     Alice               NYC            10001
# 2             103           150        2       Bob                LA            90001
```

### JSONL (JSON Lines)

```python
# Read JSONL (one JSON object per line)
df = pd.read_json('data.jsonl', lines=True)

# Read compressed JSONL
df = pd.read_json('data.jsonl.gz', lines=True, compression='gzip')

# Example JSONL
# File content:
# {"name": "Alice", "age": 25}
# {"name": "Bob", "age": 30}
# {"name": "Charlie", "age": 35}
```

---

## Reading from Databases

### SQL Databases

```python
import pandas as pd
from sqlalchemy import create_engine

# Create database connection
engine = create_engine('sqlite:///mydatabase.db')

# Simple query
df = pd.read_sql('SELECT * FROM users', engine)

# Query with parameters (SQLAlchemy)
query = """
SELECT name, age, city
FROM users
WHERE age > :min_age
"""
df = pd.read_sql(query, engine, params={'min_age': 25})

# Read entire table
df = pd.read_sql_table('users', engine)

# Query with chunks
for chunk in pd.read_sql('SELECT * FROM large_table', engine, chunksize=1000):
    process(chunk)

# Using index
df = pd.read_sql('SELECT * FROM users', engine, index_col='user_id')
```

### Different Databases

```python
# PostgreSQL
engine = create_engine('postgresql://user:password@localhost:5432/dbname')

# MySQL
engine = create_engine('mysql+pymysql://user:password@localhost:3306/dbname')

# SQL Server
engine = create_engine('mssql+pyodbc://user:password@server/dbname?driver=SQL+Server')

# Oracle
engine = create_engine('oracle+cx_oracle://user:password@host:port/dbname')
```

### Example: Database Operations

```python
import pandas as pd
from sqlalchemy import create_engine

def load_from_database(query, connection_string, **kwargs):
    """
    Load data from database with error handling.
    
    Parameters
    ----------
    query : str
        SQL query
    connection_string : str
        Database connection string
    **kwargs : dict
        Additional arguments for pd.read_sql
        
    Returns
    -------
    pd.DataFrame
    """
    try:
        engine = create_engine(connection_string)
        
        with engine.connect() as conn:
            df = pd.read_sql(query, conn, **kwargs)
            print(f"Loaded {len(df)} rows from database")
            return df
    
    except Exception as e:
        print(f"Database error: {e}")
        return None

# Usage
conn_str = 'postgresql://user:password@localhost:5432/sales_db'
query = """
SELECT 
    date,
    product_id,
    quantity,
    price
FROM sales
WHERE date >= '2023-01-01'
ORDER BY date
"""
df = load_from_database(query, conn_str, parse_dates=['date'])
```

---

## Reading from APIs

### REST APIs

```python
import pandas as pd
import requests

# Simple GET request
url = 'https://api.example.com/data'
response = requests.get(url)
data = response.json()
df = pd.DataFrame(data)

# With authentication
headers = {'Authorization': 'Bearer YOUR_TOKEN'}
response = requests.get(url, headers=headers)
df = pd.DataFrame(response.json())

# With parameters
params = {'start_date': '2023-01-01', 'end_date': '2023-12-31'}
response = requests.get(url, params=params)
df = pd.DataFrame(response.json())

# Paginated API
def fetch_all_pages(base_url, headers=None):
    """Fetch all pages from paginated API."""
    all_data = []
    page = 1
    
    while True:
        response = requests.get(
            f"{base_url}?page={page}",
            headers=headers
        )
        data = response.json()
        
        if not data['results']:  # No more data
            break
            
        all_data.extend(data['results'])
        page += 1
    
    return pd.DataFrame(all_data)

# Usage
df = fetch_all_pages('https://api.example.com/users')
```

### Example: GitHub API

```python
import requests
import pandas as pd

def get_github_repos(username):
    """Get all repositories for a GitHub user."""
    url = f'https://api.github.com/users/{username}/repos'
    
    # GitHub API pagination
    repos = []
    page = 1
    
    while True:
        response = requests.get(url, params={'page': page, 'per_page': 100})
        
        if response.status_code != 200:
            print(f"Error: {response.status_code}")
            break
        
        data = response.json()
        if not data:
            break
            
        repos.extend(data)
        page += 1
    
    # Convert to DataFrame
    df = pd.DataFrame(repos)
    
    # Select relevant columns
    df = df[[
        'name', 'description', 'language', 
        'stargazers_count', 'forks_count',
        'created_at', 'updated_at'
    ]]
    
    # Parse dates
    df['created_at'] = pd.to_datetime(df['created_at'])
    df['updated_at'] = pd.to_datetime(df['updated_at'])
    
    return df

# Usage
repos = get_github_repos('pandas-dev')
print(repos.head())
```

---

## Writing Data

### Write CSV

```python
# Simple write
df.to_csv('output.csv')

# Without index
df.to_csv('output.csv', index=False)

# Custom separator
df.to_csv('output.tsv', sep='\t', index=False)

# Specify columns
df.to_csv('output.csv', columns=['name', 'age'], index=False)

# Compression
df.to_csv('output.csv.gz', compression='gzip', index=False)
df.to_csv('output.csv.zip', compression='zip', index=False)

# Encoding
df.to_csv('output.csv', encoding='utf-8', index=False)

# Append mode
df.to_csv('output.csv', mode='a', header=False, index=False)

# Custom formatting
df.to_csv('output.csv', float_format='%.2f', index=False)

# Handle large DataFrames
for chunk in [df[i:i+10000] for i in range(0, len(df), 10000)]:
    chunk.to_csv('output.csv', mode='a', header=(i==0), index=False)
```

### Write Excel

```python
# Simple write
df.to_excel('output.xlsx', index=False)

# Specify sheet name
df.to_excel('output.xlsx', sheet_name='Data', index=False)

# Multiple sheets
with pd.ExcelWriter('output.xlsx') as writer:
    df1.to_excel(writer, sheet_name='Sheet1', index=False)
    df2.to_excel(writer, sheet_name='Sheet2', index=False)
    df3.to_excel(writer, sheet_name='Sheet3', index=False)

# With formatting
with pd.ExcelWriter('output.xlsx', engine='xlsxwriter') as writer:
    df.to_excel(writer, sheet_name='Data', index=False)
    
    # Get workbook and worksheet
    workbook = writer.book
    worksheet = writer.sheets['Data']
    
    # Add formats
    header_format = workbook.add_format({
        'bold': True,
        'bg_color': '#D7E4BD',
        'border': 1
    })
    
    # Format header row
    for col_num, value in enumerate(df.columns.values):
        worksheet.write(0, col_num, value, header_format)
    
    # Set column widths
    for i, col in enumerate(df.columns):
        max_len = max(
            df[col].astype(str).map(len).max(),
            len(col)
        )
        worksheet.set_column(i, i, max_len + 2)
```

### Write JSON

```python
# Simple write
df.to_json('output.json')

# Specify orient
df.to_json('output.json', orient='records')
df.to_json('output.json', orient='split')
df.to_json('output.json', orient='index')

# Pretty print
df.to_json('output.json', orient='records', indent=4)

# JSONL
df.to_json('output.jsonl', orient='records', lines=True)

# Compression
df.to_json('output.json.gz', compression='gzip', orient='records')
```

### Write to Database

```python
from sqlalchemy import create_engine

# Create connection
engine = create_engine('sqlite:///mydatabase.db')

# Write table
df.to_sql('users', engine, if_exists='replace', index=False)

# Append to table
df.to_sql('users', engine, if_exists='append', index=False)

# Write with index
df.to_sql('users', engine, if_exists='replace', index=True, index_label='user_id')

# Write with chunks (for large DataFrames)
df.to_sql('users', engine, if_exists='replace', index=False, chunksize=1000)

# Specify data types
from sqlalchemy.types import Integer, String, Float, DateTime

dtype_dict = {
    'user_id': Integer,
    'name': String(100),
    'age': Integer,
    'balance': Float,
    'created_at': DateTime
}
df.to_sql('users', engine, if_exists='replace', index=False, dtype=dtype_dict)
```

---

## Handling Different Encodings

### Common Encoding Issues

```python
# UTF-8 (default)
df = pd.read_csv('data.csv', encoding='utf-8')

# Latin-1
df = pd.read_csv('data.csv', encoding='latin-1')

# Windows-1252
df = pd.read_csv('data.csv', encoding='windows-1252')

# Try multiple encodings
encodings = ['utf-8', 'latin-1', 'iso-8859-1', 'windows-1252']

for encoding in encodings:
    try:
        df = pd.read_csv('data.csv', encoding=encoding)
        print(f"Successfully read with {encoding}")
        break
    except UnicodeDecodeError:
        continue
else:
    print("Failed to read with any encoding")

# Detect encoding
import chardet

with open('data.csv', 'rb') as f:
    result = chardet.detect(f.read(10000))
    encoding = result['encoding']
    confidence = result['confidence']
    print(f"Detected: {encoding} (confidence: {confidence})")

df = pd.read_csv('data.csv', encoding=encoding)
```

### Handle Encoding Errors

```python
# Ignore errors
df = pd.read_csv('data.csv', encoding='utf-8', encoding_errors='ignore')

# Replace errors
df = pd.read_csv('data.csv', encoding='utf-8', encoding_errors='replace')

# Write with specific encoding
df.to_csv('output.csv', encoding='utf-8', index=False)
```

---

## Performance Optimization

### Optimize CSV Reading

```python
# Use optimized data types
dtype_dict = {
    'int_col': 'int32',      # Instead of int64
    'float_col': 'float32',  # Instead of float64
    'cat_col': 'category'    # For categorical data
}
df = pd.read_csv('data.csv', dtype=dtype_dict)

# Read only needed columns
df = pd.read_csv('data.csv', usecols=['col1', 'col2', 'col3'])

# Use chunks for large files
chunk_size = 10000
chunks = []

for chunk in pd.read_csv('large_file.csv', chunksize=chunk_size):
    # Process chunk
    chunk_processed = chunk[chunk['value'] > 100]
    chunks.append(chunk_processed)

df = pd.concat(chunks, ignore_index=True)

# Use nrows to test
df_sample = pd.read_csv('data.csv', nrows=1000)  # Test with first 1000 rows
```

### Fast File Formats

```python
# Parquet (recommended for large data)
df.to_parquet('data.parquet', compression='snappy')
df = pd.read_parquet('data.parquet')

# Feather (fast but less compression)
df.to_feather('data.feather')
df = pd.read_feather('data.feather')

# HDF5 (good for multiple DataFrames)
df.to_hdf('data.h5', key='df', mode='w')
df = pd.read_hdf('data.h5', key='df')

# Pickle (Python-specific)
df.to_pickle('data.pkl')
df = pd.read_pickle('data.pkl')

# Performance comparison
import time

# Test data
df = pd.DataFrame({
    'int_col': range(1000000),
    'float_col': np.random.rand(1000000),
    'str_col': ['text'] * 1000000
})

# CSV
start = time.time()
df.to_csv('test.csv', index=False)
csv_write = time.time() - start

start = time.time()
pd.read_csv('test.csv')
csv_read = time.time() - start

# Parquet
start = time.time()
df.to_parquet('test.parquet')
parquet_write = time.time() - start

start = time.time()
pd.read_parquet('test.parquet')
parquet_read = time.time() - start

print(f"CSV: Write {csv_write:.2f}s, Read {csv_read:.2f}s")
print(f"Parquet: Write {parquet_write:.2f}s, Read {parquet_read:.2f}s")
```

---

## Practice Exercises

### Exercise 1: Read Various Formats
```python
# Load these files and display summary
# 1. CSV file with mixed types
# 2. Excel file with multiple sheets
# 3. JSON file with nested structure
# 4. API endpoint with pagination

# Solution skeleton
def load_all_data():
    # CSV
    df_csv = pd.read_csv('sales.csv', parse_dates=['date'])
    
    # Excel
    sheets = pd.read_excel('report.xlsx', sheet_name=None)
    
    # JSON
    df_json = pd.read_json('api_response.json', orient='records')
    
    # API
    url = 'https://api.example.com/data'
    response = requests.get(url)
    df_api = pd.DataFrame(response.json())
    
    return df_csv, sheets, df_json, df_api
```

### Exercise 2: Optimize Large File Loading
```python
# Load 1GB+ CSV file efficiently
# Optimize memory usage

def load_large_file_optimized(filepath):
    # First pass: detect column types
    df_sample = pd.read_csv(filepath, nrows=10000)
    
    # Create dtype dict
    dtypes = {}
    for col in df_sample.columns:
        if df_sample[col].dtype == 'int64':
            if df_sample[col].min() >= 0:
                dtypes[col] = 'uint32'
            else:
                dtypes[col] = 'int32'
        elif df_sample[col].dtype == 'float64':
            dtypes[col] = 'float32'
        elif df_sample[col].dtype == 'object':
            if df_sample[col].nunique() / len(df_sample) < 0.5:
                dtypes[col] = 'category'
    
    # Second pass: load with optimized types
    df = pd.read_csv(filepath, dtype=dtypes)
    
    return df
```

### Exercise 3: Database ETL
```python
# Extract data from database, transform, and load to another database

def etl_pipeline(source_conn, target_conn, query, transform_func):
    """
    ETL pipeline between databases.
    
    Parameters
    ----------
    source_conn : str
        Source database connection string
    target_conn : str
        Target database connection string
    query : str
        SQL query to extract data
    transform_func : callable
        Function to transform DataFrame
    """
    # Extract
    source_engine = create_engine(source_conn)
    df = pd.read_sql(query, source_engine)
    
    # Transform
    df_transformed = transform_func(df)
    
    # Load
    target_engine = create_engine(target_conn)
    df_transformed.to_sql(
        'transformed_data',
        target_engine,
        if_exists='replace',
        index=False,
        chunksize=1000
    )
    
    print(f"ETL complete: {len(df)} rows processed")

# Example transform function
def clean_and_aggregate(df):
    # Remove duplicates
    df = df.drop_duplicates()
    
    # Handle missing values
    df = df.fillna(0)
    
    # Aggregate
    df_agg = df.groupby('category').agg({
        'amount': 'sum',
        'quantity': 'mean'
    }).reset_index()
    
    return df_agg
```

### Exercise 4: API Data Collection
```python
# Collect data from paginated API and save to CSV

def collect_api_data(base_url, output_file, max_pages=None):
    """
    Collect all data from paginated API.
    
    Parameters
    ----------
    base_url : str
        API endpoint
    output_file : str
        Output CSV filename
    max_pages : int, optional
        Maximum pages to fetch
    """
    all_data = []
    page = 1
    
    while True:
        if max_pages and page > max_pages:
            break
        
        response = requests.get(f"{base_url}?page={page}")
        
        if response.status_code != 200:
            print(f"Error on page {page}: {response.status_code}")
            break
        
        data = response.json()
        
        if not data['results']:
            break
        
        all_data.extend(data['results'])
        print(f"Fetched page {page}: {len(data['results'])} records")
        page += 1
    
    # Save to CSV
    df = pd.DataFrame(all_data)
    df.to_csv(output_file, index=False)
    
    print(f"Total records collected: {len(df)}")
    return df
```

### Exercise 5: Multi-Format Export
```python
# Export DataFrame to multiple formats with optimization

def export_multi_format(df, basename):
    """
    Export DataFrame to CSV, Excel, JSON, and Parquet.
    
    Parameters
    ----------
    df : pd.DataFrame
        DataFrame to export
    basename : str
        Base filename (without extension)
    """
    # CSV
    df.to_csv(f'{basename}.csv', index=False)
    
    # Excel with formatting
    with pd.ExcelWriter(f'{basename}.xlsx', engine='xlsxwriter') as writer:
        df.to_excel(writer, sheet_name='Data', index=False)
        
        workbook = writer.book
        worksheet = writer.sheets['Data']
        
        # Format header
        header_format = workbook.add_format({
            'bold': True,
            'bg_color': '#4472C4',
            'font_color': 'white',
            'border': 1
        })
        
        for col_num, value in enumerate(df.columns.values):
            worksheet.write(0, col_num, value, header_format)
    
    # JSON
    df.to_json(f'{basename}.json', orient='records', indent=2)
    
    # Parquet
    df.to_parquet(f'{basename}.parquet', compression='snappy')
    
    # Compare file sizes
    import os
    sizes = {
        'CSV': os.path.getsize(f'{basename}.csv'),
        'Excel': os.path.getsize(f'{basename}.xlsx'),
        'JSON': os.path.getsize(f'{basename}.json'),
        'Parquet': os.path.getsize(f'{basename}.parquet')
    }
    
    print("File sizes:")
    for format_name, size in sizes.items():
        print(f"{format_name}: {size / 1024:.2f} KB")

# Usage
df = pd.DataFrame({
    'id': range(10000),
    'value': np.random.rand(10000),
    'category': np.random.choice(['A', 'B', 'C'], 10000)
})
export_multi_format(df, 'output')
```

---

## Key Takeaways

1. **Choose the right format**:
   - CSV: Universal, human-readable
   - Parquet: Fast, compressed, typed
   - Excel: Business users, formatted reports
   - JSON: APIs, nested data

2. **Optimize memory**:
   - Specify dtypes explicitly
   - Use categorical for repeated strings
   - Load only needed columns
   - Process in chunks for large files

3. **Handle errors gracefully**:
   - Try multiple encodings
   - Validate data after loading
   - Use try-except blocks
   - Log issues for debugging

4. **Database best practices**:
   - Use connection pools
   - Read/write in chunks
   - Close connections properly
   - Use parameterized queries

5. **API considerations**:
   - Handle rate limits
   - Implement retries
   - Cache responses
   - Parse pagination properly

---

## 🔗 Navigation

- **Previous**: [01 - Series and DataFrames](./01-Series-and-DataFrames.md)
- **Next**: [03 - Data Cleaning](./03-Data-Cleaning.md)
- **Up**: [Section 2.2 Pandas](./README.md)
