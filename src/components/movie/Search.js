import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

const Search = props => {
    const onChange = debounce(() => props.fetchAPI(ref.current.value), 2000);

    const onClick = () => props.fetchAPI(ref.current.value);

    const ref = React.useRef();

    return <div data-cy="search">
        <div className="input-group mb-3">
            <input ref={ref} data-cy="input" onChange={onChange} className="form-control" data-fetch="false" />
            <div className="input-group-append">
                <button data-cy="btn" disabled={props.loading} className="btn btn-primary" onClick={onClick}><i className={props.loading ? 'fa fa-gear fa-spin fa-spiner' : 'fa fa-search'}></i></button>
            </div>
        </div>
    </div>;
};

Search.propTypes = {
    fetchAPI: PropTypes.func,
    data: PropTypes.object,
    loading: PropTypes.bool
};

export default Search;
