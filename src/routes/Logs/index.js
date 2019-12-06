import React, { Component } from 'react'
import { Table, DatePicker, Select, Spin } from '@uyun/components'
import moment from 'moment'

import { postWorkList, postListUsers } from '@/services/api'

import PageHeader from '@/components/PageHeader'
import __ from '@uyun/utils/i18n'

import './index.less'

const { RangePicker } = DatePicker
const { Option } = Select

const columns = [
  {
    title: __('logs-date'),
    dataIndex: 'workDate',
    key: 'workDate',
    width: '85px'
  },
  {
    title: __('table-title-project-name'),
    dataIndex: 'projectName',
    key: 'projectName',
    width: '205px'
  },
  {
    title: __('stageTask-task-name'),
    dataIndex: 'taskTitle',
    key: 'taskTitle',
    width: '220px'
  },
  {
    title: __('logs-description'),
    dataIndex: 'workDesc',
    key: 'workDesc'
  },
  {
    title: __('investment-working-hours'),
    dataIndex: 'actualExpend',
    key: 'actualExpend',
    width: '102px'
  },
  {
    title: __('deliverables-submitter'),
    dataIndex: 'createUser',
    key: 'createUser',
    width: '103px'
  },
  {
    title: __('logs-time'),
    dataIndex: 'createTime',
    key: 'createTime',
    width: '218px'
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

class Logs extends Component {
  constructor (props) {
    super(props)
    var times = getTimes()

    this.state = {
      tableData: {},
      userList: [],
      loading: false,
      params: {
        userId: '',
        companyIndustry: '',
        pageNum: 0,
        pageSize: 10,
        startDate: times[0],
        endDate: times[1],
        projectName: '',
        applyType: ''
      }
    }
  }

  componentDidMount () {
    this.getUserList(() => {
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
      postWorkList(this.state.params).then(res => {
        if (res.code === 0) {
          this.setState({ tableData: res.resultMap.data })
        }
        this.setState({ loading: false })
      })
    })
  }

  selectChange = (val) => {
    this.setState(state => ({
      params: { ...state.params, userId: val }
    }), () => {
      this.getTableData()
    })
  }

  getUserList = (fn) => {
    postListUsers(window.USER_INFO).then(res => {
      if (res.code === 0) {
        var data = res.resultMap.data
        var userId = data[0] ? data[0].userId : ''

        this.setState(state => ({
          params: {
            ...state.params,
            userId: userId
          },
          userList: data
        }), () => {
          fn()
        })
      }
    })
  }

  timeChange = (d) => {
    this.setState(state => ({
      params: {
        ...state.params,
        startDate: d[0].format('YYYY-MM-DD'),
        endDate: d[1].format('YYYY-MM-DD')
      }
    }), () => {
      this.getTableData()
    })
  }

  render () {
    const { params, tableData, loading, userList } = this.state

    return (
      <div className="basic-log">
        <PageHeader />
        <div className="filter">
          <RangePicker
            value={[moment(params.startDate, 'YYYY-MM-DD'), moment(params.endDate, 'YYYY-MM-DD')]}
            placeholder={[__('form-item-date-start-time'), __('form-item-date-end-tiem')]}
            onChange={this.timeChange}
          />
          <Select onChange={this.selectChange} value={params.userId} className="filter-select">
            {userList.map(item => {
              return <Option value={item.userId} key={item.userId}>{item.realname}</Option>
            })}
          </Select>
        </div>
        <Spin spinning={loading}>
          <Table
            border
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

export default Logs
