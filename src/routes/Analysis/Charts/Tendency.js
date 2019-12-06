import React, { Component } from 'react'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/legend'

import __ from '@uyun/utils/i18n'

@inject('globalStore', 'analysisStore')
@observer
class Tendency extends Component {
  getOption = data => {
    const { theme } = this.props.globalStore

    data.legend = [__('analysis-tendency-created'), __('analysis-tendency-done'), __('analysis-tendency-overdue')]

    return {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '40',
        containLabel: true
      },
      legend: {
        data: data.legend,
        left: 0,
        textStyle: {
          color: theme === 'white' ? '#828B99' : '#FFFFFF'
        }
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: data.time,
          axisLine: {
            lineStyle: {
              color: theme === 'white' ? '#828B99' : '#FFFFFF'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: theme === 'white' ? '#828B99' : '#FFFFFF'
            }
          }
        }
      ],
      color: ['#4ABAFD', '#30D85C', '#EC4E53'],
      series: [
        {
          name: data.legend[0],
          type: 'line',
          symbol: 'circle',
          smooth: true,
          areaStyle: {
            normal: {
              color: '#4ABAFD',
              opacity: 0.3
            }
          },
          data: data.total_count
        },
        {
          name: data.legend[1],
          type: 'line',
          symbol: 'circle',
          smooth: true,
          areaStyle: {
            normal: {
              color: '#30D85C',
              opacity: 0.3
            }
          },
          data: data.finish_count
        },
        {
          name: data.legend[2],
          type: 'line',
          symbol: 'none',
          smooth: true,
          areaStyle: {
            normal: {
              color: '#EC4E53',
              opacity: 0.3
            }
          },
          data: data.overdue_count
        }
      ]
    }
  }

  componentDidMount () {
    this.props.analysisStore.getTendency()
  }

  render () {
    const { analysisStore } = this.props

    return (
      <div className="tendency-chart">
        <ReactEchartsCore
          echarts={echarts}
          option={this.getOption(toJS(analysisStore.tendency))}
          style={{
            height: 280
          }}
        />
      </div>
    )
  }
}

export default Tendency
