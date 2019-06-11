import { Command } from './Command';
import ConfigurationRepository from '../../Repositories/ConfigurationRepository';
import ApiResponse from '../../Responses/ApiResponse';
import { App } from '@nsilly/container';
import ConfigurationTransformer from '../../Transformers/ConfigurationTransformer';

export default class ShowConfigurationCommand extends Command {
  signature() {
    return 'showconfig';
  }

  description() {
    return 'Show all configuration';
  }

  async handle() {
    const configs = await App.make(ConfigurationRepository).get();
    console.log(ApiResponse.collection(configs, new ConfigurationTransformer()));
  }
}
