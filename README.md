# aws-lambda-url-shortener

prerequistes
dynampdb-local requires
Java Runtime Engine (JRE) version 6.x or newer

clone the repo

cd to clone path

npm install

npx serverless dynamodb instal

dynamodb shell:
http://localhost:8000/shell/

// "start:dynamodb": "docker run --rm -p 8000:8000 amazon/dynamodb-local",

| Entity   | PK                       | SK                       | GSI1PK | GSI1SK |
| -------- | ------------------------ | ------------------------ | ------ | ------ |
| ShortURL | SHORTURL#&lt;shortId&gt; | SHORTURL#&lt;shortId&gt; |        |        |

| Access pattern  | Target     | Parameters | Notes                             |
| --------------- | ---------- | ---------- | --------------------------------- |
| ShortURL (CRUD) | Main table | shortId    | Uniqueness requirement on shortId |

## test the API

```bash
curl -X POST "http://localhost:3001/dev/shorten" -d '{"url":"https://www.zermatt.ch/en/Webcams"}' | jq

curl "http://localhost:3001/dev/shorten/0TLWMST"  | jq

curl "http://localhost:3001/dev/shorten"  | jq

open "http://localhost:3001/dev/035PscI"
```
