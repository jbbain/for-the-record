import { useEffect } from "react";
import { DONATION_URL } from "../config";

export default function ExternalDonateRedirect(){
  useEffect(()=>{
    // Use replace so back button doesn’t trap users on the redirect page
    window.location.replace(DONATION_URL);
  }, []);
  return (
    <main className="container">
      <div className="surface sheen" style={{padding:22}}>
        <h3>Redirecting to secure donation page…</h3>
        <p style={{opacity:.85}}>If you are not redirected, <a href={DONATION_URL}>click here</a>.</p>
      </div>
    </main>
  );
}
