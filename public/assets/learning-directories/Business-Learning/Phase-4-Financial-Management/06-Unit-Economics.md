# Unit Economics for CoodLoom

## Introduction
Unit economics are the fundamental building blocks of your business. They tell you if your business model actually works and whether you can profitably acquire and serve customers. Master these metrics and you'll know exactly how to scale CoodLoom profitably.

## What Are Unit Economics?

### The Core Concept
**Unit economics measure the revenue and costs associated with a single "unit" of your business.**

For CoodLoom:
- **Unit** = One customer
- **Unit Revenue** = Revenue from one customer over their lifetime (LTV)
- **Unit Cost** = Cost to acquire and serve one customer (CAC + CoS)

**The Fundamental Question**: Do you make more money from a customer than it costs to acquire and serve them?

If Yes → Scale! 🚀  
If No → Fix the model before scaling 🔧  

## Key Unit Economic Metrics

### 1. Customer Acquisition Cost (CAC)

**Definition**: Total cost to acquire one new customer

**Formula**:
```
CAC = Total Sales & Marketing Expenses / Number of New Customers

Example - CoodLoom Month 6:
Sales & Marketing Spend: $5,000
New Customers: 20
CAC = $5,000 / 20 = $250 per customer
```

**What to Include in CAC**:
✅ Marketing spend (ads, content, events)  
✅ Sales salaries and commissions  
✅ Marketing tools (email, CRM, analytics)  
✅ Sales tools (demo software, sales automation)  
✅ Content creation costs  
✅ Agency/contractor fees  

**What NOT to Include**:
❌ Product development  
❌ Customer success/support (that's Cost to Serve)  
❌ General admin overhead  

**CoodLoom CAC Breakdown**:
```
MONTH 6 EXAMPLE:
────────────────────────────────────────
Google Ads:              $2,000
Content Marketing:       $800
Sales Rep (50% of salary): $1,500
CRM/Tools:              $200
Events/Networking:       $500
────────────────────────────────────────
Total S&M Spend:        $5,000
New Customers:          20
CAC:                    $250
```

**Benchmarks**:
- Consumer SaaS: $100-$300
- SMB SaaS: $200-$1,000
- Mid-market B2B: $1,000-$5,000
- Enterprise: $10,000-$50,000+

**CoodLoom Target**: $200-$300 (SMB SaaS)

### 2. Lifetime Value (LTV)

**Definition**: Total gross profit from a customer over their entire relationship with you

**Formula**:
```
LTV = ARPC × Gross Margin % × Average Customer Lifetime (in months)

Or simpler:
LTV = ARPC × Gross Margin % / Churn Rate

Example - CoodLoom:
ARPC: $200/month
Gross Margin: 75%
Average Lifetime: 20 months (5% monthly churn = 1/0.05 = 20 months)

LTV = $200 × 75% × 20 = $3,000
or
LTV = $200 × 0.75 / 0.05 = $3,000
```

**Components Explained**:

**ARPC (Average Revenue Per Customer)**:
```
Total Monthly Recurring Revenue / Number of Customers

CoodLoom:
- Starter plan (60% of customers): $149
- Pro plan (40% of customers): $299
- Weighted average: (0.6 × $149) + (0.4 × $299) = $209

Plus one-time:
- Setup fees: $500 (amortized over lifetime = $25/month)
- Hardware: $399 profit (amortized = $20/month)

Total ARPC: $254/month
```

**Gross Margin**:
```
(Revenue - COGS) / Revenue

CoodLoom COGS per customer:
- Infrastructure: $8/month
- Payment processing: $6/month
- APIs/SMS: $6/month
Total COGS: $20/month

Gross Profit: $254 - $20 = $234
Gross Margin: $234 / $254 = 92%

(For LTV calc, use subscription margin only: 75%)
```

**Customer Lifetime**:
```
1 / Monthly Churn Rate

If 5% churn: 1 / 0.05 = 20 months average lifetime
If 3% churn: 1 / 0.03 = 33 months average lifetime
If 2% churn: 1 / 0.02 = 50 months average lifetime

Lower churn = Longer lifetime = Higher LTV
```

**CoodLoom LTV Calculation (Conservative)**:
```
ARPC: $200 (subscription only, excluding one-time)
Gross Margin: 75%
Churn: 5% monthly → 20 month lifetime

LTV = $200 × 0.75 × 20 = $3,000

If we improve churn to 3%:
LTV = $200 × 0.75 × 33 = $4,950 (65% increase!)
```

### 3. LTV/CAC Ratio

**Definition**: How much value you get for every dollar spent acquiring a customer

**Formula**:
```
LTV / CAC Ratio = Lifetime Value / Customer Acquisition Cost

CoodLoom:
LTV: $3,000
CAC: $250
Ratio: $3,000 / $250 = 12:1
```

**Benchmarks**:
```
< 1:1    🔴 Losing money on every customer (unsustainable)
1:1-3:1  🟡 Breaking even or slight profit (need to improve)
3:1-5:1  🟢 Good, sustainable, profitable
5:1+     🟢🟢 Excellent! Scale aggressively
10:1+    💎 Amazing, but might be under-investing in growth
```

**CoodLoom at 12:1**: Excellent! Room to invest more in marketing

**What Your Ratio Tells You**:
```
Low ratio (< 3:1):
→ CAC is too high (marketing inefficient)
→ LTV is too low (churn too high or ARPC too low)
→ Fix before scaling

Good ratio (3-5:1):
→ Healthy business model
→ Scale carefully, maintain efficiency

High ratio (> 10:1):
→ You're under-investing in growth
→ Opportunity to increase marketing spend
→ Competitors may outgrow you
```

### 4. CAC Payback Period

**Definition**: How long it takes to recoup the cost of acquiring a customer

**Formula**:
```
CAC Payback Period (months) = CAC / (ARPC × Gross Margin %)

CoodLoom:
CAC: $250
Monthly Gross Profit per Customer: $200 × 75% = $150
Payback: $250 / $150 = 1.67 months
```

**Benchmarks**:
```
< 6 months   🟢 Excellent
6-12 months  🟢 Good
12-18 months 🟡 Acceptable
18-24 months 🟡 Concerning
> 24 months  🔴 Problematic
```

**Why It Matters**:
- **Cash Flow**: Shorter payback = Better cash flow
- **Risk**: Shorter payback = Less risk (customer pays back investment quickly)
- **Scaling**: Shorter payback = Easier to scale (recycle capital faster)

**CoodLoom at 1.67 months**: Exceptional! Can scale aggressively.

### 5. Churn Rate

**Definition**: Percentage of customers who cancel in a given period

**Monthly Churn Formula**:
```
Monthly Churn Rate = Customers Lost in Month / Customers at Start of Month

CoodLoom Month 6:
Customers at start: 100
Customers lost: 5
Monthly Churn: 5 / 100 = 5%

Annual Churn (approximate): 5% × 12 = 60%
```

**Better: Customer Retention Rate**:
```
Retention Rate = 1 - Churn Rate
5% churn = 95% retention
```

**Cohort Analysis** (More Accurate):
```
Track a cohort of customers over time:

Month 0: 100 customers sign up in January
Month 1: 95 remain (5% churned)
Month 2: 91 remain (4.2% of Month 1 churned)
Month 3: 88 remain (3.3% of Month 2 churned)
...
Month 12: 70 remain (70% annual retention)

This shows churn improving over time (sticky product!)
```

**Churn Benchmarks**:
```
Consumer SaaS:     5-7% monthly (or higher)
SMB SaaS:          3-5% monthly
Mid-market:        1-3% monthly
Enterprise:        0.5-1% monthly (annual contracts)

CoodLoom Target:   3% monthly (36% annual)
```

**Revenue Churn vs Logo Churn**:
```
Logo Churn: % of customers who leave
Revenue Churn: % of revenue lost

If small customers churn but large customers stay:
→ Logo churn might be high
→ Revenue churn might be low (good!)

CoodLoom Example:
Lost: 5 customers at $149/month = $745
Gained: 2 upgrades $149→$299 = +$300
Net Revenue Churn: ($745-$300) / $10,000 MRR = 4.45%

Even better: Negative Revenue Churn (expansions > losses)
```

### 6. Gross Margin

**Definition**: Percentage of revenue left after direct costs

**Formula**:
```
Gross Margin = (Revenue - COGS) / Revenue × 100%

CoodLoom:
Revenue per customer: $200/month
COGS per customer: $20/month
Gross Profit: $180/month
Gross Margin: $180 / $200 = 90%
```

**What Counts as COGS**:
✅ Server/hosting costs  
✅ Payment processing fees  
✅ Third-party APIs  
✅ SMS/email sending costs  
✅ Support costs (sometimes)  
✅ Hardware costs (for CoodLoom)  

**SaaS Benchmarks**:
- Pure SaaS: 75-90%
- SaaS + Services: 60-75%
- SaaS + Hardware: 50-70%

**CoodLoom Target**: 75%+ (slightly lower due to hardware)

**Why It Matters**:
- Higher margin = More to reinvest in growth
- Higher margin = More attractive to investors
- Higher margin = Better cash flow
- Higher margin = More defensible

### 7. Magic Number

**Definition**: Sales efficiency metric - how much revenue you generate per dollar of sales & marketing spend

**Formula**:
```
Magic Number = (Net New ARR in Quarter × 4) / S&M Spend in Prior Quarter

CoodLoom Q2 Example:
Q1 S&M Spend: $15,000
Q2 Net New ARR: $72,000 (new customers + expansions - churn)

Magic Number = ($72,000 × 4) / $15,000 = $288,000 / $15,000 = 19.2

Wait, that can't be right. Let me recalculate:

Actually: Magic Number = Net New ARR / S&M Spend
= $72,000 / ($15,000 × 4 quarters to annualize)
= $72,000 / $60,000 = 1.2
```

**Correct CoodLoom Calculation**:
```
Q1 S&M Spend: $15,000
Q2 Net New MRR: $6,000 ($72K ARR)

Magic Number = (Q2 Net New MRR / Q1 S&M) × 4
= ($6,000 / $15,000) × 4
= 0.4 × 4 = 1.6
```

**Benchmarks**:
```
< 0.5    🔴 Very inefficient
0.5-0.75 🟡 Needs improvement
0.75-1.0 🟢 Good
1.0+     🟢🟢 Excellent
1.5+     💎 World-class
```

**CoodLoom at 1.6**: Excellent sales efficiency!

**What It Tells You**:
- Magic Number < 0.75: Don't scale yet, fix unit economics
- Magic Number > 0.75: Scale! Pour gas on the fire
- Magic Number > 1.5: You should be investing MORE in S&M

## Building Your Unit Economics Model

### CoodLoom Unit Economics Dashboard

```
┌───────────────────────────────────────────────────────────┐
│ COODLOOM UNIT ECONOMICS - Month 12                        │
├───────────────────────────────────────────────────────────┤
│ CUSTOMER METRICS                                           │
│ Total Customers:               170                        │
│ New Customers (month):         30                         │
│ Churned Customers:             5                          │
│ Net New Customers:             25                         │
│ Monthly Churn Rate:            2.9%    🟢 Improving      │
│ Customer Lifetime:             34 months (1/0.029)        │
│                                                            │
│ REVENUE METRICS                                            │
│ MRR:                          $34,000                     │
│ ARPC:                         $200                        │
│ New MRR:                      $6,000                      │
│ Churned MRR:                  $1,000                      │
│ Net New MRR:                  $5,000                      │
│                                                            │
│ COSTS                                                      │
│ Monthly COGS:                 $3,400 ($20/customer)       │
│ Gross Profit:                 $30,600                     │
│ Gross Margin:                 90%      🟢                 │
│ S&M Spend (month):            $10,000                     │
│ S&M per New Customer (CAC):   $333                        │
│                                                            │
│ UNIT ECONOMICS                                             │
│ LTV:                          $5,100  ($200×0.75×34mo)    │
│ CAC:                          $333                         │
│ LTV/CAC:                      15.3:1   💎 Excellent       │
│ CAC Payback:                  2.2 months  🟢             │
│ Magic Number:                 1.8      💎 World-class    │
│                                                            │
│ EFFICIENCY METRICS                                         │
│ Gross Profit per Customer:    $180/month                 │
│ Months to Payback:            1.8                         │
│ Annual Revenue per Customer:  $2,400                      │
│ Cost to Serve (annual):       $240                        │
│ Annual Profit per Customer:   $2,160                      │
│                                                            │
│ HEALTH CHECK                                               │
│ Unit Economics:               ✅ Excellent                │
│ Ready to Scale:               ✅ Yes                      │
│ Recommended Action:           🚀 Scale aggressively       │
└───────────────────────────────────────────────────────────┘
```

### Sensitivity Analysis

**What if CAC increases 50%?**
```
Current: $333 CAC → 15.3:1 LTV/CAC
New: $500 CAC → 10.2:1 LTV/CAC
Still excellent! Can afford higher CAC for faster growth
```

**What if churn doubles?**
```
Current: 2.9% churn → LTV $5,100
New: 5.8% churn → LTV $2,586
LTV/CAC: $2,586 / $333 = 7.8:1
Still good, but need to watch closely
```

**What if ARPC drops 20%?**
```
Current: $200 ARPC → LTV $5,100
New: $160 ARPC → LTV $4,080
LTV/CAC: $4,080 / $333 = 12.3:1
Still strong, but prefer to maintain pricing
```

**Break-even Analysis**:
```
At what CAC does unit economics break even (LTV/CAC = 3:1)?
LTV: $5,100
Break-even CAC: $5,100 / 3 = $1,700

CoodLoom can afford up to $1,700 CAC and still be healthy!
Current CAC: $333
Headroom: 5× current spending
Opportunity: Invest more aggressively in growth
```

## Improving Your Unit Economics

### Strategy 1: Increase LTV

**Tactic A: Reduce Churn**
```
Impact: Biggest lever for LTV
CoodLoom churn: 3% → 2%
Lifetime: 33 months → 50 months (+52%)
LTV: $5,100 → $7,500 (+47%)

How to reduce churn:
✅ Better onboarding (first 30 days critical)
✅ Proactive support (reach out before they have problems)
✅ Regular check-ins (quarterly business reviews)
✅ Product improvements (address top cancellation reasons)
✅ Customer success team (dedicated help)
✅ Usage monitoring (flag at-risk customers)
✅ Annual contracts (commit upfront = lower churn)
```

**Tactic B: Increase ARPC**
```
Method 1: Raise Prices
Current: $200 → New: $220 (+10%)
LTV: $5,100 → $5,610 (+10%)

Method 2: Upsell to Higher Tiers
Move customers from Starter ($149) to Pro ($299)
ARPC: $200 → $230 (+15%)
LTV: $5,100 → $5,865 (+15%)

Method 3: Add-ons
Additional locations: +$99/month
Premium support: +$99/month
If 30% of customers add one feature: +$30 ARPC
ARPC: $200 → $230 (+15%)

Method 4: Annual Prepay (improves cash, not LTV)
50% choose annual → Better cash flow
```

**Tactic C: Expand Revenue (Negative Churn)**
```
Goal: Expansions > Contractions + Churn
= Net Negative Revenue Churn

CoodLoom Example:
Month start MRR: $34,000
Churned: -$1,000
Expansions: +$1,500 (upsells, add-ons)
Month end MRR: $34,500
Revenue churn: -1.5% (negative! good!)

Strategies:
✅ Land and expand (start small, grow over time)
✅ Usage-based upsells (more locations, more volume)
✅ Feature-based upgrades (Starter → Pro)
✅ Cross-sell (add-on products/services)
```

### Strategy 2: Decrease CAC

**Tactic A: Optimize Marketing Channels**
```
Channel Performance Analysis:

Google Ads:     $400 CAC (20 customers)  → Pause lowest performers
Content:        $200 CAC (15 customers)  → Double down
Referrals:      $100 CAC (10 customers)  → Incentivize more
Events:         $600 CAC (5 customers)   → Be more selective

Action: Shift budget from $400 CAC to $200 CAC channels
Result: Blended CAC drops from $333 to $250
```

**Tactic B: Improve Conversion Rates**
```
Current Funnel:
1000 visitors → 100 trials (10%) → 25 customers (25%)
Cost per visit: $2 → Cost per trial: $20 → CAC: $80

Improved Funnel:
1000 visitors → 150 trials (15%) → 45 customers (30%)
Cost per visit: $2 → Cost per trial: $13 → CAC: $44

Result: 45% reduction in CAC with same traffic cost
```

**Tactic C: Build Organic Channels**
```
Paid CAC: $333
Organic CAC: $50 (time investment, but no ad spend)

Organic strategies:
✅ Content marketing (blog, SEO)
✅ Word of mouth (referral program)
✅ Community building (Facebook group, Slack)
✅ Product-led growth (viral features)
✅ Partnerships (integrations, co-marketing)

Target: 50% of customers from organic by Year 2
Blended CAC: (50% × $333) + (50% × $50) = $192
```

**Tactic D: Increase Qualified Leads**
```
Problem: Spending $10K, getting 100 leads, 20 trials, 5 customers
→ CAC: $2,000

Solution: Better targeting
→ Spending $10K, getting 50 leads (but qualified), 25 trials, 10 customers
→ CAC: $1,000

How:
✅ Better ICP definition (who's your perfect customer?)
✅ Narrow targeting (restaurants only, not all food service)
✅ Content that pre-qualifies (educational vs promotional)
✅ Lead scoring (focus sales on best prospects)
```

### Strategy 3: Decrease Time to Value

**Why It Matters**:
- Faster time to value = Lower churn
- Lower churn = Higher LTV
- Customers realize value before buyer's remorse sets in

**CoodLoom Time to Value**:
```
Current:
Day 1: Sign up
Day 2-3: Hardware ships
Day 5: Hardware arrives
Day 6-7: Setup and configuration (complex!)
Day 8-10: Training
Day 11: First sale processed
→ 11 days to first value

Goal:
Day 1: Sign up + instant software access
Day 1: Process first sale (use phone as temp hardware)
Day 2-3: Hardware ships (optional for full experience)
Day 5: Hardware arrives and is pre-configured
→ Same day to first value!

Result:
- Reduced early churn (< 30 days)
- Churn: 5% → 3%
- LTV: +66%
```

## Unit Economics by Customer Segment

### Segmentation Analysis

**CoodLoom Customer Segments**:

**Segment 1: Small Cafes (Starter Plan)**
```
Profile: Single location, <50 transactions/day
Plan: Starter ($149/month)
ARPC: $149
CAC: $200 (mostly inbound/organic)
Churn: 4% monthly
LTV: $2,235 ($149 × 0.75 × 20 months)
LTV/CAC: 11.2:1 🟢
Payback: 1.3 months

Analysis: Profitable but smaller revenue
Strategy: Keep acquisition efficient, minimal touch
```

**Segment 2: Restaurants (Pro Plan)**
```
Profile: 1-3 locations, 100-500 transactions/day
Plan: Pro ($299/month)
ARPC: $299 + $99 (avg 1 add-on) = $398
CAC: $400 (more sales touch required)
Churn: 2% monthly
LTV: $11,940 ($398 × 0.75 × 40 months)
LTV/CAC: 29.9:1 💎💎
Payback: 1.3 months

Analysis: Best segment! High value, sticky
Strategy: Focus here, invest more in acquisition
```

**Segment 3: Multi-Location Chains (Enterprise)**
```
Profile: 5+ locations, high volume
Plan: Custom ($1,500+/month)
ARPC: $1,800
CAC: $5,000 (long sales cycle, demos, custom work)
Churn: 1% monthly
LTV: $81,000 ($1,800 × 0.75 × 60 months)
LTV/CAC: 16.2:1 💎
Payback: 3.7 months

Analysis: Huge revenue, but more effort
Strategy: Pursue selectively once product is mature
```

**Portfolio Analysis**:
```
Current Mix:
- 70% Starter: $149 ARPC
- 25% Pro: $398 ARPC
- 5% Enterprise: $1,800 ARPC

Weighted ARPC: $254

Goal Mix (Year 2):
- 50% Starter: $149 ARPC
- 40% Pro: $398 ARPC
- 10% Enterprise: $1,800 ARPC

New Weighted ARPC: $414 (+63%!)
Result: Higher LTV, better unit economics
```

## Cohort Analysis

### Why Cohorts Matter

Track customers by signup month to see trends:

**CoodLoom Cohort Analysis**:
```
          Month 0  Month 3  Month 6  Month 12  Retention
Jan '24:  50 cust  47       45       42        84%
Feb '24:  55 cust  53       51       -         93%
Mar '24:  60 cust  58       -        -         97%

Insights:
✅ Retention improving over time (product getting stickier)
✅ Recent cohorts have better retention (better onboarding)
✅ Month 3 is critical (most churn happens early)

Actions:
→ Focus onboarding improvements on Month 0-3
→ Identify what changed between Jan and Mar
→ Apply learnings to new customers
```

## Advanced Metrics

### 1. Rule of 40

**Definition**: Growth Rate + Profit Margin should be > 40%

```
CoodLoom Year 1:
Revenue Growth Rate: 150% (annualized)
Operating Margin: 25%
Rule of 40 Score: 175 💎💎💎

This is exceptional! High growth + profitable
```

**Benchmarks**:
- < 0: 🔴 Unprofitable and slow growth
- 0-20: 🟡 Needs improvement
- 20-40: 🟢 Good
- 40+: 🟢🟢 Excellent
- 100+: 💎 Exceptional (rare!)

### 2. Burn Multiple

**Definition**: How much capital you burn to generate $1 of ARR

```
Burn Multiple = Net Burn / Net New ARR

CoodLoom (if burning cash):
Monthly burn: $15,000
Net new ARR per month: $60,000 ($5K MRR × 12)
Burn Multiple: $15,000 / $60,000 = 0.25

Lower is better!
```

**Benchmarks**:
- < 1.0: 🟢🟢 Excellent efficiency
- 1.0-1.5: 🟢 Good
- 1.5-2.0: 🟡 Acceptable
- 2.0-3.0: 🟡 Concerning
- 3.0+: 🔴 Very capital intensive

**CoodLoom at 0.25**: Exceptional! Super capital efficient.

### 3. Months to Recover CAC

Same as CAC Payback, but worth emphasizing:

**CoodLoom**: 1.67 months (amazing!)

Target: < 12 months for healthy SaaS

## Exercises

### Exercise 1: Calculate Your Unit Economics
Build a spreadsheet with:
1. CAC calculation (all S&M costs / new customers)
2. LTV calculation (ARPC × margin × lifetime)
3. LTV/CAC ratio
4. CAC payback period
5. Gross margin
6. Magic number (if you have quarterly data)

### Exercise 2: Segment Analysis
Break down your customers (or projected customers) by:
- Plan tier (Starter, Pro, Enterprise)
- Calculate unit economics for each segment
- Which is most profitable?
- Which should you focus on?

### Exercise 3: Sensitivity Analysis
Model these scenarios:
1. CAC increases 25%
2. CAC decreases 25%
3. Churn increases 2%
4. Churn decreases 2%
5. ARPC increases 10%

Which has the biggest impact on profitability?

### Exercise 4: Improvement Plan
List 10 ways you could:
- Increase LTV (5 ideas)
- Decrease CAC (5 ideas)

Prioritize by impact and ease of implementation.

### Exercise 5: Cohort Tracking Setup
Create a cohort analysis template:
- Track retention by signup month
- Monitor for at least 12 months
- Identify patterns and trends
- What's working? What's not?

## Key Takeaways

✓ **Unit economics determine scalability** - Fix them before scaling  
✓ **LTV/CAC ratio must be > 3:1** - Ideally 5:1 or higher  
✓ **CAC payback < 12 months** - Shorter is better for cash flow  
✓ **Churn is the silent killer** - Small improvements have huge impact  
✓ **Segment analysis reveals insights** - Not all customers are equal  
✓ **Track cohorts over time** - See trends and improve retention  
✓ **Magic Number shows sales efficiency** - > 0.75 to scale  
✓ **Gross margins matter** - Higher margins = more reinvestment  
✓ **Improve continuously** - Small improvements compound  
✓ **Don't scale broken unit economics** - Fix first, scale later  

## Next Steps

Move to Chapter 7: **Financial Metrics** to learn the complete dashboard of KPIs every founder must track.

---

**Pro Tip**: Your unit economics will improve over time as you optimize. Don't wait for perfect unit economics to start, but do track them obsessively and improve continuously.
