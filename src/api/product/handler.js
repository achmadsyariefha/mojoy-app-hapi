const autoBind = require('auto-bind');

class ProductHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async getProducts() {
    const products = await this._service.getAllProducts();
    return {
      status: 'success',
      data: {
        products,
      },
    };
  }
}

module.exports = ProductHandler;
