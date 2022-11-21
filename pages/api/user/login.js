import Joi from 'joi'
import { withIronSessionApiRoute } from 'iron-session/next'

import createHandler from '../../../lib/middleware/nextConnect'
import validate from '../../../lib/middleware/validate'
import {login} from '../../../modules/user/user.service'

import { ironConfig } from '../../../lib/middleware/ironSession'


const loginSchema = Joi.object({
    userOrEmail: Joi.string().required(),
    password: Joi.string().required()    
})


const handler = createHandler()

handler.post(validate({ body: loginSchema }), async (req,res) =>{
    try {
        const user= await login(req.body)
        req.session.user = {
            id: user.id,
            user: user.user
        }
        await req.session.save()
        res.send('ok: true')
    } catch (error) {
        console.error(error)
        throw error
    }
})

export default withIronSessionApiRoute(handler, ironConfig) 
