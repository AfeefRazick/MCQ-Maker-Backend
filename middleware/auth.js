const express = require("express");
const { decode, verify } = require("jsonwebtoken");
// const router = express.Router();
// const UserModel = require("../models/userModel");
// const User = require("../Classes/User");

const authenticate = (req, res, next) => {
  if (req.body.email) {
  } else if (req.body.credential) {
    const jwtObject = decode(req.body.credential);
    res.locals.sub = jwtObject.sub;
    res.locals.name = jwtObject.name;
    res.locals.email = jwtObject.email;
    res.locals.picture = jwtObject.picture;
    next();
  }
};

const authorizeJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    verify(token, process.env.GOOGLE_CLIENT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  }
};

module.exports = { authenticate, authorizeJWT };
