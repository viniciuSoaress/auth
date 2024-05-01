import UseCase from "../../shared/useCase";
import UserModel from "../model";
import UserDb from "./userDb";

export default class GetUserByEmail implements UseCase<string, UserModel | void>{

  constructor(private readonly prisma: UserDb){}

  async handle(email: string): Promise<UserModel | void> {
    
    const user = await this.prisma.getUserByEmail(email) ?? undefined
  
    return user
  }
}