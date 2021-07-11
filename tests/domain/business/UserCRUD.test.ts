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
      email: 'foo@bar.com.br',
    };

    const id = await userCRUD.create({ ...payload, password: 'pass123' });

    const userFound = await userCRUD.getById(id);

    expect(await userCRUD.getAll()).toHaveLength(1);
    expect(userFound).toMatchObject(payload);
    expect(userFound?.password).toEqual(expect.not.stringContaining('pass123'));
  });
});
