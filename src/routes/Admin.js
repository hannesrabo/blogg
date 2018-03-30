import React, { Component } from 'react'

import { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import LayoutTemplate from '../components/LayoutTemplate'
import BlogPostsOverview from '../components/BlogPostsOverview';


class Admin extends Component {

    constructor(props) {
        super(props)

        this.state = {
            idToken: null
        }
    }

    componentDidMount() {
        Auth.currentAuthenticatedUser().then(dat => {
            if (dat) {
                this.setState({ idToken: dat.signInUserSession.idToken.jwtToken })

                // console.log("Fetching")
                // This would be how to fetch things
                // let config = {
                //   // credentials: 'same-origin', 
                //   headers: {
                //     Authorization: this.state.idToken
                //   },
                //   // method: 'GET', // *GET, POST, PUT, DELETE, etc.
                //   // mode: 'cors', // no-cors, cors, *same-origin
                // }

                // fetch(api_url + "/postsAuth", config)
                //   .then(raw => raw.json())
                //   .then(res => {
                //     console.log(res)
                //   })

                console.log("User is logged in")

            } else {
                console.log("Failed to login")
            }
        })
    }

    render() {
        console.log(Auth.user)
        return (
            <div>
                <LayoutTemplate
                    header="Admin Page Header"
                >
                    <div className="full-page-info">
                        <h2 className="full-page-info--header">This is the admin info / control</h2>
                        <p className="full-page-info--text">This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block</p>
                    </div>

                    <BlogPostsOverview isAdmin={true} />
                </LayoutTemplate>
            </div>
        )
    }
}

// export default withAuthenticator(Admin)
export default Admin