const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class ProductService {
  constructor() {
    this._pool = new Pool();
  }

  async addProduct({
    name, category, price, createdBy,
  }) {
    const id = `product-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO product VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, name, category, price, createdAt, updatedAt, createdBy],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Produk gagal ditambahkan');
    }

    return result.rows[0].id;
  }
}

module.exports = ProductService;
