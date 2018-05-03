const expireTime = 1000 * 60000;

module.exports = (req, res, next) => {
  if (req.url === '/tokens' && req.method === 'POST') {
    next();
  } else {
    res.header('Access-Control-Expose-Headers', 'access-token');
    const now = Date.now();
    let unauthorized = true;
    const token = req.headers['access-token'];
    if (token) {
      const expired = now - token > expireTime;
      if (!expired) {
        unauthorized = false;
        res.header('access-token', now);
      }
    }
    if (unauthorized) {
      res.sendStatus(401);
    } else {
      // continue to JSON Server router
      next();
    }
  }
};
