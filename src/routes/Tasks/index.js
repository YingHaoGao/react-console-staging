import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, DatePicker, Input, Spin, Select } from '@uyun/components'
import moment from 'moment'
import { postTaskList } from '@/services/api'

import PageHeader from '@/components/PageHeader'
import __ from '@uyun/utils/i18n'

import './index.less'

const { RangePicker } = DatePicker
const { Search } = Input
const { Option } = Select

const columns = [
  {
    title: __('stageTask-task-name'),
    dataIndex: 'taskTitle',
    render: (name, row) => <Link to={'/task/' + row.id}>{name}</Link>
  },
  {
    title: __('table-title-project-number'),
    dataIndex: 'projectCode',
    render: (name, row) => <Link to={'/project/' + row.id}>{name}</Link>
  },
  {
    title: __('table-title-project-name'),
    dataIndex: 'projectName'
  },
  {
    title: __('task-state'),
    dataIndex: 'status',
    render: status => {
      let text = ''
      switch (status) {
        case '0':
          text = '未开始'
          break
        case '1':
          text = '进行中'
          break
        case '2':
          text = '已完成'
          break
        case '3':
          text = '已关闭'
          break
      }
      return <span>{text}</span>
    }
  },
  {
    title: __('task-subphase-name'),
    dataIndex: 'substageTitle'
  },
  {
    title: __('task-is-overdue'),
    dataIndex: 'is',
    render: endTime => {
      const endDate = new Date(endTime)
      const getEndTime = endDate.getTime()
      const nowData = new Date()
      const getNowData = nowData.getTime()
      return <span>{getNowData > getEndTime ? '是' : '否'}</span>
    }
  },
  {
    title: __('task-owner'),
    dataIndex: 'taskLeaderName'
  },
  {
    title: '报告人',
    dataIndex: 'reportUser'
  },
  {
    title: '是否关联节点',
    dataIndex: 'isPayment',
    render: (isPayment) => {
      return <span>{isPayment === '0' ? '未关联' : '已关联'}</span>
    }
  },
  {
    title: __('task-schedule-start-time'),
    dataIndex: 'startTime'
  },
  {
    title: __('task-schedule-end-time'),
    dataIndex: 'endTime'
  },
  {
    title: __('task-create-time'),
    dataIndex: 'createTime'
  }
]
const getTimes = () => {
  var date = new Date()
  var timestamp = date.getTime()
  var plus = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()

  var eDate = new Date(timestamp - 31536000000)
  var eYear = eDate.getFullYear()
  var eMonth = eDate.getMonth() + 1
  var eStrDate = eDate.getDate()

  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 1 && strDate <= 9) {
    strDate = '0' + strDate
  }
  if (eMonth >= 1 && eMonth <= 9) {
    eMonth = '0' + eMonth
  }
  if (eStrDate >= 1 && eStrDate <= 9) {
    eStrDate = '0' + eStrDate
  }

  var endTime = year + plus + month + plus + strDate
  var startTime = eYear + plus + eMonth + plus + eStrDate
 
  return [startTime, endTime]
}

class Tasks extends Component {
  constructor (props) {
    super(props)
    var times = getTimes()

    this.state = {
      tableData: {},
      loading: false,
      search: '',
      params: {
        createUserId: window.USER_INFO.userId,
        pageNum: 0,
        pageSize: 10,
        status: '',
        startTime: times[0],
        endTime: times[1]
      }
    }
  }

  componentDidMount () {
    this.getTableData()
  }

  getTableData () {
    this.setState({ loading: true }, () => {
      postTaskList(this.state.params).then(res => {
        if (res.code === 0) {
          this.setState({ tableData: res.resultMap.data })
        }
        this.setState({ loading: false })
      })
    })
  }

  paginChange = (pagination) => {
    let { params } = this.state

    params.pageSize = pagination.pageSize
    params.pageNum = pagination.current
   
    this.setState({ params: params }, () => {
      this.getTableData()
    })
  }

  onSearch = (val) => {
    let { params } = this.state
    params.keyWord = val
    this.setState({ params: params }, () => {
      this.getTableData()
    })
  }

  onClear = () => {
    let { params } = this.state
    params.keyWord = ''
    this.setState({ params: params }, () => {
      this.getTableData()
    })
  }

  handleChange = (value) => {
    let { params } = this.state
    params.status = value
    this.setState({ params: params }, () => {
      this.getTableData()
    })
  }

  onChangeDate = (date, dateString) => {
    let { params } = this.state
    params.startTime = dateString[0]
    params.endTime = dateString[1]

    this.setState({ params: params }, () => {
      this.getTableData()
    })
  }

  render () {
    const { tableData, loading, params } = this.state
    return (
      <div className="basic-tasks">
        <PageHeader />
        <div className="filter">
          <header>
            <Search
              placeholder={__('form-item-search')}
              onSearch={this.onSearch}
              allowClear
              onClear={this.onClear}
              className="filter-input"
            />
            <RangePicker
              defaultValue={[moment(params.startTime, 'YYYY-MM-DD'), moment(params.endTime, 'YYYY-MM-DD')]}
              placeholder={[__('form-item-date-start-time'), __('form-item-date-end-tiem')]}
              onChange={this.onChangeDate}
            />
            <Select defaultValue="" onChange={this.handleChange}>
              <Option value="">全部</Option>
              <Option value="0">未开始</Option>
              <Option value="1">进行中</Option>
              <Option value="2">已完成</Option>
              <Option value="3">已关闭</Option>
            </Select>
          </header>
        </div>
        <Spin spinning={loading}>
          <Table
            rowKey="id"
            dataSource={tableData.list}
            pagination={{ total: tableData.total }}
            columns={columns}
            onChange={this.paginChange}
          />
        </Spin>
      </div>
    )
  }
}

export default Tasks
