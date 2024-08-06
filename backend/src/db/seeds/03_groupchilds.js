/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('GroupChild').del()
    await knex('GroupChild').insert([
      {groupchildid: 1, groupid: 1, name: 'Minhas Tarefas',description: 'Tarefas Pessoais do Utilizador', path:'tasks'},
      {groupchildid: 2, groupid: 2, name: 'Entidades',description: 'Gestão de Entidades', path:'entities'},
      {groupchildid: 3, groupid: 2, name: 'Contactos', description: 'Gestão de Contactos', path:'contacts'},
      {groupchildid: 4, groupid: 2, name: 'Protocolos', description: 'Gestão de Protocolos', path:'protocols'},
      {groupchildid: 5, groupid: 2, name: 'Deals', description: 'Gestão de Deals', path:'deals'},
      {groupchildid: 6, groupid: 3, name: 'Hosts', description: 'Gestão de Hosts', path:'hosts'},
      {groupchildid: 7, groupid: 3, name: 'Containers', description: 'Gestão de Containers', path:'containers'},
      {groupchildid: 8, groupid: 4, name: 'Utilizadores',description: 'Gestão de Utilizadores', path:'users'},
      {groupchildid: 9, groupid: 4, name: 'Reciclagem',description: 'Gestão da Reciclagem', path:'trash'},
      {groupchildid: 10, groupid: 5, name: 'Geral',description: 'Gestão de Tabelas Auxiliares', path:'aux'},
      {groupchildid: 11, groupid: 3, name: 'Locations',description: 'Gestão de Locations', path:'locations'},
      {groupchildid: 12, groupid: 6, name: 'Geral',description: 'Envio e Gestão de Tickets', path:'tickets'},
      {groupchildid: 13, groupid: 7, name: 'Mapas',description: 'Gestão de Mapas', path:'maps'},
      {groupchildid: 14, groupid: 3, name: 'Collections',description: 'Gestão de Collections', path:'collections'},
      {groupchildid: 15, groupid: 8, name: 'Veículos',description: 'Gestão de Veículos', path:'vehicles'},
      {groupchildid: 16, groupid: 8, name: 'Condutores',description: 'Gestão de Condutores', path:'drivers'},
      {groupchildid: 17, groupid: 9, name: 'Reclamações',description: 'Gestão de Reclamações', path:'issues'},
      {groupchildid: 18, groupid: 3, name: 'Trackings',description: 'Gestão de Trackings', path:'trackings'},
      {groupchildid: 19, groupid: 10, name: 'Analytics',description: 'Analytics', path:'analytics'},
      {groupchildid: 20, groupid: 11, name: 'Portal',description: 'Gestão de Backoffice Portal', path:'portal'},
      {groupchildid: 21, groupid: 9, name: 'Failed',description: 'Gestão de Recolhas Falhadas', path:'failed'},
      {groupchildid: 22, groupid: 12, name: 'Beneficiaries',description: 'Gestão de Beneficiários', path:'beneficiaries'},
      {groupchildid: 23, groupid: 13, name: 'Rotas Diárias',description: 'Gestão Diária de Rotas', path:'dailyroutes'},
      {groupchildid: 24, groupid: 12, name: 'Pagamentos',description: 'Pagamentos', path:'payments'},
      {groupchildid: 25, groupid: 12, name: 'Pagamentos',description: 'Gestão de Pagamentos', path:'payments'},
      {groupchildid: 26, groupid: 13, name: 'Inserir Rotas de Localização',description: 'Inserir Rotas de Localização', path:'insertlocationroute'},
      {groupchildid: 27, groupid: 9, name: 'Localizador de Chave',description: 'Localizador de Chave', path:'keyfinder'},
      {groupchildid: 28, groupid: 14, name: 'Print Label',description: 'Print Label', path:'printlabel'},
    ]);
  }