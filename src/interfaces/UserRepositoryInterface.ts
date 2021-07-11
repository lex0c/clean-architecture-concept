import { UserEntity } from '../domain/entities';

export default interface UserRepositoryInterface {
  get(id: number): Promise<UserEntity | undefined>;
  getAll(): Promise<UserEntity[]>;
  create(user: UserEntity): Promise<number>;
}
