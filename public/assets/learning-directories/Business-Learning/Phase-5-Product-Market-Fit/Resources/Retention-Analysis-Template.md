# Retention Analysis Template

## Overview

This template helps you track, analyze, and improve customer retention. Use this to identify churn patterns, measure cohort health, and calculate key retention metrics.

---

## Part 1: Monthly Churn Tracking

### Basic Churn Metrics

| Month | Customers Start | New Customers | Churned Customers | Customers End | Gross Churn Rate | Net Churn Rate | MRR Start | MRR New | MRR Churned | MRR Expansion | MRR End | Revenue Retention |
|-------|----------------|---------------|-------------------|---------------|------------------|----------------|-----------|---------|-------------|---------------|---------|-------------------|
| Jan 2025 | 100 | 15 | 5 | 110 | 5.0% | -5.0% | $10,000 | $1,500 | $500 | $800 | $11,800 | 113% |
| Feb 2025 | 110 | 20 | 8 | 122 | 7.3% | 3.6% | $11,800 | $2,000 | $800 | $1,200 | $14,200 | 110% |
| Mar 2025 | 122 | 18 | 6 | 134 | 4.9% | -4.1% | $14,200 | $1,800 | $600 | $1,500 | $16,900 | 112% |

### Formulas

**Gross Churn Rate (Customer):**
```
= (Churned Customers / Customers at Start of Month) × 100
= (5 / 100) × 100 = 5%
```

**Net Churn Rate (Customer):**
```
= ((Churned Customers - New Customers) / Customers at Start) × 100
= ((5 - 15) / 100) × 100 = -10% (negative = growth!)
```

**Gross Revenue Churn Rate:**
```
= (MRR Churned / MRR at Start) × 100
= ($500 / $10,000) × 100 = 5%
```

**Net Revenue Retention (NRR):**
```
= ((MRR Start + MRR Expansion - MRR Churned) / MRR Start) × 100
= (($10,000 + $800 - $500) / $10,000) × 100 = 103%
```

**Target Benchmarks:**
- **Gross Churn Rate:** <5% per month (best in class: <3%)
- **Net Revenue Retention:** >100% (excellent: >110%, world-class: >120%)
- **Monthly Logo Churn:** <2% (SaaS standard)

---

## Part 2: Cohort Retention Analysis

### Cohort Table (by Month)

| Cohort | M0 | M1 | M2 | M3 | M4 | M5 | M6 | M7 | M8 | M9 | M10 | M11 | M12 |
|--------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|------|------|------|
| Jan 2024 | 100% | 92% | 87% | 83% | 80% | 78% | 76% | 75% | 74% | 73% | 72% | 72% | 71% |
| Feb 2024 | 100% | 90% | 85% | 82% | 79% | 77% | 75% | 74% | 73% | 72% | 71% | 71% | - |
| Mar 2024 | 100% | 93% | 88% | 85% | 82% | 80% | 78% | 77% | 76% | 75% | 74% | - | - |
| Apr 2024 | 100% | 91% | 86% | 83% | 80% | 78% | 76% | 75% | 74% | 73% | - | - | - |
| May 2024 | 100% | 94% | 89% | 86% | 83% | 81% | 79% | 78% | 77% | - | - | - | - |
| Jun 2024 | 100% | 95% | 91% | 88% | 85% | 83% | 81% | 80% | - | - | - | - | - |
| Jul 2024 | 100% | 96% | 92% | 89% | 86% | 84% | 82% | - | - | - | - | - | - |
| Aug 2024 | 100% | 97% | 93% | 90% | 87% | 85% | - | - | - | - | - | - | - |
| Sep 2024 | 100% | 96% | 92% | 89% | 86% | - | - | - | - | - | - | - | - |
| Oct 2024 | 100% | 95% | 91% | 88% | - | - | - | - | - | - | - | - | - |
| Nov 2024 | 100% | 94% | 90% | - | - | - | - | - | - | - | - | - | - |
| Dec 2024 | 100% | 93% | - | - | - | - | - | - | - | - | - | - | - |

### How to Read This

- **M0:** Month customer signed up (always 100%)
- **M1:** 1 month later, what % is still active?
- **M12:** After 1 year, what % remains?

**Example:** Of the 100 customers who joined in Jan 2024:
- 92% were still active after 1 month
- 87% after 2 months
- 71% after 12 months

### Analysis Questions

1. **Are newer cohorts better than older ones?**
   - Yes → Your product/onboarding is improving
   - No → Something regressed, investigate

2. **Where is the biggest drop-off?**
   - M0-M1: Onboarding problem
   - M1-M3: Product value not clear
   - M6-M12: Long-term engagement issue

3. **What's your steady-state retention?**
   - Where the curve flattens (e.g., M6-M12)
   - These are your loyal customers

### Spreadsheet Formula

For cell showing M3 retention of Feb 2024 cohort:
```
= (Customers Active in M3) / (Customers Who Signed Up in M0) × 100
```

---

## Part 3: Revenue Cohort Analysis

### Revenue Retention by Cohort

| Cohort | M0 MRR | M1 MRR | M2 MRR | M3 MRR | M6 MRR | M12 MRR | M12 Retention |
|--------|--------|--------|--------|--------|--------|---------|---------------|
| Jan 2024 | $10,000 | $10,500 | $10,800 | $11,200 | $12,000 | $13,500 | 135% |
| Feb 2024 | $12,000 | $12,600 | $13,000 | $13,500 | $14,500 | $16,800 | 140% |
| Mar 2024 | $15,000 | $15,750 | $16,200 | $16,800 | $18,000 | - | - |
| Apr 2024 | $18,000 | $18,900 | $19,500 | $20,250 | $21,600 | - | - |

**This shows:**
- Even if you lose customers (logo churn), revenue can grow (expansion)
- Jan 2024 cohort grew 35% in revenue despite losing 29% of customers
- Expansion (upsells, usage growth) > Churn

### Target: Net Revenue Retention > 100%

```
NRR = (Starting MRR - Churn + Expansion) / Starting MRR

If Jan cohort:
- Started: $10,000
- Churned: $2,900 (29% logo churn)
- Expanded: $6,400
- Ended: $13,500

NRR = ($10,000 - $2,900 + $6,400) / $10,000 = 135%
```

---

## Part 4: Churn Reason Analysis

### Churn Reasons (Last 100 Churned Customers)

| Reason | Count | % of Churn | Avg Customer Lifetime | Avg LTV | Action Needed |
|--------|-------|------------|----------------------|---------|---------------|
| Too expensive | 28 | 28% | 4.2 months | $420 | Pricing validation, show ROI |
| Not using / Low engagement | 24 | 24% | 2.8 months | $280 | Onboarding, activation |
| Missing features | 18 | 18% | 6.5 months | $650 | Product roadmap |
| Switched to competitor | 12 | 12% | 8.2 months | $820 | Competitive analysis |
| Business closed | 10 | 10% | 11.3 months | $1,130 | Unavoidable |
| Technical issues | 5 | 5% | 3.1 months | $310 | Product quality |
| Poor support | 3 | 3% | 5.0 months | $500 | Support training |

### How to Collect This Data

**1. Exit Survey (automatically sent):**
```
Subject: We're sad to see you go

Hi [Name],

We noticed you cancelled your [Product] subscription. We're sorry to see you go!

Would you mind sharing why you decided to cancel? This helps us improve.

[One-click survey]
- Too expensive
- Not using it enough
- Missing features I need
- Switching to competitor
- Technical issues
- Other: ___________

Thanks,
[Your Name]
```

**2. Manual outreach (high-value customers):**
- Call within 24 hours
- Understand real reason (often different from stated)
- Attempt save if appropriate

**3. Usage data analysis:**
- Look at engagement 30 days before churn
- Identify leading indicators

---

## Part 5: Customer Health Score

### Health Score Components

| Customer | Monthly Usage | Feature Adoption | Support Tickets | NPS Score | Payment Status | Health Score | Risk Level |
|----------|---------------|------------------|-----------------|-----------|----------------|--------------|------------|
| ABC Corp | 450 trans | 8/10 features | 0 | 9 | Current | 92 | Green |
| XYZ Retail | 120 trans | 4/10 features | 2 | 6 | Current | 64 | Yellow |
| 123 Store | 15 trans | 2/10 features | 4 | 4 | 15 days late | 28 | Red |

### Health Score Formula

```
Health Score = 
  (Usage Score × 0.4) +
  (Feature Adoption × 0.2) +
  (Support Score × 0.15) +
  (NPS Score × 0.15) +
  (Payment Score × 0.1)

Where each component is 0-100 scale.
```

**Example: ABC Corp**
```
Health Score = 
  (95 × 0.4) +    # High usage
  (80 × 0.2) +    # 8/10 features
  (100 × 0.15) +  # No tickets
  (90 × 0.15) +   # NPS 9
  (100 × 0.1)     # Payment current
= 92
```

### Risk Levels

- **90-100 (Green):** Healthy, expansion opportunity
- **70-89 (Yellow):** Monitor, engage proactively
- **50-69 (Orange):** At risk, intervention needed
- **0-49 (Red):** Critical, urgent action required

### Usage Score (for POS system)

| Transactions/Month | Score |
|-------------------|-------|
| 500+ | 100 |
| 300-499 | 80 |
| 150-299 | 60 |
| 50-149 | 40 |
| 10-49 | 20 |
| <10 | 0 |

**Formula:**
```
=IF(A2>=500,100,
 IF(A2>=300,80,
 IF(A2>=150,60,
 IF(A2>=50,40,
 IF(A2>=10,20,0)))))
```

### Feature Adoption Score

```
= (Features Used / Total Core Features) × 100
= (8 / 10) × 100 = 80
```

### Support Score

```
= 100 - (Tickets × 10)
= 100 - (2 × 10) = 80

(Max 10 tickets = 0 score)
```

---

## Part 6: Leading Indicators of Churn

### Red Flags to Monitor

| Indicator | Healthy | Warning | Critical | Action |
|-----------|---------|---------|----------|--------|
| Login frequency | Daily | 2-3x/week | <1x/week | Engagement email |
| Transactions | >100/month | 20-100/month | <20/month | Check-in call |
| Feature usage | 5+ features | 2-4 features | 1 feature | Onboarding refresh |
| Support tickets | 0-1/month | 2-3/month | 4+/month | Account review |
| NPS score | 9-10 | 7-8 | 0-6 | Recovery plan |
| Payment issues | None | 1-7 days late | >7 days late | Billing follow-up |
| Invoice opens | Opens invoice | - | Doesn't open | Payment problem? |

### Automated Alerts

Set up automatic alerts when:
- Customer hasn't logged in for 7 days
- Transactions drop >50% month-over-month
- Support tickets increase >2 in one week
- Payment fails
- Health score drops below 70

---

## Part 7: Retention Improvement Strategies

### Based on Churn Analysis

| Churn Reason | % of Churn | Improvement Strategy | Expected Impact | Owner | Status |
|--------------|------------|---------------------|-----------------|-------|--------|
| Too expensive | 28% | Better ROI communication, case studies | -30% of this segment | Marketing | In Progress |
| Low engagement | 24% | Onboarding checklist, activation emails | -50% of this segment | Product | Planned |
| Missing features | 18% | Build top 3 requested features | -40% of this segment | Product | Backlog |
| Competitor switch | 12% | Competitive feature matrix, differentiation | -20% of this segment | Marketing | Not Started |

### Onboarding Improvements (to reduce low engagement churn)

**Week 1 Activation Checklist:**
- [ ] Complete profile setup
- [ ] Process first transaction
- [ ] Add 10 products to inventory
- [ ] Run first sales report
- [ ] Set up receipt email

**Target:** 80% of customers complete all 5 steps in first week

**Current:** 45% completion
**Impact if improved to 80%:** Reduce M1 churn from 10% to 5%

---

## Part 8: Retention Metrics Dashboard

### Key Metrics to Track Weekly

| Metric | This Week | Last Week | Change | Target | Status |
|--------|-----------|-----------|--------|--------|--------|
| Active Customers | 487 | 482 | +5 | +10/week | ⚠️ |
| Churn (Count) | 6 | 8 | -2 | <5 | ✅ |
| Churn Rate | 1.2% | 1.6% | -0.4% | <1% | ⚠️ |
| MRR | $48,700 | $48,200 | +$500 | +$2,000 | ⚠️ |
| NRR (30-day) | 105% | 103% | +2% | >110% | ⚠️ |
| Red Health Customers | 23 | 28 | -5 | <20 | ⚠️ |
| Avg Health Score | 76 | 74 | +2 | >80 | ⚠️ |

### Monthly Metrics

| Metric | This Month | Last Month | MoM Growth | Annual Target |
|--------|------------|------------|------------|---------------|
| MRR | $48,700 | $47,200 | +3.2% | $60,000 |
| ARR | $584,400 | $566,400 | +3.2% | $720,000 |
| Customers | 487 | 472 | +3.2% | 600 |
| ARPU | $100 | $100 | 0% | $100 |
| Gross Churn | 4.2% | 4.8% | -0.6% | <3% |
| Net Churn | -1.5% | -1.2% | -0.3% | <-2% |
| NRR | 108% | 106% | +2% | >115% |
| LTV | $3,000 | $2,850 | +5.3% | $3,500 |
| CAC | $850 | $900 | -5.6% | $700 |
| LTV:CAC | 3.5:1 | 3.2:1 | +9.4% | >4:1 |

---

## Part 9: Cohort Retention Improvement Tracking

### Comparing Old vs New Cohorts

| Month | Old Cohorts (Q1 2024) M3 Retention | New Cohorts (Q4 2024) M3 Retention | Improvement | Why Better? |
|-------|-----------------------------------|-----------------------------------|-------------|-------------|
| M0-M1 | 92% | 96% | +4% | New onboarding checklist |
| M1-M2 | 87% | 93% | +6% | Weekly engagement emails |
| M2-M3 | 83% | 90% | +7% | Feature adoption campaigns |

**This shows:** Our retention efforts are working! New customers stick around better than old ones.

---

## Part 10: Action Plan Template

### This Month's Retention Goals

**Goal:** Reduce churn from 4.2% to 3.5%

**Initiatives:**

1. **Improve Onboarding (Target: -50% of "low engagement" churn)**
   - [ ] Send activation checklist email on Day 1
   - [ ] Personal check-in call for customers who don't complete setup by Day 3
   - [ ] In-app prompts to guide users through first transaction
   - **Owner:** Sarah (Product)
   - **Due:** Implement by end of week 1

2. **Proactive Outreach to At-Risk Customers (Target: Save 30% of red health score customers)**
   - [ ] Identify 23 red health score customers
   - [ ] Call each to understand issues
   - [ ] Offer 1-on-1 training session
   - **Owner:** Mike (Customer Success)
   - **Due:** Complete all calls by end of week 2

3. **Build Top Requested Feature (Target: -40% of "missing features" churn)**
   - [ ] Ship low stock alerts (most requested feature)
   - [ ] Announce to customers who requested it
   - **Owner:** Dev team
   - **Due:** Ship by end of month

4. **Better Pricing Communication (Target: -30% of "too expensive" churn)**
   - [ ] Create ROI calculator
   - [ ] Case study showing time/money saved
   - [ ] Share in pre-churn email sequence
   - **Owner:** Emily (Marketing)
   - **Due:** Complete by week 3

**Expected Impact:**
- Low engagement: 24% of churn × 50% reduction = -12% total churn
- At-risk customers: 10% of churn × 30% saved = -3% total churn
- Missing features: 18% of churn × 40% reduction = -7% total churn
- Too expensive: 28% of churn × 30% reduction = -8% total churn

**Total Expected Reduction:** -30% of current churn = 4.2% → 2.9% 🎯

---

## Sample Spreadsheet Setup

### Sheet 1: Monthly Tracking
- Columns: Month, Customers Start, New, Churned, End, Churn %, MRR metrics

### Sheet 2: Cohort Analysis
- Rows: Cohort month
- Columns: M0, M1, M2... M12
- Cells: Retention %

### Sheet 3: Health Scores
- Columns: Customer name, usage score, feature adoption, support, NPS, health score, risk level

### Sheet 4: Churn Reasons
- Summary table of reasons + count + actions

### Sheet 5: Dashboard
- Key metrics with charts
- Week-over-week tracking
- Visual health score distribution

---

## Tools to Help

### Recommended Analytics Tools

**For Retention Analysis:**
- **Baremetrics** (for SaaS metrics)
- **ChartMogul** (cohort analysis)
- **ProfitWell** (retention reports)
- **Mixpanel** (user behavior)
- **Amplitude** (product analytics)

**For Customer Health:**
- **Vitally** (health scores + automation)
- **ChurnZero** (proactive CS)
- **Gainsight** (enterprise CS platform)

**DIY Option:**
- Google Sheets + this template
- Export data monthly from your database
- Update manually (works well up to ~100 customers)

---

## Remember

### Retention > Acquisition

**Reducing churn by 1% is often more valuable than increasing acquisition by 5%.**

Why?
- Keeping a customer is 5x cheaper than acquiring a new one
- Long-term customers have higher LTV
- They refer others (negative CAC)
- Retention compounds (churn destroys)

**Example:**
```
Scenario A: 10% monthly churn, 100 new customers/month
After 12 months: ~700 total customers

Scenario B: 5% monthly churn, 100 new customers/month
After 12 months: ~1,100 total customers

Same acquisition, 57% more customers just by halving churn!
```

---

## Next Steps

1. **Copy this template to a spreadsheet**
2. **Fill in your actual data** (start with last 3 months)
3. **Calculate your current churn rate and NRR**
4. **Build a cohort table** (even if just 3-6 cohorts)
5. **Identify your #1 churn reason**
6. **Pick ONE initiative** to reduce that reason
7. **Measure impact** after 30 days
8. **Iterate**

**Start measuring retention today. What you measure, you can improve.**