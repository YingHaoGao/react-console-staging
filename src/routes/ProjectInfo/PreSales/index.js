import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { Anchor, Button, Row, Col, Card, Tabs } from '@uyun/components'
import moment from 'moment'
import { postProjects } from '@/services/api'

import PageHeader from '@/components/PageHeader'
import __ from '@uyun/utils/i18n'

import './index.less'

class ProjectInfo extends Component {
  render () {
    return (
      <div className="basic-projectInfo">
      
      </div>
    )
  }
}

export default ProjectInfo
