import {Router} from 'express'
import dbUser from '../external/dbUser'

import CreateUser from '../core/user/service/createUser'
import CreateUserController from '../adapters/user/createUserController'

import GetUserByEmail from '../core/user/service/getUserByEmail'
import GetUserByEmailcontroller from '../adapters/user/getUserByEmailController'
import AuthUser from '../core/user/service/authUser'
import AuthUserController from '../adapters/user/authUserController'
import AuthorizationUser from '../core/user/service/authorizationUser'
import AuthorizationUserController from '../adapters/user/authorizationUserController'

const UserRouter = Router()

const prisma = new dbUser()

const create = new CreateUser(prisma)
new CreateUserController(UserRouter, create)

const get = new GetUserByEmail(prisma)
new GetUserByEmailcontroller(UserRouter, get)

const auth = new AuthUser(prisma)
new AuthUserController(UserRouter, auth)

const authorization = new AuthorizationUser()
new AuthorizationUserController(UserRouter, authorization)


export default UserRouter