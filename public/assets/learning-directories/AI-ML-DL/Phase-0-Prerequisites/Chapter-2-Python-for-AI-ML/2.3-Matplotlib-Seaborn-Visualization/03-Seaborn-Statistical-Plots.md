# 03 - Seaborn Statistical Plots

## 📋 Table of Contents
- [Introduction](#introduction)
- [Setup and Themes](#setup-and-themes)
- [Distribution Plots](#distribution-plots)
- [Categorical Plots](#categorical-plots)
- [Regression Plots](#regression-plots)
- [Matrix Plots](#matrix-plots)
- [Multi-plot Grids](#multi-plot-grids)
- [Color Palettes](#color-palettes)
- [Practice Exercises](#practice-exercises)

---

## Introduction

Seaborn is built on top of Matplotlib and provides a high-level interface for statistical graphics. It makes complex visualizations simple and beautiful.

**Key Features:**
- 📊 Statistical visualizations
- 🎨 Beautiful default styles
- 🔗 Pandas integration
- 📈 Complex plots with simple code
- 🎨 Sophisticated color palettes

```python
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# Check version
print(sns.__version__)

# Load example dataset
tips = sns.load_dataset('tips')
print(tips.head())
```

---

## Setup and Themes

### Themes and Context

```python
# Available themes
styles = ['darkgrid', 'whitegrid', 'dark', 'white', 'ticks']

# Set theme
sns.set_theme(style='darkgrid')

# Context (scale)
# paper, notebook, talk, poster
sns.set_context('notebook')

# Custom settings
sns.set_theme(
    style='whitegrid',
    context='talk',
    palette='deep',
    font='sans-serif',
    font_scale=1.2
)

# Reset to defaults
sns.reset_defaults()
```

### Figure Aesthetics

```python
# Set style parameters
sns.set_style('whitegrid', {
    'axes.edgecolor': '.2',
    'grid.color': '.9',
    'grid.linestyle': '-'
})

# Temporary style
with sns.axes_style('darkgrid'):
    # plots with darkgrid
    pass
# reverts to previous style

# Remove spines
sns.despine()  # Remove top and right spines
sns.despine(left=True, bottom=True)  # Remove more spines
```

---

## Distribution Plots

### Histogram with KDE

```python
# Load data
tips = sns.load_dataset('tips')

# Histogram
fig, ax = plt.subplots(figsize=(10, 6))
sns.histplot(data=tips, x='total_bill', kde=True, ax=ax)
ax.set_title('Distribution of Total Bill')
plt.show()

# Multiple distributions
fig, ax = plt.subplots(figsize=(10, 6))
sns.histplot(data=tips, x='total_bill', hue='time', 
             kde=True, alpha=0.6, ax=ax)
ax.set_title('Total Bill by Time of Day')
plt.show()

# Binning options
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
sns.histplot(tips['total_bill'], bins=10, ax=axes[0])
axes[0].set_title('10 bins')
sns.histplot(tips['total_bill'], bins=30, ax=axes[1])
axes[1].set_title('30 bins')
sns.histplot(tips['total_bill'], bins='auto', ax=axes[2])
axes[2].set_title('auto bins')
plt.tight_layout()
plt.show()
```

### KDE Plot

```python
# Kernel Density Estimation
fig, ax = plt.subplots(figsize=(10, 6))
sns.kdeplot(data=tips, x='total_bill', ax=ax)
ax.set_title('KDE of Total Bill')
plt.show()

# Multiple KDEs
fig, ax = plt.subplots(figsize=(10, 6))
sns.kdeplot(data=tips, x='total_bill', hue='time', 
            fill=True, alpha=0.5, ax=ax)
ax.set_title('KDE by Time of Day')
plt.show()

# 2D KDE
fig, ax = plt.subplots(figsize=(10, 8))
sns.kdeplot(data=tips, x='total_bill', y='tip', 
            fill=True, cmap='Blues', ax=ax)
ax.set_title('2D KDE: Bill vs Tip')
plt.show()
```

### Distribution Plot (distplot - deprecated, use histplot/kdeplot)

```python
# Using modern approach
fig, ax = plt.subplots(figsize=(10, 6))
sns.histplot(tips['total_bill'], kde=True, stat='density', ax=ax)
ax.set_title('Distribution Plot')
plt.show()
```

### Rug Plot

```python
fig, ax = plt.subplots(figsize=(10, 6))
sns.histplot(tips['total_bill'], kde=True, ax=ax)
sns.rugplot(data=tips, x='total_bill', height=0.05, ax=ax)
ax.set_title('Histogram with Rug Plot')
plt.show()
```

### ECDF Plot

```python
# Empirical Cumulative Distribution Function
fig, ax = plt.subplots(figsize=(10, 6))
sns.ecdfplot(data=tips, x='total_bill', ax=ax)
ax.set_title('ECDF of Total Bill')
ax.grid(True)
plt.show()

# By category
fig, ax = plt.subplots(figsize=(10, 6))
sns.ecdfplot(data=tips, x='total_bill', hue='time', ax=ax)
ax.set_title('ECDF by Time')
ax.grid(True)
plt.show()
```

---

## Categorical Plots

### Bar Plot

```python
# Mean with confidence interval
fig, ax = plt.subplots(figsize=(10, 6))
sns.barplot(data=tips, x='day', y='total_bill', ax=ax)
ax.set_title('Average Total Bill by Day')
plt.show()

# By subcategory
fig, ax = plt.subplots(figsize=(12, 6))
sns.barplot(data=tips, x='day', y='total_bill', hue='time', ax=ax)
ax.set_title('Average Total Bill by Day and Time')
plt.show()

# Estimator
fig, ax = plt.subplots(figsize=(10, 6))
sns.barplot(data=tips, x='day', y='total_bill', 
            estimator=np.median, errorbar=None, ax=ax)
ax.set_title('Median Total Bill by Day')
plt.show()
```

### Count Plot

```python
# Frequency plot
fig, ax = plt.subplots(figsize=(10, 6))
sns.countplot(data=tips, x='day', ax=ax)
ax.set_title('Number of Visits by Day')
plt.show()

# With hue
fig, ax = plt.subplots(figsize=(10, 6))
sns.countplot(data=tips, x='day', hue='time', ax=ax)
ax.set_title('Visits by Day and Time')
plt.show()
```

### Box Plot

```python
# Box plot
fig, ax = plt.subplots(figsize=(10, 6))
sns.boxplot(data=tips, x='day', y='total_bill', ax=ax)
ax.set_title('Total Bill Distribution by Day')
plt.show()

# With hue
fig, ax = plt.subplots(figsize=(12, 6))
sns.boxplot(data=tips, x='day', y='total_bill', hue='time', ax=ax)
ax.set_title('Total Bill by Day and Time')
plt.show()

# Horizontal
fig, ax = plt.subplots(figsize=(10, 8))
sns.boxplot(data=tips, y='day', x='total_bill', ax=ax)
ax.set_title('Horizontal Box Plot')
plt.show()
```

### Violin Plot

```python
# Violin plot (box plot + KDE)
fig, ax = plt.subplots(figsize=(10, 6))
sns.violinplot(data=tips, x='day', y='total_bill', ax=ax)
ax.set_title('Violin Plot of Total Bill')
plt.show()

# Split by hue
fig, ax = plt.subplots(figsize=(12, 6))
sns.violinplot(data=tips, x='day', y='total_bill', 
               hue='sex', split=True, ax=ax)
ax.set_title('Split Violin Plot')
plt.show()

# Inner representation
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
sns.violinplot(data=tips, x='day', y='total_bill', 
               inner='box', ax=axes[0])
axes[0].set_title('inner=box')
sns.violinplot(data=tips, x='day', y='total_bill', 
               inner='quartile', ax=axes[1])
axes[1].set_title('inner=quartile')
sns.violinplot(data=tips, x='day', y='total_bill', 
               inner='point', ax=axes[2])
axes[2].set_title('inner=point')
plt.tight_layout()
plt.show()
```

### Swarm Plot

```python
# Show all points without overlap
fig, ax = plt.subplots(figsize=(10, 6))
sns.swarmplot(data=tips, x='day', y='total_bill', ax=ax)
ax.set_title('Swarm Plot')
plt.show()

# Combine with violin
fig, ax = plt.subplots(figsize=(12, 6))
sns.violinplot(data=tips, x='day', y='total_bill', 
               color='lightgray', ax=ax)
sns.swarmplot(data=tips, x='day', y='total_bill', 
              color='black', alpha=0.5, ax=ax)
ax.set_title('Violin + Swarm Plot')
plt.show()
```

### Strip Plot

```python
# Alternative to swarm (allows overlap)
fig, ax = plt.subplots(figsize=(10, 6))
sns.stripplot(data=tips, x='day', y='total_bill', 
              jitter=True, alpha=0.5, ax=ax)
ax.set_title('Strip Plot with Jitter')
plt.show()

# Combine with box
fig, ax = plt.subplots(figsize=(12, 6))
sns.boxplot(data=tips, x='day', y='total_bill', ax=ax)
sns.stripplot(data=tips, x='day', y='total_bill', 
              color='black', alpha=0.3, ax=ax)
ax.set_title('Box + Strip Plot')
plt.show()
```

### Point Plot

```python
# Show point estimates and confidence intervals
fig, ax = plt.subplots(figsize=(10, 6))
sns.pointplot(data=tips, x='day', y='total_bill', ax=ax)
ax.set_title('Point Plot')
plt.show()

# By category
fig, ax = plt.subplots(figsize=(12, 6))
sns.pointplot(data=tips, x='day', y='total_bill', 
              hue='time', ax=ax)
ax.set_title('Point Plot by Time')
plt.show()
```

---

## Regression Plots

### Scatter with Regression Line

```python
# Simple regression plot
fig, ax = plt.subplots(figsize=(10, 6))
sns.regplot(data=tips, x='total_bill', y='tip', ax=ax)
ax.set_title('Regression: Bill vs Tip')
plt.show()

# Custom scatter properties
fig, ax = plt.subplots(figsize=(10, 6))
sns.regplot(data=tips, x='total_bill', y='tip',
            scatter_kws={'alpha':0.5, 's':50},
            line_kws={'color':'red', 'linewidth':2},
            ax=ax)
ax.set_title('Custom Regression Plot')
plt.show()
```

### LM Plot (Figure-level)

```python
# lmplot creates its own figure
g = sns.lmplot(data=tips, x='total_bill', y='tip', 
               height=6, aspect=1.5)
g.set_axis_labels('Total Bill ($)', 'Tip ($)')
plt.show()

# By category
g = sns.lmplot(data=tips, x='total_bill', y='tip', 
               hue='time', height=6, aspect=1.5)
plt.show()

# Separate plots
g = sns.lmplot(data=tips, x='total_bill', y='tip', 
               col='time', height=5)
plt.show()

# Grid
g = sns.lmplot(data=tips, x='total_bill', y='tip',
               col='time', row='sex', height=4)
plt.show()
```

### Residual Plot

```python
# Check regression assumptions
fig, ax = plt.subplots(figsize=(10, 6))
sns.residplot(data=tips, x='total_bill', y='tip', ax=ax)
ax.set_title('Residual Plot')
ax.axhline(0, color='red', linestyle='--')
plt.show()
```

---

## Matrix Plots

### Heatmap

```python
# Correlation matrix
flights = sns.load_dataset('flights')
flights_pivot = flights.pivot(index='month', columns='year', values='passengers')

fig, ax = plt.subplots(figsize=(12, 8))
sns.heatmap(flights_pivot, annot=True, fmt='d', cmap='YlOrRd', ax=ax)
ax.set_title('Airline Passengers Heatmap')
plt.show()

# Correlation heatmap
iris = sns.load_dataset('iris')
corr = iris.corr(numeric_only=True)

fig, ax = plt.subplots(figsize=(10, 8))
sns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm',
            center=0, square=True, linewidths=1, ax=ax)
ax.set_title('Iris Correlation Matrix')
plt.show()

# Mask for upper triangle
mask = np.triu(np.ones_like(corr, dtype=bool))
fig, ax = plt.subplots(figsize=(10, 8))
sns.heatmap(corr, mask=mask, annot=True, fmt='.2f', 
            cmap='coolwarm', center=0, square=True, ax=ax)
ax.set_title('Lower Triangle Correlation')
plt.show()
```

### Cluster Map

```python
# Hierarchical clustering
iris = sns.load_dataset('iris')
iris_numeric = iris.select_dtypes(include=[np.number])

g = sns.clustermap(iris_numeric, cmap='viridis', 
                   figsize=(10, 10), 
                   row_cluster=True, col_cluster=True)
g.fig.suptitle('Iris Cluster Map', y=1.02)
plt.show()

# With standardization
from scipy.stats import zscore
iris_std = iris_numeric.apply(zscore)

g = sns.clustermap(iris_std, cmap='RdBu_r', center=0,
                   figsize=(10, 10))
g.fig.suptitle('Standardized Cluster Map', y=1.02)
plt.show()
```

---

## Multi-plot Grids

### Pair Plot

```python
# Pairwise relationships
iris = sns.load_dataset('iris')

g = sns.pairplot(iris, hue='species', height=2.5)
g.fig.suptitle('Iris Pair Plot', y=1.02)
plt.show()

# Custom diagonal
g = sns.pairplot(iris, hue='species', diag_kind='kde', height=2.5)
plt.show()

# Select variables
g = sns.pairplot(iris, vars=['sepal_length', 'sepal_width'], 
                 hue='species', height=4)
plt.show()
```

### FacetGrid

```python
# Manual FacetGrid
tips = sns.load_dataset('tips')

g = sns.FacetGrid(tips, col='time', row='sex', height=4)
g.map(sns.histplot, 'total_bill')
g.add_legend()
g.fig.suptitle('Bill Distribution by Time and Sex', y=1.02)
plt.show()

# Scatter
g = sns.FacetGrid(tips, col='day', hue='time', height=4)
g.map(plt.scatter, 'total_bill', 'tip', alpha=0.6)
g.add_legend()
plt.show()

# With margins
g = sns.FacetGrid(tips, col='day', margin_titles=True, height=4)
g.map(sns.scatterplot, 'total_bill', 'tip')
plt.show()
```

### Categorical Plot (catplot)

```python
# High-level categorical interface
g = sns.catplot(data=tips, x='day', y='total_bill', 
                kind='box', height=6, aspect=1.5)
g.set_axis_labels('Day of Week', 'Total Bill ($)')
plt.show()

# Multiple plots
g = sns.catplot(data=tips, x='day', y='total_bill',
                hue='time', col='sex', kind='violin',
                height=5)
plt.show()

# Different kinds: 'strip', 'swarm', 'box', 'violin', 'boxen', 'point', 'bar', 'count'
```

### Distribution Plot (displot)

```python
# High-level distribution interface
g = sns.displot(data=tips, x='total_bill', kind='hist',
                height=6, aspect=1.5)
plt.show()

# Multiple distributions
g = sns.displot(data=tips, x='total_bill', hue='time',
                kind='kde', fill=True, height=6, aspect=1.5)
plt.show()

# Faceted
g = sns.displot(data=tips, x='total_bill', col='day',
                kind='hist', height=4)
plt.show()
```

### Relation Plot (relplot)

```python
# High-level relational interface
g = sns.relplot(data=tips, x='total_bill', y='tip',
                height=6, aspect=1.5)
plt.show()

# By category
g = sns.relplot(data=tips, x='total_bill', y='tip',
                hue='time', style='sex', size='size',
                height=6, aspect=1.5)
plt.show()

# Faceted
g = sns.relplot(data=tips, x='total_bill', y='tip',
                col='day', hue='time', height=4)
plt.show()
```

---

## Color Palettes

### Qualitative Palettes

```python
# Built-in palettes
palettes = ['deep', 'muted', 'bright', 'pastel', 'dark', 'colorblind']

fig, axes = plt.subplots(len(palettes), 1, figsize=(12, 10))
for ax, pal_name in zip(axes, palettes):
    pal = sns.color_palette(pal_name, 10)
    sns.palplot(pal, ax=ax)
    ax.set_title(pal_name)
plt.tight_layout()
plt.show()
```

### Sequential Palettes

```python
# For continuous data
sequential = ['Blues', 'Greens', 'Reds', 'Purples', 'Oranges']

fig, axes = plt.subplots(len(sequential), 1, figsize=(12, 8))
for ax, pal_name in zip(axes, sequential):
    pal = sns.color_palette(pal_name, 10)
    sns.palplot(pal, ax=ax)
    ax.set_title(pal_name)
plt.tight_layout()
plt.show()
```

### Diverging Palettes

```python
# For data with meaningful midpoint
diverging = ['RdBu', 'RdYlGn', 'Spectral', 'coolwarm', 'seismic']

fig, axes = plt.subplots(len(diverging), 1, figsize=(12, 8))
for ax, pal_name in zip(axes, diverging):
    pal = sns.color_palette(pal_name, 11)
    sns.palplot(pal, ax=ax)
    ax.set_title(pal_name)
plt.tight_layout()
plt.show()
```

### Custom Palettes

```python
# Create custom palette
custom_pal = sns.color_palette(['#FF0000', '#00FF00', '#0000FF'])

# Use in plot
fig, ax = plt.subplots(figsize=(10, 6))
sns.barplot(data=tips, x='day', y='total_bill', 
            palette=custom_pal, ax=ax)
plt.show()

# Cubehelix palette
pal = sns.cubehelix_palette(8, start=0.5, rot=-0.75)
sns.palplot(pal)
plt.show()

# Light/dark variations
base_color = sns.color_palette('deep')[0]
pal_light = sns.light_palette(base_color, 8)
pal_dark = sns.dark_palette(base_color, 8)

fig, axes = plt.subplots(2, 1, figsize=(12, 4))
sns.palplot(pal_light, ax=axes[0])
axes[0].set_title('Light Palette')
sns.palplot(pal_dark, ax=axes[1])
axes[1].set_title('Dark Palette')
plt.tight_layout()
plt.show()
```

---

## Practice Exercises

### Exercise 1: Comprehensive EDA
```python
# Load titanic dataset
titanic = sns.load_dataset('titanic')

# Create:
# 1. Distribution of ages by survival
# 2. Count plot of passenger class
# 3. Box plot of fare by class and survival
# 4. Heatmap of correlations
```

### Exercise 2: Multi-plot Dashboard
```python
# Create 2x2 dashboard with:
# - Pair plot subset
# - Violin plot
# - Regression plot
# - Heatmap
```

### Exercise 3: Custom Styling
```python
# Create publication-quality figure with:
# - Custom color palette
# - Professional theme
# - Multiple subplots
# - Proper annotations
```

---

## Key Takeaways

1. **Distribution plots**: `histplot`, `kdeplot`, `ecdfplot`
2. **Categorical plots**: `boxplot`, `violinplot`, `swarmplot`
3. **Regression plots**: `regplot`, `lmplot`
4. **Matrix plots**: `heatmap`, `clustermap`
5. **Multi-plot grids**: `pairplot`, `FacetGrid`, `catplot`
6. **Themes**: Use `set_theme()` for consistent styling
7. **Color palettes**: Choose appropriate palette for data type

---

## 🔗 Navigation

- **Previous**: [02 - Advanced Matplotlib](./02-Advanced-Matplotlib.md)
- **Next**: [2.4 SciPy](../../2.4-SciPy-Scientific-Computing/README.md)
- **Up**: [2.3 Visualization](./README.md)
