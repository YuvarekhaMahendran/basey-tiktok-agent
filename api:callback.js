const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { code, error } = req.query;
  if (error || !code) return res.redirect('/?error=denied');

  try {
    const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_key:    process.env.TIKTOK_CLIENT_KEY,
        client_secret: process.env.TIKTOK_CLIENT_SECRET,
        code:          code,
        grant_type:    'authorization_code',
        redirect_uri:  process.env.TIKTOK_REDIRECT_URI,
      }),
    });

    const data = await response.json();
    const token = data?.data?.access_token || data?.access_token;

    if (token) {
      res.redirect(`/?token=${token}`);
    } else {
      console.error('Token error:', JSON.stringify(data));
      res.redirect('/?error=token_failed');
    }
  } catch (err) {
    console.error('Callback crash:', err.message);
    res.redirect('/?error=server_error');
  }
};