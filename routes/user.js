const express = require("express");
const { decode } = require("jsonwebtoken");
const router = express.Router();
const UserModel = require("../models/userModel");
const User = require("../Classes/User");
// switch this to user id cuz header auth
router.get("/:jwt", (req, res) => {
  const jwtObject = decode(req.params.jwt);
  UserModel.findById(jwtObject.sub).then((document) => {
    // console.log(document);
    res.json(document);
  });
});

router.post("/create", (req, res) => {
  const user = new User(
    res.locals.sub,
    res.locals.name,
    res.locals.email,
    res.locals.picture
  );

  UserModel.create(user).then((document) => {
    res.json(document);
  });
});

// router.put();

router.delete("/delete/:jwt", (req, res) => {
  const sub = decode(req.params.jwt).sub;
  UserModel.deleteOne({ _id: sub }).then((result) => {
    // console.log(result);
    res.json(result);
  });
});

module.exports = router;
