# SaaS Metrics Cheatsheet

## Quick Reference Guide for CoodLoom

This cheatsheet provides formulas, benchmarks, and best practices for the most important SaaS metrics. Keep this handy for tracking CoodLoom's performance.

---

## Revenue Metrics

### Monthly Recurring Revenue (MRR)
**What it is**: Predictable revenue generated each month from subscriptions

**Formula**:
```
MRR = Number of Customers × Average Revenue Per User (ARPU)
```

**Example**:
- 50 customers × $100/month = $5,000 MRR

**Components**:
- **New MRR**: From new customers
- **Expansion MRR**: From upgrades/upsells
- **Churned MRR**: From cancellations
- **Contraction MRR**: From downgrades

**Net New MRR**:
```
Net New MRR = New MRR + Expansion MRR - Churned MRR - Contraction MRR
```

**Benchmarks**:
- Early Stage: $0-$100K MRR
- Growth Stage: $100K-$1M MRR
- Scale Stage: $1M+ MRR

**Growth Targets**:
- Excellent: 15-20% MoM (Month-over-Month)
- Good: 10-15% MoM
- Acceptable: 5-10% MoM

---

### Annual Recurring Revenue (ARR)
**What it is**: Annualized value of recurring revenue

**Formula**:
```
ARR = MRR × 12
```

**Example**:
- $5,000 MRR × 12 = $60,000 ARR

**When to Use**: Generally used once you hit $1M+ ARR

**Milestone Targets**:
- $1M ARR: Product-market fit
- $10M ARR: Scalable business
- $100M ARR: Major player

---

### Average Revenue Per User (ARPU)
**What it is**: Average monthly revenue per customer

**Formula**:
```
ARPU = Total MRR / Number of Customers
```

**Example**:
- $5,000 MRR / 50 customers = $100 ARPU

**Tracking**:
- Track by customer segment
- Track by pricing tier
- Track trends over time

**Improving ARPU**:
- Upsells to higher tiers
- Add-on features
- Annual billing discounts (increases upfront cash)
- Usage-based pricing

---

## Customer Metrics

### Customer Acquisition Cost (CAC)
**What it is**: Total cost to acquire one new customer

**Formula**:
```
CAC = (Sales Costs + Marketing Costs) / Number of New Customers
```

**Detailed**:
```
CAC = (Salaries + Advertising + Tools + Events + Overhead) / New Customers
```

**Example**:
- $10,000 in sales/marketing expenses
- 20 new customers
- CAC = $10,000 / 20 = $500

**Time Period**: Calculate monthly or quarterly

**What to Include**:
- ✓ Sales team salaries
- ✓ Marketing team salaries
- ✓ Advertising spend
- ✓ Marketing tools/software
- ✓ Events and conferences
- ✓ Agency/contractor fees
- ✗ Don't include product development
- ✗ Don't include customer success

**Benchmarks by ARPU**:
- ARPU $10-100: CAC should be <$100
- ARPU $100-500: CAC should be <$500
- ARPU $500+: CAC can be $1,000+

**Target**: CAC should be recovered in 12 months or less

---

### Customer Lifetime Value (LTV or CLTV)
**What it is**: Total revenue expected from a customer over their lifetime

**Simple Formula**:
```
LTV = ARPU × Average Customer Lifetime (months) × Gross Margin %
```

**Example**:
- $100 ARPU
- 36 month average lifetime
- 80% gross margin
- LTV = $100 × 36 × 0.80 = $2,880

**Alternative Formula** (using churn):
```
LTV = (ARPU × Gross Margin %) / Monthly Churn Rate
```

**Example**:
- $100 ARPU
- 80% gross margin
- 3% monthly churn
- LTV = ($100 × 0.80) / 0.03 = $2,667

**What is Gross Margin?**:
```
Gross Margin = (Revenue - Cost of Goods Sold) / Revenue
```

**Typical SaaS COGS**:
- Hosting/infrastructure
- Support costs
- Payment processing fees
- Third-party API costs

**SaaS Gross Margin Benchmark**: 70-90%

---

### LTV:CAC Ratio
**What it is**: Relationship between customer value and acquisition cost

**Formula**:
```
LTV:CAC Ratio = LTV / CAC
```

**Example**:
- LTV = $2,880
- CAC = $500
- Ratio = $2,880 / $500 = 5.76:1

**Benchmarks**:
- **> 3:1** = Healthy, scalable business
- **2:1 to 3:1** = Acceptable, room for improvement
- **< 2:1** = Losing money on each customer
- **> 5:1** = Underinvesting in growth (could spend more on marketing)

**Ideal Range**: 3:1 to 5:1

**If Ratio is Low**:
- Increase prices (increase LTV)
- Reduce churn (increase LTV)
- Improve sales efficiency (reduce CAC)
- Target better customers (higher LTV)
- Optimize marketing (reduce CAC)

---

### CAC Payback Period
**What it is**: Months to recover customer acquisition cost

**Formula**:
```
CAC Payback = CAC / (ARPU × Gross Margin %)
```

**Example**:
- CAC = $500
- ARPU = $100
- Gross Margin = 80%
- Payback = $500 / ($100 × 0.80) = 6.25 months

**Benchmarks**:
- **< 6 months** = Excellent
- **6-12 months** = Good
- **12-18 months** = Acceptable
- **> 18 months** = Concerning

**Why It Matters**: Faster payback = less cash needed to grow

---

## Churn & Retention Metrics

### Monthly Churn Rate
**What it is**: Percentage of customers who cancel each month

**Customer Churn Formula**:
```
Customer Churn Rate = (Customers Lost / Customers at Start) × 100%
```

**Example**:
- Start month with 100 customers
- Lose 3 customers
- Churn = (3 / 100) × 100% = 3%

**Revenue Churn Formula**:
```
Revenue Churn Rate = (MRR Lost / MRR at Start) × 100%
```

**Annual Churn** (approximate):
```
Annual Churn ≈ Monthly Churn × 12
```
(Note: Not perfectly accurate due to compounding)

**Benchmarks**:
- **< 2% monthly** (< 24% annually) = Excellent
- **2-5% monthly** = Good
- **5-7% monthly** = Needs improvement
- **> 7% monthly** = Critical issue

**By Customer Type**:
- Enterprise: 0.5-1% monthly
- SMB: 3-7% monthly
- Consumer: 5-10% monthly

**CoodLoom Target**: < 5% monthly (SMB SaaS)

---

### Net Revenue Retention (NRR)
**What it is**: Revenue retention including expansions and downgrades

**Formula**:
```
NRR = ((Starting MRR + Expansion - Churned - Contraction) / Starting MRR) × 100%
```

**Example**:
- Starting MRR: $10,000
- Expansion MRR: $1,500 (upgrades)
- Churned MRR: $800 (cancellations)
- Contraction MRR: $200 (downgrades)
- NRR = (($10,000 + $1,500 - $800 - $200) / $10,000) × 100% = 105%

**Benchmarks**:
- **> 110%** = Best-in-class (growing without new customers!)
- **100-110%** = Good
- **90-100%** = Acceptable
- **< 90%** = Needs work

**Why 100%+ is Possible**:
- Existing customers upgrade and spend more
- Expansion revenue > churned revenue
- Called "negative churn"

**How to Achieve**:
- Tiered pricing for upgrades
- Usage-based pricing
- Add-on features
- Multi-location expansion
- Excellent customer success

---

## Growth Metrics

### MRR Growth Rate
**What it is**: Month-over-month revenue growth

**Formula**:
```
MRR Growth Rate = ((This Month MRR - Last Month MRR) / Last Month MRR) × 100%
```

**Example**:
- Last month: $10,000 MRR
- This month: $11,500 MRR
- Growth = (($11,500 - $10,000) / $10,000) × 100% = 15%

**Benchmarks by Stage**:
- **Early Stage** (< $100K MRR): 15-20% MoM
- **Growth Stage** ($100K-$1M MRR): 10-15% MoM
- **Scale Stage** (> $1M MRR): 5-10% MoM

**Rule of Thumb**: Growth rate decreases as you get larger (in % terms)

---

### Quick Ratio
**What it is**: Efficiency of growth vs churn

**Formula**:
```
Quick Ratio = (New MRR + Expansion MRR) / (Churned MRR + Contraction MRR)
```

**Example**:
- New MRR: $5,000
- Expansion MRR: $1,000
- Churned MRR: $2,000
- Contraction MRR: $500
- Quick Ratio = ($5,000 + $1,000) / ($2,000 + $500) = 2.4

**Benchmarks**:
- **> 4** = Exceptional
- **2-4** = Good, healthy growth
- **1-2** = Slow growth
- **< 1** = Shrinking (more churn than new/expansion)

**Target**: > 2 (growing faster than churning)

---

### Rule of 40
**What it is**: Measure of SaaS company health

**Formula**:
```
Rule of 40 = Revenue Growth Rate + Profit Margin
```

**Example 1** (High Growth):
- Growth Rate: 50%
- Profit Margin: -10%
- Rule of 40 = 50% + (-10%) = 40% ✓

**Example 2** (Profitable):
- Growth Rate: 20%
- Profit Margin: 25%
- Rule of 40 = 20% + 25% = 45% ✓

**Benchmark**:
- **≥ 40%** = Healthy SaaS company
- **< 40%** = Trade-offs needed (grow faster or become more profitable)

**When to Track**: Generally after $5M+ ARR

---

## Sales & Marketing Metrics

### Lead Velocity Rate (LVR)
**What it is**: Growth rate of qualified leads

**Formula**:
```
LVR = ((This Month Qualified Leads - Last Month Qualified Leads) / Last Month Qualified Leads) × 100%
```

**Why Important**: Leading indicator of future revenue growth

**Target**: 10-20% monthly growth

---

### Lead-to-Customer Conversion Rate
**What it is**: Percentage of leads that become customers

**Formula**:
```
Conversion Rate = (New Customers / Total Leads) × 100%
```

**Example**:
- 100 leads
- 10 new customers
- Conversion = (10 / 100) × 100% = 10%

**Benchmarks** (varies widely by industry):
- **10-20%** = Good for B2B SaaS
- **1-5%** = Typical for lower-price B2C

**Track by Source**:
- Referral: Usually highest (20-50%)
- Inbound: Good (10-20%)
- Outbound: Lower (1-5%)
- Paid ads: Varies widely (1-10%)

---

### Sales Cycle Length
**What it is**: Average time from first contact to closed deal

**Formula**:
```
Average Sales Cycle = Total Days to Close All Deals / Number of Deals
```

**Benchmarks**:
- **Self-Service**: Minutes to days
- **Low-Touch Sales**: 1-4 weeks
- **High-Touch Sales**: 1-3 months
- **Enterprise**: 3-12+ months

**CoodLoom Target** (SMB): 1-2 weeks

**Improving**:
- Clearer positioning
- Better qualification (talk to right people)
- Streamlined process
- Address objections proactively

---

## Product & Engagement Metrics

### Daily Active Users (DAU) / Monthly Active Users (MAU)
**What it is**: Number of users actively using your product

**DAU/MAU Ratio**:
```
Stickiness = (DAU / MAU) × 100%
```

**Benchmarks**:
- **> 20%** = Very sticky product
- **10-20%** = Good engagement
- **< 10%** = Low engagement

**For POS Systems**: Should be very high (daily use expected)

---

### Feature Adoption Rate
**What it is**: Percentage of users using specific features

**Formula**:
```
Adoption Rate = (Users Using Feature / Total Active Users) × 100%
```

**Track**:
- Core features (should be ~100%)
- New features (target 30%+ in 90 days)
- Advanced features (varies)

**Why It Matters**: 
- Low adoption may mean poor UX or unnecessary feature
- High adoption indicates value

---

### Net Promoter Score (NPS)
**What it is**: Customer satisfaction and loyalty metric

**Question**: "On a scale of 0-10, how likely are you to recommend CoodLoom to a colleague?"

**Calculation**:
```
NPS = % Promoters (9-10) - % Detractors (0-6)
```

**Example**:
- 60% Promoters
- 10% Detractors
- NPS = 60 - 10 = 50

**Benchmarks**:
- **> 50** = Excellent
- **30-50** = Good
- **0-30** = Needs improvement
- **< 0** = Critical issues

**SaaS Average**: ~30-40

**Frequency**: Survey quarterly or bi-annually

---

## Financial Metrics

### Burn Rate
**What it is**: Cash spent per month

**Formula**:
```
Monthly Burn Rate = Monthly Revenue - Monthly Expenses
```

**Example**:
- Revenue: $5,000/month
- Expenses: $15,000/month
- Burn Rate = $5,000 - $15,000 = -$10,000/month (burning $10K)

**Gross Burn**: Total expenses (ignore revenue)
**Net Burn**: Expenses minus revenue

---

### Runway
**What it is**: Months until you run out of cash

**Formula**:
```
Runway = Available Cash / Monthly Burn Rate
```

**Example**:
- Cash: $100,000
- Monthly Burn: $10,000
- Runway = $100,000 / $10,000 = 10 months

**Rule**: Always know your runway

**Safe Zone**: 12-18+ months runway

**Danger Zone**: < 6 months runway (start fundraising NOW)

---

### Break-Even Point
**What it is**: Revenue needed to cover all expenses

**Formula**:
```
Break-Even Revenue = Total Fixed Costs / Gross Margin %
```

**Example**:
- Fixed Costs: $20,000/month
- Gross Margin: 80%
- Break-Even = $20,000 / 0.80 = $25,000 MRR

**In Customers**:
```
Break-Even Customers = Break-Even Revenue / ARPU
```

**Example**:
- Break-Even Revenue: $25,000
- ARPU: $100
- Need 250 customers to break even

---

## CoodLoom Tracking Dashboard

### Weekly Scorecard Template

**Date**: ____________

**Revenue Metrics**:
- MRR: $______
- Net New MRR: $______
- ARR: $______
- ARPU: $______

**Customer Metrics**:
- Total Customers: ______
- New Customers: ______
- Churned Customers: ______
- Net New Customers: ______

**Growth Metrics**:
- MRR Growth Rate: ______%
- Customer Growth Rate: ______%
- Monthly Churn Rate: ______%

**Financial Metrics**:
- Cash Balance: $______
- Monthly Burn: $______
- Runway: ______ months

**Sales Metrics**:
- Qualified Leads: ______
- Demos Conducted: ______
- Conversion Rate: ______%
- Sales Cycle: ______ days

**Product Metrics**:
- Active Users: ______
- DAU/MAU: ______%
- Support Tickets: ______
- NPS: ______

---

## Metric Priorities by Stage

### Stage 1: Pre-Revenue (Months 0-3)
**Focus On**:
- Customer conversations (quantity & quality)
- Product usage (even if free)
- Feedback scores
- Time to value (how fast to first success)

**Don't Worry About**:
- LTV (too early)
- CAC (not spending much yet)
- Complex metrics

---

### Stage 2: First Customers (Months 3-12)
**Focus On**:
- MRR and growth rate
- Customer acquisition
- Basic churn rate
- Customer satisfaction

**Start Tracking**:
- CAC (roughly)
- ARPU
- Gross margins

---

### Stage 3: Growth (Year 2+)
**Focus On**:
- All revenue metrics
- LTV:CAC ratio
- CAC payback period
- Net revenue retention
- Rule of 40

**Optimize**:
- Sales efficiency
- Marketing ROI
- Operational leverage

---

## Red Flags to Watch

🚩 **High Churn** (> 7% monthly)
- Product doesn't deliver value
- Wrong target customer
- Poor onboarding
- Competitive alternatives better

🚩 **LTV:CAC < 2:1**
- Spending too much to acquire
- Not retaining long enough
- Need to increase prices or reduce CAC

🚩 **Long CAC Payback** (> 18 months)
- Need significant cash to grow
- Sales process inefficient
- Pricing too low

🚩 **Declining Growth Rate**
- Market saturating
- Product-market fit issues
- Competitive pressure
- Need new channels

🚩 **Runway < 6 Months**
- Immediate danger zone
- Start fundraising or cut costs
- Get to profitability ASAP

---

## Action Items

### Set Up Tracking
- [ ] Create Google Sheet or use tool
- [ ] Enter baseline numbers
- [ ] Set weekly review time
- [ ] Share with co-founder

### Calculate Your Metrics
- [ ] Current MRR: $______
- [ ] Current ARPU: $______
- [ ] Current Churn: ______%
- [ ] Current CAC: $______
- [ ] Estimated LTV: $______
- [ ] LTV:CAC Ratio: ______

### Set Targets
- [ ] MRR Target (1 year): $______
- [ ] Customer Target (1 year): ______
- [ ] Churn Target: < ______%
- [ ] LTV:CAC Target: > 3:1

### Review Schedule
- [ ] Daily: Cash balance, new customers
- [ ] Weekly: All key metrics
- [ ] Monthly: Trends, deep dives
- [ ] Quarterly: Strategy review

---

## Tools for Tracking

**Free/Simple**:
- Google Sheets
- Excel
- Notion
- Airtable

**SaaS Metrics Tools**:
- ChartMogul ($100+/month)
- Baremetrics ($108+/month)
- ProfitWell (Free tier available)

**General Analytics**:
- Google Analytics (website)
- Mixpanel (product analytics)
- Amplitude (product analytics)

**Start Simple**: Spreadsheet is fine for first year

---

## Quick Reference

**Healthy SaaS Benchmarks**:
- ✓ MRR Growth: 10-20% monthly
- ✓ Churn: < 5% monthly
- ✓ LTV:CAC: > 3:1
- ✓ CAC Payback: < 12 months
- ✓ Gross Margin: > 70%
- ✓ NPS: > 30
- ✓ NRR: > 100%
- ✓ Rule of 40: ≥ 40%

**Remember**: Metrics guide decisions, but don't obsess over them at expense of building product and serving customers!

---

**Print this out and keep it handy. Review your metrics weekly. Let data guide your decisions for CoodLoom!**
