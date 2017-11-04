import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const SelectStyleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span {
  }

  & > select {
    width: 10rem;
    border: 1px solid #888;
    padding: .5rem;
  }
`

/*
  <Select
    name="Premission"
    value={this.state.input.get('premission')}
    options={premissionOptions}
    placeholder="Premission"
    onChange={this.metaUpdateInput('premission')}
  />
*/

class Select extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  renderOptions() {
    return this.props.options.map((x, i) => {
      return (
        <option
          key={i}
        >
          {x.label}
        </option>
      )
    })
  }

    handleChange = e => {
      this.props.onChange(e)
    }

    render() {
      const { value, name } = this.props
      return (
        <SelectStyleContainer>
          <span>{name}: </span>
          <select value={value} onChange={this.handleChange}>
            {this.renderOptions()}
          </select>
        </SelectStyleContainer>
      )
    }
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })),
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string
}

export default Select
