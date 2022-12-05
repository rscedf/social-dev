import styled from "styled-components";
import moment from 'moment'
import axios from "axios";
import { useSWRConfig } from "swr";

import Menu from "../navigation/Menu";

const PostContainer = styled.div`
    background-color: ${props=> props.theme.white};
    padding: 20px;
    border-radius: 10px;
`

const StyledUserName = styled.div`
    font-weight: bold;
    font-size: 18px;
`
const StyledDate = styled.p`
    font-size:12px;
`
const ContainerText = styled.div`
    margin-top: 20px;
`

const ContainerMenu = styled.div`
    float:right;
`

function Post({ text, user, date, isOwner, id }){
    const {mutate} = useSWRConfig()

    const handleEdit = async()=>{
        console.log("Editar")
    }

    const handleDelete = async()=>{
        console.log('entrou 1')
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/post`,{
                data: {
                    id
                }                
            })
            console.log('entrou 2')
            if(response.status === 200){
                console.log('entrou 3')
                mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/post`)
                console.log('entrou 4')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <PostContainer>
            {
                isOwner &&
                <ContainerMenu>
                    <Menu
                        options={[
                            {
                                text: 'Editar Publicação',
                                onClick: handleEdit
                            },
                            {
                                text: 'Deletar Publicação',
                                onClick: handleDelete
                            }
                        ]}
                    />
                </ContainerMenu>
            }
            
            <StyledUserName>@{user}</StyledUserName>
            <StyledDate>{moment(date).format('LLL')}</StyledDate>
            <ContainerText>{text}</ContainerText>
        </PostContainer>
    )
}

export default Post