const ShortURLModel = require('../models/ShortURLModel');
const { getClient } = require('./dynamoClient');

// const TABLE_NAME = 'ShortURLTable';
const TABLE_NAME = process.env.TABLE_NAME || 'ShortURL';

const createShortURL = async ({ url }) => {
  const shortURL = new ShortURLModel({ url });

  console.log(`creating on ${TABLE_NAME}:`, shortURL);
  const client = getClient();
  try {
    await client
      .putItem({
        TableName: TABLE_NAME,
        Item: shortURL.toItem(),
        ConditionExpression: 'attribute_not_exists(PK)',
      })
      .promise();

    return shortURL;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getShortURL = async ({ shortId }) => {
  const client = getClient();
  const shortURL = new ShortURLModel({ shortId });
  console.log(`fetching on ${TABLE_NAME}:`, { Key: shortURL.keys });
  try {
    const resp = await client
      .getItem({
        TableName: process.env.TABLE_NAME,
        Key: shortURL.keys,
      })
      .promise();
    console.log('resp', resp);
    if (!resp || !resp.Item) {
      return null;
    }
    return ShortURLModel.fromItem(resp.Item);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const incrementVisit = async ({ shortId }) => {
  const client = getClient();
  const shortURL = new ShortURLModel({ shortId });
  console.log(`fetching on ${TABLE_NAME}:`, { Key: shortURL.keys });
  try {
    const resp = await client
      .updateItem({
        TableName: process.env.TABLE_NAME,
        Key: shortURL.keys,
        ConditionExpression: 'attribute_exists(PK)',
        UpdateExpression: 'SET #visitCount = #visitCount + :inc',
        ExpressionAttributeNames: {
          '#visitCount': 'visitCount',
        },
        ExpressionAttributeValues: {
          ':inc': { N: '1' },
        },
      })
      .promise();
    console.log('resp', resp);
    if (!resp || !resp.Item) {
      return null;
    }
    return ShortURLModel.fromItem(resp.Item);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const scanShortURL = async () => {
  const client = getClient();
  console.log(`fetching ${TABLE_NAME}:`);
  try {
    const resp = await client
      .scan({
        TableName: process.env.TABLE_NAME,
      })
      .promise();
    console.log('resp', resp);
    return resp;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  createShortURL,
  getShortURL,
  scanShortURL,
  incrementVisit,
};
