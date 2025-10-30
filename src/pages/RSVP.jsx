import HeroCentered from "../components/HeroCentered";
import RSVPForm from "../components/RSVPForm";

export default function RSVPPage(){
  return (
    <main>
      <HeroCentered
        title="RSVP — The Platinum Edition"
        date="December 4, 2025 · Washington, D.C."
        image="media/hero-bw.jpg"
      />

      <section className="container" style={{display:'grid', gap:22, padding:'36px 0 60px'}}>
        <div className="surface sheen" style={{padding:22}}>
          <h2 style={{marginTop:0}}>Event Details</h2>
          <p style={{opacity:.9}}>
            Thursday, December 4, 2025 · 6:00–10:00 PM · Washington, D.C. · The Wharf Dockmaster Building <br/>
            Dress: Editorial Black–Platinum Chic with metallic accents
          </p>
          <p style={{opacity:.85}}>
            Note: Submission requires NDA acknowledgment. You will see an NDA modal prior to finalizing your RSVP.
          </p>
        </div>

        <RSVPForm />
      </section>
    </main>
  );
}
