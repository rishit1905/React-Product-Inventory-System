import React from 'react';
import HeaderFooter from './headerfooter';
import ContentComponent from './contentcomponent';
import Footer from './footer';

class RootComponent extends React.Component {
    state = {}
    render() {
        return (
            <div>
                <HeaderFooter></HeaderFooter>
                <ContentComponent></ContentComponent>
                <Footer></Footer>
            </div>

        );
    }
}

export default RootComponent;