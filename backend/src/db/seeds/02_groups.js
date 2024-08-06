/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('Group').del()
    await knex('Group').insert([
      {groupid: 1, name: 'Tarefas',description: 'Tarefas'},
      {groupid: 2, name: 'Comercial',description: 'Função Comercial'},
      {groupid: 3, name: 'Collection',description: 'Rotas e recolha'},
      {groupid: 4, name: 'Definições',description: 'Gestão da Plataforma'},
      {groupid: 5, name: 'Tabelas Auxiliares',description: 'Gestão de Tabelas Auxiliares'},
      {groupid: 6, name: 'Tickets',description: 'Gestão de Tickets'},
      {groupid: 7, name: 'Mapas',description: 'Gestão de Mapas'},
      {groupid: 8, name: 'Logística',description: 'Gestão de Logística'},
      {groupid: 9, name: 'PGA',description: 'PGA'},
      {groupid: 10, name: 'Analytics',description: 'Analytics'},
      {groupid: 11, name: 'Portal',description: 'Portal Backoffice'},
      {groupid: 12, name: 'Financial',description: 'Financial Backoffice'},
      {groupid: 13, name: 'Rotas',description: 'Gestão de Rotas'},
      {groupid: 14, name: 'Print Label',description: 'Print Label'},
      ]);
  };