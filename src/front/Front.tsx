import React, { Component } from 'react';
import FrontHeader from "./header/FrontHeader";
import FrontContent from "./content/FrontContent";
import FrontFooter from "./footer/FrontFooter";

class Front extends Component<any, any> {
    render() {
        return (
            <div className="Front" data-testid="front-component">
                <FrontHeader />
                <FrontContent />
                <FrontFooter />
            </div>
        );
    }
}

export default Front;
