import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider, store } from 'store';
import { onPatch, onSnapshot } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';

const mstDebug = () => {
    makeInspectable(store);
    onPatch(store, patch => console.log(patch));
    onSnapshot(store, snapshot => console.log('Snapshot: ', snapshot));
};

process.env.NODE_ENV === 'development' && mstDebug();

ReactDOM.render(<Provider value={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
