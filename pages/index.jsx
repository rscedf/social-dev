import styled from "styled-components"

import Navbar from "../src/components/layout/Navbar"
import Container from "../src/components/layout/Container"
import CreatePost from "../src/components/Cards/CreatePost"

const Content = styled.div`
  margin: 50px 0;
  display:flex;
  
`

function HomePage () {
  
  return (
    <>
      <Navbar></Navbar>
      <Content>
        <Container>
          <CreatePost/>
        </Container>
        
      </Content>
    
    </>
    
  )
}

export default HomePage