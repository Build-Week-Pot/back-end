const db = require("../data/db-config");

const add = async (newPotluck) => {
  const [createdPotluck] = await db("potlucks").insert(newPotluck, [
    "potluck_id",
    "potluckName",
  ]);
  return createdPotluck;
};

const findBy = (filter) => {
  return db("potlucks").where(filter);
};

const findByPotluckId = async (id) => {
  const user = await db("potlucks").where("potluck_id", id).first();
  return user;
};

const findByUserId = async (user_id) => {
  const userPotlucks = await db("potlucks").where("user_id", user_id);
  return userPotlucks;
};

module.exports = { add, findBy, findByPotluckId, findByUserId };
