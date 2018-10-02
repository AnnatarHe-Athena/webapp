import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


const JSONTextareaContainer = styled.section`
  h5 {
    margin: 0;
  }
  textarea {
    width: 100%;
    min-height: 10rem;
  }
`

class JSONTextarea extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      json: ''
    }
  }

  onTextareaChange = e => {
    const value = e.target.value.trim()
    try {
      JSON.parse(value)
    } catch(e) {
      alert('json invalid')
      return
    }

    this.setState({ json: value })
  }

  onUpload = () => {
    this.props.onUpload(JSON.parse(this.state.json))
  }


  render() {
    return (
      <JSONTextareaContainer>
        <h5>json 解码</h5>
        <p>拷贝进 json array. keys: fromURL, fromID, text, img, cate</p>
        <textarea onChange={this.onTextareaChange} value={this.state.json} />
        <button onClick={this.onUpload}> upload json schema</button>
      </JSONTextareaContainer>
    )
  }
}

JSONTextarea.propTypes = {
}

export default JSONTextarea

