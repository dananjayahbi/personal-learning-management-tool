# Chapter 5: Hashing

## 🎯 Chapter Overview

Welcome to the world of **Hashing**—one of the most powerful techniques in computer science! Hashing enables **O(1) average-case lookups**, making it essential for optimization and efficient problem-solving. This chapter will transform you from a beginner to someone who can wield hash tables like a pro.

**Chapter Duration:** 5-7 days  
**Problem Count:** 35+ problems  
**Difficulty Level:** Beginner to Advanced

---

## 📋 What You'll Master

By the end of this chapter, you'll be able to:

✅ Understand hash table internals and operations  
✅ Design efficient hash functions  
✅ Handle collisions using various techniques  
✅ Implement hash maps and hash sets from scratch  
✅ Recognize and apply common hashing patterns  
✅ Optimize O(n²) solutions to O(n) using hashing  
✅ Solve complex problems like Two Sum, Subarray Sum, and more  

---

## 📚 Chapter Contents

### [01. Hash Table Fundamentals](./01-Hash-Table-Fundamentals.md)
**Duration:** Day 1  
**Topics:**
- What is hashing and why it matters
- Hash table structure and components
- Key operations: Insert, Search, Delete
- Time and space complexity analysis
- When to use hash tables

### [02. Hash Functions](./02-Hash-Functions.md)
**Duration:** Day 1-2  
**Topics:**
- Properties of good hash functions
- Common hash function techniques
- Division method, multiplication method
- Universal hashing
- Hash function examples in different languages

### [03. Collision Resolution](./03-Collision-Resolution.md)
**Duration:** Day 2  
**Topics:**
- Understanding collisions
- Chaining (Separate chaining)
- Open addressing (Linear probing, Quadratic probing)
- Double hashing
- Load factor and rehashing

### [04. Hash Map Implementation](./04-Hash-Map-Implementation.md)
**Duration:** Day 3  
**Topics:**
- Implementing hash map from scratch
- Key-value pair storage
- Resize and rehashing logic
- Code examples in Python, C++, Java
- Best practices and optimization

### [05. Hash Set Implementation](./05-Hash-Set-Implementation.md)
**Duration:** Day 3  
**Topics:**
- Hash set vs hash map
- Implementing hash set from scratch
- Using hash sets for deduplication
- Set operations: union, intersection, difference
- Code examples and use cases

### [06. Common Hashing Patterns](./06-Common-Hashing-Patterns.md)
**Duration:** Day 4-5  
**Topics:**
- Two Sum pattern
- Frequency counting pattern
- Subarray sum equals K
- Finding duplicates
- Grouping anagrams
- Longest consecutive sequence

### [07. Advanced Hashing Problems](./07-Advanced-Hashing-Problems.md)
**Duration:** Day 5-6  
**Topics:**
- Three Sum and Four Sum
- Longest substring without repeating characters
- Minimum window substring
- Count distinct elements in every window
- LRU Cache (using hash map + doubly linked list)

### [08. Practice Problems](./08-Practice-Problems.md)
**Duration:** Day 6-7  
**Content:**
- 35+ curated problems (Easy, Medium, Hard)
- LeetCode and HackerRank links
- Hints and solutions
- Pattern recognition guide

### [09. Hashing Cheatsheet](./09-Hashing-Cheatsheet.md)
**Duration:** Reference  
**Content:**
- Quick reference for all concepts
- Time complexity table
- Common patterns template
- Interview tips and tricks

---

## 🎯 Learning Path

### Day 1: Foundations
- ✅ Read Hash Table Fundamentals
- ✅ Understand O(1) lookup magic
- ✅ Learn about hash functions
- ✅ Practice: Implement simple hash function

### Day 2: Deep Dive
- ✅ Study collision resolution techniques
- ✅ Compare chaining vs open addressing
- ✅ Understand load factor
- ✅ Practice: Solve 3-5 easy problems

### Day 3: Implementation
- ✅ Implement hash map from scratch
- ✅ Implement hash set from scratch
- ✅ Test with various inputs
- ✅ Practice: Solve 5-7 easy problems

### Day 4-5: Pattern Mastery
- ✅ Learn common hashing patterns
- ✅ Solve Two Sum variations
- ✅ Master frequency counting
- ✅ Practice: Solve 10-15 medium problems

### Day 6-7: Advanced & Practice
- ✅ Tackle advanced problems
- ✅ Solve Three Sum, Four Sum
- ✅ Implement LRU Cache
- ✅ Practice: Solve 10-15 harder problems

---

## 🔑 Key Concepts at a Glance

### Hash Table Operations

| Operation | Average Case | Worst Case |
|-----------|--------------|------------|
| Search    | O(1)         | O(n)       |
| Insert    | O(1)         | O(n)       |
| Delete    | O(1)         | O(n)       |
| Space     | O(n)         | O(n)       |

### Collision Resolution Methods

| Method | Description | Pros | Cons |
|--------|-------------|------|------|
| Chaining | Linked lists at each bucket | Simple, no clustering | Extra memory for pointers |
| Linear Probing | Check next slot linearly | Cache-friendly | Primary clustering |
| Quadratic Probing | Check slots quadratically | Reduces clustering | Secondary clustering |
| Double Hashing | Use second hash function | Minimal clustering | Complex |

### Common Patterns

1. **Two Sum Pattern** - Use hash map to store complement
2. **Frequency Counting** - Count occurrences in O(n)
3. **Subarray Sum** - Use prefix sum + hash map
4. **Grouping** - Group elements by hash key (e.g., anagrams)
5. **Deduplication** - Use hash set to remove duplicates

---

## 💡 Why Hashing Matters

### Real-World Applications:

1. **Databases** - Indexing for fast lookups
2. **Caching** - LRU cache, browser cache
3. **Compilers** - Symbol tables
4. **Cryptography** - Password storage, checksums
5. **Networking** - Routing tables, DNS lookup
6. **Web Development** - Session management, cookies
7. **Machine Learning** - Feature hashing, bloom filters

### Interview Importance:

- 🔥 **40%** of LeetCode Easy/Medium problems can use hashing
- 🔥 Hashing is the **#1 optimization technique** for interviews
- 🔥 Understanding hash maps is **essential** for system design
- 🔥 Many string and array problems become trivial with hashing

---

## ✅ Chapter Completion Checklist

Before moving forward, ensure you can:

### Conceptual Understanding:
- [ ] Explain how hash tables work internally
- [ ] Describe how hash functions map keys to indices
- [ ] Compare different collision resolution methods
- [ ] Calculate load factor and explain rehashing
- [ ] Identify when to use hash map vs hash set

### Implementation Skills:
- [ ] Implement hash map from scratch with chaining
- [ ] Implement hash set from scratch
- [ ] Write a basic hash function
- [ ] Handle collisions properly
- [ ] Implement resize/rehashing logic

### Problem Solving:
- [ ] Solve Two Sum in O(n) time
- [ ] Count frequency of elements
- [ ] Find duplicates in an array
- [ ] Group anagrams together
- [ ] Find subarray with given sum
- [ ] Solve at least 25 hashing problems

### Code Quality:
- [ ] Write clean, bug-free code
- [ ] Analyze time and space complexity
- [ ] Optimize solutions using hashing
- [ ] Handle edge cases (empty input, collisions)
- [ ] Debug hash table issues

---

## 📊 Progress Tracking

| Section | Status | Problems Solved | Notes |
|---------|--------|----------------|-------|
| Hash Table Fundamentals | ⬜ | 0/5 | |
| Hash Functions | ⬜ | 0/3 | |
| Collision Resolution | ⬜ | 0/4 | |
| Hash Map Implementation | ⬜ | 0/2 | |
| Hash Set Implementation | ⬜ | 0/2 | |
| Common Patterns | ⬜ | 0/10 | |
| Advanced Problems | ⬜ | 0/9 | |
| Total | ⬜ | **0/35** | |

---

## 🎓 Study Tips

### For Beginners:
1. Start with understanding the **"why"** - why O(1) lookups?
2. Draw hash tables on paper to visualize
3. Code simple examples before complex ones
4. Focus on **Two Sum** - it's the foundation

### For Intermediate Learners:
1. Master all collision resolution techniques
2. Implement hash map without looking at solutions
3. Solve 20+ problems to recognize patterns
4. Learn to convert O(n²) to O(n) using hashing

### For Advanced Learners:
1. Study rolling hashes and Rabin-Karp
2. Explore bloom filters and cuckoo hashing
3. Solve hard problems like LRU Cache
4. Learn about consistent hashing (for system design)

---

## 🚀 Pro Tips for Interviews

1. **Hash Map is your friend** - Always consider if hashing can optimize
2. **Space-time tradeoff** - Hashing trades O(n) space for O(1) time
3. **Two Sum template** - Memorize it, it appears everywhere
4. **Handle collisions** - Mention them in interviews to show depth
5. **Language built-ins** - Use `dict` (Python), `unordered_map` (C++), `HashMap` (Java)
6. **Order matters** - Use `LinkedHashMap` if insertion order is important

---

## 📚 Recommended Resources

### Online:
- **LeetCode:** Hash Table Explore Card
- **NeetCode:** Arrays & Hashing (YouTube)
- **GeeksforGeeks:** Hashing tutorials
- **Visualgo:** Hash table visualizations

### Books:
- "Cracking the Coding Interview" - Chapter 1
- "Introduction to Algorithms" (CLRS) - Chapter 11

### Practice Platforms:
- LeetCode: Hash Table tag (200+ problems)
- HackerRank: Hash Tables track
- Codeforces: Hash map problems

---

## 🎯 Next Steps

After mastering hashing:
1. Move to **Chapter 6: Practice Problems** for consolidation
2. Apply hashing in **Phase 2: Recursion** for memoization
3. Use hashing extensively in **Phase 5: Graphs** (adjacency maps)

**Remember:** Hashing is not just a data structure—it's a **problem-solving philosophy**. Master it, and you'll solve problems faster than you ever thought possible! 🚀

---

[← Phase 1 Overview](../README.md) | [Next: Hash Table Fundamentals →](./01-Hash-Table-Fundamentals.md)
