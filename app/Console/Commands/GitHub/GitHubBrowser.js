import { GitBase } from './GitBase';
import opn from 'opn';
import gitUrlParse from 'git-url-parse';
import remoteOriginUrl from 'remote-origin-url';
import inquirer from 'inquirer';
import * as _ from 'lodash';

export class GitHubBrowser extends GitBase {
  async actionBrowser() {
    const urlParser = () => {
      const remote = remoteOriginUrl.sync();
      const data = gitUrlParse(remote);
      const url = `https://${data.source}/${data.organization.replace(/[:]/, '')}/${data.name}`;
      return url;
    };

    const sleep = time => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    };

    const openRepositoryPage = async () => {
      const url = urlParser();
      opn(url);
      await sleep(1000);
    };

    const openCommitPage = async () => {
      const url = urlParser() + '/commits';
      opn(url);
      await sleep(1000);
    };

    const openPullRequestPage = async () => {
      let url = urlParser();
      if (url.indexOf('github.com') > -1) {
        url += '/pulls';
      } else if (url.indexOf('bitbucket.org') > -1) {
        url += '/pull-requests';
      }
      opn(url);
      await sleep(1000);
    };

    const openNewPullRequestPage = async () => {
      let url = urlParser();
      if (url.indexOf('github.com') > -1) {
        url += '/compare';
      } else if (url.indexOf('bitbucket.org') > -1) {
        url += '/pull-requests/new';
      }
      opn(url);
      await sleep(1000);
    };

    const availbleCommands = [
      { description: 'Open repository on your browser', handle: openRepositoryPage },
      { description: 'Open commits page', handle: openCommitPage },
      { description: 'Open pull request page', handle: openPullRequestPage },
      { description: 'New pull request', handle: openNewPullRequestPage }
    ];
    let message = 'Select task that you want \n\n';
    availbleCommands.forEach((item, key) => {
      message += `${key + 1}. ${item.description} \n`;
    });
    console.log(message);

    const answer = await inquirer.prompt({ type: 'input', name: 'command', message: 'Task Number: ', default: 1 });
    const command = availbleCommands[Number(answer.command) - 1];
    if (_.isUndefined(command)) {
      Error('Command not found');
    }
    await command.handle();

    process.exit();
  }
}
