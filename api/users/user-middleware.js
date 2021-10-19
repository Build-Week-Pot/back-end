const { JWT_SECRET } = require("../secrets");
const jwt = require("jsonwebtoken");
const Users = require("./user-model.js");
const bcrypt = require("bcryptjs");

const validReqBody = (req, res, next) => {
  const { fullName, email, username, password, role } = req.body;

  if (
    !fullName ||
    !fullName.trim() ||
    !email ||
    !email.trim() ||
    !username ||
    !username.trim() ||
    !password ||
    !password.trim() ||
    !role
  ) {
    next({
      status: 422,
      message:
        "Full name, email, username, password, and a role selection are required",
    });
  } else {
    req.fullName = fullName.trim();
    req.email = email.trim();
    req.username = username.trim();
    req.password = password.trim();
    req.role = role;
    next();
  }
};

const checkUsernameExists = async (req, res, next) => {
  const alreadyUsername = await Users.findBy({ username: req.username });

  if (alreadyUsername.length) {
    next({ status: 422, message: "Username is already taken." });
  } else {
    next();
  }
};

const checkUsernameValid = async (req, res, next) => {
  const validUser = await Users.findBy({ username: req.username });

  if (!validUser.length) {
    next({ status: 422, message: "invalid credentials" });
  } else {
    req.user = validUser[0];
    next();
  }
};

const checkPasswordValid = (req, res, next) => {
  const buildToken = (user) => {
    const payload = {
      subject: user.id,
      username: user.username,
    };
    const options = {
      expiresIn: "1d",
    };
    return jwt.sign(payload, JWT_SECRET, options);
  };

  if (bcrypt.compareSync(req.password, req.user.password)) {
    const token = buildToken(req.user);

    res.status(200).json({
      message: `welcome, ${req.user.username}`,
      token,
    });
    next();
  } else {
    next({ status: 422, message: "invalid credentials" });
  }
};

module.exports = {
  validReqBody,
  checkUsernameExists,
  checkUsernameValid,
  checkPasswordValid,
};
