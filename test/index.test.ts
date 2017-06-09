'use strict'

import * as dotenv from 'dotenv'
import { default as LLJYPT, Option, Status } from '../src/index'

dotenv.config()

const clientId = parseInt(process.env.clientId, 10)
const host = process.env.host as string
const key = process.env.key as string
const merchant = parseInt(process.env.merchant, 10)
const port = parseInt(process.env.port, 10)
const phone = process.env.phone
const product = parseInt(process.env.code, 10)
const outTradeNo = process.env.outTradeNo

describe('index', () => {
  const option: Option = {
    clientId,
    host,
    key,
    merchant,
    port
  }
  const lljypt = new LLJYPT(option)

  describe('money', () => {
    test('charge', async () => {
      expect(phone).not.toBeNull()
      expect(product).not.toBeNull()
      const taskId = await lljypt.charge(phone, product, outTradeNo)
      expect(taskId).toBeGreaterThanOrEqual(0)
    })
  })

  test('queryOrder', async () => {
    const status = await lljypt.queryOrder(outTradeNo)
    expect(status).toBe(Status.Fail)
  })

  test('getBalance', async () => {
    const balance = await lljypt.getBalance()
    expect(balance).toBeGreaterThanOrEqual(0)
  })
})
