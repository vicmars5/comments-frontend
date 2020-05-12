import React, { useState } from 'react'
import { addComment, useCommentsState } from './store'
import './App.css'

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
