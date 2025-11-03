# 1.2 Calculus for Machine Learning - README

## 📚 Section Overview

Calculus provides the mathematical foundation for optimization in machine learning. Every time we train a model, we're using calculus to minimize loss functions through gradient descent.

---

## 📑 Topics Covered

1. ✅ **[Single Variable Calculus](./01-Single-Variable-Calculus.md)** - COMPLETE
   - Limits and continuity
   - Derivatives and differentiation rules  
   - Critical points and optimization
   - Integration basics
   - Gradient descent implementation

2. ✅ **[Multivariable Calculus](./02-Multivariable-Calculus.md)** - COMPLETE
   - Partial derivatives
   - Gradient vectors
   - Directional derivatives
   - Chain rule for backpropagation
   - Neural network training example

3. **Optimization Fundamentals** - Coming Soon
   - Gradient descent variants
   - Newton's method
   - Convex optimization
   - Constrained optimization
   - Second-order methods

4. **Taylor Series and Approximation** - Coming Soon
   - Taylor series expansion
   - Function approximation
   - Error analysis
   - Applications in ML

5. **Applications in ML** - Coming Soon
   - Loss function optimization
   - Backpropagation in depth
   - Optimization algorithms
   - Learning rate schedules

---

## 🎯 Why Calculus Matters in ML

- **Training = Optimization**: Finding parameters that minimize loss
- **Gradients**: Tell us how to update parameters
- **Backpropagation**: Chain rule applied recursively
- **Convergence**: Understanding when training stops improving

---

## 💡 Quick Reference

```python
# Gradient descent update rule
θ_new = θ_old - learning_rate * ∇L(θ)

# Chain rule for composition
d/dx[f(g(x))] = f'(g(x)) * g'(x)

# Partial derivative
∂f/∂x = lim[h→0] (f(x+h,y) - f(x,y)) / h
```

---

**Next**: Continue with optimization techniques or review completed topics.
