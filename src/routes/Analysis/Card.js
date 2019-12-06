import React, { Component } from 'react'
import { Icon, Card } from '@uyun/components'

import './Card.less'

class AnalysisCard extends Component {
  render () {
    const { background, icon, title, value } = this.props

    return (
      <Card className="analysis-card" bordered={false}>
        <div className="analysis-card-icon" style={{ background }}>
          <Icon type={icon} />
        </div>

        <div className="analysis-card-content">
          <div className="analysis-card-title">{title}</div>
          <div className="analysis-card-value">{value}</div>
        </div>
      </Card>
    )
  }
}

export default AnalysisCard
