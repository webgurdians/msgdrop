import { G } from '../theme';
import { Card, StatCard, ProgressBar } from '../components/ui';
import { useCRMData } from '../data/mock';

export default function Analytics() {
  const { CAMPAIGNS, isDemoUser } = useCRMData();
  const bars = isDemoUser ? [
    { label: "Mon", sent: 80, replied: 30 },
    { label: "Tue", sent: 120, replied: 55 },
    { label: "Wed", sent: 95, replied: 40 },
    { label: "Thu", sent: 145, replied: 70 },
    { label: "Fri", sent: 160, replied: 90 },
    { label: "Sat", sent: 200, replied: 110 },
    { label: "Sun", sent: 60, replied: 22 },
  ] : [
    { label: "Mon", sent: 0, replied: 0 },
    { label: "Tue", sent: 0, replied: 0 },
    { label: "Wed", sent: 0, replied: 0 },
    { label: "Thu", sent: 0, replied: 0 },
    { label: "Fri", sent: 0, replied: 0 },
    { label: "Sat", sent: 0, replied: 0 },
    { label: "Sun", sent: 0, replied: 0 },
  ];
  const maxVal = 200;

  return (
    <div className="fade-up">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        <StatCard label="Delivery Rate"  value={isDemoUser ? "98.2%" : "—"} trend="Industry avg: 94%"    color={G.green}  icon="📬" />
        <StatCard label="Open Rate"      value={isDemoUser ? "74%" : "—"}   trend="↑ WhatsApp avg"        color={G.teal}   icon="👁" />
        <StatCard label="Reply Rate"     value={isDemoUser ? "41%" : "—"}   trend="vs 2% email avg"       color={G.amber}  icon="↩️" />
        <StatCard label="Opt-out Rate"   value={isDemoUser ? "0.8%" : "—"}  trend="Very healthy"          color="#c084fc"  icon="🛑" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14 }}>
        <Card>
          <div style={{ fontWeight: 700, fontFamily: "Syne,sans-serif", fontSize: 14, marginBottom: 18 }}>📈 Messages This Week</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 140 }}>
            {bars.map(b => (
              <div key={b.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 2, flex: 1 }}>
                  <div style={{ background: G.teal + "99", borderRadius: "4px 4px 0 0", height: `${(b.replied / maxVal) * 100}%`, minHeight: 4, transition: "height .4s" }} />
                  <div style={{ background: G.green, borderRadius: "4px 4px 0 0", height: `${((b.sent - b.replied) / maxVal) * 100}%`, minHeight: 4, transition: "height .4s" }} />
                </div>
                <div style={{ fontSize: 10.5, color: G.muted, fontWeight: 600 }}>{b.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 14 }}>
            {[["Sent", G.green], ["Replied", G.teal]].map(([l, c]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: G.muted }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: c }} />{l}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div style={{ fontWeight: 700, fontFamily: "Syne,sans-serif", fontSize: 14, marginBottom: 14 }}>🏆 Top Campaigns</div>
          {CAMPAIGNS.length === 0 ? (
            <div style={{ padding: 20, textAlign: "center", color: G.muted, fontSize: 13 }}>No campaign data available</div>
          ) : CAMPAIGNS.filter(c => c.type !== "AI Reply").sort((a, b) => b.replied - a.replied).slice(0, 4).map(c => (
            <div key={c.id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 12.5 }}>
                <div style={{ fontWeight: 600 }}>{c.icon} {c.name}</div>
                <div style={{ color: c.color, fontWeight: 700 }}>{c.sent > 0 ? `${Math.round((c.replied / c.sent) * 100)}%` : "—"}</div>
              </div>
              <ProgressBar value={c.replied} max={c.sent || 1} color={c.color} />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
