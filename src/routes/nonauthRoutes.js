const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const userValidationSchema = require("../validations/userSchema");
require("dotenv").config();
const saltRounds = 10;

router.get("/health-check", (req, res) => {
  console.log(req.session.loggedin);
  res.json({ status: "health-ok" });
});

router.post("/login", (req, res) => {
  let body = req.body;
  console.log("Post received: " + JSON.stringify(body));
  if (req.session.loggedin) {
    return res.json({ status: "logged" });
    // return res.redirect("/filter");
  }
  // TODO: Implement login
  let userFilter = {};
  if (req.body.name) {
    userFilter = { name: req.body.name };
  }
  if (req.body.email) {
    userFilter = { email: req.body.email };
  }

  console.log("User filter received ", userFilter);
  User.findOne(userFilter, (erro, userDB) => {
    if (erro) {
      return res.status(500).json({
        ok: false,
        err: erro,
      });
    }

    if (!userDB || userDB === undefined) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Incorrect user or password",
        },
      });
    }
    if (!bcrypt.compareSync(body.password, userDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Incorrect user or password",
        },
      });
    }

    let token = jwt.sign(
      {
        user: userDB,
      },
      process.env.SEED_AUTENTICACION,
      {
        expiresIn: process.env.CADUCIDAD_TOKEN,
      }
    );
    req.session.loggedin = true;
    console.log("logueando");
    console.log(req.session.loggedin);
    res.json({
      ok: true,
      user: userDB,
      token,
    });
  });
});

router.post("/register", function (req, res) {
  let data = req.body;
  console.log(data);
  Joi.validate(data, userValidationSchema, (err, value) => {
    if (err) {
      console.log("there was an error with the validation");
      console.log(err.details[0].message);
      res.status(422).json({
        status: "error",
        message: "Invalid request data",
        data: data,
      });
    } else {
      const { password } = data;
      let user = new User({
        ...data,
        deleted: false,
        password: bcrypt.hashSync(password, 10),
      });
      user.save((err, userDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
          user: userDB,
        });
      });
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ status: "loggedout" });
});
// router.get("/", (req, res) => {
//   res.json({ status: "ok" });
// });
module.exports = router;
