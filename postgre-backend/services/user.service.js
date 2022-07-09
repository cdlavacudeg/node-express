const pool = require('../libs/postgres');

class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

  async find() {
    const query = 'SELECT * FROM task';
    const table = await pool.query(query);
    return table.rows;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
