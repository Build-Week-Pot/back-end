exports.up = async (knex) => {
  await knex.schema
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("fullName", 200).notNullable();
      users.string("email", 100).notNullable();
      users.string("username", 200).notNullable().unique();
      users.string("password", 128).notNullable();
      users.string("role", 20).defaultTo("guest");
    })
    .createTable("foods", (food) => {
      food.increments("food_id");
      food.string("food_name");
    })
    .createTable("potlucks", (potluck) => {
      potluck.increments("potluck_id");
      potluck
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
      potluck.string("potluckName", 120).notNullable();
      potluck.string("streetAddress", 120).notNullable();
      potluck.string("city", 120).notNullable();
      potluck.string("state", 120).notNullable();
      potluck.string("zipCode", 120).notNullable();
      potluck.string("dayMonthYear", 120).notNullable();
      potluck.string("timeOfPotLuck", 120).notNullable();
      potluck.string("specialInstructions", 500).notNullable();
    })
    .createTable("potluck_foods", (potluckFood) => {
      potluckFood.increments("potluck_food_id");
      potluckFood
        .integer("potluck_id")
        .unsigned()
        .notNullable()
        .references("potluck_id")
        .inTable("potlucks")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
      potluckFood
        .integer("food_id")
        .unsigned()
        .notNullable()
        .references("food_id")
        .inTable("foods")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    })
    .createTable("guests", (guest) => {
      guest.increments("guest_id");
      guest
        .integer("potluck_id")
        .unsigned()
        .notNullable()
        .references("potluck_id")
        .inTable("potlucks")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
      guest
        .integer("potluck_food_id")
        .unsigned()
        .notNullable()
        .references("potluck_food_id")
        .inTable("potluck_foods")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
      guest
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
      guest.boolean("accepted").defaultTo(false);
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("guests");
  await knex.schema.dropTableIfExists("potluck_foods");
  await knex.schema.dropTableIfExists("potlucks");
  await knex.schema.dropTableIfExists("foods");
  await knex.schema.dropTableIfExists("users");
};
