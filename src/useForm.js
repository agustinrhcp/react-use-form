import { useState } from 'react';
import _ from 'lodash';

import mapPaths from './Utils/mapPaths';
import buildField from './Utils/buildField';

export default function useForm(initialValues = {}) {
  const [form, setForm] = useState(initialValues);

  const paths = mapPaths(form);

  return [
    form,
    _.reduce(
      paths,
      (acc, path) => _.set(acc, path, buildField(path, form, setForm)),
      {}
    ),
  ];
}
