import { useNavigate } from 'react-router-dom';

const WA_LINK = "https://wa.me/9134859689?text=Hi%20MsgDrop!%20I%20want%20a%20free%20demo%20for%20my%20business.";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#FFFDF9", color: "#000", fontFamily: "'Inter', sans-serif", minHeight: "100vh", overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;800&family=Inter:wght@400;600;800&display=swap');
        
        h1, h2, h3, .font-display { font-family: 'Syne', sans-serif; letter-spacing: -0.03em; }
        
        .nano-btn {
          background: #25D366; color: #000; border: 3px solid #000; box-shadow: 4px 4px 0 #000;
          font-weight: 800; padding: 16px 32px; border-radius: 12px; cursor: pointer;
          transition: all 0.2s; text-transform: uppercase; letter-spacing: 0.5px;
          text-decoration: none; display: inline-flex; alignItems: center; gap: 8px; fontSize: 16px;
        }
        .nano-btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 #000; }
        .nano-btn.inverse { background: #FFD700; }
        
        .nano-card {
          background: #fff; border: 3px solid #000; border-radius: 20px; box-shadow: 6px 6px 0 #000;
          padding: 32px; transition: transform 0.2s; height: 100%; display: flex; flex-direction: column;
        }
        .nano-card:hover { transform: translateY(-4px); }
        
        .section { padding: 100px 24px; max-width: 1200px; margin: 0 auto; }
        .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; }
        .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
        
        .tag {
          display: inline-block; background: #FFD700; color: #000; border: 2px solid #000;
          font-weight: 800; text-transform: uppercase; padding: 6px 14px; border-radius: 20px;
          margin-bottom: 24px; font-size: 13px; box-shadow: 2px 2px 0 #000;
        }

        /* Mockup CSS */
        .phone-mockup {
          border: 4px solid #000; border-radius: 40px; background: #fff; width: 320px; height: 600px;
          box-shadow: 12px 12px 0 rgba(0,0,0,0.1); position: relative; overflow: hidden; margin: 0 auto;
        }
        .phone-notch { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 120px; height: 24px; background: #000; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; z-index: 10; }
        .wa-chat-bubble {
          background: #E7FFDB; border: 2px solid #000; border-radius: 16px 0 16px 16px;
          padding: 16px; margin: 80px 20px 20px; font-size: 15px; line-height: 1.5;
          box-shadow: 3px 3px 0 #000; position: relative;
        }
        
        @media (max-width: 768px) {
          .section { padding: 60px 16px; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px; text-align: center; }
          .hero-h1 { font-size: 36px !important; word-break: break-word; line-height: 1.2 !important; }
          .hero-btns { justify-content: center; }
          .stepper-arrow { display: none; }
          .hide-mobile { display: none !important; }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{ padding: "20px 24px", borderBottom: "3px solid #000", background: "#fff", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => window.scrollTo(0,0)}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "#25D366", border: "2px solid #000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: "2px 2px 0 #000" }}>💬</div>
            <div className="font-display" style={{ fontSize: 26, fontWeight: 800 }}>MsgDrop</div>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <button onClick={() => navigate('/login')} style={{ background: "none", border: "none", fontWeight: 800, fontSize: 16, cursor: "pointer", textDecoration: "underline" }} className="hide-mobile">Login</button>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="nano-btn" style={{ padding: "10px 20px", fontSize: 14 }}>
              Chat with us
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ borderBottom: "3px solid #000", background: "#f4f4f0", overflow: "hidden" }}>
        <div className="section hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: 60 }}>
          <div>
            <div className="tag">📍 #1 Local Growth Partner</div>
            <h1 className="hero-h1 font-display" style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
              Stop Losing Customers.<br/>
              <span style={{ color: "#25D366", textShadow: "2px 2px 0 #000" }}>Bring Them Back</span><br/>
              Automatically.
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.6, marginBottom: 40, fontWeight: 600, color: "#333" }}>
              The only AI WhatsApp tool built for West Bengal's Salons, Gyms, and Clinics to automate reminders and increase repeat bookings by 20%.
            </p>
            <div className="hero-btns" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href={WA_LINK} target="_blank" rel="noreferrer" className="nano-btn">
                <span>💬</span> Chat with us for a Free Demo
              </a>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div className="phone-mockup">
              <div className="phone-notch" />
              <div style={{ background: "#075E54", color: "#fff", padding: "30px 20px 15px", fontWeight: 600, fontSize: 18, borderBottom: "2px solid #000" }}>
                WhatsApp
              </div>
              <div style={{ background: "#E5DDD5", height: "100%", padding: "1px" }}>
                <div className="wa-chat-bubble">
                  <strong>MsgDrop AI</strong><br/>
                  Hi Rahul! It's time for your next haircut at <strong>The Style Lounge</strong>. Book your slot now! ✂️🔥
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Point Grid */}
      <section className="section" style={{ borderBottom: "3px solid #000" }}>
        <h2 className="font-display" style={{ fontSize: 48, fontWeight: 800, textAlign: "center", marginBottom: 60 }}>
          Running a local business is hard.<br/>Let MsgDrop handle the hustle.
        </h2>
        <div className="grid-3">
          {[
            { icon: "⏰", prob: "Tired of Manual Calling?", sol: "MsgDrop sends 1,000s of reminders in one click." },
            { icon: "🪑", prob: "Empty Slots on Tuesdays?", sol: "Fill your gaps by reminding old clients to return." },
            { icon: "💸", prob: "Clients forgetting you?", sol: "Stay 'Top of Mind' with AI-driven repeat booking alerts." }
          ].map((item, i) => (
            <div key={i} className="nano-card" style={{ background: "#fff" }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>{item.icon}</div>
              <h3 className="font-display" style={{ fontSize: 24, fontWeight: 800, marginBottom: 12, color: "#000" }}>{item.prob}</h3>
              <div style={{ height: 4, background: "#25D366", width: 40, marginBottom: 16 }} />
              <p style={{ fontSize: 18, fontWeight: 600, color: "#444", lineHeight: 1.5 }}>{item.sol}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Niche Selector */}
      <section className="section" style={{ background: "#FFD700", borderBottom: "3px solid #000" }}>
        <h2 className="font-display" style={{ fontSize: 48, fontWeight: 800, textAlign: "center", marginBottom: 60 }}>
          Built for West Bengal's fastest growing niches.
        </h2>
        <div className="grid-3">
          {[
            { icon: "💇‍♂️", title: "Salons & Spas", desc: "Automate facial and hair-cut reminders. Stop the customer churn." },
            { icon: "💪", title: "Gyms & Fitness", desc: "Remind members about expiring subscriptions. Boost renewals." },
            { icon: "🦷", title: "Clinics & Dentists", desc: "Reduce no-shows. Send automated appointment alerts to patients." }
          ].map((item, i) => (
            <div key={i} className="nano-card" style={{ background: "#fff" }}>
              <div style={{ fontSize: 60, marginBottom: 16 }}>{item.icon}</div>
              <h3 className="font-display" style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>{item.title}</h3>
              <p style={{ fontSize: 16, fontWeight: 600, color: "#444", marginBottom: 24, flex: 1 }}>{item.desc}</p>
              <a href={WA_LINK} target="_blank" rel="noreferrer" className="nano-btn" style={{ width: "100%", justifyContent: "center", padding: "12px" }}>
                See how it works →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Stepper Process */}
      <section className="section" style={{ borderBottom: "3px solid #000" }}>
        <div className="tag" style={{ display: "table", margin: "0 auto 24px" }}>The Simple Path</div>
        <h2 className="font-display" style={{ fontSize: 48, fontWeight: 800, textAlign: "center", marginBottom: 60 }}>
          Launch your first campaign in 5 minutes.
        </h2>
        <div className="grid-4" style={{ position: "relative" }}>
          {[
            { step: "01", title: "Upload your list", desc: "CSV or manual entry." },
            { step: "02", title: "Set your Timing", desc: "e.g., Remind every 30 days." },
            { step: "03", title: "AI sends the magic", desc: "Personalized WhatsApp messages." },
            { step: "04", title: "Watch bookings grow", desc: "More customers, more revenue." }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
              <div style={{ width: 64, height: 64, background: "#25D366", color: "#000", border: "3px solid #000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, margin: "0 auto 24px", boxShadow: "4px 4px 0 #000" }}>
                {item.step}
              </div>
              <h3 className="font-display" style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>{item.title}</h3>
              <p style={{ fontWeight: 600, color: "#555" }}>{item.desc}</p>
            </div>
          ))}
          {/* Connecting Line (hidden on mobile via CSS) */}
          <div className="stepper-arrow" style={{ position: "absolute", top: 32, left: "12.5%", right: "12.5%", height: 3, background: "#000", zIndex: 1, borderTop: "3px dashed #000", backgroundColor: "transparent" }} />
        </div>
      </section>

      {/* Founder / Trust Section */}
      <section className="section" style={{ borderBottom: "3px solid #000", background: "#f4f4f0" }}>
        <div className="nano-card" style={{ maxWidth: 900, margin: "0 auto", padding: "40px", display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap", flexDirection: "row" }}>
          <div style={{ flex: "1 1 300px" }}>
            <div style={{ width: "100%", aspectRatio: "1", borderRadius: 20, border: "4px solid #000", boxShadow: "8px 8px 0 #25D366", overflow: "hidden", background: "#ddd" }}>
              {/* Note: User must upload neel.jpg to frontend/public/ */}
              <img src="/neel.jpg" alt="Neel, Founder of MsgDrop" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <div style={{ padding: 40, textAlign: "center", fontWeight: 800, color: "#888" }} className="img-fallback">Founder Photo</div>
            </div>
          </div>
          <div style={{ flex: "2 1 400px" }}>
            <h2 className="font-display" style={{ fontSize: 40, fontWeight: 800, marginBottom: 24 }}>
              A Tool Built for West Bengal.
            </h2>
            <p style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.6, marginBottom: 24 }}>
              "I'm the founder of MsgDrop. I saw local shops in Kolkata and Nadia struggling to keep track of customers. I built this AI tool to give local SMBs the same power as big national chains. No complicated software—just more customers."
            </p>
            <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "Syne, sans-serif" }}>Neel</div>
            <div style={{ fontWeight: 600, color: "#555" }}>Founder of MsgDrop</div>
          </div>
        </div>
      </section>

      {/* Final Closer */}
      <section style={{ background: "#25D366", padding: "100px 24px", textAlign: "center", borderBottom: "12px solid #000" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontSize: 64, fontWeight: 800, marginBottom: 24, lineHeight: 1.1, color: "#000" }}>
            Ready to fill your appointment book?
          </h2>
          <p style={{ fontSize: 24, fontWeight: 600, marginBottom: 48, color: "#000" }}>
            No credit cards. No complex signups. Just a 2-minute demo.
          </p>
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="nano-btn inverse" style={{ fontSize: 24, padding: "20px 48px", borderRadius: 100 }}>
            <span>💬</span> WhatsApp Us Now
          </a>
        </div>
      </section>

      <footer style={{ background: "#000", color: "#fff", padding: "40px 24px", textAlign: "center", fontWeight: 600 }}>
        © 2026 MsgDrop. Built with ❤️ for West Bengal SMBs.
      </footer>
    </div>
  );
}
