# Accounting Basics for CoodLoom

## Introduction
Financial management is the backbone of any successful business. As a tech founder, you might love coding but accounting is non-negotiable. This chapter demystifies accounting basics so you can make informed financial decisions for CoodLoom.

## Why Accounting Matters for Startups

### Beyond Just Numbers
- **Legal Compliance**: Tax obligations, investor reporting, audit requirements
- **Strategic Decisions**: Pricing, hiring, expansion - all require financial data
- **Fundraising**: Investors demand clean books and financial transparency
- **Cash Flow**: Understanding money in/out prevents the #1 cause of startup failure
- **Valuation**: Your company's worth is based on financial performance

### Common Founder Mistakes
❌ Mixing personal and business finances  
❌ Not tracking expenses properly  
❌ Ignoring accounting until tax time  
❌ Making decisions without financial data  
❌ Not understanding basic financial statements  

## Fundamental Accounting Concepts

### 1. The Accounting Equation
```
Assets = Liabilities + Equity
```

**For CoodLoom Example**:
- **Assets**: $50K cash, $10K equipment, $5K accounts receivable = $65K
- **Liabilities**: $0 debt (you're bootstrapping!)
- **Equity**: $65K (your and your co-founder's investment)

### 2. Double-Entry Bookkeeping
Every transaction affects at least two accounts.

**Example**: You buy a $2,000 laptop for development
- **Debit**: Equipment (Asset) +$2,000
- **Credit**: Cash (Asset) -$2,000
- Result: Total assets stay the same, just shifted between accounts

### 3. Accrual vs Cash Accounting

| Cash Accounting | Accrual Accounting |
|----------------|-------------------|
| Record when money changes hands | Record when transaction occurs |
| Simple for small businesses | Required for companies over $25M revenue |
| Can't see full financial picture | Shows true financial position |
| Better for tax optimization | Better for understanding business health |

**Recommendation for CoodLoom**: Start with **cash accounting** for simplicity, switch to accrual when you hit $1M ARR or raise VC funding.

### 4. Chart of Accounts
Your financial filing system. Key categories for CoodLoom:

**Assets**
- 1000: Cash in Bank
- 1100: Accounts Receivable
- 1200: Equipment & Hardware
- 1300: Software & Licenses

**Liabilities**
- 2000: Accounts Payable
- 2100: Credit Cards
- 2200: Loans (if any)
- 2300: Deferred Revenue (prepaid annual subscriptions)

**Equity**
- 3000: Owner's Investment
- 3100: Retained Earnings

**Revenue**
- 4000: Subscription Revenue (Monthly)
- 4100: Subscription Revenue (Annual)
- 4200: Setup Fees
- 4300: Hardware Sales
- 4400: Professional Services

**Expenses**
- 5000: Software & Tools (AWS, hosting, etc.)
- 5100: Marketing & Advertising
- 5200: Salaries & Wages
- 5300: Office & Rent
- 5400: Professional Services (legal, accounting)
- 5500: Travel & Entertainment
- 5600: R&D / Development Costs
- 5700: Support & Customer Success

## The Three Essential Financial Statements

### 1. Income Statement (Profit & Loss)
**What it shows**: Did you make money or lose money?

**CoodLoom Example - Monthly P&L**:
```
REVENUE
Subscription Revenue (10 customers × $200/mo)    $2,000
Setup Fees (2 new customers × $500)              $1,000
Hardware Sales                                     $800
Total Revenue                                    $3,800

COST OF GOODS SOLD (COGS)
Hardware Costs                                     $480
Payment Processing Fees (2.9%)                     $110
Total COGS                                         $590

GROSS PROFIT                                     $3,210
Gross Margin: 84%

OPERATING EXPENSES
Salaries (You + Co-founder at minimal)           $4,000
Software & Hosting                                 $300
Marketing & Ads                                    $500
Office / Coworking                                 $200
Professional Services                              $250
Total Operating Expenses                         $5,250

OPERATING INCOME                                -$2,040

OTHER INCOME/EXPENSES
Interest Income                                     $10
Total Other                                         $10

NET INCOME (LOSS)                               -$2,030
```

**Analysis**: You're losing $2K/month. Need to either:
- Cut costs (lower salaries initially)
- Increase revenue (more customers)
- Both!

### 2. Balance Sheet
**What it shows**: What do you own and owe at a specific point in time?

**CoodLoom Balance Sheet - End of Month**:
```
ASSETS
Current Assets:
  Cash                                           $45,000
  Accounts Receivable                            $1,200
  Inventory (POS hardware)                       $3,000
  Prepaid Expenses                                 $600
  Total Current Assets                          $49,800

Fixed Assets:
  Equipment (laptops, monitors)                  $6,000
  Less: Accumulated Depreciation                  ($500)
  Software Development (capitalized)            $15,000
  Total Fixed Assets                            $20,500

TOTAL ASSETS                                    $70,300

LIABILITIES
Current Liabilities:
  Accounts Payable                               $2,100
  Credit Cards                                   $1,500
  Deferred Revenue (prepaid annual)              $4,800
  Total Current Liabilities                      $8,400

Long-term Liabilities:                               $0

TOTAL LIABILITIES                                $8,400

EQUITY
  Owner's Investment                            $50,000
  Retained Earnings                             $13,930
  Current Period Net Loss                       -$2,030
TOTAL EQUITY                                    $61,900

TOTAL LIABILITIES + EQUITY                      $70,300
```

**Key Insight**: Even though you lost $2K this month, you still have $45K cash and $62K equity. You're financially healthy!

### 3. Cash Flow Statement
**What it shows**: Where did cash come from and where did it go?

**CoodLoom Cash Flow Statement**:
```
OPERATING ACTIVITIES
Net Income (Loss)                               -$2,030
Adjustments:
  Depreciation                                      $500
  Changes in Working Capital:
    Increase in Accounts Receivable              -$1,200
    Increase in Inventory                        -$3,000
    Increase in Accounts Payable                  $2,100
    Increase in Deferred Revenue                  $4,800
Net Cash from Operations                         $1,170

INVESTING ACTIVITIES
  Purchase of Equipment                          -$6,000
  Software Development Costs                    -$15,000
Net Cash from Investing                        -$21,000

FINANCING ACTIVITIES
  Owner Investment                               $50,000
  Loan Proceeds                                       $0
Net Cash from Financing                         $50,000

NET INCREASE IN CASH                            $30,170
Beginning Cash Balance                          $14,830
ENDING CASH BALANCE                             $45,000
```

**Critical Insight**: You're cash flow positive from operations (+$1,170) even though P&L shows a loss! This is because customers prepaid annual subscriptions (deferred revenue).

## Bookkeeping Essentials

### Daily Practices
1. **Receipt Management**: Photo every receipt immediately (Expensify, QuickBooks mobile)
2. **Transaction Recording**: Log expenses within 24 hours
3. **Bank Reconciliation**: Weekly at minimum, daily when cash is tight
4. **Invoice Immediately**: Send invoices the same day work is completed

### Monthly Practices
1. **Close the Books**: Finalize all transactions for the month
2. **Reconcile All Accounts**: Bank, credit cards, PayPal, Stripe
3. **Review Financial Statements**: P&L, Balance Sheet, Cash Flow
4. **Analyze Variance**: Budget vs. actual
5. **Update Forecasts**: Revise projections based on actual performance

### Quarterly Practices
1. **Tax Estimate Payments**: Calculate and pay quarterly taxes (if required)
2. **Investor Updates**: Share financials with stakeholders
3. **Strategic Review**: Are you on track for annual goals?
4. **Audit Preparation**: Keep organized for potential audits

### Annual Practices
1. **Year-End Close**: Finalize annual financial statements
2. **Tax Filing**: Corporate tax returns, personal returns
3. **Financial Analysis**: Year-over-year comparison
4. **Budget Planning**: Create next year's budget
5. **CPA Review**: Have professional accountant review

## Accounting Software for CoodLoom

### Recommended Tools

**Early Stage (Pre-Revenue to $500K ARR)**:
- **QuickBooks Online** ($30-90/mo)
  - ✅ Easy to use, industry standard
  - ✅ Integrates with banks, Stripe, PayPal
  - ✅ Scales with you
  - ❌ Can get expensive with add-ons

- **Wave** (Free)
  - ✅ Free for basic accounting
  - ✅ Good for very early stage
  - ❌ Limited features, charges for payments/payroll

- **Xero** ($13-70/mo)
  - ✅ Beautiful interface
  - ✅ Strong internationally
  - ❌ Fewer integrations than QuickBooks

**CoodLoom Recommendation**: Start with **QuickBooks Online** (Simple Start plan $30/mo). It's the industry standard, investors know it, and your CPA will expect it.

### Integration Stack
```
QuickBooks Online (Core Accounting)
    ↓
Connected to:
    → Bank Accounts (auto-import transactions)
    → Stripe (auto-record payment revenue)
    → PayPal (if you use it)
    → Gusto (payroll integration)
    → Expensify (expense management)
    → Bill.com (accounts payable)
```

### Setting Up Your Books

**Step 1: Create Your Business Entity**
- File LLC or C-Corp (see Phase 3)
- Get EIN from IRS (5 minutes online)
- Open business bank account

**Step 2: Set Up QuickBooks**
```
1. Sign up for QuickBooks Online
2. Connect your business bank account
3. Connect Stripe/payment processor
4. Set up your Chart of Accounts (use template above)
5. Enter opening balances
6. Set up recurring transactions (subscriptions)
7. Invite your co-founder (if they'll help with finances)
8. Invite your CPA/bookkeeper (read-only access)
```

**Step 3: Create Your Workflow**
```
Daily:
  → Check bank feeds in QuickBooks
  → Categorize transactions
  → Upload receipts

Weekly:
  → Send invoices for new customers
  → Follow up on overdue invoices
  → Review cash position

Monthly:
  → Close the month
  → Generate P&L, Balance Sheet
  → Review with co-founder
  → Update financial model
```

## Tax Basics for CoodLoom

### Types of Business Taxes

**1. Income Tax**
- **LLC**: Pass-through to personal tax return (Schedule C)
- **C-Corp**: Corporate tax (21%) + personal tax on dividends (double taxation)
- **S-Corp**: Pass-through but can save on self-employment tax

**CoodLoom Strategy**: Start as LLC for simplicity, switch to C-Corp if you raise VC funding.

**2. Self-Employment Tax** (15.3%)
- Social Security: 12.4% (up to $160,200 in 2023)
- Medicare: 2.9% (no limit) + 0.9% over $200K

**3. Payroll Tax** (when you have employees)
- Social Security: 6.2% (employer) + 6.2% (employee)
- Medicare: 1.45% (employer) + 1.45% (employee)
- Federal Unemployment: 0.6%
- State Unemployment: varies by state

**4. Sales Tax**
- **Software/SaaS**: Complex! Varies by state
- **Hardware**: Typically taxable
- **CoodLoom Consideration**: You're selling POS systems (software + hardware)
  - Software component: May be exempt in some states
  - Hardware component: Likely taxable
  - Use a tool like TaxJar or Avalara

**5. State & Local Taxes**
- State income tax (varies by state, 0-13%)
- Local business taxes
- Franchise tax (annual fee in some states)

### Tax Deductions for CoodLoom

**Fully Deductible**:
✅ Business software subscriptions (AWS, GitHub, etc.)  
✅ Office rent or coworking space  
✅ Business equipment (laptops, monitors, furniture)  
✅ Marketing and advertising  
✅ Professional services (lawyers, accountants)  
✅ Business travel and meals (50% for meals)  
✅ Health insurance (if self-employed)  
✅ Business phone and internet  
✅ Education and training (relevant to business)  

**Not Deductible**:
❌ Personal expenses  
❌ Commuting to/from regular workplace  
❌ Gym membership (unless it's a business meeting venue)  
❌ Entertainment (changed in 2018 tax law)  

**Home Office Deduction**:
If you work from home, you can deduct:
```
Method 1 (Simplified): $5 per square foot (max 300 sq ft = $1,500)
Method 2 (Actual): Percentage of rent, utilities, insurance, repairs

Example:
Home: 1,500 sq ft total
Office: 150 sq ft (10%)
Rent: $2,000/mo = $24,000/yr
Utilities: $3,000/yr
Internet: $1,200/yr
Total: $28,200 × 10% = $2,820 deduction
```

### Quarterly Estimated Tax Payments

**Who Must Pay**: If you expect to owe $1,000+ in taxes

**Due Dates**:
- Q1: April 15
- Q2: June 15
- Q3: September 15
- Q4: January 15 (next year)

**How to Calculate**:
```
Method 1 (Safe Harbor): Pay 100% of last year's tax (110% if AGI > $150K)
Method 2 (Estimate): Project current year income and pay 90% of expected tax

CoodLoom Example:
Expected profit: $100,000
Tax rate: ~30% (federal + state + self-employment)
Total tax: $30,000
Quarterly payment: $30,000 ÷ 4 = $7,500
```

**How to Pay**: IRS Direct Pay (free) or EFTPS (Electronic Federal Tax Payment System)

### Tax Planning Strategies

**1. Timing Income & Expenses**
- Defer revenue to next year (if beneficial)
- Accelerate expenses into current year
- Buy equipment before year-end (Section 179 deduction)

**2. Retirement Contributions**
- **Solo 401(k)**: Contribute up to $66,000 (2023) - huge tax deduction!
- **SEP IRA**: Up to 25% of compensation
- **Traditional IRA**: $6,500 base ($7,500 if 50+)

**3. Hire Your Co-Founder Spouse**
- If married, employ your spouse
- Deduct salary, they get benefits
- Family health insurance becomes deductible

**4. Qualified Business Income (QBI) Deduction**
- Deduct up to 20% of qualified business income
- Phases out at higher incomes
- Complex rules - consult CPA

**5. R&D Tax Credit**
- Software development may qualify!
- Federal credit: Up to 14% of qualified expenses
- Some states have additional credits
- CoodLoom may qualify - consult a specialist

### Working with a CPA

**When to Hire**:
- ✅ Before filing your first business tax return
- ✅ When making major decisions (incorporation, funding)
- ✅ When facing an IRS audit
- ✅ Annually for tax strategy planning

**Cost**: $1,500-5,000/year for small business

**What to Look For**:
- Experience with startups/SaaS businesses
- Proactive (suggests tax strategies, not just compliance)
- Available year-round (not just tax season)
- Uses modern accounting software
- Communicates in plain English

**Questions to Ask Prospective CPAs**:
1. "Do you work with SaaS/tech startups?"
2. "Can you help with tax planning, not just filing?"
3. "What's your process for year-round support?"
4. "Do you work with QuickBooks Online?"
5. "What's your fee structure?"

## Common Accounting Mistakes to Avoid

### 1. Mixing Personal & Business Finances
❌ **Wrong**: Using personal credit card for business expenses  
✅ **Right**: Dedicated business bank account and credit card

### 2. Not Tracking Mileage
❌ **Wrong**: Guessing at year-end  
✅ **Right**: Use MileIQ or similar app (65.5¢/mile deduction in 2023)

### 3. Forgetting About Sales Tax
❌ **Wrong**: Ignoring sales tax obligations  
✅ **Right**: Research requirements, register in applicable states, use TaxJar

### 4. Poor Receipt Management
❌ **Wrong**: Shoebox full of crumpled receipts  
✅ **Right**: Digital receipts, immediately categorized

### 5. Not Reconciling Regularly
❌ **Wrong**: "I'll deal with it at tax time"  
✅ **Right**: Weekly bank reconciliation

### 6. Miscategorizing Expenses
❌ **Wrong**: Everything is "miscellaneous"  
✅ **Right**: Proper categories for tax optimization

### 7. Not Paying Estimated Taxes
❌ **Wrong**: Surprise tax bill + penalties  
✅ **Right**: Quarterly estimated payments

### 8. Forgetting About Depreciation
❌ **Wrong**: Missing out on depreciation deductions  
✅ **Right**: Track all capital purchases, depreciate properly

## Financial Hygiene Checklist

### Setup (One-Time)
- [ ] Register business entity (LLC/C-Corp)
- [ ] Obtain EIN from IRS
- [ ] Open business bank account
- [ ] Get business credit card
- [ ] Set up QuickBooks Online
- [ ] Create Chart of Accounts
- [ ] Connect payment processors
- [ ] Find and hire a CPA
- [ ] Set up payroll system (when needed)
- [ ] Research sales tax requirements

### Daily
- [ ] Log all business transactions
- [ ] Upload receipts immediately
- [ ] Send invoices promptly
- [ ] Track time/mileage if billable

### Weekly
- [ ] Reconcile bank accounts
- [ ] Follow up on unpaid invoices
- [ ] Review cash position
- [ ] Plan upcoming expenses

### Monthly
- [ ] Close the books
- [ ] Generate financial statements
- [ ] Review P&L vs budget
- [ ] Pay bills on time
- [ ] Update financial forecast

### Quarterly
- [ ] Pay estimated taxes
- [ ] Review financials with co-founder
- [ ] Analyze trends and variance
- [ ] Update investor deck (if applicable)

### Annually
- [ ] File tax returns
- [ ] CPA strategic planning session
- [ ] Review and update Chart of Accounts
- [ ] Analyze year-over-year performance
- [ ] Set financial goals for next year

## Key Accounting Terms Glossary

**Accounts Payable (AP)**: Money you owe to vendors/suppliers  
**Accounts Receivable (AR)**: Money customers owe you  
**Accrual**: Recording revenue/expenses when earned/incurred, not when cash changes hands  
**Asset**: Something of value the company owns  
**Balance Sheet**: Snapshot of financial position at a specific date  
**Book Value**: Value of asset minus depreciation  
**COGS (Cost of Goods Sold)**: Direct costs to deliver your product/service  
**Depreciation**: Allocating asset cost over its useful life  
**EBITDA**: Earnings Before Interest, Taxes, Depreciation, Amortization  
**Equity**: Owner's stake in the company  
**Gross Profit**: Revenue minus COGS  
**Income Statement (P&L)**: Revenue and expenses over a period  
**Liability**: Money the company owes  
**Net Income**: Bottom line profit after all expenses  
**Operating Expenses (OpEx)**: Costs to run the business (not COGS)  
**Revenue Recognition**: When to record a sale as revenue  
**Working Capital**: Current Assets minus Current Liabilities  

## Exercises

### Exercise 1: Set Up Your Accounting System
1. Open a business bank account for CoodLoom
2. Sign up for QuickBooks Online
3. Set up your Chart of Accounts
4. Connect your bank and Stripe
5. Enter your initial investment as equity

### Exercise 2: Create Your First Financial Statements
Using your current CoodLoom numbers:
1. Build a simple P&L for last month
2. Create a balance sheet as of today
3. Estimate a cash flow statement
4. What's your gross margin? Net margin?

### Exercise 3: Tax Planning
1. Calculate your expected annual profit
2. Estimate your total tax liability
3. Calculate quarterly estimated tax payments
4. List all available tax deductions
5. Research if you qualify for R&D tax credit

### Exercise 4: Build a Financial Dashboard
Create a simple spreadsheet with:
- Key metrics (MRR, expenses, profit, cash)
- Charts showing trends
- Target vs actual comparison
- Update it monthly

## Key Takeaways

✓ **Accounting isn't optional** - It's a legal requirement and business necessity  
✓ **Start with proper setup** - Business entity, bank account, accounting software  
✓ **The three statements tell different stories** - P&L (profitability), Balance Sheet (financial position), Cash Flow (liquidity)  
✓ **Cash flow ≠ Profit** - You can be profitable but cash-poor (and vice versa)  
✓ **Taxes are complex** - Work with a CPA who understands startups  
✓ **Daily discipline > year-end scramble** - Build good habits from day one  
✓ **Financial data drives decisions** - Your numbers should inform every major choice  
✓ **Software makes it easier** - Use QuickBooks, automate where possible  

## Next Steps

Move to Chapter 2: **Pricing Strategy** to learn how to price CoodLoom's POS system for maximum profitability while remaining competitive.

---

**Pro Tip**: Set aside 30% of every dollar you make for taxes. Keep it in a separate savings account. When tax time comes, you'll thank yourself!
