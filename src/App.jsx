import React from "react"
export default function App() {
  return (
    <div style={{
      background: "#0f0f0e", minHeight: "100vh",
      fontFamily: "Georgia, 'Times New Roman', serif",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 24px",
    }}>
      <div style={{ maxWidth: "600px", width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#6b7280", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: "16px" }}>
          Aware Trade
        </div>
        <h1 style={{ fontSize: "32px", fontWeight: "700", color: "#f5f5f0", margin: "0 0 12px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          Investigative Intelligence
        </h1>
        <p style={{ fontSize: "16px", color: "#9ca3af", lineHeight: 1.7, margin: "0 0 48px", fontFamily: "sans-serif" }}>
          Research tools from Aware Trade — tracking the architecture of coercive capitalism in real time.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <a href="/monitor" style={{
            display: "block", padding: "20px 28px",
            background: "#1a1a18", border: "1px solid #2a2a28",
            borderLeft: "3px solid #4f46e5",
            borderRadius: "0 6px 6px 0",
            textDecoration: "none", textAlign: "left",
          }}>
            <div style={{ fontSize: "11px", color: "#4f46e5", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>Live Dashboard</div>
            <div style={{ fontSize: "18px", fontWeight: "700", color: "#f5f5f0", marginBottom: "4px" }}>Macro Monitor</div>
            <div style={{ fontSize: "13px", color: "#6b7280", fontFamily: "sans-serif" }}>Economic indicators, consumer stress, markets, investment ideas, and the K-shape contagion timeline — updated with each data release.</div>
          </a>
          <a href="/timeline" style={{
            display: "block", padding: "20px 28px",
            background: "#1a1a18", border: "1px solid #2a2a28",
            borderLeft: "3px solid #dc2626",
            borderRadius: "0 6px 6px 0",
            textDecoration: "none", textAlign: "left",
          }}>
            <div style={{ fontSize: "11px", color: "#dc2626", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>Investigative Timeline</div>
            <div style={{ fontSize: "18px", fontWeight: "700", color: "#f5f5f0", marginBottom: "4px" }}>The Social Credit System They Did Not Call It That</div>
            <div style={{ fontSize: "13px", color: "#6b7280", fontFamily: "sans-serif" }}>The documented sequence of infrastructure, legislation, and existing systems building toward programmable behavioral control — from 1970 to projected 2027.</div>
          </a>
        </div>
        <div style={{ marginTop: "48px", fontSize: "12px", color: "#374151", fontFamily: "sans-serif" }}>
          <a href="https://awaretrade.com" style={{ color: "#4b5563", textDecoration: "none" }}>awaretrade.com</a>
        </div>
      </div>
    </div>
  )
}
