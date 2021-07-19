const { headers } = require('./headers');

const Error404 = {
  statusCode: 404,
  headers,
  body: JSON.stringify({
    code: 404,
    message: 'Not found',
  }),
};

const makeError500 = (error) => {
  return {
    statusCode: 500,
    headers,
    body: JSON.stringify({
      ...error,
    }),
  };
};
module.exports = {
  Error404,
  makeError500,
};
