const router = require("express").Router();
const knex = require("knex");

const config = {
  client: "sqlite3",
  connection: {
    filename: "./data/zoos.db3"
  },
  useNullAsDefault: true
};
const db = knex(config);

router.post("/", (req, res) => {
  const name = req.body;

  db("zoos")
    .insert(name)
    .then(input => {
      res.status(200).json(input);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/", (req, res) => {
  db("zoos")
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .first()
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ message: "There's no zoo at that index" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .del()
    .then(zoo => res.status(200).json(zoo))
    .catch(err => res.status(500).json(err));
});

router.put("/:id", (req, res) => {
  const changes = req.body;

  db("zoos")
    .where({ id: req.params.id })
    .update(changes)
    .then(zoo => res.status(200).json(zoo))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
