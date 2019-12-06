import React, { Component } from 'react'
import { Form, Input, InputNumber, DatePicker, List, Radio, Button, Select, Row, Col, message, Upload, Spin } from '@uyun/components'

import __ from '@uyun/utils/i18n'

import { postTaskAdd, getStageDeliverable, getCompanyContact, postFileUpload } from '@/services/api'

import './NewTask.less'

const { RangePicker } = DatePicker
const { TextArea } = Input
const { Option } = Select

const CashList = [
  {
    key: '0',
    label: __('task-relevance')
  },
  {
    key: '1',
    label: __('task-irrelevancy')
  }
]
const taskList = [
  {
    key: '0',
    label: __('newTask-common')
  }
]
const formItemLayout = {
  labelCol: {
    sm: { span: 8 }
  },
  wrapperCol: {
    sm: { span: 16 }
  }
}

@Form.create()
class NewTask extends Component {
  constructor (props) {
    super(props)
    this.state = {
      deliverList: [],
      reporterList: [],
      managerList: [],
      initLoading: false,
      loading: false,
      fileList: [],
      filepathList: [],
      uploading: false
    }
  }

  componentDidMount () {
    this.props.onRef(this)
    this.getDeliverList()
    this.getPrincipal()
  }

  save = () => {
    this.setState({ loading: true })
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.startTime = values.time[0] || ''
        values.endTime = values.time[1] || ''
        values.filePath = this.state.filepathList
        postTaskAdd(values).then(res => {
          this.props.onClose()
          this.setState({ loading: false })
        })
      }
    })
  }

  getDeliverList = () => {
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

  getPrincipal = () => {
    const { projectInfo } = this.props
    getCompanyContact({ flag: 1, id: projectInfo.id }).then(res => {
      if (res.code === 0) {
        this.setState({ managerList: res.resultMap.data.contactList })
      }
    })
  }

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  render () {
    const { stageInfo = {} } = this.props
    const { getFieldDecorator } = this.props.form
    const { deliverList, managerList, initLoading, loading, fileList, uploading } = this.state
    const updataObj = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file)
          const newFileList = state.fileList.slice()
          const newFilepathList = state.filepathList.slice()
          newFileList.splice(index, 1)
          newFilepathList.splice(index, 1)
          return {
            fileList: newFileList,
            filepathList: newFilepathList
          }
        })
      },
      beforeUpload: (file) => {
        this.setState({
          uploading: true
        })

        postFileUpload({ file: file }).then(res => {
          if (res.code === 0) {
            this.setState(state => ({
              uploading: false,
              fileList: [...state.fileList, file],
              filepathList: [...state.filepathList, res.resultMap.data]
            }))
          }
        })

        return false
      },
      fileList
    }

    return (
      <div className="basic-postProject">
        <Spin spinning={loading}>
          <Form>
            <Row>
              <Col span={24}>
                <Form.Item label={__('newTask-task-name')}>
                  {getFieldDecorator('taskTitle', { initialValue: stageInfo.weight, rules: [{ required: true }] })(<InputNumber />)}%
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>{__('subphase')}: {stageInfo.substageTitle}</Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item {...formItemLayout} label={__('newTask-collection-point')}>
                  {getFieldDecorator('relevance', { rules: [{ required: true }] })(
                    <Select>
                      {CashList.map(item => {
                        return <Option value={item.id} key={item.id}>{item.label}</Option>
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label={__('newTask-revenue-point')}>
                  {getFieldDecorator('incomeId', { rules: [{ required: true }] })(
                    <Select>
                      {deliverList.map(item => {
                        return <Option value={item.id} key={item.id}>{item.name}</Option>
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item {...formItemLayout} label={__('newTask-mission-leader')}>
                  {getFieldDecorator('taskLeader', { rules: [{ required: true }] })(
                    <Select>
                      {managerList.map(item => {
                        return <Option value={item.key} key={item.key}>{item.contactName}</Option>
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label={__('newTask-task-type')}>
                  {getFieldDecorator('taskType', { rules: [{ required: true }] })(
                    <Select>
                      {taskList.map(item => {
                        return <Option value={item.key} key={item.key}>{item.label}</Option>
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item {...formItemLayout} label={__('newTask-reporter')}>
                  {getFieldDecorator('reportUserId', { rules: [{ required: true }] })(
                    <Select>
                      {managerList.map(item => {
                        return <Option value={item.id} key={item.id}>{item.contactName}</Option>
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label={__('newTask-plan-is')}>
                  {getFieldDecorator('planExpend', { rules: [{ required: true }] })(<InputNumber />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label={__('newTask-schedule-start-deadline')}>
                  {getFieldDecorator('time', { rules: [{ type: 'array', required: true }] })(<RangePicker />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label={__('postproject-apply-instructions')}>
                  {getFieldDecorator('taskDesc', { rules: [{ required: true }] })(<TextArea placeholder={__('form-item-goal-placeholder')} rows={4} />)}
                </Form.Item>
              </Col>
            </Row>
            <h3>{__('newTask-task-description')}</h3>
            <List
              className="demo-loadmore-list"
              loading={initLoading}
              itemLayout="horizontal"
              dataSource={deliverList}
              renderItem={item => (
                <List.Item>
                  <Radio>
                    <div className="listItem">
                      <div>{item.name}</div>
                    </div>
                  </Radio>
                </List.Item>
              )}
            />
            <h3>{__('newTask-accessory')}</h3>
            <Form.Item>
              <Upload {...updataObj}>
                <Button type="primary" loading={uploading}>
                  {__('newTask-uploading')}
                </Button>
              </Upload>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    )
  }
}

export default NewTask
