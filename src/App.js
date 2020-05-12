import React, { Component } from 'react';
import Axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: '',
      comments: [{ id: 1, comment: 'Foo' }],
    }
  }

  componentDidMount () {
    Axios.get('http://localhost:3000/comments')
      .then((res) => {
        const { data: { comments } } = res;
        this.setState({ comments });
      })
      .catch(err => console.error);
  }

  onClickBtn = async () => {
    const { newComment } = this.state;
    const { data: comment } = await Axios.post('http://localhost:3000/comments', {
      comment: newComment
    });
    this.setState((state) => ({
      comments: [...state.comments, comment]
    }))
  }

  onChangeNewComment = (ev) => {
    this.setState({ newComment: ev.target.value })
  }

  render () {
    const { comments } = this.state
    return (
      <div className="container">
        <input
          type="text"
          value={this.state.newComment}
          onChange={this.onChangeNewComment}
        />
        <button onClick={this.onClickBtn}>Comment</button>
        {comments.map(({ id, comment, votes }) => (
          <div className="card" key={id}>
            <div>
              {comment}
            </div>
            <small>{votes}</small>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
