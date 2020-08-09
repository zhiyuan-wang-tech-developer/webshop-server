import User from "../../entity/User";
import { LoginDataPayloadType } from "../../security/JsonWebToken";

export default interface UserManager {
  createUser(user: User): Promise<User>;

  getUserById(id: number): Promise<User>;

  getUserByEmail(email: string): Promise<User>;

  getAllUsers(): Promise<User[]>;

  updateUser(id: number, user: Partial<User>): Promise<User>;

  deleteUser(id: number): Promise<boolean>;

  loginUser(loginData: LoginDataPayloadType): Promise<string>;
}
