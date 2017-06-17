window.navigator.userAgent = 'ReactNative';

import socketIOClient from 'socket.io-client'
import sailsIOClient from 'sails.io.js'

var io;
io = sailsIOClient(socketIOClient)
io.sails.url = 'http://api.dugy.co/';

export function getPets() {
  return new Promise ((resolve, reject) => {
    io.socket.get('/api/v1/pets', function serverResponded (body, JWR) {
      if (JWR.statusCode == '200') {
        resolve(body)
      } else {
        reject(JWR)
      }
    })
  })
}

export function getRaces() {
  return new Promise ((resolve, reject) => {
    io.socket.get('/api/v1/races', function serverResponded (body, JWR) {
      if (JWR.statusCode == '200') {
        resolve(body)
      } else {
        reject(JWR)
      }
    })
  })
}

export function getSizes() {
  return new Promise ((resolve, reject) => {
    io.socket.get('/api/v1/sizes', function serverResponded (body, JWR) {
      if (JWR.statusCode == '200') {
        resolve(body)
      } else {
        reject(JWR)
      }
    })
  })
}

export function login(data) {

  return new Promise ((resolve, reject) => {
    io.socket.post('/api/v1/auth/login', data, function serverResponded (body, JWR) {
      io.socket.disconnect();
      if (JWR.statusCode == '200') {
        io.sails.headers = {
          'authorization': 'Bearer ' + body.token
        };
        io.sails.connect();
        resolve(body)
      } else {
        reject()
      }
    })
  })
}

export function session(token) {
  return new Promise ((resolve, reject) => {
    console.log('hola mundo')
    io.socket.disconnect();
    io.sails.headers = {
      'authorization': 'Bearer ' + token,
    };
    io.sails.connect();
    io.socket.get('/api/v1/auth/user', function serverResponded (body, JWR) {
      console.log(JWR);
      if (JWR.statusCode == '200') {
        resolve(body)
      } else {
        reject(body)
      }
    })
  })
}
