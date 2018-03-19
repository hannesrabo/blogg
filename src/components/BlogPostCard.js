import React, { Component } from 'react'
import './BlogPostCard.css'

class BlogPostCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let date = new Date(this.props.data.date)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        return (
            <div className="blog-post-card">
                <h3>{this.props.data.title}</h3>
                <p>{this.props.data.content}</p>
                <span>{day}/{month}/{year}</span>
            </div>
        )
    }
}

export default BlogPostCard