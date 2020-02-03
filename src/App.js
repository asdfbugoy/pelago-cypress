import React from 'react';
import Movie from 'components/movie';
import AppStyled from 'AppStyled';

const App = () => <React.Fragment>
    <AppStyled />
    <article className="App container py-3" data-cy="app">
        <Movie />
    </article>
</React.Fragment>;

export default App;
