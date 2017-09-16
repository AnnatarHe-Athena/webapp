import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { Link } from 'react-router'
import { graphql, withApollo } from 'react-apollo'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Notification from 'rc-notification'
import { profileGot } from '../../actions/auth'
import Card from '../../components/card/Card'
import addGirlCells from 'AthenaSchema/mutations/addGirlCells.graphql'

import PhotoList from '../../components/photos/Photos'
import PageContainer from '../../components/PageContainer'
import Tab from '../../components/tab/Tab'
import Button from '../../components/button/Button'
import Separator from '../../components/Separator'

const H2 = styled.h2`

`

const ReadyToUpload = styled.table`
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-collapse: collapse;
  border-spacing: 0;

  thead tr:first-child {
    background-color: #f7f7f7;
  }
  tbody tr:nth-child(2n) {
    background-color: #f7f7f7;
  }
  td, th {
    padding: .6923rem 4.15rem .6923rem 1.077rem;
    color: #333333;
    border: 0;
  }
  thead th {
    font-weight: 400;
    line-height: 1.6;
    color: #7e848c;
  }
`

const InputField = styled.div`
  input {
    border: none;
    width: 100%;
    padding: 1rem .3rem;
    outline: none;
    transition: all .35s;
    border: 1px solid transparent;
    margin-bottom: .5rem;
    &:focus {
      border-bottom-color: #888;
    }
  }
`

const Submits = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const premissionOptions = [{
  value: 2,
  label: 'Public'
}, {
  value: 3,
  // visiable user him/herself only
  label: 'Private'
}]


@connect(state => ({
  categories: state.getIn(['app', 'categories'])
}))
@withApollo
class CreateItems extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      cells: fromJS([]),
      input: fromJS({
        url: '', text: '', cate: props.categories.getIn([0, 'id']), premission: premissionOptions[0].value
      })
    }
    this.notification = Notification.newInstance({
      prefixCls: 'notification',
      style: {}
    })
  }

  metaUpdateInput = (type) => e => {
    const val = e.target ? e.target.value : e.value
    this.setState({
      input: this.state.input.update(type, _ => val)
    })
  }

  renderTableHeader() {
    return ['img', 'text', 'cate'].map((x, i) => {
      return <th key={i}>{x}</th>
    })
  }

  renderTableContent() {
    return this.state.cells.toJS().map((x, i) => {
      return (
        <tr key={i}>
          {Object.keys(x).map((k, ind) => {
            return <td key={ind}>{x[k]}</td>
          })}
        </tr>
      )
    })
  }

  upload = async () => {
    const cells = this.state.cells.map(x => {
      return x.update('img', _ => {
        const lastUrl = x.get('url').split('/')
        return lastUrl[lastUrl.length - 1]
      }).delete('url')
    }).toJS()
    if (cells.length === 0) {
      this.notification.notice({
        content: 'need information to upload'
      })
      return
    }
    this.setState({ loading: true })
    try {
      const result = await this.props.client.mutate({
        mutation: addGirlCells,
        variables: { cells }
      })

      this.notification.notice({
        content: 'upload nice'
      })
    } catch(e) {
      this.notification.notice({
        content: 'upload Error'
      })
    } finally {
      this.setState({ loading: false, cells: fromJS([]) })
    }
  }

  componentWillUnmount() {
    this.notification.destroy()
    this.notification = null
  }

  render() {
    const categories = this.props.categories.map(x => ({ value: ~~x.get('id'), label: x.get('name') }))
    return (
      <PageContainer>
        <Card>
          <H2>Create Cells</H2>
          <Separator />
          <ReadyToUpload>
            <thead>
              <tr>{this.renderTableHeader()}</tr>
            </thead>
            <tbody>
              {this.renderTableContent()}
            </tbody>
          </ReadyToUpload>
          <Separator />
          <InputField>
            <input type="url" onChange={this.metaUpdateInput('url')} placeholder="URL" value={this.state.input.get('url')} />
            <input type="text" onChange={this.metaUpdateInput('text')} placeholder="TEXT" value={this.state.input.get('text')} />
            <Select
              name="categories"
              value={this.state.input.get('cate')}
              options={categories.toJS()}
              placeholder="Category"
              onChange={this.metaUpdateInput('cate')}
            />
            <Select
              name="Premission"
              value={this.state.input.get('premission')}
              options={premissionOptions}
              placeholder="Premission"
              onChange={this.metaUpdateInput('premission')}
            />
          </InputField>
          <p>Only image that uploaded to weibo can be save in there. just content url. not full url</p>
          <Submits>
            <Button
              color="ghost"
              size="medium"
              onClick={() => {
                this.setState({
                  cells: this.state.cells.push(this.state.input),
                  input: fromJS({ url: '', text: '', cate: this.props.categories.getIn([0, 'id']) })
                })
              }}
            >Save</Button>
            <Button
              color="blue"
              size="medium"
              onClick={this.upload}
            >Upload</Button>
          </Submits>
        </Card>
      </PageContainer>
    )
  }
}

export default CreateItems
