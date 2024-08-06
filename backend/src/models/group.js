const { Model } = require('objection');
const knex = require('../db');

Model.knex(knex)

class GroupChild extends Model {

  static get tableName(){
    return 'GroupChild';
  }
  
  static get idColumn() {
    return 'groupchildid';
  }

  static get relationMappings() {
    return {
      group: {
        relation: Model.HasOneRelation,
        modelClass: Group,
        join: {
          from: 'GroupChild.groupid',
          to: 'Group.groupid'
        }
      }
    };
  }
}


class Group extends Model {

  static get tableName(){
    return 'Group';
  }

  static get relationMappings() {

    return {
      children: {
        relation: Model.HasManyRelation,
        modelClass: GroupChild,
        join: {
          from: 'Group.groupid',
          to: 'GroupChild.groupid'
        }
      }
    };
  }

  static get idColumn() {
    return 'groupid';
  }
}



module.exports = {Group, GroupChild};