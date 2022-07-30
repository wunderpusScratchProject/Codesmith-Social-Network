const { Pool } = require('pg');

const PG_URI = 'postgres://fzboaueq:04lqTofvkpCTgTLzXZziHwuUZW7ljtm2@lallah.db.elephantsql.com/fzboaueq';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
