const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MCEModel = require("./models/mcqModel");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { authenticate } = require("./middleware/auth");

mongoose.connect(process.env.MONGODB_CONNECT_API_KEY_URL);

app.use(express.json());
app.use(cors());
app.use("/user/create", authenticate);

const mceRoute = require("./routes/mce");
const userRoute = require("./routes/user");
const mcqSubmissionRoute = require("./routes/mcqSubmission");

app.use("/mce", mceRoute);
app.use("/user", userRoute);
app.use("/mcqSubmission", mcqSubmissionRoute);

app.listen(3002, () => {
  console.log("poorgtrp");
});

module.exports = {
  express,
  app,
  dotenv,
  mongoose,
};
