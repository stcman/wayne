import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MainHero from './MainHero';
import React from 'react';
import DateSelector from './DateSelector';
import RoomSelector from './RoomSelector';
import Checkout from './Checkout';
import Complete from './Complete';
import Inventory from './Inventory';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={MainHero} />
            <Route exact path="/book" component={DateSelector} />
            <Route exact path="/room" component={RoomSelector} />
            <Route exact path="/check" component={Checkout} />
            <Route exact path="/complete" component={Complete} />
            <Route exact path="/inventory" component={Inventory} />
        </Switch>
    </BrowserRouter>
)

export default Router;