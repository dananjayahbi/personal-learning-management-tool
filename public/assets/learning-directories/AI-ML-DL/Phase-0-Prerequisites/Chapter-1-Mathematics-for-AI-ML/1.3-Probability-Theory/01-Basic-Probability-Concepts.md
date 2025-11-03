# Basic Probability Concepts

## 📋 Overview

Probability theory is the mathematical framework for dealing with uncertainty. Machine learning models make predictions under uncertainty, and understanding probability is crucial for building and evaluating these models.

---

## 🎯 Sample Space and Events

### Sample Space (Ω)

The **sample space** is the set of all possible outcomes of an experiment.

**Examples:**
- Coin flip: Ω = {H, T}
- Die roll: Ω = {1, 2, 3, 4, 5, 6}
- Email classification: Ω = {spam, not spam}

### Events

An **event** is a subset of the sample space.

**Examples:**
- A = {rolling an even number} = {2, 4, 6}
- B = {email is spam}
- C = {patient has disease}

### Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
from collections import Counter

# Simulate die rolls
np.random.seed(42)
n_rolls = 1000
rolls = np.random.randint(1, 7, size=n_rolls)

# Count outcomes
counts = Counter(rolls)
print("Die roll frequencies:")
for face, count in sorted(counts.items()):
    print(f"{face}: {count} ({count/n_rolls:.3f})")

# Visualize
plt.figure(figsize=(10, 6))
faces = list(range(1, 7))
frequencies = [counts[face]/n_rolls for face in faces]
plt.bar(faces, frequencies, alpha=0.7, edgecolor='black')
plt.axhline(y=1/6, color='r', linestyle='--', label='Theoretical probability (1/6)')
plt.xlabel('Die Face')
plt.ylabel('Relative Frequency')
plt.title(f'Die Roll Simulation (n={n_rolls})')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
```

---

## 📊 Probability Axioms

### Kolmogorov's Axioms

1. **Non-negativity**: $P(A) \geq 0$ for any event A
2. **Normalization**: $P(\Omega) = 1$
3. **Additivity**: For mutually exclusive events: $P(A \cup B) = P(A) + P(B)$

### Properties

- $P(\emptyset) = 0$ (probability of impossible event)
- $P(A^c) = 1 - P(A)$ (complement rule)
- $0 \leq P(A) \leq 1$ for any event A

### Python Verification

```python
import numpy as np

# Simulate coin flips
n_flips = 10000
flips = np.random.choice(['H', 'T'], size=n_flips)

# Verify axioms
p_heads = np.mean(flips == 'H')
p_tails = np.mean(flips == 'T')
p_total = p_heads + p_tails

print("Axiom Verification:")
print(f"P(Heads) = {p_heads:.4f} ≥ 0 ✓")
print(f"P(Tails) = {p_tails:.4f} ≥ 0 ✓")
print(f"P(Heads) + P(Tails) = {p_total:.4f} ≈ 1 ✓")
print(f"P(Heads) = {p_heads:.4f}, P(Tails) = 1 - P(Heads) = {1-p_heads:.4f} ✓")
```

---

## 🔗 Conditional Probability

The probability of event A given that event B has occurred:

$$P(A|B) = \frac{P(A \cap B)}{P(B)}$$

(provided $P(B) > 0$)

**Interpretation:** Updates probability based on new information.

### Example: Disease Testing

```python
import numpy as np
import pandas as pd

# Medical test example
# Disease prevalence: 1%
# Test sensitivity (true positive rate): 95%
# Test specificity (true negative rate): 90%

n_population = 10000
p_disease = 0.01
p_positive_given_disease = 0.95  # Sensitivity
p_negative_given_no_disease = 0.90  # Specificity

# Simulate population
has_disease = np.random.rand(n_population) < p_disease
test_results = np.zeros(n_population, dtype=bool)

# Apply test
for i in range(n_population):
    if has_disease[i]:
        # Person has disease: test positive with 95% probability
        test_results[i] = np.random.rand() < p_positive_given_disease
    else:
        # Person doesn't have disease: test positive with 10% probability (false positive)
        test_results[i] = np.random.rand() < (1 - p_negative_given_no_disease)

# Create confusion matrix
test_positive = test_results
test_negative = ~test_results

true_positives = np.sum(has_disease & test_positive)
false_positives = np.sum(~has_disease & test_positive)
true_negatives = np.sum(~has_disease & test_negative)
false_negatives = np.sum(has_disease & test_negative)

# Calculate probabilities
p_disease_given_positive = true_positives / (true_positives + false_positives)
p_disease_given_negative = false_negatives / (false_negatives + true_negatives)

print("Conditional Probability Analysis:")
print(f"P(Disease | Test+) = {p_disease_given_positive:.4f}")
print(f"P(Disease | Test-) = {p_disease_given_negative:.4f}")
print(f"\nConfusion Matrix:")
print(f"True Positives:  {true_positives}")
print(f"False Positives: {false_positives}")
print(f"True Negatives:  {true_negatives}")
print(f"False Negatives: {false_negatives}")

# Visualize
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))

# Confusion matrix
confusion = np.array([[true_positives, false_negatives],
                       [false_positives, true_negatives]])
im = ax1.imshow(confusion, cmap='Blues')
ax1.set_xticks([0, 1])
ax1.set_yticks([0, 1])
ax1.set_xticklabels(['Test+', 'Test-'])
ax1.set_yticklabels(['Disease', 'No Disease'])
ax1.set_title('Confusion Matrix')

for i in range(2):
    for j in range(2):
        text = ax1.text(j, i, confusion[i, j], 
                       ha="center", va="center", color="black", fontsize=20)

# Bar plot of conditional probabilities
ax2.bar(['P(Disease|Test+)', 'P(Disease|Test-)'], 
        [p_disease_given_positive, p_disease_given_negative],
        color=['red', 'green'], alpha=0.7)
ax2.set_ylabel('Probability')
ax2.set_title('Conditional Probabilities')
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

---

## 🎲 Bayes' Theorem

One of the most important theorems in ML!

$$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$$

**Components:**
- $P(A|B)$: **Posterior** probability
- $P(B|A)$: **Likelihood**
- $P(A)$: **Prior** probability
- $P(B)$: **Evidence** (normalization constant)

### Example: Spam Classification

```python
import numpy as np
import matplotlib.pyplot as plt

# Email classification using Bayes' Theorem
# P(Spam | "free") = P("free" | Spam) * P(Spam) / P("free")

# Prior probabilities
p_spam = 0.3  # 30% of emails are spam
p_not_spam = 0.7  # 70% are legitimate

# Likelihoods (probability of seeing word "free")
p_free_given_spam = 0.8  # "free" appears in 80% of spam
p_free_given_not_spam = 0.1  # "free" appears in 10% of legitimate emails

# Evidence (total probability of seeing "free")
p_free = p_free_given_spam * p_spam + p_free_given_not_spam * p_not_spam

# Bayes' Theorem: Posterior
p_spam_given_free = (p_free_given_spam * p_spam) / p_free
p_not_spam_given_free = (p_free_given_not_spam * p_not_spam) / p_free

print("Bayes' Theorem Application:")
print(f"Prior: P(Spam) = {p_spam:.3f}")
print(f"Likelihood: P('free'|Spam) = {p_free_given_spam:.3f}")
print(f"Evidence: P('free') = {p_free:.3f}")
print(f"\nPosterior: P(Spam|'free') = {p_spam_given_free:.3f}")
print(f"Posterior: P(Not Spam|'free') = {p_not_spam_given_free:.3f}")

# Visualize
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))

# Prior vs Posterior
categories = ['Spam', 'Not Spam']
priors = [p_spam, p_not_spam]
posteriors = [p_spam_given_free, p_not_spam_given_free]

x = np.arange(len(categories))
width = 0.35

ax1.bar(x - width/2, priors, width, label='Prior P(Class)', alpha=0.7)
ax1.bar(x + width/2, posteriors, width, label='Posterior P(Class|"free")', alpha=0.7)
ax1.set_ylabel('Probability')
ax1.set_title('Bayes Theorem: Prior vs Posterior')
ax1.set_xticks(x)
ax1.set_xticklabels(categories)
ax1.legend()
ax1.grid(True, alpha=0.3)

# Effect of different words
words = ['free', 'meeting', 'winner', 'hello', 'buy']
p_words_spam = [0.8, 0.1, 0.9, 0.3, 0.7]
p_words_not_spam = [0.1, 0.6, 0.05, 0.7, 0.2]

posteriors_spam = []
for p_w_s, p_w_ns in zip(p_words_spam, p_words_not_spam):
    p_w = p_w_s * p_spam + p_w_ns * p_not_spam
    post = (p_w_s * p_spam) / p_w
    posteriors_spam.append(post)

ax2.bar(words, posteriors_spam, color='red', alpha=0.7)
ax2.axhline(y=p_spam, color='blue', linestyle='--', label='Prior P(Spam)')
ax2.set_ylabel('P(Spam | Word)')
ax2.set_title('Posterior Probability for Different Words')
ax2.legend()
ax2.grid(True, alpha=0.3)
ax2.set_ylim([0, 1])

plt.tight_layout()
plt.show()
```

---

## 🔄 Independence

Two events A and B are **independent** if:

$$P(A \cap B) = P(A) \cdot P(B)$$

Equivalently: $P(A|B) = P(A)$ (B doesn't affect A)

**Examples:**
- ✓ Two coin flips are independent
- ✗ Drawing cards without replacement are NOT independent
- ✗ Height and weight are NOT independent

### Python Verification

```python
import numpy as np
import matplotlib.pyplot as plt

# Test independence: two coin flips
n_trials = 10000
coin1 = np.random.choice([0, 1], size=n_trials)  # 0=T, 1=H
coin2 = np.random.choice([0, 1], size=n_trials)

# Check independence: P(H1 ∩ H2) = P(H1) * P(H2)
p_h1 = np.mean(coin1 == 1)
p_h2 = np.mean(coin2 == 1)
p_both = np.mean((coin1 == 1) & (coin2 == 1))
p_expected = p_h1 * p_h2

print("Independence Test:")
print(f"P(H1) = {p_h1:.4f}")
print(f"P(H2) = {p_h2:.4f}")
print(f"P(H1 ∩ H2) observed = {p_both:.4f}")
print(f"P(H1) * P(H2) expected = {p_expected:.4f}")
print(f"Independent: {np.isclose(p_both, p_expected, atol=0.01)}")

# Counter-example: Dependent events (card drawing without replacement)
print("\n" + "="*50)
print("Dependent Events Example:")

# Deck of cards
suits = 4
cards_per_suit = 13
total_cards = suits * cards_per_suit

# Draw two cards without replacement
n_sims = 10000
first_hearts = 0
second_hearts = 0
both_hearts = 0

for _ in range(n_sims):
    deck = list(range(total_cards))
    np.random.shuffle(deck)
    
    card1 = deck[0]
    card2 = deck[1]
    
    if card1 < cards_per_suit:  # First card is heart
        first_hearts += 1
    if card2 < cards_per_suit:  # Second card is heart
        second_hearts += 1
    if (card1 < cards_per_suit) and (card2 < cards_per_suit):
        both_hearts += 1

p_first = first_hearts / n_sims
p_second = second_hearts / n_sims
p_both_observed = both_hearts / n_sims
p_both_if_independent = p_first * p_second

print(f"P(1st heart) = {p_first:.4f}")
print(f"P(2nd heart) = {p_second:.4f}")
print(f"P(both hearts) observed = {p_both_observed:.4f}")
print(f"P(both) if independent = {p_both_if_independent:.4f}")
print(f"Independent: {np.isclose(p_both_observed, p_both_if_independent, atol=0.01)}")
```

---

## 🎓 Key Takeaways

1. **Probability** quantifies uncertainty
2. **Conditional probability** updates beliefs with new information
3. **Bayes' theorem** is fundamental to ML (Naive Bayes, Bayesian inference)
4. **Independence** simplifies calculations
5. Understanding these concepts is crucial for probabilistic ML models

---

## 🔗 Next Steps

- **Next Topic**: [Random Variables](./02-Random-Variables.md)
- **Practice**: Implement Naive Bayes classifier
- **Application**: Build a spam filter using Bayes' theorem

---

## 📚 Additional Resources

- [Khan Academy: Probability](https://www.khanacademy.org/math/statistics-probability/probability-library)
- [Seeing Theory: Probability Visualizations](https://seeing-theory.brown.edu/basic-probability/)
- [Introduction to Probability by Blitzstein](https://projects.iq.harvard.edu/stat110/home)

---

**Remember:** Machine learning is all about making predictions under uncertainty—probability theory gives us the tools!
