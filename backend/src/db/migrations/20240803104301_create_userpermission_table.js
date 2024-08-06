/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('UserPermission', function(t) {
        t.increments('userpermissionid').unsigned().primary();
        t.integer('userid').unsigned().notNull().references('userid').inTable('User').onDelete('CASCADE');
        t.integer('groupid').unsigned().notNull().references('groupid').inTable('Group');
        t.integer('groupchildid').unsigned().notNull().references('groupchildid').inTable('GroupChild');
        t.tinyint('level').notNull().defaultTo(0);
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
    return knex.schema.dropTable('UserPermission');
};
