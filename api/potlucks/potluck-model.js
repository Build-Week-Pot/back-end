const db = require("../data/db-config");

const add = async (newPotluck) => {

  const createdPotluck = await db("potlucks").insert(newPotluck,["potluck_id", "potluckName"])
  return createdPotluck
};

const findBy = (filter)=>{
  return db('potlucks').where(filter)
}

const findById = async (id)=>{
  const user = await db('potlucks').where("potluck_id", id).first();
  return user;
}

module.exports = {add, findBy, findById};