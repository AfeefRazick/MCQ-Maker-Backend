const express = require("express");
const router = express.Router();

const MCEModel = require("../models/mcqModel");
const UserModel = require("../models/userModel");

router.get("/:mceid", (req, res) => {
  MCEModel.findById(req.params.mceid)
    .then((err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", async (req, res) => {
  const data = req.body;

  MCEModel.create(data)
    .then((document) => {
      res.json(document);
      return document;
    })
    .then((document) => {
      // console.log(document);
      UserModel.updateOne(
        { _id: document.ownerID },
        { $push: { multipleChoiceExams: document } }
      ).then((response) => {
        // console.log(response);
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/", async (req, res) => {
  const data = req.body;

  //find mcq from mcqobjects collection and update the document
  let storedMce = await MCEModel.findById(data.id);
  storedMce.information = data.information;
  storedMce.mcqArray = data.mcqArray;

  const updatedMce = await storedMce.save();

  // .then((document) => {
  //   res.send("Updated Successfully");
  //   return document;
  // })
  // .catch((err) => {
  //   res.send(err);
  // });

  //find user who owns mcq and update the mcq in his multipleChoiceExams array
  let user = await UserModel.findById(updatedMce.ownerID);

  user.multipleChoiceExams = user.multipleChoiceExams.map((mce) => {
    if (mce._id.toString() === updatedMce._id.toString()) {
      return updatedMce;
    } else {
      return mce;
    }
  });

  user.save();
  res.json(user);
});

router.delete("/:mceid", (req, res) => {
  const mceid = req.params.mceid;
  MCEModel.findByIdAndDelete(mceid)
    .then(async (response) => {
      let user = await UserModel.findById(response.ownerID);
      console.log(user);

      if (user) {
        const index = user.multipleChoiceExams.findIndex((mce) => {
          console.log(mce._id.toString());
          return mce._id.toString() === mceid;
        });
        console.log(index);

        user.multipleChoiceExams.splice(index, 1);
        user.save().then((user) => {
          console.log(user);
          if (user) {
            res.json({ deleted: true });
          } else {
            res.json({ deleted: false });
          }
        });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
