// Example for Netlify (export handler) or Vercel (default export req,res)
// Will adjust syntax when I choose the deployment provider

export default async (req, res) => {
  if(req.method !== "POST") return res.status(405).end();
  const { context, timestamp, ip, userAgent } = req.body||{};
  // TODO: Persist to DB (Supabase/Dynamo/Firestore). IP and timestamp required by your NDA spec.
  console.log("NDA ACK", {context, timestamp, ip, userAgent});
  return res.status(200).json({ ok:true });
}
