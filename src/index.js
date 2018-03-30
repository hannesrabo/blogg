import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './skeleton.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import Amplify from 'aws-amplify'

// ReactDOM.render(<App />, document.getElementById('root'))
import { makeMainRoutes } from './routes'

// Configure amazon api.
import aws_exports from './aws-exports'
Amplify.configure(aws_exports)

const routes = makeMainRoutes()

ReactDOM.render(
    routes,
    document.getElementById('root')
)


registerServiceWorker();
