import React from 'react';

import SimpleFormExample from './__test__/SimpleFormExample';
import NestedFormExample from './__test__/NestedFormExample';
import MultipleFormExample from './__test__/MultipleFormExample';
import FormWithCheckboxExample from './__test__/FormWithCheckboxExample';
import FormWithRadioExample from './__test__/FormWithRadioExample';
import FormWithRadiosGroupExample from './__test__/FormWithRadiosGroupExample';

describe('useForm hook', () => {
  let form;
  const onSubmitMock = jest.fn();

  const updateInput = (selector, value) => {
    form.find(selector).simulate('change', { target: { value } });
  };

  const submit = () => form.find('button[type="submit"]').simulate('submit');

  afterEach(jest.clearAllMocks);

  describe('for a simple form', () => {
    beforeEach(() => {
      form = mount(<SimpleFormExample onSubmit={onSubmitMock} />);

      updateInput('[name="name"]', 'Bruce');
      updateInput('[name="email"]', 'bruce@wayneenterprises.com');
      updateInput('[name="password"]', 'B4TmanRulez');
    });

    it('updates values', () => {
      expect(form.find('[name="name"]').props().value).toEqual('Bruce');
      expect(form.find('[name="email"]').props().value).toEqual(
        'bruce@wayneenterprises.com'
      );
      expect(form.find('[name="password"]').props().value).toEqual(
        'B4TmanRulez'
      );
    });

    it('submits the values with the provided shape', () => {
      submit();
      expect(onSubmitMock).toHaveBeenCalledWith({
        name: 'Bruce',
        email: 'bruce@wayneenterprises.com',
        password: 'B4TmanRulez',
      });
    });
  });

  describe('for a nested form', () => {
    beforeEach(() => {
      form = mount(<NestedFormExample onSubmit={onSubmitMock} />);

      updateInput('[name="address-line1"]', '1007 Mountain Drive');
      updateInput('[name="address-city"]', 'Gotham');
      updateInput('[name="address-state"]', 'NY');
    });

    it('updates values', () => {
      expect(form.find('[name="address-line1"]').props().value).toEqual(
        '1007 Mountain Drive'
      );
      expect(form.find('[name="address-city"]').props().value).toEqual(
        'Gotham'
      );
      expect(form.find('[name="address-state"]').props().value).toEqual('NY');
    });

    it('submits the values with the provided shape', () => {
      form.find('button').simulate('submit');
      expect(onSubmitMock).toHaveBeenCalledWith({
        address: {
          line1: '1007 Mountain Drive',
          line2: '',
          city: 'Gotham',
          state: 'NY',
        },
      });
    });
  });

  describe('for a multiple form', () => {
    beforeEach(() => {
      form = mount(<MultipleFormExample onSubmit={onSubmitMock} />);
    });

    describe('when adding forms', () => {
      const addContact = (index, name, number) => {
        form
          .find('button')
          .at(0)
          .simulate('click');

        updateInput(`input[name="contact-${index}-name"]`, name);
        updateInput(`input[name="contact-${index}-number"]`, number);
      };

      beforeEach(() => {
        addContact(0, 'Alfred', '123-123');
        addContact(1, 'Gordon', '987-987');
      });

      it('updates the values', () => {
        expect(form.find('[name="contact-0-name"]').props().value).toEqual(
          'Alfred'
        );
        expect(form.find('[name="contact-0-number"]').props().value).toEqual(
          '123-123'
        );
        expect(form.find('[name="contact-1-name"]').props().value).toEqual(
          'Gordon'
        );
        expect(form.find('[name="contact-1-number"]').props().value).toEqual(
          '987-987'
        );
      });

      it('submits the values with the provided shape', () => {
        submit();
        expect(onSubmitMock).toHaveBeenCalledWith({
          contactList: [
            {
              name: 'Alfred',
              number: '123-123',
            },
            {
              name: 'Gordon',
              number: '987-987',
            },
          ],
        });
      });

      describe('when removing a form', () => {
        beforeEach(() => {
          form
            .find('button')
            .at(2)
            .simulate('click');
        });

        it('removes the values for the passed index', () => {
          expect(form.find('[name="contact-1-name"]')).toEqual({});
          expect(form.find('[name="contact-1-number"]')).toEqual({});
        });
      });
    });

    describe('when submitting the form empty', () => {
      beforeEach(submit);

      it('submits an empty list', () => {
        expect(onSubmitMock).toHaveBeenCalledWith({ contactList: [] });
      });
    });
  });

  describe('for a form with checkboxes', () => {
    beforeEach(() => {
      form = mount(<FormWithCheckboxExample onSubmit={onSubmitMock} />);
    });

    it('start with the checkbox unchecked', () => {
      expect(form.find('[type="checkbox"]').props().checked).toEqual(false);
    });

    describe('and submitting', () => {
      beforeEach(submit);

      it('submits the field with a falsey value', () => {
        expect(onSubmitMock).toHaveBeenCalledWith({ desguised: false });
      });
    });

    describe('when checking', () => {
      beforeEach(() => {
        form
          .find('[type="checkbox"]')
          .simulate('change', { target: { checked: true, type: 'checkbox' } });
      });

      it('updates the checkbox', () => {
        expect(form.find('[type="checkbox"]').props().checked).toEqual(true);
      });

      describe('and submitting', () => {
        beforeEach(submit);

        it('submits the field with a truthy value', () => {
          expect(onSubmitMock).toHaveBeenCalledWith({ desguised: true });
        });
      });
    });
  });

  describe('for a form with radio buttons', () => {
    beforeEach(() => {
      form = mount(<FormWithRadioExample onSubmit={onSubmitMock} />);
    });

    it('starts with inital value checked', () => {
      expect(form.find('#batarang').props().checked).toEqual(true);
      expect(form.find('#sharkSpray').props().checked).toEqual(false);
      expect(form.find('#grapling').props().checked).toEqual(false);
    });

    describe('and submitting', () => {
      beforeEach(submit);

      it('submits the field with a initial value', () => {
        expect(onSubmitMock).toHaveBeenCalledWith({ weapon: 'batarang' });
      });
    });

    describe('when updating', () => {
      beforeEach(() => {
        form
          .find('#grapling')
          .simulate('change', { target: { value: 'grapling', type: 'radio' } });
      });

      it('updates the radios accordingly', () => {
        expect(form.find('#batarang').props().checked).toEqual(false);
        expect(form.find('#sharkSpray').props().checked).toEqual(false);
        expect(form.find('#grapling').props().checked).toEqual(true);
      });

      describe('and submitting', () => {
        beforeEach(submit);

        it('submits the field with the updated value', () => {
          expect(onSubmitMock).toHaveBeenCalledWith({ weapon: 'grapling' });
        });
      });
    });
  });

  describe('for a form with radios group, ()', () => {
    beforeEach(() => {
      form = mount(<FormWithRadiosGroupExample onSubmit={onSubmitMock} />);
    });

    it('starts with no inital values checked', () => {
      expect(form.find('#batarang').props().checked).toEqual(false);
      expect(form.find('#sharkSpray').props().checked).toEqual(false);
      expect(form.find('#grapling').props().checked).toEqual(false);
    });

    describe('when checking a radio button', () => {
      beforeEach(() => {
        form
          .find('#grapling')
          .simulate('change', { target: { value: 'grapling', type: 'radio' } });
      });

      it('checks only the selected radio', () => {
        expect(form.find('#batarang').props().checked).toEqual(false);
        expect(form.find('#sharkSpray').props().checked).toEqual(false);
        expect(form.find('#grapling').props().checked).toEqual(true);
      });

      describe('when unchecking', () => {
        beforeEach(() => {
          form.find('#grapling').simulate('change', {
            target: { value: 'grapling', type: 'radio' },
          });
        });

        it('checks only the selected radio', () => {
          expect(form.find('#batarang').props().checked).toEqual(false);
          expect(form.find('#sharkSpray').props().checked).toEqual(false);
          expect(form.find('#grapling').props().checked).toEqual(false);
        });

        describe('and submitting', () => {
          beforeEach(submit);

          it('submits the field with the updated value', () => {
            expect(onSubmitMock).toHaveBeenCalledWith({ weapons: [] });
          });
        });
      });

      describe('when checking another radio button', () => {
        beforeEach(() => {
          form.find('#batarang').simulate('change', {
            target: { value: 'batarang', type: 'radio' },
          });
        });

        it('checks only the selected radio', () => {
          expect(form.find('#batarang').props().checked).toEqual(true);
          expect(form.find('#sharkSpray').props().checked).toEqual(false);
          expect(form.find('#grapling').props().checked).toEqual(true);
        });

        describe('and submitting', () => {
          beforeEach(submit);

          it('submits the field with the updated value', () => {
            expect(onSubmitMock).toHaveBeenCalledWith({
              weapons: ['grapling', 'batarang'],
            });
          });
        });
      });
    });
  });
});
