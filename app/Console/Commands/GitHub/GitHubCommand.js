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
    const result = await clientWithAuth.repos
      .delete({
        owner: git_user_db.value,
        repo: name
      })
      .then(() => 'successfully delete ' + name + ' repo')
      .catch((e) => e);
    console.log(result);
  }

  async listRepository() {
    const git_user_db = await new ConfigurationRepository().getValue('git_user');
    const { clientWithAuth } = await this.authGit();
    const listRepo = await clientWithAuth.repos.list();
    const arr = [];
    for (const item of listRepo.data) {
      let branch;
      if (item.fork === true) {
        branch = null;
      } else {
        branch = await clientWithAuth.repos
          .listBranches({
            owner: git_user_db.value,
            repo: item.name
          })
          .then((data) => data.data.map((item) => item.name).toString())
          .catch(() => null);
      }
      const obj = { name: item.name, language: item.language, private: item.private, branch: branch, clone: item.clone_url };
      arr.push(obj);
    }
    console.table(arr);
  }
}
