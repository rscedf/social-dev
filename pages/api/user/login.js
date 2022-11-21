import Joi from 'joi'

import createHandler from '../../../lib/middleware/nextConnect'
import validate from '../../../lib/middleware/validate'
import {login} from '../../../modules/user/user.service'


const loginSchema = Joi.object({
    userOrEmail: Joi.string().required(),
    password: Joi.string().required()    
})


const handler = createHandler()

handler.post(validate({ body: loginSchema }), async (req,res) =>{
    try {
        const user= await login(req.body)
        res.send(user)
    } catch (error) {
        console.error(error)
        throw error
    }
})

export default handler

