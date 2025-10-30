import { useState, useRef, useEffect } from "react";
import NDAModal from "./NDAModal";
import { login } from "../services/auth";

export default function PasswordGate({ context, onUnlock }){
  const [pass, setPass] = useState("");
  const [status, setStatus] = useState("Please review and accept the NDA, then enter the passcode.");
  const [ndaOpen, setNdaOpen] = useState(false);
  const [passVerified, setPassVerified] = useState(false);
  const [checking, setChecking] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1) Empty? Prompt.
    if (!pass.trim()) {
      setStatus("Please enter passcode");
      inputRef.current?.focus();
      return;
    }

    // 2) Validate passcode first
    setChecking(true);
    setStatus("Checking passcode...");
    const res = await login({ passcode: pass.trim(), context });
    setChecking(false);

    if (res?.ok) {
      // 3) Only now open the NDA modal
      setPassVerified(true);
      setStatus("Passcode verified. Please review and accept the NDA to continue.");
      setNdaOpen(true);
    } else {
      // 4) Incorrect passcode
      setPassVerified(false);
      setStatus("Incorrect Passcode. Please try again");
      // Select text so user can quickly retype
      setTimeout(() => inputRef.current?.select(), 0);
    }
  };

  const handleNdaClose = (accepted) => {
    setNdaOpen(false);
    if (accepted && passVerified) {
      setStatus("Access granted. Loading…");
      onUnlock();
    } else if (!accepted && passVerified) {
      setStatus("NDA not accepted. Please accept the NDA to continue.");
    }
  };

  return (
    <div className="surface sheen" style={{padding:22}}>
      <h3 style={{marginTop:0}}>Restricted Access</h3>
      <p style={{opacity:.85, marginTop:4}} aria-live="polite">{status}</p>

      <form onSubmit={handleSubmit} style={{display:'flex', gap:10, alignItems:'center', flexWrap:'wrap'}}>
        <input
          ref={inputRef}
          placeholder="Enter passcode"
          value={pass}
          onChange={e=> setPass(e.target.value)}
          aria-label="Passcode"
        />
        <button className="btn" type="submit" disabled={checking}>
          {checking ? "Checking..." : "Enter"}
        </button>

        {/*Quick links to view NDAs before proceeding...may remove */}
        <a href="/ndas/ftr-platinum-edition-nda.pdf" target="_blank" rel="noreferrer" style={{opacity:.75, fontSize:'.9rem'}}>
          View NDA (D.C.)
        </a>
        <span style={{opacity:.4}}>·</span>
        <a href="/ndas/platinum-escape-nda.pdf" target="_blank" rel="noreferrer" style={{opacity:.75, fontSize:'.9rem'}}>
          View NDA (Punta Cana)
        </a>
      </form>

      {/* NDA modal opens ONLY after a correct passcode */}
      <NDAModal open={ndaOpen} context={context} onClose={handleNdaClose} />
    </div>
  );
}
