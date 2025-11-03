# 03 - Statistical Functions in SciPy

## 📋 Table of Contents
- [Introduction](#introduction)
- [Probability Distributions](#probability-distributions)
- [Statistical Tests](#statistical-tests)
- [Descriptive Statistics](#descriptive-statistics)
- [Hypothesis Testing](#hypothesis-testing)
- [Correlation and Regression](#correlation-and-regression)
- [Multivariate Statistics](#multivariate-statistics)
- [Survival Analysis](#survival-analysis)
- [Practice Exercises](#practice-exercises)

---

## Introduction

SciPy's `stats` module provides comprehensive statistical functions essential for data analysis and machine learning.

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats
import pandas as pd

# Check version
import scipy
print(scipy.__version__)
```

---

## Probability Distributions

### Continuous Distributions

```python
# Normal (Gaussian) distribution
mu, sigma = 0, 1
norm_dist = stats.norm(loc=mu, scale=sigma)

# PDF (Probability Density Function)
x = np.linspace(-4, 4, 1000)
pdf = norm_dist.pdf(x)

# CDF (Cumulative Distribution Function)
cdf = norm_dist.cdf(x)

# Plotting
fig, axes = plt.subplots(1, 2, figsize=(14, 5))
axes[0].plot(x, pdf, 'b-', linewidth=2)
axes[0].set_title('Normal PDF')
axes[0].set_xlabel('x')
axes[0].set_ylabel('Probability Density')
axes[0].grid(True)

axes[1].plot(x, cdf, 'r-', linewidth=2)
axes[1].set_title('Normal CDF')
axes[1].set_xlabel('x')
axes[1].set_ylabel('Cumulative Probability')
axes[1].grid(True)
plt.tight_layout()
plt.show()

# Percent point function (inverse CDF)
p = 0.95
quantile = norm_dist.ppf(p)
print(f"{p*100}% quantile: {quantile:.4f}")

# Generate random samples
samples = norm_dist.rvs(size=1000)
print(f"Sample mean: {np.mean(samples):.4f}")
print(f"Sample std: {np.std(samples):.4f}")
```

### Common Continuous Distributions

```python
# Exponential
exp_dist = stats.expon(scale=2)

# Uniform
uniform_dist = stats.uniform(loc=0, scale=10)

# Chi-square
chi2_dist = stats.chi2(df=5)

# t-distribution
t_dist = stats.t(df=10)

# F-distribution
f_dist = stats.f(dfn=5, dfd=10)

# Beta
beta_dist = stats.beta(a=2, b=5)

# Gamma
gamma_dist = stats.gamma(a=2, scale=2)

# Compare distributions
x = np.linspace(0, 10, 1000)
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
axes = axes.flatten()

distributions = [
    (exp_dist, 'Exponential', x),
    (chi2_dist, 'Chi-square', x),
    (t_dist, 't-distribution', np.linspace(-5, 5, 1000)),
    (f_dist, 'F-distribution', x),
    (beta_dist, 'Beta', np.linspace(0, 1, 1000)),
    (gamma_dist, 'Gamma', x)
]

for ax, (dist, name, x_range) in zip(axes, distributions):
    ax.plot(x_range, dist.pdf(x_range), linewidth=2)
    ax.set_title(name)
    ax.set_xlabel('x')
    ax.set_ylabel('PDF')
    ax.grid(True)

plt.tight_layout()
plt.show()
```

### Discrete Distributions

```python
# Binomial (n trials, probability p)
n, p = 20, 0.5
binom_dist = stats.binom(n=n, p=p)

# PMF (Probability Mass Function)
k = np.arange(0, n+1)
pmf = binom_dist.pmf(k)

plt.figure(figsize=(10, 6))
plt.bar(k, pmf, alpha=0.7, color='blue')
plt.title(f'Binomial PMF (n={n}, p={p})')
plt.xlabel('Number of successes')
plt.ylabel('Probability')
plt.grid(True, alpha=0.3)
plt.show()

# Mean and variance
print(f"Mean: {binom_dist.mean()}")
print(f"Variance: {binom_dist.var()}")

# Poisson
lambda_param = 5
poisson_dist = stats.poisson(mu=lambda_param)
k = np.arange(0, 20)
plt.figure(figsize=(10, 6))
plt.bar(k, poisson_dist.pmf(k), alpha=0.7, color='green')
plt.title(f'Poisson PMF (λ={lambda_param})')
plt.xlabel('k')
plt.ylabel('Probability')
plt.grid(True, alpha=0.3)
plt.show()

# Geometric
p = 0.3
geom_dist = stats.geom(p=p)

# Negative Binomial
nbinom_dist = stats.nbinom(n=5, p=0.5)
```

### Multivariate Normal

```python
# 2D multivariate normal
mean = [0, 0]
cov = [[1, 0.5], [0.5, 1]]  # Covariance matrix
mvn = stats.multivariate_normal(mean=mean, cov=cov)

# Sample
samples = mvn.rvs(size=1000)

# Plot
plt.figure(figsize=(10, 8))
plt.scatter(samples[:, 0], samples[:, 1], alpha=0.5)
plt.xlabel('X1')
plt.ylabel('X2')
plt.title('Multivariate Normal Samples')
plt.grid(True)
plt.axis('equal')
plt.show()

# PDF evaluation
x, y = np.mgrid[-3:3:.1, -3:3:.1]
pos = np.dstack((x, y))
pdf = mvn.pdf(pos)

# Contour plot
plt.figure(figsize=(10, 8))
plt.contourf(x, y, pdf, levels=20, cmap='viridis')
plt.colorbar(label='PDF')
plt.xlabel('X1')
plt.ylabel('X2')
plt.title('Multivariate Normal PDF')
plt.show()
```

---

## Statistical Tests

### t-test

```python
# One-sample t-test
# H0: mean = 0
np.random.seed(42)
data = stats.norm(loc=0.5, scale=1).rvs(100)

statistic, pvalue = stats.ttest_1samp(data, 0)
print("One-sample t-test:")
print(f"t-statistic: {statistic:.4f}")
print(f"p-value: {pvalue:.4f}")
print(f"Reject H0 (α=0.05): {pvalue < 0.05}")

# Two-sample t-test (independent)
group1 = stats.norm(loc=0, scale=1).rvs(100)
group2 = stats.norm(loc=0.5, scale=1).rvs(100)

statistic, pvalue = stats.ttest_ind(group1, group2)
print("\nTwo-sample t-test (independent):")
print(f"t-statistic: {statistic:.4f}")
print(f"p-value: {pvalue:.4f}")

# Paired t-test
before = stats.norm(loc=100, scale=10).rvs(50)
after = before + stats.norm(loc=5, scale=5).rvs(50)

statistic, pvalue = stats.ttest_rel(before, after)
print("\nPaired t-test:")
print(f"t-statistic: {statistic:.4f}")
print(f"p-value: {pvalue:.4f}")
```

### Chi-square Tests

```python
# Goodness of fit
# Test if die is fair
observed = np.array([15, 18, 20, 12, 17, 18])  # Observed frequencies
expected = np.array([16.67, 16.67, 16.67, 16.67, 16.67, 16.67])  # Expected if fair

statistic, pvalue = stats.chisquare(f_obs=observed, f_exp=expected)
print("Chi-square goodness of fit:")
print(f"χ² statistic: {statistic:.4f}")
print(f"p-value: {pvalue:.4f}")

# Independence test (contingency table)
# Example: smoking vs lung cancer
observed = np.array([[50, 10],   # No cancer: smoker, non-smoker
                     [30, 60]])   # Cancer: smoker, non-smoker

statistic, pvalue, dof, expected = stats.chi2_contingency(observed)
print("\nChi-square test of independence:")
print(f"χ² statistic: {statistic:.4f}")
print(f"p-value: {pvalue:.4f}")
print(f"Degrees of freedom: {dof}")
print("Expected frequencies:")
print(expected)
```

### ANOVA

```python
# One-way ANOVA
# Test if means of 3+ groups are equal
group1 = stats.norm(loc=5, scale=1).rvs(30)
group2 = stats.norm(loc=5.5, scale=1).rvs(30)
group3 = stats.norm(loc=6, scale=1).rvs(30)

f_statistic, pvalue = stats.f_oneway(group1, group2, group3)
print("One-way ANOVA:")
print(f"F-statistic: {f_statistic:.4f}")
print(f"p-value: {pvalue:.4f}")

# Visualize
plt.figure(figsize=(10, 6))
plt.boxplot([group1, group2, group3], labels=['Group 1', 'Group 2', 'Group 3'])
plt.ylabel('Value')
plt.title('Group Comparison')
plt.grid(True, alpha=0.3)
plt.show()
```

### Normality Tests

```python
# Shapiro-Wilk test
normal_data = stats.norm(0, 1).rvs(100)
uniform_data = stats.uniform(0, 1).rvs(100)

statistic_norm, pvalue_norm = stats.shapiro(normal_data)
statistic_unif, pvalue_unif = stats.shapiro(uniform_data)

print("Shapiro-Wilk normality test:")
print(f"Normal data - p-value: {pvalue_norm:.4f}")
print(f"Uniform data - p-value: {pvalue_unif:.4f}")

# Kolmogorov-Smirnov test
statistic, pvalue = stats.kstest(normal_data, 'norm')
print(f"\nK-S test (normal data vs standard normal): p={pvalue:.4f}")

# Anderson-Darling test
result = stats.anderson(normal_data, dist='norm')
print(f"\nAnderson-Darling: statistic={result.statistic:.4f}")
print("Critical values:", result.critical_values)
print("Significance levels:", result.significance_level)
```

### Non-parametric Tests

```python
# Mann-Whitney U test (non-parametric alternative to t-test)
group1 = stats.expon(scale=1).rvs(50)
group2 = stats.expon(scale=1.5).rvs(50)

statistic, pvalue = stats.mannwhitneyu(group1, group2, alternative='two-sided')
print("Mann-Whitney U test:")
print(f"U statistic: {statistic:.4f}")
print(f"p-value: {pvalue:.4f}")

# Wilcoxon signed-rank test (non-parametric paired test)
before = stats.expon(scale=1).rvs(30)
after = before + stats.norm(0.2, 0.5).rvs(30)

statistic, pvalue = stats.wilcoxon(before, after)
print("\nWilcoxon signed-rank test:")
print(f"W statistic: {statistic:.4f}")
print(f"p-value: {pvalue:.4f}")

# Kruskal-Wallis (non-parametric ANOVA)
group1 = stats.expon(scale=1).rvs(30)
group2 = stats.expon(scale=1.2).rvs(30)
group3 = stats.expon(scale=1.5).rvs(30)

statistic, pvalue = stats.kruskal(group1, group2, group3)
print("\nKruskal-Wallis test:")
print(f"H statistic: {statistic:.4f}")
print(f"p-value: {pvalue:.4f}")
```

---

## Descriptive Statistics

### Summary Statistics

```python
# Generate data
data = stats.norm(loc=50, scale=10).rvs(1000)

# Compute statistics
print("Descriptive Statistics:")
print(f"Mean: {np.mean(data):.2f}")
print(f"Median: {np.median(data):.2f}")
print(f"Mode: {stats.mode(data.round())[0]:.2f}")
print(f"Std dev: {np.std(data, ddof=1):.2f}")
print(f"Variance: {np.var(data, ddof=1):.2f}")
print(f"Skewness: {stats.skew(data):.4f}")
print(f"Kurtosis: {stats.kurtosis(data):.4f}")
print(f"Min: {np.min(data):.2f}")
print(f"Max: {np.max(data):.2f}")
print(f"Range: {np.ptp(data):.2f}")

# Percentiles
percentiles = np.percentile(data, [25, 50, 75])
print(f"Q1 (25%): {percentiles[0]:.2f}")
print(f"Q2 (50%): {percentiles[1]:.2f}")
print(f"Q3 (75%): {percentiles[2]:.2f}")
print(f"IQR: {percentiles[2] - percentiles[0]:.2f}")

# SciPy describe
desc = stats.describe(data)
print("\nSciPy describe:")
print(f"n: {desc.nobs}")
print(f"Min/Max: {desc.minmax}")
print(f"Mean: {desc.mean:.2f}")
print(f"Variance: {desc.variance:.2f}")
print(f"Skewness: {desc.skewness:.4f}")
print(f"Kurtosis: {desc.kurtosis:.4f}")
```

### Trimmed Statistics

```python
# Robust statistics (remove outliers)
data = np.concatenate([stats.norm(0, 1).rvs(95), [10, -10, 15, -15, 20]])  # Add outliers

# Trimmed mean (remove 10% from each end)
trimmed_mean = stats.trim_mean(data, 0.1)
print(f"Regular mean: {np.mean(data):.4f}")
print(f"Trimmed mean (10%): {trimmed_mean:.4f}")

# Median absolute deviation (robust scale measure)
mad = stats.median_abs_deviation(data)
print(f"MAD: {mad:.4f}")
print(f"Std dev: {np.std(data):.4f}")
```

---

## Hypothesis Testing

### Power Analysis

```python
# Calculate required sample size
from scipy.stats import power

effect_size = 0.5  # Cohen's d
alpha = 0.05
power_target = 0.8

# For t-test, approximate calculation
from scipy.stats import nct

# This is a simplified example
# Use statsmodels or specialized packages for full power analysis
```

### Multiple Testing Correction

```python
# Bonferroni correction
pvalues = [0.01, 0.04, 0.03, 0.05, 0.002]
n_tests = len(pvalues)
alpha = 0.05

bonferroni_threshold = alpha / n_tests
print(f"Bonferroni threshold: {bonferroni_threshold:.4f}")
print("Significant after correction:", [p < bonferroni_threshold for p in pvalues])

# False Discovery Rate (FDR) - Benjamini-Hochberg
pvalues_sorted = sorted(pvalues)
fdr_alpha = 0.05
m = len(pvalues)

for i, p in enumerate(pvalues_sorted, 1):
    threshold = (i / m) * fdr_alpha
    print(f"Test {i}: p={p:.4f}, threshold={threshold:.4f}, significant={p <= threshold}")
```

---

## Correlation and Regression

### Correlation Coefficients

```python
# Generate correlated data
mean = [0, 0]
cov = [[1, 0.7], [0.7, 1]]
data = stats.multivariate_normal(mean, cov).rvs(100)
x, y = data[:, 0], data[:, 1]

# Pearson correlation (linear relationship)
pearson_r, pearson_p = stats.pearsonr(x, y)
print(f"Pearson r: {pearson_r:.4f}, p-value: {pearson_p:.4f}")

# Spearman correlation (monotonic relationship)
spearman_r, spearman_p = stats.spearmanr(x, y)
print(f"Spearman ρ: {spearman_r:.4f}, p-value: {spearman_p:.4f}")

# Kendall's tau
kendall_tau, kendall_p = stats.kendalltau(x, y)
print(f"Kendall τ: {kendall_tau:.4f}, p-value: {kendall_p:.4f}")

# Plot
plt.figure(figsize=(10, 6))
plt.scatter(x, y, alpha=0.6)
plt.xlabel('X')
plt.ylabel('Y')
plt.title(f'Correlation: r={pearson_r:.3f}')
plt.grid(True)
plt.show()
```

### Linear Regression

```python
# Simple linear regression
x = np.linspace(0, 10, 100)
y_true = 2*x + 3
y = y_true + stats.norm(0, 2).rvs(100)

# Regression
slope, intercept, r_value, p_value, std_err = stats.linregress(x, y)

print(f"Slope: {slope:.4f} ± {std_err:.4f}")
print(f"Intercept: {intercept:.4f}")
print(f"R-squared: {r_value**2:.4f}")
print(f"p-value: {p_value:.6f}")

# Plot
plt.figure(figsize=(10, 6))
plt.scatter(x, y, alpha=0.5, label='Data')
plt.plot(x, slope*x + intercept, 'r-', linewidth=2, label='Regression line')
plt.plot(x, y_true, 'g--', linewidth=2, label='True line')
plt.xlabel('X')
plt.ylabel('Y')
plt.title(f'Linear Regression (R²={r_value**2:.3f})')
plt.legend()
plt.grid(True)
plt.show()
```

---

## Multivariate Statistics

### Multivariate Tests

```python
# MANOVA (conceptual - use statsmodels for full implementation)
# Multiple dependent variables tested simultaneously

# Hotelling's T-squared (multivariate t-test)
# Example with two groups, two variables
group1 = stats.multivariate_normal([0, 0], [[1, 0.5], [0.5, 1]]).rvs(30)
group2 = stats.multivariate_normal([0.5, 0.5], [[1, 0.5], [0.5, 1]]).rvs(30)

# This is a simplified check - use specialized packages for full analysis
from scipy.stats import f

n1, n2 = group1.shape[0], group2.shape[0]
p = group1.shape[1]

mean1, mean2 = group1.mean(axis=0), group2.mean(axis=0)
diff = mean1 - mean2

# Pooled covariance
S1 = np.cov(group1.T)
S2 = np.cov(group2.T)
S_pooled = ((n1-1)*S1 + (n2-1)*S2) / (n1+n2-2)

# Hotelling's T²
T2 = (n1*n2)/(n1+n2) * diff @ np.linalg.inv(S_pooled) @ diff
F_stat = ((n1+n2-p-1)/(p*(n1+n2-2))) * T2
df1, df2 = p, n1+n2-p-1
p_value = 1 - f.cdf(F_stat, df1, df2)

print(f"Hotelling's T²: {T2:.4f}")
print(f"F-statistic: {F_stat:.4f}")
print(f"p-value: {p_value:.4f}")
```

---

## Survival Analysis

### Kaplan-Meier (conceptual)

```python
# Survival times and censoring indicator
times = np.array([5, 10, 15, 20, 25])
events = np.array([1, 1, 0, 1, 0])  # 1=event, 0=censored

# Kaplan-Meier estimate (simplified)
unique_times = np.unique(times[events == 1])
survival_prob = []

n_at_risk = len(times)
current_prob = 1.0

for t in unique_times:
    n_events = np.sum((times == t) & (events == 1))
    current_prob *= (1 - n_events / n_at_risk)
    survival_prob.append(current_prob)
    n_at_risk -= np.sum(times <= t)

print("Time | Survival Probability")
for t, s in zip(unique_times, survival_prob):
    print(f"{t:4.0f} | {s:.4f}")

# Plot
plt.figure(figsize=(10, 6))
plt.step(unique_times, survival_prob, where='post', linewidth=2)
plt.xlabel('Time')
plt.ylabel('Survival Probability')
plt.title('Kaplan-Meier Survival Curve')
plt.grid(True)
plt.ylim([0, 1.05])
plt.show()
```

---

## Practice Exercises

### Exercise 1: A/B Testing
```python
# Simulate A/B test
# Compare conversion rates between two groups
# Perform appropriate statistical test
```

### Exercise 2: Distribution Fitting
```python
# Load real data
# Test different distributions
# Find best fit using goodness-of-fit tests
```

### Exercise 3: Multiple Linear Regression
```python
# Multivariate regression
# Test individual coefficients
# Overall F-test
```

---

## Key Takeaways

1. **Distributions**: Use `stats.<dist>` for continuous/discrete distributions
2. **Tests**: Choose appropriate test (parametric vs non-parametric)
3. **Assumptions**: Check normality, homogeneity of variance
4. **p-values**: Probability of observing data if H0 is true
5. **Effect size**: Report alongside p-values
6. **Multiple testing**: Correct for false positives
7. **Correlation**: Pearson (linear), Spearman (monotonic)
8. **Always visualize**: Don't rely solely on statistics

---

## 🔗 Navigation

- **Previous**: [02 - Linear Algebra Extensions](./02-Linear-Algebra-Extensions.md)
- **Next**: [04 - Interpolation and Integration](./04-Interpolation-Integration.md)
- **Up**: [2.4 SciPy](./README.md)
