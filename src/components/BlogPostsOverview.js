import React, { Component } from 'react'

import { api_url } from '../api-endpoint'
import BlogPostsCard from './BlogPostCard'
import './BlogPostsOverview.css'

class BlogPostsOverview extends Component {
    constructor() {
        super()

        this.state = {
            internalState: "text",
            cards: [],
        }
    }

    componentDidMount() {
        fetch(api_url + '/posts')
            .then(results => results.json())
            .then(data => {
                let cards = data.posts.map(val => {
                    return (
                        <BlogPostsCard
                            key={val._id}
                            data={val}
                        />
                    )
                })

                this.setState({ cards: cards })
            })
            .catch(err => {
                console.error(err)
            })
    }

    render() {
        return (
            <div className="blog-posts-overview">
                <p>Rendering components </p>
                {this.state.cards}
            </div>
        )
    }
}

export default BlogPostsOverview