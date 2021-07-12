/* eslint-disable class-methods-use-this */
class BaseModel {
  constructor() {
    if (new.target === BaseModel) {
      throw new TypeError('Cannot construct BaseModel instances directly');
    }
  }

  // Getter
  get pk() {
    throw new Error('You have to implement the getter pk!');
  }

  get sk() {
    throw new Error('You have to implement the getter sk!');
  }

  get keys() {
    return {
      PK: { S: this.pk },
      SK: { S: this.sk },
    };
  }

  toItem() {
    throw new Error('You have to implement the method toItem!');
  }
}

module.exports = BaseModel;
