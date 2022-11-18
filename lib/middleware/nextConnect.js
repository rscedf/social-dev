import connect from "next-connect";

import mongooseMidleware from './mongoose'

export default function createHandler(){
    return connect().use(mongooseMidleware)
}