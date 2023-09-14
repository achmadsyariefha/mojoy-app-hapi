const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { mapDBToModelUser } = require('../../utils/model');
const InvariantError = require('../../exceptions/InvariantError');

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
}

module.exports = UsersService;
