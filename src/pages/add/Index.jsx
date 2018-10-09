import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
// import { Link } from 'react-router'
import { withApollo } from 'react-apollo'
import Select from 'AthenaComponents/select/Select'
import 'react-select/dist/react-select.css'
import Notification from 'rc-notification'
import PropTypes from 'prop-types'
import Card from 'AthenaComponents/card/Card'
import JSONTextarea from 'AthenaComponents/json-textarea/json-textarea'
import addGirlCells from 'AthenaSchema/mutations/addGirlCells.graphql'

import PageContainer from 'AthenaComponents/PageContainer'
import Button from 'AthenaComponents/button/Button'
import Separator from 'AthenaComponents/Separator'

const H2 = styled.h2`

`

const TextTip = styled.span`
  padding: 1rem 0;
  font-size: 14px;
  display: block;
  font-style: italic;
  a {
    color: #03a9f4;
  }
`

const ReadyToUpload = styled.table`
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;

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
    max-width: 2rem;
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
        url: '', text: '', cate: props.categories.getIn([0, 'id']) || 11, permission: premissionOptions[0].value,
        fromID: '', fromURL: ''
      })
    }
    Notification.newInstance({
      prefixCls: 'notification',
    }, notification => {
      this.notification = notification
    })
  }

  metaUpdateInput = (type) => e => {
    const val = e.target ? e.target.value : e.value
    this.setState({
      input: this.state.input.update(type, () => val)
    })
  }

  renderTableHeader() {
    return ['图片URL', '图片简单介绍', '分类', '权限', 'fromID', 'fromURL'].map((x, i) => {
      return <th key={i}>{x}</th>
    })
  }

  renderTableContent() {
    const categories = this.props.categories
    return this.state.cells.toJS().map((x, i) => {
      return (
        <tr key={i}>
          {Object.keys(x).map((k, ind) => {
            if (ind === 2) {
              console.log(categories.toJS(), x, k)
              return <td key={ind}>{categories.find(item => item.get('id') === x[k]).get('name') }</td>
            }
            if (ind === 3) {
              return <td key={ind}>{premissionOptions.find(item => item.value === x[k]).label}</td>
            }
            return <td key={ind}>{x[k]}</td>
          })}
        </tr>
      )
    })
  }

  upload = async () => {
    const cells = this.state.cells.map(x => {
      return x.update('img', () => {
        const url = x.get('url')
        // 判定当前是否是新浪图床的图片，是的话只截取对应的部分 url， 否则截取全体的
        if (url.indexOf('.sinaimg.cn') < 15 && url.indexOf('.sinaimg.cn') > 5) {
          const lastUrl = url.split('/')
          return lastUrl[lastUrl.length - 1]
        }
        return url
      }).delete('url')
    }).toJS()
    if (cells.length === 0) {
      this.notification.notice({
        content: 'need information to upload'
      })
      return
    }

    await this._uploadAction(cells)
  }

  _uploadAction = async (cells) => {
    this.setState({ loading: true })
    try {
      await this.props.client.mutate({
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

  uploadJSON = async value => {
    const newCellList = value.map(v => {
      return {
        img: v.img,
        text: (v.text ? v.text : v.content),
        cate: v.cate || 11,
        permission: premissionOptions[0].value,
        fromID: v.fromID,
        fromURL: v.fromURL,
        text: v.text
      }
    })
    await this._uploadAction(newCellList)
  }

  componentWillUnmount() {
    this.notification.destroy()
    this.notification = null
  }

  componentDidCatch(info, err) {
    // TODO: Add sentry do error handler
    console.error(info, err) // eslint-disable-line no-console
  }

  render() {
    const categories = this.props.categories.map(x => ({ value: ~~x.get('id'), label: x.get('name') }))
    return (
      <PageContainer>
        <Card>
          <H2>Create Cells</H2>
          <Separator />
          <JSONTextarea onUpload={this.uploadJSON} />
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
            <input type="text" onChange={this.metaUpdateInput('fromID')} placeholder="FROM ID" value={this.state.input.get('fromID')} />
            <input type="text" onChange={this.metaUpdateInput('fromURL')} placeholder="FROM URL" value={this.state.input.get('fromURL')} />
            <Select
              name="categories"
              value={this.state.input.get('cate')}
              options={categories.toJS()}
              placeholder="Category"
              onChange={this.metaUpdateInput('cate')}
            />
            <Select
              name="Permission"
              value={this.state.input.get('permission')}
              options={premissionOptions}
              placeholder="Premission"
              onChange={this.metaUpdateInput('permission')}
            />
          </InputField>
          <TextTip>强烈推荐使用新浪微博图床上传优秀的照片，其他服务也是允许的。 <a href="https://chrome.google.com/webstore/detail/%E6%96%B0%E6%B5%AA%E5%BE%AE%E5%8D%9A%E5%9B%BE%E5%BA%8A/fdfdnfpdplfbbnemmmoklbfjbhecpnhf?hl=zh-CN" target="_blank" rel="noopener noreferrer">新浪微博图床</a></TextTip>
          <Submits>
            <Button
              color="ghost"
              size="medium"
              onClick={() => {
                console.log('input', this.state.input.toJS())
                this.setState({
                  cells: this.state.cells.push(this.state.input),
                  input: fromJS({
                    url: '',
                    text: '',
                    cate: this.props.categories.getIn([0, 'id']),
                    permission: this.state.input.get('permission'),
                    fromID: '',
                    fromURL: ''
                  })
                })
              }}
              disabled={this.state.input.some(x => !x || x === '')}
            >Save</Button>
            <Button
              color="blue"
              size="medium"
              onClick={this.upload}
              disabled={this.state.cells.size === 0}
            >Upload</Button>
          </Submits>
        </Card>
      </PageContainer>
    )
  }
}

CreateItems.propTypes = {
  client: PropTypes.any,
  categories: PropTypes.arrayOf(PropTypes.any)
}

export default CreateItems
