import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import useForm from '../useForm';

const MultipleFormExample = ({ onSubmit }) => {
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

MultipleFormExample.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default MultipleFormExample;
