import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col, Modal, Popconfirm, Empty, Radio, Spin } from '@uyun/components'

import NewTask from '../Model/NewTask'
import SubReview from '../Model/SubReview'
import Edit from '../Model/Edit'

import { getSubStageQueryStageTask, delSubStage, changeTaskStatus } from '@/services/api'

import __ from '@uyun/utils/i18n'

import './StageTask.less'

const ButtonGroup = Button.Group

const columns = [{
  title: __('stageTask-task-name'),
  dataIndex: 'taskTitle',
  render: (taskTitle, record) => (<Link to={'/task/' + record.substageId}>{taskTitle}</Link>),
  key: 'taskTitle',
  width: '267px'
}, {
  title: __('stageTask-principal'),
  dataIndex: 'taskLeader',
  key: 'taskLeader',
  width: '83px',
  align: 'center'
}, {
  title: __('stageTask-man-hour'),
  dataIndex: 'actualExpend',
  key: 'actualExpend',
  render: (text, record) => {
    return record.actualExpend + '/' + record.planExpend
  },
  width: '129px',
  align: 'center'
}, {
  title: __('stageTask-state'),
  dataIndex: 'status',
  key: 'state',
  width: '92px',
  align: 'center'
}, {
  title: __('stageTask-deliverable'),
  dataIndex: 'uploadDeliverable',
  key: 'uploadDeliverable',
  render: (text, record) => {
    return record.uploadDeliverable + '/' + record.relatedDeliverable
  },
  width: '82px',
  align: 'center'
}, {
  title: __('stageTask-creation-time'),
  dataIndex: 'createTime',
  key: 'createTime',
  align: 'center'
}]

const comObj = {
  NewTask (onClose, onRef, stageInfo, projectInfo) {
    return <NewTask onClose={onClose} onRef={onRef} stageInfo={stageInfo} projectInfo={projectInfo} />
  },
  SubReview (onClose, onRef, stageInfo, projectInfo) {
    return <SubReview onClose={onClose} onRef={onRef} stageInfo={stageInfo} projectInfo={projectInfo} />
  },
  Edit (onClose, onRef, stageInfo, projectInfo) {
    return <Edit onClose={onClose} onRef={onRef} stageInfo={stageInfo} projectInfo={projectInfo} />
  }
}

var child = {}

class StageTask extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      loading: false,
      modelName: 'NewTask',
      modelTitle: '',
      stageList: [],
      stageInfo: {}
    }
  }

  componentDidMount () {
    this.getList()
  }

  getList = () => {
    const { projectInfo } = this.props

    this.setState({ loading: true })
    getSubStageQueryStageTask({
      projectId: projectInfo.id,
      stageId: projectInfo.stageType
    }).then(res => {
      if (res.code === 0) {
        this.setState({ stageList: res.resultMap.data })
      }
    })
    this.setState({ loading: false })
  }

  onClose = () => {
    this.setState({ visible: false })
  }

  onOpen () {
    this.setState({ visible: true })
  }

  delClick = (id) => {
    return (e) => {
      delSubStage({ id: id })
    }
  }

  reviewClick = () => {
    this.setState({ modelName: 'SubReview', modelTitle: __('button-sub-phase-review') })
    this.onOpen()
  }

  editClick = (stageInfo) => {
    return () => {
      this.setState({ modelName: 'Edit', modelTitle: __('button-edit-stage'), stageInfo: stageInfo })
      this.onOpen()
    }
  }

  addTaskClick = () => {
    this.setState({ modelName: 'NewTask', modelTitle: __('button-add-task') })
    this.onOpen()
  }

  onRef (ref) {
    child = ref
  }

  statusChange = (item) => {
    return (e) => {
      item.status = e.target.value
      changeTaskStatus(item).then(res => {
        if (res.code === 0) {
          this.getList()
        }
      })
    }
  }

  ifDis (key, item) {
    const review = item.taskType
    // const sub = item.status
    const sub = '0'
    const obj = {
      'del': () => {
        if (sub === '0') {
          return true
        }
        if (sub === '1') {
          return true
        }
        if (sub === '2') {
          return true
        }
        if (sub === '3') {
          return true
        }
        if (sub === '4') {
          if (review === '1') {
            return true
          }
          return false
        }
        if (sub === '5') {
          return true
        }
      },
      'edit': () => {
        if (sub === '0') {
          return false
        }
        if (sub === '1') {
          return true
        }
        if (sub === '2') {
          return true
        }
        if (sub === '3') {
          return true
        }
        if (sub === '4') {
          return false
        }
        if (sub === '5') {
          return true
        }
      },
      'review': () => {
        if (review === '0') {
          return false
        }
        return true
      },
      'add-task': () => {
        if (sub === '0') {
          return false
        }
        if (sub === '1') {
          return true
        }
        if (sub === '2') {
          return true
        }
        if (sub === '3') {
          return true
        }
        if (sub === '4') {
          if (review === '1') {
            return false
          }
          return true
        }
        if (sub === '5') {
          return true
        }
      }
    }

    return obj[key]()
  }

  render () {
    const { projectInfo } = this.props
    const { modelName, visible, modelTitle, stageList, stageInfo, loading } = this.state

    return (
      <div>
        <Spin spinning={loading}>
          {stageList.map((item, i) => {
            return (
              <div className="basic-stageTask" key={i}>
                <header>
                  <span className="tableName">{item.substageTitle}</span>
                  <div className="buttonBox">
                    <ButtonGroup type="link" style={{ marginRight: 10 }}>
                      <Popconfirm title={__('stagetask-del')} onConfirm={this.delClick(item.id)} okText="Yes" cancelText="No">
                        <a disabled={this.ifDis('del', item)}>{__('button-del')}</a>
                      </Popconfirm>
                      <a onClick={this.editClick(item)} disabled={this.ifDis('edit', item)}>{__('button-edit')}</a>
                      <a onClick={this.reviewClick} disabled={this.ifDis('review', item)}>{__('button-a-review')}</a>
                      <a onClick={this.addTaskClick} disabled={this.ifDis('add-task', item)}>{__('button-add-task')}</a>
                    </ButtonGroup>
                    <Radio.Group value={item.status} onChange={this.statusChange(item)}>
                      <Radio.Button value="0" disabled={ item.status === '1' }>{__('button-start')}</Radio.Button>
                      <Radio.Button value="1">{__('button-accomplish')}</Radio.Button>
                    </Radio.Group>
                  </div>
                </header>
                <div className="bodyer">
                  <Row>
                    <Col span={6} className="">
                      <span name="name">{__('stageTask-stage-manager')}&nbsp;:&nbsp;</span>
                      <span name="value">{item.substageLeader}</span>
                    </Col>
                    <Col span={6} className="">
                      <span name="name">{__('stageTask-review-status')}&nbsp;:&nbsp;</span>
                      <span name="value">{item.status}</span>
                    </Col>
                    <Col span={5} className="">
                      <span name="name">{__('stageTask-subphase-state')}&nbsp;:&nbsp;</span>
                      <span name="value">{item.substageType}</span>
                    </Col>
                    <Col span={7} className="">
                      <span name="name">{__('stageTask-creation-time')}&nbsp;:&nbsp;</span>
                      <span name="value">{item.createTime}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6} className="">
                      <span name="name">{__('stageTask-phase-weight')}&nbsp;:&nbsp;</span>
                      <span name="value">{item.weight}%</span>
                    </Col>
                    <Col span={6} className="">
                      <span name="name">{__('stageTask-core-deliverables')}&nbsp;:&nbsp;</span>
                      <span name="value">{item.unRelatedDeliverable}/{item.totalDeliverable}</span>
                    </Col>
                    <Col span={5} className="">
                      <span name="name">{__('stageTask-man-hour')}&nbsp;:&nbsp;</span>
                      <span name="value">{item.actualExpend}/{item.planExpend}</span>
                    </Col>
                    <Col span={7} className="">
                      <span name="name">{__('stageTask-plan')}&nbsp;:&nbsp;</span>
                      <span name="value">{item.startTime}/{item.endTime}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} className="">
                      <span name="name">{__('stageTask-remark')}&nbsp;:&nbsp;</span>
                      <span name="value">{item.substageDesc}</span>
                    </Col>
                  </Row>
                </div>
                <Table columns={columns} pagination={false} childrenColumnName="childList" dataSource={item.stageTaskList} />
              </div>
            )
          })}
          {stageList.length === 0 ? (<Empty type="table" />) : null}
        </Spin>

        <Modal
          title={modelTitle}
          visible={visible}
          onOk={this.save}
          onCancel={this.onClose}
          destroyOnClose={true}
        >{comObj[modelName](this.onClose, this.onRef, stageInfo, projectInfo)}</Modal>
      </div>
    )
  }
}

export default StageTask
