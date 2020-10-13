import User from "../../entity/user";
import { LoginDataPayload } from "../../security/json.web.token";

export default interface UsersManager {
  createUser(user: User): Promise<User>;

  getUserById(id: number): Promise<User>;

  getUserByEmail(email: string): Promise<User>;

  getAllUsers(): Promise<User[]>;

  updateUser(id: number, user: Partial<User>): Promise<User>;

  deleteUser(id: number): Promise<boolean>;

  loginUser(loginData: LoginDataPayload): Promise<string>;
}
