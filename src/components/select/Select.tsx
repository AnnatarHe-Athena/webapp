import React from 'react'
import styled from 'styled-components'

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

type SelectProps = {
  options: {
    value: string,
    label: string
  }[],
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  placeholder?: string
  name: string
}

class Select extends React.PureComponent<SelectProps, any> {
  renderOptions() {
    return this.props.options.map((x, i) => {
      return (
        <option key={i} value={x.value}>
          {x.label}
        </option>
      )
    })
  }

    handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

export default Select
