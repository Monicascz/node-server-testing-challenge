
exports.up = function (knex) {
    return knex.schema
        .createTable("dogs", table => {
            table.increments("dog_id")
            table.string("dog_name").notNullable().unique()
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("dogs")
};
