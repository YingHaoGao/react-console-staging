import __ from '@uyun/utils/i18n'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Card } from '@uyun/components'

import './Card.less'

@inject('backlogStore')
@observer
export default class UserCard extends Component {
  componentDidMount () {
    this.props.backlogStore.getUser()
  }

  render () {
    const { backlogStore, total, num } = this.props
    const { user = {} } = backlogStore
    const title = __('backlog-card-gm') +
              ',' +
              user.name +
              ',' +
              __('backlog-card-wyhed') +
              '!'

    return (
      <div className="cardUser">
        <Card>
          <div className="title">{title}</div>
          <div className="info">
            {user.jobName}
            <span>|</span>
            {user.groupName}
            <span>-</span>
            {user.organizeName}
          </div>
          <div className="numBox">
            <p>{__('backlog-card-backlog')}</p>
            <p><span className="num">{num}</span><span className="total">/ {total}</span></p>
          </div>
        </Card>
      </div>
    )
  }
}
