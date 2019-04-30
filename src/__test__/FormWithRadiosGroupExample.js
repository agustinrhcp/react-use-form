import React from 'react';
import PropTypes from 'prop-types';

import useForm from '../useForm';

const FormWithRadiosGroupExample = ({ onSubmit }) => {
  const [values, fields] = useForm({
    weapons: [],
  });

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      Weapons on belt:
      <input
        type="radio"
        value="batarang"
        id="batarang"
        checked={values.weapons.indexOf('batarang') >= 0}
        onChange={() => {
          const index = values.weapons.indexOf('batarang');
          if (index < 0) {
            fields.weaponsAdd('batarang');
          } else {
            fields.weaponsRemove(index);
          }
        }}
      />
      <label htmlFor="sharkSpray">
        <input
          type="radio"
          value="sharkSpray"
          id="sharkSpray"
          checked={values.weapons.indexOf('sharkSpray') >= 0}
          onChange={() => {
            const index = values.weapons.indexOf('sharkSpray');
            if (index < 0) {
              fields.weaponsAdd('sharkSpray');
            } else {
              fields.weaponsRemove(index);
            }
          }}
        />
      </label>
      <label htmlFor="grapling">
        <input
          type="radio"
          value="grapling"
          id="grapling"
          checked={values.weapons.indexOf('grapling') >= 0}
          onChange={() => {
            const index = values.weapons.indexOf('grapling');
            if (index < 0) {
              fields.weaponsAdd('grapling');
            } else {
              fields.weaponsRemove(index);
            }
          }}
        />
      </label>
      <button type="submit"> Submit </button>
    </form>
  );
};

FormWithRadiosGroupExample.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FormWithRadiosGroupExample;
