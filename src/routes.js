import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './history';

// Routes
import App from './App';
import Admin from './routes/Admin'
import Page404 from './routes/Page404'
import FullScreenPost from './routes/FullScreenPost'

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
					<Route
						exact
						path={process.env.PUBLIC_URL + '/posts/:id'}
						component={FullScreenPost}
					/>
					<Route component={Page404} />
				</Switch>
			</div>
		</Router>
	)
}
