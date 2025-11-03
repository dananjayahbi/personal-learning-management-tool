# Feature Prioritization Matrix

## Overview

This template helps you systematically prioritize features using multiple frameworks. Copy this into a spreadsheet (Excel, Google Sheets, Airtable) for easy tracking and calculation.

---

## Spreadsheet Structure

### Sheet 1: Feature List with RICE Scoring

| Feature Name | Description | Category | Source | Reach | Impact | Confidence | Effort | RICE Score | Priority | Status |
|--------------|-------------|----------|--------|-------|--------|------------|--------|------------|----------|--------|
| Mobile checkout | Mobile-first POS interface | Core | Customer | 500 | 3 | 100% | 3 | 500.0 | P0 | Planned |
| Barcode scanning | Scan products for quick entry | Feature | Customer | 400 | 2 | 90% | 1 | 720.0 | P0 | In Progress |
| Email receipts | Automated receipt via email | Feature | Customer | 500 | 1 | 100% | 0.5 | 1000.0 | P0 | Planned |
| Low stock alerts | Alert when inventory runs low | Feature | Customer | 400 | 2 | 90% | 0.5 | 1440.0 | P0 | Backlog |
| Multi-location sync | Sync inventory across locations | Feature | Customer | 50 | 2 | 80% | 6 | 13.3 | P2 | Backlog |

### Column Definitions

**Feature Name:** Short, descriptive name

**Description:** What it does in 1-2 sentences

**Category:** 
- Core (essential product functionality)
- Feature (additional capability)
- Improvement (enhancement to existing)
- Bug (fix for broken functionality)
- Technical Debt (code quality, infrastructure)

**Source:**
- Customer (requested by customers)
- Internal (team idea)
- Competitive (copying competitor)
- Strategy (strategic initiative)

**Reach:** Number of customers impacted per quarter
- Use your total customer count as reference
- Estimate % who would use × total customers

**Impact:** How much it improves things (per customer)
- 0.25 = Minimal
- 0.5 = Low
- 1 = Medium
- 2 = High
- 3 = Massive

**Confidence:** How certain are you about reach/impact?
- 100% = Validated with customers, data-backed
- 80% = Strong evidence
- 50% = Educated guess
- 30% = Low confidence

**Effort:** Person-months to build
- 0.5 = 1-2 weeks
- 1 = 1 month
- 2 = 2 months
- 3 = 3 months
- 6+ = Major initiative

**RICE Score:** (Reach × Impact × Confidence) / Effort
- Formula: `=(E2*F2*G2)/H2`
- Higher = higher priority

**Priority:**
- P0: Critical (must build now)
- P1: High (next quarter)
- P2: Medium (this year)
- P3: Low (someday/maybe)
- P4: Won't do

**Status:**
- Backlog (not started)
- Planned (committed to sprint)
- In Progress (being built)
- In Review (QA/testing)
- Shipped (live)
- Cancelled (decided not to build)

---

### Sheet 2: ICE Scoring (Alternative/Supplement to RICE)

| Feature Name | Impact (1-10) | Confidence (1-10) | Ease (1-10) | ICE Score | Priority |
|--------------|---------------|-------------------|-------------|-----------|----------|
| Mobile checkout | 9 | 8 | 3 | 6.67 | P0 |
| Barcode scanning | 8 | 9 | 9 | 8.67 | P0 |
| Email receipts | 7 | 10 | 10 | 9.00 | P0 |
| Multi-location | 8 | 7 | 2 | 5.67 | P1 |

**ICE Score Formula:** `=(B2+C2+D2)/3` or `=B2*C2*D2` (multiplicative)

---

### Sheet 3: Value vs Complexity Matrix

| Feature Name | Value (1-10) | Complexity (1-10) | Quadrant | Priority |
|--------------|--------------|-------------------|----------|----------|
| Mobile checkout | 9 | 8 | Big Bet | P0 |
| Barcode scanning | 8 | 2 | Quick Win | P0 |
| Email receipts | 6 | 1 | Quick Win | P0 |
| Custom themes | 2 | 7 | Money Pit | P4 |
| Multi-location | 9 | 9 | Big Bet | P1 |

**Quadrants:**
- **Quick Win:** High Value (7+), Low Complexity (1-4) → DO NOW
- **Big Bet:** High Value (7+), High Complexity (7-10) → PLAN CAREFULLY
- **Fill-in:** Low Value (1-6), Low Complexity (1-4) → DO LATER
- **Money Pit:** Low Value (1-6), High Complexity (7-10) → DON'T DO

**Formula for Quadrant:**
```
=IF(AND(B2>=7,C2<=4),"Quick Win",
 IF(AND(B2>=7,C2>=7),"Big Bet",
 IF(AND(B2<=6,C2<=4),"Fill-in","Money Pit")))
```

---

### Sheet 4: Customer Request Tracking

| Feature Name | Request Count | Customer Segments | MRR Impacted | Priority |
|--------------|---------------|-------------------|--------------|----------|
| QuickBooks integration | 23 | Pro, Enterprise | $5,600 | P1 |
| Inventory forecasting | 18 | Pro, Enterprise | $4,200 | P1 |
| Dark mode | 8 | All | $900 | P3 |
| Multi-currency | 3 | Enterprise | $1,500 | P3 |

**Use this to:**
- Track which features are most requested
- Identify which customer segments want what
- Prioritize by revenue impact

---

### Sheet 5: Roadmap View

| Quarter | Theme | Features | Expected Impact |
|---------|-------|----------|-----------------|
| Q1 2025 | Core Functionality | Mobile checkout, Barcode scanning, Email receipts | Launch MVP, 80% activation |
| Q2 2025 | Efficiency | Low stock alerts, Quick reports, Multi-user | Reduce support tickets 30% |
| Q3 2025 | Growth | Integrations, Advanced analytics, Loyalty | Enable expansion revenue |
| Q4 2025 | Scale | Multi-location, API, Webhooks | Enterprise-ready |

---

## How to Use This Matrix

### Step 1: Collect All Feature Ideas

**Sources:**
- Customer interviews
- Support tickets
- Feature request tool
- Competitive analysis
- Team brainstorms
- Strategic priorities

**Add everything to the list.** Don't filter yet.

### Step 2: Score Each Feature

**Use RICE framework (recommended for early stage):**

1. **Reach:** How many customers per quarter?
   - Look at your total customer count
   - Estimate % who'd use it
   - Example: 500 customers × 80% = 400 reach

2. **Impact:** How much does it improve their experience?
   - 3 = Massive (core value prop, game-changing)
   - 2 = High (major improvement)
   - 1 = Medium (nice improvement)
   - 0.5 = Low (slight improvement)
   - 0.25 = Minimal (barely noticeable)

3. **Confidence:** How sure are you?
   - 100% = Validated with customers, have data
   - 80% = Strong customer feedback
   - 50% = Gut feeling, some evidence
   - 30% = Pure guess

4. **Effort:** How long to build?
   - In person-months
   - Include design, development, testing, deployment
   - Be realistic (usually longer than you think)

5. **Calculate RICE:** (Reach × Impact × Confidence) / Effort

### Step 3: Review and Adjust

**Look at the sorted list (highest RICE first):**

```
Does this make sense?

Quick sanity checks:
- Does #1 feature align with strategy?
- Are we missing critical dependencies?
- Do we have capacity for top priorities?
- Are we balancing quick wins with big bets?
```

**Manual adjustments:**
- Strategic priority → bump up
- Technical dependency → adjust order
- Team capacity → realistic timeline

### Step 4: Assign to Roadmap

**Now/Next/Later framework:**

**NOW (This Sprint/Month):**
- Top 2-3 priorities
- Mix of quick wins + strategic bets
- Include critical bugs/debt

**NEXT (Next Quarter):**
- 5-10 features in priority order
- More flexibility
- Adjust as you learn

**LATER (Next 6-12 Months):**
- Themes and directions
- Big strategic bets
- Stay flexible

### Step 5: Communicate and Execute

**Share roadmap with:**
- Internal team (alignment)
- Customers (transparency)
- Investors (confidence)

**Review regularly:**
- Weekly: Check progress on current sprint
- Monthly: Adjust next month's priorities
- Quarterly: Major roadmap review

---

## Example: POS System Feature Prioritization

### All Features Collected (30 ideas)

```
Checkout & Payments:
1. Mobile checkout
2. Split payments
3. Offline mode
4. Custom tipping
5. Receipt customization

Inventory:
6. Barcode scanning
7. Low stock alerts
8. Inventory forecasting
9. Multi-location sync
10. Vendor management

Reporting:
11. Sales reports
12. Advanced analytics
13. Export to Excel
14. Real-time dashboard
15. Custom report builder

Customer:
16. Customer database
17. Email receipts
18. Loyalty program
19. Email marketing
20. Purchase history

Integrations:
21. QuickBooks
22. Shopify
23. Mailchimp
24. Zapier
25. Custom API

Employee:
26. Multi-user access
27. Permission levels
28. Time tracking
29. Commission tracking

Other:
30. Dark mode
```

### After RICE Scoring (Top 10)

```
1. Email receipts - RICE: 1000 (Quick Win)
   Reach: 500, Impact: 1, Confidence: 100%, Effort: 0.5

2. Low stock alerts - RICE: 1440 (Quick Win)
   Reach: 400, Impact: 2, Confidence: 90%, Effort: 0.5

3. Barcode scanning - RICE: 720 (Quick Win)
   Reach: 400, Impact: 2, Confidence: 90%, Effort: 1

4. Sales reports - RICE: 500 (Strategic)
   Reach: 500, Impact: 2, Confidence: 100%, Effort: 2

5. Mobile checkout - RICE: 500 (Strategic)
   Reach: 500, Impact: 3, Confidence: 100%, Effort: 3

6. Multi-user access - RICE: 240
   Reach: 300, Impact: 2, Confidence: 80%, Effort: 2

7. Customer database - RICE: 175
   Reach: 350, Impact: 1.5, Confidence: 70%, Effort: 2.1

8. Inventory forecasting - RICE: 120
   Reach: 200, Impact: 2, Confidence: 60%, Effort: 4

9. QuickBooks integration - RICE: 60
   Reach: 200, Impact: 2, Confidence: 60%, Effort: 4

10. Loyalty program - RICE: 25
    Reach: 100, Impact: 1, Confidence: 50%, Effort: 4
```

### Roadmap Decision

**Q1 - MVP Core:**
- Email receipts (Quick Win)
- Low stock alerts (Quick Win)
- Barcode scanning (Quick Win)
- Sales reports (Foundation)

**Q2 - Scale & Power:**
- Mobile checkout (Strategic)
- Multi-user access (Growth enabler)
- Customer database (Foundation)

**Q3 - Advanced Features:**
- Inventory forecasting (Differentiation)
- QuickBooks integration (Expansion)

**Q4 - Nice-to-Haves:**
- Loyalty program (If time permits)

---

## Prioritization Decision Tree

```
New feature idea comes in →

1. Does it serve our ICP (Ideal Customer Profile)?
   ├─ No → Decline
   └─ Yes → Continue

2. Is it requested by multiple customers (3+)?
   ├─ No → Backlog for future validation
   └─ Yes → Continue

3. Does it align with our core value prop?
   ├─ No → Backlog
   └─ Yes → Continue

4. Can we build it in <1 month?
   ├─ Yes → Consider for this sprint
   └─ No → Continue

5. Is it a top 5 priority by RICE?
   ├─ Yes → Plan for next quarter
   └─ No → Backlog for later
```

---

## Tips for Effective Prioritization

### Do's ✅

1. **Score objectively** - Use data, not feelings
2. **Validate assumptions** - Talk to customers before scoring high confidence
3. **Update regularly** - Re-score as you learn more
4. **Balance quick wins with strategic bets** - Need both
5. **Consider dependencies** - Can't build feature B before feature A
6. **Factor in team capacity** - Be realistic about what you can build
7. **Involve team** - Engineering input on effort, customer success on impact
8. **Say no often** - Most features should be declined or deferred

### Don'ts ❌

1. **Don't build everything** - Focus wins
2. **Don't trust HiPPO** (Highest Paid Person's Opinion without data)
3. **Don't copy competitors blindly** - They may be wrong
4. **Don't ignore effort** - High-effort features need high-impact to justify
5. **Don't set and forget** - Priorities change as you learn
6. **Don't prioritize edge cases** - Focus on core use cases
7. **Don't promise dates** - Estimate ranges, not firm dates
8. **Don't skip validation** - Assumptions kill startups

---

## Sample Spreadsheet Formulas

### Google Sheets / Excel

**RICE Score:**
```
=(E2*F2*G2)/H2

Where:
E2 = Reach
F2 = Impact
G2 = Confidence (as decimal, e.g., 0.8)
H2 = Effort
```

**ICE Score (Average):**
```
=(B2+C2+D2)/3
```

**ICE Score (Multiplicative):**
```
=B2*C2*D2
```

**Value vs Complexity Quadrant:**
```
=IF(AND(B2>=7,C2<=4),"Quick Win",
 IF(AND(B2>=7,C2>=7),"Big Bet",
 IF(AND(B2<=6,C2<=4),"Fill-in","Money Pit")))
```

**Priority Assignment (based on RICE):**
```
=IF(I2>=500,"P0",
 IF(I2>=200,"P1",
 IF(I2>=50,"P2","P3")))
```

**Conditional Formatting:**
- Green: RICE > 500 (P0)
- Yellow: RICE 200-500 (P1)
- Orange: RICE 50-200 (P2)
- Red: RICE < 50 (P3)

---

## Action Items

### This Week
- [ ] List all feature ideas (aim for 20-30)
- [ ] Score top 10 using RICE
- [ ] Sort by priority
- [ ] Identify top 3 to build this month

### This Month
- [ ] Complete RICE scoring for all features
- [ ] Validate top priorities with 5 customers
- [ ] Create quarterly roadmap
- [ ] Share roadmap with team
- [ ] Commit to building top 3

### This Quarter
- [ ] Review and update scores monthly
- [ ] Ship top 5 prioritized features
- [ ] Measure impact of shipped features
- [ ] Adjust roadmap based on learnings
- [ ] Kill 3 features that don't justify effort

---

## Remember

**"The art of being wise is the art of knowing what to overlook."** - William James

**Prioritization is about saying NO to good ideas so you can say YES to great ones.**

Most features don't deserve to be built. Your job is to find the few that matter most and execute them brilliantly.

---

**Ready to prioritize?** Copy this template into a spreadsheet and start scoring your features today!