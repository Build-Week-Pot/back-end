const router = require("express").Router();
const Potluck = require("./potluck-model");
const validReqBody = require('./potluck-middleware')

router.post("/:id/createpotluck", validReqBody, (req, res, next) => {
  const user_id = req.params.id;
  const {potluckName, streetAddress, city, state, zipCode, dayMonthYear, timeOfPotLuck, specialInstructions} = req.body;
  const newPotluck = { user_id, potluckName, streetAddress, city, state, zipCode, dayMonthYear, timeOfPotLuck, specialInstructions}
  Potluck.add(newPotluck)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
