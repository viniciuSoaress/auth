import { PrismaClient } from "@prisma/client";
import UserDb from "../core/user/service/userDb";
import UserModel from "../core/user/model";



export default class dbUser implements UserDb {

  private readonly prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async createNewUser(data: UserModel): Promise<string> {

    const { name, password, email } = data
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password
      }
    })

    return user.id
  }

  async getUserByEmail(email: string): Promise<UserModel | void> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    }) ?? undefined

    return user
  }

}