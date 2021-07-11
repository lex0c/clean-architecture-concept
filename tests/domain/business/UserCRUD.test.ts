import { UserRepositoryMemory } from '../../../src/app/repositories';
import { UserCRUD } from '../../../src/domain/business';

describe('Domain - Business - UserCRUD', () => {
  test('no user should be found', async () => {
    const userCRUD = new UserCRUD(new UserRepositoryMemory());
    expect(await userCRUD.getAll()).toHaveLength(0);
  });

  test('no user should be found for specific ID', async () => {
    const userCRUD = new UserCRUD(new UserRepositoryMemory());
    expect(await userCRUD.getById(1)).toBeUndefined();
  });

  test('create new user', async () => {
    const userCRUD = new UserCRUD(new UserRepositoryMemory());

    const payload = {
      name: 'foo bar',
      email: 'foo@bar.com',
    };

    const id = await userCRUD.create({ ...payload, password: 'pass123' });

    const userFound = await userCRUD.getById(id);

    expect(await userCRUD.getAll()).toHaveLength(1);
    expect(userFound).toMatchObject(payload);
    expect(userFound?.password).toEqual(expect.not.stringContaining('pass123'));
  });

  test('delete user by ID', async () => {
    const userCRUD = new UserCRUD(new UserRepositoryMemory());

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
  });

  test('failed when trying to delete non-existent user', async () => {
    const userCRUD = new UserCRUD(new UserRepositoryMemory());

    const id = await userCRUD.removeById(1);

    expect(id).toBe(-1);
  });
});
