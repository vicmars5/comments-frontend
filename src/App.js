import React, { useState, useEffect } from 'react'
import useSWR from 'swr' // remote data lib
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

function useCommentsState () {
  const { data: comments, error, mutate } = useSWR('/comments', getComments)

  async function addComment (comment) {
    mutate(async (comments) => {
      return [...comments, await createComment(comment)]
    })
  }

  return { comments, error, addComment }
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
  const { comments, error, addComment } = useCommentsState()

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
