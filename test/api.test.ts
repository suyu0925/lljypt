'use strict'

import * as dotenv from 'dotenv'
dotenv.config()

import * as debug from 'debug'
import * as api from '../src/lib/api'

const log = debug('test:api')

const clientId = parseInt(process.env.clientId, 10)
const host = process.env.host as string
const key = process.env.key as string
const merchant = parseInt(process.env.merchant, 10)
const port = parseInt(process.env.port, 10)
const phone = process.env.phone
const product = parseInt(process.env.product, 10)
const outTradeNo = process.env.outTradeNo
const chargeEnable = process.env.charge === 'true'

describe('api', () => {
  const option: api.Option = {
    clientId,
    host,
    key,
    merchant,
    port
  }

  describe('money', () => {
    test('charge', async () => {
      if (chargeEnable) {
        expect(phone).not.toBeNull()
        expect(product).not.toBeNull()
        const taskId = await api.charge(option, phone, product, outTradeNo)
        log('taskId: %s', taskId)
        expect(taskId).toBeGreaterThanOrEqual(0)
      } else {
        log('skip charge')
      }
    })
  })

  test('queryOrder', async () => {
    const status = await api.queryOrder(option, outTradeNo)
    log('status: %j', status)
    expect(status).toBe(api.Status.Fail)
  })

  test('getBalance', async () => {
    const balance = await api.getBalance(option)
    log('balance: %d', balance)
    expect(balance).toBeGreaterThanOrEqual(0)
  })
})
