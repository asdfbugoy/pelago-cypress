import React from 'react';
import { types, flow, applySnapshot, getSnapshot } from 'mobx-state-tree';
import Pagination from './movie/Pagination';
import Params from './movie/Params';
import Data from './movie/Data';

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
        self.params = self.advanced ? self.params : Params.create({
            s: self.params.s
        });
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
            applySnapshot(self.data, {
                ...d,
                totalResults: d.totalResults ? parseInt(d.totalResults, 10) : 0,
                Response: d.Response === 'True' ? true : false,
                Error: d.Error ? d.Error : ''
            });
            self.setLoading(false);

            return response;
        } catch (error) {
            applySnapshot(self.data, {
                totalResults: 0,
                Response: false,
                Error: error.message
            });
            self.setLoading(false);
        }
    })
}));
/**
 * thinking of moving below code to custom hooks
 */
export const store = Store.create();

const StoreContext = React.createContext();

export const Provider = StoreContext.Provider;

export function useMst() {
    const store = React.useContext(StoreContext);
    if (store === null) throw new Error('Store cannot be null, please add a context provider');
    return store;
}