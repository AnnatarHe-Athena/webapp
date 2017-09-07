import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
`

const PhotoItem = ({ src, desc, onClick }) => {
    return (
        <Container onClick={onClick}>
            <img src={src} />
            <span>{desc}</span>
        </Container>
    )
}

export default PhotoItem