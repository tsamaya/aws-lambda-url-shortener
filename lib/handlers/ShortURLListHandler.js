const { scanShortURL } = require('../services/ShortenService');
const { headers } = require('./Headers');

const DEFAULT_LIMIT = 50;

module.exports.handler = async (event) => {
  try {
    const LastEvaluatedKeyQueryString =
      event.queryStringParameters?.LastEvaluatedKey;
    const LimitQueryString = event.queryStringParameters?.Limit;
    let LastEvaluatedKey = null;
    let Limit = DEFAULT_LIMIT;
    try {
      LastEvaluatedKey = JSON.parse(LastEvaluatedKeyQueryString);
    } catch (e) {
      // you might want to return a HTTP 400
      console.warn('Error parsing LastEvaluatedKey! null value used');
    }

    try {
      Limit = Number(LimitQueryString);
    } catch (e) {
      // you might want to return a HTTP 400
      console.warn(`Error parsing Limit! using ${DEFAULT_LIMIT} as Limit`);
    }

    console.log(
      `Scan with Limit ${Limit} and LastEvaluatedKey ${LastEvaluatedKey}`
    );

    const list = await scanShortURL({
      LastEvaluatedKey,
      Limit,
    });
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(list),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        ...error,
      }),
    };
  }
};
