import PropTypes from 'prop-types'
import styled from 'styled-components'

const colorMap = {
  red: {
    bgc: '#e91e63',
    font: '#ffffff'
  },
  blue: {
    bgc: '#2196f3',
    font: '#fff'
  },
  ghost: {
    bgc: 'transparent',
    font: '#000'
  }
}

const sizeMap = {
  large: {
    padding: '2rem 5rem',
    fontSize: '22px'
  },
  medium: {
    padding: '1rem 2.5rem',
    fontSize: '18px'
  }
}

const Button = styled.button`
    border: none;
    background-color: ${({ color }) => colorMap[color].bgc};
    padding: ${({ size }) => sizeMap[size].padding};
    font-size: ${({ size }) => sizeMap[size].fontSize};
    color: ${({ color }) => colorMap[color].font};
    ${({ fill }) => fill ? 'width: 100%;' : ''}
    border-radius: 4px;
    margin: .5rem 0;
    box-shadow: 0 0 .5rem #888888;
    transition: all .35s;
    outline: none;

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

Button.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  fill: PropTypes.bool
}

export default Button
