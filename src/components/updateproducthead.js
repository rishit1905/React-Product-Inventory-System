import React from 'react';
import "./headerfooter.css";
import { Link } from 'react-router-dom';

class UpdateProductHead extends React.Component {
    state = {}
    render() {
        return (
            <div className="header-container">
                <div className="item1">
                    <p>UPDATE PRODUCT</p>
                </div>
                <div className="item2">
                    <Link to="/inventory">
                        <button className="headerButton">Inventory</button>
                    </Link>
                </div>
                <div className="item3">
                    <Link to="/">
                        <button className="headerButton">Signout</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default UpdateProductHead;