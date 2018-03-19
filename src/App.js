import React, { Component } from 'react'
import './App.css'

// import { API_ROOT } from './api-endpoint'

import BlogPostsOverview from './components/BlogPostsOverview'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React blogg</h1>
        </header>
        <div className="posts-wrapper">
          <BlogPostsOverview />
        </div>
      </div>
    )
  }
}

export default App
