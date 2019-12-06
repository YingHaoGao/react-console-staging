import React, { Component } from 'react'
import { Form, Input, DatePicker, InputNumber, Button, Select, Spin } from '@uyun/components'

import __ from '@uyun/utils/i18n'
import { postSubStageAdd, getWeightExceed100, getCompanyContact } from '@/services/api'

import './AddSubphase.less'

let id = 0

const { RangePicker } = DatePicker
const { TextArea } = Input
const { Option } = Select
const ButtonGroup = Button.Group

@Form.create()
class AddSubphase extends Component {
  constructor (props) {
    super(props)
    this.state = {
      managerList: [],
      params: {},
      loading: false
    }
  }

  componentDidMount () {
    this.props.onRef(this)
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

  save = () => {
    const { projectInfo } = this.props

    this.setState({ loading: true })
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.startTime = values.time[0] || ''
        values.endTime = values.time[1] || ''
        values.projectId = projectInfo.id
        values.deliTitleList = values.deliTitleList.filter(k => k !== null)
        getWeightExceed100({
          projectId: projectInfo.id,
          stageId: projectInfo.stageType,
          weight: values.weight
        }).then(res => {
          if (res.resultMap.data) {
            postSubStageAdd(values).then(res => {
              this.props.onClose()
              this.setState({ loading: true })
            })
          }
        })
      }
    })
  }

  removeDeliverables = k => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')

    form.setFieldsValue({
      keys: keys.filter(item => item !== k)
    })
  }

  addDeliverables = () => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(id++)

    form.setFieldsValue({
      keys: nextKeys
    })
  }

  substageLeaderChange = (val) => {
    const { form } = this.props
    console.log(val)
    form.setFieldsValue({
      substageLeader: val
    })
  }

  render () {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { managerList, loading } = this.state

    getFieldDecorator('keys', { initialValue: [] })

    const keys = getFieldValue('keys')

    const formItems = keys.map((k, index) => (
      <Form.Item
        className="border"
        label={__('addSubphase-delivery-name')}
        required={false}
        key={k}
      >
        {getFieldDecorator('deliTitleList[' + k + ']', {
          rules: [
            {
              type: 'string',
              required: true,
              message: "Please input passenger's name or delete this field."
            }
          ]
        })(<Input className="name" />)}
        <ButtonGroup type="link">
          <a className="Rabsolute" onClick={() => this.removeDeliverables(k)}>{__('button-del')}</a>
        </ButtonGroup>
      </Form.Item>
    ))

    return (
      <div className="basic-addSubphase">
        <Spin spinning={loading}>
          <Form>
            <Form.Item label={__('addSubphase-phase-name')}>
              {getFieldDecorator('substageTitle', { rules: [{ required: true }] })(<Input />)}
            </Form.Item>
            <Form.Item label={__('addSubphase-weight')}>
              {getFieldDecorator('weight', { rules: [{ required: true }] })(<InputNumber className="weight" />)}%
            </Form.Item>
            <Form.Item label={__('addSubphase-stage-manager')}>
              {getFieldDecorator('substageLeader', { rules: [{ required: true }] })(
                <Select onChange={this.substageLeaderChange}>
                  {managerList.map(item => {
                    return <Option value={item.id} key={item.id}>{item.contactName}</Option>
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item label={__('addSubphase-planned-days')}>
              {getFieldDecorator('planExpend', { rules: [{ required: true }] })(<InputNumber />)}
            </Form.Item>
            <Form.Item label={__('addSubphase-schedule-start-deadline')}>
              {getFieldDecorator('time', { rules: [{ type: 'array', required: true }] })(<RangePicker />)}
            </Form.Item>
            <Form.Item label={__('addSubphase-description-stages')}>
              {getFieldDecorator('substageDesc', { rules: [{ required: true }] })(<TextArea style={{ minHeight: 32 }} placeholder={__('form-item-goal-placeholder')} rows={4} />)}
            </Form.Item>
            <h3>
              {__('addSubphase-core-deliverables')}
              <Button type="primary" onClick={this.addDeliverables}>{__('button-newly')}</Button>
            </h3>
            {formItems}
          </Form>
        </Spin>
      </div>
    )
  }
}

export default AddSubphase
