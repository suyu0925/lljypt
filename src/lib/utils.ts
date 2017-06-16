'use strict'

import * as crypto from 'crypto'

/**
 * Combine key and value, ignore empty value and 'sign' key
 * @param obj
 */
export function combine(obj: any) {
  return Object.keys(obj).filter((key) => {
    return obj[key] !== undefined && obj[key] !== '' && obj[key] !== null && key !== 'sign'
  }).sort().map((key) => {
    return key + '' + obj[key]
  }).join('')
}

/**
 * Return the signature of data
 * @param json Data need sign
 * @param key he api key
 */
export function getSignature(json: any, key: string) {
  const str = combine(json) + key
  const signature = crypto.createHash('md5').update(str, 'utf8').digest('hex').toLowerCase()
  return signature
}

/**
 * Set 'sign' field to data, and return itself
 * @param json Data need sign
 * @param key the api key
 */
export function sign(json: any, key: string) {
  json.sign = getSignature(json, key)
  return json
}

export function verifyCallback(json: any, key: string) {
  const oldSign = json.sign
  return oldSign === getSignature(json, key)
}
