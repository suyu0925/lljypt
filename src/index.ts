'use strict'

import * as api from './lib/api'

class Lljypt {
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
}

export { Option } from './lib/api'

export { Status } from './lib/api'

export default Lljypt
