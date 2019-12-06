import React, { Component } from 'react'
import { Form, Input, DatePicker, Radio, Select, Row, Col, Table, Spin } from '@uyun/components'

import __ from '@uyun/utils/i18n'
import { getContract, getDeliverableList, postAppAddPid } from '@/services/api'

import './PostProject.less'

const { RangePicker } = DatePicker
const { TextArea } = Input
const { Option } = Select
const RadioGroup = Radio.Group

const columns = [{
  title: __('stageTask-task-name'),
  dataIndex: 'name',
  key: 'name'
}, {
  title: __('stageTask-principal'),
  dataIndex: 'age',
  key: 'principal',
  width: '12%'
}, {
  title: __('stageTask-man-hour'),
  dataIndex: 'age',
  key: 'hour',
  width: '12%'
}, {
  title: __('stageTask-state'),
  dataIndex: 'age',
  key: 'state',
  width: '12%'
}, {
  title: __('stageTask-deliverable'),
  dataIndex: 'age',
  key: 'deliverable',
  width: '12%'
}, {
  title: __('stageTask-creation-time'),
  dataIndex: 'address',
  width: '30%',
  key: 'address'
}]

@Form.create()
class PostProject extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      deliverList: [],
      info: {},
      whether: 0
    }
  }

  componentDidMount () {
    this.props.onRef(this)
    this.getContractList()
    this.getDeliverable()
  }

  save = () => {
    const { projectInfo } = this.props

    this.setState({ loading: true })
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // postAppAddPid(values).then(res => {
        //   this.props.onClose()
        //   this.setState({ loading: false })
        // })
      }
    })
  }

  getDeliverable = () => {
    const { projectInfo } = this.props
    getDeliverableList({ projectId: projectInfo.id }).then(res => {
      if (res.code === 0) {
        this.setState({ deliverList: res.resultMap.data })
      }
    })
  }

  getContractList = () => {
    const { projectInfo } = this.props
    getContract({ projectId: projectInfo.id }).then(res => {
      if (res.code === 0) {
        this.setState({ info: res.resultMap.data })
      }
    })
  }

  whetherChange = (e) => {
    this.setState({
      whether: e.target.value
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { info = {}, loading, deliverList } = this.state
    const list = []

    return (
      <div className="basic-postProjects">
        <Spin spinning={loading}>
          <Row>
            <Col span={8}>{__('postproject-contract-no')}: {info.contract}</Col>
            <Col span={8}>{__('postproject-reception-time')}: {info.contract}</Col>
          </Row>
          <h3>{__('postproject-personnel-investment')}</h3>
          <Row>
            <Col span={8}>{__('postproject-total-employees')}: {info.contract}</Col>
            <Col span={8}>{__('postproject-working-days')}: {info.contract}</Col>
          </Row>
          <h3>{__('postproject-core-deliverables')}</h3>
          <Row>
            <Col span={8}>{__('postproject-total-deliverables')}: {info.contract}</Col>
          </Row>
          <Table columns={columns} pagination={false} dataSource={deliverList} />
          <Row>
            <Col span={24}>
              {__('postproject-apply-instructions')}:&nbsp;
              {getFieldDecorator('aaaaa')(
                <TextArea style={{ minHeight: 32 }} placeholder={__('form-item-goal-placeholder')} rows={4} />
              )}
            </Col>
          </Row>
          <h3>{__('postproject-service-information')}</h3>
          <Row>
            <Col span={24}>
              {__('postproject-start-end-warranty')}:&nbsp;
              {getFieldDecorator('bbbbb')(
                <RangePicker />
              )}
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              {__('postproject-polling-period')}:&nbsp;
              {getFieldDecorator('ccccc')(
                <Select>
                  {list.map(item => {
                    return <Option value={item.id} key={item.id}>{item.name}</Option>
                  })}
                </Select>
              )}
            </Col>
            <Col span={12}>
              {__('postproject-checking-number')}:&nbsp;
              {getFieldDecorator('ddddd')(
                <Input />
              )}
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              {__('postproject-whether')}:&nbsp;
              {getFieldDecorator('eeeeee')(
                <RadioGroup onChange={this.whetherChange}>
                  <Radio value={0}>{__('postproject-radio-no')}</Radio>
                  <Radio value={1}>{__('postproject-radio-yes')}</Radio>
                </RadioGroup>
              )}
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              {__('postproject-start-end-time')}:&nbsp;
              {getFieldDecorator('ffffff')(
                <RangePicker />
              )}
            </Col>
            <Col span={12}>
              {__('postproject-years-site')}:&nbsp;
              {getFieldDecorator('ggggggg')(
                <Input />
              )}
            </Col>
          </Row>
        </Spin>
      </div>
    )
  }
}

export default PostProject
