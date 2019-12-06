import React, { Component } from 'react'
import { Select, Row, Col } from '@uyun/components'

import Acceptance from './Acceptance/index'
import Objective from './Objective/index'

import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/legend'

import __ from '@uyun/utils/i18n'

import './index.less'

const { Option } = Select

const typeList = [
  {
    key: 'department',
    label: __('delivery-department')
  },
  {
    key: 'business-a',
    label: __('delivery-business-a')
  },
  {
    key: 'business-2',
    label: __('delivery-business-2')
  },
  {
    key: 'three-business',
    label: __('delivery-three-business')
  }
]

class Delivery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: typeList[0].label
    }
  }

  render () {
    return (
      <div className="basic-delivery">
        <header>
          <Select value={this.state.type}>
            {typeList.map(item => {
              return <Option key={item.key} value={item.key}>{item.label}</Option>
            })}
          </Select>
        </header>
        <Row>
          <Col span={10}>
            <Objective />
          </Col>
          <Col span={14}>
            <Acceptance />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Delivery
