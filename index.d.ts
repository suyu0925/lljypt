export = Lljypt

declare class Lljypt {
  constructor(option: Lljypt.Option)

  charge(phone: string, product: number, outTradeNo: string): Promise<number>

  queryOrder(outTradeNo: string): Promise<Lljypt.Status>

  getBalance(): Promise<number>

  parseCallback(data: object): Lljypt.CallbackRequest

  feedback(done: boolean): string
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

  export interface CallbackRequest {
    failReason: string
    outTradeNo: string
    sign: string
    status: Status
    ts: number
  }
}
