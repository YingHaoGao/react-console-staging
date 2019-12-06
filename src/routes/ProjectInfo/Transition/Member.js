import React, { Component } from 'react'
import { Table, Button, Input, Transfer, Modal } from '@uyun/components'

import __ from '@uyun/utils/i18n'

import { getRoleList } from '@/services/api'

import './Member.less'

const ButtonGroup = Button.Group
const Search = Input.Search

const columns = [{
  title: __('member-employee-ID'),
  dataIndex: 'id',
  key: 'id',
  align: 'center',
  width: '80px'
}, {
  title: __('member-name'),
  dataIndex: 'name',
  key: 'name',
  align: 'center',
  width: '90px'
}, {
  title: __('member-station'),
  dataIndex: 'station',
  key: 'station',
  align: 'center',
  width: '460px'
}, {
  title: __('member-level'),
  dataIndex: 'level',
  key: 'level',
  align: 'center',
  width: '125px'
}, {
  title: __('member-operation'),
  width: '30%',
  align: 'center',
  key: 'operation',
  render: (text, record) => (
    <ButtonGroup type="link">
      <a>{__('button-remove')}</a>
    </ButtonGroup>
  )
}]

class Member extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      loading: false,
      mockData: [],
      tableData: [],
      targetKeys: [],
      params: {
        appId: '',
        name: '',
        tenantId: '',
        type: ''
      }
    }
  }

  componentDidMount () {
    const { projectInfo } = this.props
    const user = window.USER_INFO
    this.setState({
      params: {
        appId: projectInfo.id,
        name: user.username,
        tenantId: user.tenantId,
        type: user.userType
      }
    }, () => {
      this.getTableData()
    })
  }

  getMock = () => {
    const targetKeys = []
    const mockData = []
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1
      }
      if (data.chosen) {
        targetKeys.push(data.key)
      }
      mockData.push(data)
    }
    this.setState({ mockData, targetKeys })
  }

  handleChange = (targetKeys) => {
    this.setState({ targetKeys })
  }

  save = () => {

  }

  getTableData () {
    const { params } = this.state

    this.setState({ loading: true }, () => {
      getRoleList(params).then(res => {
        if (res.code === 0) {
          this.setState({ tableData: res.resultMap.data })
        }
      })
      this.setState({ loading: false })
    })
  }

  onClose = () => {
    this.setState({ visible: false })
  }

  onOpen = () => {
    this.setState({ visible: true })
  }

  onSearch = (val) => {
    let { params } = this.state
    params.name = val
    this.setState({ params: params }, () => {
      this.getTableData()
    })
  }

  onClear = () => {
    let { params } = this.state
    params.name = ''
    this.setState({ params: params }, () => {
      this.getTableData()
    })
  }

  render () {
    const { visible, tableData } = this.state

    return (
      <div className="basic-table">
        <header>
          <div className="inputBox">
            <Search
              onSearch={this.onSearch}
              allowClear
              onClear={this.onClear}
            />
          </div>
          <div className="buttonBox">
            <Button type="primary" onClick={this.onOpen}>{__('button-add-members')}</Button>
          </div>
        </header>
        <Table columns={columns} pagination={false} dataSource={tableData} footer={() => '共 ' + tableData.length + ' 名成员'}/>

        <Modal
          title={__('button-add-project-members')}
          visible={visible}
          onOk={this.save}
          onCancel={this.onClose}
          destroyOnClose={true}
        >
          <Transfer
            dataSource={this.state.mockData}
            showSearch
            listStyle={{
              width: 220,
              height: 300
            }}
            operations={[__('button-add-right'), __('button-remove')]}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
            render={item => `${item.title}-${item.description}`}
          />
        </Modal>
      </div>
    )
  }
}

export default Member
