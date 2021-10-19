const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { checkUsernameExists, validReqBody, checkPasswordValid,checkUsernameValid } = require("./user-middleware");
const User = require("./user-model");

router.post("/register", validReqBody, checkUsernameExists,  (req, res, next) => {
  const { fullName, email, username, password, role} = req.body;
  const hash = bcrypt.hashSync(password, 8);

  User.add({ fullName, email, username ,password: hash, role})
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/login', validReqBody, checkUsernameValid, checkPasswordValid, (req, res) => {
})

module.exports = router;
