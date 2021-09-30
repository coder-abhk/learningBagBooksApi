const router = require("express").Router();
const client = require("../db/db");
// routes
router.get("/books", async function (req, res) {
  await client.connect(async (err) => {
    if (err) {
      return;
    }
    const collection = await client.db("LearningBag").collection("books");
    const booksData = await collection.find().toArray();
    res.status(200).json(booksData);
  });
});

router.get("/", (req, res) => {
  res.status(200).send("server is up!");
});

module.exports = router;
