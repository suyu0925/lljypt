'use strict'

import * as api from './lib/api'

export { Option, Status } from './lib/api'

export class Lljypt {
  private readonly option: api.Option

  constructor(option: api.Option) {
    this.option = Object.assign({}, option)
  }

  public async charge(phone: string, product: number, outTradeNo: string) {
    return api.charge(this.option, phone, product, outTradeNo)
  }

  public async queryOrder(outTradeNo: string) {
    return api.queryOrder(this.option, outTradeNo)
  }

  public async getBalance() {
    return api.getBalance(this.option)
  }

  public parseCallback(data: object) {
    return api.parseCallback(this.option, data)
  }

  public feedback(done: boolean) {
    return api.feedback(done)
  }
}
