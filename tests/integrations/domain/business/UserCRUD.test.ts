import { UserRepositorySQL } from '../../../../src/app/repositories';
import { UserCRUD } from '../../../../src/domain/business';

const db = require('../../../../src/app/database/knex');

describe('Domain - Business - UserCRUD (Integration Test)', () => {
  afterEach(async () => db('users').truncate());

  test('no user should be found', async (done) => {
    const userCRUD = new UserCRUD(new UserRepositorySQL());

    expect(await userCRUD.getAll()).toHaveLength(0);

    done();
  });

  test('no user should be found for specific ID', async (done) => {
    const userCRUD = new UserCRUD(new UserRepositorySQL());

    expect(await userCRUD.getById(1)).toBe(-1);

    done();
  });

  test('create new user', async (done) => {
    const userCRUD = new UserCRUD(new UserRepositorySQL());

    const payload = {
      name: 'foo bar',
      email: 'foo@bar.com',
    };

    const id = await userCRUD.create({ ...payload, password: 'pass123' });

    const userFound = await userCRUD.getById(id);

    expect(await userCRUD.getAll()).toHaveLength(1);
    expect(userFound).toMatchObject({ id, ...payload });
    expect(userFound?.password).toEqual(expect.not.stringContaining('pass123'));

    done();
  });

  test('delete user by ID', async (done) => {
    const userCRUD = new UserCRUD(new UserRepositorySQL());

    const payload = {
      name: 'foo bar',
      email: 'foo@bar.com',
    };

    const id1 = await userCRUD.create({ ...payload, password: 'pass1233' });
    const id2 = await userCRUD.create({ ...payload, password: 'pass1234' });
    const id3 = await userCRUD.create({ ...payload, password: 'pass1235' });

    const id = await userCRUD.removeById(id1);

    const userFound = await userCRUD.getById(id1);
    expect(userFound?.id).toBeUndefined();

    expect(await userCRUD.getAll()).toHaveLength(2);

    ([id2, id3]).forEach(async (idx) => {
      const userFound = await userCRUD.getById(idx);
      expect(userFound?.id).not.toBeUndefined();
    });

    done();
  });

  test('failed when trying to delete non-existent user', async (done) => {
    const userCRUD = new UserCRUD(new UserRepositorySQL());

    const id = await userCRUD.removeById(1);

    expect(id).toBe(-1);

    done();
  });

  test('user should be found for specific ID', async (done) => {
    const userCRUD = new UserCRUD(new UserRepositorySQL());

    const payload = {
      name: 'foo bar',
      email: 'foo@bar.com',
    };

    const id = await userCRUD.create({ ...payload, password: 'pass123' });

    expect(await userCRUD.getById(id)).not.toBeUndefined();

    done();
  });
});
