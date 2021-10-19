exports.up = async (knex) => {
  await knex.schema.createTable("users", (users) => {
    users.increments("user_id");
    users.string("fullName", 200).notNullable();
    users.string("email", 100).notNullable();
    users.string("username", 200).notNullable().unique();
    users.string("password", 128).notNullable();
    users.string('role',20).defaultTo('guest')
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("users");
};
