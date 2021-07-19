const { getShortURL } = require('../services/ShortenService');
const { Error404, makeError500 } = require('./errors');
const { success } = require('./success');

module.exports.handler = async (event) => {
  const { shortId } = event.pathParameters;
  console.log({ shortId });
  try {
    const shorten = await getShortURL({ shortId });
    if (!shorten) return Error404;
    return success(shorten);
  } catch (error) {
    console.error(error);
    return makeError500(error);
  }
};
