import React, { Component } from 'react'
import { Form, Input, DatePicker, Button, Select, Row, Col, Spin, InputNumber } from '@uyun/components'
import moment from 'moment'

import __ from '@uyun/utils/i18n'

import { postProjectUpdata, getWeightExceed100, getStageDeliverable, getCompanyContact } from '@/services/api'

import './NewTask.less'

const { RangePicker } = DatePicker
const { TextArea } = Input
const { Option } = Select
const ButtonGroup = Button.Group

const dateFormat = 'YYYY-MM-DD'

var id = 0

@Form.create()
class Edit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      managerList: [],
      params: {},
      deliverablesKeys: [],
      deliverList: []
    }
  }

  componentDidMount () {
    this.props.onRef(this)
    this.getDeliverTable()
    this.getPrincipal()
  }

  save = () => {
    const { projectInfo } = this.props

    this.setState({ loading: true })
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        getWeightExceed100({
          projectId: projectInfo.id,
          stageId: projectInfo.stageType,
          weight: values.weight
        }).then(res => {
          if (res.resultMap.data) {
            postProjectUpdata(values).then(res => {
              this.props.onClose()
              this.setState({ loading: false })
            })
          }
        })
      }
    })
  }

  getPrincipal = () => {
    const { projectInfo } = this.props
    getCompanyContact({ flag: 1, id: projectInfo.id }).then(res => {
      if (res.code === 0) {
        this.setState({ managerList: res.resultMap.data.contactList })
      }
    })
  }

  getDeliverTable = () => {
    const { projectInfo, stageInfo } = this.props

    getStageDeliverable({
      stageId: 5,
      filename: '',
      substageId: stageInfo.id,
      projectId: projectInfo.id
    }).then(res => {
      if (res.code === 0) {
        this.setState({ deliverList: res.resultMap.data })
      }
    })
  }

  removeDeliverables = id => {
    const deliverList = this.state.deliverList

    this.setState({
      deliverList: deliverList.filter(key => key.id !== id)
    })
  }

  addDeliverables = () => {
    const deliverList = this.state.deliverList
    const nextKeys = deliverList.concat({ id: id++ })
    this.setState({
      deliverList: nextKeys
    })
  }

  render () {
    const { stageInfo } = this.props
    const { getFieldDecorator } = this.props.form
    const { managerList, deliverList, loading } = this.state

    const formItems = deliverList.map((item, index) => (
      <Form.Item
        className="border"
        label={__('addSubphase-delivery-name')}
        required={false}
        key={index}
      >
        &nbsp;
        { stageInfo.end ? (stageInfo.name) : (getFieldDecorator('deliTitleList[' + item.id + ']', {
          rules: [
            {
              type: 'string',
              required: true,
              message: "Please input passenger's name or delete this field."
            }
          ]
        })(<Input className="name" />)) }
        <ButtonGroup type="link">
          <a className="Rabsolute" onClick={() => this.removeDeliverables(item.id)}>{__('button-del')}</a>
        </ButtonGroup>
      </Form.Item>
    ))

    return (
      <div className="basic-Edit">
        <Spin spinning={loading}>
          <Row>
            <Col span={24}>{__('addSubphase-phase-name')}:&nbsp;
              {stageInfo.taskTitle}
            </Col>
          </Row>
          <Row>
            <Col span={12}>{__('stageTask-stage-manager')}:&nbsp;
              {getFieldDecorator('substageLeader', { initialValue: stageInfo.substageLeader, rules: [{ required: true }] })(
                <Select>
                  {managerList.map((item, i) => {
                    return <Option value={item.id} key={i}>{item.contactName}</Option>
                  })}
                </Select>
              )}
            </Col>
            <Col span={12}>{__('addSubphase-weight')}:&nbsp;
              {getFieldDecorator('weight', { initialValue: stageInfo.weight, rules: [{ required: true }] })(<InputNumber />)}%
            </Col>
          </Row>
          <Row>
            <Col span={24}>{__('addSubphase-planned-days')}:&nbsp;
              {getFieldDecorator('planExpend', { initialValue: stageInfo.planExpend, rules: [{ required: true }] })(<InputNumber />)}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {__('newTask-schedule-start-deadline')}:&nbsp;
              {getFieldDecorator('time', { initialValue: [moment(stageInfo.startTime, dateFormat), moment(stageInfo.endTime, dateFormat)], rules: [{ type: 'array', required: true }] })(<RangePicker format={dateFormat} />)}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {__('addSubphase-description-stages')}:
              {getFieldDecorator('substageDesc', { initialValue: stageInfo.substageDesc, rules: [{ required: true }] })(<TextArea placeholder={__('form-item-goal-placeholder')} rows={4} />)}
            </Col>
          </Row>
          <h3>{__('newTask-core-deliverables')}
            <Button type="primary" onClick={this.addDeliverables}>{__('button-newly')}</Button>
          </h3>
          {formItems}
        </Spin>
      </div>
    )
  }
}

export default Edit
