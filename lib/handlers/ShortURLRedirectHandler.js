const { getShortURL, incrementVisit } = require('../services/ShortenService');
const { Error404, makeError500 } = require('./errors');
const { success } = require('./success');
const { headers } = require('./headers');

module.exports.handler = async (event) => {
  const { shortId } = event.pathParameters;
  console.log({ shortId });
  try {
    const shorten = await getShortURL({ shortId });
    if (!shorten) {
      return Error404;
    }
    await incrementVisit({ shortId });

    const html = `<html><head>
        <meta http-equiv="refresh" content="0; URL='${shorten.url}'" />
    </head><body></body></html>`;

    return success(null, {
      headers: { ...headers, 'Content-Type': 'text/html' },
      body: html,
    });
    // {
    //   statusCode: 200,
    //   headers: { ...headers, 'Content-Type': 'text/html' },
    //   body: html,
    // };
  } catch (error) {
    console.log(error);
    return makeError500(error);
  }
};
