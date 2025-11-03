# 01 - Code Organization for ML Projects

## 📋 Table of Contents
- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Module Organization](#module-organization)
- [Configuration Management](#configuration-management)
- [Data Management](#data-management)
- [Model Management](#model-management)
- [Logging and Monitoring](#logging-and-monitoring)
- [Documentation](#documentation)
- [Practice Exercises](#practice-exercises)

---

## Introduction

Well-organized code is crucial for maintainability, reproducibility, and collaboration in ML projects.

```python
# Check Python version
import sys
print(f"Python version: {sys.version}")
```

---

## Project Structure

### Standard ML Project Layout

```
my-ml-project/
│
├── README.md                 # Project overview
├── requirements.txt          # Dependencies
├── setup.py                  # Package installation
├── .gitignore               # Git ignore rules
├── LICENSE                   # License file
│
├── config/                   # Configuration files
│   ├── config.yaml
│   └── logging.conf
│
├── data/                     # Data directory (add to .gitignore)
│   ├── raw/                 # Original data
│   ├── processed/           # Cleaned data
│   └── external/            # External data sources
│
├── notebooks/                # Jupyter notebooks
│   ├── 01_exploration.ipynb
│   ├── 02_preprocessing.ipynb
│   └── 03_modeling.ipynb
│
├── src/                      # Source code
│   ├── __init__.py
│   ├── data/                # Data processing
│   │   ├── __init__.py
│   │   ├── load.py
│   │   └── preprocess.py
│   ├── features/            # Feature engineering
│   │   ├── __init__.py
│   │   └── build_features.py
│   ├── models/              # Model definitions
│   │   ├── __init__.py
│   │   ├── train.py
│   │   └── predict.py
│   ├── utils/               # Utility functions
│   │   ├── __init__.py
│   │   └── helpers.py
│   └── visualization/       # Plotting functions
│       ├── __init__.py
│       └── visualize.py
│
├── models/                   # Trained models (add to .gitignore)
│   └── model_v1.pkl
│
├── tests/                    # Unit tests
│   ├── __init__.py
│   ├── test_data.py
│   ├── test_features.py
│   └── test_models.py
│
├── docs/                     # Documentation
│   ├── api.md
│   └── usage.md
│
└── scripts/                  # Standalone scripts
    ├── train_model.py
    └── evaluate_model.py
```

### Creating the Structure

```python
import os
from pathlib import Path

def create_project_structure(project_name):
    """Create standard ML project directory structure"""
    
    # Define structure
    directories = [
        f"{project_name}/config",
        f"{project_name}/data/raw",
        f"{project_name}/data/processed",
        f"{project_name}/data/external",
        f"{project_name}/notebooks",
        f"{project_name}/src/data",
        f"{project_name}/src/features",
        f"{project_name}/src/models",
        f"{project_name}/src/utils",
        f"{project_name}/src/visualization",
        f"{project_name}/models",
        f"{project_name}/tests",
        f"{project_name}/docs",
        f"{project_name}/scripts",
    ]
    
    # Create directories
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)
        
        # Add __init__.py to Python packages
        if 'src' in directory or 'tests' in directory:
            init_file = Path(directory) / '__init__.py'
            init_file.touch()
    
    # Create essential files
    files = {
        f"{project_name}/README.md": f"# {project_name}\n\nDescription of your project.",
        f"{project_name}/.gitignore": "data/\nmodels/\n*.pyc\n__pycache__/\n.ipynb_checkpoints/\n",
        f"{project_name}/requirements.txt": "numpy\npandas\nscikit-learn\nmatplotlib\n",
    }
    
    for filepath, content in files.items():
        with open(filepath, 'w') as f:
            f.write(content)
    
    print(f"Project structure created for: {project_name}")

# Example usage
# create_project_structure("my_ml_project")
```

---

## Module Organization

### Data Loading Module

```python
# src/data/load.py

"""
Data loading utilities
"""

import pandas as pd
from pathlib import Path
from typing import Union, Tuple
import logging

logger = logging.getLogger(__name__)


class DataLoader:
    """Handle data loading from various sources"""
    
    def __init__(self, data_dir: Union[str, Path]):
        """
        Initialize DataLoader
        
        Args:
            data_dir: Path to data directory
        """
        self.data_dir = Path(data_dir)
        
    def load_csv(self, filename: str, **kwargs) -> pd.DataFrame:
        """
        Load CSV file
        
        Args:
            filename: Name of CSV file
            **kwargs: Additional arguments for pd.read_csv
            
        Returns:
            DataFrame containing the data
        """
        filepath = self.data_dir / filename
        logger.info(f"Loading data from {filepath}")
        
        try:
            df = pd.read_csv(filepath, **kwargs)
            logger.info(f"Loaded {len(df)} rows and {len(df.columns)} columns")
            return df
        except FileNotFoundError:
            logger.error(f"File not found: {filepath}")
            raise
        except Exception as e:
            logger.error(f"Error loading file: {e}")
            raise
    
    def load_train_test(
        self, 
        train_file: str, 
        test_file: str
    ) -> Tuple[pd.DataFrame, pd.DataFrame]:
        """
        Load training and test sets
        
        Args:
            train_file: Training data filename
            test_file: Test data filename
            
        Returns:
            Tuple of (train_df, test_df)
        """
        train_df = self.load_csv(train_file)
        test_df = self.load_csv(test_file)
        return train_df, test_df


# Example usage
if __name__ == "__main__":
    loader = DataLoader("data/raw")
    df = loader.load_csv("data.csv")
    print(df.head())
```

### Feature Engineering Module

```python
# src/features/build_features.py

"""
Feature engineering utilities
"""

import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from typing import List, Dict, Any
import logging

logger = logging.getLogger(__name__)


class FeatureEngineer:
    """Handle feature engineering operations"""
    
    def __init__(self):
        self.scalers: Dict[str, StandardScaler] = {}
        self.encoders: Dict[str, LabelEncoder] = {}
        
    def create_polynomial_features(
        self, 
        df: pd.DataFrame, 
        columns: List[str], 
        degree: int = 2
    ) -> pd.DataFrame:
        """
        Create polynomial features
        
        Args:
            df: Input DataFrame
            columns: Columns to create polynomials for
            degree: Polynomial degree
            
        Returns:
            DataFrame with additional polynomial features
        """
        df_new = df.copy()
        
        for col in columns:
            for d in range(2, degree + 1):
                new_col = f"{col}_pow{d}"
                df_new[new_col] = df[col] ** d
                logger.info(f"Created feature: {new_col}")
        
        return df_new
    
    def create_interaction_features(
        self, 
        df: pd.DataFrame, 
        col_pairs: List[tuple]
    ) -> pd.DataFrame:
        """
        Create interaction features
        
        Args:
            df: Input DataFrame
            col_pairs: List of column pairs to interact
            
        Returns:
            DataFrame with interaction features
        """
        df_new = df.copy()
        
        for col1, col2 in col_pairs:
            new_col = f"{col1}_x_{col2}"
            df_new[new_col] = df[col1] * df[col2]
            logger.info(f"Created interaction: {new_col}")
        
        return df_new
    
    def scale_features(
        self, 
        df: pd.DataFrame, 
        columns: List[str], 
        fit: bool = True
    ) -> pd.DataFrame:
        """
        Scale numerical features
        
        Args:
            df: Input DataFrame
            columns: Columns to scale
            fit: Whether to fit scaler (True for train, False for test)
            
        Returns:
            DataFrame with scaled features
        """
        df_new = df.copy()
        
        for col in columns:
            if fit:
                scaler = StandardScaler()
                df_new[col] = scaler.fit_transform(df[[col]])
                self.scalers[col] = scaler
                logger.info(f"Fitted and transformed: {col}")
            else:
                if col not in self.scalers:
                    raise ValueError(f"No fitted scaler for {col}")
                df_new[col] = self.scalers[col].transform(df[[col]])
                logger.info(f"Transformed: {col}")
        
        return df_new


# Example usage
if __name__ == "__main__":
    # Create sample data
    df = pd.DataFrame({
        'age': [25, 30, 35, 40],
        'income': [50000, 60000, 70000, 80000]
    })
    
    engineer = FeatureEngineer()
    df = engineer.create_polynomial_features(df, ['age'], degree=2)
    df = engineer.create_interaction_features(df, [('age', 'income')])
    df = engineer.scale_features(df, ['age', 'income'])
    print(df.head())
```

### Model Training Module

```python
# src/models/train.py

"""
Model training utilities
"""

from sklearn.base import BaseEstimator
from sklearn.model_selection import cross_val_score
import joblib
from pathlib import Path
from typing import Any, Dict, Optional
import logging
import json
from datetime import datetime

logger = logging.getLogger(__name__)


class ModelTrainer:
    """Handle model training and evaluation"""
    
    def __init__(self, model_dir: str = "models"):
        """
        Initialize ModelTrainer
        
        Args:
            model_dir: Directory to save models
        """
        self.model_dir = Path(model_dir)
        self.model_dir.mkdir(exist_ok=True)
        self.model: Optional[BaseEstimator] = None
        self.metrics: Dict[str, float] = {}
        
    def train(
        self, 
        model: BaseEstimator, 
        X_train, 
        y_train, 
        **fit_params
    ) -> BaseEstimator:
        """
        Train a model
        
        Args:
            model: Sklearn-compatible model
            X_train: Training features
            y_train: Training labels
            **fit_params: Additional fit parameters
            
        Returns:
            Trained model
        """
        logger.info(f"Training {model.__class__.__name__}")
        
        model.fit(X_train, y_train, **fit_params)
        self.model = model
        
        # Training score
        train_score = model.score(X_train, y_train)
        self.metrics['train_score'] = train_score
        logger.info(f"Training score: {train_score:.4f}")
        
        return model
    
    def cross_validate(
        self, 
        model: BaseEstimator, 
        X, 
        y, 
        cv: int = 5, 
        scoring: str = 'accuracy'
    ) -> Dict[str, Any]:
        """
        Perform cross-validation
        
        Args:
            model: Model to evaluate
            X: Features
            y: Labels
            cv: Number of folds
            scoring: Scoring metric
            
        Returns:
            Dictionary with CV results
        """
        logger.info(f"Running {cv}-fold cross-validation")
        
        scores = cross_val_score(model, X, y, cv=cv, scoring=scoring)
        
        results = {
            'scores': scores.tolist(),
            'mean': scores.mean(),
            'std': scores.std()
        }
        
        self.metrics['cv_mean'] = results['mean']
        self.metrics['cv_std'] = results['std']
        
        logger.info(f"CV Score: {results['mean']:.4f} (+/- {results['std']:.4f})")
        
        return results
    
    def save_model(
        self, 
        model: BaseEstimator, 
        name: str, 
        metadata: Optional[Dict] = None
    ):
        """
        Save model and metadata
        
        Args:
            model: Model to save
            name: Model name
            metadata: Additional metadata
        """
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        model_filename = f"{name}_{timestamp}.joblib"
        model_path = self.model_dir / model_filename
        
        # Save model
        joblib.dump(model, model_path)
        logger.info(f"Model saved to {model_path}")
        
        # Save metadata
        if metadata is None:
            metadata = {}
        
        metadata.update({
            'timestamp': timestamp,
            'model_class': model.__class__.__name__,
            'metrics': self.metrics
        })
        
        metadata_path = self.model_dir / f"{name}_{timestamp}_metadata.json"
        with open(metadata_path, 'w') as f:
            json.dump(metadata, f, indent=2)
        
        logger.info(f"Metadata saved to {metadata_path}")
    
    def load_model(self, filepath: str) -> BaseEstimator:
        """
        Load saved model
        
        Args:
            filepath: Path to model file
            
        Returns:
            Loaded model
        """
        model = joblib.load(filepath)
        logger.info(f"Model loaded from {filepath}")
        return model


# Example usage
if __name__ == "__main__":
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.datasets import make_classification
    
    # Create sample data
    X, y = make_classification(n_samples=1000, n_features=20, random_state=42)
    
    # Train
    trainer = ModelTrainer()
    model = RandomForestClassifier(random_state=42)
    model = trainer.train(model, X, y)
    
    # Cross-validate
    cv_results = trainer.cross_validate(model, X, y)
    
    # Save
    trainer.save_model(model, "random_forest")
```

---

## Configuration Management

### YAML Configuration

```python
# config/config.yaml
"""
data:
  raw_dir: "data/raw"
  processed_dir: "data/processed"
  train_file: "train.csv"
  test_file: "test.csv"

features:
  numerical:
    - age
    - income
    - credit_score
  categorical:
    - gender
    - education
    - occupation
  target: "default"

model:
  type: "RandomForestClassifier"
  params:
    n_estimators: 100
    max_depth: 10
    random_state: 42
    n_jobs: -1

training:
  test_size: 0.2
  cv_folds: 5
  scoring: "roc_auc"

logging:
  level: "INFO"
  format: "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
  file: "logs/training.log"
"""

# src/utils/config.py
"""Configuration management"""

import yaml
from pathlib import Path
from typing import Any, Dict
import logging

logger = logging.getLogger(__name__)


class Config:
    """Manage project configuration"""
    
    def __init__(self, config_path: str = "config/config.yaml"):
        """
        Load configuration
        
        Args:
            config_path: Path to config file
        """
        self.config_path = Path(config_path)
        self.config = self.load()
        
    def load(self) -> Dict[str, Any]:
        """Load configuration from YAML file"""
        if not self.config_path.exists():
            raise FileNotFoundError(f"Config file not found: {self.config_path}")
        
        with open(self.config_path, 'r') as f:
            config = yaml.safe_load(f)
        
        logger.info(f"Configuration loaded from {self.config_path}")
        return config
    
    def get(self, key: str, default: Any = None) -> Any:
        """
        Get configuration value
        
        Args:
            key: Key in dot notation (e.g., 'model.params.n_estimators')
            default: Default value if key not found
            
        Returns:
            Configuration value
        """
        keys = key.split('.')
        value = self.config
        
        for k in keys:
            if isinstance(value, dict) and k in value:
                value = value[k]
            else:
                return default
        
        return value
    
    def update(self, key: str, value: Any):
        """
        Update configuration value
        
        Args:
            key: Key in dot notation
            value: New value
        """
        keys = key.split('.')
        config = self.config
        
        for k in keys[:-1]:
            config = config.setdefault(k, {})
        
        config[keys[-1]] = value
        logger.info(f"Updated config: {key} = {value}")
    
    def save(self, filepath: Optional[str] = None):
        """
        Save configuration to file
        
        Args:
            filepath: Path to save (default: overwrite original)
        """
        if filepath is None:
            filepath = self.config_path
        
        with open(filepath, 'w') as f:
            yaml.dump(self.config, f, default_flow_style=False)
        
        logger.info(f"Configuration saved to {filepath}")


# Example usage
if __name__ == "__main__":
    config = Config()
    
    # Get values
    print(f"Model type: {config.get('model.type')}")
    print(f"N estimators: {config.get('model.params.n_estimators')}")
    
    # Update value
    config.update('model.params.n_estimators', 200)
    
    # Save
    # config.save()
```

---

## Data Management

### Data Version Control

```python
# src/utils/data_versioning.py

"""
Data versioning utilities
"""

import hashlib
import json
from pathlib import Path
from datetime import datetime
from typing import Dict, Any
import pandas as pd


class DataVersion:
    """Track data versions using hash-based approach"""
    
    def __init__(self, version_file: str = "data/versions.json"):
        """
        Initialize data versioning
        
        Args:
            version_file: Path to version tracking file
        """
        self.version_file = Path(version_file)
        self.versions = self.load_versions()
        
    def compute_hash(self, filepath: str) -> str:
        """
        Compute MD5 hash of file
        
        Args:
            filepath: Path to file
            
        Returns:
            MD5 hash string
        """
        hasher = hashlib.md5()
        with open(filepath, 'rb') as f:
            for chunk in iter(lambda: f.read(4096), b""):
                hasher.update(chunk)
        return hasher.hexdigest()
    
    def register_dataset(
        self, 
        filepath: str, 
        name: str, 
        description: str = ""
    ) -> Dict[str, Any]:
        """
        Register a new dataset version
        
        Args:
            filepath: Path to dataset
            name: Dataset name
            description: Description of changes
            
        Returns:
            Version info dictionary
        """
        file_hash = self.compute_hash(filepath)
        timestamp = datetime.now().isoformat()
        
        version_info = {
            'name': name,
            'filepath': str(filepath),
            'hash': file_hash,
            'timestamp': timestamp,
            'description': description
        }
        
        if name not in self.versions:
            self.versions[name] = []
        
        self.versions[name].append(version_info)
        self.save_versions()
        
        print(f"Registered version for {name}")
        print(f"  Hash: {file_hash}")
        print(f"  Time: {timestamp}")
        
        return version_info
    
    def get_latest_version(self, name: str) -> Dict[str, Any]:
        """Get latest version info for dataset"""
        if name not in self.versions or not self.versions[name]:
            raise ValueError(f"No versions found for {name}")
        
        return self.versions[name][-1]
    
    def load_versions(self) -> Dict[str, Any]:
        """Load version history"""
        if not self.version_file.exists():
            return {}
        
        with open(self.version_file, 'r') as f:
            return json.load(f)
    
    def save_versions(self):
        """Save version history"""
        self.version_file.parent.mkdir(exist_ok=True, parents=True)
        
        with open(self.version_file, 'w') as f:
            json.dump(self.versions, f, indent=2)


# Example usage
if __name__ == "__main__":
    dv = DataVersion()
    
    # Register dataset
    # dv.register_dataset("data/raw/train.csv", "training_data", "Initial version")
    
    # Get latest
    # latest = dv.get_latest_version("training_data")
    # print(latest)
```

---

## Model Management

### Model Registry

```python
# src/models/registry.py

"""
Model registry for tracking experiments
"""

import json
from pathlib import Path
from datetime import datetime
from typing import Dict, Any, List, Optional
import pandas as pd


class ModelRegistry:
    """Track and manage trained models"""
    
    def __init__(self, registry_file: str = "models/registry.json"):
        """
        Initialize model registry
        
        Args:
            registry_file: Path to registry file
        """
        self.registry_file = Path(registry_file)
        self.registry = self.load_registry()
        
    def register_model(
        self,
        name: str,
        model_path: str,
        metrics: Dict[str, float],
        params: Dict[str, Any],
        notes: str = ""
    ) -> Dict[str, Any]:
        """
        Register a trained model
        
        Args:
            name: Model name
            model_path: Path to saved model
            metrics: Performance metrics
            params: Model parameters
            notes: Additional notes
            
        Returns:
            Model info dictionary
        """
        model_id = f"{name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        model_info = {
            'id': model_id,
            'name': name,
            'path': str(model_path),
            'timestamp': datetime.now().isoformat(),
            'metrics': metrics,
            'params': params,
            'notes': notes
        }
        
        self.registry[model_id] = model_info
        self.save_registry()
        
        print(f"Registered model: {model_id}")
        return model_info
    
    def get_best_model(
        self, 
        metric: str, 
        minimize: bool = False
    ) -> Dict[str, Any]:
        """
        Get best model by metric
        
        Args:
            metric: Metric name
            minimize: True if lower is better
            
        Returns:
            Best model info
        """
        if not self.registry:
            raise ValueError("No models in registry")
        
        valid_models = [
            model for model in self.registry.values()
            if metric in model['metrics']
        ]
        
        if not valid_models:
            raise ValueError(f"No models with metric: {metric}")
        
        if minimize:
            best = min(valid_models, key=lambda x: x['metrics'][metric])
        else:
            best = max(valid_models, key=lambda x: x['metrics'][metric])
        
        return best
    
    def list_models(self) -> pd.DataFrame:
        """List all registered models"""
        if not self.registry:
            return pd.DataFrame()
        
        data = []
        for model in self.registry.values():
            row = {
                'id': model['id'],
                'name': model['name'],
                'timestamp': model['timestamp'],
                **model['metrics']
            }
            data.append(row)
        
        return pd.DataFrame(data)
    
    def load_registry(self) -> Dict[str, Any]:
        """Load registry from file"""
        if not self.registry_file.exists():
            return {}
        
        with open(self.registry_file, 'r') as f:
            return json.load(f)
    
    def save_registry(self):
        """Save registry to file"""
        self.registry_file.parent.mkdir(exist_ok=True, parents=True)
        
        with open(self.registry_file, 'w') as f:
            json.dump(self.registry, f, indent=2)


# Example usage
if __name__ == "__main__":
    registry = ModelRegistry()
    
    # Register model
    registry.register_model(
        name="random_forest",
        model_path="models/rf_model.joblib",
        metrics={'accuracy': 0.95, 'f1': 0.93},
        params={'n_estimators': 100, 'max_depth': 10},
        notes="First experiment"
    )
    
    # List models
    print(registry.list_models())
    
    # Get best
    best = registry.get_best_model('accuracy')
    print(f"Best model: {best['id']}")
```

---

## Logging and Monitoring

### Setup Logging

```python
# src/utils/logging_config.py

"""
Logging configuration
"""

import logging
import sys
from pathlib import Path
from logging.handlers import RotatingFileHandler


def setup_logging(
    log_file: str = "logs/app.log",
    log_level: str = "INFO",
    console: bool = True,
    file_logging: bool = True
) -> logging.Logger:
    """
    Setup logging configuration
    
    Args:
        log_file: Path to log file
        log_level: Logging level
        console: Enable console logging
        file_logging: Enable file logging
        
    Returns:
        Configured logger
    """
    # Create logs directory
    log_path = Path(log_file)
    log_path.parent.mkdir(exist_ok=True, parents=True)
    
    # Create logger
    logger = logging.getLogger()
    logger.setLevel(getattr(logging, log_level.upper()))
    
    # Clear existing handlers
    logger.handlers.clear()
    
    # Formatter
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    
    # Console handler
    if console:
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setLevel(logging.INFO)
        console_handler.setFormatter(formatter)
        logger.addHandler(console_handler)
    
    # File handler (with rotation)
    if file_logging:
        file_handler = RotatingFileHandler(
            log_file,
            maxBytes=10*1024*1024,  # 10MB
            backupCount=5
        )
        file_handler.setLevel(logging.DEBUG)
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)
    
    return logger


# Example usage
if __name__ == "__main__":
    logger = setup_logging()
    
    logger.debug("Debug message")
    logger.info("Info message")
    logger.warning("Warning message")
    logger.error("Error message")
```

---

## Documentation

### Docstring Standards

```python
def train_model(
    X_train: np.ndarray,
    y_train: np.ndarray,
    model_type: str = "random_forest",
    **kwargs
) -> BaseEstimator:
    """
    Train a machine learning model.
    
    This function trains a specified model type on the provided training data.
    It supports various sklearn models and allows custom hyperparameters.
    
    Args:
        X_train: Training features of shape (n_samples, n_features)
        y_train: Training labels of shape (n_samples,)
        model_type: Type of model to train. Options: 'random_forest', 
                   'logistic_regression', 'gradient_boosting'
        **kwargs: Additional keyword arguments passed to the model constructor
        
    Returns:
        Trained sklearn model
        
    Raises:
        ValueError: If model_type is not supported
        TypeError: If X_train or y_train have incorrect type
        
    Examples:
        >>> X = np.random.rand(100, 10)
        >>> y = np.random.randint(0, 2, 100)
        >>> model = train_model(X, y, model_type='random_forest', n_estimators=100)
        >>> predictions = model.predict(X)
        
    Notes:
        - Always use a validation set to avoid overfitting
        - Consider cross-validation for robust performance estimates
        
    See Also:
        - evaluate_model: Evaluate trained model performance
        - tune_hyperparameters: Optimize model hyperparameters
    """
    pass
```

---

## Practice Exercises

### Exercise 1: Create Your Project
```python
# Create a complete ML project structure
# Add data loading and preprocessing modules
# Implement configuration management
```

### Exercise 2: Build Pipeline
```python
# Create end-to-end training pipeline
# Include logging and model registry
# Add data versioning
```

### Exercise 3: Documentation
```python
# Write comprehensive documentation
# Add docstrings to all functions
# Create user guide
```

---

## Key Takeaways

1. **Structure**: Follow standard project layout
2. **Modularity**: Separate concerns into modules
3. **Configuration**: Externalize settings
4. **Versioning**: Track data and models
5. **Logging**: Monitor execution
6. **Documentation**: Write clear docstrings
7. **Reusability**: Create reusable components
8. **Maintainability**: Clean, organized code

---

## 🔗 Navigation

- **Previous**: [2.4 SciPy](../../2.4-SciPy-Scientific-Computing/README.md)
- **Next**: [02 - Virtual Environments](./02-Virtual-Environments.md)
- **Up**: [2.5 Best Practices](./README.md)
