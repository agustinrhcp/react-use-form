import { useState } from 'react';
import _ from 'lodash';

import mapPaths from './Utils/PathMapper';

export default function useForm(initialValues = {}) {
  const [form, setForm] = useState(initialValues);

  const paths = mapPaths(form);

  const buildModelInput = path => {
    if (_.endsWith(path, 'Add')) {
      return initialValue => {
        const actualPath = _.replace(path, 'Add', '');
        const newValue = [..._.at(form, actualPath)[0], initialValue];
        const newForm = _.updateWith(_.clone(form), actualPath, () => newValue);
        setForm(newForm);
      };
    }

    if (_.endsWith(path, 'Remove')) {
      return index => {
        const actualPath = _.replace(path, 'Remove', '');
        const newValues = _.clone(_.at(form, actualPath)[0]);
        _.pullAt(newValues, index);
        const newForm = _.updateWith(_.clone(form), actualPath, () => newValues);
        setForm(newForm);
      };
    }

    return {
      value: _.at(form, path)[0],
      onChange: event => {
        const { value } = event.target;
        const newForm = _.updateWith(_.clone(form), path, () => value);
        setForm(newForm);
      },
    };
  };

  return [
    form,
    _.reduce(paths, (acc, path) => _.updateWith(acc, path, () => buildModelInput(path)), {}),
  ];
}
