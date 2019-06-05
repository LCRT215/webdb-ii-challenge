const router = require("express").Router();
const knex = require("knex");
const BearsModel = require("./bears-model");

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
  BearsModel.add()
    .insert(name)
    .then(input => {
      res.status(200).json(input);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/", (req, res) => {
  BearsModel.find()
    .then(bears => res.status(200).json(bears))
    .catch(err => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  BearsModel.findById(req.params.id)
    // .where({ id: req.params.id })
    // .first()
    .then(bear => {
      if (bear) {
        res.status(200).json(bear);
      } else {
        res
          .status(404)
          .json({ message: "There aren't any bears at that index" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  //   db("zoos")
  //     .where({ id: req.params.id })
  BearsModel.remove(req.params.id)
    .del()
    .then(bear => res.status(200).json(bear))
    .catch(err => res.status(500).json(err));
});

router.put("/:id", (req, res) => {
  BearsModel.update(req.params.id, req.body)
    //   const changes = req.body;
    // .where({ id: req.params.id })
    // .update(changes)
    .then(bear => res.status(200).json(bear))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
