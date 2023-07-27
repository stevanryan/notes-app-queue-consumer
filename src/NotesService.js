const { Pool } = require('pg');

class NotesService {
  constructor() {
    this._pool = new Pool();
  }

  async getNotes(userId) {
    const query = {
      text: `SELECT notes.* FROM notes
            LEFT JOIN collaborations ON collaborations.note_id = notes.id
            WHERE notes.owner = $1 OR collaborations.user_id = $1
            GROUP BY notes.id`,
      values: [userId],
    };

    const noteResult = await this._pool.query(query);

    // Tidak perlu mapping karena tidak ditampilkan pada Apps sehingga properti bukan hal penting.
    return noteResult.rows;
  }
}

module.exports = NotesService;
