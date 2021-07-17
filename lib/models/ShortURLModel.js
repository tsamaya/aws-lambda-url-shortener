const { nanoid } = require('nanoid');
const BaseModel = require('./BaseModel');

const SHORTID_SIZE = process.env.SHORTID_SIZE || 7;
const BASE_URL = process.env.BASE_URL || 'https://localhost:3001/dev';

class ShortURLModel extends BaseModel {
  constructor({ shortId, url, baseUrl, visitCount, createdAt }) {
    super();
    this.url = url;
    this.shortId = shortId;
    this.baseUrl = baseUrl;
    this.shorten = `${this.baseUrl}/${this.shortId}`;
    this.visitCount = visitCount;
    this.createdAt = createdAt;
  }

  get pk() {
    return `SHORTURL#${this.shortId}`;
  }

  get sk() {
    return `SHORTURL#${this.shortId}`;
  }

  toItem() {
    return {
      ...this.keys,
      baseUrl: { S: this.baseUrl },
      url: { S: this.url },
      shortId: { S: this.shortId },
      shorten: { S: this.shorten },
      visitCount: { N: this.visitCount.toString() },
      createdAt: { S: this.createdAt },
    };
  }

  static fromItem(item) {
    if (!item) throw new Error('No item!');
    return new ShortURLModel({
      shortId: item.shortId.S,
      url: item.url.S,
      baseUrl: item.baseUrl.S,
      visitCount: Number(item.visitCount.N),
      createdAt: item.createdAt.S,
    });
  }

  static makeShortURL({ shortId, url, baseUrl, visitCount, createdAt }) {
    return new ShortURLModel({
      shortId: shortId || nanoid(SHORTID_SIZE),
      url,
      baseUrl: baseUrl || BASE_URL,
      visitCount: visitCount || 0,
      createdAt: createdAt || new Date().toISOString(),
    });
  }

  static makeQueryParams({ shortId, url, baseUrl, visitCount, createdAt }) {
    return new ShortURLModel({
      shortId,
      url,
      baseUrl,
      visitCount,
      createdAt,
    });
  }
}

module.exports = ShortURLModel;
