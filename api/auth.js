module.exports = (req, res) => {
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const redirectUri = process.env.TIKTOK_REDIRECT_URI;
  const state = Math.random().toString(36).substring(2);

  const params = new URLSearchParams({
    client_key: clientKey,
    response_type: 'code',
    scope: 'user.info.basic,user.info.stats,video.list',
    redirect_uri: redirectUri,
    state: state,
  });

  res.redirect(`https://www.tiktok.com/v2/auth/authorize/?${params}`);
};