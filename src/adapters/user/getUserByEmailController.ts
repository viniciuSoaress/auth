import { Router, Request, Response, NextFunction } from "express";
import GetUserByEmail from "../../core/user/service/getUserByEmail";

export default class GetUserByEmailcontroller{

  constructor(
    readonly server: Router,
    readonly useCase: GetUserByEmail
  ){
    server.get('/:email', async (req: Request, res: Response, next: NextFunction) => {
      try{
        const email = req.params.email
        const user = await useCase.handle(email)

        res.status(200).json(user)
      }catch(error){
        next(error)
      }
    })
  }
}