import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Table, Radio, Input, Spin } from '@uyun/components'
import { getProjects } from '@/services/api'

import PageHeader from '@/components/PageHeader'
import __ from '@uyun/utils/i18n'

import './index.less'

const Search = Input.Search

const radioList = [
  {
    key: 0,
    label: __('state-unfinish')
  },
  {
    key: 1,
    label: __('state-finish')
  },
  {
    key: '',
    label: __('state-all')
  }
]
const columns = [
  {
    title: __('table-title-project-number'),
    dataIndex: 'projectCode',
    render: (name, row) => <Link to={'/project/' + row.id}>{name}</Link>
  },
  {
    title: __('table-title-project-name'),
    dataIndex: 'projectName',
    render: (name, row) => <Link to={'/project/' + row.id}>{name}</Link>
  },
  {
    title: __('table-title-customer-name'),
    dataIndex: 'proxyName'
  },
  {
    title: __('table-title-industry'),
    dataIndex: 'industry'
  },
  {
    title: __('table-title-area'),
    dataIndex: 'department'
  },
  {
    title: __('table-title-director-sales'),
    dataIndex: 'applyUser'
  },
  {
    title: __('table-title-preSales-person'),
    dataIndex: 'presalesUser'
  },
  {
    title: __('table-title-project-manager'),
    dataIndex: 'manageUser'
  },
  {
    title: __('table-title-project-phase'),
    dataIndex: 'projectStage'
  },
  {
    title: __('table-title-project-state'),
    dataIndex: 'status'
  },
  {
    title: __('table-title-project-time'),
    dataIndex: 'createTime'
  }
]

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class ProjectsTable extends Component {
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
    var params = Object.assign({}, this.state.params, { radio: e.target.value })

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

  getTableData () {
    this.setState({ loading: true }, () => {
      getProjects(this.state.params).then(res => {
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
      <div className="basic-projects">
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
        <Card
          bordered={false}
          style={{ marginTop: 16 }}
        >
          <Spin spinning={loading}>
            <Table
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

export default ProjectsTable
