import axios from './axios'

export function getPets () {
  return new Promise((resolve, reject) => {
    axios.get('/pets')
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
      photos: [
        {
          avatar: data.avatar
        }
      ]
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
