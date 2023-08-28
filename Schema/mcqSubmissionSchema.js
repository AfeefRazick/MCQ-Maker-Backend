const mongoose = require("mongoose");

const McqSubmissionSchema = mongoose.Schema({
  ownerID: { type: String, required: true },
  mcqArray: {
    type: Array,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  submitterInfo: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
});

module.exports = McqSubmissionSchema;
