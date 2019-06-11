import _ from 'lodash';
import models from '../../models';
export default class ConfigurationRepository {
  async getValue(key) {
    const item = models.configuration.findOne({
      where: {
        key: key
      }
    });
    return item;
  }

  async setValue(key, value) {
    const configs = models.configuration.findAll();
    const item = _.find(configs, { key: key });
    if (item) {
      await item.update({ value: value });
    } else {
    }
  }

  async get() {
    return models.configuration.findAll();
  }
}
