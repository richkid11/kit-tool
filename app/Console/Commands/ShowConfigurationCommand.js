import { Command } from './Command';
import ConfigurationRepository from '../../Repositories/ConfigurationRepository';

export default class ShowConfigurationCommand extends Command {
  signature() {
    return 'showconfig';
  }

  description() {
    return 'Show all configuration';
  }

  async handle() {
    const configs = await new ConfigurationRepository().get();
    console.log(configs);
  }
}
