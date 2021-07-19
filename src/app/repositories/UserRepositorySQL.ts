import {
  UserRepositoryInterface,
} from '../../interfaces';

import { UserEntity } from '../../domain/entities';

const db = require('../database/knex');

export default class UserRepositorySQL implements UserRepositoryInterface {
  public async get(id: number): Promise<UserEntity | undefined> {
    const result = await db('users').select('id', 'name', 'email').where({ id });

    return result[0] || -1;
  }

  public async getAll(): Promise<UserEntity[]> {
    return db('users').select('id', 'name', 'email');
  }

  public async create(user: UserEntity): Promise<number> {
    const result = await db('users').insert(user).returning('id');

    return result[0];
  }

  public async remove(id: number): Promise<number> {
    const result = await db('users').where({ id }).del().returning('id');

    return result[0] || -1;
  }
}
