import DonationThermometer from "./DonationThermometer";
import GradientQRCode from "./GradientQRCode";

const donateUrl =
  import.meta.env.VITE_PAYPAL_DONATE_URL ||
  "https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=FT63Y6SGEY59A&ssrt=1709585361261";

export default function DonationEmbed(){
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(donateUrl);
      alert("Donation link copied to clipboard.");
    } catch {
      window.prompt("Copy donation link:", donateUrl);
    }
  };

  return (
    <div className="surface sheen" style={{padding:22}}>
      <h3 style={{marginTop:0}}>Benefit Spotlight — The Tulsa Initiative</h3>
      <p style={{opacity:.9}}>
        Campaign: <strong>Side B — Building Futures</strong><br/>
        “Every contribution turns up the volume on equity, education, and empowerment.”
      </p>
      <div className="hr" />

      <div style={{display:'grid', gridTemplateColumns:'1.2fr .8fr', gap:18}}>
        {/* LEFT: PayPal CTA (no QR here) */}
        <div className="surface glow" style={{padding:18, display:'grid', gap:14, alignContent:'start'}}>
          <h4 style={{margin:'4px 0 0'}}>Donate via PayPal</h4>
          <p style={{opacity:.85, marginTop:0}}>
            Secure checkout is handled by PayPal. Your tax-deductible receipt will be issued under The Tulsa Initiative’s EIN.
          </p>
          <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
            <a
              className="btn"
              href={donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{fontWeight:700}}
              aria-label="Donate via PayPal (opens in a new tab)"
            >
              Open Donation Page
            </a>
            <button className="btn" onClick={copyLink} type="button" aria-label="Copy donation link">
              Copy Link
            </button>
          </div>
          <small style={{opacity:.75}}>
            If the embedded form does not appear, use the button to open the secure donation page.
          </small>
        </div>

        {/* RIGHT: Thermometer + single QR */}
        <div style={{display:'grid', gap:18}}>
          <DonationThermometer
            goal={10000}
            milestones={[
              {v:2500, label:"Prelude"},
              {v:5000, label:"Chorus"},
              {v:7500, label:"Bridge"},
              {v:10000, label:"Encore"}
            ]}
          />
          <div className="surface" style={{padding:12, display:'flex', alignItems:'center', gap:12}}>
            <GradientQRCode url={donateUrl} size={128}/>
            <div>
              <div style={{fontWeight:700}}>Scan to Donate</div>
              <div style={{opacity:.85}}>
                Platinum-toned QR links to the PayPal donation page. Also included on RSVP confirmations and event signage.
              </div>
            </div>
          </div>
          <small style={{opacity:.75}}>
            Donor names may be optionally acknowledged (opt-in). Tax receipts will be issued automatically under The Tulsa Initiative’s EIN.
          </small>
        </div>
      </div>
    </div>
  );
}
