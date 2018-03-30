import React, { Component } from 'react'

import { api_url } from '../api-endpoint'
import BlogPostsCard from './BlogPostCard'
import './BlogPostsOverview.css'

class BlogPostsOverview extends Component {
    constructor(props) {
        super(props)

        let isAdmin = false
        if (this.props.isAdmin === true)
            isAdmin = this.props.isAdmin

        this.state = {
            isAdmin: isAdmin,
            internalState: "text",
            cards: [],
        }
    }

    componentDidMount() {
        console.log("Fetching: " + api_url + '/posts')
        fetch(api_url + '/posts')
            .then(results => results.json())
            .then(data => {
                let cards = data.posts.map(val => {
                    return (
                        <BlogPostsCard
                            key={val._id}
                            data={val}
                            isAdmin={this.state.isAdmin}
                        />
                    )
                })

                this.setState({ cards: cards })
            })
            .catch(err => {
                console.error("Error in blog posts overview")
                console.error(err)
            })
    }

    render() {
        let titleText = this.state.isAdmin ? 'Redigera Inägg' : 'Senaste Inläggen'

        return (
            <div className="blog-posts-overview">
                <h2 className="blog-posts-overview--header">
                    {titleText}
                </h2>
                {this.state.cards}
            </div>
        )
    }
}

export default BlogPostsOverview