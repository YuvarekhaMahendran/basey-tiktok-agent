const fetch = require('node-fetch');
module.exports = async (req, res) => {
  const token = req.query.token;
  if (!token) return res.status(400).json({ error: 'No token' });
  const [u, v] = await Promise.all([
    fetch('https://open.tiktokapis.com/v2/user/info/?fields=display_name,follower_count,likes_count,video_count', {
      headers: { 'Authorization': `Bearer ${token}` }
    }),
    fetch('https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,view_count,like_count,comment_count,share_count', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ max_count: 20 })
    })
  ]);
  const user = await u.json();
  const videos = await v.json();
  res.json({ user: user?.data?.user, videos: videos?.data?.videos || [] });
};