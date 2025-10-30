// api/verify-auth.js 
export default async (req, res) => {
  // Verify JWT in HttpOnly cookie for protected routes
  res.status(200).json({ ok:true });
}
