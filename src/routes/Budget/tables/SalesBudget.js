import React, { Component } from 'react'
import { Button, Input } from '@uyun/components'

import __ from '@uyun/utils/i18n'

import './index.less'

class SalesBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    const info = { name: 'a' }
    const { isEdit } = this.props

    return (
      <div className="tableBox">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>{__('budget-table-quantity')}</th>
              <th>{__('budget-table-price')}</th>
              <th>{__('budget-table-money')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="borR" rowSpan="2">{__('budget-sales-budget')}</td>
              <td className="borD">
                <div>{__('budget-entertainment-expense')}</div>
                {isEdit ? (<Input />) : (info.name)}
              </td>
              <td className="borD">
                {isEdit ? (<Input />) : (info.name)}
              </td>
              <td className="borD">{info.name}</td>
            </tr>
            <tr>
              <td>
                <div>{__('budget-staff-gifts')}</div>
                {isEdit ? (<Input />) : (info.name)}
              </td>
              <td>
                {isEdit ? (<Input />) : (info.name)}
              </td>
              <td>{info.name}</td>
            </tr>
          </tbody>
        </table><table>
          <thead>
            <tr>
              <th></th>
              <th>{__('budget-table-quantity')}</th>
              <th>{__('budget-table-price')}</th>
              <th>{__('budget-table-money')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="borR" rowSpan="4">{__('budget-sales-budget')}</td>
              <td className="borD">
                <div>{__('budget-car-fare')}</div>
                {isEdit ? (<Input />) : (info.name)}
              </td>
              <td className="borD">
                {isEdit ? (<Input />) : (info.name)}
              </td>
              <td className="borD">{info.name}</td>
            </tr>
            <tr>
              <td className="borD">
                <div>{__('budget-hotel-expense')}</div>
                {isEdit ? (<Input />) : (info.name)}
              </td>
              <td className="borD">
                {isEdit ? (<Input />) : (info.name)}
              </td>
              <td className="borD">{info.name}</td>
            </tr>
            <tr>
              <td className="borD">
                <div>{__('budget-subsidies')}</div>
                {isEdit ? (<Input />) : (info.name)}
              </td>
              <td className="borD">
                {isEdit ? (<Input />) : (info.name)}
              </td>
              <td className="borD">{info.name}</td>
            </tr>
            <tr>
              <td className="borD">
                <div>{__('budget-other-expenses')}</div>
                {isEdit ? (<Input />) : (info.name)}
              </td>
              <td className="borD">
                {isEdit ? (<Input />) : (info.name)}
              </td>
              <td className="borD">{info.name}</td>
            </tr>
          </tbody>
        </table>
        <h2>{__('budget-total-sales-input')}:&ensp;{info.name}</h2>
      </div>
    )
  }
}

export default SalesBox
