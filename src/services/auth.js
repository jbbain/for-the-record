const API_BASE = import.meta.env.VITE_API_BASE || "";

export async function login({ passcode, context }){
  // Try server API first
  if (API_BASE && !API_BASE.startsWith("/api")) {
    try{
      const r = await fetch(`${API_BASE}/auth-login`, {
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ passcode, context })
      });
      const data = await r.json();
      if (typeof data?.ok === "boolean") return data;
    }catch{/* ignore and fall back */}
  }

  // Client-only fallback (NOT secure — for GH Pages/testing)
  const EP = import.meta.env.VITE_ESCAPE_PASS;
  const LP = import.meta.env.VITE_LOUNGE_PASS;
  if (context === "Punta-Cana" && EP) return { ok: passcode === EP, fallback:true };
  if (context === "Lounge" && LP) return { ok: passcode === LP, fallback:true };
  return { ok:false };
}
