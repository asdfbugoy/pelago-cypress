import React from 'react';
import { types, flow, applySnapshot, getSnapshot, getParent } from 'mobx-state-tree';

const Pagination = types.model({
    // current: types.optional(types.number, 1),
    total: types.optional(types.number, 1),
}).actions(self => ({
    prev() {
        console.log(getParent(self));
        self.setCurrent(self.current - 1);
    },
    next() {
        self.setCurrent(self.current + 1);
    },
    setCurrent(v) {
        self.current = v < 1 ? 1 : v > self.total ? self.total : v;
    }
}));

const Params = types.model({
    apikey: '185c5ebb',
    s: types.optional(types.string, ''),
    page: types.optional(types.string, ''),
    y: types.optional(types.string, ''),
    type: types.optional(types.string, '')
}).actions(self => ({
    setParamsByField(n, v) {
        self[n] = v;
    }
}));

const Search = types.model({
    Title: types.optional(types.string, ''),
    Year: '',
    imdbID: '',
    Type: '',
    Poster: ''
});

const Data = types.model({
    Response: types.optional(types.boolean, false),
    totalResults: types.optional(types.number, 0),
    Search: types.array(Search, []),
    Error: types.optional(types.string, '')
});

const Store = types.model({
    url: 'https://www.omdbapi.com/?',
    loading: types.optional(types.boolean, false),
    advanced: types.optional(types.boolean, false),
    params: types.maybe(Params),
    data: types.maybe(Data),
    types: types.frozen(['movie', 'series', 'episode']),
    pagination: types.maybe(Pagination)
}).views(self => ({
    get query() {
        return self.url + Object.keys(getSnapshot(self.params))
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(getSnapshot(self.params)[k]))
            .join('&');
    },
})).actions(self => ({
    afterCreate() {
        self.params = Params.create();
        self.data = Data.create();
        self.pagination = Pagination.create();
    },
    setAdvanced() {
        self.advanced = !self.advanced;
    },
    setLoading(v) {
        self.loading = v;
    },
    fetchAPI: flow(function* fetchAPI() {
        self.setLoading(true);
        try {
            const response = yield fetch(self.query, {
                // method: 'POST', // or 'PUT'
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify(params),
            });

            const d = yield response.json();
            console.log('success');
            applySnapshot(self.data, {
                ...d,
                totalResults: d.totalResults ? parseInt(d.totalResults, 10) : 0,
                Response: d.Response === 'True' ? true : false,
                Error: d.Error ? d.Error : ''
            });
            self.setLoading(false);

            return response;
        } catch (error) {
            console.log(error.message);
            applySnapshot(self.data, {
                totalResults: 0,
                Response: false,
                Error: error.message
            });
            self.setLoading(false);
        }
    })
}));

export const store = Store.create();

// onSnapshot(store, snapshot => console.log('Snapshot: ', snapshot));

const StoreContext = React.createContext();

export const Provider = StoreContext.Provider;

export function useMst() {
    const store = React.useContext(StoreContext);
    if (store === null) throw new Error('Store cannot be null, please add a context provider');
    return store;
}