import React, { Component } from 'react'
import { Button, Collapse, Modal } from '@uyun/components'
import { getProjectInfo } from '@/services/api'

import PageHeader from '@/components/PageHeader'
import __ from '@uyun/utils/i18n'

import DliveryBudget from './tables/DliveryBudget.js'
import FillBudget from './tables/FillBudget.js'
import MaintenanceBudget from './tables/MaintenanceBudget.js'
import OutsourcingBudget from './tables/OutsourcingBudget.js'
import PreSalesBudget from './tables/PreSalesBudget.js'
import RdBudget from './tables/RdBudget.js'
import SalesBudget from './tables/SalesBudget.js'

import './index.less'

const tabList = {
  'sales-budget': {
    text: __('budget-sales-budget'),
    com: function (isEdit) { return <SalesBudget isEdit={isEdit} /> }
  },
  'pre-sales-budget': {
    text: __('budget-pre-sales-budget'),
    com: function (isEdit) { return <PreSalesBudget isEdit={isEdit} /> }
  },
  'rd-budget': {
    text: __('budget-rd-budget'),
    com: function (isEdit) { return <RdBudget isEdit={isEdit} /> }
  },
  'dlivery-budget': {
    text: __('budget-dlivery-budget'),
    com: function (isEdit) { return <DliveryBudget isEdit={isEdit} /> }
  },
  'maintenance-budget': {
    text: __('budget-maintenance-budget'),
    com: function (isEdit) { return <MaintenanceBudget isEdit={isEdit} /> }
  },
  'outsourcing-budget': {
    text: __('budget-outsourcing-budget'),
    com: function (isEdit) { return <OutsourcingBudget isEdit={isEdit} /> }
  },
  'fill-budget': {
    text: __('budget-external-procurement'),
    com: function (isEdit) { return <FillBudget isEdit={isEdit} /> }
  }
}
const defaultActiveKey = [
  'sales-budget', 'pre-sales-budget', 'rd-budget', 'dlivery-budget',
  'maintenance-budget', 'outsourcing-budget', 'fill-budget'
]

class Budget extends Component {
  constructor (props) {
    super(props)
    this.state = {
      projectInfo: {},
      projectId: '',
      modelName: 'sales-budget',
      num: '',
      edit: false,
      visible: false
    }
  }

  componentDidMount () {
    const { match } = this.props

    this.setState({ projectId: match.params.id }, () => {
      this.getInfo()
    })
  }

  getInfo () {
    var params = { projectId: this.state.projectId }

    getProjectInfo(params).then(res => {
      if (res.code === 0) {
        var projectInfo = res.resultMap.data
        projectInfo.id = '0243b6cec5db41adad9bebae3fee81f7'
        projectInfo.stageId = 1
        this.setState({ projectInfo: projectInfo, num: this.num(projectInfo) })
      }
    })
  }

  onClose = () => {
    this.setState({ visible: false })
  }

  onOpen = (name, edit) => {
    return () => {
      this.setState({ modelName: name, edit: edit, visible: true })
    }
  }

  num = (projectInfo) => {
    let str = ''
    let strs = projectInfo.contractTime.split('-')

    str += strs[0].substring(strs[0].length - 2, strs[0].length) + strs[1] + strs[2]
    return str
  }

  render () {
    const { visible, modelName, projectInfo, num } = this.state

    return (
      <div className="basic-Budget">
        <PageHeader />

        <p>{__('budget-title')}: &nbsp; {projectInfo.projectName}_{num}_{projectInfo.budget}</p>
        <p>{__('budget-project-number')}: &nbsp; {projectInfo.projectCode}</p>
        <p style={{ paddingBottom: 50 }}>{__('budget-project-name')}: &nbsp; {projectInfo.projectName}</p>

        <h2>{__('budget-total-budgeted')}:</h2>

        <Collapse defaultActiveKey={defaultActiveKey}>
          <Collapse.Card
            header={__('budget-sales-budget')}
            key="sales-budget"
          >
            {projectInfo.is
              ? (<Button onClick={this.onOpen('sales-budget', true)} type="primary">{__('budget-fill-budget')}</Button>)
              : (<Button onClick={this.onOpen('sales-budget', false)} type="primary">{__('budget-check-details')}</Button>)}
          </Collapse.Card>
          <Collapse.Card
            header={__('budget-pre-sales-budget')}
            key="pre-sales-budget"
          >
            {projectInfo.is
              ? (<Button onClick={this.onOpen('pre-sales-budget', true)} type="primary">{__('budget-fill-budget')}</Button>)
              : (<Button onClick={this.onOpen('pre-sales-budget', false)} type="primary">{__('budget-check-details')}</Button>)}
          </Collapse.Card>
          <Collapse.Card
            header={__('budget-rd-budget')}
            key="rd-budget"
          >
            {projectInfo.is
              ? (<Button onClick={this.onOpen('rd-budget', true)} type="primary">{__('budget-fill-budget')}</Button>)
              : (<Button onClick={this.onOpen('rd-budget', false)} type="primary">{__('budget-check-details')}</Button>)}
          </Collapse.Card>
          <Collapse.Card
            header={__('budget-dlivery-budget')}
            key="dlivery-budget"
          >
            {projectInfo.is
              ? (<Button onClick={this.onOpen('dlivery-budget', true)} type="primary">{__('budget-fill-budget')}</Button>)
              : (<Button onClick={this.onOpen('dlivery-budget', false)} type="primary">{__('budget-check-details')}</Button>)}
          </Collapse.Card>
          <Collapse.Card
            header={__('budget-maintenance-budget')}
            key="maintenance-budget"
          >
            {projectInfo.is
              ? (<Button onClick={this.onOpen('maintenance-budget', true)} type="primary">{__('budget-fill-budget')}</Button>)
              : (<Button onClick={this.onOpen('maintenance-budget', false)} type="primary">{__('budget-check-details')}</Button>)}
          </Collapse.Card>
          <Collapse.Card
            header={__('budget-outsourcing-budget')}
            key="outsourcing-budget"
          >
            {projectInfo.is
              ? (<Button onClick={this.onOpen('outsourcing-budget', true)} type="primary">{__('budget-fill-budget')}</Button>)
              : (<Button onClick={this.onOpen('outsourcing-budget', false)} type="primary">{__('budget-check-details')}</Button>)}
          </Collapse.Card>
          <Collapse.Card
            header={__('budget-external-procurement')}
            key="fill-budget"
          >
            {projectInfo.is
              ? (<Button onClick={this.onOpen('fill-budget', true)} type="primary">{__('budget-fill-budget')}</Button>)
              : (<Button onClick={this.onOpen('fill-budget', false)} type="primary">{__('budget-check-details')}</Button>)}
          </Collapse.Card>
        </Collapse>

        <Modal
          title={tabList[modelName].text}
          visible={visible}
          onOk={this.save}
          onCancel={this.onClose}
        >
          {tabList[modelName].com(this.state.edit)}
        </Modal>
      </div>
    )
  }
}

export default Budget
