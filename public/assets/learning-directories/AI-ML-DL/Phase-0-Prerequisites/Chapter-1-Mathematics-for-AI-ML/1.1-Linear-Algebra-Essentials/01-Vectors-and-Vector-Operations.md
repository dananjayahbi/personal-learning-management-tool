# Vectors and Vector Operations

## 📋 Overview

Vectors are fundamental mathematical objects in machine learning. They represent data points, features, gradients, and weights in neural networks. Understanding vector operations is essential for grasping how ML algorithms process and transform data.

---

## 🎯 What is a Vector?

A **vector** is an ordered collection of numbers. In machine learning:
- A data point with multiple features is a vector
- Model parameters (weights) are vectors
- Gradients in optimization are vectors

### Mathematical Notation

A vector **v** in n-dimensional space:

$$\mathbf{v} = \begin{bmatrix} v_1 \\ v_2 \\ \vdots \\ v_n \end{bmatrix}$$

**Example:**
```
A point in 3D space: v = [2, -1, 3]
An image pixel (RGB): p = [255, 128, 64]
```

### Types of Vectors

1. **Row Vector**: $\mathbf{v} = [v_1, v_2, ..., v_n]$
2. **Column Vector**: $\mathbf{v} = \begin{bmatrix} v_1 \\ v_2 \\ \vdots \\ v_n \end{bmatrix}$

---

## ➕ Vector Addition

Adding two vectors element-wise:

$$\mathbf{a} + \mathbf{b} = \begin{bmatrix} a_1 \\ a_2 \\ a_3 \end{bmatrix} + \begin{bmatrix} b_1 \\ b_2 \\ b_3 \end{bmatrix} = \begin{bmatrix} a_1 + b_1 \\ a_2 + b_2 \\ a_3 + b_3 \end{bmatrix}$$

**Properties:**
- Commutative: $\mathbf{a} + \mathbf{b} = \mathbf{b} + \mathbf{a}$
- Associative: $(\mathbf{a} + \mathbf{b}) + \mathbf{c} = \mathbf{a} + (\mathbf{b} + \mathbf{c})$
- Identity element: $\mathbf{v} + \mathbf{0} = \mathbf{v}$

**Example:**
```
a = [1, 2, 3]
b = [4, 5, 6]
a + b = [5, 7, 9]
```

### Python Implementation

```python
import numpy as np

# Using NumPy
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
result = a + b
print(result)  # [5 7 9]

# Manual implementation
def vector_add(v1, v2):
    return [v1[i] + v2[i] for i in range(len(v1))]

print(vector_add([1, 2, 3], [4, 5, 6]))  # [5, 7, 9]
```

---

## ➖ Vector Subtraction

Subtracting vectors element-wise:

$$\mathbf{a} - \mathbf{b} = \begin{bmatrix} a_1 - b_1 \\ a_2 - b_2 \\ a_3 - b_3 \end{bmatrix}$$

**Geometric Interpretation:** 
- The difference vector points from **b** to **a**

**Example:**
```
a = [5, 7, 9]
b = [1, 2, 3]
a - b = [4, 5, 6]
```

### Python Implementation

```python
import numpy as np

a = np.array([5, 7, 9])
b = np.array([1, 2, 3])
result = a - b
print(result)  # [4 5 6]
```

---

## ✖️ Scalar Multiplication

Multiplying a vector by a scalar (number):

$$c \cdot \mathbf{v} = c \begin{bmatrix} v_1 \\ v_2 \\ v_3 \end{bmatrix} = \begin{bmatrix} c \cdot v_1 \\ c \cdot v_2 \\ c \cdot v_3 \end{bmatrix}$$

**Properties:**
- Distributive: $c(\mathbf{a} + \mathbf{b}) = c\mathbf{a} + c\mathbf{b}$
- Associative: $(ab)\mathbf{v} = a(b\mathbf{v})$
- Identity: $1 \cdot \mathbf{v} = \mathbf{v}$

**Geometric Effect:**
- $c > 1$: Stretches the vector
- $0 < c < 1$: Shrinks the vector
- $c < 0$: Reverses direction

**Example:**
```
v = [2, 3, 4]
3 * v = [6, 9, 12]
```

### Python Implementation

```python
import numpy as np

v = np.array([2, 3, 4])
scalar = 3
result = scalar * v
print(result)  # [6 9 12]
```

---

## 📐 Dot Product (Scalar Product)

The dot product of two vectors produces a **scalar**:

$$\mathbf{a} \cdot \mathbf{b} = \sum_{i=1}^{n} a_i b_i = a_1b_1 + a_2b_2 + ... + a_nb_n$$

**Alternative Formula (using angle):**

$$\mathbf{a} \cdot \mathbf{b} = |\mathbf{a}| |\mathbf{b}| \cos(\theta)$$

where θ is the angle between vectors.

**Properties:**
- Commutative: $\mathbf{a} \cdot \mathbf{b} = \mathbf{b} \cdot \mathbf{a}$
- Distributive: $\mathbf{a} \cdot (\mathbf{b} + \mathbf{c}) = \mathbf{a} \cdot \mathbf{b} + \mathbf{a} \cdot \mathbf{c}$
- $\mathbf{a} \cdot \mathbf{a} = |\mathbf{a}|^2$

**Geometric Interpretation:**
- $\mathbf{a} \cdot \mathbf{b} > 0$: Vectors point in similar direction
- $\mathbf{a} \cdot \mathbf{b} = 0$: Vectors are perpendicular (orthogonal)
- $\mathbf{a} \cdot \mathbf{b} < 0$: Vectors point in opposite directions

**Example:**
```
a = [1, 2, 3]
b = [4, 5, 6]
a · b = (1×4) + (2×5) + (3×6) = 4 + 10 + 18 = 32
```

### Python Implementation

```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# Method 1: Using np.dot
result1 = np.dot(a, b)

# Method 2: Using @ operator
result2 = a @ b

# Method 3: Manual calculation
result3 = sum(a[i] * b[i] for i in range(len(a)))

print(result1, result2, result3)  # All print 32
```

### ML Applications of Dot Product

1. **Similarity Measure**: Cosine similarity in recommendation systems
2. **Neural Networks**: Computing weighted sums in neurons
3. **Projections**: Projecting vectors onto subspaces in PCA
4. **Distance Calculations**: Used in computing Euclidean distance

---

## ❌ Cross Product (Vector Product)

The cross product of two 3D vectors produces a **vector** perpendicular to both:

$$\mathbf{a} \times \mathbf{b} = \begin{bmatrix} a_2b_3 - a_3b_2 \\ a_3b_1 - a_1b_3 \\ a_1b_2 - a_2b_1 \end{bmatrix}$$

**Properties:**
- Anti-commutative: $\mathbf{a} \times \mathbf{b} = -(\mathbf{b} \times \mathbf{a})$
- $\mathbf{a} \times \mathbf{a} = \mathbf{0}$
- Magnitude: $|\mathbf{a} \times \mathbf{b}| = |\mathbf{a}| |\mathbf{b}| \sin(\theta)$

**Note:** Cross product is only defined for 3D vectors (or 7D in special cases).

**Example:**
```
a = [1, 0, 0]
b = [0, 1, 0]
a × b = [0, 0, 1]  (points along z-axis)
```

### Python Implementation

```python
import numpy as np

a = np.array([1, 0, 0])
b = np.array([0, 1, 0])
result = np.cross(a, b)
print(result)  # [0 0 1]
```

### ML Applications of Cross Product

1. **3D Graphics**: Computing surface normals
2. **Robotics**: Calculating torques and rotations
3. **Computer Vision**: Camera orientation and 3D reconstruction

---

## 📏 Vector Norms (Magnitude)

A norm measures the "size" or "length" of a vector.

### L2 Norm (Euclidean Norm)

The most common norm:

$$||\mathbf{v}||_2 = \sqrt{v_1^2 + v_2^2 + ... + v_n^2} = \sqrt{\mathbf{v} \cdot \mathbf{v}}$$

**Example:**
```
v = [3, 4]
||v||₂ = √(3² + 4²) = √(9 + 16) = √25 = 5
```

### L1 Norm (Manhattan Norm)

Sum of absolute values:

$$||\mathbf{v}||_1 = |v_1| + |v_2| + ... + |v_n|$$

**Example:**
```
v = [3, 4]
||v||₁ = |3| + |4| = 7
```

### L∞ Norm (Max Norm)

Maximum absolute value:

$$||\mathbf{v}||_\infty = \max(|v_1|, |v_2|, ..., |v_n|)$$

**Example:**
```
v = [3, 4, -5]
||v||∞ = max(3, 4, 5) = 5
```

### Python Implementation

```python
import numpy as np

v = np.array([3, 4])

# L2 norm
l2_norm = np.linalg.norm(v)  # or np.sqrt(np.sum(v**2))
print(f"L2 norm: {l2_norm}")  # 5.0

# L1 norm
l1_norm = np.linalg.norm(v, ord=1)  # or np.sum(np.abs(v))
print(f"L1 norm: {l1_norm}")  # 7.0

# L∞ norm
linf_norm = np.linalg.norm(v, ord=np.inf)  # or np.max(np.abs(v))
print(f"L∞ norm: {linf_norm}")  # 4.0
```

### ML Applications of Norms

1. **Regularization**: L1 (Lasso) and L2 (Ridge) regularization
2. **Distance Metrics**: Measuring similarity between data points
3. **Gradient Clipping**: Preventing exploding gradients in deep learning
4. **Feature Scaling**: Normalizing feature vectors

---

## 🎯 Unit Vectors and Normalization

A **unit vector** has a norm of 1:

$$\hat{\mathbf{v}} = \frac{\mathbf{v}}{||\mathbf{v}||}$$

**Purpose:** 
- Represents direction without magnitude
- Essential in machine learning for feature scaling

**Example:**
```
v = [3, 4]
||v|| = 5
v̂ = [3/5, 4/5] = [0.6, 0.8]
```

### Python Implementation

```python
import numpy as np

v = np.array([3, 4])
unit_vector = v / np.linalg.norm(v)
print(unit_vector)  # [0.6 0.8]

# Verify it's a unit vector
print(np.linalg.norm(unit_vector))  # 1.0
```

### ML Applications of Normalization

1. **Feature Scaling**: Normalizing input features for neural networks
2. **Cosine Similarity**: Comparing document vectors in NLP
3. **Weight Initialization**: Normalizing weight vectors in neural networks
4. **Batch Normalization**: Normalizing layer activations

---

## 🔧 Practical Exercises

### Exercise 1: Basic Operations
```python
import numpy as np

# Given vectors
a = np.array([2, -1, 3])
b = np.array([1, 4, -2])

# Perform operations
print("a + b =", a + b)
print("a - b =", a - b)
print("3 * a =", 3 * a)
print("a · b =", np.dot(a, b))
print("||a|| =", np.linalg.norm(a))
```

### Exercise 2: Angle Between Vectors
```python
import numpy as np

def angle_between_vectors(a, b):
    """Calculate angle in degrees between two vectors"""
    cos_angle = np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
    angle_rad = np.arccos(np.clip(cos_angle, -1.0, 1.0))
    return np.degrees(angle_rad)

a = np.array([1, 0, 0])
b = np.array([1, 1, 0])
print(f"Angle: {angle_between_vectors(a, b):.2f}°")  # 45°
```

### Exercise 3: Projection of Vector
```python
import numpy as np

def project_vector(a, b):
    """Project vector a onto vector b"""
    return (np.dot(a, b) / np.dot(b, b)) * b

a = np.array([3, 4])
b = np.array([1, 0])
projection = project_vector(a, b)
print("Projection:", projection)  # [3, 0]
```

---

## 🎓 Key Takeaways

1. **Vectors represent data**: Each data point in ML is a vector
2. **Dot product measures similarity**: Used extensively in neural networks
3. **Norms measure magnitude**: Different norms for different purposes
4. **Normalization is crucial**: Unit vectors standardize directions
5. **Vector operations are efficient**: NumPy makes them fast and easy

---

## 🔗 Next Steps

- **Next Topic**: [Matrices and Matrix Operations](./02-Matrices-and-Matrix-Operations.md)
- **Practice**: Solve the exercises at the end of this chapter
- **Visualize**: Use matplotlib to plot vectors in 2D/3D space

---

## 📚 Additional Resources

- [3Blue1Brown: Vectors](https://www.youtube.com/watch?v=fNk_zzaMoSs)
- [Khan Academy: Vector Intro](https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces)
- [NumPy Documentation](https://numpy.org/doc/stable/reference/routines.linalg.html)

---

**Remember:** Master these fundamentals! Every ML algorithm uses vector operations extensively.
