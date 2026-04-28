import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { G } from '../theme';
import { Btn, StatusDot, Modal, Field, Input } from '../components/ui';
import { useCRMData, addCampaignToStore } from '../data/mock';

export default function Campaigns() {
  const { CAMPAIGNS } = useCRMData();
  const [selected, setSelected] = useState<any>(null);
  const [showNew, setShowNew] = useState(false);
  const [newCamp, setNewCamp] = useState({ name: "", type: "Follow-up", template: "", trigger: "" });
  
  const [campaigns, setCampaigns] = useState(CAMPAIGNS);
  const location = useLocation();

  useEffect(() => { setCampaigns(CAMPAIGNS); }, [CAMPAIGNS.length]);

  useEffect(() => {
    if (location.state?.openNew) {
      setShowNew(true);
      // Clear the state so refreshing doesn't reopen it
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSave = () => {
    if (!newCamp.name) {
      alert("Please enter a campaign name.");
      return;
    }
    const camp = {
      ...newCamp, id: campaigns.length + 1, status: "live",
      icon: ["💬", "🔔", "🔁", "🎉", "🎂"][Math.floor(Math.random() * 5)],
      color: [G.green, G.teal, G.amber, "#c084fc", "#fb923c"][Math.floor(Math.random() * 5)],
      sent: 0, opened: 0, replied: 0, segment: "Custom segment",
    };
    setCampaigns(prev => [...prev, camp]);
    addCampaignToStore(camp);
    setShowNew(false);
    setNewCamp({ name: "", type: "Follow-up", template: "", trigger: "" });
  };

  return (
    <div className="fade-up">
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <Btn onClick={() => setShowNew(true)}>＋ New Campaign</Btn>
        <Btn variant="ghost">📋 Templates</Btn>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 12 }}>
        {campaigns.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: 40, color: G.muted }}>No campaigns created yet. Click "New Campaign" to start.</div>
        ) : campaigns.map(c => (
          <div key={c.id} onClick={() => setSelected(c)} style={{
            background: G.card, border: `1px solid ${selected?.id === c.id ? c.color + "55" : G.border}`,
            borderRadius: 14, padding: "16px 18px", cursor: "pointer", transition: "all .18s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = c.color + "44"; e.currentTarget.style.background = G.cardHover; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = selected?.id === c.id ? c.color + "55" : G.border; e.currentTarget.style.background = G.card; }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, background: c.color + "1a", border: `1px solid ${c.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{c.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5, fontFamily: "Syne,sans-serif" }}>{c.name}</div>
                  <StatusDot status={c.status} />
                </div>
                <div style={{ fontSize: 11.5, color: G.muted, marginBottom: 10 }}>Trigger: {c.trigger}</div>
                {c.type !== "AI Reply" && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                    {[["Sent", c.sent, G.text], ["Opened", c.opened, G.teal], ["Replied", c.replied, c.color]].map(([l, v, col]) => (
                      <div key={l as string} style={{ background: G.surface, borderRadius: 8, padding: "7px 10px" }}>
                        <div style={{ fontSize: 10, color: G.muted, fontWeight: 600, textTransform: "uppercase" }}>{l as string}</div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: col as string, fontFamily: "Syne,sans-serif" }}>{v as string}</div>
                      </div>
                    ))}
                  </div>
                )}
                {c.type === "AI Reply" && (
                  <div style={{ background: G.surface, borderRadius: 8, padding: "7px 10px" }}>
                    <div style={{ fontSize: 10, color: G.muted, fontWeight: 600, textTransform: "uppercase" }}>Auto-Handled</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: G.teal, fontFamily: "Syne,sans-serif" }}>{c.replied}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <Modal title={`${selected.icon} ${selected.name}`} onClose={() => setSelected(null)}>
          <div style={{ marginBottom: 16 }}>
            <StatusDot status={selected.status} />
          </div>
          <Field label="Trigger"><div style={{ fontSize: 13, color: G.teal }}>{selected.trigger}</div></Field>
          <Field label="Segment"><div style={{ fontSize: 13, color: G.muted }}>{selected.segment}</div></Field>
          <Field label="Message Template">
            <div style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 9, padding: "12px 14px", fontSize: 13, lineHeight: 1.6, color: G.text }}>
              {selected.template}
            </div>
          </Field>
          {selected.type !== "AI Reply" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[["Sent", selected.sent], ["Opened", selected.opened], ["Replied", selected.replied]].map(([l, v]) => (
                <div key={l as string} style={{ background: G.surface, borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "Syne,sans-serif", color: G.green }}>{v as string}</div>
                  <div style={{ fontSize: 11, color: G.muted, fontWeight: 600, textTransform: "uppercase" }}>{l as string}</div>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            <Btn style={{ flex: 1, justifyContent: "center" }}>{selected.status === "live" ? "⏸ Pause" : "▶ Activate"}</Btn>
            <Btn variant="ghost">✏️ Edit</Btn>
            <Btn variant="danger">🗑</Btn>
          </div>
        </Modal>
      )}

      {showNew && (
        <Modal title="＋ New Campaign" onClose={() => setShowNew(false)}>
          <Field label="Campaign Name"><Input value={newCamp.name} onChange={(e: any) => setNewCamp(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Post-Visit Thank You" /></Field>
          <Field label="Type">
            <select value={newCamp.type} onChange={e => setNewCamp(p => ({ ...p, type: e.target.value }))} style={{ width: "100%", background: G.card, border: `1px solid ${G.border}`, borderRadius: 9, padding: "9px 12px", color: G.text, fontSize: 13.5, fontFamily: "Inter, sans-serif" }}>
              {["Follow-up", "Reminder", "Reactivation", "Broadcast", "AI Reply"].map(t => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Trigger / Schedule"><Input value={newCamp.trigger} onChange={(e: any) => setNewCamp(p => ({ ...p, trigger: e.target.value }))} placeholder="e.g. 2 hrs after appointment" /></Field>
          <Field label="Message Template">
            <Input multiline value={newCamp.template} onChange={(e: any) => setNewCamp(p => ({ ...p, template: e.target.value }))} placeholder="Hi {name}, thanks for visiting! Use {link} for dynamic links." rows={4} />
          </Field>
          <div style={{ fontSize: 11.5, color: G.muted, marginBottom: 14 }}>💡 Variables: {"{name}"} {"{link}"} {"{date}"} {"{time}"}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn style={{ flex: 1, justifyContent: "center" }} onClick={handleSave}>Save & Activate</Btn>
            <Btn variant="ghost" onClick={() => setShowNew(false)}>Cancel</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
