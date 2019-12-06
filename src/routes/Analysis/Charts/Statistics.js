import React, { Component } from 'react'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'

import __ from '@uyun/utils/i18n'

const statisticsTypeMap = [
  __('analysis-statistics-type-event'),
  __('analysis-statistics-type-other')
]

@inject('analysisStore')
@observer
class Statistics extends Component {
  getOption = data => {
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      color: ['#4abafd', '#30D85C', '#f99c05', '#e2bd1b', '#6b2dda', '#9ea0b6'],
      series: [
        {
          name: __('analysis-statistics-model'),
          type: 'pie',
          center: ['50%', '55%'],
          radius: ['0%', '60%'],
          data: data.map(datum => ({
            value: datum.count,
            name: statisticsTypeMap[datum.name]
          })),
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    return option
  }

  componentDidMount () {
    this.props.analysisStore.getStatistics()
  }

  render () {
    const { analysisStore } = this.props

    return (
      <div className="statistics-chart">
        <ReactEchartsCore
          echarts={echarts}
          option={this.getOption(toJS(analysisStore.statistics))}
          style={{
            height: 280
          }}
        />
      </div>
    )
  }
}

export default Statistics
