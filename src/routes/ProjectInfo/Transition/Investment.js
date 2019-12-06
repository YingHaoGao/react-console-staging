import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col } from '@uyun/components'

import __ from '@uyun/utils/i18n'

import './Investment.less'

const ButtonGroup = Button.Group

const columns = [{
  title: __('investment-employee-ID'),
  dataIndex: 'name',
  key: 'ID'
}, {
  title: __('investment-name'),
  dataIndex: 'age',
  key: 'name',
  width: '12%'
}, {
  title: __('investment-station'),
  dataIndex: 'age',
  key: 'station',
  width: '12%'
}, {
  title: __('investment-level'),
  dataIndex: 'age',
  key: 'level',
  width: '12%'
}, {
  title: __('investment-working-hours'),
  dataIndex: 'age',
  key: 'hours',
  width: '12%'
}]

const data = [{
  key: 1,
  name: 'John Brown sr.',
  age: 60,
  address: 'New York No. 1 Lake Park',
  children: [{
    key: 11,
    name: 'John Brown',
    age: 42,
    address: 'New York No. 2 Lake Park'
  }, {
    key: 12,
    name: 'John Brown jr.',
    age: 30,
    address: 'New York No. 3 Lake Park',
    children: [{
      key: 121,
      name: 'Jimmy Brown',
      age: 16,
      address: 'New York No. 3 Lake Park'
    }]
  }, {
    key: 13,
    name: 'Jim Green sr.',
    age: 72,
    address: 'London No. 1 Lake Park',
    children: [{
      key: 131,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 2 Lake Park',
      children: [{
        key: 1311,
        name: 'Jim Green jr.',
        age: 25,
        address: 'London No. 3 Lake Park',
      }, {
        key: 1312,
        name: 'Jimmy Green sr.',
        age: 18,
        address: 'London No. 4 Lake Park',
      }],
    }],
  }]
}, {
  key: 2,
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park'
}]

class Investment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      
    }
  }

  ifDis (key) {
    return true
  }

  render () {
    const { projectInfo } = this.props

    return (
      <div className="basic-table">
        <div className="buttonBox">
          <Button type="primary">
            <Link to={'/budget/' + projectInfo.id}>{__('investment-supplementary-budget')}</Link>
          </Button>
        </div>
        <div className="bodyer">
          <Row>
            <Col span={20}>
              <Row>
                <Col span={8}>
                  <span name="name">{__('investment-expected-manpower-input')}&nbsp;:&nbsp;</span>
                  <span name="value">{projectInfo.name}</span>
                </Col>
                <Col span={8}>
                  <span name="name">{__('investment-actual-labor-input')}&nbsp;:&nbsp;</span>
                  <span name="value">{projectInfo.name}</span>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <span name="name">{__('investment-expected-travel-budget')}&nbsp;:&nbsp;</span>
                  <span name="value">{projectInfo.name}</span>
                </Col>
                <Col span={8}>
                  <span name="name">{__('investment-actual-margin-budget')}&nbsp;:&nbsp;</span>
                  <span name="value">{projectInfo.name}</span>
                </Col>
                <Col span={8}>
                  <span name="name">{__('investment-total-shift')}&nbsp;:&nbsp;</span>
                  <span name="value">{projectInfo.name}</span>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <span name="name">{__('investment-total-number-employees')}&nbsp;:&nbsp;</span>
                  <span name="value">{projectInfo.name}</span>
                </Col>
                <Col span={8}>
                  <span name="name">{__('investment-total-project-hours')}&nbsp;:&nbsp;</span>
                  <span name="value">{projectInfo.name}</span>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Table columns={columns} pagination={false} dataSource={data} />
      </div>
    )
  }
}

export default Investment
