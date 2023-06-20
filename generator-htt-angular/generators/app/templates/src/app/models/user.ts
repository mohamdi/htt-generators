import {RoleEnum} from './role-enum';

export class TokenUser {
    id?: number;
    admin?: boolean;
    username?: string;
    password?: string;
    lang?: string;
    rememberMe?: boolean;
    permissions?: string[];
}

export class Token {
    authenticated?: boolean;
    authToken?: string;
    user?: TokenUser;
    refreshToken?: string;
}

export class User {
  id?: number;
  firstName?: string;
  lastName?: string;
  telephone?: string;
  email?: string;
  address?: string;
  ministry?: string;
  post?: string;
  grade?: string;
  reference?: string;
  nni?: string;
  username?: string;
  genre?: number;
  activeUser?: boolean;
  birthDate?: string;
  birthPlace?: string;
  createdAt?: string;
  role?: RoleEnum;
  detailsLocked?: boolean;
  userActive?: boolean;
  password?: string;
  isLoggedOut?: boolean;

}
