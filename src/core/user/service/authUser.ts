import UseCase from "../../shared/useCase"
import UserModel from "../model"
import UserDb from "./userDb"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default class AuthUser implements UseCase<UserModel, string> {

  constructor(private readonly prisma: UserDb) { }

  async handle(data: UserModel): Promise<string> {
    const { email, name, password } = data
    const user = await this.prisma.getUserByEmail(email)

    if (!user) {
      throw new Error('Usuario não encotrado')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new Error('senha incorretar')
    }

    const token = jwt.sign(
      { userId: user.id, userName: user.name },
      process.env.JWT_SECRET || 'validate123',
      { expiresIn: '1h' }
    )

    return token
  }
}