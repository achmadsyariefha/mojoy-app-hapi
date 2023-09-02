const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const { mapDBToModelProduct } = require('../../utils/model');
const NotFoundError = require('../../exceptions/NotFoundError');

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
      text: 'INSERT INTO product VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, created_by',
      values: [id, name, category, price, createdAt, updatedAt, createdBy],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Produk gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAllProducts() {
    const result = await this._pool.query('SELECT * FROM product');
    return result.rows.map(mapDBToModelProduct);
  }

  async getProductById(id) {
    const query = {
      text: 'SELECT * FROM product WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Produk tidak ditemukan');
    }
    return result.rows.map(mapDBToModelProduct)[0];
  }

  async editProductById(id, { name, category, price }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE product SET name = $1, category = $2, price = $3, updated_at = $4 WHERE id = $5 RETURNING id',
      values: [name, category, price, updatedAt, id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui Produk. id tidak ditemukan');
    }
  }

  async deleteProductById(id) {
    const query = {
      text: 'DELETE FROM product WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Produk gagal dihapus. id tidak ditemukan');
    }
  }
}

module.exports = ProductService;
