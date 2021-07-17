const ShortURLModel = require('../models/ShortURLModel');
const { getDynamoDBClient } = require('./dynamoClient');

const TABLE_NAME = process.env.TABLE_NAME || 'ShortURL';

const createShortURL = async ({ url, shortId }) => {
  const shortURL = ShortURLModel.makeShortURL({ url, shortId });
  console.log(`creating on ${TABLE_NAME}:`, shortURL);
  const client = getDynamoDBClient();
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
  const client = getDynamoDBClient();
  const shortURLParams = ShortURLModel.makeQueryParams({ shortId });
  console.log(`fetching on ${TABLE_NAME}:`, { Key: shortURLParams.keys });
  try {
    const resp = await client
      .getItem({
        TableName: process.env.TABLE_NAME,
        Key: shortURLParams.keys,
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
  const client = getDynamoDBClient();
  const shortURLParams = ShortURLModel.makeQueryParams({ shortId });
  console.log(`fetching on ${TABLE_NAME}:`, { Key: shortURLParams.keys });
  try {
    const resp = await client
      .updateItem({
        TableName: process.env.TABLE_NAME,
        Key: shortURLParams.keys,
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
  const client = getDynamoDBClient();
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
