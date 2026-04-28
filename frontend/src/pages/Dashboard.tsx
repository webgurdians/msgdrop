import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { G } from '../theme';
import { Card, StatCard, Btn, Avatar, ProgressBar } from '../components/ui';
import { useCRMData } from '../data/mock';

export default function Dashboard() {
  const navigate = useNavigate();
  const { INBOX } = useCRMData();
  
  const [contacts, setContacts] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');
        const [resContacts, resCampaigns] = await Promise.all([
          fetch(`${baseUrl}/api/contacts`),
          fetch(`${baseUrl}/api/campaigns`)
        ]);
        const contactsData = await resContacts.json();
        const campaignsData = await resCampaigns.json();
        
        setContacts(Array.isArray(contactsData) ? contactsData : []);
        setCampaigns(Array.isArray(campaignsData) ? campaignsData : []);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const recentCampaigns = campaigns.filter(c => c.status === "live").slice(0, 3);
  
  const stats = {
    totalContacts: contacts.length.toString(),
    messagesSent: campaigns.reduce((acc, c) => acc + (c.sent || 0), 0).toLocaleString(),
    campaignsLive: campaigns.filter(c => c.status === "live").length.toString(),
    revenueRecovered: "₹" + campaigns.filter(c => c.type === 'Reactivation').reduce((acc, c) => acc + ((c.replied || 0) * 1500), 0).toLocaleString()
  };
  
  return (
    <div className="fade-up">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 12, marginBottom: 20 }}>
        <StatCard label="Total Contacts"   value={stats.totalContacts}   trend={stats.totalContacts !== "0" ? "↑ 23 this week" : "—"}    color={G.green}  icon="👥" />
        <StatCard label="Messages Sent"    value={stats.messagesSent} trend={stats.messagesSent !== "0" ? "↑ 12% vs last week" : "—"} color={G.teal}   icon="💬" />
        <StatCard label="Campaigns Live"   value={stats.campaignsLive}     trend={stats.campaignsLive !== "0" ? "1 scheduled" : "—"}        color={G.amber}  icon="📣" />
        <StatCard label="Revenue Recovered" value={stats.revenueRecovered} trend={stats.revenueRecovered !== "₹0" ? "via win-back flows" : "—"} color="#c084fc"  icon="💰" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 14, marginBottom: 14 }}>
        {/* Active campaigns */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontFamily: "Syne, sans-serif", fontSize: 14 }}>🚀 Active Campaigns</div>
            <Btn sm variant="ghost" onClick={() => navigate("/dashboard/campaigns")}>View all →</Btn>
          </div>
          {isLoading ? (
            <div style={{ padding: "20px 0", textAlign: "center", color: G.muted, fontSize: 13 }}>Loading database...</div>
          ) : recentCampaigns.length === 0 ? (
            <div style={{ padding: "20px 0", textAlign: "center", color: G.muted, fontSize: 13 }}>No active campaigns</div>
          ) : recentCampaigns.map(c => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: `1px solid ${G.border}` }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: c.color + "22", border: `1px solid ${c.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{c.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 3 }}>{c.name}</div>
                <ProgressBar value={c.opened} max={c.sent || 1} color={c.color} />
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: c.color }}>{c.sent}</div>
                <div style={{ fontSize: 10.5, color: G.muted }}>sent</div>
              </div>
            </div>
          ))}
        </Card>

        {/* Quick actions */}
        <Card>
          <div style={{ fontWeight: 700, fontFamily: "Syne, sans-serif", fontSize: 14, marginBottom: 16 }}>⚡ Quick Actions</div>
          {[
            { icon: "📨", label: "Send Broadcast", sub: "Message all / segment", color: G.green, path: "/dashboard/campaigns" },
            { icon: "🔁", label: "Launch Win-Back", sub: "Target lapsed clients", color: G.amber, path: "/dashboard/campaigns" },
            { icon: "➕", label: "Add Contact",     sub: "Add walk-in manually", color: G.teal, path: "/dashboard/contacts" },
            { icon: "🤖", label: "AI Auto-Reply",   sub: "Configure bot replies", color: "#c084fc", path: "/dashboard/ai" },
          ].map(a => (
            <div key={a.label} onClick={() => navigate(a.path)} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10,
              cursor: "pointer", marginBottom: 6, transition: "background .15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = G.cardHover}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ width: 36, height: 36, borderRadius: 9, background: a.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{a.icon}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{a.label}</div>
                <div style={{ fontSize: 11.5, color: G.muted }}>{a.sub}</div>
              </div>
              <div style={{ marginLeft: "auto", color: G.muted, fontSize: 12 }}>→</div>
            </div>
          ))}
        </Card>
      </div>

      {/* Inbox preview */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontWeight: 700, fontFamily: "Syne, sans-serif", fontSize: 14 }}>📥 Recent Inbox</div>
          <Btn sm variant="ghost" onClick={() => navigate("/dashboard/inbox")}>Open inbox →</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: 10 }}>
          {INBOX.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", padding: 20, textAlign: "center", color: G.muted, fontSize: 13 }}>Inbox is empty</div>
          ) : INBOX.slice(0, 3).map(m => (
            <div key={m.id} style={{ background: G.surface, border: `1px solid ${m.unread ? G.green + "33" : G.border}`, borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                <Avatar initials={m.avatar} color={m.color} size={28} />
                <div style={{ fontWeight: 600, fontSize: 12.5 }}>{m.name}</div>
                {m.unread && <div style={{ marginLeft: "auto", width: 7, height: 7, borderRadius: "50%", background: G.green }} />}
              </div>
              <div style={{ fontSize: 12, color: G.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.msg}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
