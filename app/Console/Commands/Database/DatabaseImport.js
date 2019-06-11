import _ from 'lodash';
import { Command, Error } from '../Command';
import { DatabaseService } from './DatabaseService';
import { App } from '@nsilly/container';
import fs from 'fs';
import { Console } from '@vicoders/console';

export default class DatabaseImport extends Command {
  signature() {
    return 'importdb <dbname> <file>';
  }

  description() {
    return 'Import Database !';
  }

  options() {
    return [{ key: 'user', description: 'Database username' }, { key: 'password', description: 'Database user password' }];
  }

  async handle(dbname, file, options) {
    const { executeable, host, port, user, password } = await App.make(DatabaseService).checkCommand(options);
    const command = App.make(DatabaseService).buildCommand(executeable, host, port, user, password);
    if (_.isNil(dbname) || dbname === '') {
      Error('dbname is required\ndbimport <dbname> <file>');
    }
    if (_.isNil(file) || file === '') {
      Error('File is required\ndbimport <dbname> <file>');
    }
    if (!fs.existsSync(file)) {
      Error('File not found');
    }
    await Console.childProcessExec(`${command} -p${password} -e "create database if not exists ${dbname}"`);
    await Console.childProcessExec(`${command} -p${password} ${dbname} < ${file}`);
    console.log('Import success !');
  }
}
