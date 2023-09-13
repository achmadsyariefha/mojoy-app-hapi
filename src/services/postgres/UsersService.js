const { Pool } = require('pg');
const { mapDBToModelUser } = require('../../utils/model');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async getAllUsers() {
    const result = await this._pool.query('SELECT * FROM users');
    return result.rows.map(mapDBToModelUser);
  }
}

module.exports = UsersService;
