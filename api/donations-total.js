export default async (req, res) => {
  // Pull from provider via API key or mirror via webhook; using env stub here
  const total = Number(process.env.DONATION_TOTAL || 0);
  return res.status(200).json({ total });
}
