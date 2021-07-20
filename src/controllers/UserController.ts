import { UserCRUD } from '../domain/business';
import { UserRepositorySQL } from '../app/repositories';

export default class UserController {
  static async getUser(params: any, body: any = null) {
    const userCRUD: any = new UserCRUD(new UserRepositorySQL());

    const resp = await userCRUD.getById(params.id);

    return resp;
  }

  static async getUsers(params: any, body: any = null) {
    const userCRUD: any = new UserCRUD(new UserRepositorySQL());

    const resp = await userCRUD.getAll();

    return resp;
  }

  static async createUser(params: any, body: any = null) {
    const userCRUD: any = new UserCRUD(new UserRepositorySQL());

    const resp = await userCRUD.create(params);

    return resp;
  }
}
