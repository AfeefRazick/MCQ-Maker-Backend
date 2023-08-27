const mongoose = require("mongoose");

const McqSubmissionSchema = mongoose.Schema({
  ownerID: { type: String, required: true },
  mcqArray: {
    type: Array,
    required: true,
  },
  submitterID: {
    type: String,
    required: true,
  },
});
module.exports = McqSubmissionSchema;
