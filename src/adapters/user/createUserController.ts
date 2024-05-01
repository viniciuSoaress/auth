import { Router, Response, Request, NextFunction  } from "express";
import CreateUser from "../../core/user/service/createUser";

export default class CreateUserController {

  constructor(
    readonly server: Router,
    readonly UseCase: CreateUser
  ) {
    server.post('/', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {name, email, password} = req.body as any

        const user = await UseCase.handle({name, email,password})

        res.status(201).json({id: user})
        
      } catch (error) {
        next(error)
      }
    })
  }
}