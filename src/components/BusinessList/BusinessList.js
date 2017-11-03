import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

class BusinessList extends React.Component {
    render() {
        return (
            <div className="BusinessList">
                { this.props.businesses.map(function(businesses) { return <Business business={business.id} /> } ) };
            </div>
        );
    }
}

export default BusinessList;