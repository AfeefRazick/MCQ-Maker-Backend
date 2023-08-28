const express = require("express");
const UserModel = require("../models/userModel");
const router = express.Router();

// router.get()

router.post("/", async (req, res) => {
  const data = req.body;

  let user = await UserModel.findById(data.ownerID);

  let mce = user.multipleChoiceExams.find((mce) => {
    return data._id.toString() === mce._id.toString();
  }).mcqSubmissions;

  let mceAnswer = mce.find((submission) => {
    return data.submitterInfo.id === submission.submitterInfo.id;
  });

  if (mceAnswer) {
  } else {
    let marks = 0;

    data.mcqArray.map((mcqQuestionObject) => {
      if (
        mcqQuestionObject.selectedAnswerId === mcqQuestionObject.correctAnswerId
      ) {
        marks += 1;
      }
    });
    console.log({ ...data, marks: marks });

    mce.push({ ...data, marks: marks });
  }

  user.save();
  res.json(user);
});

// router.put()

// router.delete()

module.exports = router;
