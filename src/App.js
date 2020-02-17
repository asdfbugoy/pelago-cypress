import React from 'react';
import Movie from 'components/movie';
import Detailed from 'components/movie/Detailed';
import AppStyled from 'AppStyled';
import PropTypes from 'prop-types';
import { useMst } from 'store';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link,
    // useRouteMatch,
    // useParams
} from 'react-router-dom';
import Header from 'components/movie/Header';

const App = () => {
    return <React.Fragment>
        <AppStyled />
        <Router>
            <article className="App container" data-cy="app">
                <Header />
                <Switch>
                    <Route path="/:id">
                        <Detailed store={useMst()} />
                    </Route>
                    <Route path="/">
                        <Movie store={useMst()} />
                    </Route>
                </Switch>
            </article>
        </Router>
    </React.Fragment>;
};

App.propTypes = {
    store: PropTypes.object
};

export default App;
