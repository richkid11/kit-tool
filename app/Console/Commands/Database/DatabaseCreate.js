import _ from 'lodash';
import { Command, Error } from '../Command';
import { DatabaseService } from './DatabaseService';
import { Console } from '@vicoders/console';

export default class DatabaseCreate extends Command {
  signature() {
    return 'createdb <dbname>';
  }

  description() {
    return 'Create New Database !';
  }

  options() {
    return [
      { key: 'host', description: 'Database host' },
      { key: 'user', description: 'Database user' },
      { key: 'password', description: 'Database password' },
      { key: 'port', description: 'Database port' }
    ];
  }

  async handle(dbname, options) {
    if (_.isNil(dbname) || dbname === '') {
      Error('Name is required \n\ndbcreate <name>');
    }
    const dbService = new DatabaseService();
    const { executeable, host, port, user, password } = await dbService.checkCommand(options);
    const command = dbService.buildCommand(executeable, host, port, user, password);
    const ask = await Console.confirm('Do you want to create database with UTF8 ?');
    if (ask) {
      await Console.childProcessExec(`${command} -e 'create database if not exists ${dbname} character set utf8mb4 collate utf8mb4_unicode_ci'`);
    } else {
      await Console.childProcessExec(`${command} -e 'create database if not exists ${dbname}'`);
    }
    console.log('Create success !');
  }
}
