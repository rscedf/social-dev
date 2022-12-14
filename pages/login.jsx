import styled from "styled-components"
import Link from "next/link"
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import axios from "axios"
import { useRouter } from 'next/router'
import { loginSchema } from "../modules/user/user.schema"
import { useState } from "react"

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

function LoginPage(){
    const router = useRouter()
    const{control, handleSubmit, formState:{errors}, setError } = useForm({
        resolver: joiResolver(loginSchema)
    })

   const [loading, setLoading] = useState(false)
   
    
    const onSubmit = async(data)=>{  
        setLoading(true)  
          
        try {
          const {status}= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, data)
          
          if(status === 200){                      
            router.push('/')            
          }
          
        } catch ({ response }) {   
            console.log(response.data) 
            if(response.data === 'not found'){
                setError('userOrEmail', {
                    message: 'Usuário ou Email incorreto'
                })  
            }        
            else if(response.data === 'Incorrect password'){
                setError('password', {
                    message: 'A senha está incorreta'
                })    
                          
            }

        }finally{
            setLoading(false)
            
        }
    }
    
    return(
        <ImageWithSpace>
            <H1># Social Dev</H1>
            <H4>Tudo que acontece no mundo dev, está aqui!</H4>
            <FormContainer>
                <H2>Entre em sua conta</H2>            
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Input Label="Email ou Usuário" type="userOrEmail" name="userOrEmail" control = {control}/>
                    <Input Label="Senha" type="password" name="password" control = {control}/>
                    <Button Loading={loading} type="submit" disabled={Object.keys(errors).length > 0}>Entrar</Button>
                </Form>
                <Text>Não possui uma conta? <Link href="/signup">Faça seu cadastro</Link></Text>
            </FormContainer>    
        </ImageWithSpace>
    )
}

export default LoginPage 