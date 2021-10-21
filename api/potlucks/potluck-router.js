const router = require("express").Router();
const Potluck = require("./potluck-model");
const {validReqBody, checkUserIdValid} = require("./potluck-middleware");

router.post("/:id/createpotluck",checkUserIdValid, validReqBody, (req, res, next) => {
  const user_id = req.params.id;
  const {
    potluckName,
    streetAddress,
    city,
    state,
    zipCode,
    dayMonthYear,
    timeOfPotLuck,
    specialInstructions,
  } = req.body;
  const newPotluck = {
    user_id,
    potluckName,
    streetAddress,
    city,
    state,
    zipCode,
    dayMonthYear,
    timeOfPotLuck,
    specialInstructions,
  };
  Potluck.add(newPotluck)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:user_id", checkUserIdValid, (req, res, next) => {
  const user_id = req.params.user_id;
  Potluck.findByUserId(user_id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
