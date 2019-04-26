import React from 'react';
import PropTypes from 'prop-types';

import useForm from '../useForm';

const FormWithCheckboxExample = ({ onSubmit }) => {
  const [values, fields] = useForm({
    desguised: false,
  });

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="desguised">
        under desguise?
        <input
          id="desguised"
          type="checkbox"
          checked={!!fields.desguised.value}
          onChange={fields.desguised.onChange}
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
