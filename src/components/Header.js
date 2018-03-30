import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
    render() {
        let header = this.props.header ? this.props.header : 'Template Header'
        return (
            <header className="header">
                <h1 className="header--title">{header}</h1>
            </header>
        )
    }
}

export default Header