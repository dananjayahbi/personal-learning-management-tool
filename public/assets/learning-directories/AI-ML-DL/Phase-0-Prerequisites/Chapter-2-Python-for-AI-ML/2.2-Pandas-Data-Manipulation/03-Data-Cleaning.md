# 03 - Data Cleaning and Preprocessing

## 📋 Table of Contents
- [Introduction](#introduction)
- [Handling Missing Values](#handling-missing-values)
- [Removing Duplicates](#removing-duplicates)
- [Data Type Conversion](#data-type-conversion)
- [String Manipulation](#string-manipulation)
- [Outlier Detection](#outlier-detection)
- [Data Validation](#data-validation)
- [Data Standardization](#data-standardization)
- [Practice Exercises](#practice-exercises)

---

## Introduction

Data cleaning is one of the most critical steps in data analysis and machine learning. Real-world data is messy:

- **Missing values** (NaN, None, empty strings)
- **Duplicates** (exact or fuzzy)
- **Inconsistent formatting** (dates, strings, categories)
- **Invalid values** (typos, out-of-range)
- **Outliers** (errors or genuine extreme values)

**The 80/20 Rule**: Data scientists spend 80% of their time cleaning data and 20% analyzing it.

**Goal**: Transform raw, messy data into clean, consistent data ready for analysis.

---

## Handling Missing Values

### Detecting Missing Values

```python
import pandas as pd
import numpy as np

# Create sample data with missing values
df = pd.DataFrame({
    'A': [1, 2, np.nan, 4, 5],
    'B': [np.nan, 2, 3, 4, 5],
    'C': ['a', None, 'c', 'd', 'e'],
    'D': [1, 2, 3, 4, 5]
})

# Check for missing values
print(df.isnull())
print(df.isna())  # Same as isnull()

# Count missing values per column
print(df.isnull().sum())

# Percentage of missing values
print(df.isnull().sum() / len(df) * 100)

# Total missing values
print(df.isnull().sum().sum())

# Rows with any missing values
print(df[df.isnull().any(axis=1)])

# Columns with any missing values
missing_cols = df.columns[df.isnull().any()].tolist()
print(missing_cols)

# Visual representation
import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(10, 6))
sns.heatmap(df.isnull(), cbar=False, cmap='viridis')
plt.title('Missing Values Heatmap')
plt.show()
```

### Removing Missing Values

```python
# Drop rows with any missing values
df_clean = df.dropna()

# Drop rows where all values are missing
df_clean = df.dropna(how='all')

# Drop rows with missing values in specific columns
df_clean = df.dropna(subset=['A', 'B'])

# Drop columns with any missing values
df_clean = df.dropna(axis=1)

# Drop columns with > 50% missing values
threshold = len(df) * 0.5
df_clean = df.dropna(axis=1, thresh=threshold)

# In-place modification
df.dropna(inplace=True)
```

### Filling Missing Values

```python
# Fill with scalar value
df_filled = df.fillna(0)
df_filled = df.fillna('Unknown')

# Fill with different values per column
fill_values = {'A': 0, 'B': df['B'].mean(), 'C': 'Missing'}
df_filled = df.fillna(fill_values)

# Forward fill (propagate last valid observation)
df_filled = df.fillna(method='ffill')  # or method='pad'

# Backward fill
df_filled = df.fillna(method='bfill')  # or method='backfill'

# Fill with column mean
df['A'] = df['A'].fillna(df['A'].mean())

# Fill with column median (robust to outliers)
df['B'] = df['B'].fillna(df['B'].median())

# Fill with column mode (most frequent value)
df['C'] = df['C'].fillna(df['C'].mode()[0])

# Interpolate missing values
df['A'] = df['A'].interpolate()
df['A'] = df['A'].interpolate(method='linear')
df['A'] = df['A'].interpolate(method='polynomial', order=2)

# Group-wise filling
df['age'] = df.groupby('category')['age'].transform(lambda x: x.fillna(x.mean()))
```

### Advanced Missing Value Handling

```python
# Replace specific values with NaN
df = df.replace([999, -999, 'NA', 'N/A', 'missing'], np.nan)

# Detect and replace outliers with NaN
Q1 = df['value'].quantile(0.25)
Q3 = df['value'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR
df.loc[(df['value'] < lower_bound) | (df['value'] > upper_bound), 'value'] = np.nan

# Imputation with sklearn
from sklearn.impute import SimpleImputer

# Mean imputation
imputer = SimpleImputer(strategy='mean')
df[['A', 'B']] = imputer.fit_transform(df[['A', 'B']])

# Most frequent imputation
imputer = SimpleImputer(strategy='most_frequent')
df[['C']] = imputer.fit_transform(df[['C']])

# KNN imputation (advanced)
from sklearn.impute import KNNImputer

imputer = KNNImputer(n_neighbors=5)
df_imputed = pd.DataFrame(
    imputer.fit_transform(df.select_dtypes(include=[np.number])),
    columns=df.select_dtypes(include=[np.number]).columns
)
```

---

## Removing Duplicates

### Finding Duplicates

```python
# Check for duplicate rows
print(df.duplicated())

# Count duplicates
print(df.duplicated().sum())

# Find duplicate rows
duplicates = df[df.duplicated()]
print(duplicates)

# Check duplicates based on specific columns
duplicates = df[df.duplicated(subset=['name', 'email'])]

# Check duplicates keeping first occurrence
duplicates = df[df.duplicated(keep='first')]  # Mark all except first

# Keep last occurrence
duplicates = df[df.duplicated(keep='last')]

# Mark all duplicates
duplicates = df[df.duplicated(keep=False)]
```

### Removing Duplicates

```python
# Remove duplicate rows
df_clean = df.drop_duplicates()

# Remove based on specific columns
df_clean = df.drop_duplicates(subset=['name', 'email'])

# Keep last occurrence
df_clean = df.drop_duplicates(keep='last')

# In-place removal
df.drop_duplicates(inplace=True)

# Advanced: Remove near-duplicates (fuzzy matching)
from fuzzywuzzy import fuzz

def remove_fuzzy_duplicates(df, column, threshold=80):
    """Remove fuzzy duplicate strings."""
    to_drop = []
    
    for i in range(len(df)):
        if i in to_drop:
            continue
        for j in range(i + 1, len(df)):
            if j in to_drop:
                continue
            similarity = fuzz.ratio(df.iloc[i][column], df.iloc[j][column])
            if similarity >= threshold:
                to_drop.append(j)
    
    return df.drop(df.index[to_drop])

df_clean = remove_fuzzy_duplicates(df, 'name', threshold=85)
```

---

## Data Type Conversion

### Basic Type Conversion

```python
# Convert to numeric
df['age'] = pd.to_numeric(df['age'], errors='coerce')  # Invalid -> NaN

# Convert to integer
df['count'] = df['count'].astype(int)
df['count'] = df['count'].astype('int32')  # Specify size

# Convert to float
df['price'] = df['price'].astype(float)

# Convert to string
df['id'] = df['id'].astype(str)

# Convert to category (memory efficient)
df['category'] = df['category'].astype('category')

# Convert boolean
df['is_active'] = df['is_active'].astype(bool)
```

### Date and Time Conversion

```python
# Convert to datetime
df['date'] = pd.to_datetime(df['date'])

# Specify format
df['date'] = pd.to_datetime(df['date'], format='%Y-%m-%d')
df['datetime'] = pd.to_datetime(df['datetime'], format='%Y-%m-%d %H:%M:%S')

# Handle errors
df['date'] = pd.to_datetime(df['date'], errors='coerce')  # Invalid -> NaT

# From separate columns
df['datetime'] = pd.to_datetime(df[['year', 'month', 'day']])

# Unix timestamp
df['date'] = pd.to_datetime(df['timestamp'], unit='s')

# Extract date components
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day'] = df['date'].dt.day
df['day_of_week'] = df['date'].dt.dayofweek
df['day_name'] = df['date'].dt.day_name()
df['is_weekend'] = df['date'].dt.dayofweek >= 5

# Time differences
df['days_since'] = (pd.Timestamp.now() - df['date']).dt.days
```

### Handling Mixed Types

```python
# Example: Column with mixed types
df = pd.DataFrame({
    'value': [1, 2, '3', 4, 'five', 6.5, '7.5']
})

# Convert, coercing errors to NaN
df['value_numeric'] = pd.to_numeric(df['value'], errors='coerce')

# Separate numeric and non-numeric
numeric_mask = pd.to_numeric(df['value'], errors='coerce').notna()
df_numeric = df[numeric_mask]
df_non_numeric = df[~numeric_mask]

# Custom conversion
def safe_convert(val):
    try:
        return float(val)
    except:
        return np.nan

df['value_numeric'] = df['value'].apply(safe_convert)
```

---

## String Manipulation

### Basic String Operations

```python
# String methods (use .str accessor)
df['name'] = df['name'].str.lower()
df['name'] = df['name'].str.upper()
df['name'] = df['name'].str.title()
df['name'] = df['name'].str.capitalize()

# Strip whitespace
df['text'] = df['text'].str.strip()
df['text'] = df['text'].str.lstrip()
df['text'] = df['text'].str.rstrip()

# Replace
df['text'] = df['text'].str.replace('old', 'new')
df['text'] = df['text'].str.replace(r'\d+', '', regex=True)  # Remove digits

# Contains
mask = df['name'].str.contains('smith', case=False, na=False)
df_filtered = df[mask]

# Starts with / Ends with
mask = df['email'].str.endswith('@gmail.com')
df_gmail = df[mask]

# Extract patterns
df['area_code'] = df['phone'].str.extract(r'(\d{3})-\d{3}-\d{4}')

# Split
df[['first_name', 'last_name']] = df['full_name'].str.split(' ', expand=True)

# Length
df['name_length'] = df['name'].str.len()

# Pad strings
df['id'] = df['id'].astype(str).str.zfill(5)  # Pad with zeros
```

### Advanced String Cleaning

```python
import re

# Remove special characters
df['text'] = df['text'].str.replace(r'[^\w\s]', '', regex=True)

# Remove multiple spaces
df['text'] = df['text'].str.replace(r'\s+', ' ', regex=True)

# Remove URLs
df['text'] = df['text'].str.replace(r'http\S+', '', regex=True)

# Remove emails
df['text'] = df['text'].str.replace(r'\S+@\S+', '', regex=True)

# Extract numbers
df['number'] = df['text'].str.extract(r'(\d+\.?\d*)')

# Standardize phone numbers
def standardize_phone(phone):
    """Standardize phone format to XXX-XXX-XXXX"""
    # Remove all non-digit characters
    digits = re.sub(r'\D', '', str(phone))
    
    if len(digits) == 10:
        return f"{digits[:3]}-{digits[3:6]}-{digits[6:]}"
    else:
        return np.nan

df['phone_clean'] = df['phone'].apply(standardize_phone)

# Clean currency strings
df['price'] = df['price'].str.replace('$', '').str.replace(',', '').astype(float)

# Fix common typos (example)
typo_map = {
    'recieve': 'receive',
    'teh': 'the',
    'occured': 'occurred'
}
for typo, correct in typo_map.items():
    df['text'] = df['text'].str.replace(typo, correct, case=False)
```

---

## Outlier Detection

### Statistical Methods

```python
import numpy as np
import matplotlib.pyplot as plt

# Z-score method
from scipy import stats

z_scores = np.abs(stats.zscore(df['value']))
threshold = 3
outliers = df[z_scores > threshold]

# IQR method (Interquartile Range)
Q1 = df['value'].quantile(0.25)
Q3 = df['value'].quantile(0.75)
IQR = Q3 - Q1

lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

outliers = df[(df['value'] < lower_bound) | (df['value'] > upper_bound)]

# Remove outliers
df_clean = df[(df['value'] >= lower_bound) & (df['value'] <= upper_bound)]

# Cap outliers (winsorizing)
df['value_capped'] = df['value'].clip(lower=lower_bound, upper=upper_bound)
```

### Visual Detection

```python
import matplotlib.pyplot as plt
import seaborn as sns

# Box plot
plt.figure(figsize=(10, 6))
sns.boxplot(data=df, y='value')
plt.title('Box Plot for Outlier Detection')
plt.show()

# Scatter plot
plt.figure(figsize=(10, 6))
plt.scatter(df.index, df['value'])
plt.axhline(y=upper_bound, color='r', linestyle='--', label='Upper Bound')
plt.axhline(y=lower_bound, color='r', linestyle='--', label='Lower Bound')
plt.legend()
plt.title('Scatter Plot with Outlier Bounds')
plt.show()

# Distribution plot
plt.figure(figsize=(10, 6))
sns.histplot(df['value'], kde=True)
plt.title('Distribution Plot')
plt.show()
```

### Isolation Forest (Machine Learning Method)

```python
from sklearn.ensemble import IsolationForest

# Fit model
iso_forest = IsolationForest(contamination=0.1, random_state=42)
outlier_labels = iso_forest.fit_predict(df[['value']])

# -1 for outliers, 1 for inliers
df['is_outlier'] = outlier_labels
outliers = df[df['is_outlier'] == -1]
```

---

## Data Validation

### Value Range Validation

```python
# Check value ranges
assert df['age'].between(0, 120).all(), "Invalid age values"
assert df['price'].min() >= 0, "Negative prices found"

# Create validation function
def validate_dataframe(df):
    """Validate DataFrame structure and values."""
    errors = []
    
    # Check required columns
    required_cols = ['name', 'age', 'email']
    missing_cols = set(required_cols) - set(df.columns)
    if missing_cols:
        errors.append(f"Missing columns: {missing_cols}")
    
    # Check data types
    if df['age'].dtype != 'int64':
        errors.append("Age should be integer")
    
    # Check value ranges
    if (df['age'] < 0).any() or (df['age'] > 120).any():
        errors.append("Age out of valid range")
    
    # Check for nulls in required columns
    if df['name'].isnull().any():
        errors.append("Name cannot be null")
    
    # Check email format
    email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    if not df['email'].str.match(email_pattern).all():
        errors.append("Invalid email format")
    
    if errors:
        raise ValueError("\n".join(errors))
    
    return True

# Usage
try:
    validate_dataframe(df)
    print("Validation passed!")
except ValueError as e:
    print(f"Validation errors:\n{e}")
```

### Constraint Validation

```python
# Unique constraint
assert df['email'].is_unique, "Duplicate emails found"

# Foreign key constraint (checking reference)
valid_categories = ['A', 'B', 'C']
invalid = df[~df['category'].isin(valid_categories)]
if not invalid.empty:
    print(f"Invalid categories: {invalid['category'].unique()}")

# Logical constraints
# Age should be positive
invalid_age = df[df['age'] < 0]

# Start date should be before end date
invalid_dates = df[df['start_date'] > df['end_date']]

# Percentage should be 0-100
invalid_pct = df[(df['percentage'] < 0) | (df['percentage'] > 100)]
```

---

## Data Standardization

### Normalize Text Data

```python
# Standardize case
df['country'] = df['country'].str.upper()

# Standardize whitespace
df['name'] = df['name'].str.strip().str.replace(r'\s+', ' ', regex=True)

# Standardize categories
category_map = {
    'MALE': 'M',
    'FEMALE': 'F',
    'Male': 'M',
    'Female': 'F',
    'male': 'M',
    'female': 'F'
}
df['gender'] = df['gender'].map(category_map)

# Standardize Boolean
bool_map = {
    'yes': True, 'Yes': True, 'YES': True, 'y': True, 'Y': True, '1': True, 1: True,
    'no': False, 'No': False, 'NO': False, 'n': False, 'N': False, '0': False, 0: False
}
df['is_active'] = df['is_active'].map(bool_map)
```

### Normalize Numeric Data

```python
from sklearn.preprocessing import MinMaxScaler, StandardScaler

# Min-Max Normalization (0-1)
scaler = MinMaxScaler()
df[['feature1', 'feature2']] = scaler.fit_transform(df[['feature1', 'feature2']])

# Standardization (mean=0, std=1)
scaler = StandardScaler()
df[['feature1', 'feature2']] = scaler.fit_transform(df[['feature1', 'feature2']])

# Manual normalization
df['normalized'] = (df['value'] - df['value'].min()) / (df['value'].max() - df['value'].min())

# Log transformation (for skewed data)
df['log_value'] = np.log1p(df['value'])  # log(1 + x)
```

---

## Practice Exercises

### Exercise 1: Complete Data Cleaning Pipeline

```python
def clean_customer_data(df):
    """
    Clean customer dataset.
    
    Steps:
    1. Remove duplicates
    2. Handle missing values
    3. Standardize formats
    4. Validate data
    5. Remove outliers
    """
    df_clean = df.copy()
    
    # 1. Remove duplicates
    df_clean = df_clean.drop_duplicates(subset=['email'], keep='first')
    
    # 2. Handle missing values
    # Fill missing ages with median
    df_clean['age'] = df_clean['age'].fillna(df_clean['age'].median())
    
    # Fill missing categories with mode
    df_clean['category'] = df_clean['category'].fillna(df_clean['category'].mode()[0])
    
    # Drop rows with missing emails
    df_clean = df_clean.dropna(subset=['email'])
    
    # 3. Standardize formats
    # Clean names
    df_clean['name'] = df_clean['name'].str.strip().str.title()
    
    # Clean emails
    df_clean['email'] = df_clean['email'].str.lower().str.strip()
    
    # Standardize phone numbers
    df_clean['phone'] = df_clean['phone'].apply(standardize_phone)
    
    # 4. Validate data
    # Remove invalid ages
    df_clean = df_clean[(df_clean['age'] >= 0) & (df_clean['age'] <= 120)]
    
    # Remove invalid emails
    email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    df_clean = df_clean[df_clean['email'].str.match(email_pattern)]
    
    # 5. Remove outliers (from purchase_amount)
    Q1 = df_clean['purchase_amount'].quantile(0.25)
    Q3 = df_clean['purchase_amount'].quantile(0.75)
    IQR = Q3 - Q1
    df_clean = df_clean[
        (df_clean['purchase_amount'] >= Q1 - 1.5 * IQR) &
        (df_clean['purchase_amount'] <= Q3 + 1.5 * IQR)
    ]
    
    return df_clean
```

### Exercise 2: Handle Missing Values Strategy

```python
def impute_missing_values(df):
    """
    Implement different imputation strategies.
    """
    df_imputed = df.copy()
    
    for col in df_imputed.columns:
        if df_imputed[col].isnull().sum() == 0:
            continue
        
        # Numeric columns
        if df_imputed[col].dtype in ['int64', 'float64']:
            # Use median for skewed distributions
            if df_imputed[col].skew() > 1:
                df_imputed[col].fillna(df_imputed[col].median(), inplace=True)
            # Use mean for normal distributions
            else:
                df_imputed[col].fillna(df_imputed[col].mean(), inplace=True)
        
        # Categorical columns
        else:
            # Use mode (most frequent value)
            df_imputed[col].fillna(df_imputed[col].mode()[0], inplace=True)
    
    return df_imputed
```

### Exercise 3: Text Cleaning Function

```python
import re

def clean_text_column(series):
    """
    Clean text data comprehensively.
    """
    # Convert to string
    series = series.astype(str)
    
    # Lowercase
    series = series.str.lower()
    
    # Remove URLs
    series = series.str.replace(r'http\S+|www\S+', '', regex=True)
    
    # Remove mentions and hashtags
    series = series.str.replace(r'@\w+|#\w+', '', regex=True)
    
    # Remove special characters
    series = series.str.replace(r'[^\w\s]', ' ', regex=True)
    
    # Remove extra whitespace
    series = series.str.replace(r'\s+', ' ', regex=True).str.strip()
    
    # Remove numbers (optional)
    series = series.str.replace(r'\d+', '', regex=True)
    
    return series

# Usage
df['clean_text'] = clean_text_column(df['text'])
```

### Exercise 4: Outlier Treatment

```python
def treat_outliers(df, columns, method='iqr'):
    """
    Detect and treat outliers.
    
    Parameters
    ----------
    df : pd.DataFrame
    columns : list
        Columns to treat
    method : str
        'iqr' or 'zscore'
    """
    df_treated = df.copy()
    
    for col in columns:
        if method == 'iqr':
            Q1 = df_treated[col].quantile(0.25)
            Q3 = df_treated[col].quantile(0.75)
            IQR = Q3 - Q1
            lower = Q1 - 1.5 * IQR
            upper = Q3 + 1.5 * IQR
            
            # Cap outliers
            df_treated[col] = df_treated[col].clip(lower=lower, upper=upper)
        
        elif method == 'zscore':
            from scipy import stats
            z_scores = np.abs(stats.zscore(df_treated[col]))
            # Keep only values with z-score < 3
            df_treated = df_treated[z_scores < 3]
    
    return df_treated

# Usage
df_clean = treat_outliers(df, ['price', 'quantity'], method='iqr')
```

### Exercise 5: Data Quality Report

```python
def data_quality_report(df):
    """
    Generate comprehensive data quality report.
    """
    report = {}
    
    # Basic info
    report['shape'] = df.shape
    report['memory_usage_mb'] = df.memory_usage(deep=True).sum() / 1024**2
    
    # Missing values
    missing = df.isnull().sum()
    report['missing_values'] = missing[missing > 0].to_dict()
    report['missing_percentage'] = (missing[missing > 0] / len(df) * 100).to_dict()
    
    # Duplicates
    report['duplicate_rows'] = df.duplicated().sum()
    
    # Data types
    report['data_types'] = df.dtypes.value_counts().to_dict()
    
    # Numeric columns statistics
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    if len(numeric_cols) > 0:
        report['numeric_stats'] = df[numeric_cols].describe().to_dict()
    
    # Categorical columns
    cat_cols = df.select_dtypes(include=['object', 'category']).columns
    if len(cat_cols) > 0:
        report['categorical_unique_counts'] = {
            col: df[col].nunique() for col in cat_cols
        }
    
    # Outliers (using IQR)
    outlier_counts = {}
    for col in numeric_cols:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1
        outliers = df[(df[col] < Q1 - 1.5 * IQR) | (df[col] > Q3 + 1.5 * IQR)]
        if len(outliers) > 0:
            outlier_counts[col] = len(outliers)
    report['outliers'] = outlier_counts
    
    return report

# Usage
report = data_quality_report(df)
for key, value in report.items():
    print(f"\n{key}:")
    print(value)
```

---

## Key Takeaways

1. **Missing Values**:
   - Always understand WHY data is missing
   - Choose appropriate imputation strategy
   - Document all decisions

2. **Duplicates**:
   - Check for exact and fuzzy duplicates
   - Decide which occurrence to keep
   - Consider composite keys

3. **Data Types**:
   - Enforce correct types early
   - Use categories for memory efficiency
   - Parse dates explicitly

4. **String Cleaning**:
   - Standardize case and whitespace
   - Use regex for complex patterns
   - Create reusable functions

5. **Outliers**:
   - Distinguish errors from genuine extremes
   - Use multiple detection methods
   - Consider domain knowledge

6. **Validation**:
   - Define clear validation rules
   - Automate validation checks
   - Log and fix violations

---

## 🔗 Navigation

- **Previous**: [02 - Data Loading](./02-Data-Loading.md)
- **Next**: [04 - Data Transformation](./04-Data-Transformation.md)
- **Up**: [Section 2.2 Pandas](./README.md)
