import GitUrlParse from 'git-url-parse';
import remoteOriginUrl from 'remote-origin-url';
import ConfigurationRepository from '../../../Repositories/ConfigurationRepository';
import octikit from '@octokit/rest';
export class GitBase {
  sleep(time) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  urlParser() {
    const remote = remoteOriginUrl.sync();
    const data = GitUrlParse(remote);
    const url = `https://${data.source}/${data.organization.replace(/[:]/, '')}/${data.name}`;
    return url;
  }

  async authGit() {
    const git_token_db = await new ConfigurationRepository().getValue('git_token');
    const clientWithAuth = new octikit({
      auth: git_token_db.value
    });
    return { clientWithAuth };
  }
}
