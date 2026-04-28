import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { G } from '../theme';
import { Btn, StatusDot, Modal, Field, Input } from '../components/ui';
import { useCRMData } from '../data/mock';

export default function Campaigns() {
  const [selected, setSelected] = useState<any>(null);
  const [showNew, setShowNew] = useState(false);
  const [newCamp, setNewCamp] = useState({ name: "", type: "Follow-up", template: "", trigger: "" });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const location = useLocation();

  const isDemo = localStorage.getItem('demoMode') === 'true';
  const { CAMPAIGNS } = useCRMData();

  const fetchCampaigns = async () => {
    if (isDemo) {
      setCampaigns(CAMPAIGNS);
      setIsLoading(false);
      return;
    }
    try {
      const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');
      const res = await fetch(`${baseUrl}/api/campaigns`);
      const data = await res.json();
      setCampaigns(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchCampaigns(); }, []);

  useEffect(() => {
    if (location.state?.openNew) {
      setShowNew(true);
      // Clear the state so refreshing doesn't reopen it
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSave = async () => {
    if (!newCamp.name) {
      alert("Please enter a campaign name.");
      return;
    }
    const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');
    
    if ((newCamp as any).id) {
      if (isDemo) {
        setCampaigns(prev => prev.map(c => c.id === (newCamp as any).id ? { ...c, ...newCamp } : c));
      } else {
        await fetch(`${baseUrl}/api/campaigns/${(newCamp as any).id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCamp)
        });
        setCampaigns(prev => prev.map(c => c.id === (newCamp as any).id ? { ...c, ...newCamp } : c));
      }
    } else {
      const camp: any = {
        ...newCamp, status: "live",
        icon: ["💬", "🔔", "🔁", "🎉", "🎂"][Math.floor(Math.random() * 5)],
        color: [G.green, G.teal, G.amber, "#c084fc", "#fb923c"][Math.floor(Math.random() * 5)],
        sent: 0, opened: 0, replied: 0, segment: "Custom segment",
      };
      if (isDemo) {
        camp.id = campaigns.length + 1;
        setCampaigns(prev => [camp, ...prev]);
      } else {
        const res = await fetch(`${baseUrl}/api/campaigns`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(camp)
        });
        const saved = await res.json();
        if (!res.ok) {
          throw new Error(saved.error || "Failed to save campaign");
        }
        setCampaigns(prev => [saved, ...prev]);
      }
    } catch (err: any) {
      console.error("Failed to add campaign", err);
      alert(`Error saving campaign: ${err.message}. Did you run the schema.sql in Supabase?`);
    }
    setShowNew(false);
    setNewCamp({ name: "", type: "Follow-up", template: "", trigger: "" });
  };

  const handleGenerateTemplate = async () => {
    setIsGenerating(true);
    try {
      const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');
      const res = await fetch(`${baseUrl}/api/generate-ai-response`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessContext: "We are a local business using WhatsApp.",
          tone: "Friendly, direct, and professional",
          userQuery: `Write a short, high-converting WhatsApp message template for a '${newCamp.type}' campaign. Include placeholder variables exactly like {name} and {link}. Keep it under 2 sentences and do not include any conversational filler.`
        })
      });
      if (!res.ok) throw new Error("HTTP Error " + res.status);
      const data = await res.json();
      if (data.response) {
        setNewCamp(p => ({ ...p, template: data.response }));
      } else {
        alert("Failed to generate template.");
      }
    } catch (err) {
      alert("Error generating template. Ensure the backend is running and reachable.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fade-up">
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <Btn onClick={() => setShowNew(true)}>＋ New Campaign</Btn>
        <Btn variant="ghost">📋 Templates</Btn>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 12 }}>
        {isLoading ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: 40, color: G.muted }}>Loading database...</div>
        ) : campaigns.length === 0 ? (
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
            <Btn style={{ flex: 1, justifyContent: "center" }} onClick={async () => {
              const newStatus = selected.status === "live" ? "paused" : "live";
              if (isDemo) {
                setCampaigns(prev => prev.map(c => c.id === selected.id ? { ...c, status: newStatus } : c));
                setSelected((prev: any) => ({ ...prev, status: newStatus }));
                return;
              }
              const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');
              await fetch(`${baseUrl}/api/campaigns/${selected.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
              });
              setCampaigns(prev => prev.map(c => c.id === selected.id ? { ...c, status: newStatus } : c));
              setSelected((prev: any) => ({ ...prev, status: newStatus }));
            }}>{selected.status === "live" ? "⏸ Pause" : "▶ Activate"}</Btn>
            <Btn variant="ghost" onClick={() => {
              setNewCamp(selected);
              setShowNew(true);
              setSelected(null);
            }}>✏️ Edit</Btn>
            <Btn variant="danger" onClick={async () => {
              if (isDemo) {
                setCampaigns(prev => prev.filter(c => c.id !== selected.id));
                setSelected(null);
                return;
              }
              const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');
              await fetch(`${baseUrl}/api/campaigns/${selected.id}`, { method: "DELETE" });
              setCampaigns(prev => prev.filter(c => c.id !== selected.id));
              setSelected(null);
            }}>🗑️</Btn>
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
            <div style={{ position: "relative" }}>
              <Input multiline value={newCamp.template} onChange={(e: any) => setNewCamp(p => ({ ...p, template: e.target.value }))} placeholder="Hi {name}, thanks for visiting! Use {link} for dynamic links." rows={4} />
              <button 
                onClick={handleGenerateTemplate}
                disabled={isGenerating}
                style={{ 
                  position: "absolute", bottom: 8, right: 8, background: "#fff", border: `1px solid ${G.border}`, 
                  borderRadius: 6, padding: "4px 8px", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
                  boxShadow: "2px 2px 0 rgba(0,0,0,0.1)", color: isGenerating ? G.muted : G.text
                }}>
                {isGenerating ? "⏳ Generating..." : "✨ Auto-Generate AI"}
              </button>
            </div>
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
