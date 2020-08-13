import { Command } from './Command';
import { Configuration } from '../../Utils/Configuration';
import { Console } from '@vicoders/console';
import fs from 'fs';
import shell from 'shelljs';
import { getDatabasePath, getInternalDatabasePath } from '../../../database/database.const';
import { dirname } from 'path';

export default class ConfigCommand extends Command {
  signature() {
    return 'config';
  }

  description() {
    return 'Setup config for command/cli !';
  }

  options() {
    return [
      { key: 'user', description: 'Database User' },
      { key: 'password', description: 'Database Password' },
      { key: 'host', description: 'Database Host' },
      { key: 'port', description: 'Database Port' },
      { key: 'docker', description: 'Path Docker Folder' }
    ];
  }

  async handle(options) {
    const dbpath = getDatabasePath();

    if (fs.existsSync(dbpath)) {
      const replace = await Console.confirm('Do you want to replace existing database', false);
      if (replace) {
        await shell.cp('-R', getInternalDatabasePath(), getDatabasePath());
      }
    } else {
      shell.mkdir('-p', dirname(getDatabasePath()));
      await shell.cp('-R', getInternalDatabasePath(), getDatabasePath());
    }

    const select = await Console.select('type', [
      { name: 'db', description: 'Database Config' },
      { name: 'dockerFolder', description: 'Docker Folder Config' },
      { name: 'tinyimage', description: 'TinyPNG API KEY https://tinypng.com/developers' },
      { name: 'git', description: 'Git Config' }
    ]);
    const config = new Configuration();
    switch (select.name) {
      case 'db':
        await config.configDB(options);
        break;
      case 'dockerFolder':
        await config.configDocker(options);
        break;
      case 'tinyimage':
        await config.configTinyImage();
        break;
      case 'git':
        await config.configGit();
        break;
      default:
        console.log('Programming is the art of arrangement !');
        break;
    }
  }
}
