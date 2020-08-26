import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProductInventoryHead from './productinventoryhead';
import DashboardHead from './dashboardhead';
import InventoryHead from './inventoryhead';
import AddProductHead from './addproducthead';
import UpdateProductHead from './updateproducthead';
import CategoryHead from './categoryhead';
import VendorHead from './vendorhead';
import StockHead from './stockhead';
import PriceHead from './pricehead';

class HeaderContent extends React.Component {
    state = {}
    render() {
        return (  
            <Switch>
                <Route path="/" exact component={ProductInventoryHead}></Route>
                <Route path="/signup" exact component={ProductInventoryHead}></Route>
                <Route path="/dashboard" exact component={DashboardHead}></Route>
                <Route path="/inventory" exact component={InventoryHead}></Route>
                <Route path="/addproduct" exact component={AddProductHead}></Route>
                <Route path="/updateproduct" exact component={UpdateProductHead}></Route>
                <Route path="/category" exact component={CategoryHead}></Route>
                <Route path="/vendor" exact component={VendorHead}></Route>
                <Route path="/stock" exact component={StockHead}></Route>
                <Route path="/price" exact component={PriceHead}></Route>
            </Switch>
        );
    }
}

export default HeaderContent;