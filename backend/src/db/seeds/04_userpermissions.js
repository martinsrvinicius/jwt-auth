/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('UserPermission').del()
    await knex('UserPermission').insert([
        { userid: 1, groupid: 1, groupchildid: 1, level: 4 },
        { userid: 1, groupid: 2, groupchildid: 2, level: 4 },
        { userid: 1, groupid: 2, groupchildid: 3, level: 4 },
        { userid: 1, groupid: 2, groupchildid: 4, level: 4 },
        { userid: 1, groupid: 2, groupchildid: 5, level: 4 },
        { userid: 1, groupid: 3, groupchildid: 6, level: 4 },
        { userid: 1, groupid: 3, groupchildid: 7, level: 4 },
        { userid: 1, groupid: 4, groupchildid: 8, level: 4 },
        { userid: 1, groupid: 4, groupchildid: 9, level: 4 },
        { userid: 1, groupid: 5, groupchildid: 10, level: 4 },
        { userid: 2, groupid: 1, groupchildid: 1, level: 4 },
        { userid: 2, groupid: 2, groupchildid: 2, level: 4 },
        { userid: 2, groupid: 2, groupchildid: 3, level: 4 },
        { userid: 2, groupid: 2, groupchildid: 4, level: 4 },
        { userid: 2, groupid: 2, groupchildid: 5, level: 4 },
        { userid: 2, groupid: 3, groupchildid: 6, level: 4 },
        { userid: 2, groupid: 3, groupchildid: 7, level: 4 },
        { userid: 2, groupid: 4, groupchildid: 8, level: 4 },
        { userid: 2, groupid: 4, groupchildid: 9, level: 4 },
        { userid: 2, groupid: 5, groupchildid: 10, level: 4 },
    ]);
};