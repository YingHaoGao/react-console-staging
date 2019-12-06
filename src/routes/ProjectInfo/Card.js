import __ from '@uyun/utils/i18n'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Card } from '@uyun/components'

import './Card.less'

export default class ProjectCard extends Component {
  render () {
    const { info } = this.props

    return (
      <Card>
        <div className="title">{info.projectName}</div>
        <div className="code">{info.projectCode}</div>
        <div className="info">
          <div className="stage">{__('project-tab-projectStage')}: <span>{info.projectStage}</span></div>
          <div className="manageUser">{__('project-tab-manageUser')}: <span>{info.manageUser}</span></div>
          <div className="createTime">{__('project-tab-createTime')}: <span>{info.createTime}</span></div>
        </div>
      </Card>
    )
  }
}
