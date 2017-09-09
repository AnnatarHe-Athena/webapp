import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.section`
`

const Header = styled.header`
`

const Body = styled.div`
`
const Content = styled.div`
`

class Tab extends React.PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            tab: props.tab[0].title
        }
    }

    getHeaders() {
        return this.props.tab.map((x, i) => {
            return (
                <button key={i}>{x.title}</button>
            )
        })
    }

    getBody() {
        const body = this.props.tab.find(x => x.title === this.state.tab)
        return (
            <Content>{body.body}</Content>
        )
    }

    render() {
        return (
            <Container>
                <Header>{this.getHeaders()}</Header>
                <Body>{this.getBody()}</Body>
            </Container>
        )
    }
}

Tab.propTypes = {
    tab: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.element.isRequired
    })).isRequired
}

export default Tab