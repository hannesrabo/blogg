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
                        <h2 className="full-page-info--header">The admin interface and controls</h2>
                        <div className="full-page-info--text">
                            <p>
                                This is the admin interface where posts can be added and edited. Press the "Create new post" button below to add a new post. Old posts can be edited in the list below.
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

                    <BlogPostsOverview isAdmin={true} history={this.props.history} />
                </LayoutTemplate>
            </div>
        )
    }
}

export default withAuthenticator(Admin)
// export default Admin