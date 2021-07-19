# aws-lambda-url-shortener

### Design / DB

#### Terms and Concepts

- A [ShortURL](lib/models/ShortURLModel.js) represents a URL that has been shorten. They will be uniquely identified by a shortId.

#### Entity chart

| Entity   | PK                       | SK                       | GSI1PK | GSI1SK |
| -------- | ------------------------ | ------------------------ | ------ | ------ |
| ShortURL | SHORTURL#&lt;shortId&gt; | SHORTURL#&lt;shortId&gt; |        |        |

#### Access patterns chart

| Access pattern  | Target     | Parameters | Notes                             |
| --------------- | ---------- | ---------- | --------------------------------- |
| ShortURL (CRUD) | Main table | shortId    | Uniqueness requirement on shortId |

### Usage

#### Prerequistes

- dynampdb-local requires `Java Runtime Engine (JRE) version 6.x or newer`

- AWS account configured (default credential in ~/.aws or AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY set in terminal)

#### Get started

- clone the repo

- cd to/repo/path

- npm install

- npx serverless dynamodb install

- npm run start:offline

#### local dynamodb shell

dynamodb shell:
http://localhost:8000/shell/

#### Test the API locally

```bash
curl -X POST "http://localhost:3001/dev/shorten" -d '{"url":"https://www.zermatt.ch/en/Webcams"}' | jq

curl "http://localhost:3001/dev/shorten/cKFT4QP"  | jq

curl "http://localhost:3001/dev/shorten"  | jq

open "http://localhost:3001/dev/cKFT4QP"
```

#### Pagination

The list operation returns up to 50 shortURLs and then the `LastEvaluatedKey` allows to run a new scan starting this last key.

Encoding the nested object for a querystring:

```js
const querystring = require('querystring');

const LastEvaluatedKey = {
  SK: {
    S: 'SHORTURL#cKFT4QP',
  },
  PK: {
    S: 'SHORTURL#cKFT4QP',
  },
};

querystring.escape(JSON.stringify(LastEvaluatedKey));

// outputs
// '%7B%22SK%22%3A%7B%22S%22%3A%22SHORTURL%23cKFT4QP%22%7D%2C%22PK%22%3A%7B%22S%22%3A%22SHORTURL%23cKFT4QP%22%7D%7D'
```

### Deploy

```
➜  aws-lambda-url-shortener git:(master) npx serverless deploy
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service URL-shortener.zip file to S3 (39.3 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
......................................................................................................
Serverless: Stack update finished...
Service Information
service: URL-shortener
stage: dev
region: eu-west-1
stack: URL-shortener-dev
resources: 29
api keys:
  None
endpoints:
  POST - https://cxxxxxxxxb.execute-api.eu-west-1.amazonaws.com/dev/shorten
  GET - https://cxxxxxxxxb.execute-api.eu-west-1.amazonaws.com/dev/shorten/{shortId}
  GET - https://cxxxxxxxxb.execute-api.eu-west-1.amazonaws.com/dev/{shortId}
  GET - https://cxxxxxxxxb.execute-api.eu-west-1.amazonaws.com/dev/shorten
functions:
  createShortRL: URL-shortener-dev-createShortRL
  getShortURL: URL-shortener-dev-getShortURL
  redirectShortURL: URL-shortener-dev-redirectShortURL
  listShortURL: URL-shortener-dev-listShortURL
layers:
  None
Serverless: Deprecation warning: Starting with version 3.0.0, following property will be replaced:
              "provider.iamRoleStatements" -> "provider.iam.role.statements"
            More Info: https://www.serverless.com/framework/docs/deprecations/#PROVIDER_IAM_SETTINGS

**************************************************************************************************************************************
Serverless: Announcing Metrics, CI/CD, Secrets and more built into Serverless Framework. Run "serverless login" to activate for free..
**************************************************************************************************************************************
```

### Contributing

Anyone and everyone is welcome to contribute.

### Issues

Find a bug or want to request a new feature? Please let me know by submitting an issue.

### Licensing

Licensed under the MIT License

A copy of the license is available in the repository's [LICENSE](LICENSE) file.
