import _ from 'lodash';

function arrayModifier(prefix) {
  return `${prefix}._isArray`;
}

function mapPaths(collection, prefix = '') {
  if (!_.isObject(collection)) {
    return prefix;
  }

  if (_.isArray(collection)) {
    if (!prefix.length) {
      throw Error('Form must be an object');
    }

    if (_.isEmpty(collection)) {
      return arrayModifier(prefix);
    }
  }

  return _.flatMap(collection, (value, key, coll) => {
    if (_.isPlainObject(coll)) {
      return mapPaths(value, `${prefix.length ? `${prefix}.` : ''}${key}`);
    }

    return [
      arrayModifier(prefix),
      ...mapPaths(value, `${prefix}.list[${key}]`),
    ];
  });
}

export default mapPaths;
