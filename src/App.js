import React, { Component } from 'react'
import './App.css'

import BlogPostsOverview from './components/BlogPostsOverview'
import LayoutTemplate from './components/LayoutTemplate';


class App extends Component {

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
      <div className="app-wrapper">
        <LayoutTemplate
          header="Blogg från Kenya"
        >
          <div className="full-page-info">
            <h2 className="full-page-info--header">Kort om bloggen</h2>
            <p className="full-page-info--text">
              Hej!
              <br />
              Välkommen till min blogg om resan till Kenya. Det närmaste 4 månaderna (April - Juli 2018) kommer jag att spendera i Kenya tillsammans med några andra studenter från KTH. Här kan man läsa lite om vad jag har för mig.
              <br /> <br />
              Det högst troligt att useendet på bloggen över tid när jag har tid att redigera layouten.
            </p>
          </div>

          <BlogPostsOverview
            history={this.props.history} />
        </LayoutTemplate>
      </div>
    )
  }
}

export default App
