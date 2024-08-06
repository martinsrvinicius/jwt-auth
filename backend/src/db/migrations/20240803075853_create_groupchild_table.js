/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('GroupChild', function(t) {
        t.increments('groupchildid').unsigned().primary();
        t.string('name',128).notNull();
        t.string('path',128).notNull();
        t.string('description',512);
        t.integer('groupid').unsigned().notNull().references('groupid').inTable('Group');
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
    return knex.schema.dropTable('GroupChild');
};
