import { GitBase } from './GitBase';
import _ from 'lodash';
import { Console } from '@vicoders/console';
import ConfigurationRepository from '../../../Repositories/ConfigurationRepository';
export class GitHubCommand extends GitBase {
  async createRepository(options) {
    const { clientWithAuth } = await this.authGit();
    let name;
    if (_.has(options, 'name')) {
      name = options.name;
    } else {
      name = await Console.ask(`What is name's repository : `);
    }
    await clientWithAuth.repos.createForAuthenticatedUser({
      name: name
    });
  }

  async deleteRepository(options) {
    const git_user_db = await new ConfigurationRepository().getValue('git_user');
    const { clientWithAuth } = await this.authGit();
    let name;
    if (_.has(options, 'name')) {
      name = options.name;
    } else {
      name = await Console.ask(`What is name's repository : `);
    }
    await clientWithAuth.repos
      .delete({
        owner: git_user_db.value,
        repo: name
      })
      .then(() => {
        console.log('successfully delete ' + name + ' repo');
      })
      .catch(e => {
        console.log(e);
      });
  }
}
