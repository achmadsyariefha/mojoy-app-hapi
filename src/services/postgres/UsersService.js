const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { mapDBToModelUser } = require('../../utils/model');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ username, email, password }) {
    const id = `user-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, username, email, password],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Gagal menambahkan pengguna');
    }

    return result.rows[0].id;
  }

  async getAllUsers() {
    const result = await this._pool.query('SELECT * FROM users');
    return result.rows.map(mapDBToModelUser);
  }

  async getUserById(id) {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Gagal mendapatkan pengguna. Id tidak ditemukan');
    }
    return result.rows.map(mapDBToModelUser)[0];
  }
}

module.exports = UsersService;
