import styled from 'styled-components'
import PropTypes from 'prop-types'

const Card = styled.div`
    margin-top: ${({ isFar }) => isFar ? '10' : '1'}rem;
    padding: 3rem 5rem;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 0 1rem #888;
    ${({ others }) => others ? others : ''}
`

Card.propTypes = {
  // 是不是距离顶上很远的那种
  isFar: PropTypes.bool,
  children: PropTypes.array
}

export default Card
