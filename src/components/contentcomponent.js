import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './dashboard';
import Inventory from './inventory';
import AddProduct from './addproduct';

import Login from './login';
import Signup from './signup';
import UpdateProduct from './updateproduct';
import Category from './category';
import Vendor from './vendor';
import Stock from './stock';
import Price from './price';

class ContentComponent extends React.Component {
    state = {}
    render() {
        return (
            <Switch>
                <Route path="/" exact component={Login}></Route>
                <Route path="/signup" exact component={Signup}></Route>
                <Route path="/dashboard" exact component={Dashboard}></Route>
                <Route path="/inventory" exact component={Inventory}></Route>
                <Route path="/addproduct" exact component={AddProduct}></Route>
                <Route path="/updateproduct" exact component={UpdateProduct}></Route>
                <Route path="/category" exact component={Category}></Route>
                <Route path="/vendor" exact component={Vendor}></Route>
                <Route path="/stock" exact component={Stock}></Route>
                <Route path="/price" exact component={Price}></Route>
            </Switch>

        );
    }
}

export default ContentComponent;