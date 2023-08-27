const express = require("express");
const UserModel = require("../models/userModel");
const router = express.Router();

// router.get()

router.post("/", async (req, res) => {
  const data = req.body;
  console.log(data);
  let user = await UserModel.findById(data.ownerID);

  let mce = user.multipleChoiceExams.find((mce) => {
    return data._id.toString() === mce._id.toString();
  }).mcqSubmissions;

  let mceAnswer = mce.find((submission) => {
    return data.submitterID === submission.submitterID;
  });

  if (mceAnswer) {
  } else {
    console.log(data);
    mce.push({ ...data });
  }

  user.save();
  res.json(user);
});

// router.put()

// router.delete()

module.exports = router;
