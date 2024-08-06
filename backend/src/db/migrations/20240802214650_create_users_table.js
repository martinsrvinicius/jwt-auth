/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('User', function(t) {
        t.increments('userid').unsigned().primary();
        t.string('name',128).notNull();
        t.string('email').notNull();
        t.string('phone',128).notNull();
        t.string('login',128).notNull();
        t.string('password').notNull();
        t.string('image',128);
        t.string('language',2);
        t.dateTime('creationdate').notNull().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        t.dateTime('modifieddate').notNull().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        t.dateTime('lastaccessdate');
        t.boolean('isblocked').notNull().defaultTo(0);
        t.string('resettoken').nullable();
        t.dateTime('resetexpires').nullable();
        t.boolean('resetused').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('User');
};