import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const C = {
  green: "#0BCC6A",
  greenDim: "#07A354",
  greenPale: "#E6FFF2",
  ink: "#0D0D0D",
  inkLight: "#1A1A1A",
  muted: "#6B6B6B",
  border: "#E2E2E2",
  surface: "#F7F7F5",
  white: "#FFFFFF",
  red: "#FF3B30",
  amber: "#FF9500",
};

export default function Landing() {
  const navigate = useNavigate();
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [annual, setAnnual] = useState(false);

  const toggleFaq = (i: number) => {
    setFaqOpen(faqOpen === i ? null : i);
  };

  const navToLogin = () => navigate('/login');
  
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: C.surface, color: C.ink, fontFamily: "'Inter', sans-serif", minHeight: "100vh", overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        h1, h2, h3, h4, .font-display { font-family: 'Syne', sans-serif; letter-spacing: -0.02em; }
        .btn-primary { background: ${C.green}; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 14px; }
        .btn-primary:hover { background: ${C.greenDim}; transform: translateY(-1px); }
        .btn-ghost { background: transparent; color: ${C.ink}; border: 1px solid ${C.border}; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 14px; }
        .btn-ghost:hover { background: rgba(0,0,0,0.03); }
        .btn-nav { background: transparent; color: ${C.ink}; border: none; font-weight: 500; cursor: pointer; padding: 8px 12px; border-radius: 6px; font-size: 14px; transition: background 0.2s; }
        .btn-nav:hover { background: rgba(0,0,0,0.05); }
        
        .section { padding: 80px 24px; max-width: 1100px; margin: 0 auto; }
        .tag { display: inline-flex; background: ${C.greenPale}; color: ${C.greenDim}; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; padding: 6px 12px; border-radius: 20px; margin-bottom: 16px; }
        
        .md-flex { display: flex; gap: 8px; }
        @media (max-width: 768px) {
          .mobile-col { flex-direction: column !important; }
          .hero-h1 { font-size: 36px !important; }
          .md-flex { display: none !important; }
          .pricing-growth { transform: none !important; border: 2px solid #0BCC6A !important; box-shadow: none !important; }
          .cta-h2 { font-size: 32px !important; }
          .section { padding: 60px 16px !important; }
          .nav-container { padding: 12px 16px !important; }
          .btn-primary { padding: 8px 12px !important; font-size: 13px !important; }
          .btn-nav { padding: 8px 8px !important; font-size: 13px !important; }
          .logo-text { font-size: 18px !important; }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, background: "rgba(247, 247, 245, 0.9)", backdropFilter: "blur(12px)", zIndex: 100, borderBottom: `1px solid ${C.border}` }}>
        <div className="nav-container" style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo(0,0)}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💬</div>
            <div className="logo-text font-display" style={{ fontSize: 22, fontWeight: 800, color: C.ink }}>MsgDrop</div>
          </div>
          
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div className="md-flex">
              <button className="btn-nav" onClick={() => scrollTo('how-it-works')}>How it works</button>
              <button className="btn-nav" onClick={() => scrollTo('pricing')}>Pricing</button>
            </div>
            <button className="btn-nav" onClick={navToLogin} style={{ fontWeight: 600, whiteSpace: "nowrap" }}>Sign In</button>
            <button className="btn-primary" onClick={navToLogin} style={{ whiteSpace: "nowrap" }}>Start Free Trial</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section" style={{ paddingTop: 100, paddingBottom: 60, textAlign: "center" }}>
        <div className="tag">✨ WhatsApp marketing for Indian businesses</div>
        <h1 className="hero-h1 font-display" style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, color: C.ink, maxWidth: 800, margin: "0 auto 24px" }}>
          Send smarter campaigns.<br/>Grow on <span style={{ color: C.green }}>WhatsApp.</span>
        </h1>
        <p style={{ fontSize: 18, color: C.muted, lineHeight: 1.6, maxWidth: 640, margin: "0 auto 40px" }}>
          MsgDrop lets you send bulk WhatsApp messages, automate follow-ups, and write campaigns in Hindi — in minutes, not hours.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <button className="btn-primary" style={{ padding: "16px 32px", fontSize: 16 }} onClick={navToLogin}>Start free — no credit card</button>
            <span style={{ fontSize: 12, color: C.muted }}>14-day free trial</span>
          </div>
          <button className="btn-ghost" style={{ padding: "16px 32px", fontSize: 16, height: "fit-content" }} onClick={() => scrollTo('how-it-works')}>See how it works →</button>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.white, padding: "32px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: C.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600, marginBottom: 24 }}>
            Trusted by 200+ shops, salons & freelancers across India
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", opacity: 0.6, filter: "grayscale(100%)" }}>
            <div className="font-display" style={{ fontSize: 24, fontWeight: 700 }}>Priya's Salon</div>
            <div className="font-display" style={{ fontSize: 24, fontWeight: 700 }}>Metro Retail</div>
            <div className="font-display" style={{ fontSize: 24, fontWeight: 700 }}>FitNation Gym</div>
            <div className="font-display" style={{ fontSize: 24, fontWeight: 700 }}>DentalCare Plus</div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="section">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="tag">How it works</div>
          <h2 className="font-display" style={{ fontSize: 40, fontWeight: 800 }}>From zero to your first campaign in 10 minutes</h2>
        </div>
        <div className="mobile-col" style={{ display: "flex", gap: 24 }}>
          {[
            { step: "01", title: "Import your contacts", desc: "Upload a CSV or sync from your phone. MsgDrop organizes them instantly." },
            { step: "02", title: "Create your message", desc: "Pick a template or let AI write it for you in Hindi or English." },
            { step: "03", title: "Schedule & send", desc: "Set a time, hit send. Watch delivery and replies in your shared inbox." }
          ].map(s => (
            <div key={s.step} style={{ flex: 1, background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32 }}>
              <div style={{ fontSize: 24, color: C.greenDim, fontWeight: 800, marginBottom: 16 }}>{s.step}</div>
              <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{s.title}</h3>
              <p style={{ color: C.muted, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ background: C.white, borderTop: `1px solid ${C.border}` }}>
        <div className="section">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="tag">Features</div>
            <h2 className="font-display" style={{ fontSize: 40, fontWeight: 800 }}>Everything your business needs.<br/>Nothing it doesn't.</h2>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 24 }}>
            {[
              { icon: "✍️", title: "AI message writer", desc: "Type your offer in plain language. MsgDrop writes the WhatsApp message for you — in Hindi or English.", highlight: true },
              { icon: "🗓️", title: "Festival campaign calendar", desc: "Pre-loaded with Diwali, Eid, Durga Puja, Holi and 30+ Indian festivals. One click to launch a seasonal campaign.", highlight: true },
              { icon: "🇮🇳", title: "Hindi + regional languages", desc: "Write templates in Hindi, Bengali, Tamil, Marathi, Gujarati. Your customers read in their language." },
              { icon: "📊", title: "Delivery & reply analytics", desc: "See who got your message, who replied, and who didn't. Know which campaign actually worked." },
              { icon: "🔁", title: "Drip & follow-up automation", desc: "Set up 'if no reply in 3 days, send this reminder' flows. Works while you sleep." },
              { icon: "📥", title: "2-way WhatsApp inbox", desc: "Replies from customers land in one shared inbox. Reply, tag, and close conversations." }
            ].map((f, i) => (
              <div key={i} style={{ background: f.highlight ? C.greenPale : C.surface, border: `1px solid ${f.highlight ? C.green : C.border}`, borderRadius: 16, padding: 32 }}>
                <div style={{ fontSize: 32, marginBottom: 20 }}>{f.icon}</div>
                <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: C.ink }}>{f.title}</h3>
                <p style={{ color: f.highlight ? C.greenDim : C.muted, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: C.surface }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="tag">Success Stories</div>
          <h2 className="font-display" style={{ fontSize: 40, fontWeight: 800 }}>Real results from real Indian businesses</h2>
        </div>
        <div className="mobile-col" style={{ display: "flex", gap: 24 }}>
          {[
            { name: "Priya Sharma", biz: "Salon Owner, Kolkata", quote: "I just copy-pasted the same message 50 times before. Now I hit one button and 400 clients get my weekend offer. Got 43 replies in 2 hours.", result: "43 replies in 2 hours" },
            { name: "Rahul Verma", biz: "Clothing Retailer, Surat", quote: "Instagram organic reach is dead. I switched to WhatsApp with MsgDrop for my Diwali sale and closed ₹18,000 in sales from one blast.", result: "₹18,000 sales from 1 blast" },
            { name: "Neha Gupta", biz: "Freelance Marketer, Pune", quote: "I manage 8 client accounts. MsgDrop's AI writes the Hindi messages perfectly. I save 3 hours every Sunday.", result: "Saved 3 hours/week" }
          ].map((t, i) => (
            <div key={i} style={{ flex: 1, background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32, display: "flex", flexDirection: "column" }}>
              <div style={{ color: C.amber, fontSize: 20, marginBottom: 16 }}>★★★★★</div>
              <p style={{ color: C.ink, lineHeight: 1.6, fontStyle: "italic", flex: 1, marginBottom: 24 }}>"{t.quote}"</p>
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
                <div style={{ fontWeight: 600, color: C.ink }}>{t.name}</div>
                <div style={{ fontSize: 13, color: C.muted }}>{t.biz}</div>
                <div style={{ marginTop: 8, display: "inline-block", background: C.greenPale, color: C.greenDim, fontSize: 12, fontWeight: 700, padding: "4px 8px", borderRadius: 4 }}>{t.result}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ background: C.white, borderTop: `1px solid ${C.border}` }}>
        <div className="section">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="tag">Pricing</div>
            <h2 className="font-display" style={{ fontSize: 40, fontWeight: 800 }}>Simple pricing. Cancel anytime.</h2>
          </div>
          
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 48, alignItems: "center" }}>
            <span style={{ fontWeight: !annual ? 600 : 400, color: !annual ? C.ink : C.muted }}>Monthly</span>
            <div 
              style={{ width: 48, height: 24, background: C.green, borderRadius: 20, position: "relative", cursor: "pointer" }}
              onClick={() => setAnnual(!annual)}
            >
              <div style={{ width: 20, height: 20, background: "white", borderRadius: "50%", position: "absolute", top: 2, left: annual ? 26 : 2, transition: "all 0.2s" }} />
            </div>
            <span style={{ fontWeight: annual ? 600 : 400, color: annual ? C.ink : C.muted }}>Annually <span style={{ color: C.greenDim, fontSize: 12, fontWeight: 700 }}>(Save 15%)</span></span>
          </div>

          <div className="mobile-col" style={{ display: "flex", gap: 24, alignItems: "stretch", justifyContent: "center", maxWidth: 1000, margin: "0 auto" }}>
            {/* Starter */}
            <div style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 32, display: "flex", flexDirection: "column" }}>
              <h3 className="font-display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Starter</h3>
              <p style={{ color: C.muted, fontSize: 14, marginBottom: 24 }}>Perfect for solopreneurs.</p>
              <div className="font-display" style={{ fontSize: 40, fontWeight: 800, marginBottom: 8 }}>
                ₹{annual ? "424" : "499"}<span style={{ fontSize: 16, color: C.muted, fontWeight: 400 }}>/mo</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", flex: 1 }}>
                {["Up to 500 contacts", "1,000 messages/month", "Basic templates", "Email support"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, fontSize: 14, color: C.ink }}>
                    <span style={{ color: C.green }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className="btn-ghost" style={{ width: "100%" }} onClick={navToLogin}>Start Free Trial</button>
            </div>

            {/* Growth */}
            <div className="pricing-growth" style={{ flex: 1.1, background: C.ink, color: C.white, border: `1px solid ${C.inkLight}`, borderRadius: 20, padding: 32, display: "flex", flexDirection: "column", transform: "scale(1.05)", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
              <div style={{ background: C.green, color: "white", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, padding: "4px 12px", borderRadius: 20, width: "fit-content", marginBottom: 16 }}>Most Popular</div>
              <h3 className="font-display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Growth</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 24 }}>For growing Indian SMBs.</p>
              <div className="font-display" style={{ fontSize: 40, fontWeight: 800, marginBottom: 8 }}>
                ₹{annual ? "1,699" : "1,999"}<span style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", fontWeight: 400 }}>/mo</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", flex: 1 }}>
                {["Unlimited contacts", "5,000 messages/month", "AI Message Writer (Hindi/Eng)", "2-Way Shared Inbox", "Automated Follow-ups"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, fontSize: 14, color: "white" }}>
                    <span style={{ color: C.green }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className="btn-primary" style={{ width: "100%" }} onClick={navToLogin}>Start Free Trial</button>
            </div>

            {/* Agency */}
            <div style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 32, display: "flex", flexDirection: "column" }}>
              <h3 className="font-display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Agency</h3>
              <p style={{ color: C.muted, fontSize: 14, marginBottom: 24 }}>Manage multiple clients.</p>
              <div className="font-display" style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>
                Custom
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", flex: 1 }}>
                {["Multiple sub-accounts", "White-label reports", "Volume message discounts", "Priority WhatsApp support"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, fontSize: 14, color: C.ink }}>
                    <span style={{ color: C.green }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className="btn-ghost" style={{ width: "100%" }} onClick={() => window.alert('Agency calendar integration coming soon!')}>Book a Call</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: C.surface }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="font-display" style={{ fontSize: 32, fontWeight: 800 }}>Frequently asked questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { q: "Is this legal to use in India?", a: "Yes. MsgDrop connects to official WhatsApp APIs, ensuring 100% compliance with local spam laws and Meta's policies." },
              { q: "Do my customers need the app?", a: "No! Your customers receive standard WhatsApp messages. They do not need to download or install anything new." },
              { q: "Can I send in Hindi?", a: "Absolutely. Our AI writer supports Hindi, Bengali, Tamil, Marathi, and Gujarati perfectly." },
              { q: "What happens to my contacts if I cancel?", a: "Your data is yours. You can export all your contacts and chat logs to a CSV at any time, even if you cancel." },
              { q: "Is it different from WhatsApp Business app?", a: "Yes. The standard WhatsApp Business app runs on one phone and has limit broadcasting. MsgDrop is a cloud CRM that allows automation, infinite scale, and multi-agent inbox access." }
            ].map((faq, i) => (
              <div key={i} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
                <button 
                  onClick={() => toggleFaq(i)}
                  style={{ width: "100%", padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", fontSize: 16, fontWeight: 600, color: C.ink }}
                >
                  {faq.q}
                  <span style={{ fontSize: 20, color: C.greenDim }}>{faqOpen === i ? "−" : "+"}</span>
                </button>
                {faqOpen === i && (
                  <div style={{ padding: "0 20px 20px", color: C.muted, lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: C.ink, color: "white", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 className="cta-h2 font-display" style={{ fontSize: 48, fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>
            Your customers are on WhatsApp. <br/>Are you?
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", marginBottom: 40 }}>Join 200+ Indian businesses using MsgDrop.</p>
          <button className="btn-primary" style={{ padding: "18px 40px", fontSize: 18, marginBottom: 16 }} onClick={navToLogin}>Start free — no credit card</button>
          
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 40, filter: "grayscale(100%)", opacity: 0.5 }}>
            <span style={{ fontWeight: 600, letterSpacing: 1 }}>META PARTNER</span>
            <span style={{ fontWeight: 600, letterSpacing: 1 }}>RAZORPAY SECURE</span>
            <span style={{ fontWeight: 600, letterSpacing: 1 }}>SSL ENCRYPTED</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px 24px", textAlign: "center", background: C.inkLight, color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
        © 2026 MsgDrop. All rights reserved. Built for Indian SMBs.
      </footer>
    </div>
  );
}
