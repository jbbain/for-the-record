// src/components/RSVPForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NDAModal from "./NDAModal";
import { submitRSVP } from "../services/api";

export default function RSVPForm(){
  const navigate = useNavigate();

  const [openNDA, setOpenNDA] = useState(false);
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    attending: "Yes",
    notes: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ndaAccepted) {
      setStatus("Please review and accept the NDA before submitting.");
      setOpenNDA(true);
      return;
    }

    setSubmitting(true);
    setStatus("Submitting...");

    const res = await submitRSVP(form);

    if (res.ok) {
      // Navigate to the success page (e.g., "/rsvp/success")
      navigate(res.next || "/rsvp/success");
    } else {
      setStatus(res.error || "There was a problem. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div id="rsvp" className="surface sheen" style={{padding:22}}>
      <h3 style={{marginTop:0}}>RSVP — Required</h3>

      <form onSubmit={handleSubmit} style={{display:'grid', gap:12}}>
        <div style={grid}>
          <Field label="Full Name" required>
            <input
              required
              value={form.name}
              onChange={e=> setForm({...form, name:e.target.value})}
              placeholder="Jane Doe"
            />
          </Field>

          <Field label="Email" required>
            <input
              type="email"
              required
              value={form.email}
              onChange={e=> setForm({...form, email:e.target.value})}
              placeholder="jane@example.com"
            />
          </Field>

          <Field label="Phone">
            <input
              value={form.phone}
              onChange={e=> setForm({...form, phone:e.target.value})}
              placeholder="(optional)"
            />
          </Field>

          <Field label="Attending">
            <select
              value={form.attending}
              onChange={e=> setForm({...form, attending:e.target.value})}
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </Field>
        </div>

        <Field label="Notes / Accessibility Needs">
          <textarea
            rows={4}
            value={form.notes}
            onChange={e=> setForm({...form, notes:e.target.value})}
            placeholder="Let us know about any dietary restrictions or accessibility needs."
          />
        </Field>

        {/* NDA acknowledgement trigger */}
        <div style={{display:'flex', alignItems:'center', gap:10, flexWrap:'wrap', marginTop:6}}>
          <span style={{opacity:.8, fontSize:'.9rem'}}>
            NDA acknowledgment is required to submit.
          </span>
        </div>

        <div style={{display:'flex', gap:10, alignItems:'center', marginTop:6}}>
          <button className="btn" type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit RSVP"}
          </button>
          {status && (
            <div style={{alignSelf:'center', opacity:.85}} aria-live="polite">
              {status}
            </div>
          )}
        </div>
      </form>

      {/* NDA Modal (portalized) */}
      <NDAModal
        open={openNDA}
        context="DC-Event"
        onClose={(accepted) => {
          setOpenNDA(false);
          if (accepted) {
            setNdaAccepted(true);
            setStatus("NDA accepted ✓ You may now submit your RSVP.");
          }
        }}
      />
    </div>
  );
}

function Field({label, required, children}){
  return (
    <label style={{display:'grid', gap:6}}>
      <span style={{opacity:.8}}>
        {label}{required && " *"}
      </span>
      <div className="surface" style={{padding:6}}>
        {children}
      </div>
    </label>
  );
}

const grid = { display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 };
