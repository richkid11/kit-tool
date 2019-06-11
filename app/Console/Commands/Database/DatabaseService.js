import _ from 'lodash';
import Os from '../../../Utils/Os/Os';
import ConfigurationRepository from '../../../Repositories/ConfigurationRepository';
import { App } from '@nsilly/container';
import path from 'path';

export class DatabaseService {
  async checkCommand(options) {
    let host, port, user, password, executeable;
    if (!_.has(options, 'host')) {
      const dbhost = await App.make(ConfigurationRepository).getValue('dbhost');
      if (!_.isNil(dbhost) && dbhost.value !== 'localhost') {
        host = dbhost.value;
      } else {
        host = 'localhost';
      }
    } else {
      host = options.host;
    }

    if (!_.has(options, 'port')) {
      const dbport = await App.make(ConfigurationRepository).getValue('dbport');
      if (!_.isNil(dbport) && Number(dbport.value) !== 3306) {
        port = Number(dbport.value);
      } else {
        port = 3306;
      }
    } else {
      port = options.port;
    }

    if (!_.has(options, 'user')) {
      const dbuser = await App.make(ConfigurationRepository).getValue('dbuser');
      if (!_.isNil(dbuser) && !_.isNil(dbuser.value)) {
        user = dbuser.value;
      } else {
        user = 'root';
      }
    } else {
      user = options.user;
    }

    if (!_.has(options, 'password')) {
      const dbpass = await App.make(ConfigurationRepository).getValue('dbpass');
      if (!_.isNil(dbpass) && !_.isNil(dbpass.value)) {
        password = dbpass.value;
      } else {
        password = '';
      }
    } else {
      password = options.password;
    }

    const os = new Os().platform();

    if (os === 'win32') {
      const dbpath = await App.make(ConfigurationRepository).getValue('mysql_executeable');
      if (!_.isNil(dbpath)) {
        executeable = dbpath.value;
      } else {
        executeable = path.resolve(process.cwd(), 'mysql.exe');
      }
    } else {
      const dbpath = await App.make(ConfigurationRepository).getValue('mysql_executeable');
      if (!_.isNil(dbpath)) {
        executeable = dbpath.value;
      } else {
        executeable = 'mysql';
      }
    }
    return { host, port, user, password, executeable };
  }

  buildCommand(executeable, host, port, user, password) {
    const stubs = [executeable.replace('/', '//')];
    if (!_.isNil(host) && host !== '' && host !== 'localhost') {
      stubs.push('-h');
      stubs.push(host);
    }
    if (!_.isNil(port) && port !== '' && Number(port) !== 3306) {
      stubs.push(`--port=${port}`);
    }
    stubs.push('-u');
    stubs.push(user);
    if (!_.isNil(password) && password !== '') {
      stubs.push(`-p${password}`);
    }
    return stubs.join(' ');
  }
}
