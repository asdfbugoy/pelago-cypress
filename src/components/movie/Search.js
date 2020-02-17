import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { observer } from 'mobx-react';

const Search = props => {
    const { store } = props;
    const ref = React.useRef();
    const processAPI = () => {
        store.params.setParamsByField(ref.current.name, ref.current.value);
        !store.advanced && store.params.setParamsByField('page', '1');
        store.fetchAPI();
    };
    const onChange = debounce(processAPI, 2000);
    const onClick = () => processAPI();
    return <div data-cy="search">
        <div className="input-group mb-3">
            <input name="s" disabled={store.loading} ref={ref} data-cy="input" onChange={onChange} className="form-control" />
            <div className="input-group-append">
                <button data-cy="btn" disabled={store.loading} className="btn btn-outline-secondary" onClick={onClick}><i className={store.loading ? 'fa fa-gear fa-spin fa-spiner' : 'fa fa-search'}></i></button>
                <button data-cy="advanced" disabled={store.loading} className="btn btn-outline-primary" onClick={() => store.setAdvanced()}><i className="fa fa-search-plus"></i></button>
            </div>
        </div>
    </div>;
};

Search.propTypes = {
    store: PropTypes.object
};

export default observer(Search);
