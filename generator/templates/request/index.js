import urls from './urls'
import axios from 'axios'

import {
  Toast
} from 'vant';

const baseUrl = '/route/'
const timeout = 30000
const commonParams = {
  hospitalId: '250802'
}

const instance = axios.create({
  baseURL: baseUrl,
  timeout: timeout
});

const request = (type, url, param) => {
  return new Promise((resolve, reject) => {
    instance[type](url, {
      ...param,
      ...commonParams
    })
      .then(res => {
        if (res.success) {
          resolve(res.data.entity)
        } else {
          reject(null)
          Toast.fail(res.data.message)
        }
      })
      .catch(error => {
        // eslint-disable-next-line 
        console.log(error)
        reject(error)
      })
  }) 
}

const get = (url, param) => {
  return request('get', url,param)
}

const post = (url, param) => {
  return request('post', url,param)
}

export default {
  get,
  post,
  urls
}
