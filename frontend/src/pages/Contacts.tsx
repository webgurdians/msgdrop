import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { G } from '../theme';
import { Card, Btn, Avatar, Tag, Modal, Field, Input } from '../components/ui';

export default function Contacts() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ name: "", phone: "", type: "Salon", tag: "New" });

  const fetchContacts = async () => {
    try {
      const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');
      const res = await fetch(`${baseUrl}/api/contacts`);
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filtered = contacts.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search);
    const matchFilter = filter === "all" || c.status === filter;
    return matchSearch && matchFilter;
  });

  const addContact = async () => {
    if (!form.name || !form.phone) return;
    const newContact = {
      ...form, status: "new", lastVisit: "Today", visits: 0,
      avatar: form.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
      color: [G.green, G.teal, G.amber, "#a78bfa", "#fb923c"][Math.floor(Math.random() * 5)],
    };
    
    try {
      const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');
      const res = await fetch(`${baseUrl}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact)
      });
      const saved = await res.json();
      setContacts(prev => [saved, ...prev]);
    } catch (err) {
      console.error("Failed to add contact", err);
    }
    
    setShowModal(false);
    setForm({ name: "", phone: "", type: "Salon", tag: "New" });
  };

  const handleDelete = async (id: number) => {
    try {
      const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');
      await fetch(`${baseUrl}/api/contacts/${id}`, { method: "DELETE" });
      setContacts(prev => prev.filter(x => x.id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  return (
    <div className="fade-up">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 100%", display: "flex", alignItems: "center", gap: 8, background: G.card, border: `1px solid ${G.border}`, borderRadius: 10, padding: "8px 14px" }}>
          <span style={{ color: G.muted }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search contacts…"
            style={{ background: "none", border: "none", outline: "none", color: G.text, fontSize: 13.5, flex: 1, fontFamily: "Inter, sans-serif" }} />
        </div>
        {["all", "active", "lapsed", "new"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "7px 14px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, border: "none",
            background: filter === f ? G.green : G.card, color: filter === f ? "#000" : G.muted,
            cursor: "pointer", textTransform: "capitalize", fontFamily: "Inter, sans-serif"
          }}>{f}</button>
        ))}
        <Btn onClick={() => setShowModal(true)}>＋ Add Contact</Btn>
      </div>

      <Card style={{ padding: 0, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${G.border}` }}>
              {["Contact", "Business Type", "Tag", "Last Visit", "Visits", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 10.5, textTransform: "uppercase", letterSpacing: .8, color: G.muted, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} style={{ borderBottom: `1px solid ${G.border}33`, transition: "background .12s" }}
                onMouseEnter={e => e.currentTarget.style.background = G.cardHover}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar initials={c.avatar} color={c.color} size={32} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                      <div style={{ fontSize: 11.5, color: G.muted }}>{c.phone}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", fontSize: 12.5, color: G.muted }}>{c.type}</td>
                <td style={{ padding: "12px 16px" }}><Tag label={c.tag} /></td>
                <td style={{ padding: "12px 16px", fontSize: 12.5, color: G.muted }}>{c.lastVisit}</td>
                <td style={{ padding: "12px 16px", fontWeight: 700, color: G.text, fontFamily: "Syne,sans-serif" }}>{c.visits}</td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Btn sm variant="teal" onClick={() => navigate("/dashboard/inbox", { state: { contactId: c.id } })}>💬 Message</Btn>
                    {c.status === "lapsed" && <Btn sm variant="ghost" onClick={() => navigate("/dashboard/campaigns")}>🔁 Win-Back</Btn>}
                    <Btn sm variant="danger" onClick={() => handleDelete(c.id)}>🗑️</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading ? (
          <div style={{ textAlign: "center", padding: 40, color: G.muted }}>Loading database...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: G.muted }}>No contacts found</div>
        ) : null}
      </Card>

      {showModal && (
        <Modal title="➕ Add New Contact" onClose={() => setShowModal(false)}>
          <Field label="Full Name"><Input value={form.name} onChange={(e: any) => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Priya Sharma" /></Field>
          <Field label="WhatsApp Number"><Input value={form.phone} onChange={(e: any) => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91 98300 XXXXX" /></Field>
          <Field label="Business Type">
            <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} style={{ width: "100%", background: G.card, border: `1px solid ${G.border}`, borderRadius: 9, padding: "9px 12px", color: G.text, fontSize: 13.5, fontFamily: "Inter, sans-serif" }}>
              {["Salon", "Gym", "Dental", "Spa", "Other"].map(t => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Segment Tag">
            <select value={form.tag} onChange={e => setForm(p => ({ ...p, tag: e.target.value }))} style={{ width: "100%", background: G.card, border: `1px solid ${G.border}`, borderRadius: 9, padding: "9px 12px", color: G.text, fontSize: 13.5, fontFamily: "Inter, sans-serif" }}>
              {["New", "Regular", "VIP", "At Risk"].map(t => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <Btn onClick={addContact} style={{ flex: 1, justifyContent: "center" }}>Save Contact</Btn>
            <Btn variant="ghost" onClick={() => setShowModal(false)}>Cancel</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
