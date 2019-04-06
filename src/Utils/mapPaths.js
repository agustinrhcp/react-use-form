import _ from 'lodash';

function mapPaths(collection, prefix = '') {
  if (!_.isObject(collection)) { return prefix; }

  return _.flatMap(collection, (value, key, coll) => {
    if (_.isPlainObject(coll)) {
      return mapPaths(value, `${prefix.length ? `${prefix}.` : ''}${key}`);
    }

    const arrayModifiers = prefix.length ? [`${prefix}Add`, `${prefix}Remove`] : [];
    return [...arrayModifiers, ...mapPaths(value, `${prefix}[${key}]`)];
  });
}

export default mapPaths;
