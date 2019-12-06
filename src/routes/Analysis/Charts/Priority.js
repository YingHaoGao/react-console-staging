import React, { Component } from 'react'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'

import __ from '@uyun/utils/i18n'

const PieColorValueMap = [
  '',
  '#4ABAFD',
  '#30D85C',
  '#FDD74A',
  '#F99C05',
  '#EC4E53'
]

@inject('globalStore', 'analysisStore')
@observer
class Priority extends Component {
  getOption = data => {
    const { theme } = this.props.globalStore

    const option = {
      title: {
        text: data.reduce((sum, datum) => sum + datum.num, 0),
        textStyle: {
          fontSize: 24,
          color: theme === 'white' ? '#4C5159' : '#FFFFFF'
        },
        subtext: __('analysis-priority-pending'),
        subtextStyle: {
          color: theme === 'white' ? '#828B99' : '#6CA4CD'
        },
        x: 'center',
        y: '44%'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: __('analysis-priority-priority'),
          type: 'pie',
          radius: ['55%', '70%'],
          center: ['50%', '50%'],
          data: data.map(datum => ({
            value: datum.num,
            name: datum.urgent_level,
            itemStyle: {
              normal: {
                color: PieColorValueMap[+datum.value]
              }
            }
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
    this.props.analysisStore.getPriority()
  }

  render () {
    const { analysisStore } = this.props

    return (
      <div className="priority-chart">
        <ReactEchartsCore
          echarts={echarts}
          option={this.getOption(toJS(analysisStore.priority))}
          style={{
            height: 280
          }}
        />
      </div>
    )
  }
}

export default Priority
