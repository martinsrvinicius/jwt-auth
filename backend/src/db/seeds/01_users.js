/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('User').del()
    await knex('User').insert([
      {userid: 1, name: 'Vinicius Martins',password: '$2b$10$1ZpYj0E17dmjg/X3xFGG5eLP71WsTncsvdFGO9wjutEJv4WbYWr06',email:'it@ultriplo.com',phone: '962468873',login:'vinicius',language:'br'},
      {userid: 2, name: 'Rosemeri Martins',password: '$2b$10$1ZpYj0E17dmjg/X3xFGG5eLP71WsTncsvdFGO9wjutEJv4WbYWr06',email:'rosemeri_bock@hotmail.com',phone: '963669338',login:'rosemeri',language:'br'},
      {userid: 3, name: 'Ana Martins',password: '$2b$10$1ZpYj0E17dmjg/X3xFGG5eLP71WsTncsvdFGO9wjutEJv4WbYWr06',email:'anagloria.apm@gmail.com',phone: '963669338',login:'ana',language:'br'},
    ]);
  };