import React, { Component } from 'react'
import { Form, Input, DatePicker, InputNumber, Radio, Button } from '@uyun/components'

import PageHeader from '@/components/PageHeader'
import __ from '@uyun/utils/i18n'
import { postForm } from '@/services/api'

import './index.less'

const FormItem = Form.Item
const { RangePicker } = DatePicker
const { TextArea } = Input
const RadioGroup = Radio.Group

@Form.create()
class BasicForm extends Component {
  handleSubmit = e => {
    e.preventDefault()

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        postForm(values).then(res => {
          this.props.history.push('/')
        })
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 }
      }
    }

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 4 }
      }
    }

    return (
      <div className="form">
        <PageHeader />

        <Form hideRequiredMark onSubmit={this.handleSubmit}>
          <div className="form-title">{__('form-title')}</div>

          <FormItem {...formItemLayout} label={__('form-item-title')}>
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: __('form-item-title-message')
                }
              ]
            })(<Input placeholder={__('form-item-title-placeholder')} />)}
          </FormItem>
          <FormItem {...formItemLayout} label={__('form-item-date')}>
            {getFieldDecorator('date', {
              rules: [
                {
                  required: true,
                  message: __('form-item-date-message')
                }
              ]
            })(
              <RangePicker
                style={{ width: '100%' }}
                placeholder={[__('form-item-date-start-time'), __('form-item-date-end-tiem')]}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={__('form-item-goal')}>
            {getFieldDecorator('goal', {
              rules: [
                {
                  required: true,
                  message: __('form-item-goal-message')
                }
              ]
            })(<TextArea style={{ minHeight: 32 }} placeholder={__('form-item-goal-placeholder')} rows={4} />)}
          </FormItem>
          <FormItem {...formItemLayout} label={__('form-item-standard')}>
            {getFieldDecorator('standard', {
              rules: [
                {
                  required: true,
                  message: __('form-item-standard-message')
                }
              ]
            })(<TextArea style={{ minHeight: 32 }} placeholder={__('form-item-standard-message')} rows={4} />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                {__('form-item-weight')}
                <em>({__('form-item-weight-optional')})</em>
              </span>
            }
          >
            {getFieldDecorator('weight')(
              <InputNumber placeholder={__('form-item-weight-placeholder')} min={0} max={100} style={{ width: 100 }} />
            )}
            <span>%</span>
          </FormItem>
          <FormItem {...formItemLayout} label={__('form-item-public')}>
            {getFieldDecorator('public', {
              initialValue: '1'
            })(
              <RadioGroup>
                <Radio value="1">{__('form-item-public-public')}</Radio>
                <Radio value="2">{__('form-item-public-private')}</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit">
              {__('form-item-public-submit')}
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default BasicForm
