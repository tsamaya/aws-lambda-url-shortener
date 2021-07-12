const { createShortURL } = require('../services/shortenService');
const { headers } = require('./Headers');

module.exports.handler = async (event) => {
  const { short, url } = JSON.parse(event.body);
  try {
    const shorten = await createShortURL({ url, short });
    const response = {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ...shorten,
      }),
    };

    return response;
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
