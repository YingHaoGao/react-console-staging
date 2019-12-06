import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Table, Button, DatePicker, Select, Input, Modal, Checkbox } from '@uyun/components'
import moment from 'moment'
import { getTaskInfo, getAttachmentList, getTaskDeliverList } from '@/services/api'

import PageHeader from '@/components/PageHeader'
import __ from '@uyun/utils/i18n'

import './index.less'

const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input

const tyleList = [
  {
    key: '0',
    label: '未开始'
  },
  {
    key: '1',
    label: '进行中'
  },
  {
    key: '2',
    label: '已完成'
  },
  {
    key: '3',
    label: '已关闭'
  }
]
const statusList = [
  {
    key: '0',
    label: '未开始'
  },
  {
    key: '1',
    label: '进行中'
  },
  {
    key: '2',
    label: '已完成'
  },
  {
    key: '3',
    label: '已关闭'
  }
]
const subList = [
  {
    key: '1',
    label: '售前阶段'
  },
  {
    key: '2',
    label: '合同阶段'
  },
  {
    key: '3',
    label: '交付阶段'
  },
  {
    key: '4',
    label: '服务阶段'
  },
  {
    key: '5',
    label: '归档阶段'
  }
]

const subTaskTable = []
const columns = [
  {
    title: '任务名称',
    dataIndex: 'taskTitle'
  },
  {
    title: '任务类型',
    dataIndex: 'taskType'
  },
  {
    title: '负责人',
    dataIndex: 'createUser'
  },
  {
    title: '计划工时',
    dataIndex: 'planExpend'
  },
  {
    title: '截至时间',
    dataIndex: 'endTime'
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: s => ((statusList.filter(k => k.key === s))[0] ? (statusList.filter(k => k.key === s))[0].label : '--') 
  }
]

const columns1 = [
  {
    title: '提交时间',
    dataIndex: 'createTime'
  },
  {
    title: '填报工时(h)',
    dataIndex: 'h'
  },
  {
    title: '日志内容',
    dataIndex: 'log'
  },
  {
    title: '提交人',
    dataIndex: 'createUser'
  }
]

class TaskInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      taskId: '',
      taskInfo: {},
      attachmentInfo: {},
      deliverInfo: {},
      visibleEdit: false,
      editStatus: '0',
      visibleWorking: false,
      subTaskTable: {},
      hourTable: {}
    }
  }

  componentDidMount () {
    const { match } = this.props

    this.setState({ taskId: match.params.id }, () => {
      this.getTaskInfo()
    })
  }

  showEdit = (editStatus) => {
    return (e) => {
      this.setState({
        visibleEdit: true,
        editStatus
      })
    }
  }

  getTaskInfo = () => {
    var params = { id: this.state.taskId }

    getTaskInfo(params).then(res => {
      if (res.code === 0) {
        var taskInfo = res.resultMap.data
        this.setState({ taskInfo: taskInfo }, () => {
          this.getAttaList()
          this.getDelList()
          this.getSubTask()
          this.getHourTable()
        })
      }
    })
  }

  handleOkEdit (e) {
    this.setState({
      visibleEdit: false
    })
  }

  handleCancelEdit (e) {
    this.setState({
      visibleEdit: false
    })
  }

  showWorking () {
    this.setState({
      visibleWorking: true
    })
  }

  handleOkWorking (e) {
    this.setState({
      visibleWorking: false
    })
  }

  handleCancelWorking (e) {
    this.setState({
      visibleWorking: false
    })
  }

  getAttaList = () => {
    console.log(this.state.taskInfo.id)
    getAttachmentList({ taskId: this.state.taskInfo.id }).then(res => {
      if (res.code === 0) {
        this.setState({ attachmentInfo: res.resultMap.data })
      }
    })
  }

  getDelList = () => {
    getTaskDeliverList({ taskId: this.state.taskInfo.id }).then(res => {
      if (res.code === 0) {
        this.setState({ deliverInfo: res.resultMap.data })
      }
    })
  }

  getSubTask = () => {
    getTaskDeliverList({ taskId: this.state.taskInfo.id }).then(res => {
      if (res.code === 0) {
        this.setState({ subTaskTable: res.resultMap.data })
      }
    })
  }

  getHourTable = () => {
    getTaskDeliverList({ taskId: this.state.taskInfo.id }).then(res => {
      if (res.code === 0) {
        this.setState({ hourTable: res.resultMap.data })
      }
    })
  }

  del = () => {

  }

  filter = (list, v) => {
    var arr = list.filter(k => k.key === v)
    return arr[0] ? arr[0].label : '--'
  }

  render () {
    const { visibleEdit, editStatus, visibleWorking, taskInfo, attachmentInfo, deliverInfo, subTaskTable, hourTable } = this.state
    const { attList = [] } = attachmentInfo
    const { delList = [] } = deliverInfo
    return (
      <div className="basic-table">
        <PageHeader />
        <div className="title">
          <h2>需求文档编写</h2>
          <div>
            <span className="title-del" onClick={this.del}>删除</span>
            <span className="title-edit" onClick={this.showEdit('0')}>编辑</span>
            <Select defaultValue={taskInfo.status} className="title-select">
              {statusList.map(item => {
                return <Option value={item.key} key={item.key}>{item.label}</Option>
              })}
            </Select>
            <Button onClick={this.showWorking}>填报工时</Button>
          </div>
        </div>
        <div>
          <Row>
            <Col span={12}>
              <div className="info">
                <span>所属项目：</span>
                <Link to={'project/' + taskInfo.projectId}>{taskInfo.projectName}</Link>
              </div>
              <div className="info">
                <span>所属任务：</span>
                <Link to={'task/' + taskInfo.id}>{taskInfo.taskTitle}</Link>
              </div>
              <div className="info">
                <span>所属子阶段：</span>
                <span>{taskInfo.substageTitle || '--'}</span>
              </div>
              <div className="info">
                <span>任务类型：</span>
                <span>{this.filter(tyleList, taskInfo.taskType)}</span>
              </div>
            </Col>
            <Col span={12}>
              <div className="state">
                <div className="state-title">状态</div>
                <div className="state-text">{this.filter(statusList, taskInfo.status)}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div className="info">
                <span>关联收入点：</span>
                <span>{taskInfo.incomeId || '--'}</span>
              </div>
              <div className="info">
                <span>创建人：</span>
                <span>{taskInfo.createUser || '--'}</span>
              </div>
              <div className="info">
                <span>报告人：</span>
                <span>{taskInfo.reportUser || '--'}</span>
              </div>
              <div className="info">
                <span>实际/预计工时(h)：</span>
                <span>{taskInfo.actualExpend || '--'} / {taskInfo.planExpend || '--'}</span>
              </div>
              <div className="info">
                <span>计划开始/计划完成：</span>
                <span>{taskInfo.startTime || '--'} / {taskInfo.endTime || '--'}</span>
              </div>
            </Col>
            <Col span={8}>
              <div className="info">
                <span>关联回款点：</span>
                <span>--</span>
              </div>
              <div className="info">
                <span>创建时间：</span>
                <span>{taskInfo.createTime || '--'}</span>
              </div>
              <div className="info">
                <span>任务负责人：</span>
                <span>{taskInfo.createUser || '--'}</span>
              </div>
              <div className="info">
                <span>实际完成：</span>
                <span>{taskInfo.actualTime || '--'}</span>
              </div>
            </Col>
          </Row>
          <div className="info">
            <span>任务描述：</span>
            <span>{taskInfo.taskDesc || '--'}</span>
          </div>
          <div className="info-list">
            <div className="info-list-title">
              <h2>附件</h2>
            </div>
            <ul className="info-list-content">
              {attList.map(item => {
                return (<li key={item.id}>
                  <span>{item.name}</span>
                  <span className="info-list-download">下载</span>
                </li>)
              })}
            </ul>
          </div>
          <div className="info-list">
            <div className="info-list-title">
              <h2>核心交付物</h2>
            </div>
            <ul className="info-list-content">
              {delList.map(item => {
                return (<li key={item.id}>>
                  <span>{item.name}</span>
                  <div>
                    <span className="info-list-text">未审批</span>
                    <span className="info-list-text">提交人： 张三</span>
                    <span className="info-list-text">提交时间： 2019/07/21 13:12</span>
                    <span className="info-list-download">下载</span>
                  </div>
                </li>)
              })}
            </ul>
          </div>
          <div className="info-list">
            <div className="info-list-title">
              <h2>子任务</h2>
              <span onClick={this.showEdit('1')}>添加子任务</span>
            </div>
            <div className="info-list-table">
              <Table
                rowKey="id"
                dataSource={subTaskTable.list}
                columns={columns}
              />
            </div>
          </div>
          <div className="info-list">
            <div className="info-list-title">
              <h2>交付物</h2>
            </div>
            <ul className="info-list-content">
              <li>
                <span>北京人民银行需求文档模板</span>
                <div>
                  <span className="info-list-text">提交人： 张三</span>
                  <span className="info-list-text">提交时间： 2019/07/21 13:12</span>
                  <span className="info-list-download">下载</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="info-list">
            <div className="info-list-title">
              <h2>工时记录</h2>
            </div>
            <div className="info-list-table">
              <Table
                rowKey="id"
                dataSource={hourTable.list}
                columns={columns1}
              />
            </div>
          </div>
        </div>
        <Modal
          title="新建子任务"
          visible={visibleEdit}
          onOk={this.handleOkEdit}
          onCancel={this.handleCancelEdit}
          className="create-subtask"
        >
          {
            editStatus === '0'
            ? (
              <div className="create-subtask-info">
                <span className="create-subtask-info-required">*</span>
                <span>任务名称：</span>
                <span>需求文档开发</span>
              </div>
            )
            : (
              <div className="create-subtask-info">
                <span className="create-subtask-info-required">*</span>
                <span>任务名称：</span>
                <Input className="create-subtask-info-input" placeholder="任务名称" />
              </div>
            )
          }
          {
            editStatus === '0'
            ? <div className="create-subtask-info">
              <span>子阶段：</span>
              <span>项目开发</span>
            </div>
            : <div className="create-subtask-info">
              <span>所属任务：</span>
              <span>需求文档开发</span>
            </div>
          }
          {/* <div className="create-subtask-info">
            <span>主任务：</span>
            <span>项目开发</span>
          </div> */}
          <Row>
            <Col span={12}>
              <div className="create-subtask-info">
                <span className="create-subtask-info-required">*</span>
                <span>关联回款点：</span>
                <Select className="create-subtask-info-select" defaultValue="lucy">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </div>
            </Col>
            <Col span={12}>
              <div className="create-subtask-info">
                <span className="create-subtask-info-required">*</span>
                <span>关联收入点：</span>
                <Select className="create-subtask-info-select" defaultValue="lucy">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <div className="create-subtask-info">
                <span className="create-subtask-info-required">*</span>
                <span>任务负责人：</span>
                <Select className="create-subtask-info-select" defaultValue="lucy">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </div>
            </Col>
            <Col span={12}>
              <div className="create-subtask-info">
                <span className="create-subtask-info-required">*</span>
                <span>任务类型：</span>
                <Select className="create-subtask-info-select" defaultValue="lucy">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <div className="create-subtask-info">
                <span className="create-subtask-info-required">*</span>
                <span>报告人：</span>
                <Select className="create-subtask-info-select" defaultValue="lucy">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </div>
            </Col>
            <Col span={12}>
              <div className="create-subtask-info">
                <span className="create-subtask-info-required">*</span>
                <span>预计工时(h)：</span>
                <Input className="create-subtask-info-select" placeholder="预计工时" />
              </div>
            </Col>
          </Row>
          <div className="create-subtask-info">
            <span className="create-subtask-info-required">*</span>
            <span>计划开始/计划完成：</span>
            <RangePicker
              defaultValue={[moment('2015/01/01', 'YYYY-MM-DD'), moment('2015/01/01', 'YYYY-MM-DD')]}
              placeholder={[__('form-item-date-start-time'), __('form-item-date-end-tiem')]}
            />
          </div>
          <div className="create-subtask-info">
            <span className="create-subtask-info-required">*</span>
            <span>任务描述：</span>
            <TextArea className="create-subtask-info-textArea" placeholder="任务描述" autoSize />
          </div>
          <div className="create-subtask-list">
            <div className="create-subtask-list-title">
              <h2>核心交付物</h2>
            </div>
            <ul>
              <li>
                <Checkbox>需求文档</Checkbox>
              </li>
            </ul>
          </div>
          <div className="create-subtask-list">
            <div className="create-subtask-list-title">
              <h2>附件</h2>
              <Button type="primary">上传</Button>
            </div>
            <ul className="create-subtask-list-attachment">
              <li>
                <span>需求文档</span>
                <span className="create-subtask-list-del">删除</span>
              </li>
            </ul>
          </div>
        </Modal>
        <Modal
          title="工作日志填报"
          visible={visibleWorking}
          onOk={()=>{this.handleWorking()}}
          onCancel={()=>{this.handleCancelWorking()}}
          className="working-hours"
        >
          <div className="working-hours-info">
            <span>填报日期：</span>
            <DatePicker defaultValue={moment('2015/01/01', 'YYYY-MM-DD')}/>
          </div>
          <div className="working-hours-info">
            <span>填报工时(h)：</span>
            <Input className="working-hours-info-input" placeholder="填报工时" />
          </div>
          <div className="working-hours-info">
            <span>任务描述：</span>
            <TextArea className="working-hours-info-textArea" placeholder="任务描述" autoSize />
          </div>
          <div className="working-hours-list">
            <div className="working-hours-list-title">
              <h2>交付物</h2>
              <Button type="primary">上传</Button>
            </div>
            <ul>
              <li>
                <span>需求文档</span>
                <span className="working-hours-list-del">删除</span>
              </li>
            </ul>
          </div>
        </Modal>
      </div>
    )
  }
}

export default TaskInfo
