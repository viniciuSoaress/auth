import { Router, Response, Request, NextFunction } from "express";
import AuthorizationUser from "../../core/user/service/authorizationUser";

export default class AuthorizationUserController {

  constructor(
    server: Router,
    useCase: AuthorizationUser
  ){
    server.post('/authorization', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const tokenHeader = req.headers['authorization'] as string
        const token = tokenHeader && tokenHeader.split(' ')[1] 

        const auth = await useCase.handle(token)
      
        if(!auth){
          res.status(400).json({
            mesage: 'error de authenticação.'
          })
        }
        res.status(200).json(auth)

        next()
      } catch (error) {
        next(error)
      }
    })
  }
}