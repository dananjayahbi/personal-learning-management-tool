# Compliance Checklist

Use this checklist to ensure you're meeting all legal and regulatory requirements for your SaaS/POS business.

## Daily/Weekly Checks

### Customer Data Security
- [ ] Monitor system logs for security incidents
- [ ] Review failed login attempts
- [ ] Check backup completion
- [ ] Review customer support tickets for security issues

**Frequency**: Daily (automated alerts preferred)

### Financial Transactions
- [ ] Reconcile payment processor (Stripe, Square)
- [ ] Review refunds and chargebacks
- [ ] Monitor for fraudulent transactions

**Frequency**: Daily or as transactions occur

## Monthly Checks

### Payroll & Employment (If Employees)
- [ ] Process payroll
- [ ] Remit payroll taxes (federal, state)
- [ ] Update time tracking records
- [ ] Review contractor payments

**Due**: By 15th of following month (payroll taxes)
**Tools**: Gusto, Rippling, ADP

### Sales Tax (If Applicable)
- [ ] Calculate sales tax collected
- [ ] File sales tax returns (states where required)
- [ ] Remit collected sales tax
- [ ] Review nexus (new states where you have obligation?)

**Due**: Varies by state (typically monthly or quarterly)
**Tools**: TaxJar, Avalara, Stripe Tax

### Accounting
- [ ] Reconcile bank accounts
- [ ] Categorize expenses
- [ ] Review P&L and balance sheet
- [ ] Update cash flow projection

**Best Practice**: Do this monthly, review with bookkeeper
**Tools**: QuickBooks, Xero

### Marketing Compliance
- [ ] Review email unsubscribes (honor within 10 days)
- [ ] Check CAN-SPAM compliance (all emails)
- [ ] Review ad copy (no false claims)

## Quarterly Checks

### Tax Payments
- [ ] Estimated federal income taxes (if profitable)
- [ ] Estimated state income taxes
- [ ] Payroll tax returns (Form 941)

**Due Dates**:
- Q1: April 15
- Q2: June 15
- Q3: September 15
- Q4: January 15 (following year)

### Financial Review
- [ ] Review financial statements with CPA
- [ ] Adjust budget for next quarter
- [ ] Review burn rate and runway
- [ ] Update financial projections

### Security & Compliance
- [ ] Review access controls (who has access to what?)
- [ ] Audit user permissions
- [ ] Test backup restoration
- [ ] Review vendor security assessments

### Corporate Governance
- [ ] Board meeting (if formal board)
- [ ] Review corporate resolutions
- [ ] Update cap table (if any equity changes)

## Annual Checks

### Tax Returns
- [ ] Federal corporate tax return (Form 1120 or 1120S)
- [ ] State corporate tax return
- [ ] Personal tax returns (founders)
- [ ] Prepare/send 1099s to contractors (by Jan 31)
- [ ] Prepare/send W-2s to employees (by Jan 31)
- [ ] File 1099s and W-2s with IRS (by Feb 28 or March 31 electronic)

**Due Dates**:
- C-Corp (Form 1120): April 15
- S-Corp (Form 1120S): March 15
- Partnership (Form 1065): March 15
- Extensions available (file by due date)

**Recommendation**: Hire CPA ($2K-5K/year)

### Delaware Franchise Tax (If Delaware Corp)
- [ ] Calculate franchise tax (assumed par value or authorized shares method)
- [ ] Pay franchise tax ($450 minimum)
- [ ] File annual report

**Due**: March 1
**Penalty**: $200 + interest if late
**Worst Case**: Administrative dissolution if very late

### State Compliance
- [ ] State annual report (most states)
- [ ] Business license renewal (if applicable)
- [ ] Professional licenses renewal (if applicable)

**Due**: Varies by state (often anniversary of incorporation or calendar year-end)
**Cost**: $50-500 depending on state

### Insurance Review
- [ ] Review general liability policy
- [ ] Review E&O policy
- [ ] Review cyber liability policy
- [ ] Review D&O policy (if applicable)
- [ ] Shop for better rates
- [ ] Update coverage based on business growth

**Typical Renewal**: Anniversary of policy start

### Employee Reviews & Benefits
- [ ] Performance reviews (all employees)
- [ ] Compensation adjustments
- [ ] Benefits renewal (health insurance, etc.)
- [ ] Update employee handbook (if changes)
- [ ] Review 401(k) contributions

### Corporate Maintenance
- [ ] Review and update bylaws (if needed)
- [ ] Annual board meeting (required)
- [ ] Update corporate records
- [ ] Review founders agreement (any changes?)
- [ ] Update cap table (final check)

### Contracts Review
- [ ] Review all customer contracts expiring soon
- [ ] Review vendor/supplier contracts
- [ ] Update terms of service (if needed)
- [ ] Update privacy policy (if needed)
- [ ] Review employment agreements

### Intellectual Property
- [ ] Trademark maintenance (if 5-6 or 9-10 years)
- [ ] Patent annuity fees (if applicable)
- [ ] Review IP portfolio
- [ ] Monitor for infringement

### Data Privacy & Security
- [ ] GDPR compliance review (if EU customers)
- [ ] CCPA compliance review (if CA customers)
- [ ] Privacy policy update (if needed)
- [ ] Data breach readiness drill
- [ ] Security audit (internal or third-party)

### Domain & Brand
- [ ] Renew domain registrations (set to auto-renew!)
- [ ] Check for trademark infringement
- [ ] Monitor brand mentions
- [ ] Renew SSL certificates (usually auto-renew)

## Industry-Specific Compliance

### PCI-DSS (Payment Card Industry)

**If You Handle Credit Cards** (for CoodLoom, critical):

**Quarterly**:
- [ ] Run vulnerability scans (if required for your level)
- [ ] Review payment logs for anomalies

**Annually**:
- [ ] Complete Self-Assessment Questionnaire (SAQ)
- [ ] Attest to PCI compliance
- [ ] Provide Attestation of Compliance (AOC) to customers if requested

**Level 4** (most small businesses):
- SAQ-A if using Stripe/Square with Elements (13 questions)
- SAQ-D if storing card data (300+ questions - avoid!)

**Tools**: Payment processor usually provides guidance (Stripe, Square)

### SOC 2 (If Enterprise Customers)

**What**: Security audit demonstrating controls

**Timeline**:
- Type I: Point-in-time (3-6 months to prep)
- Type II: Over period, typically 6-12 months

**Cost**: $20K-100K

**When Needed**: Enterprise customers require it (typically $50K+ deals)

**Preparation**:
- [ ] Choose auditor (Big 4 or boutique)
- [ ] Implement controls (security policies, access management, etc.)
- [ ] Run for observation period (Type II)
- [ ] Audit performed
- [ ] Receive report
- [ ] Share with customers

**Tools**: Vanta ($3K-6K/year), Drata ($3K-6K/year), Secureframe ($2K-5K/year) - automate compliance

### GDPR (If EU Customers)

**Ongoing**:
- [ ] Honor data subject requests within 30 days:
  - Right to access (provide data)
  - Right to deletion (delete data)
  - Right to portability (export data)
  - Right to rectification (correct data)
- [ ] Maintain records of processing activities
- [ ] Data breach notification within 72 hours (if occurs)

**Annually**:
- [ ] Review Data Processing Agreements with customers
- [ ] Audit vendors for GDPR compliance
- [ ] Update privacy policy (if needed)
- [ ] Review data retention policies

**Tools**: OneTrust ($5K+/year), TrustArc ($3K+/year)

### CCPA (If California Customers)

**Ongoing**:
- [ ] Honor consumer requests within 45 days:
  - Right to know (what data collected)
  - Right to delete
  - Right to opt-out of sale (if selling data)
- [ ] "Do Not Sell My Personal Information" link (if selling)

**Annually**:
- [ ] Review privacy policy for CCPA compliance
- [ ] Train employees on data handling

**Threshold**: Applies if:
- Revenue > $25M, OR
- 50K+ CA consumers, OR
- 50%+ revenue from selling data

## Milestone-Based Compliance

### Before First Customer
- [ ] Terms of service published
- [ ] Privacy policy published
- [ ] Data security measures implemented
- [ ] PCI-compliant payment processing
- [ ] Business insurance obtained

### Before First Employee
- [ ] Workers' compensation insurance
- [ ] Payroll system set up
- [ ] Employee handbook created
- [ ] Employment agreement template
- [ ] I-9 forms ready
- [ ] Required posters (federal and state)
- [ ] E-Verify registered (if using)

### Before Raising Capital
- [ ] Corporate records in order
- [ ] Cap table accurate
- [ ] All IP assigned to company
- [ ] Compliance with securities law
- [ ] Clean legal/tax filings

### Before Enterprise Sales
- [ ] SOC 2 Type II (often required)
- [ ] Data Processing Agreement (DPA)
- [ ] Business Associate Agreement (BAA) if healthcare
- [ ] Comprehensive insurance ($1M-5M liability)
- [ ] Professional contracts (not just ToS)

## Red Flags & Common Issues

### IRS Red Flags
❌ Late payroll tax payments (serious penalties)
❌ Misclassifying employees as contractors
❌ Not filing 1099s for contractors
❌ Personal and business expenses mixed
❌ Large cash transactions not reported

**Penalty Examples**:
- Late payroll tax: 100% penalty (personal liability)
- Misclassification: Back taxes + penalties ($50K-100K+)
- Late 1099s: $50-280 per form

### Employment Law Red Flags
❌ No I-9s for employees
❌ Not paying overtime to non-exempt employees
❌ No workers' compensation insurance
❌ Discriminatory hiring/firing
❌ No meal/rest breaks (in states requiring them)

### Data Privacy Red Flags
❌ No privacy policy
❌ Not honoring deletion requests
❌ Data breach not reported
❌ Sharing data without consent
❌ No cookie consent (EU visitors)

### PCI-DSS Red Flags
❌ Storing full credit card numbers
❌ No encryption
❌ Not completing SAQ
❌ Failed vulnerability scan

## Compliance Budget

### Bootstrap (Year 1)
- CPA: $2K-5K
- Lawyer (basic): $2K-5K
- Payroll service: $500-2K
- Accounting software: $360-2,400
- Insurance: $2K-5K
- Sales tax automation: $300-1K (if applicable)
- **Total**: $7K-20K

### Growth (Year 2+)
- CPA: $5K-15K
- Lawyer: $5K-15K
- Payroll: $1K-5K
- Accounting: $1K-5K
- Insurance: $5K-15K
- Compliance tools: $5K-15K
- **Total**: $22K-70K

### Enterprise Sales (Adding SOC 2)
- SOC 2 audit: $20K-100K
- Compliance automation (Vanta, Drata): $3K-6K
- Additional legal: $10K-25K
- **Total**: $55K-200K

## Tools & Services

### Accounting & Finance
- **QuickBooks Online**: $30-200/month
- **Xero**: $13-70/month
- **Bookkeeper**: $500-2K/month
- **CPA**: $2K-10K/year

### Payroll
- **Gusto**: $40+/month (recommended)
- **Rippling**: $8/user/month
- **ADP**: $100+/month

### Tax Compliance
- **TaxJar**: Sales tax automation ($19-99/month)
- **Avalara**: Enterprise sales tax ($100+/month)
- **TurboTax Business**: $200/year (DIY tax filing)

### Legal
- **Clerky**: Documents and templates ($250-400/year)
- **Rocket Lawyer**: $40/month
- **LawTrades**: On-demand lawyers ($100-500/hour)
- **Startup lawyer**: $300-600/hour or flat fees

### Data Privacy
- **OneTrust**: Privacy management ($5K+/year)
- **Termly**: Privacy policy generator ($10-100/month)
- **Cookiebot**: Cookie consent ($10-50/month)

### Security & Compliance
- **Vanta**: SOC 2 automation ($3K-6K/year)
- **Drata**: Similar to Vanta ($3K-6K/year)
- **Qualys**: Vulnerability scanning ($2K+/year)

### Trademark & IP
- **Trademark Engine**: Filing assistance ($150+)
- **LegalZoom**: Trademark filing ($100-200 + fees)
- **TrademarkNow**: Monitoring ($100-300/month)

## Compliance Calendar

### January
- [ ] Send 1099s to contractors (by Jan 31)
- [ ] Send W-2s to employees (by Jan 31)
- [ ] Q4 estimated taxes (by Jan 15)
- [ ] Review prior year compliance
- [ ] Plan current year compliance budget

### February
- [ ] File 1099s and W-2s with IRS (by Feb 28 paper, March 31 electronic)
- [ ] Delaware franchise tax due (March 1)

### March
- [ ] S-Corp/Partnership tax returns (March 15)
- [ ] Delaware franchise tax paid (March 1)
- [ ] Q1 compliance review

### April
- [ ] Q1 estimated taxes (April 15)
- [ ] C-Corp tax returns (April 15)
- [ ] Individual tax returns (April 15)
- [ ] Q1 payroll tax return (April 30)

### May
- [ ] Mid-year compliance check
- [ ] Review insurance policies

### June
- [ ] Q2 estimated taxes (June 15)

### July
- [ ] Q2 payroll tax return (July 31)
- [ ] Mid-year financial review

### August
- [ ] Plan Q3-Q4 compliance

### September
- [ ] Q3 estimated taxes (Sept 15)

### October
- [ ] Q3 payroll tax return (Oct 31)
- [ ] Q4 planning (tax, budget)
- [ ] Review annual insurance renewals

### November
- [ ] Year-end tax planning
- [ ] Review all contracts expiring in next year

### December
- [ ] Annual board meeting
- [ ] Year-end accounting close
- [ ] Prepare for tax season (organize docs)

## Emergency Procedures

### Data Breach Response
1. [ ] Contain breach (isolate affected systems)
2. [ ] Assess scope (what data, how many customers)
3. [ ] Notify legal counsel (within hours)
4. [ ] Notify affected customers (timeline varies by state)
5. [ ] Notify regulators (GDPR: 72 hours)
6. [ ] Document everything
7. [ ] Offer credit monitoring (if SSN exposed)
8. [ ] Post-mortem and improve security

### IRS Audit
1. [ ] Don't panic
2. [ ] Contact CPA immediately
3. [ ] Gather requested documents
4. [ ] Do NOT speak to IRS without CPA/lawyer
5. [ ] Respond timely
6. [ ] Appeal if disagree with findings

### Employment Dispute
1. [ ] Document everything (performance, incidents)
2. [ ] Contact employment lawyer immediately
3. [ ] Do NOT retaliate
4. [ ] Follow your employee handbook
5. [ ] Consider settlement (often cheaper than lawsuit)

### Trademark Infringement
1. [ ] Document infringement (screenshots, dates)
2. [ ] Assess risk (how similar, same industry?)
3. [ ] Consult trademark lawyer
4. [ ] Send cease & desist (lawyer recommended)
5. [ ] Negotiate settlement
6. [ ] File lawsuit (last resort, expensive)

## Compliance Score

**Rate yourself (1-10 for each category)**:

- [ ] Tax compliance (federal, state, local): ___/10
- [ ] Employment law compliance: ___/10
- [ ] Data privacy (GDPR, CCPA): ___/10
- [ ] Payment security (PCI-DSS): ___/10
- [ ] Corporate governance: ___/10
- [ ] Intellectual property protection: ___/10
- [ ] Insurance coverage: ___/10
- [ ] Record keeping: ___/10

**Total Score**: ___/80

**Rating**:
- 70-80: Excellent compliance
- 60-69: Good, minor improvements needed
- 50-59: Adequate, but gaps to address
- Below 50: Significant compliance risk - take action!

## Next Actions

**Based on your score, prioritize**:

**Score < 50**: Critical issues, seek professional help immediately
- [ ] Schedule CPA consultation
- [ ] Schedule lawyer consultation
- [ ] Address top 3 risks

**Score 50-59**: Good foundation, improve weak areas
- [ ] Identify top 3 weakest categories
- [ ] Create 90-day improvement plan
- [ ] Implement systems to maintain compliance

**Score 60-69**: Minor gaps, maintain and improve
- [ ] Address specific gaps
- [ ] Automate where possible
- [ ] Annual review process

**Score 70+**: Excellent, keep it up!
- [ ] Maintain systems
- [ ] Stay updated on law changes
- [ ] Help others (your compliance can be selling point)

## Compliance as Competitive Advantage

**Enterprise Sales**: SOC 2, GDPR, strong compliance = trusted partner

**Investor Confidence**: Clean records = easier due diligence = higher valuation

**Risk Mitigation**: Avoid fines, lawsuits, business disruption

**Sleep Well**: Know you're doing it right

---

**Compliance isn't sexy, but it's essential. Build it into your processes from day one, and it becomes automatic.**

**Use this checklist monthly/quarterly/annually to stay on track. Set calendar reminders. Automate where possible. Hire professionals for complex areas.**

**Your future self will thank you.**

---

**Last Updated**: [Date]
**Next Review**: [Quarterly]
**Reviewed By**: [Your Name, CPA, Lawyer]
