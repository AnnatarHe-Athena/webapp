import React from 'react'
import styled from 'styled-components'

const colorMap = {
    red: {
        bgc: '#e91e63',
        font: '#ffffff'
    }
}

const sizeMap = {
    large: {
        padding: '2rem 5rem',
        fontSize: '22px'
    }
}

const Button = styled.button`
    border: none;
    background-color: ${({ color }) => colorMap[color].bgc};
    padding: ${({ size }) => sizeMap[size].padding};
    font-size: ${({ size }) => sizeMap[size].fontSize};
    color: ${({ color }) => colorMap[color].font};
    border-radius: 4px;
    margin: .5rem 0;
    box-shadow: 0 0 .5rem #888888;
    transition: all .35s;

    &:hover {
        transform: scale(1.1);
    }

    &:disabled {
        background-color: #c9c9c9;
        &:hover {
            transform: none;
        }
    }
`

export default Button