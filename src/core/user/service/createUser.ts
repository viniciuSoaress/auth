import UseCase from "../../shared/useCase";
import UserDb from "./userDb";
import bcrypt from 'bcryptjs'

type UserData = {
  name: string,
  password: string,
  email: string
}

export default class CreateUser implements UseCase<UserData, string> {
  constructor(private readonly prisma: UserDb) { }

  async handle(data: UserData): Promise<string> {
    const { name, password, email } = data

    const user = await this.prisma.getUserByEmail(email)
    if (user) {
      throw new Error('E-mail fornecido ja esta e uso!')
    }
    const passwordCrypt = await  bcrypt.hash(password, 10)

    return await this.prisma.createNewUser({name, password: passwordCrypt, email})
  }
}