# 1.5 Information Theory Basics - README

## 📚 Section Overview

Information theory, founded by Claude Shannon, provides the mathematical framework for quantifying information and uncertainty. These concepts are fundamental to understanding loss functions in machine learning.

---

## 📑 Topics Covered

1. **Entropy** - Coming Soon
   - Shannon entropy
   - Properties of entropy
   - Maximum entropy principle
   - Entropy in ML

2. **Cross-Entropy** - Coming Soon
   - Definition and intuition
   - Cross-entropy loss
   - Binary vs multiclass
   - Relationship to log-likelihood

3. **KL Divergence** - Coming Soon
   - Kullback-Leibler divergence
   - Measuring distribution difference
   - Properties (non-symmetric)
   - Applications in VAEs

4. **Mutual Information** - Coming Soon
   - Measuring dependence
   - Feature selection
   - Information gain
   - Applications

5. **Applications in ML** - Coming Soon
   - Loss functions (cross-entropy)
   - Variational inference
   - Information bottleneck
   - Attention mechanisms

---

## 🎯 Why Information Theory Matters in ML

- **Loss Functions**: Cross-entropy is the most common loss
- **Model Compression**: Information-theoretic bounds
- **Feature Selection**: Mutual information criteria
- **Deep Learning**: Understanding information flow

---

## 💡 Key Formulas

**Entropy:**
$$H(X) = -\sum_x p(x) \log p(x)$$

**Cross-Entropy:**
$$H(p,q) = -\sum_x p(x) \log q(x)$$

**KL Divergence:**
$$D_{KL}(p||q) = \sum_x p(x) \log \frac{p(x)}{q(x)}$$

---

**Next**: Study entropy to understand the foundation of information theory.
