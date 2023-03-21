import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;


const SimpleButton = styled.button`
  width: 20px;
  height: 10px;
  padding: 1em;
  background: blue;
`

// Use Title and Wrapper like any other React component – except they're styled!
const StyleCompA = () => (
  <>
  <Wrapper>
    <Title>
      Hello World!
    </Title>
  </Wrapper>
  <SimpleButton>click me</SimpleButton>
  </>
);

export default StyleCompA