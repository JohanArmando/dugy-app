import axios from './axios'

export function getPets (id) {
  return new Promise((resolve, reject) => {
    axios.get('/pets?owner=' + id)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log('error')
      reject(error)
    })
  })
}

export function storePet (data) {
  return new Promise((resolve, reject) => {
    axios.post('/users/' + data.id + '/pets',
    {
      name: data.name,
      size: data.size,
      race: data.race,
      born_date: data.born_date,
      comments: data.comments,
      avatar: {
          avatar: data.avatar,
          name: 'avatar'
      }
    })
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log(error.response.data)
      reject(error)
    })
  })
}

export function addPhoto (data) {
  return new Promise((resolve, reject) => {
    axios.post('/pets/' + data.id + '/photos', {
      name: 'photo.png',
      avatar: data.avatar
    })
    .then(response => {
      console.log("pet",response.data);

      resolve(response.data)
    })
    .catch(error => {
      console.log('error', error.response.data)
      reject(error)
    })
  })
}

export function updatePet (data) {
  return new Promise((resolve, reject) => {
    axios.put('/pets/' + data.id, data)
    .then(response => {
      console.log("pet",response.data);

      resolve(response.data)
    })
    .catch(error => {
      console.log('error', error.response.data)
      reject(error)
    })
  })
}

export function getPet (id) {
  return new Promise((resolve, reject) => {
    axios.get('/pets/' + id)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log('error', error.response.data)
      reject(error)
    })
  })
}

export function deletePhoto (data) {
  return new Promise((resolve, reject) => {
    axios.delete('/pets/' + data.petid + '/photos/' + data.photoid)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log('error', error.response.data)
      reject(error)
    })
  })
}
