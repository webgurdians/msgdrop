import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { G } from '../theme';
import { Card, Avatar, Btn } from '../components/ui';
import { useCRMData } from '../data/mock';

export default function Inbox() {
  const location = useLocation();
  const { INBOX, CONTACTS } = useCRMData();
  const [inboxList, setInboxList] = useState(INBOX);
  const [active, setActive] = useState<any>(null);
  const [reply, setReply] = useState("");
  const [msgs, setMsgs] = useState<Record<number, string[]>>({ 1: ["Can I book for Saturday?"], 2: ["What's the monthly gym fee?"], 3: ["CONFIRM ✅"], 4: ["Is the Puja offer still valid?"], 5: ["Thank you! See you soon 🙏"], 6: ["Book me for Sunday facial please"] });

  useEffect(() => {
    let currentInbox = INBOX;
    const { contactId } = location.state || {};
    
    let targetChat = null;
    if (contactId) {
      targetChat = currentInbox.find(m => m.id === contactId);
      if (!targetChat) {
        // Find contact and create a dummy inbox item if not exists
        const contact = CONTACTS.find(c => c.id === contactId);
        if (contact) {
          targetChat = { id: contact.id, name: contact.name, avatar: contact.avatar, color: contact.color, msg: "Say hi!", time: "Now", unread: false, type: "query" };
          currentInbox = [targetChat, ...currentInbox];
        }
      }
    }
    
    setInboxList(currentInbox);
    
    if (targetChat) {
      setActive(targetChat);
    } else if (currentInbox.length > 0 && !active) {
      setActive(currentInbox[0]);
    } else if (currentInbox.length === 0) {
      setActive(null);
    }
  }, [INBOX.length, location.state]);

  const send = () => {
    if (!reply.trim() || !active) return;
    setMsgs(prev => ({ ...prev, [active.id]: [...(prev[active.id] || []), `You: ${reply}`] }));
    setReply("");
  };

  return (
    <div className="fade-up" style={{ display: "flex", flexWrap: "wrap", gap: 14, minHeight: "calc(100vh - 160px)" }}>
      {/* Sidebar */}
      <Card style={{ flex: "1 1 300px", padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "400px" }}>
        <div style={{ padding: "14px 14px 10px", borderBottom: `1px solid ${G.border}`, fontWeight: 700, fontSize: 13, fontFamily: "Syne,sans-serif" }}>
          📥 Inbox {inboxList.length > 0 && <span style={{ background: G.green + "22", color: G.green, fontSize: 10.5, fontWeight: 700, padding: "1px 7px", borderRadius: 20, marginLeft: 6 }}>2 new</span>}
        </div>
        <div style={{ overflowY: "auto", flex: 1 }} className="hide-scrollbar">
          {inboxList.length === 0 ? (
            <div style={{ padding: 20, textAlign: "center", color: G.muted, fontSize: 13 }}>No messages</div>
          ) : inboxList.map(m => (
            <div key={m.id} onClick={() => setActive(m)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
              borderBottom: `1px solid ${G.border}33`, cursor: "pointer",
              background: active?.id === m.id ? G.cardHover : "transparent",
              borderLeft: active?.id === m.id ? `3px solid ${G.green}` : "3px solid transparent",
              transition: "all .15s",
            }}>
              <Avatar initials={m.avatar} color={m.color} size={34} />
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <div style={{ fontWeight: 600, fontSize: 12.5 }}>{m.name}</div>
                  <div style={{ fontSize: 10.5, color: G.muted }}>{m.time}</div>
                </div>
                <div style={{ fontSize: 11.5, color: G.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.msg}</div>
              </div>
              {m.unread && <div style={{ width: 7, height: 7, borderRadius: "50%", background: G.green, flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </Card>

      {/* Chat area */}
      <Card style={{ flex: "2 1 300px", display: "flex", flexDirection: "column", padding: 0, overflow: "hidden", minHeight: "500px" }}>
        {active ? (
          <>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderBottom: `1px solid ${G.border}` }}>
              <Avatar initials={active.avatar} color={active.color} size={36} />
              <div>
                <div style={{ fontWeight: 700, fontFamily: "Syne,sans-serif" }}>{active.name}</div>
                <div style={{ fontSize: 11.5, color: G.green }}>● Active now</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                <Btn sm variant="teal">🤖 AI Reply</Btn>
                <Btn sm variant="ghost">View Profile</Btn>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10 }} className="hide-scrollbar">
              {(msgs[active.id] || []).map((m, i) => {
                const isMe = m.startsWith("You: ");
                return (
                  <div key={i} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
                    <div style={{
                      background: isMe ? G.green : G.surface, color: isMe ? "#000" : G.text,
                      borderRadius: isMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                      padding: "10px 14px", fontSize: 13, maxWidth: "70%",
                      border: isMe ? "none" : `1px solid ${G.border}`,
                    }}>{isMe ? m.replace("You: ", "") : m}</div>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <div style={{ padding: "12px 16px", borderTop: `1px solid ${G.border}`, display: "flex", gap: 8 }}>
              <input value={reply} onChange={e => setReply(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
                placeholder="Type a message…" style={{ flex: 1, background: G.surface, border: `1px solid ${G.border}`, borderRadius: 10, padding: "9px 14px", color: G.text, fontSize: 13.5, outline: "none", fontFamily: "Inter, sans-serif" }} />
              <Btn onClick={send}>Send ↑</Btn>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: G.muted }}>
            Select a conversation to view messages
          </div>
        )}
      </Card>
    </div>
  );
}
