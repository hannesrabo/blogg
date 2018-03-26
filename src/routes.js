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
          <Route exact path="/" render={(props) => <App {...props} />} />
          <Route exact path="/admin" component={Admin} />
          <Route component={Page404} />
        </Switch>
      </div>
    </Router>
  );
}
