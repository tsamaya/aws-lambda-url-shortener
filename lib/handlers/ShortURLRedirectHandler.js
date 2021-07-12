const { getShortURL, incrementVisit } = require('../services/shortenService');
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
        body: JSON.stringify('Not found'),
      };
    await incrementVisit({ shortId });

    const html = `
  <html>
    <head>
        <meta http-equiv="refresh" content="0; URL='${shorten.url}'" />
    </head>
    <body>
    </body>
  </html>`;

    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'text/html' },
      body: html,
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
