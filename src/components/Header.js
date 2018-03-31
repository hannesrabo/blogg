import React, { Component } from 'react'
import './Header.css'
// import zebra_pattern from '../resources/zebra_pattern.png'

class Header extends Component {
    render() {
        let header = this.props.header ? this.props.header : 'Template Header'
        return (
            <header className="header">
                <div className="header-backdrop">
                    <h1 className="header--title">{header}</h1>
                </div>
            </header>
        )
    }
}

export default Header