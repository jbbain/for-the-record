import { useState } from "react";
import PasswordGate from "../components/PasswordGate";
import { DONATION_URL } from "../config";

export default function Escape(){
  const [unlocked, setUnlocked] = useState(false);

  if(!unlocked){
    return (
      <main className="container">
        <PasswordGate context="Punta-Cana" onUnlock={()=> setUnlocked(true)} />
      </main>
    );
  }

  return (
    <main className="container" style={{display:'grid', gap:18}}>
      <div className="surface sheen" style={{padding:22}}>
        <h2 style={{marginTop:0}}>The Platinum Escape — Punta Cana</h2>
        <p style={{opacity:.9}}>Dates: Dec 11–15, 2025. This portal includes itinerary, excursions, dress themes, and travel logistics.</p>
        <a className="btn" href="/ndas/platinum-escape-nda.pdf" target="_blank" rel="noreferrer">Download NDA</a>
      </div>

      <div className="surface" style={{padding:22}}>
        <h3>Itinerary (Sample)</h3>
        <ul style={{opacity:.9, lineHeight:1.7}}>
          <li>Day 1 — Arrival, sunset welcome, platinum cocktail hour</li>
          <li>Day 2 — Beach day + curated group dinner</li>
          <li>Day 3 — Excursions (catamaran / cenote), night lounge</li>
          <li>Day 4 — Leisure & spa, farewell set</li>
          <li>Day 5 — Departures</li>
        </ul>
        <div style={{marginTop:10}}>
          <a className="btn" href={DONATION_URL} target="_blank" rel="noopener noreferrer">Support the Mission</a>
        </div>
      </div>
    </main>
  );
}
