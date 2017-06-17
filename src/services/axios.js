import axios from 'axios'
export default axios.create({
  baseURL: 'http://api.dugy.co/api/v1/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})
