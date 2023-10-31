/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("destinations", (table) => {
        table.bigIncrements("id")
        table.string("name").notNullable()
        table.text("description")
        table.string("location").notNullable()
        table.string("destinationType").notNullable()
        table.string("website")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("destinations")
}
