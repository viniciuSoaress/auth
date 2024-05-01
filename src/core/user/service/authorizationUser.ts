import jwt from 'jsonwebtoken'
import UseCase from '../../shared/useCase';

export default class AuthorizationUser implements UseCase<string ,string | jwt.JwtPayload>{

  async handle(data: string): Promise<string | jwt.JwtPayload> {
    
    const token = data

   const validate = jwt.verify(token, process.env.JWT_SECRET || "validate123")
    
   return validate
  }
}