export default async (req, res) => {
  if(req.method !== "POST") return res.status(405).end();
  const form = req.body || {};
  // TODO: Save RSVP; send email (SendGrid/SES) from rsvp@ForTheRecord.com
  console.log("RSVP", form);
  return res.status(200).json({ ok:true });
}
