import { observable, action, runInAction } from 'mobx'

import {
  getAnalysisCount,
  getAnalysisTendency,
  getAnalysisPriority,
  getAnalysisDistribution,
  getAnalysisStatistics
} from '@/services/api'

export default class Analysis {
  @observable
  count = {
    new: 0,
    pending: 0,
    overdue: 0,
    resolution: 0
  }

  @observable
  tendency = {}

  @observable
  priority = []

  @observable
  distribution = {}

  @observable
  statistics = []

  @action
  async getCount () {
    const data = await getAnalysisCount()

    runInAction(() => {
      this.count = data
    })
  }

  @action
  async getTendency (params) {
    const data = await getAnalysisTendency(params)

    runInAction(() => {
      this.tendency = data
    })
  }

  @action
  async getPriority (params) {
    const data = await getAnalysisPriority(params)

    runInAction(() => {
      this.priority = data
    })
  }

  @action
  async getDistribution (params) {
    const data = await getAnalysisDistribution(params)

    runInAction(() => {
      this.distribution = data
    })
  }

  @action
  async getStatistics (params) {
    const data = await getAnalysisStatistics(params)

    runInAction(() => {
      this.statistics = data
    })
  }
}
