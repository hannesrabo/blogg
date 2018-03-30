import React, { Component } from 'react'
import './BlogPostCard.css'

class BlogPostCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editMode: false,
            title: this.props.data.title,
            content: this.props.data.content,
            date: this.props.data.date
        }
    }

    editPostCard = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    titleChanged = (newTitle, second) => {
        console.log("title changed")

        console.log(newTitle)
        console.log(second)
        // this.setState({
        //     title: newTitle
        // })
    }

    contentChanged = (newContent) => {
        console.log("Content changed")
        this.setState({
            content: newContent
        })
    }

    dateChanged = (newDate) => {
        console.log("Date changed")
        this.setState({
            date: newDate
        })
    }

    showBlogPost = () => {
        console.log("Render this!")
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
                </div>
            </div>
        )
    }

    render() {
        if (this.props.isAdmin) {
            return this.renderAdmin()
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