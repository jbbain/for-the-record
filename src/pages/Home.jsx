import { Link } from "react-router-dom";
import HeroCentered from "../components/HeroCentered";
import Countdown from "../components/Countdown";
import QuoteBand from "../components/QuoteBand";
import Timeline from "../components/Timeline";
import RSVPForm from "../components/RSVPForm";
import DonationEmbed from "../components/DonationEmbed";

export default function Home(){
  return (
    <main>
      <HeroCentered
        title="For the Record —  Platinum Edition"
        subtitle = "Cornell's 40th Birthday Celebration"
        image="/media/hero-bw.jpg"
      />

      <QuoteBand text="Every era a verse. Every friendship a feature. Every memory a track." author="C.A. Lynch" />

      <section id="details" className="container" style={{display:'grid', gap:22, padding:'36px 0'}}>
        <div className="surface sheen" style={{padding:22}}>
          <h2 style={{marginTop:0}}>Event Details</h2>
          <p style={{opacity:.9}}>
            Tuesday, December 04, 2025 · 6:00–10:00 PM · <br/>
            Washington, D.C. · The Wharf DockMaster Building <br/>
            Attire: Editorial Black–Platinum Chic with metallic accents
          </p>
          <div style={{display:'flex', gap:16, alignItems:'center', flexWrap:'wrap', marginTop:10}}>
            <Countdown/>
            <Link className="btn" to="/rsvp" aria-label="Go to RSVP page">
              RSVP Now
            </Link>
          </div>
        </div>
        <Timeline />
      </section>

      <section id="benefit" className="container" style={{padding:'0 0 60px'}}>
        <DonationEmbed />
      </section>
    </main>
  );
}
