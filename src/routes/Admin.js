import React, { Component } from 'react'

import { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react';


class Admin extends Component {

    render() {
        console.log(Auth.user)
        return (
            <div>
                <p>The admin page</p>
                <div>

                </div>
            </div>
        )
    }
}

export default withAuthenticator(Admin)