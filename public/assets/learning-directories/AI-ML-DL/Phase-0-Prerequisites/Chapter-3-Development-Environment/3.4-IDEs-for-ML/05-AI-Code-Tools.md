# 05 - AI Code Assistance Tools

## 📋 Introduction

AI-powered code completion tools use machine learning to suggest code as you type, dramatically increasing productivity. These tools learn from millions of code examples and can suggest entire functions, fix bugs, write tests, and even explain complex code.

**Why AI Code Tools?**
- ✅ **Faster coding** - Write code 40-60% faster
- ✅ **Learn as you code** - Discover new APIs and patterns
- ✅ **Reduce errors** - AI suggests correct syntax
- ✅ **Boilerplate automation** - Generate repetitive code
- ✅ **Context-aware** - Understands your codebase
- ✅ **Multi-language** - Works across languages

---

## 🤖 GitHub Copilot

### What is Copilot?

GitHub Copilot is an AI pair programmer developed by GitHub and OpenAI. It's powered by OpenAI Codex, which is trained on billions of lines of code.

**Capabilities:**
- Complete lines and functions
- Convert comments to code
- Suggest alternatives
- Write tests
- Explain code
- Fix bugs
- Translate between languages

### Installation

**Prerequisites:**
- GitHub account
- Copilot subscription ($10/month or $100/year)
- Free for students, teachers, and open source maintainers

**VS Code:**
```bash
code --install-extension github.copilot
code --install-extension github.copilot-chat

# Restart VS Code
# Sign in to GitHub when prompted
```

**PyCharm:**
```
File → Settings → Plugins
Search: "GitHub Copilot"
Install → Restart PyCharm
Sign in to GitHub
```

**JetBrains IDEs:**
- IntelliJ IDEA
- PyCharm
- WebStorm
- All others

### Basic Usage

**Inline suggestions:**
```python
# Type comment describing what you want
# Function to calculate mean of a list

# Copilot suggests (press Tab to accept):
def calculate_mean(numbers):
    """Calculate the mean of a list of numbers."""
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)
```

**Function completion:**
```python
def train_model(X_train, y_train, X_test, y_test):
    # Copilot suggests entire function body:
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.metrics import accuracy_score
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    
    print(f"Model accuracy: {accuracy:.4f}")
    return model
```

**Multiple suggestions:**
```python
def preprocess_data(df):
    # Type the function signature
    # Press Alt+] to cycle through alternatives
    # Alt+[ to go back
```

### Advanced Features

**Comment-to-code:**
```python
# Load iris dataset from sklearn
# Split into train and test sets with 80-20 ratio
# Standardize features
# Train a logistic regression model
# Print accuracy

# Copilot generates:
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Load dataset
iris = load_iris()
X, y = iris.data, iris.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Standardize features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train model
model = LogisticRegression(max_iter=200)
model.fit(X_train_scaled, y_train)

# Evaluate
predictions = model.predict(X_test_scaled)
accuracy = accuracy_score(y_test, predictions)
print(f"Accuracy: {accuracy:.4f}")
```

**Test generation:**
```python
# Existing function
def calculate_mean(numbers):
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)

# Type:
def test_calculate_mean():
    # Copilot suggests:
    assert calculate_mean([1, 2, 3, 4, 5]) == 3.0
    assert calculate_mean([]) == 0
    assert calculate_mean([10]) == 10
    assert calculate_mean([-1, 0, 1]) == 0
```

**Docstring generation:**
```python
def train_neural_network(model, train_loader, optimizer, epochs):
    """
    # Copilot completes docstring:
    Train a neural network model.
    
    Args:
        model: The neural network model to train
        train_loader: DataLoader containing training data
        optimizer: Optimizer for training
        epochs: Number of training epochs
        
    Returns:
        Trained model
        
    Example:
        >>> model = MyModel()
        >>> optimizer = torch.optim.Adam(model.parameters())
        >>> trained_model = train_neural_network(model, loader, optimizer, 10)
    """
    pass
```

### Copilot Chat (VS Code)

**Ask questions:**
```
Open Copilot Chat panel (Ctrl+Shift+I)

You: "How do I read a CSV file with pandas?"
Copilot: "Here's how to read a CSV file with pandas:

```python
import pandas as pd

df = pd.read_csv('file.csv')
print(df.head())
```

You can also specify additional parameters:
- delimiter: for different separators
- encoding: for file encoding
- na_values: to handle missing data
"
```

**Explain code:**
```python
# Select complex code
# Right-click → Copilot → Explain This

# Example: Select lambda function
df['new_col'] = df.apply(lambda x: x['a'] * 2 if x['b'] > 10 else 0, axis=1)

# Copilot explains:
# "This creates a new column 'new_col' by applying a function to each row.
# If column 'b' is greater than 10, it multiplies column 'a' by 2,
# otherwise it assigns 0."
```

**Fix bugs:**
```python
# Select buggy code
# Right-click → Copilot → Fix This

def calculate_average(numbers):
    return sum(numbers) / len(numbers)  # Bug: doesn't handle empty list

# Copilot suggests:
def calculate_average(numbers):
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)
```

**Generate tests:**
```python
# Select function
# Right-click → Copilot → Generate Tests

# Copilot generates pytest tests
```

---

## 🎯 Tabnine

### Overview

Tabnine is an AI code completion tool that can run locally or in the cloud. It offers both free and paid tiers with different models.

**Features:**
- Works offline (free tier)
- Trains on your code (Pro)
- Supports 30+ languages
- Privacy-focused
- Team learning

### Installation

**VS Code:**
```bash
code --install-extension tabnine.tabnine-vscode
```

**PyCharm:**
```
File → Settings → Plugins
Search: "Tabnine"
Install
```

### Configuration

```
Tabnine settings:
├── Model: Basic (free) / Pro / Enterprise
├── Local mode: Run AI locally
├── Deep completion: Advanced suggestions
├── Team learning: Learn from team code
└── Languages: Select enabled languages
```

### Usage

```python
# Similar to Copilot, but suggestions appear as you type
# Press Tab to accept

def load_data(file_path):
    # Tabnine suggests based on context
    import pandas as pd
    df = pd.read_csv(file_path)
    return df
```

**Tabnine Pro features:**
- Longer completions
- Trains on your private code
- Team models
- Priority support

---

## 🔮 Codeium

### Overview

Codeium is a free AI code completion tool with features comparable to paid alternatives.

**Advantages:**
- **Completely free** for individuals
- Fast completions
- Privacy-focused
- 70+ languages
- Chat interface

### Installation

**VS Code:**
```bash
code --install-extension codeium.codeium
```

**PyCharm/JetBrains:**
```
File → Settings → Plugins
Search: "Codeium"
Install
```

### Features

```python
# Similar to Copilot
# Free with unlimited usage

# Comment to code
# Create a function that trains a random forest model

# Codeium generates complete implementation
from sklearn.ensemble import RandomForestClassifier

def train_random_forest(X_train, y_train, n_estimators=100):
    model = RandomForestClassifier(n_estimators=n_estimators, random_state=42)
    model.fit(X_train, y_train)
    return model
```

**Codeium Chat:**
- Explain code
- Refactor
- Generate tests
- Find bugs
- All free!

---

## 🧠 Amazon CodeWhisperer

### Overview

Amazon CodeWhisperer is AWS's AI code assistant, optimized for AWS services.

**Best for:**
- AWS development
- Cloud infrastructure
- boto3 and AWS SDK

**Pricing:**
- Individual tier: Free
- Professional tier: $19/month

### Installation

**VS Code:**
```bash
code --install-extension amazonwebservices.aws-toolkit-vscode

# Sign in with AWS Builder ID (free)
```

### AWS-Specific Suggestions

```python
# Excellent for AWS development
import boto3

# Create an S3 client
# CodeWhisperer suggests AWS-optimized code:
s3_client = boto3.client('s3')

def upload_file_to_s3(file_path, bucket_name, object_name):
    """Upload a file to S3 bucket."""
    try:
        s3_client.upload_file(file_path, bucket_name, object_name)
        print(f"Successfully uploaded {file_path} to {bucket_name}/{object_name}")
        return True
    except Exception as e:
        print(f"Error uploading file: {e}")
        return False
```

**Security scanning:**
- Scans code for security vulnerabilities
- Suggests secure alternatives
- Highlights best practices

---

## 🎨 AI Code Tools Comparison

| Feature | Copilot | Tabnine Pro | Codeium | CodeWhisperer |
|---------|---------|-------------|---------|---------------|
| **Price** | $10/mo | $12/mo | Free | Free/Pro |
| **Offline** | No | Yes | No | No |
| **Quality** | Excellent | Very Good | Very Good | Good |
| **Speed** | Fast | Very Fast | Fast | Fast |
| **Chat** | Yes | Limited | Yes | Limited |
| **Free tier** | Students | Basic | Full | Individual |
| **Privacy** | Cloud | Local option | Cloud | Cloud |
| **Languages** | 40+ | 30+ | 70+ | 15+ |
| **IDE Support** | VS Code, JetBrains | Most IDEs | Most IDEs | VS Code |
| **Best for** | General | Privacy | Free tier | AWS |

---

## 🎯 Best Practices

### 1. Review AI Suggestions

```python
# ❌ Don't blindly accept
# Copilot suggests:
def divide(a, b):
    return a / b  # Bug: No zero check!

# ✅ Review and improve
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
```

### 2. Use Descriptive Comments

```python
# ❌ Vague comment
# Process data

# ✅ Specific comment
# Load customer data from CSV, remove duplicates,
# handle missing values, and standardize numeric columns
```

### 3. Iterate on Suggestions

```python
# First attempt:
# Function to train model
def train_model(data):
    pass

# Better comment for better result:
# Train a Random Forest classifier with hyperparameter tuning
# using GridSearchCV and return the best model with cross-validation scores
def train_optimized_model(X_train, y_train):
    pass
```

### 4. Learn from AI

```python
# Copilot suggests new APIs/patterns
# Example: Learn about pandas methods
df = pd.read_csv('data.csv')

# Copilot suggests:
df_clean = df.dropna().drop_duplicates()
# You learn: dropna(), drop_duplicates() can be chained
```

### 5. Security Considerations

```python
# ❌ Don't commit API keys suggested by AI
api_key = "sk-1234567890..."  # AI might suggest test keys

# ✅ Use environment variables
import os
api_key = os.getenv('API_KEY')

# ❌ Don't trust SQL queries blindly
query = f"SELECT * FROM users WHERE id = {user_id}"  # SQL injection!

# ✅ Use parameterized queries
query = "SELECT * FROM users WHERE id = %s"
cursor.execute(query, (user_id,))
```

### 6. Test AI-Generated Code

```python
# Always test AI suggestions
def ai_suggested_function(data):
    # AI-generated code
    result = process(data)
    return result

# Write tests!
def test_ai_suggested_function():
    test_data = [1, 2, 3]
    result = ai_suggested_function(test_data)
    assert result == expected_output
    assert isinstance(result, list)
    assert len(result) == 3
```

---

## 🚀 Productivity Tips

### 1. Use Natural Language

```python
# Instead of:
def f(x, y):
    pass

# Write:
# Calculate the Euclidean distance between two points in 2D space
def calculate_distance(point1, point2):
    # AI generates correct implementation
    pass
```

### 2. Provide Examples

```python
# Give AI context with examples
# Function to convert snake_case to camelCase
# Example: "hello_world" -> "helloWorld"
# Example: "my_variable_name" -> "myVariableName"
def snake_to_camel(text):
    # AI generates better code with examples
    pass
```

### 3. Leverage Patterns

```python
# AI recognizes patterns
class DataLoader:
    def __init__(self, path):
        self.path = path
    
    def load(self):
        # Once you write one method
        pass
    
    def save(self):
        # AI suggests similar structure
        pass
    
    def validate(self):
        # AI continues the pattern
        pass
```

### 4. Refactoring

```python
# Select complex code
# Ask AI: "Refactor this into smaller functions"

# Before:
def process(data):
    # 100 lines of mixed logic
    pass

# After (AI suggests):
def load_data(path):
    pass

def clean_data(df):
    pass

def transform_data(df):
    pass

def process(data):
    df = load_data(data)
    df = clean_data(df)
    df = transform_data(df)
    return df
```

---

## 🎓 Exercises

### Exercise 1: Compare AI Tools
1. Install Copilot and Codeium
2. Write same function with each
3. Compare suggestions
4. Note differences in speed and quality

### Exercise 2: Comment-Driven Development
1. Write detailed comments
2. Let AI generate implementation
3. Review and test code
4. Refine comments and regenerate

### Exercise 3: Test Generation
1. Write a complex function
2. Use AI to generate tests
3. Run tests
4. Add edge cases AI missed

---

## 🎯 Key Takeaways

1. ✅ **AI accelerates coding** - 40-60% faster development
2. ✅ **Copilot leads quality** - Best overall suggestions
3. ✅ **Codeium best free** - Full features at no cost
4. ✅ **Always review** - AI makes mistakes
5. ✅ **Learn from AI** - Discover new patterns
6. ✅ **Descriptive comments** - Better input = better output
7. ✅ **Security matters** - Don't trust blindly

---

## 🔗 Navigation

- **Up**: [3.4 IDEs for ML Overview](./README.md)
- **Previous**: [04 - Remote Development](./04-Remote-Development.md)
- **Next**: [3.5 Package Management](../3.5-Package-Management/README.md)

---

**Remember:** AI code assistants are powerful productivity multipliers, but they're tools, not replacements for understanding. Use them to accelerate development while learning best practices. Always review, test, and understand the code they generate!
