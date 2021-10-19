const db = require("../data/db-config");

const add = (newUser) => {
  return db("users")
    .insert(newUser)
    .returning(["user_id", "fullName","email", "username", "password", "role"])
    .then((insertedUsers) => insertedUsers[0]);
};

const findBy = (filter)=>{
  return db('users').where(filter)
}

const findById = async (id)=>{
  const user = await db('users').where("user_id", id).first();
  return user;
}

module.exports = {add, findBy, findById};
