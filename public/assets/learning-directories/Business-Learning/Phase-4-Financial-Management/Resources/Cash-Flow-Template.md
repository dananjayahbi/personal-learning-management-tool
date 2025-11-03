# Cash Flow Template

## Overview
This 13-week rolling cash flow forecast helps you predict and manage your cash position. It's the #1 tool to avoid running out of money.

**Update frequency**: Weekly  
**Time investment**: 30-60 minutes per week  
**Best used with**: Google Sheets or Excel  

---

## Why 13 Weeks?

- **Quarter visibility**: See full quarter ahead
- **Weekly granularity**: Catch issues early
- **Rolling forecast**: Always looking 13 weeks forward
- **Industry standard**: What banks and investors expect

**Key Insight**: Profit ≠ Cash. You can be "profitable" on paper but run out of cash if timing is off.

---

## Section 1: Template Structure

### Header Information
```
Company: [CoodLoom]
Forecast Period: [Week Starting MM/DD/YYYY]
Last Updated: [MM/DD/YYYY]
Updated By: [Name]
Current Cash Balance: [$XXX,XXX]
Minimum Cash Reserve: [$25,000]
```

---

## Section 2: 13-Week Cash Flow Forecast

### Column Headers

| Week # | Week Starting | Cash In | Cash Out | Net Cash Flow | Ending Cash | Weeks Runway |
|--------|---------------|---------|----------|---------------|-------------|--------------|

### Example: CoodLoom Weeks 1-13

| Week | Starting | Cash In | Cash Out | Net Flow | Ending Cash | Runway |
|------|----------|---------|----------|----------|-------------|--------|
| 1 | Jan 1 | $12,500 | $8,200 | $4,300 | $54,300 | 13+ |
| 2 | Jan 8 | $15,200 | $9,100 | $6,100 | $60,400 | 13+ |
| 3 | Jan 15 | $11,800 | $7,500 | $4,300 | $64,700 | 13+ |
| 4 | Jan 22 | $18,500 | $12,300 | $6,200 | $70,900 | 13+ |
| 5 | Jan 29 | $14,200 | $8,900 | $5,300 | $76,200 | 13+ |
| 6 | Feb 5 | $13,600 | $10,200 | $3,400 | $79,600 | 13+ |
| 7 | Feb 12 | $16,800 | $9,500 | $7,300 | $86,900 | 13+ |
| 8 | Feb 19 | $19,200 | $11,800 | $7,400 | $94,300 | 13+ |
| 9 | Feb 26 | $15,700 | $8,600 | $7,100 | $101,400 | 13+ |
| 10 | Mar 5 | $17,300 | $9,900 | $7,400 | $108,800 | 13+ |
| 11 | Mar 12 | $21,500 | $13,200 | $8,300 | $117,100 | 13+ |
| 12 | Mar 19 | $18,900 | $10,700 | $8,200 | $125,300 | 13+ |
| 13 | Mar 26 | $20,400 | $11,500 | $8,900 | $134,200 | 13+ |

**Runway Calculation**: Ending Cash ÷ Average Weekly Burn Rate

---

## Section 3: Cash Inflows (Detailed)

### 3.1 Recurring Revenue Collections

| Week | MRR Billing | Setup Fees | Hardware Sales | Total Inflows |
|------|-------------|------------|----------------|---------------|
| 1 | $10,000 | $1,500 | $1,000 | $12,500 |
| 2 | $12,500 | $1,700 | $1,000 | $15,200 |
| 3 | $9,500 | $1,500 | $800 | $11,800 |
| 4 | $15,000 | $2,000 | $1,500 | $18,500 |

**Notes**:
- MRR billing happens on customer anniversary dates (spread throughout month)
- Setup fees collected upon contract signing
- Hardware sales collected at delivery (typically within 1 week)

### 3.2 Payment Timing Assumptions

| Revenue Type | Collection Terms | Typical Delay | Notes |
|--------------|------------------|---------------|-------|
| MRR (Credit Card) | Immediate | 1-2 days | Stripe auto-charge |
| MRR (ACH) | Net 7 | 7-10 days | Some enterprise customers |
| Setup Fees | 50% upfront, 50% at launch | 0 days, 14 days | Standard terms |
| Hardware Sales | Due on delivery | 0-7 days | Cash or card |
| Training Services | Due upon completion | 0-7 days | Usually immediate |

**Key Insight**: Even though you recognize revenue monthly (accrual accounting), cash comes in based on these timing rules.

### 3.3 Other Potential Inflows

| Source | Timing | Amount | Likelihood |
|--------|--------|--------|------------|
| Founder Investment | Week 1 | $50,000 | 100% |
| Seed Round | Week 20 | $500,000 | 60% |
| Line of Credit | As needed | $100,000 | Available |
| Customer Deposits | Varies | $500-2,000 | Ongoing |
| Refunds/Credits | Varies | Small | Occasional |

---

## Section 4: Cash Outflows (Detailed)

### 4.1 Personnel Costs

| Expense | Frequency | Amount | Week Paid | Notes |
|---------|-----------|--------|-----------|-------|
| Founder 1 Salary | Bi-weekly | $0 | - | Deferred |
| Founder 2 Salary | Bi-weekly | $0 | - | Deferred |
| Developer (Part-time) | Monthly | $4,000 | 1st of month | Starting Month 7 |
| Sales Rep (Contract) | Monthly | $3,000 | 1st of month | Starting Month 10 |
| Payroll Taxes | Quarterly | $500 | Week 13, 26, 39, 52 | 15% of payroll |

**Weekly View (Month 10)**:
| Week | Salaries | Payroll Tax | Total Personnel |
|------|----------|-------------|-----------------|
| 1 | $7,000 | $0 | $7,000 |
| 2 | $0 | $0 | $0 |
| 3 | $0 | $0 | $0 |
| 4 | $0 | $0 | $0 |

### 4.2 Cost of Goods Sold (Variable)

| Expense | Per Customer/Month | Total Customers | Weekly Cost | Notes |
|---------|-------------------|-----------------|-------------|-------|
| Cloud Hosting (AWS) | $2.77 | 150 | $96 | Scales with usage |
| Payment Processing | $4.70 | 150 | $163 | 2.5% of collections |
| SMS/Notifications | $1.50 | 150 | $52 | Twilio charges |
| Support Software | $0.50 | 150 | $17 | Zendesk per user |
| **Total Variable COGS** | **$9.47** | **150** | **$328** | |

**Formula**: (Cost per Customer × Total Customers) ÷ 4.33 weeks/month

### 4.3 Fixed Operating Expenses

| Expense | Amount | Frequency | Week Paid | Annual Total |
|---------|--------|-----------|-----------|--------------|
| **Software & Tools** | | | | |
| Development Tools (GitHub, etc.) | $100 | Monthly | 1 | $1,200 |
| CRM (HubSpot Starter) | $50 | Monthly | 1 | $600 |
| Analytics (Mixpanel) | $75 | Monthly | 1 | $900 |
| Accounting (QuickBooks) | $70 | Monthly | 1 | $840 |
| | | | | |
| **Office & Admin** | | | | |
| Coworking Space | $300 | Monthly | 1 | $3,600 |
| Office Supplies | $50 | Monthly | 1 | $600 |
| Internet/Phone | $150 | Monthly | 1 | $1,800 |
| | | | | |
| **Professional Services** | | | | |
| Accountant/CPA | $400 | Quarterly | 13, 26, 39, 52 | $1,600 |
| Legal Retainer | $500 | Monthly | 1 | $6,000 |
| Insurance (Business) | $200 | Monthly | 1 | $2,400 |
| | | | | |
| **Marketing & Sales** | | | | |
| Google Ads | $1,500 | Weekly | Every week | $78,000 |
| Content Marketing | $800 | Bi-weekly | 1, 3, 5, 7, 9, 11, 13 | $20,800 |
| Sales Tools (LinkedIn) | $80 | Monthly | 1 | $960 |
| | | | | |
| **Total Fixed Expenses** | **~$8,000** | **Per week avg** | | **$119,300/year** |

### 4.4 Discretionary/One-Time Expenses

| Expense | Amount | Week | Category | Approval Required |
|---------|--------|------|----------|-------------------|
| New laptop for developer | $2,500 | 8 | Equipment | CEO |
| Conference ticket (SaaStr) | $1,200 | 15 | Marketing | CEO |
| Website redesign | $5,000 | 10-12 | Marketing | Board |
| Legal (incorporation docs) | $3,000 | 2 | Legal | CEO |
| Office furniture | $1,500 | 4 | Office | CEO |

**Note**: Include these in your forecast when committed, not when "thinking about it."

---

## Section 5: Cash Position Analysis

### 5.1 Key Metrics

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| **Current Cash Balance** | $54,300 | - | - |
| **Weekly Burn Rate (Avg)** | $8,500 | <$10,000 | ✅ Good |
| **Weeks of Runway** | 13+ | >13 weeks | ✅ Good |
| **Monthly Burn Rate** | $36,833 | <$43,333 | ✅ Good |
| **Months of Runway** | Infinite (profitable) | >6 months | ✅ Excellent |
| **Minimum Cash Target** | $25,000 | $25,000 | ✅ Met |
| **Cash Velocity** | +$5,862/week | Positive | ✅ Growing |

### 5.2 Burn Rate Calculation

**Weekly Burn Rate** = (Total Cash Out - Total Cash In) averaged over 4 weeks

Example:
```
Week 1: Out $8,200 - In $12,500 = -$4,300 (cash increase)
Week 2: Out $9,100 - In $15,200 = -$6,100 (cash increase)
Week 3: Out $7,500 - In $11,800 = -$4,300 (cash increase)
Week 4: Out $12,300 - In $18,500 = -$6,200 (cash increase)

Average weekly burn: -$5,225 (negative = growing cash)
```

**If you're growing cash**, you're "cash flow positive" - congrats!  
**If burning cash**, divide cash balance by weekly burn to get runway.

### 5.3 Runway Scenarios

**Current State (13+ weeks runway)**:
```
Cash: $54,300
Weekly burn: Growing cash (negative burn)
Runway: Infinite (profitable)
Status: ✅ Healthy
```

**Scenario: If burn was $5,000/week**:
```
Cash: $54,300
Weekly burn: $5,000
Runway: 10.9 weeks
Status: ⚠️ Caution (need plan to extend)
```

**Scenario: If burn was $10,000/week**:
```
Cash: $54,300
Weekly burn: $10,000
Runway: 5.4 weeks
Status: 🚨 Critical (need immediate action)
```

**Action Thresholds**:
- **>26 weeks (6 months)**: ✅ Healthy, focus on growth
- **13-26 weeks (3-6 months)**: ⚠️ Plan fundraise or cut costs
- **6-13 weeks (1.5-3 months)**: 🚨 Execute plan now
- **<6 weeks**: 🆘 Emergency mode

---

## Section 6: Weekly Update Process

### Every Monday Morning (30-60 minutes)

**Step 1: Update Actual Cash (5 min)**
```
1. Log into bank account
2. Record actual ending cash balance (Friday close)
3. Compare to forecast
4. Note variance (why different?)
```

**Step 2: Update Previous Week Actuals (10 min)**
```
1. Review all transactions from previous week
2. Categorize into inflows/outflows
3. Update "Actual" column in forecast
4. Compare to forecast, note why different
```

**Step 3: Roll Forward One Week (10 min)**
```
1. Delete Week 1 row (now in the past)
2. Add new Week 14 row (13 weeks out)
3. Copy formulas and categories forward
4. Estimate Week 14 based on trends
```

**Step 4: Update Near-Term Weeks (20 min)**
```
1. Review Weeks 2-4 for upcoming payments
2. Update based on new information:
   - Confirmed new customers
   - Invoices sent
   - Bills due
   - Payroll dates
3. Adjust amounts if circumstances changed
```

**Step 5: Review and Flag Issues (15 min)**
```
1. Recalculate runway
2. Check if any weeks dip below minimum cash
3. Flag large outflows (>$5K)
4. Note any concerning trends
5. Create action items if needed
```

**Step 6: Communicate (5 min)**
```
1. Email co-founder if runway <13 weeks
2. Update board if runway <26 weeks
3. Celebrate if cash grew faster than forecast
```

---

## Section 7: Improving Cash Flow

### 7.1 Accelerate Inflows

| Strategy | Implementation | Impact | Difficulty |
|----------|----------------|--------|------------|
| **Annual Billing** | Offer 2 months free for annual prepay | +$20K-50K immediate | Easy |
| **Upfront Setup Fees** | $500 fee paid before onboarding | +$500 per customer | Easy |
| **Deposit Required** | 50% deposit for custom work | +$1K-5K per project | Easy |
| **Net 15 instead of Net 30** | Update invoice terms | Faster by 15 days | Easy |
| **Auto-charge credit cards** | Stripe/PayPal automation | Reduce late payments | Medium |
| **Early payment discount** | 2% discount for Net 7 | Faster cash, slight discount | Medium |
| **Send invoices immediately** | Same-day invoicing | Faster by 2-7 days | Easy |

**CoodLoom Example: Annual Billing**
```
Normal: Customer pays $299/month = $3,588/year
Annual: Customer pays $2,988 upfront (2 months free)

Cash Impact:
- Month 1: Receive $2,988 instead of $299 (+$2,689)
- Months 2-12: Receive $0 instead of $299 (-$299/month)
- Net: Bring forward 10 months of cash
```

**Quick Win**: Offer existing customers option to switch to annual at 15% discount. Even with discount, getting cash now is worth it.

### 7.2 Delay Outflows (Without Damaging Business)

| Strategy | Implementation | Impact | Difficulty |
|----------|----------------|--------|------------|
| **Negotiate Net 30 terms** | Ask vendors for payment terms | Delay 30 days | Easy |
| **Pay with credit card** | Use for 30-day float | Delay 30-45 days | Easy |
| **Defer founder salary** | Pay yourself later | Save $5K-15K/month | Hard (personal) |
| **Use free tiers** | Avoid paid tools until necessary | Save $500-2K/month | Easy |
| **Quarterly payments** | Annual software paid quarterly | Spread out cost | Medium |
| **Commission on collection** | Pay sales commissions when paid | Align incentives | Medium |
| **Rent vs buy equipment** | Lease instead of purchase | Preserve cash | Medium |
| **Outsource vs hire** | Contractors instead of FTE | Variable costs | Medium |

**CoodLoom Example: Credit Card Float**
```
Marketing spend: $6,000/month
Payment method: Credit card with Net 45 terms

Cash Impact:
- Charges on credit card: Days 1-30
- Credit card bill due: Day 45
- Result: 45-day float on $6,000 = keep $6K longer
```

**Caution**: Don't delay payments that damage relationships (small vendors, contractors who need money).

### 7.3 Reducing Burn Rate

| Category | Current | Target | Savings | Action |
|----------|---------|--------|---------|--------|
| Marketing | $6,500/mo | $4,000/mo | $2,500 | Cut underperforming ads |
| Software Tools | $300/mo | $150/mo | $150 | Eliminate unused licenses |
| Office Space | $300/mo | $0 | $300 | Work from home temporarily |
| Contractors | $4,000/mo | $2,000/mo | $2,000 | Reduce hours 50% |
| **Total Savings** | | | **$4,950/mo** | Extends runway significantly |

**Emergency Cost-Cutting Playbook** (if runway <8 weeks):
1. ❌ Freeze all hiring immediately
2. ❌ Cut all non-essential software ($200-500/month)
3. ❌ Pause all paid marketing temporarily
4. ❌ Defer founder salary if still taking any
5. ❌ Renegotiate or cancel office space
6. ✅ Focus 100% on collecting receivables
7. ✅ Contact existing customers for annual prepay
8. ✅ Offer incentives for referrals with upfront payment

---

## Section 8: Cash Flow Forecasting Formulas

### 8.1 Revenue Forecasting

**Monthly Recurring Revenue (MRR)**:
```
Week N MRR Collections = (Total Customers × ARPC) ÷ 4.33

Example:
150 customers × $235 ARPC = $35,250/month
$35,250 ÷ 4.33 weeks = $8,142/week
```

**One-Time Revenue**:
```
Week N Setup Fees = New Customers This Week × $500

Example:
4 new customers × $500 = $2,000 in setup fees
```

**Payment Timing Adjustment**:
```
If Net 7 payment terms:
Week N collections = Week N-1 billings

If Net 30 payment terms:
Week N collections = Week N-4 billings (approx)
```

### 8.2 Expense Forecasting

**Variable Costs (Scale with customers)**:
```
Week N Variable Costs = (Total Customers × Cost per Customer per Month) ÷ 4.33

Example:
150 customers × $9.47/month = $1,420.50/month
$1,420.50 ÷ 4.33 = $328/week
```

**Fixed Costs**:
```
Week N Fixed Costs = Monthly Fixed Costs ÷ 4.33

Example:
$8,000/month ÷ 4.33 = $1,848/week
```

**One-Time Costs**:
```
Include in specific week when payment due, not when expense incurred

Example:
Sign contract for website redesign in Week 3
50% deposit due Week 3: $2,500
Final payment due Week 8: $2,500
```

### 8.3 Ending Cash Balance

```
Week N Ending Cash = Week N-1 Ending Cash + Week N Cash Inflows - Week N Cash Outflows

Example:
Week 1 ending: $54,300
Week 2 inflows: $15,200
Week 2 outflows: $9,100
Week 2 ending: $54,300 + $15,200 - $9,100 = $60,400
```

---

## Section 9: Common Cash Flow Mistakes

### ❌ Mistake #1: Confusing Profit with Cash

**Problem**: Your P&L shows profit, but you're running out of cash

**Example**:
```
P&L (Accrual Accounting):
- Revenue (booked): $50,000
- Expenses (incurred): $30,000
- Profit: $20,000

Cash Flow (Reality):
- Cash collected: $30,000 (customers pay Net 30)
- Cash paid: $35,000 (you paid bills immediately)
- Cash change: -$5,000 (lost cash despite "profit")
```

**Solution**: Track cash separately from P&L using this template

### ❌ Mistake #2: Not Planning for Large Expenses

**Problem**: Unexpected large bill wipes out cash reserve

**Example**:
```
Current cash: $40,000
Runway: 10 weeks (looks good)

Surprise expenses:
- Annual insurance: $2,400 (forgot it was due)
- Quarterly taxes: $8,000 (didn't set aside money)
- Total surprise: $10,400

New cash: $29,600
New runway: 7.4 weeks (now concerning)
```

**Solution**: Include all recurring expenses, even if infrequent (quarterly, annually)

### ❌ Mistake #3: Overly Optimistic Collections

**Problem**: Assuming customers pay immediately when they often pay late

**Example**:
```
Forecast:
- Week 1 invoices: $15,000
- Expected collections Week 1: $15,000

Reality:
- Week 1 actual collections: $8,000
- Remaining $7,000 comes Week 2-3
- Shortfall creates cash crunch
```

**Solution**: Use conservative payment timing (add 1-2 week buffer)

### ❌ Mistake #4: Forgetting Taxes

**Problem**: Not setting aside cash for quarterly estimated taxes

**Example**:
```
Q1 Profit: $50,000
Tax rate: 25%
Tax owed: $12,500

If not planned:
- Current cash: $20,000
- Tax payment: $12,500
- Remaining cash: $7,500 (runway cut by 2/3)
```

**Solution**: Set aside 25-30% of profit in separate account, include in forecast

### ❌ Mistake #5: Only Looking at Month-End

**Problem**: Cash is fine at month-end but dips dangerously mid-month

**Example**:
```
Week 1 ending cash: $30,000 ✅
Week 2 ending cash: $18,000 ⚠️
Week 3 ending cash: $22,000 ⚠️
Week 4 ending cash: $35,000 ✅

Month-end looks fine ($35K), but Week 2-3 were risky
```

**Solution**: Weekly tracking catches intra-month issues

---

## Section 10: Sample Completed Forecast

### CoodLoom 13-Week Cash Flow Forecast

**As of**: January 1, 2024  
**Current Cash**: $50,000  
**Minimum Reserve**: $25,000  

| Week | Starting | Customers | MRR | Setup | Hardware | Total In | Salaries | COGS | Marketing | Software | Other | Total Out | Net Flow | Ending Cash | Runway |
|------|----------|-----------|-----|-------|----------|----------|----------|------|-----------|----------|-------|-----------|----------|-------------|--------|
| 1 | Jan 1 | 30 | $1,635 | $1,500 | $800 | $3,935 | $0 | $66 | $1,500 | $125 | $300 | $1,991 | $1,944 | $51,944 | 13+ |
| 2 | Jan 8 | 35 | $1,905 | $2,500 | $1,600 | $6,005 | $0 | $76 | $1,500 | $0 | $200 | $1,776 | $4,229 | $56,173 | 13+ |
| 3 | Jan 15 | 41 | $2,230 | $3,000 | $800 | $6,030 | $0 | $89 | $1,500 | $0 | $150 | $1,739 | $4,291 | $60,464 | 13+ |
| 4 | Jan 22 | 50 | $2,721 | $4,500 | $1,600 | $8,821 | $0 | $108 | $1,500 | $0 | $2,800 | $4,408 | $4,413 | $64,877 | 13+ |
| 5 | Jan 29 | 65 | $3,537 | $7,500 | $3,200 | $14,237 | $0 | $141 | $1,500 | $0 | $200 | $1,841 | $12,396 | $77,273 | 13+ |
| 6 | Feb 5 | 83 | $4,516 | $9,000 | $3,196 | $16,712 | $0 | $180 | $1,500 | $125 | $300 | $2,105 | $14,607 | $91,880 | 13+ |
| 7 | Feb 12 | 106 | $5,766 | $11,500 | $4,794 | $22,060 | $0 | $230 | $1,500 | $0 | $200 | $1,930 | $20,130 | $112,010 | 13+ |
| 8 | Feb 19 | 119 | $6,476 | $6,500 | $2,397 | $15,373 | $0 | $258 | $1,500 | $0 | $150 | $1,908 | $13,465 | $125,475 | 13+ |
| 9 | Feb 26 | 134 | $7,289 | $7,500 | $2,397 | $17,186 | $0 | $290 | $1,500 | $0 | $200 | $1,990 | $15,196 | $140,671 | 13+ |
| 10 | Mar 5 | 151 | $8,214 | $8,500 | $3,196 | $19,910 | $0 | $327 | $1,500 | $0 | $3,300 | $5,127 | $14,783 | $155,454 | 13+ |
| 11 | Mar 12 | 170 | $9,250 | $9,500 | $3,196 | $21,946 | $0 | $368 | $1,500 | $125 | $400 | $2,393 | $19,553 | $175,007 | 13+ |
| 12 | Mar 19 | 192 | $10,447 | $11,000 | $4,394 | $25,841 | $0 | $416 | $1,500 | $0 | $200 | $2,116 | $23,725 | $198,732 | 13+ |
| 13 | Mar 26 | 216 | $11,754 | $12,000 | $4,794 | $28,548 | $0 | $468 | $1,500 | $0 | $300 | $2,268 | $26,280 | $225,012 | 13+ |

**Analysis**:
- ✅ Cash growing every week ($50K → $225K in 13 weeks)
- ✅ Always above $25K minimum reserve
- ✅ Runway infinite (cash flow positive)
- ✅ No action needed, continue monitoring

---

## Checklist: Using This Template

### Setup (One-Time)
- [ ] Copy template to your Google Sheets/Excel
- [ ] Enter company information
- [ ] Set minimum cash reserve target
- [ ] List all recurring revenue sources
- [ ] List all recurring expenses
- [ ] Set up weekly reminders (Monday mornings)

### Weekly Update (Every Monday)
- [ ] Record actual ending cash from bank
- [ ] Update previous week's actuals
- [ ] Roll forward one week (delete Week 1, add Week 14)
- [ ] Update Weeks 2-4 with new information
- [ ] Recalculate runway
- [ ] Flag any issues or concerning trends
- [ ] Communicate with co-founder if needed

### Monthly Review (1st Monday of Month)
- [ ] Compare 4-week actuals to forecast
- [ ] Understand major variances (>20%)
- [ ] Update assumptions if needed
- [ ] Review large upcoming expenses
- [ ] Plan any cost optimizations
- [ ] Send summary to investors (if applicable)

### Red Flags (Take Action Immediately)
- [ ] Runway drops below 13 weeks
- [ ] Cash dips below minimum reserve
- [ ] Burn rate increasing unexpectedly
- [ ] Major variance from forecast (>30%)
- [ ] Large unexpected expense coming

---

## Next Steps

1. **Download this template** and customize for CoodLoom
2. **Fill in your current numbers** (cash, customers, expenses)
3. **Project forward 13 weeks** with best estimates
4. **Set Monday reminder** to update weekly
5. **Share with co-founder** for visibility
6. **Update monthly** in your financial model

**Remember**: This is your early warning system. Weekly updates only take 30-60 minutes but can save your business from running out of cash. Make it a ritual, not a chore.

**Pro Tip**: Keep a "lessons learned" section in your spreadsheet. Note when forecasts were wrong and why. You'll get better at predicting over time.
