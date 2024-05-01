import UserModel from "../model";

export default interface UserDb {
  getUserByEmail(email: string): Promise<UserModel | void>,
  createNewUser(data: UserModel): Promise<string>,
}