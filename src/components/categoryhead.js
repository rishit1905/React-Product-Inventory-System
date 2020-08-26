import React from 'react';
import { Link } from 'react-router-dom';

class CategoryHead extends React.Component {
    state = {}
    render() {
        return (
            <div className="header-container">
                <div className="item1">
                    <p>CATEGORY BASED</p>
                </div>
                <div className="item2">
                    <Link to="/dashboard">
                        <button className="headerButton">Dashboard</button>
                    </Link>
                </div>
                <div className="item3">
                    <Link to="/inventory">
                        <button className="headerButton">Inventory</button>
                    </Link>
                </div>
                <div className="item4">
                    <Link to="/">
                        <button className="headerButton">Signout</button>
                    </Link>
                </div>
            </div>
            );
    }
}

export default CategoryHead;