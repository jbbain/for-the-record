import { NavLink } from "react-router-dom";
import AudioToggle from "./AudioToggle";
import { DONATION_URL } from "../config";

export default function Header(){
  

  return (
    <div className="nav-cream">
      <div className="container nav-inner">
        <div className="brand">For the Record</div>
        <nav className="nav-inline">
          <NavLink to="/" end>Home</NavLink>
          <span style={{color:'rgba(49,47,47,.45)'}}>|</span>
          <NavLink to="/escape">Platinum Escape</NavLink>
          <span style={{color:'rgba(49,47,47,.45)'}}>|</span>
          <NavLink to="/lounge">Platinum Lounge</NavLink>
          <span style={{color:'rgba(49,47,47,.45)'}}>|</span>
          <NavLink to="/rsvp">RSVP</NavLink>
          <span style={{color:'rgba(49,47,47,.45)'}}>|</span>
          <a href={DONATION_URL} target="_blank" rel="noopener noreferrer">Donate</a>
        </nav>
        <AudioToggle />
      </div>
    </div>
  );
}
