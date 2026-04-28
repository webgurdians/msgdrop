import { createPortal } from 'react-dom';
import { G } from '../../theme';

export const Avatar = ({ initials, color, size = 32 }: { initials: string; color: string; size?: number }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: color + "22", border: `1.5px solid ${color}55`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.35, fontWeight: 700, color, flexShrink: 0,
  }}>{initials}</div>
);

export const Tag = ({ label, color }: { label: string; color?: string }) => {
  const map: Record<string, { bg: string; c: string }> = {
    "VIP":      { bg: "rgba(167,139,250,.15)", c: "#a78bfa" },
    "At Risk":  { bg: "rgba(248,113,113,.15)", c: G.red },
    "Regular":  { bg: "rgba(34,197,94,.13)",   c: G.green },
    "New":      { bg: "rgba(45,212,191,.13)",   c: G.teal },
  };
  const s = map[label] || { bg: `${color}22`, c: color };
  return (
    <span style={{
      background: s.bg, color: s.c, fontSize: 10.5, fontWeight: 700,
      padding: "2px 8px", borderRadius: 20, letterSpacing: .4,
    }}>{label}</span>
  );
};

export const StatusDot = ({ status }: { status: "live" | "scheduled" | "draft" | string }) => {
  const map: Record<string, string> = { live: G.green, scheduled: G.amber, draft: G.muted };
  const color = map[status] || G.muted;
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <span style={{
        width: 7, height: 7, borderRadius: "50%", background: color,
        boxShadow: status === "live" ? `0 0 6px ${color}` : "none",
        animation: status === "live" ? "pulse 2s infinite" : "none",
      }} />
      <span style={{ fontSize: 11.5, color: color, fontWeight: 600, textTransform: "capitalize" }}>{status}</span>
    </span>
  );
};

export const Btn = ({ children, onClick, variant = "primary", sm, style = {} }: any) => {
  const styles: Record<string, any> = {
    primary: { background: G.green, color: "#000", fontWeight: 700 },
    ghost:   { background: "transparent", color: G.muted, border: `1px solid ${G.border}` },
    danger:  { background: "rgba(248,113,113,.1)", color: G.red, border: `1px solid rgba(248,113,113,.2)` },
    teal:    { background: "rgba(45,212,191,.1)", color: G.teal, border: `1px solid rgba(45,212,191,.2)` },
  };
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
      padding: sm ? "6px 12px" : "9px 16px",
      borderRadius: 9, fontSize: sm ? 12 : 13, border: "none",
      fontFamily: "Inter, sans-serif", fontWeight: 600,
      transition: "all .18s", cursor: "pointer", ...styles[variant], ...style,
    }}>{children}</button>
  );
};

export const ProgressBar = ({ value, max, color }: { value: number; max: number; color: string }) => (
  <div style={{ height: 4, background: G.border, borderRadius: 4, overflow: "hidden" }}>
    <div style={{ height: "100%", width: `${Math.round((value / max) * 100)}%`, background: color, borderRadius: 4, transition: "width .6s ease" }} />
  </div>
);

export const Card = ({ children, style = {}, className = "" }: any) => (
  <div className={className} style={{
    background: G.card, border: `1px solid ${G.border}`,
    borderRadius: 14, padding: 20, ...style,
  }}>{children}</div>
);

export const StatCard = ({ label, value, trend, color, icon }: any) => (
  <Card className="fade-up" style={{ padding: "18px 20px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: .9, color: G.muted, fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 30, fontWeight: 800, fontFamily: "Syne, sans-serif", color: color || G.text, margin: "6px 0 4px", letterSpacing: -1 }}>{value}</div>
        <div style={{ fontSize: 12, color: G.teal }}>{trend}</div>
      </div>
      <div style={{ fontSize: 26, opacity: .7 }}>{icon}</div>
    </div>
  </Card>
);

export const Modal = ({ title, onClose, children }: any) => {
  return createPortal(
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", backdropFilter: "blur(4px)",
      zIndex: 1000, overflowY: "auto", padding: "10vh 20px"
    }} onClick={onClose}>
      <div className="pop-in" onClick={e => e.stopPropagation()} style={{
        background: G.surface, border: `1px solid ${G.borderHi}`, borderRadius: 18,
        padding: 28, width: "100%", maxWidth: 540, boxSizing: "border-box", margin: "0 auto",
        display: "flex", flexDirection: "column", minHeight: 200
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "Syne, sans-serif" }}>{title}</div>
          <button onClick={onClose} style={{ background: G.border, border: "none", color: G.muted, width: 28, height: 28, borderRadius: "50%", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        <div style={{ width: "100%", display: "block", visibility: "visible" }}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export const Field = ({ label, children }: any) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: .8, color: G.muted, fontWeight: 600, display: "block", marginBottom: 6 }}>{label}</label>
    {children}
  </div>
);

export const Input = ({ value, onChange, placeholder, multiline, rows = 3 }: any) => {
  const base = {
    width: "100%", background: G.card, border: `1px solid ${G.border}`,
    borderRadius: 9, padding: "9px 12px", color: G.text, fontSize: 13.5,
    outline: "none", resize: "vertical" as const, fontFamily: "Inter, sans-serif"
  };
  return multiline
    ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} style={base} />
    : <input value={value} onChange={onChange} placeholder={placeholder} style={{ ...base, height: 38 }} />;
};
