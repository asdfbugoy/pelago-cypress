import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

const Pagination = props => {
    const { store } = props;
    const page = store.params.page ? parseInt(store.params.page, 10) : 1;
    let total = parseInt(store.data.totalResults / 10, 10);
    total = store.data.totalResults % 10 > 0 ? total + 1 : total;
    const min = 1;
    const tmpLength = 5;
    const diff = Math.floor(tmpLength / 2);
    let offset = page - diff;
    if (offset < min) offset = min;
    if (page + diff >= total) offset = total - (diff * 2);
    if (total < tmpLength) offset = min;
    const pages = Array.from({ length: total > tmpLength ? tmpLength : total }).map((d, i) => i + offset);
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
                <li className="page-item"><button disabled={store.loading} className="page-link" onClick={onClick(page + 1 > total ? total : page + 1)}><i className="fa fa-angle-right"></i></button></li>
                <li className="page-item"><button disabled={store.loading} className="page-link" onClick={onClick(total)}><i className="fa fa-angle-double-right"></i></button></li>
            </ul>
        </nav>
    </React.Fragment >;
};

Pagination.propTypes = {
    store: PropTypes.object
};

export default observer(Pagination);