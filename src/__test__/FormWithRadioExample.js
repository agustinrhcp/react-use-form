import React from 'react';
import PropTypes from 'prop-types';

import useForm from '../useForm';

const FormWithRadioExample = ({ onSubmit }) => {
  const [values, fields] = useForm({
    weapon: 'batarang',
  });

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      Weapons on belt:
      <label htmlFor="batarang">
        <input
          type="radio"
          value="batarang"
          id="batarang"
          checked={fields.weapon.value === 'batarang'}
          onChange={fields.weapon.onChange}
        />
      </label>
      <label htmlFor="sharkSpray">
        <input
          type="radio"
          id="sharkSpray"
          value="shark spray"
          checked={fields.weapon.value === 'shark spray'}
          onChange={fields.weapon.onChange}
        />
      </label>
      <label htmlFor="grapling">
        <input
          type="radio"
          value="grapling"
          id="grapling"
          checked={fields.weapon.value === 'grapling'}
          onChange={fields.weapon.onChange}
        />
      </label>
      <button type="submit"> Submit </button>
    </form>
  );
};

FormWithRadioExample.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FormWithRadioExample;
