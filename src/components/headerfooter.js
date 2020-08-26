import React from 'react';
import "./headerfooter.css";
import HeaderContent from './headercontent';

class HeaderFooter extends React.Component {

    render() {
        return (
            <div id="hf">
                <HeaderContent></HeaderContent>
            </div>
        );
    }
}

export default HeaderFooter;