import React from 'react';
import PropTypes from 'prop-types';

const Pagination = props => {
    const onClick = () => {
        props.setPage(2);
        props.fetchAPI();
    };
    return <React.Fragment>
        {props.total}
        <nav>
            <ul className="pagination justify-content-center">
                <li className="page-item"><button className="page-link" href="#" onClick={onClick}>Previous</button></li>
                {Array.from({ length: 5 }).map((d, i) => <li key={i} className="page-item"><button className="page-link" href="#">{i + 1}</button></li>)}
                <li className="page-item"><button className="page-link" href="#">Next</button></li>
            </ul>
        </nav>
    </React.Fragment>;
};

Pagination.propTypes = {
    total: PropTypes.number
};

export default Pagination;