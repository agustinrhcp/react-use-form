import React from 'react';
import PropTypes from 'prop-types';

import useForm from '../useForm';

const SimpleFormExample = ({ onSubmit }) => {
  const [values, fields] = useForm({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" {...fields.name} />
      <input name="email" type="email" {...fields.email} />
      <input name="password" type="password" {...fields.password} />

      <button type="submit"> Submit </button>
    </form>
  );
};

SimpleFormExample.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SimpleFormExample;
