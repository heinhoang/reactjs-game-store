import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { GamesContainer, AddGameContainer } from './containers';
import { Home, Archive, Wellcome, About, Contact } from './components';

const Routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Home}>
            <IndexRoute component={Wellcome} />
            <Route path="/about" component={About}></Route>
            <Route path="/contact" component={Contact}></Route>
        </Route>
        <Route path="/games" component={Archive}>
            <IndexRoute component={GamesContainer} />
            <Route path="add" component={AddGameContainer}></Route>
        </Route>
    </Router>
);

export default Routes;