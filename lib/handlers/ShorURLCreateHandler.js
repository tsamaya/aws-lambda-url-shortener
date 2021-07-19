const { createShortURL } = require('../services/ShortenService');
const { makeError500 } = require('./errors');
const { success } = require('./success');

module.exports.handler = async (event) => {
  const { shortId, url } = JSON.parse(event.body);
  try {
    const shorten = await createShortURL({ url, shortId });
    const response = success(shorten);

    return response;
  } catch (error) {
    console.log(error);
    return makeError500(error);
  }
};
