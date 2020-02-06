import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

const Search = props => {
    const { fetchAPI, loading, setAdvanced, advanced } = props;

    const onChange = debounce(() => fetchAPI(ref.current.value), 2000);

    // const onClick = () => fetchAPI(ref.current.value);

    const ref = React.useRef();

    // const onClickAdvanced = () => setAdvanced(!advanced);

    return <div data-cy="search">
        <div className="input-group mb-3">
            <input ref={ref} data-cy="input" onChange={onChange} className="form-control" data-fetch="false" />
            <div className="input-group-append">
                <button data-cy="btn" disabled={loading} className="btn btn-outline-secondary" onClick={() => fetchAPI(ref.current.value)}><i className={loading ? 'fa fa-gear fa-spin fa-spiner' : 'fa fa-search'}></i></button>
                <button data-cy="advanced" className="btn btn-outline-primary" onClick={() => setAdvanced(!advanced)}><i className="fa fa-search-plus"></i></button>
            </div>
        </div>
    </div>;
};

Search.propTypes = {
    fetchAPI: PropTypes.func,
    data: PropTypes.object,
    loading: PropTypes.bool,
    setAdvanced: PropTypes.func,
    advanced: PropTypes.bool
};

export default Search;
