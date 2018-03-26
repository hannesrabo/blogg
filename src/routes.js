import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './history';

// Routes
import App from './App';
import Admin from './routes/Admin'
import Page404 from './routes/Page404'

export const makeMainRoutes = () => {
	return (
		<Router history={history}>
			<div>
				<Switch>
					<Route
						exact
						path={process.env.PUBLIC_URL + '/'}
						render={props => <App {...props} />}
					/>
					<Route
						exact
						path={process.env.PUBLIC_URL + '/admin'}
						component={Admin}
					/>
					<Route component={Page404} />
				</Switch>
			</div>
		</Router>
	)
}
