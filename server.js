const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const serverless = require("serverless-http");
const { authenticate } = require("./middleware/auth");

let connection = null;

const connectWithDB = async (req, res, next) => {
  if (!connection) {
    connection = await mongoose.connect(
      process.env.MONGODB_CONNECT_API_KEY_URL
    );
    console.log("Connected to DB");
  } else {
    console.log(
      "Connection already established, reusing the existing connection"
    );
  }
  next();
};

app.use(express.json());
app.use(cors());
app.all("*", connectWithDB);
app.use("/user/create", authenticate);

const mceRoute = require("./routes/mce");
const userRoute = require("./routes/user");
const mcqSubmissionRoute = require("./routes/mcqSubmission");

app.use("/mce", mceRoute);
app.use("/user", userRoute);
app.use("/mcqSubmission", mcqSubmissionRoute);

const PORT = process?.env?.PORT || 3002;
if (process?.env?.ENVIRONMENT === "production") {
  module.exports.handler = serverless(app);
  console.log("serverless");
} else {
  app.listen(PORT, () => {
    console.log("development");
    console.log(`Server is listening on port ${PORT}.`);
  });
}

// module.exports = {
//   express,
//   app,
//   dotenv,
//   mongoose,
// };
