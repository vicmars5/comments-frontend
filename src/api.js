import Axios from 'axios'

const http = Axios.create({
  baseURL: 'http://localhost:3000'
})

export async function getComments () {
  const res = await http.get('/comments')
  return res.data.comments
}

export async function createComment (comment) {
  const res = await http.post('/comments', { comment })
  return res.data
}
