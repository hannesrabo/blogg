import React, { Component } from 'react'

import './Footer.css'

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer-backdrop">
                    <p className="footer--text">This blog was created by Hannes Rabo 2018</p>
                    <p className="footer--text__fine">
                        More information can be found on my github: <a href="https://github.com/user/hannesrabo">hannesrabo</a>.
                </p>
                </div>
            </footer>
        )
    }
}

export default Footer