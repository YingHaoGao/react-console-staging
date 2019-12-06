import React, { Component } from 'react'
import { Form, Input, List, Row, Col, message } from '@uyun/components'

import __ from '@uyun/utils/i18n'

import { postConApproval, getStageDeliverable } from '@/services/api'

import './NewTask.less'

const { TextArea } = Input

@Form.create()
class SubReview extends Component {
  constructor (props) {
    super(props)
    this.state = {
      initLoading: false,
      deliverList: [],
      reason: ''
    }
  }

  componentDidMount () {
    this.props.onRef(this)
    this.getDeliverTable()
  }

  save = () => {
    const { stageInfo } = this.props
    const { reason } = this.state
    postConApproval({
      id: stageInfo.id,
      reason: reason
    }).then(res => {
      this.props.onClose()
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

  reasonChange = e => {
    this.setState({ reason: e.target.value })
  }

  render () {
    const { stageInfo = {} } = this.props
    const { deliverList, initLoading } = this.state

    return (
      <div className="basic-SubReview">
        <Row>
          <Col span={8}>{__('addSubphase-weight')}:&nbsp;
            {stageInfo.weight}%
          </Col>
          <Col span={8}>{__('newTask-plan-time')}(h):&nbsp;
            {stageInfo.planExpend}
          </Col>
        </Row>
        <Row>
          <Col span={24}>{__('stageTask-plan')}:&nbsp;
            {stageInfo.uploadDeliverable} - {stageInfo.relatedDeliverable}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {__('newTask-stage-show')}:
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {stageInfo.substageDesc}
          </Col>
        </Row>
        <h3>{__('postproject-core-deliverables')}</h3>
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          dataSource={deliverList}
          renderItem={item => (
            <List.Item>
              <div className="listItem">
                <div>{item.name}</div>
              </div>
            </List.Item>
          )}
        />
        <Row>
          <Col span={24}>{__('newTask-apply-instructions')}:
          </Col>
        </Row>
        <Row>
          <TextArea rows={4} onChange={this.reasonChange} />
        </Row>
      </div>
    )
  }
}

export default SubReview
