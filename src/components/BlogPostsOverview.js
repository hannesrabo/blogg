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
            fetchState: "fetching",
            internalState: "text",
            cards: [],
        }
    }

    deleteCardWithId = (id) => {
        for (let i = 0; i < this.state.cards.length; i++) {
            if (this.state.cards[i]._id === id) {
                this.state.cards.splice(i, 1)
                break
            }
        }
        this.setState({
            cards: this.state.cards
        })
    }

    componentDidMount = () => {
        console.log("Fetching: " + api_url + '/posts')
        fetch(api_url + '/posts')
            .then(results => results.json())
            .then(data => {
                let cards = data.posts.reverse()
                this.setState({ fetchState: "success", cards: cards })
            })
            .catch(err => {
                console.error("Error while fetching")
                console.error(err)
                this.setState({
                    fetchState: 'fail'
                })
            })
    }

    render() {
        let titleText = this.state.isAdmin ? 'Redigera Inägg' : 'Senaste Inläggen'
        return (
            <div className="blog-posts-overview">
                <h2 className="blog-posts-overview--header">
                    {titleText}
                </h2>
                {this.state.cards.map(card => {
                    return (
                        <BlogPostsCard
                            key={card._id}
                            id={card._id}
                            data={card}
                            isAdmin={this.state.isAdmin}
                            deleteFunction={this.deleteCardWithId}
                        />
                    )
                })
                }
                {this.state.fetchState === 'fetching' &&
                    <p>Fetching posts</p>
                }
                {this.state.fetchState === 'fail' &&
                    <p>Failed to fetch posts</p>
                }
            </div>
        )
    }
}

export default BlogPostsOverview