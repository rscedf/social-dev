import styled from "styled-components"
import Link from "next/link"

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
    return(
        <ImageWithSpace>
            <H1># Social Dev</H1>
            <H4>Tudo que acontece no mundo dev, está aqui!</H4>
            <FormContainer>
                <H2>Entre em sua conta</H2>
            
                <Form>
                    <Input Label="Email ou Usuário" type="email"/>
                    <Input Label="Senha" type="password"/>
                    <Button>Entrar</Button>
                </Form>
                <Text>Não possui uma conta? <Link href="/signup">Faça seu cadastro</Link></Text>
            </FormContainer>    
        </ImageWithSpace>
    )
}

export default LoginPage 