import { Command } from './Command';
import { GitHubCommand } from './GitHub/GitHubCommand';

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
    switch (action) {
      case 'create':
        await command.createRepository(options);
        break;
      case 'delete':
        await command.deleteRepository(options);
        break;
      default:
        break;
    }

    process.exit();
  }
}
