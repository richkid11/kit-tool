import Repository from './Repository';
import models from '../../models';

export default class ConfigurationRepository extends Repository {
  Models() {
    return models.configuration;
  }

  async setValue(key, value) {
    const item = await this.updateOrCreate({ key: key }, { key: key, value: value });
    return item;
  }

  async getValue(key) {
    const item = await this.where('key', key).first();
    return item;
  }
}
