# 02 - Advanced Matplotlib Techniques

## 📋 Table of Contents
- [Introduction](#introduction)
- [3D Plotting](#3d-plotting)
- [Contour and Heatmaps](#contour-and-heatmaps)
- [Animations](#animations)
- [Custom Colormaps](#custom-colormaps)
- [Advanced Text and Annotations](#advanced-text-and-annotations)
- [Custom Tick Formatting](#custom-tick-formatting)
- [Multiple Y-Axes](#multiple-y-axes)
- [Polar Plots](#polar-plots)
- [Practice Exercises](#practice-exercises)

---

## Introduction

Beyond basic plotting, Matplotlib offers advanced features for specialized visualizations, complex layouts, and publication-quality figures.

**Advanced Topics:**
- 3D surface and wireframe plots
- Contour plots and heatmaps
- Animations
- Custom colormaps
- Complex annotations
- Multiple axes
- Polar coordinates

---

## 3D Plotting

### 3D Line Plots

```python
import matplotlib.pyplot as plt
import numpy as np
from mpl_toolkits.mplot3d import Axes3D

# Create 3D data
t = np.linspace(0, 20, 100)
x = np.sin(t)
y = np.cos(t)
z = t

# 3D line plot
fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')

ax.plot(x, y, z, linewidth=2, color='blue')
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.set_title('3D Line Plot')

plt.show()
```

### 3D Scatter Plots

```python
# Random 3D data
np.random.seed(42)
n = 100
x = np.random.randn(n)
y = np.random.randn(n)
z = np.random.randn(n)
colors = np.random.rand(n)
sizes = 1000 * np.random.rand(n)

fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')

scatter = ax.scatter(x, y, z, c=colors, s=sizes, alpha=0.6, cmap='viridis')

ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.set_title('3D Scatter Plot')

# Add colorbar
fig.colorbar(scatter, ax=ax, shrink=0.5)

plt.show()
```

### 3D Surface Plots

```python
# Create meshgrid
x = np.linspace(-5, 5, 50)
y = np.linspace(-5, 5, 50)
X, Y = np.meshgrid(x, y)
Z = np.sin(np.sqrt(X**2 + Y**2))

# Surface plot
fig = plt.figure(figsize=(12, 8))
ax = fig.add_subplot(111, projection='3d')

surf = ax.plot_surface(X, Y, Z, cmap='coolwarm', alpha=0.8,
                       linewidth=0, antialiased=True)

ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.set_title('3D Surface Plot')

# Add colorbar
fig.colorbar(surf, ax=ax, shrink=0.5)

# View angle
ax.view_init(elev=30, azim=45)

plt.show()
```

### 3D Wireframe

```python
fig = plt.figure(figsize=(12, 8))
ax = fig.add_subplot(111, projection='3d')

ax.plot_wireframe(X, Y, Z, color='blue', alpha=0.5)

ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.set_title('3D Wireframe Plot')

plt.show()
```

### 3D Bar Plots

```python
fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')

# Data
x_pos = np.arange(5)
y_pos = np.arange(3)
X_pos, Y_pos = np.meshgrid(x_pos, y_pos)
X_pos = X_pos.flatten()
Y_pos = Y_pos.flatten()
Z_pos = np.zeros_like(X_pos)

dx = dy = 0.8
dz = np.random.randint(1, 10, len(X_pos))

ax.bar3d(X_pos, Y_pos, Z_pos, dx, dy, dz, 
         color='steelblue', alpha=0.8)

ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Value')
ax.set_title('3D Bar Chart')

plt.show()
```

---

## Contour and Heatmaps

### Contour Plots

```python
# Data
x = np.linspace(-3, 3, 100)
y = np.linspace(-3, 3, 100)
X, Y = np.meshgrid(x, y)
Z = np.sin(X) * np.cos(Y)

# Contour plot
fig, ax = plt.subplots(figsize=(10, 8))

contour = ax.contour(X, Y, Z, levels=15, cmap='RdBu_r')
ax.clabel(contour, inline=True, fontsize=8)

ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_title('Contour Plot')
ax.set_aspect('equal')

plt.colorbar(contour, ax=ax)
plt.show()
```

### Filled Contour

```python
fig, ax = plt.subplots(figsize=(10, 8))

contourf = ax.contourf(X, Y, Z, levels=20, cmap='RdBu_r')
contour = ax.contour(X, Y, Z, levels=20, colors='black', 
                     linewidths=0.5, alpha=0.3)

ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_title('Filled Contour Plot')

plt.colorbar(contourf, ax=ax)
plt.show()
```

### Heatmap

```python
# Sample data matrix
data = np.random.rand(10, 12)

fig, ax = plt.subplots(figsize=(10, 8))

im = ax.imshow(data, cmap='YlOrRd', aspect='auto')

# Set ticks
ax.set_xticks(np.arange(data.shape[1]))
ax.set_yticks(np.arange(data.shape[0]))

# Set tick labels
ax.set_xticklabels([f'Col {i}' for i in range(data.shape[1])])
ax.set_yticklabels([f'Row {i}' for i in range(data.shape[0])])

# Rotate tick labels
plt.setp(ax.get_xticklabels(), rotation=45, ha="right",
         rotation_mode="anchor")

# Add values to cells
for i in range(data.shape[0]):
    for j in range(data.shape[1]):
        text = ax.text(j, i, f'{data[i, j]:.2f}',
                      ha="center", va="center", color="black")

ax.set_title('Heatmap with Values')
fig.colorbar(im, ax=ax)
plt.tight_layout()
plt.show()
```

---

## Animations

### Basic Animation

```python
from matplotlib.animation import FuncAnimation

# Data
x = np.linspace(0, 2*np.pi, 100)

fig, ax = plt.subplots(figsize=(10, 6))
line, = ax.plot([], [], lw=2)

ax.set_xlim(0, 2*np.pi)
ax.set_ylim(-1.5, 1.5)
ax.set_xlabel('x')
ax.set_ylabel('sin(x + phase)')
ax.grid(True)

def init():
    line.set_data([], [])
    return line,

def animate(frame):
    y = np.sin(x + frame/10)
    line.set_data(x, y)
    return line,

anim = FuncAnimation(fig, animate, init_func=init,
                     frames=100, interval=50, blit=True)

# Save animation
# anim.save('sine_wave.gif', writer='pillow', fps=20)

plt.show()
```

### Growing Plot Animation

```python
fig, ax = plt.subplots(figsize=(10, 6))
x_data, y_data = [], []
line, = ax.plot([], [], 'b-', lw=2)

ax.set_xlim(0, 100)
ax.set_ylim(-10, 10)
ax.grid(True)

def init():
    line.set_data([], [])
    return line,

def animate(frame):
    x_data.append(frame)
    y_data.append(np.random.randn())
    line.set_data(x_data, y_data)
    return line,

anim = FuncAnimation(fig, animate, init_func=init,
                     frames=100, interval=50, blit=True)

plt.show()
```

### Scatter Animation

```python
np.random.seed(42)

fig, ax = plt.subplots(figsize=(10, 8))
scatter = ax.scatter([], [], s=100, alpha=0.6)

ax.set_xlim(-3, 3)
ax.set_ylim(-3, 3)
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_title('Animated Scatter Plot')
ax.grid(True)

def init():
    scatter.set_offsets(np.empty((0, 2)))
    return scatter,

def animate(frame):
    n = frame + 1
    x = np.random.randn(n)
    y = np.random.randn(n)
    data = np.c_[x, y]
    scatter.set_offsets(data)
    return scatter,

anim = FuncAnimation(fig, animate, init_func=init,
                     frames=50, interval=100, blit=True)

plt.show()
```

---

## Custom Colormaps

### Using Built-in Colormaps

```python
# Available colormaps
cmaps = ['viridis', 'plasma', 'inferno', 'magma', 'cividis',
         'RdBu', 'RdYlGn', 'Spectral', 'coolwarm', 'seismic']

fig, axes = plt.subplots(2, 5, figsize=(15, 6))
data = np.random.rand(10, 10)

for ax, cmap_name in zip(axes.flat, cmaps):
    im = ax.imshow(data, cmap=cmap_name)
    ax.set_title(cmap_name)
    ax.axis('off')
    plt.colorbar(im, ax=ax, fraction=0.046, pad=0.04)

plt.tight_layout()
plt.show()
```

### Creating Custom Colormap

```python
from matplotlib.colors import LinearSegmentedColormap

# Define colors
colors = ['darkblue', 'blue', 'cyan', 'yellow', 'orange', 'red']
n_bins = 100
cmap_custom = LinearSegmentedColormap.from_list('custom', colors, N=n_bins)

# Use custom colormap
fig, ax = plt.subplots(figsize=(10, 8))
data = np.random.randn(100, 100).cumsum(axis=0).cumsum(axis=1)
im = ax.imshow(data, cmap=cmap_custom)
ax.set_title('Custom Colormap')
plt.colorbar(im, ax=ax)
plt.show()
```

### Discrete Colormap

```python
from matplotlib.colors import ListedColormap

# Create discrete colormap
colors_discrete = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF']
cmap_discrete = ListedColormap(colors_discrete)

# Use it
fig, ax = plt.subplots(figsize=(10, 8))
data_categories = np.random.randint(0, 5, (20, 20))
im = ax.imshow(data_categories, cmap=cmap_discrete)
ax.set_title('Discrete Colormap')
plt.colorbar(im, ax=ax, ticks=range(5))
plt.show()
```

---

## Advanced Text and Annotations

### Math Text (LaTeX)

```python
fig, ax = plt.subplots(figsize=(10, 6))
x = np.linspace(0, 2*np.pi, 100)
y = np.sin(x)

ax.plot(x, y)

# LaTeX in labels
ax.set_xlabel(r'$x$ (radians)', fontsize=14)
ax.set_ylabel(r'$\sin(x)$', fontsize=14)
ax.set_title(r'$y = \sin(x)$', fontsize=16)

# LaTeX annotations
ax.text(np.pi/2, 1.1, r'$\frac{\pi}{2}$', fontsize=16, ha='center')
ax.text(np.pi, 0, r'$\pi$', fontsize=16, ha='center')
ax.text(3*np.pi/2, -1.1, r'$\frac{3\pi}{2}$', fontsize=16, ha='center')

ax.grid(True)
plt.show()
```

### Complex Annotations

```python
fig, ax = plt.subplots(figsize=(12, 8))

# Plot
x = np.linspace(0, 10, 100)
y = np.exp(-x/5) * np.sin(2*x)
ax.plot(x, y, 'b-', linewidth=2)

# Multiple annotations
peaks_idx = [15, 35, 55, 75]
for idx in peaks_idx:
    ax.annotate(
        f'Peak\n({x[idx]:.1f}, {y[idx]:.2f})',
        xy=(x[idx], y[idx]),
        xytext=(x[idx]+0.5, y[idx]+0.3),
        bbox=dict(boxstyle='round', facecolor='yellow', alpha=0.5),
        arrowprops=dict(arrowstyle='->', connectionstyle='arc3,rad=0.3',
                       facecolor='red', lw=2)
    )

ax.set_title('Complex Annotations')
ax.grid(True)
plt.show()
```

### Text Boxes

```python
fig, ax = plt.subplots(figsize=(10, 6))

# Plot data
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

ax.plot(x, y1, label='sin(x)')
ax.plot(x, y2, label='cos(x)')

# Text box with statistics
textstr = '\n'.join((
    r'$\mu=%.2f$' % (y1.mean(), ),
    r'$\sigma=%.2f$' % (y1.std(), ),
    r'$\max=%.2f$' % (y1.max(), ),
    r'$\min=%.2f$' % (y1.min(), )
))

props = dict(boxstyle='round', facecolor='wheat', alpha=0.5)
ax.text(0.05, 0.95, textstr, transform=ax.transAxes, fontsize=12,
        verticalalignment='top', bbox=props)

ax.legend()
ax.grid(True)
plt.show()
```

---

## Custom Tick Formatting

### Format Tick Labels

```python
fig, ax = plt.subplots(figsize=(10, 6))

x = np.linspace(0, 1e6, 100)
y = x ** 2

ax.plot(x, y)

# Scientific notation
from matplotlib.ticker import ScalarFormatter
formatter = ScalarFormatter(useMathText=True)
formatter.set_powerlimits((-3, 4))
ax.yaxis.set_major_formatter(formatter)

# Custom x-axis formatter
from matplotlib.ticker import FuncFormatter
def millions(x, pos):
    return f'${x/1e6:.1f}M'
ax.xaxis.set_major_formatter(FuncFormatter(millions))

ax.set_xlabel('Value (Millions)')
ax.set_ylabel('Value Squared')
ax.set_title('Custom Tick Formatting')
ax.grid(True)

plt.show()
```

### Date Formatting

```python
import pandas as pd
from matplotlib.dates import DateFormatter, MonthLocator

# Time series data
dates = pd.date_range('2023-01-01', periods=365, freq='D')
values = np.cumsum(np.random.randn(365))

fig, ax = plt.subplots(figsize=(12, 6))
ax.plot(dates, values)

# Format x-axis
ax.xaxis.set_major_locator(MonthLocator())
ax.xaxis.set_major_formatter(DateFormatter('%b %Y'))

plt.setp(ax.xaxis.get_majorticklabels(), rotation=45, ha='right')

ax.set_xlabel('Date')
ax.set_ylabel('Value')
ax.set_title('Time Series with Date Formatting')
ax.grid(True)

plt.tight_layout()
plt.show()
```

---

## Multiple Y-Axes

### Two Y-Axes

```python
fig, ax1 = plt.subplots(figsize=(10, 6))

# First dataset
x = np.arange(0, 10, 0.1)
y1 = np.exp(-x/10.0)
ax1.plot(x, y1, 'b-', linewidth=2, label='exp(-x/10)')
ax1.set_xlabel('X')
ax1.set_ylabel('Exponential', color='b')
ax1.tick_params(axis='y', labelcolor='b')

# Second y-axis
ax2 = ax1.twinx()
y2 = x**2
ax2.plot(x, y2, 'r-', linewidth=2, label='x^2')
ax2.set_ylabel('Quadratic', color='r')
ax2.tick_params(axis='y', labelcolor='r')

ax1.set_title('Two Y-Axes')
ax1.grid(True, alpha=0.3)

# Combined legend
lines1, labels1 = ax1.get_legend_handles_labels()
lines2, labels2 = ax2.get_legend_handles_labels()
ax1.legend(lines1 + lines2, labels1 + labels2, loc='upper right')

plt.tight_layout()
plt.show()
```

---

## Polar Plots

### Basic Polar Plot

```python
fig, ax = plt.subplots(figsize=(8, 8), subplot_kw=dict(projection='polar'))

# Data
theta = np.linspace(0, 2*np.pi, 100)
r = 1 + np.sin(5*theta)

ax.plot(theta, r, linewidth=2)
ax.set_title('Polar Plot')
ax.grid(True)

plt.show()
```

### Polar Scatter

```python
fig, ax = plt.subplots(figsize=(8, 8), subplot_kw=dict(projection='polar'))

# Random data
n = 100
theta = 2 * np.pi * np.random.rand(n)
r = np.random.rand(n)
colors = theta
sizes = 1000 * r

scatter = ax.scatter(theta, r, c=colors, s=sizes, alpha=0.6, cmap='hsv')

ax.set_title('Polar Scatter Plot')
plt.colorbar(scatter, ax=ax, pad=0.1)

plt.show()
```

---

## Practice Exercises

### Exercise 1: 3D Visualization
Create a 3D plot showing a parametric spiral with changing color.

### Exercise 2: Animated Heatmap
Create an animation showing a heatmap evolving over time.

### Exercise 3: Complex Dashboard
Build a dashboard with:
- Main plot with two y-axes
- Contour plot
- 3D surface plot
- Polar plot

### Exercise 4: Publication Figure
Create a multi-panel figure ready for publication with:
- Custom colormap
- LaTeX labels
- Professional formatting
- Multiple subplots

---

## Key Takeaways

1. **3D Plots**: Use for volumetric data visualization
2. **Contours**: Show function levels clearly
3. **Animations**: Reveal temporal patterns
4. **Custom Colormaps**: Match your data semantics
5. **Annotations**: Guide viewer attention
6. **Multiple Axes**: Compare different scales

---

## 🔗 Navigation

- **Previous**: [01 - Matplotlib Basics](./01-Matplotlib-Basics.md)
- **Next**: [03 - Seaborn Statistical Plots](./03-Seaborn-Statistical-Plots.md)
- **Up**: [2.3 Visualization](./README.md)
