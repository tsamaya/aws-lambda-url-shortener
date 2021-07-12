const { scanShortURL } = require('../services/shortenService');
const { headers } = require('./Headers');

module.exports.handler = async () => {
  try {
    const list = await scanShortURL();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(list),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        ...error,
      }),
    };
  }
};
