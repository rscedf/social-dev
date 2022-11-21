import { hashPassword, comparePassword } from '../../utils/bcrypt'

import User from './user.model'


export const signupUser = async(body)=> {
    try {
        const user = {
            ...body,
            password: hashPassword(body.password)
         }
         const dbUser = await User.create(user)
         return dbUser
         
    } catch (error) {
        throw error
    }  
    
}

export const login = async(body)=> {
    try {
        const user = await User.findOne({
            $or: [
                {email: body.userOrEmail},
                {user: body.userOrEmail}
            ]
        })

        if(!user) throw new Error('not found')

        const compareIsPassword = comparePassword(body.password, user.password)
        if(!compareIsPassword) throw new Error('Incorrect password')
        
        return user

    } catch (error) {
        throw error
    }
    
}