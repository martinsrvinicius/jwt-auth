const { Model } = require('objection');
const knex = require('../db');
const {Group,GroupChild} = require('./group');

Model.knex(knex)

class UserPermission extends Model {
  static get tableName(){
    return 'UserPermission';
  }
  
  static get idColumn() {
    return 'userpermissionid';
  }

  static get relationMappings() {
    return {
      group: {
        relation: Model.HasOneRelation,
        modelClass: Group,
        join: {
          from: 'UserPermission.groupid',
          to: 'Group.groupid'
        }
      },
      groupchild: {
        relation: Model.HasOneRelation,
        modelClass: GroupChild,
        join: {
          from: 'UserPermission.groupchildid',
          to: 'GroupChild.groupchildid'
        }
      }
    };
  }
}


class User extends Model {
  static get tableName(){
    return 'User';
  }
  
  static get idColumn() {
    return 'userid';
  }

  static get relationMappings() {
    return {
      permissions: {
        relation: Model.HasManyRelation,
        modelClass: UserPermission,
        join: {
          from: 'UserPermission.userid',
          to: 'User.userid'
        }
      }
    };
  }
}

module.exports = {User,UserPermission};