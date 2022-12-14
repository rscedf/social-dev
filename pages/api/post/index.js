import { withIronSessionApiRoute } from 'iron-session/next'

import createHandler from '../../../lib/middleware/nextConnect'
import validate from '../../../lib/middleware/validate'

import { ironConfig } from '../../../lib/middleware/ironSession'
import { createPostSchema, deletePostSchema, editPostSchema}from '../../../modules/post/post.schema'
import { createPost, deletePost, getPost, editPost } from '../../../modules/post/post.service'

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
    .delete(validate(deletePostSchema), async(req, res)=>{
        try {
            if(!req.session.user) return res.status(401).send()
            const deletedPost = await deletePost(req.body.id, req.session.user)            
            if(deletedPost){
                return res.status(200).send({ ok: true })
            }
            else return res.status(400).send( 'post not found')

        } catch (error) {
            return res.status(500).send(error.message)
        }
    })
    .patch(validate(editPostSchema), async(req,res)=>{
        try {
            if(!req.session.user) return res.status(401).send()

            const refreshPost = await editPost(req.body, req.session.user)
            if(refreshPost){
                 return res.status(200).send({ ok: true })

            } else return res.status(400).send( 'post not found')

        } catch (error) {
            return res.status(500).send(error.message)
        }
    })

    export default withIronSessionApiRoute(handler, ironConfig)