import axios from './axios'
import moment from 'moment';

export function getServices (id) {
  return new Promise((resolve, reject) => {
    axios.get('/services?where={"client":"'+id+'","date":{">":"' + moment.utc().format() + '"}}&sort=date%20ASC')
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log('error')
      reject(error)
    })
  })
}

export function getServicesHistory (id) {
  return new Promise((resolve, reject) => {
    axios.get('/services?where={"client":"'+id+'","date":{"<":"' + moment.utc().format() + '"}}&sort=date%20DESC')
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log('error')
      reject(error)
    })
  })
}

export function storeService (data) {
  return new Promise((resolve, reject) => {
    axios.post('/services', data)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log(error.response.data)
      reject(error)
    })
  })
}
