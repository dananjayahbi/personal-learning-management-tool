# 05 - Time Series Analysis with Pandas

## 📋 Table of Contents
- [Introduction](#introduction)
- [DateTime Fundamentals](#datetime-fundamentals)
- [Time Series Indexing](#time-series-indexing)
- [Resampling](#resampling)
- [Rolling Windows](#rolling-windows)
- [Time Zones](#time-zones)
- [Time Series Visualization](#time-series-visualization)
- [Practice Exercises](#practice-exercises)

---

## Introduction

Time series data is sequential data indexed by time. Common in:
- Financial data (stock prices, trading volumes)
- Sensor data (temperature, humidity)
- Business metrics (sales, website traffic)
- Economic indicators (GDP, unemployment)

**Pandas Time Series Features:**
- 📅 Date/time parsing and creation
- 🔍 Flexible indexing and selection
- 🔄 Resampling and frequency conversion
- 📊 Rolling window calculations
- 🌍 Time zone handling
- 📈 Built-in plotting

---

## DateTime Fundamentals

### Creating DateTime Objects

```python
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# From strings
dt = pd.to_datetime('2023-01-15')
dt = pd.to_datetime('01/15/2023')
dt = pd.to_datetime('2023-01-15 14:30:00')

# Specify format
dt = pd.to_datetime('15-01-2023', format='%d-%m-%Y')
dt = pd.to_datetime('2023/01/15 02:30 PM', format='%Y/%m/%d %I:%M %p')

# From components
dt = pd.Timestamp(year=2023, month=1, day=15, hour=14, minute=30)

# Current timestamp
now = pd.Timestamp.now()
today = pd.Timestamp.today()

# From Unix timestamp
dt = pd.Timestamp(1673798400, unit='s')

# Arrays of dates
dates = pd.to_datetime(['2023-01-01', '2023-01-02', '2023-01-03'])
```

### Date Ranges

```python
# Create date range
dates = pd.date_range(start='2023-01-01', end='2023-12-31', freq='D')
print(f"Days in 2023: {len(dates)}")

# Specify periods instead of end
dates = pd.date_range(start='2023-01-01', periods=10, freq='D')

# Different frequencies
dates_hourly = pd.date_range('2023-01-01', periods=24, freq='H')
dates_weekly = pd.date_range('2023-01-01', periods=52, freq='W')
dates_monthly = pd.date_range('2023-01-01', periods=12, freq='M')
dates_yearly = pd.date_range('2000-01-01', periods=24, freq='Y')

# Business days only
business_days = pd.bdate_range('2023-01-01', '2023-12-31')

# Custom frequency
dates = pd.date_range('2023-01-01', periods=10, freq='2H')  # Every 2 hours
dates = pd.date_range('2023-01-01', periods=10, freq='3D')  # Every 3 days
```

### Frequency Codes

```python
# Common frequency strings:
# 'D'    - Calendar day
# 'B'    - Business day
# 'W'    - Weekly
# 'M'    - Month end
# 'MS'   - Month start
# 'Q'    - Quarter end
# 'QS'   - Quarter start
# 'Y'    - Year end
# 'YS'   - Year start
# 'H'    - Hour
# 'T'/'min' - Minute
# 'S'    - Second
# 'L'/'ms' - Millisecond
# 'U'/'us' - Microsecond
# 'N'    - Nanosecond

# Examples
dates = pd.date_range('2023-01-01', periods=5, freq='2W-MON')  # Bi-weekly Monday
dates = pd.date_range('2023-01-01', periods=5, freq='BMS')     # Business month start
dates = pd.date_range('2023-01-01', periods=5, freq='BQS-APR') # Business quarter (fiscal year starting April)
```

### DateTime Components

```python
# Create sample datetime
dt = pd.Timestamp('2023-05-15 14:30:45')

# Extract components
print(dt.year)         # 2023
print(dt.month)        # 5
print(dt.day)          # 15
print(dt.hour)         # 14
print(dt.minute)       # 30
print(dt.second)       # 45
print(dt.dayofweek)    # 0 (Monday)
print(dt.dayofyear)    # 135
print(dt.quarter)      # 2
print(dt.is_leap_year) # False
print(dt.day_name())   # 'Monday'
print(dt.month_name()) # 'May'

# Date arithmetic
tomorrow = dt + pd.Timedelta(days=1)
next_week = dt + pd.Timedelta(weeks=1)
one_hour_ago = dt - pd.Timedelta(hours=1)

# Difference between dates
dt1 = pd.Timestamp('2023-05-15')
dt2 = pd.Timestamp('2023-01-01')
diff = dt1 - dt2
print(f"Days: {diff.days}")
```

---

## Time Series Indexing

### Creating Time Series

```python
# Create time series DataFrame
dates = pd.date_range('2023-01-01', periods=365, freq='D')
df = pd.DataFrame({
    'date': dates,
    'value': np.random.randn(365).cumsum() + 100
})

# Set datetime index
df.set_index('date', inplace=True)
print(df.head())

# Or create with datetime index directly
df = pd.DataFrame(
    {'value': np.random.randn(365).cumsum() + 100},
    index=pd.date_range('2023-01-01', periods=365, freq='D')
)
```

### Time-based Selection

```python
# Select by date string
print(df['2023-01-15'])
print(df.loc['2023-01-15'])

# Select range
print(df['2023-01-01':'2023-01-31'])
print(df.loc['2023-01':'2023-02'])  # Partial string indexing

# Select by year
print(df['2023'])

# Select by year-month
print(df['2023-06'])

# Boolean indexing with dates
print(df[df.index.month == 1])  # January data
print(df[df.index.dayofweek < 5])  # Weekdays only

# Between dates
mask = (df.index >= '2023-01-01') & (df.index <= '2023-03-31')
q1_data = df[mask]

# Using isin
dates_of_interest = pd.date_range('2023-01-01', '2023-01-05')
df_subset = df[df.index.isin(dates_of_interest)]
```

### Shifting and Lagging

```python
# Shift forward (lag)
df['value_lag1'] = df['value'].shift(1)  # Previous value
df['value_lag7'] = df['value'].shift(7)  # 7 days ago

# Shift backward (lead)
df['value_lead1'] = df['value'].shift(-1)  # Next value

# Calculate changes
df['daily_change'] = df['value'] - df['value'].shift(1)
df['pct_change'] = df['value'].pct_change()

# Shift with fill
df['value_lag1_filled'] = df['value'].shift(1, fill_value=0)
```

---

## Resampling

### Downsampling (Higher to Lower Frequency)

```python
# Daily to weekly
df_weekly = df.resample('W').mean()
df_weekly = df.resample('W').sum()
df_weekly = df.resample('W').last()  # Last value of week

# Daily to monthly
df_monthly = df.resample('M').agg({
    'value': ['mean', 'sum', 'min', 'max']
})

# With custom function
df_monthly = df.resample('M').apply(lambda x: x.max() - x.min())

# Multiple aggregations
df_monthly = df.resample('M').agg({
    'value': ['mean', 'std', 'count']
})
```

### Upsampling (Lower to Higher Frequency)

```python
# Monthly data
dates_monthly = pd.date_range('2023-01-01', periods=12, freq='M')
df_monthly = pd.DataFrame({
    'value': np.random.randn(12).cumsum() + 100
}, index=dates_monthly)

# Upsample to daily
df_daily = df_monthly.resample('D').asfreq()  # Creates NaN for missing

# Forward fill
df_daily = df_monthly.resample('D').ffill()

# Backward fill
df_daily = df_monthly.resample('D').bfill()

# Interpolate
df_daily = df_monthly.resample('D').interpolate(method='linear')
df_daily = df_monthly.resample('D').interpolate(method='cubic')
```

### Period Conversion

```python
# Convert to Period
df_period = df.to_period('M')

# Convert back to timestamp
df_timestamp = df_period.to_timestamp()

# Period arithmetic
period = pd.Period('2023-01', freq='M')
next_month = period + 1
prev_month = period - 1

# Period range
periods = pd.period_range('2023-01', '2023-12', freq='M')
```

---

## Rolling Windows

### Basic Rolling Calculations

```python
# Simple moving average
df['sma_7'] = df['value'].rolling(window=7).mean()
df['sma_30'] = df['value'].rolling(window=30).mean()

# Rolling with different functions
df['rolling_sum'] = df['value'].rolling(window=7).sum()
df['rolling_std'] = df['value'].rolling(window=7).std()
df['rolling_min'] = df['value'].rolling(window=7).min()
df['rolling_max'] = df['value'].rolling(window=7).max()

# Rolling median
df['rolling_median'] = df['value'].rolling(window=7).median()

# Rolling quantile
df['rolling_q25'] = df['value'].rolling(window=7).quantile(0.25)
df['rolling_q75'] = df['value'].rolling(window=7).quantile(0.75)
```

### Advanced Rolling

```python
# Custom rolling function
def rolling_range(x):
    return x.max() - x.min()

df['rolling_range'] = df['value'].rolling(window=7).apply(rolling_range)

# Center the window
df['centered_ma'] = df['value'].rolling(window=7, center=True).mean()

# Min periods (don't wait for full window)
df['ma_minperiods'] = df['value'].rolling(window=7, min_periods=1).mean()

# Rolling correlation
df['value2'] = np.random.randn(len(df)).cumsum() + 100
df['rolling_corr'] = df['value'].rolling(window=30).corr(df['value2'])

# Rolling covariance
df['rolling_cov'] = df['value'].rolling(window=30).cov(df['value2'])
```

### Expanding Windows

```python
# Cumulative statistics
df['expanding_mean'] = df['value'].expanding().mean()
df['expanding_std'] = df['value'].expanding().std()
df['expanding_min'] = df['value'].expanding().min()
df['expanding_max'] = df['value'].expanding().max()

# With min_periods
df['expanding_mean_10'] = df['value'].expanding(min_periods=10).mean()
```

### Exponentially Weighted Functions

```python
# Exponentially weighted moving average (EWMA)
df['ewma_span10'] = df['value'].ewm(span=10).mean()
df['ewma_span30'] = df['value'].ewm(span=30).mean()

# Different decay specification
df['ewm_com'] = df['value'].ewm(com=9).mean()  # Center of mass
df['ewm_alpha'] = df['value'].ewm(alpha=0.1).mean()  # Direct alpha

# Exponentially weighted std
df['ewm_std'] = df['value'].ewm(span=10).std()

# Adjusted vs unadjusted
df['ewm_adjusted'] = df['value'].ewm(span=10, adjust=True).mean()
df['ewm_unadjusted'] = df['value'].ewm(span=10, adjust=False).mean()
```

---

## Time Zones

### Working with Time Zones

```python
# Create timezone-aware datetime
dt_utc = pd.Timestamp('2023-01-15 12:00:00', tz='UTC')
dt_ny = pd.Timestamp('2023-01-15 12:00:00', tz='America/New_York')

# Localize (add timezone to naive datetime)
dt_naive = pd.Timestamp('2023-01-15 12:00:00')
dt_localized = dt_naive.tz_localize('UTC')

# Convert between timezones
dt_tokyo = dt_utc.tz_convert('Asia/Tokyo')
print(f"UTC: {dt_utc}")
print(f"Tokyo: {dt_tokyo}")

# DataFrame with timezone
dates = pd.date_range('2023-01-01', periods=24, freq='H', tz='UTC')
df_tz = pd.DataFrame({'value': range(24)}, index=dates)

# Localize DataFrame index
df.index = df.index.tz_localize('UTC')

# Convert DataFrame timezone
df_ny = df.tz_convert('America/New_York')

# Remove timezone
df_no_tz = df.tz_localize(None)
```

### DST Handling

```python
# Daylight Saving Time transition
dates = pd.date_range(
    '2023-03-12',  # DST starts in US
    periods=24,
    freq='H',
    tz='America/New_York'
)
df_dst = pd.DataFrame({'hour': range(24)}, index=dates)
print(df_dst)  # Notice the "spring forward"

# Handle ambiguous times
dt_ambiguous = pd.Timestamp('2023-11-05 01:30:00')  # DST ends
dt_dst = dt_ambiguous.tz_localize('America/New_York', ambiguous=True)  # First occurrence
dt_std = dt_ambiguous.tz_localize('America/New_York', ambiguous=False)  # Second occurrence
```

---

## Time Series Visualization

### Basic Plots

```python
import matplotlib.pyplot as plt
import seaborn as sns

# Simple line plot
df['value'].plot(figsize=(12, 6))
plt.title('Time Series Plot')
plt.xlabel('Date')
plt.ylabel('Value')
plt.grid(True)
plt.show()

# Multiple series
fig, ax = plt.subplots(figsize=(12, 6))
df['value'].plot(ax=ax, label='Original')
df['sma_7'].plot(ax=ax, label='7-day MA')
df['sma_30'].plot(ax=ax, label='30-day MA')
ax.legend()
ax.set_title('Value with Moving Averages')
ax.grid(True)
plt.show()

# Subplot by period
df.groupby(df.index.month)['value'].mean().plot(kind='bar')
plt.title('Average Value by Month')
plt.xlabel('Month')
plt.ylabel('Average Value')
plt.show()
```

### Advanced Visualizations

```python
# Rolling statistics plot
fig, axes = plt.subplots(2, 1, figsize=(12, 10))

# Original with rolling mean
df['value'].plot(ax=axes[0], label='Original')
df['value'].rolling(window=30).mean().plot(ax=axes[0], label='30-day MA')
axes[0].legend()
axes[0].set_title('Value with Moving Average')
axes[0].grid(True)

# Rolling std (volatility)
df['value'].rolling(window=30).std().plot(ax=axes[1], color='red')
axes[1].set_title('30-day Rolling Standard Deviation')
axes[1].set_ylabel('Std Dev')
axes[1].grid(True)

plt.tight_layout()
plt.show()

# Seasonal decomposition
from statsmodels.tsa.seasonal import seasonal_decompose

result = seasonal_decompose(df['value'], model='additive', period=30)
fig = result.plot()
fig.set_size_inches(12, 10)
plt.show()

# Autocorrelation plot
from pandas.plotting import autocorrelation_plot

autocorrelation_plot(df['value'])
plt.title('Autocorrelation Plot')
plt.show()
```

---

## Practice Exercises

### Exercise 1: Stock Price Analysis

```python
# Generate sample stock data
np.random.seed(42)
dates = pd.date_range('2022-01-01', '2023-12-31', freq='B')  # Business days
stock_data = pd.DataFrame({
    'close': 100 + np.random.randn(len(dates)).cumsum(),
    'volume': np.random.randint(1000000, 10000000, len(dates))
}, index=dates)

# Tasks:
# 1. Calculate 20-day and 50-day moving averages
stock_data['ma_20'] = stock_data['close'].rolling(window=20).mean()
stock_data['ma_50'] = stock_data['close'].rolling(window=50).mean()

# 2. Calculate daily returns
stock_data['daily_return'] = stock_data['close'].pct_change()

# 3. Calculate volatility (20-day rolling std of returns)
stock_data['volatility'] = stock_data['daily_return'].rolling(window=20).std()

# 4. Identify moving average crossover signals
stock_data['signal'] = np.where(
    stock_data['ma_20'] > stock_data['ma_50'], 1, -1
)
stock_data['position'] = stock_data['signal'].diff()

# 5. Monthly performance
monthly_returns = stock_data['close'].resample('M').last().pct_change()
```

### Exercise 2: Sales Seasonality

```python
# Generate seasonal sales data
dates = pd.date_range('2020-01-01', '2023-12-31', freq='D')
trend = np.linspace(100, 200, len(dates))
seasonal = 20 * np.sin(2 * np.pi * np.arange(len(dates)) / 365)
noise = np.random.randn(len(dates)) * 5
sales = pd.DataFrame({
    'sales': trend + seasonal + noise
}, index=dates)

# Tasks:
# 1. Calculate month-over-month growth
monthly_sales = sales.resample('M').sum()
monthly_sales['mom_growth'] = monthly_sales['sales'].pct_change()

# 2. Calculate year-over-year growth
monthly_sales['yoy_growth'] = monthly_sales['sales'].pct_change(periods=12)

# 3. Decompose into trend and seasonal components
from statsmodels.tsa.seasonal import seasonal_decompose
decomposition = seasonal_decompose(sales['sales'], model='additive', period=365)

# 4. Calculate quarterly totals
quarterly_sales = sales.resample('Q').sum()

# 5. Find best and worst months historically
monthly_avg = sales.groupby(sales.index.month)['sales'].mean()
best_month = monthly_avg.idxmax()
worst_month = monthly_avg.idxmin()
```

### Exercise 3: Sensor Data Processing

```python
# Generate sensor data with missing values
dates = pd.date_range('2023-01-01', periods=1000, freq='5min')
sensor_data = pd.DataFrame({
    'temperature': 20 + np.random.randn(len(dates)).cumsum() * 0.1,
    'humidity': 50 + np.random.randn(len(dates)).cumsum() * 0.5
}, index=dates)

# Introduce random missing values
sensor_data.loc[sensor_data.sample(frac=0.05).index, 'temperature'] = np.nan

# Tasks:
# 1. Fill missing values using interpolation
sensor_data['temp_filled'] = sensor_data['temperature'].interpolate(method='linear')

# 2. Detect outliers (>3 std from rolling mean)
rolling_mean = sensor_data['temp_filled'].rolling(window=20).mean()
rolling_std = sensor_data['temp_filled'].rolling(window=20).std()
sensor_data['is_outlier'] = np.abs(
    sensor_data['temp_filled'] - rolling_mean
) > 3 * rolling_std

# 3. Resample to hourly averages
hourly_data = sensor_data.resample('H').mean()

# 4. Calculate rolling correlation between temp and humidity
sensor_data['rolling_corr'] = sensor_data['temp_filled'].rolling(window=50).corr(
    sensor_data['humidity']
)

# 5. Create anomaly score (distance from normal)
sensor_data['zscore'] = (
    sensor_data['temp_filled'] - sensor_data['temp_filled'].rolling(100).mean()
) / sensor_data['temp_filled'].rolling(100).std()
```

### Exercise 4: Website Traffic Analysis

```python
# Generate website traffic data
dates = pd.date_range('2023-01-01', '2023-12-31', freq='H')
base_traffic = 1000
hourly_pattern = np.array([50, 40, 30, 30, 40, 60, 100, 150, 180, 200, 200, 180,
                           160, 150, 140, 150, 170, 200, 180, 140, 120, 100, 80, 60])
daily_pattern = np.tile(hourly_pattern, 365)[:len(dates)]
traffic = pd.DataFrame({
    'visitors': base_traffic + daily_pattern + np.random.randn(len(dates)) * 50
}, index=dates)

# Tasks:
# 1. Calculate hourly averages for each hour of day
hourly_avg = traffic.groupby(traffic.index.hour)['visitors'].mean()

# 2. Compare weekday vs weekend traffic
traffic['is_weekend'] = traffic.index.dayofweek >= 5
weekday_avg = traffic[~traffic['is_weekend']]['visitors'].mean()
weekend_avg = traffic[traffic['is_weekend']]['visitors'].mean()

# 3. Identify peak hours
peak_hour = hourly_avg.idxmax()

# 4. Calculate daily, weekly, monthly totals
daily = traffic.resample('D').sum()
weekly = traffic.resample('W').sum()
monthly = traffic.resample('M').sum()

# 5. Detect unusual traffic spikes
traffic['rolling_mean'] = traffic['visitors'].rolling(window=24).mean()
traffic['rolling_std'] = traffic['visitors'].rolling(window=24).std()
traffic['is_spike'] = traffic['visitors'] > (
    traffic['rolling_mean'] + 3 * traffic['rolling_std']
)
```

---

## Key Takeaways

1. **DateTime Handling**: Master pd.to_datetime() and date_range()
2. **Indexing**: Use DatetimeIndex for powerful time-based selection
3. **Resampling**: Convert between frequencies (up/downsampling)
4. **Rolling Windows**: Calculate moving statistics
5. **Time Zones**: Handle global time data correctly
6. **Visualization**: Use appropriate plots for temporal patterns

---

## Common Time Series Patterns

- **Trend**: Long-term increase or decrease
- **Seasonality**: Regular patterns (daily, weekly, yearly)
- **Cycles**: Longer-term fluctuations
- **Noise**: Random variation
- **Outliers**: Unusual spikes or drops
- **Missing Data**: Gaps in time series

---

## 🔗 Navigation

- **Previous**: [04 - Data Transformation](./04-Data-Transformation.md)
- **Next**: [2.3 Visualization](../../2.3-Matplotlib-Seaborn-Visualization/README.md)
- **Up**: [Section 2.2 Pandas](./README.md)
