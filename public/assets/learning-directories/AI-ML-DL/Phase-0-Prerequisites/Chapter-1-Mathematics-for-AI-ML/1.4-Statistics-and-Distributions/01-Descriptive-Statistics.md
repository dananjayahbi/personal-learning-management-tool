# Descriptive Statistics

## 📋 Overview

Descriptive statistics summarize and describe the main features of a dataset. Before building any ML model, you must understand your data through descriptive statistics—this is the foundation of exploratory data analysis (EDA).

---

## 📊 Measures of Central Tendency

### Mean (Average)

The arithmetic mean:

$$\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$$

**Properties:**
- Sensitive to outliers
- Most common measure
- Used in many ML algorithms

### Median

The middle value when data is sorted:
- **Odd n**: middle element
- **Even n**: average of two middle elements

**Properties:**
- Robust to outliers
- Better for skewed distributions

### Mode

The most frequently occurring value.

**Properties:**
- Can have multiple modes (bimodal, multimodal)
- Useful for categorical data

### Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

# Generate sample data with outlier
np.random.seed(42)
data = np.concatenate([
    np.random.normal(100, 15, 95),  # Main distribution
    [200, 210, 220, 215, 205]  # Outliers
])

# Calculate measures
mean_val = np.mean(data)
median_val = np.median(data)
mode_val = stats.mode(data.round(), keepdims=True)[0][0]

print("Measures of Central Tendency:")
print(f"Mean:   {mean_val:.2f}")
print(f"Median: {median_val:.2f}")
print(f"Mode:   {mode_val:.2f}")

# Visualize
plt.figure(figsize=(12, 6))

plt.subplot(1, 2, 1)
plt.hist(data, bins=30, edgecolor='black', alpha=0.7)
plt.axvline(mean_val, color='red', linestyle='--', linewidth=2, label=f'Mean: {mean_val:.1f}')
plt.axvline(median_val, color='green', linestyle='--', linewidth=2, label=f'Median: {median_val:.1f}')
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.title('Distribution with Outliers')
plt.legend()
plt.grid(True, alpha=0.3)

# Box plot showing measures
plt.subplot(1, 2, 2)
plt.boxplot(data, vert=True)
plt.axhline(mean_val, color='red', linestyle='--', label='Mean')
plt.axhline(median_val, color='green', linestyle='--', label='Median')
plt.ylabel('Value')
plt.title('Box Plot')
plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

---

## 📏 Measures of Dispersion (Spread)

### Variance

Average squared deviation from mean:

$$\sigma^2 = \frac{1}{n}\sum_{i=1}^{n}(x_i - \bar{x})^2$$

**Sample variance** (unbiased estimator):

$$s^2 = \frac{1}{n-1}\sum_{i=1}^{n}(x_i - \bar{x})^2$$

### Standard Deviation

Square root of variance:

$$\sigma = \sqrt{\sigma^2}$$

**Properties:**
- Same units as original data
- ~68% of data within 1 std dev (for normal distribution)
- ~95% within 2 std devs
- ~99.7% within 3 std devs (68-95-99.7 rule)

### Range

$$\text{Range} = \max(x) - \min(x)$$

### Interquartile Range (IQR)

$$\text{IQR} = Q_3 - Q_1$$

Where:
- $Q_1$: 25th percentile (first quartile)
- $Q_3$: 75th percentile (third quartile)

**Properties:**
- Robust to outliers
- Used in box plots

### Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Generate datasets with different spreads
np.random.seed(42)
data_low_var = np.random.normal(100, 5, 1000)  # Low variance
data_high_var = np.random.normal(100, 20, 1000)  # High variance

def analyze_dispersion(data, name):
    """Calculate all dispersion measures"""
    print(f"\n{name}:")
    print(f"  Range:    {np.ptp(data):.2f}")
    print(f"  Variance: {np.var(data, ddof=1):.2f}")
    print(f"  Std Dev:  {np.std(data, ddof=1):.2f}")
    print(f"  IQR:      {np.percentile(data, 75) - np.percentile(data, 25):.2f}")
    
    return {
        'range': np.ptp(data),
        'variance': np.var(data, ddof=1),
        'std': np.std(data, ddof=1),
        'iqr': np.percentile(data, 75) - np.percentile(data, 25)
    }

stats1 = analyze_dispersion(data_low_var, "Low Variance Data")
stats2 = analyze_dispersion(data_high_var, "High Variance Data")

# Visualize
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Histograms
axes[0, 0].hist(data_low_var, bins=30, alpha=0.7, edgecolor='black', label='Low Variance')
axes[0, 0].axvline(np.mean(data_low_var), color='red', linestyle='--', linewidth=2)
axes[0, 0].axvline(np.mean(data_low_var) + np.std(data_low_var), 
                   color='orange', linestyle=':', linewidth=2, label='±1 Std Dev')
axes[0, 0].axvline(np.mean(data_low_var) - np.std(data_low_var), 
                   color='orange', linestyle=':', linewidth=2)
axes[0, 0].set_title('Low Variance Distribution')
axes[0, 0].set_xlabel('Value')
axes[0, 0].set_ylabel('Frequency')
axes[0, 0].legend()
axes[0, 0].grid(True, alpha=0.3)

axes[0, 1].hist(data_high_var, bins=30, alpha=0.7, edgecolor='black', 
                color='green', label='High Variance')
axes[0, 1].axvline(np.mean(data_high_var), color='red', linestyle='--', linewidth=2)
axes[0, 1].axvline(np.mean(data_high_var) + np.std(data_high_var), 
                   color='orange', linestyle=':', linewidth=2, label='±1 Std Dev')
axes[0, 1].axvline(np.mean(data_high_var) - np.std(data_high_var), 
                   color='orange', linestyle=':', linewidth=2)
axes[0, 1].set_title('High Variance Distribution')
axes[0, 1].set_xlabel('Value')
axes[0, 1].set_ylabel('Frequency')
axes[0, 1].legend()
axes[0, 1].grid(True, alpha=0.3)

# Box plots
axes[1, 0].boxplot([data_low_var, data_high_var], labels=['Low Var', 'High Var'])
axes[1, 0].set_title('Box Plot Comparison')
axes[1, 0].set_ylabel('Value')
axes[1, 0].grid(True, alpha=0.3)

# Comparison of measures
measures = ['Range', 'Variance', 'Std Dev', 'IQR']
low_vals = [stats1['range'], stats1['variance'], stats1['std'], stats1['iqr']]
high_vals = [stats2['range'], stats2['variance'], stats2['std'], stats2['iqr']]

x = np.arange(len(measures))
width = 0.35

axes[1, 1].bar(x - width/2, low_vals, width, label='Low Variance', alpha=0.7)
axes[1, 1].bar(x + width/2, high_vals, width, label='High Variance', alpha=0.7, color='green')
axes[1, 1].set_ylabel('Value')
axes[1, 1].set_title('Dispersion Measures Comparison')
axes[1, 1].set_xticks(x)
axes[1, 1].set_xticklabels(measures)
axes[1, 1].legend()
axes[1, 1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

---

## 📈 Distribution Shape

### Skewness

Measures asymmetry of distribution:

$$\text{Skewness} = \frac{1}{n}\sum_{i=1}^{n}\left(\frac{x_i - \bar{x}}{\sigma}\right)^3$$

**Interpretation:**
- **Skewness = 0**: Symmetric (like normal distribution)
- **Skewness > 0**: Right-skewed (positive skew, long tail to right)
- **Skewness < 0**: Left-skewed (negative skew, long tail to left)

### Kurtosis

Measures "tailedness" of distribution:

$$\text{Kurtosis} = \frac{1}{n}\sum_{i=1}^{n}\left(\frac{x_i - \bar{x}}{\sigma}\right)^4 - 3$$

**Interpretation:**
- **Kurtosis = 0**: Normal distribution (mesokurtic)
- **Kurtosis > 0**: Heavy tails, more outliers (leptokurtic)
- **Kurtosis < 0**: Light tails, fewer outliers (platykurtic)

### Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

np.random.seed(42)

# Create distributions with different shapes
symmetric = np.random.normal(0, 1, 1000)
right_skewed = np.random.exponential(1, 1000)
left_skewed = -np.random.exponential(1, 1000)
heavy_tailed = np.random.standard_t(3, 1000)  # t-distribution with df=3

distributions = {
    'Symmetric (Normal)': symmetric,
    'Right Skewed': right_skewed,
    'Left Skewed': left_skewed,
    'Heavy Tailed': heavy_tailed
}

fig, axes = plt.subplots(2, 2, figsize=(14, 10))
axes = axes.ravel()

for idx, (name, data) in enumerate(distributions.items()):
    # Calculate statistics
    skew = stats.skew(data)
    kurt = stats.kurtosis(data)
    
    # Plot
    axes[idx].hist(data, bins=40, edgecolor='black', alpha=0.7, density=True)
    axes[idx].set_title(f'{name}\nSkewness: {skew:.2f}, Kurtosis: {kurt:.2f}')
    axes[idx].set_xlabel('Value')
    axes[idx].set_ylabel('Density')
    axes[idx].grid(True, alpha=0.3)
    
    # Add mean line
    mean_val = np.mean(data)
    axes[idx].axvline(mean_val, color='red', linestyle='--', 
                      linewidth=2, label=f'Mean: {mean_val:.2f}')
    axes[idx].legend()

plt.tight_layout()
plt.show()

# Summary table
print("\nDistribution Shape Analysis:")
print(f"{'Distribution':<20} {'Skewness':>10} {'Kurtosis':>10}")
print("-" * 42)
for name, data in distributions.items():
    skew = stats.skew(data)
    kurt = stats.kurtosis(data)
    print(f"{name:<20} {skew:>10.3f} {kurt:>10.3f}")
```

---

## 📊 Quartiles and Percentiles

### Percentiles

The $p$-th percentile is the value below which $p$% of data falls.

**Common percentiles:**
- 25th percentile = Q1 (first quartile)
- 50th percentile = Q2 (median)
- 75th percentile = Q3 (third quartile)

### Five-Number Summary

1. Minimum
2. Q1 (25th percentile)
3. Median (50th percentile)
4. Q3 (75th percentile)
5. Maximum

### Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Generate sample data
np.random.seed(42)
data = np.random.normal(100, 15, 1000)

# Calculate percentiles
percentiles = [0, 25, 50, 75, 100]
values = np.percentile(data, percentiles)

print("Five-Number Summary:")
for p, v in zip(percentiles, values):
    label = {0: 'Min', 25: 'Q1', 50: 'Median', 75: 'Q3', 100: 'Max'}
    print(f"{label[p]:>6}: {v:.2f}")

# Calculate custom percentiles
custom_percentiles = np.arange(0, 101, 10)
custom_values = np.percentile(data, custom_percentiles)

# Visualize
fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(16, 5))

# Histogram with quartiles
ax1.hist(data, bins=40, edgecolor='black', alpha=0.7)
colors = ['red', 'orange', 'green', 'orange', 'red']
for p, v, c in zip(percentiles, values, colors):
    ax1.axvline(v, color=c, linestyle='--', linewidth=2, 
                label=f'{p}th percentile: {v:.1f}')
ax1.set_xlabel('Value')
ax1.set_ylabel('Frequency')
ax1.set_title('Distribution with Quartiles')
ax1.legend()
ax1.grid(True, alpha=0.3)

# Box plot
bp = ax2.boxplot(data, vert=True, patch_artist=True)
bp['boxes'][0].set_facecolor('lightblue')
ax2.set_ylabel('Value')
ax2.set_title('Box Plot (Five-Number Summary)')
ax2.grid(True, alpha=0.3)

# Add labels to box plot
ax2.text(1.15, values[0], f'Min: {values[0]:.1f}', va='center')
ax2.text(1.15, values[1], f'Q1: {values[1]:.1f}', va='center')
ax2.text(1.15, values[2], f'Median: {values[2]:.1f}', va='center')
ax2.text(1.15, values[3], f'Q3: {values[3]:.1f}', va='center')
ax2.text(1.15, values[4], f'Max: {values[4]:.1f}', va='center')

# Percentile plot
ax3.plot(custom_percentiles, custom_values, 'bo-', linewidth=2, markersize=6)
ax3.set_xlabel('Percentile')
ax3.set_ylabel('Value')
ax3.set_title('Percentile Plot')
ax3.grid(True, alpha=0.3)
ax3.set_xlim([0, 100])

plt.tight_layout()
plt.show()
```

---

## 🎯 ML Applications

### Feature Understanding

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Load or create sample dataset
np.random.seed(42)
df = pd.DataFrame({
    'age': np.random.randint(18, 80, 1000),
    'income': np.random.lognormal(10, 1, 1000),
    'hours_worked': np.random.normal(40, 10, 1000),
    'satisfaction': np.random.randint(1, 11, 1000)
})

# Comprehensive descriptive statistics
print("Dataset Descriptive Statistics:")
print(df.describe())

# Custom function for detailed stats
def detailed_stats(series, name):
    print(f"\n{name}:")
    print(f"  Mean:     {series.mean():.2f}")
    print(f"  Median:   {series.median():.2f}")
    print(f"  Std Dev:  {series.std():.2f}")
    print(f"  Min:      {series.min():.2f}")
    print(f"  Max:      {series.max():.2f}")
    print(f"  Skewness: {series.skew():.2f}")
    print(f"  Kurtosis: {series.kurtosis():.2f}")

for col in df.columns:
    detailed_stats(df[col], col.title())

# Visualize all features
fig, axes = plt.subplots(2, 2, figsize=(14, 10))
axes = axes.ravel()

for idx, col in enumerate(df.columns):
    axes[idx].hist(df[col], bins=30, edgecolor='black', alpha=0.7)
    axes[idx].axvline(df[col].mean(), color='red', linestyle='--', 
                      linewidth=2, label=f'Mean: {df[col].mean():.1f}')
    axes[idx].axvline(df[col].median(), color='green', linestyle='--', 
                      linewidth=2, label=f'Median: {df[col].median():.1f}')
    axes[idx].set_xlabel(col.title())
    axes[idx].set_ylabel('Frequency')
    axes[idx].set_title(f'Distribution of {col.title()}')
    axes[idx].legend()
    axes[idx].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

---

## 🎓 Key Takeaways

1. **Mean** is sensitive to outliers, **median** is robust
2. **Standard deviation** quantifies spread in original units
3. **IQR** is robust measure of dispersion
4. **Skewness** indicates asymmetry
5. **Kurtosis** measures tail behavior
6. Always start ML projects with descriptive statistics!

---

## 🔗 Next Steps

- **Next Topic**: [Inferential Statistics](./02-Inferential-Statistics.md)
- **Practice**: Perform EDA on a real dataset
- **Application**: Identify outliers and understand data distributions

---

## 📚 Additional Resources

- [Khan Academy: Statistics](https://www.khanacademy.org/math/statistics-probability)
- [StatQuest: Statistics Fundamentals](https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9)
- [Pandas Documentation: describe()](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.describe.html)

---

**Remember:** Understanding your data through descriptive statistics is the first step in any ML project!
