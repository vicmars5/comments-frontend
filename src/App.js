import React, { useState, useEffect } from 'react'
// import Axios from 'axios'
import './App.css'

function App () {
  const [comments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    console.log('use effect called')
  })

  return (
    <div className='container'>
      <input
        type='text'
        value={newComment}
        onChange={(ev) => setNewComment(ev.target.value)}
      />
      <button onClick={() => {}}>Comment</button>
      {comments.map(({ id, comment, votes }) => (
        <div className='card' key={id}>
          <div>
            {comment}
          </div>
          <small>{votes}</small>
        </div>
      ))}
    </div>
  )
}

export default App
