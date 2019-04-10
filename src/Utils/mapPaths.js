import _ from 'lodash';

function arrayModifiers(prefix) {
  return prefix ? [`${prefix}Add`, `${prefix}Remove`] : [];
}

function mapPaths(collection, prefix = '') {
  if (!_.isObject(collection)) {
    return prefix;
  }

  if (_.isArray(collection) && _.isEmpty(collection)) {
    return arrayModifiers(prefix);
  }

  return _.flatMap(collection, (value, key, coll) => {
    if (_.isPlainObject(coll)) {
      return mapPaths(value, `${prefix.length ? `${prefix}.` : ''}${key}`);
    }

    return [...arrayModifiers(prefix), ...mapPaths(value, `${prefix}[${key}]`)];
  });
}

export default mapPaths;
