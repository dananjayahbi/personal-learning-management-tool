# 01 - Matplotlib Basics

## 📋 Table of Contents
- [Introduction](#introduction)
- [Figure and Axes](#figure-and-axes)
- [Line Plots](#line-plots)
- [Scatter Plots](#scatter-plots)
- [Bar Charts](#bar-charts)
- [Histograms](#histograms)
- [Customization](#customization)
- [Subplots](#subplots)
- [Saving Figures](#saving-figures)
- [Practice Exercises](#practice-exercises)

---

## Introduction

Matplotlib is the foundation of Python data visualization. It provides low-level control over every aspect of your plots.

**Key Concepts:**
- **Figure**: The whole canvas
- **Axes**: Individual plot area (can have multiple axes in one figure)
- **Artist**: Everything you see on the figure (lines, text, etc.)

**Two interfaces:**
1. **pyplot (state-machine)**: MATLAB-style, simpler for quick plots
2. **Object-oriented**: More control, better for complex plots

```python
import matplotlib.pyplot as plt
import numpy as np

# Check version
print(plt.__version__)
```

---

## Figure and Axes

### Creating Figures

```python
# Simple plot (pyplot interface)
plt.plot([1, 2, 3, 4], [1, 4, 2, 3])
plt.show()

# Object-oriented interface (recommended)
fig, ax = plt.subplots()
ax.plot([1, 2, 3, 4], [1, 4, 2, 3])
plt.show()

# Specify figure size
fig, ax = plt.subplots(figsize=(10, 6))

# Create figure and axes separately
fig = plt.figure(figsize=(10, 6))
ax = fig.add_subplot(111)  # 1x1 grid, first plot

# Access current figure and axes
fig = plt.gcf()  # Get current figure
ax = plt.gca()   # Get current axes
```

### Anatomy of a Figure

```python
fig, ax = plt.subplots(figsize=(10, 6))

# Plot data
ax.plot([1, 2, 3, 4], [1, 4, 2, 3])

# Title
ax.set_title('My First Plot', fontsize=16, fontweight='bold')

# Axis labels
ax.set_xlabel('X Label', fontsize=12)
ax.set_ylabel('Y Label', fontsize=12)

# Axis limits
ax.set_xlim(0, 5)
ax.set_ylim(0, 5)

# Grid
ax.grid(True, alpha=0.3)

# Legend
ax.legend(['Data'], loc='best')

# Tight layout (prevents label cutoff)
plt.tight_layout()
plt.show()
```

---

## Line Plots

### Basic Line Plots

```python
# Sample data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Simple line plot
fig, ax = plt.subplots(figsize=(10, 6))
ax.plot(x, y)
ax.set_title('Sine Wave')
ax.set_xlabel('x')
ax.set_ylabel('sin(x)')
ax.grid(True)
plt.show()

# Multiple lines
y2 = np.cos(x)
fig, ax = plt.subplots(figsize=(10, 6))
ax.plot(x, y, label='sin(x)')
ax.plot(x, y2, label='cos(x)')
ax.legend()
ax.grid(True)
plt.show()
```

### Line Styles and Colors

```python
fig, ax = plt.subplots(figsize=(12, 6))

# Line styles
ax.plot(x, y, linestyle='-', label='solid')
ax.plot(x, y + 0.5, linestyle='--', label='dashed')
ax.plot(x, y + 1.0, linestyle='-.', label='dash-dot')
ax.plot(x, y + 1.5, linestyle=':', label='dotted')

# Short notation
ax.plot(x, y + 2.0, 'r-', label='red solid')
ax.plot(x, y + 2.5, 'g--', label='green dashed')
ax.plot(x, y + 3.0, 'b:', label='blue dotted')

ax.legend()
ax.set_title('Line Styles')
plt.show()

# Line width and transparency
fig, ax = plt.subplots(figsize=(10, 6))
ax.plot(x, y, linewidth=1, label='lw=1')
ax.plot(x, y + 0.5, linewidth=2, label='lw=2')
ax.plot(x, y + 1.0, linewidth=4, label='lw=4')
ax.plot(x, y + 1.5, linewidth=2, alpha=0.3, label='alpha=0.3')
ax.legend()
plt.show()
```

### Colors

```python
# Named colors
colors = ['red', 'green', 'blue', 'orange', 'purple']

# Hex colors
colors_hex = ['#FF0000', '#00FF00', '#0000FF']

# RGB tuples
colors_rgb = [(1, 0, 0), (0, 1, 0), (0, 0, 1)]

# Color maps
from matplotlib import cm
colors_cmap = cm.viridis(np.linspace(0, 1, 5))

fig, ax = plt.subplots(figsize=(10, 6))
for i, color in enumerate(colors):
    ax.plot(x, y + i*0.5, color=color, label=color)
ax.legend()
plt.show()
```

### Markers

```python
fig, ax = plt.subplots(figsize=(10, 6))

# Common markers
ax.plot(x[::5], y[::5], 'o', label='circle')
ax.plot(x[::5], y[::5] + 0.5, 's', label='square')
ax.plot(x[::5], y[::5] + 1.0, '^', label='triangle')
ax.plot(x[::5], y[::5] + 1.5, 'D', label='diamond')
ax.plot(x[::5], y[::5] + 2.0, '*', label='star')

# Combine line and marker
ax.plot(x[::5], y[::5] + 2.5, 'o-', label='line + marker')

ax.legend()
ax.set_title('Marker Styles')
plt.show()

# Marker customization
fig, ax = plt.subplots(figsize=(10, 6))
ax.plot(x[::5], y[::5], marker='o', markersize=10, 
        markerfacecolor='red', markeredgecolor='black', 
        markeredgewidth=2, label='Custom markers')
ax.legend()
plt.show()
```

---

## Scatter Plots

### Basic Scatter

```python
# Generate data
np.random.seed(42)
x = np.random.randn(100)
y = np.random.randn(100)

# Simple scatter
fig, ax = plt.subplots(figsize=(8, 8))
ax.scatter(x, y)
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_title('Scatter Plot')
ax.grid(True, alpha=0.3)
plt.show()
```

### Advanced Scatter

```python
# Color by value
colors = np.random.rand(100)
sizes = 1000 * np.random.rand(100)

fig, ax = plt.subplots(figsize=(10, 8))
scatter = ax.scatter(x, y, c=colors, s=sizes, alpha=0.5, cmap='viridis')

# Add colorbar
cbar = plt.colorbar(scatter, ax=ax)
cbar.set_label('Color Value')

ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_title('Scatter with Colors and Sizes')
ax.grid(True, alpha=0.3)
plt.show()

# Different markers by category
categories = np.random.choice(['A', 'B', 'C'], 100)
markers = {'A': 'o', 'B': 's', 'C': '^'}
colors_cat = {'A': 'red', 'B': 'blue', 'C': 'green'}

fig, ax = plt.subplots(figsize=(10, 8))
for category in ['A', 'B', 'C']:
    mask = categories == category
    ax.scatter(x[mask], y[mask], 
               marker=markers[category],
               color=colors_cat[category],
               label=category,
               s=100,
               alpha=0.6)
ax.legend()
ax.grid(True, alpha=0.3)
plt.show()
```

---

## Bar Charts

### Vertical Bar Charts

```python
# Sample data
categories = ['A', 'B', 'C', 'D', 'E']
values = [23, 45, 56, 78, 32]

# Simple bar chart
fig, ax = plt.subplots(figsize=(10, 6))
ax.bar(categories, values)
ax.set_ylabel('Values')
ax.set_title('Simple Bar Chart')
plt.show()

# Customized
fig, ax = plt.subplots(figsize=(10, 6))
bars = ax.bar(categories, values, color='steelblue', edgecolor='black', linewidth=1.5)

# Color individual bars
bars[2].set_color('red')

# Add value labels
for i, (cat, val) in enumerate(zip(categories, values)):
    ax.text(i, val + 1, str(val), ha='center', va='bottom', fontweight='bold')

ax.set_ylabel('Values')
ax.set_title('Customized Bar Chart')
plt.show()
```

### Horizontal Bar Charts

```python
fig, ax = plt.subplots(figsize=(10, 6))
ax.barh(categories, values, color='coral')
ax.set_xlabel('Values')
ax.set_title('Horizontal Bar Chart')
plt.show()
```

### Grouped Bar Charts

```python
# Data
categories = ['A', 'B', 'C', 'D']
values1 = [25, 32, 34, 20]
values2 = [35, 25, 30, 25]
values3 = [30, 28, 29, 24]

x = np.arange(len(categories))
width = 0.25

fig, ax = plt.subplots(figsize=(10, 6))
ax.bar(x - width, values1, width, label='Group 1', color='steelblue')
ax.bar(x, values2, width, label='Group 2', color='coral')
ax.bar(x + width, values3, width, label='Group 3', color='lightgreen')

ax.set_xlabel('Categories')
ax.set_ylabel('Values')
ax.set_title('Grouped Bar Chart')
ax.set_xticks(x)
ax.set_xticklabels(categories)
ax.legend()
plt.show()
```

### Stacked Bar Charts

```python
fig, ax = plt.subplots(figsize=(10, 6))
ax.bar(categories, values1, label='Group 1', color='steelblue')
ax.bar(categories, values2, bottom=values1, label='Group 2', color='coral')
ax.bar(categories, values3, bottom=np.array(values1) + np.array(values2), 
       label='Group 3', color='lightgreen')

ax.set_ylabel('Values')
ax.set_title('Stacked Bar Chart')
ax.legend()
plt.show()
```

---

## Histograms

### Basic Histogram

```python
# Generate data
data = np.random.randn(1000)

fig, ax = plt.subplots(figsize=(10, 6))
ax.hist(data, bins=30, edgecolor='black')
ax.set_xlabel('Value')
ax.set_ylabel('Frequency')
ax.set_title('Histogram')
plt.show()

# With KDE overlay
from scipy import stats

fig, ax = plt.subplots(figsize=(10, 6))
n, bins, patches = ax.hist(data, bins=30, density=True, 
                            alpha=0.7, edgecolor='black', label='Data')

# KDE
kde = stats.gaussian_kde(data)
x_kde = np.linspace(data.min(), data.max(), 100)
ax.plot(x_kde, kde(x_kde), 'r-', linewidth=2, label='KDE')

ax.set_xlabel('Value')
ax.set_ylabel('Density')
ax.set_title('Histogram with KDE')
ax.legend()
plt.show()
```

### Multiple Histograms

```python
data1 = np.random.normal(0, 1, 1000)
data2 = np.random.normal(2, 1.5, 1000)

fig, ax = plt.subplots(figsize=(10, 6))
ax.hist(data1, bins=30, alpha=0.5, label='Dataset 1', color='blue')
ax.hist(data2, bins=30, alpha=0.5, label='Dataset 2', color='red')
ax.set_xlabel('Value')
ax.set_ylabel('Frequency')
ax.set_title('Overlapping Histograms')
ax.legend()
plt.show()
```

---

## Customization

### Text and Annotations

```python
fig, ax = plt.subplots(figsize=(10, 6))
x = np.linspace(0, 10, 100)
y = np.sin(x)
ax.plot(x, y)

# Add text
ax.text(5, 0.5, 'Text at (5, 0.5)', fontsize=12)

# Annotate specific point
max_idx = np.argmax(y)
ax.annotate('Maximum', 
            xy=(x[max_idx], y[max_idx]),
            xytext=(x[max_idx] + 1, y[max_idx] + 0.3),
            arrowprops=dict(facecolor='red', arrowstyle='->'),
            fontsize=12)

# Title with custom properties
ax.set_title('Customized Plot', fontsize=16, fontweight='bold', 
             color='darkblue', pad=20)

plt.show()
```

### Styling

```python
# Available styles
print(plt.style.available)

# Use style
plt.style.use('seaborn-v0_8-darkgrid')

fig, ax = plt.subplots(figsize=(10, 6))
ax.plot(x, y)
ax.set_title('With Seaborn Style')
plt.show()

# Reset to default
plt.style.use('default')

# Custom style
plt.rcParams['figure.figsize'] = (10, 6)
plt.rcParams['font.size'] = 12
plt.rcParams['lines.linewidth'] = 2
```

### Legends

```python
fig, ax = plt.subplots(figsize=(10, 6))
ax.plot(x, np.sin(x), label='sin(x)')
ax.plot(x, np.cos(x), label='cos(x)')

# Legend positions
# 'best', 'upper right', 'upper left', 'lower left', 'lower right',
# 'right', 'center left', 'center right', 'lower center', 'upper center', 'center'
ax.legend(loc='upper right')

# Custom legend
ax.legend(loc='upper right', frameon=True, fancybox=True, 
          shadow=True, ncol=2, fontsize=12)

plt.show()
```

---

## Subplots

### Basic Subplots

```python
# 2x2 grid
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

axes[0, 0].plot(x, np.sin(x))
axes[0, 0].set_title('sin(x)')

axes[0, 1].plot(x, np.cos(x), 'r')
axes[0, 1].set_title('cos(x)')

axes[1, 0].plot(x, np.tan(x))
axes[1, 0].set_title('tan(x)')
axes[1, 0].set_ylim(-5, 5)

axes[1, 1].plot(x, x**2, 'g')
axes[1, 1].set_title('x²')

plt.tight_layout()
plt.show()
```

### Shared Axes

```python
# Share x-axis
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 8), sharex=True)

ax1.plot(x, np.sin(x))
ax1.set_ylabel('sin(x)')
ax1.grid(True)

ax2.plot(x, np.cos(x), 'r')
ax2.set_ylabel('cos(x)')
ax2.set_xlabel('x')
ax2.grid(True)

plt.tight_layout()
plt.show()
```

### Complex Grid

```python
fig = plt.figure(figsize=(12, 8))

# Using GridSpec
from matplotlib.gridspec import GridSpec
gs = GridSpec(3, 3, figure=fig)

ax1 = fig.add_subplot(gs[0, :])  # Top row, all columns
ax2 = fig.add_subplot(gs[1, :-1]) # Middle row, first two columns
ax3 = fig.add_subplot(gs[1:, -1]) # Last two rows, last column
ax4 = fig.add_subplot(gs[-1, 0])  # Bottom left
ax5 = fig.add_subplot(gs[-1, -2]) # Bottom middle

ax1.plot(x, np.sin(x))
ax2.plot(x, np.cos(x))
ax3.plot(x, np.tan(x))
ax4.plot(x, x**2)
ax5.plot(x, x**3)

plt.tight_layout()
plt.show()
```

---

## Saving Figures

### Save to File

```python
fig, ax = plt.subplots(figsize=(10, 6))
ax.plot(x, y)
ax.set_title('Save Example')

# Save as PNG
plt.savefig('plot.png', dpi=300, bbox_inches='tight')

# Save as PDF (vector format)
plt.savefig('plot.pdf', bbox_inches='tight')

# Save as SVG
plt.savefig('plot.svg', bbox_inches='tight')

# With transparent background
plt.savefig('plot.png', dpi=300, bbox_inches='tight', transparent=True)

plt.show()
```

---

## Practice Exercises

### Exercise 1: Multi-line Plot
```python
x = np.linspace(0, 10, 100)
# Plot sin, cos, tan on same figure with proper styling
```

### Exercise 2: Publication-Quality Figure
```python
# Create a professional-looking scatter plot with:
# - Custom colors and sizes
# - Colorbar
# - Grid
# - Annotations
# - Save as high-res PNG
```

### Exercise 3: Dashboard
```python
# Create 2x2 subplot dashboard showing:
# - Line plot
# - Scatter plot
# - Bar chart
# - Histogram
```

---

## Key Takeaways

1. Use **object-oriented interface** for complex plots
2. Always set **labels, title, and legend**
3. Use **grid** for readability
4. Apply **tight_layout()** before saving
5. Save in **appropriate format** (PNG for web, PDF for print)

---

## 🔗 Navigation

- **Previous**: [Section README](./README.md)
- **Next**: [02 - Advanced Matplotlib](./02-Advanced-Matplotlib.md)
- **Up**: [2.3 Visualization](./README.md)
