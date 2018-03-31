import React, { Component } from 'react'

import { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import LayoutTemplate from '../components/LayoutTemplate'
import BlogPostsOverview from '../components/BlogPostsOverview';

import './Admin.css'
import BlogPostCard from '../components/BlogPostCard';

class Admin extends Component {

    constructor(props) {
        super(props)

        this.state = {
            idToken: null,
            newPost: false,
        }
    }

    createNewPost = () => {
        this.setState({
            newPost: true,
        })
    }

    componentDidMount() {
        Auth.currentAuthenticatedUser().then(dat => {
            if (dat) {
                this.setState({ idToken: dat.signInUserSession.idToken.jwtToken })
                sessionStorage.setItem("idToken", dat.signInUserSession.idToken.jwtToken)

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

    stopCreationOfPost = () => {
        this.setState({
            newPost: false
        })
    }

    render() {
        let cardData = {
            title: "",
            content: "",
            date: new Date(),
        }
        let editArea = (
            <div className="admin-add-post-container">
                <BlogPostCard
                    data={cardData}
                    isAdmin={true}
                    deleteFunction={this.stopCreationOfPost}
                    editMode={true}
                />
            </div>
        )
        return (
            <div>
                <LayoutTemplate
                    header="Admin Page Header"
                >
                    <div className="full-page-info">
                        <h2 className="full-page-info--header">This is the admin info / control</h2>
                        <div className="full-page-info--text">
                            <p>
                                This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block This is the text block
                            </p>
                            {!this.state.newPost &&
                                (<input
                                    type="button"
                                    value="Create new post"
                                    onClick={this.createNewPost} />)
                            }
                        </div>
                        {this.state.newPost &&
                            (editArea)
                        }
                    </div>

                    <BlogPostsOverview isAdmin={true} />
                </LayoutTemplate>
            </div>
        )
    }
}

export default withAuthenticator(Admin)
// export default Admin