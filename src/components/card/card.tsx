import * as React from 'react'
import styled from 'styled-components'

import { getImageUrl } from '../../utils/image'

interface ICard {
    id: number,
    name: string,
    url: string
}

const Container = styled.div`
    margin: .5rem;
`
const Text = styled.h4`
    margin: 0;
    padding: .3rem 0;
    font-weight: 400;
    font-size: 14px;
`
const Image = styled.img`
    border-radius: 4px;
`

const Card = (props: ICard) => {
    const url = getImageUrl(props.url)
    return (
        <Container>
            <Image src={url} alt={props.name} />
            <Text>{props.name}</Text>
        </Container>
    )
}

export default Card