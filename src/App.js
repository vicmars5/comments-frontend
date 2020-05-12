import React, { useState } from 'react'
import useSWR, { mutate } from 'swr' // remote data lib
import Axios from 'axios'
import './App.css'

const http = Axios.create({
  baseURL: 'http://localhost:3000'
})

async function getComments () {
  const res = await http.get('/comments')
  return res.data.comments
}

async function createComment (comment) {
  const res = await http.post('/comments', { comment })
  return res.data
}

async function addComment (comment) {
  const newComment = await createComment(comment)
  mutate('/comments', (comments) => [...comments, newComment])
}

function useCommentsState () {
  const { data: comments, error } = useSWR('/comments', getComments)
  return { comments, error }
}

function CommentsList (props) {
  const { comments } = props

  return (
    comments.map(({ id, comment, votes }) => (
      <div className='card' key={id}>
        <div>
          {comment}
        </div>
        <small>{votes}</small>
      </div>
    ))
  )
}

function CommentInput (props) {
  const [newComment, setNewComment] = useState('')
  const { addComment } = props

  return (
    <>
      <input
        type='text'
        value={newComment}
        onChange={(ev) => setNewComment(ev.target.value)}
      />
      <button onClick={() => addComment(newComment)}>Comment</button>
    </>
  )
}

function App () {
  const { comments, error } = useCommentsState()

  if (error) {
    return <div>Something failed. Please see console for more info</div>
  }

  if (!comments) return <div>Requesting comments...</div>

  return (
    <div className='container'>
      <CommentInput addComment={addComment} />
      <CommentsList comments={comments} />
    </div>
  )
}

export default App
