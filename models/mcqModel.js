const mongoose = require("mongoose");

const MCESchema = new mongoose.Schema({
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
  mcqSubmissions: [{}],
});

const MCEModel = mongoose.model("mcqobjects", MCESchema);
module.exports = MCEModel;
