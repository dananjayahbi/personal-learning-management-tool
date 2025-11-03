# Phase 0: Prerequisites & Mathematical Foundations

## 📋 Overview

Before diving into Machine Learning and Deep Learning, it's crucial to have a solid foundation in mathematics and programming. This phase will strengthen your understanding of the essential concepts that underpin all AI/ML algorithms.

**Duration:** 2-4 weeks (depending on prior knowledge)

**Prerequisites:** Basic high school mathematics and Python fundamentals

---

## 🎯 Learning Objectives

By the end of this phase, you will:
- ✅ Master linear algebra concepts used in ML
- ✅ Understand calculus for optimization and backpropagation
- ✅ Apply probability and statistics for model evaluation
- ✅ Work proficiently with NumPy, Pandas, and Matplotlib
- ✅ Set up a complete ML development environment
- ✅ Understand computational complexity and algorithm efficiency

---

## 📚 Chapters

### Chapter 1: [Mathematics for AI/ML](./01-Mathematics-for-AI-ML.md)

**Topics Covered:**

#### 1.1 Linear Algebra Essentials
- Vectors and Vector Operations
  - Vector addition, subtraction, scalar multiplication
  - Dot product and cross product
  - Vector norms (L1, L2, infinity norm)
  - Unit vectors and normalization
- Matrices and Matrix Operations
  - Matrix addition, subtraction, multiplication
  - Transpose, inverse, determinant
  - Identity and diagonal matrices
  - Sparse matrices
- Special Matrix Types
  - Symmetric and orthogonal matrices
  - Positive definite matrices
- Matrix Decompositions
  - Eigenvalues and eigenvectors
  - Singular Value Decomposition (SVD)
  - QR decomposition
  - Cholesky decomposition
- Applications in ML
  - Principal Component Analysis (PCA)
  - Data transformation
  - Dimensionality reduction

#### 1.2 Calculus for Machine Learning
- Single Variable Calculus
  - Limits and continuity
  - Derivatives and rules of differentiation
  - Integration basics
  - Critical points, maxima, and minima
- Multivariable Calculus
  - Partial derivatives
  - Gradient vectors
  - Directional derivatives
  - Chain rule in multiple dimensions
- Optimization Fundamentals
  - Gradient descent intuition
  - Finding local minima
  - Convex functions
  - Saddle points
- Taylor Series and Approximation
- Applications in ML
  - Loss function minimization
  - Backpropagation mathematics
  - Optimization algorithms

#### 1.3 Probability Theory
- Basic Probability Concepts
  - Sample spaces and events
  - Probability axioms
  - Conditional probability
  - Bayes' theorem
  - Independence
- Random Variables
  - Discrete random variables
  - Continuous random variables
  - Probability mass functions (PMF)
  - Probability density functions (PDF)
  - Cumulative distribution functions (CDF)
- Common Distributions
  - Bernoulli and Binomial
  - Uniform distribution
  - Normal (Gaussian) distribution
  - Exponential distribution
  - Poisson distribution
- Joint Distributions
  - Joint probability
  - Marginal probability
  - Covariance and correlation
- Applications in ML
  - Probabilistic models
  - Naive Bayes classifier
  - Maximum likelihood estimation

#### 1.4 Statistics & Distributions
- Descriptive Statistics
  - Mean, median, mode
  - Variance and standard deviation
  - Quartiles and percentiles
  - Skewness and kurtosis
- Inferential Statistics
  - Population vs sample
  - Sampling distributions
  - Central limit theorem
  - Confidence intervals
- Hypothesis Testing
  - Null and alternative hypotheses
  - p-values and significance levels
  - t-tests, z-tests
  - Chi-square tests
- Statistical Measures
  - Correlation vs causation
  - Pearson and Spearman correlation
  - R-squared
- Applications in ML
  - A/B testing
  - Feature correlation analysis
  - Model performance evaluation

#### 1.5 Information Theory Basics
- Entropy
- Cross-entropy
- KL divergence
- Mutual information
- Applications in ML loss functions

**Learning Resources:**
- Khan Academy Linear Algebra
- 3Blue1Brown Essence of Linear Algebra
- MIT OCW Calculus courses
- Interactive visualizations

**Exercises:**
- 50+ practice problems with solutions
- Python implementations of key concepts
- Visualization exercises

---

### Chapter 2: [Python for AI/ML](./02-Python-for-AI-ML.md)

**Topics Covered:**

#### 2.1 NumPy Mastery
- Array Fundamentals
  - Creating arrays (zeros, ones, arange, linspace)
  - Array attributes (shape, dtype, ndim)
  - Indexing and slicing
  - Reshaping and flattening
- Array Operations
  - Element-wise operations
  - Broadcasting rules
  - Universal functions (ufuncs)
  - Aggregation functions (sum, mean, std, etc.)
- Advanced NumPy
  - Boolean indexing and masking
  - Fancy indexing
  - Vectorization techniques
  - Memory layout and performance
  - Random number generation
- Linear Algebra with NumPy
  - np.linalg module
  - Solving linear systems
  - Computing eigenvalues
  - Matrix decompositions

#### 2.2 Pandas for Data Manipulation
- Series and DataFrames
  - Creating and accessing data
  - Index operations
  - Column operations
- Data Loading
  - Reading CSV, Excel, JSON
  - Database connections
  - API data loading
- Data Cleaning
  - Handling missing values
  - Removing duplicates
  - Data type conversion
  - String operations
- Data Transformation
  - Filtering and sorting
  - GroupBy operations
  - Merging and joining
  - Pivot tables
  - Apply, map, and applymap
- Time Series with Pandas
  - DateTime handling
  - Resampling
  - Rolling windows
  - Time-based indexing

#### 2.3 Matplotlib & Seaborn Visualization
- Matplotlib Basics
  - Figure and axes
  - Line plots
  - Scatter plots
  - Bar charts and histograms
  - Subplots and layouts
  - Customization (colors, labels, legends)
- Advanced Matplotlib
  - 3D plotting
  - Contour plots
  - Heatmaps
  - Animation
- Seaborn for Statistical Plots
  - Distribution plots
  - Categorical plots
  - Regression plots
  - Matrix plots
  - Pair plots
  - Themes and styling

#### 2.4 Scientific Computing with SciPy
- Optimization (scipy.optimize)
- Linear algebra extensions (scipy.linalg)
- Statistical functions (scipy.stats)
- Interpolation and integration
- Signal processing basics

#### 2.5 Python Best Practices for ML
- Code organization
- Virtual environments
- Jupyter notebooks effective usage
- Debugging techniques
- Performance optimization
- Memory management

**Learning Resources:**
- NumPy official documentation
- Pandas tutorials
- Python Data Science Handbook

**Projects:**
- Data analysis mini-projects
- Implementing mathematical operations from scratch
- Data visualization gallery

---

### Chapter 3: [Development Environment Setup](./Chapter-3-Development-Environment/README.md)

**Topics Covered:**

#### 3.1 [Python Installation & Management](./Chapter-3-Development-Environment/3.1-Python-Installation-Management/README.md)
- [Python Distributions](./Chapter-3-Development-Environment/3.1-Python-Installation-Management/01-Python-Distributions.md) - CPython, Anaconda, Miniconda, PyPy
- [Installation Methods](./Chapter-3-Development-Environment/3.1-Python-Installation-Management/02-Installation-Methods.md) - OS-specific installation guides
- [Version Management](./Chapter-3-Development-Environment/3.1-Python-Installation-Management/03-Version-Management.md) - pyenv, Python Launcher, conda
- [Python Paths & Modules](./Chapter-3-Development-Environment/3.1-Python-Installation-Management/04-Python-Paths.md) - sys.path, PYTHONPATH, module discovery
- [Package Managers](./Chapter-3-Development-Environment/3.1-Python-Installation-Management/05-Package-Managers.md) - pip vs conda comparison

#### 3.2 [Virtual Environments](./Chapter-3-Development-Environment/3.2-Virtual-Environments/README.md)
- venv module for isolation
- conda environments
- Poetry for modern dependency management
- Docker containers for ML
- Best practices for environment management
- Sharing environments with requirements.txt and environment.yml

#### 3.3 [Jupyter Notebooks & JupyterLab](./Chapter-3-Development-Environment/3.3-Jupyter-JupyterLab/README.md)
- Installation and setup
- Notebook basics and cell types
- Magic commands reference
- Extensions and interactive widgets
- JupyterLab features and interface
- Google Colab for free GPU computing
- Best practices for reproducible notebooks

#### 3.4 [IDEs for ML Development](./Chapter-3-Development-Environment/3.4-IDEs-for-ML/README.md)
- VS Code setup with essential extensions
- PyCharm Professional for scientific computing
- Spyder for MATLAB-like interface
- Remote development (SSH, WSL, containers)
- IDE comparison and recommendations

#### 3.5 [Package Management](./Chapter-3-Development-Environment/3.5-Package-Management/README.md)
- pip fundamentals and advanced usage
- conda channels and package installation
- Poetry for modern Python projects
- Installing TensorFlow and PyTorch
- ML library ecosystem
- Troubleshooting common issues

#### 3.6 [Git & Version Control](./Chapter-3-Development-Environment/3.6-Git-Version-Control/README.md)
- Git basics and workflow
- Branching and merging strategies
- GitHub/GitLab collaboration
- .gitignore templates for ML projects
- Git LFS for large files
- DVC (Data Version Control) for datasets and models

#### 3.7 [Hardware & Cloud Setup](./Chapter-3-Development-Environment/3.7-Hardware-Cloud-Setup/README.md)
- CPU vs GPU for ML workloads
- GPU setup (CUDA, cuDNN)
- Cloud platforms comparison (AWS, GCP, Azure)
- Free resources (Google Colab, Kaggle)
- Cloud GPU rentals and cost optimization
- Monitoring and managing resources

**Learning Resources:**
- Official documentation for each tool
- Setup guides and tutorials

**Exercises:**
- Complete environment setup checklist
- Creating first ML-ready project structure

---

## 🎯 Phase Completion Checklist

- [ ] Completed all mathematics sections
- [ ] Solved at least 80% of practice problems
- [ ] Proficient with NumPy array operations
- [ ] Can manipulate data efficiently with Pandas
- [ ] Create informative visualizations with Matplotlib/Seaborn
- [ ] Set up complete development environment
- [ ] Created virtual environment for ML
- [ ] Installed all essential libraries
- [ ] Familiar with Jupyter notebooks
- [ ] Basic Git proficiency

---

## 📝 Assessment

### Self-Assessment Questions:
1. Can you compute eigenvalues and eigenvectors by hand and with NumPy?
2. Can you derive the gradient of a simple function?
3. Do you understand Bayes' theorem and can apply it?
4. Can you efficiently manipulate large datasets with Pandas?
5. Can you create professional visualizations?
6. Is your development environment fully configured?

### Mini Project:
**Statistical Analysis with Python**
- Load a real dataset
- Perform exploratory data analysis
- Compute statistical measures
- Create insightful visualizations
- Draw conclusions from data

---

## 🚀 Next Steps

Once you've completed this phase:
1. Review any challenging topics
2. Ensure all exercises are completed
3. Complete the mini project
4. Move to **[Phase 1: Machine Learning Foundations](../Phase-1-Machine-Learning/README.md)**

---

## 📚 Additional Resources

### Books:
- "Mathematics for Machine Learning" by Deisenroth, Faisal, and Ong
- "Python for Data Analysis" by Wes McKinney
- "Introduction to Probability" by Blitzstein and Hwang

### Online Resources:
- Khan Academy (Mathematics)
- 3Blue1Brown (Visual Mathematics)
- StatQuest (Statistics)
- Real Python (Python tutorials)

### Practice Platforms:
- LeetCode (Python practice)
- HackerRank (Python & Math)
- Project Euler (Mathematical problems)

---

**Remember:** This phase is your foundation. Take your time to understand concepts deeply rather than rushing through!
