import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import useForm from '../useForm';

export const SimpleFormComponent = ({ onSubmit }) => {
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

SimpleFormComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export const NestedFormComponent = ({ onSubmit }) => {
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

NestedFormComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export const MultipleFormComponent = ({ onSubmit }) => {
  const INITIAL_CONTACT_VALUES = {
    name: '',
    number: '',
  };

  const [values, fields] = useForm({
    contactList: [],
  });

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="button"
        onClick={() => fields.contactListAdd(INITIAL_CONTACT_VALUES)}
      >
        Add contact
      </button>

      {_.map(fields.contactList, (contact, index) => (
        <div key={index}>
          <input name={`contact-${index}-name`} type="text" {...contact.name} />
          <input
            name={`contact-${index}-number`}
            type="text"
            {...contact.number}
          />
          <button type="button" onClick={() => fields.contactListRemove(index)}>
            Remove
          </button>
        </div>
      ))}

      <button type="submit"> Submit </button>
    </form>
  );
};

MultipleFormComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
