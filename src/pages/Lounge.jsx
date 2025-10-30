import { useState } from "react";
import PasswordGate from "../components/PasswordGate";
import DonationThermometer from "../components/DonationThermometer";
import { asset } from "../utils/asset";

export default function Lounge(){
  const [unlocked, setUnlocked] = useState(false);
  if(!unlocked) return (
    <main className="container">
      <PasswordGate context="Lounge" onUnlock={()=> setUnlocked(true)} />
    </main>
  );

  return (
    <main className="container" style={{display:'grid', gap:18}}>
      <div className="surface sheen" style={{padding:22}}>
        <h2 style={{marginTop:0}}>The Platinum Lounge — Recap</h2>
        <p style={{opacity:.9}}>Thank you for celebrating. Enjoy the gallery and recap reel below. Your discretion is appreciated under the NDA.</p>
      </div>

      <div className="surface" style={{padding:22}}>
        <h3>Benefit Results</h3>
        <DonationThermometer goal={10000} milestones={[
          {v:2500, label:"Prelude"},
          {v:5000, label:"Chorus"},
          {v:7500, label:"Bridge"},
          {v:10000, label:"Encore"}
        ]}/>
        <p style={{opacity:.85, marginTop:8}}>With gratitude to all who contributed to The Tulsa Initiative.</p>
      </div>

      <div className="surface sheen" style={{padding:22}}>
        <h3>Gallery</h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px,1fr))', gap:10}}>
          {[1,2,3,4,5,6].map(i=> (
            <div key={i} className="surface sheen" style={{aspectRatio:'4/3', background:`url(${asset(`media/p${i}.jpg`)}) center/cover no-repeat`}} />
          ))}
        </div>
      </div>

      <div className="surface" style={{padding:22}}>
        <h3>Recap Reel</h3>
        <video controls loop style={{width:'100%', borderRadius:'12px'}}>
          <source src={asset("media/hero-loop.mp4")} type="video/mp4" />
        </video>
      </div>
    </main>
  );
}
