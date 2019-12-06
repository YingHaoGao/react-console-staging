import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Input, Radio, Spin } from '@uyun/components'

import PageHeader from '@/components/PageHeader'
import __ from '@uyun/utils/i18n'

import { postApprovalList } from '@/services/api'

import './index.less'

const Search = Input.Search
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const columns = [
  {
    title: '线索/项目名称',
    dataIndex: 'name',
    key: 'name',
    render: name => <Link to="/">{name}</Link>
  },
  {
    title: '审批类型',
    dataIndex: 'apply_type',
    key: 'apply_type',
    width: '155px',
    render: text => {
      var i = typeList.filter(e => e.key === text)[0]
      return i ? i.label : ''
    }
  },
  {
    title: '提交人',
    dataIndex: 'apply_name',
    key: 'apply_name',
    width: '90px'
  },
  {
    title: '提交时间',
    dataIndex: 'apply_time',
    key: 'apply_time',
    width: '140px'
  },
  {
    title: '审批状态',
    dataIndex: 'status',
    key: 'status',
    width: '102px',
    render: text => {
      var i = radioList.filter(e => e.key === text)[0]
      return i ? i.label : ''
    }
  }
]
const radioList = [
  {
    key: '0',
    label: __('state-unfinish')
  },
  {
    key: '1',
    label: __('state-finish')
  },
  {
    key: '',
    label: __('state-all')
  }
]
const typeList = [
  {
    key: '0',
    label: '跨部门协助'
  },
  {
    key: '1',
    label: '阶段计划评审'
  },
  {
    key: '2',
    label: '阶段计划评审（阶段变更）'
  },
  {
    key: '3',
    label: '服务计划评审'
  },
  {
    key: '4',
    label: '项目启动'
  },
  {
    key: '5',
    label: '特批启动'
  },
  {
    key: '6',
    label: '项目结项'
  },
  {
    key: '7',
    label: '交付物评审'
  }
]

class BasicTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: [],
      search: '',
      loading: false,
      params: {
        applyUserId: window.USER_INFO.userId,
        companyIndustry: '',
        pageNum: 0,
        pageSize: 10,
        projectName: '',
        status: radioList[0].key
      }
    }
  }

  componentDidMount () {
    this.getTableData()
  }

  radioChange = (e) => {
    var params = Object.assign({}, this.state.params, { status: e.target.value })

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

  onSearch = (val) => {
    this.setState(state => ({
      params: {
        ...state.params,
        applyUserId: val,
        companyIndustry: val,
        projectName: val
      }
    }), () => {
      this.getTableData()
    })
  }

  onClear = () => {
    this.setState(state => ({
      params: {
        ...state.params,
        applyUserId: '',
        companyIndustry: '',
        projectName: ''
      }
    }), () => {
      this.getTableData()
    })
  }

  getTableData () {
    this.setState({ loading: true }, () => {
      postApprovalList(this.state.params).then(res => {
        if (res.code === 0) {
          this.setState({ tableData: res.resultMap.data })
        }
        this.setState({ loading: false })
      })
    })
  }

  render () {
    const { params, tableData, loading } = this.state

    return (
      <div className="basic-examine">
        <PageHeader />
        <header>
          <Search
            placeholder={__('form-item-search')}
            onSearch={this.onSearch}
            allowClear
            onClear={this.onClear}
          />
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

export default BasicTable
