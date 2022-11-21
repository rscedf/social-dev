import Joi from 'joi'
import { withIronSessionApiRoute } from 'iron-session/next'

import createHandler from '../../../lib/middleware/nextConnect'

import validate from '../../../lib/middleware/validate'

import {signupUser} from '../../../modules/user/user.service'

import { ironConfig } from '../../../lib/middleware/ironSession'

const postSchema = Joi.object({
    firstName: Joi.string().required().max(50),
    lastName: Joi.string().required().max(50),
    user: Joi.string().required().max(30),
    email: Joi.string().email().required().max(100),
    password: Joi.string().required().max(50).min(6)
})

const signup = createHandler()

signup.post(validate({ body: postSchema}), async(req, res)=> {  
    try {
        const user = await signupUser(req.body)
        req.session.user = {
            id: user.id,
            user: user.user
        }
        await req.session.save()

        res.status(201).json({ ok: true })
    } catch (error) {
        console.error(error)
        throw error
    }      
    
})


export default withIronSessionApiRoute (signup, ironConfig)