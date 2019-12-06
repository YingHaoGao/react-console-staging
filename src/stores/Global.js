import { observable, action } from 'mobx'

export default class Global {
  @observable
  theme = 'blue'

  themes = ['white', 'dark', 'blue']

  @action
  changeTheme () {
    this.theme = this.themes.shift()

    this.themes.push(this.theme)
  }
}
