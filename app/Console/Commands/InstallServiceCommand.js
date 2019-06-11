import { Command } from './Command';
import * as _ from 'lodash';
import colors from 'colors';
import InstallVscode from '../../Utils/Installs/InstallVscode';
import inquirer from 'inquirer';
// import of from 'await-of';

export default class VscodeCommand extends Command {
  signature() {
    return 'install <service>';
  }

  description() {
    return ['Install - Manager Editer of computer'];
  }

  options() {
    return [];
  }

  async handle(service) {
    const listService = {
      2: {
        name: 'vscode'
      }
    };

    _.mapKeys(listService, (value, key) => {
      console.log(`${key} : ${value.name}`);
    });

    const answers = await inquirer.prompt({ type: 'input', name: 'service', message: 'select service want install : ', default: 1 });
    service = listService[answers.service];
    switch (service.name) {
      case 'vscode':
        try {
          const install = new InstallVscode();
          const result = await install.service();
          if (result.code === 1) {
            console.log(colors.green(result.message));
          }
          const extention = await inquirer.prompt({ type: 'confirm', name: 'extention', message: 'you want install extentions : ', default: true });
          if (extention.extention) {
            await install.extentions();
          }
        } catch (e) {
          console.log(colors.red(e.message));
        }
        break;
      default:
        break;
    }
  }
}
