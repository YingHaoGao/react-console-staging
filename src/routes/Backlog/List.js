import __ from '@uyun/utils/i18n'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Radio, Spin, Table } from '@uyun/components'
import { getBacklogList } from '@/services/api'

import './List.less'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const radioList = [
  {
    key: 0,
    label: __('state-pending')
  },
  {
    key: 1,
    label: __('state-dispose')
  }
]
const columns = [
  {
    title: __('task-dispatcher'),
    dataIndex: 'createUser',
    width: '87px'
  },
  {
    title: __('newTask-task-name'),
    dataIndex: 'taskTitle',
    render: (name, row) => <Link to={'/project/' + row.id}>{name}</Link>
  },
  {
    title: __('task-state'),
    dataIndex: 'taskType'
  },
  {
    title: __('stageTask-creation-time'),
    dataIndex: 'createTime'
  }
]

export default class BackList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: [],
      loading: false,
      params: {
        status: radioList[0].key,
        pageNum: 0,
        pageSize: 10
      }
    }
  }

  componentDidMount () {
    this.getTableData()
  }

  radioChange = (e) => {
    let { params } = this.state
    params.status = e.target.value
    this.setState({ params: params }, () => {
      this.getTableData()
    })
  }

  paginChange = (pagination) => {
    this.setState(state => ({
      params: {
        ...state.params,
        pageSize: pagination.pageSize,
        pageNum: pagination.current
      }
    }), () => {
      this.getTableData()
    })
  }

  getTableData = () => {
    this.setState({ loading: true }, () => {
      getBacklogList(this.state.params).then(res => {
        if (res.code === 0) {
          this.setState({ tableData: res.resultMap.data })
        }
        this.setState({ loading: false })
      })
    })
  }

  render () {
    const { params, loading, tableData } = this.state

    return (
      <div className="listBox">
        <header>
          <RadioGroup className="radio" onChange={this.radioChange} defaultValue={params.status}>
            {radioList.map((item, i) => {
              return <RadioButton key={i} value={item.key}>{item.label}</RadioButton>
            })}
          </RadioGroup>
        </header>
        <Spin spinning={loading}>
          <Table
            rowKey="id"
            dataSource={tableData.list}
            columns={columns}
            pagination={{ total: tableData.total }}
            onChange={this.paginChange}
          />
        </Spin>
      </div>
    )
  }
}
