import React, { Component } from 'react'
import Header from './Header';
import Footer from './Footer'

import './LayoutTemplate.css'

class LayoutTemplate extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="wrapper">
                <Header
                    header={this.props.header}
                />
                <div className="child-wrapper">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }
}

export default LayoutTemplate