// src/components/NDAModal.jsx
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { logNDA } from "../services/api";

export default function NDAModal({ open, onClose, context }) {
  const [checked, setChecked] = useState(false);
  const [ip, setIP] = useState("");

  // Lock background scroll while modal is open
  useEffect(() => {
    if (open) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  // Fetch IP when opening
  useEffect(() => {
    if (!open) return;
    fetch("https://api.ipify.org?format=json")
      .then(r => r.json())
      .then(d => setIP(d.ip))
      .catch(() => {});
  }, [open]);

  const onKey = (e) => {
    if (e.key === "Escape") onClose(false);
  };

  const handleAgree = async () => {
    if (!checked) return;
    try {
      await logNDA({
        context, // "DC-Event" | "Punta-Cana" | "Lounge"
        timestamp: new Date().toISOString(),
        ip,
        userAgent: navigator.userAgent
      });
    } catch {}
    onClose(true);
  };

  if (!open) return null;

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Non-Disclosure Agreement"
      onKeyDown={onKey}
      style={overlayStyle}
    >
      <div className="surface sheen" style={panelStyle}>
        <div style={contentStyle}>
          <h2 style={{marginTop:0}}>Non-Disclosure Agreement</h2>
          <p style={{opacity:.9, lineHeight:1.6}}>
            By proceeding, you agree to the terms of the applicable NDA for this experience. These NDAs are
            irrevocable, non-transferable, and binding in perpetuity under Maryland, D.C., U.S., and international law.
          </p>
          <ul style={{opacity:.85, paddingLeft:18}}>
            <li>
              For the Record — The Platinum Edition (Washington, D.C.){" "}
              <a href="/ndas/ftr-platinum-edition-nda.pdf" target="_blank" rel="noreferrer">Download PDF</a>
            </li>
            <li>
              The Platinum Escape (Punta Cana){" "}
              <a href="/ndas/platinum-escape-nda.pdf" target="_blank" rel="noreferrer">Download PDF</a>
            </li>
          </ul>

          <label style={{display:'flex', gap:10, alignItems:'flex-start', margin:'12px 0'}}>
            <input
              type="checkbox"
              checked={checked}
              onChange={e=> setChecked(e.target.checked)}
              aria-label="I have read and agree to the NDA terms"
            />
            <span>
              I have read and agree to the NDA terms, including confidentiality of donor/financial data and
              restrictions on disclosure, recording, and publication.
            </span>
          </label>
        </div>

        {/* Sticky action area so buttons never get cropped */}
        <div style={actionsStyle}>
          <button className="btn" onClick={()=> onClose(false)} style={{background:'transparent', color:'var(--porcelain)'}}>
            Cancel
          </button>
          <button className="btn" disabled={!checked} onClick={handleAgree}>
            I Agree
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}

/* Styles */
const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,.6)',
  display: 'grid',
  placeItems: 'center',
  zIndex: 10000,
  padding: '16px'  // gives breathing room on small screens
};

const panelStyle = {
  width: 'min(900px, 96vw)',
  maxHeight: 'min(88svh, 88vh)',   // supports modern mobile viewport units
  display: 'grid',
  gridTemplateRows: '1fr auto',    // content + sticky actions
  overflow: 'hidden',
  borderRadius: '14px'
};

const contentStyle = {
  padding: '22px',
  overflow: 'auto'                 // scroll internally if content exceeds viewport
};

const actionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  padding: '12px 16px',
  borderTop: '1px solid rgba(255,255,255,.12)',
  background: 'rgba(0,0,0,.25)',
  position: 'sticky',
  bottom: 0
};
