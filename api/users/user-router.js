const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { checkUsernameExists, validReqBody, validLoginBody, checkPasswordValid,checkUsernameValid } = require("./user-middleware");
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

router.post('/login', validLoginBody, checkUsernameValid, checkPasswordValid, (req, res) => {// eslint-disable-line
})


module.exports = router;
