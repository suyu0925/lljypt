export = Lljypt

declare class Lljypt {
  constructor(option: Lljypt.Option)

  charge(phone: string, product: number, outTradeNo: string): Promise<number>

  queryOrder(outTradeNo: string): Promise<Lljypt.Status>

  getBalance(): Promise<number>
}

declare namespace Lljypt {
  export interface Option {
    host: string
    port: number
    merchant: number
    clientId: number
    key: string
  }

  export enum Status {
    Sucess = 4,
    Fail = 5,
    Charging = 2
  }
}
