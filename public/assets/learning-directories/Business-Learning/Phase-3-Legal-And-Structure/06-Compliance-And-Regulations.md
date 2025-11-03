# Compliance & Regulations: Staying Legal

## Introduction

Running CoodLoom means complying with federal, state, and local laws. Non-compliance can result in fines, lawsuits, and even criminal penalties.

**This chapter covers the key compliance areas you need to understand and implement from day one.**

## Overview of Compliance Areas

**For CoodLoom, you must comply with**:

1. **Tax Compliance** - Federal, state, local taxes
2. **Employment Law** - Hiring, wages, benefits
3. **Data Privacy** - GDPR, CCPA, data protection
4. **Industry Regulations** - PCI-DSS for payment processing
5. **Securities Law** - If raising capital or issuing equity
6. **Consumer Protection** - FTC regulations, advertising
7. **Accessibility** - ADA, WCAG for software
8. **Export Control** - If selling internationally

Let's cover each area in detail.

## 1. Tax Compliance

### Federal Taxes

**Corporate Income Tax**:
- **C-Corp**: Pays 21% federal tax on profits
- **S-Corp/LLC**: Pass-through, no corporate tax (owners pay on personal returns)
- **File**: Form 1120 (C-Corp), 1120S (S-Corp), 1065 (Partnership LLC)
- **Due**: April 15 or March 15 (S-Corp/Partnership)
- **Extensions**: Available, but doesn't extend payment deadline

**Employment Taxes** (if you have employees):
- **Social Security**: 6.2% (employer) + 6.2% (employee) = 12.4%
- **Medicare**: 1.45% (employer) + 1.45% (employee) = 2.9%
- **Federal Unemployment (FUTA)**: 6.0% on first $7,000 per employee (reduced by state credits)
- **Income Tax Withholding**: Based on employee's W-4

**Quarterly Estimated Taxes**:
- **Who**: S-Corp/LLC owners, anyone with income not subject to withholding
- **When**: April 15, June 15, Sept 15, Jan 15
- **How Much**: 25% of expected annual tax
- **Penalty**: Underpayment penalty if too low

**Self-Employment Tax**:
- **Who**: LLC members, partners
- **Rate**: 15.3% (12.4% Social Security + 2.9% Medicare)
- **Applies to**: Net earnings from self-employment
- **File**: Schedule SE with Form 1040

### State Taxes

**State Income Tax**:
- Most states: 0-13.3% (California highest at 13.3%)
- No state income tax: Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, Wyoming
- **File**: State corporate or personal return depending on entity

**Sales Tax**:
- **Who pays**: Depends on your state and what you sell
- **SaaS**: Laws vary by state
  - Some states tax SaaS (Texas, Pennsylvania, etc.)
  - Some don't (many states)
  - Check your state AND customer's state
- **Registration**: Must register in states where you have nexus
- **Nexus**: Physical presence, employees, or economic presence (varies by state)

**Nexus Rules**:
- **Physical nexus**: Office, warehouse, employees in state
- **Economic nexus**: Sales exceeding threshold (typically $100K revenue or 200 transactions per year)
- **Post-Wayfair**: Must collect sales tax if exceed threshold, even without physical presence

**Sales Tax for SaaS** (Common Scenarios):
```
CoodLoom sells $1,000/month SaaS subscription

Texas customer:
- Texas taxes SaaS → Charge $1,065 ($1,000 + 6.5% tax)
- You remit $65 to Texas

California customer:
- California generally doesn't tax SaaS → Charge $1,000
- No tax collected

Enterprise customer in multiple states:
- Determine customer's location (billing address)
- Apply that state's rules
- May need to collect in multiple states if customer has locations in different states
```

**Sales Tax Compliance**:
1. **Determine nexus**: Where do you have obligation to collect?
2. **Register**: Get sales tax permit in those states (free to $100)
3. **Collect**: Add tax to invoices for customers in those states
4. **File returns**: Monthly, quarterly, or annually depending on state
5. **Remit tax**: Pay collected tax to state

**Tools**:
- **TaxJar**: Automated sales tax ($19-99/month)
- **Avalara**: Enterprise solution ($100+/month)
- **Stripe Tax**: Built into Stripe (if using Stripe)

### Local Taxes

**City/County Taxes**:
- Business license fee: $50-500/year
- Gross receipts tax: Some cities (San Francisco, Philadelphia, etc.)
- Property tax: On office equipment, furniture

**Business Personal Property Tax**:
- Some states tax business equipment
- File annual return listing assets
- Pay tax on value

### Tax Strategy Tips

**Deductible Expenses** (Lower taxable income):
- Salaries and contractor payments
- Office rent or home office deduction
- Software and subscriptions
- Marketing and advertising
- Professional fees (legal, accounting)
- Business travel
- Equipment and computers
- Health insurance (for S-Corp owners)
- Retirement contributions (401k, SEP-IRA)
- R&D expenses (may qualify for R&D tax credit)

**Tax Credits**:
- **R&D Tax Credit**: 6-10% of qualified research expenses (coding often qualifies!)
- **Work Opportunity Tax Credit**: Hiring certain categories of workers
- **State-specific credits**: Check your state

**Tax Planning**:
- Hire CPA specializing in startups ($2,000-5,000/year)
- File quarterly estimated taxes (avoid penalties)
- Track ALL expenses (use QuickBooks or similar)
- Separate personal and business finances
- Consider S-Corp election when profitable (tax savings)
- Depreciate major purchases or Section 179 expense
- Time income/expenses for tax benefits

### Tax Deadlines Checklist

**Annual**:
- [ ] Jan 15: Q4 estimated taxes (prior year)
- [ ] Jan 31: W-2s and 1099s to employees/contractors
- [ ] Feb 28: W-2s and 1099s to IRS (paper) or March 31 (electronic)
- [ ] March 15: S-Corp/Partnership returns (Form 1120S, 1065)
- [ ] April 15: C-Corp returns (Form 1120), Personal returns (Form 1040)
- [ ] April 15: Q1 estimated taxes (current year)
- [ ] June 15: Q2 estimated taxes
- [ ] Sept 15: Q3 estimated taxes
- [ ] Oct 15: Extended returns due

**Quarterly/Monthly**:
- [ ] Payroll tax deposits (depends on size, monthly or semi-weekly)
- [ ] Payroll tax returns (Form 941 - quarterly)
- [ ] Sales tax returns (monthly, quarterly, or annually depending on state)

## 2. Employment Law Compliance

### Federal Employment Laws

**Fair Labor Standards Act (FLSA)**:
- **Minimum Wage**: $7.25/hour federal (higher in many states)
- **Overtime**: 1.5x pay for hours over 40/week
- **Exempt vs Non-Exempt**:
  - Exempt (salaried, no overtime): Execs, professionals, admins earning $684+/week
  - Non-exempt (hourly, overtime): Most other employees
- **Classification Critical**: Misclassifying employees as exempt = back wages + penalties

**Employee vs Contractor**:
- **IRS Test**: Behavioral control, financial control, relationship type
- **Employee**: You control how, when, where work done; withhold taxes; provide benefits
- **Contractor**: They control methods; no taxes withheld; no benefits; independent business
- **Penalties for misclassification**: Back taxes, penalties, fines ($50-100K+)

**When in doubt**: Classify as employee (safer)

**Title VII (Civil Rights)**:
- No discrimination based on race, color, religion, sex, national origin
- Applies to: Hiring, firing, promotion, compensation, training
- **Threshold**: 15+ employees

**Americans with Disabilities Act (ADA)**:
- Reasonable accommodations for disabled employees
- Can't discriminate in hiring or employment
- **Threshold**: 15+ employees

**Age Discrimination in Employment Act (ADEA)**:
- Can't discriminate against workers 40+
- **Threshold**: 20+ employees

**Family and Medical Leave Act (FMLA)**:
- 12 weeks unpaid leave for family/medical reasons
- Job protection during leave
- **Threshold**: 50+ employees

**Equal Pay Act**:
- Equal pay for equal work regardless of sex
- Job must be substantially equal (skill, effort, responsibility, conditions)

**Immigration**:
- **I-9 Form**: All employees must complete within 3 days of hire
- Verify eligibility to work in US
- Keep I-9s for 3 years after hire or 1 year after termination
- **Penalties**: $250-2,500 per violation (can add up fast!)

### State Employment Laws

**State-Specific Requirements** (varies widely):

**Minimum Wage**:
- Federal: $7.25/hour
- California: $16/hour (2024)
- New York: $15-16/hour
- Many states higher than federal
- Follow whichever is higher (federal or state)

**Paid Sick Leave**:
- Required in: CA, NY, WA, MA, OR, AZ, NJ, MD, CT, VT, MI, NM, and others
- Accrual: Typically 1 hour per 30-40 hours worked
- Usage: Employee's illness, family illness, preventive care

**Meal and Rest Breaks**:
- California: 30-min meal break (unpaid) for 5+ hours work; 10-min rest break per 4 hours
- New York: 30-min meal break for 6+ hours
- Many states have requirements; federal law doesn't

**Final Paycheck**:
- Timing varies by state (immediately, within 24 hours, next payday, within 7 days, etc.)
- California: Immediately if terminated, within 72 hours if quit
- Must pay all earned wages + accrued vacation

**Pay Frequency**:
- Most states require at least monthly
- Many require semi-monthly or bi-weekly
- Check your state requirements

**Paystub Requirements**:
- Most states require detailed paystubs showing:
  - Hours worked
  - Rate of pay
  - Deductions
  - Gross and net pay
  - Pay period dates

**State Unemployment Insurance (SUI)**:
- Employer pays (rate varies by state and experience rating)
- File quarterly reports
- Rates: 1-10% depending on state and claims history

**Workers' Compensation Insurance**:
- Required in most states once you have employees
- Covers employee injuries on the job
- Cost: 1-5% of payroll depending on industry and state
- **Penalty for not having**: Major fines + personal liability for injuries

**State Disability Insurance**:
- Required in: CA, HI, NJ, NY, RI, WA
- Provides partial wage replacement for non-work injuries/illness
- Funded by employer and/or employee contributions

### Employment Best Practices

**Hiring Process**:
1. Job description with essential functions
2. Post publicly (avoid discrimination)
3. Application form (consistent for all)
4. Interviews (same questions for all candidates)
5. Background check (with consent)
6. Offer letter (contingent on background check, I-9)
7. I-9 within 3 days
8. Onboarding (company policies, benefits, training)

**Employee Handbook**:
- **Critical**: Protects you from lawsuits
- **Contents**:
  - At-will employment statement
  - Anti-discrimination/harassment policies
  - Work hours and breaks
  - PTO/sick leave policy
  - Code of conduct
  - Disciplinary procedures
  - Complaint/grievance process
  - Social media policy
  - Remote work policy (if applicable)
- **Acknowledgment**: Employee signs they received and read

**Required Posters**:
- Must display federal and state labor law posters
- Available free from Department of Labor
- Post where employees can see (break room, office)
- Federal: FLSA, OSHA, EEO, FMLA, etc.
- State: Varies by state

**Termination**:
- Document performance issues (written warnings)
- Consistent application of policies
- Final paycheck per state law
- COBRA notice (health insurance continuation) if 20+ employees
- Unemployment claim (expect it, don't fight unless for cause)

**Common Employment Law Mistakes**:
❌ Misclassifying employees as contractors
❌ Not paying overtime to non-exempt employees
❌ Not providing meal/rest breaks (in states requiring them)
❌ Discriminatory hiring/firing
❌ Failing to accommodate disabilities
❌ Not filing I-9s
❌ Paying below minimum wage
❌ No workers' comp insurance
❌ No employee handbook
❌ Inconsistent policy enforcement

## 3. Data Privacy & Security

### GDPR (EU General Data Protection Regulation)

**Applies If**:
- You have EU customers
- You process EU residents' personal data
- You target EU market (even if no EU entity)

**Key Requirements**:

**Lawful Basis for Processing**:
- Consent: Explicit permission
- Contract: Necessary to provide service
- Legal obligation: Required by law
- Legitimate interest: Necessary for business purposes

**User Rights**:
- **Right to access**: Provide copy of their data
- **Right to rectification**: Correct inaccurate data
- **Right to erasure**: "Right to be forgotten" (delete data)
- **Right to data portability**: Export data in machine-readable format
- **Right to object**: Stop processing for marketing, etc.

**Must Have**:
- Privacy policy explaining data practices
- Cookie consent banner (for EU visitors)
- Data Processing Agreement (DPA) with customers
- Data breach notification procedure (72 hours to report)
- Data Protection Officer (if processing large amounts of sensitive data)

**Penalties**: Up to €20M or 4% of global revenue (whichever is higher)

**Compliance Steps**:
1. Audit what personal data you collect
2. Document lawful basis for each type
3. Implement user rights (access, delete, export)
4. Privacy policy with GDPR-compliant language
5. Cookie consent (GDPR-compliant, not pre-checked)
6. DPA for enterprise customers
7. Vendor agreements ensure GDPR compliance
8. Data breach response plan

### CCPA (California Consumer Privacy Act)

**Applies If**:
- You do business in California AND
- Gross revenue > $25M, OR
- Handle data of 50K+ CA consumers, OR
- 50%+ revenue from selling personal info

**Key Requirements**:

**Consumer Rights**:
- Right to know what data collected
- Right to delete data
- Right to opt-out of sale of data
- Right to non-discrimination (can't charge more for opting out)

**Business Obligations**:
- Privacy policy disclosing data practices
- "Do Not Sell My Personal Information" link (if selling data)
- Respond to requests within 45 days
- Verify identity of requestor

**Penalties**: Up to $7,500 per intentional violation; $2,500 per unintentional

**Compliance Steps**:
1. Determine if CCPA applies (based on thresholds)
2. Update privacy policy with CCPA language
3. Implement user request process
4. "Do Not Sell" link if selling data (most SaaS don't sell)
5. Train employees on data handling
6. Review vendor contracts

### Other State Privacy Laws

**Similar laws in**:
- Virginia: VCDPA
- Colorado: CPA
- Connecticut: CTDPA
- Utah: UCPA

**General requirements**: Privacy policies, user rights, data security

### Data Security Requirements

**Reasonable Security Measures**:
- Encryption (in transit with SSL/TLS, at rest)
- Access controls (role-based)
- Authentication (strong passwords, 2FA)
- Regular security updates
- Employee training
- Incident response plan
- Regular audits

**Data Breach Notification**:
- Most states require notification if breach
- Timeline: 30-90 days depending on state
- Must notify affected individuals
- May need to notify regulators
- May need to provide credit monitoring

**SOC 2 Compliance** (optional but valuable):
- Security audit by third-party
- Demonstrates security controls
- Type I: Point-in-time
- Type II: Over period (more valuable)
- Cost: $20K-100K
- **Benefit**: Enterprise customers require it

## 4. Payment Processing Compliance (PCI-DSS)

### What is PCI-DSS?

**PCI-DSS**: Payment Card Industry Data Security Standard

**Applies If**: You accept, process, or store credit card data

**For CoodLoom POS**: **Critical compliance**

### PCI Compliance Levels

Based on annual transaction volume:

**Level 1**: 6M+ transactions/year
- Annual onsite audit by QSA (Qualified Security Assessor)
- Cost: $50K-200K
- Network scans

**Level 2**: 1-6M transactions/year
- Annual self-assessment questionnaire (SAQ)
- Quarterly network scans

**Level 3**: 20K-1M transactions/year (for e-commerce)
- Annual SAQ
- Quarterly network scans

**Level 4**: <20K transactions/year (e-commerce) or <1M (other)
- Annual SAQ
- Quarterly network scans (if applicable)

**Most CoodLoom customers**: Level 4 (simplest)

### PCI Requirements (Summary)

**12 Requirements**:
1. Firewall configuration
2. No default passwords
3. Protect stored cardholder data
4. Encrypt transmission of data
5. Use anti-virus software
6. Secure systems and applications
7. Restrict access to cardholder data
8. Assign unique ID to each person with access
9. Restrict physical access
10. Track and monitor all access
11. Regularly test security
12. Maintain security policy

### Easiest Path: Don't Store Card Data

**Solution**: Use payment processor that handles card data

**How It Works**:
1. Customer enters card info in processor's secure form (Stripe, Square)
2. Processor stores card, gives you token
3. You only store token (not actual card number)
4. To charge: Send token to processor
5. **You never see or store actual card data**

**Benefit**: Reduces PCI scope dramatically

**Processors Offering This**:
- Stripe: Stripe.js, Elements
- Square: Square Payment Form
- Braintree: Hosted Fields
- Authorize.Net: Accept.js

**Your PCI Requirement**: SAQ-A (shortest questionnaire, 13 questions)

### If You Must Store Card Data

**Don't do this unless absolutely necessary**

**Requirements**:
- Encrypt stored data
- Secure storage (not in database with other data)
- Access logging
- Regular audits
- Network segmentation
- **PCI Requirement**: Full SAQ-D (300+ questions) or onsite audit

**Cost**: $50K-500K/year for full compliance

**Recommendation**: **Use tokenization**, don't store cards

### PCI Compliance Steps

**For CoodLoom**:

**Recommended Approach** (SAQ-A):
1. Use Stripe/Square with Elements/Payment Form
2. Never see or touch card data
3. Complete SAQ-A questionnaire (annually)
4. Attest compliance
5. Provide Attestation of Compliance (AOC) to customers if requested

**Cost**: $0-300/year depending on processor

**Tools**:
- **Stripe Radar**: Fraud detection (included)
- **PCI compliance scanning**: Varies ($100-500/year)

## 5. Securities Law (If Raising Capital)

### What Triggers Securities Law

**Issuing "Securities"**:
- Stock (common or preferred)
- Stock options
- Convertible notes
- SAFEs (Simple Agreement for Future Equity)
- Any investment contract

**SEC Regulations Apply**

### Key Rules

**Rule 506(b)** - Private Placement:
- Raise unlimited amount
- Unlimited accredited investors
- Up to 35 non-accredited (sophisticated) investors
- No general solicitation (can't advertise)
- Must provide disclosure documents

**Rule 506(c)** - Private Placement with General Solicitation:
- Raise unlimited amount
- Only accredited investors (must verify)
- CAN advertise and publicly solicit
- Must verify accredited status (income/net worth docs)

**Accredited Investor**:
- Income: $200K+ individual ($300K+ joint) for past 2 years
- Net worth: $1M+ (excluding primary residence)
- Certain professionals (Series 7, 65, 82 licenses)

**Regulation CF** - Crowdfunding:
- Raise up to $5M/year
- From anyone (accredited or not)
- Must use registered crowdfunding platform
- Disclosure requirements
- Annual reports

**Regulation A+** - Mini-IPO:
- Tier 1: Up to $20M/year
- Tier 2: Up to $75M/year
- Can advertise
- Must file offering statement with SEC
- Expensive ($100K-500K)

### State Securities (Blue Sky Laws)

**Must Also Comply With**:
- State where company is located
- State where investors are located
- Can add cost and complexity

**Exemptions**: Many states recognize federal exemptions (506(b), 506(c))

### Stock Options for Employees

**Not a Securities Offering** (Usually):
- If granted to employees (not consultants)
- As compensation
- Under equity incentive plan

**Requirements**:
- Board-approved stock option plan
- Fair market value exercise price (409A valuation)
- Vesting terms
- Early exercise allowed (optional)

**409A Valuation**:
- Required to set fair market value of common stock
- Independent valuation by firm
- Cost: $2K-10K
- Refresh annually or after funding round

### Compliance Checklist (Fundraising)

**Before Raising**:
- [ ] Consult securities lawyer ($5K-15K)
- [ ] Choose exemption (506(b), 506(c), etc.)
- [ ] Prepare offering documents (PPM, term sheet)
- [ ] Create data room with company docs

**During Raise**:
- [ ] Verify accredited investor status (if 506(c))
- [ ] Provide disclosure documents
- [ ] Execute subscription agreements
- [ ] File Form D with SEC (within 15 days)
- [ ] File blue sky filings (if required by state)

**After Raise**:
- [ ] Update cap table
- [ ] Issue stock certificates
- [ ] Update board/shareholder consents
- [ ] Annual reports (if Reg CF or Reg A+)

## 6. Accessibility Compliance (ADA, WCAG)

### Americans with Disabilities Act (ADA)

**Applies To**: Public accommodations (including websites)

**Requirement**: Websites and software must be accessible to people with disabilities

**Who Enforces**: DOJ (Department of Justice), private lawsuits

**Standards**: No specific technical standard, but WCAG 2.1 AA considered best practice

### WCAG (Web Content Accessibility Guidelines)

**Levels**:
- **A**: Minimum (easiest)
- **AA**: Mid-range (recommended for compliance)
- **AAA**: Highest (often not fully achievable)

**Four Principles (POUR)**:
1. **Perceivable**: Information and UI must be presented so users can perceive it
2. **Operable**: UI and navigation must be operable
3. **Understandable**: Information and UI must be understandable
4. **Robust**: Content must be robust enough to work with assistive technologies

**Key Requirements (AA)**:
- **Keyboard navigation**: All functions accessible via keyboard
- **Alt text**: Images have descriptive alt text
- **Color contrast**: 4.5:1 for normal text, 3:1 for large text
- **Captions**: Videos have captions
- **Focus indicators**: Visible focus on interactive elements
- **Form labels**: All form fields have clear labels
- **Heading structure**: Proper heading hierarchy (H1, H2, H3)
- **Link text**: Descriptive link text (not "click here")
- **No time limits**: Or ability to extend
- **Screen reader friendly**: Semantic HTML, ARIA labels

### Compliance Steps

**For CoodLoom Website & Software**:

1. **Audit current site**:
   - Tools: WAVE, axe DevTools, Lighthouse
   - Manual testing with screen reader (NVDA, JAWS, VoiceOver)
   - Cost: $0 (DIY) or $2K-10K (professional audit)

2. **Fix issues**:
   - Alt text for images
   - Improve color contrast
   - Keyboard navigation
   - Fix heading structure
   - ARIA labels where needed

3. **Ongoing compliance**:
   - Test new features for accessibility
   - Train developers on accessibility
   - Regular audits (annually)

4. **Accessibility statement**:
   - Page explaining your commitment
   - How to report issues
   - Contact info for questions

**Cost**: $5K-50K depending on current state and complexity

**ROI**: 
- Avoid lawsuits (increasing trend)
- Reach more customers (15-20% of population has disability)
- Better SEO (Google rewards accessibility)
- Government contracts may require

## 7. Export Control & International

### Export Control Laws

**ITAR** (International Traffic in Arms Regulations):
- Governs defense-related items
- **Not applicable to CoodLoom** (not defense/weapons)

**EAR** (Export Administration Regulations):
- Governs commercial and dual-use items
- **May apply to CoodLoom** if encryption > 64-bit

**Encryption Export**:
- Software with strong encryption may require notification
- **TSU Exception**: Can qualify for unrestricted export if submit one-time notification
- File: [bis.doc.gov](https://www.bis.doc.gov/)

### Sanctions and Embargoes

**OFAC** (Office of Foreign Assets Control):
- Cannot do business with certain countries:
  - Cuba, Iran, North Korea, Syria, Russia (partially)
- Cannot do business with individuals/entities on SDN List

**Compliance**:
- Screen customers against SDN list
- Block access from sanctioned countries
- Tools: Stripe Radar, ComplyAdvantage ($100+/month)

### GDPR (Covered Above)

**Also applies** if targeting EU market

### Tax Treaties

**Avoid Double Taxation**:
- US has tax treaties with many countries
- Withholding rates vary
- Consult international tax accountant if significant international revenue

## Compliance Tools & Services

### Compliance Software

**For Data Privacy**:
- **OneTrust** ($5K-50K/year): Enterprise privacy management
- **TrustArc** ($3K-30K/year): Privacy compliance
- **Cookiebot** ($10-50/month): Cookie consent

**For Accessibility**:
- **AudioEye** ($500-2K/month): Automated accessibility
- **UsableNet** ($1K-5K/month): Accessibility compliance
- **accessiBe** ($49-100/month): AI-powered accessibility (controversial, use with caution)

**For SOC 2**:
- **Vanta** ($3K-6K/year): Automates SOC 2 compliance
- **Drata** ($3K-6K/year): Similar to Vanta
- **Secureframe** ($2K-5K/year): Compliance automation

**For Security**:
- **Qualys** ($2K+/year): Vulnerability scanning
- **Tenable** ($2K+/year): Security monitoring

### Professional Services

**Lawyers**:
- Securities lawyer: $5K-25K for fundraise
- Employment lawyer: $2K-5K for handbook/policies
- Privacy lawyer: $5K-15K for GDPR/CCPA compliance

**Accountants/CPAs**:
- Startup CPA: $2K-10K/year
- Sales tax specialist: $1K-5K setup + ongoing

**Compliance Consultants**:
- SOC 2 consultant: $10K-50K
- GDPR consultant: $5K-20K
- PCI consultant: $5K-20K

**Background Check Services**:
- Checkr: $35-50/check
- GoodHire: $30-100/check
- HireRight: $25-100/check

### Insurance (Risk Management)

**Types**:
- **General Liability**: $500-2K/year
- **Professional Liability (E&O)**: $1K-5K/year
- **Cyber Liability**: $1K-5K/year (covers data breaches)
- **D&O Insurance**: $1K-10K/year (directors & officers)
- **Workers' Comp**: 1-5% of payroll (required in most states)

**Where to Buy**:
- Embroker: Startup-focused
- Hiscox: Small business
- CoverWallet: Compare quotes

## Compliance Budget

### Year 1 (Bootstrap)

**Must Have** ($5K-15K):
- CPA: $2K-5K
- Payroll service: $1K-2K
- Business insurance: $2K-5K
- Legal (basic contracts): $2K-5K

**Nice to Have** ($5K-10K):
- Employment lawyer (handbook): $2K-3K
- Sales tax automation: $500-1K
- Accessibility audit: $2K-5K

**Total**: $10K-25K

### Year 2+ (Growth)

**Add**:
- SOC 2 audit: $20K-50K
- Additional legal: $10K-25K
- Compliance tools: $5K-15K
- Additional insurance: $5K-10K

**Total**: $40K-100K/year

### Enterprise Sales

**Requirements from Enterprise Customers**:
- SOC 2 Type II: $20K-50K
- GDPR compliance: $5K-20K
- DPA and BAA: $2K-5K (legal)
- Penetration testing: $10K-25K
- Insurance (higher limits): $5K-15K

**Total**: $40K-115K

**Worth it if**: Deal size > $50K-100K/year

## Compliance Checklist

### Immediate (Before Launch)

- [ ] Choose business structure and incorporate
- [ ] Get EIN from IRS
- [ ] Open business bank account
- [ ] Set up accounting system (QuickBooks)
- [ ] Create privacy policy
- [ ] Create terms of service
- [ ] Get business insurance (GL, E&O)
- [ ] Register for state taxes (sales tax if applicable)
- [ ] File beneficial ownership report (FinCEN)

### Before First Customer

- [ ] Customer contract template
- [ ] Privacy policy live on website
- [ ] Terms of service live on website
- [ ] PCI-compliant payment processing (Stripe with Elements)
- [ ] Accessibility audit and fixes (basic)
- [ ] GDPR compliance basics (if EU customers)
- [ ] Cookie consent banner (if EU traffic)

### Before First Employee

- [ ] Workers' comp insurance
- [ ] Payroll service (Gusto, Rippling)
- [ ] Employee handbook
- [ ] Employment agreement template
- [ ] I-9 forms ready
- [ ] Required labor law posters

### Ongoing (Quarterly/Annual)

- [ ] Estimated tax payments (quarterly)
- [ ] Sales tax returns (monthly/quarterly)
- [ ] Payroll tax returns (quarterly)
- [ ] Income tax returns (annual)
- [ ] Delaware franchise tax (annual)
- [ ] Business licenses renewal (annual)
- [ ] Insurance renewals (annual)
- [ ] Beneficial ownership updates (as needed)
- [ ] SOC 2 audit (annual if applicable)

## Penalties for Non-Compliance

**Just to scare you straight**:

**Tax Penalties**:
- Late filing: 5% per month (max 25%)
- Late payment: 0.5% per month
- Underpayment: Varies, can be significant
- Payroll tax failure: 100% penalty (personal liability)

**Employment Penalties**:
- I-9 violations: $250-2,500 per form
- Misclassification: Back taxes + penalties ($50K-100K+)
- FLSA violations: Back wages + equal damages + attorney fees
- Discrimination: $50K-300K+ settlements

**Privacy Violations**:
- GDPR: €20M or 4% of global revenue
- CCPA: $2,500-7,500 per violation
- Data breach costs: Average $4.45M (IBM 2023 study)

**PCI Non-Compliance**:
- Fines: $5K-100K/month
- Card brand may drop you (can't accept cards)
- Liability for breaches: Potentially millions

**Securities Violations**:
- Civil penalties: $50K-150K per violation
- Criminal: Up to $5M and 20 years prison (willful violations)
- Rescission: Must give investors money back

## Key Takeaways

✓ **Compliance is not optional** - Penalties can destroy your business
✓ **Start with basics** - CPA, insurance, contracts, privacy policy
✓ **Hire professionals** - CPA and lawyer are worth every penny
✓ **Don't store card data** - Use Stripe/Square, stay PCI SAQ-A
✓ **Employee vs contractor matters** - Misclassification is expensive
✓ **GDPR applies to you** - If you have EU customers
✓ **Accessibility is important** - Avoid lawsuits, reach more customers
✓ **Budget for compliance** - $10K-25K year 1, more as you grow
✓ **Track ALL expenses** - Tax deductions save money
✓ **Keep good records** - IRS can audit up to 7 years back

## Next Steps

**This Week**:
1. [ ] Hire CPA specializing in startups
2. [ ] Get quotes for business insurance
3. [ ] Set up accounting system
4. [ ] Create privacy policy

**This Month**:
5. [ ] Set up payroll system (if hiring)
6. [ ] Register for sales tax (if applicable)
7. [ ] Review PCI compliance requirements
8. [ ] Basic accessibility audit

**This Quarter**:
9. [ ] Employment handbook (if hiring)
10. [ ] Quarterly estimated taxes
11. [ ] Review all compliance areas
12. [ ] Move to Chapter 7: Domain & Trademark

---

**Compliance is boring but essential. Budget for it, hire professionals, and sleep well at night knowing you won't be surprised by fines or lawsuits.**
