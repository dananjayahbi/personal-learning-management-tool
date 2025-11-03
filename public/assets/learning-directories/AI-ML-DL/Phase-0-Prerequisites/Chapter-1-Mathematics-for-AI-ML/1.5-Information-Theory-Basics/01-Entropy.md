# Entropy

## 📋 Overview

Entropy is a measure of uncertainty or randomness in a random variable. It quantifies the "amount of information" we expect to receive from observing an outcome.

---

## 🎯 Shannon Entropy

### Definition

For a discrete random variable $X$ with PMF $p(x)$:

$$H(X) = -\sum_{x \in \mathcal{X}} p(x) \log_2 p(x)$$

(Using $\log_2$ gives bits; $\ln$ gives nats)

**Interpretation:** Average number of bits needed to encode outcomes of $X$.

### Properties

1. $H(X) \geq 0$ (non-negative)
2. $H(X) = 0$ iff $X$ is deterministic
3. $H(X)$ is maximized when $X$ is uniform
4. For binary variable: $0 \leq H(X) \leq 1$ bit

### Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt

def entropy(probs):
    """Calculate Shannon entropy (in bits)"""
    # Remove zero probabilities (0*log(0) = 0 by convention)
    probs = probs[probs > 0]
    return -np.sum(probs * np.log2(probs))

# Example 1: Fair coin
p_fair = np.array([0.5, 0.5])
H_fair = entropy(p_fair)
print(f"Entropy of fair coin: {H_fair:.4f} bits")

# Example 2: Biased coin
p_biased = np.array([0.9, 0.1])
H_biased = entropy(p_biased)
print(f"Entropy of biased coin: {H_biased:.4f} bits")

# Example 3: Deterministic (no uncertainty)
p_certain = np.array([1.0, 0.0])
H_certain = entropy(p_certain)
print(f"Entropy of certain outcome: {H_certain:.4f} bits")

# Plot entropy vs probability for binary variable
p_values = np.linspace(0.01, 0.99, 100)
entropies = [entropy(np.array([p, 1-p])) for p in p_values]

plt.figure(figsize=(10, 6))
plt.plot(p_values, entropies, linewidth=2)
plt.xlabel('P(X=1)')
plt.ylabel('Entropy H(X) [bits]')
plt.title('Binary Entropy Function')
plt.grid(True)
plt.axhline(y=1, color='r', linestyle='--', label='Maximum entropy')
plt.axvline(x=0.5, color='g', linestyle='--', label='Maximum at p=0.5')
plt.legend()
plt.show()

print(f"\nMaximum entropy at p=0.5: {max(entropies):.4f} bits")
```

---

## 🌳 Decision Trees and Entropy

Entropy is used to measure impurity in decision tree nodes.

### Python Implementation

```python
import numpy as np
from collections import Counter

def calculate_entropy(labels):
    """Calculate entropy of a label distribution"""
    n = len(labels)
    if n == 0:
        return 0
    
    counts = Counter(labels)
    probs = np.array([count/n for count in counts.values()])
    return entropy(probs)

def information_gain(parent, left_child, right_child):
    """Calculate information gain from a split"""
    n = len(parent)
    n_left = len(left_child)
    n_right = len(right_child)
    
    # Weighted average of child entropies
    child_entropy = (n_left/n * calculate_entropy(left_child) + 
                     n_right/n * calculate_entropy(right_child))
    
    # Information gain
    return calculate_entropy(parent) - child_entropy

# Example dataset
data = np.array([
    ['Sunny', 'Hot', 'High', 'Weak', 'No'],
    ['Sunny', 'Hot', 'High', 'Strong', 'No'],
    ['Overcast', 'Hot', 'High', 'Weak', 'Yes'],
    ['Rain', 'Mild', 'High', 'Weak', 'Yes'],
    ['Rain', 'Cool', 'Normal', 'Weak', 'Yes'],
    ['Rain', 'Cool', 'Normal', 'Strong', 'No'],
    ['Overcast', 'Cool', 'Normal', 'Strong', 'Yes'],
    ['Sunny', 'Mild', 'High', 'Weak', 'No'],
    ['Sunny', 'Cool', 'Normal', 'Weak', 'Yes'],
    ['Rain', 'Mild', 'Normal', 'Weak', 'Yes'],
    ['Sunny', 'Mild', 'Normal', 'Strong', 'Yes'],
    ['Overcast', 'Mild', 'High', 'Strong', 'Yes'],
    ['Overcast', 'Hot', 'Normal', 'Weak', 'Yes'],
    ['Rain', 'Mild', 'High', 'Strong', 'No']
])

labels = data[:, -1]  # Play tennis: Yes/No
print(f"Original entropy: {calculate_entropy(labels):.4f} bits")

# Test split on 'Outlook' feature
outlook = data[:, 0]
for value in ['Sunny', 'Overcast', 'Rain']:
    mask = outlook == value
    subset_labels = labels[mask]
    print(f"Entropy({value}): {calculate_entropy(subset_labels):.4f} bits "
          f"({np.sum(mask)} samples)")

# Calculate information gain
sunny_idx = outlook == 'Sunny'
not_sunny_idx = outlook != 'Sunny'
ig = information_gain(labels, labels[sunny_idx], labels[not_sunny_idx])
print(f"\nInformation Gain (Sunny vs Not Sunny): {ig:.4f} bits")
```

---

## 🎓 Key Takeaways

1. **Entropy** measures uncertainty
2. **Maximum entropy** = maximum uncertainty (uniform distribution)
3. **Zero entropy** = complete certainty (deterministic)
4. Used in **decision trees** for splitting criteria
5. Foundation for **cross-entropy loss**

---

## 🔗 Next Steps

- **Next Topic**: [Cross-Entropy](./02-Cross-Entropy.md)
- **Application**: Implement ID3 decision tree algorithm

---

## 📚 Additional Resources

- [Information Theory Primer](https://www.youtube.com/watch?v=ErfnhcEV1O8)
- [Visual Information Theory](https://colah.github.io/posts/2015-09-Visual-Information/)

---

**Remember:** Entropy is the foundation of information theory and appears everywhere in ML!
