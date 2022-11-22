import Joi, { object } from 'joi'
import { withIronSessionApiRoute } from 'iron-session/next'

import createHandler from '../../../lib/middleware/nextConnect'

import validate from '../../../lib/middleware/validate'

import {signupUser} from '../../../modules/user/user.service'

import {signupSchema} from '../../../modules/user/user.schema'

import { ironConfig } from '../../../lib/middleware/ironSession'


const signup = createHandler()

signup.post(validate({ body: signupSchema}), async(req, res)=> {  
    try {
        const user = await signupUser(req.body)
        req.session.user = {
            id: user.id,
            user: user.user
        }
        await req.session.save()

        res.status(201).json({ ok: true })
    } catch (error) {
        if (error.code === 11000){
            return res.status(400).send({
                code: 11000,
                duplicatekey: Object.keys(error.keyPattern)[0]
            })
        }
        throw error
    }      
    
})


export default withIronSessionApiRoute (signup, ironConfig)