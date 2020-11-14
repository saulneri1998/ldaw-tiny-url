exports.up = function(knex) {
    return knex.schema
        .createTable('urls', (table) => {
            table.increments('id');
            table.string('original', 255).notNullable();
            table.string('tiny', 255).notNullable();
            table.integer('times_visited').notNullable();
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('urls');
};