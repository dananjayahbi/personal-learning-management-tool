# 07 - Kadane's Algorithm

## 🎯 Overview

**Kadane's Algorithm** is an efficient algorithm to find the **maximum sum contiguous subarray** in O(n) time. It's one of the most famous dynamic programming algorithms and frequently appears in coding interviews.

**Problem:** Given an array of integers, find the contiguous subarray with the largest sum.

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

---

## 📖 The Algorithm

### Core Idea:

At each position, decide:
- **Extend** the current subarray by including current element
- **Start fresh** from current element

Choose whichever gives a larger sum.

### Formula:

```
current_sum = max(arr[i], current_sum + arr[i])
max_sum = max(max_sum, current_sum)
```

---

## 💻 Implementation

### Basic Version:

```python
# Python
def kadane(arr):
    """
    Find maximum sum of contiguous subarray
    """
    if not arr:
        return 0
    
    max_sum = arr[0]
    current_sum = arr[0]
    
    for i in range(1, len(arr)):
        # Either extend current subarray or start fresh
        current_sum = max(arr[i], current_sum + arr[i])
        max_sum = max(max_sum, current_sum)
    
    return max_sum

# Example
arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
print(kadane(arr))  # 6 → subarray [4, -1, 2, 1]
```

```cpp
// C++
int kadane(vector<int>& arr) {
    int maxSum = arr[0];
    int currentSum = arr[0];
    
    for (int i = 1; i < arr.size(); i++) {
        currentSum = max(arr[i], currentSum + arr[i]);
        maxSum = max(maxSum, currentSum);
    }
    
    return maxSum;
}
```

### With Subarray Indices:

```python
# Python - Track start and end indices
def kadane_with_indices(arr):
    """
    Return max sum and the subarray indices
    """
    if not arr:
        return 0, -1, -1
    
    max_sum = arr[0]
    current_sum = arr[0]
    start = 0
    end = 0
    temp_start = 0
    
    for i in range(1, len(arr)):
        if arr[i] > current_sum + arr[i]:
            current_sum = arr[i]
            temp_start = i  # New subarray starts here
        else:
            current_sum += arr[i]
        
        if current_sum > max_sum:
            max_sum = current_sum
            start = temp_start
            end = i
    
    return max_sum, start, end

# Example
arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
max_sum, start, end = kadane_with_indices(arr)
print(f"Max sum: {max_sum}")
print(f"Subarray: {arr[start:end+1]}")
# Max sum: 6
# Subarray: [4, -1, 2, 1]
```

---

## 🎓 Why It Works

### Intuition:

At any point, if the current sum becomes negative, it's better to start fresh because adding a negative sum will only decrease future sums.

### Example Walkthrough:

```
arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

i=0: current=-2, max=-2
i=1: current=1 (start fresh, -2+1=-1 < 1), max=1
i=2: current=-2 (1-3), max=1
i=3: current=4 (start fresh, -2+4=2 < 4), max=4
i=4: current=3 (4-1), max=4
i=5: current=5 (3+2), max=5
i=6: current=6 (5+1), max=6 ✓
i=7: current=1 (6-5), max=6
i=8: current=5 (1+4), max=6
```

---

## 🔄 Variations

### 1. All Negative Numbers:

```python
# If all numbers are negative, return the least negative
def kadane_all_negative(arr):
    max_sum = arr[0]
    current_sum = arr[0]
    
    for i in range(1, len(arr)):
        current_sum = max(arr[i], current_sum + arr[i])
        max_sum = max(max_sum, current_sum)
    
    return max_sum

arr = [-3, -1, -4, -2]
print(kadane_all_negative(arr))  # -1
```

### 2. Circular Array Maximum Sum:

**LeetCode #918**

```python
# Python
def max_subarray_sum_circular(arr):
    """
    Maximum sum considering array as circular
    """
    def kadane_max(nums):
        max_sum = curr = nums[0]
        for num in nums[1:]:
            curr = max(num, curr + num)
            max_sum = max(max_sum, curr)
        return max_sum
    
    def kadane_min(nums):
        min_sum = curr = nums[0]
        for num in nums[1:]:
            curr = min(num, curr + num)
            min_sum = min(min_sum, curr)
        return min_sum
    
    total = sum(arr)
    max_normal = kadane_max(arr)
    min_subarray = kadane_min(arr)
    
    # If all elements are negative
    if total == min_subarray:
        return max_normal
    
    # Max of normal or circular
    max_circular = total - min_subarray
    return max(max_normal, max_circular)

# Example
arr = [5, -3, 5]
print(max_subarray_sum_circular(arr))  # 10 (5+5 in circular)
```

### 3. Maximum Product Subarray:

**LeetCode #152**

```python
# Python
def max_product_subarray(nums):
    """
    Find maximum product of contiguous subarray
    Need to track both max and min (because of negatives)
    """
    if not nums:
        return 0
    
    max_prod = nums[0]
    current_max = nums[0]
    current_min = nums[0]  # Track minimum for negative numbers
    
    for i in range(1, len(nums)):
        num = nums[i]
        
        # If negative, swap max and min
        if num < 0:
            current_max, current_min = current_min, current_max
        
        current_max = max(num, current_max * num)
        current_min = min(num, current_min * num)
        
        max_prod = max(max_prod, current_max)
    
    return max_prod

# Example
nums = [2, 3, -2, 4]
print(max_product_subarray(nums))  # 6 ([2,3])
```

### 4. K-Kadane (Find K Maximum Subarrays):

```python
# Python
def k_kadane(arr, k):
    """
    Find sum of k non-overlapping maximum subarrays
    """
    n = len(arr)
    if k == 0 or n == 0:
        return 0
    
    # dp[i][j] = max sum using j subarrays from first i elements
    dp = [[float('-inf')] * (k + 1) for _ in range(n + 1)]
    dp[0][0] = 0
    
    for i in range(1, n + 1):
        dp[i][0] = 0
        for j in range(1, min(i, k) + 1):
            # Option 1: Don't include arr[i-1]
            dp[i][j] = dp[i-1][j]
            
            # Option 2: Include arr[i-1] in a subarray
            current_sum = 0
            for t in range(i, 0, -1):
                current_sum += arr[t-1]
                dp[i][j] = max(dp[i][j], dp[t-1][j-1] + current_sum)
    
    return dp[n][k]

# Example
arr = [4, -1, 2, -7, 3, 4]
k = 2
print(k_kadane(arr, k))  # 11 ([4,-1,2] and [3,4])
```

---

## 🧪 Practice Problems

### Based on Kadane's:

1. **Maximum Subarray Sum** (LeetCode #53)
2. **Maximum Circular Subarray Sum** (LeetCode #918)
3. **Maximum Product Subarray** (LeetCode #152)
4. **Best Time to Buy and Sell Stock** (LeetCode #121)
5. **Maximum Sum Circular Subarray**
6. **Maximum Length of Repeated Subarray** (variation)
7. **Maximum Subarray Sum with One Deletion** (LeetCode #1186)
8. **K Concatenation Maximum Sum** (LeetCode #1191)

---

## 💡 Key Takeaways

1. ✅ **O(n) time, O(1) space** - Optimal solution
2. ✅ **Greedy + DP** approach
3. ✅ Key insight: Drop negative prefix sums
4. ✅ Can be extended to **2D arrays** (maximum sum rectangle)
5. ✅ Works for **all negative** arrays (returns least negative)
6. ✅ Foundation for many **stock trading** problems
7. ✅ **Product variant** requires tracking min and max

---

## 🎯 Interview Tips

**When you see:**
- ✅ "Maximum sum subarray"
- ✅ "Contiguous subarray"
- ✅ "Best profit" in stock problems
- ✅ Problems requiring O(n) solution for subarray

**Think Kadane's!**

**Follow-up questions:**
- Print the actual subarray
- Find subarray with sum closest to k
- Maximum product instead of sum
- 2D version (maximum sum rectangle)
- Circular array version

---

[← Back to Sliding Window](./06-Sliding-Window-Technique.md) | [Back to Chapter](./README.md) | [Next: Array Rotation →](./08-Array-Rotation-Reversal.md)
