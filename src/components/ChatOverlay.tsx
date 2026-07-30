import { useState, useRef, useEffect, useCallback } from "react";

const CHATBOT_URL = "https://ekezxcbmsybmtpwvnkpc.supabase.co/functions/v1/aria-aichatbot";
const CHATBOT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZXp4Y2Jtc3libXRwd3Zua3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzMyODksImV4cCI6MjA4ODIwOTI4OX0.rhOUb9C1QFmQmTbaa64wgY8zA-Yjslx9ccCjQ9MknRQ";
const LEADS_URL = "https://kbutjoxdyolamecjjcny.supabase.co";
const LEADS_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidXRqb3hkeW9sYW1lY2pqY255Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1OTQ1MTMsImV4cCI6MjA4NzE3MDUxM30.SbH2YxcT3AJDC2ztNRLobBOFaWCs8n_xGWAkX5OSVds";
const FORMSPREE = "https://formspree.io/f/xjkebzoq";
const LOGO_URL = "https://images2.imgbox.com/26/e7/4aGfmDdL_o.jpg";

interface Message {
  role: "assistant" | "user";
  content: string;
  buttons?: string[];
}

interface PrefillData {
  full_name?: string;
  country_from?: string;
  country?: string;
  specialisation?: string;
  study_level?: string;
  ielts?: string;
  budget?: string;
  intake?: string;
  whatsapp?: string;
  phone?: string;
  email?: string;
  [key: string]: string | undefined;
}

function parseButtons(text: string): { clean: string; buttons: string[] } {
  const m = text.match(/BUTTONS:(\[[\s\S]*?\])/);
  if (!m) return { clean: text.trim(), buttons: [] };
  try {
    return { clean: text.replace(/BUTTONS:\[[\s\S]*?\]/, "").trim(), buttons: JSON.parse(m[1]) };
  } catch {
    return { clean: text.trim(), buttons: [] };
  }
}

interface ChatOverlayProps {
  open: boolean;
  onClose: () => void;
}

const FIELD_LABELS: [keyof PrefillData, string][] = [
  ["full_name", "Name"],
  ["country_from", "From"],
  ["country", "Studying in"],
  ["specialisation", "Subject"],
  ["study_level", "Level"],
  ["ielts", "IELTS"],
  ["budget", "Budget"],
  ["intake", "Start date"],
  ["whatsapp", "WhatsApp"],
  ["email", "Email"],
];

const LogoAvatar = ({ size = 30 }: { size?: number }) => (
  <div
    style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      overflow: "hidden", background: "rgba(255,255,255,0.25)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}
  >
    <img src={LOGO_URL} alt="Universe In" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </div>
);

export default function ChatOverlay({ open, onClose }: ChatOverlayProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [inited, setInited] = useState(false);
  const [typing, setTyping] = useState(false);
  const [prefill, setPrefill] = useState<PrefillData | null>(null);
  const [editedPrefill, setEditedPrefill] = useState<PrefillData | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const msgsRef = useRef<HTMLDivElement>(null);

  const orange = "linear-gradient(135deg, #FF5A0A, #ff8c00)";

  const scrollBottom = () => {
    setTimeout(() => {
      if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }, 50);
  };

  const callAPI = async (body: object) => {
    const r = await fetch(CHATBOT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${CHATBOT_KEY}` },
      body: JSON.stringify(body),
    });
    return r.json();
  };

  const addBot = useCallback((content: string, buttons: string[] = []) => {
    setMessages((prev) => [...prev, { role: "assistant", content, buttons }]);
    scrollBottom();
  }, []);

  const initChat = useCallback(async () => {
    setTyping(true);
    try {
      const d = await callAPI({ messages: [], initiate: true });
      if (d.reply) {
        const { clean, buttons } = parseButtons(d.reply);
        addBot(clean, buttons);
      }
    } catch {
      addBot("Continue in English? / Продолжить на русском?", ["\uD83C\uDDF7\uD83C\uDDFA Русский", "\uD83C\uDDEC\uD83C\uDDE7 English", "\uD83C\uDDFA\uD83C\uDDFF O'zbek"]);
    }
    setTyping(false);
  }, [addBot]);

  useEffect(() => {
    if (open && !inited) { setInited(true); initChat(); }
  }, [open, inited, initChat]);

  const doSend = async (text: string) => {
    setMessages((prev) => prev.map((m) => ({ ...m, buttons: undefined })));
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    const newHistory = [...history, { role: "user", content: text }];
    setHistory(newHistory);
    setLoading(true);
    setTyping(true);
    scrollBottom();
    try {
      const d = await callAPI({ messages: newHistory });
      if (d.reply) {
        const { clean, buttons } = parseButtons(d.reply);
        addBot(clean, buttons);
        setHistory((h) => [...h, { role: "assistant", content: clean }]);
      }
      if (d.prefill) {
        setPrefill(d.prefill);
        setEditedPrefill(d.prefill);
        setIsEditing(false);
        setTimeout(() => { setShowSummary(true); setShowInput(false); }, 300);
      }
    } catch {
      addBot("Sorry, something went wrong. Please try again.");
    }
    setTyping(false);
    setLoading(false);
  };

  const sendMsg = () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    doSend(text);
  };

  const submitLead = async () => {
    const data = editedPrefill || prefill;
    if (!data) return;
    setShowSummary(false);
    setIsEditing(false);
    setShowInput(true);
    setLoading(true);
    setTyping(true);
    try {
      await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const sc = await callAPI({ scoreOnly: true, leadData: data });
      const sv = sc.score ?? 50;
      const sl = sc.label ?? "Warm";
      const sr = sc.reasoning ?? "Manual review.";
      await fetch(`${LEADS_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": LEADS_KEY,
          "Authorization": `Bearer ${LEADS_KEY}`,
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({
          ...data,
          source: "Landing Page",
          status: "new",
          score_value: sv,
          score_label: sl,
          score_reasoning: sr,
          contacted: false,
        }),
      });
      addBot("Thank you " + (data.full_name || "") + "! One of our advisors will personally message you on WhatsApp within 24 hours \uD83C\uDFAF");
    } catch {
      addBot("Thank you! Our team will be in touch very soon.");
    }
    setTyping(false);
    setLoading(false);
    setPrefill(null);
    setEditedPrefill(null);
  };

  const displayData = editedPrefill || prefill;

  const summaryFields = displayData
    ? FIELD_LABELS.map(([key, label]) => ({
        key,
        label,
        value: key === "whatsapp" ? (displayData.whatsapp || displayData.phone || "") : (displayData[key] || ""),
      })).filter((f) => f.value)
    : [];

  return (
    <>
      <div
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "16px 16px env(safe-area-inset-bottom, 16px) 16px",
          opacity: open ? 1 : 0, pointerEvents: open ? "all" : "none",
          transition: "opacity 0.3s ease", overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%", maxWidth: 480,
            height: "min(680px, calc(100dvh - 32px))",
            background: "#fff", borderRadius: 20,
            display: "flex", flexDirection: "column",
            overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
            transform: open ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
            transition: "transform 0.35s cubic-bezier(.34,1.2,.64,1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              flexShrink: 0, padding: "14px 18px", background: orange,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <LogoAvatar size={36} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>Aria · Universe In</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>Online now</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%",
                width: 32, height: 32, cursor: "pointer", color: "#fff", fontSize: 16,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              &#x2715;
            </button>
          </div>

          {/* Messages */}
          <div
            ref={msgsRef}
            style={{
              flex: 1, overflowY: "auto", padding: "18px 14px",
              display: "flex", flexDirection: "column", gap: 14, minHeight: 0,
            }}
          >
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", gap: 10, flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
                {msg.role === "assistant" ? (
                  <LogoAvatar size={30} />
                ) : (
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, background: "#f3f4f6",
                  }}>&#x1F464;</div>
                )}
                <div style={{ maxWidth: "78%", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{
                    padding: "11px 14px",
                    borderRadius: msg.role === "user" ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
                    fontSize: 14, lineHeight: 1.6,
                    background: msg.role === "user" ? orange : "#f9fafb",
                    color: msg.role === "user" ? "#fff" : "#111",
                    border: msg.role === "assistant" ? "1px solid #e5e7eb" : "none",
                    wordBreak: "break-word",
                  }}>
                    {msg.content}
                  </div>
                  {msg.buttons && msg.buttons.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {msg.buttons.map((btn, bi) => (
                        <button
                          key={bi}
                          onClick={() => {
                            setMessages((prev) => prev.map((m) => ({ ...m, buttons: undefined })));
                            doSend(btn);
                          }}
                          style={{
                            padding: "8px 14px", borderRadius: 20,
                            border: "1.5px solid #ffd4b8", background: "#fff3ee",
                            color: "#FF5A0A", fontSize: 13, fontWeight: 600,
                            cursor: "pointer", fontFamily: "inherit",
                          }}
                        >
                          {btn}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div style={{ display: "flex", gap: 10 }}>
                <LogoAvatar size={30} />
                <div style={{
                  padding: "14px 16px", borderRadius: "4px 18px 18px 18px",
                  background: "#f9fafb", border: "1px solid #e5e7eb",
                  display: "flex", gap: 5, alignItems: "center",
                }}>
                  {[0, 0.18, 0.36].map((d, i) => (
                    <div key={i} style={{
                      width: 7, height: 7, borderRadius: "50%", background: "#d1d5db",
                      animation: `typingBounce 1.2s infinite ${d}s`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            {/* SUMMARY CARD */}
            {showSummary && displayData && (
              <div style={{
                background: "#f9fafb", border: "1.5px solid #ffd4b8",
                borderRadius: 16, overflow: "hidden", flexShrink: 0,
              }}>
                {/* Card header */}
                <div style={{
                  padding: "12px 16px", background: "#fff3ee",
                  borderBottom: "1px solid #ffd4b8",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>
                    {isEditing ? "Edit your details" : "Does everything look right?"}
                  </span>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      style={{
                        background: "none", border: "1.5px solid #FF5A0A",
                        borderRadius: 8, padding: "3px 10px",
                        color: "#FF5A0A", fontSize: 12, fontWeight: 600,
                        cursor: "pointer", fontFamily: "inherit",
                      }}
                    >
                      &#x270F;&#xFE0F; Edit
                    </button>
                  )}
                </div>

                {/* Fields */}
                <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                  {isEditing ? (
                    // EDITABLE fields
                    FIELD_LABELS.map(([key, label]) => {
                      const val = key === "whatsapp"
                        ? (editedPrefill?.whatsapp || editedPrefill?.phone || "")
                        : (editedPrefill?.[key] || "");
                      return (
                        <div key={key as string} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                          <span style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                            {label}
                          </span>
                          <input
                            value={val}
                            onChange={(e) => {
                              const fieldKey = key === "whatsapp" ? "whatsapp" : key;
                              setEditedPrefill((prev) => ({ ...prev, [fieldKey]: e.target.value }));
                            }}
                            style={{
                              padding: "8px 10px", borderRadius: 8,
                              border: "1.5px solid #e5e7eb", background: "#fff",
                              fontSize: 13, color: "#111", fontFamily: "inherit",
                              outline: "none", width: "100%",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#FF5A0A")}
                            onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                          />
                        </div>
                      );
                    })
                  ) : (
                    // READ-ONLY fields
                    summaryFields.map(({ key, label, value }) => (
                      <div key={key as string} style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                        <span style={{ color: "#6b7280" }}>{label}</span>
                        <span style={{ color: "#111", fontWeight: 600, textAlign: "right", maxWidth: "58%" }}>{value}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Buttons */}
                <div style={{ padding: "12px 16px", borderTop: "1px solid #e5e7eb", display: "flex", gap: 8 }}>
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => { setEditedPrefill(prefill); setIsEditing(false); }}
                        style={{
                          flex: 1, padding: 10, borderRadius: 12,
                          border: "1.5px solid #e5e7eb", background: "#fff",
                          color: "#6b7280", fontSize: 12, fontWeight: 600,
                          cursor: "pointer", fontFamily: "inherit",
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        style={{
                          flex: 2, padding: 10, borderRadius: 12, border: "none",
                          background: orange, color: "#fff", fontSize: 12, fontWeight: 700,
                          cursor: "pointer", fontFamily: "inherit",
                        }}
                      >
                        Save changes
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        style={{
                          flex: 1, padding: 10, borderRadius: 12,
                          border: "1.5px solid #e5e7eb", background: "#fff",
                          color: "#6b7280", fontSize: 12, fontWeight: 600,
                          cursor: "pointer", fontFamily: "inherit",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={submitLead}
                        style={{
                          flex: 2, padding: 10, borderRadius: 12, border: "none",
                          background: orange, color: "#fff", fontSize: 12, fontWeight: 700,
                          cursor: "pointer", fontFamily: "inherit",
                        }}
                      >
                        Looks good, send! &#x2705;
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          {showInput && (
            <div style={{
              flexShrink: 0, padding: "12px 14px",
              borderTop: "1px solid #e5e7eb", background: "#fff",
              display: "flex", gap: 10,
              paddingBottom: "max(12px, env(safe-area-inset-bottom))",
            }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !loading && input.trim()) sendMsg(); }}
                disabled={loading}
                placeholder="Type your message..."
                style={{
                  flex: 1, padding: "12px 16px", borderRadius: 14,
                  border: "1.5px solid #e5e7eb", background: "#f9fafb",
                  fontSize: 16, outline: "none", fontFamily: "inherit", color: "#111",
                }}
              />
              <button
                onClick={sendMsg}
                disabled={loading || !input.trim()}
                style={{
                  padding: "12px 16px", borderRadius: 14, border: "none",
                  background: input.trim() && !loading ? orange : "#f3f4f6",
                  color: input.trim() && !loading ? "#fff" : "#9ca3af",
                  cursor: input.trim() && !loading ? "pointer" : "default",
                  fontSize: 17, display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0,
                }}
              >
                &#x27A4;
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}