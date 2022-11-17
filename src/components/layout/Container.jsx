import styled from "styled-components";

const StiledContainer = styled.div`
    display: flex;
    justify-content: center;

    @media(max-width: 700px){
        padding: 10px;
    }
`
const StiledChildren = styled.div`
    max-width: 700px;
    width: 100%;
`

function Container({children}){
    return (
        <StiledContainer>
            <StiledChildren>
                {children}
            </StiledChildren>            
        </StiledContainer>
    )
}

export default Container