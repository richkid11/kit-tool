import { GitBase } from './GitBase';
import opn from 'opn';

export class GitHubBrowser extends GitBase {
  async openRepositoryPage() {
    const url = this.urlParser();
    opn(url);
    await this.sleep(1000);
  }

  async openCommitPage() {
    const url = this.urlParser() + '/commits';
    opn(url);
    await this.sleep(1000);
  }

  async openPullRequestPage() {
    let url = this.urlParser();
    if (url.indexOf('github.com') > -1) {
      url += '/pulls';
    } else if (url.indexOf('bitbucket.org') > -1) {
      url += '/pull-requests';
    }
    opn(url);
    await this.sleep(1000);
  }

  async openNewPullRequestPage() {
    let url = this.urlParser();
    if (url.indexOf('github.com') > -1) {
      url += '/compare';
    } else if (url.indexOf('bitbucket.org') > -1) {
      url += '/pull-requests/new';
    }
    opn(url);
    await this.sleep(1000);
  }
}
