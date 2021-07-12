const { nanoid } = require('nanoid');
const BaseModel = require('./BaseModel');

const SHORTID_SIZE = process.env.SHORTID_SIZE || 7;
const BASE_URL = process.env.BASE_URL || 'https://localhost:3001/dev';

class ShortURLmodel extends BaseModel {
  constructor({ shortId, url, baseUrl, visitCount }) {
    super();
    this.url = url;
    this.shortId = shortId || nanoid(SHORTID_SIZE);
    this.baseUrl = baseUrl || BASE_URL;
    this.shorten = `${this.baseUrl}/${this.shortId}`;
    this.visitCount = visitCount || 0;
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
    };
  }

  static fromItem(item) {
    if (!item) throw new Error('No item!');
    return new ShortURLmodel({
      shortId: item.shortId.S,
      url: item.url.S,
      baseUrl: item.baseUrl.S,
      visitCount: Number(item.visitCount.N),
    });
  }
}

module.exports = ShortURLmodel;
