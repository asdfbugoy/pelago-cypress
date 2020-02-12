import React from 'react';
import Movie from 'components/movie';
import AppStyled from 'AppStyled';
import PropTypes from 'prop-types';
import { useMst } from 'store';

const App = () => {
    return <React.Fragment>
        <AppStyled />
        <article className="App container" data-cy="app">
            <Movie store={useMst()} />
        </article>
    </React.Fragment>;
};

App.propTypes = {
    store: PropTypes.object
};

export default App;
