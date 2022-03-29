const express = require("express");
const router = express.Router();

/* Route specific middlewares */
const authMiddlewares = require("../middlewares/authMiddleware");
// TODO: auth middleware

router.get("/filter", authMiddlewares.checkSession, (req, res) => {
  res.json({ filtered: [] });
});

module.exports = router;
