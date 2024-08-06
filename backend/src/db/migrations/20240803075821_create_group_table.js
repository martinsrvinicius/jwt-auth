/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Group', function(t) {
        t.increments('groupid').unsigned().primary();
        t.string('name',128).notNull();
        t.string('description',512);
        t.dateTime('creationdate').notNull().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        t.dateTime('modifieddate').notNull().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        t.integer('creationuserid').unsigned().references('userid').inTable('User');
        t.integer('modifieduserid').unsigned().references('userid').inTable('User');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Group');
};
