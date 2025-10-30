const API_BASE = import.meta.env.VITE_API_BASE || "/api";

// Centralized route constants (HashRouter handles "/rsvp/success" internally)
export const ROUTES = {
  rsvpSuccess: "/rsvp/success"
};

/**
 * Log an NDA acknowledgment (timestamp + IP + UA)
 * payload: { context: "DC-Event" | "Punta-Cana" | "Lounge", timestamp, ip, userAgent }
 */
export async function logNDA(payload){
  try{
    const r = await fetch(`${API_BASE}/log-nda`, {
      method:"POST", headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)
    });
    return await r.json();
  }catch{ return { ok:false }; }
}

/**
 * Submit RSVP data
 * form: { name, email, phone?, attending, notes? }
 * Returns: { ok: boolean, id?: string|null, next?: string, error?: string }
 * - On success, includes next: ROUTES.rsvpSuccess so the component can navigate.
 */
export async function submitRSVP(form) {
  try {
    const r = await fetch(`${API_BASE}/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    // Attempt to parse JSON 
    const data = await r.json().catch(() => ({}));

    if (r.ok && (data?.ok ?? r.ok)) {
      return {
        ok: true,
        id: data?.id || null,
        next: ROUTES.rsvpSuccess
      };
    }

    return {
      ok: false,
      error: data?.error || "RSVP submission failed. Please try again."
    };
  } catch (e) {
    return { ok: false, error: "Network error submitting RSVP." };
  }
}

/**
 * Get current donation total for thermometer
 * Returns a number (0 on failure)
 */
export async function getDonationTotal(){
  try{
    const r = await fetch(`${API_BASE}/donations-total`);
    const { total } = await r.json();
    return Number(total||0);
  }catch{ return 0; }
}
