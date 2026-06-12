import { useState } from "react";

const data = {
  updatedDate: "June 11, 2026  --  PPI and Claims updated. UMich June prelim releases June 12.",
  indicators: [
    {
      id: "cpi",
      label: "CPI (May)",
      value: "4.2%",
      sub: "+0.5% this month",
      note: "3-year high. Energy up 23.5% over the past year.",
      signal: "red",
      signalLabel: "HOT",
      category: "inflation",
      behind: [
        { stat: "Real impact on a $60K household", value: "−$2,520/yr", context: "4.2% inflation on typical household spending." },
        { stat: "Share of May's increase from energy", value: "Over 60%", context: "Most of the spike was gasoline. Core inflation is softer,." },
        { stat: "Months above 3.5% in a row", value: "2", context: "April was 3.8%. May is 4.2%. The trend is moving in the." },
      ],
    },
    {
      id: "core-cpi",
      label: "Core CPI (May)",
      value: "2.9%",
      sub: "+0.2% this month",
      note: "Strips out food and energy. Tariff pressure is muted.",
      signal: "yellow",
      signalLabel: "WATCH",
      category: "inflation",
      behind: [
        { stat: "Gap between headline and core", value: "1.3 points", context: "Energy is doing the work. If core starts rising too, that." },
        { stat: "Shelter inflation", value: "Still elevated", context: "Housing costs are the biggest piece of core CPI." },
      ],
    },
    {
      id: "ppi",
      label: "PPI (May)",
      value: "−0.2%",
      sub: "Month over month. Forecast was +0.7%. First monthly decline.",
      note: "Wholesale inflation cooling. Gives the Fed more room. Pipeline.",
      signal: "green",
      signalLabel: "COOL",
      category: "inflation",
      behind: [
        { stat: "What this means", value: "Relief signal", context: "Wholesale prices are what producers pay before costs reach." },
        { stat: "The split picture", value: "PPI cool, CPI still hot", context: "Consumer prices are still 4.2% driven by energy." },
        { stat: "Fed implication", value: "Hold confirmed, cut possible later", context: "A cool PPI does not give the Fed reason to cut now with CPI." },
      ],
    },
    {
      id: "fed",
      label: "Fed Funds Rate",
      value: "3.50–3.75%",
      sub: "No change expected. Next meeting: June 16–17.",
      note: "New Chair Kevin Warsh. April vote was 8 to 4 to hold.",
      signal: "yellow",
      signalLabel: "HOLD",
      category: "monetary",
      behind: [
        { stat: "Votes to cut rates at last meeting", value: "4 out of 12", context: "The most divided Fed vote in over three decades." },
        { stat: "Real interest rate (adjusted for inflation)", value: "About −0.5%", context: "At 3.625% midpoint against 4.2% CPI, the real rate is still." },
        { stat: "Market odds of a cut in June", value: "Under 5%", context: "After yesterday's CPI report, markets have essentially." },
      ],
    },
    {
      id: "jobs",
      label: "Payrolls (May)",
      value: "172,000",
      sub: "Forecasters expected 85,000",
      note: "Beat by more than double. Prior months revised up by 93,000.",
      signal: "green",
      signalLabel: "STRONG",
      category: "labor",
      behind: [
        { stat: "Where the jobs are", value: "Leisure, hospitality, local govt", context: "These sectors are adding jobs." },
        { stat: "Financial services jobs lost since May 2025", value: "107,000", context: "Higher-paid white-collar employment has been shrinking for." },
        { stat: "Hiring rate", value: "Frozen", context: "Job openings are not being filled at the pace of prior." },
      ],
    },
    {
      id: "unemployment",
      label: "Unemployment Rate",
      value: "4.3%",
      sub: "Unchanged. Has held between 4.3% and 4.5% since July 2025.",
      note: "The broader U-6 rate is 8.1%. Long-term unemployed: 27.5% of all.",
      signal: "yellow",
      signalLabel: "WATCH",
      category: "labor",
      behind: [
        { stat: "U-6  --  the real unemployment rate", value: "8.1%", context: "U-6 adds discouraged workers and people working part-time." },
        { stat: "Long-term unemployed", value: "27.5% of jobless", context: "More than 1 in 4 unemployed people have been out of work." },
        { stat: "Working part-time, want full-time", value: "4.8 million", context: "These workers are counted as employed in the headline." },
        { stat: "Labor force participation rate", value: "61.8%", context: "Before the pandemic it was 63.3%." },
      ],
    },
    {
      id: "wages",
      label: "Wage Growth",
      value: "+3.4%",
      sub: "Year over year. +0.3% this month.",
      note: "Real wages are negative. Prices are rising faster than pay.",
      signal: "red",
      signalLabel: "SQUEEZE",
      category: "consumer",
    },
    {
      id: "jobless",
      label: "Weekly Jobless Claims",
      value: "242,000",
      sub: "Highest since August 2023. Forecast was 220,000.",
      note: "Jumped 22,000 above forecast. Labor market cracks appearing beneath.",
      signal: "red",
      signalLabel: "RISING",
      category: "labor",
      behind: [
        { stat: "Beat by", value: "+22,000", context: "Forecasters expected 220,000. The actual number was 242,000." },
        { stat: "Last time this high", value: "August 2023", context: "Claims have been quietly rising for weeks." },
        { stat: "What it means next to payrolls", value: "Contradiction", context: "May payrolls added 172,000 jobs." },
        { stat: "Federal employee claims", value: "Rising", context: "Federal workforce reduction claims have been ticking up." },
      ],
    },
    {
      id: "umich",
      label: "Consumer Sentiment (June prelim.)",
      value: "48.9",
      sub: "June 12, 2026. Up from 44.8 May final. Still near historic.",
      note: "Relief rally, not recovery. Gas dropped $4.56 to $4.12 -- prices.",
      signal: "red",
      signalLabel: "NEAR LOWS",
      category: "consumer",
      behind: [
        { stat: "June prelim vs May final", value: "48.9 vs 44.8", context: "Up 4.1 points. Relief from gas prices flattening, not." },
        { stat: "Gas price move", value: "$4.56 to $4.12 over 3 weeks", context: "Prices stopped climbing. $4.12 is still very high -- the." },
        { stat: "Long-run inflation expectations", value: "3.9% -- up from 3.5%", context: "Rose despite the sentiment bump. Consumers expect inflation." },
        { stat: "Who drove the improvement", value: "Lower-income households", context: "Families with thin margins felt gas price relief most. Any." },
        { stat: "The bottom line", value: "Still near historic lows", context: "48.9 means things did not get worse this month. It does not." },
      ],
        },
    {
      id: "energy",
      label: "Energy Prices (May)",
      value: "+23.5%",
      sub: "Year over year. Gasoline is the main driver.",
      note: "Iran conflict is keeping pressure on.",
      signal: "red",
      signalLabel: "CRITICAL",
      category: "inflation",
      behind: [
        { stat: "Extra annual fuel cost on a typical household", value: "$800–1,200", context: "Estimated additional cost at current energy inflation." },
        { stat: "Energy as share of spending for lower-income.", value: "8–10%", context: "vs. about 3–4% for higher-income households." },
        { stat: "Geopolitical variable", value: "Active", context: "President Trump warned Iran will pay the price this week." },
      ],
    },
    {
      id: "snap",
      label: "SNAP Benefit Cuts",
      value: "Oct 1",
      sub: "$187 billion cut over 10 years",
      note: "States must cover 75% of admin costs. Some may limit or exit the.",
      signal: "red",
      signalLabel: "STRUCTURAL",
      category: "stress",
    },
    {
      id: "fincen",
      label: "FinCEN Banking Advisory",
      value: "June 5",
      sub: "Banks directed to flag customers by immigration status",
      note: "Using an ITIN is now a red flag. So is sharing an address.",
      signal: "red",
      signalLabel: "ACTIVE",
      category: "policy",
      behind: [
        { stat: "Red flags listed that describe ordinary life", value: "18", context: "Shared address, shared phone number, ITIN use, cash." },
        { stat: "Agencies coordinating", value: "5", context: "FinCEN, IRS, FDIC, OCC, and the National Credit Union." },
        { stat: "SAR tracking code", value: "FINANCIALINTEGRITY-2026-A002", context: "Banks are asked to tag suspicious activity reports with." },
      ],
    },
    {
      id: "cc-delinquency",
      label: "Credit Card Delinquency",
      value: "2.9%",
      sub: "Q1 2026. Above pre-pandemic level of 2.6%.",
      note: "Headline is improving. Small bank rate is 6.4%  --  more than.",
      signal: "yellow",
      signalLabel: "ELEVATED",
      category: "stress",
      behind: [
        { stat: "Big bank delinquency rate", value: "~3%", context: "Large institutions look relatively stable." },
        { stat: "Small bank delinquency rate", value: "6.4%", context: "Community banks serve lower-income and rural households." },
        { stat: "Total credit card debt", value: "$1.252 trillion", context: "Down slightly from the Q4 2025 record of $1.277 trillion,." },
        { stat: "Average APR on cards carrying a balance", value: "21.52%", context: "Down slightly from 22.3% in Q4 2025, but still near." },
        { stat: "Charge-off rate", value: "3.8%", context: "When a bank charges off a card account it exits the." },
      ],
    },
    {
      id: "auto-delinquency",
      label: "Auto Loan Delinquency",
      value: "5.6%",
      sub: "Q1 2026. 90+ days past due. Near post-financial-crisis high.",
      note: "Subprime auto at record highs. Car payments are the last bill.",
      signal: "red",
      signalLabel: "STRESS",
      category: "stress",
      behind: [
        { stat: "Subprime auto delinquency (60+ days)", value: "6.8%", context: "The highest level on record going back to the early 1990s,." },
        { stat: "Prime auto delinquency", value: "0.42%", context: "Prime borrowers are fine. The stress is entirely." },
        { stat: "Total auto loan balances", value: "$1.68 trillion", context: "Up $43 billion year over year. Auto loan balances surged." },
        { stat: "Why auto delinquency matters", value: "Leading indicator", context: "Car payments are typically the last bill people stop paying." },
      ],
    },
    {
      id: "mortgage-delinquency",
      label: "Mortgage Delinquency",
      value: "4.44%",
      sub: "Q1 2026. Up 40 basis points from a year ago.",
      note: "FHA loans at 11.52%. Foreclosure starts rising.",
      signal: "red",
      signalLabel: "RISING",
      category: "stress",
      behind: [
        { stat: "FHA loan delinquency rate", value: "11.52%", context: "FHA loans serve first-time and lower-income homebuyers." },
        { stat: "VA loan delinquency rate", value: "~6.7%", context: "About 225 basis points above conventional loans." },
        { stat: "Foreclosure process rate", value: "0.64%", context: "Up 11 basis points from Q4 2025 and 15 basis points from a." },
        { stat: "Foreclosure actions started in Q1", value: "0.24%", context: "Up 4 basis points from last quarter. The pipeline is." },
      ],
    },
    {
      id: "total-household-debt",
      label: "Total Household Debt",
      value: "$18.8 trillion",
      sub: "Q1 2026. Up $18 billion from Q4 2025.",
      note: "4.8% of all outstanding debt is in some stage of delinquency.",
      signal: "yellow",
      signalLabel: "WATCH",
      category: "economy",
      behind: [
        { stat: "Share of debt in delinquency", value: "4.8%", context: "Nearly 1 in 20 dollars of household debt is past due." },
        { stat: "Credit card debt increase since 2021", value: "+63%", context: "$482 billion in new credit card debt in five years." },
        { stat: "New auto loans in Q1", value: "$182 billion", context: "Originations remain high despite delinquency stress,." },
        { stat: "The K-shape in one sentence", value: "Aggregate looks stable. Components do not.", context: "Total debt rose only $18 billion." },
      ],
    },
    {
      id: "sp500",
      label: "S&P 500",
      value: "7,267",
      sub: "June 10, 2026. Down 1.62% on the day.",
      note: "Down from the April high. Dow fell 1.87%, Nasdaq 1.98% on Tuesday.",
      signal: "yellow",
      signalLabel: "RETREATING",
      category: "markets",
      behind: [
        { stat: "Year-to-date performance", value: "Volatile", context: "The S&P hit highs in late 2025, pulled back sharply on." },
        { stat: "Implied future annual return (CAPE-based)", value: "1.9%", context: "At current valuations, the Shiller CAPE model implies a." },
        { stat: "Tuesday's selloff driver", value: "Hot CPI + rising claims", context: "Wednesday's CPI at 4.2% and Thursday's jobless claims at." },
      ],
    },
    {
      id: "cape",
      label: "Shiller CAPE Ratio",
      value: "39.9",
      sub: "June 1, 2026. Historical median: 16.1.",
      note: "23.9% above its own long-term average of 32.2. Implies very low.",
      signal: "red",
      signalLabel: "OVERVALUED",
      category: "markets",
      behind: [
        { stat: "Historical median CAPE", value: "16.1", context: "The market is trading at nearly 2.5 times its historical." },
        { stat: "Only times CAPE was higher", value: "1999-2000 and 2020-2022", context: "Both periods ended in significant corrections." },
        { stat: "Regular P/E ratio", value: "24.8", context: "The trailing P/E is 24.8, near its 20-year average of 25.3." },
        { stat: "What this means for your 401K", value: "Lower expected returns", context: "If you are in an index fund and 10+ years from retirement,." },
      ],
    },
    {
      id: "vix",
      label: "VIX  --  Fear Index",
      value: "22.2",
      sub: "June 10, 2026. Up 11.8% on the day.",
      note: "52-week range: 13.4 to 35.3. Elevated but off the March peak of.",
      signal: "yellow",
      signalLabel: "ELEVATED",
      category: "markets",
      behind: [
        { stat: "What the VIX measures", value: "Expected volatility, next 30 days", context: "The VIX is the market's best guess about how much the S&P." },
        { stat: "Why it jumped 11.8% Tuesday", value: "CPI + claims combination", context: "Hot inflation plus rising unemployment claims in the same." },
        { stat: "Implication for your portfolio", value: "Hedging costs are rising", context: "A higher VIX means options-based protection costs more." },
        { stat: "MOVE index (bond volatility)", value: "~77", context: "Treasury market volatility is also elevated, off its March." },
      ],
    },
    {
      id: "credit-spreads",
      label: "High Yield Credit Spreads",
      value: "~300 bps",
      sub: "Mid-April 2026. Tightest since June 2007.",
      note: "Spreads say everything is fine. Default rates say otherwise.",
      signal: "red",
      signalLabel: "COMPLACENT",
      category: "markets",
      behind: [
        { stat: "What spreads are saying", value: "No fear of defaults", context: "At 300 basis points, high yield spreads are pricing a very." },
        { stat: "What default rates are saying", value: "4.2–4.5% trailing default rate", context: "Moody's trailing 12-month high yield default rate is 4.2 to." },
        { stat: "Investment grade spreads", value: "~85 bps  --  near 25-year tights", context: "Investment grade corporate bonds are also priced for." },
        { stat: "The risk in plain language", value: "The bond market is not worried. It should be.", context: "Tight spreads while defaults are rising means investors are." },
      ],
    },
    {
      id: "sixty-forty",
      label: "60/40 Portfolio",
      value: "Under pressure",
      sub: "Stocks and bonds falling together. The hedge is broken.",
      note: "When inflation is high, bonds do not offset stock losses.",
      signal: "red",
      signalLabel: "BROKEN",
      category: "markets",
      behind: [
        { stat: "Why the 60/40 worked for 40 years", value: "Stocks and bonds moved opposite", context: "When stocks fell, investors fled to bonds, pushing bond." },
        { stat: "Why it stopped working", value: "Inflation changed the math", context: "When inflation is high, the Fed cannot cut rates to rescue." },
        { stat: "2022 was the warning", value: "Both stocks and bonds fell 15–20%", context: "2022 was the worst year for the 60/40 since the 1930s." },
        { stat: "What replaces it", value: "Real assets, short duration, alternatives", context: "TIPS, commodities, short-term bonds, and real assets tend." },
      ],
    },
    {
      id: "ten-year",
      label: "10-Year Treasury Yield",
      value: "~4.5%",
      sub: "June 10, 2026. The benchmark rate for everything.",
      note: "Mortgage rates, auto loans, corporate debt, and the U.S.",
      signal: "yellow",
      signalLabel: "ELEVATED",
      category: "economy",
      behind: [
        { stat: "30-year mortgage rate right now", value: "6.55%", context: "Bankrate June 11, 2026. The 10-year yield drives mortgage." },
        { stat: "Spread: mortgage over 10-year", value: "~2.05 percentage points", context: "Historically the spread runs 1.5 to 2 points." },
        { stat: "CBO 10-year yield forecast, end 2026", value: "4.1%", context: "The Congressional Budget Office projects yields to ease to." },
      ],
    },
    {
      id: "mortgage-rate",
      label: "30-Year Mortgage Rate",
      value: "6.55%",
      sub: "June 11, 2026. Up from 6.48% last week. Freddie Mac: 6.48%.",
      note: "Hopes for sub-6% rates in 2026 keep fading.",
      signal: "red",
      signalLabel: "STUCK",
      category: "economy",
      behind: [
        { stat: "Rate one year ago", value: "6.85%", context: "Rates have fallen modestly over the past year but are not." },
        { stat: "Monthly payment: $400K home at 6.55%", value: "$2,530/month", context: "The same mortgage at the 2021 average rate of 3.1% would." },
        { stat: "Why rates are stuck", value: "10-year yield + inflation", context: "The Fed does not set mortgage rates directly." },
        { stat: "Refinance rate", value: "6.69%", context: "Refinancing costs more than a new purchase loan." },
      ],
    },
    {
      id: "home-affordability",
      label: "Home Price to Income Ratio",
      value: "~7.2x",
      sub: "2026 estimate. Historical average: ~3.5x.",
      note: "Buying a home now requires more than 7 years of gross household.",
      signal: "red",
      signalLabel: "CRISIS",
      category: "economy",
      behind: [
        { stat: "Historical norm", value: "3 to 4x income", context: "For most of the post-war era, a median home cost 3 to 4." },
        { stat: "What created this gap", value: "Low rates + limited supply + investor buying", context: "A decade of near-zero rates inflated asset prices." },
        { stat: "Stuck market dynamic", value: "No one can afford to buy or sell", context: "Existing homeowners with 3% mortgages will not sell and." },
        { stat: "Freddie Mac: income growth vs. home prices", value: "Income growth outpacing prices  --  marginally", context: "Freddie Mac noted in June that income growth is marginally." },
      ],
    },
    {
      id: "savings-rate",
      label: "Personal Savings Rate",
      value: "2.6%",
      sub: "April 2026. BEA. Down from 4.5% in January 2026.",
      note: "The household buffer is thinning. Historical average is 8.4%.",
      signal: "red",
      signalLabel: "DEPLETING",
      category: "consumer",
      behind: [
        { stat: "Historical average savings rate", value: "8.4%", context: "From 1959 to 2026, Americans saved an average of 8.4% of." },
        { stat: "What happened to savings", value: "Inflation absorbed them", context: "Pandemic-era savings built a buffer through 2022." },
        { stat: "April spending increase vs. income", value: "Spending +0.5%, income flat", context: "In April 2026, consumer spending rose 0.5% while personal." },
        { stat: "Why 2.6% matters", value: "No cushion for October", context: "SNAP cuts hit October 1. Energy bills peak in Q4." },
      ],
    },
    {
      id: "retail-sales",
      label: "Retail Sales (April / May due Jun 17)",
      value: "+0.5%",
      sub: "April month over month. May report releases June 17 -- the.",
      note: "Nominal numbers look healthy but are inflated by high gas prices..",
      signal: "yellow",
      signalLabel: "WATCH",
      category: "consumer",
      behind: [
        { stat: "The nominal number is misleading", value: "Gas inflates the headline", context: "Retail sales are not adjusted for inflation. When gas." },
        { stat: "What is actually being cut", value: "Clothing, furniture, restaurants", context: "Clothing and furniture sales have dropped. Restaurant sales." },
        { stat: "Where spending is shifting", value: "Online and warehouse clubs", context: "Online retailers seeing steady growth -- people buy online." },
        { stat: "How remaining spending is financed", value: "Savings drain and credit cards", context: "Tax refund season is over. People are increasingly draining." },
        { stat: "What to watch June 17", value: "Ex-gas retail sales number", context: "If the ex-gasoline retail sales number is flat or negative,." },
      ],
    },
    {
      id: "wti",
      label: "WTI Crude Oil",
      value: "~$91/barrel",
      sub: "June 10–11, 2026. Brent near $94.",
      note: "Trump says Iran deal is close -- Tehran denies. If deal closes:.",
      signal: "red",
      signalLabel: "ELEVATED",
      category: "economy",
      behind: [
        { stat: "Price one year ago", value: "~$64/barrel", context: "Oil is up roughly 42% year over year." },
        { stat: "EIA peak forecast", value: "$115/barrel Q2 2026", context: "The Energy Information Administration forecast Brent." },
        { stat: "Strait of Hormuz status", value: "Near-total closure", context: "The Strait carries roughly 20% of global oil supply." },
        { stat: "Impact on every other price", value: "Diesel, fertilizer, transportation", context: "Oil does not just affect gas prices. Diesel moves freight." },
      ],
    },
    {
      id: "tech-layoffs",
      label: "Tech Layoffs (2026 YTD)",
      value: "184,000+",
      sub: "Through June 2026. 1,136 layoffs per day -- double 2025 pace.",
      note: "48% explicitly attributed to AI displacement. Amazon, Oracle, Meta, Intuit leading. On pace for 370,000 full year.",
      signal: "red",
      signalLabel: "ACCELERATING",
      category: "labor",
      behind: [
        { stat: "2026 vs 2025 pace", value: "1,136/day vs 564/day", context: "The 2026 pace is double 2025. 33% increase over same period last year. On pace to approach the 2023 post-pandemic record of 430,000." },
        { stat: "AI attribution rate", value: "48% of Q1 cuts", context: "Nearly half of Q1 2026 tech layoffs explicitly attributed to AI by the companies themselves. Up from under 8% in 2025. The euphemism is gone." },
        { stat: "Largest cuts", value: "Amazon 30K, Oracle 30K, Meta 8K", context: "All announced record AI capital expenditure the same quarter they cut headcount. Combined hyperscaler AI capex: $700 billion in 2026." },
        { stat: "Young engineer impact", value: "Software dev employment under 26 down 20% since 2024", context: "Stanford HAI data. AI is not just displacing entry-level workers -- it is closing the entry point entirely." },
        { stat: "The Aware Trade thesis connection", value: "Workers built the tool that eliminated their leverage", context: "Project Maven 2018 to 2026: the same workers who built AI infrastructure are being displaced by it. Upper-K job losses compress the spending assumptions the consumer thesis relies on." },
      ],
    },
    {
      id: "nfib",
      label: "NFIB Small Business Optimism",
      value: "95.3",
      sub: "May 2026. Below 52-year average of 98.0 for second straight.",
      note: "Uncertainty index at 91  --  well above historical average of 68.",
      signal: "yellow",
      signalLabel: "FRAGILE",
      category: "economy",
    },
    {
      id: "fed-debt",
      label: "Federal Debt",
      value: "$39 trillion",
      sub: "Gross debt eclipsed $39T March 17 2026. Debt-to-GDP above.",
      note: "Interest payments hit $1T annually -- surpassing defense spending.",
      signal: "red",
      signalLabel: "CRITICAL",
      category: "debt",
    },
    {
      id: "treasury-auction",
      label: "Treasury Auction Demand",
      value: "Watch",
      sub: "Bid-to-cover ratios declining on longer maturities.",
      note: "Weak auctions signal insufficient demand at current yields --.",
      signal: "yellow",
      signalLabel: "WATCH",
      category: "debt",
    },
    {
      id: "cre-office",
      label: "CRE Office Loan Delinquency",
      value: "12.34%",
      sub: "Record high as of January 2026. Trepp data.",
      note: "Office vacancy above 20% nationally. $1 trillion in CRE loans.",
      signal: "red",
      signalLabel: "STRESS",
      category: "debt",
    },
    {
      id: "private-equity",
      label: "Private Equity Stress",
      value: "$1T unrealized",
      sub: "Estimated unrealized assets at mid-2025. PwC estimate.",
      note: "62% of pension funds exceeded PE allocation targets.",
      signal: "yellow",
      signalLabel: "FROZEN",
      category: "debt",
    },
    {
      id: "dxy",
      label: "U.S. Dollar Index (DXY)",
      value: "~100",
      sub: "June 11, 2026. Down ~10% from Jan 2025 peak of 109+.",
      note: "Steepest H1 decline since 1973.",
      signal: "yellow",
      signalLabel: "WEAKENING",
      category: "dollar",
    },
    {
      id: "dollar-reserves",
      label: "Dollar Share of Global Reserves",
      value: "~57%",
      sub: "Q3 2025 IMF COFER. Lowest since 1995.",
      note: "Down from 72% in 2001. Structural decline confirmed.",
      signal: "yellow",
      signalLabel: "DECLINING",
      category: "dollar",
    },
    {
      id: "gold-reserves",
      label: "Central Bank Gold Purchases",
      value: "1,000+ tonnes",
      sub: "Third consecutive year above 1,000 tonnes. 2024 total:.",
      note: "More than double the 473-tonne annual average from 2010 to 2021.",
      signal: "red",
      signalLabel: "ACCELERATING",
      category: "dollar",
    },
    {
      id: "mbridge",
      label: "mBridge  --  Cross-Border CBDC",
      value: "$55.5B settled",
      sub: "2,500x increase since 2022. 15-second settlement. No SWIFT.",
      note: "China, UAE, Saudi Arabia, Thailand, Hong Kong. BIS withdrew Oct.",
      signal: "red",
      signalLabel: "ACTIVE",
      category: "dollar",
    },
    {
      id: "agora",
      label: "Project Agora  --  Western Response",
      value: "Real-value testing 2026",
      sub: "7 central banks, 40+ institutions. Prototype confirmed May.",
      note: "Fed NY, Bank of England, Bank of Japan.",
      signal: "yellow",
      signalLabel: "BUILDING",
      category: "dollar",
      behind: [
        { stat: "What Agora is", value: "Western tokenized cross-border settlement", context: "The BIS-led Western answer to mBridge." },
        { stat: "Prototype confirmed May 27 2026", value: "Atomic settlement works", context: "BIS confirmed atomic multi-currency settlement is." },
        { stat: "The programmability clause", value: "Smart contracts in transactions", context: "Agora allows institutions to embed compliance requirements." },
        { stat: "mBridge vs. Agora", value: "Two parallel architectures", context: "mBridge settles outside the dollar system. Agora modernizes." },
      ],
    },
    {
      id: "petrodollar",
      label: "Petrodollar Agreement",
      value: "Expired",
      sub: "June 9, 2024. No renewal. No replacement agreement.",
      note: "Saudi Arabia can now price oil in any currency.",
      signal: "yellow",
      signalLabel: "WATCH",
      category: "dollar",
      behind: [
        { stat: "What the agreement was", value: "1974 US-Saudi arrangement", context: "Saudi Arabia agreed to price oil in dollars and recycle." },
        { stat: "What expiration means  --  documented", value: "No legal obligation to price in dollars", context: "Saudi Arabia is no longer bound by any agreement to price." },
        { stat: "What expiration means  --  structural.", value: "Possible multi-currency pricing", context: "Saudi Arabia has discussed yuan-denominated oil sales with." },
        { stat: "Why it matters regardless", value: "Treasury recycling at risk", context: "For decades, Saudi oil revenues became dollar purchases,." },
      ],
    },
  ],
  behind_narrative: [
    { label: "Today's Data: Two Stories, One Direction", text: "PPI fell 0.2%  --  wholesale inflation cooling. But jobless claims hit 242,000, highest since August 2023.", level: "yellow" },
    { label: "The Job Quality Problem", text: "172,000 jobs added in May. But financial services lost 22,000  --  down 107,000 from its peak.", level: "red" },
    { label: "The Real Wage Trap", text: "Wages up 3.4%. Prices up 4.2%. The gap costs a $60K household roughly $480 a year.", level: "red" },
    { label: "The Stagflation Setup", text: "Fed on hold. Cannot cut: CPI 4.2%. Cannot hike: labor fragile. April vote 8-4, most divided in decades.", level: "yellow" },
    { label: "The Economy in Plain Language", text: "Mortgage rate 6.55%. Home prices at 7x median income. Savings rate 2.6% vs. 8.4% historical average. NFIB below average two.", level: "red" },
    { label: "The Debt Trap Beneath the Headline", text: "Americans added $482B in credit card debt since 2021 at 21.52% APR. Subprime auto delinquency hit a record 6.9% in January.", level: "red" },
    { label: "The K-Shape Is Cracking", text: "Savings at 2.6%, credit maxed at 21.5% APR, real wages negative, SNAP cuts October 1.", level: "red" },
    { label: "The Dollar Is Losing Ground", text: "Dollar reserve share below 57% for the first time since 1995, down from 72% in 2001. DXY down 10% from January 2025 peak.", level: "yellow" },
    { label: "The Market Is Expensive", text: "Shiller CAPE at 39.9 implies 1.9% annual returns over 10 years  --  below inflation.", level: "red" },
    { label: "Your Bank Is Now an Immigration File", text: "June 5: five federal agencies directed banks to flag customers by immigration status.", level: "red" },
  ],
    thesis: [
    { label: "Real Wage Gap", text: "Wages up 3.4%. Prices up 4.2%. Workers are losing purchasing power every month this gap continues.", level: "red" },
    { label: "Stagflation Risk", text: "Strong headline jobs, frozen hiring, inflation re-accelerating. The Fed cannot cut. Classic trap.", level: "yellow" },
    { label: "Benefits Cliff", text: "SNAP cuts take effect October 1. Same quarter energy bills peak and surveillance pricing accelerates.", level: "red" },
    { label: "Payment Rail Weaponization", text: "FinCEN advisory turns every bank account into an immigration file. The architecture was already built. Now it is being used.", level: "red" },
  ],
  contagion: [
    { stage: "Stage 1", status: "complete", label: "Lower-K Balance Sheets Broke", date: "2023-2025",
      text: "Subprime auto delinquency hit record highs. Small bank credit card delinquency reached 6.4%. FHA mortgage delinquency at 11.52%.",
      triggers: [], level: "red" },
    { stage: "Stage 2", status: "active", label: "Lower-K Spending Contracting", date: "Now  --  Q3 2026",
      text: "NFIB retail sector most pessimistic of all industries. Jobless claims jumped to 242,000. Small business hiring at lowest since.",
      triggers: ["NFIB retail optimism lowest of all sectors", "Jobless claims 242K, highest since Aug 2023", "Small business job openings lowest since May 2020"], level: "red" },
    { stage: "Stage 3", status: "approaching", label: "Corporate Earnings Miss  --  Lower-K Visible", date: "Q4 2026 / Jan-Feb 2027",
      text: "SNAP cuts land October 1. Energy bills peak seasonally. Lower-K spending cliff becomes visible in earnings for the first time.",
      triggers: ["SNAP cuts October 1  --  watch November retail sales", "October CPI  --  does energy spike persist?", "Dollar General and Dollar Tree Q3 guidance"], level: "yellow" },
    { stage: "Stage 4", status: "risk", label: "Upper-K Contagion", date: "Q4 2026  --  Q2 2027",
      text: "The upper K is insulated until three things happen: unemployment rises into the professional class, home equity stops functioning.",
      triggers: ["Jobless claims crossing 300K consistently", "High yield spreads widening past 450 bps", "Upper-income quintile UMich sentiment falling"], level: "yellow" },
  ],
  ideas: [
    {
      id: "tbills", theme: "Short-Term Treasury Bills / Notes", weight: "19%",
      signal: "green", conviction: "High", assetClass: "Fixed Income",
      bestAccount: "Taxable -- T-bill interest is exempt from state and local taxes.",
      rationale: "The largest allocation in the model and the right call in this environment. Fed on hold at 3.50-3.75% with no June cut.",
      instruments: [
        { name: "iShares 0-3 Month Treasury Bond ETF", ticker: "SGOV", type: "ETF" },
        { name: "3-Month T-Bills direct via TreasuryDirect.gov", ticker: null, type: "Direct" },
        { name: "Vanguard Ultra-Short Bond ETF", ticker: "VUSB", type: "ETF" },
      ],
      caveat: "Yield advantage disappears when the Fed cuts. Watch September 2026 FOMC closely.",
    },
    {
      id: "domestic-eq", theme: "Domestic Equity", weight: "28%",
      signal: "yellow", conviction: "Medium", assetClass: "Equities",
      bestAccount: "Taxable for long-term holds (capital gains rates).",
      rationale: "Broad domestic equity with a tilt toward industrials, utilities, and energy services. Broad small cap (SCHA) replaced with quality-screened.",
      instruments: [
        { name: "US Industrials ETF", ticker: "XLI", type: "ETF" },
        { name: "US Utilities ETF", ticker: "XLU", type: "ETF" },
        { name: "US Oil & Gas Equipment & Services ETF", ticker: "OIH", type: "ETF" },
        { name: "US Large Cap Equal Weight ETF", ticker: "RSP", type: "ETF" },
        { name: "Capital Group Conservative Equity ETF -- active, strong balance sheets, dividends", ticker: "CGCV", type: "Active ETF" },
        { name: "Washington Mutual Investors Fund -- value tilt, income, est. 1952", ticker: "AWSHX", type: "Mutual Fund" },
        { name: "O'Shares US Small-Cap Quality Dividend ETF -- quality-screened small cap", ticker: "OUSM", type: "ETF" },
        { name: "US Biotech ETF", ticker: "XBI", type: "ETF" },
      ],
      caveat: "OUSM screens for quality and dividends within small cap -- better than broad SCHA in this environment..",
    },
    {
      id: "intl-eq", theme: "International Equity", weight: "20%",
      signal: "yellow", conviction: "Medium", assetClass: "Equities",
      bestAccount: "Taxable -- foreign tax credits on international dividends are only usable in taxable.",
      rationale: "Dollar weakness is the thesis. DXY down 10% from January 2025 peak. When the dollar falls, international assets outperform in dollar terms.",
      instruments: [
        { name: "Latin America ETF", ticker: "ILF", type: "ETF" },
        { name: "Developed International Markets ETF", ticker: "EFA", type: "ETF" },
        { name: "Emerging Markets ETF", ticker: "EEM", type: "ETF" },
        { name: "Global Metals & Mining Producers ETF", ticker: "PICK", type: "ETF" },
        { name: "Capital Group International Core Equity ETF -- active, dividend focus, incl. EM", ticker: "CGIC", type: "Active ETF" },
        { name: "Capital Group New Geography Equity ETF -- active EM, revenue-based not domicile, 34.7% 12-month return", ticker: "CGNG", type: "Active ETF" },
      ],
      caveat: "Dollar weakness thesis reverses if Iran conflict drives safe-haven dollar demand. CGNG note: Rob Lovelace,.",
    },
    {
      id: "gold-assets", theme: "Gold, Silver & Industrial Metals", weight: "12.5%",
      signal: "green", conviction: "High", assetClass: "Commodities",
      bestAccount: "IRA -- gold and silver ETFs taxed as collectibles at 28% in taxable accounts.",
      rationale: "Two distinct theses in one allocation. Gold and silver as monetary hedges: when governments print money to service debt -- the only exit.",
      instruments: [
        { name: "Gold Bullion ETF", ticker: "GLD", type: "ETF" },
        { name: "iShares Gold Trust -- lower expense ratio than GLD", ticker: "IAU", type: "ETF" },
        { name: "Sprott Active Gold & Silver Miners ETF -- active, royalty/streaming tilt, only active miners ETF", ticker: "GBUG", type: "Active ETF" },
        { name: "Precious Metals Miners & Royalty ETF -- passive miners alternative", ticker: "GDX", type: "ETF" },
        { name: "Silver Bullion ETF -- monetary and industrial demand", ticker: "SLV", type: "ETF" },
        { name: "abrdn Physical Silver Shares ETF -- lower expense ratio than SLV", ticker: "SIVR", type: "ETF" },
        { name: "abrdn Physical Precious Metals Basket -- gold, silver, platinum, palladium in one, K-1, use in IRA", ticker: "GLTR", type: "ETF" },
        { name: "Sprott Active Metals & Miners ETF -- active, copper, uranium, lithium, rare earths", ticker: "METL", type: "Active ETF" },
        { name: "Global X Copper Miners ETF -- passive copper miners", ticker: "COPX", type: "ETF" },
        { name: "US Copper Index Fund -- direct copper futures, K-1, use in IRA", ticker: "CPER", type: "ETF" },
      ],
      caveat: "Gold and silver ETFs (GLD, IAU, SLV, SIVR) are taxed as collectibles at 28% in taxable accounts -- always.",
    },
    {
      id: "bonds", theme: "Bonds", weight: "15%",
      signal: "yellow", conviction: "Medium", assetClass: "Fixed Income",
      bestAccount: "IRA / 401k -- bond interest taxed as ordinary income annually.",
      rationale: "The most debated allocation in this environment. Intermediate Treasuries provide rate exposure.",
      instruments: [
        { name: "Long-Term Treasury Bond ETF", ticker: "TLT", type: "ETF" },
        { name: "Intermediate-Term Treasury Bond ETF", ticker: "IEF", type: "ETF" },
        { name: "EM Bonds Local Currency ETF", ticker: "EBND", type: "ETF" },
        { name: "Capital Group Core Plus Income ETF -- active duration management", ticker: "CGCP", type: "Active ETF" },
      ],
      caveat: "TLT is a thesis-dependent position. With CPI at 4.2% and the Fed on hold, long bonds carry duration risk.",
    },
    {
      id: "commodities", theme: "Commodities Basket", weight: "5%",
      signal: "green", conviction: "Medium", assetClass: "Commodities",
      bestAccount: "Taxable for PDBC, PDBA, EVMT -- no K-1, no administrative burden. IRA for DBC which.",
      rationale: "Broad inflation hedge. Energy CPI at 23.5%, food price pressure building into Q4.",
      instruments: [
        { name: "Invesco Optimum Yield Diversified Commodity Strategy -- broad basket, no K-1", ticker: "PDBC", type: "ETF" },
        { name: "Invesco Agriculture Commodity Strategy -- food as strategic reserve, no K-1", ticker: "PDBA", type: "ETF" },
        { name: "Invesco EV Metals Commodity Strategy -- lithium, cobalt, nickel, copper, no K-1", ticker: "EVMT", type: "ETF" },
        { name: "Invesco DB Commodity Index Tracking Fund -- broad basket, K-1, use in IRA", ticker: "DBC", type: "ETF" },
      ],
      caveat: "Critical tax note: commodity ETFs holding futures directly generate K-1 forms in taxable accounts, delaying.",
    },
    {
      id: "healthcare-broad", theme: "Healthcare", weight: "3-5% new position",
      signal: "green", conviction: "High", assetClass: "Equities",
      bestAccount: "Taxable -- qualified dividends at lower tax rate. Roth IRA for highest-growth names like.",
      rationale: "Healthcare demand is non-discretionary. People do not stop needing medication or insurance when inflation is high. Stress -- financial,.",
      instruments: [
        { name: "Health Care Select Sector SPDR -- broad exposure", ticker: "XLV", type: "ETF" },
        { name: "Vanguard Health Care ETF -- lower expense ratio", ticker: "VHT", type: "ETF" },
        { name: "Capital Group Health Care ETF -- active, tilts toward pharma and managed care", ticker: "CGHC", type: "Active ETF" },
        { name: "Eli Lilly -- GLP-1 tailwind, largely macro-independent", ticker: "LLY", type: "Stock" },
      ],
      caveat: "Avoid healthcare REITs (WELL, VTR) -- rate-sensitive like all REITs. Medical devices more cyclical; elective.",
    },
  ],
  caution: [
    { id: "c0", theme: "S&P 500 Index Funds -- Know What You Own",
      reason: "Index funds are not bad -- they are the right answer most of the time.",
      instruments: [
        { name: "SPDR S&P 500 ETF", ticker: "SPY", type: "Caution" },
        { name: "Vanguard S&P 500 ETF", ticker: "VOO", type: "Caution" },
        { name: "iShares Core S&P 500 ETF", ticker: "IVV", type: "Caution" },
      ],
    },
    { id: "c05", theme: "American Balanced / 60/40 Funds and Fund-of-Funds",
      reason: "Two cautions. American Balanced (ABALX) is classic 60/40 in active clothing -- active.",
      instruments: [
        { name: "American Balanced Fund", ticker: "ABALX", type: "Caution" },
        { name: "Income Fund of America", ticker: "AMECX", type: "Caution" },
        { name: "Growth and Income Portfolio -- fund-of-funds, double fee layer", ticker: "GAIOX", type: "Caution" },
      ],
    },
    { id: "c06", theme: "Growth Fund of America",
      reason: "Large cap U.S. growth tilt at Shiller CAPE 39.9. High-quality management does not change.",
      instruments: [
        { name: "Growth Fund of America", ticker: "AGTHX", type: "Caution" },
        { name: "American Funds New Perspective", ticker: "ANWPX", type: "Caution" },
      ],
    },
    { id: "c1", theme: "Long-Duration Bonds (standalone)",
      reason: "TLT held outside the Warsh cut thesis carries pure duration risk.",
      instruments: [
        { name: "iShares 20+ Year Treasury Bond ETF", ticker: "TLT", type: "Caution" },
        { name: "Vanguard Long-Term Treasury ETF", ticker: "VGLT", type: "Caution" },
      ],
    },
    { id: "c2", theme: "Dollar Store / Lower-K Consumer",
      reason: "Dollar General and Dollar Tree look defensive but are not.",
      instruments: [
        { name: "Dollar General", ticker: "DG", type: "Caution" },
        { name: "Dollar Tree / Family Dollar", ticker: "DLTR", type: "Caution" },
        { name: "Darden Restaurants -- casual dining", ticker: "DRI", type: "Caution" },
      ],
    },
    { id: "c3", theme: "Consumer Discretionary Broad",
      reason: "Real wages negative, SNAP cuts October 1, savings at 2.6%.",
      instruments: [
        { name: "Consumer Discretionary Select Sector SPDR", ticker: "XLY", type: "Caution" },
        { name: "Vanguard Consumer Discretionary ETF", ticker: "VCR", type: "Caution" },
      ],
    },
    { id: "c4", theme: "ARK Innovation / High-Duration Growth",
      reason: "High-multiple growth stocks are vulnerable if the Fed holds or is forced to hike.",
      instruments: [
        { name: "ARK Innovation ETF", ticker: "ARKK", type: "Caution" },
        { name: "ARK Next Generation Internet ETF", ticker: "ARKW", type: "Caution" },
      ],
    },
    { id: "c5", theme: "REITs",
      reason: "Mortgage rates at 6.55%, FHA delinquency at 11.52%, foreclosure pipeline filling.",
      instruments: [
        { name: "Vanguard Real Estate ETF", ticker: "VNQ", type: "Caution" },
        { name: "Realty Income -- net lease REIT", ticker: "O", type: "Caution" },
        { name: "Welltower -- healthcare REIT", ticker: "WELL", type: "Caution" },
      ],
    },
  ],
  consider: [
    {
      id: "qual", theme: "Quality Factor Screen", ticker: "QUAL",
      signal: "yellow", conviction: "High", assetClass: "Equities",
      bestAccount: "Taxable -- low turnover means minimal annual tax drag. Long-term capital gains rates.",
      rationale: "The model has Large Cap Equal Weight at 2.5% but no quality filter.",
      instruments: [
        { name: "iShares MSCI USA Quality Factor ETF", ticker: "QUAL", type: "ETF" },
        { name: "Capital Group Conservative Equity ETF -- same team as American Mutual", ticker: "CGCV", type: "Active ETF" },
      ],
      caveat: "Quality stocks still carry market risk. They outperform in relative terms but still fall in a broad selloff.",
    },
    {
      id: "dividends", theme: "Dividend Income", ticker: "VIG, DVY",
      signal: "yellow", conviction: "Medium", assetClass: "Equities",
      bestAccount: "Taxable for qualified dividends (lower tax rate).",
      rationale: "Real wages are negative. Consumers need income from somewhere.",
      instruments: [
        { name: "Vanguard Dividend Appreciation ETF -- dividend growth focus", ticker: "VIG", type: "ETF" },
        { name: "iShares Select Dividend ETF -- current yield focus", ticker: "DVY", type: "ETF" },
        { name: "Schwab U.S. Dividend Equity ETF", ticker: "SCHD", type: "ETF" },
        { name: "Capital Group Dividend Value ETF -- active, avoids yield traps", ticker: "CGDV", type: "Active ETF" },
      ],
      caveat: "Dividend stocks are rate-sensitive. If rates rise further, high-yield dividend stocks face headwinds.",
    },
    {
      id: "staples", theme: "Consumer Staples", ticker: "VDC, XLP",
      signal: "yellow", conviction: "Medium", assetClass: "Equities",
      bestAccount: "Taxable -- low turnover, qualified dividends. Works in IRA too.",
      rationale: "This is not a lower-K play. It is an upper-K defensive play. Lower-K households are cutting spending including staples -- the savings rate.",
      instruments: [
        { name: "Vanguard Consumer Staples ETF", ticker: "VDC", type: "ETF" },
        { name: "Consumer Staples Select Sector SPDR", ticker: "XLP", type: "ETF" },
      ],
      caveat: "Staples are not immune to inflation -- input costs rise with energy and food prices. Actively managed staples.",
    },
    {
      id: "japan", theme: "Japan (Developed International Tilt)", ticker: "EWJ",
      signal: "yellow", conviction: "Medium", assetClass: "International Equities",
      bestAccount: "Taxable -- foreign tax credits on Japanese dividends are only usable in taxable accounts,.",
      rationale: "Within developed international exposure, Japan deserves a specific allocation. Weak yen makes Japanese exports competitive globally.",
      instruments: [
        { name: "iShares MSCI Japan ETF", ticker: "EWJ", type: "ETF" },
        { name: "WisdomTree Japan Hedged Equity Fund -- currency hedged", ticker: "DXJ", type: "ETF" },
        { name: "Capital Group International Equity ETF -- active, can overweight Japan", ticker: "CGIE", type: "Active ETF" },
      ],
      caveat: "DXJ hedges out the yen, which is better if the dollar strengthens.",
    },
    {
      id: "stablecoin-infra", theme: "Stablecoin & Payment Infrastructure", ticker: "V, MA, COIN",
      signal: "green", conviction: "High", assetClass: "Equities",
      bestAccount: "Taxable -- long-term capital gains if held over a year. V and MA are low-turnover holds.",
      rationale: "The petrodollar agreement expired June 2024 with no renewal. The dollar cannot maintain global dominance through reserve status alone..",
      instruments: [
        { name: "Visa -- X Money runs on Visa Direct, Trusted Agent Protocol, stablecoin payout pilot", ticker: "V", type: "Stock" },
        { name: "Mastercard -- BVNK acquisition, Agent Pay, Recorded Future data fusion", ticker: "MA", type: "Stock" },
        { name: "Coinbase -- JPM Coin launched on Base, institutional settlement infrastructure", ticker: "COIN", type: "Stock" },
      ],
      caveat: "Pure crypto plays (BTC, ETH) are volatile and speculative -- not infrastructure. Circle (USDC issuer) is not.",
    },
    {
      id: "ai-surveillance", theme: "AI & Surveillance Infrastructure", ticker: "PLTR, NVDA, MSI, AXON",
      signal: "red", conviction: "High", assetClass: "Equities",
      bestAccount: "Roth IRA for PLTR and NVDA if you believe in multi-year compounding. Taxable works for.",
      rationale: "This is not a recommendation to buy AI because it is exciting. These are specific companies building the infrastructure this publication.",
      instruments: [
        { name: "Palantir -- U.S. government surveillance infrastructure, $687M Q1 2026 govt revenue", ticker: "PLTR", type: "Stock" },
        { name: "Nvidia -- data center and government inference compute", ticker: "NVDA", type: "Stock" },
        { name: "Motorola Solutions -- video surveillance, command center, public safety", ticker: "MSI", type: "Stock" },
        { name: "Axon Enterprise -- body cameras, Fusus network aggregation, sensor layer", ticker: "AXON", type: "Stock" },
        { name: "Constellation Energy -- nuclear power for AI data centers", ticker: "CEG", type: "Stock" },
        { name: "Broadcom -- custom AI chips for hyperscalers, less headline risk than NVDA", ticker: "AVGO", type: "Stock" },
      ],
      caveat: "Palantir is the most direct play and the most ethically complex. Investing in Palantir is investing in the.",
    },
    {
      id: "cash", theme: "Cash Buffer", ticker: "SGOV, Money Market",
      signal: "green", conviction: "High", assetClass: "Cash",
      bestAccount: "Taxable -- state tax exemption on T-bill interest is only useful in taxable accounts.",
      rationale: "The model carries 0.5% cash. In an environment where Stage 3 contagion arrives in Q4, having 5 to 10% in cash is optionality, not waste.",
      instruments: [
        { name: "iShares 0-3 Month Treasury Bond ETF", ticker: "SGOV", type: "ETF" },
        { name: "Fidelity Government Money Market Fund", ticker: "SPAXX", type: "Fund" },
        { name: "Vanguard Federal Money Market Fund", ticker: "VMFXX", type: "Fund" },
        { name: "X Money -- 6% APY, FDIC-insured via Cross River Bank, no minimum", ticker: "X Money", type: "Platform" },
      ],
      caveat: "X Money platform risk: X controls your account through its terms of service. If your account is suspended,.",
    },
  ],
};

const signalColors = {
  red:    { bg: "#fff5f5", border: "#fca5a5", text: "#dc2626", dot: "#ef4444" },
  yellow: { bg: "#fffbeb", border: "#fcd34d", text: "#92400e", dot: "#f59e0b" },
  green:  { bg: "#f0fdf4", border: "#86efac", text: "#15803d", dot: "#22c55e" },
  gray:   { bg: "#f9fafb", border: "#d1d5db", text: "#4b5563", dot: "#9ca3af" },
};
const convictionColors = { High: "#dc2626", Medium: "#92400e", Low: "#4b5563" };
const thesisColors     = { red: "#dc2626", yellow: "#92400e", green: "#15803d" };
const TABS = ["indicators", "consumer", "markets", "debt", "behind", "ideas", "thesis"];
const TAB_LABELS = { indicators: "Indicators", consumer: "Consumer", markets: "Markets", debt: "Debt & Credit", behind: "Behind the Numbers", ideas: "Investment Ideas", thesis: "Big Picture" };
export default function MacroMonitor() {
  const [activeTab, setActiveTab] = useState("indicators");
  const [expandedIdea, setExpandedIdea] = useState(null);
  const [expandedBehind, setExpandedBehind] = useState(null);

  const filtered = data.indicators;

  const pending = data.indicators.filter((d) => d.signal === "gray").length;
  const hot     = data.indicators.filter((d) => d.signal === "red").length;

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", color: "#111827", fontFamily: "Georgia, 'Times New Roman', serif" }}>

      {/* ── Header ── */}
      <div style={{ background: "#f8f8fb", borderBottom: "2px solid #e5e7eb", padding: "24px 28px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
          <div>
            <div style={{ fontSize: "12px", letterSpacing: "0.12em", color: "#6b7280", marginBottom: "6px", fontFamily: "sans-serif", textTransform: "uppercase" }}>Aware Trade</div>
            <div style={{ fontSize: "26px", fontWeight: "700", color: "#111827", letterSpacing: "-0.01em", lineHeight: 1.1 }}>Macro Monitor</div>
            <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px", fontFamily: "sans-serif" }}>{data.updatedDate}</div>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "flex-start", flexWrap: "wrap" }}>
            {pending > 0 && (
              <span style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "4px", background: "#f3f4f6", color: "#4b5563", border: "1px solid #d1d5db", fontFamily: "sans-serif" }}>
                {pending} pending today
              </span>
            )}
            {hot > 0 && (
              <span style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "4px", background: "#fff5f5", color: "#dc2626", border: "1px solid #fca5a5", fontFamily: "sans-serif" }}>
                {hot} active signals
              </span>
            )}
          </div>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: "0", overflowX: "auto" }}>
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              background: "none", border: "none",
              borderBottom: activeTab === tab ? "3px solid #4f46e5" : "3px solid transparent",
              color: activeTab === tab ? "#4f46e5" : "#6b7280",
              fontSize: "14px", fontWeight: activeTab === tab ? "600" : "400",
              padding: "6px 18px 12px", cursor: "pointer",
              fontFamily: "sans-serif", whiteSpace: "nowrap",
            }}>
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>
      </div>

      {/* ── INDICATORS ── */}
      {activeTab === "indicators" && (
        <>
          <div style={{ padding: "20px 28px" }}>
            {[
              { id: "inflation", label: "Inflation" },
              { id: "labor", label: "Labor" },
              { id: "monetary", label: "Monetary" },
              { id: "economy", label: "Economy" },
              { id: "markets", label: "Markets" },
              { id: "debt", label: "Debt & Credit" },
              { id: "dollar", label: "Dollar / Petrodollar" },
              { id: "policy", label: "Policy" },
            ].map(({ id: catId, label: catLabel }) => {
              const catItems = filtered.filter(d => d.category === catId);
              if (catItems.length === 0) return null;
              return (
                <div key={catId} style={{ marginBottom: "28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                    <div style={{ fontSize: "11px", color: "#6b7280", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "sans-serif", whiteSpace: "nowrap" }}>{catLabel}</div>
                    <div style={{ flex: 1, height: "1px", background: "#f3f4f6" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px" }}>
                    {catItems.map((item) => {
              const c = signalColors[item.signal];
              const isOpen = expandedBehind === item.id;
              return (
                <div key={item.id} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: "6px", overflow: "hidden" }}>
                  <div style={{ padding: "18px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <div style={{ fontSize: "13px", color: "#4b5563", fontFamily: "sans-serif", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                      <span style={{ fontSize: "11px", color: c.text, fontFamily: "sans-serif", fontWeight: "600", display: "flex", alignItems: "center", gap: "5px" }}>
                        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: c.dot, display: "inline-block" }} />
                        {item.signalLabel}
                      </span>
                    </div>
                    <div style={{ fontSize: "32px", fontWeight: "700", color: "#111827", lineHeight: 1, marginBottom: "6px" }}>{item.value}</div>
                    <div style={{ fontSize: "15px", color: "#374151", marginBottom: "10px", fontFamily: "sans-serif" }}>{item.sub}</div>
                    <div style={{ fontSize: "14px", color: "#4b5563", borderTop: `1px solid ${c.border}`, paddingTop: "10px", lineHeight: 1.6, fontFamily: "sans-serif" }}>{item.note}</div>
                  </div>
                  {item.behind && item.behind.length > 0 && (
                    <>
                      <button onClick={() => setExpandedBehind(isOpen ? null : item.id)} style={{
                        width: "100%", background: "none", border: "none",
                        borderTop: `1px solid ${c.border}`,
                        padding: "10px 20px", fontSize: "13px", color: c.text,
                        fontWeight: "600", cursor: "pointer", fontFamily: "sans-serif",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                      }}>
                        <span>Behind the numbers</span>
                        <span style={{ fontSize: "16px", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}>▾</span>
                      </button>
                      {isOpen && (
                        <div style={{ borderTop: `1px solid ${c.border}`, padding: "14px 20px", display: "flex", flexDirection: "column", gap: "14px" }}>
                          {item.behind.map((b, i) => (
                            <div key={i}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", marginBottom: "4px" }}>
                                <span style={{ fontSize: "13px", color: "#374151", fontFamily: "sans-serif" }}>{b.stat}</span>
                                <span style={{ fontSize: "15px", fontWeight: "700", color: c.text, fontFamily: "sans-serif", whiteSpace: "nowrap" }}>{b.value}</span>
                              </div>
                              <div style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6, fontFamily: "sans-serif" }}>{b.context}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ── MARKETS ── */}
      {activeTab === "markets" && (
        <div style={{ padding: "20px 28px" }}>
          <p style={{ fontSize: "16px", color: "#6b7280", marginTop: 0, marginBottom: "24px", lineHeight: 1.6, fontFamily: "sans-serif" }}>
            Valuation, volatility, and retirement portfolio health. All data as of June 10–11, 2026.
          </p>

          {/* Valuation callout */}
          <div style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "16px 20px", marginBottom: "24px" }}>
            <div style={{ fontSize: "13px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px", fontFamily: "sans-serif" }}>Is the Market Overvalued?</div>
            <div style={{ fontSize: "15px", color: "#1f2937", lineHeight: 1.7, fontFamily: "sans-serif" }}>
              Shiller CAPE at 39.9 implies 1.9% annual returns over the next decade  --  below 4.2% inflation. High yield spreads near 2007 tights while actual defaults run 4.2-4.5%. The 60/40 portfolio is broken when inflation is high.
            </div>
          </div>
          {/* Markets grid from indicators */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px", marginBottom: "28px" }}>
            {data.indicators.filter(d => d.category === "markets").map((item) => {
              const c = signalColors[item.signal];
              return (
                <div key={item.id} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: "6px", padding: "18px 20px" }}>
                  <div style={{ fontSize: "13px", color: "#4b5563", fontFamily: "sans-serif", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>{item.label}</div>
                  <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827", lineHeight: 1, marginBottom: "4px" }}>{item.value}</div>
                  <div style={{ fontSize: "13px", color: "#6b7280", fontFamily: "sans-serif", marginBottom: "10px" }}>{item.sub}</div>
                  <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: "10px", fontSize: "13px", color: "#4b5563", fontFamily: "sans-serif", lineHeight: 1.5 }}>{item.note}</div>
                </div>
              );
            })}
          </div>
                    {/* 60/40 explainer */}
          <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "20px 24px" }}>
            <div style={{ fontSize: "13px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px", fontFamily: "sans-serif" }}>The 60/40 Problem  --  In Plain Language</div>
            <div style={{ fontSize: "16px", color: "#1f2937", lineHeight: 1.8 }}>
              For 40 years, the standard retirement portfolio was 60% stocks and 40% bonds. When stocks fell, bonds went up. The bond portion cushioned the blow. That relationship held because inflation was low and the Fed could cut rates in a crisis. When rates fell, bond prices rose. The cushion worked. When inflation is high  --  as it is today.
            </div>
          </div>
        </div>
      )}

      {/* ── DEBT & CREDIT ── */}
      {activeTab === "debt" && (
        <div style={{ padding: "20px 28px" }}>
          <p style={{ fontSize: "16px", color: "#6b7280", marginTop: 0, marginBottom: "24px", lineHeight: 1.6, fontFamily: "sans-serif" }}>
            The slow-motion repricing of everything that was built on cheap money. Federal debt, commercial real estate, private equity, and the pension funds caught in between.
          </p>

          {/* Thesis callout */}
          <div style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "16px 20px", marginBottom: "24px" }}>
            <div style={{ fontSize: "13px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px", fontFamily: "sans-serif" }}>The Connective Tissue</div>
            <div style={{ fontSize: "15px", color: "#1f2937", lineHeight: 1.7, fontFamily: "sans-serif" }}>
              Federal debt, CRE, and private equity all relied on near-zero rates. All are now refinancing at rates 400 to 500 basis points higher. The losses flow to pension funds, community banks, and insurance companies -- the institutions that hold ordinary Americans' savings and retirement accounts. The people who made the decisions will not bear the losses. The people who had no choice will.
            </div>
          </div>

          {/* Debt grid from indicators */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px", marginBottom: "28px" }}>
            {data.indicators.filter(d => d.category === "debt").map((item) => {
              const c = signalColors[item.signal];
              const isOpen = expandedBehind === item.id;
              return (
                <div key={item.id} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: "6px", overflow: "hidden" }}>
                  <div style={{ padding: "18px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <div style={{ fontSize: "13px", color: "#4b5563", fontFamily: "sans-serif", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                      <span style={{ fontSize: "10px", color: c.text, fontFamily: "sans-serif", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: c.dot, display: "inline-block" }} />
                        {item.signalLabel}
                      </span>
                    </div>
                    <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827", lineHeight: 1, marginBottom: "4px" }}>{item.value}</div>
                    <div style={{ fontSize: "13px", color: "#6b7280", fontFamily: "sans-serif", marginBottom: "10px" }}>{item.sub}</div>
                    <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: "10px", fontSize: "13px", color: "#4b5563", fontFamily: "sans-serif", lineHeight: 1.5 }}>{item.note}</div>
                  </div>
                  {item.behind && item.behind.length > 0 && (
                    <>
                      <button onClick={() => setExpandedBehind(isOpen ? null : item.id)} style={{
                        width: "100%", background: "none", border: "none", borderTop: `1px solid ${c.border}`,
                        padding: "8px 20px", fontSize: "12px", color: c.text, fontWeight: "600",
                        cursor: "pointer", fontFamily: "sans-serif", display: "flex", justifyContent: "space-between",
                      }}>
                        <span>Behind the numbers</span>
                        <span style={{ transform: isOpen ? "rotate(180deg)" : "none" }}>▾</span>
                      </button>
                      {isOpen && (
                        <div style={{ borderTop: `1px solid ${c.border}`, padding: "12px 20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                          {item.behind.map((b, i) => (
                            <div key={i}>
                              <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "3px" }}>
                                <span style={{ fontSize: "13px", color: "#374151", fontFamily: "sans-serif" }}>{b.stat}</span>
                                <span style={{ fontSize: "13px", fontWeight: "700", color: c.text, fontFamily: "sans-serif", whiteSpace: "nowrap" }}>{b.value}</span>
                              </div>
                              <div style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.5, fontFamily: "sans-serif" }}>{b.context}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Narrative */}
          <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "20px 24px" }}>
            <div style={{ fontSize: "13px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px", fontFamily: "sans-serif" }}>The Debt Crisis Nobody Is Talking About</div>
            <div style={{ fontSize: "16px", color: "#1f2937", lineHeight: 1.8 }}>
              Federal debt hit $39 trillion in March 2026. Interest payments exceeded $1 trillion annually for the first time -- surpassing defense spending. Office loan delinquency hit a record 12.34%. Regional banks hold 44% of their loan portfolios in CRE. $1 trillion in CRE loans mature in 2026. Private equity has $1 trillion in unrealized.
            </div>
          </div>
        </div>
      )}

      {/* ── BEHIND THE NUMBERS ── */}
      {activeTab === "behind" && (
        <div style={{ padding: "28px", maxWidth: "760px" }}>
          <p style={{ fontSize: "16px", color: "#6b7280", marginTop: 0, marginBottom: "28px", lineHeight: 1.6, fontFamily: "sans-serif" }}>
            What the headline numbers do not say  --  in plain language.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {data.behind_narrative.map((item, i) => (
              <div key={i} style={{
                background: "#f9fafb", border: "1px solid #e5e7eb",
                borderLeft: `4px solid ${thesisColors[item.level]}`,
                borderRadius: "0 6px 6px 0", padding: "20px 24px",
              }}>
                <div style={{ fontSize: "13px", color: thesisColors[item.level], fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px", fontFamily: "sans-serif" }}>{item.label}</div>
                <div style={{ fontSize: "16px", color: "#1f2937", lineHeight: 1.8 }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CONSUMER ── */}
      {activeTab === "consumer" && (
        <div style={{ padding: "20px 28px" }}>

          {/* Sentiment & Spending section */}
          <div style={{ fontSize: "11px", color: "#4338ca", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "14px", fontFamily: "sans-serif" }}>
            Sentiment & Spending
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px", marginBottom: "28px" }}>
            {data.indicators.filter(d => d.category === "consumer").map((item) => {
              const c = signalColors[item.signal];
              const isOpen = expandedBehind === item.id;
              return (
                <div key={item.id} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: "6px", overflow: "hidden" }}>
                  <div style={{ padding: "18px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <div style={{ fontSize: "13px", color: "#4b5563", fontFamily: "sans-serif", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                      <span style={{ fontSize: "10px", color: c.text, fontFamily: "sans-serif", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: c.dot, display: "inline-block" }} />
                        {item.signalLabel}
                      </span>
                    </div>
                    <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827", lineHeight: 1, marginBottom: "4px" }}>{item.value}</div>
                    <div style={{ fontSize: "13px", color: "#6b7280", fontFamily: "sans-serif", marginBottom: "10px" }}>{item.sub}</div>
                    <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: "10px", fontSize: "13px", color: "#4b5563", fontFamily: "sans-serif", lineHeight: 1.5 }}>{item.note}</div>
                  </div>
                  {item.behind && item.behind.length > 0 && (
                    <>
                      <button onClick={() => setExpandedBehind(isOpen ? null : item.id)} style={{ width: "100%", background: "none", border: "none", borderTop: `1px solid ${c.border}`, padding: "8px 20px", fontSize: "12px", color: c.text, fontWeight: "600", cursor: "pointer", fontFamily: "sans-serif", display: "flex", justifyContent: "space-between" }}>
                        <span>Behind the numbers</span>
                        <span style={{ transform: isOpen ? "rotate(180deg)" : "none" }}>▾</span>
                      </button>
                      {isOpen && (
                        <div style={{ borderTop: `1px solid ${c.border}`, padding: "12px 20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                          {item.behind.map((b, i) => (
                            <div key={i}>
                              <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "3px" }}>
                                <span style={{ fontSize: "13px", color: "#374151", fontFamily: "sans-serif" }}>{b.stat}</span>
                                <span style={{ fontSize: "13px", fontWeight: "700", color: c.text, fontFamily: "sans-serif", whiteSpace: "nowrap" }}>{b.value}</span>
                              </div>
                              <div style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.5, fontFamily: "sans-serif" }}>{b.context}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
            <div style={{ fontSize: "11px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "sans-serif", whiteSpace: "nowrap" }}>
              Stress Indicators
            </div>
            <div style={{ flex: 1, height: "1px", background: "#fca5a5" }} />
          </div>

          {/* K-shape callout */}
          <div style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "16px 20px", marginBottom: "20px" }}>
            <div style={{ fontSize: "13px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px", fontFamily: "sans-serif" }}>The K-Shape in One Sentence</div>
            <div style={{ fontSize: "14px", color: "#1f2937", lineHeight: 1.7, fontFamily: "sans-serif" }}>
              Every aggregate delinquency rate is a weighted average hiding a healthy top half and a distressed bottom half. FHA mortgages: 11.52%. Subprime auto: record 6.8%. Small bank cards: 6.4%. The average obscures the distribution.
            </div>
          </div>

          {/* Stress grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px", marginBottom: "28px" }}>
            {data.indicators.filter(d => d.category === "stress").map((item) => {
              const c = signalColors[item.signal];
              return (
                <div key={item.id} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: "6px", padding: "18px 20px" }}>
                  <div style={{ fontSize: "13px", color: "#4b5563", fontFamily: "sans-serif", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>{item.label}</div>
                  <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827", lineHeight: 1, marginBottom: "4px" }}>{item.value}</div>
                  <div style={{ fontSize: "13px", color: "#6b7280", fontFamily: "sans-serif", marginBottom: "10px" }}>{item.sub}</div>
                  <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: "10px", fontSize: "13px", color: "#4b5563", fontFamily: "sans-serif", lineHeight: 1.5 }}>{item.note}</div>
                </div>
              );
            })}
          </div>

          {/* Narrative */}
          <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "20px 24px" }}>
            <div style={{ fontSize: "13px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px", fontFamily: "sans-serif" }}>The Debt Trap Beneath the Headline</div>
            <div style={{ fontSize: "15px", color: "#1f2937", lineHeight: 1.8 }}>
              Americans have added $482 billion in credit card debt since 2021, using plastic to absorb the inflation that wages did not cover. The interest rate on those cards averages 21.52%. At that rate, a $5,000 balance costs more than $1,000 a year just to carry. Subprime auto delinquency hit a record in January. FHA mortgage delinquency is near 12%. The pandemic-era relief that kept those numbers lower expired in September 2025. The squeeze is not coming. It is already running.
            </div>
          </div>
        </div>
      )}

      {/* ── IDEAS ── */}
      {activeTab === "ideas" && (
        <div style={{ padding: "28px", maxWidth: "800px" }}>

          {/* Disclaimer */}
          <div style={{ background: "#eef2ff", border: "1px solid #c7d2fe", borderLeft: "4px solid #4f46e5", borderRadius: "0 6px 6px 0", padding: "14px 18px", marginBottom: "24px" }}>
            <div style={{ fontSize: "12px", color: "#4338ca", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "5px", fontFamily: "sans-serif" }}>For Informational Purposes Only</div>
            <div style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6, fontFamily: "sans-serif" }}>
              These ideas reflect directional thinking based on current macro data. They are not personalized investment advice. Past performance does not guarantee future results. Consult a financial advisor before making investment decisions. Tickers shown are examples, not endorsements.
            </div>
          </div>

          {/* Header */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "18px", fontWeight: "700", color: "#111827", marginBottom: "6px" }}>Hedged Tactical Model</div>
            <div style={{ fontSize: "14px", color: "#6b7280", fontFamily: "sans-serif", lineHeight: 1.6 }}>
              A diversified allocation built for the current macro environment: elevated inflation, Fed on hold, K-shape consumer stress, dollar erosion, and geopolitical energy risk. Weights are approximate and should be adjusted to your own situation.
            </div>
          </div>

          {/* Recommended positions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
            {data.ideas.map((idea) => {
              const c = signalColors[idea.signal];
              const isExpanded = expandedIdea === idea.id;
              return (
                <div key={idea.id} style={{ background: "#f9fafb", border: `1px solid ${isExpanded ? c.border : "#e5e7eb"}`, borderRadius: "6px", overflow: "hidden" }}>
                  <div onClick={() => setExpandedIdea(isExpanded ? null : idea.id)} style={{ padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "15px", fontWeight: "700", color: "#111827", fontFamily: "sans-serif" }}>{idea.theme}</span>
                        {idea.weight && (
                          <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "3px", background: "#f0f0f0", color: "#374151", fontFamily: "sans-serif", border: "1px solid #e5e7eb" }}>{idea.weight}</span>
                        )}
                        <span style={{ fontSize: "11px", fontWeight: "600", color: convictionColors[idea.conviction], fontFamily: "sans-serif" }}>{idea.conviction} conviction</span>
                      </div>
                      <div style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.5, fontFamily: "sans-serif" }}>
                        {idea.rationale.slice(0, 120)}{idea.rationale.length > 120 && !isExpanded ? "..." : ""}
                      </div>
                    </div>
                    <div style={{ fontSize: "18px", color: "#9ca3af", flexShrink: 0, marginTop: "2px", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>▾</div>
                  </div>
                  {isExpanded && (
                    <div style={{ borderTop: `1px solid ${c.border}`, padding: "16px 18px", background: c.bg }}>
                      <p style={{ fontSize: "14px", color: "#1f2937", lineHeight: 1.8, marginTop: 0, marginBottom: "16px", fontFamily: "sans-serif" }}>{idea.rationale}</p>
                      {idea.instruments.length > 0 && (
                        <>
                          <div style={{ fontSize: "11px", color: "#6b7280", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", fontFamily: "sans-serif" }}>Sample ETFs</div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px" }}>
                            {idea.instruments.map((inst, i) => (
                              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#ffffff", borderRadius: "4px", border: "1px solid #e5e7eb" }}>
                                <span style={{ fontSize: "13px", color: "#1f2937", fontFamily: "sans-serif", paddingRight: "12px" }}>{inst.name}</span>
                                <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
                                  {inst.ticker && <span style={{ fontSize: "14px", fontWeight: "700", color: c.text, fontFamily: "sans-serif" }}>{inst.ticker}</span>}
                                  <span style={{ fontSize: "10px", color: "#9ca3af", border: "1px solid #e5e7eb", padding: "1px 6px", borderRadius: "2px", fontFamily: "sans-serif" }}>{inst.type}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                      <div style={{ fontSize: "13px", color: "#4b5563", borderTop: `1px solid ${c.border}`, paddingTop: "10px", lineHeight: 1.7, fontFamily: "sans-serif", marginBottom: "8px" }}>
                        <span style={{ fontWeight: "700" }}>Watch: </span>{idea.caveat}
                      </div>
                      {idea.bestAccount && (
                        <div style={{ fontSize: "13px", color: "#374151", background: "#f0fdf4", border: "1px solid #86efac", padding: "8px 12px", borderRadius: "4px", lineHeight: 1.7, fontFamily: "sans-serif" }}>
                          <span style={{ fontWeight: "700", color: "#15803d" }}>Best account: </span>{idea.bestAccount}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Consider Adding section */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{ fontSize: "13px", color: "#15803d", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px", fontFamily: "sans-serif" }}>Consider Adding</div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "14px", fontFamily: "sans-serif" }}>
              Positions not in the current model that address gaps in the current macro environment.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {data.consider.map((idea) => {
                const c = signalColors[idea.signal];
                const isExpanded = expandedIdea === idea.id;
                return (
                  <div key={idea.id} style={{ background: "#f0fdf4", border: `1px solid ${isExpanded ? "#86efac" : "#d1fae5"}`, borderRadius: "6px", overflow: "hidden" }}>
                    <div onClick={() => setExpandedIdea(isExpanded ? null : idea.id)} style={{ padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "14px", fontWeight: "700", color: "#111827", fontFamily: "sans-serif" }}>{idea.theme}</span>
                          <span style={{ fontSize: "11px", padding: "1px 7px", borderRadius: "3px", background: "#dcfce7", color: "#15803d", fontFamily: "sans-serif", border: "1px solid #86efac" }}>{idea.ticker}</span>
                          <span style={{ fontSize: "11px", fontWeight: "600", color: convictionColors[idea.conviction], fontFamily: "sans-serif" }}>{idea.conviction} conviction</span>
                        </div>
                        <div style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.5, fontFamily: "sans-serif" }}>
                          {idea.rationale.slice(0, 110)}{idea.rationale.length > 110 && !isExpanded ? "..." : ""}
                        </div>
                      </div>
                      <div style={{ fontSize: "16px", color: "#9ca3af", flexShrink: 0, marginTop: "2px", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>▾</div>
                    </div>
                    {isExpanded && (
                      <div style={{ borderTop: "1px solid #86efac", padding: "14px 16px", background: "#f0fdf4" }}>
                        <p style={{ fontSize: "14px", color: "#1f2937", lineHeight: 1.8, marginTop: 0, marginBottom: "14px", fontFamily: "sans-serif" }}>{idea.rationale}</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                          {idea.instruments.map((inst, i) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 10px", background: "#ffffff", borderRadius: "3px", border: "1px solid #d1fae5" }}>
                              <span style={{ fontSize: "13px", color: "#1f2937", fontFamily: "sans-serif" }}>{inst.name}</span>
                              <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
                                {inst.ticker && <span style={{ fontSize: "13px", fontWeight: "700", color: "#15803d", fontFamily: "sans-serif" }}>{inst.ticker}</span>}
                                <span style={{ fontSize: "10px", color: "#9ca3af", border: "1px solid #d1fae5", padding: "1px 5px", borderRadius: "2px", fontFamily: "sans-serif" }}>{inst.type}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div style={{ fontSize: "13px", color: "#4b5563", borderTop: "1px solid #86efac", paddingTop: "10px", lineHeight: 1.7, fontFamily: "sans-serif", marginBottom: "8px" }}>
                          <span style={{ fontWeight: "700" }}>Watch: </span>{idea.caveat}
                        </div>
                        {idea.bestAccount && (
                          <div style={{ fontSize: "13px", color: "#374151", background: "#dcfce7", border: "1px solid #86efac", padding: "8px 12px", borderRadius: "4px", lineHeight: 1.7, fontFamily: "sans-serif" }}>
                            <span style={{ fontWeight: "700", color: "#15803d" }}>Best account: </span>{idea.bestAccount}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Caution section */}
          <div>
            <div style={{ fontSize: "13px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px", fontFamily: "sans-serif" }}>Handle With Care</div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "14px", fontFamily: "sans-serif" }}>
              Not recommended at current valuations or in the current macro environment.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {data.caution.map((item) => {
                const isExpanded = expandedIdea === item.id;
                return (
                  <div key={item.id} style={{ background: "#fff5f5", border: `1px solid ${isExpanded ? "#fca5a5" : "#fecaca"}`, borderRadius: "6px", overflow: "hidden" }}>
                    <div onClick={() => setExpandedIdea(isExpanded ? null : item.id)} style={{ padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "14px", fontWeight: "700", color: "#dc2626", fontFamily: "sans-serif" }}>{item.theme}</span>
                          {item.instruments && item.instruments.slice(0,2).map((inst,i) => inst.ticker && (
                            <span key={i} style={{ fontSize: "11px", padding: "1px 7px", borderRadius: "3px", background: "#fee2e2", color: "#dc2626", fontFamily: "sans-serif", border: "1px solid #fca5a5" }}>{inst.ticker}</span>
                          ))}
                        </div>
                        <div style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.5, fontFamily: "sans-serif" }}>
                          {item.reason.slice(0, 100)}{item.reason.length > 100 && !isExpanded ? "..." : ""}
                        </div>
                      </div>
                      <div style={{ fontSize: "16px", color: "#9ca3af", flexShrink: 0, marginTop: "2px", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>▾</div>
                    </div>
                    {isExpanded && (
                      <div style={{ borderTop: "1px solid #fca5a5", padding: "14px 16px", background: "#fff5f5" }}>
                        <div style={{ fontSize: "14px", color: "#374151", lineHeight: 1.8, fontFamily: "sans-serif", marginBottom: item.instruments && item.instruments.length > 0 ? "14px" : "0" }}>{item.reason}</div>
                        {item.instruments && item.instruments.length > 0 && (
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            {item.instruments.map((inst, i) => (
                              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 10px", background: "#ffffff", borderRadius: "3px", border: "1px solid #fecaca" }}>
                                <span style={{ fontSize: "13px", color: "#1f2937", fontFamily: "sans-serif" }}>{inst.name}</span>
                                <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
                                  {inst.ticker && <span style={{ fontSize: "13px", fontWeight: "700", color: "#dc2626", fontFamily: "sans-serif" }}>{inst.ticker}</span>}
                                  <span style={{ fontSize: "10px", color: "#9ca3af", border: "1px solid #fecaca", padding: "1px 5px", borderRadius: "2px", fontFamily: "sans-serif" }}>{inst.type}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {activeTab === "thesis" && (
        <div style={{ padding: "28px", maxWidth: "760px" }}>
          <p style={{ fontSize: "16px", color: "#6b7280", marginTop: 0, marginBottom: "24px", lineHeight: 1.6, fontFamily: "sans-serif" }}>
            How today's data connects to the Coercive Capitalism thesis.
          </p>

          {/* K-shape framework */}
          <div style={{ background: "#fff5f5", border: "2px solid #fca5a5", borderLeft: "5px solid #dc2626", borderRadius: "6px", padding: "18px 22px", marginBottom: "24px" }}>
            <div style={{ fontSize: "12px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", fontFamily: "sans-serif" }}>The K-Shape Is Cracking</div>
            <div style={{ fontSize: "15px", color: "#1f2937", lineHeight: 1.8, fontFamily: "sans-serif" }}>
              The lower half of the K -- households under $60K -- is running out of cushion simultaneously. Savings at 2.6%, credit cards at 21.5% APR, real wages negative, SNAP cuts October 1. When this cohort pulls back: discount retail and fast food lose volume first, then small business suppliers, then regional employment. Dollar stores are not defensive here. They are the first casualties.
            </div>
          </div>

          {/* Thesis signals */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "36px" }}>
            {data.thesis.map((item, i) => (
              <div key={i} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderLeft: `4px solid ${thesisColors[item.level]}`, borderRadius: "0 6px 6px 0", padding: "18px 22px" }}>
                <div style={{ fontSize: "13px", color: thesisColors[item.level], fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", fontFamily: "sans-serif" }}>{item.label}</div>
                <div style={{ fontSize: "15px", color: "#1f2937", lineHeight: 1.7, fontFamily: "sans-serif" }}>{item.text}</div>
              </div>
            ))}
          </div>

          {/* Pozsar / Dalio Framework */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ fontSize: "13px", color: "#4338ca", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px", fontFamily: "sans-serif" }}>The Intellectual Framework</div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px", fontFamily: "sans-serif" }}>Two macro frameworks that explain why the indicators move the way they do.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderLeft: "4px solid #7c3aed", borderRadius: "0 6px 6px 0", padding: "16px 18px" }}>
                <div style={{ fontSize: "13px", color: "#5b21b6", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", fontFamily: "sans-serif" }}>Zoltan Pozsar -- Bretton Woods III</div>
                <div style={{ fontSize: "14px", color: "#374151", lineHeight: 1.8, fontFamily: "sans-serif" }}>
                  The post-Cold War bargain fractured when the West weaponized dollar reserves in 2022. Commodity nations are diversifying into gold, building mBridge, and pricing resources outside the dollar. Pozsar: Russia is a G-SIB of commodities, China a G-SIB of factories. Bretton Woods III is commodity-backed money replacing dollar-backed money. Investment implication: gold, silver, copper, agricultural commodities, and commodity-producing nations benefit.
                </div>
              </div>
              <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderLeft: "4px solid #ea580c", borderRadius: "0 6px 6px 0", padding: "16px 18px" }}>
                <div style={{ fontSize: "13px", color: "#9a3412", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", fontFamily: "sans-serif" }}>Ray Dalio -- Big Debt Cycle and Debasement</div>
                <div style={{ fontSize: "14px", color: "#374151", lineHeight: 1.8, fontFamily: "sans-serif" }}>
                  Sovereigns choose debasement over default. The U.S. pays $1 trillion annually in interest, doubling by 2036. Dalio's framework: gold and commodities over paper assets, international over U.S. concentration, real over financial assets. Gold is the world's second-largest reserve asset. Central banks understand the cycle.
                </div>
              </div>
            </div>
          </div>

          {/* Contagion Timeline */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ fontSize: "13px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px", fontFamily: "sans-serif" }}>K-Shape Contagion Timeline</div>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px", fontFamily: "sans-serif" }}>
              When does the lower K impact the market and the upper K? The transmission is sequential. We are in Stage 2.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {data.contagion.map((stage, i) => {
                const statusColors = {
                  complete:   { bg: "#f0fdf4", border: "#86efac", dot: "#22c55e", label: "#15803d", labelBg: "#dcfce7" },
                  active:     { bg: "#fff5f5", border: "#fca5a5", dot: "#ef4444", label: "#dc2626", labelBg: "#fee2e2" },
                  approaching:{ bg: "#fffbeb", border: "#fcd34d", dot: "#f59e0b", label: "#92400e", labelBg: "#fef3c7" },
                  risk:       { bg: "#f5f3ff", border: "#c4b5fd", dot: "#7c3aed", label: "#5b21b6", labelBg: "#ede9fe" },
                };
                const sc = statusColors[stage.status];
                return (
                  <div key={i} style={{ display: "flex", gap: "0" }}>
                    {/* Timeline spine */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "16px", flexShrink: 0 }}>
                      <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: sc.dot, marginTop: "20px", flexShrink: 0, zIndex: 1 }} />
                      {i < data.contagion.length - 1 && (
                        <div style={{ width: "2px", flex: 1, background: "#e5e7eb", minHeight: "24px" }} />
                      )}
                    </div>
                    {/* Stage card */}
                    <div style={{ background: sc.bg, border: `1px solid ${sc.border}`, borderRadius: "6px", padding: "16px 18px", marginBottom: "12px", flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "11px", fontWeight: "700", color: sc.label, background: sc.labelBg, padding: "2px 8px", borderRadius: "3px", fontFamily: "sans-serif", letterSpacing: "0.06em" }}>
                          {stage.stage}  --  {stage.status.toUpperCase()}
                        </span>
                        <span style={{ fontSize: "11px", color: "#9ca3af", fontFamily: "sans-serif" }}>{stage.date}</span>
                      </div>
                      <div style={{ fontSize: "15px", fontWeight: "700", color: "#111827", fontFamily: "sans-serif", marginBottom: "8px" }}>{stage.label}</div>
                      <div style={{ fontSize: "14px", color: "#374151", lineHeight: 1.7, fontFamily: "sans-serif", marginBottom: stage.triggers.length > 0 ? "12px" : "0" }}>{stage.text}</div>
                      {stage.triggers.length > 0 && (
                        <div style={{ borderTop: `1px solid ${sc.border}`, paddingTop: "10px" }}>
                          <div style={{ fontSize: "11px", color: sc.label, fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px", fontFamily: "sans-serif" }}>
                            {stage.status === "complete" ? "Evidence" : "Watch for"}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            {stage.triggers.map((t, j) => (
                              <div key={j} style={{ fontSize: "13px", color: "#4b5563", fontFamily: "sans-serif", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                                <span style={{ color: sc.dot, marginTop: "2px", flexShrink: 0 }}>&#8250;</span>
                                <span>{t}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Dates */}
          <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "6px", overflow: "hidden" }}>
          <div style={{ padding: "12px 20px", background: "#f0f0f8", borderBottom: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: "13px", color: "#4338ca", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "sans-serif" }}>Key Dates -- Rest of 2026</div>
          </div>
          <div style={{ padding: "8px 20px" }}>
            {[
              { date: "Jun 17", label: "May Retail Sales", note: "Watch the ex-gas number. If flat or negative, headline growth is.", signal: "red" },
              { date: "Jun 16-17", label: "FOMC Meeting", note: "No move expected. Watch statement language for Warsh shift.", signal: "yellow" },
              { date: "Jun 26", label: "UMich June Final", note: "June prelim released June 12 at 48.9. Watch for revision up or down.", signal: "yellow" },
              { date: "Jul 2", label: "June Jobs Report", note: "Watch financial services vs. leisure composition.", signal: "yellow" },
              { date: "Jul 10", label: "June CPI", note: "Does energy stay above 4% and block the Warsh cut thesis?", signal: "red" },
              { date: "Jul 28-29", label: "FOMC Meeting", note: "Cut possible if June CPI cooperates and claims keep rising.", signal: "yellow" },
              { date: "Sep 15-16", label: "FOMC -- Warsh Cut Watch", note: "Most likely meeting for a first cut if data cooperates.", signal: "red" },
              { date: "Oct 1", label: "SNAP Cuts Take Effect", note: "42 million Americans. Benefits reduced. Digital-only disbursement.", signal: "red" },
              { date: "Oct 8", label: "September CPI", note: "First CPI reading after SNAP cuts land.", signal: "red" },
              { date: "Oct 27-28", label: "FOMC Meeting", note: "Post-SNAP, post-Q3 earnings. Full K-shape stress picture.", signal: "yellow" },
              { date: "Nov 12", label: "October CPI", note: "Most important CPI of the year. SNAP + energy peak + lower-K.", signal: "red" },
              { date: "Nov 17-18", label: "FOMC Meeting", note: "Full Q4 picture visible. Year-end policy decision.", signal: "yellow" },
              { date: "Dec 15-16", label: "FOMC -- Year-End Decision", note: "Final meeting of 2026. Sets the tone for 2027.", signal: "yellow" },
            ].map((item, i, arr) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                <div style={{ width: "72px", flexShrink: 0 }}>
                  <span style={{ fontSize: "11px", fontWeight: "700", fontFamily: "sans-serif", color: item.signal === "red" ? "#dc2626" : item.signal === "yellow" ? "#92400e" : "#6b7280" }}>{item.date}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#111827", fontFamily: "sans-serif", marginBottom: "1px" }}>{item.label}</div>
                  <div style={{ fontSize: "11px", color: "#6b7280", fontFamily: "sans-serif" }}>{item.note}</div>
                </div>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", display: "inline-block", flexShrink: 0, marginTop: "5px", background: item.signal === "red" ? "#ef4444" : item.signal === "yellow" ? "#f59e0b" : "#9ca3af" }} />
              </div>
            ))}
          </div>
        </div>

        </div>
      )}
      <div style={{ padding: "16px 28px", borderTop: "1px solid #f3f4f6", fontSize: "12px", color: "#9ca3af", fontFamily: "sans-serif" }}>
        Sources: BLS, Federal Reserve, FinCEN, CBO, Center for American Progress  --  awaretrade.com
      </div>
    </div>
  );
}
