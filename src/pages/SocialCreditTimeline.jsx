import { useState } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const INTRO = `China built a social credit system and called it that. The United States built one and called it something else. This is the sequence.`;

const TRACKS = [
  { id: "infrastructure", label: "Infrastructure", color: "#7c3aed", desc: "The technical systems being built" },
  { id: "policy",         label: "Policy & Law",   color: "#dc2626", desc: "The legal framework being written" },
  { id: "existing",       label: "Already Running", color: "#92400e", desc: "U.S. systems that already function as social credit" },
  { id: "china",          label: "China  --  Reference", color: "#0369a1", desc: "The system Americans fear abroad  --  for comparison" },
];

const EVENTS = [
  // ── EXISTING SYSTEMS (pre-2020 context) ──────────────────────────────────
  { id: "e1", year: 1970, month: "Oct", track: "existing",
    headline: "Fair Credit Reporting Act Creates Opaque Consumer File System",
    summary: "The FCRA establishes credit bureaus as private data collectors with no requirement to explain scoring methodology. Errors affect 1 in 5 reports. Disputes can take 45 days and often fail.",
    source: "FTC, Credit Report Study 2012", url: "https://www.ftc.gov/sites/default/files/documents/reports/section-319-fair-and-accurate-credit-transactions-act-2003-sixth-interim-federal-trade-commission/130211factareport.pdf",
    tags: ["Credit", "Access"],
  },
  { id: "e2", year: 1990, month: null, track: "existing",
    headline: "ChexSystems Banking Blacklist Becomes Industry Standard",
    summary: "ChexSystems, owned by Fidelity National Information Services, creates a banking blacklist that can bar Americans from opening checking accounts for five years. No consent required. Overdraft fees are the primary trigger. 5.6 million households are unbanked as of 2023.",
    source: "FDIC National Survey of Unbanked and Underbanked Households 2023", url: "https://www.fdic.gov/resources/resolutions/bank-failures/failed-bank-list/",
    tags: ["Banking", "Access"],
  },
  { id: "e3", year: 2003, month: null, track: "existing",
    headline: "Tenant Screening Databases Standardized Across Rental Market",
    summary: "Private tenant screening companies aggregate eviction records, criminal history, and rental payment data into reports landlords use as access gatekeepers. No national standard for accuracy. Errors follow renters for years. No meaningful right of removal.",
    source: "National Consumer Law Center, Tenant Screening Report 2023", url: "https://www.nclc.org/resources/tenant-screening/",
    tags: ["Housing", "Access"],
  },
  // ── 2010s ─────────────────────────────────────────────────────────────────
  { id: "e4", year: 2014, month: null, track: "infrastructure",
    headline: "Mastercard MDES Tokenization System Goes Live  --  Apple Pay Launches",
    summary: "Mastercard Digital Enablement Service (MDES) creates the tokenization infrastructure that replaces card numbers with device-specific tokens. Every transaction is now tied to a device identity, a location, and a behavioral profile. The payment rail becomes a surveillance rail.",
    source: "Mastercard MDES Technical Documentation", url: "https://developer.mastercard.com/mdes-digital-enablement/documentation/",
    tags: ["Payment Rail", "Identity"],
  },
  { id: "e5", year: 2018, month: null, track: "existing",
    headline: "Credit Invisibles: 45 Million Americans Have No Usable Credit Score",
    summary: "CFPB reports 45 million Americans are credit invisible or have unscorable files. This population cannot access credit, rent apartments, or in some states get jobs  --  not because of bad behavior, but because they have no file. The system penalizes absence as much as failure.",
    source: "CFPB, The Geography of Credit Invisibility 2018", url: "https://www.consumerfinance.gov/data-research/research-reports/the-geography-of-credit-invisibility/",
    tags: ["Credit", "Access"],
  },
  { id: "e6", year: 2018, month: null, track: "infrastructure",
    headline: "IRS Real-Time Data Access Agreements with Financial Institutions Expand",
    summary: "IRS expands data-sharing infrastructure with financial institutions. The foundation for the 2025 mega-API that would give Palantir access to tax, banking, and benefit records is laid during this period.",
    source: "IRS Data Sharing Frameworks, Treasury Inspector General", url: "https://www.treasury.gov/tigta/",
    tags: ["Surveillance", "Data Fusion"],
  },
  // ── 2020 ──────────────────────────────────────────────────────────────────
  { id: "e7", year: 2020, month: null, track: "infrastructure",
    headline: "FedNow Development Begins  --  Real-Time Payment Rails for Every Bank",
    summary: "The Federal Reserve begins development of FedNow, an instant payment infrastructure that will eventually connect every U.S. bank. Real-time payment rails create real-time transaction surveillance capability  --  every dollar moving in real time means every behavioral signal is captured in real time.",
    source: "Federal Reserve, FedNow Service Overview", url: "https://www.frbservices.org/financial-services/fednow/",
    tags: ["Payment Rail", "Infrastructure"],
  },
  // ── 2022 ──────────────────────────────────────────────────────────────────
  { id: "e8", year: 2022, month: "Mar", track: "policy",
    headline: "Biden Executive Order 14067  --  CBDC Research Directed",
    summary: "President Biden signs EO 14067 directing the Federal Reserve and Treasury to research a U.S. central bank digital currency. The order frames programmable money as a policy priority for the first time. Later revoked by Trump in January 2025  --  but the research infrastructure and payment architecture built during this period remained.",
    source: "White House, Executive Order 14067, March 9 2022", url: "https://www.whitehouse.gov/briefings-statements/2022/03/09/fact-sheet-president-biden-to-sign-executive-order-on-ensuring-responsible-development-of-digital-assets/",
    tags: ["CBDC", "Policy"],
  },
  { id: "e9", year: 2022, month: null, track: "existing",
    headline: "Medical Debt Added to Credit Reports for 43 Million Americans",
    summary: "Medical debt appears on credit reports for 43 million Americans at this point, suppressing scores for unpredictable, non-behavioral reasons. The Biden administration later pressured bureaus to remove it  --  but the infrastructure to add it back exists and CFPB protections are now being rolled back.",
    source: "CFPB Medical Debt Report 2022", url: "https://www.consumerfinance.gov/data-research/research-reports/medical-debt-burden-in-the-united-states/",
    tags: ["Credit", "Healthcare"],
  },
  // ── 2023 ──────────────────────────────────────────────────────────────────
  { id: "e10", year: 2023, month: "Jul", track: "infrastructure",
    headline: "FedNow Launches  --  Instant Payment Rails Operational",
    summary: "The Federal Reserve launches FedNow, connecting over 500 financial institutions with instant payment capability. Real-time settlement means real-time behavioral data. Every transaction timestamped, geolocated, and categorized the moment it occurs.",
    source: "Federal Reserve, FedNow Launch Statement, July 20 2023", url: "https://www.federalreserve.gov/newsevents/pressreleases/other20230720a.htm",
    tags: ["Payment Rail", "Infrastructure"],
  },
  { id: "e11", year: 2023, month: null, track: "existing",
    headline: "SNAP EBT Transactions Provide Real-Time Food Purchase Surveillance",
    summary: "42 million Americans use SNAP EBT cards that timestamp, geolocate, and categorize every food purchase in real time. This behavioral database exists and is operational. The transition to digital-only benefit delivery mandated in 2025 extends this model to all federal benefits.",
    source: "USDA Food and Nutrition Service, SNAP Data 2023", url: "https://www.fns.usda.gov/snap/data-system",
    tags: ["Surveillance", "Benefits"],
  },
  // ── 2024 ──────────────────────────────────────────────────────────────────
  { id: "e12", year: 2024, month: "Jun", track: "policy",
    headline: "U.S.-Saudi Petrodollar Agreement Expires  --  No Renewal",
    summary: "The informal 1974 agreement requiring Saudi Arabia to price oil in U.S. dollars and recycle revenues into Treasury bonds expires on June 9, 2024 with no renewal. The structural mechanism that created global dollar demand for 50 years no longer has a contractual foundation.",
    source: "U.S.-Saudi Joint Commission Records; Arab Center DC Analysis August 2025", url: "https://arabcenterdc.org/resource/exploring-the-options-arab-oil-exporters-and-the-us-dollar/",
    tags: ["Dollar", "Geopolitics"],
  },
  { id: "e13", year: 2024, month: "Aug", track: "infrastructure",
    headline: "DOGE Copies 300 Million Social Security Records to Unsecured Cloud",
    summary: "SSA Chief Data Officer Chuck Borges later alleges that DOGE operatives copied 300 million Social Security records to an unsecured cloud environment in August 2025. DOJ validated the breach in January 2026. A separate allegation: 548 million SSA records on a personal thumb drive.",
    source: "Chuck Borges whistleblower testimony; DOJ validation January 2026", url: "https://www.ssa.gov/",
    tags: ["Surveillance", "Data Fusion"],
    disputed: false,
  },
  // ── 2025 ──────────────────────────────────────────────────────────────────
  { id: "e14", year: 2025, month: "Jan", track: "policy",
    headline: "Trump EO 14178  --  CBDC Prohibited, Digital Asset Framework Ordered",
    summary: "Trump revokes Biden's CBDC research order and prohibits establishment of a U.S. central bank digital currency. Simultaneously directs a working group to propose a federal digital asset regulatory framework within 180 days. The prohibition on CBDC does not prohibit programmable stablecoins  --  the GENIUS Act fills that gap six months later.",
    source: "White House, Executive Order 14178, January 23 2025", url: "https://www.whitehouse.gov/presidential-actions/2025/01/strengthening-american-leadership-in-digital-financial-technology/",
    tags: ["CBDC", "Policy"],
  },
  { id: "e15", year: 2025, month: "Feb", track: "policy",
    headline: "CFPB Effectively Shuttered  --  Enforcement Actions Dismissed",
    summary: "The Consumer Financial Protection Bureau ceases enforcement activity. Pending cases against TransUnion, credit card companies, and mortgage servicers are dismissed. The agency overseeing credit bureaus, ChexSystems, and banking blacklist disputes is neutralized. The systems that function as de facto social credit lose their primary regulator.",
    source: "CFPB Enforcement Dismissal Records, February 28 2025", url: "https://protectborrowers.org/wp-content/uploads/2025/10/CFPB-Pending-Enforcement-Actions-Memo.pdf",
    tags: ["Regulation", "Policy"],
  },
  { id: "e16", year: 2025, month: "Mar", track: "infrastructure",
    headline: "Palantir IRS Mega-API Goes Live  --  Tax, Bank, and Benefit Data Fused",
    summary: "Palantir receives access to IRS data through a mega-API connecting tax records, banking information, and benefit data. Combined with OPM fingerprints, medical records, and bank account data already held on federal employees, the fusion layer that enables cross-system behavioral profiling is operational.",
    source: "Senate Finance Committee Inquiry; Treasury Inspector General", url: "https://www.treasury.gov/tigta/",
    tags: ["Surveillance", "Data Fusion"],
  },
  { id: "e17", year: 2025, month: "Mar", track: "infrastructure",
    headline: "Trump Strategic Bitcoin Reserve Executive Order Signed",
    summary: "Trump signs an executive order establishing a Strategic Bitcoin Reserve and U.S. Digital Asset Stockpile. The U.S. government becomes a direct participant in the digital asset ecosystem, normalizing state involvement in programmable money infrastructure.",
    source: "White House, Strategic Bitcoin Reserve EO, March 2025", url: "https://www.whitehouse.gov/",
    tags: ["Digital Assets", "Infrastructure"],
  },
  { id: "e18", year: 2025, month: "May", track: "policy",
    headline: "Executive Order  --  All Federal Benefits to Be Disbursed Digitally by September 2025",
    summary: "An executive order mandates that all federal government benefit disbursements transition to digital payment systems by September 2025. Cash and paper check options for federal benefits begin phasing out. The payment rail for benefits becomes a surveillance rail by default.",
    source: "White House Executive Order on Federal Payments Modernization 2025", url: "https://www.whitehouse.gov/",
    tags: ["Benefits", "Payment Rail"],
  },
  { id: "e19", year: 2025, month: "May", track: "infrastructure",
    headline: "Palantir No-Bid $75M Contract  --  RTO Tracking at USDA, SSA, VA",
    summary: "Palantir receives a no-bid $75 million contract to track return-to-office compliance at USDA, SSA, and the VA. The same company that holds IRS, OPM, and federal employee data is now tracking daily physical presence. 13 former Palantir employees warn publicly that internal guardrails have been dismantled.",
    source: "Senate HELP Committee investigation; Palantir SEC filings Q1 2026", url: "https://www.palantir.com/",
    tags: ["Surveillance", "Federal"],
  },
  { id: "e20", year: 2025, month: "Jul", track: "policy",
    headline: "GENIUS Act Signed  --  Federal Stablecoin Framework Enacted",
    summary: "President Trump signs the GENIUS Act on July 18, 2025  --  the first federal legislation regulating cryptocurrency in U.S. history. It establishes a licensing framework for payment stablecoins. Stablecoins are programmable: spending can be restricted by category, geography, time, or condition. This is the legal infrastructure for programmable money.",
    source: "White House Fact Sheet, GENIUS Act, July 18 2025", url: "https://www.whitehouse.gov/fact-sheets/2025/07/fact-sheet-president-donald-j-trump-signs-genius-act-into-law/",
    tags: ["Stablecoin", "Policy"],
  },
  { id: "e21", year: 2025, month: "Oct", track: "infrastructure",
    headline: "SpaceX FCC Filing  --  1 Million Orbital Data Centers Proposed",
    summary: "SpaceX files with the FCC for authority to deploy up to 1 million orbital data processing nodes. Infrastructure beyond the reach of terrestrial regulation. Blue Origin files Project Sunrise for similar architecture. xAI merger conversations surface. Surveillance infrastructure moving off-planet.",
    source: "FCC Filing, SpaceX Orbital Processing Nodes 2025; GAO April 2026 review", url: "https://www.fcc.gov/",
    tags: ["Infrastructure", "Surveillance"],
  },
  // ── 2026 ──────────────────────────────────────────────────────────────────
  { id: "e22", year: 2026, month: "Mar", track: "policy",
    headline: "Treasury Digital Identity Report  --  Biometric ID as Payment Infrastructure",
    summary: "Treasury's March 2026 report formally positions digital identity as necessary infrastructure for the crypto ecosystem. It describes biometric authentication, cryptographic wallets, and cross-platform integration as the foundation for digital asset scaling. Identity and payment are merging into a single system.",
    source: "U.S. Treasury Digital Asset Report, March 2026", url: "https://www.treasury.gov/",
    tags: ["Digital Identity", "Policy"],
  },
  { id: "e23", year: 2026, month: "Apr", track: "policy",
    headline: "Maryland Passes First State Surveillance Pricing Law",
    summary: "Maryland enacts the Protection From Predatory Pricing Act, restricting AI-enabled grocery pricing that uses personal data to set individual prices. It is the first state law of its kind  --  and it does not cover time-of-day pricing, surge pricing based on demand, or electronic shelf labels already deployed in major chains.",
    source: "Maryland Protection From Predatory Pricing Act, April 2026", url: "https://mgaleg.maryland.gov/",
    tags: ["Surveillance Pricing", "Policy"],
  },
  { id: "e24", year: 2026, month: "May", track: "policy",
    headline: "One Big Beautiful Bill Cuts SNAP $187B  --  Digital Benefits Mandated",
    summary: "The OBBBA cuts SNAP by $187 billion over ten years. Benefits are already being disbursed digitally under the September 2025 executive order. The combination removes the cash alternative and shrinks the benefit simultaneously. The payment rail now controls both access and amount.",
    source: "CBO Score, One Big Beautiful Bill, May 2026; Center for American Progress", url: "https://www.cbo.gov/",
    tags: ["Benefits", "Policy"],
  },
  { id: "e25", year: 2026, month: "Jun", track: "policy",
    headline: "FinCEN Advisory  --  Banks Directed to Flag Customers by Immigration Status",
    summary: "Five federal agencies  --  FinCEN, IRS, FDIC, OCC, and NCUA  --  issue a joint advisory directing banks to flag customers based on immigration status. 18 red flags listed, including ITIN use, shared addresses, and cash transactions in agriculture or construction. SAR code FINANCIALINTEGRITY-2026-A002 aggregates data across all institutions. The payment system is now explicitly immigration enforcement infrastructure.",
    source: "FinCEN Advisory FIN-2026-A002, June 5 2026", url: "https://www.fincen.gov/",
    tags: ["Banking", "Surveillance", "Immigration"],
  },
  // ── X MONEY ───────────────────────────────────────────────────────────────
  { id: "x1", year: 2022, month: null, track: "infrastructure",
    headline: "Musk Acquires Twitter for $44B  --  Everything App Vision Announced",
    summary: "Elon Musk completes acquisition of Twitter in October 2022 and immediately announces plans to transform it into an everything app modeled on WeChat. The payment layer is central to the vision from day one. Musk had previously co-founded X.com, which merged with Confinity to become PayPal. The acquisition is framed publicly as a free speech platform. The payment infrastructure ambition is the less-discussed parallel track.",
    source: "Twitter acquisition filing, SEC October 2022", url: "https://www.sec.gov/",
    tags: ["X Money", "Platform"],
  },
  { id: "x2", year: 2024, month: "Dec", track: "infrastructure",
    headline: "X Announces X Money  --  Yaccarino Posts Super App Vision",
    summary: "X CEO Linda Yaccarino announces X Money at year-end 2024, framing it as a financial layer for the everything app. X reaches a claimed milestone of over 1 billion users. The payment product is positioned as a competitor to Venmo, Zelle, and Cash App  --  and as an alternative to traditional banking infrastructure.",
    source: "Linda Yaccarino X post, December 2024; PYMNTS January 2025", url: "https://pymnts.com/",
    tags: ["X Money", "Platform"],
  },
  { id: "x3", year: 2025, month: "Jan", track: "infrastructure",
    headline: "X Partners with Visa  --  X Money Account Announced for 2025 Launch",
    summary: "Linda Yaccarino announces Visa as X Money's first partner on January 28, 2025. Visa Direct will enable real-time funding and peer-to-peer payments within the X app via debit card. X Payments LLC holds money transmitter licenses in 40 states and DC at this point, covering roughly 85% of the U.S. population. Editorial precision: X Money at this stage runs on Visa Direct fiat rails, not stablecoins.",
    source: "Linda Yaccarino X post January 28 2025; The Financial Brand January 2025", url: "https://thefinancialbrand.com/news/payments-trends/x-money-sets-first-payments-partnership-with-visa-186270/",
    tags: ["X Money", "Payment Rail", "Visa"],
  },
  { id: "x4", year: 2025, month: "Mar", track: "infrastructure",
    headline: "X Payments LLC Holds 40+ State Money Transmitter Licenses",
    summary: "As of March 2025, X Payments LLC has secured money transmitter licenses in more than 40 states, clearing the primary regulatory hurdle for payments at scale. New York  --  the most significant holdout  --  is targeted for Q4 2025. The regulatory groundwork is in place for a national rollout. Money transmitter licensing means X can hold, move, and transmit funds on behalf of users without being a bank.",
    source: "Swipesum analysis March 2025; PYMNTS January 2025", url: "https://www.swipesum.com/insights/x-money-the-ultimate-guide-to-x-coms-payments-product",
    tags: ["X Money", "Regulation"],
  },
  { id: "x5", year: 2025, month: "Sep", track: "infrastructure",
    headline: "X Money Internal Beta Launches  --  Direct Deposit and Debit Card Live",
    summary: "X Money enters internal beta with core features operational: peer-to-peer transfers via Visa Direct, digital wallet with USD balances, direct deposit capability, and a physical and virtual X debit card. FDIC-insured deposits held via Cross River Bank up to $250,000. Musk states publicly: you will not need a bank account. The product is no longer a roadmap item  --  it is in active use.",
    source: "NextBigFuture September 2025; PYMNTS March 2026", url: "https://www.nextbigfuture.com/2025/09/x-money-is-being-used-internally.html",
    tags: ["X Money", "Platform", "Banking"],
  },
  { id: "x6", year: 2025, month: "Nov", track: "infrastructure",
    headline: "Visa Direct Stablecoin Payout Pilot  --  The Pathway from Fiat to Programmable Money",
    summary: "Visa announces a stablecoin payout pilot enabling businesses to pre-fund payouts using stablecoins via Visa Direct. This is the infrastructure bridge between X Money's current fiat rails and a future stablecoin implementation. Editorial precision: this pilot is separate from X Money's current product, which runs on fiat Visa Direct. The GENIUS Act signed in July 2025 provides the legal framework for the stablecoin pathway to become operational.",
    source: "Visa Press Release, November 12 2025", url: "https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.21791.html",
    tags: ["X Money", "Stablecoin", "Visa"],
  },
  { id: "x7", year: 2026, month: "Feb", track: "infrastructure",
    headline: "X Smart Cashtags Launch  --  Stock and Crypto Trading Directly in Feed",
    summary: "X head of product Nikita Bier announces Smart Cashtags on February 14, 2026: tapping a stock ticker or crypto symbol in any X post initiates a trade without leaving the app. Financial activity  --  investing, trading, payment  --  becomes native to the social feed. The everything app collapses the distance between content consumption and financial action.",
    source: "X Product Announcement, February 14 2026; PYMNTS March 2026", url: "https://www.pymnts.com/news/payments-innovation/2026/elon-musk-says-x-money-debut-april/",
    tags: ["X Money", "Platform", "Digital Assets"],
  },
  { id: "x8", year: 2026, month: "Mar", track: "infrastructure",
    headline: "Musk Says X Money Debuts in April  --  6% APY and X Debit Card",
    summary: "Elon Musk confirms X Money public launch for April 2026. External beta features: 6% APY on deposits (a liquidity magnet to move primary cash holdings into X), personalized metal Visa debit card with cashback, FDIC-insured deposits via Cross River Bank, and peer-to-peer payments. X holds money transmitter licenses in 41 states plus DC. Editorial precision: the 6% APY and debit card run on fiat rails. The stablecoin layer enabled by the GENIUS Act is a documented future pathway, not the current product.",
    source: "PYMNTS March 11 2026; Neobanque March 8 2026", url: "https://www.pymnts.com/news/payments-innovation/2026/elon-musk-says-x-money-debut-april/",
    tags: ["X Money", "Platform", "Banking"],
  },
  { id: "x9", year: 2026, month: "Apr", track: "infrastructure",
    headline: "X Money Public Launch  --  Everything App Payment Layer Goes Live",
    summary: "X Money launches publicly in April 2026 with 600 million users as the potential addressable base. The product positions X as a bank alternative: direct deposit, debit card, yield on deposits, peer-to-peer payments, and trading  --  all within the social feed. The structural question the Aware Trade thesis asks: X holds your balance, X controls your account, X has your behavioral data from every post and interaction. The payment rail and the surveillance rail are the same rail.",
    source: "KuCoin analysis April 2026; PYMNTS March 2026", url: "https://www.kucoin.com/blog/X-money-Launch",
    tags: ["X Money", "Platform", "Surveillance"],
  },

  // ── MASTERCARD AND BEIJING DELEGATION ────────────────────────────────────
  { id: "mc1", year: 2024, month: "Sep", track: "infrastructure",
    headline: "Mastercard Announces $2.65B Acquisition of Recorded Future",
    summary: "Mastercard announces the acquisition of Recorded Future, the world's largest threat intelligence company, for $2.65 billion. Recorded Future serves over 1,900 clients across 75 countries including the governments of 45 countries. The acquisition adds AI-driven threat intelligence, behavioral analytics, and real-time decisioning to Mastercard's payment network. The framing: cybersecurity. The function: the payment rail now has eyes beyond the transaction itself.",
    source: "Mastercard Press Release, September 2024; PYMNTS December 2024", url: "https://investor.mastercard.com/investor-news/investor-news-details/2024/Mastercard-Finalizes-Acquisition-of-Recorded-Future/default.aspx",
    tags: ["Mastercard", "Surveillance", "Data Fusion"],
  },
  { id: "mc2", year: 2024, month: "Dec", track: "infrastructure",
    headline: "Mastercard Completes Recorded Future Acquisition  --  Threat Intelligence Fused into Payment Rail",
    summary: "Mastercard completes the Recorded Future acquisition on December 20, 2024. Recorded Future analyzes a broad set of data sources to provide visibility into potential threats across the entire digital interaction  --  not just the payment moment. Mastercard's EVP stated: by the time you get to the payment, you are at the last part of the digital interaction. Adding Recorded Future means looking broadly across the entire interaction, not just the transaction. The payment company is now an intelligence company.",
    source: "Mastercard Press Release December 20 2024; PYMNTS December 22 2024", url: "https://investor.mastercard.com/investor-news/investor-news-details/2024/Mastercard-Finalizes-Acquisition-of-Recorded-Future/default.aspx",
    tags: ["Mastercard", "Surveillance", "Data Fusion", "Identity"],
  },
  { id: "bj1", year: 2025, month: "Mar", track: "policy",
    headline: "CEO Delegation to Beijing  --  Mastercard, Apple, Goldman Among Attendees",
    summary: "China hosts U.S. business executives at the China Development Forum in March 2025, including Apple CEO Tim Cook, Goldman Sachs's Ken Griffin, and others. The forum is Beijing's annual mechanism for cultivating corporate relationships as a counterweight to U.S. trade policy. Mastercard CEO Michael Miebach attends. The framing from corporate attendees: optimism and access. The structural reality: payment infrastructure companies are at the table as China seeks to maintain leverage over U.S. corporate interests.",
    source: "CNBC, China Development Forum March 2025", url: "https://www.cnbc.com/2025/03/",
    tags: ["Mastercard", "China", "Geopolitics"],
  },
  { id: "bj2", year: 2026, month: "May", track: "policy",
    headline: "Trump Beijing State Visit  --  Mastercard CEO Among 15+ Executive Delegation",
    summary: "President Trump travels to Beijing for a state visit on May 13-14, 2026, accompanied by more than 15 U.S. CEOs including Elon Musk, Tim Cook, Larry Fink, David Solomon, Jane Fraser, Stephen Schwarzman, Jensen Huang, and Mastercard CEO Michael Miebach. The executives tell Xi they highly value the Chinese market and hope to do more business in China. The editorial framing: this is not bribery. It is structural corruption  --  continuous incentive alignment between the executives who control U.S. payment infrastructure and the government of China, without any explicit transaction required.",
    source: "CNBC May 11 2026; Al Jazeera May 14 2026; CBS News May 2026", url: "https://www.cnbc.com/2026/05/11/trump-ceos-elon-musk-tim-cook-larry-fink-xi-china-summit.html",
    tags: ["Mastercard", "China", "Geopolitics", "Payment Rail"],
  },

  // ── MASTERCARD BVNK AND AGENTIC COMMERCE ─────────────────────────────────
  { id: "ag1", year: 2025, month: "Apr", track: "infrastructure",
    headline: "Mastercard Agent Pay Announced  --  AI Agents Get Their Own Payment Tokens",
    summary: "Mastercard announces Agent Pay on April 29, 2025, a framework that lets verified AI agents transact on a consumer's behalf using Agentic Tokens  --  an extension of MDES tokenization. Tokens are scoped per agent, per merchant, and per consent policy. A model like ChatGPT or Microsoft Copilot can complete a checkout without ever holding a card number. Launch partners: Microsoft, IBM, and Braintree. The payment rail Pamela helped build at Mastercard is now being extended to machines. The surveillance rail follows automatically: every agent transaction is timestamped, geolocated, and profiled.",
    source: "Mastercard Agent Pay Press Release April 29 2025; Eco.com Agent Pay Guide 2026", url: "https://www.mastercard.com/",
    tags: ["Mastercard", "Agentic Commerce", "AI", "Payment Rail"],
  },
  { id: "ag2", year: 2025, month: "Sep", track: "infrastructure",
    headline: "Visa Trusted Agent Protocol Launches  --  AI Agents Get Verified Identities",
    summary: "Visa launches its Trusted Agent Protocol (TAP) on October 14, 2025 with Cloudflare. TAP signs the agent's identity into HTTP request headers; merchants verify the signature against Visa's directory. A Verified Agent ID is issued by Visa and a separate consent record is signed by the consumer's issuer. Citi and U.S. Bank cardholders gain first access in September 2025. By December 2025, Visa has completed hundreds of secure agent-initiated transactions with over 100 partners including Skyfire, Nekuda, PayOS, and Ramp. Visa declares 2025 the last year consumers will shop and checkout alone.",
    source: "Visa Trusted Agent Protocol announcement October 2025; Visa Press Release December 18 2025", url: "https://investor.visa.com/news/news-details/2025/Visa-and-Partners-Complete-Secure-AI-Transactions-Setting-the-Stage-for-Mainstream-Adoption-in-2026/default.aspx",
    tags: ["Visa", "Agentic Commerce", "AI", "Identity"],
  },
  { id: "ag3", year: 2025, month: "Nov", track: "infrastructure",
    headline: "Mastercard Agent Pay Full U.S. Rollout  --  First Agentic Transaction Confirmed",
    summary: "Mastercard CEO Michael Miebach tells analysts in October 2025 that the first agentic transaction took place on Mastercard's network that quarter. Full U.S. rollout announced November 2025 with global expansion through 2026. Miebach declares Mastercard will be at the center of agentic commerce. PayPal tokens are made interoperable with Mastercard's agentic framework. The editorial question: when an AI agent shops on your behalf using your credentials, who is responsible for what was purchased? Who controls what the agent is permitted to buy?",
    source: "Digital Commerce 360 April 2026; Eco.com Agent Pay Guide 2026", url: "https://www.digitalcommerce360.com/2026/04/02/visa-mastercard-in-agentic-commerce/",
    tags: ["Mastercard", "Agentic Commerce", "AI"],
  },
  { id: "ag4", year: 2025, month: "Nov", track: "infrastructure",
    headline: "PayPal Instant Buy in Perplexity  --  Checkout Inside the AI Chat Interface",
    summary: "PayPal and Perplexity launch Instant Buy on November 25, 2025, enabling direct checkout within Perplexity's chat interface. Supports 6,000+ merchants. PayPal embeds payment inside ChatGPT via the Agentic Commerce Protocol starting in 2026. The commerce layer is moving inside the AI conversation. When your shopping assistant is also your checkout terminal, the distinction between recommendation and purchase collapses. The AI that influences what you want is the same system that executes the transaction.",
    source: "PayPal Perplexity Instant Buy announcement November 2025; Paz.ai Q4 2025 Guide", url: "https://www.paz.ai/blog/the-payment-networks-are-all-in-what-visa-mastercard-and-paypals-q4-moves-signal",
    tags: ["Agentic Commerce", "AI", "Surveillance Pricing"],
  },
  { id: "mc3", year: 2026, month: "Mar", track: "infrastructure",
    headline: "Mastercard Acquires BVNK for $1.8B  --  Stablecoin Infrastructure Fused into Global Payment Network",
    summary: "Mastercard announces definitive agreement to acquire BVNK, a U.K.-based stablecoin infrastructure company, for up to $1.8 billion on March 17, 2026. BVNK enables stablecoin payments on all major blockchain networks across 130+ countries. The deal connects on-chain stablecoin payments to Mastercard's global fiat network for cross-border transfers, remittances, and B2B payments. Stablecoin payment volumes reached at least $350 billion in 2025. This is Mastercard's third major acquisition of the decade after Nets ($3.19B) and Recorded Future ($2.65B). The company that built the tokenization infrastructure for Apple Pay in 2014 is now the infrastructure layer for programmable money at global scale.",
    source: "Mastercard Press Release March 17 2026; Mastercard 10-Q Q1 2026; S&P Global March 26 2026", url: "https://investor.mastercard.com/investor-news/investor-news-details/2026/Mastercard-to-Acquire-BVNK-to-Connect-On-Chain-Payments-and-Fiat-Rails/default.aspx",
    tags: ["Mastercard", "Stablecoin", "Infrastructure", "Payment Rail"],
  },
  { id: "ag5", year: 2026, month: "May", track: "infrastructure",
    headline: "Mastercard Agent Suite Expands  --  Merchant-Facing Agentic Commerce Capabilities",
    summary: "Mastercard expands its Agent Suite with new merchant-facing capabilities on May 26, 2026. Mastercard's chief digital officer asks publicly: how can merchants distinguish between legitimate AI agents and malicious bots? How do they know the consumer authorized the agent? How can they know the agent carried out instructions correctly? These are framed as security questions. They are also the architecture of a permission system  --  a framework in which every AI-initiated transaction requires authorization, identity verification, and scope limitation. That framework, built for security, is simultaneously the infrastructure for behavioral control.",
    source: "Digital Commerce 360 April 2026; AIM Media House June 2026", url: "https://www.digitalcommerce360.com/2026/04/02/visa-mastercard-in-agentic-commerce/",
    tags: ["Mastercard", "Agentic Commerce", "AI", "Surveillance"],
  },
  { id: "ag6", year: 2026, month: "Jun", track: "infrastructure",
    headline: "Visa Partners with OpenAI  --  AI Agents Get Direct Access to Global Payment Network",
    summary: "Visa announces a strategic collaboration with OpenAI on June 10, 2026, integrating Visa's global payment network into OpenAI experiences. Covers tokenization, agent identification, real-time authorization, and fraud monitoring for AI-initiated transactions at scale. Visa's Chief Product Officer states: AI will transform commerce more profoundly than the internet or mobile technology. Tokens issued for a grocery shopping agent cannot be used for travel bookings. The scoping is framed as a consumer protection. It is also the mechanism by which the payment network determines what an AI agent  --  and therefore the human it represents  --  is permitted to purchase.",
    source: "AIM Media House June 10 2026; Visa Press Release June 10 2026", url: "https://aimmediahouse.com/ai-bfsi/visa-and-mastercard-enter-agentic-commerce-war",
    tags: ["Visa", "Agentic Commerce", "AI", "Payment Rail"],
  },

  // ── CLARITY ACT, TOKENIZED DEPOSITS, AUGUSTUS ───────────────────────────
  { id: "cl1", year: 2025, month: "Jul", track: "policy",
    headline: "CLARITY Act Passes House 294-134  --  Digital Asset Market Structure Framework",
    summary: "The Digital Asset Market Clarity Act passes the House on July 17, 2025 with a 294-134 vote. It establishes CFTC authority over digital commodities and SEC authority over primary market crypto transactions. Banks can operate alternative trading systems for digital assets. The bill also carries its own subtitle: the Anti-CBDC Surveillance State Act. Editorial precision: the CLARITY Act passed the House the same day the GENIUS Act was signed into law, during Congress's designated Crypto Week. The Senate has stalled twice. Not yet law  --  but the direction is documented.",
    source: "Congress.gov H.R.3633; House Rules Committee July 16 2025; FinTech Weekly March 2026", url: "https://www.congress.gov/bill/119th-congress/house-bill/3633/text",
    tags: ["Digital Assets", "Policy", "CBDC"],
  },
  { id: "td1", year: 2025, month: "Dec", track: "infrastructure",
    headline: "OCC Conditionally Approves Five Digital Asset Trust Bank Charters",
    summary: "In December 2025, the OCC conditionally approves national trust bank charter applications from Fidelity Digital Assets, Paxos, Ripple National Trust Bank, BitGo, and First National Digital Currency Bank. The digital asset infrastructure is moving inside the regulated banking system. Under the GENIUS Act, these institutions can issue fully reserved dollar-backed stablecoins. The programmable money layer is acquiring a banking license.",
    source: "OCC Charter Approvals December 2025; CoinTelegraph; Unchained January 2026", url: "https://www.occ.gov/",
    tags: ["Stablecoin", "Infrastructure", "Banking"],
  },
  { id: "td2", year: 2025, month: "Dec", track: "infrastructure",
    headline: "JPM Coin Launches on Coinbase Base Network  --  Tokenized Bank Deposits Go On-Chain",
    summary: "JPMorgan launches JPM Coin (JPMD) on Coinbase's Base Layer 2 network for institutional clients in late 2025, positioning it as a direct bank deposit claim with on-chain programmability. Citigroup simultaneously builds Citi Token Services for 24/7 cross-border USD clearing. BNY launches a tokenized deposit service for institutions. A bank deposit  --  the foundation of the consumer financial system  --  is becoming programmable. Programmable means conditional.",
    source: "Wall Street Journal June 2026; Unchained June 5 2026", url: "https://unchainedcrypto.com/jpmorgan-citi-bofa-and-wells-fargo-plan-2027-tokenized-deposit-network-as-banks-move-to-counter-stablecoins/",
    tags: ["Tokenized Deposits", "Infrastructure", "Payment Rail"],
  },
  { id: "aug1", year: 2026, month: "May", track: "infrastructure",
    headline: "Augustus Bank Receives OCC Conditional Charter  --  First Bank Built for Machines, Not Humans",
    summary: "On May 8, 2026, the OCC grants conditional approval to Augustus Bank, N.A.  --  a Peter Thiel-backed German payments startup  --  to establish a full-service U.S. national bank. Augustus describes itself as the first clearing bank for the AI era: a bank built for machine agents, always-on, stablecoin-native, programmable clearing at the speed of compute. The CEO is 25 years old. The bank processes billions for institutional clients including Kraken. Aiming for Q3 2026 launch. This is the moment the payment infrastructure stops being built for people and starts being built for AI agents operating at machine speed.",
    source: "OCC Conditional Approval May 8 2026; PRNewswire May 11 2026; American Banker May 2026", url: "https://www.prnewswire.com/news-releases/augustus-receives-occ-conditional-approval-to-charter-the-first-clearing-bank-for-the-ai-era-302768111.html",
    tags: ["Augustus Bank", "Infrastructure", "Stablecoin", "AI"],
  },
  { id: "td3", year: 2026, month: "Jun", track: "infrastructure",
    headline: "JPMorgan, Citi, BofA, Wells Fargo Plan 2027 Tokenized Deposit Network Via The Clearing House",
    summary: "The Wall Street Journal reports that JPMorgan Chase, Citigroup, Bank of America, Wells Fargo, and other major U.S. commercial banks plan to launch a coordinated tokenized deposit network in the first half of 2027 via The Clearing House. The platform will enable tokenized deposits to move 24/7 on blockchain infrastructure, with programmable functionality. A separate consortium of regional banks  --  the Cari Network  --  is targeting a retail customer launch in Q4 2026. When bank deposits become programmable, the conditions under which your money can be accessed, spent, or transferred become subject to code. That is the mechanism.",
    source: "Wall Street Journal June 2026; Unchained June 5 2026; Bitcoin.com June 2026", url: "https://unchainedcrypto.com/jpmorgan-citi-bofa-and-wells-fargo-plan-2027-tokenized-deposit-network-as-banks-move-to-counter-stablecoins/",
    tags: ["Tokenized Deposits", "Infrastructure", "Payment Rail", "Banking"],
  },

  // ── CHINA SOCIAL CREDIT  --  REFERENCE TRACK ───────────────────────────────
  // ── mBRIDGE AND PROJECT AGORA ────────────────────────────────────────────
  { id: "mb1", year: 2021, month: null, track: "infrastructure",
    headline: "Project mBridge Launches  --  Multi-CBDC Cross-Border Settlement Without the Dollar",
    summary: "The BIS Innovation Hub, the People's Bank of China, the Hong Kong Monetary Authority, the Bank of Thailand, and the Central Bank of the UAE launch Project mBridge. The goal: enable central banks to settle cross-border transactions in their own digital currencies without touching correspondent banks or the dollar system. Settlement time: 15 seconds. The project is formally neutral infrastructure. With 95% of transactions using the digital yuan, the architecture is not neutral in practice.",
    source: "BIS Innovation Hub mBridge Documentation 2021", url: "https://www.bis.org/about/bisih/topics/cbdc/mcbdc_bridge.htm",
    tags: ["mBridge", "CBDC", "Infrastructure", "Dollar"],
  },
  { id: "mb2", year: 2024, month: "Jun", track: "infrastructure",
    headline: "Saudi Arabia Joins mBridge as Full Participant  --  The Petrodollar Story Made Concrete",
    summary: "Saudi Arabia's central bank joins mBridge as a full participant in June 2024  --  the same month the U.S.-Saudi petrodollar agreement expires with no renewal. The country that priced oil in dollars for 50 years and recycled petrodollar revenues into U.S. Treasuries is now a full participant in cross-border settlement infrastructure that operates entirely outside the dollar system. The two events in the same month are not coincidental. They are the same story.",
    source: "BIS Press Release June 5 2024; Reuters June 2024", url: "https://www.bis.org/press/p240605.htm",
    tags: ["mBridge", "CBDC", "Dollar", "Geopolitics", "Infrastructure"],
  },
  { id: "mb3", year: 2024, month: "Oct", track: "infrastructure",
    headline: "BIS Withdraws from mBridge  --  Sanctions Concerns, No Western Guardrails",
    summary: "The Bank for International Settlements formally exits mBridge on October 31, 2024, calling it a graduation. BIS General Manager Carstens states that BIS systems cannot be used by sanctioned countries. The real concern: Russia and Iran are BRICS members and potential mBridge participants. The BIS withdrawal means the project that has settled $55.5 billion in cross-border transactions now operates without Western institutional oversight. 95% of transactions use the digital yuan. The U.S. Federal Reserve has no seat at the table and no observer status.",
    source: "BIS Statement October 31 2024; CryptoSlate November 2024; Ledger Insights", url: "https://cryptoslate.com/bis-cuts-ties-with-controversial-cbdc-project-mbridge-citing-project-maturity/",
    tags: ["mBridge", "CBDC", "Dollar", "Geopolitics"],
  },
  { id: "ag1b", year: 2024, month: "Apr", track: "infrastructure",
    headline: "Project Agora Launches  --  Western Tokenized Cross-Border Settlement Response",
    summary: "The BIS Innovation Hub launches Project Agora in April 2024 with seven central banks: the Federal Reserve Bank of New York, Bank of England, Bank of Japan, Bank of Korea, Bank of France (representing the Eurosystem), Swiss National Bank, and Bank of Mexico. More than 40 private financial institutions join, including JPMorgan, HSBC, Deutsche Bank, Swift, Mastercard, and UBS. The project explores tokenizing central bank reserves and commercial bank deposits on a shared programmable ledger for cross-border settlement. This is the Western architecture being built to compete with mBridge.",
    source: "New York Fed Press Release April 3 2024; BIS Project Agora Documentation", url: "https://www.newyorkfed.org/newsevents/news/financial-services-and-infrastructure/2024/20240403",
    tags: ["Agora", "CBDC", "Infrastructure", "Dollar", "Payment Rail"],
  },
  { id: "ag2b", year: 2026, month: "May", track: "infrastructure",
    headline: "Project Agora Prototype Confirmed  --  Programmable Cross-Border Settlement Works",
    summary: "On May 27, 2026, the BIS releases Project Agora prototype findings confirming that tokenized central bank reserves combined with tokenized commercial bank deposits can achieve atomic, multi-currency settlement for cross-border payments around the clock. The prototype allows institutions to embed compliance requirements and conditional payment triggers directly into transactions using smart contracts. The editorial point: programmable money is not the future of Project Agora. It is the present design. Conditional payment triggers are the mechanism of programmable behavioral control embedded in the Western payment architecture being built right now.",
    source: "BIS Press Release May 27 2026; BIS Working Paper othp110; Ledger Insights May 2026", url: "https://www.bis.org/press/p260527.htm",
    tags: ["Agora", "CBDC", "Infrastructure", "Dollar", "Payment Rail"],
  },

  // ── CHINA PRIVATE SECTOR SOCIAL CREDIT ──────────────────────────────────
  { id: "cp1", year: 2015, month: "Jan", track: "china",
    headline: "Alibaba Launches Sesame Credit (Zhima Credit)  --  First Private Behavioral Scoring System",
    summary: "Ant Financial, Alibaba's financial arm, launches Sesame Credit on January 28, 2015  --  the first credit agency in China to use a score system for individuals drawing on online and offline behavioral data. Scores run 350 to 950 and track five categories: identity information, financial obligations, credit history, behavioral preferences including shopping patterns and money transfers, and social connections  --  5% of a score comes from the aggregate of a user's network. High scores unlock deposit waivers on bike shares, hotel rooms, car rentals, and expedited airport security. The editorial mirror: a private company scoring your behavior, your purchases, and your friends' scores to determine your access to services  --  this is exactly what U.S. data brokers and buy-now-pay-later platforms do without a visible score.",
    source: "Zhima Credit Wikipedia; Ant Financial launch documentation January 28 2015; CNBC March 2017", url: "https://en.wikipedia.org/wiki/Zhima_Credit",
    tags: ["China", "Private Sector", "Sesame Credit", "Behavioral Data"],
  },
  { id: "cp2", year: 2015, month: null, track: "china",
    headline: "PBOC Invites Eight Private Companies Into Pilot Credit Program  --  Alibaba, Tencent, and Six Others",
    summary: "China's central bank invites eight private companies including Ant Financial and Tencent into a pilot program to develop personal credit scoring systems. The stated goal: extend financial access to the hundreds of millions of Chinese citizens who have no credit cards or credit history. Big tech behavioral data is positioned as the alternative to traditional credit records. The parallel to the U.S.: Equifax, Experian, and TransUnion built their dominance by being the only holders of credit history. China's version added behavioral and transactional data from the beginning.",
    source: "AlgorithmWatch January 2021; TechCrunch January 2019", url: "https://algorithmwatch.org/en/chinas-social-credit-system-overdue/",
    tags: ["China", "Private Sector", "PBOC", "Credit"],
  },
  { id: "cp3", year: 2018, month: null, track: "china",
    headline: "PBOC Blocks Private Credit Licenses  --  Alibaba and Tencent Barred from National Program",
    summary: "In a move almost entirely absent from Western coverage, China's central bank denies Ant Financial, Tencent, and seven other private credit rating providers the licenses needed to operate as part of the national social credit program. The reason: concern that private companies were accumulating too much personal data and wielding too much scoring power. Beijing establishes Baihang Credit  --  the only approved market-based personal credit agency  --  in which the government holds a 36% stake and Ant and Tencent each hold 8%. The Rongcheng inversion applies again: China moved to separate private behavioral scoring from state punishment lists. The U.S. has no equivalent constraint on Equifax, Experian, or TransUnion.",
    source: "TechCrunch January 2019; AlgorithmWatch January 2021; Substack Mulugeta November 2025", url: "https://techcrunch.com/2019/01/14/wechat-credit-scoring/",
    tags: ["China", "Private Sector", "PBOC", "Credit", "Rongcheng"],
  },
  { id: "cp4", year: 2018, month: null, track: "china",
    headline: "Tencent WeChat Credit Scoring Suspended Within 24 Hours After Public Backlash",
    summary: "Tencent launches a social credit scoring feature inside the WeChat app in 2018 and suspends it within a single day following immediate and widespread public backlash. A revised version is rolled out in 2019. The episode is significant: Chinese public reaction to private behavioral scoring was sufficiently negative to force a major platform to reverse course within hours. Central authorities subsequently issued guidance that enforcement penalties must be grounded in formal legal channels. The U.S. equivalent  --  surveillance pricing, algorithmic credit scoring, behavioral data brokerage  --  has faced no equivalent public accountability mechanism.",
    source: "CounterPunch June 2025; TechCrunch January 2019; Coda Story 2026", url: "https://www.counterpunch.org/2025/06/09/alongside-chinas-which-social-credit-systems-are-developing/",
    tags: ["China", "Private Sector", "WeChat", "Tencent"],
  },
  { id: "cp5", year: 2019, month: null, track: "china",
    headline: "Baihang Credit Launches  --  Government-Majority Stake in Personal Credit Agency",
    summary: "Baihang Credit, the only centrally approved market-based personal credit agency in China, becomes operational. The government holds a 36% controlling stake. Ant Financial, Tencent, and six other private firms each hold 8%. Private behavioral data can flow into Baihang but is subordinated to government oversight. The explicit rationale: prevent any single private company from accumulating a data monopoly over personal credit scoring. The U.S. editorial inversion: Equifax, Experian, and TransUnion operate with no government stake, no oversight of scoring methodology, and no requirement to share access to their data models.",
    source: "TechCrunch January 2019; AlgorithmWatch 2021", url: "https://techcrunch.com/2019/01/14/wechat-credit-scoring/",
    tags: ["China", "Private Sector", "Credit", "Rongcheng"],
  },
  { id: "cp6", year: 2021, month: null, track: "china",
    headline: "Ant Financial Restructured Under Government Oversight  --  Sesame Credit Ring-Fenced",
    summary: "Following Jack Ma's public criticism of Chinese banking regulators in October 2020 and the canceled Ant Financial IPO, Beijing forces a restructuring of Ant Financial into a financial holding company subject to central bank oversight. Sesame Credit continues to operate inside the Ant ecosystem for consumer finance  --  deposit waivers, loan eligibility  --  but is formally separated from state punishment mechanisms. The private behavioral scoring system that inspired the most Western fear of Chinese social credit is, by 2021, legally ring-fenced from government blacklists. The surveillance systems that most directly affect Americans  --  credit bureaus, data brokers, ChexSystems  --  have no equivalent separation requirement.",
    source: "Substack Mulugeta November 2025; AlgorithmWatch 2021; Reuters Ant Financial restructuring 2021", url: "https://mayaye.substack.com/p/chinas-social-credit-system",
    tags: ["China", "Private Sector", "Sesame Credit", "Rongcheng"],
  },
  { id: "cp7", year: 2025, month: null, track: "china",
    headline: "Private Scores Remain  --  But Separated from State Punishment Lists",
    summary: "As of 2025, Sesame Credit and WeChat Pay behavioral scores continue to influence loan approvals and deposit waivers within Ant Group and Tencent's ecosystems respectively. They no longer feed directly into state punishment lists, with limited exceptions arranged case-by-case. The system described in most Western coverage  --  a single unified private-public behavioral score with automatic state consequences  --  does not exist. What exists instead: a sprawling, uneven, but increasingly functional behavior-modification machine that works through immediate material consequences rather than internalised shame. The American parallel operates the same way, invisibly, through credit scores, insurance algorithms, and surveillance pricing.",
    source: "Substack Mulugeta November 2025; ChoZan February 2026; RemotePeople May 2026", url: "https://mayaye.substack.com/p/chinas-social-credit-system",
    tags: ["China", "Private Sector", "Sesame Credit", "WeChat"],
  },

  // ── CHINA STATE SOCIAL CREDIT SYSTEM ─────────────────────────────────────
  { id: "cn1", year: 2014, month: null, track: "china",
    headline: "State Council Issues Social Credit System Planning Outline (2014-2020)",
    summary: "China's State Council releases the foundational document for building a national social credit system by 2020. The framing is economic: build trust in the marketplace, improve business integrity, reduce fraud. The system is envisioned as a unified credit information platform with rewards for trustworthy actors and punishments for those who violate laws. Key editorial fact: the document is primarily a market regulation framework, not a citizen surveillance tool. Western media coverage largely misrepresents this origin document.",
    source: "State Council Planning Outline for the Construction of a Social Credit System 2014-2020; Congress.gov CRS Report IF11342", url: "https://www.congress.gov/crs-product/IF11342",
    tags: ["China", "Policy"],
  },
  { id: "cn2", year: 2016, month: null, track: "china",
    headline: "Supreme People's Court Blacklist  --  Travel and Business Restrictions for Court Non-Compliance",
    summary: "China's Supreme People's Court begins publishing a blacklist of individuals and businesses who refuse to comply with court judgments. Those on the list face restrictions on purchasing airline tickets, high-speed rail tickets, and luxury goods. This is the mechanism most often cited in Western coverage. Editorial precision: as of 2025, most severe travel restrictions apply to serious or repeat offenders who refuse to pay court-ordered fines  --  not to ordinary behavioral infractions.",
    source: "Supreme People's Court Blacklist Documentation 2016; ChoZan China Social Credit 2025", url: "https://chozan.co/chinas-social-credit-system/",
    tags: ["China", "Access"],
  },
  { id: "cn3", year: 2017, month: null, track: "china",
    headline: "Rongcheng Pilot  --  142 Government Departments, Notebook-Carrying Gatherers, and the Inversion",
    summary: "Rongcheng becomes the most-cited example of a comprehensive individual scoring system involving 142 government departments and hundreds of positive and negative behavioral factors. It is also the system that was reformed after public backlash  --  shifting to voluntary participation, reward-oriented incentives, and notebook-carrying community information gatherers rather than AI surveillance. The Rongcheng inversion: the city Americans cite as the most dystopian example turned out to have more procedural safeguards than the U.S. credit bureau system, which requires no consent, is opaque, and cannot be meaningfully contested.",
    source: "Rongcheng Municipal Government Documentation; ChoZan 2025; RemotePeople.com 2026", url: "https://chozan.co/chinas-social-credit-system/",
    tags: ["China", "Rongcheng", "Credit"],
  },
  { id: "cn4", year: 2020, month: null, track: "china",
    headline: "Corporate Social Credit System Operational  --  103 Million Individuals, 22.74 Million Businesses",
    summary: "By 2020 the system covers 103 million individuals and 22.74 million corporate entities. The corporate side is significantly more developed than the individual side. Cross-ministry data sharing allows a company flagged for tax violations to be blocked in customs, labor, and environmental databases simultaneously. Editorial precision: no unified nationwide individual score exists. The system that functions at scale is the corporate system  --  closer to a regulatory compliance database than a Orwellian citizen score.",
    source: "NCISP Data 2020; Congress.gov CRS IF11342; ChoZan 2025", url: "https://www.congress.gov/crs-product/IF11342",
    tags: ["China", "Corporate", "Data Fusion"],
  },
  { id: "cn5", year: 2024, month: null, track: "china",
    headline: "NDRC 2024-2025 Action Plan  --  Unified Credit Legislation and Repair Mechanisms",
    summary: "The National Development and Reform Commission issues the 2024-2025 action plan foregrounding: building a Social Credit Construction Law, improving unified codes, strengthening platform infrastructure, creating a more unified credit repair mechanism. By early 2025 the National Credit Information Sharing Platform has collected over 80.7 billion records covering approximately 180 million businesses. The editorial distinction from the U.S. system: China is actively building a legal framework and dispute mechanism. The U.S. credit bureau system has no equivalent transparency or repair mandate.",
    source: "NDRC 2024-2025 Action Plan; ChoZan February 2026; China Law Translate", url: "https://www.chinalawtranslate.com/en/2024-2025social-credit-plan/",
    tags: ["China", "Policy", "Credit"],
  },
  { id: "cn6", year: 2025, month: "Mar", track: "china",
    headline: "23-Measure Party-State Guideline  --  Safeguards, Blockchain Traceability, Data Minimization",
    summary: "On March 31, 2025, the CCP Central Committee and State Council release a 23-measure guideline to improve the social credit system and promote high-quality development. The official framing emphasizes information security, individual rights, and limits on excessive data collection. It calls for 'making data available but not visible' and proposes blockchain for traceability. The Rongcheng inversion deepens: China is publicly committing to data minimization and dispute rights in its credit system while the U.S. CFPB  --  the only regulator requiring similar protections for American credit data  --  was effectively shuttered one month earlier in February 2025.",
    source: "State Council Guideline March 31 2025; Xinhua April 2025; Newsweek November 2025", url: "https://english.www.gov.cn/policies/latestreleases/202503/31/content_WS67ea9a7fc6d0868f4e8f1588.html",
    tags: ["China", "Policy", "Rongcheng"],
  },
  { id: "cn7", year: 2025, month: "Dec", track: "china",
    headline: "PBOC One-Time Credit Repair Policy  --  Overdue Records Under 10,000 Yuan Auto-Removed",
    summary: "The People's Bank of China announces a one-time credit repair policy on December 22, 2025: overdue records under 10,000 yuan from 2020 to 2025 are automatically removed if debts are cleared by March 31, 2026. No application required. The policy is framed as post-COVID economic recovery support. The inversion: China's central bank automatically removes small overdue records for any borrower who repays. In the United States, a $50 medical bill in collections remains on a credit report for seven years with no automatic removal mechanism, no income threshold, and no recourse without a formal dispute process that succeeds only 20% of the time.",
    source: "PBOC Credit Repair Announcement December 22 2025; MEXC News", url: "https://www.mexc.com/news/321524",
    tags: ["China", "Credit", "Rongcheng"],
  },
  { id: "cn8", year: 2026, month: "Apr", track: "china",
    headline: "Credit Repair Management Measures Take Effect  --  Formal Dispute and Delisting Procedures",
    summary: "NDRC's Administrative Measures for Credit Repair become effective April 1, 2026. The regulations establish clear classification rules, publication period limits, and a formal workflow for credit repair applications and objections via the Credit China platform. Companies and individuals can apply to have negative records removed with defined timelines and criteria. The Rongcheng inversion, formally documented: China now has a codified, legally-binding credit dispute and repair mechanism. The U.S. credit bureau dispute process has a 20% success rate, no statutory removal timeline for accurate negative information, and no legal requirement for bureaus to explain scoring methodology.",
    source: "NDRC Administrative Measures for Credit Repair November 2025 effective April 1 2026; CMS LawNow December 2025", url: "https://cms-lawnow.com/en/ealerts/2025/12/corporate-reputation-in-china-regulatory-update-of-the-credit-repair-mechanism-under-china-s-corporate-social-credit-system",
    tags: ["China", "Credit", "Policy", "Rongcheng"],
  },

  // ── PROJECTED ─────────────────────────────────────────────────────────────
  { id: "p1", year: 2026, month: "Oct", track: "policy", projected: true,
    headline: "SNAP Cuts Take Effect  --  Digital-Only Benefits at Reduced Amounts",
    summary: "October 1, 2026: SNAP benefit reductions begin under the OBBBA. Combined with the digital-only disbursement mandate, the payment rail now controls both access and amount for 42 million Americans. States must cover 75% of administrative costs  --  some may limit eligibility or exit.",
    source: "CBO Implementation Timeline; USDA", url: "https://www.usda.gov/",
    tags: ["Benefits", "Policy"],
  },
  { id: "p2", year: 2027, month: null, track: "infrastructure", projected: true,
    headline: "GENIUS Act Fully Effective  --  Stablecoin Infrastructure Operational",
    summary: "18 months after July 18 2025 signing, or 120 days after final regulations, whichever is earlier. Payment stablecoins with programmable spending restrictions become legal infrastructure. Retailers and government agencies can issue stablecoins with conditions attached. The mechanism for programmable money is fully legal and operational.",
    source: "GENIUS Act, Section 3  --  Effective Date", url: "https://www.congress.gov/bill/119th-congress/senate-bill/394/text",
    tags: ["Stablecoin", "Infrastructure"],
  },
];

const TAGS = [...new Set(EVENTS.flatMap(e => e.tags))].sort();

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function SocialCreditTracker() {
  const [activeTrack, setActiveTrack] = useState("all");
  const [activeTag, setActiveTag] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [showProjected, setShowProjected] = useState(true);

  const filtered = EVENTS.filter(e => {
    if (activeTrack !== "all" && e.track !== activeTrack) return false;
    if (activeTag !== "all" && !e.tags.includes(activeTag)) return false;
    if (!showProjected && e.projected) return false;
    return true;
  }).sort((a, b) => a.year !== b.year ? b.year - a.year : 0);

  const trackMap = Object.fromEntries(TRACKS.map(t => [t.id, t]));

  return (
    <div style={{ background: "#fafaf8", minHeight: "100vh", fontFamily: "Georgia, 'Times New Roman', serif", color: "#1a1a1a" }}>

      {/* ── HEADER ── */}
      <div style={{ background: "#0f0f0e", padding: "36px 32px 28px", borderBottom: "3px solid #dc2626" }}>
        <div style={{ maxWidth: "840px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#6b7280", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: "10px" }}>
            Aware Trade  --  Investigative Intelligence
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#f5f5f0", margin: "0 0 12px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            The Social Credit System<br />
            <span style={{ color: "#dc2626" }}>They Did Not Call It That</span>
          </h1>
          <p style={{ fontSize: "15px", color: "#9ca3af", lineHeight: 1.7, margin: "0 0 20px", maxWidth: "600px", fontFamily: "sans-serif" }}>
            {INTRO}
          </p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {TRACKS.map(t => (
              <div key={t.id} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: t.color, display: "inline-block", flexShrink: 0 }} />
                <span style={{ fontSize: "12px", color: "#9ca3af", fontFamily: "sans-serif" }}>{t.label}</span>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#6b7280", border: "2px dashed #6b7280", boxSizing: "border-box", display: "inline-block" }} />
              <span style={{ fontSize: "12px", color: "#9ca3af", fontFamily: "sans-serif" }}>Projected</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── FILTERS ── */}
      <div style={{ background: "#f0f0ec", borderBottom: "1px solid #e0e0d8", padding: "14px 32px", display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: "11px", color: "#6b7280", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", marginRight: "4px" }}>Track</span>
        {[{ id: "all", label: "All", color: "#374151" }, ...TRACKS].map(t => (
          <button key={t.id} onClick={() => setActiveTrack(t.id)} style={{
            background: activeTrack === t.id ? "#1a1a1a" : "transparent",
            border: `1px solid ${activeTrack === t.id ? "#1a1a1a" : "#c8c8c0"}`,
            color: activeTrack === t.id ? "#f5f5f0" : "#4b5563",
            fontSize: "12px", padding: "4px 12px", borderRadius: "3px",
            cursor: "pointer", fontFamily: "sans-serif",
          }}>{t.label || "All"}</button>
        ))}
        <span style={{ fontSize: "11px", color: "#6b7280", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", marginLeft: "12px", marginRight: "4px" }}>Tag</span>
        <select value={activeTag} onChange={e => setActiveTag(e.target.value)} style={{
          background: "transparent", border: "1px solid #c8c8c0", color: "#374151",
          fontSize: "12px", padding: "4px 8px", borderRadius: "3px", fontFamily: "sans-serif", cursor: "pointer",
        }}>
          <option value="all">All tags</option>
          {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <button onClick={() => setShowProjected(p => !p)} style={{
          marginLeft: "auto", background: showProjected ? "#fef3c7" : "transparent",
          border: `1px solid ${showProjected ? "#fcd34d" : "#c8c8c0"}`,
          color: showProjected ? "#92400e" : "#6b7280",
          fontSize: "12px", padding: "4px 12px", borderRadius: "3px",
          cursor: "pointer", fontFamily: "sans-serif",
        }}>
          {showProjected ? "Hide projected" : "Show projected"}
        </button>
      </div>

      {/* ── COUNT ── */}
      <div style={{ padding: "10px 32px", background: "#fafaf8", borderBottom: "1px solid #e8e8e0" }}>
        <span style={{ fontSize: "12px", color: "#9ca3af", fontFamily: "sans-serif" }}>
          {filtered.length} {filtered.length === 1 ? "entry" : "entries"}  --  sorted most recent first
        </span>
      </div>

      {/* ── TIMELINE ── */}
      <div style={{ maxWidth: "840px", margin: "0 auto", padding: "28px 32px 60px" }}>
        {(() => {
          const yearGroups = {};
          filtered.forEach(e => {
            if (!yearGroups[e.year]) yearGroups[e.year] = [];
            yearGroups[e.year].push(e);
          });

          return Object.keys(yearGroups).sort((a,b) => Number(b) - Number(a)).map(year => { const events = yearGroups[year]; return (
            <div key={year} style={{ marginBottom: "32px" }}>
              {/* Year label */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                <div style={{ fontSize: "22px", fontWeight: "700", color: "#1a1a1a", letterSpacing: "-0.02em" }}>{year}</div>
                <div style={{ flex: 1, height: "1px", background: "#e0e0d8" }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {events.map((event, idx) => {
                  const track = trackMap[event.track];
                  const isExpanded = expandedId === event.id;
                  const isProjected = event.projected;

                  return (
                    <div key={event.id} style={{ display: "flex", gap: "0", alignItems: "stretch" }}>
                      {/* Spine */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "18px", flexShrink: 0, width: "20px" }}>
                        <div style={{
                          width: "12px", height: "12px", borderRadius: "50%", marginTop: "18px",
                          background: isProjected ? "transparent" : track.color,
                          border: isProjected ? `2px dashed ${track.color}` : "none",
                          flexShrink: 0, zIndex: 1,
                        }} />
                        {idx < events.length - 1 && (
                          <div style={{ width: "1px", flex: 1, background: "#e0e0d8", minHeight: "12px" }} />
                        )}
                      </div>

                      {/* Card */}
                      <div style={{ flex: 1, marginBottom: "10px" }}>
                        <div
                          onClick={() => setExpandedId(isExpanded ? null : event.id)}
                          style={{
                            background: isExpanded ? "#ffffff" : "#f4f4f0",
                            border: `1px solid ${isExpanded ? track.color : "#e0e0d8"}`,
                            borderLeft: `3px solid ${isProjected ? "transparent" : track.color}`,
                            borderLeftStyle: isProjected ? "dashed" : "solid",
                            borderRadius: "0 4px 4px 0",
                            padding: "14px 16px",
                            cursor: "pointer",
                            transition: "background 0.1s",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                            <div style={{ flex: 1 }}>
                              {/* Meta row */}
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                                {event.month && (
                                  <span style={{ fontSize: "11px", color: "#6b7280", fontFamily: "sans-serif" }}>{event.month} {year}</span>
                                )}
                                <span style={{
                                  fontSize: "10px", padding: "1px 7px", borderRadius: "2px",
                                  background: track.color + "18",
                                  color: track.color,
                                  fontFamily: "sans-serif", fontWeight: "600", letterSpacing: "0.06em",
                                }}>
                                  {track.label}
                                </span>
                                {isProjected && (
                                  <span style={{ fontSize: "10px", color: "#6b7280", fontFamily: "sans-serif", fontStyle: "italic" }}>Projected</span>
                                )}
                                {event.tags.map(tag => (
                                  <span key={tag} style={{
                                    fontSize: "10px", padding: "1px 6px", borderRadius: "2px",
                                    background: "#f0f0ec", color: "#6b7280",
                                    fontFamily: "sans-serif", border: "1px solid #e0e0d8",
                                  }}>{tag}</span>
                                ))}
                              </div>
                              {/* Headline */}
                              <div style={{ fontSize: "15px", fontWeight: "700", color: "#1a1a1a", lineHeight: 1.3, marginBottom: isExpanded ? "0" : "0" }}>
                                {event.headline}
                              </div>
                            </div>
                            <div style={{ fontSize: "16px", color: "#9ca3af", flexShrink: 0, marginTop: "14px", transform: isExpanded ? "rotate(180deg)" : "none" }}>▾</div>
                          </div>

                          {/* Expanded */}
                          {isExpanded && (
                            <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #e8e8e0" }}>
                              <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.8, margin: "0 0 12px", fontFamily: "sans-serif" }}>
                                {event.summary}
                              </p>
                              {event.source && (
                                <div style={{ fontSize: "11px", color: "#9ca3af", fontFamily: "sans-serif" }}>
                                  Source:{" "}
                                  {event.url ? (
                                    <a href={event.url} target="_blank" rel="noopener noreferrer" style={{ color: track.color, textDecoration: "none" }}>
                                      {event.source}
                                    </a>
                                  ) : (
                                    <span>{event.source}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )});
        })()}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af", fontFamily: "sans-serif", fontSize: "15px" }}>
            No entries match the current filters.
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <div style={{ background: "#0f0f0e", padding: "20px 32px", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ fontSize: "11px", color: "#4b5563", fontFamily: "sans-serif", lineHeight: 1.8 }}>
          Aware Trade  --  awaretrade.com · Sources: White House, Federal Reserve, FinCEN, CFPB, CBO, USDA, FCC, Congressional Record · Last updated June 2026
          <br />
          <span style={{ color: "#374151" }}>Projected entries are labeled. Disputed entries are noted. All documented entries are sourced to named public records.</span>
        </div>
      </div>
    </div>
  );
}
