'use strict'

import * as dotenv from 'dotenv'
dotenv.config()

import * as debug from 'debug'
import { Lljypt, Option, Status } from '../src/index'

const log = debug('test:index')

const clientId = parseInt(process.env.clientId, 10)
const baseUrl = process.env.baseUrl as string
const key = process.env.key as string
const merchant = parseInt(process.env.merchant, 10)
const phone = process.env.phone
const product = parseInt(process.env.product, 10)
const outTradeNo = process.env.outTradeNo
const chargeEnable = process.env.charge === 'true'

describe('index', () => {
  const option: Option = {
    baseUrl,
    clientId,
    key,
    merchant
  }
  const lljypt = new Lljypt(option)

  describe('money', () => {
    test('charge', async () => {
      if (chargeEnable) {
        expect(phone).not.toBeNull()
        expect(product).not.toBeNull()
        const taskId = await lljypt.charge(phone, product, outTradeNo)
        log('taskId: %s', taskId)
        expect(taskId).toBeGreaterThanOrEqual(0)
      } else {
        log('skip charge')
      }
    })
  })

  test('queryOrder', async () => {
    const status = await lljypt.queryOrder(outTradeNo)
    log('status: %j', status)
    expect((status === Status.Charging || status === Status.Sucess)).toBeTruthy()
  })

  test('getBalance', async () => {
    const balance = await lljypt.getBalance()
    log('balance: %d', balance)
    expect(balance).toBeGreaterThanOrEqual(0)
  })

  test('parseCallback', () => {
    const data = {
      outTradeNo: '2017-06-16-04',
      sign: 'b81dc99a1eed161e9c1f34ed81bcfb52',
      status: 4,
      ts: 1497589708626
    }
    const callback = lljypt.parseCallback(data)
    expect(callback).not.toBeNull()
  })
})
