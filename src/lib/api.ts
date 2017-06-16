'use strict'

import * as moment from 'moment'
import * as request from 'request'
import * as utils from './utils'

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

interface Request {
  merchant: number
  clientId: number
  version: 'V100'
  ts: number
  sign: string
}

interface ChargeRequest extends Request {
  accountVal: string
  outTradeNo: string
  product: number
}

interface QueryOrderRequest extends Request {
  outTradeNo: string
}

// tslint:disable:no-empty-interface
interface GetBalanceRequest extends Request {
}
// tslint:enable:no-empty-interface

interface Response {
  rspCode: number
  rspMsg: string
}

interface ChargeResponse extends Response {
  taskId: number
}

interface QueryOrderResponse extends Response {
  status: Status
}

interface GetBalanceResponse extends Response {
  balance: string
}

interface CallbackRequest {
  failReason: string
  outTradeNo: string
  sign: string
  status: Status
  ts: number
}

async function _request(url: string, req: Request) {
  return new Promise((resolve, reject) => {
    request({
      body: req,
      json: true,
      method: 'post',
      url
    }, (err, res, body) => {
      if (err) {
        reject(err)
      } else if (res.statusCode !== 200) {
        reject(new Error(`wrong status code: ${res.statusCode}`))
      } else {
        resolve(body)
      }
    })
  })
}

export async function charge(option: Option, phone: string, product: number, outTradeNo: string) {
  const req: ChargeRequest = {
    accountVal: phone,
    clientId: option.clientId,
    merchant: option.merchant,
    outTradeNo,
    product,
    sign: undefined,
    ts: moment().valueOf(),
    version: 'V100'
  }
  utils.sign(req, option.key)
  const url = `http://${option.host}:${option.port}/capi/trade.charge`
  const result = (await _request(url, req)) as ChargeResponse
  if (result.rspCode !== 0) {
    throw new Error(`charge error ${result.rspCode}: ${result.rspMsg}`)
  }
  return result.taskId
}

export async function queryOrder(option: Option, outTradeNo: string) {
  const req: QueryOrderRequest = {
    clientId: option.clientId,
    merchant: option.merchant,
    outTradeNo,
    sign: undefined,
    ts: moment().valueOf(),
    version: 'V100'
  }
  utils.sign(req, option.key)
  const url = `http://${option.host}:${option.port}/capi/query.order`
  const result = (await _request(url, req)) as QueryOrderResponse
  if (result.rspCode !== 0) {
    throw new Error(`charge error ${result.rspCode}: ${result.rspMsg}`)
  }
  return result.status
}

export async function getBalance(option: Option) {
  const req: GetBalanceRequest = {
    clientId: option.clientId,
    merchant: option.merchant,
    sign: undefined,
    ts: moment().valueOf(),
    version: 'V100'
  }
  utils.sign(req, option.key)
  const url = `http://${option.host}:${option.port}/capi/query.balance`
  const result = (await _request(url, req)) as GetBalanceResponse
  if (result.rspCode !== 0) {
    throw new Error(`charge error ${result.rspCode}: ${result.rspMsg}`)
  }
  return parseFloat(result.balance)
}

export function parseCallback(option: Option, data: object) {
  if (utils.verifyCallback(data, option.key)) {
    return data as CallbackRequest
  } else {
    return null
  }
}

export function feedback(done: boolean): string {
  return done ? 'OK' : 'NOT OK'
}
