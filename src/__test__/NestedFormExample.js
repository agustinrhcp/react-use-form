import React from 'react';
import PropTypes from 'prop-types';

import useForm from '../useForm';

const NestedFormExample = ({ onSubmit }) => {
  const [values, fields] = useForm({
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
    },
  });

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="address-line1" type="text" {...fields.address.line1} />
      <input name="address-line2" type="text" {...fields.address.line2} />
      <input name="address-city" type="text" {...fields.address.city} />
      <input name="address-state" type="text" {...fields.address.state} />

      <button type="submit"> Submit </button>
    </form>
  );
};

NestedFormExample.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NestedFormExample;
