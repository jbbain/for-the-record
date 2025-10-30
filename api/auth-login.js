export default async (req, res) => {
  if(req.method !== "POST") return res.status(405).end();
  const { passcode, context } = req.body||{};
  const map = { "Punta-Cana": process.env.ESCAPE_PASS, "Lounge": process.env.LOUNGE_PASS };
  const ok = passcode && map[context] && passcode === map[context];
  return res.status(200).json({ ok });
}
