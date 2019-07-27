import { UserModel } from './user.model';

export class AuthorizedUserModel {
  token: string;
  user: UserModel;
}
