'use strict'

import * as utils from '../src/lib/utils'

describe('utils', () => {
  // tslint:disable:object-literal-sort-keys
  const data = {
    b: 'wrydh',
    c: 12.34,
    d: null,
    e: '',
    f: undefined,
    a: 3
  }
  // tslint:enable:object-literal-sort-keys
  const key = '11111'

  test('combine', () => {
    const conbinedString = utils.combine(data)
    expect(conbinedString).toEqual('a3bwrydhc12.34')
  })

  test('getSignature', () => {
    const signature = utils.getSignature(data, key)
    expect(signature).toEqual('34cb3f6c0d949f054de8afddcc581071')
  })

  test('sign', () => {
    let newData = Object.assign({}, data)
    utils.sign(newData, key)
    expect(newData).toEqual(Object.assign(data, { sign: '34cb3f6c0d949f054de8afddcc581071' }))
    // sign again, and it should be the same
    newData = utils.sign(newData, key)
    expect(newData).toEqual(Object.assign(data, { sign: '34cb3f6c0d949f054de8afddcc581071' }))
  })
})
