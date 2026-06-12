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
        { stat: "Real impact on a $60K household", value: "−$2,520/yr", context: "4.2% inflation on typical household spending. That is money that no longer buys what it did last year." },
        { stat: "Share of May's increase from energy", value: "Over 60%", context: "Most of the spike was gasoline. Core inflation is softer, but consumers pay the headline number at the pump." },
        { stat: "Months above 3.5% in a row", value: "2", context: "April was 3.8%. May is 4.2%. The trend is moving in the wrong direction." },
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
        { stat: "Gap between headline and core", value: "1.3 points", context: "Energy is doing the work. If core starts rising too, that is the second shoe dropping." },
        { stat: "Shelter inflation", value: "Still elevated", context: "Housing costs are the biggest piece of core CPI. They have been slow to fall and do not respond quickly to Fed policy." },
      ],
    },
    {
      id: "ppi",
      label: "PPI (May)",
      value: "−0.2%",
      sub: "Month over month. Forecast was +0.7%. First monthly decline in months.",
      note: "Wholesale inflation cooling. Gives the Fed more room. Pipeline pressure easing.",
      signal: "green",
      signalLabel: "COOL",
      category: "inflation",
      behind: [
        { stat: "What this means", value: "Relief signal", context: "Wholesale prices are what producers pay before costs reach your receipt. When PPI falls, consumer price pressure eases 1 to 3..." },
        { stat: "The split picture", value: "PPI cool, CPI still hot", context: "Consumer prices are still 4.2% driven by energy. PPI cooling means that pressure may not spread further into goods. But energy..." },
        { stat: "Fed implication", value: "Hold confirmed, cut possible later", context: "A cool PPI does not give the Fed reason to cut now with CPI at 4.2%. But it removes the argument for hiking. June hold is..." },
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
        { stat: "Votes to cut rates at last meeting", value: "4 out of 12", context: "The most divided Fed vote in over three decades. The committee is not unified on where rates should go." },
        { stat: "Real interest rate (adjusted for inflation)", value: "About −0.5%", context: "At 3.625% midpoint against 4.2% CPI, the real rate is still slightly negative. The Fed is not actually tight in real terms." },
        { stat: "Market odds of a cut in June", value: "Under 5%", context: "After yesterday's CPI report, markets have essentially ruled out any move this month." },
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
        { stat: "Where the jobs are", value: "Leisure, hospitality, local govt", context: "These sectors are adding jobs. They pay significantly less than the financial and professional services jobs being cut." },
        { stat: "Financial services jobs lost since May 2025", value: "107,000", context: "Higher-paid white-collar employment has been shrinking for a year. The strong headline hides a job quality problem." },
        { stat: "Hiring rate", value: "Frozen", context: "Job openings are not being filled at the pace of prior years. People are keeping jobs they have. They are not finding new ones..." },
      ],
    },
    {
      id: "unemployment",
      label: "Unemployment Rate",
      value: "4.3%",
      sub: "Unchanged. Has held between 4.3% and 4.5% since July 2025.",
      note: "The broader U-6 rate is 8.1%. Long-term unemployed: 27.5% of all jobless.",
      signal: "yellow",
      signalLabel: "WATCH",
      category: "labor",
      behind: [
        { stat: "U-6  --  the real unemployment rate", value: "8.1%", context: "U-6 adds discouraged workers and people working part-time who want full-time jobs. It is nearly twice the headline number." },
        { stat: "Long-term unemployed", value: "27.5% of jobless", context: "More than 1 in 4 unemployed people have been out of work for 27 weeks or more. These are not people between jobs." },
        { stat: "Working part-time, want full-time", value: "4.8 million", context: "These workers are counted as employed in the headline figure." },
        { stat: "Labor force participation rate", value: "61.8%", context: "Before the pandemic it was 63.3%. The people who stopped looking for work are not counted as unemployed at all." },
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
      category: "labor",
      behind: [
        { stat: "Real wage growth after inflation", value: "−0.8%", context: "Wages up 3.4%. Prices up 4.2%. Workers are losing purchasing power every month this gap continues." },
        { stat: "Wage growth vs. energy inflation", value: "3.4% vs. 23.5%", context: "Energy costs are rising nearly 7 times faster than wages. Lower-income households spend a much larger share of their income on..." },
        { stat: "Who is getting raises", value: "Hospitality and leisure", context: "Wage gains are concentrated in lower-wage sectors. Professional and business services wages are flat or down in real terms." },
      ],
    },
    {
      id: "jobless",
      label: "Weekly Jobless Claims",
      value: "242,000",
      sub: "Highest since August 2023. Forecast was 220,000.",
      note: "Jumped 22,000 above forecast. Labor market cracks appearing beneath the headline.",
      signal: "red",
      signalLabel: "RISING",
      category: "labor",
      behind: [
        { stat: "Beat by", value: "+22,000", context: "Forecasters expected 220,000. The actual number was 242,000. That is not a rounding error. That is a directional signal." },
        { stat: "Last time this high", value: "August 2023", context: "Claims have been quietly rising for weeks. This print is the highest in nearly three years." },
        { stat: "What it means next to payrolls", value: "Contradiction", context: "May payrolls added 172,000 jobs. This week 242,000 people filed for unemployment for the first time. Both can be true in a..." },
        { stat: "Federal employee claims", value: "Rising", context: "Federal workforce reduction claims have been ticking up week over week. DOGE-related cuts are beginning to show in the data." },
      ],
    },
    {
      id: "umich",
      label: "Consumer Sentiment (June prelim.)",
      value: "PENDING",
      sub: "June preliminary not yet released. May final: 44.8  --  record low.",
      note: "May was the third straight monthly decline. 57% of consumers cited high prices eroding their finances.",
      signal: "gray",
      signalLabel: "PENDING",
      category: "consumer",
      behind: [
        { stat: "May final reading", value: "44.8", context: "A record low. Revised down from the preliminary 48.2. The third straight monthly decline." },
        { stat: "Consumers citing high prices", value: "57%", context: "More than half of survey respondents spontaneously mentioned high prices eroding their personal finances  --  up from 50% the..." },
        { stat: "Year-ahead inflation expectations (May)", value: "4.8%", context: "Consumers expect prices to keep rising. That expectation itself is inflationary  --  it causes people to spend faster and save less." },
        { stat: "The gap that is the story", value: "Jobs strong, sentiment at record low", context: "May added 172,000 jobs. Consumers feel terrible. When those two things diverge this sharply, consumers are experiencing..." },
      ],
    },
    {
      id: "energy",
      label: "Energy Prices (May)",
      value: "+23.5%",
      sub: "Year over year. Gasoline is the main driver.",
      note: "Iran conflict is keeping pressure on. The Fed cannot cut while energy is this high.",
      signal: "red",
      signalLabel: "CRITICAL",
      category: "inflation",
      behind: [
        { stat: "Extra annual fuel cost on a typical household", value: "$800–1,200", context: "Estimated additional cost at current energy inflation. Higher for households with longer commutes." },
        { stat: "Energy as share of spending for lower-income households", value: "8–10%", context: "vs. about 3–4% for higher-income households. Energy inflation hits hardest at the bottom." },
        { stat: "Geopolitical variable", value: "Active", context: "President Trump warned Iran will pay the price this week. Any escalation extends the energy price spike." },
      ],
    },
    {
      id: "snap",
      label: "SNAP Benefit Cuts",
      value: "Oct 1",
      sub: "$187 billion cut over 10 years",
      note: "States must cover 75% of admin costs. Some may limit or exit the program.",
      signal: "red",
      signalLabel: "STRUCTURAL",
      category: "policy",
      behind: [
        { stat: "Average monthly benefit reduction", value: "About $14/month", context: "CBO estimate per household by 2034. A small number with large impact on families near the margin." },
        { stat: "Households losing internet deduction", value: "13 million", context: "The bill removes internet costs from the SNAP calculation, cutting benefits by about $10 a month for 13 million families." },
        { stat: "Timing overlap", value: "Q4 2026", context: "SNAP cuts, seasonal energy highs, and surveillance pricing acceleration all arrive in the same quarter." },
      ],
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
        { stat: "Red flags listed that describe ordinary life", value: "18", context: "Shared address, shared phone number, ITIN use, cash transactions in agriculture or construction. Millions of legal residents..." },
        { stat: "Agencies coordinating", value: "5", context: "FinCEN, IRS, FDIC, OCC, and the National Credit Union Administration. This is not one agency. It is whole-of-government." },
        { stat: "SAR tracking code", value: "FINANCIALINTEGRITY-2026-A002", context: "Banks are asked to tag suspicious activity reports with this code so data can be aggregated across every institution in the..." },
      ],
    },
    {
      id: "cc-delinquency",
      label: "Credit Card Delinquency",
      value: "2.9%",
      sub: "Q1 2026. Above pre-pandemic level of 2.6%.",
      note: "Headline is improving. Small bank rate is 6.4%  --  more than double the big bank rate.",
      signal: "yellow",
      signalLabel: "ELEVATED",
      category: "stress",
      behind: [
        { stat: "Big bank delinquency rate", value: "~3%", context: "Large institutions look relatively stable. Their customers skew toward higher-income, more creditworthy borrowers." },
        { stat: "Small bank delinquency rate", value: "6.4%", context: "Community banks serve lower-income and rural households. Their delinquency rate is more than double the national average. That..." },
        { stat: "Total credit card debt", value: "$1.252 trillion", context: "Down slightly from the Q4 2025 record of $1.277 trillion, but up 63% since Q1 2021. Americans have added $482 billion in card..." },
        { stat: "Average APR on cards carrying a balance", value: "21.52%", context: "Down slightly from 22.3% in Q4 2025, but still near historic highs. At 21.52%, a $5,000 balance costs over $1,000 a year in..." },
        { stat: "Charge-off rate", value: "3.8%", context: "When a bank charges off a card account it exits the delinquency denominator. The headline delinquency rate looks better partly..." },
      ],
    },
    {
      id: "auto-delinquency",
      label: "Auto Loan Delinquency",
      value: "5.6%",
      sub: "Q1 2026. 90+ days past due. Near post-financial-crisis high.",
      note: "Subprime auto at record highs. Car payments are the last bill people stop paying.",
      signal: "red",
      signalLabel: "STRESS",
      category: "stress",
      behind: [
        { stat: "Subprime auto delinquency (60+ days)", value: "6.8%", context: "The highest level on record going back to the early 1990s, according to Fitch Ratings. January 2026 hit 6.9%, the all-time record." },
        { stat: "Prime auto delinquency", value: "0.42%", context: "Prime borrowers are fine. The stress is entirely concentrated in subprime  --  lower-income households who bought vehicles at..." },
        { stat: "Total auto loan balances", value: "$1.68 trillion", context: "Up $43 billion year over year. Auto loan balances surged 23% from 2020 to 2024 driven by vehicle price inflation, not more..." },
        { stat: "Why auto delinquency matters", value: "Leading indicator", context: "Car payments are typically the last bill people stop paying because losing a car means losing a job. When auto delinquency..." },
      ],
    },
    {
      id: "mortgage-delinquency",
      label: "Mortgage Delinquency",
      value: "4.44%",
      sub: "Q1 2026. Up 40 basis points from a year ago.",
      note: "FHA loans at 11.52%. Foreclosure starts rising. Pandemic-era relief expired September 2025.",
      signal: "red",
      signalLabel: "RISING",
      category: "stress",
      behind: [
        { stat: "FHA loan delinquency rate", value: "11.52%", context: "FHA loans serve first-time and lower-income homebuyers. At 11.52%, nearly 1 in 8 FHA borrowers is behind on their mortgage...." },
        { stat: "VA loan delinquency rate", value: "~6.7%", context: "About 225 basis points above conventional loans. Veterans are disproportionately affected. VA partial claim program guidance..." },
        { stat: "Foreclosure process rate", value: "0.64%", context: "Up 11 basis points from Q4 2025 and 15 basis points from a year ago. Foreclosure starts are accelerating as forbearance..." },
        { stat: "Foreclosure actions started in Q1", value: "0.24%", context: "Up 4 basis points from last quarter. The pipeline is filling. These homes will reach the market in 6 to 12 months." },
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
      category: "stress",
      behind: [
        { stat: "Share of debt in delinquency", value: "4.8%", context: "Nearly 1 in 20 dollars of household debt is past due. That is the aggregate. The distribution is heavily skewed toward..." },
        { stat: "Credit card debt increase since 2021", value: "+63%", context: "$482 billion in new credit card debt in five years. Households have been using credit cards to absorb inflation that wages did..." },
        { stat: "New auto loans in Q1", value: "$182 billion", context: "Originations remain high despite delinquency stress, suggesting lenders are still extending credit into a weakening borrower pool." },
        { stat: "The K-shape in one sentence", value: "Aggregate looks stable. Components do not.", context: "Total debt rose only $18 billion. But beneath the headline, FHA delinquency is at 11.52%, subprime auto is at record highs,..." },
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
        { stat: "Year-to-date performance", value: "Volatile", context: "The S&P hit highs in late 2025, pulled back sharply on tariff announcements in early 2026, partially recovered, and is now..." },
        { stat: "Implied future annual return (CAPE-based)", value: "1.9%", context: "At current valuations, the Shiller CAPE model implies a 1.9% annual return over the next decade. That is below inflation...." },
        { stat: "Tuesday's selloff driver", value: "Hot CPI + rising claims", context: "Wednesday's CPI at 4.2% and Thursday's jobless claims at 242,000 are the proximate cause. The market is repricing stagflation..." },
      ],
    },
    {
      id: "cape",
      label: "Shiller CAPE Ratio",
      value: "39.9",
      sub: "June 1, 2026. Historical median: 16.1.",
      note: "23.9% above its own long-term average of 32.2. Implies very low future returns.",
      signal: "red",
      signalLabel: "OVERVALUED",
      category: "markets",
      behind: [
        { stat: "Historical median CAPE", value: "16.1", context: "The market is trading at nearly 2.5 times its historical median valuation. This has happened only twice before in modern..." },
        { stat: "Only times CAPE was higher", value: "1999-2000 and 2020-2022", context: "Both periods ended in significant corrections. The CAPE does not predict timing  --  markets can stay overvalued for years. But..." },
        { stat: "Regular P/E ratio", value: "24.8", context: "The trailing P/E is 24.8, near its 20-year average of 25.3. The regular P/E looks more reasonable because current earnings are..." },
        { stat: "What this means for your 401K", value: "Lower expected returns", context: "If you are in an index fund and 10+ years from retirement, the data suggests lower real returns ahead than the past decade..." },
      ],
    },
    {
      id: "vix",
      label: "VIX  --  Fear Index",
      value: "22.2",
      sub: "June 10, 2026. Up 11.8% on the day.",
      note: "52-week range: 13.4 to 35.3. Elevated but off the March peak of 29.5.",
      signal: "yellow",
      signalLabel: "ELEVATED",
      category: "markets",
      behind: [
        { stat: "What the VIX measures", value: "Expected volatility, next 30 days", context: "The VIX is the market's best guess about how much the S&P 500 will swing in the next month. Above 20 is elevated. Above 30 is..." },
        { stat: "Why it jumped 11.8% Tuesday", value: "CPI + claims combination", context: "Hot inflation plus rising unemployment claims in the same session is the stagflation signal the market fears most. When both..." },
        { stat: "Implication for your portfolio", value: "Hedging costs are rising", context: "A higher VIX means options-based protection costs more. It also means institutional investors are buying more insurance..." },
        { stat: "MOVE index (bond volatility)", value: "~77", context: "Treasury market volatility is also elevated, off its March peak of 115. When both stock and bond volatility are high..." },
      ],
    },
    {
      id: "credit-spreads",
      label: "High Yield Credit Spreads",
      value: "~300 bps",
      sub: "Mid-April 2026. Tightest since June 2007.",
      note: "Spreads say everything is fine. Default rates say otherwise. That gap is the risk.",
      signal: "red",
      signalLabel: "COMPLACENT",
      category: "markets",
      behind: [
        { stat: "What spreads are saying", value: "No fear of defaults", context: "At 300 basis points, high yield spreads are pricing a very benign economic scenario. They are near the tightest levels since..." },
        { stat: "What default rates are saying", value: "4.2–4.5% trailing default rate", context: "Moody's trailing 12-month high yield default rate is 4.2 to 4.5%. Spreads are compensating investors for roughly 2 to 2.5% of..." },
        { stat: "Investment grade spreads", value: "~85 bps  --  near 25-year tights", context: "Investment grade corporate bonds are also priced for perfection. Tight spreads mean little cushion if the economic picture..." },
        { stat: "The risk in plain language", value: "The bond market is not worried. It should be.", context: "Tight spreads while defaults are rising means investors are not being paid for the risk they are taking. When that gap closes,..." },
      ],
    },
    {
      id: "sixty-forty",
      label: "60/40 Portfolio",
      value: "Under pressure",
      sub: "Stocks and bonds falling together. The hedge is broken.",
      note: "When inflation is high, bonds do not offset stock losses. Both fall at the same time.",
      signal: "red",
      signalLabel: "BROKEN",
      category: "markets",
      behind: [
        { stat: "Why the 60/40 worked for 40 years", value: "Stocks and bonds moved opposite", context: "When stocks fell, investors fled to bonds, pushing bond prices up. That negative correlation was the hedge. It held from 1980..." },
        { stat: "Why it stopped working", value: "Inflation changed the math", context: "When inflation is high, the Fed cannot cut rates to rescue the economy. That means bond prices fall at the same time stocks..." },
        { stat: "2022 was the warning", value: "Both stocks and bonds fell 15–20%", context: "2022 was the worst year for the 60/40 since the 1930s. With CPI back at 4.2% and the Fed on hold, the conditions that broke..." },
        { stat: "What replaces it", value: "Real assets, short duration, alternatives", context: "TIPS, commodities, short-term bonds, and real assets tend to hold value better when inflation is high. The investment ideas..." },
      ],
    },
    {
      id: "ten-year",
      label: "10-Year Treasury Yield",
      value: "~4.5%",
      sub: "June 10, 2026. The benchmark rate for everything.",
      note: "Mortgage rates, auto loans, corporate debt, and the U.S. deficit all price off this number.",
      signal: "yellow",
      signalLabel: "ELEVATED",
      category: "economy",
      behind: [
        { stat: "30-year mortgage rate right now", value: "6.55%", context: "Bankrate June 11, 2026. The 10-year yield drives mortgage rates. At 6.55%, buying a $400,000 home costs about $2,530/month  -- ..." },
        { stat: "Spread: mortgage over 10-year", value: "~2.05 percentage points", context: "Historically the spread runs 1.5 to 2 points. It is slightly wide, meaning lenders are charging a risk premium on top of the..." },
        { stat: "CBO 10-year yield forecast, end 2026", value: "4.1%", context: "The Congressional Budget Office projects yields to ease to 4.1% by year end. That is conditional on inflation cooling. With..." },
      ],
    },
    {
      id: "mortgage-rate",
      label: "30-Year Mortgage Rate",
      value: "6.55%",
      sub: "June 11, 2026. Up from 6.48% last week. Freddie Mac: 6.48%.",
      note: "Hopes for sub-6% rates in 2026 keep fading. Iran conflict keeping energy and inflation high.",
      signal: "red",
      signalLabel: "STUCK",
      category: "economy",
      behind: [
        { stat: "Rate one year ago", value: "6.85%", context: "Rates have fallen modestly over the past year but are not declining meaningfully. The market has largely stopped expecting cuts." },
        { stat: "Monthly payment: $400K home at 6.55%", value: "$2,530/month", context: "The same mortgage at the 2021 average rate of 3.1% would cost $1,707/month. That $823 difference is the affordability gap that..." },
        { stat: "Why rates are stuck", value: "10-year yield + inflation", context: "The Fed does not set mortgage rates directly. The 10-year Treasury does. With CPI at 4.2% and the Fed on hold, Treasury yields..." },
        { stat: "Refinance rate", value: "6.69%", context: "Refinancing costs more than a new purchase loan. Homeowners who bought at 3% have no financial incentive to move or refinance...." },
      ],
    },
    {
      id: "home-affordability",
      label: "Home Price to Income Ratio",
      value: "~7.2x",
      sub: "2026 estimate. Historical average: ~3.5x.",
      note: "Buying a home now requires more than 7 years of gross household income. The historical norm is 3 to 4.",
      signal: "red",
      signalLabel: "CRISIS",
      category: "economy",
      behind: [
        { stat: "Historical norm", value: "3 to 4x income", context: "For most of the post-war era, a median home cost 3 to 4 times median household income. Today it is more than twice that." },
        { stat: "What created this gap", value: "Low rates + limited supply + investor buying", context: "A decade of near-zero rates inflated asset prices. Institutional investors bought single-family homes as rentals. Zoning..." },
        { stat: "Stuck market dynamic", value: "No one can afford to buy or sell", context: "Existing homeowners with 3% mortgages will not sell and take on a 6.55% mortgage. First-time buyers cannot afford entry prices..." },
        { stat: "Freddie Mac: income growth vs. home prices", value: "Income growth outpacing prices  --  marginally", context: "Freddie Mac noted in June that income growth is marginally outpacing home price growth. That is better than 2022-2024. It does..." },
      ],
    },
    {
      id: "savings-rate",
      label: "Personal Savings Rate",
      value: "2.6%",
      sub: "April 2026. BEA. Down from 4.5% in January 2026.",
      note: "The household buffer is thinning. Historical average is 8.4%. Spending is outpacing income.",
      signal: "red",
      signalLabel: "DEPLETING",
      category: "economy",
      behind: [
        { stat: "Historical average savings rate", value: "8.4%", context: "From 1959 to 2026, Americans saved an average of 8.4% of disposable income. At 2.6%, households are saving at less than a..." },
        { stat: "What happened to savings", value: "Inflation absorbed them", context: "Pandemic-era savings built a buffer through 2022. Inflation at 4%+ for three years eroded that buffer. Credit card debt rose..." },
        { stat: "April spending increase vs. income", value: "Spending +0.5%, income flat", context: "In April 2026, consumer spending rose 0.5% while personal income was essentially unchanged. People are spending more than they..." },
        { stat: "Why 2.6% matters", value: "No cushion for October", context: "SNAP cuts hit October 1. Energy bills peak in Q4. A savings rate of 2.6% means most households have minimal buffer to absorb..." },
      ],
    },
    {
      id: "retail-sales",
      label: "Retail Sales (April)",
      value: "+0.5%",
      sub: "Month over month. Up 4.9% from April 2025.",
      note: "Consumers still spending. But the May report releases June 17  --  watch for a pullback.",
      signal: "green",
      signalLabel: "HOLDING",
      category: "economy",
      behind: [
        { stat: "Year over year", value: "+4.9%", context: "Nominal retail sales are up 4.9% from a year ago. But with CPI at 4.2%, real (inflation-adjusted) sales growth is less than..." },
        { stat: "3-month trend", value: "+4.4% Feb–Apr vs. prior year", context: "The rolling 3-month trend is solid. But this data predates the May CPI shock, the claims jump, and the VIX spike. The June 17..." },
        { stat: "What would signal a pullback", value: "Flat or negative May reading", context: "Consumers have been resilient. But savings at 2.6%, credit card APRs at 21.5%, and real wages negative  --  the math does not..." },
      ],
    },
    {
      id: "wti",
      label: "WTI Crude Oil",
      value: "~$91/barrel",
      sub: "June 10–11, 2026. Brent near $94.",
      note: "Up ~$27 from a year ago. Strait of Hormuz disruption is the driver. EIA peak forecast: $115/barrel Q2.",
      signal: "red",
      signalLabel: "ELEVATED",
      category: "economy",
      behind: [
        { stat: "Price one year ago", value: "~$64/barrel", context: "Oil is up roughly 42% year over year. That increase runs directly through energy CPI at 23.5% and into every price that has..." },
        { stat: "EIA peak forecast", value: "$115/barrel Q2 2026", context: "The Energy Information Administration forecast Brent peaking near $115 in Q2 before easing as supply disruptions abate. That..." },
        { stat: "Strait of Hormuz status", value: "Near-total closure", context: "The Strait carries roughly 20% of global oil supply. Near-total closure since the Iran conflict began is the primary..." },
        { stat: "Impact on every other price", value: "Diesel, fertilizer, transportation", context: "Oil does not just affect gas prices. Diesel moves freight. Fertilizer uses natural gas. Transportation costs are embedded in..." },
      ],
    },
    {
      id: "nfib",
      label: "NFIB Small Business Optimism",
      value: "95.3",
      sub: "May 2026. Below 52-year average of 98.0 for second straight month.",
      note: "Uncertainty index at 91  --  well above historical average of 68. Sales down, utilities up, oil up.",
      signal: "yellow",
      signalLabel: "FRAGILE",
      category: "economy",
      behind: [
        { stat: "52-year average", value: "98.0", context: "The index has been below its long-run average for two consecutive months. April and May are the softest readings since..." },
        { stat: "Uncertainty index", value: "91 (historical average: 68)", context: "The uncertainty component is 34% above its historical average. Small business owners do not know what comes next. Uncertainty..." },
        { stat: "Job openings small businesses cannot fill", value: "29%  --  lowest since May 2020", context: "Small businesses are not finding workers at the rates of prior years. Partly lower demand, partly wage competition from larger..." },
        { stat: "Retail sector", value: "Lowest optimism of all industries", context: "Retail small businesses are the most pessimistic. That is the sector most directly exposed to consumer spending pullback,..." },
        { stat: "Ohio services owner, verbatim", value: "Sales down, utilities up, oil up", context: "Sales are typically lower in Q1, but we noticed it stayed lower longer than usual. Utilities have gone up, payroll has gone..." },
      ],
    },
    {
      id: "dxy",
      label: "U.S. Dollar Index (DXY)",
      value: "~100",
      sub: "June 11, 2026. Down ~10% from Jan 2025 peak of 109+.",
      note: "Steepest H1 decline since 1973. Stabilized near 100 on Iran conflict safe-haven demand.",
      signal: "yellow",
      signalLabel: "WEAKENING",
      category: "dollar",
      behind: [
        { stat: "DXY Jan 2025 peak", value: "109+", context: "The dollar hit multi-year highs in January 2025. It has lost roughly 10% of that value in 18 months  --  the steepest first-half..." },
        { stat: "Why it stabilized near 100", value: "Iran conflict safe-haven demand", context: "Geopolitical stress drives dollar demand even when fundamentals are weak. The Iran conflict is providing a floor. Without it,..." },
        { stat: "What a weak dollar means for you", value: "Imports cost more", context: "A weaker dollar raises the price of imported goods  --  electronics, clothing, food inputs. It is a second inflation channel on..." },
        { stat: "EUR/USD", value: "~1.165", context: "The euro has strengthened significantly against the dollar. Traveling to Europe costs more. Importing from Europe costs more." },
      ],
    },
    {
      id: "dollar-reserves",
      label: "Dollar Share of Global Reserves",
      value: "~57%",
      sub: "Q3 2025 IMF COFER. Lowest since 1995.",
      note: "Down from 72% in 2001. Structural decline confirmed. But central banks are not actively fleeing.",
      signal: "yellow",
      signalLabel: "DECLINING",
      category: "dollar",
      behind: [
        { stat: "Peak dollar reserve share", value: "72% (2001)", context: "The dollar's dominance in global reserves has been declining for two decades. The pace has accelerated since 2022 sanctions..." },
        { stat: "How much of the decline is active vs. passive", value: "Mostly passive", context: "IMF analysis shows that most of the 2025 decline was exchange-rate effects, not active selling. Central banks largely held..." },
        { stat: "Euro share of reserves", value: "~21%", context: "The euro is the only currency gaining meaningful ground. The yuan is at 3% of SWIFT payments. No single currency is positioned..." },
        { stat: "Editorial precision", value: "Decline is structural, not collapse", context: "The dollar is losing ground gradually across decades. It is not being abandoned. The framing matters: slow erosion of dollar..." },
      ],
    },
    {
      id: "gold-reserves",
      label: "Central Bank Gold Purchases",
      value: "1,000+ tonnes",
      sub: "Third consecutive year above 1,000 tonnes. 2024 total: ~1,045 tonnes.",
      note: "More than double the 473-tonne annual average from 2010 to 2021. Countries are hedging the dollar.",
      signal: "red",
      signalLabel: "ACCELERATING",
      category: "dollar",
      behind: [
        { stat: "2024 top buyers", value: "Poland (90t), Turkey (75t), India", context: "Not just adversaries of the U.S.  --  Poland is a NATO member. The hedging is geopolitical, not ideological." },
        { stat: "Why central banks buy gold", value: "Dollar hedge + sanctions protection", context: "After the U.S. froze Russia's dollar reserves in 2022, central banks across the world began asking: what if our dollar..." },
        { stat: "Implication for U.S. Treasury demand", value: "Less recycling", context: "Petrodollar recycling  --  oil exporters buying U.S. Treasuries with dollar revenues  --  has been the mechanism that kept U.S...." },
      ],
    },
    {
      id: "mbridge",
      label: "mBridge  --  Cross-Border CBDC",
      value: "$55.5B settled",
      sub: "2,500x increase since 2022. 15-second settlement. No SWIFT.",
      note: "China, UAE, Saudi Arabia, Thailand, Hong Kong. BIS withdrew Oct 2024. No U.S. seat.",
      signal: "red",
      signalLabel: "ACTIVE",
      category: "dollar",
      behind: [
        { stat: "What mBridge is", value: "Multi-CBDC cross-border settlement", context: "Central banks of China, UAE, Saudi Arabia, Thailand, and Hong Kong settle in 15 seconds without SWIFT, without correspondent banks, without touching the dollar system." },
        { stat: "BIS withdrawal Oct 2024", value: "Called it graduation", context: "BIS stepped back citing sanctions concerns. 95% of transactions use the digital yuan. Project continues without BIS oversight  --  meaning without Western guardrails." },
        { stat: "Saudi Arabia joined June 2024", value: "Full participant", context: "The country that priced oil in dollars for 50 years is testing cross-border settlement that bypasses the dollar entirely. This is the petrodollar story made concrete." },
        { stat: "U.S. position", value: "No seat at the table", context: "The Federal Reserve is not a participant or observer. The payment architecture being built to settle the world's oil trade is being designed without U.S. input." },
      ],
    },
    {
      id: "agora",
      label: "Project Agora  --  Western Response",
      value: "Real-value testing 2026",
      sub: "7 central banks, 40+ institutions. Prototype confirmed May 27 2026.",
      note: "Fed NY, Bank of England, Bank of Japan. Mastercard, JPMorgan, HSBC, Swift all involved.",
      signal: "yellow",
      signalLabel: "BUILDING",
      category: "dollar",
      behind: [
        { stat: "What Agora is", value: "Western tokenized cross-border settlement", context: "The BIS-led Western answer to mBridge. Seven central banks tokenize reserves and commercial bank deposits to settle cross-border payments without correspondent banks." },
        { stat: "Prototype confirmed May 27 2026", value: "Atomic settlement works", context: "BIS confirmed atomic multi-currency settlement is achievable across currencies and jurisdictions. Real-value testing begins in 2026. Final report expected H1 2027." },
        { stat: "The programmability clause", value: "Smart contracts in transactions", context: "Agora allows institutions to embed compliance requirements and conditional payment triggers directly into transactions. Programmable money is the design, not a side effect." },
        { stat: "mBridge vs. Agora", value: "Two parallel architectures", context: "mBridge settles outside the dollar system. Agora modernizes it. The U.S. has a seat at the Agora table. It does not have one at mBridge. Whichever reaches scale first shapes the next 50 years." },
      ],
    },
    {
      id: "petrodollar",
      label: "Petrodollar Agreement",
      value: "Expired",
      sub: "June 9, 2024. No renewal. No replacement agreement.",
      note: "Saudi Arabia can now price oil in any currency. It has not formally committed to doing so.",
      signal: "yellow",
      signalLabel: "WATCH",
      category: "dollar",
      behind: [
        { stat: "What the agreement was", value: "1974 US-Saudi arrangement", context: "Saudi Arabia agreed to price oil in dollars and recycle revenues into U.S. Treasuries. The U.S. provided military protection...." },
        { stat: "What expiration means  --  documented", value: "No legal obligation to price in dollars", context: "Saudi Arabia is no longer bound by any agreement to price oil in dollars. This is a documented fact." },
        { stat: "What expiration means  --  structural inference", value: "Possible multi-currency pricing", context: "Saudi Arabia has discussed yuan-denominated oil sales with China and has joined Project mBridge. No formal shift has been..." },
        { stat: "Why it matters regardless", value: "Treasury recycling at risk", context: "For decades, Saudi oil revenues became dollar purchases, which became Treasury purchases, which kept U.S. borrowing costs low...." },
      ],
    },
  ],
  behind_narrative: [
    { label: "Today's Data: Two Stories, One Direction", text: "PPI fell 0.2%  --  wholesale inflation cooling. But jobless claims hit 242,000, highest since August 2023. Good news on inflation, bad news on jobs. The two together describe an economy weakening in the places that matter most.", level: "yellow" },
    { label: "The Job Quality Problem", text: "172,000 jobs added in May. But financial services lost 22,000  --  down 107,000 from its peak. Gains are in leisure and hospitality at $35K-$50K median. U-6 unemployment is 8.1%. The labor market is sorting downward.", level: "red" },
    { label: "The Real Wage Trap", text: "Wages up 3.4%. Prices up 4.2%. The gap costs a $60K household roughly $480 a year. Energy inflation at 23.5% costs a typical household $800-$1,200 more annually. The raise happened. The purchasing power did not follow.", level: "red" },
    { label: "The Stagflation Setup", text: "Fed on hold. Cannot cut: CPI 4.2%. Cannot hike: labor fragile. April vote 8-4, most divided in decades. Warsh cut thesis: if labor cracks faster than inflation, he cuts first. June 16-17: no move expected.", level: "yellow" },
    { label: "The Economy in Plain Language", text: "Mortgage rate 6.55%. Home prices at 7x median income. Savings rate 2.6% vs. 8.4% historical average. NFIB below average two months running. Oil up 42% year over year. The standard financial strategies are becoming structurally harder to execute simultaneously.", level: "red" },
    { label: "The Debt Trap Beneath the Headline", text: "Americans added $482B in credit card debt since 2021 at 21.52% APR. Subprime auto delinquency hit a record 6.9% in January. FHA mortgage delinquency at 11.52%. Pandemic relief expired September 2025. The squeeze is already running.", level: "red" },
    { label: "The K-Shape Is Cracking", text: "Savings at 2.6%, credit maxed at 21.5% APR, real wages negative, SNAP cuts October 1. When the lower K pulls back spending: discount retail and fast food lose volume first, then small business suppliers, then regional employment.", level: "red" },
    { label: "The Dollar Is Losing Ground", text: "Dollar reserve share below 57% for the first time since 1995, down from 72% in 2001. DXY down 10% from January 2025 peak. Central banks buying 1,000+ tonnes of gold annually. Petrodollar agreement expired June 2024. Slow erosion raises U.S. borrowing costs over time.", level: "yellow" },
    { label: "The Market Is Expensive", text: "Shiller CAPE at 39.9 implies 1.9% annual returns over 10 years  --  below inflation. High yield spreads near 2007 tights while default rates run 4.2-4.5%. The 60/40 portfolio is broken when inflation is high. Both legs fall together.", level: "red" },
    { label: "Your Bank Is Now an Immigration File", text: "June 5: five federal agencies directed banks to flag customers by immigration status. ITIN use, shared addresses, cash transactions in agriculture or construction  --  all red flags. A specific SAR code aggregates data across every institution in the country.", level: "red" },
  ],
    thesis: [
    { label: "Real Wage Gap", text: "Wages up 3.4%. Prices up 4.2%. Workers are losing purchasing power every month this gap continues.", level: "red" },
    { label: "Stagflation Risk", text: "Strong headline jobs, frozen hiring, inflation re-accelerating. The Fed cannot cut. Classic trap.", level: "yellow" },
    { label: "Benefits Cliff", text: "SNAP cuts take effect October 1. Same quarter energy bills peak and surveillance pricing accelerates.", level: "red" },
    { label: "Payment Rail Weaponization", text: "FinCEN advisory turns every bank account into an immigration file. The architecture was already built. Now it is being used.", level: "red" },
  ],
  contagion: [
    { stage: "Stage 1", status: "complete", label: "Lower-K Balance Sheets Broke", date: "2023-2025",
      text: "Subprime auto delinquency hit record highs. Small bank credit card delinquency reached 6.4%. FHA mortgage delinquency at 11.52%. Personal savings rate collapsed to 2.6%. This is fully documented and complete.",
      triggers: [], level: "red" },
    { stage: "Stage 2", status: "active", label: "Lower-K Spending Contracting", date: "Now  --  Q3 2026",
      text: "NFIB retail sector most pessimistic of all industries. Jobless claims jumped to 242,000. Small business hiring at lowest since May 2020. Lower-K pullback is showing in small business revenue before S&P 500 earnings because large companies have pricing power and global revenue. Small businesses do not.",
      triggers: ["NFIB retail optimism lowest of all sectors", "Jobless claims 242K, highest since Aug 2023", "Small business job openings lowest since May 2020"], level: "red" },
    { stage: "Stage 3", status: "approaching", label: "Corporate Earnings Miss  --  Lower-K Visible", date: "Q4 2026 / Jan-Feb 2027",
      text: "SNAP cuts land October 1. Energy bills peak seasonally. Lower-K spending cliff becomes visible in earnings for the first time. Dollar General, Dollar Tree, casual dining, budget apparel report Q4 numbers in January and February 2027. The market does not reprice risk until it shows up in earnings  --  and earnings are backward-looking by one quarter.",
      triggers: ["SNAP cuts October 1  --  watch November retail sales", "October CPI  --  does energy spike persist?", "Dollar General and Dollar Tree Q3 guidance"], level: "yellow" },
    { stage: "Stage 4", status: "risk", label: "Upper-K Contagion", date: "Q4 2026  --  Q2 2027",
      text: "The upper K is insulated until three things happen: unemployment rises into the professional class, home equity stops functioning as a buffer, or credit markets reprice. Two of three already show early signals. Financial services employment down 107,000 from peak. High yield spreads near 2007 tights while defaults run 4.2-4.5%. The historical gap between lower-K breakdown and upper-K impact is 12 to 18 months. Lower K broke in mid-2024. That window is now.",
      triggers: ["Jobless claims crossing 300K consistently", "High yield spreads widening past 450 bps", "Upper-income quintile UMich sentiment falling"], level: "yellow" },
  ],
  ideas: [
    {
      id: "tbills", theme: "Short-Term Treasury Bills / Notes", weight: "19%",
      signal: "green", conviction: "High", assetClass: "Fixed Income",
      bestAccount: "Taxable -- T-bill interest is exempt from state and local taxes. Useful in high-tax states like Connecticut. Works in IRA too.",
      rationale: "The largest allocation in the model and the right call in this environment. Fed on hold at 3.50-3.75% with no June cut. Short-term paper captures today's rates without duration risk. If inflation re-accelerates, longer bonds lose value while T-bills roll over at higher rates.",
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
      bestAccount: "Taxable for long-term holds (capital gains rates). Roth IRA for highest-conviction names with growth potential.",
      rationale: "Broad domestic equity exposure with a tilt toward industrials, utilities, and energy services. The equal-weight allocation avoids mega-cap concentration. Shiller CAPE at 39.9 implies low expected returns from index exposure -- stock selection and sector tilt matter more than they did in the 2010s bull market.",
      instruments: [
        { name: "US Industrials ETF", ticker: "XLI", type: "ETF" },
        { name: "US Utilities ETF", ticker: "XLU", type: "ETF" },
        { name: "US Oil & Gas Equipment & Services ETF", ticker: "OIH", type: "ETF" },
        { name: "US Large Cap Equal Weight ETF", ticker: "RSP", type: "ETF" },
        { name: "US Small Cap Core Blend ETF", ticker: "SCHA", type: "ETF" },
        { name: "US Biotech ETF", ticker: "XBI", type: "ETF" },
      ],
      caveat: "Small cap has meaningful lower-K consumer exposure. If Stage 3 contagion arrives in Q4, small caps feel it first. Biotech is macro-independent -- trades on drug approvals, not economic cycles.",
    },
    {
      id: "intl-eq", theme: "International Equity", weight: "20%",
      signal: "yellow", conviction: "Medium", assetClass: "Equities",
      bestAccount: "Taxable -- foreign tax credits on international dividends are only usable in taxable accounts, not IRAs. Latin America and EM have higher yields.",
      rationale: "Dollar weakness is the thesis. DXY down 10% from January 2025 peak. When the dollar falls, international assets outperform in dollar terms. Latin America at 5% is the most direct dollar-weakness play. Developed international and emerging markets provide diversification away from U.S. valuation risk.",
      instruments: [
        { name: "Latin America ETF", ticker: "ILF", type: "ETF" },
        { name: "Developed International Markets ETF", ticker: "EFA", type: "ETF" },
        { name: "Emerging Markets ETF", ticker: "EEM", type: "ETF" },
        { name: "Global Metals & Mining Producers ETF", ticker: "PICK", type: "ETF" },
      ],
      caveat: "Dollar weakness thesis reverses if Iran conflict drives safe-haven dollar demand. Emerging markets carry geopolitical risk. Size Latin America carefully -- concentrated single-region exposure.",
    },
    {
      id: "gold-assets", theme: "Gold & Monetary Assets", weight: "12.5%",
      signal: "green", conviction: "High", assetClass: "Commodities",
      bestAccount: "IRA -- gold ETFs taxed as collectibles at 28% in taxable accounts. Holding GLD or IAU in an IRA avoids that rate. Miners in Roth if you want leveraged upside tax-free. Physical gold has no account.",
      rationale: "Central banks bought 1,000+ tonnes for the third consecutive year. Dollar reserve share below 57% for the first time since 1995. Petrodollar agreement expired June 2024. The conditions that historically drive gold outperformance are all present. Miners add leverage to the gold price move. Silver adds monetary asset diversification.",
      instruments: [
        { name: "Gold Bullion ETF", ticker: "GLD", type: "ETF" },
        { name: "iShares Gold Trust -- lower expense ratio", ticker: "IAU", type: "ETF" },
        { name: "Precious Metals Miners & Royalty ETF", ticker: "GDX", type: "ETF" },
        { name: "Silver Bullion ETF", ticker: "SLV", type: "ETF" },
      ],
      caveat: "Gold is volatile short-term. Responds to real rates and dollar strength, not just inflation. If the dollar surges on geopolitical safe-haven demand, gold can sell off even with elevated CPI.",
    },
    {
      id: "bonds", theme: "Bonds", weight: "15%",
      signal: "yellow", conviction: "Medium", assetClass: "Fixed Income",
      bestAccount: "IRA / 401k -- bond interest taxed as ordinary income annually. Shelter in tax-deferred accounts. EM bonds especially benefit from IRA treatment.",
      rationale: "The most debated allocation in this environment. Intermediate Treasuries provide rate exposure. Long-term Treasuries at 7.5% are a direct bet on the Warsh cut thesis -- if the Fed cuts before hiking, long bonds rally. The data trigger: June CPI below 3.8% and claims above 260K consistently strengthens the cut case. EM bonds in local currency add yield and dollar-weakness exposure.",
      instruments: [
        { name: "Long-Term Treasury Bond ETF", ticker: "TLT", type: "ETF" },
        { name: "Intermediate-Term Treasury Bond ETF", ticker: "IEF", type: "ETF" },
        { name: "EM Bonds Local Currency ETF", ticker: "EBND", type: "ETF" },
      ],
      caveat: "TLT is a thesis-dependent position. With CPI at 4.2% and the Fed on hold, long bonds carry duration risk. If the Warsh cut thesis is wrong, this position loses value. Monitor June CPI and September FOMC.",
    },
    {
      id: "commodities", theme: "Commodities Basket", weight: "5%",
      signal: "green", conviction: "Medium", assetClass: "Commodities",
      bestAccount: "IRA -- commodity ETFs generate K-1 tax forms in taxable accounts, which is an administrative burden. Holding in an IRA eliminates that complexity.",
      rationale: "Broad inflation hedge. Energy CPI at 23.5%, food price pressure building into Q4. A diversified commodities basket captures multiple inflation vectors simultaneously without concentration in any single commodity.",
      instruments: [
        { name: "Invesco DB Commodity Index Tracking Fund", ticker: "DBC", type: "ETF" },
        { name: "iShares GSCI Commodity Dynamic Roll Strategy ETF", ticker: "COMT", type: "ETF" },
      ],
      caveat: "Commodities are volatile. The basket smooths single-commodity risk but still moves significantly. Size as an inflation hedge, not a primary growth position.",
    },
    {
      id: "tips-add", theme: "Consider Adding: TIPS", weight: "Replace some IEF",
      signal: "yellow", conviction: "Medium", assetClass: "Fixed Income",
      bestAccount: "IRA / 401k -- TIPS interest is taxed annually on the inflation adjustment even if you do not sell. Always hold in a tax-deferred account.",
      rationale: "The model has no direct CPI linkage in its bond allocation. With inflation at 4.2% and re-accelerating, swapping a portion of intermediate Treasury exposure into TIPS adds direct purchasing power protection. TIPS adjust principal with CPI -- your real return is protected as long as inflation stays elevated.",
      instruments: [
        { name: "Vanguard Short-Term Inflation-Protected Securities ETF", ticker: "VTIP", type: "ETF" },
        { name: "iShares TIPS Bond ETF", ticker: "TIP", type: "ETF" },
      ],
      caveat: "TIPS underperform when inflation falls faster than expected. VTIP is better than TIP in a rising-rate environment due to shorter duration.",
    },
    {
      id: "medicaid-add", theme: "Consider Adding: Medicaid Managed Care", weight: "3-5% new position",
      signal: "yellow", conviction: "Medium", assetClass: "Equities",
      bestAccount: "Roth IRA -- policy-driven growth potential and counter-cyclical characteristics make this a good candidate for tax-free compounding.",
      rationale: "Not in the current model. When SNAP cuts hit October 1 and lower-K health stress rises, Medicaid enrollment expands. Managed care companies are paid per enrolled member regardless of market conditions. This is the one equity position that directly benefits from the same policy environment hurting consumers.",
      instruments: [
        { name: "Molina Healthcare -- concentrated Medicaid exposure", ticker: "MOH", type: "Stock" },
        { name: "Centene Corporation -- largest Medicaid operator", ticker: "CNC", type: "Stock" },
        { name: "Health Care Select Sector SPDR", ticker: "XLV", type: "ETF" },
      ],
      caveat: "Subject to state contract risk. OBBBA cuts are federal -- states may reduce managed care contracts to offset costs. Research state-specific exposure before investing in individual names.",
    },
  ],
  caution: [
    { id: "c1", theme: "Long-Duration Bonds (standalone)", ticker: "TLT", reason: "TLT held outside the Warsh cut thesis carries pure duration risk. With CPI at 4.2% and the Fed on hold, there is no near-term catalyst for long bond recovery. The 7.5% allocation in the model is thesis-dependent -- size accordingly." },
    { id: "c2", theme: "Dollar Store / Lower-K Consumer", ticker: "DG, DLTR", reason: "Dollar General and Dollar Tree look defensive but are not. When SNAP shrinks and savings are gone, even $1.25 items get cut. Q4 2026 earnings will likely surprise to the downside as Stage 3 contagion arrives." },
    { id: "c3", theme: "Consumer Discretionary Broad", ticker: "XLY", reason: "Real wages negative, SNAP cuts October 1, savings at 2.6%. The consumer discretionary sector faces pressure from multiple directions simultaneously in Q4 2026." },
    { id: "c4", theme: "ARK Innovation / High-Duration Growth", ticker: "ARKK", reason: "High-multiple growth stocks are vulnerable if the Fed holds or is forced to hike. No near-term catalyst for rate cuts with CPI at 4.2%." },
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
const TABS = ["indicators", "stress", "markets", "behind", "ideas", "thesis"];
const TAB_LABELS = { indicators: "Indicators", stress: "Consumer Stress", markets: "Markets", behind: "Behind the Numbers", ideas: "Investment Ideas", thesis: "Big Picture" };
const CATEGORIES = [
  { id: "all", label: "All" }, { id: "inflation", label: "Inflation" },
  { id: "labor", label: "Labor" }, { id: "monetary", label: "Monetary" },
  { id: "consumer", label: "Consumer" }, { id: "stress", label: "Consumer Stress" },
  { id: "markets", label: "Markets" }, { id: "economy", label: "Economy" },
  { id: "dollar", label: "Dollar / Petrodollar" }, { id: "policy", label: "Policy" },
];

export default function MacroMonitor() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("indicators");
  const [expandedIdea, setExpandedIdea] = useState(null);
  const [expandedBehind, setExpandedBehind] = useState(null);

  const filtered = activeCategory === "all"
    ? data.indicators
    : data.indicators.filter((d) => d.category === activeCategory);

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
          <div style={{ padding: "14px 28px", display: "flex", gap: "8px", flexWrap: "wrap", borderBottom: "1px solid #f3f4f6" }}>
            {CATEGORIES.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
                background: activeCategory === cat.id ? "#eef2ff" : "#f9fafb",
                border: activeCategory === cat.id ? "1px solid #6366f1" : "1px solid #e5e7eb",
                color: activeCategory === cat.id ? "#4338ca" : "#4b5563",
                fontSize: "13px", padding: "5px 14px", borderRadius: "20px",
                cursor: "pointer", fontFamily: "sans-serif",
              }}>
                {cat.label}
              </button>
            ))}
          </div>
          <div style={{ padding: "20px 28px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px" }}>
            {filtered.map((item) => {
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
              For 40 years, the standard retirement portfolio was 60% stocks and 40% bonds. When stocks fell, bonds went up. The bond portion cushioned the blow. That relationship held because inflation was low and the Fed could cut rates in a crisis. When rates fell, bond prices rose. The cushion worked. When inflation is high  --  as it is today at 4.2%  --  the Fed cannot cut rates to rescue the economy. That means bond prices fall at the same time stocks fall. The cushion is gone. 2022 proved it. The worst year for the 60/40 portfolio since the 1930s. The conditions that caused it are present again. If your retirement savings are in a standard target-date fund, you are likely still in a 60/40 or similar structure. The Investment Ideas tab covers what works better in this environment.
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

      {/* ── CONSUMER STRESS ── */}
      {activeTab === "stress" && (
        <div style={{ padding: "20px 28px" }}>
          <p style={{ fontSize: "16px", color: "#6b7280", marginTop: 0, marginBottom: "24px", lineHeight: 1.6, fontFamily: "sans-serif" }}>
            What household balance sheets look like beneath the headline numbers. All data Q1 2026.
          </p>
          {/* K-shape callout */}
          <div style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "16px 20px", marginBottom: "24px" }}>
            <div style={{ fontSize: "13px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px", fontFamily: "sans-serif" }}>The K-Shape in One Sentence</div>
            <div style={{ fontSize: "15px", color: "#1f2937", lineHeight: 1.7, fontFamily: "sans-serif" }}>
              Every aggregate delinquency rate is a weighted average hiding a healthy top half and a distressed bottom half. FHA mortgages: 11.52%. Subprime auto: record 6.8%. Small bank cards: 6.4%. The average obscures the distribution.
            </div>
          </div>
          {/* Stress grid from indicators */}
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
            <div style={{ fontSize: "16px", color: "#1f2937", lineHeight: 1.8 }}>
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

          {/* Caution section */}
          <div>
            <div style={{ fontSize: "13px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px", fontFamily: "sans-serif" }}>Handle With Care</div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "14px", fontFamily: "sans-serif" }}>
              Not recommended at current valuations or in the current macro environment.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {data.caution.map((item) => (
                <div key={item.id} style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: "4px", padding: "12px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: "#dc2626", fontFamily: "sans-serif", marginBottom: "4px" }}>{item.theme}</div>
                      <div style={{ fontSize: "12px", color: "#6b7280", fontFamily: "sans-serif", marginBottom: "6px" }}>{item.ticker}</div>
                      <div style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6, fontFamily: "sans-serif" }}>{item.reason}</div>
                    </div>
                  </div>
                </div>
              ))}
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
        </div>
      )}

      <div style={{ padding: "16px 28px", borderTop: "1px solid #f3f4f6", fontSize: "12px", color: "#9ca3af", fontFamily: "sans-serif" }}>
        Sources: BLS, Federal Reserve, FinCEN, CBO, Center for American Progress  --  awaretrade.com
      </div>
    </div>
  );
}
