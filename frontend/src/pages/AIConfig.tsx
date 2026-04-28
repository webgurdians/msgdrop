import { useState, useEffect } from 'react';
import { G } from '../theme';
import { Card, Field, Input, Btn } from '../components/ui';
import { useCRMData, addFaqToStore } from '../data/mock';

export default function AIConfig() {
  const { AI_REPLIES } = useCRMData();
  const [enabled, setEnabled] = useState(true);
  const [tone, setTone] = useState("Friendly");
  const [faqs, setFaqs] = useState(AI_REPLIES);
  const [newQ, setNewQ] = useState("");
  const [newA, setNewA] = useState("");

  useEffect(() => {
    setFaqs(AI_REPLIES);
  }, [AI_REPLIES.length]);

  const addFaq = () => {
    if (!newQ || !newA) return;
    const faq = { q: newQ, a: newA };
    setFaqs(p => [...p, faq]);
    addFaqToStore(faq);
    setNewQ(""); setNewA("");
  };

  return (
    <div className="fade-up">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <Card style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: G.teal + "1a", border: `1px solid ${G.teal}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🤖</div>
              <div>
                <div style={{ fontWeight: 700, fontFamily: "Syne,sans-serif", fontSize: 15 }}>AI Auto-Reply</div>
                <div style={{ fontSize: 12, color: G.muted }}>Powered by Claude AI</div>
              </div>
              <div onClick={() => setEnabled(e => !e)} style={{
                marginLeft: "auto", width: 44, height: 24, borderRadius: 20,
                background: enabled ? G.green : G.border, position: "relative", cursor: "pointer", transition: "background .2s",
              }}>
                <div style={{ position: "absolute", top: 3, left: enabled ? 22 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .2s" }} />
              </div>
            </div>
            <Field label="Reply Tone">
              <div style={{ display: "flex", gap: 8 }}>
                {["Friendly", "Professional", "Casual"].map(t => (
                  <button key={t} onClick={() => setTone(t)} style={{
                    flex: 1, padding: "8px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif",
                    background: tone === t ? G.green + "22" : G.surface, color: tone === t ? G.green : G.muted,
                    border: tone === t ? `1px solid ${G.green}44` : `1px solid ${G.border}`,
                  }}>{t}</button>
                ))}
              </div>
            </Field>
            <Field label="Business Context">
              <Input multiline placeholder="e.g. We are a premium salon in Park Street, Kolkata. We offer haircuts, facials, and more. Our prices start at ₹150." rows={3} />
            </Field>
            <Field label="Business Hours">
              <Input placeholder="e.g. Mon-Sat 10AM-8PM, Sun 11AM-6PM" />
            </Field>
            <Btn style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>💾 Save Config</Btn>
          </Card>
        </div>

        <div>
          <Card style={{ marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontFamily: "Syne,sans-serif", fontSize: 14, marginBottom: 14 }}>❓ FAQ Responses</div>
            {faqs.length === 0 && <div style={{ color: G.muted, fontSize: 13, marginBottom: 12 }}>No FAQs added yet.</div>}
            {faqs.map((f, i) => (
              <div key={i} style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
                <div style={{ fontSize: 12, color: G.muted, marginBottom: 4, fontWeight: 600 }}>Q: {f.q}</div>
                <div style={{ fontSize: 12.5, color: G.text }}>{f.a}</div>
              </div>
            ))}
            <div style={{ marginTop: 12 }}>
              <Input value={newQ} onChange={(e: any) => setNewQ(e.target.value)} placeholder="New question…" />
              <div style={{ height: 8 }} />
              <Input value={newA} onChange={(e: any) => setNewA(e.target.value)} placeholder="Answer…" />
              <div style={{ height: 8 }} />
              <Btn sm onClick={addFaq}>＋ Add FAQ</Btn>
            </div>
          </Card>

          <Card>
            <div style={{ fontWeight: 700, fontFamily: "Syne,sans-serif", fontSize: 14, marginBottom: 12 }}>📊 This Week</div>
            {[["Auto-handled queries", faqs.length > 0 ? "156" : "0", G.teal], ["Escalated to human", faqs.length > 0 ? "14" : "0", G.amber], ["Response time (avg)", faqs.length > 0 ? "< 5s" : "—", G.green]].map(([l, v, c]) => (
              <div key={l as string} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${G.border}33` }}>
                <div style={{ fontSize: 13, color: G.muted }}>{l as string}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: c as string }}>{v as string}</div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
