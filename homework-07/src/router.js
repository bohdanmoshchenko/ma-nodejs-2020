const controller = require('./systemInfoController');

const { mainPage, setMemoryLimit, getMetrics, pageNotFound } = controller;

module.exports = (req, res) => {
  const { url, method, queryParams } = req;
  const { authorization = '' } = req.headers;
  switch (url.pathname) {
    case '/':
      mainPage(res);
      break;
    case '/limit':
      if (method === 'POST') setMemoryLimit(res, queryParams, authorization);
      else pageNotFound(res);
      break;
    case '/metrics':
      if (method === 'GET') getMetrics(res, queryParams, authorization);
      else pageNotFound(res);
      break;
    default:
      controller.pageNotFound(res);
      break;
  }
};
