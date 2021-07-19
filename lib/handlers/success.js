const { headers } = require('./headers');

const success = (data, options = {}) => {
  return {
    statusCode: options.statusCode || 200,
    headers: options.headers || headers,
    body:
      options.body ||
      JSON.stringify({
        ...data,
      }),
  };
};

module.exports = { success };
