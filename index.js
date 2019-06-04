const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const server = express();

server.use(express.json());
server.use(helmet());

const config = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "/data/lambda.sqlite3"
  },
  debug: true
};

const db = knex(config);
// endpoints here

server.post("/", (req, res) => {
  const name = req.body;

  db("zoos")
    .insert(name)
    .then(input => res.status(200).json(input))
    .catch(err => res.status(500).json(err));
});

server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err));
});

// module.exports = server;

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
