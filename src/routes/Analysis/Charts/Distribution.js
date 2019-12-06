import React, { Component } from 'react'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/legend'
import __ from '@uyun/utils/i18n'

@inject('globalStore', 'analysisStore')
@observer
class Distribution extends Component {
  state = {
    theme: 'blue'
  }

  getOption = data => {
    const { theme } = this.props.globalStore

    data.legend = [
      __('analysis-distribution-added'),
      __('analysis-distribution-done'),
      __('analysis-distribution-overdue'),
      __('analysis-distribution-resolution')
    ]

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '40',
        containLabel: true
      },
      legend: [{
        data: [data.legend[2], data.legend[0]],
        left: 0,
        top: 0,
        textStyle: {
          color: theme === 'white' ? '#828B99' : '#FFFFFF'
        }
      }, {
        data: [data.legend[1], data.legend[3]],
        top: 20,
        left: 0,
        textStyle: {
          color: theme === 'white' ? '#828B99' : '#FFFFFF'
        }
      }],
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
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
        },
        {
          name: __('analysis-distribution-resolution') + '(%)',
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
      color: ['#EC4E53', '#FDD74A', '#30D85C', '#4ABAFD'],
      series: [
        {
          name: data.legend[2],
          type: 'bar',
          data: data.overdue_count
        },
        {
          name: data.legend[0],
          type: 'bar',
          data: data.today_create_count
        },
        {
          name: data.legend[1],
          type: 'bar',
          data: data.today_finish_count
        },
        {
          name: data.legend[3],
          type: 'line',
          symbol: 'none',
          smooth: true,
          yAxisIndex: 1,
          data: data.resolution_rate
        }
      ]
    }
  }

  componentDidMount () {
    this.props.analysisStore.getDistribution()
  }

  render () {
    const { analysisStore } = this.props

    return (
      <div className="distribution-chart">
        <ReactEchartsCore
          echarts={echarts}
          option={this.getOption(toJS(analysisStore.distribution))}
          style={{
            height: 280
          }}
        />
      </div>
    )
  }
}

export default Distribution
