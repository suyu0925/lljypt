export class Lljypt {
  constructor(option: Option)

  charge(phone: string, product: number, outTradeNo: string): Promise<number>

  queryOrder(outTradeNo: string): Promise<Status>

  getBalance(): Promise<number>

  parseCallback(data: object): CallbackRequest

  feedback(done: boolean): string
}

export interface Option {
  baseUrl: string
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
