# Financial Model Template

## Overview
This template provides a complete 3-year financial projection model for CoodLoom (or any SaaS business). It includes revenue forecasts, expense budgets, P&L statements, cash flow projections, and key metrics.

**Best used with**: Google Sheets or Microsoft Excel  
**Time to complete**: 4-8 hours (first time)  
**Update frequency**: Monthly with actuals, quarterly with forecasts

---

## Instructions

### Getting Started

1. **Make a copy** of this template for your business
2. **Fill in blue cells** (inputs) - these are your assumptions
3. **Review yellow cells** (calculations) - these auto-calculate
4. **Update monthly** with actual results vs projections
5. **Revise assumptions** quarterly based on learnings

### Color Coding
- 🔵 **Blue cells** = Your inputs (edit these)
- 🟡 **Yellow cells** = Formulas (auto-calculate, don't edit)
- 🟢 **Green cells** = Positive results
- 🔴 **Red cells** = Negative results or warnings

---

## Section 1: Company Information

### Basic Details
```
Company Name: [CoodLoom]
Business Model: [SaaS POS System for Restaurants]
Founded: [MM/YYYY]
Fiscal Year Start: [January 1, 2024]

Founders:
- Founder 1: [Name], Equity: [50%]
- Founder 2: [Name], Equity: [50%]

Starting Capital: [$50,000]
Starting Cash: [$50,000]
```

---

## Section 2: Revenue Model Assumptions

### 2.1 Product Pricing (Monthly)

| Tier | Price | Target % of Customers | Features |
|------|-------|----------------------|----------|
| Starter | $149 | 30% | Basic POS, 1 terminal |
| Pro | $299 | 60% | Advanced features, 3 terminals |
| Enterprise | Custom ($500+) | 10% | Unlimited, custom integration |

**Average Revenue Per Customer (ARPC)**: $235
*Calculation: ($149 × 0.30) + ($299 × 0.60) + ($500 × 0.10) = $235*

### 2.2 Additional Revenue Streams

| Revenue Type | Price | % of Customers | Frequency |
|--------------|-------|----------------|-----------|
| Setup Fee | $500 | 100% | One-time |
| Hardware Sales | $799 | 40% | One-time |
| Training | $250 | 20% | One-time |
| Premium Support | $99/mo | 15% | Monthly |

### 2.3 Customer Acquisition Assumptions

#### Year 1
| Month | New Customers | Cumulative | Growth Rate |
|-------|---------------|------------|-------------|
| 1 | 2 | 2 | - |
| 2 | 3 | 5 | 50% |
| 3 | 4 | 9 | 33% |
| 4 | 5 | 14 | 25% |
| 5 | 7 | 21 | 40% |
| 6 | 9 | 30 | 29% |
| 7 | 11 | 41 | 22% |
| 8 | 14 | 55 | 27% |
| 9 | 17 | 72 | 21% |
| 10 | 21 | 93 | 24% |
| 11 | 26 | 119 | 24% |
| 12 | 32 | 151 | 23% |

**Average Monthly Growth**: ~25% (typical for early-stage SaaS)

#### Year 2
- Start: 151 customers
- Monthly growth: 15% (more sustainable)
- End: 542 customers

#### Year 3
- Start: 542 customers
- Monthly growth: 10% (maturing growth)
- End: 1,392 customers

### 2.4 Churn Assumptions

| Phase | Monthly Churn | Annual Churn | Notes |
|-------|---------------|--------------|-------|
| Year 1 | 4% | 39% | High early churn, finding fit |
| Year 2 | 3% | 31% | Improving product, better customers |
| Year 3 | 2% | 22% | Product-market fit achieved |

**Formula**: Net New Customers = New Customers - (Beginning Customers × Churn Rate)

---

## Section 3: Revenue Projections

### 3.1 Year 1 Monthly Recurring Revenue (MRR)

| Month | Starting Customers | New Customers | Churned | Ending Customers | MRR | MoM Growth |
|-------|-------------------|---------------|---------|------------------|-----|------------|
| 1 | 0 | 2 | 0 | 2 | $470 | - |
| 2 | 2 | 3 | 0 | 5 | $1,175 | 150% |
| 3 | 5 | 4 | 0 | 9 | $2,115 | 80% |
| 4 | 9 | 5 | 0 | 14 | $3,290 | 56% |
| 5 | 14 | 7 | 1 | 20 | $4,700 | 43% |
| 6 | 20 | 9 | 1 | 28 | $6,580 | 40% |
| 7 | 28 | 11 | 1 | 38 | $8,930 | 36% |
| 8 | 38 | 14 | 2 | 50 | $11,750 | 32% |
| 9 | 50 | 17 | 2 | 65 | $15,275 | 30% |
| 10 | 65 | 21 | 3 | 83 | $19,505 | 28% |
| 11 | 83 | 26 | 3 | 106 | $24,910 | 28% |
| 12 | 106 | 32 | 4 | 134 | $31,490 | 26% |

**Year 1 Ending ARR**: $377,880 (MRR $31,490 × 12)

### 3.2 Year 1 One-Time Revenue

| Month | New Customers | Setup Fees | Hardware Sales | Training | Total One-Time |
|-------|---------------|------------|----------------|----------|----------------|
| 1 | 2 | $1,000 | $639 | $100 | $1,739 |
| 2 | 3 | $1,500 | $959 | $150 | $2,609 |
| 3 | 4 | $2,000 | $1,278 | $200 | $3,478 |
| 4 | 5 | $2,500 | $1,598 | $250 | $4,348 |
| 5 | 7 | $3,500 | $2,237 | $350 | $6,087 |
| 6 | 9 | $4,500 | $2,876 | $450 | $7,826 |
| 7 | 11 | $5,500 | $3,516 | $550 | $9,566 |
| 8 | 14 | $7,000 | $4,474 | $700 | $12,174 |
| 9 | 17 | $8,500 | $5,432 | $850 | $14,782 |
| 10 | 21 | $10,500 | $6,710 | $1,050 | $18,260 |
| 11 | 26 | $13,000 | $8,307 | $1,300 | $22,607 |
| 12 | 32 | $16,000 | $10,224 | $1,600 | $27,824 |

**Year 1 Total One-Time Revenue**: $131,300

### 3.3 Three-Year Revenue Summary

| Metric | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| **Ending Customers** | 134 | 542 | 1,392 |
| **Ending MRR** | $31,490 | $127,370 | $327,120 |
| **Annual ARR** | $377,880 | $1,528,440 | $3,925,440 |
| **One-Time Revenue** | $131,300 | $327,200 | $708,500 |
| **Total Revenue** | $509,180 | $1,855,640 | $4,633,940 |
| **YoY Growth %** | - | 264% | 150% |

---

## Section 4: Expense Budget

### 4.1 Cost of Goods Sold (COGS)

| Expense Category | Year 1 | Year 2 | Year 3 | Notes |
|------------------|--------|--------|--------|-------|
| **Cloud Hosting** | $3,600 | $18,000 | $50,000 | AWS/Azure per customer |
| **Payment Processing** | $12,729 | $46,391 | $115,848 | 2.5% of revenue |
| **SMS/Communication** | $2,400 | $9,750 | $25,020 | Twilio for alerts |
| **Customer Support Tools** | $2,400 | $6,000 | $12,000 | Zendesk/Intercom |
| **Hardware Costs (COGS)** | $18,595 | $46,320 | $100,350 | If reselling hardware |
| **Total COGS** | $39,724 | $126,461 | $303,218 |
| **Gross Margin %** | 92.2% | 93.2% | 93.5% | Excellent for SaaS |

### 4.2 Operating Expenses - Personnel

#### Year 1 Team
| Role | Start Month | Monthly Salary | Annual Cost | Notes |
|------|-------------|----------------|-------------|-------|
| Founder 1 (CEO) | 1 | $0 | $0 | Deferred until profitable |
| Founder 2 (CTO) | 1 | $0 | $0 | Deferred until profitable |
| Part-time Developer | 7 | $4,000 | $24,000 | Contract help |
| Part-time Sales | 10 | $3,000 | $9,000 | Commission-based |
| **Total Year 1 Personnel** | | | $33,000 | |

#### Year 2 Team
| Role | Monthly Salary | Annual Cost |
|------|----------------|-------------|
| Founder 1 (CEO) | $6,000 | $72,000 |
| Founder 2 (CTO) | $6,000 | $72,000 |
| Full-time Developer | $8,000 | $96,000 |
| Sales Rep | $5,000 + commission | $80,000 |
| Customer Success | $4,500 | $54,000 |
| **Total Year 2 Personnel** | | $374,000 |

#### Year 3 Team
| Role | Count | Annual Cost per | Total |
|------|-------|-----------------|-------|
| Executives (Founders) | 2 | $90,000 | $180,000 |
| Developers | 3 | $100,000 | $300,000 |
| Sales Team | 3 | $85,000 | $255,000 |
| Customer Success | 2 | $60,000 | $120,000 |
| Marketing | 1 | $75,000 | $75,000 |
| **Total Year 3 Personnel** | 11 | | $930,000 |

### 4.3 Operating Expenses - Non-Personnel

| Category | Year 1 | Year 2 | Year 3 | Notes |
|----------|--------|--------|--------|-------|
| **Marketing & Advertising** | $36,000 | $120,000 | $300,000 | Digital ads, content |
| **Sales Commissions** | $15,276 | $55,669 | $139,018 | 10% of new revenue |
| **Software & Tools** | $6,000 | $12,000 | $24,000 | Dev tools, CRM, etc. |
| **Office & Admin** | $3,600 | $12,000 | $36,000 | Coworking, supplies |
| **Legal & Accounting** | $8,000 | $15,000 | $25,000 | CPA, attorney |
| **Insurance** | $2,400 | $6,000 | $12,000 | Business liability |
| **Travel & Entertainment** | $3,000 | $12,000 | $30,000 | Conferences, sales |
| **Misc / Contingency** | $5,000 | $15,000 | $30,000 | 10% buffer |
| **Total Non-Personnel OpEx** | $79,276 | $247,669 | $596,018 |

### 4.4 Total Expense Summary

| Category | Year 1 | Year 2 | Year 3 |
|----------|--------|--------|--------|
| **COGS** | $39,724 | $126,461 | $303,218 |
| **Personnel** | $33,000 | $374,000 | $930,000 |
| **Non-Personnel OpEx** | $79,276 | $247,669 | $596,018 |
| **Total Expenses** | $152,000 | $748,130 | $1,829,236 |

---

## Section 5: Profit & Loss Statement

### 5.1 Year 1 P&L (Annual)

| Line Item | Amount | % of Revenue |
|-----------|--------|--------------|
| **Revenue** | | |
| Subscription Revenue (ARR) | $377,880 | 74.2% |
| One-Time Revenue | $131,300 | 25.8% |
| **Total Revenue** | **$509,180** | **100.0%** |
| | | |
| **Cost of Goods Sold** | $39,724 | 7.8% |
| **Gross Profit** | **$469,456** | **92.2%** |
| | | |
| **Operating Expenses** | | |
| Personnel | $33,000 | 6.5% |
| Marketing & Sales | $51,276 | 10.1% |
| Software & Tools | $6,000 | 1.2% |
| Office & Admin | $3,600 | 0.7% |
| Legal & Accounting | $8,000 | 1.6% |
| Insurance | $2,400 | 0.5% |
| Travel & Entertainment | $3,000 | 0.6% |
| Miscellaneous | $5,000 | 1.0% |
| **Total OpEx** | **$112,276** | **22.1%** |
| | | |
| **EBITDA** | **$357,180** | **70.1%** |
| Depreciation & Amortization | $5,000 | 1.0% |
| **Operating Income (EBIT)** | **$352,180** | **69.2%** |
| Interest Income/Expense | $0 | 0.0% |
| **Net Income Before Tax** | **$352,180** | **69.2%** |
| Income Tax (25%) | $88,045 | 17.3% |
| **Net Income** | **$264,135** | **51.9%** |

### 5.2 Three-Year P&L Summary

| Line Item | Year 1 | Year 2 | Year 3 |
|-----------|--------|--------|--------|
| **Total Revenue** | $509,180 | $1,855,640 | $4,633,940 |
| **Gross Profit** | $469,456 | $1,729,179 | $4,330,722 |
| **Gross Margin %** | 92.2% | 93.2% | 93.5% |
| **Total Operating Expenses** | $112,276 | $621,669 | $1,526,018 |
| **EBITDA** | $357,180 | $1,107,510 | $2,804,704 |
| **EBITDA Margin %** | 70.1% | 59.7% | 60.5% |
| **Net Income** | $264,135 | $820,511 | $2,078,522 |
| **Net Margin %** | 51.9% | 44.2% | 44.9% |

**Notes**:
- Year 1: Exceptional profitability due to deferred founder salaries
- Year 2: Margins compress as team grows to ~40 people
- Year 3: Margins stabilize around 45% (world-class for SaaS)

---

## Section 6: Cash Flow Statement

### 6.1 Year 1 Cash Flow (Simplified)

| Category | Year 1 |
|----------|--------|
| **Operating Activities** | |
| Net Income | $264,135 |
| Add: Depreciation | $5,000 |
| Changes in Working Capital | ($15,000) |
| **Cash from Operations** | **$254,135** |
| | |
| **Investing Activities** | |
| Equipment Purchases | ($10,000) |
| Software Development (Capitalized) | ($25,000) |
| **Cash from Investing** | **($35,000)** |
| | |
| **Financing Activities** | |
| Founder Investment | $50,000 |
| **Cash from Financing** | **$50,000** |
| | |
| **Net Change in Cash** | **$269,135** |
| Beginning Cash | $0 |
| **Ending Cash** | **$269,135** |

### 6.2 Three-Year Cash Flow Summary

| Line Item | Year 1 | Year 2 | Year 3 |
|-----------|--------|--------|--------|
| **Beginning Cash** | $0 | $269,135 | $1,004,646 |
| Cash from Operations | $254,135 | $795,511 | $2,038,522 |
| Cash from Investing | ($35,000) | ($60,000) | ($100,000) |
| Cash from Financing | $50,000 | $0 | $0 |
| **Net Change in Cash** | $269,135 | $735,511 | $1,938,522 |
| **Ending Cash** | **$269,135** | **$1,004,646** | **$2,943,168** |
| **Months of Runway** | ∞ (profitable) | ∞ | ∞ |

---

## Section 7: Balance Sheet (Year-End Snapshots)

### 7.1 Year 1 Balance Sheet

| Assets | Amount |
|--------|--------|
| **Current Assets** | |
| Cash | $269,135 |
| Accounts Receivable | $25,000 |
| Prepaid Expenses | $5,000 |
| **Total Current Assets** | $299,135 |
| | |
| **Fixed Assets** | |
| Equipment | $10,000 |
| Software (Capitalized) | $25,000 |
| Less: Accumulated Depreciation | ($5,000) |
| **Total Fixed Assets** | $30,000 |
| | |
| **Total Assets** | **$329,135** |

| Liabilities & Equity | Amount |
|----------------------|--------|
| **Current Liabilities** | |
| Accounts Payable | $10,000 |
| Accrued Expenses | $5,000 |
| Deferred Revenue | $0 |
| **Total Current Liabilities** | $15,000 |
| | |
| **Equity** | |
| Common Stock | $50,000 |
| Retained Earnings | $264,135 |
| **Total Equity** | $314,135 |
| | |
| **Total Liabilities & Equity** | **$329,135** |

### 7.2 Three-Year Balance Sheet Summary

| Line Item | Year 1 | Year 2 | Year 3 |
|-----------|--------|--------|--------|
| **Total Assets** | $329,135 | $1,124,646 | $3,163,168 |
| Cash | $269,135 | $1,004,646 | $2,943,168 |
| Fixed Assets (net) | $30,000 | $70,000 | $120,000 |
| | | | |
| **Total Liabilities** | $15,000 | $40,000 | $80,000 |
| **Total Equity** | $314,135 | $1,084,646 | $3,083,168 |
| | | | |
| **Quick Ratio** | 19.9 | 25.1 | 36.8 |
| **Current Ratio** | 19.9 | 28.1 | 39.5 |

---

## Section 8: Key Metrics Dashboard

### 8.1 Customer Metrics

| Metric | Year 1 | Year 2 | Year 3 | Formula |
|--------|--------|--------|--------|---------|
| **Ending Customers** | 134 | 542 | 1,392 | Count |
| **Net New Customers** | 134 | 408 | 850 | New - Churned |
| **Churn Rate (Annual)** | 39% | 31% | 22% | Churned ÷ Avg Customers |
| **Retention Rate** | 61% | 69% | 78% | 100% - Churn |
| **Logo Churn Rate** | 4% | 3% | 2% | Monthly logo churn |

### 8.2 Revenue Metrics

| Metric | Year 1 | Year 2 | Year 3 | Formula |
|--------|--------|--------|--------|---------|
| **MRR (End)** | $31,490 | $127,370 | $327,120 | Monthly recurring |
| **ARR (End)** | $377,880 | $1,528,440 | $3,925,440 | MRR × 12 |
| **ARPC** | $235 | $235 | $235 | MRR ÷ Customers |
| **YoY Growth** | - | 264% | 150% | (Y2 - Y1) ÷ Y1 |
| **MoM Growth (Avg)** | 25% | 15% | 10% | Average monthly |

### 8.3 Unit Economics

| Metric | Year 1 | Year 2 | Year 3 | Target |
|--------|--------|--------|--------|--------|
| **CAC** | $267 | $233 | $217 | <$300 |
| **LTV** | $4,230 | $5,457 | $7,020 | >$2,000 |
| **LTV:CAC Ratio** | 15.8:1 | 23.4:1 | 32.4:1 | >3:1 |
| **CAC Payback** | 1.4 mo | 1.2 mo | 1.1 mo | <12 mo |
| **Magic Number** | 2.8 | 1.9 | 1.7 | >1.0 |

**Formulas**:
- CAC = Total S&M Spend ÷ New Customers
- LTV = ARPC × Gross Margin % ÷ Monthly Churn
- CAC Payback = CAC ÷ (ARPC × Gross Margin %)

### 8.4 Profitability Metrics

| Metric | Year 1 | Year 2 | Year 3 | Industry Benchmark |
|--------|--------|--------|--------|-------------------|
| **Gross Margin** | 92.2% | 93.2% | 93.5% | 75-85% |
| **EBITDA Margin** | 70.1% | 59.7% | 60.5% | 20-30% |
| **Net Margin** | 51.9% | 44.2% | 44.9% | 10-20% |
| **Rule of 40** | N/A | 324% | 195% | >40% |
| **Burn Multiple** | N/A | N/A | N/A | <1.5 (we're profitable) |

**Notes**: These are exceptional metrics because founders defer salary in Year 1 and business has low COGS.

### 8.5 Efficiency Metrics

| Metric | Year 1 | Year 2 | Year 3 | Formula |
|--------|--------|--------|--------|---------|
| **Revenue per Employee** | $169,727 | $206,183 | $421,267 | Revenue ÷ Employees |
| **Customers per CSM** | N/A | 542 | 696 | Customers ÷ CS team |
| **Sales Efficiency** | 7.1 | 4.6 | 3.8 | New ARR ÷ S&M Spend |
| **R&D as % Revenue** | 4.7% | 9.0% | 8.1% | R&D ÷ Revenue |
| **S&M as % Revenue** | 18.5% | 28.4% | 27.6% | S&M ÷ Revenue |

---

## Section 9: Scenario Analysis

### 9.1 Three Scenarios for Year 2

| Metric | Conservative | Base Case | Optimistic |
|--------|--------------|-----------|------------|
| **Assumptions** | | | |
| Monthly Growth | 10% | 15% | 20% |
| Churn Rate | 4% | 3% | 2% |
| ARPC | $220 | $235 | $250 |
| | | | |
| **Outcomes** | | | |
| Ending Customers | 387 | 542 | 738 |
| Ending ARR | $1,022,640 | $1,528,440 | $2,214,000 |
| Total Revenue | $1,255,840 | $1,855,640 | $2,582,200 |
| Net Income | $472,210 | $820,511 | $1,196,830 |
| Ending Cash | $677,346 | $1,004,646 | $1,381,966 |
| | | | |
| **Probability** | 20% | 60% | 20% |

**Use This For**: Understanding range of outcomes, stress-testing, contingency planning

### 9.2 Break-Even Analysis

**Fixed Costs (Monthly)**:
- Personnel: $31,167 (Year 2 average)
- Office & Admin: $1,000
- Software & Tools: $1,000
- Insurance: $500
- Total Fixed: $33,667

**Variable Costs per Customer**:
- Hosting: $2.77/month
- Payment Processing: ~$4.70/month (2.5% of $188)
- SMS: $1.50/month
- Total Variable: $8.97/customer/month

**Contribution Margin per Customer**:
- ARPC: $235
- Variable Costs: $8.97
- Contribution Margin: $226.03

**Break-Even Customers**:
= Fixed Costs ÷ Contribution Margin
= $33,667 ÷ $226.03
= **149 customers to break even**

**CoodLoom hits break-even**: Month 13 (Year 1, December with 134 customers, or early Year 2)

### 9.3 Sensitivity Analysis

**Impact of 10% Change in Key Variables (Year 2)**:

| Variable | -10% Impact | +10% Impact |
|----------|-------------|-------------|
| **ARPC** | Net Income: $634,867 (-23%) | $1,006,155 (+23%) |
| **Churn Rate** | Net Income: $912,738 (+11%) | $728,284 (-11%) |
| **CAC** | Net Income: $832,467 (+1%) | $808,555 (-1%) |
| **Growth Rate** | Net Income: $612,344 (-25%) | $1,028,678 (+25%) |
| **Gross Margin** | Net Income: $647,837 (-21%) | $993,185 (+21%) |

**Insights**:
- Most sensitive to: Growth rate and ARPC
- Moderately sensitive to: Churn and gross margin
- Least sensitive to: CAC (because it's already low)

**Strategic Implication**: Focus on pricing power and retention > acquisition efficiency

---

## Section 10: Capital Requirements

### 10.1 Funding Scenarios

**Scenario A: Bootstrap (No Fundraising)**
- Starting capital: $50,000
- Profitable by: Month 12
- Ending Year 3 cash: $2,943,168
- Dilution: 0%
- **Pros**: Full ownership, forced discipline, flexibility
- **Cons**: Slower growth, limited resources, high founder stress

**Scenario B: Seed Round ($500K at $2M pre-money)**
- Raise: $500,000
- Valuation: $2.5M post-money
- Dilution: 20%
- Use of funds: Hire 2 sales reps ($170K), 1 developer ($100K), marketing ($150K), runway ($80K)
- Profitable by: Month 9 (faster with more investment)
- Ending Year 3 cash: $3,443,168
- **Pros**: Faster growth, less founder stress, professional expertise
- **Cons**: Dilution, investor expectations, loss of control

**Scenario C: Series A ($2M at $8M pre-money)**
- Raise: $2,000,000 (Year 2)
- Valuation: $10M post-money
- Dilution: 20% (cumulative ~36% with seed)
- Use of funds: Scale team to 25 people, enterprise sales, product expansion
- **Pros**: Aggressive growth, market leadership, enterprise customers
- **Cons**: Significant dilution, pressure to grow, exit expectations

### 10.2 Recommended Path for CoodLoom

**Phase 1 (Months 1-12): Bootstrap**
- Use $50K starting capital
- Validate product-market fit
- Reach $30K+ MRR
- Become cash flow positive

**Phase 2 (Months 13-24): Optional Seed ($500K)**
- Only if you want to grow faster
- Hire sales team and second developer
- Expand marketing spend 3x
- Target $100K+ MRR by Month 24

**Phase 3 (Months 25-36): Optional Series A ($2M)**
- Only if targeting enterprise market
- Build sales org (5-10 reps)
- Invest in product for enterprise features
- Target $300K+ MRR by Month 36

**Our Recommendation**: Start bootstrap, decide on fundraising once you hit $50K MRR and have strong unit economics. You may not need to raise at all.

---

## Section 11: Using This Model

### Monthly Update Process

**Step 1: Update Actuals (by 5th of month)**
1. Export data from accounting software (QuickBooks/Wave)
2. Enter actual revenue, expenses, cash in "Actuals" column
3. Compare to projections (variance analysis)
4. Update rolling 13-week cash forecast

**Step 2: Analyze Variances (by 10th of month)**
1. Identify materially different items (>10% variance)
2. Understand reasons (one-time vs trend)
3. Document learnings in notes
4. Adjust processes if needed

**Step 3: Update Forecast (by 15th of month)**
1. Revise customer growth assumptions based on trends
2. Update churn rate with actual data
3. Adjust expense budget for new hires/projects
4. Recalculate metrics and scenarios

**Step 4: Communicate (by 20th of month)**
1. Share P&L and key metrics with co-founder
2. Send investor update (if applicable)
3. Present to board (if applicable)
4. Save version with date (e.g., "Financial Model - Mar 2024")

### Red Flags to Watch

⚠️ **Customer Acquisition**
- New customers < 50% of projection for 2+ months
- CAC increasing > 20% without cause
- Conversion rate declining

⚠️ **Retention**
- Churn rate increasing > 1% per month
- NPS score dropping below 30
- Customer complaints increasing

⚠️ **Cash Flow**
- Runway < 6 months
- Burn rate increasing faster than revenue
- Collections slowing (DSO increasing)

⚠️ **Unit Economics**
- LTV:CAC ratio falling below 3:1
- CAC payback extending beyond 12 months
- Gross margin declining

⚠️ **Profitability**
- EBITDA margin declining for 3+ months
- Operating expenses growing faster than revenue
- Path to profitability extending

### Green Lights (Celebrate!)

✅ Revenue beating projections 3+ months in row  
✅ Churn rate declining  
✅ CAC staying flat or decreasing  
✅ Gross margin improving  
✅ Cash flow positive ahead of schedule  
✅ Key metrics in "excellent" range  
✅ Consistent month-over-month growth  

---

## Section 12: Advanced Topics

### 12.1 Adding a Co-Founder Mid-Year

If you add a co-founder in Month 6 with 20% equity:
```
Founder 1: 50% → 40%
Founder 2: 50% → 40%
New Co-Founder: 20%
```

**Impact on Model**:
- Add their salary (if taking one)
- Dilution affects future fundraising calculations
- Update cap table in "Company Info" section

### 12.2 Handling Annual Contracts

If customer pays $2,988 upfront for year:
- **Revenue Recognition**: $249/month for 12 months
- **Cash Flow**: $2,988 received immediately
- **Deferred Revenue Liability**: $2,988 initially, decreases $249/month

**In Model**:
- P&L shows $249/month
- Cash Flow shows $2,988 in month received
- Balance Sheet shows Deferred Revenue liability

### 12.3 Capitalizing Development Costs

If spending $5,000/month on core product development:
- **Expense**: Development of new features
- **Capitalize**: Significant new product/platform work

**In Model**:
- Capitalized amounts go to Balance Sheet (Software asset)
- Amortize over 3 years (depreciation)
- Reduces expenses in P&L but not cash flow

### 12.4 Stock Options Pool

If creating 10% option pool:
```
Before Pool:
- Founder 1: 50%
- Founder 2: 50%

After Pool:
- Founder 1: 45%
- Founder 2: 45%
- Option Pool: 10%
```

**In Model**:
- No immediate impact on financials
- Stock-based compensation expense as options vest
- Dilution affects fundraising calculations

---

## Checklist: Is Your Model Complete?

### Company Basics
- [ ] Company name and founding date
- [ ] Founders and equity split
- [ ] Starting capital and cash balance
- [ ] Fiscal year defined

### Revenue Model
- [ ] Product pricing defined
- [ ] ARPC calculated
- [ ] Customer growth assumptions (monthly)
- [ ] Churn rate assumptions
- [ ] MRR and ARR projected for 3 years
- [ ] One-time revenue included (if applicable)

### Expense Model
- [ ] COGS detailed by category
- [ ] Personnel plan with salaries and start dates
- [ ] Non-personnel OpEx budgeted
- [ ] Marketing and sales commissions included
- [ ] Legal, accounting, insurance included

### Financial Statements
- [ ] 3-year P&L with monthly detail (Year 1)
- [ ] 3-year Cash Flow Statement
- [ ] Year-end Balance Sheets
- [ ] All statements balance and reconcile

### Key Metrics
- [ ] Customer metrics (churn, retention, growth)
- [ ] Revenue metrics (MRR, ARR, ARPC)
- [ ] Unit economics (CAC, LTV, ratios)
- [ ] Profitability metrics (margins, Rule of 40)
- [ ] Efficiency metrics (per employee, sales efficiency)

### Scenario Planning
- [ ] Three scenarios (conservative, base, optimistic)
- [ ] Break-even analysis
- [ ] Sensitivity analysis for key variables
- [ ] Runway calculation (if not profitable)

### Capital Planning
- [ ] Funding scenarios modeled (bootstrap vs raise)
- [ ] Use of funds defined
- [ ] Dilution calculated
- [ ] Recommended path documented

### Process
- [ ] Monthly update process defined
- [ ] Red flags identified
- [ ] Variance analysis template ready
- [ ] Communication plan for stakeholders

---

## Common Questions

**Q: How accurate should my projections be?**  
A: Year 1 should be within 20% (you'll update monthly). Year 2-3 are directional—it's more about assumptions and ranges than precision.

**Q: Should I model monthly or annually?**  
A: Month-by-month for Year 1, quarterly for Year 2, annually for Year 3. Update Year 1 to monthly as you get closer.

**Q: What if I don't have founder salary?**  
A: Model $0 salary for now, but include a note about when you'll start paying yourself. Banks and investors want to see this.

**Q: How often should I update my model?**  
A: Monthly with actuals, quarterly with revised forecasts. Major updates whenever assumptions change significantly.

**Q: Do I need three financial statements?**  
A: P&L is most important. Cash flow is critical if pre-profitable. Balance sheet less important until you raise money or get a loan.

**Q: What if my business is different from this model?**  
A: Customize! This is a SaaS template. Adjust revenue model, COGS, and metrics for your business. Keep structure, change inputs.

**Q: Should I share this with investors?**  
A: Yes, but create a cleaned-up "investor version" with simplified assumptions page, executive summary, and key charts. This full model is for your internal use.

**Q: What if my numbers look bad?**  
A: Better to know now! Use the model to identify problems, test solutions, and plan your path to profitability. Honest numbers beat wishful thinking.

---

**Next Steps**:
1. Make a copy of this template
2. Fill in all blue cells with your assumptions
3. Review yellow cells to ensure formulas make sense
4. Update monthly with actuals
5. Share with co-founder and/or advisors for feedback

**Remember**: This is a living document. It will be wrong. That's okay. The goal is to make informed decisions and course-correct quickly, not to predict the future perfectly.
