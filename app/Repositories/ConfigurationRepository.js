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
    const config = models.configuration.findOne({
      where: {
        key: key
      }
    });
    if (config) {
      return models.configuration.update({ value: value }, { where: { key: key } });
    } else {
      return models.configuration.create({ key: key, value: value });
    }
  }

  async get() {
    return models.configuration.findAll();
  }
}
