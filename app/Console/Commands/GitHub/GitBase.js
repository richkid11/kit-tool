import ConfigurationRepository from '../../../Repositories/ConfigurationRepository';
import octikit from '@octokit/rest';

export class GitBase {
  async authGit() {
    const git_token_db = await new ConfigurationRepository().getValue('git_token');
    const clientWithAuth = new octikit({
      auth: git_token_db.value
    });
    return { clientWithAuth };
  }
}
