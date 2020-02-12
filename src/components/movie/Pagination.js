import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

const Pagination = props => {
    const { store } = props;
    const { page, max, min, pages } = store.pagination;
    
    const onClick = i => () => {
        store.params.setParamsByField('page', i.toString());
        store.fetchAPI();
    };

    return <React.Fragment>
        <nav data-cy="pagination">
            <ul className="pagination justify-content-center table-responsive">
                <li className="page-item"><button disabled={store.loading} className="page-link" onClick={onClick(1)}><i className="fa fa-angle-double-left"></i></button></li>
                <li className="page-item"><button disabled={store.loading} className="page-link" onClick={onClick(page - 1 < min ? min : page - 1)}><i className="fa fa-angle-left"></i></button></li>
                {pages.map((d, i) => <li key={i} className={`page-item ${page === d ? 'active' : ''}`}><button disabled={store.loading} className="page-link" onClick={onClick(d)}>{d}</button></li>)}
                <li className="page-item"><button disabled={store.loading} className="page-link" onClick={onClick(page + 1 > max ? max : page + 1)}><i className="fa fa-angle-right"></i></button></li>
                <li className="page-item"><button disabled={store.loading} className="page-link" onClick={onClick(max)}><i className="fa fa-angle-double-right"></i></button></li>
            </ul>
        </nav>
    </React.Fragment >;
};

Pagination.propTypes = {
    store: PropTypes.object
};

export default observer(Pagination);