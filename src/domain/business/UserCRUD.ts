import { UserRepositoryInterface } from '../../interfaces';
import { UserEntity } from '../entities';
import { HashAdapter } from '../../adapters';

export default class UserCRUD {
  constructor(
    private readonly repository: UserRepositoryInterface
  ) {}

  public async getById(id: number): Promise<UserEntity | undefined> {
    return this.repository.get(id);
  }

  public async getAll(): Promise<UserEntity[]> {
    return this.repository.getAll();
  }

  public async create(user: UserEntity): Promise<number> {
    const payload: any = {
      name: user.name,
      email: user.email,
      password: HashAdapter.build(user?.password),
    };

    return this.repository.create(payload);
  }
}
