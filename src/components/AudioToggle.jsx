import { useEffect, useState } from "react";

export default function AudioToggle(){
  const [on, setOn] = useState(false);
  useEffect(()=>{
    const el = document.getElementById("ambient-audio");
    if(!el) return;
    if(on) el.play().catch(()=>{});
    else el.pause();
  },[on]);
  return (
    <button className="btn" onClick={()=> setOn(v=>!v)} aria-pressed={on}>
      {on ? "Audio: On" : "Audio: Off"}
    </button>
  );
}
