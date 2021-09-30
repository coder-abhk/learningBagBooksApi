const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routes/routes");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "https://learningbag.netlify.app" }));

// routers
app.use(router);

// invoke server
app.listen(PORT, function () {
  console.log(`server is at localhost:${PORT}`);
});
