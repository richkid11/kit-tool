import GitUrlParse from 'git-url-parse';
import * as _ from 'lodash';
import remoteOriginUrl from 'remote-origin-url';
import ProjectRepository from '../../Repositories/ProjectRepository';
import { Command, Info, Table, Warning } from './Command';

const path = require('path');

export default class ProjectCommand extends Command {
  signature() {
    return 'project';
  }

  description() {
    return [];
  }

  options() {
    return [
      { key: 'drop', description: 'Delete project' },
      { key: 'update', description: 'Update project' }
    ];
  }

  async handle(select, options) {
    const repository = new ProjectRepository();
    let data = {
      name: path.basename(process.cwd()),
      dir_home: process.cwd()
    };
    const remote = remoteOriginUrl.sync();
    const url = GitUrlParse(remote);
    data = _.assign(data, { git_remote: `https://${url.source}/${url.full_name}.git` });
    switch (select) {
      case '.':
        await repository.create(data);
        Info('Success !');
        break;
      case 'list':
        const arr = [];
        _.map(await repository.get(), (value) => {
          const obj = { id: value.id, name: value.name };
          arr.push(obj);
        });
        Table(arr);
        if (_.has(options, 'drop')) {
          const project = await repository.findById(options.drop);
          if (!project) {
            Warning('Project not found');
            break;
          }
          await project.destroy();
        }
        if (_.has(options, 'update')) {
          const project = await repository.findById(options.update);
          if (!project) {
            Warning('Project not found');
            break;
          }
          await repository.update(project.id, data);
        }
        break;
      default:
        break;
    }
  }
}
