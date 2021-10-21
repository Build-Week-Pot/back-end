const users = [
    {
        user_id: 1,
        fullName: "Steven Homem",
        email: "sjhomem@outlook.com",
        username: 'ScubaSteve',
        password: '1234',
        role: 'organizer'
    },
    {
        user_id: 2,
        fullName: "Allison Homem",
        email: "allsion@outlook.com",
        username: 'AdorableAlli',
        password: '1234',
        role: 'guest'
    }
]

const foods = [
    {
        food_id: 1,
        food_name : "hamburger buns"
    },
    {
        food_id: 2,
        food_name : "hamburger patties"
    },
    {
        food_id: 3,
        food_name : "pepsi"
    },
    {
        food_id: 4,
        food_name : "potato chips"
    }
]

const potlucks = [
    {
        potluck_id: 1,
        user_id: 1,
        potluckName: "Steven Homem's Dinner",
        streetAddress: "3576 W Clabber Creek Blvd",
        city: 'Fayetteville',
        state: 'Arkansas',
        zipCode: '72704',
        dayMonthYear: '08032022',
        timeOfPotLuck: "1:00pm",
        specialInstructions: "none"

    }
]

const potluck_foods = [
    {
        potluck_food_id: 1,
        potluck_id: 1,
        food_id: 1
    }
]

const guests = [
    {
    guest_id: 1,
    potluck_id: 1,
    potluck_food_id: 1,
    user_id: 2,
    accepted: true
    }
]


exports.seed = async function (knex) {
    await knex('users').insert(users)
    await knex('foods').insert(foods)
    await knex('potlucks').insert(potlucks)
    await knex("potluck_foods").insert(potluck_foods)
    await knex("guests").insert(guests)
}