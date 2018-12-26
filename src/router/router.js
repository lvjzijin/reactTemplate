import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Bundle from './Bundle';
import Header from '../components/BasicLayouts/Header';
import SideNav from 'bundle-loader?lazy&name=users!components/BasicLayouts/SideNav';
import Home from 'bundle-loader?lazy&name=home!containers/Home/Home';
import NotFound from 'bundle-loader?lazy&name=notFound!containers/NotFound/NotFound';

const Loading= function(){
    return <div>Loading</div>
};

const createComponent = (component)=>(props)=>(
    <Bundle load={component}>
        {
            (Component)=>Component ? <Component {...props} />: <Loading />
        }
    </Bundle>
)

const getRouter = ()=>(
    <Router>
        <div>
            <Header/>
            <Switch>
                <Route exact path="/" component={createComponent(Home)}/>
                <Route path="/user" component={createComponent(SideNav)}/>
                <Route component={createComponent(NotFound)}/>
            </Switch>
        </div>
    </Router>
);

export default getRouter;