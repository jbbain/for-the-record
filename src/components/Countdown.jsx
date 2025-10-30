import { useEffect, useState } from "react";
import dayjs from "dayjs";

// 6:00 PM ET, Washington DC — Dec 04, 2025
const target = dayjs("2025-12-04T18:00:00-05:00");

export default function Countdown(){
  const [left, setLeft] = useState(calc());

  function calc(){
    const now = dayjs();
    const diff = target.diff(now);
    if (diff <= 0) return { d:0, h:0, m:0, s:0 };
    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor(diff / (1000*60*60)) % 24;
    const m = Math.floor(diff / (1000*60)) % 60;
    const s = Math.floor(diff / 1000) % 60;
    return { d,h,m,s };
  }

  useEffect(()=>{
    const t = setInterval(()=> setLeft(calc()), 1000);
    return ()=> clearInterval(t);
  },[]);

  return (
    <div className="surface sheen countdown">
      <strong>Countdown:</strong>
      <Unit label="Days" v={left.d} className="days" />
      <Unit label="Hrs"  v={left.h} pad />
      <Unit label="Min"  v={left.m} pad />
      <Unit label="Sec"  v={left.s} pad />
    </div>
  );
}

function Unit({ label, v, pad=false, className="" }){
  const value = pad ? String(v).padStart(2, "0") : String(v);
  return (
    <div className="unit">
      <div className={`value ${className}`}>{value}</div>
      <div style={{opacity:.7, fontSize:'.8rem'}}>{label}</div>
    </div>
  );
}
