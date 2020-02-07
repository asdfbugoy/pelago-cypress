import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

const Search = props => {
    const { fetchAPI, loading, setAdvanced, advanced, setPage } = props;

    const onChange = debounce(() => {
        // setPage(1);
        fetchAPI(ref.current.value);
    }, 2000);

    const onClick = () => {
        // setPage(1);
        fetchAPI(ref.current.value);
    };

    const ref = React.useRef();

    // const onClickAdvanced = () => setAdvanced(!advanced);

    return <div data-cy="search">
        <div className="input-group mb-3">
            <input disabled={loading} ref={ref} data-cy="input" onChange={onChange} className="form-control" data-fetch="false" />
            <div className="input-group-append">
                <button data-cy="btn" disabled={loading} className="btn btn-outline-secondary" onClick={onClick}><i className={loading ? 'fa fa-gear fa-spin fa-spiner' : 'fa fa-search'}></i></button>
                <button data-cy="advanced" disabled={loading} className="btn btn-outline-primary" onClick={() => setAdvanced(!advanced)}><i className="fa fa-search-plus"></i></button>
            </div>
        </div>
    </div>;
};

Search.propTypes = {
    fetchAPI: PropTypes.func,
    data: PropTypes.object,
    loading: PropTypes.bool,
    setAdvanced: PropTypes.func,
    advanced: PropTypes.bool,
    setPage: PropTypes.func
};

export default Search;
