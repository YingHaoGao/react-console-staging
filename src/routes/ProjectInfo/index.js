import React, { Component } from 'react'
import { Button, Row, Col, Tabs, Modal } from '@uyun/components'
import { getProjectInfo } from '@/services/api'

import PageHeader from '@/components/PageHeader'
import __ from '@uyun/utils/i18n'

import Card from './Card'
import Information from './Information/index'
import PreSales from './PreSales/index'
import Contract from './Contract/index'
import Transition from './Transition/index'

import AddSubphase from './Model/AddSubphase'
import PostProject from './Model/PostProject'
import AssignManager from './Model/AssignManager'

import './index.less'

const TabPane = Tabs.TabPane

const tabList = [
  {
    key: 'Information',
    name: __('project-tab-information')
  },
  {
    key: 'PreSales',
    name: __('project-tab-preSales')
  },
  {
    key: 'Contract',
    name: __('project-tab-contract')
  },
  {
    key: 'Transition',
    name: __('project-tab-transition')
  }
]
const comObj = {
  Information () {
    return <Information />
  },
  PreSales () {
    return <PreSales />
  },
  Contract () {
    return <Contract />
  },
  Transition (info) {
    return <Transition projectInfo={info} />
  },
  AddSubphase (onClose, onRef, info) {
    return <AddSubphase onClose={onClose} onRef={onRef} projectInfo={info} />
  },
  PostProject (onClose, onRef, info) {
    return <PostProject onClose={onClose} onRef={onRef} projectInfo={info} />
  },
  AssignManager (onClose, onRef, info) {
    return <AssignManager onClose={onClose} onRef={onRef} projectInfo={info} />
  }
}

var child = {}

class ProjectInfo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      projectId: '',
      visible: false,
      modelName: 'AddSubphase',
      modelTitle: '',
      projectInfo: {},
      tabKey: tabList[0].key
    }
    this.onClose = this.onClose.bind(this)
  }

  componentDidMount () {
    const { match } = this.props

    this.setState({ projectId: match.params.id }, () => {
      this.getTableData()
    })
  }

  getTableData () {
    var params = { projectId: this.state.projectId }

    getProjectInfo(params).then(res => {
      if (res.code === 0) {
        var projectInfo = res.resultMap.data
        projectInfo.id = '0243b6cec5db41adad9bebae3fee81f7'
        projectInfo.stageId = 1
        this.setState({ projectInfo: projectInfo })
      }
    })
  }

  tabChange (k) {
    
  }

  returnCom (k) {
    return comObj[k]
  }

  togModel = (tag, title) => {
    return (e) => {
      this.setState({ modelName: tag, modelTitle: title })
      this.onOpen()
    }
  }

  onClose = () => {
    this.setState({ visible: false })
  }

  onOpen = () => {
    this.setState({ visible: true })
  }

  onRef (ref) {
    child = ref
  }

  save () {
    child.save()
  }

  render () {
    const { tabKey, modelName, projectInfo, visible, modelTitle } = this.state

    return (
      <div className="basic-projectInfo">
        <PageHeader />

        <Row>
          <Col span={20}>
            <header>
              <div className="buttonBox">
                <Button onClick={this.togModel('AddSubphase', __('button-add') + __('name-subphase'))}>{__('button-add') + __('name-subphase')}</Button>
                <Button onClick={this.togModel('PostProject', __('button-post-project'))}>{__('button-post-project')}</Button>
                <Button onClick={this.togModel('AssignManager', __('button-designate-manager'))}>{__('button-designate-manager')}</Button>
              </div>
              <Card info={projectInfo} />
            </header>
            <Tabs defaultActiveKey={tabKey} onChange={this.tabChange}>
              {tabList.map((item, i) => {
                return (
                  <TabPane tab={item.name} key={item.key}>
                    {this.returnCom(item.key)(projectInfo)}
                  </TabPane>
                )
              })}
            </Tabs>
          </Col>
        </Row>

        <Modal
          destroyOnClose={true}
          title={modelTitle}
          visible={visible}
          onOk={this.save}
          onCancel={this.onClose}
        >{this.returnCom(modelName)(this.onClose, this.onRef, projectInfo)}</Modal>
      </div>
    )
  }
}

export default ProjectInfo
