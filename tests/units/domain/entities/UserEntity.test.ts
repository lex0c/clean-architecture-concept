import { UserEntity } from '../../../../src/domain/entities';

describe('Domain - Entity - User (Unit Test)', () => {
  test('build valid user instance without ID', () => {
    const payload = {
      name: 'foo bar',
      email: 'foo@bar.com',
      password: 'pass123',
    };

    const user = new UserEntity(undefined, payload.name, payload.email, payload.password);

    expect(user.name).toBe(payload.name);
    expect(user.email).toBe(payload.email);
    expect(user.password).toBe(payload.password);
    expect(user.id).toBeUndefined();
  });

  test('build valid user instance with ID', () => {
    const payload = {
      id: Math.ceil(Math.random() * 9999),
      name: 'foo bar',
      email: 'foo@bar.com',
    };

    const user = new UserEntity(payload.id, payload.name, payload.email);

    expect(user.name).toBe(payload.name);
    expect(user.email).toBe(payload.email);
    expect(user.id).toBe(payload.id);
  });

  test('fail to build user instance, because invalid email', () => {
    const payload = {
      id: Math.ceil(Math.random() * 9999),
      name: 'foo bar',
      email: 'foobar.com',
    };

    try {
      const user = new UserEntity(payload.id, payload.name, payload.email);
    } catch (err) {
      expect(err.message).toBe('Validation failed\n ValidationError: "value" must be a valid email');
    }
  });

  test('build empty user instance', () => {
    const user = new UserEntity();

    expect(user.id).toBeUndefined();
    expect(user.name).toBeUndefined();
    expect(user.email).toBeUndefined();
  });

  test('fail build user instance, because invalid password', () => {
    const payload = {
      id: Math.ceil(Math.random() * 9999),
      name: 'foo bar',
      email: 'foo@bar.com',
      password: '123',
    };

    try {
      const user = new UserEntity(payload.id, payload.name, payload.email, payload.password);
    } catch (err) {
      expect(err.message).toBe(
        'Validation failed\n ValidationError: "value" length must be at least 6 characters long'
      );
    }
  });
});
