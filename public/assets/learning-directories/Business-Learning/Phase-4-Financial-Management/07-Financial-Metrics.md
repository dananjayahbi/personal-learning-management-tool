# Financial Metrics & KPIs for CoodLoom

## Introduction
"What gets measured gets managed." As a founder, you need a dashboard of key metrics to understand your business health, make decisions, and communicate with stakeholders. This chapter covers the essential financial KPIs every founder must track.

## The Metrics Hierarchy

### Level 1: Daily Metrics (Check Every Day)
- Cash balance
- New customers
- Churn (if any)
- Revenue (daily recurring)

### Level 2: Weekly Metrics (Every Monday)
- MRR (Monthly Recurring Revenue)
- New MRR
- Churned MRR
- Net MRR growth
- Active trials
- Customer count

### Level 3: Monthly Metrics (Month-end close)
- All of the above plus:
- ARR (Annual Recurring Revenue)
- Gross margin
- Burn rate
- Runway
- CAC
- LTV
- Unit economics dashboard

### Level 4: Quarterly Metrics (Strategic review)
- All of the above plus:
- Magic Number
- Rule of 40
- Cohort analysis
- Channel performance
- Investor metrics

## Core Revenue Metrics

### 1. Monthly Recurring Revenue (MRR)

**Definition**: Predictable monthly revenue from subscriptions

**Formula**:
```
MRR = Sum of all monthly subscription revenue

CoodLoom Example:
100 customers on Starter ($149) = $14,900
70 customers on Pro ($299) = $20,930
Total MRR = $35,830
```

**Why It Matters**:
- Predictability: Know what revenue to expect
- Growth tracking: Easy to see month-over-month trends
- Investor language: This is what they care about
- Valuation: Companies often valued at 6-12× ARR

**What to Include**:
✅ Monthly subscription fees  
✅ Monthly add-on recurring fees  

**What NOT to Include**:
❌ One-time setup fees  
❌ Hardware sales  
❌ Professional services  
❌ Annual subscriptions (see New MRR below)  

**Annual Subscription Handling**:
```
Customer pays $1,788 annually for Starter plan
MRR = $1,788 / 12 = $149/month

Don't count the full $1,788 in month 1!
Spread it over 12 months for MRR calculation
```

### 2. Annual Recurring Revenue (ARR)

**Definition**: MRR annualized

**Formula**:
```
ARR = MRR × 12

CoodLoom:
MRR: $35,830
ARR: $429,960 (~$430K ARR)
```

**Why It Matters**:
- Easier to think in annual terms
- Standard for fundraising conversations
- Valuation basis (exit at 8× ARR = $3.4M)

**Milestones**:
```
$100K ARR:   Validation (you have something)
$1M ARR:     Product-market fit
$5M ARR:     Series A territory
$10M ARR:    Strong growth stage
$50M ARR:    Potential IPO/exit candidate
$100M ARR:   Clear success
```

### 3. MRR Growth Rate

**Definition**: How fast your recurring revenue is growing

**Formula**:
```
MRR Growth Rate = (Current Month MRR - Last Month MRR) / Last Month MRR × 100%

CoodLoom:
Last month MRR: $30,000
This month MRR: $35,830
Growth: ($35,830 - $30,000) / $30,000 = 19.4%
```

**Benchmarks**:
```
Seed stage:     15-25% monthly growth
Series A:       10-20% monthly growth
Series B:       5-15% monthly growth
Later stage:    3-7% monthly growth

Annual growth:
Early:          100-300%
Growth:         50-100%
Scale:          30-50%
Mature:         15-30%
```

**CoodLoom at 19.4% monthly**: Excellent for early stage!

### 4. MRR Movement Analysis

**Components of MRR Change**:
```
Starting MRR:            $30,000

New MRR:                 +$7,500  (50 new customers × $150 avg)
Expansion MRR:           +$450    (3 upgrades Starter→Pro)
Contraction MRR:         -$150    (1 downgrade Pro→Starter)
Churned MRR:             -$1,970  (13 customers cancelled)

Ending MRR:              $35,830
Net New MRR:             $5,830 (19.4% growth)
```

**Quick Ratio**:
```
Quick Ratio = (New MRR + Expansion MRR) / (Contraction MRR + Churned MRR)

CoodLoom:
Quick Ratio = ($7,500 + $450) / ($150 + $1,970) = 3.75

Benchmarks:
< 1:    🔴 Losing ground
1-2:    🟡 Slow growth
2-4:    🟢 Healthy
4+:     🟢🟢 Excellent

CoodLoom at 3.75: Healthy growth!
```

## Customer Metrics

### 5. Customer Count

**Track Multiple Ways**:
```
Total Customers: 170
Active Customers: 165 (paying, not past due)
Trialing Customers: 12
Paused/Overdue: 5
```

**Growth Metrics**:
```
New Customers: 50
Churned Customers: 13
Reactivated Customers: 2
Net New Customers: 39
```

### 6. Customer Churn Rate

**Formula**:
```
Monthly Customer Churn = Customers Lost / Customers at Start × 100%

CoodLoom:
Start: 131
Lost: 13
Churn: 13 / 131 = 9.9%... wait, that's high!

Actually, if we ended with 170:
Start: 131 + New: 50 - Churned: 11 = 170
Churn: 11 / 131 = 8.4% (still concerning)
```

**Better: Cohort-Based Churn**:
```
Track each monthly cohort:
Jan cohort: 30 customers → After 6 months: 24 remain (80% retained)
Feb cohort: 35 customers → After 5 months: 32 remain (91% retained)
Mar cohort: 40 customers → After 4 months: 39 remain (97.5% retained)

Insight: Churn improving! Recent cohorts much stickier.
```

### 7. Revenue Churn Rate

**Formula**:
```
MRR Churn Rate = Churned MRR / Starting MRR × 100%

CoodLoom:
Starting MRR: $30,000
Churned MRR: $1,970
MRR Churn: $1,970 / $30,000 = 6.57%
```

**Net Revenue Retention (NRR)**:
```
NRR = (Starting MRR + Expansion - Contraction - Churn) / Starting MRR × 100%

CoodLoom:
NRR = ($30,000 + $450 - $150 - $1,970) / $30,000 × 100% = 94.4%

Benchmarks:
< 90%:     🔴 Problematic
90-100%:   🟡 Needs improvement
100-110%:  🟢 Good
110-120%:  🟢🟢 Great
120%+:     💎 Best-in-class

Goal: >100% (expansion revenue > churn → "negative churn")
```

## Profitability Metrics

### 8. Gross Profit & Margin

**Formula**:
```
Gross Profit = Revenue - COGS
Gross Margin = Gross Profit / Revenue × 100%

CoodLoom Monthly:
Revenue: $50,000
COGS: $8,500 (infrastructure, payment processing, etc.)
Gross Profit: $41,500
Gross Margin: 83%
```

**Benchmarks**:
- Pure SaaS: 75-90%
- SaaS + Services: 60-75%
- SaaS + Hardware: 50-70%

**Why It Matters**:
- Shows unit-level profitability
- Higher = more to reinvest in growth
- Critical for valuation (high margins = valuable business)

### 9. Operating Margin

**Formula**:
```
Operating Income = Gross Profit - Operating Expenses
Operating Margin = Operating Income / Revenue × 100%

CoodLoom:
Gross Profit: $41,500
Operating Expenses: $25,000 (payroll, marketing, software, office)
Operating Income: $16,500
Operating Margin: $16,500 / $50,000 = 33%
```

**Stage-Based Benchmarks**:
```
Early stage (growth mode):  -50% to -20% (losing money to grow)
Product-market fit:         -20% to 0% (path to profitability)
Scaling:                    0% to 20% (profitable, still investing)
Mature:                     20%+ (efficient operations)
```

**CoodLoom at 33%**: Exceptional for early stage! (Because bootstrapped)

### 10. Net Margin

**Formula**:
```
Net Income = Revenue - All Expenses - Taxes
Net Margin = Net Income / Revenue × 100%

CoodLoom:
Revenue: $50,000
All Expenses: $33,500
Net Income: $16,500
Net Margin: 33%
```

**Public SaaS Companies**: 5-25% net margin
**CoodLoom**: 33% (amazing, but you're paying founders less than market)

### 11. EBITDA

**Definition**: Earnings Before Interest, Taxes, Depreciation, Amortization

**Why It Matters**:
- Standardized profitability measure
- Used in valuations (exits often at EBITDA multiple)
- Shows operating cash generation

**Formula**:
```
EBITDA = Net Income + Interest + Taxes + Depreciation + Amortization

CoodLoom:
Net Income: $16,500
+ Interest: $0
+ Taxes: $3,000
+ Depreciation: $500
+ Amortization: $0
EBITDA: $20,000

EBITDA Margin: $20,000 / $50,000 = 40%
```

## Cash & Efficiency Metrics

### 12. Cash Balance & Runway

**Cash Balance**: How much cash in the bank right now

**Burn Rate**: How much cash you lose per month (if unprofitable)

**Runway**: How long until you run out of money

**Formulas**:
```
Monthly Burn Rate = Revenue - Expenses (if negative)
Runway (months) = Cash Balance / Monthly Burn Rate

CoodLoom (if unprofitable):
Cash: $150,000
Monthly burn: $10,000 (expenses exceed revenue)
Runway: $150,000 / $10,000 = 15 months

CoodLoom (actually profitable):
Monthly profit: $16,500
Runway: Infinite! (Cash flow positive)
```

**Benchmarks**:
```
< 3 months:   🔴 Emergency! Raise or cut costs NOW
3-6 months:   🟡 Start fundraising or reduce burn
6-12 months:  🟢 Comfortable
12-18 months: 🟢🟢 Healthy
18+ months:   💎 Strong position

CoodLoom: Infinite (best possible!)
```

### 13. Revenue per Employee

**Formula**:
```
Revenue per Employee = Annual Revenue / Number of Employees

CoodLoom:
Annual Revenue: $600,000
Employees: 2 (founders)
Revenue per Employee: $300,000
```

**Benchmarks**:
```
Average company:        $100K-$200K
Good SaaS:             $200K-$400K
Great SaaS:            $400K-$600K
Best-in-class SaaS:    $600K+

CoodLoom: $300K (great for early stage!)
```

**Why It Matters**:
- Efficiency indicator
- Scalability measure
- High = automated, low-touch business model

## Growth Efficiency Metrics

### 14. CAC (Customer Acquisition Cost)

**Formula**: (Covered in Chapter 6, repeated for completeness)
```
CAC = Sales & Marketing Spend / New Customers

CoodLoom:
S&M Spend: $10,000
New Customers: 50
CAC: $200
```

### 15. Payback Period

**Formula**:
```
CAC Payback = CAC / (ARPC × Gross Margin %)

CoodLoom:
CAC: $200
ARPC: $200
Gross Margin: 83%
Monthly Gross Profit per Customer: $200 × 0.83 = $166
Payback: $200 / $166 = 1.2 months
```

### 16. Magic Number

**Formula**:
```
Magic Number = (Net New ARR × 4) / S&M Spend (previous quarter)

Or monthly:
Magic Number = (Net New MRR / S&M Spend) × 4

CoodLoom:
Net New MRR: $5,830
S&M Spend: $10,000
Magic Number: ($5,830 / $10,000) × 4 = 2.33
```

**Interpretation**:
- < 0.75: Don't scale yet
- 0.75-1.0: Okay to scale
- 1.0+: Scale aggressively
- 2.33: CoodLoom is killing it! 💎

## Valuation & Investment Metrics

### 17. ARR Multiple

**Definition**: How companies are typically valued

**Formula**:
```
Valuation = ARR × Multiple

CoodLoom:
ARR: $430K
Typical SaaS multiple: 5-10×
Low-end valuation: $430K × 5 = $2.15M
High-end valuation: $430K × 10 = $4.3M
```

**What Drives Multiple**:
```
Higher multiples (8-15×):
✅ High growth rate (>100% YoY)
✅ Low churn (<3% monthly)
✅ Strong margins (>75%)
✅ Large market opportunity
✅ Efficient unit economics
✅ Founder pedigree

Lower multiples (3-6×):
❌ Slow growth (<30% YoY)
❌ High churn (>5% monthly)
❌ Low margins (<60%)
❌ Small market
❌ Unprofitable unit economics
```

### 18. Rule of 40

**Formula**:
```
Rule of 40 = Revenue Growth Rate + Profit Margin

CoodLoom:
Revenue Growth Rate: 150% (YoY)
Operating Margin: 33%
Rule of 40 Score: 183 💎💎💎
```

**Interpretation**:
- < 0: Very concerning
- 0-20: Needs work
- 20-40: Okay
- 40+: Good (meets the "rule")
- 100+: Exceptional

### 19. Burn Multiple

**Formula**:
```
Burn Multiple = Net Burn / Net New ARR

CoodLoom:
Net Burn: $0 (profitable!)
Net New ARR: $70K/month × 12 = $840K annualized
Burn Multiple: 0 💎
```

**Benchmarks**:
- < 1: Excellent
- 1-1.5: Good
- 1.5-2: Acceptable
- 2-3: Concerning
- 3+: Very capital inefficient

## SaaS-Specific Metrics

### 20. Expansion Revenue

**Definition**: Additional revenue from existing customers

**Types**:
```
Upsells: Starter → Pro ($149 → $299)
Cross-sells: Add location (+$99/month)
Usage expansion: More transactions (if usage-based)
```

**Formula**:
```
Expansion Rate = Expansion MRR / Starting MRR × 100%

CoodLoom:
Starting MRR: $30,000
Expansion MRR: $450
Expansion Rate: 1.5% monthly
```

**Target**: 2-5% monthly expansion rate

### 21. Logo Retention vs Dollar Retention

**Logo Retention**: % of customers who stay

**Dollar Retention**: % of revenue retained

**Example**:
```
Started month with: 100 customers, $20K MRR
Lost: 10 small customers ($900 MRR)
Expanded: 15 customers upgraded ($1,200 additional MRR)
Ended month with: 90 customers, $20.3K MRR

Logo Retention: 90/100 = 90%
Dollar Retention: $20.3K/$20K = 101.5% (Net Revenue Retention)
```

**Why Both Matter**:
- Logo retention: Customer satisfaction indicator
- Dollar retention: Business health indicator
- Ideal: High logo retention AND >100% dollar retention

### 22. Booking vs Revenue

**Bookings**: Contract value (what customer committed to)

**Revenue**: Recognized over time (accounting rules)

**Example**:
```
Customer signs annual contract: $2,400 (booking)
→ January revenue recognized: $200 (1/12 of booking)
→ February revenue recognized: $200
...

Bookings: $2,400 (January)
Revenue: $200/month (recognized monthly)
```

**Why It Matters**:
- Bookings show sales performance
- Revenue shows accounting reality
- Gap matters for cash vs accrual accounting

## Building Your Metrics Dashboard

### CoodLoom Founder Dashboard

```
┌──────────────────────────────────────────────────────────────────┐
│ COODLOOM METRICS DASHBOARD - Month 12, Year 1                   │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│ 📈 GROWTH METRICS                                                 │
│ ───────────────────────────────────────────────────────          │
│ MRR:                    $35,830      ↑ 19.4% MoM    🟢          │
│ ARR:                    $429,960                                 │
│ Net New MRR:            $5,830                                   │
│ QoQ Growth:             67%                         🟢🟢        │
│ YoY Growth:             N/A (first year)                         │
│                                                                   │
│ 👥 CUSTOMER METRICS                                               │
│ ───────────────────────────────────────────────────────          │
│ Total Customers:        170          ↑ 39 net new               │
│ New Customers:          50           (this month)                │
│ Churned Customers:      11           6.5% churn     🟡          │
│ ARPC:                   $211                                     │
│ Active Trials:          12                                       │
│                                                                   │
│ 💰 REVENUE METRICS                                                │
│ ───────────────────────────────────────────────────────          │
│ Total Revenue:          $50,000      (MRR + one-time)           │
│ MRR:                    $35,830      (72%)                       │
│ Setup Fees:             $7,500       (15%)                       │
│ Hardware:               $6,670       (13%)                       │
│                                                                   │
│ 📊 PROFITABILITY                                                  │
│ ───────────────────────────────────────────────────────          │
│ Gross Profit:           $41,500                                  │
│ Gross Margin:           83%                         🟢          │
│ Operating Income:       $16,500                                  │
│ Operating Margin:       33%                         🟢🟢        │
│ Net Income:             $13,500                                  │
│ Net Margin:             27%                         🟢🟢        │
│ EBITDA:                 $17,000                                  │
│ EBITDA Margin:          34%                                      │
│                                                                   │
│ 💵 CASH & EFFICIENCY                                              │
│ ───────────────────────────────────────────────────────          │
│ Cash Balance:           $166,300     ↑ $16,500 MoM             │
│ Burn Rate:              $0 (profitable)              💎          │
│ Runway:                 Infinite                     💎          │
│ Revenue per Employee:   $300,000/yr                 🟢          │
│                                                                   │
│ 🎯 UNIT ECONOMICS                                                 │
│ ───────────────────────────────────────────────────────          │
│ CAC:                    $200                                     │
│ LTV:                    $5,100                                   │
│ LTV/CAC:                25.5:1                      💎💎        │
│ CAC Payback:            1.2 months                  💎          │
│ Magic Number:           2.33                        💎          │
│                                                                   │
│ 🏆 HEALTH SCORES                                                  │
│ ───────────────────────────────────────────────────────          │
│ Quick Ratio:            3.75                        🟢          │
│ NRR:                    94.4%                       🟡          │
│ Rule of 40:             183                         💎💎💎      │
│ Burn Multiple:          0.0                         💎          │
│                                                                   │
│ 🎬 NEXT ACTIONS                                                   │
│ ───────────────────────────────────────────────────────          │
│ 1. Reduce churn from 6.5% to <5% (onboarding improvements)      │
│ 2. Increase expansion revenue (upsell Starter → Pro)            │
│ 3. Scale marketing (Magic Number 2.33 = room to invest)         │
│ 4. Hire customer success rep (support scaling customers)        │
│ 5. Reach $500K ARR milestone (3 months away!)                   │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### Monthly Board Deck Metrics

**Slide 1: Key Metrics Summary**
```
MRR:        $35,830  (↑19.4%)
ARR:        $430K
Customers:  170      (↑39 net)
Churn:      6.5%     (↓ from 8.2%)
Cash:       $166K    (18.5 months runway at $9K burn)
```

**Slide 2: Financial Performance**
```
Revenue:           $50,000
Gross Profit:      $41,500 (83% margin)
Operating Income:  $16,500 (33% margin)
Net Income:        $13,500 (27% margin)
```

**Slide 3: Unit Economics**
```
CAC:          $200
LTV:          $5,100
LTV/CAC:      25.5:1
Payback:      1.2 months
Magic Number: 2.33
```

**Slide 4: Growth & Efficiency**
```
MRR Growth:     19.4% MoM
Quick Ratio:    3.75
NRR:            94.4%
Rule of 40:     183
```

## Tracking Tools

### Software Options

**1. Spreadsheet (DIY)**
```
Cost: Free
Pros: Full control, customizable
Cons: Manual, time-consuming, error-prone
Best for: Very early stage, learning
```

**2. ChartMogul** ($100-400/mo)
```
Connects to Stripe/payment processor
Auto-calculates SaaS metrics
Beautiful charts and dashboards
Best for: $10K+ MRR companies
```

**3. Baremetrics** ($50-250/mo)
```
Similar to ChartMogul
Real-time metrics
Forecasting tools
Best for: Stripe-based SaaS
```

**4. ProfitWell** (Free core features)
```
Free metrics dashboard
Paid retention/pricing tools
Connects to Stripe
Best for: Early stage (it's free!)
```

**5. Google Data Studio** (Free)
```
Connect to Google Sheets
Build custom dashboards
Share with team/investors
Best for: Custom reporting needs
```

**CoodLoom Recommendation**:
- Month 1-6: Spreadsheet (learn the metrics)
- Month 7+: ProfitWell (free and automated)
- $500K+ ARR: ChartMogul/Baremetrics (advanced features)

## Reporting Cadence

### Daily
- Check cash balance
- Review new signups
- Monitor churn alerts

### Weekly (Monday morning)
- MRR update
- Customer count
- Active trials
- Top of funnel metrics

### Monthly (within 5 days of month-end)
- Full financial close
- All metrics updated
- Variance analysis (actual vs budget)
- Investor update email
- Team all-hands presentation

### Quarterly (Strategic review)
- Deep dive into all metrics
- Cohort analysis
- Channel performance
- Competitive analysis
- OKR review and planning

## Exercises

### Exercise 1: Build Your Metrics Dashboard
Create a spreadsheet with:
1. All core metrics from this chapter
2. Formulas to auto-calculate
3. Charts showing trends
4. Update monthly with actuals

### Exercise 2: Metric Definitions Document
Write definitions for each metric including:
- Formula
- Why it matters
- Your target
- How you'll improve it

### Exercise 3: Monthly Reporting Template
Create a standard template for:
- Investor updates
- Board meetings
- Team all-hands
Include: Key metrics, highlights, challenges, next month goals

### Exercise 4: Benchmark Research
For each key metric, research:
- Industry benchmarks
- Competitor performance (if public)
- Where you stand
- Gap analysis

### Exercise 5: Metrics Improvement Plan
For your 3 weakest metrics:
1. Identify root cause
2. Brainstorm solutions
3. Create action plan
4. Set timeline and owner
5. Track progress monthly

## Key Takeaways

✓ **Track metrics religiously** - What gets measured gets improved  
✓ **Focus on the right metrics** - Don't track vanity metrics  
✓ **MRR is king** - Core metric for SaaS businesses  
✓ **Unit economics drive everything** - CAC, LTV, payback  
✓ **Churn is critical** - Small improvements have huge impact  
✓ **Efficiency matters** - Magic Number, Quick Ratio, Burn Multiple  
✓ **Communicate consistently** - Monthly updates minimum  
✓ **Automate where possible** - Use tools to save time  
✓ **Benchmark yourself** - Know where you stand vs peers  
✓ **Improve continuously** - Set targets, track progress, iterate  

## Next Steps

Move to Chapter 8: **Budget Management** to learn how to allocate resources effectively and stay on track financially.

---

**Pro Tip**: Build your metrics dashboard once, then update it religiously. The discipline of monthly metrics review will teach you more about your business than any book or course.
