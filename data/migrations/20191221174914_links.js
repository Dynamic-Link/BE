exports.up = function(knex, Promise) {
  return knex.schema.createTable("links", tbl => {
    tbl.increments()
    tbl.string("linkName")
    tbl.string("product")
    tbl.string("promotions")
    tbl.string("notes")
    tbl.string("defaultUrl")
    tbl.string("utmParameters")

    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("restrict")
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("links")
}
