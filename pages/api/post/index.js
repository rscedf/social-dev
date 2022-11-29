import { withIronSessionApiRoute } from 'iron-session/next'

import createHandler from '../../../lib/middleware/nextConnect'
import validate from '../../../lib/middleware/validate'

import { ironConfig } from '../../../lib/middleware/ironSession'
import { createPostSchema}from '../../../modules/post/post,schema'
import { createPost, getPost } from '../../../modules/post/post.service'

const handler = createHandler()

handler
    .post(validate({body: createPostSchema}), async (req, res)=> {
        try {
            if(!req.session.user) return res.status(401).send()

            const newPost = await createPost(req.body, req.session.user)
            res.status(201).send(newPost)

        } catch (error) {
            return res.status(500).send(error.message)
        }
    })

    .get(async (req, res) => {
        try {
            if(!req.session.user) return res.status(401).send()

            const posts = await getPost()
            res.status(200).send(posts)
            
        } catch (error) {
            return res.status(500).send(error.message)
        }
    })

    export default withIronSessionApiRoute(handler, ironConfig)