import buildField from './buildField';

describe('buildField', () => {
  afterEach(jest.clearAllMocks);

  describe('when isArray', () => {
    const setFormMock = jest.fn();
    const arrayField = buildField(
      'example._isArray',
      { example: [{ a: '', b: 'b' }] },
      setFormMock
    );

    it('does not generate extra keys', () => {
      expect(Object.keys(arrayField)).toEqual(['list', 'add', 'remove']);
    });

    it('has an add function', () => {
      expect(arrayField.add).toBeInstanceOf(Function);
    });

    describe('the add function', () => {
      it('adds the initial values to the form', () => {
        arrayField.add({ a: 'a', b: '' });
        expect(setFormMock).toHaveBeenCalledWith({
          example: [{ a: '', b: 'b' }, { a: 'a', b: '' }],
        });
      });
    });

    it('has a remove function', () => {
      expect(arrayField.remove).toBeInstanceOf(Function);
    });

    describe('the remove function', () => {
      it('removes the element with the given index', () => {
        arrayField.remove(0);
        expect(setFormMock).toHaveBeenCalledWith({
          example: [],
        });
      });
    });

    it('has a list array', () => {
      expect(arrayField.list).toBeInstanceOf(Array);
    });
  });

  describe('when it is not an array', () => {
    const setFormMock = jest.fn();
    const propertyField = buildField(
      'example.anyProperty',
      { example: { anyProperty: 'test' } },
      setFormMock
    );

    it('does not generate extra keys', () => {
      expect(Object.keys(propertyField)).toEqual(['radio', 'text']);
    });

    it('has a radio function', () => {
      expect(propertyField.radio).toBeInstanceOf(Function);
    });

    describe('the radio function', () => {
      const radioInput = propertyField.radio('test');

      it('returns an object input keys depending on value', () => {
        expect(Object.keys(radioInput)).toEqual([
          'id',
          'name',
          'value',
          'onChange',
          'checked',
        ]);
      });

      describe('the id', () => {
        it('is the concatenation of the path and the value', () => {
          expect(radioInput.id).toEqual('example.anyProperty-test');
        });
      });

      describe('the name', () => {
        it('is the path', () => {
          expect(radioInput.name).toEqual('example.anyProperty');
        });
      });

      describe('the value', () => {
        it('is the value given the function', () => {
          expect(radioInput.value).toEqual('test');
        });
      });

      describe('the onChange function', () => {
        it('given an event, updates the form', () => {
          radioInput.onChange({ target: { value: 'not_test' } });
          expect(setFormMock).toHaveBeenCalledWith({
            example: { anyProperty: 'not_test' },
          });
        });
      });

      describe('checked', () => {
        it("is true if the given value it's the same than the form value", () => {
          expect(radioInput.checked).toBe(true);
        });
      });
    });

    it('has a text object', () => {
      expect(propertyField.text).toBeInstanceOf(Object);
    });

    describe('the text object', () => {
      const textInput = propertyField.text;

      it('has no extra keys', () => {
        expect(Object.keys(textInput)).toEqual([
          'id',
          'name',
          'value',
          'onChange',
        ]);
      });

      describe('the id', () => {
        it('is the path', () => {
          expect(textInput.id).toEqual('example.anyProperty');
        });
      });

      describe('the name', () => {
        it('is the path', () => {
          expect(textInput.name).toEqual('example.anyProperty');
        });
      });

      describe('the value', () => {
        it('is the current form value', () => {
          expect(textInput.value).toEqual('test');
        });
      });

      describe('the onChange function', () => {
        it('given an event, updates the form', () => {
          textInput.onChange({ target: { value: 'not_test' } });
          expect(setFormMock).toHaveBeenCalledWith({
            example: { anyProperty: 'not_test' },
          });
        });
      });
    });
  });
});
