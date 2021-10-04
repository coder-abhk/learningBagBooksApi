const router = require("express").Router();
const client = require("../db/db");
// routes
router.get("/books", async (req, res) => {
  await client.connect(async (err) => {
    if (err) {
      return err;
    }
    const collection = await client.db("LearningBag").collection("books");
    const booksData = await collection.find().toArray();
    res.status(200).json(booksData);
  });
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
});

router.get("/", (req, res) => {
  res.status(200).send("server is up!");
});

module.exports = router;
