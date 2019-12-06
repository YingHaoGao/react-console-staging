import React, { Component } from 'react'
import { Anchor, Collapse } from '@uyun/components'
import { postProjects } from '@/services/api'

import __ from '@uyun/utils/i18n'

import StageTask from './StageTask'
import Investment from './Investment'
import Deliverables from './Deliverables'
import Member from './Member'

import './index.less'

const { Link } = Anchor

const anchorList = [
  {
    key: 'transition-anchor-stage-task',
    commt: function (info) { return <StageTask projectInfo={info} /> },
    child: []
  },
  {
    key: 'transition-anchor-personnel-investment',
    commt: function (info) { return <Investment projectInfo={info} /> },
    child: []
  },
  {
    key: 'transition-anchor-core-deliverables',
    commt: function (info) { return <Deliverables projectInfo={info} /> },
    child: []
  },
  {
    key: 'transition-anchor-project-member',
    commt: function (info) { return <Member projectInfo={info} /> },
    child: []
  }
  // {
  //   key: 'transition-anchor-approval-history',
  //   commt: function (info) { return <History info={info}/> },
  //   child: []
  // }
]

class Transition extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  delHref () {
    var href = location.hash.match(/^#[^#]+#/g)
    if (href) {
      return href[0].slice(0, href[0].length - 1)
    } else {
      return location.hash
    }
  }

  getActiveKey () {
    return anchorList.map(item => item.key)
  }

  addTable (item) {
    if (item.child.length > 0) {
      item.child.map(_item => {
        return item.commt(_item)
      })
    } else {
      console.log(item)
      return item.commt
    }
  }

  render () {
    const { projectInfo } = this.props
    var hash = this.delHref()

    return (
      <div className="basic-transition">
        <Collapse defaultActiveKey={this.getActiveKey()}>
          {anchorList.map(item => {
            return (
              <Collapse.Card
                header={__(item.key)}
                key={item.key}
                showArrow={false}
                extra={
                  <span id={item.key}></span>
                }
              >
                {item.commt(projectInfo)}
              </Collapse.Card>
            )
          })}
        </Collapse>
        <div className="anchorBottom">
          <Anchor affix={false} showInkInFixed={true} offsetTop={100} offsetBottom={100}>
            {anchorList.map(item => {
              return (
                <Link key={item.key} href={hash + '#' + item.key} title={__(item.key)}>
                  {item.child.map(_item => {
                    return <Link key={_item.key} href={hash + '#' + _item.key} title={__(_item.key)} />
                  })}
                </Link>
              )
            })}
          </Anchor>
        </div>
      </div>
    )
  }
}

export default Transition
