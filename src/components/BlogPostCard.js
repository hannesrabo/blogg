import React, { Component } from 'react'

import { api_url } from '../api-endpoint'
import { Redirect } from 'react-router-dom'
import './BlogPostCard.css'

class BlogPostCard extends Component {
    constructor(props) {
        super(props)

        let editMode = false
        if (this.props.editMode)
            editMode = this.props.editMode

        this.state = {
            editMode: editMode,
            title: this.props.data.title,
            content: this.props.data.content,
            date: this.props.data.date,
            updated: false,
            showPostFullscreen: false,
        }

        let idToken = sessionStorage.getItem("idToken")
        if (idToken)
            this.idToken = idToken;
        else
            console.error("Could not find id token")
    }

    postData = (URL, data) => {
        if (!this.idToken) {
            console.error("Not authorized! Login now!")
            return
        }

        let config = {
            // credentials: 'same-origin', 
            headers: {
                Authorization: this.idToken
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(data),
            // mode: 'cors', // no-cors, cors, *same-origin
        }

        return fetch(URL, config)
    }

    putData = (URL, data) => {
        if (!this.idToken) {
            console.error("Not authorized! Login now!")
            return
        }

        let config = {
            // credentials: 'same-origin', 
            headers: {
                Authorization: this.idToken
            },
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(data),
            // mode: 'cors', // no-cors, cors, *same-origin
        }

        return fetch(URL, config)
    }

    deleteData = (URL) => {
        if (!this.idToken) {
            console.log(this.idToken)
            console.error("Not authorized! Login now!")
            return
        }

        let config = {
            // credentials: 'same-origin', 
            headers: {
                Authorization: this.idToken
            },
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, cors, *same-origin
        }

        return fetch(URL, config)
    }

    editPostCard = () => {
        // This means save now
        if (this.state.editMode && this.state.updated) {
            let tempObj = Object.assign({}, this.props.data)
            Object.assign(tempObj, {
                title: this.state.title,
                content: this.state.content,
                date: this.state.date,
            })

            // This means that our object exists
            if (tempObj._id) {
                this.putData(api_url + process.env.PUBLIC_URL + '/posts/' + this.props.id, tempObj)
                    .then(dat => dat.json())
                    .then(ret => console.log(ret))
                    .catch(err => console.error(err))
            } else {
                this.postData(api_url + process.env.PUBLIC_URL + '/create', tempObj)
                    .then(dat => dat.json())
                    .then(ret => console.log(ret))
                    .catch(err => console.error(err))
            }
        }


        this.setState({
            editMode: !this.state.editMode,
            update: false,
        })
    }

    titleChanged = (event) => {
        this.setState({
            title: event.target.value,
            updated: true,
        })
    }

    contentChanged = (event) => {
        this.setState({
            content: event.target.value,
            updated: true,
        })
    }

    dateChanged = (event) => {
        this.setState({
            date: event.target.value,
            updated: true,
        })
    }

    showBlogPost = () => {
        this.props.history.push()
        this.setState({
            showPostFullscreen: true,
        })
    }

    deletePost = () => {
        this.props.deleteFunction(this.props.id)

        if (!this.props.id) {
            console.log("Post not defined. Does not delete on server")
            return
        }
        console.log("Deleted post: " + process.env.PUBLIC_URL + '/posts/' + this.props.id)

        this.deleteData(api_url + process.env.PUBLIC_URL + '/posts/' + this.props.id)
            .then(dat => dat.json())
            .then(ret => {
                console.log(ret)
                console.log("Deleted post: " + process.env.PUBLIC_URL + '/posts/' + this.props.id)
            })
            .catch(err => {
                console.error("Something wrong")
                console.error(err)
            })

    }

    cancelEdit = () => {
        console.log("Cancel!")
        this.props.deleteFunction()
        this.setState({
            title: this.props.data.title,
            content: this.props.data.content,
            date: this.props.data.date,
            editMode: false,
        })

    }

    renderContentPreview = () => {
        let date = new Date(this.state.date)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        return (
            <div className="blog-post-card-content"
                onClick={this.showBlogPost}
            >
                <h3 className="blog-post-card-content--title">{this.state.title}</h3>
                <p>{this.state.content}</p>
                <span>{day}/{month}/{year}</span>
            </div>
        )
    }

    renderAdmin = () => {
        let buttonValue = this.state.editMode ? 'Save' : 'Edit'

        let contents
        if (this.state.editMode) {
            contents = (
                <div className="blog-post-card-content">
                    <h2 className="blog-post-card-content__edit-header">Edit Post:</h2>
                    <p>Title:</p>
                    <input
                        type="text"
                        value={this.state.title}
                        onChange={this.titleChanged}
                    />
                    <p>Content:</p>
                    <textarea
                        value={this.state.content}
                        onChange={this.contentChanged}
                    >
                    </textarea>
                    <p>Date</p>
                    <input type="date"
                        value={this.state.date}
                        onChange={this.dateChanged}
                    />
                </div>
            )
        } else {
            contents = this.renderContentPreview()
        }

        return (
            <div className="blog-post-card blog-post-card__admin">

                {contents}

                <div className="blog-post-card-controls">
                    <input
                        type="button"
                        onClick={this.editPostCard}
                        value={buttonValue}
                    />
                    <input
                        type="button"
                        className="delete"
                        onClick={this.deletePost}
                        value="Delete Post"
                    />
                    {this.state.editMode &&
                        (
                            <input
                                type="button"
                                className="cancel"
                                onClick={this.cancelEdit}
                                value="Cancel"
                            />
                        )}
                </div>
            </div>
        )
    }

    render() {
        if (this.state.showPostFullscreen) {
            return (
                <Redirect to={process.env.PUBLIC_URL + "/posts/" + this.props.id} />
            )
        }

        if (this.props.isAdmin) {
            return this.renderAdmin()
            // Show this post fullscreeen..
        } else {
            return (
                <div className="blog-post-card blog-post-card__admin">
                    {this.renderContentPreview()}
                </div>
            )
        }
    }
}

export default BlogPostCard