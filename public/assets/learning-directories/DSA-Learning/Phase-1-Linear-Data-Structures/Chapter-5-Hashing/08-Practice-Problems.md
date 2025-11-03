# Practice Problems

## 🎯 Problem List Overview

This comprehensive list contains **35+ curated hashing problems** organized by difficulty. Each problem includes links, hints, and key patterns.

---

## 📊 Difficulty Distribution

| Difficulty | Count | Focus |
|------------|-------|-------|
| Easy | 12 | Fundamentals, basic patterns |
| Medium | 18 | Problem-solving, optimization |
| Hard | 7 | Complex scenarios, multiple techniques |
| **Total** | **37** | Complete mastery |

---

## 🟢 Easy Problems (12)

### 1. Two Sum
**Link:** [LeetCode 1](https://leetcode.com/problems/two-sum/)  
**Pattern:** Hash map for complement lookup  
**Time:** O(n) | **Space:** O(n)

**Hint:** Store `target - num` as you iterate.

**Key Code:**
```python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        if target - num in seen:
            return [seen[target - num], i]
        seen[num] = i
```

---

### 2. Contains Duplicate
**Link:** [LeetCode 217](https://leetcode.com/problems/contains-duplicate/)  
**Pattern:** Hash set for membership test  
**Time:** O(n) | **Space:** O(n)

**Hint:** Use set to track seen elements.

---

### 3. Valid Anagram
**Link:** [LeetCode 242](https://leetcode.com/problems/valid-anagram/)  
**Pattern:** Frequency counting  
**Time:** O(n) | **Space:** O(1) (26 letters)

**Hint:** Count character frequencies in both strings.

---

### 4. Intersection of Two Arrays
**Link:** [LeetCode 349](https://leetcode.com/problems/intersection-of-two-arrays/)  
**Pattern:** Hash set intersection  
**Time:** O(m + n) | **Space:** O(min(m, n))

**Hint:** Convert to sets and use set intersection.

---

### 5. Intersection of Two Arrays II
**Link:** [LeetCode 350](https://leetcode.com/problems/intersection-of-two-arrays-ii/)  
**Pattern:** Frequency map  
**Time:** O(m + n) | **Space:** O(min(m, n))

**Hint:** Count frequencies, include duplicates.

---

### 6. Happy Number
**Link:** [LeetCode 202](https://leetcode.com/problems/happy-number/)  
**Pattern:** Cycle detection with set  
**Time:** O(log n) | **Space:** O(log n)

**Hint:** Detect cycles in sum of squares sequence.

---

### 7. Isomorphic Strings
**Link:** [LeetCode 205](https://leetcode.com/problems/isomorphic-strings/)  
**Pattern:** Bidirectional mapping  
**Time:** O(n) | **Space:** O(1) (256 chars)

**Hint:** Maintain two maps: s→t and t→s.

---

### 8. Word Pattern
**Link:** [LeetCode 290](https://leetcode.com/problems/word-pattern/)  
**Pattern:** Bidirectional mapping  
**Time:** O(n) | **Space:** O(n)

**Hint:** Similar to isomorphic strings, but with words.

---

### 9. First Unique Character in a String
**Link:** [LeetCode 387](https://leetcode.com/problems/first-unique-character-in-a-string/)  
**Pattern:** Frequency counting + scan  
**Time:** O(n) | **Space:** O(1)

**Hint:** Two passes: count frequencies, find first with count 1.

---

### 10. Ransom Note
**Link:** [LeetCode 383](https://leetcode.com/problems/ransom-note/)  
**Pattern:** Frequency counting  
**Time:** O(m + n) | **Space:** O(1)

**Hint:** Check if magazine has enough of each character.

---

### 11. Valid Palindrome II
**Link:** [LeetCode 680](https://leetcode.com/problems/valid-palindrome-ii/)  
**Pattern:** Two pointers (not hash, but good practice)  
**Time:** O(n) | **Space:** O(1)

---

### 12. Single Number
**Link:** [LeetCode 136](https://leetcode.com/problems/single-number/)  
**Pattern:** XOR or hash set  
**Time:** O(n) | **Space:** O(1) with XOR

**Hint:** XOR cancels duplicates: `a ^ a = 0`.

---

## 🟡 Medium Problems (18)

### 13. Group Anagrams
**Link:** [LeetCode 49](https://leetcode.com/problems/group-anagrams/)  
**Pattern:** Categorization with sorted key  
**Time:** O(n * k log k) | **Space:** O(n * k)

**Hint:** Use sorted string as hash key.

---

### 14. Top K Frequent Elements
**Link:** [LeetCode 347](https://leetcode.com/problems/top-k-frequent-elements/)  
**Pattern:** Frequency count + heap  
**Time:** O(n log k) | **Space:** O(n)

**Hint:** Use heap or bucket sort.

---

### 15. Longest Consecutive Sequence
**Link:** [LeetCode 128](https://leetcode.com/problems/longest-consecutive-sequence/)  
**Pattern:** Hash set for O(1) lookup  
**Time:** O(n) | **Space:** O(n)

**Hint:** Only start counting from sequence start.

---

### 16. Subarray Sum Equals K
**Link:** [LeetCode 560](https://leetcode.com/problems/subarray-sum-equals-k/)  
**Pattern:** Prefix sum + hash map  
**Time:** O(n) | **Space:** O(n)

**Hint:** Store prefix sums, check if `prefix - k` exists.

---

### 17. Longest Substring Without Repeating Characters
**Link:** [LeetCode 3](https://leetcode.com/problems/longest-substring-without-repeating-characters/)  
**Pattern:** Sliding window + hash set  
**Time:** O(n) | **Space:** O(min(n, m))

**Hint:** Expand window, shrink when duplicate found.

---

### 18. 4Sum II
**Link:** [LeetCode 454](https://leetcode.com/problems/4sum-ii/)  
**Pattern:** Hash map for pair sums  
**Time:** O(n²) | **Space:** O(n²)

**Hint:** Store sums of first two arrays, check complements in last two.

---

### 19. Contiguous Array
**Link:** [LeetCode 525](https://leetcode.com/problems/contiguous-array/)  
**Pattern:** Prefix sum + hash map  
**Time:** O(n) | **Space:** O(n)

**Hint:** Treat 0 as -1, find subarray with sum 0.

---

### 20. Find All Anagrams in a String
**Link:** [LeetCode 438](https://leetcode.com/problems/find-all-anagrams-in-a-string/)  
**Pattern:** Sliding window + frequency map  
**Time:** O(n) | **Space:** O(1)

**Hint:** Maintain frequency map for current window.

---

### 21. Longest Repeating Character Replacement
**Link:** [LeetCode 424](https://leetcode.com/problems/longest-repeating-character-replacement/)  
**Pattern:** Sliding window + frequency map  
**Time:** O(n) | **Space:** O(1)

**Hint:** Track max frequency in window.

---

### 22. Valid Sudoku
**Link:** [LeetCode 36](https://leetcode.com/problems/valid-sudoku/)  
**Pattern:** Hash set for validation  
**Time:** O(1) (9x9 fixed) | **Space:** O(1)

**Hint:** Use sets for rows, columns, boxes.

---

### 23. Encode and Decode TinyURL
**Link:** [LeetCode 535](https://leetcode.com/problems/encode-and-decode-tinyurl/)  
**Pattern:** Bidirectional hash map  
**Time:** O(1) | **Space:** O(n)

**Hint:** Map long URL ↔ short URL.

---

### 24. Copy List with Random Pointer
**Link:** [LeetCode 138](https://leetcode.com/problems/copy-list-with-random-pointer/)  
**Pattern:** Hash map for node mapping  
**Time:** O(n) | **Space:** O(n)

**Hint:** Map original → copy nodes.

---

### 25. Repeated DNA Sequences
**Link:** [LeetCode 187](https://leetcode.com/problems/repeated-dna-sequences/)  
**Pattern:** Hash set for tracking  
**Time:** O(n) | **Space:** O(n)

**Hint:** Track 10-letter substrings in set.

---

### 26. Maximum Size Subarray Sum Equals k
**Link:** [LeetCode 325](https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/)  
**Pattern:** Prefix sum + hash map  
**Time:** O(n) | **Space:** O(n)

**Hint:** Store earliest index of each prefix sum.

---

### 27. Find Duplicate File in System
**Link:** [LeetCode 609](https://leetcode.com/problems/find-duplicate-file-in-system/)  
**Pattern:** Hash map grouping  
**Time:** O(n * k) | **Space:** O(n * k)

**Hint:** Group files by content.

---

### 28. Brick Wall
**Link:** [LeetCode 554](https://leetcode.com/problems/brick-wall/)  
**Pattern:** Hash map for counting  
**Time:** O(n * m) | **Space:** O(n)

**Hint:** Count edge positions.

---

### 29. Minimum Index Sum of Two Lists
**Link:** [LeetCode 599](https://leetcode.com/problems/minimum-index-sum-of-two-lists/)  
**Pattern:** Hash map with indices  
**Time:** O(m + n) | **Space:** O(m + n)

---

### 30. Continuous Subarray Sum
**Link:** [LeetCode 523](https://leetcode.com/problems/continuous-subarray-sum/)  
**Pattern:** Prefix sum modulo + hash map  
**Time:** O(n) | **Space:** O(min(n, k))

**Hint:** Store remainder of prefix sum modulo k.

---

## 🔴 Hard Problems (7)

### 31. LRU Cache
**Link:** [LeetCode 146](https://leetcode.com/problems/lru-cache/)  
**Pattern:** Hash map + doubly linked list  
**Time:** O(1) per operation | **Space:** O(capacity)

**Hint:** Hash map for O(1) lookup, list for LRU order.

---

### 32. Minimum Window Substring
**Link:** [LeetCode 76](https://leetcode.com/problems/minimum-window-substring/)  
**Pattern:** Sliding window + frequency map  
**Time:** O(m + n) | **Space:** O(m + n)

**Hint:** Expand window until valid, then shrink.

---

### 33. Substring with Concatenation of All Words
**Link:** [LeetCode 30](https://leetcode.com/problems/substring-with-concatenation-of-all-words/)  
**Pattern:** Sliding window + frequency map  
**Time:** O(n * m * len) | **Space:** O(m)

**Hint:** Check windows of size word_len * word_count.

---

### 34. Longest Substring with At Most K Distinct Characters
**Link:** [LeetCode 340](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/) (Premium)  
**Pattern:** Sliding window + frequency map  
**Time:** O(n) | **Space:** O(k)

**Hint:** Maintain at most k distinct in window.

---

### 35. Max Points on a Line
**Link:** [LeetCode 149](https://leetcode.com/problems/max-points-on-a-line/)  
**Pattern:** Hash map for slope counting  
**Time:** O(n²) | **Space:** O(n)

**Hint:** For each point, count slopes to other points.

---

### 36. Alien Dictionary
**Link:** [LeetCode 269](https://leetcode.com/problems/alien-dictionary/) (Premium)  
**Pattern:** Topological sort + hash map  
**Time:** O(C) where C = total chars | **Space:** O(1) (26 letters)

**Hint:** Build graph from word pairs, topological sort.

---

### 37. Count of Range Sum
**Link:** [LeetCode 327](https://leetcode.com/problems/count-of-range-sum/)  
**Pattern:** Prefix sum + merge sort or BST  
**Time:** O(n log n) | **Space:** O(n)

**Hint:** Use prefix sums, count ranges efficiently.

---

## 📋 Problem Categories

### By Pattern:

#### Two Sum Pattern:
- Two Sum (1)
- 4Sum II (454)

#### Frequency Counting:
- Valid Anagram (242)
- Group Anagrams (49)
- Top K Frequent Elements (347)
- First Unique Character (387)

#### Sliding Window:
- Longest Substring Without Repeating (3)
- Minimum Window Substring (76)
- Find All Anagrams (438)
- Longest Repeating Character Replacement (424)

#### Prefix Sum:
- Subarray Sum Equals K (560)
- Contiguous Array (525)
- Continuous Subarray Sum (523)

#### Set Operations:
- Intersection of Two Arrays (349, 350)
- Longest Consecutive Sequence (128)

#### Mapping/Grouping:
- Isomorphic Strings (205)
- Word Pattern (290)
- Copy List with Random Pointer (138)

---

## 🎯 Study Plan

### Week 1: Easy + Basic Medium (Days 1-7)
- **Day 1-2:** Problems 1-6 (Easy fundamentals)
- **Day 3-4:** Problems 7-12 (Easy completion)
- **Day 5-7:** Problems 13-16 (Medium intro)

### Week 2: Medium Problems (Days 8-14)
- **Day 8-10:** Problems 17-22 (Sliding window)
- **Day 11-14:** Problems 23-30 (Various patterns)

### Week 3: Hard + Review (Days 15-21)
- **Day 15-17:** Problems 31-34 (Hard)
- **Day 18-19:** Problems 35-37 (Advanced hard)
- **Day 20-21:** Review and redo challenging problems

---

## 💡 Pro Tips

1. **Start with Easy:** Build confidence and learn patterns
2. **Understand, don't memorize:** Focus on pattern recognition
3. **Time yourself:** Aim for 15-20 min per Easy, 30-40 min per Medium
4. **Redo problems:** If you struggled, redo after 2-3 days
5. **Write clean code:** Practice production-quality code
6. **Analyze complexity:** Always state time/space complexity
7. **Test edge cases:** Empty input, single element, duplicates

---

## 📊 Progress Tracker

| Problem # | Name | Difficulty | Status | Attempts | Notes |
|-----------|------|------------|--------|----------|-------|
| 1 | Two Sum | Easy | ⬜ | 0 | |
| 2 | Contains Duplicate | Easy | ⬜ | 0 | |
| 3 | Valid Anagram | Easy | ⬜ | 0 | |
| ... | ... | ... | ... | ... | ... |

**Legend:** ⬜ Not Started | 🟡 In Progress | ✅ Completed | 🔄 Needs Review

---

## 🚀 Next Steps

After completing these problems:
1. Move to **Phase 2: Recursion & Backtracking**
2. Apply hashing in **Graph Problems** (Phase 5-6)
3. Use hashing for **Dynamic Programming** memoization (Phase 8-9)

---

[← Previous: Advanced Hashing Problems](./07-Advanced-Hashing-Problems.md) | [Back to Chapter 5](./README.md) | [Next: Hashing Cheatsheet →](./09-Hashing-Cheatsheet.md)
