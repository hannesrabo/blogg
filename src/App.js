import React, { Component } from 'react'
import './App.css'

import BlogPostsOverview from './components/BlogPostsOverview'

import { Auth } from 'aws-amplify'
import { api_url } from './api-endpoint';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      idToken: ''
    }
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  getData() {
    // Auth.currentAuthenticatedUser().then(dat => console.log(dat))
    // Auth.currentAuthenticatedUser().then(dat => {
    //   this.setState({ idToken: dat.signInUserSession.idToken.jwtToken })

    //   console.log("Fetching")
    //   fetch(api_url + "/postsAuth", {
    //     // credentials: 'same-origin', // include, same-origin, *omit
    //     headers: {
    //       Authorization: this.state.idToken
    //     },
    //     // method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //     // mode: 'cors', // no-cors, cors, *same-origin
    //   })
    //     .then(raw => raw.json())
    //     .then(res => {
    //       console.log(res)
    //     })
    // })
  }


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
