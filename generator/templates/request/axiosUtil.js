import urls from './urls'
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

const request = (type) => {
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

export default {
  get: request('get'),
  post: request('post'),
  urls
}