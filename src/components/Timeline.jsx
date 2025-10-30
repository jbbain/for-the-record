export default function Timeline(){
  const rows = [
    ["6:00 – 6:30 PM", "Arrival & Welcome", "Champagne + passed bites with R&B/jazz-house soundtrack"],
    ["6:30 – 7:15 PM", "Cocktail Hour", "Photo installation + DJ tempo build"],
    ["7:15 – 7:45 PM", "Program – “Side A”", "Short film Engineered 12·13·85 / Remastered 12·13·25 + remarks"],
    ["7:45 – 8:30 PM", "Dinner", "Action stations + lounge seating"],
    ["8:30 – 9:45 PM", "Celebration – “Side B”", "DJ transitions + dessert bar"],
    ["9:45 – 10:00 PM", "Closing Moment", "Farewell toast + visual finale"]
  ];
  return (
    <div className="surface sheen" style={{padding:'22px', overflow:'hidden'}}>
      <h3 style={{marginTop:0}}>Guest Experience Flow</h3>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 2fr', gap:12, opacity:.95}}>
        <Header>Time</Header><Header>Segment</Header><Header>Experience</Header>
        {rows.map((r,i)=> <Row key={i} data={r} />)}
      </div>
    </div>
  );
}
function Header({children}){ return <div style={{opacity:.7, fontWeight:700}}>{children}</div> }
function Row({data:[time, seg, exp]}){
  const style = {borderTop:'1px solid rgba(255,255,255,.08)', paddingTop:10};
  return (<>
    <div style={style}>{time}</div>
    <div style={style}>{seg}</div>
    <div style={{...style, opacity:.9}}>{exp}</div>
  </>);
}
