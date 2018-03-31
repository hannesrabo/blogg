import React, { Component } from 'react'

import Markdown from 'react-markdown'
import LayoutTemplate from '../components/LayoutTemplate';
import { api_url } from '../api-endpoint'
import { Redirect } from 'react-router-dom'

import './FullScreenPost.css'

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
                    header={this.state.postData.title}
                >
                    <Markdown className="full-screen-markdown-wrapper" source={this.state.postData.content} />
                </LayoutTemplate>
            </div>
        )
    }
}

export default FullScreenPost