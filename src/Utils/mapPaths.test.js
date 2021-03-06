import mapPaths from './mapPaths';

describe('mapPaths', () => {
  it('for simple array', () => {
    expect(mapPaths([{ a: 'a' }, { b: 'b' }])).toEqual(['[0].a', '[1].b']);
  });

  describe('with and empty array', () => {
    it('returns array modifiers', () => {
      expect(mapPaths({ contactList: [] })).toEqual([
        'contactListAdd',
        'contactListRemove',
      ]);
    });
  });

  it('for simple object', () => {
    expect(mapPaths({ a: 'a', b: 'b' })).toEqual(['a', 'b']);
  });

  it('for nested object', () => {
    expect(mapPaths({ a: { b: 'b' } })).toEqual(['a.b']);
  });

  it('with a form', () => {
    expect(
      mapPaths({
        user: '',
        email: '',
        password: '',
      })
    ).toEqual(['user', 'email', 'password']);
  });
});
