import Transformer from './Transformer';

export default class ConfigurationTransformer extends Transformer {
  transform(model) {
    return {
      id: model.id,
      key: model.key,
      value: model.value
    };
  }
}
