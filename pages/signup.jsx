import { useState } from "react"
import styled from "styled-components"
import Link from "next/link"
import {useForm} from 'react-hook-form'
import {joiResolver} from '@hookform/resolvers/joi'
import axios from "axios"
import { useRouter } from "next/router"


import { signupSchema } from '../modules/user/user.schema'

import ImageWithSpace from "../src/components/layout/imageWithSpace"
import H1 from "../src/components/tipografia/H1"
import H4 from "../src/components/tipografia/H4"
import H2 from "../src/components/tipografia/H2"
import Button from "../src/components/inputs/button"
import Input from "../src/components/inputs/input"

const FormContainer = styled.div`
    margin-top: 60px;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    gap: 20px;
`
const Text = styled.p`
    text-align: center;
`

function SignupPage(){
    const router = useRouter()
    const{control, handleSubmit, formState:{errors}, setError } = useForm({
        resolver: joiResolver(signupSchema)
    })
    const [loading, setLoading] = useState(false)

    const handleForm = async(data) => {
        setLoading(true) 
        try {
            const { status } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/signup`, data)
            if(status === 201){
                router.push('/')
            }
        } catch (error) {
            if(error.response.data.code === 11000){
                setError(error.response.data.duplicatekey,{
                    type: 'duplicate'
                } )
            }
        } finally{
            setLoading(false)
            
        }
        
    }
    

    return(
        <ImageWithSpace>
            <H1># Social Dev</H1>
            <H4>Tudo que acontece no mundo dev, está aqui!</H4>
            <FormContainer>
                <H2>Crie sua conta</H2>
            
                <Form onSubmit={handleSubmit(handleForm)}>
                    <Input Label="Nome" name="firstName" control={control}/>
                    <Input Label="Sobrenome" name = "lastName" control={control} />
                    <Input Label="Usuário" name= "user" control={control}/>
                    <Input Label="Email" type="email"  name = "email" control={control}/>
                    <Input Label="Senha" type="password" name = "password" control={control} />
                    <Button Loading={loading} type="submit" disabled={Object.keys(errors).length > 0}>Cadastrar</Button>
                </Form>
                <Text>Já possui uma conta? <Link href="/login">Faça seu login</Link></Text>
            </FormContainer>
        </ImageWithSpace>
    )
}

export default SignupPage 