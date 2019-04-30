import { useState } from 'react';
import _ from 'lodash';

import mapPaths from './Utils/mapPaths';

export default function useForm(initialValues = {}) {
  const [form, setForm] = useState(initialValues);

  const paths = mapPaths(form);

  const buildModelInput = path => {
    if (_.endsWith(path, 'Add')) {
      return initialValue => {
        const actualPath = _.replace(path, 'Add', '');
        const newValue = [..._.get(form, actualPath), _.clone(initialValue)];
        const newForm = _.set(_.clone(form), actualPath, newValue);
        setForm(newForm);
      };
    }

    if (_.endsWith(path, 'Remove')) {
      return index => {
        const actualPath = _.replace(path, 'Remove', '');
        const newValues = _.clone(_.get(form, actualPath));
        _.pullAt(newValues, index);
        const newForm = _.set(_.clone(form), actualPath, newValues);
        setForm(newForm);
      };
    }

    return {
      value: _.get(form, path),
      onChange: ({ target }) => {
        const value =
          target.type === 'checkbox' ? target.checked : target.value;
        const newForm = _.set(_.clone(form), path, value);
        setForm(newForm);
      },
    };
  };

  return [
    form,
    _.reduce(paths, (acc, path) => _.set(acc, path, buildModelInput(path)), {}),
  ];
}
