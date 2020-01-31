import React from 'react';
import PropTypes from 'prop-types';

const Search = props => {
    const onChange = e => {
        console.log(e.target.value);
        // props.fetchAPI();
    };

    const onClick = () => {
        console.log(ref.current.value);
        props.fetchAPI(ref.current.value);
    };

    const ref = React.useRef();

    return <div data-cy="search">
        <div className="input-group mb-3">
            <input ref={ref} data-cy="input" onChange={onChange} className="form-control" data-fetch="false" />
            <div className="input-group-append">
                <button data-cy="btn" className="btn btn-primary" onClick={onClick}><i className="fa fa-search"></i></button>
            </div>
        </div>
    </div>;
};

Search.propTypes = {
    fetchAPI: PropTypes.func,
    data: PropTypes.object
};

export default Search;
