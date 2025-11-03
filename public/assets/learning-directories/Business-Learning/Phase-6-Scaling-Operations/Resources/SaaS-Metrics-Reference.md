# SaaS Metrics Reference Guide

## Quick Reference: Key Formulas

### Revenue Metrics

**Monthly Recurring Revenue (MRR)**
```
MRR = Sum of all monthly subscription values
```

**Annual Recurring Revenue (ARR)**
```
ARR = MRR × 12
```

**Net New MRR**
```
Net New MRR = New MRR + Expansion MRR - Contraction MRR - Churned MRR
```

**Average Revenue Per Account (ARPA)**
```
ARPA = MRR / Total Customers
```

### Customer Metrics

**Customer Acquisition Cost (CAC)**
```
CAC = (Sales + Marketing Costs) / New Customers Acquired
```

**Customer Lifetime Value (LTV)**
```
Simple: LTV = ARPA / Monthly Churn Rate
Accurate: LTV = (ARPA × Gross Margin %) / Monthly Churn Rate
```

**LTV:CAC Ratio**
```
LTV:CAC = LTV / CAC
Target: 3:1 or higher
```

**CAC Payback Period**
```
Payback Period = CAC / (ARPA × Gross Margin %)
Target: < 12 months
```

### Churn Metrics

**Monthly Customer Churn**
```
Customer Churn % = (Customers Lost / Customers at Start) × 100
```

**Monthly Revenue Churn**
```
Revenue Churn % = (MRR Lost / MRR at Start) × 100
```

**Net Revenue Retention (NRR)**
```
NRR = ((Starting MRR + Expansion - Contraction - Churn) / Starting MRR) × 100
Target: > 100%
```

**Annual Churn**
```
Annual Churn % = 1 - (1 - Monthly Churn %)^12
```

### Financial Metrics

**Gross Margin**
```
Gross Margin % = ((Revenue - COGS) / Revenue) × 100
Target: 70-90% for SaaS
```

**Burn Rate**
```
Monthly Burn = Monthly Expenses - Monthly Revenue
```

**Runway**
```
Runway (months) = Cash in Bank / Monthly Burn Rate
Target: 12-18 months
```

**Rule of 40**
```
Rule of 40 = Growth Rate % + Profit Margin %
Target: ≥ 40
```

### Conversion Metrics

**Visitor to Lead**
```
Conversion % = (Leads / Visitors) × 100
Target: 2-5%
```

**Lead to Customer**
```
Conversion % = (Customers / Leads) × 100
Target: 3-5%
```

**Trial to Paid**
```
Conversion % = (Paid Customers / Trial Signups) × 100
Target: 15-25%
```

## Benchmarks by Stage

### Early Stage ($0-$100k ARR)

| Metric | Target | Excellent |
|--------|--------|-----------|
| MRR Growth | 10-15% MoM | 20%+ MoM |
| Monthly Churn | < 7% | < 5% |
| Gross Margin | > 60% | > 75% |
| CAC Payback | < 18 months | < 12 months |

### Growth Stage ($100k-$1M ARR)

| Metric | Target | Excellent |
|--------|--------|-----------|
| ARR Growth | 100-200% YoY | 200%+ YoY |
| Monthly Churn | < 5% | < 3% |
| NRR | 100-110% | > 115% |
| LTV:CAC | 3:1 | 5:1+ |
| Gross Margin | > 70% | > 80% |
| CAC Payback | < 12 months | < 6 months |
| Rule of 40 | 40+ | 60+ |

### Scale Stage ($1M-$10M ARR)

| Metric | Target | Excellent |
|--------|--------|-----------|
| ARR Growth | 75-150% YoY | 150%+ YoY |
| Monthly Churn | < 3% | < 2% |
| NRR | 110-120% | 120%+ |
| LTV:CAC | 3:1 | 5:1+ |
| Gross Margin | > 75% | > 85% |
| CAC Payback | < 12 months | < 6 months |
| Rule of 40 | 50+ | 70+ |

## Benchmarks by Business Model

### PLG (Product-Led Growth)

| Metric | Benchmark |
|--------|-----------|
| Trial to Paid | 15-25% |
| CAC | $100-500 |
| Sales Cycle | Days to weeks |
| ARPA | $50-500/mo |

### Sales-Led (SMB/Mid-Market)

| Metric | Benchmark |
|--------|-----------|
| Lead to Demo | 20-40% |
| Demo to Close | 20-30% |
| CAC | $500-2,000 |
| Sales Cycle | 1-3 months |
| ARPA | $500-2,000/mo |

### Enterprise

| Metric | Benchmark |
|--------|-----------|
| Lead to Demo | 10-20% |
| Demo to Close | 15-25% |
| CAC | $5,000-50,000 |
| Sales Cycle | 3-12 months |
| ARPA | $5,000+/mo |

## Industry Benchmarks (B2B SaaS)

### Conversion Rates

| Stage | Conversion | Source |
|-------|------------|--------|
| Website Visitor → Lead | 2-5% | Industry avg |
| Lead → MQL | 20-30% | HubSpot |
| MQL → SQL | 30-50% | InsightSquared |
| SQL → Customer | 20-30% | SalesForce |
| Trial → Paid | 15-25% | Profitwell |

### Churn Benchmarks

| Segment | Annual Churn | Source |
|---------|--------------|--------|
| Consumer | 30-50% | Pacific Crest |
| SMB | 30-50% | KeyBanc |
| Mid-Market | 10-15% | SaaStr |
| Enterprise | 5-10% | Bessemer |

### CAC by Channel

| Channel | CAC | Notes |
|---------|-----|-------|
| Organic/SEO | $50-200 | Long-term investment |
| Content Marketing | $100-300 | Builds over time |
| Paid Search | $200-500 | Immediate but expensive |
| Paid Social | $150-400 | Audience dependent |
| Outbound Sales | $500-2,000 | High touch |
| Partnerships | $100-500 | Takes time to build |
| Referrals | $50-150 | Best CAC but needs scale |

## SaaS Quick Wins (Target Metrics)

**The Magic SaaS Numbers**:
- 💰 **3:1 LTV:CAC Ratio** - Unit economics work
- 📈 **< 5% Monthly Churn** - Customers love it
- ⚡ **< 12 Month Payback** - Can grow efficiently
- 🎯 **> 100% NRR** - Growing within accounts
- 💪 **> 40 Rule of 40** - Balanced growth + profitability
- 🚀 **> 10% MoM Growth** - Meaningful momentum

## Calculating Your Metrics

### Monthly Metrics Template

```
Month: __________

REVENUE
├─ Starting MRR: $______
├─ New MRR: $______
├─ Expansion MRR: $______
├─ Contraction MRR: $______
├─ Churned MRR: $______
└─ Ending MRR: $______

CUSTOMERS
├─ Starting Customers: ______
├─ New Customers: ______
├─ Churned Customers: ______
└─ Ending Customers: ______

CALCULATED
├─ Net New MRR: $______ (New + Exp - Con - Churn)
├─ MRR Growth %: ______% (Net New / Starting)
├─ ARPA: $______ (Ending MRR / Ending Customers)
├─ Customer Churn %: ______% (Lost / Starting)
└─ Revenue Churn %: ______% (MRR Lost / Starting MRR)

ACQUISITION
├─ Sales & Marketing Spend: $______
├─ New Customers: ______
├─ CAC: $______ (Spend / New Customers)
└─ CAC Payback: ______ months (CAC / (ARPA × 0.8))

LIFETIME VALUE
├─ ARPA: $______
├─ Monthly Churn %: ______%
├─ Gross Margin %: ______%
└─ LTV: $______ (ARPA × GM% / Churn%)

HEALTH METRICS
├─ LTV:CAC Ratio: ______ : 1
├─ Cash in Bank: $______
├─ Monthly Burn: $______
├─ Runway: ______ months
└─ Rule of 40: ______ (Growth% + Margin%)
```

## Common Calculation Mistakes

### ❌ Mistake 1: Counting Annual as Monthly
**Wrong**: $1,200 annual contract = $1,200 MRR
**Right**: $1,200 annual contract = $100 MRR

### ❌ Mistake 2: Ignoring Gross Margin in LTV
**Wrong**: LTV = $100 ARPA / 5% churn = $2,000
**Right**: LTV = ($100 ARPA × 80% margin) / 5% = $1,600

### ❌ Mistake 3: Not Time-Shifting CAC
**Wrong**: This month's CAC = This month's spend / this month's customers
**Right**: Use 1-2 month lag (spend from previous months)

### ❌ Mistake 4: Excluding All S&M Costs
**Include in CAC**:
- Salaries (sales & marketing)
- Commissions
- Advertising spend
- Marketing tools
- Agencies/contractors

### ❌ Mistake 5: Confusing Gross and Net Retention
**Gross Retention**: Can't exceed 100% (no expansion counted)
**Net Retention**: Can exceed 100% (includes expansion)

## Tools for Tracking

**Free Options**:
- Google Sheets (template included)
- Stripe dashboard (if using Stripe)
- Basic CRM reports

**Paid Options**:
- ChartMogul ($100+/mo)
- Baremetrics ($50+/mo)
- ProfitWell (Free + paid tiers)
- Stripe Sigma (SQL for Stripe data)

## When to Review Metrics

**Daily** (5 min):
- MRR
- New customers
- Churn alerts

**Weekly** (30 min):
- All growth metrics
- Pipeline
- Cash position

**Monthly** (2 hours):
- Deep dive all metrics
- Cohort analysis
- CAC trends
- Churn analysis

**Quarterly** (Half day):
- Strategic review
- Benchmark comparison
- Goal setting
- Forecast adjustment

## Metrics Dashboard Template

[See Metrics-Dashboard-Template.md]

## Resources

**Benchmark Reports**:
- Pacific Crest SaaS Survey
- KeyBanc SaaS Survey
- OpenView SaaS Benchmarks
- Battery Ventures Cloud Index

**Learning**:
- SaaStr blog and conference
- SaaS Capital blog
- Christoph Janz blog
- David Skok's blog

**Calculation Tools**:
- SaaS Calculator (forEntrepreneurs)
- CAC/LTV Calculators (various)
- Cohort analysis templates

---

**Remember**: Metrics are tools to drive decisions, not just pretty dashboards. Use them!
