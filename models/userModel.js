const mongoose = require("mongoose");
const MCEModel = require("./mcqModel");
const McqSubmissionSchema = require("../Schema/mcqSubmissionSchema");

const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String, required: true },
  multipleChoiceExams: [
    // {
    //   mceName: { type: String, required: true },
    //   mceLink: { type: String, required: true },
    // },
    {
      ownerID: { type: String, required: true },

      information: {
        name: {
          type: String,
          required: true,
        },
        mcqDescription: { type: String, required: false },
      },

      mcqArray: {
        type: Array,
        required: true,
      },
      mcqSubmissions: [McqSubmissionSchema],
    },
  ],
  // userSubmissions: [{}],
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
