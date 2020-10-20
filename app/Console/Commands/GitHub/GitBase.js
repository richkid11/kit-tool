import ConfigurationRepository from '../../../Repositories/ConfigurationRepository';
import octikit from '@octokit/rest';
import { Error } from '../Command';

export class GitBase {
  async authGit() {
    const git_token_db = await new ConfigurationRepository().getValue('git_token');
    if (!git_token_db || !git_token_db.value) Error('Setup config git, please !');
    const clientWithAuth = new octikit({
      auth: git_token_db.value
    });
    return { clientWithAuth };
  }
}
