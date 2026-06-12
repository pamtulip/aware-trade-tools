import { useState } from "react";

import monitorData from "../data.js";

const data = monitorData;


const signalColors = {
  red:    { bg: "#fff5f5", border: "#fca5a5", text: "#dc2626", dot: "#ef4444" },
  yellow: { bg: "#fffbeb", border: "#fcd34d", text: "#92400e", dot: "#f59e0b" },
  green:  { bg: "#f0fdf4", border: "#86efac", text: "#15803d", dot: "#22c55e" },
  gray:   { bg: "#f9fafb", border: "#d1d5db", text: "#4b5563", dot: "#9ca3af" },
};
const convictionColors = { High: "#dc2626", Medium: "#92400e", Low: "#4b5563" };
const thesisColors     = { red: "#dc2626", yellow: "#92400e", green: "#15803d" };
const TABS = ["inflation", "labor", "money", "consumer", "markets", "debt", "dollar", "ideas", "thesis"];
const TAB_LABELS = { inflation: "Inflation", labor: "Labor", money: "Money & Policy", consumer: "Consumer", markets: "Markets", debt: "Debt & Credit", dollar: "Dollar & Global", ideas: "Investment Ideas", thesis: "Big Picture" };
export default function MacroMonitor() {
  const [activeTab, setActiveTab] = useState("inflation");
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
      {activeTab === "inflation" && (
        <div style={{ padding: "20px 28px" }}>
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: 0, marginBottom: "16px", fontFamily: "sans-serif", lineHeight: 1.5 }}>
            What prices are doing and why. Energy is the driver. The Fed cannot fix this.
          </p>

          {/* Stagflation risk card */}
          <div style={{ background: "#fff5f5", border: "2px solid #dc2626", borderRadius: "6px", padding: "16px 20px", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#ffffff", background: "#dc2626", padding: "2px 10px", borderRadius: "3px", fontFamily: "sans-serif", letterSpacing: "0.08em" }}>STAGFLATION</span>
              <span style={{ fontSize: "12px", color: "#dc2626", fontFamily: "sans-serif", fontWeight: "600" }}>Current condition — confirmed</span>
            </div>
            <div style={{ fontSize: "14px", color: "#1f2937", lineHeight: 1.7, fontFamily: "sans-serif" }}>
              Stagflation is the simultaneous condition of persistent inflation and stagnating growth. The U.S. is in it. CPI at 4.2% prevents the Fed from cutting. Jobless claims at 242,000 and tech layoffs at 1,136/day prevent the Fed from hiking. The committee is 8-4 -- the most divided in decades. There is no exit that does not hurt.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "12px" }}>
              {[
                { label: "Inflation", value: "4.2% CPI", status: "Too high to cut" },
                { label: "Growth", value: "Slowing", status: "Too fragile to hike" },
                { label: "Fed", value: "On hold", status: "Trapped" },
              ].map((item, i) => (
                <div key={i} style={{ background: "#ffffff", border: "1px solid #fca5a5", borderRadius: "4px", padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#9ca3af", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>{item.label}</div>
                  <div style={{ fontSize: "15px", fontWeight: "700", color: "#dc2626", fontFamily: "sans-serif", marginBottom: "2px" }}>{item.value}</div>
                  <div style={{ fontSize: "11px", color: "#6b7280", fontFamily: "sans-serif" }}>{item.status}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Energy callout */}
          <div style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "14px 18px", marginBottom: "20px" }}>
            <div style={{ fontSize: "12px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px", fontFamily: "sans-serif" }}>Energy Is Doing the Work</div>
            <div style={{ fontSize: "14px", color: "#1f2937", lineHeight: 1.7, fontFamily: "sans-serif" }}>Energy CPI up 23.5% year over year. Gasoline at $4.12 nationally. Every other price is affected -- diesel moves freight, fertilizer feeds crops, heating bills arrive in Q4.</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px", marginBottom: "24px" }}>
            {data.indicators.filter(d => d.category === "inflation").map((item) => {
              const c = signalColors[item.signal];
              const isOpen = expandedBehind === item.id;
              return (
                <div key={item.id} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: "6px", overflow: "hidden" }}>
                  <div style={{ padding: "16px 18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <div style={{ fontSize: "12px", color: "#4b5563", fontFamily: "sans-serif", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                      <span style={{ fontSize: "10px", color: c.text, fontFamily: "sans-serif", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: c.dot, display: "inline-block" }} />
                        {item.signalLabel}
                      </span>
                    </div>
                    <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827", lineHeight: 1, marginBottom: "4px" }}>{item.value}</div>
                    <div style={{ fontSize: "13px", color: "#6b7280", fontFamily: "sans-serif", marginBottom: "8px" }}>{item.sub}</div>
                    <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: "8px", fontSize: "13px", color: "#4b5563", fontFamily: "sans-serif", lineHeight: 1.5 }}>{item.note}</div>
                  </div>
                  {item.behind && item.behind.length > 0 && (
                    <>
                      <button onClick={() => setExpandedBehind(isOpen ? null : item.id)} style={{ width: "100%", background: "none", border: "none", borderTop: `1px solid ${c.border}`, padding: "8px 18px", fontSize: "12px", color: c.text, fontWeight: "600", cursor: "pointer", fontFamily: "sans-serif", display: "flex", justifyContent: "space-between" }}>
                        <span>Behind the numbers</span>
                        <span style={{ transform: isOpen ? "rotate(180deg)" : "none" }}>▾</span>
                      </button>
                      {isOpen && (
                        <div style={{ borderTop: `1px solid ${c.border}`, padding: "12px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                          {item.behind.map((b, i) => (
                            <div key={i}>
                              <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "2px" }}>
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
          <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "18px 22px" }}>
            <div style={{ fontSize: "12px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", fontFamily: "sans-serif" }}>The Stagflation Trap</div>
            <div style={{ fontSize: "15px", color: "#1f2937", lineHeight: 1.8 }}>CPI at 4.2% is a three-year high driven by energy from the Iran conflict. PPI at -0.2% means producer costs are cooling -- but consumers pay energy prices directly. Core inflation at 2.9% shows the problem is spreading beyond energy. The Fed cannot.</div>
          </div>

          {/* Recession risk card */}
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: "6px", padding: "16px 20px", marginTop: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#92400e", background: "#fef3c7", padding: "2px 10px", borderRadius: "3px", fontFamily: "sans-serif", letterSpacing: "0.08em", border: "1px solid #fcd34d" }}>RECESSION RISK</span>
              <span style={{ fontSize: "12px", color: "#92400e", fontFamily: "sans-serif", fontWeight: "600" }}>Q4 2026 scenario — not yet base case</span>
            </div>
            <div style={{ fontSize: "14px", color: "#1f2937", lineHeight: 1.7, fontFamily: "sans-serif", marginBottom: "12px" }}>
              Stagflation becomes recession when consumer spending collapses under the combined weight of negative real wages, SNAP cuts, and exhausted credit. The October 1 SNAP cuts are the trigger date to watch. If retail sales in November and December confirm a spending cliff, the recession signal becomes actionable.
            </div>
            <div style={{ fontSize: "12px", color: "#92400e", fontFamily: "sans-serif", fontWeight: "600", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>The sequence to watch</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {[
                { date: "Oct 1", event: "SNAP cuts take effect", risk: "Lower-K spending cliff begins" },
                { date: "Nov 12", event: "October CPI", risk: "Does inflation stay elevated through the shock?" },
                { date: "Jan 2027", event: "Q4 earnings -- Dollar General, Dollar Tree, Darden", risk: "First earnings confirmation of Stage 3 contagion" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "8px 10px", background: "#ffffff", borderRadius: "4px", border: "1px solid #fde68a" }}>
                  <span style={{ fontSize: "11px", fontWeight: "700", color: "#92400e", fontFamily: "sans-serif", whiteSpace: "nowrap", minWidth: "50px" }}>{item.date}</span>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "#111827", fontFamily: "sans-serif" }}>{item.event}</div>
                    <div style={{ fontSize: "12px", color: "#6b7280", fontFamily: "sans-serif" }}>{item.risk}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}  )}

      {activeTab === "labor" && (
        <div style={{ padding: "20px 28px" }}>
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: 0, marginBottom: "16px", fontFamily: "sans-serif", lineHeight: 1.5 }}>
            Who has jobs, who is losing them, and what those jobs pay.
          </p>

          {/* Overall labor summary */}
          <div style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "16px 20px", marginBottom: "16px" }}>
            <div style={{ fontSize: "12px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", fontFamily: "sans-serif" }}>The Labor Market in One Paragraph</div>
            <div style={{ fontSize: "14px", color: "#1f2937", lineHeight: 1.8, fontFamily: "sans-serif" }}>
              The headline numbers look fine. 172,000 jobs added in May, unemployment at 4.3%. Underneath, the composition is deteriorating. Healthcare added 52,000 jobs and leisure and hospitality added 39,000 -- lower-wage, lower-multiplier sectors. Manufacturing is flat. Financial services employment is down 107,000 from peak. Tech is cutting 1,136 workers per day. Small business hiring is at a five-year low. Jobless claims hit 242,000 -- the highest since August 2023. Real wages are negative at -0.8% after inflation. The labor market is not collapsing. It is hollowing: good headline numbers hiding a deteriorating composition.
            </div>
          </div>

          {/* Composition breakdown */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
            <div style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: "4px", padding: "12px 14px" }}>
              <div style={{ fontSize: "11px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", fontFamily: "sans-serif" }}>Sectors Adding Jobs</div>
              {[
                { sector: "Healthcare", jobs: "+52,000", note: "Non-cyclical. Demand driven by aging population and lower-K health stress." },
                { sector: "Leisure & Hospitality", jobs: "+39,000", note: "Upper-K still dining and traveling. First to lose volume when upper-K tightens." },
                { sector: "Government", jobs: "+21,000", note: "Federal employment rising despite DOGE mandate. State and local driving growth." },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: "8px", paddingBottom: "8px", borderBottom: i < 2 ? "1px solid #fecaca" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#111827", fontFamily: "sans-serif" }}>{item.sector}</span>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: "#15803d", fontFamily: "sans-serif" }}>{item.jobs}</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#6b7280", fontFamily: "sans-serif", lineHeight: 1.4 }}>{item.note}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: "4px", padding: "12px 14px" }}>
              <div style={{ fontSize: "11px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", fontFamily: "sans-serif" }}>Sectors Cutting or Flat</div>
              {[
                { sector: "Technology", jobs: "-184K YTD", note: "1,136 layoffs/day. 48% attributed to AI. Upper-K spending class being trimmed." },
                { sector: "Financial Services", jobs: "-107K from peak", note: "Down from 2024 peak. Mortgage, investment banking, fintech all contracting." },
                { sector: "Manufacturing", jobs: "Flat", note: "No growth. Tariff uncertainty freezing capital investment decisions." },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: "8px", paddingBottom: "8px", borderBottom: i < 2 ? "1px solid #fecaca" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#111827", fontFamily: "sans-serif" }}>{item.sector}</span>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: "#dc2626", fontFamily: "sans-serif" }}>{item.jobs}</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#6b7280", fontFamily: "sans-serif", lineHeight: 1.4 }}>{item.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech callout */}
          <div style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "14px 18px", marginBottom: "20px" }}>
            <div style={{ fontSize: "12px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px", fontFamily: "sans-serif" }}>Tech Layoffs Are an Upper-K Story</div>
            <div style={{ fontSize: "14px", color: "#1f2937", lineHeight: 1.7, fontFamily: "sans-serif" }}>184,000 tech workers have lost jobs in 2026. Nearly half attributed to AI displacement. Software developer employment under 26 is down 20% since 2024. These are not lower-K jobs. This is the spending class being trimmed.</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px", marginBottom: "24px" }}>
            {data.indicators.filter(d => d.category === "labor").map((item) => {
              const c = signalColors[item.signal];
              const isOpen = expandedBehind === item.id;
              return (
                <div key={item.id} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: "6px", overflow: "hidden" }}>
                  <div style={{ padding: "16px 18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <div style={{ fontSize: "12px", color: "#4b5563", fontFamily: "sans-serif", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                      <span style={{ fontSize: "10px", color: c.text, fontFamily: "sans-serif", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: c.dot, display: "inline-block" }} />
                        {item.signalLabel}
                      </span>
                    </div>
                    <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827", lineHeight: 1, marginBottom: "4px" }}>{item.value}</div>
                    <div style={{ fontSize: "13px", color: "#6b7280", fontFamily: "sans-serif", marginBottom: "8px" }}>{item.sub}</div>
                    <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: "8px", fontSize: "13px", color: "#4b5563", fontFamily: "sans-serif", lineHeight: 1.5 }}>{item.note}</div>
                  </div>
                  {item.behind && item.behind.length > 0 && (
                    <>
                      <button onClick={() => setExpandedBehind(isOpen ? null : item.id)} style={{ width: "100%", background: "none", border: "none", borderTop: `1px solid ${c.border}`, padding: "8px 18px", fontSize: "12px", color: c.text, fontWeight: "600", cursor: "pointer", fontFamily: "sans-serif", display: "flex", justifyContent: "space-between" }}>
                        <span>Behind the numbers</span>
                        <span style={{ transform: isOpen ? "rotate(180deg)" : "none" }}>▾</span>
                      </button>
                      {isOpen && (
                        <div style={{ borderTop: `1px solid ${c.border}`, padding: "12px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                          {item.behind.map((b, i) => (
                            <div key={i}>
                              <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "2px" }}>
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
          <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "18px 22px" }}>
            <div style={{ fontSize: "12px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", fontFamily: "sans-serif" }}>Hollowing, Not Collapsing</div>
            <div style={{ fontSize: "15px", color: "#1f2937", lineHeight: 1.8 }}>Headline unemployment at 4.3% looks manageable. The composition does not. Tech layoffs running at 1,136 per day with 48% attributed to AI are upper-K job losses -- the cohort whose spending props up the consumer thesis. Jobless claims at 242,000 are.</div>
          </div>
        </div>
      )}

      {activeTab === "money" && (
        <div style={{ padding: "20px 28px" }}>
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: 0, marginBottom: "16px", fontFamily: "sans-serif", lineHeight: 1.5 }}>
            The Fed, interest rates, and the financial infrastructure decisions that shape access to money.
          </p>

          {/* Summary card */}
          <div style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "16px 20px", marginBottom: "16px" }}>
            <div style={{ fontSize: "12px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", fontFamily: "sans-serif" }}>Money & Policy in One Paragraph</div>
            <div style={{ fontSize: "14px", color: "#1f2937", lineHeight: 1.8, fontFamily: "sans-serif" }}>
              The Fed is on hold at 3.50-3.75% with no cut expected until September at the earliest. It cannot cut because CPI is 4.2%. It cannot hike because the labor market is fragile and $39 trillion in debt means higher rates would make interest payments unmanageable. The April committee vote was 8-4 -- the most divided in decades. Meanwhile the bond market is imposing its own discipline: Treasury auction demand is weakening, foreign holders are diversifying away from U.S. debt, and the term premium is rising. The Fed controls the short end of the yield curve. The market controls the long end. Right now both are working against the consumer.
            </div>
          </div>

          {/* Three-box status */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "20px" }}>
            {[
              { label: "Fed Funds Rate", value: "3.50-3.75%", status: "On hold", signal: "yellow" },
              { label: "10-Year Yield", value: "~4.5%", status: "Rising with fiscal risk", signal: "red" },
              { label: "Auction Demand", value: "Weakening", status: "Bond vigilantes active", signal: "red" },
            ].map((item, i) => {
              const colors = { red: { bg: "#fff5f5", border: "#fca5a5", text: "#dc2626" }, yellow: { bg: "#fffbeb", border: "#fcd34d", text: "#92400e" } };
              const c = colors[item.signal];
              return (
                <div key={i} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: "4px", padding: "12px 14px", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#6b7280", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>{item.label}</div>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: "#111827", fontFamily: "sans-serif", marginBottom: "2px" }}>{item.value}</div>
                  <div style={{ fontSize: "11px", color: c.text, fontFamily: "sans-serif", fontWeight: "600" }}>{item.status}</div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px", marginBottom: "24px" }}>
            {data.indicators.filter(d => d.category === "monetary" || d.category === "money" || d.category === "policy").map((item) => {
              const c = signalColors[item.signal];
              const isOpen = expandedBehind === item.id;
              return (
                <div key={item.id} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: "6px", overflow: "hidden" }}>
                  <div style={{ padding: "16px 18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <div style={{ fontSize: "12px", color: "#4b5563", fontFamily: "sans-serif", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                      <span style={{ fontSize: "10px", color: c.text, fontFamily: "sans-serif", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: c.dot, display: "inline-block" }} />
                        {item.signalLabel}
                      </span>
                    </div>
                    <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827", lineHeight: 1, marginBottom: "4px" }}>{item.value}</div>
                    <div style={{ fontSize: "13px", color: "#6b7280", fontFamily: "sans-serif", marginBottom: "8px" }}>{item.sub}</div>
                    <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: "8px", fontSize: "13px", color: "#4b5563", fontFamily: "sans-serif", lineHeight: 1.5 }}>{item.note}</div>
                  </div>
                  {item.behind && item.behind.length > 0 && (
                    <>
                      <button onClick={() => setExpandedBehind(isOpen ? null : item.id)} style={{ width: "100%", background: "none", border: "none", borderTop: `1px solid ${c.border}`, padding: "8px 18px", fontSize: "12px", color: c.text, fontWeight: "600", cursor: "pointer", fontFamily: "sans-serif", display: "flex", justifyContent: "space-between" }}>
                        <span>Behind the numbers</span>
                        <span style={{ transform: isOpen ? "rotate(180deg)" : "none" }}>▾</span>
                      </button>
                      {isOpen && (
                        <div style={{ borderTop: `1px solid ${c.border}`, padding: "12px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                          {item.behind.map((b, i) => (
                            <div key={i}>
                              <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "2px" }}>
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
          <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "18px 22px" }}>
            <div style={{ fontSize: "12px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", fontFamily: "sans-serif" }}>The Fed's Impossible Position</div>
            <div style={{ fontSize: "15px", color: "#1f2937", lineHeight: 1.8 }}>The Fed is on hold at 3.50-3.75%. It cannot cut because CPI is 4.2%. It cannot hike because labor is fragile and the debt service burden would become untenable. The April vote was 8-4, the most divided committee in decades. The Warsh cut thesis: if.</div>
          </div>

          {/* Bond vigilante card */}
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderLeft: "4px solid #f59e0b", borderRadius: "0 6px 6px 0", padding: "16px 20px", marginTop: "16px" }}>
            <div style={{ fontSize: "12px", color: "#92400e", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", fontFamily: "sans-serif" }}>Nobody Is Buying Our Treasuries</div>
            <div style={{ fontSize: "14px", color: "#1f2937", lineHeight: 1.8, fontFamily: "sans-serif", marginBottom: "12px" }}>
              The Fed controls the short end of the yield curve. The bond market controls the long end. When bid-to-cover ratios weaken on 10 and 30-year auctions, primary dealers are forced to absorb what the market refused. That pushes long yields up regardless of what the Fed decides. Mortgage rates follow. The entire rate-sensitive economy tightens without a single Fed vote.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "12px" }}>
              {[
                { label: "Japan", value: "$1.24T", trend: "Stable" },
                { label: "UK", value: "$897B", trend: "Stable" },
                { label: "China", value: "$693B", trend: "Declining since 2022" },
              ].map((item, i) => (
                <div key={i} style={{ background: "#ffffff", border: "1px solid #fde68a", borderRadius: "4px", padding: "8px 10px", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#92400e", fontFamily: "sans-serif", marginBottom: "2px" }}>{item.label}</div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#111827", fontFamily: "sans-serif", marginBottom: "2px" }}>{item.value}</div>
                  <div style={{ fontSize: "10px", color: "#6b7280", fontFamily: "sans-serif" }}>{item.trend}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: "13px", color: "#92400e", fontFamily: "sans-serif", lineHeight: 1.6, background: "#fef3c7", padding: "10px 12px", borderRadius: "4px" }}>
              <strong>The Warsh cut ceiling:</strong> Even if the Fed cuts short-term rates, the long end of the curve may keep rising if fiscal credibility erodes. The Japan scenario -- Fed cutting while 30-year yields rise simultaneously -- is not hypothetical. It is the logical endpoint of $39 trillion in debt with no consolidation plan.
            </div>
          </div>

        </div>
      )}

      {activeTab === "dollar" && (
        <div style={{ padding: "20px 28px" }}>
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: 0, marginBottom: "16px", fontFamily: "sans-serif", lineHeight: 1.5 }}>
            Reserve currency status, petrodollar mechanics, and the infrastructure being built to replace the dollar system.
          </p>
          <div style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "14px 18px", marginBottom: "20px" }}>
            <div style={{ fontSize: "12px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px", fontFamily: "sans-serif" }}>The Pozsar Frame</div>
            <div style={{ fontSize: "14px", color: "#1f2937", lineHeight: 1.7, fontFamily: "sans-serif" }}>Cheap commodities from Russia and China underwrote Western inflation stability for 30 years. That bargain fractured in 2022 when the West weaponized dollar reserves. Commodity nations are building the exit infrastructure now.</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px", marginBottom: "24px" }}>
            {data.indicators.filter(d => d.category === "dollar").map((item) => {
              const c = signalColors[item.signal];
              const isOpen = expandedBehind === item.id;
              return (
                <div key={item.id} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: "6px", overflow: "hidden" }}>
                  <div style={{ padding: "16px 18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <div style={{ fontSize: "12px", color: "#4b5563", fontFamily: "sans-serif", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                      <span style={{ fontSize: "10px", color: c.text, fontFamily: "sans-serif", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: c.dot, display: "inline-block" }} />
                        {item.signalLabel}
                      </span>
                    </div>
                    <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827", lineHeight: 1, marginBottom: "4px" }}>{item.value}</div>
                    <div style={{ fontSize: "13px", color: "#6b7280", fontFamily: "sans-serif", marginBottom: "8px" }}>{item.sub}</div>
                    <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: "8px", fontSize: "13px", color: "#4b5563", fontFamily: "sans-serif", lineHeight: 1.5 }}>{item.note}</div>
                  </div>
                  {item.behind && item.behind.length > 0 && (
                    <>
                      <button onClick={() => setExpandedBehind(isOpen ? null : item.id)} style={{ width: "100%", background: "none", border: "none", borderTop: `1px solid ${c.border}`, padding: "8px 18px", fontSize: "12px", color: c.text, fontWeight: "600", cursor: "pointer", fontFamily: "sans-serif", display: "flex", justifyContent: "space-between" }}>
                        <span>Behind the numbers</span>
                        <span style={{ transform: isOpen ? "rotate(180deg)" : "none" }}>▾</span>
                      </button>
                      {isOpen && (
                        <div style={{ borderTop: `1px solid ${c.border}`, padding: "12px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                          {item.behind.map((b, i) => (
                            <div key={i}>
                              <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "2px" }}>
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
          <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "18px 22px" }}>
            <div style={{ fontSize: "12px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", fontFamily: "sans-serif" }}>Bretton Woods III in Real Time</div>
            <div style={{ fontSize: "15px", color: "#1f2937", lineHeight: 1.8 }}>The dollar reserve share is below 57% for the first time since 1995. The petrodollar agreement expired June 2024 with no renewal. mBridge settles $55.5 billion outside the dollar system. Project Agora is the Western response. Saudi Arabia joined.</div>
          </div>
        </div>
      )}

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
              Americans have added $482 billion in credit card debt since 2021. At 21.52% APR, a $5,000 balance costs $1,000+ annually. Subprime auto delinquency hit a record. FHA mortgage delinquency near 12%. The squeeze is already running.
            </div>
          </div>
        </div>
      )}

      {activeTab === "markets" && (
        <div style={{ padding: "20px 28px" }}>
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: 0, marginBottom: "16px", fontFamily: "sans-serif", lineHeight: 1.5 }}>
            Valuation, volatility, and credit conditions. All data as of June 10-11, 2026.
          </p>
          <div style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "14px 18px", marginBottom: "20px" }}>
            <div style={{ fontSize: "12px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px", fontFamily: "sans-serif" }}>Overvalued and Complacent</div>
            <div style={{ fontSize: "14px", color: "#1f2937", lineHeight: 1.7, fontFamily: "sans-serif" }}>Shiller CAPE at 39.9 implies roughly 1.9% annual returns over the next decade -- below current 4.2% inflation. VIX at 22.2 is elevated but not panicked. High yield spreads near 300bps while defaults run 4.2-4.5%. The market is pricing in a soft.</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px", marginBottom: "24px" }}>
            {data.indicators.filter(d => d.category === "markets").map((item) => {
              const c = signalColors[item.signal];
              const isOpen = expandedBehind === item.id;
              return (
                <div key={item.id} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: "6px", overflow: "hidden" }}>
                  <div style={{ padding: "16px 18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <div style={{ fontSize: "12px", color: "#4b5563", fontFamily: "sans-serif", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                      <span style={{ fontSize: "10px", color: c.text, fontFamily: "sans-serif", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: c.dot, display: "inline-block" }} />
                        {item.signalLabel}
                      </span>
                    </div>
                    <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827", lineHeight: 1, marginBottom: "4px" }}>{item.value}</div>
                    <div style={{ fontSize: "13px", color: "#6b7280", fontFamily: "sans-serif", marginBottom: "8px" }}>{item.sub}</div>
                    <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: "8px", fontSize: "13px", color: "#4b5563", fontFamily: "sans-serif", lineHeight: 1.5 }}>{item.note}</div>
                  </div>
                  {item.behind && item.behind.length > 0 && (
                    <>
                      <button onClick={() => setExpandedBehind(isOpen ? null : item.id)} style={{ width: "100%", background: "none", border: "none", borderTop: `1px solid ${c.border}`, padding: "8px 18px", fontSize: "12px", color: c.text, fontWeight: "600", cursor: "pointer", fontFamily: "sans-serif", display: "flex", justifyContent: "space-between" }}>
                        <span>Behind the numbers</span>
                        <span style={{ transform: isOpen ? "rotate(180deg)" : "none" }}>▾</span>
                      </button>
                      {isOpen && (
                        <div style={{ borderTop: `1px solid ${c.border}`, padding: "12px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                          {item.behind.map((b, i) => (
                            <div key={i}>
                              <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "2px" }}>
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
          <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "18px 22px" }}>
            <div style={{ fontSize: "12px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", fontFamily: "sans-serif" }}>The 60/40 Is Broken</div>
            <div style={{ fontSize: "15px", color: "#1f2937", lineHeight: 1.8 }}>When stocks and bonds fall together -- which they do in inflationary environments -- the 60/40 portfolio fails as a hedge. CAPE at 39.9 means expected equity returns are near-zero after inflation. Long bonds carry duration risk with CPI at 4.2%. The.</div>
          </div>
        </div>
      )}

      {activeTab === "debt" && (
        <div style={{ padding: "20px 28px" }}>
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: 0, marginBottom: "16px", fontFamily: "sans-serif", lineHeight: 1.5 }}>
            The slow-motion repricing of everything built on cheap money.
          </p>
          <div style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "14px 18px", marginBottom: "20px" }}>
            <div style={{ fontSize: "12px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px", fontFamily: "sans-serif" }}>The Connective Tissue</div>
            <div style={{ fontSize: "14px", color: "#1f2937", lineHeight: 1.7, fontFamily: "sans-serif" }}>Federal debt, CRE, and private equity all relied on near-zero rates. All are now refinancing at rates 400-500bps higher. The losses flow to pension funds, community banks, and insurance companies -- the institutions that hold ordinary Americans.</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px", marginBottom: "24px" }}>
            {data.indicators.filter(d => d.category === "debt").map((item) => {
              const c = signalColors[item.signal];
              return (
                <div key={item.id} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: "6px", padding: "16px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <div style={{ fontSize: "12px", color: "#4b5563", fontFamily: "sans-serif", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                    <span style={{ fontSize: "10px", color: c.text, fontFamily: "sans-serif", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: c.dot, display: "inline-block" }} />
                      {item.signalLabel}
                    </span>
                  </div>
                  <div style={{ fontSize: "28px", fontWeight: "700", color: "#111827", lineHeight: 1, marginBottom: "4px" }}>{item.value}</div>
                  <div style={{ fontSize: "13px", color: "#6b7280", fontFamily: "sans-serif", marginBottom: "8px" }}>{item.sub}</div>
                  <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: "8px", fontSize: "13px", color: "#4b5563", fontFamily: "sans-serif", lineHeight: 1.5 }}>{item.note}</div>
                </div>
              );
            })}
          </div>
          <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderLeft: "4px solid #dc2626", borderRadius: "0 6px 6px 0", padding: "18px 22px" }}>
            <div style={{ fontSize: "12px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", fontFamily: "sans-serif" }}>The Debt Crisis Nobody Is Talking About</div>
            <div style={{ fontSize: "15px", color: "#1f2937", lineHeight: 1.8 }}>Federal debt hit $39 trillion in March 2026. Interest payments exceeded $1 trillion annually -- surpassing defense spending. Office loan delinquency at record 12.34%. Regional banks hold 44% of loan portfolios in CRE. $1 trillion in CRE loans mature.</div>
          </div>
        </div>
      )}

      {/* ── IDEAS ── */}
      {activeTab === "ideas" && (
        <div style={{ padding: "28px", maxWidth: "800px" }}>

          {/* Stagflation Playbook */}
          <div style={{ background: "#fff5f5", border: "2px solid #dc2626", borderRadius: "6px", padding: "20px 22px", marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#ffffff", background: "#dc2626", padding: "2px 10px", borderRadius: "3px", fontFamily: "sans-serif", letterSpacing: "0.08em" }}>STAGFLATION PLAYBOOK</span>
              <span style={{ fontSize: "12px", color: "#dc2626", fontFamily: "sans-serif" }}>What historically works -- and what is different this time</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
              {[
                { label: "Real Assets", detail: "Gold, silver, copper, commodities. Outperform when money loses purchasing power. Central banks buying 1,000+ tonnes/yr.", verdict: "Own it", color: "#15803d" },
                { label: "Pricing Power Equities", detail: "Consumer staples, healthcare, utilities, energy. Companies that raise prices without losing volume.", verdict: "Tilt toward", color: "#15803d" },
                { label: "Short Duration Fixed Income", detail: "T-bills, SGOV. Captures current rates without duration risk. Long bonds lose value with CPI at 4.2%.", verdict: "Overweight", color: "#15803d" },
                { label: "International / Dollar Hedge", detail: "Weakening dollar raises foreign asset values in dollar terms. Latin America, commodity-exporting nations.", verdict: "Diversify into", color: "#15803d" },
                { label: "Growth / Long Duration", detail: "High-multiple stocks lose value when rates stay elevated. S&P 500 at CAPE 39.9 implies 1.9% real returns.", verdict: "Underweight", color: "#dc2626" },
                { label: "Long-Term Bonds", detail: "Duration risk in a 4.2% inflation environment. TLT only works if the Warsh cut thesis materializes.", verdict: "Thesis-dependent", color: "#92400e" },
              ].map((item, i) => (
                <div key={i} style={{ background: "#ffffff", border: "1px solid #fca5a5", borderRadius: "4px", padding: "12px 14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "#111827", fontFamily: "sans-serif" }}>{item.label}</div>
                    <span style={{ fontSize: "10px", fontWeight: "700", color: item.color, fontFamily: "sans-serif", whiteSpace: "nowrap", marginLeft: "8px" }}>{item.verdict}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#4b5563", lineHeight: 1.5, fontFamily: "sans-serif" }}>{item.detail}</div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #fca5a5", paddingTop: "12px" }}>
              <div style={{ fontSize: "12px", color: "#dc2626", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", fontFamily: "sans-serif" }}>What is different from the 1970s</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {[
                  "The Fed cannot use the Volcker playbook. Debt at 124% of GDP means raising rates to 20% would make interest payments larger than the entire federal budget.",
                  "This stagflation is K-shaped. The lower half is already in crisis. Upper-K is still spending but losing professional-class jobs to AI at 1,136/day.",
                  "Programmable payment infrastructure did not exist in the 1970s. Benefit restrictions and banking surveillance add a deflationary mechanism for the lower half.",
                  "Two new investment categories: Medicaid managed care as the counter-cyclical policy play, and stablecoin infrastructure as the programmable money buildout.",
                ].map((text, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <span style={{ color: "#dc2626", fontFamily: "sans-serif", flexShrink: 0, marginTop: "1px" }}>›</span>
                    <span style={{ fontSize: "13px", color: "#374151", fontFamily: "sans-serif", lineHeight: 1.5 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
              The lower half of the K -- households under $60K -- is running out of cushion simultaneously. Savings at 2.6%, credit cards at 21.5% APR, real wages negative, SNAP cuts October 1. Dollar stores are not defensive. They are the first casualties.
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
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
            <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderLeft: "4px solid #7c3aed", borderRadius: "0 6px 6px 0", padding: "14px 16px" }}>
              <div style={{ fontSize: "11px", color: "#5b21b6", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px", fontFamily: "sans-serif" }}>Pozsar -- Bretton Woods III</div>
              <div style={{ fontSize: "13px", color: "#374151", lineHeight: 1.7, fontFamily: "sans-serif" }}>The post-Cold War bargain fractured in 2022 when the West weaponized dollar reserves. Commodity nations are building the exit infrastructure -- mBridge, gold reserves, non-dollar pricing. Bretton Woods III is commodity-backed money replacing dollar-backed money.</div>
            </div>
            <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderLeft: "4px solid #ea580c", borderRadius: "0 6px 6px 0", padding: "14px 16px" }}>
              <div style={{ fontSize: "11px", color: "#9a3412", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px", fontFamily: "sans-serif" }}>Dalio -- Big Debt Cycle</div>
              <div style={{ fontSize: "13px", color: "#374151", lineHeight: 1.7, fontFamily: "sans-serif" }}>Sovereigns choose debasement over default. The U.S. pays $1 trillion annually in interest, doubling by 2036. Gold and commodities over paper assets. Real over financial. Central banks understand the cycle.</div>
            </div>
          </div>

          {/* Contagion Timeline */}/* Contagion Timeline */}
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
