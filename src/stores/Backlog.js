import { observable, action, runInAction } from 'mobx'

import { getUser, getJobs, getGroup, getOrganize, getBacklog, getDynamic } from '@/services/api'

export default class Backlog {
  @observable
  user = {}

  @observable
  job = []

  @observable
  group = []

  @observable
  organize = []

  @observable
  backlog = {}

  @observable
  dynamic = []

  @action
  async getUser (params) {
    var user = await getUser(params)
    const job = await getJobs(params)
    const group = await getGroup(params)
    const organize = await getOrganize(params)

    user.jobName = (job.list.find(o => o.id == user.job)).name
    user.groupName = (group.list.find(o => o.id == user.group)).name
    user.organizeName = (organize.list.find(o => o.id == user.organize)).name

    runInAction(() => {
      this.user = user
    })
  }

  @action
  async getBacklog (params) {
    const backlog = await getBacklog(params)

    runInAction(() => {
      this.backlog = backlog
    })
  }
}
