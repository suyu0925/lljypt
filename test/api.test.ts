'use strict'

import * as dotenv from 'dotenv'
import * as api from '../src/lib/api'

dotenv.config()

const clientId = parseInt(process.env.clientId, 10)
const host = process.env.host as string
const key = process.env.key as string
const merchant = parseInt(process.env.merchant, 10)
const port = parseInt(process.env.port, 10)
const phone = process.env.phone
const product = parseInt(process.env.code, 10)
const outTradeNo = process.env.outTradeNo

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
      expect(phone).not.toBeNull()
      expect(product).not.toBeNull()
      const taskId = await api.charge(option, phone, product, outTradeNo)
      expect(taskId).toBeGreaterThanOrEqual(0)
    })
  })

  test('queryOrder', async () => {
    const status = await api.queryOrder(option, outTradeNo)
    expect(status).toBe(api.Status.Fail)
  })

  test('getBalance', async () => {
    const balance = await api.getBalance(option)
    expect(balance).toBeGreaterThanOrEqual(0)
  })
})
