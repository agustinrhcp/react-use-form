import React from 'react';
import { SimpleFormComponent } from './__test__/dummyComponents';

const onSubmitMock = jest.fn();

describe('useForm hook', () => {
  let form;

  const updateInput = (selector, value) => {
    form.find(selector).simulate('change', { target: { value } });
  };

  describe('for a simple form', () => {
    beforeEach(() => {
      form = mount(<SimpleFormComponent onSubmit={onSubmitMock} />);

      updateInput('[name="name"]', 'Bruce');
      updateInput('[name="email"]', 'bruce@wayneenterprises.com');
      updateInput('[name="password"]', 'B4TmanRulez');
    });

    it('updates values properly', () => {
      expect(form.find('[name="name"]').props().value).toEqual('Bruce');
      expect(form.find('[name="email"]').props().value).toEqual(
        'bruce@wayneenterprises.com'
      );
      expect(form.find('[name="password"]').props().value).toEqual(
        'B4TmanRulez'
      );
    });

    it('submits the correct form', () => {
      form.find('button').simulate('submit');
      expect(onSubmitMock).toHaveBeenCalledWith({
        name: 'Bruce',
        email: 'bruce@wayneenterprises.com',
        password: 'B4TmanRulez',
      });
    });
  });

  describe('for a nested form', () => {
    // form = mount(<NestedFormComponent onSubmit={onSubmitMock} />);
    //
    // updateInput('[name="name"]', 'Bruce');
    // updateInput('[name="email"]', 'bruce@wayneenterprises.com');
    // updateInput('[name="password"]', 'B4TmanRulez');
  });
});
