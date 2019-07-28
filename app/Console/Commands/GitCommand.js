import { Command } from './Command';
import { GitHubCommand } from './GitHub/GitHubCommand';
import inquirer from 'inquirer';
import { GitHubBrowser } from './GitHub/GitHubBrowser';
import _ from 'lodash';

export default class GitCommand extends Command {
  signature() {
    return 'git <action>';
  }

  description() {
    return 'All you need for your git';
  }

  options() {
    return [{ key: 'name', description: 'Name of repository' }];
  }

  async handle(action, options) {
    const command = new GitHubCommand();
    const browser = new GitHubBrowser();
    switch (action) {
      case 'create':
        await command.createRepository(options);
        break;
      case 'delete':
        await command.deleteRepository(options);
        break;
      case 'list':
        await command.listRepository();
        break;
      default:
        const availbleCommands = [
          { description: 'Open repository on your browser', handle: browser.openRepositoryPage },
          { description: 'Open commits page', handle: browser.openCommitPage },
          { description: 'Open pull request page', handle: browser.openPullRequestPage },
          { description: 'New pull request', handle: browser.openNewPullRequestPage }
        ];
        let message = 'Select task that you want \n\n';
        availbleCommands.forEach((item, key) => {
          message += `${key + 1}. ${item.description} \n`;
        });
        console.log(message);
        const answer = await inquirer.prompt({ type: 'input', name: 'command', message: 'Task Number: ', default: 1 });
        const command2 = availbleCommands[Number(answer.command) - 1];
        if (_.isUndefined(command)) {
          Error('Command not found');
        }
        await command2.handle();
        break;
    }

    process.exit();
  }
}
