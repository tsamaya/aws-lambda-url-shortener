const { getShortURL } = require('../services/shortenService');
const { headers } = require('./Headers');

module.exports.handler = async (event) => {
  const { shortId } = event.pathParameters;
  console.log({ shortId });
  try {
    const shorten = await getShortURL({ shortId });
    if (!shorten)
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          code: 404,
          message: 'Not found',
        }),
      };
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ...shorten,
      }),
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
