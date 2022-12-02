import styled from "styled-components"

const Dots = styled.img`
    cursor: pointer;
`
const StyledMenu = styled.div`
    position: absolute;    
    width: 200px;
    box-shadow: 6px 5px 15px 5px rgba(0, 0, 0, 0.15);
    right: 0;
    background-color: ${props => props.theme.white};

    display: block;
`
const StyledOption = styled.div`
    padding: 15px;
    cursor: pointer;

    :hover{
        background-color: ${props => props.theme.inputBackground};
    }
`
const StyledContainerMenu = styled.div`
    position: relative;
`

const Menu = () => {
    return(
        <StyledContainerMenu>
            <Dots src="/three-dots.svg" height="20px" />
            <StyledMenu>
                <StyledOption>
                    Editar post
                </StyledOption>
                <StyledOption>
                    Deletar post
                </StyledOption>
            </StyledMenu>
        </StyledContainerMenu>
    )
}

export default Menu