import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col } from '@uyun/components'

import PageHeader from '@/components/PageHeader'
import __ from '@uyun/utils/i18n'

import AnalysisCard from './Card'
import AnalysisChartCard from './ChartCard'
import TendencyChart from './Charts/Tendency'
import PriorityChart from './Charts/Priority'
import DistributionChart from './Charts/Distribution'
import StatisticsChart from './Charts/Statistics'

import './index.less'

const topColResponsive = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 6,
  xl: 6
}

const chartColResponsive = {
  xs: 24,
  sm: 18,
  md: 18,
  lg: 18,
  xl: 18
}

const chartSubColResponsive = {
  xs: 24,
  sm: 6,
  md: 6,
  lg: 6,
  xl: 6
}

@inject('analysisStore')
@observer
class Analysis extends Component {
  componentDidMount () {
    // this.props.analysisStore.getCount()
  }

  render () {
    const { analysisStore } = this.props

    return (
      <div className="analysis">
        <PageHeader />

        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col {...topColResponsive}>
            <AnalysisCard
              background="#fed62d"
              icon="area-chart"
              title={__('analysis-count-new')}
              value={analysisStore.count.new}
            />
          </Col>

          <Col {...topColResponsive}>
            <AnalysisCard
              background="#4abafd"
              icon="clock-circle-o"
              title={__('analysis-count-pending')}
              value={analysisStore.count.pending}
            />
          </Col>

          <Col {...topColResponsive}>
            <AnalysisCard
              background="#ec4e53"
              icon="clock-circle"
              title={__('analysis-count-overdue')}
              value={analysisStore.count.overdue}
            />
          </Col>

          <Col {...topColResponsive}>
            <AnalysisCard
              background="#30d85c"
              icon="check-circle-o"
              title={__('analysis-count-resolution')}
              value={`${analysisStore.count.resolution}%`}
            />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col {...chartColResponsive}>
            <AnalysisChartCard title={__('analysis-tendency-title')}>
              <TendencyChart />
            </AnalysisChartCard>
          </Col>

          <Col {...chartSubColResponsive}>
            <AnalysisChartCard title={__('analysis-priority-title')}>
              <PriorityChart />
            </AnalysisChartCard>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col {...chartColResponsive}>
            <AnalysisChartCard title={__('analysis-distribution-title')}>
              <DistributionChart />
            </AnalysisChartCard>
          </Col>

          <Col {...chartSubColResponsive}>
            <AnalysisChartCard title={__('analysis-statistics-title')}>
              <StatisticsChart />
            </AnalysisChartCard>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Analysis
