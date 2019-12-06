import React, { Component } from 'react'
import { Button, Progress, Modal, InputNumber } from '@uyun/components'

import __ from '@uyun/utils/i18n'

import './index.less'

const ButtonGroup = Button.Group

class Objective extends Component {
  constructor (props) {
    super(props)
    this.state = {
      maxLeft: { left: '50%' },
      visible: false,
      target: 0
    }
  }

  save = () => {

  }

  onClose = () => {
    this.setState({ visible: false })
  }

  open = () => {
    this.setState({ visible: true })
  }

  targetInput = (val) => {
    this.setState({ target: val })
  }

  render () {
    const { maxLeft, visible } = this.state

    return (
      <div className="basic-objective">
        <header>
          <span className="title">{__('objective-annual-performance')}</span>
          <span className="btnEdit">
            <ButtonGroup type="link" onClick={this.open}><a>{__('button-edit')}</a></ButtonGroup>
          </span>
        </header>
        <div className="slider bor">
          <div className="item pad0">
            <span>{__('objective-confirmed-amount')}</span>
            <span className="black">{}W</span>
            <span className="aboustR">{__('objective-not-set')}</span>
          </div>
          <div className="progressBox">
            <div className="prog">
              <Progress percent={30} showInfo={false} />
            </div>
            <div className="goal" style={maxLeft}></div>
          </div>
        </div>
        <div className="item bor">
          <span>{__('objective-project-progress')}</span>
          <span className="aboustR">{}W</span>
        </div>
        <div className="item">
          <span>{__('objective-performance-amount')}</span>
          <span className="aboustR">{}W</span>
        </div>
        <Modal
          title={__('objective-edito')}
          className="objectiveMode"
          width="300px"
          visible={visible}
          onOk={this.save}
          onCancel={this.onClose}
          destroyOnClose={true}
        >
          <span>{__('objective-target')}(万): </span>
          <InputNumber className="target" onChange={this.targetInput} />
        </Modal>
      </div>
    )
  }
}

export default Objective
