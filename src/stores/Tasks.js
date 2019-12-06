import { observable, action, runInAction } from 'mobx'

import { getTable } from '@/services/api'

export default class Table {
  @observable
  data = []

  @action
  async getTable (params) {
    const data = await getTable(params)
    runInAction(() => {
      this.data = data
    })
  }
}
