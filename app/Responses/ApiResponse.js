import * as _ from 'lodash';

export default class ApiResponse {
  static item(obj, transformer) {
    return transformer.get(obj);
  }

  static collection(collection, transformer) {
    const data = _.map(collection, i => {
      return transformer.get(i);
    });
    return data;
  }

  static array(array) {
    if (!_.isArray(array)) {
      throw new Error('ApiResponse.array expect an array', 2001);
    }
    return array;
  }

  static success() {
    return 'success';
  }
}
