# Oracle69 Engineering Style Guide

This style guide outlines the coding conventions for all Python code developed at Oracle69 Digital Marketing. It is based on PEP 8, with key modifications to align with our specific needs and preferences. Gemini Code Assist is configured to enforce these rules during code reviews.

---

## 1. Key Principles

* **Readability:** Code must be easy to understand for all team members.
* **Maintainability:** Code should be easy to modify and extend.
* **Consistency:** Adhering to a consistent style across all projects improves collaboration and reduces errors.
* **Performance:** While readability is paramount, code should be efficient.

## 2. Deviations from PEP 8

### 2.1. Line Length
* **Maximum line length:** 100 characters.
    * Modern screens allow for wider lines, improving code readability.

### 2.2. Indentation
* **Use 4 spaces per indentation level.**

### 2.3. Imports
* **Group imports:**
    1.  Standard library imports
    2.  Related third-party imports
    3.  Local application/library specific imports
* **Absolute imports:** Always use absolute imports for clarity.
* **Import order within groups:** Sort alphabetically.

### 2.4. Naming Conventions
* **Variables/Functions:** `snake_case` (e.g., `user_name`, `calculate_total()`)
* **Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_VALUE`)
* **Classes:** `PascalCase` (e.g., `UserManager`)
* **Modules:** `snake_case` (e.g., `user_utils`)

### 2.5. Docstrings
* **Use triple double quotes (`"""Docstring goes here."""`) for all docstrings.**
* **Format:** Use **Google style docstrings** for parameters, returns, and exceptions.
* **Content:** The first line should be a concise summary. For complex functions/classes, include detailed descriptions of parameters, return values, attributes, and exceptions.

### 2.6. Type Hints
* **Use type hints:** Type hints improve code readability and help catch errors early.
* **Syntax:** Follow PEP 484.

### 2.7. Comments
* **Write clear and concise comments:** Explain the "why" behind the code, not just the "what".
* **Comment sparingly:** Well-written code should be self-documenting where possible.

### 2.8. Error Handling & Logging
* **Error Handling:** Use **specific exceptions**. Handle exceptions gracefully with informative error messages.
* **Logging:** Use the built-in `logging` module. Log at appropriate levels (`DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`) and provide context.

## 3. Mandatory AI Service Integration (`gpt-oss`)

All new and updated codebases that require AI/LLM functionality **must** integrate with the `gpt-oss-120b` or `gpt-oss-20b` models.

### 3.1. Core Directives

* **GPT-OSS Dependency:** The project must include `gpt-oss` as a dependency. The preferred installation method is `pip install gpt-oss` or `uv pip install`.
* **Harmony Response Format:** All model interactions **must** use the **harmony response format**. Gemini will flag any code that attempts to bypass this format.
* **Function Calling & Tool Use:** All agentic tasks, web browsing, and function calls should leverage the native capabilities of the `gpt-oss` models. Do not implement custom, external tools unless explicitly approved with a clear `schema` defined for `gpt-oss` to call.
* **Reasoning Levels:** Code must include a configurable variable or parameter for the `Reasoning` level (low, medium, high) in the system prompt. The default should be `high` for critical tasks and `low` for conversational use cases.


# Oracle69 Python Style Guide

# Introduction
This style guide outlines the coding conventions for Python code developed at Oracle69.
It's based on PEP 8, but with some modifications to address specific needs and
preferences within our organization.

# Key Principles
* **Readability:** Code should be easy to understand for all team members.
* **Maintainability:** Code should be easy to modify and extend.
* **Consistency:** Adhering to a consistent style across all projects improves
  collaboration and reduces errors.
* **Performance:** While readability is paramount, code should be efficient.

# Deviations from PEP 8

## Line Length
* **Maximum line length:** 100 characters (instead of PEP 8's 79).
    * Modern screens allow for wider lines, improving code readability in many cases.
    * Many common patterns in our codebase, like long strings or URLs, often exceed 79 characters.

## Indentation
* **Use 4 spaces per indentation level.** (PEP 8 recommendation)

## Imports
* **Group imports:**
    * Standard library imports
    * Related third party imports
    * Local application/library specific imports
* **Absolute imports:** Always use absolute imports for clarity.
* **Import order within groups:**  Sort alphabetically.

## Naming Conventions

* **Variables:** Use lowercase with underscores (snake_case): `user_name`, `total_count`
* **Constants:**  Use uppercase with underscores: `MAX_VALUE`, `DATABASE_NAME`
* **Functions:** Use lowercase with underscores (snake_case): `calculate_total()`, `process_data()`
* **Classes:** Use CapWords (CamelCase): `UserManager`, `PaymentProcessor`
* **Modules:** Use lowercase with underscores (snake_case): `user_utils`, `payment_gateway`

## Docstrings
* **Use triple double quotes (`"""Docstring goes here."""`) for all docstrings.**
* **First line:** Concise summary of the object's purpose.
* **For complex functions/classes:** Include detailed descriptions of parameters, return values,
  attributes, and exceptions.
* **Use Google style docstrings:** This helps with automated documentation generation.
    ```python
    def my_function(param1, param2):
        """Single-line summary.

        More detailed description, if necessary.

        Args:
            param1 (int): The first parameter.
            param2 (str): The second parameter.

        Returns:
            bool: The return value. True for success, False otherwise.

        Raises:
            ValueError: If `param2` is invalid.
        """
        # function body here
    ```

## Type Hints
* **Use type hints:**  Type hints improve code readability and help catch errors early.
* **Follow PEP 484:**  Use the standard type hinting syntax.

## Comments
* **Write clear and concise comments:** Explain the "why" behind the code, not just the "what".
* **Comment sparingly:** Well-written code should be self-documenting where possible.
* **Use complete sentences:** Start comments with a capital letter and use proper punctuation.

## Logging
* **Use a standard logging framework:**  Company X uses the built-in `logging` module.
* **Log at appropriate levels:** DEBUG, INFO, WARNING, ERROR, CRITICAL
* **Provide context:** Include relevant information in log messages to aid debugging.

## Error Handling
* **Use specific exceptions:** Avoid using broad exceptions like `Exception`.
* **Handle exceptions gracefully:** Provide informative error messages and avoid crashing the program.
* **Use `try...except` blocks:**  Isolate code that might raise exceptions.

# Tooling
* **Code formatter:**  [Specify formatter, e.g., Black] - Enforces consistent formatting automatically.
* **Linter:**  [Specify linter, e.g., Flake8, Pylint] - Identifies potential issues and style violations.

# Example
```python
"""Module for user authentication."""

import hashlib
import logging
import os

from companyx.db import user_database

LOGGER = logging.getLogger(__name__)

def hash_password(password: str) -> str:
  """Hashes a password using SHA-256.

  Args:
      password (str): The password to hash.

  Returns:
      str: The hashed password.
  """
  salt = os.urandom(16)
  salted_password = salt + password.encode('utf-8')
  hashed_password = hashlib.sha256(salted_password).hexdigest()
  return f"{salt.hex()}:{hashed_password}"

def authenticate_user(username: str, password: str) -> bool:
  """Authenticates a user against the database.

  Args:
      username (str): The user's username.
      password (str): The user's password.

  Returns:
      bool: True if the user is authenticated, False otherwise.
  """
  try:
      user = user_database.get_user(username)
      if user is None:
          LOGGER.warning("Authentication failed: User not found - %s", username)
          return False

      stored_hash = user.password_hash
      salt, hashed_password = stored_hash.split(':')
      salted_password = bytes.fromhex(salt) + password.encode('utf-8')
      calculated_hash = hashlib.sha256(salted_password).hexdigest()

      if calculated_hash == hashed_password:
          LOGGER.info("User authenticated successfully - %s", username)
          return True
      else:
          LOGGER.warning("Authentication failed: Incorrect password - %s", username)
          return False
  except Exception as e:
      LOGGER.error("An error occurred during authentication: %s", e)
      return False

[Gemini Code Assist: How to customize a public style guide and apply it to your whole team](https://www.youtube.com/shorts/9tqcq1bwm9o)
This video explains how to customize a public style guide for your team using Gemini Code Assist.
http://googleusercontent.com/youtube_content/8 *YouTube video views will be stored in your YouTube History, and your data will be stored and used by YouTube according to its [Terms of Service](https://www.youtube.com/static?template=terms)*


