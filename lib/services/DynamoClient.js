const AWS = require('aws-sdk');

// allow local development with a local dynamodb on port 8000
if (process.env.IS_OFFLINE) {
  AWS.config.update({
    endpoint: 'http://localhost:8000',
  });
}

let client = null;

const getDynamoDBClient = () => {
  if (client) {
    return client;
  }
  client = new AWS.DynamoDB({
    httpOptions: {
      connectTimeout: 1000,
      timeout: 1000,
    },
  });
  return client;
};

module.exports = { getDynamoDBClient };
