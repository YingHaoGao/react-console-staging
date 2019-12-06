import React, { Component } from 'react'
import { Input, Table, Spin } from '@uyun/components'

import __ from '@uyun/utils/i18n'
import { getManagerList, postAssignManager } from '@/services/api'

import './AssignManager.less'

const Search = Input.Search

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: text => <a href="javascript:;">{text}</a>
}, {
  title: 'Age',
  dataIndex: 'age'
}, {
  title: 'Address',
  dataIndex: 'address'
}]

class AssignManager extends Component {
  constructor (props) {
    super(props)
    this.state = {
      managerList: [],
      loading: false,
      selectedRowKeys: [],
      params: {
        userId: window.USER_INFO.userId,
        tenantId: window.USER_INFO.tenantId,
        name: ''
      }
    }
  }

  componentDidMount () {
    this.props.onRef(this)
    this.getList()
  }

  tableChange = (record, item) => {
    this.setState({ selectedRowKeys: [record[record.length - 1]] })
  }

  getList = () => {
    let { params } = this.state

    this.setState({ loading: true }, () => {
      getManagerList(params).then(res => {
        if (res.code === 0) {
          this.setState({ managerList: res.resultMap.data })
        }
      })
      this.setState({ loading: false })
    })
  }

  save = () => {
    this.setState({ loading: true }, () => {
      postAssignManager(this.state.name).then(res => {
        if (res.code === 0) {
          this.props.onClose()
        }
      })
      this.setState({ loading: false })
    })
  }

  onSearch = (val) => {
    let { params } = this.state
    params.name = val
    this.setState({ params: params }, () => {
      this.getList()
    })
  }

  onClear = () => {
    let { params } = this.state
    params.name = ''
    this.setState({ params: params }, () => {
      this.getList()
    })
  }

  render () {
    const { managerList, loading, selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.tableChange
    }

    return (
      <div className="basic-assignManager">
        <header>
          <Search
            placeholder={__('assign-sales-phone')}
            onSearch={this.onSearch}
            allowClear
            onClear={this.onClear}
          />
        </header>
        <Spin spinning={loading}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            pagination={false}
            showHeader={false}
            dataSource={managerList} />
        </Spin>
      </div>
    )
  }
}

export default AssignManager
