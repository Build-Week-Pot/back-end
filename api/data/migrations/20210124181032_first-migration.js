exports.up = async (knex) => {
  await knex.schema.createTable("users", (users) => {
    users.increments("user_id");
    users.string("fullName", 200).notNullable();
    users.string("email", 100).notNullable();
    users.string("username", 200).notNullable().unique();
    users.string("password", 128).notNullable();
    users.string("role", 20).defaultTo("guest");
  });
  await knex.schema.createTable("potlucks", (potluck) => {
    potluck.increments("potluck_id");
    potluck
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users");
    potluck.string("potluckName", 120).notNullable();
    potluck.string("streetAddress", 120).notNullable();
    potluck.string("city", 120).notNullable();
    potluck.string("state", 120).notNullable();
    potluck.string("zipCode", 120).notNullable();
    potluck.string("dayMonthYear", 120).notNullable();
    potluck.string("timeOfPotluck", 120).notNullable();
    potluck.string("specialInstructions", 500).notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("potlucks");
  await knex.schema.dropTableIfExists("users");
};
