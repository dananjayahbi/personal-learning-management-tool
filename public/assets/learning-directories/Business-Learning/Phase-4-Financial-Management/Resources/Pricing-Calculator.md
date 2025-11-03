# Pricing Calculator

## Overview
This calculator helps you determine the optimal price for your SaaS product based on costs, value delivered, competitive positioning, and willingness to pay.

**Best used with**: Google Sheets or Excel  
**Time to complete**: 2-4 hours (includes research)  
**Update frequency**: Quarterly or when costs/value significantly changes

---

## Section 1: Current Pricing (CoodLoom Example)

### 1.1 Your Current Pricing Tiers

| Tier | Monthly Price | Annual Price (if offered) | Discount % | Target Customer % |
|------|---------------|---------------------------|------------|-------------------|
| Starter | $149 | $1,490 (2 months free) | 17% | 30% |
| Pro | $299 | $2,990 (2 months free) | 17% | 60% |
| Enterprise | $500+ | Negotiated | Varies | 10% |

**Weighted Average Revenue Per Customer (ARPC)**: $235/month

*Calculation*: ($149 × 0.30) + ($299 × 0.60) + ($500 × 0.10) = $235

---

## Section 2: Cost-Based Pricing Floor

### 2.1 Variable Costs (Per Customer Per Month)

| Cost Category | Amount | Notes |
|---------------|--------|-------|
| Cloud Hosting (AWS/Azure) | $2.77 | Scales with usage/transactions |
| Payment Processing | $4.70 | ~2.5% of $188 average transaction |
| SMS/Notifications | $1.50 | Twilio for order alerts |
| Support Software | $0.50 | Zendesk per-user cost |
| Customer Success (allocated) | $1.00 | 1 CSM per 200 customers = $4K/200 |
| **Total Variable Cost** | **$10.47** | Cost to serve one customer |

### 2.2 Fixed Costs (Allocated Per Customer)

Assuming 150 customers in steady state:

| Cost Category | Monthly Total | Per Customer | Notes |
|---------------|---------------|--------------|-------|
| Sales & Marketing (Amortized) | $6,000 | $40.00 | CAC $300 ÷ 7.5 month payback |
| Product Development | $4,000 | $26.67 | Part-time developer |
| General & Administrative | $1,500 | $10.00 | Office, software, legal, etc. |
| **Total Fixed Cost (Allocated)** | **$11,500** | **$76.67** | |

### 2.3 Total Cost Per Customer

```
Variable Costs:     $10.47
Fixed Costs:        $76.67
━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Cost:         $87.14 per customer per month
```

### 2.4 Pricing Floor with Target Margins

| Scenario | Gross Margin Target | Operating Margin Target | Minimum Price |
|----------|---------------------|-------------------------|---------------|
| **Survival Mode** | 60% | 0% | $87.14 (cover costs) |
| **Bootstrap Viable** | 75% | 20% | $108.93 |
| **VC-Backed Growth** | 80% | 0% | $52.35 (prioritize growth) |
| **Sustainable SaaS** | 80% | 30% | $124.49 |
| **Premium Positioning** | 85% | 40% | $145.23 |

**Formula**: Minimum Price = Total Cost ÷ (1 - Target Gross Margin)

**Example**:
```
Total Cost: $87.14
Target Gross Margin: 80%

Minimum Price = $87.14 ÷ (1 - 0.80)
              = $87.14 ÷ 0.20
              = $435.70 per month
```

**Insight**: Current pricing ($149-500) provides 62-82% gross margin after variable costs, but includes fixed cost allocation. Pure gross margin (revenue - COGS only) is ~96%.

---

## Section 3: Value-Based Pricing Ceiling

### 3.1 Quantifiable Value Delivered to Customer

**CoodLoom Use Case: Small Restaurant (50 tables, $400K annual revenue)**

| Value Category | Monthly Value | Annual Value | Calculation Method |
|----------------|---------------|--------------|-------------------|
| **Labor Savings** | | | |
| Faster order taking | $480 | $5,760 | 2 hours/day × $12/hour × 20 days |
| Reduced order errors | $200 | $2,400 | 10 errors/month × $20 average |
| Simplified training | $100 | $1,200 | 50% faster training, quarterly |
| | | | |
| **Revenue Increase** | | | |
| Table turnover improvement | $1,333 | $16,000 | 5% faster turnover × $8K/table/year × 50 tables |
| Upselling features | $200 | $2,400 | Suggested items increase ticket 3% |
| Reduced walkouts | $150 | $1,800 | Better waitlist management |
| | | | |
| **Cost Reduction** | | | |
| Inventory optimization | $250 | $3,000 | Reduce waste by 10% |
| Better reporting (tax time) | $67 | $800 | Save 8 hours × $100/hour |
| Eliminate manual receipts | $25 | $300 | Paper, ink, storage |
| | | | |
| **Total Quantifiable Value** | **$2,805** | **$33,660** | |

### 3.2 Value-Based Price Calculation

**Common Pricing Models vs Customer Value**:

| Pricing Model | Monthly Price | % of Value Captured | Customer ROI |
|---------------|---------------|---------------------|--------------|
| **10% of value** | $281 | 10% | 900% ROI (10x return) |
| **20% of value** | $561 | 20% | 400% ROI (5x return) |
| **30% of value** | $842 | 30% | 233% ROI (3.3x return) |
| **50% of value** | $1,403 | 50% | 100% ROI (2x return) |

**SaaS Best Practice**: Capture 10-20% of value delivered

**CoodLoom Current Pricing Analysis**:
```
Pro Tier Price: $299/month
Value Delivered: $2,805/month
Value Captured: 10.7%
Customer ROI: 838% (9.4x return)

✅ Great positioning: Customer gets 9x return on investment
✅ Strong retention driver: Customer would be foolish to churn
⚠️ Potential to raise prices (only capturing 10.7% of value)
```

### 3.3 Perceived Value (Qualitative Benefits)

Beyond quantifiable ROI, customers value:

| Benefit | Perceived Value | Pricing Implication |
|---------|-----------------|---------------------|
| Peace of mind | High | Can charge premium |
| Modern, professional image | Medium | Justifies mid-tier pricing |
| Business insights/analytics | High | Premium feature |
| 24/7 support | Medium | Can be add-on |
| Easy to use (less stress) | High | Justifies higher price |
| Cloud-based (access anywhere) | Medium | Table stakes for SaaS |
| Reliability (uptime) | High | Can charge premium |

**Premium Positioning Opportunity**: Emphasize peace of mind, insights, and reliability to justify $399-499 pricing.

---

## Section 4: Competitive Pricing Analysis

### 4.1 Direct Competitors

| Competitor | Starter Tier | Mid Tier | Enterprise | Target Market | Positioning |
|------------|--------------|----------|------------|---------------|-------------|
| **Square POS** | $0 (+ fees) | $60/mo | $300/mo | Very small | Low-cost, simple |
| **Toast POS** | $69/mo | $165/mo | Custom | Small-medium | Feature-rich |
| **Lightspeed** | $69/mo | $189/mo | $399/mo | Medium | Retail + restaurant |
| **TouchBistro** | $69/mo | $229/mo | Custom | Full-service | iPad-based |
| **Clover** | $60/mo | $185/mo | Custom | Small-medium | Hardware focus |
| **CoodLoom** | $149/mo | $299/mo | $500/mo | Small | Modern, cloud |

### 4.2 Pricing Positioning Strategy

**Positioning Map**:
```
High Price
    ↑
    │     [TouchBistro Enterprise]
    │     [CoodLoom Enterprise]
    │     [Lightspeed Pro]
    │  [CoodLoom Pro: $299]
    │  [TouchBistro Mid][Toast Mid]
    │  [Lightspeed][Clover]
    │  [CoodLoom Starter: $149]
    │  [Toast][Square Paid]
    │  [Square Free]
    │
    └──────────────────────────────→ High Features
Low Price                              Low Features
```

**CoodLoom Current Position**: 
- Mid-to-high pricing
- Mid-to-high features
- **Risk**: Positioned between "good enough and cheap" (Square) and "premium full-featured" (TouchBistro)

**Strategic Options**:
1. **Option A**: Lower price to $99-199 range (compete on value)
2. **Option B**: Raise price to $399-599 range (compete on premium)
3. **Option C**: Keep current pricing (middle ground)

### 4.3 Competitive Price Gaps

| Price Point | Competitors at This Level | Opportunity |
|-------------|---------------------------|-------------|
| $0-50 | Square Free, Square Basic | ❌ Race to bottom |
| $50-99 | Toast Basic, TouchBistro Basic | ⚠️ Crowded |
| $100-199 | CoodLoom Starter, Lightspeed | ⚠️ Competitive |
| $200-299 | CoodLoom Pro, TouchBistro Mid | ✅ Viable |
| $300-499 | Lightspeed Pro, Clover Pro | ✅ Gap opportunity |
| $500+ | Enterprise Custom | ✅ Underserved |

**Recommendation**: $299 Pro tier is well-positioned. Consider adding $399-449 "Premium" tier with advanced features.

---

## Section 5: Willingness to Pay Research

### 5.1 Customer Interview Results

**Question**: "What would you be willing to pay monthly for a POS system that saves you 10 hours/week and increases revenue 5%?"

| Customer Type | Min Price | Expected Price | Max Price | Notes |
|---------------|-----------|----------------|-----------|-------|
| Food truck (micro) | $29 | $79 | $149 | Price-sensitive, low revenue |
| Coffee shop (small) | $79 | $149 | $249 | Moderate budget, values simplicity |
| Restaurant (small) | $149 | $299 | $499 | Higher revenue, values reliability |
| Restaurant (medium) | $299 | $499 | $799 | Need advanced features |
| Restaurant (large) | $499 | $899 | Custom | Complex needs, integration |

**Insights**:
- Current Starter ($149) aligns with small customer max willingness
- Current Pro ($299) is at expected price for small restaurants
- Room to introduce Premium tier at $399-499
- Enterprise pricing likely under-priced (should be $799-1,200)

### 5.2 Van Westendorp Price Sensitivity Meter

Survey question results (100 respondents - small restaurant owners):

| Price Point | Too Cheap % | Cheap % | Expensive % | Too Expensive % |
|-------------|-------------|---------|-------------|------------------|
| $49 | 62% | 35% | 2% | 1% |
| $99 | 38% | 48% | 12% | 2% |
| $149 | 18% | 52% | 25% | 5% |
| $199 | 8% | 42% | 38% | 12% |
| $249 | 3% | 28% | 49% | 20% |
| $299 | 1% | 18% | 55% | 26% |
| $349 | 0% | 12% | 58% | 30% |
| $399 | 0% | 7% | 60% | 33% |
| $499 | 0% | 2% | 55% | 43% |

**Key Findings**:
- **Optimal Price Point (OPP)**: $249 (intersection of "cheap" and "expensive")
- **Indifference Price Point (IPP)**: $179 (intersection of "too cheap" and "too expensive")
- **Price Range**: $179-249 is acceptable to most customers
- **CoodLoom Starter at $149**: Slightly below optimal (leaving money on table)
- **CoodLoom Pro at $299**: Slightly above optimal (may resist upgrades)

**Recommendation**: Consider $169 Starter, $269 Pro, $399 Premium structure

---

## Section 6: Pricing Strategy Scenarios

### 6.1 Scenario A: Lower Prices (Volume Play)

**New Pricing**:
- Starter: $99 (was $149)
- Pro: $199 (was $299)
- Enterprise: $399 (was $500)

**Assumptions**:
- Customer acquisition increases 50% (price elasticity)
- Churn decreases 25% (better retention at lower price)
- CAC stays same ($300)

**Year 1 Projections**:
```
Customers (end): 201 (vs 151 in base)
ARPC: $157 (vs $235)
ARR: $378,828 (vs $425,700)
Gross Margin: 93.3% (vs 92.2%)
Net Income: $214,828 (vs $264,135)

✅ Pros: More customers, faster growth, lower churn
❌ Cons: Lower revenue, lower profits, harder to raise prices later
```

**Verdict**: ⚠️ Only do this if you want to prioritize growth > profit

### 6.2 Scenario B: Raise Prices (Premium Play)

**New Pricing**:
- Starter: $199 (was $149)
- Pro: $399 (was $299)
- Enterprise: $799 (was $500)

**Assumptions**:
- Customer acquisition decreases 30% (price resistance)
- Churn increases 15% (some price out)
- CAC increases 20% (harder to close)

**Year 1 Projections**:
```
Customers (end): 106 (vs 151 in base)
ARPC: $358 (vs $235)
ARR: $455,472 (vs $425,700)
Gross Margin: 97.1% (vs 92.2%)
Net Income: $311,472 (vs $264,135)

✅ Pros: Higher revenue per customer, better margins, premium brand
❌ Cons: Fewer customers, higher churn risk, need better support
```

**Verdict**: ✅ Recommended if you can deliver premium value and support

### 6.3 Scenario C: Add Mid-Tier (Goldilocks)

**New Pricing**:
- Starter: $149 (same)
- **Plus: $229** (NEW)
- Pro: $329 (was $299)
- Enterprise: $599 (was $500)

**Assumptions**:
- 40% choose Plus (cannibalize from Starter and Pro)
- Overall ARPC increases to $265
- No impact on acquisition or churn

**Year 1 Projections**:
```
Customers (end): 151 (same)
ARPC: $265 (vs $235)
ARR: $480,180 (vs $425,700)
Gross Margin: 96.1% (vs 92.2%)
Net Income: $326,180 (vs $264,135)

✅ Pros: Higher revenue without losing customers, better tiering
❌ Cons: More complexity in positioning, sales, and support
```

**Verdict**: ✅ Strong option - best of both worlds

### 6.4 Recommended Pricing Strategy

**Phase 1 (Months 1-12): Current Pricing**
```
Starter: $149
Pro: $299
Enterprise: $500+
```
*Rationale*: Validate product-market fit before optimizing price

**Phase 2 (Months 13-24): Add Premium Tier**
```
Starter: $149
Pro: $299
Premium: $399 (NEW - advanced analytics, priority support)
Enterprise: Custom ($799+)
```
*Rationale*: Capture customers willing to pay more without disrupting base

**Phase 3 (Months 25-36): Increase All Tiers**
```
Starter: $169 (+$20)
Pro: $329 (+$30)
Premium: $449 (+$50)
Enterprise: Custom ($999+)
```
*Rationale*: Grandfathering existing customers, new customers pay more

**Phase 4 (Year 3+): Premium Positioning**
```
Starter: $199
Pro: $399
Premium: $599
Enterprise: Custom ($1,200+)
```
*Rationale*: Established brand, proven value, can command premium

---

## Section 7: Pricing Psychology & Tactics

### 7.1 Psychological Pricing

| Tactic | Example | Impact | Use Case |
|--------|---------|--------|----------|
| **Charm Pricing** | $299 vs $300 | 2-3% lift | Consumer products |
| **Prestige Pricing** | $300 vs $299 | Premium positioning | Luxury/B2B |
| **Decoy Pricing** | $149/$299/$450 | 30% choose mid | Encourage upsell |
| **Anchoring** | Show $599 "value" | Perception of deal | Sales pages |
| **Price Ending in 9** | $199 vs $200 | 8-12% lift | Mid-market |
| **Round Numbers** | $500 vs $499 | Enterprise feel | High-end B2B |

**Recommendation for CoodLoom**:
- Starter: $149 (charm pricing for price-sensitive)
- Pro: $299 (charm pricing, feels like $200s not $300s)
- Premium: $450 (decoy, not meant to sell)
- Enterprise: $800 or $1,000 (round numbers, prestige)

### 7.2 Tiering Strategy (Good-Better-Best)

**The Psychology**:
- Most customers avoid extremes (cheapest and most expensive)
- "Better" tier gets 50-60% of sales
- "Best" tier makes "Better" look reasonable (anchoring)

**CoodLoom Example**:
```
Starter: $149 ← 30% of customers (price-sensitive)
Pro: $299 ← 60% of customers ("best value")
Premium: $450 ← 10% of customers (need advanced features)
```

**Feature Differentiation**:
| Feature | Starter | Pro | Premium |
|---------|---------|-----|---------|
| Terminals | 1 | 3 | Unlimited |
| Users | 3 | 10 | Unlimited |
| Menu items | 100 | Unlimited | Unlimited |
| Basic reports | ✓ | ✓ | ✓ |
| Advanced analytics | - | ✓ | ✓ |
| API access | - | - | ✓ |
| Priority support | - | - | ✓ |
| Custom integrations | - | - | ✓ |
| Dedicated account manager | - | - | ✓ |

**Key Principle**: Each tier should be "good enough" for its target customer, with clear reasons to upgrade.

### 7.3 Discounting Strategy

**Annual Prepay Discount**:
```
Monthly: $299/month = $3,588/year
Annual: $2,990/year (2 months free = 17% discount)

Benefits:
- Customer saves $598 (incentive)
- You get $2,990 cash upfront (improve cash flow)
- Reduces churn (committed for year)
```

**When to Discount**:
| Scenario | Discount | Justification |
|----------|----------|---------------|
| Annual prepay | 10-20% | Cash flow + commitment |
| Non-profit | 20-30% | Goodwill + tax benefit |
| Startup (<2 years) | 25-50% | Case study + feedback |
| Referral | $100-500 credit | Customer acquisition |
| Volume (5+ locations) | 15-25% | Lower support cost per unit |
| Pilot/Trial | 50% for 3 months | Risk reduction |

**When NOT to Discount**:
❌ Customer just says "it's too expensive" (negotiate value, not price)  
❌ Competitor has lower price (compete on value, not price)  
❌ Customer wants to "think about it" (offer trial, not discount)  
❌ Every deal (trains market that you're negotiable)  

**Discount Authority Levels**:
```
Salesperson: Up to 10% off
Sales Manager: Up to 20% off
CEO/Founder: Up to 30% off (rare, strategic deals only)
Board approval: >30% (basically never)
```

### 7.4 Pricing Page Optimization

**Best Practices**:

1. **Highlight Recommended Tier**
```
[ Starter ]  [ PRO ★ MOST POPULAR ]  [ Premium ]
             ← Visual emphasis here
```

2. **Show Annual Savings**
```
$299/month
or $249/month (billed annually) ← "Save $600/year!"
```

3. **Feature Comparison Table**
```
[Feature]          Starter  Pro  Premium
Basic POS            ✓      ✓      ✓
Advanced Analytics   -      ✓      ✓
API Access           -      -      ✓
```

4. **Social Proof**
```
"Join 500+ restaurants using CoodLoom"
"Rated 4.8/5 stars"
"Featured in Restaurant Tech News"
```

5. **Money-Back Guarantee**
```
"Try risk-free for 30 days. Not satisfied? Full refund, no questions asked."
```

6. **Custom Enterprise CTA**
```
"Need custom integrations or 10+ locations? Talk to sales →"
```

---

## Section 8: Pricing Changes & Communication

### 8.1 Grandfathering Existing Customers

**Option A: Full Grandfather (Best for Retention)**
```
Existing customers: Keep $299/month forever
New customers: Pay $329/month

Pros: ✅ Zero churn risk, customers feel valued
Cons: ❌ Two-tier pricing complexity, leave money on table
```

**Option B: Partial Grandfather (Balanced)**
```
Existing customers: Keep $299/month for 12 months, then $329
New customers: Pay $329/month immediately

Pros: ✅ Reasonable, gives notice, eventual parity
Cons: ⚠️ Some churn when price increases
```

**Option C: No Grandfather (Revenue-Focused)**
```
Everyone moves to $329/month in 90 days

Pros: ✅ Maximize revenue, simplicity
Cons: ❌ Churn risk, negative PR, customer anger
```

**Recommendation**: Option B (partial grandfather) balances retention and revenue

### 8.2 Price Increase Communication Template

**Email to Existing Customers**:

```
Subject: CoodLoom Pricing Update - Your Rate Locked Until [Date]

Hi [Customer Name],

I wanted to personally reach out about an important update to CoodLoom's pricing.

**What's Changing**
Starting [Date], our Pro plan will be $329/month for new customers (currently $299).

**What This Means for You**
Your current rate of $299/month is locked in until [Date + 12 months]. After that, your rate will increase to $329/month.

**Why We're Raising Prices**
Over the past year, we've added:
- Advanced analytics dashboard
- 10+ new integrations
- 24/7 priority support
- Mobile app for remote management

These improvements have significantly increased the value we deliver, and our pricing needs to reflect that investment.

**Questions?**
Reply to this email or call me directly at [phone]. I'm here to help.

Thank you for being a valued CoodLoom customer.

[Founder Name]
Founder & CEO, CoodLoom
```

**Key Elements**:
- Personal tone (from founder, not "CoodLoom Team")
- Clear explanation of what's changing
- Grandfather period (you're protected)
- Justification (new value delivered)
- Easy way to ask questions
- Appreciation for their business

### 8.3 Handling Price Objections

**Objection**: "Your competitor is $200/month cheaper"

**Response**:
```
"I appreciate you doing your research. Let me show you why CoodLoom is worth the investment.

[Pull up ROI calculator]

CoodLoom saves the average restaurant $2,500/month through:
- Faster table turnover: +$1,200/month
- Reduced order errors: -$200/month
- Labor savings: -$500/month
- Better inventory management: -$300/month
- Increased upsells: +$300/month

At $299/month, you're getting 8.4x return on your investment.

The $200/month competitor might save you $100/month in software costs, but you'll lose $2,500/month in value. That's a $2,400/month mistake.

Would you rather save $100 or make $2,400?"
```

**Key Tactic**: Reframe from cost to investment and ROI

**Objection**: "I need to think about it"

**Response**:
```
"Absolutely, this is an important decision. Can I ask what specifically you'd like to think about?

[Listen, address concerns]

How about this: Let's start with a 30-day trial at no cost. You'll see the ROI firsthand, and then you can decide. Fair?

We can even help you calculate your exact ROI with your actual numbers in the first week. Deal?"
```

**Key Tactic**: Trial removes risk, calculator proves value

---

## Section 9: Advanced Pricing Models

### 9.1 Usage-Based Pricing

**Current Model**: Flat monthly fee ($149-500)

**Alternative**: Price based on transactions or revenue

| Model | Pricing Structure | Pros | Cons |
|-------|-------------------|------|------|
| **Per Transaction** | $0.10 per order | Scales with customer size | Unpredictable revenue |
| **% of GMV** | 1% of gross merchandise value | Aligned incentives | Complex tracking |
| **Hybrid** | $99 base + $0.05 per order | Predictable + scalable | More complex |

**Example Hybrid Pricing**:
```
Starter: $99/month + $0.05/transaction
Pro: $199/month + $0.03/transaction
Premium: $299/month + $0.01/transaction

Restaurant with 3,000 orders/month:
- Starter: $99 + $150 = $249/month
- Pro: $199 + $90 = $289/month
- Premium: $299 + $30 = $329/month
```

**When to Use**: If customers vary widely in size/usage

### 9.2 Freemium Model

**Current Model**: Paid tiers only

**Alternative**: Free tier with paid upgrades

| Tier | Price | Limits | Conversion Target |
|------|-------|--------|-------------------|
| Free | $0 | 1 terminal, 50 orders/month | Trial + brand building |
| Starter | $149 | 2 terminals, unlimited orders | 10-15% of free users |
| Pro | $299 | 5 terminals, advanced features | 30-40% of paid users |

**Freemium Economics**:
```
Assumption: 1,000 free users, 10% convert to Starter

Free users: 1,000 × $0 = $0 revenue
Paid Starter: 100 × $149 = $14,900/month
Paid Pro: 50 × $299 = $14,950/month
Total MRR: $29,850

Cost to serve 1,000 free users: ~$10,000/month (support + hosting)
Net: $19,850/month

Need 10% conversion or will lose money
```

**Recommendation**: Don't do freemium unless you have viral growth mechanism

### 9.3 Outcome-Based Pricing

**Current Model**: Charge for software

**Alternative**: Charge based on results delivered

**Example**:
```
"We charge 10% of the revenue increase we deliver"

Restaurant currently does $30K/month
After CoodLoom: $33K/month (+10% increase)
Your fee: $300/month (10% of $3K increase)

If we don't increase revenue, you don't pay.
```

**Pros**:
- ✅ Eliminates customer risk
- ✅ Unlimited upside for you
- ✅ Aligned incentives
- ✅ Easier to close deals

**Cons**:
- ❌ Hard to measure (attribution)
- ❌ Unpredictable revenue
- ❌ Customer may game the system
- ❌ Requires tracking/auditing

**When to Use**: If you have clear, measurable impact on customer revenue

---

## Section 10: Pricing Checklist

### Before Launching Pricing

- [ ] Calculate cost floor (variable + allocated fixed costs)
- [ ] Calculate value ceiling (quantified customer ROI)
- [ ] Research competitor pricing (3-5 competitors)
- [ ] Survey target customers on willingness to pay (20+ responses)
- [ ] Design 3 tiers (good-better-best)
- [ ] Set price points in profitable range between floor and ceiling
- [ ] Create feature differentiation matrix
- [ ] Design pricing page with recommended tier highlighted
- [ ] Prepare ROI calculator for sales conversations
- [ ] Set discount authority levels
- [ ] Write price objection responses
- [ ] Test pricing with 10 pilot customers

### Quarterly Price Review

- [ ] Review actual costs vs forecast (update floor)
- [ ] Survey customers on value delivered (update ceiling)
- [ ] Monitor competitor pricing changes
- [ ] Analyze customer distribution across tiers
- [ ] Calculate average revenue per customer (ARPC)
- [ ] Measure conversion rate by tier
- [ ] Track win/loss reasons (price objections?)
- [ ] Measure churn rate (price-related?)
- [ ] Evaluate need for price change
- [ ] If changing, plan communication and grandfathering

### Price Increase Checklist

- [ ] Justify with new value delivered
- [ ] Grandfather existing customers (6-12 months)
- [ ] Email notification 90 days in advance
- [ ] Offer annual prepay at old rate (last chance)
- [ ] Provide FAQ document
- [ ] Train support team on objection handling
- [ ] Monitor churn in first 30 days
- [ ] Adjust if churn >10%

---

## Section 11: Your Pricing Action Plan

### Step 1: Calculate Your Pricing (Week 1)

- [ ] List all variable costs per customer
- [ ] List all fixed costs and allocate per customer
- [ ] Calculate total cost and minimum viable price
- [ ] Quantify value delivered to ideal customer
- [ ] Calculate value-based price (10-20% of value)
- [ ] Set floor (cost × 1.5) and ceiling (value × 0.20)

### Step 2: Research Market (Week 2)

- [ ] List 3-5 direct competitors
- [ ] Document their pricing tiers
- [ ] Map features vs price (competitive matrix)
- [ ] Survey 20+ target customers on willingness to pay
- [ ] Interview 5 customers on value perception
- [ ] Identify pricing gaps and opportunities

### Step 3: Design Pricing (Week 3)

- [ ] Create 3-tier structure (Starter/Pro/Premium)
- [ ] Set price points within floor-ceiling range
- [ ] Differentiate features by tier
- [ ] Design pricing page
- [ ] Create annual discount (15-20%)
- [ ] Write value propositions for each tier
- [ ] Build ROI calculator

### Step 4: Test & Launch (Week 4)

- [ ] Test pricing with 5-10 pilot customers
- [ ] Gather feedback on price/value perception
- [ ] Adjust based on feedback
- [ ] Launch publicly
- [ ] Monitor conversion rates by tier
- [ ] Track price objections
- [ ] Iterate monthly

---

## Templates & Tools

### ROI Calculator Spreadsheet

Download and customize for your business:
```
[Customer Name]'s CoodLoom ROI Calculator

Current State:
- Annual Revenue: $________
- Number of Orders/Month: $________
- Labor Cost/Month: $________
- Current POS Cost: $________

With CoodLoom:
+ Revenue Increase (5% faster turnover): $________
+ Labor Savings (2 hours/day): $________
- CoodLoom Cost: $________
= Net Monthly Benefit: $________

ROI: [____]% return on investment
```

### Pricing Page Template

```html
<pricing-section>
  <tier name="Starter">
    <price>$149/month</price>
    <annual-option>$1,490/year (save $598)</annual-option>
    <features>
      - 2 terminals
      - 5 users
      - Basic reports
    </features>
    <cta>Start Free Trial</cta>
  </tier>
  
  <tier name="Pro" highlighted="true">
    <badge>Most Popular</badge>
    <price>$299/month</price>
    <annual-option>$2,990/year (save $598)</annual-option>
    <features>
      - 5 terminals
      - 15 users
      - Advanced analytics
      - Priority support
    </features>
    <cta>Start Free Trial</cta>
  </tier>
  
  <tier name="Enterprise">
    <price>Custom</price>
    <features>
      - Unlimited terminals
      - Unlimited users
      - Custom integrations
      - Dedicated account manager
    </features>
    <cta>Talk to Sales</cta>
  </tier>
</pricing-section>
```

---

## Next Steps

1. **Complete cost analysis** (Section 2) with your actual numbers
2. **Quantify value delivered** (Section 3) to your ideal customer
3. **Research 3-5 competitors** (Section 4) and document pricing
4. **Set initial pricing** between your cost floor and value ceiling
5. **Test with 10 customers** and gather feedback
6. **Launch and monitor** conversion rates and price objections
7. **Review quarterly** and adjust based on learnings

**Remember**: Pricing is not set-it-and-forget-it. It's a continuous experiment. Most founders under-price initially. It's easier to lower prices than raise them, so err on the side of pricing higher and validating with real customers.

**Pro Tip**: Add a line in your monthly financial review: "Should we test a price increase?" If the answer is yes 3 months in a row, do it.
