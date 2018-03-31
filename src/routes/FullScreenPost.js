import React, { Component } from 'react'

import Markdown from 'react-markdown'
import LayoutTemplate from '../components/LayoutTemplate';
import { api_url } from '../api-endpoint'
import { Redirect } from 'react-router-dom'

import './FullScreenPost.css'

import closeIcon from '../resources/close.svg'

class FullScreenPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            invalidPostId: false,
            id: props.match.params.id,
            postData: {
                title: "Loading...",
                content: "",
                date: new Date(),
            },
        }
    }

    closePost = () => {
        this.props.history.goBack()
    }

    componentDidMount = () => {
        fetch(api_url + '/posts/' + this.state.id)
            .then(raw => raw.json())
            .then(json => {
                this.setState({
                    postData: json
                })
            })
            .catch(err => {
                console.error("Could not load post: " + err)
                this.setState({
                    invalidPostId: true
                })
            })
    }

    render() {
        if (this.state.invalidPostId) {
            return (
                <Redirect to={process.env.PUBLIC_URL + "/404"} />
            )
        }

        return (
            <div>
                <LayoutTemplate
                    header="Blogg från Kenya"
                >
                    <div className="full-screen-post-title-container">
                        <h1 className="full-screen-post__title">{this.state.postData.title}</h1>
                        <img
                            className="full-screen-post__close-icon"
                            src={closeIcon}
                            alt="Close the post"
                            onClick={this.closePost} />
                    </div>
                    <Markdown className="full-screen-markdown-wrapper" source={this.state.postData.content} />
                </LayoutTemplate>
            </div>
        )
    }
}

export default FullScreenPost