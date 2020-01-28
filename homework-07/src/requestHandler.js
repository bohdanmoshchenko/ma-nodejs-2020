const querystring = require('querystring');
const url = require('url');
const router = require('./router');

module.exports = async (request, response) => {
  try {
    const { url: uri } = request;
    const parsedUrl = url.parse(uri);
    const queryParams = querystring.decode(parsedUrl.query);
    let body = [];
    request
      .on('error', err => {
        console.log(err.message);
      })
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        router(
          {
            ...request,
            body: body ? JSON.parse(body) : {},
            url: parsedUrl,
            queryParams,
          },
          response,
        );
      });
  } catch (error) {
    console.log(error.message);
  }
};
