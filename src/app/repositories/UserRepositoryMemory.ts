import {
  UserRepositoryInterface,
} from '../../interfaces';

import { UserEntity } from '../../domain/entities';

export default class UserRepositoryMemory implements UserRepositoryInterface {
  private users: Array<UserEntity> = [];

  public async get(id: number): Promise<UserEntity | undefined> {
    return Promise.resolve(this.users.find((user) => user.id === id));
  }

  public async getAll(): Promise<UserEntity[]> {
    return Promise.resolve(this.users);
  }

  public async create(user: UserEntity): Promise<number> {
    const id = Math.ceil(Math.random() * 9999);

    this.users.push({ ...user, id });

    return id;
  }

  public async remove(id: number): Promise<number> {
    const index = this.users.findIndex(user => user.id === id);

    if (index === -1) return -1;

    const removedId = this.users[index]?.id;

    this.users.splice(index, 1);

    return removedId || -1;
  }
}
