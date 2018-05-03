module.exports = (req, res, next) => {
  if (req.url === '/tokens' && req.method === 'POST') {
    let data;
    const { userid, password } = req.body;
    if ((userid === 'admin' && password === '123456') || (userid === 'guest' && password === '654321')) {
      res.header('Access-Control-Expose-Headers', 'access-token');
      res.header('access-token', Date.now());
      const token = Date.now();

      if (userid === 'admin') {
        data = {
          userid: 'admin',
          username: '管理员',
          token,
        };
      } else {
        data = {
          userid: 'guest',
          username: '来宾',
          token,
        };
      }

      req.body = data;
      /*
      res.jsonp({
        data: data,
        code: 'OK',
        message: '成功'
      });
      */
      next();
    } else {
      res.jsonp({
        code: 'AUTHORIZATION_VERIFICATION_FAILED',
        message: '登录失败,请检查用户名和密码是否正确!',
      });
    }
  } else if ((req.url === '/tokens/admin' || req.url === '/tokens/guest') && req.method === 'DELETE') {
    const data = {
      userid: req.body.userid,
    };
    res.jsonp({
      data,
      code: 'OK',
      message: '成功',
    });
  } else {
    next();
  }
};
