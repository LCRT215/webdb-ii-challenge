const knex = require("knex");

const config = {
  client: "sqlite3",
  connection: {
    filename: "./data/zoos.db3"
  },
  useNullAsDefault: true
};

const db = knex(config);

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db("zoos");
}

function findById(id) {
  return db("zoos")
    .where({ id })
    .first();
}

function add() {
  return db("zoos");
}

function update(id, changes) {
  return db("zoos")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("zoos").where({ id });
}
