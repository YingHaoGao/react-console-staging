import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Table, Radio, Input, Select, Spin } from '@uyun/components'
import { getApplyList } from '@/services/api'

import PageHeader from '@/components/PageHeader'
import __ from '@uyun/utils/i18n'

import './index.less'

const Search = Input.Search

const radioList = [
  {
    key: '0',
    label: __('state-onaylanmam')
  },
  {
    key: '1',
    label: __('state-approved')
  },
  {
    key: '',
    label: __('state-all')
  }
]
const typeList = [
  {
    key: '',
    label: __('apply-select-type')
  },
  {
    key: '1',
    label: __('apply-clues-down')
  },
  {
    key: '2',
    label: __('apply-initiate-project')
  },
  {
    key: '3',
    label: __('apply-project-closure')
  },
  {
    key: '4',
    label: __('apply-support-before')
  },
  {
    key: '5',
    label: __('apply-contract-approve')
  },
  {
    key: '6',
    label: __('apply-price-for')
  },
  {
    key: '7',
    label: __('apply-project-startup')
  },
  {
    key: '8',
    label: __('apply-special-start')
  }
]
const columns = [
  {
    title: __('table-title-project-name'),
    width: '683px',
    dataIndex: 'clue_title',
    render: (name, row) => <Link to={'/project/' + row.id}>{name}</Link>
  },
  {
    title: __('apply-type-approval'),
    dataIndex: 'apply_type',
    width: '175px',
    render: (type) => {
      let typeObj = typeList.filter(item => item.key === type)

      return (typeObj.length > 0 ? typeObj[0].label : '')
    }
  },
  {
    title: __('deliverables-submitter'),
    dataIndex: 'create_user',
    width: '112px'
  },
  {
    title: __('postproject-submission-time'),
    dataIndex: 'apply_time'
  },
  {
    title: __('apply-status'),
    dataIndex: 'status',
    render: (status) => {
      let statusObj = radioList.filter(item => item.key === status)

      return (statusObj.length > 0 ? statusObj[0].label : '')
    }
  }
]

const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const { Option } = Select

class Apply extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: [],
      search: '',
      loading: false,
      params: {
        applyUserId: '',
        companyIndustry: '',
        pageNum: 0,
        pageSize: 10,
        projectName: '',
        applyType: '',
        status: radioList[0].key
      }
    }
  }

  componentDidMount () {
    this.getTableData()
  }

  radioChange = (e) => {
    let params = Object.assign({}, this.state.params, { status: e.target.value })

    this.setState({
      params: params
    }, () => {
      this.getTableData()
    })
  }

  typeChange = (val) => {
    let params = Object.assign({}, this.state.params, { applyType: val })
    this.setState({
      params: params
    }, () => {
      this.getTableData()
    })
  }

  onSearch = (val) => {
    let { params } = this.state
    params.applyUserId = val
    params.companyIndustry = val
    params.projectName = val
    this.setState({ params: params }, () => {
      this.getTableData()
    })
  }

  onClear = () => {
    let { params } = this.state
    params.applyUserId = ''
    params.companyIndustry = ''
    params.projectName = ''
    this.setState({ params: params }, () => {
      this.getTableData()
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

  getTableData () {
    this.setState({ loading: true }, () => {
      getApplyList(this.state.params).then(res => {
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
      <div className="basic-Apply">
        <PageHeader />

        <header>
          <Search
            placeholder={__('form-item-search')}
            onSearch={this.onSearch}
            allowClear
            onClear={this.onClear}
          />
          <span className="type">{__('apply-type')}:&ensp;</span>
          <Select defaultValue={params.applyType} onChange={this.typeChange}>
            {typeList.map(item => {
              return <Option value={item.key} key={item.key}>{item.label}</Option>
            })}
          </Select>
          <RadioGroup className="radio" onChange={this.radioChange} defaultValue={params.status}>
            {radioList.map((item, i) => {
              return <RadioButton key={i} value={item.key}>{item.label}</RadioButton>
            })}
          </RadioGroup>
        </header>
        <Card
          bordered={false}
          style={{ marginTop: 16 }}
        >
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
        </Card>
      </div>
    )
  }
}

export default Apply
