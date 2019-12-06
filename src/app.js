import moment from 'moment'
import router from './router'
import { stores } from './stores'
import Menus from './common/menu'
import { Provider } from 'mobx-react'
import cookie from '@uyun/utils/cookie'
import __, { intl } from '@uyun/utils/i18n'
import locales from './common/locales.json'
import React, { PureComponent } from 'react'
import BasicLayout from '@uyun/ec-basic-layout'
import { Router, Link } from 'react-router-dom'
import { LocaleProvider, Icon } from '@uyun/components'
import { history, renderRoutes } from './utils/router'
import enUS from '@uyun/components/lib/locale-provider/en_US'
import zhCN from '@uyun/components/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'

intl.merge(locales)
moment.locale('zh-cn')
moment.defaultFormat = 'YYYY-MM-DD HH:mm'

export default class App extends PureComponent {
  get menus () {
    return [
      {
        key: 'backlog',
        name: __('menu-backlog'),
        type: 'link',
        icon: <Icon type="home" />,
        path: 'backlog'
      },
      {
        key: 'projects',
        name: __('menu-projects'),
        type: 'link',
        icon: <Icon type="line-chart" />,
        path: 'projects'
      },
      {
        key: 'logs',
        name: __('menu-logs'),
        type: 'link',
        icon: <Icon type="line-chart" />,
        path: 'logs'
      },
      {
        key: 'tasks',
        name: __('menu-tasks'),
        type: 'link',
        icon: <Icon type="line-chart" />,
        path: 'tasks'
      },
      {
        key: 'apply',
        name: __('menu-apply'),
        type: 'link',
        icon: <Icon type="solution" />,
        path: 'apply'
      },
      {
        key: 'examine',
        name: __('menu-examine'),
        type: 'link',
        icon: <Icon type="solution" />,
        path: 'examine'
      },
      {
        key: 'delivery',
        name: __('menu-delivery'),
        type: 'link',
        icon: <Icon type="solution" />,
        path: 'delivery'
      }
    ]
  }

  render () {
    const locale = cookie.get('language') === 'en_US' ? enUS : zhCN

    return (
      <Provider {...stores}>
        <LocaleProvider locale={locale}>
          <Menus.Provider value={this.menus}>
            <Router history={history}>
              <BasicLayout sideMenu={{ items: this.menus, Link: Link }}>{renderRoutes(router)}</BasicLayout>
            </Router>
          </Menus.Provider>
        </LocaleProvider>
      </Provider>
    )
  }
}
