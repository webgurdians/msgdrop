import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { G } from '../../theme';
import { Btn } from '../ui';

const TABS = [
  { id: "dashboard", path: "/dashboard",           label: "Dashboard",   icon: "◉", section: "Overview" },
  { id: "campaigns", path: "/dashboard/campaigns", label: "Campaigns",   icon: "📣", section: "Automation", badge: 4 },
  { id: "inbox",     path: "/dashboard/inbox",     label: "Inbox",       icon: "💬", section: "Automation", badge: 2 },
  { id: "ai",        path: "/dashboard/ai",        label: "AI Replies",  icon: "🤖", section: "Automation" },
  { id: "contacts",  path: "/dashboard/contacts",  label: "Contacts",    icon: "👥", section: "Data" },
  { id: "analytics", path: "/dashboard/analytics", label: "Analytics",   icon: "📈", section: "Data" },
];

const PAGE_TITLES: Record<string, string[]> = {
  "/dashboard":           ["Good morning 👋", "Here's your MsgDrop overview"],
  "/dashboard/campaigns": ["Campaigns", "Automate follow-ups, reminders & promos"],
  "/dashboard/inbox":     ["Inbox", "Manage customer conversations"],
  "/dashboard/ai":        ["AI Auto-Reply", "Configure your WhatsApp bot"],
  "/dashboard/contacts":  ["Contacts", "Your customer database"],
  "/dashboard/analytics": ["Analytics", "Track performance & ROI"],
};

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);
  
  useEffect(() => {
    // Handle OAuth redirect parsing
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const email = params.get('email');
    if (token && email) {
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', email);
      navigate('/dashboard', { replace: true });
    }
  }, [location, navigate]);
  
  const sections = [...new Set(TABS.map(t => t.section))];
  const currentPath = location.pathname;
  const [title, subtitle] = PAGE_TITLES[currentPath] || ["MsgDrop", "WhatsApp CRM Platform"];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <style>{`
        .sidebar { transform: translateX(0); transition: transform 0.3s ease; }
        .main-content { margin-left: 220px; transition: margin-left 0.3s ease; }
        .hamburger { display: none; }
        .overlay { display: none; }
        @media (max-width: 768px) {
          .sidebar { transform: translateX(-100%); width: 260px !important; }
          .sidebar.open { transform: translateX(0); }
          .main-content { margin-left: 0 !important; padding: 20px 16px !important; }
          .hamburger { display: flex !important; }
          .overlay.open { display: block; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 90; backdrop-filter: blur(2px); }
          .header-actions { display: none !important; }
        }
      `}</style>
      
      {/* Mobile Overlay */}
      <div className={`overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} style={{
        width: 220, background: G.surface, borderRight: `1px solid ${G.border}`,
        position: "fixed", top: 0, bottom: 0, left: 0, display: "flex", flexDirection: "column", zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ padding: "22px 18px 18px", borderBottom: `1px solid ${G.border}`, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: G.green,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
            animation: "glow 3s ease-in-out infinite", flexShrink: 0,
          }}>💬</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "Syne,sans-serif", letterSpacing: -.3, color: G.text }}>MsgDrop</div>
            <div style={{ fontSize: 10, color: G.muted, letterSpacing: .6, textTransform: "uppercase" }}>WhatsApp CRM</div>
          </div>
        </div>

        {/* Business badge */}
        <div style={{ margin: "10px 10px 4px", background: G.card, border: `1px solid ${G.border}`, borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: G.green, animation: "pulse 2s infinite" }} />
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 600 }}>My Salon, Kolkata</div>
            <div style={{ fontSize: 10.5, color: G.muted }}>+91 90461 05790</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "8px 10px", overflowY: "auto" }}>
          {sections.map(sec => (
            <div key={sec}>
              <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 1.2, color: G.muted, padding: "10px 10px 5px", fontWeight: 700 }}>{sec}</div>
              {TABS.filter(t => t.section === sec).map(t => {
                const isActive = currentPath === t.path;
                return (
                  <Link key={t.id} to={t.path} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
                    borderRadius: 8, cursor: "pointer", fontSize: 13.5, fontWeight: 500,
                    marginBottom: 2, transition: "all .15s", textDecoration: "none",
                    background: isActive ? G.greenGlow : "transparent",
                    color: isActive ? G.green : G.muted,
                    border: isActive ? `1px solid rgba(34,197,94,.18)` : "1px solid transparent",
                  }}>
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                    {t.badge && (
                      <span style={{ marginLeft: "auto", background: G.green, color: "#000", fontSize: 10, fontWeight: 800, padding: "1px 6px", borderRadius: 20 }}>{t.badge}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div 
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/');
          }}
          style={{ padding: "12px 14px", borderTop: `1px solid ${G.border}`, fontSize: 12, color: G.red, textAlign: "center", cursor: "pointer", fontWeight: 600 }}
        >
          Sign Out 🚪
        </div>
      </div>

      {/* Main content */}
      <div className="main-content" style={{ flex: 1, padding: "28px 30px", minHeight: "100vh" }}>
        <div className="fade-up" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="hamburger" onClick={() => setSidebarOpen(true)} style={{ background: "transparent", border: "none", color: G.text, fontSize: 24, cursor: "pointer", padding: 4 }}>
              ☰
            </button>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "Syne,sans-serif", letterSpacing: -.5 }}>{title}</div>
              <div style={{ fontSize: 13, color: G.muted, marginTop: 2 }}>{subtitle}</div>
            </div>
          </div>
          <div className="header-actions" style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ fontSize: 12, color: G.muted, background: G.card, border: `1px solid ${G.border}`, borderRadius: 8, padding: "7px 12px" }}>
              🟢 WhatsApp Connected
            </div>
            <Btn onClick={() => navigate("/dashboard/campaigns", { state: { openNew: true } })}>＋ New Campaign</Btn>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
