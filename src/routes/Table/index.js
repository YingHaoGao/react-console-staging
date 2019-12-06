import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Table, Badge, Button } from '@uyun/components'
import moment from 'moment'

import PageHeader from '@/components/PageHeader'
import __ from '@uyun/utils/i18n'

import './index.less'

const execTypeMap = [
  __('table-execute-auto'),
  __('table-execute-manual'),
  __('table-execute-automatic')
]
const statusMap = ['default', 'processing', 'success']
const statusTextMap = [
  __('table-status-pending'),
  __('table-status-running'),
  __('table-status-success')
]

const columns = [
  {
    title: __('table-column-name'),
    dataIndex: 'name',
    render: name => <Link to="/">{name}</Link>
  },
  {
    title: __('table-column-user'),
    dataIndex: 'user',
    render: user => {
      const userMap = {
        1: user.realname,
        2: __('table-user-system'),
        3: __('table-user-deleted'),
        4: '--'
      }

      return userMap[user.userBelongType]
    }
  },
  {
    title: __('table-column-exec-type'),
    dataIndex: 'execType',
    render: execType => execTypeMap[execType]
  },
  {
    title: __('table-column-start-time'),
    dataIndex: 'startTime',
    render: startTime => startTime && moment(startTime).format()
  },
  {
    title: __('table-column-end-time'),
    dataIndex: 'endTime',
    render: endTime => endTime && moment(endTime).format()
  },
  {
    title: __('table-column-exec-duration'),
    dataIndex: 'execDuration',
    render: execDuration => `${Math.round(execDuration / 1000)}s`
  },
  {
    title: __('table-column-status'),
    dataIndex: 'status',
    render: status => <Badge status={statusMap[status]} text={statusTextMap[status]} />
  },
  {
    title: __('table-column-handle'),
    render: (text, record) => (
      <Row>
        <Col span={12}>
          <Button type="danger">{__('table-column-handle-delete')}</Button>
        </Col>
        {record.status !== 2 && (
          <Col span={12}>
            <Button type="primary">{__('table-column-handle-stop')}</Button>
          </Col>
        )}
      </Row>
    )
  }
]

@inject('tableStore')
@observer
class BasicTable extends Component {
  componentDidMount () {
    this.props.tableStore.getTable()
  }

  render () {
    const { tableStore } = this.props

    return (
      <div className="basic-table">
        <PageHeader />

        <Card
          bordered={false}
          style={{ marginTop: 16 }}
        >
          <Table
            rowKey="id"
            dataSource={tableStore.data.toJS()}
            columns={columns}
          />
        </Card>
      </div>
    )
  }
}

export default BasicTable
