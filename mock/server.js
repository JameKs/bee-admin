const jsonServer = require('json-server');

const server = jsonServer.create();
// Set delay to responses (3000ms)
server.use((req, res, next) => {
  // next is continue to JSON Server router
  setTimeout(next, Math.random() * 3000);
  // setTimeout(next, 10000);
  // next();
});

// Set default middlewares (logger, static, cors and no-cache)
const middlewares = jsonServer.defaults();
server.use(middlewares);

// Use in-memory database
const _ = require('underscore');
const path = require('path');
const fs = require('fs');

const mockDataDir = path.join(__dirname, 'data');
const base = {};
const mockfiles = fs.readdirSync(mockDataDir);
mockfiles.forEach((file) => {
  _.extend(
    base,
    // eslint-disable-next-line import/no-dynamic-require, global-require
    require(path.resolve(mockDataDir, file))
  );
});
const router = jsonServer.router(base);

// To handle POST, PUT and PATCH need to use a body-parser
server.use(jsonServer.bodyParser);

// Set page->_page limit->_limit sort->_sort order->_order
server.use((req, res, next) => {
  req.url = req.url.replace(/page/g, '_page').replace(/limit/g, '_limit').replace(/sort/g, '_sort').replace(/order/g, '_order');
  next();
});

// Returned resources will be wrapped in a body property
router.render = (req, res) => {
  const db = router.db;
  // eslint-disable-next-line no-underscore-dangle
  const pathname = req._parsedUrl.pathname;
  const value = db.get(pathname.substr(1, pathname.length)).value();

  const { submitTestResult } = req.body;
  if (submitTestResult === 1) {
    res.jsonp({
      code: 'ABC1234',
      message: '用户名称已经存在',
    });
  } else {
    res.jsonp({
      total: value == null ? 0 : value.length,
      data: res.locals.data,
      code: 'OK',
      message: '成功',
    });
  }
};

const mockRouteDir = path.join(__dirname, 'routes');
const routebase = {};
const mockRouteFiles = fs.readdirSync(mockRouteDir);
mockRouteFiles.forEach((file) => {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  _.extend(routebase, require(path.resolve(mockRouteDir, file)));
});
// Router rewrite
server.use(jsonServer.rewriter(routebase));

// define custom router
server.use(require('./custom/tokens'));

/*
server.post('/organizations', function(req, res, next) {
  const value = router.db.get('organizations').value();
  const maxid = value[value.length - 1].orgid;
  req.body.orgid = (parseInt(maxid) + 1).toString();
  req.body["id"] = req.body.orgid;
  next();
});
*/

server.use(require('./auth'));

server.use(router);

// Listen port is 3001
server.listen(20000, () => {
  // eslint-disable-next-line no-console
  console.log('JSON server is running in http://localhost:20000');
});
