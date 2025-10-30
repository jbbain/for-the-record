import { useEffect, useState } from "react";
import { getDonationTotal } from "../services/api";

export default function DonationThermometer({ goal, milestones=[] }){
  const [total, setTotal] = useState(0);

  useEffect(()=>{
    let alive = true;
    const pull = async () => {
      const t = await getDonationTotal();
      if(alive) setTotal(t);
    };
    pull();
    const id = setInterval(pull, 15000);
    return ()=>{ alive=false; clearInterval(id); }
  },[]);

  const pct = Math.min(100, Math.round((total/goal)*100));
  return (
    <div className="surface glow" style={{padding:16}}>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:6}}>
        <strong>Goal: ${goal.toLocaleString()}</strong>
        <strong>Raised: ${total.toLocaleString()}</strong>
      </div>
      <div style={{height:18, borderRadius:999, background:'rgba(255,255,255,.08)', overflow:'hidden', position:'relative'}}>
        <div style={{
          width:`${pct}%`,
          height:'100%',
          background: 'linear-gradient(90deg, #1f1d1d, var(--platinum))',
          boxShadow: '0 0 20px var(--glow)',
          transition: 'width .8s ease'
        }}/>
        {milestones.map(m=> (
          <div key={m.v} title={m.label}
            style={{position:'absolute', top:0, bottom:0, left:`${(m.v/goal)*100}%`, width:2, background:'rgba(255,255,255,.4)'}} />
        ))}
      </div>
      <div style={{display:'flex', justifyContent:'space-between', opacity:.8, fontSize:'.85rem', marginTop:6}}>
        {milestones.map(m=> <div key={m.v} style={{textAlign:'center', width:'25%'}}>{m.label} ${m.v.toLocaleString()}</div>)}
      </div>
    </div>
  );
}
