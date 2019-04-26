import React from 'react';
import PropTypes from 'prop-types';

import useForm from '../useForm';

const FormWithCheckboxExample = ({ onSubmit }) => {
  const [values, fields] = useForm({
    going: false,
  });

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="dummy">
        Is going:
        <input
          type="checkbox"
          checked={!!fields.going.value}
          onChange={fields.going.onChange}
        />
      </label>

      <button type="submit"> Submit </button>
    </form>
  );
};

FormWithCheckboxExample.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FormWithCheckboxExample;
