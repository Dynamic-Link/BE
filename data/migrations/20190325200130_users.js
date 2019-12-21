exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments()
    tbl.string("firstName")
    tbl.string("lastName")
    tbl
      .string("email")
      .unique()
      .notNullable()
    tbl.string("password").notNullable()
    tbl.boolean("isDeleted").defaultTo(false)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users")
}
