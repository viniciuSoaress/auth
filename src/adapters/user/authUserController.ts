import { NextFunction, Request, Response, Router } from "express";
import AuthUser from "../../core/user/service/authUser";

export default class AuthUserController{

  constructor(
    readonly server: Router,
    readonly useCase: AuthUser
  ){
    server.post('/login', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {name, password, email} = req.body
        const user = await useCase.handle({name, password, email})

        res.status(201).json({token: user})
      } catch (error) {
        next(error)
      }
    })
  }
}