# 2.3 Matplotlib & Seaborn Visualization

## 📋 Overview

Data visualization is crucial for understanding patterns, communicating insights, and debugging models. This section covers two essential Python visualization libraries: **Matplotlib** (low-level, full control) and **Seaborn** (high-level, statistical focus).

**Why Visualization Matters:**
- 🔍 **Explore**: Understand data distributions and relationships
- 🐛 **Debug**: Identify data quality issues and model problems
- 📊 **Communicate**: Present findings to stakeholders
- 🎨 **Publish**: Create publication-quality figures

---

## 🎯 Learning Objectives

- Create basic plots (line, scatter, bar, histogram)
- Customize plots (colors, labels, legends, styles)
- Design effective multi-plot layouts
- Apply Seaborn for statistical visualizations
- Follow data visualization best practices
- Export plots for presentations and papers

---

## 📚 Topics

### [01 - Matplotlib Basics](./01-Matplotlib-Basics.md)
**Foundation of Python Plotting**

**Topics**:
- Figure and axes anatomy
- Line plots and scatter plots
- Bar charts and histograms
- Customization (colors, markers, line styles)
- Labels, titles, and legends
- Subplots and layouts
- Saving figures

**Key Functions**: `plt.plot()`, `plt.scatter()`, `plt.bar()`, `plt.hist()`, `plt.subplot()`, `plt.savefig()`

**Time**: 1.5 days | **Exercises**: 8

---

### [02 - Advanced Matplotlib](./02-Advanced-Matplotlib.md)
**Advanced Techniques**

**Topics**:
- 3D plotting
- Contour and heatmaps
- Custom colormaps
- Animations
- Interactive plots
- Figure-level vs axes-level functions
- Publication-ready figures

**Key Functions**: `Axes3D`, `contour()`, `imshow()`, `FuncAnimation`, `tight_layout()`

**Time**: 1 day | **Exercises**: 6

---

### [03 - Seaborn Statistical Plots](./03-Seaborn-Statistical-Plots.md)
**Beautiful Statistical Visualizations**

**Topics**:
- Distribution plots (histplot, kdeplot, rugplot)
- Categorical plots (barplot, boxplot, violinplot)
- Regression plots (regplot, lmplot)
- Matrix plots (heatmap, clustermap)
- Pair plots and facet grids
- Themes and color palettes
- Integration with Pandas

**Key Functions**: `sns.histplot()`, `sns.boxplot()`, `sns.heatmap()`, `sns.pairplot()`, `sns.set_theme()`

**Time**: 1.5 days | **Exercises**: 6

---

## 🎨 Visualization Gallery

### 1. **Time Series**
```python
import matplotlib.pyplot as plt
import pandas as pd

# Line plot with annotations
fig, ax = plt.subplots(figsize=(12, 6))
ax.plot(dates, values, linewidth=2, label='Actual')
ax.plot(dates, rolling_avg, linewidth=2, linestyle='--', label='7-day avg')
ax.set_title('Daily Revenue Trend', fontsize=16)
ax.set_xlabel('Date')
ax.set_ylabel('Revenue ($)')
ax.legend()
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('revenue_trend.png', dpi=300)
```

### 2. **Distribution Comparison**
```python
import seaborn as sns

# Multiple distributions
sns.set_theme(style='whitegrid')
fig, ax = plt.subplots(figsize=(10, 6))
sns.violinplot(data=df, x='category', y='value', ax=ax)
sns.stripplot(data=df, x='category', y='value', color='black', alpha=0.3, ax=ax)
ax.set_title('Value Distribution by Category')
plt.xticks(rotation=45)
plt.tight_layout()
```

### 3. **Correlation Heatmap**
```python
# Correlation matrix visualization
corr = df.corr()
mask = np.triu(np.ones_like(corr, dtype=bool))
fig, ax = plt.subplots(figsize=(10, 8))
sns.heatmap(corr, mask=mask, annot=True, fmt='.2f', 
            cmap='coolwarm', center=0, square=True, 
            linewidths=1, cbar_kws={"shrink": 0.8})
ax.set_title('Feature Correlation Matrix')
plt.tight_layout()
```

### 4. **Multi-Panel Dashboard**
```python
# Create dashboard
fig = plt.figure(figsize=(15, 10))
gs = fig.add_gridspec(3, 3, hspace=0.3, wspace=0.3)

# Revenue trend
ax1 = fig.add_subplot(gs[0, :])
ax1.plot(dates, revenue)
ax1.set_title('Revenue Trend')

# Category distribution
ax2 = fig.add_subplot(gs[1, 0])
df['category'].value_counts().plot(kind='pie', ax=ax2)

# Price vs Quantity
ax3 = fig.add_subplot(gs[1, 1:])
ax3.scatter(df['price'], df['quantity'], alpha=0.5)
ax3.set_xlabel('Price')
ax3.set_ylabel('Quantity')

# Summary statistics
ax4 = fig.add_subplot(gs[2, :])
summary = df.groupby('month')['revenue'].agg(['sum', 'mean', 'count'])
summary.plot(kind='bar', ax=ax4)

plt.savefig('dashboard.png', dpi=300, bbox_inches='tight')
```

---

## 📊 Plot Type Selection Guide

| Data Type | Goal | Best Plot | Seaborn Function |
|-----------|------|-----------|------------------|
| Single continuous | Distribution | Histogram / KDE | `histplot()`, `kdeplot()` |
| Two continuous | Relationship | Scatter | `scatterplot()`, `regplot()` |
| Time series | Trend | Line | `lineplot()` |
| Categorical vs continuous | Compare groups | Box / Violin | `boxplot()`, `violinplot()` |
| Categorical counts | Frequencies | Bar | `countplot()`, `barplot()` |
| Multiple continuous | Correlations | Pair plot / Heatmap | `pairplot()`, `heatmap()` |
| Multiple distributions | Compare | Overlaid KDE | `kdeplot()` with `hue` |
| Parts of whole | Composition | Pie / Stacked bar | `plt.pie()` |

---

## 🎓 Learning Path

### Day 1: Matplotlib Basics
- [ ] Understand figure and axes
- [ ] Create basic plots
- [ ] Customize plots
- [ ] Exercise: Create line plots with multiple series

### Day 2: Matplotlib Advanced
- [ ] Work with subplots
- [ ] Create 3D plots
- [ ] Make publication-ready figures
- [ ] Exercise: Build multi-panel visualization

### Day 3: Seaborn Intro
- [ ] Distribution plots
- [ ] Categorical plots
- [ ] Customize themes
- [ ] Exercise: Exploratory data visualization

### Day 4: Seaborn Advanced
- [ ] Regression plots
- [ ] Matrix plots
- [ ] Pair plots and facets
- [ ] Exercise: Complete analysis visualization

---

## 💡 Best Practices

### 1. **Choose Right Plot Type**
- Don't use pie charts for >5 categories
- Use bar charts for comparisons
- Use line charts for time series
- Use scatter plots for relationships

### 2. **Design Principles**
- Remove chart junk (unnecessary decorations)
- Use color purposefully
- Make text readable (size 10-12 pt minimum)
- Add clear labels and titles
- Include units in axis labels

### 3. **Color Usage**
- Use colorblind-friendly palettes
- Avoid red-green combinations
- Use sequential for ordered data
- Use diverging for data with meaningful midpoint
- Use qualitative for categories

### 4. **Accessibility**
- High contrast
- Large enough text
- Don't rely solely on color
- Add patterns or markers
- Test in grayscale

---

## 🔧 Common Patterns

### Pattern 1: Figure with Multiple Subplots
```python
fig, axes = plt.subplots(2, 2, figsize=(12, 10))
axes[0, 0].plot(x1, y1)
axes[0, 1].scatter(x2, y2)
axes[1, 0].hist(data, bins=30)
axes[1, 1].bar(categories, values)
plt.tight_layout()
```

### Pattern 2: Seaborn with Pandas
```python
import seaborn as sns
sns.set_theme(style='darkgrid')
g = sns.FacetGrid(df, col='category', row='region', height=4)
g.map(sns.scatterplot, 'x', 'y')
g.add_legend()
```

### Pattern 3: Publication Quality
```python
plt.rcParams['figure.dpi'] = 300
plt.rcParams['savefig.dpi'] = 300
plt.rcParams['font.size'] = 12
plt.rcParams['font.family'] = 'serif'
plt.rcParams['axes.linewidth'] = 1.5

fig, ax = plt.subplots(figsize=(8, 6))
# ... plotting code ...
plt.savefig('figure.pdf', bbox_inches='tight')
```

---

## 📝 Exercises

### Beginner (8 exercises)
1. Create line plot with multiple series
2. Make scatter plot with different colors per category
3. Create histogram with KDE overlay
4. Build bar chart with error bars
5. Design 2x2 subplot layout
6. Customize plot with colors and styles
7. Add legend and annotations
8. Save figure in multiple formats

### Intermediate (6 exercises)
9. Create 3D surface plot
10. Make animated line plot
11. Build correlation heatmap
12. Create violin plots for categories
13. Design custom colormap
14. Build interactive plot with widgets

### Advanced (6 exercises)
15. Create publication-ready multi-panel figure
16. Build data dashboard with 6+ plots
17. Implement custom plot type
18. Create geographic visualization
19. Build real-time updating plot
20. Design infographic-style visualization

---

## 🧪 Mini-Project: Comprehensive EDA Visualization

**Goal**: Create complete visual analysis of dataset

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Load data
df = pd.read_csv('data.csv')

# Setup
sns.set_theme(style='whitegrid', palette='deep')
fig = plt.figure(figsize=(20, 12))
gs = fig.add_gridspec(3, 3, hspace=0.3, wspace=0.3)

# 1. Distribution of target variable
ax1 = fig.add_subplot(gs[0, 0])
sns.histplot(data=df, x='target', kde=True, ax=ax1)
ax1.set_title('Target Distribution')

# 2. Correlation heatmap
ax2 = fig.add_subplot(gs[0, 1:])
corr = df.select_dtypes(include=[np.number]).corr()
sns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm', ax=ax2)
ax2.set_title('Feature Correlations')

# 3. Categorical breakdown
ax3 = fig.add_subplot(gs[1, 0])
sns.countplot(data=df, x='category', ax=ax3)
ax3.set_title('Category Counts')
plt.setp(ax3.xaxis.get_majorticklabels(), rotation=45)

# 4. Box plots by category
ax4 = fig.add_subplot(gs[1, 1:])
sns.boxplot(data=df, x='category', y='value', ax=ax4)
ax4.set_title('Value Distribution by Category')

# 5. Pair plot for key features
ax5 = fig.add_subplot(gs[2, :])
scatter_df = df[['feature1', 'feature2', 'target']].sample(1000)
for cat in df['category'].unique():
    mask = scatter_df['category'] == cat
    ax5.scatter(scatter_df[mask]['feature1'], 
                scatter_df[mask]['feature2'],
                label=cat, alpha=0.6)
ax5.set_xlabel('Feature 1')
ax5.set_ylabel('Feature 2')
ax5.legend()
ax5.set_title('Feature Relationships')

plt.savefig('eda_dashboard.png', dpi=300, bbox_inches='tight')
print("Visualization complete!")
```

---

## 🔗 Resources

### Documentation
- [Matplotlib Docs](https://matplotlib.org/stable/contents.html)
- [Seaborn Docs](https://seaborn.pydata.org/)
- [Matplotlib Gallery](https://matplotlib.org/stable/gallery/index.html)
- [Seaborn Gallery](https://seaborn.pydata.org/examples/index.html)

### Tutorials
- [Matplotlib Tutorial](https://matplotlib.org/stable/tutorials/index.html)
- [Seaborn Tutorial](https://seaborn.pydata.org/tutorial.html)
- [Python Graph Gallery](https://www.python-graph-gallery.com/)

### Books
- "Storytelling with Data" by Cole Nussbaumer Knaflic
- "The Visual Display of Quantitative Information" by Edward Tufte
- "Python Data Science Handbook" by Jake VanderPlas (Chapter 4)

---

## ✅ Completion Checklist

- [ ] Create all basic plot types
- [ ] Customize plots professionally
- [ ] Build multi-panel layouts
- [ ] Use Seaborn for statistical plots
- [ ] Apply best practices
- [ ] Create publication-ready figures
- [ ] Complete 20 exercises
- [ ] Build EDA dashboard project

**Time Estimate**: 12-15 hours

---

## 🚀 Next Steps

- Move to **[2.4 SciPy Scientific Computing](../2.4-SciPy-Scientific-Computing/README.md)**
- Practice with Kaggle datasets
- Build visualization portfolio

---

## 🎯 Quick Reference

```python
# Matplotlib Basics
import matplotlib.pyplot as plt
plt.plot(x, y)
plt.scatter(x, y)
plt.bar(x, height)
plt.hist(data, bins=30)
plt.xlabel('X Label')
plt.ylabel('Y Label')
plt.title('Title')
plt.legend()
plt.grid(True)
plt.savefig('plot.png')

# Seaborn Basics
import seaborn as sns
sns.set_theme(style='darkgrid')
sns.histplot(data=df, x='col')
sns.boxplot(data=df, x='cat', y='val')
sns.heatmap(df.corr(), annot=True)
sns.pairplot(df, hue='category')
```

---

**Remember**: A picture is worth a thousand rows of data!

## 🔗 Navigation

- **Previous**: [2.2 Pandas](../2.2-Pandas-Data-Manipulation/README.md)
- **Next**: [2.4 SciPy](../2.4-SciPy-Scientific-Computing/README.md)
- **Up**: [Chapter 2: Python for AI/ML](../README.md)
