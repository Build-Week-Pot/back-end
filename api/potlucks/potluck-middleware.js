const Users = require("../users/user-model")

const validReqBody = (req, res, next) => {
    const { potluckName, streetAddress, city, state, zipCode, dayMonthYear, timeOfPotLuck, specialInstructions } = req.body;
  
    if (
      !potluckName ||
      !potluckName.trim() ||
      !streetAddress ||
      !streetAddress.trim() ||
      !city ||
      !city.trim() ||
      !state ||
      !state.trim() ||
      !zipCode ||
      !zipCode.trim() ||
      !dayMonthYear ||
      !dayMonthYear.trim()||
      !timeOfPotLuck ||
      !timeOfPotLuck.trim()||
      !specialInstructions ||
      !specialInstructions.trim()
    ) {
      next({
        status: 422,
        message:
          "user_id, potluckName, streetAddress, city, state, zipCode, dayMonthYear, timeOfPotLuck, specialInstructions are required",
      });
    } else {
      req.potluckName = potluckName.trim();
      req.streetAddress = streetAddress.trim();
      req.city = city.trim();
      req.state = state.trim();
      req.zipCode = zipCode.trim();
      req.dayMonthYear = dayMonthYear.trim();
      req.timeOfPotLuck = timeOfPotLuck.trim();
      req.specialInstructions = specialInstructions.trim()
      next();
    }
  };

  const checkUserIdValid = async (req, res, next) =>{
    const validUserId = await Users.findById(req.params.user_id)

    if(!validUserId){
      next({status: 422, message: "No user exists with this user_id"})
    } else{
      next();
    }
  }

  

  module.exports = {validReqBody, checkUserIdValid};