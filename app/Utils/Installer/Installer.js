import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { File } from '@vicoders/console';
import dotenv from 'dotenv';
import { Warning } from '../../Console/Commands/Command';

export class Installer {
  cwd() {
    return process.cwd();
  }
  hasFile(path) {
    return fs.existsSync(path);
  }

  async declareEnvironmentVariable(variable, value, options) {
    options = options || {};
    if (_.isNil(options.environmentFilePath)) {
      options.environmentFilePath = '.env';
    }
    const val = fs.readFileSync(path.resolve(process.cwd(), options.environmentFilePath));
    if (val) {
      const is_declared = val.indexOf(variable) > -1;
      if (!is_declared) {
        await File.appendTo(path.resolve(process.cwd(), options.environmentFilePath), `${variable}="${value}"\n`);
      } else {
        const buf = Buffer.from(val);
        const value = dotenv.parse(buf);
        if (_.isNil(value.variable) || value.variable === '') {
          // val.replace(/^PUSHER_APP$|^PUSHER_APP=''$|^PUSHER_APP=""$|^PUSHER_APP=$/, '');
          // await File.appendTo(path.resolve(process.cwd(), options.environmentFilePath), `${variable}="${value}"\n`);
          Warning('Environment variable is declared but it is empty');
        } else {
          console.log('Environment variable is declared !');
        }
      }
    }
  }
}
