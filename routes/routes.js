const router = require("express").Router();
const client = require("../db/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// auth routes
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  await client.connect(async (err) => {
    // connect mongod
    if (err) {
      return err;
    }
    // get collection
    const collection = await client.db("LearningBag").collection("users");
    collection.findOne({ email }, (collError, result) => {
      if (collError) {
        res.send(collError);
      } else {
        bcrypt.compare(
          password,
          result.hashedPassword,
          (bcryptError, isMatched) => {
            if (isMatched) {
              res.send({
                email: result.email,
                username: result.username,
                isMatched,
              });
            } else {
              res.send({ bcryptError, isMatched });
            }
          }
        );
      }
    });
  });
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  // connect mongod
  await client.connect(async (err) => {
    if (err) {
      return err;
    }
    // get collection
    const collection = await client.db("LearningBag").collection("users");
    collection.findOne({ email }, (evError, userData) => {
      if (!evError) {
        if (userData !== null && userData.email === email) {
          res.send({
            message: `user with ${email} already exist.`,
            isRegistered: false,
          });
        } else {
          // hash incomming password
          bcrypt.hash(password, saltRounds, (hashError, hashedPassword) => {
            if (hashError) {
              res.send({ hashError });
            } else {
              // insert document
              collection.insertOne(
                { username, email, hashedPassword },
                (collError) => {
                  if (collError) {
                    res.send({ collError });
                  } else {
                    res.send({
                      message: `user registered successfully.`,
                      isRegistered: true,
                    });
                  }
                }
              );
            }
          });
        }
      } else {
        res.send(evError);
      }
    });
  });
});

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

router.get("/", (req, res) => {
  res.status(200).send("server is up!");
});

module.exports = router;
