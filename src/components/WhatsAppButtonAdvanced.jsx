// src/components/WhatsAppButton.jsx - Fixed: no scroll hide + direct contact on click
import React, { useState, useEffect, useRef, useCallback } from "react";

const WhatsAppButton = ({
  phoneNumber,
  businessName = "Vallabh Farashkhana & Decorators",
  position = "bottom-right",
  offlineMessage = "We'll get back to you soon!",
  businessHours = { start: 7, end: 22 },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [customMsg, setCustomMsg] = useState("");
  const chatRef = useRef(null);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);

  const cleanPhone = (phoneNumber || "").replace(/\D/g, "");

  // ── Business hours check ──────────────────────────────────────
  useEffect(() => {
    const check = () => {
      const h = new Date().getHours();
      setIsOnline(h >= businessHours.start && h < businessHours.end);
    };
    check();
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, [businessHours]);

  // ── Click outside to close ────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (
        chatRef.current &&
        !chatRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      )
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Lock body scroll on mobile when panel open ────────────────
  useEffect(() => {
    if (window.innerWidth < 640) {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ── Auto-focus input when panel opens ────────────────────────
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 280);
  }, [isOpen]);

  // ── Greeting by time ─────────────────────────────────────────
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return { text: "Good Morning!", emoji: "🌅" };
    if (h < 17) return { text: "Good Afternoon!", emoji: "☀️" };
    return { text: "Good Evening!", emoji: "🌙" };
  };

  // ── Send to WhatsApp ──────────────────────────────────────────
  const sendMessage = useCallback(
    (msg) => {
      if (!msg.trim()) return;
      setIsTyping(true);
      setTimeout(() => {
        window.open(
          `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`,
          "_blank",
        );
        setIsTyping(false);
        setIsOpen(false);
        setCustomMsg("");
        if (typeof window.gtag !== "undefined") {
          window.gtag("event", "whatsapp_click", {
            event_category: "contact",
            event_label: msg.slice(0, 50),
          });
        }
      }, 450);
    },
    [cleanPhone],
  );

  // ── Direct "Chat Now" — opens WhatsApp immediately ────────────
  const openDirect = () => {
    const defaultMsg = `Namaste! I'm interested in your services. Can you help me?`;
    window.open(
      `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMsg)}`,
      "_blank",
    );
  };

  const quickReplies = [
    {
      emoji: "🎨",
      label: "Decoration Services",
      msg: "I'm interested in your decoration services. Can you share your portfolio and pricing?",
    },
    {
      emoji: "🪑",
      label: "Rental Items",
      msg: "What rental items do you have available? I need furniture and decor for my event.",
    },
    {
      emoji: "💐",
      label: "Wedding Package",
      msg: "I'm planning a wedding. Can you share your wedding decoration packages?",
    },
    {
      emoji: "💰",
      label: "Get Pricing",
      msg: "Can you share your price list for decoration and rental services?",
    },
    {
      emoji: "📅",
      label: "Book an Event",
      msg: "I want to book your services for my upcoming event. Please share availability.",
    },
    {
      emoji: "❓",
      label: "General Query",
      msg: "I have a question about your services. Can you help me?",
    },
  ];

  const greeting = getGreeting();
  const isRight = position.includes("right");

  return (
    <>
      <style>{`
        /* ── Variables ─────────────────────────────── */
        .wa-host {
          --g: #25D366;
          --gd: #128C7E;
          --bg: #0d1b2a;
          --s1: #152033;
          --s2: #1c2d42;
          --bd: rgba(255,255,255,0.07);
          --tx: #eef2f7;
          --mu: #7a90a4;
          --rd: 20px;
          --sh: 0 24px 64px rgba(0,0,0,.55),0 4px 16px rgba(0,0,0,.3);
          font-family:'DM Sans',system-ui,sans-serif;
        }

        /* ── Root ──────────────────────────────────── */
        .wa-host {
          position:fixed; z-index:9999;
          /* NEVER hidden — always visible */
        }
        .wa-host.br { bottom:20px; right:20px; }
        .wa-host.bl { bottom:20px; left:20px; }

        /* ── FAB ────────────────────────────────────── */
        .wa-fab {
          display:flex; align-items:center; gap:10px;
          padding:13px 22px; border-radius:50px; border:none; cursor:pointer;
          background:linear-gradient(135deg,var(--g),var(--gd));
          box-shadow:0 4px 20px rgba(37,211,102,.4),0 2px 8px rgba(0,0,0,.2);
          transition:transform .25s cubic-bezier(.34,1.56,.64,1),
                     box-shadow .25s ease;
          position:relative; overflow:hidden; color:#fff;
        }
        .wa-fab:hover {
          transform:translateY(-3px) scale(1.04);
          box-shadow:0 12px 36px rgba(37,211,102,.5),0 4px 12px rgba(0,0,0,.25);
        }
        .wa-fab:active { transform:scale(.97); }
        /* shimmer */
        .wa-fab::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(105deg,transparent 38%,rgba(255,255,255,.2) 50%,transparent 62%);
          transform:translateX(-120%); transition:transform .55s ease;
        }
        .wa-fab:hover::after { transform:translateX(120%); }

        .wa-fab-text {
          font-weight:700; font-size:14.5px; white-space:nowrap;
        }
        .wa-fab-pulse {
          width:8px; height:8px; border-radius:50%; background:#fff;
          box-shadow:0 0 0 0 rgba(255,255,255,.5);
          animation:wa-ping 2s ease-in-out infinite; flex-shrink:0;
        }
        .wa-fab-pulse.off { background:#ff5a5a; animation:none; }
        @keyframes wa-ping {
          0%,100%{ box-shadow:0 0 0 0 rgba(255,255,255,.5); }
          50%    { box-shadow:0 0 0 6px rgba(255,255,255,0); }
        }

        /* ── Panel ──────────────────────────────────── */
        .wa-panel {
          position:absolute; bottom:68px;
          width:370px; max-width:calc(100vw - 24px);
          background:var(--bg);
          border:1px solid var(--bd);
          border-radius:var(--rd);
          box-shadow:var(--sh); overflow:hidden;
          transform-origin:bottom right;
          animation:wa-pop .28s cubic-bezier(.34,1.56,.64,1) both;
        }
        .wa-panel.left-panel { right:0; transform-origin:bottom left; }
        .wa-panel.right-panel { right:0; }
        @keyframes wa-pop {
          from{ opacity:0; transform:scale(.86) translateY(18px); }
          to  { opacity:1; transform:scale(1)   translateY(0);    }
        }

        /* ── Header ─────────────────────────────────── */
        .wa-hdr {
          background:linear-gradient(135deg,#128C7E,#075E54);
          padding:14px 16px; display:flex; align-items:center; gap:12px;
        }
        .wa-hdr-avatar {
          width:44px; height:44px; border-radius:50%;
          object-fit:cover; border:2px solid rgba(255,255,255,.3); flex-shrink:0;
        }
        .wa-hdr-name  { color:#fff; font-weight:700; font-size:15px; line-height:1.25; }
        .wa-hdr-sub   { font-size:11.5px; color:rgba(255,255,255,.75); margin-top:2px; display:flex; align-items:center; gap:5px; }
        .wa-hdr-dot   { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
        .wa-hdr-dot.on  { background:#4eff91; }
        .wa-hdr-dot.off { background:#ff5a5a; }
        .wa-close-btn {
          margin-left:auto; background:rgba(255,255,255,.15); border:none;
          cursor:pointer; color:#fff; width:30px; height:30px; border-radius:50%;
          display:flex; align-items:center; justify-content:center; font-size:15px;
          transition:background .18s; flex-shrink:0;
        }
        .wa-close-btn:hover { background:rgba(255,255,255,.3); }

        /* ── Direct contact strip ───────────────────── */
        .wa-direct {
          display:flex; align-items:center; justify-content:space-between;
          gap:10px; padding:12px 16px;
          background:rgba(37,211,102,.08);
          border-bottom:1px solid var(--bd);
        }
        .wa-direct-text { font-size:13px; color:var(--tx); line-height:1.4; }
        .wa-direct-text strong { color:#4eff91; }
        .wa-direct-btn {
          flex-shrink:0; display:flex; align-items:center; gap:6px;
          padding:9px 16px; border-radius:50px; border:none; cursor:pointer;
          background:linear-gradient(135deg,var(--g),var(--gd));
          color:#fff; font-weight:700; font-size:13px;
          white-space:nowrap;
          box-shadow:0 4px 16px rgba(37,211,102,.35);
          transition:transform .2s, box-shadow .2s;
        }
        .wa-direct-btn:hover {
          transform:scale(1.05);
          box-shadow:0 6px 22px rgba(37,211,102,.5);
        }

        /* ── Body / scrollable ──────────────────────── */
        .wa-body {
          padding:14px 14px 4px;
          max-height:48vh; overflow-y:auto; scrollbar-width:none;
        }
        .wa-body::-webkit-scrollbar { display:none; }

        /* Greeting bubble */
        .wa-bubble {
          background:var(--s1); border:1px solid var(--bd);
          border-radius:14px 14px 14px 4px;
          padding:12px 14px; margin-bottom:12px;
          animation:wa-fade .35s ease both;
        }
        @keyframes wa-fade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
        .wa-bubble-hi  { font-size:15px; color:var(--tx); font-weight:600; margin-bottom:3px; }
        .wa-bubble-sub { font-size:13px; color:var(--mu); line-height:1.55; }

        /* Offline */
        .wa-offline-bar {
          margin-bottom:12px; padding:9px 12px; border-radius:10px;
          background:rgba(255,165,0,.1); border:1px solid rgba(255,165,0,.22);
          font-size:12px; color:#ffb347; line-height:1.5;
        }

        /* Quick reply list */
        .wa-qr-hdr { font-size:10.5px; font-weight:700; color:var(--mu); letter-spacing:.09em; text-transform:uppercase; margin-bottom:8px; }
        .wa-qr-list { display:flex; flex-direction:column; gap:6px; margin-bottom:12px; }
        .wa-qr-btn {
          display:flex; align-items:center; gap:10px;
          padding:10px 12px; background:var(--s1);
          border:1px solid var(--bd); border-radius:12px;
          cursor:pointer; width:100%; text-align:left;
          color:var(--tx); font-size:13.5px;
          font-family:'DM Sans',system-ui,sans-serif;
          transition:background .15s, border-color .15s, transform .15s;
        }
        .wa-qr-btn:hover {
          background:var(--s2);
          border-color:rgba(37,211,102,.4);
          transform:translateX(3px);
        }
        .wa-qr-btn:active { transform:scale(.98); }
        .wa-qr-icon  { font-size:18px; flex-shrink:0; width:26px; text-align:center; }
        .wa-qr-label { flex:1; }
        .wa-qr-arr   { color:var(--mu); font-size:13px; }

        /* Typing dots */
        .wa-typing {
          display:flex; align-items:center; gap:8px;
          padding:8px 0 12px;
          font-size:12px; color:var(--mu);
          border-top:1px solid var(--bd);
        }
        .wa-dots { display:flex; gap:3px; }
        .wa-dots span {
          width:6px; height:6px; border-radius:50%; background:var(--g);
          animation:wa-bounce 1.2s ease-in-out infinite;
        }
        .wa-dots span:nth-child(2){ animation-delay:.2s; }
        .wa-dots span:nth-child(3){ animation-delay:.4s; }
        @keyframes wa-bounce {
          0%,60%,100%{ transform:translateY(0); opacity:.35; }
          30%        { transform:translateY(-5px); opacity:1; }
        }

        /* Input row */
        .wa-input-row {
          display:flex; gap:8px; align-items:center;
          padding:11px 14px;
          background:var(--s1); border-top:1px solid var(--bd);
        }
        .wa-input {
          flex:1; padding:9px 14px; border-radius:24px;
          background:var(--s2); border:1px solid var(--bd);
          color:var(--tx); font-size:13.5px; outline:none;
          font-family:'DM Sans',system-ui,sans-serif;
          transition:border-color .18s;
        }
        .wa-input::placeholder { color:var(--mu); }
        .wa-input:focus { border-color:rgba(37,211,102,.55); }
        .wa-send {
          width:38px; height:38px; border-radius:50%; flex-shrink:0;
          background:linear-gradient(135deg,var(--g),var(--gd));
          border:none; cursor:pointer;
          display:flex; align-items:center; justify-content:center; color:#fff;
          transition:transform .2s, opacity .2s;
          box-shadow:0 3px 10px rgba(37,211,102,.35);
        }
        .wa-send:hover { transform:scale(1.1); }
        .wa-send:disabled { opacity:.35; cursor:default; transform:none; }

        /* ── Mobile: bottom sheet ───────────────────── */
        @media (max-width:520px) {
          .wa-host.br, .wa-host.bl { bottom:16px; right:16px; left:auto; }
          .wa-fab-text { display:none; }
          .wa-fab-pulse { display:none; }
          .wa-fab { padding:14px; border-radius:50%; }
          .wa-panel {
            position:fixed; bottom:0; left:0; right:0; top:auto;
            width:100%; max-width:100%;
            border-radius:22px 22px 0 0;
            max-height:90vh;
            transform-origin:bottom center;
            animation:wa-sheet .3s cubic-bezier(.34,1.3,.64,1) both;
          }
          @keyframes wa-sheet {
            from{ opacity:0; transform:translateY(60px); }
            to  { opacity:1; transform:translateY(0); }
          }
          .wa-body { max-height:calc(90vh - 220px); }
        }
      `}</style>

      {/* ════ ROOT ════ */}
      <div ref={buttonRef} className={`wa-host ${isRight ? "br" : "bl"}`}>
        {/* ── FAB button ── */}
        <button
          className="wa-fab"
          onClick={() => setIsOpen((o) => !o)}
          aria-label="Open WhatsApp Chat"
        >
          <svg width="22" height="22" viewBox="0 0 448 512" fill="white">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.7 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.1 13.9 10.9-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
          <span className="wa-fab-text">Chat with us</span>
          <div className={`wa-fab-pulse${isOnline ? "" : " off"}`} />
        </button>

        {/* ── PANEL ── */}
        {isOpen && (
          <div
            ref={chatRef}
            className={`wa-panel ${isRight ? "right-panel" : "left-panel"}`}
          >
            {/* Header */}
            <div className="wa-hdr">
              <img
                className="wa-hdr-avatar"
                src="https://res.cloudinary.com/deykvluax/image/upload/v1779517487/ChatGPT_Image_May_23__2026__11_53_32_AM-removebg-preview_rojzn4.png"
                alt={businessName}
                onError={(e) => {
                  e.target.src = "";
                  e.target.style.display = "none";
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="wa-hdr-name">{businessName}</div>
                <div className="wa-hdr-sub">
                  <span className={`wa-hdr-dot ${isOnline ? "on" : "off"}`} />
                  {isOnline
                    ? "Usually replies in minutes"
                    : "Currently offline"}
                </div>
              </div>
              <button
                className="wa-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* ★ Direct contact strip — tap to open WhatsApp instantly ★ */}
            <div className="wa-direct">
              <div className="wa-direct-text">
                <strong>Chat directly</strong> on WhatsApp
                <br />
                <span style={{ fontSize: "12px", opacity: 0.7 }}>
                  Opens WhatsApp instantly
                </span>
              </div>
              <button className="wa-direct-btn" onClick={openDirect}>
                <svg width="14" height="14" viewBox="0 0 448 512" fill="white">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.7 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.1 13.9 10.9-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
                Open Now
              </button>
            </div>

            {/* Scrollable body */}
            <div className="wa-body">
              {/* Greeting bubble */}
              <div className="wa-bubble">
                <div className="wa-bubble-hi">
                  {greeting.emoji} {greeting.text}
                </div>
                <div className="wa-bubble-sub">
                  Welcome to{" "}
                  <strong style={{ color: "#4eff91" }}>{businessName}</strong>!
                  <br />
                  Pick a quick reply or type your own message below.
                </div>
              </div>

              {/* Offline notice */}
              {!isOnline && (
                <div className="wa-offline-bar">
                  ⏰ {offlineMessage}
                  <br />
                  <span style={{ opacity: 0.75 }}>
                    Hours: {businessHours.start}:00 – {businessHours.end}:00
                  </span>
                </div>
              )}

              {/* Quick replies */}
              <div className="wa-qr-hdr">Quick replies</div>
              <div className="wa-qr-list">
                {quickReplies.map((r, i) => (
                  <button
                    key={i}
                    className="wa-qr-btn"
                    onClick={() => sendMessage(r.msg)}
                  >
                    <span className="wa-qr-icon">{r.emoji}</span>
                    <span className="wa-qr-label">{r.label}</span>
                    <span className="wa-qr-arr">›</span>
                  </button>
                ))}
              </div>

              {/* Typing indicator */}
              {isTyping && (
                <div className="wa-typing">
                  <div className="wa-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  Opening WhatsApp…
                </div>
              )}
            </div>

            {/* Custom message input */}
            <div className="wa-input-row">
              <input
                ref={inputRef}
                className="wa-input"
                type="text"
                placeholder="Type a message…"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage(customMsg);
                }}
              />
              <button
                className="wa-send"
                onClick={() => sendMessage(customMsg)}
                disabled={!customMsg.trim()}
                aria-label="Send"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WhatsAppButton;
