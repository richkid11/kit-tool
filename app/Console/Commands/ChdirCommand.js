import { Command, Error, Table } from './Command';
import * as _ from 'lodash';
import ProjectRepository from '../../Repositories/ProjectRepository';
import inquirer from 'inquirer';
import { spawn } from 'child_process';

export default class ChdirCommand extends Command {
  signature() {
    return 'cd <project>';
  }

  description() {
    return ['cd to project !'];
  }

  options() {
    return [];
  }

  async handle(project) {
    try {
      const repository = new ProjectRepository();

      if (!project) {
        const list = await repository.get();
        let arr = [];
        _.map(list, (item) => {
          const obj = { name: item.name, id: item.id };
          arr.push(obj);
        });
        Table(arr);

        const as = await inquirer.prompt({ type: 'input', name: 'project', message: 'Select project id : ' });

        if (as.project) {
          project = as.project;
        }
      }

      const item = await repository.findById(project);

      if (!item) {
        throw new Error('Project not exists  !');
      }

      spawn('bash', ['-i'], {
        cwd: item.dir_home,
        env: process.env,
        stdio: 'inherit'
      });
    } catch (e) {
      Error(e.message)
    }
  }
}
