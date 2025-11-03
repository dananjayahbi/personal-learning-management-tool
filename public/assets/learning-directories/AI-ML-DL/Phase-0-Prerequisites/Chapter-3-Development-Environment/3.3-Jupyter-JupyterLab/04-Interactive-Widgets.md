# 04 - Interactive Widgets

## 📋 Introduction

Interactive widgets allow you to build GUI controls (sliders, dropdowns, buttons) in Jupyter notebooks, making your code interactive without writing HTML/JavaScript. They're especially powerful for ML model exploration, hyperparameter tuning, and data visualization.

**Why Use Widgets?**
- ✅ Interactive parameter exploration
- ✅ Model hyperparameter tuning
- ✅ Data filtering and visualization
- ✅ Dashboard creation
- ✅ User-friendly interfaces
- ✅ No web development needed
- ✅ Real-time updates

---

## 📦 Installation

### Install ipywidgets

```bash
# Using pip
pip install ipywidgets

# Using conda
conda install -c conda-forge ipywidgets

# Enable for JupyterLab (JupyterLab 3+ auto-enables)
jupyter labextension install @jupyter-widgets/jupyterlab-manager
```

### Verify Installation

```python
import ipywidgets as widgets
print(widgets.__version__)
# Output: 8.0.4 (or similar)
```

---

## 🎛️ Basic Widgets

### Slider

```python
import ipywidgets as widgets
from IPython.display import display

# Integer slider
slider = widgets.IntSlider(
    value=50,
    min=0,
    max=100,
    step=1,
    description='Value:',
    disabled=False,
    continuous_update=False,
    orientation='horizontal',
    readout=True,
    readout_format='d'
)

display(slider)

# Get value
print(slider.value)  # 50
```

### Float Slider

```python
float_slider = widgets.FloatSlider(
    value=0.5,
    min=0.0,
    max=1.0,
    step=0.01,
    description='Learning Rate:',
    readout_format='.3f'
)

display(float_slider)
```

### Range Slider

```python
range_slider = widgets.IntRangeSlider(
    value=[20, 80],
    min=0,
    max=100,
    step=1,
    description='Range:',
    disabled=False,
    continuous_update=False,
    orientation='horizontal'
)

display(range_slider)
print(range_slider.value)  # (20, 80)
```

---

## 🎨 Selection Widgets

### Dropdown

```python
dropdown = widgets.Dropdown(
    options=['Linear', 'RBF', 'Polynomial', 'Sigmoid'],
    value='RBF',
    description='Kernel:',
    disabled=False
)

display(dropdown)
print(dropdown.value)  # 'RBF'
```

### Radio Buttons

```python
radio = widgets.RadioButtons(
    options=['Adam', 'SGD', 'RMSprop', 'Adagrad'],
    value='Adam',
    description='Optimizer:',
    disabled=False
)

display(radio)
```

### Select Multiple

```python
select_multiple = widgets.SelectMultiple(
    options=['feature1', 'feature2', 'feature3', 'feature4'],
    value=['feature1'],
    description='Features:',
    disabled=False
)

display(select_multiple)
print(select_multiple.value)  # ('feature1',)
```

### Toggle Buttons

```python
toggle_buttons = widgets.ToggleButtons(
    options=['Train', 'Validation', 'Test'],
    description='Dataset:',
    disabled=False,
    button_style='',  # 'success', 'info', 'warning', 'danger' or ''
    tooltips=['Training set', 'Validation set', 'Test set']
)

display(toggle_buttons)
```

---

## 🔘 Boolean Widgets

### Checkbox

```python
checkbox = widgets.Checkbox(
    value=False,
    description='Use GPU',
    disabled=False,
    indent=False
)

display(checkbox)
```

### Toggle Button

```python
toggle = widgets.ToggleButton(
    value=False,
    description='Enable Dropout',
    disabled=False,
    button_style='success',  # 'success', 'info', 'warning', 'danger' or ''
    tooltip='Toggle dropout layer',
    icon='check'
)

display(toggle)
```

---

## 📝 Text Input Widgets

### Text

```python
text = widgets.Text(
    value='model_v1',
    placeholder='Enter model name',
    description='Model Name:',
    disabled=False
)

display(text)
```

### Textarea

```python
textarea = widgets.Textarea(
    value='Model configuration:\n- Layers: 3\n- Units: 128',
    placeholder='Enter configuration',
    description='Config:',
    disabled=False,
    rows=5
)

display(textarea)
```

### Password

```python
password = widgets.Password(
    value='',
    placeholder='Enter password',
    description='Password:',
    disabled=False
)

display(password)
```

---

## 🔢 Numeric Input

### IntText

```python
int_text = widgets.IntText(
    value=100,
    description='Epochs:',
    disabled=False
)

display(int_text)
```

### BoundedIntText

```python
bounded_int = widgets.BoundedIntText(
    value=32,
    min=1,
    max=512,
    step=1,
    description='Batch Size:',
    disabled=False
)

display(bounded_int)
```

### FloatText

```python
float_text = widgets.FloatText(
    value=0.001,
    description='Learning Rate:',
    disabled=False
)

display(float_text)
```

---

## 🖱️ Button Widgets

### Button

```python
button = widgets.Button(
    description='Train Model',
    disabled=False,
    button_style='success',  # 'success', 'info', 'warning', 'danger' or ''
    tooltip='Start training',
    icon='play'
)

display(button)

# Add click handler
def on_button_clicked(b):
    print("Training started!")

button.on_click(on_button_clicked)
```

### Multiple Buttons

```python
button_run = widgets.Button(description='Run', button_style='success')
button_stop = widgets.Button(description='Stop', button_style='danger')
button_reset = widgets.Button(description='Reset', button_style='warning')

display(widgets.HBox([button_run, button_stop, button_reset]))
```

---

## 📤 Output Widget

### Display Output

```python
output = widgets.Output()

display(output)

# Write to output
with output:
    print("This appears in the output widget")
    print("Multiple lines supported")
```

### Clear Output

```python
output = widgets.Output()
display(output)

button = widgets.Button(description='Clear')
display(button)

def on_clear(b):
    output.clear_output()
    with output:
        print("Output cleared and rewritten")

button.on_click(on_clear)
```

---

## 🎯 Interactive Functions

### interact()

Automatically creates widgets:

```python
from ipywidgets import interact

def f(x):
    return x ** 2

interact(f, x=10)
# Creates slider from 0 to 30 (3 * default value)
```

**With Specific Widget:**

```python
interact(f, x=widgets.IntSlider(min=0, max=100, step=5, value=50))
```

**Multiple Parameters:**

```python
def plot_function(amplitude, frequency, phase):
    import numpy as np
    import matplotlib.pyplot as plt
    
    x = np.linspace(0, 10, 1000)
    y = amplitude * np.sin(frequency * x + phase)
    
    plt.figure(figsize=(10, 4))
    plt.plot(x, y)
    plt.ylim(-5, 5)
    plt.title(f'Sine Wave: {amplitude} * sin({frequency} * x + {phase})')
    plt.show()

interact(plot_function, 
         amplitude=(0, 5, 0.1),
         frequency=(0.1, 10, 0.1),
         phase=(0, np.pi*2, 0.1))
```

### interactive()

Returns widget object:

```python
from ipywidgets import interactive

def f(x, y):
    return x + y

w = interactive(f, x=10, y=20)
display(w)

# Access result
print(w.result)  # 30
```

### interact_manual()

Adds "Run Interact" button:

```python
from ipywidgets import interact_manual

@interact_manual
def slow_function(x):
    import time
    time.sleep(2)
    return x ** 2
```

---

## 📊 ML Examples

### Example 1: Linear Regression Visualization

```python
import numpy as np
import matplotlib.pyplot as plt
from ipywidgets import interact

def plot_linear_regression(slope, intercept):
    x = np.linspace(0, 10, 100)
    y = slope * x + intercept
    
    # Generate sample data with noise
    x_data = np.linspace(0, 10, 20)
    y_data = slope * x_data + intercept + np.random.randn(20) * 2
    
    plt.figure(figsize=(10, 6))
    plt.scatter(x_data, y_data, label='Data', alpha=0.6)
    plt.plot(x, y, 'r-', label=f'y = {slope:.2f}x + {intercept:.2f}', linewidth=2)
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.title('Linear Regression')
    plt.legend()
    plt.grid(True)
    plt.show()

interact(plot_linear_regression, 
         slope=(-5.0, 5.0, 0.1), 
         intercept=(-10.0, 10.0, 0.5))
```

### Example 2: Neural Network Architecture Explorer

```python
from ipywidgets import interact, widgets

def nn_architecture(layers, units_per_layer, activation):
    print(f"Neural Network Architecture:")
    print(f"Input Layer: 784 units (28x28 image)")
    
    for i in range(layers):
        print(f"Hidden Layer {i+1}: {units_per_layer} units, activation={activation}")
    
    print(f"Output Layer: 10 units (classes), activation=softmax")
    
    total_params = 784 * units_per_layer  # Input to first hidden
    for i in range(layers - 1):
        total_params += units_per_layer * units_per_layer  # Hidden to hidden
    total_params += units_per_layer * 10  # Last hidden to output
    
    print(f"\nTotal parameters: {total_params:,}")

interact(nn_architecture,
         layers=widgets.IntSlider(min=1, max=5, value=2, description='Layers:'),
         units_per_layer=widgets.IntSlider(min=16, max=512, step=16, value=128, description='Units:'),
         activation=widgets.Dropdown(options=['relu', 'tanh', 'sigmoid'], value='relu', description='Activation:'))
```

### Example 3: Decision Boundary Visualization

```python
from sklearn.datasets import make_classification
from sklearn.svm import SVC
import matplotlib.pyplot as plt
import numpy as np

# Generate data
X, y = make_classification(n_samples=100, n_features=2, n_redundant=0, 
                           n_informative=2, n_clusters_per_class=1, random_state=42)

def plot_decision_boundary(C, kernel, gamma):
    # Train model
    model = SVC(C=C, kernel=kernel, gamma=gamma)
    model.fit(X, y)
    
    # Create mesh
    h = .02
    x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
    y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1
    xx, yy = np.meshgrid(np.arange(x_min, x_max, h),
                         np.arange(y_min, y_max, h))
    
    # Predict
    Z = model.predict(np.c_[xx.ravel(), yy.ravel()])
    Z = Z.reshape(xx.shape)
    
    # Plot
    plt.figure(figsize=(10, 6))
    plt.contourf(xx, yy, Z, alpha=0.4, cmap=plt.cm.RdYlBu)
    plt.scatter(X[:, 0], X[:, 1], c=y, cmap=plt.cm.RdYlBu, edgecolors='black')
    plt.xlabel('Feature 1')
    plt.ylabel('Feature 2')
    plt.title(f'SVM Decision Boundary (C={C}, kernel={kernel}, gamma={gamma})')
    plt.show()
    
    # Accuracy
    accuracy = model.score(X, y)
    print(f'Training Accuracy: {accuracy:.2%}')

interact(plot_decision_boundary,
         C=widgets.FloatLogSlider(value=1.0, base=10, min=-2, max=2, step=0.1, description='C:'),
         kernel=widgets.Dropdown(options=['linear', 'rbf', 'poly'], value='rbf', description='Kernel:'),
         gamma=widgets.FloatLogSlider(value=1.0, base=10, min=-2, max=2, step=0.1, description='Gamma:'))
```

### Example 4: Image Filter Explorer

```python
from scipy import ndimage
from skimage import data
import matplotlib.pyplot as plt

def apply_filter(filter_type, sigma, size):
    # Load sample image
    image = data.camera()
    
    # Apply filter
    if filter_type == 'Gaussian':
        filtered = ndimage.gaussian_filter(image, sigma=sigma)
    elif filter_type == 'Median':
        filtered = ndimage.median_filter(image, size=size)
    elif filter_type == 'Uniform':
        filtered = ndimage.uniform_filter(image, size=size)
    else:
        filtered = image
    
    # Plot
    fig, axes = plt.subplots(1, 2, figsize=(12, 6))
    axes[0].imshow(image, cmap='gray')
    axes[0].set_title('Original')
    axes[0].axis('off')
    
    axes[1].imshow(filtered, cmap='gray')
    axes[1].set_title(f'{filter_type} Filter')
    axes[1].axis('off')
    
    plt.tight_layout()
    plt.show()

interact(apply_filter,
         filter_type=widgets.Dropdown(options=['Gaussian', 'Median', 'Uniform', 'None'], 
                                      value='Gaussian', description='Filter:'),
         sigma=widgets.FloatSlider(min=0, max=10, step=0.5, value=2, description='Sigma:'),
         size=widgets.IntSlider(min=1, max=15, step=2, value=5, description='Size:'))
```

---

## 🎨 Layout and Styling

### Box Layouts

#### HBox (Horizontal)

```python
slider = widgets.IntSlider(description='Value:')
label = widgets.Label(value='Current: 0')

hbox = widgets.HBox([slider, label])
display(hbox)

# Link slider to label
def update_label(change):
    label.value = f'Current: {change["new"]}'

slider.observe(update_label, names='value')
```

#### VBox (Vertical)

```python
title = widgets.HTML('<h3>Model Parameters</h3>')
lr_slider = widgets.FloatSlider(description='Learning Rate:', value=0.001, min=0, max=0.1, step=0.001)
batch_slider = widgets.IntSlider(description='Batch Size:', value=32, min=1, max=256)
button = widgets.Button(description='Train')

vbox = widgets.VBox([title, lr_slider, batch_slider, button])
display(vbox)
```

### Grid Layout

```python
grid = widgets.GridspecLayout(3, 3)

for i in range(3):
    for j in range(3):
        grid[i, j] = widgets.Button(description=f'Button {i},{j}')

display(grid)
```

### Accordion

```python
accordion = widgets.Accordion(children=[
    widgets.IntSlider(description='Epochs:'),
    widgets.FloatSlider(description='LR:'),
    widgets.Dropdown(options=['Adam', 'SGD'], description='Optimizer:')
])

accordion.set_title(0, 'Training')
accordion.set_title(1, 'Hyperparameters')
accordion.set_title(2, 'Optimizer')

display(accordion)
```

### Tab

```python
tab_contents = [
    widgets.VBox([widgets.IntSlider(description='Epochs:'), 
                  widgets.IntSlider(description='Batch Size:')]),
    widgets.VBox([widgets.FloatSlider(description='Learning Rate:'), 
                  widgets.Dropdown(options=['Adam', 'SGD'], description='Optimizer:')]),
    widgets.Textarea(description='Notes:', rows=5)
]

tab = widgets.Tab(children=tab_contents)
tab.set_title(0, 'Basic')
tab.set_title(1, 'Advanced')
tab.set_title(2, 'Notes')

display(tab)
```

---

## 🔗 Widget Linking

### Link

```python
slider1 = widgets.IntSlider(description='Slider 1:')
slider2 = widgets.IntSlider(description='Slider 2:')

# Link both directions
link = widgets.link((slider1, 'value'), (slider2, 'value'))

display(widgets.VBox([slider1, slider2]))
```

### Directional Link

```python
slider = widgets.IntSlider(description='Input:')
label = widgets.Label()

# One-way link: slider -> label
dlink = widgets.dlink((slider, 'value'), (label, 'value'))

display(widgets.VBox([slider, label]))
```

---

## 🎯 Complete ML Dashboard Example

```python
import ipywidgets as widgets
from IPython.display import display
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Create widgets
output = widgets.Output()

n_samples_slider = widgets.IntSlider(value=1000, min=100, max=5000, step=100, description='Samples:')
n_estimators_slider = widgets.IntSlider(value=100, min=10, max=500, step=10, description='Trees:')
max_depth_slider = widgets.IntSlider(value=5, min=1, max=20, description='Max Depth:')
test_size_slider = widgets.FloatSlider(value=0.2, min=0.1, max=0.5, step=0.05, description='Test Size:')

train_button = widgets.Button(description='Train Model', button_style='success')
clear_button = widgets.Button(description='Clear Output', button_style='warning')

# Layout
controls = widgets.VBox([
    widgets.HTML('<h2>Random Forest Classifier Dashboard</h2>'),
    n_samples_slider,
    n_estimators_slider,
    max_depth_slider,
    test_size_slider,
    widgets.HBox([train_button, clear_button])
])

dashboard = widgets.HBox([controls, output])

# Event handlers
def train_model(b):
    with output:
        output.clear_output(wait=True)
        
        print("Generating dataset...")
        X, y = make_classification(
            n_samples=n_samples_slider.value,
            n_features=20,
            n_informative=15,
            n_redundant=5,
            random_state=42
        )
        
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size_slider.value, random_state=42
        )
        
        print(f"Training on {len(X_train)} samples...")
        model = RandomForestClassifier(
            n_estimators=n_estimators_slider.value,
            max_depth=max_depth_slider.value,
            random_state=42
        )
        model.fit(X_train, y_train)
        
        print("\nEvaluating model...")
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f"\n{'='*50}")
        print(f"Accuracy: {accuracy:.2%}")
        print(f"{'='*50}\n")
        
        print("Classification Report:")
        print(classification_report(y_test, y_pred))
        
        # Feature importance plot
        importances = model.feature_importances_
        indices = np.argsort(importances)[::-1][:10]
        
        plt.figure(figsize=(10, 5))
        plt.bar(range(10), importances[indices])
        plt.title('Top 10 Feature Importances')
        plt.xlabel('Feature Index')
        plt.ylabel('Importance')
        plt.xticks(range(10), indices)
        plt.show()

def clear_output_handler(b):
    output.clear_output()

train_button.on_click(train_model)
clear_button.on_click(clear_output_handler)

# Display dashboard
display(dashboard)
```

---

## 🎓 Exercises

### Exercise 1: Interactive Data Explorer
Create sliders to filter a dataset by multiple features and display filtered results.

### Exercise 2: Hyperparameter Tuning Dashboard
Build a dashboard with widgets for all hyperparameters of a model, with a "Train" button that shows results.

### Exercise 3: Image Augmentation Explorer
Create widgets to control image augmentation parameters (rotation, zoom, brightness) and display the result.

---

## 🎯 Key Takeaways

1. ✅ **interact()** - Quick interactive functions
2. ✅ **Widget types** - Sliders, dropdowns, buttons, checkboxes
3. ✅ **Layouts** - HBox, VBox, Grid, Tabs
4. ✅ **Output widget** - Capture and display results
5. ✅ **Event handlers** - on_click, observe
6. ✅ **ML applications** - Hyperparameter tuning, visualization
7. ✅ **Dashboards** - Combine widgets for complete interfaces

---

## 🔗 Navigation

- **Up**: [3.3 Jupyter & JupyterLab Overview](./README.md)
- **Previous**: [03 - Magic Commands](./03-Magic-Commands.md)
- **Next**: [05 - Extensions and Tools](./05-Extensions-Tools.md)

---

**Remember:** Widgets make notebooks interactive and user-friendly. Use them for exploration, demonstrations, and building ML dashboards!
