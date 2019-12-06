import React, { Component } from 'react'
import { Table, Button, Input, Select, Modal, Row, Col, Spin, Form } from '@uyun/components'

import { getStageDeliverable, getCompanyContact } from '@/services/api'

import __ from '@uyun/utils/i18n'

import './Deliverables.less'

const ButtonGroup = Button.Group
const { TextArea } = Input
const Search = Input.Search
const Option = Select.Option

const ifDis = (key) => {
  console.log(key)
  return true
}

const columns = [{
  title: __('deliverables-name'),
  dataIndex: 'name',
  key: 'name'
}, {
  title: __('deliverables-subordinate-stage'),
  dataIndex: 'age',
  key: 'stage',
  width: '12%'
}, {
  title: __('deliverables-delivery-statuse'),
  dataIndex: 'age',
  key: 'statuse',
  width: '12%'
}, {
  title: __('deliverables-submitter'),
  dataIndex: 'age',
  key: 'submitter',
  width: '12%'
}, {
  title: __('deliverables-submission-time'),
  dataIndex: 'age',
  key: 'tim',
  width: '12%'
}, {
  title: __('deliverables-operation'),
  dataIndex: 'address',
  width: '30%',
  key: 'address',
  render: (text, record) => (
    <ButtonGroup type="link">
      <a disabled={ifDis('review')}>{__('button-review')}</a>
      <a>{__('button-download')}</a>
    </ButtonGroup>
  )
}]
const stageList = [
  {
    key: 1,
    label: '交流阶段'
  },
  {
    key: 2,
    label: '文档交流'
  },
  {
    key: 3,
    label: 'POC阶段'
  },
  {
    key: 4,
    label: '投标阶段'
  }
]
const modelColumns = [{
  title: __('table-index'),
  key: 'index',
  width: '40px',
  render: (text, record, index) => index
}, {
  title: __('deliverables-name'),
  dataIndex: 'name',
  width: '150px',
  key: 'name'
}, {
  title: __('deliverables-subordinate-stage'),
  dataIndex: 'stage',
  key: 'stage',
  render: (text, record) => {
    let stage = stageList.filter(item => item.key === record.stage)
    return stage[0] ? stage[0].label : ''
  }
}, {
  title: __('deliverables-delivery-statuse'),
  dataIndex: 'statuse',
  key: 'statuse',
  width: '100px'
}, {
  title: __('deliverables-submitter'),
  dataIndex: 'submitter',
  key: 'submitter',
  width: '60px'
}, {
  title: __('deliverables-submission-time'),
  dataIndex: 'tim',
  key: 'tim',
  width: '140px'
}]

@Form.create()
class Deliverables extends Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false,
      loading: false,
      managerList: [],
      tableData: [],
      params: {
        stageId: 5,
        filename: '',
        substageId: 1,
        projectId: props.projectInfo.id
      }
    }
  }

  componentDidMount () {
    this.getDeliverList()
    this.getPrincipal()
  }

  getPrincipal = () => {
    const { projectInfo } = this.props
    getCompanyContact({ flag: 1, id: projectInfo.id }).then(res => {
      if (res.code === 0) {
        this.setState({ managerList: res.resultMap.data.contactList })
      }
    })
  }

  handleChange = (value) => {
    var params = Object.assign({}, this.state.params, { substageId: value })

    this.setState({ params: params }, () => {
      this.getDeliverList()
    })
  }

  getDeliverList = () => {
    this.setState({ loading: true }, () => {
      getStageDeliverable(this.state.params).then(res => {
        if (res.code === 0) {
          this.setState({ tableData: res.resultMap.data })
        }
      })
      this.setState({ loading: false })
    })
  }

  onSearch = (val) => {
    let { params } = this.state
    params.filename = val
    this.setState({ params: params }, () => {
      this.getDeliverList()
    })
  }

  onClear = () => {
    let { params } = this.state
    params.filename = ''
    this.setState({ params: params }, () => {
      this.getDeliverList()
    })
  }

  save = () => {
    const { projectInfo } = this.props

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {        

      }
    })
  }

  onClose = () => {
    this.setState({ visible: false })
  }

  onOpen = () => {
    this.setState({ visible: true })
  }

  render () {
    const { visible, managerList, params, tableData, loading } = this.state
    const { getFieldDecorator } = this.props.form

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
          <div className="inputBox">
            <span>{__('deliverables-subordinate-stage')}&nbsp;:&nbsp;</span>
            <Select defaultValue={params.substageId} style={{ width: 200 }} onChange={this.handleChange}>
              {stageList.map(item => {
                return <Option value={item.key} key={item.key}>{item.label}</Option>
              })}
            </Select>
          </div>
          <div className="buttonBox">
            <Button type="primary" onClick={this.onOpen}>{__('deliverables-delivery-review')}</Button>
          </div>
        </header>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            pagination={false}
            dataSource={tableData} />
        </Spin>

        <Modal
          title={__('deliverables-delivery-review')}
          className="deliverableMode"
          visible={visible}
          onOk={this.save}
          onCancel={this.onClose}
          destroyOnClose={true}
        >
          <Table columns={modelColumns} pagination={false} dataSource={tableData} />
          <Row>
            <Col span={24}>{__('newTask-apply-instructions')}</Col>
          </Row>
          <Row>
            <Col span={24}>
              {getFieldDecorator('instructions')(
                <TextArea style={{ minHeight: 32 }} rows={4} />
              )}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {__('postproject-apply-instructions')}:&nbsp;
              {getFieldDecorator('substageLeader', { rules: [{ required: true }] })(
                <Select>
                  {managerList.map((item, i) => {
                    return <Option value={item.id} key={i}>{item.contactName}</Option>
                  })}
                </Select>
              )}
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}

export default Deliverables
