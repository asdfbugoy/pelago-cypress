import React from 'react';
// import Header from './Header';
import Search from './Search';
import List from './List';
import Advanced from './Advanced';
import Pagination from './Pagination';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

const Movie = props => {
    const { store } = props;
    return <section data-cy="movie">
        <Search store={store} />
        {store.advanced && <Advanced store={store} />}
        <List store={store} />
        {store.data.totalResults > 0 && <Pagination store={store} />}
    </section>;
};

Movie.propTypes = {
    store: PropTypes.object
};

export default observer(Movie);